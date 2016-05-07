'use strict';
var util            = require('util');
var yeoman          = require('yeoman-generator');
var chalk           = require('chalk');
var updateNotifier  = require('update-notifier');
var pkg             = require('../../package.json');
var opn             = require('opn');
var _              = require('lodash');

var KickoffGenerator = module.exports = function KickoffGenerator(args, options) {
	yeoman.Base.apply(this, arguments);
};


util.inherits(KickoffGenerator, yeoman.generators.Base);


KickoffGenerator.prototype.askFor = function () {
	var done = this.async();

	// Checks for available update and returns an instance
	var notifier = updateNotifier({
		packageName: pkg.name,
		packageVersion: pkg.version,
		updateCheckInterval: 1000 * 60 // Every hour
	});

	var kickoffWelcome = chalk.white('\n ##  ## ######  ####  ##  ##  ') + chalk.yellow('####  ###### ######') + chalk.white('\n ## ##    ##   ##  ## ## ##  ') + chalk.yellow('##  ## ##     ##') + chalk.white('\n ####     ##   ##     ####   ') + chalk.yellow('##  ## ####   ####') + chalk.white('\n ## ##    ##   ##  ## ## ##  ') + chalk.yellow('##  ## ##     ##') + chalk.white('\n ##  ## ######  ####  ##  ##  ') + chalk.yellow('####  ##     ##') + '\n\n ' + chalk.white.bold('A Yeoman generator for the Kickoff front-end framework') + '\n\n Find out more at ' + chalk.cyan('trykickoff.com') + '\n Yeoman Generator version:  ' + pkg.version + '\n\n Kickoff is free and open-source and maintained by ' + chalk.yellow('@MrMartineau') + ',\n ' + chalk.green('@AshNolan_') + ', ' + chalk.red('@nicbell') + ' & the ' + chalk.blue('@tmwTechTeam') + '. \n';

	// Have Yeoman greet the user.
	this.log(kickoffWelcome);

	if (notifier.update) {
		// Check for npm package update and print message if needed
		var updateMessage = chalk.yellow('   ┌────────────────────────────────────────────────┐\n   │') + ' Update available: '  + chalk.green(notifier.update.latest) + chalk.gray(' (current: ' + pkg.version + ')') + '       '+ chalk.yellow('│\n   │') + ' Run ' + chalk.cyan('npm update -g ' + pkg.name) + ' to update. ' + chalk.yellow('│\n   └────────────────────────────────────────────────┘\n');

		this.log(updateMessage);
	}


	var prompts = [
		{
			name: 'projectName',
			message: 'Project name',
			default: 'Your project name'
		},
		{
			name: 'projectDescription',
			message: 'Description',
			default: 'Project description'
		},
		{
			name: 'repoUrl',
			message: 'What is the git repo url for this project?',
		},
		{
			name: 'devNames',
			message: 'Team members',
			default: 'Zander & Ash'
		},
		{
			name: 'features',
			type: 'checkbox',
			message: 'Which features would you like?',
			choices: [
				{
					name: 'Include Kickoff\'s styleguide?',
					value: 'styleguide'
				},
				{
					name: 'Use Kickoff Statix for static templating and rapid prototyping?',
					value: 'statix'
				},
				{
					name: 'Provide Flexbox feature-detect? Needed if you use our grid in non-flexbox supporting browsers',
					value: 'flexboxFallback',
					default: false,
				},
				{
					name: 'Support IE8?',
					value: 'oldIE',
					default: false,
				},
			],
			store: true
		},
		{
			name: 'jsLibs',
			type: 'checkbox',
			message: 'Which Javascript libraries would you like to use?',
			choices: [
				{
					name: 'jQuery',
					value: 'jquery'
				},
				{
					name: 'trak.js - Universal event tracking API',
					value: 'trak'
				},
				{
					name: 'Swiftclick - Eliminates the 300ms click event delay on touch devices',
					value: 'swiftclick'
				},
				{
					name: 'Include some Javascript polyfills/shims? (These are generated by the \'grunt shimly\' command)',
					value: 'shims'
				},
				{
					name: 'Use Modernizr?',
					value: 'modernizr'
				}
			],
			store: true
		}
	];

	this.prompt(prompts, function (answers) {
		for (var key in answers) {
			this[key] = answers[key];
		}

		var jsLibs = answers.jsLibs;
		var features = answers.features;

		function hasFeature(feat, prop) {
			return prop && prop.indexOf(feat) !== -1;
		}

		// JS Libs
		this.includeTrak       = hasFeature('trak', jsLibs);
		this.includeJquery     = hasFeature('jquery', jsLibs);
		this.includeSwiftclick = hasFeature('swiftclick', jsLibs);
		this.includeShims      = hasFeature('shims', jsLibs);
		this.includeModernizr  = hasFeature('modernizr', jsLibs);

		// Features
		this.includeStatix     = hasFeature('statix', features);
		this.includeStyleguide = hasFeature('styleguide', features);
		this.oldIE = hasFeature('oldIE', features);
		this.flexboxFallback = hasFeature('flexboxFallback', features);

		done();
	}.bind(this));
};


/**
 * Info
 * http://yeoman.io/generator/actions_actions.html
 * http://yeoman.io/authoring/file-system.html
 */
KickoffGenerator.prototype.packageFiles = function packageFiles() {

	this.fs.copyTpl(
		this.templatePath('_index.html'),
		this.destinationPath('index.html'),
		{
			projectName: this.projectName,
			projectNameSlugified: _.kebabCase(this.projectName),
			oldIE: this.oldIE,
			modernizr: this.includeModernizr,
			shims: this.includeShims,
			flexboxFallback: this.flexboxFallback,
		}
	);

	if (this.includeStyleguide && !this.includeStatix) {
		this.fs.copyTpl(
			this.templatePath('styleguide/_index.html'),
			this.destinationPath('styleguide/index.html'),
			{
				projectName: this.projectName,
				projectNameSlugified: _.kebabCase(this.projectName),
				oldIE: this.oldIE,
				modernizr: this.includeModernizr,
				shims: this.includeShims,
				flexboxFallback: this.flexboxFallback,
			}
		);
	}


	// CSS, SCSS, images source directory
	this.directory('assets/dist/css', 'assets/dist/css');
	this.directory('assets/src/scss', 'assets/src/scss');
	this.directory('assets/src/img', 'assets/src/img');


	// Javascript
	this.fs.copyTpl(
		this.templatePath('assets/src/js/_script.js'),
		this.destinationPath('assets/src/js/script.js'),
		{
			projectName: this.projectName,
			devNames: this.devNames,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery: this.includeJquery,
			statix: this.includeStatix,
			shims: this.includeShims,
		}
	);
	this.directory('assets/src/js/modules', 'assets/src/js/modules');

	this.copy('assets/src/js/standalone/.gitkeep', 'assets/src/js/standalone/.gitkeep');

	if (this.modernizr) {
		this.copy('assets/src/js/standalone/modernizr.js', 'assets/src/js/standalone/modernizr.js');
	}

	if (this.shims) {
		this.copy('assets/src/js/standalone/shims.js', 'assets/src/js/standalone/shims.js');
	}


	// Grunt configs
	this.fs.copyTpl(
		this.templatePath('_Gruntfile.js'),
		this.destinationPath('Gruntfile.js'),
		{
			modernizr: this.includeModernizr,
			statix: this.includeStatix,
			shims: this.includeShims,
			styleguide: this.includeStyleguide,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_config.js'),
		this.destinationPath('_grunt-configs/config.js'),
		{
			projectName: this.projectName,
			projectNameSlugified: _.kebabCase(this.projectName),
			statix: this.includeStatix,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_css.js'),
		this.destinationPath('_grunt-configs/css.js'),
		{
			oldIE: this.oldIE,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_images.js'),
		this.destinationPath('_grunt-configs/images.js'),
		{}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_javascript.js'),
		this.destinationPath('_grunt-configs/javascript.js'),
		{
			includeShims: this.includeShims,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_server.js'),
		this.destinationPath('_grunt-configs/server.js'),
		{
			statix: this.includeStatix,
			styleguide: this.includeStyleguide,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_utilities.js'),
		this.destinationPath('_grunt-configs/utilities.js'),
		{
			statix: this.includeStatix,
			shims: this.includeShims,
			modernizr: this.includeModernizr,
			flexboxFallback: this.flexboxFallback,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_watch.js'),
		this.destinationPath('_grunt-configs/watch.js'),
		{
			statix: this.includeStatix,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_tests.js'),
		this.destinationPath('_grunt-configs/tests.js'),
		{}
	);


	this.fs.copyTpl(
		this.templatePath('_package.json'),
		this.destinationPath('package.json'),
		{
			projectName: this.projectName,
			projectNameSlugified: _.kebabCase(this.projectName),
			projectDescription: this.projectDescription,
			devNames: this.devNames,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery: this.includeJquery,
			statix: this.includeStatix,
			oldIE: this.oldIE,
			repoUrl: this.repoUrl,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_readme.md'),
		this.destinationPath('readme.md'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_humans.txt'),
		this.destinationPath('humans.txt'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames,
		}
	);

	this.copy('eslintrc.js', '.eslintrc.js');
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
	this.copy('scss-lint.yml', '.scss-lint.yml');
	this.copy('robots.txt', 'robots.txt');

	if (this.includeStatix) {
		this.directory('statix/dist', 'statix/dist');

		this.directory('statix/src/data', 'statix/src/data');
		this.directory('statix/src/helpers', 'statix/src/helpers');

		this.directory('statix/src/templates/views', 'statix/src/templates/views');
		this.directory('statix/src/templates/layouts', 'statix/src/templates/layouts');

		if (this.includeStyleguide) {
			this.directory('statix/src/templates/layouts', 'statix/src/templates/layouts');

			this.fs.copyTpl(
				this.templatePath('statix/src/templates/_index.hbs'),
				this.destinationPath('statix/src/templates/views/styleguide/index.hbs'),
				{
					projectName: this.projectName,
				}
			);

			this.copy('statix/src/templates/styleguide-layout.hbs', 'statix/src/templates/layouts/styleguide.hbs');
		}

		this.directory('statix/src/templates/partials', 'statix/src/templates/partials');

		this.fs.copyTpl(
			this.templatePath('statix/src/templates/_html_start.hbs'),
			this.destinationPath('statix/src/templates/partials/html_start.hbs'),
			{
				projectName: this.projectName,
				projectNameSlugified: _.kebabCase(this.projectName),
				projectDescription: this.projectDescription,
				oldIE: this.oldIE,
				modernizr: this.includeModernizr,
				shims: this.includeShims,
				styleguide: this.includeStyleguide,
				flexboxFallback: this.flexboxFallback,
			}
		);

	}
};


KickoffGenerator.prototype.install = function packageFiles() {
	opn('http://trykickoff.com/learn/checklist.html');
	this.installDependencies();
};

'use strict';
var util           = require('util');
var path           = require('path');
var yeoman         = require('yeoman-generator');
var chalk          = require('chalk');
var updateNotifier = require('update-notifier');
var pkg            = require('../package.json');

var KickoffGenerator = module.exports = function KickoffGenerator(args, options) {
	yeoman.generators.Base.apply(this, arguments);
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

	var kickoffWelcome = chalk.white.bold('\n ##  ## ######  ####  ##  ##') + chalk.yellow.bold('  ####  ###### ######') + chalk.white.bold('\n ## ##    ##   ##  ## ## ##  ') + chalk.yellow.bold('##  ## ##     ##') + chalk.white.bold('\n ####     ##   ##     ####   ') + chalk.yellow.bold('##  ## ####   ####') + chalk.white.bold('\n ## ##    ##   ##  ## ## ##  ') + chalk.yellow.bold('##  ## ##     ##') + chalk.white.bold('\n ##  ## ######  ####  ##  ##  ') + chalk.yellow.bold('####  ##     ##') + '\n\n ' + chalk.white.bold('A Yeoman generator for the Kickoff front-end framework') + '\n\n Find out more at ' + chalk.cyan('tmwagency.github.io/kickoff/') + '\n Yeoman Generator version:  ' + pkg.version + '\n\n Kickoff is free and open-source and maintained by ' + chalk.yellow('@MrMartineau') + ',\n ' + chalk.green('@AshNolan_') + ', the ' + chalk.blue('@tmwTechTeam') + ' and a few other kind souls. \n';
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
			default: 'Kickoff'
		},
		{
			name: 'devNames',
			message: 'What are the project developer\'s names?',
			default: 'The Kickoff Team'
		},
		{
			name: 'oldIE',
			type: 'confirm',
			message: 'Does this project support IE8?',
			default: true,
			store: true
		},
		{
			name: 'jsNamespace',
			message: 'Choose your javascript namespace',
			default: 'KO',
			store: true
		},
		{
			name: 'statix',
			type: 'confirm',
			message: 'Do you want to use Kickoff Statix?',
			default: false,
			store: true
		},
		{
			name: 'browserify',
			type: 'confirm',
			message: 'Do you want to use Browserify?',
			default: false,
			store: true
		},
		{
			name: 'jsLibs',
			type: 'checkbox',
			message: 'Which Javascript libraries would you like to use?',
			choices: [
				{
					name: 'jQuery 1.x - only choose one jQuery version',
					value: 'jquery1'
				},
				{
					name: 'jQuery 2.x - only choose one jQuery version',
					value: 'jquery2'
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
					name: 'Cookies - JavaScript Client-Side Cookie Manipulation Library',
					value: 'cookies'
				}
			],
			store: true
		},
		{
			name: 'grunticon',
			type: 'confirm',
			message: 'Would you like to use Grunticon?',
			default: true,
			store: true
		},
		{
			name: 'shims',
			type: 'confirm',
			message: 'Do you want to include the default Javascript shims? (These are generated by the \'grunt shimly\' command)',
			default: false,
			store: true
		}
	];

	this.prompt(prompts, function (props) {
		for (var key in props) {
			this[key] = props[key];
		}

		done();
	}.bind(this));
};


KickoffGenerator.prototype.packageFiles = function packageFiles() {
	this.template('_index.html', 'index.html');
	this.template('_docs/_styleguide.html', '_docs/styleguide.html');
	this.template('_docs/_index.html', '_docs/index.html');

	this.directory('scss', 'scss');

	// Grunt configs
	this.template('_grunt-configs/_css.js', '_grunt-configs/css.js');
	this.template('_grunt-configs/_icons.js', '_grunt-configs/icons.js');
	this.template('_grunt-configs/_javascript.js', '_grunt-configs/javascript.js');
	this.template('_grunt-configs/_server.js', '_grunt-configs/server.js');
	this.template('_grunt-configs/_utilities.js', '_grunt-configs/utilities.js');
	this.template('_grunt-configs/_watch.js', '_grunt-configs/watch.js');
	this.template('_grunt-configs/_tests.js', '_grunt-configs/tests.js');

	this.template('js/_script.js', 'js/script.js');
	this.directory('js/libs', 'js/libs');
	this.directory('js/dist', 'js/dist');
	this.template('js/helpers/_helpers.js', 'js/helpers/helpers.js');
	this.copy('js/helpers/console.js', 'js/helpers/console.js');
	this.copy('js/helpers/log.js', 'js/helpers/log.js');
	this.copy('js/helpers/shims.js', 'js/helpers/shims.js');

	this.template('_Gruntfile.js', 'Gruntfile.js');
	this.template('_package.json', 'package.json');
	this.template('_bower.json', 'bower.json');

	this.template('_humans.txt', 'humans.txt');
	this.template('_jshintrc', '.jshintrc');
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('bowerrc', '.bowerrc');
	this.copy('jscs.json', '.jscs.json');
	this.copy('scss-lint.yml', '.scss-lint.yml');

	if (this.browserify) {
		this.directory('js/modules', 'js/modules');
	}

	if (this.statix) {
		this.directory('statix/src', 'statix/src');
		this.directory('statix/dist', 'statix/dist');
		this.template('statix/src/templates/includes/_html_start.hbs', 'statix/src/templates/includes/html_start.hbs');
	}
};


KickoffGenerator.prototype.install = function packageFiles() {
	this.installDependencies({
		skipInstall: this.options['skip-install'],
		callback: this._injectDependencies.bind(this)
	});
};


KickoffGenerator.prototype._injectDependencies = function _injectDependencies() {
  if (this.options['skip-install']) {
    this.log(
      'After running `npm install & bower install`, inject your front end dependencies' +
      '\ninto your source code by running:' +
      '\n' +
      '\n' + chalk.yellow.bold('grunt start')
    );
  } else {
    this.spawnCommand('grunt', ['start']);
  }
};

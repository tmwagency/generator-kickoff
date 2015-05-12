module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%%=pkg.name%>

		<% if (statix == true) {
			%>site: grunt.file.readYAML('statix/src/data/site.yml'),<%
		} %>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*", "chotto"<%
		if (statix === true) {
			%>, "assemble"<%
		}
	%>]});

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * Available tasks:
	 * grunt            : Alias for 'serve' task, below
	 * grunt serve      : watch js, images & scss and run a local server
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run uglify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run jshint, uglify, sass:kickoff and csso
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide<% if (grunticon === true) {%>
	 * grunt icons      : generate the icons. uses svgmin and grunticon<% } %>
	 * grunt checks     : run jshint & scsslint
	 */

	/**
	 * GRUNT * Alias for 'serve' task, below
	 */
	grunt.registerTask('default', ['serve']);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run browserSync and watch
	 */
	grunt.registerTask('serve', [<%= taskArrayServe %>]);


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [<%= taskArrayDev %>]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [<%= taskArrayDeploy %>]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [<%= taskArrayStyleguide %>]);

<% if (grunticon === true) {
%>
	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'imagemin:grunticon',
		'grunticon'
	]);

<% }
%>
	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project',
		'scsslint'
	]);

};

module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['scss/**/*.scss', '!scss/styleguide.scss'],
			<% if (statix == true) {%>
			tasks: ['sass:kickoff', 'autoprefixer:dist', 'copy:css']
			<% } else { %>
			tasks: ['sass:kickoff', 'autoprefixer:dist']
			<% } %>
		},

		"styleguide_scss": {
			files: ['scss/styleguide.scss'],
			tasks: [
				'sass:styleguide',
				'autoprefixer:styleguide'
			]
		},

		js: {
			files: ['<%=config.js.fileList%>', 'Gruntfile.js'],
			<% if (statix == true) {%>
			tasks: ['uglify', 'copy:js']
			<% } else { %>
			tasks: ['uglify']
			<% } %>
		},

		livereload: {
			options: { livereload: true },
			files: [
				'css/*.css'
			]
			<% if (statix == true) {%>
			files: ['<%= config.statix.dir%>/dist/css/*.css']
			<% } else { %>
			files: ['css/*.css']
			<% } %>
		},

		grunticon : {
			files: ['img/src/*.svg', 'img/src/*.png'],
			tasks: [
				'clean:icons',
				'svgmin',
				'grunticon'
			]
		}

			<% if (statix === true) {%>,
			assemble : {
				files: ['<%= config.statix.dir%>/src/templates/**/*.hbs', '<%= config.statix.dir%>/src/templates/**/*.md'],
				tasks: ['clean', 'assemble', 'newer:copy'],
				options: {
					livereload: true
				}
			},<% } %>
	}
};
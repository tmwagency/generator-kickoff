module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: [
					<% if (statix == true) { %>
						'<%%= config.statix.dir%>/dist/assets/css/*.css',
						'<%%= config.statix.dir%>/dist/**/*.html',
						'<%%=config.js.distDir%>/**/*.js'
					<% } else { %>
						'<%%=config.css.distDir%>/*.css',
						'<%%=config.js.distDir%>/*.js',
						'**/*.html'
					<% } %>
				]
			},
			options: {
				watchTask: true,
				server: {
				<% if (statix == true) { %>
					baseDir: './<%%= config.statix.dir%>/dist'
				<% } else { %>
					baseDir: './'
				<% } %>
				}
			}
		},


		styleguide: {
			bsFiles: {
				src: [
					'<%%=config.distDir%>/**/*.*',
					'*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './',
					index: 'styleguide/index.html'
				}
			}
		}
	}<%
// if statix is being used, include assemble task
if (statix === true) {
%>,


	/**
	 * Assemble
	 * http://assemble.io/
	 * Static site generator used by Statix
	 * Find out more at https://github.com/tmwagency/statix
	 */
	assemble: {
		options: {
			data: '<%%= config.statix.dir%>/src/**/*.{json,yml}',
			assets: '<%%= config.statix.dir%>/dist/assets',
			helpers: ['helper-moment', 'handlebars-helper-eachitems', '<%%= config.statix.dir%>/src/helpers/helper-*.js'],

			partials: ['<%%= config.statix.dir%>/src/templates/includes/**/*.hbs'],
			flatten: false,

			layout: 'default.hbs',
			layoutdir: '<%%= config.statix.dir%>/src/templates/layouts'
		},

		default: {
			files: [{
				cwd: './<%%= config.statix.dir%>/src/templates/pages/',
				dest: '<%%= site.destination %>',
				expand: true,
				src: ['**/*.{hbs,md}']
			}]
		}
	}<%
} //end of statix conditional
%>
};

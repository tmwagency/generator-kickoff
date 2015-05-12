module.exports.tasks = {
<% if (browserify === true) {%>
	/**
	 * Browserify
	 * https://github.com/jmreidy/grunt-browserify
	 * Grunt task for node-browserify – allows CommonJS-style JS code and packages it for use in the browser
	 */
	browserify: {
		dev: {
			src: ['<%%=config.js.srcFile%>'],
			dest: '<%%=config.js.distDir%><%%=config.js.distFile%>',
			options : {
				browserifyOptions : {
					debug: true
				}
			}
		},
		prod: {
			src: ['<%%=config.js.srcFile%>'],
			dest: '<%%=config.js.distDir%><%%=config.js.distFile%>',
			options : {
				transform: [
					[
						'uglifyify', {
							"global" : true
						}
					]
				],
			}
		}
	},
<% } else { %>
	/**
	 * Uglify
	 * https://github.com/gruntjs/grunt-contrib-uglify
	 * Minifies and concatinates your JS
	 * Also creates source maps
	 */
	uglify: {
		options: {
			// set to false (replace this object) to turn off mangling
			// https://github.com/gruntjs/grunt-contrib-uglify#reserved-identifiers
			<%
				if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {
			%>mangle: {
				except: ['jQuery']
			},<%
				} else {
			%>mangle: true,<%
				}
			%>
			compress: { // set to false (replace this object) to turn off compression
				drop_console: false
			},

			beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
			// report: 'gzip', // report: Show file size report
			sourceMap: '<%%=config.js.distDir%><%%=config.js.distFile%>.map',
			sourceMappingURL: '/<%%=config.js.distFile%>.map',
		},
		js: {
			nonull: true,
			src: '<%%=config.js.fileList%>',
			dest: '<%%=config.js.distDir%><%%=config.js.distFile%>'
		}
	},
<% } %>


	/**
	 * Shimly
	 * https://github.com/nicbell/shimly
	 * Load in a base set of JS shims for use in a project
	 */
	shimly: {
		// things you would like to shim (an array of items from the list above)
		shim: ['Array.forEach', 'Array.filter', 'Array.map', 'Function.bind', 'EventListener'],

		// output location (relative to your grunt.js file location)
		dest: 'js/helpers/shims.js',

		// minify the output (true or false)
		minify: false
	}
};

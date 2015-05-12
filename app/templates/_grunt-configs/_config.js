/**
 * Global Grunt vars
 * Many of the Grunt tasks use these vars. Change as much as you like :)
 */

module.exports = {
	src : "./_grunt-configs/*.js", // This directory. Has all the Grunt tasks grouped into specific js files


	srcDir  : './assets/src',  // <%%=config.srcDir%>
	distDir : './assets/dist', // <%%=config.distDir%>
	tempDir : './assets/temp', // <%%=config.tempDir%>


	// CSS-related Grunt vars
	css : {
		scssDir  : '<%%=config.srcDir%>/scss', // <%%=config.css.scssDir%>
		distDir  : '<%%=config.distDir%>/css', // <%%=config.css.distDir%>

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		distFile : '<%= _.slugify(projectName) %>', // <%%=config.css.srcFile%>

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE8+ with prefixes
		autoprefixer : ['> 5%', 'last 2 versions', 'firefox > 3.6', 'ie > 7'] // <%%=config.css.autoprefixer%>
	},


	// Javascript-related Grunt vars
	js : {
		distDir  : '<%%=config.distDir%>/js/', // <%%=config.js.distDir%>

		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
		distFile : 'script.js', // <%%=config.js.distFile%>

		<% if (browserify === true) {%>srcFile : 'js/script.js',// <%%=config.js.srcFile%>
		<% } else { %>// The files in this array will be concatinated and minified by our build
		// Remove any files that you don't want, & add any that you need

		// <%%=config.js.fileList%>
		fileList : [
				<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {
				%>'./node_modules/jquery/dist/jquery.js',<%
						if (jsLibs.indexOf('jquery1') != -1) {
					%> /* jQuery v1.x */<%
					} if (jsLibs.indexOf('jquery2') != -1) {
						%> /* jQuery v2.x */<%
					}
				}
				// if shimly is being used, add path to config
				if (shims === true) { %>
				'<%%=config.srcDir%>/js/helpers/shims.js',<%
				} %>
				'<%%=config.srcDir%>/js/helpers/console.js',<%

				// if swiftclick is being used, add path to config
				if (jsLibs.indexOf('swiftclick') != -1) {
				%>
				'./node_modules/swiftclick/js/libs/swiftclick.js',<%
				}
				// if trak is being used, add path to config
				if (jsLibs.indexOf('trak') != -1) {
				%>
				'./node_modules/trak.js/dist/trak.js',<%
				}
				// if cookies is being used, add path to config
				if (jsLibs.indexOf('cookies') != -1) {
				%>
				'./node_modules/cookies-js/dist/cookies.js',<%
				}
				%>
				'<%%=config.srcDir%>/js/script.js'
		]<%
		} %>
	},


	// Image-related Grunt vars
	img : {
		srcDir       : '<%%=config.srcDir%>/img',      // <%%=config.img.srcDir%>
		grunticonDir : '<%%=config.srcDir%>/grunticon' // <%%=config.img.grunticonDir%>
	},


	// Testing-related Grunt vars
	// Add any other test vars in here
	testing: {

		// Used by Photobox at the moment
		// http://trykickoff.github.io/learn/grunt.html#task-photobox
		visual : {
			sizes: [ '600', '1000', '1200' ], // <%%=config.testing.visual.sizes%>

			// Change these urls to test your app
			// <%%=config.testing.visual.urls%>
			urls : [
				'http://localhost:3000'
			]
		}
	}<% if (statix === true) {%>,


	statix : {
		dir : 'statix' // <%%= config.statix.dir%>
	}<% } %>
};

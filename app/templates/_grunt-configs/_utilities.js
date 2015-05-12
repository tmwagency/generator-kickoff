module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons   : ['<%%=config.distDir%>/img/icons', '<%%=config.tempDir%>/icons'],
		tempCSS : ['<%%=config.tempDir%>/css']<%
		if (statix === true) {
			%>,
		all: ['<%%= config.statix.dir%>/dist/**/*.html']<%
		} %>
	},


	/**
	 * Chotto
	 * Checks for the existence of files and halts the Grunt build if they don't exist
	 * https://www.npmjs.com/package/chotto
	 */
	chotto : {
		js : {
			filePaths: '<%%=config.js.fileList%>'
		}
	},


	/**
	 * Copy files
	 * https://github.com/gruntjs/grunt-contrib-copy
	 */
	copy: {
		modernizr: {
			src: '<%=config.srcDir%>/js/libs/modernizr.min.js',
			dest: '<%=config.distDir%>/js/libs/modernizr.min.js'
		}<% if (statix === true) {%>,

		statix: {
			files: [
				{
					expand: true,
					cwd: './img',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/img'
				},
				{
					expand: true,
					cwd: './js',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/js'
				},
				{
					expand: true,
					cwd: './<%%=config.css.distDir%>',
					src: ['./*.{css,map}'],
					dest: '<%%= config.statix.dir%>/dist/assets/css'
				}
			]
		},
		css: {
			files: [{
				expand: true,
				cwd: './<%%=config.css.distDir%>',
				src: ['./*.{css,map}'],
				dest: '<%%= config.statix.dir%>/dist/assets/css'
			}]
		},
		img: {
			files: [{
				expand: true,
				cwd: './img',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/img'
			}]
		},
		js: {
			files: [{
				expand: true,
				cwd: './js',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/js'
			}]
		}<% } %>
	}
};

module.exports.tasks = {

	/**
	 * Sass compilation using grunt-sass
	 * https://github.com/sindresorhus/grunt-sass
	 * Includes <%%=config.css.distFile%>.scss<% if (oldIE === true) {%> and <%%=config.css.distFile%>-old-ie.scss<% } %> by default
	 */
	sass: {
		kickoff: {
			options: {
				outputStyle: 'nested',
				precision : 10,
				sourceMap : true
			},
			files: {
				'<%%=config.tempDir%>/css/<%%=config.css.distFile%>.css' : '<%%=config.css.scssDir%>/kickoff.scss'<%
				if (oldIE === true) {
					%>,
				'<%%=config.tempDir%>/css/<%%=config.css.distFile%>-old-ie.css': '<%%=config.css.scssDir%>/kickoff-old-ie.scss'<%
				} %>
			}
		}<%
		if (styleguide === true) {
		%>,

		styleguide: {
			options: {
				outputStyle: 'compressed',
				precision : 10,
			},
			files: {
				'<%%=config.tempDir%>/css/styleguide.css' : '<%%=config.css.scssDir%>/styleguide.scss'
			}
		}<%
		// end of styleguide conditional
		} %>
	},


	/**
	 * Autoprefixer
	 * https://github.com/nDmitry/grunt-autoprefixer
	 * https://github.com/ai/autoprefixer
	 * Auto prefixes your CSS using caniuse data
	 */
	autoprefixer: {
		options: {
			browsers: '<%%=config.css.autoprefixer%>',
			map: true
		},

		kickoff: {
			expand: true,
			flatten: true,
			src: '<%%=config.tempDir%>/css/*.css',
			dest: '<%%=config.css.distDir%>/'
		}
	},


	/**
	 * CSSO
	 * https://github.com/t32k/grunt-csso
	 * Minify CSS files with CSSO
	 */
	csso: {
		dist: {
			options: {
				restructure: false //turns structural optimisations off as can mess up fallbacks http://bem.info/tools/optimizers/csso/description/
			},
			files: {
				'<%%=config.css.distDir%>/<%%=config.css.distFile%>.css'       : '<%%=config.css.distDir%>/<%%=config.css.distFile%>.css'<%
				if (oldIE === true) {
					%>,
				'<%%=config.css.distDir%>/<%%=config.css.distFile%>-old-ie.css': '<%%=config.css.distDir%>/<%%=config.css.distFile%>-old-ie.css'<%
				} %>
			},
		}
	}
};

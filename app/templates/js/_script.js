/*
	Project: <%= projectName %>
	Authors: <%= devNames %>
*/

// Create a closure to maintain scope of the '$' and <%= jsNamespace.toUpperCase() %>
<% if (jsLibs == 'jquery' || jsLibs == 'micro') {%>
;(function (<%= jsNamespace.toUpperCase() %>, $) {
	<% if (jsLibs == 'micro') {%>/* ==========================================================================
	   Micro libraries
	   * Bean    : Events API          - https://github.com/fat/bean
	   * Bonzo   : DOM utility         - https://github.com/ded/bonzo
	   * Qwery   : CSS Selector engine - https://github.com/ded/qwery
	   * domReady: Obvious             - https://github.com/ded/domready
	   * lodash  : Utility library     - http://lodash.com/

	   * Ajax not included. Consider adding https://github.com/ded/Reqwest
	     bower install reqwest
	   ========================================================================== */<% } %>
<% } else { %>
;(function (<%= jsNamespace.toUpperCase() %>) {
<% } %>

	<% if (jsLibs == 'jquery') {%>$(function() {<% } else if(jsLibs == 'micro') { %>domready(function () {<% } %>
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		<%= jsNamespace.toUpperCase() %>.Config.init();

	});// END DOC READY


	<%= jsNamespace.toUpperCase() %>.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	<%= jsNamespace.toUpperCase() %>.Ui = {
		init : function() {
			<%= jsNamespace.toUpperCase() %>.Ui.modal();
		},

		modal : function() {

		}
	};
	*/

<% if (jsLibs == 'micro') {%>
})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {}, bonzo);
<% } else if (jsLibs == 'jquery') { %>
})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {}, jQuery);
<% } else { %>
})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {});
<% } %>

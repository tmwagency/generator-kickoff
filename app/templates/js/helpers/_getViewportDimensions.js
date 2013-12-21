/* ==========================================================================
   Reliably get viewport dimensions

   Notes:
   relies on position:fixed support, but it should work in browsers that
   partially support position: fixed like iOS4 and such...

   Usage:
   * $('.spotlight').css( <%= jsNamespace %>.getViewportDimensions() );
   * $('.spotlight').css('height', <%= jsNamespace %>.getViewportDimensions().height);
   * var viewportwidth = <%= jsNamespace %>.getViewportDimensions.width;
   ========================================================================== */
;(function (<%= jsNamespace %>) {
	<%= jsNamespace %>.getViewportDimensions = function getViewportDimensions(){
		var test = document.createElement( "div" );

		test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
		document.documentElement.insertBefore( test, document.documentElement.firstChild );

		var dims = { width: test.offsetWidth, height: test.offsetHeight };
		document.documentElement.removeChild( test );

		return dims;
	};
})(window.<%= jsNamespace %> = window.<%= jsNamespace %> || {});
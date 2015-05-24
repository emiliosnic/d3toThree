
/**
 *   File: 
 *         scene/renderers.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var RENDERERS = (function () {
	return {
		DEFAULT: function (width, height) {

			var width  = width  || window.innerWidth,
				height = height || window.innerHeight;

			var renderer = new THREE.WebGLRenderer();
				renderer.setClearColor(0xffffff);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(width, height)

			return renderer;
		}
	};
})();


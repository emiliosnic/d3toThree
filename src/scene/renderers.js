
/**
 *   File: 
 *         scene/renderers.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var RENDERERS = (function () {
	return {
		WebGL: function (properties) {

			var width = window.innerWidth,
				height = window.innerHeight;

			if (properties) {
				width  = properties.width  || width;
				height = properties.height || height;
			}

			var renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setClearColor(0xffffff);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(width, height)

			return renderer;
		}
	};
})();


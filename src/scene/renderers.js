
/**
 *   File: 
 *         scene/renderers.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var RENDERERS = (function () {
	return {

		// TODO: CHANGE THIS TO DEFAULT
		
		DEFAULT: function (properties) {

			var width  = _this.model.canvas.width  || window.innerWidth,
				height = _this.model.canvas.height || window.innerHeight;


			var renderer = new THREE.WebGLRenderer();
				renderer.setClearColor(0xffffff);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(width, height)

			return renderer;
		}
	};
})();


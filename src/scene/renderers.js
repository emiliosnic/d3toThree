
/**
 *   File: scene/renderers.js
 */
 
var RENDERERS = (function () {
	return {
		DEFAULT: function (width, height) {

			var width  = width  || window.innerWidth,
				height = height || window.innerHeight;

			var renderer = new THREE.WebGLRenderer({'antialiasing': true});
				renderer.setClearColor(0xffffff);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(width, height)

			return renderer;
		}
	};
})();


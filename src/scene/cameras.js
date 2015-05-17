
/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {
	return {
		Perspective: function (properties) {

			var fov = 100, 
				near = 1, 
				far = 1000, 
				x = 0, 
				y = 0, 
				z = 0,  
				aspect = (window.innerWidth / window.innerHeight);

			if (properties) {
				fov    = properties.fov  || fov;
				near   = properties.near || near;
				far    = properties.far  || far;
				x      = properties.position.x || x;
				y      = properties.position.y || y;
				z      = properties.position.z || z;
				aspect = (properties.width / properties.height) || aspect;
			}

			var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				camera.position.set(x, y, z);

			return camera;
		}
	};
})();



/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {
	return {

		Orthographic: function (properties) {

			var near = 1, 
				far = 1000, 
				width = window.innerWidth,
				height = window.innerHeight,
				x = 0, y = 0, z = 0,
				zoom = 0.5;

			if (properties) {
				near   = properties.near || near;
				far    = properties.far  || far;
				x      = properties.position.x || x;
				y      = properties.position.y || y;
				z      = properties.position.z || z;
				width  = properties.width || width;
				height = properties.height || height;
			}

			var camera = new THREE.OrthographicCamera( zoom * -width, zoom * width, zoom * height, zoom * -height, near, far );
				camera.position.set(x, y, z);

			return camera;
		},
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


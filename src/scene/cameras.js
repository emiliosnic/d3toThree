
/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {

	updateZoom = function(event){
	
		var zoom = 0.02, newZoom = zoom, delta = 0;

		// WebKit / Opera / Explorer 9
		delta = (event.wheelDelta)? (event.wheelDelta / 40): delta;

		// Firefox
		delta = (event.detail)? (- event.detail / 3): delta;

		newZoom -= (delta * 0.001);

		this.left   = - newZoom * (this.right / zoom);
		this.right  =   newZoom * (this.right / zoom);
		this.top    =   newZoom * (this.top   / zoom);
		this.bottom = - newZoom * (this.top   / zoom);
	}

	return {
		Orthographic: function (properties) {

			var near = 1, 
				far = 1000, 
				width = window.innerWidth,
				height = window.innerHeight,
				x = 0, y = 0, z = 0,
				zoom = 0.5;

			if (properties) {
				near   = properties.near   || near;
				far    = properties.far    || far;
				width  = properties.width  || width;
				height = properties.height || height;
				x      = properties.position.x || x;
				y      = properties.position.y || y;
				z      = properties.position.z || z;
			}

			var camera = new THREE.OrthographicCamera( zoom * -width, zoom * width, zoom * height, zoom * -height, near, far );
				camera.position.set(x, y, z);
				camera.updateZoom = updateZoom;

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
				camera.updateZoom = updateZoom;

			return camera;
		}
	};
})();


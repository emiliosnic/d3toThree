
/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {

	var _orbit = 0;

	_updateZoom = function(event){
	
		var zoom = 0.02, newZoom = zoom, delta = 0;

		/**
		 * Support for WebKit / Opera / Explorer 9 / Firefox
		 */ 
		delta = (event.wheelDelta)? (event.wheelDelta / 40): delta;
		delta = (event.detail)? (- event.detail / 3): delta;

		newZoom -= (delta * 0.001);

		this.left   = - newZoom * (this.right / zoom);
		this.right  =   newZoom * (this.right / zoom);
		this.top    =   newZoom * (this.top   / zoom);
		this.bottom = - newZoom * (this.top   / zoom);
	}

	_orbitAroundCenter = function(scene){
		var timer = _orbit * 0.0001;
			_orbit = _orbit + 10;

		this.position.x = Math.cos( timer ) * 500;
		this.position.z = Math.sin( timer ) * 500;
		this.lookAt( scene.position );
	}

	return {
		DEFAULT: function(width, height){
			var width  = width  || window.innerWidth,
				height = height || window.innerHeight,
				zoom   = 0.5;

			var camera = new THREE.OrthographicCamera( zoom * -width, zoom * width, zoom * height, zoom * -height, 1, 1000 );
				camera.position.set(0, 0, 100);
				camera.updateZoom = _updateZoom;
				camera.orbitAroundCenter = _orbitAroundCenter;

			return camera;
		}
	};
})();


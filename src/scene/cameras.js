
/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {

	var _orbitDelta = 0;

	/**
	 * Zoom support for orthogonal Camera
	 */ 
	_updateZoom = function(event){
	
		var zoom    = 0.02, 
			newZoom = zoom, 
			delta   = 0;

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

	/**
	 * Orbits camera around scene center in linear form
	 */ 
	_orbitAroundCenter = function(scene){
		var orbitAmount = _orbitDelta * 0.0001;
			_orbitDelta = _orbitDelta + 10;

		// Update camera position
		this.position.x = Math.cos( orbitAmount ) * 500;
		this.position.z = Math.sin( orbitAmount ) * 500;

		// Orient camera to scene center
		this.lookAt( scene.position );
	}

	return {
		DEFAULT: function(width, height){
			var width  = width  || window.innerWidth,
				height = height || window.innerHeight,
				zoom   = 0.5,
				zDepth = 100;

			var camera = new THREE.OrthographicCamera( zoom * -width, zoom * width, zoom * height, zoom * -height, 1, 1000 );
				camera.position.set(0, 0, zDepth);
				camera.updateZoom = _updateZoom;
				camera.orbitAroundCenter = _orbitAroundCenter;

			return camera;
		}
	};
})();


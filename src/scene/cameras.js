
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

	return {
		DEFAULT: function(){
			var width  = _this.model.canvas.width  || window.innerWidth,
				height = _this.model.canvas.height || window.innerHeight,
				zoom   = 0.5;

			var camera = new THREE.OrthographicCamera( zoom * -width, zoom * width, zoom * height, zoom * -height, 1, 1000 );
				camera.position.set(0, 0, 100);
				camera.updateZoom = updateZoom;

			return camera;
		}
	};
})();


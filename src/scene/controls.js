
/**
 *   File: 
 *         scene/controls.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var CONTROLS = (function () {

	_setup = function(controls){
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed   = 1.0;
		controls.damping     = 0.2;
		controls.noZoom      = true;
		controls.dynamicDampingFactor = 1.0;
	}

	return {
		Trackball: function (camera) {
			var	controls = new THREE.TrackballControls(camera);
				_setup(controls);

			return controls;
		},
		Orbit: function (camera) {
			var	controls = new THREE.OrbitControls( camera );
				_setup(controls);

			return controls;
		}	
	}
})();

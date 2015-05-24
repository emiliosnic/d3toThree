
/**
 *   File: 
 *         scene/controls.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var CONTROLS = (function () {

	return {
		Orbit: function (camera) {
			var	controls = new THREE.OrbitControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed   = 1.0;
				controls.damping     = 0.2;
				controls.noZoom      = true;
				controls.dynamicDampingFactor = 1.0;

			return controls;
		}	
	}
})();

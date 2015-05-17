
/**
 *   File: 
 *         scene/controls.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var CONTROLS = (function () {
	return {
		Trackball: function (camera, properties) {

			var x = 0, 
				y = 0, 
				z = 0;

			if (properties) {
				x      = properties.x || x;
				y      = properties.y || y;
				z      = properties.z || z;
			}

			var controls = new THREE.TrackballControls(camera);
				controls.target.set(x,y,z);

			return controls;
		}
	};
})();

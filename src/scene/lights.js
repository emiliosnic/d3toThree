
/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var LIGHTS = (function () {

	return {
		Ambient: function (properties) {

			var color = 0xffffff;

			if (properties) {
				color = COLORS.normalize(properties.color) || color;
			}

			return new THREE.AmbientLight(color);
		},
		Directional: function (properties) {
		
			var color = 0xffffff, x=1,  y=1, z=1; 

			if (properties) {
				color = COLORS.normalize(properties.color) || color;
				x     = properties.position.x || x;
				y     = properties.position.y || y;
				z     = properties.position.z || z;
			}

			var light = new THREE.DirectionalLight(color);
				light.position.set(x, y, z).normalize();

  			return light;
		}
	};
})();


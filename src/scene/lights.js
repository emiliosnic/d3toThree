
/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var LIGHTS = (function () {

	var zDepth = 1;

	alignToPosition = function(position){
		this.position
		.set(
			position.x, 
			position.y, 
			position.z - zDepth
		)
		.normalize();
	}

	return {
		DEFAULT: function () {
			var light = new THREE.DirectionalLight(0xffffff);
				light.position.set(0,0,zDepth).normalize();
				light.alignToPosition = alignToPosition;

  			return light;
		}
	};
})();


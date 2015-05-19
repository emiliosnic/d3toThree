
/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var LIGHTS = (function () {

	return {
		DEFAULT: function () {
			var light = new THREE.DirectionalLight(0xffffff);
				light.position.set(0,0,20).normalize();

  			return light;
		}
	};
})();


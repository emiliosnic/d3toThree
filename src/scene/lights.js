
/**
 *   File: scene/lights.js
 */

var LIGHTS = (function () {

	var zDepth = 1;

	/**
	 * Align light to given position
	 */ 

	_alignToPosition = function(position){
		this
		.position
		.set( position.x, position.y, position.z - zDepth)
		.normalize();
	}

	return {
		DEFAULT: function () {
			var light = new THREE.DirectionalLight(0xffffff);
				light.position.set(0,0,zDepth).normalize();
				light.alignToPosition = _alignToPosition;

  			return light;
		}
	};
})();



/**
 *   File: 
 *         scene/materials.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var MATERIALS = (function () {

	return {
		DEFAULT_3D: function (color) {
			return (new THREE.MeshPhongMaterial({
				color    : COLORS.normalize(color),
				specular : 0x494949,
				emmisive : 0xffffff,
		        shininess: 10
			}));
		},
		DEFAULT_2D: function (color) {
			return (new THREE.MeshBasicMaterial({ 'color': COLORS.normalize(color)}));
		},
		LINE: function (color, thickness) {
			return (new THREE.LineBasicMaterial({ 'color': COLORS.normalize(color), 'linewidth': thickness}));
		},
		AXIS: function (color, thickness) {
			return (new THREE.LineBasicMaterial({ 'color': COLORS.normalize(color)}));
		}
	};
})();


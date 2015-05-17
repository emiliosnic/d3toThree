
/**
 *   File: 
 *         scene/materials.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var MATERIALS = (function () {
	return {
		Basic: function (color) {
			return (new THREE.MeshBasicMaterial({ 'color': COLORS.HEX(color)}));
		},
		LineBasic: function (color) {
			return (new THREE.LineBasicMaterial({ 'color': COLORS.HEX(color)}));
		}
	};
})();



/**
 *   File: 
 *         scene/materials.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var MATERIALS = (function () {
	return {
		Basic: function (properties) {
			var color = (properties && properties.color)? properties.color : 'default';
			return (new THREE.MeshBasicMaterial({ 'color': COLORS.HEX(color)}));
		},
		Phong: function (properties) {
			return (new THREE.MeshPhongMaterial({
				color: COLORS.HEX(properties.color),
				specular: COLORS.HEX(properties.specular),
				emmisive: COLORS.HEX(properties.emmisive),
		        shininess: properties.shininess
			}));
		},
		LineBasic: function (properties) {
			var color = (properties && properties.color)? properties.color : 'default';
			return (new THREE.LineBasicMaterial({ 'color': COLORS.HEX(color)}));
		}
	};
})();


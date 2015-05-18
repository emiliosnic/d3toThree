
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
			return (new THREE.MeshBasicMaterial({ 'color': COLORS.normalize(color)}));
		},
		Phong: function (properties) {

			// TODO: Determine specular, emmisive using colors and 
			//  some fractions that can be updated in the config
			//
			return (new THREE.MeshPhongMaterial({
				color:    COLORS.normalize(properties.color),
				specular: COLORS.normalize(properties.specular),
				emmisive: COLORS.normalize(properties.emmisive),
		        shininess: 100
			}));
		},
		Lambertian: function (properties) {

		},
		LineBasic: function (properties) {
			var color = (properties && properties.color)? properties.color : 'default';
			return (new THREE.LineBasicMaterial({ 'color': COLORS.normalize(color)}));
		}
	};
})();


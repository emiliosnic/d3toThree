
/**
 *   File: 
 *         scene/geometries.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var GEOMETRIES = (function () {
	return {
		Circle: function (camera, properties) {

			// TODO: COMPLETE
		},
		Line: function (properties) {

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			return new THREE.Line(geometry, MATERIALS.LineBasic(properties.color));
		}
	};
})();

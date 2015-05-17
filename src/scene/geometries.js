
/**
 *   File: 
 *         scene/geometries.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var GEOMETRIES = (function () {
	return {
		Circle: function (properties) {
			var circle = new THREE.Mesh(new THREE.CircleGeometry(properties.radius, 64), MATERIALS.Basic(properties.color));
				circle.position.set(properties.x, properties.y, properties.z);

				return circle;
		},
		Text: function (properties) {

			var WIDTH  = 8,
				HEIGHT = 0;

			var textGeom = new THREE.TextGeometry( properties.text, { 
				size:   WIDTH, 
				height: HEIGHT
			});
			var	textMesh = new THREE.Mesh( textGeom, MATERIALS.Basic(properties.color));
				textMesh.position.set( 
					properties.x - WIDTH/2, 
					properties.y - WIDTH/2, 
					properties.z );

			return textMesh;
		},
		Line: function (properties) {

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			return new THREE.Line(geometry, MATERIALS.LineBasic(properties.color));
		}
	};
})();

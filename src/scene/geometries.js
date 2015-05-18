
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
			var circle = new THREE.Mesh(new THREE.CircleGeometry(properties.radius, 64), MATERIALS.Basic({'color': properties.color}));
				circle.position.set(properties.x, properties.y, properties.z);

				return circle;
		},
		Sphere: function (properties) {
			var sphere = new THREE.Mesh(

				// TODO: Update Phone so that speclular and emmisive are determined 

				new THREE.SphereGeometry(properties.radius, 64, 64), 
				MATERIALS.Phong({
					color: properties.color,
					specular: '#f1f1f1',
					emissive: '#006063'
				})
			);
			sphere.position.set(properties.x, properties.y, properties.z);

			return sphere;
		},
		Text: function (properties) {

			var WIDTH  = 8,
				HEIGHT = 0;

			var textGeom = new THREE.TextGeometry( properties.text, { 
				size:   WIDTH, 
				height: HEIGHT
			});
			var	textMesh = new THREE.Mesh( textGeom, MATERIALS.Basic({'color':properties.color}));
				textMesh.position.set( 
					properties.x - WIDTH/2, 
					properties.y - WIDTH/2, 
					properties.z );

			return textMesh;
		},
		Line: function (properties) {

			var material = properties.material ||  MATERIALS.LineBasic();

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			return new THREE.Line(geometry, material);
		}
	};
})();

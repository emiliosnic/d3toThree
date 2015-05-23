
/**
 *   File: 
 *         scene/geometries.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var GEOMETRIES = (function () {

	unhide = function(){
		this.material.opacity = 1;
		this.material.transparent = true;
	}
	hide = function(){
		this.material.opacity = 0.1;
		this.material.transparent = true;
	}
	return {
		CIRCLE: function (properties) {
			var circle = new THREE.Mesh(new THREE.CircleGeometry(properties.radius, 64), MATERIALS.DEFAULT_2D(properties.color));
				circle.position.set(properties.x, properties.y, properties.z);

			return circle;
		},
		SPHERE: function (properties) {
			var sphere = new THREE.Mesh(new THREE.SphereGeometry(properties.radius, 64, 64), MATERIALS.DEFAULT_3D(properties.color));
				sphere.position.set(properties.x, properties.y, properties.z);
				sphere.unhide = unhide;
				sphere.hide = hide;

			return sphere;
		},
		TEXT: function (properties) {

			var WIDTH  = 8,
				HEIGHT = 0;

			var textGeom = new THREE.TextGeometry( properties.text, { 
				size:   WIDTH, 
				height: HEIGHT
			});
			var	textMesh = new THREE.Mesh( textGeom, MATERIALS.DEFAULT_2D(properties.color));
				textMesh.position.set( 
					properties.x - WIDTH/2, 
					properties.y - WIDTH/2, 
					properties.z );

			return textMesh;
		},
		LINE: function (properties) {

			var material = properties.material ||  MATERIALS.LINE(properties.color, properties.thickness);

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			var line = new THREE.Line(geometry, material);
				line.unhide = unhide;
				line.hide = hide;

			return line;
		},
		AXIS: function (properties) {

			var material = properties.material ||  MATERIALS.AXIS();

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			var line = new THREE.Line(geometry, material);

			return line;
		}
	}

})();

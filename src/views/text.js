
/**
 *   File: 
 *         views/text.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.text = function() {  

	this.type = 'text';    
	this.meshes = [];

	var that = this;

	this.load = function(text){


		// UNITS.extractRotation(text.transform)

		var offsetX  = UNITS.normalizeH(text.x),
			offsetY  = UNITS.normalizeV(text.y),
			rotation = UNITS.extractRotation(text.transform);

			// If there is a text rotation remove text.length 


		if (! rotation) {
 			offsetX -= text.length;
		}

		var mesh = GEOMETRIES.TEXT({ x: offsetX, y: offsetY, z: 0, text: text.val});

		/*
		if (rotation) {
			mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(rotation));
		}
		*/


		that.meshes.push(mesh);

	}
}
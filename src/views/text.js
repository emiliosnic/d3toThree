
/**
 *   File: views/text.js
 */

VIEW.text = function() {  

	this.type = 'text';    
	this.meshes = [];

	this.load = function(text){

		var offsetX  = UNITS.normalizeH(text.x, this.properties.canvas),
			offsetY  = UNITS.normalizeV(text.y, this.properties.canvas),
			rotation = UNITS.extractRotation(text.transform);

		if (! rotation) 
 			offsetX -= text.length;

		this.meshes.push(GEOMETRIES.TEXT({ x: offsetX, y: offsetY, z: 0, text: text.val}));
	}
}
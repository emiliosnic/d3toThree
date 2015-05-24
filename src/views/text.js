
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

		var offsetX  = UNITS.normalizeH(text.x),
			offsetY  = UNITS.normalizeV(text.y),
			rotation = UNITS.extractRotation(text.transform);

		if (! rotation) 
 			offsetX -= text.length;

		that.meshes.push(GEOMETRIES.TEXT({ x: offsetX, y: offsetY, z: 0, text: text.val}));
	}
}
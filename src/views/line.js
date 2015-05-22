
/**
 *   File: 
 *         views/circle.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.line = function() {  
	
	this.type = 'line';
	this.meshes = []; 

	this.load = function(data){

		var that = this;
	
		data.forEach(function (item) {

			var attributes = item.extractNode('attributes'),
				x1_base = attributes.extractNode('x1').nodeValue,
				x2_base = attributes.extractNode('x2').nodeValue,
				y1_base = attributes.extractNode('y1').nodeValue,
				y2_base = attributes.extractNode('y2').nodeValue,
				thickness_style = attributes.extractNode('style').nodeValue;

			var x1 = UNITS.normalizeH(x1_base) + _this.model.canvas.offsetLeft,
				x2 = UNITS.normalizeH(x2_base) + _this.model.canvas.offsetLeft,
 				y1 = UNITS.normalizeV(y1_base) + _this.model.canvas.offsetTop,
				y2 = UNITS.normalizeV(y2_base) + _this.model.canvas.offsetTop,
				thickness = 2 * UNITS.extractThickness(thickness_style);

			that.meshes.push(GEOMETRIES.LINE({ x1: x1, y1: y1, z1:0, x2: x2, y2: y2, z2:0, thickness: thickness, color: '#999999'}));

		});
	}
}

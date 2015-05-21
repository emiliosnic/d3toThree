
/**
 *   File: 
 *         views/axis.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.axis = function() {  

	this.type = 'axis';    
	this.meshes = [];

	this.load = function(data){

		for (index = 0; index < data.length; index++){

			/**
			 * Extract Axis Points
			 */ 

			if (data[index].nodeName === "g") {

				/**
				 * Extract Ticks
				 */ 

				var tickPosition = UNITS.extractTranslation(data[index].attributes.extractNode('transform').nodeValue),
					tickLine = { 
						x: parseInt(data[index].childNodes.extractNode('line').attributes.extractNode('x2').nodeValue),
						y: parseInt(data[index].childNodes.extractNode('line').attributes.extractNode('y2').nodeValue)
					};

				var startX = UNITS.normalizeH(tickPosition.x) + _this.model.canvas.offsetLeft,
					startY = UNITS.normalizeV(tickPosition.y) - _this.model.canvas.offsetTop,
					endX = startX + tickLine.x,
					endY = startY - tickLine.y;

				this.meshes.push(
					GEOMETRIES.AXIS({ 
						x1: startX, y1: startY, z1:0,
						x2: endX  , y2: endY  , z2:0
					})
				);
				
				/**
				 * Extract Text
				 */ 
				var text = data[index].childNodes.extractNode('text'),
					textData = text.textContent,
					textSize = parseFloat(text.attributes.extractNode('dy').nodeValue),
					textOffsets = {
						x: parseInt(text.attributes.extractNode('x').nodeValue),
						y: parseInt(text.attributes.extractNode('y').nodeValue)
					};

				this.meshes.push(
					GEOMETRIES.TEXT({
						text: textData,
						x: (startX + textOffsets.x + tickLine.x), 
						y: (startY - textOffsets.y - tickLine.y), 
						z: 0
					})
				);


			} else if (data[index].nodeName === "path") {

				/**
				 * Extract Axis Paths
				 */ 

				var points = UNITS.extractSVGPath(data[index].attributes.extractNode('d').nodeValue);

				for (var j = 1; j < points.length; j++) {

					var startY = UNITS.normalizeV(parseInt(points[j-1].y)) - _this.model.canvas.offsetTop;
						startX = UNITS.normalizeH(parseInt(points[j-1].x)) + _this.model.canvas.offsetLeft;
						endX   = UNITS.normalizeH(parseInt(points[j].x))   + _this.model.canvas.offsetLeft;
						endY   = UNITS.normalizeV(parseInt(points[j].y))   - _this.model.canvas.offsetTop;

					this.meshes.push(
						GEOMETRIES.AXIS({
							x1: startX, y1: startY, z1:0,
							x2: endX,   y2:endY   , z2:0
						})
					);
				}
			}
		}
	}
}
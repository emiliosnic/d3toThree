
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

				var startX = UNITS.normalizeH(tickPosition.x) + _this.model.canvas.offsets.x,
					startY = UNITS.normalizeV(tickPosition.y) - _this.model.canvas.offsets.y,
					endX = startX + tickLine.x,
					endY = startY - tickLine.y;

				this.meshes.push(
					GEOMETRIES.Line({
						x1: startX, y1: startY, z1:0,
						x2: endX  , y2: endY  , z2:0,
						color: 'default'
					})
				);
				
				/**
				 * Extract Text
				 */ 
				
				/**
				 <TODO>
					offsetHeight: 12
					offsetLeft: -2
					offsetParent: body
					offsetTop: -6
					offsetWidth: 12

					console.log("TEXT");
					console.log(data[index].childNodes);
					console.log(data[index].childNodes.extractNode('text').__data__);
					console.log(data[index].childNodes.extractNode('text').attributes.extractNode('x').nodeValue);
					console.log(data[index].childNodes.extractNode('text').attributes.extractNode('y').nodeValue);
				*/

			} else if (data[index].nodeName === "path") {

				/**
				 * Extract Axis Paths
				 */ 

				var points = UNITS.extractSVGPath(data[index].attributes.extractNode('d').nodeValue);

				for (var j = 1; j < points.length; j++) {

					var startY = UNITS.normalizeV(parseInt(points[j-1].y)) - _this.model.canvas.offsets.y;
						startX = UNITS.normalizeH(parseInt(points[j-1].x)) + _this.model.canvas.offsets.x;
						endX   = UNITS.normalizeH(parseInt(points[j].x))   + _this.model.canvas.offsets.x;
						endY   = UNITS.normalizeV(parseInt(points[j].y))   - _this.model.canvas.offsets.y;

					this.meshes.push(
						GEOMETRIES.Line({
							x1: startX, y1: startY, z1:0,
							x2: endX,   y2:endY   , z2:0,
							color: 'default'
						})
					);
				}
			}
		}
	}
}
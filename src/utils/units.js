
/**
 *   File: 
 *         utils/units.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var UNITS = (function () {
	return {
		extractTranslation: function (input) {
			
			if (typeof input !== "string")
				return { x: -1, y: -1};

			var translation = /\(([^)]+)\)/.exec(input)[1].split(','),
				offsetX = parseInt(translation[0]) || 0,
				offsetY = parseInt(translation[1]) || 0;

			return {
				x: offsetX,
				y: offsetY
			};
		},
		extractSVGPath: function(input) {

			var points = [],
				parsedInput = input.split(/(?=[MVHV])/);

			// Extract points 

			parsedInput.forEach(function(item, i){

				var index = item.charAt(0), 
					values = item.substring(1).split(',');

				if (index === "V"){
					points.push({x: "V", y: values[0]})

				} else if (index === "H"){
					points.push({x: values[0], y: "H"})

				} else {
					points.push({x: values[0], y: values[1]})
				}
			});

			// Normalize all points to numbers 

			for (var j = 1; j < points.length; j++) {
				if (points[j].x == "V") {
					points[j].x = points[j-1].x;
				} 
				if (points[j].y == "H") {
					points[j].y = points[j-1].y;
				}
			}
			return points;
		},
		normalizeV: function(value) {
			return (value <= _this.model.canvas.height) ? (_this.model.canvas.height/2 - value): -(_this.model.canvas.height/2 - value); 
		},
		normalizeH: function(value) {
			return (value <= _this.model.canvas.width) ? -(_this.model.canvas.width/2 - value): (_this.model.canvas.width/2 - value); 
		}
	};
})();

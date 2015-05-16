
var translateOffsets =function(input){
	if (typeof input !== "string")
		return {
			x: -1, 
			y: -1
		};

	var translation = /\(([^)]+)\)/.exec(input)[1].split(','),
		offsetX = parseInt(translation[0]) || 0,
		offsetY = parseInt(translation[1]) || 0;
    return {
    	x: offsetX,
    	y: offsetY
    };
}

var normalizePosition = {};

normalizePosition.x = function(value){
	return (value <= _this.model.canvas.width) ? -(_this.model.canvas.width/2 - value): (_this.model.canvas.width/2 - value); 
}
normalizePosition.y = function(value){
	return (value <= _this.model.canvas.height) ? (_this.model.canvas.height/2 - value): -(_this.model.canvas.height/2 - value); 
	return 1;
};


var extractSVGPath = function(input) {
	var points = [];
	var commands = input.split(/(?=[MVHV])/);

	commands.forEach(function(item, i){
		
		var index = item.charAt(0), 
			tmp = item.substring(1),
			xy = tmp.split(','),
			newX,
			newY;

			if (index === "V"){
				newX = "V";
				newY = xy[0];

			} else if (index === "H"){
				newX = xy[0];
				newY = "H";
			
			} else {
				newX = xy[0];
				newY = -xy[1];
			}

		points.push({x: newX, y: newY})
	})
	return points;
};

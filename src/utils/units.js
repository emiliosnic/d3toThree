
var translateOffsets =function(input){
	var translation = /\(([^)]+)\)/.exec(input)[1].split(','),
		offsetX = parseInt(translation[0]) || 0,
		offsetY = parseInt(translation[1]) || 0;
    return {
    	x: offsetX,
    	y: offsetY
    };
}

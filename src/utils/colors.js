var RGBToHex =function(input){

	var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	var r,g,b;

	if(typeof tests === "object" && tests.length == 3){
		r = input[0];
		g = input[1];
		b = input[2];
	} else {
		var rgb = /\(([^)]+)\)/.exec(input)[1].split(',');
		r = parseInt(rgb[0]);
		g = parseInt(rgb[1]);
		b = parseInt(rgb[2]);
	}
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

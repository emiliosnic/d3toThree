

var colorToHex =function(input){

	this.componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	// Default return
	if (input == undefined || typeof input !== "string")
    	return "#000000";

	// If this is already a hex clear
	if (input.charAt(0) === '#') {
		return ((input.length > 6 )? input.substring(0,7):input);
	
	} else {
		var rgb = /\(([^)]+)\)/.exec(input)[1].split(',');
		var r,g,b;
		r = parseInt(rgb[0]);
		g = parseInt(rgb[1]);
		b = parseInt(rgb[2]);
		
		// Else if this is rgb call rgba
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

}

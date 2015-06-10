
/**
 *   File: utils/colors.js
 */

var COLORS = (function () {

	/**
	 * Convery component to HEX
	 */ 

	_componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	return {
		normalize: function (input) {

			if (input == undefined || typeof input !== "string" || input == 'default')
		    	return "#000000";

			if (input.charAt(0) === '#') {
				return ((input.length > 6 )? input.substring(0,7):input);
			
			} else {
				
				var rgb = /\(([^)]+)\)/.exec(input)[1].split(',');
				var r = parseInt(rgb[0]),
					g = parseInt(rgb[1]),
					b = parseInt(rgb[2]);
				
				return "#" + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
			}
		}
	};
})();

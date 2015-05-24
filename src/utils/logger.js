
/**
 *   File: 
 *         utils/logger.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var LOGGER = (function () {
	return {
		report: function (properties) {

			var output = _this.about.name + " : " + properties.message;

			if (properties.error)
				output = output + " : " + properties.error;

			console.error(output);
		}
	};
})();

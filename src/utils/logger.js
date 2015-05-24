
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

			var output = _this.about.name + " : " + properties.message ;
				output = (properties.error)? output + " : " + (properties.error): output;

			console.error(output);
		}
	};
})();

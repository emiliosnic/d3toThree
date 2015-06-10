
/**
 *   File: utils/logger.js
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

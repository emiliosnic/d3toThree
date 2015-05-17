
/**
 *   File: 
 *         utils/helpers.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

/**
 * Extract Node Protype
 */ 

Object.prototype.extractNode = function(key) {
	
	var obj = this;

	if (key in this){
		obj = this[key];
	} else {
		for (var item in this) {
			if (this.hasOwnProperty(item) && this[item].nodeName === key){
				obj = this[item];
				break;
			}
		}
	}
	return obj;
};

/**
 * Extension Helper
 */ 

function extend (base, extension) {
  if (arguments.length > 2) 
  	[].forEach.call(arguments, function (extension) { 
 	 	extend(base, extension) 
 	})
  else 
  	for (var k in extension) 
  		base[k] = extension[k]
  return base;
}



function ObserverFactory(){}

ObserverFactory.queue = [];

/**
* TODO: 
*      2. Add an observers list using a hashmap (remove array)
*      3. Include an efficient built-int iterator for the observer
*      4. Remove type constructors into and refactor (expect -> then -> catch )
*/

ObserverFactory.prototype.observe = function() {
	[].forEach.call(arguments, function (obj) { 
		if (obj){
			ObserverFactory.queue.push(obj);
			// Add caller 
		}
	});
	return this;
};


ObserverFactory.prototype.then = function(callback) {
	this.callback = callback || {};
	return this;
};

ObserverFactory.prototype.expectKeyType = function(keyType) {
	this.expectedType = keyType;
	return this;
};

ObserverFactory.prototype.expectKey = function(key) {
	this.expectedKey = key;
	return this;
};

ObserverFactory.prototype.type = function(type){
	var constr = type,
		newObserver;

	if (typeof ObserverFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	if (typeof ObserverFactory[constr].prototype.drive !== "function") { 
		ObserverFactory[constr].prototype = new ObserverFactory();
	}
	return new ObserverFactory[constr]();
}

ObserverFactory.attr = function() { 
	this.type = 'attr';
	this.expectedKey = null;
}
ObserverFactory.each = function() { 
	this.type = 'each';
	this.expectedKey = null;
}

ObserverFactory.prototype.notify = function(args) {

	var key = args.key || {},
		keyType = args.keyType || {},
		value = args.value || {},
		type = args.type || {};

	if (!ObserverFactory.hasOwnProperty(type))
		return;

	ObserverFactory.queue.some(function(observer, i) {

	    if (observer.type == type && 
			(observer.expectedKey == key) || (observer.expectedType == keyType)){
	    
			if (typeof observer.callback === "function" && value != null){
				observer.callback(value); 
			}
			ObserverFactory.queue.splice(i, 1);
			return true; 
		}
	});
} 


var extend = function(base,extension){
	if (arguments.length > 2) {
		[].forEach.call(arguments, function (extension) { extend(base, extension) })
	} else { 
		for (var k in extension) 
			base[k] = extension[k]
	}
	return base;
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

var convertToHex = function(input){
	var color = input.substring(0, input.length - 2);
	color = color.replace(/ /g,'');

	var rgb = color.split(',');

    return "#" + componentToHex(parseInt(rgb[0])) + componentToHex(parseInt(rgb[1])) + componentToHex(parseInt(rgb[2]));
}

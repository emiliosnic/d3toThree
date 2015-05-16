
function ObserverFactory(){}

ObserverFactory.queue = [];

ObserverFactory.prototype.observe = function() {
	[].forEach.call(arguments, function (obj) { 
		if (obj)
			ObserverFactory.queue.push(obj);
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
	var constr = type;

	if (typeof ObserverFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	return new ObserverFactory[constr]();
}

ObserverFactory.attr   = function() { this.type = 'attr';   }
ObserverFactory.each   = function() { this.type = 'each';   }
ObserverFactory.append = function() { this.type = 'append'; }

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


Object.prototype.extractNode = function(key) {
	
	var obj = this;

	// Extract directly
	if (key in this){
		obj = this[key];
	} else {
		// Find first item that has the nodeName required
		for (var item in this) {
			if (this.hasOwnProperty(item) && this[item].nodeName === key){
				obj = this[item];
				break;
			}
		}
	}
	return obj;
};





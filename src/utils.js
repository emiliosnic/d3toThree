
function ObserverFactory(){
}

ObserverFactory.queue = [];
// Objects should be in the form of
/*
	caller: 'attr',
	content: ''
*/

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

ObserverFactory.prototype.expectArray = function(key) {
	this.expectedType = (typeof []);
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


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


/**
 * Observer Factory
 */ 

function ObserverFactory(){}

ObserverFactory.queue = [];
var observerFactory = new ObserverFactory

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
	if (typeof ObserverFactory[constr].prototype.drive !== "function") { 
		ObserverFactory[constr].prototype = new ObserverFactory();
	}
	return new ObserverFactory[constr]();
}

ObserverFactory.attr   = function() { this.type = 'attr';   }
ObserverFactory.append = function() { this.type = 'append'; }

ObserverFactory.prototype.notify = function(args) {

	var key     = args.key     || {},
		keyType = args.keyType || {},
		value   = args.value   || {},
		type    = args.type    || {};

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


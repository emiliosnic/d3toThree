
/**
 *   File: 
 *         views/_base.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

function VIEW(){};

VIEW.prototype.type = function(type){
	var constr = type;

	if (typeof VIEW[constr] !== "function"){
		console.error(_this.about.name + " - Failed to construct VIEW - Caller:"+ arguments.callee.caller.name)
	}
	if (typeof VIEW[constr].prototype.type !== "function") { 
		VIEW[constr].prototype = new VIEW();
	}
	return new VIEW[constr]();
}


VIEW.prototype.setProperties = function(properties) {
	this.properties = properties;
	return this;
};

VIEW.prototype.loadData = function(data) {
	this.load(data);
	return this;
};

VIEW.prototype.toGroup = function(group) {

	this.meshes.forEach(function(item){
		if (group && group instanceof THREE.Group)
			group.add(item);
	})

	VIEW.meshes = [];

	return this;
};

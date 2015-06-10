
/**
 *   File: views/base.js
 */

function VIEW(){};

VIEW.prototype.type = function(type){
	var constr = type;

	if (typeof VIEW[constr] !== "function"){
		LOGGER.report({'message': ('Failed to construct VIEW - Caller '+arguments.callee.caller.name)});
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

VIEW.prototype.appendTo = function(group) {

	if (group && group instanceof THREE.Group){
		this.meshes.forEach(function(item){
			item.userData.parent = group;
			group.add(item);
		})
	}
	VIEW.meshes = [];

	return this;
};

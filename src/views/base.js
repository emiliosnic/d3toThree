
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

	/*
     * Make sure that the meshes are  not touchning 

	var determineDistance = function(position){
		return Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z);
	};

	var center_mesh  = undefined,
		center_mesh_distance = 9999999999999999;

	for (var i = this.meshes.length - 1; i >= 0; i--) {
		var distance_from_origin = determineDistance(this.meshes[i].position);
		if (distance_from_origin < center_mesh_distance){
			center_mesh_distance = distance_from_origin;
			center_mesh =this.meshes[i];
		}
	};
	*/

	if (group && group instanceof THREE.Group){
		this.meshes.forEach(function(item){
			item.userData.parent = group;
			group.add(item);
		})
	}
	VIEW.meshes = [];

	return this;
};

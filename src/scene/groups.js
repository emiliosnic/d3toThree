
/**
 *   File: scene/groups.js
 */


var GROUPS = (function () {


	/**
	 * Find all intersecting lines in a sphere and return an array with the corresponding group-indices of these lines meshes
	 */ 

	_findIntersectingLines = function(properties){

		var intersectingObjects = [];

		properties.group.children.forEach(function(line, lineIndex){
		
			// Find All intersecting Lines 
			if (line.type == "Line"){
				for (var vertexIndex = 0; vertexIndex <=1; vertexIndex++) {
					
					var xDiff = (Math.abs(line.geometry.vertices[vertexIndex].x) - Math.abs(properties.baseObject.position.x)),
						yDiff = (Math.abs(line.geometry.vertices[vertexIndex].y) - Math.abs(properties.baseObject.position.y)),
						zDiff = (Math.abs(line.geometry.vertices[vertexIndex].z) - Math.abs(properties.baseObject.position.z));

					if (Math.abs(xDiff + yDiff + zDiff) < 0.1){
						intersectingObjects.push({
							'lineIndex':lineIndex,
							'vertexIndex':vertexIndex
						});
					}
				}
			}
		});

		return intersectingObjects;
	}

	/**
	 * Determine z offsets for group's meshes for network graphs
	 */ 

	_expandNetworkDepth = function(type){
		switch (type){
			case 'degree-centrality'     : _expandUsingDegreeCentrality(this);      break;
			default                      : _expandUsingDegreeCentrality(this);
		}
	}

	/**
	 * Expand graph using degree centrality
	 */ 

	_expandUsingDegreeCentrality = function(group){

		var nodeGroups = [],
			that = group;
		
		group.children.forEach(function(circle, circleIndex){
			if (circle.type == "Mesh" && circle.geometry.type == "SphereGeometry"){
				var groupConnectedLinesIndices =  _findIntersectingLines({
					'group'      : that,
					'baseObject' : circle
				});
				nodeGroups.push({
					'circleIndex': circleIndex,
					'lineIndices': groupConnectedLinesIndices
				})
			}
		});

		var maxDepth = 0,
			zDepth   = 0;

		nodeGroups.forEach(function(nodeGroup){

			if (nodeGroup.lineIndices.length > 0) {
				zDepth = 5 * (nodeGroup.lineIndices.length); 
				if (zDepth >= maxDepth){
					maxDepth = zDepth
				}
			}

			// Update node depth
			group.children[nodeGroup.circleIndex].position.setZ(zDepth);
			
			// Update line depths
			nodeGroup.lineIndices.forEach(function(line){
				that.children[line.lineIndex].geometry.vertices[line.vertexIndex].z = zDepth;
				that.children[line.lineIndex].geometry.verticesNeedUpdate = true;
			});

			// Update group's depth
			group.position.setZ(-maxDepth/2);
		})
	}

	/**
	 * Call hide on connected nodes for network groups
	 */ 

	_highlightConnectedNodes = function(origin){

		var that = this;

		this.children.forEach(function(line){
			if (line.type == "Line"){
				for (var verticeIndex = 0; verticeIndex <=1; verticeIndex++) {

					var xDiff = (Math.abs(line.geometry.vertices[verticeIndex].x) - Math.abs(origin.position.x)),
						yDiff = (Math.abs(line.geometry.vertices[verticeIndex].y) - Math.abs(origin.position.y)),
						zDiff = (Math.abs(line.geometry.vertices[verticeIndex].z) - Math.abs(origin.position.z));

					if (Math.abs(xDiff + yDiff + zDiff) < 0.1){

						// Unhide Line
						line.show();
						
						// Update end nodes with colors
						that.children.forEach(function(node){
							if (node.type == "Mesh" && node != origin){
								for (var verticeIndex = 0; verticeIndex <=1; verticeIndex++) {

									var xDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].x) - Math.abs(node.position.x)),
										yDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].y) - Math.abs(node.position.y)),
										zDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].z) - Math.abs(node.position.z));

									if (Math.abs(xDiff2 + yDiff2 + zDiff2) < 0.1){
										node.show();
										line.material.color.set(node.material.color);
										line.verticesNeedUpdate = true;
									}
								}
							}
						})
					}
				}
			}
		})
	}
	
	return {
		DEFAULT: function () {
			var group = new THREE.Group();
			group.expandNetworkDepth = _expandNetworkDepth;
			group.highlightConnectedNodes = _highlightConnectedNodes;


			return group;
		}
	};
})();



/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var GROUPS = (function () {
	
	_expandZ = function(){

		var nodeGroups = [];
			totalConnectedLines = 0;
		
		var that = this;
		this.children.forEach(function(circle, circleIndex){
			if (circle.type == "Mesh"){

				var groupConnectedLinesIndices = []; 

				that.children.forEach(function(line, lineIndex){
				
					// Find All intersecting Lines 
					if (line.type == "Line"){
						for (var vertexIndex = 0; vertexIndex <=1; vertexIndex++) {
							
							var xDiff = (Math.abs(line.geometry.vertices[vertexIndex].x) - Math.abs(circle.position.x)),
								yDiff = (Math.abs(line.geometry.vertices[vertexIndex].y) - Math.abs(circle.position.y)),
								zDiff = (Math.abs(line.geometry.vertices[vertexIndex].z) - Math.abs(circle.position.z));

							if (Math.abs(xDiff + yDiff + zDiff) < 0.1){
								// line.geometry.vertices[vertexIndex].z = zDepth;
								// line.geometry.verticesNeedUpdate = true;
								totalConnectedLines+=1;
								groupConnectedLinesIndices.push({
									'lineIndex':lineIndex,
									'vertexIndex':vertexIndex
								});
							}
						}
					}
				})
				nodeGroups.push({
					'circleIndex': circleIndex,
					'lineIndices': groupConnectedLinesIndices
				})
			}
		});

		var plus = true;
		nodeGroups.forEach(function(nodeGroup){

			var zDepth = 1;

			if (nodeGroup.lineIndices.length > 0) {
				zDepth = 5000 * (nodeGroup.lineIndices.length)/ totalConnectedLines; 
				zDepth = (plus)? -zDepth : zDepth;
			}
			plus = !plus;
			
			// Update node depth
			that.children[nodeGroup.circleIndex].position.setZ(zDepth);
			
			// Update line depths
			nodeGroup.lineIndices.forEach(function(line){
				that.children[line.lineIndex].geometry.vertices[line.vertexIndex].z = zDepth;
				that.children[line.lineIndex].geometry.verticesNeedUpdate = true;
			});
		})

	}
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
				};
			}
		})
	}
	
	return {
		DEFAULT: function () {
			var group = new THREE.Group();
			group.expandZ = _expandZ;
			group.highlightConnectedNodes = _highlightConnectedNodes;

			return group;
		}
	};
})();


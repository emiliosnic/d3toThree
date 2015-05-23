
/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var GROUPS = (function () {
	
	randomIntFromInterval = function(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
	}

	expandZ = function(){

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

		nodeGroups.forEach(function(nodeGroup){

			var zDepth = 1;

			if (nodeGroup.lineIndices.length > 0) {
				zDepth = 5000 * (nodeGroup.lineIndices.length)/ totalConnectedLines; 
				zDepth = (Math.random()>0.5)? -zDepth : zDepth;
				console.log(zDepth);
			}

			// Update node depth
			that.children[nodeGroup.circleIndex].position.setZ(zDepth);
			
			// Update line depths
			nodeGroup.lineIndices.forEach(function(line){
				that.children[line.lineIndex].geometry.vertices[line.vertexIndex].z = zDepth;
				that.children[line.lineIndex].geometry.verticesNeedUpdate = true;
			});
		})

	}

	return {
		DEFAULT: function () {
			var group = new THREE.Group();
			group.expandZ = expandZ;

			return group;
		}
	};
})();


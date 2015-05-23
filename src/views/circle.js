
/**
 *   File: 
 *         views/circle.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.circle = function() {  
	
	this.type = 'circle';
	this.meshes = []; 


	/*
	 * TODO:
	 * 	Construct a mesh tree, starting from the center object and push all the objects by close neighbours
	 */ 

	this.load = function(data){

		var that = this;
	
		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value,
				color   = COLORS.normalize(item.style.cssText.slice(6));

			var x = UNITS.normalizeH(offsetX),
				y = UNITS.normalizeV(offsetY);
				
			if (_this.config['3D']){
				// 3D Mode

				var sphere = GEOMETRIES.SPHERE({ radius: radius, color: color, x: x, y: y, z: 0});
				if (item.connectedMeshes && item.connectedMeshes.length > 0){
					sphere.connectedMeshes = item.connectedMeshes;
				}

				that.meshes.push(sphere);

			} else {
				// 2D Mode
				var circle = GEOMETRIES.CIRCLE({ radius: radius, color: color, x: x, y: y, z: 0});
				that.meshes.push(circle);
			}
		});
	}
}

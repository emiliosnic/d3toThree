
/**
 *   File: views/circle.js
 */

VIEW.circle = function() {  
	
	this.type = 'circle';
	this.meshes = []; 

	this.load = function(data){

		var that = this;
		
		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value,
				color   = COLORS.normalize(item.style.cssText.slice(6));

			var x = UNITS.normalizeH(offsetX, that.properties.canvas),
				y = UNITS.normalizeV(offsetY, that.properties.canvas);
		
			if (that.properties['3D']){
				/*
				 * 3D View
				 */
				that.meshes.push(GEOMETRIES.SPHERE({ radius: radius, color: color, x: x, y: y, z: 0}));

			} else {
				/*
				 * 2D View
				 */
				var circle = GEOMETRIES.CIRCLE({ radius: radius, color: color, x: x, y: y, z: 0});
				that.meshes.push(circle);
			}
		});
	}
}

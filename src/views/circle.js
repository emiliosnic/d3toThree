
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

			var x = UNITS.normalizeH(offsetX) + _this.model.canvas.offsetLeft;
				y = UNITS.normalizeV(offsetY) - _this.model.canvas.offsetTop;

			if (_this.config['3D']){
				// 3D Mode
				that.meshes.push(GEOMETRIES.SPHERE({ radius: radius, color: color, x: x, y: y, z: 0}));
			} else {
				// 2D Mode
				that.meshes.push(GEOMETRIES.CIRCLE({ radius: radius, color: color, x: x, y: y, z: 0}));
			}
		});
	}
}

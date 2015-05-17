
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

	this.load = function(data){

		var that = this;
	
		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value,
				color   = COLORS.HEX(item.style.cssText.slice(6));

			var x = UNITS.normalizeH(offsetX) + _this.model.canvas.offsets.x;
				y = UNITS.normalizeV(offsetY) - _this.model.canvas.offsets.y;

			var circle = new THREE.Mesh( new THREE.CircleGeometry(radius, 64),  MATERIALS.Basic(color));
				circle.position.set(x, y, 0 );

			that.meshes.push(circle);
		});
	}
}

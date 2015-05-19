
/**
 *   File: 
 *         views/wireframe.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.wireframe = function() {  

	this.type = 'wireframe'; 
	this.meshes = [];

	var material = new THREE.LineBasicMaterial( { color: 0xd9d9d9, linewidth: .1 } );
 

	var width  = _this.model.canvas.width,
		height = _this.model.canvas.height,
		step = 25;

	for ( var i = 0; i <= width/step; i ++ ) {

		var line = GEOMETRIES.Line({
			x1: 0, y1: -(width/2), z1:0,
			x2: 0, y2:  (width/2), z2:0,
			material: material
		})

	    line.position.x = (( i * step ) - (width/2));
		this.meshes.push(line);

		var line = GEOMETRIES.Line({
			x1: 0, y1: -(width/2), z1:0,
			x2: 0, y2:  (width/2), z2:0,
			material: material
		})

	    line.position.y = (( i * step ) - (width/2));
	    line.rotation.z = 90 * Math.PI / 180;
		this.meshes.push(line);
	}
}

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
 
	for ( var i = 0; i <= 38; i ++ ) {

		var line = GEOMETRIES.Line({
			x1: 0, y1: -500, z1:0,
			x2: 0, y2: 500 , z2:0,
			material: material
		})

	    line.position.x = (( i * 25 ) - 500) + _this.model.canvas.offsetLeft;
		this.meshes.push(line);

		var line = GEOMETRIES.Line({
			x1: 0, y1: -500, z1:0,
			x2: 0, y2: 500 , z2:0,
			material: material
		})

	    line.position.y = (( i * 25 ) - 500) - _this.model.canvas.offsetTop;
	    line.rotation.z = 90 * Math.PI / 180;

		this.meshes.push(line);
	}
}
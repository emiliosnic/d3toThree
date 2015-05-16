
function GeometryFactory(){};

GeometryFactory.prototype.type = function(type){
	var constr = type;

	if (typeof GeometryFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	if (typeof GeometryFactory[constr].prototype.drive !== "function") { 
		GeometryFactory[constr].prototype = new GeometryFactory();
	}
	return new GeometryFactory[constr]();
}

GeometryFactory.circle = function() {  
	this.type = 'circle'; 
	this.meshes = [];
}
GeometryFactory.line   = function() {  
	this.type = 'line';    
	this.meshes = [];
}

GeometryFactory.prototype.loadData = function(data) {

	var that = this,
		offset = translateOffsets(_this.model.canvas.transform);

	var loadDataCircle = function(){

		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value;
				color   = RGBToHex(item.style.cssText.slice(6));

			var x,
				y;

			// Normalize width and height
			x = (offsetX <= _this.model.canvas.width)  ?  - (_this.model.canvas.width/2 - offsetX): (_this.model.canvas.width/2 - offsetX); 
			y = (offsetY <= _this.model.canvas.height) ?   (_this.model.canvas.height/2 - offsetY): - (_this.model.canvas.height/2 - offsetY);
			
			// Apply offsets	
			x += offset.x;
			y -= offset.y;

			var material = new THREE.MeshBasicMaterial({ 'color': color}),
				circleGeometry = new THREE.CircleGeometry(radius, 64),
				circle = new THREE.Mesh( circleGeometry,  new THREE.MeshBasicMaterial({ 'color': color}));

			circle.position.set(x, y, 0 );

			// Keep to meshes
			that.meshes.push(circle);

		});

	}

	if (this.type == "circle"){
		loadDataCircle();
	}

	return this;
};

GeometryFactory.prototype.toGroup = function(group) {

	this.meshes.forEach(function(item){
		if (group && group instanceof THREE.Group)
			group.add(item);
	})

	GeometryFactory.meshes = [];

	return this;
};

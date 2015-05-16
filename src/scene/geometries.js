
function GeometryFactory(){};

GeometryFactory.prototype.type = function(type){
	var constr = type;

	if (typeof GeometryFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	if (typeof GeometryFactory[constr].prototype.type !== "function") { 
		GeometryFactory[constr].prototype = new GeometryFactory();
	}
	return new GeometryFactory[constr]();
}

// ---------------------------------------
// Circle Geometry
// ---------------------------------------

GeometryFactory.circle = function() {  
	
	this.type = 'circle';
	this.meshes = []; 

	this.loadDataInner = function(data){
		var that = this;
		
		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value,
				color   = colorToHex(item.style.cssText.slice(6));

			var x,
				y;

			// Normalize width and height
			x = normalizePosition.x(offsetX);
			y = normalizePosition.y(offsetY);

			// Apply offsets	
			x += _this.model.canvas.offsets.x;
			y -= _this.model.canvas.offsets.y;

			var material = new THREE.MeshBasicMaterial({ 'color': color}),
				circleGeometry = new THREE.CircleGeometry(radius, 64),
				circle = new THREE.Mesh( circleGeometry,  new THREE.MeshBasicMaterial({ 'color': color}));

			circle.position.set(x, y, 0 );

			// Keep to meshes
			that.meshes.push(circle);

		});
	}
}

// ---------------------------------------
//  Axis Geometry
// ---------------------------------------

GeometryFactory.axis   = function() {  
	this.type = 'axis';    
	this.meshes = [];

	this.loadDataInner = function(data){

		// AXIS have paths and ticks
		// Check for ticks and draw
		// Then check for paths and draw


		for (i =  0; i < data.length; i++){

			if (data[i].nodeName === "g") {
				// Apply Ticks
				
				var tickPosition = { x:0, y:0};

				// Setup Line
				tickPosition = translateOffsets(data[i].attributes.extractNode('transform').nodeValue);

				var x = normalizePosition.x(tickPosition.x) + _this.model.canvas.offsets.x,
					y = normalizePosition.y(tickPosition.y) - _this.model.canvas.offsets.y;
		
				var line = { x:0, y:0 };

				line.y = parseInt(data[i].childNodes.extractNode('line').attributes.extractNode('y2').nodeValue);
				line.x = parseInt(data[i].childNodes.extractNode('line').attributes.extractNode('x2').nodeValue);

			    var material = new THREE.LineBasicMaterial({ color: 0x000000});
			    var geometry = new THREE.Geometry();

				// Default
				var newx,
					newy;

			    // Determine Axis Lines
				if (!isNaN(line.x) && !isNaN(line.y)){
					newx = x+ line.x;
					newy = y+ line.y;
				} else {
					// Default Values
					if (this.properties.orientation === "horizontal") {
						newx = x, newy = y+10;
					} else {
						newx = x-10, newy = y;
					}
				}

				// Add lines
				geometry.vertices.push(new THREE.Vector3(x, y, 0));
				geometry.vertices.push(new THREE.Vector3(newx, newy, 0));

				this.meshes.push(new THREE.Line(geometry, material));
				

				/*			
					offsetHeight: 12
					offsetLeft: -2
					offsetParent: body
					offsetTop: -6
					offsetWidth: 12
				*/

				// Add text
				/*
					console.log("TEXT");
					console.log(data[i].childNodes);
					console.log(data[i].childNodes.extractNode('text').__data__);
					console.log(data[i].childNodes.extractNode('text').attributes.extractNode('x').nodeValue);
					console.log(data[i].childNodes.extractNode('text').attributes.extractNode('y').nodeValue);
				*/

			} else if (data[i].nodeName === "path") {

				// Apply line
				var points = extractSVGPath(data[i].attributes.extractNode('d').nodeValue);

				if (this.properties.orientation === "horizontal") {
					points.splice(-1,1);
					points.splice(-1,1);
				}

				var count = points.length;

				for (var j = 1; j < count; j++) {
					var startX = parseInt(points[j-1].x),
						startY = parseInt(points[j-1].y),
						endX   = points[j].x,
						endY   = points[j].y;


						if (points[j].x == "V") {
							endX = parseInt(points[j-1].x);

							points[j].x = parseInt(points[j-1].x);

						} else if (points[j].y == "H") {
							endY = parseInt(points[j-1].y);
							points[j].y = parseInt(points[j-1].y);
						}


					startY = normalizePosition.y(startY) - _this.model.canvas.offsets.y;
					startX = normalizePosition.x(startX) + _this.model.canvas.offsets.x;
					endX   = normalizePosition.x(endX) + _this.model.canvas.offsets.x;
					endY   = normalizePosition.y(endY) - _this.model.canvas.offsets.y;


						geometry.vertices.push(new THREE.Vector3(startX, startY, 0));
						geometry.vertices.push(new THREE.Vector3(endX  , endY, 0));

						this.meshes.push(new THREE.Line(geometry, material));

				}
			}
		}
	}
}

GeometryFactory.prototype.setProperties = function(properties) {
	this.properties = properties;
	return this;
};

GeometryFactory.prototype.loadData = function(data) {
	this.loadDataInner(data);
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

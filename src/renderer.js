
_this.to3D = function(d3id){
	
	// Create Three 	
	var container, 
		camera, 
		camera = new THREE.PerspectiveCamera( 115, (_this.model.canvas.width || window.innerWidth) / (_this.model.canvas.height || window.innerHeight), 1, 1000);
		renderer = new THREE.WebGLRenderer({ antialias: true }),
		scene = new THREE.Scene(),
		group = new THREE.Group();

	(function () {
		var configureCanvas = function () {	
		};

		var removeSVG = function () {
			var child = document.getElementById(d3id.replace("#",""));
			child.parentNode.removeChild(child);
		};

		var constructMeshes = function () {
			// console.log(_this.model.content);
		};
		
		configureCanvas();
		constructMeshes();
		// removeSVG();

	}());

	// Also add controllers for on mouse etc

	// Create a recyclable graph object


	container = document.getElementById('custom_panel');

	function init() {


		console.log(_this.model.content);

		_this.model.content.forEach(function (item) {
			var radius = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value;
				color = convertToHex(item.style.cssText.slice(10));

				var x,y;

				// Center width
				if (offsetX <= _this.model.canvas.width) {
					x = - (_this.model.canvas.width/2 - offsetX);
				} else {
					x = (_this.model.canvas.width/2 - offsetX);
				}

				// Center height
				if (offsetY <= _this.model.canvas.height) {
					y = (_this.model.canvas.height/2 - offsetY);
				} else {
					y = - (_this.model.canvas.height/2 - offsetY);
				}

				console.log("ADDING CIRCLE");
				console.log(offsetX);
				console.log(offsetY);
				console.log("----------");
				console.log(x);
				console.log(y);
				console.log(radius);
				console.log(color);
				addCircle(x,y, radius, color)
		});


		// Circle generator
		function addCircle(x, y, size, nodeColor) {

			var material = new THREE.MeshBasicMaterial({ color: nodeColor});
			var circleGeometry = new THREE.CircleGeometry(size, 64);              
			var circle = new THREE.Mesh( circleGeometry,  new THREE.MeshBasicMaterial({ color: nodeColor}));

			circle.position.set( x, y, 0 );

			group.add(circle);
		}
		/*
		addCircle(0,0, 8, "#ff0000");
		addCircle(-_this.model.canvas.width/2,0, 8, "#ff0000");
		addCircle(_this.model.canvas.width/2,0, 8, "#ff0000");
		addCircle(0,_this.model.canvas.height/2, 8, "#ff0000");
		addCircle(0,-_this.model.canvas.height/2, 8, "#ff0000");
		*/
		/*
		function addLine(xStart, xEnd, yStart, yEnd) {
			var geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3(xStart, yStart, 0));
			geometry.vertices.push(new THREE.Vector3(xEnd, yEnd, 0));
	        group.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000})));
		}
		*/


		// Set up renderer

		camera.position.set(0, 0, 100 );
		group.position.set(0, 0, 0 );
		scene.add(camera);
		scene.add(group);


		renderer.setClearColor( 0xffffff );
		renderer.setPixelRatio(window.devicePixelRatio );
		renderer.setSize(_this.model.canvas.width || window.innerWidth,_this.model.canvas.height || window.innerHeight);
		container.appendChild( renderer.domElement );

		// Run renderer
		// TODO ON RENDER clear this.model and D3
		renderer.render(scene, camera);


	}
	function destroy() {
		// Clear previous graph
		$('#content').empty();

		var obj, i;
		for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
		    obj = scene.children[ i ];
		    if (obj !== camera) {
		        scene.remove(obj);
		    }
		}

	}
	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}

	// Random Value Generator
	function getRandom(size){
		return Math.floor(Math.random() * size);
	};

	// Random Value Generator (Min-Max)
	function getRandomMaxMin(min, max){
		return Math.random() * (max - min) + min;
	};

	init();
	animate();

};

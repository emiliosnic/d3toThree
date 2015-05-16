
_this.render = function(d3id){
	
	// View configuration

	var camera, renderer, scene, group, container, geometryFactory;


	(function () {
		var configureCanvas = function () {	

			// Setup Canvas
			geometryFactory = new GeometryFactory();

			scene = new THREE.Scene(),
			container = document.getElementById(d3id);

			camera = new THREE.PerspectiveCamera( 115, (_this.model.canvas.width || window.innerWidth) / (_this.model.canvas.height || window.innerHeight), 1, 1000);
			camera.position.set(0, 0, 100);

			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = new THREE.WebGLRenderer({ antialias: true }),
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio(window.devicePixelRatio );
				
			renderer.setSize(
				_this.model.canvas.width  || window.innerWidth,
				_this.model.canvas.height || window.innerHeight
			);

		};

		var removeSVG = function () {
			/*
				var child = document.getElementById(d3id.replace("#",""));
				child.parentNode.removeChild(child);
			*/
		};

		var constructMeshes = function () {
			// console.log(_this.model.content);
		};
		
		configureCanvas();
		constructMeshes();
		// removeSVG();

	}());

	function init() {

		// Setup circle geometry
		geometryFactory
			.type('circle')
			.loadData(_this.model.content)
			.toGroup(group);

		// Remove this model
		_this.model.content = {};

		// Run renderer
		scene.add(camera);
		scene.add(group);
		renderer.render(scene, camera);
		container.appendChild( renderer.domElement );
	}

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}

	init();
	animate();

};

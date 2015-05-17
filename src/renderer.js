
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

_this.render = function(){

	var camera, renderer, scene, group, container, view, controls, canvas, raycaster, light;

	(function () {
		var createCanvas = function () {	

			view  = new VIEW();
			scene = new THREE.Scene(),
			container = document.getElementById(_this.config.target);

			camera = CAMERAS.Perspective({ 
				width    : _this.model.canvas.width,
				height   : _this.model.canvas.height,
				fov      : 113,
				position : { x: 0, y:0, z:100 } 
			});


			if (_this.config.mouseControls){
				controls = CONTROLS.Trackball(camera);
			}

			raycaster = new THREE.Raycaster(); 

			light = LIGHTS.Directional({ color:"#ffffff", x:0, y:0, z:20});

			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = new THREE.WebGLRenderer({ antialias: true }),
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(
				_this.model.canvas.width  || window.innerWidth,
				_this.model.canvas.height || window.innerHeight
			);
		};

		var removeSVG = function () {
			/**
			 * TODO: Implement
			 */ 
		};
		
		createCanvas();
		init();
		animate();
		removeSVG();


	}());

	function init() {

		/**
		 * Setup Data View
		 */ 
		view
			.type(_this.config.view)
			.loadData(_this.model.content)
			.toGroup(group);

		/**
		 * Setup X Axis View
		 */ 
		view
			.type('axis')
			.setProperties({'orientation': 'horizontal'})
			.loadData(_this.model.axis.x)
			.toGroup(group);

		/**
		 * Setup Y Axis View
		 */ 
		view
			.type('axis')
			.setProperties({'orientation': 'vertical'})
			.loadData(_this.model.axis.y)
			.toGroup(group);


		/**
		 * Flush Model and Run Render
		 */ 

		_this.model.content = {};

		scene.add(camera);
		scene.add(group);
		scene.add(light);

		container.appendChild( renderer.domElement );
	}

 	function animate() {

		if ( _this.config.mouseControls)
		    controls.update(); 

		requestAnimationFrame(animate);
		render();

	}

	function render() {
		renderer.render( scene, camera );
	}

};

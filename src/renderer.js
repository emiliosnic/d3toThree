
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

_this.render = function(d3id){

	var camera, renderer, scene, group, container, view, controls;

	(function () {
		var createCanvas = function () {	

			view  = new VIEW();
			scene = new THREE.Scene(),
			container = document.getElementById(d3id);

			camera = CAMERAS.Perspective({ 
				width    : _this.model.canvas.width,
				height   : _this.model.canvas.height,
				fov      : 115,
				position : { x: 0, y:0, z:100 } 
			});

			controls = CONTROLS.Trackball(camera);

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
			.type('circle')
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

		container.appendChild( renderer.domElement );
	}

 	function animate() {
		requestAnimationFrame(animate);
	    controls.update();    
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}
};

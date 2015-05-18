
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

_this.render = function(){

	var camera, renderer, scene, group, container, controls, canvas, light;

	(function () {
		var createCanvas = function () {	

			container = document.getElementById(_this.config.target);

			camera = CAMERAS.Orthographic({ 
				width    : _this.model.canvas.width,
				height   : _this.model.canvas.height,
				position : { x: 0, y:0, z: 100 }
			});

			if (_this.config.mouseControls){
				controls = CONTROLS.Trackball(camera);
				controls.noZoom = true;
			}

			light = LIGHTS.Directional({ color:"#ffffff", x:0, y:0, z:20});
			
			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = RENDERERS.WebGL({
				width : _this.model.canvas.width, 
				height: _this.model.canvas.height
			});

			if ( _this.config.mouseControls){
				renderer.domElement.addEventListener( 'mousewheel', mousewheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox
			}
			container.appendChild( renderer.domElement );

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
		new VIEW()
						.type(_this.config.view)
			.loadData(_this.model.content)
			.appendTo(group);

		/**
		 * Setup Axes View
		 */ 
		_this.model.axes.forEach(function(item){
			new VIEW()
				.type('axis')
				.loadData(item)
				.appendTo(group);
		})

		/**
		 * ShowWireframe
		 */ 

		if (_this.config.wireframe){
			new VIEW()
				.type('wireframe')
				.appendTo(group);
		}

		/**
		 * Flush Model and Run Render
		 */ 

		_this.model.content = {};

		scene = new THREE.Scene(),
		scene.add(camera);
		scene.add(group);
		scene.add(light);

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

	function mousewheel( event ) {
		var zoom = 0.02;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
		    delta = event.wheelDelta / 40;
		} else if ( event.detail ) { // Firefox
		    delta = - event.detail / 3;
		}

		var width = camera.right / zoom;
		var height = camera.top / zoom;

		zoom -= delta * 0.001;

		camera.left = -zoom*width;
		camera.right = zoom*width;
		camera.top = zoom*height;
		camera.bottom = -zoom*height;

		camera.updateProjectionMatrix();

		renderer.render( scene, camera );
	}

};

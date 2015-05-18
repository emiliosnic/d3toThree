
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

_this.controller = function(){

	var camera, renderer, scene, group, container, controls, canvas, light;

	(function () {
		var setupCanvas = function () {	

			container = document.getElementById(_this.config.target);

			camera = CAMERAS.Orthographic({ 
				width    : _this.model.canvas.width,
				height   : _this.model.canvas.height,
				position : { x: 0, y:0, z: 100 }
			});

			light = LIGHTS.Directional({ 
				color    : "#ffffff", 
				position: { x:0, y:0, z:20 } 
			});
			
			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = RENDERERS.WebGL({
				width : _this.model.canvas.width, 
				height: _this.model.canvas.height
			});

			// Move this inside renderer

			if (_this.config.mouseControls){
				controls = CONTROLS.Orbit(camera);
				controls.addEventListener( 'change', render );
				renderer.domElement.addEventListener( 'mousewheel',     mousewheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); 
			}
			container.appendChild( renderer.domElement );

		};

		var removeSVG = function () {
			/**
			 * TODO: Implement
			 */ 
		};

		var init = function () {	

			/**
			 * Setup Data View
			 */ 
			new VIEW()
				
				// TODO: Determine this config dynamically

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
			 * Flush Model
			 */ 

			_this.model.content = {};

			/**
			 * Setup Scene
			 */ 

			scene = (new THREE.Scene())
				.add(camera)
				.add(light)
				.add(group);
		}

		var animate = function () {	

			requestAnimationFrame(animate);
			render();
		}

		var render = function() {	
			renderer.render( scene, camera );
		}

		var mousewheel = function(event) {
			
			event.preventDefault();
			event.stopPropagation();

			camera.updateZoom(event);
			camera.updateProjectionMatrix();

			renderer.render(scene,camera);
		}

		setupCanvas();
		removeSVG();
		init();
		animate();

	}());
};

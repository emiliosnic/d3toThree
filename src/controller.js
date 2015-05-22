
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

		var setupConfigs = function () {	

			/**
			 * Setup Custom Light (override default)
			 */ 
			
			if (typeof _this.config.light === "object" ) {
				LIGHTS.default = function(){
					return _this.config.light;
				}
			}

			/**
			 * Setup Custom Camera (override default)
			 */ 

			if (typeof _this.config.camera === "object" ) {
				CAMERAS.DEFAULT = function(){
					return _this.config.camera;
				}
			}

			/**
			 * Setup Custom Materials (override default)
			 */ 

			if (typeof _this.config.material_2D === "object" ) {
				MATERIAL.DEFAULT_2D = function(){
					return _this.config.material_2D;
				}
			}
			if (typeof _this.config.material_3D === "object" ) {
				MATERIAL.DEFAULT_3D = function(){
					return _this.config.material_3D;
				}
			}

		};

		var setupCanvas = function () {	

			camera   = CAMERAS.DEFAULT();
			light    = LIGHTS.DEFAULT();
			renderer = RENDERERS.DEFAULT();
			group    = new THREE.Group();

			if (_this.config.controls){
				controls = CONTROLS.Orbit(camera);
				controls.addEventListener( 'change', render );
				renderer.domElement.addEventListener( 'mousewheel',     mousewheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); 
			}

			container = document.getElementById(_this.config.target);
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

			_this.model.content.forEach(function(view){
				new VIEW()
					.type(view.type)
					.loadData(view.data)
					.appendTo(group);
			});

			/**
			 * Setup Axes View
			 */ 
			_this.model.axes.forEach(function(axis){
				new VIEW()
					.type('axis')
					.loadData(axis)
					.appendTo(group);
			})

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

		setupConfigs();
		setupCanvas();
		removeSVG();
		init();
		animate();

	}());
};

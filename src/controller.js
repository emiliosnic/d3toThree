
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


_this.controller = function(){

	var camera, renderer, scene, group, container, controls, canvas, light, mouse, raycaster;

	(function () {

		var setupConfigs = function () {	

 			// TODO: FIX
 			// 		 THIS WONT WORK WITH CUSTOM LIGHT OR CAMERA

			/**
			 * Setup Custom Light (override default)
			 */ 
			/*
			if (typeof _this.config.light === "object" ) {
				LIGHTS.default = function(){
					return _this.config.light;
				}
			}
			*/
			/**
			 * Setup Custom Camera (override default)
			 */ 
			/*
			if (typeof _this.config.camera === "object" ) {
				CAMERAS.DEFAULT = function(){
					return _this.config.camera;
				}
			}
			*/

			/**
			 * Setup Custom Materials (override default)
			 */ 
			/*
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
			*/
		};

		var setupCanvas = function () {	

			camera    = CAMERAS.DEFAULT();
			light     = LIGHTS.DEFAULT();
			renderer  = RENDERERS.DEFAULT();
			group     = GROUPS.DEFAULT();
			mouse     = new THREE.Vector3();
			raycaster = new THREE.Raycaster();

			if (_this.config.controls){
				controls = CONTROLS.Orbit(camera);
				controls.addEventListener( 'change', function(){
					camera.updateProjectionMatrix();
					light.alignToPosition(camera.position); 
					render();
				});
				renderer.domElement.addEventListener( 'mousewheel',     mousewheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); 
				renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );

				console.log("2");
				console.log(renderer.domElement.width);
				console.log(renderer.domElement.height);

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
			 * Setup Text View
			 */ 
			_this.model.texts.forEach(function(text){
				new VIEW()
					.type('text')
					.loadData(text)
					.appendTo(group);
			})


			/**
			 * Flush Model
			 */ 

			_this.model.content = {};


			/**
			 * IScene
			 */ 

			if (_this.config.network && _this.config['3D']){
				group.expandZ();
			}


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

			// stats2.begin();

			render();

			// stats2.end();
		}

		var render = function() {	

			if (_this.config.orbit){
				camera.orbitAroundCenter(scene);
				light.alignToPosition(camera.position); 
			}
			renderer.render( scene, camera );
		}

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			render();
		}

		var mousewheel = function(event) {
			event.preventDefault();
			event.stopPropagation();

			camera.updateZoom(event);
			camera.updateProjectionMatrix();

			renderer.render(scene,camera);
		}
		

		function onDocumentMouseMove( event ) {

			event.preventDefault();


			var xPerc = (UNITS.normalizeH(event.offsetX)/renderer.domElement.width  * 4 ),
				yPerc = (UNITS.normalizeV(event.offsetY)/renderer.domElement.height * 4 );

			mouse.set( xPerc, yPerc, - 1); 
			mouse.unproject( camera );

			var dir = new THREE.Vector3();
				dir.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );

			raycaster.set(mouse,dir);

			var intersects = raycaster.intersectObjects( group.children, true );

			if (intersects.length>0){
					
				// De-highlihgt meshes in group
				group.children.forEach(function(object){
					object.hide();
				})

				intersects.forEach(function(intersection){

					// Highlight intersected objects
					intersection.object.unhide();

					/**
					 * Network Connector - Show connected nodes
					 */ 

					if (_this.config.network){
						group.children.forEach(function(line){
							if (line.type == "Line"){
								for (var verticeIndex = 0; verticeIndex <=1; verticeIndex++) {

									var xDiff = (Math.abs(line.geometry.vertices[verticeIndex].x) - Math.abs(intersection.object.position.x)),
										yDiff = (Math.abs(line.geometry.vertices[verticeIndex].y) - Math.abs(intersection.object.position.y)),
										zDiff = (Math.abs(line.geometry.vertices[verticeIndex].z) - Math.abs(intersection.object.position.z));

									if (Math.abs(xDiff + yDiff + zDiff) < 0.1){
										// Unhide Line
										line.unhide();
										
										// Update end nodes with colors
										group.children.forEach(function(node){
											if (node.type == "Mesh" && node != intersection.object){
												for (var verticeIndex = 0; verticeIndex <=1; verticeIndex++) {

													var xDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].x) - Math.abs(node.position.x)),
														yDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].y) - Math.abs(node.position.y)),
														zDiff2 = (Math.abs(line.geometry.vertices[verticeIndex].z) - Math.abs(node.position.z));

													if (Math.abs(xDiff2 + yDiff2 + zDiff2) < 0.1){
														node.unhide();		
													}
												}
											}
										})
									}
								};

							}
						})
					}

					// if intersection.object.conncetedMeshse != null 
					//   then call unhide on connected meshes!

				})
			} else {
				// De-highlihgt meshes in group
				group.children.forEach(function(object){
					object.unhide();
				})
			}
		}

		/*
		 * Setup Scene
		 */

		setupConfigs();
		setupCanvas();
		removeSVG();
		init();
		animate();

	}());
};


/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


function Controller() {

	var _controller = {};

	/**
	 * Initialize Controller
	 */ 
		_controller.config = { 
			'source'   : undefined, 
			'target'   : undefined,
			'controls' : false,
			'3D'       : false,
			'orbit'    : false
		};
		_controller.canvas = {
			offsetLeft: 0,
			offsetTop: 0,
			width: null, 
			height: null 
		}

		_controller.model = { 
			axes: [],
			texts: [],
			content: []
		}; 

		/*
			.render({
				'svg':    <ID>  // required, check the model to find hte correct ID
				'target':  <TARGET> // optinoal, default makes it source and erase
			})
		*/


	var camera, renderer, scene, group, container, controls, canvas, light, mouse, raycaster;
	var ENABLE_ANIMATION = true;

	var setupCanvas = function () {	

		camera    = CAMERAS.DEFAULT(_controller.canvas.width, _controller.canvas.height);
		light     = LIGHTS.DEFAULT();
		renderer  = RENDERERS.DEFAULT(_controller.canvas.width, _controller.canvas.height);
		group     = GROUPS.DEFAULT();
		mouse     = new THREE.Vector3();
		raycaster = new THREE.Raycaster();

		if (_controller.config.controls){
			controls = CONTROLS.Orbit(camera);
			controls.addEventListener( 'change', function(){
				ENABLE_ANIMATION = false;
				camera.updateProjectionMatrix();
				light.alignToPosition(camera.position); 
				render();
			});
			renderer.domElement.addEventListener( 'mousewheel',     mousewheel, false );
			renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); 
			renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		}

		if (_controller.config.target != undefined){
			container = document.getElementById(_controller.config.target);
		} else {
			container = document.getElementById(_controller.config.source);
		}
		container.appendChild( renderer.domElement );
	};


	var init = function () {	
		/**
		 * Setup Data View
		 */ 

		_controller.model.content.forEach(function(view){
			new VIEW()
				.type(view.type)
				.setProperties({
					'canvas':_controller.canvas,
					'3D':    _controller.config['3D']
				})
				.loadData(view.data)
				.appendTo(group);
		});

		/**
		 * Setup Axes View
		 */ 
		_controller.model.axes.forEach(function(axis){
			new VIEW()
				.type('axis')
				.setProperties({
					'canvas':_controller.canvas,
					'3D':    _controller.config['3D']
				})
				.loadData(axis)
				.appendTo(group);
		})


		/**
		 * Setup Text View
		 */ 
		_controller.model.texts.forEach(function(text){
			new VIEW()
				.type('text')
				.setProperties({
					'canvas':_controller.canvas,
					'3D':    _controller.config['3D']
				})
				.loadData(text)
				.appendTo(group);
		})


		/**
		 * Flush Model
		 */ 

		_controller.model.content = {};


		/**
		 * IScene
		 */ 
		if (_controller.config.network && _controller.config['3D']){
			group.expandZ();
		}


		/**
		 * Setup Scene
		 */ 

		scene = (new THREE.Scene())
			.add(camera)
			.add(light)
			.add(group);

		/**
		 * If source and targer are the same, then flush the SVG tree
		 */ 

		if (_controller.config.source == _controller.config.target || _controller.config.target == undefined){
			document.getElementById(_controller.config.source).getElementsByTagName('svg')[0].remove();
		} 

	}

	var animate = function () {	
		requestAnimationFrame(animate);

		// stats2.begin();

		render();

		// stats2.end();
	}

	var render = function() {	
		if (ENABLE_ANIMATION && _controller.config.orbit ){
			camera.orbitAroundCenter(scene);
			light.alignToPosition(camera.position); 
		}
		camera.updateProjectionMatrix();
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

		var xPerc = (UNITS.normalizeH(event.offsetX-_controller.canvas.offsetLeft,_controller.canvas)/renderer.domElement.width  * 4 ),
			yPerc = (UNITS.normalizeV(event.offsetY-_controller.canvas.offsetTop, _controller.canvas)/renderer.domElement.height * 4 );

		mouse.set( xPerc, yPerc, - 1); 
		mouse.unproject( camera );

		var dir = new THREE.Vector3();
			dir.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );

		raycaster.set(mouse,dir);

		var intersects = raycaster.intersectObjects( group.children, true );

		if (intersects.length>0){
			// De-highlight all meshes in group
			group.children.forEach(function(object){
				object.hide();
			})

			// Highlight intersected objects
			intersects.forEach(function(intersection){
				intersection.object.show();

				// If this is a network graph then also highlight connected nodes
				if (_controller.config.network){
					group.highlightConnectedNodes(intersection.object);
				}

			})
		} else {
			// De-highlight all meshes in group
			group.children.forEach(function(object){
				object.show();
			})
		}
	}

	// 	PUBLIC METHODS
	_controller.setup = function(){
		setupCanvas();
		init();
		animate();
	}
	_controller.configure = function(properties){
		try {
			for (property in properties){
				_controller.config[property] = properties[property];
			} 
		} catch (err){
			LOGGER.report({'message': 'Failed to setup configuration', 'error':err });
		}
	}
	return _controller ;
}



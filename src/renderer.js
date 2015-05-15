
_this.to3D = function(d3id){

	(function () {
		var configureCanvas = function () {
			_this.view.container = document.getElementById('custom_panel');

			_this.view.scene = new THREE.Scene();
			_this.view.camera = new THREE.PerspectiveCamera( 50, (_this.model.canvas.width || window.innerWidth) / (_this.model.canvas.height || window.innerHeight), 1, 1000 );
			_this.view.camera.position.set(0, -50, 600 );
			_this.view.scene.add(_this.view.camera);
			_this.view.scene.add(_this.view.group);

			_this.view.renderer = new THREE.WebGLRenderer( { antialias: true } );
			_this.view.renderer.setClearColor( 0x00ffff );
			_this.view.renderer.setPixelRatio(window.devicePixelRatio );
			_this.view.renderer.setSize(_this.model.canvas.width || window.innerWidth,_this.model.canvas.height || window.innerHeight);
			_this.view.container.appendChild( _this.view.renderer.domElement );

			// Run renderer
			_this.view.renderer.render( _this.view.scene, _this.view.camera );

		};

		var removeSVG = function () {
			var child = document.getElementById(d3id.replace("#",""));
			child.parentNode.removeChild(child);
		};

		var constructMeshes = function () {
			console.log(_this.model.content);
		};
		
		configureCanvas();
		constructMeshes();
		// removeSVG();

	}());

	renderScene = ({
		render: function () {
			console.log("render screen")




		}
	}).render();


};

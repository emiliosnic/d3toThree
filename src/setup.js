var d3to3 = (function () {

	var _this = {},
		_d3   = {};

	_this.loaded = false; 
	_this.model = { 
		axis: { x: [], y: [] }, 
		content: [],
		canvas: { 
			width: null, 
			height: null 
		}
	}; 
	_this.view = {
		container: null,
		camera: null,
		scene: null,
		renderer: null,
		group: new THREE.Group()
	}; 


	observerFactory = new ObserverFactory();


	// ... 
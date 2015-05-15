var d3to3 = (function () {

	var _this = {},
		_d3   = {};

	_this.loaded = false;

	_this.model = { 
		axis: { 
			x: [], 
			y: [] 
		}, 
		content: [],
		canvas: { 
			width: null, 
			height: null 
		}
	}; 

	_this.initializer = ({
		init: function () {
			if ((typeof d3 !== 'undefined') 
				&& (window.WebGLRenderingContext 
				&& (document.createElement("canvas").getContext("webgl")))) {

				_d3 = Object.create(d3);
				_this.loaded = true; 
			}
		}
	}).init();


	// Setup Utils
	observerFactory = new ObserverFactory();


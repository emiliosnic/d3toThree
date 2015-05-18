
/**
 *   File: 
 *         init.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var d3to3 = (function () {

	var _this = {},
		_d3   = {};

	_this.loaded = false;
	_this.about = {
		name: "d3to3",
		version: "0.0.1"
	};

	/**
	 * Default Config
	 */
	
	_this.config = { 

		// TODO: Determine Dynamically
		'target': 'd3to3_panel',
		'source': undefined,

		'mouseControls': false,
		'3D': false,
		'wireframe': false
	};

	_this.model = { 
		axes: [],
		canvas: { 
			offsetLeft: 0,
			offsetTop: 0,
			width: null, 
			height: null 
		},
		content: []
	}; 

	_this.initializer = ({
		init: function () {

			if (typeof d3 === 'undefined'){ 
				console.error(_this.about.name + " - Failed to load D3.js Library.")
				return;
			}
			if (typeof THREE === 'undefined'){ 
				console.error(_this.about.name + " - Failed to load Three.js Library.")
				return;
			}
			if (!(window.WebGLRenderingContext && (document.createElement("canvas").getContext("webgl")))){
				console.error(_this.about.name + " - Your browser does not support WebGL/Canvas support.")
				return;
			}

			_d3 = Object.create(d3);
			_this.loaded = true; 
		}
	}).init();

	_this.configure = function(properties){

		for (property in properties){
			this.config[property] = properties[property];				
		}
		return this;
	}
	_this.render = function(properties){
		try {
			_this.controller();
		} catch(err ){
			console.error(_this.about.name + " - Failed to render output - "+ err);
		}
	}



	if (_this.loaded) {


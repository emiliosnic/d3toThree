
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
		'mouseControls': false,
		'3D': false
	};

	_this.model = { 
		axis: { 
			x: [], 
			y: [] 
		}, 
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
			if ((typeof d3 !== 'undefined') 
				&& (window.WebGLRenderingContext 
				&& (document.createElement("canvas").getContext("webgl")))) {

				_d3 = Object.create(d3);
				_this.loaded = true; 
			}
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
			_this.render();
		} catch(err ){
			console.error(_this.about.name + " - Failed to render output - "+ err);
		}
	}



	if (_this.loaded) {


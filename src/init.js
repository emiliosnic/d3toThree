
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
	}

	_this.model = { 
		axis: { 
			x: [], 
			y: [] 
		}, 
		canvas: { 
			offsets : { 
				x: 40,
				y: 20
			}, 
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

	if (_this.loaded) {


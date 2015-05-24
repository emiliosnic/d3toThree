
/**
 *   File: 
 *         init.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var d3to3 = (function () {

	/**
	 * Library Configuration
	 */

	var _d3   = {};
	var _this = {
		loaded: false,
		about: {
			name: "d3to3",
			version: "0.0.1"
		}			
	};
	
	/**
	 * Controller Instances
	 */

	 _this.instances = {};
	 _this.currentInstance = undefined;

	/**
	 * Intiializer
	 */

	_this.initializer = ({
		init: function () {

			if (typeof d3 === 'undefined'){ 
				LOGGER.report({'message': 'Failed to load D3.JS Library'});
				return;
			}
			if (typeof THREE === 'undefined'){ 
				LOGGER.report({'message': 'Failed to load Three.JS Library'});
				return;
			}
			if (!(window.WebGLRenderingContext && (document.createElement("canvas").getContext("webgl")))){
				LOGGER.report({'message': 'Your browser does not support WebGL/Canvas support.'});
				return;
			}

			_d3 = Object.create(d3);
			_this.loaded = true; 
		}
	}).init();

	/**
	 * Public API
	 */

	_this.render = function(properties){
		try {
			if (Object.keys(_this.instances).length > 0 ){ 

				if (   properties.hasOwnProperty('source')
					&& _this.instances.hasOwnProperty(properties['source'])) {
					_this.instances[properties['source']].configure(properties)
					_this.instances[properties['source']].setup();
				}
			} else {
				LOGGER.report({'message': 'Failed to render output. No SVG source was set!'});
			}
		} catch(err ){
				LOGGER.report({'message': 'Failed to render output.', 'error': err});
		}
	}

	if (_this.loaded) {

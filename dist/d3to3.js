
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

;
/**
 *   File: 
 *         setup.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

/**
 * Extend D3
 */ 

extend(d3.selection.prototype, { 

	d3to3: function() {

		this.canvas = function(){
			_this.model.canvas.width  = this[0].extractNode('svg').width.baseVal.value;
			_this.model.canvas.height  = this[0].extractNode('svg').height.baseVal.value;

			return this;
		}    

		this.axis = function(){
			this.x = function(){
				_this.model.axis.x = this[0].extractNode('g').childNodes;
				return this;
			}
			this.y = function(){
				_this.model.axis.y = this[0].extractNode('g').childNodes;
				return this;
			}
			return this;
		};

		this.data = function(){
			_this.model.content = this[0];
			return this;
		}    

	    return this;
	}
});


/**
 * Setup D3 Hooks
 */ 

_this.scale            = {};
_this.svg              = {};
_this.layout           = {};
_this.event            = {};
_this.behavior         = {};
_this.geo              = {};
_this.geom             = {};
_this.ns               = d3.ns;
_this.format           = d3.format;
_this.random           = d3.random;
_this.interpolators    = d3.interpolators;
_this.svg.symbolTypes  = d3.svg.symbolTypes;

_this.setup = function(){

	var hook_selectAll = _d3.selection.prototype.selectAll,
		hook_select = _d3.selection.prototype.select,
		hook_data = _d3.selection.prototype.data,
		hook_attr = _d3.selection.prototype.attr;
		hook_classed = _d3.selection.prototype.classed,
		hook_style = _d3.selection.prototype.style,
		hook_property = _d3.selection.prototype.property,
		hook_text = _d3.selection.prototype.text,
		hook_html = _d3.selection.prototype.html,
		hook_append = _d3.selection.prototype.append,
		hook_insert = _d3.selection.prototype.insert,
		hook_remove = _d3.selection.prototype.remove,
		hook_datum = _d3.selection.prototype.datum,
		hook_filter = _d3.selection.prototype.filter,
		hook_order = _d3.selection.prototype.order,
		hook_sort = _d3.selection.prototype.sort,
		hook_each = _d3.selection.prototype.each,
		hook_call = _d3.selection.prototype.call,
		hook_empty = _d3.selection.prototype.empty,
		hook_node = _d3.selection.prototype.node,
		hook_size = _d3.selection.prototype.size,
		hook_enter_append = _d3.selection.enter.prototype.append,
		hook_enter_empty = _d3.selection.enter.prototype.empty,
		hook_enter_node = _d3.selection.enter.prototype.node,
		hook_enter_call = _d3.selection.enter.prototype.call,
		hook_enter_select = _d3.selection.enter.prototype.select,
		hook_enter_insert = _d3.selection.enter.prototype.insert,
		hook_enter_size = _d3.selection.enter.prototype.size;

	_d3.selection.enter.prototype.empty = function()  { return hook_enter_empty.apply(this, arguments);  }
	_d3.selection.enter.prototype.node   = function() { return hook_enter_node.apply(this, arguments);   }
	_d3.selection.enter.prototype.call   = function() { return hook_enter_call.apply(this, arguments);   }
	_d3.selection.enter.prototype.select = function() { return hook_enter_select.apply(this, arguments); }
	_d3.selection.enter.prototype.insert = function() { return hook_enter_insert.apply(this, arguments); }
	_d3.selection.enter.prototype.size   = function() { return hook_enter_size.apply(this, arguments);   }
	_d3.selection.enter.prototype.append = function() {return hook_append.apply(this, arguments);        }
	_d3.selection.prototype.selectAll = function() { return hook_selectAll.apply(this, arguments); }
	_d3.selection.prototype.select = function()    { return hook_select.apply(this, arguments);    }
	_d3.selection.prototype.classed = function()   { return hook_classed.apply(this, arguments);   }
	_d3.selection.prototype.style = function()     { return hook_style.apply(this, arguments);     }
	_d3.selection.prototype.property = function()  { return hook_property.apply(this, arguments);  }
	_d3.selection.prototype.text = function()      { return hook_text.apply(this, arguments);      }
	_d3.selection.prototype.html = function()      { return hook_html.apply(this, arguments);      }
	_d3.selection.prototype.insert = function()    { return hook_insert.apply(this, arguments);    }
	_d3.selection.prototype.remove = function()    { return hook_remove.apply(this, arguments);    }
	_d3.selection.prototype.datum = function()     { return hook_datum.apply(this, arguments);     }
	_d3.selection.prototype.filter = function()    { return hook_filter.apply(this, arguments);    }
	_d3.selection.prototype.order = function()     { return hook_order.apply(this, arguments);     }
	_d3.selection.prototype.sort = function()      { return hook_sort.apply(this, arguments);      }
	_d3.selection.prototype.empty = function()     { return hook_empty.apply(this, arguments);     }
	_d3.selection.prototype.node = function()      { return hook_node.apply(this, arguments);      }
	_d3.selection.prototype.size = function()      { return hook_size.apply(this, arguments);      }
	_d3.selection.prototype.data = function()      { return hook_data.apply(this, arguments);      }
	_d3.selection.prototype.call = function() 	   { return hook_call.apply(this, arguments);      }
	_d3.selection.prototype.each = function() 	   { return hook_each.apply(this, arguments);      }
	_d3.selection.prototype.attr = function()      { return hook_attr.apply(this, arguments);      }
	_d3.selection.prototype.append = function()    { return hook_append.apply(this, arguments);    }

	_this.min                      = function(array, f)  { return _d3.min(array, f);                            }
	_this.max                      = function(array, f)  { return _d3.max(array, f);                            }
	_this.sum                      = function(array, f)  { return _d3.sum(array, f);                            }
	_this.extend                   = function(array, f)  { return _d3.extend(array, f);                         }
	_this.mean                     = function(array, f)  { return _d3.mean(array, f);                           }
	_this.extend                   = function(array, f)  { return _d3.extend(array, f);                         }
	_this.ascending                = function(a, b)      { return _d3.ascending(a, b);                          }
	_this.descending               = function(a, b)      { return _d3.descending(a, b);                         }
	_this.quantile                 = function(values, p) { return _d3.quantile(values, p);                      }
	_this.median                   = function(array, f)  { return _d3.median(array, f);                         }
	_this.variance                 = function(array, f)  { return _d3.variance(array, f);                       }
	_this.deviation                = function(array, f)  { return _d3.deviation(array, f);                      }
	_this.bisectLeft               = function(a, x, lo, hi)   { return _d3.bisectLeft(a, x, lo, hi);            }
	_this.bisectRight              = function(a, x, lo, hi)   { return _d3.bisectRight(a, x, lo, hi);           }
	_this.bisector                 = function(f)              { return _d3.bisector(f);                         }
	_this.shuffle                  =  function(array, i0, i1) { return _d3.shuffle(array, i0, i1);              }
	_this.pairs                    = function(array)          { return _d3.pairs(array);                        }
	_this.permute                  = function(array, indexes) { return _d3.permute(array, indexes);             }
	_this.zip                      = function()               { return _d3.zip();                               }
	_this.transpose                = function(matrix)         { return _d3.transpose(matrix);                   }
	_this.keys                     = function(map)            { return _d3.keys(map);                           }
	_this.values                   = function(map)            { return _d3.values(map);                         }
	_this.entries                  = function(map)            { return _d3.entries(map);                        }
	_this.map                      = function(object, f)      { return _d3.map(object, f);                      }
	_this.nest                     = function()               { return _d3.nest();                              }
	_this.set                      = function(array)          { return _d3.set(array);                          }
	_this.rebind                   = function(target, source) { return _d3.rebind(target, source);              }
	_this.dispatch                 = function()               { return _d3.dispatch();                          }
	_this.requote                  = function(s)              { return _d3.requote(s );                         }
	_this.select                   = function(node)      { return _d3.select(node);                             }
	_this.selection                = function()          { return _d3.selection();                              }
	_this.mouse                    = function(container) { return _d3.mouse(container);                         }
	_this.touch                    = function(container) { return _d3.touch(container);                         }
	_this.color                    = function()          { return _d3.color();                                  }
	_this.hsl                      = function(h, s, l)   { return _d3.color(h, s, l);                           }
	_this.hcl                      = function(h, c, l)   { return _d3.hcl(h, c, l);                             }
	_this.lab                      = function(l, a, b)   { return _d3.lab(l, a, b);                             }
	_this.rgb                      = function(r, g, b)   { return _d3.rgb(r, g, b);                             }
	_this.geo.area                 = function(object)    { return _d3.geo.area(object);                         }
	_this.geo.bounds               = function()          { return _d3.geo.bounds();                             }
	_this.geo.centroid             = function(object)    { return _d3.geo.centroid(object);                     }
	_this.geo.clipExtent           = function()          { return _d3.geo.clipExtent();                         }
	_this.geo.conicEqualArea       = function()          { return _d3.geo.conicEqualArea();                     }
	_this.geo.albers               = function()          { return _d3.geo.albers();                             }
	_this.geo.albersUsa            = function()          { return _d3.geo.albersUsa();                          }
	_this.geo.path                 = function()          { return _d3.geo.path();                               }
	_this.geo.transform            = function(methods)   { return _d3.geo.transform(methods);                   }
	_this.geo.projection           = function(project)   { return _d3.geo.projection(project);                  }
	_this.geo.equirectangular      = function()          { return _d3.geo.equirectangular();                    }
	_this.geo.rotation             = function(rotate)    { return _d3.geo.rotation(rotate);                     }
	_this.geo.circle               = function()          { return _d3.geo.circle();                             }
	_this.geo.distance             = function(a,b)       { return _d3.geo.distance(a,b);                        }
	_this.geo.graticule            = function()          { return _d3.geo.graticule();                          }
	_this.geo.greatArc             = function()          { return _d3.geo.greatArc();                           }
	_this.geo.length               = function(object)    { return _d3.geo.length(object);                       }
	_this.geo.azimuthalEqualArea   = function() { return _d3.geo.azimuthalEqualArea();                          }
	_this.geo.azimuthalEquidistant = function() { return _d3.geo.azimuthalEquidistant();                        }
	_this.geo.conicConformal       = function() { return _d3.geo.conicConformal();                              }
	_this.geo.conicEquidistant     = function() { return _d3.geo.conicEquidistant();                            }
	_this.geo.gnomonic             = function() { return _d3.geo.gnomonic();                                    }
	_this.geo.mercator             = function() { return _d3.geo.mercator();                                    }
	_this.geo.orthographic         = function() { return _d3.geo.orthographic();                                }
	_this.geo.stereographic        = function() { return _d3.geo.stereographic();                               }
	_this.geo.transverseMercator   = function() { return _d3.geo.transverseMercator();                          }
	_this.geo.stream               = function(object, listener) { return _d3.geo.stream(object, listener);      }
	_this.geo.interpolate          = function(source, target)   { return _d3.geo.interpolate(source, target);   }
	_this.geo.projectionMutator    = function(projectAt)   { return _d3.geo.projectionMutator(projectAt);       }
	_this.geom.hull                = function(vertices)    { return _d3.geom.hull(vertices);                    }
	_this.geom.polygon             = function(coordinates) { return _d3.geom.polygon(coordinates);              }
	_this.geom.voronoi             = function(points)      { return _d3.geom.voronoi(points);                   }
	_this.geom.delaunay            = function(vertices)    { return _d3.geom.delaunay(vertices);                }
	_this.geom.quadtree            = function(p, x1, y1, x2, y2) { return _d3.geom.quadtree(p, x1, y1, x2, y2); }
	_this.behavior.drag            = function()  { return _d3.behavior.drag();                                  }
	_this.functor                  = function(v) { return _d3.functor(v);                                       }
	_this.xhr                      = function(response)            { return _d3.xhr(response);                  }
	_this.dsv                      = function(delimiter, mimeType) { return _d3.dsv(delimiter, mimeType);       }
	_this.csv                      = function(delimiter, mimeType) { return _d3.csv(delimiter, mimeType);       }
	_this.tsv                      = function(delimiter, mimeType) { return _d3.tsv(delimiter, mimeType);       }
	_this.touches                  = function(container, touches)  { return _d3.touches(container, touches);    }
	_this.interpolateZoom          = function(p0, p1) { return _d3.interpolateZoom(p0, p1);                     }
	_this.behavior.zoom            = function() { return _d3.behavior.zoom();                                   }
	_this.timer                    = function(callback, delay, then) { return _d3.timer(callback, delay, then); }
	_this.timer.flush              = function()    { return _d3.timer.flush();                                  }
	_this.round                    = function(x,n) { return _d3.round(x,n);                                     }
	_this.formatPrefix             = function(value, precision) { return _d3.formatPrefix(value, precision);    }
	_this.locale                   = function(locale) { return _d3.locale(locale);                              }
	_this.interpolateRgb           = function(a,b)    { return _d3.interpolateRgb(a,b);                         }
	_this.interpolateObject        = function(a,b)    { return _d3.interpolateObject(a,b);                      }
	_this.interpolateRgbNumber     = function(a,b)    { return _d3.interpolateRgbNumber(a,b);                   }
	_this.interpolateString        = function(a,b)    { return _d3.interpolateString(a,b);                      }
	_this.interpolate              = function(a,b)    { return _d3.interpolate(a,b);                            }
	_this.interpolateArray         = function(a,b)    { return _d3.interpolateArray(a,b);                       }
	_this.ease                     = function(name)   { return _d3.ease(name);                                  }
	_this.interpolateHcl           = function(a,b)    { return _d3.interpolateHcl(a,b);                         }
	_this.interpolateHsl           = function(a,b)    { return _d3.interpolateHsl(a,b);                         }
	_this.interpolateLab           = function(a,b)    { return _d3.interpolateLab(a,b);                         }
	_this.interpolateRound         = function(a,b)    { return _d3.interpolateRound(a,b);                       }
	_this.interpolateTransform     = function(a,b)    { return _d3.interpolateTransform(a,b);                   }
	_this.transform                = function(string) { return _d3.transform(string);                           }
	_this.transition               = function(selection, name) { return _d3.transition(selection, name);        }
	_this.scale.category10         = function() { return _d3.scale.category10();                                }
	_this.scale.category20         = function() { return _d3.scale.category20();                                }
	_this.scale.category20b        = function() { return _d3.scale.category20b();                               }
	_this.scale.category20c        = function() { return _d3.scale.category20c();                               }
	_this.scale.sqrt               = function() { return _d3.scale.sqrt();                                      }
	_this.scale.pow                = function() { return _d3.scale.pow();                                       }
	_this.scale.quantile           = function() { return _d3.scale.quantile();                                  }
	_this.scale.threshold          = function() { return _d3.scale.threshold();                                 }
	_this.scale.ordinal            = function() { return _d3.scale.ordinal();                                   }
	_this.scale.log                = function() { return _d3.scale.log();                                       }
	_this.layout.bundle            = function() { return _d3.layout.bundle();                                   }
	_this.layout.chord             = function() { return _d3.layout.chord();                                    }
	_this.layout.force             = function() { return _d3.layout.force();                                    }
	_this.layout.hierarchy         = function() { return _d3.layout.hierarchy();                                }
	_this.layout.partition         = function() { return _d3.layout.partition();                                }
	_this.layout.pie               = function() { return _d3.layout.pie();                                      }
	_this.layout.stack             = function() { return _d3.layout.stack();                                    }
	_this.layout.histogram         = function() { return _d3.layout.histogram();                                }
	_this.layout.pack              = function() { return _d3.layout.pack();                                     }
	_this.layout.tree              = function() { return _d3.layout.tree();                                     }
	_this.layout.treemap           = function() { return _d3.layout.treemap();                                  }
	_this.layout.cluster           = function() { return _d3.layout.cluster();                                  }
	_this.svg.axis                 = function()  { return _d3.svg.axis();                                       }	
	_this.svg.arc                  = function() { return _d3.svg.arc();                                         }
	_this.svg.line                 = function() { return _d3.svg.line();                                        }
	_this.svg.brush                = function() { return _d3.svg.brush();                                       }
	_this.svg.area                 = function() { return _d3.svg.area();                                        }
	_this.svg.area.radial          = function() { return _d3.svg.area.radial();                                 }
	_this.svg.radial               = function() { return _d3.svg.radial();                                      }
	_this.svg.chord                = function() { return _d3.svg.chord();                                       }
	_this.svg.diagonal             = function() { return _d3.svg.diagonal();                                    }
	_this.svg.diagonal.radial      = function() { return _d3.svg.diagonal.radial();                             }
	_this.svg.sumbol               = function() { return _d3.svg.sumbol();                                      }
	_this.text                     = function(request)       { return _d3.text(request);                        }
	_this.xml                      = function(request)       { return _d3.xml(request);                         }
	_this.json                     = function(url, callback) { return _d3.json(url, callback);                  }
	_this.html                     = function(url, callback) { return _d3.html(url, callback);                  }

};;/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga 	/ http://lantiga.github.io
 */

THREE.TrackballControls = function ( object, domElement ) {

	var _this = this;
	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;

	var lastPosition = new THREE.Vector3();

	var _state = STATE.NONE,
	_prevState = STATE.NONE,

	_eye = new THREE.Vector3(),

	_movePrev = new THREE.Vector2(),
	_moveCurr = new THREE.Vector2(),

	_lastAxis = new THREE.Vector3(),
	_lastAngle = 0,

	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0,

	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };


	// methods

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

		}

	};

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function ( pageX, pageY ) {

			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);

			return vector;

		};

	}() );

	var getMouseOnCircle = ( function () {

		var vector = new THREE.Vector2();

		return function ( pageX, pageY ) {

			vector.set(
				( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
				( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
			);

			return vector;
		};

	}() );

	this.rotateCamera = (function() {

		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion(),
			eyeDirection = new THREE.Vector3(),
			objectUpDirection = new THREE.Vector3(),
			objectSidewaysDirection = new THREE.Vector3(),
			moveDirection = new THREE.Vector3(),
			angle;

		return function () {

			moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
			angle = moveDirection.length();

			if ( angle ) {

				_eye.copy( _this.object.position ).sub( _this.target );

				eyeDirection.copy( _eye ).normalize();
				objectUpDirection.copy( _this.object.up ).normalize();
				objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

				objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
				objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

				moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

				axis.crossVectors( moveDirection, _eye ).normalize();

				angle *= _this.rotateSpeed;
				quaternion.setFromAxisAngle( axis, angle );

				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				_lastAxis.copy( axis );
				_lastAngle = angle;

			}

			else if ( !_this.staticMoving && _lastAngle ) {

				_lastAngle *= Math.sqrt( 1.0 - _this.dynamicDampingFactor );
				_eye.copy( _this.object.position ).sub( _this.target );
				quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

			}

			_movePrev.copy( _moveCurr );

		};

	}());


	this.zoomCamera = function () {

		var factor;

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );

		} else {

			factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				_eye.multiplyScalar( factor );

				if ( _this.staticMoving ) {

					_zoomStart.copy( _zoomEnd );

				} else {

					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

				}

			}

		}

	};

	this.panCamera = (function() {

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();

		return function () {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

				pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

				_this.object.position.add( pan );
				_this.target.add( pan );

				if ( _this.staticMoving ) {

					_panStart.copy( _panEnd );

				} else {

					_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );

				}

			}
		};

	}());

	this.checkDistances = function () {

		if ( !_this.noZoom || !_this.noPan ) {

			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );

			}

			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );

			}

		}

	};

	this.update = function () {

		_eye.subVectors( _this.object.position, _this.target );

		if ( !_this.noRotate ) {

			_this.rotateCamera();

		}

		if ( !_this.noZoom ) {

			_this.zoomCamera();

		}

		if ( !_this.noPan ) {

			_this.panCamera();

		}

		_this.object.position.addVectors( _this.target, _eye );

		_this.checkDistances();

		_this.object.lookAt( _this.target );

		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

			_this.dispatchEvent( changeEvent );

			lastPosition.copy( _this.object.position );

		}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_prevState = STATE.NONE;

		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );

		_eye.subVectors( _this.object.position, _this.target );

		_this.object.lookAt( _this.target );

		_this.dispatchEvent( changeEvent );

		lastPosition.copy( _this.object.position );

	};

	// listeners

	function keydown( event ) {

		if ( _this.enabled === false ) return;

		window.removeEventListener( 'keydown', keydown );

		_prevState = _state;

		if ( _state !== STATE.NONE ) {

			return;

		} else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {

			_state = STATE.ROTATE;

		} else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {

			_state = STATE.ZOOM;

		} else if ( event.keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {

			_state = STATE.PAN;

		}

	}

	function keyup( event ) {

		if ( _this.enabled === false ) return;

		_state = _prevState;

		window.addEventListener( 'keydown', keydown, false );

	}

	function mousedown( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
			_movePrev.copy(_moveCurr);

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy(_zoomStart);

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy(_panStart);

		}

		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );

		_this.dispatchEvent( startEvent );

	}

	function mousemove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_movePrev.copy(_moveCurr);
			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		}

	}

	function mouseup( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );
		_this.dispatchEvent( endEvent );

	}

	function mousewheel( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta / 40;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail / 3;

		}

		_zoomStart.y += delta * 0.01;
		_this.dispatchEvent( startEvent );
		_this.dispatchEvent( endEvent );

	}

	function touchstart( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy(_moveCurr);
				break;

			case 2:
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;

			default:
				_state = STATE.NONE;

		}
		_this.dispatchEvent( startEvent );


	}

	function touchmove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy(_moveCurr);
				_moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;

			default:
				_state = STATE.NONE;

		}

	}

	function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy(_moveCurr);
				_moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				_panStart.copy( _panEnd );
				break;

		}

		_state = STATE.NONE;
		_this.dispatchEvent( endEvent );

	}

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousedown', mousedown, false );

	this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );

	this.handleResize();

	// force an update at start
	this.update();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;
;
/**
 *   File: 
 *         scene/materials.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var MATERIALS = (function () {
	return {
		Basic: function (color) {
			return (new THREE.MeshBasicMaterial({ 'color': COLORS.HEX(color)}));
		},
		LineBasic: function (color) {
			return (new THREE.LineBasicMaterial({ 'color': COLORS.HEX(color)}));
		}
	};
})();

;
/**
 *   File: 
 *         scene/geometries.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var GEOMETRIES = (function () {
	return {
		Circle: function (camera, properties) {

			// TODO: COMPLETE
		},
		Line: function (properties) {

			var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(properties.x1, properties.y1, properties.z1));
				geometry.vertices.push(new THREE.Vector3(properties.x2, properties.y2, properties.z2));

			return new THREE.Line(geometry, MATERIALS.LineBasic(properties.color));
		}
	};
})();
;
/**
 *   File: 
 *         scene/cameras.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */
 
var CAMERAS = (function () {
	return {
		Perspective: function (properties) {

			var fov = 100, 
				near = 1, 
				far = 1000, 
				x = 0, 
				y = 0, 
				z = 0,  
				aspect = (window.innerWidth / window.innerHeight);

			if (properties) {
				fov    = properties.fov  || fov;
				near   = properties.near || near;
				far    = properties.far  || far;
				x      = properties.position.x || x;
				y      = properties.position.y || y;
				z      = properties.position.z || z;
				aspect = (properties.width / properties.height) || aspect;
			}

			var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				camera.position.set(x, y, z);

			return camera;
		}
	};
})();

;
/**
 *   File: 
 *         scene/controls.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var CONTROLS = (function () {
	return {
		Trackball: function (camera, properties) {

			var x = 0, 
				y = 0, 
				z = 0;

			if (properties) {
				x      = properties.x || x;
				y      = properties.y || y;
				z      = properties.z || z;
			}

			var controls = new THREE.TrackballControls(camera);
				controls.target.set(x,y,z);

			return controls;
		}
	};
})();
;
/**
 *   File: 
 *         views/_base.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

function VIEW(){};

VIEW.prototype.type = function(type){
	var constr = type;

	if (typeof VIEW[constr] !== "function"){
		console.error(_this.about.name + " - Failed to construct VIEW - Caller:"+ arguments.callee.caller.name)
	}
	if (typeof VIEW[constr].prototype.type !== "function") { 
		VIEW[constr].prototype = new VIEW();
	}
	return new VIEW[constr]();
}


VIEW.prototype.setProperties = function(properties) {
	this.properties = properties;
	return this;
};

VIEW.prototype.loadData = function(data) {
	this.load(data);
	return this;
};

VIEW.prototype.toGroup = function(group) {

	this.meshes.forEach(function(item){
		if (group && group instanceof THREE.Group)
			group.add(item);
	})

	VIEW.meshes = [];

	return this;
};
;
/**
 *   File: 
 *         views/axis.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.axis = function() {  

	this.type = 'axis';    
	this.meshes = [];

	this.load = function(data){

		for (index = 0; index < data.length; index++){

			/**
			 * Extract Axis Points
			 */ 

			if (data[index].nodeName === "g") {

				/**
				 * Extract Ticks
				 */ 

				var tickPosition = UNITS.extractTranslation(data[index].attributes.extractNode('transform').nodeValue),
					tickLine = { 
						x: parseInt(data[index].childNodes.extractNode('line').attributes.extractNode('x2').nodeValue),
						y: parseInt(data[index].childNodes.extractNode('line').attributes.extractNode('y2').nodeValue)
					};

				var startX = UNITS.normalizeH(tickPosition.x) + _this.model.canvas.offsets.x,
					startY = UNITS.normalizeV(tickPosition.y) - _this.model.canvas.offsets.y,
					endX = startX + tickLine.x,
					endY = startY - tickLine.y;

				this.meshes.push(
					GEOMETRIES.Line({
						x1: startX, y1: startY, z1:0,
						x2: endX  , y2: endY  , z2:0,
						color: 'default'
					})
				);
				
				/**
				 * Extract Text
				 */ 
				
				/**
				 <TODO>
					offsetHeight: 12
					offsetLeft: -2
					offsetParent: body
					offsetTop: -6
					offsetWidth: 12

					console.log("TEXT");
					console.log(data[index].childNodes);
					console.log(data[index].childNodes.extractNode('text').__data__);
					console.log(data[index].childNodes.extractNode('text').attributes.extractNode('x').nodeValue);
					console.log(data[index].childNodes.extractNode('text').attributes.extractNode('y').nodeValue);
				*/

			} else if (data[index].nodeName === "path") {

				/**
				 * Extract Axis Paths
				 */ 

				var points = UNITS.extractSVGPath(data[index].attributes.extractNode('d').nodeValue);

				for (var j = 1; j < points.length; j++) {

					var startY = UNITS.normalizeV(parseInt(points[j-1].y)) - _this.model.canvas.offsets.y;
						startX = UNITS.normalizeH(parseInt(points[j-1].x)) + _this.model.canvas.offsets.x;
						endX   = UNITS.normalizeH(parseInt(points[j].x))   + _this.model.canvas.offsets.x;
						endY   = UNITS.normalizeV(parseInt(points[j].y))   - _this.model.canvas.offsets.y;

					this.meshes.push(
						GEOMETRIES.Line({
							x1: startX, y1: startY, z1:0,
							x2: endX,   y2:endY   , z2:0,
							color: 'default'
						})
					);
				}
			}
		}
	}
};
/**
 *   File: 
 *         views/circle.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

VIEW.circle = function() {  
	
	this.type = 'circle';
	this.meshes = []; 

	this.load = function(data){

		var that = this;
	
		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value,
				color   = COLORS.HEX(item.style.cssText.slice(6));

			var x = UNITS.normalizeH(offsetX) + _this.model.canvas.offsets.x;
				y = UNITS.normalizeV(offsetY) - _this.model.canvas.offsets.y;

			var circle = new THREE.Mesh( new THREE.CircleGeometry(radius, 64),  MATERIALS.Basic(color));
				circle.position.set(x, y, 0 );

			that.meshes.push(circle);
		});
	}
}
;
/**
 *   File: 
 *         scene/lights.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


var LIGHTS = (function () {
	return {
		Ambient: function (properties) {

			var color = 0xffffff;

			if (properties) {
				color = COLORS.HEX(properties.color) || color;
			}

			return new THREE.AmbientLight(color);
		},
		Directional: function (properties) {
		
			var color = 0xffffff, x=1,  y=1, z=1; 

			if (properties) {
				color = COLORS.HEX(properties.color) || color;
				x     = properties.x || x;
				y     = properties.y || y;
				z     = properties.z || z;

			}

			var light = new THREE.DirectionalLight(color);
				light.position.set(x, y, z).normalize();

  			return light;
		}
	};
})();

;

/**
 *   File: 
 *         scene/parser.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

;
/**
 *   File: 
 *         renderer.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

_this.render = function(d3id){

	var camera, renderer, scene, group, container, view, controls;

	(function () {
		var createCanvas = function () {	

			view  = new VIEW();
			scene = new THREE.Scene(),
			container = document.getElementById(d3id);

			camera = CAMERAS.Perspective({ 
				width    : _this.model.canvas.width,
				height   : _this.model.canvas.height,
				fov      : 115,
				position : { x: 0, y:0, z:100 } 
			});

			controls = CONTROLS.Trackball(camera);

			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = new THREE.WebGLRenderer({ antialias: true }),
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(
				_this.model.canvas.width  || window.innerWidth,
				_this.model.canvas.height || window.innerHeight
			);
		};

		var removeSVG = function () {
			/**
			 * TODO: Implement
			 */ 
		};
		
		createCanvas();
		init();
		animate();
		removeSVG();

	}());

	function init() {

		/**
		 * Setup Data View
		 */ 
		view
			.type('circle')
			.loadData(_this.model.content)
			.toGroup(group);

		/**
		 * Setup X Axis View
		 */ 
		view
			.type('axis')
			.setProperties({'orientation': 'horizontal'})
			.loadData(_this.model.axis.x)
			.toGroup(group);

		/**
		 * Setup Y Axis View
		 */ 
		view
			.type('axis')
			.setProperties({'orientation': 'vertical'})
			.loadData(_this.model.axis.y)
			.toGroup(group);

		/**
		 * Flush Model and Run Render
		 */ 

		_this.model.content = {};

		scene.add(camera);
		scene.add(group);

		container.appendChild( renderer.domElement );
	}

 	function animate() {
		requestAnimationFrame(animate);
	    controls.update();    
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}
};
;
/**
 *   File: 
 *         utils/colors.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var COLORS = (function () {
	return {
		HEX: function (input) {

			var componentToHex = function(c) {
				var hex = c.toString(16);
				return hex.length == 1 ? "0" + hex : hex;
			}

			// Default
			
			if (input == undefined || typeof input !== "string" || input == 'default')
		    	return "#000000";

			// Normalize HEX

			if (input.charAt(0) === '#') {
				return ((input.length > 6 )? input.substring(0,7):input);
			
			} else {
				
				// Convert from RGB

				var rgb = /\(([^)]+)\)/.exec(input)[1].split(',');
				var r,g,b;
				r = parseInt(rgb[0]);
				g = parseInt(rgb[1]);
				b = parseInt(rgb[2]);
				
				// Else if this is rgb call rgba
				return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
			}
		}
	};
})();
;
/**
 *   File: 
 *         utils/helpers.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

/**
 * Extract Node Protype
 */ 

Object.prototype.extractNode = function(key) {
	
	var obj = this;

	if (key in this){
		obj = this[key];
	} else {
		for (var item in this) {
			if (this.hasOwnProperty(item) && this[item].nodeName === key){
				obj = this[item];
				break;
			}
		}
	}
	return obj;
};

/**
 * Extension Helper
 */ 

function extend (base, extension) {
  if (arguments.length > 2) 
  	[].forEach.call(arguments, function (extension) { 
 	 	extend(base, extension) 
 	})
  else 
  	for (var k in extension) 
  		base[k] = extension[k]
  return base;
}

;
/**
 *   File: 
 *         utils/units.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */

var UNITS = (function () {
	return {
		extractTranslation: function (input) {
			
			if (typeof input !== "string")
				return { x: -1, y: -1};

			var translation = /\(([^)]+)\)/.exec(input)[1].split(','),
				offsetX = parseInt(translation[0]) || 0,
				offsetY = parseInt(translation[1]) || 0;

			return {
				x: offsetX,
				y: offsetY
			};
		},
		extractSVGPath: function(input) {

			var points = [],
				parsedInput = input.split(/(?=[MVHV])/);

			// Extract points 

			parsedInput.forEach(function(item, i){

				var index = item.charAt(0), 
					values = item.substring(1).split(',');

				if (index === "V"){
					points.push({x: "V", y: values[0]})

				} else if (index === "H"){
					points.push({x: values[0], y: "H"})

				} else {
					points.push({x: values[0], y: values[1]})
				}
			});

			// Normalize all points to numbers 

			for (var j = 1; j < points.length; j++) {
				if (points[j].x == "V") {
					points[j].x = points[j-1].x;
				} 
				if (points[j].y == "H") {
					points[j].y = points[j-1].y;
				}
			}
			return points;
		},
		normalizeV: function(value) {
			return (value <= _this.model.canvas.height) ? (_this.model.canvas.height/2 - value): -(_this.model.canvas.height/2 - value); 
		},
		normalizeH: function(value) {
			return (value <= _this.model.canvas.width) ? -(_this.model.canvas.width/2 - value): (_this.model.canvas.width/2 - value); 
		}
	};
})();
;
/**
 *   File: 
 *         teardown.js
 * 	
 * 	 Description:
 * 	       <TODO> 
 */


		/**
		 * Expose to global d3
		 */ 
		window.d3 = _d3;

	}

	return _this;

})();

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

;
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

	_d3.selection.enter.prototype.empty = function() { return hook_enter_empty.apply(this, arguments);  }
	_d3.selection.enter.prototype.node   = function() { return hook_enter_node.apply(this, arguments);   }
	_d3.selection.enter.prototype.call   = function() { return hook_enter_call.apply(this, arguments);   }
	_d3.selection.enter.prototype.select = function() { return hook_enter_select.apply(this, arguments); }
	_d3.selection.enter.prototype.insert = function() { return hook_enter_insert.apply(this, arguments); }
	_d3.selection.enter.prototype.size   = function() { return hook_enter_size.apply(this, arguments);   }
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
	_d3.selection.prototype.call = function()      { return hook_call.apply(this, arguments);      }
	_d3.selection.prototype.empty = function()     { return hook_empty.apply(this, arguments);     }
	_d3.selection.prototype.node = function()      { return hook_node.apply(this, arguments);      }
	_d3.selection.prototype.size = function()      { return hook_size.apply(this, arguments);      }
	_d3.selection.prototype.data = function()      { return hook_data.apply(this, arguments);      }

	_d3.selection.enter.prototype.append = function() {
		var newNodes = hook_append.apply(this, arguments);
	
		// Notify Observers that look for enter event
		if (arguments[0] == "circle"){
			observerFactory.observe(
				observerFactory.type("each").expectKeyType(typeof[]).then(function(value){
					[].forEach.call(value, function (item) { 
						_this.model.content.push(item);
					})

				})
			);
		}
	  return hook_append.apply(this, arguments); 
	}

	_d3.selection.prototype.each = function() { 
		

		var nodes = hook_each.apply(this, arguments); 
		observerFactory.notify({'type':'each', 'keyType':typeof [], 'value':nodes[0]});

		// console.log("================ EACH ================ ");
		// console.log(nodes);

		return hook_each.apply(this, arguments);      
	}

	_d3.selection.prototype.attr = function() { 

		 console.log("================ ATTR ================ ");
		 // console.log(arguments);

	  	// Notify attr observers
		observerFactory.notify({'type':'attr', 'key':arguments[0], 'value':arguments[1]});
		return hook_attr.apply(this, arguments); 
	}

	_d3.selection.prototype.append = function(){

		console.log("================ APPEND ================ ");
		// console.log(arguments);
		
		observerFactory.notify({'type':'append', 'key':arguments[0], 'value':arguments[1]});
		
		// Determine SVG width and height 
		if (arguments[0] === 'svg'){
			observerFactory.observe(
				observerFactory.type('attr').expectKey('width').then(function(value){
					_this.model.canvas.width = value;
				}),
				observerFactory.type('attr').expectKey('height').then(function(value){
					_this.model.canvas.height = value;
				}),
				observerFactory.type('append').expectKey('g').then(function(value){}),

				observerFactory.type('attr').expectKey('transform').then(function(value){
					_this.model.canvas.transform = value;
				})
			);
		} 
		return hook_append.apply(this, arguments);
	}

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
	_this.svg.axis                 = function() { return _d3.svg.axis();                                        }
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

};;
function GeometryFactory(){};

GeometryFactory.prototype.type = function(type){
	var constr = type;

	if (typeof GeometryFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	if (typeof GeometryFactory[constr].prototype.drive !== "function") { 
		GeometryFactory[constr].prototype = new GeometryFactory();
	}
	return new GeometryFactory[constr]();
}

GeometryFactory.circle = function() {  
	this.type = 'circle'; 
	this.meshes = [];
}
GeometryFactory.line   = function() {  
	this.type = 'line';    
	this.meshes = [];
}

GeometryFactory.prototype.loadData = function(data) {

	var that = this,
		offset = translateOffsets(_this.model.canvas.transform);

	var loadDataCircle = function(){

		data.forEach(function (item) {
			var radius  = item.r.baseVal.value,
				offsetX = item.cx.baseVal.value,
				offsetY = item.cy.baseVal.value;
				color   = RGBToHex(item.style.cssText.slice(6));

			var x,
				y;

			// Normalize width and height
			x = (offsetX <= _this.model.canvas.width)  ?  - (_this.model.canvas.width/2 - offsetX): (_this.model.canvas.width/2 - offsetX); 
			y = (offsetY <= _this.model.canvas.height) ?   (_this.model.canvas.height/2 - offsetY): - (_this.model.canvas.height/2 - offsetY);
			
			// Apply offsets	
			x += offset.x;
			y -= offset.y;

			var material = new THREE.MeshBasicMaterial({ 'color': color}),
				circleGeometry = new THREE.CircleGeometry(radius, 64),
				circle = new THREE.Mesh( circleGeometry,  new THREE.MeshBasicMaterial({ 'color': color}));

			circle.position.set(x, y, 0 );

			// Keep to meshes
			that.meshes.push(circle);

		});

	}

	if (this.type == "circle"){
		loadDataCircle();
	}

	return this;
};

GeometryFactory.prototype.toGroup = function(group) {

	this.meshes.forEach(function(item){
		if (group && group instanceof THREE.Group)
			group.add(item);
	})

	GeometryFactory.meshes = [];

	return this;
};
;
_this.render = function(d3id){
	
	// View configuration

	var camera, renderer, scene, group, container, geometryFactory;


	(function () {
		var configureCanvas = function () {	

			// Setup Canvas
			geometryFactory = new GeometryFactory();

			scene = new THREE.Scene(),
			container = document.getElementById(d3id);

			camera = new THREE.PerspectiveCamera( 115, (_this.model.canvas.width || window.innerWidth) / (_this.model.canvas.height || window.innerHeight), 1, 1000);
			camera.position.set(0, 0, 100);

			group = new THREE.Group(),
			group.position.set(0, 0, 0);

			renderer = new THREE.WebGLRenderer({ antialias: true }),
			renderer.setClearColor( 0xffffff );
			renderer.setPixelRatio(window.devicePixelRatio );
				
			renderer.setSize(
				_this.model.canvas.width  || window.innerWidth,
				_this.model.canvas.height || window.innerHeight
			);

		};

		var removeSVG = function () {
			/*
				var child = document.getElementById(d3id.replace("#",""));
				child.parentNode.removeChild(child);
			*/
		};

		var constructMeshes = function () {
			// console.log(_this.model.content);
		};
		
		configureCanvas();
		constructMeshes();
		// removeSVG();

	}());

	function init() {

		// Setup circle geometry
		geometryFactory
			.type('circle')
			.loadData(_this.model.content)
			.toGroup(group);

		// Remove this model
		_this.model.content = {};

		// Run renderer
		scene.add(camera);
		scene.add(group);
		renderer.render(scene, camera);
		container.appendChild( renderer.domElement );
	}

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}

	init();
	animate();

};
;var RGBToHex =function(input){

	var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	var r,g,b;

	if(typeof tests === "object" && tests.length == 3){
		r = input[0];
		g = input[1];
		b = input[2];
	} else {
		var rgb = /\(([^)]+)\)/.exec(input)[1].split(',');
		r = parseInt(rgb[0]);
		g = parseInt(rgb[1]);
		b = parseInt(rgb[2]);
	}
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
;
var translateOffsets =function(input){
	var translation = /\(([^)]+)\)/.exec(input)[1].split(','),
		offsetX = parseInt(translation[0]) || 0,
		offsetY = parseInt(translation[1]) || 0;
    return {
    	x: offsetX,
    	y: offsetY
    };
}
;
function ObserverFactory(){}

ObserverFactory.queue = [];

ObserverFactory.prototype.observe = function() {
	[].forEach.call(arguments, function (obj) { 
		if (obj)
			ObserverFactory.queue.push(obj);
	});
	return this;
};

ObserverFactory.prototype.then = function(callback) {
	this.callback = callback || {};
	return this;
};

ObserverFactory.prototype.expectKeyType = function(keyType) {
	this.expectedType = keyType;
	return this;
};

ObserverFactory.prototype.expectKey = function(key) {
	this.expectedKey = key;
	return this;
};

ObserverFactory.prototype.type = function(type){
	var constr = type;

	if (typeof ObserverFactory[constr] !== "function"){
		// TOODO: Handle error  
	}
	if (typeof ObserverFactory[constr].prototype.drive !== "function") { 
		ObserverFactory[constr].prototype = new ObserverFactory();
	}
	return new ObserverFactory[constr]();
}

ObserverFactory.attr   = function() { this.type = 'attr';   }
ObserverFactory.each   = function() { this.type = 'each';   }
ObserverFactory.append = function() { this.type = 'append'; }

ObserverFactory.prototype.notify = function(args) {

	var key = args.key || {},
		keyType = args.keyType || {},
		value = args.value || {},
		type = args.type || {};

	if (!ObserverFactory.hasOwnProperty(type))
		return;

	ObserverFactory.queue.some(function(observer, i) {

	    if (observer.type == type && 
			(observer.expectedKey == key) || (observer.expectedType == keyType)){
	    
			if (typeof observer.callback === "function" && value != null){
				observer.callback(value); 
			}
			ObserverFactory.queue.splice(i, 1);
			return true; 
		}
	});
} 
;
	// Expose to global d3
	if (_this.loaded) {
		_this.setup(); 
		window.d3 = _d3;
	}

	return _this;

})();

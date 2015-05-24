
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
		this.axis = function(){
			_this.instances[_this.currentInstance].model.axes.push({
				'data'      : this[0].extractNode('g').childNodes,
				'transform' : this[0].extractNode('g').attributes.extractNode('transform').nodeValue
			})
			return this;
		},

		this.data = function(){
			_this.instances[_this.currentInstance].model.content.push({
				'data' : this[0],
				'type' : this[0][0].nodeName
			})
			return this;
		}
		this.text = function(){

			var sprite = this[0].extractNode('text');
			
			_this.instances[_this.currentInstance].model.texts.push({
				'x'   : (sprite.attributes.extractNode('x').nodeValue) || 0,
				'y'   : (sprite.attributes.extractNode('y').nodeValue) || 0,
				'val' : sprite.textContent,
				'transform' : sprite.attributes.extractNode('transform').nodeValue,
				'length' : sprite.textLength.baseVal.value
			})
			return this;
		}    
	    return this;
	}
});


/**
 * Setup D3 Hooks
 */ 


_this.setupHooks = ({
	setup: function () {

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
		_d3.selection.prototype.selectAll    = function() { return hook_selectAll.apply(this, arguments);    }
		_d3.selection.prototype.select       = function() { return hook_select.apply(this, arguments);       }
		_d3.selection.prototype.classed      = function() { return hook_classed.apply(this, arguments);      }
		_d3.selection.prototype.style        = function() { return hook_style.apply(this, arguments);        }
		_d3.selection.prototype.property     = function() { return hook_property.apply(this, arguments);     }
		_d3.selection.prototype.text         = function() { return hook_text.apply(this, arguments);         }
		_d3.selection.prototype.html         = function() { return hook_html.apply(this, arguments);         }
		_d3.selection.prototype.insert       = function() { return hook_insert.apply(this, arguments);       }
		_d3.selection.prototype.remove       = function() { return hook_remove.apply(this, arguments);       }
		_d3.selection.prototype.datum        = function() { return hook_datum.apply(this, arguments);        }
		_d3.selection.prototype.filter       = function() { return hook_filter.apply(this, arguments);       }
		_d3.selection.prototype.order        = function() { return hook_order.apply(this, arguments);        }
		_d3.selection.prototype.sort         = function() { return hook_sort.apply(this, arguments);         }
		_d3.selection.prototype.empty        = function() { return hook_empty.apply(this, arguments);        }
		_d3.selection.prototype.node         = function() { return hook_node.apply(this, arguments);         }
		_d3.selection.prototype.size         = function() { return hook_size.apply(this, arguments);         }
		_d3.selection.prototype.data         = function() { return hook_data.apply(this, arguments);         }
		_d3.selection.prototype.call         = function() { return hook_call.apply(this, arguments);         }
		_d3.selection.prototype.each         = function() {  return hook_each.apply(this, arguments);        }

		_d3.selection.prototype.attr = function()      { 
			/**
			 * Notify attr observers
			 */ 
			observerFactory.notify({'type':'attr', 'key':arguments[0], 'value':arguments[1]});
		
			return hook_attr.apply(this, arguments); 
		}
		_d3.selection.prototype.append = function(){ 

			observerFactory.notify({'type':'append', 'key':arguments[0], 'value':arguments[1]});
			
			/**
			 * Determine SVG width, height and offsets 
			 */ 

			if (arguments[0] === 'svg'){

				var svgID = this[0][0].id;
				
				/**
				 * Setup a new library instance for every SVG element
				 */ 
				_this.instances[svgID] = new Controller();
				_this.currentInstance = svgID;

				/**
				 * Setup observer factories to determine width and height
				 */ 
				observerFactory.observe(
					observerFactory.type('attr').expectKey('width').then(function(value){
						_this.instances[svgID].canvas.width = value;
					}),
					observerFactory.type('attr').expectKey('height').then(function(value){
						_this.instances[svgID].canvas.height = value;
					}),
					observerFactory.type('append').expectKey('g').then(function(value){}),
					observerFactory.type('attr').expectKey('transform').then(function(value){
						var offsets = UNITS.extractTranslation(value);
							_this.instances[svgID].canvas.offsetLeft = offsets.x;
							_this.instances[svgID].canvas.offsetTop  = offsets.y;
					})
				);
			} 
			return hook_append.apply(this, arguments);
		}
	}
}).setup();

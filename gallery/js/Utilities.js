UInterface.namespace('Utilities.Cache');
UInterface.namespace('Utilities.DOM');
UInterface.namespace('Utilities.Storage');

/**
 * @namespace UInterface.Utilities.Cache
 * @class Cache
 */
UInterface.Utilities.Cache = {
		
		/**
		 * @property cacheElements
		 * @type {Object} a literal object with cache key and value
		 */
		cacheElements : {},
		
		/**
		 * @method isInCache
		 * @param {string} a cache key
		 * @return {boolean}
		 */
		isInCache : function(pkey) {
			
			"use strict";
			return (this.cacheElements.hasOwnProperty(pkey));
			
		},
		
		/**
		 * @method addToCache
		 * @param {string} a cache key
		 * @param {Object} an object to push on cache
		 * @return {Object} a cache object
		 */
		addToCache : function(pkey, pElement) {
			
			"use strict";
			if (!this.isInCache(pkey)) {
				this.cacheElements[pkey] = pElement;
			}
			return this.cacheElements[pkey];
			
		}

};

/**
 * @namespace UInterface.Utilities.DOM
 * @class DOM
 */
UInterface.Utilities.DOM = {
	
	/**
	 * @method DOMType
	 * @param {Object} window.document object
	 * @return {Object} a literal object with all funtions for create DOM elements
	 */
	DOMType : (function(doc){
		
		"use strict";
		return {
			textNode : function(ptarget) {
				
				var txt = doc.createTextNode(this.text);
				if (ptarget && ptarget.appendChild) {
					ptarget.appendChild(txt);
				}
				
			},
			link : function(ptarget) {
				
				var link = doc.createElement('a');
				link.href = this.url;
				if (this.target) {
					link.target = this.target;
				}
				link.appendChild(doc.createTextNode(this.url));
				if (ptarget && ptarget.appendChild) {
					ptarget.appendChild(link);
				}
				
			},
			image : function(ptarget) {
				
				var im = doc.createElement('img');
				im.src = this.url;
				if (this.alt) {
					im.alt = this.alt;
				}
				if (ptarget && ptarget.appendChild) {
					ptarget.appendChild(im);
				}
				
			},
			script : function(ptarget) {
				
				var sc = doc.createElement('script');
				sc.src = this.url;
				if (this.id) {
					sc.id = this.id;
				}
				if (ptarget && ptarget.appendChild) {
					ptarget.parentNode.insertBefore(sc, ptarget);
				}
				
			}
		};
			
	})(window.document),

	/**
	 * @method DOMElement
	 * @return {Object} a new DOMElement instance
	 */
	DOMElement : (function() {
		
		"use strict";

		/**
		 * @constructor
		 * @param {Object} a literal object with entity base config parameters
		 * @param {string} the element type
		 */
		var Const = function DOMElement (pconfig, ptype) {
			
			if (!(this instanceof Const)) {
				return new Const(pconfig, ptype);
			}
			if (typeof pconfig === 'object') {
				for (var prop in pconfig) {
					if (Object.hasOwnProperty.call(pconfig, prop)) {
						this[prop] = pconfig[prop];
					}
				}
			}
			if (typeof ptype === 'string') {
				this.type = ptype;
			}

		};
		
		/**
		 * @method insert
		 * @param {Object} the Dom Element to use like target 
		 * @param {string} the cache key
		 */
		Const.prototype.insert = function (ptarget, pkey) {
			
				var utilities = UInterface.Utilities;
				utilities.Cache.addToCache(pkey, this);
				utilities.DOM.DOMType[this.type].call(this, ptarget);
				
		};

		return Const;
		
	}())
	
};

/**
 * @namespace UInterface.Utilities.Storage
 * @class Storage
 */
UInterface.Utilities.Storage = {
	
	/**
	 * @method parseAll
	 * @param {string} a JSON string
	 * @return {Object} the parsed object
	 */
	parseAll: function(pjson) {
		
		"use strict";
		// TODO parse all
		
	},
	
	/**
	 * @method parseObject
	 * @param {string} a JSON string
	 * @param {string} the constructor name
	 * @return {Object} the parsed object
	 */
	parseObject: function(pjson, pconstr) {
		
		"use strict";
		var data;
		try {
			data = JSON.parse(pjson);
			if (typeof data === 'undefined' && typeof JSON.parse() !== 'function') {
				throw {
					name: "parseError", 
					message: 'There was an error on JSON parse',
					json: pjson,
					constr: pconstr,
					remedy: this.loadJsJSON
				};
			} else if (typeof data === 'undefined') {
				throw {
					name: "parseError", 
					message: 'Data error, try again later'
				};
			}
		} catch (e) {
			if (e.remedy) {
				e.remedy();
			} else {
				alert(e.message);
			}
		}
		return new pconstr(data);
		
	},
	
	/**
	 * @method stringify
	 * @param {Object} an instance
	 * @return {string} the same instance stringify
	 */
	stringify: function (pdata) {
		
		"use strict";
		var data;
		try {
			data = JSON.stringify(pdata);
			if(typeof data === 'undefined' && typeof JSON.parse() !== 'function') {  
				throw {
					name: "stringifyError", 
					message: 'There was an error on JSON stringify',
					data: pdata,
					remedy: this.loadJsJSON
				};
			} else if (typeof data === 'undefined') {
				throw {
					name: "stringifyError", 
					message: 'Data error, try again later'
				};
			}
		} catch (e) {
			if (e.remedy) {
				e.remedy();
			} else {
				alert(e.message);
			}
		}
		return data;
	},
	
	/**
	 * @method storageAll
	 * @param {string} the key for storage
	 * @param {Object} an instance
	 * @return {string} the same instance stringify
	 */
	storageAll: function(pkey, pdata) {
		
		"use strict";
		var data = this.stringify(pdata);
		if (data !== 'undefined' && localStorage) {
			localStorage.setItem(pkey, data);
		} else {
			alert ('No cover to send data and your broser does not support local storage. Please, use Chrome or Firefox');
		}
		return data;
		
	},
	
	/**
	 * @method getStorage
	 * @param {string} the storage key
	 * @return {string} the storage item
	 */
	getStorage: function(pkey) {
		
		"use strict";
		if (localStorage) {
			return localStorage.getItem(pkey);
		} else {
			alert ('No cover to load data and your broser does not support local storage. Please, use Chrome or Firefox');
		}
		
	},

	/**
	 * @method loadJsJSON
	 * @param {Object} error object
	 * @return {string || Object} the data stringify or parser
	 */
	loadJsJSON: function (e) {
		
		"use strict";
		var myScript = UInterface.Utilities.DOM.DOMElement({url: 'js/json2.js', id: 'json'},'script');
		myScript.insert(window.document.getElementsByTagName('script')[0], 'json');
		if (e.name === 'stringifyError') {
			return this.stringify(e.data);
		} else if (e.name === 'parseError') {
			return this.parseObject(e.json, e.constr);
		} else {
			alert (e.message);
		}

	}
};

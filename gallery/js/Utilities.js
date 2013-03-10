UInterface.namespace('Utilities.DOMFactory');
UInterface.namespace('Utilities.Storage');

/*
 * -------------------------------------------------- 
 * DOMFACTORY
 * --------------------------------------------------
 */
UInterface.Utilities.DOMFactory = {

	DOM : function(type) {
		
		"use strict";
		
		this.textNode = {
			insert : function(ptarget) {
				var txt = document.createTextNode(this.text);
				ptarget.appendChild(txt);
			}
		};

		this.link = {
			insert : function(ptarget) {
				var link = document.createElement('a');
				link.href = this.url;
				link.target = this.target;
				link.appendChild(document.createTextNode(this.url));
				ptarget.appendChild(link);
			}
		};

		this.image = {
			insert : function(ptarget) {
				var im = document.createElement('img');
				im.src = this.url;
				im.alt = this.alt;
				ptarget.appendChild(im);
			}
		};

		this.script = {
			insert : function(ptarget) {
				var sc = document.createElement('script');
				sc.src = this.url;
				ptarget.parentNode.insertBefore(sc, ptarget);
			}
		};

		return this[type];

	},
	factory : function(type) {
		
		"use strict";
		var DOM = UInterface.Utilities.DOMFactory.DOM;
		
		return new DOM(type);
		
	}

};

/*
 * -------------------------------------------------- 
 * STORAGE
 * --------------------------------------------------
 */
UInterface.Utilities.Storage = {
		
	// PARSE
	parseAll : function(pjson) {
		
		"use strict";
		// TODO
		
	},
	parseObject : function(pobj, pconstr) {
		
		"use strict";
		var data = JSON.parse(pobj);
		
		return new pconstr(data);
		
	},
	// STRINGIFY
	// TODO CODE STRINGIFY
	// STORAGE
	storageAll : function(pkey, pdata) {
		
		"use strict";
		var data;
		try {
			data = JSON.stringify(pdata);
			localStorage.setItem(pkey, data);
			// TODO THROW EXCEPTION
		} catch (e) {
			console.log(e);
			data = null;
		}
		
		return data;
		
	},
	getStorage : function(pkey) {
		
		"use strict";
		
		return localStorage.getItem(pkey);
		
	}
};

UInterface.namespace('GALLERY.entities');
UInterface.namespace('GALLERY.entities.Project');
UInterface.namespace('GALLERY.entities.Picture');

/*
 * -------------------------------------------------- 
 * PROJECT
 * --------------------------------------------------
 */
UInterface.GALLERY.entities = (function() {
	
	"use strict";
	
	var Const = function() {
	};

	Const.prototype.toJSON = function() {
		
		var copy = arguments[0] || {}, exclude = arguments[1] || {};
		for ( var prop in this) {
			if (!exclude[prop]) {
				copy[prop] = this[prop];
			}
		}
		
		return copy;
		
	};
	
	Const.prototype.addId = (function() {
		
		var idTemp = {};
		return function() {
			var type = arguments[0], result;
			if (typeof idTemp[type] === 'undefined') {
				result = idTemp[type] = 0;
			} else {
				result = idTemp[type] += 1;
			}
			
			return result;
		};

	}());

	return Const;

}());

UInterface.GALLERY.entities.Project = (function() {
	
	"use strict";
	
	// CONSTRUCTOR
	var Const = function Project(obj) {

		if (!(this instanceof Const)) {
			return new Const(obj);
		}

		// PRIVATE PROPERTIES DECLARATION
		var _id;
		
		if (obj.id) {
			_id = obj._id;
		} else {
			_id = this.uber.addId.call(this, 'project');
		}
		this.title = obj.title;
		if (obj.description) {
			this.description = obj.description;
		}
		if (obj.date) {
			this.date = new Date(obj.date);
		}
		this.thumb = obj.thumb;
		this.genericImg = obj.genericImg;
		if (obj.pictures) {
			this.pictures = obj.pictures;
		} else {
			this.pictures = [];
		}

		// PUBLIC METHODS
		this.getId = function() {
			
			return _id;
			
		};

	};

	// PROTOTYPE METHODS
	Const.prototype = {
		constructor : Const,
		version : "1.0",
		uber : UInterface.GALLERY.entities.prototype
	};

	Const.prototype.addPicture = function(ppicture) {
		
		return this.pictures.push(ppicture);
		
	};

	Const.prototype.removePicture = function(pid) {
		
		var i = 0, max = this.pictures.length;
		for (; i < max; i += 1) {

			if (this.pictures[i].getId() === pid) {
				try {
					this.pictures.splice(i);
					return true;
				} catch (e) {
					// console.log(e);
					return false;
				}
			}
		}
		
		return false;
		
	};

	Const.prototype.getPicture = function(pid) {
		
		var i = 0, max = this.pictures.length;
		for (; i < max; i += 1) {
			if (this.pictures[i].getId() === pid) {
				return this.pictures[i];
			}
		}
		
		return null;
		
	};

	Const.prototype.toJSON = function() {
		
		return this.uber.toJSON.call(this, {
			_id : this.getId()
		}, {
			uber : 1,
			version : 1
		});
		
	};

	return Const;

}());

/*
 * -------------------------------------------------- 
 * PICTURE
 * --------------------------------------------------
 */
UInterface.GALLERY.entities.Picture = (function() {
	
	"use strict";
	
	// PRIVATE METHODS DECLARATION
	var addSize;

	// CONSTRUCTOR
	var Const = function Picture(obj) {

		if (!(this instanceof Const)) {
			return new Const(obj);
		}

		if (!obj) {
			return this;
		}

		// PRIVATE PROPERTIES DECLARATION
		var _id, _size;

		this.type = obj.type;
		if (obj._id) {
			_id = obj._id;
		} else {
			_id = this.uber.addId.call(this, 'picture');
		}
		this.url = obj.url;
		if (obj.description) {
			this.description = obj.description;
		}
		_size = addSize(this.type);

		// PUBLIC METHODS
		this.getId = function() {
			
			return _id;
			
		};
		this.getSize = function() {
			
			return _size;
			
		};

	};

	// PRIVATE METHODS
	addSize = function(type) {

		var result;

		switch (type) {
			case 'thumb':
						result = {
							width : '45px',
							height : '45px'
						};
						break;
			default:
						result = {
							width : 'auto',
							height : 'auto'
						};
		}
		
		return result;

	};

	// PROTOTYPE METHODS
	Const.prototype = {
		constructor : Const,
		version : "1.0",
		uber : UInterface.GALLERY.entities.prototype
	};

	Const.prototype.toJSON = function() {
		
		return this.uber.toJSON.call(this, {
			_id : this.getId()
		}, {
			uber : 1,
			version : 1
		});
		
	};

	return Const;

}());

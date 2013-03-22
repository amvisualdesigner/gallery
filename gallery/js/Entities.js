UInterface.namespace('GALLERY.entities');
UInterface.namespace('GALLERY.entities.Project');
UInterface.namespace('GALLERY.entities.Picture');

/**
 * @namespace GALLERY.entities
 * @class Entities
 */
UInterface.GALLERY.entities = (function() {
	
	"use strict";
	
	/**
	 * @constructor
	 */
	var Const = function() {};

	/*
	 * PROTOTYPE METHODS
	 */
	/**
	 * @method toJSON
	 * @return {Object}  a clone of this instance create with allowed properties and without excluding properties
	 */
	Const.prototype.toJSON = function() {
		
		var copy = arguments[0] || {}, exclude = arguments[1] || {};
		for ( var prop in this) {
			if (!exclude[prop]) {
				copy[prop] = this[prop];
			}
		}
		return copy;
		
	};
	/**
	 * @method addId
	 * @return {number} the instance id number
	 */
	Const.prototype.addId = (function() {
		
		var idTemp = {};
		return function() {
			var type = arguments[0], result;
			if (typeof idTemp[type] === 'undefined') {
				result = idTemp[type] = 0;
			} else {
				result = idTemp[type] += 1;
			}
			result = type + '_'  + result;
			return result;
		};

	}());

	return Const;

}());

/**
 * @namespace GALLERY.entities.Project
 * @class Project
 * @version 1.0
 */
UInterface.GALLERY.entities.Project = (function() {
	
	"use strict";
	
	/**
	 * @constructor
	 * @param {Object} a literal object with entity base properties
	 * @return {Object} a new Project instance
	 */
	var Const = function Project(pobj) {

		if (!(this instanceof Const)) {
			return new Const(pobj);
		}

		/**
		 * @property id_
		 * @private
		 * @type {number} the Project id
		 * @optional
		 */
		var id_;
		if (pobj.id) {
			id_ = pobj.id_;
		} else {
			id_ = this.uber.addId.call(this, 'project');
		}
		
		/**
		 * @property title
		 * @type {string} the Project title
		 */
		this.title = pobj.title;
		
		/**
		 * @property description
		 * @type {string} the Project description
		 * @optional
		 */
		if (pobj.description) {
			this.description = pobj.description;
		}
		
		/**
		 * @property date
		 * @type {Date} the Project date
		 * @optional
		 */
		if (pobj.date) {
			this.date = new Date(pobj.date);
		}
		
		/**
		 * @property thumb
		 * @type {Object} a Picture instance
		 */
		this.thumb = pobj.thumb;
		
		/**
		 * @property genericImg
		 * @type {Object}  a Picture instance
		 */
		this.genericImg = pobj.genericImg;
		
		/**
		 * @property pictures
		 * @type {array} an array of pictures
		 * @optional
		 */
		if (pobj.pictures) {
			this.pictures = pobj.pictures;
		} else {
			this.pictures = [];
		}

		/**
		 * @method getId
		 * @return {number} the instance id
		 */
		this.getId = function() {
			
			return id_;
			
		};

	};

	/*
	 * PROTOTYPE METHODS
	 */
	Const.prototype = {
		constructor : Const,
		version : "1.0",
		uber : UInterface.GALLERY.entities.prototype
	};

	/**
	 * @method addPicture
	 * @param {Object} a Picture instance
	 * @return {Object} the same Picture instance
	 */
	Const.prototype.addPicture = function(ppicture) {
		
		return this.pictures.push(ppicture);
		
	};

	/**
	 * @method removePicture
	 * @param {number} the id Picture number
	 * @return {boolean}
	 */
	Const.prototype.removePicture = function(pid) {
		
		var i = 0, max = this.pictures.length;
		for (; i < max; i += 1) {

			if (this.pictures[i].getId() === pid) {
				try {
					this.pictures.splice(i);
					return true;
				} catch (e) {
					return false;
				}
			}
		}	
		return false;
		
	};

	/**
	 * @method getPicture
	 * @param {number} the id Picture number
	 * @return {Object} a Picture instance
	 */
	Const.prototype.getPicture = function(pid) {
		
		var i = 0, max = this.pictures.length;
		for (; i < max; i += 1) {
			if (this.pictures[i].getId() === pid) {
				return this.pictures[i];
			}
		}
		return null;
		
	};

	/**
	 * @method toJSON
	 * @return {Object} a clon from uber method
	 */
	Const.prototype.toJSON = function() {
		
		return this.uber.toJSON.call(this, {
			id_ : this.getId()
		}, {
			uber : 1,
			version : 1
		});
		
	};

	return Const;

}());

/**
 * @namespace GALLERY.entities.Picture
 * @class Picture
 * @version 1.0
 */
UInterface.GALLERY.entities.Picture = (function() {
	
	"use strict";

	/**
	 * @constructor
	 * @param {Object}  a literal object with entity base properties
	 * @return {Object} a new Picture instance
	 */
	var Const = function Picture(pobj) {


		if (!(this instanceof Const)) {
			return new Const(pobj);
		}

		if (!pobj) {
			return this;
		}

		/**
		 * @property id_
		 * @private
		 * @type {number} the Picture id
		 * @optional
		 */
		var id_;
		if (pobj.id_) {
			id_ = pobj.id_;
		} else {
			id_ = this.uber.addId.call(this, 'picture');
		}
		
		/**
		 * @property type
		 * @type {string} the Picture type
		 */
		this.type = pobj.type;
		
		/**
		 * @property url
		 * @type {string} the Picture url
		 */
		this.url = pobj.url;
		
		/**
		 * @property description
		 * @type {string} the Picture description
		 * @optional
		 */
		if (pobj.description) {
			this.description = pobj.description;
		}
		
		/**
		 * @property size_
		 * @private
		 * @type {Object} a literal size object
		 */
		var size_ = addSize(this.type);


		/**
		 * @method getId
		 * @return {number} the instance id
		 */
		this.getId = function() {
			
			return id_;
			
		};
		

		/**
		 * @method getSize
		 * @return {Object} a literal size object
		 */
		this.getSize = function() {
			
			return size_;
			
		};

	};

	/**
	 * @method addSize
	 * @private
	 * @return {Object} a literal size object
	 */
	var addSize = function(ptype) {

		var result;
		switch (ptype) {
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

	/*
	 * PROTOTYPE METHODS
	 */
	Const.prototype = {
		constructor : Const,
		version : "1.0",
		uber : UInterface.GALLERY.entities.prototype
	};

	/**
	 * @method toJSON
	 * @return {Object} a clon from uber method
	 */
	Const.prototype.toJSON = function() {
		
		return this.uber.toJSON.call(this, {
			id_ : this.getId()
		}, {
			uber : 1,
			version : 1
		});
		
	};
	
	/**
	 * @method toString
	 * @return {string} override toString() method
	 */
	Const.prototype.toString = function() {
		
		return 'My picture => Id: ' + this.getId() + ' Type: ' + this.type + ' Size: ' + this.getSize().width + ' X ' +  this.getSize().height +  ' Src: ' + this.url;
	
	};
	
	return Const;

}());

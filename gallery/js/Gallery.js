UInterface.namespace('GALLERY');

UInterface.GALLERY = (function() {
	
	"use strict";
	
	// CONSTRUCTOR
	var Const = function GALLERY(obj) {

		if (!(this instanceof Const)) {
			return new Const(obj);
		}

		this.stage = obj.stage;
		this.sizes = obj.sizes;
		if (obj.projects) {
			this.projects = obj.projects;
		} else {
			this.projects = [];
		}

	};

	// PROTOTYPE METHODS
	Const.prototype = {
		constructor : Const,
		version : "1.0",
	};

	Const.prototype.addProject = function(pProject) {
		
		return this.projects.push(pProject);
		
	};

	Const.prototype.removeProject = function(pid) {
		
		var i = 0, max = this.projects.length;
		for (; i < max; i += 1) {

			if (this.projects[i].getId() === pid) {
				try {
					this.projects.splice(i);
					return true;
				} catch (e) {
					// console.log(e);
					return false;
				}
			}
		}
		
		return false;
		
	};

	Const.prototype.getProject = function(pid) {
		
		var i = 0, max = this.projects.length;
		for (; i < max; i += 1) {
			if (this.projects[i].getId() === pid) {
				return this.projects[i];
			}
		}
		
		return null;
		
	};

	return Const;

})();
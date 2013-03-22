UInterface.namespace('GALLERY');

/**
 * @namespace UInterface.GALLERY
 * @class GALLERY
 * @version 1.0
 */
UInterface.GALLERY = (function() {
	
	"use strict";
	
	/**
	 * @constructor
	 * @param {Object} a literal object with entity base properties
	 * @return {Object} a new instance of GALLERY
	 */
	var Const = function GALLERY(pobj) {

		if (!(this instanceof Const)) {
			return new Const(pobj);
		}
		
		/**
		 * @property stage
		 * @type {string}
		 */
		this.stage = pobj.stage;
		
		/**
		 * @property sizes
		 * @type {array} an array of sizes
		 */
		this.sizes = pobj.sizes;
		
		/**
		 * @property projects
		 * @type {array} an array of projects
		 * @optional
		 */
		if (pobj.projects) {
			this.projects = pobj.projects;
		} else {
			this.projects = [];
		}

	};

	/*
	 * PROTOTYPE METHODS
	 */
	Const.prototype = {
		constructor : Const,
		version : "1.0"
	};

	/**
	 * @method addProject
	 * @param {Object} a Project instance
	 * @return {Object} the same Project instance
	 */
	Const.prototype.addProject = function(pProject) {
		
		return this.projects.push(pProject);
		
	};
	
	/**
	 * @method removeProject
	 * @param {number} the id number project
	 * @return {boolean} 
	 */
	Const.prototype.removeProject = function(pid) {
		
		var i = 0, max = this.projects.length;
		for (; i < max; i += 1) {

			if (this.projects[i].getId() === pid) {
				try {
					this.projects.splice(i);
					return true;
				} catch (e) {
					return false;
				}
			}
		}
		return false;
		
	};
	
	/**
	 * @method getProject
	 * @param {number} the id number project
	 * @return {Object} a Project instance
	 */
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
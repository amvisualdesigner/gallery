/**
 * 
 * @namespace UInterface  
 * @name UInterface
 * @author amvisualdesigner > email: am@amvisualdesigner.eu
 * 
 */

var UInterface = UInterface || {};

(function(doc) {
	
	"use strict";
	
	/**
	 * @method namespace
	 * @param {string} a namespace string, for example > UInterface.GALLERY
	 * @return {Object} a namespace object
	 */
	UInterface.namespace = function(pNsStr) {

		var parts = pNsStr.split('.'), parent = UInterface, i;

		if (parts[0] === "UInterface") {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i += 1) {

			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}

		return parent;

	};
	
	/**
	 * @method initialize
	 */
	UInterface.initialize = function() {

		var GALLERY = UInterface.GALLERY, 
			Utilities = UInterface.Utilities, 
			DOMElement = Utilities.DOM.DOMElement, 
			Storage = Utilities.Storage, 
			Picture = GALLERY.entities.Picture, 
			Project = GALLERY.entities.Project;

		// TEST!
		var stage = doc.getElementById('stage');
		var myGallery = new GALLERY({
			stage : 'stage',
			sizes : [ {
				width : 320,
				heigth : 160
			}, {
				width : 550,
				heigth : 275
			}, {
				width : 1000,
				heigth : 500
			} ]
		});
		var myThumb = new Picture({
			type : 'thumb',
			url : 'iconP1.jpg'
		});
		var myGenericImg = new Picture({
			type : 'generic',
			url : 'genericP1.jpg'
		});
		var myProject = new Project({
			title : 'P1',
			description : 'description of P1',
			date : '2013/10/01',
			thumb : myThumb,
			genericImg : myGenericImg
		});
		myGallery.addProject(myProject);
		var myProject2 = new Project({
			title : 'P2',
			description : 'description of P2',
			date : '2014/08/15',
			thumb : myThumb,
			genericImg : myGenericImg
		});
		myGallery.addProject(myProject2);

		var myLink = new DOMElement({
			url: 'http://www.amvisualdesigner.eu',
			target: '_blank'
			}, 'link');
		myLink.insert(stage, 'amLink');
		Storage.storageAll('DOM Cache', UInterface.Utilities.Cache.cacheElements);
		Storage.storageAll('Gallery', myGallery);
		var temp = Storage.getStorage('Gallery');
		
		var pictureTemp = Storage.storageAll('Picture', myThumb);
		var myObject = Storage.parseObject(pictureTemp, Picture);		
		console.log(myObject.toString());

		var errorTemp = Storage.loadJsJSON(
						{name: "stringifyError", 
						message: 'There was an error on JSON stringify',
						data: myThumb}
						);
		console.log(errorTemp);
		

	};

	/**
	 * @event onreadystatechange (document ready event handler)
	 */
	doc.onreadystatechange = function () {
		  if (doc.readyState === "complete") {
			  UInterface.initialize();
		  }
	};

})(window.document);

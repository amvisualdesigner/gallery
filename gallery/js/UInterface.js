var UInterface = UInterface || {};

(function() {
	
	"use strict";
	
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

	var initialize = function() {

		var GALLERY = UInterface.GALLERY, 
			Utilities = UInterface.Utilities, 
			DOMFactory = Utilities.DOMFactory.factory, 
			Storage = Utilities.Storage, 
			Picture = GALLERY.entities.Picture, 
			Project = GALLERY.entities.Project;

		// TEST
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
		console.log(myGallery);

		var myLink = DOMFactory('link');
		myLink.url = 'http://www.amvisualdesigner.eu';
		myLink.insert(document.getElementById('stage'));

		Storage.storageAll('Gallery', myGallery);
		var temp = Storage.getStorage('Gallery');
		console.log(temp);

		var myObject = Storage.parseObject(Storage.storageAll('Picture', myThumb), Picture);
		console.log(myObject);
		console.log(myObject.getId());
		console.log(myObject.type);

	};

	window.onload = initialize;

})();

routes = {
	'sites': {
		init: function() {
			mySites = new sitesCollection();
			mySites.fetch( { success: function() {
				contentManager.show( new sitesView() );
			}});
		},
		resource: 'sites'
	},
	'site': {
		init: function(id) {
			mySite = new siteModel({ '_id': id });
			mySite.fetch( { success: function() {
				contentManager.show( new editSiteView( { model: mySite } ) );
			}});
		},
		resource: 'sites'
	},
	'pages': {
		init: function() {
			myPages = new pagesCollection();
			myPages.fetch( { success: function() {
				contentManager.show( new pagesView() );
			}});
		},
		resource: 'pages'
	},
	'page': {
		init: function(id) {
			myPage = new pageModel({ '_id': id });
			myPage.fetch( { success: function() {
				contentManager.show( new editPageView( { model: myPage } ) );
			}});
		},
		resource: 'pages'
	},
	'forms': {
		init: function() {
			myForms = new formsCollection();
			myForms.fetch( { success: function() {
				contentManager.show( new formsView() );
			}});
		},
		resource: 'forms'
	},
	'form': {
		init: function(id) {
			myForm = new formModel({ '_id' : id });
			myForm.fetch( { success: function() {
				contentManager.show( new editFormView( { model: myForm } ) );
			}, error: function(e){

				alert('fail');
			}});
		},
		resource: 'forms'
	},
	'images': {
		init: function() {
			myImages = new imageCollection();
			myImages.fetch( { success: function() {
				contentManager.show( new imagesView() );
			}});
		},
		resource: 'images'
	},
	'image': {
		init: function(id) {
			myImage = new imageModel({ 'id' : id });
			myImage.fetch( { success: function() {
				contentManager.show( new editImageView( { model: myImage } ) );
			}});
		},
		resource: 'images'
	},
	'navigation': {
		init: function() {
			myNavigation = new navigationCollection();
			myNavigation.fetch( { success: function() {
				contentManager.show( new navigationView() );
			}});
		},
		resource: 'navigation'
	},
	'categories': {
		init: function() {
			myRestaurantCategories.fetch( { success: function() {
				contentManager.show( new restaurantCategoriesView() );
			}});
		},
		resource: 'restaurant'
	},
	'menu_items': {
		init: function() {
			myRestaurantMenuItems.fetch( { success: function() {
				contentManager.show( new restaurantMenuItemsView() );
				myRestaurantCategories.fetch();
			}});
		},
		resource: 'restaurant'
	},
	'galleries': {
		init: function() {
			myGalleries = new galleryCollection();
			myGalleries.fetch( { success: function() {
				contentManager.show( new galleriesView({collection: myGalleries}) );
			}});
		},
		resource: 'galleries'
	},
	'gallery': {
		init: function(id) {
			myGalleryItems = new galleryItemCollection();
			myGallery = new galleryModel({ '_id' : id });
			myGalleryItems.fetch({data: {gallery_id: id}, success: function() {
				myGallery.fetch({success: function() {
					contentManager.show( new galleryView({model: myGallery}));
				}});
			}});
		},
		resource: 'galleries'
	},


	'New': {
		init: function() {
			myforms = new formsCollection();
			myforms.fetch( { success: function() {
				temp = new formModel();//{form: {}, data: [], views: [], title:''});
				myforms.add(temp);
				contentManager.show( new editFormView( { model: temp } ) );
				sidebarManager.show();
			}});
		},
		resource: 'apps'
	},
	'edit': {
		init: function(id) {
			myApp = new appModel({ 'id' : id });
			myApp.fetch( { success: function() {
				contentManager.show( new appMainView( { model: myApp } ) );
				sidebarManager.show( new appSideView( { model: myApp } ) );
			}});
		},
		resource: 'apps'
	},
	'template': {
		init: function(id) {
			myTemplate = new templateModel({ 'id' : id });
			myTemplate.fetch( { success: function() {
				contentManager.show( new editTemplateView( { model: myTemplate } ) );
				sidebarManager.show( new appSideView( { model: myApp } ) );
			}});
		},
		resource: 'apps'
	},
	'My Profile': {
		init: function() {
			myProfile = new agentModel({ id : 0 });
			myProfile.fetch( { success: function() {
				contentManager.show( new profileView( { model: myProfile } ) );
				sidebarManager.show();
			}});
		},
		resource: 'agents'
	},
};
galleriesView = Backbone.ListView.extend({
	legend: 'Gallery Options',
	template: 'galleries_view' ,
	events: {
		'click .fa-plus': 'add'
	},
	modelView: Backbone.ItemView.extend({
		legend: 'Edit Gallery',
		template: 'gallery_view',
		target: '#gallery-list',
		events: {
			'click .btn-danger': 'destroy',
			'click .btn-success': 'edit',
			'click': 'manage'
		},
		manage: function(e) {
			e.stopPropagation();
			myrouter.navigate('#/gallery/'+this.model.id, {trigger: true});
		}
	}),
});





galleryView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'addImage',
		//'click #dropt': 'addImage'
	},
	addImage: function() {
		// var options = {};
		// $('#myModal').remove();
		// options.body = '<form action="/images" method="post" class="dropzone clickable" id="image_filename"><input type="hidden" name="_method" value="post" /><div class="default message"><span>Drop files here to upload</span></div></form>';
		// options.icon = 'plus-circle';
		// options.title = 'Add Photo';
		// this.ref = $(ich.modal(options));

		// $(this.ref).appendTo('body');

		// this.ref.modal();
		// $('#agent_photo').append(options.body);
		// myDropzone = new Dropzone('#image_filename', {method: 'post', paramName: 'image_filename', success: function(message,response) {
		// 	var temp = new imageModel(response);
		// 	$('#myModal').modal('hide');
		// 	myImages.add(temp);
		// 	new imageView({'model': temp});
		// }});

		//$().berry({fields:[{type: 'upload', label: false, path: '/gallery_items?gallery_id='+this.model.id, name: 'image_filename'}]})

		this.form({legend: 'Add Image(s)', fields:[{type: 'upload', label: false, path: '/gallery_items?gallery_id='+this.model.id, name: 'image_filename'}]}).on('change', $.proxy(function(){
			this.collection.add(new this.collection.model(this.berry.fields.image_filename.value));
			this.berry.ref.modal('hide');
		}, this)).on('destroyed', $.proxy(function(){
			contentManager.show( new this.constructor({ collection: this.collection, model: myGallery }));
		}, this));
	},
	template: 'gallery_content' ,
	onShow: function() {
		_.each(myGalleryItems.models, function(model) {
			new galleryItemView({'model': model});
		});
		// myNewDropzone = new Dropzone('#image_filename', {parallelUploads: 10, method: 'post', paramName: 'image_filename', success: function(message,response) {
		// 	var temp = new galleryItemModel(response);
		// 	this.removeAllFiles();
		// 	myGalleryItems.add(temp);
		// 	new galleryItemView({'model': temp});
		// }});
	},
	initialize: function() {
		this.setElement(render(this.template, this.model.attributes));
	},
});

galleryItemView = Backbone.View.extend({
	events: {
		'click .fa-pencil': 'editImage',
		'click .fa-times': 'destroy',
		'click': 'preview',
	},
	preview: function() {
		new modal({legend: this.model.attributes.name, content: '<div style="text-align:center"><img style="max-width:100%" src="/uploads/galleries/' + this.model.id + '.' + this.model.attributes.ext + '"/></div>'});
	},
	editImage: function(e) {
		e.stopPropagation();
		this.form({legend: '<i class="fa fa-photo"></i> Edit Image', fields: ['Name']});
	},
	template: 'gallery_item_view',
	target: '#gallery-list',
	initialize: function() {
		// this.autoElement({append: false});
		// $(this.target).before(this.$el);
		this.autoElement();
	}
});






galleryModel = Backbone.Model.extend({
	schema:{
		Name: {required: true}
	},
	urlRoot: '/galleries',
	initialize: function(){
		this.bind('change', function(){ this.save(); });
	}
});

galleryCollection = Backbone.Collection.extend({
	model: galleryModel,
	url: '/galleries',
});

galleryItemModel = Backbone.Model.extend({
	schema:{
		Name: {required: true}
	},
	urlRoot: '/gallery_items'
});
galleryItemCollection = Backbone.Collection.extend({
	model: galleryItemModel,
	url: '/gallery_items',
});

imagesView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'addImage',
		//'click #dropt': 'addImage'
	},
	addImage: function() {
		var options = {};
		$('#myModal').remove();
		options.body = '<form action="/images" method="post" class="dropzone clickable" id="image_filename"><input type="hidden" name="_method" value="post" /><div class="default message"><span>Drop files here to upload</span></div></form>';
		options.icon = 'plus-circle';
		options.title = 'Add Photo';
		this.ref = $(ich.modal(options));

		$(this.ref).appendTo('body');

		this.ref.modal();
		$('#agent_photo').append(options.body);
		myDropzone = new Dropzone('#image_filename', {method: 'post', paramName: 'image_filename', success: function(message,response) {
			var temp = new imageModel(response);
			$('#myModal').modal('hide');
			myImages.add(temp);
			new imageView({'model': temp});
		}});

	},
	template: 'images_view' ,
	onShow: function() {
		_.each(myImages.models, function(model) {
			var temp = new imageView({'model': model});
		});
		myNewDropzone = new Dropzone('#image_filename', {parallelUploads: 10, method: 'post', paramName: 'image_filename', success: function(message,response) {
			var temp = new imageModel(response);
			this.removeAllFiles();
			myImages.add(temp);
			new imageView({'model': temp});
		}});
	},
	render: function() {
		this.setElement(ich[this.template](myImages));

	},
});

imageView = Backbone.View.extend({
	events: {
		'click .fa-pencil': 'editImage',
		'click .fa-times': 'destroy',
		'click': 'preview',
	},
	preview: function() {
		new modal({legend: this.model.attributes.name, content:'<div style="text-align:center"><img src="/imgs/'+this.model.attributes.name+'"/></div>'});
	},
	editImage: function(e) {
		e.stopPropagation();
		this.form({legend: '<i class="fa fa-photo"></i> Edit Image', fields: ['Name']});
	},
	template: 'image_view',
	target: '#image-list #dropt',
	initialize: function() {
//		debugger;
		this.autoElement({append: false});
		$(this.target).before(this.$el);
	}
});


imageModel = Backbone.Model.extend({
	schema:{
		Name: {},
		Tags: {type: 'tags'}
	},
	idAttribute: '_id',
	urlRoot: '/images'
});
imageCollection = Backbone.Collection.extend({
	model: imageModel,
	url: '/images',
});
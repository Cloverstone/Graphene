formsView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add'
	},
	add: function() {
		$().berry({legend: 'Form Options', model: new formModel(), fields: ['Title']}).on('completed', function(){
			if(this.closeAction === 'save'){
				myForms.add(this.options.model);
				contentManager.show( new editFormView( { model: this.options.model } ) );
				myrouter.navigate('#/form/'+this.options.model.id, {trigger: false});
			}
		} );
	},
	template: 'forms_view' ,
	onShow: function() {
		_.each(myForms.models,function(model) {
			var temp = new formView({'model':model});
		});
	},
	render: function() {
		this.setElement(render(this.template, myForms ));
	},
});
formView = Backbone.View.extend({
	events: {
		'click .btn-danger': 'destroy',
		'click .btn-success': 'view',
		'click .btn-default': 'edit',
		'click': 'records'
	},
	edit: function(e) {
		e.stopPropagation();
		myrouter.navigate('#/form/'+this.model.id, {trigger: true});
	},
	view: function(e) {
		e.stopPropagation();
		window.location.href = '/form/'+this.model.attributes.slug;
	},
	records: function(e) {
		e.stopPropagation();
		myrouter.navigate('#/records/'+this.model.id, {trigger: true});
	},
	template: 'form_view',
	target: '#page-list',
	initialize: function() {
		this.autoElement();
	}
});
editFormView = Backbone.View.extend({
	events:{
		'click #save-page': 'save',
		'click #title': 'modify'
	},
	modify: function() {
		$().berry({legend: 'Form Options', model: this.model, fields: ['Title']}).on('saved',$.proxy(function(){
			this.$el.find('#title').html(this.model.attributes.title);
		},this) );
	},
	template: 'forms_edit' ,
	onShow: function() {
		cb = new cobler({target: '#itemcontainer', axis: 'y', types: ['form']});
		cb.load(this.model.attributes.json);
	},
	render: function() {
		this.setElement(render(this.template, this.model.attributes));
	},
	save:function() {
//		debugger;
		message({title: 'Success!', text: 'Successfully updated the form', timeout: 3000, color: "#5F895F", icon: "fa fa-user" });
	//		this.model.set({content: JSON.stringify(cb.toJSON())});
		cb.deselect();
		cobler.changed = false;
		this.model.save({json: cb.toJSON(), content: cb.toHTML()}, {patch:true});
	},
	remove: function() {
    Backbone.View.prototype.remove.call(this);
  }
});

formModel = Backbone.Model.extend({
	schema: {
		Title: {},
		Color: {},
		Icon: {},
		Tags: {type: 'tags'}
	},
	idAttribute: '_id',
	urlRoot: '/forms'
});
formsCollection = Backbone.Collection.extend({
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: formModel,
		url: '/forms',
});




// recordView = Backbone.View.extend({
// 	events: {
// 		'click': 'edit'
// 	},
// 	template: 'main_template',
// 	target: '#record-list',
// 	initialize: function() {
// 		this.autoElement();
// 	}
// });

recordsView = Backbone.View.extend({
	events:{
		'click': 'view',
		'click #title': 'modify'
	},
	template: 'records_view' ,	
	onShow: function() {
		var head_template = '';
		var main_template = '';
		_.each(this.model.attributes.json, function(element){
			head_template += '<th>'+element.label+'</th>';
			main_template += '<td>{{attributes.'+element.name+'}}&nbsp;</td>';
		});
		$('#record-list').append( Hogan.compile('<thead><tr>' + head_template + '<th>Submitted</th></tr></thead>{{#models}}<tr>' + main_template + '<td><time class="timeago" datetime="{{attributes.updated_at}}Z">{{attributes.updated_at}}</time></td></tr>{{/models}}').render(this.collection));
		$("#record-list time.timeago").timeago();
	},
	render: function() {
		this.setElement(render(this.template, this.model.attributes ));
	},
});

recordModel = Backbone.Model.extend({
	schema: {
		Title: {}
	},
	idAttribute: '_id',
	urlRoot: '/records'
});
recordsCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
    this._id = options._id;
  },
  url: function() {
    return '/records/?form_id=' + this._id;
  },
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
	model: recordModel,
	// url: '/records',
});






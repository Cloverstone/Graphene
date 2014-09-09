// editFormView = Backbone.View.extend({
// 	events:{
// 		'click #save-form' : 'save',
// 		'click #title' : 'modify'
// 	},
// 	modify: function(){
// 		$().berry({legend: 'Form Options', model: this.model, fields: ['title', 'color', 'icon', 'tags']}).on('saved',$.proxy(function(){
// 			this.$el.find('#title').html(this.model.attributes.title);
// 		},this) );
// 	},
// 	template: "forms_edit" ,
// 	onShow:function() {
// 		cb = new cobler({target: '#itemcontainer',axis: 'y'});
// 		cb.load(this.model.attributes.form);
// 	},
// 	render: function(){
// 		this.setElement(ich[this.template](this.model.attributes));
// 	},
// 	initialize: function(){
// 		//this.setElement(ich[this.template]( this.model.attributes ));
// 	},
// 	save:function(){
// 		//alert('hello');
// 		message({title: 'Success!', text: 'Successfully updated the form', timeout: 3000, color: "#5F895F", icon: "fa fa-user" });
// 		this.model.set({form: cb.toJSON()});
// 		this.model.save();
// 	},
// 	remove: function() {
//     Backbone.View.prototype.remove.call(this);
//   }
// });

// useFormView = Backbone.View.extend({
// 	template: "forms_edit" ,
// 	onShow:function() {
// 		this.form = $("#itemcontainer").berry({actions:false,fields:this.model.attributes.form});
// 		$("#alt-sidebar").html("<pre>" + JSON.stringify(this.form.toJSON(), null, 2) + "</pre>");

// 		$("#alt-sidebar").append(Mustache.render("Hello {{name}}",this.form.toJSON()));
// 		this.form.on('change', $.proxy(function(){
// 			$("#alt-sidebar").html("<pre>" + JSON.stringify(this.toJSON(), null, 2) + "</pre>");
// 			$("#alt-sidebar").append(Mustache.render("Hello {{name}}",this.source));
// 		}),this);
// 	},
// 	render: function() {
// 		this.el = ich[this.template]({}) ;
// 	},
// 	initialize: function() {
// 	}
// });

appView = Backbone.View.extend({
	events:{
		'click .edit': 'editApp',
		'click .remove': 'deleteApp',
		'click': 'viewApp'
	},
	template: 'app' ,
	// className: "list-group-item",
	// tagName: "li",
	editApp: function(event) {
		event.stopPropagation();
		Backbone.history.navigate('//edit/' + this.model.attributes.id, { trigger: true });
	},
	deleteApp: function(event) {
		event.stopPropagation();
		this.model.destroy();
		this.remove();
	},
	viewApp: function() {
		Backbone.history.navigate('//app/' + this.model.attributes.id, { trigger: true });
	},
	// render: function() {
	// 	//this.$el.append(ich[this.template](this.model.attributes) );
	// 	return this;
	// },
	initialize: function() {
		this.setElement(ich[this.template]( this.model.attributes ));
		$('#form-list').append(this.$el);
	}
});

appsView = Backbone.View.extend({
	template: "apps" ,
	render: function() {
		this.$el.append(ich[this.template]( ) );
		return this;
	},
	onShow:function() {
		_.each(myApps.models,function(model){
			var temp = new appView({ 'model': model });
			//temp.render();
		});
	}
});
appMainView = Backbone.View.extend({
	events:{
		'click .newForm': 'newForm',
		'click .newTemplate': 'newTemplate',
		'click .newChart': 'newChart'
	},
	newForm: function(){
		$().berry({legend: 'Form', model: new formModel({stack_id:this.model.attributes.id}), fields: ['Title']}).on('destroyed',$.proxy(function(){
			//myForms.add(this.model);
			//this.model.attributes.fieldsets.push()
			//this.$el.find('#title').html(this.model.attributes.title);
			myApp.fetch( { success: function() {
				contentManager.show( new appMainView( { model: myApp } ) );
				sidebarManager.show( new appSideView( { model: myApp } ) );
			}});
		},this) );
	},

	newTemplate: function(){
		$().berry({legend: 'Template', model: new templateModel({stack_id:this.model.attributes.id}), fields: ['Title']}).on('destroyed',$.proxy(function(){
			//this.$el.find('#title').html(this.model.attributes.title);
			myApp.fetch( { success: function() {
				contentManager.show( new appMainView( { model: myApp } ) );
				sidebarManager.show( new appSideView( { model: myApp } ) );
			}});
		},this) );
	},

	newChart: function(){
		$().berry({legend: 'Chart', model: this.model, fields: ['Title']}).on('saved',$.proxy(function(){
			this.$el.find('#title').html(this.model.attributes.title);
		},this) );
	},
	template: "apps_main" ,
	initialize: function() {
		this.setElement(ich[this.template]( this.model.attributes ));
		//$('#form-list').append(this.$el);
	}
});
appSideView = Backbone.View.extend({
	template: "apps_side" ,
	onShow: function(){
		$('#sidebar').berry({
			default: {hideLabel: true},
			renderer: 'popins',
			popins: {placement: 'right', container: 'body'},
			model: this.model,
			fields: ['Title']
		});
	},
	initialize: function() {
		this.setElement(ich[this.template]( this.model.attributes ));
		//$('#form-list').append(this.$el);
	}
});

// Create a model for the profile
appModel = Backbone.Model.extend({
	schema:{
		Title: {label: 'Title'},
		Color: {},
		Icon: {},
		Tags: {type: 'tags'}
	},
	urlRoot: '/apps',
});
appsCollection = Backbone.Collection.extend({
		//localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: appModel,
		url: '/apps',
});




editFormView = Backbone.View.extend({
	events:{
		'click #save-form' : 'save',
		'click #title' : 'modify'
	},
	modify: function(){
		$().berry({legend: 'Form Options', model: this.model, fields: ['Title']}).on('saved',$.proxy(function(){
			this.$el.find('#title').html(this.model.attributes.title);
		},this) );
	},
	template: "forms_edit" ,
	onShow:function() {
		cb = new cobler({target: '#itemcontainer',axis: 'y'});
		cb.load(JSON.parse(this.model.attributes.content));
	},
	render: function(){
		this.setElement(ich[this.template](this.model.attributes));
	},
	initialize: function(){
		//this.setElement(ich[this.template]( this.model.attributes ));
	},
	save:function(){
		//alert('hello');
		message({title: 'Success!', text: 'Successfully updated the form', timeout: 3000, color: "#5F895F", icon: "fa fa-user" });
//		this.model.set({content: JSON.stringify(cb.toJSON())});
		this.model.save({content: JSON.stringify(cb.toJSON())},{patch:true});
	},
	remove: function() {
    Backbone.View.prototype.remove.call(this);
  }
});
// Create a model for the profile
formModel = Backbone.Model.extend({
	schema:{
		Title: {}
	},
	urlRoot: '/forms'
});
formsCollection = Backbone.Collection.extend({
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: formModel,
		url: '/forms',
});




editTemplateView = Backbone.View.extend({
	events:{
		'click #save-form': 'save',
		'click #title': 'modify'
	},
	modify: function(){
		$().berry({legend: 'Form Options', model: this.model, fields: ['Title']}).on('saved', $.proxy(function(){
			this.$el.find('#title').html(this.model.attributes.title);
		},this) );
	},
	template: 'forms_template',
	onShow:function() {
		// cb = new cobler({target: '#itemcontainer',axis: 'y'});
		// cb.load(JSON.parse(this.model.attributes.content));
		this.editor = ace.edit("itemcontainer");
    this.editor.setTheme("ace/theme/chrome");
    this.editor.getSession().setMode("ace/mode/handlebars");
    this.editor.focus();
    //editor.setValue(this.model.attributes.content); // or session.setValue
	},
	render: function() {
		this.setElement(ich[this.template](this.model.attributes));
	},
	initialize: function() {
		//this.setElement(ich[this.template]( this.model.attributes ));
	},
	save:function() {
		message({title: 'Success!', text: 'Successfully updated the form', timeout: 3000, color: "#5F895F", icon: "fa fa-user" });
//		this.model.set({content: JSON.stringify(cb.toJSON())});
		this.model.save({content: this.editor.getValue()},{patch:true});
	},
	remove: function() {
    Backbone.View.prototype.remove.call(this);
  }
});
// Create a model for the profile
templateModel = Backbone.Model.extend({
	schema: {
		Title: {}
	},
	urlRoot: '/templates'
});
templatesCollection = Backbone.Collection.extend({
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: templateModel,
		url: '/templates',
});
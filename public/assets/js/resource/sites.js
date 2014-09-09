
sitesView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add'
	},
	add: function() {
		$().berry({legend: 'Site Options', model: new siteModel(), fields: ['Domain']}).on('completed', function(){
			if(this.closeAction === 'save'){
				mySites.add(this.options.model);
				new siteView({'model': this.options.model});
			}
		} );
	},
	template: 'sites_view' ,
	onShow: function() {
		_.each(mySites.models,function(model) {
			new siteView({'model': model});
		});
	},
	render: function() {
		this.setElement(ich[this.template]( mySites ));
	},
});
siteView = Backbone.View.extend({
	events: {
		'click .btn-danger': 'destroy',
		'click .btn-success': 'view',
		'click': 'edit'
	},
	edit: function(e) {
		e.stopPropagation();
		this.form({legend: '<i class="fa fa-globe"></i> Edit Site'});
	},
	view: function(e) {
		e.stopPropagation();
//		myrouter.navigate('page/'+this.model.id, {trigger: true});
		window.location.href = 'http://'+this.model.attributes.domain;
	},
	template: 'sites_item_view',
	target: '#page-list',
	initialize: function() {
		this.autoElement();
	}
});

siteModel = Backbone.Model.extend({
	schema: {
		Domain: {},
		Redirect: {type: 'custom_radio', default: 'No', options: ['Yes', 'No'], useName: true},
		Theme: {type: 'select', show: {'not_matches': {name: 'redirect', value: 'Yes'}}, choices: [{name: 'default', value: 'adams_site'},{name: 'Kampai', value: 'kampai2'}]},
		Target: {show: {'matches': {name: 'redirect', value: 'Yes'}}},
		Homepage: {show: {'not_matches': {name: 'redirect', value: 'Yes'}}},
		Modules: {type: 'tags', show: {'not_matches': {name: 'redirect', value: 'Yes'}}}
	},
	idAttribute: '_id',
	urlRoot: '/sites'
});
sitesCollection = Backbone.Collection.extend({
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: siteModel,
		url: '/sites',
});
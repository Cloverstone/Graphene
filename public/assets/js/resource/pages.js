pagesView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add'
	},
	add: function() {
		$().berry({legend: 'Page Options', model: new pageModel(), fields: ['Title']}).on('completed', function(){
			// debugger;
			// if(this.closeAction === 'save'){
			// if(!this.options.model.isNew()){

				myPages.add(this.options.model);
				contentManager.show( new editPageView( { model: this.options.model } ) );
				myrouter.navigate('#/page/'+this.options.model.id, {trigger: false});
			// }
		} );
	},
	template: 'pages_view' ,
	onShow: function() {
		_.each(myPages.models,function(model) {
			var temp = new pageView({'model':model});
		});
	},
	render: function() {
		this.setElement(render(this.template, myPages ));
	},
});
pageView = Backbone.View.extend({
	events: {
		'click .btn-danger': 'destroy',
		'click .btn-success': 'viewPage',
		'click': 'editPage'
	},
	editPage: function(e) {
		e.stopPropagation();
		myrouter.navigate('#/page/'+this.model.id, {trigger: true});
	},
	viewPage: function(e) {
		e.stopPropagation();
//		myrouter.navigate('page/'+this.model.id, {trigger: true});
		window.location.href = '/pages/'+this.model.attributes.slug;
	},
	template: 'page_view',
	target: '#page-list',
	initialize: function() {
		this.autoElement();
	}
});
editPageView = Backbone.View.extend({
	events:{
		'click #save-page': 'save',
		'click #title': 'modify'
	},
	modify: function() {
		$().berry({legend: 'Page Options', model: this.model, fields: ['Title']}).on('saved',$.proxy(function(){
			this.$el.find('#title').html(this.model.attributes.title);
		},this) );
	},
	template: 'pages_edit' ,
	onShow: function() {
		// cb = new cobler({target: '#itemcontainer', types: ['content']});
		// cb.load(this.model.attributes.json);

			templates['itemContainer'] = Hogan.compile('<div class="cobler-li-content"></div><div class="btn-group parent-hover actions"><span class="remove-item btn btn-danger fa fa-trash-o" data-title="Remove"></span><span class="duplicate-item btn btn-default fa fa-copy" data-title="Duplicate"></span></div>')


			// var items = {};
			// debugger;

			// if(typeof this.model.attributes.json !== 'undefined' &&  this.model.attributes.json !== null){
			// 	items = JSON.parse(this.model.attributes.json) || {};
			// }
      cb = new Cobler({formTarget:$('#form'), disabled: false, targets: [document.getElementById('editor')],items:this.model.attributes.json})
      list = document.getElementById('cb-source');
      cb.addSource(list);
      cb.on('activate', function(){
      	debugger;
      	if(typeof Berries.berryeditor !== 'undefined'){
      		// Berries.content.trigger('deactivate');
      		Berries.berryeditor.destroy();
      	}
        if(list.className.indexOf('hidden') == -1){
          list.className += ' hidden';
        }
        $('#form, .reset-form-view').removeClass('hidden');
      })
      cb.on('deactivate', function(){
      	// debugger;
      	if(typeof Berries.content !== 'undefined'){
      		Berries.content.trigger('deactivate');
      		Berries.content.destroy();
      	}
        list.className = list.className.replace('hidden', '');
        $('#form, .reset-form-view').addClass('hidden');
      })
      cb.on('remove', function(){
      	cb.deactivate();
      })

      document.getElementById('cb-source').addEventListener('click', function(e) {
        cb.collections[0].addItem(e.target.dataset.type);
      })


	},
	render: function() {
		this.setElement(render(this.template, this.model.attributes));
	},
	save:function() {
		message({title: 'Success!', text: 'Successfully updated the form', timeout: 3000, color: "#5F895F", icon: "fa fa-user" });
	//		this.model.set({content: JSON.stringify(cb.toJSON())});
		
		// cb.deselect();
		      	cb.deactivate();

		// cobler.changed = false;
		this.model.save({json: cb.toJSON({editor:true}), content: cb.toHTML({editor:true})[0]}, {patch:true});
	},
	remove: function() {
    Backbone.View.prototype.remove.call(this);
  }
});

pageModel = Backbone.Model.extend({
	schema: {
		Title: {},
		Color: {},
		Icon: {},
		Tags: {type: 'tags'}
	},
	idAttribute: '_id',
	urlRoot: '/pages',
	initialize: function() {
		this.bind('change', function(){ this.save(); });
	}
});
pagesCollection = Backbone.Collection.extend({
//		localStorage: new Backbone.LocalStorage('forms'), // Unique name within your app.
		model: pageModel,
		url: '/pages',
});
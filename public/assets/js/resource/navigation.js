
navigationView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add',
		//'click #dropt': 'addImage'
	},
	add: function() {
		$().berry({legend: 'Navigation Item Options', model: new navigationModel(), fields: ['Text', 'Link']}).on('destroyed', function(){
				myNavigation.add(this.options.model);
				//contentManager.show( new editPageView( { model: this.options.model } ) );
		} );
	},
	template: 'navigation_view' ,
	onShow: function() {
		_.each(myNavigation.models, function(model) {
			var temp = new navigationItemView({'model': model});
		});
		$('.nested-sortable').off();
		$('.nested-sortable').nestedSortable({
			handle: 'div',
			items: 'li',
			listType: 'ul',
			forcePlaceholderSize: true,
			// //helper: 'clone',
			// opacity: .7,
			start: function(event, ui){
				ui.item.closest('.ui-sortable').addClass('dragging');
			},
			placeholder: 'placeholder',
			revert: 250,
			tabSize: 35,
			tolerance: 'pointer',
			toleranceElement: '> div',
			maxLevels: 3,
			isTree: true,
			expandOnHover: 700,
			branchClass: 'nestedSortable-branch',
			stop: function(e)	{
				myNavigation.saveOrder($(this));
			},

		});
	},
	render: function() {
		this.setElement(render(this.template, myNavigation));
	},
});

navigationItemView = Backbone.View.extend({
	events: {
		'click .fa-pencil': 'editNavItem',
		'click .fa-times': 'destroy',
	},
	editNavItem: function(e) {
		e.stopPropagation();
		this.form({legend: '<i class="fa fa-photo"></i> Edit Navigation', fields: ['Text', 'Link']});
	},
	template: 'navigation_item_view',
	target: '.nested-sortable',
	initialize: function() {
		if(this.model.attributes.parent_id !== "0" && typeof this.model.attributes.parent_id !== 'undefined'){
			this.target += ' #list_' + this.model.attributes.parent_id+ ' > ul';
		}
		this.autoElement();
	}
});


navigationModel = Backbone.Model.extend({
	schema:{
		Text: {required: true},
		Link: {name: 'target'},
	},
	idAttribute: '_id',
	urlRoot: '/navs',
	initialize: function(){
		this.bind('change', function(){ this.save(); });
	}
});
navigationCollection = Backbone.Collection.extend({
	model: navigationModel,
	url: '/navs',
	saveOrder: function(target){
			var temp = target.nestedSortable('toArray');
			var ids = _.pluck(temp,'item_id');
			var parents = _.pluck(temp,'parent_id');
			var results = {};
			for(var i in ids){
				if(ids[i] !== null){
					results[ids[i]] = {order: i, parent_id: (parents[i]|| '0')};
				}
			}
			$.ajax({
				url: '/nav_order',
				type: 'post',
				data: {results: results}
			});
		}
});
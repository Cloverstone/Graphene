Backbone.sortableView = Backbone.View.extend({
	collection:null,
	view:null,
	legend:'',
	fields:[],
	template: '',

	events: {
		'click .fa-plus': 'add',
	},

	add: function() {
		$().berry({legend: this.legend, model: new this.collection.model(), fields: this.fields}).on('destroyed', function(){
				this.collection.add(this.options.model);
				new this.view({'model': this.options.model});
		});
	},
	onShow: function() {
		_.each(this.collection.models, function(model) {
			new this.view({'model': model});
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
				this.collection.saveOrder($(this));
			},
		});
	},
	render: function() {
		this.setElement(ich[this.template](this.collection));
	},
});

Backbone.sortableViewItem = Backbone.View.extend({
	legend:'',
	fields:[],
	template: '',
	target: '',
	events: {
		'click .fa-pencil': 'edit',
		'click .fa-times': 'destroy',
	},
	edit: function(e) {
		e.stopPropagation();
		this.form({legend: this.legend, fields: this.fields});
	},
	initialize: function() {
		if(this.model.attributes.parent_id !== "0" && typeof this.model.attributes.parent_id !== 'undefined'){
			this.target += ' #list_' + this.model.attributes.parent_id+ ' > ul';
		}
		this.autoElement();
	}
});

restaurantCategoriesModel = Backbone.Model.extend({
	schema:{
		Text: {required: true},
		Description: {type: 'textarea'}
	},
	idAttribute: '_id',
	urlRoot: '/restaurant/categories'
});
restaurantCategoriesCollection = Backbone.Collection.extend({
	model: restaurantCategoriesModel,
	url: '/restaurant/categories',
	saveOrder: function(target){
			var temp = target.nestedSortable('toArray');
			var ids = _.pluck(temp, 'item_id');
			var parents = _.pluck(temp, 'parent_id');
			var results = {};
			for(var i in ids){
				if(ids[i] !== null){
					results[ids[i]] = {order: i, parent_id: (parents[i] || '0')};
				}
			}
			$.ajax({
				url: '/restaurant/categories_order',
				type: 'post',
				data: {results: results}
			});
		}
});




restaurantMenuItemsView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add'
	},
	add: function() {
		$().berry({legend: 'Menu Item Options', model: new restaurantMenuItemModel(), fields: ['Name', 'Price', 'Description', 'Tags', 'Category']}).on('completed', function(){
			if(this.closeAction === 'save'){
				myRestaurantMenuItems.add(this.options.model);
				new restaurantMenuItemView({'model': this.options.model});
			}
		} );
	},
	template: 'menu_items_view' ,
	onShow: function() {
		_.each(myRestaurantMenuItems.models,function(model) {
			new restaurantMenuItemView({'model': model});
		});
	},
	initialize: function() {
		this.setElement(ich[this.template]( myRestaurantMenuItems ));
	},
});
restaurantMenuItemView = Backbone.View.extend({
	events: {
		'click .btn-danger': 'destroy',
		'click': 'edit'
	},
	edit: function() {
		this.form({legend: 'Edit Menu Item', fields: ['Name', 'Price', 'Description', 'Tags', {label: 'Category', name: 'category_id', type: 'select', key: 'text', choices: myRestaurantCategories.toJSON()}]});
	},
	template: 'menu_item_view',
	target: '#menu-list',
	initialize: function() {
		this.autoElement();
	}
});

restaurantMenuItemModel = Backbone.Model.extend({
	schema:{
		Name: {required: true},
		Price: {required: true},
		Description: {type: 'textarea'},
		Tags: {type: 'tags'},
		Category: {name: 'category_id', type: 'select'}//, choices: myRestaurantCategories.toJSON()},
	},
	idAttribute: '_id',
	urlRoot: '/restaurant/menu_items'
});
restaurantMenuItemsCollection = Backbone.Collection.extend({
	model: restaurantMenuItemModel,
	url: '/restaurant/menu_items',
	
});
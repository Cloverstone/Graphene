myRestaurantCategories = new restaurantCategoriesCollection();
myRestaurantMenuItems = new restaurantMenuItemsCollection();

restaurantCategoriesView = Backbone.View.extend({
	events: {
		'click .fa-plus': 'add',
	},
	add: function() {
		$().berry({legend: 'Category Options', model: new restaurantCategoriesModel(), fields: ['Text', 'Description']}).on('destroyed', function(){
				myRestaurantCategories.add(this.options.model);
				new restaurantCategoriesItemView({'model': this.options.model});
		});
	},
	template: 'restaurantCategories_view' ,
	onShow: function() {
		_.each(myRestaurantCategories.models, function(model) {
			new restaurantCategoriesItemView({'model': model});
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
			stop: function(e, ui)	{
				ui.item.closest('.ui-sortable').removeClass('dragging');
				myRestaurantCategories.saveOrder($(this));
			},
		});
	},
	render: function() {
		this.setElement(ich[this.template](myRestaurantCategories));
	},
});

restaurantCategoriesItemView = Backbone.View.extend({
	events: {
		'click .actions .fa-pencil': 'editItem',
		'click .actions .fa-times': 'destroy',
		//'click .sortableContent': 'editNavItem',
	},
	editItem: function(e) {
		e.stopPropagation();
		// if(!this.editing && !this.$el.closest('.ui-sortable').hasClass('dragging')){
		// 	this.editing = true;
		// 	this.$el.find('.sortableContent').berry({model: this.model, fields: ['Text', 'Link']}).on('cancel', function(){
		// 		this.options.model.trigger('sync');
		// 	});
		// }
		this.form({legend: '<i class="fa fa-photo"></i> Edit Category', fields: ['Text', 'Description']});
	},
	editing: false,
	template: 'restaurantCategory_view',
	target: '.nested-sortable',
	initialize: function() {
		if(this.model.attributes.parent_id !== '0' && typeof this.model.attributes.parent_id !== 'undefined'){
			this.target += ' #list_' + this.model.attributes.parent_id+ ' > ul';
		}
		this.autoElement();
	}
});

restaurantCategoriesModel = Backbone.Model.extend({
	schema:{
		Text: {required: true},
		//Type: {type: 'select', choices: [{label: 'Page', value: 'page'}, {label: 'Link', value: 'link'}]},
		//Page: {type: 'select', name: 'page_id', choices: ['mine', 'yours']},
		//Link: {},
		Description: {type: 'textarea'}
	},
	idAttribute: '_id',
	urlRoot: '/restaurant/categories'
});
restaurantCategoriesCollection = Backbone.Collection.extend({
	model: restaurantCategoriesModel,
	url: '/restaurant/categories',
	saveOrder: function(target) {
			var temp = target.nestedSortable('toArray');
			var ids = _.pluck(temp, 'item_id');
			var parents = _.pluck(temp, 'parent_id');
			var results = {};
			for(var i in ids) {
				if(ids[i] !== null) {
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
		this.form({legend: 'Menu Item', fields: ['Name', 'Price', 'Description', 'Tags', {label: 'Category', name: 'restaurant_category_id', type: 'select', key: 'text', reference: '_id', choices: myRestaurantCategories}]});
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
		Category: {name: 'restaurant_category_id', type: 'select', key: 'text', reference: '_id', choices: myRestaurantCategories},
	},
	idAttribute: '_id',
	urlRoot: '/restaurant/menu_items'
});
restaurantMenuItemsCollection = Backbone.Collection.extend({
	model: restaurantMenuItemModel,
	url: '/restaurant/menu_items',
	
});
berryEditor = function(container){
	return function(){
		var formConfig = {
			renderer: 'tabs', 
			attributes: this.get(), 
			fields: this.fields,
			autoDestroy: true,
			inline:true,
			// legend: 'Edit '+ this.get()['widgetType']
		}
		var opts = container.owner.options;
		var events = 'save';
		if(typeof opts.formTarget !== 'undefined' && opts.formTarget.length){
			formConfig.actions = false;
			events = 'change';
		}	
		var myBerry = new Berry(formConfig, opts.formTarget ||  $(container.elementOf(this)));
		myBerry.on(events, function(){
		 	container.update(myBerry.toJSON(), this);
		 	myBerry.trigger('saved');
		}, this);
		myBerry.on('cancel',function(){
		 	container.update(this.get(), this)
		}, this)
	}
}

berryEditor2 = function(container){
	return function(){
		var formConfig = $.extend(true, {}, {
			// renderer: 'tabs', 
			attributes: this.get(), 
			fields: this.fields,
			autoDestroy: true
		}, this.formOptions || {});

		var opts = container.owner.options;
		var events = 'save';
		if(typeof opts.formTarget !== 'undefined' && opts.formTarget.length){
			formConfig.actions = false;
			// events = 'change';
		}	
		// debugger;
		var myBerry = new Berry(formConfig, this.formTarget || $(container.elementOf(this)).find('.content'));
		myBerry.on(events, function(){
		 	container.update(myBerry.toJSON(), this);
		 	// container.deactivate();
		 	// myBerry.trigger('saved');
		}, this);
		myBerry.on('cancel',function(){
		 	container.update(this.get(), this)
		 	container.deactivate();
		}, this)
		return myBerry;
	}
}


Cobler.types.Content = function(container){
	function deactivate(){
		debugger;
	}
	function render() {
		return templates['widgets_content'].render(get(), templates);
	}
	function get() {
		item.widgetType = 'Content';
		return item;
	}
	function set(newItem) {
		$.extend(true, item, newItem);
	}
	function toJSON(opts){
		if(opts.editor){return get();}

		return {
			guid: item.guid,
			collapsed: item.collapsed
		}
	}
	var item = {
		title: 'This is the title',
		text: 'Here is some text'
	}
	var fields = {
		Text: {type: 'contenteditable', label: false}
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor2.call(this, container),
		get: get,
		set: set,
		deactivate: deactivate,
		container: container,
		initialize: function(el) {
			this.$el = $(el);
		}
	}
}

Cobler.types.Image = function(container){
	function render() {
		// if(!item.container && this.container.owner.options.disabled){
			return templates['widgets_image'].render(get(), templates);
		// }else{
		// 	return templates['widgets_image_header'].render(get(), templates);
		// }
	}
	function get() {
		item.widgetType = 'Image';
		return item;
	}
	function toJSON(opts){
		if(opts.editor){return get();}
		
		return {
			guid: item.guid,
			collapsed: item.collapsed
		}
	}
	function set(newItem) {
		$.extend(true, item, newItem);
	}
	var item = {
	}
	var fields = {
		Image: {type: 'image_picker', choices: '/images?list', reference: 'name', value_key: 'name', path:'/assets/img/'},
		Text: {label: 'Alt Text', required: true}
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,
		container: container,
		initialize: function(el) {
			this.$el = $(el);
		}
	}
}


Berry.btn.submit= {
		label: 'Submit',
		icon:'check',
		id: 'berry-submit',
		modifier: 'success pull-right',
		click: function() {
			if(this.options.autoDestroy) {
				this.on('saved', this.destroy);
			}
			this.trigger('save');
		}
	};
Berry.btn.wait= {
		label: 'Submitting',
		icon:'spinner fa-spin',
		id: 'berry-wait',
		modifier: 'warning pull-right',
		click: function() {
		}
	};
Cobler.types.Form = function(container){
	function render() {
		if(item.container){
			return templates['widgets_form_container'].render(get(), templates);
		}else{
			return templates['widgets_form_container'].render(get(), templates);
		}
	}
	function get() {
		item.widgetType = 'Form';
		return item;
	}
	function toJSON(opts){
		if(opts.editor){
			var temp = get();
			delete temp.loaded;
			return temp;
		}
		
		return {
			guid: item.guid,
			collapsed: item.collapsed
		}
	}
	function set(newItem) {
		this.changed = (typeof newItem.form !== 'undefined' && item.form !== newItem.form);

		$.extend(item, newItem);
	}
	var item = {
		title: 'This is the title',
		text: 'Here is some text'
	}
	var fields = {
		Form: {type: 'select', choices: '/forms?list', label_key: 'form_name'},
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,		
		container: container,
		initialize: function(el){
				if(!item.loaded || this.changed){
					$.ajax({
						url      : '/forms/' + item.form,
						dataType : 'json',
						success  : $.proxy(function (data) {
								this.container.update({loaded: {fields: JSON.parse(data.fields||"{}"),options: JSON.parse(data.options||"{}"), name: data.name} },this);
								this.container.deactivate()
						}, this)
					});
				}

				this.$el = $(el);		
				if(typeof item.loaded !== 'undefined' && (typeof item.loaded.fields !== 'undefined' || item.loaded.data_type == 'None' )) {

					this.berry = this.$el.find('.form_content').berry({name:item.form ,autoDestroy: false, inline: item.loaded.options.inline , action: '/formsubmit/'+item.form ,actions:['submit'], fields: item.loaded.fields});
					this.berry.on('saveing', function(){
						this.setActions(['wait']);
					});
					this.berry.on('saved', function(data){
						if(data.success){
							this.berry.destroy();
							this.$el.html('<div class="alert alert-success">Thank you for your submission. It has been successfully logged!</div>')
						}else{
							message({title:'Error', text: 'Form failed to submit', color: '#ff0000'});
							this.berry.setActions(['submit']);
						}
					}, this);
				}
		}
	}
}



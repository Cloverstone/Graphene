//		FormalJS
//		https://github.com/Cloverstone/Formal
//		
//		(c) 2011-2014 Adam Smallcomb
//		Licensed under the MIT license.
//		
//		{>o<}
//
//		(}<

Formal = function(obj , options) {
	if(typeof obj === 'undefined'){obj = $('<div/>');}
	this.$el = obj;
	this.fieldsets = [];
	this.section_count = 0;
	this.sections = [];
	this.sectionList = [];
	this.options = $.extend(true , {
		source: {},
		name: getUID(),
		errorClass: 'has-error',
		errorTextClass: 'font-xs.text-danger',
		options: { inline : false},
		renderer: 'base',
		flatten: false,
		default: {type:"text"},
		//actions: ['cancel' , 'save']
	} , options);
	this.source = this.options.source;
	this.renderer = new Formal.renderers[this.options.renderer](this);
	this.target = this.renderer.render();

	if(this.options.legend && this.options.legendTarget){
		this.options.legendTarget.append(this.options.legend);
	}

	this.destroy = function() {
		this.publish('destroy');
		this.$el.empty();
		for(var i in this.fieldsets) {
			$('[name=' + this.fieldsets[i] + ']').empty();
		}
		this.items = {};
		if(typeof this.renderer.destroy === 'function'){
			this.renderer.destroy();
		}
		this.each(this.items , function() { if(typeof this.destroy === 'function') { this.destroy(); } });
		delete	Formal.instances[this.options.name];
		this.publish('destroyed');
	};
	this.parse = function(search) {
		if(typeof search === 'string'){
			var searchables = search.split('.');
			var target = this.source;
			for(var i in searchables) {
				if(typeof target[searchables[i]] !== 'undefined'){
					target = target[searchables[i]];
				} else {
					return false;
				}
			}
			return target;
		} else {
			this.source = this.parseItems(this.items , {});
			//possibly remove if I can rethink flattening
			for(var j in this.source) {
				if(typeof this.source[j] === 'object') {
					if(typeof this.source[j][0] === 'undefined') {
						delete this.source[j];
					}
				}
			}
			return this.source;
		}
	};
	this.toJSON = this.parse;

	this.parseItem = function(item,source) {};
	this.parseItems = function(items,source) {
		for(var i in items){
			var item = items[i];
			if(item.item){
				if(item.removed !== true && item.enabled !== false  && (item.parent === null || item.parent === undefined || (item.parent.removed !== true && item.parent.enabled !== false))){
					var temp = item.parse();
					if(item.item.value !== temp) {
						item.item.value = temp;
						this.changed = true;
					}
					var insertAs = (item.item.parseAs || i);
					if(item.multiple) {
						source[insertAs] = (source[insertAs] || []);
						source[insertAs].push(temp);
					} else {
						source[insertAs] = temp;
					}
				}
			}else if(!$.isEmptyObject(item.instances)) {
				source[i] = this.parseItems(item.instances , []);
				if(item.toArray && !$.isEmptyObject(source[i])){source[i] = this.sourceToArray(source[i],'uuid');}
			}
			if(!$.isEmptyObject(item.children) && !this.options.flatten) {
				/*test*/source[i] = this.parseItems(item.children,{});
			}
		}

		//questionable 
		if($.isArray(source)){
			for(var j in source) {
				if($.isEmptyObject(source[j])) {
					delete source[j];
				}
			}
		source = (function(obj, predicate, context) {
		var nativeFilter =Array.prototype.filter;
		var results = [];
		if (obj === null) return results;
		if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
		each(obj, function(value, index, list) {
			if (predicate.call(context, value, index, list)) results.push(value);
		});
		return results;
	}(source, function(value) {return value;})) ;

		}
		return source;
	};
	this.each = function(items,toCall,args) {
		for(var i in items) {
			var item = items[i];
			if(item.item) {
				if(item.removed !== true && (item.parent === null || item.parent === undefined || (item.parent.removed !== true && item.parent.enabled !== false))){
					toCall.call(item,args);
				}
			} else if(!$.isEmptyObject(item.instances)) {
				this.each(item.instances,toCall,args);
			}
			if(!$.isEmptyObject(item.children)) {
				this.each(item.children,toCall , args);
			}
		}
	};
	// this.addItem = function(item , parent) {
	// 	current = new Formal.field(item , this);
	// 	var exists = (this.items[current.name] !== undefined);

	// 	if(current.isContainer) {
	// 		if(!exists) {
	// 			this.items[current.name] = { isContainer: true , multiple: current.multiple , hasChildren: !$.isEmptyObject(item.items) , toArray: current.item.toArray , instances:[] };
	// 		}
	// 		this.items[current.name].get = function() {
	// 			var instances = [];
	// 			for(var i in this.instances) {
	// 				if(!this.instances[i].removed){
	// 					instances.push(this.instances[i]);
	// 				}
	// 			}
	// 			return instances;
	// 		};
	// 		this.items[current.name].instances.push(current);
	// 	}else{
	// 		if(exists){
	// 			if(this.items[current.name].isContainer !== undefined){
	// 				if(!this.options.flatten){
	// 				/*test*/var temp = [];
	// 				/*test*/temp.push(this.items[current.name]);
	// 				temp = this.items[current.name];
	// 				this.items[current.name] = {multiple:current.multiple,hasChildren:!$.isEmptyObject(item.items),instances:[]};
	// 				this.items[current.name].instances.push(temp);
	// 				}
	// 			}
	// 			this.items[current.name].instances.push(current);
	// 		}else{
	// 			this.items[current.name] = current;
	// 		}
	// 	}
			
	// 	current.parent = parent;
	// 	if(parent !== null && parent !== undefined){
	// 		parent.children[current.name] = current;
	// 	}
	// 	return current;
	// };
	
	this.addItem = function(item , parent, target, insert) {
		current = new Formal.field(item , this);
		var exists = (this.items[current.name] !== undefined);

		if(current.isContainer) {
			if(!exists) {
				this.items[current.name] = { isContainer: true , multiple: current.multiple , hasChildren: !$.isEmptyObject(item.items) , toArray: current.item.toArray , instances:[] };
			}
			this.items[current.name].get = function() {
				var instances = [];
				for(var i in this.instances) {
					if(!this.instances[i].removed){
						instances.push(this.instances[i]);
					}
				}
				return instances;
			};

			var insertAt = this.items[current.name].instances.length;
			var targetId = $(target).attr('id');
			for(var j in this.items[current.name].instances){
				if(this.items[current.name].instances[j].id == targetId){
					insertAt = parseInt(j,10) + 1;
					break;
				}
			}
			this.items[current.name].instances.splice(insertAt,0,current);

			var index = 0;
			for(var j in this.items[current.name].instances){
				if(!this.items[current.name].instances[j].removed){
					this.items[current.name].instances[j].instance_id = index++;
				}
			}
		}else{
			if(exists){
				if(this.items[current.name].isContainer !== undefined){
					if(!this.options.flatten){
					/*test*/var temp = [];
					/*test*/temp.push(this.items[current.name]);
					temp = this.items[current.name];
					this.items[current.name] = {multiple:current.multiple,hasChildren:!$.isEmptyObject(item.items),instances:[]};
					this.items[current.name].instances.push(temp);
					}
				}
				this.items[current.name].instances.push(current);
			}else{
				this.items[current.name] = current;
			}
		}
			
		current.parent = parent;
		if(parent !== null && parent !== undefined){
			parent.children[current.name] = current;
		}
		return current;
	};
	
	this.changed = false;
	this.processUpdate = function() {
		var max = 5,iteration = 1;
		do{
			this.changed = false;
			this.parse();
			this.each(this.items , this.processValueItem);
			this.each(this.items , this.processShowItem);
			this.each(this.items , this.processDisabledItem);
			iteration++;
		}while(this.changed === true && iteration <= max);
	};

	this.processShowItem = function() {
		var temp = !Formal.processConditions.call(this , (this.item.display || this.item.show));
		if(this.hidden !== temp){
			this.owner.changed = true;
			this.hidden = temp;
			this.self.toggle(!temp);
		}
	};

	this.processValueItem = function() {
		if(typeof this.value === 'function') {
			var temp = (this.value.call(this.owner) || '');
			if(this.item.value !== temp.toString()){
				this.owner.changed = true;
				this.item.value = temp.toString();
				this.update(this.item,true);
			}
		}
	};

	this.processDisabledItem = function() {
		var temp = Formal.processConditions.call(this , this.item.enable);
		if(this.enabled !== temp){
			this.owner.changed = true;
			if(!temp){
				this.enabled = false;
				if(this.factory.disable !== undefined){
					this.factory.disable(this.self);
				}
			}else{
				this.enabled = true;
				this.self.find('[disabled="disabled"]').removeAttr('disabled');
			}
		}
	};

	this.sourceToArray = function(source,identifier) {
		var newarray = {};
		newarray[identifier] = [];
		for(var j in source){
			if(typeof source[j] !== 'bool' && !$.isEmptyObject(source[j])){
				newarray[identifier].push(j);
				for(var name in source[j]){
					if(typeof newarray[name] === 'undefined'){
						newarray[name] = [];
					}
					newarray[name].push(source[j][name]);
				}
			}
		}
		return newarray;
	};

	//{identifier:["1","2"],name:["first","second"]} => [{identifier:"1",name:"first"},{identifier:"2","name":"second"}] ?not sure thats right
	this.normalizeFieldsetSource = function(source,identifier) {
		repaired = {};
		if(source !== undefined){
			for(var obj in source[identifier]){
				repaired[obj] = {};
			}
			for(var name in source){
				if(name != identifier){
					var i = 0;
					for(var index in source[identifier]){
						repaired[index][name] = source[name][i];
						i++;
					}
				}
			}
		}
		return repaired;
	};
	
	//Adding additional items
	this.dupeMe = function() {
		var target = this.self;
		var max = parseInt($(target).data('max') , 10) || -1;
		var count = $(target).siblings().length;
		if(max == -1 || max > count){
			var item = $.extend({},this.item,{id:getUID()});
			this.owner.processItem(item , $(target) , {} , this.parent , 'after');
			this.publish('change');
		}
	};
	this.dropMe = function() {
		var target = this.self;
		var min = parseInt($(target).data('min') , 10) || 1;
		var count = $(target).siblings('[name='+$(target).attr('name')+']').length;
		if(min <= count){
			$(target).empty().remove();
			this.removed = true;
			var index=0;
			for(var j in this.owner.items[this.name].instances){
				if(!this.owner.items[this.name].instances[j].removed){
					this.owner.items[this.name].instances[j].instance_id = index++;
				}
			}
			this.publish('change');
		}
	};
	
	this.items = {};
	this.itemArray = function() {
		var items = [];
		for(var i in this.items){
			items.push(this.items[i]);
		}
		return items;
	};
	this.valid = true;
	this.initializeItem = function(item,parent,target,source,insert) {
		var current = this.addItem(item,parent,target,insert);
		if(current.fieldset === undefined){current.fieldset = target;}
		current.source = (source || {});
		if(insert == 'before'){
			$(current.fieldset).before(current.create());
		}else if(insert == 'after'){
			$(current.fieldset).after(current.create());
		}else{
			$(current.fieldset).append(current.create());
		}
		current.callback();
	};

	this.processItem = function(item,target,source,parent,insert) {
		item = $.extend({},item);
		if(target[0] !== undefined){
				target = target[0];
		}
		//work out with builder
		if(item.name === undefined && item.uuid !== undefined){item.name = item.uuid;item.type = item.display;}
		if(source[(item.parseAs || item.name)] !== undefined) { item.value = source[(item.parseAs || item.name)]; }
		if(Formal.types[item.type] !== undefined) {
			var cSource = $.extend({} , source[(item.parseAs || item.name)]);
			if(typeof item.multiple !== 'undefined' && item.multiple && typeof source[(item.parseAs || item.name)] !== 'undefined'){
				if(item.toArray){ cSource = this.normalizeFieldsetSource(cSource,'uuid'); }
				for(var f in cSource) {
					this.initializeItem($.extend({},item),parent,target,cSource[f]);
				}
			}else{
				if(item.type == "fieldset" && this.options.flatten) { // && typeof item.name === 'undefined') {
					this.initializeItem(item,parent,target,source,insert);
				} else {
					this.initializeItem(item,parent,target,cSource,insert);
				}
			}
		}
	};

	this.processItems = function(items,target,source,parent) {
		for(var i in items){
			if(typeof items[i] === 'string'){
				items[i] = { type : items[i],label : i };
			}
			if(typeof items[i].name === 'undefined' && items[i] != 'fieldset'){
				items[i].name = i.toLowerCase().split(' ').join('_');
			}
			if(typeof items[i].label === 'undefined' && items[i].label !== false){
				items[i].label = i;
			}
			this.processItem(items[i], target, source, parent);
		}
	};

	
	//update with mustache templates and extensibility
	this.addActions = function(actions) {
		if(actions){
			if(!this.options.actionTarget) {
				this.target.append('<div class="Formal-actions" style="overflow:hidden;padding-bottom:10px"></div>');
				this.options.actionTarget = this.target.find('.Formal-actions');
			}
			actions = containsKey(Formal.btn , actions);
			for(var action in actions) {
				var temp = $(Formal.render('formal__action',actions[action]));
					if(typeof actions[action].click === 'function'){
						temp.click($.proxy(actions[action].click,this));
					}
				this.options.actionTarget.append(temp);
			}
		}
	};


	this.processItems(this.options.items,this.target,this.options.source,null);
	this.processUpdate();
	this.addActions(this.options.actions);
	if(typeof this.renderer.initialize === 'function') {
		this.renderer.initialize();
	}

	//pub/sub service
	this.topics = {};
	this.subscribe = function(topic, func) {
		if (!this.topics[topic]) {
			this.topics[topic] = [];
		}
		var token = getUID().toString();
		this.topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};
	this.unsubscribe = function(token) {
		for (var m in topics) {
			if (this.topics[m]) {
				for (var i = 0, j = this.topics[m].length; i < j; i++) {
					if (this.topics[m][i].token === token) {
						this.topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};

	this.publish = function(topic, args) {
		this.processUpdate();
		if(!this.valid){
			this.validate();
		}
		if (!this.topics[topic]) { return false; }
		
		var subscribers = this.topics[topic],
			len = subscribers ? subscribers.length : 0;
		while (len--) {
			subscribers[len].func.call(this, args, topic);
		}
		return this;
	};

	this.sum = function(search) {
		var inputs = this.parse(search);
		var val = 0;
		if(typeof inputs === 'object'){
			for(var i in inputs){
				val += (parseInt(inputs[i] , 10) || 0);
			}
			return val;
		}else{
			return inputs;
		}
	};
	this.$el.find('.form-control:first').focus();
	Formal.instances[this.options.name] = this;
};

Formal.instances = {};
	
Formal.field = function(item,owner) {
	//this.original = $.extend({},item);


	this.factory = Formal.types[item.type];
	this.item = $.extend({},this.factory.defaults,item);

	//for (var i in item) { this[i] = item[i];}

	this.owner = owner;
	this.hidden = false;
	//this.options = owner.options.options;
	this.onchange = item.onchange;
	this.multiple = item.multiple;
	if(item.value !== 0){
		if(typeof item.value === 'function'){
			this.value = item.value;
			item.value = this.value.call(this.owner);
		}else{
			this.value = (item.value || item.default || '');
		}
	}else{
		this.value = 0;
	}
	this.lastSaved = this.value;
	this.type = item.type;
	this.name = item.name;
	this.children = {};
	this.hasChildren = function(){return !$.isEmptyObject(this.children);};
	this.self = undefined;
	this.id = (item.id || getUID());
	this.fieldset = undefined;
	if(this.item.fieldset !== undefined && $('[name='+this.item.fieldset+']').length > 0){
		this.owner.fieldsets.push(this.item.fieldset);
		this.fieldset = $('[name=' + this.item.fieldset + ']')[0];
	}
	this.isContainer = (this.factory.isContainer || false);
	this.getdisplay = function(){
		if(this.factory.display !== undefined) {
			if(this.item.template !== undefined) {
				this.display = this.factory.display.call(this);
				return ich[this.item.template](this);
			} else {
				return this.factory.display.call(this);
			}
		}else{
			if(this.item.template !== undefined) {
				return ich[this.item.template](this);
			} else {
				return this.lastSaved;
			}
		}
	};
	this.display = this.getdisplay();
	this.revert = function(){
		this.value = this.lastSaved;
		this.item.value = this.lastSaved;
		this.factory.setValue.call(this,this.value);
	};
	this.update = function(item,silent){
		$.extend(this.item,item);
		this.value = (item.value || this.value);
		this.factory.setValue.call(this, this.value);
		if(!silent){
			this.publish('change');
		}
	};
	this.publish = function(topic) {
		this.value = this.factory.parse.call(this);
		this.owner.publish(topic, {
			type:this.type,
			name:this.name,
			value:this.value
			});
	};
	this.callback = function() {
		if(this.multiple && this.multiple.duplicate){
			this.self.find('.duplicate').click( $.proxy(this.owner.dupeMe, this) );
			this.self.find('.remove').click( $.proxy(this.owner.dropMe, this) );
		}
		this.factory.callback.call(this);
	};
	this.parse = function() {
		this.lastSaved = this.factory.parse.call(this);
		this.display = this.getdisplay();
		return this.lastSaved;
	};
	this.create = function() {
		this.self = $(this.factory.create.call(this)).attr('data-Formal',this.owner.options.name);
		return this.self;
	};
};

Formal.field_type = function(data) {
	type = (data.type || 'text');
	version = (data.version || '1.0');
	create = (data.create || function(source){return Formal.render('formal_' + (this.elType || this.type),this.item);});
	parse = (data.parse || function(){
		return this.$el.val();
	});
	callback = (data.callback || function(){
		this.$el = this.self.find('input');//( '[type=' + (this.elType || this.type) + ']' );
		this.$el.off();
		if(this.onchange !== undefined){
			this.$el.on("input",this.onchange);
		}
		this.$el.on("input",$.proxy(function(){this.publish('change');},this));

		if(this.item.mask && $.fn.mask){
			this.$el.mask(this.item.mask);
		}
	});
	defaults = (data.defaults || {});
	setValue = (data.setValue || function(){
		return this.$el.val(this.value);
	});
	blur = (data.blur || function() {
		return this.$el.blur();
	});
	focus = (data.focus || function() {
		return this.$el.focus().val('').val(this.value);
	});
	return {
		type: type,
		version: version,
		create: create,
		parse: parse,
		callback: callback,
		defaults: defaults,
		blur: blur,
		focus: focus,
		setValue: setValue
	};
};

// Formal.extend = function(protoProps) {
// 	var parent = this;
// 	var child = function(){ return parent.apply(this, arguments); };

// 	var Surrogate = function(){ this.constructor = child; };
// 	Surrogate.prototype = parent.prototype;
// 	child.prototype = new Surrogate;

// 	if (protoProps) $.extend(child.prototype, protoProps);

// 	return child;
// };

Formal.types = {};
Formal.register = function(elem) {
	return Formal.types[elem.type] = new Formal.field_type(elem);
};

Formal.register({type: 'fieldset'});
Formal.types.fieldset.parse = function() { return null;};
Formal.types.fieldset.create = function() {
	this.owner.fieldsets.push(this.name);
	++this.owner.section_count;
	this.owner.sections.push(this);
	this.owner.sectionList.push({'index':this.owner.section_count,'text':this.legend, state:"disabled", completed:false, active:false, error:false});
	
	var fieldset = this.owner.renderer.fieldset(this);
	return fieldset;
};
Formal.types.fieldset.isContainer = true;
Formal.types.fieldset.callback = function() {
	if(this.item.items !== undefined){
		this.owner.processItems(this.item.items,this.self,this.source,this);
	}
};

Formal.processConditions = function(conditions) {
	if (typeof conditions === 'string'){
		if(conditions === 'show' || conditions === 'display'){
			conditions = (this.item.display || this.item.show);
		}else if(conditions === 'enable'){
			conditions = this.item.enable;
		}else{
			return true;
		}
	}
	if (typeof conditions === 'bool'){
		return conditions();
	}else if (typeof conditions === 'object'){
		for(var c in conditions){
			if(!Formal.conditions[conditions[c].type].call(this,this.owner,conditions[c].args)){
			return false;
			}
		}
		return true;
	}else{
		return true;
	}
};
Formal.conditions = {
	requires: function(Formal,args) {
		var value = Formal.source[args.name];
		return (value !== null && value !== '');
	},
	requiresallprevious: function(Formal,args) {},
	not_matches: function(Formal , args) {
		if(Formal.source[args.name] != args.match){
			return true;
		}else{
			return false;
		}
	},
	matches: function(Formal,args) {
		if(Formal.source[args.name] == args.match){
			return true;
		}else{
			if(Formal.source[this.parent.name][this.parent.instance_id][args.name] == args.match){
				return true;
			}else{
				return false;
			}
		}
	},
	hasclass: function(Formal,args) {
		if($(args.selector).hasClass(args.match)){
			return true;
		}else{
			return false;
		}
	}
};


$((function($){
	$.fn.formal = function(options) {
		return new Formal(this, options);
	};
})(jQuery));

Formal.render = function(name , data) {
	return (ich[name] || ich['formal_text'])(data);
};
Formal.renderers = {};
Formal.renderers['base'] = function(owner) {
	this.owner = owner;
	this.initialize = function() {
		$(this.owner.$el).keydown(function(event) {
			switch(event.keyCode) {
				case 27://escape
					$('#close').click();
					break;
				case 13://enter
					if (event.ctrlKey) {
						$('#submit').click();
					}
					break;
			}
		});
	};
	this.fieldset = function(data) {
		return Formal.render('formal_' + this.owner.options.renderer + '_fieldset',data);
	};
	this.destroy = function() {
		this.owner.$el.empty();
	};
	this.render = function() {
		this.owner.$el.html(Formal.render('formal_' + this.owner.options.renderer + '_form' , this.owner.options));
		return this.owner.$el.find('form');
	};
};


Formal.processOpts = function(item){
	if(typeof item.choices !== 'undefined' && item.choices.length > 0){
		item.options = $.map(item.choices, function(value, index) {
			return [value];
		});
	}
	if(typeof item.options !== 'undefined' && item.options.length > 0){
		for ( var i in item.options ) {
			var cOpt = item.options[i];
			if(typeof cOpt === "string") {
				cOpt = {name: cOpt};
				if(item.useName) {
					cOpt.value = cOpt.name;
				}
			}
			item.options[i] = $.extend({value: i},{name: cOpt.title,value: cOpt.id},cOpt);
			cOpt.selected = (cOpt.value == item.value);
		}
	}
	return item;
}



//fml = {};
// fml.valid = {};
// fml.mask = {'phone':'(999) 999-9999'};
// fml.type = {
// 	'text': { type: 'text' },
// 	'textarea': { type: 'textarea' },
// 	'phone': { type: 'text' , mask:fml.mask.phone ,placeholder:'+1' },
// 	'email': { type: 'text' ,
// 		'post':'<i class="fa fa-envelope"></i>' ,
// 		'validate':{'valid_email':true }
// 	},
// 	'url': { "type":"text" ,
// 		"post":'<i class="fa fa-link"></i>' ,
// 		'validate':{'valid_url':true }
// 	}
// };
Formal.require = function(type){
	return {type:type, validate:{required:true}};
};

Formal.btn = {};
Formal.btn['save'] = {
	'label': "Save",
	'icon':'check',
	'id': 'submit',
	'modifier': 'success pull-right',
	'click': function() {
		if( this.save() ){
			this.destroy();
		}
	}
};
Formal.btn['cancel'] = {
	'label': "Cancel",
	'icon':'times',
	'id': 'close',
	'modifier':'white pull-left',
	'click': function() {
		this.destroy();
	}
};

function getUID() {
	return _.uniqueId();
	// var d = new Date().getTime();
	// var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	// 	var r = (d + Math.random()*16)%16 | 0;
	// 	d = Math.floor(d/16);
	// 	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	// });
	// return uuid;
}
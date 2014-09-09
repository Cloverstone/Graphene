//		BerryJS 0.9.0
//		(c) 2011-2014 Adam Smallcomb
//		Licensed under the MIT license.
//		For all details and documentation:
//		https://github.com/Cloverstone/Berry

/* *
* * *
 * *

change updates to pub/sub model 1/3

fix instance management - append form after removing old one

fieldset/target to parent
parent to parentfield

conditions to dependencies?
format instead of type,  type could mean bool/string/option?
detect bool, radio, select as defaults, use type:'auto'

make 'inline' selection better, use renderer?

improve backbone load from array

check on  haschildren throughout
closure
*/

Berry = function(options, obj) {
	this.destroy = function() {
		this.trigger('destroy');
		this.$el.empty();
		for(var i in this.fieldsets) {
			$('[name=' + this.fieldsets[i] + ']').empty();
		}
		this.fields = {};
		if(typeof this.renderer.destroy === 'function') {
			this.renderer.destroy();
		}
		this.each(this.fields, function() { if(typeof this.destroy === 'function') { this.destroy(); } });
		delete	Berry.instances[this.options.name];
		this.trigger('destroyed');
	};
	this.toJSON = function(search) {
		if(typeof search === 'string'){
			var splits = search.split('.');
			var target = this.source;
			for(var i in splits) {
				if(typeof target[splits[i]] !== 'undefined'){
					target = target[splits[i]];
				} else {
					return false;
				}
			}
			return target;
		} else {
			this.source = parsefields(this.fields , {});
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
	this.toArray = function() {
		var fields = [];
		for(var i in this.fields){
			fields.push(this.fields[i]);
		}
		return fields;
	};
	this.each = function(fields, toCall, args) {
		for(var i in fields) {
			var field = fields[i];
			if(field.item) {
				if(field.removed !== true && (field.parent === null || field.parent === undefined || (field.parent.removed !== true && field.parent.enabled !== false))){
					toCall.call(field, args);
				}
			} else if(!$.isEmptyObject(field.instances)) {
				this.each(field.instances, toCall, args);
			}
			if(!$.isEmptyObject(field.children)) {
				this.each(field.children,toCall , args);
			}
		}
	};
	this.processfields = function(fields,target,source,parent) {
		for(var i in fields) {
			if(typeof fields[i] === 'string'){
				fields[i] = { type : fields[i],label : i };
			}
			//if no name given and a name is needed, check for a given id else use the key
			if(typeof fields[i].name === 'undefined' && !fields[i].isContainer){
				if(typeof fields[i].id !== 'undefined') {
					fields[i].name = fields[i].id;
				} else {
					fields[i].name = i.toLowerCase().split(' ').join('_');
				}
			}
			if(typeof fields[i].label === 'undefined' && fields[i].label !== false) {
				fields[i].label = i;
			}
			if(fields[i].required){
				$.extend(fields[i],{validate:{required:true}});
			}
			this.processItem(fields[i], target, source, parent);
		}
	};
	//pub/sub service
	var addSub = function(topic,func){
			if (!self.events[topic]) {
				self.events[topic] = [];
			}
			var token = Berry.getUID();
			self.events[topic].push({
				token: token,
				func: func
			});
			return token;
	};
	this.on = function(topic, func) {
		var eventSplitter = /\s+/;
		if(eventSplitter.test(topic)){
			var list = topic.split(eventSplitter);
			for(t in list){
				addSub(list[t],func);
			}
		}else{
			addSub(topic,func);
		}
		return this;
	};
	this.off = function(token) {
		for (var m in this.events) {
			if (this.events[m]) {
				for (var i = 0, j = this.events[m].length; i < j; i++) {
					if (this.events[m][i].token === token) {
						this.events[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
	this.trigger = function(topic, args) {
		//alert(topic);
		if (this.events[topic]) {
			var t = this.events[topic],
				len = t ? t.length : 0;
			while (len--) {
				t[len].func.call(this, args, topic);
			}
		}
		return this;
	};

	this.processItem = function(item,target,source,parent,insert) {
		item = $.extend({},self.options.default,item);
		if(target[0] !== undefined){
				target = target[0];
		}
		if(source[(item.parseAs || item.name)] !== undefined) { item.value = source[(item.parseAs || item.name)]; }
		if(Berry.types[item.type] !== undefined) {
			var cSource = $.extend({} , source[(item.parseAs || item.name)]);
			if(typeof item.multiple !== 'undefined' && item.multiple && typeof source[(item.parseAs || item.name)] !== 'undefined'){
				if(item.toArray){ cSource = normalizeFieldsetSource(cSource,'uuid'); }
				for(var f in cSource) {
					initializeItem($.extend({},item),parent,target,cSource[f]);
				}
			}else{
				if(item.type == 'fieldset' && self.options.flatten) {
					initializeItem(item,parent,target,source,insert);
				} else {
					initializeItem(item,parent,target,cSource,insert);
				}
			}
		}
	};
	var parsefields = function(fields, source) {
		for(var i in fields){
			var field = fields[i];
			if(field.item){
				if(field.removed !== true && field.enabled !== false  && (field.parent === null || field.parent === undefined || (field.parent.removed !== true && field.parent.enabled !== false))){
					var temp = field.toJSON();
					if(field.item.value !== temp) {
						field.item.value = temp;
						self.changed = true;
					}
					var iAs = (field.item.parseAs || i);
					if(field.multiple) {
						source[iAs] = (source[iAs] || []);
						source[iAs].push(temp);
					} else {
						source[iAs] = temp;
					}
				}
			}else if(!$.isEmptyObject(field.instances)) {
				source[i] = parsefields(field.instances , []);
				if(field.toArray && !$.isEmptyObject(source[i])){source[i] = sourceToArray(source[i],'uuid');}
			}
			if(!$.isEmptyObject(field.children) && !self.options.flatten) {
				source[i] = parsefields(field.children,{});
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
	
	var addItem = function(item , parent, target, insert) {
		var current = new Berry.types[item.type](item, self);

		var exists = (self.fields[current.name] !== undefined);

		if(current.isContainer) {
			if(!exists) {
				self.fields[current.name] = { isContainer: true , multiple: current.multiple , hasChildren: !$.isEmptyObject(item.fields) , toArray: current.item.toArray , instances:[] };
			}
			self.fields[current.name].get = function() {
				var instances = [];
				for(var i in self.instances) {
					if(!self.instances[i].removed){
						instances.push(self.instances[i]);
					}
				}
				return instances;
			};

			var insertAt = self.fields[current.name].instances.length;
			var targetId = $(target).attr('id');
			for(var j in self.fields[current.name].instances){
				if(self.fields[current.name].instances[j].id == targetId){
					insertAt = parseInt(j,10) + 1;
					break;
				}
			}
			self.fields[current.name].instances.splice(insertAt,0,current);

			var index = 0;
			for(var k in self.fields[current.name].instances){
				if(!self.fields[current.name].instances[k].removed){
					self.fields[current.name].instances[k].instance_id = index++;
				}
			}
		}else{
			if(exists){
				if(self.fields[current.name].isContainer){
					if(!self.options.flatten){
						var temp = [];
						temp.push(self.fields[current.name]);
						temp = self.fields[current.name];
						self.fields[current.name] = {multiple:current.multiple,hasChildren:!$.isEmptyObject(item.fields),instances:[]};
						self.fields[current.name].instances.push(temp);
					}
				}else if(self.fields[current.name] instanceof Berry.field){
					var temp = [];
					temp.push(self.fields[current.name]);
					temp = self.fields[current.name];
					self.fields[current.name] = {instances:[]};
					self.fields[current.name].instances.push(temp);
				}
				self.fields[current.name].instances.push(current);
			}else{
				self.fields[current.name] = current;
			}
		}
			
		if(parent !== null && parent !== undefined){
			parent.children[current.name] = current;
		}
		current.parent = parent;
		return current;
	};
	var runUpdate = function() {
		var max = 5,iteration = 1;
		do{
			self.changed = false;
			self.toJSON();
			//self.each(this.fields, this.processValueItem);
			self.each(this.fields, this.processShowItem);
			self.each(this.fields, this.processDisabledItem);
			iteration++;
		}while(this.changed === true && iteration <= max);
	};
	var processShowItem = function() {
		var temp = !Berry.processConditions.call(this , (this.item.display || this.item.show));
		if(self.hidden !== temp){
			this.owner.changed = true;
			this.hidden = temp;
			this.self.toggle(!temp);
		}
	};
	// var processValueItem = function() {
	// 	if(typeof self.value === 'function') {
	// 		var temp = (self.value.call(this.owner) || '');
	// 		if(self.item.value !== temp.toString()){
	// 			self.owner.changed = true;
	// 			self.item.value = temp.toString();
	// 			self.update(this.item,true);
	// 		}
	// 	}
	// };
	var processDisabledItem = function() {
		var temp = Berry.processConditions.call(this , this.item.enable);
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

	var sourceToArray = function(source,identifier) {
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
	var normalizeFieldsetSource = function(source, identifier) {
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
	var initializeItem = function(field, parent, target, source, insert) {
		var current = addItem(field, parent, target, insert);
		if(current.fieldset === undefined){ current.fieldset = target; }
		current.source = (source || {});
		if(insert == 'before') {
		// 	$(current.fieldset).before(current.render());
		// }else if(insert == 'after') {
		// 	$(current.fieldset).after(current.render());
		// }else{
		// 	$(current.fieldset).append(current.render());
		// }
			$(target).before(current.render());
		}else if(insert == 'after') {
			$(target).after(current.render());
		}else{
			$(current.fieldset).append(current.render());
		}
		current.initialize();
	};
	var addActions = function(actions) {
		if(actions){
			if(!self.options.actionTarget) {
				self.options.actionTarget = $('<div class="berry-actions" style="overflow:hidden;padding-bottom:10px"></div>');
				self.target.append(self.options.actionTarget);
			}
			actions = containsKey(Berry.btn , actions);
			for(var action in actions) {
				var temp = $(Berry.render('berry__action',actions[action]));
					if(typeof actions[action].click === 'function'){
						temp.click($.proxy(actions[action].click,self));
					}
				self.options.actionTarget.append(temp);
			}
		}
	};


	var self = this;
	this.$el = obj;
	this.fieldsets = [];
	this.section_count = 0;
	this.sections = [];
	this.sectionList = [];
	this.options = $.extend(true , {
		name: Berry.getUID(),
		errorClass: 'has-error',
		errorTextClass: 'font-xs.text-danger',
		options: {inline: false},
		renderer: 'base',
		flatten: true,
		autoDestroy: false,
		default: {type: 'text'},
		actions: ['cancel' , 'save']
	} , options);

	this.events = $.extend({},Berry.prototype.events);
	this.source = this.options.attributes || {};
	this.changed = false;

	this.fields = {};
	this.trigger('initialize');

	if(typeof this.$el === 'undefined') { obj = $('<div/>'); }
	this.renderer = new Berry.renderers[this.options.renderer](this);
	this.target = this.renderer.render();

	if(this.options.legend && this.options.legendTarget){
		this.options.legendTarget.append(this.options.legend);
	}

	this.processfields(this.options.fields,this.target,this.source,null);
//	runUpdate();

	addActions(this.options.actions);
	if(typeof this.renderer.initialize === 'function') {
		this.renderer.initialize();
	}

	this.$el.find('.form-control:first').focus();
		//use each?
	// for(var j in this.fields) {
	// 	var item = this.fields[j];
	// 	if(item.item) {
	// 		if(item.removed !== true && (item.parent === null || item.parent === undefined || (item.parent.removed !== true && item.parent.enabled !== false))){
	// 			item.factory.focus.call(item);
	// 			break;
	// 		}
	// 	} else if(!$.isEmptyObject(item.instances)) {
	// 		this.each(item.instances, toCall, args);
	// 	}
	// }

	// if(typeof Berry.instances[this.options.name] !== 'undefined') {
	// 	Berry.instances[this.options.name].on('destroyed', $.proxy(function(){
	// 		Berry.instances[this.options.name] = this;
	// 	},this));
	// 	Berry.instances[this.options.name].destroy();
	// }else{
		Berry.instances[this.options.name] = this;
	//}
};
Berry.prototype.events = {initialize:[]};
Berries = Berry.instances = {};

Berry.field = function(item, owner){
		this.children = {};
		this.owner = owner;
		this.hidden = false;
		//this.owner = (this.owner.options.options || {});
		this.item = $.extend({},this.defaults,item);
    $.extend(this, this.item);
		if(item.value !== 0){
			if(typeof item.value === 'function') {
				this.valueFunc = item.value;
				this.liveValue = function() {
					return this.valueFunc.call(this.owner.toJSON());
				};
				item.value = this.item.value = this.liveValue();
				this.owner.on('change',$.proxy(function(){
					this.set(this.liveValue());
				},this));
			} else {
				this.value = (item.value || this.value || item.default || '');
			}
		} else {
			this.value = 0;
		}

		this.lastSaved = this.liveValue();
		this.id = (item.id || Berry.getUID());//?
		this.self = undefined;
		this.fieldset = undefined;
		if(this.item.fieldset !== undefined && $('[name='+this.item.fieldset+']').length > 0){
			this.owner.fieldsets.push(this.item.fieldset);
			this.fieldset = $('[name=' + this.item.fieldset + ']')[0];
		}

    //this.initialize.apply(this, arguments);

};

$.extend(Berry.field.prototype, {
	type: 'text',
	version: '1.0',
	isContainer: false,
	defaults: {},
	set: function(value){
		if(this.value !== value){
			this.value = value;
			this.setValue(this.value);
			this.trigger('changed');
		}
	},
	revert: function(){
		this.value = this.lastSaved;
		this.item.value = this.lastSaved;
		this.setValue(this.value);
	},
	hasChildren: function() {return !$.isEmptyObject(this.children);},
	create: function(source) {return Berry.render('berry_' + (this.elType || this.type), this);},
	render: function() {
		if(typeof this.self === 'undefined'){
			this.self = $(this.create()).attr('data-Berry',this.owner.options.name);
		}else{
			this.self.html($(this.create()).html());
		}
		this.display = this.getDisplay();
		return this.self;
	},
	getValue: function() { return this.$el.val(); },
	toJSON: function() {
		this.value = this.getValue();
		this.lastSaved = this.value;
		this.display = this.getDisplay();
		return this.lastSaved;
	},
	liveValue: function(){
		return this.value;
	},
	setup: function() {
		this.$el = this.self.find('input');
		this.$el.off();
		if(this.onchange !== undefined){ this.$el.on('input',this.onchange);}
		this.$el.on('input',$.proxy(function(){this.trigger('change');},this));

		if(this.item.mask && $.fn.mask){
			this.$el.mask(this.item.mask);
		}
	},
	initialize: function() {
		if(this.multiple && this.multiple.duplicate){
			this.self.find('.duplicate').click( $.proxy(this.dupeMe, this) );
			this.self.find('.remove').click( $.proxy(this.dropMe, this) );
		}
		this.setup();
	},
	trigger: function(topic) {
		this.value = this.getValue();
		this.owner.trigger(topic, {
			type:this.type,
			name:this.name,
			value:this.value
		});
	},

	setValue: function(value) {
		return this.$el.val(value);
	},
	update: function(item,silent) {
		$.extend(this.item,item);
		this.value = (item.value || this.value);
		this.setValue(this.value);
		if(!silent){
			this.trigger('change');
			this.trigger('change:' + this.name);
		}
	},
	blur: function() {
		this.$el.blur();
	},
	focus: function() {
		this.$el.focus().val('').val(this.value);
	},
	displayAs: function() {
		return this.lastSaved;
	},
	getDisplay: function() {
		if(this.displayAs !== undefined) {
			if(this.item.template !== undefined) {
				this.display = this.displayAs();
				return ich[this.item.template](this)[0];
			} else {
				return this.displayAs();
			}
		}else{
			if(this.item.template !== undefined) {
				return ich[this.item.template](this)[0];
			} else {
				return this.lastSaved;
			}
		}
	},
	destroy: function() { this.$el.off(); },
	dupeMe: function() {
		var target = this.self;
		var max = this.max || -1;
		var count = $(target).siblings('[name='+this.name+']').length;
		if(max == -1 || max > count){
			var item = $.extend({},this.item,{id:Berry.getUID(),name:this.name});
			this.owner.processItem(item, $(target), {}, this.parent, 'after');
			this.trigger('change');
		}
	},
	dropMe: function() {
		var target = this.self;
		var min = this.min || 1;
		var count = $(target).siblings('[name='+this.name+']').length;
		if(min <= count){
			$(target).empty().remove();
			this.removed = true;
			var index=0;
			for(var j in this.owner.fields[this.name].instances){
				if(!this.owner.fields[this.name].instances[j].removed){
					this.owner.fields[this.name].instances[j].instance_id = index++;
				}
			}
			this.trigger('change');
		}
	}
});

Berry.field.extend = function(protoProps) {
	var parent = this;
	var child = function(){ return parent.apply(this, arguments); };

	var Surrogate = function(){ this.constructor = child; };
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;

	if (protoProps) $.extend(child.prototype, protoProps);

	return child;
};

Berry.types = {};
Berry.register = function(elem) {
	Berry.types[elem.type] = Berry.field.extend(elem);
	//return Berry.types[elem.type];
};

Berry.register({
	type: 'fieldset',
	getValue: function() { return null;},
	create: function() {
		this.name = this.name || Berry.getUID();
		this.owner.fieldsets.push(this.name);
		++this.owner.section_count;
		this.owner.sections.push(this);
		this.owner.sectionList.push({'index': this.owner.section_count, 'text': this.item.legend, state: 'disabled', completed: false, active: false, error: false});
		
		var fieldset = this.owner.renderer.fieldset(this);
		return fieldset;
	},
	setup: function() {
		if(this.fields !== undefined){
			this.owner.processfields(this.fields, this.self, this.source, this);
		}
	},
	isContainer: true
});

Berry.processConditions = function(conditions) {
	if (typeof conditions === 'string') {
		if(conditions === 'show' || conditions === 'display') {
			conditions = (this.item.display || this.item.show);
		}else if(conditions === 'enable') {
			conditions = this.item.enable;
		}
	}
	if (typeof conditions === 'bool') {
		return conditions();
	}
	if (typeof conditions === 'object') {
		for(var c in conditions){
			if(!Berry.conditions[conditions[c].type].call(this,this.owner,conditions[c].args)) {
				return false;
			}
		}
	}
	return true;
};
Berry.conditions = {
	requires: function(Berry,args) {
		var value = Berry.source[args.name];
		return (value !== null && value !== '');
	},
	requiresallprevious: function(Berry,args) {},
	not_matches: function(Berry , args) {
		if(Berry.source[args.name] != args.match){
			return true;
		}else{
			return false;
		}
	},
	matches: function(Berry,args) {
		if(Berry.source[args.name] == args.match){
			return true;
		}else{
			if(Berry.source[this.parent.name][this.parent.instance_id][args.name] == args.match){
				return true;
			}else{
				return false;
			}
		}
	},
	hasclass: function(Berry,args) {
		if($(args.selector).hasClass(args.match)){
			return true;
		}else{
			return false;
		}
	}
};

$((function($){
	$.fn.berry = function(options) {
		return new Berry(options, this);
	};
})(jQuery));

Berry.render = function(name , data) {
	return (ich[name] || ich['berry_text'])(data);
};
Berry.renderers = {
	base: function(owner) {
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
			return Berry.render('berry_' + this.owner.options.renderer + '_fieldset',data);
		};
		this.destroy = function() {
			$(this.owner.$el).off();
			this.owner.$el.empty();
		};
		this.render = function() {
			this.owner.$el.html(Berry.render('berry_' + this.owner.options.renderer + '_form' , this.owner.options));
			return this.owner.$el.find('form');
		};
	}
};
Berry.processOpts = function(item) {
	/*
	If a function is defined for choices use that.
	*/
	if(typeof item.choices === 'function'){
		return item.choices.call(this);
	}
	/* 
	If max is set on the item, assume a number set is desired. 
	min defaults to 0 and the step defualts to 1.
	*/
	if(typeof item.max !== 'undefined'){
		item.min = (item.min || 0);
		item.step = (item.step || 1);
		item.choices = (item.choices || []);
		if(item.min <= item.max) {
			var i = item.min;
			while(i <= item.max){
				item.choices.push(i.toString());
				i += item.step;
			}
		}
	}
	if(typeof item.choices !== 'undefined' && item.choices.length > 0){
		item.options = $.map(item.choices, function(value, index) {
			return [value];
		});
	}
	if(typeof item.options !== 'undefined' && item.options.length > 0){
		for ( var o in item.options ) {
			var cOpt = item.options[o];
			if(typeof cOpt === 'string' || typeof cOpt === 'number') {
				cOpt = {label: cOpt};
				if(item.useName) {
					cOpt.value = cOpt.label;
				}
			}
			item.options[o] = $.extend({label: cOpt.name, value: o},{label: cOpt.title,value: cOpt.id},cOpt);
			item.options[o].selected = (item.options[o].value == item.value);
		}
	}
	return item;
};

Berry.btn = {
	save: {
		label: 'Save',
		icon:'check',
		id: 'submit',
		modifier: 'success pull-right',
		click: function() {
			if(this.options.autoDestroy){
				this.on('saved', this.destroy);
			}
			this.save();
		}
	},
	cancel: {
		label: 'Cancel',
		icon:'times',
		id: 'close',
		modifier:'white pull-left',
		click: function() {
			if(this.options.autoDestroy){this.destroy();}
			this.trigger('cancel');
		}
	}
};
Berry.counter = 0;
Berry.getUID = function() {
	return 'f' + (Berry.counter++);
	//return _.uniqueId('f');//.toString();
	// var d = new Date().getTime();
	// var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	// 	var r = (d + Math.random()*16)%16 | 0;
	// 	d = Math.floor(d/16);
	// 	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	// });
	// return uuid;
}

Berry.prototype.sum = function(search) {
	var inputs = this.toJSON(search);
	var val = 0;
	if(typeof inputs === 'object'){
		for(var i in inputs){
			val += (parseInt(inputs[i] , 10) || 0);
		}
		return val;
	}
	return inputs;
};
Formal.register({
	type: "select",

	create: function(){
		return Formal.render("formal_select",Formal.processOpts(this.item));
	},

	callback: function(){
		this.$el = $(this.fieldset).find('select[name='+this.name+']');
		if(this.onchange !== undefined){
			this.$el.change(this.onchange);
		}
		this.$el.change($.proxy(function(){this.publish('change');},this));
	},

	parse: function(){
		return this.$el.children('option:selected').attr('value');
	}
});

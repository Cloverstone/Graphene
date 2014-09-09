Formal.register({type:"checkbox",truestate:"true",falsestate:"false"});

Formal.types.checkbox.create = function(){
  if(this.value === true || this.value === "true" || this.value == "on" || this.value == this.item.truestate){
    this.selected = true;
  }
  return Mustache.render(get_template("checkbox_form"),this.item);
};

Formal.types.checkbox.callback = function(item,form){
  if(this.onchange !== undefined){
    $(this.fieldeset).find('[type=checkbox][name='+this.name+']').change(this.onchange);
  }
  $(this.fieldset).find('[type=checkbox][name='+this.name+']').change($.proxy(this.publish,this));
};
Formal.types.checkbox.parse = function(container){
  return container.is(':checked');
};

Formal.register({type:"displayText",version:"2.0"});

//Form.types.text.create = function(item,options){return Mustache.render(get_template("text_form"),item);}

Formal.types.displayText.callback = function(){
  $(this.fieldset).find('[type=text][name='+this.name+']').off();
  if(this.onchange !== undefined){
    $(this.fieldset).find('[type=text][name='+this.name+']').on("input",this.onchange);
  }
  $(this.fieldset).find('[type=text][name='+this.name+']').on("input",$.proxy(this.publish,this));
  if(this.item.mask){
    this.self.find('[type='+this.type+']').mask(this.item.mask);
  }
};

Formal.types.displayText.disable = function(container){
  container.find('[type='+this.type+']').attr("disabled","disabled");
};
Formal.types.displayText.parse = function(container){
  var elem = container.find('[type='+this.type+']');
  return elem.val();
};
Formal.register({type:"password"});
/*Form.types.password.create = function(item,options){
  return Mustache.render(get_template("pw_form"),item);
};*/
Formal.types.password.callback = function(item,form){
  if(item.onchange !== undefined){
    $('[type=password][name='+item.name+']').die();
    $('[type=password][name='+item.name+']').live("input",item.onchange);
  }
};
Formal.types.password.parse = function(container){
  var elem = container.find('[type=password]');
  return elem.val();
};


// Formal.register({
// 	type:"password",
// 	initialize: function(item,form){
// 		this.$el = this.self.find('[type=password]');
// 		this.$el.off();
// 		if(this.onchange !== undefined){
// 			this.$el.on("input",this.onchange);
// 		}
// 		this.$el.on("input",$.proxy(this.publish,this));
// 	}
// });
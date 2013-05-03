var text = new Form.register({type:"text"});
text.create = function(item){
  var placeholder = "";
  if(item.placeholder != undefined){
    placeholder = ' placeholder="'+item.placeholder+'"'; 
  }
  return '<div data-type="text" class="formitem text" name="'+item.name+'"><label for="'+item.name+'">'+item.label+':</label><input'+placeholder+' type="text"  name="'+item.name+'" value="'+item.value+'" /></div>';
}
text.callback = function(item,form){
  if(item.onchange != undefined){
    $('[type=text][name='+item.name+']').die();
    $('[type=text][name='+item.name+']').live("input",item.onchange);
  }
}
text.parse = function(container){
  var elem = container.children('[type=text]');
  return elem.val();
}

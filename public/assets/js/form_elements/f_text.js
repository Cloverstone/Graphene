var text = new Form.register({type:"text"});
text.create = function(item,options){
  var placeholder = "";
  if(item.placeholder != undefined){
    placeholder = ' placeholder="'+item.placeholder+'"'; 
  }
  var label = item.label;
  if(item.label.length >0){label+=":";}
   
if(!options.inline){
  return  [
    '<div data-type="text" class="formitem text" name="'+item.name+'">',
      '<label for="'+item.name+'">'+label+'</label>',
      '<input'+placeholder+' type="text"  name="'+item.name+'" value="'+htmlEscape(item.value)+'" />',
    '</div>'
   ].join('');
}else{
  return  [
    '<div data-type="text" class="formitem text" name="'+item.name+'">',
      '<div class="control-group">',
        '<label class="control-label" for="'+item.name+'">'+label+'</label>',
        '<div class="controls">',
          '<input'+placeholder+' type="text"  name="'+item.name+'" value="'+htmlEscape(item.value)+'" />',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
}
//  return '<div data-type="text" class="formitem text" name="'+item.name+'"><label for="'+item.name+'">'+item.label+':</label><input'+placeholder+' type="text"  name="'+item.name+'" value="'+item.value+'" /></div>';

}
text.callback = function(item,form){
  if(item.onchange != undefined){
    $('[type=text][name='+item.name+']').die();
    $('[type=text][name='+item.name+']').live("input",item.onchange);
  }
}
text.parse = function(container){
  var elem = container.find('[type=text]');
  return elem.val();
}

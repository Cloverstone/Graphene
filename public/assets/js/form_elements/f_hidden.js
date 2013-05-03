var hidden = new Form.register({type:"hidden"});
hidden.create = function(item,options){
   
if(!options.inline){
  return  [
    '<div data-type="hidden" class="formitem hidden" name="'+item.name+'">',
      '<input type="hidden"  name="'+item.name+'" value="'+item.value+'" />',
    '</div>'
   ].join('');
}else{
  return  [
    '<div data-type="hidden" class="formitem hidden" name="'+item.name+'">',
          '<input type="hidden"  name="'+item.name+'" value="'+item.value+'" />',
    '</div>'
   ].join('');
}

}
hidden.callback = function(item,form){
}
hidden.parse = function(container){
  var elem = container.find('[type=hidden]');
  return elem.val();
}

var date = new Form.register({type:"date"});
date.create = function(item,options){
  var placeholder = "";
  if(item.placeholder != undefined){
    placeholder = ' placeholder="'+item.placeholder+'"'; 
  }
  var label = item.label;
  if(item.label.length >0){label+=":";}
if(typeof item.value === 'number'){
  d = new Date(item.value*1000);
  item.value = d.toDateString();
}else{
  //item.value = Date.parse(item.value);
}
if(!options.inline){
  return  [
    '<div data-type="date" class="formitem date" name="'+item.name+'">',
      '<label for="'+item.name+'">'+label+'</label>',
      '<input'+placeholder+' type="date"  name="'+item.name+'" value="'+item.value+'" />',
    '</div>'
   ].join('');
}else{
  return  [
    '<div data-type="date" class="formitem date" name="'+item.name+'">',
      '<div class="control-group">',
        '<label class="control-label" for="'+item.name+'">'+label+'</label>',
        '<div class="controls">',
          '<input'+placeholder+' type="date"  name="'+item.name+'" value="'+item.value+'" />',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
}
//  return '<div data-type="date" class="formitem date" name="'+item.name+'"><label for="'+item.name+'">'+item.label+':</label><input'+placeholder+' type="date"  name="'+item.name+'" value="'+item.value+'" /></div>';

}
date.callback = function(item,form){
  if(item.onchange != undefined){
    $('[type=date][name='+item.name+']').die();
    $('[type=date][name='+item.name+']').live("input",item.onchange);
  }
  $("[type=date]").dateinput();$(":input[placeholder]").placeholder();
}
date.parse = function(container){
  var elem = container.find('[name=date]');

  d = new Date.parse(elem.val())
  return (d/1000);
}

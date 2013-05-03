var checkbox = new Form.register({type:"checkbox"});

checkbox.create = function(item,options){
//  selection = '<input type="checkbox" name="'+item.name+'" class="themed-input"';
selection = '';
      if(item.value == true){
//        if(i == item.value){selection += " checked";}
        selection += " checked";
      }
//      selection += ">";

  var label = item.label;
//  if(!options.inline){
/*  if(true){
    return '<div data-type="checkbox" class="formitem checkbox" name="'+item.name+'"><label class="checkbox">'+selection+label+'</label></div></div>';
  }else{
    return '<div data-type="checkbox" class="formitem checkbox" name="'+item.name+'"><div class="control-group"><div class="controls"><label class="checkbox">'+selection+label+'</label></div></div></div>';
  }*/

  return [
    '<div class="control-group">',
    '<div class="controls">',
      '<label class="checkbox" name="'+item.name+'">',
        '<input '+selection+' class="input-block-level" name="" type="checkbox"> '+label,
      '</label>',
    '</div>',
  '</div>'

   ].join('');


}

checkbox.update = function(item,options){
  $("name="+item.name+"]").replace(checkbox.create(item,options));
}
checkbox.callback = function(item,form){
  if(item.onchange != undefined){
    $('[name='+item.name+'] [type=checkbox]').change(item.onchange);
  }
}
checkbox.parse = function(container){
//  var elem = container.find('[type=checkbox]');
//  return elem.children('option:selected').attr('value');
//alert( container.children('[type=checkbox]').val());
return container.children('[type=checkbox]').is(':checked');
}

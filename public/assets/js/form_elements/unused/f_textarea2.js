var textarea = new Form.register({type:"textarea"});

textarea.create = function(item){
  return '<div data-type="textarea" class="formitem textarea"><div class="sc-hr"><div>'+item.label+'</div></div><textarea class="adminInput" name="'+item.name+'">'+item.value+'</textarea></div>';
}
textarea.parse = function(container){
  var elem = container.find('textarea');
  returnObj[elem.attr("name")] = elem.val();
}
textarea.callback = function(item,form){
  if(item.onchange != undefined){
    $('textarea[name='+item.name+']').die();
    $('textarea[name='+item.name+']').live("input",item.onchange);
  }
}

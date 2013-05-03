var textarea = new Form.register({type:"textarea"});

textarea.create = function(item){
  return '<div data-type="textarea" class="formitem textarea" name="'+item.name+'"><div class="sc-hr"><div>'+item.label+'</div></div><textarea class="adminInput" name="'+item.name+'">'+item.value+'</textarea></div>';
}

textarea.callback = function(item,form){
  if(item.onchange != undefined){
    $('textarea[name='+item.name+']').live("input",item.onchange);
  }
  if(item.callback != undefined){
    item.callback();
  }
}

textarea.parse = function(container){
  var elem = container.find('textarea');
  return elem.val();
}


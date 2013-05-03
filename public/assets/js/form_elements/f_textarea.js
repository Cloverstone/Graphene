var textarea = new Form.register({type:"textarea"});

textarea.create = function(item){
var label = item.label+':';
if(label == ':'){label = "";}
 // return '<div data-type="textarea" class="formitem textarea" name="'+item.name+'"><div class="sc-hr"><div>'+label+'</div></div><textarea class="adminInput" name="'+item.name+'">'+htmlEscape(item.value)+'</textarea></div>';
  return '<div data-type="textarea" class="control-group formitem textarea" name="'+item.name+'" ><label class="control-label" for="'+item.name+'">'+item.label+'</label><div class="controls"><textarea id="'+item.name+'" name="'+item.name+'" placeholder="'+(item.placeholder||"")+'">'+htmlEscape(item.value)+'</textarea></div></div>';
}

textarea.callback = function(item,form){
  if(item.onchange != undefined){
    $('textarea[name='+item.name+']').die();
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


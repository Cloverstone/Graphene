var check = new form_elem({type:"check"});

check.create = function(item){
  var checked = "";
  if(item.value == true){checked = 'checked="checked"';}
  return '<div data-type="check" class="formitem check"><span></span><INPUT class="adminInput" type="checkbox" name="'+item.name+'" '+checked+'><label for="'+item.name+'">'+item.label+'</label></div>';
}

check.value = function(item){
  return  $(item).val();
}


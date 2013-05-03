var advancedtextarea = new form_elem({type:"advancedtextarea"});

advancedtextarea.create = function(item){
  return '<div data-type="advancedtextarea" class="formitem advancedtextarea"><textarea class="" name="'+item.name+'">'+item.value+'</textarea></div>';
}
advancedtextarea.value = function(item){
  return  $(item).val();
}


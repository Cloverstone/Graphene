var readonlytext = new form_elem({type:"readonlytext"});

readonlytext.create = function(item){
  return '<div data-type="readonlytext" class="formitem readonlytext"><div class="readonlytext"><label for="'+item.name+'">'+item.label+':</label><INPUT class="adminInput" type="text" name="'+item.name+'" value="'+item.value+'" readonly="readonly" /></div></div>';
}
readonlytext.value = function(item){
  return  $(item).val();
}


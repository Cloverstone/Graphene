var hidden = new form_elem({type:"hidden"});

hidden.create = function(item){
  return '<input data-type="hidden" class="formitem hidden" type="hidden" name="'+item.name+'" value="'+item.value+'">';
}
hidden.value = function(item){
  return  $(item).val();
}


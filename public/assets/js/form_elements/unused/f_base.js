var raw = new form_elem({type:"raw"});

raw.create = function(item){
  return '<div data-type="raw" class="formitem raw"></div>';
}
raw.value = function(item){
  return  $(item).val();
}


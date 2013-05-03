var raw = new form_elem({type:"raw"});

raw.create = function(item){
  return item.value;
}
raw.value = function(item){
  return  $(item).val();
}


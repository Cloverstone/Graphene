var divider = new form_elem({type:"divider"});

divider.create = function(item){
  return '<div data-type="divider" class="formitem divider"><div class="sc-hr"><div>'+item.label+'</div></div></div>';
}
divider.value = function(item){
  return  $(item).val();
}


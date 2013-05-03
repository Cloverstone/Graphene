var linkbutton = new form_elem({type:"linkbutton"});

linkbutton.create = function(item){
var bclass = " btn-primary";
if(item.bclass != undefined){
bclass = " btn-"+item.bclass;
}
  $('#sc-admin-modal-bottom').append('<a data-form="sc-admin-modal" class="btn'+bclass+' pull-right" href="'+item.value+'">'+item.label+'</a>');

  return "";
}
linkbutton.value = function(item){
  return  $(item).val();
}


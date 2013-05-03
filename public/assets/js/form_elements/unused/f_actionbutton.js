var actionbutton = new form_elem({type:"actionbutton"});

actionbutton.create = function(item){
var bclass = " btn-primary";
if(item.bclass != undefined){
bclass = " btn-"+item.bclass;
}
  $('#sc-admin-modal-bottom').append('<div data-action="'+item.value+'" class="btn'+bclass+' pull-right">'+item.label+'</div>');
  return "";

}
actionbutton.value = function(item){
  return  $(item).val();
}


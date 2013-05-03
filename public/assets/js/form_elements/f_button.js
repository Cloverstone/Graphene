var button = new Form.register({type:"button"});

button.create = function(item){
  return '<div data-type="button" class="formitem button" name="'+item.name+'"><div class="btn btn-'+item.value+'" style="margin:5px 0px">'+item.label+'</div></div>';
}

button.callback = function(item,form){
  if(item.onclick != undefined){
    $('[name='+item.name+'] .btn').click(item.onclick);
  }
}

button.parse = function(container){
  //  var elem = container.find('textarea');
  //  return elem.val();
}


var select = new Form.register({type:"select"});

select.create = function(item,options){
  selection = '<select name="'+item.name+'" class="themed-input">';
  for ( var i in item.choices ){
    if(i!= null){
      selection += "<option";
      if(item.choices[i].value != undefined){
        if(item.choices[i].value == item.value){selection += " selected=selected";}
        selection += " value='"+item.choices[i].value+"' >"+item.choices[i].name+"</option>";
      }else{
        if(i == item.value){selection += " selected=selected";}
        selection += " value='"+i+"' >"+item.choices[i]+"</option>";
      }
    }   
  }
  selection += '</select>';
  var label = item.label;
  if(item.label.length >0){label+=":";}
  if(!options.inline){
    return '<div data-type="select" class="formitem select" name="'+item.name+'"><label for="'+item.name+'">'+label+'</label>'+selection+'</div></div>';
  }else{
    return '<div data-type="select" class="formitem select" name="'+item.name+'"><div class="control-group"><label class="control-label" for="'+item.name+'">'+label+'</label><div class="controls">'+selection+'</div></div></div>';
  }
}
select.update = function(item,options){
  $("name="+item.name+"]").replace(select.create(item,options));
}
select.callback = function(item,form){
  if(item.onchange != undefined){
    $('select[name='+item.name+']').change(item.onchange);
  }
}
select.parse = function(container){
  var elem = container.find('select');
  return elem.children('option:selected').attr('value');
}

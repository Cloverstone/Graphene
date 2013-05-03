var select = new Form.register({type:"select"});

select.create = function(item){
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
  return '<div data-type="select" class="formitem select" name="'+item.name+'"><label for="'+item.name+'">'+item.label+':</label>'+selection+'</div></div>';
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

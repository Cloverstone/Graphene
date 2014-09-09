//needs template conversion
var radio = new Form.register({type:"radio"});

radio.create = function(item,options){

  selection = '';

  for ( var i in item.choices ){
    if(i !== null){
      selection += "<option";
      if(item.choices[i].value !== undefined){
        if(item.choices[i].value == item.value){selection += " selected=selected";}
        selection += " value='"+item.choices[i].value+"' >"+item.choices[i].name+"</option>";
        selection = '<input type="radio" name="'+item.name+'" class="themed-input"';
      }else{
        if(i == item.value){selection += " selected=selected";}
        selection += " value='"+i+"' >"+item.choices[i]+"</option>";
      }
    }
  }

  if(item.value == true){
    if(i == item.value){selection += " checked";}
  }
  selection += ">";

  var label = item.label;
//  if(item.label.length >0){label+=":";}
  if(!options.inline){
    return '<div data-type="radio" class="formitem radio" name="'+item.name+'"><label class="radio">'+selection+label+'</label></div></div>';
  }else{
    return '<div data-type="radio" class="formitem radio" name="'+item.name+'"><div class="control-group"><div class="controls"><label class="radio">'+selection+label+'</label></div></div></div>';
  }
};
radio.update = function(item,options){
  $("name="+item.name+"]").replace(radio.create(item,options));
};
radio.callback = function(item,form){
  if(item.onchange !== undefined){
    $('[type=radio][name='+item.name+']').change(item.onchange);
  }
};
radio.parse = function(container){
  var elem = container.find('[type=radio]');
  return elem.children('option:selected').attr('value');
};
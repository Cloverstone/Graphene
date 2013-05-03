var media = new form_elem({type:"media"});

media.create = function(item){
  return '<div data-type="media" class="formitem media"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'" name="'+item.name+'" value="'+item.value+'"></div></div></div>';
}
media.value = function(item){
  return  $(item).val();
}
media.callback = function(item,form){
  selected = item.value;                               
  istext = false;

  if(isNaN(selected)){ istext = true; }
  if(istext == null){istext = "0";}
  url ="/admin/media/images/picker?api&target="+item.name;
  if(item.client_id != undefined){
    url = url+"&special="+item.client_id;
  }
	
  $.getJSON(url,function(data){
    data = data.data
    selection = '<select name="'+data.target+'" class="themed-input">';
    for ( var i in data.option ){
      selection += "<option";
      if(istext == "1"){
        if(data.option[i].name == selected){selection += " selected=selected";}
      }else{
        if(data.option[i].id == selected){selection += " selected=selected";}
      }
         selection += " value='"+data.option[i].id+"' class='media-option'>"+data.option[i].name+"</option>";
    }
    selection += '</select>';
    $(form).find('[name='+data.target+']').html(selection);
    $('select[name='+data.target+']').selectmenu(
      {appendTo: form,icons: [{find: '.media-option'}],
        bgImage: function() {
          return 'url(http://'+CONTENT_LOCATION+'/upload/images/' + $(this).attr("value") + '-icon.jpg)';
        }
    });
  });
}


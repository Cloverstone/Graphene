var pages = new form_elem({type:"pages"});
pages.create = function(item){
  return '<div data-type="pages" class="formitem pages"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'"  name="'+item.name+'" value="'+item.value+'"></div></div></div>';
}
pages.value = function(item){
  return  $(item).val();
}

pages.callback = function(item,form){
  var selectedpage = item.value;
  var istext = false;

  if(isNaN(selectedpage)){ istext = true; }
  if(istext == null){istext = "0";}
  url = "/admin/content/pages/picker?api&target="+item.name;
  $.getJSON(url,function(data){
    data = data.data;
    selection = '<select name="'+data.target+'" class="themed-input">';
    for ( var i in data.option ){
      selection += "<option";
      if(istext == "1"){
        if(data.option[i].name == selectedpage){selection += " selected=selected";}
      }else{
        if(data.option[i].id == selectedpage){selection += " selected=selected";}
      }
      selection += " value='"+data.option[i].id+"' title='"+data.option[i].picture_id+"' class='pages-option'>"+data.option[i].name+"</option>";
    }
    selection += '</select>';
    $(form).find('[name='+data.target+']').html(selection);
    $('select[name='+data.target+']').selectmenu({appendTo: form});
      
  });
}

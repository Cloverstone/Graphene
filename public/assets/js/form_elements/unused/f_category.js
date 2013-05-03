var category = new form_elem({type:"category"});

category.create = function(item){


          selected = item.value;
//          url ="?ajax=calendarAdmin&req=picker&target="+item.name;
            selection = '<select name="'+item.name+'" class="">';
            for ( var i in pickerdata.categories ){
              selection += "<option";
              if(i == selected){selection += " selected=selected"}

              selection += " class='cat_choice_"+pickerdata.categories[i].id+"'";
              selection += " value='"+pickerdata.categories[i].id+"'>"+pickerdata.categories[i].name+"</option>";
            }
            selection += '</select>';
//            formInputs.find('[name='+item.name+']').html(selection);

  return '<div data-type="category" class="formitem category"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'" name="'+item.name+'" value="'+item.value+'">'+selection+'</div></div></div>';
}
category.value = function(item){
  return  $(item).val();
}


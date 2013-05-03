var menu = new form_elem({type:"menu"});

menu.create = function(item){

          selected = item.value;
          istext = false;

          if(isNaN(selected)){ istext = true; }
          if(istext == null){istext = "0";}
//          url ="?ajax=churchAdmin&req=picker&target="+item.name;

            selection = '<select name="'+item.name+'" class="adminInput">';
            for ( var i in pickerdata.menuitems ){
              selection += "<option";
              if(istext == "1"){
                if(pickerdata.menuitems[i].name == selected){selection += " selected=selected";}
              }else{
                if(pickerdata.menuitems[i].id == selected){selection += " selected=selected";}
              }
              selection += " value='"+pickerdata.menuitems[i].id+"'>"+pickerdata.menuitems[i].name+"</option>";
            }
            selection += '</select>';

//            formInputs.find('[name='+item.name+']').html(selection);



  return '<div data-type="menu" class="formitem menu"> <div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'" name="'+item.name+'" value="'+item.value+'">'+selection+'</div></div></div>';
}
menu.value = function(item){
  return  $(item).val();
}


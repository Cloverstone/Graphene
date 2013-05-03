var date = new form_elem({type:"date"});

date.create = function(item){
          var fd = null;
          if(item.value != undefined){
            fd = new Date(item.value * 1000 );
          }else{
            fd = new Date();
          }
          var month = fd.getMonth();
          var day = fd.getDate();
          var year = fd.getFullYear();

          var fieldName = item.name+'_';
          var selects = "";   
          selection = '<select name="'+fieldName+'month">';
          for (i=0;i<=11;i++){
            selection += "<option";
            if(i == month){selection += " selected=selected"}
            selection += " value='"+i+"'>"+monthNames[i]+"</option>";
          }
          selects = selection + '</select>';

          selection = '<select name="'+fieldName+'day">';
          for (i=1;i<=31;i++){
            selection += "<option";
            if(i == day){selection += " selected=selected"}
            selection += " value='"+i+"'>"+i+"</option>";
          }
          selects += selection + '</select>';


          selection = '<select name="'+fieldName+'year">';
          for (i=2020;i>=1920;i--){
            selection += "<option";
            if(i == year){selection += " selected=selected"}
            selection += " value='"+i+"'>"+i+"</option>";
          }
          selects += selection + '</select>';


  return '<div data-type="date" class="formitem date"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'" name="'+item.name+'"  value="'+item.value+'">'+selects+'</div></div></div>';
}
date.value = function(item){
  return  $(item).val();
}


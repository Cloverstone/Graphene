var week_day = new form_elem({type:"week_day"});

week_day.create = function(item){
var temp = [];
          if(item.value != ""){
//            $('#'+item.value).attr("selected","selected");
            $('#'+item.value).attr("selected","selected");
          temp[item.value] = "selected='selected'";
          }


  $return = '<div data-type="week_day" class="formitem week_day"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'"  name="'+item.name+'" value="'+item.value+'"><select name="'+item.name+'" class="adminInput">';
  $return += '<option '+temp["Sun"]+' value="Sun">Sundays</option>';
  $return += '<option '+temp["Mon"]+' value="Mon">Mondays</option>';
  $return += '<option '+temp["Tue"]+' value="Tue">Tuesdays</option>';
  $return += '<option '+temp["Wed"]+' value="Wed">Wednesdays</option>';
  $return += '<option '+temp["Thur"]+' value="Thur">Thursdays</option>';
  $return += '<option '+temp["Fri"]+' value="Fri">Fridays</option>';
  $return += '<option '+temp["Sat"]+' value="Sat">Saturdays</option>';
  $return += '</select></div></div></div>';
return $return;
}

week_day.value = function(item){
  return  $(item).val();
}


var people = new form_elem({type:"people"});

people.create = function(item){
  return '<div data-type="people" class="formitem people"><div class="'+item.type+'-picker"><label>'+item.label+':</label><div rel="picker" type="'+item.type+'" name="'+item.name+'"  value="'+item.value+'"></div></div></div>';
}
people.value = function(item){
  return  $(item).val();
}
people.callback = function(item,form){

          selectedperson = item.value;
          istext = false;

          if(isNaN(selectedperson)){ istext = true; }
          if(istext == null){istext = "0";}
          url = "/admin/people/people/picker?api&target="+item.name;
          $.getJSON(url,function(data){
            data = data.data;
            selection = '<select name="'+data.target+'" class="themed-input">';
            for ( var i in data.option ){
              selection += "<option";
              if(istext == "1"){
                if(data.option[i].name == selectedperson){selection += " selected=selected";}
              }else{
                if(data.option[i].id == selectedperson){selection += " selected=selected";}
              }
              selection += " value='"+data.option[i].id+"' title='"+data.option[i].picture_id+"' class='media-option'>"+data.option[i].name+"</option>";
            }
            selection += '</select>';
            $(form).find('[name='+data.target+']').html(selection);
            $('select[name='+data.target+']').selectmenu(
              {appendTo: form,icons: [{find: '.media-option'}],
              bgImage: function() {
                return 'url(http://'+CONTENT_LOCATION+'/upload/images/' + $(this).attr("title") + '-icon.jpg)';
              }
            });
          });

}


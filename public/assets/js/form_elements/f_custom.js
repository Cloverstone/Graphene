var custom = new Form.register({type:"custom"});

custom.create = function(item,options){
  var select = $('<div>').attr('name',item.name).addClass('custom-input');

  for ( var i in item.choices ){
    if(i!= null){
      if(item.choices[i].value != undefined){

//          if(item.choices[i].content == undefined){item.choices[i].content=null;}

          temp = $('<div>').attr('data-val',item.choices[i].value)
                    .attr('title',item.choices[i].name)
                    .attr('data-title',item.choices[i].name)
                    .addClass("custom")
                    .data("json",item.choices[i]);

          if(item.choices[i].wclass != undefined){
            temp.addClass(item.choices[i].wclass)
          }else{
            temp.addClass(item.choices[i].value)
          }

          if(item.value == item.choices[i].value){
            temp.addClass("selected");
          }
          temp.appendTo(select)
      }
    }   
  }


if(!options.inline){
  return  $("<div>").attr("data-type","custom").addClass("formitem custom").attr('name',item.name).html($("<label>").attr("for",item.name).html(item.label+':')).append(select);
}else{
  return  $("<div>").attr("data-type","custom").addClass("formitem custom").attr('name',item.name).html($("<div>").addClass("control-group").html($("<label>").addClass("control-label").attr("for",item.name).html(item.label+':')).append($("<div>").addClass("controls").append(select)));
}



  //  return '<div data-type="custom" class="formitem custom"><label for="'+item.name+'">'+item.label+':</label>'+select.html()+'</div></div>';
}
custom.callback = function(item,form){
  $('[name='+item.name+'] .custom').click(function(){
    if(!$(this).hasClass("selected")){
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
    }else{
      if(item.toggle){
        $(this).removeClass("selected");
      }
    }
    if(item.onchange != undefined){
      $(item.onchange);
    }
  }); 
}
custom.parse = function(container){
  var elem = container.find('.custom-input');
  return (elem.children('.selected').data('val') || "");
}

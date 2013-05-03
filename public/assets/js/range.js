function positionSlider(range){
    var value = range.children("input").val();
    var handle = range.find("span");
    var width = range.children(".slider").innerWidth();
    var handleWidth = handle.outerWidth();
    var min = (range.data("min") || 0);
    var max = (range.data("max") || 100);
    var pos = (width - handleWidth)*(value/(max-min))-(handleWidth);
    handle.animate({left:Math.floor(pos).toFixed(0)+"px"});
}
function valueFromPosition(range){
    var handle = range.find("span");
    var dataRange = range.children(".slider").innerWidth()-handle.outerWidth();
    var min = (range.data("min") || 0);
    var max = (range.data("max") || 100);
    return handle.position().left*((max-min) /dataRange)+min;
}



function callback(range){

  var tempstring = "";
  var pin = $(range[0].parentNode).data("pin");
  if(!range.hasClass("frequency")){
     tempstring +="RC,"; 
     tempstring += pin.substr(0,1)+","+pin.substr(1);
     tempstring += ","+range.find("input").val();
     Send(tempstring);
  }else{ 
    var freq = null;
    var pulse = null;
    if(range.hasClass("pulse")){
      pulse = range.find("input").val();
      freq = range.siblings(".range").find("input").val();
    }else{
      freq = range.find("input").val();
      pulse = range.siblings(".range").find("input").val();
    }
    if(pulse != ""){
      tempstring +="F,"+freq+","; 
      tempstring += pin.substr(0,1)+","+pin.substr(1);
      tempstring += ","+pulse;
      Send(tempstring);
    }
  }

}

function sliderSetup(){
var options = {rangeChange:callback};
  $(".range span").draggable({containment:"parent", axis: "x",stop:function(){
//    processRange(value,$(this).data("guid"));
options.rangeChange($(this.parentNode.parentNode));
  } ,drag:function(){
    var range = $(this.parentNode.parentNode);
    range.children("input").val(valueFromPosition(range).toFixed(0));
  }}).dblclick(function(){
    var range = $(this.parentNode.parentNode);
    var input = $(this.parentNode).siblings("input");
 
   input.val(range.data("value") || range.data("min"));
//    processRange(value,guid);

    positionSlider(range);
options.rangeChange(range);
  });

  $(".range input").each(function(){
    var range = $(this.parentNode);
    $(this).val((range.data("value") || range.data("min")));
//    processRange(value,guid);
      positionSlider(range);
options.rangeChange(range);
  });

  $(".range input").change(function(){
    var range = $(this.parentNode);
    var value = $(this).val();
    if(value > range.data("max")){
      $(this).val(range.data("max"));
    }else if(value < range.data("min")){
      $(this).val(range.data("min"));
    }
//    processRange($(this).val(),guid);
    positionSlider(range);
options.rangeChange(range);
  });

  $(".range span").click(function(e){ e.stopPropagation();});

  $(".range .slider").click(function(e){
    var range = $(this.parentNode);
    var temp = (e.pageX-$(this).offset().left);
    var width =$(this).innerWidth()
    var handle = $(this).children("span").outerWidth();
    var min = (range.data("min") || 0);
    var max = (range.data("max") || 100);
    var pos = temp-(handle/2);
    var input = $(this).siblings("input");

    if(temp<(handle/2)){
      input.val(min.toFixed(0));
      pos = 0;
    }else if(temp>(width-(handle/2))){
      input.val(max.toFixed(0));
      pos = width-handle;
    }else if(temp>(handle/2) && temp<(width-(handle/2))){
      var dataRange = width - handle;
      var position = temp-(handle/2);
      var value = (max-min)*position/dataRange+min;
      input.val(value.toFixed(0));
    }
    positionSlider(range);
options.rangeChange(range);
//    processRange($(this).siblings("input").val(),$(this).children("span").data("guid"));
  });
}


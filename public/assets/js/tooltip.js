$('[data-title]').live('mouseover mouseleave  mouseenter', function(event) {
  event.preventDefault();
//  alert(event.type);
  if (event.type == 'mouseover' | event.type == 'mouseenter') {
    if($('.hover_item').length == 0){
    var position = $(this).offset();
    var hoveritem = null;
    switch($(this).attr('data-position')){
      case "right":
        var top = position.top + 5;
        var left = position.left+$(this).width()+5;
        hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;top:'+top+'px;right:'+left+'px;z-index:5000;');
        break;
      case "bottom":
        var top = position.top+$(this).outerHeight();
        
        var left = $(document).width()-(position.left+$(this).outerWidth()-(($(this).outerWidth()/2)-14));
        hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;top:'+top+'px;right:'+left+'px;z-index:5000;');
        break;
      default:
          var top = $(window).height()-position.top;
          var left = $(document).width()-(position.left+$(this).outerWidth()-(($(this).outerWidth()/2)-14));
          
          hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;max-width:300px;bottom:'+top+'px;right:'+left+'px;z-index:5000;');
        
        break;
    }
      if($(this).attr('data-position') == "bottom"){
        hoveritem.html('<span>'+$(this).attr('data-title')+'</span><div class="arrow"></div>').addClass('tip');
      }else{
        hoveritem.html('<div class="arrow"></div><span>'+$(this).attr('data-title')+'</span>').addClass('tip');
      }


      $('body').append(hoveritem.addClass('hover_item').addClass($(this).attr('data-position')).hide());
      $('.hover_item').fadeIn();
    }
  } else {
   $('.hover_item').remove();
  }
});


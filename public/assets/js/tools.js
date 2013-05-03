statusMessage = {};
statusMessage.timer = null;
$("body").append($("<div>").attr("id","status-message-container").html($("<div>").html($("<span>").attr("id","status-message").addClass("alert alert-info").hide())));
$("body").append($("<div>").attr("id","wait-container").html($("<div>").html($("<span>").attr("id","wait").hide())));
//$("body").append($("<div>").attr("id","modal-wait-container").html($("<div>").html($("<span>").attr("id","wait").hide())));

statusMessage.hide = function(){
  $('#status-message').fadeOut('slow');  
};
statusMessage.display = function(message,status){
  status = (status|| "OK");
//  if(status != "OK"){
//    $('#status-message').removeClass("alert-info");
//  }

  $('#status-message').attr('class','alert');

  $("#wait").hide();
  $('#status-message').html(message).addClass("alert-"+status.toLowerCase());
  $('#status-message').fadeIn('fast');
  clearTimeout(statusMessage.timer);
  statusMessage.timer=setTimeout(statusMessage.hide,4000);
}
statusMessage.presend = function(){
  clearTimeout(statusMessage.timer);
  $('#status-message').hide();
  $("#wait").show();
}


function hideMessage(){
  $('#status-message').fadeOut('slow',function(){$('#status-message').attr("class","alert alert-info")});
};
function displayMessage(message,status){
  if(status != "OK"){
    $('#status-message').removeClass("alert-info");
  }
  $("#wait").hide();$('#status-message').html(message).addClass("alert-"+status);$('#status-message').fadeIn('fast');clearTimeout(statusMessage.timer);
  statusMessage.timer=setTimeout(hideMessage,4000)
}



modal = function(options){
  this.modalEl = $("<div>").addClass("modal").html($("<div>").addClass("modal-background")).append($("<div>").addClass("modal-container").html($("<span>").addClass("modal-close")).append($("<div>").addClass("modal-title")).append($("<div>").addClass("modal-content")).append($("<div>").addClass("modal-bottom")).draggable({containment: "parent",handle:".modal-title"})).hide();
  this.form = null;
  $("body").append(this.modalEl);

  this.modalEl.find(".modal-title").html(options.title);
  this.modalEl.find(".modal-bottom").html(options.footer);
  if(options.form){
    this.form = this.modalEl.find(".modal-content").jqform(options.form);
  }
  this.modalEl.find(".modal-content").append(options.content);
  this.parse = function(){return this.form.parse();};
  this.show = function(){this.modalEl.show();};
  this.hide = function(){this.modalEl.fadeOut("fast");};
  this.remove = function(){this.modalEl.fadeOut("fast",function(){$(this).remove();});};
  this.modalEl.show();
}
$(".modal .modal-close").live("click",function(){$(this.parentNode.parentNode).fadeOut("fast",function(){$(this).remove();});});


function processResponse(data){
    if(data.pageType!=undefined){$('#container').attr('class',data.pageType);}

//used for multiple session sync
if(false){    if(sessiionStatus){
      if(data.sessionStatus !=undefined){
        if(sessionStatus != data.sessionStatus){location.reload();}
      }
    }
}
    if(data.html != undefined){
      $('.hover_item').remove();
      $("#content").empty();
    }
    if(data.title != undefined && data.title != null){
      if(pageOut != null && document.title != data.title){
        pageOut();
        pageOut = null;
      }
      document.title = data.title;
      $("body").attr("name",data.title.replace(/ /g,"_"));
    } 

    if(data.data != undefined){
      if(data.data.response_type == "context"){
        contextObj = data.data;
      }else{
        response = data.data;
      }
    }

    if(data.html != undefined){
      $("#content").html(data.html);   
    }

    if(data.script != undefined){$("body").append('<script>'+data.script+'</script>');}
    if(data.message != undefined){  displayMessage(data.message,data.status)}
    $("#wait").fadeOut();
}



function processFilter(){
//  $("#wait").show(50,
//function(){
  $(".filterable").each(
  function(){
//    if($.score($(this).text().toLowerCase(), $("[name=filter]").val().toLowerCase() ) >.25){
    if($(this).text().toLowerCase().indexOf($("[name=filter]").val().toLowerCase())>-1){
      $(this).removeClass('nodisplay');
    }else{
      $(this).addClass('nodisplay');
    }
  });
  $("#wait").hide();
//}

//);
}

filterTimer = null;
$("[name=filter]").live("keyup",function(event){
if(!$(this).hasClass("delay")){
  $(".filterable").each(
  function(){
    if($.score($(this).text().toLowerCase(), $("[name=filter]").val().toLowerCase() ) >.25){
      $(this).show();
    }else{
      $(this).hide();
    }
  });
}else{
clearTimeout(filterTimer);
filterTimer=setTimeout(processFilter,300);
}


});




$("[data-title]").removeAttr('title');
$('[data-title],.uevents').live('mouseover mouseleave', function(event) {
  event.preventDefault();
  if (event.type == 'mouseover') {
    if($('.hover_item').length == 0){
    var position = $(this).offset();
    var hoveritem = null;
    switch($(this).attr('data-position')){
      case "right":
        var top = position.top + 5;
        var left = position.left+$(this).width()+5;
        hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;top:'+top+'px;right:'+left+'px;z-index:50000;');
        break;
      case "bottom":
        var top = position.top+$(this).height()+3;
        var left = $(document).width()-(position.left+$(this).width()+2);
        hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;top:'+top+'px;right:'+left+'px;z-index:50000;');
        break;
      default:
        if($(this).attr('data-title')){
          var top = $(window).height()-position.top;
          var left = $(document).width()-(position.left+$(this).outerWidth());
          hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;max-width:300px;bottom:'+top+'px;right:'+left+'px;z-index:50000;');
        }else{
          var top = position.top;
          var left = $(document).width()-(position.left+$(this).width()+274);
           hoveritem = $('<div>').attr('style','position:absolute;overflow:hidden;top:'+top+'px;right:'+left+'px;z-index:50000;');
        }
        break;
    }
    if($(this).attr('data-title')){
      $(this).removeAttr('title');
      if($(this).attr('data-position') == "bottom"){
        hoveritem.html('<span>'+$(this).attr('data-title')+'</span><div class="arrow"></div>').addClass('tip');
      }else{
        hoveritem.html('<div class="arrow"></div><span>'+$(this).attr('data-title')+'</span>').addClass('tip');
      }
    }else if($(this).find('.show_item').length != 0){
        hoveritem.html($(this).find('.show_item').clone()).attr('class','c0_border5 thin_border');
      }else{
        var splits = $(this).data('title').split("|");
        var content = splits[1];
        for(var i = 2;i< splits.length;i++){
          content += '<div class="split-body">'+splits[i]+'</div>';
        }
        hoveritem.html('<div class="arrow"></div><div id="cluetip" style="width: 250px; " class="clue-right-default  cluetip-default"><div id="cluetip-outer" style="position: relative; z-index: 110; overflow-x: visible; overflow-y: visible; height: auto; "><h3 id="cluetip-title" style="display: block; ">'+splits[0]+'</h3><div id="cluetip-inner">'+content+'</div></div></div>').addClass('right');
      }
        $('body').append(hoveritem.addClass('hover_item').addClass($(this).attr('data-position')).hide());
        $('.hover_item').fadeIn();
      }
    } else {
      $('.hover_item').remove();
  }
});


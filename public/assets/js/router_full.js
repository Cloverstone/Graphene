var reload = true; 
var pageOut = null;
var subcontext = null;
var sitename = "";
var pageLoading = true;
function setHash(hash){
  reload = false; 
  document.location.hash = hash;
  makeRequest();  
}
timer = null;
function presend(){
  clearTimeout(timer);
  $('#status-message').hide();
  $("#wait").show();
}

function ajax_error(data){
    $("#wait").fadeOut();
}

$(document).ready(function() {

  if(document.location.hash == "#_=_"){setHash("");}

  $("[data-title]").removeAttr('title');
  if (typeof window.history.pushState == 'function') {
    var temp = document.location.href;
    temp = temp.replace("/#!","");
    reload = false;
    history.replaceState({}, sitename, temp);
  }else{
    var path = $.url().attr('path');  
    if(path.length > 1){
      document.location = "/#!"+path;
    }
  }
//  myModal = new Modal($('#sc-admin-modal'));
  makeRequest();
});
//end docuemnt ready

window.onpopstate = function (event) {
if(!pageLoading){
    presend();
    makeRequest($.url(document.location).attr('path'));
}else{pageLoading = false;}
}
    
$(window).bind('hashchange', loadhashchange);    
function loadhashchange(tempvar){
  if(document.location.hash != "#_=_"){
    if ((typeof window.history.pushState != 'function')) {
      if(reload){presend();makeRequest();} 
      reload = true;
    }
  }else{
    setHash("");
  }
}

$('[data-action]').live('click',function(event){
  event.preventDefault();
  event.stopPropagation();
  actions[$(this).attr('data-action')]($(this));
});

var clover = {};
clover.form = {};
clover.form.parse = function(formID){
    returnObj = {};
    if($("#"+formID).attr('data-id')){
      returnObj.id = $("#"+formID).attr('data-id');
    }
    $("#"+formID).find('[type=text], [type=password], [type=hidden], textarea').each(function(){
        returnObj[$(this).attr("name")] = $(this).val();
    });
    $("#"+formID).find('[type=checkbox]').each(function(){
     returnObj[$(this).attr("name")] = $(this).is(':checked');
    });

    //get data from each selected option (assumes the id is the important value)
    $("#"+formID).find('select').each(function(){
      returnObj[$(this).attr("name")] = $(this).children('option:selected').attr('value');
    });
//    console.log(returnObj);
//    console.log($("#"+formID).serializeArray());
    return returnObj;
}

$('.auto-form').live("keydown",function(event) {
if(event.keyCode == 13){
    var url = $(this).attr('action');
    data = clover.form.parse($(this).attr("id"));
    if(url.indexOf("?") >-1){
      url += "&ajax";
    }else{
      url += "?ajax"
    }
    $.post(url,data,processResponse,"json");
}
});
$('[data-form]').live('click',function(event){
    data = clover.form.parse($(this).attr("data-form"));
    var url = $("#"+$(this).attr("data-form")).attr('action');
    if(url.indexOf("?") >-1){
      url += "&ajax";
    }else{
      url += "?ajax"
    }
    $.post(url,data,processResponse,"json");
});

$('[data-url]').live('click',function(event){
    event.preventDefault();
    event.stopPropagation();
  if(!$(this).attr('data-confirm') || confirm($(this).attr('data-confirm'))){
    presend();
    var data = null;
//    if (typeof formParse == 'function') {
//    if($(this).attr("data-form")){
//      data = clover.form.parse($(this).attr("data-form"));
//    }
    var url = $(this).attr('data-url');
    if(url.indexOf("?") >-1){
      url += "&ajax";
    }else{
      url += "?ajax"
    }
//    $.post(url,data,processResponse,"json");
$verb = 'POST';
if($(this).attr('data-verb')){
$verb = $(this).attr('data-verb');
}
  $.ajax({
    type: $verb,
    url: url,
    data: data,
    success: processResponse,
    dataType: 'json'
  }); 
  }
});


/*
$('[data-action]').live('click',function(event){
    event.preventDefault();
    event.stopPropagation();
  contextFunctions[subcontext][$(this).attr('data-action')]($(this));
});

$('[data-url]').live('click',function(event){
    event.preventDefault();
    event.stopPropagation();
  if(!$(this).attr('data-confirm') || confirm($(this).attr('data-confirm'))){
    presend();
    var data = null;
    if (typeof formParse == 'function') {
      if($(this).attr("data-form")){data = formParse($(this).attr("data-form"));}
    }
    var url = $(this).attr('data-url');
    if(url.indexOf("?") >-1){
      url += "&ajax";
    }else{
      url += "?ajax"
    }
    $.post(url,data,processResponse,"json");
  }
});
*/

$('a[href],div[href]').live('click',function(event){
  if(($.url($(this).attr('href')).attr('host')=="") && ($(this).attr('data-clear')!="true")){
    event.preventDefault();
    event.stopPropagation()
    presend();
    if(document.location.hash != '#!'+$(this).attr('href')){
      if($(this).attr("data-form")){
        url = $(this).attr('href');
        if(url.indexOf("?") >-1){
          url += "&ajax";
        }else{
          url += "?ajax";
        }
        $.post(url,formParse($(this).attr("data-form")),processResponse,"json");
      }else{
        if (typeof window.history.pushState == 'function') {
          reload = false;
          history.pushState({}, 'SteepleConnect', $(this).attr('href'));
          makeRequest($(this).attr('href'));
        }else{
          setHash('!'+$(this).attr('href'));
        }
      }
    }else{
      makeRequest();
    }
  }
});

function reRequest(){
  makeRequest($.url(document.location).attr('path'));
}

function makeRequest(tempvar){
  var url = document.location.hash.substr(2);
  if(tempvar != undefined){
    url = tempvar;
  }

  urlSplits = url.replace(/\//g,"_").replace(/./g,"_").split("_");

  //Possibly should be removed
  //if($.url().param().length>0){
  //  url += "&params="+JSON.stringify($.url().param());
  //}

  if(url.indexOf("?") >-1){
    url += "&ajax";
  }else{
    url += "?ajax";
  }

  $.ajax({url: url,error: ajax_error, success: processResponse, dataType: 'json'});
}



router = {};
router.content = "content";
function processResponse(data){
    if(data.pageType!=undefined){$('#container').attr('class',data.pageType);}

//used for multiple session sync
    if(sessionStatus != undefined){
      if(data.sessionStatus !=undefined){
        if(sessionStatus != data.sessionStatus){location.reload();}
      }
    }
    if(data.html != undefined){
      $('.hover_item').remove();
      $("#cp-content").empty();
      if(window.context == "church"){$('body').scrollTop(0);}
    }

    if(data.title != undefined && data.title != null){
      if(pageOut != null && document.title != data.title){
        pageOut();
        pageOut = null;
      }
      document.title = data.title;
      //subcontext = data.title.replace(/ /g,"_").toLowerCase();
      $("body").attr("name",data.title.replace(/ /g,"_"));
    } 

    if(data.data != undefined){
      if(data.data.response_type == "context"){
        contextObj = data.data;
      }else{
        response = data.data;
      }
    }
    
//    deprecate
    if(data.sidebar != undefined){$("#sc-sidebar-container").html(data.sidebar);}
    if(data.menu != undefined){
      $("#menu").replaceWith(data.menu);
    }
    if(data.header != undefined){$("#sc-header").html(data.header);}

    if(data.html != undefined){

//      $("#cp-content").html(data.html.replace(/(\d)?\s?\b(?!(?:from|to|at))(\w+)\.?\s(\d+):(\d+)[,\-]?(\d+)*/g,'<a class="verse" data-data="/niv/$1$2/$3/$4/$3/$5" href="#">$&</a>'));
      $("#"+router.content).html(data.html);
      $('input[placeholder], textarea[placeholder]').placeholder();
      $("[name=filter]").focus();

    }

    if(data.script != undefined){$("body").append('<script>'+data.script+'</script>');}
    if(data.message != undefined){  displayMessage(data.message,data.status)}
    $("#wait").fadeOut();

}
$(".nav-auto li a[href]").live("click",function(){
  if($(this).attr('target') != "_blank"){
    $(this.parentNode).siblings().removeClass("active");
    $(this.parentNode).addClass("active");
  }
});
var actions = {};
actions.logout = function(){
  makeRequest("/session/logout");
}

actions.page_edit = function(){
window.location = "/builder/#/"+cpage;
}



var referrer = null;
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

function ajax_error(data,status,error){
    $("#wait").fadeOut();
}

$(document).ready(function() {
  processMaps();
  if($().flexslider) {
    $('.flexslider').flexslider({controlNav:false});
  }
  if(document.location.hash == "#_=_"){setHash("");}

  $("[data-title]").removeAttr('title');
  if (typeof window.history.pushState == 'function') {
    var temp = document.location.href;
  }
});
//end docuemnt ready

window.onpopstate = function (event) {
if(!pageLoading && reload){
    presend();
    makeRequest($.url(document.location).attr('path'));
}else{pageLoading = false;reload = true;}
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
function processMaps(){
  $(".map_canvas.unprocessed").each(function(){$(this).removeClass("unprocessed");mapAddress({address:$(this).attr("data-address"),icon:$(this).attr("data-icon"),"element":$(this)[0]});});
}
function mapAddress(input){
   if(input.element == undefined){
     input.element = $("#map_canvas")[0];
   }
   geocoder = new google.maps.Geocoder();
   geocoder.geocode( { 'address': input.address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
       var myOptions = {
           zoom: 15,
           center: results[0].geometry.location,
           mapTypeId: google.maps.MapTypeId.ROADMAP
       };
       //var map = new google.maps.Map(document.getElementById(input.element), myOptions);
       var map = new google.maps.Map(input.element, myOptions);
       var mapOptions = {
           map: map, 
           position: results[0].geometry.location
       };
       
       if(input.icon == "steepleconnect"){
         var infowindow = new google.maps.InfoWindow({
           content: churchName
         });  
         infowindow.open(map,marker);
           mapOptions.icon = "http://"+CONTENT_LOCATION+"/img/sc.png";
       }
       var marker = new google.maps.Marker(mapOptions);
     } else {
       alert("Geocode was not successful for the following reason: " + status);
     }
   });
}


var linkPrevents = [];
$('a[href],div[href]').live('click',function(event){
  if(($.url($(this).attr('href')).attr('host')=="") && $(this).attr('href').indexOf("#") != 0 && ($(this).attr('data-clear')!="true" ||  $(this).tagName != "A") && $(this).attr('data-prevent')!="true" && ($(this).attr("target") != "_blank")){
    event.preventDefault();
    event.stopPropagation()

//$(".expanded").siblings().hide().children().hide();
    presend();
//    if(document.location.hash != '#!'+$(this).attr('href')){
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
           if($(this).attr('data-clear')!="true"){
          reload = false;
          //referrer = document.URL;
          referrer = window.location.pathname;
          history.pushState({}, '', $(this).attr('href'));
          reload = true;
          makeRequest($(this).attr('href'));
           }else{
             window.location = $(this).attr('href');
           }
        }else{
//          makeRequest($(this).attr('href'));
//         setHash('!'+$(this).attr('href'));
             window.location = $(this).attr('href');
        }
      }
/*    }else{
      makeRequest();
    }*/
  }else if($(this).attr('href').indexOf("#") == 0){
   reload = false;
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
    url += "&ajax&referrer="+referrer;
  }else{
    url += "?ajax&referrer="+referrer;
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
//        if(sessionStatus != data.sessionStatus){location.reload();}
      }
    }
    if(data.html != undefined){
      $('.hover_item').remove();
      $("#cp-content").empty();
      $('body').scrollTop(0);
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
  processMaps();

  if($().flexslider) {
    $('.flexslider').flexslider({controlNav:false});
  }
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

actions._edit = function(){window.location = "/builder/#!/"+cpage;}

actions.view_image = function(obj){
preview = new modal({"content":'<div style="text-align:center"><img style="max-width:600px;margin:0px auto" src="/uploads/img/'+obj.attr("id")+'.'+obj.attr("data-ext")+'"/></div>'});
}
preview = null;
actions.open_slide = function(obj){
if(preview){
  preview.hide();
}
var prev = "";
var next = "";
if($("#"+obj.attr("id")+".thumb").prev(".thumb").length > 0){
  prev = '<span onclick=actions.open_slide($("#'+obj.attr("id")+'.thumb").prev(".thumb")) class="btn" style="float:left"><i class="icon-backward"></i> Previous</span>';
}
if($("#"+obj.attr("id")+".thumb").next(".thumb").length > 0){
  next = '<span onclick=actions.open_slide($("#'+obj.attr("id")+'.thumb").next(".thumb")) class="btn">Next <i class="icon-forward"></i></span>';
}
preview = new modal({"content":'<div style="text-align:center"><img style="max-width:700px;margin:0px auto" src="/uploads/galleries/'+obj.attr("data-gallery")+'/'+obj.attr("id")+'.'+obj.attr("data-ext")+'"/></div><div>'+(obj.attr("data-description")||"")+'</div>',"footer":'<div id="nav">'+prev+next+'</div>'});

}
actions.edit_image = function(obj){
var options = {title:"Edit Image",
    footer:$("<div>").addClass("btn btn-primary").html("Update"),
    form:{label:"",options:{inline:true},items:[
      {type:"text",label:"Name",name:"name",value:obj.attr("data-name")},
    ]}
  };
preview = new modal(options);
   preview.modalEl.find(".btn").click(function(){
    var options = preview.parse();
    preview.remove();
  url = "/update/images/"+obj.attr("data-id")+"?ajax";
  $.ajax({
    type: 'POST',
    url: url,
    data: options,
    success: processResponse,
    dataType: 'json'
  }); 
  });
}
actions.edit_gallery_image = function(obj){
var options = {title:"Edit Image",
    footer:$("<div>").addClass("btn btn-primary").html("Update"),
    form:{label:"",options:{inline:true},items:[
      {type:"text",label:"Name",name:"name",value:obj.attr("data-name")},
      {type:"hidden",name:"ext",value:obj.attr("data-ext")},
      {type:"textarea",label:"Description",name:"description",value:obj.attr("data-description")}
    ]}
  };
preview = new modal(options);
   preview.modalEl.find(".btn").click(function(){
    var options = preview.parse();
    preview.remove();
  url = "/update/galleries/"+obj.attr("data-gallery")+"/images/"+obj.attr("data-id")+"?ajax";
  $.ajax({
    type: 'POST',
    url: url,
    data: options,
    success: processResponse,
    dataType: 'json'
  }); 
  });
}

actions.site_new = function(obj){
var options = {title:"New Site",
    footer:$("<div>").addClass("btn btn-primary").html("Create"),
    form:{label:"",options:{inline:true},items:[
      {type:"hidden",name:"_id",value:"new"},
      {type:"text",label:"Domain",name:"domain",placeholder:"www.newsite.com"},
      {type:"text",label:"Theme",name:"theme"}
    ]}
  };
  preview = new modal(options);
  preview.modalEl.find(".btn").click(function(){
    var options = preview.parse();
    preview.remove();
  url = "/update/sites?ajax";
  $.ajax({
    type: 'POST',
    url: url,
    data: options,
    success: processResponse,
    dataType: 'json'
  }); 
  });
}
actions.gallery_new = function(obj){
var options = {title:"Gallery",
    footer:$("<div>").addClass("btn btn-primary").html("Save"),
    form:{label:"",options:{inline:true},source:obj.parent().data(),items:[
      {type:"hidden",name:"_id",value:(obj.attr("data-gallery")||"new")},
      {type:"text",label:"Title",name:"title",placeholder:"New Album"},
      {type:"textarea",label:"Description",name:"description"},
      {type:"tags",label:"Tags",name:"tags"}
    ]}
  };
  preview = new modal(options);
  preview.modalEl.find(".btn").click(function(){
    var options = preview.parse();
    preview.remove();
  url = "/new/galleries?ajax";
  $.ajax({
    type: 'POST',
    url: url,
    data: options,
    success: processResponse,
    dataType: 'json'
  }); 
  });
}
actions.upload_image = function(obj){
var options = {title:"Upload Image",
    form:{label:"",options:{inline:true},items:[
       {type:"upload",label:"Image",name:"image_url",value:"/upload/img"}
    ]}
  };
  preview = new modal(options);
}
actions.upload_file = function(obj){
var options = {title:"Upload File",
    footer:$("<div>").addClass("btn btn-primary").html("Get File"),
    form:{label:"",options:{inline:true},items:[
       {type:"upload",label:"File",name:"file_url",value:"/upload/file"}
//       {type:"text",label:"Or Download from URL",name:"url",placeholder:"http://"}
    ]}
  };
  preview = new modal(options);
/*  preview.modalEl.find(".btn").click(function(){
    var options = preview.parse();
    preview.remove();
    url = "/new/file?ajax";
    $.ajax({
      type: 'POST',
      url: url,
      data: options,
      success: processResponse,
      dataType: 'json'
    }); 
  });
*/
}
actions.upload_gallery_image = function(obj){
var options = {title:"Upload Image",
    form:{label:"",options:{inline:true},items:[
       {type:"upload",label:"Image",name:"image_url",value:"/upload/gallery/"+obj.attr("data-gallery")}
    ]}
  };
  preview = new modal(options);
}



$("[data-generated=cobler] [type=submit]").live("click",function(event){
  event.preventDefault();
  event.stopPropagation();
  var data = $("[data-generated=cobler]").serialize();
  $.post("/forms/submit?ajax",data,processResponse,"json");
})

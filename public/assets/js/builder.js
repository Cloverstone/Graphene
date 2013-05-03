descriptor = {"_id":"new","options":{"title":"New Page"}};
//options= {"title":"New Page"};
$builder_settings = {};
$builder_settings.save = "/publish/page";
$builder_settings.load = "/fetch/page";
$builder_settings.options = {title:"Page Options",
    footer:$("<div>").addClass("btn btn-primary").html("OK"),
    form:{label:"",source:descriptor.options,options:{inline:true},items:[
      {type:"text",label:"Title",name:"title"},
      {type:"text",label:"Path<br>(if different than title)",name:"path"},
//      {type:"select",label:"Access Control",name:"access",choices:["Public","Private"]},
      {type:"tags",label:"Keywords",name:"tags"}
    ]}
  };
$builder_settings.optionsChanged = function(){}
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
$('form').live("submit",function(e){e.preventDefault();return false;});
$('form').find('.input').live("keypress",preventEnterSubmit);
builderModal = new modal({title:"",
  footer:$("<div>").addClass("btn btn-primary").html("OK"),content:"<form name='modal-form' class='form-horizontal'></form>"
});
builderModal.modalEl.hide().click(function(event){event.stopPropagation();});
builderModal.modalEl.find(".modal-close").click(function(){builderModal.hide();});
builderModal.modalEl.find(".modal-bottom .btn-primary").click(function(){builderModal.hide();});

function preventEnterSubmit(e) {
  if (e.which == 13) {
    var $targ = $(e.target);
    if (!$targ.is("textarea") && !$targ.is(":button,:submit")) {
      var focusNext = false;
      $(this).find(":input:visible:not([disabled],[readonly]), a").each(function(){
        if (this === e.target) {
          focusNext = true;
        } else if (focusNext){
          $(this).focus();
          return false;
        }
      });
      return false;
    }
  }
}


$("#options").click(function(){
$builder_settings.options.form.source = descriptor.options;
  myModal = new modal($builder_settings.options);
  
   myModal.modalEl.find(".btn").click(function(){
    descriptor.options = myModal.parse();
    myModal.remove();
    $builder_settings.optionsChanged();
  });
})

$("#open").click(function(){
  myModal = new modal({title:"Open Page",
    footer:$("<div>").addClass("btn btn-primary").html("Open"),
    form:{label:"",options:{inline:true},items:[
      {type:"text",label:"Page",name:"page",value:descriptor.options.title},
    ]}
  });
  
   myModal.modalEl.find(".btn").click(function(){
    descriptor.options.title = myModal.parse().page;
    myModal.remove();
    loadPage();

  });

})
function loadPage(){
   window.location.hash = '!/'+descriptor.options.title.toLowerCase();
//   setHash('!/'+descriptor.options.title.toLowerCase());
   url = $builder_settings.load+"/"+descriptor.options.title+"?ajax&json";
   $.ajax({url: url,
    timeout: 2000,
    type: "get",
    error: function(jqXHR, textStatus, errorThrown) {
    }, success: function(data){
      cb = new Build({associative:false});
      if(data.script != "null"){
        descriptor = JSON.parse(data.script);
      }
      cb.load(descriptor.json);
      $builder_settings.optionsChanged();
    }, dataType: 'json'});
}
$("#save").click(function(){
  if(descriptor.options.title.length == 0){
    myModal = new modal({title:"Save As",
      footer:$("<div>").addClass("btn btn-primary").html("Save"),
      form:{label:"",options:{inline:true},items:[
        {type:"text",label:"Title",name:"page",value:descriptor.options.title},
      ]}
    });
  
    myModal.modalEl.find(".btn").click(function(){
    descriptor.options.title = myModal.parse().page;
    myModal.remove();
    if(descriptor.options.title.length != 0){
      save();
    }
  });
}else{
  save();
}

});
function save(){  
  reload = false; 
//  window.location.hash = '!/'+descriptor.options.title.toLowerCase();
if(descriptor.options.path != undefined){
if(descriptor.options.path == ""){
  window.location.hash = '!/'+descriptor.options.title.toLowerCase();
}else{
  window.location.hash = '!/'+descriptor.options.path.toLowerCase();
}
}else{
  window.location.hash = '!/'+descriptor.options.title.toLowerCase();
}


//  setHash('!/'+descriptor.options.title.toLowerCase());

  descriptor.html = cb.toHTML();
  descriptor.json = JSON.stringify(cb.toJSON());
  descriptor.options = JSON.stringify(descriptor.options);
//  url = "/publish/"+options.title+"?ajax";
//  url = "/publish?ajax";
  url = $builder_settings.save+"?ajax";
  $.ajax({
    type: 'POST',
    url: url,
    data: descriptor,
    success: processResponse,
    dataType: 'json'
  });  
  descriptor.options = JSON.parse(descriptor.options);

}

$("#clear").click(function(){
  cb = new Build({associative:false});
  cb.load({});
});


//Shortcuts
$('body').keydown(function(event) {
  switch(event.keyCode){
    case 27://escape
      cb.deselect();
      break;
    case 83://ctrl + s
      if(event.metaKey){
        event.preventDefault();
        $("#save").click();
      }
      break;
    case 76://ctrl + l
      if(event.metaKey){
        event.preventDefault();
        cb.listView();
      }
      break;
    case 82://ctrl + r
      if(event.metaKey){
        event.preventDefault();
        cb.reload();
      }
      break;
  }
});


function commandReturn(result){
}

$(function(){
  if(sessionStatus == "true"){
    if(window.location.hash) {
      descriptor.options.title = window.location.hash.substr(2).replace('/','');
      loadPage();
      // Fragment exists
    }

//    cb = new Build({associative:false});
//    cb.load();
  }
})


actions.view = function(){
if(descriptor.options.path != undefined){
if(descriptor.options.path == ""){
  window.location = '/'+descriptor.options.title.toLowerCase();
}else{
  window.location = '/'+descriptor.options.path.toLowerCase();
}
}else{
  window.location = '/'+descriptor.options.title.toLowerCase();
}

}


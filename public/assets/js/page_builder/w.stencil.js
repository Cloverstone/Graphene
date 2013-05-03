$(function(){
var wStencil = new widget({type:"Template",text:""});
wStencil.toJSON = function(){
var json = widget.prototype.toJSON(json);
//json.text = "";

return json;

}
wStencil.gc = function(){
  $("#content").css({"margin-bottom":"0px"})
}

wStencil.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = {
    "info":{type:"button",label:"<i class='icon-pencil icon-white'></i> Change Stencil",value:"info",onclick:function(){builderModal.show();}},
    "template":{type:"textarea",label:"Template",name:"text",value:"",fieldset:"modal-form",onchange:widget.update},
    "width":{type:"select",label:"Width",name:"width",value:"12",onchange:widget.update,"choices":[
      {"name":"One Fifth","value":"1_5"},
      {"name":"One Quarter","value":"3"},
      {"name":"One Third","value":"4"},
      {"name":"Two Fifths","value":"2_5"},
      {"name":"Half","value":"6"},
      {"name":"Three Fifths","value":"3_5"},
      {"name":"Two Thirds","value":"8"},
      {"name":"Three Quarters","value":"9"},
      {"name":"Four Fifths","value":"4_5"},
      {"name":"Full","value":"12"}
    ]
    },    
    "float":{type:"custom",label:"Float",name:"float",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Right","value":"right"}
    ]}
  };
  builderModal.modalEl.find(".modal-title").html("Update Stencil");

  var myRegexp = /\[\[(.*?)\]\]/g;
  var match = myRegexp.exec(json.text);

  while (match != null) {
    var splits = match[1].split('::');
    var cobj = {};
    if(splits.length>1){cobj= JSON.parse(splits[1]);}
//    form.items.push($.extend({},{type:"text",name:splits[0],label:splits[0],value:"",onchange:widget.update},cobj));
    form.items[splits[0]] = $.extend({},{type:"text",name:splits[0],label:splits[0],value:"",onchange:widget.update},cobj);

//    var splits = match[1].split('::');
//    var type = "text";
//    if(splits.length>1){type = splits[1];}
//    form.items.push($.extend({},{"type":type,name:splits[0],label:splits[0],value:"",onchange:widget.update}));

    match = myRegexp.exec(json.text);
  }
  $("#content").css({"margin-bottom":"222px"})

return form;}

wStencil.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  var tempdiv = json.text;

  var myRegexp2 = /\[\[(.*?)\]\]/g;
  var match = myRegexp2.exec(json.text);

  while (match != null) {
    var splits = match[1].split('::');
    tempdiv = tempdiv.replace(match[0], json[splits[0]] || "["+splits[0]+"]");
    match = myRegexp2.exec(json.text);
  }
//  for(var i in json){
//    tempdiv = tempdiv.split('[['+i+']]').join(json[i]);
//  }


  div.html(tempdiv);
return div.addClass("pull-"+json.float+" width"+json.width);}

})

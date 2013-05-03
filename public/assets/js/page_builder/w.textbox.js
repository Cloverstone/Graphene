$(function(){
var wTextbox = new widget({type:"Textbox",label:"Label",placeholder:"",help:""});
wTextbox.toJSON = function(){var json = widget.prototype.toJSON(json);return json;}
wTextbox.gc = function(){
  $("#content").css({"margin-bottom":"0px"})
}

wTextbox.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"text",label:"Label",name:"label",value:"Label",onchange:widget.update},
    {type:"select",label:"Display",name:"display",value:"dropdown",onchange:widget.update,"choices":[
      {"name":"Single Line","value":"textbox"},
      {"name":"Multi-line","value":"textarea"},
    ]
    },
    {type:"text",label:"Placeholder",name:"placeholder",value:"Placeholder",onchange:widget.update},
    {type:"textarea",label:"Help Text",name:"help",value:"",onchange:widget.update},
    {type:"checkbox",label:"Block Display",name:"block",onchange:widget.update},
    {type:"select",label:"Width",name:"width",value:"12",onchange:widget.update,"choices":[
      {"name":"One Quarter","value":"3"},
      {"name":"One Third","value":"4"},
      {"name":"Half","value":"6"},
      {"name":"Two Thirds","value":"8"},
      {"name":"Three Quarters","value":"9"},
      {"name":"Full","value":"12"}
    ]
    }
  ];
return form;}

wTextbox.template = function(json){
var iclass = "";
if(json.block){iclass+=" input-block-level";}
if(json.display == "textarea"){
  return [
    '<div data-type="text" class="formitem text">',
      '<div class="control-group">',
        '<label class="control-label" for="{{guid}}">{{label}}:</label>',
        '<div class="controls">',
          '<textarea class="'+iclass+'" placeholder="{{placeholder}}" name="{{guid}}" id="{{guid}}" rows="3"></textarea>',
          '<span class="help-inline"> {{help}}</span>',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
}else{
  return [
    '<div data-type="text" class="formitem text">',
      '<div class="control-group">',
        '<label class="control-label" for="{{guid}}">{{label}}:</label>',
        '<div class="controls">',
          '<input class="'+iclass+'"  placeholder="{{placeholder}}" type="text" name="{{guid}}" id="{{guid}}" value="" />',
          '<span class="help-inline"> {{help}}</span>',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
}
}

//wTextbox.template = '<div data-type="text" class="formitem text" name=""><label for="">{{label}}:</label><input type="text"  name="" value="" /></div>';
wTextbox.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.html();
return div.addClass("pull-left width"+json.width);}

$("[name=alt-form]").click(function(e){
e.stopPropagation();
})

});

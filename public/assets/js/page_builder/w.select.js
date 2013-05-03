$(function(){
var wSelect = new widget({type:"Select",display:"Multiple Choice",label:"Label","options-container":{options:{guid1:{option:""}}}});
wSelect.toJSON = function(){var json = widget.prototype.toJSON(json);return json;}
/*wSelect.gc = function(){
  $("#content").css({"margin-bottom":"0px"})
}*/

wSelect.toFORM = function(json){form = widget.prototype.toFORM(json);

//  form.fieldsets = [{legend:"Options",name:"container",fieldsets:[{name:"options",dupable:{enabled:true,min:1,max:3}}]}];
  form.items = [
    {type:"text",label:"Label",name:"label",value:"Label",onchange:widget.update},
    {type:"select",label:"Display",name:"display",value:"dropdown",onchange:widget.update,"choices":[
      {"name":"Dropdown","value":"dropdown"},
      {"name":"Buttons","value":"radio"},
    ]
    },
    {type:"select",label:"Width",name:"width",value:"12",onchange:widget.update,"choices":[
      {"name":"One Quarter","value":"3"},
      {"name":"One Third","value":"4"},
      {"name":"Half","value":"6"},
      {"name":"Two Thirds","value":"8"},
      {"name":"Three Quarters","value":"9"},
      {"name":"Full","value":"12"}
    ]
    },
    {type:"fieldset",name:"options-container",legend:"Options",items:[
      {type:"fieldset",name:"options",legend:false,onchange:widget.update,dupable:{enabled:true,min:1,max:100},items:[
        {type:"text",label:"",name:"option",placeholder:"Option",value:"",onchange:widget.update}
      ]},
    ]}
  ];


return form;}


/*  wSelect.template = [
    '<div data-type="text" class="formitem text" name="">',
      '<div class="control-group">',
        '<label class="control-label" for="">{{label}}:</label>',
        '<div class="controls">',
          '<select  name="{{guid}}" value="" ></select>',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
*/
wSelect.template = function(json){
if(json.display == "radio"){
  return [
    '<div data-type="text" class="formitem text">',
      '<div class="control-group">',
        '<label class="control-label" for="{{guid}}">{{label}}:</label>',
        '<div class="controls">',
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
          '<select class="input-block-level" id="{{guid}}" name="{{guid}}" value="" ></select>',
        '</div>',
      '</div>',
    '</div>'
   ].join('');
}
}

wSelect.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  var options = "";
  for(var i in json["options-container"].options){
if(json.display == "radio"){
   options+='<label class="radio"><input  name="'+json.guid+'" value="'+i+'" id="'+json['options-container'].options[i].option+'" type="radio"></input>'+json['options-container'].options[i].option+"</label>";
   div.find(".controls").html(options);
}else{
   if(json['options-container'].options[i].option.indexOf('/') != 0){
     options+="<option value='"+i+"'>"+json['options-container'].options[i].option+"</option>";
   }else{
     options+="<option value='-1'>"+json['options-container'].options[i].option.substring(1)+"</option>";
   }
   div.find("select").html(options);
}

  }

return div.addClass("pull-left width"+json.width);}

/*$("[name=alt-form]").click(function(e){
e.stopPropagation();
})*/

});

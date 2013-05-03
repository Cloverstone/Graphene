$(function(){
var wCheckbox = new widget({type:"Checkbox",label:"Label"});
wCheckbox.toJSON = function(){var json = widget.prototype.toJSON(json);return json;}
wCheckbox.gc = function(){
  $("#content").css({"margin-bottom":"0px"})
}

wCheckbox.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"text",label:"Label",name:"label",value:"Label",onchange:widget.update},
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


  wCheckbox.template = [
    '<div class="control-group">',
    '<div class="controls">',
      '<label class="checkbox">',
        '<input class="input-block-level" name="{{guid}}" type="checkbox"> {{label}}',
      '</label>',
    '</div>',
  '</div>'

   ].join('');



//wCheckbox.template = '<div data-type="text" class="formitem text" name=""><label for="">{{label}}:</label><input type="text"  name="" value="" /></div>';
wCheckbox.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.html();
return div.addClass("pull-left width"+json.width);}

$("[name=alt-form]").click(function(e){
e.stopPropagation();
})

});

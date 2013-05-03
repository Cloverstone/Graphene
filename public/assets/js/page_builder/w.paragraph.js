$(function(){
var wParagraph = new widget({type:"Paragraph", display:"Text/HTML",text:"Add some text here...",width:"12"});
wParagraph.gc = function(){
  $("#content").css({"margin-bottom":"0px"})
}
wParagraph.callback = function(){
  $('textarea[name=text]').htmlarea({
    toolbar: [
        ["html"],
        ["bold", "italic", "underline"],
        ["superscript", "subscript"],
        ["justifyleft","justifycenter","justifyright"], 
        ["indent","outdent"],
        ["orderedList","unorderedList"],
        ["link", "unlink"],
        ["horizontalrule"]
    ]
  });
}

wParagraph.toJSON = function(){var json = widget.prototype.toJSON(json);return json;};

wParagraph.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"textarea",label:"",name:"text",value:"",onchange:widget.update,fieldset:"alt-form",callback:wParagraph.callback},
    {type:"custom",label:"Alignment",name:"align",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Center","value":"center"},
      {"name":"Justify","value":"justify"},
      {"name":"Right","value":"right"}
    ]},
    {type:"select",label:"Width",name:"width",value:"",onchange:widget.update,"choices":[
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
    {type:"custom",label:"Float",name:"float",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Right","value":"right"}
    ]}
  ];
  $("#content").css({"margin-bottom":"230px"})
return form;};

wParagraph.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json);
div.html($('<div>').html(json.text));
return div.addClass("pull-"+json.float+" width"+json.width).css({"text-align":json.align});

};

$("[name=alt-form]").click(function(e){
e.stopPropagation();
})

})

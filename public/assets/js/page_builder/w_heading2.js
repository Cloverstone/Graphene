$(function(){
var wHeading = new widget({type:"Heading",text:"Heading",size:"h4"});

wHeading.toJSON = function(){var json = widget.prototype.toJSON(json);return json;};

wHeading.toFORM = function(json){form = widget.prototype.toFORM(json);
/*  form.fieldsets = [{name:"newset",legend:"Textstuff",
           fieldsets:[{name:"newset1",dupable:{enabled:true,min:1,max:3}
           }]
  }];
*/
  form.items = [
    {type:"text",label:"Text",name:"text",value:"",onchange:widget.update,fieldset:"newset1"},
    {type:"custom",label:"Type",name:"size",value:"",onchange:widget.update,"choices":[
      {"name":"Small","value":"h4"},
      {"name":"Medium","value":"h3"},
      {"name":"Large","value":"h2"}  
    ]},
    {type:"custom",label:"Alignment",name:"align",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Center","value":"center"},
      {"name":"Right","value":"right"}
    ]},
    {type:"select",label:"Width",name:"width",value:"12",onchange:widget.update,"choices":[
      {"name":"One Quarter","value":"3"},
      {"name":"One Third","value":"4"},
      {"name":"Half","value":"6"},
      {"name":"Two Thirds","value":"8"},
      {"name":"Three Quarters","value":"9"},
      {"name":"Full","value":"12"}
    ]
    },    
    {type:"custom",label:"Float",name:"float",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Right","value":"right"}
    ]}

  ];

return form;};

wHeading.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.html($("<"+json.size+">").html(json.text));
return div.addClass("pull-"+json.float+" width"+json.width).css({"text-align":json.align});}


})

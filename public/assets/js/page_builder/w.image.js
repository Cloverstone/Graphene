$(function(){
var wImage = new widget({type:"Image",text:"Image",url:"",linktoself:false});

wImage.toJSON = function(){var json = widget.prototype.toJSON(json);
return json;};

wImage.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"image",label:"Image",name:"image",value:"",onchange:widget.update},
    {type:"checkbox",label:"Link To Self",name:"linktoself",value:"",onchange:widget.update,},
    {type:"text",label:"Link URL (Optional)",name:"link",placeholder:"http://",value:"",onchange:widget.update,show:[
        {type:"matches",args:{name:"linktoself",match:false}}
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

wImage.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
if(json.linktoself == false){
if(json.link != ""){
  div.html('<div><a href="'+json.link+'"><img class="img-polaroid" src="'+json.image+'"></a></div>');
}else{
  div.html('<div><img class="img-polaroid" src="'+json.image+'"></div>');
}
}else{
  div.html('<div><a data-prevent="true" href="'+json.image+'"><img class="img-polaroid" src="'+json.image+'"></a></div>');
}
return div.addClass("pull-"+json.float+" width"+json.width).css({"text-align":json.align});}

})




$(function(){
var wVideo = new widget({type:"Video",text:"Video",url:"",id:""});

wVideo.toJSON = function(){var json = widget.prototype.toJSON(json);
  if(url.length>0){  
json.id = json.url.replace(/^[^v]+v.(.{11}).*/,"$1");
}
return json;};

wVideo.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"text",label:"URL",name:"url",value:"",onchange:widget.update,},
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

wVideo.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
//  div.html($("<"+json.size+">").html(json.text));

  if(json.id.length>0)
  {
    var url = 'http://www.youtube.com/v/'+json.id+'?version=3';//'?fs=1&hl=en_US';
    div.html('<div style="text-align:center"><object style="height: 390px; width: 640px"><param name="wmode" value="transparent" /><param name="movie" value="'+url+'&rel=0"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="'+url+'&rel=0" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390" wmode="transparent"></object></div>');

  }


return div.addClass("pull-"+json.float+" width"+json.width);}

})





var wYoutube = new widget({type:"Youtube",id:"",url:"",options:{}});
wYoutube.image="youtube.ico";
wYoutube.display="Video";
wYoutube.wclass="movie";
wYoutube.group="basics";
wYoutube.toJSON = function(){
  var json = widget.prototype.toJSON(json);
  json.url = fromName('url');
  json.id = json.url.replace(/^[^v]+v.(.{11}).*/,"$1");
  return json;
};
wYoutube.createEditor = function(json){
  json = widget.prototype.createEditor(json);
  var options = {type:'text',title:"URL",name:"url",value:json.id,container:'.eslot[name=content]'};
  createInput(options);
};
wYoutube.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  if(json.id.length>0)
  {
  var url = 'http://www.youtube.com/v/'+json.id+'?version=3';//'?fs=1&hl=en_US';

div.append('<object style="height: 390px; width: 640px"><param name="wmode" value="transparent" />
<param name="movie" value="'+url+'&rel=0"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="'+url+'&rel=0"
 type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390" wmode="transparent"></object>');
  }

  return div;
};
loadWidget(wYoutube);




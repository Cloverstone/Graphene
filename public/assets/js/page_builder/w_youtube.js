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
  //var obj = $('<object>').attr('width','500').attr('height','400');
//  var tempstr1 = '<param name="movie" value="'+url+'">';
//  var tempstr2 = '<param name="allowFullScreen" value="true">';
//  var tempstr3 = '<param name="allowscriptaccess" value="always">';
//  var tempstr4 = '<embed source="'+url+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowFullScreen="true" width="500" height="400">';
//  var objstring = '<object width="500" height="400">'+tempstr1+tempstr2+tempstr3+tempstr4+'</object>';

//  $('<param>').attr('name','movie').attr('value',url).appendTo(obj);
//  $('<param>').attr('name','allowFullScreen').attr('value','true').appendTo(obj);
//  $('<param>').attr('name','allowscriptaccess').attr('value','always').appendTo(obj);
//  $('<embed>').attr('src',url).attr('type','application/x-shockwave-flash').attr('allowScriptAccess','always').attr('allowfullscreen','true').attr('width','500').attr('height','400').appendTo(obj);
//  div.append(objstring);

div.append('<object style="height: 390px; width: 640px"><param name="wmode" value="transparent" /><param name="movie" value="'+url+'&rel=0"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="'+url+'&rel=0" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390" wmode="transparent"></object>');
//<iframe width="420" height="345" src="http://www.youtube.com/embed/BjZ90cYRVp0" frameborder="0" allowfullscreen></iframe>
  }
  
  return div;
};
loadWidget(wYoutube);


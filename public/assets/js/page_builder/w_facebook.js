var wFacebook = new widget({type:"Facebook",url:"steepleconnect.com",options:{}});

wFacebook.display="Social Networks";
wFacebook.wclass="network";
wFacebook.group = "external";
wFacebook.toJSON = function(){
  var json = widget.prototype.toJSON(json);
  json.url = fromName('url');
  json.showFaces = fromName('showFaces').value;
  json.layoutStyle = fromName('layoutStyle').value;
  json.action = fromName('action').value;
  //json.colorScheme = fromName('colorScheme').value;
  return json;
};

function changeAction()
{
  var val = $(this).find('option:selected').attr('val');
  if( val == "like") { $(this).siblings('[id=like]').show(); $(this).siblings('[id=comments]').hide(); }
  else{ $(this).siblings('[id=like]').hide(); $(this).siblings('[id=comments]').show(); }
}

function hideShowFaces()
{
  var val = $(this).find('option:selected').attr('val');
  if( val == "standard") { $(this).next().show(); }
  else{ $(this).next().hide(); }
}

wFacebook.createEditor = function(json) 
{
  json = widget.prototype.createEditor(json);

  var options = {type:'select',title:'Widget Type',name:'action',value:json.action,update:changeAction,container:'.eslot[name=appearance]'};
  options.options = [{value:"like",text:"Like Button"},{value:"comments",text:"Comments Wall"}];
  var temp = createInput(options);

  var options = {type:'text',title:"URL",name:"url",value:json.url,container:'.eslot[name=content]'};
  createInput(options);

  var options = {type:'select',title:'Layout Style',group:'like',name:'layoutStyle',value:json.layoutStyle,update:hideShowFaces,container:'.eslot[name=appearance]'};
  options.options = [{value:"standard",text:"Standard"},{value:"button_count",text:"Button Count"},{value:"box_count",text:"Box Count"}];
  createInput(options);

  var options = {type:'select',title:'Show Faces',group:'like',name:'showFaces',value:json.showFaces,container:'.eslot[name=appearance]'};
  options.options = [{value:"true",text:"Yes"},{value:"false",text:"No"}];
  createInput(options);
temp.change();
  //var options = {title:'Color Scheme',group:'like',name:'colorScheme',value:json.colorScheme};
  //options.options = [{value:"light",text:"Light"},{value:"dark",text:"Dark"}];
  //createSelect(options);

};
wFacebook.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  if(json.url != "")
  {
    if (json.action == "like") 
    {
      var height = 65;
      if (json.layoutStyle == "standard") {
        if (json.showFaces == "true") { height = 65; }
        else { height = 24; }
      }
      else if (json.layoutStyle == "button_count") { height = 20; }
      else if (json.layoutStyle == "box_count") { height = 60; }

      iframeUrl = 'http://www.facebook.com/plugins/like.php?app_id=130720870340356&href='+encodeURIComponent(json.url)+'&send=false&layout='+json.layoutStyle+'&width=700&show_faces='+json.showFaces+'&action=like&colorscheme='+json.colorScheme+'&font&height='+height;
      var obj = $('<iframe>').attr('src',iframeUrl).attr('scrolling','no').attr('frameborder','0').attr('style','border:none; overflow:hidden; width:700px; height:'+height+'px;').attr('allowTransparency','true');
    }
    else if (json.action == "comments")
    {
      iframeUrl = 'http://www.facebook.com/plugins/feedback.php?href='+encodeURIComponent(json.url)+'&permalink=0&limit=10';
      var obj = $('<iframe>').attr('src',iframeUrl).attr('scrolling','yes').attr('frameborder','0').attr('style','border:none; width:700px; height:500px;').attr('allowTransparency','true');      
    }
	
    div.append(obj);
	
  }
  return div;
};
loadWidget(wFacebook);


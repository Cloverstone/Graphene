var wSocial = new widget({type:"Social",source:"facebook",func:"share",user:"",url:"",sub:null,size:"",options:{}});
wSocial.display="Social";
wSocial.wclass="social";
wSocial.group = "external";
wSocial.toJSON = function(){var json = widget.prototype.toJSON(json);
    json.source = fromName('source').value;
if(json.source == "multi"){
    json.func = fromName('mfunction').value;
    json.sub = fromName('msub').value;
}
if(json.source == "facebook"){
    json.func = fromName('ffunction').value;
    json.sub = fromName('fsub').value;
}
if(json.source == "twitter"){
    json.func = fromName('tfunction').value;
    json.sub = fromName('tsub').value;
    json.size = fromName('tsize').value;
}
if(json.source == "google"){
    json.func = fromName('gfunction').value;
    json.sub = fromName('gsub').value;
    json.size = fromName('gsize').value;
}
    json.user = fromName('username');
    json.url = fromName('url');

return json;};

function sourceChosen(){
$('[name=ffunction]').parent().hide();
$('[name=tfunction]').parent().hide();
$('[name=gfunction]').parent().hide();
$('[name=mfunction]').parent().hide();
$('[name=username]').parent().hide();
$('[name=url]').parent().hide();
$('[name=fsub]').parent().hide();
$('[name=tsub]').parent().hide();
$('[name=tsize]').parent().hide();
$('[name=gsub]').parent().hide();
$('[name=gsize]').parent().hide();
$('[name=msub]').parent().hide();

  var val = $('[name=source]').find('option:selected').attr('val');
  var func = "";  
  if( val == "multi") {
    $('[name=mfunction]').parent().show();
    var func = $('[name=mfunction]').find('option:selected').attr('val'); 
    if(func == "share"){
      var type = $('[name=msub]').parent().show();
    }
    $('[name=url]').parent().show();

  }


  if( val == "facebook") { 
    $('[name=ffunction]').parent().show(); 
    var func = $('[name=ffunction]').find('option:selected').attr('val');
    if(func == "share"){
      var type = $('[name=fsub]').parent().show();
    }
    $('[name=url]').parent().show();

  }

  if( val == "twitter") { 
    $('[name=tfunction]').parent().show(); 
    var func = $('[name=tfunction]').find('option:selected').attr('val');
    if(json.func == "follow"){
      var type = $('[name=username]').parent().show();
    }
    if(json.func == "share"){
      $('[name=url]').parent().show();
    }
    var type = $('[name=tsize]').parent().show();
  }

  if( val == "google") {
    if(json.func == "share"){
      $('[name=gfunction]').parent().show(); 
      var func = $('[name=gfunction]').find('option:selected').attr('val');
      var type = $('[name=gsize]').parent().show();
      $('[name=url]').parent().show();
    }
  }

  if(func == "follow" || func == "stream"){
    $('[name=username]').parent().show();
  }

}

wSocial.createEditor = function(json){json = widget.prototype.createEditor(json);
  var settings = {};
  settings[0] = {type:"select",title:'Platform',name:'source',value:json.source,container:'.eslot[name=content]',options:[{value:"facebook",text:"Facebook"},{value:"twitter",text:"Twitter"},{value:"google",text:"Google +"},{value:"multi",text:"Multiple"}],update:sourceChosen};
  settings[1] = {type:"select",title:'Function',name:'ffunction',value:json.func,container:'.eslot[name=content]',options:[{value:"share",text:"Like Button"},{value:"cwall",text:"Comment Wall"},{value:"awall",text:"Activity Wall"}],update:sourceChosen};
  settings[2] = {type:"select",title:'Function',name:'tfunction',value:json.func,container:'.eslot[name=content]',options:[{value:"share",text:"Tweet"},{value:"follow",text:"Follow"}],update:sourceChosen};
  settings[3] = {type:"select",title:'Function',name:'gfunction',value:json.func,container:'.eslot[name=content]',options:[{value:"share",text:"Plus 1"}],update:sourceChosen};
  settings[4] = {type:"text",title:'User',name:'username',value:json.user,container:'.eslot[name=content]'};
  settings[5] = {type:"select",title:'Type',name:'fsub',value:json.sub,container:'.eslot[name=appearance]',options:[{value:"button",text:"Button Count"},{value:"box",text:"Box Count"},{value:"standard",text:"Standard - w/ Faces"},{value:"standardno",text:"Standard - No Faces"}],update:sourceChosen};
  settings[6] = {type:"select",title:'User Name',name:'tsub',value:json.sub,container:'.eslot[name=content]',options:[{value:true,text:"Show","wclass":"common-custom e-none",content:"Show"},{value:false,text:"Hide","wclass":"common-custom e-none",content:"Hide"}]};
  settings[7] = {type:"select",title:'type',name:'gsub',value:json.sub,container:'.eslot[name=content]',options:[{value:"plus",text:"Plus 1"}],update:sourceChosen};
  settings[8] = {type:"text",title:'URL',name:'url',value:json.url,container:'.eslot[name=content]'};
  settings[9] = {type:"select",title:'Size',name:'tsize',value:json.size,container:'.eslot[name=appearance]',options:[{value:"small",text:"Small"},{value:"large",text:"Large"}]};
  settings[10] = {type:"select",title:'Size',name:'gsize',value:json.size,container:'.eslot[name=appearance]',options:[{value:"small",text:"Small"}]};
  settings[11] = {type:"select",title:'Function',name:'mfunction',value:json.func,container:'.eslot[name=content]',options:[{value:"share",text:"Share"}],update:sourceChosen};
  settings[12] = {type:"select",title:'Type',name:'msub',value:json.sub,container:'.eslot[name=appearance]',options:[{value:"button",text:"Button Count"},{value:"box",text:"Box Count"}],update:sourceChosen};

  for(i in settings){createInput(settings[i]);}
  sourceChosen();
};

wSocial.getJS = function(json){ 
var jscode = "";
  if(json.source == "twitter" || json.source == "multi"){
    jscode += '<script>$.getScript("http://platform.twitter.com/widgets.js");</script>';
  }
  if(json.source == "google" || json.source == "multi"){
    jscode += '<script>$.getScript("https://apis.google.com/js/plusone.js");</script>';
  }
return jscode;
}
wSocial.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
url = json.url;
if(url == ""){
  url = "www.steepleconnect.com/"+$.url().segment(1)+"/page/"+pageid;
}

obj = "";
if(json.source == "google" || json.source == "multi"){
  if(json.func == "share"){
    options = "";
    if(json.sub == "box"){options += ' data-size="tall"';}else{options += ' data-size="medium"';}
    obj = '<div class="g-plusone" data-annotation="bubble" '+options+' data-width="200" data-href="'+encodeURIComponent(url)+'"></div>';
    obj = $("<div>").attr('style',"display:inline-block;padding:0px 5px").append(obj);
  }
}
div.append(obj);

obj = "";
if(json.source == "twitter" || json.source == "multi"){
  //<a href="https://twitter.com/SteepleConnect" class="twitter-follow-button" data-show-count="false" data-size="large" data-show-screen-name="false">Follow @SteepleConnect</a>
  options = "";
  if(json.func == "share"){
    if(json.sub == "box"){options += ' data-count="vertical"'}
    obj = '<a href="'+encodeURIComponent(url)+'" class="twitter-share-button" data-via="SteepleConnect" '+options+'>Tweet</a>';
  }
  if(json.func == "follow"){
    if(json.sub == false){options += ' data-show-screen-name="false"'}
    if(json.size == "large"){options += ' data-size="large"'}
    obj = '<a href="https://twitter.com/'+json.user+'" class="twitter-follow-button" data-show-count="false" '+options+'>Follow @'+json.user+'</a>';
  }
  obj = $("<div>").attr('style',"display:inline-block;padding:0px 5px").append(obj);

}
div.append(obj);

var obj = "";
if(json.source == "facebook" || json.source == "multi"){
  if(json.func == "share"){   
    showFaces = "false";
    layoutStyle = "box_count";
    var height = 62;
    var width = 100;
    switch(json.sub){
      case "standard":
        layoutStyle = "standard";
        showFaces = "true";
        width = 700;
      break;
      case "standardno":
        layoutStyle = "standard";
        height = 24;
        width = 700;
      break;
      case "button":
        layoutStyle = "button_count";
        height = 20;
      break;
    }

    iframeUrl = 'http://www.facebook.com/plugins/like.php?app_id=130720870340356&href='+encodeURIComponent(url)+'&send=false&layout='+layoutStyle+'&width='+width+'&show_faces='+showFaces+'&action=like&colorscheme='+json.colorScheme+'&font&height='+height;
    obj = $('<iframe>').attr('src',iframeUrl).attr('scrolling','no').attr('frameborder','0').attr('style','border:none; overflow:hidden; width:'+width+'px;height:'+height+'px;').attr('allowTransparency','true');
    obj = $("<div>").attr('style',"display:inline-block;padding:0px 5px").append(obj);

  }
  if(json.func == "cwall"){   
    iframeUrl = 'http://www.facebook.com/plugins/feedback.php?href='+encodeURIComponent(url)+'&permalink=0&limit=10';
    obj = $('<iframe>').attr('src',iframeUrl).attr('scrolling','yes').attr('frameborder','0').attr('style','border:none; width:700px; height:500px;').attr('allowTransparency','true');
   
  }
}
div.append(obj);


obj = "";

    if(!publishing){
      obj = this.getJS(json); 
    }

div.append(obj);
div.attr('style',"padding:3px 0px");
return div;};
loadWidget(wSocial);


var wList = new widget({type:"List-Item",width:"full",text:"",style:"disc",indent:1,color_enabled:false,color:"333333",image:{image_id:"-1",size:"small"}});
wList.wclass="list";
wList.group="basics";

wList.toJSON = function(){var json = widget.prototype.toJSON(json);
return json;};

wList.toFORM = function(json){form = widget.prototype.toFORM(json);
form.items = [{type:"text",label:"Text",name:"text",value:"", onchange:widget.update},
                {type:"select",label:"Style",name:"style",onchange:widget.update,"choices":[{"name":"None","value":"none"},{"name":"Disc","value":"disc"},{"name":"Circle","value":"circle"},{"name":"Square","value":"square"}]},
              ];
return form;
}  


// Convert List to HTML
wList.toHTML = function(json,publishing)
{ 
  var div = widget.prototype.toHTML(json,publishing);
  div.addClass(json.width);
  string = json.text.replace(/\<a(.+?)href\s*\=\s*\"(\d*)\"(.*?)\>(.*?)\<\/a\>/g,'<a$1class="self-link" rel="$2" href="?page=page&amp;id=$2"$3>$4</a>'); 
  string = string.replace(/\<a(.+?)href\s*\=\s*\"([a-z]*)\"(.*?)\>(.*?)\<\/a\>/g,'<a$1class="self-link-premade" rel="$2" href="?page=$2"$3>$4</a>');

  if(json.color_enabled){
    div.attr('style',"color:#"+json.color);
  }

  var indent = (json.indent*25);

  var style="";
  var temp_style=json.style;
  var ul = $('<ul>');
  if(json.style == "chk_off"||json.style=="chk_on"||json.style=="arrow"){
    //style += 'list-style-image:url(http://content.sandbox.steepleconnect.com/img/'+json.style+'.png);';
    ul.addClass(json.style);
    temp_style = "none";
  }

  style += 'margin:0px 0px 0px '+indent+'px;list-style-type:'+temp_style+';';

  if(json.image.image_id != "-1"){
    style += 'list-style-image:url("http://content.steepleconnect.com/upload/images/'+json.image.image_id+'-'+json.image.size+'.jpg");';
  }

  ul.attr('style',style);

  $('<li>').html(string).appendTo(ul);
  div.append(ul);

  return div;
};
wList.load();


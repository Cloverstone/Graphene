var wDivider = new widget({type:"Divider",style:"space",color:"333333",color_enabled:false});

wDivider.image="divider.png";
wDivider.wclass="divider";
wDivider.group="basics";
wDivider.display="Space/Divider";
wDivider.load();

wDivider.toJSON = function(){var json = widget.prototype.toJSON(json);

//  json.style = fromName('style').value;
//  json.color = fromName('color').value;
//  json.color_enabled = fromName('color').enabled;
  return json;
};
wDivider.toFORM = function(json){form = widget.prototype.toFORM(json);
form.items = [{type:"select",label:"Style",name:"style",onchange:widget.update,"choices":[{"name":"None","value":"space"},{"name":"Dashed","value":"dash"},{"name":"Dotted","value":"dot"}]}
             ];
return form;}


wDivider.createEditor = function(json){
  json = widget.prototype.createEditor(json);
  
  var options = {type:'custom',title:'Type',name:'style',value:json.style,container:'.eslot[name=content]'};
  options.options = [{value:"space",text:"Space","wclass":"common-custom wide e-none"},{value:"dash",text:"Dashed","wclass":"common-custom wide dash"},{value:"dot",text:"Dotted","wclass":"common-custom wide dot"},{value:"line",text:"Line","wclass":"common-custom wide line"},{value:"hr",text:"HR","wclass":"common-custom wide e-none",content:"<hr/>"}];
  createInput(options);
    
  var options = {type:"color",title:'Color',name:'color',value:json.color,enabled:json.color_enabled,container:'.eslot[name=appearance]'};
  createInput(options);
  
};
wDivider.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  var padSize = 20;

  switch(json.style){
    case "dash":
      $('<div>').attr('style','border-bottom:dashed 2px;margin:2px 5px;').appendTo(div);
      break;
    case "dot":
      $('<div>').attr('style','border-bottom:dotted 2px;margin:2px 5px;').appendTo(div);
      break;
    case "line":
      $('<div>').addClass('sc-divider').attr('style','margin:2px 5px;').appendTo(div);
      break;
    case "hr":
      $('<hr>').attr('style','margin:2px 5px;').appendTo(div);
      break;
    case "space":
      div.attr('style','height:'+padSize+"px");
      break
  }
  
  if(json.color_enabled){
  div.attr('style','color:#'+json.color);
  }
  return div;
};


var wMap = new widget({type:"Map",address:""});
wMap.wclass = "map";
wMap.group  = "external";
wMap.runJS  = true;
wMap.toJSON = function(){var json = widget.prototype.toJSON(json);
  json.address = fromName('address');
  json.width = fromName('width').value;
  return json;
};

wMap.getJS  = function(json){
  return '<script>processMaps();</script>';
};

wMap.createEditor = function(json){json = widget.prototype.createEditor(json);
  var options = {type:"text",title:'Address',name:'address',value:json.address,container:'.eslot[name=content]'};
  createInput(options);
  var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
  options.options = buffet.widths;
  createInput(options);
};

wMap.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.addClass(json.width);
  div.append('<div class="c1_border3 _border"><div data-address="'+json.address+'" class="map_canvas unprocessed"></div></div>');
  return div;
};

loadWidget(wMap);


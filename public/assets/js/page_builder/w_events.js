var wEvents = new widget({type:"Events",cat:"-1"});
wEvents.display="Events";
wEvents.wclass="events";
wEvents.group = "steepleconnect";
wEvents.toJSON = function(){var json = widget.prototype.toJSON(json);

    json.cat = fromName('cat').value;

return json;};
wEvents.createEditor = function(json){json = widget.prototype.createEditor(json);
  var options = {type:"select",title:'Category',name:'cat',value:json.cat,container:'.eslot[name=content]'};
  options.options = buffet.categories;
  createInput(options);
//  var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
//  options.options = buffet.widths;
//  createInput(options);


};
wEvents.getJS = function(json){
//return "<script>processIframes($('.iunprocessed'));</script>";
}
wEvents.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);

optstring = window.short_name+"/?ajax=events"
if(json.cat != -1){optstring+="&cat="+json.cat;}
div.append('<iframe id="eventFrame" class="full iunprocessed" height="0px" frameborder="0" scrolling="no" src="http://'+PRIMARY_DOMAIN_LOCATION+'/'+optstring+'"></iframe>');
if(!publishing){
div.append(this.getJS(json));
}

return div;};
loadWidget(wEvents);


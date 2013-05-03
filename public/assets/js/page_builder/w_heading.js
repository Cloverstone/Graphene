var wHeading = new widget({type:"Heading",text:"Heading",size:"small",color:"333333",update:null,color_enabled:false,align:"left"});
wHeading.image="heading.png";
wHeading.wclass="heading";
wHeading.group="basics";
wHeading.toJSON = function(){var json = widget.prototype.toJSON(json);
    json.size = fromName('size').value;
    json.text = fromName('text');
    json.color= fromName('color').value;
    json.color_enabled = fromName('color').enabled;
    json.align= fromName('align').value;
	return json;
};
wHeading.createEditor = function(json){json = widget.prototype.createEditor(json);
  var options = {type:"text",title:"Text",name:"text",value:json.text,container:'.eslot[name=content]'};
  createInput(options).find('input').keyup(update);
  
  var options = {type:"color",title:'Color',name:'color',value:json.color,enabled:json.color_enabled,container:'.eslot[name=appearance]'};
  createInput(options);

  var options = {type:"custom",selected:"selected",title:'Size',name:'size',value:json.size,container:'.eslot[name=appearance]'};
  options.options = [
	{value:"large",text:"Large","wclass":"common-custom etextsize-large"},
	{value:"medium",text:"Medium","wclass":"common-custom etextsize-medium"},
	{value:"small",text:"Small","wclass":"common-custom etextsize-small"}
  ];
  createInput(options);
    
  var options = {type:"custom",title:'Align',name:'align',value:json.align,container:'.eslot[name=appearance]'};
  options.options = [
	{value:"left",text:"Left","wclass":"common-custom etextalign-left"},
	{value:"center",text:"Center","wclass":"common-custom etextalign-center"}
  ];
  createInput(options);
};
wHeading.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);

if(json.color_enabled){
  div.attr('style',"color:#"+json.color);
}
div.addClass(json.align+" "+json.size).append(json.text);

return div;};
wHeading.load();

var wParagraph = new widget({type:"Paragraph",text:"Add some text here...",width:"full",color:"333333",color_enabled:false,image:{image_id:-1,size:"small",position:"right",text:"para",page:null}});
wParagraph.display="Text/HTML";
wParagraph.toJSON = function(){
  var json = widget.prototype.toJSON(json);
    json.text = fromName('text');
    json.width = fromName('width').value;
    json.color= fromName('color').value;
    json.color_enabled= fromName('color').enabled;
//    json.image.image_id = fromName('id').value;
//    json.image.size = fromName('size').value;
//    if(json.image.size == "orig"){json.image.ext = fromName('id').ext;}else{json.image.ext = "jpg";}
//    json.image.position = fromName('position').value;
  return json;
};
wParagraph.createEditor = function(json){
  json = widget.prototype.createEditor(json);
  
  var ta = $('<textarea>').attr('name','text').css({'width':(400-38)+'px'}).val(json.text).appendTo('.eslot[name=content]');
  ta.keyup(update);

  createInput({type:"color",title:'Color',name:'color',value:json.color,enabled:json.color_enabled,container:'.eslot[name=appearance]'});

  var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
  options.options = buffet.widths;
  createInput(options);
  $('.sc-group[name=advanced] span').html("Advanced");
  var options = {type:"image",title:'Image',name:'id',value:json.image.image_id,container:'.eslot[name=other]'};
//  createInput(options);

  var options = {type:'custom',title:'Size',name:'size',value:json.image.size,group:'Image',container:'.eslot[name=other]'};
  options.options = [
    {value:"icon",text:"Icon","wclass":"common-custom eimagesize-icon"},
    {value:"small",text:"Small","wclass":"common-custom eimagesize-small"},
    {value:"orig",text:"Full","wclass":"common-custom eimagesize-full"}
  ];
//  createInput(options);
  
  var options = {type:'custom',title:'Position',name:'position',value:json.image.position,group:'Image',container:'.eslot[name=other]'};
  options.options = [
    {value:"left",text:"Left","wclass":"common-custom etextalign-left"},
  //{value:"none",text:"Auto","wclass":'e-none',content:"auto"},
    {value:"right",text:"Right","wclass":"common-custom etextalign-right"}
  ];

//  createInput(options);
  
$(".eslot textarea").markItUp(mySettings);
$(".markItUpButton").click(update);
};

// Convert Paragraph To HTML
wParagraph.toHTML = function(json,publishing)
{ 
  var div = widget.prototype.toHTML(json,publishing);
  div.addClass(json.width);
  if(json.color_enabled){
	  div.attr('style',"color:#"+json.color);
	}
	string = json.text.replace(/\n/g,'<br>');
	string = string.replace(/\<a(.+?)href\s*\=\s*\"(\d*)\"(.*?)\>(.*?)\<\/a\>/g,'<a$1href="/page/$2"$3>$4</a>');
  string = string.replace(/\<a(.+?)href\s*\=\s*\"([a-z]*)\"(.*?)\>(.*?)\<\/a\>/g,'<a$1href="/$2"$3>$4</a>');

  div.append(string);
	
	if(json.image.image_id != "-1"){
    var img = $('<img>')
    img.attr('src',"http://"+CONTENT_LOCATION+"/upload/images/"+json.image.image_id+"-"+json.image.size+"."+json.image.ext);
	   if(json.image.position != "none"){img.attr("align",json.image.position);}
       div.prepend(img);
	}
	return div;
};


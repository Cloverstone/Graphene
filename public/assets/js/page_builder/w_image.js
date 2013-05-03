var wImage = new widget({type:"Image",collapse:false,width:"full","page":"none","url":"",image:{image_id:33,"ext":"jpg",size:"small",text:"hello",position:"center",page:null}});
wImage.image="image.png";
wImage.wclass="image";
wImage.group="basics";
wImage.toJSON = function(){
  var json = widget.prototype.toJSON(json);
    json.image.image_id = fromName('id').value;
    json.collapse = fromName('collapse').value;
    json.width = fromName('width').value;
    json.image.size = fromName('size').value;
    if(json.image.size == "orig"){json.image.ext = fromName('id').ext;}else{json.image.ext = "jpg";}
    json.image.position = fromName('position').value;
    json.page = fromName('page').value;
    json.url = fromName('url');

  return json;
};
wImage.createEditor = function(json){
  var showurl = function(){
  var val = $(this).find('option:selected').attr('val');
  if( val == "-1")
  {
    $(this).prev().show();
  }else{
    $(this).prev().hide();
  }
  }

  json = widget.prototype.createEditor(json);

  var options = {title:'Image',name:'id',value:json.image.image_id,container:'.eslot[name=content]'};
  options.options = buffet.images;
  createSelect(options);

  var options = {type:'custom',title:'Size',name:'size',value:json.image.size,container:'.eslot[name=appearance]'};
  options.options = [
    {value:"icon",text:"Icon","wclass":"common-custom eimagesize-icon"},
    {value:"small",text:"Small","wclass":"common-custom eimagesize-small"},
    {value:"orig",text:"Full","wclass":"common-custom eimagesize-full"}
  ];
  createInput(options);
  var options = {type:"text",title:"URL",name:"url",value:json.url,container:'.eslot[name=content]'};
  createInput(options).children('[type=text]').css({width:"200px"});
  
  var options = {type:"page",title:"Page Link",name:"page", value:json.page,"update":showurl,container:'.eslot[name=content]'};
  createInput(options).each(options.update);
  
  var options = {type:'custom',title:'Position',name:'position',value:json.image.position,container:'.eslot[name=appearance]'};
  options.options = [
    {value:"left",text:"Left","wclass":"common-custom etextalign-left"},
    {value:"center",text:"Center","wclass":"common-custom etextalign-center"},
    {value:"right",text:"Right","wclass":"common-custom etextalign-right"}
  ];
  createInput(options);
  var options = {type:'custom',title:'Collapse',name:'collapse',value:json.collapse,container:'.eslot[name=appearance]'};
  options.options = [
    {value:false,text:"No","wclass":"common-custom e-none",content:"No"},
    {value:true,text:"Yes","wclass":"common-custom e-none",content:"Yes"}
  ];
  createInput(options);
   var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
  options.options = buffet.widths;
  createInput(options);
  $('.sc-group[name=advanced] span').html("Advanced");

};
wImage.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
div.addClass(json.width);
  if(json.image.image_id != "-1"){
    var img = $('<img>')
    img.attr('src',"http://"+CONTENT_LOCATION+"/upload/images/"+json.image.image_id+"-"+json.image.size+"."+json.image.ext);

  if(json.page != "none")
  {
   var link = $('<a>');
   if(json.page == "-1")
   {
    if(json.url.length>0)
        {
    link.attr('href',json.url);
        }
   }else{
     if(isNaN(json.page)){
       link.attr('href',"?page="+json.page).attr('rel',json.page).addClass('self-link-premade');
     }else{
       link.attr('href',"?page=page&id="+json.page).attr('rel',json.page).addClass('menu-subitem');
     }
   }
   link.append(img);//.appendTo(slider);
  }
  else
  {
     link = img;
     //img.appendTo(slider);
  }

if(json.image.position == "center"){
    div.attr('style','text-align:'+json.image.position).append(link);
}else{
  if(json.collapse){div.addClass("collapse")}else{div.addClass("prop")}
  link.attr('style','float:'+json.image.position).appendTo(div);

}

  }
  return div;
};
loadWidget(wImage);


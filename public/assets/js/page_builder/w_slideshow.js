var wSlideshow = new widget({type:"Slideshow",trans:"random",delay:5000,border:{type:"none",color:"888888",color_enabled:false},size:"orig",width:"full",items:[{"image_id":0,"ext":"png","text":"","page":"none","url":""}]});
wSlideshow.image="picture.png";
wSlideshow.wclass="slideshow";
wSlideshow.group="basics";
wSlideshow.toJSON = function(){var json = widget.prototype.toJSON(json);

  json.trans = fromName('trans').value;
  json.delay = fromName('delay').value;
  json.width = fromName('width').value;
  json.size = fromName('size').value;
  json.border = {};
  json.border.type = fromName('border-type').value;


for(var i in json.items){
json.items[i].image_id = fromName('id'+i).value;

if(json.size == "orig"){json.items[i].ext = fromName('id'+i).ext;}else{json.items[i].ext = "jpg";}

json.items[i].width = fromName('id'+i).width;
json.items[i].height= fromName('id'+i).height;
if(json.size != "orig"){
json.items[i].width = fromName('id'+i).width_small;
json.items[i].height= fromName('id'+i).height_small;
}




json.items[i].page = fromName('page'+i).value;
json.items[i].text = fromName('text'+i);
json.items[i].url = fromName('url'+i);
}
return json;};
wSlideshow.createEditor = function(json){json = widget.prototype.createEditor(json);

  var options = {type:'select',title:'Transition',name:'trans', value:json.trans,container:'.eslot[name=appearance]'};
  options.options = [
  {value:"random",text:"Random"},
  {value:"fade",text:"Fade"},
  {value:"fold",text:"Fold"},
  {value:"sliceDown",text:"Slice - Down Right"},
  {value:"sliceDownLeft",text:"Slice - Down Left"},
  {value:"sliceUp",text:"Slice - Up Right"},
  {value:"sliceUpLeft",text:"Slice - Up Left"},
  {value:"sliceUpDown",text:"Slice - Up Down Right"},
  {value:"sliceUpDownLeft",text:"Slice - Up Down Left"},
  {value:"slideInLeft",text:"Slice In - Left"},
  {value:"slideInRight",text:"Slide in - Right"},
  {value:"boxRandom",text:"Box - Random"},
  {value:"boxRain",text:"Box - Rain"},
  {value:"boxRainReverse",text:"Box - Rain Reverse"},
  {value:"boxRainGrow",text:"Box - Rain Grow"},
  {value:"boxRainGrowReverse",text:"Box - Rain Grow Reverse"}
  ];
  createInput(options);

  var options = {type:'select',title:'Delay',name:'delay', value:json.delay,container:'.eslot[name=appearance]'};
  options.options = [
  {value:3000,text:"3 Seconds"},
  {value:5000,text:"5 Seconds"},
  {value:8000,text:"8 Seconds"},
  {value:10000,text:"10 Seconds"}
  ];

  createInput(options);
  //if(json.border == undefined){json.border={type:"none",color:"888888",color_enabled:false};}
  var options = {type:'select',title:'Border',name:'border-type',value:json.border.type,container:'.eslot[name=appearance]'};
  options.options = [{value:"none",text:"None"},{value:"gradient",text:"Gradient"},{value:"gradient2",text:"Gradient-Secondary"},{value:"split",text:"Split"},{value:"slice",text:"Slice"}];
  createInput(options);
  
  
  var options = {type:'custom',title:'Size',name:'size',value:json.size,container:'.eslot[name=appearance]'};
  options.options = [
    //{value:"icon",text:"Icon","wclass":"common-custom eimagesize-icon"},
    {value:"small",text:"Small","wclass":"common-custom eimagesize-small"},
    {value:"orig",text:"Full","wclass":"common-custom eimagesize-full"}
  ];
  createInput(options);
  var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
  options.options = buffet.widths;
  createInput(options);
  $('.sc-group[name=advanced] span').html("Advanced");

  $('#editor [name=content] div').append($('<div>').html("Add Slide").append($('<img>').attr('src','http://'+CONTENT_LOCATION+'/img/add.png').css({margin:"0px 0px 0px 5px"})).css({cursor:"Pointer","color":"#f8f8f8","text-align":"center",padding:"1px"}).click(function(){
	$('.selected').data('json').items.push({"image_id":177,"ext":"png","text":"","page":"none","url":""});
	widgets["Slideshow"].createEditor($('.selected').data('json'));
	update();
  }));

  var insertImage = function(){ 
  $(this).children('img').remove();
    var img = $('<img>').attr('src',"http://"+CONTENT_LOCATION+"/upload/images/"+$(this).find('option:selected').attr('val')+"-icon.jpg").css({"border":"solid 2px #666","padding":"2px","margin-top":"5px"}).attr("align","right");
	img.appendTo(this);
  
  };
  var showurl = function(){
  var val = $(this).find('option:selected').attr('val');
  if( val == "-1")
  {
    $(this).prev().show();
  }else{
    $(this).prev().hide();
  }
  }
for(var i in json.items){
  //$('#options').append($('<div>').addClass('sc-divider').css({"margin":"5px 5px 10px"}));
  var options = {type:"image",group:'group_'+i,title:'Image',name:'id'+i,value:json.items[i].image_id,"update":insertImage,container:'.eslot[name=content]'};
  createInput(options).each(insertImage).children('select').css({width:"200px"});

  
  var options = {type:"text",group:'group_'+i,title:"URL",name:"url"+i,value:json.items[i].url,container:'.eslot[name=content]'};
  createInput(options).children('[type=text]').css({width:"200px"});
  
  var options = {type:"page",group:'group_'+i,title:"Page Link",name:"page"+i, value:json.items[i].page,"update":showurl,container:'.eslot[name=content]'};
  createInput(options).each(options.update);
  
  var options = {type:"text",group:'group_'+i,title:"Caption",name:"text"+i,value:json.items[i].text,container:'.eslot[name=content]'};
  createInput(options).children('[type=text]').css({width:"200px"});
  $('[name=group_'+i+']').append($('<img>').attr('src','http://'+CONTENT_LOCATION+'/img/delete.png').attr('name',i).addClass('remove-group').css({position:"absolute",top:"-8px",left:"0px",cursor:"pointer"}).click(function(){
    $('.selected').data('json').items.splice($(this).attr('name'),1);
    widgets["Slideshow"].createEditor($('.selected').data('json'));
    update();
  }));
  
}
};
wSlideshow.getJS = function(json){
return "<script>$('.slider').nivoSlider({effect:'"+json.trans+"', slices:10,animSpeed:500,pauseTime:"+json.delay+",startSlide:0,directionNav:false,directionNavHide:true,controlNav:false,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch: '.jpg',controlNavThumbsReplace: '_thumb.jpg',keyboardNav:false,pauseOnHover:true,manualAdvance:false,captionOpacity:0.7});</script>";

};
wSlideshow.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
div.addClass(json.width);
var slider = $('<div>').addClass('slider').attr('transition',json.trans);//.attr('id','slider')
var sliderheight = 0;
var sliderwidth = 0;

for(var i in json.items){
  var img = $('<img>').attr('src',"http://"+CONTENT_LOCATION+"/upload/images/"+json.items[i].image_id+"-"+json.size+"."+json.items[i].ext);
  
  if(json.items[i].text.length >0){  
    img.attr('title',"#caption_"+json.items[i].image_id);//.load(function() {$(this.parentNode).attr('width',this.width+'px');});
  
    var caption = $('<div>').addClass('nivo-html-caption').attr('id',"caption_"+json.items[i].image_id).html("<b>"+json.items[i].text+"</b>").appendTo(div); 
  }
  if(json.items[i].page != "none")
  {
   var link = $('<a>');
   if(json.items[i].page == "-1")
   {
    if(json.items[i].url.length>0)
	{
    link.attr('href',json.items[i].url);
	}
   }else{
     if(isNaN(json.items[i].page)){
       link.attr('href',"/"+json.items[i].page).attr('rel',json.items[i].page).addClass('self-link-premade');
     }else{
       link.attr('href',"/page/"+json.items[i].page).attr('rel',json.items[i].page).addClass('menu-subitem');
     }
   }
   link.append(img).appendTo(slider);
  }
  else
  {
     img.appendTo(slider); 
  }


if(json.items[i].height>sliderheight){sliderheight = json.items[i].height;};
if(json.items[i].width>sliderwidth){sliderwidth = json.items[i].width;};

}

var border = $('<div>');
border.addClass(json.border.type);
border.append($('<div>').addClass('first'));
border.append($('<div>').addClass('second'));
slider.attr('style',"width:"+sliderwidth+"px;height:"+sliderheight+"px;");
border.append(slider);
div.append(border);
if(!publishing){
slider.nivoSlider({effect:json.trans
, slices:10
,animSpeed:500
,pauseTime:json.delay
,startSlide:0
,directionNav:false
,directionNavHide:true
,controlNav:false
,controlNavThumbs:false
,controlNavThumbsFromRel:false
,controlNavThumbsSearch: '.jpg'
,controlNavThumbsReplace: '_thumb.jpg'
,keyboardNav:false
,pauseOnHover:true
,manualAdvance:false
,captionOpacity:0.7});//</script>");//end add slider
}
return div;};
loadWidget(wSlideshow);


  var needToConfirm = false;
  var contentStructrue = {color:"333333",font_family:"Verdana, Geneva, sans-serif",font_size:"14"};
  var contentOptions = {};

/*  window.onbeforeunload = confirmExit;
  function confirmExit()
  {
    if (needToConfirm)
      return "You are about to leave this page, you appear to have unsaved data that will be lost. Please save before leaving if you do not wish to do so.";
  }
*/
var dragged = false;
var pageid = null;
var widgets = {};
var buffet = {
images:[{value:"-1",text:"NO PICTURE"},{value:"0",text:"Person Silhouette",ext:"png",width:"200",height:"200",width_small:"200",height_small:"200"}
<?
global $mySite;
  $pictures = $mySite->get_pictures();
  foreach ($pictures as $key => $picture)
  {
    echo ',{value:"'.$picture['id'].'",text:"'.$picture['name'].'",ext:"'.$picture['extension'].'",width:"'.$picture['width'].'",height:"'.$picture['height'].'",width_small:"'.$picture['width_small'].'",height_small:"'.$picture['height_small'].'"}';
  }
?>
],
files:[{value:"0",text:"No File"}
<?
global $mySite;
  $files = $mySite->get_files();
  foreach ($files as $key => $file)
  {
    echo ',{value:"'.$file['id'].'",text:"'.$file['nam'].'"}';
  }
?>
],
widths:[{value:"full",text:"Full"},{value:"fourth",text:"One Quarter"},{value:"third",text:"One Third"},{value:"fourth2",text:"Half"},{value:"third2",text:"Two Thirds"},{value:"fourth3",text:"Three Quarters"}],
fonts:[{value:"Verdana, Geneva, sans-serif",text:"Sans Serif",size:"14"},{value:"Georgia, 'Times New Roman', Times, serif",size:"16",text:"Serif"}],
people:[{value:"-1",text:"None"}
<?
$approved_members = $mySite->list_members(true);

  //create an option for each person with the id set to the person id
  foreach($approved_members as $person_id){
    try{
    if($person_id != null){
    $person = new Person();
    $person->get_from_person_id($person_id);
    echo ',{value:"'.$person->person_id.'",text:"'.$person->first_name.' '.$person->last_name.'"}';
    }
    }catch(Exception $e){}
  }
?>
],
categories:[{value:-1,text:"None"}
<?
global $categories;
foreach($categories as $cat->category_id => $cat->title){echo ',{"value":'.$cat->category_id.',"text":"'.$cat->title.'"}';}?>

],
pages:[{value:"none",text:"No Link"},
       {value:"-1",text:"URL"},
       {value:"home",text:"Home"},
       {value:"calendar",text:"Calendar"},
       {value:"staff",text:"Staff"},
       {value:"sermons",text:"Sermons"},
       {value:"blogs",text:"Blog"},
       {value:"donations",text:"Donate"},
       {value:"directory",text:"Directory"},
       {value:"prayer",text:"Prayer"}
<?
    $myPage = new Page();
    $page_ids = $mySite->list_pages();
    if(count($page_ids)>0){
      foreach ($page_ids as $page_id)
      {
          $myPage->get_from_page_id($page_id);
          echo ',{value:"'.$myPage->page_id.'",text:"'.$myPage->title.'"}';
      }
    }

?>
]
};
function fromName(name){
   var item = $('[name='+name+']');
   if(item.length != 0){
     var toReturn = {};
     if(item[0].nodeName == "SELECT"){ 
       toReturn = jQuery.extend(true, {}, item.children('option:selected').data("json"));
     }else{
       if($(item[0].parentNode).attr('rel') == "color"){
         toReturn.value = item.val();
         toReturn.enabled = $(item).siblings('.colorBox').is(':visible');
       }else{
         if($(item[0].parentNode).attr('rel') == "custom"){
           toReturn = jQuery.extend(true, {}, item.children('.custom-selected').data("json"));
         }else{
           return item.val();
         }
       }
     }
   }else{
     toReturn = null;
   }
   return toReturn;
}

  function getValue(json)
  {
	if(json.group != undefined)
	{
	  var item = $('#'+json.group+' [name='+json.name+']');
	}else{
      var item = $('[name='+json.name+']');
	}
	if(item[0].nodeName == "SELECT")
    {
      return jQuery.extend(true, {}, item.children('option:selected').data("json"));//item.children('option:selected').data("json");//.attr('val');
    }
      else
    {
      return item.val();
    }
  }

  function createText(options){
    var title = $('<div>').addClass('sc-editor-input-title').html(options.title+": ");
    var input = $('<input>').attr('type','text').attr('name',options.name).attr('value',options.value).blur(update);
    var div = $('<div>').addClass('sc-editor-input').append(title).append(input);
	if(options.group != undefined)
	{
	  if($('[name='+options.group+']').length == 0){$(options.container).append($('<div>').attr('name',options.group).addClass('sc-group').append($('<span>')));}
	  $('[name='+options.group+']').append(div);
	}else{
	  $(options.container).append(div);
	}
    if(options.update != undefined){div.change(options.update)};//.each(options.update);}
	return div;
  }
  function createSelect(options){
    var title = $('<div>').addClass('sc-editor-input-title').html(options.title+": ");
    var select = $('<select>').attr('name',options.name);

	for(var i in options.options)
	{
	  $('<option>').attr('val',options.options[i].value).html(options.options[i].text).appendTo(select).data("json",options.options[i]);
	}
	select.children('[val="'+options.value+'"]').attr("selected","selected");
        var div = $('<div>').addClass('sc-editor-input').append(title).append(select);
	div.change(update);
	if(options.group != undefined)
	{
	  if($('[name='+options.group+']').length == 0){$(options.container).append($('<div>').attr('name',options.group).addClass('sc-group').append($('<span>')));}
	  $('[name='+options.group+']').append(div);
	}else{
	  $(options.container).append(div);
	}
    if(options.update != undefined){div.change(options.update);}//.each(options.update);}
	return div;
  }
  function createCustom(options){
    var title = $('<div>').addClass('sc-editor-input-title').html(options.title+": ");
    var select = $('<div>').attr('name',options.name);

	for(var i in options.options)
	{
          if(options.options[i].content == undefined){options.options[i].content=null;}
	  $('<div>').attr('val',options.options[i].value).addClass("custom "+options.options[i].wclass).attr('title',options.options[i].text).html(options.options[i].content).appendTo(select).data("json",options.options[i]);
	}

	select.children('[val='+options.value+']').addClass("custom-selected");
	select.children().click(function(){
           $(this).siblings().removeClass("custom-selected");
           $(this).addClass("custom-selected");
        });

        var div = $('<div>').addClass('sc-editor-input').append(title).append(select);
	div.change(update);


	if(options.group != undefined)
	{
	  if($('[name='+options.group+']').length == 0){$(options.container).append($('<div>').attr('name',options.group).addClass('sc-group').append($('<span>')));}
	  $('[name='+options.group+']').append(div);
	}else{
	  $(options.container).append(div);
	}

    if(options.update != undefined){div.click(options.update);}else{div.click(update);}
	return div;
  }

function createColor(options){
  var colorBox = $('<div>').addClass('colorBox').attr('style','width:75px;height:14px;position:relative;top:2px;left:0px;cursor:pointer;border:solid 1px #444;').css({"background-color":"#"+options.value});

  var temp = createText(options).append(colorBox);
  temp.children('input').attr('style','width:0px;min-width:0px;padding:0px;border:0px;margin-left:2px').attr('maxlength','6').ColorPicker({
  onSubmit: function(hsb, hex, rgb, el) {
    $(el).val(hex.toUpperCase());
    $(el).ColorPickerHide();
    mainToHtml(mainToJSON());
	colorBox.css({"background-color":"#"+hex});
	update();
  },
  onBeforeShow: function () {
    $(this).ColorPickerSetColor(this.value);
  }
  })
  .bind('keyup', function(){
    $(this).ColorPickerSetColor(this.value);
  });

  colorBox.click(function(){temp.children('[type=text]').click()});

//  var check = $('<input>').attr('type','checkbox').css({width:"20px","min-width":"20px",cursor:"pointer",display:"none"});
  var question = $('<div>').addClass('question').html("&nbsp;Use Default?").css({cursor:"pointer"});
  if(options.enabled){
//	check.attr("checked","checked");
//  temp.append(check).append(question);

  temp.append(question);
  }else
  {
//  temp.append(check).append(question.html("Customize?"));
  temp.append(question.html("Customize?"));
    colorBox.hide();
  temp.children('[type=text]').hide();
  }
  var toggle = function(){
//  if(temp.children('[type=checkbox]').is(':checked')){
  if(!colorBox.is(':visible')){
    temp.children('[type=text]').show();
    colorBox.show();
	question.html("&nbsp;Use Default?");
    colorBox.click();
  }else{
    colorBox.hide();
    temp.children('[type=text]').hide();
	question.html("Customize?");
  }
	update();
  };
  question.click(function(){
//check.click();
toggle();

  });
  //check.click(toggle);
  return temp;
}
function createInput(options)
{
switch(options.type){
  case "select":
    temp = createSelect(options);
	break;
  case "image":
    options.options = buffet.images;
    temp = createSelect(options);
	break;
  case "file":
    options.options = buffet.files;
    temp = createSelect(options);
	break;
  case "page":
    options.options = buffet.pages;
    temp = createSelect(options);
	break;
  case "font":
    options.options = buffet.fonts;
    temp = createSelect(options);
	break;
  case "color":
    temp = createColor(options);
	break;
  case "custom":
    temp = createCustom(options);
	break;
  case "text":
    temp = createText(options);
    break;
  default:
    divider = $('<div>').addClass('sc-divider').css({margin:"25px 5px 3px",width:"390px",position:"relative",height:"0px"});
    text = $('<div>').html(options.title).css({position:"absolute",top:"-20px",left:"10px"}).appendTo(divider);
    temp = $('#options').append(divider);
}
if(temp !=undefined){temp.attr('rel',options.type);
  return temp;}
}
function widget(initial){
  this.default_obj = initial;
  if(this.display == undefined){this.display = initial.type;}
  widgets[initial.type] = this;

}
function loadWidget(widget){
  if(widget.wclass!=undefined){
    $('<div>').addClass('widget').attr('name',widget.default_obj.type).append($('<div>').addClass("img "+widget.wclass)).append($('<div>').html(widget.display)).appendTo('#leftbar [name='+widget.group+'] .container');
  }else{
    $('<div>').addClass('widget').attr('name',widget.default_obj.type).append($('<img>').attr('src',"http://<?=CONTENT_LOCATION?>/img/"+widget.image)).append($('<div>').html(widget.display)).appendTo('#leftbar [name='+widget.group+'] .container');
  }

$('#leftbar .widget[name='+widget.default_obj.type+']').draggable({ revert: true, distance: 10, start: function () { dragged = true; }, stop: function () { dragged = false;   } });
$('#leftbar .widget[name='+widget.default_obj.type+']').click(function(){select(widgets[$(this).attr('name')].toHTML(widgets[$(this).attr('name')].default_obj).appendTo("#content"));});

}

widget.prototype.image="<?echo CONTENT_LOCATION?>/img/default.png";
widget.prototype.createEditor = function(json){
  //$('#options').html("");
  needToConfirm = true;
  $('.eslot').html("");
  $('#editor [name=content] div').html("");
  //$('.colorpicker').remove();

  if(widgets[json.type] != undefined){$('#edit-type').html(widgets[json.type].display);}
  return json;};
widget.prototype.toJSON = function(){
  return $(".selected").data("json");
};
widget.prototype.toHTML = function(json,publishing){
var div = $('<div>');
div.attr('name',json.type);
//div.addClass(json.type);
if(!publishing){
  div.append($('<div class="click-prevent">').css({"z-index":"10000",position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px"}));
  div.addClass('widget');
  div.append('<img class="remove-item" src="http://<?=CONTENT_LOCATION?>/img/delete.png" title="Remove"><img class="duplicate-item" src="http://<?=CONTENT_LOCATION?>/img/add.png" title="Duplicate">');
  div.data("json",jQuery.extend(true, {}, widgets[json.type].default_obj));
  div.droppable({ drop: ondivdrop , accept: function () { return true; } });
}
return div;
};

function update(){
   if($('.selected').length>0){
     json = widgets[$('.selected').data('json').type].toJSON();
     div = widgets[json.type].toHTML(json).data("json",json).addClass('selected');
     $('.selected').replaceWith(div);
     if(widgets[json.type].runJS){
       $('body').append(widgets[json.type].getJS(json));
     }
    //viewItem(div);
     return div;
  }
};


function mainToHtml(json){
  if(json == undefined || json.color == undefined){
    json = mainToJSON();
   }
  $('#content').attr('class','custom-page '+json.border).attr('style','color:#'+json.color+';font-family:'+json.font_family+';font-size:'+json.font_size+'px');
}
function mainToJSON(){
  json = contentStructrue;
  opts = contentOptions;
  json.color = fromName('main_color').value;
  json.font_family = fromName('main_family').value;
  json.font_size = fromName('main_family').size;
  opts.title = fromName('main_title');
  opts.menu = fromName('main_menu').value;
  opts.visibility = fromName('visibility').value;
  opts.category_id = fromName('main_categories').value;
  opts.person_id = fromName('main_people').value;
  json.border = fromName('main_border').value;
  return json;
  }
function mainCreateEditor(){
  widget.prototype.createEditor({type:"Main"});
  json = contentStructrue;
  opts = contentOptions;
  $('#appearance-container').html('');
  $('#options-container').html('');
  $('#header-form').html("");

  var options = {type:"text",title:'',name:'main_title',value:opts.title,update:mainToHtml,container:'#sc-page-header .title'};
  createInput(options);
  var options = {type:"select",title:'List page under',name:'main_menu',value:opts.menu,update:mainToHtml,container:'#options-container'};
  options.options = [
    {value:0,text:"No Menu","wclass":"menu-custom",content:"No Menu"},
    {value:1,text:"Ministries","wclass":"menu-custom",content:"Ministries"},
    {value:2,text:"Info","wclass":"menu-custom",content:"Info"},
    {value:3,text:"Visitors","wclass":"menu-custom",content:"Visitors"},
    {value:4,text:"Resources","wclass":"menu-custom",content:"Resources"}
  ];
  createInput(options);

  var options = {type:"select",title:'Visibile to',name:'visibility',value:opts.visibility,update:mainToHtml,container:'#options-container'};
  options.options = [
    {value:1,text:"Everyone","wclass":"menu-custom",content:"All"},
    {value:2,text:"Members Only","wclass":"menu-custom",content:"Members Only"},
  ];
  createInput(options);

  var options = {type:"select",title:'Owner',name:'main_people',value:opts.person_id,update:mainToHtml,container:'#options-container'};
  options.options = buffet.people;
  createInput(options);
  var options = {type:"select",title:'Categories',name:'main_categories',value:opts.category_id,update:mainToHtml,container:'#options-container'};
  options.options = buffet.categories;
  createInput(options);
  var options = {type:"select",title:'Page Style',name:'main_border',value:json.border,update:mainToHtml,container:'#appearance-container'};
  options.options = [{value:'default',text:'Default'},{value:'none',text:'No-Border'},{value:'fill',text:'Fill'}];
  createInput(options);
  var options = {type:"font",title:'Font-Family',name:'main_family',value:json.font_family,update:mainToHtml,container:'#appearance-container'};
  createInput(options);

  var options = {type:'color',title:"Page Color",name:"main_color",value:json.color,enabled:true,update:mainToHtml,container:'#appearance-container'};
  createInput(options);
  $('#appearance-container .question').hide();

}




function select(item){
//if($('.selected').length>0){newitem = update();}
//if((item!=null)&&(item.data('json') == null)){item = newitem;}
  $('#content .widget').removeClass('selected');
  $('.eslots').html("");
  $('#edit-type').html("");

  if((typeof item != "undefined")&& (item.data('json') != null)){
    item.addClass('selected');
    widgets[item.data('json').type].createEditor(item.data('json'));
    if(!$('#widget-editor').is(":visible")){
      $('#widget-editor').show('slide', {direction: 'down'},350,function(){viewItem($('.selected'))});
    }
    //else{viewItem(item);}
  }
}


function viewItem(item){
  /*var position = $('#widget-editor').offset();
  var itemposition = $(item).offset();
  var top = position.top-$('body').scrollTop();
  $('body').scrollTop(itemposition.top+$(item).outerHeight(true)-top);*/
}

function ondivdrop(event, ui){
  if(dragged){
    select(widgets[ui.draggable.attr('name')].toHTML(widgets[ui.draggable.attr('name')].default_obj).insertBefore(event.target));
    dragged = false;  
  }
}

function pinWidgets(){
var position = $('#holder').offset();
var top = position.top-$('body').scrollTop();
var left = position.left;
$('#holder').css({position:'fixed',top:top,left:'auto','z-index':'20000',display:'inline-block'});
}

$('#leftbar > div.group .title').live("click",function(){
  $(this).siblings().toggle("blind",null,300);
});

pageItems = null;
function loadPage(){


    for(var i in pageItems){
      pageItems[i] = jQuery.extend(true, {},widgets[pageItems[i].type].default_obj, pageItems[i]);
      widgets[pageItems[i].type].toHTML(pageItems[i]).data('json',pageItems[i]).appendTo("#content");
     if(widgets[pageItems[i].type].runJS){
       $('body').append(widgets[pageItems[i].type].getJS(pageItems[i]));
     }

    }

}

$(".duplicate-item").die();
$(".remove-item").live("click",function(event){
  reduping = true;
  $(this.parentNode).remove();
  $('#widget-editor').fadeOut();
});

$(".duplicate-item").live("click",function(event){
  reduping = true;
  var jsonClone = jQuery.extend(true, {}, $(this.parentNode).data("json"));
  var divClone = $(this.parentNode).clone();
  divClone.data('json',jsonClone);
  divClone.removeClass('selected').insertBefore(this.parentNode);

});

$(document).ready(function(){
//pageid = document.location.hash.substr(1);
  if (typeof window.history.pushState == 'function') {
    pageid=$.url().segment(-1);
  }else{
    pageid=$.url().fsegment(-1);
  }
  $('body').addClass('building');
//  $("#sc-sidebar-container").html('<div id="holder"><div id="leftbar"></div></div>');

  $('#cp-content').html('<div id="sc-page-header"><div class="title global-form"></div></div><div id="page"><div id="content" class="custom-page"></div><div class="start-widget">Drop widget here...</div></div>');
  $('.styleable[name=s3]').before('<div id="widget-editor"><div id="background-fill"></div><div style="width:1002px;margin:0px auto"><div id="editor"><div name="content" style="width:420px">Content<div></div></div><div style="width:301px;">Appearance</div><div id="edit-type" style="width:205px"></div><div id="close-widget-editor">DONE</div></div><div style="border:solid;border-width:1px 0px;border-color:#000 transparent #555"></div><div id="options"></div><div class="eslot" name="content"></div><div class="eslot" name="appearance"></div><div class="eslot" name="other"></div></div></div>');

  $('<div>').attr('id','buttons').insertBefore('#sc-header');
  $('#buttons').append('<div name="option" class="set"><div id="option" class="button">Options<span class="button-down ui-icon ui-icon-triangle-1-s"></span></div><div id="options-container"></div></div>');
  $('#buttons').append('<div name="appear"><div id="appearance" class="button">Appearance<span class="button-down ui-icon ui-icon-triangle-1-s"></span></div><div id="appearance-container"></div></div>');
  $('#buttons').append('<div id="preview" class="button">Publish/Preview</div><a id="page-go" class="button" href="">Visit Page</a>');

$('#option').click(function(){
  $('#options-container').toggle();
});
$('#appearance').click(function(){
  $('#appearance-container').toggle();
});

  $('[name=option]').bind("clickoutside",function(){$('#options-container').hide();});
  $('[name=appear]').bind("clickoutside",function(){$('#appearance-container').hide();});



$("#widget-editor").hover(function(){$('body').scroll(function(event){event.preventDefault();})},function(){$('body').scroll(null)});
$('#holder').draggable({handle:"div.title"});

$(document).click(function(event) { 
    if($(event.target).parents().index($('#page')) == -1) {
        if($('#page').is(":visible")) {
if(!$('#widget-editor').is(":visible")){

            select();
}
        }
    }        
});

$("#close-widget-editor").click(function(){$('#widget-editor').fadeOut();});
//$("#content a").live("click",function(event){event.preventDefault();});

//$('#leftbar').append($('<div>').addClass('group').attr('name','basics').html('<div class="title">Basics</div>').append($('<div>').addClass('opened container')));
//$('#leftbar').append($('<div>').addClass('group').attr('name','steepleconnect').html('<div class="title">SteepleConnect</div>').append($('<div>').addClass('container')));
//$('#leftbar').append($('<div>').addClass('group').attr('name','external').html('<div class="title">Other</div>').append($('<div>').addClass('container')));

scripts = [];
scripts.push('http://'+CONTENT_LOCATION+'/markitup/jquery.markitup.js');
scripts.push('http://'+CONTENT_LOCATION+'/markitup/sets/SC/set.js');

scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_heading.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_paragraph.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_list.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_divider.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_image.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_slideshow.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_youtube.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_facebook.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_map.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_comments.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_file.js');
scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_bible.js');
//scripts.push('http://'+CONTENT_LOCATION+'/js/page_builder/w_social.js');


expectedScripts =0;
for(var i in scripts){
  expectedScripts++;
  $.getScript(scripts[i],function(script, textStatus, jqXHR){
expectedScripts--;
if(expectedScripts == 0){
if(pageItems != null){
  loadPage();
}
}
});
//$('body').append("<script src='"+scripts[i]+"'><\/script>");
}






/*var j = 0;
for(var i in widgets){
  if(widgets[i].wclass!=undefined){
    $('<div>').addClass('widget').attr('name',i).append($('<div>').addClass("img "+widgets[i].wclass)).append($('<div>').html(widgets[i].display)).appendTo('#leftbar [name='+widgets[i].group+'] .container');
  }else{
    $('<div>').addClass('widget').attr('name',i).append($('<img>').attr('src',"http://<?=CONTENT_LOCATION?>/img/"+widgets[i].image)).append($('<div>').html(widgets[i].display)).appendTo('#leftbar [name='+widgets[i].group+'] .container');
  }
  j++;
}*/
  $("#leftbar > div.group .container").hide();
  $("#leftbar > div.group .container.opened").show("blind",null,300);

/*var widgetHeight = j*48;
$('#leftbar').attr('style','height:'+widgetHeight+'px');
if($(window).height() > widgetHeight){
pinWidgets();
}
else{$('#holder').css({position:'relative',left:'auto','z-index':'20000',display:'inline-block'});

//);
}*/
$('#holder').css({position:'fixed',left:'auto','z-index':'20000',display:'inline-block'});



var reduping = false;
//axis:'y'
$('#content').sortable({axis:'y',containment: '#page',placeholder: 'ui-state-highlight',  forcePlaceholderSize: true});
//$('#content').bind("sortstop",function(event,ui){select(ui.item);});

$('#content .widget').live("click",function(){
if(!reduping){select($(this))}else{reduping=false;};
});

$('.start-widget').droppable({ drop: function(event, ui){
  if(dragged){
    select(widgets[ui.draggable.attr('name')].toHTML(widgets[ui.draggable.attr('name')].default_obj).appendTo("#content"));  
  }
} , accept: function () { return true; } });

$('#preview').hover(function(){$('#container').removeClass('building');$('body').removeClass('building');$('#content .widget').removeClass('widget');$('.selected').removeClass('selected').addClass('holding');$('.start-widget').hide();},function(){$('#content > div').addClass('widget');$('.start-widget').show();$('.holding').removeClass('holding').addClass('selected');$('#container').addClass('building');$('body').addClass('building');});

$('#preview').click(function(){
needToConfirm = false;
$('.holding').removeClass('holding');
select();
page_object = {};
page_object.json = {};
page_object.json.page = contentStructrue;
page_object.json.items = [];
$('#content > div').each(function(){
  page_object.json.items.push($(this).data('json'));
});
var tempDiv = $('<div>');
 for(var i in page_object.json.items){
  widgets[page_object.json.items[i].type].toHTML(page_object.json.items[i],true).appendTo(tempDiv);
 }
 var html = tempDiv.html();
  for(var i in page_object.json.items){
//  if(page_object.json.items[i].type=="Slideshow"||page_object.json.items[i].type=="Comments")
  if(widgets[page_object.json.items[i].type].getJS != undefined)
  {
   html+=widgets[page_object.json.items[i].type].getJS(page_object.json.items[i]);
  }
 }

page_object.html = '<div id="content" class="custom-page '+page_object.json.page.border+'"  style="color:#'+page_object.json.page.color+';font-family:'+page_object.json.page.font_family+';font-size:'+page_object.json.page.font_size+'px;">'+html+'</div>';
page_object.options = contentOptions;
//$('#page-go').attr('href',"http://<?=$mySite->short_name?>.<?=PRIMARY_DOMAIN_LOCATION?>/#!/page/"+pageid+"/"+contentOptions.title)
$('#page-go').attr('href',"/page/"+pageid+"/"+contentOptions.title)
  url ="/admin/content/pages/update/"+pageid+"?api";
  $.post(url, {"data": JSON.stringify(page_object)}, function(data){
  alert(data.status);
}, "json");
  });

  url ="/admin/content/pages/get/"+pageid+"?api";

  //Load page
  $.getJSON(url,function(data){
    data=data.data;
    if(data.json == undefined){
      data.json ={};
      data.json.page = {color:"444444",font_family:"Verdana, Geneva, sans-serif",font_size:"14",layout:"none"};
    } 
    data.json.page = jQuery.extend(true, {},{color:"444444",font_family:"Verdana, Geneva, sans-serif",font_size:"14",layout:"none"},data.json.page);
    data.options = jQuery.extend(true, {},{visibility:1},data.options);
    
    contentStructrue = jQuery.extend(true, {},data.json.page);
    contentOptions = jQuery.extend(true, {},data.options);
//    $('#page-go').attr('href',"http://<?=$mySite->short_name?>.<?=PRIMARY_DOMAIN_LOCATION?>/#!/page/"+pageid+"/"+contentOptions.title)
    $('#page-go').attr('href',"/page/"+pageid+"/"+contentOptions.title)
    mainCreateEditor();
    mainToHtml(contentStructrue);
    $("#sc-page-header .title").html();    
pageItems = data.json.items;
if(expectedScripts == 0){
  loadPage();
}
    needToConfirm = false;

 });


});
temp =

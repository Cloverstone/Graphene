var wFile = new widget({type:"File",file_id:"0",file_name:"No File",title:""});
wFile.wclass="file";
wFile.group = "steepleconnect";
wFile.runJS = true;
wFile.toJSON = function(){var json = widget.prototype.toJSON(json);
  json.file_id = fromName('file_id').value;
  json.file_name = fromName('file_id').text;
  json.width = fromName('width').value;
  json.title = fromName('title');
  return json;
};
wFile.getJS = function(json){
  return "";
};


wFile.createEditor = function(json){json = widget.prototype.createEditor(json);
  var options = {type:"file",title:'File',name:'file_id',value:json.file_id,container:'.eslot[name=content]'};
  createInput(options);
  var options = {type:"text",title:'Title',name:'title',value:json.title,container:'.eslot[name=content]'};
  createInput(options);
  var options = {type:"select",title:'Width',name:'width',group:"advanced",value:json.width,container:'.eslot[name=appearance]'};
  options.options = [{value:"full",text:"Full"},{value:"third",text:"One Third"},{value:"fourth2",text:"Half"}];
  createInput(options);  
};

wFile.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.addClass(json.width);
  var temp = json.title;
  if(json.title.length == 0){
    temp = json.file_name;
  }

  var stemp = 'http://'+CONTENT_PROTECTED_LOCATION+'/files/orig/'+json.file_id+'/'+json.file_name+'.pdf';


  div.append('<a data-position="bottom" class="jhovershow file c0_border5 thin_border" id="'+json.file_id+'" style="display:block;min-height:40px;margin:3px;padding:2px;" target="_blank" href="'+stemp+'"><img style="width:40px;height:40px;float:left;margin:0px" src="http://content.steepleconnect.com/upload/images/330-orig.png" /><span style="margin:5px">'+temp+'</span><img class="show_item" style="top:4px;right:4px" src="http://'+CONTENT_PROTECTED_LOCATION+'/files/pre/'+json.file_id+'/preview.gif"/></a>');
  
  return div;
};
loadWidget(wFile);



var upload = new Form.register({type:"upload",value:"/upload/img"});

/*upload.create = function(item){
var label = item.label+':';
if(label == ':'){label = "";}
  return '<div data-type="upload" class="formitem upload" name="'+item.name+'"><div class="sc-hr"><div>'+label+'</div></div><input type="file" name="'+item$
}

upload.callback = function(item,form){
}*/
upload.create = function(item){

uploadContent = "<form id='file_upload_form' method='post' enctype='multipart/form-data' target='upload_target' action='"+item.value+"?api'>";
//uploadContent = "<form id='file_upload_form' method='post' enctype='multipart/form-data' target='upload_target' action='/upload/img?api'>";
          uploadContent += "<input type='hidden' name='id' value='"+item.id+"' /> <input type='hidden' name='MAX_FILE_SIZE' value='67108864' /><span style='line-height:10px;position:relative;top:-5px'>Choose a file to upload: </span><input style='width:250px' name='uploadedfile' type='file' />";
          uploadContent += "<button type='submit' class='btn btn-primary'><i class='icon-upload icon-white'></i> Upload</button></form>";
          uploadContent += "<iframe id='upload_target' name='upload_target' src='' style='display:none;width:30px;height:30px;border:0px solid #fff;'></iframe>";
          uploadContent += "<div name='spinner' style='display:none;height:32px;background:url(http://www.steepleconnect.com/img/ajax-loader.gif) no-repeat 50% 50%'></div>";

  return '<div data-type="upload" class="formitem upload">'+uploadContent+'</div>';

}

upload.parse = function(container){
  return false;
}





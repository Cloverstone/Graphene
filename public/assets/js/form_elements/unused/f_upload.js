var upload = new form_elem({type:"upload"});

upload.create = function(item){

uploadContent = "<form id='file_upload_form' method='post' enctype='multipart/form-data' target='upload_target' action='"+item.value+"?api'>";
          uploadContent += "<input type='hidden' name='id' value='"+item.id+"' /> <input type='hidden' name='MAX_FILE_SIZE' value='67108864' />Choose a file to upload: <input name='uploadedfile' type='file' />";
          uploadContent += "</form>";
          uploadContent += "<iframe id='upload_target' name='upload_target' src='' style='display:none;width:30px;height:30px;border:0px solid #fff;'></iframe>";
          uploadContent += "<div name='spinner' style='display:none;height:32px;background:url(http://"+CONTENT_LOCATION+"/img/ajax-loader.gif) no-repeat 50% 50%'></div>";

  return '<div data-type="upload" class="formitem upload">'+uploadContent+'</div>';



}
upload.value = function(item){
  return  $(item).val();
}


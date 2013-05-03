<?
Modules::register('images');
Router::add_route('/admin/images','images','view','is_approved');
Router::delete('/images/*','images','delete','is_approved');
Router::add_route('/update/images/*','images','update','is_approved');
Router::add_route('/upload/img','images','uploadImg','is_approved');

/**/
class images
{
  public function __construct(){

  }
  public function is_approved(){
    if(session::validate()){
      response::using("admin");
      stencil::$vars["username"] = Cookie::get("user",null,true);
      response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));
      response::$_sessionStatus = "true";
      return true;
    }else{
      response::using("session");
      stencil::$vars["username"] = "Guest";
      response::$_content = stencil::render('../modules/session/views/login.php');
      return false;
    }
  }

  public function delete($args){
    $m = new MongoClient();
    $cursor = $m->app->imgs->remove(array('_id'=>intval($args[0])));
    response::$_script .= '$("#'.$args[0].'.thumb").fadeOut("slow");var counter = $(".dropdown-toggle b");counter.html(parseInt(counter.html())-1);';
  }
  public function update($args){
    $m = new MongoClient();
    $m->app->imgs->update(array('_id'=>intval($args[0])),array('$set'=>array("name"=>$_POST["name"])));
    response::$_script .= '$("#'.$args[0].'.thumb .caption").html("'.$_POST["name"].'");';
    response::$_message = "Updated Successfully!";
  }

  public function view(){
    $m = new MongoClient();
    $cursor = $m->app->imgs->find(array('site_id'=>session::$site['_id']));
    response::$_content .= ' 
    <div class="section-full">
      <div class="section-title green" style="right:0">
        <span class="color"></span>

<span class="menu dropdown pull-right" style="line-height:42px;">
  <a class="dropdown-toggle" data-toggle="dropdown" style="height:35px"><b>'.$cursor->count().'</b><span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
          <li><a data-action="upload_image"><i class="icon-plus"></i> New</a></li>
        </ul>
</span>
        <i class="icon-picture icon-white"></i>
        <div>Images</div>
      </div>
    </div>
    <div style="position:absolute;top:50px;left:5px;right:10px;width:auto;">';
    if($cursor->hasNext()){
      foreach ($cursor as $doc) {
        response::$_content .= stencil::render('../modules/images/views/image.php',$doc);
      }
    }else{
      response::$_content .= '<div><div style="text-align:center;font-weight:bold;margin:10px;padding:10px;border:solid 1px #ddd">No Images Found</div></div>';
    }
    response::$_content .= '</div>';
  }


  public function uploadImg(){
    response::using("raw");
//          $this->file_type = $_FILES['uploadedfile']['type'];
    $m = new MongoClient();
    $img_id = getNextSequence("img_id");
    $img_name_array = explode(".",Upload::filename());
    $img_name = $img_name_array[0];
    $img_ext = end($img_name_array);
    $obj = array(
      "_id" => $img_id,
      "site_id" => session::$site["_id"],
      "ext" => $img_ext,
      "name"=> $img_name
    );

    $m->app->imgs->save($obj);

    $imageUploadPath = "/var/www/public/uploads/img/";
    $file = Upload::move($imageUploadPath,$img_id.".".$img_ext);
    if($file){
      $orig_file = $imageUploadPath.$img_id.".".$img_ext;
      $icon_file = $imageUploadPath."icon_".$img_id.".".$img_ext;
      $small_file = $imageUploadPath."small_".$img_id.".".$img_ext;
//      response::$_script = 'parent.displayMessage("Image Uploaded","OK_'.$icon_file.'");parent.fImage.postUpload("'.$img_id.'.'.$img_ext.'",'.json_encode($obj).');';
      response::$_script = 'parent.displayMessage("Image Uploaded","OK_'.$icon_file.'");parent.$("#content").append('.json_encode(stencil::render("../modules/images/views/image.php",$obj)).');parent.preview.remove();var counter = parent.$(".dropdown-toggle b");counter.html(parseInt(counter.html())+1);';


      $size = getimagesize($orig_file);
      exec("convert $orig_file -resize 100x100 $icon_file");
      if ($size[0] > 300){
        exec("convert $orig_file -resize 300x300 $small_file");
      }else{
        exec("cp $orig_file $small_file");
      }
    }else{
      response::$_script = 'parent.displayMessage("Image Uploading Failed'.$alterror.'","error");';
    }
  }

}
?>

<?
Modules::register('files');
Router::add_route('/admin/files','files','view','is_approved');
Router::delete('/files/*','files','delete','is_approved');

Router::add_route('/files/*','files','fetch');

Router::add_route('/update/files/*','files','update','is_approved');
Router::add_route('/upload/file','files','uploadfile','is_approved');
Router::add_route('/new/file','files','newfile','is_approved');

/**/
class files
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

  public function fetch($args){
    if(isset($_GET['ajax'])){
     response::$_script .= 'window.location = "/files/'.$args[0].'";';
    }else{
    response::$render = false;
    $parts = explode(".",$args[0]);

    if(is_numeric($parts[0])){
      $temp = db::app('files')->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($parts[0]),"ext"=>$parts[1]));
    }else{
      $temp = db::app('files')->findOne(array("site_id"=>session::$site["_id"],"name"=>$parts[0],"ext"=>$parts[1]));
    }
      $file_path = "../protected/uploads/file/".$temp['_id'].".".$temp['ext'];
      if(file_exists($file_path)){
        Serve::dump_file($file_path,0,$temp['name'].".".$temp['ext']);
      }else{
        response::$_message = "File not found";
      }
    }
  }

  public function delete($args){
    $m = new MongoClient();
    $cursor = $m->app->files->remove(array('_id'=>intval($args[0])));
    response::$_script .= '$("#'.$args[0].'").fadeOut("slow");';
  }
  public function update($args){
    $m = new MongoClient();
    $m->app->files->update(array('_id'=>intval($args[0])),array('$set'=>array("name"=>$_POST["name"])));
    response::$_script .= '$("#'.$args[0].'.thumb .caption").html("'.$_POST["name"].'");';
    response::$_message = "Updated Successfully!";
  }

  public function view(){
    $params['color'] = "purple";
    $params['title'] = "Files";
    $params['icon']  = "folder-open";
    $params['stencil'] = "../modules/files/views/file.php";
    $params['menu_items'][] = '<li><a data-action="upload_file"><i class="icon-plus"></i> New</a></li>';
    $params['empty'] = "No files Found";
    $m = new MongoClient();
    $params['cursor'] = $m->app->files->find(array('site_id'=>session::$site['_id']));
    response::$_content .= stencil::render('../modules/admin/views/common_list.php',$params);
  }


  public function uploadfile(){
    response::using("raw");
    $m = new MongoClient();
    $file_id = getNextSequence("file_id");
    $file_name_array = explode(".",Upload::filename());
    $file_name = $file_name_array[0];
    $file_ext = end($file_name_array);
    $obj = array(
      "_id" => $file_id,
      "site_id" => session::$site["_id"],
      "ext" => $file_ext,
      "name"=> $file_name
    );

    $m->app->files->save($obj);

    $fileUploadPath = "/var/www/protected/uploads/file/";
    $file = Upload::move($fileUploadPath,$file_id.".".$file_ext);
    if($file){
      response::$_script = 'parent.displayMessage("Image Uploaded","OK_'.$icon_file.'");parent.fImage.postUpload("'.$file_id.'.'.$file_ext.'",'.json_encode($obj).');';
    }else{
      response::$_script = 'parent.displayMessage("Image Uploading Failed'.$alterror.'","error");';
    }
  }

  public function newfile(){

    $m = new MongoClient();
    $file_id = getNextSequence("file_id");
//  $file_id = "test";
    $file_name_array = explode(".",end(explode("/",str_replace ("%20"," ",$_POST['url']))));
    $file_name = $file_name_array[0];
    $file_ext = end($file_name_array);
    $obj = array(
      "_id" => $file_id,
      "site_id" => session::$site["_id"],
      "ext" => $file_ext,
      "name"=> $file_name
    );

    $m->app->files->save($obj);

    $fileUploadPath = "/var/www/protected/uploads/file/";
    exec("curl ".$_POST['url']." >> ".$fileUploadPath.$file_id.".".$file_ext);

//response::$_message = "curl ".$_POST['url']." ".$fileUploadPath.$file_id.".".$file_ext;
//    $file = Upload::move($fileUploadPath,$file_id.".".$file_ext);

/*    if($file){
      response::$_script = 'parent.displayMessage("Image Uploaded","OK_'.$icon_file.'");parent.fImage.postUpload("'.$file_id.'.'.$file_ext.'",'.json_encode($obj).');';
    }else{
      response::$_script = 'parent.displayMessage("Image Uploading Failed'.$alterror.'","error");';
    }
*/
  }
}
?>

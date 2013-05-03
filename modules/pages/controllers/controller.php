<?
Modules::register('page');
Router::add_route('/page/*','page','display');
Router::get('/publish/page/*','page','publish','is_approved');
Router::get('/publish/page','page','publish','is_approved');
Router::add_route('/fetch/page/*','page','fetch','is_approved');
Router::add_route('/fetch/page','page','fetch','is_approved');
Router::delete('/pages/*','page','delete','is_approved');
Router::add_route('/remove/page/*','page','delete','is_approved');
Router::get('/admin/pages','page','admin','is_approved');

/**/
Widgets::add_widget('dashboard', 'page', 'page', 'dashboard');
Widgets::add_widget('sitemap', 'page', 'page', 'sitemap');

class page
{
  public function __construct(){
    response::using("default");
  }
  public function sitemap(){

    $m = new MongoClient();
    $collection = $m->app->pages;
    $cursor = $collection->find(array("site_id"=>session::$site["_id"]),array("options"=>1));
    foreach ($cursor as $doc) {
$slug = "";
if($doc["options"]["path"] == null){
    $slug = $doc["options"]["title"];
}else{
    $slug = $doc["options"]["path"];
}

    response::$_content .= stencil::render('sitemap_template.php',array(
      "url"=>"http://".session::$site['domain'].'/'.$slug,
      "frequency"=>"daily",
      "priority"=>"1.0"
    ));

   }


  }
  public function is_approved()
  {
    if(session::validate()){
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

  public function admin(){
    response::using("admin");
    response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));

    $params['color'] = "blue";
    $params['title'] = "Pages";
    $params['icon']  = "file";
    $params['stencil'] = "../modules/pages/views/page.php";
    $params['menu_items'][] = '<li><a data-clear="true" href="/builder/#!/"><i class="icon-plus"></i> New</a></li>';
    $params['empty'] = "No Pages Found";
    $m = new MongoClient();
    $params['cursor'] = $m->app->pages->find(array("site_id"=>session::$site["_id"]));

    response::$_content .= stencil::render('../modules/admin/views/common_list.php',$params);
  }
  public function display($args){
    if(isset($_GET['json'])){
      $m = new MongoClient();
      if(is_numeric($args[0])){
        $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
      }else{
        $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("json"=>1,"options"=>1));
        if($temp == null){
          response::error('404');
        }
      }
      response::$_script = json_encode($temp);
    }else{
      stencil::$vars["username"] = Cookie::get("user",null,true);
      if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}
      if(is_numeric($args[0])){
        $temp = db::app('pages')->findOne(array("_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
      }else{
        $temp = db::app('pages')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("html"=>1,"options"=>1,"slug"=>1));
      }
      if($temp != null){
        response::$_content = $temp["html"];
        response::$_title = $temp["options"]["title"];
        response::$_script .= 'actions._edit = function(){window.location = "/builder/#!/'.$temp['slug'].'";}';
      }else{
        response::error('404');
      }
      Tracking::log();
    }
  }

  public function delete($args){
    $m = new MongoClient();
    $cursor = $m->app->pages->remove(array('_id'=>intval($args[0])));
    response::$_script .= '$("#'.$args[0].'").fadeOut("slow");';

  }
  public function fetch($args){
    $m = new MongoClient();
    if(is_numeric($args[0])){
      $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("json"=>1,"options"=>1));
    }
    response::$_script = json_encode($temp);
  }

  public function publish($args){
    $m = new MongoClient();
    $_POST["json"] = json_decode($_POST["json"]);
    $_POST["options"] = json_decode($_POST["options"]);
    if(!is_numeric($_POST["_id"])){
      $_POST["_id"] = getNextSequence("page_id");
    }else{
      $_POST["_id"] = intval($_POST["_id"]);
    }
    $_POST["site_id"]=session::$site["_id"];
    $_POST["options"]->title = $_POST["options"]->title;
if($_POST["options"]->path == null){
    $_POST["slug"] = strtolower(str_replace ("/","",str_replace (" ","_",$_POST["options"]->title)));
}else{
    $_POST["slug"] = strtolower(str_replace ("/","",str_replace (" ","_",$_POST["options"]->path)));
}
    $_POST["last_updated"] = time();
    $m->app->pages->save($_POST);

    response::$_script = 'descriptor._id='.$_POST["_id"].';';
    response::$_message = "Successfully Saved page: ".$_POST["options"]->title.".";
  }
  public function dashboard(){

    $m = new MongoClient();
    $collection = $m->app->pages;
    $cursor = $collection->find(array("site_id"=>session::$site["_id"]))->sort(array("last_updated"=>-1))->limit(10);
    response::$_content .= '<div class="widget width4">
      <div class="section-title blue">
        <span class="color"></span>
          <b class="pull-right">'.$cursor->count().'</b>
        <i class="icon-file icon-white"></i>
        <div>Pages</div>
      </div>
      <div class="widget-content">';
    foreach ($cursor as $doc) {
      response::$_content .= stencil::render('../modules/builder/views/page.php',$doc);
    }
    response::$_content .= '</div></div>';
  }

}
?>

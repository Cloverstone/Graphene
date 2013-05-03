<?PHP
//includes
include_once('config/defines.php');
include_once('router.php');
include_once('assets.php');
include_once('session.php');
include_once('stencil.php');
include_once('widgets.php');
include_once('render.php');
include_once('crypto.php');
include_once('hash.php');
include_once('upload.php');
include_once('cookie.php');
include_once('tracking.php');
include_once('sitemap.php');
//include_once('page.php');
include_once('mongo.php');
include_once('serveFiles.php');
include_once('module.php');

function includeDirectory($module,$dirName){
  if (is_dir('../modules/'.$module.'/'.$dirName)){
    $files = scandir('../modules/'.$module.'/'.$dirName);
    foreach ($files as $file){
      if (is_file('../modules/'.$module.'/'.$dirName.'/'.$file)){
        include_once('../modules/'.$module.'/'.$dirName.'/'.$file);
      }
    }
  }
}

$m = new MongoClient();
$db = $m->app;
session::$site = $db->sites->findOne(array("domain"=>$_SERVER["SERVER_NAME"]));
if(session::$site == null){
  session::$site = $db->sites->findOne(array("domain"=>"adamsmallcomb.com"));
  $subdomain = $URL[count($URL)-3];
  response::using($subdomain);
}
if(isset($_GET['theme'])){session::$site['theme'] = $_GET['theme'];}

if(session::$site['redirect'] != null){
  header("HTTP/1.1 301 Moved Permanently");
  Header( 'Location: http://'.session::$site['redirect'].'/'.implode('/',$PWD));
  exit();
}

// Get Modules
//if(MODULES_AUTO_SCAN){
  if(false){
  $modules = scandir('../modules');
}else{
  $modules = session::$site["modules"];
  $modules[] = "mail";
}

foreach ($modules as $module){
  if (is_dir('../modules/'.$module) && $module[0]!='.'){
//    includeDirectory($module,"views");
    includeDirectory($module,"models");
    includeDirectory($module,"controllers");
  }
}

if(session::validate()){
  if(session::$user['modules'] != null){
foreach (session::$user['modules'] as $module){
  if (is_dir('../modules/'.$module) && $module[0]!='.'){
//    includeDirectory($module,"views");
    includeDirectory($module,"models");
    includeDirectory($module,"controllers");
  }
}
  }
}





$myPWD = explode ('/',$_SERVER['PATH_INFO']);
$PWD = array();
if (count($myPWD) > 0) {
  foreach($myPWD as $piece) {
    if ($piece !='') {
      $PWD[]=$piece;
    }
  }
}

if(!isset($PWD[0])){
  $PWD = explode ('/',session::$site["page_id"]);
}


if(file_exists("../public/root/".$PWD[0])){
  $PWD[1] = $PWD[0];
  $PWD[0] = "root";
  Serve::raw();
}else if(isset($serve_raw[$PWD[0]])){
  if (!isset($PWD[1])) {$PWD[1] = "index.php";}
  Serve::raw();
}else{
  if(!Router::handle_route($PWD)){
    if(response::$_content == ""){
      Router::handle_route(array("page",implode($PWD)));
//      response::using("default");
    }
  }
  response::render();
}

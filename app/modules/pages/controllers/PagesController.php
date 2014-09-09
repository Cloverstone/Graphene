<?php


class PagesController extends BaseController {



  // public function sitemap(){

  //   $m = new MongoClient();
  //   $collection = $m->app->pages;
  //   $cursor = $collection->find(array("site_id"=>session::$site["_id"]),array("options"=>1));
  //   foreach ($cursor as $doc) {
  //   $slug = "";
  //   if($doc["options"]["path"] == null){
  //       $slug = $doc["options"]["title"];
  //   }else{
  //       $slug = $doc["options"]["path"];
  //   }
  //   response::$_content .= stencil::render('sitemap_template.php',array(
  //     "url"=>"http://".session::$site['domain'].'/'.$slug,
  //     "frequency"=>"daily",
  //     "priority"=>"1.0"
  //   ));
  //  }
  // }

  // public function is_approved()
  // {
  //   if(session::validate()){
  //     stencil::$vars["username"] = Cookie::get("user",null,true);
  //     response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));
  //     response::$_sessionStatus = "true";
  //     return true;
  //   }else{
  //     response::using("session");
  //     stencil::$vars["username"] = "Guest";
  //     response::$_content = stencil::render('../modules/session/views/login.php');
  //     return false;
  //   }
  // }

  // public function admin(){
  //   response::using("admin");
  //   response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));

  //   $params['color'] = "blue";
  //   $params['title'] = "Pages";
  //   $params['icon']  = "file";
  //   $params['stencil'] = "../modules/pages/views/page.php";
  //   $params['menu_items'][] = '<li><a data-clear="true" href="/builder/#!/"><i class="icon-plus"></i> New</a></li>';
  //   $params['empty'] = "No Pages Found";
  //   $m = new MongoClient();
  //   $params['cursor'] = $m->app->pages->find(array("site_id"=>session::$site["_id"]));

  //   response::$_content .= stencil::render('../modules/admin/views/common_list.php',$params);
  // }
 // public function display($args){
      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    $page = Page::where("site_id", "=", Config::get('site')['_id'])->orderBy('updated_at', 'DEC')->get();;
    return $page;
    if (Request::wantsJson()) {

    } else {
//       $page = Page::where("slug", "=", "hello_test")->first();
//       //$menuArray = Config::get('menu');
//       $menu = View::make('menu' , array("items" => Config::get('menu')));
//       $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
// //      $content = View::make('content' , $page);
//       return View::make('home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));
    }
  }
 // public function display($args){
      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function home()
  {
    if (Request::wantsJson()) {
      $page = Page::find('0');
      return $page;
    } else {
      $page = Page::bySite()->where("slug", "=", Config::get('site')['homepage'])->first();
      //$page = array('title'=>'none', 'slug'=>'', 'content'=>'');
      //$menuArray = Config::get('menu');
      $menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
//      $content = View::make('content' , $page);
      return View::make('themes/'.Config::get('site')['theme'].'/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));

    }
  }
 // public function display($args){
      /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    if (Request::wantsJson()) {
      $page = Page::find($id);
       return $page;
    } else {
//      $page = Page::where("slug", "=", $id)->first();
      $page = Page::bySite()->where("slug", "=", $id)->first();
     
      //$menuArray = Config::get('menu');
      $menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
//      $content = View::make('content' , $page);
      return View::make('themes/'.Config::get('site')['theme'].'/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));
    }


//    return 'page';
// if(session::validate()){
//     response::$vars["username"] = session::$user['name'];
// }
//     if(isset($_GET['json'])){
//       $m = new MongoClient();
//       if(is_numeric($args[0])){
//         $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
//       }else{
//         $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("json"=>1,"options"=>1));


//         header("Cache-Control: no-cache, must-revalidate");
//         header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
// /*        if($temp == null){
//           response::error('404');
//         }
// */
//       }
//       response::$_script = json_encode($temp);
//     }else{
//       stencil::$vars["username"] = Cookie::get("user",null,true);
//       if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}
//       if(is_numeric($args[0])){
//         $temp = db::app('pages')->findOne(array("_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
//       }else{
//         $temp = db::app('pages')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("html"=>1,"options"=>1,"slug"=>1));
//       }
//       if($temp != null){
//         response::$_content = $temp["html"];
//         response::$_title = $temp["options"]["title"];
//         response::$_script .= 'actions._edit = function(){window.location = "/builder/#!/'.$temp['slug'].'";}';
//         Tracking::log();
//       }
//        /*else{
//         response::error('404');
//       }*/

//     }
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();//::orderBy('updated_at', 'ASC')->get();
    $page = new Page();
    // $page->website_id = 0;
    // $page->agent_id = Auth::user()->id;
    // $page->office_id = Auth::user()->office_id;
    $page->fill( $post_data );
    $page->slug = str_replace(' ', '_', strtolower($page->title));
    $page->site_id = Config::get('site')['_id'];
    $page->save();
    return $page;
  }

  public function update($id)
  {
    $post_data = Input::all();
    $page = Page::bySite()->find($id);
    $page->fill($post_data);
    $page->slug = str_replace(' ', '_', strtolower($page->title));
    $page->save();
    return $page;
  }
  public function delete($args){
    $m = new MongoClient();
    $cursor = $m->app->pages->remove(array('_id'=>intval($args[0])));
    response::$_script .= '$("#'.$args[0].'").fadeOut("slow");';

  }
  public function fetch_json($args){
    $m = new MongoClient();
    if(is_numeric($args[0])){
      $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = $m->app->pages->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("json"=>1,"options"=>1));
    }
    
    response::using('default');
//    response::using("empty");

    //Setup Mustache to load from file in local views folder
    $ms = new Mustache_Engine;
    $loader = new Mustache_Loader_FilesystemLoader('/var/www/modules/pages/views');
    $ms->setLoader($loader);
    
    foreach($temp['json'] as $key=>$item){
      if(file_exists('/var/www/modules/pages/views/'.$item['type'].'.mustache')){
        response::$_content .= $ms->render($item['type'], $item);
      }else{
        response::$_content .= $item['type'];
      }
    }
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
      $_POST["slug"] = strtolower(str_replace ("/", "",str_replace (" ", "_",$_POST["options"]->title)));
    }else{
      $_POST["slug"] = strtolower(str_replace ("/", "",str_replace (" ", "_",$_POST["options"]->path)));
    }
    $_POST["last_updated"] = time();
    $m->app->pages->save($_POST);

    response::$_script = 'descriptor._id='.$_POST["_id"].';';
    response::$_message = "Successfully Saved page: ".$_POST["options"]->title.".";
  }


  public function destroy($id)
  {   
    $page = Page::bySite()->find($id);
    $page->delete();
    return $page;
  }

  // public function dashboard(){
  //   if(session::permission("pages_edit")){

  //   $m = new MongoClient();
  //   $collection = $m->app->pages;
  //   $cursor = $collection->find(array("site_id"=>session::$site["_id"]))->sort(array("last_updated"=>-1))->limit(10);
  //   response::$_content .= '<div class="widget width4">
  //     <div class="section-title blue">
  //       <span class="color"></span>
  //         <b class="pull-right">'.$cursor->count().'</b>
  //       <i class="icon-file icon-white"></i>
  //       <div>Pages</div>
  //     </div>
  //     <div class="widget-content">';
  //   foreach ($cursor as $doc) {
  //     response::$_content .= stencil::render('../modules/builder/views/page.php',$doc);
  //   }
  //   response::$_content .= '</div></div>';
  //   }
  // }

}
?>
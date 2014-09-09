<?php
class FormsController extends BaseController {

  /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function index()
  {
    $CustomForm = CustomForm::bySite()->get();//::orderBy('updated_at', 'DEC')->get();;
    return $CustomForm;
    if (Request::wantsJson()) {

    } else {
    }
  }
  /**
   * Display the specified resource.
   * GET /apps/{id}
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    if(Request::wantsJson()) {
      $CustomForm = CustomForm::bySite()->find($id);
      return $CustomForm;
    } else {
      $CustomForm = CustomForm::where("slug", "=", $id)->first();
      $menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
      return View::make('themes/adams_site/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$CustomForm));
    }
  }
  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $post_data = Input::all();
    $CustomForm = new CustomForm();
    $CustomForm->fill( $post_data );
    $CustomForm->slug = str_replace('/ ', '_', strtolower($CustomForm->title));
    $CustomForm->site_id = Config::get('site')['_id'];
    $CustomForm->save();
    return $CustomForm;
  }

  public function update($id)
  {
    $post_data = Input::all();
    $CustomForm = CustomForm::bySite()->find($id);
    $CustomForm->fill($post_data);
    $CustomForm->slug = str_replace('/ ', '_', strtolower($CustomForm->title));
    $CustomForm->save();
    return $CustomForm;
  }
  public function delete($args){
    $m = new MongoClient();
    $cursor = $m->app->CustomForms->remove(array('_id'=>intval($args[0])));
    response::$_script .= '$("#'.$args[0].'").fadeOut("slow");';

  }
  public function fetch_json($args){
    $m = new MongoClient();
    if(is_numeric($args[0])){
      $temp = $m->app->CustomForms->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = $m->app->CustomForms->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",implode('',$args)))),array("json"=>1,"options"=>1));
    }
    
    response::using('default');

    //Setup Mustache to load from file in local views folder
    $ms = new Mustache_Engine;
    $loader = new Mustache_Loader_FilesystemLoader('/var/www/modules/CustomForms/views');
    $ms->setLoader($loader);
    
    foreach($temp['json'] as $key=>$item){
      if(file_exists('/var/www/modules/CustomForms/views/'.$item['type'].'.mustache')){
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
      $_POST["_id"] = getNextSequence("CustomForm_id");
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
    $m->app->CustomForms->save($_POST);

    response::$_script = 'descriptor._id='.$_POST["_id"].';';
    response::$_message = "Successfully Saved CustomForm: ".$_POST["options"]->title.".";
  }

  public function destroy($id)
  {   
    $CustomForm = CustomForm::bySite()->find($id);
    $CustomForm->delete();
    return $CustomForm;
  }

}
?>
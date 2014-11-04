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
    // if(Request::wantsJson()) {
      $CustomForm = CustomForm::bySite()->find($id);
      return $CustomForm;
    // } else {
    //   $CustomForm = CustomForm::where("slug", "=", $id)->first();
    //   $menu = View::make('menu' , array("items" => Config::get('menu')));
    //   $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
    //   return View::make('themes/adams_site/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$CustomForm));
    // }
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


  public function form($name){

      $page = CustomForm::bySite()->where("slug","=",$name)->first();
      $page->content = View::make('forms::form_render', $page);
      $menu = View::make('themes/'.Config::get('site')['theme'].'/menu' , array("items" => Navigation::bySite()->select('text', 'target')->get())); 

      //$menuArray = Config::get('menu');
      //$menu = View::make('menu' , array("items" => Config::get('menu')));
      $side_menu = View::make('side_menu' , array("items" => Config::get('side_menu')));
//      $content = View::make('content' , $page);
      return View::make('themes/'.Config::get('site')['theme'].'/home' , array("menu" => $menu, "side_menu" => $side_menu, "page"=>$page));
 
  }

  public function submit($_id){
    $post_data = Input::all();
    $submission = new CustomFormSubmission();
    $submission->fill( $post_data );
    $submission->form = $_id;
    // $CustomForm->slug = str_replace('/ ', '_', strtolower($CustomForm->title));
    // $CustomForm->site_id = Config::get('site')['_id'];
    $submission->save();
    return $submission;
//     response::using("");
//     if(session::validate()){response::$_sessionStatus = "true";}
//     if(isset($_GET['post'])){
//       $_POST = $_GET;
//       unset($_POST['reload']);
//       unset($_POST['ajax']);
//       unset($_POST['post']);
//     }
//     $m = new MongoClient();
//     $_POST["modified"] = time();
//     $_POST["modifiedby"] = session::$user['_id'];
//     if(!isset($_POST["_id"]) || !is_numeric($_POST["_id"])){
//       $_POST["_id"] = getNextSequence("submit_id");
//       $_POST["created"] = $_POST["modified"];
//       $_POST["createdby"] = session::$user['_id'];
//       $m->app->submission->save($_POST);
//     }else{
//       $_id = intval($_POST["_id"]);
//       unset($_POST['_id']);
//       $m->app->submission->update(array("_id"=>$_id),array('$set'=>$_POST));
//     }

//     $form = $m->app->forms->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($_POST['form_id'])),array("json"=>1,"options"=>1,"slug"=>1));
//     if($form['options']['redirect'] != ""){

//       stencil::$vars["username"] = Cookie::get("user",null,true);
//       if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}

//       $temp = db::app('pages')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$form['options']['redirect']))),array("html"=>1,"options"=>1,"slug"=>1));
//       if($temp != null){
//         response::$_content = $temp["html"];
//         response::$_title = $temp["options"]["title"];
//       }else{
//         response::$_script .= 'alert("Thank you for your filling out this form.");';
//       }

//     }else{
// if(isset($_GET['reload'])){
// if(isset($_GET['post'])){
//       response::$_script .= 'reRequest();';
// }else{
//       response::$_script .= 'myModal.remove();reRequest();';
// }
// }else{
//       response::$_script .= 'alert("Thank you for your filling out this form.");';
// }
//     }

// if(!isset($_GET['post'])){

//     $Mailer = new GmailMailer($debug=0);
//     $Mailer->Username = DEFAULT_MAIL_USER;
//     $Mailer->Password = DEFAULT_MAIL_PASS;
//     $Mailer->FromName = session::$site[domain];

//     $emails = explode(',',$form['options']['emails']);
//     foreach($emails as $email){
//       $Mailer->AddBCC($email);
//     }

//     $Mailer->Subject = $form['options']['title'];
//     $Mailer->Body = 'The form '.$form['options']['title'].' has been submitted. View at: http://'.$_SERVER["SERVER_NAME"].'/admin/submissions/'.$form['slug']."\n\n";

//      foreach ($form["json"] as $col) {
//         if($col["label"]){
//           $Mailer->Body .= $col["label"].": ";
//           if($col["options-container"]["options"][$_POST[$col["guid"]]]){
//             $Mailer->Body .= $col["options-container"]["options"][$_POST[$col["guid"]]]["option"]."\n";
//           }else{
//             $Mailer->Body .= $_POST[$col["guid"]]."\n";
//           }
//         }
//       }

//     $Mailer->send_email();
// }
  }




}
?>
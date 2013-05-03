<?
Modules::register('form');
Router::add_route('/form/*','form','display');
Router::add_route('/raw/form/*','form','html','is_approved');
Router::add_route('/forms/submit','form','submit');
Router::add_route('/publish/form','form','publish','is_approved');
Router::add_route('/fetch/form/*','form','fetch','is_approved');
Router::add_route('/fetch/form','form','fetch','is_approved');
Router::add_route('/admin/forms','form','admin','is_approved');
Router::add_route('/admin/submissions/*','form','submissions','is_approved');
Router::add_route('/admin/formcsv/*','form','csv','is_approved');
/**/

class form
{
  public function __construct(){
    response::using("form");
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

  public function submissions($args){
    response::using("admin");
    response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));
    if(is_numeric($args[0])){
      $temp = db::app('forms')->findOne(array("_id"=>intval($args[0])),array("json"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = db::app('forms')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$args[0]))),array("json"=>1,"options"=>1,"slug"=>1));
    }

    response::$_content .=  '<table class="table table-condensed table-striped table-hover"><caption>'.$temp["options"]["title"].'</caption><thead><tr><th>#</th>';

    foreach ($temp["json"] as $col) {
      if($col["label"]){
        response::$_content .= '<th>'.str_replace(" ","&nbsp;",$col["label"]).'</th>';
      }
    }
    response::$_content .= '</tr></thead><tbody>';
    $m = new MongoClient();
    $count = 1;
    $submissions = $m->app->submission->find(array("form_id"=>"".$temp['_id']));
    $submissions->sort(array("_id"=>-1))->limit(10);
    foreach($submissions as $submission){
      response::$_content .= '<tr class="filterable submission" id="'.$submission['_id'].'"><td>'.$count++.'</td>';
      foreach ($temp["json"] as $col) {
        if($col["label"]){
          if($col["options-container"]["options"][$submission[$col["guid"]]]){
            response::$_content .= '<td>'.$col["options-container"]["options"][$submission[$col["guid"]]]["option"].'</td>';
          }else{
            response::$_content .= '<td>'.$submission[$col["guid"]].'</td>';
          }
        }
      }
      response::$_content .= '</tr>';
    }
    response::$_content .= '</tbody></table>';
//    response::$_script .= '$(".submission").click(function(){alert($(this).attr("id"))})';
    response::$_script .= '$(".submission").click(function(){
//var formitems = [];
//$(this).children("td") .each();


    myModal = new modal({title:"Results",
      footer:$("<div>").addClass("btn btn-error").html("Delete"),
      form:{label:"",options:{inline:true},items:[
        {type:"text",label:"Title",name:"title"}
      ]}
      }
    );

    });
';

  }


  public function csv($args){
    response::using("admin");
    response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));
    if(is_numeric($args[0])){
      $temp = db::app('forms')->findOne(array("_id"=>intval($args[0])),array("json"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = db::app('forms')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$args[0]))),array("json"=>1,"options"=>1,"slug"=>1));
    }

    response::$_content .=  '<table class="table table-condensed table-striped table-hover"><caption>'.$temp["options"]["title"].'</caption><thead><tr><th>#</th>';

    foreach ($temp["json"] as $col) {
      if($col["label"]){
        response::$_content .= '<th>'.str_replace(" ","&nbsp;",$col["label"]).'</th>';
      }
    }
    response::$_content .= '</tr></thead><tbody>';
    $m = new MongoClient();
    $count = 1;
    $submissions = $m->app->submission->find(array("form_id"=>"".$temp['_id']));
    foreach($submissions as $submission){
      response::$_content .= '<tr class="filterable submission" id="'.$submission['_id'].'"><td>'.$count++.'</td>';
      foreach ($temp["json"] as $col) {
        if($col["label"]){
          if($col["options-container"]["options"][$submission[$col["guid"]]]){
            response::$_content .= '<td>'.$col["options-container"]["options"][$submission[$col["guid"]]]["option"].'</td>';
          }else{
            response::$_content .= '<td>'.$submission[$col["guid"]].'</td>';
          }
        }
      }
      response::$_content .= '</tr>';
    }
    response::$_content .= '</tbody></table>';
  }


  public function submit(){
    response::using("");
    if(session::validate()){response::$_sessionStatus = "true";}
    $_POST["_id"] = getNextSequence("submit_id");
    $_POST["ts"] = time();

    $m = new MongoClient();
    $m->app->submission->save($_POST);
    $form = $m->app->forms->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($_POST['form_id'])),array("json"=>1,"options"=>1,"slug"=>1));
    if($form['options']['redirect'] != ""){

      stencil::$vars["username"] = Cookie::get("user",null,true);
      if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}

      $temp = db::app('pages')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$form['options']['redirect']))),array("html"=>1,"options"=>1,"slug"=>1));
      if($temp != null){
        response::$_content = $temp["html"];
        response::$_title = $temp["options"]["title"];
      }else{
        response::$_script .= 'alert("Thank you for your filling out this form.");';
      }

    }else{
      response::$_script .= 'alert("Thank you for your filling out this form.");';
    }
    $Mailer = new GmailMailer($debug=0);
    //$Mailer->Username = 'tcortesi';
    //$Mailer->Password = 'password';
    $Mailer->FromName = 'Sonostics';

    $emails = explode(',',$form['options']['emails']);
    foreach($emails as $email){
      $Mailer->AddBCC($email);
    }

    $Mailer->Subject = $form['options']['title'];
    $Mailer->Body = 'The form '.$form['options']['title'].' has been submitted. View at: http://'.$_SERVER["SERVER_NAME"].'/admin/submissions/'.$form['slug']."\n\n";

     foreach ($form["json"] as $col) {
        if($col["label"]){
          $Mailer->Body .= $col["label"].": ";
          if($col["options-container"]["options"][$_POST[$col["guid"]]]){
            $Mailer->Body .= $col["options-container"]["options"][$_POST[$col["guid"]]]["option"]."\n";
          }else{
            $Mailer->Body .= $_POST[$col["guid"]]."\n";
          }
        }
      }

    $Mailer->send_email();
  }

  public function admin(){
    response::using("admin");
    response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));

    $params['color'] = "red";
    $params['title'] = "Forms";
    $params['icon']  = "list-alt";
    $params['stencil'] = "../modules/builder/views/form.php";
    $params['menu_items'][] = '<li><a data-clear="true" href="/builder:forms/#!/"><i class="icon-plus"></i> New</a></li>';
    $params['empty'] = "No Forms Found";
    $m = new MongoClient();
    $params['cursor'] = $m->app->forms->find(array("site_id"=>session::$site["_id"]));

    response::$_content .= stencil::render('../modules/admin/views/common_list.php',$params);

  }

  public function display($args)
  {
    response::using("");

    stencil::$vars["username"] = Cookie::get("user",null,true);
    if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}

    if(is_numeric($args[0])){
      $temp = db::app('forms')->findOne(array("_id"=>intval($args[0])),array("html"=>1,"options"=>1,"slug"=>1));
    }else{
      $temp = db::app('forms')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$args[0]))),array("html"=>1,"options"=>1,"slug"=>1));
    }
    if($temp["options"]["s_text"] == ""){
      $temp["options"]["s_text"] = "Submit";
    }
    response::$_content = stencil::render('../modules/forms/views/form.php',$temp);

    response::$_title = $temp["options"]["title"];
    response::$_script .= 'actions._edit = function(){window.location = "/builder:forms/#!/'.$temp['slug'].'";}';

    $url = 'http://api.ipinfodb.com/v3/ip-city/?';
    $locargs['key'] = '20dc0a7df37f608efb4a03e76737aee5b570d30d134f1cf4625f892cb8916717';
    $locargs['ip'] = $_SERVER["REMOTE_ADDR"];
    $locargs['format'] = 'json';

    if(isset($_GET['ajax'])){
      if($_SERVER["SERVER_NAME"]!=$_SERVER["HTTP_REFERER"]){
        $browser = get_browser(null, true);
        $visit = array(
          "platform"=>$browser['platform'],
          "browser"=>$browser['browser'],
          "version"=>$browser['version'],
          "domain"=>$_SERVER["SERVER_NAME"],
          "referer"=>$_SERVER["HTTP_REFERER"],
          "form"=>strtolower(str_replace (" ","_",$args[0]))
        );
//        $m->app->visits->save($visit);
      }
    }
  }

  public function html($args){
    response::using("");
//    stencil::$vars["username"] = Cookie::get("user",null,true);
//    if(session::validate()){response::$vars['account'] = stencil::render('../modules/session/views/account.php');response::$_sessionStatus = "true";}

//    if(is_numeric($args[0])){
      $temp = db::app('forms')->findOne(array("_id"=>intval($args[0])),array("html"=>1,"options"=>1));
//    }else{
//      $temp = db::app('forms')->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$args[0]))),array("html"=>1,"options"=>1,"slug"=>1));
//    }

//    response::$_content = stencil::render('../modules/forms/views/form.php',$temp);
    response::$_data = $temp;

  }

  public function fetch($args){
    $m = new MongoClient();
    if(is_numeric($args[0])){
      $temp = $m->app->forms->findOne(array("site_id"=>session::$site["_id"],"_id"=>intval($args[0])),array("json"=>1,"options"=>1));
    }else{
      $temp = $m->app->forms->findOne(array("site_id"=>session::$site["_id"],"slug"=>strtolower(str_replace (" ","_",$args[0]))),array("json"=>1,"options"=>1));
    }
    response::$_script = json_encode($temp);
  }

  public function publish($args){
    $m = new MongoClient();
    $_POST["json"] = json_decode($_POST["json"]);
    $_POST["options"] = json_decode($_POST["options"]);
    if(!is_numeric($_POST["_id"])){
      $_POST["_id"] = getNextSequence("form_id");
    }else{
      $_POST["_id"] = intval($_POST["_id"]);
    }
    $_POST["site_id"]=session::$site["_id"];
    $_POST["options"]->title = str_replace ("/","",$_POST["options"]->title);
    $_POST["slug"] = strtolower(str_replace (" ","_",$_POST["options"]->title));
    $m->app->forms->save($_POST);
    response::$_script = 'descriptor._id='.$_POST["_id"].';';
    response::$_message = "Successfully Saved form: ".$_POST["options"]->title.".";
  }

}
?>

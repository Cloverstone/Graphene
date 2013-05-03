<?PHP
Router::add_route('/session/logout','account_session','logout');
Router::add_route('/session/login','account_session','login');

class account_session
{
  public function logout(){
      Cookie::delete('user','/',$_SERVER["SERVER_NAME"]);
      response::$_message = stencil::render('../modules/session/views/logout.php');
  }

  public function login(){
    $loggedin = false;
    $m = new MongoClient();
    session::$user = $m->app->users->findOne(array('user_id'=>$_POST["username"]));
    if(session::$user){
      if(Crypto::checkhash($_POST["password"],session::$user['hash'])){
        Cookie::forever('user',$_POST["username"],'/',$_SERVER["SERVER_NAME"],false,true);

        response::$_script = '$("#username").html("'.$user[0]['name'].'");reRequest()';
        response::$_script = 'location.reload();';

        response::$_message .= 'You have successfully logged in.';
        response::$_status = "success";
      }else{
        response::$_status = "error";
        response::$_message .= "Your Username and/or Password is incorrect.";
      }
    }else{
      response::$_status = "error";
      response::$_message .= "Your Username is incorrect.";
    }
  }
}
?>

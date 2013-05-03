<?PHP
Modules::register('mail');
/**/




class mail
{
  public function __construct(){}

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

  function sendMail(){
    $Mailer = new GmailMailer($debug=0);
    //$Mailer->Username = 'tcortesi';
    //$Mailer->Password = 'password';
    $Mailer->FromName = 'Test';
    $Mailer->AddAddress('atsmallcomb@gmail.com', 'Adam Smallcomb');
    $Mailer->Subject = 'Test';
    //$Mailer->Body = $body;
    $Mailer->send_email();
  }

}
?>

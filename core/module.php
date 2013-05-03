<?php
abstract class module
{
  public function __construct(){
    response::using("default");
  }
  public function is_approved(){
    response::$_title = "Admin";
    if(session::validate()){
      response::$_sessionStatus = "true";
      return true;
    }else{
      response::using("session");
      response::$_content = stencil::render('../modules/session/views/login.php');
      return false;
    }
  }
}
?>

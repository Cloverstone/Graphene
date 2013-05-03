<?php

class session
{
  public static $validated = false;
  public static $user = null;
  public static $site = null;

  public function validate(){
    if(!self::$validated){
      if(Cookie::has('user')){
        $m = new MongoClient();
        self::$user = $m->app->users->findOne(array('user_id'=>Cookie::get("user",null,true)));
        if(self::$user){
          self::$validated = true;
        }else{
//          Cookie::delete('user','/',str_ireplace('www.', '', self::$site['domain']));
          Cookie::delete('user','/',$_SERVER["SERVER_NAME"]);
        }
      }
    }
    return self::$validated;
  }
}

?>

<?PHP
class response
{
  public static $_title = null;
  public static $_sessionStatus = "false";
  public static $_script = null;

  public static $_message = null;
  public static $_data = null;
  public static $_html = null;
  public static $_header = null;
  public static $_content = null;
  public static $_status = "OK";
  public static $vars = array();

  public static $context = "";
  public static $render = true;
  public static function using($context){self::$context = $context;}
  public static function error($code){
    switch($code){
      case '301':
        header("HTTP/1.1 301 Moved Permanently");
        Header( 'Location: http://'.session::$site['redirect'].'/'.implode('/',$PWD));
        exit();
        break;
      case '404':
        $dir = './';
        if(is_file('../themes/'.session::$site["theme"].'/contexts/'.self::$context.'/404.php')){
          $dir ='../themes/'.session::$site["theme"].'/contexts/'.self::$context.'/';
        }else if(is_file('../contexts/'.self::$context.'/404.php')){$dir ='../contexts/'.self::$context.'/';}
          response::$_content = stencil::render($dir.'404.php');
//        self::using("default");
//        self::render();
        if(!isset($_GET['ajax'])){
        }
        break;
    }
  }
  public static function render(){
    if(self::$render){
    self::$vars['status'] = self::$_status;
    self::$vars['title'] = self::$_title;
    self::$vars['sessionStatus'] = self::$_sessionStatus;
    if(isset(self::$_data)){self::$vars['data'] = self::$_data;}
    if(isset(self::$_script)){self::$vars['script'] = self::$_script;}
    if(isset(self::$_message)){self::$vars['message'] = self::$_message;}
    //    if(isset(self::$_context)){self::$vars['context'] = self::$_context;}
    if(isset(self::$_content) || isset(self::$_header)){
      if(isset(self::$_header)) {
        self::$vars['html'] = '<div class="title" name="'.strtolower(self::$_title).'">'.self::$_header.'</div>'.self::$_content;
      }else{
        self::$vars['html'] = self::$_content;
      }
    }
    if(isset($_GET['ajax'])){
      echo json_encode(self::$vars);
    }else{
      $dir = "../contexts/default/";
      if(self::$context == ""){
        self::$context = "default";
      }
      if(is_file('../themes/'.session::$site["theme"].'/contexts/'.self::$context.'/index.php')){
        $dir ='../themes/'.session::$site["theme"].'/contexts/'.self::$context.'/';
      }else if(is_file('../contexts/'.self::$context.'/index.php')){$dir ='../contexts/'.self::$context.'/';}
        include($dir."manifest.php");
        stencil::$vars = self::$vars;
        stencil::$vars["scripts"] = Assets::scripts();
        stencil::$vars["styles"] = Assets::styles();
        stencil::$vars["title"] = self::$_title;
        stencil::$vars["content"] = self::$_content;
        //stencil::$vars["session"] = self::$_session;
        stencil::$vars["scripts"] .= '<script>'
          .self::$_script
          .';$.ajax({url:"log_visit?ajax&referrer="+document.referrer+"&url="+window.location.pathname});
        </script>';
        echo stencil::render($dir."index.php");
        exit();
      }
    }
  }//end function
}//end class
?>

<?php
class Assets
{
  private static $script_files = array();
  private static $css_files = array();

  public static function import($groupingname, $path="groupings/"){
    include_once($path.$groupingname.'.php');
  }
  public static function add($filename, $path=NULL){
    if(pathinfo($filename, PATHINFO_EXTENSION) == 'js'){
      if($path == NULL){$path = "/assets/js/";}
      static::add_script($filename,$path);
    }else{
      if($path == NULL){$path = "/assets/css/";}
      static::add_style($filename,$path);
    }
  }

  public static function add_script($filename, $location="/assets/js/"){
    static::$script_files[$filename] = array('location'=>$location);
  }

  public static function scripts(){
    $return_val = null;
    foreach (static::$script_files as $filename=>$path_info){
      $return_val .=  "<script type='text/javascript' src='".$path_info["location"].$filename."'></script>\n";
    }
    return $return_val;
  }

  public static function add_style($filename, $location="/assets/css/"){
    static::$css_files[$filename] = array('location'=>$location);
  }

  public static function styles(){
    $return_val = null;
    $theme = "";
    if(isset($_GET['theme'])){$theme = "?theme=".$_GET['theme'];}
    foreach (static::$css_files as $filename=>$path_info){
      $return_val .=  "<link rel='stylesheet' type='text/css' href='".$path_info["location"].$filename.$theme."'>\n";
    }
    return $return_val;
  }
}
?>

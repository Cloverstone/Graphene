<?php
class Widgets
{
  private static $widgets = array();

  public static function add_widget($type, $title, $class, $function, $options = 1){
    if(self::$widgets[$type] == null){
      self::$widgets[$type] = array();
    }
    self::$widgets[$type][$title] = array('class'=>$class, 'function'=>$function, 'options'=>$options );
  }

  public function get($type){
    return self::$widgets[$type];
  }
  public function execute($type){
    foreach(self::$widgets[$type] as $name=>$widget){
//      $widgetClass = new $widget['class'];
//      $widgetClass->$widget['function']();
      $widget['class']::$widget['function']();
    }
  }
}
class Modules
{
  public static $modules = array();
  public static function is_registered($name){
    return array_key_exists ($name,self::$modules);
  }
  public static function register($name, $data = null){
    self::$modules[$name] = $data;
  }
}
?>

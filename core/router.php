<?php
class Router
{
  private static $gets = array();
  private static $puts = array();
  private static $posts = array();
  private static $deletes = array();

  public static function path($path){
    // Change Simple Route Into Searchable Regex
    // /a/b/c/* --> #^\/a\/b\/c\/.*$#
    // /a/b/c --> #^\/a\/b\/c$#
    $search = array(
      '/',
      '*'
    );
    $replace = array(
      '\/',
      '.*'
    );
    return '#^'.str_replace ($search,$replace,$path).'$#';
  }

  public static function get($path, $class, $function, $permission=NULL){
    static::$gets[static::path($path)] = array('class'=>$class, 'function'=>$function, 'permission'=>$permission);
  }
  public static function put($path, $class, $function, $permission=NULL){
    static::$puts[static::path($path)] = array('class'=>$class, 'function'=>$function, 'permission'=>$permission);
  }
  public static function post($path, $class, $function, $permission=NULL){
    static::$gets[static::path($path)] = array('class'=>$class, 'function'=>$function, 'permission'=>$permission);
  }
  public static function delete($path, $class, $function, $permission=NULL){
    static::$deletes[static::path($path)] = array('class'=>$class, 'function'=>$function, 'permission'=>$permission);
  }
  public static function add_route($path, $class, $function, $permission=NULL){
    static::$gets[static::path($path)] = array('class'=>$class, 'function'=>$function, 'permission'=>$permission);
  }

  private static function get_args($PWD,$path_regex){
    $args = NULL;
    $thing = count(explode('/',$path_regex))-2;
    if ($thing < count($PWD) && stristr($path_regex,'*') ){
      $args = array_slice($PWD,$thing);
    }
    return $args;
  }

  private static function handle_request($PWD,$routes){
    $thisRoute = '/'.implode('/',$PWD);
    foreach ($routes as $route_regex => $route_info){
      if (preg_match($route_regex, $thisRoute) == 1){
        $routeClass = new $route_info['class'];
        if ($route_info['permission'] == NULL || $routeClass->$route_info['permission']()){
          $routeClass->$route_info['function'](static::get_args($PWD,$route_regex));
          return $route_info;
        }
      }
    }
    return false;
  }

  public static function handle_route($PWD){
    switch ($_SERVER['REQUEST_METHOD']) {
      case 'PUT':
        return static::handle_request($PWD,static::$puts);
        break;
      case 'POST':
        return static::handle_request($PWD,static::$gets);
        break;
      case 'DELETE':
        return static::handle_request($PWD,static::$deletes);
        break;
      default:
        return static::handle_request($PWD,static::$gets);
        break;
    }
  }

}
?>

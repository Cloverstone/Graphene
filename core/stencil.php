<?PHP
class stencil
{

  private $temp_vars  = array();
  public static $vars = array();
  public function __isset($name) {
    return isset($this->temp_vars[$name]);
  }

  public function __unset($name) {
    unset($this->temp_vars[$name]);
  }

  public function &__get($name){
    if (isset($this->temp_vars[$name])) return $this->temp_vars[$name];
    else return null;
  }

  public function __set($name, $value) {
    if($name == 'view_template_file') {
      throw new Exception("Cannot bind variable named 'view_template_file'");
    }
    $this->temp_vars[$name] = $value;
  }

  public function getVars(){
   return $this->temp_vars;
  }
  public function file($name,$base){
    $test_name = '../stencils/'.$name.'.php';
    if(file_exists($test_name)){
      return $test_name;
    }else{
      $test_name = '../contexts/'.response::$context.'/stencils/'.$name.'.php';
      if(file_exists($test_name)){
        return $test_name;
      }else{
        return $base;
      }
    }
  }
  public function render($view_template_file,$data=NULL) {
    if($data == NULL){if(isset($this)){$data = $this->temp_vars;}}
    if($data == NULL){$data = self::$vars;}
    if(array_key_exists('view_template_file', $data)) {
      throw new Exception("Cannot bind variable called 'view_template_file'");
    }
    if(file_exists($view_template_file)){
      extract($data);
      ob_start();
      include($view_template_file);
      return ob_get_clean();
    }else{return "";}
  }

  public static function _for($stencil,$to,$from=1,$step=1){
    for ($i = $from; $i <= $to; $i+=$step){
      include($stencil);
    }
  }
  /*public static function grow($stencil){
    extract(self::$vars);
    ob_start();
    include($stencil);
    return ob_get_clean();
  }*/

/*
  private static function grow($stencil,$data_item){
    foreach($data_item as $data_key=>$data_value){
      $stencil = str_replace('{$'.$data_key.'}',$data_value,$stencil);
    }
   return $stencil;
  }

  public static function _for($stencil,$return_var,$name,$to,$from=1,$step=1){
    $temp_return = "";
    if(file_exists($stencil)){
      $stencil = file_get_contents($stencil);
    }
    for ($i = $from; $i <= $to; $i+=$step){
      $data_item[$name] = $i;
      $temp_return .=  self::grow($stencil,$data_item);
    }
    $return_var = $temp_return;
  }

  public static function _foreach($stencil,$return_var,$data,$else_file){
    $temp_return = "";
    if(file_exists($stencil)){
      $stencil = file_get_contents($stencil);
    }
    foreach ($data as $data_item){
       $temp_return .=  self::grow($stencil,$data_item);
    }
    $return_var = $temp_return;
  }


  public static function trace($stencil,$data_item){
    if(file_exists($stencil)){
      $stencil = file_get_contents($stencil);
    }
    $temp_return .=  self::grow($stencil,$data_item);
    return $temp_return;
  }*/

}

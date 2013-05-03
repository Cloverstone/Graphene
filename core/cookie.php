<?php
 class Cookie {
  const forever = 525600;
  public static function has($name){
    return isset($_COOKIE[$name]);
  }
  public static function get($name, $default = null, $decrypt = false){
    if(isset($_COOKIE[$name])){
      if($decrypt){
        return Crypto::decrypt($_COOKIE[$name]);
      }else{
        return $_COOKIE[$name];
      }
    }else{
      return $default;
    }
  }
  public static function put($name, $value, $expiration = 0, $path = '/', $domain = null, $secure = false, $encrypt = false){
    if ($expiration !== 0){
      $expiration = time() + ($expiration * 60);
    }
    if ($encrypt){
      $value = Crypto::encrypt($value);
    }
    setcookie($name, $value, $expiration, $path, $domain, $secure);
  }
  public static function forever($name, $value, $path = '/', $domain = null, $secure = false, $encrypt = false){
    return static::put($name, $value, static::forever, $path, $domain, $secure, $encrypt);
  }
  public static function delete($name, $path = '/', $domain = null, $secure = false){
    return static::put($name, null, -2000, $path, $domain, $secure);
  }
}


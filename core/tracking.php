<?php 
Router::get('/log_visit','Tracking','log');
class Tracking {
  public static function log(){
    if(isset($_GET['ajax'])){
      $browser = get_browser(null, true);
      $visit = array(
        "platform"=>$browser['platform'],
        "browser"=>$browser['browser'],
        "version"=>$browser['version'],
        "ip"=>$_SERVER["REMOTE_ADDR"],
        "domain"=>$_SERVER["SERVER_NAME"],
        "referrer"=>$_GET["referrer"],
        "time"=>time(),
        "path"=>$_SERVER['PATH_INFO']
      );
      if($_SERVER['PATH_INFO'] == "/log_visit"){
        $visit['path'] = $_GET["url"];
        $visit['entrypoint'] = true;
      }
      if($_SERVER["REMOTE_ADDR"] != "192.168.1.1"){
        db::app('visits')->save($visit);
      }
    }
  }
}
/*  $url = 'http://api.ipinfodb.com/v3/ip-city/?';
  $locargs['key'] = '20dc0a7df37f608efb4a03e76737aee5b570d30d134f1cf4625f892cb8916717';
  $locargs['ip'] = $_SERVER["REMOTE_ADDR"];
  $locargs['format'] = 'json';
  $result = file_get_contents($url.http_build_query($locargs), "r");
*/

?>

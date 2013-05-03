<?
Router::add_route('/admin','admin','load','is_approved');

class admin extends module
{
  public function __construct(){
    response::using("admin");
  }
/*  public function is_approved()
  {
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
*/
  public function admin(){
  }

  public function load(){
    stencil::$vars["username"] = Cookie::get("user",null,true);
    if(session::validate()){response::$vars['account'] = stencil::render(stencil::file('account'));response::$_sessionStatus = "true";}
    //$dash_widgets = Widgets::get('dashboard');
    Widgets::execute('dashboard');






/*    $m = new MongoClient();
    $collection = $m->app->pages;
    $cursor = $collection->find(array("site_id"=>session::$site["_id"]));
    response::$_content .= '<div class="widget width4">
      <div class="section-title blue">
        <span class="color"></span>
        <span class="menu">
          <b>'.$cursor->count().'</b>
        </span>
        <i class="icon-file icon-white"></i>
        <div>Pages</div>
      </div>
      <div class="widget-content">';
    foreach ($cursor as $doc) {
      response::$_content .= stencil::render('../modules/builder/views/page.php',$doc);
    }
    response::$_content .= '</div></div>';

    $collection = $m->app->events;
    $cursor = $collection->find(array("site_id"=>session::$site["_id"]));
response::$_content .= '<div class="widget width4">
  <div class="section-title orange">
    <span class="color"></span>
    <span class="menu">
    <b>'.$cursor->count().'</b></span>
    <i class="icon-calendar icon-white">
    </i> <div>Events</div>
  </div>
  <div class="widget-content">
';
    foreach ($cursor as $doc) {
      response::$_content .= stencil::render('../modules/calendar/views/a_event.php',$doc);
    }
response::$_content .= '</div></div>';

*/

  }

}
//    response::$_content =  json_encode(iterator_to_array(),false));
?>

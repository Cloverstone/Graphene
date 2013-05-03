<?
Modules::register('sites');
Router::add_route('/admin/sites','sites','admin','is_approved');
Router::add_route('/update/sites','sites','update','is_approved');
Router::add_route('/admin/sites/*','sites','edit','is_approved');
/**/

class sites
{
  public function __construct(){
    response::using("admin");

  }
  public function is_approved()
  {
    response::$_title = "Sites";
    if(session::validate()){
      response::$_sessionStatus = "true";
    stencil::$vars["username"] = Cookie::get("user",null,true);
    if(session::validate()){response::$vars['account'] = stencil::render(stencil::file('account'));response::$_sessionStatus = "true";}
      return true;
    }else{
      response::using("session");
      response::$_content = stencil::render('../modules/session/views/login.php');
      return false;
    }
  }

  public function create(){

  }

  public function update(){
    $m = new MongoClient();
    $collection = $m->app->sites;
    $site = $collection->findOne(array("_id"=>intval($_POST['_id'])));
    $site['domain'] = $_POST['domain'];
    $site['page_id'] = $_POST['page_id'];
    $site['theme'] = $_POST['theme'];
    $site['modules'] = explode(",",$_POST['modules']);
    if(!is_numeric($_POST["_id"])){
      $site["_id"] = getNextSequence("site_id");
    }else{
      $site["_id"] = intval($_POST["_id"]);
    }

    $collection->save($site);
    response::$_message = "Updated site: ".$_POST['domain'];
  }
  public function edit($args){
    $m = new MongoClient();
    $collection = $m->app->sites;
    $site = $collection->findOne(array("_id"=>intval($args[0])));
if(isset($site['redirect'])){
   response::$_message = $site['domain'].' redirects to => '.$site['redirect'];
}else{
/*ob_start();
var_dump($site);
response::$_content .= ob_get_clean();
*/
$site['modules'] = implode(",",$site['modules']);
  response::$_script =  'myform = $("#form").jqform(
    {label:"",source:'.json_encode($site).',options:{inline:true},items:[
      {type:"hidden",label:"id",name:"_id"},
      {type:"text",label:"Domain",name:"domain"},
      {type:"text",label:"Theme",name:"theme"},
      {type:"text",label:"Page",name:"page_id"},
      {type:"tags",label:"Modules",name:"modules"}
    ],
    actions:[{type:"submit",label:"<i class=\"icon-ok icon-white\"></i> Update",class:"primary",click:function(event){
      event.preventDefault();
      event.stopPropagation();
      var data = $("#form form").serialize();
      $.post("/update/sites/?ajax",data,processResponse,"json");
    }}
   ]}
);


';
response::$_content .= '<div id="form" style="margin:20px;max-width:600px"></div>';
//response::$_content .= stencil::render('../modules/sites/views/site_overview.php',$site);

}
  }
  public function admin(){
    response::using("admin");
      response::$vars['account'] = stencil::render(stencil::file('account','../modules/session/views/account.php'));
    $m = new MongoClient();
    $collection = $m->app->sites;
    $cursor = $collection->find(array(),array("domain"=>1));
    response::$_content .= '
    <div class="section-full">
      <div class="section-title orange">
        <span class="color"></span>

<span class="menu dropdown pull-right" style="line-height:42px;">
  <a class="dropdown-toggle" data-toggle="dropdown" style="height:35px"><b>'.$cursor->count().'</b><span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
          <li><a data-action="site_new"><i class="icon-plus"></i> New</a></li>
        </ul>
</span>
        <i class="icon-fire icon-white"></i>
        <div>Sites</div>
      </div>
    <div class="widget-content">
    ';
    foreach ($cursor as $doc) {
      response::$_content .= stencil::render('../modules/sites/views/site.php',$doc);
    }
    response::$_content .= '</div></div><div id="section-options"></div>';

  }
}
?>

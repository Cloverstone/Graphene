<?
Router::add_route('/basicTracking','basicTracking','load','is_approved');
Widgets::add_widget('tracking', 'basicTracking2', 'basicTracking', 'tracking2');
Widgets::add_widget('tracking', 'vbd', 'basicTracking', 'visitsByDay');
Widgets::add_widget('dashboard', 'vbd', 'basicTracking', 'visitsByDay');
//Widgets::add_widget('tracking', 'basicTracking', 'basicTracking', 'tracking');

class basicTracking
{
  public function __construct(){
    response::using("basicTracking");

  }
  public function is_approved()
  {
    response::$_title = "basicTracking";
    if(session::validate()){
      response::$_sessionStatus = "true";
      return true;
    }else{
      response::using("session");
    /*  stencil::$vars["username"] = "Guest";
      response::$_content = stencil::render('../modules/session/views/login.php');*/
      response::using("session");
      response::$_content = stencil::render('../modules/session/views/login.php');

      return false;
    }
  }

  public function basicTracking(){
  }

  public function load(){
      response::using("admin");
    stencil::$vars["username"] = Cookie::get("user",null,true);
    if(session::validate()){response::$vars['account'] = stencil::render(stencil::file('account'));response::$_sessionStatus = "true";}
    //$dash_widgets = Widgets::get('dashboard');
    Widgets::execute('tracking');

  }
  public function tracking(){

    $m = new MongoClient();
    $collection = $m->app->visits;
    $cursor = $collection->find(array("domain"=>session::$site["domain"]));

    response::$_content .= '<div class="widget width6">
      <div class="section-title blue">
        <span class="color"></span>
          <b class="pull-right">'.$cursor->count().'</b>
        <i class="icon-file icon-white"></i>
        <div>Visits</div>
      </div>
      <div class="widget-content">';
    foreach ($cursor as $doc) {
      response::$_content .= stencil::render('../modules/basicTracking/views/visit.php',$doc);
    }
    response::$_content .= '</div></div>';
  }
  public function tracking2(){

    $m = new MongoClient();
    $collection = $m->app->visits;

    $cursor2 = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"])));

    response::$_content .= '<div class="widget width6">
      <div class="section-title ">
        <span class="color"></span>
          <b class="pull-right">'.count($cursor2['values']).'</b>
        <i class="icon-signal icon-white"></i>
        <div>Visits by Page</div>
      </div>
      <div class="widget-content"><div id="chart1"></div></div></div>';


//$m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"])));
//$ret =  "var data = [['PDF', 2],['Doc', 2], ['Excel',3], ['PPT',3]  ];";
$ret =  "var data = [";

    $collection = $m->app->pages;
    $cursor = $collection->find(array("site_id"=>session::$site["_id"]));
    foreach ($cursor as $doc) {
      $temp = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"],"path"=>"/".$doc['slug'])));
//      $ret .=  "['".count($temp['values'])." - ".$doc['slug']."',".count($temp['values'])."],";
if(count($temp['values'])>0){
      $ret .=  "['".$doc['slug']."',".count($temp['values'])."],";
}
    }

$ret .=  "];";

$ret .= <<< EOS
if(!$("#chart1").hasClass("jqplot-target")){
  var plot1 = jQuery.jqplot ('chart1', [data],
    {
      grid:{borderWidth:0, shadow:false,background:"transparent"},
      seriesColors:['#c92127', '#1482b3', '#84c340', '#f69623', '#666666'],
      gridPadding: {top:5, bottom:5, left:5, right:5},
      seriesDefaults: {
        rendererOptions: {
            diameter: undefined, // diameter of pie, auto computed by default.
            padding: 2,        // padding between pie and neighboring legend or plot margin.
            sliceMargin: 1,     // gap between slices.
            fill: true,         // render solid (filled) slices.
            shadowOffset: 0,    // offset of the shadow from the chart.
            shadowDepth: 0,     // Number of strokes to make when drawing shadow.  Each stroke
                                // offset by shadowOffset from the last.
            shadowAlpha: 0.0,   // Opacity of the shadow
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
            showDataLabels: true,
          // Set varyBarColor to tru to use the custom colors on the bars.

            varyBarColor: true
      },
        // Make this a pie chart.
        //renderer: jQuery.jqplot.PieRenderer
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
      highlighter: {
        sizeAdjust: 10,
        tooltipLocation: 'n',
        tooltipAxes: 'y',
        tooltipFormatString: '<b><i><span style="color:red;">hello</span></i></b>',
        useAxesFormatters: false
      },
      axes: {
        xaxis: {
          renderer: $.jqplot.CategoryAxisRenderer
        }
      },
//        },
//      legend: { show:true, location: 'e' }
    }
  );
$('#chart1').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, newdata) {
//                alert(data[pointIndex][0]);
window.location = "/"+data[pointIndex][0];
            }
        );
};
EOS;


response::$_script .= $ret;

  }
  public function visitsByDay(){

    $m = new MongoClient();
    $collection = $m->app->visits;

    $cursor2 = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"])));

    response::$_content .= '<div class="widget width6">
      <div class="section-title ">
        <span class="color"></span>
          <b class="pull-right">'.count($cursor2['values']).'</b>
        <i class="icon-signal icon-white"></i>
        <div>Unique Visits by Day</div>
      </div>
      <div class="widget-content"><div id="chart2"></div></div></div>';

    $ret =  "var data2 = [";

    $today = getdate();

  $thisday = $today[0];
  $prevday=mktime(0,0,0,date('m',$today[0]),$today['mday'],$today['year']);
  $temp = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"], 'time' => array('$gte' => $prevday, '$lt' => $thisday))));
  $ret .=  "[".($prevday*1000).",".count($temp['values'])."],";

  $thisday=mktime(0,0,0,date('m',$today[0]),$today['mday'],$today['year']);
  $prevday=strtotime("-1day",$thisday);
  $temp = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"], 'time' => array('$gte' => $prevday, '$lt' => $thisday))));
  $ret .=  "[".($prevday*1000).",".count($temp['values'])."],";

for ($i=1; $i<=12; $i++){
  $thisday = $prevday;
  $prevday=strtotime("-1day",$thisday);

  $temp = $m->app->command(array("distinct" => "visits", "key" => "ip","query"=>array("domain"=>session::$site["domain"], 'time' => array('$gte' => $prevday, '$lt' => $thisday))));
  $ret .=  "[".($prevday*1000).",".count($temp['values'])."],";
}

    $ret .=  "];";


$ret .= '
if(!$("#chart2").hasClass("jqplot-target")){
  var plot1 = jQuery.jqplot ("chart2", [data2],
    {
      grid:{borderWidth:0, shadow:false,background:"transparent"},
      seriesColors:["#c92127", "#1482b3", "#84c340", "#f69623", "#666666"],
      gridPadding: {top:5, bottom:5, left:5, right:5},
      seriesDefaults: {
        rendererOptions: {
            diameter: undefined, // diameter of pie, auto computed by default.
            padding: 2,        // padding between pie and neighboring legend or plot margin.
            shadowOffset: 0,    // offset of the shadow from the chart.
            shadowDepth: 0,     // Number of strokes to make when drawing shadow.  Each stroke
                                // offset by shadowOffset from the last.
            shadowAlpha: 0.0,   // Opacity of the shadow
            showDataLabels: false,
          // Set varyBarColor to tru to use the custom colors on the bars.
            varyBarColor: true
        },
        color:"#666",
        markerOptions: {
            show: true,             // wether to show data point markers.
            style: "filledCircle",  // circle, diamond, square, filledCircle, filledDiamond or filledSquare.
            color:"#888",
            shadow: false,       // wether to draw shadow on marker or not.
        },
        pointLabels: { show: false }
      },
      highlighter: {
        show: true,
        sizeAdjust: 10,
        tooltipLocation: "n",
        tooltipAxes: "y",
        tooltipFormatString: "<b>&nbsp; %.0f &nbsp;</b>",
        useAxesFormatters: false
      },
      axes:{
        xaxis:{
          renderer:$.jqplot.DateAxisRenderer,
          tickOptions:{formatString:"%b %#d"},
          min:'.(strtotime("-1day",$prevday)*1000).',
          max:'.(strtotime("+1day",mktime(0,0,0,date('m',$today[0]),$today['mday'],$today['year']))*1000).',
          tickInterval:"2 day"
        }
      }
    }
  );
};
';


response::$_script .= $ret;

  }


}
//    response::$_content =  json_encode(iterator_to_array(),false));
?>

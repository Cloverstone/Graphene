<?php 
require_once('csscolor.php');

function curve($radius)
{
echo '
  -webkit-border-radius:'.$radius.'px;
  -moz-border-radius:'.$radius.'px;
  border-radius:'.$radius.'px;';
}
function curveTop($radius)
{
echo '
  -moz-border-radius-topleft:'.$radius.'px;
  -webkit-border-top-left-radius:'.$radius.'px;
  border-top-left-radius:'.$radius.'px;
  -moz-border-radius-topright:'.$radius.'px;
  -webkit-border-top-right-radius:'.$radius.'px;
  border-top-right-radius:'.$radius.'px;';
}
function curveBottom($radius)
{
echo '
  -moz-border-radius-bottomleft:'.$radius.'px;
  -webkit-border-bottom-left-radius:'.$radius.'px;
  border-bottom-left-radius:'.$radius.'px;
  -moz-border-radius-bottomright:'.$radius.'px;
  -webkit-border-bottom-right-radius:'.$radius.'px;
  border-bottom-right-radius:'.$radius.'px;';
}
function curveleft($radius)
{
echo '
  -moz-border-radius-bottomleft:'.$radius.'px;
  -webkit-border-bottom-left-radius:'.$radius.'px;
  border-bottom-left-radius:'.$radius.'px;
  -moz-border-radius-topleft:'.$radius.'px;
  -webkit-border-top-left-radius:'.$radius.'px;
  border-top-left-radius:'.$radius.'px;';
}
function curveright($radius)
{
echo '
  -moz-border-radius-bottomright:'.$radius.'px;
  -webkit-border-bottom-right-radius:'.$radius.'px;
  border-bottom-right-radius:'.$radius.'px;
  -moz-border-radius-topright:'.$radius.'px;
  -webkit-border-top-right-radius:'.$radius.'px;
  border-top-right-radius:'.$radius.'px;';
}

define( 'content_width', '988' );

function boxShadow($x,$y,$r,$color){
echo '-webkit-box-shadow:'.$x.'px '.$y.'px '.$r.'px '.$color.';';
echo '-moz-box-shadow:'.$x.'px '.$y.'px '.$r.'px '.$color.';';
echo 'box-shadow:'.$x.'px '.$y.'px '.$r.'px '.$color.';';
}

function gradient($start,$stop){
/*echo "background:$start;
  background-image: -webkit-gradient(linear, left top, left bottom, from($start), to($stop));
  background-image: -webkit-linear-gradient(top, $start 0, $stop 100%);
  background-image: -moz-linear-gradient(top, $start 0, $stop 100%);
  background-image: -o-linear-gradient(top, $start 0, $stop 100%);
  background-image: -ms-linear-gradient(top, $start 0, $stop 100%);
  background-image: linear-gradient(top, $start 0, $stop 100%);
  zoom:1;";*/
//  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$start', endColorstr='$stop)');
//$mixed = $gray->mix($start, 60, $stop);

echo "  background-color: $start;
  background-image: -moz-linear-gradient(top, $start, $stop);
  background-image: -ms-linear-gradient(top, $start, $stop);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from($start), to($stop));
  background-image: -webkit-linear-gradient(top,$start, $stop);
  background-image: -o-linear-gradient(top, $start, $stop);
  background-image: linear-gradient(top, $start, $stop);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$start', endColorstr='$stop', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
  zoom:1;";
}
?>

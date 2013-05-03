<?php
function getNextSequence($name) {
    $m = new MongoClient();
    $ret = $m->{"app"}->counters->findAndModify(
      array("_id"=> $name),
      array('$inc' => array("seq" => 1)),
      null,
      array("new" => true)
    );
   return $ret["seq"];
}

class db
{
  public function app($collection){
   $m = new MongoClient();
   return $m->app->{$collection};
  }
}
?>

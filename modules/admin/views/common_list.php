<?PHP
/*
  $color
  $title
  $icon
  $stencil
  $cursor
  $count
  $empty
$menu_items
*/

?>
<div class="section-full">
  <div class="section-title <?=$color?>">
    <span class="color"></span>
    <span class="menu dropdown pull-right" style="line-height:42px;">
      <a class="dropdown-toggle" data-toggle="dropdown" style="height:35px">
        <b><?=$cursor->count();?></b>
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
      <?
        foreach ($menu_items as $item) {
          echo $item;
        }
      ?>
      </ul>
    </span>
    <i class="icon-<?=$icon?> icon-white"></i>
    <div><?=$title?></div>
  </div>
  <div class="widget-content">
  <?
    if($cursor->hasNext()){
      foreach ($cursor as $doc) {
        echo stencil::render($stencil,$doc);
      }
    }else{
       echo '<div><div style="text-align:center;font-weight:bold;margin:10px;padding:10px;border:solid 1px #ddd">'.$empty.'</div></div>';
    }
  ?>
  </div>
</div>
<div id="section-options"></div>

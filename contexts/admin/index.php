<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="/assets/img/empire_fav.png">
    <?echo $styles;?>
    <script>sessionStatus="<?=$sessionStatus?>";</script>
  </head>
  <body>
<?=$account?>
    <div id="body">
      <div id="sidebar">
        <div style="height: 50px;width:100%;background: #ddd;position:absolute;top:0px;left:0px"></div>
<div class="control-group"  style="margin-top: 0px;position:relative">
  <div class="controls">
    <div class="input-prepend">
      <span class="add-on" style="padding: 6px 5px 2px;"><i class="icon-search"></i></span>
      <input  name="filter" id="inputIcon" style="width:180px" placeholder="Search" type="text">
    </div>
  </div>
</div>

        <ul style="top:60px" id="cb-source">
          <li><a href="/admin"><i class="icon-th-large"></i> Dashboard<i class="icon-chevron-right pull-right"></i></a></li>
          <?if(Modules::is_registered('page')){?>
          <li><a href="/admin/pages"><i class="icon-file"></i> Pages<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('files')){?>
          <li><a href="/admin/files"><i class="icon-folder-open"></i> Files<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('form')){?>
          <li><a href="/admin/forms"><i class="icon-list-alt"></i> Forms<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('poll')){?>
          <li><a href="/admin/polls"><i class="icon-list"></i> Polls<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('images')){?>
          <li><a href="/admin/images"><i class="icon-picture"></i> Images<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('calendar')){?>
          <li><a href="/admin/calendar"><i class="icon-calendar"></i> Calendar<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('galleries')){?>
          <li><a href="/admin/galleries"><i class="icon-camera"></i> Galleries<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <hr>
          <?if(Modules::is_registered('sites')){?>
          <li><a href="/admin/sites"><i class="icon-fire"></i> Sites<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
          <?if(Modules::is_registered('io')){?>
          <li><a href="/admin/io"><i class="icon-adjust"></i> IO<i class="icon-chevron-right pull-right"></i></a></li>
          <?}?>
        </ul>
      </div>
      <div id="container">
        <div id="content">
        <?=$content?>
        </div>
        <div name="alt-form"></div>
      </div>
    </div>
    <?echo $scripts;?>
    <script><?=$script;?></script>
  </body>
</html>


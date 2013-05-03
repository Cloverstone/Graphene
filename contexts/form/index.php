<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <?echo $styles;?>
    <script>sessionStatus="<?=$sessionStatus?>";</script>
  </head>
  <body id="cobler">
    <?=$account?>
    <!--div id="header">
    <div>
    <span style="float:right;" class="btn-group play">
      <button id="play" class="btn btn-" style="width:87px"><i class="icon-play"></i> Run</button>
      <button class="btn btn- dropdown-toggle" data-toggle="dropdown"><span class="caret" style="margin:8px 0px;"></span></button>
        <ul class="dropdown-menu  pull-right" style="text-align:left">
          <li><a id="clear"><i class="icon-remove-sign"></i> Clear</a></li>
          <li><a id="options">Options</a></li>
          <li><a id="save">Save</a></li>
          <li><a id="open">Open</a></li>
        </ul>
    </span>
    <span class="btn active btn-success" id="edit" style="display:none;float:right;"><i class="icon-white icon-stop"></i> Running...</span>
    </div>

    </div-->

    <div id="body">
      <div id="sidebar">
      <div id="log">
      </div>
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


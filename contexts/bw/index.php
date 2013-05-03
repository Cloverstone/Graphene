<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="/assets/img/empire_fav.png">
    <?echo $styles;?>
    <script>sessionStatus="<?=$sessionStatus?>";</script>
  </head>
  <body id="cobler">
    <?=$account?>
    <div id="body">
      <div id="sidebar">
        <div id="log"></div>
      </div>
      <div id="container">
        <div id="content">
        <?=$content?>
        </div>
        <div name="alt-form"></div>
      </div>
    </div>
    <?echo $scripts;?>
  </body>
</html>


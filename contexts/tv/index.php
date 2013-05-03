<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="/assets/favicon.ico">
<script type="text/javascript">
window.context = "Profile";
var sessionStatus="true";
</script>
<?echo $styles;?>
  </head>
  <body id="profile" class="" rel="" name="<?= $title?>">
  <div id="wait" style=""></div>
<div id="header">
  <div>
    <a data-action="logout" >Log Out</a>
    <span class="vd"></span>
    <span id="username"><?= $username ?></span>
  </div>
</div>
<div id="status-message-container"><div><span id="status-message" style="display: none; " class="alert alert-info"></span></div></div>
<div id="spacer"></div>
<div id="container">
  <div id="content"><div style="text-align:center;font-size:large;margin:30px">Loading...</div></div>
  <ul id="links" class="nav-auto">
    <li class="<? if($GLOBALS['PWD'][1] == "home"||$GLOBALS['PWD'][1] == "")echo "active" ?>"><a href="/tv/refresh"><i class="icon-refresh"></i> <span>Control</span></a></li>
    <li class="<? if($GLOBALS['PWD'][1] == "home"||$GLOBALS['PWD'][1] == "")echo "active" ?>"><a href="/tv/list"><i class="icon-list"></i> <span>Status</span></a></li>
    <li class="<? if($GLOBALS['PWD'][1] == "home"||$GLOBALS['PWD'][1] == "")echo "active" ?>"><a href="/tv/clear"><i class="icon-list"></i> <span>Clear</span></a></li>
<?= $priveliged ?>  </ul>
<div id="bottom-bar" class="highlight" style="">
<div style="border:solid;border-width:1px 0px;border-color:#ccc transparent #eee;position:absolute;left:0px;height:0px;padding:0px;width:100%;bottom:55px"></div>
<div style="text-align:center;line-height:60px;color:#eee">Profile - Created by Adam Smallcomb</div>
</div>

</div>
<?echo $scripts;?>
  </body>
</html>

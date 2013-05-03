<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="/assets/favicon.ico">
<script type="text/javascript">
window.context = "Profile";
var sessionStatus="false";
</script>
<?echo $styles;?>
  </head>
  <body id="profile" class="" rel="" name="">
  <div id="wait" style="display:none"></div>
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
  <div class="weeks highlight">
    <div class="week-link-header">Week</div>
<? for($i=1;$i<=17;$i++): ?>
    <div class="week-link<?  if($_COOKIE["week"] == "$i") echo " active-week"; ?>" data-week="<?= $i ?>"><?= $i ?></div>
<? endfor ?>
  </div>
  <div id="content"><?= $content ?></div>
  <ul id="links" class="nav-auto">
    <!--li><a title="Home" rel="home" href="http://adamsmallcomb.com/" ><img src="">Home</a-->
    <li class="<? if($GLOBALS['PWD'][1] == "season")echo "active" ?>"><a  href="/pickem/season"><i class="icon-home"></i> Season</a></li>
    <li class="<? if($GLOBALS['PWD'][1] == "results"||$GLOBALS['PWD'][1] == "")echo "active" ?>"><a href="/pickem/results"><i class="icon-th-list"></i> Results</a></li>
    <li class="<? if($GLOBALS['PWD'][1] == "picks")echo "active" ?>"><a href="/pickem/picks"><i class="icon-ok"></i> Picks</a></li>
<hr>
    <li><a target="_blank" title="Reference (ESPN)" href="http://scores.espn.go.com/nfl/scoreboard">Reference</a></li>
<?= $priveliged ?>  </ul>
<div id="bottom-bar" class="highlight">
<div style="border:solid;border-width:1px 0px;border-color:#ccc transparent #eee;position:absolute;left:0px;height:0px;padding:0px;width:100%;bottom:55px"></div>
<div style="text-align:center;line-height:60px;color:#eee">Clover Picks - Created by Adam Smallcomb</div>
</div>

</div>
<?echo $scripts;?>
  </body>
</html>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title><?= $title?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="/assets/favicon.ico">
<script type="text/javascript">
var sessionStatus="<?=$sessionStatus?>";
</script>

<?
echo $styles;
?>
  </head>
  <body id="profile" class="" rel="" name="">
<?=$account?>
<div id="spacer" style="color:#eee;line-height:100px;font-size:25px;text-align:center;"><div style="width:968px;background:url('/assets/img/adamsmallcomb.png') no-repeat 0%;height:80px;margin:0px auto;"></div></div>
<div id="container">
  <div id="content"><?=$content?>
</div>

  <ul id="links" class="nav-auto">
    <li><a title="About Me" href="/aboutme"><i class="icon-info-sign"></i> About Me</a></li>
    <li><a title="My Projects" href="/projects"><i class="icon-cog"></i> My Projects</a></li>
    <li><a title="My Sites" href="/sites"><i class="icon-th-large"></i> My Sites</a></li>
  </ul>
<div id="bottom-bar" class="highlight">
<div style="border:solid;border-width:1px 0px;border-color:#ccc transparent #eee;position:absolute;left:0px;height:0px;padding:0px;width:100%;bottom:55px"></div>
  <a class="resume floater" href="http://adamsmallcomb.com/uploads/Resume.doc"><div>Resumé</div></a>
  <a class="linkedin floater" target="_blank" href="http://www.linkedin.com/in/adamsmallcomb"><div>LinkedIn</div></a>
  <a class="facebook floater" target="_blank" href="http://www.facebook.com/adam.smallcomb"><div>Facebook</div></a>
  <!--a class="sc floater" target="_blank" href="http://www.steepleconnect.com"><div>SteepleConnect</div></a-->
</div>

</div>
<?echo $scripts;?>
  </body>
</html>


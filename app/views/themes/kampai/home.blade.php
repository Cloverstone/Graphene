<?php
  Assets::add('jquery.min.js' , '//ajax.googleapis.com/ajax/libs/jquery/2.0.2/');
  Assets::add('jquery-ui.min.js' , '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/');
  Assets::add('font-awesome.min.css','//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/');

  Assets::add('jquery.oembed.all.css');
  //Assets::add("bootstrap_newhome.css");
  // Assets::add("bsammend.php");
  //Assets::add('theme.css', '/assets/themes/newhome/css/');
  Assets::add('style.css', '/assets/themes/kampai/css/');
  Assets::add('bootstrap.min.css','/vendor/flatlab/css/');

  // Assets::add('pen.css');
  // Assets::add('pen.js');
  // Assets::add('markdown.js');
  //Assets::add('editor.css');
  // Assets::add('menu.css');
  // Assets::add('grande.js');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>{{ $page->title }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/png" href="http://www.kampaijapanesesteakhouse.com/favicon.ico">
<?=Assets::styles()?>
  </head>
  <body id="profile" class="" rel="" name="{{ $page->title }}">
<div style="height:165px;position:fixed;left:0px;right:0px; min-width:1000px;z-index:1;background:#f8f8f8" data-tag="url(http://www.ichibanhibachisteakhouse.com/images/top_bg.jpg)">
<div class="menu-back"></div>
    <div id="header"><div style="width:1000px;background:transparent">
     <!--a href="/"><img id="logo" src="http://kampaijapanesesteakhouse.com/images/kampai.png"/></a-->
     <div style="padding-top:5px;text-align:left"><a href="/"><img id="logo" src="/imgs/296.png"/></a></div>
      <!--span id="social">
        <a href="http://www.facebook.com/pages/Kampai-Japanese-Steakhouse/158699087498730"><img src="/assets/img/png/glyphicons_320_facebook.png"></a>
      </span-->
<span style="text-align:left;position:absolute;right:0px;top:10px">
<div>108 North Jensen Road</div>
<div>Vestal, NY 13850</div>
<div>(607) 798-7521</div>
<!--div>Call <a href="tel:607-798-7521" style="color:red">(607) 798-7521</a>  for reservations</div-->
</span>

<span style="text-align:left;position:absolute;right:200px;top:10px">
<div>Sunday: 3:30 - 8:30</div>
<div>Monday - Saturday: 4:30 - 9:30</div>
</span>

      <ul id="menu">
        <li name="home"><a href="/">Home</a></li>
<li class="divider"></li>
        <li name="about"><a href="/about">About us</a></li>
<li class="divider"></li>
        <li name="menu"><a href="/menu">Menu</a></li>
<li class="divider"></li>
        <li name="hibachi"><a href="/hibachi">Hibachi</a></li>
<li class="divider"></li>
        <li name="sushi"><a href="/sushi">Sushi</a></li>
<li class="divider"></li>
        <li name="traditional"><a href="/traditional">Traditional</a></li>
<li class="divider"></li>
        <li name="contact"><a href="/contact">Contact</a></li>
<li class="divider"></li>
        <li name="our_stuff"><a href="/gallery/2/our_stuff">Photos</a></li>
      </ul>

    </div></div>


</div>
<div style="height:165px;"></div>
    <div id="container" style="margin-top:10px">



      <!--span id="menu">
        <a href="/">home</a>
        <a href="/about">about us</a>
        <a href="/menu">menu</a>
        <a href="/hibachi">hibachi</a>
        <a href="/sushi">sushi</a>
        <a href="/traditional">traditional</a>
      </span-->

      <div id="content" style="width:auto;margin:0px">{{ $page->content }}



<!--div style="text-align:center;margin-top:15px">
	<img src="http://kampaijapanesesteakhouse.com/images/ccards.gif" alt="We accept Visa Mastercard Amex"><br>
	<p style="line-height:60px;font-family: 'Myriad Pro', 'Trebuchet MS', Arial, sans-serif;color:#000;font-size: 16px;">Copyright © 2010 Kampai Japanese Steakhouse, Inc.</p>
</div-->

    </div>
   </div>
<?=Assets::scripts()?>
<?=Assets::templates()?>
  </body>
</html>


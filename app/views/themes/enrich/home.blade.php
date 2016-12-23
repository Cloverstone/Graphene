<?php
  Assets::add('jquery.min.js' , '//ajax.googleapis.com/ajax/libs/jquery/2.0.2/');
  Assets::add('jquery-ui.min.js' , '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/');
  Assets::add('font-awesome.min.css','//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/');

  Assets::add('jquery.oembed.all.css');
  //Assets::add("bootstrap_newhome.css");
  // Assets::add("bsammend.php");
  Assets::add('theme.css', '/assets/themes/enrich/css/');
  Assets::add('style.css', '/assets/themes/enrich/css/');

  // Assets::add('pen.css');
  // Assets::add('pen.js');
  // Assets::add('markdown.js');
  //Assets::add('editor.css');
  // Assets::add('menu.css');
  // Assets::add('grande.js');
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>{{ $page->title }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- @todo: fill with your company info or remove -->
<meta name="description" content="">
<meta name="author" content="Luke Smallcomb">
<?=Assets::styles()?>

<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="/assets/js/html5.js"></script>
    <![endif]-->

<!-- Le fav and touch icons - @todo: fill with your icons or remove -->
<link rel="shortcut icon" href="/img/icons/favicon.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/icons/114x114.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icons/72x72.png">
<link rel="apple-touch-icon-precomposed" href="img/icons/default.png">
<link href='http://fonts.googleapis.com/css?family=Monda:400,700' rel='stylesheet' type='text/css'>
    <script>actions={};sessionStatus="";</script>
</head>



<body class="has-navbar-fixed-top page-services has-highlighted" name="<?=str_replace(' ','_',strtolower($page->title))?>">
<div id="navigation" class="wrapper">
  <div class="navbar navbar-fixed-top" id="top">
    <div class="navbar-inner">
      <div class="inner">
        <div class="container"> <a class="brand" href="/" title="Home">
          <h1>Enrich</h1>
          <span style="font-size:12px;margin-left:2px">Christian Counseling</span> </a> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a>
{{! $menu }}



          <!--div class="nav-collapse collapse">
            <ul class="nav pull-right" id="main-menu">
              <li class="active"><a href="services.htm">Services</a></li>
              <li class="dropdown"> <a href="portfolio.htm" class="dropdown-toggle" id="portfolio-drop" data-toggle="dropdown">Portfolio</a> 
                <ul class="dropdown-menu" role="menu" aria-labelledby="portfolio-drop">
                  <li role="menuitem"><a href="portfolio4.htm" tabindex="-1">4 Columns</a></li>
                  <li role="menuitem"><a href="portfolio.htm" tabindex="-1">3 Columns</a></li>
                  <li role="menuitem"><a href="portfolio2.htm" tabindex="-1">2 Columns</a></li>
                </ul>
              </li>
              <li class="dropdown"> <a href="about.htm" class="dropdown-toggle" id="about-drop" data-toggle="dropdown">About</a> 
                <ul class="dropdown-menu" role="menu" aria-labelledby="about-drop">
                  <li role="menuitem"><a href="about.htm" tabindex="-1">Our Company</a></li>
                  <li role="menuitem"><a href="team-member.htm" tabindex="-1">Team Member</a></li>
                </ul>
              </li>
              <li><a href="blog.htm">Blog</a></li>
              <li><a href="contact.htm">Contact</a></li>
              <li class="dropdown"> <a href="more.htm" class="dropdown-toggle" id="more-drop" data-toggle="dropdown">More</a> 
                <ul class="dropdown-menu" role="menu" aria-labelledby="more-drop">
                  <li role="menuitem"><a href="elements.htm" tabindex="-1">Bootstrap Elements</a></li>
                  <li role="menuitem"><a href="skins.htm" tabindex="-1">Colour Skins</a></li>
                  <li role="menuitem"><a href="starter.htm" tabindex="-1">Starter Snippets</a></li>
                  <li role="menuitem"><a href="index-carousel.htm" tabindex="-1">Homepage Bootstrap Carousel</a></li>
                </ul>
              </li>
            </ul>
          </div-->
          <!--/.nav-collapse --> 
        </div>
      </div>
    </div>
  </div>
</div>
<div id="highlighted">
  <div class="container">
    <div class="row-fluid header">
      <h2 class="page-title"><span>{{ $page->title }}</span> <small></small></h2>
    </div>
  </div>
</div>
  <div class="container"> 
<div id="content" style="min-height:300px">
{{ $page->content }}
  </div>
</div>

<!-- FOOTER -->
<footer id="footer">
  <div class="inner">
    <div class="container">
      <div class="row">
        <div class="span10 col contact-block"> 
          <!--@todo: replace with company contact details-->


         </div>
      </div>
      <div class="row"> 
        <!--@todo: replace with company copyright details-->
        <div class="subfooter">
          <div class="span12">
            <p><a href="http://pfairdesigns.com"><img src="/assets/img/graphenepowered2.png"></a> | Copyright 2017 &copy;</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<?=Assets::scripts()?>
<?=Assets::templates()?>
</body>
</html>

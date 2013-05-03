<?PHP  header("Content-type: text/css");
include_once('tools/css_utils.php');
?>
a,a:hover,a:visited{color:#1b5ea8}
[data-url]{cursor:pointer}
ol, ul {list-style: none;}

body{text-align: center;font-family: Helvetica, Arial, sans-serif;min-width:970px;background:#D8D5CD;}
#menu,h2,h4,h3{font-family: 'Questrial', sans-serif !important;color:#18A1DB}

#header{z-index:10;position:relative;overflow:shidden;height:80px;border-top:solid 10px #F2186F;background:#444;box-shadow:0 0 5px #000;border-bottom:solid 0px #1A5DA8;border-bottom-color:#BDCEE1}
#header{border-top-color:#18A1DB}
#header > div,#footer > div{position:relative;width:940px;margin:0px auto }
 #logo{width:280px;height:40px;float:left;position:relative;top:20px;background: url('http://alt.sonostics.com/wp-content/uploads/2011/12/sonosticslogo3.png') no-repeat}
 #logo{width:500px;height:40px;float:left;position:relative;top:20px;background: url('/assets/img/myowave_wh.png') no-repeat}

#body{position:relative;padding:30px 0px;overflow:hidden;background:#f8f8f8 url('/uploads/img/graph_paper.jpg')}
#body{position:relative;padding:30px 0px;overflow:hidden;background:#f8f8f8 url('http://content.sandbox.cloversweet.com/img/tile_texture.png')}
#body{position:relative;padding:30px 0px;overflow:hidden;background:#f8f8f8;}/* url('http://content.sandbox.cloversweet.com/img/tile_texture.png')}*/
 #container{width:940px;margin:0px auto;text-align:left;position:relative;}
  #content{position:relative;margin:0px;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 14px;line-height:20px;min-height:200px;_height:200px;<?=curve(0)?>}

#footer{position:relative;height:125px;border-top:solid #eee 5px;border-top-color:#9c9b97}
#footer .slogan,#footer .copyright{position:relative;top:50px;float:left;clear:both;color:#777;}
 #social{position:relative;top:50px}
 #social img{margin:0px 0px 0px 10px;cursor:pointer;float:right;opacity:.5}
 #social img:hover{opacity:.7;}


/*menu*/
#menu{position:absolute;top:0px;right:0px;top:0px;height:80px}
#menu a{border-bottom:solid transparent 6px;color:#fff;font-size:larger;text-decoration:none;display:block;padding:0px 5px;line-height:68px;padding-top:6px}
#menu a.selected{border-color:#fff;}
/*#menu a:hover{background:#;opacity:.9}*/
#menu li{display:inline-block;}

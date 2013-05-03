<?PHP  header("Content-type: text/css");
function curve($radius){
  echo "-webkit-border-radius:".$radius."px;-moz-border-radius:".$radius."px;";
}
function curveTop($radius){
  echo "-moz-border-radius-topleft:".$radius."px;-webkit-border-top-left-radius:".$radius."px;-moz-border-radius-topright:".$radius."px;-webkit-border-top-right-radius:".$radius."px;";
}
function curveBottom($radius){
  echo "-moz-border-radius-bottomleft:".$radius."px;-webkit-border-bottom-left-radius:".$radius."px;-moz-border-radius-bottomright:".$radius."px;-webkit-border-bottom-right-radius:".$radius."px;";
}
function curveleft($radius){
  echo "-moz-border-radius-bottomleft:".$radius."px;-webkit-border-bottom-left-radius:".$radius."px;-moz-border-radius-topleft:".$radius."px;-webkit-border-top-left-radius:".$radius."px;";
}
function curveright($radius){
  echo "-moz-border-radius-bottomright:".$radius."px;-webkit-border-bottom-right-radius:".$radius."px;-moz-border-radius-topright:".$radius."px;-webkit-border-top-right-radius:".$radius."px;";
}
?>

body{text-align: center;font-family: Helvetica, Arial, sans-serif;min-width:970px}

body {background:#2C883A url(/assets/img/staff_back.png) repeat-x 0 50px;}
body[name=lexi] {background:#880077 url(/assets/img/staff_back.png) repeat-x 0 50px;}
body[name=josie] {background:#770088 url(/assets/img/staff_back.png) repeat-x 0 50px;}




#container{min-width:960px;padding-top:10px;margin:0px auto 25px;position:relative;background-color:#ddd;min-height:500px;border:solid 5px #141414;text-align:left;<?=curve(10)?>_height:500px;}

/*#container{background:transparent;border:0px}*/

#header{position:absolute;top:0px;left:0px;background:#333;border-bottom:solid 1px #000;height:48px;min-width:988px;width:100%}
/*#header a{color:#3085c7;float:right;cursor:pointer;padding:0px;font-size:16px}*/
#header div{color:#bbb;width:958px;margin:0px auto;padding:15px;height:18px;text-align:center;font-size:16px;background: url(/assets/img/cloverpicks2.png) no-repeat 10px 50%;}
#header #username{float:right}
#spacer{height:80px}
#footer{display:none;}
.trans{background-image:url("/assets/img/background.png");width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:0;<?=curve(10)?>}
#content{border:solid 2px #c8c8c8;position:relative;margin:10px 20px 70px 250px;background-color:#EEE;padding:15px 10px 10px;padding:1px;font-family: Helvetica, Arial, sans-serif;font-size: 15px;<?=curve(5)?>}
@media screen and (min-width:1050px) {
#content{width:681px;}
#container{width:955px;}
}
/*@media screen and (min-width:1050px) {
#content{width:681px;}
#container{width:955px;}
}*/
#content{width:681px;}
#container{width:955px;}
@media screen and (min-width:1220px) {
#content{width:851px;}
#container{width:1125px;}
#header div{width:1128px;}
}
.title{position:absolute;border:solid 2px #c8c8c8;border-bottom:0px;top:-20px;height:14px;left:5px;font-size:20px;font-weight:bold;color:#3c5a80;background-color:#fff;padding:2px 5px;font-family: Georgia, 'Times New Roman', Times, serif;<?=curveTop(5)?>}
#title{background:#194d63 url("/assets/img/highlight.png") no-repeat 50% 0;position:absolute;top:-28px;right:50px;font-size:35px;font-weight:bold;color:#FFF;padding:0px 10px;font-family: Georgia, 'Times New Roman', Times, serif;border:solid 3px #333;<?=curve(2)?>}

#links{margin:0px;background-color:#d0d0d0;position:absolute;top:20px;left:20px;width:200px;color:#3c5a80;font-weight:bold;padding:5px;<?=curve(0)?>border:solid 1px #aaa}

#links a{outline: none;border:solid 1px transparent;text-align:left;padding:5px;margin:2px;overflow:hidden;font-size:18px;display:block;text-decoration:none;color:#111}
#links li:hover a{background-color:#c0c0c0;}
#links li.active a{background-color:#888;color:#f0f0f0;background-color:#3085c7}
#links li img{float:left;border:none;margin:0px 10px;width:20px}
#links li i{margin-top:3px;opacity:.95}
#links li.active i{background-image:url("../img/glyphicons-halflings-white.png");opacity:.8}
#links hr{border:solid;border-width:1px 0px;border-top-color:#b8b8b8;border-bottom-color:#e8e8e8;height:0px;display:block;margin:8px}
#bottom-bar{height:55px;position:absolute;bottom:0px;width:100%}

#bottom-bar .floater{float:left;margin:8px;padding:5px;background-color:#f8f8f8;background-repeat:no-repeat;border:solid 1px #c0c0c0;font-size:20px;color:#3c5a80;width:120px;height:29px;text-decoration:none;<?=curve(3)?>}
#bottom-bar .floater:hover{-moz-box-shadow: 2px 2px 1px #888;
-webkit-box-shadow: 2px 2px 1px rgba(100,100,100,.3);;
box-shadow: 2px 2px 1px rgba(100,100,100,.3);}
#bottom-bar .sc{width:190px}
#bottom-bar .facebook{width:132px}

.floater div{display:inline-block;position:relative;left:40px;top:4px}

.highlight{
background-image:-webkit-gradient(linear, center top, center bottom, from(rgba(255,255,255,0.15)), to(rgba(0,0,0,0.15)));
background-image:-moz-linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));
background-image:-o-linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));
background-image:linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));}

p{margin-top:0px;margin-bottom:12px}
#login{width:500px;margin:20px auto}

#wait-container {position: absolute;width: 100%;z-index: 13000;top: 5px;}
#wait-container div {position: absolute;width: 100%;text-align: center;margin: auto;height:0px;}
#wait-container span {margin: auto;}

#wait{display:inline-block;height:40px;width:100px;background:url("http://content.sandbox.cloversweet.com/img/pageloading.gif") no-repeat 50%;}



#status-message-container {position: fixed;width: 100%;z-index: 14000;top: 15px;}
#status-message-container div {position: absolute;width: 100%;text-align: center;margin: auto;height:0px;}
#status-message {padding-right: 14px;}
#status-message-container span {margin: auto;}


.vd{border:solid;border-color:transparent #484848 transparent #1d1d1d;border-width:0px 1px;margin:0px 10px}
#header .vd{float:right;height:20px}
[data-url]{cursor:pointer}
/*cleaned*/
@font-face {font-family: 'digital';src: url('http://thecodeplayer.com/uploads/fonts/DS-DIGI.TTF');}

.row{margin-left:0px;overflow:hidden;background:#c5c5c5}
.row-title{width:111px;display:inline-block;float:left;position:relative;border:solid #888;border-color:#d5d5d5 #b5b5b5 #b5b5b5 transparent;border-width:1px 1px 1px 0px;height:34px}
.leagueBar{height:28px;text-align:center;border-top:1pt solid #505050;border-bottom:1pt solid #141414;color:#FFF;
background:#555 url(/assets/img/bar.png);

background-image:-webkit-gradient(linear, center top, center bottom, from(rgba(60,60,60,1)), to(rgba(40,40,40,1)));
background-image:-moz-linear-gradient(top,rgba(60,60,60,1),rgba(40,40,40,1));
background-image:-o-linear-gradient(top,rgba(60,60,60,1),rgba(40,40,40,1));
background-image:linear-gradient(top,rgba(60,60,60,1),rgba(40,40,40,1));

cursor:pointer;line-height:28px}




#sc-page-header{height:30px;border-bottom:solid 1px #c0c0c0;border-width:0px 0px 1px;font-size:20px;padding:12px;
font-family: Verdana, Geneva, sans-serif;
font-weight:normal;  background-color: #eeeeee;
  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#eeeeee), to(#cccccc));
  background-image: -webkit-linear-gradient(top,#eeeeee, #cccccc);
  background-image: -o-linear-gradient(top, #eeeeee, #cccccc);
  background-image: linear-gradient(top, #eeeeee, #cccccc);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#cccccc', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
  zoom:1;}

/*button i{position:relative;top:1px}*/

#content div{font-size:16px;}
#content{padding:0px;min-height:300px}
dl {margin:30px 0px 30px 30px;}
dl dt {background:#aaa;color:#fff;float:left;font-weight:bold;margin-right:10px;padding:5px;width:200px;text-align:right;}
dl dd {margin:4px 0;padding:5px 0;}

#content img{margin:10px;}
#content{padding:1px}

.common-item{
background-color: #E8E8E8;
border: solid 1px #C8C8C8;
background: #EEE;
margin: 10px 200px 10px 10px;
display: block;
padding: 2px;
height: 40px;
position: relative;
cursor: default;
color: #333;
}

.common-item .text{
font-weight: bold;
font-family: Helvetica, Arial, sans-serif;
font-size: 20px;
margin: 10px 0px 10px 30px;
color: #222;
text-decoration:none;
line-height:40px;
}
.common-item:hover{text-decoration:none;

  background: #f8f8ff;
  background: -webkit-gradient(linear, left top, left bottom, from(#f8f8ff), to(#eeeeee));
  background: -moz-linear-gradient(top, #f8f8ff, #eeeeee);
  background: -o-linear-gradient(#f8f8ff, #eeeeee);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f8f8ff', endColorstr='#eeeeee');
  zoom:1;
-webkit-box-shadow:0px 1px 6px rgba(100,100,100,.3);-moz-box-shadow:0px 1px 6px rgba(100,100,100,.3);box-shadow:0px 1px 6px rgba(100,100,100,.3);  background-color: #f4f4f4;
  background-image: -moz-linear-gradient(top, #f4f4f4, #e5e5e5);
  background-image: -ms-linear-gradient(top, #f4f4f4, #e5e5e5);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f4f4f4), to(#e5e5e5));
  background-image: -webkit-linear-gradient(top,#f4f4f4, #e5e5e5);
  background-image: -o-linear-gradient(top, #f4f4f4, #e5e5e5);
  background-image: linear-gradient(top, #f4f4f4, #e5e5e5);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4f4f4', endColorstr='#e5e5e5', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
  zoom:1;}



ol, ul {
        list-style: none;
}


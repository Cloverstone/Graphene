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
/*<link href='http://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>*/
@import url(http://fonts.googleapis.com/css?family=Poiret+One);

body{background:#181818 url('/assets/img/blacknblue.png') no-repeat 50% 0;text-align: center;font-family: Helvetica, Arial, sans-serif;min-width:978px}
#container{width:978px;padding-top:10px;margin:0px auto 25px;position:relative;;border:solid 0px #111;background-color:#ddd;min-height:500px;_height:500px;border:solid 5px #141414;text-align:left;<?=curve(10)?>}
#portrait{position:absolute;top:-50px;left:-25px;}

/*#header{display:none;position:absolute;top:0px;left:0px;background-image:url(/assets/img/stripe.png);opacity:.9;border-bottom:solid 10px #855D40;height:200px;min-width:988px;width:100%;}*/
/*
#account{width:100%;height:32px;background: #333;
  border-bottom: solid 1px #000;
  width:100%;
  height:32px;padding:4px 0px;
  min-width:978px;
}
#account > div{
width:978px;margin:0px auto;
}
#account #username{color:#eee;line-height:32px;font-size:16px;float:right}
[data-action=logout]{float:right;line-height:32px;font-size:16px;color: #3085c7;cursor: pointer;}
[data-action=logout]:hover{color: #3085c7;}
[data-action=page_edit]{color:#fff;line-height:32px;opacity:.6;cursor:pointer}
[data-action=page_edit]:hover{opacity:.8;}

#account .vd {float: right;height: 20px;}
*/

.vd {border: solid;border-color: transparent #484848 transparent #1d1d1d;border-width: 0px 1px;margin: 6px 10px;}


#spacer{height:80px;font-family: 'Poiret One', cursive;}



#footer{display:none;background: url('/assets/img/blacknblue.png') no-repeat 50% 40%;height:40px;margin:-30px 0px -20px;}
.trans{background-image:url("/assets/img/background.png");width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:0;<?=curve(10)?>}
#content{border:solid 2px #c8c8c8;position:relative;margin:8px 0px 70px 235px;width:700px;background-color:white;padding:15px 10px 10px;font-family: Helvetica, Arial, sans-serif;<?=curve(5)?>}
/*.title{position:absolute;border:solid 2px #c8c8c8;border-bottom:0px;line-heigh:25px;top:-22px;height:10px;left:5px;font-size:20px;color:#176783;background-color:#fff;padding:5px 10px;font-family: Helvetica, Arial, sans-serif;<?=curveTop(5)?>}*/
#content > div.title{display:none}
#title{line-height:40px;background:#194d63 url("/assets/img/highlight.png") no-repeat 50% 0;position:absolute;top:-28px;right:50px;font-size:35px;font-weight:bold;color:#FFF;padding:0px 10px;font-family: Georgia, 'Times New Roman', Times, serif;border:solid 3px #333;<?=curve(2)?>}

/*#Projects{position:absolute;top:160px;left:20px;background:#d0d0d0;width:150px;color:#3c5a80;font-weight:bold;padding:5px;<?=curve(0)?>border:solid 1px #aaa}
a.project{line-height:25px;outline:none;border:solid 1px transparent;text-align:left;padding:5px;margin:2px;overflow:hidden;font-size:18px;display:block;text-decoration:none;color:#000;}
a.project:hover,.project .selected{background-color:#b0b0b0;color:#f8f8f8;}
.project.selected{color:#fff;border-color:#fff;text-shadow:1px 1px 1px #888}
.project img{float:left;border:none;margin:0px 10px;height:24px}
*/
a{color:#176783}

#links{margin:0px;background-color:#d0d0d0;position:absolute;top:20px;left:20px;width:180px;color:#3c5a80;font-weight:bold;padding:5px;<?=curve(0)?>border:solid 1px #aaa}

#links a{outline: none;border:solid 1px transparent;text-align:left;padding:5px;margin:2px;overflow:hidden;font-size:18px;display:block;text-decoration:none;color:#111}
#links li:hover a{background-color:#c0c0c0;}
#links li.active a{background-color:#888;color:#f0f0f0;background-color:#3085c7;background-color:#cc9933;background-color:#176783}
#links li img{float:left;border:none;margin:0px 10px;width:20px}
#links li i{margin-top:3px;opacity:.95}
#links li.active i{background-image:url("../img/glyphicons-halflings-white.png");opacity:.8}

#links hr{border:solid;border-width:1px 0px;border-top-color:#b8b8b8;border-bottom-color:#e8e8e8;height:0px;display:block;margin:8px}

#bottom-bar{height:55px;position:absolute;bottom:0px;width:100%}

.resume{background:url('/assets/img/png/glyphicons_036_file.png') 10px 7px;}
.sc{background:url('http://content.steepleconnect.com/img/garbage/homepage/sc.png') 6px 4px;}
.facebook{background:url('/assets/img/png/glyphicons_320_facebook.png') 7px 7px;}
.linkedin{background:url('/assets/img/png/glyphicons_337_linked_in.png') 7px 7px;}

#bottom-bar .floater{opacity:.7;float:left;margin:8px;padding:5px;background-color:#f8f8f8;background-repeat:no-repeat;border:solid 1px #c0c0c0;font-size:20px;color:#3c5a80;color:#000;width:110px;height:29px;text-decoration:none;<?=curve(3)?>}
#bottom-bar .floater:hover{-moz-box-shadow: 2px 2px 1px #888;
-webkit-box-shadow: 2px 2px 1px rgba(100,100,100,.3);;
box-shadow: 2px 2px 1px rgba(100,100,100,.3);}
#bottom-bar .sc{width:190px}
#bottom-bar .facebook{width:122px}

.floater div{display:inline-block;position:relative;left:32px;top:5px}
/*.content div{margin:0px 0px 15px}*/

.highlight{
background-image:-webkit-gradient(linear, center top, center bottom, from(rgba(255,255,255,0.15)), to(rgba(0,0,0,0.15)));
background-image:-moz-linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));
background-image:-o-linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));
background-image:linear-gradient(top,rgba(255,255,255,.15),rgba(0,0,0,.15));}

/*.title{
background-image:-webkit-gradient(linear,center bottom,center top, from(rgba(255,255,255,0)), to(rgba(230,230,230,0.9)));
background-image:-moz-linear-gradient(bottom,rgba(255,255,255,0),rgba(0,0,0,.8));
background-image:-o-linear-gradient(bottom,rgba(255,255,255,0),rgba(0,0,0,.8));
background-image:linear-gradient(bottom,rgba(255,255,255,0),rgba(0,0,0,.8));}

*/
.pull-right{float:right}
p{margin-top:0px;margin-bottom:12px;line-height:22px}
ol, ul {
        list-style: none;
}
#content{overflow:hidden}
#content > div{display:inline-block;width:100%;float:left}
#content div[name=Paragraph] p{oveflow:hidden}
[name=Paragraph]
[name=Paragraph] ol{list-style-type: decimal;}
[name=Paragraph] ol ol{list-style-type: decimal;}
[name=Paragraph] ol ol ol{list-style-type: decimal;}
[name=Paragraph] ul{list-style-type: disc;}
[name=Paragraph] ul ul{list-style-type: circle;}
[name=Paragraph] ul ul ul{list-style-type: square;}



.width1{width:8.33% !important;}
.width2{width:16.66% !important;}
.width3{width:25% !important;}
.width4{width:33.33% !important;}
.width5{width:41.66% !important;}
.width6{width:50% !important;}
.width7{width:58.33% !important;}
.width8{width:66.66% !important;}
.width9{width:75% !important;}
.width10{width:83.33% !important;}
.width11{width:91.66% !important;}
.width12{width:100% !important;}

.width1_5{width:20% !important;}
.width2_5{width:40% !important;}
.width3_5{width:60% !important;}
.width4_5{width:80% !important;}



<?PHP  header("Content-type: text/css");
include_once('tools/css_utils.php');
?>

body{text-align: center;font-family: Helvetica, Arial, sans-serif;min-width:970px}

body {background:#004571 url(/assets/img/staff_back.png) repeat-x 0 50px;}




#container{padding-top:10px;margin:0px auto 25px;position:relative;background-color:#ddd;min-height:500px;border:solid 5px #141414;text-align:left;<?=curve(10)?>_height:500px;}

/*#container{background:transparent;border:0px}*/

#header{position:absolute;top:0px;left:0px;background:#333;border-bottom:solid 1px #000;height:48px;min-width:721px;width:100%}
#header a{color:#3085c7;float:right;cursor:pointer;padding:0px;font-size:16px}
#header div{color:#bbb;width:731px;margin:0px auto;padding:15px;height:18px;text-align:center;font-size:16px;background: url(/assets/img/cloverpicks2png) no-repeat 10px 50%;}
#header #username{float:right}
#spacer{height:80px}
#footer{display:none;}
.trans{background-image:url("/assets/img/background.png");width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:0;<?=curve(10)?>}
#content{border:solid 2px #c8c8c8;position:relative;margin:10px 20px 70px 20px;background-color:#EEE;padding:15px 10px 10px;padding:1px;font-family: Helvetica, Arial, sans-serif;font-size: 15px;<?=curve(5)?>}
#content{width:681px;}
#container{width:721px;}
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
#wait{position:absolute;width:100%;min-width:988px;top:0px;height:40px;background:url("http://content.sandbox.cloversweet.com/img/pageloading.gif") no-repeat 50%;z-index:100000000}

#status-message-container {position: fixed;width: 100%;z-index: 100000;top: 15px;}
#status-message-container div {position: absolute;width: 100%;text-align: center;margin: auto;}
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

.total{width:100px}
input.value{width:100px}
input[type=date],input.date{width:120px}
input{margin:0px 2px}
label{display:inline-block;line-height:30px;font-size:16px;width:140px}

/*#content div{font-size:16px;}*/
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




/* For the details, see:
   http://flowplayer.org/tools/dateinput/index.html#skinning */

/* the input field */
.date {
    border:1px solid #ccc;
    font-size:18px;
    padding:4px;
    text-align:center;
/*    width:194px;*/

    -moz-box-shadow:0 0 10px #eee inset;
    -webkit-box-shadow:0 0 10px #eee inset;
}

/* calendar root element */
#calroot {
    /* place on top of other elements. set a higher value if nessessary */
    z-index:10000;

    margin-top:-1px;
    width:198px;
    padding:2px;
    background-color:#fff;
    font-size:11px;
    border:1px solid #ccc;

    -moz-border-radius:5px;
    -webkit-border-radius:5px;

    -moz-box-shadow: 0 0 15px #666;
    -webkit-box-shadow: 0 0 15px #666;
}

/* head. contains title, prev/next month controls and possible month/year selectors */
#calhead {
    padding:2px 0;
    height:22px;
}

#caltitle {
    font-size:14px;
    color:#0150D1;
    float:left;
    text-align:center;
    width:155px;
    line-height:20px;
    text-shadow:0 1px 0 #ddd;
}

#calnext, #calprev {
    display:block;
    width:20px;
    height:20px;
    background:transparent url(/assets/img/prev.gif) no-repeat scroll center center;
    float:left;
    cursor:pointer;
}

#calnext {
    background-image:url(/assets/img/next.gif);
    float:right;
}

#calprev.caldisabled, #calnext.caldisabled {
    visibility:hidden;
}

/* year/month selector */
#caltitle select {
    font-size:10px;
}

/* names of the days */
#caldays {
    height:14px;
    border-bottom:1px solid #ddd;
}

#caldays span {
    display:block;
    float:left;
    width:28px;
    text-align:center;
}

/* container for weeks */
#calweeks {
    background-color:#fff;
    margin-top:4px;
}

/* single week */
.calweek {
    clear:left;
    height:22px;
}

/* single day */
.calweek a {
    display:block;
    float:left;
    width:27px;
    height:20px;
    text-decoration:none;
    font-size:11px;
    margin-left:1px;
    text-align:center;
    line-height:20px;
    color:#666;
    -moz-border-radius:3px;
    -webkit-border-radius:3px;
}

/* different states */
.calweek a:hover, .calfocus {
    background-color:#ddd;
}

/* sunday */
a.calsun {
    color:red;
}

/* offmonth day */
a.caloff {
    color:#ccc;
}

a.caloff:hover {
    background-color:rgb(245, 245, 250);
}


/* unselecteble day */
a.caldisabled {
    background-color:#efefef !important;
    color:#ccc	!important;
    cursor:default;
}

/* current day */
#calcurrent {
    background-color:#498CE2;
    color:#fff;
}

/* today */
#caltoday {background-color:#333;color:#fff;}

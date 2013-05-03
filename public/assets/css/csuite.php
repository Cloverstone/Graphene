<?php header("Content-type: text/css");
include_once('tools/css_utils.php');
include_once('commonbar.css');
include_once('reset.php');
?>


#sc-footer{width:1002px;text-align:center;margin:0px auto 5px;color:#999}
#sc-footer a{color:#999}
#container{width:<?=content_width?>px;margin:30px auto 10px;}

#status-message-container{position:fixed;width:100%;z-index:100000;top:15px}
#status-message-container div{position:absolute;width:100%;text-align:center;margin:auto}
#status-message-container span{margin:auto;}
#status-message{padding-right:14px}


body#profile{font-family: Verdana, Geneva, sans-serif;font-size:14px;background:#666;margin:0px;padding:0px}

#sc-sidebar-container {min-height:10px;position:relative}

#sidemenu{width:51px;display:inline-block;margin-top:35px;border:solid 2px #aaa;border-right:0px;position:relative;background-color:#202329;padding:5px 0px;<?curveLeft(5)?>}

/*#sidemenu{position:fixed;top:5px;left:0px;}*/

#sidemenu:hover{z-index:1000;}
#sidemenu li{margin:4px 0px}
#sidemenu a span{display:none}
#sidemenu a:hover span{display:inline-block;margin-left:48px;}
#sidemenu a{display:block;overflow:hidden;height:25px;min-width:32px;position:relative;}
#sidemenu a{padding:15px 8px 8px;font-size:14px;cursor:pointer;color:#333;}

[name=Profile] [name=dashboard],
[name=Profile_-_Dashboard] [name=dashboard],
[name=Profile_-_Connections] [name=connections],
[name=Profile_-_Basic_Info] [name=account],
[name=Profile_-_Files] [name=files],
[name=Profile_-_Images] [name=images],
[name=Profile_-_Discussions] [name=discussions],
[name=Profile_-_Directory] [name=directory],
[name=People] [name=people],
[name=Calendar] [name=calendar],
#sidemenu a.selected{background-color:<?=normalize("#202329",.4)?>;}

#sidemenu a:hover{
  overflow:hidden;color:#f0f0f0;
  -webkit-transition: width 0.1s ease;
  -moz-transition: width 0.1s ease;
  -ms-transition: width 0.1s ease;
  -o-transition: width 0.1s ease;
  transition: width 0.1s ease;
  width:150px;
  <?curveRight(5)?>
  background-color:#333;
  <?gradient(normalize("#202329",.35),normalize("#202329",.25))?>
}

#sidemenu a div{display:inline-block;position:absolute;top:8px;left:8px;width:32px;height:32px;background-repeat:no-repeat;background-position:50%}

[name=account] div{background-image:url('../img/icons/color/32/diagram-47.png');}
[name=connections] div{background-image:url('../img/icons/color/32/diagram-42.png')}
[name=files] div{background-image:url('../img/icons/color/32/diagram-14.png');}
[name=discussions] div{background-image:url('../img/icons/color/32/diagram-04.png');}
[name=directory] div{background-image:url('../img/icons/color/32/diagram-07.png');}
#sidemenu [name=people] div{background-image:url('../img/icons/color/32/diagram-48.png');}
[name=calendar] div{background-image:url('../img/icons/color/32/diagram-11.png');}
[name=dashboard] div{background-image:url('http://content.sandbox.steepleconnect.net/img/icons/color/32/diagram-06.png');}

[name=notifications]{background-image:url('../img/icons/color/32/diagram-04.png');background-repeat:no-repeat;background-position:9px 50%}
[name=preferences]{background-image:url('../img/icons/color/32/diagram-43.png');background-repeat:no-repeat;background-position:9px; 50%}
[name=images]{background-image:url('../img/icons/color/32/diagram-23.png');background-repeat:no-repeat;background-position:9px 50%}

#profile #sc-page-header{height:30px;border-bottom:solid 1px #c0c0c0;border-width:0px 0px 1px;font-size:20px;padding:12px;
font-family: Verdana, Geneva, sans-serif;
font-weight:normal;<?gradient('#eeeeee','#cccccc')?>}
button i{position:relative;top:1px}
.subscription {width: 641px;}

#profile #cp-content{border:solid #333;border-width:2px 1px;border-color:rgba(238,238,238,1);background:#eee;margin:8px 0px 8px -2px;min-height:500px;width:752px;z-index:100;position:relative;<?boxShadow(0,0,8,"#111")?><?curve(5)?>}
#profile #content{margin:0px;border-width:1px 0px 0px}
.styleable[name=s1],.styleable[name=s2],.styleable[name=s3]{display:none}





.content-area{width:350px;margin:10px;background:#ddd;padding-bottom:5px;<?boxShadow(1,1,4,"#000")?>}



/*#cp-content form input[type=submit]{width:auto;top:-3px;position:relative;left:0px}
*/
#profile #title-bar{position:absolute;top:30px;height:150px;width:100%;min-width:1002px;border:solid #bbb;border-width:0px 0px 4px;background-image:url('http://content.sandbox.steepleconnect.net/img/bg1.png');background-repeat:repeat}
#profile .styleable{display:none}

#container{padding:0px;}
body #sc-toppad{height:33px}
#menu,#sc-header,.container-shadow{display:none}


.btn-awesome{
<?$stop = new CSS_Color("0055cc");//$mixed = $gray->mix($stop->bg['+1'], 60, $stop->bg['0']);
  gradient(spin('#'.$stop->bg['0'],-15),'#'.$stop->bg['0'])?>
  border-color: #<?=$stop->bg['0']?> #<?=$stop->bg['0']?> #<?=$gray->darken($stop->bg['0'], .30)?>;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}

.btn-awesome,.btn-awesome:hover {  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);  color: #ffffff;}
.btn-awesome.active,.btn-awesome.active {  color: rgba(255, 255, 255, 0.75);}
.btn-awesome:hover,.btn-awesome:active,.btn-awesome.active,.btn-awesome.disabled,.btn-awesome[disabled] {  background-color: #<?=$stop->bg['0']?>;}
.btn-awesome:active,.btn-awesome.active {
  background-color: #004099 \9;
  background-color: #<?=$gray->darken($stop->bg['0'], .314)?> \9;
}

.btn-purple{
<?$stop = new CSS_Color("7a43b6");//$mixed = $gray->mix($stop->bg['+1'], 60, $stop->bg['0']);
  gradient(lighten('#'.$stop->bg['0'],20),'#'.$stop->bg['0'])?>
  border-color: #<?=$stop->bg['0']?> #<?=$stop->bg['0']?> #<?=$gray->darken($stop->bg['0'], .30)?>;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}

.btn-purple,.btn-purple:hover {  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);  color: #ffffff;}
.btn-purple.active,.btn-purple.active {  color: rgba(255, 255, 255, 0.75);}

.btn-purple:hover,.btn-purple:active,.btn-purple.active,.btn-purple.disabled,.btn-purple[disabled] {  background-color: #<?=$stop->bg['0']?>;}
.btn-purple:active,.btn-purple.active {
  background-color: #004099 \9;
  background-color: #<?=$gray->darken($stop->bg['0'], .314)?> \9;
}



#alt-footer {height: 30px;background-color: transparent;display: block;margin-top: 0px;min-width: 1002px;}
#sc-commonbar{border-color:#000}
#sc-commonbar-shadow {display: block;}

#sc-sidebar-container {width:60px;padding-left:5px;height:20px;display:inline-block;}
body #sc-page-header{width:728px}

body #sc-page-header{width:895px}
#profile #cp-content{width:919px;margin-left:58px}
#content{position:relative;top:0px;width:919px;border-top:solid 1px #fff}



#left-column {display:none}
/*.section-title{width:200px}*/
.sc-admin-common{width:600px;margin-left:50px;background-color:#e8e8e8}


button.btn{margin-top:0px}

.sc-admin-common .icon{width:32px;height:32px;float:left;margin:4px;background-position:50%;background-repeat:no-repeat}

.filetype .icon{background-image:url('../img/icons/file/_blank.png');}
.pdf .icon{background-image:url('../img/icons/file/pdf.png');}
.ppt .icon,.pptx .icon{background-image:url('../img/icons/file/ppt.png');}
.xls .icon,.xlsx .icon{background-image:url('../img/icons/file/xls.png');}
.doc .icon,.docx .icon{background-image:url('../img/icons/file/doc.png');}
.rtf .icon{background-image:url('../img/icons/file/rtf.png');}
.section-title,.section-title div{position:relative;cursor:pointer}
.section-title{<?boxShadow(1,1,3,"rgba(120,120,120,.6)")?>}
.section-title div{display:inline-block;width:80px}
.section-title i{margin-top:3px;opacity:.6}
.section-title:hover i{opacity:.8}
.section-title span{display:block;border:solid;opacity:.7;border-color:#999 transparent transparent #999;border-width:32px 32px 0px 32px;position:absolute;top:0px;left:0px;width:200px;<?curveLeft(2)?>}
.section-title.pdf span{border-color:#c92127 transparent transparent #c92127;}
.section-title.ppt span,.section-title.pptx span{border-color:#f69623 transparent transparent #f69623;}
.section-title.doc span,.section-title.docx span{border-color:#1482b3 transparent transparent #1482b3;}
.section-title.xls span,.section-title.xlsx span{border-color:#84c340 transparent transparent #84c340;}

form{width:680px}
#userInfo,#file_upload_form{margin:10px;padding-bottom:10px;border:solid 1px #fff;clear:both}
#file_upload_form{border-color:transparent;padding-left:10px}
[name=filter]{float:right;margin:0px 0px 0px 10px;padding-left:25px;background-image:url(../img/magnify.png);background-repeat:no-repeat;background-position:4px 50%}

#container.wide #cp-content {width: 919px;}
#container.wide #sc-sidebar-container {display: inline-block;}
.sc-cal-day, .sc-cal-empty {width: 126px;}
.sc-cal-event {width: 120px;}
#sc-cal-container { width: 896px;}
.sc-cal-placeholder{width:122px}
#search-section,#main-section{float:left;display:inline-block;min-height:10px}
#search-section{float:left;width:250px;}
#main-section{width:660px}


/*
#sc-commonbar-logo{display:none}
#sc-commonbar a#sc-commonbar-logo{display:none}
#sc-churchName-position{top:10px;left:150px}
#sc-header-churchName{color:#eee;font-weight:normal}
#sc-header{display:inline-block;background:none;border:none}
#sc-logo-position{left:0px;top:8px;border:solid 1px #ddd;height:84px;line-height:84px;width:84px}
#sc-header-logo{width:80px;padding:2px}
body #sc-toppad{height:75px}
*/



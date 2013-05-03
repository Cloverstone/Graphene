<?PHP  header("Content-type: text/css");
include_once('../public/assets/css/tools/css_utils.php');
include_once('../public/assets/css/tools/csscolor.php');
?>
#content{overflow:hidden;}
#content > div{display:inline-block;width:100%;float:left}
#content div[data-name=Paragraph] p{oveflow:hidden}
/*[name=Paragraph] p{padding:0px 5px 10px}*/
[data-name=Paragraph] p{padding:0px 0px 10px}
[data-name=Paragraph] ol{list-style-type: decimal;}
[data-name=Paragraph] ol ol{list-style-type: decimal;}
[data-name=Paragraph] ol ol ol{list-style-type: decimal;}
[data-name=Paragraph] ul{list-style-type: disc;}
[data-name=Paragraph] ul ul{list-style-type: circle;}
[data-name=Paragraph] ul ul ul{list-style-type: square;}

#content div[data-name=Code] > pre,
#content div[data-name=Heading] > h4,
#content div[data-name=Heading] > h3,
#content div[data-name=Heading] > h2 ,
#content div[data-name=Paragraph] > div,
#content div[data-name=Alert] > div{margin-left:20px;margin-right:20px;}
/*#content div[name=Image] div{margin-left:15px;margin-right:25px;margin-bottom:20px}
#content div[name=Image] div{margin:10px 25px 15px 20px}*/
#content div[data-name=Image] div{margin:10px 10px 10px 0px;padding:0px 20px}
/*[name=Image]{padding-bottom:20px}*/



#content .alert { margin-bottom: 10px;}

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
#content > div.pull-right {float:right;}
#content > div.pull-left {float:left;}

/*#wait{position:absolute;width:100%;min-width:988px;top:0px;height:40px;background:url("http://content.sandbox.cloversweet.com/img/pageloading.gif") no-repeat 50%;z-index:100010}

#status-message-container {position: fixed;width: 100%;z-index: 100000;top: 11px;}
#status-message-container div {position: absolute;width: 100%;text-align: center;margin: auto;}
#status-message {padding-right: 14px;}
#status-message-container span {margin: auto;}
*/
.vd {border: solid;border-color: transparent #484848 transparent #1d1d1d;border-width: 0px 1px;margin: 6px 10px;}
.pull-right{float:right}
.pull-left{float:left}



/*.widget .title{padding:4px;border-bottom:solid 1px #aaa}*/
.widget-common{border:solid 1px #d8d8d8;position:relative;background-color:#eee;padding-left:4px;height:32px;line-height:32px;display:block;color:#111;margin:2px;cursor:pointer;overflow:hidden;}

/*lighter layout*/
.widget-common{border-width:0px 0px 1px;border-color:#e8e8e8;background:none;margin:0px}

.widget-content{padding:5px;border:solid 2px #fff;background:#f4f4f4;margin:5px}
.widget-common:hover{-webkit-box-shadow:0px 1px 6px rgba(100,100,100,.3);-moz-box-shadow:0px 1px 6px rgba(100,100,100,.3);box-shadow:0px 1px 6px rgba(100,100,100,.3);  background-color: #f4f4f4;
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

.widget-common .action{border:solid 1px #fff;float:right;margin:1px 1px 0px 0px;background:#aaa;padding:6px 7px 7px;opacity:.4;display:display:inline-block;visibility:hidden;color:#000}
.widget-common:hover .action{display:inline-block;visibility:visible;}
.widget-common .action:hover{opacity:.7;color:#fff !important}
.widget-common .action:hover i{background-image:url("../img/glyphicons-halflings-white.png");}
.widget-common a.default{position:absolute;top:0px;right:0px;bottom:0px;left:0px}
.section-title span.color{display:block;border:solid;opacity:.7;border-color:#999 transparent transparent #999;border-width:32px 32px 0px 32px;
position:absolute;top:0px;left:0px;width:50%;
  -moz-border-radius-bottomleft:2px;
  -webkit-border-bottom-left-radius:2px;
  border-bottom-left-radius:2px;
  -moz-border-radius-topleft:2px;
  -webkit-border-top-left-radius:2px;
  border-top-left-radius:2px;}
.section-title.red span.color{border-color:#c92127 transparent transparent #c92127;}
.section-title.orange span.color{border-color:#f69623 transparent transparent #f69623;}
.section-title.blue span.color{border-color:#1482b3 transparent transparent #1482b3;}
.section-title.green span.color{border-color:#84c340 transparent transparent #84c340;}
.section-title.purple span.color{border-color:#953291 transparent transparent #953291;}
.section-title b{color:#eee;}
.section-title .caret{display:inline-block;margin-top:17px;margin-left:5px;border-top-color:#eee;}
.section-title span.menu{float:right;opacity:1;cursor:pointer}
.section-title span.menu:hover{opacity:1}

.section-title div{position:relative;display:inline-block}
.section-title .dropdown-toggle{
text-decoration:none;display:inline-block;
}
.section-title .pull-right > .dropdown-menu {
right: -5px;
}
.section-title{
font-weight:normal;font-family:calibri,sans-serif;font-size:16px;height:32px;position:relative;font-size:16px;padding:0px 10px;background:#ccc;
border:solid 1px #888;color:#fff;margin:10px 5px 5px;line-height:32px;
  -webkit-box-shadow:1px 1px 3px rgba(120,120,120,.6);-moz-box-shadow:1px 1px 3px rgba(120,120,120,.6);box-shadow:1px 1px 3px rgba(120,120,120,.6);
  <?=curve(3)?>
  background-image: -moz-linear-gradient(top, #cccccc, #bbbbbb);
  background-image: -ms-linear-gradient(top, #cccccc, #bbbbbb);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#cccccc), to(#bbbbbb));
  background-image: -webkit-linear-gradient(top,#cccccc, #bbbbbb);
  background-image: -o-linear-gradient(top, #cccccc, #bbbbbb);
  background-image: linear-gradient(top, #cccccc, #bbbbbb);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#bbbbbb', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
  zoom:1;}

.widget-content{padding:5px;border:solid 2px #fff;background:#f4f4f4;margin:5px 5px 15px;position:relative;overflow:hidden}

.section-title i{top:1px;position:relative;}
.section-title > i{top:2px;opacity:.6}
.section-title:hover i{opacity:.8}

.section-full{z-index: 11001;position: relative;}
.section-full .section-title{margin:0px 0px 5px;height:42px;line-height:42px;z-index:1;position:fixed;left:241px;right:241px;border-width:0px 0px 1px;<?=curve(0)?>}
.section-full .section-title span.color{border-width: 42px 42px 0px 32px;<?=curve(0)?>}
.section-full .widget-common{height:40px;line-height:40px}
.section-full .widget-common .action{margin-top:5px;margin-right:5px;}
.section-full .widget-content{border:none;background:none;position:absolute;top:40px;right:241px;left:0px;}
#content > div#section-options{width:220px;border-left:solid 1px #e0e0e0;padding:10px;background:#eee;position:fixed;z-index:12000;top:41px;right:0px;bottom:0px;text-align:left}










.ui-ptags-tag-container{display:block;width:220px;margin-top:3px;}
.ui-ptags-tag{border:solid 1px #e0e0e0;margin:2px 2px !important;padding:2px 5px;background:#f0f0f0;<?curve(3)?>}
.ui-ptags-tag.ui-state-hover{border:solid 1px #d0d0d0;background:#e0e0e0;<?curve(3)?>}
.ui-ptags-tag-text.ui-ptags-tag-text-icon {margin-right: 22px;text-decoration:none;color:#444}
.ui-ptags-tag.ui-state-hover .ui-ptags-tag-text.ui-ptags-tag-text-icon{color:#343434}

.ui-icon-circle-minus{background:url("../img/glyphicons-halflings.png") -311px 1px;opacity:.7;border:solid 0px}

.embedded-form{margin:10px 20px}



#account{width:100%;height:32px;background: #333;border-bottom: solid 1px #000;width:100%;height:32px;padding:4px 0px;min-width:978px;position:fixed;z-index:11100;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-size: 14px;}
/*#account > div{width:978px;margin:0px auto;}*/
#account > div{padding:0px 20px}
#account #username{color:#eee;line-height:32px;font-size:14px;float:right}
#account .dropdown-toggle,#account > div > a,#account > div > [data-action=_edit]{color:#fff;line-height:32px;opacity:.6;cursor:pointer;text-decoration:none}
#account .dropdown-toggle:hover,#account > div > a:hover,#account > div >[data-action=_edit]:hover{opacity:.8;}
#account > div > a[data-action=logout]{float:right;line-height:32px;opacity:1;font-size:14px;color: #3085c7;cursor: pointer;}
#account > div > a[data-action=logout]:hover{color: #3085c7;opacity:1;text-decoration:underline}
#account .dropdown .caret {margin-top: 14px;border-top-color:#fff}

.section-title .dropdown-menu::after, #account .dropdown-menu::after {position: absolute;top: -6px;right: 10px;display: inline-block;border-right: 6px solid transparent;border-bottom: 6px solid #ffffff;border-left: 6px solid transparent;content: '';}
.section-title .dropdown-menu, #account .dropdown-menu{text-align:left}
.section-title .dropdown-menu::before, #account .dropdown-menu::before {position: absolute;top: -7px;right: 9px;display: inline-block;border-right: 7px solid transparent;border-bottom: 7px solid #ccc;border-left: 7px solid transparent;border-bottom-color: rgba(0, 0, 0, 0.2);content: '';}

#account .vd {float: right;height: 20px;}


.map_canvas{width:100%;height:300px;}
.dropcap {color:gray;font-size: 24px;float: left;display: block;margin: 0 7px 0 0;line-height: 1;}





.jqplot-pie-series.jqplot-data-label{color:#e8e8e8}
table.jqplot-table-legend {padding:5px;}
.jqplot-target {
/*height:200px;
height:177px;
margin-left:-10px;*/
margin-left:0px;
margin-bottom:25px
}

.hover_item.tip span{margin:0px 0px 5px;display:inline-block;color:#fff;background:#333;padding:2px 8px;font-size:12px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}
.hover_item.tip.bottom span{margin:5px 0px 0px;}
.hover_item.tip .arrow{bottom: 0;right: 10px;position:absolute;margin-left: -5px;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid #333;}
.hover_item.tip.bottom .arrow{top: 0;border-bottom: 5px solid #333;border-top:none;bottom:auto}
.hover_item.right .arrow{bottom:auto;right:auto;left:0px;top:13px;position:absolute;margin-bottom: -5px;border-top: 8px solid transparent;border-bottom: 8px solid transparent;border-right: 8px solid #000;}
.hover_item div.description{width:200px;min-height:50px;background:#000;color:#fff}

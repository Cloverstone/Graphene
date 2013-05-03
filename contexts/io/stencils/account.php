<div id="account">
  <div>
    <a data-action="logout">Log Out</a>
    <span class="vd"></span>
<div class="dropdown  pull-right" style="line-height:32px;">
  <a class="dropdown-toggle" data-toggle="dropdown" style="height:32px">Actions <span class="caret"></span></a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
          <li><a id="run" onclick="run()"><i class="icon-play"></i> Run</a></li>
          <li><a id="_edit" data-action="_edit"><i class="icon-pencil"></i> Edit</a></li>
          <li><a id="options"><i class="icon-cog"></i> Options</a></li>
        </ul>
</div>
    <span class="vd"></span>
    <a href="http://<?=$_SERVER['SERVER_NAME']?>/admin/io" class="pull-right">
      <i class="icon-white icon-cog"></i> Admin
    </a>

    <!--span class="vd"></span>
    <a class="pull-right" onclick="run()">
      <i class="icon-white icon-play"></i> Run
    </a>
    <span class="vd"></span>
    <a data-action="_edit" class="pull-right">
      <i class="icon-white icon-pencil"></i> Edit
    </a-->

    <span class="vd"></span>
    <span id="username"><?=$username?></span>
  </div>
</div>
<div style="height:41px"></div>


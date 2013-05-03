<form class="form-horizontal" style="margin:20px 0 0">
  <div class="control-group">
    <label class="control-label" for="">Domain:</label>
    <div class="controls">
      <span class="uneditable-input"><?=$domain?></span>
    </div>
  </div>

  <div class="control-group">
    <label class="control-label" for="">Modules:</label>
    <div class="controls">
      <span class="uneditable-inpu"><?foreach($modules as $module){echo $module.', ';}?></span>
    </div>
  </div>

</form>

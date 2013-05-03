    <div class="widget-common filterable" id="<?=$_id?>" title="<?=$options['path']?>" data-clear="true" href="/<?=$slug?>">
      <div style="overflow:hidden;position:absolute;right:200px;top:0px;left:5px;"><?=$options['title'];?></div>
      <div class="action remove" data-url="/remove/page/<?=$_id?>" data-title="Remove">
        <i class="icon-remove"></i>
      </div>
      <a class="action edit" data-clear="true" data-title="Edit" href="/builder/#!/<?=$slug?>">
        <i class="icon-pencil"></i>
      </a>
      <span class="pull-right" style="margin-right:10px"><?=date ("n/j/y g:ia",$last_updated)?></span>
    </div>

<div class="width2 thumb filterable" style="display:inline-block" data-action="view_image" id="<?=$_id?>" data-ext="<?=$ext?>">
  <div class="thumbnail" style="height:135px;background:#fff;margin:10px 5px 5px 10px">
  <div data-verb="DELETE" data-url="/images/<?=$_id?>" class="remove-image" title="Remove"><i class="icon-remove"></i></div>
  <div class="edit-image" data-action="edit_image" data-name="<?=$name?>" data-id="<?=$_id?>" title="Edit"><i class="icon-pencil"></i></div>
    <div style="line-height:100px;height:100px;text-align:center;border:solid 1px #eee;background:#f8f8f8 url('/uploads/img/icon_<?=$_id?>.<?=$ext?>') no-repeat 50%">
    </div>
    <div class="caption" style="overflow:hidden;height:16px">
      <?=str_replace(" ","&nbsp;",$name)?>
    </div>
  </div>
</div>

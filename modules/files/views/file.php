<div class="widget-common filterable" id="<?=$_id?>" data-ext="<?=$ext?>">
  <?=str_replace(" ","&nbsp;",$name)?>
  <div data-verb="DELETE" data-url="/files/<?=$_id?>" class="action remove" title="Remove" data-title="Remove"><i class="icon-remove"></i></div>
      <a class="action" data-prevent="true" style="text-decoration:none;" href="/files/<?=$name?>.<?=$ext?>"" data-title="Open">
        <span style="line-height:15px;font-weight:bold;"><i class="icon-download-alt"></i> <?=$ext?></span>
      </a>
  <!--div class="action edit" data-action="edit_file" data-name="<?=$name?>" data-id="<?=$_id?>" title="Edit"><i class="icon-pencil"></i></div-->
</div>




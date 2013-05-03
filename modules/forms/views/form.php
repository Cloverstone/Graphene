<form action="/forms/submit" class="form-<?=$options["layout"]?>" data-generated="cobler" style="padding:20px" method="post">
  <fieldset>
    <legend><?=$options["title"]?></legend>
    <?=$html?>
  </fieldset>
  <input type="hidden" name="form_id" value=<?=$_id?> />
  <div class="form-actions">
    <button class="btn btn-primary btn-themed" type="submit"><i class="icon-ok icon-white"></i> <?=$options["s_text"]?></button>
  </div>
</form>


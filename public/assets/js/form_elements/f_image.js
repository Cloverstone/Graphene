var fImage = new Form.register({type:"image"});

fImage.create = function(item){
var label = item.label+':';
if(label == ':'){label = "";}
  return '<div data-type="image" class="formitem image" name="'+item.name+'"><div style="overflow:hidden"><div>'+label+'</div><input placeholder="Enter image url here or..." style="margin-top:5px" type="text" name="imgUrl" value="'+item.value+'"><div class="btn" style="float:left;margin:0px 6px 3px 0px">Select Image</div><img style="max-width:100px" src="'+item.value+'"></div></div>';
}

$(".image-option").live("click",function(){
$("[name=image_url]").val("/assets/img/"+this.attr("name")+".png");
})

fImage.generate = function(){
  var text = '<div id="img-selection" style="width:620px;height:360px;overflow:auto">';

  for(var i in fImage.items){
    text += "<div style='width:120px;height:120px;float:left'><img style='margin:5px;max-width:100px;max-height:100px;' name='"+fImage.items[i].id+"' class='img-polaroid' src='/uploads/img/icon_"+fImage.items[i]._id+"."+fImage.items[i].ext+"'></div>";
  }
return text+"</div>";
}

fImage.callback = function(item,form){
  $("[name="+item.name+"] input").change(function(){
      widget.update();
  });
  $("[name="+item.name+"] .btn").click(function(){
    imageModal = new modal({title:"Choose Image",
      footer:$("<div>").addClass("btn btn-primary").html("OK"),content:"",form:{label:"",options:{inline:true},items:[
        {type:"upload",label:"URL",name:"image_url",value:"/upload/img"}
      ]},content:fImage.generate(),
    });
    $("#img-selection").find("[src='"+$("[name="+item.name+"] [name=imgUrl]").val()+"']").addClass("selected");

    imageModal.modalEl.click(function(event){
      event.stopPropagation();
      if(event.srcElement.className == "img-polaroid"){
        $("[name=image_url]").val("/assets/img/"+$(event.srcElement).attr("name")+".png");
        $("#img-selection").find(".selected").removeClass("selected");
        $(event.srcElement).addClass("selected");
      }
    });
    imageModal.modalEl.find(".modal-close").click(function(event){
      event.stopPropagation();
      imageModal.remove();
    });
    imageModal.modalEl.find(".modal-bottom .btn-primary").click(function(event){
      event.stopPropagation();
      var tempurl= $("#img-selection .selected").attr("src");
      $("[name="+item.name+"] [name=imgUrl]").val(tempurl);
      $("[name="+item.name+"] img").attr("src",tempurl);
      widget.update();
      imageModal.remove();
    });
  });
}
fImage.postUpload = function(tempurl,obj){
      imageModal.hide();
      $("[name=imgUrl]").val("/uploads/img/"+tempurl);
      $("[name=imgUrl]").siblings("img").attr("src","/uploads/img/"+tempurl);
      var urlitems = tempurl.split(".");
      fImage.items.push(obj);

      widget.update();
      imageModal.remove();
}
fImage.parse = function(container){
  var elem = container.find('[name=imgUrl]');
  return elem.val();
}


function Build(options){
  this.options = $.extend({target:"#content",form:"#sidebar",source:"#sidebar",autoedit:true,associative:true},options);

  $(this.options.target+" #cb-starter,"+this.options.target+" #cb-content").remove();
  $(this.options.target).append($("<div>").attr("id","cb-starter").html("<i class='icon-arrow-left' style='margin-top:3px;opacity:.7'></i> To Begin click on or drag a WIDGET from the left and drop it on ME!"));
  $(this.options.target).append($("<div>").attr("id","cb-content"));

  $(this.options.form).empty();
  $(this.options.source).empty();

  if($("#cb-source").length == 0){
  $(this.options.source).append($("<ul>").attr("id","cb-source"));
  for(var i in widgets){
    $('<li>').attr('data-name',widgets[i].default_obj.type).data("json",widgets[i].default_obj).html(widgets[i].default_obj.display || widgets[i].default_obj.type).appendTo("#cb-source");
  }
  }
  if($("#cb-form").length == 0){
    $(this.options.form).append($("<div>").attr("id","cb-form"));
  }

  this.reload = function(){
    var temp = this.toJSON();
    $("#cb-content").empty();
    this.load(temp);
  }

  this.load = function(pageItems){
    for(var i in pageItems){
      $("#cb-starter").hide();
      pageItems[i] = $.extend(true,{guid:generateUUID()},widgets[pageItems[i].type].default_obj,pageItems[i]);
      
      var el = $('<li>').attr('data-name',pageItems[i].type).html(widgets[pageItems[i].type].toHTML(pageItems[i])).data('json',pageItems[i]);
      if(widgets[pageItems[i].type].validate(pageItems[i])){
        $(el).appendTo("#cb-content");
        prepareEl(el);
      }
      /*if(widgets[pageItems[i].type].runJS){
        $('body').append(widgets[pageItems[i].type].getJS(pageItems[i]));
      }*/
    }
  }
  this.listView = function(){
    var pageItems = this.toJSON();
    $("#cb-content").empty();

    $("#cb-starter").hide();
    for(var i in pageItems){
      pageItems[i] = $.extend(true,{guid:generateUUID()},widgets[pageItems[i].type].default_obj,pageItems[i]);
//widgets[pageItems[i].type].toHTML(pageItems[i])
      var div = widget.prototype.toHTML(pageItems[i],false);
      div.html(pageItems[i].type).addClass("width12").css({"margin":"2px","padding":"2px","background-color":"#fff"});      

      var el = $('<li>').attr('data-name',pageItems[i].type).html(div).data('json',pageItems[i]);
      if(widgets[pageItems[i].type].validate(pageItems[i])){
        $(el).appendTo("#cb-content");
//        prepareEl(el).html(div).attr("class","width12");
        $(el).addClass($(el).children("div").attr("class"));
        $(el).append($("<div>").addClass("veil"));
        $(el).append($("<span>").addClass("remove-item").attr("data-title","Remove").html('<i class="icon-minus"></i>'));
        $(el).append($("<span>").addClass("duplicate-item").attr("data-title","Duplicate").html('<i class="icon-plus"></i>'));
      }
    }
  }

  this.toJSON = function(){
if(this.options.associative){
    json = {};
}else{
    json = [];
}
if(this.options.associative){
    $('#cb-content > li').each(function(){
      var tempjson = $(this).data('json');
      json[tempjson.guid] = tempjson;
    });
}else{
    $('#cb-content > li').each(function(){
      json.push($(this).data('json'));
    });
}
    return json;
  }

  this.toHTML = function(json){
    if(json == undefined){
      json = this.toJSON();
    }
    var tempDiv = $('<div>');
    for(var i in json){
      widgets[json[i].type].toHTML(json[i],true).appendTo(tempDiv);
    }
    var html = tempDiv.html();
    return html;
    /*for(var i in json.json.items){
    if(widgets[json.json.items[i].type].getJS != undefined){
      html+=widgets[json.json.items[i].type].getJS(json.json.items[i]);
    }
    }*/
  }
  this.deselect = function(){
    deselect($("li.selected"));
  };
  $("#cb-form").click(function(event){event.stopPropagation();});
  $('html').die();
  $('html').live('click',function(event){
    if(event.srcElement){
      if(event.srcElement.className != "veil selected"){
        deselect($("li.selected"));
      }
    }
  });

  function select(el){
    if(!$(el).hasClass('selected')){
      if(cb.options.autoedit){
        edit(el);
      }
      $("li.selected").removeClass("selected");
      $(el).addClass("selected");
      $(el).children(".veil").addClass("selected");
    }
  }
  function edit(el){
      if(typeof myform !== "undefined"){
         myform.destroy();
         if($("li.selected").length >0){
           widgets[$("li.selected").data("json").type].gc();
         }
      }
      $("#cb-source").hide();
      $("#cb-form").show();
      myform = $("#cb-form").jqform(widgets[$(el).attr('data-name')].toFORM($(el).data("json")));
  }
  function deselect(li){
    //for(var i in myform.fieldsets){
    //  $("[name="+myform.fieldsets[i]+"]").empty();
    //}
    if(typeof myform !== "undefined"){
       myform.destroy();
       if($(li).length > 0){
         widgets[$(li).data("json").type].gc();       
      }
    }

    $(li).removeClass("selected");

    $("#cb-form").hide();
    $("#cb-source").show();

  }
  function prepareEl(el){
    $(el).html(widgets[$(el).attr('data-name')].toHTML($(el).data("json")));
    $(el).addClass($(el).children("div").attr("class"));
    $(el).append($("<div>").addClass("veil"));
    $(el).append($("<span>").addClass("remove-item").attr("data-title","Remove").html('<i class="icon-minus"></i>'));
    $(el).append($("<span>").addClass("duplicate-item").attr("data-title","Duplicate").html('<i class="icon-plus"></i>'));
    return el;
  };

  $("#cb-content li span.remove-item").die();
  $("#cb-content li span.remove-item").live("click",function(event){
    event.stopPropagation();
    $('.hover_item').remove();
    var li = this.parentNode;

    if($(li).hasClass("selected")){
     deselect(li);
    }
    widgets[$(li).data("json").type].remove($(li).data("json"));
    $(li).fadeOut("fast",function(){
      $(this).remove();
      if($("#cb-content div").length == 0){
        $("#cb-starter").show();
      }
    });
  });
  $("#cb-content li span.duplicate-item").die();
  $("#cb-content li span.duplicate-item").live("click",function(event){
    event.stopPropagation();
    var li = this.parentNode;
    if(!cb.options.autoedit){
      edit(li);
    }else{
      var json = $.extend(true, {},$(li).data("json"),{guid:generateUUID()});
      if(widgets[json.type].validate(json)){
        var el = prepareEl($("<li>").attr("data-name",$(li).data("json").type).data("json",json));
        select(el.insertAfter(li).hide().show("highlight"));
      }
      if(widgets[json.type].runJS){
        $('body').append("<script>"+widgets[json.type].getJS(json)+"</script>");
      }
    }
  });

  $("#cb-content li").die();
  $("#cb-content li").live("click",function(){
    select(this);
  });

  $("#cb-source li").die();
  $("#cb-source li").live("click",function(event){
    var json = $.extend(true, {},$(this).data("json"),{guid:generateUUID()});
    if(widgets[json.type].validate(json)){
      var el = prepareEl($(this).clone().data("json",json));
      select(el.appendTo("#cb-content").hide().show("highlight"));
      $("#cb-starter").hide();
    };
    event.stopPropagation();
  });

  var copyHelper= null;
  $("#cb-source").sortable({
    connectWith: '#cb-content',
    forcePlaceholderSize: true,
    helper: function(e,li) {
      copyHelper= li.clone().data("json",$.extend(true, {},$(li).data("json"),{guid:generateUUID()})).addClass("inUse").insertAfter(li);
      return li;
    },
    placeholder: 'cb-placeholder source',
    start: function(event, ui) {$(".cb-placeholder").attr("data-name",$(ui.item[0]).attr("data-name"));}, 
    stop: function(event,ui) {
      copyHelper && copyHelper.remove();
      if($(ui.item[0]).parent().attr('id') == "cb-source"){
        $(this).sortable('cancel');
      }else{
        if(widgets[$(ui.item[0]).data("json").type].validate($(ui.item[0]).data("json"))){
          widget.changed = true;
          $('.inUse').removeClass('inUse');
          select($(prepareEl(ui.item[0])).hide().show("highlight"));
          $("#cb-starter").hide();
        }else{
          $(this).sortable('cancel');
          $(".inUse").remove();
        }
      }
    }
  }).disableSelection();
  $("#cb-content").sortable({
    cursor: "move", 
    placeholder: 'cb-placeholder',
    forcePlaceholderSize: true,
//    axis: "y",
    start: function(event,ui) {
      $(".cb-placeholder").attr("data-name",$(ui.item[0]).attr("data-name")).addClass($(ui.item[0]).attr("class"));
      //select(ui.item[0]);
    },
    stop: function(event,ui) {widget.changed = true;},
    receive: function(e,ui) {
      copyHelper= null;
    }
  }).disableSelection();
}




/*WIDGETS*/
var widgets = {};
function widget(initial){
  initial.guid = generateUUID();
  this.default_obj = initial;
//  if(this.display == undefined){this.display = initial.type;}
  widgets[initial.type] = this;
  this.validate = function(){return true};
  this.remove = function(){};
  this.gc = function(){};
  //this.load = function (){
  if($("#cb-source").length>0){
    $('<li>').attr('data-name',initial.type).data("json",initial).html(initial.display || initial.type).appendTo("#cb-source");
  }
  //}
//  this.load();
}

widget.prototype.image="/assets/img/default.png";
widget.prototype.toFORM = function(json){
  return {label:widgets[json.type].display,options:{inline:false},source:json,items:[]};
};

widget.prototype.toJSON = function(){
  return $.extend($("li.selected").data("json"), myform.parse());
};

widget.prototype.toHTML = function(json,publishing){
  var div = $('<div>').attr('data-name',json.type);
//  var div = $('<div>').addClass(json.type);
  if(widgets[json.type].template != undefined){
    if(typeof widgets[json.type].template == "string"){
      div.html(Form.populate(widgets[json.type].template,json));
    }else{
      div.html(Form.populate(widgets[json.type].template(json),json));
    }
  }
  return div;
};
widget.changed = false;

widget.update = function(){
  widget.changed = true;
  if($('li.selected').length>0){
    json = widgets[$('li.selected').attr('data-name')].toJSON();
    div = widgets[json.type].toHTML(json).data("json",json);
    $('li.selected [data-name='+json.type+']').replaceWith(div);
    $('li.selected').attr("class",$('li.selected').children("div").attr("class")).addClass("selected");

    if(widgets[json.type].runJS){
      $('body').append("<script>"+widgets[json.type].getJS(json)+"</script>");
    }
    return div;
  }
};




/********Example Code*******/
/***************************/

//$(function(){cb = new Build();});

/*$("#play").live("click",function(){
  contentjson = cb.toJSON();
  $("#content").html(cb.toHTML(contentjson));
  $(this).hide();
  $("#edit").show();
});
$("#edit").live("click",function(){
  $("#content").html($("<div>").attr("id","cb-content"));
  cb = new Build();
  cb.load(contentjson);
  $(this).hide();
  $("#play").show();

});

*/




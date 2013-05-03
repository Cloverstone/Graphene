$(function(){
var wForm = new widget({type:"Form",text:"Form",width:"12",form:"0"});

wForm.toJSON = function(){var json = widget.prototype.toJSON(json);
return json;};

wForm.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [
    {type:"select",label:"Form",name:"form",onchange:widget.update,"choices":formItems},
    {type:"select",label:"Layout",name:"layout",value:"",onchange:widget.update,"choices":[
      {"name":"Inherit","value":"inherit"},
      {"name":"Default","value":"default"},
      {"name":"Inline","value":"inline"},
      {"name":"Horizontal","value":"horizontal"}
    ]},
    {type:"select",label:"Width",name:"width",value:"12",onchange:widget.update,"choices":[
      {"name":"One Quarter","value":"3"},
      {"name":"One Third","value":"4"},
      {"name":"Half","value":"6"},
      {"name":"Two Thirds","value":"8"},
      {"name":"Three Quarters","value":"9"},
      {"name":"Full","value":"12"}
    ]},    
    {type:"custom",label:"Float",name:"float",value:"",onchange:widget.update,"choices":[
      {"name":"Left","value":"left"},
      {"name":"Right","value":"right"}
    ]}

  ];
return form;};

wForm.build = function(json){
  var form = $('<form>')
    .addClass("embedded-form")
    .attr("method","post")
    .attr("data-generated","cobler")
    .attr("action","/forms/submit");
if(json.layout != "inherit"){
 form.addClass("form-"+json.layout);
}else{
 form.addClass("form-"+formItems[json.form].form.options.layout);
}
  var fieldset = $('<fieldset>').html(formItems[json.form].form.html);
  fieldset.prepend($('<legend>').html(formItems[json.form].form.options.title));

  form.html(fieldset);
  form.append('<input type="hidden" name="form_id" value="'+json.form+'"><div class="form-actions"><button class="btn btn-primary btn-themed" type="submit"><i class="icon-ok icon-white"></i> '+(formItems[json.form].form.options.s_text||"Submit")+'</button></div>');
  if(json.clear){form.find('.form-actions').append('<button class="btn btn-primary btn-themed" type="reset"><i class="icon-ok icon-white"></i> Clear</button>');}
  return form;
}

wForm.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  if(json.form != "0"){
    div.html('<div id="'+json.form+'" class="form"></div>');
    var url = '/raw/form/'+json.form+'?ajax';
    if(formItems[json.form].form){
      div.children("#"+json.form+".form").html(wForm.build(json));
    }else{
      $.get(url,function(data){
        formItems[json.form].form = data.data;
        $("#"+json.form+".form").html(wForm.build(json));
      },"json");
    }
  }else{
    div.html('<div id="'+json.form+'" class="form"><div style="text-align:center" class="alert alert-error">Please Select A Form</div></div>');
  }
  return div.addClass("pull-"+json.float+" width"+json.width);}
})

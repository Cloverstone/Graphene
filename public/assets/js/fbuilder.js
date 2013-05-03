pageOpts = {};
pageOpts.pagetype = "default";

descriptor = {"_id":"new"};
descriptor.options= {"title":"New Form","layout":"default","clear":false};
$builder_settings = {};
$builder_settings.save = "/publish/form";
$builder_settings.load = "/fetch/form";
$builder_settings.options = {title:"Page Options",
    footer:$("<div>").addClass("btn btn-primary").html("OK"),
    form:{label:"",source:descriptor.options,options:{inline:true},items:[
      {type:"text",label:"Title",name:"title"},
      {type:"select",label:"Layout",name:"layout",choices:[{"name":"Default","value":"default"},{"name":"Inline","value":"inline"},{"name":"Horizontal","value":"horizontal"}]},
      {type:"checkbox",label:"Include Clear",name:"clear"},
      {type:"select",label:"Access Control",name:"access",choices:["Public","Private"]},
      {type:"text",label:"Forward To",name:"forward"},
      {type:"text",label:"Submit Text",name:"s_text"},
      {type:"text",label:"Submit Page",name:"redirect"},
      {type:"tags",label:"Email To",name:"emails"}
    ]}
  };
actions.view = function(){
  window.location = "/form/"+descriptor.options.title;
}


$builder_settings.optionsChanged = function(){
$("#content").removeClass("form-horizontal form-inline");
$("#content").addClass("form-"+descriptor.options.layout);
$("#formname").html(descriptor.options.title);
}


$("#content").append('<legend id="formname"></legend>');
$("body").append("<style>#content{margin:20px;}#cb-starter{top:61px}</style>")

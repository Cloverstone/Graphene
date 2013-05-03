var wNew = new widget({type:"New",text:"New"});

wNew.toJSON = function(){var json = widget.prototype.toJSON(json);return json;};

wNew.toFORM = function(json){form = widget.prototype.toFORM(json);
  form.items = [{type:"text",label:"Text",name:"text",value:"",onchange:widget.update}];
return form;};

wNew.toHTML = function(json,publishing){ var div = widget.prototype.toHTML(json,publishing);
  div.html(json.text);
return div;};

wNew.load();

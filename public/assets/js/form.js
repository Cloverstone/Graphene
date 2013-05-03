function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

function dupeMe(){
if(parseInt($(this.parentNode).data("max"))>$(this.parentNode).siblings().length ){
  var newnode = $(this.parentNode).clone().attr("id",generateUUID());
  //        newnode.children(".btn").remove();
  newnode.find('.add').click(dupeMe);
  newnode.find('.remove').click(dropMe);
  newnode.insertAfter(this.parentNode);
  widget.update();
}
};

function dropMe(){
if(parseInt($(this.parentNode).data("min"))<$(this.parentNode).siblings().length ){
  $(this.parentNode).empty().remove();
  widget.update();
}
};

var ruleRegex = /^(.+)\[(.+)\]$/,
    numericRegex = /^[0-9]+$/,
    integerRegex = /^\-?[0-9]+$/,
    decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
    emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
    alphaRegex = /^[a-z]+$/i,
    alphaNumericRegex = /^[a-z0-9]+$/i,
    alphaDashRegex = /^[a-z0-9_-]+$/i,
    naturalRegex = /^[0-9]+$/i,
    naturalNoZeroRegex = /^[1-9][0-9]*$/i,
    ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
    base64Regex = /[^a-zA-Z0-9\/\+=]/i;


Form = function(obj,options){
  this.parentobj = obj;
  this.obj = $("<form>");
  this.fieldsets = [];

if(this.parentobj !=null){
  this.parentobj.html(this.obj);
}
  this.target = this.obj;// this.parentobj.find("form");
  options = $.extend({},{
    name    :"newForm",
    options: { inline : false}
  },options);

  this.structure = $.extend(true,{source:{}},options);
  this.destroy = function(){
    for(var i in this.fieldsets){
      $("[name="+this.fieldsets[i]+"]").empty();
    }

//replace with this.obj.remove(); and then test
    this.parentobj.empty();

  }
/*  this.update = function(json){
    this.structure.source = json;
    var form = this.obj;
    if(form.data('id')){
      this.structure.source.id = form.data('id');
    }

    for(var i in this.structure.items){
//        Form.types[this.structure.items[i].type]
    }
  }*/
  this.parseItems = function(items,source){
    for(var i in items){

      if(Form.types[items[i].type] != undefined){
/*if(Form.types[items[i]].isArray()){
Form.types[items[i]].name = Form.types[items[i]].guid;
}*/
        var item = null;
        if(items[i].fieldset != undefined && $("[name="+items[i].fieldset+"]").length > 0){
          item = $("[name="+items[i].fieldset+"]").find("[name="+items[i].name+"]");
        }else{
          item = this.target.find("[name="+items[i].name+"]");
        }

        source[items[i].name] = Form.types[items[i].type].parse(item);
 
        if((items[i].show == undefined) || this.show(items[i].show)){
          $("[name="+items[i].name+"].formitem").show();
        }else{
          $("[name="+items[i].name+"].formitem").hide();
        }

        if(item.data("validate") == "true"){
          this.validate(items[i]);
        }
        item.data("validate","true");

      }else if(items[i].type == "fieldset"){

        var tempTarget = this.target;

        if(items[i].dupable != undefined){
          source[items[i].name] = {};
          var targets = $("fieldset[name="+items[i].name+"]");
          for (var f=0;f<targets.length;f++){
            this.target = $(targets[f]);
            source[items[i].name][this.target.attr("id")] = {};
            this.parseItems(items[i].items,source[items[i].name][this.target.attr("id")]);
            this.target = tempTarget
          }
        }else{
          this.target = $("fieldset[name="+items[i].name+"]");
          if(items[i].items != undefined){
            source[items[i].name] = {};
            this.parseItems(items[i].items,source[items[i].name]);
          }
          this.target = tempTarget
        }
      }
    }
  }
  this.parse = function(){
//    var targetform = this.obj;
    if(this.target.data('id')){
      this.structure.source.id = this.target.data('id');
    }

    this.parseItems(this.structure.items,this.structure.source)
    return this.structure.source;
  }
  this.show = function(conditions){
    if ( typeof conditions === 'object'){
      for(var c in conditions){
        if(!Form.conditions[conditions[c].type](this,conditions[c].args)){
          return false;
        }
      }
      return true;
    }else{
    }
  }
  this.errors = {};
  this.validate = function(item){
    if(item.validate != undefined){
      if ( typeof item.validate === 'object'){
        for(var r in item.validate){
          if(!Form.validations[r].method(this.structure.source[item.name],item.validate[r])){
            this.errors[item.name] = Form.validations[r].message.replace("%s",item.name);
          }
        }
      }else{
      }
    }
  }
  this.obj.html("");
  if(this.structure.options.inline){
    this.obj.addClass("form-horizontal");
  }

  this.drawFieldset = function(item){
this.fieldsets.push(item.name);
    var legend = "";
    var fieldset = null;
    if(item.legend){
      legend+="<legend>"+item.legend+"</legend>";
    }
    if(item.dupable){
      var btn = $("<div>").addClass("add").html('<i class="icon-plus"></i>').click(dupeMe);
      var btn2 = $("<div>").addClass("remove").html('<i class="icon-minus"></i>').click(dropMe);
      fieldset = $("<fieldset>").addClass("dupable").attr("name",item.name).html(legend).prepend(btn).prepend(btn2).attr("id",item.id || generateUUID());
      fieldset.attr('data-min',item.dupable.min).attr('data-max',item.dupable.max);

    }else{
      fieldset = $("<fieldset>").attr("name",item.name).html(legend);
    }
    if(item.fieldset != undefined && $("[name="+item.fieldset+"]").length > 0){
      $("[name="+item.fieldset+"]").append(fieldset);
    }else{
      this.target.append(fieldset);
    }
    return fieldset;
  }
  this.processItems = function(items,source){

  for(var i in items){
    var item = items[i];

      if(source[item.name] != undefined){
        item.value = source[item.name];
      }
      if(item.value == undefined){
        item.value = "";
      }

    if(Form.types[item.type] != undefined){
      var type = Form.types[item.type];

        var el = type.create(item,this.structure.options);
      if(item.fieldset != undefined && $("[name="+item.fieldset+"]").length > 0){
        $("[name="+item.fieldset+"]").append(el);
        this.fieldsets.push(item.fieldset);
      }else{
        this.target.append(el);
      }

      if((item.show != undefined) && !this.show(item.show)){
        $("[name="+item.name+"].formitem").hide();
      }
          
      if(type.callback != undefined){
        type.callback(item,this);
      }
    }else if(item.type == "fieldset"){

      var tempTarget = this.target;

      if(item.dupable != undefined){
        if(source[item.name] != undefined){
          for(var f in source[item.name]){
            item.id = f;
            this.target = this.drawFieldset(item);
            this.processItems(item.items,source[item.name][f]||{});
            this.target = tempTarget
          }
        }else{
            item.id = f;
            this.target = this.drawFieldset(item);
            this.processItems(item.items,{});
            this.target = tempTarget
        }
      }else{
        this.target = this.drawFieldset(item);
        if(item.items != undefined){
          this.processItems(item.items,source[item.name]||{});
        }
        this.target = tempTarget
      }

    }
  }
  }
  this.addActions = function(actions){
    if(actions){
      if(!this.structure.actionTarget){
        this.target.append('<div class="form-actions"></div>');
          this.structure.actionTarget = this.target.find('.form-actions');
      }
        for(var action in actions){
          this.structure.actionTarget.append($("<button>").addClass("btn btn-"+actions[action].class).attr("type",actions[action].type).html(actions[action].label).click(actions[action].click));
        }
      
    }
  }

  this.processItems(this.structure.items,this.structure.source);
  this.addActions(this.structure.actions);
//return this.obj;
}


  Form.conditions = {
  requires: function(form,args){
    var value = form.structure.source[args.name];
    return (value !== null && value !== '');
  },
  requiresallprevious: function(form,args){
  },
  not_matches: function(form,args){
    if(form.structure.source[args.name] != args.match){
      return true;
    }else{
      return false;
    }
  },
  matches: function(form,args){
    if(form.structure.source[args.name] == args.match){
      return true;
    }else{
      return false;
    }
  }
  }


Form.types = {};
Form.register = function(elem){
  Form.types[elem.type] = this;
}

Form.validations = {
  required:{
    method: function(value, args) {
//      var value = field.value;
//      if (field.type === 'checkbox') {
//          return (field.checked === true);
//      }
      return (value !== null && value !== '');
    }, 
    message: 'The %s field is required.'
  },
  matches:{
    method: function(field, matchName) {
      if (el = this.form[matchName]) {
        return field.value === el.value;
      }
      return false;
    },
    message: 'The %s field does not match the %s field.'
  },
  valid_email:{
    method: function(field) {
      return emailRegex.test(field.value);
    },
    message: 'The %s field must contain a valid email address.'
  },
  valid_emails:{
    method: function(field) {
      var result = field.value.split(",");     
      for (var i = 0; i < result.length; i++) {
        if (!emailRegex.test(result[i])) {
          return false;
        }
      }      
      return true;
    },
    message: 'The %s field must contain all valid email addresses.'
  },
  min_length:{
    method: function(field, length) {
      if (!numericRegex.test(length)) {
        return false;
      }
      return (field.value.length >= parseInt(length, 10));
    },
    message: 'The %s field must be at least %s characters in length.'
  },
  max_length:{
    method: function(field, length) {
      if (!numericRegex.test(length)) {
        return false;
      }
      return (field.value.length <= parseInt(length, 10));
    },
    message: 'The %s field must not exceed %s characters in length.'
  },
  exact_length:{
    method: function(field, length) {
      if (!numericRegex.test(length)) {
        return false;
      }            
      return (field.value.length === parseInt(length, 10));
    },
    message: 'The %s field must be exactly %s characters in length.'
  },
  greater_than:{
    method: function(field, param) {
      if (!decimalRegex.test(field.value)) {
        return false;
      }
      return (parseFloat(field.value) > parseFloat(param));
    },
    message: 'The %s field must contain a number greater than %s.'
  },
  less_than:{
    method: function(field, param) {
      if (!decimalRegex.test(field.value)) {
        return false;
      }
      return (parseFloat(field.value) < parseFloat(param));
    },
    message: 'The %s field must contain a number less than %s.'
  },
  alpha:{
    method: function(field) {
      return (alphaRegex.test(field.value));
    },
    message: 'The %s field must only contain alphabetical characters.'
  },
  alpha_numeric:{
    method: function(field) {
      return (alphaNumericRegex.test(field.value));
    },
    message: 'The %s field must only contain alpha-numeric characters.'
  },
  alpha_dash:{
    method: function(field) {
      return (alphaDashRegex.test(field.value));
    },
    message: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.'
  },
  numeric:{
    method: function(field) {
      return (decimalRegex.test(field.value));
    },
    message: 'The %s field must contain only numbers.'
  },
  integer:{
    method: function(field) {
      return (integerRegex.test(field.value));
    },
    message: 'The %s field must contain an integer.'
  },
  decimal:{
    method: function(field) {
      return (decimalRegex.test(field.value));
    },
    message: 'The %s field must contain a decimal number.'
  },
  is_natural:{
    method: function(field) {
      return (naturalRegex.test(field.value));
    },
    message: 'The %s field must contain only positive numbers.'
  },
  is_natural_no_zero:{
    method: function(field) {
      return (naturalNoZeroRegex.test(field.value));
    },
    message: 'The %s field must contain a number greater than zero.'
  },
  valid_ip:{
    method: function(field) {
      return (ipRegex.test(field.value));
    },
    message: 'The %s field must contain a valid IP.'
  },
  valid_base64:{
    method: function(field) {
      return (base64Regex.test(field.value));
    },
    message: 'The %s field must contain a base64 string.'
  }
};

$((function($){
  $.fn.jqform = function( options ) {
    return new Form( this, options )
  }
})( jQuery ));

Form.populate = function(tempdiv,object){
  for(var i in object){
    tempdiv = tempdiv.split('{{'+i+'}}').join(object[i])
  }
  return tempdiv;
}

/*
      for(var i in response[subcontext]) {


         var tempdiv = response.wireframe;
         tempdiv = tempdiv.replace(/\[index\]/gi, i);
         for(var j in response[subcontext][i]){
           tempdiv = tempdiv.split('['+j+']').join(response[subcontext][i][j])
         }


        if(response.target == undefined){
           response.target = "#content";
        }
        $(response.target).append(tempdiv);
      };

*/


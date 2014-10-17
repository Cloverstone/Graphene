$(function(){
  cobler.register({
    type: 'form',
    category: 'content',
    icon: 'check-square-o',
    display: 'form',
    defaults: {
      //text: 'Form',
      form: ''
    },
    fields: [
      //{label: false, name: 'text', fieldset: 'selected .cobler-li-content',},
      {type: 'custom_select', label: 'Form', name: 'form',reference: '_id', choices:'/forms'},
    ],
    //template: '<form name="input" action="/custom_form/submit/{{_id}}" method="get">{{{content}}}<button type="submit" class="btn btn-default">Submit</button></form>',
    toHTML:  function(){
      if(this.attributes._id !== this.attributes.form){
        $.ajax({
            url: '/forms/'+this.attributes.form,
            success: $.proxy(function(response){
              this.attributes._id = response._id;
              this.attributes.content = response.content
              this.$el.html(this.toHTML());
            }, this),
            error:function(){
              alert('Bad Response');
            }
          });
      }else{
        return Mustache.render('<form name="input" action="/custom_form/submit/{{_id}}" method="get">{{{content}}}<button type="submit" class="btn btn-default">Submit</button></form>', this.attributes);
        //return this.attributes;
      }
      //return $('<' + this.attributes.level + '>').html(this.attributes.text);
    },
    //contentFields: true,
  });
});
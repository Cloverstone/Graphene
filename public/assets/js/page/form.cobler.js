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
    toHTML:  function(){
    if(this.attributes._id !== this.attributes.form){
      $.ajax({
          url: '/forms/'+this.attributes.form,
          success: $.proxy(function(response){
            this.attributes._id = response._id;
            this.attributes.content = response.content
            this.$el.html(this.attributes.content);
          }, this),error:function(){
            alert('Bad Response');
          }
        });
    }else{
      return this.attributes.content;
    }
      //return $('<' + this.attributes.level + '>').html(this.attributes.text);
    },
    //contentFields: true,

  });
});
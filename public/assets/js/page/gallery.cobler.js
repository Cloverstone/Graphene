$(function(){
  cobler.register({
    type: 'gallery',
    category: 'content',
    icon: 'camera',
    display: 'Gallery',
    defaults: {
      name: ''
    },
    fields: [
      {type: 'select', label: 'Gallery', name: 'name',reference:'name', fieldset: 'alt-form', choices: '/galleries?list'},
    ],
    blur: function() {
      if(this.attributes.name.length === 0) {
        this.owner.remove(this.id);
      }
    },
    template: Hogan.compile('<div>{{name}}</div>'),
    toHTML:  function(){
      //return $('<div>').html(this.attributes.name);


    if(this.attributes._id !== this.attributes.name){
      $.ajax({
          url: '/forms/'+this.attributes.form,
          success: $.proxy(function(response){
            this.attributes._id = response._id;
            this.attributes.content = response.content;
            //$.extendthis.attributes
            this.attributes.title = response.title;
            this.attributes.content =  this.template.render(this.attributes, templates);

//return Mustache.render('<form name="input" action="/custom_form/submit/{{_id}}" method="get">{{{content}}}<button type="submit" class="btn btn-default">Submit</button></form>', this.attributes);
 
            this.$el.html(this.attributes.content);
          }, this),error:function(){
            alert('Bad Response');
          }
        });
    }else{
      return this.attributes.content;
    }
    }
  });
});
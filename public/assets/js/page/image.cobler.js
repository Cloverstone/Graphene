$(function(){
  cobler.register({
    type: 'image',
    category: 'content',
    icon: 'image',
    display: 'Image',
    defaults: {
      image: '',
      width: 12
    },
    fields: [
      {type: 'custom_select', label: 'Image', name: 'image', reference:'name', fieldset: 'alt-form', choices: '/images?list'},
     // {type: 'upload', label: false, name: 'image', fieldset: 'alt-form', url: '/images'},
      {label: 'Alt-Text', name: 'alt', fieldset: 'alt-form'},
      {type: 'select', label: 'Width', name: 'width', force: true, choices:[
          {name: 'Quarter', value: 3},
          {name: 'Half', value: 6},
          {name: 'Full', value: 12}
      ]},
    ],
    blur: function() {
      if(this.attributes.image.length === 0) {
        this.owner.remove(this.id);
      }
    },
    template: Hogan.compile('<div style="margin: 0 -15px;"><center>{{#image}}<img style="max-width:100%" alt="{{alt}}" src="/assets/img/{{image}}" />{{/image}}{{^image}}<div class="alert alert-info">Please choose an image</div>{{/image}}</center></div>'),
    toHTML:  function() {
      return this.template.render(this.attributes, templates);
      //return Mustache.render(this.template, this.attributes);
    }
  });
});
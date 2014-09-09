$(function(){
  cobler.register({
    type: 'image',
    category: 'content',
    icon: 'image',
    display: 'Image',
    defaults: {
      image: ''
    },
    fields: [
      //{type: 'custom_select', label: false, name: 'image',reference:'name', fieldset: 'alt-form', choices: '/images?list'},
      {type: 'upload', label: false, name: 'image', fieldset: 'alt-form', target: '/images'},
      {label: 'Alt-Text', name: 'alt', fieldset: 'alt-form'}
    ],
    blur: function() {
      if(this.attributes.image.length === 0) {
        this.owner.remove(this.id);
      }
    },
    template: '<div><img alt="{{alt}}" src="/imgs/{{image}}" /></div>',
    toHTML:  function() {
      return Mustache.render(this.template, this.attributes);
    }
  });
});
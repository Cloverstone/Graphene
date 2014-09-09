$(function(){
  cobler.register({
    type: 'heading',
    category: 'content',
    icon: 'bold',
    display: 'Heading',
    defaults: {
      text: 'Heading',
      level: 'h1'
    },
    fields: [
      {label: false, name: 'text', fieldset: 'selected .cobler-li-content',},
      {type: 'custom_radio', label: 'Level', name: 'level', fieldset: 'alt-form', choices:[
        {name: 'H1', value: 'h1'},
        {name: 'H2', value: 'h2'},
        {name: 'H3', value: 'h3'}
      ]},
    ],
    toHTML:  function(){
      return $('<' + this.attributes.level + '>').html(this.attributes.text);
    },
    contentFields: true,
    editView:  function(){
      return '';
    }
  });
});
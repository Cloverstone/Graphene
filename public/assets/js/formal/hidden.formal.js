Formal.register({type:"hidden"});
Formal.types.hidden.create = function(){
  return  [
    '<div data-type="hidden" class="formitem hidden" name="'+this.name+'">',
      '<input type="hidden"  name="'+this.name+'" value="'+this.value+'" />',
    '</div>'
   ].join('');
};
Formal.types.hidden.parse = function(container){
  var elem = container.find('[type=hidden]');
  return elem.val();
};
Formal.register( { type: 'textarea' } );
Formal.types.textarea.callback = function() {
	if(this.onchange !== undefined) {
		//$( 'textarea[name=' + this.name + ']').die();
		$( this.fieldset ).off('input' , 'textarea[name=' + this.name + ']');
		$( this.fieldset ).on('input' , 'textarea[name=' + this.name + ']' , this.onchange);
	}
	$( this.fieldset ).on('input' , 'textarea[name=' + this.name + ']' , $.proxy( this.publish , this ) );
	if(typeof this.item.advanced !== 'undefined' && this.item.advanced){
		$('textarea[name='+this.name+']').htmlarea({
			toolbar: [
					['html'],
					['bold', 'italic', 'underline'],
					['superscript', 'subscript'],
					['justifyleft','justifycenter','justifyright'],
					['indent','outdent'],
					['orderedList','unorderedList'],
					['link', 'unlink'],
					['horizontalrule']
			]
		});
	}

	if(this.item.callback !== undefined){
		this.item.callback();
	}
};

Formal.types.textarea.parse = function(){
	var elem = $(this.self).find('textarea');
	return elem.val();
};
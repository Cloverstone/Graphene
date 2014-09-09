Formal.register({
	type: "text",
	version: "2.0"
});

Formal.register({
	type: "url",
	defaults: {
	"post":'<i class="fa fa-link"></i>',
	'validate':{'valid_url':true }
	}
});

Formal.register({
	type: "phone",
	defaults: {
	mask: '(999) 999-9999',
	placeholder: '+1'
	}
});

Formal.register({
	type: "email",
	defaults: {
	'post': '<i class="fa fa-envelope"></i>' ,
	'validate': { 'valid_email': true }
	}
});

Formal.register({
	type: 'number',
	defaults: { elType: 'text' },
	parse: function(){
		var temp = this.$el.val();
		if( $.isNumeric( temp ) ){
			return parseFloat(temp, 10);
		}else{
			if(temp === '') {
				return temp;
			}
			this.revert();
			return 0;
		}
	}
});


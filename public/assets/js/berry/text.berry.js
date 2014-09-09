(function(f,$){
	f.register({type: 'text' });
	f.register({type: 'password' });

	f.register({type: 'hidden',
		render: function() {return '<input type="hidden"  name="'+this.name+'" value="'+this.value+'" />';}
	});

	f.register({ type: 'url',
		defaults: {
		post: '<i class="fa fa-link"></i>',
		validate: {'valid_url': true }
		}
	});

	f.register({ type: 'phone',
		defaults: {
			mask: '(999) 999-9999',
			post: '<i class="fa fa-phone"></i>' ,
			placeholder: '+1'
		}
	});

	f.register({ type: 'email',
		defaults: {
		post: '<i class="fa fa-envelope"></i>' ,
		validate: { 'valid_email': true }
		}
	});

	f.register({ type: 'number',
		defaults: { elType: 'text' },
		getValue: function() {
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

	f.register({ type: 'tags',
		defaults: { elType: 'text' },
		setup: function() {
			this.$el = this.self.find('input');
			this.$el.off();
			if(this.onchange !== undefined){ this.$el.on('input',this.onchange);}
			this.$el.on('input', $.proxy(function(){this.trigger('change');}, this));
			if($.fn.tagsInput){
				this.$el.tagsInput();
			}
		},
		setValue: function(value) {
			if(typeof this.lastSaved === 'undefined'){
				this.lastSaved = value;
			}
			this.value = value;
			this.$el.importTags(value);
			return this.$el.val(value);
	}
	});
})(Berry,jQuery);
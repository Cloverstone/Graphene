Formal.prototype.validate = function(){
	this.parse();
	//this.errors = {};
	//this.valid = true;
	//this.parentobj.find("." + this.options.errorClass).removeClass(this.options.errorClass).find("." + this.options.errorTextClass).html("");
	this.clearErrors();
	this.each(this.items,this.validateItem);
	return this.valid;
};
Formal.prototype.validateItem = function(){
	var item = this.item;
	if(item.validate !== undefined && typeof item.validate === 'object'){
		for(var r in item.validate){
			//if(!Formal.validations[r].method(this.owner.options.source[item.name],item.validate[r])){
			if(!Formal.validations[r].method(item.value,item.validate[r])){
				if((item.show === undefined) || this.owner.show(item.show)){
					this.owner.valid = false;
					var errorstring = Formal.validations[r].message;
					if(typeof item.validate[r] == "string"){
						errorstring = item.validate[r];
					}
					this.owner.errors[item.name] = errorstring.replace("%s",item.label);
					this.self.addClass(this.owner.options.errorClass);
					this.self.find("." + this.owner.options.errorTextClass).html(this.owner.errors[item.name]);
				}
			}
		}
	}
};
Formal.prototype.errors = {};
Formal.prototype.clearErrors = function() {
	this.valid = true;
	this.errors = {};
	this.$el.find("." + this.options.errorClass).removeClass(this.options.errorClass).find("." + this.options.errorTextClass).html("");

};
var ruleRegex = /^(.+)\[(.+)\]$/,
		numericRegex = /^[0-9]+$/,
		integerRegex = /^\-?[0-9]+$/,
		decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
		emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
		alphaRegex = /^[a-z]+$/i,
		alphaNumericRegex = /^[a-z0-9]+$/i,
		alphaDashRegex = /^[a-z0-9_-]+$/i,
		naturalRegex = /^[0-9]+$/i,
		naturalNoZeroRegex = /^[1-9][0-9]*$/i,
		ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
		base64Regex = /[^a-zA-Z0-9\/\+=]/i;

Formal.validations = {
	required:{
		method: function(value, args) {
//      var value = field.value;
//      if (field.type === 'checkbox') {
//          return (field.checked === true);
//      }
			return (value !== null && value !== '');
		},
		message: 'The %s field is required.'
	},
	matches:{
		method: function(value, matchName) {
			if (el == this.Formal[matchName]) {
				return value === el.value;
			}
			return false;
		},
		message: 'The %s field does not match the %s field.'
	},
	valid_email:{
		method: function(value) {
			return emailRegex.test(value);
		},
		message: 'The %s field must contain a valid email address.'
	},
	valid_emails:{
		method: function(value) {
			var result = value.split(",");
			for (var i = 0; i < result.length; i++) {
				if (!emailRegex.test(result[i])) {
					return false;
				}
			}
			return true;
		},
		message: 'The %s field must contain all valid email addresses.'
	},
	min_length:{
		method: function(value, length) {
			if (!numericRegex.test(length)) {
				return false;
			}
			return (value.length >= parseInt(length, 10));
		},
		message: 'The %s field must be at least %s characters in length.'
	},
	max_length:{
		method: function(value, length) {
			if (!numericRegex.test(length)) {
				return false;
			}
			return (value.length <= parseInt(length, 10));
		},
		message: 'The %s field must not exceed %s characters in length.'
	},
	exact_length:{
		method: function(value, length) {
			if (!numericRegex.test(length)) {
				return false;
			}
			return (value.length === parseInt(length, 10));
		},
		message: 'The %s field must be exactly %s characters in length.'
	},
	greater_than:{
		method: function(value, param) {
			if (!decimalRegex.test(value)) {
				return false;
			}
			return (parseFloat(value) > parseFloat(param));
		},
		message: 'The %s field must contain a number greater than %s.'
	},
	less_than:{
		method: function(value, param) {
			if (!decimalRegex.test(value)) {
				return false;
			}
			return (parseFloat(value) < parseFloat(param));
		},
		message: 'The %s field must contain a number less than %s.'
	},
	alpha:{
		method: function(value) {
			return (alphaRegex.test(value));
		},
		message: 'The %s field must only contain alphabetical characters.'
	},
	alpha_numeric:{
		method: function(value) {
			return (alphaNumericRegex.test(value));
		},
		message: 'The %s field must only contain alpha-numeric characters.'
	},
	alpha_dash:{
		method: function(value) {
			return (alphaDashRegex.test(value));
		},
		message: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.'
	},
	numeric:{
		method: function(value) {
			return (decimalRegex.test(value));
		},
		message: 'The %s field must contain only numbers.'
	},
	integer:{
		method: function(value) {
			return (integerRegex.test(value));
		},
		message: 'The %s field must contain an integer.'
	},
	decimal:{
		method: function(value) {
			return (decimalRegex.test(value));
		},
		message: 'The %s field must contain a decimal number.'
	},
	is_natural:{
		method: function(value) {
			return (naturalRegex.test(value));
		},
		message: 'The %s field must contain only positive numbers.'
	},
	is_natural_no_zero:{
		method: function(value) {
			return (naturalNoZeroRegex.test(value));
		},
		message: 'The %s field must contain a number greater than zero.'
	},
	valid_ip:{
		method: function(value) {
			return (ipRegex.test(value));
		},
		message: 'The %s field must contain a valid IP.'
	},
	valid_base64:{
		method: function(value) {
			return (base64Regex.test(value));
		},
		message: 'The %s field must contain a base64 string.'
	}
};
Formal.prototype.save = function(){
	if( myform.validate() ){
		this.options.model.save(this.parse() , {wait: true, patch: true});
	}
	return this.valid;
};
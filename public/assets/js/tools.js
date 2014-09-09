RegionManager = function(defaults) {
	this.currentView = undefined;
	defaults = $.extend({el:"#content"},defaults);
	var el = defaults.el;

	var closeView = function (view) {
		if (view && view.close) {
			view.close();
		}
	};

	var openView = function (view) {
		view.render();
		$(el).html(view.el);
		if (view.onShow) {
			view.onShow();
		}
	};

	this.show = function (view) {
		closeView(this.currentView);
		if(view){
			this.currentView = view;
			openView(this.currentView);
		}else{
			this.currentView = undefined;
		}
	};
};

$(function(){
	Backbone.View.prototype.close = function(){
		this.remove();
		this.unbind();
		if (this.onClose){
			this.onClose();
		}
	};
	Backbone.Model.prototype.edit = function() {

	};
});

modal = function(options){
	$('#myModal').remove();
	this.ref = $(ich.modal(options));
	options.legendTarget = this.ref.find('.modal-title');
	options.actionTarget = this.ref.find('.modal-footer');
	options.actions = [];
	if(options.renderer === 'wizard'){
		options.actions.push({
			'label': "Previous",
			'icon':'arrow-left',
			'id': 'wizard-previous',
			'modifier': 'primary'
		});
		options.actions.push({
			'label': "Next",
			'icon':'arrow-right',
			'id': 'wizard-next',
			'modifier': 'success'
		});
		options.actions.push({
			'label': "Finish",
			'icon':'check',
			'id': 'submit',
			'click': function() {
				if( myform.validate() ){
					//myform.options.model.set( myform.parse());
					myform.options.model.save(myform.parse() , { success : function(model, response) {
						// var content = ich[$('#myModal').data('update')](response);
						// var target =	$('#' + $('#myModal').data('update'));
						// if($('#myModal').data('append')){
						// 	target.append(content);
						// }else{
						// 	target.html(content);
						// }
						myform.options.view.render(response);
						$.smallBox({title : "Success!" , content : "Agent update was successful" , timeout : 3000 , color : "#5F895F" , icon : "fa fa-user" });
					} });
					$('#myModal').modal('hide');
					myform.destroy();
				}
			}
		});
		options.actions.push({
			'label': "Cancel",
			'icon':'times',
			'id': 'close',
			'modifier': 'danger pull-left',
			'click': function() {
				$('#myModal').modal('hide');
				myform.destroy();
			}
		});
	}else{
		options.actions.push({
			'label': "Cancel",
			'icon':'times',
			'id': 'close',
			'click': function() {
				$('#myModal').modal('hide');
				myform.destroy();
			}
		});

		options.actions.push({
			'label': "Save Changes",
			'icon':'check',
			'id': 'submit',
			'modifier': 'primary',
			'click': function() {
				if( myform.validate() ){
					//myform.options.model.set( myform.parse());
					myform.options.model.save(myform.parse() , { success : function(model, response) {
						// var content = ich[$('#myModal').data('update')](response);
						// var target =	$('#' + $('#myModal').data('update'));
						// if($('#myModal').data('append')){
						// 	target.append(content);
						// }else{
						// 	target.html(content);
						// }
						myform.options.view.render(response);
						$.smallBox({title : "Success!" , content : "Agent update was successful" , timeout : 3000 , color : "#5F895F" , icon : "fa fa-user" });
					} });
					$('#myModal').modal('hide');
					myform.destroy();
				}
			}
		});
	}

	$(this.ref).appendTo('body');
	if(typeof options.model !== 'undefined' && typeof options.source === 'undefined') {
		options.source = options.model.attributes;
	}
	//$(this.ref).data('update',options.update);
	myform = this.ref.find('.modal-body').formal(options);

	this.ref.modal();
};


function processFilter(){
	$('.filterable').each(
	function(){
		if($(this).text().toLowerCase().indexOf($('[name=filter]').val().toLowerCase())>-1){
			$(this).removeClass('nodisplay');
		}else{
			$(this).addClass('nodisplay');
		}
	});
	$("#wait").hide();
}

filterTimer = null;
$('body').on('keyup','[name=filter]',function(event){
	if(!$(this).hasClass("delay")){
		$(".filterable").each(
		function(){
			if($.score($(this).text().toLowerCase(), $('[name=filter]').val().toLowerCase() ) >0.40){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	}else{
	clearTimeout(filterTimer);
	filterTimer=setTimeout(processFilter,300);
	}
});

function containsKey( list , keys ){
	var returnArray = {};
	for (var key in keys) {
		if(typeof list[keys[key]] !== 'undefined'){
			returnArray[keys[key]] = list[keys[key]];
		}
	}
	return returnArray;
}

//mymodal = new modal({body:"newbod",'footer':'<button type="button" class="btn btn-primary" id="save">Save changes</button>'});

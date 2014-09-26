alert = function(value){ console.log(value); };

$(function() {
    $('#nav-accordion').dcAccordion({
        eventType: 'click',
         autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
//        cookie: 'dcjq-accordion-1',
        classExpand: 'dcjq-current-parent'
    });
    $("html").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});
		$("#sidebar").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

});
$(function(){
	contentManager = new RegionManager();
	sidebarManager = new RegionManager({el: '#sidebar'});

	var Workspace = Backbone.Router.extend({
		route: function(route, name, callback) {
			return Backbone.Router.prototype.route.call(this, route, name, function() {
				this.trigger('beforeRoute');
				if (!callback) callback = this[name];
				return callback.apply(this, arguments);
			});
		},
		initialize: function(options) {
			this.history = [];
			return this.on("beforeRoute", this.storeRoute);
		},
		storeRoute: function() {
			return this.history.push(Backbone.history.fragment);
		},
		previousFragment: function() {
			return this.history[this.history.length - 2];
		},
		changeAndStoreFragment: function(fragment) {
			this.navigate(fragment);
			return this.storeRoute();
		},
		previous: function(trigger) {
			if (this.history.length > 1) {
				if(typeof trigger === 'undefined') { trigger = true; }
				return this.navigate(this.history[this.history.length - 2], {trigger: trigger});
			}
		},
		routes: {
			":path(/:optional)(/:path2)(/:optional2)": "default",
			"": 'default'
		},
		default: function(path1, optional, path2, optional2) {
			var path = path1 || 'Apps';
			if(typeof routes[path] !== 'undefined'){
				$('.logo i').addClass('fa-spin');
				$.ajax({
					url: '/assets/js/resource/' + routes[path].resource + '.js',
					dataType: "script",
					cache: true,
					success: function(){
						$('.logo i').removeClass('fa-spin');
						if(typeof routes[path] !== 'undefined'){
							var activeLink = $("[href='#/" + path + "']");
							var parent = activeLink.closest(".menu-item").find(".menu-item-parent").html();
							$('.sidebar-menu a').removeClass('active');
							activeLink.closest('a').addClass('active');
							if(typeof parent == 'undefined'){parent = path;}
							//$('.breadcrumb').html('<li><a href="#">I<i style="color: #83C018" class="fa fa-power-off"></i>N Dashboard</a></li><li>' + parent + '</li>').show();
							if(parent != path){
								$('.breadcrumb').append('<li>' + path + '</li>');
							}
							if(typeof path2 !== 'undefined' && path2 !== null){
								routes[path + '_' + path2].init(optional,optional2);
							}else{
								routes[path].init(optional);
							}

						}
					},error:function(){
						alert('Bad Response');
					}
				});
			}else{alert('Route Not Supported');}
		}
	});

	myrouter = new Workspace();
	Backbone.history.start();

	//Backbone.history.start({ pushState: true, root: '/', silent: window.silentRouter });
});

/* Tools */
RegionManager = function(defaults) {
	this.currentView = undefined;
	defaults = $.extend({el:"#content"}, defaults);
	var el = defaults.el;

	var closeView = function (view) {
		for(var i in Berry.instances){
			Berry.instances[i].destroy();
		}
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
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		$(el).find('.tooltips').tooltip();
    $(el).find('.popovers').popover();
	};

	this.show = function (view) {
		var r = true;
		if(cobler.changed){
			r = confirm("Any changes that you made will be lost.\n\nAre you sure you want to leave this page?");
		}
		if (r == true) {
			cobler.changed = false;
			closeView(this.currentView);
			if(view){
				this.currentView = view;
				openView(this.currentView);
			}else{
				this.currentView = undefined;
			}
		} else {
			//Backbone.history.history.back({trigger: false});
			myrouter.previous(false);
			myrouter.history.pop();
		}
	};
};

$(function() {
	Backbone.View.prototype.close = function() {
		this.remove();
		this.unbind();
		if (this.onClose){
			this.onClose();
		}
	};
	Backbone.View.prototype.form = function(options) {
		options = options || {target: this.formTarget};
		this.berry = $(this.formTarget || options.target).berry($.extend({model: this.model, legend: this.legend, fields: this.fields }, options));
		return this.berry;
	};
	Backbone.View.prototype.destroy = function(e) {
		e.stopPropagation();
		this.$el.fadeOut('fast', $.proxy(function() {
			this.model.destroy();
			this.remove();
		}, this));
	};
	Backbone.Model.prototype.alert = function(keys) {
		$.gritter.add(
			$.extend(
				{title: 'Success!', text: 'Successfully updated' + this.model.attributes['name'], timeout: 3000, color: "#5F895F", icon: "fa fa-user"},
				(this.alert || {})
			)
		);
	};
	Backbone.Model.prototype.fields = function(keys) {
		return containsKey(this.schema,keys);
	};
	Backbone.View.prototype.autoElement = function(options) {
		options = $.extend({append: true}, options);
		this.setElement(ich[this.template]( this.model.attributes ));
		this.model.on('sync', $.proxy(function() {
			var temp = this.$el;
			this.setElement(ich[this.template]( this.model.attributes ));
			temp.replaceWith(this.$el);
			this.editing = false;
		}), this);
		if(options.append !== false){
			$(this.target).append(this.$el);
		}
	};
	Backbone.Model.prototype.idAttribute = "_id";

	Backbone.ItemView = Backbone.View.extend({
		initialize: function() {
			this.autoElement();
		},
		edit: function(e) {
			e.stopPropagation();
			this.form();
		}
	});

	Backbone.ListView = Backbone.View.extend({
		add: function() {
			$().berry({context: this, legend: this.legend, model: new this.collection.model(), fields: this.fields}).on('completed', function(){
				if(this.closeAction === 'save'){
					this.options.context.collection.add(this.options.model);
					new this.options.context.modelView({'model': this.options.model});
				}
			});
		},
		onShow: function() {
			_.each(this.collection.models, function(model) {
				new this.modelView({'model': model});
			}, this);
		},
		initialize: function() {
			this.fields = this.fields || this.modelView.prototype.fields;
			this.setElement(ich[this.template]( this.collection ));
		},
	});




});

function message(options) {
	console.log(options.content);
	$.gritter.add($.extend({timeout: 3000, color: '#5F895F'},options));
}
function rating(selector, rated, container) {
	container.find(selector + ' .fa-star:lt('+parseInt(rated ,10)+')').removeClass('fa-star-o');
	var temp = Math.floor(rated);
	if(rated - temp >= 0.5){
		container.find(selector + ' .fa-star:nth-child(' + (temp + 1) + ')').addClass('fa-star-half-full');
	}
}

modal = function(options){
	$('#myModal').remove();
	this.ref = $(ich.modal(options));

	options.legendTarget = this.ref.find('.modal-title');
	options.actionTarget = this.ref.find('.modal-footer');

	$(this.ref).appendTo('body');

	if(options.content) {
		$('.modal-body').html(options.content);
		options.legendTarget.html(options.legend);
	}else{
		options.autoDestroy = true;
		var myform = this.ref.find('.modal-body').berry(options).on('destroy', $.proxy(function(){
			this.ref.modal('hide');
		},this));
	}
	this.ref.modal();
	this.ref.on('shown.bs.modal', $.proxy(function () {
		this.$el.find('.form-control:first').focus();
	},myform));
};



(function($) {
  $.score = function(base, abbr, offset) {
    
    //offset = offset || 0 // TODO: I think this is unused... remove
    
    if(abbr.length === 0) return 0.9;
    if(abbr.length > base.length) return 0.0;
    
    for (var i = abbr.length; i > 0; i--) {
      var sub_abbr = abbr.substring(0,i);
      var index = base.indexOf(sub_abbr);
      
      if(index < 0) continue;
      if(index + abbr.length > base.length + offset) continue;
      
      var next_string = base.substring(index+sub_abbr.length);
      var next_abbr = null;
      
      if(i >= abbr.length)
        next_abbr = '';
      else
        next_abbr = abbr.substring(i);
      
      // Changed to fit new (jQuery) format (JSK)
      var remaining_score   = $.score(next_string, next_abbr,offset+index);
      
      if (remaining_score > 0) {
        var score = base.length-next_string.length;
        
        if(index !== 0) {
          //var j = 0;
          
          var c = base.charCodeAt(index-1);
          if(c==32 || c == 9) {
            for(var j=(index-2); j >= 0; j--) {
              c = base.charCodeAt(j);
              score -= ((c == 32 || c == 9) ? 1 : 0.15);
            }
          } else {
            score -= index;
          }
        }
        
        score += remaining_score * next_string.length;
        score /= base.length;
        return score;
      }
    }
    return 0.0;
  };
})(jQuery);




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

function createChildren(original,name,source){
	for(var j in original){
		original[j][name] = {};
		temp = source.get(original[j][name + '_id']);
		if(typeof temp != 'undefined'){
			original[j][name] = temp.attributes;
		}
	}
}

Date.createFromMysql = function(mysql_string){
   if(typeof mysql_string === 'string')
   {
      var t = mysql_string.split(/[- :]/);

      //when t[3], t[4] and t[5] are missing they defaults to zero
      return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
   }

   return null;
};

//mymodal = new modal({body:"newbod",'footer':'<button type="button" class="btn btn-primary" id="save">Save changes</button>'});

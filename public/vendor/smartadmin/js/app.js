/*
 * VARIABLES
 * Description: All Global Vars
 */
$.throttle_delay = 350;
$.menu_speed = 235;
$.navbar_height = 49;

$.root_ = $('body');
$.left_panel = $('#left-panel');
$.shortcut_dropdown = $('#shortcut');

/*
 * DOCUMENT LOADED EVENT
 * Description: Fire when DOM is ready
 */

$(document)
    .ready(function () {

        /*
         * Fire tooltips
         */
        if ($("[rel=tooltip]")
            .length) {
            $("[rel=tooltip]")
                .tooltip();
        }

        //TODO: was moved from window.load due to IE not firing consist
        nav_page_height()

        // INITIALIZE LEFT NAV
        if (!null) {
            $('nav ul')
                .jarvismenu({
                    accordion: true,
                    speed: $.menu_speed,
                    closedSign: '<em class="fa fa-expand-o"></em>',
                    openedSign: '<em class="fa fa-collapse-o"></em>'
                });
        } else {
            alert("Error - menu anchor does not exist")
        }

        // COLLAPSE LEFT NAV
        $('.minifyme')
            .click(function (e) {
                $('body')
                    .toggleClass("minified");
                $(this)
                    .effect("highlight", {}, 500);
                e.preventDefault();
            });

        $('#logo')
            .click(function (e) {
                $('body')
                    .toggleClass("minified");
                e.preventDefault();
            });

        // HIDE MENU
        $('#hide-menu >:first-child > a')
            .click(function (e) {
                $('body')
                    .toggleClass("hidden-menu");
                e.preventDefault();
            });

        // HIGHLIGHT EFFECT
        $(".login-info")
            .effect("highlight", {}, 1000);

        $('#show-shortcut')
            .click(function (e) {
                if ($.shortcut_dropdown.is(":visible")) {
                    shortcut_buttons_hide()
                } else {
                    shortcut_buttons_show()
                }
                e.preventDefault();
            });

        // SHOW & HIDE MOBILE SEARCH FIELD
        $('#search-mobile')
            .click(function () {
                $.root_.addClass('search-mobile');
            });

        $('#cancel-search-js')
            .click(function () {
                $.root_.removeClass('search-mobile');
            });

        // ACTIVITY
        // ajax drop
        $('#activity')
            .click(function (e) {
                $this = $(this);

                if ($this.find('.badge')
                    .hasClass('bg-color-red')) {
                    $this.find('.badge')
                        .removeClassPrefix('bg-color-');
                    $this.find('.badge')
                        .text("0");
                    // console.log("Ajax call for activity")
                }

                if (!$this.next('.ajax-dropdown')
                    .is(':visible')) {
                    $this.next('.ajax-dropdown')
                        .fadeIn(150);
                    $this.addClass('active');
                } else {
                    $this.next('.ajax-dropdown')
                        .fadeOut(150);
                    $this.removeClass('active')
                }

                var mytest = $this.next('.ajax-dropdown')
                    .find('.btn-group > .active > input')
                    .attr('id');
                //console.log(mytest)

                e.preventDefault();
            });

        $('input[name="activity"]')
            .change(function () {
                //alert($(this).val())
                $this = $(this);

                url = $this.attr('id');
                container = $('.ajax-notifications');

                loadURL(url, container);

            });

        $(document)
            .mouseup(function (e) {
                if (!$('.ajax-dropdown')
                    .is(e.target) // if the target of the click isn't the container...
                    && $('.ajax-dropdown')
                    .has(e.target)
                    .length === 0) {
                    $('.ajax-dropdown')
                        .fadeOut(150);
                    $('.ajax-dropdown')
                        .prev()
                        .removeClass("active")
                }
            });

        $('button[data-loading-text]')
            .on('click', function () {
                var btn = $(this)
                btn.button('loading')
                setTimeout(function () {
                    btn.button('reset')
                }, 3000)
            });

        // NOTIFICATION IS PRESENT

        function notification_check() {
            $this = $('#activity > .badge');

            if (parseInt($this.text()) > 0) {
                $this.addClass("bg-color-red bounceIn animated")
            }
        }

        notification_check();

        // RESET WIDGETS
        /*$('#refresh')
            .click(function (e) {
                $.SmartMessageBox({
                    title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                    content: "Would you like to RESET all your saved widgets and clear LocalStorage?",
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    if (ButtonPressed == "Yes" && localStorage) {
                        localStorage.clear();
                        location.reload();
                    }

                });
                e.preventDefault();
            });*/

        // LOGOUT BUTTON
        $('#logout a')
            .click(function (e) {
                //get the link
                $.loginURL = $(this)
                    .attr('href');

                // ask verification
                $.SmartMessageBox({
                    title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" +
                        $('#show-shortcut')
                        .text() + "</strong></span> ?",
                    content: "You can improve your security further after logging out by closing this opened browser",
                    buttons: '[No][Yes]'

                }, function (ButtonPressed) {
                    if (ButtonPressed == "Yes") {
                        $.root_.addClass('animated fadeOutUp');
                        setTimeout(logout, 1000)
                    }

                });
                e.preventDefault();
            });

        /*
         * LOGOUT ACTION
         */

        function logout() {
            window.location = $.loginURL;
        }

        /*
         * SHORTCUTS
         */

        // SHORT CUT (buttons that appear when clicked on user name)
        $.shortcut_dropdown.find('a')
            .click(function (e) {

                e.preventDefault();

                window.location = $(this)
                    .attr('href');
                setTimeout(shortcut_buttons_hide, 300);

            });

        // SHORTCUT buttons goes away if mouse is clicked outside of the area
        $(document)
            .mouseup(function (e) {
                if (!$.shortcut_dropdown.is(e.target) // if the target of the click isn't the container...
                    && $.shortcut_dropdown.has(e.target)
                    .length === 0) {
                    shortcut_buttons_hide()
                }
            });

        // SHORTCUT ANIMATE HIDE
        function shortcut_buttons_hide() {
            $.shortcut_dropdown.animate({
                height: "hide"
            }, 300, "easeOutCirc");
            $.root_.removeClass('shortcut-on');

        }

        // SHORTCUT ANIMATE SHOW
        function shortcut_buttons_show() {
            $.shortcut_dropdown.animate({
                height: "show"
            }, 200, "easeOutCirc")
            $.root_.addClass('shortcut-on');
        }

    });

/*
 * RESIZER WITH THROTTLE
 * Source: http://benalman.com/code/projects/jquery-resize/examples/resize/
 */

(function ($, window, undefined) {

    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id, str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    jq_resize[str_delay] = $.throttle_delay;

    jq_resize[str_throttle] = true;

    $.event.special[str_resize] = {

        setup: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },

        add: function (handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply(this, arguments);
            };
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function () {
            elems.each(function () {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);
                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }

            });
            loopy();

        }, jq_resize[str_delay]);

    };

})(jQuery, this);

/*
 * NAV OR #LEFT-BAR RESIZE DETECT
 * Description: changes the page min-width of #CONTENT and NAV when navigation is resized.
 * This is to counter bugs for min page width on many desktop and mobile devices.
 * Note: This script uses JSthrottle technique so don't worry about memory/CPU usage
 */

// Fix page and nav height
function nav_page_height() {
    setHeight = $('#main')
        .height();
    menuHeight = $.left_panel.height();
    windowHeight = $(window)
        .height() - $.navbar_height;
    //set height

    if (setHeight > windowHeight) { // if content height exceedes actual window height and menuHeight
        $.left_panel.css('min-height', setHeight + 'px');
        $.root_.css('min-height', setHeight + $.navbar_height + 'px');

    } else {
        $.left_panel.css('min-height', windowHeight + 'px');
        $.root_.css('min-height', windowHeight + 'px');
    }

}


$('#main')
    .resize(function () {
        nav_page_height();
        check_if_mobile_width();
    })

$('nav')
    .resize(function () {
        nav_page_height();
    })

function check_if_mobile_width() {
    if ($(window)
        .width() < 979) {
        $.root_.addClass('mobile-view-activated')
    } else if ($.root_.hasClass('mobile-view-activated')) {
        $.root_.removeClass('mobile-view-activated');
    }
}

/* ~ END: NAV OR #LEFT-BAR RESIZE DETECT */

/*
 * DETECT IE VERSION
 * Description: A short snippet for detecting versions of IE in JavaScript
 * without resorting to user-agent sniffing
 * RETURNS:
 * If you're not in IE (or IE version is less than 5) then:
 * //ie === undefined
 *
 * If you're in IE (>=5) then you can determine which version:
 * // ie === 7; // IE7
 *
 * Thus, to detect IE:
 * // if (ie) {}
 *
 * And to detect the version:
 * ie === 6 // IE6
 * ie > 7 // IE8, IE9 ...
 * ie < 9 // Anything less than IE9
 */

var ie = (function () {

    var undef, v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

    return v > 4 ? v : undef;

}());

/* ~ END: DETECT IE VERSION */

/*
 * CUSTOM MENU PLUGIN
 */

$.fn.extend({

    //pass the options variable to the function
    jarvismenu: function (options) {

        var defaults = {
            accordion: 'true',
            speed: 200,
            closedSign: '[+]',
            openedSign: '[-]'
        };

        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);
        //Assign current element to variable, in this case is UL element
        var $this = $(this);

        //add a mark [+] to a multilevel menu
        $this.find("li")
            .each(function () {
                if ($(this)
                    .find("ul")
                    .size() != 0) {
                    //add the multilevel sign next to the link
                    $(this)
                        .find("a:first")
                        .append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

                    //avoid jumping to the top of the page when the href is an #
                    if ($(this)
                        .find("a:first")
                        .attr('href') == "#") {
                        $(this)
                            .find("a:first")
                            .click(function () {
                                return false;
                            });
                    }
                }
            });

        //open active level
        $this.find("li.active")
            .each(function () {
                $(this)
                    .parents("ul")
                    .slideDown(opts.speed);
                $(this)
                    .parents("ul")
                    .parent("li")
                    .find("b:first")
                    .html(opts.openedSign);
                $(this)
                    .parents("ul")
                    .parent("li")
                    .addClass("open")
            });

        $this.find("li a")
            .click(function () {

                if ($(this)
                    .parent()
                    .find("ul")
                    .size() != 0) {

                    if (opts.accordion) {
                        //Do nothing when the list is open
                        if (!$(this)
                            .parent()
                            .find("ul")
                            .is(':visible')) {
                            parents = $(this)
                                .parent()
                                .parents("ul");
                            visible = $this.find("ul:visible");
                            visible.each(function (visibleIndex) {
                                var close = true;
                                parents.each(function (parentIndex) {
                                    if (parents[parentIndex] == visible[visibleIndex]) {
                                        close = false;
                                        return false;
                                    }
                                });
                                if (close) {
                                    if ($(this)
                                        .parent()
                                        .find("ul") != visible[visibleIndex]) {
                                        $(visible[visibleIndex])
                                            .slideUp(opts.speed, function () {
                                                $(this)
                                                    .parent("li")
                                                    .find("b:first")
                                                    .html(opts.closedSign);
                                                $(this)
                                                    .parent("li")
                                                    .removeClass("open");
                                            });

                                    }
                                }
                            });
                        }
                    } // end if
                    if ($(this)
                        .parent()
                        .find("ul:first")
                        .is(":visible") && !$(this)
                        .parent()
                        .find("ul:first")
                        .hasClass("active")) {
                        $(this)
                            .parent()
                            .find("ul:first")
                            .slideUp(opts.speed, function () {
                                $(this)
                                    .parent("li")
                                    .removeClass("open");
                                $(this)
                                    .parent("li")
                                    .find("b:first")
                                    .delay(opts.speed)
                                    .html(opts.closedSign);
                            });

                    } else {
                        $(this)
                            .parent()
                            .find("ul:first")
                            .slideDown(opts.speed, function () {
                                /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                                $(this)
                                    .parent("li")
                                    .addClass("open");
                                $(this)
                                    .parent("li")
                                    .find("b:first")
                                    .delay(opts.speed)
                                    .html(opts.openedSign);
                            });
                    } // end else
                } // end if
            });
    } // end function
});

/* ~ END: CUSTOM MENU PLUGIN */

/*
 * ELEMENT EXIST OR NOT
 * Description: returns true or false
 * Usage: $('#myDiv').doesExist();
 */

jQuery.fn.doesExist = function () {
    return jQuery(this)
        .length > 0;
};

/* ~ END: ELEMENT EXIST OR NOT */


/*
 * SCROLL TO TOP
 */

function scrollTop() {

    $("html, body")
        .animate({
            scrollTop: 0
        }, "fast");

}

/* ~ END: SCROLL TO TOP */

/*
 * GOOGLE MAPS
 * description: Append google maps to head dynamically
 */

var gMapsLoaded = false;
window.gMapsCallback = function () {
    gMapsLoaded = true;
    $(window)
        .trigger('gMapsLoaded');
}
window.loadGoogleMaps = function () {
    if (gMapsLoaded)
        return window.gMapsCallback();
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
    (document.getElementsByTagName("head")[0] || document.documentElement)
        .appendChild(script_tag);
}
/* ~ END: GOOGLE MAPS */

/*
 * APP AJAX REQUEST SETUP
 * Description: Executes and fetches all ajax requests also
 * updates naivgation elements to active
 */

// fire this on page load if nav exists
/*if ($('nav')
    .length) {
    checkURL();
};

$('nav a[href!="#"]')
    .click(function (e) {
        e.preventDefault();
        $this = $(this);

        // if parent is not active then get hash, or else page is assumed to be loaded
        if (!$this.parent()
            .hasClass("active") && !$this.attr('target')) {

            // update window with hash

            if ($.root_.hasClass('mobile-view-activated')) {
                $.root_.removeClass('hidden-menu');
                window.setTimeout(function () {
                    window.location.hash = $this.attr('href')
                }, 250);
                // it may not need this delay...
            } else {
                window.location.hash = $this.attr('href');
            }
        }

    });

// fire links with targets on different window
$('nav a[target="_blank"]')
    .click(function (e) {
        e.preventDefault();
        $this = $(this);

        window.open($this.attr('href'));
    });

// fire links with targets on same window
$('nav a[target="_top"]')
    .click(function (e) {
        e.preventDefault();
        $this = $(this);

        window.location = ($this.attr('href'));
    });

// all links with hash tags are ignored
$('nav a[href="#"]')
    .click(function (e) {
        e.preventDefault();
    });

// DO on hash change
$(window)
    .on('hashchange', function () {
        checkURL();
    });

// CHECK TO SEE IF URL EXISTS
function checkURL() {

    //get the url by removing the hash
    url = location.hash.replace(/^#/, '');

    container = $('#content');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active')
            .removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])')
            .addClass("active");
        title = ($('nav a[href="' + url + '"]')
            .attr('title'))

        // change page title from global var
        document.title = (title || document.title);
        //console.log("page title: " + document.title);

        // parse url to jquery
        loadURL(url, container);
    } else {

        // grab the first URL from nav
        $this = $('nav > ul > li:first-child > a[href!="#"]');

        //update hash
        window.location.hash = $this.attr('href');

    }

}

// LOAD AJAX PAGES

function loadURL(url, container) {
    //console.log(container)

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true, // (warning: this will cause a timestamp and will call the request twice)
        beforeSend: function () {
            container.html('<h1><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
        },
        success: function (data) {
            container.css({
                opacity: '0.0'
            })
                .html(data)
                .delay(100)
                .animate({
                    opacity: '1.0'
                }, 300);
            drawBreadCrumb();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            container.html(
                '<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>'
            );
            drawBreadCrumb();
        },
        async: false
    });

    //console.log("ajax request sent");
}

// UPDATE BREADCRUMB
function drawBreadCrumb() {

    $("#ribbon ol.breadcrumb")
        .empty();
    $("#ribbon ol.breadcrumb")
        .append($("<li>Home</li>"));
    $('nav li.active > a')
        .each(function () {
            $("#ribbon ol.breadcrumb")
                .append($("<li></li>")
                    .html($.trim($(this)
                        .clone()
                        .children(".badge")
                        .remove()
                        .end()
                        .text())));
        });

    //console.log("breadcrumb created");
}*/

/* ~ END: APP AJAX REQUEST SETUP */

/*
 * PAGE SETUP
 * Description: fire certain scripts that run through the page
 * to check for form elements, tooltip activation, popovers, etc...
 */
function pageSetUp() {

    // activate tooltips
    $("[rel=tooltip]")
        .tooltip();

    // activate popovers
    $("[rel=popover]")
        .popover();

    // activate popovers with hover states
    $("[rel=popover-hover]")
        .popover({
            trigger: "hover"
        });

    // activate inline charts
    //runAllCharts();

    // setup widgets
    //setup_widgets_desktop();

    //setup nav height (dynamic)
    nav_page_height();

    // run form elements
    //runAllForms();

}

// Keep only 1 active popover per trigger - also check and hide active popover if user clicks on document
$('body')
    .on('click', function (e) {
        $('[rel="popover"]')
            .each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this)
                    .is(e.target) && $(this)
                    .has(e.target)
                    .length === 0 && $('.popover')
                    .has(e.target)
                    .length === 0) {
                    $(this)
                        .popover('hide');
                }
            });
    });
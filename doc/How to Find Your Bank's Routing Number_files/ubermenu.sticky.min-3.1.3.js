'use strict';jQuery(document).ready(function(b){if(ubermenu_sticky_settings)for(var a in ubermenu_sticky_settings)if(ubermenu_sticky_settings.hasOwnProperty(a)){var f=1==ubermenu_sticky_settings[a].is_sticky?!0:!1,g=b(".ubermenu-"+a),e=b(".ubermenu-responsive-toggle-"+a);g.find("> .ubermenu-nav");g.add(e);1==ubermenu_sticky_settings[a].is_mobile&&g.addClass("ubermenu-is-mobile");if(f){if(f="on"==ubermenu_sticky_settings[a].full_width_menu_bar?!0:!1)g.addClass("ubermenu-sticky-full-width"),e.addClass("ubermenu-sticky-full-width");if(!f){var l=g.filter(".ubermenu-bar-align-full");l.each(function(){b(this).css("width",b(this).parent().width())});e.each(function(){b(this).css("width",b(this).parent().width())});b(window).ubersmartresize(function(){l.each(function(){b(this).css("width",b(this).parent().width())});e.each(function(){b(this).css("width",b(this).parent().width())})})}e.css("height",e.outerHeight());ubermenu_sticky_settings[a].permanent||(f=ubermenu_sticky_settings[a].sticky_offset?ubermenu_sticky_settings[a].sticky_offset:0,g.sticky({topSpacing:f,className:"ubermenu-sticky",wrapperClassName:"ubermenu-sticky-wrapper"}),g.on("sticky-start sticky-end",function(){setTimeout(function(){g.ubermenu("positionSubmenus")},100)}),e.sticky({topSpacing:f,className:"ubermenu-sticky",wrapperClassName:"ubermenu-sticky-toggle-wrapper"}))}}});(function(b){var a={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:""},f=b(window),g=b(document),e=[],l=f.height(),p=function(){for(var b=f.scrollTop(),h=g.height(),n=h-l,n=b>n?n-b:0,d=0;d<e.length;d++){var c=e[d],a=c.stickyWrapper.offset().top-c.topSpacing-n;b<=a?null!==c.currentTop&&(c.stickyElement.css("position","").css("top",""),c.stickyElement.removeClass(c.className),c.stickyElement.trigger("sticky-end",[c]).parent().removeClass(c.className),c.currentTop=null):(a=h-c.stickyElement.outerHeight()-c.topSpacing-c.bottomSpacing-b-n,a=0>a?a+c.topSpacing:c.topSpacing,c.currentTop!=a&&(c.stickyElement.css("position","fixed").css("top",a),c.stickyElement.trigger("sticky-start",[c]).parent().addClass(c.className),c.stickyElement.addClass(c.className),c.currentTop=a))}},q=function(){l=f.height()},k={init:function(m){var h=b.extend({},a,m);return this.each(function(){var a=b(this),d=a.attr("id");d||(d=a.data("ubermenu-target")+"-toggle");d=b("<div></div>").attr("id",d+"-sticky-wrapper").addClass(h.wrapperClassName);a.wrapAll(d);h.center&&a.parent().css({width:a.outerWidth(),marginLeft:"auto",marginRight:"auto"});"right"==a.css("float")&&a.css({"float":"none"}).parent().css({"float":"right"});d=a.parent();d.css("min-height",a.outerHeight());e.push({topSpacing:h.topSpacing,bottomSpacing:h.bottomSpacing,stickyElement:a,currentTop:null,stickyWrapper:d,className:h.className,getWidthFrom:h.getWidthFrom})})},update:p,unstick:function(a){return this.each(function(){for(var a=b(this),m=-1,d=0;d<e.length;d++)e[d].stickyElement.get(0)==a.get(0)&&(m=d);-1!=m&&(e.splice(m,1),a.unwrap(),a.removeAttr("style"))})}};window.addEventListener?(window.addEventListener("scroll",p,!1),window.addEventListener("resize",q,!1)):window.attachEvent&&(window.attachEvent("onscroll",p),window.attachEvent("onresize",q));b.fn.sticky=function(a){if(k[a])return k[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)b.error("Method "+a+" does not exist on jQuery.sticky");else return k.init.apply(this,arguments)};b.fn.unstick=function(a){if(k[a])return k[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)b.error("Method "+a+" does not exist on jQuery.sticky");else return k.unstick.apply(this,arguments)};b(function(){setTimeout(p,0)})})(jQuery);
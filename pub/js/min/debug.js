!function(c,n){var o=n("#loco-utf8-check")[0].textContent;function t(o,e,a){"success"!==e&&(a=c.ajax.parse(c.ajax.strip(o.responseText))),n("#loco-ajax-check").text("FAILED: "+a).addClass("loco-danger")}1===o.length&&10003===o.charCodeAt(0)||c.notices.warn("This page has a problem rendering UTF-8").stick(),window.ajaxurl&&n("#loco-ajax-url").text(window.ajaxurl),c.ajax.post("ping",{echo:"ΟΚ ✓"},function(o,e,a){o&&o.ping?n("#loco-ajax-check").text(o.ping):t(a,e,o&&o.error&&o.error.message)},t)}(window.locoScope,window.jQuery);
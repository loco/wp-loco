"use strict";

!function(c, b) {
function k(a, d, e) {
"success" !== d && (e = c.ajax.parse(c.ajax.strip(a.responseText)));
b("#loco-ajax-check").text("FAILED: " + e).addClass("loco-danger");
}
function g(a, d) {
return b("#loco-api-" + a).text(d);
}
function m(a) {
var d = a.getId();
a.key() ? a.translate("OK", n, function(e, p) {
p ? g(d, "OK ✓") : g(d, "FAILED").addClass("loco-danger");
}) : g(d, "No API key");
}
var f = b("#loco-utf8-check")[0].textContent, h = c.conf;
1 === f.length && 10003 === f.charCodeAt(0) || c.notices.warn("This page has a problem rendering UTF-8").stick();
window.ajaxurl && b("#loco-ajax-url").text(window.ajaxurl);
b("#loco-vers-jquery").text([ b.fn && b.fn.jquery || "unknown", "ui/" + (b.ui && b.ui.version || "none"), "migrate/" + (b.migrateVersion || "none") ].join("; "));
c.ajax.post("ping", {
echo: "ΟΚ ✓"
}, function(a, d, e) {
a && a.ping ? b("#loco-ajax-check").text(a.ping) : k(e, d, a && a.error && a.error.message);
}, k);
h = h.apis;
var q = h.length, l = -1, n = c.locale.parse("fr");
if (c.apis) for (;++l < q; ) {
f = h[l];
try {
m(c.apis.create(f));
} catch (a) {
g(f.id, String(a));
}
} else c.notices.error("admin.js is out of date. Please empty your browser cache.");
}(window.loco, window.jQuery);
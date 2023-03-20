"use strict";

!function(d, c) {
function l(a, b, e) {
"success" !== b && (e = d.ajax.parse(d.ajax.strip(a.responseText)));
c("#loco-ajax-check").text("FAILED: " + e).addClass("loco-danger");
}
function g(a, b) {
return c("#loco-api-" + a).text(b);
}
function n(a) {
var b = a.getId();
a.key() ? a.translate("OK", p, function(e, h) {
h ? g(b, "OK ✓") : g(b, "FAILED").addClass("loco-danger");
}) : g(b, "No API key");
}
var f = c("#loco-utf8-check")[0].textContent, k = d.conf;
1 === f.length && 10003 === f.charCodeAt(0) || d.notices.warn("This page has a problem rendering UTF-8").stick();
window.ajaxurl && c("#loco-ajax-url").text(window.ajaxurl);
c("#loco-vers-jquery").text([ c.fn && c.fn.jquery || "unknown", "ui/" + (c.ui && c.ui.version || "none"), "migrate/" + (c.migrateVersion || "none") ].join("; "));
d.ajax.post("ping", {
echo: "ΟΚ ✓"
}, function(a, b, e) {
a && a.ping ? c("#loco-ajax-check").text(a.ping) : l(e, b, a && a.error && a.error.message);
}, l);
f = k.apis;
k = f.length;
const m = d.apis.providers(), p = d.locale.parse("fr");
if (d.apis) {
let a = -1;
for (;++a < k; ) {
const b = f[a], e = b.id;
try {
n(d.apis.create(b, m[e] || m._));
} catch (h) {
g(e, String(h));
}
}
} else d.notices.error("admin.js is out of date. Please empty your browser cache.");
}(window.loco, window.jQuery);
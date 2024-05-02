"use strict";

!function(d, c) {
function k(a, b, e) {
"success" !== b && (e = d.ajax.parse(d.ajax.strip(a.responseText)));
c("#loco-ajax-check").text("FAILED: " + e).addClass("loco-danger");
}
function g(a, b) {
return c("#loco-api-" + a).text(b);
}
function m(a) {
var b = a.getId();
a.key() ? a.verify(function(e) {
e ? g(b, "OK ✓") : g(b, "FAILED").addClass("loco-danger");
}) : g(b, "No API key");
}
var f = c("#loco-utf8-check")[0].textContent, h = d.conf;
1 === f.length && 10003 === f.charCodeAt(0) || d.notices.warn("This page has a problem rendering UTF-8").stick();
window.ajaxurl && c("#loco-ajax-url").text(window.ajaxurl);
c("#loco-vers-jquery").text([ c.fn && c.fn.jquery || "unknown", "ui/" + (c.ui && c.ui.version || "none"), "migrate/" + (c.migrateVersion || "none") ].join("; "));
d.ajax.post("ping", {
echo: "ΟΚ ✓"
}, function(a, b, e) {
a && a.ping ? c("#loco-ajax-check").text(a.ping) : k(e, b, a && a.error && a.error.message);
}, k);
f = h.apis;
h = f.length;
const l = d.apis.providers();
if (d.apis) {
let a = -1;
for (;++a < h; ) {
const b = f[a], e = b.id;
try {
m(d.apis.create(b, l[e] || l._));
} catch (n) {
g(e, String(n));
}
}
} else d.notices.error("admin.js is out of date. Please empty your browser cache.");
}(window.loco, window.jQuery);
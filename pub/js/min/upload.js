"use strict";

!function(e, l, m) {
function h(a) {
var n = m(b).find("button.button-primary");
n.each(function(A, t) {
t.disabled = a;
});
return n;
}
function p() {
h(!0).addClass("loco-loading");
}
function f(a) {
h(a).removeClass("loco-loading");
}
function u(a) {
f(!(a && c && d));
}
function q() {
b.path.value = c + "/" + d;
p();
g.connect();
}
function v(a) {
d = String(b.f.value).split(/[\\\/]/).pop();
a = a.target || {};
if ("dir" === a.name && a.checked) {
if ((a = a.value) && a !== c && (c = a, d)) {
q();
return;
}
} else if ("f" === a.name && c) {
q();
return;
}
h(!(c && d && g.authed()));
}
function w(a) {
a.redirect ? (f(!0), e.location.assign(a.redirect)) : f(!1);
}
function x() {
f(!1);
}
function y(a) {
if (c && d && g.authed()) return z ? (a.preventDefault(), a = new FormData(b), p(), 
k.ajax.post("upload", a, w, x), !1) : !0;
a.preventDefault();
return !1;
}
let g, c, d;
const k = e.loco, z = (k && k.conf || {}).multipart && e.FormData && e.Blob, r = l.getElementById("loco-fs"), b = l.getElementById("loco-main");
r && b && (g = e.loco.fs.init(r).setForm(b).listen(u), m(b).change(v).submit(y));
}(window, document, window.jQuery);
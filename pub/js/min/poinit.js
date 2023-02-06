"use strict";

!function(A, w, d) {
function p(a) {
d(h).find("button.button-primary").each(function(c, b) {
b.disabled = a;
});
}
function x() {
var a = q && q.val(), c = a && a.isValid() && "zxx" !== a.lang, b = r && r.val();
c = c && b;
y(a);
p(!0);
c && (a = r.txt(), a !== t ? (t = a, u.path.value = t, z.listen(B).connect()) : p(!1));
}
function B(a) {
p(!a);
}
function y(a) {
var c = d(h), b = a && a.toString("_") || "", g = b ? "zxx" === b ? "{locale}" : b : "{invalid}";
c.find("code.path span").each(function(n, e) {
e.textContent = g;
});
c.find("span.lang").each(function(n, e) {
a && "zxx" !== a.lang ? (e.setAttribute("lang", a.lang), e.setAttribute("class", a.getIcon())) : (e.setAttribute("lang", ""), 
e.setAttribute("class", "lang nolang"));
});
}
function C(a) {
(a = a && a.redirect) && location.assign(a);
}
let t = "";
const l = A.loco, u = w.getElementById("loco-fs"), h = w.getElementById("loco-poinit"), z = u && l.fs.init(u);
var q = function(a) {
function c() {
m[0].checked = !0;
e(!0);
}
function b() {
k.value || (k.value = g());
m[1].checked = !0;
e(!1);
}
function g() {
var f = d(m[0].checked ? v : k).serializeArray();
return f[0] && f[0].value || "";
}
function n() {
e(m[0].checked);
return !0;
}
function e(f) {
k.disabled = f;
v.disabled = !f;
D.className = f ? "disabled" : "active";
E.className = f ? "active" : "disabled";
x();
}
var v = a["select-locale"], k = a["custom-locale"], m = a["use-selector"], E = d(v).on("focus", c).closest("fieldset").on("click", c)[0], D = d(k).on("focus", b).closest("fieldset").on("click", b)[0];
d(m).change(n);
n();
l.watchtext(k, function() {
d(k.form).triggerHandler("change");
});
return {
val: function() {
var f = g();
return f ? l.locale.parse(f) : l.locale.clone({
lang: "zxx"
});
}
};
}(h), r = function() {
function a(b) {
var g;
return (g = (g = d(c).serializeArray()[0]) && g.value || null) && h[b + "[" + g + "]"];
}
var c = h["select-path"];
return {
val: function() {
var b = a("path");
return b && b.value;
},
txt: function() {
var b = a("path");
return b && d(b.parentNode).find("code.path").text();
}
};
}(h);
d(h).on("change", x).on("submit", function(a) {
a.preventDefault();
z.applyCreds(h);
l.ajax.submit(a.target, C);
return !1;
});
y(q.val());
}(window, document, window.jQuery);
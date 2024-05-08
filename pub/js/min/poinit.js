"use strict";

!function(z, w, d) {
function p(a) {
d(h).find("button.button-primary").each(function(c, b) {
b.disabled = a;
});
}
function x() {
var a = q && q.val(), c = a && a.isValid() && "zxx" !== a.lang;
const b = r && r.val();
c = c && b;
A(a);
p(!0);
c && (a = r.txt(), a !== t ? (t = a, u.path.value = t, y.listen(B).connect()) : p(!1));
}
function B(a) {
p(!a);
}
function A(a) {
const c = d(h), b = a && a.toString("_") || "", e = b ? "zxx" === b ? "{locale}" : b : "{invalid}";
console.trace([ b, e ]);
c.find("code.path span").each(function(n, f) {
f.textContent = e;
});
c.find("span.lang").each(function(n, f) {
a && "zxx" !== a.lang ? (f.setAttribute("lang", a.lang), f.setAttribute("class", a.getIcon())) : (f.setAttribute("lang", ""), 
f.setAttribute("class", "lang nolang"));
});
}
function C(a) {
(a = a && a.redirect) && location.assign(a);
}
let t = "";
const l = z.loco, u = w.getElementById("loco-fs"), h = w.getElementById("loco-poinit"), y = u && l.fs.init(u), q = function(a) {
function c() {
m[0].checked = !0;
f(!0);
}
function b() {
k.value || (k.value = e());
m[1].checked = !0;
f(!1);
}
function e() {
const g = d(m[0].checked ? v : k).serializeArray();
return g[0] && g[0].value || "";
}
function n() {
f(m[0].checked);
return !0;
}
function f(g) {
k.disabled = g;
v.disabled = !g;
D.className = g ? "disabled" : "active";
E.className = g ? "active" : "disabled";
x();
}
const v = a["select-locale"], k = a["custom-locale"], m = a["use-selector"], E = d(v).on("focus", c).closest("fieldset").on("click", c)[0], D = d(k).on("focus", b).closest("fieldset").on("click", b)[0];
return {
val: function() {
var g = e();
return g ? l.locale.parse(g) : l.locale.clone({
lang: "zxx"
});
},
init: function() {
d(m).change(n);
n();
l.watchtext(k, function() {
d(k.form).triggerHandler("change");
});
}
};
}(h), r = function() {
function a(b) {
var e;
return (e = (e = d(c).serializeArray()[0]) && e.value || null) && h[b + "[" + e + "]"];
}
const c = h["select-path"];
return {
val: function() {
const b = a("path");
return b && b.value;
},
txt: function() {
const b = a("path");
return b && d(b.parentNode).find("code.path").text();
}
};
}(h);
q.init();
d(h).on("change", x).on("submit", function(a) {
a.preventDefault();
y.applyCreds(h);
l.ajax.submit(a.target, C);
return !1;
});
}(window, document, window.jQuery);
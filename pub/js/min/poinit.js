!function(n, t, c) {
var i, e, a, l, o, r, u, s = n.loco, f = t.getElementById("loco-fs"), d = t.getElementById("loco-poinit"), v = f && s.fs.init(f), g = (a = (e = d)["select-locale"], 
l = e["custom-locale"], o = e["use-selector"], r = c(a).on("focus", p).closest("fieldset").on("click", p)[0], 
u = c(l).on("focus", x).closest("fieldset").on("click", x)[0], c(o).change(m), m(), 
s.watchtext(l, function(n) {
c(l.form).triggerHandler("change");
}), {
val: function() {
var n = b();
return n ? s.locale.parse(n) : s.locale.clone({
lang: "zxx"
});
}
});
function h() {
return o[0].checked;
}
function p() {
y(o[0].checked = !0);
}
function x() {
l.value || (l.value = b()), y(!(o[1].checked = !0));
}
function b() {
var n = c(h() ? a : l).serializeArray();
return n[0] && n[0].value || "";
}
function m() {
return y(h()), !0;
}
function y(n) {
l.disabled = n, a.disabled = !n, u.className = n ? "disabled" : "active", r.className = n ? "active" : "disabled", 
I();
}
var z, A = (z = d["select-path"], {
val: function() {
var n = k("path");
return n && n.value;
},
txt: function() {
var n = k("path");
return n && c(n.parentNode).find("code.path").text();
}
});
function k(n) {
var t = function() {
var n = c(z).serializeArray()[0];
return n && n.value || null;
}();
return t && d[n + "[" + t + "]"];
}
function w(e) {
c(d).find("button.button-primary").each(function(n, t) {
t.disabled = e;
});
}
function I() {
var n = g && g.val(), t = n && n.isValid() && "zxx" !== n.lang, e = A && A.val(), a = t && e;
if (j(n), w(!0), a) {
var c = A.txt();
c !== i ? (i = c, f.path.value = i, v.listen(N).connect()) : w(!1);
}
}
function N(n) {
w(!n);
}
function j(e) {
var n = c(d), t = e && e.toString("_") || "", a = t ? "zxx" === t ? "{locale}" : t : "{invalid}";
n.find("code.path span").each(function(n, t) {
t.textContent = a;
}), n.find("span.lang").each(function(n, t) {
!function(n, t) {
t && "zxx" !== t.lang ? (n.setAttribute("lang", t.lang), n.setAttribute("class", t.getIcon())) : (n.setAttribute("lang", ""), 
n.setAttribute("class", "lang nolang"));
}(t, e);
});
}
function B(n) {
var t = n && n.redirect;
t && location.assign(t);
}
c(d).on("change", I).on("submit", function(n) {
return n.preventDefault(), v.applyCreds(d), s.ajax.submit(n.target, B), !1;
}), j(g.val());
}(window, document, jQuery);
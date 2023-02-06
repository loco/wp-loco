"use strict";

!function(h, g, d) {
function p() {
return d(e).removeClass("loading");
}
function k(a) {
return d(e).find("div.diff").html(a);
}
function x(a) {
p();
return d('<p class="error"></p>').text(a).appendTo(k(""));
}
function E(a, b) {
let c = b.getElementsByTagName("tr"), y = c.length;
a = b.getAttribute("data-diff").split(/\D+/);
b = a[0];
let q = a[1], F = a[2], G = a[3];
for (a = 0; a < y; a++) {
var l = c[a].getElementsByTagName("td");
var m = l[0], z = b++;
z <= q && d("<span></span>").text(String(z)).prependTo(m);
l = l[2];
m = F++;
m <= G && d("<span></span>").text(String(m)).prependTo(l);
}
}
function H(a) {
f && f.abort();
let b = A[a];
null != b ? (k(b), p()) : (k(""), d(e).addClass("loading"), f = r.ajax.post("diff", {
lhs: t.paths[a],
rhs: t.paths[a + 1]
}, function(c, y, q) {
q === f && (c && c.html ? (b = c.html, A[a] = b, k(b).find("tbody").each(E), p()) : x(c && c.error || "Unknown error"));
}, function(c) {
c === f && (f = null, x("Failed to generate diff"));
}));
}
function I(a) {
a.preventDefault();
u(n - 1);
return !1;
}
function J(a) {
a.preventDefault();
u(n + 1);
return !1;
}
function u(a) {
if (0 <= a && a <= v) {
n = a;
H(a);
{
a = n;
let b = a + 1;
B.disabled = a >= v;
C.disabled = 0 >= a;
w.addClass("jshide").removeClass("diff-meta-current");
w.eq(a).removeClass("jshide").addClass("diff-meta-current");
w.eq(b).removeClass("jshide");
}
}
}
let f, A = [], r = h.loco, t = r.conf, n = 0, v = t.paths.length - 2, e = g.getElementById("loco-ui");
h = g.getElementById("loco-fs");
g = e.getElementsByTagName("form").item(0);
let D = e.getElementsByTagName("button"), w = d(e).find("div.diff-meta"), B = D.item(0), C = D.item(1);
h && g && r.fs.init(h).setForm(g);
v && (d(B).on("click", J).parent().removeClass("jshide"), d(C).on("click", I).parent().removeClass("jshide"));
u(0);
}(window, document, window.jQuery);
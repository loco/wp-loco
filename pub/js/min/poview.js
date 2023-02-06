"use strict";

!function(p, u, c) {
const g = p.loco, C = g.po.ref.init(g, g.conf), h = u.getElementById("loco-po");
!function(d, e) {
function b() {
l.length && (v.push([ m, w ]), e.push(l), l = []);
m = null;
}
function k(a) {
return c('<ol class="msgcat"></ol>').attr("start", a).appendTo(d);
}
function q(a) {
x !== a && (c("#loco-content")[a ? "removeClass" : "addClass"]("loco-invalid"), 
x = a);
}
var m, w, l = [], v = [], x = !0, r = !1, t = c(d).find("li");
t.each(function(a, f) {
f = c(f);
f.find("span.po-none").length ? b() : (w = a, null == m && (m = a), a = f.find(".po-text").text(), 
"" !== a && (l = l.concat(a.replace(/\\[ntvfab\\"]/g, " ").split(" "))));
});
b();
g.watchtext(c(d.parentNode).find("form.loco-filter")[0].q, function(a) {
if (a) {
var f = e.find(a), y = -1, z = f.length, A;
c("ol", d).remove();
if (z) {
for (;++y < z; ) {
var B = v[f[y]];
a = B[0];
for (A = k(a + 1); a <= B[1]; a++) A.append(t[a]);
}
q(!0);
} else q(!1), k(0).append(c("<li></li>").text(g.l10n._("Nothing matches the text filter")));
r = !0;
n();
} else r && (q(!0), r = !1, c("ol", d).remove(), k(1).append(t), n());
});
}(h, g.fulltext.init());
c(h).removeClass("loco-loading");
var n = function() {
var d, e = h.clientHeight - 2;
return function() {
for (var b = h, k = b.offsetTop || 0; (b = b.offsetParent) && b !== u.body; ) k += b.offsetTop || 0;
b = p.innerHeight - k - 20;
d !== b && (h.style.height = b < e ? String(b) + "px" : "", d = b);
};
}();
n();
c(p).resize(n);
c(h).on("click", function(d) {
var e = d.target;
if (e.hasAttribute("href")) return d.preventDefault(), C.load(e.textContent), !1;
});
}(window, document, window.jQuery);
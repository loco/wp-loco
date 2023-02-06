"use strict";

!function(k, e, f) {
function g(a) {
f(b).find("button.button-primary").each(function(r, l) {
l.disabled = a;
});
}
function m(a) {
g(!(a && c));
}
function n(a) {
a = a.target || {};
"dest" !== a.name || !a.checked && "text" !== a.type || (a = a.value) && a !== c && (c = a, 
g(!0), p !== a && (d.dest.value = a, h.connect()));
}
function q(a) {
if (c) return !0;
a.preventDefault();
return !1;
}
let h, c, d = e.getElementById("loco-fs"), b = e.getElementById("loco-main"), p = b.path.value;
d && b && (h = k.loco.fs.init(d).setForm(b).listen(m), f(b).change(n).submit(q));
}(window, document, window.jQuery);
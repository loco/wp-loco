"use strict";

!function(c, b, e) {
function f(a) {
(a = a && a.redirect) && location.assign(a);
}
const d = c.loco;
c = b.getElementById("loco-fs");
b = b.getElementById("loco-potinit");
e(b).on("submit", function(a) {
a.preventDefault();
d.ajax.submit(a.target, f);
return !1;
});
c && d.fs.init(c).setForm(b);
}(window, document, window.jQuery);
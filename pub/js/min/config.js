"use strict";

!function(n, p, d) {
function h(a, b) {
let c = a.offsetTop;
for (;(a = a.offsetParent) && a !== b; ) c += a.offsetTop;
return c;
}
function k() {
function a(e, f) {
e = f.name.replace("[0]", l);
d(f).attr("name", e).val("");
}
var b = d("#loco-conf > div");
let c = b.eq(0).clone();
b = b.length;
let l = "[" + b + "]";
c.attr("id", "loco-conf-" + b);
c.find("input").each(a);
c.find("textarea").each(a);
c.find("h2").eq(0).html("New set <span>(untitled)</span>");
c.insertBefore("#loco-form-foot");
g(c.find("a.icon-del"), b);
c.hide().slideDown(500);
d("html, body").animate({
scrollTop: h(c[0])
}, 500);
}
function g(a, b) {
return a.on("click", function(c) {
c.preventDefault();
m(b);
return !1;
});
}
function m(a) {
var b = d("#loco-conf-" + a);
b.find('input[name="conf[' + a + '][removed]"]').val("1");
b.slideUp(500, function() {
d(this).hide().find("table").remove();
});
}
d("#loco-conf > div").each(function(a, b) {
g(d(b).find("a.icon-del"), a);
});
d("#loco-add-butt").attr("disabled", !1).on("click", function(a) {
a.preventDefault();
k();
return !1;
});
}(window, document, window.jQuery);
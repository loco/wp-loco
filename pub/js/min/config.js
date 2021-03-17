!function(n, o, c) {
function e() {
var n = c("#loco-conf > div"), o = n.eq(0).clone(), e = n.length, t = "[" + e + "]";
function i(n, o) {
var e = o.name.replace("[0]", t);
c(o).attr("name", e).val("");
}
o.attr("id", "loco-conf-" + e), o.find("input").each(i), o.find("textarea").each(i), 
o.find("h2").eq(0).html("New set <span>(untitled)</span>"), o.insertBefore("#loco-form-foot"), 
f(o.find("a.icon-del"), e), o.hide().slideDown(500), c("html, body").animate({
scrollTop: function(n, o) {
for (var e = n.offsetTop; (n = n.offsetParent) && n !== o; ) e += n.offsetTop;
return e;
}(o[0])
}, 500);
}
function f(n, o) {
return n.on("click", function(n) {
return n.preventDefault(), function(n) {
var o = c("#loco-conf-" + n);
o.find('input[name="conf[' + n + '][removed]"]').val("1"), o.slideUp(500, function() {
c(this).hide().find("table").remove();
});
}(o), !1;
});
}
c("#loco-conf > div").each(function(n, o) {
f(c(o).find("a.icon-del"), n);
}), c("#loco-add-butt").attr("disabled", !1).on("click", function(n) {
return n.preventDefault(), e(), !1;
});
}(window, document, jQuery);
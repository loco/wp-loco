"use strict";

!function(r, t, b) {
function u(a, f, k) {
function e() {
l("Failed to contact remote API");
c = null;
}
function g() {
c && (clearTimeout(c), c = null);
}
var c = setTimeout(e, 3e3);
l("");
b.ajax({
url: n.apiUrl + "/" + a + "/" + f + ".jsonp?version=" + encodeURIComponent(k),
dataType: "jsonp",
success: function(h) {
if (c) {
g();
const p = h && h.exact, v = h && h.status;
p ? (d["json-content"].value = p, b("#loco-remote-empty").hide(), b("#loco-remote-found").show()) : 404 === v ? l("Sorry, we don't know a bundle by this name") : (q.notices.error(h.error || "Unknown server error"), 
e());
}
},
error: function() {
c && (g(), e());
},
cache: !0
});
return {
abort: g
};
}
function l(a) {
d["json-content"].value = "";
b("#loco-remote-empty").show().find("span").text(a);
b("#loco-remote-found").hide().removeClass("jshide");
}
var q = r.loco, n = q.conf || {}, m, d = t.getElementById("loco-remote");
b(d).find('button[type="button"]').on("click", function(a) {
a.preventDefault();
m && m.abort();
m = u(d.vendor.value, d.slug.value, d.version.value);
return !1;
});
b(d).find('input[type="reset"]').on("click", function(a) {
a.preventDefault();
l("");
return !1;
});
b.ajax({
url: n.apiUrl + "/vendors.jsonp",
dataType: "jsonp",
success: function(a) {
for (var f = -1, k, e, g = a.length, c = b(d.vendor).html(""); ++f < g; ) k = a[f][0], 
e = a[f][1], c.append(b("<option></option>").attr("value", k).text(e));
},
cache: !0
});
}(window, document, window.jQuery);
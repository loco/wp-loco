!function(t, e, o) {
var c, i, u = e.getElementById("loco-fs"), a = e.getElementById("loco-main"), d = a.path.value;
function l(n) {
o(a).find("button.button-primary").each(function(t, e) {
e.disabled = n;
});
}
u && a && (c = t.loco.fs.init(u).setForm(a).listen(function(t) {
l(!(t && i));
}), o(a).change(function(t) {
var e, n = t.target || {};
"dest" !== n.name || !n.checked && "text" !== n.type || (e = n.value) && e !== i && (i = e, 
l(!0), d !== e && (u.dest.value = e, c.connect()));
}).submit(function(t) {
return !!i || (t.preventDefault(), !1);
}));
}(window, document, window.jQuery);
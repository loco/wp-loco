!function(k, S) {
var C = k.loco, i = C && C.conf, u = document.getElementById("loco-editor-inner");
if (C && i && u) {
var D, r, n, z, h, a, d = !!i.WP_DEBUG, l = C.po.ref && C.po.ref.init(C, i), s = null, c = null, o = i.multipart, t = C.l10n, m = C.string.sprintf, e = i.wpnum && i.wpnum.thousands_sep || ",", T = i.locale, b = C.po.init(T).wrap(i.powrap), p = !T, f = document.getElementById("loco-actions"), g = i.popath, v = i.potpath, y = i.syncmode, w = document.getElementById("loco-fs"), x = w && C.fs.init(w), I = i.readonly, j = !I, M = {}, E = 0, L = {
my: "top",
at: "top",
of: "#loco-content"
};
!o || k.FormData && k.Blob || (o = !1, C.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata")), 
l || C.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var U, P, q = (P = parseInt(S(u).css("min-height") || 0), function() {
var n = function(n, t) {
for (var o = n.offsetTop || 0; (n = n.offsetParent) && n !== t; ) o += n.offsetTop || 0;
return o;
}(u, document.body), t = k.innerHeight, o = Math.max(P, t - n - 20);
U !== o && (u.style.height = String(o) + "px", U = o);
});
q(), S(k).resize(q), u.innerHTML = "", D = C.po.ed.init(u).localise(t), C.po.kbd.init(D).add("save", j ? function() {
D.dirty && G();
} : Q).add("hint", T && j && H || Q).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var B = {
save: j && function(t) {
function o() {
t.disabled = !0;
}
function n() {
t.disabled = !1;
}
function e() {
n(), S(t).removeClass("loco-loading");
}
return t, D.on("poUnsaved", function() {
n(), S(t).addClass("button-primary");
}).on("poSave", function() {
o(), S(t).removeClass("button-primary");
}), c = S.extend({
path: g
}, i.project || {}), S(t).on("click", function(n) {
return n.preventDefault(), o(), S(t).addClass("loco-loading"), G(e), !1;
}), !0;
},
sync: j && function(t) {
var n = i.project;
if (n) {
function o() {
t.disabled = !0;
}
function e() {
t.disabled = !1;
}
function a() {
e(), S(t).removeClass("loco-loading");
}
D.on("poUnsaved", function() {
o();
}).on("poSave", function() {
e();
}), s = {
bundle: n.bundle,
domain: n.domain,
type: p ? "pot" : "po",
path: g || "",
sync: v || "",
mode: y || ""
}, S(t).on("click", function(n) {
return n.preventDefault(), o(), S(t).addClass("loco-loading"), F(a), !1;
}), e();
}
return !0;
},
revert: function(n) {
return D.on("poUnsaved", function() {
n.disabled = !1;
}).on("poSave", function() {
n.disabled = !0;
}), S(n).on("click", function(n) {
return n.preventDefault(), location.reload(), !1;
}), !0;
},
invs: function(n) {
var o = S(n);
return n.disabled = !1, D.on("poInvs", function(n, t) {
o[t ? "addClass" : "removeClass"]("inverted");
}), o.on("click", function(n) {
return n.preventDefault(), D.setInvs(!D.getInvs()), !1;
}), C.tooltip.init(o), !0;
},
code: function(n) {
var o = S(n);
return n.disabled = !1, o.on("click", function(n) {
n.preventDefault();
var t = !D.getMono();
return o[t ? "addClass" : "removeClass"]("inverted"), D.setMono(t), !1;
}), C.tooltip.init(o), !0;
},
source: K,
binary: p ? null : K
};
p ? (B.add = j && function(n) {
return n.disabled = !1, S(n).on("click", function(n) {
n.preventDefault();
var t, o = 1, e = /(\d+)$/;
for (t = "New message"; b.get(t); ) o = e.exec(t) ? Math.max(o, Number(RegExp.$1)) : o, 
t = "New message " + ++o;
return D.add(t), !1;
}), !0;
}, B.del = j && function(n) {
return n.disabled = !1, S(n).on("click", function(n) {
return n.preventDefault(), D.del(), !1;
}), !0;
}) : B.auto = function(n) {
function t() {
n.disabled = !1;
}
return D.on("poUnsaved", function() {
n.disabled = !0;
}).on("poSave poAuto", function() {
t();
}), S(n).on("click", W), t(), !0;
}, S("#loco-editor > nav .button").each(function(n, t) {
var o = t.getAttribute("data-loco"), e = B[o];
e && e(t, o) || S(t).addClass("loco-noop");
}), S(f).on("submit", Q), function(t) {
function e(n) {
S(t.parentNode)[n || null == n ? "removeClass" : "addClass"]("invalid");
}
D.searchable(C.fulltext.init()), t.disabled = !1;
var a = t.value = "", i = C.watchtext(t, function(n) {
e(D.filter(n, !0));
});
D.on("poFilter", function(n, t, o) {
a = i.val(), i.val(t || ""), e(o);
}).on("poMerge", function() {
a && D.filter(a);
});
}(document.getElementById("loco-search")), D.on("poUnsaved", function() {
k.onbeforeunload = J;
}).on("poSave", function() {
V(), k.onbeforeunload = null;
}).on("poHint", H).on("poUpdate", V).on("poMeta", function(n, t) {
var o, e, a = (e = "CODE", (o = t).tagName === e ? o : o.getElementsByTagName(e)[0]);
return !a || !l || (l.load(a.textContent), n.preventDefault(), !1);
}), b.load(i.podata), D.load(b), (T = D.targetLocale) ? T.isRTL() && S(u).addClass("trg-rtl") : D.unlock(), 
V(), delete C.conf, i = B = null;
}
function N(n) {
return C.l10n._(n);
}
function O(n, t, o) {
return C.l10n.n(n, t, o);
}
function A(n) {
return n.format(0, ".", e);
}
function F(c) {
C.ajax.post("sync", s, function(n) {
var t = [], o = n.pot, e = n.po, a = n.done || {
add: [],
del: [],
fuz: []
}, i = a.add.length, r = a.del.length, l = a.fuz.length, s = a.trn || 0;
b.clear().load(e), D.load(b), i || r || l || s ? (o ? t.push(m(N("Merged from %s"), o)) : t.push(N("Merged from source code")), 
i && t.push(m(O("%s new string added", "%s new strings added", i), A(i))), r && t.push(m(O("%s obsolete string removed", "%s obsolete strings removed", r), A(r))), 
l && t.push(m(O("%s string marked Fuzzy", "%s strings marked Fuzzy", l), A(l))), 
s && t.push(m(O("%s translation copied", "%s translations copied", s), A(s))), S(u).trigger("poUnsaved", []), 
V(), d && k.console && function(n, t) {
var o = -1, e = t.add.length;
for (;++o < e; ) n.log(" + " + String(t.add[o]));
for (e = t.del.length, o = 0; o < e; o++) n.log(" - " + String(t.del[o]));
for (e = t.fuz.length, o = 0; o < e; o++) n.log(" ~ " + String(t.fuz[o]));
}(console, a)) : o ? t.push(m(N("Strings up to date with %s"), o)) : t.push(N("Strings up to date with source code")), 
C.notices.success(t.join(". ")), S(u).trigger("poMerge", [ n ]), c && c();
}, c);
}
function $() {
return n = n || function() {
for (var n, t = -1, o = [], e = r, a = e.length; ++t < a; ) try {
n = e[t], o.push(C.apis.create(n));
} catch (n) {
C.notices.error(String(n));
}
return o;
}();
}
function R(t) {
var o;
function e() {
return new Date().getTime();
}
p || I ? C.notices.error("Logic error. APIs not available in current mode") : null == r || 0 === r.length || 10 < Math.round((e() - E) / 1e3) ? (a && a.remove(), 
a = null, h && h.remove(), h = null, z && z.remove(), r = z = null, o = S('<div><div class="loco-loading"></div></div>').dialog({
dialogClass: "loco-modal loco-modal-no-close",
appendTo: "#loco-admin.wrap",
title: "Loading..",
modal: !0,
autoOpen: !0,
closeOnEscape: !1,
resizable: !1,
draggable: !1,
position: L,
height: 200
}), C.ajax.get("apis", {
locale: String(T)
}, function(n) {
E = e(), 0 === (r = n && n.apis || []).length ? a = _("loco-apis-empty", n.html) : h = _("loco-apis-batch", n.html), 
o.remove(), t(r);
})) : (E = e(), t(r));
}
function _(n, t) {
var o = S(t);
return o.attr("id", n), o.dialog({
dialogClass: "loco-modal",
appendTo: "#loco-admin.wrap",
title: o.attr("title"),
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
draggable: !1,
position: L
}), o;
}
function H() {
R(function(n) {
n.length ? function() {
var n = D.current(), t = D.getTargetOffset(), o = n && n.source(null, t), p = 'lang="' + String(T) + '" dir="' + (T.isRTL() ? "RTL" : "LTR") + '"', f = 99;
if (!o) return;
function e(n) {
return !n.isDefaultPrevented() && (!(0 <= (t = n.which - 49) && t < 10 && (o = v && v.find("button.button-primary").eq(t)) && 1 === o.length) || (n.preventDefault(), 
n.stopPropagation(), o.click(), !1));
var t, o;
}
function a(n, t, o, e) {
var a = e.getId(), i = w[a], r = String(i + 1), l = e.getUrl(), s = N("Use this translation"), c = String(e), u = b && b[a], d = S('<button class="button button-primary"></button>').attr("tabindex", String(1 + f + i)).on("click", function(e, a) {
return function(n) {
n.preventDefault(), n.stopPropagation(), g();
var t = D.current(), o = D.getTargetOffset();
t && t.source(null, o) === e ? (t.translate(a, o), D.focus().reloadMessage(t)) : C.notices.warn("Source changed since suggestion");
};
}(n, t));
d.attr("accesskey", r), 1 < h.length && (s += " (" + r + ")"), d.text(s), u && u.replaceWith(S('<div class="loco-api loco-api-' + a + '"></div>').append(S('<a class="loco-api-credit" target="_blank" tabindex="-1"></a>').attr("href", l).text(c)).append(S("<blockquote " + p + "></blockquote>").text(t || "FAILED")).append(d)), 
++y === m && (v && v.dialog("option", "title", N("Suggested translations") + " — " + o.label), 
f += y), 0 === i && d.focus();
}
function g(n) {
v && null == n && v.dialog("close"), b = v = null, S(k).off("keydown", e);
}
function i(e) {
return function(n, t, o) {
a(n, u[e.getId()] = t, o, e);
};
}
var v = (z = z || _("loco-apis-hint", "<div></div>")).html("").append(S('<div class="loco-api"><p>Source text:</p></div>').append(S('<blockquote lang="en"></blockquote>').text(o))).dialog("option", "title", N("Loading suggestions") + "...").off("dialogclose").on("dialogclose", g).dialog("open"), r = n.translation(t);
r && S('<div class="loco-api"><p>Current translation:</p></div>').append(S("<blockquote " + p + "></blockquote>").text(r)).append(S('<button class="button"></button>').attr("tabindex", String(++f)).text(N("Keep this translation")).on("click", function(n) {
n.preventDefault(), g();
})).appendTo(v);
var l, s, h = $(), m = h.length, c = -1, u = M[o] || (M[o] = {}), b = {}, y = 0, w = {};
for (;++c < m; ) l = h[c], v.append((d = l, void 0, x = S('<div class="loco-api loco-api-loading"></div>').text("Calling " + d + " ..."), 
b[d.getId()] = x)), s = l.getId(), w[s] = c, u[s] ? a(o, u[s], T, l) : l.translate(o, T, i(l));
var d, x;
S(k).on("keydown", e);
}() : Y();
});
}
function W(n) {
return n.preventDefault(), R(function(n) {
n.length ? function() {
var e, a, i, r = 0, t = !1, l = h.dialog("open"), n = l.find("form"), s = n.find("button.button-primary"), o = S("#loco-job-progress");
function c() {
s[0].disabled = !0;
}
function u() {
s.removeClass("loco-loading");
}
function d(n) {
o.text(n);
}
function p(n) {
var t = function(n) {
for (var t, o = $(), e = o.length, a = -1; ++a < e; ) if ((t = o[a]).getId() === n) return t;
C.notices.error("No " + n + " client");
}(S(n.api).val()), o = n.existing.checked;
d("Calculating...."), (e = t.createJob()).init(b, o), a = t.toString(), d(m(N("%s unique source strings."), A(e.length)) + " " + m(N("%s characters will be sent for translation."), A(e.chars))), 
e.length ? s[0].disabled = !1 : c(), i = null;
}
function f(n) {
e && (t && n.fuzzy(0, !0), D.pasteMessage(n), n === D.active && D.setStatus(n), 
D.unsave(n, 0), r++);
}
function g(n, t) {
var o = t ? 100 * n / t : 0;
d(m(N("Translation progress %s%%"), A(o)));
}
function v() {
if (u(), e && i) {
var n = i.todo();
n && C.notices.warn(m(O("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", n), A(n))).slow();
var t = [], o = i.did();
o && t.push(m(O("%1$s string translated via %2$s", "%1$s strings translated via %2$s", o), A(o), a)), 
r ? t.push(m(O("%s string updated", "%s strings updated", r), A(r))) : t.push(N("Nothing needed updating")), 
C.notices.success(t.join(". ")).slow(), i = e = null;
}
r && (V(), D.rebuildSearch()), l && (l.off("dialogclose").dialog("close"), l = null), 
D.fire("poAuto");
}
u(), c(), C.notices.clear(), n.off("submit change"), p(n[0]), n.on("change", function(n) {
var t = n.target, o = t.name;
return "api" !== o && "existing" !== o || p(t.form), !0;
}).on("submit", function(n) {
n.preventDefault(), s.addClass("loco-loading"), c(), g(r = 0), t = n.target.fuzzy.checked, 
i = e.dispatch().done(v).each(f).prog(g).stat();
}), l.off("dialogclose").on("dialogclose", function() {
e.abort(), l = null, v();
});
}() : Y();
}), !1;
}
function Y() {
a ? a.dialog("open") : C.notices.error("Logic error. Unconfigured API modal missing");
}
function G(t) {
var n = S.extend({
locale: String(b.locale() || "")
}, c || {});
x && x.applyCreds(n), o ? (n = function(n) {
var t, o = new FormData();
for (t in n) n.hasOwnProperty(t) && o.append(t, n[t]);
return o;
}(n)).append("po", new Blob([ String(b) ], {
type: "application/x-gettext"
}), String(n.path).split("/").pop() || "untitled.po") : n.data = String(b), C.ajax.post("save", n, function(n) {
t && t(), D.save(!0), S("#loco-po-modified").text(n.datetime || "[datetime error]");
}, t);
}
function J() {
return N("Your changes will be lost if you continue without saving");
}
function K(o, e) {
return o.disabled = !1, S(o).on("click", function() {
var n = o.form, t = g;
return "binary" === e && (t = t.replace(/\.po$/, ".mo")), n.path.value = t, n.source.value = b.toString(), 
!0;
}), !0;
}
function Q(n) {
return n.preventDefault(), !1;
}
function V() {
var n = D.stats(), t = n.t, o = n.f, e = n.u, a = m(O("%s string", "%s strings", t), A(t)), i = [];
T && (a = m(N("%s%% translated"), n.p.replace("%", "")) + ", " + a, o && i.push(m(N("%s fuzzy"), A(o))), 
e && i.push(m(N("%s untranslated"), A(e))), i.length && (a += " (" + i.join(", ") + ")")), 
S("#loco-po-status").text(a);
}
}(window, window.jQuery);
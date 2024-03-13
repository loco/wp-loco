"use strict";

!function(F, d) {
function t(a) {
return k.l10n._(a);
}
function G(a, b, c) {
return k.l10n.n(a, b, c);
}
function y(a) {
return a.format(0, ".", Ba);
}
function Ca(a) {
k.ajax.post("sync", ia, function(b) {
const c = [];
var f = b.pot, g = b.po;
const r = b.done || {
add: [],
del: [],
fuz: []
};
var n = r.add.length;
const u = r.del.length, z = r.fuz.length, B = r.trn || 0;
C.clear().load(g);
h.load(C);
Y(h);
if (n || u || z || B) {
if (f ? c.push(v(t("Merged from %s"), f)) : c.push(t("Merged from source code")), 
n && c.push(v(G("%s new string added", "%s new strings added", n), y(n))), u && c.push(v(G("%s obsolete string removed", "%s obsolete strings removed", u), y(u))), 
z && c.push(v(G("%s string marked Fuzzy", "%s strings marked Fuzzy", z), y(z))), 
B && c.push(v(G("%s translation copied", "%s translations copied", B), y(B))), d(H).trigger("poUnsaved", []), 
R(), Da && F.console) {
f = console;
g = -1;
for (n = r.add.length; ++g < n; ) f.log(" + " + String(r.add[g]));
n = r.del.length;
for (g = 0; g < n; g++) f.log(" - " + String(r.del[g]));
n = r.fuz.length;
for (g = 0; g < n; g++) f.log(" ~ " + String(r.fuz[g]));
}
} else f ? c.push(v(t("Strings up to date with %s"), f)) : c.push(t("Strings up to date with source code"));
k.notices.success(c.join(". "));
d(H).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function Ea(a) {
const b = a.currentTarget;
a.stopImmediatePropagation();
b.disabled = !0;
ja();
b.disabled = !1;
}
function ja() {
const a = [];
C.each(function(b, c) {
h.validate(c) && a.push(c);
});
k.notices.clear();
ka(a);
}
function Y(a) {
a.invalid && (ka(a.invalid), a.invalid = null);
}
function ka(a) {
const b = a.length;
if (0 === b) k.notices.success(t("No formatting errors detected")); else {
const c = [ v(G("%s possible error detected", "%s possible errors detected", b), b), t("Check the translations marked with a warning sign") ];
k.notices.warn(c.join(". ")).slow();
}
0 < b && h.current(a[0]);
}
function Fa(a) {
const b = a.id, c = k.apis, f = c.providers();
return c.create(a, f[b] || f._);
}
function la() {
for (var a = -1, b, c = [], f = K, g = f.length, r = String(Ga); ++a < g; ) try {
b = f[a], null == b.src && (b.src = r), c.push(Fa(b));
} catch (n) {
k.notices.error(String(n));
}
return c;
}
function ma(a) {
function b(f) {
Z = new Date().getTime();
K = f && f.apis || [];
0 === K.length ? N = aa("loco-apis-empty", f.html) : S = aa("loco-apis-batch", f.html);
c.remove();
a(K);
}
if (W || na) k.notices.error("APIs not available in current mode"); else if (null == K || 0 === K.length || 10 < Math.round((new Date().getTime() - Z) / 1e3)) {
N && N.remove();
N = null;
S && S.remove();
S = null;
T && T.remove();
K = T = null;
var c = d('<div><div class="loco-loading"></div></div>').dialog({
dialogClass: "loco-modal loco-modal-no-close",
appendTo: "#loco-admin.wrap",
title: "Loading..",
modal: !0,
autoOpen: !0,
closeOnEscape: !1,
resizable: !1,
draggable: !1,
position: oa,
height: 200
});
k.ajax.get("apis", {
locale: String(D)
}, b);
} else Z = new Date().getTime(), a(K);
}
function aa(a, b) {
b = d(b);
b.attr("id", a);
b.dialog({
dialogClass: "loco-modal",
appendTo: "#loco-admin.wrap",
title: b.attr("title"),
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
draggable: !1,
position: oa
});
return b;
}
function pa() {
ma(function(a) {
a.length ? Ha() : qa();
});
}
function Ia(a) {
a.preventDefault();
ma(function(b) {
b.length ? Ja() : qa();
});
return !1;
}
function qa() {
N ? N.dialog("open") : k.notices.error("Logic error. Unconfigured API modal missing");
}
function Ja() {
function a(e) {
a: {
var q = d(e.api).val();
for (var O, L = X || (X = la()), P = L.length, Q = -1; ++Q < P; ) if (O = L[Q], 
O.getId() === q) {
q = O;
break a;
}
k.notices.error("No " + q + " client");
q = void 0;
}
e = e.existing.checked;
M.text("Calculating....");
g = k.apis.createJob(q);
g.init(C, e);
r = q.toString();
M.text(v(t("%s unique source strings."), y(g.length)) + " " + v(t("%s characters will be sent for translation."), y(g.chars)));
E[0].disabled = g.length ? !1 : !0;
n = null;
}
function b(e) {
g && (B && e.fuzzy(0, !0), h.pasteMessage(e), e === h.active && h.setStatus(e), 
h.unsave(e, 0), u++, z && !e.valid() && (z = !1));
}
function c(e, q) {
e = q ? 100 * e / q : 0;
M.text(v(t("Translation progress %s%%"), y(e)));
}
function f() {
E.removeClass("loco-loading");
if (g && n) {
var e = n.todo();
e && k.notices.warn(v(G("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", e), y(e))).slow();
e = [];
const q = n.did();
q && e.push(v(G("%1$s string translated via %2$s", "%1$s strings translated via %2$s", q), y(q), r));
u ? e.push(v(G("%s string updated", "%s strings updated", u), y(u))) : q && e.push(t("Nothing needed updating"));
e.length && k.notices.success(e.join(". ")).slow();
n = g = null;
}
u && (R(), h.rebuildSearch());
I && (I.off("dialogclose").dialog("close"), I = null);
h.fire("poAuto");
z || ja();
}
let g, r, n, u = 0, z = !0, B = !1, I = S.dialog("open");
const x = I.find("form"), E = x.find("button.button-primary"), M = d("#loco-job-progress");
E.removeClass("loco-loading");
E[0].disabled = !0;
k.notices.clear();
x.off("submit change");
a(x[0]);
x.on("change", function(e) {
e = e.target;
const q = e.name;
"api" !== q && "existing" !== q || a(e.form);
return !0;
}).on("submit", function(e) {
e.preventDefault();
E.addClass("loco-loading");
E[0].disabled = !0;
u = 0;
c(0);
B = e.target.fuzzy.checked;
n = g.dispatch().done(f).each(b).prog(c).stat();
});
I.off("dialogclose").on("dialogclose", function() {
g.abort();
I = null;
f();
});
}
function Ha() {
function a(l) {
if (l.isDefaultPrevented()) return !1;
var p = l.which;
let m = -1;
49 <= p && 57 >= p ? m = p - 49 : 97 <= p && 105 >= p && (m = p - 97);
return 0 <= m && 9 > m && (p = e && e.find("button.button-primary").eq(m)) && 1 === p.length ? (p.click(), 
l.preventDefault(), l.stopPropagation(), !1) : !0;
}
function b(l, p) {
return function(m) {
m.preventDefault();
m.stopPropagation();
g();
m = h.current();
const A = h.getTargetOffset();
m.translate(p, A);
h.focus().reloadMessage(m);
};
}
function c(l, p, m, A) {
let ba = A.getId(), ca = P[ba], ra = String(ca + 1), Ka = A.getUrl(), sa = t("Use this translation");
A = String(A);
let ta = U && U[ba];
l = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + M + ca)).on("click", b(l, p));
l.attr("accesskey", ra);
1 < q.length && (sa += " (" + ra + ")");
l.text(sa);
ta && ta.replaceWith(d('<div class="loco-api loco-api-result loco-api-' + ba + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Ka).text(A))).append(d("<blockquote " + I + "></blockquote>").text(p || "FAILED")).append(l));
++Q === O && (e && e.dialog("option", "title", t("Suggested translations") + " — " + m.label), 
M += Q, x.attr("disabled") && x.attr("disabled", !1));
0 === ca && l.focus();
}
function f(l) {
const p = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + l + " ...");
return U[l.getId()] = p;
}
function g(l) {
e && null == l && e.dialog("close");
U = P = e = null;
d(F).off("keydown", a);
}
function r(l) {
return function(p, m, A) {
L[l.getId()] = m;
c(p, m, A, l);
};
}
function n(l) {
L = ua[l] || (ua[l] = {});
let p = -1;
for (;++p < O; ) {
const m = q[p], A = m.getId();
e.append(f(m));
P[A] = p;
L[A] ? c(l, L[A], D, m) : m.translate(l, D, r(m));
}
}
const u = h.current();
if (!u) return !1;
var z = u.pluralized();
const B = z ? Math.min(h.getTargetOffset(), 1) : 0, I = 'lang="' + String(D) + '" dir="' + (D.isRTL() ? "RTL" : "LTR") + '"';
let x, E = u.source(null, B);
z ? (x = d('<select lang="en" name="s" disabled></select>'), u.eachSrc(function(l, p) {
var m = h.t();
m = l ? m._x("Plural", "Editor") : m._x("Single", "Editor");
m = d("<optgroup></optgroup>").attr("label", m);
x.append(m.append(d("<option></option>").attr("value", String(l)).text(p)));
}), x.val(String(B)), x.on("change", function(l) {
e.find("div.loco-api-result").remove();
U = {};
P = {};
Q = 0;
E = u.source(null, l.target.selectedIndex);
x.attr("disabled", "true");
n(E);
})) : x = d('<blockquote lang="en"></blockquote>').text(E);
let M = 99, e = (T || (T = aa("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(x)).dialog("option", "title", t("Loading suggestions") + "...").off("dialogclose").on("dialogclose", g).dialog("open");
(z = u.translation(B)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + I + "></blockquote>").text(z)).append(d('<button class="button"></button>').attr("tabindex", String(++M)).text(t("Keep this translation")).on("click", function(l) {
l.preventDefault();
g();
})).appendTo(e);
const q = X || (X = la()), O = q.length;
let L, P = {}, Q = 0, U = {};
n(E);
d(F).on("keydown", a);
return !0;
}
function La(a) {
const b = new FormData();
for (const c in a) a.hasOwnProperty(c) && b.append(c, a[c]);
return b;
}
function va(a) {
let b = d.extend({
locale: String(C.locale() || "")
}, wa || {});
xa && xa.applyCreds(b);
da ? (b = La(b), b.append("po", new Blob([ String(C) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(C);
k.ajax.post("save", b, function(c) {
a && a();
h.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
Y(h);
}, a);
}
function Ma() {
h.dirty && va();
}
function Na() {
return t("Your changes will be lost if you continue without saving");
}
function Oa(a) {
function b() {
a.disabled = !1;
d(a).removeClass("loco-loading");
}
h.on("poUnsaved", function() {
a.disabled = !1;
d(a).addClass("button-primary");
}).on("poSave", function() {
a.disabled = !0;
d(a).removeClass("button-primary");
});
wa = d.extend({
path: ea
}, w.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
va(b);
return !1;
});
return !0;
}
function Pa(a) {
var b = w.project;
if (b) {
var c = function() {
a.disabled = !1;
d(a).removeClass("loco-loading");
};
h.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave", function() {
a.disabled = !1;
});
ia = {
bundle: b.bundle,
domain: b.domain,
type: W ? "pot" : "po",
path: ea || "",
sync: Qa || "",
mode: Ra || ""
};
d(a).on("click", function(f) {
f.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
Ca(c);
return !1;
});
a.disabled = !1;
}
return !0;
}
function Sa(a) {
h.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave poAuto", function() {
a.disabled = !1;
});
d(a).on("click", Ia);
a.disabled = !1;
return !0;
}
function Ta(a) {
d(a).on("click", Ea);
a.disabled = !1;
}
function Ua(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
b = 1;
var c, f = /(\d+)$/;
for (c = "New message"; C.get(c); ) b = f.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
h.add(c);
return !1;
});
return !0;
}
function Va(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
h.del();
return !1;
});
return !0;
}
function ya(a, b) {
a.disabled = !1;
d(a).on("click", function() {
var c = a.form, f = ea;
"binary" === b && (f = f.replace(/\.po$/, ".mo"));
c.path.value = f;
c.source.value = C.toString();
return !0;
});
return !0;
}
function fa(a) {
a.preventDefault();
return !1;
}
function R() {
var a = h.stats(), b = a.t, c = a.f, f = a.u;
b = v(G("%s string", "%s strings", b), y(b));
var g = [];
D && (b = v(t("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && g.push(v(t("%s fuzzy"), y(c))), 
f && g.push(v(t("%s untranslated"), y(f))), g.length && (b += " (" + g.join(", ") + ")"));
d("#loco-po-status").text(b);
}
function za(a, b) {
a = b.getAttribute("data-loco");
const c = V[a];
c && c(b, a) || d(b).addClass("loco-noop");
}
const k = F.loco, w = k && k.conf, H = document.getElementById("loco-editor-inner");
if (k && w && H) {
var Da = !!w.WP_DEBUG, ha = k.po.ref && k.po.ref.init(k, w), ia = null, wa = null, da = w.multipart, Wa = k.l10n, v = k.string.sprintf, Ba = w.wpnum && w.wpnum.thousands_sep || ",", D = w.locale, C = k.po.init(D).wrap(w.powrap), W = !D, Ga = k.locale.clone(w.source || {
lang: "en"
}), Xa = document.getElementById("loco-actions"), ea = w.popath, Qa = w.potpath, Ra = w.syncmode, J = document.getElementById("loco-fs"), xa = J && k.fs.init(J), na = w.readonly;
J = !na;
var K, X, ua = {}, T, S, N, Z = 0, oa = {
my: "top",
at: "top",
of: "#loco-content"
};
!da || F.FormData && F.Blob || (da = !1, k.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
ha || k.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var Aa = function() {
var a, b = parseInt(d(H).css("min-height") || 0);
return function() {
for (var c = H, f = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) f += c.offsetTop || 0;
c = Math.max(b, F.innerHeight - f - 20);
a !== c && (H.style.height = String(c) + "px", a = c);
};
}();
Aa();
d(F).resize(Aa);
H.innerHTML = "";
var h = k.po.ed.init(H).localise(Wa);
k.po.kbd.init(h).add("save", J ? Ma : fa).add("hint", D && J && pa || fa).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var V = {
save: J && Oa,
sync: J && Pa,
revert: function(a) {
h.on("poUnsaved", function() {
a.disabled = !1;
}).on("poSave", function() {
a.disabled = !0;
});
d(a).on("click", function(b) {
b.preventDefault();
location.reload();
return !1;
});
return !0;
},
invs: function(a) {
var b = d(a);
a.disabled = !1;
h.on("poInvs", function(c, f) {
b[f ? "addClass" : "removeClass"]("inverted");
});
b.on("click", function(c) {
c.preventDefault();
h.setInvs(!h.getInvs());
return !1;
});
k.tooltip.init(b);
return !0;
},
code: function(a) {
var b = d(a);
a.disabled = !1;
b.on("click", function(c) {
c.preventDefault();
c = !h.getMono();
b[c ? "addClass" : "removeClass"]("inverted");
h.setMono(c);
return !1;
});
k.tooltip.init(b);
return !0;
},
source: ya,
binary: W ? null : ya
};
W ? (V.add = J && Ua, V.del = J && Va) : (V.auto = Sa, V.lint = Ta);
d("#loco-editor > nav .button").each(za);
d("#loco-content > form .button").each(za);
d(Xa).on("submit", fa);
(function(a) {
function b(g) {
d(a.parentNode)[g || null == g ? "removeClass" : "addClass"]("invalid");
}
h.searchable(k.fulltext.init());
a.disabled = !1;
var c = a.value = "", f = k.watchtext(a, function(g) {
g = h.filter(g, !0);
b(g);
});
h.on("poFilter", function(g, r, n) {
c = f.val();
f.val(r || "");
b(n);
}).on("poMerge", function() {
c && h.filter(c);
});
})(document.getElementById("loco-search"));
h.on("poUnsaved", function() {
F.onbeforeunload = Na;
}).on("poSave", function() {
R();
F.onbeforeunload = null;
}).on("poHint", pa).on("poUpdate", R).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && ha ? (ha.load(b.textContent), a.preventDefault(), !1) : !0;
});
C.load(w.podata);
h.load(C);
(D = h.targetLocale) ? D.isRTL() && d(H).addClass("trg-rtl") : h.unlock();
R();
Y(h);
delete k.conf;
}
}(window, window.jQuery);
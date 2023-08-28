"use strict";

!function(E, d) {
function t(a) {
return h.l10n._(a);
}
function F(a, b, c) {
return h.l10n.n(a, b, c);
}
function z(a) {
return a.format(0, ".", Ba);
}
function Ca(a) {
h.ajax.post("sync", ha, function(b) {
const c = [];
var e = b.pot, f = b.po;
const r = b.done || {
add: [],
del: [],
fuz: []
};
var p = r.add.length;
const u = r.del.length, B = r.fuz.length, y = r.trn || 0;
C.clear().load(f);
g.load(C);
ia(g);
if (p || u || B || y) {
if (e ? c.push(v(t("Merged from %s"), e)) : c.push(t("Merged from source code")), 
p && c.push(v(F("%s new string added", "%s new strings added", p), z(p))), u && c.push(v(F("%s obsolete string removed", "%s obsolete strings removed", u), z(u))), 
B && c.push(v(F("%s string marked Fuzzy", "%s strings marked Fuzzy", B), z(B))), 
y && c.push(v(F("%s translation copied", "%s translations copied", y), z(y))), d(G).trigger("poUnsaved", []), 
P(), Da && E.console) {
e = console;
f = -1;
for (p = r.add.length; ++f < p; ) e.log(" + " + String(r.add[f]));
p = r.del.length;
for (f = 0; f < p; f++) e.log(" - " + String(r.del[f]));
p = r.fuz.length;
for (f = 0; f < p; f++) e.log(" ~ " + String(r.fuz[f]));
}
} else e ? c.push(v(t("Strings up to date with %s"), e)) : c.push(t("Strings up to date with source code"));
h.notices.success(c.join(". "));
d(G).trigger("poMerge", [ b ]);
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
g.validate(c) && a.push(c);
});
h.notices.clear();
ka(a);
}
function ia(a) {
a.invalid && (ka(a.invalid), a.invalid = null);
}
function ka(a) {
const b = a.length;
if (0 === b) h.notices.success(t("No formatting errors detected")); else {
const c = [ v(F("%s possible error detected", "%s possible errors detected", b), b), t("Check the translations marked with a warning sign") ];
h.notices.warn(c.join(". ")).slow();
}
0 < b && g.current(a[0]);
}
function Fa(a) {
const b = a.id, c = h.apis, e = c.providers();
return c.create(a, e[b] || e._);
}
function la() {
for (var a = -1, b, c = [], e = I, f = e.length, r = String(Ga); ++a < f; ) try {
b = e[a], null == b.src && (b.src = r), c.push(Fa(b));
} catch (p) {
h.notices.error(String(p));
}
return c;
}
function ma(a) {
function b(e) {
X = new Date().getTime();
I = e && e.apis || [];
0 === I.length ? N = Y("loco-apis-empty", e.html) : Q = Y("loco-apis-batch", e.html);
c.remove();
a(I);
}
if (V || na) h.notices.error("APIs not available in current mode"); else if (null == I || 0 === I.length || 10 < Math.round((new Date().getTime() - X) / 1e3)) {
N && N.remove();
N = null;
Q && Q.remove();
Q = null;
R && R.remove();
I = R = null;
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
h.ajax.get("apis", {
locale: String(D)
}, b);
} else X = new Date().getTime(), a(I);
}
function Y(a, b) {
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
N ? N.dialog("open") : h.notices.error("Logic error. Unconfigured API modal missing");
}
function Ja() {
function a(k) {
a: {
var m = d(k.api).val();
for (var K, S = W || (W = la()), O = S.length, L = -1; ++L < O; ) if (K = S[L], 
K.getId() === m) {
m = K;
break a;
}
h.notices.error("No " + m + " client");
m = void 0;
}
k = k.existing.checked;
J.text("Calculating....");
f = h.apis.createJob(m);
f.init(C, k);
r = m.toString();
J.text(v(t("%s unique source strings."), z(f.length)) + " " + v(t("%s characters will be sent for translation."), z(f.chars)));
w[0].disabled = f.length ? !1 : !0;
p = null;
}
function b(k) {
f && (B && k.fuzzy(0, !0), g.pasteMessage(k), k === g.active && g.setStatus(k), 
g.unsave(k, 0), u++);
}
function c(k, m) {
k = m ? 100 * k / m : 0;
J.text(v(t("Translation progress %s%%"), z(k)));
}
function e() {
w.removeClass("loco-loading");
if (f && p) {
var k = p.todo();
k && h.notices.warn(v(F("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", k), z(k))).slow();
k = [];
var m = p.did();
m && k.push(v(F("%1$s string translated via %2$s", "%1$s strings translated via %2$s", m), z(m), r));
u ? k.push(v(F("%s string updated", "%s strings updated", u), z(u))) : m && k.push(t("Nothing needed updating"));
k.length && h.notices.success(k.join(". ")).slow();
p = f = null;
}
u && (P(), g.rebuildSearch());
y && (y.off("dialogclose").dialog("close"), y = null);
g.fire("poAuto");
ja();
}
var f, r, p, u = 0, B = !1, y = Q.dialog("open"), M = y.find("form"), w = M.find("button.button-primary"), J = d("#loco-job-progress");
w.removeClass("loco-loading");
w[0].disabled = !0;
h.notices.clear();
M.off("submit change");
a(M[0]);
M.on("change", function(k) {
k = k.target;
var m = k.name;
"api" !== m && "existing" !== m || a(k.form);
return !0;
}).on("submit", function(k) {
k.preventDefault();
w.addClass("loco-loading");
w[0].disabled = !0;
u = 0;
c(0);
B = k.target.fuzzy.checked;
p = f.dispatch().done(e).each(b).prog(c).stat();
});
y.off("dialogclose").on("dialogclose", function() {
f.abort();
y = null;
e();
});
}
function Ha() {
function a(l) {
if (l.isDefaultPrevented()) return !1;
var q = l.which;
let n = -1;
49 <= q && 57 >= q ? n = q - 49 : 97 <= q && 105 >= q && (n = q - 97);
return 0 <= n && 9 > n && (q = m && m.find("button.button-primary").eq(n)) && 1 === q.length ? (q.click(), 
l.preventDefault(), l.stopPropagation(), !1) : !0;
}
function b(l, q) {
return function(n) {
n.preventDefault();
n.stopPropagation();
f();
n = g.current();
const A = g.getTargetOffset();
n.translate(q, A);
g.focus().reloadMessage(n);
};
}
function c(l, q, n, A) {
let Z = A.getId(), aa = L[Z], ra = String(aa + 1), Ka = A.getUrl(), sa = t("Use this translation");
A = String(A);
let ta = T && T[Z];
l = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + k + aa)).on("click", b(l, q));
l.attr("accesskey", ra);
1 < K.length && (sa += " (" + ra + ")");
l.text(sa);
ta && ta.replaceWith(d('<div class="loco-api loco-api-result loco-api-' + Z + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Ka).text(A))).append(d("<blockquote " + M + "></blockquote>").text(q || "FAILED")).append(l));
++ba === S && (m && m.dialog("option", "title", t("Suggested translations") + " — " + n.label), 
k += ba, w.attr("disabled") && w.attr("disabled", !1));
0 === aa && l.focus();
}
function e(l) {
const q = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + l + " ...");
return T[l.getId()] = q;
}
function f(l) {
m && null == l && m.dialog("close");
T = L = m = null;
d(E).off("keydown", a);
}
function r(l) {
return function(q, n, A) {
O[l.getId()] = n;
c(q, n, A, l);
};
}
function p(l) {
O = ua[l] || (ua[l] = {});
let q = -1;
for (;++q < S; ) {
const n = K[q], A = n.getId();
m.append(e(n));
L[A] = q;
O[A] ? c(l, O[A], D, n) : n.translate(l, D, r(n));
}
}
const u = g.current();
if (!u) return !1;
var B = u.pluralized();
const y = B ? Math.min(g.getTargetOffset(), 1) : 0, M = 'lang="' + String(D) + '" dir="' + (D.isRTL() ? "RTL" : "LTR") + '"';
let w, J = u.source(null, y);
B ? (w = d('<select lang="en" name="s" disabled></select>'), u.eachSrc(function(l, q) {
var n = l ? g.t()._x("Plural", "Editor") : g.t()._x("Single", "Editor");
n = d("<optgroup></optgroup>").attr("label", n);
w.append(n.append(d("<option></option>").attr("value", String(l)).text(q)));
}), w.val(String(y)), w.on("change", function(l) {
m.find("div.loco-api-result").remove();
T = {};
L = {};
ba = 0;
J = u.source(null, l.target.selectedIndex);
w.attr("disabled", "true");
p(J);
})) : w = d('<blockquote lang="en"></blockquote>').text(J);
let k = 99, m = (R || (R = Y("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(w)).dialog("option", "title", t("Loading suggestions") + "...").off("dialogclose").on("dialogclose", f).dialog("open");
(B = u.translation(y)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + M + "></blockquote>").text(B)).append(d('<button class="button"></button>').attr("tabindex", String(++k)).text(t("Keep this translation")).on("click", function(l) {
l.preventDefault();
f();
})).appendTo(m);
const K = W || (W = la()), S = K.length;
let O, L = {}, ba = 0, T = {};
p(J);
d(E).on("keydown", a);
return !0;
}
function La(a) {
var b, c = new FormData();
for (b in a) a.hasOwnProperty(b) && c.append(b, a[b]);
return c;
}
function va(a) {
var b = d.extend({
locale: String(C.locale() || "")
}, wa || {});
xa && xa.applyCreds(b);
ca ? (b = La(b), b.append("po", new Blob([ String(C) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(C);
h.ajax.post("save", b, function(c) {
a && a();
g.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
}, a);
}
function Ma() {
g.dirty && va();
}
function Na() {
return t("Your changes will be lost if you continue without saving");
}
function Oa(a) {
function b() {
a.disabled = !1;
d(a).removeClass("loco-loading");
}
g.on("poUnsaved", function() {
a.disabled = !1;
d(a).addClass("button-primary");
}).on("poSave", function() {
a.disabled = !0;
d(a).removeClass("button-primary");
});
wa = d.extend({
path: da
}, x.project || {});
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
var b = x.project;
if (b) {
var c = function() {
a.disabled = !1;
d(a).removeClass("loco-loading");
};
g.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave", function() {
a.disabled = !1;
});
ha = {
bundle: b.bundle,
domain: b.domain,
type: V ? "pot" : "po",
path: da || "",
sync: Qa || "",
mode: Ra || ""
};
d(a).on("click", function(e) {
e.preventDefault();
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
g.on("poUnsaved", function() {
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
var c, e = /(\d+)$/;
for (c = "New message"; C.get(c); ) b = e.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
g.add(c);
return !1;
});
return !0;
}
function Va(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
g.del();
return !1;
});
return !0;
}
function ya(a, b) {
a.disabled = !1;
d(a).on("click", function() {
var c = a.form, e = da;
"binary" === b && (e = e.replace(/\.po$/, ".mo"));
c.path.value = e;
c.source.value = C.toString();
return !0;
});
return !0;
}
function ea(a) {
a.preventDefault();
return !1;
}
function P() {
var a = g.stats(), b = a.t, c = a.f, e = a.u;
b = v(F("%s string", "%s strings", b), z(b));
var f = [];
D && (b = v(t("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && f.push(v(t("%s fuzzy"), z(c))), 
e && f.push(v(t("%s untranslated"), z(e))), f.length && (b += " (" + f.join(", ") + ")"));
d("#loco-po-status").text(b);
}
function za(a, b) {
a = b.getAttribute("data-loco");
const c = U[a];
c && c(b, a) || d(b).addClass("loco-noop");
}
const h = E.loco, x = h && h.conf, G = document.getElementById("loco-editor-inner");
if (h && x && G) {
var Da = !!x.WP_DEBUG, fa = h.po.ref && h.po.ref.init(h, x), ha = null, wa = null, ca = x.multipart, Wa = h.l10n, v = h.string.sprintf, Ba = x.wpnum && x.wpnum.thousands_sep || ",", D = x.locale, C = h.po.init(D).wrap(x.powrap), V = !D, Ga = h.locale.clone(x.source || {
lang: "en"
}), Xa = document.getElementById("loco-actions"), da = x.popath, Qa = x.potpath, Ra = x.syncmode, H = document.getElementById("loco-fs"), xa = H && h.fs.init(H), na = x.readonly;
H = !na;
var I, W, ua = {}, R, Q, N, X = 0, oa = {
my: "top",
at: "top",
of: "#loco-content"
};
!ca || E.FormData && E.Blob || (ca = !1, h.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
fa || h.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var Aa = function() {
var a, b = parseInt(d(G).css("min-height") || 0);
return function() {
for (var c = G, e = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) e += c.offsetTop || 0;
c = Math.max(b, E.innerHeight - e - 20);
a !== c && (G.style.height = String(c) + "px", a = c);
};
}();
Aa();
d(E).resize(Aa);
G.innerHTML = "";
var g = h.po.ed.init(G).localise(Wa);
h.po.kbd.init(g).add("save", H ? Ma : ea).add("hint", D && H && pa || ea).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var U = {
save: H && Oa,
sync: H && Pa,
revert: function(a) {
g.on("poUnsaved", function() {
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
g.on("poInvs", function(c, e) {
b[e ? "addClass" : "removeClass"]("inverted");
});
b.on("click", function(c) {
c.preventDefault();
g.setInvs(!g.getInvs());
return !1;
});
h.tooltip.init(b);
return !0;
},
code: function(a) {
var b = d(a);
a.disabled = !1;
b.on("click", function(c) {
c.preventDefault();
c = !g.getMono();
b[c ? "addClass" : "removeClass"]("inverted");
g.setMono(c);
return !1;
});
h.tooltip.init(b);
return !0;
},
source: ya,
binary: V ? null : ya
};
V ? (U.add = H && Ua, U.del = H && Va) : (U.auto = Sa, U.lint = Ta);
d("#loco-editor > nav .button").each(za);
d("#loco-content > form .button").each(za);
d(Xa).on("submit", ea);
(function(a) {
function b(f) {
d(a.parentNode)[f || null == f ? "removeClass" : "addClass"]("invalid");
}
g.searchable(h.fulltext.init());
a.disabled = !1;
var c = a.value = "", e = h.watchtext(a, function(f) {
f = g.filter(f, !0);
b(f);
});
g.on("poFilter", function(f, r, p) {
c = e.val();
e.val(r || "");
b(p);
}).on("poMerge", function() {
c && g.filter(c);
});
})(document.getElementById("loco-search"));
g.on("poUnsaved", function() {
E.onbeforeunload = Na;
}).on("poSave", function() {
P();
E.onbeforeunload = null;
}).on("poHint", pa).on("poUpdate", P).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && fa ? (fa.load(b.textContent), a.preventDefault(), !1) : !0;
});
C.load(x.podata);
g.load(C);
(D = g.targetLocale) ? D.isRTL() && d(G).addClass("trg-rtl") : g.unlock();
P();
ia(g);
delete h.conf;
}
}(window, window.jQuery);
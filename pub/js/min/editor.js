"use strict";

!function(F, d) {
function u(a) {
return k.l10n._(a);
}
function G(a, b, c) {
return k.l10n.n(a, b, c);
}
function z(a) {
return a.format(0, ".", Ba);
}
function Ca(a) {
k.ajax.post("sync", ja, function(b) {
const c = [];
var f = b.pot, g = b.po;
const t = b.done || {
add: [],
del: [],
fuz: []
};
var n = t.add.length;
const r = t.del.length, A = t.fuz.length, C = t.trn || 0;
B.clear().load(g);
h.load(B);
aa(h);
if (n || r || A || C) {
if (f ? c.push(v(u("Merged from %s"), f)) : c.push(u("Merged from source code")), 
n && c.push(v(G("%s new string added", "%s new strings added", n), z(n))), r && c.push(v(G("%s obsolete string removed", "%s obsolete strings removed", r), z(r))), 
A && c.push(v(G("%s string marked Fuzzy", "%s strings marked Fuzzy", A), z(A))), 
C && c.push(v(G("%s translation copied", "%s translations copied", C), z(C))), d(H).trigger("poUnsaved", []), 
T(), Da && F.console) {
f = console;
g = -1;
for (n = t.add.length; ++g < n; ) f.log(" + " + String(t.add[g]));
n = t.del.length;
for (g = 0; g < n; g++) f.log(" - " + String(t.del[g]));
n = t.fuz.length;
for (g = 0; g < n; g++) f.log(" ~ " + String(t.fuz[g]));
}
} else f ? c.push(v(u("Strings up to date with %s"), f)) : c.push(u("Strings up to date with source code"));
k.notices.success(c.join(". "));
d(H).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function Ea(a) {
const b = a.currentTarget;
a.stopImmediatePropagation();
b.disabled = !0;
ka();
b.disabled = !1;
}
function ka() {
const a = [];
B.each(function(b, c) {
h.validate(c) && a.push(c);
});
k.notices.clear();
la(a);
}
function aa(a) {
a.invalid && (la(a.invalid), a.invalid = null);
}
function la(a) {
const b = a.length;
if (0 === b) k.notices.success(u("No formatting errors detected")); else {
const c = [ v(G("%s possible error detected", "%s possible errors detected", b), b), u("Check the translations marked with a warning sign") ];
k.notices.warn(c.join(". ")).slow();
}
0 < b && h.current(a[0]);
}
function Fa(a) {
const b = a.id, c = k.apis, f = c.providers();
return c.create(a, f[b] || f._);
}
function ma() {
for (var a = -1, b, c = [], f = L, g = f.length, t = String(Ga); ++a < g; ) try {
b = f[a], null == b.src && (b.src = t), c.push(Fa(b));
} catch (n) {
k.notices.error(String(n));
}
return c;
}
function na(a) {
function b(f) {
ba = new Date().getTime();
L = f && f.apis || [];
0 === L.length ? P = ca("loco-apis-empty", f.html) : U = ca("loco-apis-batch", f.html);
c.remove();
a(L);
}
if (V || oa) k.notices.error("APIs not available in current mode"); else if (null == L || 0 === L.length || 10 < Math.round((new Date().getTime() - ba) / 1e3)) {
P && P.remove();
P = null;
U && U.remove();
U = null;
W && W.remove();
L = W = null;
var c = d('<div><div class="loco-loading"></div></div>').dialog({
dialogClass: "loco-modal loco-modal-no-close",
appendTo: "#loco-admin.wrap",
title: "Loading..",
modal: !0,
autoOpen: !0,
closeOnEscape: !1,
resizable: !1,
draggable: !1,
position: pa,
height: 200
});
k.ajax.get("apis", {
locale: String(D)
}, b);
} else ba = new Date().getTime(), a(L);
}
function ca(a, b) {
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
position: pa
});
return b;
}
function qa() {
na(function(a) {
a.length ? Ha() : ra();
});
}
function Ia(a) {
a.preventDefault();
na(function(b) {
b.length ? Ja() : ra();
});
return !1;
}
function ra() {
P ? P.dialog("open") : k.notices.error("Logic error. Unconfigured API modal missing");
}
function Ja() {
function a(e) {
a: {
var q = d(e.api).val();
for (var Q, M = Z || (Z = ma()), R = M.length, S = -1; ++S < R; ) if (Q = M[S], 
Q.getId() === q) {
q = Q;
break a;
}
k.notices.error("No " + q + " client");
q = void 0;
}
e = e.existing.checked;
N.text("Calculating....");
g = k.apis.createJob(q);
g.init(B, e);
t = q.toString();
N.text(v(u("%s unique source strings."), z(g.length)) + " " + v(u("%s characters will be sent for translation."), z(g.chars)));
E[0].disabled = g.length ? !1 : !0;
n = null;
}
function b(e) {
g && (C && e.fuzzy(0, !0), h.pasteMessage(e), e === h.active && h.setStatus(e), 
h.unsave(e, 0), r++, A && !e.valid() && (A = !1));
}
function c(e, q) {
e = q ? 100 * e / q : 0;
N.text(v(u("Translation progress %s%%"), z(e)));
}
function f() {
E.removeClass("loco-loading");
if (g && n) {
var e = n.todo();
e && k.notices.warn(v(G("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", e), z(e))).slow();
e = [];
const q = n.did();
q && e.push(v(G("%1$s string translated via %2$s", "%1$s strings translated via %2$s", q), z(q), t));
r ? e.push(v(G("%s string updated", "%s strings updated", r), z(r))) : q && e.push(u("Nothing needed updating"));
e.length && k.notices.success(e.join(". ")).slow();
n = g = null;
}
r && (T(), h.rebuildSearch());
I && (I.off("dialogclose").dialog("close"), I = null);
h.fire("poAuto");
A || ka();
}
let g, t, n, r = 0, A = !0, C = !1, I = U.dialog("open");
const y = I.find("form"), E = y.find("button.button-primary"), N = d("#loco-job-progress");
E.removeClass("loco-loading");
E[0].disabled = !0;
k.notices.clear();
y.off("submit change");
a(y[0]);
y.on("change", function(e) {
e = e.target;
const q = e.name;
"api" !== q && "existing" !== q || a(e.form);
return !0;
}).on("submit", function(e) {
e.preventDefault();
E.addClass("loco-loading");
E[0].disabled = !0;
r = 0;
c(0);
C = e.target.fuzzy.checked;
n = g.dispatch(B).done(f).each(b).prog(c).stat();
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
const w = h.getTargetOffset();
m.translate(p, w);
h.focus().reloadMessage(m);
};
}
function c(l, p, m, w) {
let J = w.getId(), O = R[J], sa = String(O + 1), Ka = w.getUrl(), ta = u("Use this translation");
w = String(w);
let ua = X && X[J];
l = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + N + O)).on("click", b(l, p));
l.attr("accesskey", sa);
1 < q.length && (ta += " (" + sa + ")");
l.text(ta);
ua && ua.replaceWith(d('<div class="loco-api loco-api-result loco-api-' + J + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Ka).text(w))).append(d("<blockquote " + I + "></blockquote>").text(p || "FAILED")).append(l));
++S === Q && (e && e.dialog("option", "title", u("Suggested translations") + " — " + m.label), 
N += S, y.attr("disabled") && y.attr("disabled", !1));
0 === O && l.focus();
}
function f(l) {
const p = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + l + " ...");
return X[l.getId()] = p;
}
function g(l) {
e && null == l && e.dialog("close");
X = R = e = null;
d(F).off("keydown", a);
}
function t(l) {
return function(p, m, w) {
M[l.getId()] = m;
c(p, m, w, l);
};
}
function n(l) {
const p = r.notes(), m = r.context();
var w = m + "" + l;
M = va[w] || (va[w] = {});
for (w = -1; ++w < Q; ) {
const J = q[w], O = J.getId();
e.append(f(J));
R[O] = w;
M[O] ? c(l, M[O], D, J) : J.translate({
source: l,
context: m,
notes: p
}, D, t(J));
}
}
const r = h.current();
if (!r) return !1;
var A = r.pluralized();
const C = A ? Math.min(h.getTargetOffset(), 1) : 0, I = 'lang="' + String(D) + '" dir="' + (D.isRTL() ? "RTL" : "LTR") + '"';
let y, E = r.source(null, C);
A ? (y = d('<select lang="en" name="s" disabled></select>'), r.eachSrc(function(l, p) {
var m = h.t();
m = l ? m._x("Plural", "Editor") : m._x("Single", "Editor");
m = d("<optgroup></optgroup>").attr("label", m);
y.append(m.append(d("<option></option>").attr("value", String(l)).text(p)));
}), y.val(String(C)), y.on("change", function(l) {
e.find("div.loco-api-result").remove();
X = {};
R = {};
S = 0;
E = r.source(null, l.target.selectedIndex);
y.attr("disabled", "true");
n(E);
})) : y = d('<blockquote lang="en"></blockquote>').text(E);
let N = 99, e = (W || (W = ca("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(y)).dialog("option", "title", u("Loading suggestions") + "...").off("dialogclose").on("dialogclose", g).dialog("open");
(A = r.translation(C)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + I + "></blockquote>").text(A)).append(d('<button class="button"></button>').attr("tabindex", String(++N)).text(u("Keep this translation")).on("click", function(l) {
l.preventDefault();
g();
})).appendTo(e);
const q = Z || (Z = ma()), Q = q.length;
let M, R = {}, S = 0, X = {};
n(E);
d(F).on("keydown", a);
return !0;
}
function La(a) {
const b = new FormData();
for (const c in a) a.hasOwnProperty(c) && b.append(c, a[c]);
return b;
}
function wa(a) {
let b = d.extend({
locale: String(B.locale() || "")
}, xa || {});
ya && ya.applyCreds(b);
da ? (b = La(b), b.append("po", new Blob([ String(B) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(B);
k.ajax.post("save", b, function(c) {
a && a();
h.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
aa(h);
}, a);
}
function Ma() {
h.dirty && wa();
}
function Na() {
return u("Your changes will be lost if you continue without saving");
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
xa = d.extend({
path: ea
}, x.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
wa(b);
return !1;
});
return !0;
}
function Pa(a) {
const b = x.project;
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
ja = {
bundle: b.bundle,
domain: b.domain,
type: V ? "pot" : "po",
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
for (c = "New message"; B.get(c); ) b = f.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
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
function fa(a, b) {
a.disabled = !1;
d(a).on("click", function() {
let c = ea;
"archive" === b ? c = c.replace(/\.po$/, ".zip") : "binary" === b && (c = c.replace(/\.po$/, ".mo"));
const f = a.form;
f.path.value = c;
f.source.value = B.toString();
return !0;
});
return !0;
}
function ha(a) {
a.preventDefault();
return !1;
}
function T() {
var a = h.stats(), b = a.t, c = a.f, f = a.u;
b = v(G("%s string", "%s strings", b), z(b));
var g = [];
D && (b = v(u("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && g.push(v(u("%s fuzzy"), z(c))), 
f && g.push(v(u("%s untranslated"), z(f))), g.length && (b += " (" + g.join(", ") + ")"));
d("#loco-po-status").text(b);
}
function za(a, b) {
a = b.getAttribute("data-loco");
const c = Y[a];
c && c(b, a) || d(b).addClass("loco-noop");
}
const k = F.loco, x = k && k.conf, H = document.getElementById("loco-editor-inner");
if (k && x && H) {
var Da = !!x.WP_DEBUG, ia = k.po.ref && k.po.ref.init(k, x), ja = null, xa = null, da = x.multipart, Wa = k.l10n, v = k.string.sprintf, Ba = x.wpnum && x.wpnum.thousands_sep || ",", D = x.locale, B = k.po.init(D).wrap(x.powrap), V = !D, Ga = k.locale.clone(x.source || {
lang: "en"
}), Xa = document.getElementById("loco-actions"), ea = x.popath, Qa = x.potpath, Ra = x.syncmode, K = document.getElementById("loco-fs"), ya = K && k.fs.init(K), oa = x.readonly;
K = !oa;
var L, Z, va = {}, W, U, P, ba = 0, pa = {
my: "top",
at: "top",
of: "#loco-content"
};
!da || F.FormData && F.Blob || (da = !1, k.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
ia || k.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
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
k.po.kbd.init(h).add("save", K ? Ma : ha).add("hint", D && K && qa || ha).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var Y = {
save: K && Oa,
sync: K && Pa,
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
source: fa,
binary: V ? null : fa,
archive: V ? null : fa
};
V ? (Y.add = K && Ua, Y.del = K && Va) : (Y.auto = Sa, Y.lint = Ta);
d("#loco-editor > nav .button").each(za);
d("#loco-content > form .button").each(za);
d(Xa).on("submit", ha);
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
h.on("poFilter", function(g, t, n) {
c = f.val();
f.val(t || "");
b(n);
}).on("poMerge", function() {
c && h.filter(c);
});
})(document.getElementById("loco-search"));
h.on("poUnsaved", function() {
F.onbeforeunload = Na;
}).on("poSave", function() {
T();
F.onbeforeunload = null;
}).on("poHint", qa).on("poUpdate", T).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && ia ? (ia.load(b.textContent), a.preventDefault(), !1) : !0;
});
B.load(x.podata);
h.load(B);
(D = h.targetLocale) ? D.isRTL() && d(H).addClass("trg-rtl") : h.unlock();
T();
aa(h);
delete k.conf;
}
}(window, window.jQuery);
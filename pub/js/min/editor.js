"use strict";

!function(C, d) {
function u(a) {
return k.l10n._(a);
}
function G(a, b, c) {
return k.l10n.n(a, b, c);
}
function z(a) {
return a.format(0, ".", Ea);
}
function Fa(a) {
k.ajax.post("sync", ma, function(b) {
const c = [];
var e = b.pot, h = b.po;
const t = b.done || {
add: [],
del: [],
fuz: []
};
var n = t.add.length;
const r = t.del.length, A = t.fuz.length, D = t.trn || 0;
B.clear().load(h);
f.load(B);
da(f);
if (n || r || A || D) {
if (e ? c.push(v(u("Merged from %s"), e)) : c.push(u("Merged from source code")), 
n && c.push(v(G("%s new string added", "%s new strings added", n), z(n))), r && c.push(v(G("%s obsolete string removed", "%s obsolete strings removed", r), z(r))), 
A && c.push(v(G("%s string marked Fuzzy", "%s strings marked Fuzzy", A), z(A))), 
D && c.push(v(G("%s translation copied", "%s translations copied", D), z(D))), d(H).trigger("poUnsaved", []), 
T(), Ga && C.console) {
e = console;
h = -1;
for (n = t.add.length; ++h < n; ) e.log(" + " + String(t.add[h]));
n = t.del.length;
for (h = 0; h < n; h++) e.log(" - " + String(t.del[h]));
n = t.fuz.length;
for (h = 0; h < n; h++) e.log(" ~ " + String(t.fuz[h]));
}
} else e ? c.push(v(u("Strings up to date with %s"), e)) : c.push(u("Strings up to date with source code"));
k.notices.success(c.join(". "));
d(H).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function Ha(a) {
const b = a.currentTarget;
a.stopImmediatePropagation();
b.disabled = !0;
na();
b.disabled = !1;
}
function na() {
const a = [];
B.each(function(b, c) {
f.validate(c) && a.push(c);
});
k.notices.clear();
oa(a);
}
function da(a) {
a.invalid && (oa(a.invalid), a.invalid = null);
}
function oa(a) {
const b = a.length;
if (0 === b) k.notices.success(u("No formatting errors detected")); else {
const c = [ v(G("%s possible error detected", "%s possible errors detected", b), b), u("Check the translations marked with a warning sign") ];
k.notices.warn(c.join(". ")).slow();
}
0 < b && f.current(a[0]);
}
function Ia(a) {
const b = a.id, c = k.apis, e = c.providers();
return c.create(a, e[b] || e._);
}
function pa() {
for (var a = -1, b, c = [], e = L, h = e.length, t = String(Ja); ++a < h; ) try {
b = e[a], null == b.src && (b.src = t), c.push(Ia(b));
} catch (n) {
k.notices.error(String(n));
}
return c;
}
function qa(a) {
function b(e) {
ea = new Date().getTime();
L = e && e.apis || [];
0 === L.length ? P = fa("loco-apis-empty", e.html) : U = fa("loco-apis-batch", e.html);
c.remove();
a(L);
}
if (V || ra) k.notices.error("APIs not available in current mode"); else if (null == L || 0 === L.length || 10 < Math.round((new Date().getTime() - ea) / 1e3)) {
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
position: sa,
height: 200
});
k.ajax.get("apis", {
locale: String(E)
}, b);
} else ea = new Date().getTime(), a(L);
}
function fa(a, b) {
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
position: sa
});
return b;
}
function ta() {
qa(function(a) {
a.length ? Ka() : ua();
});
}
function La(a) {
a.preventDefault();
qa(function(b) {
b.length ? Ma() : ua();
});
return !1;
}
function ua() {
P ? P.dialog("open") : k.notices.error("Logic error. Unconfigured API modal missing");
}
function Ma() {
function a(g) {
a: {
var q = d(g.api).val();
for (var Q, M = Z || (Z = pa()), R = M.length, S = -1; ++S < R; ) if (Q = M[S], 
Q.getId() === q) {
q = Q;
break a;
}
k.notices.error("No " + q + " client");
q = void 0;
}
g = g.existing.checked;
N.text("Calculating....");
h = k.apis.createJob(q);
h.init(B, g);
t = q.toString();
N.text(v(u("%s unique source strings."), z(h.length)) + " " + v(u("%s characters will be sent for translation."), z(h.chars)));
F[0].disabled = h.length ? !1 : !0;
n = null;
}
function b(g) {
h && (D && g.fuzzy(0, !0), f.pasteMessage(g), g === f.active && f.setStatus(g), 
f.unsave(g, 0), r++, A && !g.valid() && (A = !1));
}
function c(g, q) {
g = q ? 100 * g / q : 0;
N.text(v(u("Translation progress %s%%"), z(g)));
}
function e() {
F.removeClass("loco-loading");
if (h && n) {
var g = n.todo();
g && k.notices.warn(v(G("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", g), z(g))).slow();
g = [];
const q = n.did();
q && g.push(v(G("%1$s string translated via %2$s", "%1$s strings translated via %2$s", q), z(q), t));
r ? g.push(v(G("%s string updated", "%s strings updated", r), z(r))) : q && g.push(u("Nothing needed updating"));
g.length && k.notices.success(g.join(". ")).slow();
n = h = null;
}
r && (T(), f.rebuildSearch());
I && (I.off("dialogclose").dialog("close"), I = null);
f.fire("poAuto");
A || na();
}
let h, t, n, r = 0, A = !0, D = !1, I = U.dialog("open");
const y = I.find("form"), F = y.find("button.button-primary"), N = d("#loco-job-progress");
F.removeClass("loco-loading");
F[0].disabled = !0;
k.notices.clear();
y.off("submit change");
a(y[0]);
y.on("change", function(g) {
g = g.target;
const q = g.name;
"api" !== q && "existing" !== q || a(g.form);
return !0;
}).on("submit", function(g) {
g.preventDefault();
F.addClass("loco-loading");
F[0].disabled = !0;
r = 0;
c(0);
D = g.target.fuzzy.checked;
n = h.dispatch(B).done(e).each(b).prog(c).stat();
});
I.off("dialogclose").on("dialogclose", function() {
h.abort();
I = null;
e();
});
}
function Ka() {
function a(l) {
if (l.isDefaultPrevented()) return !1;
var p = l.which;
let m = -1;
49 <= p && 57 >= p ? m = p - 49 : 97 <= p && 105 >= p && (m = p - 97);
return 0 <= m && 9 > m && (p = g && g.find("button.button-primary").eq(m)) && 1 === p.length ? (p.click(), 
l.preventDefault(), l.stopPropagation(), !1) : !0;
}
function b(l, p) {
return function(m) {
m.preventDefault();
m.stopPropagation();
h();
m = f.current();
const w = f.getTargetOffset();
m.translate(p, w);
f.focus().reloadMessage(m);
};
}
function c(l, p, m, w) {
let J = w.getId(), O = R[J], va = String(O + 1), Na = w.getUrl(), wa = u("Use this translation");
w = String(w);
let xa = X && X[J];
l = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + N + O)).on("click", b(l, p));
l.attr("accesskey", va);
1 < q.length && (wa += " (" + va + ")");
l.text(wa);
xa && xa.replaceWith(d('<div class="loco-api loco-api-result loco-api-' + J + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Na).text(w))).append(d("<blockquote " + I + "></blockquote>").text(p || "FAILED")).append(l));
++S === Q && (g && g.dialog("option", "title", u("Suggested translations") + " — " + m.label), 
N += S, y.attr("disabled") && y.attr("disabled", !1));
0 === O && l.focus();
}
function e(l) {
const p = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + l + " ...");
return X[l.getId()] = p;
}
function h(l) {
g && null == l && g.dialog("close");
X = R = g = null;
d(C).off("keydown", a);
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
M = ya[w] || (ya[w] = {});
for (w = -1; ++w < Q; ) {
const J = q[w], O = J.getId();
g.append(e(J));
R[O] = w;
M[O] ? c(l, M[O], E, J) : J.translate({
source: l,
context: m,
notes: p
}, E, t(J));
}
}
const r = f.current();
if (!r) return !1;
var A = r.pluralized();
const D = A ? Math.min(f.getTargetOffset(), 1) : 0, I = 'lang="' + String(E) + '" dir="' + (E.isRTL() ? "RTL" : "LTR") + '"';
let y, F = r.source(null, D);
A ? (y = d('<select lang="en" name="s" disabled></select>'), r.eachSrc(function(l, p) {
var m = f.t();
m = l ? m._x("Plural", "Editor") : m._x("Single", "Editor");
m = d("<optgroup></optgroup>").attr("label", m);
y.append(m.append(d("<option></option>").attr("value", String(l)).text(p)));
}), y.val(String(D)), y.on("change", function(l) {
g.find("div.loco-api-result").remove();
X = {};
R = {};
S = 0;
F = r.source(null, l.target.selectedIndex);
y.attr("disabled", "true");
n(F);
})) : y = d('<blockquote lang="en"></blockquote>').text(F);
let N = 99, g = (W || (W = fa("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(y)).dialog("option", "title", u("Loading suggestions") + "...").off("dialogclose").on("dialogclose", h).dialog("open");
(A = r.translation(D)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + I + "></blockquote>").text(A)).append(d('<button class="button"></button>').attr("tabindex", String(++N)).text(u("Keep this translation")).on("click", function(l) {
l.preventDefault();
h();
})).appendTo(g);
const q = Z || (Z = pa()), Q = q.length;
let M, R = {}, S = 0, X = {};
n(F);
d(C).on("keydown", a);
return !0;
}
function Oa(a) {
const b = new FormData();
for (const c in a) a.hasOwnProperty(c) && b.append(c, a[c]);
return b;
}
function za(a) {
let b = d.extend({
locale: String(B.locale() || "")
}, Aa || {});
Ba && Ba.applyCreds(b);
ha ? (b = Oa(b), b.append("po", new Blob([ String(B) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(B);
k.ajax.post("save", b, function(c) {
a && a();
f.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
da(f);
}, a);
}
function Pa() {
f.dirty && za();
}
function Qa() {
return u("Your changes will be lost if you continue without saving");
}
function Ra(a) {
function b() {
a.disabled = !1;
d(a).removeClass("loco-loading");
}
f.on("poUnsaved", function() {
a.disabled = !1;
d(a).addClass("button-primary");
}).on("poSave", function() {
a.disabled = !0;
d(a).removeClass("button-primary");
});
Aa = d.extend({
path: ia
}, x.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
za(b);
return !1;
});
return !0;
}
function Sa(a) {
const b = x.project;
if (b) {
var c = function() {
a.disabled = !1;
d(a).removeClass("loco-loading");
};
f.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave", function() {
a.disabled = !1;
});
ma = {
bundle: b.bundle,
domain: b.domain,
type: V ? "pot" : "po",
path: ia || "",
sync: Ta || "",
mode: Ua || ""
};
d(a).on("click", function(e) {
e.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
Fa(c);
return !1;
});
a.disabled = !1;
}
return !0;
}
function Va(a) {
f.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave poAuto", function() {
a.disabled = !1;
});
d(a).on("click", La);
a.disabled = !1;
return !0;
}
function Wa(a) {
d(a).on("click", Ha);
a.disabled = !1;
}
function Xa(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
b = 1;
var c, e = /(\d+)$/;
for (c = "New message"; B.get(c); ) b = e.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
f.add(c);
return !1;
});
return !0;
}
function Ya(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
f.del();
return !1;
});
return !0;
}
function ja(a, b) {
a.disabled = !1;
d(a).on("click", function() {
let c = ia;
"archive" === b ? c = c.replace(/\.po$/, ".zip") : "binary" === b && (c = c.replace(/\.po$/, ".mo"));
const e = a.form;
e.path.value = c;
e.source.value = B.toString();
return !0;
});
return !0;
}
function ka(a) {
a.preventDefault();
return !1;
}
function T() {
var a = f.stats(), b = a.t, c = a.f, e = a.u;
b = v(G("%s string", "%s strings", b), z(b));
var h = [];
E && (b = v(u("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && h.push(v(u("%s fuzzy"), z(c))), 
e && h.push(v(u("%s untranslated"), z(e))), h.length && (b += " (" + h.join(", ") + ")"));
d("#loco-po-status").text(b);
}
function Ca(a, b) {
a = b.getAttribute("data-loco");
const c = Y[a];
c && c(b, a) || d(b).addClass("loco-noop");
}
const k = C.loco, x = k && k.conf, H = document.getElementById("loco-editor-inner");
if (k && x && H) {
var Ga = !!x.WP_DEBUG, la = k.po.ref && k.po.ref.init(k, x), ma = null, Aa = null, ha = x.multipart, Za = k.l10n, v = k.string.sprintf, Ea = x.wpnum && x.wpnum.thousands_sep || ",", E = x.locale, B = k.po.init(E).wrap(x.powrap), V = !E, Ja = k.locale.clone(x.source || {
lang: "en"
}), $a = document.getElementById("loco-actions"), ia = x.popath, Ta = x.potpath, Ua = x.syncmode, K = document.getElementById("loco-fs"), Ba = K && k.fs.init(K), ra = x.readonly;
K = !ra;
var aa = C.sessionStorage || {
setItem: function() {},
getItem: function() {
return "";
}
}, ba = !!aa.getItem("loco-ed-invs"), ca = !!aa.getItem("loco-ed-code"), L, Z, ya = {}, W, U, P, ea = 0, sa = {
my: "top",
at: "top",
of: "#loco-content"
};
!ha || C.FormData && C.Blob || (ha = !1, k.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
la || k.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var Da = function() {
var a, b = parseInt(d(H).css("min-height") || 0);
return function() {
for (var c = H, e = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) e += c.offsetTop || 0;
c = Math.max(b, C.innerHeight - e - 20);
a !== c && (H.style.height = String(c) + "px", a = c);
};
}();
Da();
d(C).resize(Da);
H.innerHTML = "";
var f = k.po.ed.init(H).localise(Za);
k.po.kbd.init(f).add("save", K ? Pa : ka).add("hint", E && K && ta || ka).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var Y = {
save: K && Ra,
sync: K && Sa,
revert: function(a) {
f.on("poUnsaved", function() {
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
const b = d(a);
a.disabled = !1;
f.on("poInvs", function(c, e) {
b[e ? "addClass" : "removeClass"]("inverted");
ba !== e && (ba = e, aa.setItem("loco-ed-invs", e ? "1" : ""));
});
b.on("click", function(c) {
c.preventDefault();
f.setInvs(!f.getInvs());
return !1;
});
k.tooltip.init(b);
return !0;
},
code: function(a) {
const b = d(a);
a.disabled = !1;
f.on("poMode", function() {
const c = f.getMono();
b[c ? "addClass" : "removeClass"]("inverted");
ca !== c && (ca = c, aa.setItem("loco-ed-code", c ? "1" : ""));
});
b.on("click", function(c) {
c.preventDefault();
f.setMono(!f.getMono());
return !1;
});
k.tooltip.init(b);
return !0;
},
source: ja,
binary: V ? null : ja,
archive: V ? null : ja
};
V ? (Y.add = K && Xa, Y.del = K && Ya) : (Y.auto = Va, Y.lint = Wa);
d("#loco-editor > nav .button").each(Ca);
d("#loco-content > form .button").each(Ca);
d($a).on("submit", ka);
(function(a) {
function b(h) {
d(a.parentNode)[h || null == h ? "removeClass" : "addClass"]("invalid");
}
f.searchable(k.fulltext.init());
a.disabled = !1;
var c = a.value = "", e = k.watchtext(a, function(h) {
h = f.filter(h, !0);
b(h);
});
f.on("poFilter", function(h, t, n) {
c = e.val();
e.val(t || "");
b(n);
}).on("poMerge", function() {
c && f.filter(c);
});
})(document.getElementById("loco-search"));
ba && f.setInvs(ba);
ca && f.setMono(ca);
f.on("poUnsaved", function() {
C.onbeforeunload = Qa;
}).on("poSave", function() {
T();
C.onbeforeunload = null;
}).on("poHint", ta).on("poUpdate", T).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && la ? (la.load(b.textContent), a.preventDefault(), !1) : !0;
});
B.load(x.podata);
f.load(B);
(E = f.targetLocale) ? E.isRTL() && d(H).addClass("trg-rtl") : f.unlock();
T();
da(f);
delete k.conf;
}
}(window, window.jQuery);
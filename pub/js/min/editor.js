"use strict";

!function(D, d) {
function r(a) {
return g.l10n._(a);
}
function F(a, b, c) {
return g.l10n.n(a, b, c);
}
function A(a) {
return a.format(0, ".", xa);
}
function ya(a) {
g.ajax.post("sync", fa, function(b) {
var c = [], e = b.pot, f = b.po, q = b.done || {
add: [],
del: [],
fuz: []
}, l = q.add.length, m = q.del.length, z = q.fuz.length, t = q.trn || 0;
B.clear().load(f);
h.load(B);
if (l || m || z || t) {
if (e ? c.push(w(r("Merged from %s"), e)) : c.push(r("Merged from source code")), 
l && c.push(w(F("%s new string added", "%s new strings added", l), A(l))), m && c.push(w(F("%s obsolete string removed", "%s obsolete strings removed", m), A(m))), 
z && c.push(w(F("%s string marked Fuzzy", "%s strings marked Fuzzy", z), A(z))), 
t && c.push(w(F("%s translation copied", "%s translations copied", t), A(t))), d(G).trigger("poUnsaved", []), 
P(), za && D.console) {
e = console;
f = -1;
for (l = q.add.length; ++f < l; ) e.log(" + " + String(q.add[f]));
l = q.del.length;
for (f = 0; f < l; f++) e.log(" - " + String(q.del[f]));
l = q.fuz.length;
for (f = 0; f < l; f++) e.log(" ~ " + String(q.fuz[f]));
}
} else e ? c.push(w(r("Strings up to date with %s"), e)) : c.push(r("Strings up to date with source code"));
g.notices.success(c.join(". "));
d(G).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function Aa(a) {
const b = a.currentTarget;
a.stopImmediatePropagation();
b.disabled = !0;
Ba();
b.disabled = !1;
}
function Ba() {
const a = [];
B.each(function(b, c, e) {
h.validate(c) && a.push(c);
});
ha(a);
}
function ha(a) {
const b = a.length;
if (0 === b) g.notices.success(r("No formatting errors detected")); else {
const c = [ w(F("%s possible error detected", "%s possible errors detected", b), b), r("Check the translations marked with a warning sign") ];
g.notices.warn(c.join(". ")).slow();
}
0 < b && h.current(a[0]);
}
function Ca(a) {
const b = a.id, c = g.apis, e = c.providers();
return c.create(a, e[b] || e._);
}
function ia() {
for (var a = -1, b, c = [], e = I, f = e.length, q = String(Da); ++a < f; ) try {
b = e[a], null == b.src && (b.src = q), c.push(Ca(b));
} catch (l) {
g.notices.error(String(l));
}
return c;
}
function ja(a) {
function b(e) {
X = new Date().getTime();
I = e && e.apis || [];
0 === I.length ? N = Y("loco-apis-empty", e.html) : Q = Y("loco-apis-batch", e.html);
c.remove();
a(I);
}
if (T || ka) g.notices.error("Logic error. APIs not available in current mode"); else if (null == I || 0 === I.length || 10 < Math.round((new Date().getTime() - X) / 1e3)) {
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
position: la,
height: 200
});
g.ajax.get("apis", {
locale: String(C)
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
position: la
});
return b;
}
function ma() {
ja(function(a) {
a.length ? Ea() : na();
});
}
function Fa(a) {
a.preventDefault();
ja(function(b) {
b.length ? Ga() : na();
});
return !1;
}
function na() {
N ? N.dialog("open") : g.notices.error("Logic error. Unconfigured API modal missing");
}
function Ga() {
function a(k) {
a: {
var p = d(k.api).val();
for (var J, K = U || (U = ia()), V = K.length, S = -1; ++S < V; ) if (J = K[S], 
J.getId() === p) {
p = J;
break a;
}
g.notices.error("No " + p + " client");
p = void 0;
}
k = k.existing.checked;
L.text("Calculating....");
f = g.apis.createJob(p);
f.init(B, k);
q = p.toString();
L.text(w(r("%s unique source strings."), A(f.length)) + " " + w(r("%s characters will be sent for translation."), A(f.chars)));
x[0].disabled = f.length ? !1 : !0;
l = null;
}
function b(k) {
f && (z && k.fuzzy(0, !0), h.pasteMessage(k), k === h.active && h.setStatus(k), 
h.unsave(k, 0), m++);
}
function c(k, p) {
k = p ? 100 * k / p : 0;
L.text(w(r("Translation progress %s%%"), A(k)));
}
function e() {
x.removeClass("loco-loading");
if (f && l) {
var k = l.todo();
k && g.notices.warn(w(F("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", k), A(k))).slow();
k = [];
var p = l.did();
p && k.push(w(F("%1$s string translated via %2$s", "%1$s strings translated via %2$s", p), A(p), q));
m ? k.push(w(F("%s string updated", "%s strings updated", m), A(m))) : p && k.push(r("Nothing needed updating"));
k.length && g.notices.success(k.join(". ")).slow();
l = f = null;
}
m && (P(), h.rebuildSearch());
t && (t.off("dialogclose").dialog("close"), t = null);
h.fire("poAuto");
}
var f, q, l, m = 0, z = !1, t = Q.dialog("open"), M = t.find("form"), x = M.find("button.button-primary"), L = d("#loco-job-progress");
x.removeClass("loco-loading");
x[0].disabled = !0;
g.notices.clear();
M.off("submit change");
a(M[0]);
M.on("change", function(k) {
k = k.target;
var p = k.name;
"api" !== p && "existing" !== p || a(k.form);
return !0;
}).on("submit", function(k) {
k.preventDefault();
x.addClass("loco-loading");
x[0].disabled = !0;
m = 0;
c(0);
z = k.target.fuzzy.checked;
l = f.dispatch().done(e).each(b).prog(c).stat();
});
t.off("dialogclose").on("dialogclose", function() {
f.abort();
t = null;
e();
});
}
function Ea() {
function a(n) {
if (n.isDefaultPrevented()) return !1;
var u = n.which;
let v = -1;
49 <= u && 57 >= u ? v = u - 49 : 97 <= u && 105 >= u && (v = u - 97);
return 0 <= v && 9 > v && (u = x && x.find("button.button-primary").eq(v)) && 1 === u.length ? (u.click(), 
n.preventDefault(), n.stopPropagation(), !1) : !0;
}
function b(n, u) {
return function(v) {
v.preventDefault();
v.stopPropagation();
f();
v = h.current();
var E = h.getTargetOffset();
v && v.source(null, E) === n ? (v.translate(u, E), h.focus().reloadMessage(v)) : g.notices.warn("Source changed since suggestion");
};
}
function c(n, u, v, E) {
let Z = E.getId(), aa = S[Z], oa = String(aa + 1), Ha = E.getUrl(), pa = r("Use this translation");
E = String(E);
let qa = K && K[Z];
n = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + l + aa)).on("click", b(n, u));
n.attr("accesskey", oa);
1 < L.length && (pa += " (" + oa + ")");
n.text(pa);
qa && qa.replaceWith(d('<div class="loco-api loco-api-' + Z + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Ha).text(E))).append(d("<blockquote " + M + "></blockquote>").text(u || "FAILED")).append(n));
++V === k && (x && x.dialog("option", "title", r("Suggested translations") + " — " + v.label), 
l += V);
0 === aa && n.focus();
}
function e(n) {
const u = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + n + " ...");
return K[n.getId()] = u;
}
function f(n) {
x && null == n && x.dialog("close");
K = x = null;
d(D).off("keydown", a);
}
function q(n) {
return function(u, v, E) {
J[n.getId()] = v;
c(u, v, E, n);
};
}
let l = 99;
var m = h.current(), z = h.getTargetOffset();
const t = m && m.source(null, z), M = 'lang="' + String(C) + '" dir="' + (C.isRTL() ? "RTL" : "LTR") + '"';
if (!t) return !1;
let x = (R || (R = Y("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(d('<blockquote lang="en"></blockquote>').text(t))).dialog("option", "title", r("Loading suggestions") + "...").off("dialogclose").on("dialogclose", f).dialog("open");
(m = m.translation(z)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + M + "></blockquote>").text(m)).append(d('<button class="button"></button>').attr("tabindex", String(++l)).text(r("Keep this translation")).on("click", function(n) {
n.preventDefault();
f();
})).appendTo(x);
for (var L = U || (U = ia()), k = L.length, p = -1, J = ra[t] || (ra[t] = {}), K = {}, V = 0, S = {}; ++p < k; ) m = L[p], 
x.append(e(m)), z = m.getId(), S[z] = p, J[z] ? c(t, J[z], C, m) : m.translate(t, C, q(m));
d(D).on("keydown", a);
return !0;
}
function Ia(a) {
var b, c = new FormData();
for (b in a) a.hasOwnProperty(b) && c.append(b, a[b]);
return c;
}
function sa(a) {
var b = d.extend({
locale: String(B.locale() || "")
}, ta || {});
ua && ua.applyCreds(b);
ba ? (b = Ia(b), b.append("po", new Blob([ String(B) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(B);
g.ajax.post("save", b, function(c) {
a && a();
h.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
}, a);
}
function Ja() {
h.dirty && sa();
}
function Ka() {
return r("Your changes will be lost if you continue without saving");
}
function La(a) {
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
ta = d.extend({
path: ca
}, y.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
sa(b);
return !1;
});
return !0;
}
function Ma(a) {
var b = y.project;
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
fa = {
bundle: b.bundle,
domain: b.domain,
type: T ? "pot" : "po",
path: ca || "",
sync: Na || "",
mode: Oa || ""
};
d(a).on("click", function(e) {
e.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
ya(c);
return !1;
});
a.disabled = !1;
}
return !0;
}
function Pa(a) {
h.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave poAuto", function() {
a.disabled = !1;
});
d(a).on("click", Fa);
a.disabled = !1;
return !0;
}
function Qa(a) {
d(a).on("click", Aa);
a.disabled = !1;
}
function Ra(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
b = 1;
var c, e = /(\d+)$/;
for (c = "New message"; B.get(c); ) b = e.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
h.add(c);
return !1;
});
return !0;
}
function Sa(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
h.del();
return !1;
});
return !0;
}
function va(a, b) {
a.disabled = !1;
d(a).on("click", function() {
var c = a.form, e = ca;
"binary" === b && (e = e.replace(/\.po$/, ".mo"));
c.path.value = e;
c.source.value = B.toString();
return !0;
});
return !0;
}
function da(a) {
a.preventDefault();
return !1;
}
function P() {
var a = h.stats(), b = a.t, c = a.f, e = a.u;
b = w(F("%s string", "%s strings", b), A(b));
var f = [];
C && (b = w(r("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && f.push(w(r("%s fuzzy"), A(c))), 
e && f.push(w(r("%s untranslated"), A(e))), f.length && (b += " (" + f.join(", ") + ")"));
d("#loco-po-status").text(b);
}
const g = D.loco, y = g && g.conf, G = document.getElementById("loco-editor-inner");
if (g && y && G) {
var za = !!y.WP_DEBUG, ea = g.po.ref && g.po.ref.init(g, y), fa = null, ta = null, ba = y.multipart, Ta = g.l10n, w = g.string.sprintf, xa = y.wpnum && y.wpnum.thousands_sep || ",", C = y.locale, B = g.po.init(C).wrap(y.powrap), T = !C, Da = g.locale.clone(y.source || {
lang: "en"
}), Ua = document.getElementById("loco-actions"), ca = y.popath, Na = y.potpath, Oa = y.syncmode, H = document.getElementById("loco-fs"), ua = H && g.fs.init(H), ka = y.readonly;
H = !ka;
var I, U, ra = {}, R, Q, N, X = 0, la = {
my: "top",
at: "top",
of: "#loco-content"
};
!ba || D.FormData && D.Blob || (ba = !1, g.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
ea || g.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var wa = function() {
var a, b = parseInt(d(G).css("min-height") || 0);
return function() {
for (var c = G, e = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) e += c.offsetTop || 0;
c = Math.max(b, D.innerHeight - e - 20);
a !== c && (G.style.height = String(c) + "px", a = c);
};
}();
wa();
d(D).resize(wa);
G.innerHTML = "";
var h = g.po.ed.init(G).localise(Ta);
g.po.kbd.init(h).add("save", H ? Ja : da).add("hint", C && H && ma || da).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var O = {
save: H && La,
sync: H && Ma,
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
h.on("poInvs", function(c, e) {
b[e ? "addClass" : "removeClass"]("inverted");
});
b.on("click", function(c) {
c.preventDefault();
h.setInvs(!h.getInvs());
return !1;
});
g.tooltip.init(b);
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
g.tooltip.init(b);
return !0;
},
source: va,
binary: T ? null : va
};
T ? (O.add = H && Ra, O.del = H && Sa) : (O.auto = Pa, O.lint = Qa);
d("#loco-editor > nav .button").each(function(a, b) {
a = b.getAttribute("data-loco");
var c = O[a];
c && c(b, a) || d(b).addClass("loco-noop");
});
d(Ua).on("submit", da);
(function(a) {
function b(f) {
d(a.parentNode)[f || null == f ? "removeClass" : "addClass"]("invalid");
}
h.searchable(g.fulltext.init());
a.disabled = !1;
var c = a.value = "", e = g.watchtext(a, function(f) {
f = h.filter(f, !0);
b(f);
});
h.on("poFilter", function(f, q, l) {
c = e.val();
e.val(q || "");
b(l);
}).on("poMerge", function() {
c && h.filter(c);
});
})(document.getElementById("loco-search"));
h.on("poUnsaved", function() {
D.onbeforeunload = Ka;
}).on("poSave", function() {
P();
D.onbeforeunload = null;
}).on("poHint", ma).on("poUpdate", P).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && ea ? (ea.load(b.textContent), a.preventDefault(), !1) : !0;
});
h.on("poLoad", function(a, b) {
W = b.invalid || [];
});
B.load(y.podata);
h.load(B);
(C = h.targetLocale) ? C.isRTL() && d(G).addClass("trg-rtl") : h.unlock();
P();
if (W && W.length) {
ha(W);
var W = null;
}
delete g.conf;
O = null;
}
}(window, window.jQuery);
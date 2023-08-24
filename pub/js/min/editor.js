"use strict";

!function(E, d) {
function q(a) {
return g.l10n._(a);
}
function G(a, b, c) {
return g.l10n.n(a, b, c);
}
function A(a) {
return a.format(0, ".", za);
}
function Aa(a) {
g.ajax.post("sync", ha, function(b) {
const c = [], e = b.pot, k = b.po, y = b.done || {
add: [],
del: [],
fuz: []
}, p = y.add.length, l = y.del.length, z = y.fuz.length, r = y.trn || 0;
C.clear().load(k);
let B;
f.on("poLoad", function(v, H) {
B = H.invalid || [];
});
f.load(C);
B && B.length && X(B);
p || l || z || r ? (e ? c.push(w(q("Merged from %s"), e)) : c.push(q("Merged from source code")), 
p && c.push(w(G("%s new string added", "%s new strings added", p), A(p))), l && c.push(w(G("%s obsolete string removed", "%s obsolete strings removed", l), A(l))), 
z && c.push(w(G("%s string marked Fuzzy", "%s strings marked Fuzzy", z), A(z))), 
r && c.push(w(G("%s translation copied", "%s translations copied", r), A(r))), d(I).trigger("poUnsaved", []), 
O(), Ba && E.console && Ca(console, y)) : e ? c.push(w(q("Strings up to date with %s"), e)) : c.push(q("Strings up to date with source code"));
g.notices.success(c.join(". "));
d(I).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function Ca(a, b) {
for (var c = -1, e = b.add.length; ++c < e; ) a.log(" + " + String(b.add[c]));
e = b.del.length;
for (c = 0; c < e; c++) a.log(" - " + String(b.del[c]));
e = b.fuz.length;
for (c = 0; c < e; c++) a.log(" ~ " + String(b.fuz[c]));
}
function Da(a) {
const b = a.currentTarget;
a.stopImmediatePropagation();
b.disabled = !0;
ia();
b.disabled = !1;
}
function ia() {
const a = [];
C.each(function(b, c) {
f.validate(c) && a.push(c);
});
X(a);
}
function X(a) {
const b = a.length;
if (0 === b) g.notices.success(q("No formatting errors detected")); else {
const c = [ w(G("%s possible error detected", "%s possible errors detected", b), b), q("Check the translations marked with a warning sign") ];
g.notices.warn(c.join(". ")).slow();
}
0 < b && f.current(a[0]);
}
function Ea(a) {
const b = a.id, c = g.apis, e = c.providers();
return c.create(a, e[b] || e._);
}
function ja() {
for (var a = -1, b, c = [], e = K, k = e.length, y = String(Fa); ++a < k; ) try {
b = e[a], null == b.src && (b.src = y), c.push(Ea(b));
} catch (p) {
g.notices.error(String(p));
}
return c;
}
function ka(a) {
function b(e) {
Y = new Date().getTime();
K = e && e.apis || [];
0 === K.length ? N = Z("loco-apis-empty", e.html) : P = Z("loco-apis-batch", e.html);
c.remove();
a(K);
}
if (T || la) g.notices.error("Logic error. APIs not available in current mode"); else if (null == K || 0 === K.length || 10 < Math.round((new Date().getTime() - Y) / 1e3)) {
N && N.remove();
N = null;
P && P.remove();
P = null;
Q && Q.remove();
K = Q = null;
var c = d('<div><div class="loco-loading"></div></div>').dialog({
dialogClass: "loco-modal loco-modal-no-close",
appendTo: "#loco-admin.wrap",
title: "Loading..",
modal: !0,
autoOpen: !0,
closeOnEscape: !1,
resizable: !1,
draggable: !1,
position: ma,
height: 200
});
g.ajax.get("apis", {
locale: String(D)
}, b);
} else Y = new Date().getTime(), a(K);
}
function Z(a, b) {
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
position: ma
});
return b;
}
function na() {
ka(function(a) {
a.length ? Ga() : oa();
});
}
function Ha(a) {
a.preventDefault();
ka(function(b) {
b.length ? Ia() : oa();
});
return !1;
}
function oa() {
N ? N.dialog("open") : g.notices.error("Logic error. Unconfigured API modal missing");
}
function Ia() {
function a(h) {
a: {
var n = d(h.api).val();
for (var L, M = U || (U = ja()), V = M.length, R = -1; ++R < V; ) if (L = M[R], 
L.getId() === n) {
n = L;
break a;
}
g.notices.error("No " + n + " client");
n = void 0;
}
h = h.existing.checked;
H.text("Calculating....");
k = g.apis.createJob(n);
k.init(C, h);
y = n.toString();
H.text(w(q("%s unique source strings."), A(k.length)) + " " + w(q("%s characters will be sent for translation."), A(k.chars)));
v[0].disabled = k.length ? !1 : !0;
p = null;
}
function b(h) {
k && (z && h.fuzzy(0, !0), f.pasteMessage(h), h === f.active && f.setStatus(h), 
f.unsave(h, 0), l++);
}
function c(h, n) {
h = n ? 100 * h / n : 0;
H.text(w(q("Translation progress %s%%"), A(h)));
}
function e() {
v.removeClass("loco-loading");
if (k && p) {
var h = p.todo();
h && g.notices.warn(w(G("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", h), A(h))).slow();
h = [];
var n = p.did();
n && h.push(w(G("%1$s string translated via %2$s", "%1$s strings translated via %2$s", n), A(n), y));
l ? h.push(w(G("%s string updated", "%s strings updated", l), A(l))) : n && h.push(q("Nothing needed updating"));
h.length && g.notices.success(h.join(". ")).slow();
p = k = null;
}
l && (O(), f.rebuildSearch());
r && (r.off("dialogclose").dialog("close"), r = null);
f.fire("poAuto");
ia();
}
var k, y, p, l = 0, z = !1, r = P.dialog("open"), B = r.find("form"), v = B.find("button.button-primary"), H = d("#loco-job-progress");
v.removeClass("loco-loading");
v[0].disabled = !0;
g.notices.clear();
B.off("submit change");
a(B[0]);
B.on("change", function(h) {
h = h.target;
var n = h.name;
"api" !== n && "existing" !== n || a(h.form);
return !0;
}).on("submit", function(h) {
h.preventDefault();
v.addClass("loco-loading");
v[0].disabled = !0;
l = 0;
c(0);
z = h.target.fuzzy.checked;
p = k.dispatch().done(e).each(b).prog(c).stat();
});
r.off("dialogclose").on("dialogclose", function() {
k.abort();
r = null;
e();
});
}
function Ga() {
function a(m) {
if (m.isDefaultPrevented()) return !1;
var t = m.which;
let u = -1;
49 <= t && 57 >= t ? u = t - 49 : 97 <= t && 105 >= t && (u = t - 97);
return 0 <= u && 9 > u && (t = v && v.find("button.button-primary").eq(u)) && 1 === t.length ? (t.click(), 
m.preventDefault(), m.stopPropagation(), !1) : !0;
}
function b(m, t) {
return function(u) {
u.preventDefault();
u.stopPropagation();
k();
u = f.current();
var F = f.getTargetOffset();
u && u.source(null, F) === m ? (u.translate(t, F), f.focus().reloadMessage(u)) : g.notices.warn("Source changed since suggestion");
};
}
function c(m, t, u, F) {
let aa = F.getId(), ba = R[aa], pa = String(ba + 1), Ja = F.getUrl(), qa = q("Use this translation");
F = String(F);
let ra = M && M[aa];
m = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + p + ba)).on("click", b(m, t));
m.attr("accesskey", pa);
1 < H.length && (qa += " (" + pa + ")");
m.text(qa);
ra && ra.replaceWith(d('<div class="loco-api loco-api-' + aa + '"></div>').append(d('<div class="loco-api-credit">Translated by </div>').append(d('<a target="_blank" tabindex="-1"></a>').attr("href", Ja).text(F))).append(d("<blockquote " + B + "></blockquote>").text(t || "FAILED")).append(m));
++V === h && (v && v.dialog("option", "title", q("Suggested translations") + " — " + u.label), 
p += V);
0 === ba && m.focus();
}
function e(m) {
const t = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + m + " ...");
return M[m.getId()] = t;
}
function k(m) {
v && null == m && v.dialog("close");
M = v = null;
d(E).off("keydown", a);
}
function y(m) {
return function(t, u, F) {
L[m.getId()] = u;
c(t, u, F, m);
};
}
let p = 99;
var l = f.current(), z = f.getTargetOffset();
const r = l && l.source(null, z), B = 'lang="' + String(D) + '" dir="' + (D.isRTL() ? "RTL" : "LTR") + '"';
if (!r) return !1;
let v = (Q || (Q = Z("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(d('<blockquote lang="en"></blockquote>').text(r))).dialog("option", "title", q("Loading suggestions") + "...").off("dialogclose").on("dialogclose", k).dialog("open");
(l = l.translation(z)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + B + "></blockquote>").text(l)).append(d('<button class="button"></button>').attr("tabindex", String(++p)).text(q("Keep this translation")).on("click", function(m) {
m.preventDefault();
k();
})).appendTo(v);
for (var H = U || (U = ja()), h = H.length, n = -1, L = sa[r] || (sa[r] = {}), M = {}, V = 0, R = {}; ++n < h; ) l = H[n], 
v.append(e(l)), z = l.getId(), R[z] = n, L[z] ? c(r, L[z], D, l) : l.translate(r, D, y(l));
d(E).on("keydown", a);
return !0;
}
function Ka(a) {
var b, c = new FormData();
for (b in a) a.hasOwnProperty(b) && c.append(b, a[b]);
return c;
}
function ta(a) {
var b = d.extend({
locale: String(C.locale() || "")
}, ua || {});
va && va.applyCreds(b);
ca ? (b = Ka(b), b.append("po", new Blob([ String(C) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(C);
g.ajax.post("save", b, function(c) {
a && a();
f.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
}, a);
}
function La() {
f.dirty && ta();
}
function Ma() {
return q("Your changes will be lost if you continue without saving");
}
function Na(a) {
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
ua = d.extend({
path: da
}, x.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
ta(b);
return !1;
});
return !0;
}
function Oa(a) {
var b = x.project;
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
ha = {
bundle: b.bundle,
domain: b.domain,
type: T ? "pot" : "po",
path: da || "",
sync: Pa || "",
mode: Qa || ""
};
d(a).on("click", function(e) {
e.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
Aa(c);
return !1;
});
a.disabled = !1;
}
return !0;
}
function Ra(a) {
f.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave poAuto", function() {
a.disabled = !1;
});
d(a).on("click", Ha);
a.disabled = !1;
return !0;
}
function Sa(a) {
d(a).on("click", Da);
a.disabled = !1;
}
function Ta(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
b = 1;
var c, e = /(\d+)$/;
for (c = "New message"; C.get(c); ) b = e.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
f.add(c);
return !1;
});
return !0;
}
function Ua(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
f.del();
return !1;
});
return !0;
}
function wa(a, b) {
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
function O() {
var a = f.stats(), b = a.t, c = a.f, e = a.u;
b = w(G("%s string", "%s strings", b), A(b));
var k = [];
D && (b = w(q("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && k.push(w(q("%s fuzzy"), A(c))), 
e && k.push(w(q("%s untranslated"), A(e))), k.length && (b += " (" + k.join(", ") + ")"));
d("#loco-po-status").text(b);
}
function xa(a, b) {
a = b.getAttribute("data-loco");
const c = S[a];
c && c(b, a) || d(b).addClass("loco-noop");
}
const g = E.loco, x = g && g.conf, I = document.getElementById("loco-editor-inner");
if (g && x && I) {
var Ba = !!x.WP_DEBUG, fa = g.po.ref && g.po.ref.init(g, x), ha = null, ua = null, ca = x.multipart, Va = g.l10n, w = g.string.sprintf, za = x.wpnum && x.wpnum.thousands_sep || ",", D = x.locale, C = g.po.init(D).wrap(x.powrap), T = !D, Fa = g.locale.clone(x.source || {
lang: "en"
}), Wa = document.getElementById("loco-actions"), da = x.popath, Pa = x.potpath, Qa = x.syncmode, J = document.getElementById("loco-fs"), va = J && g.fs.init(J), la = x.readonly;
J = !la;
var K, U, sa = {}, Q, P, N, Y = 0, ma = {
my: "top",
at: "top",
of: "#loco-content"
};
!ca || E.FormData && E.Blob || (ca = !1, g.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
fa || g.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var ya = function() {
var a, b = parseInt(d(I).css("min-height") || 0);
return function() {
for (var c = I, e = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) e += c.offsetTop || 0;
c = Math.max(b, E.innerHeight - e - 20);
a !== c && (I.style.height = String(c) + "px", a = c);
};
}();
ya();
d(E).resize(ya);
I.innerHTML = "";
var f = g.po.ed.init(I).localise(Va);
g.po.kbd.init(f).add("save", J ? La : ea).add("hint", D && J && na || ea).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var S = {
save: J && Na,
sync: J && Oa,
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
var b = d(a);
a.disabled = !1;
f.on("poInvs", function(c, e) {
b[e ? "addClass" : "removeClass"]("inverted");
});
b.on("click", function(c) {
c.preventDefault();
f.setInvs(!f.getInvs());
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
c = !f.getMono();
b[c ? "addClass" : "removeClass"]("inverted");
f.setMono(c);
return !1;
});
g.tooltip.init(b);
return !0;
},
source: wa,
binary: T ? null : wa
};
T ? (S.add = J && Ta, S.del = J && Ua) : (S.auto = Ra, S.lint = Sa);
d("#loco-editor > nav .button").each(xa);
d("#loco-content > form .button").each(xa);
d(Wa).on("submit", ea);
(function(a) {
function b(k) {
d(a.parentNode)[k || null == k ? "removeClass" : "addClass"]("invalid");
}
f.searchable(g.fulltext.init());
a.disabled = !1;
var c = a.value = "", e = g.watchtext(a, function(k) {
k = f.filter(k, !0);
b(k);
});
f.on("poFilter", function(k, y, p) {
c = e.val();
e.val(y || "");
b(p);
}).on("poMerge", function() {
c && f.filter(c);
});
})(document.getElementById("loco-search"));
f.on("poUnsaved", function() {
E.onbeforeunload = Ma;
}).on("poSave", function() {
O();
E.onbeforeunload = null;
}).on("poHint", na).on("poUpdate", O).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && fa ? (fa.load(b.textContent), a.preventDefault(), !1) : !0;
});
f.on("poLoad", function(a, b) {
W = b.invalid || [];
});
C.load(x.podata);
f.load(C);
(D = f.targetLocale) ? D.isRTL() && d(I).addClass("trg-rtl") : f.unlock();
O();
if (W && W.length) {
X(W);
var W = null;
}
delete g.conf;
}
}(window, window.jQuery);
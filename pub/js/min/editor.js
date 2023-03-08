"use strict";

!function(C, d) {
function w(a) {
return g.l10n._(a);
}
function H(a, b, c) {
return g.l10n.n(a, b, c);
}
function A(a) {
return a.format(0, ".", va);
}
function wa(a) {
g.ajax.post("sync", ea, function(b) {
var c = [], f = b.pot, e = b.po, q = b.done || {
add: [],
del: [],
fuz: []
}, l = q.add.length, m = q.del.length, z = q.fuz.length, r = q.trn || 0;
D.clear().load(e);
h.load(D);
if (l || m || z || r) {
if (f ? c.push(x(w("Merged from %s"), f)) : c.push(w("Merged from source code")), 
l && c.push(x(H("%s new string added", "%s new strings added", l), A(l))), m && c.push(x(H("%s obsolete string removed", "%s obsolete strings removed", m), A(m))), 
z && c.push(x(H("%s string marked Fuzzy", "%s strings marked Fuzzy", z), A(z))), 
r && c.push(x(H("%s translation copied", "%s translations copied", r), A(r))), d(F).trigger("poUnsaved", []), 
O(), xa && C.console) {
f = console;
e = -1;
for (l = q.add.length; ++e < l; ) f.log(" + " + String(q.add[e]));
l = q.del.length;
for (e = 0; e < l; e++) f.log(" - " + String(q.del[e]));
l = q.fuz.length;
for (e = 0; e < l; e++) f.log(" ~ " + String(q.fuz[e]));
}
} else f ? c.push(x(w("Strings up to date with %s"), f)) : c.push(w("Strings up to date with source code"));
g.notices.success(c.join(". "));
d(F).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function fa() {
for (var a = -1, b, c = [], f = I, e = f.length, q = String(ya); ++a < e; ) try {
b = f[a], null == b.src && (b.src = q), c.push(g.apis.create(b));
} catch (l) {
g.notices.error(String(l));
}
return c;
}
function ha(a) {
function b(f) {
W = new Date().getTime();
I = f && f.apis || [];
0 === I.length ? N = X("loco-apis-empty", f.html) : P = X("loco-apis-batch", f.html);
c.remove();
a(I);
}
if (T || ia) g.notices.error("Logic error. APIs not available in current mode"); else if (null == I || 0 === I.length || 10 < Math.round((new Date().getTime() - W) / 1e3)) {
N && N.remove();
N = null;
P && P.remove();
P = null;
Q && Q.remove();
I = Q = null;
var c = d('<div><div class="loco-loading"></div></div>').dialog({
dialogClass: "loco-modal loco-modal-no-close",
appendTo: "#loco-admin.wrap",
title: "Loading..",
modal: !0,
autoOpen: !0,
closeOnEscape: !1,
resizable: !1,
draggable: !1,
position: ja,
height: 200
});
g.ajax.get("apis", {
locale: String(B)
}, b);
} else W = new Date().getTime(), a(I);
}
function X(a, b) {
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
position: ja
});
return b;
}
function ka() {
ha(function(a) {
a.length ? za() : la();
});
}
function Aa(a) {
a.preventDefault();
ha(function(b) {
b.length ? Ba() : la();
});
return !1;
}
function la() {
N ? N.dialog("open") : g.notices.error("Logic error. Unconfigured API modal missing");
}
function Ba() {
function a(k) {
a: {
var p = d(k.api).val();
for (var J, K = U || (U = fa()), V = K.length, R = -1; ++R < V; ) if (J = K[R], 
J.getId() === p) {
p = J;
break a;
}
g.notices.error("No " + p + " client");
p = void 0;
}
k = k.existing.checked;
L.text("Calculating....");
e = p.createJob();
e.init(D, k);
q = p.toString();
L.text(x(w("%s unique source strings."), A(e.length)) + " " + x(w("%s characters will be sent for translation."), A(e.chars)));
y[0].disabled = e.length ? !1 : !0;
l = null;
}
function b(k) {
e && (z && k.fuzzy(0, !0), h.pasteMessage(k), k === h.active && h.setStatus(k), 
h.unsave(k, 0), m++);
}
function c(k, p) {
k = p ? 100 * k / p : 0;
L.text(x(w("Translation progress %s%%"), A(k)));
}
function f() {
y.removeClass("loco-loading");
if (e && l) {
var k = l.todo();
k && g.notices.warn(x(H("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", k), A(k))).slow();
k = [];
var p = l.did();
p && k.push(x(H("%1$s string translated via %2$s", "%1$s strings translated via %2$s", p), A(p), q));
m ? k.push(x(H("%s string updated", "%s strings updated", m), A(m))) : p && k.push(w("Nothing needed updating"));
k.length && g.notices.success(k.join(". ")).slow();
l = e = null;
}
m && (O(), h.rebuildSearch());
r && (r.off("dialogclose").dialog("close"), r = null);
h.fire("poAuto");
}
var e, q, l, m = 0, z = !1, r = P.dialog("open"), M = r.find("form"), y = M.find("button.button-primary"), L = d("#loco-job-progress");
y.removeClass("loco-loading");
y[0].disabled = !0;
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
y.addClass("loco-loading");
y[0].disabled = !0;
m = 0;
c(0);
z = k.target.fuzzy.checked;
l = e.dispatch().done(f).each(b).prog(c).stat();
});
r.off("dialogclose").on("dialogclose", function() {
e.abort();
r = null;
f();
});
}
function za() {
function a(n) {
if (n.isDefaultPrevented()) return !1;
var t = n.which;
let u = -1;
49 <= t && 57 >= t ? u = t - 49 : 97 <= t && 105 >= t && (u = t - 97);
return 0 <= u && 9 > u && (t = y && y.find("button.button-primary").eq(u)) && 1 === t.length ? (t.click(), 
n.preventDefault(), n.stopPropagation(), !1) : !0;
}
function b(n, t) {
return function(u) {
u.preventDefault();
u.stopPropagation();
e();
u = h.current();
var E = h.getTargetOffset();
u && u.source(null, E) === n ? (u.translate(t, E), h.focus().reloadMessage(u)) : g.notices.warn("Source changed since suggestion");
};
}
function c(n, t, u, E) {
var Y = E.getId(), Z = R[Y], ma = String(Z + 1), Ca = E.getUrl(), na = w("Use this translation");
E = String(E);
var oa = K && K[Y];
n = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + l + Z)).on("click", b(n, t));
n.attr("accesskey", ma);
1 < L.length && (na += " (" + ma + ")");
n.text(na);
oa && oa.replaceWith(d('<div class="loco-api loco-api-' + Y + '"></div>').append(d('<a class="loco-api-credit" target="_blank" tabindex="-1"></a>').attr("href", Ca).text(E)).append(d("<blockquote " + M + "></blockquote>").text(t || "FAILED")).append(n));
++V === k && (y && y.dialog("option", "title", w("Suggested translations") + " — " + u.label), 
l += V);
0 === Z && n.focus();
}
function f(n) {
var t = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + n + " ...");
return K[n.getId()] = t;
}
function e(n) {
y && null == n && y.dialog("close");
K = y = null;
d(C).off("keydown", a);
}
function q(n) {
return function(t, u, E) {
J[n.getId()] = u;
c(t, u, E, n);
};
}
let l = 99;
var m = h.current(), z = h.getTargetOffset();
const r = m && m.source(null, z), M = 'lang="' + String(B) + '" dir="' + (B.isRTL() ? "RTL" : "LTR") + '"';
if (!r) return !1;
var y = (Q || (Q = X("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(d('<blockquote lang="en"></blockquote>').text(r))).dialog("option", "title", w("Loading suggestions") + "...").off("dialogclose").on("dialogclose", e).dialog("open");
(m = m.translation(z)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + M + "></blockquote>").text(m)).append(d('<button class="button"></button>').attr("tabindex", String(++l)).text(w("Keep this translation")).on("click", function(n) {
n.preventDefault();
e();
})).appendTo(y);
for (var L = U || (U = fa()), k = L.length, p = -1, J = pa[r] || (pa[r] = {}), K = {}, V = 0, R = {}; ++p < k; ) m = L[p], 
y.append(f(m)), z = m.getId(), R[z] = p, J[z] ? c(r, J[z], B, m) : m.translate(r, B, q(m));
d(C).on("keydown", a);
return !0;
}
function Da(a) {
var b, c = new FormData();
for (b in a) a.hasOwnProperty(b) && c.append(b, a[b]);
return c;
}
function qa(a) {
var b = d.extend({
locale: String(D.locale() || "")
}, ra || {});
sa && sa.applyCreds(b);
aa ? (b = Da(b), b.append("po", new Blob([ String(D) ], {
type: "application/x-gettext"
}), String(b.path).split("/").pop() || "untitled.po")) : b.data = String(D);
g.ajax.post("save", b, function(c) {
a && a();
h.save(!0);
d("#loco-po-modified").text(c.datetime || "[datetime error]");
}, a);
}
function Ea() {
h.dirty && qa();
}
function Fa() {
return w("Your changes will be lost if you continue without saving");
}
function Ga(a) {
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
ra = d.extend({
path: ba
}, v.project || {});
d(a).on("click", function(c) {
c.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
qa(b);
return !1;
});
return !0;
}
function Ha(a) {
var b = v.project;
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
ea = {
bundle: b.bundle,
domain: b.domain,
type: T ? "pot" : "po",
path: ba || "",
sync: Ia || "",
mode: Ja || ""
};
d(a).on("click", function(f) {
f.preventDefault();
a.disabled = !0;
d(a).addClass("loco-loading");
wa(c);
return !1;
});
a.disabled = !1;
}
return !0;
}
function Ka(a) {
h.on("poUnsaved", function() {
a.disabled = !0;
}).on("poSave poAuto", function() {
a.disabled = !1;
});
d(a).on("click", Aa);
a.disabled = !1;
return !0;
}
function La(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
b = 1;
var c, f = /(\d+)$/;
for (c = "New message"; D.get(c); ) b = f.exec(c) ? Math.max(b, Number(RegExp.$1)) : b, 
c = "New message " + ++b;
h.add(c);
return !1;
});
return !0;
}
function Ma(a) {
a.disabled = !1;
d(a).on("click", function(b) {
b.preventDefault();
h.del();
return !1;
});
return !0;
}
function ta(a, b) {
a.disabled = !1;
d(a).on("click", function() {
var c = a.form, f = ba;
"binary" === b && (f = f.replace(/\.po$/, ".mo"));
c.path.value = f;
c.source.value = D.toString();
return !0;
});
return !0;
}
function ca(a) {
a.preventDefault();
return !1;
}
function O() {
var a = h.stats(), b = a.t, c = a.f, f = a.u;
b = x(H("%s string", "%s strings", b), A(b));
var e = [];
B && (b = x(w("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && e.push(x(w("%s fuzzy"), A(c))), 
f && e.push(x(w("%s untranslated"), A(f))), e.length && (b += " (" + e.join(", ") + ")"));
d("#loco-po-status").text(b);
}
var g = C.loco, v = g && g.conf, F = document.getElementById("loco-editor-inner");
if (g && v && F) {
var xa = !!v.WP_DEBUG, da = g.po.ref && g.po.ref.init(g, v), ea = null, ra = null, aa = v.multipart, Na = g.l10n, x = g.string.sprintf, va = v.wpnum && v.wpnum.thousands_sep || ",", B = v.locale, D = g.po.init(B).wrap(v.powrap), T = !B, ya = g.locale.clone(v.source || {
lang: "en"
}), Oa = document.getElementById("loco-actions"), ba = v.popath, Ia = v.potpath, Ja = v.syncmode, G = document.getElementById("loco-fs"), sa = G && g.fs.init(G), ia = v.readonly;
G = !ia;
var I, U, pa = {}, Q, P, N, W = 0, ja = {
my: "top",
at: "top",
of: "#loco-content"
};
!aa || C.FormData && C.Blob || (aa = !1, g.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata"));
da || g.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");
var ua = function() {
var a, b = parseInt(d(F).css("min-height") || 0);
return function() {
for (var c = F, f = c.offsetTop || 0; (c = c.offsetParent) && c !== document.body; ) f += c.offsetTop || 0;
c = Math.max(b, C.innerHeight - f - 20);
a !== c && (F.style.height = String(c) + "px", a = c);
};
}();
ua();
d(C).resize(ua);
F.innerHTML = "";
var h = g.po.ed.init(F).localise(Na);
g.po.kbd.init(h).add("save", G ? Ea : ca).add("hint", B && G && ka || ca).enable("copy", "clear", "enter", "next", "prev", "fuzzy", "save", "invis", "hint");
var S = {
save: G && Ga,
sync: G && Ha,
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
source: ta,
binary: T ? null : ta
};
T ? (S.add = G && La, S.del = G && Ma) : S.auto = Ka;
d("#loco-editor > nav .button").each(function(a, b) {
a = b.getAttribute("data-loco");
var c = S[a];
c && c(b, a) || d(b).addClass("loco-noop");
});
d(Oa).on("submit", ca);
(function(a) {
function b(e) {
d(a.parentNode)[e || null == e ? "removeClass" : "addClass"]("invalid");
}
h.searchable(g.fulltext.init());
a.disabled = !1;
var c = a.value = "", f = g.watchtext(a, function(e) {
e = h.filter(e, !0);
b(e);
});
h.on("poFilter", function(e, q, l) {
c = f.val();
f.val(q || "");
b(l);
}).on("poMerge", function() {
c && h.filter(c);
});
})(document.getElementById("loco-search"));
h.on("poUnsaved", function() {
C.onbeforeunload = Fa;
}).on("poSave", function() {
O();
C.onbeforeunload = null;
}).on("poHint", ka).on("poUpdate", O).on("poMeta", function(a, b) {
b = "CODE" === b.tagName ? b : b.getElementsByTagName("CODE")[0];
return b && da ? (da.load(b.textContent), a.preventDefault(), !1) : !0;
});
D.load(v.podata);
h.load(D);
(B = h.targetLocale) ? B.isRTL() && d(F).addClass("trg-rtl") : h.unlock();
O();
delete g.conf;
v = S = null;
}
}(window, window.jQuery);
"use strict";

!function(C, d) {
function t(a) {
return g.l10n._(a);
}
function H(a, b, c) {
return g.l10n.n(a, b, c);
}
function z(a) {
return a.format(0, ".", va);
}
function wa(a) {
g.ajax.post("sync", ea, function(b) {
var c = [], f = b.pot, e = b.po, p = b.done || {
add: [],
del: [],
fuz: []
}, l = p.add.length, q = p.del.length, x = p.fuz.length, y = p.trn || 0;
D.clear().load(e);
h.load(D);
if (l || q || x || y) {
if (f ? c.push(u(t("Merged from %s"), f)) : c.push(t("Merged from source code")), 
l && c.push(u(H("%s new string added", "%s new strings added", l), z(l))), q && c.push(u(H("%s obsolete string removed", "%s obsolete strings removed", q), z(q))), 
x && c.push(u(H("%s string marked Fuzzy", "%s strings marked Fuzzy", x), z(x))), 
y && c.push(u(H("%s translation copied", "%s translations copied", y), z(y))), d(F).trigger("poUnsaved", []), 
O(), xa && C.console) {
f = console;
e = -1;
for (l = p.add.length; ++e < l; ) f.log(" + " + String(p.add[e]));
l = p.del.length;
for (e = 0; e < l; e++) f.log(" - " + String(p.del[e]));
l = p.fuz.length;
for (e = 0; e < l; e++) f.log(" ~ " + String(p.fuz[e]));
}
} else f ? c.push(u(t("Strings up to date with %s"), f)) : c.push(t("Strings up to date with source code"));
g.notices.success(c.join(". "));
d(F).trigger("poMerge", [ b ]);
a && a();
}, a);
}
function fa() {
for (var a = -1, b, c = [], f = I, e = f.length, p = String(ya); ++a < e; ) try {
b = f[a], null == b.src && (b.src = p), c.push(g.apis.create(b));
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
var n = d(k.api).val();
for (var K, L = U || (U = fa()), V = L.length, R = -1; ++R < V; ) if (K = L[R], 
K.getId() === n) {
n = K;
break a;
}
g.notices.error("No " + n + " client");
n = void 0;
}
k = k.existing.checked;
M.text("Calculating....");
e = n.createJob();
e.init(D, k);
p = n.toString();
M.text(u(t("%s unique source strings."), z(e.length)) + " " + u(t("%s characters will be sent for translation."), z(e.chars)));
v[0].disabled = e.length ? !1 : !0;
l = null;
}
function b(k) {
e && (x && k.fuzzy(0, !0), h.pasteMessage(k), k === h.active && h.setStatus(k), 
h.unsave(k, 0), q++);
}
function c(k, n) {
k = n ? 100 * k / n : 0;
M.text(u(t("Translation progress %s%%"), z(k)));
}
function f() {
v.removeClass("loco-loading");
if (e && l) {
var k = l.todo();
k && g.notices.warn(u(H("Translation job aborted with %s string remaining", "Translation job aborted with %s strings remaining", k), z(k))).slow();
k = [];
var n = l.did();
n && k.push(u(H("%1$s string translated via %2$s", "%1$s strings translated via %2$s", n), z(n), p));
q ? k.push(u(H("%s string updated", "%s strings updated", q), z(q))) : n && k.push(t("Nothing needed updating"));
k.length && g.notices.success(k.join(". ")).slow();
l = e = null;
}
q && (O(), h.rebuildSearch());
y && (y.off("dialogclose").dialog("close"), y = null);
h.fire("poAuto");
}
var e, p, l, q = 0, x = !1, y = P.dialog("open"), J = y.find("form"), v = J.find("button.button-primary"), M = d("#loco-job-progress");
v.removeClass("loco-loading");
v[0].disabled = !0;
g.notices.clear();
J.off("submit change");
a(J[0]);
J.on("change", function(k) {
k = k.target;
var n = k.name;
"api" !== n && "existing" !== n || a(k.form);
return !0;
}).on("submit", function(k) {
k.preventDefault();
v.addClass("loco-loading");
v[0].disabled = !0;
q = 0;
c(0);
x = k.target.fuzzy.checked;
l = e.dispatch().done(f).each(b).prog(c).stat();
});
y.off("dialogclose").on("dialogclose", function() {
e.abort();
y = null;
f();
});
}
function za() {
function a(m) {
if (m.isDefaultPrevented()) return !1;
var w = m.which - 49;
return 0 <= w && 10 > w && (w = v && v.find("button.button-primary").eq(w)) && 1 === w.length ? (m.preventDefault(), 
m.stopPropagation(), w.click(), !1) : !0;
}
function b(m, w) {
return function(A) {
A.preventDefault();
A.stopPropagation();
e();
A = h.current();
var E = h.getTargetOffset();
A && A.source(null, E) === m ? (A.translate(w, E), h.focus().reloadMessage(A)) : g.notices.warn("Source changed since suggestion");
};
}
function c(m, w, A, E) {
var Y = E.getId(), Z = R[Y], ma = String(Z + 1), Ca = E.getUrl(), na = t("Use this translation");
E = String(E);
var oa = L && L[Y];
m = d('<button class="button button-primary"></button>').attr("tabindex", String(1 + J + Z)).on("click", b(m, w));
m.attr("accesskey", ma);
1 < M.length && (na += " (" + ma + ")");
m.text(na);
oa && oa.replaceWith(d('<div class="loco-api loco-api-' + Y + '"></div>').append(d('<a class="loco-api-credit" target="_blank" tabindex="-1"></a>').attr("href", Ca).text(E)).append(d("<blockquote " + y + "></blockquote>").text(w || "FAILED")).append(m));
++V === k && (v && v.dialog("option", "title", t("Suggested translations") + " — " + A.label), 
J += V);
0 === Z && m.focus();
}
function f(m) {
var w = d('<div class="loco-api loco-api-loading"></div>').text("Calling " + m + " ...");
return L[m.getId()] = w;
}
function e(m) {
v && null == m && v.dialog("close");
L = v = null;
d(C).off("keydown", a);
}
function p(m) {
return function(w, A, E) {
K[m.getId()] = A;
c(w, A, E, m);
};
}
var l = h.current(), q = h.getTargetOffset(), x = l && l.source(null, q), y = 'lang="' + String(B) + '" dir="' + (B.isRTL() ? "RTL" : "LTR") + '"', J = 99;
if (!x) return !1;
var v = (Q || (Q = X("loco-apis-hint", "<div></div>"))).html("").append(d('<div class="loco-api"><p>Source text:</p></div>').append(d('<blockquote lang="en"></blockquote>').text(x))).dialog("option", "title", t("Loading suggestions") + "...").off("dialogclose").on("dialogclose", e).dialog("open");
(l = l.translation(q)) && d('<div class="loco-api"><p>Current translation:</p></div>').append(d("<blockquote " + y + "></blockquote>").text(l)).append(d('<button class="button"></button>').attr("tabindex", String(++J)).text(t("Keep this translation")).on("click", function(m) {
m.preventDefault();
e();
})).appendTo(v);
for (var M = U || (U = fa()), k = M.length, n = -1, K = pa[x] || (pa[x] = {}), L = {}, V = 0, R = {}; ++n < k; ) l = M[n], 
v.append(f(l)), q = l.getId(), R[q] = n, K[q] ? c(x, K[q], B, l) : l.translate(x, B, p(l));
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
return t("Your changes will be lost if you continue without saving");
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
}, r.project || {});
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
var b = r.project;
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
b = u(H("%s string", "%s strings", b), z(b));
var e = [];
B && (b = u(t("%s%% translated"), a.p.replace("%", "")) + ", " + b, c && e.push(u(t("%s fuzzy"), z(c))), 
f && e.push(u(t("%s untranslated"), z(f))), e.length && (b += " (" + e.join(", ") + ")"));
d("#loco-po-status").text(b);
}
var g = C.loco, r = g && g.conf, F = document.getElementById("loco-editor-inner");
if (g && r && F) {
var xa = !!r.WP_DEBUG, da = g.po.ref && g.po.ref.init(g, r), ea = null, ra = null, aa = r.multipart, Na = g.l10n, u = g.string.sprintf, va = r.wpnum && r.wpnum.thousands_sep || ",", B = r.locale, D = g.po.init(B).wrap(r.powrap), T = !B, ya = g.locale.clone(r.source || {
lang: "en"
}), Oa = document.getElementById("loco-actions"), ba = r.popath, Ia = r.potpath, Ja = r.syncmode, G = document.getElementById("loco-fs"), sa = G && g.fs.init(G), ia = r.readonly;
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
h.on("poFilter", function(e, p, l) {
c = f.val();
f.val(p || "");
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
D.load(r.podata);
h.load(D);
(B = h.targetLocale) ? B.isRTL() && d(F).addClass("trg-rtl") : h.unlock();
O();
delete g.conf;
r = S = null;
}
}(window, window.jQuery);
"use strict";

(function(L, N, C, ma) {
const D = function() {
const w = {};
return {
register: function(r, G) {
w[r] = G;
},
require: function(r) {
var G;
if (!(G = w[r])) throw Error("Bad module [" + r + "]");
return G;
},
include: function(r) {
return w[r];
},
noop: function() {}
};
}();
D.register("1", function(w, r, G) {
function y(q) {
const u = typeof q;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(q)) console.error("Invalid plural: " + q); else return new Function("n", "return " + q);
"function" !== u && (q = function(d) {
return 1 != d;
});
return q;
}
w.init = function(q) {
function u(k, l, p) {
return (k = f[k]) && k[p] ? k[p] : l || "";
}
function d(k) {
return u(k, k, 0);
}
function b(k, l) {
return u(l + "" + k, k, 0);
}
function h(k, l, p) {
p = Number(q(p));
isNaN(p) && (p = 0);
return u(k, p ? l : k, p);
}
q = y(q);
let f = {};
return {
__: d,
_x: b,
_n: h,
_: d,
x: b,
n: h,
load: function(k) {
f = k || {};
return this;
},
pluraleq: function(k) {
q = y(k);
return this;
}
};
};
return w;
}({}, L, N));
D.register("2", function(w, r, G) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, L, N));
D.register("3", function(w, r, G) {
Number.prototype.format = function(y, q, u) {
var d = Math.pow(10, y || 0);
y = [];
d = String(Math.round(d * this) / d);
var b = d.split(".");
d = b[0];
b = b[1];
let h = d.length;
do {
y.unshift(d.substring(h - 3, h));
} while (0 < (h -= 3));
d = y.join(u || ",");
if (b) {
{
u = b;
y = u.length;
let f;
for (;"0" === u.charAt(--y); ) f = y;
f && (u = u.substring(0, f));
b = u;
}
b && (d += (q || ".") + b);
}
return d;
};
Number.prototype.percent = function(y) {
let q = 0, u = this && y ? this / y * 100 : 0;
if (0 === u) return "0";
if (100 === u) return "100";
if (99 < u) u = Math.min(u, 99.9), y = u.format(++q); else if (.5 > u) {
u = Math.max(u, 1e-4);
do {
y = u.format(++q);
} while ("0" === y && 4 > q);
y = y.substring(1);
} else y = u.format(0);
return y;
};
return w;
}({}, L, N));
D.register("4", function(w, r, G) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var q = Object(this), u = q.length >>> 0;
if (0 === u) return -1;
var d = 0;
1 < arguments.length && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && Infinity != d && -Infinity != d && (d = (0 < d || -1) * Math.floor(Math.abs(d))));
if (d >= u) return -1;
for (d = 0 <= d ? d : Math.max(u - Math.abs(d), 0); d < u; d++) if (d in q && q[d] === y) return d;
return -1;
});
return w;
}({}, L, N));
D.register("5", function(w, r, G) {
G = r.JSON;
G || (G = {
parse: C.parseJSON,
stringify: null
}, r.JSON = G);
w.parse = G.parse;
w.stringify = G.stringify;
return w;
}({}, L, N));
D.register("6", function(w, r, G) {
w.trim = function(y, q) {
for (q || (q = " \n"); y && -1 !== q.indexOf(y.charAt(0)); ) y = y.substring(1);
for (;y && -1 !== q.indexOf(y.slice(-1)); ) y = y.substring(0, y.length - 1);
return y;
};
w.sprintf = function(y) {
return w.vsprintf(y, [].slice.call(arguments, 1));
};
w.vsprintf = function(y, q) {
let u = 0;
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, b, h) {
if ("%" === h) return "%";
d = b ? q[Number(b) - 1] : q[u++];
return null != d ? String(d) : "s" === h ? "" : "0";
});
};
w.html = function() {
function y(l) {
return "&" + (f[l] || "#" + l.charCodeAt(0)) + ";";
}
function q(l, p) {
return '<a href="' + l + '" target="' + (p.indexOf(h) ? "_blank" : "_top") + '">' + p + "</a>";
}
let u, d, b, h, f, k = function() {
u = /[<>&"']/g;
f = {
"<": "lt",
">": "gt",
"&": "amp",
'"': "quot",
"'": "apos"
};
d = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
h = location.hostname;
k = null;
};
return function(l, p) {
k && k();
l = l.replace(u, y);
p && (l = l.replace(b, q).replace(d, "<br />"));
return l;
};
}();
return w;
}({}, L, N));
D.register("1a", function(w, r, G) {
function y(q) {
return function(u, d) {
let b = u[q] || 0;
for (;(u = u.offsetParent) && u !== (d || G.body); ) b += u[q] || 0;
return b;
};
}
w.top = y("offsetTop");
w.left = y("offsetLeft");
w.el = function(q, u) {
q = G.createElement(q || "div");
u && (q.className = u);
return q;
};
w.txt = function(q) {
return G.createTextNode(q || "");
};
w.rect = function(q) {
return q.getBoundingClientRect();
};
return w;
}({}, L, N));
D.register("7", function(w, r, G) {
function y(c, e, n) {
function m() {
t();
z = setTimeout(e, n);
}
function t() {
z && clearTimeout(z);
z = 0;
}
let z = 0;
m();
C(c).on("mouseenter", t).on("mouseleave", m);
return {
die: function() {
t();
C(c).off("mouseenter mouseleave");
}
};
}
function q(c, e) {
c.fadeTo(e, 0, function() {
c.slideUp(e, function() {
c.remove();
C(r).triggerHandler("resize");
});
});
return c;
}
function u(c, e) {
function n(F) {
p[B] = null;
q(C(c), 250);
z && z.die();
var H;
if (H = F) F.stopPropagation(), F.preventDefault(), H = !1;
return H;
}
function m(F) {
z && z.die();
return z = y(c, n, F);
}
const t = C(c);
let z, B, A, E = t.find("button");
0 === E.length && (t.addClass("is-dismissible"), E = C('<button type="button" class="notice-dismiss"> </a>').appendTo(t));
E.off("click").on("click", n);
C(r).triggerHandler("resize");
l();
B = p.length;
p.push(n);
e && (z = m(e));
return {
link: function(F, H) {
var I = H || F;
H = C(c).find("nav");
F = C("<nav></nav>").append(C("<a></a>").attr("href", F).text(I));
A ? (A.push(F.html()), H.html(A.join("<span> | </span>"))) : (A = [ F.html() ], 
C(c).addClass("has-nav").append(F));
return this;
},
stick: function() {
z && z.die();
z = null;
p[B] = null;
return this;
},
slow: function(F) {
m(F || 1e4);
return this;
}
};
}
function d(c, e, n) {
const m = D.require("1a").el;
c = C('<div class="notice notice-' + c + ' loco-notice inline"></div>').prependTo(C("#loco-notices"));
const t = C(m("p"));
n = C(m("span")).text(n);
e = C(m("strong", "has-icon")).text(e + ": ");
t.append(e).append(n).appendTo(c);
return c;
}
function b(c, e, n, m) {
c = d(n, e, c).css("opacity", "0").fadeTo(500, 1);
C(r).triggerHandler("resize");
return u(c, m);
}
function h(c) {
return b(c, v, "warning");
}
function f() {
C("#loco-notices").find("div.notice").each(function(c, e) {
-1 === e.className.indexOf("jshide") && (c = -1 === e.className.indexOf("notice-success") ? null : 5e3, 
u(e, c));
});
}
const k = r.console || {
log: function() {}
}, l = Date.now || function() {
return new Date().getTime();
};
let p = [], x, v, g, a;
w.error = function(c) {
return b(c, x, "error");
};
w.warn = h;
w.info = function(c) {
return b(c, g, "info");
};
w.success = function(c) {
return b(c, a, "success", 5e3);
};
w.warning = h;
w.log = function() {
k.log.apply(k, arguments);
};
w.debug = function() {
(k.debug || k.log).apply(k, arguments);
};
w.clear = function() {
let c = -1;
const e = p, n = e.length;
for (;++c < n; ) {
const m = e[c];
m && m.call && m();
}
p = [];
return w;
};
w.create = d;
w.raise = function(c) {
(w[c.type] || w.error).call(w, c.message);
};
w.convert = u;
w.init = function(c) {
x = c._("Error");
v = c._("Warning");
g = c._("Notice");
a = c._("OK");
setTimeout(f, 1e3);
return w;
};
return w;
}({}, L, N));
D.register("8", function(w, r, G) {
function y(m) {
let t = C("<pre>" + m + "</pre>").text();
t && (t = t.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
t || (t = m) || (t = "Blank response from server");
return t;
}
function q(m) {
return (m = m.split(/[\r\n]/)[0]) ? (m = m.replace(/ +in +\S+ on line \d+/, ""), 
m = m.replace(/^[()! ]+Fatal error:\s*/, "")) : e._("Server returned invalid data");
}
function u(m) {
if (!c) return D.require("7").error("Session disconnected. Retry after reconnect"), 
p(), "";
const t = a[m] || "";
"" === t && D.require("7").error('No nonce for "' + m + '"');
return t;
}
function d(m, t, z) {
m[t] = z;
}
function b(m, t, z) {
m.push({
name: t,
value: z
});
}
function h(m, t, z) {
m.append(t, z);
}
function f(m, t, z, B) {
function A(F, H, I) {
if ("abort" !== H) {
if (401 === F.status) c = !1, v(""), x(), p(), E.error("Session disconnected. Retry after reconnect"); else {
var M = e || {
_: function(ka) {
return ka;
}
}, P = F.status || 0, J = F.responseText || "", Q = y(J), W = F.getResponseHeader("Content-Type") || "Unknown type", X = F.getResponseHeader("Content-Length") || J.length;
"success" === H && I ? E.error(I) : (E.error(q(Q) + ".\n" + M._("Check console output for debugging information")), 
E.log("Ajax failure for " + m, {
status: P,
error: H,
message: I,
output: J
}), "parsererror" === H && (I = "Response not JSON"), E.log([ M._("Provide the following text when reporting a problem") + ":", "----", "Status " + P + ' "' + (I || M._("Unknown error")) + '" (' + W + " " + X + " bytes)", Q, "====" ].join("\n")));
}
z && z.call && z(F, H, I);
n = F;
}
}
B.url = g;
B.dataType = "json";
const E = D.require("7").clear();
n = null;
return C.ajax(B).fail(A).done(function(F, H, I) {
const M = F && F.data, P = F && F.notices, J = P && P.length;
!M || F.error ? A(I, H, F && F.error && F.error.message) : t && t(M, H, I);
for (F = -1; ++F < J; ) E.raise(P[F]);
});
}
function k(m) {
C(m).on("heartbeat-send", function(t, z) {
z["loco-translate"] = {
nonces: a
};
}).on("heartbeat-tick", function(t, z) {
(t = (z && z["loco-translate"] || {}).nonces) ? (a = t, c || (c = !0, (z = l()) && 5 === z.interval() && z.interval("fast", 1))) : z && (z.nonces_expired || !1 === z["wp-auth-check"]) && (c = !1, 
v(""), x());
});
m.addEventListener("load", function(t) {
t = t.target;
if (!c && t && "wp-auth-check-frame" === t.id) try {
const z = t.contentDocument && t.contentDocument.body;
z && -1 !== z.className.indexOf("interim-login-success") && p();
} catch (z) {}
}, !0);
}
function l() {
const m = r.wp;
return m && m.heartbeat;
}
function p() {
const m = l();
m && m.connectNow();
}
function x() {
const m = l();
m && m.interval("fast", 30);
}
function v(m) {
for (const t in a) a[t] = m;
}
const g = r.ajaxurl || "/wp-admin/admin-ajax.php";
let a = {}, c = !1, e, n;
w.init = function(m) {
a = m.nonces || a;
c = !0;
k(G);
return w;
};
w.localise = function(m) {
e = m;
return w;
};
w.xhr = function() {
return n;
};
w.strip = y;
w.parse = q;
w.submit = function(m, t, z) {
function B(I, M) {
M.disabled ? M.setAttribute("data-was-disabled", "true") : M.disabled = !0;
}
function A(I, M) {
M.getAttribute("data-was-disabled") || (M.disabled = !1);
}
function E(I) {
I.find(".button-primary").removeClass("loading");
I.find("button").each(A);
I.find("input").each(A);
I.find("select").each(A);
I.find("textarea").each(A);
I.removeClass("disabled loading");
}
const F = C(m), H = F.serialize();
(function(I) {
I.find(".button-primary").addClass("loading");
I.find("button").each(B);
I.find("input").each(B);
I.find("select").each(B);
I.find("textarea").each(B);
I.addClass("disabled loading");
})(F);
return f(m.route.value, function(I, M, P) {
E(F);
t && t(I, M, P);
}, function(I, M, P) {
E(F);
z && z(I, M, P);
}, {
type: m.method,
data: H
});
};
w.post = function(m, t, z, B) {
let A = !0, E = t || {}, F = u(m);
r.FormData && E instanceof FormData ? (A = !1, t = h) : t = Array.isArray(E) ? b : d;
t(E, "action", "loco_json");
t(E, "route", m);
t(E, "loco-nonce", F);
return f(m, z, B, {
type: "post",
data: E,
processData: A,
contentType: A ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(m, t, z, B) {
t = t || {};
const A = u(m);
t.action = "loco_json";
t.route = m;
t["loco-nonce"] = A;
return f(m, z, B, {
type: "get",
data: t
});
};
w.setNonce = function(m, t) {
a[m] = t;
return w;
};
return w;
}({}, L, N));
D.register("1b", {
arab: 1,
aran: 1,
hebr: 1,
nkoo: 1,
syrc: 1,
syrn: 1,
syrj: 1,
syre: 1,
samr: 1,
mand: 1,
mend: 1,
thaa: 1,
adlm: 1,
cprt: 1,
phnx: 1,
armi: 1,
prti: 1,
phli: 1,
phlp: 1,
phlv: 1,
avst: 1,
mani: 1,
khar: 1,
orkh: 1,
ital: 1,
lydi: 1,
aao: 1,
abh: 1,
abv: 1,
acm: 1,
acq: 1,
acw: 1,
acx: 1,
acy: 1,
adf: 1,
aeb: 1,
aec: 1,
afb: 1,
ajp: 1,
apc: 1,
apd: 1,
ar: 1,
arb: 1,
arq: 1,
ars: 1,
ary: 1,
arz: 1,
auz: 1,
avl: 1,
ayh: 1,
ayl: 1,
ayn: 1,
ayp: 1,
dv: 1,
fa: 1,
he: 1,
nqo: 1,
pbt: 1,
pbu: 1,
pes: 1,
pga: 1,
prs: 1,
ps: 1,
pst: 1,
shu: 1,
ssh: 1,
ur: 1,
ydd: 1,
yi: 1,
yih: 1
});
D.register("9", function(w, r, G) {
function y() {}
const q = D.require("1b");
let u;
w.init = function() {
return new y();
};
w.cast = function(d) {
return d instanceof y ? d : "string" === typeof d ? w.parse(d) : w.clone(d);
};
w.clone = function(d) {
const b = new y();
for (const h in d) b[h] = d[h];
return b;
};
w.parse = function(d) {
d = (u || (u = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(d);
if (!d) return null;
const b = new y();
b.lang = d[1].toLowerCase();
b.region = (d[2] || "").toUpperCase();
b.variant = (d[3] || "").toLowerCase();
return b;
};
r = y.prototype;
r.isValid = function() {
return !!this.lang;
};
r.isKnown = function() {
const d = this.lang;
return d && "zxx" !== d;
};
r.toString = function(d) {
d = d || "_";
let b = this.lang || "zxx";
this.region && (b += d + this.region);
this.variant && (b += d + this.variant);
return b;
};
r.getIcon = function() {
let d = 3, b = [];
const h = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const f = h[d], k = this[f];
k && (b.push(f), b.push(f + "-" + k.toLowerCase()));
}
return b.join(" ");
};
r.isRTL = function() {
return !!q[String(this.lang).toLowerCase()];
};
r = null;
return w;
}({}, L, N));
D.register("1c", {
"á": "a",
"à": "a",
"ă": "a",
"ắ": "a",
"ằ": "a",
"ẵ": "a",
"ẳ": "a",
"â": "a",
"ấ": "a",
"ầ": "a",
"ẫ": "a",
"ẩ": "a",
"ǎ": "a",
"å": "a",
"ǻ": "a",
"ä": "a",
"ǟ": "a",
"ã": "a",
"ȧ": "a",
"ǡ": "a",
"ą": "a",
"ā": "a",
"ả": "a",
"ȁ": "a",
"ȃ": "a",
"ạ": "a",
"ặ": "a",
"ậ": "a",
"ḁ": "a",
"ǽ": "æ",
"ǣ": "æ",
"ḃ": "b",
"ḅ": "b",
"ḇ": "b",
"ć": "c",
"ĉ": "c",
"č": "c",
"ċ": "c",
"ç": "c",
"ḉ": "c",
"ď": "d",
"ḋ": "d",
"ḑ": "d",
"đ": "d",
"ḍ": "d",
"ḓ": "d",
"ḏ": "d",
"ð": "d",
"ꝺ": "d",
"ǆ": "ǳ",
"é": "e",
"è": "e",
"ĕ": "e",
"ê": "e",
"ế": "e",
"ề": "e",
"ễ": "e",
"ể": "e",
"ě": "e",
"ë": "e",
"ẽ": "e",
"ė": "e",
"ȩ": "e",
"ḝ": "e",
"ę": "e",
"ē": "e",
"ḗ": "e",
"ḕ": "e",
"ẻ": "e",
"ȅ": "e",
"ȇ": "e",
"ẹ": "e",
"ệ": "e",
"ḙ": "e",
"ḛ": "e",
"ḟ": "f",
"ꝼ": "f",
"ǵ": "g",
"ğ": "g",
"ĝ": "g",
"ǧ": "g",
"ġ": "g",
"ģ": "g",
"ḡ": "g",
"ꞡ": "g",
"ᵹ": "g",
"ĥ": "h",
"ȟ": "h",
"ḧ": "h",
"ḣ": "h",
"ḩ": "h",
"ħ": "h",
"ℏ": "h",
"ḥ": "h",
"ḫ": "h",
"ẖ": "h",
"í": "i",
"ì": "i",
"ĭ": "i",
"î": "i",
"ǐ": "i",
"ï": "i",
"ḯ": "i",
"ĩ": "i",
"į": "i",
"ī": "i",
"ỉ": "i",
"ȉ": "i",
"ȋ": "i",
"ị": "i",
"ḭ": "i",
"ĵ": "j",
"ǰ": "j",
"ḱ": "k",
"ǩ": "k",
"ķ": "k",
"ꞣ": "k",
"ḳ": "k",
"ḵ": "k",
"ĺ": "l",
"ľ": "l",
"ļ": "l",
"ł": "l",
"ḷ": "l",
"ḹ": "l",
"ḽ": "l",
"ḻ": "l",
"ŀ": "l",
"ḿ": "m",
"ṁ": "m",
"ṃ": "m",
"ń": "n",
"ǹ": "n",
"ň": "n",
"ñ": "n",
"ṅ": "n",
"ņ": "n",
"ꞥ": "n",
"ṇ": "n",
"ṋ": "n",
"ṉ": "n",
"ó": "o",
"ò": "o",
"ŏ": "o",
"ô": "o",
"ố": "o",
"ồ": "o",
"ỗ": "o",
"ổ": "o",
"ǒ": "o",
"ö": "o",
"ȫ": "o",
"ő": "o",
"õ": "o",
"ṍ": "o",
"ṏ": "o",
"ȭ": "o",
"ȯ": "o",
"ȱ": "o",
"ø": "o",
"ǿ": "o",
"ǫ": "o",
"ǭ": "o",
"ō": "o",
"ṓ": "o",
"ṑ": "o",
"ỏ": "o",
"ȍ": "o",
"ȏ": "o",
"ơ": "o",
"ớ": "o",
"ờ": "o",
"ỡ": "o",
"ở": "o",
"ợ": "o",
"ọ": "o",
"ộ": "o",
"ṕ": "p",
"ṗ": "p",
"ŕ": "r",
"ř": "r",
"ṙ": "r",
"ŗ": "r",
"ꞧ": "r",
"ȑ": "r",
"ȓ": "r",
"ṛ": "r",
"ṝ": "r",
"ṟ": "r",
"ꞃ": "r",
"ś": "s",
"ṥ": "s",
"ŝ": "s",
"š": "s",
"ṧ": "s",
"ṡ": "s",
"ş": "s",
"ꞩ": "s",
"ṣ": "s",
"ṩ": "s",
"ș": "s",
"ſ": "s",
"ꞅ": "s",
"ẛ": "s",
"ť": "t",
"ẗ": "t",
"ṫ": "t",
"ţ": "t",
"ṭ": "t",
"ț": "t",
"ṱ": "t",
"ṯ": "t",
"ꞇ": "t",
"ú": "u",
"ù": "u",
"ŭ": "u",
"û": "u",
"ǔ": "u",
"ů": "u",
"ü": "u",
"ǘ": "u",
"ǜ": "u",
"ǚ": "u",
"ǖ": "u",
"ű": "u",
"ũ": "u",
"ṹ": "u",
"ų": "u",
"ū": "u",
"ṻ": "u",
"ủ": "u",
"ȕ": "u",
"ȗ": "u",
"ư": "u",
"ứ": "u",
"ừ": "u",
"ữ": "u",
"ử": "u",
"ự": "u",
"ụ": "u",
"ṳ": "u",
"ṷ": "u",
"ṵ": "u",
"ṽ": "v",
"ṿ": "v",
"ẃ": "w",
"ẁ": "w",
"ŵ": "w",
"ẘ": "w",
"ẅ": "w",
"ẇ": "w",
"ẉ": "w",
"ẍ": "x",
"ẋ": "x",
"ý": "y",
"ỳ": "y",
"ŷ": "y",
"ẙ": "y",
"ÿ": "y",
"ỹ": "y",
"ẏ": "y",
"ȳ": "y",
"ỷ": "y",
"ỵ": "y",
"ź": "z",
"ẑ": "z",
"ž": "z",
"ż": "z",
"ẓ": "z",
"ẕ": "z",
"ǯ": "ʒ",
"ἀ": "α",
"ἄ": "α",
"ᾄ": "α",
"ἂ": "α",
"ᾂ": "α",
"ἆ": "α",
"ᾆ": "α",
"ᾀ": "α",
"ἁ": "α",
"ἅ": "α",
"ᾅ": "α",
"ἃ": "α",
"ᾃ": "α",
"ἇ": "α",
"ᾇ": "α",
"ᾁ": "α",
"ά": "α",
"ά": "α",
"ᾴ": "α",
"ὰ": "α",
"ᾲ": "α",
"ᾰ": "α",
"ᾶ": "α",
"ᾷ": "α",
"ᾱ": "α",
"ᾳ": "α",
"ἐ": "ε",
"ἔ": "ε",
"ἒ": "ε",
"ἑ": "ε",
"ἕ": "ε",
"ἓ": "ε",
"έ": "ε",
"έ": "ε",
"ὲ": "ε",
"ἠ": "η",
"ἤ": "η",
"ᾔ": "η",
"ἢ": "η",
"ᾒ": "η",
"ἦ": "η",
"ᾖ": "η",
"ᾐ": "η",
"ἡ": "η",
"ἥ": "η",
"ᾕ": "η",
"ἣ": "η",
"ᾓ": "η",
"ἧ": "η",
"ᾗ": "η",
"ᾑ": "η",
"ή": "η",
"ή": "η",
"ῄ": "η",
"ὴ": "η",
"ῂ": "η",
"ῆ": "η",
"ῇ": "η",
"ῃ": "η",
"ἰ": "ι",
"ἴ": "ι",
"ἲ": "ι",
"ἶ": "ι",
"ἱ": "ι",
"ἵ": "ι",
"ἳ": "ι",
"ἷ": "ι",
"ί": "ι",
"ί": "ι",
"ὶ": "ι",
"ῐ": "ι",
"ῖ": "ι",
"ϊ": "ι",
"ΐ": "ι",
"ΐ": "ι",
"ῒ": "ι",
"ῗ": "ι",
"ῑ": "ι",
"ὀ": "ο",
"ὄ": "ο",
"ὂ": "ο",
"ὁ": "ο",
"ὅ": "ο",
"ὃ": "ο",
"ό": "ο",
"ό": "ο",
"ὸ": "ο",
"ῤ": "ρ",
"ῥ": "ρ",
"ὐ": "υ",
"ὔ": "υ",
"ὒ": "υ",
"ὖ": "υ",
"ὑ": "υ",
"ὕ": "υ",
"ὓ": "υ",
"ὗ": "υ",
"ύ": "υ",
"ύ": "υ",
"ὺ": "υ",
"ῠ": "υ",
"ῦ": "υ",
"ϋ": "υ",
"ΰ": "υ",
"ΰ": "υ",
"ῢ": "υ",
"ῧ": "υ",
"ῡ": "υ",
"ὠ": "ω",
"ὤ": "ω",
"ᾤ": "ω",
"ὢ": "ω",
"ᾢ": "ω",
"ὦ": "ω",
"ᾦ": "ω",
"ᾠ": "ω",
"ὡ": "ω",
"ὥ": "ω",
"ᾥ": "ω",
"ὣ": "ω",
"ᾣ": "ω",
"ὧ": "ω",
"ᾧ": "ω",
"ᾡ": "ω",
"ώ": "ω",
"ώ": "ω",
"ῴ": "ω",
"ὼ": "ω",
"ῲ": "ω",
"ῶ": "ω",
"ῷ": "ω",
"ῳ": "ω",
"ґ": "г",
"ѐ": "е",
"ё": "е",
"ӂ": "ж",
"ѝ": "и",
"ӣ": "и",
"ӯ": "у"
});
D.register("a", function(w, r, G) {
w.init = function() {
function y(a) {
return p[a] || a;
}
function q(a, c, e) {
a = String(a || "").toLowerCase().replace(l, y).split(x);
const n = a.length;
let m = -1;
a: for (;++m < n; ) {
var t = a[m];
if (t && null == e[t]) {
const E = [];
var z = t.length;
let F = 0;
do {
var B = v.exec(t);
if (B) {
B = B[0];
var A = B.length;
if (F) for (let H = 0; H < F; H++) E[H] += B; else if (A === z) {
null == e[B] && (c.push(B), e[B] = !0);
continue a;
}
E.push(B);
F++;
t = t.substring(A);
if ("" === t) break;
}
if (B = g.exec(t)) {
B = B[0];
if (F) for (A = 0; A < F; A++) E[A] += B; else E.push(B), F++;
t = t.substring(B.length);
}
} while ("" !== t);
for (t = 0; t < E.length; t++) z = E[t], null == e[z] && (c.push(z), e[z] = !0);
}
}
return c;
}
function u(a) {
return q(a, [], {});
}
function d(a) {
let c = [], e = {}, n = a.length;
for (;0 !== n--; ) q(a[n], c, e);
return c;
}
function b() {
k = "";
f = [];
}
let h = [], f = [], k = "";
const l = /[^a-z0-9]/g, p = D.require("1c"), x = /\s+/, v = /^[\d\p{L}]+/u, g = /^[^\d\p{L}]+/u;
return {
split: u,
find: function(a, c) {
const e = [], n = [], m = String(a || "").toLowerCase().replace(l, y).split(" "), t = m.length, z = k && a.substring(0, k.length) === k ? f : h, B = z.length, A = !!c;
let E = -1, F = 0;
a: for (;++E < B; ) {
const H = z[E], I = H && H.length;
if (I) {
b: for (let M = 0; M < t; M++) {
const P = m[M];
for (let J = 0; J < I; J++) if (0 === H[J].indexOf(P)) continue b;
continue a;
}
n[E] = H;
e.push(A ? c[E] : E);
} else F++;
}
k = a;
f = n;
return e;
},
add: function(a, c) {
h[a] = u(c);
k && b();
},
push: function(a) {
h[h.length] = d(a);
k && b();
},
index: function(a, c) {
h[a] = d(c);
k && b();
},
size: function() {
return h.length;
},
clear: function() {
h = [];
k && b();
},
remove: function(a) {
h[a] = null;
k && b();
},
noop: function() {
b();
return [];
}
};
};
return w;
}({}, L, N));
D.register("b", function(w, r, G) {
w.listen = function(y, q) {
function u() {
v[f ? "show" : "hide"]();
}
function d(g) {
x && p.setAttribute("size", 2 + g.length);
f = g;
u();
return g;
}
function b() {
k = null;
q(f);
}
function h(g) {
let a = p.value;
a !== f ? (k && clearTimeout(k), d(a), g ? k = setTimeout(b, g) : b()) : k && null == g && (clearTimeout(k), 
b());
}
let f, k, l = 150;
const p = y instanceof jQuery ? y[0] : y, x = 1 === Number(p.size), v = C('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(g) {
g.preventDefault();
p.value = "";
h();
C(p).triggerHandler("blur");
return !1;
});
d(p.value);
C(p).on("input", function() {
h(l);
return !0;
}).on("blur focus change", function() {
h(null);
return !0;
}).after(v);
u();
return {
delay: function(g) {
l = g;
return this;
},
ping: function(g) {
g ? (k && clearTimeout(k), d(p.value), b(), g = void 0) : g = h();
return g;
},
val: function(g) {
if (null == g) return f;
k && clearTimeout(k);
p.value = d(g);
u();
},
el: function() {
return p;
},
blur: function(g) {
return C(p).on("blur", g);
},
destroy: function() {
k && clearTimeout(k);
}
};
};
return w;
}({}, L, N));
D.register("c", function(w, r, G) {
function y(b, h) {
return "function" == typeof b ? b.call(h) : b;
}
function q(b, h) {
this.$element = C(b);
this.options = h;
this.enabled = !0;
this.fixTitle();
}
w.init = function(b, h) {
let f = {
fade: !0,
offset: 5,
delayIn: u,
delayOut: d,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
h && (f = C.extend({}, f, h));
b.tipsy(f);
};
w.delays = function(b, h) {
u = b || 150;
d = h || 100;
};
w.kill = function() {
C("div.tipsy").remove();
};
w.text = function(b, h) {
h.data("tipsy").setTitle(b);
};
let u, d;
w.delays();
C(G.body).on("overlayOpened overlayClosing", function() {
w.kill();
return !0;
});
q.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
const f = this.tip();
f.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
f[0].className = "tipsy";
f.remove().css({
top: 0,
left: 0
}).prependTo(G.body);
b = f[0].offsetWidth;
const k = f[0].offsetHeight, l = y(this.options.gravity, this.$element[0]);
var h = this.options.anchor;
h = h ? this.$element.find(h) : this.$element;
h = C.extend({}, h.offset(), {
width: h[0].offsetWidth,
height: h[0].offsetHeight
});
let p;
switch (l.charAt(0)) {
case "n":
p = {
top: h.top + h.height + this.options.offset,
left: h.left + h.width / 2 - b / 2
};
break;

case "s":
p = {
top: h.top - k - this.options.offset,
left: h.left + h.width / 2 - b / 2
};
break;

case "e":
p = {
top: h.top + h.height / 2 - k / 2,
left: h.left - b - this.options.offset
};
break;

case "w":
p = {
top: h.top + h.height / 2 - k / 2,
left: h.left + h.width + this.options.offset
};
}
2 === l.length && ("w" === l.charAt(1) ? p.left = h.left + h.width / 2 - 15 : p.left = h.left + h.width / 2 - b + 15);
f.css(p).addClass("tipsy-" + l);
f.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + l.charAt(0);
this.options.className && f.addClass(y(this.options.className, this.$element[0]));
f.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
let b = this.$element, h = b.attr("title") || "";
(h || "string" !== typeof b.attr("original-title")) && b.attr("original-title", h).removeAttr("title");
},
getTitle: function() {
let b, h = this.$element, f = this.options;
this.fixTitle();
"string" == typeof f.title ? b = h.attr("title" == f.title ? "original-title" : f.title) : "function" == typeof f.title && (b = f.title.call(h[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || f.fallback;
},
setTitle: function(b) {
let h = this.$element;
h.attr("default-title") || h.attr("default-title", this.getTitle());
null == b && (b = h.attr("default-title") || this.getTitle());
h.attr("original-title", b);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
},
tip: function() {
this.$tip || (this.$tip = C('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
this.$tip.data("tipsy-pointee", this.$element[0]));
return this.$tip;
},
validate: function() {
this.$element[0].parentNode || (this.hide(), this.options = this.$element = null);
},
enable: function() {
this.enabled = !0;
},
disable: function() {
this.hide();
this.enabled = !1;
},
toggleEnabled: function() {
this.enabled = !this.enabled;
}
};
C.fn.tipsy = function(b) {
function h(l) {
let p = C.data(l, "tipsy");
p || (p = new q(l, C.fn.tipsy.elementOptions(l, b)), C.data(l, "tipsy", p));
return p;
}
function f() {
let l = h(this), p = b.delayIn;
l.hoverState = "in";
0 == p ? l.show() : (l.fixTitle(), setTimeout(function() {
"in" == l.hoverState && l.show();
}, p));
}
function k() {
let l = h(this), p = b.delayOut;
l.hoverState = "out";
0 == p ? l.hide() : (l.tip().removeClass("in"), setTimeout(function() {
"out" == l.hoverState && l.hide();
}, p));
}
if (this.hasClass("disabled")) this.on("click", function(l) {
l.preventDefault();
return !1;
});
b = C.extend({}, C.fn.tipsy.defaults, b);
b.live || this.each(function() {
h(this);
});
if ("manual" != b.trigger) {
let l = b.live ? "live" : "bind", p = "hover" == b.trigger ? "mouseleave" : "blur";
this[l]("hover" == b.trigger ? "mouseenter" : "focus", f)[l](p, k);
}
return this;
};
C.fn.tipsy.defaults = {
className: null,
delayIn: 0,
delayOut: 0,
fade: !1,
fallback: "",
gravity: "n",
html: !1,
live: !1,
offset: 0,
opacity: .8,
title: "title",
trigger: "hover",
anchor: null
};
C.fn.tipsy.elementOptions = function(b, h) {
return C.metadata ? C.extend({}, h, C(b).metadata()) : h;
};
C.fn.tipsy.autoNS = function() {
return C(this).offset().top > C(G).scrollTop() + C(r).height() / 2 ? "s" : "n";
};
C.fn.tipsy.autoWE = function() {
return C(this).offset().left > C(G).scrollLeft() + C(r).width() / 2 ? "e" : "w";
};
C.fn.tipsy.autoBounds = function(b, h) {
return function() {
var f = h[0], k = 1 < h.length ? h[1] : !1;
let l = C(G).scrollTop() + b, p = C(G).scrollLeft() + b, x = C(this);
x.offset().top < l && (f = "n");
x.offset().left < p && (k = "w");
C(r).width() + C(G).scrollLeft() - x.offset().left < b && (k = "e");
C(r).height() + C(G).scrollTop() - x.offset().top < b && (f = "s");
return f + (k ? k : "");
};
};
return w;
}({}, L, N));
D.register("28", function(w, r, G) {
function y() {}
let q, u;
const d = D.require("1b");
w.init = function() {
return new y();
};
w.cast = function(b) {
return b instanceof y ? b : "string" === typeof b ? w.parse(b) : w.clone(b);
};
w.clone = function(b) {
const h = new y();
for (const f in b) h[f] = b[f];
return h;
};
w.parse = function(b) {
q || (u = /[-_+]/, q = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
b = String(b).split(u).join("-");
b = q.exec(b);
if (!b) return null;
const h = new y();
h.lang = b[1].toLowerCase();
b[2] && (h.script = b[2].charAt(0).toUpperCase() + b[2].substring(1).toLowerCase());
b[3] && (h.region = b[3].toUpperCase());
b[4] && (h.variant = b[4].toLowerCase());
b[5] && (h.extension = b[5]);
return h;
};
r = y.prototype;
r.isValid = function() {
return !!this.lang;
};
r.toString = function(b) {
b = b || "-";
let h, f = this.lang || "zxx";
if (h = this.script) f += b + h;
if (h = this.region) f += b + h;
if (h = this.variant) f += b + h;
if (h = this.extension) f += b + h;
return f;
};
r.getIcon = function() {
let b = 4, h = [];
const f = [ "variant", "region", "script", "lang" ];
for (;0 !== b--; ) {
const k = f[b];
let l = this[k];
l && (l.join && (l = l.join("-")), 1 === b && 3 === l.length ? h.push("region-m49") : h = h.concat([ k, k + "-" + l.toLowerCase() ]));
}
return h.join(" ");
};
r.isRTL = function() {
return !!d[String(this.script || this.lang).toLowerCase()];
};
r = null;
return w;
}({}, L, N));
D.register("29", function(w, r, G) {
function y(b) {
r.console && console.error && console.error(b);
}
function q() {
y("Method not implemented");
}
function u() {}
function d(b) {}
u.prototype.toString = function() {
return "[Undefined]";
};
d.prototype._validate = function(b) {
let h, f, k = !0;
for (h in this) f = this[h], f === q ? (y(b + "." + h + "() must be implemented"), 
k = !1) : f instanceof u && (y(b + "." + h + " must be defined"), k = !1);
return k;
};
w.init = function(b, h) {
const f = new d();
if (b) {
let k = b.length;
for (;0 !== k--; ) f[b[k]] = q;
}
if (h) for (b = h.length; 0 !== b--; ) f[h[b]] = new u();
return f;
};
w.validate = function(b) {
const h = /function (\w+)\(/.exec(b.toString());
b.prototype._validate(h && h[1] || "Object");
};
return w;
}({}, L, N));
D.register("30", function(w, r, G) {
let y = 0, q = r.requestAnimationFrame, u = r.cancelAnimationFrame;
if (!q || !u) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (q = r[b + "RequestAnimationFrame"]) if (u = r[b + "CancelAnimationFrame"] || r[b + "CancelRequestAnimationFrame"]) break;
q && u || (q = function(b) {
var h = d();
const f = Math.max(0, 16 - (h - y)), k = h + f;
h = r.setTimeout(function() {
b(k);
}, f);
y = k;
return h;
}, u = function(b) {
clearTimeout(b);
});
const d = Date.now || function() {
return new Date().getTime();
};
w.loop = function(b, h) {
function f() {
l = q(f, h);
b(k++);
}
let k = 0, l;
f();
return {
stop: function() {
l && u(l);
l = null;
}
};
};
return w;
}({}, L, N));
D.register("2d", function(w, r, G) {
function y(p, x, v, g) {
if (d) {
const a = v;
v = function(c) {
if ((c.MSPOINTER_TYPE_TOUCH || "touch") === c.pointerType) return a(c);
};
}
p.addEventListener(x, v, g);
return {
unbind: function() {
p.removeEventListener(x, v, g);
}
};
}
function q(p) {
p.preventDefault();
p.stopPropagation();
return !1;
}
let u;
const d = !!r.navigator.msPointerEnabled, b = d ? "MSPointerDown" : "touchstart", h = d ? "MSPointerMove" : "touchmove", f = d ? "MSPointerUp" : "touchend";
w.ok = function(p) {
null == u && (u = "function" === typeof G.body.addEventListener);
u && p && p(w);
return u;
};
w.ms = function() {
return d;
};
w.dragger = function(p, x) {
function v(e) {
p.addEventListener(e, a[e], !1);
}
function g(e) {
p.removeEventListener(e, a[e], !1);
}
const a = {};
a[b] = function(e) {
k(e, function(n, m) {
m.type = b;
x(e, m, c);
});
v(h);
v(f);
return !0;
};
a[f] = function(e) {
g(h);
g(f);
k(e, function(n, m) {
m.type = f;
x(e, m, c);
});
return !0;
};
a[h] = function(e) {
k(e, function(n, m) {
m.type = h;
x(e, m, c);
});
return q(e);
};
v(b);
let c = {
kill: function() {
g(b);
g(h);
g(f);
p = c = x = null;
}
};
return c;
};
w.swiper = function(p, x, v) {
function g(E) {
p.addEventListener(E, t[E], !1);
}
function a(E) {
p.removeEventListener(E, t[E], !1);
}
function c() {
e && e.stop();
e = null;
}
let e, n, m, t = {}, z = [], B = [], A = [];
t[b] = function(E) {
n = !1;
c();
const F = l();
k(E, function(H, I) {
z[H] = F;
B[H] = I.clientX;
A[H] = I.clientY;
});
m = p.scrollLeft;
return !0;
};
t[f] = function(E) {
k(E, function(F, H) {
const I = l() - z[F];
F = B[F] - H.clientX;
x(Math.abs(F) / I, F ? 0 > F ? -1 : 1 : 0);
});
m = null;
return !0;
};
t[h] = function(E) {
let F, H;
null == m || k(E, function(I, M) {
F = B[I] - M.clientX;
H = A[I] - M.clientY;
});
if (H && Math.abs(H) > Math.abs(F)) return n = !0;
F && (n = !0, p.scrollLeft = Math.max(0, m + F));
return q(E);
};
if (!d || v) g(b), g(h), g(f), d && (p.className += " mstouch");
return {
kill: function() {
a(b);
a(h);
a(f);
c();
},
swiped: function() {
return n;
},
ms: function() {
return d;
},
snap: function(E) {
d && !v && (p.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + E + "px)", 
p.style["-ms-scroll-snap-type"] = "mandatory", p.style["-ms-scroll-chaining"] = "none");
},
scroll: function(E, F, H) {
c();
let I = p.scrollLeft;
const M = E > I ? 1 : -1, P = Math[1 === M ? "min" : "max"], J = Math.round(16 * F * M);
return e = D.require("30").loop(function(Q) {
Q && (I = Math.max(0, P(E, I + J)), p.scrollLeft = I, E === I && (c(), H && H(I)));
}, p);
}
};
};
w.start = function(p, x) {
return y(p, b, x, !1);
};
w.move = function(p, x) {
return y(p, h, x, !1);
};
w.end = function(p, x) {
return y(p, f, x, !1);
};
const k = w.each = function(p, x) {
if (d) (p.MSPOINTER_TYPE_TOUCH || "touch") === p.pointerType && x(0, p); else {
p = (p.originalEvent || p).changedTouches || [];
for (var v = -1; ++v < p.length; ) x(v, p[v]);
}
}, l = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, L, N));
D.register("31", function(w, r, G) {
w.init = function(y) {
function q() {
h.style.top = String(-y.scrollTop) + "px";
return !0;
}
function u() {
const k = h;
k.textContent = y.value;
const l = k.innerHTML;
"" !== l && (k.innerHTML = l.replace(/[ \t]/g, d).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function d(k) {
return '<span class="x' + k.charCodeAt(0).toString(16) + '">' + k + "</span>";
}
const b = y.parentNode;
let h = b.insertBefore(G.createElement("div"), y);
C(y).on("input", u).on("scroll", q);
C(b).addClass("has-mirror");
h.className = "ta-mirror";
const f = y.offsetWidth - y.clientWidth;
2 < f && (h.style.marginRight = String(f - 2) + "px");
u();
q();
return {
kill: function() {
C(y).off("input", u).off("scroll", q);
b.removeChild(h);
h = null;
C(b).removeClass("has-mirror");
}
};
};
return w;
}({}, L, N));
D.register("23", function(w, r, G) {
function y(d, b) {
d = q[d] || [];
b = b && r[b];
const h = d.length;
let f = -1, k = 0;
for (;++f < h; ) {
const l = d[f];
"function" === typeof l && (l(b), k++);
}
return k;
}
const q = {};
let u = "";
w.load = function(d, b, h) {
function f() {
p && (clearTimeout(p), p = null);
x && (x.onreadystatechange = null, x = x = x.onload = null);
d && (delete q[d], d = null);
}
function k(v, g) {
v = x && x.readyState;
if (g || !v || "loaded" === v || "complete" === v) g || y(d, h), f();
}
function l() {
if (0 === y(d)) throw Error('Failed to load "' + (h || d) + '"');
f();
}
if (h && r[h]) "function" === typeof b && b(r[h]); else if (null != q[d]) q[d].push(b); else {
q[d] = [ b ];
var p = setTimeout(l, 4e3), x = G.createElement("script");
x.setAttribute("src", d);
x.setAttribute("async", "true");
x.onreadystatechange = k;
x.onload = k;
x.onerror = l;
x.onabort = f;
G.getElementsByTagName("head")[0].appendChild(x);
}
};
w.stat = function(d) {
var b;
if (!(b = u)) {
{
b = G.getElementsByTagName("script");
const h = b.length;
let f = -1, k = "";
for (;++f < h; ) {
const l = b[f].getAttribute("src");
if (l) {
const p = l.indexOf("/lib/vendor");
if (-1 !== p) {
k = l.substring(0, p);
break;
}
}
}
b = k || "/static";
}
b = u = b;
}
return b + d;
};
w.css = function(d, b) {
G.getElementById(b) || C("<link />").attr("rel", "stylesheet").attr("href", d).attr("id", b).appendTo(G.head);
};
return w;
}({}, L, N));
D.register("10", function(w, r, G) {
function y(l, p) {
l.setReadOnly(!1);
l.on("change", function(x, v) {
return p.val(v.getValue());
});
l.on("focus", function() {
return p.focus();
});
l.on("blur", function() {
return p.blur();
});
}
function q(l) {
l.off("change");
l.off("focus");
l.off("blur");
}
function u(l) {
q(l);
l.setReadOnly(!0);
l.setHighlightGutterLine(!1);
l.setHighlightActiveLine(!1);
}
function d(l, p) {
function x() {
this.HighlightRules = g;
}
l = l.require;
const v = l("ace/lib/oop"), g = b(p);
v.inherits(g, l("ace/mode/text_highlight_rules").TextHighlightRules);
v.inherits(x, l("ace/mode/text").Mode);
return new x();
}
function b(l) {
return function() {
let p = {
start: [ {
token: "empty_line",
regex: /^$/
}, {
token: "constant.language",
regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
}, {
token: "constant.language",
regex: /<!\[CDATA\[/
}, {
token: "constant.language",
regex: /\]\]>/
}, {
token: "locked",
regex: /<(?:xliff:)?(?:g|ph)[^>]*>[^<]*<\/(?:xliff:)?(?:g|ph)>/
}, {
token: "locked",
regex: /<(?:xliff:)?(bx|ex|x)[^\/>]*\/>/
}, {
token: "constant.language",
regex: /<\/?[:a-z]+[^>]*>/
} ]
}, x = h(l);
"icu" === l ? p = {
start: p.start.concat([ {
token: "icu-quoted",
regex: /'([{}][^']*)?'/
}, {
token: "printf",
regex: "{[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*[^\\s\\u0085\\u200E\\u200F\\u2028\\u2029!-/:-@\\[-^{-~¡¢£¤¥¦§©«¬®°±¶»¿×÷\\u2010-\\u2027\\u2030-\\u203E\\u2041-\\u2053\\u2055-\\u205E\\u2190-\\u245F\\u2500-\\u2775\\u2794-\\u2BFF\\u2E00-\\u2E7F\\u3001-\\u3003\\u3008-\\u3020\\u3030\\uFD3E\\uFD3F\\uFE45\\uFE46]+[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*(,[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*(?:number|date|time|spellout|ordinal|duration)[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*(,[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*[^{}]+)?)?}"
}, {
token: "icu",
regex: /{/,
next: "icuName"
}, {
token: "icu",
regex: /}/,
next: "icuType"
} ]),
icuName: [ {
token: "icu",
regex: "[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]+"
}, {
token: "icu.name",
regex: "[^\\s\\u0085\\u200E\\u200F\\u2028\\u2029!-/:-@\\[-^{-~¡¢£¤¥¦§©«¬®°±¶»¿×÷\\u2010-\\u2027\\u2030-\\u203E\\u2041-\\u2053\\u2055-\\u205E\\u2190-\\u245F\\u2500-\\u2775\\u2794-\\u2BFF\\u2E00-\\u2E7F\\u3001-\\u3003\\u3008-\\u3020\\u3030\\uFD3E\\uFD3F\\uFE45\\uFE46]+",
next: "icuType"
}, {
defaultToken: "icu",
next: "icuType"
} ],
icuType: [ {
token: "icu",
regex: /[{}]/,
next: "start"
}, {
defaultToken: "icu"
} ]
} : "mf2" === l ? p = {
start: [ {
token: "keyword",
regex: "^[ \\t\\r\\n\\u3000]*\\.[A-Za-z][\\w.\\-]*",
next: "decl"
}, {
token: "constant.language",
regex: "\\\\[\\\\{}]"
}, {
token: "icu",
regex: "\\{\\{"
}, {
token: "icu",
regex: "\\}\\}",
next: "decl"
}, {
token: "printf",
regex: "\\{[ \\t\\r\\n\\u3000]*\\$[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+[ \\t\\r\\n\\u3000]*\\}"
}, {
token: "icu-quoted",
regex: "\\{[ \\t\\r\\n\\u3000]*(?:\\|(?:\\\\[\\\\|{}]|[^\\\\|])*\\||[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)[ \\t\\r\\n\\u3000]*\\}"
}, {
token: "constant.language",
regex: "\\{[ \\t\\r\\n\\u3000]*[#/][^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+(?::[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)?[^{}]*\\}"
}, {
token: "icu",
regex: "\\{",
next: "expr"
} ],
expr: [ {
token: "icu",
regex: "\\}",
next: "start"
}, {
token: "printf",
regex: "\\$[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+"
}, {
token: "icu-quoted",
regex: "(?:\\|(?:\\\\[\\\\|{}]|[^\\\\|])*\\||:[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+(?::[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)?(?:[ \\t\\r\\n\\u3000]+[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+[ \\t\\r\\n\\u3000]*=[ \\t\\r\\n\\u3000]*(?:\\|(?:\\\\[\\\\|{}]|[^\\\\|])*\\||[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+))*|[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)"
}, {
token: [ "constant.language", "constant.language" ],
regex: "([#/])([^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+(?::[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)?)"
}, {
token: [ "icu", "icu.name" ],
regex: "(@)([^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+(?::[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+)?)"
}, {
token: "invalid",
regex: "[!%*+<>?~^&][^{}]*"
}, {
defaultToken: "icu"
} ],
decl: [ {
token: "icu.name",
regex: "\\$[^ \\t\\r\\n\\u3000{}|@=:#/\\\\$!%*+<>?~^&]+"
}, {
token: "icu",
regex: "\\{\\{",
next: "start"
}, {
token: "icu",
regex: "\\{",
next: "expr"
}, {
defaultToken: "icu"
} ]
} : x && p.start.push({
token: "printf",
regex: x
});
this.$rules = p;
};
}
function h(l) {
switch (l) {
case "objc":
return /%(?:\d+\$)?[-+'0# ]*\d*(?:\.\d+|\.\*(?:\d+\$)?)?(?:hh?|ll?|[qjzTL])?[sScCdDioOuUxXfFeEgGaAp%@]/;

case "java":
return /%(?:\d+\$)?[-+,(0# ]*\d*(?:\.\d+)?(?:[bBhHsScCdoxXeEfgGaA%n]|[tT][HIklMSLNpzZsQBbhAaCYyjmdeRTrDFc])/;

case "php":
return /%(?:\d+\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?[suxXbcdeEfFgGo%]/;

case "i18next":
return /\{\{.+?}}/;

case "python":
return /%(?:\([_A-Za-z][_A-Za-z0-9]*\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;

case "javascript":
return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;

case "auto":
return /%(?:\d+\$|\([_A-Za-z][_A-Za-z0-9]*\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;

case k:
return f || /%%/;
}
}
let f, k = "auto";
w.init = function(l, p, x) {
let v, g = !1, a = x || k, c = l.parentNode, e = c.appendChild(G.createElement("div"));
C(c).addClass("has-proxy has-ace");
var n = r.loco;
x = D.require("23");
n = n && n.aceUrl || x.stat("/lib/ace.min.js");
x.load(n, function(m) {
if (e) {
if (!m) throw Error("Failed to load code editor");
v = m.edit(e);
var t = v.session, z = v.renderer;
v.$blockScrolling = Infinity;
v.setShowInvisibles(g);
v.setWrapBehavioursEnabled(!1);
v.setBehavioursEnabled(!1);
v.setHighlightActiveLine(!1);
t.setUseSoftTabs(!1);
z.setShowGutter(!0);
z.setPadding(10);
z.setScrollMargin(8);
t.setMode(d(m, a));
v.setValue(l.value, -1);
t.setUseWrapMode(!0);
p ? y(v, p) : u(v);
}
}, "ace");
return {
kill: function() {
v && (q(v), v.destroy(), v = null);
e && (c.removeChild(e), C(c).removeClass("has-proxy has-ace"), e = null);
return this;
},
disable: function() {
v && u(v);
p = null;
return this;
},
enable: function(m) {
p = m;
v && y(v, m);
return this;
},
resize: function() {
v && v.resize();
return this;
},
val: function(m) {
v && m !== v.getValue() && v.setValue(m, -1);
return this;
},
invs: function(m) {
m = m || !1;
g !== m && (g = m, v && v.setShowInvisibles(m));
return this;
},
strf: function(m) {
m = m || k;
m !== a && (a = m, v && v.session.setMode(d(r.ace, m)));
return this;
},
focus: function() {
v && v.focus();
return this;
}
};
};
w.strf = function(l, p) {
k = l;
f = p;
return w;
};
return w;
}({}, L, N));
D.register("32", function(w, r, G) {
function y(b, h) {
function f() {
return h.val(b.getContent());
}
b.on("input", f);
b.on("change", f);
b.on("focus", function() {
return h.focus();
});
b.on("blur", function() {
return h.blur();
});
b.setMode("design");
}
function q(b) {
b.off("input");
b.off("change");
b.off("focus");
b.off("blur");
}
function u(b) {
q(b);
b.setMode("readonly");
}
let d = 0;
w.load = function(b) {
const h = D.require("23");
h.css(h.stat("/css/lib/tinymce.css"), "tinymce-css");
h.load(h.stat("/lib/tinymce.min.js"), b, "tinymce");
return w;
};
w.init = function(b, h) {
function f(B) {
x = B;
v = "<p>" === B.substring(0, 3) && "</p>" === B.substring(B.length - 4);
return B.replace(t, "$1x-$2");
}
function k(B) {
l = B;
B._getContent = B.getContent;
B.getContent = function(A) {
A = this._getContent(A);
A = A.replace(z, "$1$2");
if (!v && "<p>" === A.substring(0, 3) && "</p>" === A.substring(A.length - 4)) {
const E = A.substring(3, A.length - 4);
if (E === x || -1 === E.indexOf("</p>")) A = E;
}
return A;
};
B._setContent = B.setContent;
B.setContent = function(A, E) {
return this._setContent(f(A), E);
};
B.setContent(b.value);
h ? (y(B, h), h.reset()) : u(B);
C(c).removeClass("loading");
}
let l, p = !1, x = "", v = !1, g = b.parentNode, a = g.parentNode, c = g.appendChild(G.createElement("div")), e = a.insertBefore(G.createElement("nav"), g);
const n = [ "script", "style", "form", "iframe", "object" ], m = [ "embed", "applet", "meta", "base", "link" ], t = new RegExp("(</?)((?:" + n.join("|") + ")[^>]*>)", "ig"), z = new RegExp("(</?)x-((?:" + n.join("|") + ")[^>]*>)", "ig");
e.id = "_tb" + String(++d);
C(g).addClass("has-proxy has-mce");
C(c).addClass("mce-content-body loading").text("Initializing...");
w.load(function(B) {
if (!B) throw Error("Failed to load HTML editor");
c && B.init({
inline: !0,
target: c,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + e.id,
toolbar: "formatselect | bold italic link unlink | bullist numlist outdent indent",
block_formats: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h4;Heading 4=h4;Heading 5=h5;Heading 6=h6;",
forced_root_block: "p",
relative_urls: !1,
convert_urls: !1,
remove_script_host: !1,
document_base_url: "",
allow_script_urls: !1,
formats: {
alignleft: {
classes: "alignleft"
},
alignright: {
selector: "p,h1,h2,h3,h4,span,strong,em,a",
classes: "alignright"
},
aligncenter: {
selector: "p,h1,h2,h3,h4,span,strong,em,a",
classes: "aligncenter"
},
strikethrough: {
inline: "del"
}
},
fix_list_elements: !0,
entities: "38,amp,60,lt,62,gt,160,nbsp",
entity_encoding: "named",
keep_styles: !1,
extended_valid_elements: "span,b,i,u,x-" + n.join("[*],x-") + "[*]",
protect: [ new RegExp("<(?:" + m.join("|") + ")[^>]*>", "gi") ],
invalid_elements: n.join(",") + "," + m.join(","),
init_instance_callback: k
});
});
return {
val: function(B) {
B = f(B);
null == l ? (b.value = B, console.log(".EARLY => .val( " + B), C(c).html(B)) : l.getContent() !== B && l.setContent(B);
h && h.val(B);
return this;
},
kill: function() {
l && (h && h.val(l.getContent()), q(l), l.destroy(), l = null);
c && (g.removeChild(c), C(g).removeClass("has-proxy has-mce"), c = null);
e && (a.removeChild(e), e = null);
return this;
},
enable: function(B) {
h = B;
l && y(l, B);
return this;
},
disable: function() {
l && u(l);
h = null;
return this;
},
focus: function() {
l && h && l.focus();
return this;
},
invs: function(B) {
B = B || !1;
p !== B && (p = B, C(g)[B ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, L, N));
D.register("33", function(w, r, G) {
w.init = function(y, q) {
function u(a) {
x !== a && (g.textContent = a.format(0), x = a, a = 0 === a ? "empty" : 0 === q || a < q ? "lt" : q === a ? "eq" : "gt", 
a !== p && (p = a, v.className = "wg-count is-" + a));
}
function d(a) {
l && (v.removeChild(l), l = null);
0 < a && (l = v.appendChild(f.el("span").appendChild(f.txt(" / " + a.format(0)))));
q = a;
}
function b(a, c) {
u(c.length);
}
function h() {
p = "";
x = -1;
u(y.val().length);
}
const f = D.require("1a"), k = C(y.parent()).on("changing", b);
let l, p, x, v = f.el("div"), g = v.appendChild(f.el("span"));
k.append(v);
d(q);
h();
return {
ping: function(a) {
null != a && a !== q && (q = a, d(a));
h();
},
kill: function() {
const a = k && k[0];
a && v && v.parentNode === a && (k.off("changing", b), a.removeChild(v));
}
};
};
return w;
}({}, L, N));
D.register("2e", function(w, r, G) {
function y(d) {
function b() {
g && (p.off("input", h), g = !1);
}
function h() {
const c = d.value;
c !== a && (p.trigger("changing", [ c, a ]), a = c);
}
function f() {
h();
g && v !== a && p.trigger("changed", [ a ]);
}
function k() {
u = d;
v = a;
g || (p.on("input", h), g = !0);
p.trigger("editFocus");
x.addClass("has-focus");
return !0;
}
function l() {
u === d && (u = null);
p.trigger("editBlur");
x.removeClass("has-focus");
g && (f(), b());
return !0;
}
const p = C(d), x = C(d.parentNode);
let v, g = !1, a = d.value;
p.on("blur", l).on("focus", k);
return {
val: function(c) {
a !== c && (d.value = c, p.triggerHandler("input"), a = c);
return !0;
},
kill: function() {
b();
p.off("blur", l).off("focus", k);
},
fire: function() {
a = null;
h();
},
ping: f,
blur: l,
focus: k,
reset: function() {
v = a = d.value;
}
};
}
function q(d) {
this.e = d;
}
let u;
w._new = function(d) {
return new q(d);
};
w.init = function(d) {
const b = new q(d);
d.disabled ? (d.removeAttribute("disabled"), b.disable()) : d.readOnly ? b.disable() : b.enable();
return b;
};
r = q.prototype;
r.destroy = function() {
this.unlisten();
const d = this.p;
d && (d.kill(), this.p = null);
this.nocount();
this.e = null;
};
r.reload = function(d, b) {
let h = this.l;
this.nocount();
h && !b && (this.disable(), h = null);
this.val(d || "");
b && !h && this.enable();
return this;
};
r.val = function(d) {
const b = this.e;
if (null == d) return b.value;
const h = this.l, f = this.p;
f && f.val(d);
h && h.val(d);
h || b.value === d || (b.value = d, C(b).triggerHandler("input"));
return this;
};
r.fire = function() {
this.l && this.l.fire();
return this;
};
r.ping = function() {
this.l && this.l.ping();
return this;
};
r.focus = function() {
const d = this.p;
d ? d.focus() : C(this.e).focus();
};
r.focused = function() {
return u && u === this.el;
};
r.parent = function() {
return this.e.parentNode;
};
r.attr = function(d, b) {
const h = this.e;
if (1 === arguments.length) return h.getAttribute(d);
null == b ? h.removeAttribute(d) : h.setAttribute(d, b);
return this;
};
r.editable = function() {
return !!this.l;
};
r.enable = function() {
const d = this.p;
this.e.removeAttribute("readonly");
this.listen();
d && d.enable && d.enable(this.l);
return this;
};
r.disable = function() {
const d = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
d && d.disable && d.disable();
return this;
};
r.listen = function() {
const d = this.l;
d && d.kill();
this.l = y(this.e);
return this;
};
r.unlisten = function() {
const d = this.l;
d && (d.kill(), this.l = null);
return this;
};
r.setInvs = function(d, b) {
const h = this.i || !1;
if (b || h !== d) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(d) : d && (this._i = D.require("31").init(this.e)), 
this.i = d;
return this;
};
r.getInvs = function() {
return this.i || !1;
};
r.setMode = function(d) {
let b = this.p, h = this.i || !1;
d !== (this.m || "") && (this.m = d, b && b.kill(), this.p = b = "code" === d ? D.require("10").init(this.e, this.l, this["%"]) : "html" === d ? D.require("32").init(this.e, this.l) : null, 
this.setInvs(h, !0), u && this.focus());
return this;
};
r.setStrf = function(d) {
this["%"] = d;
"code" === this.m && this.p.strf(d);
return this;
};
r.name = function(d) {
this.e.setAttribute("name", d);
return this;
};
r.placeholder = function(d) {
this.e.setAttribute("placeholder", d);
return this;
};
r.redraw = function() {
const d = this.p;
d && d.resize && d.resize();
};
r.counter = function(d) {
let b = this.c;
b ? b.ping(d) : this.c = D.require("33").init(this, d);
d = String(d || "0");
"0" === d ? this.e.removeAttribute("maxlength") : d !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", d);
return this;
};
r.nocount = function() {
const d = this.c;
d && (d.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return w;
}({}, L, N));
D.register("2f", function(w, r, G) {
function y(g) {
const a = r.console;
a && a.error && a.error(g);
}
function q(g) {
const a = G.createElement("div");
g && a.setAttribute("class", g);
return a;
}
function u(g) {
return function() {
g.resize();
return this;
};
}
function d(g) {
return function(a) {
let c = a.target, e = c.$index;
for (;null == e && "DIV" !== c.nodeName && (c = c.parentElement); ) e = c.$index;
null != e && (a.stopImmediatePropagation(), g.select(e));
return !0;
};
}
function b(g) {
return function() {
g.redrawDirty() && g.redraw();
return !0;
};
}
function h(g) {
return function(a) {
var c = a.keyCode;
if (40 === c) c = 1; else if (38 === c) c = -1; else return !0;
if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !0;
g.selectNext(c);
a.stopPropagation();
a.preventDefault();
return !1;
};
}
function f(g, a, c) {
function e(n) {
y("row[" + n + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(n) {
const m = a || 0, t = c ? -1 : 1, z = g.rows || [];
n.sort(function(B, A) {
return t * (z[B] || e(B)).cellVal(m).localeCompare((z[A] || e(A)).cellVal(m));
});
};
}
function k(g) {
this.w = g;
}
function l(g) {
this.t = g;
this.length = 0;
}
function p(g, a, c) {
let e = G.createElement("div");
e.className = c || "";
this._ = e;
this.d = a || [];
this.i = g || 0;
this.length = a.length;
}
function x(g) {
this.live = g;
this.rows = [];
}
w.create = function(g) {
return new k(g);
};
var v = k.prototype;
v.init = function(g) {
let a = this.w, c = a.id;
var e = a.splity(c + "-thead", c + "-tbody"), n = e[0];
e = e[1];
let m = [], t = [], z = [], B = [];
if (g) this.ds = g, this.idxs = t, this._idxs = null; else if (!(g = this.ds)) throw Error("No datasource");
n.css.push("wg-thead");
e.css.push("wg-tbody");
g.eachCol(function(M, P, J) {
z[M] = c + "-col-" + P;
B[M] = J || P;
});
var A = q();
let E = -1, F = z.length, H = q("wg-cols"), I = n.splitx.apply(n, z);
for (;++E < F; ) I[E].header(B[E]), H.appendChild(A.cloneNode(!1)).setAttribute("for", z[E]);
g.eachRow(function(M, P, J) {
m[M] = new p(M, P, J);
t[M] = M;
});
this.rows = m;
this.cols = H;
this.ww = null;
this.root = A = e.body;
this.head = n;
n.redraw = u(this);
a.css.push("is-table");
a.restyle();
n = e.fixed = I[0].bodyY() || 25;
a.lock().resize(n, e);
this.sc ? this._re_sort(F) : g.sort && g.sort(t);
this.redrawDirty();
this.render();
C(A).attr("tabindex", "-1").on("keydown", h(this)).on("mousedown", d(this)).on("scroll", b(this));
return this;
};
v.clear = function() {
const g = this.pages || [];
let a = g.length;
for (;0 !== a--; ) g[a].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
v.render = function() {
let g, a = [], c = this.rows || [], e = -1, n, m = this.idxs, t = m.length, z = this.idxr = {}, B = this.r, A = this._r, E = this.root, F = this.cols;
for (;++e < t; ) {
if (0 === e % 100) {
var H = F.cloneNode(!0);
g = new x(H);
g.i = a.length;
g.h = 2200;
g.insert(E);
a.push(g);
}
n = m[e];
z[n] = e;
H = c[n];
if (null == H) throw Error("Render error, no data at [" + n + "]");
H.page = g;
g.rows.push(H);
}
g && 100 !== g.size() && g.sleepH(22);
this.pages = a;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == B ? null != A && (H = c[A]) && H.page && (delete this._r, this.select(A, !0)) : (H = c[B]) && H.page ? this.select(B, !0) : (this.deselect(!1), 
this._r = B);
return this;
};
v.resize = function() {
let g = -1, a = this.ww || (this.ww = []);
var c = this.w;
let e = c.cells[0], n = e.body.childNodes, m = n.length, t = this.pages || [], z = t.length;
for (c.redraw.call(e); ++g < m; ) a[g] = n[g].style.width;
if (z) {
c = this.mx;
for (g = this.mn; g <= c; g++) t[g].widths(a);
this.redrawDirty() && this.redraw();
}
};
v.redrawDirty = function() {
let g = !1;
var a = this.root;
const c = a.scrollTop;
a = a.clientHeight;
this.sy !== c && (g = !0, this.sy = c);
this.vh !== a && (g = !0, this.vh = a);
return g;
};
v.redraw = function() {
let g = 0, a = -1, c = null, e = null, n = this.ww;
var m = this.sy;
let t = this.mn, z = this.mx, B = Math.max(0, m - 100);
m = this.vh + m + 100;
let A, E = this.pages || [], F = E.length;
for (;++a < F && !(g > m); ) A = E[a], g += A.height(), g < B || (null === c && (c = a), 
e = a, A.rendered || A.render(n));
if (t !== c) {
if (null !== t && c > t) for (a = t; a < c; a++) {
A = E[a];
if (!A) throw Error("Shit!");
A.rendered && A.sleep();
}
this.mn = c;
}
if (z !== e) {
if (null !== z && e < z) for (a = z; a > e; a--) A = E[a], A.rendered && A.sleep();
this.mx = e;
}
};
v.selected = function() {
return this.r;
};
v.thead = function() {
return this.w.cells[0];
};
v.tbody = function() {
return this.w.cells[1];
};
v.tr = function(g) {
return (g = this.row(g)) ? g.cells() : [];
};
v.row = function(g) {
return this.rows[g];
};
v.td = function(g, a) {
return this.tr(g)[a];
};
v.next = function(g, a, c) {
null == c && (c = this.r || 0);
const e = this.idxs, n = e.length;
let m = c = (this.idxr || {})[c];
for (;c !== (m += g) && !(0 <= m && n > m); ) if (a && n) m = 1 === g ? -1 : n, 
a = !1; else return null;
c = e[m];
return null == c || null == this.rows[c] ? (y("Bad next: [" + m + "] does not map to data row"), 
null) : c;
};
v.selectNext = function(g, a, c) {
g = this.next(g, a, null);
null != g && this.r !== g && this.select(g, c);
return this;
};
v.deselect = function(g) {
const a = this.r;
null != a && (this.r = null, C(this.tr(a)).removeClass("selected"), this.w.fire("wgRowDeselect", [ a, g ]));
return this;
};
v.selectRow = function(g, a) {
return this.select(this.idxs[g], a);
};
v.select = function(g, a) {
const c = this.rows[g];
var e = c && c.page;
if (!e) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let n, m = this.w.cells[1];
e.rendered || (n = e.top(), m.scrollY(n), this.redrawDirty() && this.redraw());
if (!c.rendered) return e.rendered || y("Failed to render page"), y("Row [" + c.i + "] not rendered"), 
this;
e = c.cells();
C(e).addClass("selected");
this.r = g;
a || (n = m.scrollY(), C(this.root).focus(), n !== m.scrollY() && m.scrollY(n));
m.scrollTo(e[0], !0);
this.w.fire("wgRowSelect", [ g, c.data() ]);
return this;
};
v.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
v.filter = function(g) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(g);
return this.clear().render();
};
v.each = function(g) {
let a, c = -1;
const e = this.rows || [], n = this.idxs || [], m = n.length;
for (;++c < m; ) a = n[c], g(e[a], c, a);
return this;
};
v.sortable = function(g) {
const a = this.sc || (this.sc = new l(this));
a.has(g) || a.add(g);
return this;
};
v._re_sort = function(g) {
let a = -1, c = this.sc, e = c.active;
for (this.sc = c = new l(this); ++a < g; ) c.add(a);
e && (a = this.head.indexOf(e.id), -1 === a && (a = Math.min(e.idx, g - 1)), this.sort(a, e.desc));
return this;
};
v._sort = function(g, a) {
a ? (this.s = a, a(g)) : (a = this.s) && a(g);
return g;
};
v.sort = function(g, a) {
this._sort(this.idxs, f(this, g, a));
this.sc.activate(g, a);
return this;
};
v = null;
v = l.prototype;
v.has = function(g) {
return null != this[g];
};
v.add = function(g) {
const a = this, c = a.t.head.cells[g];
a[g] = {
desc: null,
idx: g,
id: c.id
};
a.length++;
c.addClass("wg-sortable").on("click", function(e) {
if ("header" === e.target.nodeName.toLowerCase()) return e.stopImmediatePropagation(), 
a.toggle(g), !1;
});
return a;
};
v.toggle = function(g) {
this.t.sort(g, !this[g].desc).clear().render();
return this;
};
v.activate = function(g, a) {
let c, e = this.active, n = this[g], m = this.t.head.cells;
e && (c = m[e.idx]) && (c.removeClass(e.css), e !== n && c.restyle());
(c = m[g]) ? (n.desc = a, this.active = n, g = "wg-" + (a ? "desc" : "asc"), c.addClass(g).restyle(), 
n.css = g) : this.active = null;
return this;
};
v = null;
v = p.prototype;
v.render = function(g) {
let a, c = [], e = this._, n = this.length;
if (e) {
for (this.c = c; 0 !== n--; ) a = e.cloneNode(!1), c[n] = this.update(n, a), a.$index = this.i, 
g[n].appendChild(a);
this._ = null;
} else for (c = this.c; 0 !== n--; ) g[n].appendChild(c[n]);
this.rendered = !0;
return this;
};
v.update = function(g, a) {
a = a || this.c[g] || {};
g = (this.d[g] || function() {})() || " ";
null == g.innerHTML ? a.textContent = g : a.innerHTML = g.innerHTML;
return a;
};
v.cells = function() {
return this.c || [ this._ ];
};
v.data = function() {
const g = [], a = this.length;
let c = -1;
for (;++c < a; ) g[c] = this.cellVal(c);
return g;
};
v.destroy = function() {
this.page = null;
this.rendered = !1;
};
v.cellVal = function(g) {
g = this.d[g]() || "";
return String(g.textContent || g);
};
v = null;
v = x.prototype;
v.size = function() {
return this.rows.length;
};
v.insert = function(g) {
const a = this.h, c = q("wg-dead");
c.style.height = String(a) + "px";
g.appendChild(c);
return this.dead = c;
};
v.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
v.height = function() {
let g = this.h;
null == g && (this.h = g = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHeight);
g || y("row has zero height");
return g;
};
v.render = function(g) {
let a, c = -1, e = this.rows, n = e.length;
const m = this.dead, t = this.live, z = t.childNodes;
for (;++c < n; ) a = e[c], a.rendered || a.render(z);
n = g.length;
for (c = 0; c < n; c++) z[c].style.width = g[c];
m.parentNode.replaceChild(t, m);
this.rendered = !0;
this.h = null;
return this;
};
v.sleep = function() {
const g = this.height(), a = this.live, c = this.dead;
c.style.height = String(g) + "px";
a.parentNode.replaceChild(c, a);
this.rendered = !1;
this.h = g;
return this;
};
v.sleepH = function(g) {
g *= this.rows.length;
const a = this.dead;
a && (a.style.height = String(g) + "px");
this.rendered || (this.h = g);
return this;
};
v.widths = function(g) {
const a = this.live.childNodes;
let c = g.length;
for (;0 !== c--; ) a[c].style.width = g[c];
return this;
};
v.destroy = function() {
var g = this.rendered ? this.live : this.dead;
const a = this.rows;
g.parentNode.removeChild(g);
for (g = a.length; 0 !== g--; ) a[g].destroy();
};
return w;
}({}, L, N));
D.register("2a", function(w, r, G) {
function y(e, n) {
var m = e.id;
let t = m && v[m], z = t && t.parent();
if (!t || !z) return null;
var B = 1 === z.dir;
m = B ? "X" : "Y";
let A = "page" + m;
B = B ? x : p;
let E = B(z.el);
m = n["offset" + m];
let F = z.el, H = F.className;
null == m && (m = n[A] - B(e));
m && (E += m);
F.className = H + " is-resizing";
return {
done: function() {
F.className = H;
},
move: function(I) {
z.resize(I[A] - E, t);
return !0;
}
};
}
function q(e) {
function n() {
C(G).off("mousemove", m);
c && (c.done(), c = null);
return !0;
}
function m(t) {
c ? c.move(t) : n();
return !0;
}
if (c) return !0;
c = y(e.target, e);
if (!c) return !0;
C(G).one("mouseup", n).on("mousemove", m);
return d(e);
}
function u(e, n) {
const m = n.type;
"touchmove" === m ? c && c.move(n) : "touchstart" === m ? c = y(e.target, n) : "touchend" === m && c && (c.done(), 
c = null);
}
function d(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function b(e) {
g && g.redraw();
e && e.redraw();
return g = e;
}
function h(e, n) {
const m = C(n);
m.on("editFocus", function(t) {
t.stopPropagation();
m.trigger("wgFocus", [ b(e) ]);
}).on("editBlur", function(t) {
t.stopPropagation();
m.trigger("wgBlur", [ b(null) ]);
});
}
function f(e) {
const n = e.id, m = e.className, t = m ? [ m ] : [];
this.id = n;
this.el = e;
this.pos = this.index = 0;
this._cn = m;
this.css = t.concat("wg-cell");
v[n] = this;
this.clear();
}
const k = D.include("2c") || D.require("2"), l = D.require("1a"), p = l.top, x = l.left, v = {};
let g, a = 0, c = !1;
w.init = function(e) {
const n = new f(e);
n.redraw();
D.require("2d").ok(function(m) {
m.dragger(e, u);
});
C(e).on("mousedown", q);
return n;
};
r = f.prototype;
r.fire = function(e, n) {
e = C.Event(e);
e.cell = this;
C(this.el).trigger(e, n);
return this;
};
r.each = function(e) {
let n = -1;
const m = this.cells, t = m.length;
for (;++n < t; ) e(m[n], n);
return this;
};
r.indexOf = function(e) {
return (e = v[e.id || String(e)]) && e.pid === this.id ? e.index : -1;
};
r.on = function() {
return this.$("on", arguments);
};
r.off = function() {
return this.$("off", arguments);
};
r.find = function(e) {
return C(this.el).find(e);
};
r.$ = function(e, n) {
C.fn[e].apply(C(this.el), n);
return this;
};
r.addClass = function(e) {
this.css.push(e);
return this;
};
r.removeClass = function(e) {
e = this.css.indexOf(e);
-1 !== e && this.css.splice(e, 1);
return this;
};
r.parent = function() {
return this.pid && v[this.pid];
};
r.splitx = function() {
return this._split(1, arguments);
};
r.splity = function() {
return this._split(2, arguments);
};
r._split = function(e, n) {
(this.length || this.field) && this.clear();
let m = -1;
let t = n.length, z = 1 / t, B = 0;
for (;++m < t; ) {
var A = l.el();
this.body.appendChild(A);
var E = A;
{
var F = n[m];
let H = 1, I = F;
for (;v[F]; ) F = I + "-" + ++H;
}
E.id = F;
A = new f(A);
A.index = m;
A.pid = this.id;
A._locale(this.lang, this.rtl);
A.pos = B;
B += z;
this.cells.push(A);
this.length++;
}
this.dir = e;
this.redraw();
return this.cells;
};
r.count = function() {
return this.cells && this.cells.length || 0;
};
r.destroy = function() {
this.clear();
delete v[this.id];
const e = this.el;
e.innerHTML = "";
this.body = null;
e.className = this._cn || "";
C(e).off();
return this;
};
r.exists = function() {
return this === v[this.id];
};
r.clear = function() {
const e = this.el, n = this.cells, m = this.field, t = this.body, z = this.nav;
let B = this.length || 0;
for (;0 !== B--; ) delete v[n[B].destroy().id];
this.cells = [];
this.length = 0;
z && (e.removeChild(z), this.nav = null);
t && (m && (m.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
e === t.parentNode && e.removeChild(t));
this.body = e.appendChild(l.el("", "wg-body"));
this._h = null;
return this;
};
r.resize = function(e, n) {
if (!n && (n = this.cells[1], !n)) return;
var m = n.index;
let t = this.cells, z = C(this.el)[1 === this.dir ? "width" : "height"](), B = t[m + 1];
m = t[m - 1];
n.pos = Math.min((B ? B.pos * z : z) - ((n.body || n.el.firstChild).offsetTop || 0), Math.max(m ? m.pos * z : 0, e)) / z;
this.redraw();
this.fire("wgResize");
return this;
};
r.distribute = function(e) {
let n = -1, m = 0, t;
const z = this.cells, B = e.length;
for (;++n < B && (t = z[++m]); ) t.pos = Math.max(0, Math.min(1, e[n]));
this.redraw();
return this;
};
r.distribution = function() {
let e = [], n = 0;
const m = this.cells, t = m.length - 1;
for (;n < t; ) e[n] = m[++n].pos;
return e;
};
r.restyle = function() {
var e = this.css.concat();
0 === this.index ? e.push("first") : e.push("not-first");
this.dir && (e.push("wg-split"), 2 === this.dir ? e.push("wg-split-y") : e.push("wg-split-x"));
this.t && e.push("has-title");
this.nav && e.push("has-nav");
this.field && (e.push("is-field"), this.field.editable() ? e.push("is-editable") : e.push("is-readonly"));
e = e.join(" ");
e !== this._css && (this._css = e, this.el.className = e);
return this;
};
r.redraw = function(e) {
this.restyle();
const n = this.el;
var m = this.body, t = this.field;
if (m) {
var z = n.clientWidth || 0, B = n.clientHeight || 0, A = m.offsetTop || 0;
B = A > B ? 0 : B - A;
if (this._h !== B) {
this._h = B;
m.style.height = String(B) + "px";
var E = t;
}
this._w !== z && (this._w = z, E = t);
E && E.redraw();
}
m = this.length;
z = 1;
B = this.nav;
for (A = 2 === this.dir ? "height" : "width"; 0 !== m--; ) t = this.cells[m], B ? E = 1 : (t.fixed && (t.pos = t.fixed / C(n)[A]()), 
E = z - t.pos, z = t.pos), t.el.style[A] = String(100 * E) + "%", t.redraw(e);
return this;
};
r.contents = function(e, n) {
const m = this.el;
let t = this.body;
if (null == e) return t.innerHTML;
this.length ? this.clear() : t && (m.removeChild(t), t = null);
t || (this.body = t = m.appendChild(l.el("", n || "wg-content")), this._h = null, 
(n = this.lang) && this._locale(n, this.rtl, !0));
"string" === typeof e ? C(t)._html(e) : e && this.append(e);
this.redraw();
return this;
};
r.textarea = function(e, n) {
let m = this.field;
if (m) {
var t = m.editable();
m.reload(e, n);
t !== n && this.restyle();
} else this.length && this.clear(), t = l.el("textarea"), t.setAttribute("wrap", "virtual"), 
t.setAttribute("autocomplete", "off"), t.setAttribute("id", "wg" + String(++a)), 
t.value = e, this.contents(t), m = D.require("2e")._new(t)[n ? "enable" : "disable"](), 
h(this, t), this.field = m, this.restyle();
this.lang || this.locale("en");
return m;
};
r.locale = function(e) {
e = D.require("28").cast(e);
return this._locale(String(e), e.isRTL());
};
r._locale = function(e, n, m) {
const t = this.body;
if (m || e !== this.lang) this.lang = e, t && t.setAttribute("lang", e);
if (m || n !== this.rtl) this.rtl = n, t && t.setAttribute("dir", n ? "RTL" : "LTR");
return this;
};
r.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
const n = this.cells;
let m = this.navigated();
if (null != m) return n[m].editable();
m = -1;
const t = n.length;
for (;++m < t && (e = n[m].editable(), null == e); );
return e;
};
r.eachTextarea = function(e) {
const n = this.field;
n ? e(n) : this.each(function(m) {
m.eachTextarea(e);
});
return this;
};
r.append = function(e) {
e && (e.nodeType ? k.init(this.body.appendChild(e)) : k.init(C(e).appendTo(this.body)));
return this;
};
r.prepend = function(e) {
const n = this.body;
if (e.nodeType) {
const m = n.firstChild;
k.init(m ? n.insertBefore(e, m) : n.appendChild(e));
} else k.init(C(e).prependTo(n));
return this;
};
r.before = function(e) {
const n = this.body;
e.nodeType ? k.init(this.el.insertBefore(e, n)) : k.init(C(e).insertBefore(n));
return this;
};
r.header = function(e, n) {
if (null == e && null == n) return this.el.getElementsByTagName("header")[0];
this.t = l.txt(e || "");
this.el.insertBefore(l.el("header", n), this.body).appendChild(this.t);
this.redraw();
return this;
};
r.toolbar = function() {
const e = this.header(), n = e.getElementsByTagName("nav");
return 0 === n.length ? e.appendChild(l.el("nav")) : n[0];
};
r.title = function(e) {
const n = this.t;
if (n) return n.nodeValue = e || "", n;
this.header(e);
return this.t;
};
r.titled = function() {
return this.t && this.t.nodeValue;
};
r.bodyY = function() {
return p(this.body, this.el);
};
r.scrollY = function(e) {
if (ma === e) return this.body.scrollTop;
this.body.scrollTop = e;
};
r.tabulate = function(e) {
let n = this.table;
n ? n.clear() : n = D.require("2f").create(this);
n.init(e);
return this.table = n;
};
r.lock = function() {
this.body.className += " locked";
return this;
};
r.scrollTo = function(e, n) {
let m = this.body;
var t = m.scrollTop;
let z = p(e, m);
if (t > z) t = z; else {
const B = m.clientHeight;
e = z + C(e).outerHeight();
if (B + t < e) t = e - B; else return;
}
n ? m.scrollTop = t : C(m).stop(!0).animate({
scrollTop: t
}, 250);
};
r.navigize = function(e, n) {
function m(H) {
const I = B[H], M = z[H], P = C(I.el).show();
M.addClass("active");
E = H;
F.data("idx", H);
I.fire("wgTabSelect", [ H ]);
return P;
}
const t = this, z = [], B = t.cells;
let A = t.nav, E;
A && t.el.removeChild(A);
A = t.nav = t.el.insertBefore(l.el("nav", "wg-tabs"), t.body);
const F = C(A).on("click", function(H) {
const I = C(H.target).data("idx");
if (null == I) return !0;
if (null != E) {
{
const M = z[E];
C(B[E].el).hide();
M.removeClass("active");
}
}
m(I);
t.redraw();
return d(H);
});
null == n && (n = F.data("idx") || 0);
t.each(function(H, I) {
z[I] = C('<a href="#' + H.id + '"></a>').data("idx", I).text(e[I]).appendTo(F);
H.pos = 0;
C(H.el).hide();
});
m(B[n] ? n : 0);
t.lock();
t.redraw();
return t;
};
r.navigated = function() {
const e = this.nav;
if (e) return C(e).data("idx");
};
r = null;
return w;
}({}, L, N));
D.register("1d", function(w, r, G) {
function y(a, c) {
a.stopPropagation();
p = c;
return !0;
}
function q(a) {
const c = "Zero One Two Few Many Other".split(" ");
return [ null, [ c[5] ], [ c[1], c[5] ], [ c[1], c[3], c[5] ], [ c[1], c[3], c[4], c[5] ], [ c[1], c[2], c[3], c[4], c[5] ] ][a] || c;
}
function u(a) {
const c = [];
a && (a.saved() || c.push("po-unsaved"), a.fuzzy() ? c.push("po-fuzzy") : a.hasFlag() && c.push("po-flagged"), 
a.valid() || c.push("po-error"), a.translation() || c.push("po-empty"), a.comment() && c.push("po-comment"));
return c.join(" ");
}
function d(a, c, e) {
c = C(a.title(c).parentNode);
let n = c.find("span.lang");
e ? (e = D.require("28").cast(e), n.length || (n = C("<span></span>").prependTo(c)), 
n.attr("lang", e.lang).attr("class", e.getIcon() || "lang region region-" + (e.region || "zz").toLowerCase())) : (n.remove(), 
e = "en");
a.locale(e);
return c;
}
function b(a, c, e) {
c.on("click", function(n) {
const m = a.fire(e, [ n.target ]);
m || n.preventDefault();
return m;
});
}
function h(a, c, e, n) {
let m = a[c];
return e.length ? (m || (m = n.find("div.meta"), m.length || (m = C('<div class="meta"></div>').insertAfter(n.header())), 
b(a, m, "poMeta"), a[c] = m), m.html(e.join("\n")).show(), !0) : m && m.text() ? (m.text("").hide(), 
!0) : !1;
}
function f() {
this.dirty = 0;
}
D.require("3");
const k = D.require("6").html, l = D.require("6").sprintf;
let p, x;
w.extend = function(a) {
return a.prototype = new f();
};
w.localise = function(a) {
x = a;
return w;
};
const v = function() {
const a = G.createElement("p"), c = /(src|href|on[a-z]+)\s*=/gi;
return function(e) {
a.innerHTML = e.replace(c, "data-x-loco-$1=");
const n = a.textContent.trim();
return n ? n.replace("data-x-loco-", "") : e.trim();
};
}(), g = f.prototype = D.require("29").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
g.init = function() {
this.$t = null;
this.localise();
this.editable = {
source: !0,
target: !0
};
this.mode = "";
this.html = !1;
return this;
};
g.t = function() {
return this.$t || x || D.require("1").init();
};
g.localise = function(a) {
a || (a = this.t());
const c = [];
c[0] = a._x("Source text", "Editor") + ":";
c[3] = a._x("%s translation", "Editor") + ":";
c[4] = a._x("Context", "Editor") + ":";
c[5] = a._x("Comments", "Editor") + ":";
c[1] = a._x("Single", "Editor") + ":";
c[2] = a._x("Plural", "Editor") + ":";
c[6] = a._x("Untranslated", "Editor");
c[7] = a._x("Translated", "Editor");
c[8] = a._x("Toggle Fuzzy", "Editor");
c[9] = a._x("Suggest translation", "Editor");
this.labels = c;
this.$t = a;
return this;
};
g.setRootCell = function(a) {
function c(n) {
e.redraw(!0, n);
return !0;
}
const e = D.require("2a").init(a);
C(r).on("resize", c);
this.redraw = c;
C(a).on("wgFocus wgBlur", y);
this.destroy = function() {
e.destroy();
C(r).off("resize", c);
};
this.rootDiv = a;
return e;
};
g.$ = function() {
return C(this.rootDiv);
};
g.setListCell = function(a) {
const c = this;
c.listCell = a;
a.on("wgRowSelect", function(e, n) {
(e = c.po.row(n)) && e !== c.active && c.loadMessage(e);
}).on("wgRowDeselect", function(e, n, m) {
m || c.loadNothing();
});
};
g.setSourceCell = function(a) {
this.sourceCell = a;
};
g.setTargetCell = function(a) {
this.targetCell = a;
};
g.next = function(a, c, e) {
const n = this.listTable, m = this.po;
let t = n.selected(), z = t, B;
for (;null != (t = n.next(a, e, t)); ) {
if (z === t) {
t = null;
break;
}
if (c && (B = m.row(t), B.translated(0))) continue;
break;
}
null != t && n.select(t, !0);
return t;
};
g.select = function(a) {
this.listTable.select(a);
this.focus();
};
g.current = function(a) {
const c = this.active;
if (null == a) return c;
a ? a.is(c) ? (this.reloadMessage(a), this.focus()) : (this.loadMessage(a), a = this.po.indexOf(a), 
-1 !== a && this.select(a)) : this.unloadActive();
return this;
};
g.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
g.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
g.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
g.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
g.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
g.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
g.rebuildSearch = function() {
const a = this.po.rows, c = a.length, e = this.dict;
e.clear();
let n = -1;
for (;++n < c; ) e.add(n, a[n].toText());
};
g.filtered = function() {
return this.lastSearch || "";
};
g.filter = function(a, c) {
const e = this.listTable, n = this.lastFound, m = this.lastSearch || "";
let t, z;
a ? (z = this.dict.find(a), t = z.length, t === n && 0 === a.indexOf(m) ? c = !0 : e.filter(z)) : (t = this.po.length, 
e.unfilter());
this.lastFound = t;
this.lastSearch = a;
c || this.fire("poFilter", [ a, t ]);
return t;
};
g.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
g.unsave = function(a, c) {
let e = !1;
if (a) {
if (e = a.saved(c)) this.dirty++, a.unsave(c), this.fire("poUnsaved", [ a, c ]);
this.reCssRow(a);
}
return e;
};
g.reCssRow = function(a) {
var c = this.po.indexOf(a);
if ((c = this.listTable.tr(c)) && c.length) {
var e = u(a);
a = c[0].className;
e = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + e;
e !== a && C(c).attr("class", e);
}
};
g.save = function(a) {
const c = this.po;
if (this.dirty || a) {
const e = [], n = [], m = this.listTable;
c.each(function(t, z, B) {
z.err && e.push(z);
z.saved() || (z.save(), (z = (t = m.row(B)) && t.page) && z.live ? n[z.i] = z.live : t && C(t.cells()).removeClass("po-unsaved"));
});
n.length && C(n).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = e.length ? e : null;
this.fire("poSave", []);
}
return c;
};
g.fire = function(a, c) {
const e = this.handle;
if (e && e[a] && !1 === e[a].apply(this, c || [])) return !1;
a = C.Event(a);
this.$().trigger(a, c);
return !a.isDefaultPrevented();
};
g.on = function(a, c) {
this.$().on(a, c);
return this;
};
g.getSorter = function() {
return null;
};
g.setLocales = function(a, c) {
const e = this.labels;
a && a !== this.sourceLocale && (this.sourceLocale = a, this.sourceCell && d(this.sourceCell, e[0], a));
c && c !== this.targetLocale && (this.targetLocale = c, a = l(e[3], c.label || "Target"), 
this.targetCell && d(this.targetCell, a, c));
};
g.reload = function() {
const a = this;
var c = a.listCell;
const e = a.po;
var n = e && e.locale() || a.targetLocale, m = e && e.source() || a.sourceLocale;
const t = n && n.isRTL(), z = e && e.length || 0;
if (!e || !e.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(m, n);
a.lastSearch && (a.lastSearch = "", a.lastFound = z, a.fire("poFilter", [ "", z ]));
m = (n = a.listTable) && n.thead().distribution();
let B = [];
a.listTable = n = c.tabulate({
eachCol: function(A) {
const E = a.getListColumns(), F = a.getListHeadings();
for (const H in E) {
const I = E[H];
A(I, H, F[I]);
}
},
eachRow: function(A) {
e.each(function(E, F) {
a.validate(F) && B.push(F);
A(F.idx, a.getListEntry(F), u(F));
});
},
sort: a.getSorter()
});
c = a.getListColumns();
for (const A in c) n.sortable(c[A]);
m && n.thead().distribute(m);
n.tbody().$(t ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = B.length ? B : null;
return !!z;
};
g.load = function(a, c) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== c ? this.listTable.selectRow(c || 0) : this.active && this.unloadActive());
};
g.pasteMessage = function(a) {
this.validate(a);
if (this.active === a) {
let c = this.sourceCell, e = 0;
c && c.eachTextarea(function(n) {
n.val(a.source(null, e++));
});
(c = this.contextCell) && c.eachTextarea(function(n) {
n.val(a.context());
});
if (c = this.targetCell) e = 0, c.eachTextarea(function(n) {
n.val(a.translation(e++));
});
}
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
g.reloadMessage = function(a) {
const c = this.sourceCell, e = this.targetCell;
this.pasteMessage(a);
c && this.setSrcMeta(a, c) && c.redraw();
if (e) {
var n = e.navigated() || 0;
n = this.setTrgMeta(a, n, e);
!c && this.setSrcMeta(a, e) && (n = !0);
n && (e.redraw(), this.reCssRow(a));
}
return this;
};
g.setStatus = function() {
return null;
};
g.allowRichMeta = function() {
return !1;
};
g.setSrcMeta = function(a, c) {
const e = [];
var n = this.labels, m = a.context();
let t = [], z = a.tags(), B = z && z.length;
m && (t.push("<span>" + k(n[4]) + "</span>"), t.push('<mark class="ctxt">' + k(m) + "</mark>"));
if (B && this.getTag) for (t.push("<span>Tagged:</span>"), n = -1; ++n < B; ) (m = this.getTag(z[n])) && t.push("<mark>" + k(m.mod_name) + "</mark>");
t.length && e.push('<p class="tags">' + t.join(" ") + "</p>");
if (this.getMono() && (m = a.refs()) && (z = m.split(/\s/), B = z.length)) {
for (t = []; 0 <= --B; ) m = z[B], t.push("<code>" + k(m) + "</code>");
e.push('<p class="has-icon icon-file">' + t.join(" ") + "</p>");
}
(m = a.format()) && "no-" !== m.substring(0, 3) && e.push('<p class="has-icon icon-help">This string is formatted. <a href="#format">See full details</a>.</p>');
(m = a.notes()) && e.push('<p class="has-icon icon-info">' + k(m, this.allowRichMeta()) + "</p>");
return h(this, "$smeta", e, c);
};
g.setTrgMeta = function(a, c, e) {
const n = [], m = (c = a.errors(c)) && c.length, t = this.allowRichMeta();
if (m) for (let z = 0; z < m; z++) n.push('<p class="has-icon icon-warn">' + k(c[z], t) + ".</p>");
a.tcmt && n.push('<p class="has-icon icon-info">' + k(a.tcmt, t) + "</p>");
return h(this, "$tmeta", n, e);
};
g.loadMessage = function(a) {
function c(O) {
if ("=" === O.charAt(0)) {
const K = O.split(" ");
O = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(O)] || O;
O = K.join(" ");
}
return O;
}
function e(O, K) {
const S = ka;
var R = da[0];
O.off();
O.titled() !== R && d(O, R, K || "en");
R = !1;
A.setSrcMeta(a, O) && (R = !0);
if (a.plural()) {
R = -1;
let U = [], V = [];
const Z = O.id + "-";
K = a.sourceForms() || K && K.plurals || q(2);
const ea = K.length;
if (2 !== ea || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++R < ea; ) U[R] = Z + String(R), 
V[R] = c(K[R].split(" ", 1)[0]) + ":"; else U = [ Z + "-0", Z + "-1" ], V = [ da[1], da[2] ];
O.splity.apply(O, U);
O.each(function(fa, aa) {
fa.header(V[aa]).textarea(a.source(null, aa), S).setStrf(I).setMode(ba).setInvs(F);
});
O.lock();
S && O.each(function(fa, aa) {
n(fa, aa);
});
} else R && O.redraw(), O.textarea(a.source(), S).setStrf(I).setMode(ba).setInvs(F), 
S && n(O, 0);
}
function n(O, K) {
O.on("changing", function(S, R) {
a.source(R, K);
0 === K && A.updateListCell(a, "source");
A.unsave(a, K);
}).on("changed", function() {
0 === K && A.po.reIndex(a);
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function m(O, K, S, R) {
X && K.eachTextarea(function(V) {
V.ping();
});
K.off("changing").off("changed");
var U = l(da[3], S.label || "Target");
K.titled() !== U && d(K, U, S);
U = !1;
!O && A.setSrcMeta(a, K) && (U = !0);
A.setTrgMeta(a, R, K) && (U = !0);
A.setStatus(a, R);
if (1 !== S.nplurals && a.pluralized()) {
O = function(Y) {
Y < aa && (Z.push(c(fa[Y])), V.push(ea + String(Y)));
};
let V = [], Z = [];
const ea = K.id + "-", fa = a.targetForms() || S.plurals || q(S.nplurals), aa = fa.length;
for (a.eachMsg(O); (S = V.length) < aa; ) O(S);
K.splitx.apply(K, V);
K.each(function(Y, ca) {
const na = X && !a.disabled(ca);
Y.textarea(a.translation(ca), na).setStrf(I).setMode(ba).setInvs(F);
X && t(Y, ca);
});
K.navigize(Z, R || null).on("wgTabSelect", function(Y, ca) {
(Y = X && Y.cell.editable()) && Y.focus();
A.setTrgMeta(a, ca, K);
A.setStatus(a, ca);
A.fire("poTab", [ ca ]);
});
} else U && K.redraw(), K.textarea(a.translation(), X && !a.disabled(0)).setStrf(I).setMode(ba).setInvs(F), 
X && t(K, 0);
}
function t(O, K) {
function S() {
R = null;
A.validate(a);
const V = a.errors(K).join(" ");
U !== V && (U = V, A.setTrgMeta(a, K, O) && O.redraw(), A.reCssRow(a));
}
let R, U = a.errors(K).join(" ");
O.on("changing", function(V, Z, ea) {
R && (clearTimeout(R), R = null);
a.translate(Z, K);
0 === K && A.updateListCell(a, "target");
a.fuzzy(K) && a.saved(K) ? A.fuzzy(!1, a, K) : A.unsave(a, K);
"" === Z ? (A.fire("poEmpty", [ !0, a, K ]), A.setStatus(a, K)) : "" === ea && (A.fire("poEmpty", [ !1, a, K ]), 
A.setStatus(a, K));
R = setTimeout(S, U ? 300 : 1e3);
}).on("changed", function() {
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function z(O) {
O.off();
const K = da[4];
O.titled() !== K && (d(O, K), A.setStatus(null));
O.textarea(a.context(), !0).setMode(ba).setInvs(F);
oa && O.on("changing", function(S, R) {
a.context(R);
A.updateListCell(a, "source");
A.unsave(a, ha);
}).on("changed", function() {
A.po.reIndex(a);
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function B(O) {
const K = da[5];
O.titled() !== K && d(O, K);
O.off().on("changing", function(S, R) {
a.comment(R);
A.fire("poComment", [ a, R ]);
A.unsave(a, ha);
}).textarea(a.comment(), !0);
}
const A = this;
var E = a.isHTML();
const F = A.inv || !1, H = this.fmt || null, I = a.format() || null, M = a.is(A.active), P = A.sourceCell, J = A.targetCell, Q = A.contextCell, W = A.commentCell, X = A.editable.target, ka = A.editable.source, oa = A.editable.context, pa = A.sourceLocale, la = A.targetLocale, da = A.labels;
let ha = 0, ba = A.mode, ia = p;
A.html !== E && (A.html = E, "code" !== A.mode && (ba = E ? "html" : "", A.setMode(ba)));
A.active = a;
P && e(P, pa);
Q && z(Q);
J && la && (ha = J.navigated() || 0, m(P, J, la, ha));
W && B(W);
ia && (ia.exists() || (ia = ia.parent()), (E = ia.editable()) && E.focus());
H !== I && (this.fmt = I);
M || A.fire("poSelected", [ a, ha ]);
};
g.unloadActive = function() {
function a(e) {
e && e.text("").hide();
}
function c(e) {
e && e.off().clear();
}
a(this.$smeta);
a(this.$tmeta);
c(this.sourceCell);
c(this.contextCell);
c(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
g.loadNothing = function() {
const a = this.t(), c = this.mode || "", e = this.inv || !1, n = this.fmt;
this.unloadActive();
this.setStatus(null);
let m = this.commentCell;
m && m.textarea("", !1);
if (m = this.sourceCell) m.textarea("", !1).setStrf(n).setMode(c).setInvs(e), m.title(a._x("Source text not loaded", "Editor") + ":");
if (m = this.contextCell) m.textarea("", !1).setMode(c).setInvs(e), m.title(a._x("Context not loaded", "Editor") + ":");
if (m = this.targetCell) m.textarea("", !1).setStrf(n).setMode(c).setInvs(e), m.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
g.updateListCell = function(a, c) {
c = this.getListColumns()[c];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(c);
};
g.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? v(a) : a.trim()) || " ";
};
g.fuzzy = function(a, c, e) {
c = c || this.active;
const n = c.fuzzy(e);
!0 !== a || n ? !1 === a && n && this.flag(0, c, e) && this.fire("poFuzzy", [ c, !1, e ]) : this.flag(4, c, e) && this.fire("poFuzzy", [ c, !0, e ]);
return n;
};
g.flag = function(a, c, e) {
if (!c) {
c = this.active;
e = this.getTargetOffset();
if (null == e) return null;
e && c.targetForms() && (e = 0);
}
const n = c.flagged(e);
if (null == a) return n;
if (n === a || a && !c.translated(e) || !this.fire("poFlag", [ a, n, c, e ])) return !1;
c.flag(a, e);
this.fire("poUpdate", [ c ]) && this.unsave(c, e);
this.setStatus(c, e);
return !0;
};
g.add = function(a, c) {
let e, n = this.po.get(a, c);
n ? e = this.po.indexOf(n) : (e = this.po.length, n = this.po.add(a, c), this.load(this.po, -1), 
this.fire("poAdd", [ n ]), this.fire("poUpdate", [ n ]));
this.lastSearch && this.filter("");
this.listTable.select(e);
return n;
};
g.del = function(a) {
if (a = a || this.active) {
var c = this.lastSearch, e = this.po.del(a);
null != e && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (c && this.filter(c), this.active || (e = Math.min(e, this.po.length - 1), 
this.listTable.select(e))));
}
};
g.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
g.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(n) {
n.setMode(a);
});
const c = this.active, e = this.sourceCell;
c && c.refs() && e && this.setSrcMeta(c, e) && e.redraw();
this.fire("poMode", [ a ]);
}
return this;
};
g.getMono = function() {
return "code" === this.mode;
};
g.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(c) {
c.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
g.getInvs = function() {
return this.inv || !1;
};
g.callTextareas = function(a) {
var c = this.targetCell;
c && c.eachTextarea(a);
(c = this.contextCell) && c.eachTextarea(a);
(c = this.sourceCell) && c.eachTextarea(a);
return this;
};
g.focus = function() {
const a = this.getTargetEditable();
a && a.focus();
return this;
};
g.validate = function(a) {
return 0;
};
return w;
}({}, L, N));
D.register("1e", function(w, r, G) {
w.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, q = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(u, d) {
const b = d && d.count || 0;
d = d && d.types || {};
let h = !0, f = 0, k = 0;
for (var l; null != (l = q.exec(u)); ) {
const p = l[2];
if ("%" !== p || "%%" !== l[0]) {
if ("" === p || -1 === "suxXbcdeEfFgGo".indexOf(p)) {
h = !1;
break;
}
null == l[1] ? l = ++k : (l = parseInt(l[1]), f = Math.max(f, l));
null == d[l] && (d[l] = {});
d[l][p] = !0;
}
}
if (h) return {
valid: !0,
count: Math.max(f, k, b),
types: d
};
q.lastIndex = 0;
return {
valid: !1,
count: 0,
types: {}
};
},
sniff: function(u) {
return y.test(u);
}
};
};
return w;
}({}, L, N));
D.register("d", function(w, r, G) {
function y() {
this.init();
}
function q(f) {
f = C('<button type="button" class="button button-small icon icon-' + f + ' hastip"></button>');
D.require("c").init(f);
return f;
}
function u(f) {
return q("cloud").attr("title", f.labels[8] + " (Ctrl-U)").on("click", function(k) {
k.preventDefault();
f.focus().fuzzy(!f.fuzzy());
});
}
function d(f) {
return q("robot").attr("title", f.labels[9] + " (Ctrl-J)").on("click", function(k) {
k.preventDefault();
f.fire("poHint");
});
}
function b(f, k) {
return D.require("6").vsprintf(f, k);
}
w.init = function(f) {
const k = new y();
f = k.setRootCell(f);
var l = f.splity("po-list", "po-edit");
let p = l[0], x = l[1];
l = x.splitx("po-trans", "po-comment");
var v = l[0];
let g = l[1].header("Loading..");
l = v.splity("po-source", "po-target");
v = l[0].header("Loading..");
l = l[1].header("Loading..");
f.distribute([ .34 ]);
x.distribute([ .8 ]);
k.setListCell(p);
k.setSourceCell(v);
k.setTargetCell(l);
k.commentCell = g;
k.editable.source = !1;
return k;
};
r = y.prototype = D.require("1d").extend(y);
r.getListHeadings = function() {
const f = this.t(), k = [ f._x("Source text", "Editor") ];
this.targetLocale && (k[1] = f._x("Translation", "Editor"));
return k;
};
r.getListColumns = function() {
const f = {
source: 0
};
this.targetLocale && (f.target = 1);
return f;
};
r.getListEntry = function(f) {
const k = this.cellText, l = [ function() {
let p, x = k(f.source() || ""), v = f.context();
return v ? (p = G.createElement("p"), p.appendChild(G.createElement("mark")).innerText = v, 
p.appendChild(G.createTextNode(" " + x)), p) : x;
} ];
this.targetLocale && (l[1] = function() {
return k(f.translation() || "");
});
return l;
};
r.stats = function() {
let f = this.po, k = f.length, l = 0, p = 0, x = 0;
f.each(function(v, g) {
g.fuzzy() ? x++ : g.translated() ? l++ : p++;
});
return {
t: k,
p: l.percent(k) + "%",
f: x,
u: p
};
};
r.unlock = function() {
const f = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
f && (this._unlocked = f, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
r.lock = function() {
const f = this._unlocked;
f && (this.targetLocale = f, delete this._unlocked, this.po && this.po.lock(f), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, f ]), 
this.active && this.loadMessage(this.active));
};
r.locked = function() {
return !this._unlocked;
};
r.setStatus = function(f) {
let k = this.$tnav;
if (null == f) k && (k.remove(), this.$tnav = null); else {
k || (this.$tnav = k = C("<nav></nav>").append(u(this)).append(d(this)).appendTo(this.targetCell.header()));
var l = [];
f.translated() ? f.fuzzy() && l.push("po-fuzzy") : l.push("po-empty");
k.attr("class", l.join(" "));
}
};
r.getSorter = function() {
function f(p, x) {
const v = p.weight(), g = x.weight();
return v === g ? k(p, x) : v > g ? -1 : 1;
}
function k(p, x) {
return p.hash().localeCompare(x.hash());
}
const l = this;
return function(p) {
const x = l.po, v = l.locked() ? f : k;
p.sort(function(g, a) {
return v(x.row(g), x.row(a));
});
};
};
r.validate = function(f) {
f.err = null;
if (f.untranslated(0)) return 0;
const k = [];
let l = this.validateMessagePrintf(f, k);
l && (f.err = k);
return l;
};
r.validateMessagePrintf = function(f, k) {
const l = f.format();
if ("no-" === l.substring(0, 3)) return 0;
const p = f.msgid(), x = f.msgidPlural();
null == h && (h = D.require("1e").init());
var v = h;
if (!("" !== l || v.sniff(p) || "" !== x && v.sniff(x))) return 0;
let g = 0, a = v.parse(p);
x && a.valid && (a = v.parse(x, a));
if (!a.valid) return 0;
let c = a.count;
if (0 !== c || "" !== l) {
var e = this;
f.eachMsg(function(n, m) {
k[n] = [];
if ("" !== m) {
m = v.parse(m);
var t = m.count;
n = k[n];
if (m.valid) if (t > c) n.push(b(e.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ c ])), 
g++; else if (t < c && "" === x) n.push(b(e.t()._("Missing placeholders; source text formatting suggests at least %s"), [ c ])), 
g++; else {
t = a.types;
for (const z in m.types) for (const B in m.types[z]) if (null == t[z] || null == t[z][B]) {
n.push(e.t()._("Mismatching placeholder type; check against source text formatting"));
g++;
return;
}
} else n.push(e.t()._("Possible syntax error in string formatting")), g++;
}
});
return g;
}
};
r.handle = {};
let h;
return w;
}({}, L, N));
D.register("e", function(w, r, G) {
const y = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, q = {
38: !0,
40: !0,
73: !0
}, u = {
66: function(d, b) {
if (d = b.current()) d.normalize(), b.focus().pasteMessage(d);
},
75: function(d, b) {
if (d = b.current()) d.untranslate(), b.focus().pasteMessage(d);
},
85: function(d, b) {
b.focus().fuzzy(!b.fuzzy());
},
13: function(d, b) {
b.getFirstEditable() && b.next(1, !0, !0);
},
40: function(d, b) {
d = d.shiftKey;
b.next(1, d, d);
},
38: function(d, b) {
d = d.shiftKey;
b.next(-1, d, d);
},
73: function(d, b) {
if (!d.shiftKey) return !1;
b.setInvs(!b.getInvs());
}
};
w.init = function(d, b) {
function h(k) {
if (k.isDefaultPrevented() || !k.metaKey && !k.ctrlKey) return !0;
const l = k.which;
if (!f[l]) return !0;
const p = u[l];
if (!p || k.altKey || k.shiftKey && !q[l] || !1 === p(k, d)) return !0;
k.stopPropagation();
k.preventDefault();
return !1;
}
const f = {};
C(b || r).on("keydown", h);
return {
add: function(k, l) {
u[y[k]] = l;
return this;
},
enable: function() {
for (const k in arguments) f[y[arguments[k]]] = !0;
return this;
},
disable: function() {
C(b || r).off("keydown", h);
d = b = null;
for (const k in u) f[k] = !1;
}
};
};
return w;
}({}, L, N));
D.register("1f", function(w, r, G) {
function y() {
this.reIndex([]);
}
w.init = function() {
return new y();
};
r = y.prototype;
r.reIndex = function(q) {
const u = {}, d = q.length;
let b = -1;
for (;++b < d; ) u[q[b]] = b;
this.keys = q;
this.length = b;
this.ords = u;
};
r.key = function(q, u) {
if (null == u) return this.keys[q];
const d = this.keys[q], b = this.ords[u];
if (u !== d) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[q] = u;
delete this.ords[d];
this.ords[u] = q;
}
return q;
};
r.indexOf = function(q) {
q = this.ords[q];
return null == q ? -1 : q;
};
r.add = function(q, u) {
let d = this.ords[q];
null == d && (this.keys[this.length] = q, d = this.ords[q] = this.length++);
this[d] = u;
return d;
};
r.get = function(q) {
return this[this.ords[q]];
};
r.has = function(q) {
return null != this.ords[q];
};
r.del = function(q) {
this.cut(this.ords[q], 1);
};
r.cut = function(q, u) {
u = u || 1;
const d = [].splice.call(this, q, u);
this.keys.splice(q, u);
this.reIndex(this.keys);
return d;
};
r.each = function(q) {
const u = this.keys, d = this.length;
let b = -1;
for (;++b < d; ) q(u[b], this[b], b);
return this;
};
r.sort = function(q) {
const u = this.length, d = this.keys, b = this.ords, h = [];
let f = -1;
for (;++f < u; ) h[f] = [ this[f], d[f] ];
h.sort(function(l, p) {
return q(l[0], p[0]);
});
for (f = 0; f < u; f++) {
var k = h[f];
this[f] = k[0];
k = k[1];
d[f] = k;
b[k] = f;
}
return this;
};
r.join = function(q) {
return [].join.call(this, q);
};
return w;
}({}, L, N));
D.register("20", function(w, r, G) {
function y(q, u) {
var d = new RegExp("^.{0," + (q - 1) + "}[" + u + "]"), b = new RegExp("^[^" + u + "]+");
return function(h, f) {
for (var k = h.length, l; k > q; ) {
l = d.exec(h) || b.exec(h);
if (null == l) break;
l = l[0];
f.push(l);
l = l.length;
k -= l;
h = h.substring(l);
}
0 !== k && f.push(h);
return f;
};
}
w.create = function(q) {
function u(p) {
return f[p] || "\\" + p;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, h = /[\t\v\f\x07\x08\\"]/g, f = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == q || isNaN(q = Number(q))) q = 79;
if (0 < q) {
var k = y(q - 3, " ");
var l = y(q - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(p, x) {
if (!x) return p + ' ""';
x = x.replace(h, u);
var v = 0;
x = x.replace(d, function() {
v++;
return "\\n\n";
});
if (!(v || q && q < x.length + p.length + 3)) return p + ' "' + x + '"';
p = [ p + ' "' ];
x = x.split("\n");
if (l) for (var g = -1, a = x.length; ++g < a; ) l(x[g], p); else p = p.concat(x);
return p.join('"\n"') + '"';
},
prefix: function(p, x) {
p = p.split(d);
return x + p.join("\n" + x);
},
refs: function(p) {
p = p.replace(b, " ", p);
k && (p = k(p, []).join("\n#: "));
return "#: " + p;
}
};
};
return w;
}({}, L, N));
D.register("2b", function(w, r, G) {
function y() {
this.length = 0;
}
w.init = function() {
return new y();
};
r = y.prototype;
r.push = function(q) {
this[this.length++] = q;
return this;
};
r.sort = function(q) {
[].sort.call(this, q);
return this;
};
r.each = function(q) {
for (var u = -1, d = this.length; ++u < d; ) q(u, this[u]);
return this;
};
return w;
}({}, L, N));
D.register("21", function(w, r, G) {
function y() {}
w.extend = function(q) {
return q.prototype = new y();
};
r = y.prototype = D.require("29").init([ "load" ]);
r.row = function(q) {
return this.rows[q];
};
r.lock = function(q) {
return this.locale(q || {
lang: "zxx",
label: "",
nplurals: 2,
pluraleq: "n!=1"
});
};
r.unlock = function() {
const q = this.loc;
this.loc = null;
return q;
};
r.locale = function(q) {
null == q ? q = this.loc : this.loc = q = D.require("28").cast(q);
return q;
};
r.source = function(q) {
null == q ? q = this.src || D.require("28").cast({
lang: "en",
label: "English",
nplurals: 2,
pluraleq: "n!=1"
}) : this.src = q = D.require("28").cast(q);
return q;
};
r.each = function(q) {
this.rows.each(q);
return this;
};
r.indexOf = function(q) {
"object" !== typeof q && (q = this.get(q));
if (!q) return -1;
null == q.idx && (q.idx = this.rows.indexOf(q.hash()));
return q.idx;
};
r.get = function(q) {
return this.rows && this.rows.get(q);
};
r.has = function(q) {
return this.rows && this.rows.has(q);
};
r.del = function(q) {
q = this.indexOf(q);
if (-1 !== q) {
const u = this.rows.cut(q, 1);
if (u && u.length) return this.length = this.rows.length, this.rows.each(function(d, b, h) {
b.idx = h;
}), q;
}
};
r.reIndex = function(q, u) {
const d = q.hash(), b = this.indexOf(q), h = this.rows.indexOf(d);
return h === b ? b : -1 !== h ? (u = (u || 0) + 1, q.source("Error, duplicate " + String(u) + ": " + q.source()), 
this.reIndex(q, u)) : this.rows.key(b, d);
};
r.sort = function(q) {
this.rows.sort(q);
return this;
};
r.export = function() {
const q = this.rows, u = q.length, d = D.require("2b").init();
let b = -1;
for (;++b < u; ) d.push(q[b]);
return d;
};
return w;
}({}, L, N));
D.register("22", function(w, r, G) {
function y(d, b, h) {
if (null == h) return d[b] || "";
d[b] = h || "";
return d;
}
function q() {
this._id = this.id = "";
}
function u(d, b) {
const h = d.length;
let f = -1;
for (;++f < h; ) b(f, d[f]);
}
w.extend = function(d) {
return d.prototype = new q();
};
r = q.prototype;
r.flag = function(d, b) {
const h = this.flg || (this.flg = []);
if (null != b) h[b] = d; else for (b = Math.max(h.length, this.src.length, this.msg.length); 0 !== b--; ) h[b] = d;
return this;
};
r.flagged = function(d) {
return (this.flg || [])[d || 0] || 0;
};
r.hasFlag = function() {
const d = this.flg || [];
let b = d.length;
for (;0 !== b--; ) if (this.isFlag(d[b])) return !0;
return !1;
};
r.isFlag = function(d) {
return 0 < d;
};
r.flags = function() {
const d = {}, b = [], h = this.flg || [];
let f = h.length;
for (;0 !== f--; ) {
const k = h[f];
d[k] || (d[k] = !0, b.push(k));
}
return b;
};
r.flaggedAs = function(d, b) {
const h = this.flg || [];
if (null != b) return d === h[b] || 0;
for (b = h.length; 0 !== b--; ) if (h[b] === d) return !0;
return !1;
};
r.fuzzy = function(d, b) {
const h = this.flaggedAs(4, d);
null != b && this.flag(b ? 4 : 0, d);
return h;
};
r.source = function(d, b) {
if (null == d) return this.src[b || 0] || "";
this.src[b || 0] = d;
return this;
};
r.plural = function(d, b) {
if (null == d) return this.src[b || 1] || "";
this.src[b || 1] = d || "";
return this;
};
r.sourceForms = function() {
return this.srcF;
};
r.targetForms = function() {
return this.msgF;
};
r.each = function(d) {
const b = this.src, h = this.msg, f = Math.max(b.length, h.length);
let k = -1;
for (;++k < f; ) d(k, b[k], h[k]);
return this;
};
r.eachSrc = function(d) {
u(this.src, d);
return this;
};
r.eachMsg = function(d) {
u(this.msg, d);
return this;
};
r.count = function() {
return Math.max(this.src.length, this.msg.length);
};
r.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
r.translate = function(d, b) {
this.msg[b || 0] = d || "";
return this;
};
r.untranslate = function(d) {
if (null != d) this.msg[d] = ""; else {
const b = this.msg, h = b.length;
for (d = 0; d < h; d++) b[d] = "";
}
return this;
};
r.translation = function(d) {
return this.msg[d || 0] || "";
};
r.errors = function(d) {
return this.err && this.err[d || 0] || [];
};
r.valid = function() {
return null == this.err;
};
r.translated = function(d) {
if (null != d) return !!this.msg[d];
const b = this.msg, h = b.length;
for (d = 0; d < h; d++) if (!b[d]) return !1;
return !0;
};
r.untranslated = function(d) {
if (null != d) return !this.msg[d];
const b = this.msg, h = b.length;
for (d = 0; d < h; d++) if (b[d]) return !1;
return !0;
};
r.comment = function(d) {
return y(this, "cmt", d);
};
r.notes = function(d) {
return y(this, "xcmt", d);
};
r.refs = function(d) {
return y(this, "rf", d);
};
r.format = function(d) {
return y(this, "fmt", d);
};
r.context = function(d) {
return y(this, "ctx", d);
};
r.tags = function() {
return this.tg;
};
r.getMax = function(d) {
return (this.mx || [ 0 ])[d] || 0;
};
r.toString = r.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
r.weight = function() {
let d = 0;
this.translation() || (d += 2);
this.fuzzy() && (d += 1);
return d;
};
r.equals = function(d) {
return this === d || this.hash() === d.hash();
};
r.hash = function() {
return this.id;
};
r.normalize = function() {
let d = -1, b = this.msg.length;
for (;++d < b; ) this.msg[d] = this.src[Math.min(d, 1)] || "";
};
r.disabled = function(d) {
return !!(this.lck || [])[d || 0];
};
r.disable = function(d) {
(this.lck || (this.lck = []))[d || 0] = !0;
return this;
};
r.saved = function(d) {
const b = this.drt;
if (null == b) return !0;
if (null != d) return !b[d];
for (d = b.length; 0 !== d--; ) if (b[d]) return !1;
return !0;
};
r.unsave = function(d) {
(this.drt || (this.drt = []))[d || 0] = !0;
return this;
};
r.save = function(d) {
null == d ? this.drt = null : (this.drt || (this.drt = []))[d] = !1;
return this;
};
r.is = function(d) {
return d && (d === this || d.idx === this.idx);
};
r.isHTML = function(d) {
if (null == d) return this.htm || !1;
this.htm = d;
};
r = null;
return w;
}({}, L, N));
D.register("f", function(w, r, G) {
function y(f) {
return {
"Project-Id-Version": "PACKAGE VERSION",
"Report-Msgid-Bugs-To": "",
"POT-Creation-Date": f || "",
"PO-Revision-Date": f || "",
"Last-Translator": "",
"Language-Team": "",
Language: "",
"Plural-Forms": "",
"MIME-Version": "1.0",
"Content-Type": "text/plain; charset=UTF-8",
"Content-Transfer-Encoding": "8bit"
};
}
function q(f, k) {
f = f || "";
k && (f += "\0" + k);
return f;
}
function u(f) {
const k = r.console;
k && k.error && k.error(f.message || String(f));
}
function d(f) {
return D.require("20").create(f);
}
function b(f) {
this.locale(f);
this.clear();
this.head = y(this.now());
}
function h(f, k) {
this.src = [ f || "" ];
this.msg = [ k || "" ];
}
w.create = function(f) {
return new b(f);
};
G = D.require("21").extend(b);
G.clear = function() {
this.rows = D.require("1f").init();
this.length = 0;
return this;
};
G.now = function() {
function f(g, a) {
for (g = String(g); g.length < a; ) g = "0" + g;
return g;
}
var k = new Date();
const l = k.getUTCFullYear(), p = k.getUTCMonth() + 1, x = k.getUTCDate(), v = k.getUTCHours();
k = k.getUTCMinutes();
return f(l, 4) + "-" + f(p, 2) + "-" + f(x, 2) + " " + f(v, 2) + ":" + f(k, 2) + "+0000";
};
G.header = function(f, k) {
const l = this.head || (this.head = {});
if (null == k) return this.headers()[f] || "";
l[f] = k || "";
return this;
};
G.headers = function(f) {
const k = this.now(), l = this.head || (this.head = y(k));
if (null != f) {
for (x in f) l[x] = f[x];
return this;
}
const p = this.locale();
f = {};
for (x in l) f[x] = String(l[x]);
if (p) {
f.Language = String(p) || "zxx";
f["Language-Team"] = p.label || f.Language;
f["Plural-Forms"] = "nplurals=" + (p.nplurals || "2") + "; plural=" + (p.pluraleq || "n!=1") + ";";
var x = "PO-Revision-Date";
} else f.Language = "", f["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
f["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", x = "POT-Creation-Date";
f[x] || (f[x] = k);
f["X-Generator"] = "Loco https://localise.biz/";
return f;
};
G.get = function(f, k) {
f = q(f, k);
return this.rows.get(f);
};
G.add = function(f, k) {
f instanceof h || (f = new h(f));
k && f.context(k);
k = f.hash();
this.rows.get(k) ? u("Duplicate message at index " + this.indexOf(f)) : (f.idx = this.rows.add(k, f), 
this.length = this.rows.length);
return f;
};
G.load = function(f) {
let k = -1, l, p;
var x;
let v, g, a, c = (x = this.locale()) && x.nplurals || 2, e = [];
for (;++k < f.length; ) l = f[k], null == l.parent ? (p = l.source || l.id, x = l.target || "", 
v = l.context, p || v ? (g = new h(p, x), g._id = l._id, v && g.context(v), l.flag && g.flag(l.flag, 0), 
l.comment && g.comment(l.comment), l.notes && g.notes(l.notes), l.refs && g.refs(l.refs), 
g.format(l.format), l.message = g, this.add(g), l.prev && l.prev[0] && (g.prev(l.prev[0].source, l.prev[0].context), 
l.prev[1] && g._src.push(l.prev[1].source || ""))) : 0 === k && "object" === typeof x && (this.head = x, 
this.headcmt = l.comment)) : e.push(l);
for (k = -1; ++k < e.length; ) try {
l = e[k];
p = l.source || l.id;
g = f[l.parent] && f[l.parent].message;
if (!g) throw Error("parent missing for plural " + p);
a = l.plural;
1 === a && g.plural(p);
a >= c || (l.flag && g.flag(l.flag, a), g.translate(l.target || "", a), l.format && !g.format() && g.format(l.format));
} catch (n) {
u(n);
}
return this;
};
G.wrap = function(f) {
this.fmtr = d(f);
return this;
};
G.toString = function() {
var f, k = this.locale(), l = [], p = [], x = this.headers(), v = !k, g = k && k.nplurals || 2, a = this.fmtr || d();
x[k ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (f in x) p.push(f + ": " + x[f]);
p = new h("", p.join("\n"));
p.comment(this.headcmt || "");
v && p.fuzzy(0, !0);
l.push(p.toString());
l.push("");
this.rows.each(function(c, e) {
c && (l.push(e.cat(a, v, g)), l.push(""));
});
return l.join("\n");
};
G = D.require("22").extend(h);
G.msgid = function() {
return this.src[0];
};
G.msgidPlural = function() {
return this.src[1] || "";
};
G.prev = function(f, k) {
this._src = [ f || "" ];
this._ctx = k;
};
G.hash = function() {
return q(this.source(), this.context());
};
G.toString = function() {
return this.cat(d());
};
G.cat = function(f, k, l) {
var p = [], x;
(x = this.cmt) && p.push(f.prefix(x, "# "));
(x = this.xcmt) && p.push(f.prefix(x, "#. "));
var v = this.rf;
if (x = this._id) v += (v ? " " : "") + "loco:" + x;
v && /\S/.test(v) && p.push(f.refs(v));
!k && this.fuzzy() && p.push("#, fuzzy");
(x = this.fmt) && p.push("#, " + x + "-format");
(x = this._ctx) && p.push(f.prefix(f.pair("msgctxt", x), "#| "));
if (x = this._src) x[0] && p.push(f.prefix(f.pair("msgid", x[0]), "#| ")), x[1] && p.push(f.prefix(f.pair("msgid_plural", x[1]), "#| "));
(x = this.ctx) && p.push(f.pair("msgctxt", x));
p.push(f.pair("msgid", this.src[0]));
if (null == this.src[1]) p.push(f.pair("msgstr", k ? "" : this.msg[0])); else for (v = -1, 
p.push(f.pair("msgid_plural", this.src[1])), x = this.msg || [ "", "" ], l = l || x.length; ++v < l; ) p.push(f.pair("msgstr[" + v + "]", k ? "" : x[v] || ""));
return p.join("\n");
};
G.compare = function(f, k) {
let l = this.weight(), p = f.weight();
if (l > p) return 1;
if (l < p) return -1;
if (k) {
l = this.hash().toLowerCase();
p = f.hash().toLowerCase();
if (l < p) return 1;
if (l > p) return -1;
}
return 0;
};
G.copy = function() {
let f = new h(), k, l;
for (k in this) this.hasOwnProperty(k) && ((l = this[k]) && l.concat && (l = l.concat()), 
f[k] = l);
return f;
};
return w;
}({}, L, N));
D.register("11", function(w, r, G) {
w.init = function(y, q) {
function u() {
return f || (f = C('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function d(k, l, p) {
k = C("<p></p>").text(p);
u().dialog("close").html("").dialog("option", "title", "Error").append(k).dialog("open");
}
function b(k) {
const l = k && k.code;
if (l) {
for (var p = l.length, x = C("<ol></ol>").attr("class", k.type), v = -1; ++v < p; ) C("<li></li>").html(l[v]).appendTo(x);
0 !== k.line && x.find("li").eq(k.line - 1).attr("class", "highlighted");
u().dialog("close").html("").dialog("option", "title", k.path + ":" + k.line).append(x).dialog("open");
}
}
function h(k) {
k = k.target;
const l = C(k).find("li.highlighted")[0];
k.scrollTop = Math.max(0, (l && l.offsetTop || 0) - Math.floor(k.clientHeight / 2));
}
let f;
return {
load: function(k) {
u().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", h);
k = C.extend({
ref: k,
path: q.popath
}, q.project || {});
y.ajax.post("fsReference", k, b, d);
}
};
};
return w;
}({}, L, N));
D.register("12", function(w, r, G) {
function y() {
this.inf = {};
}
function q() {
const b = G.createElement("p"), h = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, f = /<[a-z]+\s/i;
let k, l;
return {
sniff: function(p) {
if (p === k) return l;
k = p;
if (h.test(p) || f.test(p)) if (b.innerHTML = p, b.textContent !== p) return l = !0;
return l = !1;
}
};
}
w.create = function(b, h) {
h && "function" === typeof h.create || console.error("module.create is not callable");
h = h.create(y);
h.init(b);
return h;
};
const u = y.prototype;
u.init = function(b) {
this.inf = b || {};
return this;
};
u.param = function(b) {
return this.inf[b] || "";
};
u.key = function() {
return this.param("key") || "";
};
u.getId = function() {
return this.param("id") || "none";
};
u.getUrl = function() {
return this.param("url") || "";
};
u.toString = function() {
return this.param("name") || this.getId();
};
u.getSrc = function() {
return this.param("src") || "en";
};
u.setSrc = function(b) {
this.inf.src = this.mapLang(b, this.getLangMap());
};
u.stderr = function(b) {
const h = (r.loco || {}).notices;
h && h.error && h.error(String(this) + ": " + String(b));
};
u.xhrError = function(b, h, f) {
try {
const k = b.responseText, l = k && r.JSON.parse(k);
f = l && this.parseError(l) || f;
} catch (k) {}
return f || this.httpError(b);
};
u.httpError = function(b) {
return (b = b && b.status) && 200 !== b ? "Responded status " + b : "Unknown error";
};
u.parseError = function(b) {
return b && b.error || "";
};
u.mapLang = function(b, h) {
const f = String(b).replace("_", "-").toLowerCase();
var k = b.lang;
h = h[f] || h[k] || [];
b = h.length;
if (0 === b) return k;
if (1 < b) for (k = -1; ++k < b; ) {
const l = h[k];
if (l === f) return l;
}
return h[0];
};
u.getLangMap = function() {
return {};
};
u.maxChr = function() {
return 0;
};
u.fixURL = function(b) {
b = b.split("://", 2);
1 === b.length && b.unshift("https");
return b[0] + "://" + b[1].replace(/\/{2,}/g, "/");
};
u.translate = function(b, h, f) {
return this.batch([ b ], h, this.isHtml(b.source), f);
};
u.unwind = function(b, h) {
const f = [], k = b.length;
for (let l = 0; l < k; l++) f.push(b[l][h]);
return f;
};
u.contextualize = function(b) {
return [ b.context || "", b.notes || "" ].join("\n").trim();
};
u.verify = function(b) {
return this.translate({
source: "OK",
context: "",
notes: ""
}, {
lang: "fr",
toString: function() {
return "fr";
}
}, function(h, f) {
b(!!f);
});
};
u.hash = function() {
return this.key();
};
u._call = function(b) {
const h = this;
h.state = null;
b.cache = !0;
b.dataType = "json";
b.error = function(f, k, l) {
h.stderr(h.xhrError(f, k, l));
};
return h.abortable(C.ajax(b));
};
u.abortable = function(b) {
const h = this;
b.always(function() {
h.$r === b && (h.$r = null);
});
return h.$r = b;
};
u.abort = function() {
const b = this.$r;
b && b.abort();
};
u.isHtml = function(b) {
return (d || (d = q())).sniff(b);
};
let d;
return w;
}({}, L, N));
D.register("13", function(w, r, G) {
function y(q) {
this.api = q;
this.chars = 0;
}
w.create = function(q) {
return new y(q);
};
r = y.prototype;
r.init = function(q, u) {
function d(c) {
let e = {
id: h.length,
length: 0,
html: c.html,
items: []
};
h.push(e);
return k[c.html ? 1 : 0] = e;
}
function b(c, e, n) {
var m = c.source(null, n);
if (m && (c.untranslated(n) || u)) {
{
n = c.notes();
const z = c.context();
c = m.length;
var t = f.isHtml(m);
m = {
source: m,
context: z,
notes: n
};
n = k[t ? 1 : 0];
t = n.items;
if (g && c > g) x++, c = void 0; else {
if (n.length + c > v || 50 === t.length) n = d(n), t = n.items;
t.push(m);
n.length += c;
l += c;
p += 1;
c = m;
}
}
c && (c.id = e);
}
}
const h = [], f = this.api;
let k = [], l = 0, p = 0, x = 0, v = 1e4, g = f.maxChr();
g && (v = Math.min(v, g));
d({
html: !1
});
d({
html: !0
});
const a = q.locale();
q.each(1 < a.nplurals ? function(c, e, n) {
b(e, n, 0);
b(e, n, 1);
} : function(c, e, n) {
b(e, n, 0);
});
k = [];
this.chars = l;
this.length = p;
this.batches = h;
this.locale = a;
x && f.stderr("Strings over " + v + " characters long will be skipped");
};
r.abort = function() {
this.state = "abort";
return this;
};
r.dispatch = function(q) {
function u(B, A) {
if (!b()) return !1;
if (!A) return !0;
c++;
const E = q.row(B.id), F = B.source;
let H = 0;
E.each(function(I, M, P) {
A !== P && (F === M || 1 < I && E.source(null, 1) === F) && (E.translate(A, I), 
H++, n++);
});
H && p("each", [ E ]);
}
function d(B) {
return function(A, E) {
u(B[A], E);
return !0;
};
}
function b() {
return "abort" === x.state ? (v && (v.abort(), l()), !1) : !0;
}
function h() {
const B = g.shift();
if (B) {
const A = B.items;
A && A.length ? v.batch(A, a, B.html, d(A)).fail(f).always(k) : k();
} else l();
}
function f() {
x.abort();
l();
}
function k() {
e++;
p("prog", [ e, t ]);
b() && h();
}
function l() {
v = g = null;
p("done");
}
function p(B, A) {
B = z[B] || [];
let E = B.length;
for (;0 <= --E; ) B[E].apply(null, A);
}
let x = this, v = x.api, g = x.batches || [], a = x.locale, c = 0, e = 0, n = 0, m = x.length, t = g.length, z = {
done: [],
each: [],
prog: []
};
x.state = "";
h();
return {
done: function(B) {
z.done.push(B);
return this;
},
each: function(B) {
z.each.push(B);
return this;
},
prog: function(B) {
z.prog.push(B);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(m - c, 0);
},
did: function() {
return c;
}
};
}
};
};
return w;
}({}, L, N));
D.register("14", function(w, r, G) {
function y() {}
w.create = function(q) {
(y.prototype = new q()).batch = function(u, d, b, h) {
function f(x) {
let v = -1;
for (;++v < l && !1 !== h(v, x[v], d); );
}
const k = r.loco, l = u.length;
u = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(d),
source: this.getSrc(),
sources: u
};
const p = C.Deferred();
this.abortable(k.ajax.post("apis", u, function(x) {
f(x && x.targets || []);
p.resolve();
}, function() {
f([]);
p.reject();
}));
return p.promise();
};
return new y();
};
return w;
}({}, L, N));
D.register("24", {
bel: [ "be" ],
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
D.register("15", function(w, r, G) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.toString = function() {
return "Google Translate";
};
q.parseError = function(u) {
if (u.error) {
const d = [], b = u.error.errors || [], h = b.length;
let f = -1;
for (;++f < h; ) d.push(b[f].message || "");
return "Error " + u.error.code + ": " + d.join(";");
}
return "";
};
q.getLangMap = function() {
return D.require("24");
};
q.batch = function(u, d, b, h) {
function f(v) {
const g = x.length;
let a = -1;
for (;++a < g && !1 !== h(a, (v[a] || {}).translatedText || "", d); );
}
const k = this, l = k.getSrc();
b = b ? "html" : "text";
const p = k.mapLang(d, k.getLangMap()), x = this.unwind(u, "source");
return k._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + l + "&target=" + p + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: k.key(),
q: x
}
}).done(function(v, g, a) {
v.data ? f(v.data.translations || []) : (k.stderr(k.parseError(v) || k.httpError(a)), 
f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, N));
D.register("25", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
D.register("16", function(w, r, G) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.parseError = function(u) {
var d = u.details || {};
let b = d.message;
d = d.texts;
return b ? (d && d !== b && (b += "; " + d), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(h) {
h += -1 === h.indexOf("?") ? "?" : "&";
return h + "ref=loco";
}), "Error " + (u.status || "0") + ": " + b) : "";
};
q.maxChr = function() {
return 1e3;
};
q.getLangMap = function() {
return D.require("25");
};
q.batch = function(u, d, b, h) {
function f(v) {
const g = x.length;
let a = -1, c = (v[0] || {
translated: []
}).translated || [];
for (;++a < g && (v = c[a] || "", !1 !== h(a, v, d)); );
}
const k = this;
b = this.getSrc();
const l = k.param("api") || "https://api.lecto.ai", p = k.mapLang(d, k.getLangMap()), x = this.unwind(u, "source");
return k._call({
url: k.fixURL(l + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ p ],
from: b,
texts: x
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": k.key(),
Accept: "application/json"
}
}).done(function(v, g, a) {
v ? f(v.translations || []) : (k.stderr(k.parseError(v) || k.httpError(a)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, N));
D.register("26", {
bel: [ "be" ],
nn: [ "no" ],
pt: [ "pt", "pt-pt" ],
sr: [ "sr", "sr-cyrl", "sr-latn" ],
"sr-rs": [ "sr-cyrl" ],
tlh: [ "tlh-latn", "tlh-piqd" ],
zh: [ "zh-hans", "zh-hant" ],
"zh-cn": [ "zh-hans" ],
"zh-hk": [ "zh-hans" ],
"zh-sg": [ "zh-hans" ],
"zh-tw": [ "zh-hant" ]
});
D.register("17", function(w, r, G) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.toString = function() {
return "Microsoft Translator text API";
};
q.parseError = function(u) {
return u && u.error ? u.error.message : "";
};
q.maxChr = function() {
return 1e4;
};
q.getLangMap = function() {
return D.require("26");
};
q.region = function() {
return this.param("region") || "global";
};
q.hash = function() {
return this.key() + this.region();
};
q.batch = function(u, d, b, h) {
function f(a) {
let c = -1;
for (var e; ++c < x && (e = a[c] || {}, e = e.translations || [], e = e[0] || {}, 
!1 !== h(c, e.text || "", d)); );
}
let k = this, l = [], p = k.getSrc();
u = this.unwind(u, "source");
let x = u.length, v = -1;
b = b ? "html" : "plain";
let g = k.mapLang(d, k.getLangMap());
for (;++v < x; ) l.push({
Text: u[v]
});
return k._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + p + "&to=" + g + "&textType=" + b,
method: "POST",
data: JSON.stringify(l),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": k.region()
}
}).done(function(a, c, e) {
a && a.length ? f(a) : (k.stderr(k.parseError(a) || k.httpError(e)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, N));
D.register("18", function(w, r, G) {
w.init = function(y) {
function q() {
M || (A.on("click", l), M = C('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && C("#ssh-keys").toggleClass("hidden", "ssh" !== C(this).val());
}));
return M;
}
function u() {
F && (d(C(a)), F = !1);
if (n && I) {
var J = I, Q = C(E);
Q.find("span.loco-msg").text(J);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (d(C(E)), H = !1);
}
function d(J) {
J.slideUp(250).fadeOut(250, function() {
C(this).addClass("jshide");
});
}
function b() {
if (n) return M && M.dialog("close"), u(), C(y).find('button[type="submit"]').attr("disabled", !1), 
C(r).triggerHandler("resize"), g && g(!0), !0;
t && M ? (F || (C(a).removeClass("jshide").hide().fadeIn(500), F = !0), H && (d(C(E)), 
H = !1)) : u();
C(y).find('input[type="submit"]').attr("disabled", !0);
g && g(!1);
return !1;
}
function h(J) {
var Q, W = P || {};
for (Q in W) if (W.hasOwnProperty(Q)) {
var X = W[Q];
J[Q] ? J[Q].value = X : C('<input type="hidden" />').attr("name", Q).appendTo(J).val(X);
}
}
function f(J) {
J.preventDefault();
J = C(J.target).serializeArray();
v(J);
e = !0;
return !1;
}
function k(J) {
J.preventDefault();
M.dialog("close");
return !1;
}
function l(J) {
J.preventDefault();
M.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function p(J) {
n = J.authed;
c = J.method;
C(a).find("span.loco-msg").text(J.message || "Something went wrong.");
I = J.warning || "";
J.notice && m.notices.info(J.notice);
if (n) "direct" !== c && (P = J.creds, h(y), e && J.success && m.notices.success(J.success)), 
b(); else if (J.reason) m.notices.info(J.reason); else if (J = J.prompt) {
var Q = q();
Q.html(J).find("form").on("submit", f);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", k);
Q.find('input[type="submit"]').addClass("button-primary");
b();
C(r).triggerHandler("resize");
} else m.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function x() {
b();
}
function v(J) {
e = !1;
m.ajax.setNonce("fsConnect", B).post("fsConnect", J, p, x);
return J;
}
var g, a = y, c = null, e = !1, n = !1, m = r.loco, t = y.path.value, z = y.auth.value, B = y["loco-nonce"].value, A = C(a).find("button.button-primary"), E = G.getElementById(a.id + "-warn"), F = !1, H = !1, I = "", M;
m.notices.convert(E).stick();
if (y.connection_type) {
var P = {};
P.connection_type = y.connection_type.value;
n = !0;
} else t && z && v({
path: t,
auth: z
});
b();
return {
applyCreds: function(J) {
if (J.nodeType) h(J); else {
var Q, W = P || {};
for (Q in W) W.hasOwnProperty(Q) && (J[Q] = W[Q]);
}
return this;
},
setForm: function(J) {
y = J;
b();
h(J);
return this;
},
connect: function() {
t = y.path.value;
z = y.auth.value;
v(C(y).serializeArray());
return this;
},
listen: function(J) {
g = J;
n && J(!0);
return this;
},
authed: function() {
return n;
}
};
};
return w;
}({}, L, N));
D.register("27", function(w, r, G) {
function y(b, h) {
return function(f) {
b.apply(f, h);
return f;
};
}
function q(b) {
return function(h, f) {
h = h && h[b] || 0;
f = f && f[b] || 0;
return h === f ? 0 : h > f ? 1 : -1;
};
}
function u(b) {
return function(h, f) {
return (h && h[b] || "").localeCompare(f && f[b] || "");
};
}
function d(b) {
return function(h, f) {
return -1 * b(h, f);
};
}
w.sort = function(b, h, f, k) {
h = "n" === f ? q(h) : u(h);
k && (h = d(h));
return y([].sort, [ h ])(b);
};
return w;
}({}, L, N));
D.register("19", function(w, r, G) {
w.init = function(y) {
function q(a) {
let c = -1;
const e = a.length;
for (C("tr", p).remove(); ++c < e; ) p.appendChild(a[c].$);
}
function u(a) {
b = a ? v.find(a, k) : k.slice(0);
f && (a = l[f], b = g(b, f, a.type, a.desc));
q(b);
}
let d = 0, b, h, f;
const k = [], l = [], p = y.getElementsByTagName("tbody")[0];
var x = y.getElementsByTagName("thead")[0];
const v = D.require("a").init(), g = D.require("27").sort;
y = C('form.loco-filter input[type="text"]', y.parentNode);
x && C("th", x).each(function(a, c) {
const e = c.getAttribute("data-sort-type");
e && (a = d, C(c).addClass("loco-sort").on("click", function(n) {
n.preventDefault();
{
n = a;
let m = l[n], t = m.type, z = !(m.desc = !m.desc);
b = g(b || k.slice(0), n, t, z);
q(b);
h && h.removeClass("loco-desc loco-asc");
h = C(m.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
f = n;
}
return !1;
}), l[d] = {
$: c,
type: e
});
c.hasAttribute("colspan") ? d += Number(c.getAttribute("colspan")) : d++;
});
p && C("tr", p).each(function(a, c) {
let e, n = [], m = {
_: a,
$: c
}, t = c.getElementsByTagName("td");
for (e in l) {
const z = t[e];
(c = z.textContent.replace(/(^\s+|\s+$)/g, "")) && n.push(c);
z.hasAttribute("data-sort-value") && (c = z.getAttribute("data-sort-value"));
switch (l[e].type) {
case "n":
c = Number(c);
}
m[e] = c;
}
k[a] = m;
v.index(a, n);
});
y.length && (x = y[0], y = C(x.form), 1 < k.length ? D.require("b").listen(x, u) : y.hide(), 
y.on("submit", function(a) {
a.preventDefault();
return !1;
}));
};
return w;
}({}, L, N));
const T = L.loco || {}, ja = T.conf || {
$v: []
};
L = D.require("1").init();
N = ja.wplang;
T.version = function(w) {
return ja.$v[w || 0] || "0";
};
D.require("2");
D.require("3");
D.require("4");
D.require("5");
T.l10n = L;
L.load(ja.wpl10n);
N && L.pluraleq(N.pluraleq);
T.string = D.require("6");
T.notices = D.require("7").init(L);
T.ajax = D.require("8").init(ja).localise(L);
T.locale = D.require("9");
T.fulltext = D.require("a");
T.watchtext = D.require("b").listen;
T.tooltip = D.require("c");
T.po = {
ed: D.require("d"),
kbd: D.require("e"),
init: D.require("f").create,
ace: D.require("10").strf("php"),
ref: D.require("11")
};
T.apis = D.require("12");
T.apis.createJob = D.require("13").create;
T.apis.providers = function() {
return {
_: D.require("14"),
google: D.require("15"),
lecto: D.require("16"),
microsoft: D.require("17")
};
};
T.fs = D.require("18");
C("#loco-admin.wrap table.wp-list-table").each(function(w, r) {
D.require("19").init(r);
});
T.validate = function(w) {
w = (w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "")) && w[0];
if ("2.8.10" === w) return !0;
T.notices.warn("admin.js is the wrong version (" + w + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
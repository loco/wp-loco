"use strict";

(function(L, M, B, la) {
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
const t = typeof q;
if ("string" === t) if (/[^ <>!=()%^&|?:n0-9]/.test(q)) console.error("Invalid plural: " + q); else return new Function("n", "return " + q);
"function" !== t && (q = function(d) {
return 1 != d;
});
return q;
}
w.init = function(q) {
function t(l, m, p) {
return (l = f[l]) && l[p] ? l[p] : m || "";
}
function d(l) {
return t(l, l, 0);
}
function b(l, m) {
return t(m + "" + l, l, 0);
}
function k(l, m, p) {
p = Number(q(p));
isNaN(p) && (p = 0);
return t(l, p ? m : l, p);
}
q = y(q);
let f = {};
return {
__: d,
_x: b,
_n: k,
_: d,
x: b,
n: k,
load: function(l) {
f = l || {};
return this;
},
pluraleq: function(l) {
q = y(l);
return this;
}
};
};
return w;
}({}, L, M));
D.register("2", function(w, r, G) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, L, M));
D.register("3", function(w, r, G) {
Number.prototype.format = function(y, q, t) {
var d = Math.pow(10, y || 0);
y = [];
d = String(Math.round(d * this) / d);
var b = d.split(".");
d = b[0];
b = b[1];
let k = d.length;
do {
y.unshift(d.substring(k - 3, k));
} while (0 < (k -= 3));
d = y.join(t || ",");
if (b) {
{
t = b;
y = t.length;
let f;
for (;"0" === t.charAt(--y); ) f = y;
f && (t = t.substring(0, f));
b = t;
}
b && (d += (q || ".") + b);
}
return d;
};
Number.prototype.percent = function(y) {
let q = 0, t = this && y ? this / y * 100 : 0;
if (0 === t) return "0";
if (100 === t) return "100";
if (99 < t) t = Math.min(t, 99.9), y = t.format(++q); else if (.5 > t) {
t = Math.max(t, 1e-4);
do {
y = t.format(++q);
} while ("0" === y && 4 > q);
y = y.substring(1);
} else y = t.format(0);
return y;
};
return w;
}({}, L, M));
D.register("4", function(w, r, G) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var q = Object(this), t = q.length >>> 0;
if (0 === t) return -1;
var d = 0;
1 < arguments.length && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && Infinity != d && -Infinity != d && (d = (0 < d || -1) * Math.floor(Math.abs(d))));
if (d >= t) return -1;
for (d = 0 <= d ? d : Math.max(t - Math.abs(d), 0); d < t; d++) if (d in q && q[d] === y) return d;
return -1;
});
return w;
}({}, L, M));
D.register("5", function(w, r, G) {
G = r.JSON;
G || (G = {
parse: B.parseJSON,
stringify: null
}, r.JSON = G);
w.parse = G.parse;
w.stringify = G.stringify;
return w;
}({}, L, M));
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
let t = 0;
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, b, k) {
if ("%" === k) return "%";
d = b ? q[Number(b) - 1] : q[t++];
return null != d ? String(d) : "s" === k ? "" : "0";
});
};
w.html = function() {
function y(m) {
return "&" + (f[m] || "#" + m.charCodeAt(0)) + ";";
}
function q(m, p) {
return '<a href="' + m + '" target="' + (p.indexOf(k) ? "_blank" : "_top") + '">' + p + "</a>";
}
let t, d, b, k, f, l = function() {
t = /[<>&"']/g;
f = {
"<": "lt",
">": "gt",
"&": "amp",
'"': "quot",
"'": "apos"
};
d = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
l = null;
};
return function(m, p) {
l && l();
m = m.replace(t, y);
p && (m = m.replace(b, q).replace(d, "<br />"));
return m;
};
}();
return w;
}({}, L, M));
D.register("1a", function(w, r, G) {
function y(q) {
return function(t, d) {
let b = t[q] || 0;
for (;(t = t.offsetParent) && t !== (d || G.body); ) b += t[q] || 0;
return b;
};
}
w.top = y("offsetTop");
w.left = y("offsetLeft");
w.el = function(q, t) {
q = G.createElement(q || "div");
t && (q.className = t);
return q;
};
w.txt = function(q) {
return G.createTextNode(q || "");
};
w.rect = function(q) {
return q.getBoundingClientRect();
};
return w;
}({}, L, M));
D.register("7", function(w, r, G) {
function y(e, c, g) {
function n() {
v();
C = setTimeout(c, g);
}
function v() {
C && clearTimeout(C);
C = 0;
}
let C = 0;
n();
B(e).on("mouseenter", v).on("mouseleave", n);
return {
die: function() {
v();
B(e).off("mouseenter mouseleave");
}
};
}
function q(e, c) {
e.fadeTo(c, 0, function() {
e.slideUp(c, function() {
e.remove();
B(r).triggerHandler("resize");
});
});
return e;
}
function t(e, c) {
function g(E) {
p[A] = null;
q(B(e), 250);
C && C.die();
var H;
if (H = E) E.stopPropagation(), E.preventDefault(), H = !1;
return H;
}
function n(E) {
C && C.die();
return C = y(e, g, E);
}
const v = B(e);
let C, A, z, F = v.find("button");
0 === F.length && (v.addClass("is-dismissible"), F = B('<button type="button" class="notice-dismiss"> </a>').appendTo(v));
F.off("click").on("click", g);
B(r).triggerHandler("resize");
m();
A = p.length;
p.push(g);
c && (C = n(c));
return {
link: function(E, H) {
var I = H || E;
H = B(e).find("nav");
E = B("<nav></nav>").append(B("<a></a>").attr("href", E).text(I));
z ? (z.push(E.html()), H.html(z.join("<span> | </span>"))) : (z = [ E.html() ], 
B(e).addClass("has-nav").append(E));
return this;
},
stick: function() {
C && C.die();
C = null;
p[A] = null;
return this;
},
slow: function(E) {
n(E || 1e4);
return this;
}
};
}
function d(e, c, g) {
const n = D.require("1a").el;
e = B('<div class="notice notice-' + e + ' loco-notice inline"></div>').prependTo(B("#loco-notices"));
const v = B(n("p"));
g = B(n("span")).text(g);
c = B(n("strong", "has-icon")).text(c + ": ");
v.append(c).append(g).appendTo(e);
return e;
}
function b(e, c, g, n) {
e = d(g, c, e).css("opacity", "0").fadeTo(500, 1);
B(r).triggerHandler("resize");
return t(e, n);
}
function k(e) {
return b(e, u, "warning");
}
function f() {
B("#loco-notices").find("div.notice").each(function(e, c) {
-1 === c.className.indexOf("jshide") && (e = -1 === c.className.indexOf("notice-success") ? null : 5e3, 
t(c, e));
});
}
const l = r.console || {
log: function() {}
}, m = Date.now || function() {
return new Date().getTime();
};
let p = [], x, u, h, a;
w.error = function(e) {
return b(e, x, "error");
};
w.warn = k;
w.info = function(e) {
return b(e, h, "info");
};
w.success = function(e) {
return b(e, a, "success", 5e3);
};
w.warning = k;
w.log = function() {
l.log.apply(l, arguments);
};
w.debug = function() {
(l.debug || l.log).apply(l, arguments);
};
w.clear = function() {
let e = -1;
const c = p, g = c.length;
for (;++e < g; ) {
const n = c[e];
n && n.call && n();
}
p = [];
return w;
};
w.create = d;
w.raise = function(e) {
(w[e.type] || w.error).call(w, e.message);
};
w.convert = t;
w.init = function(e) {
x = e._("Error");
u = e._("Warning");
h = e._("Notice");
a = e._("OK");
setTimeout(f, 1e3);
return w;
};
return w;
}({}, L, M));
D.register("8", function(w, r, G) {
function y(c) {
let g = B("<pre>" + c + "</pre>").text();
g && (g = g.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
g || (g = c) || (g = "Blank response from server");
return g;
}
function q(c) {
return (c = c.split(/[\r\n]/)[0]) ? (c = c.replace(/ +in +\S+ on line \d+/, ""), 
c = c.replace(/^[()! ]+Fatal error:\s*/, "")) : a._("Server returned invalid data");
}
function t(c) {
if (!h) return D.require("7").error("Session disconnected. Retry after reconnect"), 
p(), "";
const g = u[c] || "";
"" === g && D.require("7").error('No nonce for "' + c + '"');
return g;
}
function d(c, g, n) {
c[g] = n;
}
function b(c, g, n) {
c.push({
name: g,
value: n
});
}
function k(c, g, n) {
c.append(g, n);
}
function f(c, g, n, v) {
function C(z, F, E) {
if ("abort" !== F) {
var H = a || {
_: function(W) {
return W;
}
}, I = z.status || 0, O = z.responseText || "", R = y(O), J = z.getResponseHeader("Content-Type") || "Unknown type", Q = z.getResponseHeader("Content-Length") || O.length;
"success" === F && E ? A.error(E) : (A.error(q(R) + ".\n" + H._("Check console output for debugging information")), 
A.log("Ajax failure for " + c, {
status: I,
error: F,
message: E,
output: O
}), "parsererror" === F && (E = "Response not JSON"), A.log([ H._("Provide the following text when reporting a problem") + ":", "----", "Status " + I + ' "' + (E || H._("Unknown error")) + '" (' + J + " " + Q + " bytes)", R, "====" ].join("\n")));
n && n.call && n(z, F, E);
e = z;
}
}
v.url = x;
v.dataType = "json";
const A = D.require("7").clear();
e = null;
return B.ajax(v).fail(C).done(function(z, F, E) {
const H = z && z.data, I = z && z.notices, O = I && I.length;
!H || z.error ? C(E, F, z && z.error && z.error.message) : g && g(H, F, E);
for (z = -1; ++z < O; ) A.raise(I[z]);
});
}
function l(c) {
B(c).on("heartbeat-send", function(g, n) {
n["loco-translate"] = {
nonces: u
};
}).on("heartbeat-tick", function(g, n) {
if (g = (n && n["loco-translate"] || {}).nonces) u = g, h || (h = !0, (n = m()) && 5 === n.interval() && n.interval("fast", 1)); else if (n && (n.nonces_expired || !1 === n["wp-auth-check"])) {
h = !1;
for (const v in u) u[v] = "";
(n = m()) && n.interval("fast", 30);
}
});
c.addEventListener("load", function(g) {
g = g.target;
if (!h && g && "wp-auth-check-frame" === g.id) try {
const n = g.contentDocument && g.contentDocument.body;
n && -1 !== n.className.indexOf("interim-login-success") && p();
} catch (n) {}
}, !0);
}
function m() {
const c = r.wp;
return c && c.heartbeat;
}
function p() {
const c = m();
c && c.connectNow();
}
const x = r.ajaxurl || "/wp-admin/admin-ajax.php";
let u = {}, h = !1, a, e;
w.init = function(c) {
u = c.nonces || u;
h = !0;
l(G);
return w;
};
w.localise = function(c) {
a = c;
return w;
};
w.xhr = function() {
return e;
};
w.strip = y;
w.parse = q;
w.submit = function(c, g, n) {
function v(E, H) {
H.disabled ? H.setAttribute("data-was-disabled", "true") : H.disabled = !0;
}
function C(E, H) {
H.getAttribute("data-was-disabled") || (H.disabled = !1);
}
function A(E) {
E.find(".button-primary").removeClass("loading");
E.find("button").each(C);
E.find("input").each(C);
E.find("select").each(C);
E.find("textarea").each(C);
E.removeClass("disabled loading");
}
const z = B(c), F = z.serialize();
(function(E) {
E.find(".button-primary").addClass("loading");
E.find("button").each(v);
E.find("input").each(v);
E.find("select").each(v);
E.find("textarea").each(v);
E.addClass("disabled loading");
})(z);
return f(c.route.value, function(E, H, I) {
A(z);
g && g(E, H, I);
}, function(E, H, I) {
A(z);
n && n(E, H, I);
}, {
type: c.method,
data: F
});
};
w.post = function(c, g, n, v) {
let C = !0, A = g || {}, z = t(c);
r.FormData && A instanceof FormData ? (C = !1, g = k) : g = Array.isArray(A) ? b : d;
g(A, "action", "loco_json");
g(A, "route", c);
g(A, "loco-nonce", z);
return f(c, n, v, {
type: "post",
data: A,
processData: C,
contentType: C ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(c, g, n, v) {
g = g || {};
const C = t(c);
g.action = "loco_json";
g.route = c;
g["loco-nonce"] = C;
return f(c, n, v, {
type: "get",
data: g
});
};
w.setNonce = function(c, g) {
u[c] = g;
return w;
};
return w;
}({}, L, M));
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
let t;
w.init = function() {
return new y();
};
w.cast = function(d) {
return d instanceof y ? d : "string" === typeof d ? w.parse(d) : w.clone(d);
};
w.clone = function(d) {
const b = new y();
for (const k in d) b[k] = d[k];
return b;
};
w.parse = function(d) {
d = (t || (t = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(d);
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
const k = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const f = k[d], l = this[f];
l && (b.push(f), b.push(f + "-" + l.toLowerCase()));
}
return b.join(" ");
};
r.isRTL = function() {
return !!q[String(this.lang).toLowerCase()];
};
r = null;
return w;
}({}, L, M));
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
function q(a, e, c) {
a = String(a || "").toLowerCase().replace(m, y).split(x);
const g = a.length;
let n = -1;
a: for (;++n < g; ) {
var v = a[n];
if (v && null == c[v]) {
const F = [];
var C = v.length;
let E = 0;
do {
var A = u.exec(v);
if (A) {
A = A[0];
var z = A.length;
if (E) for (let H = 0; H < E; H++) F[H] += A; else if (z === C) {
null == c[A] && (e.push(A), c[A] = !0);
continue a;
}
F.push(A);
E++;
v = v.substring(z);
if ("" === v) break;
}
if (A = h.exec(v)) {
A = A[0];
if (E) for (z = 0; z < E; z++) F[z] += A; else F.push(A), E++;
v = v.substring(A.length);
}
} while ("" !== v);
for (v = 0; v < F.length; v++) C = F[v], null == c[C] && (e.push(C), c[C] = !0);
}
}
return e;
}
function t(a) {
return q(a, [], {});
}
function d(a) {
let e = [], c = {}, g = a.length;
for (;0 !== g--; ) q(a[g], e, c);
return e;
}
function b() {
l = "";
f = [];
}
let k = [], f = [], l = "";
const m = /[^a-z0-9]/g, p = D.require("1c"), x = /\s+/, u = /^[\d\p{L}]+/u, h = /^[^\d\p{L}]+/u;
return {
split: t,
find: function(a, e) {
const c = [], g = [], n = String(a || "").toLowerCase().replace(m, y).split(" "), v = n.length, C = l && a.substring(0, l.length) === l ? f : k, A = C.length, z = !!e;
let F = -1, E = 0;
a: for (;++F < A; ) {
const H = C[F], I = H && H.length;
if (I) {
b: for (let O = 0; O < v; O++) {
const R = n[O];
for (let J = 0; J < I; J++) if (0 === H[J].indexOf(R)) continue b;
continue a;
}
g[F] = H;
c.push(z ? e[F] : F);
} else E++;
}
l = a;
f = g;
return c;
},
add: function(a, e) {
k[a] = t(e);
l && b();
},
push: function(a) {
k[k.length] = d(a);
l && b();
},
index: function(a, e) {
k[a] = d(e);
l && b();
},
size: function() {
return k.length;
},
clear: function() {
k = [];
l && b();
},
remove: function(a) {
k[a] = null;
l && b();
},
noop: function() {
b();
return [];
}
};
};
return w;
}({}, L, M));
D.register("b", function(w, r, G) {
w.listen = function(y, q) {
function t() {
u[f ? "show" : "hide"]();
}
function d(h) {
x && p.setAttribute("size", 2 + h.length);
f = h;
t();
return h;
}
function b() {
l = null;
q(f);
}
function k(h) {
let a = p.value;
a !== f ? (l && clearTimeout(l), d(a), h ? l = setTimeout(b, h) : b()) : l && null == h && (clearTimeout(l), 
b());
}
let f, l, m = 150;
const p = y instanceof jQuery ? y[0] : y, x = 1 === Number(p.size), u = B('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(h) {
h.preventDefault();
p.value = "";
k();
B(p).triggerHandler("blur");
return !1;
});
d(p.value);
B(p).on("input", function() {
k(m);
return !0;
}).on("blur focus change", function() {
k(null);
return !0;
}).after(u);
t();
return {
delay: function(h) {
m = h;
return this;
},
ping: function(h) {
h ? (l && clearTimeout(l), d(p.value), b(), h = void 0) : h = k();
return h;
},
val: function(h) {
if (null == h) return f;
l && clearTimeout(l);
p.value = d(h);
t();
},
el: function() {
return p;
},
blur: function(h) {
return B(p).on("blur", h);
},
destroy: function() {
l && clearTimeout(l);
}
};
};
return w;
}({}, L, M));
D.register("c", function(w, r, G) {
function y(b, k) {
return "function" == typeof b ? b.call(k) : b;
}
function q(b, k) {
this.$element = B(b);
this.options = k;
this.enabled = !0;
this.fixTitle();
}
w.init = function(b, k) {
let f = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: d,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
k && (f = B.extend({}, f, k));
b.tipsy(f);
};
w.delays = function(b, k) {
t = b || 150;
d = k || 100;
};
w.kill = function() {
B("div.tipsy").remove();
};
w.text = function(b, k) {
k.data("tipsy").setTitle(b);
};
let t, d;
w.delays();
B(G.body).on("overlayOpened overlayClosing", function() {
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
const l = f[0].offsetHeight, m = y(this.options.gravity, this.$element[0]);
var k = this.options.anchor;
k = k ? this.$element.find(k) : this.$element;
k = B.extend({}, k.offset(), {
width: k[0].offsetWidth,
height: k[0].offsetHeight
});
let p;
switch (m.charAt(0)) {
case "n":
p = {
top: k.top + k.height + this.options.offset,
left: k.left + k.width / 2 - b / 2
};
break;

case "s":
p = {
top: k.top - l - this.options.offset,
left: k.left + k.width / 2 - b / 2
};
break;

case "e":
p = {
top: k.top + k.height / 2 - l / 2,
left: k.left - b - this.options.offset
};
break;

case "w":
p = {
top: k.top + k.height / 2 - l / 2,
left: k.left + k.width + this.options.offset
};
}
2 === m.length && ("w" === m.charAt(1) ? p.left = k.left + k.width / 2 - 15 : p.left = k.left + k.width / 2 - b + 15);
f.css(p).addClass("tipsy-" + m);
f.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + m.charAt(0);
this.options.className && f.addClass(y(this.options.className, this.$element[0]));
f.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
let b = this.$element, k = b.attr("title") || "";
(k || "string" !== typeof b.attr("original-title")) && b.attr("original-title", k).removeAttr("title");
},
getTitle: function() {
let b, k = this.$element, f = this.options;
this.fixTitle();
"string" == typeof f.title ? b = k.attr("title" == f.title ? "original-title" : f.title) : "function" == typeof f.title && (b = f.title.call(k[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || f.fallback;
},
setTitle: function(b) {
let k = this.$element;
k.attr("default-title") || k.attr("default-title", this.getTitle());
null == b && (b = k.attr("default-title") || this.getTitle());
k.attr("original-title", b);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
},
tip: function() {
this.$tip || (this.$tip = B('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
B.fn.tipsy = function(b) {
function k(m) {
let p = B.data(m, "tipsy");
p || (p = new q(m, B.fn.tipsy.elementOptions(m, b)), B.data(m, "tipsy", p));
return p;
}
function f() {
let m = k(this), p = b.delayIn;
m.hoverState = "in";
0 == p ? m.show() : (m.fixTitle(), setTimeout(function() {
"in" == m.hoverState && m.show();
}, p));
}
function l() {
let m = k(this), p = b.delayOut;
m.hoverState = "out";
0 == p ? m.hide() : (m.tip().removeClass("in"), setTimeout(function() {
"out" == m.hoverState && m.hide();
}, p));
}
if (this.hasClass("disabled")) this.on("click", function(m) {
m.preventDefault();
return !1;
});
b = B.extend({}, B.fn.tipsy.defaults, b);
b.live || this.each(function() {
k(this);
});
if ("manual" != b.trigger) {
let m = b.live ? "live" : "bind", p = "hover" == b.trigger ? "mouseleave" : "blur";
this[m]("hover" == b.trigger ? "mouseenter" : "focus", f)[m](p, l);
}
return this;
};
B.fn.tipsy.defaults = {
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
B.fn.tipsy.elementOptions = function(b, k) {
return B.metadata ? B.extend({}, k, B(b).metadata()) : k;
};
B.fn.tipsy.autoNS = function() {
return B(this).offset().top > B(G).scrollTop() + B(r).height() / 2 ? "s" : "n";
};
B.fn.tipsy.autoWE = function() {
return B(this).offset().left > B(G).scrollLeft() + B(r).width() / 2 ? "e" : "w";
};
B.fn.tipsy.autoBounds = function(b, k) {
return function() {
var f = k[0], l = 1 < k.length ? k[1] : !1;
let m = B(G).scrollTop() + b, p = B(G).scrollLeft() + b, x = B(this);
x.offset().top < m && (f = "n");
x.offset().left < p && (l = "w");
B(r).width() + B(G).scrollLeft() - x.offset().left < b && (l = "e");
B(r).height() + B(G).scrollTop() - x.offset().top < b && (f = "s");
return f + (l ? l : "");
};
};
return w;
}({}, L, M));
D.register("28", function(w, r, G) {
function y() {}
let q, t;
const d = D.require("1b");
w.init = function() {
return new y();
};
w.cast = function(b) {
return b instanceof y ? b : "string" === typeof b ? w.parse(b) : w.clone(b);
};
w.clone = function(b) {
const k = new y();
for (const f in b) k[f] = b[f];
return k;
};
w.parse = function(b) {
q || (t = /[-_+]/, q = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
b = String(b).split(t).join("-");
b = q.exec(b);
if (!b) return null;
const k = new y();
k.lang = b[1].toLowerCase();
b[2] && (k.script = b[2].charAt(0).toUpperCase() + b[2].substring(1).toLowerCase());
b[3] && (k.region = b[3].toUpperCase());
b[4] && (k.variant = b[4].toLowerCase());
b[5] && (k.extension = b[5]);
return k;
};
r = y.prototype;
r.isValid = function() {
return !!this.lang;
};
r.toString = function(b) {
b = b || "-";
let k, f = this.lang || "zxx";
if (k = this.script) f += b + k;
if (k = this.region) f += b + k;
if (k = this.variant) f += b + k;
if (k = this.extension) f += b + k;
return f;
};
r.getIcon = function() {
let b = 4, k = [];
const f = [ "variant", "region", "script", "lang" ];
for (;0 !== b--; ) {
const l = f[b];
let m = this[l];
m && (m.join && (m = m.join("-")), 1 === b && 3 === m.length ? k.push("region-m49") : k = k.concat([ l, l + "-" + m.toLowerCase() ]));
}
return k.join(" ");
};
r.isRTL = function() {
return !!d[String(this.script || this.lang).toLowerCase()];
};
r = null;
return w;
}({}, L, M));
D.register("29", function(w, r, G) {
function y(b) {
r.console && console.error && console.error(b);
}
function q() {
y("Method not implemented");
}
function t() {}
function d(b) {}
t.prototype.toString = function() {
return "[Undefined]";
};
d.prototype._validate = function(b) {
let k, f, l = !0;
for (k in this) f = this[k], f === q ? (y(b + "." + k + "() must be implemented"), 
l = !1) : f instanceof t && (y(b + "." + k + " must be defined"), l = !1);
return l;
};
w.init = function(b, k) {
const f = new d();
if (b) {
let l = b.length;
for (;0 !== l--; ) f[b[l]] = q;
}
if (k) for (b = k.length; 0 !== b--; ) f[k[b]] = new t();
return f;
};
w.validate = function(b) {
const k = /function (\w+)\(/.exec(b.toString());
b.prototype._validate(k && k[1] || "Object");
};
return w;
}({}, L, M));
D.register("30", function(w, r, G) {
let y = 0, q = r.requestAnimationFrame, t = r.cancelAnimationFrame;
if (!q || !t) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (q = r[b + "RequestAnimationFrame"]) if (t = r[b + "CancelAnimationFrame"] || r[b + "CancelRequestAnimationFrame"]) break;
q && t || (q = function(b) {
var k = d();
const f = Math.max(0, 16 - (k - y)), l = k + f;
k = r.setTimeout(function() {
b(l);
}, f);
y = l;
return k;
}, t = function(b) {
clearTimeout(b);
});
const d = Date.now || function() {
return new Date().getTime();
};
w.loop = function(b, k) {
function f() {
m = q(f, k);
b(l++);
}
let l = 0, m;
f();
return {
stop: function() {
m && t(m);
m = null;
}
};
};
return w;
}({}, L, M));
D.register("2d", function(w, r, G) {
function y(p, x, u, h) {
if (d) {
const a = u;
u = function(e) {
if ((e.MSPOINTER_TYPE_TOUCH || "touch") === e.pointerType) return a(e);
};
}
p.addEventListener(x, u, h);
return {
unbind: function() {
p.removeEventListener(x, u, h);
}
};
}
function q(p) {
p.preventDefault();
p.stopPropagation();
return !1;
}
let t;
const d = !!r.navigator.msPointerEnabled, b = d ? "MSPointerDown" : "touchstart", k = d ? "MSPointerMove" : "touchmove", f = d ? "MSPointerUp" : "touchend";
w.ok = function(p) {
null == t && (t = "function" === typeof G.body.addEventListener);
t && p && p(w);
return t;
};
w.ms = function() {
return d;
};
w.dragger = function(p, x) {
function u(c) {
p.addEventListener(c, a[c], !1);
}
function h(c) {
p.removeEventListener(c, a[c], !1);
}
const a = {};
a[b] = function(c) {
l(c, function(g, n) {
n.type = b;
x(c, n, e);
});
u(k);
u(f);
return !0;
};
a[f] = function(c) {
h(k);
h(f);
l(c, function(g, n) {
n.type = f;
x(c, n, e);
});
return !0;
};
a[k] = function(c) {
l(c, function(g, n) {
n.type = k;
x(c, n, e);
});
return q(c);
};
u(b);
let e = {
kill: function() {
h(b);
h(k);
h(f);
p = e = x = null;
}
};
return e;
};
w.swiper = function(p, x, u) {
function h(F) {
p.addEventListener(F, v[F], !1);
}
function a(F) {
p.removeEventListener(F, v[F], !1);
}
function e() {
c && c.stop();
c = null;
}
let c, g, n, v = {}, C = [], A = [], z = [];
v[b] = function(F) {
g = !1;
e();
const E = m();
l(F, function(H, I) {
C[H] = E;
A[H] = I.clientX;
z[H] = I.clientY;
});
n = p.scrollLeft;
return !0;
};
v[f] = function(F) {
l(F, function(E, H) {
const I = m() - C[E];
E = A[E] - H.clientX;
x(Math.abs(E) / I, E ? 0 > E ? -1 : 1 : 0);
});
n = null;
return !0;
};
v[k] = function(F) {
let E, H;
null == n || l(F, function(I, O) {
E = A[I] - O.clientX;
H = z[I] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(E)) return g = !0;
E && (g = !0, p.scrollLeft = Math.max(0, n + E));
return q(F);
};
if (!d || u) h(b), h(k), h(f), d && (p.className += " mstouch");
return {
kill: function() {
a(b);
a(k);
a(f);
e();
},
swiped: function() {
return g;
},
ms: function() {
return d;
},
snap: function(F) {
d && !u && (p.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
p.style["-ms-scroll-snap-type"] = "mandatory", p.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, E, H) {
e();
let I = p.scrollLeft;
const O = F > I ? 1 : -1, R = Math[1 === O ? "min" : "max"], J = Math.round(16 * E * O);
return c = D.require("30").loop(function(Q) {
Q && (I = Math.max(0, R(F, I + J)), p.scrollLeft = I, F === I && (e(), H && H(I)));
}, p);
}
};
};
w.start = function(p, x) {
return y(p, b, x, !1);
};
w.move = function(p, x) {
return y(p, k, x, !1);
};
w.end = function(p, x) {
return y(p, f, x, !1);
};
const l = w.each = function(p, x) {
if (d) (p.MSPOINTER_TYPE_TOUCH || "touch") === p.pointerType && x(0, p); else {
p = (p.originalEvent || p).changedTouches || [];
for (var u = -1; ++u < p.length; ) x(u, p[u]);
}
}, m = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, L, M));
D.register("31", function(w, r, G) {
w.init = function(y) {
function q() {
k.style.top = String(-y.scrollTop) + "px";
return !0;
}
function t() {
const l = k;
l.textContent = y.value;
const m = l.innerHTML;
"" !== m && (l.innerHTML = m.replace(/[ \t]/g, d).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function d(l) {
return '<span class="x' + l.charCodeAt(0).toString(16) + '">' + l + "</span>";
}
const b = y.parentNode;
let k = b.insertBefore(G.createElement("div"), y);
B(y).on("input", t).on("scroll", q);
B(b).addClass("has-mirror");
k.className = "ta-mirror";
const f = y.offsetWidth - y.clientWidth;
2 < f && (k.style.marginRight = String(f - 2) + "px");
t();
q();
return {
kill: function() {
B(y).off("input", t).off("scroll", q);
b.removeChild(k);
k = null;
B(b).removeClass("has-mirror");
}
};
};
return w;
}({}, L, M));
D.register("23", function(w, r, G) {
function y(d, b) {
d = q[d] || [];
b = b && r[b];
const k = d.length;
let f = -1, l = 0;
for (;++f < k; ) {
const m = d[f];
"function" === typeof m && (m(b), l++);
}
return l;
}
const q = {};
let t = "";
w.load = function(d, b, k) {
function f() {
p && (clearTimeout(p), p = null);
x && (x.onreadystatechange = null, x = x = x.onload = null);
d && (delete q[d], d = null);
}
function l(u, h) {
u = x && x.readyState;
if (h || !u || "loaded" === u || "complete" === u) h || y(d, k), f();
}
function m() {
if (0 === y(d)) throw Error('Failed to load "' + (k || d) + '"');
f();
}
if (k && r[k]) "function" === typeof b && b(r[k]); else if (null != q[d]) q[d].push(b); else {
q[d] = [ b ];
var p = setTimeout(m, 4e3), x = G.createElement("script");
x.setAttribute("src", d);
x.setAttribute("async", "true");
x.onreadystatechange = l;
x.onload = l;
x.onerror = m;
x.onabort = f;
G.getElementsByTagName("head")[0].appendChild(x);
}
};
w.stat = function(d) {
var b;
if (!(b = t)) {
{
b = G.getElementsByTagName("script");
const k = b.length;
let f = -1, l = "";
for (;++f < k; ) {
const m = b[f].getAttribute("src");
if (m) {
const p = m.indexOf("/lib/vendor");
if (-1 !== p) {
l = m.substring(0, p);
break;
}
}
}
b = l || "/static";
}
b = t = b;
}
return b + d;
};
w.css = function(d, b) {
G.getElementById(b) || B("<link />").attr("rel", "stylesheet").attr("href", d).attr("id", b).appendTo(G.head);
};
return w;
}({}, L, M));
D.register("10", function(w, r, G) {
function y(m, p) {
m.setReadOnly(!1);
m.on("change", function(x, u) {
return p.val(u.getValue());
});
m.on("focus", function() {
return p.focus();
});
m.on("blur", function() {
return p.blur();
});
}
function q(m) {
m.off("change");
m.off("focus");
m.off("blur");
}
function t(m) {
q(m);
m.setReadOnly(!0);
m.setHighlightGutterLine(!1);
m.setHighlightActiveLine(!1);
}
function d(m, p) {
function x() {
this.HighlightRules = h;
}
m = m.require;
const u = m("ace/lib/oop"), h = b(p);
u.inherits(h, m("ace/mode/text_highlight_rules").TextHighlightRules);
u.inherits(x, m("ace/mode/text").Mode);
return new x();
}
function b(m) {
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
}, x = k(m);
"icu" === m ? p = {
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
} : "mf2" === m ? p = {
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
function k(m) {
switch (m) {
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

case l:
return f || /%%/;
}
}
let f, l = "auto";
w.init = function(m, p, x) {
let u, h = !1, a = x || l, e = m.parentNode, c = e.appendChild(G.createElement("div"));
B(e).addClass("has-proxy has-ace");
var g = r.loco;
x = D.require("23");
g = g && g.aceUrl || x.stat("/lib/ace.min.js");
x.load(g, function(n) {
if (c) {
if (!n) throw Error("Failed to load code editor");
u = n.edit(c);
var v = u.session, C = u.renderer;
u.$blockScrolling = Infinity;
u.setShowInvisibles(h);
u.setWrapBehavioursEnabled(!1);
u.setBehavioursEnabled(!1);
u.setHighlightActiveLine(!1);
v.setUseSoftTabs(!1);
C.setShowGutter(!0);
C.setPadding(10);
C.setScrollMargin(8);
v.setMode(d(n, a));
u.setValue(m.value, -1);
v.setUseWrapMode(!0);
p ? y(u, p) : t(u);
}
}, "ace");
return {
kill: function() {
u && (q(u), u.destroy(), u = null);
c && (e.removeChild(c), B(e).removeClass("has-proxy has-ace"), c = null);
return this;
},
disable: function() {
u && t(u);
p = null;
return this;
},
enable: function(n) {
p = n;
u && y(u, n);
return this;
},
resize: function() {
u && u.resize();
return this;
},
val: function(n) {
u && n !== u.getValue() && u.setValue(n, -1);
return this;
},
invs: function(n) {
n = n || !1;
h !== n && (h = n, u && u.setShowInvisibles(n));
return this;
},
strf: function(n) {
n = n || l;
n !== a && (a = n, u && u.session.setMode(d(r.ace, n)));
return this;
},
focus: function() {
u && u.focus();
return this;
}
};
};
w.strf = function(m, p) {
l = m;
f = p;
return w;
};
return w;
}({}, L, M));
D.register("32", function(w, r, G) {
function y(b, k) {
function f() {
return k.val(b.getContent());
}
b.on("input", f);
b.on("change", f);
b.on("focus", function() {
return k.focus();
});
b.on("blur", function() {
return k.blur();
});
b.setMode("design");
}
function q(b) {
b.off("input");
b.off("change");
b.off("focus");
b.off("blur");
}
function t(b) {
q(b);
b.setMode("readonly");
}
let d = 0;
w.load = function(b) {
const k = D.require("23");
k.css(k.stat("/css/lib/tinymce.css"), "tinymce-css");
k.load(k.stat("/lib/tinymce.min.js"), b, "tinymce");
return w;
};
w.init = function(b, k) {
function f(A) {
x = A;
u = "<p>" === A.substring(0, 3) && "</p>" === A.substring(A.length - 4);
return A.replace(v, "$1x-$2");
}
function l(A) {
m = A;
A._getContent = A.getContent;
A.getContent = function(z) {
z = this._getContent(z);
z = z.replace(C, "$1$2");
if (!u && "<p>" === z.substring(0, 3) && "</p>" === z.substring(z.length - 4)) {
const F = z.substring(3, z.length - 4);
if (F === x || -1 === F.indexOf("</p>")) z = F;
}
return z;
};
A._setContent = A.setContent;
A.setContent = function(z, F) {
return this._setContent(f(z), F);
};
A.setContent(b.value);
k ? (y(A, k), k.reset()) : t(A);
B(e).removeClass("loading");
}
let m, p = !1, x = "", u = !1, h = b.parentNode, a = h.parentNode, e = h.appendChild(G.createElement("div")), c = a.insertBefore(G.createElement("nav"), h);
const g = [ "script", "style", "form", "iframe", "object" ], n = [ "embed", "applet", "meta", "base", "link" ], v = new RegExp("(</?)((?:" + g.join("|") + ")[^>]*>)", "ig"), C = new RegExp("(</?)x-((?:" + g.join("|") + ")[^>]*>)", "ig");
c.id = "_tb" + String(++d);
B(h).addClass("has-proxy has-mce");
B(e).addClass("mce-content-body loading").text("Initializing...");
w.load(function(A) {
if (!A) throw Error("Failed to load HTML editor");
e && A.init({
inline: !0,
target: e,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + c.id,
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
extended_valid_elements: "span,b,i,u,x-" + g.join("[*],x-") + "[*]",
protect: [ new RegExp("<(?:" + n.join("|") + ")[^>]*>", "gi") ],
invalid_elements: g.join(",") + "," + n.join(","),
init_instance_callback: l
});
});
return {
val: function(A) {
A = f(A);
null == m ? (b.value = A, console.log(".EARLY => .val( " + A), B(e).html(A)) : m.getContent() !== A && m.setContent(A);
k && k.val(A);
return this;
},
kill: function() {
m && (k && k.val(m.getContent()), q(m), m.destroy(), m = null);
e && (h.removeChild(e), B(h).removeClass("has-proxy has-mce"), e = null);
c && (a.removeChild(c), c = null);
return this;
},
enable: function(A) {
k = A;
m && y(m, A);
return this;
},
disable: function() {
m && t(m);
k = null;
return this;
},
focus: function() {
m && k && m.focus();
return this;
},
invs: function(A) {
A = A || !1;
p !== A && (p = A, B(h)[A ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, L, M));
D.register("33", function(w, r, G) {
w.init = function(y, q) {
function t(a) {
x !== a && (h.textContent = a.format(0), x = a, a = 0 === a ? "empty" : 0 === q || a < q ? "lt" : q === a ? "eq" : "gt", 
a !== p && (p = a, u.className = "wg-count is-" + a));
}
function d(a) {
m && (u.removeChild(m), m = null);
0 < a && (m = u.appendChild(f.el("span").appendChild(f.txt(" / " + a.format(0)))));
q = a;
}
function b(a, e) {
t(e.length);
}
function k() {
p = "";
x = -1;
t(y.val().length);
}
const f = D.require("1a"), l = B(y.parent()).on("changing", b);
let m, p, x, u = f.el("div"), h = u.appendChild(f.el("span"));
l.append(u);
d(q);
k();
return {
ping: function(a) {
null != a && a !== q && (q = a, d(a));
k();
},
kill: function() {
const a = l && l[0];
a && u && u.parentNode === a && (l.off("changing", b), a.removeChild(u));
}
};
};
return w;
}({}, L, M));
D.register("2e", function(w, r, G) {
function y(d) {
function b() {
h && (p.off("input", k), h = !1);
}
function k() {
const e = d.value;
e !== a && (p.trigger("changing", [ e, a ]), a = e);
}
function f() {
k();
h && u !== a && p.trigger("changed", [ a ]);
}
function l() {
t = d;
u = a;
h || (p.on("input", k), h = !0);
p.trigger("editFocus");
x.addClass("has-focus");
return !0;
}
function m() {
t === d && (t = null);
p.trigger("editBlur");
x.removeClass("has-focus");
h && (f(), b());
return !0;
}
const p = B(d), x = B(d.parentNode);
let u, h = !1, a = d.value;
p.on("blur", m).on("focus", l);
return {
val: function(e) {
a !== e && (d.value = e, p.triggerHandler("input"), a = e);
return !0;
},
kill: function() {
b();
p.off("blur", m).off("focus", l);
},
fire: function() {
a = null;
k();
},
ping: f,
blur: m,
focus: l,
reset: function() {
u = a = d.value;
}
};
}
function q(d) {
this.e = d;
}
let t;
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
let k = this.l;
this.nocount();
k && !b && (this.disable(), k = null);
this.val(d || "");
b && !k && this.enable();
return this;
};
r.val = function(d) {
const b = this.e;
if (null == d) return b.value;
const k = this.l, f = this.p;
f && f.val(d);
k && k.val(d);
k || b.value === d || (b.value = d, B(b).triggerHandler("input"));
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
d ? d.focus() : B(this.e).focus();
};
r.focused = function() {
return t && t === this.el;
};
r.parent = function() {
return this.e.parentNode;
};
r.attr = function(d, b) {
const k = this.e;
if (1 === arguments.length) return k.getAttribute(d);
null == b ? k.removeAttribute(d) : k.setAttribute(d, b);
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
const k = this.i || !1;
if (b || k !== d) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(d) : d && (this._i = D.require("31").init(this.e)), 
this.i = d;
return this;
};
r.getInvs = function() {
return this.i || !1;
};
r.setMode = function(d) {
let b = this.p, k = this.i || !1;
d !== (this.m || "") && (this.m = d, b && b.kill(), this.p = b = "code" === d ? D.require("10").init(this.e, this.l, this["%"]) : "html" === d ? D.require("32").init(this.e, this.l) : null, 
this.setInvs(k, !0), t && this.focus());
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
}({}, L, M));
D.register("2f", function(w, r, G) {
function y(h) {
const a = r.console;
a && a.error && a.error(h);
}
function q(h) {
const a = G.createElement("div");
h && a.setAttribute("class", h);
return a;
}
function t(h) {
return function() {
h.resize();
return this;
};
}
function d(h) {
return function(a) {
let e = a.target, c = e.$index;
for (;null == c && "DIV" !== e.nodeName && (e = e.parentElement); ) c = e.$index;
null != c && (a.stopImmediatePropagation(), h.select(c));
return !0;
};
}
function b(h) {
return function() {
h.redrawDirty() && h.redraw();
return !0;
};
}
function k(h) {
return function(a) {
var e = a.keyCode;
if (40 === e) e = 1; else if (38 === e) e = -1; else return !0;
if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !0;
h.selectNext(e);
a.stopPropagation();
a.preventDefault();
return !1;
};
}
function f(h, a, e) {
function c(g) {
y("row[" + g + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(g) {
const n = a || 0, v = e ? -1 : 1, C = h.rows || [];
g.sort(function(A, z) {
return v * (C[A] || c(A)).cellVal(n).localeCompare((C[z] || c(z)).cellVal(n));
});
};
}
function l(h) {
this.w = h;
}
function m(h) {
this.t = h;
this.length = 0;
}
function p(h, a, e) {
let c = G.createElement("div");
c.className = e || "";
this._ = c;
this.d = a || [];
this.i = h || 0;
this.length = a.length;
}
function x(h) {
this.live = h;
this.rows = [];
}
w.create = function(h) {
return new l(h);
};
var u = l.prototype;
u.init = function(h) {
let a = this.w, e = a.id;
var c = a.splity(e + "-thead", e + "-tbody"), g = c[0];
c = c[1];
let n = [], v = [], C = [], A = [];
if (h) this.ds = h, this.idxs = v, this._idxs = null; else if (!(h = this.ds)) throw Error("No datasource");
g.css.push("wg-thead");
c.css.push("wg-tbody");
h.eachCol(function(O, R, J) {
C[O] = e + "-col-" + R;
A[O] = J || R;
});
var z = q();
let F = -1, E = C.length, H = q("wg-cols"), I = g.splitx.apply(g, C);
for (;++F < E; ) I[F].header(A[F]), H.appendChild(z.cloneNode(!1)).setAttribute("for", C[F]);
h.eachRow(function(O, R, J) {
n[O] = new p(O, R, J);
v[O] = O;
});
this.rows = n;
this.cols = H;
this.ww = null;
this.root = z = c.body;
this.head = g;
g.redraw = t(this);
a.css.push("is-table");
a.restyle();
g = c.fixed = I[0].bodyY() || 25;
a.lock().resize(g, c);
this.sc ? this._re_sort(E) : h.sort && h.sort(v);
this.redrawDirty();
this.render();
B(z).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", d(this)).on("scroll", b(this));
return this;
};
u.clear = function() {
const h = this.pages || [];
let a = h.length;
for (;0 !== a--; ) h[a].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
u.render = function() {
let h, a = [], e = this.rows || [], c = -1, g, n = this.idxs, v = n.length, C = this.idxr = {}, A = this.r, z = this._r, F = this.root, E = this.cols;
for (;++c < v; ) {
if (0 === c % 100) {
var H = E.cloneNode(!0);
h = new x(H);
h.i = a.length;
h.h = 2200;
h.insert(F);
a.push(h);
}
g = n[c];
C[g] = c;
H = e[g];
if (null == H) throw Error("Render error, no data at [" + g + "]");
H.page = h;
h.rows.push(H);
}
h && 100 !== h.size() && h.sleepH(22);
this.pages = a;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == A ? null != z && (H = e[z]) && H.page && (delete this._r, this.select(z, !0)) : (H = e[A]) && H.page ? this.select(A, !0) : (this.deselect(!1), 
this._r = A);
return this;
};
u.resize = function() {
let h = -1, a = this.ww || (this.ww = []);
var e = this.w;
let c = e.cells[0], g = c.body.childNodes, n = g.length, v = this.pages || [], C = v.length;
for (e.redraw.call(c); ++h < n; ) a[h] = g[h].style.width;
if (C) {
e = this.mx;
for (h = this.mn; h <= e; h++) v[h].widths(a);
this.redrawDirty() && this.redraw();
}
};
u.redrawDirty = function() {
let h = !1;
var a = this.root;
const e = a.scrollTop;
a = a.clientHeight;
this.sy !== e && (h = !0, this.sy = e);
this.vh !== a && (h = !0, this.vh = a);
return h;
};
u.redraw = function() {
let h = 0, a = -1, e = null, c = null, g = this.ww;
var n = this.sy;
let v = this.mn, C = this.mx, A = Math.max(0, n - 100);
n = this.vh + n + 100;
let z, F = this.pages || [], E = F.length;
for (;++a < E && !(h > n); ) z = F[a], h += z.height(), h < A || (null === e && (e = a), 
c = a, z.rendered || z.render(g));
if (v !== e) {
if (null !== v && e > v) for (a = v; a < e; a++) {
z = F[a];
if (!z) throw Error("Shit!");
z.rendered && z.sleep();
}
this.mn = e;
}
if (C !== c) {
if (null !== C && c < C) for (a = C; a > c; a--) z = F[a], z.rendered && z.sleep();
this.mx = c;
}
};
u.selected = function() {
return this.r;
};
u.thead = function() {
return this.w.cells[0];
};
u.tbody = function() {
return this.w.cells[1];
};
u.tr = function(h) {
return (h = this.row(h)) ? h.cells() : [];
};
u.row = function(h) {
return this.rows[h];
};
u.td = function(h, a) {
return this.tr(h)[a];
};
u.next = function(h, a, e) {
null == e && (e = this.r || 0);
const c = this.idxs, g = c.length;
let n = e = (this.idxr || {})[e];
for (;e !== (n += h) && !(0 <= n && g > n); ) if (a && g) n = 1 === h ? -1 : g, 
a = !1; else return null;
e = c[n];
return null == e || null == this.rows[e] ? (y("Bad next: [" + n + "] does not map to data row"), 
null) : e;
};
u.selectNext = function(h, a, e) {
h = this.next(h, a, null);
null != h && this.r !== h && this.select(h, e);
return this;
};
u.deselect = function(h) {
const a = this.r;
null != a && (this.r = null, B(this.tr(a)).removeClass("selected"), this.w.fire("wgRowDeselect", [ a, h ]));
return this;
};
u.selectRow = function(h, a) {
return this.select(this.idxs[h], a);
};
u.select = function(h, a) {
const e = this.rows[h];
var c = e && e.page;
if (!c) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let g, n = this.w.cells[1];
c.rendered || (g = c.top(), n.scrollY(g), this.redrawDirty() && this.redraw());
if (!e.rendered) return c.rendered || y("Failed to render page"), y("Row [" + e.i + "] not rendered"), 
this;
c = e.cells();
B(c).addClass("selected");
this.r = h;
a || (g = n.scrollY(), B(this.root).focus(), g !== n.scrollY() && n.scrollY(g));
n.scrollTo(c[0], !0);
this.w.fire("wgRowSelect", [ h, e.data() ]);
return this;
};
u.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
u.filter = function(h) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(h);
return this.clear().render();
};
u.each = function(h) {
let a, e = -1;
const c = this.rows || [], g = this.idxs || [], n = g.length;
for (;++e < n; ) a = g[e], h(c[a], e, a);
return this;
};
u.sortable = function(h) {
const a = this.sc || (this.sc = new m(this));
a.has(h) || a.add(h);
return this;
};
u._re_sort = function(h) {
let a = -1, e = this.sc, c = e.active;
for (this.sc = e = new m(this); ++a < h; ) e.add(a);
c && (a = this.head.indexOf(c.id), -1 === a && (a = Math.min(c.idx, h - 1)), this.sort(a, c.desc));
return this;
};
u._sort = function(h, a) {
a ? (this.s = a, a(h)) : (a = this.s) && a(h);
return h;
};
u.sort = function(h, a) {
this._sort(this.idxs, f(this, h, a));
this.sc.activate(h, a);
return this;
};
u = null;
u = m.prototype;
u.has = function(h) {
return null != this[h];
};
u.add = function(h) {
const a = this, e = a.t.head.cells[h];
a[h] = {
desc: null,
idx: h,
id: e.id
};
a.length++;
e.addClass("wg-sortable").on("click", function(c) {
if ("header" === c.target.nodeName.toLowerCase()) return c.stopImmediatePropagation(), 
a.toggle(h), !1;
});
return a;
};
u.toggle = function(h) {
this.t.sort(h, !this[h].desc).clear().render();
return this;
};
u.activate = function(h, a) {
let e, c = this.active, g = this[h], n = this.t.head.cells;
c && (e = n[c.idx]) && (e.removeClass(c.css), c !== g && e.restyle());
(e = n[h]) ? (g.desc = a, this.active = g, h = "wg-" + (a ? "desc" : "asc"), e.addClass(h).restyle(), 
g.css = h) : this.active = null;
return this;
};
u = null;
u = p.prototype;
u.render = function(h) {
let a, e = [], c = this._, g = this.length;
if (c) {
for (this.c = e; 0 !== g--; ) a = c.cloneNode(!1), e[g] = this.update(g, a), a.$index = this.i, 
h[g].appendChild(a);
this._ = null;
} else for (e = this.c; 0 !== g--; ) h[g].appendChild(e[g]);
this.rendered = !0;
return this;
};
u.update = function(h, a) {
a = a || this.c[h] || {};
h = (this.d[h] || function() {})() || " ";
null == h.innerHTML ? a.textContent = h : a.innerHTML = h.innerHTML;
return a;
};
u.cells = function() {
return this.c || [ this._ ];
};
u.data = function() {
const h = [], a = this.length;
let e = -1;
for (;++e < a; ) h[e] = this.cellVal(e);
return h;
};
u.destroy = function() {
this.page = null;
this.rendered = !1;
};
u.cellVal = function(h) {
h = this.d[h]() || "";
return String(h.textContent || h);
};
u = null;
u = x.prototype;
u.size = function() {
return this.rows.length;
};
u.insert = function(h) {
const a = this.h, e = q("wg-dead");
e.style.height = String(a) + "px";
h.appendChild(e);
return this.dead = e;
};
u.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
u.height = function() {
let h = this.h;
null == h && (this.h = h = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHeight);
h || y("row has zero height");
return h;
};
u.render = function(h) {
let a, e = -1, c = this.rows, g = c.length;
const n = this.dead, v = this.live, C = v.childNodes;
for (;++e < g; ) a = c[e], a.rendered || a.render(C);
g = h.length;
for (e = 0; e < g; e++) C[e].style.width = h[e];
n.parentNode.replaceChild(v, n);
this.rendered = !0;
this.h = null;
return this;
};
u.sleep = function() {
const h = this.height(), a = this.live, e = this.dead;
e.style.height = String(h) + "px";
a.parentNode.replaceChild(e, a);
this.rendered = !1;
this.h = h;
return this;
};
u.sleepH = function(h) {
h *= this.rows.length;
const a = this.dead;
a && (a.style.height = String(h) + "px");
this.rendered || (this.h = h);
return this;
};
u.widths = function(h) {
const a = this.live.childNodes;
let e = h.length;
for (;0 !== e--; ) a[e].style.width = h[e];
return this;
};
u.destroy = function() {
var h = this.rendered ? this.live : this.dead;
const a = this.rows;
h.parentNode.removeChild(h);
for (h = a.length; 0 !== h--; ) a[h].destroy();
};
return w;
}({}, L, M));
D.register("2a", function(w, r, G) {
function y(c, g) {
var n = c.id;
let v = n && u[n], C = v && v.parent();
if (!v || !C) return null;
var A = 1 === C.dir;
n = A ? "X" : "Y";
let z = "page" + n;
A = A ? x : p;
let F = A(C.el);
n = g["offset" + n];
let E = C.el, H = E.className;
null == n && (n = g[z] - A(c));
n && (F += n);
E.className = H + " is-resizing";
return {
done: function() {
E.className = H;
},
move: function(I) {
C.resize(I[z] - F, v);
return !0;
}
};
}
function q(c) {
function g() {
B(G).off("mousemove", n);
e && (e.done(), e = null);
return !0;
}
function n(v) {
e ? e.move(v) : g();
return !0;
}
if (e) return !0;
e = y(c.target, c);
if (!e) return !0;
B(G).one("mouseup", g).on("mousemove", n);
return d(c);
}
function t(c, g) {
const n = g.type;
"touchmove" === n ? e && e.move(g) : "touchstart" === n ? e = y(c.target, g) : "touchend" === n && e && (e.done(), 
e = null);
}
function d(c) {
c.stopPropagation();
c.preventDefault();
return !1;
}
function b(c) {
h && h.redraw();
c && c.redraw();
return h = c;
}
function k(c, g) {
const n = B(g);
n.on("editFocus", function(v) {
v.stopPropagation();
n.trigger("wgFocus", [ b(c) ]);
}).on("editBlur", function(v) {
v.stopPropagation();
n.trigger("wgBlur", [ b(null) ]);
});
}
function f(c) {
const g = c.id, n = c.className, v = n ? [ n ] : [];
this.id = g;
this.el = c;
this.pos = this.index = 0;
this._cn = n;
this.css = v.concat("wg-cell");
u[g] = this;
this.clear();
}
const l = D.include("2c") || D.require("2"), m = D.require("1a"), p = m.top, x = m.left, u = {};
let h, a = 0, e = !1;
w.init = function(c) {
const g = new f(c);
g.redraw();
D.require("2d").ok(function(n) {
n.dragger(c, t);
});
B(c).on("mousedown", q);
return g;
};
r = f.prototype;
r.fire = function(c, g) {
c = B.Event(c);
c.cell = this;
B(this.el).trigger(c, g);
return this;
};
r.each = function(c) {
let g = -1;
const n = this.cells, v = n.length;
for (;++g < v; ) c(n[g], g);
return this;
};
r.indexOf = function(c) {
return (c = u[c.id || String(c)]) && c.pid === this.id ? c.index : -1;
};
r.on = function() {
return this.$("on", arguments);
};
r.off = function() {
return this.$("off", arguments);
};
r.find = function(c) {
return B(this.el).find(c);
};
r.$ = function(c, g) {
B.fn[c].apply(B(this.el), g);
return this;
};
r.addClass = function(c) {
this.css.push(c);
return this;
};
r.removeClass = function(c) {
c = this.css.indexOf(c);
-1 !== c && this.css.splice(c, 1);
return this;
};
r.parent = function() {
return this.pid && u[this.pid];
};
r.splitx = function() {
return this._split(1, arguments);
};
r.splity = function() {
return this._split(2, arguments);
};
r._split = function(c, g) {
(this.length || this.field) && this.clear();
let n = -1;
let v = g.length, C = 1 / v, A = 0;
for (;++n < v; ) {
var z = m.el();
this.body.appendChild(z);
var F = z;
{
var E = g[n];
let H = 1, I = E;
for (;u[E]; ) E = I + "-" + ++H;
}
F.id = E;
z = new f(z);
z.index = n;
z.pid = this.id;
z._locale(this.lang, this.rtl);
z.pos = A;
A += C;
this.cells.push(z);
this.length++;
}
this.dir = c;
this.redraw();
return this.cells;
};
r.count = function() {
return this.cells && this.cells.length || 0;
};
r.destroy = function() {
this.clear();
delete u[this.id];
const c = this.el;
c.innerHTML = "";
this.body = null;
c.className = this._cn || "";
B(c).off();
return this;
};
r.exists = function() {
return this === u[this.id];
};
r.clear = function() {
const c = this.el, g = this.cells, n = this.field, v = this.body, C = this.nav;
let A = this.length || 0;
for (;0 !== A--; ) delete u[g[A].destroy().id];
this.cells = [];
this.length = 0;
C && (c.removeChild(C), this.nav = null);
v && (n && (n.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
c === v.parentNode && c.removeChild(v));
this.body = c.appendChild(m.el("", "wg-body"));
this._h = null;
return this;
};
r.resize = function(c, g) {
if (!g && (g = this.cells[1], !g)) return;
var n = g.index;
let v = this.cells, C = B(this.el)[1 === this.dir ? "width" : "height"](), A = v[n + 1];
n = v[n - 1];
g.pos = Math.min((A ? A.pos * C : C) - ((g.body || g.el.firstChild).offsetTop || 0), Math.max(n ? n.pos * C : 0, c)) / C;
this.redraw();
this.fire("wgResize");
return this;
};
r.distribute = function(c) {
let g = -1, n = 0, v;
const C = this.cells, A = c.length;
for (;++g < A && (v = C[++n]); ) v.pos = Math.max(0, Math.min(1, c[g]));
this.redraw();
return this;
};
r.distribution = function() {
let c = [], g = 0;
const n = this.cells, v = n.length - 1;
for (;g < v; ) c[g] = n[++g].pos;
return c;
};
r.restyle = function() {
var c = this.css.concat();
0 === this.index ? c.push("first") : c.push("not-first");
this.dir && (c.push("wg-split"), 2 === this.dir ? c.push("wg-split-y") : c.push("wg-split-x"));
this.t && c.push("has-title");
this.nav && c.push("has-nav");
this.field && (c.push("is-field"), this.field.editable() ? c.push("is-editable") : c.push("is-readonly"));
c = c.join(" ");
c !== this._css && (this._css = c, this.el.className = c);
return this;
};
r.redraw = function(c) {
this.restyle();
const g = this.el;
var n = this.body, v = this.field;
if (n) {
var C = g.clientWidth || 0, A = g.clientHeight || 0, z = n.offsetTop || 0;
A = z > A ? 0 : A - z;
if (this._h !== A) {
this._h = A;
n.style.height = String(A) + "px";
var F = v;
}
this._w !== C && (this._w = C, F = v);
F && F.redraw();
}
n = this.length;
C = 1;
A = this.nav;
for (z = 2 === this.dir ? "height" : "width"; 0 !== n--; ) v = this.cells[n], A ? F = 1 : (v.fixed && (v.pos = v.fixed / B(g)[z]()), 
F = C - v.pos, C = v.pos), v.el.style[z] = String(100 * F) + "%", v.redraw(c);
return this;
};
r.contents = function(c, g) {
const n = this.el;
let v = this.body;
if (null == c) return v.innerHTML;
this.length ? this.clear() : v && (n.removeChild(v), v = null);
v || (this.body = v = n.appendChild(m.el("", g || "wg-content")), this._h = null, 
(g = this.lang) && this._locale(g, this.rtl, !0));
"string" === typeof c ? B(v)._html(c) : c && this.append(c);
this.redraw();
return this;
};
r.textarea = function(c, g) {
let n = this.field;
if (n) {
var v = n.editable();
n.reload(c, g);
v !== g && this.restyle();
} else this.length && this.clear(), v = m.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.setAttribute("autocomplete", "off"), v.setAttribute("id", "wg" + String(++a)), 
v.value = c, this.contents(v), n = D.require("2e")._new(v)[g ? "enable" : "disable"](), 
k(this, v), this.field = n, this.restyle();
this.lang || this.locale("en");
return n;
};
r.locale = function(c) {
c = D.require("28").cast(c);
return this._locale(String(c), c.isRTL());
};
r._locale = function(c, g, n) {
const v = this.body;
if (n || c !== this.lang) this.lang = c, v && v.setAttribute("lang", c);
if (n || g !== this.rtl) this.rtl = g, v && v.setAttribute("dir", g ? "RTL" : "LTR");
return this;
};
r.editable = function() {
let c = this.field;
if (c) return c.editable() ? c : null;
const g = this.cells;
let n = this.navigated();
if (null != n) return g[n].editable();
n = -1;
const v = g.length;
for (;++n < v && (c = g[n].editable(), null == c); );
return c;
};
r.eachTextarea = function(c) {
const g = this.field;
g ? c(g) : this.each(function(n) {
n.eachTextarea(c);
});
return this;
};
r.append = function(c) {
c && (c.nodeType ? l.init(this.body.appendChild(c)) : l.init(B(c).appendTo(this.body)));
return this;
};
r.prepend = function(c) {
const g = this.body;
if (c.nodeType) {
const n = g.firstChild;
l.init(n ? g.insertBefore(c, n) : g.appendChild(c));
} else l.init(B(c).prependTo(g));
return this;
};
r.before = function(c) {
const g = this.body;
c.nodeType ? l.init(this.el.insertBefore(c, g)) : l.init(B(c).insertBefore(g));
return this;
};
r.header = function(c, g) {
if (null == c && null == g) return this.el.getElementsByTagName("header")[0];
this.t = m.txt(c || "");
this.el.insertBefore(m.el("header", g), this.body).appendChild(this.t);
this.redraw();
return this;
};
r.toolbar = function() {
const c = this.header(), g = c.getElementsByTagName("nav");
return 0 === g.length ? c.appendChild(m.el("nav")) : g[0];
};
r.title = function(c) {
const g = this.t;
if (g) return g.nodeValue = c || "", g;
this.header(c);
return this.t;
};
r.titled = function() {
return this.t && this.t.nodeValue;
};
r.bodyY = function() {
return p(this.body, this.el);
};
r.scrollY = function(c) {
if (la === c) return this.body.scrollTop;
this.body.scrollTop = c;
};
r.tabulate = function(c) {
let g = this.table;
g ? g.clear() : g = D.require("2f").create(this);
g.init(c);
return this.table = g;
};
r.lock = function() {
this.body.className += " locked";
return this;
};
r.scrollTo = function(c, g) {
let n = this.body;
var v = n.scrollTop;
let C = p(c, n);
if (v > C) v = C; else {
const A = n.clientHeight;
c = C + B(c).outerHeight();
if (A + v < c) v = c - A; else return;
}
g ? n.scrollTop = v : B(n).stop(!0).animate({
scrollTop: v
}, 250);
};
r.navigize = function(c, g) {
function n(H) {
const I = A[H], O = C[H], R = B(I.el).show();
O.addClass("active");
F = H;
E.data("idx", H);
I.fire("wgTabSelect", [ H ]);
return R;
}
const v = this, C = [], A = v.cells;
let z = v.nav, F;
z && v.el.removeChild(z);
z = v.nav = v.el.insertBefore(m.el("nav", "wg-tabs"), v.body);
const E = B(z).on("click", function(H) {
const I = B(H.target).data("idx");
if (null == I) return !0;
if (null != F) {
{
const O = C[F];
B(A[F].el).hide();
O.removeClass("active");
}
}
n(I);
v.redraw();
return d(H);
});
null == g && (g = E.data("idx") || 0);
v.each(function(H, I) {
C[I] = B('<a href="#' + H.id + '"></a>').data("idx", I).text(c[I]).appendTo(E);
H.pos = 0;
B(H.el).hide();
});
n(A[g] ? g : 0);
v.lock();
v.redraw();
return v;
};
r.navigated = function() {
const c = this.nav;
if (c) return B(c).data("idx");
};
r = null;
return w;
}({}, L, M));
D.register("1d", function(w, r, G) {
function y(a, e) {
a.stopPropagation();
p = e;
return !0;
}
function q(a) {
const e = "Zero One Two Few Many Other".split(" ");
return [ null, [ e[5] ], [ e[1], e[5] ], [ e[1], e[3], e[5] ], [ e[1], e[3], e[4], e[5] ], [ e[1], e[2], e[3], e[4], e[5] ] ][a] || e;
}
function t(a) {
const e = [];
a && (a.saved() || e.push("po-unsaved"), a.fuzzy() ? e.push("po-fuzzy") : a.hasFlag() && e.push("po-flagged"), 
a.valid() || e.push("po-error"), a.translation() || e.push("po-empty"), a.comment() && e.push("po-comment"));
return e.join(" ");
}
function d(a, e, c) {
e = B(a.title(e).parentNode);
let g = e.find("span.lang");
c ? (c = D.require("28").cast(c), g.length || (g = B("<span></span>").prependTo(e)), 
g.attr("lang", c.lang).attr("class", c.getIcon() || "lang region region-" + (c.region || "zz").toLowerCase())) : (g.remove(), 
c = "en");
a.locale(c);
return e;
}
function b(a, e, c) {
e.on("click", function(g) {
const n = a.fire(c, [ g.target ]);
n || g.preventDefault();
return n;
});
}
function k(a, e, c, g) {
let n = a[e];
return c.length ? (n || (n = g.find("div.meta"), n.length || (n = B('<div class="meta"></div>').insertAfter(g.header())), 
b(a, n, "poMeta"), a[e] = n), n.html(c.join("\n")).show(), !0) : n && n.text() ? (n.text("").hide(), 
!0) : !1;
}
function f() {
this.dirty = 0;
}
D.require("3");
const l = D.require("6").html, m = D.require("6").sprintf;
let p, x;
w.extend = function(a) {
return a.prototype = new f();
};
w.localise = function(a) {
x = a;
return w;
};
const u = function() {
const a = G.createElement("p"), e = /(src|href|on[a-z]+)\s*=/gi;
return function(c) {
a.innerHTML = c.replace(e, "data-x-loco-$1=");
const g = a.textContent.trim();
return g ? g.replace("data-x-loco-", "") : c.trim();
};
}(), h = f.prototype = D.require("29").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
h.init = function() {
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
h.t = function() {
return this.$t || x || D.require("1").init();
};
h.localise = function(a) {
a || (a = this.t());
const e = [];
e[0] = a._x("Source text", "Editor") + ":";
e[3] = a._x("%s translation", "Editor") + ":";
e[4] = a._x("Context", "Editor") + ":";
e[5] = a._x("Comments", "Editor") + ":";
e[1] = a._x("Single", "Editor") + ":";
e[2] = a._x("Plural", "Editor") + ":";
e[6] = a._x("Untranslated", "Editor");
e[7] = a._x("Translated", "Editor");
e[8] = a._x("Toggle Fuzzy", "Editor");
e[9] = a._x("Suggest translation", "Editor");
this.labels = e;
this.$t = a;
return this;
};
h.setRootCell = function(a) {
function e(g) {
c.redraw(!0, g);
return !0;
}
const c = D.require("2a").init(a);
B(r).on("resize", e);
this.redraw = e;
B(a).on("wgFocus wgBlur", y);
this.destroy = function() {
c.destroy();
B(r).off("resize", e);
};
this.rootDiv = a;
return c;
};
h.$ = function() {
return B(this.rootDiv);
};
h.setListCell = function(a) {
const e = this;
e.listCell = a;
a.on("wgRowSelect", function(c, g) {
(c = e.po.row(g)) && c !== e.active && e.loadMessage(c);
}).on("wgRowDeselect", function(c, g, n) {
n || e.loadNothing();
});
};
h.setSourceCell = function(a) {
this.sourceCell = a;
};
h.setTargetCell = function(a) {
this.targetCell = a;
};
h.next = function(a, e, c) {
const g = this.listTable, n = this.po;
let v = g.selected(), C = v, A;
for (;null != (v = g.next(a, c, v)); ) {
if (C === v) {
v = null;
break;
}
if (e && (A = n.row(v), A.translated(0))) continue;
break;
}
null != v && g.select(v, !0);
return v;
};
h.select = function(a) {
this.listTable.select(a);
this.focus();
};
h.current = function(a) {
const e = this.active;
if (null == a) return e;
a ? a.is(e) ? (this.reloadMessage(a), this.focus()) : (this.loadMessage(a), a = this.po.indexOf(a), 
-1 !== a && this.select(a)) : this.unloadActive();
return this;
};
h.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
h.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
h.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
h.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
h.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
h.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
h.rebuildSearch = function() {
const a = this.po.rows, e = a.length, c = this.dict;
c.clear();
let g = -1;
for (;++g < e; ) c.add(g, a[g].toText());
};
h.filtered = function() {
return this.lastSearch || "";
};
h.filter = function(a, e) {
const c = this.listTable, g = this.lastFound, n = this.lastSearch || "";
let v, C;
a ? (C = this.dict.find(a), v = C.length, v === g && 0 === a.indexOf(n) ? e = !0 : c.filter(C)) : (v = this.po.length, 
c.unfilter());
this.lastFound = v;
this.lastSearch = a;
e || this.fire("poFilter", [ a, v ]);
return v;
};
h.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
h.unsave = function(a, e) {
let c = !1;
if (a) {
if (c = a.saved(e)) this.dirty++, a.unsave(e), this.fire("poUnsaved", [ a, e ]);
this.reCssRow(a);
}
return c;
};
h.reCssRow = function(a) {
var e = this.po.indexOf(a);
if ((e = this.listTable.tr(e)) && e.length) {
var c = t(a);
a = e[0].className;
c = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + c;
c !== a && B(e).attr("class", c);
}
};
h.save = function(a) {
const e = this.po;
if (this.dirty || a) {
const c = [], g = [], n = this.listTable;
e.each(function(v, C, A) {
C.err && c.push(C);
C.saved() || (C.save(), (C = (v = n.row(A)) && v.page) && C.live ? g[C.i] = C.live : v && B(v.cells()).removeClass("po-unsaved"));
});
g.length && B(g).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = c.length ? c : null;
this.fire("poSave", []);
}
return e;
};
h.fire = function(a, e) {
const c = this.handle;
if (c && c[a] && !1 === c[a].apply(this, e || [])) return !1;
a = B.Event(a);
this.$().trigger(a, e);
return !a.isDefaultPrevented();
};
h.on = function(a, e) {
this.$().on(a, e);
return this;
};
h.getSorter = function() {
return null;
};
h.setLocales = function(a, e) {
const c = this.labels;
a && a !== this.sourceLocale && (this.sourceLocale = a, this.sourceCell && d(this.sourceCell, c[0], a));
e && e !== this.targetLocale && (this.targetLocale = e, a = m(c[3], e.label || "Target"), 
this.targetCell && d(this.targetCell, a, e));
};
h.reload = function() {
const a = this;
var e = a.listCell;
const c = a.po;
var g = c && c.locale() || a.targetLocale, n = c && c.source() || a.sourceLocale;
const v = g && g.isRTL(), C = c && c.length || 0;
if (!c || !c.row) return e && e.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(n, g);
a.lastSearch && (a.lastSearch = "", a.lastFound = C, a.fire("poFilter", [ "", C ]));
n = (g = a.listTable) && g.thead().distribution();
let A = [];
a.listTable = g = e.tabulate({
eachCol: function(z) {
const F = a.getListColumns(), E = a.getListHeadings();
for (const H in F) {
const I = F[H];
z(I, H, E[I]);
}
},
eachRow: function(z) {
c.each(function(F, E) {
a.validate(E) && A.push(E);
z(E.idx, a.getListEntry(E), t(E));
});
},
sort: a.getSorter()
});
e = a.getListColumns();
for (const z in e) g.sortable(e[z]);
n && g.thead().distribute(n);
g.tbody().$(v ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = A.length ? A : null;
return !!C;
};
h.load = function(a, e) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== e ? this.listTable.selectRow(e || 0) : this.active && this.unloadActive());
};
h.pasteMessage = function(a) {
this.validate(a);
if (this.active === a) {
let e = this.sourceCell, c = 0;
e && e.eachTextarea(function(g) {
g.val(a.source(null, c++));
});
(e = this.contextCell) && e.eachTextarea(function(g) {
g.val(a.context());
});
if (e = this.targetCell) c = 0, e.eachTextarea(function(g) {
g.val(a.translation(c++));
});
}
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
h.reloadMessage = function(a) {
const e = this.sourceCell, c = this.targetCell;
this.pasteMessage(a);
e && this.setSrcMeta(a, e) && e.redraw();
if (c) {
var g = c.navigated() || 0;
g = this.setTrgMeta(a, g, c);
!e && this.setSrcMeta(a, c) && (g = !0);
g && (c.redraw(), this.reCssRow(a));
}
return this;
};
h.setStatus = function() {
return null;
};
h.allowRichMeta = function() {
return !1;
};
h.setSrcMeta = function(a, e) {
const c = [];
var g = this.labels, n = a.context();
let v = [], C = a.tags(), A = C && C.length;
n && (v.push("<span>" + l(g[4]) + "</span>"), v.push('<mark class="ctxt">' + l(n) + "</mark>"));
if (A && this.getTag) for (v.push("<span>Tagged:</span>"), g = -1; ++g < A; ) (n = this.getTag(C[g])) && v.push("<mark>" + l(n.mod_name) + "</mark>");
v.length && c.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (n = a.refs()) && (C = n.split(/\s/), A = C.length)) {
for (v = []; 0 <= --A; ) n = C[A], v.push("<code>" + l(n) + "</code>");
c.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(n = a.format()) && "no-" !== n.substring(0, 3) && c.push('<p class="has-icon icon-help">This string is formatted. <a href="#format">See full details</a>.</p>');
(n = a.notes()) && c.push('<p class="has-icon icon-info">' + l(n, this.allowRichMeta()) + "</p>");
return k(this, "$smeta", c, e);
};
h.setTrgMeta = function(a, e, c) {
const g = [], n = (e = a.errors(e)) && e.length, v = this.allowRichMeta();
if (n) for (let C = 0; C < n; C++) g.push('<p class="has-icon icon-warn">' + l(e[C], v) + ".</p>");
a.tcmt && g.push('<p class="has-icon icon-info">' + l(a.tcmt, v) + "</p>");
return k(this, "$tmeta", g, c);
};
h.loadMessage = function(a) {
function e(N) {
if ("=" === N.charAt(0)) {
const K = N.split(" ");
N = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = K.join(" ");
}
return N;
}
function c(N, K) {
const S = ma;
var P = da[0];
N.off();
N.titled() !== P && d(N, P, K || "en");
P = !1;
z.setSrcMeta(a, N) && (P = !0);
if (a.plural()) {
P = -1;
let U = [], V = [];
const Y = N.id + "-";
K = a.sourceForms() || K && K.plurals || q(2);
const ea = K.length;
if (2 !== ea || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < ea; ) U[P] = Y + String(P), 
V[P] = e(K[P].split(" ", 1)[0]) + ":"; else U = [ Y + "-0", Y + "-1" ], V = [ da[1], da[2] ];
N.splity.apply(N, U);
N.each(function(fa, aa) {
fa.header(V[aa]).textarea(a.source(null, aa), S).setStrf(I).setMode(ba).setInvs(E);
});
N.lock();
S && N.each(function(fa, aa) {
g(fa, aa);
});
} else P && N.redraw(), N.textarea(a.source(), S).setStrf(I).setMode(ba).setInvs(E), 
S && g(N, 0);
}
function g(N, K) {
N.on("changing", function(S, P) {
a.source(P, K);
0 === K && z.updateListCell(a, "source");
z.unsave(a, K);
}).on("changed", function() {
0 === K && z.po.reIndex(a);
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function n(N, K, S, P) {
Z && K.eachTextarea(function(V) {
V.ping();
});
K.off("changing").off("changed");
var U = m(da[3], S.label || "Target");
K.titled() !== U && d(K, U, S);
U = !1;
!N && z.setSrcMeta(a, K) && (U = !0);
z.setTrgMeta(a, P, K) && (U = !0);
z.setStatus(a, P);
if (1 !== S.nplurals && a.pluralized()) {
N = function(X) {
X < aa && (Y.push(e(fa[X])), V.push(ea + String(X)));
};
let V = [], Y = [];
const ea = K.id + "-", fa = a.targetForms() || S.plurals || q(S.nplurals), aa = fa.length;
for (a.eachMsg(N); (S = V.length) < aa; ) N(S);
K.splitx.apply(K, V);
K.each(function(X, ca) {
const na = Z && !a.disabled(ca);
X.textarea(a.translation(ca), na).setStrf(I).setMode(ba).setInvs(E);
Z && v(X, ca);
});
K.navigize(Y, P || null).on("wgTabSelect", function(X, ca) {
(X = Z && X.cell.editable()) && X.focus();
z.setTrgMeta(a, ca, K);
z.setStatus(a, ca);
z.fire("poTab", [ ca ]);
});
} else U && K.redraw(), K.textarea(a.translation(), Z && !a.disabled(0)).setStrf(I).setMode(ba).setInvs(E), 
Z && v(K, 0);
}
function v(N, K) {
function S() {
P = null;
z.validate(a);
const V = a.errors(K).join(" ");
U !== V && (U = V, z.setTrgMeta(a, K, N) && N.redraw(), z.reCssRow(a));
}
let P, U = a.errors(K).join(" ");
N.on("changing", function(V, Y, ea) {
P && (clearTimeout(P), P = null);
a.translate(Y, K);
0 === K && z.updateListCell(a, "target");
a.fuzzy(K) && a.saved(K) ? z.fuzzy(!1, a, K) : z.unsave(a, K);
"" === Y ? (z.fire("poEmpty", [ !0, a, K ]), z.setStatus(a, K)) : "" === ea && (z.fire("poEmpty", [ !1, a, K ]), 
z.setStatus(a, K));
P = setTimeout(S, U ? 300 : 1e3);
}).on("changed", function() {
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function C(N) {
N.off();
const K = da[4];
N.titled() !== K && (d(N, K), z.setStatus(null));
N.textarea(a.context(), !0).setMode(ba).setInvs(E);
oa && N.on("changing", function(S, P) {
a.context(P);
z.updateListCell(a, "source");
z.unsave(a, ha);
}).on("changed", function() {
z.po.reIndex(a);
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function A(N) {
const K = da[5];
N.titled() !== K && d(N, K);
N.off().on("changing", function(S, P) {
a.comment(P);
z.fire("poComment", [ a, P ]);
z.unsave(a, ha);
}).textarea(a.comment(), !0);
}
const z = this;
var F = a.isHTML();
const E = z.inv || !1, H = this.fmt || null, I = a.format() || null, O = a.is(z.active), R = z.sourceCell, J = z.targetCell, Q = z.contextCell, W = z.commentCell, Z = z.editable.target, ma = z.editable.source, oa = z.editable.context, pa = z.sourceLocale, ka = z.targetLocale, da = z.labels;
let ha = 0, ba = z.mode, ia = p;
z.html !== F && (z.html = F, "code" !== z.mode && (ba = F ? "html" : "", z.setMode(ba)));
z.active = a;
R && c(R, pa);
Q && C(Q);
J && ka && (ha = J.navigated() || 0, n(R, J, ka, ha));
W && A(W);
ia && (ia.exists() || (ia = ia.parent()), (F = ia.editable()) && F.focus());
H !== I && (this.fmt = I);
O || z.fire("poSelected", [ a, ha ]);
};
h.unloadActive = function() {
function a(c) {
c && c.text("").hide();
}
function e(c) {
c && c.off().clear();
}
a(this.$smeta);
a(this.$tmeta);
e(this.sourceCell);
e(this.contextCell);
e(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
h.loadNothing = function() {
const a = this.t(), e = this.mode || "", c = this.inv || !1, g = this.fmt;
this.unloadActive();
this.setStatus(null);
let n = this.commentCell;
n && n.textarea("", !1);
if (n = this.sourceCell) n.textarea("", !1).setStrf(g).setMode(e).setInvs(c), n.title(a._x("Source text not loaded", "Editor") + ":");
if (n = this.contextCell) n.textarea("", !1).setMode(e).setInvs(c), n.title(a._x("Context not loaded", "Editor") + ":");
if (n = this.targetCell) n.textarea("", !1).setStrf(g).setMode(e).setInvs(c), n.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
h.updateListCell = function(a, e) {
e = this.getListColumns()[e];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(e);
};
h.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? u(a) : a.trim()) || " ";
};
h.fuzzy = function(a, e, c) {
e = e || this.active;
const g = e.fuzzy(c);
!0 !== a || g ? !1 === a && g && this.flag(0, e, c) && this.fire("poFuzzy", [ e, !1, c ]) : this.flag(4, e, c) && this.fire("poFuzzy", [ e, !0, c ]);
return g;
};
h.flag = function(a, e, c) {
if (!e) {
e = this.active;
c = this.getTargetOffset();
if (null == c) return null;
c && e.targetForms() && (c = 0);
}
const g = e.flagged(c);
if (null == a) return g;
if (g === a || a && !e.translated(c) || !this.fire("poFlag", [ a, g, e, c ])) return !1;
e.flag(a, c);
this.fire("poUpdate", [ e ]) && this.unsave(e, c);
this.setStatus(e, c);
return !0;
};
h.add = function(a, e) {
let c, g = this.po.get(a, e);
g ? c = this.po.indexOf(g) : (c = this.po.length, g = this.po.add(a, e), this.load(this.po, -1), 
this.fire("poAdd", [ g ]), this.fire("poUpdate", [ g ]));
this.lastSearch && this.filter("");
this.listTable.select(c);
return g;
};
h.del = function(a) {
if (a = a || this.active) {
var e = this.lastSearch, c = this.po.del(a);
null != c && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (e && this.filter(e), this.active || (c = Math.min(c, this.po.length - 1), 
this.listTable.select(c))));
}
};
h.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
h.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(g) {
g.setMode(a);
});
const e = this.active, c = this.sourceCell;
e && e.refs() && c && this.setSrcMeta(e, c) && c.redraw();
this.fire("poMode", [ a ]);
}
return this;
};
h.getMono = function() {
return "code" === this.mode;
};
h.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(e) {
e.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
h.getInvs = function() {
return this.inv || !1;
};
h.callTextareas = function(a) {
var e = this.targetCell;
e && e.eachTextarea(a);
(e = this.contextCell) && e.eachTextarea(a);
(e = this.sourceCell) && e.eachTextarea(a);
return this;
};
h.focus = function() {
const a = this.getTargetEditable();
a && a.focus();
return this;
};
h.validate = function(a) {
return 0;
};
return w;
}({}, L, M));
D.register("1e", function(w, r, G) {
w.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, q = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(t, d) {
const b = d && d.count || 0;
d = d && d.types || {};
let k = !0, f = 0, l = 0;
for (var m; null != (m = q.exec(t)); ) {
const p = m[2];
if ("%" !== p || "%%" !== m[0]) {
if ("" === p || -1 === "suxXbcdeEfFgGo".indexOf(p)) {
k = !1;
break;
}
null == m[1] ? m = ++l : (m = parseInt(m[1]), f = Math.max(f, m));
null == d[m] && (d[m] = {});
d[m][p] = !0;
}
}
if (k) return {
valid: !0,
count: Math.max(f, l, b),
types: d
};
q.lastIndex = 0;
return {
valid: !1,
count: 0,
types: {}
};
},
sniff: function(t) {
return y.test(t);
}
};
};
return w;
}({}, L, M));
D.register("d", function(w, r, G) {
function y() {
this.init();
}
function q(f) {
f = B('<button type="button" class="button button-small icon icon-' + f + ' hastip"></button>');
D.require("c").init(f);
return f;
}
function t(f) {
return q("cloud").attr("title", f.labels[8] + " (Ctrl-U)").on("click", function(l) {
l.preventDefault();
f.focus().fuzzy(!f.fuzzy());
});
}
function d(f) {
return q("robot").attr("title", f.labels[9] + " (Ctrl-J)").on("click", function(l) {
l.preventDefault();
f.fire("poHint");
});
}
function b(f, l) {
return D.require("6").vsprintf(f, l);
}
w.init = function(f) {
const l = new y();
f = l.setRootCell(f);
var m = f.splity("po-list", "po-edit");
let p = m[0], x = m[1];
m = x.splitx("po-trans", "po-comment");
var u = m[0];
let h = m[1].header("Loading..");
m = u.splity("po-source", "po-target");
u = m[0].header("Loading..");
m = m[1].header("Loading..");
f.distribute([ .34 ]);
x.distribute([ .8 ]);
l.setListCell(p);
l.setSourceCell(u);
l.setTargetCell(m);
l.commentCell = h;
l.editable.source = !1;
return l;
};
r = y.prototype = D.require("1d").extend(y);
r.getListHeadings = function() {
const f = this.t(), l = [ f._x("Source text", "Editor") ];
this.targetLocale && (l[1] = f._x("Translation", "Editor"));
return l;
};
r.getListColumns = function() {
const f = {
source: 0
};
this.targetLocale && (f.target = 1);
return f;
};
r.getListEntry = function(f) {
const l = this.cellText, m = [ function() {
let p, x = l(f.source() || ""), u = f.context();
return u ? (p = G.createElement("p"), p.appendChild(G.createElement("mark")).innerText = u, 
p.appendChild(G.createTextNode(" " + x)), p) : x;
} ];
this.targetLocale && (m[1] = function() {
return l(f.translation() || "");
});
return m;
};
r.stats = function() {
let f = this.po, l = f.length, m = 0, p = 0, x = 0;
f.each(function(u, h) {
h.fuzzy() ? x++ : h.translated() ? m++ : p++;
});
return {
t: l,
p: m.percent(l) + "%",
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
let l = this.$tnav;
if (null == f) l && (l.remove(), this.$tnav = null); else {
l || (this.$tnav = l = B("<nav></nav>").append(t(this)).append(d(this)).appendTo(this.targetCell.header()));
var m = [];
f.translated() ? f.fuzzy() && m.push("po-fuzzy") : m.push("po-empty");
l.attr("class", m.join(" "));
}
};
r.getSorter = function() {
function f(p, x) {
const u = p.weight(), h = x.weight();
return u === h ? l(p, x) : u > h ? -1 : 1;
}
function l(p, x) {
return p.hash().localeCompare(x.hash());
}
const m = this;
return function(p) {
const x = m.po, u = m.locked() ? f : l;
p.sort(function(h, a) {
return u(x.row(h), x.row(a));
});
};
};
r.validate = function(f) {
f.err = null;
if (f.untranslated(0)) return 0;
const l = [];
let m = this.validateMessagePrintf(f, l);
m && (f.err = l);
return m;
};
r.validateMessagePrintf = function(f, l) {
const m = f.format();
if ("no-" === m.substring(0, 3)) return 0;
const p = f.msgid(), x = f.msgidPlural();
null == k && (k = D.require("1e").init());
var u = k;
if (!("" !== m || u.sniff(p) || "" !== x && u.sniff(x))) return 0;
let h = 0, a = u.parse(p);
x && a.valid && (a = u.parse(x, a));
if (!a.valid) return 0;
let e = a.count;
if (0 !== e || "" !== m) {
var c = this;
f.eachMsg(function(g, n) {
l[g] = [];
if ("" !== n) {
n = u.parse(n);
var v = n.count;
g = l[g];
if (n.valid) if (v > e) g.push(b(c.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ e ])), 
h++; else if (v < e && "" === x) g.push(b(c.t()._("Missing placeholders; source text formatting suggests at least %s"), [ e ])), 
h++; else {
v = a.types;
for (const C in n.types) for (const A in n.types[C]) if (null == v[C] || null == v[C][A]) {
g.push(c.t()._("Mismatching placeholder type; check against source text formatting"));
h++;
return;
}
} else g.push(c.t()._("Possible syntax error in string formatting")), h++;
}
});
return h;
}
};
r.handle = {};
let k;
return w;
}({}, L, M));
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
}, t = {
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
function k(l) {
if (l.isDefaultPrevented() || !l.metaKey && !l.ctrlKey) return !0;
const m = l.which;
if (!f[m]) return !0;
const p = t[m];
if (!p || l.altKey || l.shiftKey && !q[m] || !1 === p(l, d)) return !0;
l.stopPropagation();
l.preventDefault();
return !1;
}
const f = {};
B(b || r).on("keydown", k);
return {
add: function(l, m) {
t[y[l]] = m;
return this;
},
enable: function() {
for (const l in arguments) f[y[arguments[l]]] = !0;
return this;
},
disable: function() {
B(b || r).off("keydown", k);
d = b = null;
for (const l in t) f[l] = !1;
}
};
};
return w;
}({}, L, M));
D.register("1f", function(w, r, G) {
function y() {
this.reIndex([]);
}
w.init = function() {
return new y();
};
r = y.prototype;
r.reIndex = function(q) {
const t = {}, d = q.length;
let b = -1;
for (;++b < d; ) t[q[b]] = b;
this.keys = q;
this.length = b;
this.ords = t;
};
r.key = function(q, t) {
if (null == t) return this.keys[q];
const d = this.keys[q], b = this.ords[t];
if (t !== d) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[q] = t;
delete this.ords[d];
this.ords[t] = q;
}
return q;
};
r.indexOf = function(q) {
q = this.ords[q];
return null == q ? -1 : q;
};
r.add = function(q, t) {
let d = this.ords[q];
null == d && (this.keys[this.length] = q, d = this.ords[q] = this.length++);
this[d] = t;
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
r.cut = function(q, t) {
t = t || 1;
const d = [].splice.call(this, q, t);
this.keys.splice(q, t);
this.reIndex(this.keys);
return d;
};
r.each = function(q) {
const t = this.keys, d = this.length;
let b = -1;
for (;++b < d; ) q(t[b], this[b], b);
return this;
};
r.sort = function(q) {
const t = this.length, d = this.keys, b = this.ords, k = [];
let f = -1;
for (;++f < t; ) k[f] = [ this[f], d[f] ];
k.sort(function(m, p) {
return q(m[0], p[0]);
});
for (f = 0; f < t; f++) {
var l = k[f];
this[f] = l[0];
l = l[1];
d[f] = l;
b[l] = f;
}
return this;
};
r.join = function(q) {
return [].join.call(this, q);
};
return w;
}({}, L, M));
D.register("20", function(w, r, G) {
function y(q, t) {
var d = new RegExp("^.{0," + (q - 1) + "}[" + t + "]"), b = new RegExp("^[^" + t + "]+");
return function(k, f) {
for (var l = k.length, m; l > q; ) {
m = d.exec(k) || b.exec(k);
if (null == m) break;
m = m[0];
f.push(m);
m = m.length;
l -= m;
k = k.substring(m);
}
0 !== l && f.push(k);
return f;
};
}
w.create = function(q) {
function t(p) {
return f[p] || "\\" + p;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, f = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == q || isNaN(q = Number(q))) q = 79;
if (0 < q) {
var l = y(q - 3, " ");
var m = y(q - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(p, x) {
if (!x) return p + ' ""';
x = x.replace(k, t);
var u = 0;
x = x.replace(d, function() {
u++;
return "\\n\n";
});
if (!(u || q && q < x.length + p.length + 3)) return p + ' "' + x + '"';
p = [ p + ' "' ];
x = x.split("\n");
if (m) for (var h = -1, a = x.length; ++h < a; ) m(x[h], p); else p = p.concat(x);
return p.join('"\n"') + '"';
},
prefix: function(p, x) {
p = p.split(d);
return x + p.join("\n" + x);
},
refs: function(p) {
p = p.replace(b, " ", p);
l && (p = l(p, []).join("\n#: "));
return "#: " + p;
}
};
};
return w;
}({}, L, M));
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
for (var t = -1, d = this.length; ++t < d; ) q(t, this[t]);
return this;
};
return w;
}({}, L, M));
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
const t = this.rows.cut(q, 1);
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(d, b, k) {
b.idx = k;
}), q;
}
};
r.reIndex = function(q, t) {
const d = q.hash(), b = this.indexOf(q), k = this.rows.indexOf(d);
return k === b ? b : -1 !== k ? (t = (t || 0) + 1, q.source("Error, duplicate " + String(t) + ": " + q.source()), 
this.reIndex(q, t)) : this.rows.key(b, d);
};
r.sort = function(q) {
this.rows.sort(q);
return this;
};
r.export = function() {
const q = this.rows, t = q.length, d = D.require("2b").init();
let b = -1;
for (;++b < t; ) d.push(q[b]);
return d;
};
return w;
}({}, L, M));
D.register("22", function(w, r, G) {
function y(d, b, k) {
if (null == k) return d[b] || "";
d[b] = k || "";
return d;
}
function q() {
this._id = this.id = "";
}
function t(d, b) {
const k = d.length;
let f = -1;
for (;++f < k; ) b(f, d[f]);
}
w.extend = function(d) {
return d.prototype = new q();
};
r = q.prototype;
r.flag = function(d, b) {
const k = this.flg || (this.flg = []);
if (null != b) k[b] = d; else for (b = Math.max(k.length, this.src.length, this.msg.length); 0 !== b--; ) k[b] = d;
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
const d = {}, b = [], k = this.flg || [];
let f = k.length;
for (;0 !== f--; ) {
const l = k[f];
d[l] || (d[l] = !0, b.push(l));
}
return b;
};
r.flaggedAs = function(d, b) {
const k = this.flg || [];
if (null != b) return d === k[b] || 0;
for (b = k.length; 0 !== b--; ) if (k[b] === d) return !0;
return !1;
};
r.fuzzy = function(d, b) {
const k = this.flaggedAs(4, d);
null != b && this.flag(b ? 4 : 0, d);
return k;
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
const b = this.src, k = this.msg, f = Math.max(b.length, k.length);
let l = -1;
for (;++l < f; ) d(l, b[l], k[l]);
return this;
};
r.eachSrc = function(d) {
t(this.src, d);
return this;
};
r.eachMsg = function(d) {
t(this.msg, d);
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
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) b[d] = "";
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
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) if (!b[d]) return !1;
return !0;
};
r.untranslated = function(d) {
if (null != d) return !this.msg[d];
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) if (b[d]) return !1;
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
}({}, L, M));
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
function q(f, l) {
f = f || "";
l && (f += "\0" + l);
return f;
}
function t(f) {
const l = r.console;
l && l.error && l.error(f.message || String(f));
}
function d(f) {
return D.require("20").create(f);
}
function b(f) {
this.locale(f);
this.clear();
this.head = y(this.now());
}
function k(f, l) {
this.src = [ f || "" ];
this.msg = [ l || "" ];
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
function f(h, a) {
for (h = String(h); h.length < a; ) h = "0" + h;
return h;
}
var l = new Date();
const m = l.getUTCFullYear(), p = l.getUTCMonth() + 1, x = l.getUTCDate(), u = l.getUTCHours();
l = l.getUTCMinutes();
return f(m, 4) + "-" + f(p, 2) + "-" + f(x, 2) + " " + f(u, 2) + ":" + f(l, 2) + "+0000";
};
G.header = function(f, l) {
const m = this.head || (this.head = {});
if (null == l) return this.headers()[f] || "";
m[f] = l || "";
return this;
};
G.headers = function(f) {
const l = this.now(), m = this.head || (this.head = y(l));
if (null != f) {
for (x in f) m[x] = f[x];
return this;
}
const p = this.locale();
f = {};
for (x in m) f[x] = String(m[x]);
if (p) {
f.Language = String(p) || "zxx";
f["Language-Team"] = p.label || f.Language;
f["Plural-Forms"] = "nplurals=" + (p.nplurals || "2") + "; plural=" + (p.pluraleq || "n!=1") + ";";
var x = "PO-Revision-Date";
} else f.Language = "", f["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
f["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", x = "POT-Creation-Date";
f[x] || (f[x] = l);
f["X-Generator"] = "Loco https://localise.biz/";
return f;
};
G.get = function(f, l) {
f = q(f, l);
return this.rows.get(f);
};
G.add = function(f, l) {
f instanceof k || (f = new k(f));
l && f.context(l);
l = f.hash();
this.rows.get(l) ? t("Duplicate message at index " + this.indexOf(f)) : (f.idx = this.rows.add(l, f), 
this.length = this.rows.length);
return f;
};
G.load = function(f) {
let l = -1, m, p;
var x;
let u, h, a, e = (x = this.locale()) && x.nplurals || 2, c = [];
for (;++l < f.length; ) m = f[l], null == m.parent ? (p = m.source || m.id, x = m.target || "", 
u = m.context, p || u ? (h = new k(p, x), h._id = m._id, u && h.context(u), m.flag && h.flag(m.flag, 0), 
m.comment && h.comment(m.comment), m.notes && h.notes(m.notes), m.refs && h.refs(m.refs), 
h.format(m.format), m.message = h, this.add(h), m.prev && m.prev[0] && (h.prev(m.prev[0].source, m.prev[0].context), 
m.prev[1] && h._src.push(m.prev[1].source || ""))) : 0 === l && "object" === typeof x && (this.head = x, 
this.headcmt = m.comment)) : c.push(m);
for (l = -1; ++l < c.length; ) try {
m = c[l];
p = m.source || m.id;
h = f[m.parent] && f[m.parent].message;
if (!h) throw Error("parent missing for plural " + p);
a = m.plural;
1 === a && h.plural(p);
a >= e || (m.flag && h.flag(m.flag, a), h.translate(m.target || "", a), m.format && !h.format() && h.format(m.format));
} catch (g) {
t(g);
}
return this;
};
G.wrap = function(f) {
this.fmtr = d(f);
return this;
};
G.toString = function() {
var f, l = this.locale(), m = [], p = [], x = this.headers(), u = !l, h = l && l.nplurals || 2, a = this.fmtr || d();
x[l ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (f in x) p.push(f + ": " + x[f]);
p = new k("", p.join("\n"));
p.comment(this.headcmt || "");
u && p.fuzzy(0, !0);
m.push(p.toString());
m.push("");
this.rows.each(function(e, c) {
e && (m.push(c.cat(a, u, h)), m.push(""));
});
return m.join("\n");
};
G = D.require("22").extend(k);
G.msgid = function() {
return this.src[0];
};
G.msgidPlural = function() {
return this.src[1] || "";
};
G.prev = function(f, l) {
this._src = [ f || "" ];
this._ctx = l;
};
G.hash = function() {
return q(this.source(), this.context());
};
G.toString = function() {
return this.cat(d());
};
G.cat = function(f, l, m) {
var p = [], x;
(x = this.cmt) && p.push(f.prefix(x, "# "));
(x = this.xcmt) && p.push(f.prefix(x, "#. "));
var u = this.rf;
if (x = this._id) u += (u ? " " : "") + "loco:" + x;
u && /\S/.test(u) && p.push(f.refs(u));
!l && this.fuzzy() && p.push("#, fuzzy");
(x = this.fmt) && p.push("#, " + x + "-format");
(x = this._ctx) && p.push(f.prefix(f.pair("msgctxt", x), "#| "));
if (x = this._src) x[0] && p.push(f.prefix(f.pair("msgid", x[0]), "#| ")), x[1] && p.push(f.prefix(f.pair("msgid_plural", x[1]), "#| "));
(x = this.ctx) && p.push(f.pair("msgctxt", x));
p.push(f.pair("msgid", this.src[0]));
if (null == this.src[1]) p.push(f.pair("msgstr", l ? "" : this.msg[0])); else for (u = -1, 
p.push(f.pair("msgid_plural", this.src[1])), x = this.msg || [ "", "" ], m = m || x.length; ++u < m; ) p.push(f.pair("msgstr[" + u + "]", l ? "" : x[u] || ""));
return p.join("\n");
};
G.compare = function(f, l) {
let m = this.weight(), p = f.weight();
if (m > p) return 1;
if (m < p) return -1;
if (l) {
m = this.hash().toLowerCase();
p = f.hash().toLowerCase();
if (m < p) return 1;
if (m > p) return -1;
}
return 0;
};
G.copy = function() {
let f = new k(), l, m;
for (l in this) this.hasOwnProperty(l) && ((m = this[l]) && m.concat && (m = m.concat()), 
f[l] = m);
return f;
};
return w;
}({}, L, M));
D.register("11", function(w, r, G) {
w.init = function(y, q) {
function t() {
return f || (f = B('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function d(l, m, p) {
l = B("<p></p>").text(p);
t().dialog("close").html("").dialog("option", "title", "Error").append(l).dialog("open");
}
function b(l) {
const m = l && l.code;
if (m) {
for (var p = m.length, x = B("<ol></ol>").attr("class", l.type), u = -1; ++u < p; ) B("<li></li>").html(m[u]).appendTo(x);
0 !== l.line && x.find("li").eq(l.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", l.path + ":" + l.line).append(x).dialog("open");
}
}
function k(l) {
l = l.target;
const m = B(l).find("li.highlighted")[0];
l.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(l.clientHeight / 2));
}
let f;
return {
load: function(l) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", k);
l = B.extend({
ref: l,
path: q.popath
}, q.project || {});
y.ajax.post("fsReference", l, b, d);
}
};
};
return w;
}({}, L, M));
D.register("12", function(w, r, G) {
function y() {
this.inf = {};
}
function q() {
const b = G.createElement("p"), k = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, f = /<[a-z]+\s/i;
let l, m;
return {
sniff: function(p) {
if (p === l) return m;
l = p;
if (k.test(p) || f.test(p)) if (b.innerHTML = p, b.textContent !== p) return m = !0;
return m = !1;
}
};
}
w.create = function(b, k) {
k && "function" === typeof k.create || console.error("module.create is not callable");
k = k.create(y);
k.init(b);
return k;
};
const t = y.prototype;
t.init = function(b) {
this.inf = b || {};
return this;
};
t.param = function(b) {
return this.inf[b] || "";
};
t.key = function() {
return this.param("key") || "";
};
t.getId = function() {
return this.param("id") || "none";
};
t.getUrl = function() {
return this.param("url") || "";
};
t.toString = function() {
return this.param("name") || this.getId();
};
t.getSrc = function() {
return this.param("src") || "en";
};
t.setSrc = function(b) {
this.inf.src = this.mapLang(b, this.getLangMap());
};
t.stderr = function(b) {
const k = (r.loco || {}).notices;
k && k.error && k.error(String(this) + ": " + String(b));
};
t.xhrError = function(b, k, f) {
try {
const l = b.responseText, m = l && r.JSON.parse(l);
f = m && this.parseError(m) || f;
} catch (l) {}
return f || this.httpError(b);
};
t.httpError = function(b) {
return (b = b && b.status) && 200 !== b ? "Responded status " + b : "Unknown error";
};
t.parseError = function(b) {
return b && b.error || "";
};
t.mapLang = function(b, k) {
const f = String(b).replace("_", "-").toLowerCase();
var l = b.lang;
k = k[f] || k[l] || [];
b = k.length;
if (0 === b) return l;
if (1 < b) for (l = -1; ++l < b; ) {
const m = k[l];
if (m === f) return m;
}
return k[0];
};
t.getLangMap = function() {
return {};
};
t.maxChr = function() {
return 0;
};
t.fixURL = function(b) {
b = b.split("://", 2);
1 === b.length && b.unshift("https");
return b[0] + "://" + b[1].replace(/\/{2,}/g, "/");
};
t.translate = function(b, k, f) {
return this.batch([ b ], k, this.isHtml(b.source), f);
};
t.unwind = function(b, k) {
const f = [], l = b.length;
for (let m = 0; m < l; m++) f.push(b[m][k]);
return f;
};
t.contextualize = function(b) {
return [ b.context || "", b.notes || "" ].join("\n").trim();
};
t.verify = function(b) {
return this.translate({
source: "OK",
context: "",
notes: ""
}, {
lang: "fr",
toString: function() {
return "fr";
}
}, function(k, f) {
b(!!f);
});
};
t.hash = function() {
return this.key();
};
t._call = function(b) {
const k = this;
k.state = null;
b.cache = !0;
b.dataType = "json";
b.error = function(f, l, m) {
k.stderr(k.xhrError(f, l, m));
};
return k.abortable(B.ajax(b));
};
t.abortable = function(b) {
const k = this;
b.always(function() {
k.$r === b && (k.$r = null);
});
return k.$r = b;
};
t.abort = function() {
const b = this.$r;
b && b.abort();
};
t.isHtml = function(b) {
return (d || (d = q())).sniff(b);
};
let d;
return w;
}({}, L, M));
D.register("13", function(w, r, G) {
function y(q) {
this.api = q;
this.chars = 0;
}
w.create = function(q) {
return new y(q);
};
r = y.prototype;
r.init = function(q, t) {
function d(e) {
let c = {
id: k.length,
length: 0,
html: e.html,
items: []
};
k.push(c);
return l[e.html ? 1 : 0] = c;
}
function b(e, c, g) {
var n = e.source(null, g);
if (n && (e.untranslated(g) || t)) {
{
g = e.notes();
const C = e.context();
e = n.length;
var v = f.isHtml(n);
n = {
source: n,
context: C,
notes: g
};
g = l[v ? 1 : 0];
v = g.items;
if (h && e > h) x++, e = void 0; else {
if (g.length + e > u || 50 === v.length) g = d(g), v = g.items;
v.push(n);
g.length += e;
m += e;
p += 1;
e = n;
}
}
e && (e.id = c);
}
}
const k = [], f = this.api;
let l = [], m = 0, p = 0, x = 0, u = 1e4, h = f.maxChr();
h && (u = Math.min(u, h));
d({
html: !1
});
d({
html: !0
});
const a = q.locale();
q.each(1 < a.nplurals ? function(e, c, g) {
b(c, g, 0);
b(c, g, 1);
} : function(e, c, g) {
b(c, g, 0);
});
l = [];
this.chars = m;
this.length = p;
this.batches = k;
this.locale = a;
x && f.stderr("Strings over " + u + " characters long will be skipped");
};
r.abort = function() {
this.state = "abort";
return this;
};
r.dispatch = function(q) {
function t(A, z) {
if (!b()) return !1;
if (!z) return !0;
e++;
const F = q.row(A.id), E = A.source;
let H = 0;
F.each(function(I, O, R) {
z !== R && (E === O || 1 < I && F.source(null, 1) === E) && (F.translate(z, I), 
H++, g++);
});
H && p("each", [ F ]);
}
function d(A) {
return function(z, F) {
t(A[z], F);
return !0;
};
}
function b() {
return "abort" === x.state ? (u && (u.abort(), m()), !1) : !0;
}
function k() {
const A = h.shift();
if (A) {
const z = A.items;
z && z.length ? u.batch(z, a, A.html, d(z)).fail(f).always(l) : l();
} else m();
}
function f() {
x.abort();
m();
}
function l() {
c++;
p("prog", [ c, v ]);
b() && k();
}
function m() {
u = h = null;
p("done");
}
function p(A, z) {
A = C[A] || [];
let F = A.length;
for (;0 <= --F; ) A[F].apply(null, z);
}
let x = this, u = x.api, h = x.batches || [], a = x.locale, e = 0, c = 0, g = 0, n = x.length, v = h.length, C = {
done: [],
each: [],
prog: []
};
x.state = "";
k();
return {
done: function(A) {
C.done.push(A);
return this;
},
each: function(A) {
C.each.push(A);
return this;
},
prog: function(A) {
C.prog.push(A);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(n - e, 0);
},
did: function() {
return e;
}
};
}
};
};
return w;
}({}, L, M));
D.register("14", function(w, r, G) {
function y() {}
w.create = function(q) {
(y.prototype = new q()).batch = function(t, d, b, k) {
function f(x) {
let u = -1;
for (;++u < m && !1 !== k(u, x[u], d); );
}
const l = r.loco, m = t.length;
t = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(d),
source: this.getSrc(),
sources: t
};
const p = B.Deferred();
this.abortable(l.ajax.post("apis", t, function(x) {
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
}({}, L, M));
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
q.parseError = function(t) {
if (t.error) {
const d = [], b = t.error.errors || [], k = b.length;
let f = -1;
for (;++f < k; ) d.push(b[f].message || "");
return "Error " + t.error.code + ": " + d.join(";");
}
return "";
};
q.getLangMap = function() {
return D.require("24");
};
q.batch = function(t, d, b, k) {
function f(u) {
const h = x.length;
let a = -1;
for (;++a < h && !1 !== k(a, (u[a] || {}).translatedText || "", d); );
}
const l = this, m = l.getSrc();
b = b ? "html" : "text";
const p = l.mapLang(d, l.getLangMap()), x = this.unwind(t, "source");
return l._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + p + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: l.key(),
q: x
}
}).done(function(u, h, a) {
u.data ? f(u.data.translations || []) : (l.stderr(l.parseError(u) || l.httpError(a)), 
f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, M));
D.register("25", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
D.register("16", function(w, r, G) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.parseError = function(t) {
var d = t.details || {};
let b = d.message;
d = d.texts;
return b ? (d && d !== b && (b += "; " + d), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (t.status || "0") + ": " + b) : "";
};
q.maxChr = function() {
return 1e3;
};
q.getLangMap = function() {
return D.require("25");
};
q.batch = function(t, d, b, k) {
function f(u) {
const h = x.length;
let a = -1, e = (u[0] || {
translated: []
}).translated || [];
for (;++a < h && (u = e[a] || "", !1 !== k(a, u, d)); );
}
const l = this;
b = this.getSrc();
const m = l.param("api") || "https://api.lecto.ai", p = l.mapLang(d, l.getLangMap()), x = this.unwind(t, "source");
return l._call({
url: l.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ p ],
from: b,
texts: x
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": l.key(),
Accept: "application/json"
}
}).done(function(u, h, a) {
u ? f(u.translations || []) : (l.stderr(l.parseError(u) || l.httpError(a)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, M));
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
q.parseError = function(t) {
return t && t.error ? t.error.message : "";
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
q.batch = function(t, d, b, k) {
function f(a) {
let e = -1;
for (var c; ++e < x && (c = a[e] || {}, c = c.translations || [], c = c[0] || {}, 
!1 !== k(e, c.text || "", d)); );
}
let l = this, m = [], p = l.getSrc();
t = this.unwind(t, "source");
let x = t.length, u = -1;
b = b ? "html" : "plain";
let h = l.mapLang(d, l.getLangMap());
for (;++u < x; ) m.push({
Text: t[u]
});
return l._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + p + "&to=" + h + "&textType=" + b,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": l.region()
}
}).done(function(a, e, c) {
a && a.length ? f(a) : (l.stderr(l.parseError(a) || l.httpError(c)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, L, M));
D.register("18", function(w, r, G) {
w.init = function(y) {
function q() {
O || (z.on("click", m), O = B('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && B("#ssh-keys").toggleClass("hidden", "ssh" !== B(this).val());
}));
return O;
}
function t() {
E && (d(B(a)), E = !1);
if (g && I) {
var J = I, Q = B(F);
Q.find("span.loco-msg").text(J);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (d(B(F)), H = !1);
}
function d(J) {
J.slideUp(250).fadeOut(250, function() {
B(this).addClass("jshide");
});
}
function b() {
if (g) return O && O.dialog("close"), t(), B(y).find('button[type="submit"]').attr("disabled", !1), 
B(r).triggerHandler("resize"), h && h(!0), !0;
v && O ? (E || (B(a).removeClass("jshide").hide().fadeIn(500), E = !0), H && (d(B(F)), 
H = !1)) : t();
B(y).find('input[type="submit"]').attr("disabled", !0);
h && h(!1);
return !1;
}
function k(J) {
var Q, W = R || {};
for (Q in W) if (W.hasOwnProperty(Q)) {
var Z = W[Q];
J[Q] ? J[Q].value = Z : B('<input type="hidden" />').attr("name", Q).appendTo(J).val(Z);
}
}
function f(J) {
J.preventDefault();
J = B(J.target).serializeArray();
u(J);
c = !0;
return !1;
}
function l(J) {
J.preventDefault();
O.dialog("close");
return !1;
}
function m(J) {
J.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function p(J) {
g = J.authed;
e = J.method;
B(a).find("span.loco-msg").text(J.message || "Something went wrong.");
I = J.warning || "";
J.notice && n.notices.info(J.notice);
if (g) "direct" !== e && (R = J.creds, k(y), c && J.success && n.notices.success(J.success)), 
b(); else if (J.reason) n.notices.info(J.reason); else if (J = J.prompt) {
var Q = q();
Q.html(J).find("form").on("submit", f);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", l);
Q.find('input[type="submit"]').addClass("button-primary");
b();
B(r).triggerHandler("resize");
} else n.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function x() {
b();
}
function u(J) {
c = !1;
n.ajax.setNonce("fsConnect", A).post("fsConnect", J, p, x);
return J;
}
var h, a = y, e = null, c = !1, g = !1, n = r.loco, v = y.path.value, C = y.auth.value, A = y["loco-nonce"].value, z = B(a).find("button.button-primary"), F = G.getElementById(a.id + "-warn"), E = !1, H = !1, I = "", O;
n.notices.convert(F).stick();
if (y.connection_type) {
var R = {};
R.connection_type = y.connection_type.value;
g = !0;
} else v && C && u({
path: v,
auth: C
});
b();
return {
applyCreds: function(J) {
if (J.nodeType) k(J); else {
var Q, W = R || {};
for (Q in W) W.hasOwnProperty(Q) && (J[Q] = W[Q]);
}
return this;
},
setForm: function(J) {
y = J;
b();
k(J);
return this;
},
connect: function() {
v = y.path.value;
C = y.auth.value;
u(B(y).serializeArray());
return this;
},
listen: function(J) {
h = J;
g && J(!0);
return this;
},
authed: function() {
return g;
}
};
};
return w;
}({}, L, M));
D.register("27", function(w, r, G) {
function y(b, k) {
return function(f) {
b.apply(f, k);
return f;
};
}
function q(b) {
return function(k, f) {
k = k && k[b] || 0;
f = f && f[b] || 0;
return k === f ? 0 : k > f ? 1 : -1;
};
}
function t(b) {
return function(k, f) {
return (k && k[b] || "").localeCompare(f && f[b] || "");
};
}
function d(b) {
return function(k, f) {
return -1 * b(k, f);
};
}
w.sort = function(b, k, f, l) {
k = "n" === f ? q(k) : t(k);
l && (k = d(k));
return y([].sort, [ k ])(b);
};
return w;
}({}, L, M));
D.register("19", function(w, r, G) {
w.init = function(y) {
function q(a) {
let e = -1;
const c = a.length;
for (B("tr", p).remove(); ++e < c; ) p.appendChild(a[e].$);
}
function t(a) {
b = a ? u.find(a, l) : l.slice(0);
f && (a = m[f], b = h(b, f, a.type, a.desc));
q(b);
}
let d = 0, b, k, f;
const l = [], m = [], p = y.getElementsByTagName("tbody")[0];
var x = y.getElementsByTagName("thead")[0];
const u = D.require("a").init(), h = D.require("27").sort;
y = B('form.loco-filter input[type="text"]', y.parentNode);
x && B("th", x).each(function(a, e) {
const c = e.getAttribute("data-sort-type");
c && (a = d, B(e).addClass("loco-sort").on("click", function(g) {
g.preventDefault();
{
g = a;
let n = m[g], v = n.type, C = !(n.desc = !n.desc);
b = h(b || l.slice(0), g, v, C);
q(b);
k && k.removeClass("loco-desc loco-asc");
k = B(n.$).addClass(C ? "loco-desc" : "loco-asc").removeClass(C ? "loco-asc" : "loco-desc");
f = g;
}
return !1;
}), m[d] = {
$: e,
type: c
});
e.hasAttribute("colspan") ? d += Number(e.getAttribute("colspan")) : d++;
});
p && B("tr", p).each(function(a, e) {
let c, g = [], n = {
_: a,
$: e
}, v = e.getElementsByTagName("td");
for (c in m) {
const C = v[c];
(e = C.textContent.replace(/(^\s+|\s+$)/g, "")) && g.push(e);
C.hasAttribute("data-sort-value") && (e = C.getAttribute("data-sort-value"));
switch (m[c].type) {
case "n":
e = Number(e);
}
n[c] = e;
}
l[a] = n;
u.index(a, g);
});
y.length && (x = y[0], y = B(x.form), 1 < l.length ? D.require("b").listen(x, t) : y.hide(), 
y.on("submit", function(a) {
a.preventDefault();
return !1;
}));
};
return w;
}({}, L, M));
const T = L.loco || {}, ja = T.conf || {
$v: []
};
L = D.require("1").init();
M = ja.wplang;
T.version = function(w) {
return ja.$v[w || 0] || "0";
};
D.require("2");
D.require("3");
D.require("4");
D.require("5");
T.l10n = L;
L.load(ja.wpl10n);
M && L.pluraleq(M.pluraleq);
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
B("#loco-admin.wrap table.wp-list-table").each(function(w, r) {
D.require("19").init(r);
});
T.validate = function(w) {
w = (w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "")) && w[0];
if ("2.8.10" === w) return !0;
T.notices.warn("admin.js is the wrong version (" + w + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
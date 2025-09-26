"use strict";

(function(K, M, A, la) {
const D = function() {
const w = {};
return {
register: function(t, E) {
w[t] = E;
},
require: function(t) {
var E;
if (!(E = w[t])) throw Error("Bad module [" + t + "]");
return E;
},
include: function(t) {
return w[t];
},
noop: function() {}
};
}();
D.register("1", function(w, t, E) {
function y(p) {
const u = typeof p;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(p)) console.error("Invalid plural: " + p); else return new Function("n", "return " + p);
"function" !== u && (p = function(e) {
return 1 != e;
});
return p;
}
w.init = function(p) {
function u(l, m, r) {
return (l = g[l]) && l[r] ? l[r] : m || "";
}
function e(l) {
return u(l, l, 0);
}
function b(l, m) {
return u(m + "" + l, l, 0);
}
function k(l, m, r) {
r = Number(p(r));
isNaN(r) && (r = 0);
return u(l, r ? m : l, r);
}
p = y(p);
let g = {};
return {
__: e,
_x: b,
_n: k,
_: e,
x: b,
n: k,
load: function(l) {
g = l || {};
return this;
},
pluraleq: function(l) {
p = y(l);
return this;
}
};
};
return w;
}({}, K, M));
D.register("2", function(w, t, E) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, K, M));
D.register("3", function(w, t, E) {
Number.prototype.format = function(y, p, u) {
var e = Math.pow(10, y || 0);
y = [];
e = String(Math.round(e * this) / e);
var b = e.split(".");
e = b[0];
b = b[1];
let k = e.length;
do {
y.unshift(e.substring(k - 3, k));
} while (0 < (k -= 3));
e = y.join(u || ",");
if (b) {
{
u = b;
y = u.length;
let g;
for (;"0" === u.charAt(--y); ) g = y;
g && (u = u.substring(0, g));
b = u;
}
b && (e += (p || ".") + b);
}
return e;
};
Number.prototype.percent = function(y) {
let p = 0, u = this && y ? this / y * 100 : 0;
if (0 === u) return "0";
if (100 === u) return "100";
if (99 < u) u = Math.min(u, 99.9), y = u.format(++p); else if (.5 > u) {
u = Math.max(u, 1e-4);
do {
y = u.format(++p);
} while ("0" === y && 4 > p);
y = y.substring(1);
} else y = u.format(0);
return y;
};
return w;
}({}, K, M));
D.register("4", function(w, t, E) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var p = Object(this), u = p.length >>> 0;
if (0 === u) return -1;
var e = 0;
1 < arguments.length && (e = Number(arguments[1]), e != e ? e = 0 : 0 != e && Infinity != e && -Infinity != e && (e = (0 < e || -1) * Math.floor(Math.abs(e))));
if (e >= u) return -1;
for (e = 0 <= e ? e : Math.max(u - Math.abs(e), 0); e < u; e++) if (e in p && p[e] === y) return e;
return -1;
});
return w;
}({}, K, M));
D.register("5", function(w, t, E) {
E = t.JSON;
E || (E = {
parse: A.parseJSON,
stringify: null
}, t.JSON = E);
w.parse = E.parse;
w.stringify = E.stringify;
return w;
}({}, K, M));
D.register("6", function(w, t, E) {
w.trim = function(y, p) {
for (p || (p = " \n"); y && -1 !== p.indexOf(y.charAt(0)); ) y = y.substring(1);
for (;y && -1 !== p.indexOf(y.slice(-1)); ) y = y.substring(0, y.length - 1);
return y;
};
w.sprintf = function(y) {
return w.vsprintf(y, [].slice.call(arguments, 1));
};
w.vsprintf = function(y, p) {
let u = 0;
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(e, b, k) {
if ("%" === k) return "%";
e = b ? p[Number(b) - 1] : p[u++];
return null != e ? String(e) : "s" === k ? "" : "0";
});
};
return w;
}({}, K, M));
D.register("1a", function(w, t, E) {
function y(p) {
return function(u, e) {
let b = u[p] || 0;
for (;(u = u.offsetParent) && u !== (e || E.body); ) b += u[p] || 0;
return b;
};
}
w.top = y("offsetTop");
w.left = y("offsetLeft");
w.el = function(p, u) {
p = E.createElement(p || "div");
u && (p.className = u);
return p;
};
w.txt = function(p) {
return E.createTextNode(p || "");
};
w.rect = function(p) {
return p.getBoundingClientRect();
};
return w;
}({}, K, M));
D.register("7", function(w, t, E) {
function y(c, d, h) {
function n() {
v();
z = setTimeout(d, h);
}
function v() {
z && clearTimeout(z);
z = 0;
}
let z = 0;
n();
A(c).on("mouseenter", v).on("mouseleave", n);
return {
die: function() {
v();
A(c).off("mouseenter mouseleave");
}
};
}
function p(c, d) {
c.fadeTo(d, 0, function() {
c.slideUp(d, function() {
c.remove();
A(t).triggerHandler("resize");
});
});
return c;
}
function u(c, d) {
function h(G) {
r[C] = null;
p(A(c), 250);
z && z.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function n(G) {
z && z.die();
return z = y(c, h, G);
}
const v = A(c);
let z, C, B, F = v.find("button");
0 === F.length && (v.addClass("is-dismissible"), F = A('<button type="button" class="notice-dismiss"> </a>').appendTo(v));
F.off("click").on("click", h);
A(t).triggerHandler("resize");
m();
C = r.length;
r.push(h);
d && (z = n(d));
return {
link: function(G, H) {
var J = H || G;
H = A(c).find("nav");
G = A("<nav></nav>").append(A("<a></a>").attr("href", G).text(J));
B ? (B.push(G.html()), H.html(B.join("<span> | </span>"))) : (B = [ G.html() ], 
A(c).addClass("has-nav").append(G));
return this;
},
stick: function() {
z && z.die();
z = null;
r[C] = null;
return this;
},
slow: function(G) {
n(G || 1e4);
return this;
}
};
}
function e(c, d, h) {
const n = D.require("1a").el;
c = A('<div class="notice notice-' + c + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const v = A(n("p"));
h = A(n("span")).text(h);
d = A(n("strong", "has-icon")).text(d + ": ");
v.append(d).append(h).appendTo(c);
return c;
}
function b(c, d, h, n) {
c = e(h, d, c).css("opacity", "0").fadeTo(500, 1);
A(t).triggerHandler("resize");
return u(c, n);
}
function k(c) {
return b(c, q, "warning");
}
function g() {
A("#loco-notices").find("div.notice").each(function(c, d) {
-1 === d.className.indexOf("jshide") && (c = -1 === d.className.indexOf("notice-success") ? null : 5e3, 
u(d, c));
});
}
const l = t.console || {
log: function() {}
}, m = Date.now || function() {
return new Date().getTime();
};
let r = [], x, q, f, a;
w.error = function(c) {
return b(c, x, "error");
};
w.warn = k;
w.info = function(c) {
return b(c, f, "info");
};
w.success = function(c) {
return b(c, a, "success", 5e3);
};
w.warning = k;
w.log = function() {
l.log.apply(l, arguments);
};
w.debug = function() {
(l.debug || l.log).apply(l, arguments);
};
w.clear = function() {
let c = -1;
const d = r, h = d.length;
for (;++c < h; ) {
const n = d[c];
n && n.call && n();
}
r = [];
return w;
};
w.create = e;
w.raise = function(c) {
(w[c.type] || w.error).call(w, c.message);
};
w.convert = u;
w.init = function(c) {
x = c._("Error");
q = c._("Warning");
f = c._("Notice");
a = c._("OK");
setTimeout(g, 1e3);
return w;
};
return w;
}({}, K, M));
D.register("8", function(w, t, E) {
function y(q) {
let f = A("<pre>" + q + "</pre>").text();
f && (f = f.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
f || (f = q) || (f = "Blank response from server");
return f;
}
function p(q) {
return (q = q.split(/[\r\n]/)[0]) ? (q = q.replace(/ +in +\S+ on line \d+/, ""), 
q = q.replace(/^[()! ]+Fatal error:\s*/, "")) : r._("Server returned invalid data");
}
function u(q) {
t.console && console.error && console.error('No nonce for "' + q + '"');
return "";
}
function e(q, f, a) {
q[f] = a;
}
function b(q, f, a) {
q.push({
name: f,
value: a
});
}
function k(q, f, a) {
q.append(f, a);
}
function g(q, f, a, c) {
function d(n, v, z) {
if ("abort" !== v) {
var C = r || {
_: function(O) {
return O;
}
}, B = n.status || 0, F = n.responseText || "", G = y(F), H = n.getResponseHeader("Content-Type") || "Unknown type", J = n.getResponseHeader("Content-Length") || F.length;
"success" === v && z ? h.error(z) : (h.error(p(G) + ".\n" + C._("Check console output for debugging information")), 
h.log("Ajax failure for " + q, {
status: B,
error: v,
message: z,
output: F
}), "parsererror" === v && (z = "Response not JSON"), h.log([ C._("Provide the following text when reporting a problem") + ":", "----", "Status " + B + ' "' + (z || C._("Unknown error")) + '" (' + H + " " + J + " bytes)", G, "====" ].join("\n")));
a && a.call && a(n, v, z);
x = n;
}
}
c.url = l;
c.dataType = "json";
const h = D.require("7").clear();
x = null;
return A.ajax(c).fail(d).done(function(n, v, z) {
const C = n && n.data, B = n && n.notices, F = B && B.length;
!C || n.error ? d(z, v, n && n.error && n.error.message) : f && f(C, v, z);
for (n = -1; ++n < F; ) h.raise(B[n]);
});
}
const l = t.ajaxurl || "/wp-admin/admin-ajax.php";
let m = {}, r, x;
w.init = function(q) {
m = q.nonces || m;
return w;
};
w.localise = function(q) {
r = q;
return w;
};
w.xhr = function() {
return x;
};
w.strip = y;
w.parse = p;
w.submit = function(q, f, a) {
function c(z, C) {
C.disabled ? C.setAttribute("data-was-disabled", "true") : C.disabled = !0;
}
function d(z, C) {
C.getAttribute("data-was-disabled") || (C.disabled = !1);
}
function h(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(d);
z.find("input").each(d);
z.find("select").each(d);
z.find("textarea").each(d);
z.removeClass("disabled loading");
}
const n = A(q), v = n.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(c);
z.find("input").each(c);
z.find("select").each(c);
z.find("textarea").each(c);
z.addClass("disabled loading");
})(n);
return g(q.route.value, function(z, C, B) {
h(n);
f && f(z, C, B);
}, function(z, C, B) {
h(n);
a && a(z, C, B);
}, {
type: q.method,
data: v
});
};
w.post = function(q, f, a, c) {
let d = !0, h = f || {}, n = m[q] || u(q);
t.FormData && h instanceof FormData ? (d = !1, f = k) : f = Array.isArray(h) ? b : e;
f(h, "action", "loco_json");
f(h, "route", q);
f(h, "loco-nonce", n);
return g(q, a, c, {
type: "post",
data: h,
processData: d,
contentType: d ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(q, f, a, c) {
f = f || {};
const d = m[q] || u(q);
f.action = "loco_json";
f.route = q;
f["loco-nonce"] = d;
return g(q, a, c, {
type: "get",
data: f
});
};
w.setNonce = function(q, f) {
m[q] = f;
return w;
};
return w;
}({}, K, M));
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
D.register("9", function(w, t, E) {
function y() {}
const p = D.require("1b");
let u;
w.init = function() {
return new y();
};
w.cast = function(e) {
return e instanceof y ? e : "string" === typeof e ? w.parse(e) : w.clone(e);
};
w.clone = function(e) {
const b = new y();
for (const k in e) b[k] = e[k];
return b;
};
w.parse = function(e) {
e = (u || (u = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(e);
if (!e) return null;
const b = new y();
b.lang = e[1].toLowerCase();
b.region = (e[2] || "").toUpperCase();
b.variant = (e[3] || "").toLowerCase();
return b;
};
t = y.prototype;
t.isValid = function() {
return !!this.lang;
};
t.isKnown = function() {
const e = this.lang;
return e && "zxx" !== e;
};
t.toString = function(e) {
e = e || "_";
let b = this.lang || "zxx";
this.region && (b += e + this.region);
this.variant && (b += e + this.variant);
return b;
};
t.getIcon = function() {
let e = 3, b = [];
const k = [ "variant", "region", "lang" ];
for (;0 !== e--; ) {
const g = k[e], l = this[g];
l && (b.push(g), b.push(g + "-" + l.toLowerCase()));
}
return b.join(" ");
};
t.isRTL = function() {
return !!p[String(this.lang).toLowerCase()];
};
t = null;
return w;
}({}, K, M));
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
D.register("a", function(w, t, E) {
w.init = function() {
function y(a) {
return r[a] || a;
}
function p(a, c, d) {
a = String(a || "").toLowerCase().replace(m, y).split(x);
const h = a.length;
let n = -1;
a: for (;++n < h; ) {
var v = a[n];
if (v && null == d[v]) {
const F = [];
var z = v.length;
let G = 0;
do {
var C = q.exec(v);
if (C) {
C = C[0];
var B = C.length;
if (G) for (let H = 0; H < G; H++) F[H] += C; else if (B === z) {
null == d[C] && (c.push(C), d[C] = !0);
continue a;
}
F.push(C);
G++;
v = v.substring(B);
if ("" === v) break;
}
if (C = f.exec(v)) {
C = C[0];
if (G) for (B = 0; B < G; B++) F[B] += C; else F.push(C), G++;
v = v.substring(C.length);
}
} while ("" !== v);
for (v = 0; v < F.length; v++) z = F[v], null == d[z] && (c.push(z), d[z] = !0);
}
}
return c;
}
function u(a) {
return p(a, [], {});
}
function e(a) {
let c = [], d = {}, h = a.length;
for (;0 !== h--; ) p(a[h], c, d);
return c;
}
function b() {
l = "";
g = [];
}
let k = [], g = [], l = "";
const m = /[^a-z0-9]/g, r = D.require("1c"), x = /\s+/, q = /^[\d\p{L}]+/u, f = /^[^\d\p{L}]+/u;
return {
split: u,
find: function(a, c) {
const d = [], h = [], n = String(a || "").toLowerCase().replace(m, y).split(" "), v = n.length, z = l && a.substring(0, l.length) === l ? g : k, C = z.length, B = !!c;
let F = -1, G = 0;
a: for (;++F < C; ) {
const H = z[F], J = H && H.length;
if (J) {
b: for (let O = 0; O < v; O++) {
const R = n[O];
for (let I = 0; I < J; I++) if (0 === H[I].indexOf(R)) continue b;
continue a;
}
h[F] = H;
d.push(B ? c[F] : F);
} else G++;
}
l = a;
g = h;
return d;
},
add: function(a, c) {
k[a] = u(c);
l && b();
},
push: function(a) {
k[k.length] = e(a);
l && b();
},
index: function(a, c) {
k[a] = e(c);
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
}({}, K, M));
D.register("b", function(w, t, E) {
w.listen = function(y, p) {
function u() {
q[g ? "show" : "hide"]();
}
function e(f) {
x && r.setAttribute("size", 2 + f.length);
g = f;
u();
return f;
}
function b() {
l = null;
p(g);
}
function k(f) {
let a = r.value;
a !== g ? (l && clearTimeout(l), e(a), f ? l = setTimeout(b, f) : b()) : l && null == f && (clearTimeout(l), 
b());
}
let g, l, m = 150;
const r = y instanceof jQuery ? y[0] : y, x = 1 === Number(r.size), q = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(f) {
f.preventDefault();
r.value = "";
k();
A(r).triggerHandler("blur");
return !1;
});
e(r.value);
A(r).on("input", function() {
k(m);
return !0;
}).on("blur focus change", function() {
k(null);
return !0;
}).after(q);
u();
return {
delay: function(f) {
m = f;
return this;
},
ping: function(f) {
f ? (l && clearTimeout(l), e(r.value), b(), f = void 0) : f = k();
return f;
},
val: function(f) {
if (null == f) return g;
l && clearTimeout(l);
r.value = e(f);
u();
},
el: function() {
return r;
},
blur: function(f) {
return A(r).on("blur", f);
},
destroy: function() {
l && clearTimeout(l);
}
};
};
return w;
}({}, K, M));
D.register("c", function(w, t, E) {
function y(b, k) {
return "function" == typeof b ? b.call(k) : b;
}
function p(b, k) {
this.$element = A(b);
this.options = k;
this.enabled = !0;
this.fixTitle();
}
w.init = function(b, k) {
let g = {
fade: !0,
offset: 5,
delayIn: u,
delayOut: e,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
k && (g = A.extend({}, g, k));
b.tipsy(g);
};
w.delays = function(b, k) {
u = b || 150;
e = k || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(b, k) {
k.data("tipsy").setTitle(b);
};
let u, e;
w.delays();
A(E.body).on("overlayOpened overlayClosing", function(b) {
w.kill();
return !0;
});
p.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
const g = this.tip();
g.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
g[0].className = "tipsy";
g.remove().css({
top: 0,
left: 0
}).prependTo(E.body);
b = g[0].offsetWidth;
const l = g[0].offsetHeight, m = y(this.options.gravity, this.$element[0]);
var k = this.options.anchor;
k = k ? this.$element.find(k) : this.$element;
k = A.extend({}, k.offset(), {
width: k[0].offsetWidth,
height: k[0].offsetHeight
});
let r;
switch (m.charAt(0)) {
case "n":
r = {
top: k.top + k.height + this.options.offset,
left: k.left + k.width / 2 - b / 2
};
break;

case "s":
r = {
top: k.top - l - this.options.offset,
left: k.left + k.width / 2 - b / 2
};
break;

case "e":
r = {
top: k.top + k.height / 2 - l / 2,
left: k.left - b - this.options.offset
};
break;

case "w":
r = {
top: k.top + k.height / 2 - l / 2,
left: k.left + k.width + this.options.offset
};
}
2 === m.length && ("w" === m.charAt(1) ? r.left = k.left + k.width / 2 - 15 : r.left = k.left + k.width / 2 - b + 15);
g.css(r).addClass("tipsy-" + m);
g.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + m.charAt(0);
this.options.className && g.addClass(y(this.options.className, this.$element[0]));
g.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var b = this.$element, k = b.attr("title") || "";
(k || "string" !== typeof b.attr("original-title")) && b.attr("original-title", k).removeAttr("title");
},
getTitle: function() {
var b, k = this.$element, g = this.options;
this.fixTitle();
"string" == typeof g.title ? b = k.attr("title" == g.title ? "original-title" : g.title) : "function" == typeof g.title && (b = g.title.call(k[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || g.fallback;
},
setTitle: function(b) {
var k = this.$element;
k.attr("default-title") || k.attr("default-title", this.getTitle());
null == b && (b = k.attr("default-title") || this.getTitle());
k.attr("original-title", b);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
},
tip: function() {
this.$tip || (this.$tip = A('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
A.fn.tipsy = function(b) {
function k(x) {
var q = A.data(x, "tipsy");
q || (q = new p(x, A.fn.tipsy.elementOptions(x, b)), A.data(x, "tipsy", q));
return q;
}
function g() {
var x = k(this), q = b.delayIn;
x.hoverState = "in";
0 == q ? x.show() : (x.fixTitle(), setTimeout(function() {
"in" == x.hoverState && x.show();
}, q));
}
function l() {
var x = k(this), q = b.delayOut;
x.hoverState = "out";
0 == q ? x.hide() : (x.tip().removeClass("in"), setTimeout(function() {
"out" == x.hoverState && x.hide();
}, q));
}
b = A.extend({}, A.fn.tipsy.defaults, b);
b.live || this.each(function() {
k(this);
});
if ("manual" != b.trigger) {
var m = b.live ? "live" : "bind", r = "hover" == b.trigger ? "mouseleave" : "blur";
this[m]("hover" == b.trigger ? "mouseenter" : "focus", g)[m](r, l);
}
return this;
};
A.fn.tipsy.defaults = {
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
A.fn.tipsy.elementOptions = function(b, k) {
return A.metadata ? A.extend({}, k, A(b).metadata()) : k;
};
A.fn.tipsy.autoNS = function() {
return A(this).offset().top > A(E).scrollTop() + A(t).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(E).scrollLeft() + A(t).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(b, k) {
return function() {
var g = k[0], l = 1 < k.length ? k[1] : !1, m = A(E).scrollTop() + b, r = A(E).scrollLeft() + b, x = A(this);
x.offset().top < m && (g = "n");
x.offset().left < r && (l = "w");
A(t).width() + A(E).scrollLeft() - x.offset().left < b && (l = "e");
A(t).height() + A(E).scrollTop() - x.offset().top < b && (g = "s");
return g + (l ? l : "");
};
};
return w;
}({}, K, M));
D.register("28", function(w, t, E) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return D.require("6").trim(this, " \n\r\t");
});
"".padStart || (String.prototype.padStart = function(y, p) {
let u = this.valueOf();
for (;y > u.length; ) u = p + u;
return u;
});
"".padEnd || (String.prototype.padEnd = function(y, p) {
let u = this.valueOf();
for (;y > u.length; ) u += p;
return u;
});
w.html = function() {
function y(l) {
return "&#" + l.charCodeAt(0) + ";";
}
function p(l, m) {
return '<a href="' + l + '" target="' + (m.indexOf(k) ? "_blank" : "_top") + '">' + m + "</a>";
}
let u, e, b, k, g = function() {
u = /[<>&]/g;
e = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
g = null;
};
return function(l, m) {
g && g();
l = l.replace(u, y);
m && (l = l.replace(b, p).replace(e, "<br />"));
return l;
};
}();
return w;
}({}, K, M));
D.register("29", function(w, t, E) {
function y() {}
let p, u;
const e = D.require("1b");
w.init = function() {
return new y();
};
w.cast = function(b) {
return b instanceof y ? b : "string" === typeof b ? w.parse(b) : w.clone(b);
};
w.clone = function(b) {
const k = new y();
for (const g in b) k[g] = b[g];
return k;
};
w.parse = function(b) {
p || (u = /[-_+]/, p = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
b = String(b).split(u).join("-");
b = p.exec(b);
if (!b) return null;
const k = new y();
k.lang = b[1].toLowerCase();
b[2] && (k.script = b[2].charAt(0).toUpperCase() + b[2].substring(1).toLowerCase());
b[3] && (k.region = b[3].toUpperCase());
b[4] && (k.variant = b[4].toLowerCase());
b[5] && (k.extension = b[5]);
return k;
};
t = y.prototype;
t.isValid = function() {
return !!this.lang;
};
t.toString = function(b) {
b = b || "-";
let k, g = this.lang || "zxx";
if (k = this.script) g += b + k;
if (k = this.region) g += b + k;
if (k = this.variant) g += b + k;
if (k = this.extension) g += b + k;
return g;
};
t.getIcon = function() {
let b = 4, k = [];
const g = [ "variant", "region", "script", "lang" ];
for (;0 !== b--; ) {
const l = g[b];
let m = this[l];
m && (m.join && (m = m.join("-")), 1 === b && 3 === m.length ? k.push("region-m49") : k = k.concat([ l, l + "-" + m.toLowerCase() ]));
}
return k.join(" ");
};
t.isRTL = function() {
return !!e[String(this.script || this.lang).toLowerCase()];
};
t = null;
return w;
}({}, K, M));
D.register("2a", function(w, t, E) {
function y(b) {
t.console && console.error && console.error(b);
}
function p() {
y("Method not implemented");
}
function u() {}
function e(b) {}
u.prototype.toString = function() {
return "[Undefined]";
};
e.prototype._validate = function(b) {
let k, g, l = !0;
for (k in this) g = this[k], g === p ? (y(b + "." + k + "() must be implemented"), 
l = !1) : g instanceof u && (y(b + "." + k + " must be defined"), l = !1);
return l;
};
w.init = function(b, k) {
const g = new e();
if (b) {
let l = b.length;
for (;0 !== l--; ) g[b[l]] = p;
}
if (k) for (b = k.length; 0 !== b--; ) g[k[b]] = new u();
return g;
};
w.validate = function(b) {
const k = /function (\w+)\(/.exec(b.toString());
b.prototype._validate(k && k[1] || "Object");
};
return w;
}({}, K, M));
D.register("31", function(w, t, E) {
let y = 0, p = t.requestAnimationFrame, u = t.cancelAnimationFrame;
if (!p || !u) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (p = t[b + "RequestAnimationFrame"]) if (u = t[b + "CancelAnimationFrame"] || t[b + "CancelRequestAnimationFrame"]) break;
p && u || (p = function(b) {
var k = e();
const g = Math.max(0, 16 - (k - y)), l = k + g;
k = t.setTimeout(function() {
b(l);
}, g);
y = l;
return k;
}, u = function(b) {
clearTimeout(b);
});
const e = Date.now || function() {
return new Date().getTime();
};
w.loop = function(b, k) {
function g() {
m = p(g, k);
b(l++);
}
let l = 0, m;
g();
return {
stop: function() {
m && u(m);
m = null;
}
};
};
return w;
}({}, K, M));
D.register("2e", function(w, t, E) {
function y(r, x, q, f) {
if (e) {
const a = q;
q = function(c) {
if ((c.MSPOINTER_TYPE_TOUCH || "touch") === c.pointerType) return a(c);
};
}
r.addEventListener(x, q, f);
return {
unbind: function() {
r.removeEventListener(x, q, f);
}
};
}
function p(r) {
r.preventDefault();
r.stopPropagation();
return !1;
}
let u;
const e = !!t.navigator.msPointerEnabled, b = e ? "MSPointerDown" : "touchstart", k = e ? "MSPointerMove" : "touchmove", g = e ? "MSPointerUp" : "touchend";
w.ok = function(r) {
null == u && (u = "function" === typeof E.body.addEventListener);
u && r && r(w);
return u;
};
w.ms = function() {
return e;
};
w.dragger = function(r, x) {
function q(d) {
r.addEventListener(d, a[d], !1);
}
function f(d) {
r.removeEventListener(d, a[d], !1);
}
const a = {};
a[b] = function(d) {
l(d, function(h, n) {
n.type = b;
x(d, n, c);
});
q(k);
q(g);
return !0;
};
a[g] = function(d) {
f(k);
f(g);
l(d, function(h, n) {
n.type = g;
x(d, n, c);
});
return !0;
};
a[k] = function(d) {
l(d, function(h, n) {
n.type = k;
x(d, n, c);
});
return p(d);
};
q(b);
let c = {
kill: function() {
f(b);
f(k);
f(g);
r = c = x = null;
}
};
return c;
};
w.swiper = function(r, x, q) {
function f(F) {
r.addEventListener(F, v[F], !1);
}
function a(F) {
r.removeEventListener(F, v[F], !1);
}
function c() {
d && d.stop();
d = null;
}
let d, h, n, v = {}, z = [], C = [], B = [];
v[b] = function(F) {
h = !1;
c();
const G = m();
l(F, function(H, J) {
z[H] = G;
C[H] = J.clientX;
B[H] = J.clientY;
});
n = r.scrollLeft;
return !0;
};
v[g] = function(F) {
l(F, function(G, H) {
const J = m() - z[G];
G = C[G] - H.clientX;
x(Math.abs(G) / J, G ? 0 > G ? -1 : 1 : 0);
});
n = null;
return !0;
};
v[k] = function(F) {
let G, H;
null == n || l(F, function(J, O) {
G = C[J] - O.clientX;
H = B[J] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return h = !0;
G && (h = !0, r.scrollLeft = Math.max(0, n + G));
return p(F);
};
if (!e || q) f(b), f(k), f(g), e && (r.className += " mstouch");
return {
kill: function() {
a(b);
a(k);
a(g);
c();
},
swiped: function() {
return h;
},
ms: function() {
return e;
},
snap: function(F) {
e && !q && (r.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
r.style["-ms-scroll-snap-type"] = "mandatory", r.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, G, H) {
c();
let J = r.scrollLeft;
const O = F > J ? 1 : -1, R = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return d = D.require("31").loop(function(Q) {
Q && (J = Math.max(0, R(F, J + I)), r.scrollLeft = J, F === J && (c(), H && H(J)));
}, r);
}
};
};
w.start = function(r, x) {
return y(r, b, x, !1);
};
w.move = function(r, x) {
return y(r, k, x, !1);
};
w.end = function(r, x) {
return y(r, g, x, !1);
};
const l = w.each = function(r, x) {
if (e) (r.MSPOINTER_TYPE_TOUCH || "touch") === r.pointerType && x(0, r); else {
r = (r.originalEvent || r).changedTouches || [];
for (var q = -1; ++q < r.length; ) x(q, r[q]);
}
}, m = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, K, M));
D.register("32", function(w, t, E) {
w.init = function(y) {
function p() {
k.style.top = String(-y.scrollTop) + "px";
return !0;
}
function u() {
const l = k;
l.textContent = y.value;
const m = l.innerHTML;
"" !== m && (l.innerHTML = m.replace(/[ \t]/g, e).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function e(l) {
return '<span class="x' + l.charCodeAt(0).toString(16) + '">' + l + "</span>";
}
const b = y.parentNode;
let k = b.insertBefore(E.createElement("div"), y);
A(y).on("input", u).on("scroll", p);
A(b).addClass("has-mirror");
k.className = "ta-mirror";
const g = y.offsetWidth - y.clientWidth;
2 < g && (k.style.marginRight = String(g - 2) + "px");
u();
p();
return {
kill: function() {
A(y).off("input", u).off("scroll", p);
b.removeChild(k);
k = null;
A(b).removeClass("has-mirror");
}
};
};
return w;
}({}, K, M));
D.register("23", function(w, t, E) {
function y(e, b) {
e = p[e] || [];
b = b && t[b];
const k = e.length;
let g = -1, l = 0;
for (;++g < k; ) {
const m = e[g];
"function" === typeof m && (m(b), l++);
}
return l;
}
const p = {};
let u = "";
w.load = function(e, b, k) {
function g() {
r && (clearTimeout(r), r = null);
x && (x.onreadystatechange = null, x = x = x.onload = null);
e && (delete p[e], e = null);
}
function l(q, f) {
q = x && x.readyState;
if (f || !q || "loaded" === q || "complete" === q) f || y(e, k), g();
}
function m() {
if (0 === y(e)) throw Error('Failed to load "' + (k || e) + '"');
g();
}
if (k && t[k]) "function" === typeof b && b(t[k]); else if (null != p[e]) p[e].push(b); else {
p[e] = [ b ];
var r = setTimeout(m, 4e3), x = E.createElement("script");
x.setAttribute("src", e);
x.setAttribute("async", "true");
x.onreadystatechange = l;
x.onload = l;
x.onerror = m;
x.onabort = g;
E.getElementsByTagName("head")[0].appendChild(x);
}
};
w.stat = function(e) {
var b;
if (!(b = u)) {
{
b = E.getElementsByTagName("script");
const k = b.length;
let g = -1, l = "";
for (;++g < k; ) {
const m = b[g].getAttribute("src");
if (m) {
const r = m.indexOf("/lib/vendor");
if (-1 !== r) {
l = m.substring(0, r);
break;
}
}
}
b = l || "/static";
}
b = u = b;
}
return b + e;
};
w.css = function(e, b) {
E.getElementById(b) || A("<link />").attr("rel", "stylesheet").attr("href", e).attr("id", b).appendTo(E.head);
};
return w;
}({}, K, M));
D.register("10", function(w, t, E) {
function y(m, r) {
m.setReadOnly(!1);
m.on("change", function(x, q) {
return r.val(q.getValue());
});
m.on("focus", function() {
return r.focus();
});
m.on("blur", function() {
return r.blur();
});
}
function p(m) {
m.off("change");
m.off("focus");
m.off("blur");
}
function u(m) {
p(m);
m.setReadOnly(!0);
m.setHighlightGutterLine(!1);
m.setHighlightActiveLine(!1);
}
function e(m, r) {
function x() {
this.HighlightRules = f;
}
m = m.require;
const q = m("ace/lib/oop"), f = b(r);
q.inherits(f, m("ace/mode/text_highlight_rules").TextHighlightRules);
q.inherits(x, m("ace/mode/text").Mode);
return new x();
}
function b(m) {
return function() {
let r = {
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
"icu" === m ? r = {
start: r.start.concat([ {
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
} : x && r.start.push({
token: "printf",
regex: x
});
this.$rules = r;
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
return /\{\{.+}}/;

case "python":
return /%(?:\([_A-Za-z][_A-Za-z0-9]*\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;

case "javascript":
return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;

case "auto":
return /%(?:\d+\$|\([_A-Za-z][_A-Za-z0-9]*\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;

case l:
return g || /%%/;
}
}
let g, l = "auto";
w.init = function(m, r, x) {
let q, f = !1, a = x || l, c = m.parentNode, d = c.appendChild(E.createElement("div"));
A(c).addClass("has-proxy has-ace");
D.require("23").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(h) {
if (d) {
if (!h) throw Error("Failed to load code editor");
q = h.edit(d);
var n = q.session, v = q.renderer;
q.$blockScrolling = Infinity;
q.setShowInvisibles(f);
q.setWrapBehavioursEnabled(!1);
q.setBehavioursEnabled(!1);
q.setHighlightActiveLine(!1);
n.setUseSoftTabs(!1);
v.setShowGutter(!0);
v.setPadding(10);
v.setScrollMargin(8);
n.setMode(e(h, a));
q.setValue(m.value, -1);
n.setUseWrapMode(!0);
r ? y(q, r) : u(q);
}
}, "ace");
return {
kill: function() {
q && (p(q), q.destroy(), q = null);
d && (c.removeChild(d), A(c).removeClass("has-proxy has-ace"), d = null);
return this;
},
disable: function() {
q && u(q);
r = null;
return this;
},
enable: function(h) {
r = h;
q && y(q, h);
return this;
},
resize: function() {
q && q.resize();
return this;
},
val: function(h) {
q && h !== q.getValue() && q.setValue(h, -1);
return this;
},
invs: function(h) {
h = h || !1;
f !== h && (f = h, q && q.setShowInvisibles(h));
return this;
},
strf: function(h) {
h = h || l;
h !== a && (a = h, q && q.session.setMode(e(t.ace, h)));
return this;
},
focus: function() {
q && q.focus();
return this;
}
};
};
w.strf = function(m, r) {
l = m;
g = r;
return w;
};
return w;
}({}, K, M));
D.register("33", function(w, t, E) {
function y(b, k) {
function g() {
return k.val(b.getContent());
}
b.on("input", g);
b.on("change", g);
b.on("focus", function() {
return k.focus();
});
b.on("blur", function() {
return k.blur();
});
b.setMode("design");
}
function p(b) {
b.off("input");
b.off("change");
b.off("focus");
b.off("blur");
}
function u(b) {
p(b);
b.setMode("readonly");
}
let e = 0;
w.load = function(b) {
const k = D.require("23");
k.css(k.stat("/css/lib/tinymce.css"), "tinymce-css");
k.load(k.stat("/lib/tinymce.min.js"), b, "tinymce");
return w;
};
w.init = function(b, k) {
function g(h) {
x = h;
q = "<p>" === h.substring(0, 3) && "</p>" === h.substring(h.length - 4);
return h.replace(/(<\/?)script/gi, "$1loco:script");
}
function l(h) {
m = h;
h._getContent = h.getContent;
h.getContent = function(n) {
n = this._getContent(n);
n = n.replace(/(<\/?)loco:script/gi, "$1script");
if (!q && "<p>" === n.substring(0, 3) && "</p>" === n.substring(n.length - 4)) {
const v = n.substring(3, n.length - 4);
if (v === x || -1 === v.indexOf("</p>")) n = v;
}
return n;
};
h._setContent = h.setContent;
h.setContent = function(n, v) {
return this._setContent(g(n), v);
};
k ? (y(h, k), k.reset()) : u(h);
A(c).removeClass("loading");
}
let m, r = !1, x = "", q = !1, f = b.parentNode, a = f.parentNode, c = f.appendChild(E.createElement("div")), d = a.insertBefore(E.createElement("nav"), f);
d.id = "_tb" + String(++e);
A(f).addClass("has-proxy has-mce");
A(c).addClass("mce-content-body loading").html(g(b.value));
w.load(function(h) {
if (!h) throw Error("Failed to load HTML editor");
c && h.init({
inline: !0,
target: c,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + d.id,
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
extended_valid_elements: "span,b,i,u,loco:script",
entities: "38,amp,60,lt,62,gt,160,nbsp",
entity_encoding: "named",
keep_styles: !1,
init_instance_callback: l
});
});
return {
val: function(h) {
h = g(h);
null == m ? (b.value = h, A(c).html(h)) : m.getContent() !== h && m.setContent(h);
k && k.val(h);
return this;
},
kill: function() {
m && (k && k.val(m.getContent()), p(m), m.destroy(), m = null);
c && (f.removeChild(c), A(f).removeClass("has-proxy has-mce"), c = null);
d && (a.removeChild(d), d = null);
return this;
},
enable: function(h) {
k = h;
m && y(m, h);
return this;
},
disable: function() {
m && u(m);
k = null;
return this;
},
focus: function() {
m && k && m.focus();
return this;
},
invs: function(h) {
h = h || !1;
r !== h && (r = h, A(f)[h ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, K, M));
D.register("34", function(w, t, E) {
w.init = function(y, p) {
function u(a) {
x !== a && (f.textContent = a.format(0), x = a, a = 0 === a ? "empty" : 0 === p || a < p ? "lt" : p === a ? "eq" : "gt", 
a !== r && (r = a, q.className = "wg-count is-" + a));
}
function e(a) {
m && (q.removeChild(m), m = null);
0 < a && (m = q.appendChild(g.el("span").appendChild(g.txt(" / " + a.format(0)))));
p = a;
}
function b(a, c) {
u(c.length);
}
function k() {
r = "";
x = -1;
u(y.val().length);
}
const g = D.require("1a"), l = A(y.parent()).on("changing", b);
let m, r, x, q = g.el("div"), f = q.appendChild(g.el("span"));
l.append(q);
e(p);
k();
return {
ping: function(a) {
null != a && a !== p && (p = a, e(a));
k();
},
kill: function() {
const a = l && l[0];
a && q && q.parentNode === a && (l.off("changing", b), a.removeChild(q));
}
};
};
return w;
}({}, K, M));
D.register("2f", function(w, t, E) {
function y(e) {
function b() {
f && (r.off("input", k), f = !1);
}
function k() {
const c = e.value;
c !== a && (r.trigger("changing", [ c, a ]), a = c);
}
function g() {
k();
f && q !== a && r.trigger("changed", [ a ]);
}
function l() {
u = e;
q = a;
f || (r.on("input", k), f = !0);
r.trigger("editFocus");
x.addClass("has-focus");
return !0;
}
function m() {
u === e && (u = null);
r.trigger("editBlur");
x.removeClass("has-focus");
f && (g(), b());
return !0;
}
const r = A(e), x = A(e.parentNode);
let q, f = !1, a = e.value;
r.on("blur", m).on("focus", l);
return {
val: function(c) {
a !== c && (e.value = c, r.triggerHandler("input"), a = c);
return !0;
},
kill: function() {
b();
r.off("blur", m).off("focus", l);
},
fire: function() {
a = null;
k();
},
ping: g,
blur: m,
focus: l,
reset: function() {
q = a = e.value;
}
};
}
function p(e) {
this.e = e;
}
let u;
w._new = function(e) {
return new p(e);
};
w.init = function(e) {
const b = new p(e);
e.disabled ? (e.removeAttribute("disabled"), b.disable()) : e.readOnly ? b.disable() : b.enable();
return b;
};
t = p.prototype;
t.destroy = function() {
this.unlisten();
const e = this.p;
e && (e.kill(), this.p = null);
this.nocount();
this.e = null;
};
t.reload = function(e, b) {
let k = this.l;
this.nocount();
k && !b && (this.disable(), k = null);
this.val(e || "");
b && !k && this.enable();
return this;
};
t.val = function(e) {
const b = this.e;
if (null == e) return b.value;
const k = this.l, g = this.p;
g && g.val(e);
k && k.val(e);
k || b.value === e || (b.value = e, A(b).triggerHandler("input"));
return this;
};
t.fire = function() {
this.l && this.l.fire();
return this;
};
t.ping = function() {
this.l && this.l.ping();
return this;
};
t.focus = function() {
const e = this.p;
e ? e.focus() : A(this.e).focus();
};
t.focused = function() {
return u && u === this.el;
};
t.parent = function() {
return this.e.parentNode;
};
t.attr = function(e, b) {
const k = this.e;
if (1 === arguments.length) return k.getAttribute(e);
null == b ? k.removeAttribute(e) : k.setAttribute(e, b);
return this;
};
t.editable = function() {
return !!this.l;
};
t.enable = function() {
const e = this.p;
this.e.removeAttribute("readonly");
this.listen();
e && e.enable && e.enable(this.l);
return this;
};
t.disable = function() {
const e = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
e && e.disable && e.disable();
return this;
};
t.listen = function() {
const e = this.l;
e && e.kill();
this.l = y(this.e);
return this;
};
t.unlisten = function() {
const e = this.l;
e && (e.kill(), this.l = null);
return this;
};
t.setInvs = function(e, b) {
const k = this.i || !1;
if (b || k !== e) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(e) : e && (this._i = D.require("32").init(this.e)), 
this.i = e;
return this;
};
t.getInvs = function() {
return this.i || !1;
};
t.setMode = function(e) {
let b = this.p, k = this.i || !1;
e !== (this.m || "") && (this.m = e, b && b.kill(), this.p = b = "code" === e ? D.require("10").init(this.e, this.l, this["%"]) : "html" === e ? D.require("33").init(this.e, this.l) : null, 
this.setInvs(k, !0), u && this.focus());
return this;
};
t.setStrf = function(e) {
this["%"] = e;
"code" === this.m && this.p.strf(e);
return this;
};
t.name = function(e) {
this.e.setAttribute("name", e);
return this;
};
t.placeholder = function(e) {
this.e.setAttribute("placeholder", e);
return this;
};
t.redraw = function() {
const e = this.p;
e && e.resize && e.resize();
};
t.counter = function(e) {
let b = this.c;
b ? b.ping(e) : this.c = D.require("34").init(this, e);
e = String(e || "0");
"0" === e ? this.e.removeAttribute("maxlength") : e !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", e);
return this;
};
t.nocount = function() {
const e = this.c;
e && (e.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return w;
}({}, K, M));
D.register("30", function(w, t, E) {
function y(f) {
const a = t.console;
a && a.error && a.error(f);
}
function p(f) {
const a = E.createElement("div");
f && a.setAttribute("class", f);
return a;
}
function u(f) {
return function() {
f.resize();
return this;
};
}
function e(f) {
return function(a) {
let c = a.target, d = c.$index;
for (;null == d && "DIV" !== c.nodeName && (c = c.parentElement); ) d = c.$index;
null != d && (a.stopImmediatePropagation(), f.select(d));
return !0;
};
}
function b(f) {
return function() {
f.redrawDirty() && f.redraw();
return !0;
};
}
function k(f) {
return function(a) {
var c = a.keyCode;
if (40 === c) c = 1; else if (38 === c) c = -1; else return !0;
if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return !0;
f.selectNext(c);
a.stopPropagation();
a.preventDefault();
return !1;
};
}
function g(f, a, c) {
function d(h) {
y("row[" + h + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(h) {
const n = a || 0, v = c ? -1 : 1, z = f.rows || [];
h.sort(function(C, B) {
return v * (z[C] || d(C)).cellVal(n).localeCompare((z[B] || d(B)).cellVal(n));
});
};
}
function l(f) {
this.w = f;
}
function m(f) {
this.t = f;
this.length = 0;
}
function r(f, a, c) {
let d = E.createElement("div");
d.className = c || "";
this._ = d;
this.d = a || [];
this.i = f || 0;
this.length = a.length;
}
function x(f) {
this.live = f;
this.rows = [];
}
w.create = function(f) {
return new l(f);
};
var q = l.prototype;
q.init = function(f) {
let a = this.w, c = a.id;
var d = a.splity(c + "-thead", c + "-tbody"), h = d[0];
d = d[1];
let n = [], v = [], z = [], C = [];
if (f) this.ds = f, this.idxs = v, this._idxs = null; else if (!(f = this.ds)) throw Error("No datasource");
h.css.push("wg-thead");
d.css.push("wg-tbody");
f.eachCol(function(O, R, I) {
z[O] = c + "-col-" + R;
C[O] = I || R;
});
var B = p();
let F = -1, G = z.length, H = p("wg-cols"), J = h.splitx.apply(h, z);
for (;++F < G; ) J[F].header(C[F]), H.appendChild(B.cloneNode(!1)).setAttribute("for", z[F]);
f.eachRow(function(O, R, I) {
n[O] = new r(O, R, I);
v[O] = O;
});
this.rows = n;
this.cols = H;
this.ww = null;
this.root = B = d.body;
this.head = h;
h.redraw = u(this);
a.css.push("is-table");
a.restyle();
h = d.fixed = J[0].bodyY() || 25;
a.lock().resize(h, d);
this.sc ? this._re_sort(G) : f.sort && f.sort(v);
this.redrawDirty();
this.render();
A(B).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", e(this)).on("scroll", b(this));
return this;
};
q.clear = function() {
const f = this.pages || [];
let a = f.length;
for (;0 !== a--; ) f[a].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
q.render = function() {
let f, a = [], c = this.rows || [], d = -1, h, n = this.idxs, v = n.length, z = this.idxr = {}, C = this.r, B = this._r, F = this.root, G = this.cols;
for (;++d < v; ) {
if (0 === d % 100) {
var H = G.cloneNode(!0);
f = new x(H);
f.i = a.length;
f.h = 2200;
f.insert(F);
a.push(f);
}
h = n[d];
z[h] = d;
H = c[h];
if (null == H) throw Error("Render error, no data at [" + h + "]");
H.page = f;
f.rows.push(H);
}
f && 100 !== f.size() && f.sleepH(22);
this.pages = a;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == C ? null != B && (H = c[B]) && H.page && (delete this._r, this.select(B, !0)) : (H = c[C]) && H.page ? this.select(C, !0) : (this.deselect(!1), 
this._r = C);
return this;
};
q.resize = function() {
let f = -1, a = this.ww || (this.ww = []);
var c = this.w;
let d = c.cells[0], h = d.body.childNodes, n = h.length, v = this.pages || [], z = v.length;
for (c.redraw.call(d); ++f < n; ) a[f] = h[f].style.width;
if (z) {
c = this.mx;
for (f = this.mn; f <= c; f++) v[f].widths(a);
this.redrawDirty() && this.redraw();
}
};
q.redrawDirty = function() {
let f = !1;
var a = this.root;
const c = a.scrollTop;
a = a.clientHeight;
this.sy !== c && (f = !0, this.sy = c);
this.vh !== a && (f = !0, this.vh = a);
return f;
};
q.redraw = function() {
let f = 0, a = -1, c = null, d = null, h = this.ww;
var n = this.sy;
let v = this.mn, z = this.mx, C = Math.max(0, n - 100);
n = this.vh + n + 100;
let B, F = this.pages || [], G = F.length;
for (;++a < G && !(f > n); ) B = F[a], f += B.height(), f < C || (null === c && (c = a), 
d = a, B.rendered || B.render(h));
if (v !== c) {
if (null !== v && c > v) for (a = v; a < c; a++) {
B = F[a];
if (!B) throw Error("Shit!");
B.rendered && B.sleep();
}
this.mn = c;
}
if (z !== d) {
if (null !== z && d < z) for (a = z; a > d; a--) B = F[a], B.rendered && B.sleep();
this.mx = d;
}
};
q.selected = function() {
return this.r;
};
q.thead = function() {
return this.w.cells[0];
};
q.tbody = function() {
return this.w.cells[1];
};
q.tr = function(f) {
return (f = this.row(f)) ? f.cells() : [];
};
q.row = function(f) {
return this.rows[f];
};
q.td = function(f, a) {
return this.tr(f)[a];
};
q.next = function(f, a, c) {
null == c && (c = this.r || 0);
const d = this.idxs, h = d.length;
let n = c = (this.idxr || {})[c];
for (;c !== (n += f) && !(0 <= n && h > n); ) if (a && h) n = 1 === f ? -1 : h, 
a = !1; else return null;
c = d[n];
return null == c || null == this.rows[c] ? (y("Bad next: [" + n + "] does not map to data row"), 
null) : c;
};
q.selectNext = function(f, a, c) {
f = this.next(f, a, null);
null != f && this.r !== f && this.select(f, c);
return this;
};
q.deselect = function(f) {
const a = this.r;
null != a && (this.r = null, A(this.tr(a)).removeClass("selected"), this.w.fire("wgRowDeselect", [ a, f ]));
return this;
};
q.selectRow = function(f, a) {
return this.select(this.idxs[f], a);
};
q.select = function(f, a) {
const c = this.rows[f];
var d = c && c.page;
if (!d) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let h, n = this.w.cells[1];
d.rendered || (h = d.top(), n.scrollY(h), this.redrawDirty() && this.redraw());
if (!c.rendered) return d.rendered || y("Failed to render page"), y("Row [" + c.i + "] not rendered"), 
this;
d = c.cells();
A(d).addClass("selected");
this.r = f;
a || (h = n.scrollY(), A(this.root).focus(), h !== n.scrollY() && n.scrollY(h));
n.scrollTo(d[0], !0);
this.w.fire("wgRowSelect", [ f, c.data() ]);
return this;
};
q.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
q.filter = function(f) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(f);
return this.clear().render();
};
q.each = function(f) {
let a, c = -1;
const d = this.rows || [], h = this.idxs || [], n = h.length;
for (;++c < n; ) a = h[c], f(d[a], c, a);
return this;
};
q.sortable = function(f) {
const a = this.sc || (this.sc = new m(this));
a.has(f) || a.add(f);
return this;
};
q._re_sort = function(f) {
let a = -1, c = this.sc, d = c.active;
for (this.sc = c = new m(this); ++a < f; ) c.add(a);
d && (a = this.head.indexOf(d.id), -1 === a && (a = Math.min(d.idx, f - 1)), this.sort(a, d.desc));
return this;
};
q._sort = function(f, a) {
a ? (this.s = a, a(f)) : (a = this.s) && a(f);
return f;
};
q.sort = function(f, a) {
this._sort(this.idxs, g(this, f, a));
this.sc.activate(f, a);
return this;
};
q = null;
q = m.prototype;
q.has = function(f) {
return null != this[f];
};
q.add = function(f) {
const a = this, c = a.t.head.cells[f];
a[f] = {
desc: null,
idx: f,
id: c.id
};
a.length++;
c.addClass("wg-sortable").on("click", function(d) {
if ("header" === d.target.nodeName.toLowerCase()) return d.stopImmediatePropagation(), 
a.toggle(f), !1;
});
return a;
};
q.toggle = function(f) {
this.t.sort(f, !this[f].desc).clear().render();
return this;
};
q.activate = function(f, a) {
let c, d = this.active, h = this[f], n = this.t.head.cells;
d && (c = n[d.idx]) && (c.removeClass(d.css), d !== h && c.restyle());
(c = n[f]) ? (h.desc = a, this.active = h, f = "wg-" + (a ? "desc" : "asc"), c.addClass(f).restyle(), 
h.css = f) : this.active = null;
return this;
};
q = null;
q = r.prototype;
q.render = function(f) {
let a, c = [], d = this._, h = this.length;
if (d) {
for (this.c = c; 0 !== h--; ) a = d.cloneNode(!1), c[h] = this.update(h, a), a.$index = this.i, 
f[h].appendChild(a);
this._ = null;
} else for (c = this.c; 0 !== h--; ) f[h].appendChild(c[h]);
this.rendered = !0;
return this;
};
q.update = function(f, a) {
a = a || this.c[f] || {};
f = (this.d[f] || function() {})() || " ";
null == f.innerHTML ? a.textContent = f : a.innerHTML = f.innerHTML;
return a;
};
q.cells = function() {
return this.c || [ this._ ];
};
q.data = function() {
const f = [], a = this.length;
let c = -1;
for (;++c < a; ) f[c] = this.cellVal(c);
return f;
};
q.destroy = function() {
this.page = null;
this.rendered = !1;
};
q.cellVal = function(f) {
f = this.d[f]() || "";
return String(f.textContent || f);
};
q = null;
q = x.prototype;
q.size = function() {
return this.rows.length;
};
q.insert = function(f) {
const a = this.h, c = p("wg-dead");
c.style.height = String(a) + "px";
f.appendChild(c);
return this.dead = c;
};
q.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
q.height = function() {
let f = this.h;
null == f && (this.h = f = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHeight);
f || y("row has zero height");
return f;
};
q.render = function(f) {
let a, c = -1, d = this.rows, h = d.length;
const n = this.dead, v = this.live, z = v.childNodes;
for (;++c < h; ) a = d[c], a.rendered || a.render(z);
h = f.length;
for (c = 0; c < h; c++) z[c].style.width = f[c];
n.parentNode.replaceChild(v, n);
this.rendered = !0;
this.h = null;
return this;
};
q.sleep = function() {
const f = this.height(), a = this.live, c = this.dead;
c.style.height = String(f) + "px";
a.parentNode.replaceChild(c, a);
this.rendered = !1;
this.h = f;
return this;
};
q.sleepH = function(f) {
f *= this.rows.length;
const a = this.dead;
a && (a.style.height = String(f) + "px");
this.rendered || (this.h = f);
return this;
};
q.widths = function(f) {
const a = this.live.childNodes;
let c = f.length;
for (;0 !== c--; ) a[c].style.width = f[c];
return this;
};
q.destroy = function() {
var f = this.rendered ? this.live : this.dead;
const a = this.rows;
f.parentNode.removeChild(f);
for (f = a.length; 0 !== f--; ) a[f].destroy();
};
return w;
}({}, K, M));
D.register("2b", function(w, t, E) {
function y(d, h) {
var n = d.id;
let v = n && q[n], z = v && v.parent();
if (!v || !z) return null;
var C = 1 === z.dir;
n = C ? "X" : "Y";
let B = "page" + n;
C = C ? x : r;
let F = C(z.el);
n = h["offset" + n];
let G = z.el, H = G.className;
null == n && (n = h[B] - C(d));
n && (F += n);
G.className = H + " is-resizing";
return {
done: function() {
G.className = H;
},
move: function(J) {
z.resize(J[B] - F, v);
return !0;
}
};
}
function p(d) {
function h() {
A(E).off("mousemove", n);
c && (c.done(), c = null);
return !0;
}
function n(v) {
c ? c.move(v) : h();
return !0;
}
if (c) return !0;
c = y(d.target, d);
if (!c) return !0;
A(E).one("mouseup", h).on("mousemove", n);
return e(d);
}
function u(d, h) {
const n = h.type;
"touchmove" === n ? c && c.move(h) : "touchstart" === n ? c = y(d.target, h) : "touchend" === n && c && (c.done(), 
c = null);
}
function e(d) {
d.stopPropagation();
d.preventDefault();
return !1;
}
function b(d) {
f && f.redraw();
d && d.redraw();
return f = d;
}
function k(d, h) {
const n = A(h);
n.on("editFocus", function(v) {
v.stopPropagation();
n.trigger("wgFocus", [ b(d) ]);
}).on("editBlur", function(v) {
v.stopPropagation();
n.trigger("wgBlur", [ b(null) ]);
});
}
function g(d) {
const h = d.id, n = d.className, v = n ? [ n ] : [];
this.id = h;
this.el = d;
this.pos = this.index = 0;
this._cn = n;
this.css = v.concat("wg-cell");
q[h] = this;
this.clear();
}
const l = D.include("2d") || D.require("2"), m = D.require("1a"), r = m.top, x = m.left, q = {};
let f, a = 0, c = !1;
w.init = function(d) {
const h = new g(d);
h.redraw();
D.require("2e").ok(function(n) {
n.dragger(d, u);
});
A(d).on("mousedown", p);
return h;
};
t = g.prototype;
t.fire = function(d, h) {
d = A.Event(d);
d.cell = this;
A(this.el).trigger(d, h);
return this;
};
t.each = function(d) {
let h = -1;
const n = this.cells, v = n.length;
for (;++h < v; ) d(n[h], h);
return this;
};
t.indexOf = function(d) {
return (d = q[d.id || String(d)]) && d.pid === this.id ? d.index : -1;
};
t.on = function() {
return this.$("on", arguments);
};
t.off = function() {
return this.$("off", arguments);
};
t.find = function(d) {
return A(this.el).find(d);
};
t.$ = function(d, h) {
A.fn[d].apply(A(this.el), h);
return this;
};
t.addClass = function(d) {
this.css.push(d);
return this;
};
t.removeClass = function(d) {
d = this.css.indexOf(d);
-1 !== d && this.css.splice(d, 1);
return this;
};
t.parent = function() {
return this.pid && q[this.pid];
};
t.splitx = function() {
return this._split(1, arguments);
};
t.splity = function() {
return this._split(2, arguments);
};
t._split = function(d, h) {
(this.length || this.field) && this.clear();
let n = -1;
let v = h.length, z = 1 / v, C = 0;
for (;++n < v; ) {
var B = m.el();
this.body.appendChild(B);
var F = B;
{
var G = h[n];
let H = 1, J = G;
for (;q[G]; ) G = J + "-" + ++H;
}
F.id = G;
B = new g(B);
B.index = n;
B.pid = this.id;
B._locale(this.lang, this.rtl);
B.pos = C;
C += z;
this.cells.push(B);
this.length++;
}
this.dir = d;
this.redraw();
return this.cells;
};
t.count = function() {
return this.cells && this.cells.length || 0;
};
t.destroy = function() {
this.clear();
delete q[this.id];
const d = this.el;
d.innerHTML = "";
this.body = null;
d.className = this._cn || "";
A(d).off();
return this;
};
t.exists = function() {
return this === q[this.id];
};
t.clear = function() {
const d = this.el, h = this.cells, n = this.field, v = this.body, z = this.nav;
let C = this.length || 0;
for (;0 !== C--; ) delete q[h[C].destroy().id];
this.cells = [];
this.length = 0;
z && (d.removeChild(z), this.nav = null);
v && (n && (n.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
d === v.parentNode && d.removeChild(v));
this.body = d.appendChild(m.el("", "wg-body"));
this._h = null;
return this;
};
t.resize = function(d, h) {
if (!h && (h = this.cells[1], !h)) return;
var n = h.index;
let v = this.cells, z = A(this.el)[1 === this.dir ? "width" : "height"](), C = v[n + 1];
n = v[n - 1];
h.pos = Math.min((C ? C.pos * z : z) - ((h.body || h.el.firstChild).offsetTop || 0), Math.max(n ? n.pos * z : 0, d)) / z;
this.redraw();
this.fire("wgResize");
return this;
};
t.distribute = function(d) {
let h = -1, n = 0, v;
const z = this.cells, C = d.length;
for (;++h < C && (v = z[++n]); ) v.pos = Math.max(0, Math.min(1, d[h]));
this.redraw();
return this;
};
t.distribution = function() {
let d = [], h = 0;
const n = this.cells, v = n.length - 1;
for (;h < v; ) d[h] = n[++h].pos;
return d;
};
t.restyle = function() {
var d = this.css.concat();
0 === this.index ? d.push("first") : d.push("not-first");
this.dir && (d.push("wg-split"), 2 === this.dir ? d.push("wg-split-y") : d.push("wg-split-x"));
this.t && d.push("has-title");
this.nav && d.push("has-nav");
this.field && (d.push("is-field"), this.field.editable() ? d.push("is-editable") : d.push("is-readonly"));
d = d.join(" ");
d !== this._css && (this._css = d, this.el.className = d);
return this;
};
t.redraw = function(d) {
this.restyle();
const h = this.el;
var n = this.body, v = this.field;
if (n) {
var z = h.clientWidth || 0, C = h.clientHeight || 0, B = n.offsetTop || 0;
C = B > C ? 0 : C - B;
if (this._h !== C) {
this._h = C;
n.style.height = String(C) + "px";
var F = v;
}
this._w !== z && (this._w = z, F = v);
F && F.redraw();
}
n = this.length;
z = 1;
C = this.nav;
for (B = 2 === this.dir ? "height" : "width"; 0 !== n--; ) v = this.cells[n], C ? F = 1 : (v.fixed && (v.pos = v.fixed / A(h)[B]()), 
F = z - v.pos, z = v.pos), v.el.style[B] = String(100 * F) + "%", v.redraw(d);
return this;
};
t.contents = function(d, h) {
const n = this.el;
let v = this.body;
if (null == d) return v.innerHTML;
this.length ? this.clear() : v && (n.removeChild(v), v = null);
v || (this.body = v = n.appendChild(m.el("", h || "wg-content")), this._h = null, 
(h = this.lang) && this._locale(h, this.rtl, !0));
"string" === typeof d ? A(v)._html(d) : d && this.append(d);
this.redraw();
return this;
};
t.textarea = function(d, h) {
let n = this.field;
if (n) {
var v = n.editable();
n.reload(d, h);
v !== h && this.restyle();
} else this.length && this.clear(), v = m.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.setAttribute("autocomplete", "off"), v.setAttribute("id", "wg" + String(++a)), 
v.value = d, this.contents(v), n = D.require("2f")._new(v)[h ? "enable" : "disable"](), 
k(this, v), this.field = n, this.restyle();
this.lang || this.locale("en");
return n;
};
t.locale = function(d) {
d = D.require("29").cast(d);
return this._locale(String(d), d.isRTL());
};
t._locale = function(d, h, n) {
const v = this.body;
if (n || d !== this.lang) this.lang = d, v && v.setAttribute("lang", d);
if (n || h !== this.rtl) this.rtl = h, v && v.setAttribute("dir", h ? "RTL" : "LTR");
return this;
};
t.editable = function() {
let d = this.field;
if (d) return d.editable() ? d : null;
const h = this.cells;
let n = this.navigated();
if (null != n) return h[n].editable();
n = -1;
const v = h.length;
for (;++n < v && (d = h[n].editable(), null == d); );
return d;
};
t.eachTextarea = function(d) {
const h = this.field;
h ? d(h) : this.each(function(n) {
n.eachTextarea(d);
});
return this;
};
t.append = function(d) {
d && (d.nodeType ? l.init(this.body.appendChild(d)) : l.init(A(d).appendTo(this.body)));
return this;
};
t.prepend = function(d) {
const h = this.body;
if (d.nodeType) {
const n = h.firstChild;
l.init(n ? h.insertBefore(d, n) : h.appendChild(d));
} else l.init(A(d).prependTo(h));
return this;
};
t.before = function(d) {
const h = this.body;
d.nodeType ? l.init(this.el.insertBefore(d, h)) : l.init(A(d).insertBefore(h));
return this;
};
t.header = function(d, h) {
if (null == d && null == h) return this.el.getElementsByTagName("header")[0];
this.t = m.txt(d || "");
this.el.insertBefore(m.el("header", h), this.body).appendChild(this.t);
this.redraw();
return this;
};
t.toolbar = function() {
const d = this.header(), h = d.getElementsByTagName("nav");
return 0 === h.length ? d.appendChild(m.el("nav")) : h[0];
};
t.title = function(d) {
const h = this.t;
if (h) return h.nodeValue = d || "", h;
this.header(d);
return this.t;
};
t.titled = function() {
return this.t && this.t.nodeValue;
};
t.bodyY = function() {
return r(this.body, this.el);
};
t.scrollY = function(d) {
if (la === d) return this.body.scrollTop;
this.body.scrollTop = d;
};
t.tabulate = function(d) {
let h = this.table;
h ? h.clear() : h = D.require("30").create(this);
h.init(d);
return this.table = h;
};
t.lock = function() {
this.body.className += " locked";
return this;
};
t.scrollTo = function(d, h) {
let n = this.body;
var v = n.scrollTop;
let z = r(d, n);
if (v > z) v = z; else {
const C = n.clientHeight;
d = z + A(d).outerHeight();
if (C + v < d) v = d - C; else return;
}
h ? n.scrollTop = v : A(n).stop(!0).animate({
scrollTop: v
}, 250);
};
t.navigize = function(d, h) {
function n(H) {
const J = C[H], O = z[H], R = A(J.el).show();
O.addClass("active");
F = H;
G.data("idx", H);
J.fire("wgTabSelect", [ H ]);
return R;
}
const v = this, z = [], C = v.cells;
let B = v.nav, F;
B && v.el.removeChild(B);
B = v.nav = v.el.insertBefore(m.el("nav", "wg-tabs"), v.body);
const G = A(B).on("click", function(H) {
const J = A(H.target).data("idx");
if (null == J) return !0;
if (null != F) {
{
const O = z[F];
A(C[F].el).hide();
O.removeClass("active");
}
}
n(J);
v.redraw();
return e(H);
});
null == h && (h = G.data("idx") || 0);
v.each(function(H, J) {
z[J] = A('<a href="#' + H.id + '"></a>').data("idx", J).text(d[J]).appendTo(G);
H.pos = 0;
A(H.el).hide();
});
n(C[h] ? h : 0);
v.lock();
v.redraw();
return v;
};
t.navigated = function() {
const d = this.nav;
if (d) return A(d).data("idx");
};
t = null;
return w;
}({}, K, M));
D.register("1d", function(w, t, E) {
function y(a, c) {
a.stopPropagation();
r = c;
return !0;
}
function p(a) {
const c = "Zero One Two Few Many Other".split(" ");
return [ null, [ c[5] ], [ c[1], c[5] ], [ c[1], c[3], c[5] ], [ c[1], c[3], c[4], c[5] ], [ c[1], c[2], c[3], c[4], c[5] ] ][a] || c;
}
function u(a) {
const c = [];
a && (a.saved() || c.push("po-unsaved"), a.fuzzy() ? c.push("po-fuzzy") : a.hasFlag() && c.push("po-flagged"), 
a.valid() || c.push("po-error"), a.translation() || c.push("po-empty"), a.comment() && c.push("po-comment"));
return c.join(" ");
}
function e(a, c, d) {
c = A(a.title(c).parentNode);
let h = c.find("span.lang");
d ? (d = D.require("29").cast(d), h.length || (h = A("<span></span>").prependTo(c)), 
h.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (h.remove(), 
d = "en");
a.locale(d);
return c;
}
function b(a, c, d) {
c.on("click", function(h) {
const n = a.fire(d, [ h.target ]);
n || h.preventDefault();
return n;
});
}
function k(a, c, d, h) {
let n = a[c];
return d.length ? (n || (n = h.find("div.meta"), n.length || (n = A('<div class="meta"></div>').insertAfter(h.header())), 
b(a, n, "poMeta"), a[c] = n), n.html(d.join("\n")).show(), !0) : n && n.text() ? (n.text("").hide(), 
!0) : !1;
}
function g() {
this.dirty = 0;
}
D.require("3");
const l = D.require("28").html, m = D.require("6").sprintf;
let r, x;
w.extend = function(a) {
return a.prototype = new g();
};
w.localise = function(a) {
x = a;
return w;
};
const q = function() {
const a = E.createElement("p"), c = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
a.innerHTML = d.replace(c, "data-x-loco-$1=");
const h = a.textContent.trim();
return h ? h.replace("data-x-loco-", "") : d.trim();
};
}(), f = g.prototype = D.require("2a").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
f.init = function() {
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
f.t = function() {
return this.$t || x || D.require("1").init();
};
f.localise = function(a) {
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
f.setRootCell = function(a) {
function c(h) {
d.redraw(!0, h);
return !0;
}
const d = D.require("2b").init(a);
A(t).on("resize", c);
this.redraw = c;
A(a).on("wgFocus wgBlur", y);
this.destroy = function() {
d.destroy();
A(t).off("resize", c);
};
this.rootDiv = a;
return d;
};
f.$ = function() {
return A(this.rootDiv);
};
f.setListCell = function(a) {
const c = this;
c.listCell = a;
a.on("wgRowSelect", function(d, h) {
(d = c.po.row(h)) && d !== c.active && c.loadMessage(d);
}).on("wgRowDeselect", function(d, h, n) {
n || c.loadNothing();
});
};
f.setSourceCell = function(a) {
this.sourceCell = a;
};
f.setTargetCell = function(a) {
this.targetCell = a;
};
f.next = function(a, c, d) {
const h = this.listTable, n = this.po;
let v = h.selected(), z = v, C;
for (;null != (v = h.next(a, d, v)); ) {
if (z === v) {
v = null;
break;
}
if (c && (C = n.row(v), C.translated(0))) continue;
break;
}
null != v && h.select(v, !0);
return v;
};
f.select = function(a) {
this.listTable.select(a);
this.focus();
};
f.current = function(a) {
const c = this.active;
if (null == a) return c;
a ? a.is(c) ? (this.reloadMessage(a), this.focus()) : (this.loadMessage(a), a = this.po.indexOf(a), 
-1 !== a && this.select(a)) : this.unloadActive();
return this;
};
f.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
f.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
f.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
f.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
f.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
f.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
f.rebuildSearch = function() {
const a = this.po.rows, c = a.length, d = this.dict;
d.clear();
let h = -1;
for (;++h < c; ) d.add(h, a[h].toText());
};
f.filtered = function() {
return this.lastSearch || "";
};
f.filter = function(a, c) {
const d = this.listTable, h = this.lastFound, n = this.lastSearch || "";
let v, z;
a ? (z = this.dict.find(a), v = z.length, v === h && 0 === a.indexOf(n) ? c = !0 : d.filter(z)) : (v = this.po.length, 
d.unfilter());
this.lastFound = v;
this.lastSearch = a;
c || this.fire("poFilter", [ a, v ]);
return v;
};
f.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
f.unsave = function(a, c) {
let d = !1;
if (a) {
if (d = a.saved(c)) this.dirty++, a.unsave(c), this.fire("poUnsaved", [ a, c ]);
this.reCssRow(a);
}
return d;
};
f.reCssRow = function(a) {
var c = this.po.indexOf(a);
if ((c = this.listTable.tr(c)) && c.length) {
var d = u(a);
a = c[0].className;
d = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + d;
d !== a && A(c).attr("class", d);
}
};
f.save = function(a) {
const c = this.po;
if (this.dirty || a) {
const d = [], h = [], n = this.listTable;
c.each(function(v, z, C) {
z.err && d.push(z);
z.saved() || (z.save(), (z = (v = n.row(C)) && v.page) && z.live ? h[z.i] = z.live : v && A(v.cells()).removeClass("po-unsaved"));
});
h.length && A(h).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = d.length ? d : null;
this.fire("poSave", []);
}
return c;
};
f.fire = function(a, c) {
const d = this.handle;
if (d && d[a] && !1 === d[a].apply(this, c || [])) return !1;
a = A.Event(a);
this.$().trigger(a, c);
return !a.isDefaultPrevented();
};
f.on = function(a, c) {
this.$().on(a, c);
return this;
};
f.getSorter = function() {
return null;
};
f.setLocales = function(a, c) {
const d = this.labels;
a && a !== this.sourceLocale && (this.sourceLocale = a, this.sourceCell && e(this.sourceCell, d[0], a));
c && c !== this.targetLocale && (this.targetLocale = c, a = m(d[3], c.label || "Target"), 
this.targetCell && e(this.targetCell, a, c));
};
f.reload = function() {
const a = this;
var c = a.listCell;
const d = a.po;
var h = d && d.locale() || a.targetLocale, n = d && d.source() || a.sourceLocale;
const v = h && h.isRTL(), z = d && d.length || 0;
if (!d || !d.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(n, h);
a.lastSearch && (a.lastSearch = "", a.lastFound = z, a.fire("poFilter", [ "", z ]));
n = (h = a.listTable) && h.thead().distribution();
let C = [];
a.listTable = h = c.tabulate({
eachCol: function(B) {
const F = a.getListColumns(), G = a.getListHeadings();
for (const H in F) {
const J = F[H];
B(J, H, G[J]);
}
},
eachRow: function(B) {
d.each(function(F, G) {
a.validate(G) && C.push(G);
B(G.idx, a.getListEntry(G), u(G));
});
},
sort: a.getSorter()
});
c = a.getListColumns();
for (const B in c) h.sortable(c[B]);
n && h.thead().distribute(n);
h.tbody().$(v ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = C.length ? C : null;
return !!z;
};
f.load = function(a, c) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== c ? this.listTable.selectRow(c || 0) : this.active && this.unloadActive());
};
f.pasteMessage = function(a) {
this.validate(a);
if (this.active === a) {
let c = this.sourceCell, d = 0;
c && c.eachTextarea(function(h) {
h.val(a.source(null, d++));
});
(c = this.contextCell) && c.eachTextarea(function(h) {
h.val(a.context());
});
if (c = this.targetCell) d = 0, c.eachTextarea(function(h) {
h.val(a.translation(d++));
});
}
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
f.reloadMessage = function(a) {
const c = this.sourceCell, d = this.targetCell;
this.pasteMessage(a);
c && this.setSrcMeta(a, c) && c.redraw();
if (d) {
var h = d.navigated() || 0;
h = this.setTrgMeta(a, h, d);
!c && this.setSrcMeta(a, d) && (h = !0);
h && (d.redraw(), this.reCssRow(a));
}
return this;
};
f.setStatus = function() {
return null;
};
f.setSrcMeta = function(a, c) {
const d = [];
var h = this.labels, n = a.context();
let v = [], z = a.tags(), C = z && z.length;
n && (v.push("<span>" + l(h[4]) + "</span>"), v.push('<mark class="ctxt">' + l(n) + "</mark>"));
if (C && this.getTag) for (v.push("<span>Tagged:</span>"), h = -1; ++h < C; ) (n = this.getTag(z[h])) && v.push("<mark>" + l(n.mod_name) + "</mark>");
v.length && d.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (n = a.refs()) && (z = n.split(/\s/), C = z.length)) {
for (v = []; 0 <= --C; ) n = z[C], v.push("<code>" + l(n) + "</code>");
d.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(n = a.format()) && "no-" !== n.substring(0, 3) && d.push('<p class="has-icon icon-help">This string is formatted. <a href="#format">See full details</a>.</p>');
(n = a.notes()) && d.push('<p class="has-icon icon-info">' + l(n, !0) + "</p>");
return k(this, "$smeta", d, c);
};
f.setTrgMeta = function(a, c, d) {
const h = [], n = (c = a.errors(c)) && c.length;
if (n) for (let v = 0; v < n; v++) h.push('<p class="has-icon icon-warn">' + l(c[v], !0) + ".</p>");
a.tcmt && h.push('<p class="has-icon icon-info">' + l(a.tcmt, !0) + "</p>");
return k(this, "$tmeta", h, d);
};
f.loadMessage = function(a) {
function c(N) {
if ("=" === N.charAt(0)) {
const L = N.split(" ");
N = L[0].substring(1);
L[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = L.join(" ");
}
return N;
}
function d(N, L) {
const S = ma;
var P = da[0];
N.off();
N.titled() !== P && e(N, P, L || "en");
P = !1;
B.setSrcMeta(a, N) && (P = !0);
if (a.plural()) {
P = -1;
let U = [], V = [];
const Y = N.id + "-";
L = a.sourceForms() || L && L.plurals || p(2);
const ea = L.length;
if (2 !== ea || "=" === L[0].charAt(0) && "=1" !== L[0]) for (;++P < ea; ) U[P] = Y + String(P), 
V[P] = c(L[P].split(" ", 1)[0]) + ":"; else U = [ Y + "-0", Y + "-1" ], V = [ da[1], da[2] ];
N.splity.apply(N, U);
N.each(function(fa, aa) {
fa.header(V[aa]).textarea(a.source(null, aa), S).setStrf(J).setMode(ba).setInvs(G);
});
N.lock();
S && N.each(function(fa, aa) {
h(fa, aa);
});
} else P && N.redraw(), N.textarea(a.source(), S).setStrf(J).setMode(ba).setInvs(G), 
S && h(N, 0);
}
function h(N, L) {
N.on("changing", function(S, P) {
a.source(P, L);
0 === L && B.updateListCell(a, "source");
B.unsave(a, L);
}).on("changed", function() {
0 === L && B.po.reIndex(a);
B.dict && B.rebuildSearch();
B.fire("poUpdate", [ a ]);
});
}
function n(N, L, S, P) {
Z && L.eachTextarea(function(V) {
V.ping();
});
L.off("changing").off("changed");
var U = m(da[3], S.label || "Target");
L.titled() !== U && e(L, U, S);
U = !1;
!N && B.setSrcMeta(a, L) && (U = !0);
B.setTrgMeta(a, P, L) && (U = !0);
B.setStatus(a, P);
if (1 !== S.nplurals && a.pluralized()) {
N = function(W) {
W < aa && (Y.push(c(fa[W])), V.push(ea + String(W)));
};
let V = [], Y = [];
const ea = L.id + "-", fa = a.targetForms() || S.plurals || p(S.nplurals), aa = fa.length;
for (a.eachMsg(N); (S = V.length) < aa; ) N(S);
L.splitx.apply(L, V);
L.each(function(W, ca) {
const na = Z && !a.disabled(ca);
W.textarea(a.translation(ca), na).setStrf(J).setMode(ba).setInvs(G);
Z && v(W, ca);
});
L.navigize(Y, P || null).on("wgTabSelect", function(W, ca) {
(W = Z && W.cell.editable()) && W.focus();
B.setTrgMeta(a, ca, L);
B.setStatus(a, ca);
B.fire("poTab", [ ca ]);
});
} else U && L.redraw(), L.textarea(a.translation(), Z && !a.disabled(0)).setStrf(J).setMode(ba).setInvs(G), 
Z && v(L, 0);
}
function v(N, L) {
function S() {
P = null;
B.validate(a);
const V = a.errors(L).join(" ");
U !== V && (U = V, B.setTrgMeta(a, L, N) && N.redraw(), B.reCssRow(a));
}
let P, U = a.errors(L).join(" ");
N.on("changing", function(V, Y, ea) {
P && (clearTimeout(P), P = null);
a.translate(Y, L);
0 === L && B.updateListCell(a, "target");
a.fuzzy(L) && a.saved(L) ? B.fuzzy(!1, a, L) : B.unsave(a, L);
"" === Y ? (B.fire("poEmpty", [ !0, a, L ]), B.setStatus(a, L)) : "" === ea && (B.fire("poEmpty", [ !1, a, L ]), 
B.setStatus(a, L));
P = setTimeout(S, U ? 300 : 1e3);
}).on("changed", function() {
B.dict && B.rebuildSearch();
B.fire("poUpdate", [ a ]);
});
}
function z(N) {
N.off();
const L = da[4];
N.titled() !== L && (e(N, L), B.setStatus(null));
N.textarea(a.context(), !0).setMode(ba).setInvs(G);
oa && N.on("changing", function(S, P) {
a.context(P);
B.updateListCell(a, "source");
B.unsave(a, ha);
}).on("changed", function() {
B.po.reIndex(a);
B.dict && B.rebuildSearch();
B.fire("poUpdate", [ a ]);
});
}
function C(N) {
const L = da[5];
N.titled() !== L && e(N, L);
N.off().on("changing", function(S, P) {
a.comment(P);
B.fire("poComment", [ a, P ]);
B.unsave(a, ha);
}).textarea(a.comment(), !0);
}
const B = this;
var F = a.isHTML();
const G = B.inv || !1, H = this.fmt || null, J = a.format() || null, O = a.is(B.active), R = B.sourceCell, I = B.targetCell, Q = B.contextCell, X = B.commentCell, Z = B.editable.target, ma = B.editable.source, oa = B.editable.context, pa = B.sourceLocale, ka = B.targetLocale, da = B.labels;
let ha = 0, ba = B.mode, ia = r;
B.html !== F && (B.html = F, "code" !== B.mode && (ba = F ? "html" : "", B.setMode(ba)));
B.active = a;
R && d(R, pa);
Q && z(Q);
I && ka && (ha = I.navigated() || 0, n(R, I, ka, ha));
X && C(X);
ia && (ia.exists() || (ia = ia.parent()), (F = ia.editable()) && F.focus());
H !== J && (this.fmt = J);
O || B.fire("poSelected", [ a, ha ]);
};
f.unloadActive = function() {
function a(d) {
d && d.text("").hide();
}
function c(d) {
d && d.off().clear();
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
f.loadNothing = function() {
const a = this.t(), c = this.mode || "", d = this.inv || !1, h = this.fmt;
this.unloadActive();
this.setStatus(null);
let n = this.commentCell;
n && n.textarea("", !1);
if (n = this.sourceCell) n.textarea("", !1).setStrf(h).setMode(c).setInvs(d), n.title(a._x("Source text not loaded", "Editor") + ":");
if (n = this.contextCell) n.textarea("", !1).setMode(c).setInvs(d), n.title(a._x("Context not loaded", "Editor") + ":");
if (n = this.targetCell) n.textarea("", !1).setStrf(h).setMode(c).setInvs(d), n.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
f.updateListCell = function(a, c) {
c = this.getListColumns()[c];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(c);
};
f.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? q(a) : a.trim()) || " ";
};
f.fuzzy = function(a, c, d) {
c = c || this.active;
const h = c.fuzzy(d);
!0 !== a || h ? !1 === a && h && this.flag(0, c, d) && this.fire("poFuzzy", [ c, !1, d ]) : this.flag(4, c, d) && this.fire("poFuzzy", [ c, !0, d ]);
return h;
};
f.flag = function(a, c, d) {
if (!c) {
c = this.active;
d = this.getTargetOffset();
if (null == d) return null;
d && c.targetForms() && (d = 0);
}
const h = c.flagged(d);
if (null == a) return h;
if (h === a || a && !c.translated(d) || !this.fire("poFlag", [ a, h, c, d ])) return !1;
c.flag(a, d);
this.fire("poUpdate", [ c ]) && this.unsave(c, d);
this.setStatus(c, d);
return !0;
};
f.add = function(a, c) {
let d, h = this.po.get(a, c);
h ? d = this.po.indexOf(h) : (d = this.po.length, h = this.po.add(a, c), this.load(this.po, -1), 
this.fire("poAdd", [ h ]), this.fire("poUpdate", [ h ]));
this.lastSearch && this.filter("");
this.listTable.select(d);
return h;
};
f.del = function(a) {
if (a = a || this.active) {
var c = this.lastSearch, d = this.po.del(a);
null != d && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (c && this.filter(c), this.active || (d = Math.min(d, this.po.length - 1), 
this.listTable.select(d))));
}
};
f.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
f.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(h) {
h.setMode(a);
});
const c = this.active, d = this.sourceCell;
c && c.refs() && d && this.setSrcMeta(c, d) && d.redraw();
this.fire("poMode", [ a ]);
}
return this;
};
f.getMono = function() {
return "code" === this.mode;
};
f.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(c) {
c.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
f.getInvs = function() {
return this.inv || !1;
};
f.callTextareas = function(a) {
var c = this.targetCell;
c && c.eachTextarea(a);
(c = this.contextCell) && c.eachTextarea(a);
(c = this.sourceCell) && c.eachTextarea(a);
return this;
};
f.focus = function() {
const a = this.getTargetEditable();
a && a.focus();
return this;
};
f.validate = function(a) {
return 0;
};
return w;
}({}, K, M));
D.register("1e", function(w, t, E) {
w.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, p = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(u, e) {
const b = e && e.count || 0;
e = e && e.types || {};
let k = !0, g = 0, l = 0;
for (var m; null != (m = p.exec(u)); ) {
const r = m[2];
if ("%" !== r || "%%" !== m[0]) {
if ("" === r || -1 === "suxXbcdeEfFgGo".indexOf(r)) {
k = !1;
break;
}
null == m[1] ? m = ++l : (m = parseInt(m[1]), g = Math.max(g, m));
null == e[m] && (e[m] = {});
e[m][r] = !0;
}
}
if (k) return {
valid: !0,
count: Math.max(g, l, b),
types: e
};
p.lastIndex = 0;
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
}({}, K, M));
D.register("d", function(w, t, E) {
function y() {
this.init();
}
function p(g) {
g = A('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
D.require("c").init(g);
return g;
}
function u(g) {
return p("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(l) {
l.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function e(g) {
return p("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(l) {
l.preventDefault();
g.fire("poHint");
});
}
function b(g, l) {
return D.require("6").vsprintf(g, l);
}
w.init = function(g) {
const l = new y();
g = l.setRootCell(g);
var m = g.splity("po-list", "po-edit");
let r = m[0], x = m[1];
m = x.splitx("po-trans", "po-comment");
var q = m[0];
let f = m[1].header("Loading..");
m = q.splity("po-source", "po-target");
q = m[0].header("Loading..");
m = m[1].header("Loading..");
g.distribute([ .34 ]);
x.distribute([ .8 ]);
l.setListCell(r);
l.setSourceCell(q);
l.setTargetCell(m);
l.commentCell = f;
l.editable.source = !1;
return l;
};
t = y.prototype = D.require("1d").extend(y);
t.getListHeadings = function() {
const g = this.t(), l = [ g._x("Source text", "Editor") ];
this.targetLocale && (l[1] = g._x("Translation", "Editor"));
return l;
};
t.getListColumns = function() {
const g = {
source: 0
};
this.targetLocale && (g.target = 1);
return g;
};
t.getListEntry = function(g) {
const l = this.cellText, m = [ function() {
let r, x = l(g.source() || ""), q = g.context();
return q ? (r = E.createElement("p"), r.appendChild(E.createElement("mark")).innerText = q, 
r.appendChild(E.createTextNode(" " + x)), r) : x;
} ];
this.targetLocale && (m[1] = function() {
return l(g.translation() || "");
});
return m;
};
t.stats = function() {
let g = this.po, l = g.length, m = 0, r = 0, x = 0;
g.each(function(q, f) {
f.fuzzy() ? x++ : f.translated() ? m++ : r++;
});
return {
t: l,
p: m.percent(l) + "%",
f: x,
u: r
};
};
t.unlock = function() {
const g = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
g && (this._unlocked = g, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
t.lock = function() {
const g = this._unlocked;
g && (this.targetLocale = g, delete this._unlocked, this.po && this.po.lock(g), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, g ]), 
this.active && this.loadMessage(this.active));
};
t.locked = function() {
return !this._unlocked;
};
t.setStatus = function(g) {
let l = this.$tnav;
if (null == g) l && (l.remove(), this.$tnav = null); else {
l || (this.$tnav = l = A("<nav></nav>").append(u(this)).append(e(this)).appendTo(this.targetCell.header()));
var m = [];
g.translated() ? g.fuzzy() && m.push("po-fuzzy") : m.push("po-empty");
l.attr("class", m.join(" "));
}
};
t.getSorter = function() {
function g(r, x) {
const q = r.weight(), f = x.weight();
return q === f ? l(r, x) : q > f ? -1 : 1;
}
function l(r, x) {
return r.hash().localeCompare(x.hash());
}
const m = this;
return function(r) {
const x = m.po, q = m.locked() ? g : l;
r.sort(function(f, a) {
return q(x.row(f), x.row(a));
});
};
};
t.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const l = [];
let m = this.validateMessagePrintf(g, l);
m && (g.err = l);
return m;
};
t.validateMessagePrintf = function(g, l) {
const m = g.format();
if ("no-" === m.substring(0, 3)) return 0;
const r = g.msgid(), x = g.msgidPlural();
null == k && (k = D.require("1e").init());
var q = k;
if (!("" !== m || q.sniff(r) || "" !== x && q.sniff(x))) return 0;
let f = 0, a = q.parse(r);
x && a.valid && (a = q.parse(x, a));
if (!a.valid) return 0;
let c = a.count;
if (0 !== c || "" !== m) {
var d = this;
g.eachMsg(function(h, n) {
l[h] = [];
if ("" !== n) {
n = q.parse(n);
var v = n.count;
h = l[h];
if (n.valid) if (v > c) h.push(b(d.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ c ])), 
f++; else if (v < c && "" === x) h.push(b(d.t()._("Missing placeholders; source text formatting suggests at least %s"), [ c ])), 
f++; else {
v = a.types;
for (const z in n.types) for (const C in n.types[z]) if (null == v[z] || null == v[z][C]) {
h.push(d.t()._("Mismatching placeholder type; check against source text formatting"));
f++;
return;
}
} else h.push(d.t()._("Possible syntax error in string formatting")), f++;
}
});
return f;
}
};
t.handle = {};
let k;
return w;
}({}, K, M));
D.register("e", function(w, t, E) {
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
}, p = {
38: !0,
40: !0,
73: !0
}, u = {
66: function(e, b) {
if (e = b.current()) e.normalize(), b.focus().pasteMessage(e);
},
75: function(e, b) {
if (e = b.current()) e.untranslate(), b.focus().pasteMessage(e);
},
85: function(e, b) {
b.focus().fuzzy(!b.fuzzy());
},
13: function(e, b) {
b.getFirstEditable() && b.next(1, !0, !0);
},
40: function(e, b) {
e = e.shiftKey;
b.next(1, e, e);
},
38: function(e, b) {
e = e.shiftKey;
b.next(-1, e, e);
},
73: function(e, b) {
if (!e.shiftKey) return !1;
b.setInvs(!b.getInvs());
}
};
w.init = function(e, b) {
function k(l) {
if (l.isDefaultPrevented() || !l.metaKey && !l.ctrlKey) return !0;
const m = l.which;
if (!g[m]) return !0;
const r = u[m];
if (!r || l.altKey || l.shiftKey && !p[m] || !1 === r(l, e)) return !0;
l.stopPropagation();
l.preventDefault();
return !1;
}
const g = {};
A(b || t).on("keydown", k);
return {
add: function(l, m) {
u[y[l]] = m;
return this;
},
enable: function() {
for (const l in arguments) g[y[arguments[l]]] = !0;
return this;
},
disable: function() {
A(b || t).off("keydown", k);
e = b = null;
for (const l in u) g[l] = !1;
}
};
};
return w;
}({}, K, M));
D.register("1f", function(w, t, E) {
function y() {
this.reIndex([]);
}
w.init = function() {
return new y();
};
t = y.prototype;
t.reIndex = function(p) {
const u = {}, e = p.length;
let b = -1;
for (;++b < e; ) u[p[b]] = b;
this.keys = p;
this.length = b;
this.ords = u;
};
t.key = function(p, u) {
if (null == u) return this.keys[p];
const e = this.keys[p], b = this.ords[u];
if (u !== e) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[p] = u;
delete this.ords[e];
this.ords[u] = p;
}
return p;
};
t.indexOf = function(p) {
p = this.ords[p];
return null == p ? -1 : p;
};
t.add = function(p, u) {
let e = this.ords[p];
null == e && (this.keys[this.length] = p, e = this.ords[p] = this.length++);
this[e] = u;
return e;
};
t.get = function(p) {
return this[this.ords[p]];
};
t.has = function(p) {
return null != this.ords[p];
};
t.del = function(p) {
this.cut(this.ords[p], 1);
};
t.cut = function(p, u) {
u = u || 1;
const e = [].splice.call(this, p, u);
this.keys.splice(p, u);
this.reIndex(this.keys);
return e;
};
t.each = function(p) {
const u = this.keys, e = this.length;
let b = -1;
for (;++b < e; ) p(u[b], this[b], b);
return this;
};
t.sort = function(p) {
const u = this.length, e = this.keys, b = this.ords, k = [];
let g = -1;
for (;++g < u; ) k[g] = [ this[g], e[g] ];
k.sort(function(m, r) {
return p(m[0], r[0]);
});
for (g = 0; g < u; g++) {
var l = k[g];
this[g] = l[0];
l = l[1];
e[g] = l;
b[l] = g;
}
return this;
};
t.join = function(p) {
return [].join.call(this, p);
};
return w;
}({}, K, M));
D.register("20", function(w, t, E) {
function y(p, u) {
var e = new RegExp("^.{0," + (p - 1) + "}[" + u + "]"), b = new RegExp("^[^" + u + "]+");
return function(k, g) {
for (var l = k.length, m; l > p; ) {
m = e.exec(k) || b.exec(k);
if (null == m) break;
m = m[0];
g.push(m);
m = m.length;
l -= m;
k = k.substring(m);
}
0 !== l && g.push(k);
return g;
};
}
w.create = function(p) {
function u(r) {
return g[r] || "\\" + r;
}
var e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == p || isNaN(p = Number(p))) p = 79;
if (0 < p) {
var l = y(p - 3, " ");
var m = y(p - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(r, x) {
if (!x) return r + ' ""';
x = x.replace(k, u);
var q = 0;
x = x.replace(e, function() {
q++;
return "\\n\n";
});
if (!(q || p && p < x.length + r.length + 3)) return r + ' "' + x + '"';
r = [ r + ' "' ];
x = x.split("\n");
if (m) for (var f = -1, a = x.length; ++f < a; ) m(x[f], r); else r = r.concat(x);
return r.join('"\n"') + '"';
},
prefix: function(r, x) {
r = r.split(e);
return x + r.join("\n" + x);
},
refs: function(r) {
r = r.replace(b, " ", r);
l && (r = l(r, []).join("\n#: "));
return "#: " + r;
}
};
};
return w;
}({}, K, M));
D.register("2c", function(w, t, E) {
function y() {
this.length = 0;
}
w.init = function() {
return new y();
};
t = y.prototype;
t.push = function(p) {
this[this.length++] = p;
return this;
};
t.sort = function(p) {
[].sort.call(this, p);
return this;
};
t.each = function(p) {
for (var u = -1, e = this.length; ++u < e; ) p(u, this[u]);
return this;
};
return w;
}({}, K, M));
D.register("21", function(w, t, E) {
function y() {}
w.extend = function(p) {
return p.prototype = new y();
};
t = y.prototype = D.require("2a").init([ "load" ]);
t.row = function(p) {
return this.rows[p];
};
t.lock = function(p) {
return this.locale(p || {
lang: "zxx",
label: "",
nplurals: 2,
pluraleq: "n!=1"
});
};
t.unlock = function() {
const p = this.loc;
this.loc = null;
return p;
};
t.locale = function(p) {
null == p ? p = this.loc : this.loc = p = D.require("29").cast(p);
return p;
};
t.source = function(p) {
null == p ? p = this.src || D.require("29").cast({
lang: "en",
label: "English",
nplurals: 2,
pluraleq: "n!=1"
}) : this.src = p = D.require("29").cast(p);
return p;
};
t.each = function(p) {
this.rows.each(p);
return this;
};
t.indexOf = function(p) {
"object" !== typeof p && (p = this.get(p));
if (!p) return -1;
null == p.idx && (p.idx = this.rows.indexOf(p.hash()));
return p.idx;
};
t.get = function(p) {
return this.rows && this.rows.get(p);
};
t.has = function(p) {
return this.rows && this.rows.has(p);
};
t.del = function(p) {
p = this.indexOf(p);
if (-1 !== p) {
const u = this.rows.cut(p, 1);
if (u && u.length) return this.length = this.rows.length, this.rows.each(function(e, b, k) {
b.idx = k;
}), p;
}
};
t.reIndex = function(p, u) {
const e = p.hash(), b = this.indexOf(p), k = this.rows.indexOf(e);
return k === b ? b : -1 !== k ? (u = (u || 0) + 1, p.source("Error, duplicate " + String(u) + ": " + p.source()), 
this.reIndex(p, u)) : this.rows.key(b, e);
};
t.sort = function(p) {
this.rows.sort(p);
return this;
};
t.export = function() {
const p = this.rows, u = p.length, e = D.require("2c").init();
let b = -1;
for (;++b < u; ) e.push(p[b]);
return e;
};
return w;
}({}, K, M));
D.register("22", function(w, t, E) {
function y(e, b, k) {
if (null == k) return e[b] || "";
e[b] = k || "";
return e;
}
function p() {
this._id = this.id = "";
}
function u(e, b) {
const k = e.length;
let g = -1;
for (;++g < k; ) b(g, e[g]);
}
w.extend = function(e) {
return e.prototype = new p();
};
t = p.prototype;
t.flag = function(e, b) {
const k = this.flg || (this.flg = []);
if (null != b) k[b] = e; else for (b = Math.max(k.length, this.src.length, this.msg.length); 0 !== b--; ) k[b] = e;
return this;
};
t.flagged = function(e) {
return (this.flg || [])[e || 0] || 0;
};
t.hasFlag = function() {
const e = this.flg || [];
let b = e.length;
for (;0 !== b--; ) if (this.isFlag(e[b])) return !0;
return !1;
};
t.isFlag = function(e) {
return 0 < e;
};
t.flags = function() {
const e = {}, b = [], k = this.flg || [];
let g = k.length;
for (;0 !== g--; ) {
const l = k[g];
e[l] || (e[l] = !0, b.push(l));
}
return b;
};
t.flaggedAs = function(e, b) {
const k = this.flg || [];
if (null != b) return e === k[b] || 0;
for (b = k.length; 0 !== b--; ) if (k[b] === e) return !0;
return !1;
};
t.fuzzy = function(e, b) {
const k = this.flaggedAs(4, e);
null != b && this.flag(b ? 4 : 0, e);
return k;
};
t.source = function(e, b) {
if (null == e) return this.src[b || 0] || "";
this.src[b || 0] = e;
return this;
};
t.plural = function(e, b) {
if (null == e) return this.src[b || 1] || "";
this.src[b || 1] = e || "";
return this;
};
t.sourceForms = function() {
return this.srcF;
};
t.targetForms = function() {
return this.msgF;
};
t.each = function(e) {
const b = this.src, k = this.msg, g = Math.max(b.length, k.length);
let l = -1;
for (;++l < g; ) e(l, b[l], k[l]);
return this;
};
t.eachSrc = function(e) {
u(this.src, e);
return this;
};
t.eachMsg = function(e) {
u(this.msg, e);
return this;
};
t.count = function() {
return Math.max(this.src.length, this.msg.length);
};
t.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
t.translate = function(e, b) {
this.msg[b || 0] = e || "";
return this;
};
t.untranslate = function(e) {
if (null != e) this.msg[e] = ""; else {
const b = this.msg, k = b.length;
for (e = 0; e < k; e++) b[e] = "";
}
return this;
};
t.translation = function(e) {
return this.msg[e || 0] || "";
};
t.errors = function(e) {
return this.err && this.err[e || 0] || [];
};
t.valid = function() {
return null == this.err;
};
t.translated = function(e) {
if (null != e) return !!this.msg[e];
const b = this.msg, k = b.length;
for (e = 0; e < k; e++) if (!b[e]) return !1;
return !0;
};
t.untranslated = function(e) {
if (null != e) return !this.msg[e];
const b = this.msg, k = b.length;
for (e = 0; e < k; e++) if (b[e]) return !1;
return !0;
};
t.comment = function(e) {
return y(this, "cmt", e);
};
t.notes = function(e) {
return y(this, "xcmt", e);
};
t.refs = function(e) {
return y(this, "rf", e);
};
t.format = function(e) {
return y(this, "fmt", e);
};
t.context = function(e) {
return y(this, "ctx", e);
};
t.tags = function() {
return this.tg;
};
t.getMax = function(e) {
return (this.mx || [ 0 ])[e] || 0;
};
t.toString = t.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
t.weight = function() {
let e = 0;
this.translation() || (e += 2);
this.fuzzy() && (e += 1);
return e;
};
t.equals = function(e) {
return this === e || this.hash() === e.hash();
};
t.hash = function() {
return this.id;
};
t.normalize = function() {
let e = -1, b = this.msg.length;
for (;++e < b; ) this.msg[e] = this.src[Math.min(e, 1)] || "";
};
t.disabled = function(e) {
return !!(this.lck || [])[e || 0];
};
t.disable = function(e) {
(this.lck || (this.lck = []))[e || 0] = !0;
return this;
};
t.saved = function(e) {
const b = this.drt;
if (null == b) return !0;
if (null != e) return !b[e];
for (e = b.length; 0 !== e--; ) if (b[e]) return !1;
return !0;
};
t.unsave = function(e) {
(this.drt || (this.drt = []))[e || 0] = !0;
return this;
};
t.save = function(e) {
null == e ? this.drt = null : (this.drt || (this.drt = []))[e] = !1;
return this;
};
t.is = function(e) {
return e && (e === this || e.idx === this.idx);
};
t.isHTML = function(e) {
if (null == e) return this.htm || !1;
this.htm = e;
};
t = null;
return w;
}({}, K, M));
D.register("f", function(w, t, E) {
function y(g) {
return {
"Project-Id-Version": "PACKAGE VERSION",
"Report-Msgid-Bugs-To": "",
"POT-Creation-Date": g || "",
"PO-Revision-Date": g || "",
"Last-Translator": "",
"Language-Team": "",
Language: "",
"Plural-Forms": "",
"MIME-Version": "1.0",
"Content-Type": "text/plain; charset=UTF-8",
"Content-Transfer-Encoding": "8bit"
};
}
function p(g, l) {
g = g || "";
l && (g += "\0" + l);
return g;
}
function u(g) {
const l = t.console;
l && l.error && l.error(g.message || String(g));
}
function e(g) {
return D.require("20").create(g);
}
function b(g) {
this.locale(g);
this.clear();
this.head = y(this.now());
}
function k(g, l) {
this.src = [ g || "" ];
this.msg = [ l || "" ];
}
w.create = function(g) {
return new b(g);
};
E = D.require("21").extend(b);
E.clear = function() {
this.rows = D.require("1f").init();
this.length = 0;
return this;
};
E.now = function() {
function g(f, a) {
for (f = String(f); f.length < a; ) f = "0" + f;
return f;
}
var l = new Date();
const m = l.getUTCFullYear(), r = l.getUTCMonth() + 1, x = l.getUTCDate(), q = l.getUTCHours();
l = l.getUTCMinutes();
return g(m, 4) + "-" + g(r, 2) + "-" + g(x, 2) + " " + g(q, 2) + ":" + g(l, 2) + "+0000";
};
E.header = function(g, l) {
const m = this.head || (this.head = {});
if (null == l) return this.headers()[g] || "";
m[g] = l || "";
return this;
};
E.headers = function(g) {
const l = this.now(), m = this.head || (this.head = y(l));
if (null != g) {
for (x in g) m[x] = g[x];
return this;
}
const r = this.locale();
g = {};
for (x in m) g[x] = String(m[x]);
if (r) {
g.Language = String(r) || "zxx";
g["Language-Team"] = r.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (r.nplurals || "2") + "; plural=" + (r.pluraleq || "n!=1") + ";";
var x = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", x = "POT-Creation-Date";
g[x] || (g[x] = l);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
E.get = function(g, l) {
g = p(g, l);
return this.rows.get(g);
};
E.add = function(g, l) {
g instanceof k || (g = new k(g));
l && g.context(l);
l = g.hash();
this.rows.get(l) ? u("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(l, g), 
this.length = this.rows.length);
return g;
};
E.load = function(g) {
let l = -1, m, r;
var x;
let q, f, a, c = (x = this.locale()) && x.nplurals || 2, d = [];
for (;++l < g.length; ) m = g[l], null == m.parent ? (r = m.source || m.id, x = m.target || "", 
q = m.context, r || q ? (f = new k(r, x), f._id = m._id, q && f.context(q), m.flag && f.flag(m.flag, 0), 
m.comment && f.comment(m.comment), m.notes && f.notes(m.notes), m.refs && f.refs(m.refs), 
f.format(m.format), m.message = f, this.add(f), m.prev && m.prev[0] && (f.prev(m.prev[0].source, m.prev[0].context), 
m.prev[1] && f._src.push(m.prev[1].source || ""))) : 0 === l && "object" === typeof x && (this.head = x, 
this.headcmt = m.comment)) : d.push(m);
for (l = -1; ++l < d.length; ) try {
m = d[l];
r = m.source || m.id;
f = g[m.parent] && g[m.parent].message;
if (!f) throw Error("parent missing for plural " + r);
a = m.plural;
1 === a && f.plural(r);
a >= c || (m.flag && f.flag(m.flag, a), f.translate(m.target || "", a), m.format && !f.format() && f.format(m.format));
} catch (h) {
u(h);
}
return this;
};
E.wrap = function(g) {
this.fmtr = e(g);
return this;
};
E.toString = function() {
var g, l = this.locale(), m = [], r = [], x = this.headers(), q = !l, f = l && l.nplurals || 2, a = this.fmtr || e();
x[l ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in x) r.push(g + ": " + x[g]);
r = new k("", r.join("\n"));
r.comment(this.headcmt || "");
q && r.fuzzy(0, !0);
m.push(r.toString());
m.push("");
this.rows.each(function(c, d) {
c && (m.push(d.cat(a, q, f)), m.push(""));
});
return m.join("\n");
};
E = D.require("22").extend(k);
E.msgid = function() {
return this.src[0];
};
E.msgidPlural = function() {
return this.src[1] || "";
};
E.prev = function(g, l) {
this._src = [ g || "" ];
this._ctx = l;
};
E.hash = function() {
return p(this.source(), this.context());
};
E.toString = function() {
return this.cat(e());
};
E.cat = function(g, l, m) {
var r = [], x;
(x = this.cmt) && r.push(g.prefix(x, "# "));
(x = this.xcmt) && r.push(g.prefix(x, "#. "));
var q = this.rf;
if (x = this._id) q += (q ? " " : "") + "loco:" + x;
q && /\S/.test(q) && r.push(g.refs(q));
!l && this.fuzzy() && r.push("#, fuzzy");
(x = this.fmt) && r.push("#, " + x + "-format");
(x = this._ctx) && r.push(g.prefix(g.pair("msgctxt", x), "#| "));
if (x = this._src) x[0] && r.push(g.prefix(g.pair("msgid", x[0]), "#| ")), x[1] && r.push(g.prefix(g.pair("msgid_plural", x[1]), "#| "));
(x = this.ctx) && r.push(g.pair("msgctxt", x));
r.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) r.push(g.pair("msgstr", l ? "" : this.msg[0])); else for (q = -1, 
r.push(g.pair("msgid_plural", this.src[1])), x = this.msg || [ "", "" ], m = m || x.length; ++q < m; ) r.push(g.pair("msgstr[" + q + "]", l ? "" : x[q] || ""));
return r.join("\n");
};
E.compare = function(g, l) {
let m = this.weight(), r = g.weight();
if (m > r) return 1;
if (m < r) return -1;
if (l) {
m = this.hash().toLowerCase();
r = g.hash().toLowerCase();
if (m < r) return 1;
if (m > r) return -1;
}
return 0;
};
E.copy = function() {
let g = new k(), l, m;
for (l in this) this.hasOwnProperty(l) && ((m = this[l]) && m.concat && (m = m.concat()), 
g[l] = m);
return g;
};
return w;
}({}, K, M));
D.register("11", function(w, t, E) {
w.init = function(y, p) {
function u() {
return g || (g = A('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function e(l, m, r) {
l = A("<p></p>").text(r);
u().dialog("close").html("").dialog("option", "title", "Error").append(l).dialog("open");
}
function b(l) {
const m = l && l.code;
if (m) {
for (var r = m.length, x = A("<ol></ol>").attr("class", l.type), q = -1; ++q < r; ) A("<li></li>").html(m[q]).appendTo(x);
0 !== l.line && x.find("li").eq(l.line - 1).attr("class", "highlighted");
u().dialog("close").html("").dialog("option", "title", l.path + ":" + l.line).append(x).dialog("open");
}
}
function k(l) {
l = l.target;
const m = A(l).find("li.highlighted")[0];
l.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(l.clientHeight / 2));
}
let g;
return {
load: function(l) {
u().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", k);
l = A.extend({
ref: l,
path: p.popath
}, p.project || {});
y.ajax.post("fsReference", l, b, e);
}
};
};
return w;
}({}, K, M));
D.register("12", function(w, t, E) {
function y() {
this.inf = {};
}
function p() {
const b = E.createElement("p"), k = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let l, m;
return {
sniff: function(r) {
if (r === l) return m;
l = r;
if (k.test(r) || g.test(r)) if (b.innerHTML = r, b.textContent !== r) return m = !0;
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
const k = (t.loco || {}).notices;
k && k.error && k.error(String(this) + ": " + String(b));
};
u.xhrError = function(b, k, g) {
try {
const l = b.responseText, m = l && t.JSON.parse(l);
g = m && this.parseError(m) || g;
} catch (l) {}
return g || this.httpError(b);
};
u.httpError = function(b) {
return (b = b && b.status) && 200 !== b ? "Responded status " + b : "Unknown error";
};
u.parseError = function(b) {
return b && b.error || "";
};
u.mapLang = function(b, k) {
const g = String(b).replace("_", "-").toLowerCase();
var l = b.lang;
k = k[g] || k[l] || [];
b = k.length;
if (0 === b) return l;
if (1 < b) for (l = -1; ++l < b; ) {
const m = k[l];
if (m === g) return m;
}
return k[0];
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
u.translate = function(b, k, g) {
return this.batch([ b ], k, this.isHtml(b.source), g);
};
u.unwind = function(b, k) {
const g = [], l = b.length;
for (let m = 0; m < l; m++) g.push(b[m][k]);
return g;
};
u.contextualize = function(b) {
return [ b.context || "", b.notes || "" ].join("\n").trim();
};
u.verify = function(b) {
return this.translate({
source: "OK"
}, {
lang: "fr",
toString: function() {
return "fr";
}
}, function(k, g) {
b(!!g);
});
};
u.hash = function() {
return this.key();
};
u._call = function(b) {
const k = this;
k.state = null;
b.cache = !0;
b.dataType = "json";
b.error = function(g, l, m) {
k.stderr(k.xhrError(g, l, m));
};
return k.abortable(A.ajax(b));
};
u.abortable = function(b) {
const k = this;
b.always(function() {
k.$r === b && (k.$r = null);
});
return k.$r = b;
};
u.abort = function() {
const b = this.$r;
b && b.abort();
};
u.isHtml = function(b) {
return (e || (e = p())).sniff(b);
};
let e;
return w;
}({}, K, M));
D.register("13", function(w, t, E) {
function y(p) {
this.api = p;
this.chars = 0;
}
w.create = function(p) {
return new y(p);
};
t = y.prototype;
t.init = function(p, u) {
function e(c) {
let d = {
id: k.length,
length: 0,
html: c.html,
items: []
};
k.push(d);
return l[c.html ? 1 : 0] = d;
}
function b(c, d, h) {
var n = c.source(null, h);
if (n && (c.untranslated(h) || u)) {
{
h = c.notes();
const z = c.context();
c = n.length;
var v = g.isHtml(n);
n = {
source: n,
context: z,
notes: h
};
h = l[v ? 1 : 0];
v = h.items;
if (f && c > f) x++, c = void 0; else {
if (h.length + c > q || 50 === v.length) h = e(h), v = h.items;
v.push(n);
h.length += c;
m += c;
r += 1;
c = n;
}
}
c && (c.id = d);
}
}
const k = [], g = this.api;
let l = [], m = 0, r = 0, x = 0, q = 1e4, f = g.maxChr();
f && (q = Math.min(q, f));
e({
html: !1
});
e({
html: !0
});
const a = p.locale();
p.each(1 < a.nplurals ? function(c, d, h) {
b(d, h, 0);
b(d, h, 1);
} : function(c, d, h) {
b(d, h, 0);
});
l = [];
this.chars = m;
this.length = r;
this.batches = k;
this.locale = a;
x && g.stderr("Strings over " + q + " characters long will be skipped");
};
t.abort = function() {
this.state = "abort";
return this;
};
t.dispatch = function(p) {
function u(C, B) {
if (!b()) return !1;
if (!B) return !0;
c++;
const F = p.row(C.id), G = C.source;
let H = 0;
F.each(function(J, O, R) {
B !== R && (G === O || 1 < J && F.source(null, 1) === G) && (F.translate(B, J), 
H++, h++);
});
H && r("each", [ F ]);
}
function e(C) {
return function(B, F) {
u(C[B], F);
return !0;
};
}
function b() {
return "abort" === x.state ? (q && (q.abort(), m()), !1) : !0;
}
function k() {
const C = f.shift();
if (C) {
const B = C.items;
B && B.length ? q.batch(B, a, C.html, e(B)).fail(g).always(l) : l();
} else m();
}
function g() {
x.abort();
m();
}
function l() {
d++;
r("prog", [ d, v ]);
b() && k();
}
function m() {
q = f = null;
r("done");
}
function r(C, B) {
C = z[C] || [];
let F = C.length;
for (;0 <= --F; ) C[F].apply(null, B);
}
let x = this, q = x.api, f = x.batches || [], a = x.locale, c = 0, d = 0, h = 0, n = x.length, v = f.length, z = {
done: [],
each: [],
prog: []
};
x.state = "";
k();
return {
done: function(C) {
z.done.push(C);
return this;
},
each: function(C) {
z.each.push(C);
return this;
},
prog: function(C) {
z.prog.push(C);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(n - c, 0);
},
did: function() {
return c;
}
};
}
};
};
return w;
}({}, K, M));
D.register("14", function(w, t, E) {
function y() {}
w.create = function(p) {
(y.prototype = new p()).batch = function(u, e, b, k) {
function g(x) {
let q = -1;
for (;++q < m && !1 !== k(q, x[q], e); );
}
const l = t.loco, m = u.length;
u = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(e),
source: this.getSrc(),
sources: u
};
const r = A.Deferred();
this.abortable(l.ajax.post("apis", u, function(x) {
g(x && x.targets || []);
r.resolve();
}, function() {
g([]);
r.reject();
}));
return r.promise();
};
return new y();
};
return w;
}({}, K, M));
D.register("24", {
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
D.register("15", function(w, t, E) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "Google Translate";
};
p.parseError = function(u) {
if (u.error) {
const e = [], b = u.error.errors || [], k = b.length;
let g = -1;
for (;++g < k; ) e.push(b[g].message || "");
return "Error " + u.error.code + ": " + e.join(";");
}
return "";
};
p.getLangMap = function() {
return D.require("24");
};
p.batch = function(u, e, b, k) {
function g(q) {
const f = x.length;
let a = -1;
for (;++a < f && !1 !== k(a, (q[a] || {}).translatedText || "", e); );
}
const l = this, m = l.getSrc();
b = b ? "html" : "text";
const r = l.mapLang(e, l.getLangMap()), x = this.unwind(u, "source");
return l._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + r + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: l.key(),
q: x
}
}).done(function(q, f, a) {
q.data ? g(q.data.translations || []) : (l.stderr(l.parseError(q) || l.httpError(a)), 
g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return w;
}({}, K, M));
D.register("25", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
D.register("16", function(w, t, E) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.parseError = function(u) {
var e = u.details || {};
let b = e.message;
e = e.texts;
return b ? (e && e !== b && (b += "; " + e), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (u.status || "0") + ": " + b) : "";
};
p.maxChr = function() {
return 1e3;
};
p.getLangMap = function() {
return D.require("25");
};
p.batch = function(u, e, b, k) {
function g(q) {
const f = x.length;
let a = -1, c = (q[0] || {
translated: []
}).translated || [];
for (;++a < f && (q = c[a] || "", !1 !== k(a, q, e)); );
}
const l = this;
b = this.getSrc();
const m = l.param("api") || "https://api.lecto.ai", r = l.mapLang(e, l.getLangMap()), x = this.unwind(u, "source");
return l._call({
url: l.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ r ],
from: b,
texts: x
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": l.key(),
Accept: "application/json"
}
}).done(function(q, f, a) {
q ? g(q.translations || []) : (l.stderr(l.parseError(q) || l.httpError(a)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return w;
}({}, K, M));
D.register("26", {
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
D.register("17", function(w, t, E) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "Microsoft Translator text API";
};
p.parseError = function(u) {
return u && u.error ? u.error.message : "";
};
p.maxChr = function() {
return 1e4;
};
p.getLangMap = function() {
return D.require("26");
};
p.region = function() {
return this.param("region") || "global";
};
p.hash = function() {
return this.key() + this.region();
};
p.batch = function(u, e, b, k) {
function g(a) {
let c = -1;
for (var d; ++c < x && (d = a[c] || {}, d = d.translations || [], d = d[0] || {}, 
!1 !== k(c, d.text || "", e)); );
}
let l = this, m = [], r = l.getSrc();
u = this.unwind(u, "source");
let x = u.length, q = -1;
b = b ? "html" : "plain";
let f = l.mapLang(e, l.getLangMap());
for (;++q < x; ) m.push({
Text: u[q]
});
return l._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + r + "&to=" + f + "&textType=" + b,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": l.region()
}
}).done(function(a, c, d) {
a && a.length ? g(a) : (l.stderr(l.parseError(a) || l.httpError(d)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return w;
}({}, K, M));
D.register("18", function(w, t, E) {
w.init = function(y) {
function p() {
O || (B.on("click", m), O = A('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && A("#ssh-keys").toggleClass("hidden", "ssh" !== A(this).val());
}));
return O;
}
function u() {
G && (e(A(a)), G = !1);
if (h && J) {
var I = J, Q = A(F);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (e(A(F)), H = !1);
}
function e(I) {
I.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function b() {
if (h) return O && O.dialog("close"), u(), A(y).find('button[type="submit"]').attr("disabled", !1), 
A(t).triggerHandler("resize"), f && f(!0), !0;
v && O ? (G || (A(a).removeClass("jshide").hide().fadeIn(500), G = !0), H && (e(A(F)), 
H = !1)) : u();
A(y).find('input[type="submit"]').attr("disabled", !0);
f && f(!1);
return !1;
}
function k(I) {
var Q, X = R || {};
for (Q in X) if (X.hasOwnProperty(Q)) {
var Z = X[Q];
I[Q] ? I[Q].value = Z : A('<input type="hidden" />').attr("name", Q).appendTo(I).val(Z);
}
}
function g(I) {
I.preventDefault();
I = A(I.target).serializeArray();
q(I);
d = !0;
return !1;
}
function l(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function m(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function r(I) {
h = I.authed;
c = I.method;
A(a).find("span.loco-msg").text(I.message || "Something went wrong.");
J = I.warning || "";
I.notice && n.notices.info(I.notice);
if (h) "direct" !== c && (R = I.creds, k(y), d && I.success && n.notices.success(I.success)), 
b(); else if (I.reason) n.notices.info(I.reason); else if (I = I.prompt) {
var Q = p();
Q.html(I).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", l);
Q.find('input[type="submit"]').addClass("button-primary");
b();
A(t).triggerHandler("resize");
} else n.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function x() {
b();
}
function q(I) {
d = !1;
n.ajax.setNonce("fsConnect", C).post("fsConnect", I, r, x);
return I;
}
var f, a = y, c = null, d = !1, h = !1, n = t.loco, v = y.path.value, z = y.auth.value, C = y["loco-nonce"].value, B = A(a).find("button.button-primary"), F = E.getElementById(a.id + "-warn"), G = !1, H = !1, J = "", O;
n.notices.convert(F).stick();
if (y.connection_type) {
var R = {};
R.connection_type = y.connection_type.value;
h = !0;
} else v && z && q({
path: v,
auth: z
});
b();
return {
applyCreds: function(I) {
if (I.nodeType) k(I); else {
var Q, X = R || {};
for (Q in X) X.hasOwnProperty(Q) && (I[Q] = X[Q]);
}
return this;
},
setForm: function(I) {
y = I;
b();
k(I);
return this;
},
connect: function() {
v = y.path.value;
z = y.auth.value;
q(A(y).serializeArray());
return this;
},
listen: function(I) {
f = I;
h && I(!0);
return this;
},
authed: function() {
return h;
}
};
};
return w;
}({}, K, M));
D.register("27", function(w, t, E) {
function y(b, k) {
return function(g) {
b.apply(g, k);
return g;
};
}
function p(b) {
return function(k, g) {
k = k && k[b] || 0;
g = g && g[b] || 0;
return k === g ? 0 : k > g ? 1 : -1;
};
}
function u(b) {
return function(k, g) {
return (k && k[b] || "").localeCompare(g && g[b] || "");
};
}
function e(b) {
return function(k, g) {
return -1 * b(k, g);
};
}
w.sort = function(b, k, g, l) {
k = "n" === g ? p(k) : u(k);
l && (k = e(k));
return y([].sort, [ k ])(b);
};
return w;
}({}, K, M));
D.register("19", function(w, t, E) {
w.init = function(y) {
function p(a) {
let c = -1;
const d = a.length;
for (A("tr", r).remove(); ++c < d; ) r.appendChild(a[c].$);
}
function u(a) {
g = a ? q.find(a, e) : e.slice(0);
m && (a = b[m], g = f(g, m, a.type, a.desc));
p(g);
}
let e = [], b = [], k = 0, g, l, m, r = y.getElementsByTagName("tbody")[0];
var x = y.getElementsByTagName("thead")[0];
let q = D.require("a").init(), f = D.require("27").sort;
x && r && (A("th", x).each(function(a, c) {
const d = c.getAttribute("data-sort-type");
d && (a = k, A(c).addClass("loco-sort").on("click", function(h) {
h.preventDefault();
{
h = a;
let n = b[h], v = n.type, z = !(n.desc = !n.desc);
g = f(g || e.slice(0), h, v, z);
p(g);
l && l.removeClass("loco-desc loco-asc");
l = A(n.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
m = h;
}
return !1;
}), b[k] = {
$: c,
type: d
});
c.hasAttribute("colspan") ? k += Number(c.getAttribute("colspan")) : k++;
}), A("tr", r).each(function(a, c) {
let d, h = [], n = {
_: a,
$: c
}, v = c.getElementsByTagName("td");
for (d in b) {
const z = v[d];
(c = z.textContent.replace(/(^\s+|\s+$)/g, "")) && h.push(c);
z.hasAttribute("data-sort-value") && (c = z.getAttribute("data-sort-value"));
switch (b[d].type) {
case "n":
c = Number(c);
}
n[d] = c;
}
e[a] = n;
q.index(a, h);
}), y = A('form.loco-filter input[type="text"]', y.parentNode), y.length && (y = y[0], 
x = A(y.form), 1 < e.length ? D.require("b").listen(y, u) : x.hide(), x.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return w;
}({}, K, M));
const T = K.loco || {}, ja = T.conf || {
$v: []
};
K = D.require("1").init();
M = ja.wplang;
T.version = function(w) {
return ja.$v[w || 0] || "0";
};
D.require("2");
D.require("3");
D.require("4");
D.require("5");
T.l10n = K;
K.load(ja.wpl10n);
M && K.pluraleq(M.pluraleq);
T.string = D.require("6");
T.notices = D.require("7").init(K);
T.ajax = D.require("8").init(ja).localise(K);
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
A("#loco-admin.wrap table.wp-list-table").each(function(w, t) {
D.require("19").init(t);
});
T.validate = function(w) {
w = (w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "")) && w[0];
if ("2.8.1" === w) return !0;
T.notices.warn("admin.js is the wrong version (" + w + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
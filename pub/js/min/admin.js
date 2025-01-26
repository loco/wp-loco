"use strict";

(function(I, L, A, la) {
const C = function() {
function v(D) {
throw Error("Failed to require " + D);
}
const t = {};
return {
register: function(D, y) {
t[D] = y;
},
require: function(D, y) {
return t[D] || v(y);
},
include: function(D, y, p) {
return t[D] || (p ? v(y) : null);
}
};
}();
C.register("$1", function(v, t, D) {
function y(p) {
const u = typeof p;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(p)) console.error("Invalid plural: " + p); else return new Function("n", "return " + p);
"function" !== u && (p = function(c) {
return 1 != c;
});
return p;
}
v.init = function(p) {
function u(h, n, r) {
return (h = g[h]) && h[r] ? h[r] : n || "";
}
function c(h) {
return u(h, h, 0);
}
function b(h, n) {
return u(n + "" + h, h, 0);
}
function k(h, n, r) {
r = Number(p(r));
isNaN(r) && (r = 0);
return u(h, r ? n : h, r);
}
p = y(p);
let g = {};
return {
__: c,
_x: b,
_n: k,
_: c,
x: b,
n: k,
load: function(h) {
g = h || {};
return this;
},
pluraleq: function(h) {
p = y(h);
return this;
}
};
};
return v;
}({}, I, L));
C.register("$2", function(v, t, D) {
v.ie = function() {
return !1;
};
v.init = function() {
return v;
};
return v;
}({}, I, L));
C.register("$3", function(v, t, D) {
Number.prototype.format = function(y, p, u) {
var c = Math.pow(10, y || 0);
y = [];
c = String(Math.round(c * this) / c);
var b = c.split(".");
c = b[0];
b = b[1];
let k = c.length;
do {
y.unshift(c.substring(k - 3, k));
} while (0 < (k -= 3));
c = y.join(u || ",");
if (b) {
{
u = b;
y = u.length;
let g;
for (;"0" === u.charAt(--y); ) g = y;
g && (u = u.substring(0, g));
b = u;
}
b && (c += (p || ".") + b);
}
return c;
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
return v;
}({}, I, L));
C.register("$4", function(v, t, D) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var p = Object(this), u = p.length >>> 0;
if (0 === u) return -1;
var c = 0;
1 < arguments.length && (c = Number(arguments[1]), c != c ? c = 0 : 0 != c && Infinity != c && -Infinity != c && (c = (0 < c || -1) * Math.floor(Math.abs(c))));
if (c >= u) return -1;
for (c = 0 <= c ? c : Math.max(u - Math.abs(c), 0); c < u; c++) if (c in p && p[c] === y) return c;
return -1;
});
return v;
}({}, I, L));
C.register("$5", function(v, t, D) {
D = t.JSON;
D || (D = {
parse: A.parseJSON,
stringify: null
}, t.JSON = D);
v.parse = D.parse;
v.stringify = D.stringify;
return v;
}({}, I, L));
C.register("$6", function(v, t, D) {
v.trim = function(y, p) {
for (p || (p = " \n"); y && -1 !== p.indexOf(y.charAt(0)); ) y = y.substring(1);
for (;y && -1 !== p.indexOf(y.slice(-1)); ) y = y.substring(0, y.length - 1);
return y;
};
v.sprintf = function(y) {
return v.vsprintf(y, [].slice.call(arguments, 1));
};
v.vsprintf = function(y, p) {
let u = 0;
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(c, b, k) {
if ("%" === k) return "%";
c = b ? p[Number(b) - 1] : p[u++];
return null != c ? String(c) : "s" === k ? "" : "0";
});
};
return v;
}({}, I, L));
C.register("$27", function(v, t, D) {
function y(p) {
return function(u, c) {
let b = u[p] || 0;
for (;(u = u.offsetParent) && u !== (c || D.body); ) b += u[p] || 0;
return b;
};
}
v.top = y("offsetTop");
v.left = y("offsetLeft");
v.el = function(p, u) {
p = D.createElement(p || "div");
u && (p.className = u);
return p;
};
v.txt = function(p) {
return D.createTextNode(p || "");
};
v.rect = function(p) {
return p.getBoundingClientRect();
};
return v;
}({}, I, L));
C.register("$7", function(v, t, D) {
function y(f, e, l) {
function q() {
x();
B = setTimeout(e, l);
}
function x() {
B && clearTimeout(B);
B = 0;
}
let B = 0;
q();
A(f).on("mouseenter", x).on("mouseleave", q);
return {
die: function() {
x();
A(f).off("mouseenter mouseleave");
}
};
}
function p(f, e) {
f.fadeTo(e, 0, function() {
f.slideUp(e, function() {
f.remove();
A(t).triggerHandler("resize");
});
});
return f;
}
function u(f, e) {
function l(H) {
r[z] = null;
p(A(f), 250);
B && B.die();
var G;
if (G = H) H.stopPropagation(), H.preventDefault(), G = !1;
return G;
}
function q(H) {
B && B.die();
return B = y(f, l, H);
}
const x = A(f);
let B, z, E, F = x.find("button");
0 === F.length && (x.addClass("is-dismissible"), F = A('<button type="button" class="notice-dismiss"> </a>').appendTo(x));
F.off("click").on("click", l);
A(t).triggerHandler("resize");
n();
z = r.length;
r.push(l);
e && (B = q(e));
return {
link: function(H, G) {
var M = G || H;
G = A(f).find("nav");
H = A("<nav></nav>").append(A("<a></a>").attr("href", H).text(M));
E ? (E.push(H.html()), G.html(E.join("<span> | </span>"))) : (E = [ H.html() ], 
A(f).addClass("has-nav").append(H));
return this;
},
stick: function() {
B && B.die();
B = null;
r[z] = null;
return this;
},
slow: function(H) {
q(H || 1e4);
return this;
}
};
}
function c(f, e, l) {
const q = C.require("$27", "dom.js").el;
f = A('<div class="notice notice-' + f + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const x = A(q("p"));
l = A(q("span")).text(l);
e = A(q("strong", "has-icon")).text(e + ": ");
x.append(e).append(l).appendTo(f);
return f;
}
function b(f, e, l, q) {
f = c(l, e, f).css("opacity", "0").fadeTo(500, 1);
A(t).triggerHandler("resize");
return u(f, q);
}
function k(f) {
return b(f, m, "warning");
}
function g() {
A("#loco-notices").find("div.notice").each(function(f, e) {
-1 === e.className.indexOf("jshide") && (f = -1 === e.className.indexOf("notice-success") ? null : 5e3, 
u(e, f));
});
}
const h = t.console || {
log: function() {}
}, n = Date.now || function() {
return new Date().getTime();
};
let r = [], w, m, a, d;
v.error = function(f) {
return b(f, w, "error");
};
v.warn = k;
v.info = function(f) {
return b(f, a, "info");
};
v.success = function(f) {
return b(f, d, "success", 5e3);
};
v.warning = k;
v.log = function() {
h.log.apply(h, arguments);
};
v.debug = function() {
(h.debug || h.log).apply(h, arguments);
};
v.clear = function() {
let f = -1;
const e = r, l = e.length;
for (;++f < l; ) {
const q = e[f];
q && q.call && q();
}
r = [];
return v;
};
v.create = c;
v.raise = function(f) {
(v[f.type] || v.error).call(v, f.message);
};
v.convert = u;
v.init = function(f) {
w = f._("Error");
m = f._("Warning");
a = f._("Notice");
d = f._("OK");
setTimeout(g, 1e3);
return v;
};
return v;
}({}, I, L));
C.register("$8", function(v, t, D) {
function y(m) {
let a = A("<pre>" + m + "</pre>").text();
a && (a = a.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
a || (a = m) || (a = "Blank response from server");
return a;
}
function p(m) {
return (m = m.split(/[\r\n]/)[0]) ? (m = m.replace(/ +in +\S+ on line \d+/, ""), 
m = m.replace(/^[()! ]+Fatal error:\s*/, "")) : r._("Server returned invalid data");
}
function u(m) {
t.console && console.error && console.error('No nonce for "' + m + '"');
return "";
}
function c(m, a, d) {
m[a] = d;
}
function b(m, a, d) {
m.push({
name: a,
value: d
});
}
function k(m, a, d) {
m.append(a, d);
}
function g(m, a, d, f) {
function e(q, x, B) {
if ("abort" !== x) {
var z = r || {
_: function(O) {
return O;
}
}, E = q.status || 0, F = q.responseText || "", H = y(F), G = q.getResponseHeader("Content-Type") || "Unknown type", M = q.getResponseHeader("Content-Length") || F.length;
"success" === x && B ? l.error(B) : (l.error(p(H) + ".\n" + z._("Check console output for debugging information")), 
l.log("Ajax failure for " + m, {
status: E,
error: x,
message: B,
output: F
}), "parsererror" === x && (B = "Response not JSON"), l.log([ z._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (B || z._("Unknown error")) + '" (' + G + " " + M + " bytes)", H, "====" ].join("\n")));
d && d.call && d(q, x, B);
w = q;
}
}
f.url = h;
f.dataType = "json";
const l = C.require("$7", "notices.js").clear();
w = null;
return A.ajax(f).fail(e).done(function(q, x, B) {
const z = q && q.data, E = q && q.notices, F = E && E.length;
!z || q.error ? e(B, x, q && q.error && q.error.message) : a && a(z, x, B);
for (q = -1; ++q < F; ) l.raise(E[q]);
});
}
const h = t.ajaxurl || "/wp-admin/admin-ajax.php";
let n = {}, r, w;
v.init = function(m) {
n = m.nonces || n;
return v;
};
v.localise = function(m) {
r = m;
return v;
};
v.xhr = function() {
return w;
};
v.strip = y;
v.parse = p;
v.submit = function(m, a, d) {
function f(B, z) {
z.disabled ? z.setAttribute("data-was-disabled", "true") : z.disabled = !0;
}
function e(B, z) {
z.getAttribute("data-was-disabled") || (z.disabled = !1);
}
function l(B) {
B.find(".button-primary").removeClass("loading");
B.find("button").each(e);
B.find("input").each(e);
B.find("select").each(e);
B.find("textarea").each(e);
B.removeClass("disabled loading");
}
const q = A(m), x = q.serialize();
(function(B) {
B.find(".button-primary").addClass("loading");
B.find("button").each(f);
B.find("input").each(f);
B.find("select").each(f);
B.find("textarea").each(f);
B.addClass("disabled loading");
})(q);
return g(m.route.value, function(B, z, E) {
l(q);
a && a(B, z, E);
}, function(B, z, E) {
l(q);
d && d(B, z, E);
}, {
type: m.method,
data: x
});
};
v.post = function(m, a, d, f) {
let e = !0, l = a || {}, q = n[m] || u(m);
t.FormData && l instanceof FormData ? (e = !1, a = k) : a = Array.isArray(l) ? b : c;
a(l, "action", "loco_json");
a(l, "route", m);
a(l, "loco-nonce", q);
return g(m, d, f, {
type: "post",
data: l,
processData: e,
contentType: e ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
v.get = function(m, a, d, f) {
a = a || {};
const e = n[m] || u(m);
a.action = "loco_json";
a.route = m;
a["loco-nonce"] = e;
return g(m, d, f, {
type: "get",
data: a
});
};
v.setNonce = function(m, a) {
n[m] = a;
return v;
};
return v;
}({}, I, L));
C.register("$28", {
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
C.register("$9", function(v, t, D) {
function y() {}
const p = C.require("$28", "rtl.json");
let u;
v.init = function() {
return new y();
};
v.cast = function(c) {
return c instanceof y ? c : "string" === typeof c ? v.parse(c) : v.clone(c);
};
v.clone = function(c) {
const b = new y();
for (const k in c) b[k] = c[k];
return b;
};
v.parse = function(c) {
c = (u || (u = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(c);
if (!c) return null;
const b = new y();
b.lang = c[1].toLowerCase();
b.region = (c[2] || "").toUpperCase();
b.variant = (c[3] || "").toLowerCase();
return b;
};
t = y.prototype;
t.isValid = function() {
return !!this.lang;
};
t.isKnown = function() {
const c = this.lang;
return c && "zxx" !== c;
};
t.toString = function(c) {
c = c || "_";
let b = this.lang || "zxx";
this.region && (b += c + this.region);
this.variant && (b += c + this.variant);
return b;
};
t.getIcon = function() {
let c = 3, b = [];
const k = [ "variant", "region", "lang" ];
for (;0 !== c--; ) {
const g = k[c], h = this[g];
h && (b.push(g), b.push(g + "-" + h.toLowerCase()));
}
return b.join(" ");
};
t.isRTL = function() {
return !!p[String(this.lang).toLowerCase()];
};
t = null;
return v;
}({}, I, L));
C.register("$29", {
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
C.register("$10", function(v, t, D) {
v.init = function() {
function y(a) {
return r[a] || a;
}
function p(a, d, f) {
let e, l, q = String(a || "").toLowerCase().replace(n, y).split(w), x = q.length;
for (;0 !== x--; ) if ((a = q[x]) && null == f[a]) for (d.push(a), f[a] = !0, e = a.split(m), 
l = e.length; 0 !== l--; ) (a = e[l]) && null == f[a] && (d.push(a), f[a] = !0);
return d;
}
function u(a) {
return p(a, [], {});
}
function c(a) {
let d = [], f = {}, e = a.length;
for (;0 !== e--; ) p(a[e], d, f);
return d;
}
function b() {
h = "";
g = [];
}
let k = [], g = [], h = "";
const n = /[^a-z0-9]/g, r = C.require("$29", "flatten.json"), w = /\s+/, m = /[^\d\p{L}]+/u;
return {
split: u,
find: function(a, d) {
{
const f = [], e = [], l = String(a || "").toLowerCase().replace(n, y).split(" "), q = l.length, x = h && a.substring(0, h.length) === h ? g : k, B = x.length, z = !!d;
let E = -1, F = 0;
a: for (;++E < B; ) {
const H = x[E], G = H && H.length;
if (G) {
b: for (let M = 0; M < q; M++) {
const O = l[M];
for (let R = 0; R < G; R++) if (0 === H[R].indexOf(O)) continue b;
continue a;
}
e[E] = H;
f.push(z ? d[E] : E);
} else F++;
}
h = a;
g = e;
a = f;
}
return a;
},
add: function(a, d) {
k[a] = u(d);
h && b();
},
push: function(a) {
k[k.length] = c(a);
h && b();
},
index: function(a, d) {
k[a] = c(d);
h && b();
},
size: function() {
return k.length;
},
clear: function() {
k = [];
h && b();
},
remove: function(a) {
k[a] = null;
h && b();
},
noop: function() {
b();
return [];
}
};
};
return v;
}({}, I, L));
C.register("$11", function(v, t, D) {
v.listen = function(y, p) {
function u() {
m[g ? "show" : "hide"]();
}
function c(a) {
w && r.setAttribute("size", 2 + a.length);
g = a;
u();
return a;
}
function b() {
h = null;
p(g);
}
function k(a) {
let d = r.value;
d !== g ? (h && clearTimeout(h), c(d), a ? h = setTimeout(b, a) : b()) : h && null == a && (clearTimeout(h), 
b());
}
let g, h, n = 150;
const r = y instanceof jQuery ? y[0] : y, w = 1 === Number(r.size), m = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(a) {
a.preventDefault();
r.value = "";
k();
A(r).triggerHandler("blur");
return !1;
});
c(r.value);
A(r).on("input", function() {
k(n);
return !0;
}).on("blur focus change", function() {
k(null);
return !0;
}).after(m);
u();
return {
delay: function(a) {
n = a;
return this;
},
ping: function(a) {
a ? (h && clearTimeout(h), c(r.value), b(), a = void 0) : a = k();
return a;
},
val: function(a) {
if (null == a) return g;
h && clearTimeout(h);
r.value = c(a);
u();
},
el: function() {
return r;
},
blur: function(a) {
return A(r).on("blur", a);
},
destroy: function() {
h && clearTimeout(h);
}
};
};
return v;
}({}, I, L));
C.register("$12", function(v, t, D) {
function y(b, k) {
return "function" == typeof b ? b.call(k) : b;
}
function p(b, k) {
this.$element = A(b);
this.options = k;
this.enabled = !0;
this.fixTitle();
}
v.init = function(b, k) {
let g = {
fade: !0,
offset: 5,
delayIn: u,
delayOut: c,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
k && (g = A.extend({}, g, k));
b.tipsy(g);
};
v.delays = function(b, k) {
u = b || 150;
c = k || 100;
};
v.kill = function() {
A("div.tipsy").remove();
};
v.text = function(b, k) {
k.data("tipsy").setTitle(b);
};
let u, c;
v.delays();
A(D.body).on("overlayOpened overlayClosing", function(b) {
v.kill();
return !0;
});
p.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
var k = this.tip();
k.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
k[0].className = "tipsy";
k.remove().css({
top: 0,
left: 0
}).prependTo(D.body);
b = (b = this.options.anchor) ? this.$element.find(b) : this.$element;
b = A.extend({}, b.offset(), {
width: b[0].offsetWidth,
height: b[0].offsetHeight
});
var g = k[0].offsetWidth, h = k[0].offsetHeight, n = y(this.options.gravity, this.$element[0]);
switch (n.charAt(0)) {
case "n":
var r = {
top: b.top + b.height + this.options.offset,
left: b.left + b.width / 2 - g / 2
};
break;

case "s":
r = {
top: b.top - h - this.options.offset,
left: b.left + b.width / 2 - g / 2
};
break;

case "e":
r = {
top: b.top + b.height / 2 - h / 2,
left: b.left - g - this.options.offset
};
break;

case "w":
r = {
top: b.top + b.height / 2 - h / 2,
left: b.left + b.width + this.options.offset
};
}
2 == n.length && ("w" == n.charAt(1) ? r.left = b.left + b.width / 2 - 15 : r.left = b.left + b.width / 2 - g + 15);
k.css(r).addClass("tipsy-" + n);
k.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + n.charAt(0);
this.options.className && k.addClass(y(this.options.className, this.$element[0]));
k.addClass("in");
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
function k(w) {
var m = A.data(w, "tipsy");
m || (m = new p(w, A.fn.tipsy.elementOptions(w, b)), A.data(w, "tipsy", m));
return m;
}
function g() {
var w = k(this), m = b.delayIn;
w.hoverState = "in";
0 == m ? w.show() : (w.fixTitle(), setTimeout(function() {
"in" == w.hoverState && w.show();
}, m));
}
function h() {
var w = k(this), m = b.delayOut;
w.hoverState = "out";
0 == m ? w.hide() : (w.tip().removeClass("in"), setTimeout(function() {
"out" == w.hoverState && w.hide();
}, m));
}
b = A.extend({}, A.fn.tipsy.defaults, b);
b.live || this.each(function() {
k(this);
});
if ("manual" != b.trigger) {
var n = b.live ? "live" : "bind", r = "hover" == b.trigger ? "mouseleave" : "blur";
this[n]("hover" == b.trigger ? "mouseenter" : "focus", g)[n](r, h);
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
return A(this).offset().top > A(D).scrollTop() + A(t).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(D).scrollLeft() + A(t).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(b, k) {
return function() {
var g = k[0], h = 1 < k.length ? k[1] : !1, n = A(D).scrollTop() + b, r = A(D).scrollLeft() + b, w = A(this);
w.offset().top < n && (g = "n");
w.offset().left < r && (h = "w");
A(t).width() + A(D).scrollLeft() - w.offset().left < b && (h = "e");
A(t).height() + A(D).scrollTop() - w.offset().top < b && (g = "s");
return g + (h ? h : "");
};
};
return v;
}({}, I, L));
C.register("$42", function(v, t, D) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return C.require("$6", "string.js").trim(this, " \n\r\t");
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
v.html = function() {
function y(h) {
return "&#" + h.charCodeAt(0) + ";";
}
function p(h, n) {
return '<a href="' + h + '" target="' + (n.indexOf(k) ? "_blank" : "_top") + '">' + n + "</a>";
}
let u, c, b, k, g = function() {
u = /[<>&]/g;
c = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
g = null;
};
return function(h, n) {
g && g();
h = h.replace(u, y);
n && (h = h.replace(b, p).replace(c, "<br />"));
return h;
};
}();
return v;
}({}, I, L));
C.register("$43", function(v, t, D) {
function y() {}
let p, u;
const c = C.require("$28", "rtl.json");
v.init = function() {
return new y();
};
v.cast = function(b) {
return b instanceof y ? b : "string" === typeof b ? v.parse(b) : v.clone(b);
};
v.clone = function(b) {
const k = new y();
for (const g in b) k[g] = b[g];
return k;
};
v.parse = function(b) {
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
const h = g[b];
let n = this[h];
n && (n.join && (n = n.join("-")), 1 === b && 3 === n.length ? k.push("region-m49") : k = k.concat([ h, h + "-" + n.toLowerCase() ]));
}
return k.join(" ");
};
t.isRTL = function() {
return !!c[String(this.script || this.lang).toLowerCase()];
};
t = null;
return v;
}({}, I, L));
C.register("$44", function(v, t, D) {
function y(b) {
t.console && console.error && console.error(b);
}
function p() {
y("Method not implemented");
}
function u() {}
function c(b) {}
u.prototype.toString = function() {
return "[Undefined]";
};
c.prototype._validate = function(b) {
let k, g, h = !0;
for (k in this) g = this[k], g === p ? (y(b + "." + k + "() must be implemented"), 
h = !1) : g instanceof u && (y(b + "." + k + " must be defined"), h = !1);
return h;
};
v.init = function(b, k) {
const g = new c();
if (b) {
let h = b.length;
for (;0 !== h--; ) g[b[h]] = p;
}
if (k) for (b = k.length; 0 !== b--; ) g[k[b]] = new u();
return g;
};
v.validate = function(b) {
const k = /function (\w+)\(/.exec(b.toString());
b.prototype._validate(k && k[1] || "Object");
};
return v;
}({}, I, L));
C.register("$51", function(v, t, D) {
let y = 0, p = t.requestAnimationFrame, u = t.cancelAnimationFrame;
if (!p || !u) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (p = t[b + "RequestAnimationFrame"]) if (u = t[b + "CancelAnimationFrame"] || t[b + "CancelRequestAnimationFrame"]) break;
p && u || (p = function(b) {
var k = c();
const g = Math.max(0, 16 - (k - y)), h = k + g;
k = t.setTimeout(function() {
b(h);
}, g);
y = h;
return k;
}, u = function(b) {
clearTimeout(b);
});
const c = Date.now || function() {
return new Date().getTime();
};
v.loop = function(b, k) {
function g() {
n = p(g, k);
b(h++);
}
let h = 0, n;
g();
return {
stop: function() {
n && u(n);
n = null;
}
};
};
return v;
}({}, I, L));
C.register("$48", function(v, t, D) {
function y(r, w, m, a) {
if (c) {
const d = m;
m = function(f) {
if ((f.MSPOINTER_TYPE_TOUCH || "touch") === f.pointerType) return d(f);
};
}
r.addEventListener(w, m, a);
return {
unbind: function() {
r.removeEventListener(w, m, a);
}
};
}
function p(r) {
r.preventDefault();
r.stopPropagation();
return !1;
}
let u;
const c = !!t.navigator.msPointerEnabled, b = c ? "MSPointerDown" : "touchstart", k = c ? "MSPointerMove" : "touchmove", g = c ? "MSPointerUp" : "touchend";
v.ok = function(r) {
null == u && (u = "function" === typeof D.body.addEventListener);
u && r && r(v);
return u;
};
v.ms = function() {
return c;
};
v.dragger = function(r, w) {
function m(e) {
r.addEventListener(e, d[e], !1);
}
function a(e) {
r.removeEventListener(e, d[e], !1);
}
const d = {};
d[b] = function(e) {
h(e, function(l, q) {
q.type = b;
w(e, q, f);
});
m(k);
m(g);
return !0;
};
d[g] = function(e) {
a(k);
a(g);
h(e, function(l, q) {
q.type = g;
w(e, q, f);
});
return !0;
};
d[k] = function(e) {
h(e, function(l, q) {
q.type = k;
w(e, q, f);
});
return p(e);
};
m(b);
let f = {
kill: function() {
a(b);
a(k);
a(g);
r = f = w = null;
}
};
return f;
};
v.swiper = function(r, w, m) {
function a(F) {
r.addEventListener(F, x[F], !1);
}
function d(F) {
r.removeEventListener(F, x[F], !1);
}
function f() {
e && e.stop();
e = null;
}
let e, l, q, x = {}, B = [], z = [], E = [];
x[b] = function(F) {
l = !1;
f();
const H = n();
h(F, function(G, M) {
B[G] = H;
z[G] = M.clientX;
E[G] = M.clientY;
});
q = r.scrollLeft;
return !0;
};
x[g] = function(F) {
h(F, function(H, G) {
const M = n() - B[H];
H = z[H] - G.clientX;
w(Math.abs(H) / M, H ? 0 > H ? -1 : 1 : 0);
});
q = null;
return !0;
};
x[k] = function(F) {
let H, G;
null == q || h(F, function(M, O) {
H = z[M] - O.clientX;
G = E[M] - O.clientY;
});
if (G && Math.abs(G) > Math.abs(H)) return l = !0;
H && (l = !0, r.scrollLeft = Math.max(0, q + H));
return p(F);
};
if (!c || m) a(b), a(k), a(g), c && (r.className += " mstouch");
return {
kill: function() {
d(b);
d(k);
d(g);
f();
},
swiped: function() {
return l;
},
ms: function() {
return c;
},
snap: function(F) {
c && !m && (r.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
r.style["-ms-scroll-snap-type"] = "mandatory", r.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, H, G) {
f();
let M = r.scrollLeft;
const O = F > M ? 1 : -1, R = Math[1 === O ? "min" : "max"], J = Math.round(16 * H * O);
return e = C.require("$51", "fps.js").loop(function(Q) {
Q && (M = Math.max(0, R(F, M + J)), r.scrollLeft = M, F === M && (f(), G && G(M)));
}, r);
}
};
};
v.start = function(r, w) {
return y(r, b, w, !1);
};
v.move = function(r, w) {
return y(r, k, w, !1);
};
v.end = function(r, w) {
return y(r, g, w, !1);
};
const h = v.each = function(r, w) {
if (c) (r.MSPOINTER_TYPE_TOUCH || "touch") === r.pointerType && w(0, r); else {
r = (r.originalEvent || r).changedTouches || [];
for (var m = -1; ++m < r.length; ) w(m, r[m]);
}
}, n = Date.now || function() {
return new Date().getTime();
};
return v;
}({}, I, L));
C.register("$52", function(v, t, D) {
v.init = function(y) {
function p() {
k.style.top = String(-y.scrollTop) + "px";
return !0;
}
function u() {
const h = k;
h.textContent = y.value;
const n = h.innerHTML;
"" !== n && (h.innerHTML = n.replace(/[ \t]/g, c).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function c(h) {
return '<span class="x' + h.charCodeAt(0).toString(16) + '">' + h + "</span>";
}
const b = y.parentNode;
let k = b.insertBefore(D.createElement("div"), y);
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
return v;
}({}, I, L));
C.register("$36", function(v, t, D) {
function y(c, b) {
c = p[c] || [];
b = b && t[b];
const k = c.length;
let g = -1, h = 0;
for (;++g < k; ) {
const n = c[g];
"function" === typeof n && (n(b), h++);
}
return h;
}
const p = {};
let u = "";
v.load = function(c, b, k) {
function g() {
r && (clearTimeout(r), r = null);
w && (w.onreadystatechange = null, w = w = w.onload = null);
c && (delete p[c], c = null);
}
function h(m, a) {
m = w && w.readyState;
if (a || !m || "loaded" === m || "complete" === m) a || y(c, k), g();
}
function n() {
if (0 === y(c)) throw Error('Failed to load "' + (k || c) + '"');
g();
}
if (k && t[k]) "function" === typeof b && b(t[k]); else if (null != p[c]) p[c].push(b); else {
p[c] = [ b ];
var r = setTimeout(n, 4e3), w = D.createElement("script");
w.setAttribute("src", c);
w.setAttribute("async", "true");
w.onreadystatechange = h;
w.onload = h;
w.onerror = n;
w.onabort = g;
D.getElementsByTagName("head")[0].appendChild(w);
}
};
v.stat = function(c) {
var b;
if (!(b = u)) {
{
b = D.getElementsByTagName("script");
const k = b.length;
let g = -1, h = "";
for (;++g < k; ) {
const n = b[g].getAttribute("src");
if (n) {
const r = n.indexOf("/lib/vendor");
if (-1 !== r) {
h = n.substring(0, r);
break;
}
}
}
b = h || "/static";
}
b = u = b;
}
return b + c;
};
v.css = function(c, b) {
D.getElementById(b) || A("<link />").attr("rel", "stylesheet").attr("href", c).attr("id", b).appendTo(D.head);
};
return v;
}({}, I, L));
C.register("$16", function(v, t, D) {
function y(n, r) {
n.setReadOnly(!1);
n.on("change", function(w, m) {
return r.val(m.getValue());
});
n.on("focus", function() {
return r.focus();
});
n.on("blur", function() {
return r.blur();
});
}
function p(n) {
n.off("change");
n.off("focus");
n.off("blur");
}
function u(n) {
p(n);
n.setReadOnly(!0);
n.setHighlightGutterLine(!1);
n.setHighlightActiveLine(!1);
}
function c(n, r) {
function w() {
this.HighlightRules = a;
}
n = n.require;
const m = n("ace/lib/oop"), a = b(r);
m.inherits(a, n("ace/mode/text_highlight_rules").TextHighlightRules);
m.inherits(w, n("ace/mode/text").Mode);
return new w();
}
function b(n) {
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
}, w = k(n);
"icu" === n ? r = {
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
} : w && r.start.push({
token: "printf",
regex: w
});
this.$rules = r;
};
}
function k(n) {
switch (n) {
case "objc":
return /%(?:\d+\$)?[-+'0# ]*\d*(?:\.\d+|\.\*(?:\d+\$)?)?(?:hh?|ll?|[qjzTL])?[sScCdDioOuUxXfFeEgGaAp%@]/;

case "java":
return /%(?:\d+\$)?[-+,(0# ]*\d*(?:\.\d+)?(?:[bBhHsScCdoxXeEfgGaA%n]|[tT][HIklMSLNpzZsQBbhAaCYyjmdeRTrDFc])/;

case "php":
return /%(?:\d+\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?[suxXbcdeEfFgGo%]/;

case "python":
return /%(?:\([_A-Za-z][_A-Za-z0-9]*\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;

case "javascript":
return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;

case "auto":
return /%(?:\d+\$|\([_A-Za-z][_A-Za-z0-9]*\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;

case h:
return g || /%%/;
}
}
let g, h = "auto";
v.init = function(n, r, w) {
let m, a = !1, d = w || h, f = n.parentNode, e = f.appendChild(D.createElement("div"));
A(f).addClass("has-proxy has-ace");
C.require("$36", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(l) {
if (e) {
if (!l) throw Error("Failed to load code editor");
m = l.edit(e);
var q = m.session, x = m.renderer;
m.$blockScrolling = Infinity;
m.setShowInvisibles(a);
m.setWrapBehavioursEnabled(!1);
m.setBehavioursEnabled(!1);
m.setHighlightActiveLine(!1);
q.setUseSoftTabs(!1);
x.setShowGutter(!0);
x.setPadding(10);
x.setScrollMargin(8);
q.setMode(c(l, d));
m.setValue(n.value, -1);
q.setUseWrapMode(!0);
r ? y(m, r) : u(m);
}
}, "ace");
return {
kill: function() {
m && (p(m), m.destroy(), m = null);
e && (f.removeChild(e), A(f).removeClass("has-proxy has-ace"), e = null);
return this;
},
disable: function() {
m && u(m);
r = null;
return this;
},
enable: function(l) {
r = l;
m && y(m, l);
return this;
},
resize: function() {
m && m.resize();
return this;
},
val: function(l) {
m && l !== m.getValue() && m.setValue(l, -1);
return this;
},
invs: function(l) {
l = l || !1;
a !== l && (a = l, m && m.setShowInvisibles(l));
return this;
},
strf: function(l) {
l = l || h;
l !== d && (d = l, m && m.session.setMode(c(t.ace, l)));
return this;
},
focus: function() {
m && m.focus();
return this;
}
};
};
v.strf = function(n, r) {
h = n;
g = r;
return v;
};
return v;
}({}, I, L));
C.register("$53", function(v, t, D) {
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
let c = 0;
v.load = function(b) {
const k = C.require("$36", "remote.js");
k.css(k.stat("/css/lib/tinymce.css"), "tinymce-css");
k.load(k.stat("/lib/tinymce.min.js"), b, "tinymce");
return v;
};
v.init = function(b, k) {
function g(l) {
w = l;
m = "<p>" === l.substring(0, 3) && "</p>" === l.substring(l.length - 4);
return l.replace(/(<\/?)script/gi, "$1loco:script");
}
function h(l) {
n = l;
l._getContent = l.getContent;
l.getContent = function(q) {
q = this._getContent(q);
q = q.replace(/(<\/?)loco:script/gi, "$1script");
if (!m && "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4)) {
const x = q.substring(3, q.length - 4);
if (x === w || -1 === x.indexOf("</p>")) q = x;
}
return q;
};
l._setContent = l.setContent;
l.setContent = function(q, x) {
return this._setContent(g(q), x);
};
k ? (y(l, k), k.reset()) : u(l);
A(f).removeClass("loading");
}
let n, r = !1, w = "", m = !1, a = b.parentNode, d = a.parentNode, f = a.appendChild(D.createElement("div")), e = d.insertBefore(D.createElement("nav"), a);
e.id = "_tb" + String(++c);
A(a).addClass("has-proxy has-mce");
A(f).addClass("mce-content-body loading").html(g(b.value));
v.load(function(l) {
if (!l) throw Error("Failed to load HTML editor");
f && l.init({
inline: !0,
target: f,
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
extended_valid_elements: "span,b,i,u,loco:script",
entities: "38,amp,60,lt,62,gt,160,nbsp",
entity_encoding: "named",
keep_styles: !1,
init_instance_callback: h
});
});
return {
val: function(l) {
l = g(l);
null == n ? (b.value = l, A(f).html(l)) : n.getContent() !== l && n.setContent(l);
k && k.val(l);
return this;
},
kill: function() {
n && (k && k.val(n.getContent()), p(n), n.destroy(), n = null);
f && (a.removeChild(f), A(a).removeClass("has-proxy has-mce"), f = null);
e && (d.removeChild(e), e = null);
return this;
},
enable: function(l) {
k = l;
n && y(n, l);
return this;
},
disable: function() {
n && u(n);
k = null;
return this;
},
focus: function() {
n && k && n.focus();
return this;
},
invs: function(l) {
l = l || !1;
r !== l && (r = l, A(a)[l ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return v;
}({}, I, L));
C.register("$54", function(v, t, D) {
v.init = function(y, p) {
function u(d) {
w !== d && (a.textContent = d.format(0), w = d, d = 0 === d ? "empty" : 0 === p || d < p ? "lt" : p === d ? "eq" : "gt", 
d !== r && (r = d, m.className = "wg-count is-" + d));
}
function c(d) {
n && (m.removeChild(n), n = null);
0 < d && (n = m.appendChild(g.el("span").appendChild(g.txt(" / " + d.format(0)))));
p = d;
}
function b(d, f) {
u(f.length);
}
function k() {
r = "";
w = -1;
u(y.val().length);
}
const g = C.require("$27", "dom.js"), h = A(y.parent()).on("changing", b);
let n, r, w, m = g.el("div"), a = m.appendChild(g.el("span"));
h.append(m);
c(p);
k();
return {
ping: function(d) {
null != d && d !== p && (p = d, c(d));
k();
},
kill: function() {
const d = h && h[0];
d && m && m.parentNode === d && (h.off("changing", b), d.removeChild(m));
}
};
};
return v;
}({}, I, L));
C.register("$49", function(v, t, D) {
function y(c) {
function b() {
a && (r.off("input", k), a = !1);
}
function k() {
const f = c.value;
f !== d && (r.trigger("changing", [ f, d ]), d = f);
}
function g() {
k();
a && m !== d && r.trigger("changed", [ d ]);
}
function h() {
u = c;
m = d;
a || (r.on("input", k), a = !0);
r.trigger("editFocus");
w.addClass("has-focus");
return !0;
}
function n() {
u === c && (u = null);
r.trigger("editBlur");
w.removeClass("has-focus");
a && (g(), b());
return !0;
}
const r = A(c), w = A(c.parentNode);
let m, a = !1, d = c.value;
r.on("blur", n).on("focus", h);
return {
val: function(f) {
d !== f && (c.value = f, r.triggerHandler("input"), d = f);
return !0;
},
kill: function() {
b();
r.off("blur", n).off("focus", h);
},
fire: function() {
d = null;
k();
},
ping: g,
blur: n,
focus: h,
reset: function() {
m = d = c.value;
}
};
}
function p(c) {
this.e = c;
}
let u;
v._new = function(c) {
return new p(c);
};
v.init = function(c) {
const b = new p(c);
c.disabled ? (c.removeAttribute("disabled"), b.disable()) : c.readOnly ? b.disable() : b.enable();
return b;
};
t = p.prototype;
t.destroy = function() {
this.unlisten();
const c = this.p;
c && (c.kill(), this.p = null);
this.nocount();
this.e = null;
};
t.reload = function(c, b) {
let k = this.l;
this.nocount();
k && !b && (this.disable(), k = null);
this.val(c || "");
b && !k && this.enable();
return this;
};
t.val = function(c) {
const b = this.e;
if (null == c) return b.value;
const k = this.l, g = this.p;
g && g.val(c);
k && k.val(c);
k || b.value === c || (b.value = c, A(b).triggerHandler("input"));
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
const c = this.p;
c ? c.focus() : A(this.e).focus();
};
t.focused = function() {
return u && u === this.el;
};
t.parent = function() {
return this.e.parentNode;
};
t.attr = function(c, b) {
const k = this.e;
if (1 === arguments.length) return k.getAttribute(c);
null == b ? k.removeAttribute(c) : k.setAttribute(c, b);
return this;
};
t.editable = function() {
return !!this.l;
};
t.enable = function() {
const c = this.p;
this.e.removeAttribute("readonly");
this.listen();
c && c.enable && c.enable(this.l);
return this;
};
t.disable = function() {
const c = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
c && c.disable && c.disable();
return this;
};
t.listen = function() {
const c = this.l;
c && c.kill();
this.l = y(this.e);
return this;
};
t.unlisten = function() {
const c = this.l;
c && (c.kill(), this.l = null);
return this;
};
t.setInvs = function(c, b) {
const k = this.i || !1;
if (b || k !== c) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(c) : c && (this._i = C.require("$52", "mirror.js").init(this.e)), 
this.i = c;
return this;
};
t.getInvs = function() {
return this.i || !1;
};
t.setMode = function(c) {
let b = this.p, k = this.i || !1;
c !== (this.m || "") && (this.m = c, b && b.kill(), this.p = b = "code" === c ? C.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === c ? C.require("$53", "mce.js").init(this.e, this.l) : null, 
this.setInvs(k, !0), u && this.focus());
return this;
};
t.setStrf = function(c) {
this["%"] = c;
"code" === this.m && this.p.strf(c);
return this;
};
t.name = function(c) {
this.e.setAttribute("name", c);
return this;
};
t.placeholder = function(c) {
this.e.setAttribute("placeholder", c);
return this;
};
t.redraw = function() {
const c = this.p;
c && c.resize && c.resize();
};
t.counter = function(c) {
let b = this.c;
b ? b.ping(c) : this.c = C.require("$54", "counter.js").init(this, c);
c = String(c || "0");
"0" === c ? this.e.removeAttribute("maxlength") : c !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", c);
return this;
};
t.nocount = function() {
const c = this.c;
c && (c.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return v;
}({}, I, L));
C.register("$50", function(v, t, D) {
function y(a) {
const d = t.console;
d && d.error && d.error(a);
}
function p(a) {
const d = D.createElement("div");
a && d.setAttribute("class", a);
return d;
}
function u(a) {
return function() {
a.resize();
return this;
};
}
function c(a) {
return function(d) {
let f = d.target, e = f.$index;
for (;null == e && "DIV" !== f.nodeName && (f = f.parentElement); ) e = f.$index;
null != e && (d.stopImmediatePropagation(), a.select(e));
return !0;
};
}
function b(a) {
return function() {
a.redrawDirty() && a.redraw();
return !0;
};
}
function k(a) {
return function(d) {
var f = d.keyCode;
if (40 === f) f = 1; else if (38 === f) f = -1; else return !0;
if (d.shiftKey || d.ctrlKey || d.metaKey || d.altKey) return !0;
a.selectNext(f);
d.stopPropagation();
d.preventDefault();
return !1;
};
}
function g(a, d, f) {
function e(l) {
y("row[" + l + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(l) {
const q = d || 0, x = f ? -1 : 1, B = a.rows || [];
l.sort(function(z, E) {
return x * (B[z] || e(z)).cellVal(q).localeCompare((B[E] || e(E)).cellVal(q));
});
};
}
function h(a) {
this.w = a;
}
function n(a) {
this.t = a;
this.length = 0;
}
function r(a, d, f) {
let e = D.createElement("div");
e.className = f || "";
this._ = e;
this.d = d || [];
this.i = a || 0;
this.length = d.length;
}
function w(a) {
this.live = a;
this.rows = [];
}
v.create = function(a) {
return new h(a);
};
var m = h.prototype;
m.init = function(a) {
let d = this.w, f = d.id;
var e = d.splity(f + "-thead", f + "-tbody"), l = e[0];
e = e[1];
let q = [], x = [], B = [], z = [];
if (a) this.ds = a, this.idxs = x, this._idxs = null; else if (!(a = this.ds)) throw Error("No datasource");
l.css.push("wg-thead");
e.css.push("wg-tbody");
a.eachCol(function(O, R, J) {
B[O] = f + "-col-" + R;
z[O] = J || R;
});
var E = p();
let F = -1, H = B.length, G = p("wg-cols"), M = l.splitx.apply(l, B);
for (;++F < H; ) M[F].header(z[F]), G.appendChild(E.cloneNode(!1)).setAttribute("for", B[F]);
a.eachRow(function(O, R, J) {
q[O] = new r(O, R, J);
x[O] = O;
});
this.rows = q;
this.cols = G;
this.ww = null;
this.root = E = e.body;
this.head = l;
l.redraw = u(this);
d.css.push("is-table");
d.restyle();
l = e.fixed = M[0].bodyY() || 25;
d.lock().resize(l, e);
this.sc ? this._re_sort(H) : a.sort && a.sort(x);
this.redrawDirty();
this.render();
A(E).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", c(this)).on("scroll", b(this));
return this;
};
m.clear = function() {
const a = this.pages || [];
let d = a.length;
for (;0 !== d--; ) a[d].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
m.render = function() {
let a, d = [], f = this.rows || [], e = -1, l, q = this.idxs, x = q.length, B = this.idxr = {}, z = this.r, E = this._r, F = this.root, H = this.cols;
for (;++e < x; ) {
if (0 === e % 100) {
var G = H.cloneNode(!0);
a = new w(G);
a.i = d.length;
a.h = 2200;
a.insert(F);
d.push(a);
}
l = q[e];
B[l] = e;
G = f[l];
if (null == G) throw Error("Render error, no data at [" + l + "]");
G.page = a;
a.rows.push(G);
}
a && 100 !== a.size() && a.sleepH(22);
this.pages = d;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == z ? null != E && (G = f[E]) && G.page && (delete this._r, this.select(E, !0)) : (G = f[z]) && G.page ? this.select(z, !0) : (this.deselect(!1), 
this._r = z);
return this;
};
m.resize = function() {
let a = -1, d = this.ww || (this.ww = []);
var f = this.w;
let e = f.cells[0], l = e.body.childNodes, q = l.length, x = this.pages || [], B = x.length;
for (f.redraw.call(e); ++a < q; ) d[a] = l[a].style.width;
if (B) {
f = this.mx;
for (a = this.mn; a <= f; a++) x[a].widths(d);
this.redrawDirty() && this.redraw();
}
};
m.redrawDirty = function() {
let a = !1;
var d = this.root;
const f = d.scrollTop;
d = d.clientHeight;
this.sy !== f && (a = !0, this.sy = f);
this.vh !== d && (a = !0, this.vh = d);
return a;
};
m.redraw = function() {
let a = 0, d = -1, f = null, e = null, l = this.ww;
var q = this.sy;
let x = this.mn, B = this.mx, z = Math.max(0, q - 100);
q = this.vh + q + 100;
let E, F = this.pages || [], H = F.length;
for (;++d < H && !(a > q); ) E = F[d], a += E.height(), a < z || (null === f && (f = d), 
e = d, E.rendered || E.render(l));
if (x !== f) {
if (null !== x && f > x) for (d = x; d < f; d++) {
E = F[d];
if (!E) throw Error("Shit!");
E.rendered && E.sleep();
}
this.mn = f;
}
if (B !== e) {
if (null !== B && e < B) for (d = B; d > e; d--) E = F[d], E.rendered && E.sleep();
this.mx = e;
}
};
m.selected = function() {
return this.r;
};
m.thead = function() {
return this.w.cells[0];
};
m.tbody = function() {
return this.w.cells[1];
};
m.tr = function(a) {
return (a = this.row(a)) ? a.cells() : [];
};
m.row = function(a) {
return this.rows[a];
};
m.td = function(a, d) {
return this.tr(a)[d];
};
m.next = function(a, d, f) {
null == f && (f = this.r || 0);
const e = this.idxs, l = e.length;
let q = f = (this.idxr || {})[f];
for (;f !== (q += a) && !(0 <= q && l > q); ) if (d && l) q = 1 === a ? -1 : l, 
d = !1; else return null;
f = e[q];
return null == f || null == this.rows[f] ? (y("Bad next: [" + q + "] does not map to data row"), 
null) : f;
};
m.selectNext = function(a, d, f) {
a = this.next(a, d, null);
null != a && this.r !== a && this.select(a, f);
return this;
};
m.deselect = function(a) {
const d = this.r;
null != d && (this.r = null, A(this.tr(d)).removeClass("selected"), this.w.fire("wgRowDeselect", [ d, a ]));
return this;
};
m.selectRow = function(a, d) {
return this.select(this.idxs[a], d);
};
m.select = function(a, d) {
const f = this.rows[a];
var e = f && f.page;
if (!e) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let l, q = this.w.cells[1];
e.rendered || (l = e.top(), q.scrollY(l), this.redrawDirty() && this.redraw());
if (!f.rendered) return e.rendered || y("Failed to render page"), y("Row [" + f.i + "] not rendered"), 
this;
e = f.cells();
A(e).addClass("selected");
this.r = a;
d || (l = q.scrollY(), A(this.root).focus(), l !== q.scrollY() && q.scrollY(l));
q.scrollTo(e[0], !0);
this.w.fire("wgRowSelect", [ a, f.data() ]);
return this;
};
m.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
m.filter = function(a) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(a);
return this.clear().render();
};
m.each = function(a) {
let d, f = -1;
const e = this.rows || [], l = this.idxs || [], q = l.length;
for (;++f < q; ) d = l[f], a(e[d], f, d);
return this;
};
m.sortable = function(a) {
const d = this.sc || (this.sc = new n(this));
d.has(a) || d.add(a);
return this;
};
m._re_sort = function(a) {
let d = -1, f = this.sc, e = f.active;
for (this.sc = f = new n(this); ++d < a; ) f.add(d);
e && (d = this.head.indexOf(e.id), -1 === d && (d = Math.min(e.idx, a - 1)), this.sort(d, e.desc));
return this;
};
m._sort = function(a, d) {
d ? (this.s = d, d(a)) : (d = this.s) && d(a);
return a;
};
m.sort = function(a, d) {
this._sort(this.idxs, g(this, a, d));
this.sc.activate(a, d);
return this;
};
m = null;
m = n.prototype;
m.has = function(a) {
return null != this[a];
};
m.add = function(a) {
const d = this, f = d.t.head.cells[a];
d[a] = {
desc: null,
idx: a,
id: f.id
};
d.length++;
f.addClass("wg-sortable").on("click", function(e) {
if ("header" === e.target.nodeName.toLowerCase()) return e.stopImmediatePropagation(), 
d.toggle(a), !1;
});
return d;
};
m.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
m.activate = function(a, d) {
let f, e = this.active, l = this[a], q = this.t.head.cells;
e && (f = q[e.idx]) && (f.removeClass(e.css), e !== l && f.restyle());
(f = q[a]) ? (l.desc = d, this.active = l, a = "wg-" + (d ? "desc" : "asc"), f.addClass(a).restyle(), 
l.css = a) : this.active = null;
return this;
};
m = null;
m = r.prototype;
m.render = function(a) {
let d, f = [], e = this._, l = this.length;
if (e) {
for (this.c = f; 0 !== l--; ) d = e.cloneNode(!1), f[l] = this.update(l, d), d.$index = this.i, 
a[l].appendChild(d);
this._ = null;
} else for (f = this.c; 0 !== l--; ) a[l].appendChild(f[l]);
this.rendered = !0;
return this;
};
m.update = function(a, d) {
d = d || this.c[a] || {};
a = (this.d[a] || function() {})() || " ";
null == a.innerHTML ? d.textContent = a : d.innerHTML = a.innerHTML;
return d;
};
m.cells = function() {
return this.c || [ this._ ];
};
m.data = function() {
const a = [], d = this.length;
let f = -1;
for (;++f < d; ) a[f] = this.cellVal(f);
return a;
};
m.destroy = function() {
this.page = null;
this.rendered = !1;
};
m.cellVal = function(a) {
a = this.d[a]() || "";
return String(a.textContent || a);
};
m = null;
m = w.prototype;
m.size = function() {
return this.rows.length;
};
m.insert = function(a) {
const d = this.h, f = p("wg-dead");
f.style.height = String(d) + "px";
a.appendChild(f);
return this.dead = f;
};
m.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
m.height = function() {
let a = this.h;
null == a && (this.h = a = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHeight);
a || y("row has zero height");
return a;
};
m.render = function(a) {
let d, f = -1, e = this.rows, l = e.length;
const q = this.dead, x = this.live, B = x.childNodes;
for (;++f < l; ) d = e[f], d.rendered || d.render(B);
l = a.length;
for (f = 0; f < l; f++) B[f].style.width = a[f];
q.parentNode.replaceChild(x, q);
this.rendered = !0;
this.h = null;
return this;
};
m.sleep = function() {
const a = this.height(), d = this.live, f = this.dead;
f.style.height = String(a) + "px";
d.parentNode.replaceChild(f, d);
this.rendered = !1;
this.h = a;
return this;
};
m.sleepH = function(a) {
a *= this.rows.length;
const d = this.dead;
d && (d.style.height = String(a) + "px");
this.rendered || (this.h = a);
return this;
};
m.widths = function(a) {
const d = this.live.childNodes;
let f = a.length;
for (;0 !== f--; ) d[f].style.width = a[f];
return this;
};
m.destroy = function() {
var a = this.rendered ? this.live : this.dead;
const d = this.rows;
a.parentNode.removeChild(a);
for (a = d.length; 0 !== a--; ) d[a].destroy();
};
return v;
}({}, I, L));
C.register("$45", function(v, t, D) {
function y(e, l) {
var q = e.id;
let x = q && m[q], B = x && x.parent();
if (!x || !B) return null;
var z = 1 === B.dir;
q = z ? "X" : "Y";
let E = "page" + q;
z = z ? w : r;
let F = z(B.el);
q = l["offset" + q];
let H = B.el, G = H.className;
null == q && (q = l[E] - z(e));
q && (F += q);
H.className = G + " is-resizing";
return {
done: function() {
H.className = G;
},
move: function(M) {
B.resize(M[E] - F, x);
return !0;
}
};
}
function p(e) {
function l() {
A(D).off("mousemove", q);
f && (f.done(), f = null);
return !0;
}
function q(x) {
f ? f.move(x) : l();
return !0;
}
if (f) return !0;
f = y(e.target, e);
if (!f) return !0;
A(D).one("mouseup", l).on("mousemove", q);
return c(e);
}
function u(e, l) {
const q = l.type;
"touchmove" === q ? f && f.move(l) : "touchstart" === q ? f = y(e.target, l) : "touchend" === q && f && (f.done(), 
f = null);
}
function c(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function b(e) {
a && a.redraw();
e && e.redraw();
return a = e;
}
function k(e, l) {
const q = A(l);
q.on("editFocus", function(x) {
x.stopPropagation();
q.trigger("wgFocus", [ b(e) ]);
}).on("editBlur", function(x) {
x.stopPropagation();
q.trigger("wgBlur", [ b(null) ]);
});
}
function g(e) {
const l = e.id, q = e.className, x = q ? [ q ] : [];
this.id = l;
this.el = e;
this.pos = this.index = 0;
this._cn = q;
this.css = x.concat("wg-cell");
m[l] = this;
this.clear();
}
const h = C.include("$47", "html.js") || C.include("$2", "html.js", !0), n = C.require("$27", "dom.js"), r = n.top, w = n.left, m = {};
let a, d = 0, f = !1;
v.init = function(e) {
const l = new g(e);
l.redraw();
C.require("$48", "touch.js").ok(function(q) {
q.dragger(e, u);
});
A(e).on("mousedown", p);
return l;
};
t = g.prototype;
t.fire = function(e, l) {
e = A.Event(e);
e.cell = this;
A(this.el).trigger(e, l);
return this;
};
t.each = function(e) {
let l = -1;
const q = this.cells, x = q.length;
for (;++l < x; ) e(q[l], l);
return this;
};
t.indexOf = function(e) {
return (e = m[e.id || String(e)]) && e.pid === this.id ? e.index : -1;
};
t.on = function() {
return this.$("on", arguments);
};
t.off = function() {
return this.$("off", arguments);
};
t.find = function(e) {
return A(this.el).find(e);
};
t.$ = function(e, l) {
A.fn[e].apply(A(this.el), l);
return this;
};
t.addClass = function(e) {
this.css.push(e);
return this;
};
t.removeClass = function(e) {
e = this.css.indexOf(e);
-1 !== e && this.css.splice(e, 1);
return this;
};
t.parent = function() {
return this.pid && m[this.pid];
};
t.splitx = function() {
return this._split(1, arguments);
};
t.splity = function() {
return this._split(2, arguments);
};
t._split = function(e, l) {
(this.length || this.field) && this.clear();
let q = -1;
let x = l.length, B = 1 / x, z = 0;
for (;++q < x; ) {
var E = n.el();
this.body.appendChild(E);
var F = E;
{
var H = l[q];
let G = 1, M = H;
for (;m[H]; ) H = M + "-" + ++G;
}
F.id = H;
E = new g(E);
E.index = q;
E.pid = this.id;
E._locale(this.lang, this.rtl);
E.pos = z;
z += B;
this.cells.push(E);
this.length++;
}
this.dir = e;
this.redraw();
return this.cells;
};
t.count = function() {
return this.cells && this.cells.length || 0;
};
t.destroy = function() {
this.clear();
delete m[this.id];
const e = this.el;
e.innerHTML = "";
this.body = null;
e.className = this._cn || "";
A(e).off();
return this;
};
t.exists = function() {
return this === m[this.id];
};
t.clear = function() {
const e = this.el, l = this.cells, q = this.field, x = this.body, B = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete m[l[z].destroy().id];
this.cells = [];
this.length = 0;
B && (e.removeChild(B), this.nav = null);
x && (q && (q.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
e === x.parentNode && e.removeChild(x));
this.body = e.appendChild(n.el("", "wg-body"));
this._h = null;
return this;
};
t.resize = function(e, l) {
if (!l && (l = this.cells[1], !l)) return;
var q = l.index;
let x = this.cells, B = A(this.el)[1 === this.dir ? "width" : "height"](), z = x[q + 1];
q = x[q - 1];
l.pos = Math.min((z ? z.pos * B : B) - ((l.body || l.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * B : 0, e)) / B;
this.redraw();
this.fire("wgResize");
return this;
};
t.distribute = function(e) {
let l = -1, q = 0, x;
const B = this.cells, z = e.length;
for (;++l < z && (x = B[++q]); ) x.pos = Math.max(0, Math.min(1, e[l]));
this.redraw();
return this;
};
t.distribution = function() {
let e = [], l = 0;
const q = this.cells, x = q.length - 1;
for (;l < x; ) e[l] = q[++l].pos;
return e;
};
t.restyle = function() {
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
t.redraw = function(e) {
this.restyle();
const l = this.el;
var q = this.body, x = this.field;
if (q) {
var B = l.clientWidth || 0, z = l.clientHeight || 0, E = q.offsetTop || 0;
z = E > z ? 0 : z - E;
if (this._h !== z) {
this._h = z;
q.style.height = String(z) + "px";
var F = x;
}
this._w !== B && (this._w = B, F = x);
F && F.redraw();
}
q = this.length;
B = 1;
z = this.nav;
for (E = 2 === this.dir ? "height" : "width"; 0 !== q--; ) x = this.cells[q], z ? F = 1 : (x.fixed && (x.pos = x.fixed / A(l)[E]()), 
F = B - x.pos, B = x.pos), x.el.style[E] = String(100 * F) + "%", x.redraw(e);
return this;
};
t.contents = function(e, l) {
const q = this.el;
let x = this.body;
if (null == e) return x.innerHTML;
this.length ? this.clear() : x && (q.removeChild(x), x = null);
x || (this.body = x = q.appendChild(n.el("", l || "wg-content")), this._h = null, 
(l = this.lang) && this._locale(l, this.rtl, !0));
"string" === typeof e ? A(x)._html(e) : e && this.append(e);
this.redraw();
return this;
};
t.textarea = function(e, l) {
let q = this.field;
if (q) {
var x = q.editable();
q.reload(e, l);
x !== l && this.restyle();
} else this.length && this.clear(), x = n.el("textarea"), x.setAttribute("wrap", "virtual"), 
x.setAttribute("autocomplete", "off"), x.setAttribute("id", "wg" + String(++d)), 
x.value = e, this.contents(x), q = C.require("$49", "field.js")._new(x)[l ? "enable" : "disable"](), 
k(this, x), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
t.locale = function(e) {
e = C.require("$43", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
t._locale = function(e, l, q) {
const x = this.body;
if (q || e !== this.lang) this.lang = e, x && x.setAttribute("lang", e);
if (q || l !== this.rtl) this.rtl = l, x && x.setAttribute("dir", l ? "RTL" : "LTR");
return this;
};
t.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
const l = this.cells;
let q = this.navigated();
if (null != q) return l[q].editable();
q = -1;
const x = l.length;
for (;++q < x && (e = l[q].editable(), null == e); );
return e;
};
t.eachTextarea = function(e) {
const l = this.field;
l ? e(l) : this.each(function(q) {
q.eachTextarea(e);
});
return this;
};
t.append = function(e) {
e && (e.nodeType ? h.init(this.body.appendChild(e)) : h.init(A(e).appendTo(this.body)));
return this;
};
t.prepend = function(e) {
const l = this.body;
if (e.nodeType) {
const q = l.firstChild;
h.init(q ? l.insertBefore(e, q) : l.appendChild(e));
} else h.init(A(e).prependTo(l));
return this;
};
t.before = function(e) {
const l = this.body;
e.nodeType ? h.init(this.el.insertBefore(e, l)) : h.init(A(e).insertBefore(l));
return this;
};
t.header = function(e, l) {
if (null == e && null == l) return this.el.getElementsByTagName("header")[0];
this.t = n.txt(e || "");
this.el.insertBefore(n.el("header", l), this.body).appendChild(this.t);
this.redraw();
return this;
};
t.toolbar = function() {
const e = this.header(), l = e.getElementsByTagName("nav");
return 0 === l.length ? e.appendChild(n.el("nav")) : l[0];
};
t.title = function(e) {
const l = this.t;
if (l) return l.nodeValue = e || "", l;
this.header(e);
return this.t;
};
t.titled = function() {
return this.t && this.t.nodeValue;
};
t.bodyY = function() {
return r(this.body, this.el);
};
t.scrollY = function(e) {
if (la === e) return this.body.scrollTop;
this.body.scrollTop = e;
};
t.tabulate = function(e) {
let l = this.table;
l ? l.clear() : l = C.require("$50", "wgtable.js").create(this);
l.init(e);
return this.table = l;
};
t.lock = function() {
this.body.className += " locked";
return this;
};
t.scrollTo = function(e, l) {
let q = this.body;
var x = q.scrollTop;
let B = r(e, q);
if (x > B) x = B; else {
const z = q.clientHeight;
e = B + A(e).outerHeight();
if (z + x < e) x = e - z; else return;
}
l ? q.scrollTop = x : A(q).stop(!0).animate({
scrollTop: x
}, 250);
};
t.navigize = function(e, l) {
function q(G) {
const M = z[G], O = B[G], R = A(M.el).show();
O.addClass("active");
F = G;
H.data("idx", G);
M.fire("wgTabSelect", [ G ]);
return R;
}
const x = this, B = [], z = x.cells;
let E = x.nav, F;
E && x.el.removeChild(E);
E = x.nav = x.el.insertBefore(n.el("nav", "wg-tabs"), x.body);
const H = A(E).on("click", function(G) {
const M = A(G.target).data("idx");
if (null == M) return !0;
if (null != F) {
{
const O = B[F];
A(z[F].el).hide();
O.removeClass("active");
}
}
q(M);
x.redraw();
return c(G);
});
null == l && (l = H.data("idx") || 0);
x.each(function(G, M) {
B[M] = A('<a href="#' + G.id + '"></a>').data("idx", M).text(e[M]).appendTo(H);
G.pos = 0;
A(G.el).hide();
});
q(z[l] ? l : 0);
x.lock();
x.redraw();
return x;
};
t.navigated = function() {
const e = this.nav;
if (e) return A(e).data("idx");
};
t = null;
return v;
}({}, I, L));
C.register("$30", function(v, t, D) {
function y(a, d) {
a.stopPropagation();
n = d;
return !0;
}
function p(a) {
const d = "Zero One Two Few Many Other".split(" ");
return [ null, [ d[5] ], [ d[1], d[5] ], [ d[1], d[3], d[5] ], [ d[1], d[3], d[4], d[5] ], [ d[1], d[2], d[3], d[4], d[5] ] ][a] || d;
}
function u(a) {
const d = [];
a && (a.saved() || d.push("po-unsaved"), a.fuzzy() ? d.push("po-fuzzy") : a.hasFlag() && d.push("po-flagged"), 
a.valid() || d.push("po-error"), a.translation() || d.push("po-empty"), a.comment() && d.push("po-comment"));
return d.join(" ");
}
function c(a, d, f) {
d = A(a.title(d).parentNode);
let e = d.find("span.lang");
f ? (f = C.require("$43", "locale.js").cast(f), e.length || (e = A("<span></span>").prependTo(d)), 
e.attr("lang", f.lang).attr("class", f.getIcon() || "lang region region-" + (f.region || "zz").toLowerCase())) : (e.remove(), 
f = "en");
a.locale(f);
return d;
}
function b(a, d, f) {
d.on("click", function(e) {
const l = a.fire(f, [ e.target ]);
l || e.preventDefault();
return l;
});
}
function k() {
this.dirty = 0;
}
C.require("$3", "number.js");
const g = C.require("$42", "string.js").html, h = C.require("$6", "string.js").sprintf;
let n, r;
v.extend = function(a) {
return a.prototype = new k();
};
v.localise = function(a) {
r = a;
return v;
};
const w = function() {
const a = D.createElement("p"), d = /(src|href|on[a-z]+)\s*=/gi;
return function(f) {
a.innerHTML = f.replace(d, "data-x-loco-$1=");
const e = a.textContent.trim();
return e ? e.replace("data-x-loco-", "") : f.trim();
};
}(), m = k.prototype = C.require("$44", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
m.init = function() {
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
m.t = function() {
return this.$t || r || C.require("$1", "t.js").init();
};
m.localise = function(a) {
a || (a = this.t());
const d = [];
d[0] = a._x("Source text", "Editor") + ":";
d[3] = a._x("%s translation", "Editor") + ":";
d[4] = a._x("Context", "Editor") + ":";
d[5] = a._x("Comments", "Editor") + ":";
d[1] = a._x("Single", "Editor") + ":";
d[2] = a._x("Plural", "Editor") + ":";
d[6] = a._x("Untranslated", "Editor");
d[7] = a._x("Translated", "Editor");
d[8] = a._x("Toggle Fuzzy", "Editor");
d[9] = a._x("Suggest translation", "Editor");
this.labels = d;
this.$t = a;
return this;
};
m.setRootCell = function(a) {
function d(e) {
f.redraw(!0, e);
return !0;
}
const f = C.require("$45", "wingrid.js").init(a);
A(t).on("resize", d);
this.redraw = d;
A(a).on("wgFocus wgBlur", y);
this.destroy = function() {
f.destroy();
A(t).off("resize", d);
};
this.rootDiv = a;
return f;
};
m.$ = function() {
return A(this.rootDiv);
};
m.setListCell = function(a) {
const d = this;
d.listCell = a;
a.on("wgRowSelect", function(f, e) {
(f = d.po.row(e)) && f !== d.active && d.loadMessage(f);
}).on("wgRowDeselect", function(f, e, l) {
l || d.loadNothing();
});
};
m.setSourceCell = function(a) {
this.sourceCell = a;
};
m.setTargetCell = function(a) {
this.targetCell = a;
};
m.next = function(a, d, f) {
const e = this.listTable, l = this.po;
let q = e.selected(), x = q, B;
for (;null != (q = e.next(a, f, q)); ) {
if (x === q) {
q = null;
break;
}
if (d && (B = l.row(q), B.translated(0))) continue;
break;
}
null != q && e.select(q, !0);
return q;
};
m.select = function(a) {
this.listTable.select(a);
this.focus();
};
m.current = function(a) {
const d = this.active;
if (null == a) return d;
a ? a.is(d) ? (this.reloadMessage(a), this.focus()) : (this.loadMessage(a), a = this.po.indexOf(a), 
-1 !== a && this.select(a)) : this.unloadActive();
return this;
};
m.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
m.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
m.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
m.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
m.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
m.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
m.rebuildSearch = function() {
const a = this.po.rows, d = a.length, f = this.dict;
f.clear();
let e = -1;
for (;++e < d; ) f.add(e, a[e].toText());
};
m.filtered = function() {
return this.lastSearch || "";
};
m.filter = function(a, d) {
const f = this.listTable, e = this.lastFound, l = this.lastSearch || "";
let q, x;
a ? (x = this.dict.find(a), q = x.length, q === e && 0 === a.indexOf(l) ? d = !0 : f.filter(x)) : (q = this.po.length, 
f.unfilter());
this.lastFound = q;
this.lastSearch = a;
d || this.fire("poFilter", [ a, q ]);
return q;
};
m.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
m.unsave = function(a, d) {
let f = !1;
if (a) {
if (f = a.saved(d)) this.dirty++, a.unsave(d), this.fire("poUnsaved", [ a, d ]);
this.reCssRow(a);
}
return f;
};
m.reCssRow = function(a) {
var d = this.po.indexOf(a);
if ((d = this.listTable.tr(d)) && d.length) {
var f = u(a);
a = d[0].className;
f = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + f;
f !== a && A(d).attr("class", f);
}
};
m.save = function(a) {
const d = this.po;
if (this.dirty || a) {
const f = [], e = [], l = this.listTable;
d.each(function(q, x, B) {
x.err && f.push(x);
x.saved() || (x.save(), (x = (q = l.row(B)) && q.page) && x.live ? e[x.i] = x.live : q && A(q.cells()).removeClass("po-unsaved"));
});
e.length && A(e).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = f.length ? f : null;
this.fire("poSave", []);
}
return d;
};
m.fire = function(a, d) {
const f = this.handle;
if (f && f[a] && !1 === f[a].apply(this, d || [])) return !1;
a = A.Event(a);
this.$().trigger(a, d);
return !a.isDefaultPrevented();
};
m.on = function(a, d) {
this.$().on(a, d);
return this;
};
m.getSorter = function() {
return null;
};
m.setLocales = function(a, d) {
const f = this.labels;
a && a !== this.sourceLocale && (this.sourceLocale = a, this.sourceCell && c(this.sourceCell, f[0], a));
d && d !== this.targetLocale && (this.targetLocale = d, a = h(f[3], d.label || "Target"), 
this.targetCell && c(this.targetCell, a, d));
};
m.reload = function() {
const a = this;
var d = a.listCell;
const f = a.po;
var e = f && f.locale() || a.targetLocale, l = f && f.source() || a.sourceLocale;
const q = e && e.isRTL(), x = f && f.length || 0;
if (!f || !f.row) return d && d.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(l, e);
a.lastSearch && (a.lastSearch = "", a.lastFound = x, a.fire("poFilter", [ "", x ]));
l = (e = a.listTable) && e.thead().distribution();
let B = [];
a.listTable = e = d.tabulate({
eachCol: function(z) {
const E = a.getListColumns(), F = a.getListHeadings();
for (const H in E) {
const G = E[H];
z(G, H, F[G]);
}
},
eachRow: function(z) {
f.each(function(E, F) {
a.validate(F) && B.push(F);
z(F.idx, a.getListEntry(F), u(F));
});
},
sort: a.getSorter()
});
d = a.getListColumns();
for (const z in d) e.sortable(d[z]);
l && e.thead().distribute(l);
e.tbody().$(q ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = B.length ? B : null;
return !!x;
};
m.load = function(a, d) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== d ? this.listTable.selectRow(d || 0) : this.active && this.unloadActive());
};
m.pasteMessage = function(a) {
this.validate(a);
if (this.active === a) {
let d = this.sourceCell, f = 0;
d && d.eachTextarea(function(e) {
e.val(a.source(null, f++));
});
(d = this.contextCell) && d.eachTextarea(function(e) {
e.val(a.context());
});
if (d = this.targetCell) f = 0, d.eachTextarea(function(e) {
e.val(a.translation(f++));
});
}
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
m.reloadMessage = function(a) {
const d = this.sourceCell, f = this.targetCell;
this.pasteMessage(a);
d && this.setSrcMeta(a, d) && d.redraw();
if (f) {
var e = f.navigated() || 0;
e = this.setTrgMeta(a, e, f);
!d && this.setSrcMeta(a, f) && (e = !0);
e && (f.redraw(), this.reCssRow(a));
}
return this;
};
m.setStatus = function() {
return null;
};
m.setSrcMeta = function(a, d) {
const f = [];
var e = this.labels;
let l = !1, q = this.$smeta;
var x = a.context();
let B = [], z = a.tags(), E = z && z.length;
x && (B.push("<span>" + g(e[4]) + "</span>"), B.push('<mark class="ctxt">' + g(x) + "</mark>"));
if (E && this.getTag) for (B.push("<span>Tagged:</span>"), e = -1; ++e < E; ) (x = this.getTag(z[e])) && B.push("<mark>" + g(x.mod_name) + "</mark>");
B.length && f.push('<p class="tags">' + B.join(" ") + "</p>");
if (this.getMono() && (x = a.refs()) && (z = x.split(/\s/), E = z.length)) {
for (B = []; 0 <= --E; ) x = z[E], B.push("<code>" + g(x) + "</code>");
f.push('<p class="has-icon icon-file">' + B.join(" ") + "</p>");
}
(x = a.format()) && "no-" !== x.substring(0, 3) && f.push('<p class="has-icon icon-help">This string is formatted. <a href="#format">See full details</a>.</p>');
(x = a.notes()) && f.push('<p class="has-icon icon-info">' + g(x, !0) + "</p>");
f.length ? (q || (q = d.find("div.meta"), q.length || (q = A('<div class="meta"></div>').insertAfter(d.header())), 
b(this, q, "poMeta"), this.$smeta = q), q.html(f.join("\n")).show(), l = !0) : q && q.text() && (q.text("").hide(), 
l = !0);
return l;
};
m.setTrgMeta = function(a, d, f) {
const e = [];
d = (a = a.errors(d)) && a.length;
var l = !1;
let q = this.$tmeta;
if (d) {
for (l = 0; l < d; l++) e.push('<p class="has-icon icon-warn">' + g(a[l], !0) + ".</p>");
q || (q = f.find("div.meta"), q.length || (q = A('<div class="meta"></div>').insertAfter(f.header())), 
this.$tmeta = q);
q.html(e.join("\n")).show();
l = !0;
} else q && q.text() && (q.text("").hide(), l = !0);
return l;
};
m.loadMessage = function(a) {
function d(N) {
if ("=" === N.charAt(0)) {
const K = N.split(" ");
N = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = K.join(" ");
}
return N;
}
function f(N, K) {
const S = ia;
var P = ca[0];
N.off();
N.titled() !== P && c(N, P, K || "en");
P = !1;
z.setSrcMeta(a, N) && (P = !0);
if (a.plural()) {
P = -1;
let U = [], W = [];
const Y = N.id + "-";
K = a.sourceForms() || K && K.plurals || p(2);
const da = K.length;
if (2 !== da || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < da; ) U[P] = Y + String(P), 
W[P] = d(K[P].split(" ", 1)[0]) + ":"; else U = [ Y + "-0", Y + "-1" ], W = [ ca[1], ca[2] ];
N.splity.apply(N, U);
N.each(function(ea, Z) {
ea.header(W[Z]).textarea(a.source(null, Z), S).setStrf(G).setMode(aa).setInvs(F);
});
N.lock();
S && N.each(function(ea, Z) {
e(ea, Z);
});
} else P && N.redraw(), N.textarea(a.source(), S).setStrf(G).setMode(aa).setInvs(F), 
S && e(N, 0);
}
function e(N, K) {
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
function l(N, K, S, P) {
V && K.eachTextarea(function(W) {
W.ping();
});
K.off("changing").off("changed");
var U = h(ca[3], S.label || "Target");
K.titled() !== U && c(K, U, S);
U = !1;
!N && z.setSrcMeta(a, K) && (U = !0);
z.setTrgMeta(a, P, K) && (U = !0);
z.setStatus(a, P);
if (1 !== S.nplurals && a.pluralized()) {
N = function(X) {
X < Z && (Y.push(d(ea[X])), W.push(da + String(X)));
};
let W = [], Y = [];
const da = K.id + "-", ea = a.targetForms() || S.plurals || p(S.nplurals), Z = ea.length;
for (a.eachMsg(N); (S = W.length) < Z; ) N(S);
K.splitx.apply(K, W);
K.each(function(X, ba) {
const ma = V && !a.disabled(ba);
X.textarea(a.translation(ba), ma).setStrf(G).setMode(aa).setInvs(F);
V && q(X, ba);
});
K.navigize(Y, P || null).on("wgTabSelect", function(X, ba) {
(X = V && X.cell.editable()) && X.focus();
z.setTrgMeta(a, ba, K);
z.setStatus(a, ba);
z.fire("poTab", [ ba ]);
});
} else U && K.redraw(), K.textarea(a.translation(), V && !a.disabled(0)).setStrf(G).setMode(aa).setInvs(F), 
V && q(K, 0);
}
function q(N, K) {
function S() {
P = null;
z.validate(a);
const W = a.errors(K).join(" ");
U !== W && (U = W, z.setTrgMeta(a, K, N) && N.redraw(), z.reCssRow(a));
}
let P, U = a.errors(K).join(" ");
N.on("changing", function(W, Y, da) {
P && (clearTimeout(P), P = null);
a.translate(Y, K);
0 === K && z.updateListCell(a, "target");
a.fuzzy(K) && a.saved(K) ? z.fuzzy(!1, a, K) : z.unsave(a, K);
"" === Y ? (z.fire("poEmpty", [ !0, a, K ]), z.setStatus(a, K)) : "" === da && (z.fire("poEmpty", [ !1, a, K ]), 
z.setStatus(a, K));
P = setTimeout(S, U ? 300 : 1e3);
}).on("changed", function() {
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function x(N) {
N.off();
const K = ca[4];
N.titled() !== K && (c(N, K), z.setStatus(null));
N.textarea(a.context(), !0).setMode(aa).setInvs(F);
na && N.on("changing", function(S, P) {
a.context(P);
z.updateListCell(a, "source");
z.unsave(a, fa);
}).on("changed", function() {
z.po.reIndex(a);
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function B(N) {
const K = ca[5];
N.titled() !== K && c(N, K);
N.off().on("changing", function(S, P) {
a.comment(P);
z.fire("poComment", [ a, P ]);
z.unsave(a, fa);
}).textarea(a.comment(), !0);
}
const z = this;
var E = a.isHTML();
const F = z.inv || !1, H = this.fmt || null, G = a.format() || null, M = a.is(z.active), O = z.sourceCell, R = z.targetCell, J = z.contextCell, Q = z.commentCell, V = z.editable.target, ia = z.editable.source, na = z.editable.context, oa = z.sourceLocale, ka = z.targetLocale, ca = z.labels;
let fa = 0, aa = z.mode, ha = n;
z.html !== E && (z.html = E, "code" !== z.mode && (aa = E ? "html" : "", z.setMode(aa)));
z.active = a;
O && f(O, oa);
J && x(J);
R && ka && (fa = R.navigated() || 0, l(O, R, ka, fa));
Q && B(Q);
ha && (ha.exists() || (ha = ha.parent()), (E = ha.editable()) && E.focus());
H !== G && (this.fmt = G);
M || z.fire("poSelected", [ a, fa ]);
};
m.unloadActive = function() {
function a(f) {
f && f.text("").hide();
}
function d(f) {
f && f.off().clear();
}
a(this.$smeta);
a(this.$tmeta);
d(this.sourceCell);
d(this.contextCell);
d(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
m.loadNothing = function() {
const a = this.t(), d = this.mode || "", f = this.inv || !1, e = this.fmt;
this.unloadActive();
this.setStatus(null);
let l = this.commentCell;
l && l.textarea("", !1);
if (l = this.sourceCell) l.textarea("", !1).setStrf(e).setMode(d).setInvs(f), l.title(a._x("Source text not loaded", "Editor") + ":");
if (l = this.contextCell) l.textarea("", !1).setMode(d).setInvs(f), l.title(a._x("Context not loaded", "Editor") + ":");
if (l = this.targetCell) l.textarea("", !1).setStrf(e).setMode(d).setInvs(f), l.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
m.updateListCell = function(a, d) {
d = this.getListColumns()[d];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(d);
};
m.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? w(a) : a.trim()) || " ";
};
m.fuzzy = function(a, d, f) {
d = d || this.active;
const e = d.fuzzy(f);
!0 !== a || e ? !1 === a && e && this.flag(0, d, f) && this.fire("poFuzzy", [ d, !1, f ]) : this.flag(4, d, f) && this.fire("poFuzzy", [ d, !0, f ]);
return e;
};
m.flag = function(a, d, f) {
if (!d) {
d = this.active;
f = this.getTargetOffset();
if (null == f) return null;
f && d.targetForms() && (f = 0);
}
const e = d.flagged(f);
if (null == a) return e;
if (e === a || a && !d.translated(f) || !this.fire("poFlag", [ a, e, d, f ])) return !1;
d.flag(a, f);
this.fire("poUpdate", [ d ]) && this.unsave(d, f);
this.setStatus(d, f);
return !0;
};
m.add = function(a, d) {
let f, e = this.po.get(a, d);
e ? f = this.po.indexOf(e) : (f = this.po.length, e = this.po.add(a, d), this.load(this.po, -1), 
this.fire("poAdd", [ e ]), this.fire("poUpdate", [ e ]));
this.lastSearch && this.filter("");
this.listTable.select(f);
return e;
};
m.del = function(a) {
if (a = a || this.active) {
var d = this.lastSearch, f = this.po.del(a);
null != f && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (d && this.filter(d), this.active || (f = Math.min(f, this.po.length - 1), 
this.listTable.select(f))));
}
};
m.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
m.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(e) {
e.setMode(a);
});
const d = this.active, f = this.sourceCell;
d && d.refs() && f && this.setSrcMeta(d, f) && f.redraw();
this.fire("poMode", [ a ]);
}
return this;
};
m.getMono = function() {
return "code" === this.mode;
};
m.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(d) {
d.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
m.getInvs = function() {
return this.inv || !1;
};
m.callTextareas = function(a) {
var d = this.targetCell;
d && d.eachTextarea(a);
(d = this.contextCell) && d.eachTextarea(a);
(d = this.sourceCell) && d.eachTextarea(a);
return this;
};
m.focus = function() {
const a = this.getTargetEditable();
a && a.focus();
return this;
};
m.validate = function(a) {
return 0;
};
return v;
}({}, I, L));
C.register("$31", function(v, t, D) {
v.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, p = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(u, c) {
const b = c && c.count || 0;
c = c && c.types || {};
let k = !0, g = 0, h = 0;
for (var n; null != (n = p.exec(u)); ) {
const r = n[2];
if ("%" !== r || "%%" !== n[0]) {
if ("" === r || -1 === "suxXbcdeEfFgGo".indexOf(r)) {
k = !1;
break;
}
null == n[1] ? n = ++h : (n = parseInt(n[1]), g = Math.max(g, n));
null == c[n] && (c[n] = {});
c[n][r] = !0;
}
}
if (k) return {
valid: !0,
count: Math.max(g, h, b),
types: c
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
return v;
}({}, I, L));
C.register("$13", function(v, t, D) {
function y() {
this.init();
}
function p(g) {
g = A('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
C.require("$12", "tooltip.js").init(g);
return g;
}
function u(g) {
return p("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(h) {
h.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function c(g) {
return p("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(h) {
h.preventDefault();
g.fire("poHint");
});
}
function b(g, h) {
return C.require("$6", "string.js").vsprintf(g, h);
}
v.init = function(g) {
const h = new y();
g = h.setRootCell(g);
var n = g.splity("po-list", "po-edit");
let r = n[0], w = n[1];
n = w.splitx("po-trans", "po-comment");
var m = n[0];
let a = n[1].header("Loading..");
n = m.splity("po-source", "po-target");
m = n[0].header("Loading..");
n = n[1].header("Loading..");
g.distribute([ .34 ]);
w.distribute([ .8 ]);
h.setListCell(r);
h.setSourceCell(m);
h.setTargetCell(n);
h.commentCell = a;
h.editable.source = !1;
return h;
};
t = y.prototype = C.require("$30", "base.js").extend(y);
t.getListHeadings = function() {
const g = this.t(), h = [ g._x("Source text", "Editor") ];
this.targetLocale && (h[1] = g._x("Translation", "Editor"));
return h;
};
t.getListColumns = function() {
const g = {
source: 0
};
this.targetLocale && (g.target = 1);
return g;
};
t.getListEntry = function(g) {
const h = this.cellText, n = [ function() {
let r, w = h(g.source() || ""), m = g.context();
return m ? (r = D.createElement("p"), r.appendChild(D.createElement("mark")).innerText = m, 
r.appendChild(D.createTextNode(" " + w)), r) : w;
} ];
this.targetLocale && (n[1] = function() {
return h(g.translation() || "");
});
return n;
};
t.stats = function() {
let g = this.po, h = g.length, n = 0, r = 0, w = 0;
g.each(function(m, a) {
a.fuzzy() ? w++ : a.translated() ? n++ : r++;
});
return {
t: h,
p: n.percent(h) + "%",
f: w,
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
let h = this.$tnav;
if (null == g) h && (h.remove(), this.$tnav = null); else {
h || (this.$tnav = h = A("<nav></nav>").append(u(this)).append(c(this)).appendTo(this.targetCell.header()));
var n = [];
g.translated() ? g.fuzzy() && n.push("po-fuzzy") : n.push("po-empty");
h.attr("class", n.join(" "));
}
};
t.getSorter = function() {
function g(r, w) {
const m = r.weight(), a = w.weight();
return m === a ? h(r, w) : m > a ? -1 : 1;
}
function h(r, w) {
return r.hash().localeCompare(w.hash());
}
const n = this;
return function(r) {
const w = n.po, m = n.locked() ? g : h;
r.sort(function(a, d) {
return m(w.row(a), w.row(d));
});
};
};
t.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const h = [];
let n = this.validateMessagePrintf(g, h);
n && (g.err = h);
return n;
};
t.validateMessagePrintf = function(g, h) {
const n = g.format();
if ("no-" === n.substring(0, 3)) return 0;
const r = g.msgid(), w = g.msgidPlural();
null == k && (k = C.require("$31", "printf.js").init());
var m = k;
if (!("" !== n || m.sniff(r) || "" !== w && m.sniff(w))) return 0;
let a = 0, d = m.parse(r);
w && d.valid && (d = m.parse(w, d));
if (!d.valid) return 0;
let f = d.count;
if (0 !== f || "" !== n) {
var e = this;
g.eachMsg(function(l, q) {
h[l] = [];
if ("" !== q) {
q = m.parse(q);
var x = q.count;
l = h[l];
if (q.valid) if (x > f) l.push(b(e.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ f ])), 
a++; else if (x < f && "" === w) l.push(b(e.t()._("Missing placeholders; source text formatting suggests at least %s"), [ f ])), 
a++; else {
x = d.types;
for (const B in q.types) for (const z in q.types[B]) if (null == x[B] || null == x[B][z]) {
l.push(e.t()._("Mismatching placeholder type; check against source text formatting"));
a++;
return;
}
} else l.push(e.t()._("Possible syntax error in string formatting")), a++;
}
});
return a;
}
};
t.handle = {};
let k;
return v;
}({}, I, L));
C.register("$14", function(v, t, D) {
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
66: function(c, b) {
if (c = b.current()) c.normalize(), b.focus().pasteMessage(c);
},
75: function(c, b) {
if (c = b.current()) c.untranslate(), b.focus().pasteMessage(c);
},
85: function(c, b) {
b.focus().fuzzy(!b.fuzzy());
},
13: function(c, b) {
b.getFirstEditable() && b.next(1, !0, !0);
},
40: function(c, b) {
c = c.shiftKey;
b.next(1, c, c);
},
38: function(c, b) {
c = c.shiftKey;
b.next(-1, c, c);
},
73: function(c, b) {
if (!c.shiftKey) return !1;
b.setInvs(!b.getInvs());
}
};
v.init = function(c, b) {
function k(h) {
if (h.isDefaultPrevented() || !h.metaKey && !h.ctrlKey) return !0;
const n = h.which;
if (!g[n]) return !0;
const r = u[n];
if (!r || h.altKey || h.shiftKey && !p[n] || !1 === r(h, c)) return !0;
h.stopPropagation();
h.preventDefault();
return !1;
}
const g = {};
A(b || t).on("keydown", k);
return {
add: function(h, n) {
u[y[h]] = n;
return this;
},
enable: function() {
for (const h in arguments) g[y[arguments[h]]] = !0;
return this;
},
disable: function() {
A(b || t).off("keydown", k);
c = b = null;
for (const h in u) g[h] = !1;
}
};
};
return v;
}({}, I, L));
C.register("$32", function(v, t, D) {
function y() {
this.reIndex([]);
}
v.init = function() {
return new y();
};
t = y.prototype;
t.reIndex = function(p) {
const u = {}, c = p.length;
let b = -1;
for (;++b < c; ) u[p[b]] = b;
this.keys = p;
this.length = b;
this.ords = u;
};
t.key = function(p, u) {
if (null == u) return this.keys[p];
const c = this.keys[p], b = this.ords[u];
if (u !== c) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[p] = u;
delete this.ords[c];
this.ords[u] = p;
}
return p;
};
t.indexOf = function(p) {
p = this.ords[p];
return null == p ? -1 : p;
};
t.add = function(p, u) {
let c = this.ords[p];
null == c && (this.keys[this.length] = p, c = this.ords[p] = this.length++);
this[c] = u;
return c;
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
const c = [].splice.call(this, p, u);
this.keys.splice(p, u);
this.reIndex(this.keys);
return c;
};
t.each = function(p) {
const u = this.keys, c = this.length;
let b = -1;
for (;++b < c; ) p(u[b], this[b], b);
return this;
};
t.sort = function(p) {
const u = this.length, c = this.keys, b = this.ords, k = [];
let g = -1;
for (;++g < u; ) k[g] = [ this[g], c[g] ];
k.sort(function(n, r) {
return p(n[0], r[0]);
});
for (g = 0; g < u; g++) {
var h = k[g];
this[g] = h[0];
h = h[1];
c[g] = h;
b[h] = g;
}
return this;
};
t.join = function(p) {
return [].join.call(this, p);
};
return v;
}({}, I, L));
C.register("$33", function(v, t, D) {
function y(p, u) {
var c = new RegExp("^.{0," + (p - 1) + "}[" + u + "]"), b = new RegExp("^[^" + u + "]+");
return function(k, g) {
for (var h = k.length, n; h > p; ) {
n = c.exec(k) || b.exec(k);
if (null == n) break;
n = n[0];
g.push(n);
n = n.length;
h -= n;
k = k.substring(n);
}
0 !== h && g.push(k);
return g;
};
}
v.create = function(p) {
function u(r) {
return g[r] || "\\" + r;
}
var c = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == p || isNaN(p = Number(p))) p = 79;
if (0 < p) {
var h = y(p - 3, " ");
var n = y(p - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(r, w) {
if (!w) return r + ' ""';
w = w.replace(k, u);
var m = 0;
w = w.replace(c, function() {
m++;
return "\\n\n";
});
if (!(m || p && p < w.length + r.length + 3)) return r + ' "' + w + '"';
r = [ r + ' "' ];
w = w.split("\n");
if (n) for (var a = -1, d = w.length; ++a < d; ) n(w[a], r); else r = r.concat(w);
return r.join('"\n"') + '"';
},
prefix: function(r, w) {
r = r.split(c);
return w + r.join("\n" + w);
},
refs: function(r) {
r = r.replace(b, " ", r);
h && (r = h(r, []).join("\n#: "));
return "#: " + r;
}
};
};
return v;
}({}, I, L));
C.register("$46", function(v, t, D) {
function y() {
this.length = 0;
}
v.init = function() {
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
for (var u = -1, c = this.length; ++u < c; ) p(u, this[u]);
return this;
};
return v;
}({}, I, L));
C.register("$34", function(v, t, D) {
function y() {}
v.extend = function(p) {
return p.prototype = new y();
};
t = y.prototype = C.require("$44", "abstract.js").init([ "load" ]);
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
null == p ? p = this.loc : this.loc = p = C.require("$43", "locale.js").cast(p);
return p;
};
t.source = function(p) {
null == p ? p = this.src || C.require("$43", "locale.js").cast({
lang: "en",
label: "English",
nplurals: 2,
pluraleq: "n!=1"
}) : this.src = p = C.require("$43", "locale.js").cast(p);
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
if (u && u.length) return this.length = this.rows.length, this.rows.each(function(c, b, k) {
b.idx = k;
}), p;
}
};
t.reIndex = function(p, u) {
const c = p.hash(), b = this.indexOf(p), k = this.rows.indexOf(c);
return k === b ? b : -1 !== k ? (u = (u || 0) + 1, p.source("Error, duplicate " + String(u) + ": " + p.source()), 
this.reIndex(p, u)) : this.rows.key(b, c);
};
t.sort = function(p) {
this.rows.sort(p);
return this;
};
t.export = function() {
const p = this.rows, u = p.length, c = C.require("$46", "list.js").init();
let b = -1;
for (;++b < u; ) c.push(p[b]);
return c;
};
return v;
}({}, I, L));
C.register("$35", function(v, t, D) {
function y(c, b, k) {
if (null == k) return c[b] || "";
c[b] = k || "";
return c;
}
function p() {
this._id = this.id = "";
}
function u(c, b) {
const k = c.length;
let g = -1;
for (;++g < k; ) b(g, c[g]);
}
v.extend = function(c) {
return c.prototype = new p();
};
t = p.prototype;
t.flag = function(c, b) {
const k = this.flg || (this.flg = []);
if (null != b) k[b] = c; else for (b = Math.max(k.length, this.src.length, this.msg.length); 0 !== b--; ) k[b] = c;
return this;
};
t.flagged = function(c) {
return (this.flg || [])[c || 0] || 0;
};
t.hasFlag = function() {
const c = this.flg || [];
let b = c.length;
for (;0 !== b--; ) if (this.isFlag(c[b])) return !0;
return !1;
};
t.isFlag = function(c) {
return 0 < c;
};
t.flags = function() {
const c = {}, b = [], k = this.flg || [];
let g = k.length;
for (;0 !== g--; ) {
const h = k[g];
c[h] || (c[h] = !0, b.push(h));
}
return b;
};
t.flaggedAs = function(c, b) {
const k = this.flg || [];
if (null != b) return c === k[b] || 0;
for (b = k.length; 0 !== b--; ) if (k[b] === c) return !0;
return !1;
};
t.fuzzy = function(c, b) {
const k = this.flaggedAs(4, c);
null != b && this.flag(b ? 4 : 0, c);
return k;
};
t.source = function(c, b) {
if (null == c) return this.src[b || 0] || "";
this.src[b || 0] = c;
return this;
};
t.plural = function(c, b) {
if (null == c) return this.src[b || 1] || "";
this.src[b || 1] = c || "";
return this;
};
t.sourceForms = function() {
return this.srcF;
};
t.targetForms = function() {
return this.msgF;
};
t.each = function(c) {
const b = this.src, k = this.msg, g = Math.max(b.length, k.length);
let h = -1;
for (;++h < g; ) c(h, b[h], k[h]);
return this;
};
t.eachSrc = function(c) {
u(this.src, c);
return this;
};
t.eachMsg = function(c) {
u(this.msg, c);
return this;
};
t.count = function() {
return Math.max(this.src.length, this.msg.length);
};
t.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
t.translate = function(c, b) {
this.msg[b || 0] = c || "";
return this;
};
t.untranslate = function(c) {
if (null != c) this.msg[c] = ""; else {
const b = this.msg, k = b.length;
for (c = 0; c < k; c++) b[c] = "";
}
return this;
};
t.translation = function(c) {
return this.msg[c || 0] || "";
};
t.errors = function(c) {
return this.err && this.err[c || 0] || [];
};
t.valid = function() {
return null == this.err;
};
t.translated = function(c) {
if (null != c) return !!this.msg[c];
const b = this.msg, k = b.length;
for (c = 0; c < k; c++) if (!b[c]) return !1;
return !0;
};
t.untranslated = function(c) {
if (null != c) return !this.msg[c];
const b = this.msg, k = b.length;
for (c = 0; c < k; c++) if (b[c]) return !1;
return !0;
};
t.comment = function(c) {
return y(this, "cmt", c);
};
t.notes = function(c) {
return y(this, "xcmt", c);
};
t.refs = function(c) {
return y(this, "rf", c);
};
t.format = function(c) {
return y(this, "fmt", c);
};
t.context = function(c) {
return y(this, "ctx", c);
};
t.tags = function() {
return this.tg;
};
t.getMax = function(c) {
return (this.mx || [ 0 ])[c] || 0;
};
t.toString = t.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
t.weight = function() {
let c = 0;
this.translation() || (c += 2);
this.fuzzy() && (c += 1);
return c;
};
t.equals = function(c) {
return this === c || this.hash() === c.hash();
};
t.hash = function() {
return this.id;
};
t.normalize = function() {
let c = -1, b = this.msg.length;
for (;++c < b; ) this.msg[c] = this.src[Math.min(c, 1)] || "";
};
t.disabled = function(c) {
return !!(this.lck || [])[c || 0];
};
t.disable = function(c) {
(this.lck || (this.lck = []))[c || 0] = !0;
return this;
};
t.saved = function(c) {
const b = this.drt;
if (null == b) return !0;
if (null != c) return !b[c];
for (c = b.length; 0 !== c--; ) if (b[c]) return !1;
return !0;
};
t.unsave = function(c) {
(this.drt || (this.drt = []))[c || 0] = !0;
return this;
};
t.save = function(c) {
null == c ? this.drt = null : (this.drt || (this.drt = []))[c] = !1;
return this;
};
t.is = function(c) {
return c && (c === this || c.idx === this.idx);
};
t.isHTML = function(c) {
if (null == c) return this.htm || !1;
this.htm = c;
};
t = null;
return v;
}({}, I, L));
C.register("$15", function(v, t, D) {
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
function p(g, h) {
g = g || "";
h && (g += "\0" + h);
return g;
}
function u(g) {
const h = t.console;
h && h.error && h.error(g.message || String(g));
}
function c(g) {
return C.require("$33", "format.js").create(g);
}
function b(g) {
this.locale(g);
this.clear();
this.head = y(this.now());
}
function k(g, h) {
this.src = [ g || "" ];
this.msg = [ h || "" ];
}
v.create = function(g) {
return new b(g);
};
D = C.require("$34", "messages.js").extend(b);
D.clear = function() {
this.rows = C.require("$32", "collection.js").init();
this.length = 0;
return this;
};
D.now = function() {
function g(a, d) {
for (a = String(a); a.length < d; ) a = "0" + a;
return a;
}
var h = new Date();
const n = h.getUTCFullYear(), r = h.getUTCMonth() + 1, w = h.getUTCDate(), m = h.getUTCHours();
h = h.getUTCMinutes();
return g(n, 4) + "-" + g(r, 2) + "-" + g(w, 2) + " " + g(m, 2) + ":" + g(h, 2) + "+0000";
};
D.header = function(g, h) {
const n = this.head || (this.head = {});
if (null == h) return this.headers()[g] || "";
n[g] = h || "";
return this;
};
D.headers = function(g) {
const h = this.now(), n = this.head || (this.head = y(h));
if (null != g) {
for (w in g) n[w] = g[w];
return this;
}
const r = this.locale();
g = {};
for (w in n) g[w] = String(n[w]);
if (r) {
g.Language = String(r) || "zxx";
g["Language-Team"] = r.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (r.nplurals || "2") + "; plural=" + (r.pluraleq || "n!=1") + ";";
var w = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", w = "POT-Creation-Date";
g[w] || (g[w] = h);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
D.get = function(g, h) {
g = p(g, h);
return this.rows.get(g);
};
D.add = function(g, h) {
g instanceof k || (g = new k(g));
h && g.context(h);
h = g.hash();
this.rows.get(h) ? u("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(h, g), 
this.length = this.rows.length);
return g;
};
D.load = function(g) {
let h = -1, n, r;
var w;
let m, a, d, f = (w = this.locale()) && w.nplurals || 2, e = [];
for (;++h < g.length; ) n = g[h], null == n.parent ? (r = n.source || n.id, w = n.target || "", 
m = n.context, r || m ? (a = new k(r, w), a._id = n._id, m && a.context(m), n.flag && a.flag(n.flag, 0), 
n.comment && a.comment(n.comment), n.notes && a.notes(n.notes), n.refs && a.refs(n.refs), 
a.format(n.format), n.message = a, this.add(a), n.prev && n.prev[0] && (a.prev(n.prev[0].source, n.prev[0].context), 
n.prev[1] && a._src.push(n.prev[1].source || ""))) : 0 === h && "object" === typeof w && (this.head = w, 
this.headcmt = n.comment)) : e.push(n);
for (h = -1; ++h < e.length; ) try {
n = e[h];
r = n.source || n.id;
a = g[n.parent] && g[n.parent].message;
if (!a) throw Error("parent missing for plural " + r);
d = n.plural;
1 === d && a.plural(r);
d >= f || (n.flag && a.flag(n.flag, d), a.translate(n.target || "", d), n.format && !a.format() && a.format(n.format));
} catch (l) {
u(l);
}
return this;
};
D.wrap = function(g) {
this.fmtr = c(g);
return this;
};
D.toString = function() {
var g, h = this.locale(), n = [], r = [], w = this.headers(), m = !h, a = h && h.nplurals || 2, d = this.fmtr || c();
w[h ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in w) r.push(g + ": " + w[g]);
r = new k("", r.join("\n"));
r.comment(this.headcmt || "");
m && r.fuzzy(0, !0);
n.push(r.toString());
n.push("");
this.rows.each(function(f, e) {
f && (n.push(e.cat(d, m, a)), n.push(""));
});
return n.join("\n");
};
D = C.require("$35", "message.js").extend(k);
D.msgid = function() {
return this.src[0];
};
D.msgidPlural = function() {
return this.src[1] || "";
};
D.prev = function(g, h) {
this._src = [ g || "" ];
this._ctx = h;
};
D.hash = function() {
return p(this.source(), this.context());
};
D.toString = function() {
return this.cat(c());
};
D.cat = function(g, h, n) {
var r = [], w;
(w = this.cmt) && r.push(g.prefix(w, "# "));
(w = this.xcmt) && r.push(g.prefix(w, "#. "));
var m = this.rf;
if (w = this._id) m += (m ? " " : "") + "loco:" + w;
m && /\S/.test(m) && r.push(g.refs(m));
!h && this.fuzzy() && r.push("#, fuzzy");
(w = this.fmt) && r.push("#, " + w + "-format");
(w = this._ctx) && r.push(g.prefix(g.pair("msgctxt", w), "#| "));
if (w = this._src) w[0] && r.push(g.prefix(g.pair("msgid", w[0]), "#| ")), w[1] && r.push(g.prefix(g.pair("msgid_plural", w[1]), "#| "));
(w = this.ctx) && r.push(g.pair("msgctxt", w));
r.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) r.push(g.pair("msgstr", h ? "" : this.msg[0])); else for (m = -1, 
r.push(g.pair("msgid_plural", this.src[1])), w = this.msg || [ "", "" ], n = n || w.length; ++m < n; ) r.push(g.pair("msgstr[" + m + "]", h ? "" : w[m] || ""));
return r.join("\n");
};
D.compare = function(g, h) {
let n = this.weight(), r = g.weight();
if (n > r) return 1;
if (n < r) return -1;
if (h) {
n = this.hash().toLowerCase();
r = g.hash().toLowerCase();
if (n < r) return 1;
if (n > r) return -1;
}
return 0;
};
D.copy = function() {
let g = new k(), h, n;
for (h in this) this.hasOwnProperty(h) && ((n = this[h]) && n.concat && (n = n.concat()), 
g[h] = n);
return g;
};
return v;
}({}, I, L));
C.register("$17", function(v, t, D) {
v.init = function(y, p) {
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
function c(h, n, r) {
h = A("<p></p>").text(r);
u().dialog("close").html("").dialog("option", "title", "Error").append(h).dialog("open");
}
function b(h) {
const n = h && h.code;
if (n) {
for (var r = n.length, w = A("<ol></ol>").attr("class", h.type), m = -1; ++m < r; ) A("<li></li>").html(n[m]).appendTo(w);
0 !== h.line && w.find("li").eq(h.line - 1).attr("class", "highlighted");
u().dialog("close").html("").dialog("option", "title", h.path + ":" + h.line).append(w).dialog("open");
}
}
function k(h) {
h = h.target;
const n = A(h).find("li.highlighted")[0];
h.scrollTop = Math.max(0, (n && n.offsetTop || 0) - Math.floor(h.clientHeight / 2));
}
let g;
return {
load: function(h) {
u().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", k);
h = A.extend({
ref: h,
path: p.popath
}, p.project || {});
y.ajax.post("fsReference", h, b, c);
}
};
};
return v;
}({}, I, L));
C.register("$18", function(v, t, D) {
function y() {
this.inf = {};
}
function p() {
const b = D.createElement("p"), k = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let h, n;
return {
sniff: function(r) {
if (r === h) return n;
h = r;
if (k.test(r) || g.test(r)) if (b.innerHTML = r, b.textContent !== r) return n = !0;
return n = !1;
}
};
}
v.create = function(b, k) {
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
const h = b.responseText, n = h && t.JSON.parse(h);
g = n && this.parseError(n) || g;
} catch (h) {}
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
var h = b.lang;
k = k[g] || k[h] || [];
b = k.length;
if (0 === b) return h;
if (1 < b) for (h = -1; ++h < b; ) {
const n = k[h];
if (n === g) return n;
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
const g = [], h = b.length;
for (let n = 0; n < h; n++) g.push(b[n][k]);
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
b.error = function(g, h, n) {
k.stderr(k.xhrError(g, h, n));
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
return (c || (c = p())).sniff(b);
};
let c;
return v;
}({}, I, L));
C.register("$19", function(v, t, D) {
function y(p) {
this.api = p;
this.chars = 0;
}
v.create = function(p) {
return new y(p);
};
t = y.prototype;
t.init = function(p, u) {
function c(f) {
let e = {
id: k.length,
length: 0,
html: f.html,
items: []
};
k.push(e);
return h[f.html ? 1 : 0] = e;
}
function b(f, e, l) {
var q = f.source(null, l);
if (q && (f.untranslated(l) || u)) {
{
l = f.notes();
const B = f.context();
f = q.length;
var x = g.isHtml(q);
q = {
source: q,
context: B,
notes: l
};
l = h[x ? 1 : 0];
x = l.items;
if (a && f > a) w++, f = void 0; else {
if (l.length + f > m || 50 === x.length) l = c(l), x = l.items;
x.push(q);
l.length += f;
n += f;
r += 1;
f = q;
}
}
f && (f.id = e);
}
}
const k = [], g = this.api;
let h = [], n = 0, r = 0, w = 0, m = 1e4, a = g.maxChr();
a && (m = Math.min(m, a));
c({
html: !1
});
c({
html: !0
});
const d = p.locale();
p.each(1 < d.nplurals ? function(f, e, l) {
b(e, l, 0);
b(e, l, 1);
} : function(f, e, l) {
b(e, l, 0);
});
h = [];
this.chars = n;
this.length = r;
this.batches = k;
this.locale = d;
w && g.stderr("Strings over " + m + " characters long will be skipped");
};
t.abort = function() {
this.state = "abort";
return this;
};
t.dispatch = function(p) {
function u(z, E) {
if (!b()) return !1;
if (!E) return !0;
f++;
const F = p.row(z.id), H = z.source;
let G = 0;
F.each(function(M, O, R) {
E !== R && (H === O || 1 < M && F.source(null, 1) === H) && (F.translate(E, M), 
G++, l++);
});
G && r("each", [ F ]);
}
function c(z) {
return function(E, F) {
u(z[E], F);
return !0;
};
}
function b() {
return "abort" === w.state ? (m && (m.abort(), n()), !1) : !0;
}
function k() {
const z = a.shift();
if (z) {
const E = z.items;
E && E.length ? m.batch(E, d, z.html, c(E)).fail(g).always(h) : h();
} else n();
}
function g() {
w.abort();
n();
}
function h() {
e++;
r("prog", [ e, x ]);
b() && k();
}
function n() {
m = a = null;
r("done");
}
function r(z, E) {
z = B[z] || [];
let F = z.length;
for (;0 <= --F; ) z[F].apply(null, E);
}
let w = this, m = w.api, a = w.batches || [], d = w.locale, f = 0, e = 0, l = 0, q = w.length, x = a.length, B = {
done: [],
each: [],
prog: []
};
w.state = "";
k();
return {
done: function(z) {
B.done.push(z);
return this;
},
each: function(z) {
B.each.push(z);
return this;
},
prog: function(z) {
B.prog.push(z);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(q - f, 0);
},
did: function() {
return f;
}
};
}
};
};
return v;
}({}, I, L));
C.register("$20", function(v, t, D) {
function y() {}
v.create = function(p) {
(y.prototype = new p()).batch = function(u, c, b, k) {
function g(w) {
let m = -1;
for (;++m < n && !1 !== k(m, w[m], c); );
}
const h = t.loco, n = u.length;
u = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(c),
source: this.getSrc(),
sources: u
};
const r = A.Deferred();
this.abortable(h.ajax.post("apis", u, function(w) {
g(w && w.targets || []);
r.resolve();
}, function() {
g([]);
r.reject();
}));
return r.promise();
};
return new y();
};
return v;
}({}, I, L));
C.register("$37", {
pt: [ "pt", "pt-pt", "pt-br" ],
en: [ "en", "en-gb", "en-us" ]
});
C.register("$21", function(v, t, D) {
function y() {}
v.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "DeepL Translator";
};
p.parseError = function(u) {
const c = (u = u.message) && /^Wrong endpoint\. Use (https?:\/\/[-.a-z]+)/.exec(u);
c && this.base(this.key()) === c[1] && (u = "Only the v2 API is supported");
return u;
};
p.base = function(u) {
let c = this.param("api");
c ? c = this.fixURL(c) : (c = "https://api", ":fx" === u.substring(u.length - 3) && (c += "-free"), 
c += ".deepl.com");
return c;
};
p.getLangMap = function() {
return C.require("$37", "deepl.json");
};
p.verify = function(u) {
const c = this.key(), b = this.base(c);
return this._call({
url: b + "/v2/usage",
data: {
auth_key: c
}
}).done(function(k) {
const g = k && k.character_limit;
k = k && k.character_count;
u(!0, g && g <= k ? "OK, but quota exceeded" : "");
}).fail(function() {
u(!1);
});
};
p.batch = function(u, c, b, k) {
function g(l) {
const q = m.length;
let x = -1;
for (;++x < q && !1 !== k(x, (l[x] || {}).text || "", c); );
}
const h = this;
b = h.key();
const n = h.base(b), r = h.getSrc().substring(0, 2), w = h.mapLang(c, h.getLangMap()), m = this.unwind(u, "source"), a = h.param("glossary_id") || "", d = h.param("preserve_formatting") || "1";
var f = {
formal: "prefer_more",
informal: "prefer_less"
};
f = this.param("formality") || f[c.tone] || "default";
let e = this.param("context") || "";
"" === e && 1 === u.length && (e = this.contextualize(u[0]));
return h._call({
url: n + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: r.toUpperCase(),
target_lang: w.toUpperCase(),
formality: f,
preserve_formatting: d,
glossary_id: a,
auth_key: b,
context: e,
text: m
}
}).done(function(l, q, x) {
l.translations ? g(l.translations) : (h.stderr(h.parseError(l) || h.httpError(x)), 
g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$38", {
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
C.register("$22", function(v, t, D) {
function y() {}
v.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "Google Translate";
};
p.parseError = function(u) {
if (u.error) {
const c = [], b = u.error.errors || [], k = b.length;
let g = -1;
for (;++g < k; ) c.push(b[g].message || "");
return "Error " + u.error.code + ": " + c.join(";");
}
return "";
};
p.getLangMap = function() {
return C.require("$38", "google.json");
};
p.batch = function(u, c, b, k) {
function g(m) {
const a = w.length;
let d = -1;
for (;++d < a && !1 !== k(d, (m[d] || {}).translatedText || "", c); );
}
const h = this, n = h.getSrc();
b = b ? "html" : "text";
const r = h.mapLang(c, h.getLangMap()), w = this.unwind(u, "source");
return h._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + n + "&target=" + r + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: h.key(),
q: w
}
}).done(function(m, a, d) {
m.data ? g(m.data.translations || []) : (h.stderr(h.parseError(m) || h.httpError(d)), 
g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$39", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
C.register("$23", function(v, t, D) {
function y() {}
v.create = function(p) {
p = y.prototype = new p();
p.parseError = function(u) {
var c = u.details || {};
let b = c.message;
c = c.texts;
return b ? (c && c !== b && (b += "; " + c), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (u.status || "0") + ": " + b) : "";
};
p.maxChr = function() {
return 1e3;
};
p.getLangMap = function() {
return C.require("$39", "lecto.json");
};
p.batch = function(u, c, b, k) {
function g(m) {
const a = w.length;
let d = -1, f = (m[0] || {
translated: []
}).translated || [];
for (;++d < a && (m = f[d] || "", !1 !== k(d, m, c)); );
}
const h = this;
b = this.getSrc();
const n = h.param("api") || "https://api.lecto.ai", r = h.mapLang(c, h.getLangMap()), w = this.unwind(u, "source");
return h._call({
url: h.fixURL(n + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ r ],
from: b,
texts: w
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": h.key(),
Accept: "application/json"
}
}).done(function(m, a, d) {
m ? g(m.translations || []) : (h.stderr(h.parseError(m) || h.httpError(d)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$40", {
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
C.register("$24", function(v, t, D) {
function y() {}
v.create = function(p) {
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
return C.require("$40", "ms.json");
};
p.region = function() {
return this.param("region") || "global";
};
p.hash = function() {
return this.key() + this.region();
};
p.batch = function(u, c, b, k) {
function g(d) {
let f = -1;
for (var e; ++f < w && (e = d[f] || {}, e = e.translations || [], e = e[0] || {}, 
!1 !== k(f, e.text || "", c)); );
}
let h = this, n = [], r = h.getSrc();
u = this.unwind(u, "source");
let w = u.length, m = -1;
b = b ? "html" : "plain";
let a = h.mapLang(c, h.getLangMap());
for (;++m < w; ) n.push({
Text: u[m]
});
return h._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + r + "&to=" + a + "&textType=" + b,
method: "POST",
data: JSON.stringify(n),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": h.region()
}
}).done(function(d, f, e) {
d && d.length ? g(d) : (h.stderr(h.parseError(d) || h.httpError(e)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$25", function(v, t, D) {
v.init = function(y) {
function p() {
O || (E.on("click", n), O = A('<div id="loco-fs-creds"></div>').dialog({
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
H && (c(A(d)), H = !1);
if (l && M) {
var J = M, Q = A(F);
Q.find("span.loco-msg").text(J);
G || (Q.removeClass("jshide").hide().fadeIn(500), G = !0);
} else G && (c(A(F)), G = !1);
}
function c(J) {
J.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function b() {
if (l) return O && O.dialog("close"), u(), A(y).find('button[type="submit"]').attr("disabled", !1), 
A(t).triggerHandler("resize"), a && a(!0), !0;
x && O ? (H || (A(d).removeClass("jshide").hide().fadeIn(500), H = !0), G && (c(A(F)), 
G = !1)) : u();
A(y).find('input[type="submit"]').attr("disabled", !0);
a && a(!1);
return !1;
}
function k(J) {
var Q, V = R || {};
for (Q in V) if (V.hasOwnProperty(Q)) {
var ia = V[Q];
J[Q] ? J[Q].value = ia : A('<input type="hidden" />').attr("name", Q).appendTo(J).val(ia);
}
}
function g(J) {
J.preventDefault();
J = A(J.target).serializeArray();
m(J);
e = !0;
return !1;
}
function h(J) {
J.preventDefault();
O.dialog("close");
return !1;
}
function n(J) {
J.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function r(J) {
l = J.authed;
f = J.method;
A(d).find("span.loco-msg").text(J.message || "Something went wrong.");
M = J.warning || "";
J.notice && q.notices.info(J.notice);
if (l) "direct" !== f && (R = J.creds, k(y), e && J.success && q.notices.success(J.success)), 
b(); else if (J.reason) q.notices.info(J.reason); else if (J = J.prompt) {
var Q = p();
Q.html(J).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", h);
Q.find('input[type="submit"]').addClass("button-primary");
b();
A(t).triggerHandler("resize");
} else q.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function w() {
b();
}
function m(J) {
e = !1;
q.ajax.setNonce("fsConnect", z).post("fsConnect", J, r, w);
return J;
}
var a, d = y, f = null, e = !1, l = !1, q = t.loco, x = y.path.value, B = y.auth.value, z = y["loco-nonce"].value, E = A(d).find("button.button-primary"), F = D.getElementById(d.id + "-warn"), H = !1, G = !1, M = "", O;
q.notices.convert(F).stick();
if (y.connection_type) {
var R = {};
R.connection_type = y.connection_type.value;
l = !0;
} else x && B && m({
path: x,
auth: B
});
b();
return {
applyCreds: function(J) {
if (J.nodeType) k(J); else {
var Q, V = R || {};
for (Q in V) V.hasOwnProperty(Q) && (J[Q] = V[Q]);
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
x = y.path.value;
B = y.auth.value;
m(A(y).serializeArray());
return this;
},
listen: function(J) {
a = J;
l && J(!0);
return this;
},
authed: function() {
return l;
}
};
};
return v;
}({}, I, L));
C.register("$41", function(v, t, D) {
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
function c(b) {
return function(k, g) {
return -1 * b(k, g);
};
}
v.sort = function(b, k, g, h) {
k = "n" === g ? p(k) : u(k);
h && (k = c(k));
return y([].sort, [ k ])(b);
};
return v;
}({}, I, L));
C.register("$26", function(v, t, D) {
v.init = function(y) {
function p(d) {
let f = -1;
const e = d.length;
for (A("tr", r).remove(); ++f < e; ) r.appendChild(d[f].$);
}
function u(d) {
g = d ? m.find(d, c) : c.slice(0);
n && (d = b[n], g = a(g, n, d.type, d.desc));
p(g);
}
let c = [], b = [], k = 0, g, h, n, r = y.getElementsByTagName("tbody")[0];
var w = y.getElementsByTagName("thead")[0];
let m = C.require("$10", "fulltext.js").init(), a = C.require("$41", "sort.js").sort;
w && r && (A("th", w).each(function(d, f) {
const e = f.getAttribute("data-sort-type");
e && (d = k, A(f).addClass("loco-sort").on("click", function(l) {
l.preventDefault();
{
l = d;
let q = b[l], x = q.type, B = !(q.desc = !q.desc);
g = a(g || c.slice(0), l, x, B);
p(g);
h && h.removeClass("loco-desc loco-asc");
h = A(q.$).addClass(B ? "loco-desc" : "loco-asc").removeClass(B ? "loco-asc" : "loco-desc");
n = l;
}
return !1;
}), b[k] = {
$: f,
type: e
});
f.hasAttribute("colspan") ? k += Number(f.getAttribute("colspan")) : k++;
}), A("tr", r).each(function(d, f) {
let e, l = [], q = {
_: d,
$: f
}, x = f.getElementsByTagName("td");
for (e in b) {
const B = x[e];
(f = B.textContent.replace(/(^\s+|\s+$)/g, "")) && l.push(f);
B.hasAttribute("data-sort-value") && (f = B.getAttribute("data-sort-value"));
switch (b[e].type) {
case "n":
f = Number(f);
}
q[e] = f;
}
c[d] = q;
m.index(d, l);
}), y = A('form.loco-filter input[type="text"]', y.parentNode), y.length && (y = y[0], 
w = A(y.form), 1 < c.length ? C.require("$11", "LocoTextListener.js").listen(y, u) : w.hide(), 
w.on("submit", function(d) {
d.preventDefault();
return !1;
})));
};
return v;
}({}, I, L));
const T = I.loco || {}, ja = T.conf || {
$v: []
};
I = C.require("$1", "t.js").init();
L = ja.wplang;
T.version = function(v) {
return ja.$v[v || 0] || "0";
};
C.require("$2", "html.js");
C.require("$3", "number.js");
C.require("$4", "array.js");
C.require("$5", "json.js");
T.l10n = I;
I.load(ja.wpl10n);
L && I.pluraleq(L.pluraleq);
T.string = C.require("$6", "string.js");
T.notices = C.require("$7", "notices.js").init(I);
T.ajax = C.require("$8", "ajax.js").init(ja).localise(I);
T.locale = C.require("$9", "wplocale.js");
T.fulltext = C.require("$10", "fulltext.js");
T.watchtext = C.require("$11", "LocoTextListener.js").listen;
T.tooltip = C.require("$12", "tooltip.js");
T.po = {
ed: C.require("$13", "poedit.js"),
kbd: C.require("$14", "hotkeys.js"),
init: C.require("$15", "po.js").create,
ace: C.require("$16", "ace.js").strf("php"),
ref: C.require("$17", "refs.js")
};
T.apis = C.require("$18", "client.js");
T.apis.createJob = C.require("$19", "job.js").create;
T.apis.providers = function() {
return {
_: C.require("$20", "wordpress.js"),
deepl: C.require("$21", "deepl.js"),
google: C.require("$22", "google.js"),
lecto: C.require("$23", "lecto.js"),
microsoft: C.require("$24", "microsoft.js")
};
};
T.fs = C.require("$25", "fsconn.js");
A("#loco-admin.wrap table.wp-list-table").each(function(v, t) {
C.require("$26", "tables.js").init(t);
});
T.validate = function(v) {
v = (v = /^\d+\.\d+\.\d+/.exec(v && v[0] || "")) && v[0];
if ("2.7.1" === v) return !0;
T.notices.warn("admin.js is the wrong version (" + v + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
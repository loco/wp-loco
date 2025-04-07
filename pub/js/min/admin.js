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
include: function(D, y, q) {
return t[D] || (q ? v(y) : null);
}
};
}();
C.register("$1", function(v, t, D) {
function y(q) {
const u = typeof q;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(q)) console.error("Invalid plural: " + q); else return new Function("n", "return " + q);
"function" !== u && (q = function(d) {
return 1 != d;
});
return q;
}
v.init = function(q) {
function u(h, n, r) {
return (h = g[h]) && h[r] ? h[r] : n || "";
}
function d(h) {
return u(h, h, 0);
}
function b(h, n) {
return u(n + "" + h, h, 0);
}
function k(h, n, r) {
r = Number(q(r));
isNaN(r) && (r = 0);
return u(h, r ? n : h, r);
}
q = y(q);
let g = {};
return {
__: d,
_x: b,
_n: k,
_: d,
x: b,
n: k,
load: function(h) {
g = h || {};
return this;
},
pluraleq: function(h) {
q = y(h);
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
Number.prototype.format = function(y, q, u) {
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
d = y.join(u || ",");
if (b) {
{
u = b;
y = u.length;
let g;
for (;"0" === u.charAt(--y); ) g = y;
g && (u = u.substring(0, g));
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
return v;
}({}, I, L));
C.register("$4", function(v, t, D) {
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
v.trim = function(y, q) {
for (q || (q = " \n"); y && -1 !== q.indexOf(y.charAt(0)); ) y = y.substring(1);
for (;y && -1 !== q.indexOf(y.slice(-1)); ) y = y.substring(0, y.length - 1);
return y;
};
v.sprintf = function(y) {
return v.vsprintf(y, [].slice.call(arguments, 1));
};
v.vsprintf = function(y, q) {
let u = 0;
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, b, k) {
if ("%" === k) return "%";
d = b ? q[Number(b) - 1] : q[u++];
return null != d ? String(d) : "s" === k ? "" : "0";
});
};
return v;
}({}, I, L));
C.register("$26", function(v, t, D) {
function y(q) {
return function(u, d) {
let b = u[q] || 0;
for (;(u = u.offsetParent) && u !== (d || D.body); ) b += u[q] || 0;
return b;
};
}
v.top = y("offsetTop");
v.left = y("offsetLeft");
v.el = function(q, u) {
q = D.createElement(q || "div");
u && (q.className = u);
return q;
};
v.txt = function(q) {
return D.createTextNode(q || "");
};
v.rect = function(q) {
return q.getBoundingClientRect();
};
return v;
}({}, I, L));
C.register("$7", function(v, t, D) {
function y(f, e, l) {
function p() {
x();
B = setTimeout(e, l);
}
function x() {
B && clearTimeout(B);
B = 0;
}
let B = 0;
p();
A(f).on("mouseenter", x).on("mouseleave", p);
return {
die: function() {
x();
A(f).off("mouseenter mouseleave");
}
};
}
function q(f, e) {
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
q(A(f), 250);
B && B.die();
var G;
if (G = H) H.stopPropagation(), H.preventDefault(), G = !1;
return G;
}
function p(H) {
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
e && (B = p(e));
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
p(H || 1e4);
return this;
}
};
}
function d(f, e, l) {
const p = C.require("$26", "dom.js").el;
f = A('<div class="notice notice-' + f + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const x = A(p("p"));
l = A(p("span")).text(l);
e = A(p("strong", "has-icon")).text(e + ": ");
x.append(e).append(l).appendTo(f);
return f;
}
function b(f, e, l, p) {
f = d(l, e, f).css("opacity", "0").fadeTo(500, 1);
A(t).triggerHandler("resize");
return u(f, p);
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
let r = [], w, m, a, c;
v.error = function(f) {
return b(f, w, "error");
};
v.warn = k;
v.info = function(f) {
return b(f, a, "info");
};
v.success = function(f) {
return b(f, c, "success", 5e3);
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
const p = e[f];
p && p.call && p();
}
r = [];
return v;
};
v.create = d;
v.raise = function(f) {
(v[f.type] || v.error).call(v, f.message);
};
v.convert = u;
v.init = function(f) {
w = f._("Error");
m = f._("Warning");
a = f._("Notice");
c = f._("OK");
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
function q(m) {
return (m = m.split(/[\r\n]/)[0]) ? (m = m.replace(/ +in +\S+ on line \d+/, ""), 
m = m.replace(/^[()! ]+Fatal error:\s*/, "")) : r._("Server returned invalid data");
}
function u(m) {
t.console && console.error && console.error('No nonce for "' + m + '"');
return "";
}
function d(m, a, c) {
m[a] = c;
}
function b(m, a, c) {
m.push({
name: a,
value: c
});
}
function k(m, a, c) {
m.append(a, c);
}
function g(m, a, c, f) {
function e(p, x, B) {
if ("abort" !== x) {
var z = r || {
_: function(O) {
return O;
}
}, E = p.status || 0, F = p.responseText || "", H = y(F), G = p.getResponseHeader("Content-Type") || "Unknown type", M = p.getResponseHeader("Content-Length") || F.length;
"success" === x && B ? l.error(B) : (l.error(q(H) + ".\n" + z._("Check console output for debugging information")), 
l.log("Ajax failure for " + m, {
status: E,
error: x,
message: B,
output: F
}), "parsererror" === x && (B = "Response not JSON"), l.log([ z._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (B || z._("Unknown error")) + '" (' + G + " " + M + " bytes)", H, "====" ].join("\n")));
c && c.call && c(p, x, B);
w = p;
}
}
f.url = h;
f.dataType = "json";
const l = C.require("$7", "notices.js").clear();
w = null;
return A.ajax(f).fail(e).done(function(p, x, B) {
const z = p && p.data, E = p && p.notices, F = E && E.length;
!z || p.error ? e(B, x, p && p.error && p.error.message) : a && a(z, x, B);
for (p = -1; ++p < F; ) l.raise(E[p]);
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
v.parse = q;
v.submit = function(m, a, c) {
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
const p = A(m), x = p.serialize();
(function(B) {
B.find(".button-primary").addClass("loading");
B.find("button").each(f);
B.find("input").each(f);
B.find("select").each(f);
B.find("textarea").each(f);
B.addClass("disabled loading");
})(p);
return g(m.route.value, function(B, z, E) {
l(p);
a && a(B, z, E);
}, function(B, z, E) {
l(p);
c && c(B, z, E);
}, {
type: m.method,
data: x
});
};
v.post = function(m, a, c, f) {
let e = !0, l = a || {}, p = n[m] || u(m);
t.FormData && l instanceof FormData ? (e = !1, a = k) : a = Array.isArray(l) ? b : d;
a(l, "action", "loco_json");
a(l, "route", m);
a(l, "loco-nonce", p);
return g(m, c, f, {
type: "post",
data: l,
processData: e,
contentType: e ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
v.get = function(m, a, c, f) {
a = a || {};
const e = n[m] || u(m);
a.action = "loco_json";
a.route = m;
a["loco-nonce"] = e;
return g(m, c, f, {
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
C.register("$27", {
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
const q = C.require("$27", "rtl.json");
let u;
v.init = function() {
return new y();
};
v.cast = function(d) {
return d instanceof y ? d : "string" === typeof d ? v.parse(d) : v.clone(d);
};
v.clone = function(d) {
const b = new y();
for (const k in d) b[k] = d[k];
return b;
};
v.parse = function(d) {
d = (u || (u = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(d);
if (!d) return null;
const b = new y();
b.lang = d[1].toLowerCase();
b.region = (d[2] || "").toUpperCase();
b.variant = (d[3] || "").toLowerCase();
return b;
};
t = y.prototype;
t.isValid = function() {
return !!this.lang;
};
t.isKnown = function() {
const d = this.lang;
return d && "zxx" !== d;
};
t.toString = function(d) {
d = d || "_";
let b = this.lang || "zxx";
this.region && (b += d + this.region);
this.variant && (b += d + this.variant);
return b;
};
t.getIcon = function() {
let d = 3, b = [];
const k = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const g = k[d], h = this[g];
h && (b.push(g), b.push(g + "-" + h.toLowerCase()));
}
return b.join(" ");
};
t.isRTL = function() {
return !!q[String(this.lang).toLowerCase()];
};
t = null;
return v;
}({}, I, L));
C.register("$28", {
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
function q(a, c, f) {
let e, l, p = String(a || "").toLowerCase().replace(n, y).split(w), x = p.length;
for (;0 !== x--; ) if ((a = p[x]) && null == f[a]) for (c.push(a), f[a] = !0, e = a.split(m), 
l = e.length; 0 !== l--; ) (a = e[l]) && null == f[a] && (c.push(a), f[a] = !0);
return c;
}
function u(a) {
return q(a, [], {});
}
function d(a) {
let c = [], f = {}, e = a.length;
for (;0 !== e--; ) q(a[e], c, f);
return c;
}
function b() {
h = "";
g = [];
}
let k = [], g = [], h = "";
const n = /[^a-z0-9]/g, r = C.require("$28", "flatten.json"), w = /\s+/, m = /[^\d\p{L}]+/u;
return {
split: u,
find: function(a, c) {
{
const f = [], e = [], l = String(a || "").toLowerCase().replace(n, y).split(" "), p = l.length, x = h && a.substring(0, h.length) === h ? g : k, B = x.length, z = !!c;
let E = -1, F = 0;
a: for (;++E < B; ) {
const H = x[E], G = H && H.length;
if (G) {
b: for (let M = 0; M < p; M++) {
const O = l[M];
for (let R = 0; R < G; R++) if (0 === H[R].indexOf(O)) continue b;
continue a;
}
e[E] = H;
f.push(z ? c[E] : E);
} else F++;
}
h = a;
g = e;
a = f;
}
return a;
},
add: function(a, c) {
k[a] = u(c);
h && b();
},
push: function(a) {
k[k.length] = d(a);
h && b();
},
index: function(a, c) {
k[a] = d(c);
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
v.listen = function(y, q) {
function u() {
m[g ? "show" : "hide"]();
}
function d(a) {
w && r.setAttribute("size", 2 + a.length);
g = a;
u();
return a;
}
function b() {
h = null;
q(g);
}
function k(a) {
let c = r.value;
c !== g ? (h && clearTimeout(h), d(c), a ? h = setTimeout(b, a) : b()) : h && null == a && (clearTimeout(h), 
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
d(r.value);
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
a ? (h && clearTimeout(h), d(r.value), b(), a = void 0) : a = k();
return a;
},
val: function(a) {
if (null == a) return g;
h && clearTimeout(h);
r.value = d(a);
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
function q(b, k) {
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
delayOut: d,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
k && (g = A.extend({}, g, k));
b.tipsy(g);
};
v.delays = function(b, k) {
u = b || 150;
d = k || 100;
};
v.kill = function() {
A("div.tipsy").remove();
};
v.text = function(b, k) {
k.data("tipsy").setTitle(b);
};
let u, d;
v.delays();
A(D.body).on("overlayOpened overlayClosing", function(b) {
v.kill();
return !0;
});
q.prototype = {
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
m || (m = new q(w, A.fn.tipsy.elementOptions(w, b)), A.data(w, "tipsy", m));
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
C.register("$40", function(v, t, D) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return C.require("$6", "string.js").trim(this, " \n\r\t");
});
"".padStart || (String.prototype.padStart = function(y, q) {
let u = this.valueOf();
for (;y > u.length; ) u = q + u;
return u;
});
"".padEnd || (String.prototype.padEnd = function(y, q) {
let u = this.valueOf();
for (;y > u.length; ) u += q;
return u;
});
v.html = function() {
function y(h) {
return "&#" + h.charCodeAt(0) + ";";
}
function q(h, n) {
return '<a href="' + h + '" target="' + (n.indexOf(k) ? "_blank" : "_top") + '">' + n + "</a>";
}
let u, d, b, k, g = function() {
u = /[<>&]/g;
d = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
g = null;
};
return function(h, n) {
g && g();
h = h.replace(u, y);
n && (h = h.replace(b, q).replace(d, "<br />"));
return h;
};
}();
return v;
}({}, I, L));
C.register("$41", function(v, t, D) {
function y() {}
let q, u;
const d = C.require("$27", "rtl.json");
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
q || (u = /[-_+]/, q = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
b = String(b).split(u).join("-");
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
return !!d[String(this.script || this.lang).toLowerCase()];
};
t = null;
return v;
}({}, I, L));
C.register("$42", function(v, t, D) {
function y(b) {
t.console && console.error && console.error(b);
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
let k, g, h = !0;
for (k in this) g = this[k], g === q ? (y(b + "." + k + "() must be implemented"), 
h = !1) : g instanceof u && (y(b + "." + k + " must be defined"), h = !1);
return h;
};
v.init = function(b, k) {
const g = new d();
if (b) {
let h = b.length;
for (;0 !== h--; ) g[b[h]] = q;
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
C.register("$49", function(v, t, D) {
let y = 0, q = t.requestAnimationFrame, u = t.cancelAnimationFrame;
if (!q || !u) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (q = t[b + "RequestAnimationFrame"]) if (u = t[b + "CancelAnimationFrame"] || t[b + "CancelRequestAnimationFrame"]) break;
q && u || (q = function(b) {
var k = d();
const g = Math.max(0, 16 - (k - y)), h = k + g;
k = t.setTimeout(function() {
b(h);
}, g);
y = h;
return k;
}, u = function(b) {
clearTimeout(b);
});
const d = Date.now || function() {
return new Date().getTime();
};
v.loop = function(b, k) {
function g() {
n = q(g, k);
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
C.register("$46", function(v, t, D) {
function y(r, w, m, a) {
if (d) {
const c = m;
m = function(f) {
if ((f.MSPOINTER_TYPE_TOUCH || "touch") === f.pointerType) return c(f);
};
}
r.addEventListener(w, m, a);
return {
unbind: function() {
r.removeEventListener(w, m, a);
}
};
}
function q(r) {
r.preventDefault();
r.stopPropagation();
return !1;
}
let u;
const d = !!t.navigator.msPointerEnabled, b = d ? "MSPointerDown" : "touchstart", k = d ? "MSPointerMove" : "touchmove", g = d ? "MSPointerUp" : "touchend";
v.ok = function(r) {
null == u && (u = "function" === typeof D.body.addEventListener);
u && r && r(v);
return u;
};
v.ms = function() {
return d;
};
v.dragger = function(r, w) {
function m(e) {
r.addEventListener(e, c[e], !1);
}
function a(e) {
r.removeEventListener(e, c[e], !1);
}
const c = {};
c[b] = function(e) {
h(e, function(l, p) {
p.type = b;
w(e, p, f);
});
m(k);
m(g);
return !0;
};
c[g] = function(e) {
a(k);
a(g);
h(e, function(l, p) {
p.type = g;
w(e, p, f);
});
return !0;
};
c[k] = function(e) {
h(e, function(l, p) {
p.type = k;
w(e, p, f);
});
return q(e);
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
function c(F) {
r.removeEventListener(F, x[F], !1);
}
function f() {
e && e.stop();
e = null;
}
let e, l, p, x = {}, B = [], z = [], E = [];
x[b] = function(F) {
l = !1;
f();
const H = n();
h(F, function(G, M) {
B[G] = H;
z[G] = M.clientX;
E[G] = M.clientY;
});
p = r.scrollLeft;
return !0;
};
x[g] = function(F) {
h(F, function(H, G) {
const M = n() - B[H];
H = z[H] - G.clientX;
w(Math.abs(H) / M, H ? 0 > H ? -1 : 1 : 0);
});
p = null;
return !0;
};
x[k] = function(F) {
let H, G;
null == p || h(F, function(M, O) {
H = z[M] - O.clientX;
G = E[M] - O.clientY;
});
if (G && Math.abs(G) > Math.abs(H)) return l = !0;
H && (l = !0, r.scrollLeft = Math.max(0, p + H));
return q(F);
};
if (!d || m) a(b), a(k), a(g), d && (r.className += " mstouch");
return {
kill: function() {
c(b);
c(k);
c(g);
f();
},
swiped: function() {
return l;
},
ms: function() {
return d;
},
snap: function(F) {
d && !m && (r.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
r.style["-ms-scroll-snap-type"] = "mandatory", r.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, H, G) {
f();
let M = r.scrollLeft;
const O = F > M ? 1 : -1, R = Math[1 === O ? "min" : "max"], J = Math.round(16 * H * O);
return e = C.require("$49", "fps.js").loop(function(Q) {
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
if (d) (r.MSPOINTER_TYPE_TOUCH || "touch") === r.pointerType && w(0, r); else {
r = (r.originalEvent || r).changedTouches || [];
for (var m = -1; ++m < r.length; ) w(m, r[m]);
}
}, n = Date.now || function() {
return new Date().getTime();
};
return v;
}({}, I, L));
C.register("$50", function(v, t, D) {
v.init = function(y) {
function q() {
k.style.top = String(-y.scrollTop) + "px";
return !0;
}
function u() {
const h = k;
h.textContent = y.value;
const n = h.innerHTML;
"" !== n && (h.innerHTML = n.replace(/[ \t]/g, d).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function d(h) {
return '<span class="x' + h.charCodeAt(0).toString(16) + '">' + h + "</span>";
}
const b = y.parentNode;
let k = b.insertBefore(D.createElement("div"), y);
A(y).on("input", u).on("scroll", q);
A(b).addClass("has-mirror");
k.className = "ta-mirror";
const g = y.offsetWidth - y.clientWidth;
2 < g && (k.style.marginRight = String(g - 2) + "px");
u();
q();
return {
kill: function() {
A(y).off("input", u).off("scroll", q);
b.removeChild(k);
k = null;
A(b).removeClass("has-mirror");
}
};
};
return v;
}({}, I, L));
C.register("$35", function(v, t, D) {
function y(d, b) {
d = q[d] || [];
b = b && t[b];
const k = d.length;
let g = -1, h = 0;
for (;++g < k; ) {
const n = d[g];
"function" === typeof n && (n(b), h++);
}
return h;
}
const q = {};
let u = "";
v.load = function(d, b, k) {
function g() {
r && (clearTimeout(r), r = null);
w && (w.onreadystatechange = null, w = w = w.onload = null);
d && (delete q[d], d = null);
}
function h(m, a) {
m = w && w.readyState;
if (a || !m || "loaded" === m || "complete" === m) a || y(d, k), g();
}
function n() {
if (0 === y(d)) throw Error('Failed to load "' + (k || d) + '"');
g();
}
if (k && t[k]) "function" === typeof b && b(t[k]); else if (null != q[d]) q[d].push(b); else {
q[d] = [ b ];
var r = setTimeout(n, 4e3), w = D.createElement("script");
w.setAttribute("src", d);
w.setAttribute("async", "true");
w.onreadystatechange = h;
w.onload = h;
w.onerror = n;
w.onabort = g;
D.getElementsByTagName("head")[0].appendChild(w);
}
};
v.stat = function(d) {
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
return b + d;
};
v.css = function(d, b) {
D.getElementById(b) || A("<link />").attr("rel", "stylesheet").attr("href", d).attr("id", b).appendTo(D.head);
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
function q(n) {
n.off("change");
n.off("focus");
n.off("blur");
}
function u(n) {
q(n);
n.setReadOnly(!0);
n.setHighlightGutterLine(!1);
n.setHighlightActiveLine(!1);
}
function d(n, r) {
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
let m, a = !1, c = w || h, f = n.parentNode, e = f.appendChild(D.createElement("div"));
A(f).addClass("has-proxy has-ace");
C.require("$35", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(l) {
if (e) {
if (!l) throw Error("Failed to load code editor");
m = l.edit(e);
var p = m.session, x = m.renderer;
m.$blockScrolling = Infinity;
m.setShowInvisibles(a);
m.setWrapBehavioursEnabled(!1);
m.setBehavioursEnabled(!1);
m.setHighlightActiveLine(!1);
p.setUseSoftTabs(!1);
x.setShowGutter(!0);
x.setPadding(10);
x.setScrollMargin(8);
p.setMode(d(l, c));
m.setValue(n.value, -1);
p.setUseWrapMode(!0);
r ? y(m, r) : u(m);
}
}, "ace");
return {
kill: function() {
m && (q(m), m.destroy(), m = null);
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
l !== c && (c = l, m && m.session.setMode(d(t.ace, l)));
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
C.register("$51", function(v, t, D) {
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
v.load = function(b) {
const k = C.require("$35", "remote.js");
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
l.getContent = function(p) {
p = this._getContent(p);
p = p.replace(/(<\/?)loco:script/gi, "$1script");
if (!m && "<p>" === p.substring(0, 3) && "</p>" === p.substring(p.length - 4)) {
const x = p.substring(3, p.length - 4);
if (x === w || -1 === x.indexOf("</p>")) p = x;
}
return p;
};
l._setContent = l.setContent;
l.setContent = function(p, x) {
return this._setContent(g(p), x);
};
k ? (y(l, k), k.reset()) : u(l);
A(f).removeClass("loading");
}
let n, r = !1, w = "", m = !1, a = b.parentNode, c = a.parentNode, f = a.appendChild(D.createElement("div")), e = c.insertBefore(D.createElement("nav"), a);
e.id = "_tb" + String(++d);
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
n && (k && k.val(n.getContent()), q(n), n.destroy(), n = null);
f && (a.removeChild(f), A(a).removeClass("has-proxy has-mce"), f = null);
e && (c.removeChild(e), e = null);
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
C.register("$52", function(v, t, D) {
v.init = function(y, q) {
function u(c) {
w !== c && (a.textContent = c.format(0), w = c, c = 0 === c ? "empty" : 0 === q || c < q ? "lt" : q === c ? "eq" : "gt", 
c !== r && (r = c, m.className = "wg-count is-" + c));
}
function d(c) {
n && (m.removeChild(n), n = null);
0 < c && (n = m.appendChild(g.el("span").appendChild(g.txt(" / " + c.format(0)))));
q = c;
}
function b(c, f) {
u(f.length);
}
function k() {
r = "";
w = -1;
u(y.val().length);
}
const g = C.require("$26", "dom.js"), h = A(y.parent()).on("changing", b);
let n, r, w, m = g.el("div"), a = m.appendChild(g.el("span"));
h.append(m);
d(q);
k();
return {
ping: function(c) {
null != c && c !== q && (q = c, d(c));
k();
},
kill: function() {
const c = h && h[0];
c && m && m.parentNode === c && (h.off("changing", b), c.removeChild(m));
}
};
};
return v;
}({}, I, L));
C.register("$47", function(v, t, D) {
function y(d) {
function b() {
a && (r.off("input", k), a = !1);
}
function k() {
const f = d.value;
f !== c && (r.trigger("changing", [ f, c ]), c = f);
}
function g() {
k();
a && m !== c && r.trigger("changed", [ c ]);
}
function h() {
u = d;
m = c;
a || (r.on("input", k), a = !0);
r.trigger("editFocus");
w.addClass("has-focus");
return !0;
}
function n() {
u === d && (u = null);
r.trigger("editBlur");
w.removeClass("has-focus");
a && (g(), b());
return !0;
}
const r = A(d), w = A(d.parentNode);
let m, a = !1, c = d.value;
r.on("blur", n).on("focus", h);
return {
val: function(f) {
c !== f && (d.value = f, r.triggerHandler("input"), c = f);
return !0;
},
kill: function() {
b();
r.off("blur", n).off("focus", h);
},
fire: function() {
c = null;
k();
},
ping: g,
blur: n,
focus: h,
reset: function() {
m = c = d.value;
}
};
}
function q(d) {
this.e = d;
}
let u;
v._new = function(d) {
return new q(d);
};
v.init = function(d) {
const b = new q(d);
d.disabled ? (d.removeAttribute("disabled"), b.disable()) : d.readOnly ? b.disable() : b.enable();
return b;
};
t = q.prototype;
t.destroy = function() {
this.unlisten();
const d = this.p;
d && (d.kill(), this.p = null);
this.nocount();
this.e = null;
};
t.reload = function(d, b) {
let k = this.l;
this.nocount();
k && !b && (this.disable(), k = null);
this.val(d || "");
b && !k && this.enable();
return this;
};
t.val = function(d) {
const b = this.e;
if (null == d) return b.value;
const k = this.l, g = this.p;
g && g.val(d);
k && k.val(d);
k || b.value === d || (b.value = d, A(b).triggerHandler("input"));
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
const d = this.p;
d ? d.focus() : A(this.e).focus();
};
t.focused = function() {
return u && u === this.el;
};
t.parent = function() {
return this.e.parentNode;
};
t.attr = function(d, b) {
const k = this.e;
if (1 === arguments.length) return k.getAttribute(d);
null == b ? k.removeAttribute(d) : k.setAttribute(d, b);
return this;
};
t.editable = function() {
return !!this.l;
};
t.enable = function() {
const d = this.p;
this.e.removeAttribute("readonly");
this.listen();
d && d.enable && d.enable(this.l);
return this;
};
t.disable = function() {
const d = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
d && d.disable && d.disable();
return this;
};
t.listen = function() {
const d = this.l;
d && d.kill();
this.l = y(this.e);
return this;
};
t.unlisten = function() {
const d = this.l;
d && (d.kill(), this.l = null);
return this;
};
t.setInvs = function(d, b) {
const k = this.i || !1;
if (b || k !== d) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(d) : d && (this._i = C.require("$50", "mirror.js").init(this.e)), 
this.i = d;
return this;
};
t.getInvs = function() {
return this.i || !1;
};
t.setMode = function(d) {
let b = this.p, k = this.i || !1;
d !== (this.m || "") && (this.m = d, b && b.kill(), this.p = b = "code" === d ? C.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === d ? C.require("$51", "mce.js").init(this.e, this.l) : null, 
this.setInvs(k, !0), u && this.focus());
return this;
};
t.setStrf = function(d) {
this["%"] = d;
"code" === this.m && this.p.strf(d);
return this;
};
t.name = function(d) {
this.e.setAttribute("name", d);
return this;
};
t.placeholder = function(d) {
this.e.setAttribute("placeholder", d);
return this;
};
t.redraw = function() {
const d = this.p;
d && d.resize && d.resize();
};
t.counter = function(d) {
let b = this.c;
b ? b.ping(d) : this.c = C.require("$52", "counter.js").init(this, d);
d = String(d || "0");
"0" === d ? this.e.removeAttribute("maxlength") : d !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", d);
return this;
};
t.nocount = function() {
const d = this.c;
d && (d.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return v;
}({}, I, L));
C.register("$48", function(v, t, D) {
function y(a) {
const c = t.console;
c && c.error && c.error(a);
}
function q(a) {
const c = D.createElement("div");
a && c.setAttribute("class", a);
return c;
}
function u(a) {
return function() {
a.resize();
return this;
};
}
function d(a) {
return function(c) {
let f = c.target, e = f.$index;
for (;null == e && "DIV" !== f.nodeName && (f = f.parentElement); ) e = f.$index;
null != e && (c.stopImmediatePropagation(), a.select(e));
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
return function(c) {
var f = c.keyCode;
if (40 === f) f = 1; else if (38 === f) f = -1; else return !0;
if (c.shiftKey || c.ctrlKey || c.metaKey || c.altKey) return !0;
a.selectNext(f);
c.stopPropagation();
c.preventDefault();
return !1;
};
}
function g(a, c, f) {
function e(l) {
y("row[" + l + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(l) {
const p = c || 0, x = f ? -1 : 1, B = a.rows || [];
l.sort(function(z, E) {
return x * (B[z] || e(z)).cellVal(p).localeCompare((B[E] || e(E)).cellVal(p));
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
function r(a, c, f) {
let e = D.createElement("div");
e.className = f || "";
this._ = e;
this.d = c || [];
this.i = a || 0;
this.length = c.length;
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
let c = this.w, f = c.id;
var e = c.splity(f + "-thead", f + "-tbody"), l = e[0];
e = e[1];
let p = [], x = [], B = [], z = [];
if (a) this.ds = a, this.idxs = x, this._idxs = null; else if (!(a = this.ds)) throw Error("No datasource");
l.css.push("wg-thead");
e.css.push("wg-tbody");
a.eachCol(function(O, R, J) {
B[O] = f + "-col-" + R;
z[O] = J || R;
});
var E = q();
let F = -1, H = B.length, G = q("wg-cols"), M = l.splitx.apply(l, B);
for (;++F < H; ) M[F].header(z[F]), G.appendChild(E.cloneNode(!1)).setAttribute("for", B[F]);
a.eachRow(function(O, R, J) {
p[O] = new r(O, R, J);
x[O] = O;
});
this.rows = p;
this.cols = G;
this.ww = null;
this.root = E = e.body;
this.head = l;
l.redraw = u(this);
c.css.push("is-table");
c.restyle();
l = e.fixed = M[0].bodyY() || 25;
c.lock().resize(l, e);
this.sc ? this._re_sort(H) : a.sort && a.sort(x);
this.redrawDirty();
this.render();
A(E).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", d(this)).on("scroll", b(this));
return this;
};
m.clear = function() {
const a = this.pages || [];
let c = a.length;
for (;0 !== c--; ) a[c].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
m.render = function() {
let a, c = [], f = this.rows || [], e = -1, l, p = this.idxs, x = p.length, B = this.idxr = {}, z = this.r, E = this._r, F = this.root, H = this.cols;
for (;++e < x; ) {
if (0 === e % 100) {
var G = H.cloneNode(!0);
a = new w(G);
a.i = c.length;
a.h = 2200;
a.insert(F);
c.push(a);
}
l = p[e];
B[l] = e;
G = f[l];
if (null == G) throw Error("Render error, no data at [" + l + "]");
G.page = a;
a.rows.push(G);
}
a && 100 !== a.size() && a.sleepH(22);
this.pages = c;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == z ? null != E && (G = f[E]) && G.page && (delete this._r, this.select(E, !0)) : (G = f[z]) && G.page ? this.select(z, !0) : (this.deselect(!1), 
this._r = z);
return this;
};
m.resize = function() {
let a = -1, c = this.ww || (this.ww = []);
var f = this.w;
let e = f.cells[0], l = e.body.childNodes, p = l.length, x = this.pages || [], B = x.length;
for (f.redraw.call(e); ++a < p; ) c[a] = l[a].style.width;
if (B) {
f = this.mx;
for (a = this.mn; a <= f; a++) x[a].widths(c);
this.redrawDirty() && this.redraw();
}
};
m.redrawDirty = function() {
let a = !1;
var c = this.root;
const f = c.scrollTop;
c = c.clientHeight;
this.sy !== f && (a = !0, this.sy = f);
this.vh !== c && (a = !0, this.vh = c);
return a;
};
m.redraw = function() {
let a = 0, c = -1, f = null, e = null, l = this.ww;
var p = this.sy;
let x = this.mn, B = this.mx, z = Math.max(0, p - 100);
p = this.vh + p + 100;
let E, F = this.pages || [], H = F.length;
for (;++c < H && !(a > p); ) E = F[c], a += E.height(), a < z || (null === f && (f = c), 
e = c, E.rendered || E.render(l));
if (x !== f) {
if (null !== x && f > x) for (c = x; c < f; c++) {
E = F[c];
if (!E) throw Error("Shit!");
E.rendered && E.sleep();
}
this.mn = f;
}
if (B !== e) {
if (null !== B && e < B) for (c = B; c > e; c--) E = F[c], E.rendered && E.sleep();
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
m.td = function(a, c) {
return this.tr(a)[c];
};
m.next = function(a, c, f) {
null == f && (f = this.r || 0);
const e = this.idxs, l = e.length;
let p = f = (this.idxr || {})[f];
for (;f !== (p += a) && !(0 <= p && l > p); ) if (c && l) p = 1 === a ? -1 : l, 
c = !1; else return null;
f = e[p];
return null == f || null == this.rows[f] ? (y("Bad next: [" + p + "] does not map to data row"), 
null) : f;
};
m.selectNext = function(a, c, f) {
a = this.next(a, c, null);
null != a && this.r !== a && this.select(a, f);
return this;
};
m.deselect = function(a) {
const c = this.r;
null != c && (this.r = null, A(this.tr(c)).removeClass("selected"), this.w.fire("wgRowDeselect", [ c, a ]));
return this;
};
m.selectRow = function(a, c) {
return this.select(this.idxs[a], c);
};
m.select = function(a, c) {
const f = this.rows[a];
var e = f && f.page;
if (!e) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let l, p = this.w.cells[1];
e.rendered || (l = e.top(), p.scrollY(l), this.redrawDirty() && this.redraw());
if (!f.rendered) return e.rendered || y("Failed to render page"), y("Row [" + f.i + "] not rendered"), 
this;
e = f.cells();
A(e).addClass("selected");
this.r = a;
c || (l = p.scrollY(), A(this.root).focus(), l !== p.scrollY() && p.scrollY(l));
p.scrollTo(e[0], !0);
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
let c, f = -1;
const e = this.rows || [], l = this.idxs || [], p = l.length;
for (;++f < p; ) c = l[f], a(e[c], f, c);
return this;
};
m.sortable = function(a) {
const c = this.sc || (this.sc = new n(this));
c.has(a) || c.add(a);
return this;
};
m._re_sort = function(a) {
let c = -1, f = this.sc, e = f.active;
for (this.sc = f = new n(this); ++c < a; ) f.add(c);
e && (c = this.head.indexOf(e.id), -1 === c && (c = Math.min(e.idx, a - 1)), this.sort(c, e.desc));
return this;
};
m._sort = function(a, c) {
c ? (this.s = c, c(a)) : (c = this.s) && c(a);
return a;
};
m.sort = function(a, c) {
this._sort(this.idxs, g(this, a, c));
this.sc.activate(a, c);
return this;
};
m = null;
m = n.prototype;
m.has = function(a) {
return null != this[a];
};
m.add = function(a) {
const c = this, f = c.t.head.cells[a];
c[a] = {
desc: null,
idx: a,
id: f.id
};
c.length++;
f.addClass("wg-sortable").on("click", function(e) {
if ("header" === e.target.nodeName.toLowerCase()) return e.stopImmediatePropagation(), 
c.toggle(a), !1;
});
return c;
};
m.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
m.activate = function(a, c) {
let f, e = this.active, l = this[a], p = this.t.head.cells;
e && (f = p[e.idx]) && (f.removeClass(e.css), e !== l && f.restyle());
(f = p[a]) ? (l.desc = c, this.active = l, a = "wg-" + (c ? "desc" : "asc"), f.addClass(a).restyle(), 
l.css = a) : this.active = null;
return this;
};
m = null;
m = r.prototype;
m.render = function(a) {
let c, f = [], e = this._, l = this.length;
if (e) {
for (this.c = f; 0 !== l--; ) c = e.cloneNode(!1), f[l] = this.update(l, c), c.$index = this.i, 
a[l].appendChild(c);
this._ = null;
} else for (f = this.c; 0 !== l--; ) a[l].appendChild(f[l]);
this.rendered = !0;
return this;
};
m.update = function(a, c) {
c = c || this.c[a] || {};
a = (this.d[a] || function() {})() || " ";
null == a.innerHTML ? c.textContent = a : c.innerHTML = a.innerHTML;
return c;
};
m.cells = function() {
return this.c || [ this._ ];
};
m.data = function() {
const a = [], c = this.length;
let f = -1;
for (;++f < c; ) a[f] = this.cellVal(f);
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
const c = this.h, f = q("wg-dead");
f.style.height = String(c) + "px";
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
let c, f = -1, e = this.rows, l = e.length;
const p = this.dead, x = this.live, B = x.childNodes;
for (;++f < l; ) c = e[f], c.rendered || c.render(B);
l = a.length;
for (f = 0; f < l; f++) B[f].style.width = a[f];
p.parentNode.replaceChild(x, p);
this.rendered = !0;
this.h = null;
return this;
};
m.sleep = function() {
const a = this.height(), c = this.live, f = this.dead;
f.style.height = String(a) + "px";
c.parentNode.replaceChild(f, c);
this.rendered = !1;
this.h = a;
return this;
};
m.sleepH = function(a) {
a *= this.rows.length;
const c = this.dead;
c && (c.style.height = String(a) + "px");
this.rendered || (this.h = a);
return this;
};
m.widths = function(a) {
const c = this.live.childNodes;
let f = a.length;
for (;0 !== f--; ) c[f].style.width = a[f];
return this;
};
m.destroy = function() {
var a = this.rendered ? this.live : this.dead;
const c = this.rows;
a.parentNode.removeChild(a);
for (a = c.length; 0 !== a--; ) c[a].destroy();
};
return v;
}({}, I, L));
C.register("$43", function(v, t, D) {
function y(e, l) {
var p = e.id;
let x = p && m[p], B = x && x.parent();
if (!x || !B) return null;
var z = 1 === B.dir;
p = z ? "X" : "Y";
let E = "page" + p;
z = z ? w : r;
let F = z(B.el);
p = l["offset" + p];
let H = B.el, G = H.className;
null == p && (p = l[E] - z(e));
p && (F += p);
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
function q(e) {
function l() {
A(D).off("mousemove", p);
f && (f.done(), f = null);
return !0;
}
function p(x) {
f ? f.move(x) : l();
return !0;
}
if (f) return !0;
f = y(e.target, e);
if (!f) return !0;
A(D).one("mouseup", l).on("mousemove", p);
return d(e);
}
function u(e, l) {
const p = l.type;
"touchmove" === p ? f && f.move(l) : "touchstart" === p ? f = y(e.target, l) : "touchend" === p && f && (f.done(), 
f = null);
}
function d(e) {
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
const p = A(l);
p.on("editFocus", function(x) {
x.stopPropagation();
p.trigger("wgFocus", [ b(e) ]);
}).on("editBlur", function(x) {
x.stopPropagation();
p.trigger("wgBlur", [ b(null) ]);
});
}
function g(e) {
const l = e.id, p = e.className, x = p ? [ p ] : [];
this.id = l;
this.el = e;
this.pos = this.index = 0;
this._cn = p;
this.css = x.concat("wg-cell");
m[l] = this;
this.clear();
}
const h = C.include("$45", "html.js") || C.include("$2", "html.js", !0), n = C.require("$26", "dom.js"), r = n.top, w = n.left, m = {};
let a, c = 0, f = !1;
v.init = function(e) {
const l = new g(e);
l.redraw();
C.require("$46", "touch.js").ok(function(p) {
p.dragger(e, u);
});
A(e).on("mousedown", q);
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
const p = this.cells, x = p.length;
for (;++l < x; ) e(p[l], l);
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
let p = -1;
let x = l.length, B = 1 / x, z = 0;
for (;++p < x; ) {
var E = n.el();
this.body.appendChild(E);
var F = E;
{
var H = l[p];
let G = 1, M = H;
for (;m[H]; ) H = M + "-" + ++G;
}
F.id = H;
E = new g(E);
E.index = p;
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
const e = this.el, l = this.cells, p = this.field, x = this.body, B = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete m[l[z].destroy().id];
this.cells = [];
this.length = 0;
B && (e.removeChild(B), this.nav = null);
x && (p && (p.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
e === x.parentNode && e.removeChild(x));
this.body = e.appendChild(n.el("", "wg-body"));
this._h = null;
return this;
};
t.resize = function(e, l) {
if (!l && (l = this.cells[1], !l)) return;
var p = l.index;
let x = this.cells, B = A(this.el)[1 === this.dir ? "width" : "height"](), z = x[p + 1];
p = x[p - 1];
l.pos = Math.min((z ? z.pos * B : B) - ((l.body || l.el.firstChild).offsetTop || 0), Math.max(p ? p.pos * B : 0, e)) / B;
this.redraw();
this.fire("wgResize");
return this;
};
t.distribute = function(e) {
let l = -1, p = 0, x;
const B = this.cells, z = e.length;
for (;++l < z && (x = B[++p]); ) x.pos = Math.max(0, Math.min(1, e[l]));
this.redraw();
return this;
};
t.distribution = function() {
let e = [], l = 0;
const p = this.cells, x = p.length - 1;
for (;l < x; ) e[l] = p[++l].pos;
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
var p = this.body, x = this.field;
if (p) {
var B = l.clientWidth || 0, z = l.clientHeight || 0, E = p.offsetTop || 0;
z = E > z ? 0 : z - E;
if (this._h !== z) {
this._h = z;
p.style.height = String(z) + "px";
var F = x;
}
this._w !== B && (this._w = B, F = x);
F && F.redraw();
}
p = this.length;
B = 1;
z = this.nav;
for (E = 2 === this.dir ? "height" : "width"; 0 !== p--; ) x = this.cells[p], z ? F = 1 : (x.fixed && (x.pos = x.fixed / A(l)[E]()), 
F = B - x.pos, B = x.pos), x.el.style[E] = String(100 * F) + "%", x.redraw(e);
return this;
};
t.contents = function(e, l) {
const p = this.el;
let x = this.body;
if (null == e) return x.innerHTML;
this.length ? this.clear() : x && (p.removeChild(x), x = null);
x || (this.body = x = p.appendChild(n.el("", l || "wg-content")), this._h = null, 
(l = this.lang) && this._locale(l, this.rtl, !0));
"string" === typeof e ? A(x)._html(e) : e && this.append(e);
this.redraw();
return this;
};
t.textarea = function(e, l) {
let p = this.field;
if (p) {
var x = p.editable();
p.reload(e, l);
x !== l && this.restyle();
} else this.length && this.clear(), x = n.el("textarea"), x.setAttribute("wrap", "virtual"), 
x.setAttribute("autocomplete", "off"), x.setAttribute("id", "wg" + String(++c)), 
x.value = e, this.contents(x), p = C.require("$47", "field.js")._new(x)[l ? "enable" : "disable"](), 
k(this, x), this.field = p, this.restyle();
this.lang || this.locale("en");
return p;
};
t.locale = function(e) {
e = C.require("$41", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
t._locale = function(e, l, p) {
const x = this.body;
if (p || e !== this.lang) this.lang = e, x && x.setAttribute("lang", e);
if (p || l !== this.rtl) this.rtl = l, x && x.setAttribute("dir", l ? "RTL" : "LTR");
return this;
};
t.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
const l = this.cells;
let p = this.navigated();
if (null != p) return l[p].editable();
p = -1;
const x = l.length;
for (;++p < x && (e = l[p].editable(), null == e); );
return e;
};
t.eachTextarea = function(e) {
const l = this.field;
l ? e(l) : this.each(function(p) {
p.eachTextarea(e);
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
const p = l.firstChild;
h.init(p ? l.insertBefore(e, p) : l.appendChild(e));
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
l ? l.clear() : l = C.require("$48", "wgtable.js").create(this);
l.init(e);
return this.table = l;
};
t.lock = function() {
this.body.className += " locked";
return this;
};
t.scrollTo = function(e, l) {
let p = this.body;
var x = p.scrollTop;
let B = r(e, p);
if (x > B) x = B; else {
const z = p.clientHeight;
e = B + A(e).outerHeight();
if (z + x < e) x = e - z; else return;
}
l ? p.scrollTop = x : A(p).stop(!0).animate({
scrollTop: x
}, 250);
};
t.navigize = function(e, l) {
function p(G) {
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
p(M);
x.redraw();
return d(G);
});
null == l && (l = H.data("idx") || 0);
x.each(function(G, M) {
B[M] = A('<a href="#' + G.id + '"></a>').data("idx", M).text(e[M]).appendTo(H);
G.pos = 0;
A(G.el).hide();
});
p(z[l] ? l : 0);
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
C.register("$29", function(v, t, D) {
function y(a, c) {
a.stopPropagation();
n = c;
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
function d(a, c, f) {
c = A(a.title(c).parentNode);
let e = c.find("span.lang");
f ? (f = C.require("$41", "locale.js").cast(f), e.length || (e = A("<span></span>").prependTo(c)), 
e.attr("lang", f.lang).attr("class", f.getIcon() || "lang region region-" + (f.region || "zz").toLowerCase())) : (e.remove(), 
f = "en");
a.locale(f);
return c;
}
function b(a, c, f) {
c.on("click", function(e) {
const l = a.fire(f, [ e.target ]);
l || e.preventDefault();
return l;
});
}
function k() {
this.dirty = 0;
}
C.require("$3", "number.js");
const g = C.require("$40", "string.js").html, h = C.require("$6", "string.js").sprintf;
let n, r;
v.extend = function(a) {
return a.prototype = new k();
};
v.localise = function(a) {
r = a;
return v;
};
const w = function() {
const a = D.createElement("p"), c = /(src|href|on[a-z]+)\s*=/gi;
return function(f) {
a.innerHTML = f.replace(c, "data-x-loco-$1=");
const e = a.textContent.trim();
return e ? e.replace("data-x-loco-", "") : f.trim();
};
}(), m = k.prototype = C.require("$42", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
m.setRootCell = function(a) {
function c(e) {
f.redraw(!0, e);
return !0;
}
const f = C.require("$43", "wingrid.js").init(a);
A(t).on("resize", c);
this.redraw = c;
A(a).on("wgFocus wgBlur", y);
this.destroy = function() {
f.destroy();
A(t).off("resize", c);
};
this.rootDiv = a;
return f;
};
m.$ = function() {
return A(this.rootDiv);
};
m.setListCell = function(a) {
const c = this;
c.listCell = a;
a.on("wgRowSelect", function(f, e) {
(f = c.po.row(e)) && f !== c.active && c.loadMessage(f);
}).on("wgRowDeselect", function(f, e, l) {
l || c.loadNothing();
});
};
m.setSourceCell = function(a) {
this.sourceCell = a;
};
m.setTargetCell = function(a) {
this.targetCell = a;
};
m.next = function(a, c, f) {
const e = this.listTable, l = this.po;
let p = e.selected(), x = p, B;
for (;null != (p = e.next(a, f, p)); ) {
if (x === p) {
p = null;
break;
}
if (c && (B = l.row(p), B.translated(0))) continue;
break;
}
null != p && e.select(p, !0);
return p;
};
m.select = function(a) {
this.listTable.select(a);
this.focus();
};
m.current = function(a) {
const c = this.active;
if (null == a) return c;
a ? a.is(c) ? (this.reloadMessage(a), this.focus()) : (this.loadMessage(a), a = this.po.indexOf(a), 
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
const a = this.po.rows, c = a.length, f = this.dict;
f.clear();
let e = -1;
for (;++e < c; ) f.add(e, a[e].toText());
};
m.filtered = function() {
return this.lastSearch || "";
};
m.filter = function(a, c) {
const f = this.listTable, e = this.lastFound, l = this.lastSearch || "";
let p, x;
a ? (x = this.dict.find(a), p = x.length, p === e && 0 === a.indexOf(l) ? c = !0 : f.filter(x)) : (p = this.po.length, 
f.unfilter());
this.lastFound = p;
this.lastSearch = a;
c || this.fire("poFilter", [ a, p ]);
return p;
};
m.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
m.unsave = function(a, c) {
let f = !1;
if (a) {
if (f = a.saved(c)) this.dirty++, a.unsave(c), this.fire("poUnsaved", [ a, c ]);
this.reCssRow(a);
}
return f;
};
m.reCssRow = function(a) {
var c = this.po.indexOf(a);
if ((c = this.listTable.tr(c)) && c.length) {
var f = u(a);
a = c[0].className;
f = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + f;
f !== a && A(c).attr("class", f);
}
};
m.save = function(a) {
const c = this.po;
if (this.dirty || a) {
const f = [], e = [], l = this.listTable;
c.each(function(p, x, B) {
x.err && f.push(x);
x.saved() || (x.save(), (x = (p = l.row(B)) && p.page) && x.live ? e[x.i] = x.live : p && A(p.cells()).removeClass("po-unsaved"));
});
e.length && A(e).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = f.length ? f : null;
this.fire("poSave", []);
}
return c;
};
m.fire = function(a, c) {
const f = this.handle;
if (f && f[a] && !1 === f[a].apply(this, c || [])) return !1;
a = A.Event(a);
this.$().trigger(a, c);
return !a.isDefaultPrevented();
};
m.on = function(a, c) {
this.$().on(a, c);
return this;
};
m.getSorter = function() {
return null;
};
m.setLocales = function(a, c) {
const f = this.labels;
a && a !== this.sourceLocale && (this.sourceLocale = a, this.sourceCell && d(this.sourceCell, f[0], a));
c && c !== this.targetLocale && (this.targetLocale = c, a = h(f[3], c.label || "Target"), 
this.targetCell && d(this.targetCell, a, c));
};
m.reload = function() {
const a = this;
var c = a.listCell;
const f = a.po;
var e = f && f.locale() || a.targetLocale, l = f && f.source() || a.sourceLocale;
const p = e && e.isRTL(), x = f && f.length || 0;
if (!f || !f.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(l, e);
a.lastSearch && (a.lastSearch = "", a.lastFound = x, a.fire("poFilter", [ "", x ]));
l = (e = a.listTable) && e.thead().distribution();
let B = [];
a.listTable = e = c.tabulate({
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
c = a.getListColumns();
for (const z in c) e.sortable(c[z]);
l && e.thead().distribute(l);
e.tbody().$(p ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = B.length ? B : null;
return !!x;
};
m.load = function(a, c) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== c ? this.listTable.selectRow(c || 0) : this.active && this.unloadActive());
};
m.pasteMessage = function(a) {
this.validate(a);
if (this.active === a) {
let c = this.sourceCell, f = 0;
c && c.eachTextarea(function(e) {
e.val(a.source(null, f++));
});
(c = this.contextCell) && c.eachTextarea(function(e) {
e.val(a.context());
});
if (c = this.targetCell) f = 0, c.eachTextarea(function(e) {
e.val(a.translation(f++));
});
}
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
m.reloadMessage = function(a) {
const c = this.sourceCell, f = this.targetCell;
this.pasteMessage(a);
c && this.setSrcMeta(a, c) && c.redraw();
if (f) {
var e = f.navigated() || 0;
e = this.setTrgMeta(a, e, f);
!c && this.setSrcMeta(a, f) && (e = !0);
e && (f.redraw(), this.reCssRow(a));
}
return this;
};
m.setStatus = function() {
return null;
};
m.setSrcMeta = function(a, c) {
const f = [];
var e = this.labels;
let l = !1, p = this.$smeta;
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
f.length ? (p || (p = c.find("div.meta"), p.length || (p = A('<div class="meta"></div>').insertAfter(c.header())), 
b(this, p, "poMeta"), this.$smeta = p), p.html(f.join("\n")).show(), l = !0) : p && p.text() && (p.text("").hide(), 
l = !0);
return l;
};
m.setTrgMeta = function(a, c, f) {
const e = [];
c = (a = a.errors(c)) && a.length;
var l = !1;
let p = this.$tmeta;
if (c) {
for (l = 0; l < c; l++) e.push('<p class="has-icon icon-warn">' + g(a[l], !0) + ".</p>");
p || (p = f.find("div.meta"), p.length || (p = A('<div class="meta"></div>').insertAfter(f.header())), 
this.$tmeta = p);
p.html(e.join("\n")).show();
l = !0;
} else p && p.text() && (p.text("").hide(), l = !0);
return l;
};
m.loadMessage = function(a) {
function c(N) {
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
N.titled() !== P && d(N, P, K || "en");
P = !1;
z.setSrcMeta(a, N) && (P = !0);
if (a.plural()) {
P = -1;
let U = [], W = [];
const Y = N.id + "-";
K = a.sourceForms() || K && K.plurals || q(2);
const da = K.length;
if (2 !== da || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < da; ) U[P] = Y + String(P), 
W[P] = c(K[P].split(" ", 1)[0]) + ":"; else U = [ Y + "-0", Y + "-1" ], W = [ ca[1], ca[2] ];
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
K.titled() !== U && d(K, U, S);
U = !1;
!N && z.setSrcMeta(a, K) && (U = !0);
z.setTrgMeta(a, P, K) && (U = !0);
z.setStatus(a, P);
if (1 !== S.nplurals && a.pluralized()) {
N = function(X) {
X < Z && (Y.push(c(ea[X])), W.push(da + String(X)));
};
let W = [], Y = [];
const da = K.id + "-", ea = a.targetForms() || S.plurals || q(S.nplurals), Z = ea.length;
for (a.eachMsg(N); (S = W.length) < Z; ) N(S);
K.splitx.apply(K, W);
K.each(function(X, ba) {
const ma = V && !a.disabled(ba);
X.textarea(a.translation(ba), ma).setStrf(G).setMode(aa).setInvs(F);
V && p(X, ba);
});
K.navigize(Y, P || null).on("wgTabSelect", function(X, ba) {
(X = V && X.cell.editable()) && X.focus();
z.setTrgMeta(a, ba, K);
z.setStatus(a, ba);
z.fire("poTab", [ ba ]);
});
} else U && K.redraw(), K.textarea(a.translation(), V && !a.disabled(0)).setStrf(G).setMode(aa).setInvs(F), 
V && p(K, 0);
}
function p(N, K) {
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
N.titled() !== K && (d(N, K), z.setStatus(null));
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
N.titled() !== K && d(N, K);
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
function c(f) {
f && f.off().clear();
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
m.loadNothing = function() {
const a = this.t(), c = this.mode || "", f = this.inv || !1, e = this.fmt;
this.unloadActive();
this.setStatus(null);
let l = this.commentCell;
l && l.textarea("", !1);
if (l = this.sourceCell) l.textarea("", !1).setStrf(e).setMode(c).setInvs(f), l.title(a._x("Source text not loaded", "Editor") + ":");
if (l = this.contextCell) l.textarea("", !1).setMode(c).setInvs(f), l.title(a._x("Context not loaded", "Editor") + ":");
if (l = this.targetCell) l.textarea("", !1).setStrf(e).setMode(c).setInvs(f), l.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
m.updateListCell = function(a, c) {
c = this.getListColumns()[c];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(c);
};
m.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? w(a) : a.trim()) || " ";
};
m.fuzzy = function(a, c, f) {
c = c || this.active;
const e = c.fuzzy(f);
!0 !== a || e ? !1 === a && e && this.flag(0, c, f) && this.fire("poFuzzy", [ c, !1, f ]) : this.flag(4, c, f) && this.fire("poFuzzy", [ c, !0, f ]);
return e;
};
m.flag = function(a, c, f) {
if (!c) {
c = this.active;
f = this.getTargetOffset();
if (null == f) return null;
f && c.targetForms() && (f = 0);
}
const e = c.flagged(f);
if (null == a) return e;
if (e === a || a && !c.translated(f) || !this.fire("poFlag", [ a, e, c, f ])) return !1;
c.flag(a, f);
this.fire("poUpdate", [ c ]) && this.unsave(c, f);
this.setStatus(c, f);
return !0;
};
m.add = function(a, c) {
let f, e = this.po.get(a, c);
e ? f = this.po.indexOf(e) : (f = this.po.length, e = this.po.add(a, c), this.load(this.po, -1), 
this.fire("poAdd", [ e ]), this.fire("poUpdate", [ e ]));
this.lastSearch && this.filter("");
this.listTable.select(f);
return e;
};
m.del = function(a) {
if (a = a || this.active) {
var c = this.lastSearch, f = this.po.del(a);
null != f && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (c && this.filter(c), this.active || (f = Math.min(f, this.po.length - 1), 
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
const c = this.active, f = this.sourceCell;
c && c.refs() && f && this.setSrcMeta(c, f) && f.redraw();
this.fire("poMode", [ a ]);
}
return this;
};
m.getMono = function() {
return "code" === this.mode;
};
m.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(c) {
c.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
m.getInvs = function() {
return this.inv || !1;
};
m.callTextareas = function(a) {
var c = this.targetCell;
c && c.eachTextarea(a);
(c = this.contextCell) && c.eachTextarea(a);
(c = this.sourceCell) && c.eachTextarea(a);
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
C.register("$30", function(v, t, D) {
v.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, q = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(u, d) {
const b = d && d.count || 0;
d = d && d.types || {};
let k = !0, g = 0, h = 0;
for (var n; null != (n = q.exec(u)); ) {
const r = n[2];
if ("%" !== r || "%%" !== n[0]) {
if ("" === r || -1 === "suxXbcdeEfFgGo".indexOf(r)) {
k = !1;
break;
}
null == n[1] ? n = ++h : (n = parseInt(n[1]), g = Math.max(g, n));
null == d[n] && (d[n] = {});
d[n][r] = !0;
}
}
if (k) return {
valid: !0,
count: Math.max(g, h, b),
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
return v;
}({}, I, L));
C.register("$13", function(v, t, D) {
function y() {
this.init();
}
function q(g) {
g = A('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
C.require("$12", "tooltip.js").init(g);
return g;
}
function u(g) {
return q("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(h) {
h.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function d(g) {
return q("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(h) {
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
t = y.prototype = C.require("$29", "base.js").extend(y);
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
h || (this.$tnav = h = A("<nav></nav>").append(u(this)).append(d(this)).appendTo(this.targetCell.header()));
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
r.sort(function(a, c) {
return m(w.row(a), w.row(c));
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
null == k && (k = C.require("$30", "printf.js").init());
var m = k;
if (!("" !== n || m.sniff(r) || "" !== w && m.sniff(w))) return 0;
let a = 0, c = m.parse(r);
w && c.valid && (c = m.parse(w, c));
if (!c.valid) return 0;
let f = c.count;
if (0 !== f || "" !== n) {
var e = this;
g.eachMsg(function(l, p) {
h[l] = [];
if ("" !== p) {
p = m.parse(p);
var x = p.count;
l = h[l];
if (p.valid) if (x > f) l.push(b(e.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ f ])), 
a++; else if (x < f && "" === w) l.push(b(e.t()._("Missing placeholders; source text formatting suggests at least %s"), [ f ])), 
a++; else {
x = c.types;
for (const B in p.types) for (const z in p.types[B]) if (null == x[B] || null == x[B][z]) {
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
v.init = function(d, b) {
function k(h) {
if (h.isDefaultPrevented() || !h.metaKey && !h.ctrlKey) return !0;
const n = h.which;
if (!g[n]) return !0;
const r = u[n];
if (!r || h.altKey || h.shiftKey && !q[n] || !1 === r(h, d)) return !0;
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
d = b = null;
for (const h in u) g[h] = !1;
}
};
};
return v;
}({}, I, L));
C.register("$31", function(v, t, D) {
function y() {
this.reIndex([]);
}
v.init = function() {
return new y();
};
t = y.prototype;
t.reIndex = function(q) {
const u = {}, d = q.length;
let b = -1;
for (;++b < d; ) u[q[b]] = b;
this.keys = q;
this.length = b;
this.ords = u;
};
t.key = function(q, u) {
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
t.indexOf = function(q) {
q = this.ords[q];
return null == q ? -1 : q;
};
t.add = function(q, u) {
let d = this.ords[q];
null == d && (this.keys[this.length] = q, d = this.ords[q] = this.length++);
this[d] = u;
return d;
};
t.get = function(q) {
return this[this.ords[q]];
};
t.has = function(q) {
return null != this.ords[q];
};
t.del = function(q) {
this.cut(this.ords[q], 1);
};
t.cut = function(q, u) {
u = u || 1;
const d = [].splice.call(this, q, u);
this.keys.splice(q, u);
this.reIndex(this.keys);
return d;
};
t.each = function(q) {
const u = this.keys, d = this.length;
let b = -1;
for (;++b < d; ) q(u[b], this[b], b);
return this;
};
t.sort = function(q) {
const u = this.length, d = this.keys, b = this.ords, k = [];
let g = -1;
for (;++g < u; ) k[g] = [ this[g], d[g] ];
k.sort(function(n, r) {
return q(n[0], r[0]);
});
for (g = 0; g < u; g++) {
var h = k[g];
this[g] = h[0];
h = h[1];
d[g] = h;
b[h] = g;
}
return this;
};
t.join = function(q) {
return [].join.call(this, q);
};
return v;
}({}, I, L));
C.register("$32", function(v, t, D) {
function y(q, u) {
var d = new RegExp("^.{0," + (q - 1) + "}[" + u + "]"), b = new RegExp("^[^" + u + "]+");
return function(k, g) {
for (var h = k.length, n; h > q; ) {
n = d.exec(k) || b.exec(k);
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
v.create = function(q) {
function u(r) {
return g[r] || "\\" + r;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == q || isNaN(q = Number(q))) q = 79;
if (0 < q) {
var h = y(q - 3, " ");
var n = y(q - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(r, w) {
if (!w) return r + ' ""';
w = w.replace(k, u);
var m = 0;
w = w.replace(d, function() {
m++;
return "\\n\n";
});
if (!(m || q && q < w.length + r.length + 3)) return r + ' "' + w + '"';
r = [ r + ' "' ];
w = w.split("\n");
if (n) for (var a = -1, c = w.length; ++a < c; ) n(w[a], r); else r = r.concat(w);
return r.join('"\n"') + '"';
},
prefix: function(r, w) {
r = r.split(d);
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
C.register("$44", function(v, t, D) {
function y() {
this.length = 0;
}
v.init = function() {
return new y();
};
t = y.prototype;
t.push = function(q) {
this[this.length++] = q;
return this;
};
t.sort = function(q) {
[].sort.call(this, q);
return this;
};
t.each = function(q) {
for (var u = -1, d = this.length; ++u < d; ) q(u, this[u]);
return this;
};
return v;
}({}, I, L));
C.register("$33", function(v, t, D) {
function y() {}
v.extend = function(q) {
return q.prototype = new y();
};
t = y.prototype = C.require("$42", "abstract.js").init([ "load" ]);
t.row = function(q) {
return this.rows[q];
};
t.lock = function(q) {
return this.locale(q || {
lang: "zxx",
label: "",
nplurals: 2,
pluraleq: "n!=1"
});
};
t.unlock = function() {
const q = this.loc;
this.loc = null;
return q;
};
t.locale = function(q) {
null == q ? q = this.loc : this.loc = q = C.require("$41", "locale.js").cast(q);
return q;
};
t.source = function(q) {
null == q ? q = this.src || C.require("$41", "locale.js").cast({
lang: "en",
label: "English",
nplurals: 2,
pluraleq: "n!=1"
}) : this.src = q = C.require("$41", "locale.js").cast(q);
return q;
};
t.each = function(q) {
this.rows.each(q);
return this;
};
t.indexOf = function(q) {
"object" !== typeof q && (q = this.get(q));
if (!q) return -1;
null == q.idx && (q.idx = this.rows.indexOf(q.hash()));
return q.idx;
};
t.get = function(q) {
return this.rows && this.rows.get(q);
};
t.has = function(q) {
return this.rows && this.rows.has(q);
};
t.del = function(q) {
q = this.indexOf(q);
if (-1 !== q) {
const u = this.rows.cut(q, 1);
if (u && u.length) return this.length = this.rows.length, this.rows.each(function(d, b, k) {
b.idx = k;
}), q;
}
};
t.reIndex = function(q, u) {
const d = q.hash(), b = this.indexOf(q), k = this.rows.indexOf(d);
return k === b ? b : -1 !== k ? (u = (u || 0) + 1, q.source("Error, duplicate " + String(u) + ": " + q.source()), 
this.reIndex(q, u)) : this.rows.key(b, d);
};
t.sort = function(q) {
this.rows.sort(q);
return this;
};
t.export = function() {
const q = this.rows, u = q.length, d = C.require("$44", "list.js").init();
let b = -1;
for (;++b < u; ) d.push(q[b]);
return d;
};
return v;
}({}, I, L));
C.register("$34", function(v, t, D) {
function y(d, b, k) {
if (null == k) return d[b] || "";
d[b] = k || "";
return d;
}
function q() {
this._id = this.id = "";
}
function u(d, b) {
const k = d.length;
let g = -1;
for (;++g < k; ) b(g, d[g]);
}
v.extend = function(d) {
return d.prototype = new q();
};
t = q.prototype;
t.flag = function(d, b) {
const k = this.flg || (this.flg = []);
if (null != b) k[b] = d; else for (b = Math.max(k.length, this.src.length, this.msg.length); 0 !== b--; ) k[b] = d;
return this;
};
t.flagged = function(d) {
return (this.flg || [])[d || 0] || 0;
};
t.hasFlag = function() {
const d = this.flg || [];
let b = d.length;
for (;0 !== b--; ) if (this.isFlag(d[b])) return !0;
return !1;
};
t.isFlag = function(d) {
return 0 < d;
};
t.flags = function() {
const d = {}, b = [], k = this.flg || [];
let g = k.length;
for (;0 !== g--; ) {
const h = k[g];
d[h] || (d[h] = !0, b.push(h));
}
return b;
};
t.flaggedAs = function(d, b) {
const k = this.flg || [];
if (null != b) return d === k[b] || 0;
for (b = k.length; 0 !== b--; ) if (k[b] === d) return !0;
return !1;
};
t.fuzzy = function(d, b) {
const k = this.flaggedAs(4, d);
null != b && this.flag(b ? 4 : 0, d);
return k;
};
t.source = function(d, b) {
if (null == d) return this.src[b || 0] || "";
this.src[b || 0] = d;
return this;
};
t.plural = function(d, b) {
if (null == d) return this.src[b || 1] || "";
this.src[b || 1] = d || "";
return this;
};
t.sourceForms = function() {
return this.srcF;
};
t.targetForms = function() {
return this.msgF;
};
t.each = function(d) {
const b = this.src, k = this.msg, g = Math.max(b.length, k.length);
let h = -1;
for (;++h < g; ) d(h, b[h], k[h]);
return this;
};
t.eachSrc = function(d) {
u(this.src, d);
return this;
};
t.eachMsg = function(d) {
u(this.msg, d);
return this;
};
t.count = function() {
return Math.max(this.src.length, this.msg.length);
};
t.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
t.translate = function(d, b) {
this.msg[b || 0] = d || "";
return this;
};
t.untranslate = function(d) {
if (null != d) this.msg[d] = ""; else {
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) b[d] = "";
}
return this;
};
t.translation = function(d) {
return this.msg[d || 0] || "";
};
t.errors = function(d) {
return this.err && this.err[d || 0] || [];
};
t.valid = function() {
return null == this.err;
};
t.translated = function(d) {
if (null != d) return !!this.msg[d];
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) if (!b[d]) return !1;
return !0;
};
t.untranslated = function(d) {
if (null != d) return !this.msg[d];
const b = this.msg, k = b.length;
for (d = 0; d < k; d++) if (b[d]) return !1;
return !0;
};
t.comment = function(d) {
return y(this, "cmt", d);
};
t.notes = function(d) {
return y(this, "xcmt", d);
};
t.refs = function(d) {
return y(this, "rf", d);
};
t.format = function(d) {
return y(this, "fmt", d);
};
t.context = function(d) {
return y(this, "ctx", d);
};
t.tags = function() {
return this.tg;
};
t.getMax = function(d) {
return (this.mx || [ 0 ])[d] || 0;
};
t.toString = t.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
t.weight = function() {
let d = 0;
this.translation() || (d += 2);
this.fuzzy() && (d += 1);
return d;
};
t.equals = function(d) {
return this === d || this.hash() === d.hash();
};
t.hash = function() {
return this.id;
};
t.normalize = function() {
let d = -1, b = this.msg.length;
for (;++d < b; ) this.msg[d] = this.src[Math.min(d, 1)] || "";
};
t.disabled = function(d) {
return !!(this.lck || [])[d || 0];
};
t.disable = function(d) {
(this.lck || (this.lck = []))[d || 0] = !0;
return this;
};
t.saved = function(d) {
const b = this.drt;
if (null == b) return !0;
if (null != d) return !b[d];
for (d = b.length; 0 !== d--; ) if (b[d]) return !1;
return !0;
};
t.unsave = function(d) {
(this.drt || (this.drt = []))[d || 0] = !0;
return this;
};
t.save = function(d) {
null == d ? this.drt = null : (this.drt || (this.drt = []))[d] = !1;
return this;
};
t.is = function(d) {
return d && (d === this || d.idx === this.idx);
};
t.isHTML = function(d) {
if (null == d) return this.htm || !1;
this.htm = d;
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
function q(g, h) {
g = g || "";
h && (g += "\0" + h);
return g;
}
function u(g) {
const h = t.console;
h && h.error && h.error(g.message || String(g));
}
function d(g) {
return C.require("$32", "format.js").create(g);
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
D = C.require("$33", "messages.js").extend(b);
D.clear = function() {
this.rows = C.require("$31", "collection.js").init();
this.length = 0;
return this;
};
D.now = function() {
function g(a, c) {
for (a = String(a); a.length < c; ) a = "0" + a;
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
g = q(g, h);
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
let m, a, c, f = (w = this.locale()) && w.nplurals || 2, e = [];
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
c = n.plural;
1 === c && a.plural(r);
c >= f || (n.flag && a.flag(n.flag, c), a.translate(n.target || "", c), n.format && !a.format() && a.format(n.format));
} catch (l) {
u(l);
}
return this;
};
D.wrap = function(g) {
this.fmtr = d(g);
return this;
};
D.toString = function() {
var g, h = this.locale(), n = [], r = [], w = this.headers(), m = !h, a = h && h.nplurals || 2, c = this.fmtr || d();
w[h ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in w) r.push(g + ": " + w[g]);
r = new k("", r.join("\n"));
r.comment(this.headcmt || "");
m && r.fuzzy(0, !0);
n.push(r.toString());
n.push("");
this.rows.each(function(f, e) {
f && (n.push(e.cat(c, m, a)), n.push(""));
});
return n.join("\n");
};
D = C.require("$34", "message.js").extend(k);
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
return q(this.source(), this.context());
};
D.toString = function() {
return this.cat(d());
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
v.init = function(y, q) {
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
function d(h, n, r) {
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
path: q.popath
}, q.project || {});
y.ajax.post("fsReference", h, b, d);
}
};
};
return v;
}({}, I, L));
C.register("$18", function(v, t, D) {
function y() {
this.inf = {};
}
function q() {
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
return (d || (d = q())).sniff(b);
};
let d;
return v;
}({}, I, L));
C.register("$19", function(v, t, D) {
function y(q) {
this.api = q;
this.chars = 0;
}
v.create = function(q) {
return new y(q);
};
t = y.prototype;
t.init = function(q, u) {
function d(f) {
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
var p = f.source(null, l);
if (p && (f.untranslated(l) || u)) {
{
l = f.notes();
const B = f.context();
f = p.length;
var x = g.isHtml(p);
p = {
source: p,
context: B,
notes: l
};
l = h[x ? 1 : 0];
x = l.items;
if (a && f > a) w++, f = void 0; else {
if (l.length + f > m || 50 === x.length) l = d(l), x = l.items;
x.push(p);
l.length += f;
n += f;
r += 1;
f = p;
}
}
f && (f.id = e);
}
}
const k = [], g = this.api;
let h = [], n = 0, r = 0, w = 0, m = 1e4, a = g.maxChr();
a && (m = Math.min(m, a));
d({
html: !1
});
d({
html: !0
});
const c = q.locale();
q.each(1 < c.nplurals ? function(f, e, l) {
b(e, l, 0);
b(e, l, 1);
} : function(f, e, l) {
b(e, l, 0);
});
h = [];
this.chars = n;
this.length = r;
this.batches = k;
this.locale = c;
w && g.stderr("Strings over " + m + " characters long will be skipped");
};
t.abort = function() {
this.state = "abort";
return this;
};
t.dispatch = function(q) {
function u(z, E) {
if (!b()) return !1;
if (!E) return !0;
f++;
const F = q.row(z.id), H = z.source;
let G = 0;
F.each(function(M, O, R) {
E !== R && (H === O || 1 < M && F.source(null, 1) === H) && (F.translate(E, M), 
G++, l++);
});
G && r("each", [ F ]);
}
function d(z) {
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
E && E.length ? m.batch(E, c, z.html, d(E)).fail(g).always(h) : h();
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
let w = this, m = w.api, a = w.batches || [], c = w.locale, f = 0, e = 0, l = 0, p = w.length, x = a.length, B = {
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
return Math.max(p - f, 0);
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
v.create = function(q) {
(y.prototype = new q()).batch = function(u, d, b, k) {
function g(w) {
let m = -1;
for (;++m < n && !1 !== k(m, w[m], d); );
}
const h = t.loco, n = u.length;
u = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(d),
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
C.register("$36", {
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
C.register("$21", function(v, t, D) {
function y() {}
v.create = function(q) {
q = y.prototype = new q();
q.toString = function() {
return "Google Translate";
};
q.parseError = function(u) {
if (u.error) {
const d = [], b = u.error.errors || [], k = b.length;
let g = -1;
for (;++g < k; ) d.push(b[g].message || "");
return "Error " + u.error.code + ": " + d.join(";");
}
return "";
};
q.getLangMap = function() {
return C.require("$36", "google.json");
};
q.batch = function(u, d, b, k) {
function g(m) {
const a = w.length;
let c = -1;
for (;++c < a && !1 !== k(c, (m[c] || {}).translatedText || "", d); );
}
const h = this, n = h.getSrc();
b = b ? "html" : "text";
const r = h.mapLang(d, h.getLangMap()), w = this.unwind(u, "source");
return h._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + n + "&target=" + r + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: h.key(),
q: w
}
}).done(function(m, a, c) {
m.data ? g(m.data.translations || []) : (h.stderr(h.parseError(m) || h.httpError(c)), 
g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$37", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
C.register("$22", function(v, t, D) {
function y() {}
v.create = function(q) {
q = y.prototype = new q();
q.parseError = function(u) {
var d = u.details || {};
let b = d.message;
d = d.texts;
return b ? (d && d !== b && (b += "; " + d), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (u.status || "0") + ": " + b) : "";
};
q.maxChr = function() {
return 1e3;
};
q.getLangMap = function() {
return C.require("$37", "lecto.json");
};
q.batch = function(u, d, b, k) {
function g(m) {
const a = w.length;
let c = -1, f = (m[0] || {
translated: []
}).translated || [];
for (;++c < a && (m = f[c] || "", !1 !== k(c, m, d)); );
}
const h = this;
b = this.getSrc();
const n = h.param("api") || "https://api.lecto.ai", r = h.mapLang(d, h.getLangMap()), w = this.unwind(u, "source");
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
}).done(function(m, a, c) {
m ? g(m.translations || []) : (h.stderr(h.parseError(m) || h.httpError(c)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$38", {
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
C.register("$23", function(v, t, D) {
function y() {}
v.create = function(q) {
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
return C.require("$38", "ms.json");
};
q.region = function() {
return this.param("region") || "global";
};
q.hash = function() {
return this.key() + this.region();
};
q.batch = function(u, d, b, k) {
function g(c) {
let f = -1;
for (var e; ++f < w && (e = c[f] || {}, e = e.translations || [], e = e[0] || {}, 
!1 !== k(f, e.text || "", d)); );
}
let h = this, n = [], r = h.getSrc();
u = this.unwind(u, "source");
let w = u.length, m = -1;
b = b ? "html" : "plain";
let a = h.mapLang(d, h.getLangMap());
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
}).done(function(c, f, e) {
c && c.length ? g(c) : (h.stderr(h.parseError(c) || h.httpError(e)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return v;
}({}, I, L));
C.register("$24", function(v, t, D) {
v.init = function(y) {
function q() {
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
H && (d(A(c)), H = !1);
if (l && M) {
var J = M, Q = A(F);
Q.find("span.loco-msg").text(J);
G || (Q.removeClass("jshide").hide().fadeIn(500), G = !0);
} else G && (d(A(F)), G = !1);
}
function d(J) {
J.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function b() {
if (l) return O && O.dialog("close"), u(), A(y).find('button[type="submit"]').attr("disabled", !1), 
A(t).triggerHandler("resize"), a && a(!0), !0;
x && O ? (H || (A(c).removeClass("jshide").hide().fadeIn(500), H = !0), G && (d(A(F)), 
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
A(c).find("span.loco-msg").text(J.message || "Something went wrong.");
M = J.warning || "";
J.notice && p.notices.info(J.notice);
if (l) "direct" !== f && (R = J.creds, k(y), e && J.success && p.notices.success(J.success)), 
b(); else if (J.reason) p.notices.info(J.reason); else if (J = J.prompt) {
var Q = q();
Q.html(J).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", h);
Q.find('input[type="submit"]').addClass("button-primary");
b();
A(t).triggerHandler("resize");
} else p.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function w() {
b();
}
function m(J) {
e = !1;
p.ajax.setNonce("fsConnect", z).post("fsConnect", J, r, w);
return J;
}
var a, c = y, f = null, e = !1, l = !1, p = t.loco, x = y.path.value, B = y.auth.value, z = y["loco-nonce"].value, E = A(c).find("button.button-primary"), F = D.getElementById(c.id + "-warn"), H = !1, G = !1, M = "", O;
p.notices.convert(F).stick();
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
C.register("$39", function(v, t, D) {
function y(b, k) {
return function(g) {
b.apply(g, k);
return g;
};
}
function q(b) {
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
function d(b) {
return function(k, g) {
return -1 * b(k, g);
};
}
v.sort = function(b, k, g, h) {
k = "n" === g ? q(k) : u(k);
h && (k = d(k));
return y([].sort, [ k ])(b);
};
return v;
}({}, I, L));
C.register("$25", function(v, t, D) {
v.init = function(y) {
function q(c) {
let f = -1;
const e = c.length;
for (A("tr", r).remove(); ++f < e; ) r.appendChild(c[f].$);
}
function u(c) {
g = c ? m.find(c, d) : d.slice(0);
n && (c = b[n], g = a(g, n, c.type, c.desc));
q(g);
}
let d = [], b = [], k = 0, g, h, n, r = y.getElementsByTagName("tbody")[0];
var w = y.getElementsByTagName("thead")[0];
let m = C.require("$10", "fulltext.js").init(), a = C.require("$39", "sort.js").sort;
w && r && (A("th", w).each(function(c, f) {
const e = f.getAttribute("data-sort-type");
e && (c = k, A(f).addClass("loco-sort").on("click", function(l) {
l.preventDefault();
{
l = c;
let p = b[l], x = p.type, B = !(p.desc = !p.desc);
g = a(g || d.slice(0), l, x, B);
q(g);
h && h.removeClass("loco-desc loco-asc");
h = A(p.$).addClass(B ? "loco-desc" : "loco-asc").removeClass(B ? "loco-asc" : "loco-desc");
n = l;
}
return !1;
}), b[k] = {
$: f,
type: e
});
f.hasAttribute("colspan") ? k += Number(f.getAttribute("colspan")) : k++;
}), A("tr", r).each(function(c, f) {
let e, l = [], p = {
_: c,
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
p[e] = f;
}
d[c] = p;
m.index(c, l);
}), y = A('form.loco-filter input[type="text"]', y.parentNode), y.length && (y = y[0], 
w = A(y.form), 1 < d.length ? C.require("$11", "LocoTextListener.js").listen(y, u) : w.hide(), 
w.on("submit", function(c) {
c.preventDefault();
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
google: C.require("$21", "google.js"),
lecto: C.require("$22", "lecto.js"),
microsoft: C.require("$23", "microsoft.js")
};
};
T.fs = C.require("$24", "fsconn.js");
A("#loco-admin.wrap table.wp-list-table").each(function(v, t) {
C.require("$25", "tables.js").init(t);
});
T.validate = function(v) {
v = (v = /^\d+\.\d+\.\d+/.exec(v && v[0] || "")) && v[0];
if ("2.7.2" === v) return !0;
T.notices.warn("admin.js is the wrong version (" + v + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
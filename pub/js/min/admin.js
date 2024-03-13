"use strict";

(function(J, L, A, ka) {
const B = function() {
function w(C) {
throw Error("Failed to require " + C);
}
const v = {};
return {
register: function(C, y) {
v[C] = y;
},
require: function(C, y) {
return v[C] || w(y);
},
include: function(C, y, p) {
return v[C] || (p ? w(y) : null);
}
};
}();
B.register("$1", function(w, v, C) {
function y(p) {
const u = typeof p;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(p)) console.error("Invalid plural: " + p); else return new Function("n", "return " + p);
"function" !== u && (p = function(d) {
return 1 != d;
});
return p;
}
w.init = function(p) {
function u(h, n, q) {
return (h = f[h]) && h[q] ? h[q] : n || "";
}
function d(h) {
return u(h, h, 0);
}
function a(h, n) {
return u(n + "" + h, h, 0);
}
function k(h, n, q) {
q = Number(p(q));
isNaN(q) && (q = 0);
return u(h, q ? n : h, q);
}
p = y(p);
let f = {};
return {
__: d,
_x: a,
_n: k,
_: d,
x: a,
n: k,
load: function(h) {
f = h || {};
return this;
},
pluraleq: function(h) {
p = y(h);
return this;
}
};
};
return w;
}({}, J, L));
B.register("$2", function(w, v, C) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, J, L));
B.register("$3", function(w, v, C) {
Number.prototype.format = function(y, p, u) {
var d = Math.pow(10, y || 0);
y = [];
d = String(Math.round(d * this) / d);
var a = d.split(".");
d = a[0];
a = a[1];
let k = d.length;
do {
y.unshift(d.substring(k - 3, k));
} while (0 < (k -= 3));
d = y.join(u || ",");
if (a) {
{
u = a;
y = u.length;
let f;
for (;"0" === u.charAt(--y); ) f = y;
f && (u = u.substring(0, f));
a = u;
}
a && (d += (p || ".") + a);
}
return d;
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
}({}, J, L));
B.register("$4", function(w, v, C) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var p = Object(this), u = p.length >>> 0;
if (0 === u) return -1;
var d = 0;
1 < arguments.length && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && Infinity != d && -Infinity != d && (d = (0 < d || -1) * Math.floor(Math.abs(d))));
if (d >= u) return -1;
for (d = 0 <= d ? d : Math.max(u - Math.abs(d), 0); d < u; d++) if (d in p && p[d] === y) return d;
return -1;
});
return w;
}({}, J, L));
B.register("$5", function(w, v, C) {
C = v.JSON;
C || (C = {
parse: A.parseJSON,
stringify: null
}, v.JSON = C);
w.parse = C.parse;
w.stringify = C.stringify;
return w;
}({}, J, L));
B.register("$6", function(w, v, C) {
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
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, a, k) {
if ("%" === k) return "%";
d = a ? p[Number(a) - 1] : p[u++];
return null != d ? String(d) : "s" === k ? "" : "0";
});
};
return w;
}({}, J, L));
B.register("$27", function(w, v, C) {
function y(p) {
return function(u, d) {
let a = u[p] || 0;
for (;(u = u.offsetParent) && u !== (d || C.body); ) a += u[p] || 0;
return a;
};
}
w.top = y("offsetTop");
w.left = y("offsetLeft");
w.el = function(p, u) {
p = C.createElement(p || "div");
u && (p.className = u);
return p;
};
w.txt = function(p) {
return C.createTextNode(p || "");
};
w.rect = function(p) {
return p.getBoundingClientRect();
};
return w;
}({}, J, L));
B.register("$7", function(w, v, C) {
function y(m, g, l) {
function r() {
z();
x = setTimeout(g, l);
}
function z() {
x && clearTimeout(x);
x = 0;
}
let x = 0;
r();
A(m).on("mouseenter", z).on("mouseleave", r);
return {
die: function() {
z();
A(m).off("mouseenter mouseleave");
}
};
}
function p(m, g) {
m.fadeTo(g, 0, function() {
m.slideUp(g, function() {
m.remove();
A(v).triggerHandler("resize");
});
});
return m;
}
function u(m, g) {
function l(F) {
q[D] = null;
p(A(m), 250);
x && x.die();
var H;
if (H = F) F.stopPropagation(), F.preventDefault(), H = !1;
return H;
}
function r(F) {
x && x.die();
return x = y(m, l, F);
}
const z = A(m);
let x, D, E, G = z.find("button");
0 === G.length && (z.addClass("is-dismissible"), G = A('<button type="button" class="notice-dismiss"> </a>').appendTo(z));
G.off("click").on("click", l);
A(v).triggerHandler("resize");
n();
D = q.length;
q.push(l);
g && (x = r(g));
return {
link: function(F, H) {
var M = H || F;
H = A(m).find("nav");
F = A("<nav></nav>").append(A("<a></a>").attr("href", F).text(M));
E ? (E.push(F.html()), H.html(E.join("<span> | </span>"))) : (E = [ F.html() ], 
A(m).addClass("has-nav").append(F));
return this;
},
stick: function() {
x && x.die();
x = null;
q[D] = null;
return this;
},
slow: function(F) {
r(F || 1e4);
return this;
}
};
}
function d(m, g, l) {
const r = B.require("$27", "dom.js").el;
m = A('<div class="notice notice-' + m + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const z = A(r("p"));
l = A(r("span")).text(l);
g = A(r("strong", "has-icon")).text(g + ": ");
z.append(g).append(l).appendTo(m);
return m;
}
function a(m, g, l, r) {
m = d(l, g, m).css("opacity", "0").fadeTo(500, 1);
A(v).triggerHandler("resize");
return u(m, r);
}
function k(m) {
return a(m, c, "warning");
}
function f() {
A("#loco-notices").find("div.notice").each(function(m, g) {
-1 === g.className.indexOf("jshide") && (m = -1 === g.className.indexOf("notice-success") ? null : 5e3, 
u(g, m));
});
}
const h = v.console || {
log: function() {}
}, n = Date.now || function() {
return new Date().getTime();
};
let q = [], t, c, b, e;
w.error = function(m) {
return a(m, t, "error");
};
w.warn = k;
w.info = function(m) {
return a(m, b, "info");
};
w.success = function(m) {
return a(m, e, "success", 5e3);
};
w.warning = k;
w.log = function() {
h.log.apply(h, arguments);
};
w.debug = function() {
(h.debug || h.log).apply(h, arguments);
};
w.clear = function() {
let m = -1;
const g = q, l = g.length;
for (;++m < l; ) {
const r = g[m];
r && r.call && r();
}
q = [];
return w;
};
w.create = d;
w.raise = function(m) {
(w[m.type] || w.error).call(w, m.message);
};
w.convert = u;
w.init = function(m) {
t = m._("Error");
c = m._("Warning");
b = m._("Notice");
e = m._("OK");
setTimeout(f, 1e3);
return w;
};
return w;
}({}, J, L));
B.register("$8", function(w, v, C) {
function y(c) {
let b = A("<pre>" + c + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = c) || (b = "Blank response from server");
return b;
}
function p(c) {
return (c = c.split(/[\r\n]/)[0]) ? (c = c.replace(/ +in +\S+ on line \d+/, ""), 
c = c.replace(/^[()! ]+Fatal error:\s*/, "")) : q._("Server returned invalid data");
}
function u(c) {
v.console && console.error && console.error('No nonce for "' + c + '"');
return "";
}
function d(c, b, e) {
c[b] = e;
}
function a(c, b, e) {
c.push({
name: b,
value: e
});
}
function k(c, b, e) {
c.append(b, e);
}
function f(c, b, e, m) {
function g(r, z, x) {
if ("abort" !== z) {
var D = q || {
_: function(O) {
return O;
}
}, E = r.status || 0, G = r.responseText || "", F = y(G), H = r.getResponseHeader("Content-Type") || "Unknown type", M = r.getResponseHeader("Content-Length") || G.length;
"success" === z && x ? l.error(x) : (l.error(p(F) + ".\n" + D._("Check console output for debugging information")), 
l.log("Ajax failure for " + c, {
status: E,
error: z,
message: x,
output: G
}), "parsererror" === z && (x = "Response not JSON"), l.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (x || D._("Unknown error")) + '" (' + H + " " + M + " bytes)", F, "====" ].join("\n")));
e && e.call && e(r, z, x);
t = r;
}
}
m.url = h;
m.dataType = "json";
const l = B.require("$7", "notices.js").clear();
t = null;
return A.ajax(m).fail(g).done(function(r, z, x) {
const D = r && r.data, E = r && r.notices, G = E && E.length;
!D || r.error ? g(x, z, r && r.error && r.error.message) : b && b(D, z, x);
for (r = -1; ++r < G; ) l.raise(E[r]);
});
}
const h = v.ajaxurl || "/wp-admin/admin-ajax.php";
let n = {}, q, t;
w.init = function(c) {
n = c.nonces || n;
return w;
};
w.localise = function(c) {
q = c;
return w;
};
w.xhr = function() {
return t;
};
w.strip = y;
w.parse = p;
w.submit = function(c, b, e) {
function m(x, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function g(x, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function l(x) {
x.find(".button-primary").removeClass("loading");
x.find("button").each(g);
x.find("input").each(g);
x.find("select").each(g);
x.find("textarea").each(g);
x.removeClass("disabled loading");
}
const r = A(c), z = r.serialize();
(function(x) {
x.find(".button-primary").addClass("loading");
x.find("button").each(m);
x.find("input").each(m);
x.find("select").each(m);
x.find("textarea").each(m);
x.addClass("disabled loading");
})(r);
return f(c.route.value, function(x, D, E) {
l(r);
b && b(x, D, E);
}, function(x, D, E) {
l(r);
e && e(x, D, E);
}, {
type: c.method,
data: z
});
};
w.post = function(c, b, e, m) {
let g = !0, l = b || {}, r = n[c] || u(c);
v.FormData && l instanceof FormData ? (g = !1, b = k) : b = Array.isArray(l) ? a : d;
b(l, "action", "loco_json");
b(l, "route", c);
b(l, "loco-nonce", r);
return f(c, e, m, {
type: "post",
data: l,
processData: g,
contentType: g ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(c, b, e, m) {
b = b || {};
const g = n[c] || u(c);
b.action = "loco_json";
b.route = c;
b["loco-nonce"] = g;
return f(c, e, m, {
type: "get",
data: b
});
};
w.setNonce = function(c, b) {
n[c] = b;
return w;
};
return w;
}({}, J, L));
B.register("$28", {
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
B.register("$9", function(w, v, C) {
function y() {}
const p = B.require("$28", "rtl.json");
let u;
w.init = function() {
return new y();
};
w.cast = function(d) {
return d instanceof y ? d : "string" === typeof d ? w.parse(d) : w.clone(d);
};
w.clone = function(d) {
const a = new y();
for (const k in d) a[k] = d[k];
return a;
};
w.parse = function(d) {
d = (u || (u = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(d);
if (!d) return null;
const a = new y();
a.lang = d[1].toLowerCase();
a.region = (d[2] || "").toUpperCase();
a.variant = (d[3] || "").toLowerCase();
return a;
};
v = y.prototype;
v.isValid = function() {
return !!this.lang;
};
v.isKnown = function() {
const d = this.lang;
return !(!d || "zxx" === d);
};
v.toString = function(d) {
d = d || "_";
let a = this.lang || "zxx";
this.region && (a += d + this.region);
this.variant && (a += d + this.variant);
return a;
};
v.getIcon = function() {
let d = 3, a = [];
const k = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const f = k[d], h = this[f];
h && (a.push(f), a.push(f + "-" + h.toLowerCase()));
}
return a.join(" ");
};
v.isRTL = function() {
return !!p[String(this.lang).toLowerCase()];
};
v = null;
return w;
}({}, J, L));
B.register("$29", {
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
B.register("$10", function(w, v, C) {
w.init = function() {
function y(b) {
return q[b] || b;
}
function p(b, e, m) {
let g, l, r = String(b || "").toLowerCase().replace(n, y).split(t), z = r.length;
for (;0 !== z--; ) if ((b = r[z]) && null == m[b]) for (e.push(b), m[b] = !0, g = b.split(c), 
l = g.length; 0 !== l--; ) (b = g[l]) && null == m[b] && (e.push(b), m[b] = !0);
return e;
}
function u(b) {
return p(b, [], {});
}
function d(b) {
let e = [], m = {}, g = b.length;
for (;0 !== g--; ) p(b[g], e, m);
return e;
}
function a() {
h = "";
f = [];
}
let k = [], f = [], h = "";
const n = /[^a-z0-9]/g, q = B.require("$29", "flatten.json"), t = /\s+/, c = /[^\d\p{L}]+/u;
return {
split: u,
find: function(b, e) {
{
const m = [], g = [], l = String(b || "").toLowerCase().replace(n, y).split(" "), r = l.length, z = h && b.substring(0, h.length) === h ? f : k, x = z.length, D = !!e;
let E = -1, G = 0;
a: for (;++E < x; ) {
const F = z[E], H = F && F.length;
if (H) {
b: for (let M = 0; M < r; M++) {
const O = l[M];
for (let R = 0; R < H; R++) if (0 === F[R].indexOf(O)) continue b;
continue a;
}
g[E] = F;
m.push(D ? e[E] : E);
} else G++;
}
h = b;
f = g;
b = m;
}
return b;
},
add: function(b, e) {
k[b] = u(e);
h && a();
},
push: function(b) {
k[k.length] = d(b);
h && a();
},
index: function(b, e) {
k[b] = d(e);
h && a();
},
size: function() {
return k.length;
},
clear: function() {
k = [];
h && a();
},
remove: function(b) {
k[b] = null;
h && a();
},
noop: function() {
a();
return [];
}
};
};
return w;
}({}, J, L));
B.register("$11", function(w, v, C) {
w.listen = function(y, p) {
function u() {
b[f ? "show" : "hide"]();
}
function d(e) {
c && q.setAttribute("size", 2 + e.length);
f = e;
u();
return e;
}
function a() {
h = null;
p(f);
}
function k(e) {
let m = q.value;
t && m === t && (m = "");
m !== f ? (h && clearTimeout(h), d(m), e ? h = setTimeout(a, e) : a()) : h && null == e && (clearTimeout(h), 
a());
}
let f, h, n = 150;
const q = y instanceof jQuery ? y[0] : y, t = v.attachEvent && q.getAttribute("placeholder"), c = 1 === Number(q.size), b = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(e) {
e.preventDefault();
q.value = "";
k();
A(q).triggerHandler("blur");
return !1;
});
d(q.value);
A(q).on("input", function() {
k(n);
return !0;
}).on("blur focus change", function() {
k(null);
return !0;
}).after(b);
u();
return {
delay: function(e) {
n = e;
return this;
},
ping: function(e) {
e ? (h && clearTimeout(h), e = q.value, t && e === t && (e = ""), d(e), a(), e = void 0) : e = k();
return e;
},
val: function(e) {
if (null == e) return f;
h && clearTimeout(h);
q.value = d(e);
u();
},
el: function() {
return q;
},
blur: function(e) {
return A(q).on("blur", e);
},
destroy: function() {
h && clearTimeout(h);
}
};
};
return w;
}({}, J, L));
B.register("$12", function(w, v, C) {
function y(a, k) {
return "function" == typeof a ? a.call(k) : a;
}
function p(a, k) {
this.$element = A(a);
this.options = k;
this.enabled = !0;
this.fixTitle();
}
w.init = function(a, k) {
let f = {
fade: !0,
offset: 5,
delayIn: u,
delayOut: d,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
k && (f = A.extend({}, f, k));
a.tipsy(f);
};
w.delays = function(a, k) {
u = a || 150;
d = k || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(a, k) {
k.data("tipsy").setTitle(a);
};
let u, d;
w.delays();
A(C.body).on("overlayOpened overlayClosing", function(a) {
w.kill();
return !0;
});
p.prototype = {
show: function() {
var a = this.getTitle();
if (a && this.enabled) {
var k = this.tip();
k.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
k[0].className = "tipsy";
k.remove().css({
top: 0,
left: 0
}).prependTo(C.body);
a = (a = this.options.anchor) ? this.$element.find(a) : this.$element;
a = A.extend({}, a.offset(), {
width: a[0].offsetWidth,
height: a[0].offsetHeight
});
var f = k[0].offsetWidth, h = k[0].offsetHeight, n = y(this.options.gravity, this.$element[0]);
switch (n.charAt(0)) {
case "n":
var q = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - f / 2
};
break;

case "s":
q = {
top: a.top - h - this.options.offset,
left: a.left + a.width / 2 - f / 2
};
break;

case "e":
q = {
top: a.top + a.height / 2 - h / 2,
left: a.left - f - this.options.offset
};
break;

case "w":
q = {
top: a.top + a.height / 2 - h / 2,
left: a.left + a.width + this.options.offset
};
}
2 == n.length && ("w" == n.charAt(1) ? q.left = a.left + a.width / 2 - 15 : q.left = a.left + a.width / 2 - f + 15);
k.css(q).addClass("tipsy-" + n);
k.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + n.charAt(0);
this.options.className && k.addClass(y(this.options.className, this.$element[0]));
k.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var a = this.$element, k = a.attr("title") || "";
(k || "string" !== typeof a.attr("original-title")) && a.attr("original-title", k).removeAttr("title");
},
getTitle: function() {
var a, k = this.$element, f = this.options;
this.fixTitle();
"string" == typeof f.title ? a = k.attr("title" == f.title ? "original-title" : f.title) : "function" == typeof f.title && (a = f.title.call(k[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || f.fallback;
},
setTitle: function(a) {
var k = this.$element;
k.attr("default-title") || k.attr("default-title", this.getTitle());
null == a && (a = k.attr("default-title") || this.getTitle());
k.attr("original-title", a);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
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
A.fn.tipsy = function(a) {
function k(t) {
var c = A.data(t, "tipsy");
c || (c = new p(t, A.fn.tipsy.elementOptions(t, a)), A.data(t, "tipsy", c));
return c;
}
function f() {
var t = k(this), c = a.delayIn;
t.hoverState = "in";
0 == c ? t.show() : (t.fixTitle(), setTimeout(function() {
"in" == t.hoverState && t.show();
}, c));
}
function h() {
var t = k(this), c = a.delayOut;
t.hoverState = "out";
0 == c ? t.hide() : (t.tip().removeClass("in"), setTimeout(function() {
"out" == t.hoverState && t.hide();
}, c));
}
a = A.extend({}, A.fn.tipsy.defaults, a);
a.live || this.each(function() {
k(this);
});
if ("manual" != a.trigger) {
var n = a.live ? "live" : "bind", q = "hover" == a.trigger ? "mouseleave" : "blur";
this[n]("hover" == a.trigger ? "mouseenter" : "focus", f)[n](q, h);
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
A.fn.tipsy.elementOptions = function(a, k) {
return A.metadata ? A.extend({}, k, A(a).metadata()) : k;
};
A.fn.tipsy.autoNS = function() {
return A(this).offset().top > A(C).scrollTop() + A(v).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(C).scrollLeft() + A(v).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(a, k) {
return function() {
var f = k[0], h = 1 < k.length ? k[1] : !1, n = A(C).scrollTop() + a, q = A(C).scrollLeft() + a, t = A(this);
t.offset().top < n && (f = "n");
t.offset().left < q && (h = "w");
A(v).width() + A(C).scrollLeft() - t.offset().left < a && (h = "e");
A(v).height() + A(C).scrollTop() - t.offset().top < a && (f = "s");
return f + (h ? h : "");
};
};
return w;
}({}, J, L));
B.register("$42", function(w, v, C) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return B.require("$6", "string.js").trim(this, " \n\r\t");
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
function y(h) {
return "&#" + h.charCodeAt(0) + ";";
}
function p(h, n) {
return '<a href="' + h + '" target="' + (n.indexOf(k) ? "_blank" : "_top") + '">' + n + "</a>";
}
let u, d, a, k, f = function() {
u = /[<>&]/g;
d = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
f = null;
};
return function(h, n) {
f && f();
h = h.replace(u, y);
n && (h = h.replace(a, p).replace(d, "<br />"));
return h;
};
}();
return w;
}({}, J, L));
B.register("$43", function(w, v, C) {
function y() {}
let p, u;
const d = B.require("$28", "rtl.json");
w.init = function() {
return new y();
};
w.cast = function(a) {
return a instanceof y ? a : "string" === typeof a ? w.parse(a) : w.clone(a);
};
w.clone = function(a) {
const k = new y();
for (const f in a) k[f] = a[f];
return k;
};
w.parse = function(a) {
p || (u = /[-_+]/, p = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(u).join("-");
a = p.exec(a);
if (!a) return null;
const k = new y();
k.lang = a[1].toLowerCase();
a[2] && (k.script = a[2].charAt(0).toUpperCase() + a[2].substring(1).toLowerCase());
a[3] && (k.region = a[3].toUpperCase());
a[4] && (k.variant = a[4].toLowerCase());
a[5] && (k.extension = a[5]);
return k;
};
v = y.prototype;
v.isValid = function() {
return !!this.lang;
};
v.isKnown = function() {
const a = this.lang;
return !(!a || "zxx" === a);
};
v.toString = function(a) {
a = a || "-";
let k, f = this.lang || "zxx";
if (k = this.script) f += a + k;
if (k = this.region) f += a + k;
if (k = this.variant) f += a + k;
if (k = this.extension) f += a + k;
return f;
};
v.getIcon = function() {
let a = 4, k = [];
const f = [ "variant", "region", "script", "lang" ];
for (;0 !== a--; ) {
const h = f[a];
let n = this[h];
n && (n.join && (n = n.join("-")), 1 === a && 3 === n.length ? k.push("region-m49") : k = k.concat([ h, h + "-" + n.toLowerCase() ]));
}
return k.join(" ");
};
v.isRTL = function() {
return !!d[String(this.script || this.lang).toLowerCase()];
};
v = null;
return w;
}({}, J, L));
B.register("$44", function(w, v, C) {
function y(a) {
v.console && console.error && console.error(a);
}
function p() {
y("Method not implemented");
}
function u() {}
function d(a) {}
u.prototype.toString = function() {
return "[Undefined]";
};
d.prototype._validate = function(a) {
let k, f, h = !0;
for (k in this) f = this[k], f === p ? (y(a + "." + k + "() must be implemented"), 
h = !1) : f instanceof u && (y(a + "." + k + " must be defined"), h = !1);
return h;
};
w.init = function(a, k) {
const f = new d();
if (a) {
let h = a.length;
for (;0 !== h--; ) f[a[h]] = p;
}
if (k) for (a = k.length; 0 !== a--; ) f[k[a]] = new u();
return f;
};
w.validate = function(a) {
const k = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(k && k[1] || "Object");
};
return w;
}({}, J, L));
B.register("$51", function(w, v, C) {
let y = 0, p = v.requestAnimationFrame, u = v.cancelAnimationFrame;
if (!p || !u) for (const a in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (p = v[a + "RequestAnimationFrame"]) if (u = v[a + "CancelAnimationFrame"] || v[a + "CancelRequestAnimationFrame"]) break;
p && u || (p = function(a) {
var k = d();
const f = Math.max(0, 16 - (k - y)), h = k + f;
k = v.setTimeout(function() {
a(h);
}, f);
y = h;
return k;
}, u = function(a) {
clearTimeout(a);
});
const d = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, k) {
function f() {
n = p(f, k);
a(h++);
}
let h = 0, n;
f();
return {
stop: function() {
n && u(n);
n = null;
}
};
};
return w;
}({}, J, L));
B.register("$48", function(w, v, C) {
function y(q, t, c, b) {
if (d) {
const e = c;
c = function(m) {
if ((m.MSPOINTER_TYPE_TOUCH || "touch") === m.pointerType) return e(m);
};
}
q.addEventListener(t, c, b);
return {
unbind: function() {
q.removeEventListener(t, c, b);
}
};
}
function p(q) {
q.preventDefault();
q.stopPropagation();
return !1;
}
let u;
const d = !!v.navigator.msPointerEnabled, a = d ? "MSPointerDown" : "touchstart", k = d ? "MSPointerMove" : "touchmove", f = d ? "MSPointerUp" : "touchend";
w.ok = function(q) {
null == u && (u = "function" === typeof C.body.addEventListener);
u && q && q(w);
return u;
};
w.ms = function() {
return d;
};
w.dragger = function(q, t) {
function c(g) {
q.addEventListener(g, e[g], !1);
}
function b(g) {
q.removeEventListener(g, e[g], !1);
}
const e = {};
e[a] = function(g) {
h(g, function(l, r) {
r.type = a;
t(g, r, m);
});
c(k);
c(f);
return !0;
};
e[f] = function(g) {
b(k);
b(f);
h(g, function(l, r) {
r.type = f;
t(g, r, m);
});
return !0;
};
e[k] = function(g) {
h(g, function(l, r) {
r.type = k;
t(g, r, m);
});
return p(g);
};
c(a);
let m = {
kill: function() {
b(a);
b(k);
b(f);
q = m = t = null;
}
};
return m;
};
w.swiper = function(q, t, c) {
function b(G) {
q.addEventListener(G, z[G], !1);
}
function e(G) {
q.removeEventListener(G, z[G], !1);
}
function m() {
g && g.stop();
g = null;
}
let g, l, r, z = {}, x = [], D = [], E = [];
z[a] = function(G) {
l = !1;
m();
const F = n();
h(G, function(H, M) {
x[H] = F;
D[H] = M.clientX;
E[H] = M.clientY;
});
r = q.scrollLeft;
return !0;
};
z[f] = function(G) {
h(G, function(F, H) {
const M = n() - x[F];
F = D[F] - H.clientX;
t(Math.abs(F) / M, F ? 0 > F ? -1 : 1 : 0);
});
r = null;
return !0;
};
z[k] = function(G) {
let F, H;
null == r || h(G, function(M, O) {
F = D[M] - O.clientX;
H = E[M] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(F)) return l = !0;
F && (l = !0, q.scrollLeft = Math.max(0, r + F));
return p(G);
};
if (!d || c) b(a), b(k), b(f), d && (q.className += " mstouch");
return {
kill: function() {
e(a);
e(k);
e(f);
m();
},
swiped: function() {
return l;
},
ms: function() {
return d;
},
snap: function(G) {
d && !c && (q.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + G + "px)", 
q.style["-ms-scroll-snap-type"] = "mandatory", q.style["-ms-scroll-chaining"] = "none");
},
scroll: function(G, F, H) {
m();
let M = q.scrollLeft;
const O = G > M ? 1 : -1, R = Math[1 === O ? "min" : "max"], I = Math.round(16 * F * O);
return g = B.require("$51", "fps.js").loop(function(P) {
P && (M = Math.max(0, R(G, M + I)), q.scrollLeft = M, G === M && (m(), H && H(M)));
}, q);
}
};
};
w.start = function(q, t) {
return y(q, a, t, !1);
};
w.move = function(q, t) {
return y(q, k, t, !1);
};
w.end = function(q, t) {
return y(q, f, t, !1);
};
const h = w.each = function(q, t) {
if (d) (q.MSPOINTER_TYPE_TOUCH || "touch") === q.pointerType && t(0, q); else {
q = (q.originalEvent || q).changedTouches || [];
for (var c = -1; ++c < q.length; ) t(c, q[c]);
}
}, n = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, J, L));
B.register("$52", function(w, v, C) {
w.init = function(y) {
function p() {
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
const a = y.parentNode;
let k = a.insertBefore(C.createElement("div"), y);
A(y).on("input", u).on("scroll", p);
A(a).addClass("has-mirror");
k.className = "ta-mirror";
const f = y.offsetWidth - y.clientWidth;
2 < f && (k.style.marginRight = String(f - 2) + "px");
u();
p();
return {
kill: function() {
A(y).off("input", u).off("scroll", p);
a.removeChild(k);
k = null;
A(a).removeClass("has-mirror");
}
};
};
return w;
}({}, J, L));
B.register("$36", function(w, v, C) {
function y(d, a) {
d = p[d] || [];
a = a && v[a];
const k = d.length;
let f = -1, h = 0;
for (;++f < k; ) {
const n = d[f];
"function" === typeof n && (n(a), h++);
}
return h;
}
const p = {};
let u = "";
w.load = function(d, a, k) {
function f() {
q && (clearTimeout(q), q = null);
t && (t.onreadystatechange = null, t = t = t.onload = null);
d && (delete p[d], d = null);
}
function h(c, b) {
c = t && t.readyState;
if (b || !c || "loaded" === c || "complete" === c) b || y(d, k), f();
}
function n() {
if (0 === y(d)) throw Error('Failed to load "' + (k || d) + '"');
f();
}
if (k && v[k]) "function" === typeof a && a(v[k]); else if (null != p[d]) p[d].push(a); else {
p[d] = [ a ];
var q = setTimeout(n, 4e3), t = C.createElement("script");
t.setAttribute("src", d);
t.setAttribute("async", "true");
t.onreadystatechange = h;
t.onload = h;
t.onerror = n;
t.onabort = f;
C.getElementsByTagName("head")[0].appendChild(t);
}
};
w.stat = function(d) {
var a;
if (!(a = u)) {
{
a = C.getElementsByTagName("script");
const k = a.length;
let f = -1, h = "";
for (;++f < k; ) {
const n = a[f].getAttribute("src");
if (n) {
const q = n.indexOf("/lib/vendor");
if (-1 !== q) {
h = n.substring(0, q);
break;
}
}
}
a = h || "/static";
}
a = u = a;
}
return a + d;
};
w.css = function(d, a) {
C.getElementById(a) || A("<link />").attr("rel", "stylesheet").attr("href", d).attr("id", a).appendTo(C.head);
};
return w;
}({}, J, L));
B.register("$16", function(w, v, C) {
function y(n, q) {
n.setReadOnly(!1);
n.on("change", function(t, c) {
return q.val(c.getValue());
});
n.on("focus", function() {
return q.focus();
});
n.on("blur", function() {
return q.blur();
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
function d(n, q) {
function t() {
this.HighlightRules = b;
}
n = n.require;
const c = n("ace/lib/oop"), b = a(q);
c.inherits(b, n("ace/mode/text_highlight_rules").TextHighlightRules);
c.inherits(t, n("ace/mode/text").Mode);
return new t();
}
function a(n) {
return function() {
let q = {
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
}, t = k(n);
"icu" === n ? q = {
start: q.start.concat([ {
token: "icu-quoted",
regex: /'([{}][^']*)?'/
}, {
token: "printf",
regex: "{[^!-/:-@\\[-^{-~¡¢£¤¥¦§©«¬®°±¶»¿×÷\\u2010-\\u2027\\u2030-\\u203E\\u2041-\\u2053\\u2055-\\u205E\\u2190-\\u245F\\u2500-\\u2775\\u2794-\\u2BFF\\u2E00-\\u2E7F\\u3001-\\u3003\\u3008-\\u3020\\u3030\\uFD3E\\uFD3F\\uFE45\\uFE46]+(,[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*(?:number|date|time|spellout|ordinal|duration)[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*(,[\\s\\u0085\\u200E\\u200F\\u2028\\u2029]*[^{}]+)?)?}"
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
} : t && q.start.push({
token: "printf",
regex: t
});
this.$rules = q;
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
return f || /%%/;
}
}
let f, h = "auto";
w.init = function(n, q, t) {
let c, b = !1, e = t || h, m = n.parentNode, g = m.appendChild(C.createElement("div"));
A(m).addClass("has-proxy has-ace");
B.require("$36", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(l) {
if (g) {
if (!l) throw Error("Failed to load code editor");
c = l.edit(g);
var r = c.session, z = c.renderer;
c.$blockScrolling = Infinity;
c.setShowInvisibles(b);
c.setWrapBehavioursEnabled(!1);
c.setBehavioursEnabled(!1);
c.setHighlightActiveLine(!1);
r.setUseSoftTabs(!1);
z.setShowGutter(!0);
z.setPadding(10);
z.setScrollMargin(8);
r.setMode(d(l, e));
c.setValue(n.value, -1);
r.setUseWrapMode(!0);
q ? y(c, q) : u(c);
}
}, "ace");
return {
kill: function() {
c && (p(c), c.destroy(), c = null);
g && (m.removeChild(g), A(m).removeClass("has-proxy has-ace"), g = null);
return this;
},
disable: function() {
c && u(c);
q = null;
return this;
},
enable: function(l) {
q = l;
c && y(c, l);
return this;
},
resize: function() {
c && c.resize();
return this;
},
val: function(l) {
c && l !== c.getValue() && c.setValue(l, -1);
return this;
},
invs: function(l) {
l = l || !1;
b !== l && (b = l, c && c.setShowInvisibles(l));
return this;
},
strf: function(l) {
l = l || h;
l !== e && (e = l, c && c.session.setMode(d(v.ace, l)));
return this;
},
focus: function() {
c && c.focus();
return this;
}
};
};
w.strf = function(n, q) {
h = n;
f = q;
return w;
};
return w;
}({}, J, L));
B.register("$53", function(w, v, C) {
function y(a, k) {
function f() {
return k.val(a.getContent());
}
a.on("input", f);
a.on("change", f);
a.on("focus", function() {
return k.focus();
});
a.on("blur", function() {
return k.blur();
});
a.setMode("design");
}
function p(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function u(a) {
p(a);
a.setMode("readonly");
}
let d = 0;
w.load = function(a) {
const k = B.require("$36", "remote.js");
k.css(k.stat("/css/lib/tinymce.css"), "tinymce-css");
k.load(k.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, k) {
function f(l) {
t = l;
c = "<p>" === l.substring(0, 3) && "</p>" === l.substring(l.length - 4);
return l.replace(/(<\/?)script/gi, "$1loco:script");
}
function h(l) {
n = l;
l._getContent = l.getContent;
l.getContent = function(r) {
r = this._getContent(r);
r = r.replace(/(<\/?)loco:script/gi, "$1script");
if (!c && "<p>" === r.substring(0, 3) && "</p>" === r.substring(r.length - 4)) {
const z = r.substring(3, r.length - 4);
if (z === t || -1 === z.indexOf("</p>")) r = z;
}
return r;
};
l._setContent = l.setContent;
l.setContent = function(r, z) {
return this._setContent(f(r), z);
};
k ? (y(l, k), k.reset()) : u(l);
A(m).removeClass("loading");
}
let n, q = !1, t = "", c = !1, b = a.parentNode, e = b.parentNode, m = b.appendChild(C.createElement("div")), g = e.insertBefore(C.createElement("nav"), b);
g.id = "_tb" + String(++d);
A(b).addClass("has-proxy has-mce");
A(m).addClass("mce-content-body loading").html(f(a.value));
w.load(function(l) {
if (!l) throw Error("Failed to load HTML editor");
m && l.init({
inline: !0,
target: m,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + g.id,
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
l = f(l);
null == n ? (a.value = l, A(m).html(l)) : n.getContent() !== l && n.setContent(l);
k && k.val(l);
return this;
},
kill: function() {
n && (k && k.val(n.getContent()), p(n), n.destroy(), n = null);
m && (b.removeChild(m), A(b).removeClass("has-proxy has-mce"), m = null);
g && (e.removeChild(g), g = null);
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
q !== l && (q = l, A(b)[l ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, J, L));
B.register("$54", function(w, v, C) {
w.init = function(y, p) {
function u(e) {
t !== e && (b.textContent = e.format(0), t = e, e = 0 === e ? "empty" : 0 === p || e < p ? "lt" : p === e ? "eq" : "gt", 
e !== q && (q = e, c.className = "wg-count is-" + e));
}
function d(e) {
n && (c.removeChild(n), n = null);
0 < e && (n = c.appendChild(f.el("span").appendChild(f.txt(" / " + e.format(0)))));
p = e;
}
function a(e, m) {
u(m.length);
}
function k() {
q = "";
t = -1;
u(y.val().length);
}
const f = B.require("$27", "dom.js"), h = A(y.parent()).on("changing", a);
let n, q, t, c = f.el("div"), b = c.appendChild(f.el("span"));
h.append(c);
d(p);
k();
return {
ping: function(e) {
null != e && e !== p && (p = e, d(e));
k();
},
kill: function() {
const e = h && h[0];
e && c && c.parentNode === e && (h.off("changing", a), e.removeChild(c));
}
};
};
return w;
}({}, J, L));
B.register("$49", function(w, v, C) {
function y(d) {
function a() {
b && (q.off("input", k), b = !1);
}
function k() {
const m = d.value;
m !== e && (q.trigger("changing", [ m, e ]), e = m);
}
function f() {
k();
b && c !== e && q.trigger("changed", [ e ]);
}
function h() {
u = d;
c = e;
b || (q.on("input", k), b = !0);
q.trigger("editFocus");
t.addClass("has-focus");
return !0;
}
function n() {
u === d && (u = null);
q.trigger("editBlur");
t.removeClass("has-focus");
b && (f(), a());
return !0;
}
const q = A(d), t = A(d.parentNode);
let c, b = !1, e = d.value;
q.on("blur", n).on("focus", h);
return {
val: function(m) {
e !== m && (d.value = m, q.triggerHandler("input"), e = m);
return !0;
},
kill: function() {
a();
q.off("blur", n).off("focus", h);
},
fire: function() {
e = null;
k();
},
ping: f,
blur: n,
focus: h,
reset: function() {
c = e = d.value;
}
};
}
function p(d) {
this.e = d;
}
let u;
w._new = function(d) {
return new p(d);
};
w.init = function(d) {
const a = new p(d);
d.disabled ? (d.removeAttribute("disabled"), a.disable()) : d.readOnly ? a.disable() : a.enable();
return a;
};
v = p.prototype;
v.destroy = function() {
this.unlisten();
const d = this.p;
d && (d.kill(), this.p = null);
this.nocount();
this.e = null;
};
v.reload = function(d, a) {
let k = this.l;
this.nocount();
k && !a && (this.disable(), k = null);
this.val(d || "");
a && !k && this.enable();
return this;
};
v.val = function(d) {
const a = this.e;
if (null == d) return a.value;
const k = this.l, f = this.p;
f && f.val(d);
k && k.val(d);
k || a.value === d || (a.value = d, A(a).triggerHandler("input"));
return this;
};
v.fire = function() {
this.l && this.l.fire();
return this;
};
v.ping = function() {
this.l && this.l.ping();
return this;
};
v.focus = function() {
const d = this.p;
d ? d.focus() : A(this.e).focus();
};
v.focused = function() {
return u && u === this.el;
};
v.parent = function() {
return this.e.parentNode;
};
v.attr = function(d, a) {
const k = this.e;
if (1 === arguments.length) return k.getAttribute(d);
null == a ? k.removeAttribute(d) : k.setAttribute(d, a);
return this;
};
v.editable = function() {
return !!this.l;
};
v.enable = function() {
const d = this.p;
this.e.removeAttribute("readonly");
this.listen();
d && d.enable && d.enable(this.l);
return this;
};
v.disable = function() {
const d = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
d && d.disable && d.disable();
return this;
};
v.listen = function() {
const d = this.l;
d && d.kill();
this.l = y(this.e);
return this;
};
v.unlisten = function() {
const d = this.l;
d && (d.kill(), this.l = null);
return this;
};
v.setInvs = function(d, a) {
const k = this.i || !1;
if (a || k !== d) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(d) : d && (this._i = B.require("$52", "mirror.js").init(this.e)), 
this.i = d;
return this;
};
v.getInvs = function() {
return this.i || !1;
};
v.setMode = function(d) {
let a = this.p, k = this.i || !1;
d !== (this.m || "") && (this.m = d, a && a.kill(), this.p = a = "code" === d ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === d ? B.require("$53", "mce.js").init(this.e, this.l) : null, 
this.setInvs(k, !0), u && this.focus());
return this;
};
v.setStrf = function(d) {
this["%"] = d;
"code" === this.m && this.p.strf(d);
return this;
};
v.name = function(d) {
this.e.setAttribute("name", d);
return this;
};
v.placeholder = function(d) {
this.e.setAttribute("placeholder", d);
return this;
};
v.redraw = function() {
const d = this.p;
d && d.resize && d.resize();
};
v.counter = function(d) {
let a = this.c;
a ? a.ping(d) : this.c = B.require("$54", "counter.js").init(this, d);
d = String(d || "0");
"0" === d ? this.e.removeAttribute("maxlength") : d !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", d);
return this;
};
v.nocount = function() {
const d = this.c;
d && (d.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return w;
}({}, J, L));
B.register("$50", function(w, v, C) {
function y(b) {
const e = v.console;
e && e.error && e.error(b);
}
function p(b) {
const e = C.createElement("div");
b && e.setAttribute("class", b);
return e;
}
function u(b) {
return function() {
b.resize();
return this;
};
}
function d(b) {
return function(e) {
let m = e.target, g = m.$index;
for (;null == g && "DIV" !== m.nodeName && (m = m.parentElement); ) g = m.$index;
null != g && (e.stopImmediatePropagation(), b.select(g));
return !0;
};
}
function a(b) {
return function() {
b.redrawDirty() && b.redraw();
return !0;
};
}
function k(b) {
return function(e) {
var m = e.keyCode;
if (40 === m) m = 1; else if (38 === m) m = -1; else return !0;
if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return !0;
b.selectNext(m);
e.stopPropagation();
e.preventDefault();
return !1;
};
}
function f(b, e, m) {
function g(l) {
y("row[" + l + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(l) {
const r = e || 0, z = m ? -1 : 1, x = b.rows || [];
l.sort(function(D, E) {
return z * (x[D] || g(D)).cellVal(r).localeCompare((x[E] || g(E)).cellVal(r));
});
};
}
function h(b) {
this.w = b;
}
function n(b) {
this.t = b;
this.length = 0;
}
function q(b, e, m) {
let g = C.createElement("div");
g.className = m || "";
this._ = g;
this.d = e || [];
this.i = b || 0;
this.length = e.length;
}
function t(b) {
this.live = b;
this.rows = [];
}
w.create = function(b) {
return new h(b);
};
var c = h.prototype;
c.init = function(b) {
let e = this.w, m = e.id;
var g = e.splity(m + "-thead", m + "-tbody"), l = g[0];
g = g[1];
let r = [], z = [], x = [], D = [];
if (b) this.ds = b, this.idxs = z, this._idxs = null; else if (!(b = this.ds)) throw Error("No datasource");
l.css.push("wg-thead");
g.css.push("wg-tbody");
b.eachCol(function(O, R, I) {
x[O] = m + "-col-" + R;
D[O] = I || R;
});
var E = p();
let G = -1, F = x.length, H = p("wg-cols"), M = l.splitx.apply(l, x);
for (;++G < F; ) M[G].header(D[G]), H.appendChild(E.cloneNode(!1)).setAttribute("for", x[G]);
b.eachRow(function(O, R, I) {
r[O] = new q(O, R, I);
z[O] = O;
});
this.rows = r;
this.cols = H;
this.ww = null;
this.root = E = g.body;
this.head = l;
l.redraw = u(this);
l = g.fixed = M[0].bodyY() || 20;
e.lock().resize(l, g);
e.css.push("is-table");
e.restyle();
this.sc ? this._re_sort(F) : b.sort && b.sort(z);
this.redrawDirty();
this.render();
A(E).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", d(this)).on("scroll", a(this));
return this;
};
c.clear = function() {
const b = this.pages || [];
let e = b.length;
for (;0 !== e--; ) b[e].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
c.render = function() {
let b, e = [], m = this.rows || [], g = -1, l, r = this.idxs, z = r.length, x = this.idxr = {}, D = this.r, E = this._r, G = this.root, F = this.cols;
for (;++g < z; ) {
if (0 === g % 100) {
var H = F.cloneNode(!0);
b = new t(H);
b.i = e.length;
b.h = 2200;
b.insert(G);
e.push(b);
}
l = r[g];
x[l] = g;
H = m[l];
if (null == H) throw Error("Render error, no data at [" + l + "]");
H.page = b;
b.rows.push(H);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = e;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == D ? null != E && (H = m[E]) && H.page && (delete this._r, this.select(E, !0)) : (H = m[D]) && H.page ? this.select(D, !0) : (this.deselect(!1), 
this._r = D);
return this;
};
c.resize = function() {
let b = -1, e = this.ww || (this.ww = []);
var m = this.w;
let g = m.cells[0], l = g.body.childNodes, r = l.length, z = this.pages || [], x = z.length;
for (m.redraw.call(g); ++b < r; ) e[b] = l[b].style.width;
if (x) {
m = this.mx;
for (b = this.mn; b <= m; b++) z[b].widths(e);
this.redrawDirty() && this.redraw();
}
};
c.redrawDirty = function() {
let b = !1;
var e = this.root;
const m = e.scrollTop;
e = e.clientHeight;
this.sy !== m && (b = !0, this.sy = m);
this.vh !== e && (b = !0, this.vh = e);
return b;
};
c.redraw = function() {
let b = 0, e = -1, m = null, g = null, l = this.ww;
var r = this.sy;
let z = this.mn, x = this.mx, D = Math.max(0, r - 100);
r = this.vh + r + 100;
let E, G = this.pages || [], F = G.length;
for (;++e < F && !(b > r); ) E = G[e], b += E.height(), b < D || (null === m && (m = e), 
g = e, E.rendered || E.render(l));
if (z !== m) {
if (null !== z && m > z) for (e = z; e < m; e++) {
E = G[e];
if (!E) throw Error("Shit!");
E.rendered && E.sleep();
}
this.mn = m;
}
if (x !== g) {
if (null !== x && g < x) for (e = x; e > g; e--) E = G[e], E.rendered && E.sleep();
this.mx = g;
}
};
c.selected = function() {
return this.r;
};
c.thead = function() {
return this.w.cells[0];
};
c.tbody = function() {
return this.w.cells[1];
};
c.tr = function(b) {
return (b = this.row(b)) ? b.cells() : [];
};
c.row = function(b) {
return this.rows[b];
};
c.td = function(b, e) {
return this.tr(b)[e];
};
c.next = function(b, e, m) {
null == m && (m = this.r || 0);
const g = this.idxs, l = g.length;
let r = m = (this.idxr || {})[m];
for (;m !== (r += b) && !(0 <= r && l > r); ) if (e && l) r = 1 === b ? -1 : l, 
e = !1; else return null;
m = g[r];
return null == m || null == this.rows[m] ? (y("Bad next: [" + r + "] does not map to data row"), 
null) : m;
};
c.selectNext = function(b, e, m) {
b = this.next(b, e, null);
null != b && this.r !== b && this.select(b, m);
return this;
};
c.deselect = function(b) {
const e = this.r;
null != e && (this.r = null, A(this.tr(e)).removeClass("selected"), this.w.fire("wgRowDeselect", [ e, b ]));
return this;
};
c.selectRow = function(b, e) {
return this.select(this.idxs[b], e);
};
c.select = function(b, e) {
const m = this.rows[b];
var g = m && m.page;
if (!g) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let l, r = this.w.cells[1];
g.rendered || (l = g.top(), r.scrollY(l), this.redrawDirty() && this.redraw());
if (!m.rendered) return g.rendered || y("Failed to render page"), y("Row [" + m.i + "] not rendered"), 
this;
g = m.cells();
A(g).addClass("selected");
this.r = b;
e || (l = r.scrollY(), A(this.root).focus(), l !== r.scrollY() && r.scrollY(l));
r.scrollTo(g[0], !0);
this.w.fire("wgRowSelect", [ b, m.data() ]);
return this;
};
c.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
c.filter = function(b) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(b);
return this.clear().render();
};
c.each = function(b) {
let e, m = -1;
const g = this.rows || [], l = this.idxs || [], r = l.length;
for (;++m < r; ) e = l[m], b(g[e], m, e);
return this;
};
c.sortable = function(b) {
const e = this.sc || (this.sc = new n(this));
e.has(b) || e.add(b);
return this;
};
c._re_sort = function(b) {
let e = -1, m = this.sc, g = m.active;
for (this.sc = m = new n(this); ++e < b; ) m.add(e);
g && (e = this.head.indexOf(g.id), -1 === e && (e = Math.min(g.idx, b - 1)), this.sort(e, g.desc));
return this;
};
c._sort = function(b, e) {
e ? (this.s = e, e(b)) : (e = this.s) && e(b);
return b;
};
c.sort = function(b, e) {
this._sort(this.idxs, f(this, b, e));
this.sc.activate(b, e);
return this;
};
c = null;
c = n.prototype;
c.has = function(b) {
return null != this[b];
};
c.add = function(b) {
const e = this, m = e.t.head.cells[b];
e[b] = {
desc: null,
idx: b,
id: m.id
};
e.length++;
m.addClass("wg-sortable").on("click", function(g) {
if ("header" === g.target.nodeName.toLowerCase()) return g.stopImmediatePropagation(), 
e.toggle(b), !1;
});
return e;
};
c.toggle = function(b) {
this.t.sort(b, !this[b].desc).clear().render();
return this;
};
c.activate = function(b, e) {
let m, g = this.active, l = this[b], r = this.t.head.cells;
g && (m = r[g.idx]) && (m.removeClass(g.css), g !== l && m.restyle());
(m = r[b]) ? (l.desc = e, this.active = l, b = "wg-" + (e ? "desc" : "asc"), m.addClass(b).restyle(), 
l.css = b) : this.active = null;
return this;
};
c = null;
c = q.prototype;
c.render = function(b) {
let e, m = [], g = this._, l = this.length;
if (g) {
for (this.c = m; 0 !== l--; ) e = g.cloneNode(!1), m[l] = this.update(l, e), e.$index = this.i, 
b[l].appendChild(e);
this._ = null;
} else for (m = this.c; 0 !== l--; ) b[l].appendChild(m[l]);
this.rendered = !0;
return this;
};
c.update = function(b, e) {
e = e || this.c[b] || {};
b = (this.d[b] || function() {})() || " ";
null == b.innerHTML ? e.textContent = b : e.innerHTML = b.innerHTML;
return e;
};
c.cells = function() {
return this.c || [ this._ ];
};
c.data = function() {
const b = [], e = this.length;
let m = -1;
for (;++m < e; ) b[m] = this.cellVal(m);
return b;
};
c.destroy = function() {
this.page = null;
this.rendered = !1;
};
c.cellVal = function(b) {
b = this.d[b]() || "";
return String(b.textContent || b);
};
c = null;
c = t.prototype;
c.size = function() {
return this.rows.length;
};
c.insert = function(b) {
const e = this.h, m = p("wg-dead");
m.style.height = String(e) + "px";
b.appendChild(m);
return this.dead = m;
};
c.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
c.height = function() {
let b = this.h;
null == b && (this.h = b = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
b || y("row has zero height");
return b;
};
c.render = function(b) {
let e, m = -1, g = this.rows, l = g.length;
const r = this.dead, z = this.live, x = z.childNodes;
for (;++m < l; ) e = g[m], e.rendered || e.render(x);
l = b.length;
for (m = 0; m < l; m++) x[m].style.width = b[m];
r.parentNode.replaceChild(z, r);
this.rendered = !0;
this.h = null;
return this;
};
c.sleep = function() {
const b = this.height(), e = this.live, m = this.dead;
m.style.height = String(b) + "px";
e.parentNode.replaceChild(m, e);
this.rendered = !1;
this.h = b;
return this;
};
c.sleepH = function(b) {
b *= this.rows.length;
const e = this.dead;
e && (e.style.height = String(b) + "px");
this.rendered || (this.h = b);
return this;
};
c.widths = function(b) {
const e = this.live.childNodes;
let m = b.length;
for (;0 !== m--; ) e[m].style.width = b[m];
return this;
};
c.destroy = function() {
var b = this.rendered ? this.live : this.dead;
const e = this.rows;
b.parentNode.removeChild(b);
for (b = e.length; 0 !== b--; ) e[b].destroy();
};
return w;
}({}, J, L));
B.register("$45", function(w, v, C) {
function y(g, l) {
var r = g.id;
let z = r && c[r], x = z && z.parent();
if (!z || !x) return null;
var D = 1 === x.dir;
r = D ? "X" : "Y";
let E = "page" + r;
D = D ? t : q;
let G = D(x.el);
r = l["offset" + r];
let F = x.el, H = F.className;
null == r && (r = l[E] - D(g));
r && (G += r);
F.className = H + " is-resizing";
return {
done: function() {
F.className = H;
},
move: function(M) {
x.resize(M[E] - G, z);
return !0;
}
};
}
function p(g) {
function l() {
A(C).off("mousemove", r);
m && (m.done(), m = null);
return !0;
}
function r(z) {
m ? m.move(z) : l();
return !0;
}
if (m) return !0;
m = y(g.target, g);
if (!m) return !0;
A(C).one("mouseup", l).on("mousemove", r);
return d(g);
}
function u(g, l) {
const r = l.type;
"touchmove" === r ? m && m.move(l) : "touchstart" === r ? m = y(g.target, l) : "touchend" === r && m && (m.done(), 
m = null);
}
function d(g) {
g.stopPropagation();
g.preventDefault();
return !1;
}
function a(g) {
b && b.redraw();
g && g.redraw();
return b = g;
}
function k(g, l) {
const r = A(l);
r.on("editFocus", function(z) {
z.stopPropagation();
r.trigger("wgFocus", [ a(g) ]);
}).on("editBlur", function(z) {
z.stopPropagation();
r.trigger("wgBlur", [ a(null) ]);
});
}
function f(g) {
const l = g.id, r = g.className, z = r ? [ r ] : [];
this.id = l;
this.el = g;
this.pos = this.index = 0;
this._cn = r;
this.css = z.concat("wg-cell");
c[l] = this;
this.clear();
}
const h = B.include("$47", "html.js") || B.include("$2", "html.js", !0), n = B.require("$27", "dom.js"), q = n.top, t = n.left, c = {};
let b, e = 0, m = !1;
w.init = function(g) {
const l = new f(g);
l.redraw();
B.require("$48", "touch.js").ok(function(r) {
r.dragger(g, u);
});
A(g).on("mousedown", p);
return l;
};
v = f.prototype;
v.fire = function(g, l) {
g = A.Event(g);
g.cell = this;
A(this.el).trigger(g, l);
return this;
};
v.each = function(g) {
let l = -1;
const r = this.cells, z = r.length;
for (;++l < z; ) g(r[l], l);
return this;
};
v.indexOf = function(g) {
return (g = c[g.id || String(g)]) && g.pid === this.id ? g.index : -1;
};
v.on = function() {
return this.$("on", arguments);
};
v.off = function() {
return this.$("off", arguments);
};
v.find = function(g) {
return A(this.el).find(g);
};
v.$ = function(g, l) {
A.fn[g].apply(A(this.el), l);
return this;
};
v.addClass = function(g) {
this.css.push(g);
return this;
};
v.removeClass = function(g) {
g = this.css.indexOf(g);
-1 !== g && this.css.splice(g, 1);
return this;
};
v.parent = function() {
return this.pid && c[this.pid];
};
v.splitx = function() {
return this._split(1, arguments);
};
v.splity = function() {
return this._split(2, arguments);
};
v._split = function(g, l) {
(this.length || this.field) && this.clear();
let r = -1;
let z = l.length, x = 1 / z, D = 0;
for (;++r < z; ) {
var E = n.el();
this.body.appendChild(E);
var G = E;
{
var F = l[r];
let H = 1, M = F;
for (;c[F]; ) F = M + "-" + ++H;
}
G.id = F;
E = new f(E);
E.index = r;
E.pid = this.id;
E._locale(this.lang, this.rtl);
E.pos = D;
D += x;
this.cells.push(E);
this.length++;
}
this.dir = g;
this.redraw();
return this.cells;
};
v.destroy = function() {
this.clear();
delete c[this.id];
const g = this.el;
g.innerHTML = "";
this.body = null;
g.className = this._cn || "";
A(g).off();
return this;
};
v.exists = function() {
return this === c[this.id];
};
v.clear = function() {
const g = this.el, l = this.cells, r = this.field, z = this.body, x = this.nav;
let D = this.length || 0;
for (;0 !== D--; ) delete c[l[D].destroy().id];
this.cells = [];
this.length = 0;
x && (g.removeChild(x), this.nav = null);
z && (r && (r.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
g === z.parentNode && g.removeChild(z));
this.body = g.appendChild(n.el("", "wg-body"));
this._h = null;
return this;
};
v.resize = function(g, l) {
if (!l && (l = this.cells[1], !l)) return;
var r = l.index;
let z = this.cells, x = A(this.el)[1 === this.dir ? "width" : "height"](), D = z[r + 1];
r = z[r - 1];
l.pos = Math.min((D ? D.pos * x : x) - ((l.body || l.el.firstChild).offsetTop || 0), Math.max(r ? r.pos * x : 0, g)) / x;
this.redraw();
this.fire("wgResize");
return this;
};
v.distribute = function(g) {
let l = -1, r = 0, z;
const x = this.cells, D = g.length;
for (;++l < D && (z = x[++r]); ) z.pos = Math.max(0, Math.min(1, g[l]));
this.redraw();
return this;
};
v.distribution = function() {
let g = [], l = 0;
const r = this.cells, z = r.length - 1;
for (;l < z; ) g[l] = r[++l].pos;
return g;
};
v.restyle = function() {
var g = this.css.concat();
0 === this.index ? g.push("first") : g.push("not-first");
this.dir && (g.push("wg-split"), 2 === this.dir ? g.push("wg-split-y") : g.push("wg-split-x"));
this.t && g.push("has-title");
this.nav && g.push("has-nav");
this.field && (g.push("is-field"), this.field.editable() ? g.push("is-editable") : g.push("is-readonly"));
g = g.join(" ");
g !== this._css && (this._css = g, this.el.className = g);
return this;
};
v.redraw = function(g) {
this.restyle();
const l = this.el;
var r = this.body, z = this.field;
if (r) {
var x = l.clientWidth || 0, D = l.clientHeight || 0, E = r.offsetTop || 0;
D = E > D ? 0 : D - E;
if (this._h !== D) {
this._h = D;
r.style.height = String(D) + "px";
var G = z;
}
this._w !== x && (this._w = x, G = z);
G && G.redraw();
}
r = this.length;
x = 1;
D = this.nav;
for (E = 2 === this.dir ? "height" : "width"; 0 !== r--; ) z = this.cells[r], D ? G = 1 : (z.fixed && (z.pos = z.fixed / A(l)[E]()), 
G = x - z.pos, x = z.pos), z.el.style[E] = String(100 * G) + "%", z.redraw(g);
return this;
};
v.contents = function(g, l) {
const r = this.el;
let z = this.body;
if (null == g) return z.innerHTML;
this.length ? this.clear() : z && (r.removeChild(z), z = null);
z || (this.body = z = r.appendChild(n.el("", l || "wg-content")), this._h = null, 
(l = this.lang) && this._locale(l, this.rtl, !0));
"string" === typeof g ? A(z)._html(g) : g && this.append(g);
this.redraw();
return this;
};
v.textarea = function(g, l) {
let r = this.field;
if (r) {
var z = r.editable();
r.reload(g, l);
z !== l && this.restyle();
} else this.length && this.clear(), z = n.el("textarea"), z.setAttribute("wrap", "virtual"), 
z.setAttribute("autocomplete", "off"), z.setAttribute("id", "wg" + String(++e)), 
z.value = g, this.contents(z), r = B.require("$49", "field.js")._new(z)[l ? "enable" : "disable"](), 
k(this, z), this.field = r, this.restyle();
this.lang || this.locale("en");
return r;
};
v.locale = function(g) {
g = B.require("$43", "locale.js").cast(g);
return this._locale(String(g), g.isRTL());
};
v._locale = function(g, l, r) {
const z = this.body;
if (r || g !== this.lang) this.lang = g, z && z.setAttribute("lang", g);
if (r || l !== this.rtl) this.rtl = l, z && z.setAttribute("dir", l ? "RTL" : "LTR");
return this;
};
v.editable = function() {
let g = this.field;
if (g) return g.editable() ? g : null;
const l = this.cells;
let r = this.navigated();
if (null != r) return l[r].editable();
r = -1;
const z = l.length;
for (;++r < z && (g = l[r].editable(), null == g); );
return g;
};
v.eachTextarea = function(g) {
const l = this.field;
l ? g(l) : this.each(function(r) {
r.eachTextarea(g);
});
return this;
};
v.append = function(g) {
g && (g.nodeType ? h.init(this.body.appendChild(g)) : h.init(A(g).appendTo(this.body)));
return this;
};
v.prepend = function(g) {
const l = this.body;
if (g.nodeType) {
const r = l.firstChild;
h.init(r ? l.insertBefore(g, r) : l.appendChild(g));
} else h.init(A(g).prependTo(l));
return this;
};
v.before = function(g) {
const l = this.body;
g.nodeType ? h.init(this.el.insertBefore(g, l)) : h.init(A(g).insertBefore(l));
return this;
};
v.header = function(g, l) {
if (null == g && null == l) return this.el.getElementsByTagName("header")[0];
this.t = n.txt(g || "");
this.el.insertBefore(n.el("header", l), this.body).appendChild(this.t);
this.redraw();
return this;
};
v.toolbar = function() {
const g = this.header(), l = g.getElementsByTagName("nav");
return 0 === l.length ? g.appendChild(n.el("nav")) : l[0];
};
v.title = function(g) {
const l = this.t;
if (l) return l.nodeValue = g || "", l;
this.header(g);
return this.t;
};
v.titled = function() {
return this.t && this.t.nodeValue;
};
v.bodyY = function() {
return q(this.body, this.el);
};
v.scrollY = function(g) {
if (ka === g) return this.body.scrollTop;
this.body.scrollTop = g;
};
v.tabulate = function(g) {
let l = this.table;
l ? l.clear() : l = B.require("$50", "wgtable.js").create(this);
l.init(g);
return this.table = l;
};
v.lock = function() {
this.body.className += " locked";
return this;
};
v.scrollTo = function(g, l) {
let r = this.body;
var z = r.scrollTop;
let x = q(g, r);
if (z > x) z = x; else {
const D = r.clientHeight;
g = x + A(g).outerHeight();
if (D + z < g) z = g - D; else return;
}
l ? r.scrollTop = z : A(r).stop(!0).animate({
scrollTop: z
}, 250);
};
v.navigize = function(g, l) {
function r(H) {
const M = D[H], O = x[H], R = A(M.el).show();
O.addClass("active");
G = H;
F.data("idx", H);
M.fire("wgTabSelect", [ H ]);
return R;
}
const z = this, x = [], D = z.cells;
let E = z.nav, G;
E && z.el.removeChild(E);
E = z.nav = z.el.insertBefore(n.el("nav", "wg-tabs"), z.body);
const F = A(E).on("click", function(H) {
const M = A(H.target).data("idx");
if (null == M) return !0;
if (null != G) {
{
const O = x[G];
A(D[G].el).hide();
O.removeClass("active");
}
}
r(M);
z.redraw();
return d(H);
});
null == l && (l = F.data("idx") || 0);
z.each(function(H, M) {
x[M] = A('<a href="#' + H.id + '"></a>').data("idx", M).text(g[M]).appendTo(F);
H.pos = 0;
A(H.el).hide();
});
r(D[l] ? l : 0);
z.lock();
z.redraw();
return z;
};
v.navigated = function() {
const g = this.nav;
if (g) return A(g).data("idx");
};
v = null;
return w;
}({}, J, L));
B.register("$30", function(w, v, C) {
function y(c, b) {
c.stopPropagation();
h = b;
return !0;
}
function p(c) {
const b = [];
c && (c.saved() || b.push("po-unsaved"), c.fuzzy() ? b.push("po-fuzzy") : c.hasFlag() && b.push("po-flagged"), 
c.valid() || b.push("po-error"), c.translation() || b.push("po-empty"), c.comment() && b.push("po-comment"));
return b.join(" ");
}
function u(c, b, e) {
b = A(c.title(b).parentNode);
let m = b.find("span.lang");
e ? (e = B.require("$43", "locale.js").cast(e), m.length || (m = A("<span></span>").prependTo(b)), 
m.attr("lang", e.lang).attr("class", e.getIcon() || "lang region region-" + (e.region || "zz").toLowerCase())) : (m.remove(), 
e = "en");
c.locale(e);
return b;
}
function d(c, b, e) {
b.on("click", function(m) {
const g = c.fire(e, [ m.target ]);
g || m.preventDefault();
return g;
});
}
function a() {
this.dirty = 0;
}
B.require("$3", "number.js");
const k = B.require("$42", "string.js").html, f = B.require("$6", "string.js").sprintf;
let h, n;
w.extend = function(c) {
return c.prototype = new a();
};
w.localise = function(c) {
n = c;
return w;
};
const q = function() {
const c = C.createElement("p"), b = /(src|href|on[a-z]+)\s*=/gi;
return function(e) {
c.innerHTML = e.replace(b, "data-x-loco-$1=");
const m = c.textContent.trim();
return m ? m.replace("data-x-loco-", "") : e.trim();
};
}(), t = a.prototype = B.require("$44", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
t.init = function() {
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
t.t = function() {
return this.$t || n || B.require("$1", "t.js").init();
};
t.localise = function(c) {
c || (c = this.t());
const b = [];
b[0] = c._x("Source text", "Editor") + ":";
b[3] = c._x("%s translation", "Editor") + ":";
b[4] = c._x("Context", "Editor") + ":";
b[5] = c._x("Comments", "Editor") + ":";
b[1] = c._x("Single", "Editor") + ":";
b[2] = c._x("Plural", "Editor") + ":";
b[6] = c._x("Untranslated", "Editor");
b[7] = c._x("Translated", "Editor");
b[8] = c._x("Toggle Fuzzy", "Editor");
b[9] = c._x("Suggest translation", "Editor");
this.labels = b;
this.$t = c;
return this;
};
t.setRootCell = function(c) {
function b(m) {
e.redraw(!0, m);
return !0;
}
const e = B.require("$45", "wingrid.js").init(c);
A(v).on("resize", b);
this.redraw = b;
A(c).on("wgFocus wgBlur", y);
this.destroy = function() {
e.destroy();
A(v).off("resize", b);
};
this.rootDiv = c;
return e;
};
t.$ = function() {
return A(this.rootDiv);
};
t.setListCell = function(c) {
const b = this;
b.listCell = c;
c.on("wgRowSelect", function(e, m) {
b.loadMessage(b.po.row(m));
return !0;
}).on("wgRowDeselect", function(e, m, g) {
g || b.loadNothing();
return !0;
});
};
t.setSourceCell = function(c) {
this.sourceCell = c;
};
t.setTargetCell = function(c) {
this.targetCell = c;
};
t.next = function(c, b, e) {
const m = this.listTable, g = this.po;
let l = m.selected(), r = l, z;
for (;null != (l = m.next(c, e, l)); ) {
if (r === l) {
l = null;
break;
}
if (b && (z = g.row(l), z.translated(0))) continue;
break;
}
null != l && m.select(l, !0);
return l;
};
t.select = function(c) {
this.listTable.select(c);
this.focus();
};
t.current = function(c) {
const b = this.active;
if (null == c) return b;
c ? c.is(b) ? (this.reloadMessage(c), this.focus()) : (this.loadMessage(c), c = this.po.indexOf(c), 
-1 !== c && this.select(c)) : this.unloadActive();
return this;
};
t.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
t.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
t.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
t.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
t.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
t.searchable = function(c) {
c && (this.dict = c, this.po && this.rebuildSearch());
return this.dict && !0;
};
t.rebuildSearch = function() {
const c = this.po.rows, b = c.length, e = this.dict;
e.clear();
let m = -1;
for (;++m < b; ) e.add(m, c[m].toText());
};
t.filtered = function() {
return this.lastSearch || "";
};
t.filter = function(c, b) {
const e = this.listTable, m = this.lastFound, g = this.lastSearch || "";
let l, r;
c ? (r = this.dict.find(c), l = r.length, l === m && 0 === c.indexOf(g) ? b = !0 : e.filter(r)) : (l = this.po.length, 
e.unfilter());
this.lastFound = l;
this.lastSearch = c;
b || this.fire("poFilter", [ c, l ]);
return l;
};
t.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
t.unsave = function(c, b) {
let e = !1;
if (c) {
if (e = c.saved(b)) this.dirty++, c.unsave(b), this.fire("poUnsaved", [ c, b ]);
this.reCssRow(c);
}
return e;
};
t.reCssRow = function(c) {
var b = this.po.indexOf(c);
if ((b = this.listTable.tr(b)) && b.length) {
var e = p(c);
c = b[0].className;
e = c.replace(/(?:^| +)po-[a-z]+/g, "") + " " + e;
e !== c && A(b).attr("class", e);
}
};
t.save = function(c) {
const b = this.po;
if (this.dirty || c) {
const e = [], m = [], g = this.listTable;
b.each(function(l, r, z) {
r.err && e.push(r);
r.saved() || (r.save(), (r = (l = g.row(z)) && l.page) && r.live ? m[r.i] = r.live : l && A(l.cells()).removeClass("po-unsaved"));
});
m.length && A(m).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = e.length ? e : null;
this.fire("poSave", []);
}
return b;
};
t.fire = function(c, b) {
const e = this.handle;
if (e && e[c] && !1 === e[c].apply(this, b || [])) return !1;
c = A.Event(c);
this.$().trigger(c, b);
return !c.isDefaultPrevented();
};
t.on = function(c, b) {
this.$().on(c, b);
return this;
};
t.getSorter = function() {
return null;
};
t.reload = function() {
const c = this;
var b = c.listCell;
const e = c.po;
var m = e && e.locale();
const g = m && m.isRTL(), l = e && e.length || 0;
if (!e || !e.row) return b && b.clear().header("Error").contents("Invalid messages list"), 
!1;
c.targetLocale = m;
c.lastSearch && (c.lastSearch = "", c.lastFound = l, c.fire("poFilter", [ "", l ]));
let r = (m = c.listTable) && m.thead().distribution(), z = [];
c.listTable = m = b.tabulate({
eachCol: function(x) {
const D = c.getListColumns(), E = c.getListHeadings();
for (const G in D) {
const F = D[G];
x(F, G, E[F]);
}
},
eachRow: function(x) {
e.each(function(D, E) {
c.validate(E) && z.push(E);
x(E.idx, c.getListEntry(E), p(E));
});
},
sort: c.getSorter()
});
b = c.getListColumns();
for (const x in b) m.sortable(b[x]);
r && m.thead().distribute(r);
m.tbody().$(g ? "addClass" : "removeClass", [ "is-rtl" ]);
c.invalid = z.length ? z : null;
return !!l;
};
t.load = function(c, b) {
this.po = c;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== b ? this.listTable.selectRow(b || 0) : this.active && this.unloadActive());
};
t.pasteMessage = function(c) {
this.validate(c);
if (this.active === c) {
let b = this.sourceCell, e = 0;
b && b.eachTextarea(function(m) {
m.val(c.source(null, e++));
});
(b = this.contextCell) && b.eachTextarea(function(m) {
m.val(c.context());
});
if (b = this.targetCell) e = 0, b.eachTextarea(function(m) {
m.val(c.translation(e++));
});
}
this.updateListCell(c, "source");
this.updateListCell(c, "target");
return this;
};
t.reloadMessage = function(c) {
const b = this.sourceCell, e = this.targetCell;
this.pasteMessage(c);
b && this.setSrcMeta(c, b) && b.redraw();
if (e) {
var m = e.navigated() || 0;
m = this.setTrgMeta(c, m, e);
!b && this.setSrcMeta(c, e) && (m = !0);
m && (e.redraw(), this.reCssRow(c));
}
return this;
};
t.setStatus = function() {
return null;
};
t.setSrcMeta = function(c, b) {
const e = [];
var m = this.labels;
let g = !1, l = this.$smeta;
var r = c.context();
let z = [], x = c.tags(), D = x && x.length;
r && (z.push("<span>" + k(m[4]) + "</span>"), z.push('<mark class="ctxt">' + k(r) + "</mark>"));
if (D && this.getTag) for (z.push("<span>Tagged:</span>"), m = -1; ++m < D; ) (r = this.getTag(x[m])) && z.push("<mark>" + k(r.mod_name) + "</mark>");
z.length && e.push('<p class="tags">' + z.join(" ") + "</p>");
if (this.getMono() && (r = c.refs()) && (x = r.split(/\s/), D = x.length)) {
for (z = []; 0 <= --D; ) r = x[D], z.push("<code>" + k(r) + "</code>");
e.push('<p class="has-icon icon-file">' + z.join(" ") + "</p>");
}
(r = c.notes()) && e.push('<p class="has-icon icon-info">' + k(r, !0) + "</p>");
e.length ? (l || (l = b.find("div.meta"), l.length || (l = A('<div class="meta"></div>').insertAfter(b.header())), 
d(this, l, "poMeta"), this.$smeta = l), l.html(e.join("\n")).show(), g = !0) : l && l.text() && (l.text("").hide(), 
g = !0);
return g;
};
t.setTrgMeta = function(c, b, e) {
const m = [];
b = (c = c.errors(b)) && c.length;
var g = !1;
let l = this.$tmeta;
if (b) {
for (g = 0; g < b; g++) m.push('<p class="has-icon icon-warn">' + k(c[g], !0) + ".</p>");
l || (l = e.find("div.meta"), l.length || (l = A('<div class="meta"></div>').insertAfter(e.header())), 
this.$tmeta = l);
l.html(m.join("\n")).show();
g = !0;
} else l && l.text() && (l.text("").hide(), g = !0);
return g;
};
t.loadMessage = function(c) {
function b(N) {
if ("=" === N.charAt(0)) {
const K = N.split(" ");
N = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = K.join(" ");
}
return N;
}
function e(N, K) {
const T = X;
var Q = ba[0];
N.off();
N.titled() !== Q && u(N, Q, K || "en");
Q = !1;
x.setSrcMeta(c, N) && (Q = !0);
if (c.plural()) {
Q = -1;
let S = [], W = [];
const Y = N.id + "-";
K = c.sourceForms() || K && K.plurals || [ "One", "Other" ];
const ca = K.length;
if (2 !== ca || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++Q < ca; ) S[Q] = Y + String(Q), 
W[Q] = b(K[Q].split(" ", 1)[0]) + ":"; else S = [ Y + "-0", Y + "-1" ], W = [ ba[1], ba[2] ];
N.splity.apply(N, S);
N.each(function(da, V) {
da.header(W[V]).textarea(c.source(null, V), T).setStrf(F).setMode(Z).setInvs(E);
});
N.lock();
T && N.each(function(da, V) {
m(da, V);
});
} else Q && N.redraw(), N.textarea(c.source(), T).setStrf(F).setMode(Z).setInvs(E), 
T && m(N, 0);
}
function m(N, K) {
N.on("changing", function(T, Q) {
c.source(Q, K);
0 === K && x.updateListCell(c, "source");
x.unsave(c, K);
}).on("changed", function() {
0 === K && x.po.reIndex(c);
x.dict && x.rebuildSearch();
x.fire("poUpdate", [ c ]);
});
}
function g(N, K, T, Q) {
P && K.eachTextarea(function(W) {
W.ping();
});
K.off("changing").off("changed");
var S = T.isKnown() && T.label || "Target";
S = f(ba[3], S);
K.titled() !== S && u(K, S, T);
S = !1;
!N && x.setSrcMeta(c, K) && (S = !0);
x.setTrgMeta(c, Q, K) && (S = !0);
x.setStatus(c, Q);
if (1 !== T.nplurals && c.pluralized()) {
N = function(V) {
Y.push(b(da[V] || "Form " + V));
W.push(ca + String(V));
};
let W = [], Y = [];
const ca = K.id + "-", da = c.targetForms() || T.plurals || [ "One", "Other" ];
S = da.length;
for (c.eachMsg(N); (T = W.length) < S; ) N(T);
K.splitx.apply(K, W);
K.each(function(V, aa) {
const la = P && !c.disabled(aa);
V.textarea(c.translation(aa), la).setStrf(F).setMode(Z).setInvs(E);
P && l(V, aa);
});
K.navigize(Y, Q || null).on("wgTabSelect", function(V, aa) {
(V = P && V.cell.editable()) && V.focus();
x.setTrgMeta(c, aa, K);
x.setStatus(c, aa);
x.fire("poTab", [ aa ]);
});
} else S && K.redraw(), K.textarea(c.translation(), P && !c.disabled(0)).setStrf(F).setMode(Z).setInvs(E), 
P && l(K, 0);
}
function l(N, K) {
function T() {
Q = null;
x.validate(c);
const W = c.errors(K).join(" ");
S !== W && (S = W, x.setTrgMeta(c, K, N) && N.redraw(), x.reCssRow(c));
}
let Q, S = c.errors(K).join(" ");
N.on("changing", function(W, Y, ca) {
Q && (clearTimeout(Q), Q = null);
c.translate(Y, K);
0 === K && x.updateListCell(c, "target");
c.fuzzy(K) && c.saved(K) ? x.fuzzy(!1, c, K) : x.unsave(c, K);
"" === Y ? (x.fire("poEmpty", [ !0, c, K ]), x.setStatus(c, K)) : "" === ca && (x.fire("poEmpty", [ !1, c, K ]), 
x.setStatus(c, K));
Q = setTimeout(T, S ? 300 : 1e3);
}).on("changed", function() {
x.dict && x.rebuildSearch();
x.fire("poUpdate", [ c ]);
});
}
function r(N) {
N.off();
const K = ba[4];
N.titled() !== K && (u(N, K), x.setStatus(null));
N.textarea(c.context(), !0).setMode(Z).setInvs(E);
ha && N.on("changing", function(T, Q) {
c.context(Q);
x.updateListCell(c, "source");
x.unsave(c, ea);
}).on("changed", function() {
x.po.reIndex(c);
x.dict && x.rebuildSearch();
x.fire("poUpdate", [ c ]);
});
}
function z(N) {
const K = ba[5];
N.titled() !== K && u(N, K);
N.off().on("changing", function(T, Q) {
c.comment(Q);
x.fire("poComment", [ c, Q ]);
x.unsave(c, ea);
}).textarea(c.comment(), !0);
}
const x = this;
var D = c.isHTML();
const E = x.inv || !1, G = this.fmt || null, F = c.format() || null, H = c.is(x.active), M = x.sourceCell, O = x.targetCell, R = x.contextCell, I = x.commentCell, P = x.editable.target, X = x.editable.source, ha = x.editable.context, ma = x.sourceLocale, ja = x.targetLocale, ba = x.labels;
let ea = 0, Z = x.mode, fa = h;
x.html !== D && (x.html = D, "code" !== x.mode && (Z = D ? "html" : "", x.setMode(Z)));
x.active = c;
M && e(M, ma);
R && r(R);
O && ja && (ea = O.navigated() || 0, g(M, O, ja, ea));
I && z(I);
fa && (fa.exists() || (fa = fa.parent()), (D = fa.editable()) && D.focus());
G !== F && (this.fmt = F);
H || x.fire("poSelected", [ c, ea ]);
};
t.unloadActive = function() {
function c(e) {
e && e.text("").hide();
}
function b(e) {
e && e.off().clear();
}
c(this.$smeta);
c(this.$tmeta);
b(this.sourceCell);
b(this.contextCell);
b(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
t.loadNothing = function() {
const c = this.t(), b = this.mode || "", e = this.inv || !1, m = this.fmt;
this.unloadActive();
this.setStatus(null);
let g = this.commentCell;
g && g.textarea("", !1);
if (g = this.sourceCell) g.textarea("", !1).setStrf(m).setMode(b).setInvs(e), g.title(c._x("Source text not loaded", "Editor") + ":");
if (g = this.contextCell) g.textarea("", !1).setMode(b).setInvs(e), g.title(c._x("Context not loaded", "Editor") + ":");
if (g = this.targetCell) g.textarea("", !1).setStrf(m).setMode(b).setInvs(e), g.title(c._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
t.updateListCell = function(c, b) {
b = this.getListColumns()[b];
c = this.po.indexOf(c);
(c = this.listTable.row(c)) && c.rendered && c.update(b);
};
t.cellText = function(c) {
return (c = -1 !== c.indexOf("<") || -1 !== c.indexOf("&") ? q(c) : c.trim()) || " ";
};
t.fuzzy = function(c, b, e) {
b = b || this.active;
const m = b.fuzzy(e);
!0 !== c || m ? !1 === c && m && this.flag(0, b, e) && this.fire("poFuzzy", [ b, !1, e ]) : this.flag(4, b, e) && this.fire("poFuzzy", [ b, !0, e ]);
return m;
};
t.flag = function(c, b, e) {
if (!b) {
b = this.active;
e = this.getTargetOffset();
if (null == e) return null;
e && b.targetForms() && (e = 0);
}
const m = b.flagged(e);
if (null == c) return m;
if (m === c || c && !b.translated(e) || !this.fire("poFlag", [ c, m, b, e ])) return !1;
b.flag(c, e);
this.fire("poUpdate", [ b ]) && this.unsave(b, e);
this.setStatus(b, e);
return !0;
};
t.add = function(c, b) {
let e, m = this.po.get(c, b);
m ? e = this.po.indexOf(m) : (e = this.po.length, m = this.po.add(c, b), this.load(this.po, -1), 
this.fire("poAdd", [ m ]), this.fire("poUpdate", [ m ]));
this.lastSearch && this.filter("");
this.listTable.select(e);
return m;
};
t.del = function(c) {
if (c = c || this.active) {
var b = this.lastSearch, e = this.po.del(c);
null != e && (this.unsave(c), this.fire("poDel", [ c ]), this.fire("poUpdate", [ c ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(c) && this.unloadActive(), 
this.po.length && (b && this.filter(b), this.active || (e = Math.min(e, this.po.length - 1), 
this.listTable.select(e))));
}
};
t.setMono = function(c) {
return this.setMode(c ? "code" : this.html ? "html" : "");
};
t.setMode = function(c) {
if (this.mode !== c) {
this.mode = c;
this.callTextareas(function(m) {
m.setMode(c);
});
const b = this.active, e = this.sourceCell;
b && b.refs() && e && this.setSrcMeta(b, e) && e.redraw();
}
return this;
};
t.getMono = function() {
return "code" === this.mode;
};
t.setInvs = function(c) {
(this.inv || !1) !== c && (this.inv = c, this.callTextareas(function(b) {
b.setInvs(c);
}), this.fire("poInvs", [ c ]));
return this;
};
t.getInvs = function() {
return this.inv || !1;
};
t.callTextareas = function(c) {
var b = this.targetCell;
b && b.eachTextarea(c);
(b = this.contextCell) && b.eachTextarea(c);
(b = this.sourceCell) && b.eachTextarea(c);
return this;
};
t.focus = function() {
const c = this.getTargetEditable();
c && c.focus();
return this;
};
t.validate = function(c) {
return 0;
};
return w;
}({}, J, L));
B.register("$31", function(w, v, C) {
w.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, p = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(u, d) {
const a = d && d.count || 0;
d = d && d.types || {};
let k = !0, f = 0, h = 0;
for (var n; null != (n = p.exec(u)); ) {
const q = n[2];
if ("%" !== q || "%%" !== n[0]) {
if ("" === q || -1 === "suxXbcdeEfFgGo".indexOf(q)) {
k = !1;
break;
}
null == n[1] ? n = ++h : (n = parseInt(n[1]), f = Math.max(f, n));
null == d[n] && (d[n] = {});
d[n][q] = !0;
}
}
if (k) return {
valid: !0,
count: Math.max(f, h, a),
types: d
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
}({}, J, L));
B.register("$13", function(w, v, C) {
function y() {
this.init();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function p(f) {
f = A('<button type="button" class="button button-small icon icon-' + f + ' hastip"></button>');
B.require("$12", "tooltip.js").init(f);
return f;
}
function u(f) {
return p("cloud").attr("title", f.labels[8] + " (Ctrl-U)").on("click", function(h) {
h.preventDefault();
f.focus().fuzzy(!f.fuzzy());
});
}
function d(f) {
return p("robot").attr("title", f.labels[9] + " (Ctrl-J)").on("click", function(h) {
h.preventDefault();
f.fire("poHint");
});
}
function a(f, h) {
return B.require("$6", "string.js").vsprintf(f, h);
}
w.init = function(f) {
const h = new y();
f = h.setRootCell(f);
var n = f.splity("po-list", "po-edit");
let q = n[0], t = n[1];
n = t.splitx("po-trans", "po-comment");
var c = n[0];
let b = n[1].header("Loading..");
n = c.splity("po-source", "po-target");
c = n[0].header("Loading..");
n = n[1].header("Loading..");
f.distribute([ .34 ]);
t.distribute([ .8 ]);
h.setListCell(q);
h.setSourceCell(c);
h.setTargetCell(n);
h.commentCell = b;
h.editable.source = !1;
return h;
};
v = y.prototype = B.require("$30", "base.js").extend(y);
v.getListHeadings = function() {
const f = this.t(), h = [ f._x("Source text", "Editor") ];
this.targetLocale && (h[1] = f._x("Translation", "Editor"));
return h;
};
v.getListColumns = function() {
const f = {
source: 0
};
this.targetLocale && (f.target = 1);
return f;
};
v.getListEntry = function(f) {
const h = this.cellText, n = [ function() {
let q, t = h(f.source() || ""), c = f.context();
return c ? (q = C.createElement("p"), q.appendChild(C.createElement("mark")).innerText = c, 
q.appendChild(C.createTextNode(" " + t)), q) : t;
} ];
this.targetLocale && (n[1] = function() {
return h(f.translation() || "");
});
return n;
};
v.stats = function() {
let f = this.po, h = f.length, n = 0, q = 0, t = 0;
f.each(function(c, b) {
b.fuzzy() ? t++ : b.translated() ? n++ : q++;
});
return {
t: h,
p: n.percent(h) + "%",
f: t,
u: q
};
};
v.unlock = function() {
const f = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
f && (this._unlocked = f, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
v.lock = function() {
const f = this._unlocked;
f && (this.targetLocale = f, delete this._unlocked, this.po && this.po.lock(f), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, f ]), 
this.active && this.loadMessage(this.active));
};
v.locked = function() {
return !this._unlocked;
};
v.setStatus = function(f) {
let h = this.$tnav;
if (null == f) h && (h.remove(), this.$tnav = null); else {
h || (this.$tnav = h = A("<nav></nav>").append(u(this)).append(d(this)).appendTo(this.targetCell.header()));
var n = [];
f.translated() ? f.fuzzy() && n.push("po-fuzzy") : n.push("po-empty");
h.attr("class", n.join(" "));
}
};
v.getSorter = function() {
function f(q, t) {
const c = q.weight(), b = t.weight();
return c === b ? h(q, t) : c > b ? -1 : 1;
}
function h(q, t) {
return q.hash().localeCompare(t.hash());
}
const n = this;
return function(q) {
const t = n.po, c = n.locked() ? f : h;
q.sort(function(b, e) {
return c(t.row(b), t.row(e));
});
};
};
v.validate = function(f) {
f.err = null;
if (f.untranslated(0)) return 0;
const h = [];
let n = this.validateMessagePrintf(f, h);
n && (f.err = h);
return n;
};
v.validateMessagePrintf = function(f, h) {
const n = f.format();
if ("no-" === n.substring(0, 3)) return 0;
const q = f.msgid(), t = f.msgidPlural();
null == k && (k = B.require("$31", "printf.js").init());
var c = k;
if (!("" !== n || c.sniff(q) || "" !== t && c.sniff(t))) return 0;
let b = 0, e = c.parse(q);
t && e.valid && (e = c.parse(t, e));
if (!e.valid) return 0;
let m = e.count;
if (0 !== m || "" !== n) {
var g = this;
f.eachMsg(function(l, r) {
h[l] = [];
if ("" !== r) {
r = c.parse(r);
var z = r.count;
l = h[l];
if (r.valid) if (z > m) l.push(a(g.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ m ])), 
b++; else if (z < m && "" === t) l.push(a(g.t()._("Missing placeholders; source text formatting suggests at least %s"), [ m ])), 
b++; else {
z = e.types;
for (const x in r.types) for (const D in r.types[x]) if (null == z[x] || null == z[x][D]) {
l.push(g.t()._("Mismatching placeholder type; check against source text formatting"));
b++;
return;
}
} else l.push(g.t()._("Possible syntax error in string formatting")), b++;
}
});
return b;
}
};
v.handle = {};
let k;
return w;
}({}, J, L));
B.register("$14", function(w, v, C) {
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
66: function(d, a) {
if (d = a.current()) d.normalize(), a.focus().pasteMessage(d);
},
75: function(d, a) {
if (d = a.current()) d.untranslate(), a.focus().pasteMessage(d);
},
85: function(d, a) {
a.focus().fuzzy(!a.fuzzy());
},
13: function(d, a) {
a.getFirstEditable() && a.next(1, !0, !0);
},
40: function(d, a) {
d = d.shiftKey;
a.next(1, d, d);
},
38: function(d, a) {
d = d.shiftKey;
a.next(-1, d, d);
},
73: function(d, a) {
if (!d.shiftKey) return !1;
a.setInvs(!a.getInvs());
}
};
w.init = function(d, a) {
function k(h) {
if (h.isDefaultPrevented() || !h.metaKey && !h.ctrlKey) return !0;
const n = h.which;
if (!f[n]) return !0;
const q = u[n];
if (!q) throw console.log(f, u), Error("command undefined #" + n);
if (h.altKey || h.shiftKey && !p[n] || !1 === q(h, d)) return !0;
h.stopPropagation();
h.preventDefault();
return !1;
}
const f = {};
A(a || v).on("keydown", k);
return {
add: function(h, n) {
u[y[h]] = n;
return this;
},
enable: function() {
for (const h in arguments) f[y[arguments[h]]] = !0;
return this;
},
disable: function() {
A(a || v).off("keydown", k);
d = a = null;
for (const h in u) f[h] = !1;
}
};
};
return w;
}({}, J, L));
B.register("$32", function(w, v, C) {
function y() {
this.reIndex([]);
}
w.init = function() {
return new y();
};
v = y.prototype;
v.reIndex = function(p) {
const u = {}, d = p.length;
let a = -1;
for (;++a < d; ) u[p[a]] = a;
this.keys = p;
this.length = a;
this.ords = u;
};
v.key = function(p, u) {
if (null == u) return this.keys[p];
const d = this.keys[p], a = this.ords[u];
if (u !== d) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[p] = u;
delete this.ords[d];
this.ords[u] = p;
}
return p;
};
v.indexOf = function(p) {
p = this.ords[p];
return null == p ? -1 : p;
};
v.add = function(p, u) {
let d = this.ords[p];
null == d && (this.keys[this.length] = p, d = this.ords[p] = this.length++);
this[d] = u;
return d;
};
v.get = function(p) {
return this[this.ords[p]];
};
v.has = function(p) {
return null != this.ords[p];
};
v.del = function(p) {
this.cut(this.ords[p], 1);
};
v.cut = function(p, u) {
u = u || 1;
const d = [].splice.call(this, p, u);
this.keys.splice(p, u);
this.reIndex(this.keys);
return d;
};
v.each = function(p) {
const u = this.keys, d = this.length;
let a = -1;
for (;++a < d; ) p(u[a], this[a], a);
return this;
};
v.sort = function(p) {
const u = this.length, d = this.keys, a = this.ords, k = [];
let f = -1;
for (;++f < u; ) k[f] = [ this[f], d[f] ];
k.sort(function(n, q) {
return p(n[0], q[0]);
});
for (f = 0; f < u; f++) {
var h = k[f];
this[f] = h[0];
h = h[1];
d[f] = h;
a[h] = f;
}
return this;
};
v.join = function(p) {
return [].join.call(this, p);
};
return w;
}({}, J, L));
B.register("$33", function(w, v, C) {
function y(p, u) {
var d = new RegExp("^.{0," + (p - 1) + "}[" + u + "]"), a = new RegExp("^[^" + u + "]+");
return function(k, f) {
for (var h = k.length, n; h > p; ) {
n = d.exec(k) || a.exec(k);
if (null == n) break;
n = n[0];
f.push(n);
n = n.length;
h -= n;
k = k.substring(n);
}
0 !== h && f.push(k);
return f;
};
}
w.create = function(p) {
function u(q) {
return f[q] || "\\" + q;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, f = {
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
pair: function(q, t) {
if (!t) return q + ' ""';
t = t.replace(k, u);
var c = 0;
t = t.replace(d, function() {
c++;
return "\\n\n";
});
if (!(c || p && p < t.length + q.length + 3)) return q + ' "' + t + '"';
q = [ q + ' "' ];
t = t.split("\n");
if (n) for (var b = -1, e = t.length; ++b < e; ) n(t[b], q); else q = q.concat(t);
return q.join('"\n"') + '"';
},
prefix: function(q, t) {
q = q.split(d);
return t + q.join("\n" + t);
},
refs: function(q) {
q = q.replace(a, " ", q);
h && (q = h(q, []).join("\n#: "));
return "#: " + q;
}
};
};
return w;
}({}, J, L));
B.register("$46", function(w, v, C) {
function y() {
this.length = 0;
}
w.init = function() {
return new y();
};
v = y.prototype;
v.push = function(p) {
this[this.length++] = p;
return this;
};
v.sort = function(p) {
[].sort.call(this, p);
return this;
};
v.each = function(p) {
for (var u = -1, d = this.length; ++u < d; ) p(u, this[u]);
return this;
};
return w;
}({}, J, L));
B.register("$34", function(w, v, C) {
function y() {}
w.extend = function(p) {
return p.prototype = new y();
};
v = y.prototype = B.require("$44", "abstract.js").init([ "add", "load" ]);
v.row = function(p) {
return this.rows[p];
};
v.lock = function(p) {
return this.locale(p || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
v.unlock = function() {
const p = this.loc;
this.loc = null;
return p;
};
v.locale = function(p) {
null == p ? p = this.loc : this.loc = p = B.require("$43", "locale.js").cast(p);
return p;
};
v.each = function(p) {
this.rows.each(p);
return this;
};
v.indexOf = function(p) {
"object" !== typeof p && (p = this.get(p));
if (!p) return -1;
null == p.idx && (p.idx = this.rows.indexOf(p.hash()));
return p.idx;
};
v.get = function(p) {
return this.rows && this.rows.get(p);
};
v.has = function(p) {
return this.rows && this.rows.has(p);
};
v.del = function(p) {
p = this.indexOf(p);
if (-1 !== p) {
const u = this.rows.cut(p, 1);
if (u && u.length) return this.length = this.rows.length, this.rows.each(function(d, a, k) {
a.idx = k;
}), p;
}
};
v.reIndex = function(p, u) {
const d = p.hash(), a = this.indexOf(p), k = this.rows.indexOf(d);
return k === a ? a : -1 !== k ? (u = (u || 0) + 1, p.source("Error, duplicate " + String(u) + ": " + p.source()), 
this.reIndex(p, u)) : this.rows.key(a, d);
};
v.sort = function(p) {
this.rows.sort(p);
return this;
};
v.export = function() {
const p = this.rows, u = p.length, d = B.require("$46", "list.js").init();
let a = -1;
for (;++a < u; ) d.push(p[a]);
return d;
};
return w;
}({}, J, L));
B.register("$35", function(w, v, C) {
function y(d, a, k) {
if (null == k) return d[a] || "";
d[a] = k || "";
return d;
}
function p() {
this._id = this.id = "";
}
function u(d, a) {
const k = d.length;
let f = -1;
for (;++f < k; ) a(f, d[f]);
}
w.extend = function(d) {
return d.prototype = new p();
};
v = p.prototype;
v.flag = function(d, a) {
const k = this.flg || (this.flg = []);
if (null != a) k[a] = d; else for (a = Math.max(k.length, this.src.length, this.msg.length); 0 !== a--; ) k[a] = d;
return this;
};
v.flagged = function(d) {
return (this.flg || [])[d || 0] || 0;
};
v.hasFlag = function() {
const d = this.flg || [];
let a = d.length;
for (;0 !== a--; ) if (this.isFlag(d[a])) return !0;
return !1;
};
v.isFlag = function(d) {
return 0 < d;
};
v.flags = function() {
const d = {}, a = [], k = this.flg || [];
let f = k.length;
for (;0 !== f--; ) {
const h = k[f];
d[h] || (d[h] = !0, a.push(h));
}
return a;
};
v.flaggedAs = function(d, a) {
const k = this.flg || [];
if (null != a) return d === k[a] || 0;
for (a = k.length; 0 !== a--; ) if (k[a] === d) return !0;
return !1;
};
v.fuzzy = function(d, a) {
const k = this.flaggedAs(4, d);
null != a && this.flag(a ? 4 : 0, d);
return k;
};
v.source = function(d, a) {
if (null == d) return this.src[a || 0] || "";
this.src[a || 0] = d;
return this;
};
v.plural = function(d, a) {
if (null == d) return this.src[a || 1] || "";
this.src[a || 1] = d || "";
return this;
};
v.sourceForms = function() {
return this.srcF;
};
v.targetForms = function() {
return this.msgF;
};
v.each = function(d) {
const a = this.src, k = this.msg, f = Math.max(a.length, k.length);
let h = -1;
for (;++h < f; ) d(h, a[h], k[h]);
return this;
};
v.eachSrc = function(d) {
u(this.src, d);
return this;
};
v.eachMsg = function(d) {
u(this.msg, d);
return this;
};
v.count = function() {
return Math.max(this.src.length, this.msg.length);
};
v.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
v.translate = function(d, a) {
this.msg[a || 0] = d || "";
return this;
};
v.untranslate = function(d) {
if (null != d) this.msg[d] = ""; else {
const a = this.msg, k = a.length;
for (d = 0; d < k; d++) a[d] = "";
}
return this;
};
v.translation = function(d) {
return this.msg[d || 0] || "";
};
v.errors = function(d) {
return this.err && this.err[d || 0] || [];
};
v.valid = function() {
return null == this.err;
};
v.translated = function(d) {
if (null != d) return !!this.msg[d];
const a = this.msg, k = a.length;
for (d = 0; d < k; d++) if (!a[d]) return !1;
return !0;
};
v.untranslated = function(d) {
if (null != d) return !this.msg[d];
const a = this.msg, k = a.length;
for (d = 0; d < k; d++) if (a[d]) return !1;
return !0;
};
v.comment = function(d) {
return y(this, "cmt", d);
};
v.notes = function(d) {
return y(this, "xcmt", d);
};
v.refs = function(d) {
return y(this, "rf", d);
};
v.format = function(d) {
return y(this, "fmt", d);
};
v.context = function(d) {
return y(this, "ctx", d);
};
v.tags = function() {
return this.tg;
};
v.getMax = function(d) {
return (this.mx || [ 0 ])[d] || 0;
};
v.toString = v.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
v.weight = function() {
let d = 0;
this.translation() || (d += 2);
this.fuzzy() && (d += 1);
return d;
};
v.equals = function(d) {
return this === d || this.hash() === d.hash();
};
v.hash = function() {
return this.id;
};
v.normalize = function() {
let d = -1, a = this.msg.length;
for (;++d < a; ) this.msg[d] = this.src[Math.min(d, 1)] || "";
};
v.disabled = function(d) {
return !!(this.lck || [])[d || 0];
};
v.disable = function(d) {
(this.lck || (this.lck = []))[d || 0] = !0;
return this;
};
v.saved = function(d) {
const a = this.drt;
if (null == a) return !0;
if (null != d) return !a[d];
for (d = a.length; 0 !== d--; ) if (a[d]) return !1;
return !0;
};
v.unsave = function(d) {
(this.drt || (this.drt = []))[d || 0] = !0;
return this;
};
v.save = function(d) {
null == d ? this.drt = null : (this.drt || (this.drt = []))[d] = !1;
return this;
};
v.is = function(d) {
return d && (d === this || d.idx === this.idx);
};
v.isHTML = function(d) {
if (null == d) return this.htm || !1;
this.htm = d;
};
v = null;
return w;
}({}, J, L));
B.register("$15", function(w, v, C) {
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
function p(f, h) {
f = f || "";
h && (f += "\0" + h);
return f;
}
function u(f) {
const h = v.console;
h && h.error && h.error(f.message || String(f));
}
function d(f) {
return B.require("$33", "format.js").create(f);
}
function a(f) {
this.locale(f);
this.clear();
this.head = y(this.now());
}
function k(f, h) {
this.src = [ f || "" ];
this.msg = [ h || "" ];
}
w.create = function(f) {
return new a(f);
};
C = B.require("$34", "messages.js").extend(a);
C.clear = function() {
this.rows = B.require("$32", "collection.js").init();
this.length = 0;
return this;
};
C.now = function() {
function f(b, e) {
for (b = String(b); b.length < e; ) b = "0" + b;
return b;
}
var h = new Date();
const n = h.getUTCFullYear(), q = h.getUTCMonth() + 1, t = h.getUTCDate(), c = h.getUTCHours();
h = h.getUTCMinutes();
return f(n, 4) + "-" + f(q, 2) + "-" + f(t, 2) + " " + f(c, 2) + ":" + f(h, 2) + "+0000";
};
C.header = function(f, h) {
const n = this.head || (this.head = {});
if (null == h) return this.headers()[f] || "";
n[f] = h || "";
return this;
};
C.headers = function(f) {
const h = this.now(), n = this.head || (this.head = y(h));
if (null != f) {
for (t in f) n[t] = f[t];
return this;
}
const q = this.locale();
f = {};
for (t in n) f[t] = String(n[t]);
if (q) {
f.Language = String(q) || "zxx";
f["Language-Team"] = q.label || f.Language;
f["Plural-Forms"] = "nplurals=" + (q.nplurals || "2") + "; plural=" + (q.pluraleq || "n!=1") + ";";
var t = "PO-Revision-Date";
} else f.Language = "", f["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
f["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", t = "POT-Creation-Date";
f[t] || (f[t] = h);
f["X-Generator"] = "Loco https://localise.biz/";
return f;
};
C.get = function(f, h) {
f = p(f, h);
return this.rows.get(f);
};
C.add = function(f, h) {
f instanceof k || (f = new k(f));
h && f.context(h);
h = f.hash();
this.rows.get(h) ? u("Duplicate message at index " + this.indexOf(f)) : (f.idx = this.rows.add(h, f), 
this.length = this.rows.length);
return f;
};
C.load = function(f) {
let h = -1, n, q;
var t;
let c, b, e, m = (t = this.locale()) && t.nplurals || 2, g = [];
for (;++h < f.length; ) n = f[h], null == n.parent ? (q = n.source || n.id, t = n.target || "", 
c = n.context, q || c ? (b = new k(q, t), b._id = n._id, c && b.context(c), n.flag && b.flag(n.flag, 0), 
n.comment && b.comment(n.comment), n.notes && b.notes(n.notes), n.refs && b.refs(n.refs), 
b.format(n.format), n.message = b, this.add(b), n.prev && n.prev[0] && (b.prev(n.prev[0].source, n.prev[0].context), 
n.prev[1] && b._src.push(n.prev[1].source || ""))) : 0 === h && "object" === typeof t && (this.head = t, 
this.headcmt = n.comment)) : g.push(n);
for (h = -1; ++h < g.length; ) try {
n = g[h];
q = n.source || n.id;
b = f[n.parent] && f[n.parent].message;
if (!b) throw Error("parent missing for plural " + q);
e = n.plural;
1 === e && b.plural(q);
e >= m || (n.flag && b.flag(n.flag, e), b.translate(n.target || "", e), n.format && !b.format() && b.format(n.format));
} catch (l) {
u(l);
}
return this;
};
C.wrap = function(f) {
this.fmtr = d(f);
return this;
};
C.toString = function() {
var f, h = this.locale(), n = [], q = [], t = this.headers(), c = !h, b = h && h.nplurals || 2, e = this.fmtr || d();
t[h ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (f in t) q.push(f + ": " + t[f]);
q = new k("", q.join("\n"));
q.comment(this.headcmt || "");
c && q.fuzzy(0, !0);
n.push(q.toString());
n.push("");
this.rows.each(function(m, g) {
m && (n.push(g.cat(e, c, b)), n.push(""));
});
return n.join("\n");
};
C = B.require("$35", "message.js").extend(k);
C.msgid = function() {
return this.src[0];
};
C.msgidPlural = function() {
return this.src[1] || "";
};
C.prev = function(f, h) {
this._src = [ f || "" ];
this._ctx = h;
};
C.hash = function() {
return p(this.source(), this.context());
};
C.toString = function() {
return this.cat(d());
};
C.cat = function(f, h, n) {
var q = [], t;
(t = this.cmt) && q.push(f.prefix(t, "# "));
(t = this.xcmt) && q.push(f.prefix(t, "#. "));
var c = this.rf;
if (t = this._id) c += (c ? " " : "") + "loco:" + t;
c && /\S/.test(c) && q.push(f.refs(c));
!h && this.fuzzy() && q.push("#, fuzzy");
(t = this.fmt) && q.push("#, " + t + "-format");
(t = this._ctx) && q.push(f.prefix(f.pair("msgctxt", t), "#| "));
if (t = this._src) t[0] && q.push(f.prefix(f.pair("msgid", t[0]), "#| ")), t[1] && q.push(f.prefix(f.pair("msgid_plural", t[1]), "#| "));
(t = this.ctx) && q.push(f.pair("msgctxt", t));
q.push(f.pair("msgid", this.src[0]));
if (null == this.src[1]) q.push(f.pair("msgstr", h ? "" : this.msg[0])); else for (c = -1, 
q.push(f.pair("msgid_plural", this.src[1])), t = this.msg || [ "", "" ], n = n || t.length; ++c < n; ) q.push(f.pair("msgstr[" + c + "]", h ? "" : t[c] || ""));
return q.join("\n");
};
C.compare = function(f, h) {
let n = this.weight(), q = f.weight();
if (n > q) return 1;
if (n < q) return -1;
if (h) {
n = this.hash().toLowerCase();
q = f.hash().toLowerCase();
if (n < q) return 1;
if (n > q) return -1;
}
return 0;
};
C.copy = function() {
let f = new k(), h, n;
for (h in this) this.hasOwnProperty(h) && ((n = this[h]) && n.concat && (n = n.concat()), 
f[h] = n);
return f;
};
return w;
}({}, J, L));
B.register("$17", function(w, v, C) {
w.init = function(y, p) {
function u() {
return f || (f = A('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function d(h, n, q) {
h = A("<p></p>").text(q);
u().dialog("close").html("").dialog("option", "title", "Error").append(h).dialog("open");
}
function a(h) {
const n = h && h.code;
if (n) {
for (var q = n.length, t = A("<ol></ol>").attr("class", h.type), c = -1; ++c < q; ) A("<li></li>").html(n[c]).appendTo(t);
t.find("li").eq(h.line - 1).attr("class", "highlighted");
u().dialog("close").html("").dialog("option", "title", h.path + ":" + h.line).append(t).dialog("open");
}
}
function k(h) {
h = h.target;
const n = A(h).find("li.highlighted")[0];
h.scrollTop = Math.max(0, (n && n.offsetTop || 0) - Math.floor(h.clientHeight / 2));
}
let f;
return {
load: function(h) {
u().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", k);
h = A.extend({
ref: h,
path: p.popath
}, p.project || {});
y.ajax.post("fsReference", h, a, d);
}
};
};
return w;
}({}, J, L));
B.register("$18", function(w, v, C) {
function y() {
this.inf = {};
}
function p() {
const a = C.createElement("p"), k = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, f = /<[a-z]+\s/i;
let h, n;
return {
sniff: function(q) {
if (q === h) return n;
h = q;
if (k.test(q) || f.test(q)) if (a.innerHTML = q, a.textContent !== q) return n = !0;
return n = !1;
}
};
}
w.create = function(a, k) {
k && "function" === typeof k.create || console.error("module.create is not callable");
k = k.create(y);
k.init(a);
return k;
};
const u = y.prototype;
u.init = function(a) {
this.inf = a || {};
return this;
};
u.param = function(a) {
return this.inf[a] || "";
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
u.setSrc = function(a) {
this.inf.src = this.mapLang(a, this.getLangMap());
};
u.stderr = function(a) {
const k = (v.loco || {}).notices;
k && k.error && k.error(String(this) + ": " + String(a));
};
u.xhrError = function(a, k, f) {
try {
const h = a.responseText, n = h && v.JSON.parse(h);
f = n && this.parseError(n) || f;
} catch (h) {}
return f || this.httpError(a);
};
u.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
u.parseError = function(a) {
return a && a.error || "";
};
u.mapLang = function(a, k) {
const f = String(a).replace("_", "-").toLowerCase();
var h = a.lang;
k = k[f] || k[h] || [];
a = k.length;
if (0 === a) return h;
if (1 < a) for (h = -1; ++h < a; ) {
const n = k[h];
if (n === f) return n;
}
return k[0];
};
u.getLangMap = function() {
return {};
};
u.maxChr = function() {
return 0;
};
u.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
};
u.translate = function(a, k, f) {
return this.batch([ a ], k, this.isHtml(a), f);
};
u.verify = function(a) {
return this.translate("OK", {
lang: "fr",
toString: function() {
return "fr";
}
}, function(k, f) {
a(f && "OK" === k);
});
};
u.hash = function() {
return this.key();
};
u._call = function(a) {
const k = this;
k.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(f, h, n) {
k.stderr(k.xhrError(f, h, n));
};
return k.abortable(A.ajax(a));
};
u.abortable = function(a) {
const k = this;
a.always(function() {
k.$r === a && (k.$r = null);
});
return k.$r = a;
};
u.abort = function() {
const a = this.$r;
a && a.abort();
};
u.isHtml = function(a) {
return (d || (d = p())).sniff(a);
};
let d;
return w;
}({}, J, L));
B.register("$19", function(w, v, C) {
function y(p) {
this.api = p;
this.chars = 0;
}
w.create = function(p) {
return new y(p);
};
v = y.prototype;
v.init = function(p, u) {
function d(g) {
let l = {
length: 0,
html: g.html,
sources: []
};
h.push(l);
return n[g.html ? 1 : 0] = l;
}
function a(g, l) {
let r = g.source(null, l);
if (r && (g.untranslated(l) || u)) if (l = f[r]) l.push(g); else {
l = r.length;
var z = k.isHtml(r);
z = n[z ? 1 : 0];
var x = z.sources;
if (e && l > e) c++; else {
if (z.length + l > b || 50 === x.length) z = d(z), x = z.sources;
x.push(r);
f[r] = [ g ];
z.length += l;
q += l;
t += 1;
}
}
}
const k = this.api, f = {}, h = [];
let n = [], q = 0, t = 0, c = 0, b = 1e4, e = k.maxChr();
e && (b = Math.min(b, e));
d({
html: !1
});
d({
html: !0
});
const m = p.locale();
p.each(1 < m.nplurals ? function(g, l) {
a(l, 0);
a(l, 1);
} : function(g, l) {
a(l, 0);
});
n = [];
this.map = f;
this.chars = q;
this.length = t;
this.batches = h;
this.locale = m;
c && k.stderr("Strings over " + b + " characters long will be skipped");
};
v.abort = function() {
this.state = "abort";
return this;
};
v.dispatch = function() {
function p(x, D) {
function E(R, I, P) {
D !== P && (x === I || 1 < R && G.source(null, 1) === x) && (G.translate(D, R), 
O++, g++);
}
if (!u()) return !1;
if (!D) return !0;
let G, F = t[x] || [], H = F.length, M = -1, O;
for (e++; ++M < H; ) if (G = F[M]) O = 0, G.each(E), O && h("each", [ G ]);
return !0;
}
function u() {
return "abort" === n.state ? (q && (q.abort(), f()), !1) : !0;
}
function d() {
let x = c.shift(), D;
x ? (D = x.sources) && D.length ? q.batch(D, b, x.html, p).fail(a).always(k) : k() : f();
}
function a() {
n.abort();
f();
}
function k() {
m++;
h("prog", [ m, r ]);
u() && d();
}
function f() {
q = c = null;
h("done");
}
function h(x, D) {
x = z[x] || [];
let E = x.length;
for (;0 <= --E; ) x[E].apply(null, D);
}
let n = this, q = n.api, t = n.map, c = n.batches || [], b = n.locale, e = 0, m = 0, g = 0, l = n.length, r = c.length, z = {
done: [],
each: [],
prog: []
};
n.state = "";
d();
return {
done: function(x) {
z.done.push(x);
return this;
},
each: function(x) {
z.each.push(x);
return this;
},
prog: function(x) {
z.prog.push(x);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(l - e, 0);
},
did: function() {
return e;
}
};
}
};
};
return w;
}({}, J, L));
B.register("$20", function(w, v, C) {
function y() {}
w.create = function(p) {
(y.prototype = new p()).batch = function(u, d, a, k) {
function f(q) {
const t = u.length;
let c = -1;
for (;++c < t && !1 !== k(u[c], q[c], d); );
}
const h = v.loco;
a = {
hook: this.getId(),
type: a ? "html" : "text",
locale: String(d),
source: this.getSrc(),
sources: u
};
const n = A.Deferred();
this.abortable(h.ajax.post("apis", a, function(q) {
f(q && q.targets || []);
n.resolve();
}, function() {
f([]);
n.reject();
}));
return n.promise();
};
return new y();
};
return w;
}({}, J, L));
B.register("$37", {
pt: [ "pt", "pt-pt", "pt-br" ],
en: [ "en", "en-gb", "en-us" ]
});
B.register("$21", function(w, v, C) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "DeepL Translator";
};
p.parseError = function(u) {
const d = (u = u.message) && /^Wrong endpoint\. Use (https?:\/\/[-.a-z]+)/.exec(u);
d && this.base(this.key()) === d[1] && (u = "Only the v2 API is supported");
return u;
};
p.base = function(u) {
let d = this.param("api");
d ? d = this.fixURL(d) : (d = "https://api", ":fx" === u.substring(u.length - 3) && (d += "-free"), 
d += ".deepl.com");
return d;
};
p.getLangMap = function() {
return B.require("$37", "deepl.json");
};
p.verify = function(u) {
const d = this.key(), a = this.base(d);
return this._call({
url: a + "/v2/usage",
data: {
auth_key: d
}
}).done(function(k) {
const f = k && k.character_limit;
k = k && k.character_count;
u(!0, f && f <= k ? "OK, but quota exceeded" : "");
}).fail(function() {
u(!1);
});
};
p.batch = function(u, d, a, k) {
function f(e) {
const m = u.length;
let g = -1;
for (;++g < m && !1 !== k(u[g], (e[g] || {}).text || "", d); );
}
const h = this;
a = h.key();
const n = h.base(a), q = h.getSrc().substring(0, 2), t = h.mapLang(d, h.getLangMap());
let c = d.tone, b = "default";
"formal" === c ? b = "more" : "informal" === c && (b = "less");
return h._call({
url: n + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: q.toUpperCase(),
target_lang: t.toUpperCase(),
formality: b,
preserve_formatting: "1",
auth_key: a,
text: u
}
}).done(function(e, m, g) {
e.translations ? f(e.translations) : (h.stderr(h.parseError(e) || h.httpError(g)), 
f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, J, L));
B.register("$38", {
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
B.register("$22", function(w, v, C) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.toString = function() {
return "Google Translate";
};
p.parseError = function(u) {
if (u.error) {
const d = [], a = u.error.errors || [], k = a.length;
let f = -1;
for (;++f < k; ) d.push(a[f].message || "");
return "Error " + u.error.code + ": " + d.join(";");
}
return "";
};
p.getLangMap = function() {
return B.require("$38", "google.json");
};
p.batch = function(u, d, a, k) {
function f(t) {
const c = u.length;
let b = -1;
for (;++b < c && !1 !== k(u[b], (t[b] || {}).translatedText || "", d); );
}
const h = this, n = h.getSrc();
a = a ? "html" : "text";
const q = h.mapLang(d, h.getLangMap());
return h._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + n + "&target=" + q + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: h.key(),
q: u
}
}).done(function(t, c, b) {
t.data ? f(t.data.translations || []) : (h.stderr(h.parseError(t) || h.httpError(b)), 
f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, J, L));
B.register("$39", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
B.register("$23", function(w, v, C) {
function y() {}
w.create = function(p) {
p = y.prototype = new p();
p.parseError = function(u) {
var d = u.details || {};
let a = d.message;
d = d.texts;
return a ? (d && d !== a && (a += "; " + d), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (u.status || "0") + ": " + a) : "";
};
p.maxChr = function() {
return 1e3;
};
p.getLangMap = function() {
return B.require("$39", "lecto.json");
};
p.batch = function(u, d, a, k) {
function f(t) {
const c = u.length;
let b = -1, e = (t[0] || {
translated: []
}).translated || [];
for (;++b < c && (t = e[b] || "", !1 !== k(u[b], t, d)); );
}
const h = this;
a = this.getSrc();
const n = h.param("api") || "https://api.lecto.ai", q = h.mapLang(d, h.getLangMap());
return h._call({
url: h.fixURL(n + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ q ],
from: a,
texts: u
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": h.key(),
Accept: "application/json"
}
}).done(function(t, c, b) {
t ? f(t.translations || []) : (h.stderr(h.parseError(t) || h.httpError(b)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, J, L));
B.register("$40", {
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
B.register("$24", function(w, v, C) {
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
return B.require("$40", "ms.json");
};
p.region = function() {
return this.param("region") || "global";
};
p.hash = function() {
return this.key() + this.region();
};
p.batch = function(u, d, a, k) {
function f(e) {
let m = -1;
for (var g; ++m < t && (g = e[m] || {}, g = g.translations || [], g = g[0] || {}, 
!1 !== k(u[m], g.text || "", d)); );
}
let h = this, n = [], q = h.getSrc(), t = u.length, c = -1;
a = a ? "html" : "plain";
let b = h.mapLang(d, h.getLangMap());
for (;++c < t; ) n.push({
Text: u[c]
});
return h._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + q + "&to=" + b + "&textType=" + a,
method: "POST",
data: JSON.stringify(n),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": h.region()
}
}).done(function(e, m, g) {
e && e.length ? f(e) : (h.stderr(h.parseError(e) || h.httpError(g)), f([]));
}).fail(function() {
f([]);
});
};
return new y();
};
return w;
}({}, J, L));
B.register("$25", function(w, v, C) {
w.init = function(y) {
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
F && (d(A(e)), F = !1);
if (l && M) {
var I = M, P = A(G);
P.find("span.loco-msg").text(I);
H || (P.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (d(A(G)), H = !1);
}
function d(I) {
I.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function a() {
if (l) return O && O.dialog("close"), u(), A(y).find('button[type="submit"]').attr("disabled", !1), 
A(v).triggerHandler("resize"), b && b(!0), !0;
z && O ? (F || (A(e).removeClass("jshide").hide().fadeIn(500), F = !0), H && (d(A(G)), 
H = !1)) : u();
A(y).find('input[type="submit"]').attr("disabled", !0);
b && b(!1);
return !1;
}
function k(I) {
var P, X = R || {};
for (P in X) if (X.hasOwnProperty(P)) {
var ha = X[P];
I[P] ? I[P].value = ha : A('<input type="hidden" />').attr("name", P).appendTo(I).val(ha);
}
}
function f(I) {
I.preventDefault();
I = A(I.target).serializeArray();
c(I);
g = !0;
return !1;
}
function h(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function n(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function q(I) {
l = I.authed;
m = I.method;
A(e).find("span.loco-msg").text(I.message || "Something went wrong.");
M = I.warning || "";
I.notice && r.notices.info(I.notice);
if (l) "direct" !== m && (R = I.creds, k(y), g && I.success && r.notices.success(I.success)), 
a(); else if (I.reason) r.notices.info(I.reason); else if (I = I.prompt) {
var P = p();
P.html(I).find("form").on("submit", f);
P.dialog("option", "title", P.find("h2").remove().text());
P.find("button.cancel-button").show().on("click", h);
P.find('input[type="submit"]').addClass("button-primary");
a();
A(v).triggerHandler("resize");
} else r.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function t() {
a();
}
function c(I) {
g = !1;
r.ajax.setNonce("fsConnect", D).post("fsConnect", I, q, t);
return I;
}
var b, e = y, m = null, g = !1, l = !1, r = v.loco, z = y.path.value, x = y.auth.value, D = y["loco-nonce"].value, E = A(e).find("button.button-primary"), G = C.getElementById(e.id + "-warn"), F = !1, H = !1, M = "", O;
r.notices.convert(G).stick();
if (y.connection_type) {
var R = {};
R.connection_type = y.connection_type.value;
l = !0;
} else z && x && c({
path: z,
auth: x
});
a();
return {
applyCreds: function(I) {
if (I.nodeType) k(I); else {
var P, X = R || {};
for (P in X) X.hasOwnProperty(P) && (I[P] = X[P]);
}
return this;
},
setForm: function(I) {
y = I;
a();
k(I);
return this;
},
connect: function() {
z = y.path.value;
x = y.auth.value;
c(A(y).serializeArray());
return this;
},
listen: function(I) {
b = I;
l && I(!0);
return this;
},
authed: function() {
return l;
}
};
};
return w;
}({}, J, L));
B.register("$41", function(w, v, C) {
function y(a, k) {
return function(f) {
a.apply(f, k);
return f;
};
}
function p(a) {
return function(k, f) {
k = k && k[a] || 0;
f = f && f[a] || 0;
return k === f ? 0 : k > f ? 1 : -1;
};
}
function u(a) {
return function(k, f) {
return (k && k[a] || "").localeCompare(f && f[a] || "");
};
}
function d(a) {
return function(k, f) {
return -1 * a(k, f);
};
}
w.sort = function(a, k, f, h) {
k = "n" === f ? p(k) : u(k);
h && (k = d(k));
return y([].sort, [ k ])(a);
};
return w;
}({}, J, L));
B.register("$26", function(w, v, C) {
w.init = function(y) {
function p(e) {
var m = -1, g = e.length;
for (A("tr", q).remove(); ++m < g; ) q.appendChild(e[m].$);
}
function u(e) {
f = e ? c.find(e, d) : d.slice(0);
n && (e = a[n], f = b(f, n, e.type, e.desc));
p(f);
}
var d = [], a = [], k = 0, f, h, n, q = y.getElementsByTagName("tbody")[0], t = y.getElementsByTagName("thead")[0], c = B.require("$10", "fulltext.js").init(), b = B.require("$41", "sort.js").sort;
t && q && (A("th", t).each(function(e, m) {
var g = m.getAttribute("data-sort-type");
g && (e = k, A(m).addClass("loco-sort").on("click", function(l) {
l.preventDefault();
l = e;
var r = a[l], z = r.type, x = !(r.desc = !r.desc);
f = b(f || d.slice(0), l, z, x);
p(f);
h && h.removeClass("loco-desc loco-asc");
h = A(r.$).addClass(x ? "loco-desc" : "loco-asc").removeClass(x ? "loco-asc" : "loco-desc");
n = l;
return !1;
}), a[k] = {
$: m,
type: g
});
m.hasAttribute("colspan") ? k += Number(m.getAttribute("colspan")) : k++;
}), A("tr", q).each(function(e, m) {
var g, l, r = [], z = {
_: e,
$: m
}, x = m.getElementsByTagName("td");
for (g in a) {
m = x[g];
(l = m.textContent.replace(/(^\s+|\s+$)/g, "")) && r.push(l);
m.hasAttribute("data-sort-value") && (l = m.getAttribute("data-sort-value"));
switch (a[g].type) {
case "n":
l = Number(l);
}
z[g] = l;
}
d[e] = z;
c.index(e, r);
}), y = A('form.loco-filter input[type="text"]', y.parentNode), y.length && (y = y[0], 
t = A(y.form), 1 < d.length ? B.require("$11", "LocoTextListener.js").listen(y, u) : t.hide(), 
t.on("submit", function(e) {
e.preventDefault();
return !1;
})));
};
return w;
}({}, J, L));
const U = J.loco || {}, ia = U.conf || {
$v: []
};
J = B.require("$1", "t.js").init();
L = ia.wplang;
U.version = function(w) {
return ia.$v[w || 0] || "0";
};
B.require("$2", "html.js");
B.require("$3", "number.js");
B.require("$4", "array.js");
B.require("$5", "json.js");
U.l10n = J;
J.load(ia.wpl10n);
L && J.pluraleq(L.pluraleq);
U.string = B.require("$6", "string.js");
U.notices = B.require("$7", "notices.js").init(J);
U.ajax = B.require("$8", "ajax.js").init(ia).localise(J);
U.locale = B.require("$9", "wplocale.js");
U.fulltext = B.require("$10", "fulltext.js");
U.watchtext = B.require("$11", "LocoTextListener.js").listen;
U.tooltip = B.require("$12", "tooltip.js");
U.po = {
ed: B.require("$13", "poedit.js"),
kbd: B.require("$14", "hotkeys.js"),
init: B.require("$15", "po.js").create,
ace: B.require("$16", "ace.js").strf("php"),
ref: B.require("$17", "refs.js")
};
U.apis = B.require("$18", "client.js");
U.apis.createJob = B.require("$19", "job.js").create;
U.apis.providers = function() {
return {
_: B.require("$20", "wordpress.js"),
deepl: B.require("$21", "deepl.js"),
google: B.require("$22", "google.js"),
lecto: B.require("$23", "lecto.js"),
microsoft: B.require("$24", "microsoft.js")
};
};
U.fs = B.require("$25", "fsconn.js");
A("#loco-admin.wrap table.wp-list-table").each(function(w, v) {
B.require("$26", "tables.js").init(v);
});
U.validate = function(w) {
w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "");
if ("2.6.7" === (w && w[0])) return !0;
U.notices.warn("admin.js is the wrong version (2.6.7). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
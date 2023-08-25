"use strict";

(function(J, L, A, ka) {
const B = function() {
function w(C) {
throw Error("Failed to require " + C);
}
const u = {};
return {
register: function(C, x) {
u[C] = x;
},
require: function(C, x) {
return u[C] || w(x);
},
include: function(C, x, r) {
return u[C] || (r ? w(x) : null);
}
};
}();
B.register("$1", function(w, u, C) {
function x(r) {
var t = typeof r;
if ("string" === t) if (/[^ <>!=()%^&|?:n0-9]/.test(r)) console.error("Invalid plural: " + r); else return new Function("n", "return " + r);
"function" !== t && (r = function(c) {
return 1 != c;
});
return r;
}
w.init = function(r) {
function t(l, p, k) {
return (l = g[l]) && l[k] ? l[k] : p || "";
}
function c(l) {
return t(l, l, 0);
}
function a(l, p) {
return t(p + "" + l, l, 0);
}
function m(l, p, k) {
k = Number(r(k));
isNaN(k) && (k = 0);
return t(l, k ? p : l, k);
}
r = x(r);
var g = {};
return {
__: c,
_x: a,
_n: m,
_: c,
x: a,
n: m,
load: function(l) {
g = l || {};
return this;
},
pluraleq: function(l) {
r = x(l);
return this;
}
};
};
return w;
}({}, J, L));
B.register("$2", function(w, u, C) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, J, L));
B.register("$3", function(w, u, C) {
Number.prototype.format = function(x, r, t) {
var c = Math.pow(10, x || 0);
x = [];
c = String(Math.round(c * this) / c);
var a = c.split(".");
c = a[0];
a = a[1];
let m = c.length;
do {
x.unshift(c.substring(m - 3, m));
} while (0 < (m -= 3));
c = x.join(t || ",");
if (a) {
{
t = a;
x = t.length;
let g;
for (;"0" === t.charAt(--x); ) g = x;
g && (t = t.substring(0, g));
a = t;
}
a && (c += (r || ".") + a);
}
return c;
};
Number.prototype.percent = function(x) {
let r = 0, t = this && x ? this / x * 100 : 0;
if (0 === t) return "0";
if (100 === t) return "100";
if (99 < t) t = Math.min(t, 99.9), x = t.format(++r); else if (.5 > t) {
t = Math.max(t, 1e-4);
do {
x = t.format(++r);
} while ("0" === x && 4 > r);
x = x.substring(1);
} else x = t.format(0);
return x;
};
return w;
}({}, J, L));
B.register("$4", function(w, u, C) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(x) {
if (null == this) throw new TypeError();
var r = Object(this), t = r.length >>> 0;
if (0 === t) return -1;
var c = 0;
1 < arguments.length && (c = Number(arguments[1]), c != c ? c = 0 : 0 != c && Infinity != c && -Infinity != c && (c = (0 < c || -1) * Math.floor(Math.abs(c))));
if (c >= t) return -1;
for (c = 0 <= c ? c : Math.max(t - Math.abs(c), 0); c < t; c++) if (c in r && r[c] === x) return c;
return -1;
});
return w;
}({}, J, L));
B.register("$5", function(w, u, C) {
C = u.JSON;
C || (C = {
parse: A.parseJSON,
stringify: null
}, u.JSON = C);
w.parse = C.parse;
w.stringify = C.stringify;
return w;
}({}, J, L));
B.register("$6", function(w, u, C) {
w.trim = function(x, r) {
for (r || (r = " \n"); x && -1 !== r.indexOf(x.charAt(0)); ) x = x.substring(1);
for (;x && -1 !== r.indexOf(x.slice(-1)); ) x = x.substring(0, x.length - 1);
return x;
};
w.sprintf = function(x) {
return w.vsprintf(x, [].slice.call(arguments, 1));
};
w.vsprintf = function(x, r) {
let t = 0;
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(c, a, m) {
if ("%" === m) return "%";
c = a ? r[Number(a) - 1] : r[t++];
return null != c ? String(c) : "s" === m ? "" : "0";
});
};
return w;
}({}, J, L));
B.register("$27", function(w, u, C) {
function x(r) {
return function(t, c) {
let a = t[r] || 0;
for (;(t = t.offsetParent) && t !== (c || C.body); ) a += t[r] || 0;
return a;
};
}
w.top = x("offsetTop");
w.left = x("offsetLeft");
w.el = function(r, t) {
r = C.createElement(r || "div");
t && (r.className = t);
return r;
};
w.txt = function(r) {
return C.createTextNode(r || "");
};
return w;
}({}, J, L));
B.register("$7", function(w, u, C) {
function x(e, n, q) {
function v() {
y();
z = setTimeout(n, q);
}
function y() {
z && clearTimeout(z);
z = 0;
}
let z = 0;
v();
A(e).on("mouseenter", y).on("mouseleave", v);
return {
die: function() {
y();
A(e).off("mouseenter mouseleave");
}
};
}
function r(e, n) {
e.fadeTo(n, 0, function() {
e.slideUp(n, function() {
e.remove();
A(u).triggerHandler("resize");
});
});
return e;
}
function t(e, n) {
function q(G) {
k[D] = null;
r(A(e), 250);
z && z.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function v(G) {
z && z.die();
return z = x(e, q, G);
}
const y = A(e);
let z, D, F, E = y.find("button");
0 === E.length && (y.addClass("is-dismissible"), E = A('<button type="button" class="notice-dismiss"> </a>').appendTo(y));
E.off("click").on("click", q);
A(u).triggerHandler("resize");
p();
D = k.length;
k.push(q);
n && (z = v(n));
return {
link: function(G, H) {
var N = H || G;
H = A(e).find("nav");
G = A("<nav></nav>").append(A("<a></a>").attr("href", G).text(N));
F ? (F.push(G.html()), H.html(F.join("<span> | </span>"))) : (F = [ G.html() ], 
A(e).addClass("has-nav").append(G));
return this;
},
stick: function() {
z && z.die();
z = null;
k[D] = null;
return this;
},
slow: function(G) {
v(G || 1e4);
return this;
}
};
}
function c(e, n, q) {
const v = B.require("$27", "dom.js").el;
e = A('<div class="notice notice-' + e + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const y = A(v("p"));
q = A(v("span")).text(q);
n = A(v("strong", "has-icon")).text(n + ": ");
y.append(n).append(q).appendTo(e);
return e;
}
function a(e, n, q, v) {
e = c(q, n, e).css("opacity", "0").fadeTo(500, 1);
A(u).triggerHandler("resize");
return t(e, v);
}
function m(e) {
return a(e, f, "warning");
}
function g() {
A("#loco-notices").find("div.notice").each(function(e, n) {
-1 === n.className.indexOf("jshide") && (e = -1 === n.className.indexOf("notice-success") ? null : 5e3, 
t(n, e));
});
}
const l = u.console || {
log: function() {}
}, p = Date.now || function() {
return new Date().getTime();
};
let k = [], b, f, d, h;
w.error = function(e) {
return a(e, b, "error");
};
w.warn = m;
w.info = function(e) {
return a(e, d, "info");
};
w.success = function(e) {
return a(e, h, "success", 5e3);
};
w.warning = m;
w.log = function() {
l.log.apply(l, arguments);
};
w.debug = function() {
(l.debug || l.log).apply(l, arguments);
};
w.clear = function() {
let e = -1;
const n = k, q = n.length;
for (;++e < q; ) {
const v = n[e];
v && v.call && v();
}
k = [];
return w;
};
w.create = c;
w.raise = function(e) {
(w[e.type] || w.error).call(w, e.message);
};
w.convert = t;
w.init = function(e) {
b = e._("Error");
f = e._("Warning");
d = e._("Notice");
h = e._("OK");
setTimeout(g, 1e3);
return w;
};
return w;
}({}, J, L));
B.register("$8", function(w, u, C) {
function x(f) {
let d = A("<pre>" + f + "</pre>").text();
d && (d = d.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
d || (d = f) || (d = "Blank response from server");
return d;
}
function r(f) {
return (f = f.split(/[\r\n]/)[0]) ? (f = f.replace(/ +in +\S+ on line \d+/, ""), 
f = f.replace(/^[()! ]+Fatal error:\s*/, "")) : k._("Server returned invalid data");
}
function t(f) {
u.console && console.error && console.error('No nonce for "' + f + '"');
return "";
}
function c(f, d, h) {
f[d] = h;
}
function a(f, d, h) {
f.push({
name: d,
value: h
});
}
function m(f, d, h) {
f.append(d, h);
}
function g(f, d, h, e) {
function n(v, y, z) {
if ("abort" !== y) {
var D = k || {
_: function(O) {
return O;
}
}, F = v.status || 0, E = v.responseText || "", G = x(E), H = v.getResponseHeader("Content-Type") || "Unknown type", N = v.getResponseHeader("Content-Length") || E.length;
"success" === y && z ? q.error(z) : (q.error(r(G) + ".\n" + D._("Check console output for debugging information")), 
q.log("Ajax failure for " + f, {
status: F,
error: y,
message: z,
output: E
}), "parsererror" === y && (z = "Response not JSON"), q.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + F + ' "' + (z || D._("Unknown error")) + '" (' + H + " " + N + " bytes)", G, "====" ].join("\n")));
h && h.call && h(v, y, z);
b = v;
}
}
e.url = l;
e.dataType = "json";
const q = B.require("$7", "notices.js").clear();
b = null;
return A.ajax(e).fail(n).done(function(v, y, z) {
const D = v && v.data, F = v && v.notices, E = F && F.length;
!D || v.error ? n(z, y, v && v.error && v.error.message) : d && d(D, y, z);
for (v = -1; ++v < E; ) q.raise(F[v]);
});
}
const l = u.ajaxurl || "/wp-admin/admin-ajax.php";
let p = {}, k, b;
w.init = function(f) {
p = f.nonces || p;
return w;
};
w.localise = function(f) {
k = f;
return w;
};
w.xhr = function() {
return b;
};
w.strip = x;
w.parse = r;
w.submit = function(f, d, h) {
function e(z, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function n(z, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function q(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(n);
z.find("input").each(n);
z.find("select").each(n);
z.find("textarea").each(n);
z.removeClass("disabled loading");
}
const v = A(f), y = v.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(e);
z.find("input").each(e);
z.find("select").each(e);
z.find("textarea").each(e);
z.addClass("disabled loading");
})(v);
return g(f.route.value, function(z, D, F) {
q(v);
d && d(z, D, F);
}, function(z, D, F) {
q(v);
h && h(z, D, F);
}, {
type: f.method,
data: y
});
};
w.post = function(f, d, h, e) {
let n = !0, q = d || {}, v = p[f] || t(f);
u.FormData && q instanceof FormData ? (n = !1, d = m) : d = Array.isArray(q) ? a : c;
d(q, "action", "loco_json");
d(q, "route", f);
d(q, "loco-nonce", v);
return g(f, h, e, {
type: "post",
data: q,
processData: n,
contentType: n ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, d, h, e) {
d = d || {};
const n = p[f] || t(f);
d.action = "loco_json";
d.route = f;
d["loco-nonce"] = n;
return g(f, h, e, {
type: "get",
data: d
});
};
w.setNonce = function(f, d) {
p[f] = d;
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
B.register("$9", function(w, u, C) {
function x() {}
const r = B.require("$28", "rtl.json");
let t;
w.init = function() {
return new x();
};
w.cast = function(c) {
return c instanceof x ? c : "string" === typeof c ? w.parse(c) : w.clone(c);
};
w.clone = function(c) {
const a = new x();
for (const m in c) a[m] = c[m];
return a;
};
w.parse = function(c) {
c = (t || (t = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(c);
if (!c) return null;
const a = new x();
a.lang = c[1].toLowerCase();
a.region = (c[2] || "").toUpperCase();
a.variant = (c[3] || "").toLowerCase();
return a;
};
u = x.prototype;
u.isValid = function() {
return !!this.lang;
};
u.isKnown = function() {
const c = this.lang;
return !(!c || "zxx" === c);
};
u.toString = function(c) {
c = c || "_";
let a = this.lang || "zxx";
this.region && (a += c + this.region);
this.variant && (a += c + this.variant);
return a;
};
u.getIcon = function() {
let c = 3, a = [];
const m = [ "variant", "region", "lang" ];
for (;0 !== c--; ) {
const g = m[c], l = this[g];
l && (a.push(g), a.push(g + "-" + l.toLowerCase()));
}
return a.join(" ");
};
u.isRTL = function() {
return !!r[String(this.lang).toLowerCase()];
};
u = null;
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
B.register("$10", function(w, u, C) {
w.init = function() {
function x(k) {
return g[k] || k;
}
function r(k, b, f) {
let d, h, e = String(k || "").toLowerCase().replace(m, x).split(l), n = e.length;
for (;0 !== n--; ) if ((k = e[n]) && null == f[k]) for (b.push(k), f[k] = !0, d = k.split(p), 
h = d.length; 0 !== h--; ) (k = d[h]) && null == f[k] && (b.push(k), f[k] = !0);
return b;
}
function t(k) {
return r(k, [], {});
}
function c(k) {
let b = [], f = {}, d = k.length;
for (;0 !== d--; ) r(k[d], b, f);
return b;
}
let a = [];
const m = /[^a-z0-9]/g, g = B.require("$29", "flatten.json"), l = /\s+/, p = /[^\d\p{L}]+/u;
return {
split: t,
find: function(k, b) {
{
let f = [], d = -1, h = a, e = h.length, n, q, v, y, z, D = String(k || "").toLowerCase().replace(m, x).split(" "), F = D.length, E = !!b;
a: for (;++d < e; ) if (q = h[d], null != q && (v = q.length)) {
y = 0;
b: for (;y < F; y++) {
z = D[y];
for (k = 0; k < v; k++) if (n = q[k], 0 === n.indexOf(z)) continue b;
continue a;
}
f.push(E ? b[d] : d);
}
b = f;
}
return b;
},
add: function(k, b) {
a[k] = t(b);
},
push: function(k) {
a[a.length] = c(k);
},
index: function(k, b) {
a[k] = c(b);
},
size: function() {
return a.length;
},
clear: function() {
a = [];
},
remove: function(k) {
a[k] = null;
}
};
};
return w;
}({}, J, L));
B.register("$11", function(w, u, C) {
w.listen = function(x, r) {
function t() {
d[g ? "show" : "hide"]();
}
function c(h) {
f && k.setAttribute("size", 2 + h.length);
g = h;
t();
return h;
}
function a() {
l = null;
r(g);
}
function m(h) {
var e = k.value;
b && e === b && (e = "");
e !== g ? (l && clearTimeout(l), c(e), h ? l = setTimeout(a, h) : a()) : l && null == h && (clearTimeout(l), 
a());
}
var g, l, p = 150, k = x instanceof jQuery ? x[0] : x, b = u.attachEvent && k.getAttribute("placeholder"), f = 1 === Number(k.size), d = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
k.value = "";
m();
return !1;
});
c(k.value);
A(k).on("input", function() {
m(p);
return !0;
}).on("blur focus change", function() {
m(null);
return !0;
}).after(d);
t();
return {
delay: function(h) {
p = h;
return this;
},
ping: function(h) {
h ? (l && clearTimeout(l), h = k.value, b && h === b && (h = ""), c(h), a(), h = void 0) : h = m();
return h;
},
val: function(h) {
if (null == h) return g;
l && clearTimeout(l);
k.value = c(h);
t();
},
el: function() {
return k;
},
blur: function(h) {
return A(k).on("blur", h);
},
destroy: function() {
l && clearTimeout(l);
}
};
};
return w;
}({}, J, L));
B.register("$12", function(w, u, C) {
function x(a, m) {
return "function" == typeof a ? a.call(m) : a;
}
function r(a, m) {
this.$element = A(a);
this.options = m;
this.enabled = !0;
this.fixTitle();
}
w.init = function(a, m) {
let g = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: c,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
m && (g = A.extend({}, g, m));
a.tipsy(g);
};
w.delays = function(a, m) {
t = a || 150;
c = m || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(a, m) {
m.data("tipsy").setTitle(a);
};
let t, c;
w.delays();
A(C.body).on("overlayOpened overlayClosing", function(a) {
w.kill();
return !0;
});
r.prototype = {
show: function() {
var a = this.getTitle();
if (a && this.enabled) {
var m = this.tip();
m.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
m[0].className = "tipsy";
m.remove().css({
top: 0,
left: 0
}).prependTo(C.body);
a = (a = this.options.anchor) ? this.$element.find(a) : this.$element;
a = A.extend({}, a.offset(), {
width: a[0].offsetWidth,
height: a[0].offsetHeight
});
var g = m[0].offsetWidth, l = m[0].offsetHeight, p = x(this.options.gravity, this.$element[0]);
switch (p.charAt(0)) {
case "n":
var k = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "s":
k = {
top: a.top - l - this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "e":
k = {
top: a.top + a.height / 2 - l / 2,
left: a.left - g - this.options.offset
};
break;

case "w":
k = {
top: a.top + a.height / 2 - l / 2,
left: a.left + a.width + this.options.offset
};
}
2 == p.length && ("w" == p.charAt(1) ? k.left = a.left + a.width / 2 - 15 : k.left = a.left + a.width / 2 - g + 15);
m.css(k).addClass("tipsy-" + p);
m.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + p.charAt(0);
this.options.className && m.addClass(x(this.options.className, this.$element[0]));
m.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var a = this.$element, m = a.attr("title") || "";
(m || "string" !== typeof a.attr("original-title")) && a.attr("original-title", m).removeAttr("title");
},
getTitle: function() {
var a, m = this.$element, g = this.options;
this.fixTitle();
"string" == typeof g.title ? a = m.attr("title" == g.title ? "original-title" : g.title) : "function" == typeof g.title && (a = g.title.call(m[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || g.fallback;
},
setTitle: function(a) {
var m = this.$element;
m.attr("default-title") || m.attr("default-title", this.getTitle());
null == a && (a = m.attr("default-title") || this.getTitle());
m.attr("original-title", a);
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
function m(b) {
var f = A.data(b, "tipsy");
f || (f = new r(b, A.fn.tipsy.elementOptions(b, a)), A.data(b, "tipsy", f));
return f;
}
function g() {
var b = m(this), f = a.delayIn;
b.hoverState = "in";
0 == f ? b.show() : (b.fixTitle(), setTimeout(function() {
"in" == b.hoverState && b.show();
}, f));
}
function l() {
var b = m(this), f = a.delayOut;
b.hoverState = "out";
0 == f ? b.hide() : (b.tip().removeClass("in"), setTimeout(function() {
"out" == b.hoverState && b.hide();
}, f));
}
a = A.extend({}, A.fn.tipsy.defaults, a);
a.live || this.each(function() {
m(this);
});
if ("manual" != a.trigger) {
var p = a.live ? "live" : "bind", k = "hover" == a.trigger ? "mouseleave" : "blur";
this[p]("hover" == a.trigger ? "mouseenter" : "focus", g)[p](k, l);
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
A.fn.tipsy.elementOptions = function(a, m) {
return A.metadata ? A.extend({}, m, A(a).metadata()) : m;
};
A.fn.tipsy.autoNS = function() {
return A(this).offset().top > A(C).scrollTop() + A(u).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(C).scrollLeft() + A(u).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(a, m) {
return function() {
var g = m[0], l = 1 < m.length ? m[1] : !1, p = A(C).scrollTop() + a, k = A(C).scrollLeft() + a, b = A(this);
b.offset().top < p && (g = "n");
b.offset().left < k && (l = "w");
A(u).width() + A(C).scrollLeft() - b.offset().left < a && (l = "e");
A(u).height() + A(C).scrollTop() - b.offset().top < a && (g = "s");
return g + (l ? l : "");
};
};
return w;
}({}, J, L));
B.register("$42", function(w, u, C) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return B.require("$6", "string.js").trim(this, " \n\r\t");
});
"".padStart || (String.prototype.padStart = function(x, r) {
let t = this.valueOf();
for (;x > t.length; ) t = r + t;
return t;
});
"".padEnd || (String.prototype.padEnd = function(x, r) {
let t = this.valueOf();
for (;x > t.length; ) t += r;
return t;
});
w.html = function() {
function x(l) {
return "&#" + l.charCodeAt(0) + ";";
}
function r(l, p) {
return '<a href="' + l + '" target="' + (p.indexOf(m) ? "_blank" : "_top") + '">' + p + "</a>";
}
let t, c, a, m, g = function() {
t = /[<>&]/g;
c = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
m = location.hostname;
g = null;
};
return function(l, p) {
g && g();
l = l.replace(t, x);
p && (l = l.replace(a, r).replace(c, "<br />"));
return l;
};
}();
return w;
}({}, J, L));
B.register("$43", function(w, u, C) {
function x() {}
let r, t;
const c = B.require("$28", "rtl.json");
w.init = function() {
return new x();
};
w.cast = function(a) {
return a instanceof x ? a : "string" === typeof a ? w.parse(a) : w.clone(a);
};
w.clone = function(a) {
const m = new x();
for (const g in a) m[g] = a[g];
return m;
};
w.parse = function(a) {
r || (t = /[-_+]/, r = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(t).join("-");
a = r.exec(a);
if (!a) return null;
const m = new x();
m.lang = a[1].toLowerCase();
a[2] && (m.script = a[2].charAt(0).toUpperCase() + a[2].substring(1).toLowerCase());
a[3] && (m.region = a[3].toUpperCase());
a[4] && (m.variant = a[4].toLowerCase());
a[5] && (m.extension = a[5]);
return m;
};
u = x.prototype;
u.isValid = function() {
return !!this.lang;
};
u.isKnown = function() {
const a = this.lang;
return !(!a || "zxx" === a);
};
u.toString = function(a) {
a = a || "-";
let m, g = this.lang || "zxx";
if (m = this.script) g += a + m;
if (m = this.region) g += a + m;
if (m = this.variant) g += a + m;
if (m = this.extension) g += a + m;
return g;
};
u.getIcon = function() {
let a = 4, m = [];
const g = [ "variant", "region", "script", "lang" ];
for (;0 !== a--; ) {
const l = g[a];
let p = this[l];
p && (p.join && (p = p.join("-")), 1 === a && 3 === p.length ? m.push("region-m49") : m = m.concat([ l, l + "-" + p.toLowerCase() ]));
}
return m.join(" ");
};
u.isRTL = function() {
return !!c[String(this.script || this.lang).toLowerCase()];
};
u = null;
return w;
}({}, J, L));
B.register("$44", function(w, u, C) {
function x(a) {
u.console && console.error && console.error(a);
}
function r() {
x("Method not implemented");
}
function t() {}
function c(a) {}
t.prototype.toString = function() {
return "[Undefined]";
};
c.prototype._validate = function(a) {
let m, g, l = !0;
for (m in this) g = this[m], g === r ? (x(a + "." + m + "() must be implemented"), 
l = !1) : g instanceof t && (x(a + "." + m + " must be defined"), l = !1);
return l;
};
w.init = function(a, m) {
const g = new c();
if (a) {
let l = a.length;
for (;0 !== l--; ) g[a[l]] = r;
}
if (m) for (a = m.length; 0 !== a--; ) g[m[a]] = new t();
return g;
};
w.validate = function(a) {
const m = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(m && m[1] || "Object");
};
return w;
}({}, J, L));
B.register("$51", function(w, u, C) {
let x = 0, r = u.requestAnimationFrame, t = u.cancelAnimationFrame;
if (!r || !t) for (const a in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (r = u[a + "RequestAnimationFrame"]) if (t = u[a + "CancelAnimationFrame"] || u[a + "CancelRequestAnimationFrame"]) break;
r && t || (r = function(a) {
var m = c();
const g = Math.max(0, 16 - (m - x)), l = m + g;
m = u.setTimeout(function() {
a(l);
}, g);
x = l;
return m;
}, t = function(a) {
clearTimeout(a);
});
const c = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, m) {
function g() {
p = r(g, m);
a(l++);
}
let l = 0, p;
g();
return {
stop: function() {
p && t(p);
p = null;
}
};
};
return w;
}({}, J, L));
B.register("$48", function(w, u, C) {
function x(k, b, f, d) {
if (c) {
const h = f;
f = function(e) {
if ((e.MSPOINTER_TYPE_TOUCH || "touch") === e.pointerType) return h(e);
};
}
k.addEventListener(b, f, d);
return {
unbind: function() {
k.removeEventListener(b, f, d);
}
};
}
function r(k) {
k.preventDefault();
k.stopPropagation();
return !1;
}
let t;
const c = !!u.navigator.msPointerEnabled, a = c ? "MSPointerDown" : "touchstart", m = c ? "MSPointerMove" : "touchmove", g = c ? "MSPointerUp" : "touchend";
w.ok = function(k) {
null == t && (t = "function" === typeof C.body.addEventListener);
t && k && k(w);
return t;
};
w.ms = function() {
return c;
};
w.dragger = function(k, b) {
function f(n) {
k.addEventListener(n, h[n], !1);
}
function d(n) {
k.removeEventListener(n, h[n], !1);
}
const h = {};
h[a] = function(n) {
l(n, function(q, v) {
v.type = a;
b(n, v, e);
});
f(m);
f(g);
return !0;
};
h[g] = function(n) {
d(m);
d(g);
l(n, function(q, v) {
v.type = g;
b(n, v, e);
});
return !0;
};
h[m] = function(n) {
l(n, function(q, v) {
v.type = m;
b(n, v, e);
});
return r(n);
};
f(a);
let e = {
kill: function() {
d(a);
d(m);
d(g);
k = e = b = null;
}
};
return e;
};
w.swiper = function(k, b, f) {
function d(E) {
k.addEventListener(E, y[E], !1);
}
function h(E) {
k.removeEventListener(E, y[E], !1);
}
function e() {
n && n.stop();
n = null;
}
let n, q, v, y = {}, z = [], D = [], F = [];
y[a] = function(E) {
q = !1;
e();
const G = p();
l(E, function(H, N) {
z[H] = G;
D[H] = N.clientX;
F[H] = N.clientY;
});
v = k.scrollLeft;
return !0;
};
y[g] = function(E) {
l(E, function(G, H) {
const N = p() - z[G];
G = D[G] - H.clientX;
b(Math.abs(G) / N, G ? 0 > G ? -1 : 1 : 0);
});
v = null;
return !0;
};
y[m] = function(E) {
let G, H;
null == v || l(E, function(N, O) {
G = D[N] - O.clientX;
H = F[N] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return q = !0;
G && (q = !0, k.scrollLeft = Math.max(0, v + G));
return r(E);
};
if (!c || f) d(a), d(m), d(g), c && (k.className += " mstouch");
return {
kill: function() {
h(a);
h(m);
h(g);
e();
},
swiped: function() {
return q;
},
ms: function() {
return c;
},
snap: function(E) {
c && !f && (k.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + E + "px)", 
k.style["-ms-scroll-snap-type"] = "mandatory", k.style["-ms-scroll-chaining"] = "none");
},
scroll: function(E, G, H) {
e();
let N = k.scrollLeft;
const O = E > N ? 1 : -1, S = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return n = B.require("$51", "fps.js").loop(function(Q) {
Q && (N = Math.max(0, S(E, N + I)), k.scrollLeft = N, E === N && (e(), H && H(N)));
}, k);
}
};
};
w.start = function(k, b) {
return x(k, a, b, !1);
};
w.move = function(k, b) {
return x(k, m, b, !1);
};
w.end = function(k, b) {
return x(k, g, b, !1);
};
const l = w.each = function(k, b) {
if (c) (k.MSPOINTER_TYPE_TOUCH || "touch") === k.pointerType && b(0, k); else {
k = (k.originalEvent || k).changedTouches || [];
for (var f = -1; ++f < k.length; ) b(f, k[f]);
}
}, p = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, J, L));
B.register("$52", function(w, u, C) {
w.init = function(x) {
function r() {
m.style.top = String(-x.scrollTop) + "px";
return !0;
}
function t() {
var l = m;
l.textContent = x.value;
l.innerHTML = l.innerHTML.replace(/[ \t]/g, c).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function c(l) {
return '<span class="x' + l.charCodeAt(0).toString(16) + '">' + l + "</span>";
}
var a = x.parentNode, m = a.insertBefore(C.createElement("div"), x);
A(x).on("input", t).on("scroll", r);
A(a).addClass("has-mirror");
m.className = "ta-mirror";
var g = x.offsetWidth - x.clientWidth;
2 < g && (m.style.marginRight = String(g - 2) + "px");
t();
r();
return {
kill: function() {
A(x).off("input", t).off("scroll", r);
a.removeChild(m);
m = null;
A(a).removeClass("has-mirror");
}
};
};
return w;
}({}, J, L));
B.register("$36", function(w, u, C) {
function x(c, a) {
c = r[c] || [];
a = a && u[a];
const m = c.length;
let g = -1, l = 0;
for (;++g < m; ) {
const p = c[g];
"function" === typeof p && (p(a), l++);
}
return l;
}
const r = {};
let t = "";
w.load = function(c, a, m) {
function g() {
k && (clearTimeout(k), k = null);
b && (b.onreadystatechange = null, b = b = b.onload = null);
c && (delete r[c], c = null);
}
function l(f, d) {
f = b && b.readyState;
if (d || !f || "loaded" === f || "complete" === f) d || x(c, m), g();
}
function p() {
if (0 === x(c)) throw Error('Failed to load "' + (m || c) + '"');
g();
}
if (m && u[m]) "function" === typeof a && a(u[m]); else if (null != r[c]) r[c].push(a); else {
r[c] = [ a ];
var k = setTimeout(p, 4e3), b = C.createElement("script");
b.setAttribute("src", c);
b.setAttribute("async", "true");
b.onreadystatechange = l;
b.onload = l;
b.onerror = p;
b.onabort = g;
C.getElementsByTagName("head")[0].appendChild(b);
}
};
w.stat = function(c) {
var a;
if (!(a = t)) {
{
a = C.getElementsByTagName("script");
const m = a.length;
let g = -1, l = "";
for (;++g < m; ) {
const p = a[g].getAttribute("src");
if (p) {
const k = p.indexOf("/lib/vendor");
if (-1 !== k) {
l = p.substring(0, k);
break;
}
}
}
a = l || "/static";
}
a = t = a;
}
return a + c;
};
return w;
}({}, J, L));
B.register("$16", function(w, u, C) {
function x(p, k) {
p.setReadOnly(!1);
p.on("change", function(b, f) {
return k.val(f.getValue());
});
p.on("focus", function() {
return k.focus();
});
p.on("blur", function() {
return k.blur();
});
}
function r(p) {
p.off("change");
p.off("focus");
p.off("blur");
}
function t(p) {
r(p);
p.setReadOnly(!0);
p.setHighlightGutterLine(!1);
p.setHighlightActiveLine(!1);
}
function c(p, k) {
function b() {
this.HighlightRules = f;
}
var f = a(k);
p = p.require;
k = p("ace/lib/oop");
k.inherits(f, p("ace/mode/text_highlight_rules").TextHighlightRules);
k.inherits(b, p("ace/mode/text").Mode);
return new b();
}
function a(p) {
return function() {
var k = {
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
}, b = m(p);
"icu" === p ? k = {
start: k.start.concat([ {
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
} : b && k.start.push({
token: "printf",
regex: b
});
this.$rules = k;
};
}
function m(p) {
switch (p) {
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

case l:
return g || "%%";
}
}
var g, l = "auto";
w.init = function(p, k, b) {
var f, d = !1, h = b || l, e = p.parentNode, n = e.appendChild(C.createElement("div"));
A(e).addClass("has-proxy has-ace");
B.require("$36", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(q) {
if (n) {
if (!q) throw Error("Failed to load code editor");
f = q.edit(n);
var v = f.session, y = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(d);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
v.setUseSoftTabs(!1);
y.setShowGutter(!0);
y.setPadding(10);
y.setScrollMargin(8);
v.setMode(c(q, h));
f.setValue(p.value, -1);
v.setUseWrapMode(!0);
k ? x(f, k) : t(f);
}
}, "ace");
return {
kill: function() {
f && (r(f), f.destroy(), f = null);
n && (e.removeChild(n), A(e).removeClass("has-proxy has-ace"), n = null);
return this;
},
disable: function() {
f && t(f);
k = null;
return this;
},
enable: function(q) {
k = q;
f && x(f, q);
return this;
},
resize: function() {
f && f.resize();
return this;
},
val: function(q) {
f && q !== f.getValue() && f.setValue(q, -1);
return this;
},
invs: function(q) {
q = q || !1;
d !== q && (d = q, f && f.setShowInvisibles(q));
return this;
},
strf: function(q) {
q = q || l;
q !== h && (h = q, f && f.session.setMode(c(u.ace, q)));
return this;
},
focus: function() {
return this;
}
};
};
w.strf = function(p, k) {
l = p;
g = k;
return w;
};
return w;
}({}, J, L));
B.register("$53", function(w, u, C) {
function x(a, m) {
function g() {
return m.val(a.getContent());
}
a.on("input", g);
a.on("change", g);
a.on("focus", function() {
return m.focus();
});
a.on("blur", function() {
return m.blur();
});
a.setMode("design");
}
function r(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function t(a) {
r(a);
a.setMode("readonly");
}
var c = 0;
w.load = function(a) {
var m = B.require("$36", "remote.js");
m.load(m.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, m) {
function g(q) {
b = q;
f = "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4);
return q.replace(/(<\/?)script/gi, "$1loco:script");
}
function l(q) {
p = q;
q._getContent = q.getContent;
q.getContent = function(v) {
v = this._getContent(v);
v = v.replace(/(<\/?)loco:script/gi, "$1script");
if (!f && "<p>" === v.substring(0, 3) && "</p>" === v.substring(v.length - 4)) {
var y = v.substring(3, v.length - 4);
if (y === b || -1 === y.indexOf("</p>")) v = y;
}
return v;
};
q._setContent = q.setContent;
q.setContent = function(v, y) {
return this._setContent(g(v), y);
};
m ? (x(q, m), m.reset()) : t(q);
A(e).removeClass("loading");
}
var p, k = !1, b = "", f = !1, d = a.parentNode, h = d.parentNode, e = d.appendChild(C.createElement("div")), n = h.insertBefore(C.createElement("nav"), d);
n.id = "_tb" + String(++c);
A(d).addClass("has-proxy has-mce");
A(e).addClass("mce-content-body loading").html(g(a.value));
w.load(function(q) {
if (!q) throw Error("Failed to load HTML editor");
e && q.init({
inline: !0,
target: e,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + n.id,
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
val: function(q) {
q = g(q);
null == p ? (a.value = q, A(e).html(q)) : p.getContent() !== q && p.setContent(q);
m && m.val(q);
return this;
},
kill: function() {
p && (m && m.val(p.getContent()), r(p), p.destroy(), p = null);
e && (d.removeChild(e), A(d).removeClass("has-proxy has-mce"), e = null);
n && (h.removeChild(n), n = null);
return this;
},
enable: function(q) {
m = q;
p && x(p, q);
return this;
},
disable: function() {
p && t(p);
m = null;
return this;
},
focus: function() {
p && m && p.focus();
return this;
},
invs: function(q) {
q = q || !1;
k !== q && (k = q, A(d)[q ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, J, L));
B.register("$49", function(w, u, C) {
function x(c) {
function a() {
k && (b.off("input", m), k = !1);
}
function m() {
const e = c.value;
e !== d && (b.trigger("changing", [ e, d ]), d = e);
}
function g() {
m();
k && h !== d && b.trigger("changed", [ d ]);
}
function l() {
t = c;
h = d;
k || (b.on("input", m), k = !0);
b.trigger("editFocus");
f.addClass("has-focus");
return !0;
}
function p() {
t === c && (t = null);
b.trigger("editBlur");
f.removeClass("has-focus");
k && (g(), a());
return !0;
}
let k = !1, b = A(c), f = A(c.parentNode), d = c.value, h;
b.on("blur", p).on("focus", l);
return {
val: function(e) {
d !== e && (c.value = e, b.triggerHandler("input"), d = e);
return !0;
},
kill: function() {
a();
b.off("blur", p).off("focus", l);
},
fire: function() {
d = null;
m();
},
ping: g,
blur: p,
focus: l,
reset: function() {
h = d = c.value;
}
};
}
function r(c) {
this.e = c;
}
let t;
w._new = function(c) {
return new r(c);
};
w.init = function(c) {
const a = new r(c);
c.disabled ? (c.removeAttribute("disabled"), a.disable()) : c.readOnly ? a.disable() : a.enable();
return a;
};
u = r.prototype;
u.destroy = function() {
this.unlisten();
var c = this.p;
c && (c.kill(), this.p = null);
this.e = null;
};
u.reload = function(c, a) {
var m = this.l;
m && !a && (this.disable(), m = null);
this.val(c || "");
a && !m && this.enable();
return this;
};
u.val = function(c) {
const a = this.e;
if (null == c) return a.value;
const m = this.l, g = this.p;
g && g.val(c);
m && m.val(c);
m || a.value === c || (a.value = c, A(a).triggerHandler("input"));
return this;
};
u.fire = function() {
this.l && this.l.fire();
return this;
};
u.ping = function() {
this.l && this.l.ping();
return this;
};
u.focus = function() {
var c = this.p;
c ? c.focus() : A(this.e).focus();
};
u.focused = function() {
return t && t === this.el;
};
u.parent = function() {
return this.e.parentNode;
};
u.attr = function(c, a) {
var m = this.e;
if (1 === arguments.length) return m.getAttribute(c);
null == a ? m.removeAttribute(c) : m.setAttribute(c, a);
return this;
};
u.editable = function() {
return !!this.l;
};
u.enable = function() {
var c = this.p;
this.e.removeAttribute("readonly");
this.listen();
c && c.enable && c.enable(this.l);
return this;
};
u.disable = function() {
var c = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
c && c.disable && c.disable();
return this;
};
u.listen = function() {
var c = this.l;
c && c.kill();
this.l = x(this.e);
return this;
};
u.unlisten = function() {
var c = this.l;
c && (c.kill(), this.l = null);
return this;
};
u.setInvs = function(c, a) {
var m = this.i || !1;
if (a || m !== c) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(c) : c && (this._i = B.require("$52", "mirror.js").init(this.e)), 
this.i = c;
return this;
};
u.getInvs = function() {
return this.i || !1;
};
u.setMode = function(c) {
var a = this.p, m = this.i || !1;
c !== (this.m || "") && (this.m = c, a && a.kill(), this.p = a = "code" === c ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === c ? B.require("$53", "mce.js").init(this.e, this.l) : null, 
this.setInvs(m, !0), t && this.focus());
return this;
};
u.setStrf = function(c) {
this["%"] = c;
"code" === this.m && this.p.strf(c);
return this;
};
u.name = function(c) {
this.e.setAttribute("name", c);
return this;
};
u.placeholder = function(c) {
this.e.setAttribute("placeholder", c);
return this;
};
u.redraw = function() {
var c = this.p;
c && c.resize && c.resize();
};
u = null;
return w;
}({}, J, L));
B.register("$50", function(w, u, C) {
function x(d) {
const h = u.console;
h && h.error && h.error(d);
}
function r(d) {
const h = C.createElement("div");
d && h.setAttribute("class", d);
return h;
}
function t(d) {
return function() {
d.resize();
return this;
};
}
function c(d) {
return function(h) {
let e = h.target, n = e.$index;
for (;null == n && "DIV" !== e.nodeName && (e = e.parentElement); ) n = e.$index;
null != n && (h.stopImmediatePropagation(), d.select(n));
return !0;
};
}
function a(d) {
return function() {
d.redrawDirty() && d.redraw();
return !0;
};
}
function m(d) {
return function(h) {
var e = h.keyCode;
if (40 === e) e = 1; else if (38 === e) e = -1; else return !0;
if (h.shiftKey || h.ctrlKey || h.metaKey || h.altKey) return !0;
d.selectNext(e);
h.stopPropagation();
h.preventDefault();
return !1;
};
}
function g(d, h, e) {
function n(q) {
x("row[" + q + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(q) {
const v = h || 0, y = e ? -1 : 1, z = d.rows || [];
q.sort(function(D, F) {
return y * (z[D] || n(D)).cellVal(v).localeCompare((z[F] || n(F)).cellVal(v));
});
};
}
function l(d) {
this.w = d;
}
function p(d) {
this.t = d;
this.length = 0;
}
function k(d, h, e) {
let n = C.createElement("div");
n.className = e || "";
this._ = n;
this.d = h || [];
this.i = d || 0;
this.length = h.length;
}
function b(d) {
this.live = d;
this.rows = [];
}
w.create = function(d) {
return new l(d);
};
var f = l.prototype;
f.init = function(d) {
let h = this.w, e = h.id;
var n = h.splity(e + "-thead", e + "-tbody"), q = n[0];
n = n[1];
let v = [], y = [], z = [], D = [];
if (d) this.ds = d, this.idxs = y, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
q.css.push("wg-thead");
n.css.push("wg-tbody");
d.eachCol(function(O, S, I) {
z[O] = e + "-col-" + S;
D[O] = I || S;
});
var F = r();
let E = -1, G = z.length, H = r("wg-cols"), N = q.splitx.apply(q, z);
for (;++E < G; ) N[E].header(D[E]), H.appendChild(F.cloneNode(!1)).setAttribute("for", z[E]);
d.eachRow(function(O, S, I) {
v[O] = new k(O, S, I);
y[O] = O;
});
this.rows = v;
this.cols = H;
this.ww = null;
this.root = F = n.body;
this.head = q;
q.redraw = t(this);
q = n.fixed = N[0].bodyY() || 20;
h.lock().resize(q, n);
h.css.push("is-table");
h.restyle();
this.sc ? this._re_sort(G) : d.sort && d.sort(y);
this.redrawDirty();
this.render();
A(F).attr("tabindex", "-1").on("keydown", m(this)).on("mousedown", c(this)).on("scroll", a(this));
return this;
};
f.clear = function() {
const d = this.pages || [];
let h = d.length;
for (;0 !== h--; ) d[h].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
f.render = function() {
let d, h = [], e = this.rows || [], n = -1, q, v = this.idxs, y = v.length, z = this.idxr = {}, D = this.r, F = this._r, E = this.root, G = this.cols;
for (;++n < y; ) {
if (0 === n % 100) {
var H = G.cloneNode(!0);
d = new b(H);
d.h = 2200;
d.insert(E);
h.push(d);
}
q = v[n];
z[q] = n;
H = e[q];
if (null == H) throw Error("Render error, no data at [" + q + "]");
H.page = d;
d.rows.push(H);
}
d && 100 !== d.size() && d.sleepH(22);
this.pages = h;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == D ? null != F && (H = e[F]) && H.page && (delete this._r, this.select(F, !0)) : (H = e[D]) && H.page ? this.select(D, !0) : (this.deselect(), 
this._r = D);
return this;
};
f.resize = function() {
let d = -1, h = this.ww || (this.ww = []);
var e = this.w;
let n = e.cells[0], q = n.body.childNodes, v = q.length, y = this.pages || [], z = y.length;
for (e.redraw.call(n); ++d < v; ) h[d] = q[d].style.width;
if (z) {
e = this.mx;
for (d = this.mn; d <= e; d++) y[d].widths(h);
this.redrawDirty() && this.redraw();
}
};
f.redrawDirty = function() {
let d = !1;
var h = this.root;
const e = h.scrollTop;
h = h.clientHeight;
this.sy !== e && (d = !0, this.sy = e);
this.vh !== h && (d = !0, this.vh = h);
return d;
};
f.redraw = function() {
let d = 0, h = -1, e = null, n = null, q = this.ww;
var v = this.sy;
let y = this.mn, z = this.mx, D = Math.max(0, v - 100);
v = this.vh + v + 100;
let F, E = this.pages || [], G = E.length;
for (;++h < G && !(d > v); ) F = E[h], d += F.height(), d < D || (null === e && (e = h), 
n = h, F.rendered || F.render(q));
if (y !== e) {
if (null !== y && e > y) for (h = y; h < e; h++) {
F = E[h];
if (!F) throw Error("Shit!");
F.rendered && F.sleep();
}
this.mn = e;
}
if (z !== n) {
if (null !== z && n < z) for (h = z; h > n; h--) F = E[h], F.rendered && F.sleep();
this.mx = n;
}
};
f.selected = function() {
return this.r;
};
f.thead = function() {
return this.w.cells[0];
};
f.tbody = function() {
return this.w.cells[1];
};
f.tr = function(d) {
return (d = this.row(d)) ? d.cells() : [];
};
f.row = function(d) {
return this.rows[d];
};
f.td = function(d, h) {
return this.tr(d)[h];
};
f.next = function(d, h, e) {
null == e && (e = this.r || 0);
const n = this.idxs, q = n.length;
let v = e = (this.idxr || {})[e];
for (;e !== (v += d) && !(0 <= v && q > v); ) if (h && q) v = 1 === d ? -1 : q, 
h = !1; else return null;
e = n[v];
return null == e || null == this.rows[e] ? (x("Bad next: [" + v + "] does not map to data row"), 
null) : e;
};
f.selectNext = function(d, h, e) {
d = this.next(d, h);
null != d && this.r !== d && this.select(d, e);
return this;
};
f.deselect = function(d) {
const h = this.r;
null != h && (this.r = null, A(this.tr(h)).removeClass("selected"), this.w.fire("wgRowDeselect", [ h, d ]));
return this;
};
f.selectRow = function(d, h) {
return this.select(this.idxs[d], h);
};
f.select = function(d, h) {
const e = this.rows[d];
var n = e && e.page;
if (!n) return this.deselect(!1), x("Row is filtered out"), this;
this.deselect(!0);
let q, v = this.w.cells[1];
n.rendered || (q = n.top(), v.scrollY(q), this.redrawDirty() && this.redraw());
if (!e.rendered) return n.rendered || x("Failed to render page"), x("Row [" + e.i + "] not rendered"), 
this;
n = e.cells();
A(n).addClass("selected");
this.r = d;
h || (q = v.scrollY(), A(this.root).focus(), q !== v.scrollY() && v.scrollY(q));
v.scrollTo(n[0], !0);
this.w.fire("wgRowSelect", [ d, e.data() ]);
return this;
};
f.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
f.filter = function(d) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(d);
return this.clear().render();
};
f.each = function(d) {
let h, e = -1;
const n = this.rows || [], q = this.idxs || [], v = q.length;
for (;++e < v; ) h = q[e], d(n[h], e, h);
return this;
};
f.sortable = function(d) {
const h = this.sc || (this.sc = new p(this));
h.has(d) || h.add(d);
return this;
};
f._re_sort = function(d) {
let h = -1, e = this.sc, n = e.active;
for (this.sc = e = new p(this); ++h < d; ) e.add(h);
n && (h = this.head.indexOf(n.id), -1 === h && (h = Math.min(n.idx, d - 1)), this.sort(h, n.desc));
return this;
};
f._sort = function(d, h) {
h ? (this.s = h, h(d)) : (h = this.s) && h(d);
return d;
};
f.sort = function(d, h) {
this._sort(this.idxs, g(this, d, h));
this.sc.activate(d, h);
return this;
};
f = null;
f = p.prototype;
f.has = function(d) {
return null != this[d];
};
f.add = function(d) {
const h = this, e = h.t.head.cells[d];
h[d] = {
desc: null,
idx: d,
id: e.id
};
h.length++;
e.addClass("wg-sortable").on("click", function(n) {
if ("header" === n.target.nodeName.toLowerCase()) return n.stopImmediatePropagation(), 
h.toggle(d), !1;
});
return h;
};
f.toggle = function(d) {
this.t.sort(d, !this[d].desc).clear().render();
return this;
};
f.activate = function(d, h) {
let e, n = this.active, q = this[d], v = this.t.head.cells;
n && (e = v[n.idx]) && (e.removeClass(n.css), n !== q && e.restyle());
(e = v[d]) ? (q.desc = h, this.active = q, d = "wg-" + (h ? "desc" : "asc"), e.addClass(d).restyle(), 
q.css = d) : this.active = null;
return this;
};
f = null;
f = k.prototype;
f.render = function(d) {
let h, e = [], n = this._, q = this.length;
if (n) {
for (this.c = e; 0 !== q--; ) h = n.cloneNode(!1), e[q] = this.update(q, h), h.$index = this.i, 
d[q].appendChild(h);
this._ = null;
} else for (e = this.c; 0 !== q--; ) d[q].appendChild(e[q]);
this.rendered = !0;
return this;
};
f.update = function(d, h) {
h = h || this.c[d] || {};
d = (this.d[d] || function() {})() || " ";
null == d.innerHTML ? h.textContent = d : h.innerHTML = d.innerHTML;
return h;
};
f.cells = function() {
return this.c || [ this._ ];
};
f.data = function() {
let d = -1;
const h = [], e = this.length;
for (;++d < e; ) h[d] = this.cellVal(d);
return h;
};
f.destroy = function() {
this.page = null;
this.rendered = !1;
};
f.cellVal = function(d) {
d = this.d[d]() || "";
return String(d.textContent || d);
};
f = null;
f = b.prototype;
f.size = function() {
return this.rows.length;
};
f.insert = function(d) {
const h = this.h, e = r("wg-dead");
e.style.height = String(h) + "px";
d.appendChild(e);
return this.dead = e;
};
f.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
f.height = function() {
let d = this.h;
null == d && (this.h = d = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
d || x("row has zero height");
return d;
};
f.render = function(d) {
let h, e = -1, n = this.rows, q = n.length;
const v = this.dead, y = this.live, z = y.childNodes;
for (;++e < q; ) h = n[e], h.rendered || h.render(z);
q = d.length;
for (e = 0; e < q; e++) z[e].style.width = d[e];
v.parentNode.replaceChild(y, v);
this.rendered = !0;
this.h = null;
return this;
};
f.sleep = function() {
const d = this.height(), h = this.live, e = this.dead;
e.style.height = String(d) + "px";
h.parentNode.replaceChild(e, h);
this.rendered = !1;
this.h = d;
return this;
};
f.sleepH = function(d) {
d *= this.rows.length;
const h = this.dead;
h && (h.style.height = String(d) + "px");
this.rendered || (this.h = d);
return this;
};
f.widths = function(d) {
const h = this.live.childNodes;
let e = d.length;
for (;0 !== e--; ) h[e].style.width = d[e];
return this;
};
f.destroy = function() {
var d = this.rendered ? this.live : this.dead;
const h = this.rows;
d.parentNode.removeChild(d);
for (d = h.length; 0 !== d--; ) h[d].destroy();
};
f = null;
return w;
}({}, J, L));
B.register("$45", function(w, u, C) {
function x(e, n) {
var q = e.id;
let v = q && f[q], y = v && v.parent();
if (!v || !y) return null;
var z = 1 === y.dir;
q = z ? "X" : "Y";
let D = "page" + q;
z = z ? b : k;
let F = z(y.el);
q = n["offset" + q];
let E = y.el, G = E.className;
null == q && (q = n[D] - z(e));
q && (F += q);
E.className = G + " is-resizing";
return {
done: function() {
E.className = G;
},
move: function(H) {
y.resize(H[D] - F, v);
return !0;
}
};
}
function r(e) {
function n() {
A(C).off("mousemove", q);
h && (h.done(), h = null);
return !0;
}
function q(v) {
h ? h.move(v) : n();
return !0;
}
if (h) return !0;
h = x(e.target, e);
if (!h) return !0;
A(C).one("mouseup", n).on("mousemove", q);
return c(e);
}
function t(e, n) {
const q = n.type;
"touchmove" === q ? h && h.move(n) : "touchstart" === q ? h = x(e.target, n) : "touchend" === q && h && (h.done(), 
h = null);
}
function c(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function a(e) {
d && d.redraw();
e && e.redraw();
return d = e;
}
function m(e, n) {
const q = A(n);
q.on("editFocus", function() {
q.trigger("wgFocus", [ a(e) ]);
}).on("editBlur", function() {
q.trigger("wgBlur", [ a(null) ]);
});
}
function g(e) {
const n = e.id, q = e.className;
this.id = n;
this.el = e;
this.pos = this.index = 0;
this.css = [ q || "wg-root", "wg-cell" ];
this._cn = q;
f[n] = this;
this.clear();
}
const l = B.include("$47", "html.js") || B.include("$2", "html.js", !0), p = B.require("$27", "dom.js"), k = p.top, b = p.left, f = {};
let d, h = !1;
w.init = function(e) {
const n = new g(e);
n.redraw();
B.require("$48", "touch.js").ok(function(q) {
q.dragger(e, t);
});
A(e).on("mousedown", r);
return n;
};
u = g.prototype;
u.fire = function(e, n) {
e = A.Event(e);
e.cell = this;
A(this.el).trigger(e, n);
return this;
};
u.each = function(e) {
let n = -1;
const q = this.cells, v = q.length;
for (;++n < v; ) e(q[n], n);
return this;
};
u.indexOf = function(e) {
return (e = f[e.id || String(e)]) && e.pid === this.id ? e.index : -1;
};
u.on = function() {
return this.$("on", arguments);
};
u.off = function() {
return this.$("off", arguments);
};
u.find = function(e) {
return A(this.el).find(e);
};
u.$ = function(e, n) {
A.fn[e].apply(A(this.el), n);
return this;
};
u.addClass = function(e) {
this.css.push(e);
return this;
};
u.removeClass = function(e) {
e = this.css.indexOf(e);
-1 !== e && this.css.splice(e, 1);
return this;
};
u.parent = function() {
return this.pid && f[this.pid];
};
u.splitx = function() {
return this._split(1, arguments);
};
u.splity = function() {
return this._split(2, arguments);
};
u._split = function(e, n) {
(this.length || this.field) && this.clear();
let q = -1;
let v = n.length, y = 1 / v, z = 0;
for (;++q < v; ) {
var D = p.el();
this.body.appendChild(D);
var F = D;
{
var E = n[q];
let G = 1, H = E;
for (;f[E]; ) E = H + "-" + ++G;
}
F.id = E;
D = new g(D);
D.index = q;
D.pid = this.id;
D._locale(this.lang, this.rtl);
D.pos = z;
z += y;
this.cells.push(D);
this.length++;
}
this.dir = e;
this.redraw();
return this.cells;
};
u.destroy = function() {
this.clear();
delete f[this.id];
const e = this.el;
e.innerHTML = "";
this.body = null;
e.className = this._cn || "";
A(e).off();
return this;
};
u.exists = function() {
return this === f[this.id];
};
u.clear = function() {
const e = this.el, n = this.cells, q = this.field, v = this.body, y = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete f[n[z].destroy().id];
this.cells = [];
this.length = 0;
y && (e.removeChild(y), this.nav = null);
v && (q && (q.destroy(), this.field = null), this.table && (this.table = null), 
e === v.parentNode && e.removeChild(v));
this.body = e.appendChild(p.el("", "wg-body"));
this._h = null;
return this;
};
u.resize = function(e, n) {
if (!n && (n = this.cells[1], !n)) return;
var q = n.index;
let v = this.cells, y = A(this.el)[1 === this.dir ? "width" : "height"](), z = v[q + 1];
q = v[q - 1];
n.pos = Math.min((z ? z.pos * y : y) - ((n.body || n.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * y : 0, e)) / y;
this.redraw();
return this;
};
u.distribute = function(e) {
let n = -1, q = 0, v;
const y = this.cells, z = e.length;
for (;++n < z && (v = y[++q]); ) v.pos = Math.max(0, Math.min(1, e[n]));
this.redraw();
return this;
};
u.distribution = function() {
let e = [], n = 0;
const q = this.cells, v = q.length - 1;
for (;n < v; ) e[n] = q[++n].pos;
return e;
};
u.restyle = function() {
let e = this.css.concat();
0 === this.index ? e.push("first") : e.push("not-first");
this.dir && (e.push("wg-split"), 2 === this.dir ? e.push("wg-split-y") : e.push("wg-split-x"));
this.t && e.push("has-title");
this.nav && e.push("has-nav");
this.field && (e.push("is-field"), this.field.editable() ? e.push("is-editable") : e.push("is-readonly"));
e = e.join(" ");
e !== this._css && (this._css = e, this.el.className = e);
return this;
};
u.redraw = function(e) {
this.restyle();
const n = this.el;
var q = this.body, v = this.field;
if (q) {
var y = n.clientWidth || 0, z = n.clientHeight || 0, D = q.offsetTop || 0;
z = D > z ? 0 : z - D;
if (this._h !== z) {
this._h = z;
q.style.height = String(z) + "px";
var F = v;
}
this._w !== y && (this._w = y, F = v);
F && F.redraw();
}
q = this.length;
y = 1;
z = this.nav;
for (D = 2 === this.dir ? "height" : "width"; 0 !== q--; ) v = this.cells[q], z ? F = 1 : (v.fixed && (v.pos = v.fixed / A(n)[D]()), 
F = y - v.pos, y = v.pos), v.el.style[D] = String(100 * F) + "%", v.redraw(e);
return this;
};
u.contents = function(e, n) {
const q = this.el;
let v = this.body;
if (null == e) return v.innerHTML;
this.length ? this.clear() : v && (q.removeChild(v), v = null);
v || (this.body = v = q.appendChild(p.el("", n || "wg-content")), this._h = null, 
(n = this.lang) && this._locale(n, this.rtl, !0));
"string" === typeof e ? A(v)._html(e) : e && this.append(e);
this.redraw();
return this;
};
u.textarea = function(e, n) {
let q = this.field;
if (q) {
var v = q.editable();
q.reload(e, n);
v !== n && this.restyle();
} else this.length && this.clear(), v = p.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.value = e, this.contents(v), q = B.require("$49", "field.js")._new(v)[n ? "enable" : "disable"](), 
m(this, v), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
u.locale = function(e) {
e = B.require("$43", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
u._locale = function(e, n, q) {
const v = this.body;
if (q || e !== this.lang) this.lang = e, v && v.setAttribute("lang", e);
if (q || n !== this.rtl) this.rtl = n, v && v.setAttribute("dir", n ? "RTL" : "LTR");
return this;
};
u.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
let n = this.cells, q = n.length, v = this.navigated();
if (null != v) return n[v].editable();
for (;++v < q; ) if (e = n[v].editable()) return e;
};
u.eachTextarea = function(e) {
const n = this.field;
n ? e(n) : this.each(function(q) {
q.eachTextarea(e);
});
return this;
};
u.append = function(e) {
e && (e.nodeType ? l.init(this.body.appendChild(e)) : l.init(A(e).appendTo(this.body)));
return this;
};
u.prepend = function(e) {
const n = this.body;
if (e.nodeType) {
const q = n.firstChild;
l.init(q ? n.insertBefore(e, q) : n.appendChild(e));
} else l.init(A(e).prependTo(n));
return this;
};
u.before = function(e) {
const n = this.body;
e.nodeType ? l.init(this.el.insertBefore(e, n)) : l.init(A(e).insertBefore(n));
return this;
};
u.header = function(e, n) {
if (null == e && null == n) return this.el.getElementsByTagName("header")[0];
this.t = p.txt(e || "");
this.el.insertBefore(p.el("header", n), this.body).appendChild(this.t);
this.redraw();
return this;
};
u.toolbar = function() {
const e = this.header(), n = e.getElementsByTagName("nav");
return 0 === n.length ? e.appendChild(p.el("nav")) : n[0];
};
u.title = function(e) {
const n = this.t;
if (n) return n.nodeValue = e || "", n;
this.header(e);
return this.t;
};
u.titled = function() {
return this.t && this.t.nodeValue;
};
u.bodyY = function() {
return k(this.body, this.el);
};
u.scrollY = function(e) {
if (ka === e) return this.body.scrollTop;
this.body.scrollTop = e;
};
u.tabulate = function(e) {
let n = this.table;
n ? n.clear() : n = B.require("$50", "wgtable.js").create(this);
n.init(e);
return this.table = n;
};
u.lock = function() {
this.body.className += " locked";
return this;
};
u.scrollTo = function(e, n) {
let q = this.body;
var v = q.scrollTop;
let y = k(e, q);
if (v > y) v = y; else {
const z = q.clientHeight;
e = y + A(e).outerHeight();
if (z + v < e) v = e - z; else return;
}
n ? q.scrollTop = v : A(q).stop(!0).animate({
scrollTop: v
}, 250);
};
u.navigize = function(e, n) {
function q(G) {
const H = z[G], N = y[G], O = A(H.el).show();
N.addClass("active");
F = G;
E.data("idx", G);
H.fire("wgTabSelect", [ G ]);
return O;
}
const v = this, y = [], z = v.cells;
let D = v.nav, F;
D && v.el.removeChild(D);
D = v.nav = v.el.insertBefore(p.el("nav", "wg-tabs"), v.body);
const E = A(D).on("click", function(G) {
const H = A(G.target).data("idx");
if (null == H) return !0;
if (null != F) {
{
const N = y[F];
A(z[F].el).hide();
N.removeClass("active");
}
}
q(H);
v.redraw();
return c(G);
});
null == n && (n = E.data("idx") || 0);
v.each(function(G, H) {
y[H] = A('<a href="#' + G.id + '"></a>').data("idx", H).text(e[H]).appendTo(E);
G.pos = 0;
A(G.el).hide();
});
q(z[n] ? n : 0);
v.lock();
v.redraw();
return v;
};
u.navigated = function() {
const e = this.nav;
if (e) return A(e).data("idx");
};
u = null;
return w;
}({}, J, L));
B.register("$30", function(w, u, C) {
function x(b) {
const f = [];
b && (b.saved() || f.push("po-unsaved"), b.fuzzy() ? f.push("po-fuzzy") : b.flagged() && f.push("po-flagged"), 
b.valid() || f.push("po-error"), b.translation() || f.push("po-empty"), b.comment() && f.push("po-comment"));
return f.join(" ");
}
function r(b, f, d) {
f = A(b.title(f).parentNode);
let h = f.find("span.lang");
d ? (d = B.require("$43", "locale.js").cast(d), h.length || (h = A("<span></span>").prependTo(f)), 
h.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (h.remove(), 
d = "en");
b.locale(d);
return f;
}
function t(b, f, d) {
f.on("click", function(h) {
const e = b.fire(d, [ h.target ]);
e || h.preventDefault();
return e;
});
}
function c() {
this.dirty = 0;
}
B.require("$3", "number.js");
const a = B.require("$42", "string.js").html, m = B.require("$6", "string.js").sprintf;
let g, l;
w.extend = function(b) {
return b.prototype = new c();
};
w.localise = function(b) {
l = b;
return w;
};
const p = function() {
const b = C.createElement("p"), f = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
b.innerHTML = d.replace(f, "data-x-loco-$1=");
const h = b.textContent.trim();
return h ? h.replace("data-x-loco-", "") : d.trim();
};
}();
let k = c.prototype = B.require("$44", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
k.init = function() {
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
k.t = function() {
return this.$t || l || B.require("$1", "t.js").init();
};
k.localise = function(b) {
b || (b = this.t());
const f = [];
f[0] = b._x("Source text", "Editor") + ":";
f[3] = b._x("%s translation", "Editor") + ":";
f[4] = b._x("Context", "Editor") + ":";
f[5] = b._x("Comments", "Editor") + ":";
f[1] = b._x("Single", "Editor") + ":";
f[2] = b._x("Plural", "Editor") + ":";
f[6] = b._x("Untranslated", "Editor");
f[7] = b._x("Translated", "Editor");
f[8] = b._x("Toggle Fuzzy", "Editor");
f[9] = b._x("Suggest translation", "Editor");
this.labels = f;
this.$t = b;
return this;
};
k.setRootCell = function(b) {
function f(h) {
d.redraw(!0, h);
return !0;
}
const d = B.require("$45", "wingrid.js").init(b);
A(u).on("resize", f);
this.redraw = f;
A(b).on("wgFocus wgBlur", function(h, e) {
h.stopPropagation();
g = e;
});
this.destroy = function() {
d.destroy();
A(u).off("resize", f);
};
this.rootDiv = b;
return d;
};
k.$ = function() {
return A(this.rootDiv);
};
k.setListCell = function(b) {
const f = this;
f.listCell = b;
b.on("wgRowSelect", function(d, h) {
f.loadMessage(f.po.row(h));
return !0;
}).on("wgRowDeselect", function(d, h, e) {
e || f.loadNothing();
return !0;
});
};
k.setSourceCell = function(b) {
this.sourceCell = b;
};
k.setTargetCell = function(b) {
this.targetCell = b;
};
k.next = function(b, f, d) {
const h = this.listTable, e = this.po;
let n = h.selected(), q = n, v;
for (;null != (n = h.next(b, d, n)); ) {
if (q === n) {
n = null;
break;
}
if (f && (v = e.row(n), v.translated(0))) continue;
break;
}
null != n && h.select(n, !0);
return n;
};
k.select = function(b) {
this.listTable.select(b);
this.focus();
};
k.current = function(b) {
const f = this.active;
if (null == b) return f;
b ? b.is(f) ? (this.reloadMessage(b), this.focus()) : (this.loadMessage(b), b = this.po.indexOf(b), 
-1 !== b && this.select(b)) : this.unloadActive();
return this;
};
k.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
k.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
k.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
k.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
k.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
k.searchable = function(b) {
b && (this.dict = b, this.po && this.rebuildSearch());
return this.dict && !0;
};
k.rebuildSearch = function() {
const b = this.po.rows, f = b.length, d = this.dict;
d.clear();
let h = -1;
for (;++h < f; ) d.add(h, b[h].toText());
};
k.filtered = function() {
return this.lastSearch || "";
};
k.filter = function(b, f) {
const d = this.listTable;
let h, e = this.lastFound, n = this.lastSearch;
if (b) {
if (n === b) return e || 0;
if (n && !e && 0 === b.indexOf(n)) return 0;
h = this.dict.find(b);
}
this.lastSearch = n = b;
this.lastFound = e = h ? h.length : this.po.length;
h ? d.filter(h) : d.unfilter();
f || this.fire("poFilter", [ n, e ]);
return e;
};
k.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
k.unsave = function(b, f) {
let d = !1;
if (b) {
if (d = b.saved(f)) this.dirty++, b.unsave(f), this.fire("poUnsaved", [ b, f ]);
this.markUnsaved(b);
}
return d;
};
k.markUnsaved = function(b) {
var f = this.po.indexOf(b);
if ((f = this.listTable.tr(f)) && f.length) {
const d = f[0].className;
b = d.replace(/(?:^| +)po-[a-z]+/g, "") + " " + x(b);
b !== d && A(f).attr("class", b);
}
};
k.save = function(b) {
const f = this.po;
if (this.dirty || b) f.each(function(d, h) {
h.save();
}), this.listCell.find("div.po-unsaved").removeClass("po-unsaved"), this.dirty = 0, 
this.fire("poSave", []);
return f;
};
k.fire = function(b, f) {
const d = this.handle;
if (d && d[b] && !1 === d[b].apply(this, f || [])) return !1;
b = A.Event(b);
this.$().trigger(b, f);
return !b.isDefaultPrevented();
};
k.on = function(b, f) {
this.$().on(b, f);
return this;
};
k.getSorter = function() {
return null;
};
k.reload = function() {
const b = this;
var f = b.listCell;
const d = b.po;
var h = d && d.locale();
const e = h && h.isRTL(), n = d && d.length || 0;
if (!d || !d.row) return f && f.clear().header("Error").contents("Invalid messages list"), 
!1;
b.targetLocale = h;
b.lastSearch && (b.lastSearch = "", b.lastFound = n, b.fire("poFilter", [ "", n ]));
let q = (h = b.listTable) && h.thead().distribution(), v = [];
b.listTable = h = f.tabulate({
eachCol: function(y) {
const z = b.getListColumns(), D = b.getListHeadings();
for (const F in z) {
const E = z[F];
y(E, F, D[E]);
}
},
eachRow: function(y) {
d.each(function(z, D) {
b.validate(D) && v.push(D);
y(D.idx, b.getListEntry(D), x(D));
});
},
sort: b.getSorter()
});
f = b.getListColumns();
for (const y in f) h.sortable(f[y]);
q && h.thead().distribute(q);
h.tbody().$(e ? "addClass" : "removeClass", [ "is-rtl" ]);
b.invalid = v.length ? v : null;
return !!n;
};
k.load = function(b, f) {
this.po = b;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== f ? this.listTable.selectRow(f || 0) : this.active && this.unloadActive());
};
k.pasteMessage = function(b) {
let f, d = 0;
this.validate(b);
this.active === b && ((f = this.sourceCell) && f.eachTextarea(function(h) {
h.val(b.source(null, d++));
}), (f = this.contextCell) && f.eachTextarea(function(h) {
h.val(b.context());
}), f = this.targetCell) && (d = 0, f.eachTextarea(function(h) {
h.val(b.translation(d++));
}));
this.updateListCell(b, "source");
this.updateListCell(b, "target");
return this;
};
k.reloadMessage = function(b) {
const f = this.sourceCell, d = this.targetCell;
this.pasteMessage(b);
f && this.setSrcMeta(b, f) && f.redraw();
if (d) {
var h = d.navigated() || 0;
h = this.setTrgMeta(b, h, d);
!f && this.setSrcMeta(b, d) && (h = !0);
h && (d.redraw(), this.markUnsaved(b));
}
return this;
};
k.setStatus = function() {
return null;
};
k.setSrcMeta = function(b, f) {
const d = [];
var h = this.labels;
let e = !1, n = this.$smeta;
var q = b.context();
let v = [], y = b.tags(), z = y && y.length;
q && (v.push("<span>" + a(h[4]) + "</span>"), v.push('<mark class="ctxt">' + a(q) + "</mark>"));
if (z && this.getTag) for (v.push("<span>Tagged:</span>"), h = -1; ++h < z; ) (q = this.getTag(y[h])) && v.push("<mark>" + a(q.mod_name) + "</mark>");
v.length && d.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (q = b.refs()) && (y = q.split(/\s/), z = y.length)) {
for (v = []; 0 <= --z; ) q = y[z], v.push("<code>" + a(q) + "</code>");
d.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(q = b.notes()) && d.push('<p class="has-icon icon-info">' + a(q, !0) + "</p>");
d.length ? (n || (n = f.find("div.meta"), n.length || (n = A('<div class="meta"></div>').insertAfter(f.header())), 
t(this, n, "poMeta"), this.$smeta = n), n.html(d.join("\n")).show(), e = !0) : n && n.text() && (n.text("").hide(), 
e = !0);
return e;
};
k.setTrgMeta = function(b, f, d) {
const h = [];
f = (b = b.errors(f)) && b.length;
var e = !1;
let n = this.$tmeta;
if (f) {
for (e = 0; e < f; e++) h.push('<p class="has-icon icon-warn">' + a(b[e], !0) + ".</p>");
n || (n = d.find("div.meta"), n.length || (n = A('<div class="meta"></div>').insertAfter(d.header())), 
this.$tmeta = n);
n.html(h.join("\n")).show();
e = !0;
} else n && n.text() && (n.text("").hide(), e = !0);
return e;
};
k.loadMessage = function(b) {
function f(M) {
if ("=" === M.charAt(0)) {
const K = M.split(" ");
M = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(M)] || M;
M = K.join(" ");
}
return M;
}
function d(M, K) {
const T = Q;
var P = ba[0];
M.off();
M.titled() !== P && r(M, P, K || "en");
P = !1;
y.setSrcMeta(b, M) && (P = !0);
if (b.plural()) {
P = -1;
let R = [], W = [];
const X = M.id + "-";
K = b.sourceForms() || K && K.plurals || [ "One", "Other" ];
const ca = K.length;
if (2 !== ca || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < ca; ) R[P] = X + String(P), 
W[P] = f(K[P].split(" ", 1)[0]) + ":"; else R = [ X + "-0", X + "-1" ], W = [ ba[1], ba[2] ];
M.splity.apply(M, R);
M.each(function(da, V) {
da.header(W[V]).textarea(b.source(null, V), T).setStrf(E).setMode(Z).setInvs(D);
});
M.lock();
T && M.each(function(da, V) {
h(da, V);
});
} else P && M.redraw(), M.textarea(b.source(), T).setStrf(E).setMode(Z).setInvs(D), 
T && h(M, 0);
}
function h(M, K) {
M.on("changing", function(T, P) {
b.source(P, K);
0 === K && y.updateListCell(b, "source");
y.unsave(b, K);
}).on("changed", function() {
0 === K && y.po.reIndex(b);
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ b ]);
});
}
function e(M, K, T, P) {
I && K.eachTextarea(function(W) {
W.ping();
});
K.off();
var R = T.isKnown() && T.label || "Target";
R = m(ba[3], R);
K.titled() !== R && r(K, R, T);
R = !1;
!M && y.setSrcMeta(b, K) && (R = !0);
y.setTrgMeta(b, P, K) && (R = !0);
y.setStatus(b, P);
if (1 !== T.nplurals && b.pluralized()) {
M = function(V) {
X.push(f(da[V] || "Form " + V));
W.push(ca + String(V));
};
let W = [], X = [];
const ca = K.id + "-", da = b.targetForms() || T.plurals || [ "One", "Other" ];
R = da.length;
for (b.eachMsg(M); (T = W.length) < R; ) M(T);
K.splitx.apply(K, W);
K.each(function(V, aa) {
const la = I && !b.disabled(aa);
V.textarea(b.translation(aa), la).setStrf(E).setMode(Z).setInvs(D);
I && n(V, aa);
});
K.navigize(X, P || null).on("wgTabSelect", function(V, aa) {
(V = I && V.cell.editable()) && V.focus();
y.setTrgMeta(b, aa, K);
y.setStatus(b, aa);
y.fire("poTab", [ aa ]);
});
} else R && K.redraw(), K.textarea(b.translation(), I && !b.disabled(0)).setStrf(E).setMode(Z).setInvs(D), 
I && n(K, 0);
}
function n(M, K) {
function T() {
P = null;
y.validate(b);
const W = b.errors(K).join(" ");
R !== W && (R = W, y.setTrgMeta(b, K, M) && M.redraw(), y.markUnsaved(b));
}
let P, R = b.errors(K).join(" ");
M.on("changing", function(W, X, ca) {
P && (clearTimeout(P), P = null);
b.translate(X, K);
0 === K && y.updateListCell(b, "target");
b.fuzzy(K) ? y.fuzzy(!1, b, K) : y.unsave(b, K);
"" === X ? (y.fire("poEmpty", [ !0, b, K ]), y.setStatus(b, K)) : "" === ca && (y.fire("poEmpty", [ !1, b, K ]), 
y.setStatus(b, K));
P = setTimeout(T, R ? 300 : 1e3);
}).on("changed", function() {
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ b ]);
});
}
function q(M) {
M.off();
const K = ba[4];
M.titled() !== K && (r(M, K), y.setStatus(null));
M.textarea(b.context(), !0).setMode(Z).setInvs(D);
Y && M.on("changing", function(T, P) {
b.context(P);
y.updateListCell(b, "source");
y.unsave(b, ea);
}).on("changed", function() {
y.po.reIndex(b);
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ b ]);
});
}
function v(M) {
const K = ba[5];
M.titled() !== K && r(M, K);
M.off().on("changing", function(T, P) {
b.comment(P);
y.fire("poComment", [ b, P ]);
y.unsave(b, ea);
}).textarea(b.comment(), !0);
}
const y = this;
var z = b.isHTML();
const D = y.inv || !1, F = this.fmt || null, E = b.format() || null, G = b.is(y.active), H = y.sourceCell, N = y.targetCell, O = y.contextCell, S = y.commentCell, I = y.editable.target, Q = y.editable.source, Y = y.editable.context, ha = y.sourceLocale, ja = y.targetLocale, ba = y.labels;
let ea = 0, Z = y.mode, fa = g;
y.html !== z && (y.html = z, "code" !== y.mode && (Z = z ? "html" : "", y.setMode(Z)));
y.active = b;
H && d(H, ha);
O && q(O);
N && ja && (ea = N.navigated() || 0, e(H, N, ja, ea));
S && v(S);
fa && (fa.exists() || (fa = fa.parent()), (z = fa.editable()) && z.focus());
F !== E && (this.fmt = E);
G || y.fire("poSelected", [ b, ea ]);
};
k.unloadActive = function() {
function b(d) {
d && d.text("").hide();
}
function f(d) {
d && d.off().clear();
}
b(this.$smeta);
b(this.$tmeta);
f(this.sourceCell);
f(this.contextCell);
f(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
k.loadNothing = function() {
const b = this.t(), f = this.mode || "", d = this.inv || !1, h = this.fmt;
this.unloadActive();
this.setStatus(null);
let e = this.commentCell;
e && e.textarea("", !1);
if (e = this.sourceCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(d), e.title(b._x("Source text not loaded", "Editor") + ":");
if (e = this.contextCell) e.textarea("", !1).setMode(f).setInvs(d), e.title(b._x("Context not loaded", "Editor") + ":");
if (e = this.targetCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(d), e.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
k.updateListCell = function(b, f) {
f = this.getListColumns()[f];
b = this.po.indexOf(b);
(b = this.listTable.row(b)) && b.rendered && b.update(f);
};
k.cellText = function(b) {
return (b = -1 !== b.indexOf("<") || -1 !== b.indexOf("&") ? p(b) : b.trim()) || " ";
};
k.fuzzy = function(b, f, d) {
f = f || this.active;
const h = f.fuzzy(d);
!0 !== b || h ? !1 === b && h && this.flag(0, f, d) && this.fire("poFuzzy", [ f, !1, d ]) : this.flag(4, f, d) && this.fire("poFuzzy", [ f, !0, d ]);
return h;
};
k.flag = function(b, f, d) {
if (!f) {
f = this.active;
d = this.getTargetOffset();
if (null == d) return null;
d && f.targetForms() && (d = 0);
}
const h = f.flagged(d);
if (null == b) return h;
if (h === b || b && !f.translated(d) || !this.fire("poFlag", [ b, h, f, d ])) return !1;
f.flag(b, d);
this.fire("poUpdate", [ f ]) && this.unsave(f, d);
this.setStatus(f, d);
return !0;
};
k.add = function(b, f) {
let d, h = this.po.get(b, f);
h ? d = this.po.indexOf(h) : (d = this.po.length, h = this.po.add(b, f), this.load(this.po, -1), 
this.fire("poAdd", [ h ]), this.fire("poUpdate", [ h ]));
this.lastSearch && this.filter("");
this.listTable.select(d);
return h;
};
k.del = function(b) {
if (b = b || this.active) {
var f = this.lastSearch, d = this.po.del(b);
null != d && (this.unsave(b), this.fire("poDel", [ b ]), this.fire("poUpdate", [ b ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(b) && this.unloadActive(), 
this.po.length && (f && this.filter(f), this.active || (d = Math.min(d, this.po.length - 1), 
this.listTable.select(d))));
}
};
k.setMono = function(b) {
return this.setMode(b ? "code" : this.html ? "html" : "");
};
k.setMode = function(b) {
if (this.mode !== b) {
this.mode = b;
this.callTextareas(function(h) {
h.setMode(b);
});
const f = this.active, d = this.sourceCell;
f && f.refs() && d && this.setSrcMeta(f, d) && d.redraw();
}
return this;
};
k.getMono = function() {
return "code" === this.mode;
};
k.setInvs = function(b) {
(this.inv || !1) !== b && (this.inv = b, this.callTextareas(function(f) {
f.setInvs(b);
}), this.fire("poInvs", [ b ]));
return this;
};
k.getInvs = function() {
return this.inv || !1;
};
k.callTextareas = function(b) {
var f = this.targetCell;
f && f.eachTextarea(b);
(f = this.contextCell) && f.eachTextarea(b);
(f = this.sourceCell) && f.eachTextarea(b);
return this;
};
k.focus = function() {
const b = this.getTargetEditable();
b && b.focus();
return this;
};
k.validate = function(b) {
return 0;
};
k = null;
return w;
}({}, J, L));
B.register("$31", function(w, u, C) {
w.init = function() {
const x = /%([1-9]\d*\$)?[s%]/, r = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(t, c) {
const a = c && c.count || 0;
c = c && c.types || {};
let m = !0, g = 0, l = 0;
for (var p; null != (p = r.exec(t)); ) {
const k = p[2];
if ("%" !== k || "%%" !== p[0]) {
if ("" === k || -1 === "suxXbcdeEfFgGo".indexOf(k)) {
m = !1;
break;
}
null == p[1] ? p = ++l : (p = parseInt(p[1]), g = Math.max(g, p));
null == c[p] && (c[p] = {});
c[p][k] = !0;
}
}
if (m) return {
valid: !0,
count: Math.max(g, l, a),
types: c
};
r.lastIndex = 0;
return {
valid: !1,
count: 0,
types: {}
};
},
sniff: function(t) {
return x.test(t);
}
};
};
return w;
}({}, J, L));
B.register("$13", function(w, u, C) {
function x() {
this.init();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function r(g) {
g = A('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
B.require("$12", "tooltip.js").init(g);
return g;
}
function t(g) {
return r("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(l) {
l.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function c(g) {
return r("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(l) {
l.preventDefault();
g.fire("poHint");
});
}
function a(g, l) {
return B.require("$6", "string.js").vsprintf(g, l);
}
w.init = function(g) {
const l = new x();
g = l.setRootCell(g);
var p = g.splity("po-list", "po-edit");
let k = p[0], b = p[1];
p = b.splitx("po-trans", "po-comment");
var f = p[0];
let d = p[1].header("Loading..");
p = f.splity("po-source", "po-target");
f = p[0].header("Loading..");
p = p[1].header("Loading..");
g.distribute([ .34 ]);
b.distribute([ .8 ]);
l.setListCell(k);
l.setSourceCell(f);
l.setTargetCell(p);
l.commentCell = d;
l.editable.source = !1;
return l;
};
u = x.prototype = B.require("$30", "base.js").extend(x);
u.getListHeadings = function() {
const g = this.t(), l = [ g._x("Source text", "Editor") ];
this.targetLocale && (l[1] = g._x("Translation", "Editor"));
return l;
};
u.getListColumns = function() {
const g = {
source: 0
};
this.targetLocale && (g.target = 1);
return g;
};
u.getListEntry = function(g) {
const l = this.cellText, p = [ function() {
let k, b = l(g.source() || ""), f = g.context();
return f ? (k = C.createElement("p"), k.appendChild(C.createElement("mark")).innerText = f, 
k.appendChild(C.createTextNode(" " + b)), k) : b;
} ];
this.targetLocale && (p[1] = function() {
return l(g.translation() || "");
});
return p;
};
u.stats = function() {
let g = this.po, l = g.length, p = 0, k = 0, b = 0;
g.each(function(f, d) {
d.fuzzy() ? b++ : d.translated() ? p++ : k++;
});
return {
t: l,
p: p.percent(l) + "%",
f: b,
u: k
};
};
u.unlock = function() {
const g = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
g && (this._unlocked = g, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
u.lock = function() {
const g = this._unlocked;
g && (this.targetLocale = g, delete this._unlocked, this.po && this.po.lock(g), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, g ]), 
this.active && this.loadMessage(this.active));
};
u.locked = function() {
return !this._unlocked;
};
u.setStatus = function(g) {
let l = this.$tnav;
if (null == g) l && (l.remove(), this.$tnav = null); else {
l || (this.$tnav = l = A("<nav></nav>").append(t(this)).append(c(this)).appendTo(this.targetCell.header()));
var p = [];
g.translated() ? g.fuzzy() && p.push("po-fuzzy") : p.push("po-empty");
l.attr("class", p.join(" "));
}
};
u.getSorter = function() {
function g(k, b) {
const f = k.weight(), d = b.weight();
return f === d ? l(k, b) : f > d ? -1 : 1;
}
function l(k, b) {
return k.hash().localeCompare(b.hash());
}
const p = this;
return function(k) {
const b = p.po, f = p.locked() ? g : l;
k.sort(function(d, h) {
return f(b.row(d), b.row(h));
});
};
};
u.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const l = [];
let p = this.validateMessagePrintf(g, l);
p && (g.err = l);
return p;
};
u.validateMessagePrintf = function(g, l) {
const p = g.format();
if ("no-" === p.substring(0, 3)) return 0;
const k = g.msgid(), b = g.msgidPlural();
null == m && (m = B.require("$31", "printf.js").init());
var f = m;
if (!("" !== p || f.sniff(k) || "" !== b && f.sniff(b))) return 0;
let d = 0, h = f.parse(k);
b && h.valid && (h = f.parse(b, h));
if (!h.valid) return 0;
let e = h.count;
if (0 !== e || "" !== p) {
var n = this;
g.eachMsg(function(q, v) {
l[q] = [];
if ("" !== v) {
v = f.parse(v);
var y = v.count;
q = l[q];
if (v.valid) if (y > e) q.push(a(n.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ e ])), 
d++; else if (y < e && "" === b) q.push(a(n.t()._("Missing placeholders; source text formatting suggests at least %s"), [ e ])), 
d++; else {
y = h.types;
for (const z in v.types) for (const D in v.types[z]) if (null == y[z] || null == y[z][D]) {
q.push(n.t()._("Mismatching placeholder type; check against source text formatting"));
d++;
return;
}
} else q.push(n.t()._("Possible syntax error in string formatting")), d++;
}
});
return d;
}
};
u.handle = {};
let m;
return w;
}({}, J, L));
B.register("$14", function(w, u, C) {
const x = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, r = {
38: !0,
40: !0,
73: !0
}, t = {
66: function(c, a) {
if (c = a.current()) c.normalize(), a.focus().pasteMessage(c);
},
75: function(c, a) {
if (c = a.current()) c.untranslate(), a.focus().pasteMessage(c);
},
85: function(c, a) {
a.focus().fuzzy(!a.fuzzy());
},
13: function(c, a) {
a.getFirstEditable() && a.next(1, !0, !0);
},
40: function(c, a) {
c = c.shiftKey;
a.next(1, c, c);
},
38: function(c, a) {
c = c.shiftKey;
a.next(-1, c, c);
},
73: function(c, a) {
if (!c.shiftKey) return !1;
a.setInvs(!a.getInvs());
}
};
w.init = function(c, a) {
function m(l) {
if (l.isDefaultPrevented() || !l.metaKey && !l.ctrlKey) return !0;
const p = l.which;
if (!g[p]) return !0;
const k = t[p];
if (!k) throw console.log(g, t), Error("command undefined #" + p);
if (l.altKey || l.shiftKey && !r[p] || !1 === k(l, c)) return !0;
l.stopPropagation();
l.preventDefault();
return !1;
}
const g = {};
A(a || u).on("keydown", m);
return {
add: function(l, p) {
t[x[l]] = p;
return this;
},
enable: function() {
for (const l in arguments) g[x[arguments[l]]] = !0;
return this;
},
disable: function() {
A(a || u).off("keydown", m);
c = a = null;
for (const l in t) g[l] = !1;
}
};
};
return w;
}({}, J, L));
B.register("$32", function(w, u, C) {
function x() {
this.reIndex([]);
}
w.init = function() {
return new x();
};
u = x.prototype;
u.reIndex = function(r) {
const t = {}, c = r.length;
let a = -1;
for (;++a < c; ) t[r[a]] = a;
this.keys = r;
this.length = a;
this.ords = t;
};
u.key = function(r, t) {
if (null == t) return this.keys[r];
const c = this.keys[r], a = this.ords[t];
if (t !== c) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[r] = t;
delete this.ords[c];
this.ords[t] = r;
}
return r;
};
u.indexOf = function(r) {
r = this.ords[r];
return null == r ? -1 : r;
};
u.add = function(r, t) {
let c = this.ords[r];
null == c && (this.keys[this.length] = r, c = this.ords[r] = this.length++);
this[c] = t;
return c;
};
u.get = function(r) {
return this[this.ords[r]];
};
u.has = function(r) {
return null != this.ords[r];
};
u.del = function(r) {
this.cut(this.ords[r], 1);
};
u.cut = function(r, t) {
t = t || 1;
const c = [].splice.call(this, r, t);
this.keys.splice(r, t);
this.reIndex(this.keys);
return c;
};
u.each = function(r) {
const t = this.keys, c = this.length;
let a = -1;
for (;++a < c; ) r(t[a], this[a], a);
return this;
};
u.sort = function(r) {
const t = this.length, c = this.keys, a = this.ords, m = [];
let g = -1;
for (;++g < t; ) m[g] = [ this[g], c[g] ];
m.sort(function(p, k) {
return r(p[0], k[0]);
});
for (g = 0; g < t; g++) {
var l = m[g];
this[g] = l[0];
l = l[1];
c[g] = l;
a[l] = g;
}
return this;
};
u.join = function(r) {
return [].join.call(this, r);
};
return w;
}({}, J, L));
B.register("$33", function(w, u, C) {
function x(r, t) {
var c = new RegExp("^.{0," + (r - 1) + "}[" + t + "]"), a = new RegExp("^[^" + t + "]+");
return function(m, g) {
for (var l = m.length, p; l > r; ) {
p = c.exec(m) || a.exec(m);
if (null == p) break;
p = p[0];
g.push(p);
p = p.length;
l -= p;
m = m.substring(p);
}
0 !== l && g.push(m);
return g;
};
}
w.create = function(r) {
function t(k) {
return g[k] || "\\" + k;
}
var c = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, m = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == r || isNaN(r = Number(r))) r = 79;
if (0 < r) {
var l = x(r - 3, " ");
var p = x(r - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(k, b) {
if (!b) return k + ' ""';
b = b.replace(m, t);
var f = 0;
b = b.replace(c, function() {
f++;
return "\\n\n";
});
if (!(f || r && r < b.length + k.length + 3)) return k + ' "' + b + '"';
k = [ k + ' "' ];
b = b.split("\n");
if (p) for (var d = -1, h = b.length; ++d < h; ) p(b[d], k); else k = k.concat(b);
return k.join('"\n"') + '"';
},
prefix: function(k, b) {
k = k.split(c);
return b + k.join("\n" + b);
},
refs: function(k) {
k = k.replace(a, " ", k);
l && (k = l(k, []).join("\n#: "));
return "#: " + k;
}
};
};
return w;
}({}, J, L));
B.register("$46", function(w, u, C) {
function x() {
this.length = 0;
}
w.init = function() {
return new x();
};
u = x.prototype;
u.push = function(r) {
this[this.length++] = r;
return this;
};
u.sort = function(r) {
[].sort.call(this, r);
return this;
};
u.each = function(r) {
for (var t = -1, c = this.length; ++t < c; ) r(t, this[t]);
return this;
};
return w;
}({}, J, L));
B.register("$34", function(w, u, C) {
function x() {}
w.extend = function(r) {
return r.prototype = new x();
};
u = x.prototype = B.require("$44", "abstract.js").init([ "add", "load" ]);
u.row = function(r) {
return this.rows[r];
};
u.lock = function(r) {
return this.locale(r || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
u.unlock = function() {
const r = this.loc;
this.loc = null;
return r;
};
u.locale = function(r) {
null == r ? r = this.loc : this.loc = r = B.require("$43", "locale.js").cast(r);
return r;
};
u.each = function(r) {
this.rows.each(r);
return this;
};
u.indexOf = function(r) {
"object" !== typeof r && (r = this.get(r));
if (!r) return -1;
null == r.idx && (r.idx = this.rows.indexOf(r.hash()));
return r.idx;
};
u.get = function(r) {
return this.rows && this.rows.get(r);
};
u.has = function(r) {
return this.rows && this.rows.has(r);
};
u.del = function(r) {
r = this.indexOf(r);
if (-1 !== r) {
const t = this.rows.cut(r, 1);
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(c, a, m) {
a.idx = m;
}), r;
}
};
u.reIndex = function(r, t) {
const c = r.hash(), a = this.indexOf(r), m = this.rows.indexOf(c);
return m === a ? a : -1 !== m ? (t = (t || 0) + 1, r.source("Error, duplicate " + String(t) + ": " + r.source()), 
this.reIndex(r, t)) : this.rows.key(a, c);
};
u.sort = function(r) {
this.rows.sort(r);
return this;
};
u.export = function() {
const r = this.rows, t = r.length, c = B.require("$46", "list.js").init();
let a = -1;
for (;++a < t; ) c.push(r[a]);
return c;
};
return w;
}({}, J, L));
B.register("$35", function(w, u, C) {
function x(c, a, m) {
if (null == m) return c[a] || "";
c[a] = m || "";
return c;
}
function r() {
this._id = this.id = "";
}
function t(c, a) {
const m = c.length;
let g = -1;
for (;++g < m; ) a(g, c[g]);
}
w.extend = function(c) {
return c.prototype = new r();
};
u = r.prototype;
u.flag = function(c, a) {
const m = this.flg || (this.flg = []);
if (null != a) m[a] = c; else for (a = Math.max(m.length, this.src.length, this.msg.length); 0 !== a--; ) m[a] = c;
return this;
};
u.flagged = function(c) {
const a = this.flg || [];
if (null != c) return a[c] || 0;
for (c = a.length; 0 !== c--; ) if (a[c]) return !0;
return !1;
};
u.flags = function() {
const c = {}, a = [], m = this.flg || [];
let g = m.length;
for (;0 !== g--; ) {
const l = m[g];
c[l] || (c[l] = !0, a.push(l));
}
return a;
};
u.flaggedAs = function(c, a) {
const m = this.flg || [];
if (null != a) return c === m[a] || 0;
for (a = m.length; 0 !== a--; ) if (m[a] === c) return !0;
return !1;
};
u.fuzzy = function(c, a) {
const m = this.flaggedAs(4, c);
null != a && this.flag(a ? 4 : 0, c);
return m;
};
u.source = function(c, a) {
if (null == c) return this.src[a || 0] || "";
this.src[a || 0] = c;
return this;
};
u.plural = function(c, a) {
if (null == c) return this.src[a || 1] || "";
this.src[a || 1] = c || "";
return this;
};
u.sourceForms = function() {
return this.srcF;
};
u.targetForms = function() {
return this.msgF;
};
u.each = function(c) {
const a = this.src, m = this.msg, g = Math.max(a.length, m.length);
let l = -1;
for (;++l < g; ) c(l, a[l], m[l]);
return this;
};
u.eachSrc = function(c) {
t(this.src, c);
return this;
};
u.eachMsg = function(c) {
t(this.msg, c);
return this;
};
u.count = function() {
return Math.max(this.src.length, this.msg.length);
};
u.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
u.translate = function(c, a) {
this.msg[a || 0] = c || "";
return this;
};
u.untranslate = function(c) {
if (null != c) this.msg[c] = ""; else {
const a = this.msg, m = a.length;
for (c = 0; c < m; c++) a[c] = "";
}
return this;
};
u.translation = function(c) {
return this.msg[c || 0] || "";
};
u.errors = function(c) {
return this.err && this.err[c || 0] || [];
};
u.valid = function() {
return null == this.err;
};
u.translated = function(c) {
if (null != c) return !!this.msg[c];
const a = this.msg, m = a.length;
for (c = 0; c < m; c++) if (!a[c]) return !1;
return !0;
};
u.untranslated = function(c) {
if (null != c) return !this.msg[c];
const a = this.msg, m = a.length;
for (c = 0; c < m; c++) if (a[c]) return !1;
return !0;
};
u.comment = function(c) {
return x(this, "cmt", c);
};
u.notes = function(c) {
return x(this, "xcmt", c);
};
u.refs = function(c) {
return x(this, "rf", c);
};
u.format = function(c) {
return x(this, "fmt", c);
};
u.context = function(c) {
return x(this, "ctx", c);
};
u.tags = function() {
return this.tg;
};
u.toString = u.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
u.weight = function() {
let c = 0;
this.translation() || (c += 2);
this.fuzzy() && (c += 1);
return c;
};
u.equals = function(c) {
return this === c || this.hash() === c.hash();
};
u.hash = function() {
return this.id;
};
u.normalize = function() {
let c = this.msg.length;
for (;0 !== c--; ) this.msg[c] = this.src[c] || "";
};
u.disabled = function(c) {
return !!(this.lck || [])[c || 0];
};
u.disable = function(c) {
(this.lck || (this.lck = []))[c || 0] = !0;
return this;
};
u.saved = function(c) {
const a = this.drt;
if (null == a) return !0;
if (null != c) return !a[c];
for (c = a.length; 0 !== c--; ) if (a[c]) return !1;
return !0;
};
u.unsave = function(c) {
(this.drt || (this.drt = []))[c || 0] = !0;
return this;
};
u.save = function(c) {
null == c ? this.drt = null : (this.drt || (this.drt = []))[c] = !1;
return this;
};
u.is = function(c) {
return c && (c === this || c.idx === this.idx);
};
u.isHTML = function(c) {
if (null == c) return this.htm || !1;
this.htm = c;
};
u = null;
return w;
}({}, J, L));
B.register("$15", function(w, u, C) {
function x(g) {
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
function r(g, l) {
g = g || "";
l && (g += "\0" + l);
return g;
}
function t(g) {
const l = u.console;
l && l.error && l.error(g.message || String(g));
}
function c(g) {
return B.require("$33", "format.js").create(g);
}
function a(g) {
this.locale(g);
this.clear();
this.head = x(this.now());
}
function m(g, l) {
this.src = [ g || "" ];
this.msg = [ l || "" ];
}
w.create = function(g) {
return new a(g);
};
C = B.require("$34", "messages.js").extend(a);
C.clear = function() {
this.rows = B.require("$32", "collection.js").init();
this.length = 0;
return this;
};
C.now = function() {
function g(d, h) {
for (d = String(d); d.length < h; ) d = "0" + d;
return d;
}
var l = new Date();
const p = l.getUTCFullYear(), k = l.getUTCMonth() + 1, b = l.getUTCDate(), f = l.getUTCHours();
l = l.getUTCMinutes();
return g(p, 4) + "-" + g(k, 2) + "-" + g(b, 2) + " " + g(f, 2) + ":" + g(l, 2) + "+0000";
};
C.header = function(g, l) {
const p = this.head || (this.head = {});
if (null == l) return this.headers()[g] || "";
p[g] = l || "";
return this;
};
C.headers = function(g) {
const l = this.now(), p = this.head || (this.head = x(l));
if (null != g) {
for (b in g) p[b] = g[b];
return this;
}
const k = this.locale();
g = {};
for (b in p) g[b] = String(p[b]);
if (k) {
g.Language = String(k) || "zxx";
g["Language-Team"] = k.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (k.nplurals || "2") + "; plural=" + (k.pluraleq || "n!=1") + ";";
var b = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date";
g[b] || (g[b] = l);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
C.get = function(g, l) {
g = r(g, l);
return this.rows.get(g);
};
C.add = function(g, l) {
g instanceof m || (g = new m(g));
l && g.context(l);
l = g.hash();
this.rows.get(l) ? t("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(l, g), 
this.length = this.rows.length);
return g;
};
C.load = function(g) {
let l = -1, p, k;
var b;
let f, d, h, e = (b = this.locale()) && b.nplurals || 2, n = [];
for (;++l < g.length; ) p = g[l], null == p.parent ? (k = p.source || p.id, b = p.target || "", 
f = p.context, k || f ? (d = new m(k, b), d._id = p._id, f && d.context(f), p.flag && d.flag(p.flag, 0), 
p.comment && d.comment(p.comment), p.notes && d.notes(p.notes), p.refs && d.refs(p.refs), 
d.format(p.format), p.message = d, this.add(d), p.prev && p.prev[0] && (d.prev(p.prev[0].source, p.prev[0].context), 
p.prev[1] && d._src.push(p.prev[1].source || ""))) : 0 === l && "object" === typeof b && (this.head = b, 
this.headcmt = p.comment)) : n.push(p);
for (l = -1; ++l < n.length; ) try {
p = n[l];
k = p.source || p.id;
d = g[p.parent] && g[p.parent].message;
if (!d) throw Error("parent missing for plural " + k);
h = p.plural;
1 === h && d.plural(k);
h >= e || (p.flag && d.flag(p.flag, h), d.translate(p.target || "", h), p.format && !d.format() && d.format(p.format));
} catch (q) {
t(q);
}
return this;
};
C.wrap = function(g) {
this.fmtr = c(g);
return this;
};
C.toString = function() {
var g, l = this.locale(), p = [], k = [], b = this.headers(), f = !l, d = l && l.nplurals || 2, h = this.fmtr || c();
b[l ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in b) k.push(g + ": " + b[g]);
k = new m("", k.join("\n"));
k.comment(this.headcmt || "");
f && k.fuzzy(0, !0);
p.push(k.toString());
p.push("");
this.rows.each(function(e, n) {
e && (p.push(n.cat(h, f, d)), p.push(""));
});
return p.join("\n");
};
C = B.require("$35", "message.js").extend(m);
C.msgid = function() {
return this.src[0];
};
C.msgidPlural = function() {
return this.src[1] || "";
};
C.prev = function(g, l) {
this._src = [ g || "" ];
this._ctx = l;
};
C.hash = function() {
return r(this.source(), this.context());
};
C.toString = function() {
return this.cat(c());
};
C.cat = function(g, l, p) {
var k = [], b;
(b = this.cmt) && k.push(g.prefix(b, "# "));
(b = this.xcmt) && k.push(g.prefix(b, "#. "));
var f = this.rf;
if (b = this._id) f += (f ? " " : "") + "loco:" + b;
f && /\S/.test(f) && k.push(g.refs(f));
!l && this.fuzzy() && k.push("#, fuzzy");
(b = this.fmt) && k.push("#, " + b + "-format");
(b = this._ctx) && k.push(g.prefix(g.pair("msgctxt", b), "#| "));
if (b = this._src) b[0] && k.push(g.prefix(g.pair("msgid", b[0]), "#| ")), b[1] && k.push(g.prefix(g.pair("msgid_plural", b[1]), "#| "));
(b = this.ctx) && k.push(g.pair("msgctxt", b));
k.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) k.push(g.pair("msgstr", l ? "" : this.msg[0])); else for (f = -1, 
k.push(g.pair("msgid_plural", this.src[1])), b = this.msg || [ "", "" ], p = p || b.length; ++f < p; ) k.push(g.pair("msgstr[" + f + "]", l ? "" : b[f] || ""));
return k.join("\n");
};
C.compare = function(g, l) {
let p = this.weight(), k = g.weight();
if (p > k) return 1;
if (p < k) return -1;
if (l) {
p = this.hash().toLowerCase();
k = g.hash().toLowerCase();
if (p < k) return 1;
if (p > k) return -1;
}
return 0;
};
C.copy = function() {
let g = new m(), l, p;
for (l in this) this.hasOwnProperty(l) && ((p = this[l]) && p.concat && (p = p.concat()), 
g[l] = p);
return g;
};
return w;
}({}, J, L));
B.register("$17", function(w, u, C) {
w.init = function(x, r) {
function t() {
return g || (g = A('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function c(l, p, k) {
l = A("<p></p>").text(k);
t().dialog("close").html("").dialog("option", "title", "Error").append(l).dialog("open");
}
function a(l) {
const p = l && l.code;
if (p) {
for (var k = p.length, b = A("<ol></ol>").attr("class", l.type), f = -1; ++f < k; ) A("<li></li>").html(p[f]).appendTo(b);
b.find("li").eq(l.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", l.path + ":" + l.line).append(b).dialog("open");
}
}
function m(l) {
l = l.target;
const p = A(l).find("li.highlighted")[0];
l.scrollTop = Math.max(0, (p && p.offsetTop || 0) - Math.floor(l.clientHeight / 2));
}
let g;
return {
load: function(l) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", m);
l = A.extend({
ref: l,
path: r.popath
}, r.project || {});
x.ajax.post("fsReference", l, a, c);
}
};
};
return w;
}({}, J, L));
B.register("$18", function(w, u, C) {
function x() {
this.inf = {};
}
function r() {
const a = C.createElement("p"), m = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let l, p;
return {
sniff: function(k) {
if (k === l) return p;
l = k;
if (m.test(k) || g.test(k)) if (a.innerHTML = k, a.textContent !== k) return p = !0;
return p = !1;
}
};
}
w.create = function(a, m) {
m && "function" === typeof m.create || console.error("module.create is not callable");
m = m.create(x);
m.init(a);
return m;
};
const t = x.prototype;
t.init = function(a) {
this.inf = a || {};
return this;
};
t.param = function(a) {
return this.inf[a] || "";
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
t.setSrc = function(a) {
this.inf.src = this.mapLang(a, this.getLangMap());
};
t.stderr = function(a) {
const m = (u.loco || {}).notices;
m && m.error && m.error(String(this) + ": " + String(a));
};
t.xhrError = function(a, m, g) {
try {
const l = a.responseText, p = l && u.JSON.parse(l);
g = p && this.parseError(p) || g;
} catch (l) {}
return g || this.httpError(a);
};
t.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
t.parseError = function(a) {
return a && a.error || "";
};
t.mapLang = function(a, m) {
const g = String(a).replace("_", "-").toLowerCase();
var l = a.lang;
m = m[g] || m[l] || [];
a = m.length;
if (0 === a) return l;
if (1 < a) for (l = -1; ++l < a; ) {
const p = m[l];
if (p === g) return p;
}
return m[0];
};
t.getLangMap = function() {
return {};
};
t.maxChr = function() {
return 0;
};
t.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
};
t.translate = function(a, m, g) {
return this.batch([ a ], m, this.isHtml(a), g);
};
t.verify = function(a) {
return this.translate("OK", {
lang: "fr",
toString: function() {
return "fr";
}
}, function(m, g) {
a(g && "OK" === m);
});
};
t.hash = function() {
return this.key();
};
t._call = function(a) {
const m = this;
m.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(g, l, p) {
m.stderr(m.xhrError(g, l, p));
};
return m.abortable(A.ajax(a));
};
t.abortable = function(a) {
const m = this;
a.always(function() {
m.$r === a && (m.$r = null);
});
return m.$r = a;
};
t.abort = function() {
const a = this.$r;
a && a.abort();
};
t.isHtml = function(a) {
return (c || (c = r())).sniff(a);
};
let c;
return w;
}({}, J, L));
B.register("$19", function(w, u, C) {
function x(r) {
this.api = r;
this.chars = 0;
}
w.create = function(r) {
return new x(r);
};
u = x.prototype;
u.init = function(r, t) {
function c(e) {
let n = {
length: 0,
html: e.html,
sources: []
};
d.push(n);
return h[e.html ? 1 : 0] = n;
}
function a(e, n) {
let q = e.source(null, n);
if (q && (e.untranslated(n) || t)) if (n = f[q]) n.push(e); else {
n = q.length;
var v = m.isHtml(q);
v = h[v ? 1 : 0];
var y = v.sources;
if (b && n > b) p++; else {
if (v.length + n > k || 50 === y.length) v = c(v), y = v.sources;
y.push(q);
f[q] = [ e ];
v.length += n;
g += n;
l += 1;
}
}
}
let m = this.api, g = 0, l = 0, p = 0, k = 1e4, b = m.maxChr(), f = {}, d = [], h = [];
b && (k = Math.min(k, b));
c({
html: !1
});
c({
html: !0
});
r.each(function(e, n) {
a(n, 0);
a(n, 1);
});
h = [];
this.map = f;
this.chars = g;
this.length = l;
this.batches = d;
this.locale = r.locale();
p && m.stderr("Strings over " + k + " characters long will be skipped");
};
u.abort = function() {
this.state = "abort";
return this;
};
u.dispatch = function() {
function r(z, D) {
function F(S, I, Q) {
D !== Q && (z === I || 1 < S && E.source(null, 1) === z) && (E.translate(D, S), 
O++, n++);
return O;
}
if (!t()) return !1;
if (!D) return !0;
let E, G = b[z] || [], H = G.length, N = -1, O;
for (h++; ++N < H; ) if (E = G[N]) O = 0, E.each(F), O && l("each", [ E ]);
return !0;
}
function t() {
return "abort" === p.state ? (k && (k.abort(), g()), !1) : !0;
}
function c() {
let z = f.shift(), D;
z ? (D = z.sources) && D.length ? k.batch(D, d, z.html, r).fail(a).always(m) : m() : g();
}
function a() {
p.abort();
g();
}
function m() {
e++;
l("prog", [ e, v ]);
t() && c();
}
function g() {
k = f = null;
l("done");
}
function l(z, D) {
z = y[z] || [];
let F = z.length;
for (;0 <= --F; ) z[F].apply(null, D);
}
let p = this, k = p.api, b = p.map, f = p.batches || [], d = p.locale, h = 0, e = 0, n = 0, q = p.length, v = f.length, y = {
done: [],
each: [],
prog: []
};
p.state = "";
c();
return {
done: function(z) {
y.done.push(z);
return this;
},
each: function(z) {
y.each.push(z);
return this;
},
prog: function(z) {
y.prog.push(z);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(q - h, 0);
},
did: function() {
return h;
}
};
}
};
};
return w;
}({}, J, L));
B.register("$20", function(w, u, C) {
function x() {}
w.create = function(r) {
(x.prototype = new r()).batch = function(t, c, a, m) {
function g(k) {
const b = t.length;
let f = -1;
for (;++f < b && !1 !== m(t[f], k[f], c); );
}
const l = u.loco;
a = {
hook: this.getId(),
type: a ? "html" : "text",
locale: String(c),
source: this.getSrc(),
sources: t
};
const p = A.Deferred();
this.abortable(l.ajax.post("apis", a, function(k) {
g(k && k.targets || []);
p.resolve();
}, function() {
g([]);
p.reject();
}));
return p.promise();
};
return new x();
};
return w;
}({}, J, L));
B.register("$37", {
pt: [ "pt", "pt-pt", "pt-br" ],
en: [ "en", "en-gb", "en-us" ]
});
B.register("$21", function(w, u, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "DeepL Translator";
};
r.parseError = function(t) {
const c = (t = t.message) && /^Wrong endpoint\. Use (https?:\/\/[-.a-z]+)/.exec(t);
c && this.base(this.key()) === c[1] && (t = "Only the v2 API is supported");
return t;
};
r.base = function(t) {
let c = this.param("api");
c ? c = this.fixURL(c) : (c = "https://api", ":fx" === t.substring(t.length - 3) && (c += "-free"), 
c += ".deepl.com");
return c;
};
r.getLangMap = function() {
return B.require("$37", "deepl.json");
};
r.verify = function(t) {
const c = this.key(), a = this.base(c);
return this._call({
url: a + "/v2/usage",
data: {
auth_key: c
}
}).done(function() {
t(!0);
}).fail(function() {
t(!1);
});
};
r.batch = function(t, c, a, m) {
function g(h) {
const e = t.length;
let n = -1;
for (;++n < e && !1 !== m(t[n], (h[n] || {}).text || "", c); );
}
const l = this;
a = l.key();
const p = l.base(a), k = l.getSrc().substring(0, 2), b = l.mapLang(c, l.getLangMap());
let f = c.tone, d = "default";
"formal" === f ? d = "more" : "informal" === f && (d = "less");
return l._call({
url: p + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: k.toUpperCase(),
target_lang: b.toUpperCase(),
formality: d,
preserve_formatting: "1",
auth_key: a,
text: t
}
}).done(function(h, e, n) {
h.translations ? g(h.translations) : (l.stderr(l.parseError(h) || l.httpError(n)), 
g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$38", {
zh: [ "zh", "zh-cn", "zh-tw" ],
he: [ "iw" ],
jv: [ "jw" ]
});
B.register("$22", function(w, u, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "Google Translate";
};
r.parseError = function(t) {
if (t.error) {
const c = [], a = t.error.errors || [], m = a.length;
let g = -1;
for (;++g < m; ) c.push(a[g].message || "");
return "Error " + t.error.code + ": " + c.join(";");
}
return "";
};
r.getLangMap = function() {
return B.require("$38", "google.json");
};
r.batch = function(t, c, a, m) {
function g(b) {
const f = t.length;
let d = -1;
for (;++d < f && !1 !== m(t[d], (b[d] || {}).translatedText || "", c); );
}
const l = this, p = l.getSrc();
a = a ? "html" : "text";
const k = l.mapLang(c, l.getLangMap());
return l._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + p + "&target=" + k + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: l.key(),
q: t
}
}).done(function(b, f, d) {
b.data ? g(b.data.translations || []) : (l.stderr(l.parseError(b) || l.httpError(d)), 
g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$39", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
B.register("$23", function(w, u, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.parseError = function(t) {
var c = t.details || {};
let a = c.message;
c = c.texts;
return a ? (c && c !== a && (a += "; " + c), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(m) {
m += -1 === m.indexOf("?") ? "?" : "&";
return m + "ref=loco";
}), "Error " + (t.status || "0") + ": " + a) : "";
};
r.maxChr = function() {
return 1e3;
};
r.getLangMap = function() {
return B.require("$39", "lecto.json");
};
r.batch = function(t, c, a, m) {
function g(b) {
const f = t.length;
let d = -1, h = (b[0] || {
translated: []
}).translated || [];
for (;++d < f && (b = h[d] || "", !1 !== m(t[d], b, c)); );
}
const l = this;
a = this.getSrc();
const p = l.param("api") || "https://api.lecto.ai", k = l.mapLang(c, l.getLangMap());
return l._call({
url: l.fixURL(p + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ k ],
from: a,
texts: t
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": l.key(),
Accept: "application/json"
}
}).done(function(b, f, d) {
b ? g(b.translations || []) : (l.stderr(l.parseError(b) || l.httpError(d)), g([]));
}).fail(function() {
g([]);
});
};
return new x();
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
B.register("$24", function(w, u, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "Microsoft Translator text API";
};
r.parseError = function(t) {
return t && t.error ? t.error.message : "";
};
r.maxChr = function() {
return 1e4;
};
r.getLangMap = function() {
return B.require("$40", "ms.json");
};
r.region = function() {
return this.param("region") || "global";
};
r.hash = function() {
return this.key() + this.region();
};
r.batch = function(t, c, a, m) {
function g(h) {
let e = -1;
for (var n; ++e < b && (n = h[e] || {}, n = n.translations || [], n = n[0] || {}, 
!1 !== m(t[e], n.text || "", c)); );
}
let l = this, p = [], k = l.getSrc(), b = t.length, f = -1;
a = a ? "html" : "plain";
let d = l.mapLang(c, l.getLangMap());
for (;++f < b; ) p.push({
Text: t[f]
});
return l._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + k + "&to=" + d + "&textType=" + a,
method: "POST",
data: JSON.stringify(p),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": l.region()
}
}).done(function(h, e, n) {
h && h.length ? g(h) : (l.stderr(l.parseError(h) || l.httpError(n)), g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$25", function(w, u, C) {
w.init = function(x) {
function r() {
O || (F.on("click", p), O = A('<div id="loco-fs-creds"></div>').dialog({
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
function t() {
G && (c(A(h)), G = !1);
if (q && N) {
var I = N, Q = A(E);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (c(A(E)), H = !1);
}
function c(I) {
I.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function a() {
if (q) return O && O.dialog("close"), t(), A(x).find('button[type="submit"]').attr("disabled", !1), 
A(u).triggerHandler("resize"), d && d(!0), !0;
y && O ? (G || (A(h).removeClass("jshide").hide().fadeIn(500), G = !0), H && (c(A(E)), 
H = !1)) : t();
A(x).find('input[type="submit"]').attr("disabled", !0);
d && d(!1);
return !1;
}
function m(I) {
var Q, Y = S || {};
for (Q in Y) if (Y.hasOwnProperty(Q)) {
var ha = Y[Q];
I[Q] ? I[Q].value = ha : A('<input type="hidden" />').attr("name", Q).appendTo(I).val(ha);
}
}
function g(I) {
I.preventDefault();
I = A(I.target).serializeArray();
f(I);
n = !0;
return !1;
}
function l(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function p(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function k(I) {
q = I.authed;
e = I.method;
A(h).find("span.loco-msg").text(I.message || "Something went wrong.");
N = I.warning || "";
I.notice && v.notices.info(I.notice);
if (q) "direct" !== e && (S = I.creds, m(x), n && I.success && v.notices.success(I.success)), 
a(); else if (I.reason) v.notices.info(I.reason); else if (I = I.prompt) {
var Q = r();
Q.html(I).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", l);
Q.find('input[type="submit"]').addClass("button-primary");
a();
A(u).triggerHandler("resize");
} else v.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function b() {
a();
}
function f(I) {
n = !1;
v.ajax.setNonce("fsConnect", D).post("fsConnect", I, k, b);
return I;
}
var d, h = x, e = null, n = !1, q = !1, v = u.loco, y = x.path.value, z = x.auth.value, D = x["loco-nonce"].value, F = A(h).find("button.button-primary"), E = C.getElementById(h.id + "-warn"), G = !1, H = !1, N = "", O;
v.notices.convert(E).stick();
if (x.connection_type) {
var S = {};
S.connection_type = x.connection_type.value;
q = !0;
} else y && z && f({
path: y,
auth: z
});
a();
return {
applyCreds: function(I) {
if (I.nodeType) m(I); else {
var Q, Y = S || {};
for (Q in Y) Y.hasOwnProperty(Q) && (I[Q] = Y[Q]);
}
return this;
},
setForm: function(I) {
x = I;
a();
m(I);
return this;
},
connect: function() {
y = x.path.value;
z = x.auth.value;
f(A(x).serializeArray());
return this;
},
listen: function(I) {
d = I;
q && I(!0);
return this;
},
authed: function() {
return q;
}
};
};
return w;
}({}, J, L));
B.register("$41", function(w, u, C) {
function x(a, m) {
return function(g) {
a.apply(g, m);
return g;
};
}
function r(a) {
return function(m, g) {
m = m && m[a] || 0;
g = g && g[a] || 0;
return m === g ? 0 : m > g ? 1 : -1;
};
}
function t(a) {
return function(m, g) {
return (m && m[a] || "").localeCompare(g && g[a] || "");
};
}
function c(a) {
return function(m, g) {
return -1 * a(m, g);
};
}
w.sort = function(a, m, g, l) {
m = "n" === g ? r(m) : t(m);
l && (m = c(m));
return x([].sort, [ m ])(a);
};
return w;
}({}, J, L));
B.register("$26", function(w, u, C) {
w.init = function(x) {
function r(h) {
var e = -1, n = h.length;
for (A("tr", k).remove(); ++e < n; ) k.appendChild(h[e].$);
}
function t(h) {
g = h ? f.find(h, c) : c.slice(0);
p && (h = a[p], g = d(g, p, h.type, h.desc));
r(g);
}
var c = [], a = [], m = 0, g, l, p, k = x.getElementsByTagName("tbody")[0], b = x.getElementsByTagName("thead")[0], f = B.require("$10", "fulltext.js").init(), d = B.require("$41", "sort.js").sort;
b && k && (A("th", b).each(function(h, e) {
var n = e.getAttribute("data-sort-type");
n && (h = m, A(e).addClass("loco-sort").on("click", function(q) {
q.preventDefault();
q = h;
var v = a[q], y = v.type, z = !(v.desc = !v.desc);
g = d(g || c.slice(0), q, y, z);
r(g);
l && l.removeClass("loco-desc loco-asc");
l = A(v.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
p = q;
return !1;
}), a[m] = {
$: e,
type: n
});
e.hasAttribute("colspan") ? m += Number(e.getAttribute("colspan")) : m++;
}), A("tr", k).each(function(h, e) {
var n, q, v = [], y = {
_: h,
$: e
}, z = e.getElementsByTagName("td");
for (n in a) {
e = z[n];
(q = e.textContent.replace(/(^\s+|\s+$)/g, "")) && v.push(q);
e.hasAttribute("data-sort-value") && (q = e.getAttribute("data-sort-value"));
switch (a[n].type) {
case "n":
q = Number(q);
}
y[n] = q;
}
c[h] = y;
f.index(h, v);
}), x = A('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
b = A(x.form), 1 < c.length ? B.require("$11", "LocoTextListener.js").listen(x, t) : b.hide(), 
b.on("submit", function(h) {
h.preventDefault();
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
A("#loco-admin.wrap table.wp-list-table").each(function(w, u) {
B.require("$26", "tables.js").init(u);
});
U.validate = function(w) {
w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "");
if ("2.6.5" === (w && w[0])) return !0;
U.notices.warn("admin.js is the wrong version (2.6.5). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
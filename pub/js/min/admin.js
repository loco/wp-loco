"use strict";

(function(J, L, A, ka) {
var B = function() {
function w(C) {
throw Error("Failed to require " + C);
}
var u = {};
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
"function" !== t && (r = function(e) {
return 1 != e;
});
return r;
}
w.init = function(r) {
function t(p, m, h) {
return (p = n[p]) && p[h] ? p[h] : m || "";
}
function e(p) {
return t(p, p, 0);
}
function a(p, m) {
return t(m + "" + p, p, 0);
}
function l(p, m, h) {
h = Number(r(h));
isNaN(h) && (h = 0);
return t(p, h ? m : p, h);
}
r = x(r);
var n = {};
return {
__: e,
_x: a,
_n: l,
_: e,
x: a,
n: l,
load: function(p) {
n = p || {};
return this;
},
pluraleq: function(p) {
r = x(p);
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
var e = Math.pow(10, x || 0);
x = [];
e = String(Math.round(e * this) / e);
var a = e.split(".");
e = a[0];
a = a[1];
let l = e.length;
do {
x.unshift(e.substring(l - 3, l));
} while (0 < (l -= 3));
e = x.join(t || ",");
if (a) {
{
t = a;
x = t.length;
let n;
for (;"0" === t.charAt(--x); ) n = x;
n && (t = t.substring(0, n));
a = t;
}
a && (e += (r || ".") + a);
}
return e;
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
var e = 0;
1 < arguments.length && (e = Number(arguments[1]), e != e ? e = 0 : 0 != e && Infinity != e && -Infinity != e && (e = (0 < e || -1) * Math.floor(Math.abs(e))));
if (e >= t) return -1;
for (e = 0 <= e ? e : Math.max(t - Math.abs(e), 0); e < t; e++) if (e in r && r[e] === x) return e;
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
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(e, a, l) {
if ("%" === l) return "%";
e = a ? r[Number(a) - 1] : r[t++];
return null != e ? String(e) : "s" === l ? "" : "0";
});
};
return w;
}({}, J, L));
B.register("$27", function(w, u, C) {
function x(r) {
return function(t, e) {
let a = t[r] || 0;
for (;(t = t.offsetParent) && t !== (e || C.body); ) a += t[r] || 0;
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
function x(c, k, q) {
function v() {
y();
z = setTimeout(k, q);
}
function y() {
z && clearTimeout(z);
z = 0;
}
let z = 0;
v();
A(c).on("mouseenter", y).on("mouseleave", v);
return {
die: function() {
y();
A(c).off("mouseenter mouseleave");
}
};
}
function r(c, k) {
c.fadeTo(k, 0, function() {
c.slideUp(k, function() {
c.remove();
A(u).triggerHandler("resize");
});
});
return c;
}
function t(c, k) {
function q(G) {
h[D] = null;
r(A(c), 250);
z && z.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function v(G) {
z && z.die();
return z = x(c, q, G);
}
const y = A(c);
let z, D, F, E = y.find("button");
0 === E.length && (y.addClass("is-dismissible"), E = A('<button type="button" class="notice-dismiss"> </a>').appendTo(y));
E.off("click").on("click", q);
A(u).triggerHandler("resize");
m();
D = h.length;
h.push(q);
k && (z = v(k));
return {
link: function(G, H) {
var N = H || G;
H = A(c).find("nav");
G = A("<nav></nav>").append(A("<a></a>").attr("href", G).text(N));
F ? (F.push(G.html()), H.html(F.join("<span> | </span>"))) : (F = [ G.html() ], 
A(c).addClass("has-nav").append(G));
return this;
},
stick: function() {
z && z.die();
z = null;
h[D] = null;
return this;
},
slow: function(G) {
v(G || 1e4);
return this;
}
};
}
function e(c, k, q) {
const v = B.require("$27", "dom.js").el;
c = A('<div class="notice notice-' + c + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const y = A(v("p"));
q = A(v("span")).text(q);
k = A(v("strong", "has-icon")).text(k + ": ");
y.append(k).append(q).appendTo(c);
return c;
}
function a(c, k, q, v) {
c = e(q, k, c).css("opacity", "0").fadeTo(500, 1);
A(u).triggerHandler("resize");
return t(c, v);
}
function l(c) {
return a(c, f, "warning");
}
function n() {
A("#loco-notices").find("div.notice").each(function(c, k) {
-1 === k.className.indexOf("jshide") && (c = -1 === k.className.indexOf("notice-success") ? null : 5e3, 
t(k, c));
});
}
const p = u.console || {
log: function() {}
}, m = Date.now || function() {
return new Date().getTime();
};
let h = [], b, f, d, g;
w.error = function(c) {
return a(c, b, "error");
};
w.warn = l;
w.info = function(c) {
return a(c, d, "info");
};
w.success = function(c) {
return a(c, g, "success", 5e3);
};
w.warning = l;
w.log = function() {
p.log.apply(p, arguments);
};
w.debug = function() {
(p.debug || p.log).apply(p, arguments);
};
w.clear = function() {
let c = -1;
const k = h, q = k.length;
for (;++c < q; ) {
const v = k[c];
v && v.call && v();
}
h = [];
return w;
};
w.create = e;
w.raise = function(c) {
(w[c.type] || w.error).call(w, c.message);
};
w.convert = t;
w.init = function(c) {
b = c._("Error");
f = c._("Warning");
d = c._("Notice");
g = c._("OK");
setTimeout(n, 1e3);
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
f = f.replace(/^[()! ]+Fatal error:\s*/, "")) : h._("Server returned invalid data");
}
function t(f) {
u.console && console.error && console.error('No nonce for "' + f + '"');
return "";
}
function e(f, d, g) {
f[d] = g;
}
function a(f, d, g) {
f.push({
name: d,
value: g
});
}
function l(f, d, g) {
f.append(d, g);
}
function n(f, d, g, c) {
function k(v, y, z) {
if ("abort" !== y) {
var D = h || {
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
g && g.call && g(v, y, z);
b = v;
}
}
c.url = p;
c.dataType = "json";
const q = B.require("$7", "notices.js").clear();
b = null;
return A.ajax(c).fail(k).done(function(v, y, z) {
const D = v && v.data, F = v && v.notices, E = F && F.length;
!D || v.error ? k(z, y, v && v.error && v.error.message) : d && d(D, y, z);
for (v = -1; ++v < E; ) q.raise(F[v]);
});
}
const p = u.ajaxurl || "/wp-admin/admin-ajax.php";
let m = {}, h, b;
w.init = function(f) {
m = f.nonces || m;
return w;
};
w.localise = function(f) {
h = f;
return w;
};
w.xhr = function() {
return b;
};
w.strip = x;
w.parse = r;
w.submit = function(f, d, g) {
function c(z, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function k(z, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function q(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(k);
z.find("input").each(k);
z.find("select").each(k);
z.find("textarea").each(k);
z.removeClass("disabled loading");
}
const v = A(f), y = v.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(c);
z.find("input").each(c);
z.find("select").each(c);
z.find("textarea").each(c);
z.addClass("disabled loading");
})(v);
return n(f.route.value, function(z, D, F) {
q(v);
d && d(z, D, F);
}, function(z, D, F) {
q(v);
g && g(z, D, F);
}, {
type: f.method,
data: y
});
};
w.post = function(f, d, g, c) {
let k = !0, q = d || {}, v = m[f] || t(f);
u.FormData && q instanceof FormData ? (k = !1, d = l) : d = Array.isArray(q) ? a : e;
d(q, "action", "loco_json");
d(q, "route", f);
d(q, "loco-nonce", v);
return n(f, g, c, {
type: "post",
data: q,
processData: k,
contentType: k ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, d, g, c) {
d = d || {};
const k = m[f] || t(f);
d.action = "loco_json";
d.route = f;
d["loco-nonce"] = k;
return n(f, g, c, {
type: "get",
data: d
});
};
w.setNonce = function(f, d) {
m[f] = d;
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
w.cast = function(e) {
return e instanceof x ? e : "string" === typeof e ? w.parse(e) : w.clone(e);
};
w.clone = function(e) {
const a = new x();
for (const l in e) a[l] = e[l];
return a;
};
w.parse = function(e) {
e = (t || (t = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(e);
if (!e) return null;
const a = new x();
a.lang = e[1].toLowerCase();
a.region = (e[2] || "").toUpperCase();
a.variant = (e[3] || "").toLowerCase();
return a;
};
u = x.prototype;
u.isValid = function() {
return !!this.lang;
};
u.isKnown = function() {
const e = this.lang;
return !(!e || "zxx" === e);
};
u.toString = function(e) {
e = e || "_";
let a = this.lang || "zxx";
this.region && (a += e + this.region);
this.variant && (a += e + this.variant);
return a;
};
u.getIcon = function() {
let e = 3, a = [];
const l = [ "variant", "region", "lang" ];
for (;0 !== e--; ) {
const n = l[e], p = this[n];
p && (a.push(n), a.push(n + "-" + p.toLowerCase()));
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
function x(h) {
return n[h] || h;
}
function r(h, b, f) {
let d, g, c = String(h || "").toLowerCase().replace(l, x).split(p), k = c.length;
for (;0 !== k--; ) if ((h = c[k]) && null == f[h]) for (b.push(h), f[h] = !0, d = h.split(m), 
g = d.length; 0 !== g--; ) (h = d[g]) && null == f[h] && (b.push(h), f[h] = !0);
return b;
}
function t(h) {
return r(h, [], {});
}
function e(h) {
let b = [], f = {}, d = h.length;
for (;0 !== d--; ) r(h[d], b, f);
return b;
}
let a = [];
const l = /[^a-z0-9]/g, n = B.require("$29", "flatten.json"), p = /\s+/, m = /[^\d\p{L}]+/u;
return {
split: t,
find: function(h, b) {
{
let f = [], d = -1, g = a, c = g.length, k, q, v, y, z, D = String(h || "").toLowerCase().replace(l, x).split(" "), F = D.length, E = !!b;
a: for (;++d < c; ) if (q = g[d], null != q && (v = q.length)) {
y = 0;
b: for (;y < F; y++) {
z = D[y];
for (h = 0; h < v; h++) if (k = q[h], 0 === k.indexOf(z)) continue b;
continue a;
}
f.push(E ? b[d] : d);
}
b = f;
}
return b;
},
add: function(h, b) {
a[h] = t(b);
},
push: function(h) {
a[a.length] = e(h);
},
index: function(h, b) {
a[h] = e(b);
},
size: function() {
return a.length;
},
clear: function() {
a = [];
},
remove: function(h) {
a[h] = null;
}
};
};
return w;
}({}, J, L));
B.register("$11", function(w, u, C) {
w.listen = function(x, r) {
function t() {
d[n ? "show" : "hide"]();
}
function e(g) {
f && h.setAttribute("size", 2 + g.length);
n = g;
t();
return g;
}
function a() {
p = null;
r(n);
}
function l(g) {
var c = h.value;
b && c === b && (c = "");
c !== n ? (p && clearTimeout(p), e(c), g ? p = setTimeout(a, g) : a()) : p && null == g && (clearTimeout(p), 
a());
}
var n, p, m = 150, h = x instanceof jQuery ? x[0] : x, b = u.attachEvent && h.getAttribute("placeholder"), f = 1 === Number(h.size), d = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
h.value = "";
l();
return !1;
});
e(h.value);
A(h).on("input", function() {
l(m);
return !0;
}).on("blur focus change", function() {
l(null);
return !0;
}).after(d);
t();
return {
delay: function(g) {
m = g;
return this;
},
ping: function(g) {
g ? (p && clearTimeout(p), g = h.value, b && g === b && (g = ""), e(g), a(), g = void 0) : g = l();
return g;
},
val: function(g) {
if (null == g) return n;
p && clearTimeout(p);
h.value = e(g);
t();
},
el: function() {
return h;
},
blur: function(g) {
return A(h).on("blur", g);
},
destroy: function() {
p && clearTimeout(p);
}
};
};
return w;
}({}, J, L));
B.register("$12", function(w, u, C) {
function x(a, l) {
return "function" == typeof a ? a.call(l) : a;
}
function r(a, l) {
this.$element = A(a);
this.options = l;
this.enabled = !0;
this.fixTitle();
}
w.init = function(a, l) {
let n = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: e,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
l && (n = A.extend({}, n, l));
a.tipsy(n);
};
w.delays = function(a, l) {
t = a || 150;
e = l || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(a, l) {
l.data("tipsy").setTitle(a);
};
let t, e;
w.delays();
A(C.body).on("overlayOpened overlayClosing", function(a) {
w.kill();
return !0;
});
r.prototype = {
show: function() {
var a = this.getTitle();
if (a && this.enabled) {
var l = this.tip();
l.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
l[0].className = "tipsy";
l.remove().css({
top: 0,
left: 0
}).prependTo(C.body);
a = (a = this.options.anchor) ? this.$element.find(a) : this.$element;
a = A.extend({}, a.offset(), {
width: a[0].offsetWidth,
height: a[0].offsetHeight
});
var n = l[0].offsetWidth, p = l[0].offsetHeight, m = x(this.options.gravity, this.$element[0]);
switch (m.charAt(0)) {
case "n":
var h = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - n / 2
};
break;

case "s":
h = {
top: a.top - p - this.options.offset,
left: a.left + a.width / 2 - n / 2
};
break;

case "e":
h = {
top: a.top + a.height / 2 - p / 2,
left: a.left - n - this.options.offset
};
break;

case "w":
h = {
top: a.top + a.height / 2 - p / 2,
left: a.left + a.width + this.options.offset
};
}
2 == m.length && ("w" == m.charAt(1) ? h.left = a.left + a.width / 2 - 15 : h.left = a.left + a.width / 2 - n + 15);
l.css(h).addClass("tipsy-" + m);
l.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + m.charAt(0);
this.options.className && l.addClass(x(this.options.className, this.$element[0]));
l.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var a = this.$element, l = a.attr("title") || "";
(l || "string" !== typeof a.attr("original-title")) && a.attr("original-title", l).removeAttr("title");
},
getTitle: function() {
var a, l = this.$element, n = this.options;
this.fixTitle();
"string" == typeof n.title ? a = l.attr("title" == n.title ? "original-title" : n.title) : "function" == typeof n.title && (a = n.title.call(l[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || n.fallback;
},
setTitle: function(a) {
var l = this.$element;
l.attr("default-title") || l.attr("default-title", this.getTitle());
null == a && (a = l.attr("default-title") || this.getTitle());
l.attr("original-title", a);
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
function l(b) {
var f = A.data(b, "tipsy");
f || (f = new r(b, A.fn.tipsy.elementOptions(b, a)), A.data(b, "tipsy", f));
return f;
}
function n() {
var b = l(this), f = a.delayIn;
b.hoverState = "in";
0 == f ? b.show() : (b.fixTitle(), setTimeout(function() {
"in" == b.hoverState && b.show();
}, f));
}
function p() {
var b = l(this), f = a.delayOut;
b.hoverState = "out";
0 == f ? b.hide() : (b.tip().removeClass("in"), setTimeout(function() {
"out" == b.hoverState && b.hide();
}, f));
}
a = A.extend({}, A.fn.tipsy.defaults, a);
a.live || this.each(function() {
l(this);
});
if ("manual" != a.trigger) {
var m = a.live ? "live" : "bind", h = "hover" == a.trigger ? "mouseleave" : "blur";
this[m]("hover" == a.trigger ? "mouseenter" : "focus", n)[m](h, p);
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
A.fn.tipsy.elementOptions = function(a, l) {
return A.metadata ? A.extend({}, l, A(a).metadata()) : l;
};
A.fn.tipsy.autoNS = function() {
return A(this).offset().top > A(C).scrollTop() + A(u).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(C).scrollLeft() + A(u).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(a, l) {
return function() {
var n = l[0], p = 1 < l.length ? l[1] : !1, m = A(C).scrollTop() + a, h = A(C).scrollLeft() + a, b = A(this);
b.offset().top < m && (n = "n");
b.offset().left < h && (p = "w");
A(u).width() + A(C).scrollLeft() - b.offset().left < a && (p = "e");
A(u).height() + A(C).scrollTop() - b.offset().top < a && (n = "s");
return n + (p ? p : "");
};
};
return w;
}({}, J, L));
B.register("$41", function(w, u, C) {
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
function x(p) {
return "&#" + p.charCodeAt(0) + ";";
}
function r(p, m) {
return '<a href="' + p + '" target="' + (m.indexOf(l) ? "_blank" : "_top") + '">' + m + "</a>";
}
let t, e, a, l, n = function() {
t = /[<>&]/g;
e = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
l = location.hostname;
n = null;
};
return function(p, m) {
n && n();
p = p.replace(t, x);
m && (p = p.replace(a, r).replace(e, "<br />"));
return p;
};
}();
return w;
}({}, J, L));
B.register("$42", function(w, u, C) {
function x() {}
let r, t;
const e = B.require("$28", "rtl.json");
w.init = function() {
return new x();
};
w.cast = function(a) {
return a instanceof x ? a : "string" === typeof a ? w.parse(a) : w.clone(a);
};
w.clone = function(a) {
const l = new x();
for (const n in a) l[n] = a[n];
return l;
};
w.parse = function(a) {
r || (t = /[-_+]/, r = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(t).join("-");
a = r.exec(a);
if (!a) return null;
const l = new x();
l.lang = a[1].toLowerCase();
a[2] && (l.script = a[2].charAt(0).toUpperCase() + a[2].substring(1).toLowerCase());
a[3] && (l.region = a[3].toUpperCase());
a[4] && (l.variant = a[4].toLowerCase());
a[5] && (l.extension = a[5]);
return l;
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
let l, n = this.lang || "zxx";
if (l = this.script) n += a + l;
if (l = this.region) n += a + l;
if (l = this.variant) n += a + l;
if (l = this.extension) n += a + l;
return n;
};
u.getIcon = function() {
let a = 4, l = [];
const n = [ "variant", "region", "script", "lang" ];
for (;0 !== a--; ) {
const p = n[a];
let m = this[p];
m && (m.join && (m = m.join("-")), 1 === a && 3 === m.length ? l.push("region-m49") : l = l.concat([ p, p + "-" + m.toLowerCase() ]));
}
return l.join(" ");
};
u.isRTL = function() {
return !!e[String(this.script || this.lang).toLowerCase()];
};
u = null;
return w;
}({}, J, L));
B.register("$43", function(w, u, C) {
function x(a) {
u.console && console.error && console.error(a);
}
function r() {
x("Method not implemented");
}
function t() {}
function e(a) {}
t.prototype.toString = function() {
return "[Undefined]";
};
e.prototype._validate = function(a) {
let l, n, p = !0;
for (l in this) n = this[l], n === r ? (x(a + "." + l + "() must be implemented"), 
p = !1) : n instanceof t && (x(a + "." + l + " must be defined"), p = !1);
return p;
};
w.init = function(a, l) {
const n = new e();
if (a) {
let p = a.length;
for (;0 !== p--; ) n[a[p]] = r;
}
if (l) for (a = l.length; 0 !== a--; ) n[l[a]] = new t();
return n;
};
w.validate = function(a) {
const l = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(l && l[1] || "Object");
};
return w;
}({}, J, L));
B.register("$50", function(w, u, C) {
let x = 0, r = u.requestAnimationFrame, t = u.cancelAnimationFrame;
if (!r || !t) for (const a in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (r = u[a + "RequestAnimationFrame"]) if (t = u[a + "CancelAnimationFrame"] || u[a + "CancelRequestAnimationFrame"]) break;
r && t || (r = function(a) {
var l = e();
const n = Math.max(0, 16 - (l - x)), p = l + n;
l = u.setTimeout(function() {
a(p);
}, n);
x = p;
return l;
}, t = function(a) {
clearTimeout(a);
});
const e = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, l) {
function n() {
m = r(n, l);
a(p++);
}
let p = 0, m;
n();
return {
stop: function() {
m && t(m);
m = null;
}
};
};
return w;
}({}, J, L));
B.register("$47", function(w, u, C) {
function x(h, b, f, d) {
if (e) {
const g = f;
f = function(c) {
if ((c.MSPOINTER_TYPE_TOUCH || "touch") === c.pointerType) return g(c);
};
}
h.addEventListener(b, f, d);
return {
unbind: function() {
h.removeEventListener(b, f, d);
}
};
}
function r(h) {
h.preventDefault();
h.stopPropagation();
return !1;
}
let t;
const e = !!u.navigator.msPointerEnabled, a = e ? "MSPointerDown" : "touchstart", l = e ? "MSPointerMove" : "touchmove", n = e ? "MSPointerUp" : "touchend";
w.ok = function(h) {
null == t && (t = "function" === typeof C.body.addEventListener);
t && h && h(w);
return t;
};
w.ms = function() {
return e;
};
w.dragger = function(h, b) {
function f(k) {
h.addEventListener(k, g[k], !1);
}
function d(k) {
h.removeEventListener(k, g[k], !1);
}
const g = {};
g[a] = function(k) {
p(k, function(q, v) {
v.type = a;
b(k, v, c);
});
f(l);
f(n);
return !0;
};
g[n] = function(k) {
d(l);
d(n);
p(k, function(q, v) {
v.type = n;
b(k, v, c);
});
return !0;
};
g[l] = function(k) {
p(k, function(q, v) {
v.type = l;
b(k, v, c);
});
return r(k);
};
f(a);
let c = {
kill: function() {
d(a);
d(l);
d(n);
h = c = b = null;
}
};
return c;
};
w.swiper = function(h, b, f) {
function d(E) {
h.addEventListener(E, y[E], !1);
}
function g(E) {
h.removeEventListener(E, y[E], !1);
}
function c() {
k && k.stop();
k = null;
}
let k, q, v, y = {}, z = [], D = [], F = [];
y[a] = function(E) {
q = !1;
c();
const G = m();
p(E, function(H, N) {
z[H] = G;
D[H] = N.clientX;
F[H] = N.clientY;
});
v = h.scrollLeft;
return !0;
};
y[n] = function(E) {
p(E, function(G, H) {
const N = m() - z[G];
G = D[G] - H.clientX;
b(Math.abs(G) / N, G ? 0 > G ? -1 : 1 : 0);
});
v = null;
return !0;
};
y[l] = function(E) {
let G, H;
null == v || p(E, function(N, O) {
G = D[N] - O.clientX;
H = F[N] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return q = !0;
G && (q = !0, h.scrollLeft = Math.max(0, v + G));
return r(E);
};
if (!e || f) d(a), d(l), d(n), e && (h.className += " mstouch");
return {
kill: function() {
g(a);
g(l);
g(n);
c();
},
swiped: function() {
return q;
},
ms: function() {
return e;
},
snap: function(E) {
e && !f && (h.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + E + "px)", 
h.style["-ms-scroll-snap-type"] = "mandatory", h.style["-ms-scroll-chaining"] = "none");
},
scroll: function(E, G, H) {
c();
let N = h.scrollLeft;
const O = E > N ? 1 : -1, S = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return k = B.require("$50", "fps.js").loop(function(Q) {
Q && (N = Math.max(0, S(E, N + I)), h.scrollLeft = N, E === N && (c(), H && H(N)));
}, h);
}
};
};
w.start = function(h, b) {
return x(h, a, b, !1);
};
w.move = function(h, b) {
return x(h, l, b, !1);
};
w.end = function(h, b) {
return x(h, n, b, !1);
};
const p = w.each = function(h, b) {
if (e) (h.MSPOINTER_TYPE_TOUCH || "touch") === h.pointerType && b(0, h); else {
h = (h.originalEvent || h).changedTouches || [];
for (var f = -1; ++f < h.length; ) b(f, h[f]);
}
}, m = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, J, L));
B.register("$51", function(w, u, C) {
w.init = function(x) {
function r() {
l.style.top = String(-x.scrollTop) + "px";
return !0;
}
function t() {
var p = l;
p.textContent = x.value;
p.innerHTML = p.innerHTML.replace(/[ \t]/g, e).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function e(p) {
return '<span class="x' + p.charCodeAt(0).toString(16) + '">' + p + "</span>";
}
var a = x.parentNode, l = a.insertBefore(C.createElement("div"), x);
A(x).on("input", t).on("scroll", r);
A(a).addClass("has-mirror");
l.className = "ta-mirror";
var n = x.offsetWidth - x.clientWidth;
2 < n && (l.style.marginRight = String(n - 2) + "px");
t();
r();
return {
kill: function() {
A(x).off("input", t).off("scroll", r);
a.removeChild(l);
l = null;
A(a).removeClass("has-mirror");
}
};
};
return w;
}({}, J, L));
B.register("$35", function(w, u, C) {
function x(e, a) {
e = r[e] || [];
a = a && u[a];
const l = e.length;
let n = -1, p = 0;
for (;++n < l; ) {
const m = e[n];
"function" === typeof m && (m(a), p++);
}
return p;
}
const r = {};
let t = "";
w.load = function(e, a, l) {
function n() {
h && (clearTimeout(h), h = null);
b && (b.onreadystatechange = null, b = b = b.onload = null);
e && (delete r[e], e = null);
}
function p(f, d) {
f = b && b.readyState;
if (d || !f || "loaded" === f || "complete" === f) d || x(e, l), n();
}
function m() {
if (0 === x(e)) throw Error('Failed to load "' + (l || e) + '"');
n();
}
if (l && u[l]) "function" === typeof a && a(u[l]); else if (null != r[e]) r[e].push(a); else {
r[e] = [ a ];
var h = setTimeout(m, 4e3), b = C.createElement("script");
b.setAttribute("src", e);
b.setAttribute("async", "true");
b.onreadystatechange = p;
b.onload = p;
b.onerror = m;
b.onabort = n;
C.getElementsByTagName("head")[0].appendChild(b);
}
};
w.stat = function(e) {
var a;
if (!(a = t)) {
{
a = C.getElementsByTagName("script");
const l = a.length;
let n = -1, p = "";
for (;++n < l; ) {
const m = a[n].getAttribute("src");
if (m) {
const h = m.indexOf("/lib/vendor");
if (-1 !== h) {
p = m.substring(0, h);
break;
}
}
}
a = p || "/static";
}
a = t = a;
}
return a + e;
};
return w;
}({}, J, L));
B.register("$16", function(w, u, C) {
function x(m, h) {
m.setReadOnly(!1);
m.on("change", function(b, f) {
return h.val(f.getValue());
});
m.on("focus", function() {
return h.focus();
});
m.on("blur", function() {
return h.blur();
});
}
function r(m) {
m.off("change");
m.off("focus");
m.off("blur");
}
function t(m) {
r(m);
m.setReadOnly(!0);
m.setHighlightGutterLine(!1);
m.setHighlightActiveLine(!1);
}
function e(m, h) {
function b() {
this.HighlightRules = f;
}
var f = a(h);
m = m.require;
h = m("ace/lib/oop");
h.inherits(f, m("ace/mode/text_highlight_rules").TextHighlightRules);
h.inherits(b, m("ace/mode/text").Mode);
return new b();
}
function a(m) {
return function() {
var h = {
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
}, b = l(m);
"icu" === m ? h = {
start: h.start.concat([ {
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
} : b && h.start.push({
token: "printf",
regex: b
});
this.$rules = h;
};
}
function l(m) {
switch (m) {
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

case p:
return n || "%%";
}
}
var n, p = "auto";
w.init = function(m, h, b) {
var f, d = !1, g = b || p, c = m.parentNode, k = c.appendChild(C.createElement("div"));
A(c).addClass("has-proxy has-ace");
B.require("$35", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(q) {
if (k) {
if (!q) throw Error("Failed to load code editor");
f = q.edit(k);
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
v.setMode(e(q, g));
f.setValue(m.value, -1);
v.setUseWrapMode(!0);
h ? x(f, h) : t(f);
}
}, "ace");
return {
kill: function() {
f && (r(f), f.destroy(), f = null);
k && (c.removeChild(k), A(c).removeClass("has-proxy has-ace"), k = null);
return this;
},
disable: function() {
f && t(f);
h = null;
return this;
},
enable: function(q) {
h = q;
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
q = q || p;
q !== g && (g = q, f && f.session.setMode(e(u.ace, q)));
return this;
},
focus: function() {
return this;
}
};
};
w.strf = function(m, h) {
p = m;
n = h;
return w;
};
return w;
}({}, J, L));
B.register("$52", function(w, u, C) {
function x(a, l) {
function n() {
return l.val(a.getContent());
}
a.on("input", n);
a.on("change", n);
a.on("focus", function() {
return l.focus();
});
a.on("blur", function() {
return l.blur();
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
var e = 0;
w.load = function(a) {
var l = B.require("$35", "remote.js");
l.load(l.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, l) {
function n(q) {
b = q;
f = "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4);
return q.replace(/(<\/?)script/gi, "$1loco:script");
}
function p(q) {
m = q;
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
return this._setContent(n(v), y);
};
l ? (x(q, l), l.reset()) : t(q);
A(c).removeClass("loading");
}
var m, h = !1, b = "", f = !1, d = a.parentNode, g = d.parentNode, c = d.appendChild(C.createElement("div")), k = g.insertBefore(C.createElement("nav"), d);
k.id = "_tb" + String(++e);
A(d).addClass("has-proxy has-mce");
A(c).addClass("mce-content-body loading").html(n(a.value));
w.load(function(q) {
if (!q) throw Error("Failed to load HTML editor");
c && q.init({
inline: !0,
target: c,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + k.id,
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
init_instance_callback: p
});
});
return {
val: function(q) {
q = n(q);
null == m ? (a.value = q, A(c).html(q)) : m.getContent() !== q && m.setContent(q);
l && l.val(q);
return this;
},
kill: function() {
m && (l && l.val(m.getContent()), r(m), m.destroy(), m = null);
c && (d.removeChild(c), A(d).removeClass("has-proxy has-mce"), c = null);
k && (g.removeChild(k), k = null);
return this;
},
enable: function(q) {
l = q;
m && x(m, q);
return this;
},
disable: function() {
m && t(m);
l = null;
return this;
},
focus: function() {
m && l && m.focus();
return this;
},
invs: function(q) {
q = q || !1;
h !== q && (h = q, A(d)[q ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, J, L));
B.register("$48", function(w, u, C) {
function x(e) {
function a() {
h && (b.off("input", l), h = !1);
}
function l() {
const c = e.value;
c !== d && (b.trigger("changing", [ c, d ]), d = c);
}
function n() {
l();
h && g !== d && b.trigger("changed", [ d ]);
}
function p() {
t = e;
g = d;
h || (b.on("input", l), h = !0);
b.trigger("editFocus");
f.addClass("has-focus");
return !0;
}
function m() {
t === e && (t = null);
b.trigger("editBlur");
f.removeClass("has-focus");
h && (n(), a());
return !0;
}
let h = !1, b = A(e), f = A(e.parentNode), d = e.value, g;
b.on("blur", m).on("focus", p);
return {
val: function(c) {
d !== c && (e.value = c, b.triggerHandler("input"), d = c);
return !0;
},
kill: function() {
a();
b.off("blur", m).off("focus", p);
},
fire: function() {
d = null;
l();
},
ping: n,
blur: m,
focus: p,
reset: function() {
g = d = e.value;
}
};
}
function r(e) {
this.e = e;
}
let t;
w._new = function(e) {
return new r(e);
};
w.init = function(e) {
const a = new r(e);
e.disabled ? (e.removeAttribute("disabled"), a.disable()) : e.readOnly ? a.disable() : a.enable();
return a;
};
u = r.prototype;
u.destroy = function() {
this.unlisten();
var e = this.p;
e && (e.kill(), this.p = null);
this.e = null;
};
u.reload = function(e, a) {
var l = this.l;
l && !a && (this.disable(), l = null);
this.val(e || "");
a && !l && this.enable();
return this;
};
u.val = function(e) {
const a = this.e;
if (null == e) return a.value;
const l = this.l, n = this.p;
n && n.val(e);
l && l.val(e);
l || a.value === e || (a.value = e, A(a).triggerHandler("input"));
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
var e = this.p;
e ? e.focus() : A(this.e).focus();
};
u.focused = function() {
return t && t === this.el;
};
u.parent = function() {
return this.e.parentNode;
};
u.attr = function(e, a) {
var l = this.e;
if (1 === arguments.length) return l.getAttribute(e);
null == a ? l.removeAttribute(e) : l.setAttribute(e, a);
return this;
};
u.editable = function() {
return !!this.l;
};
u.enable = function() {
var e = this.p;
this.e.removeAttribute("readonly");
this.listen();
e && e.enable && e.enable(this.l);
return this;
};
u.disable = function() {
var e = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
e && e.disable && e.disable();
return this;
};
u.listen = function() {
var e = this.l;
e && e.kill();
this.l = x(this.e);
return this;
};
u.unlisten = function() {
var e = this.l;
e && (e.kill(), this.l = null);
return this;
};
u.setInvs = function(e, a) {
var l = this.i || !1;
if (a || l !== e) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(e) : e && (this._i = B.require("$51", "mirror.js").init(this.e)), 
this.i = e;
return this;
};
u.getInvs = function() {
return this.i || !1;
};
u.setMode = function(e) {
var a = this.p, l = this.i || !1;
e !== (this.m || "") && (this.m = e, a && a.kill(), this.p = a = "code" === e ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === e ? B.require("$52", "mce.js").init(this.e, this.l) : null, 
this.setInvs(l, !0), t && this.focus());
return this;
};
u.setStrf = function(e) {
this["%"] = e;
"code" === this.m && this.p.strf(e);
return this;
};
u.name = function(e) {
this.e.setAttribute("name", e);
return this;
};
u.placeholder = function(e) {
this.e.setAttribute("placeholder", e);
return this;
};
u.redraw = function() {
var e = this.p;
e && e.resize && e.resize();
};
u = null;
return w;
}({}, J, L));
B.register("$49", function(w, u, C) {
function x(d) {
const g = u.console;
g && g.error && g.error(d);
}
function r(d) {
const g = C.createElement("div");
d && g.setAttribute("class", d);
return g;
}
function t(d) {
return function() {
d.resize();
return this;
};
}
function e(d) {
return function(g) {
let c = g.target, k = c.$index;
for (;null == k && "DIV" !== c.nodeName && (c = c.parentElement); ) k = c.$index;
null != k && (g.stopImmediatePropagation(), d.select(k));
return !0;
};
}
function a(d) {
return function() {
d.redrawDirty() && d.redraw();
return !0;
};
}
function l(d) {
return function(g) {
var c = g.keyCode;
if (40 === c) c = 1; else if (38 === c) c = -1; else return !0;
if (g.shiftKey || g.ctrlKey || g.metaKey || g.altKey) return !0;
d.selectNext(c);
g.stopPropagation();
g.preventDefault();
return !1;
};
}
function n(d, g, c) {
function k(q) {
x("row[" + q + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(q) {
const v = g || 0, y = c ? -1 : 1, z = d.rows || [];
q.sort(function(D, F) {
return y * (z[D] || k(D)).cellVal(v).localeCompare((z[F] || k(F)).cellVal(v));
});
};
}
function p(d) {
this.w = d;
}
function m(d) {
this.t = d;
this.length = 0;
}
function h(d, g, c) {
let k = C.createElement("div");
k.className = c || "";
this._ = k;
this.d = g || [];
this.i = d || 0;
this.length = g.length;
}
function b(d) {
this.live = d;
this.rows = [];
}
w.create = function(d) {
return new p(d);
};
var f = p.prototype;
f.init = function(d) {
let g = this.w, c = g.id;
var k = g.splity(c + "-thead", c + "-tbody"), q = k[0];
k = k[1];
let v = [], y = [], z = [], D = [];
if (d) this.ds = d, this.idxs = y, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
q.css.push("wg-thead");
k.css.push("wg-tbody");
d.eachCol(function(O, S, I) {
z[O] = c + "-col-" + S;
D[O] = I || S;
});
var F = r();
let E = -1, G = z.length, H = r("wg-cols"), N = q.splitx.apply(q, z);
for (;++E < G; ) N[E].header(D[E]), H.appendChild(F.cloneNode(!1)).setAttribute("for", z[E]);
d.eachRow(function(O, S, I) {
v[O] = new h(O, S, I);
y[O] = O;
});
this.rows = v;
this.cols = H;
this.ww = null;
this.root = F = k.body;
this.head = q;
q.redraw = t(this);
q = k.fixed = N[0].bodyY() || 20;
g.lock().resize(q, k);
g.css.push("is-table");
g.restyle();
this.sc ? this._re_sort(G) : d.sort && d.sort(y);
this.redrawDirty();
this.render();
A(F).attr("tabindex", "-1").on("keydown", l(this)).on("mousedown", e(this)).on("scroll", a(this));
return this;
};
f.clear = function() {
const d = this.pages || [];
let g = d.length;
for (;0 !== g--; ) d[g].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
f.render = function() {
let d, g = [], c = this.rows || [], k = -1, q, v = this.idxs, y = v.length, z = this.idxr = {}, D = this.r, F = this._r, E = this.root, G = this.cols;
for (;++k < y; ) {
if (0 === k % 100) {
var H = G.cloneNode(!0);
d = new b(H);
d.h = 2200;
d.insert(E);
g.push(d);
}
q = v[k];
z[q] = k;
H = c[q];
if (null == H) throw Error("Render error, no data at [" + q + "]");
H.page = d;
d.rows.push(H);
}
d && 100 !== d.size() && d.sleepH(22);
this.pages = g;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == D ? null != F && (H = c[F]) && H.page && (delete this._r, this.select(F, !0)) : (H = c[D]) && H.page ? this.select(D, !0) : (this.deselect(), 
this._r = D);
return this;
};
f.resize = function() {
let d = -1, g = this.ww || (this.ww = []);
var c = this.w;
let k = c.cells[0], q = k.body.childNodes, v = q.length, y = this.pages || [], z = y.length;
for (c.redraw.call(k); ++d < v; ) g[d] = q[d].style.width;
if (z) {
c = this.mx;
for (d = this.mn; d <= c; d++) y[d].widths(g);
this.redrawDirty() && this.redraw();
}
};
f.redrawDirty = function() {
let d = !1;
var g = this.root;
const c = g.scrollTop;
g = g.clientHeight;
this.sy !== c && (d = !0, this.sy = c);
this.vh !== g && (d = !0, this.vh = g);
return d;
};
f.redraw = function() {
let d = 0, g = -1, c = null, k = null, q = this.ww;
var v = this.sy;
let y = this.mn, z = this.mx, D = Math.max(0, v - 100);
v = this.vh + v + 100;
let F, E = this.pages || [], G = E.length;
for (;++g < G && !(d > v); ) F = E[g], d += F.height(), d < D || (null === c && (c = g), 
k = g, F.rendered || F.render(q));
if (y !== c) {
if (null !== y && c > y) for (g = y; g < c; g++) {
F = E[g];
if (!F) throw Error("Shit!");
F.rendered && F.sleep();
}
this.mn = c;
}
if (z !== k) {
if (null !== z && k < z) for (g = z; g > k; g--) F = E[g], F.rendered && F.sleep();
this.mx = k;
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
f.td = function(d, g) {
return this.tr(d)[g];
};
f.next = function(d, g, c) {
null == c && (c = this.r || 0);
const k = this.idxs, q = k.length;
let v = c = (this.idxr || {})[c];
for (;c !== (v += d) && !(0 <= v && q > v); ) if (g && q) v = 1 === d ? -1 : q, 
g = !1; else return null;
c = k[v];
return null == c || null == this.rows[c] ? (x("Bad next: [" + v + "] does not map to data row"), 
null) : c;
};
f.selectNext = function(d, g, c) {
d = this.next(d, g);
null != d && this.r !== d && this.select(d, c);
return this;
};
f.deselect = function(d) {
const g = this.r;
null != g && (this.r = null, A(this.tr(g)).removeClass("selected"), this.w.fire("wgRowDeselect", [ g, d ]));
return this;
};
f.selectRow = function(d, g) {
return this.select(this.idxs[d], g);
};
f.select = function(d, g) {
const c = this.rows[d];
var k = c && c.page;
if (!k) return this.deselect(!1), x("Row is filtered out"), this;
this.deselect(!0);
let q, v = this.w.cells[1];
k.rendered || (q = k.top(), v.scrollY(q), this.redrawDirty() && this.redraw());
if (!c.rendered) return k.rendered || x("Failed to render page"), x("Row [" + c.i + "] not rendered"), 
this;
k = c.cells();
A(k).addClass("selected");
this.r = d;
g || (q = v.scrollY(), A(this.root).focus(), q !== v.scrollY() && v.scrollY(q));
v.scrollTo(k[0], !0);
this.w.fire("wgRowSelect", [ d, c.data() ]);
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
let g, c = -1;
const k = this.rows || [], q = this.idxs || [], v = q.length;
for (;++c < v; ) g = q[c], d(k[g], c, g);
return this;
};
f.sortable = function(d) {
const g = this.sc || (this.sc = new m(this));
g.has(d) || g.add(d);
return this;
};
f._re_sort = function(d) {
let g = -1, c = this.sc, k = c.active;
for (this.sc = c = new m(this); ++g < d; ) c.add(g);
k && (g = this.head.indexOf(k.id), -1 === g && (g = Math.min(k.idx, d - 1)), this.sort(g, k.desc));
return this;
};
f._sort = function(d, g) {
g ? (this.s = g, g(d)) : (g = this.s) && g(d);
return d;
};
f.sort = function(d, g) {
this._sort(this.idxs, n(this, d, g));
this.sc.activate(d, g);
return this;
};
f = null;
f = m.prototype;
f.has = function(d) {
return null != this[d];
};
f.add = function(d) {
const g = this, c = g.t.head.cells[d];
g[d] = {
desc: null,
idx: d,
id: c.id
};
g.length++;
c.addClass("wg-sortable").on("click", function(k) {
if ("header" === k.target.nodeName.toLowerCase()) return k.stopImmediatePropagation(), 
g.toggle(d), !1;
});
return g;
};
f.toggle = function(d) {
this.t.sort(d, !this[d].desc).clear().render();
return this;
};
f.activate = function(d, g) {
let c, k = this.active, q = this[d], v = this.t.head.cells;
k && (c = v[k.idx]) && (c.removeClass(k.css), k !== q && c.restyle());
(c = v[d]) ? (q.desc = g, this.active = q, d = "wg-" + (g ? "desc" : "asc"), c.addClass(d).restyle(), 
q.css = d) : this.active = null;
return this;
};
f = null;
f = h.prototype;
f.render = function(d) {
let g, c = [], k = this._, q = this.length;
if (k) {
for (this.c = c; 0 !== q--; ) g = k.cloneNode(!1), c[q] = this.update(q, g), g.$index = this.i, 
d[q].appendChild(g);
this._ = null;
} else for (c = this.c; 0 !== q--; ) d[q].appendChild(c[q]);
this.rendered = !0;
return this;
};
f.update = function(d, g) {
g = g || this.c[d] || {};
d = (this.d[d] || function() {})() || " ";
null == d.innerHTML ? g.textContent = d : g.innerHTML = d.innerHTML;
return g;
};
f.cells = function() {
return this.c || [ this._ ];
};
f.data = function() {
let d = -1;
const g = [], c = this.length;
for (;++d < c; ) g[d] = this.cellVal(d);
return g;
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
const g = this.h, c = r("wg-dead");
c.style.height = String(g) + "px";
d.appendChild(c);
return this.dead = c;
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
let g, c = -1, k = this.rows, q = k.length;
const v = this.dead, y = this.live, z = y.childNodes;
for (;++c < q; ) g = k[c], g.rendered || g.render(z);
q = d.length;
for (c = 0; c < q; c++) z[c].style.width = d[c];
v.parentNode.replaceChild(y, v);
this.rendered = !0;
this.h = null;
return this;
};
f.sleep = function() {
const d = this.height(), g = this.live, c = this.dead;
c.style.height = String(d) + "px";
g.parentNode.replaceChild(c, g);
this.rendered = !1;
this.h = d;
return this;
};
f.sleepH = function(d) {
d *= this.rows.length;
const g = this.dead;
g && (g.style.height = String(d) + "px");
this.rendered || (this.h = d);
return this;
};
f.widths = function(d) {
const g = this.live.childNodes;
let c = d.length;
for (;0 !== c--; ) g[c].style.width = d[c];
return this;
};
f.destroy = function() {
var d = this.rendered ? this.live : this.dead;
const g = this.rows;
d.parentNode.removeChild(d);
for (d = g.length; 0 !== d--; ) g[d].destroy();
};
f = null;
return w;
}({}, J, L));
B.register("$44", function(w, u, C) {
function x(c, k) {
var q = c.id;
let v = q && f[q], y = v && v.parent();
if (!v || !y) return null;
var z = 1 === y.dir;
q = z ? "X" : "Y";
let D = "page" + q;
z = z ? b : h;
let F = z(y.el);
q = k["offset" + q];
let E = y.el, G = E.className;
null == q && (q = k[D] - z(c));
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
function r(c) {
function k() {
A(C).off("mousemove", q);
g && (g.done(), g = null);
return !0;
}
function q(v) {
g ? g.move(v) : k();
return !0;
}
if (g) return !0;
g = x(c.target, c);
if (!g) return !0;
A(C).one("mouseup", k).on("mousemove", q);
return e(c);
}
function t(c, k) {
const q = k.type;
"touchmove" === q ? g && g.move(k) : "touchstart" === q ? g = x(c.target, k) : "touchend" === q && g && (g.done(), 
g = null);
}
function e(c) {
c.stopPropagation();
c.preventDefault();
return !1;
}
function a(c) {
d && d.redraw();
c && c.redraw();
return d = c;
}
function l(c, k) {
const q = A(k);
q.on("editFocus", function() {
q.trigger("wgFocus", [ a(c) ]);
}).on("editBlur", function() {
q.trigger("wgBlur", [ a(null) ]);
});
}
function n(c) {
const k = c.id, q = c.className;
this.id = k;
this.el = c;
this.pos = this.index = 0;
this.css = [ q || "wg-root", "wg-cell" ];
this._cn = q;
f[k] = this;
this.clear();
}
const p = B.include("$46", "html.js") || B.include("$2", "html.js", !0), m = B.require("$27", "dom.js"), h = m.top, b = m.left, f = {};
let d, g = !1;
w.init = function(c) {
const k = new n(c);
k.redraw();
B.require("$47", "touch.js").ok(function(q) {
q.dragger(c, t);
});
A(c).on("mousedown", r);
return k;
};
u = n.prototype;
u.fire = function(c, k) {
c = A.Event(c);
c.cell = this;
A(this.el).trigger(c, k);
return this;
};
u.each = function(c) {
let k = -1;
const q = this.cells, v = q.length;
for (;++k < v; ) c(q[k], k);
return this;
};
u.indexOf = function(c) {
return (c = f[c.id || String(c)]) && c.pid === this.id ? c.index : -1;
};
u.on = function() {
return this.$("on", arguments);
};
u.off = function() {
return this.$("off", arguments);
};
u.find = function(c) {
return A(this.el).find(c);
};
u.$ = function(c, k) {
A.fn[c].apply(A(this.el), k);
return this;
};
u.addClass = function(c) {
this.css.push(c);
return this;
};
u.removeClass = function(c) {
c = this.css.indexOf(c);
-1 !== c && this.css.splice(c, 1);
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
u._split = function(c, k) {
(this.length || this.field) && this.clear();
let q = -1;
let v = k.length, y = 1 / v, z = 0;
for (;++q < v; ) {
var D = m.el();
this.body.appendChild(D);
var F = D;
{
var E = k[q];
let G = 1, H = E;
for (;f[E]; ) E = H + "-" + ++G;
}
F.id = E;
D = new n(D);
D.index = q;
D.pid = this.id;
D._locale(this.lang, this.rtl);
D.pos = z;
z += y;
this.cells.push(D);
this.length++;
}
this.dir = c;
this.redraw();
return this.cells;
};
u.destroy = function() {
this.clear();
delete f[this.id];
const c = this.el;
c.innerHTML = "";
this.body = null;
c.className = this._cn || "";
A(c).off();
return this;
};
u.exists = function() {
return this === f[this.id];
};
u.clear = function() {
const c = this.el, k = this.cells, q = this.field, v = this.body, y = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete f[k[z].destroy().id];
this.cells = [];
this.length = 0;
y && (c.removeChild(y), this.nav = null);
v && (q && (q.destroy(), this.field = null), this.table && (this.table = null), 
c === v.parentNode && c.removeChild(v));
this.body = c.appendChild(m.el("", "wg-body"));
this._h = null;
return this;
};
u.resize = function(c, k) {
if (!k && (k = this.cells[1], !k)) return;
var q = k.index;
let v = this.cells, y = A(this.el)[1 === this.dir ? "width" : "height"](), z = v[q + 1];
q = v[q - 1];
k.pos = Math.min((z ? z.pos * y : y) - ((k.body || k.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * y : 0, c)) / y;
this.redraw();
return this;
};
u.distribute = function(c) {
let k = -1, q = 0, v;
const y = this.cells, z = c.length;
for (;++k < z && (v = y[++q]); ) v.pos = Math.max(0, Math.min(1, c[k]));
this.redraw();
return this;
};
u.distribution = function() {
let c = [], k = 0;
const q = this.cells, v = q.length - 1;
for (;k < v; ) c[k] = q[++k].pos;
return c;
};
u.restyle = function() {
let c = this.css.concat();
0 === this.index ? c.push("first") : c.push("not-first");
this.dir && (c.push("wg-split"), 2 === this.dir ? c.push("wg-split-y") : c.push("wg-split-x"));
this.t && c.push("has-title");
this.nav && c.push("has-nav");
this.field && (c.push("is-field"), this.field.editable() ? c.push("is-editable") : c.push("is-readonly"));
c = c.join(" ");
c !== this._css && (this._css = c, this.el.className = c);
return this;
};
u.redraw = function(c) {
this.restyle();
const k = this.el;
var q = this.body, v = this.field;
if (q) {
var y = k.clientWidth || 0, z = k.clientHeight || 0, D = q.offsetTop || 0;
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
for (D = 2 === this.dir ? "height" : "width"; 0 !== q--; ) v = this.cells[q], z ? F = 1 : (v.fixed && (v.pos = v.fixed / A(k)[D]()), 
F = y - v.pos, y = v.pos), v.el.style[D] = String(100 * F) + "%", v.redraw(c);
return this;
};
u.contents = function(c, k) {
const q = this.el;
let v = this.body;
if (null == c) return v.innerHTML;
this.length ? this.clear() : v && (q.removeChild(v), v = null);
v || (this.body = v = q.appendChild(m.el("", k || "wg-content")), this._h = null, 
(k = this.lang) && this._locale(k, this.rtl, !0));
"string" === typeof c ? A(v)._html(c) : c && this.append(c);
this.redraw();
return this;
};
u.textarea = function(c, k) {
let q = this.field;
if (q) {
var v = q.editable();
q.reload(c, k);
v !== k && this.restyle();
} else this.length && this.clear(), v = m.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.value = c, this.contents(v), q = B.require("$48", "field.js")._new(v)[k ? "enable" : "disable"](), 
l(this, v), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
u.locale = function(c) {
c = B.require("$42", "locale.js").cast(c);
return this._locale(String(c), c.isRTL());
};
u._locale = function(c, k, q) {
const v = this.body;
if (q || c !== this.lang) this.lang = c, v && v.setAttribute("lang", c);
if (q || k !== this.rtl) this.rtl = k, v && v.setAttribute("dir", k ? "RTL" : "LTR");
return this;
};
u.editable = function() {
let c = this.field;
if (c) return c.editable() ? c : null;
let k = this.cells, q = k.length, v = this.navigated();
if (null != v) return k[v].editable();
for (;++v < q; ) if (c = k[v].editable()) return c;
};
u.eachTextarea = function(c) {
const k = this.field;
k ? c(k) : this.each(function(q) {
q.eachTextarea(c);
});
return this;
};
u.append = function(c) {
c && (c.nodeType ? p.init(this.body.appendChild(c)) : p.init(A(c).appendTo(this.body)));
return this;
};
u.prepend = function(c) {
const k = this.body;
if (c.nodeType) {
const q = k.firstChild;
p.init(q ? k.insertBefore(c, q) : k.appendChild(c));
} else p.init(A(c).prependTo(k));
return this;
};
u.before = function(c) {
const k = this.body;
c.nodeType ? p.init(this.el.insertBefore(c, k)) : p.init(A(c).insertBefore(k));
return this;
};
u.header = function(c, k) {
if (null == c && null == k) return this.el.getElementsByTagName("header")[0];
this.t = m.txt(c || "");
this.el.insertBefore(m.el("header", k), this.body).appendChild(this.t);
this.redraw();
return this;
};
u.toolbar = function() {
const c = this.header(), k = c.getElementsByTagName("nav");
return 0 === k.length ? c.appendChild(m.el("nav")) : k[0];
};
u.title = function(c) {
const k = this.t;
if (k) return k.nodeValue = c || "", k;
this.header(c);
return this.t;
};
u.titled = function() {
return this.t && this.t.nodeValue;
};
u.bodyY = function() {
return h(this.body, this.el);
};
u.scrollY = function(c) {
if (ka === c) return this.body.scrollTop;
this.body.scrollTop = c;
};
u.tabulate = function(c) {
let k = this.table;
k ? k.clear() : k = B.require("$49", "wgtable.js").create(this);
k.init(c);
return this.table = k;
};
u.lock = function() {
this.body.className += " locked";
return this;
};
u.scrollTo = function(c, k) {
let q = this.body;
var v = q.scrollTop;
let y = h(c, q);
if (v > y) v = y; else {
const z = q.clientHeight;
c = y + A(c).outerHeight();
if (z + v < c) v = c - z; else return;
}
k ? q.scrollTop = v : A(q).stop(!0).animate({
scrollTop: v
}, 250);
};
u.navigize = function(c, k) {
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
D = v.nav = v.el.insertBefore(m.el("nav", "wg-tabs"), v.body);
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
return e(G);
});
null == k && (k = E.data("idx") || 0);
v.each(function(G, H) {
y[H] = A('<a href="#' + G.id + '"></a>').data("idx", H).text(c[H]).appendTo(E);
G.pos = 0;
A(G.el).hide();
});
q(z[k] ? k : 0);
v.lock();
v.redraw();
return v;
};
u.navigated = function() {
const c = this.nav;
if (c) return A(c).data("idx");
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
let g = f.find("span.lang");
d ? (d = B.require("$42", "locale.js").cast(d), g.length || (g = A("<span></span>").prependTo(f)), 
g.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (g.remove(), 
d = "en");
b.locale(d);
return f;
}
function t(b, f, d) {
f.on("click", function(g) {
const c = b.fire(d, [ g.target ]);
c || g.preventDefault();
return c;
});
}
function e() {
this.dirty = 0;
}
B.require("$3", "number.js");
const a = B.require("$41", "string.js").html, l = B.require("$6", "string.js").sprintf;
let n, p;
w.extend = function(b) {
return b.prototype = new e();
};
w.localise = function(b) {
p = b;
return w;
};
const m = function() {
const b = C.createElement("p"), f = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
b.innerHTML = d.replace(f, "data-x-loco-$1=");
const g = b.textContent.trim();
return g ? g.replace("data-x-loco-", "") : d.trim();
};
}();
let h = e.prototype = B.require("$43", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
return this.$t || p || B.require("$1", "t.js").init();
};
h.localise = function(b) {
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
h.setRootCell = function(b) {
function f(g) {
d.redraw(!0, g);
return !0;
}
const d = B.require("$44", "wingrid.js").init(b);
A(u).on("resize", f);
this.redraw = f;
A(b).on("wgFocus wgBlur", function(g, c) {
g.stopPropagation();
n = c;
});
this.destroy = function() {
d.destroy();
A(u).off("resize", f);
};
this.rootDiv = b;
return d;
};
h.$ = function() {
return A(this.rootDiv);
};
h.setListCell = function(b) {
const f = this;
f.listCell = b;
b.on("wgRowSelect", function(d, g) {
f.loadMessage(f.po.row(g));
return !0;
}).on("wgRowDeselect", function(d, g, c) {
c || f.loadNothing();
return !0;
});
};
h.setSourceCell = function(b) {
this.sourceCell = b;
};
h.setTargetCell = function(b) {
this.targetCell = b;
};
h.next = function(b, f, d) {
const g = this.listTable, c = this.po;
let k = g.selected(), q = k, v;
for (;null != (k = g.next(b, d, k)); ) {
if (q === k) {
k = null;
break;
}
if (f && (v = c.row(k), v.translated(0))) continue;
break;
}
null != k && g.select(k, !0);
return k;
};
h.current = function(b) {
const f = this.active;
if (null == b) return f;
b ? b.is(f) ? this.reloadMessage(b) : this.loadMessage(b) : this.unloadActive();
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
h.searchable = function(b) {
b && (this.dict = b, this.po && this.rebuildSearch());
return this.dict && !0;
};
h.rebuildSearch = function() {
const b = this.po.rows, f = b.length, d = this.dict;
d.clear();
let g = -1;
for (;++g < f; ) d.add(g, b[g].toText());
};
h.filtered = function() {
return this.lastSearch || "";
};
h.filter = function(b, f) {
const d = this.listTable;
let g, c = this.lastFound, k = this.lastSearch;
if (b) {
if (k === b) return c || 0;
if (k && !c && 0 === b.indexOf(k)) return 0;
g = this.dict.find(b);
}
this.lastSearch = k = b;
this.lastFound = c = g ? g.length : this.po.length;
g ? d.filter(g) : d.unfilter();
f || this.fire("poFilter", [ k, c ]);
return c;
};
h.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
h.unsave = function(b, f) {
let d = !1;
if (b) {
if (d = b.saved(f)) this.dirty++, b.unsave(f), this.fire("poUnsaved", [ b, f ]);
this.markUnsaved(b);
}
return d;
};
h.markUnsaved = function(b) {
var f = this.po.indexOf(b);
if ((f = this.listTable.tr(f)) && f.length) {
const d = f[0].className;
b = d.replace(/(?:^| +)po-[a-z]+/g, "") + " " + x(b);
b !== d && A(f).attr("class", b);
}
};
h.save = function(b) {
const f = this.po;
if (this.dirty || b) f.each(function(d, g) {
g.save();
}), this.listCell.find("div.po-unsaved").removeClass("po-unsaved"), this.dirty = 0, 
this.fire("poSave", []);
return f;
};
h.fire = function(b, f) {
const d = this.handle;
if (d && d[b] && !1 === d[b].apply(this, f || [])) return !1;
b = A.Event(b);
this.$().trigger(b, f);
return !b.isDefaultPrevented();
};
h.on = function(b, f) {
this.$().on(b, f);
return this;
};
h.getSorter = function() {
return null;
};
h.reload = function() {
const b = this;
var f = b.listCell;
const d = b.po;
var g = d && d.locale();
const c = g && g.isRTL(), k = d && d.length || 0;
if (!d || !d.row) return f && f.clear().header("Error").contents("Invalid messages list"), 
!1;
b.targetLocale = g;
b.lastSearch && (b.lastSearch = "", b.lastFound = k, b.fire("poFilter", [ "", k ]));
let q;
(g = b.listTable) && (q = g.thead().distribution());
b.listTable = g = f.tabulate({
eachCol: function(v) {
const y = b.getListColumns(), z = b.getListHeadings();
for (const D in y) {
const F = y[D];
v(F, D, z[F]);
}
},
eachRow: function(v) {
d.each(function(y, z) {
b.validate(z);
v(z.idx, b.getListEntry(z), x(z));
});
},
sort: b.getSorter()
});
f = b.getListColumns();
for (const v in f) g.sortable(f[v]);
q && g.thead().distribute(q);
g.tbody().$(c ? "addClass" : "removeClass", [ "is-rtl" ]);
b.fire("poLoad", []);
return !!k;
};
h.load = function(b, f) {
this.po = b;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== f ? this.listTable.selectRow(f || 0) : this.active && this.unloadActive());
};
h.pasteMessage = function(b) {
let f, d = 0;
this.validate(b);
this.active === b && ((f = this.sourceCell) && f.eachTextarea(function(g) {
g.val(b.source(null, d++));
}), (f = this.contextCell) && f.eachTextarea(function(g) {
g.val(b.context());
}), f = this.targetCell) && (d = 0, f.eachTextarea(function(g) {
g.val(b.translation(d++));
}));
this.updateListCell(b, "source");
this.updateListCell(b, "target");
return this;
};
h.reloadMessage = function(b) {
const f = this.sourceCell, d = this.targetCell;
this.pasteMessage(b);
f && this.setSrcMeta(b, f) && f.redraw();
if (d) {
var g = d.navigated() || 0;
g = this.setTrgMeta(b, g, d);
!f && this.setSrcMeta(b, d) && (g = !0);
g && (d.redraw(), this.markUnsaved(b));
}
return this;
};
h.setStatus = function() {
return null;
};
h.setSrcMeta = function(b, f) {
const d = [];
var g = this.labels;
let c = !1, k = this.$smeta;
var q = b.context();
let v = [], y = b.tags(), z = y && y.length;
q && (v.push("<span>" + a(g[4]) + "</span>"), v.push('<mark class="ctxt">' + a(q) + "</mark>"));
if (z && this.getTag) for (v.push("<span>Tagged:</span>"), g = -1; ++g < z; ) (q = this.getTag(y[g])) && v.push("<mark>" + a(q.mod_name) + "</mark>");
v.length && d.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (q = b.refs()) && (y = q.split(/\s/), z = y.length)) {
for (v = []; 0 <= --z; ) q = y[z], v.push("<code>" + a(q) + "</code>");
d.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(q = b.notes()) && d.push('<p class="has-icon icon-info">' + a(q, !0) + "</p>");
d.length ? (k || (k = f.find("div.meta"), k.length || (k = A('<div class="meta"></div>').insertAfter(f.header())), 
t(this, k, "poMeta"), this.$smeta = k), k.html(d.join("\n")).show(), c = !0) : k && k.text() && (k.text("").hide(), 
c = !0);
return c;
};
h.setTrgMeta = function(b, f, d) {
const g = [];
f = (b = b.errors(f)) && b.length;
var c = !1;
let k = this.$tmeta;
if (f) {
for (c = 0; c < f; c++) g.push('<p class="has-icon icon-warn">' + a(b[c], !0) + ".</p>");
k || (k = d.find("div.meta"), k.length || (k = A('<div class="meta"></div>').insertAfter(d.header())), 
this.$tmeta = k);
k.html(g.join("\n")).show();
c = !0;
} else k && k.text() && (k.text("").hide(), c = !0);
return c;
};
h.loadMessage = function(b) {
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
g(da, V);
});
} else P && M.redraw(), M.textarea(b.source(), T).setStrf(E).setMode(Z).setInvs(D), 
T && g(M, 0);
}
function g(M, K) {
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
function c(M, K, T, P) {
I && K.eachTextarea(function(W) {
W.ping();
});
K.off();
var R = T.isKnown() && T.label || "Target";
R = l(ba[3], R);
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
I && k(V, aa);
});
K.navigize(X, P || null).on("wgTabSelect", function(V, aa) {
(V = I && V.cell.editable()) && V.focus();
y.setTrgMeta(b, aa, K);
y.setStatus(b, aa);
y.fire("poTab", [ aa ]);
});
} else R && K.redraw(), K.textarea(b.translation(), I && !b.disabled(0)).setStrf(E).setMode(Z).setInvs(D), 
I && k(K, 0);
}
function k(M, K) {
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
let ea = 0, Z = y.mode, fa = n;
y.html !== z && (y.html = z, "code" !== y.mode && (Z = z ? "html" : "", y.setMode(Z)));
y.active = b;
H && d(H, ha);
O && q(O);
N && ja && (ea = N.navigated() || 0, c(H, N, ja, ea));
S && v(S);
fa && (fa.exists() || (fa = fa.parent()), (z = fa.editable()) && z.focus());
F !== E && (this.fmt = E);
G || y.fire("poSelected", [ b, ea ]);
};
h.unloadActive = function() {
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
h.loadNothing = function() {
const b = this.t(), f = this.mode || "", d = this.inv || !1, g = this.fmt;
this.unloadActive();
this.setStatus(null);
let c = this.commentCell;
c && c.textarea("", !1);
if (c = this.sourceCell) c.textarea("", !1).setStrf(g).setMode(f).setInvs(d), c.title(b._x("Source text not loaded", "Editor") + ":");
if (c = this.contextCell) c.textarea("", !1).setMode(f).setInvs(d), c.title(b._x("Context not loaded", "Editor") + ":");
if (c = this.targetCell) c.textarea("", !1).setStrf(g).setMode(f).setInvs(d), c.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
h.updateListCell = function(b, f) {
f = this.getListColumns()[f];
b = this.po.indexOf(b);
(b = this.listTable.row(b)) && b.rendered && b.update(f);
};
h.cellText = function(b) {
return (b = -1 !== b.indexOf("<") || -1 !== b.indexOf("&") ? m(b) : b.trim()) || " ";
};
h.fuzzy = function(b, f, d) {
f = f || this.active;
const g = f.fuzzy(d);
!0 !== b || g ? !1 === b && g && this.flag(0, f, d) && this.fire("poFuzzy", [ f, !1, d ]) : this.flag(4, f, d) && this.fire("poFuzzy", [ f, !0, d ]);
return g;
};
h.flag = function(b, f, d) {
if (!f) {
f = this.active;
d = this.getTargetOffset();
if (null == d) return null;
d && f.targetForms() && (d = 0);
}
const g = f.flagged(d);
if (null == b) return g;
if (g === b || b && !f.translated(d) || !this.fire("poFlag", [ b, g, f, d ])) return !1;
f.flag(b, d);
this.fire("poUpdate", [ f ]) && this.unsave(f, d);
this.setStatus(f, d);
return !0;
};
h.add = function(b, f) {
let d, g = this.po.get(b, f);
g ? d = this.po.indexOf(g) : (d = this.po.length, g = this.po.add(b, f), this.load(this.po, -1), 
this.fire("poAdd", [ g ]), this.fire("poUpdate", [ g ]));
this.lastSearch && this.filter("");
this.listTable.select(d);
return g;
};
h.del = function(b) {
if (b = b || this.active) {
var f = this.lastSearch, d = this.po.del(b);
null != d && (this.unsave(b), this.fire("poDel", [ b ]), this.fire("poUpdate", [ b ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(b) && this.unloadActive(), 
this.po.length && (f && this.filter(f), this.active || (d = Math.min(d, this.po.length - 1), 
this.listTable.select(d))));
}
};
h.setMono = function(b) {
return this.setMode(b ? "code" : this.html ? "html" : "");
};
h.setMode = function(b) {
if (this.mode !== b) {
this.mode = b;
this.callTextareas(function(g) {
g.setMode(b);
});
const f = this.active, d = this.sourceCell;
f && f.refs() && d && this.setSrcMeta(f, d) && d.redraw();
}
return this;
};
h.getMono = function() {
return "code" === this.mode;
};
h.setInvs = function(b) {
(this.inv || !1) !== b && (this.inv = b, this.callTextareas(function(f) {
f.setInvs(b);
}), this.fire("poInvs", [ b ]));
return this;
};
h.getInvs = function() {
return this.inv || !1;
};
h.callTextareas = function(b) {
var f = this.targetCell;
f && f.eachTextarea(b);
(f = this.contextCell) && f.eachTextarea(b);
(f = this.sourceCell) && f.eachTextarea(b);
return this;
};
h.focus = function() {
const b = this.getTargetEditable();
b && b.focus();
return this;
};
h.validate = function(b) {
return 0;
};
h = null;
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
function r(m) {
m = A('<button type="button" class="button button-small icon icon-' + m + ' hastip"></button>');
B.require("$12", "tooltip.js").init(m);
return m;
}
function t(m) {
return r("cloud").attr("title", m.labels[8] + " (Ctrl-U)").on("click", function(h) {
h.preventDefault();
m.focus().fuzzy(!m.fuzzy());
});
}
function e(m) {
return r("robot").attr("title", m.labels[9] + " (Ctrl-J)").on("click", function(h) {
h.preventDefault();
m.fire("poHint");
});
}
function a() {
const m = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return function(h) {
const b = {};
let f = 0, d = 0;
var g;
let c, k = 0;
for (;null != (g = m.exec(h)); ) c = g[2], "%" !== c && ("" === c || -1 === "suxXbcdeEfFgGo".indexOf(c) ? k++ : (null == g[1] ? g = ++d : (g = parseInt(g[1]), 
f = Math.max(f, g)), null == b[g] && (b[g] = {}), b[g][c] = !0));
return {
count: Math.max(f, d),
valid: 0 === k,
types: b
};
};
}
function l(m) {
null == p && (p = a());
return p(m);
}
function n(m, h) {
return B.require("$6", "string.js").vsprintf(m, h);
}
w.init = function(m) {
const h = new x();
m = h.setRootCell(m);
var b = m.splity("po-list", "po-edit");
let f = b[0], d = b[1];
b = d.splitx("po-trans", "po-comment");
var g = b[0];
let c = b[1].header("Loading..");
b = g.splity("po-source", "po-target");
g = b[0].header("Loading..");
b = b[1].header("Loading..");
m.distribute([ .34 ]);
d.distribute([ .8 ]);
h.setListCell(f);
h.setSourceCell(g);
h.setTargetCell(b);
h.commentCell = c;
h.editable.source = !1;
return h;
};
u = x.prototype = B.require("$30", "base.js").extend(x);
u.getListHeadings = function() {
const m = this.t(), h = [ m._x("Source text", "Editor") ];
this.targetLocale && (h[1] = m._x("Translation", "Editor"));
return h;
};
u.getListColumns = function() {
const m = {
source: 0
};
this.targetLocale && (m.target = 1);
return m;
};
u.getListEntry = function(m) {
const h = this.cellText, b = [ function() {
let f, d = h(m.source() || ""), g = m.context();
return g ? (f = C.createElement("p"), f.appendChild(C.createElement("mark")).innerText = g, 
f.appendChild(C.createTextNode(" " + d)), f) : d;
} ];
this.targetLocale && (b[1] = function() {
return h(m.translation() || "");
});
return b;
};
u.stats = function() {
let m = this.po, h = m.length, b = 0, f = 0, d = 0;
m.each(function(g, c) {
c.fuzzy() ? d++ : c.translated() ? b++ : f++;
});
return {
t: h,
p: b.percent(h) + "%",
f: d,
u: f
};
};
u.unlock = function() {
const m = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
m && (this._unlocked = m, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
u.lock = function() {
const m = this._unlocked;
m && (this.targetLocale = m, delete this._unlocked, this.po && this.po.lock(m), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, m ]), 
this.active && this.loadMessage(this.active));
};
u.locked = function() {
return !this._unlocked;
};
u.setStatus = function(m) {
let h = this.$tnav;
if (null == m) h && (h.remove(), this.$tnav = null); else {
h || (this.$tnav = h = A("<nav></nav>").append(t(this)).append(e(this)).appendTo(this.targetCell.header()));
var b = [];
m.translated() ? m.fuzzy() && b.push("po-fuzzy") : b.push("po-empty");
h.attr("class", b.join(" "));
}
};
u.getSorter = function() {
function m(f, d) {
const g = f.weight(), c = d.weight();
return g === c ? h(f, d) : g > c ? -1 : 1;
}
function h(f, d) {
return f.hash().localeCompare(d.hash());
}
const b = this;
return function(f) {
const d = b.po, g = b.locked() ? m : h;
f.sort(function(c, k) {
return g(d.row(c), d.row(k));
});
};
};
u.validate = function(m) {
const h = this, b = [], f = [], d = this.fmt || "";
let g = 0, c = 0, k = 0;
"" !== d && "no-" === d.substring(0, 3) || m.eachSrc(function(q, v) {
v = l(v);
const y = v.count;
v.valid && (f[q] = v, k = Math.max(k, y), c = c ? Math.min(c, y) : y);
});
m.eachMsg(function(q, v) {
b[q] = [];
if ("" !== v && (k || d)) {
v = l(v);
var y = v.count;
if (y > k) b[q].push(n(h.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ k ])), 
g++; else if (y < c && 1 === m.count()) b[q].push(n(h.t()._("Missing placeholders; source text formatting suggests at least %s"), [ c ])), 
g++; else if (!v.valid) b[q].push(h.t()._("Possible syntax error in string formatting")), 
g++; else if (f[q]) {
y = f[q].types;
let z, D;
for (z in v.types) for (D in v.types[z]) if (null == y[z] || null == y[z][D]) {
b[q].push(h.t()._("Mismatching placeholder type; check against source text formatting"));
g++;
return;
}
}
}
});
m.err = g ? b : null;
return g;
};
u.handle = {};
let p;
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
66: function(e, a) {
if (e = a.current()) e.normalize(), a.focus().pasteMessage(e);
},
75: function(e, a) {
if (e = a.current()) e.untranslate(), a.focus().pasteMessage(e);
},
85: function(e, a) {
a.focus().fuzzy(!a.fuzzy());
},
13: function(e, a) {
a.getFirstEditable() && a.next(1, !0, !0);
},
40: function(e, a) {
e = e.shiftKey;
a.next(1, e, e);
},
38: function(e, a) {
e = e.shiftKey;
a.next(-1, e, e);
},
73: function(e, a) {
if (!e.shiftKey) return !1;
a.setInvs(!a.getInvs());
}
};
w.init = function(e, a) {
function l(p) {
if (p.isDefaultPrevented() || !p.metaKey && !p.ctrlKey) return !0;
const m = p.which;
if (!n[m]) return !0;
const h = t[m];
if (!h) throw console.log(n, t), Error("command undefined #" + m);
if (p.altKey || p.shiftKey && !r[m] || !1 === h(p, e)) return !0;
p.stopPropagation();
p.preventDefault();
return !1;
}
const n = {};
A(a || u).on("keydown", l);
return {
add: function(p, m) {
t[x[p]] = m;
return this;
},
enable: function() {
for (const p in arguments) n[x[arguments[p]]] = !0;
return this;
},
disable: function() {
A(a || u).off("keydown", l);
e = a = null;
for (const p in t) n[p] = !1;
}
};
};
return w;
}({}, J, L));
B.register("$31", function(w, u, C) {
function x() {
this.reIndex([]);
}
w.init = function() {
return new x();
};
u = x.prototype;
u.reIndex = function(r) {
for (var t = {}, e = -1, a = r.length; ++e < a; ) t[r[e]] = e;
this.keys = r;
this.length = e;
this.ords = t;
};
u.key = function(r, t) {
if (null == t) return this.keys[r];
var e = this.keys[r], a = this.ords[t];
if (t !== e) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[r] = t;
delete this.ords[e];
this.ords[t] = r;
}
return r;
};
u.indexOf = function(r) {
r = this.ords[r];
return null == r ? -1 : r;
};
u.add = function(r, t) {
var e = this.ords[r];
null == e && (this.keys[this.length] = r, e = this.ords[r] = this.length++);
this[e] = t;
return e;
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
var e = [].splice.call(this, r, t);
this.keys.splice(r, t);
this.reIndex(this.keys);
return e;
};
u.each = function(r) {
for (var t = -1, e = this.keys, a = this.length; ++t < a; ) r(e[t], this[t], t);
return this;
};
u.sort = function(r) {
for (var t = -1, e = this.length, a, l = this.keys, n = this.ords, p = []; ++t < e; ) p[t] = [ this[t], l[t] ];
p.sort(function(m, h) {
return r(m[0], h[0]);
});
for (t = 0; t < e; t++) a = p[t], this[t] = a[0], a = a[1], l[t] = a, n[a] = t;
return this;
};
u.join = function(r) {
return [].join.call(this, r);
};
u = null;
return w;
}({}, J, L));
B.register("$32", function(w, u, C) {
function x(r, t) {
var e = new RegExp("^.{0," + (r - 1) + "}[" + t + "]"), a = new RegExp("^[^" + t + "]+");
return function(l, n) {
for (var p = l.length, m; p > r; ) {
m = e.exec(l) || a.exec(l);
if (null == m) break;
m = m[0];
n.push(m);
m = m.length;
p -= m;
l = l.substring(m);
}
0 !== p && n.push(l);
return n;
};
}
w.create = function(r) {
function t(h) {
return n[h] || "\\" + h;
}
var e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, l = /[\t\v\f\x07\x08\\"]/g, n = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == r || isNaN(r = Number(r))) r = 79;
if (0 < r) {
var p = x(r - 3, " ");
var m = x(r - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(h, b) {
if (!b) return h + ' ""';
b = b.replace(l, t);
var f = 0;
b = b.replace(e, function() {
f++;
return "\\n\n";
});
if (!(f || r && r < b.length + h.length + 3)) return h + ' "' + b + '"';
h = [ h + ' "' ];
b = b.split("\n");
if (m) for (var d = -1, g = b.length; ++d < g; ) m(b[d], h); else h = h.concat(b);
return h.join('"\n"') + '"';
},
prefix: function(h, b) {
h = h.split(e);
return b + h.join("\n" + b);
},
refs: function(h) {
h = h.replace(a, " ", h);
p && (h = p(h, []).join("\n#: "));
return "#: " + h;
}
};
};
return w;
}({}, J, L));
B.register("$45", function(w, u, C) {
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
for (var t = -1, e = this.length; ++t < e; ) r(t, this[t]);
return this;
};
return w;
}({}, J, L));
B.register("$33", function(w, u, C) {
function x() {}
w.extend = function(r) {
return r.prototype = new x();
};
u = x.prototype = B.require("$43", "abstract.js").init([ "add", "load" ]);
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
var r = this.loc;
this.loc = null;
return r;
};
u.locale = function(r) {
null == r ? r = this.loc : this.loc = r = B.require("$42", "locale.js").cast(r);
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
var t = this.rows.cut(r, 1);
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(e, a, l) {
a.idx = l;
}), r;
}
};
u.reIndex = function(r, t) {
var e = this.indexOf(r), a = r.hash(), l = this.rows.indexOf(a);
return l === e ? e : -1 !== l ? (t = (t || 0) + 1, r.source("Error, duplicate " + String(t) + ": " + r.source()), 
this.reIndex(r, t)) : this.rows.key(e, a);
};
u.sort = function(r) {
this.rows.sort(r);
return this;
};
u.export = function() {
for (var r = -1, t = this.rows, e = t.length, a = B.require("$45", "list.js").init(); ++r < e; ) a.push(t[r]);
return a;
};
u = null;
return w;
}({}, J, L));
B.register("$34", function(w, u, C) {
function x(e, a, l) {
if (null == l) return e[a] || "";
e[a] = l || "";
return e;
}
function r() {
this._id = this.id = "";
}
function t(e, a) {
const l = e.length;
let n = -1;
for (;++n < l; ) a(n, e[n]);
}
w.extend = function(e) {
return e.prototype = new r();
};
u = r.prototype;
u.flag = function(e, a) {
const l = this.flg || (this.flg = []);
if (null != a) l[a] = e; else for (a = Math.max(l.length, this.src.length, this.msg.length); 0 !== a--; ) l[a] = e;
return this;
};
u.flagged = function(e) {
const a = this.flg || [];
if (null != e) return a[e] || 0;
for (e = a.length; 0 !== e--; ) if (a[e]) return !0;
return !1;
};
u.flags = function() {
const e = {}, a = [], l = this.flg || [];
let n = l.length;
for (;0 !== n--; ) {
const p = l[n];
e[p] || (e[p] = !0, a.push(p));
}
return a;
};
u.flaggedAs = function(e, a) {
const l = this.flg || [];
if (null != a) return e === l[a] || 0;
for (a = l.length; 0 !== a--; ) if (l[a] === e) return !0;
return !1;
};
u.fuzzy = function(e, a) {
const l = this.flaggedAs(4, e);
null != a && this.flag(a ? 4 : 0, e);
return l;
};
u.source = function(e, a) {
if (null == e) return this.src[a || 0] || "";
this.src[a || 0] = e;
return this;
};
u.plural = function(e, a) {
if (null == e) return this.src[a || 1] || "";
this.src[a || 1] = e || "";
return this;
};
u.sourceForms = function() {
return this.srcF;
};
u.targetForms = function() {
return this.msgF;
};
u.each = function(e) {
const a = this.src, l = this.msg, n = Math.max(a.length, l.length);
let p = -1;
for (;++p < n; ) e(p, a[p], l[p]);
return this;
};
u.eachSrc = function(e) {
t(this.src, e);
return this;
};
u.eachMsg = function(e) {
t(this.msg, e);
return this;
};
u.count = function() {
return Math.max(this.src.length, this.msg.length);
};
u.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
u.translate = function(e, a) {
this.msg[a || 0] = e || "";
return this;
};
u.untranslate = function(e) {
if (null != e) this.msg[e] = ""; else {
const a = this.msg, l = a.length;
for (e = 0; e < l; e++) a[e] = "";
}
return this;
};
u.translation = function(e) {
return this.msg[e || 0] || "";
};
u.errors = function(e) {
return this.err && this.err[e || 0] || [];
};
u.valid = function() {
return null == this.err;
};
u.translated = function(e) {
if (null != e) return !!this.msg[e];
const a = this.msg, l = a.length;
for (e = 0; e < l; e++) if (!a[e]) return !1;
return !0;
};
u.untranslated = function(e) {
if (null != e) return !this.msg[e];
const a = this.msg, l = a.length;
for (e = 0; e < l; e++) if (a[e]) return !1;
return !0;
};
u.comment = function(e) {
return x(this, "cmt", e);
};
u.notes = function(e) {
return x(this, "xcmt", e);
};
u.refs = function(e) {
return x(this, "rf", e);
};
u.format = function(e) {
return x(this, "fmt", e);
};
u.context = function(e) {
return x(this, "ctx", e);
};
u.tags = function() {
return this.tg;
};
u.toString = u.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
u.weight = function() {
let e = 0;
this.translation() || (e += 2);
this.fuzzy() && (e += 1);
return e;
};
u.equals = function(e) {
return this === e || this.hash() === e.hash();
};
u.hash = function() {
return this.id;
};
u.normalize = function() {
let e = this.msg.length;
for (;0 !== e--; ) this.msg[e] = this.src[e] || "";
};
u.disabled = function(e) {
return !!(this.lck || [])[e || 0];
};
u.disable = function(e) {
(this.lck || (this.lck = []))[e || 0] = !0;
return this;
};
u.saved = function(e) {
const a = this.drt;
if (null == a) return !0;
if (null != e) return !a[e];
for (e = a.length; 0 !== e--; ) if (a[e]) return !1;
return !0;
};
u.unsave = function(e) {
(this.drt || (this.drt = []))[e || 0] = !0;
return this;
};
u.save = function(e) {
null == e ? this.drt = null : (this.drt || (this.drt = []))[e] = !1;
return this;
};
u.is = function(e) {
return e && (e === this || e.idx === this.idx);
};
u.isHTML = function(e) {
if (null == e) return this.htm || !1;
this.htm = e;
};
u = null;
return w;
}({}, J, L));
B.register("$15", function(w, u, C) {
function x(n) {
return {
"Project-Id-Version": "PACKAGE VERSION",
"Report-Msgid-Bugs-To": "",
"POT-Creation-Date": n || "",
"PO-Revision-Date": n || "",
"Last-Translator": "",
"Language-Team": "",
Language: "",
"Plural-Forms": "",
"MIME-Version": "1.0",
"Content-Type": "text/plain; charset=UTF-8",
"Content-Transfer-Encoding": "8bit"
};
}
function r(n, p) {
n = n || "";
p && (n += "\0" + p);
return n;
}
function t(n) {
var p = u.console;
p && p.error && p.error(n.message || String(n));
}
function e(n) {
return B.require("$32", "format.js").create(n);
}
function a(n) {
this.locale(n);
this.clear();
this.head = x(this.now());
}
function l(n, p) {
this.src = [ n || "" ];
this.msg = [ p || "" ];
}
w.create = function(n) {
return new a(n);
};
C = B.require("$33", "messages.js").extend(a);
C.clear = function() {
this.rows = B.require("$31", "collection.js").init();
this.length = 0;
return this;
};
C.now = function() {
function n(d, g) {
for (d = String(d); d.length < g; ) d = "0" + d;
return d;
}
var p = new Date(), m = p.getUTCFullYear(), h = p.getUTCMonth() + 1, b = p.getUTCDate(), f = p.getUTCHours();
p = p.getUTCMinutes();
return n(m, 4) + "-" + n(h, 2) + "-" + n(b, 2) + " " + n(f, 2) + ":" + n(p, 2) + "+0000";
};
C.header = function(n, p) {
var m = this.head || (this.head = {});
if (null == p) return this.headers()[n] || "";
m[n] = p || "";
return this;
};
C.headers = function(n) {
var p = this.now(), m = this.head || (this.head = x(p));
if (null != n) {
for (b in n) m[b] = n[b];
return this;
}
var h = this.locale();
n = {};
for (b in m) n[b] = String(m[b]);
if (h) {
n.Language = String(h) || "zxx";
n["Language-Team"] = h.label || n.Language;
n["Plural-Forms"] = "nplurals=" + (h.nplurals || "2") + "; plural=" + (h.pluraleq || "n!=1") + ";";
var b = "PO-Revision-Date";
} else n.Language = "", n["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
n["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date";
n[b] || (n[b] = p);
n["X-Generator"] = "Loco https://localise.biz/";
return n;
};
C.get = function(n, p) {
n = r(n, p);
return this.rows.get(n);
};
C.add = function(n, p) {
n instanceof l || (n = new l(n));
p && n.context(p);
p = n.hash();
this.rows.get(p) ? t("Duplicate message at index " + this.indexOf(n)) : (n.idx = this.rows.add(p, n), 
this.length = this.rows.length);
return n;
};
C.load = function(n) {
for (var p = -1, m, h, b, f, d, g, c = (b = this.locale()) && b.nplurals || 2, k = []; ++p < n.length; ) m = n[p], 
null == m.parent ? (h = m.source || m.id, b = m.target || "", f = m.context, h || f ? (d = new l(h, b), 
d._id = m._id, f && d.context(f), m.flag && d.flag(m.flag, 0), m.comment && d.comment(m.comment), 
m.notes && d.notes(m.notes), m.refs && d.refs(m.refs), d.format(m.format), m.message = d, 
this.add(d), m.prev && m.prev[0] && (d.prev(m.prev[0].source, m.prev[0].context), 
m.prev[1] && d._src.push(m.prev[1].source || ""))) : 0 === p && "object" === typeof b && (this.head = b, 
this.headcmt = m.comment)) : k.push(m);
for (p = -1; ++p < k.length; ) try {
m = k[p];
h = m.source || m.id;
d = n[m.parent] && n[m.parent].message;
if (!d) throw Error("parent missing for plural " + h);
g = m.plural;
1 === g && d.plural(h);
g >= c || (m.flag && d.flag(m.flag, g), d.translate(m.target || "", g), m.format && !d.format() && d.format(m.format));
} catch (q) {
t(q);
}
return this;
};
C.wrap = function(n) {
this.fmtr = e(n);
return this;
};
C.toString = function() {
var n, p = this.locale(), m = [], h = [], b = this.headers(), f = !p, d = p && p.nplurals || 2, g = this.fmtr || e();
b[p ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (n in b) h.push(n + ": " + b[n]);
h = new l("", h.join("\n"));
h.comment(this.headcmt || "");
f && h.fuzzy(0, !0);
m.push(h.toString());
m.push("");
this.rows.each(function(c, k) {
c && (m.push(k.cat(g, f, d)), m.push(""));
});
return m.join("\n");
};
C = B.require("$34", "message.js").extend(l);
C.prev = function(n, p) {
this._src = [ n || "" ];
this._ctx = p;
};
C.hash = function() {
return r(this.source(), this.context());
};
C.toString = function() {
return this.cat(e());
};
C.cat = function(n, p, m) {
var h = [], b;
(b = this.cmt) && h.push(n.prefix(b, "# "));
(b = this.xcmt) && h.push(n.prefix(b, "#. "));
var f = this.rf;
if (b = this._id) f += (f ? " " : "") + "loco:" + b;
f && /\S/.test(f) && h.push(n.refs(f));
!p && this.fuzzy() && h.push("#, fuzzy");
(b = this.fmt) && h.push("#, " + b + "-format");
(b = this._ctx) && h.push(n.prefix(n.pair("msgctxt", b), "#| "));
if (b = this._src) b[0] && h.push(n.prefix(n.pair("msgid", b[0]), "#| ")), b[1] && h.push(n.prefix(n.pair("msgid_plural", b[1]), "#| "));
(b = this.ctx) && h.push(n.pair("msgctxt", b));
h.push(n.pair("msgid", this.src[0]));
if (null == this.src[1]) h.push(n.pair("msgstr", p ? "" : this.msg[0])); else for (f = -1, 
h.push(n.pair("msgid_plural", this.src[1])), b = this.msg || [ "", "" ], m = m || b.length; ++f < m; ) h.push(n.pair("msgstr[" + f + "]", p ? "" : b[f] || ""));
return h.join("\n");
};
C.compare = function(n, p) {
var m = this.weight(), h = n.weight();
if (m > h) return 1;
if (m < h) return -1;
if (p) {
m = this.hash().toLowerCase();
h = n.hash().toLowerCase();
if (m < h) return 1;
if (m > h) return -1;
}
return 0;
};
C.copy = function() {
var n = new l(), p, m;
for (p in this) this.hasOwnProperty(p) && ((m = this[p]) && m.concat && (m = m.concat()), 
n[p] = m);
return n;
};
C = C = null;
return w;
}({}, J, L));
B.register("$17", function(w, u, C) {
w.init = function(x, r) {
function t() {
return n || (n = A('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function e(p, m, h) {
p = A("<p></p>").text(h);
t().dialog("close").html("").dialog("option", "title", "Error").append(p).dialog("open");
}
function a(p) {
const m = p && p.code;
if (m) {
for (var h = m.length, b = A("<ol></ol>").attr("class", p.type), f = -1; ++f < h; ) A("<li></li>").html(m[f]).appendTo(b);
b.find("li").eq(p.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", p.path + ":" + p.line).append(b).dialog("open");
}
}
function l(p) {
p = p.target;
const m = A(p).find("li.highlighted")[0];
p.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(p.clientHeight / 2));
}
let n;
return {
load: function(p) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", l);
p = A.extend({
ref: p,
path: r.popath
}, r.project || {});
x.ajax.post("fsReference", p, a, e);
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
const a = C.createElement("p"), l = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, n = /<[a-z]+\s/i;
let p, m;
return {
sniff: function(h) {
if (h === p) return m;
p = h;
if (l.test(h) || n.test(h)) if (a.innerHTML = h, a.textContent !== h) return m = !0;
return m = !1;
}
};
}
w.create = function(a, l) {
l && "function" === typeof l.create || console.error("module.create is not callable");
l = l.create(x);
l.init(a);
return l;
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
const l = (u.loco || {}).notices;
l && l.error && l.error(String(this) + ": " + String(a));
};
t.xhrError = function(a, l, n) {
try {
const p = a.responseText, m = p && u.JSON.parse(p);
n = m && this.parseError(m) || n;
} catch (p) {}
return n || this.httpError(a);
};
t.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
t.parseError = function(a) {
return a && a.error || "";
};
t.mapLang = function(a, l) {
const n = String(a).replace("_", "-").toLowerCase();
var p = a.lang;
l = l[n] || l[p] || [];
a = l.length;
if (0 === a) return p;
if (1 < a) for (p = -1; ++p < a; ) {
const m = l[p];
if (m === n) return m;
}
return l[0];
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
t.translate = function(a, l, n) {
return this.batch([ a ], l, this.isHtml(a), n);
};
t.verify = function(a) {
return this.translate("OK", {
lang: "fr",
toString: function() {
return "fr";
}
}, function(l, n) {
a(n && "OK" === l);
});
};
t.hash = function() {
return this.key();
};
t._call = function(a) {
const l = this;
l.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(n, p, m) {
l.stderr(l.xhrError(n, p, m));
};
return l.abortable(A.ajax(a));
};
t.abortable = function(a) {
const l = this;
a.always(function() {
l.$r === a && (l.$r = null);
});
return l.$r = a;
};
t.abort = function() {
const a = this.$r;
a && a.abort();
};
t.isHtml = function(a) {
return (e || (e = r())).sniff(a);
};
let e;
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
function e(c) {
let k = {
length: 0,
html: c.html,
sources: []
};
d.push(k);
return g[c.html ? 1 : 0] = k;
}
function a(c, k) {
let q = c.source(null, k);
if (q && (c.untranslated(k) || t)) if (k = f[q]) k.push(c); else {
k = q.length;
var v = l.isHtml(q);
v = g[v ? 1 : 0];
var y = v.sources;
if (b && k > b) m++; else {
if (v.length + k > h || 50 === y.length) v = e(v), y = v.sources;
y.push(q);
f[q] = [ c ];
v.length += k;
n += k;
p += 1;
}
}
}
let l = this.api, n = 0, p = 0, m = 0, h = 1e4, b = l.maxChr(), f = {}, d = [], g = [];
b && (h = Math.min(h, b));
e({
html: !1
});
e({
html: !0
});
r.each(function(c, k) {
a(k, 0);
a(k, 1);
});
g = [];
this.map = f;
this.chars = n;
this.length = p;
this.batches = d;
this.locale = r.locale();
m && l.stderr("Strings over " + h + " characters long will be skipped");
};
u.abort = function() {
this.state = "abort";
return this;
};
u.dispatch = function() {
function r(z, D) {
function F(S, I, Q) {
D !== Q && (z === I || 1 < S && E.source(null, 1) === z) && (E.translate(D, S), 
O++, k++);
return O;
}
if (!t()) return !1;
if (!D) return !0;
let E, G = b[z] || [], H = G.length, N = -1, O;
for (g++; ++N < H; ) if (E = G[N]) O = 0, E.each(F), O && p("each", [ E ]);
return !0;
}
function t() {
return "abort" === m.state ? (h && (h.abort(), n()), !1) : !0;
}
function e() {
let z = f.shift(), D;
z ? (D = z.sources) && D.length ? h.batch(D, d, z.html, r).fail(a).always(l) : l() : n();
}
function a() {
m.abort();
n();
}
function l() {
c++;
p("prog", [ c, v ]);
t() && e();
}
function n() {
h = f = null;
p("done");
}
function p(z, D) {
z = y[z] || [];
let F = z.length;
for (;0 <= --F; ) z[F].apply(null, D);
}
let m = this, h = m.api, b = m.map, f = m.batches || [], d = m.locale, g = 0, c = 0, k = 0, q = m.length, v = f.length, y = {
done: [],
each: [],
prog: []
};
m.state = "";
e();
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
return Math.max(q - g, 0);
},
did: function() {
return g;
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
(x.prototype = new r()).batch = function(t, e, a, l) {
function n(h) {
const b = t.length;
let f = -1;
for (;++f < b && !1 !== l(t[f], h[f], e); );
}
const p = u.loco;
a = {
hook: this.getId(),
type: a ? "html" : "text",
locale: String(e),
source: this.getSrc(),
sources: t
};
const m = A.Deferred();
this.abortable(p.ajax.post("apis", a, function(h) {
n(h && h.targets || []);
m.resolve();
}, function() {
n([]);
m.reject();
}));
return m.promise();
};
return new x();
};
return w;
}({}, J, L));
B.register("$36", {
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
const e = (t = t.message) && /^Wrong endpoint\. Use (https?:\/\/[-.a-z]+)/.exec(t);
e && this.base(this.key()) === e[1] && (t = "Only the v2 API is supported");
return t;
};
r.base = function(t) {
let e = this.param("api");
e ? e = this.fixURL(e) : (e = "https://api", ":fx" === t.substring(t.length - 3) && (e += "-free"), 
e += ".deepl.com");
return e;
};
r.getLangMap = function() {
return B.require("$36", "deepl.json");
};
r.verify = function(t) {
const e = this.key(), a = this.base(e);
return this._call({
url: a + "/v2/usage",
data: {
auth_key: e
}
}).done(function() {
t(!0);
}).fail(function() {
t(!1);
});
};
r.batch = function(t, e, a, l) {
function n(g) {
const c = t.length;
let k = -1;
for (;++k < c && !1 !== l(t[k], (g[k] || {}).text || "", e); );
}
const p = this;
a = p.key();
const m = p.base(a), h = p.getSrc().substring(0, 2), b = p.mapLang(e, p.getLangMap());
let f = e.tone, d = "default";
"formal" === f ? d = "more" : "informal" === f && (d = "less");
return p._call({
url: m + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: h.toUpperCase(),
target_lang: b.toUpperCase(),
formality: d,
preserve_formatting: "1",
auth_key: a,
text: t
}
}).done(function(g, c, k) {
g.translations ? n(g.translations) : (p.stderr(p.parseError(g) || p.httpError(k)), 
n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$37", {
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
const e = [], a = t.error.errors || [], l = a.length;
let n = -1;
for (;++n < l; ) e.push(a[n].message || "");
return "Error " + t.error.code + ": " + e.join(";");
}
return "";
};
r.getLangMap = function() {
return B.require("$37", "google.json");
};
r.batch = function(t, e, a, l) {
function n(b) {
const f = t.length;
let d = -1;
for (;++d < f && !1 !== l(t[d], (b[d] || {}).translatedText || "", e); );
}
const p = this, m = p.getSrc();
a = a ? "html" : "text";
const h = p.mapLang(e, p.getLangMap());
return p._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + h + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: p.key(),
q: t
}
}).done(function(b, f, d) {
b.data ? n(b.data.translations || []) : (p.stderr(p.parseError(b) || p.httpError(d)), 
n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$38", {
zh: [ "zh", "zh-cn", "zh-tw" ],
pt: [ "pt", "pt-pt", "pt-br" ]
});
B.register("$23", function(w, u, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.parseError = function(t) {
var e = t.details || {};
let a = e.message;
e = e.texts;
return a ? (e && e !== a && (a += "; " + e), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(l) {
l += -1 === l.indexOf("?") ? "?" : "&";
return l + "ref=loco";
}), "Error " + (t.status || "0") + ": " + a) : "";
};
r.maxChr = function() {
return 1e3;
};
r.getLangMap = function() {
return B.require("$38", "lecto.json");
};
r.batch = function(t, e, a, l) {
function n(b) {
const f = t.length;
let d = -1, g = (b[0] || {
translated: []
}).translated || [];
for (;++d < f && (b = g[d] || "", !1 !== l(t[d], b, e)); );
}
const p = this;
a = this.getSrc();
const m = p.param("api") || "https://api.lecto.ai", h = p.mapLang(e, p.getLangMap());
return p._call({
url: p.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ h ],
from: a,
texts: t
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": p.key(),
Accept: "application/json"
}
}).done(function(b, f, d) {
b ? n(b.translations || []) : (p.stderr(p.parseError(b) || p.httpError(d)), n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$39", {
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
return B.require("$39", "ms.json");
};
r.region = function() {
return this.param("region") || "global";
};
r.hash = function() {
return this.key() + this.region();
};
r.batch = function(t, e, a, l) {
function n(g) {
let c = -1;
for (var k; ++c < b && (k = g[c] || {}, k = k.translations || [], k = k[0] || {}, 
!1 !== l(t[c], k.text || "", e)); );
}
let p = this, m = [], h = p.getSrc(), b = t.length, f = -1;
a = a ? "html" : "plain";
let d = p.mapLang(e, p.getLangMap());
for (;++f < b; ) m.push({
Text: t[f]
});
return p._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + h + "&to=" + d + "&textType=" + a,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": p.region()
}
}).done(function(g, c, k) {
g && g.length ? n(g) : (p.stderr(p.parseError(g) || p.httpError(k)), n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, J, L));
B.register("$25", function(w, u, C) {
w.init = function(x) {
function r() {
O || (F.on("click", m), O = A('<div id="loco-fs-creds"></div>').dialog({
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
G && (e(A(g)), G = !1);
if (q && N) {
var I = N, Q = A(E);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (e(A(E)), H = !1);
}
function e(I) {
I.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function a() {
if (q) return O && O.dialog("close"), t(), A(x).find('button[type="submit"]').attr("disabled", !1), 
A(u).triggerHandler("resize"), d && d(!0), !0;
y && O ? (G || (A(g).removeClass("jshide").hide().fadeIn(500), G = !0), H && (e(A(E)), 
H = !1)) : t();
A(x).find('input[type="submit"]').attr("disabled", !0);
d && d(!1);
return !1;
}
function l(I) {
var Q, Y = S || {};
for (Q in Y) if (Y.hasOwnProperty(Q)) {
var ha = Y[Q];
I[Q] ? I[Q].value = ha : A('<input type="hidden" />').attr("name", Q).appendTo(I).val(ha);
}
}
function n(I) {
I.preventDefault();
I = A(I.target).serializeArray();
f(I);
k = !0;
return !1;
}
function p(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function m(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function h(I) {
q = I.authed;
c = I.method;
A(g).find("span.loco-msg").text(I.message || "Something went wrong.");
N = I.warning || "";
I.notice && v.notices.info(I.notice);
if (q) "direct" !== c && (S = I.creds, l(x), k && I.success && v.notices.success(I.success)), 
a(); else if (I.reason) v.notices.info(I.reason); else if (I = I.prompt) {
var Q = r();
Q.html(I).find("form").on("submit", n);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", p);
Q.find('input[type="submit"]').addClass("button-primary");
a();
A(u).triggerHandler("resize");
} else v.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function b() {
a();
}
function f(I) {
k = !1;
v.ajax.setNonce("fsConnect", D).post("fsConnect", I, h, b);
return I;
}
var d, g = x, c = null, k = !1, q = !1, v = u.loco, y = x.path.value, z = x.auth.value, D = x["loco-nonce"].value, F = A(g).find("button.button-primary"), E = C.getElementById(g.id + "-warn"), G = !1, H = !1, N = "", O;
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
if (I.nodeType) l(I); else {
var Q, Y = S || {};
for (Q in Y) Y.hasOwnProperty(Q) && (I[Q] = Y[Q]);
}
return this;
},
setForm: function(I) {
x = I;
a();
l(I);
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
B.register("$40", function(w, u, C) {
function x(a, l) {
return function(n) {
a.apply(n, l);
return n;
};
}
function r(a) {
return function(l, n) {
l = l && l[a] || 0;
n = n && n[a] || 0;
return l === n ? 0 : l > n ? 1 : -1;
};
}
function t(a) {
return function(l, n) {
return (l && l[a] || "").localeCompare(n && n[a] || "");
};
}
function e(a) {
return function(l, n) {
return -1 * a(l, n);
};
}
w.sort = function(a, l, n, p) {
l = "n" === n ? r(l) : t(l);
p && (l = e(l));
return x([].sort, [ l ])(a);
};
return w;
}({}, J, L));
B.register("$26", function(w, u, C) {
w.init = function(x) {
function r(g) {
var c = -1, k = g.length;
for (A("tr", h).remove(); ++c < k; ) h.appendChild(g[c].$);
}
function t(g) {
n = g ? f.find(g, e) : e.slice(0);
m && (g = a[m], n = d(n, m, g.type, g.desc));
r(n);
}
var e = [], a = [], l = 0, n, p, m, h = x.getElementsByTagName("tbody")[0], b = x.getElementsByTagName("thead")[0], f = B.require("$10", "fulltext.js").init(), d = B.require("$40", "sort.js").sort;
b && h && (A("th", b).each(function(g, c) {
var k = c.getAttribute("data-sort-type");
k && (g = l, A(c).addClass("loco-sort").on("click", function(q) {
q.preventDefault();
q = g;
var v = a[q], y = v.type, z = !(v.desc = !v.desc);
n = d(n || e.slice(0), q, y, z);
r(n);
p && p.removeClass("loco-desc loco-asc");
p = A(v.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
m = q;
return !1;
}), a[l] = {
$: c,
type: k
});
c.hasAttribute("colspan") ? l += Number(c.getAttribute("colspan")) : l++;
}), A("tr", h).each(function(g, c) {
var k, q, v = [], y = {
_: g,
$: c
}, z = c.getElementsByTagName("td");
for (k in a) {
c = z[k];
(q = c.textContent.replace(/(^\s+|\s+$)/g, "")) && v.push(q);
c.hasAttribute("data-sort-value") && (q = c.getAttribute("data-sort-value"));
switch (a[k].type) {
case "n":
q = Number(q);
}
y[k] = q;
}
e[g] = y;
f.index(g, v);
}), x = A('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
b = A(x.form), 1 < e.length ? B.require("$11", "LocoTextListener.js").listen(x, t) : b.hide(), 
b.on("submit", function(g) {
g.preventDefault();
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
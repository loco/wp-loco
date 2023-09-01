"use strict";

(function(J, L, z, ka) {
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
"function" !== t && (r = function(d) {
return 1 != d;
});
return r;
}
w.init = function(r) {
function t(k, p, l) {
return (k = g[k]) && k[l] ? k[l] : p || "";
}
function d(k) {
return t(k, k, 0);
}
function a(k, p) {
return t(p + "" + k, k, 0);
}
function n(k, p, l) {
l = Number(r(l));
isNaN(l) && (l = 0);
return t(k, l ? p : k, l);
}
r = x(r);
var g = {};
return {
__: d,
_x: a,
_n: n,
_: d,
x: a,
n: n,
load: function(k) {
g = k || {};
return this;
},
pluraleq: function(k) {
r = x(k);
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
var d = Math.pow(10, x || 0);
x = [];
d = String(Math.round(d * this) / d);
var a = d.split(".");
d = a[0];
a = a[1];
let n = d.length;
do {
x.unshift(d.substring(n - 3, n));
} while (0 < (n -= 3));
d = x.join(t || ",");
if (a) {
{
t = a;
x = t.length;
let g;
for (;"0" === t.charAt(--x); ) g = x;
g && (t = t.substring(0, g));
a = t;
}
a && (d += (r || ".") + a);
}
return d;
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
var d = 0;
1 < arguments.length && (d = Number(arguments[1]), d != d ? d = 0 : 0 != d && Infinity != d && -Infinity != d && (d = (0 < d || -1) * Math.floor(Math.abs(d))));
if (d >= t) return -1;
for (d = 0 <= d ? d : Math.max(t - Math.abs(d), 0); d < t; d++) if (d in r && r[d] === x) return d;
return -1;
});
return w;
}({}, J, L));
B.register("$5", function(w, u, C) {
C = u.JSON;
C || (C = {
parse: z.parseJSON,
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
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, a, n) {
if ("%" === n) return "%";
d = a ? r[Number(a) - 1] : r[t++];
return null != d ? String(d) : "s" === n ? "" : "0";
});
};
return w;
}({}, J, L));
B.register("$27", function(w, u, C) {
function x(r) {
return function(t, d) {
let a = t[r] || 0;
for (;(t = t.offsetParent) && t !== (d || C.body); ) a += t[r] || 0;
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
function x(e, m, q) {
function v() {
y();
A = setTimeout(m, q);
}
function y() {
A && clearTimeout(A);
A = 0;
}
let A = 0;
v();
z(e).on("mouseenter", y).on("mouseleave", v);
return {
die: function() {
y();
z(e).off("mouseenter mouseleave");
}
};
}
function r(e, m) {
e.fadeTo(m, 0, function() {
e.slideUp(m, function() {
e.remove();
z(u).triggerHandler("resize");
});
});
return e;
}
function t(e, m) {
function q(G) {
l[D] = null;
r(z(e), 250);
A && A.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function v(G) {
A && A.die();
return A = x(e, q, G);
}
const y = z(e);
let A, D, F, E = y.find("button");
0 === E.length && (y.addClass("is-dismissible"), E = z('<button type="button" class="notice-dismiss"> </a>').appendTo(y));
E.off("click").on("click", q);
z(u).triggerHandler("resize");
p();
D = l.length;
l.push(q);
m && (A = v(m));
return {
link: function(G, H) {
var N = H || G;
H = z(e).find("nav");
G = z("<nav></nav>").append(z("<a></a>").attr("href", G).text(N));
F ? (F.push(G.html()), H.html(F.join("<span> | </span>"))) : (F = [ G.html() ], 
z(e).addClass("has-nav").append(G));
return this;
},
stick: function() {
A && A.die();
A = null;
l[D] = null;
return this;
},
slow: function(G) {
v(G || 1e4);
return this;
}
};
}
function d(e, m, q) {
const v = B.require("$27", "dom.js").el;
e = z('<div class="notice notice-' + e + ' loco-notice inline"></div>').prependTo(z("#loco-notices"));
const y = z(v("p"));
q = z(v("span")).text(q);
m = z(v("strong", "has-icon")).text(m + ": ");
y.append(m).append(q).appendTo(e);
return e;
}
function a(e, m, q, v) {
e = d(q, m, e).css("opacity", "0").fadeTo(500, 1);
z(u).triggerHandler("resize");
return t(e, v);
}
function n(e) {
return a(e, f, "warning");
}
function g() {
z("#loco-notices").find("div.notice").each(function(e, m) {
-1 === m.className.indexOf("jshide") && (e = -1 === m.className.indexOf("notice-success") ? null : 5e3, 
t(m, e));
});
}
const k = u.console || {
log: function() {}
}, p = Date.now || function() {
return new Date().getTime();
};
let l = [], b, f, c, h;
w.error = function(e) {
return a(e, b, "error");
};
w.warn = n;
w.info = function(e) {
return a(e, c, "info");
};
w.success = function(e) {
return a(e, h, "success", 5e3);
};
w.warning = n;
w.log = function() {
k.log.apply(k, arguments);
};
w.debug = function() {
(k.debug || k.log).apply(k, arguments);
};
w.clear = function() {
let e = -1;
const m = l, q = m.length;
for (;++e < q; ) {
const v = m[e];
v && v.call && v();
}
l = [];
return w;
};
w.create = d;
w.raise = function(e) {
(w[e.type] || w.error).call(w, e.message);
};
w.convert = t;
w.init = function(e) {
b = e._("Error");
f = e._("Warning");
c = e._("Notice");
h = e._("OK");
setTimeout(g, 1e3);
return w;
};
return w;
}({}, J, L));
B.register("$8", function(w, u, C) {
function x(f) {
let c = z("<pre>" + f + "</pre>").text();
c && (c = c.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
c || (c = f) || (c = "Blank response from server");
return c;
}
function r(f) {
return (f = f.split(/[\r\n]/)[0]) ? (f = f.replace(/ +in +\S+ on line \d+/, ""), 
f = f.replace(/^[()! ]+Fatal error:\s*/, "")) : l._("Server returned invalid data");
}
function t(f) {
u.console && console.error && console.error('No nonce for "' + f + '"');
return "";
}
function d(f, c, h) {
f[c] = h;
}
function a(f, c, h) {
f.push({
name: c,
value: h
});
}
function n(f, c, h) {
f.append(c, h);
}
function g(f, c, h, e) {
function m(v, y, A) {
if ("abort" !== y) {
var D = l || {
_: function(O) {
return O;
}
}, F = v.status || 0, E = v.responseText || "", G = x(E), H = v.getResponseHeader("Content-Type") || "Unknown type", N = v.getResponseHeader("Content-Length") || E.length;
"success" === y && A ? q.error(A) : (q.error(r(G) + ".\n" + D._("Check console output for debugging information")), 
q.log("Ajax failure for " + f, {
status: F,
error: y,
message: A,
output: E
}), "parsererror" === y && (A = "Response not JSON"), q.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + F + ' "' + (A || D._("Unknown error")) + '" (' + H + " " + N + " bytes)", G, "====" ].join("\n")));
h && h.call && h(v, y, A);
b = v;
}
}
e.url = k;
e.dataType = "json";
const q = B.require("$7", "notices.js").clear();
b = null;
return z.ajax(e).fail(m).done(function(v, y, A) {
const D = v && v.data, F = v && v.notices, E = F && F.length;
!D || v.error ? m(A, y, v && v.error && v.error.message) : c && c(D, y, A);
for (v = -1; ++v < E; ) q.raise(F[v]);
});
}
const k = u.ajaxurl || "/wp-admin/admin-ajax.php";
let p = {}, l, b;
w.init = function(f) {
p = f.nonces || p;
return w;
};
w.localise = function(f) {
l = f;
return w;
};
w.xhr = function() {
return b;
};
w.strip = x;
w.parse = r;
w.submit = function(f, c, h) {
function e(A, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function m(A, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function q(A) {
A.find(".button-primary").removeClass("loading");
A.find("button").each(m);
A.find("input").each(m);
A.find("select").each(m);
A.find("textarea").each(m);
A.removeClass("disabled loading");
}
const v = z(f), y = v.serialize();
(function(A) {
A.find(".button-primary").addClass("loading");
A.find("button").each(e);
A.find("input").each(e);
A.find("select").each(e);
A.find("textarea").each(e);
A.addClass("disabled loading");
})(v);
return g(f.route.value, function(A, D, F) {
q(v);
c && c(A, D, F);
}, function(A, D, F) {
q(v);
h && h(A, D, F);
}, {
type: f.method,
data: y
});
};
w.post = function(f, c, h, e) {
let m = !0, q = c || {}, v = p[f] || t(f);
u.FormData && q instanceof FormData ? (m = !1, c = n) : c = Array.isArray(q) ? a : d;
c(q, "action", "loco_json");
c(q, "route", f);
c(q, "loco-nonce", v);
return g(f, h, e, {
type: "post",
data: q,
processData: m,
contentType: m ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, c, h, e) {
c = c || {};
const m = p[f] || t(f);
c.action = "loco_json";
c.route = f;
c["loco-nonce"] = m;
return g(f, h, e, {
type: "get",
data: c
});
};
w.setNonce = function(f, c) {
p[f] = c;
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
w.cast = function(d) {
return d instanceof x ? d : "string" === typeof d ? w.parse(d) : w.clone(d);
};
w.clone = function(d) {
const a = new x();
for (const n in d) a[n] = d[n];
return a;
};
w.parse = function(d) {
d = (t || (t = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(d);
if (!d) return null;
const a = new x();
a.lang = d[1].toLowerCase();
a.region = (d[2] || "").toUpperCase();
a.variant = (d[3] || "").toLowerCase();
return a;
};
u = x.prototype;
u.isValid = function() {
return !!this.lang;
};
u.isKnown = function() {
const d = this.lang;
return !(!d || "zxx" === d);
};
u.toString = function(d) {
d = d || "_";
let a = this.lang || "zxx";
this.region && (a += d + this.region);
this.variant && (a += d + this.variant);
return a;
};
u.getIcon = function() {
let d = 3, a = [];
const n = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const g = n[d], k = this[g];
k && (a.push(g), a.push(g + "-" + k.toLowerCase()));
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
function x(l) {
return g[l] || l;
}
function r(l, b, f) {
let c, h, e = String(l || "").toLowerCase().replace(n, x).split(k), m = e.length;
for (;0 !== m--; ) if ((l = e[m]) && null == f[l]) for (b.push(l), f[l] = !0, c = l.split(p), 
h = c.length; 0 !== h--; ) (l = c[h]) && null == f[l] && (b.push(l), f[l] = !0);
return b;
}
function t(l) {
return r(l, [], {});
}
function d(l) {
let b = [], f = {}, c = l.length;
for (;0 !== c--; ) r(l[c], b, f);
return b;
}
let a = [];
const n = /[^a-z0-9]/g, g = B.require("$29", "flatten.json"), k = /\s+/, p = /[^\d\p{L}]+/u;
return {
split: t,
find: function(l, b) {
{
let f = [], c = -1, h = a, e = h.length, m, q, v, y, A, D = String(l || "").toLowerCase().replace(n, x).split(" "), F = D.length, E = !!b;
a: for (;++c < e; ) if (q = h[c], null != q && (v = q.length)) {
y = 0;
b: for (;y < F; y++) {
A = D[y];
for (l = 0; l < v; l++) if (m = q[l], 0 === m.indexOf(A)) continue b;
continue a;
}
f.push(E ? b[c] : c);
}
b = f;
}
return b;
},
add: function(l, b) {
a[l] = t(b);
},
push: function(l) {
a[a.length] = d(l);
},
index: function(l, b) {
a[l] = d(b);
},
size: function() {
return a.length;
},
clear: function() {
a = [];
},
remove: function(l) {
a[l] = null;
}
};
};
return w;
}({}, J, L));
B.register("$11", function(w, u, C) {
w.listen = function(x, r) {
function t() {
c[g ? "show" : "hide"]();
}
function d(h) {
f && l.setAttribute("size", 2 + h.length);
g = h;
t();
return h;
}
function a() {
k = null;
r(g);
}
function n(h) {
var e = l.value;
b && e === b && (e = "");
e !== g ? (k && clearTimeout(k), d(e), h ? k = setTimeout(a, h) : a()) : k && null == h && (clearTimeout(k), 
a());
}
var g, k, p = 150, l = x instanceof jQuery ? x[0] : x, b = u.attachEvent && l.getAttribute("placeholder"), f = 1 === Number(l.size), c = z('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
l.value = "";
n();
return !1;
});
d(l.value);
z(l).on("input", function() {
n(p);
return !0;
}).on("blur focus change", function() {
n(null);
return !0;
}).after(c);
t();
return {
delay: function(h) {
p = h;
return this;
},
ping: function(h) {
h ? (k && clearTimeout(k), h = l.value, b && h === b && (h = ""), d(h), a(), h = void 0) : h = n();
return h;
},
val: function(h) {
if (null == h) return g;
k && clearTimeout(k);
l.value = d(h);
t();
},
el: function() {
return l;
},
blur: function(h) {
return z(l).on("blur", h);
},
destroy: function() {
k && clearTimeout(k);
}
};
};
return w;
}({}, J, L));
B.register("$12", function(w, u, C) {
function x(a, n) {
return "function" == typeof a ? a.call(n) : a;
}
function r(a, n) {
this.$element = z(a);
this.options = n;
this.enabled = !0;
this.fixTitle();
}
w.init = function(a, n) {
let g = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: d,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
n && (g = z.extend({}, g, n));
a.tipsy(g);
};
w.delays = function(a, n) {
t = a || 150;
d = n || 100;
};
w.kill = function() {
z("div.tipsy").remove();
};
w.text = function(a, n) {
n.data("tipsy").setTitle(a);
};
let t, d;
w.delays();
z(C.body).on("overlayOpened overlayClosing", function(a) {
w.kill();
return !0;
});
r.prototype = {
show: function() {
var a = this.getTitle();
if (a && this.enabled) {
var n = this.tip();
n.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
n[0].className = "tipsy";
n.remove().css({
top: 0,
left: 0
}).prependTo(C.body);
a = (a = this.options.anchor) ? this.$element.find(a) : this.$element;
a = z.extend({}, a.offset(), {
width: a[0].offsetWidth,
height: a[0].offsetHeight
});
var g = n[0].offsetWidth, k = n[0].offsetHeight, p = x(this.options.gravity, this.$element[0]);
switch (p.charAt(0)) {
case "n":
var l = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "s":
l = {
top: a.top - k - this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "e":
l = {
top: a.top + a.height / 2 - k / 2,
left: a.left - g - this.options.offset
};
break;

case "w":
l = {
top: a.top + a.height / 2 - k / 2,
left: a.left + a.width + this.options.offset
};
}
2 == p.length && ("w" == p.charAt(1) ? l.left = a.left + a.width / 2 - 15 : l.left = a.left + a.width / 2 - g + 15);
n.css(l).addClass("tipsy-" + p);
n.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + p.charAt(0);
this.options.className && n.addClass(x(this.options.className, this.$element[0]));
n.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var a = this.$element, n = a.attr("title") || "";
(n || "string" !== typeof a.attr("original-title")) && a.attr("original-title", n).removeAttr("title");
},
getTitle: function() {
var a, n = this.$element, g = this.options;
this.fixTitle();
"string" == typeof g.title ? a = n.attr("title" == g.title ? "original-title" : g.title) : "function" == typeof g.title && (a = g.title.call(n[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || g.fallback;
},
setTitle: function(a) {
var n = this.$element;
n.attr("default-title") || n.attr("default-title", this.getTitle());
null == a && (a = n.attr("default-title") || this.getTitle());
n.attr("original-title", a);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
},
tip: function() {
this.$tip || (this.$tip = z('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
z.fn.tipsy = function(a) {
function n(b) {
var f = z.data(b, "tipsy");
f || (f = new r(b, z.fn.tipsy.elementOptions(b, a)), z.data(b, "tipsy", f));
return f;
}
function g() {
var b = n(this), f = a.delayIn;
b.hoverState = "in";
0 == f ? b.show() : (b.fixTitle(), setTimeout(function() {
"in" == b.hoverState && b.show();
}, f));
}
function k() {
var b = n(this), f = a.delayOut;
b.hoverState = "out";
0 == f ? b.hide() : (b.tip().removeClass("in"), setTimeout(function() {
"out" == b.hoverState && b.hide();
}, f));
}
a = z.extend({}, z.fn.tipsy.defaults, a);
a.live || this.each(function() {
n(this);
});
if ("manual" != a.trigger) {
var p = a.live ? "live" : "bind", l = "hover" == a.trigger ? "mouseleave" : "blur";
this[p]("hover" == a.trigger ? "mouseenter" : "focus", g)[p](l, k);
}
return this;
};
z.fn.tipsy.defaults = {
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
z.fn.tipsy.elementOptions = function(a, n) {
return z.metadata ? z.extend({}, n, z(a).metadata()) : n;
};
z.fn.tipsy.autoNS = function() {
return z(this).offset().top > z(C).scrollTop() + z(u).height() / 2 ? "s" : "n";
};
z.fn.tipsy.autoWE = function() {
return z(this).offset().left > z(C).scrollLeft() + z(u).width() / 2 ? "e" : "w";
};
z.fn.tipsy.autoBounds = function(a, n) {
return function() {
var g = n[0], k = 1 < n.length ? n[1] : !1, p = z(C).scrollTop() + a, l = z(C).scrollLeft() + a, b = z(this);
b.offset().top < p && (g = "n");
b.offset().left < l && (k = "w");
z(u).width() + z(C).scrollLeft() - b.offset().left < a && (k = "e");
z(u).height() + z(C).scrollTop() - b.offset().top < a && (g = "s");
return g + (k ? k : "");
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
function x(k) {
return "&#" + k.charCodeAt(0) + ";";
}
function r(k, p) {
return '<a href="' + k + '" target="' + (p.indexOf(n) ? "_blank" : "_top") + '">' + p + "</a>";
}
let t, d, a, n, g = function() {
t = /[<>&]/g;
d = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
n = location.hostname;
g = null;
};
return function(k, p) {
g && g();
k = k.replace(t, x);
p && (k = k.replace(a, r).replace(d, "<br />"));
return k;
};
}();
return w;
}({}, J, L));
B.register("$43", function(w, u, C) {
function x() {}
let r, t;
const d = B.require("$28", "rtl.json");
w.init = function() {
return new x();
};
w.cast = function(a) {
return a instanceof x ? a : "string" === typeof a ? w.parse(a) : w.clone(a);
};
w.clone = function(a) {
const n = new x();
for (const g in a) n[g] = a[g];
return n;
};
w.parse = function(a) {
r || (t = /[-_+]/, r = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(t).join("-");
a = r.exec(a);
if (!a) return null;
const n = new x();
n.lang = a[1].toLowerCase();
a[2] && (n.script = a[2].charAt(0).toUpperCase() + a[2].substring(1).toLowerCase());
a[3] && (n.region = a[3].toUpperCase());
a[4] && (n.variant = a[4].toLowerCase());
a[5] && (n.extension = a[5]);
return n;
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
let n, g = this.lang || "zxx";
if (n = this.script) g += a + n;
if (n = this.region) g += a + n;
if (n = this.variant) g += a + n;
if (n = this.extension) g += a + n;
return g;
};
u.getIcon = function() {
let a = 4, n = [];
const g = [ "variant", "region", "script", "lang" ];
for (;0 !== a--; ) {
const k = g[a];
let p = this[k];
p && (p.join && (p = p.join("-")), 1 === a && 3 === p.length ? n.push("region-m49") : n = n.concat([ k, k + "-" + p.toLowerCase() ]));
}
return n.join(" ");
};
u.isRTL = function() {
return !!d[String(this.script || this.lang).toLowerCase()];
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
function d(a) {}
t.prototype.toString = function() {
return "[Undefined]";
};
d.prototype._validate = function(a) {
let n, g, k = !0;
for (n in this) g = this[n], g === r ? (x(a + "." + n + "() must be implemented"), 
k = !1) : g instanceof t && (x(a + "." + n + " must be defined"), k = !1);
return k;
};
w.init = function(a, n) {
const g = new d();
if (a) {
let k = a.length;
for (;0 !== k--; ) g[a[k]] = r;
}
if (n) for (a = n.length; 0 !== a--; ) g[n[a]] = new t();
return g;
};
w.validate = function(a) {
const n = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(n && n[1] || "Object");
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
var n = d();
const g = Math.max(0, 16 - (n - x)), k = n + g;
n = u.setTimeout(function() {
a(k);
}, g);
x = k;
return n;
}, t = function(a) {
clearTimeout(a);
});
const d = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, n) {
function g() {
p = r(g, n);
a(k++);
}
let k = 0, p;
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
function x(l, b, f, c) {
if (d) {
const h = f;
f = function(e) {
if ((e.MSPOINTER_TYPE_TOUCH || "touch") === e.pointerType) return h(e);
};
}
l.addEventListener(b, f, c);
return {
unbind: function() {
l.removeEventListener(b, f, c);
}
};
}
function r(l) {
l.preventDefault();
l.stopPropagation();
return !1;
}
let t;
const d = !!u.navigator.msPointerEnabled, a = d ? "MSPointerDown" : "touchstart", n = d ? "MSPointerMove" : "touchmove", g = d ? "MSPointerUp" : "touchend";
w.ok = function(l) {
null == t && (t = "function" === typeof C.body.addEventListener);
t && l && l(w);
return t;
};
w.ms = function() {
return d;
};
w.dragger = function(l, b) {
function f(m) {
l.addEventListener(m, h[m], !1);
}
function c(m) {
l.removeEventListener(m, h[m], !1);
}
const h = {};
h[a] = function(m) {
k(m, function(q, v) {
v.type = a;
b(m, v, e);
});
f(n);
f(g);
return !0;
};
h[g] = function(m) {
c(n);
c(g);
k(m, function(q, v) {
v.type = g;
b(m, v, e);
});
return !0;
};
h[n] = function(m) {
k(m, function(q, v) {
v.type = n;
b(m, v, e);
});
return r(m);
};
f(a);
let e = {
kill: function() {
c(a);
c(n);
c(g);
l = e = b = null;
}
};
return e;
};
w.swiper = function(l, b, f) {
function c(E) {
l.addEventListener(E, y[E], !1);
}
function h(E) {
l.removeEventListener(E, y[E], !1);
}
function e() {
m && m.stop();
m = null;
}
let m, q, v, y = {}, A = [], D = [], F = [];
y[a] = function(E) {
q = !1;
e();
const G = p();
k(E, function(H, N) {
A[H] = G;
D[H] = N.clientX;
F[H] = N.clientY;
});
v = l.scrollLeft;
return !0;
};
y[g] = function(E) {
k(E, function(G, H) {
const N = p() - A[G];
G = D[G] - H.clientX;
b(Math.abs(G) / N, G ? 0 > G ? -1 : 1 : 0);
});
v = null;
return !0;
};
y[n] = function(E) {
let G, H;
null == v || k(E, function(N, O) {
G = D[N] - O.clientX;
H = F[N] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return q = !0;
G && (q = !0, l.scrollLeft = Math.max(0, v + G));
return r(E);
};
if (!d || f) c(a), c(n), c(g), d && (l.className += " mstouch");
return {
kill: function() {
h(a);
h(n);
h(g);
e();
},
swiped: function() {
return q;
},
ms: function() {
return d;
},
snap: function(E) {
d && !f && (l.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + E + "px)", 
l.style["-ms-scroll-snap-type"] = "mandatory", l.style["-ms-scroll-chaining"] = "none");
},
scroll: function(E, G, H) {
e();
let N = l.scrollLeft;
const O = E > N ? 1 : -1, S = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return m = B.require("$51", "fps.js").loop(function(Q) {
Q && (N = Math.max(0, S(E, N + I)), l.scrollLeft = N, E === N && (e(), H && H(N)));
}, l);
}
};
};
w.start = function(l, b) {
return x(l, a, b, !1);
};
w.move = function(l, b) {
return x(l, n, b, !1);
};
w.end = function(l, b) {
return x(l, g, b, !1);
};
const k = w.each = function(l, b) {
if (d) (l.MSPOINTER_TYPE_TOUCH || "touch") === l.pointerType && b(0, l); else {
l = (l.originalEvent || l).changedTouches || [];
for (var f = -1; ++f < l.length; ) b(f, l[f]);
}
}, p = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, J, L));
B.register("$52", function(w, u, C) {
w.init = function(x) {
function r() {
n.style.top = String(-x.scrollTop) + "px";
return !0;
}
function t() {
var k = n;
k.textContent = x.value;
k.innerHTML = k.innerHTML.replace(/[ \t]/g, d).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function d(k) {
return '<span class="x' + k.charCodeAt(0).toString(16) + '">' + k + "</span>";
}
var a = x.parentNode, n = a.insertBefore(C.createElement("div"), x);
z(x).on("input", t).on("scroll", r);
z(a).addClass("has-mirror");
n.className = "ta-mirror";
var g = x.offsetWidth - x.clientWidth;
2 < g && (n.style.marginRight = String(g - 2) + "px");
t();
r();
return {
kill: function() {
z(x).off("input", t).off("scroll", r);
a.removeChild(n);
n = null;
z(a).removeClass("has-mirror");
}
};
};
return w;
}({}, J, L));
B.register("$36", function(w, u, C) {
function x(d, a) {
d = r[d] || [];
a = a && u[a];
const n = d.length;
let g = -1, k = 0;
for (;++g < n; ) {
const p = d[g];
"function" === typeof p && (p(a), k++);
}
return k;
}
const r = {};
let t = "";
w.load = function(d, a, n) {
function g() {
l && (clearTimeout(l), l = null);
b && (b.onreadystatechange = null, b = b = b.onload = null);
d && (delete r[d], d = null);
}
function k(f, c) {
f = b && b.readyState;
if (c || !f || "loaded" === f || "complete" === f) c || x(d, n), g();
}
function p() {
if (0 === x(d)) throw Error('Failed to load "' + (n || d) + '"');
g();
}
if (n && u[n]) "function" === typeof a && a(u[n]); else if (null != r[d]) r[d].push(a); else {
r[d] = [ a ];
var l = setTimeout(p, 4e3), b = C.createElement("script");
b.setAttribute("src", d);
b.setAttribute("async", "true");
b.onreadystatechange = k;
b.onload = k;
b.onerror = p;
b.onabort = g;
C.getElementsByTagName("head")[0].appendChild(b);
}
};
w.stat = function(d) {
var a;
if (!(a = t)) {
{
a = C.getElementsByTagName("script");
const n = a.length;
let g = -1, k = "";
for (;++g < n; ) {
const p = a[g].getAttribute("src");
if (p) {
const l = p.indexOf("/lib/vendor");
if (-1 !== l) {
k = p.substring(0, l);
break;
}
}
}
a = k || "/static";
}
a = t = a;
}
return a + d;
};
return w;
}({}, J, L));
B.register("$16", function(w, u, C) {
function x(p, l) {
p.setReadOnly(!1);
p.on("change", function(b, f) {
return l.val(f.getValue());
});
p.on("focus", function() {
return l.focus();
});
p.on("blur", function() {
return l.blur();
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
function d(p, l) {
function b() {
this.HighlightRules = f;
}
var f = a(l);
p = p.require;
l = p("ace/lib/oop");
l.inherits(f, p("ace/mode/text_highlight_rules").TextHighlightRules);
l.inherits(b, p("ace/mode/text").Mode);
return new b();
}
function a(p) {
return function() {
var l = {
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
}, b = n(p);
"icu" === p ? l = {
start: l.start.concat([ {
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
} : b && l.start.push({
token: "printf",
regex: b
});
this.$rules = l;
};
}
function n(p) {
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

case k:
return g || "%%";
}
}
var g, k = "auto";
w.init = function(p, l, b) {
var f, c = !1, h = b || k, e = p.parentNode, m = e.appendChild(C.createElement("div"));
z(e).addClass("has-proxy has-ace");
B.require("$36", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(q) {
if (m) {
if (!q) throw Error("Failed to load code editor");
f = q.edit(m);
var v = f.session, y = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(c);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
v.setUseSoftTabs(!1);
y.setShowGutter(!0);
y.setPadding(10);
y.setScrollMargin(8);
v.setMode(d(q, h));
f.setValue(p.value, -1);
v.setUseWrapMode(!0);
l ? x(f, l) : t(f);
}
}, "ace");
return {
kill: function() {
f && (r(f), f.destroy(), f = null);
m && (e.removeChild(m), z(e).removeClass("has-proxy has-ace"), m = null);
return this;
},
disable: function() {
f && t(f);
l = null;
return this;
},
enable: function(q) {
l = q;
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
c !== q && (c = q, f && f.setShowInvisibles(q));
return this;
},
strf: function(q) {
q = q || k;
q !== h && (h = q, f && f.session.setMode(d(u.ace, q)));
return this;
},
focus: function() {
return this;
}
};
};
w.strf = function(p, l) {
k = p;
g = l;
return w;
};
return w;
}({}, J, L));
B.register("$53", function(w, u, C) {
function x(a, n) {
function g() {
return n.val(a.getContent());
}
a.on("input", g);
a.on("change", g);
a.on("focus", function() {
return n.focus();
});
a.on("blur", function() {
return n.blur();
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
var d = 0;
w.load = function(a) {
var n = B.require("$36", "remote.js");
n.load(n.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, n) {
function g(q) {
b = q;
f = "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4);
return q.replace(/(<\/?)script/gi, "$1loco:script");
}
function k(q) {
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
n ? (x(q, n), n.reset()) : t(q);
z(e).removeClass("loading");
}
var p, l = !1, b = "", f = !1, c = a.parentNode, h = c.parentNode, e = c.appendChild(C.createElement("div")), m = h.insertBefore(C.createElement("nav"), c);
m.id = "_tb" + String(++d);
z(c).addClass("has-proxy has-mce");
z(e).addClass("mce-content-body loading").html(g(a.value));
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
fixed_toolbar_container: "#" + m.id,
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
init_instance_callback: k
});
});
return {
val: function(q) {
q = g(q);
null == p ? (a.value = q, z(e).html(q)) : p.getContent() !== q && p.setContent(q);
n && n.val(q);
return this;
},
kill: function() {
p && (n && n.val(p.getContent()), r(p), p.destroy(), p = null);
e && (c.removeChild(e), z(c).removeClass("has-proxy has-mce"), e = null);
m && (h.removeChild(m), m = null);
return this;
},
enable: function(q) {
n = q;
p && x(p, q);
return this;
},
disable: function() {
p && t(p);
n = null;
return this;
},
focus: function() {
p && n && p.focus();
return this;
},
invs: function(q) {
q = q || !1;
l !== q && (l = q, z(c)[q ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, J, L));
B.register("$49", function(w, u, C) {
function x(d) {
function a() {
l && (b.off("input", n), l = !1);
}
function n() {
const e = d.value;
e !== c && (b.trigger("changing", [ e, c ]), c = e);
}
function g() {
n();
l && h !== c && b.trigger("changed", [ c ]);
}
function k() {
t = d;
h = c;
l || (b.on("input", n), l = !0);
b.trigger("editFocus");
f.addClass("has-focus");
return !0;
}
function p() {
t === d && (t = null);
b.trigger("editBlur");
f.removeClass("has-focus");
l && (g(), a());
return !0;
}
let l = !1, b = z(d), f = z(d.parentNode), c = d.value, h;
b.on("blur", p).on("focus", k);
return {
val: function(e) {
c !== e && (d.value = e, b.triggerHandler("input"), c = e);
return !0;
},
kill: function() {
a();
b.off("blur", p).off("focus", k);
},
fire: function() {
c = null;
n();
},
ping: g,
blur: p,
focus: k,
reset: function() {
h = c = d.value;
}
};
}
function r(d) {
this.e = d;
}
let t;
w._new = function(d) {
return new r(d);
};
w.init = function(d) {
const a = new r(d);
d.disabled ? (d.removeAttribute("disabled"), a.disable()) : d.readOnly ? a.disable() : a.enable();
return a;
};
u = r.prototype;
u.destroy = function() {
this.unlisten();
var d = this.p;
d && (d.kill(), this.p = null);
this.e = null;
};
u.reload = function(d, a) {
var n = this.l;
n && !a && (this.disable(), n = null);
this.val(d || "");
a && !n && this.enable();
return this;
};
u.val = function(d) {
const a = this.e;
if (null == d) return a.value;
const n = this.l, g = this.p;
g && g.val(d);
n && n.val(d);
n || a.value === d || (a.value = d, z(a).triggerHandler("input"));
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
var d = this.p;
d ? d.focus() : z(this.e).focus();
};
u.focused = function() {
return t && t === this.el;
};
u.parent = function() {
return this.e.parentNode;
};
u.attr = function(d, a) {
var n = this.e;
if (1 === arguments.length) return n.getAttribute(d);
null == a ? n.removeAttribute(d) : n.setAttribute(d, a);
return this;
};
u.editable = function() {
return !!this.l;
};
u.enable = function() {
var d = this.p;
this.e.removeAttribute("readonly");
this.listen();
d && d.enable && d.enable(this.l);
return this;
};
u.disable = function() {
var d = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
d && d.disable && d.disable();
return this;
};
u.listen = function() {
var d = this.l;
d && d.kill();
this.l = x(this.e);
return this;
};
u.unlisten = function() {
var d = this.l;
d && (d.kill(), this.l = null);
return this;
};
u.setInvs = function(d, a) {
var n = this.i || !1;
if (a || n !== d) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(d) : d && (this._i = B.require("$52", "mirror.js").init(this.e)), 
this.i = d;
return this;
};
u.getInvs = function() {
return this.i || !1;
};
u.setMode = function(d) {
var a = this.p, n = this.i || !1;
d !== (this.m || "") && (this.m = d, a && a.kill(), this.p = a = "code" === d ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === d ? B.require("$53", "mce.js").init(this.e, this.l) : null, 
this.setInvs(n, !0), t && this.focus());
return this;
};
u.setStrf = function(d) {
this["%"] = d;
"code" === this.m && this.p.strf(d);
return this;
};
u.name = function(d) {
this.e.setAttribute("name", d);
return this;
};
u.placeholder = function(d) {
this.e.setAttribute("placeholder", d);
return this;
};
u.redraw = function() {
var d = this.p;
d && d.resize && d.resize();
};
u = null;
return w;
}({}, J, L));
B.register("$50", function(w, u, C) {
function x(c) {
const h = u.console;
h && h.error && h.error(c);
}
function r(c) {
const h = C.createElement("div");
c && h.setAttribute("class", c);
return h;
}
function t(c) {
return function() {
c.resize();
return this;
};
}
function d(c) {
return function(h) {
let e = h.target, m = e.$index;
for (;null == m && "DIV" !== e.nodeName && (e = e.parentElement); ) m = e.$index;
null != m && (h.stopImmediatePropagation(), c.select(m));
return !0;
};
}
function a(c) {
return function() {
c.redrawDirty() && c.redraw();
return !0;
};
}
function n(c) {
return function(h) {
var e = h.keyCode;
if (40 === e) e = 1; else if (38 === e) e = -1; else return !0;
if (h.shiftKey || h.ctrlKey || h.metaKey || h.altKey) return !0;
c.selectNext(e);
h.stopPropagation();
h.preventDefault();
return !1;
};
}
function g(c, h, e) {
function m(q) {
x("row[" + q + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(q) {
const v = h || 0, y = e ? -1 : 1, A = c.rows || [];
q.sort(function(D, F) {
return y * (A[D] || m(D)).cellVal(v).localeCompare((A[F] || m(F)).cellVal(v));
});
};
}
function k(c) {
this.w = c;
}
function p(c) {
this.t = c;
this.length = 0;
}
function l(c, h, e) {
let m = C.createElement("div");
m.className = e || "";
this._ = m;
this.d = h || [];
this.i = c || 0;
this.length = h.length;
}
function b(c) {
this.live = c;
this.rows = [];
}
w.create = function(c) {
return new k(c);
};
var f = k.prototype;
f.init = function(c) {
let h = this.w, e = h.id;
var m = h.splity(e + "-thead", e + "-tbody"), q = m[0];
m = m[1];
let v = [], y = [], A = [], D = [];
if (c) this.ds = c, this.idxs = y, this._idxs = null; else if (!(c = this.ds)) throw Error("No datasource");
q.css.push("wg-thead");
m.css.push("wg-tbody");
c.eachCol(function(O, S, I) {
A[O] = e + "-col-" + S;
D[O] = I || S;
});
var F = r();
let E = -1, G = A.length, H = r("wg-cols"), N = q.splitx.apply(q, A);
for (;++E < G; ) N[E].header(D[E]), H.appendChild(F.cloneNode(!1)).setAttribute("for", A[E]);
c.eachRow(function(O, S, I) {
v[O] = new l(O, S, I);
y[O] = O;
});
this.rows = v;
this.cols = H;
this.ww = null;
this.root = F = m.body;
this.head = q;
q.redraw = t(this);
q = m.fixed = N[0].bodyY() || 20;
h.lock().resize(q, m);
h.css.push("is-table");
h.restyle();
this.sc ? this._re_sort(G) : c.sort && c.sort(y);
this.redrawDirty();
this.render();
z(F).attr("tabindex", "-1").on("keydown", n(this)).on("mousedown", d(this)).on("scroll", a(this));
return this;
};
f.clear = function() {
const c = this.pages || [];
let h = c.length;
for (;0 !== h--; ) c[h].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
f.render = function() {
let c, h = [], e = this.rows || [], m = -1, q, v = this.idxs, y = v.length, A = this.idxr = {}, D = this.r, F = this._r, E = this.root, G = this.cols;
for (;++m < y; ) {
if (0 === m % 100) {
var H = G.cloneNode(!0);
c = new b(H);
c.i = h.length;
c.h = 2200;
c.insert(E);
h.push(c);
}
q = v[m];
A[q] = m;
H = e[q];
if (null == H) throw Error("Render error, no data at [" + q + "]");
H.page = c;
c.rows.push(H);
}
c && 100 !== c.size() && c.sleepH(22);
this.pages = h;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == D ? null != F && (H = e[F]) && H.page && (delete this._r, this.select(F, !0)) : (H = e[D]) && H.page ? this.select(D, !0) : (this.deselect(), 
this._r = D);
return this;
};
f.resize = function() {
let c = -1, h = this.ww || (this.ww = []);
var e = this.w;
let m = e.cells[0], q = m.body.childNodes, v = q.length, y = this.pages || [], A = y.length;
for (e.redraw.call(m); ++c < v; ) h[c] = q[c].style.width;
if (A) {
e = this.mx;
for (c = this.mn; c <= e; c++) y[c].widths(h);
this.redrawDirty() && this.redraw();
}
};
f.redrawDirty = function() {
let c = !1;
var h = this.root;
const e = h.scrollTop;
h = h.clientHeight;
this.sy !== e && (c = !0, this.sy = e);
this.vh !== h && (c = !0, this.vh = h);
return c;
};
f.redraw = function() {
let c = 0, h = -1, e = null, m = null, q = this.ww;
var v = this.sy;
let y = this.mn, A = this.mx, D = Math.max(0, v - 100);
v = this.vh + v + 100;
let F, E = this.pages || [], G = E.length;
for (;++h < G && !(c > v); ) F = E[h], c += F.height(), c < D || (null === e && (e = h), 
m = h, F.rendered || F.render(q));
if (y !== e) {
if (null !== y && e > y) for (h = y; h < e; h++) {
F = E[h];
if (!F) throw Error("Shit!");
F.rendered && F.sleep();
}
this.mn = e;
}
if (A !== m) {
if (null !== A && m < A) for (h = A; h > m; h--) F = E[h], F.rendered && F.sleep();
this.mx = m;
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
f.tr = function(c) {
return (c = this.row(c)) ? c.cells() : [];
};
f.row = function(c) {
return this.rows[c];
};
f.td = function(c, h) {
return this.tr(c)[h];
};
f.next = function(c, h, e) {
null == e && (e = this.r || 0);
const m = this.idxs, q = m.length;
let v = e = (this.idxr || {})[e];
for (;e !== (v += c) && !(0 <= v && q > v); ) if (h && q) v = 1 === c ? -1 : q, 
h = !1; else return null;
e = m[v];
return null == e || null == this.rows[e] ? (x("Bad next: [" + v + "] does not map to data row"), 
null) : e;
};
f.selectNext = function(c, h, e) {
c = this.next(c, h);
null != c && this.r !== c && this.select(c, e);
return this;
};
f.deselect = function(c) {
const h = this.r;
null != h && (this.r = null, z(this.tr(h)).removeClass("selected"), this.w.fire("wgRowDeselect", [ h, c ]));
return this;
};
f.selectRow = function(c, h) {
return this.select(this.idxs[c], h);
};
f.select = function(c, h) {
const e = this.rows[c];
var m = e && e.page;
if (!m) return this.deselect(!1), x("Row is filtered out"), this;
this.deselect(!0);
let q, v = this.w.cells[1];
m.rendered || (q = m.top(), v.scrollY(q), this.redrawDirty() && this.redraw());
if (!e.rendered) return m.rendered || x("Failed to render page"), x("Row [" + e.i + "] not rendered"), 
this;
m = e.cells();
z(m).addClass("selected");
this.r = c;
h || (q = v.scrollY(), z(this.root).focus(), q !== v.scrollY() && v.scrollY(q));
v.scrollTo(m[0], !0);
this.w.fire("wgRowSelect", [ c, e.data() ]);
return this;
};
f.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
f.filter = function(c) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(c);
return this.clear().render();
};
f.each = function(c) {
let h, e = -1;
const m = this.rows || [], q = this.idxs || [], v = q.length;
for (;++e < v; ) h = q[e], c(m[h], e, h);
return this;
};
f.sortable = function(c) {
const h = this.sc || (this.sc = new p(this));
h.has(c) || h.add(c);
return this;
};
f._re_sort = function(c) {
let h = -1, e = this.sc, m = e.active;
for (this.sc = e = new p(this); ++h < c; ) e.add(h);
m && (h = this.head.indexOf(m.id), -1 === h && (h = Math.min(m.idx, c - 1)), this.sort(h, m.desc));
return this;
};
f._sort = function(c, h) {
h ? (this.s = h, h(c)) : (h = this.s) && h(c);
return c;
};
f.sort = function(c, h) {
this._sort(this.idxs, g(this, c, h));
this.sc.activate(c, h);
return this;
};
f = null;
f = p.prototype;
f.has = function(c) {
return null != this[c];
};
f.add = function(c) {
const h = this, e = h.t.head.cells[c];
h[c] = {
desc: null,
idx: c,
id: e.id
};
h.length++;
e.addClass("wg-sortable").on("click", function(m) {
if ("header" === m.target.nodeName.toLowerCase()) return m.stopImmediatePropagation(), 
h.toggle(c), !1;
});
return h;
};
f.toggle = function(c) {
this.t.sort(c, !this[c].desc).clear().render();
return this;
};
f.activate = function(c, h) {
let e, m = this.active, q = this[c], v = this.t.head.cells;
m && (e = v[m.idx]) && (e.removeClass(m.css), m !== q && e.restyle());
(e = v[c]) ? (q.desc = h, this.active = q, c = "wg-" + (h ? "desc" : "asc"), e.addClass(c).restyle(), 
q.css = c) : this.active = null;
return this;
};
f = null;
f = l.prototype;
f.render = function(c) {
let h, e = [], m = this._, q = this.length;
if (m) {
for (this.c = e; 0 !== q--; ) h = m.cloneNode(!1), e[q] = this.update(q, h), h.$index = this.i, 
c[q].appendChild(h);
this._ = null;
} else for (e = this.c; 0 !== q--; ) c[q].appendChild(e[q]);
this.rendered = !0;
return this;
};
f.update = function(c, h) {
h = h || this.c[c] || {};
c = (this.d[c] || function() {})() || " ";
null == c.innerHTML ? h.textContent = c : h.innerHTML = c.innerHTML;
return h;
};
f.cells = function() {
return this.c || [ this._ ];
};
f.data = function() {
let c = -1;
const h = [], e = this.length;
for (;++c < e; ) h[c] = this.cellVal(c);
return h;
};
f.destroy = function() {
this.page = null;
this.rendered = !1;
};
f.cellVal = function(c) {
c = this.d[c]() || "";
return String(c.textContent || c);
};
f = null;
f = b.prototype;
f.size = function() {
return this.rows.length;
};
f.insert = function(c) {
const h = this.h, e = r("wg-dead");
e.style.height = String(h) + "px";
c.appendChild(e);
return this.dead = e;
};
f.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
f.height = function() {
let c = this.h;
null == c && (this.h = c = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
c || x("row has zero height");
return c;
};
f.render = function(c) {
let h, e = -1, m = this.rows, q = m.length;
const v = this.dead, y = this.live, A = y.childNodes;
for (;++e < q; ) h = m[e], h.rendered || h.render(A);
q = c.length;
for (e = 0; e < q; e++) A[e].style.width = c[e];
v.parentNode.replaceChild(y, v);
this.rendered = !0;
this.h = null;
return this;
};
f.sleep = function() {
const c = this.height(), h = this.live, e = this.dead;
e.style.height = String(c) + "px";
h.parentNode.replaceChild(e, h);
this.rendered = !1;
this.h = c;
return this;
};
f.sleepH = function(c) {
c *= this.rows.length;
const h = this.dead;
h && (h.style.height = String(c) + "px");
this.rendered || (this.h = c);
return this;
};
f.widths = function(c) {
const h = this.live.childNodes;
let e = c.length;
for (;0 !== e--; ) h[e].style.width = c[e];
return this;
};
f.destroy = function() {
var c = this.rendered ? this.live : this.dead;
const h = this.rows;
c.parentNode.removeChild(c);
for (c = h.length; 0 !== c--; ) h[c].destroy();
};
return w;
}({}, J, L));
B.register("$45", function(w, u, C) {
function x(e, m) {
var q = e.id;
let v = q && f[q], y = v && v.parent();
if (!v || !y) return null;
var A = 1 === y.dir;
q = A ? "X" : "Y";
let D = "page" + q;
A = A ? b : l;
let F = A(y.el);
q = m["offset" + q];
let E = y.el, G = E.className;
null == q && (q = m[D] - A(e));
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
function m() {
z(C).off("mousemove", q);
h && (h.done(), h = null);
return !0;
}
function q(v) {
h ? h.move(v) : m();
return !0;
}
if (h) return !0;
h = x(e.target, e);
if (!h) return !0;
z(C).one("mouseup", m).on("mousemove", q);
return d(e);
}
function t(e, m) {
const q = m.type;
"touchmove" === q ? h && h.move(m) : "touchstart" === q ? h = x(e.target, m) : "touchend" === q && h && (h.done(), 
h = null);
}
function d(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function a(e) {
c && c.redraw();
e && e.redraw();
return c = e;
}
function n(e, m) {
const q = z(m);
q.on("editFocus", function() {
q.trigger("wgFocus", [ a(e) ]);
}).on("editBlur", function() {
q.trigger("wgBlur", [ a(null) ]);
});
}
function g(e) {
const m = e.id, q = e.className;
this.id = m;
this.el = e;
this.pos = this.index = 0;
this.css = [ q || "wg-root", "wg-cell" ];
this._cn = q;
f[m] = this;
this.clear();
}
const k = B.include("$47", "html.js") || B.include("$2", "html.js", !0), p = B.require("$27", "dom.js"), l = p.top, b = p.left, f = {};
let c, h = !1;
w.init = function(e) {
const m = new g(e);
m.redraw();
B.require("$48", "touch.js").ok(function(q) {
q.dragger(e, t);
});
z(e).on("mousedown", r);
return m;
};
u = g.prototype;
u.fire = function(e, m) {
e = z.Event(e);
e.cell = this;
z(this.el).trigger(e, m);
return this;
};
u.each = function(e) {
let m = -1;
const q = this.cells, v = q.length;
for (;++m < v; ) e(q[m], m);
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
return z(this.el).find(e);
};
u.$ = function(e, m) {
z.fn[e].apply(z(this.el), m);
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
u._split = function(e, m) {
(this.length || this.field) && this.clear();
let q = -1;
let v = m.length, y = 1 / v, A = 0;
for (;++q < v; ) {
var D = p.el();
this.body.appendChild(D);
var F = D;
{
var E = m[q];
let G = 1, H = E;
for (;f[E]; ) E = H + "-" + ++G;
}
F.id = E;
D = new g(D);
D.index = q;
D.pid = this.id;
D._locale(this.lang, this.rtl);
D.pos = A;
A += y;
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
z(e).off();
return this;
};
u.exists = function() {
return this === f[this.id];
};
u.clear = function() {
const e = this.el, m = this.cells, q = this.field, v = this.body, y = this.nav;
let A = this.length || 0;
for (;0 !== A--; ) delete f[m[A].destroy().id];
this.cells = [];
this.length = 0;
y && (e.removeChild(y), this.nav = null);
v && (q && (q.destroy(), this.field = null), this.table && (this.table = null), 
e === v.parentNode && e.removeChild(v));
this.body = e.appendChild(p.el("", "wg-body"));
this._h = null;
return this;
};
u.resize = function(e, m) {
if (!m && (m = this.cells[1], !m)) return;
var q = m.index;
let v = this.cells, y = z(this.el)[1 === this.dir ? "width" : "height"](), A = v[q + 1];
q = v[q - 1];
m.pos = Math.min((A ? A.pos * y : y) - ((m.body || m.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * y : 0, e)) / y;
this.redraw();
return this;
};
u.distribute = function(e) {
let m = -1, q = 0, v;
const y = this.cells, A = e.length;
for (;++m < A && (v = y[++q]); ) v.pos = Math.max(0, Math.min(1, e[m]));
this.redraw();
return this;
};
u.distribution = function() {
let e = [], m = 0;
const q = this.cells, v = q.length - 1;
for (;m < v; ) e[m] = q[++m].pos;
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
const m = this.el;
var q = this.body, v = this.field;
if (q) {
var y = m.clientWidth || 0, A = m.clientHeight || 0, D = q.offsetTop || 0;
A = D > A ? 0 : A - D;
if (this._h !== A) {
this._h = A;
q.style.height = String(A) + "px";
var F = v;
}
this._w !== y && (this._w = y, F = v);
F && F.redraw();
}
q = this.length;
y = 1;
A = this.nav;
for (D = 2 === this.dir ? "height" : "width"; 0 !== q--; ) v = this.cells[q], A ? F = 1 : (v.fixed && (v.pos = v.fixed / z(m)[D]()), 
F = y - v.pos, y = v.pos), v.el.style[D] = String(100 * F) + "%", v.redraw(e);
return this;
};
u.contents = function(e, m) {
const q = this.el;
let v = this.body;
if (null == e) return v.innerHTML;
this.length ? this.clear() : v && (q.removeChild(v), v = null);
v || (this.body = v = q.appendChild(p.el("", m || "wg-content")), this._h = null, 
(m = this.lang) && this._locale(m, this.rtl, !0));
"string" === typeof e ? z(v)._html(e) : e && this.append(e);
this.redraw();
return this;
};
u.textarea = function(e, m) {
let q = this.field;
if (q) {
var v = q.editable();
q.reload(e, m);
v !== m && this.restyle();
} else this.length && this.clear(), v = p.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.value = e, this.contents(v), q = B.require("$49", "field.js")._new(v)[m ? "enable" : "disable"](), 
n(this, v), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
u.locale = function(e) {
e = B.require("$43", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
u._locale = function(e, m, q) {
const v = this.body;
if (q || e !== this.lang) this.lang = e, v && v.setAttribute("lang", e);
if (q || m !== this.rtl) this.rtl = m, v && v.setAttribute("dir", m ? "RTL" : "LTR");
return this;
};
u.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
let m = this.cells, q = m.length, v = this.navigated();
if (null != v) return m[v].editable();
for (;++v < q; ) if (e = m[v].editable()) return e;
};
u.eachTextarea = function(e) {
const m = this.field;
m ? e(m) : this.each(function(q) {
q.eachTextarea(e);
});
return this;
};
u.append = function(e) {
e && (e.nodeType ? k.init(this.body.appendChild(e)) : k.init(z(e).appendTo(this.body)));
return this;
};
u.prepend = function(e) {
const m = this.body;
if (e.nodeType) {
const q = m.firstChild;
k.init(q ? m.insertBefore(e, q) : m.appendChild(e));
} else k.init(z(e).prependTo(m));
return this;
};
u.before = function(e) {
const m = this.body;
e.nodeType ? k.init(this.el.insertBefore(e, m)) : k.init(z(e).insertBefore(m));
return this;
};
u.header = function(e, m) {
if (null == e && null == m) return this.el.getElementsByTagName("header")[0];
this.t = p.txt(e || "");
this.el.insertBefore(p.el("header", m), this.body).appendChild(this.t);
this.redraw();
return this;
};
u.toolbar = function() {
const e = this.header(), m = e.getElementsByTagName("nav");
return 0 === m.length ? e.appendChild(p.el("nav")) : m[0];
};
u.title = function(e) {
const m = this.t;
if (m) return m.nodeValue = e || "", m;
this.header(e);
return this.t;
};
u.titled = function() {
return this.t && this.t.nodeValue;
};
u.bodyY = function() {
return l(this.body, this.el);
};
u.scrollY = function(e) {
if (ka === e) return this.body.scrollTop;
this.body.scrollTop = e;
};
u.tabulate = function(e) {
let m = this.table;
m ? m.clear() : m = B.require("$50", "wgtable.js").create(this);
m.init(e);
return this.table = m;
};
u.lock = function() {
this.body.className += " locked";
return this;
};
u.scrollTo = function(e, m) {
let q = this.body;
var v = q.scrollTop;
let y = l(e, q);
if (v > y) v = y; else {
const A = q.clientHeight;
e = y + z(e).outerHeight();
if (A + v < e) v = e - A; else return;
}
m ? q.scrollTop = v : z(q).stop(!0).animate({
scrollTop: v
}, 250);
};
u.navigize = function(e, m) {
function q(G) {
const H = A[G], N = y[G], O = z(H.el).show();
N.addClass("active");
F = G;
E.data("idx", G);
H.fire("wgTabSelect", [ G ]);
return O;
}
const v = this, y = [], A = v.cells;
let D = v.nav, F;
D && v.el.removeChild(D);
D = v.nav = v.el.insertBefore(p.el("nav", "wg-tabs"), v.body);
const E = z(D).on("click", function(G) {
const H = z(G.target).data("idx");
if (null == H) return !0;
if (null != F) {
{
const N = y[F];
z(A[F].el).hide();
N.removeClass("active");
}
}
q(H);
v.redraw();
return d(G);
});
null == m && (m = E.data("idx") || 0);
v.each(function(G, H) {
y[H] = z('<a href="#' + G.id + '"></a>').data("idx", H).text(e[H]).appendTo(E);
G.pos = 0;
z(G.el).hide();
});
q(A[m] ? m : 0);
v.lock();
v.redraw();
return v;
};
u.navigated = function() {
const e = this.nav;
if (e) return z(e).data("idx");
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
function r(b, f, c) {
f = z(b.title(f).parentNode);
let h = f.find("span.lang");
c ? (c = B.require("$43", "locale.js").cast(c), h.length || (h = z("<span></span>").prependTo(f)), 
h.attr("lang", c.lang).attr("class", c.getIcon() || "lang region region-" + (c.region || "zz").toLowerCase())) : (h.remove(), 
c = "en");
b.locale(c);
return f;
}
function t(b, f, c) {
f.on("click", function(h) {
const e = b.fire(c, [ h.target ]);
e || h.preventDefault();
return e;
});
}
function d() {
this.dirty = 0;
}
B.require("$3", "number.js");
const a = B.require("$42", "string.js").html, n = B.require("$6", "string.js").sprintf;
let g, k;
w.extend = function(b) {
return b.prototype = new d();
};
w.localise = function(b) {
k = b;
return w;
};
const p = function() {
const b = C.createElement("p"), f = /(src|href|on[a-z]+)\s*=/gi;
return function(c) {
b.innerHTML = c.replace(f, "data-x-loco-$1=");
const h = b.textContent.trim();
return h ? h.replace("data-x-loco-", "") : c.trim();
};
}();
let l = d.prototype = B.require("$44", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
l.init = function() {
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
l.t = function() {
return this.$t || k || B.require("$1", "t.js").init();
};
l.localise = function(b) {
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
l.setRootCell = function(b) {
function f(h) {
c.redraw(!0, h);
return !0;
}
const c = B.require("$45", "wingrid.js").init(b);
z(u).on("resize", f);
this.redraw = f;
z(b).on("wgFocus wgBlur", function(h, e) {
h.stopPropagation();
g = e;
});
this.destroy = function() {
c.destroy();
z(u).off("resize", f);
};
this.rootDiv = b;
return c;
};
l.$ = function() {
return z(this.rootDiv);
};
l.setListCell = function(b) {
const f = this;
f.listCell = b;
b.on("wgRowSelect", function(c, h) {
f.loadMessage(f.po.row(h));
return !0;
}).on("wgRowDeselect", function(c, h, e) {
e || f.loadNothing();
return !0;
});
};
l.setSourceCell = function(b) {
this.sourceCell = b;
};
l.setTargetCell = function(b) {
this.targetCell = b;
};
l.next = function(b, f, c) {
const h = this.listTable, e = this.po;
let m = h.selected(), q = m, v;
for (;null != (m = h.next(b, c, m)); ) {
if (q === m) {
m = null;
break;
}
if (f && (v = e.row(m), v.translated(0))) continue;
break;
}
null != m && h.select(m, !0);
return m;
};
l.select = function(b) {
this.listTable.select(b);
this.focus();
};
l.current = function(b) {
const f = this.active;
if (null == b) return f;
b ? b.is(f) ? (this.reloadMessage(b), this.focus()) : (this.loadMessage(b), b = this.po.indexOf(b), 
-1 !== b && this.select(b)) : this.unloadActive();
return this;
};
l.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
l.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
l.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
l.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
l.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
l.searchable = function(b) {
b && (this.dict = b, this.po && this.rebuildSearch());
return this.dict && !0;
};
l.rebuildSearch = function() {
const b = this.po.rows, f = b.length, c = this.dict;
c.clear();
let h = -1;
for (;++h < f; ) c.add(h, b[h].toText());
};
l.filtered = function() {
return this.lastSearch || "";
};
l.filter = function(b, f) {
const c = this.listTable;
let h, e = this.lastFound, m = this.lastSearch;
if (b) {
if (m === b) return e || 0;
if (m && !e && 0 === b.indexOf(m)) return 0;
h = this.dict.find(b);
}
this.lastSearch = m = b;
this.lastFound = e = h ? h.length : this.po.length;
h ? c.filter(h) : c.unfilter();
f || this.fire("poFilter", [ m, e ]);
return e;
};
l.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
l.unsave = function(b, f) {
let c = !1;
if (b) {
if (c = b.saved(f)) this.dirty++, b.unsave(f), this.fire("poUnsaved", [ b, f ]);
this.reCssRow(b);
}
return c;
};
l.reCssRow = function(b) {
var f = this.po.indexOf(b);
if ((f = this.listTable.tr(f)) && f.length) {
var c = x(b);
b = f[0].className;
c = b.replace(/(?:^| +)po-[a-z]+/g, "") + " " + c;
c !== b && z(f).attr("class", c);
}
};
l.save = function(b) {
const f = this.po;
if (this.dirty || b) {
const c = [], h = [], e = this.listTable;
f.each(function(m, q, v) {
q.err && c.push(q);
q.saved() || (q.save(), m = e.row(v).page, h[m.i] = m.live);
});
h.length && z(h).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = c.length ? c : null;
this.fire("poSave", []);
}
return f;
};
l.fire = function(b, f) {
const c = this.handle;
if (c && c[b] && !1 === c[b].apply(this, f || [])) return !1;
b = z.Event(b);
this.$().trigger(b, f);
return !b.isDefaultPrevented();
};
l.on = function(b, f) {
this.$().on(b, f);
return this;
};
l.getSorter = function() {
return null;
};
l.reload = function() {
const b = this;
var f = b.listCell;
const c = b.po;
var h = c && c.locale();
const e = h && h.isRTL(), m = c && c.length || 0;
if (!c || !c.row) return f && f.clear().header("Error").contents("Invalid messages list"), 
!1;
b.targetLocale = h;
b.lastSearch && (b.lastSearch = "", b.lastFound = m, b.fire("poFilter", [ "", m ]));
let q = (h = b.listTable) && h.thead().distribution(), v = [];
b.listTable = h = f.tabulate({
eachCol: function(y) {
const A = b.getListColumns(), D = b.getListHeadings();
for (const F in A) {
const E = A[F];
y(E, F, D[E]);
}
},
eachRow: function(y) {
c.each(function(A, D) {
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
return !!m;
};
l.load = function(b, f) {
this.po = b;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== f ? this.listTable.selectRow(f || 0) : this.active && this.unloadActive());
};
l.pasteMessage = function(b) {
this.validate(b);
if (this.active === b) {
let f = this.sourceCell, c = 0;
f && f.eachTextarea(function(h) {
h.val(b.source(null, c++));
});
(f = this.contextCell) && f.eachTextarea(function(h) {
h.val(b.context());
});
if (f = this.targetCell) c = 0, f.eachTextarea(function(h) {
h.val(b.translation(c++));
});
}
this.updateListCell(b, "source");
this.updateListCell(b, "target");
return this;
};
l.reloadMessage = function(b) {
const f = this.sourceCell, c = this.targetCell;
this.pasteMessage(b);
f && this.setSrcMeta(b, f) && f.redraw();
if (c) {
var h = c.navigated() || 0;
h = this.setTrgMeta(b, h, c);
!f && this.setSrcMeta(b, c) && (h = !0);
h && (c.redraw(), this.reCssRow(b));
}
return this;
};
l.setStatus = function() {
return null;
};
l.setSrcMeta = function(b, f) {
const c = [];
var h = this.labels;
let e = !1, m = this.$smeta;
var q = b.context();
let v = [], y = b.tags(), A = y && y.length;
q && (v.push("<span>" + a(h[4]) + "</span>"), v.push('<mark class="ctxt">' + a(q) + "</mark>"));
if (A && this.getTag) for (v.push("<span>Tagged:</span>"), h = -1; ++h < A; ) (q = this.getTag(y[h])) && v.push("<mark>" + a(q.mod_name) + "</mark>");
v.length && c.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (q = b.refs()) && (y = q.split(/\s/), A = y.length)) {
for (v = []; 0 <= --A; ) q = y[A], v.push("<code>" + a(q) + "</code>");
c.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(q = b.notes()) && c.push('<p class="has-icon icon-info">' + a(q, !0) + "</p>");
c.length ? (m || (m = f.find("div.meta"), m.length || (m = z('<div class="meta"></div>').insertAfter(f.header())), 
t(this, m, "poMeta"), this.$smeta = m), m.html(c.join("\n")).show(), e = !0) : m && m.text() && (m.text("").hide(), 
e = !0);
return e;
};
l.setTrgMeta = function(b, f, c) {
const h = [];
f = (b = b.errors(f)) && b.length;
var e = !1;
let m = this.$tmeta;
if (f) {
for (e = 0; e < f; e++) h.push('<p class="has-icon icon-warn">' + a(b[e], !0) + ".</p>");
m || (m = c.find("div.meta"), m.length || (m = z('<div class="meta"></div>').insertAfter(c.header())), 
this.$tmeta = m);
m.html(h.join("\n")).show();
e = !0;
} else m && m.text() && (m.text("").hide(), e = !0);
return e;
};
l.loadMessage = function(b) {
function f(M) {
if ("=" === M.charAt(0)) {
const K = M.split(" ");
M = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(M)] || M;
M = K.join(" ");
}
return M;
}
function c(M, K) {
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
R = n(ba[3], R);
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
I && m(V, aa);
});
K.navigize(X, P || null).on("wgTabSelect", function(V, aa) {
(V = I && V.cell.editable()) && V.focus();
y.setTrgMeta(b, aa, K);
y.setStatus(b, aa);
y.fire("poTab", [ aa ]);
});
} else R && K.redraw(), K.textarea(b.translation(), I && !b.disabled(0)).setStrf(E).setMode(Z).setInvs(D), 
I && m(K, 0);
}
function m(M, K) {
function T() {
P = null;
y.validate(b);
const W = b.errors(K).join(" ");
R !== W && (R = W, y.setTrgMeta(b, K, M) && M.redraw(), y.reCssRow(b));
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
var A = b.isHTML();
const D = y.inv || !1, F = this.fmt || null, E = b.format() || null, G = b.is(y.active), H = y.sourceCell, N = y.targetCell, O = y.contextCell, S = y.commentCell, I = y.editable.target, Q = y.editable.source, Y = y.editable.context, ha = y.sourceLocale, ja = y.targetLocale, ba = y.labels;
let ea = 0, Z = y.mode, fa = g;
y.html !== A && (y.html = A, "code" !== y.mode && (Z = A ? "html" : "", y.setMode(Z)));
y.active = b;
H && c(H, ha);
O && q(O);
N && ja && (ea = N.navigated() || 0, e(H, N, ja, ea));
S && v(S);
fa && (fa.exists() || (fa = fa.parent()), (A = fa.editable()) && A.focus());
F !== E && (this.fmt = E);
G || y.fire("poSelected", [ b, ea ]);
};
l.unloadActive = function() {
function b(c) {
c && c.text("").hide();
}
function f(c) {
c && c.off().clear();
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
l.loadNothing = function() {
const b = this.t(), f = this.mode || "", c = this.inv || !1, h = this.fmt;
this.unloadActive();
this.setStatus(null);
let e = this.commentCell;
e && e.textarea("", !1);
if (e = this.sourceCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(c), e.title(b._x("Source text not loaded", "Editor") + ":");
if (e = this.contextCell) e.textarea("", !1).setMode(f).setInvs(c), e.title(b._x("Context not loaded", "Editor") + ":");
if (e = this.targetCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(c), e.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
l.updateListCell = function(b, f) {
f = this.getListColumns()[f];
b = this.po.indexOf(b);
(b = this.listTable.row(b)) && b.rendered && b.update(f);
};
l.cellText = function(b) {
return (b = -1 !== b.indexOf("<") || -1 !== b.indexOf("&") ? p(b) : b.trim()) || " ";
};
l.fuzzy = function(b, f, c) {
f = f || this.active;
const h = f.fuzzy(c);
!0 !== b || h ? !1 === b && h && this.flag(0, f, c) && this.fire("poFuzzy", [ f, !1, c ]) : this.flag(4, f, c) && this.fire("poFuzzy", [ f, !0, c ]);
return h;
};
l.flag = function(b, f, c) {
if (!f) {
f = this.active;
c = this.getTargetOffset();
if (null == c) return null;
c && f.targetForms() && (c = 0);
}
const h = f.flagged(c);
if (null == b) return h;
if (h === b || b && !f.translated(c) || !this.fire("poFlag", [ b, h, f, c ])) return !1;
f.flag(b, c);
this.fire("poUpdate", [ f ]) && this.unsave(f, c);
this.setStatus(f, c);
return !0;
};
l.add = function(b, f) {
let c, h = this.po.get(b, f);
h ? c = this.po.indexOf(h) : (c = this.po.length, h = this.po.add(b, f), this.load(this.po, -1), 
this.fire("poAdd", [ h ]), this.fire("poUpdate", [ h ]));
this.lastSearch && this.filter("");
this.listTable.select(c);
return h;
};
l.del = function(b) {
if (b = b || this.active) {
var f = this.lastSearch, c = this.po.del(b);
null != c && (this.unsave(b), this.fire("poDel", [ b ]), this.fire("poUpdate", [ b ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(b) && this.unloadActive(), 
this.po.length && (f && this.filter(f), this.active || (c = Math.min(c, this.po.length - 1), 
this.listTable.select(c))));
}
};
l.setMono = function(b) {
return this.setMode(b ? "code" : this.html ? "html" : "");
};
l.setMode = function(b) {
if (this.mode !== b) {
this.mode = b;
this.callTextareas(function(h) {
h.setMode(b);
});
const f = this.active, c = this.sourceCell;
f && f.refs() && c && this.setSrcMeta(f, c) && c.redraw();
}
return this;
};
l.getMono = function() {
return "code" === this.mode;
};
l.setInvs = function(b) {
(this.inv || !1) !== b && (this.inv = b, this.callTextareas(function(f) {
f.setInvs(b);
}), this.fire("poInvs", [ b ]));
return this;
};
l.getInvs = function() {
return this.inv || !1;
};
l.callTextareas = function(b) {
var f = this.targetCell;
f && f.eachTextarea(b);
(f = this.contextCell) && f.eachTextarea(b);
(f = this.sourceCell) && f.eachTextarea(b);
return this;
};
l.focus = function() {
const b = this.getTargetEditable();
b && b.focus();
return this;
};
l.validate = function(b) {
return 0;
};
l = null;
return w;
}({}, J, L));
B.register("$31", function(w, u, C) {
w.init = function() {
const x = /%([1-9]\d*\$)?[s%]/, r = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(t, d) {
const a = d && d.count || 0;
d = d && d.types || {};
let n = !0, g = 0, k = 0;
for (var p; null != (p = r.exec(t)); ) {
const l = p[2];
if ("%" !== l || "%%" !== p[0]) {
if ("" === l || -1 === "suxXbcdeEfFgGo".indexOf(l)) {
n = !1;
break;
}
null == p[1] ? p = ++k : (p = parseInt(p[1]), g = Math.max(g, p));
null == d[p] && (d[p] = {});
d[p][l] = !0;
}
}
if (n) return {
valid: !0,
count: Math.max(g, k, a),
types: d
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
g = z('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
B.require("$12", "tooltip.js").init(g);
return g;
}
function t(g) {
return r("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(k) {
k.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function d(g) {
return r("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(k) {
k.preventDefault();
g.fire("poHint");
});
}
function a(g, k) {
return B.require("$6", "string.js").vsprintf(g, k);
}
w.init = function(g) {
const k = new x();
g = k.setRootCell(g);
var p = g.splity("po-list", "po-edit");
let l = p[0], b = p[1];
p = b.splitx("po-trans", "po-comment");
var f = p[0];
let c = p[1].header("Loading..");
p = f.splity("po-source", "po-target");
f = p[0].header("Loading..");
p = p[1].header("Loading..");
g.distribute([ .34 ]);
b.distribute([ .8 ]);
k.setListCell(l);
k.setSourceCell(f);
k.setTargetCell(p);
k.commentCell = c;
k.editable.source = !1;
return k;
};
u = x.prototype = B.require("$30", "base.js").extend(x);
u.getListHeadings = function() {
const g = this.t(), k = [ g._x("Source text", "Editor") ];
this.targetLocale && (k[1] = g._x("Translation", "Editor"));
return k;
};
u.getListColumns = function() {
const g = {
source: 0
};
this.targetLocale && (g.target = 1);
return g;
};
u.getListEntry = function(g) {
const k = this.cellText, p = [ function() {
let l, b = k(g.source() || ""), f = g.context();
return f ? (l = C.createElement("p"), l.appendChild(C.createElement("mark")).innerText = f, 
l.appendChild(C.createTextNode(" " + b)), l) : b;
} ];
this.targetLocale && (p[1] = function() {
return k(g.translation() || "");
});
return p;
};
u.stats = function() {
let g = this.po, k = g.length, p = 0, l = 0, b = 0;
g.each(function(f, c) {
c.fuzzy() ? b++ : c.translated() ? p++ : l++;
});
return {
t: k,
p: p.percent(k) + "%",
f: b,
u: l
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
let k = this.$tnav;
if (null == g) k && (k.remove(), this.$tnav = null); else {
k || (this.$tnav = k = z("<nav></nav>").append(t(this)).append(d(this)).appendTo(this.targetCell.header()));
var p = [];
g.translated() ? g.fuzzy() && p.push("po-fuzzy") : p.push("po-empty");
k.attr("class", p.join(" "));
}
};
u.getSorter = function() {
function g(l, b) {
const f = l.weight(), c = b.weight();
return f === c ? k(l, b) : f > c ? -1 : 1;
}
function k(l, b) {
return l.hash().localeCompare(b.hash());
}
const p = this;
return function(l) {
const b = p.po, f = p.locked() ? g : k;
l.sort(function(c, h) {
return f(b.row(c), b.row(h));
});
};
};
u.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const k = [];
let p = this.validateMessagePrintf(g, k);
p && (g.err = k);
return p;
};
u.validateMessagePrintf = function(g, k) {
const p = g.format();
if ("no-" === p.substring(0, 3)) return 0;
const l = g.msgid(), b = g.msgidPlural();
null == n && (n = B.require("$31", "printf.js").init());
var f = n;
if (!("" !== p || f.sniff(l) || "" !== b && f.sniff(b))) return 0;
let c = 0, h = f.parse(l);
b && h.valid && (h = f.parse(b, h));
if (!h.valid) return 0;
let e = h.count;
if (0 !== e || "" !== p) {
var m = this;
g.eachMsg(function(q, v) {
k[q] = [];
if ("" !== v) {
v = f.parse(v);
var y = v.count;
q = k[q];
if (v.valid) if (y > e) q.push(a(m.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ e ])), 
c++; else if (y < e && "" === b) q.push(a(m.t()._("Missing placeholders; source text formatting suggests at least %s"), [ e ])), 
c++; else {
y = h.types;
for (const A in v.types) for (const D in v.types[A]) if (null == y[A] || null == y[A][D]) {
q.push(m.t()._("Mismatching placeholder type; check against source text formatting"));
c++;
return;
}
} else q.push(m.t()._("Possible syntax error in string formatting")), c++;
}
});
return c;
}
};
u.handle = {};
let n;
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
function n(k) {
if (k.isDefaultPrevented() || !k.metaKey && !k.ctrlKey) return !0;
const p = k.which;
if (!g[p]) return !0;
const l = t[p];
if (!l) throw console.log(g, t), Error("command undefined #" + p);
if (k.altKey || k.shiftKey && !r[p] || !1 === l(k, d)) return !0;
k.stopPropagation();
k.preventDefault();
return !1;
}
const g = {};
z(a || u).on("keydown", n);
return {
add: function(k, p) {
t[x[k]] = p;
return this;
},
enable: function() {
for (const k in arguments) g[x[arguments[k]]] = !0;
return this;
},
disable: function() {
z(a || u).off("keydown", n);
d = a = null;
for (const k in t) g[k] = !1;
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
const t = {}, d = r.length;
let a = -1;
for (;++a < d; ) t[r[a]] = a;
this.keys = r;
this.length = a;
this.ords = t;
};
u.key = function(r, t) {
if (null == t) return this.keys[r];
const d = this.keys[r], a = this.ords[t];
if (t !== d) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[r] = t;
delete this.ords[d];
this.ords[t] = r;
}
return r;
};
u.indexOf = function(r) {
r = this.ords[r];
return null == r ? -1 : r;
};
u.add = function(r, t) {
let d = this.ords[r];
null == d && (this.keys[this.length] = r, d = this.ords[r] = this.length++);
this[d] = t;
return d;
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
const d = [].splice.call(this, r, t);
this.keys.splice(r, t);
this.reIndex(this.keys);
return d;
};
u.each = function(r) {
const t = this.keys, d = this.length;
let a = -1;
for (;++a < d; ) r(t[a], this[a], a);
return this;
};
u.sort = function(r) {
const t = this.length, d = this.keys, a = this.ords, n = [];
let g = -1;
for (;++g < t; ) n[g] = [ this[g], d[g] ];
n.sort(function(p, l) {
return r(p[0], l[0]);
});
for (g = 0; g < t; g++) {
var k = n[g];
this[g] = k[0];
k = k[1];
d[g] = k;
a[k] = g;
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
var d = new RegExp("^.{0," + (r - 1) + "}[" + t + "]"), a = new RegExp("^[^" + t + "]+");
return function(n, g) {
for (var k = n.length, p; k > r; ) {
p = d.exec(n) || a.exec(n);
if (null == p) break;
p = p[0];
g.push(p);
p = p.length;
k -= p;
n = n.substring(p);
}
0 !== k && g.push(n);
return g;
};
}
w.create = function(r) {
function t(l) {
return g[l] || "\\" + l;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, n = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == r || isNaN(r = Number(r))) r = 79;
if (0 < r) {
var k = x(r - 3, " ");
var p = x(r - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(l, b) {
if (!b) return l + ' ""';
b = b.replace(n, t);
var f = 0;
b = b.replace(d, function() {
f++;
return "\\n\n";
});
if (!(f || r && r < b.length + l.length + 3)) return l + ' "' + b + '"';
l = [ l + ' "' ];
b = b.split("\n");
if (p) for (var c = -1, h = b.length; ++c < h; ) p(b[c], l); else l = l.concat(b);
return l.join('"\n"') + '"';
},
prefix: function(l, b) {
l = l.split(d);
return b + l.join("\n" + b);
},
refs: function(l) {
l = l.replace(a, " ", l);
k && (l = k(l, []).join("\n#: "));
return "#: " + l;
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
for (var t = -1, d = this.length; ++t < d; ) r(t, this[t]);
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
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(d, a, n) {
a.idx = n;
}), r;
}
};
u.reIndex = function(r, t) {
const d = r.hash(), a = this.indexOf(r), n = this.rows.indexOf(d);
return n === a ? a : -1 !== n ? (t = (t || 0) + 1, r.source("Error, duplicate " + String(t) + ": " + r.source()), 
this.reIndex(r, t)) : this.rows.key(a, d);
};
u.sort = function(r) {
this.rows.sort(r);
return this;
};
u.export = function() {
const r = this.rows, t = r.length, d = B.require("$46", "list.js").init();
let a = -1;
for (;++a < t; ) d.push(r[a]);
return d;
};
return w;
}({}, J, L));
B.register("$35", function(w, u, C) {
function x(d, a, n) {
if (null == n) return d[a] || "";
d[a] = n || "";
return d;
}
function r() {
this._id = this.id = "";
}
function t(d, a) {
const n = d.length;
let g = -1;
for (;++g < n; ) a(g, d[g]);
}
w.extend = function(d) {
return d.prototype = new r();
};
u = r.prototype;
u.flag = function(d, a) {
const n = this.flg || (this.flg = []);
if (null != a) n[a] = d; else for (a = Math.max(n.length, this.src.length, this.msg.length); 0 !== a--; ) n[a] = d;
return this;
};
u.flagged = function(d) {
const a = this.flg || [];
if (null != d) return a[d] || 0;
for (d = a.length; 0 !== d--; ) if (a[d]) return !0;
return !1;
};
u.flags = function() {
const d = {}, a = [], n = this.flg || [];
let g = n.length;
for (;0 !== g--; ) {
const k = n[g];
d[k] || (d[k] = !0, a.push(k));
}
return a;
};
u.flaggedAs = function(d, a) {
const n = this.flg || [];
if (null != a) return d === n[a] || 0;
for (a = n.length; 0 !== a--; ) if (n[a] === d) return !0;
return !1;
};
u.fuzzy = function(d, a) {
const n = this.flaggedAs(4, d);
null != a && this.flag(a ? 4 : 0, d);
return n;
};
u.source = function(d, a) {
if (null == d) return this.src[a || 0] || "";
this.src[a || 0] = d;
return this;
};
u.plural = function(d, a) {
if (null == d) return this.src[a || 1] || "";
this.src[a || 1] = d || "";
return this;
};
u.sourceForms = function() {
return this.srcF;
};
u.targetForms = function() {
return this.msgF;
};
u.each = function(d) {
const a = this.src, n = this.msg, g = Math.max(a.length, n.length);
let k = -1;
for (;++k < g; ) d(k, a[k], n[k]);
return this;
};
u.eachSrc = function(d) {
t(this.src, d);
return this;
};
u.eachMsg = function(d) {
t(this.msg, d);
return this;
};
u.count = function() {
return Math.max(this.src.length, this.msg.length);
};
u.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
u.translate = function(d, a) {
this.msg[a || 0] = d || "";
return this;
};
u.untranslate = function(d) {
if (null != d) this.msg[d] = ""; else {
const a = this.msg, n = a.length;
for (d = 0; d < n; d++) a[d] = "";
}
return this;
};
u.translation = function(d) {
return this.msg[d || 0] || "";
};
u.errors = function(d) {
return this.err && this.err[d || 0] || [];
};
u.valid = function() {
return null == this.err;
};
u.translated = function(d) {
if (null != d) return !!this.msg[d];
const a = this.msg, n = a.length;
for (d = 0; d < n; d++) if (!a[d]) return !1;
return !0;
};
u.untranslated = function(d) {
if (null != d) return !this.msg[d];
const a = this.msg, n = a.length;
for (d = 0; d < n; d++) if (a[d]) return !1;
return !0;
};
u.comment = function(d) {
return x(this, "cmt", d);
};
u.notes = function(d) {
return x(this, "xcmt", d);
};
u.refs = function(d) {
return x(this, "rf", d);
};
u.format = function(d) {
return x(this, "fmt", d);
};
u.context = function(d) {
return x(this, "ctx", d);
};
u.tags = function() {
return this.tg;
};
u.toString = u.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
u.weight = function() {
let d = 0;
this.translation() || (d += 2);
this.fuzzy() && (d += 1);
return d;
};
u.equals = function(d) {
return this === d || this.hash() === d.hash();
};
u.hash = function() {
return this.id;
};
u.normalize = function() {
let d = -1, a = this.msg.length;
for (;++d < a; ) this.msg[d] = this.src[Math.min(d, 1)] || "";
};
u.disabled = function(d) {
return !!(this.lck || [])[d || 0];
};
u.disable = function(d) {
(this.lck || (this.lck = []))[d || 0] = !0;
return this;
};
u.saved = function(d) {
const a = this.drt;
if (null == a) return !0;
if (null != d) return !a[d];
for (d = a.length; 0 !== d--; ) if (a[d]) return !1;
return !0;
};
u.unsave = function(d) {
(this.drt || (this.drt = []))[d || 0] = !0;
return this;
};
u.save = function(d) {
null == d ? this.drt = null : (this.drt || (this.drt = []))[d] = !1;
return this;
};
u.is = function(d) {
return d && (d === this || d.idx === this.idx);
};
u.isHTML = function(d) {
if (null == d) return this.htm || !1;
this.htm = d;
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
function r(g, k) {
g = g || "";
k && (g += "\0" + k);
return g;
}
function t(g) {
const k = u.console;
k && k.error && k.error(g.message || String(g));
}
function d(g) {
return B.require("$33", "format.js").create(g);
}
function a(g) {
this.locale(g);
this.clear();
this.head = x(this.now());
}
function n(g, k) {
this.src = [ g || "" ];
this.msg = [ k || "" ];
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
function g(c, h) {
for (c = String(c); c.length < h; ) c = "0" + c;
return c;
}
var k = new Date();
const p = k.getUTCFullYear(), l = k.getUTCMonth() + 1, b = k.getUTCDate(), f = k.getUTCHours();
k = k.getUTCMinutes();
return g(p, 4) + "-" + g(l, 2) + "-" + g(b, 2) + " " + g(f, 2) + ":" + g(k, 2) + "+0000";
};
C.header = function(g, k) {
const p = this.head || (this.head = {});
if (null == k) return this.headers()[g] || "";
p[g] = k || "";
return this;
};
C.headers = function(g) {
const k = this.now(), p = this.head || (this.head = x(k));
if (null != g) {
for (b in g) p[b] = g[b];
return this;
}
const l = this.locale();
g = {};
for (b in p) g[b] = String(p[b]);
if (l) {
g.Language = String(l) || "zxx";
g["Language-Team"] = l.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (l.nplurals || "2") + "; plural=" + (l.pluraleq || "n!=1") + ";";
var b = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date";
g[b] || (g[b] = k);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
C.get = function(g, k) {
g = r(g, k);
return this.rows.get(g);
};
C.add = function(g, k) {
g instanceof n || (g = new n(g));
k && g.context(k);
k = g.hash();
this.rows.get(k) ? t("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(k, g), 
this.length = this.rows.length);
return g;
};
C.load = function(g) {
let k = -1, p, l;
var b;
let f, c, h, e = (b = this.locale()) && b.nplurals || 2, m = [];
for (;++k < g.length; ) p = g[k], null == p.parent ? (l = p.source || p.id, b = p.target || "", 
f = p.context, l || f ? (c = new n(l, b), c._id = p._id, f && c.context(f), p.flag && c.flag(p.flag, 0), 
p.comment && c.comment(p.comment), p.notes && c.notes(p.notes), p.refs && c.refs(p.refs), 
c.format(p.format), p.message = c, this.add(c), p.prev && p.prev[0] && (c.prev(p.prev[0].source, p.prev[0].context), 
p.prev[1] && c._src.push(p.prev[1].source || ""))) : 0 === k && "object" === typeof b && (this.head = b, 
this.headcmt = p.comment)) : m.push(p);
for (k = -1; ++k < m.length; ) try {
p = m[k];
l = p.source || p.id;
c = g[p.parent] && g[p.parent].message;
if (!c) throw Error("parent missing for plural " + l);
h = p.plural;
1 === h && c.plural(l);
h >= e || (p.flag && c.flag(p.flag, h), c.translate(p.target || "", h), p.format && !c.format() && c.format(p.format));
} catch (q) {
t(q);
}
return this;
};
C.wrap = function(g) {
this.fmtr = d(g);
return this;
};
C.toString = function() {
var g, k = this.locale(), p = [], l = [], b = this.headers(), f = !k, c = k && k.nplurals || 2, h = this.fmtr || d();
b[k ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in b) l.push(g + ": " + b[g]);
l = new n("", l.join("\n"));
l.comment(this.headcmt || "");
f && l.fuzzy(0, !0);
p.push(l.toString());
p.push("");
this.rows.each(function(e, m) {
e && (p.push(m.cat(h, f, c)), p.push(""));
});
return p.join("\n");
};
C = B.require("$35", "message.js").extend(n);
C.msgid = function() {
return this.src[0];
};
C.msgidPlural = function() {
return this.src[1] || "";
};
C.prev = function(g, k) {
this._src = [ g || "" ];
this._ctx = k;
};
C.hash = function() {
return r(this.source(), this.context());
};
C.toString = function() {
return this.cat(d());
};
C.cat = function(g, k, p) {
var l = [], b;
(b = this.cmt) && l.push(g.prefix(b, "# "));
(b = this.xcmt) && l.push(g.prefix(b, "#. "));
var f = this.rf;
if (b = this._id) f += (f ? " " : "") + "loco:" + b;
f && /\S/.test(f) && l.push(g.refs(f));
!k && this.fuzzy() && l.push("#, fuzzy");
(b = this.fmt) && l.push("#, " + b + "-format");
(b = this._ctx) && l.push(g.prefix(g.pair("msgctxt", b), "#| "));
if (b = this._src) b[0] && l.push(g.prefix(g.pair("msgid", b[0]), "#| ")), b[1] && l.push(g.prefix(g.pair("msgid_plural", b[1]), "#| "));
(b = this.ctx) && l.push(g.pair("msgctxt", b));
l.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) l.push(g.pair("msgstr", k ? "" : this.msg[0])); else for (f = -1, 
l.push(g.pair("msgid_plural", this.src[1])), b = this.msg || [ "", "" ], p = p || b.length; ++f < p; ) l.push(g.pair("msgstr[" + f + "]", k ? "" : b[f] || ""));
return l.join("\n");
};
C.compare = function(g, k) {
let p = this.weight(), l = g.weight();
if (p > l) return 1;
if (p < l) return -1;
if (k) {
p = this.hash().toLowerCase();
l = g.hash().toLowerCase();
if (p < l) return 1;
if (p > l) return -1;
}
return 0;
};
C.copy = function() {
let g = new n(), k, p;
for (k in this) this.hasOwnProperty(k) && ((p = this[k]) && p.concat && (p = p.concat()), 
g[k] = p);
return g;
};
return w;
}({}, J, L));
B.register("$17", function(w, u, C) {
w.init = function(x, r) {
function t() {
return g || (g = z('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function d(k, p, l) {
k = z("<p></p>").text(l);
t().dialog("close").html("").dialog("option", "title", "Error").append(k).dialog("open");
}
function a(k) {
const p = k && k.code;
if (p) {
for (var l = p.length, b = z("<ol></ol>").attr("class", k.type), f = -1; ++f < l; ) z("<li></li>").html(p[f]).appendTo(b);
b.find("li").eq(k.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", k.path + ":" + k.line).append(b).dialog("open");
}
}
function n(k) {
k = k.target;
const p = z(k).find("li.highlighted")[0];
k.scrollTop = Math.max(0, (p && p.offsetTop || 0) - Math.floor(k.clientHeight / 2));
}
let g;
return {
load: function(k) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", n);
k = z.extend({
ref: k,
path: r.popath
}, r.project || {});
x.ajax.post("fsReference", k, a, d);
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
const a = C.createElement("p"), n = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let k, p;
return {
sniff: function(l) {
if (l === k) return p;
k = l;
if (n.test(l) || g.test(l)) if (a.innerHTML = l, a.textContent !== l) return p = !0;
return p = !1;
}
};
}
w.create = function(a, n) {
n && "function" === typeof n.create || console.error("module.create is not callable");
n = n.create(x);
n.init(a);
return n;
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
const n = (u.loco || {}).notices;
n && n.error && n.error(String(this) + ": " + String(a));
};
t.xhrError = function(a, n, g) {
try {
const k = a.responseText, p = k && u.JSON.parse(k);
g = p && this.parseError(p) || g;
} catch (k) {}
return g || this.httpError(a);
};
t.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
t.parseError = function(a) {
return a && a.error || "";
};
t.mapLang = function(a, n) {
const g = String(a).replace("_", "-").toLowerCase();
var k = a.lang;
n = n[g] || n[k] || [];
a = n.length;
if (0 === a) return k;
if (1 < a) for (k = -1; ++k < a; ) {
const p = n[k];
if (p === g) return p;
}
return n[0];
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
t.translate = function(a, n, g) {
return this.batch([ a ], n, this.isHtml(a), g);
};
t.verify = function(a) {
return this.translate("OK", {
lang: "fr",
toString: function() {
return "fr";
}
}, function(n, g) {
a(g && "OK" === n);
});
};
t.hash = function() {
return this.key();
};
t._call = function(a) {
const n = this;
n.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(g, k, p) {
n.stderr(n.xhrError(g, k, p));
};
return n.abortable(z.ajax(a));
};
t.abortable = function(a) {
const n = this;
a.always(function() {
n.$r === a && (n.$r = null);
});
return n.$r = a;
};
t.abort = function() {
const a = this.$r;
a && a.abort();
};
t.isHtml = function(a) {
return (d || (d = r())).sniff(a);
};
let d;
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
function d(e) {
let m = {
length: 0,
html: e.html,
sources: []
};
k.push(m);
return p[e.html ? 1 : 0] = m;
}
function a(e, m) {
let q = e.source(null, m);
if (q && (e.untranslated(m) || t)) if (m = g[q]) m.push(e); else {
m = q.length;
var v = n.isHtml(q);
v = p[v ? 1 : 0];
var y = v.sources;
if (h && m > h) f++; else {
if (v.length + m > c || 50 === y.length) v = d(v), y = v.sources;
y.push(q);
g[q] = [ e ];
v.length += m;
l += m;
b += 1;
}
}
}
const n = this.api, g = {}, k = [];
let p = [], l = 0, b = 0, f = 0, c = 1e4, h = n.maxChr();
h && (c = Math.min(c, h));
d({
html: !1
});
d({
html: !0
});
r.each(function(e, m) {
a(m, 0);
a(m, 1);
});
p = [];
this.map = g;
this.chars = l;
this.length = b;
this.batches = k;
this.locale = r.locale();
f && n.stderr("Strings over " + c + " characters long will be skipped");
};
u.abort = function() {
this.state = "abort";
return this;
};
u.dispatch = function() {
function r(A, D) {
function F(S, I, Q) {
D !== Q && (A === I || 1 < S && E.source(null, 1) === A) && (E.translate(D, S), 
O++, m++);
}
if (!t()) return !1;
if (!D) return !0;
let E, G = b[A] || [], H = G.length, N = -1, O;
for (h++; ++N < H; ) if (E = G[N]) O = 0, E.each(F), O && k("each", [ E ]);
return !0;
}
function t() {
return "abort" === p.state ? (l && (l.abort(), g()), !1) : !0;
}
function d() {
let A = f.shift(), D;
A ? (D = A.sources) && D.length ? l.batch(D, c, A.html, r).fail(a).always(n) : n() : g();
}
function a() {
p.abort();
g();
}
function n() {
e++;
k("prog", [ e, v ]);
t() && d();
}
function g() {
l = f = null;
k("done");
}
function k(A, D) {
A = y[A] || [];
let F = A.length;
for (;0 <= --F; ) A[F].apply(null, D);
}
let p = this, l = p.api, b = p.map, f = p.batches || [], c = p.locale, h = 0, e = 0, m = 0, q = p.length, v = f.length, y = {
done: [],
each: [],
prog: []
};
p.state = "";
d();
return {
done: function(A) {
y.done.push(A);
return this;
},
each: function(A) {
y.each.push(A);
return this;
},
prog: function(A) {
y.prog.push(A);
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
(x.prototype = new r()).batch = function(t, d, a, n) {
function g(l) {
const b = t.length;
let f = -1;
for (;++f < b && !1 !== n(t[f], l[f], d); );
}
const k = u.loco;
a = {
hook: this.getId(),
type: a ? "html" : "text",
locale: String(d),
source: this.getSrc(),
sources: t
};
const p = z.Deferred();
this.abortable(k.ajax.post("apis", a, function(l) {
g(l && l.targets || []);
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
const d = (t = t.message) && /^Wrong endpoint\. Use (https?:\/\/[-.a-z]+)/.exec(t);
d && this.base(this.key()) === d[1] && (t = "Only the v2 API is supported");
return t;
};
r.base = function(t) {
let d = this.param("api");
d ? d = this.fixURL(d) : (d = "https://api", ":fx" === t.substring(t.length - 3) && (d += "-free"), 
d += ".deepl.com");
return d;
};
r.getLangMap = function() {
return B.require("$37", "deepl.json");
};
r.verify = function(t) {
const d = this.key(), a = this.base(d);
return this._call({
url: a + "/v2/usage",
data: {
auth_key: d
}
}).done(function() {
t(!0);
}).fail(function() {
t(!1);
});
};
r.batch = function(t, d, a, n) {
function g(h) {
const e = t.length;
let m = -1;
for (;++m < e && !1 !== n(t[m], (h[m] || {}).text || "", d); );
}
const k = this;
a = k.key();
const p = k.base(a), l = k.getSrc().substring(0, 2), b = k.mapLang(d, k.getLangMap());
let f = d.tone, c = "default";
"formal" === f ? c = "more" : "informal" === f && (c = "less");
return k._call({
url: p + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: l.toUpperCase(),
target_lang: b.toUpperCase(),
formality: c,
preserve_formatting: "1",
auth_key: a,
text: t
}
}).done(function(h, e, m) {
h.translations ? g(h.translations) : (k.stderr(k.parseError(h) || k.httpError(m)), 
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
const d = [], a = t.error.errors || [], n = a.length;
let g = -1;
for (;++g < n; ) d.push(a[g].message || "");
return "Error " + t.error.code + ": " + d.join(";");
}
return "";
};
r.getLangMap = function() {
return B.require("$38", "google.json");
};
r.batch = function(t, d, a, n) {
function g(b) {
const f = t.length;
let c = -1;
for (;++c < f && !1 !== n(t[c], (b[c] || {}).translatedText || "", d); );
}
const k = this, p = k.getSrc();
a = a ? "html" : "text";
const l = k.mapLang(d, k.getLangMap());
return k._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + p + "&target=" + l + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: k.key(),
q: t
}
}).done(function(b, f, c) {
b.data ? g(b.data.translations || []) : (k.stderr(k.parseError(b) || k.httpError(c)), 
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
var d = t.details || {};
let a = d.message;
d = d.texts;
return a ? (d && d !== a && (a += "; " + d), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(n) {
n += -1 === n.indexOf("?") ? "?" : "&";
return n + "ref=loco";
}), "Error " + (t.status || "0") + ": " + a) : "";
};
r.maxChr = function() {
return 1e3;
};
r.getLangMap = function() {
return B.require("$39", "lecto.json");
};
r.batch = function(t, d, a, n) {
function g(b) {
const f = t.length;
let c = -1, h = (b[0] || {
translated: []
}).translated || [];
for (;++c < f && (b = h[c] || "", !1 !== n(t[c], b, d)); );
}
const k = this;
a = this.getSrc();
const p = k.param("api") || "https://api.lecto.ai", l = k.mapLang(d, k.getLangMap());
return k._call({
url: k.fixURL(p + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ l ],
from: a,
texts: t
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": k.key(),
Accept: "application/json"
}
}).done(function(b, f, c) {
b ? g(b.translations || []) : (k.stderr(k.parseError(b) || k.httpError(c)), g([]));
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
r.batch = function(t, d, a, n) {
function g(h) {
let e = -1;
for (var m; ++e < b && (m = h[e] || {}, m = m.translations || [], m = m[0] || {}, 
!1 !== n(t[e], m.text || "", d)); );
}
let k = this, p = [], l = k.getSrc(), b = t.length, f = -1;
a = a ? "html" : "plain";
let c = k.mapLang(d, k.getLangMap());
for (;++f < b; ) p.push({
Text: t[f]
});
return k._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + l + "&to=" + c + "&textType=" + a,
method: "POST",
data: JSON.stringify(p),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": k.region()
}
}).done(function(h, e, m) {
h && h.length ? g(h) : (k.stderr(k.parseError(h) || k.httpError(m)), g([]));
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
O || (F.on("click", p), O = z('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && z("#ssh-keys").toggleClass("hidden", "ssh" !== z(this).val());
}));
return O;
}
function t() {
G && (d(z(h)), G = !1);
if (q && N) {
var I = N, Q = z(E);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (d(z(E)), H = !1);
}
function d(I) {
I.slideUp(250).fadeOut(250, function() {
z(this).addClass("jshide");
});
}
function a() {
if (q) return O && O.dialog("close"), t(), z(x).find('button[type="submit"]').attr("disabled", !1), 
z(u).triggerHandler("resize"), c && c(!0), !0;
y && O ? (G || (z(h).removeClass("jshide").hide().fadeIn(500), G = !0), H && (d(z(E)), 
H = !1)) : t();
z(x).find('input[type="submit"]').attr("disabled", !0);
c && c(!1);
return !1;
}
function n(I) {
var Q, Y = S || {};
for (Q in Y) if (Y.hasOwnProperty(Q)) {
var ha = Y[Q];
I[Q] ? I[Q].value = ha : z('<input type="hidden" />').attr("name", Q).appendTo(I).val(ha);
}
}
function g(I) {
I.preventDefault();
I = z(I.target).serializeArray();
f(I);
m = !0;
return !1;
}
function k(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function p(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function l(I) {
q = I.authed;
e = I.method;
z(h).find("span.loco-msg").text(I.message || "Something went wrong.");
N = I.warning || "";
I.notice && v.notices.info(I.notice);
if (q) "direct" !== e && (S = I.creds, n(x), m && I.success && v.notices.success(I.success)), 
a(); else if (I.reason) v.notices.info(I.reason); else if (I = I.prompt) {
var Q = r();
Q.html(I).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", k);
Q.find('input[type="submit"]').addClass("button-primary");
a();
z(u).triggerHandler("resize");
} else v.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function b() {
a();
}
function f(I) {
m = !1;
v.ajax.setNonce("fsConnect", D).post("fsConnect", I, l, b);
return I;
}
var c, h = x, e = null, m = !1, q = !1, v = u.loco, y = x.path.value, A = x.auth.value, D = x["loco-nonce"].value, F = z(h).find("button.button-primary"), E = C.getElementById(h.id + "-warn"), G = !1, H = !1, N = "", O;
v.notices.convert(E).stick();
if (x.connection_type) {
var S = {};
S.connection_type = x.connection_type.value;
q = !0;
} else y && A && f({
path: y,
auth: A
});
a();
return {
applyCreds: function(I) {
if (I.nodeType) n(I); else {
var Q, Y = S || {};
for (Q in Y) Y.hasOwnProperty(Q) && (I[Q] = Y[Q]);
}
return this;
},
setForm: function(I) {
x = I;
a();
n(I);
return this;
},
connect: function() {
y = x.path.value;
A = x.auth.value;
f(z(x).serializeArray());
return this;
},
listen: function(I) {
c = I;
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
function x(a, n) {
return function(g) {
a.apply(g, n);
return g;
};
}
function r(a) {
return function(n, g) {
n = n && n[a] || 0;
g = g && g[a] || 0;
return n === g ? 0 : n > g ? 1 : -1;
};
}
function t(a) {
return function(n, g) {
return (n && n[a] || "").localeCompare(g && g[a] || "");
};
}
function d(a) {
return function(n, g) {
return -1 * a(n, g);
};
}
w.sort = function(a, n, g, k) {
n = "n" === g ? r(n) : t(n);
k && (n = d(n));
return x([].sort, [ n ])(a);
};
return w;
}({}, J, L));
B.register("$26", function(w, u, C) {
w.init = function(x) {
function r(h) {
var e = -1, m = h.length;
for (z("tr", l).remove(); ++e < m; ) l.appendChild(h[e].$);
}
function t(h) {
g = h ? f.find(h, d) : d.slice(0);
p && (h = a[p], g = c(g, p, h.type, h.desc));
r(g);
}
var d = [], a = [], n = 0, g, k, p, l = x.getElementsByTagName("tbody")[0], b = x.getElementsByTagName("thead")[0], f = B.require("$10", "fulltext.js").init(), c = B.require("$41", "sort.js").sort;
b && l && (z("th", b).each(function(h, e) {
var m = e.getAttribute("data-sort-type");
m && (h = n, z(e).addClass("loco-sort").on("click", function(q) {
q.preventDefault();
q = h;
var v = a[q], y = v.type, A = !(v.desc = !v.desc);
g = c(g || d.slice(0), q, y, A);
r(g);
k && k.removeClass("loco-desc loco-asc");
k = z(v.$).addClass(A ? "loco-desc" : "loco-asc").removeClass(A ? "loco-asc" : "loco-desc");
p = q;
return !1;
}), a[n] = {
$: e,
type: m
});
e.hasAttribute("colspan") ? n += Number(e.getAttribute("colspan")) : n++;
}), z("tr", l).each(function(h, e) {
var m, q, v = [], y = {
_: h,
$: e
}, A = e.getElementsByTagName("td");
for (m in a) {
e = A[m];
(q = e.textContent.replace(/(^\s+|\s+$)/g, "")) && v.push(q);
e.hasAttribute("data-sort-value") && (q = e.getAttribute("data-sort-value"));
switch (a[m].type) {
case "n":
q = Number(q);
}
y[m] = q;
}
d[h] = y;
f.index(h, v);
}), x = z('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
b = z(x.form), 1 < d.length ? B.require("$11", "LocoTextListener.js").listen(x, t) : b.hide(), 
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
z("#loco-admin.wrap table.wp-list-table").each(function(w, u) {
B.require("$26", "tables.js").init(u);
});
U.validate = function(w) {
w = /^\d+\.\d+\.\d+/.exec(w && w[0] || "");
if ("2.6.6" === (w && w[0])) return !0;
U.notices.warn("admin.js is the wrong version (2.6.6). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
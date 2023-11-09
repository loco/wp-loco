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
"function" !== t && (r = function(d) {
return 1 != d;
});
return r;
}
w.init = function(r) {
function t(k, q, n) {
return (k = g[k]) && k[n] ? k[n] : q || "";
}
function d(k) {
return t(k, k, 0);
}
function a(k, q) {
return t(q + "" + k, k, 0);
}
function l(k, q, n) {
n = Number(r(n));
isNaN(n) && (n = 0);
return t(k, n ? q : k, n);
}
r = x(r);
var g = {};
return {
__: d,
_x: a,
_n: l,
_: d,
x: a,
n: l,
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
let l = d.length;
do {
x.unshift(d.substring(l - 3, l));
} while (0 < (l -= 3));
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
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(d, a, l) {
if ("%" === l) return "%";
d = a ? r[Number(a) - 1] : r[t++];
return null != d ? String(d) : "s" === l ? "" : "0";
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
w.rect = function(r) {
return r.getBoundingClientRect();
};
return w;
}({}, J, L));
B.register("$7", function(w, u, C) {
function x(e, m, p) {
function v() {
y();
z = setTimeout(m, p);
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
function r(e, m) {
e.fadeTo(m, 0, function() {
e.slideUp(m, function() {
e.remove();
A(u).triggerHandler("resize");
});
});
return e;
}
function t(e, m) {
function p(G) {
n[D] = null;
r(A(e), 250);
z && z.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function v(G) {
z && z.die();
return z = x(e, p, G);
}
const y = A(e);
let z, D, E, F = y.find("button");
0 === F.length && (y.addClass("is-dismissible"), F = A('<button type="button" class="notice-dismiss"> </a>').appendTo(y));
F.off("click").on("click", p);
A(u).triggerHandler("resize");
q();
D = n.length;
n.push(p);
m && (z = v(m));
return {
link: function(G, H) {
var N = H || G;
H = A(e).find("nav");
G = A("<nav></nav>").append(A("<a></a>").attr("href", G).text(N));
E ? (E.push(G.html()), H.html(E.join("<span> | </span>"))) : (E = [ G.html() ], 
A(e).addClass("has-nav").append(G));
return this;
},
stick: function() {
z && z.die();
z = null;
n[D] = null;
return this;
},
slow: function(G) {
v(G || 1e4);
return this;
}
};
}
function d(e, m, p) {
const v = B.require("$27", "dom.js").el;
e = A('<div class="notice notice-' + e + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
const y = A(v("p"));
p = A(v("span")).text(p);
m = A(v("strong", "has-icon")).text(m + ": ");
y.append(m).append(p).appendTo(e);
return e;
}
function a(e, m, p, v) {
e = d(p, m, e).css("opacity", "0").fadeTo(500, 1);
A(u).triggerHandler("resize");
return t(e, v);
}
function l(e) {
return a(e, f, "warning");
}
function g() {
A("#loco-notices").find("div.notice").each(function(e, m) {
-1 === m.className.indexOf("jshide") && (e = -1 === m.className.indexOf("notice-success") ? null : 5e3, 
t(m, e));
});
}
const k = u.console || {
log: function() {}
}, q = Date.now || function() {
return new Date().getTime();
};
let n = [], c, f, b, h;
w.error = function(e) {
return a(e, c, "error");
};
w.warn = l;
w.info = function(e) {
return a(e, b, "info");
};
w.success = function(e) {
return a(e, h, "success", 5e3);
};
w.warning = l;
w.log = function() {
k.log.apply(k, arguments);
};
w.debug = function() {
(k.debug || k.log).apply(k, arguments);
};
w.clear = function() {
let e = -1;
const m = n, p = m.length;
for (;++e < p; ) {
const v = m[e];
v && v.call && v();
}
n = [];
return w;
};
w.create = d;
w.raise = function(e) {
(w[e.type] || w.error).call(w, e.message);
};
w.convert = t;
w.init = function(e) {
c = e._("Error");
f = e._("Warning");
b = e._("Notice");
h = e._("OK");
setTimeout(g, 1e3);
return w;
};
return w;
}({}, J, L));
B.register("$8", function(w, u, C) {
function x(f) {
let b = A("<pre>" + f + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = f) || (b = "Blank response from server");
return b;
}
function r(f) {
return (f = f.split(/[\r\n]/)[0]) ? (f = f.replace(/ +in +\S+ on line \d+/, ""), 
f = f.replace(/^[()! ]+Fatal error:\s*/, "")) : n._("Server returned invalid data");
}
function t(f) {
u.console && console.error && console.error('No nonce for "' + f + '"');
return "";
}
function d(f, b, h) {
f[b] = h;
}
function a(f, b, h) {
f.push({
name: b,
value: h
});
}
function l(f, b, h) {
f.append(b, h);
}
function g(f, b, h, e) {
function m(v, y, z) {
if ("abort" !== y) {
var D = n || {
_: function(O) {
return O;
}
}, E = v.status || 0, F = v.responseText || "", G = x(F), H = v.getResponseHeader("Content-Type") || "Unknown type", N = v.getResponseHeader("Content-Length") || F.length;
"success" === y && z ? p.error(z) : (p.error(r(G) + ".\n" + D._("Check console output for debugging information")), 
p.log("Ajax failure for " + f, {
status: E,
error: y,
message: z,
output: F
}), "parsererror" === y && (z = "Response not JSON"), p.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (z || D._("Unknown error")) + '" (' + H + " " + N + " bytes)", G, "====" ].join("\n")));
h && h.call && h(v, y, z);
c = v;
}
}
e.url = k;
e.dataType = "json";
const p = B.require("$7", "notices.js").clear();
c = null;
return A.ajax(e).fail(m).done(function(v, y, z) {
const D = v && v.data, E = v && v.notices, F = E && E.length;
!D || v.error ? m(z, y, v && v.error && v.error.message) : b && b(D, y, z);
for (v = -1; ++v < F; ) p.raise(E[v]);
});
}
const k = u.ajaxurl || "/wp-admin/admin-ajax.php";
let q = {}, n, c;
w.init = function(f) {
q = f.nonces || q;
return w;
};
w.localise = function(f) {
n = f;
return w;
};
w.xhr = function() {
return c;
};
w.strip = x;
w.parse = r;
w.submit = function(f, b, h) {
function e(z, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function m(z, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function p(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(m);
z.find("input").each(m);
z.find("select").each(m);
z.find("textarea").each(m);
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
return g(f.route.value, function(z, D, E) {
p(v);
b && b(z, D, E);
}, function(z, D, E) {
p(v);
h && h(z, D, E);
}, {
type: f.method,
data: y
});
};
w.post = function(f, b, h, e) {
let m = !0, p = b || {}, v = q[f] || t(f);
u.FormData && p instanceof FormData ? (m = !1, b = l) : b = Array.isArray(p) ? a : d;
b(p, "action", "loco_json");
b(p, "route", f);
b(p, "loco-nonce", v);
return g(f, h, e, {
type: "post",
data: p,
processData: m,
contentType: m ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, b, h, e) {
b = b || {};
const m = q[f] || t(f);
b.action = "loco_json";
b.route = f;
b["loco-nonce"] = m;
return g(f, h, e, {
type: "get",
data: b
});
};
w.setNonce = function(f, b) {
q[f] = b;
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
for (const l in d) a[l] = d[l];
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
const l = [ "variant", "region", "lang" ];
for (;0 !== d--; ) {
const g = l[d], k = this[g];
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
function x(b) {
return n[b] || b;
}
function r(b, h, e) {
let m, p, v = String(b || "").toLowerCase().replace(q, x).split(c), y = v.length;
for (;0 !== y--; ) if ((b = v[y]) && null == e[b]) for (h.push(b), e[b] = !0, m = b.split(f), 
p = m.length; 0 !== p--; ) (b = m[p]) && null == e[b] && (h.push(b), e[b] = !0);
return h;
}
function t(b) {
return r(b, [], {});
}
function d(b) {
let h = [], e = {}, m = b.length;
for (;0 !== m--; ) r(b[m], h, e);
return h;
}
function a() {
k = "";
g = [];
}
let l = [], g = [], k = "";
const q = /[^a-z0-9]/g, n = B.require("$29", "flatten.json"), c = /\s+/, f = /[^\d\p{L}]+/u;
return {
split: t,
find: function(b, h) {
{
const e = [], m = [], p = String(b || "").toLowerCase().replace(q, x).split(" "), v = p.length, y = k && b.substring(0, k.length) === k ? g : l, z = y.length, D = !!h;
let E = -1, F = 0;
a: for (;++E < z; ) {
const G = y[E], H = G && G.length;
if (H) {
b: for (let N = 0; N < v; N++) {
const O = p[N];
for (let R = 0; R < H; R++) if (0 === G[R].indexOf(O)) continue b;
continue a;
}
m[E] = G;
e.push(D ? h[E] : E);
} else F++;
}
k = b;
g = m;
b = e;
}
return b;
},
add: function(b, h) {
l[b] = t(h);
k && a();
},
push: function(b) {
l[l.length] = d(b);
k && a();
},
index: function(b, h) {
l[b] = d(h);
k && a();
},
size: function() {
return l.length;
},
clear: function() {
l = [];
k && a();
},
remove: function(b) {
l[b] = null;
k && a();
},
noop: function() {
a();
return [];
}
};
};
return w;
}({}, J, L));
B.register("$11", function(w, u, C) {
w.listen = function(x, r) {
function t() {
b[g ? "show" : "hide"]();
}
function d(h) {
f && n.setAttribute("size", 2 + h.length);
g = h;
t();
return h;
}
function a() {
k = null;
r(g);
}
function l(h) {
let e = n.value;
c && e === c && (e = "");
e !== g ? (k && clearTimeout(k), d(e), h ? k = setTimeout(a, h) : a()) : k && null == h && (clearTimeout(k), 
a());
}
let g, k, q = 150;
const n = x instanceof jQuery ? x[0] : x, c = u.attachEvent && n.getAttribute("placeholder"), f = 1 === Number(n.size), b = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
n.value = "";
l();
return !1;
});
d(n.value);
A(n).on("input", function() {
l(q);
return !0;
}).on("blur focus change", function() {
l(null);
return !0;
}).after(b);
t();
return {
delay: function(h) {
q = h;
return this;
},
ping: function(h) {
h ? (k && clearTimeout(k), h = n.value, c && h === c && (h = ""), d(h), a(), h = void 0) : h = l();
return h;
},
val: function(h) {
if (null == h) return g;
k && clearTimeout(k);
n.value = d(h);
t();
},
el: function() {
return n;
},
blur: function(h) {
return A(n).on("blur", h);
},
destroy: function() {
k && clearTimeout(k);
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
let g = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: d,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
l && (g = A.extend({}, g, l));
a.tipsy(g);
};
w.delays = function(a, l) {
t = a || 150;
d = l || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(a, l) {
l.data("tipsy").setTitle(a);
};
let t, d;
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
var g = l[0].offsetWidth, k = l[0].offsetHeight, q = x(this.options.gravity, this.$element[0]);
switch (q.charAt(0)) {
case "n":
var n = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "s":
n = {
top: a.top - k - this.options.offset,
left: a.left + a.width / 2 - g / 2
};
break;

case "e":
n = {
top: a.top + a.height / 2 - k / 2,
left: a.left - g - this.options.offset
};
break;

case "w":
n = {
top: a.top + a.height / 2 - k / 2,
left: a.left + a.width + this.options.offset
};
}
2 == q.length && ("w" == q.charAt(1) ? n.left = a.left + a.width / 2 - 15 : n.left = a.left + a.width / 2 - g + 15);
l.css(n).addClass("tipsy-" + q);
l.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + q.charAt(0);
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
var a, l = this.$element, g = this.options;
this.fixTitle();
"string" == typeof g.title ? a = l.attr("title" == g.title ? "original-title" : g.title) : "function" == typeof g.title && (a = g.title.call(l[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || g.fallback;
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
function l(c) {
var f = A.data(c, "tipsy");
f || (f = new r(c, A.fn.tipsy.elementOptions(c, a)), A.data(c, "tipsy", f));
return f;
}
function g() {
var c = l(this), f = a.delayIn;
c.hoverState = "in";
0 == f ? c.show() : (c.fixTitle(), setTimeout(function() {
"in" == c.hoverState && c.show();
}, f));
}
function k() {
var c = l(this), f = a.delayOut;
c.hoverState = "out";
0 == f ? c.hide() : (c.tip().removeClass("in"), setTimeout(function() {
"out" == c.hoverState && c.hide();
}, f));
}
a = A.extend({}, A.fn.tipsy.defaults, a);
a.live || this.each(function() {
l(this);
});
if ("manual" != a.trigger) {
var q = a.live ? "live" : "bind", n = "hover" == a.trigger ? "mouseleave" : "blur";
this[q]("hover" == a.trigger ? "mouseenter" : "focus", g)[q](n, k);
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
var g = l[0], k = 1 < l.length ? l[1] : !1, q = A(C).scrollTop() + a, n = A(C).scrollLeft() + a, c = A(this);
c.offset().top < q && (g = "n");
c.offset().left < n && (k = "w");
A(u).width() + A(C).scrollLeft() - c.offset().left < a && (k = "e");
A(u).height() + A(C).scrollTop() - c.offset().top < a && (g = "s");
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
function r(k, q) {
return '<a href="' + k + '" target="' + (q.indexOf(l) ? "_blank" : "_top") + '">' + q + "</a>";
}
let t, d, a, l, g = function() {
t = /[<>&]/g;
d = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
l = location.hostname;
g = null;
};
return function(k, q) {
g && g();
k = k.replace(t, x);
q && (k = k.replace(a, r).replace(d, "<br />"));
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
const l = new x();
for (const g in a) l[g] = a[g];
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
let l, g = this.lang || "zxx";
if (l = this.script) g += a + l;
if (l = this.region) g += a + l;
if (l = this.variant) g += a + l;
if (l = this.extension) g += a + l;
return g;
};
u.getIcon = function() {
let a = 4, l = [];
const g = [ "variant", "region", "script", "lang" ];
for (;0 !== a--; ) {
const k = g[a];
let q = this[k];
q && (q.join && (q = q.join("-")), 1 === a && 3 === q.length ? l.push("region-m49") : l = l.concat([ k, k + "-" + q.toLowerCase() ]));
}
return l.join(" ");
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
let l, g, k = !0;
for (l in this) g = this[l], g === r ? (x(a + "." + l + "() must be implemented"), 
k = !1) : g instanceof t && (x(a + "." + l + " must be defined"), k = !1);
return k;
};
w.init = function(a, l) {
const g = new d();
if (a) {
let k = a.length;
for (;0 !== k--; ) g[a[k]] = r;
}
if (l) for (a = l.length; 0 !== a--; ) g[l[a]] = new t();
return g;
};
w.validate = function(a) {
const l = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(l && l[1] || "Object");
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
var l = d();
const g = Math.max(0, 16 - (l - x)), k = l + g;
l = u.setTimeout(function() {
a(k);
}, g);
x = k;
return l;
}, t = function(a) {
clearTimeout(a);
});
const d = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, l) {
function g() {
q = r(g, l);
a(k++);
}
let k = 0, q;
g();
return {
stop: function() {
q && t(q);
q = null;
}
};
};
return w;
}({}, J, L));
B.register("$48", function(w, u, C) {
function x(n, c, f, b) {
if (d) {
const h = f;
f = function(e) {
if ((e.MSPOINTER_TYPE_TOUCH || "touch") === e.pointerType) return h(e);
};
}
n.addEventListener(c, f, b);
return {
unbind: function() {
n.removeEventListener(c, f, b);
}
};
}
function r(n) {
n.preventDefault();
n.stopPropagation();
return !1;
}
let t;
const d = !!u.navigator.msPointerEnabled, a = d ? "MSPointerDown" : "touchstart", l = d ? "MSPointerMove" : "touchmove", g = d ? "MSPointerUp" : "touchend";
w.ok = function(n) {
null == t && (t = "function" === typeof C.body.addEventListener);
t && n && n(w);
return t;
};
w.ms = function() {
return d;
};
w.dragger = function(n, c) {
function f(m) {
n.addEventListener(m, h[m], !1);
}
function b(m) {
n.removeEventListener(m, h[m], !1);
}
const h = {};
h[a] = function(m) {
k(m, function(p, v) {
v.type = a;
c(m, v, e);
});
f(l);
f(g);
return !0;
};
h[g] = function(m) {
b(l);
b(g);
k(m, function(p, v) {
v.type = g;
c(m, v, e);
});
return !0;
};
h[l] = function(m) {
k(m, function(p, v) {
v.type = l;
c(m, v, e);
});
return r(m);
};
f(a);
let e = {
kill: function() {
b(a);
b(l);
b(g);
n = e = c = null;
}
};
return e;
};
w.swiper = function(n, c, f) {
function b(F) {
n.addEventListener(F, y[F], !1);
}
function h(F) {
n.removeEventListener(F, y[F], !1);
}
function e() {
m && m.stop();
m = null;
}
let m, p, v, y = {}, z = [], D = [], E = [];
y[a] = function(F) {
p = !1;
e();
const G = q();
k(F, function(H, N) {
z[H] = G;
D[H] = N.clientX;
E[H] = N.clientY;
});
v = n.scrollLeft;
return !0;
};
y[g] = function(F) {
k(F, function(G, H) {
const N = q() - z[G];
G = D[G] - H.clientX;
c(Math.abs(G) / N, G ? 0 > G ? -1 : 1 : 0);
});
v = null;
return !0;
};
y[l] = function(F) {
let G, H;
null == v || k(F, function(N, O) {
G = D[N] - O.clientX;
H = E[N] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return p = !0;
G && (p = !0, n.scrollLeft = Math.max(0, v + G));
return r(F);
};
if (!d || f) b(a), b(l), b(g), d && (n.className += " mstouch");
return {
kill: function() {
h(a);
h(l);
h(g);
e();
},
swiped: function() {
return p;
},
ms: function() {
return d;
},
snap: function(F) {
d && !f && (n.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
n.style["-ms-scroll-snap-type"] = "mandatory", n.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, G, H) {
e();
let N = n.scrollLeft;
const O = F > N ? 1 : -1, R = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return m = B.require("$51", "fps.js").loop(function(Q) {
Q && (N = Math.max(0, R(F, N + I)), n.scrollLeft = N, F === N && (e(), H && H(N)));
}, n);
}
};
};
w.start = function(n, c) {
return x(n, a, c, !1);
};
w.move = function(n, c) {
return x(n, l, c, !1);
};
w.end = function(n, c) {
return x(n, g, c, !1);
};
const k = w.each = function(n, c) {
if (d) (n.MSPOINTER_TYPE_TOUCH || "touch") === n.pointerType && c(0, n); else {
n = (n.originalEvent || n).changedTouches || [];
for (var f = -1; ++f < n.length; ) c(f, n[f]);
}
}, q = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, J, L));
B.register("$52", function(w, u, C) {
w.init = function(x) {
function r() {
l.style.top = String(-x.scrollTop) + "px";
return !0;
}
function t() {
var k = l;
k.textContent = x.value;
k.innerHTML = k.innerHTML.replace(/[ \t]/g, d).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function d(k) {
return '<span class="x' + k.charCodeAt(0).toString(16) + '">' + k + "</span>";
}
var a = x.parentNode, l = a.insertBefore(C.createElement("div"), x);
A(x).on("input", t).on("scroll", r);
A(a).addClass("has-mirror");
l.className = "ta-mirror";
var g = x.offsetWidth - x.clientWidth;
2 < g && (l.style.marginRight = String(g - 2) + "px");
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
B.register("$36", function(w, u, C) {
function x(d, a) {
d = r[d] || [];
a = a && u[a];
const l = d.length;
let g = -1, k = 0;
for (;++g < l; ) {
const q = d[g];
"function" === typeof q && (q(a), k++);
}
return k;
}
const r = {};
let t = "";
w.load = function(d, a, l) {
function g() {
n && (clearTimeout(n), n = null);
c && (c.onreadystatechange = null, c = c = c.onload = null);
d && (delete r[d], d = null);
}
function k(f, b) {
f = c && c.readyState;
if (b || !f || "loaded" === f || "complete" === f) b || x(d, l), g();
}
function q() {
if (0 === x(d)) throw Error('Failed to load "' + (l || d) + '"');
g();
}
if (l && u[l]) "function" === typeof a && a(u[l]); else if (null != r[d]) r[d].push(a); else {
r[d] = [ a ];
var n = setTimeout(q, 4e3), c = C.createElement("script");
c.setAttribute("src", d);
c.setAttribute("async", "true");
c.onreadystatechange = k;
c.onload = k;
c.onerror = q;
c.onabort = g;
C.getElementsByTagName("head")[0].appendChild(c);
}
};
w.stat = function(d) {
var a;
if (!(a = t)) {
{
a = C.getElementsByTagName("script");
const l = a.length;
let g = -1, k = "";
for (;++g < l; ) {
const q = a[g].getAttribute("src");
if (q) {
const n = q.indexOf("/lib/vendor");
if (-1 !== n) {
k = q.substring(0, n);
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
w.css = function(d, a) {
C.getElementById(a) || A("<link />").attr("rel", "stylesheet").attr("href", d).attr("id", a).appendTo(C.head);
};
return w;
}({}, J, L));
B.register("$16", function(w, u, C) {
function x(q, n) {
q.setReadOnly(!1);
q.on("change", function(c, f) {
return n.val(f.getValue());
});
q.on("focus", function() {
return n.focus();
});
q.on("blur", function() {
return n.blur();
});
}
function r(q) {
q.off("change");
q.off("focus");
q.off("blur");
}
function t(q) {
r(q);
q.setReadOnly(!0);
q.setHighlightGutterLine(!1);
q.setHighlightActiveLine(!1);
}
function d(q, n) {
function c() {
this.HighlightRules = f;
}
var f = a(n);
q = q.require;
n = q("ace/lib/oop");
n.inherits(f, q("ace/mode/text_highlight_rules").TextHighlightRules);
n.inherits(c, q("ace/mode/text").Mode);
return new c();
}
function a(q) {
return function() {
var n = {
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
}, c = l(q);
"icu" === q ? n = {
start: n.start.concat([ {
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
} : c && n.start.push({
token: "printf",
regex: c
});
this.$rules = n;
};
}
function l(q) {
switch (q) {
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
w.init = function(q, n, c) {
var f, b = !1, h = c || k, e = q.parentNode, m = e.appendChild(C.createElement("div"));
A(e).addClass("has-proxy has-ace");
B.require("$36", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(p) {
if (m) {
if (!p) throw Error("Failed to load code editor");
f = p.edit(m);
var v = f.session, y = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(b);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
v.setUseSoftTabs(!1);
y.setShowGutter(!0);
y.setPadding(10);
y.setScrollMargin(8);
v.setMode(d(p, h));
f.setValue(q.value, -1);
v.setUseWrapMode(!0);
n ? x(f, n) : t(f);
}
}, "ace");
return {
kill: function() {
f && (r(f), f.destroy(), f = null);
m && (e.removeChild(m), A(e).removeClass("has-proxy has-ace"), m = null);
return this;
},
disable: function() {
f && t(f);
n = null;
return this;
},
enable: function(p) {
n = p;
f && x(f, p);
return this;
},
resize: function() {
f && f.resize();
return this;
},
val: function(p) {
f && p !== f.getValue() && f.setValue(p, -1);
return this;
},
invs: function(p) {
p = p || !1;
b !== p && (b = p, f && f.setShowInvisibles(p));
return this;
},
strf: function(p) {
p = p || k;
p !== h && (h = p, f && f.session.setMode(d(u.ace, p)));
return this;
},
focus: function() {
return this;
}
};
};
w.strf = function(q, n) {
k = q;
g = n;
return w;
};
return w;
}({}, J, L));
B.register("$53", function(w, u, C) {
function x(a, l) {
function g() {
return l.val(a.getContent());
}
a.on("input", g);
a.on("change", g);
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
let d = 0;
w.load = function(a) {
const l = B.require("$36", "remote.js");
l.css(l.stat("/css/lib/tinymce.css"), "tinymce-css");
l.load(l.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, l) {
function g(p) {
c = p;
f = "<p>" === p.substring(0, 3) && "</p>" === p.substring(p.length - 4);
return p.replace(/(<\/?)script/gi, "$1loco:script");
}
function k(p) {
q = p;
p._getContent = p.getContent;
p.getContent = function(v) {
v = this._getContent(v);
v = v.replace(/(<\/?)loco:script/gi, "$1script");
if (!f && "<p>" === v.substring(0, 3) && "</p>" === v.substring(v.length - 4)) {
const y = v.substring(3, v.length - 4);
if (y === c || -1 === y.indexOf("</p>")) v = y;
}
return v;
};
p._setContent = p.setContent;
p.setContent = function(v, y) {
return this._setContent(g(v), y);
};
l ? (x(p, l), l.reset()) : t(p);
A(e).removeClass("loading");
}
let q, n = !1, c = "", f = !1, b = a.parentNode, h = b.parentNode, e = b.appendChild(C.createElement("div")), m = h.insertBefore(C.createElement("nav"), b);
m.id = "_tb" + String(++d);
A(b).addClass("has-proxy has-mce");
A(e).addClass("mce-content-body loading").html(g(a.value));
w.load(function(p) {
if (!p) throw Error("Failed to load HTML editor");
e && p.init({
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
val: function(p) {
p = g(p);
null == q ? (a.value = p, A(e).html(p)) : q.getContent() !== p && q.setContent(p);
l && l.val(p);
return this;
},
kill: function() {
q && (l && l.val(q.getContent()), r(q), q.destroy(), q = null);
e && (b.removeChild(e), A(b).removeClass("has-proxy has-mce"), e = null);
m && (h.removeChild(m), m = null);
return this;
},
enable: function(p) {
l = p;
q && x(q, p);
return this;
},
disable: function() {
q && t(q);
l = null;
return this;
},
focus: function() {
q && l && q.focus();
return this;
},
invs: function(p) {
p = p || !1;
n !== p && (n = p, A(b)[p ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, J, L));
B.register("$49", function(w, u, C) {
function x(d) {
function a() {
n && (c.off("input", l), n = !1);
}
function l() {
const e = d.value;
e !== b && (c.trigger("changing", [ e, b ]), b = e);
}
function g() {
l();
n && h !== b && c.trigger("changed", [ b ]);
}
function k() {
t = d;
h = b;
n || (c.on("input", l), n = !0);
c.trigger("editFocus");
f.addClass("has-focus");
return !0;
}
function q() {
t === d && (t = null);
c.trigger("editBlur");
f.removeClass("has-focus");
n && (g(), a());
return !0;
}
let n = !1, c = A(d), f = A(d.parentNode), b = d.value, h;
c.on("blur", q).on("focus", k);
return {
val: function(e) {
b !== e && (d.value = e, c.triggerHandler("input"), b = e);
return !0;
},
kill: function() {
a();
c.off("blur", q).off("focus", k);
},
fire: function() {
b = null;
l();
},
ping: g,
blur: q,
focus: k,
reset: function() {
h = b = d.value;
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
var l = this.l;
l && !a && (this.disable(), l = null);
this.val(d || "");
a && !l && this.enable();
return this;
};
u.val = function(d) {
const a = this.e;
if (null == d) return a.value;
const l = this.l, g = this.p;
g && g.val(d);
l && l.val(d);
l || a.value === d || (a.value = d, A(a).triggerHandler("input"));
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
d ? d.focus() : A(this.e).focus();
};
u.focused = function() {
return t && t === this.el;
};
u.parent = function() {
return this.e.parentNode;
};
u.attr = function(d, a) {
var l = this.e;
if (1 === arguments.length) return l.getAttribute(d);
null == a ? l.removeAttribute(d) : l.setAttribute(d, a);
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
var l = this.i || !1;
if (a || l !== d) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(d) : d && (this._i = B.require("$52", "mirror.js").init(this.e)), 
this.i = d;
return this;
};
u.getInvs = function() {
return this.i || !1;
};
u.setMode = function(d) {
var a = this.p, l = this.i || !1;
d !== (this.m || "") && (this.m = d, a && a.kill(), this.p = a = "code" === d ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === d ? B.require("$53", "mce.js").init(this.e, this.l) : null, 
this.setInvs(l, !0), t && this.focus());
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
function x(b) {
const h = u.console;
h && h.error && h.error(b);
}
function r(b) {
const h = C.createElement("div");
b && h.setAttribute("class", b);
return h;
}
function t(b) {
return function() {
b.resize();
return this;
};
}
function d(b) {
return function(h) {
let e = h.target, m = e.$index;
for (;null == m && "DIV" !== e.nodeName && (e = e.parentElement); ) m = e.$index;
null != m && (h.stopImmediatePropagation(), b.select(m));
return !0;
};
}
function a(b) {
return function() {
b.redrawDirty() && b.redraw();
return !0;
};
}
function l(b) {
return function(h) {
var e = h.keyCode;
if (40 === e) e = 1; else if (38 === e) e = -1; else return !0;
if (h.shiftKey || h.ctrlKey || h.metaKey || h.altKey) return !0;
b.selectNext(e);
h.stopPropagation();
h.preventDefault();
return !1;
};
}
function g(b, h, e) {
function m(p) {
x("row[" + p + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(p) {
const v = h || 0, y = e ? -1 : 1, z = b.rows || [];
p.sort(function(D, E) {
return y * (z[D] || m(D)).cellVal(v).localeCompare((z[E] || m(E)).cellVal(v));
});
};
}
function k(b) {
this.w = b;
}
function q(b) {
this.t = b;
this.length = 0;
}
function n(b, h, e) {
let m = C.createElement("div");
m.className = e || "";
this._ = m;
this.d = h || [];
this.i = b || 0;
this.length = h.length;
}
function c(b) {
this.live = b;
this.rows = [];
}
w.create = function(b) {
return new k(b);
};
var f = k.prototype;
f.init = function(b) {
let h = this.w, e = h.id;
var m = h.splity(e + "-thead", e + "-tbody"), p = m[0];
m = m[1];
let v = [], y = [], z = [], D = [];
if (b) this.ds = b, this.idxs = y, this._idxs = null; else if (!(b = this.ds)) throw Error("No datasource");
p.css.push("wg-thead");
m.css.push("wg-tbody");
b.eachCol(function(O, R, I) {
z[O] = e + "-col-" + R;
D[O] = I || R;
});
var E = r();
let F = -1, G = z.length, H = r("wg-cols"), N = p.splitx.apply(p, z);
for (;++F < G; ) N[F].header(D[F]), H.appendChild(E.cloneNode(!1)).setAttribute("for", z[F]);
b.eachRow(function(O, R, I) {
v[O] = new n(O, R, I);
y[O] = O;
});
this.rows = v;
this.cols = H;
this.ww = null;
this.root = E = m.body;
this.head = p;
p.redraw = t(this);
p = m.fixed = N[0].bodyY() || 20;
h.lock().resize(p, m);
h.css.push("is-table");
h.restyle();
this.sc ? this._re_sort(G) : b.sort && b.sort(y);
this.redrawDirty();
this.render();
A(E).attr("tabindex", "-1").on("keydown", l(this)).on("mousedown", d(this)).on("scroll", a(this));
return this;
};
f.clear = function() {
const b = this.pages || [];
let h = b.length;
for (;0 !== h--; ) b[h].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
f.render = function() {
let b, h = [], e = this.rows || [], m = -1, p, v = this.idxs, y = v.length, z = this.idxr = {}, D = this.r, E = this._r, F = this.root, G = this.cols;
for (;++m < y; ) {
if (0 === m % 100) {
var H = G.cloneNode(!0);
b = new c(H);
b.i = h.length;
b.h = 2200;
b.insert(F);
h.push(b);
}
p = v[m];
z[p] = m;
H = e[p];
if (null == H) throw Error("Render error, no data at [" + p + "]");
H.page = b;
b.rows.push(H);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = h;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == D ? null != E && (H = e[E]) && H.page && (delete this._r, this.select(E, !0)) : (H = e[D]) && H.page ? this.select(D, !0) : (this.deselect(), 
this._r = D);
return this;
};
f.resize = function() {
let b = -1, h = this.ww || (this.ww = []);
var e = this.w;
let m = e.cells[0], p = m.body.childNodes, v = p.length, y = this.pages || [], z = y.length;
for (e.redraw.call(m); ++b < v; ) h[b] = p[b].style.width;
if (z) {
e = this.mx;
for (b = this.mn; b <= e; b++) y[b].widths(h);
this.redrawDirty() && this.redraw();
}
};
f.redrawDirty = function() {
let b = !1;
var h = this.root;
const e = h.scrollTop;
h = h.clientHeight;
this.sy !== e && (b = !0, this.sy = e);
this.vh !== h && (b = !0, this.vh = h);
return b;
};
f.redraw = function() {
let b = 0, h = -1, e = null, m = null, p = this.ww;
var v = this.sy;
let y = this.mn, z = this.mx, D = Math.max(0, v - 100);
v = this.vh + v + 100;
let E, F = this.pages || [], G = F.length;
for (;++h < G && !(b > v); ) E = F[h], b += E.height(), b < D || (null === e && (e = h), 
m = h, E.rendered || E.render(p));
if (y !== e) {
if (null !== y && e > y) for (h = y; h < e; h++) {
E = F[h];
if (!E) throw Error("Shit!");
E.rendered && E.sleep();
}
this.mn = e;
}
if (z !== m) {
if (null !== z && m < z) for (h = z; h > m; h--) E = F[h], E.rendered && E.sleep();
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
f.tr = function(b) {
return (b = this.row(b)) ? b.cells() : [];
};
f.row = function(b) {
return this.rows[b];
};
f.td = function(b, h) {
return this.tr(b)[h];
};
f.next = function(b, h, e) {
null == e && (e = this.r || 0);
const m = this.idxs, p = m.length;
let v = e = (this.idxr || {})[e];
for (;e !== (v += b) && !(0 <= v && p > v); ) if (h && p) v = 1 === b ? -1 : p, 
h = !1; else return null;
e = m[v];
return null == e || null == this.rows[e] ? (x("Bad next: [" + v + "] does not map to data row"), 
null) : e;
};
f.selectNext = function(b, h, e) {
b = this.next(b, h);
null != b && this.r !== b && this.select(b, e);
return this;
};
f.deselect = function(b) {
const h = this.r;
null != h && (this.r = null, A(this.tr(h)).removeClass("selected"), this.w.fire("wgRowDeselect", [ h, b ]));
return this;
};
f.selectRow = function(b, h) {
return this.select(this.idxs[b], h);
};
f.select = function(b, h) {
const e = this.rows[b];
var m = e && e.page;
if (!m) return this.deselect(!1), x("Row is filtered out"), this;
this.deselect(!0);
let p, v = this.w.cells[1];
m.rendered || (p = m.top(), v.scrollY(p), this.redrawDirty() && this.redraw());
if (!e.rendered) return m.rendered || x("Failed to render page"), x("Row [" + e.i + "] not rendered"), 
this;
m = e.cells();
A(m).addClass("selected");
this.r = b;
h || (p = v.scrollY(), A(this.root).focus(), p !== v.scrollY() && v.scrollY(p));
v.scrollTo(m[0], !0);
this.w.fire("wgRowSelect", [ b, e.data() ]);
return this;
};
f.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
f.filter = function(b) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(b);
return this.clear().render();
};
f.each = function(b) {
let h, e = -1;
const m = this.rows || [], p = this.idxs || [], v = p.length;
for (;++e < v; ) h = p[e], b(m[h], e, h);
return this;
};
f.sortable = function(b) {
const h = this.sc || (this.sc = new q(this));
h.has(b) || h.add(b);
return this;
};
f._re_sort = function(b) {
let h = -1, e = this.sc, m = e.active;
for (this.sc = e = new q(this); ++h < b; ) e.add(h);
m && (h = this.head.indexOf(m.id), -1 === h && (h = Math.min(m.idx, b - 1)), this.sort(h, m.desc));
return this;
};
f._sort = function(b, h) {
h ? (this.s = h, h(b)) : (h = this.s) && h(b);
return b;
};
f.sort = function(b, h) {
this._sort(this.idxs, g(this, b, h));
this.sc.activate(b, h);
return this;
};
f = null;
f = q.prototype;
f.has = function(b) {
return null != this[b];
};
f.add = function(b) {
const h = this, e = h.t.head.cells[b];
h[b] = {
desc: null,
idx: b,
id: e.id
};
h.length++;
e.addClass("wg-sortable").on("click", function(m) {
if ("header" === m.target.nodeName.toLowerCase()) return m.stopImmediatePropagation(), 
h.toggle(b), !1;
});
return h;
};
f.toggle = function(b) {
this.t.sort(b, !this[b].desc).clear().render();
return this;
};
f.activate = function(b, h) {
let e, m = this.active, p = this[b], v = this.t.head.cells;
m && (e = v[m.idx]) && (e.removeClass(m.css), m !== p && e.restyle());
(e = v[b]) ? (p.desc = h, this.active = p, b = "wg-" + (h ? "desc" : "asc"), e.addClass(b).restyle(), 
p.css = b) : this.active = null;
return this;
};
f = null;
f = n.prototype;
f.render = function(b) {
let h, e = [], m = this._, p = this.length;
if (m) {
for (this.c = e; 0 !== p--; ) h = m.cloneNode(!1), e[p] = this.update(p, h), h.$index = this.i, 
b[p].appendChild(h);
this._ = null;
} else for (e = this.c; 0 !== p--; ) b[p].appendChild(e[p]);
this.rendered = !0;
return this;
};
f.update = function(b, h) {
h = h || this.c[b] || {};
b = (this.d[b] || function() {})() || " ";
null == b.innerHTML ? h.textContent = b : h.innerHTML = b.innerHTML;
return h;
};
f.cells = function() {
return this.c || [ this._ ];
};
f.data = function() {
let b = -1;
const h = [], e = this.length;
for (;++b < e; ) h[b] = this.cellVal(b);
return h;
};
f.destroy = function() {
this.page = null;
this.rendered = !1;
};
f.cellVal = function(b) {
b = this.d[b]() || "";
return String(b.textContent || b);
};
f = null;
f = c.prototype;
f.size = function() {
return this.rows.length;
};
f.insert = function(b) {
const h = this.h, e = r("wg-dead");
e.style.height = String(h) + "px";
b.appendChild(e);
return this.dead = e;
};
f.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
f.height = function() {
let b = this.h;
null == b && (this.h = b = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
b || x("row has zero height");
return b;
};
f.render = function(b) {
let h, e = -1, m = this.rows, p = m.length;
const v = this.dead, y = this.live, z = y.childNodes;
for (;++e < p; ) h = m[e], h.rendered || h.render(z);
p = b.length;
for (e = 0; e < p; e++) z[e].style.width = b[e];
v.parentNode.replaceChild(y, v);
this.rendered = !0;
this.h = null;
return this;
};
f.sleep = function() {
const b = this.height(), h = this.live, e = this.dead;
e.style.height = String(b) + "px";
h.parentNode.replaceChild(e, h);
this.rendered = !1;
this.h = b;
return this;
};
f.sleepH = function(b) {
b *= this.rows.length;
const h = this.dead;
h && (h.style.height = String(b) + "px");
this.rendered || (this.h = b);
return this;
};
f.widths = function(b) {
const h = this.live.childNodes;
let e = b.length;
for (;0 !== e--; ) h[e].style.width = b[e];
return this;
};
f.destroy = function() {
var b = this.rendered ? this.live : this.dead;
const h = this.rows;
b.parentNode.removeChild(b);
for (b = h.length; 0 !== b--; ) h[b].destroy();
};
return w;
}({}, J, L));
B.register("$45", function(w, u, C) {
function x(e, m) {
var p = e.id;
let v = p && f[p], y = v && v.parent();
if (!v || !y) return null;
var z = 1 === y.dir;
p = z ? "X" : "Y";
let D = "page" + p;
z = z ? c : n;
let E = z(y.el);
p = m["offset" + p];
let F = y.el, G = F.className;
null == p && (p = m[D] - z(e));
p && (E += p);
F.className = G + " is-resizing";
return {
done: function() {
F.className = G;
},
move: function(H) {
y.resize(H[D] - E, v);
return !0;
}
};
}
function r(e) {
function m() {
A(C).off("mousemove", p);
h && (h.done(), h = null);
return !0;
}
function p(v) {
h ? h.move(v) : m();
return !0;
}
if (h) return !0;
h = x(e.target, e);
if (!h) return !0;
A(C).one("mouseup", m).on("mousemove", p);
return d(e);
}
function t(e, m) {
const p = m.type;
"touchmove" === p ? h && h.move(m) : "touchstart" === p ? h = x(e.target, m) : "touchend" === p && h && (h.done(), 
h = null);
}
function d(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function a(e) {
b && b.redraw();
e && e.redraw();
return b = e;
}
function l(e, m) {
const p = A(m);
p.on("editFocus", function() {
p.trigger("wgFocus", [ a(e) ]);
}).on("editBlur", function() {
p.trigger("wgBlur", [ a(null) ]);
});
}
function g(e) {
const m = e.id, p = e.className;
this.id = m;
this.el = e;
this.pos = this.index = 0;
this.css = [ p || "wg-root", "wg-cell" ];
this._cn = p;
f[m] = this;
this.clear();
}
const k = B.include("$47", "html.js") || B.include("$2", "html.js", !0), q = B.require("$27", "dom.js"), n = q.top, c = q.left, f = {};
let b, h = !1;
w.init = function(e) {
const m = new g(e);
m.redraw();
B.require("$48", "touch.js").ok(function(p) {
p.dragger(e, t);
});
A(e).on("mousedown", r);
return m;
};
u = g.prototype;
u.fire = function(e, m) {
e = A.Event(e);
e.cell = this;
A(this.el).trigger(e, m);
return this;
};
u.each = function(e) {
let m = -1;
const p = this.cells, v = p.length;
for (;++m < v; ) e(p[m], m);
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
u.$ = function(e, m) {
A.fn[e].apply(A(this.el), m);
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
let p = -1;
let v = m.length, y = 1 / v, z = 0;
for (;++p < v; ) {
var D = q.el();
this.body.appendChild(D);
var E = D;
{
var F = m[p];
let G = 1, H = F;
for (;f[F]; ) F = H + "-" + ++G;
}
E.id = F;
D = new g(D);
D.index = p;
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
const e = this.el, m = this.cells, p = this.field, v = this.body, y = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete f[m[z].destroy().id];
this.cells = [];
this.length = 0;
y && (e.removeChild(y), this.nav = null);
v && (p && (p.destroy(), this.field = null), this.table && (this.table = null), 
e === v.parentNode && e.removeChild(v));
this.body = e.appendChild(q.el("", "wg-body"));
this._h = null;
return this;
};
u.resize = function(e, m) {
if (!m && (m = this.cells[1], !m)) return;
var p = m.index;
let v = this.cells, y = A(this.el)[1 === this.dir ? "width" : "height"](), z = v[p + 1];
p = v[p - 1];
m.pos = Math.min((z ? z.pos * y : y) - ((m.body || m.el.firstChild).offsetTop || 0), Math.max(p ? p.pos * y : 0, e)) / y;
this.redraw();
this.fire("wgResize");
return this;
};
u.distribute = function(e) {
let m = -1, p = 0, v;
const y = this.cells, z = e.length;
for (;++m < z && (v = y[++p]); ) v.pos = Math.max(0, Math.min(1, e[m]));
this.redraw();
return this;
};
u.distribution = function() {
let e = [], m = 0;
const p = this.cells, v = p.length - 1;
for (;m < v; ) e[m] = p[++m].pos;
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
var p = this.body, v = this.field;
if (p) {
var y = m.clientWidth || 0, z = m.clientHeight || 0, D = p.offsetTop || 0;
z = D > z ? 0 : z - D;
if (this._h !== z) {
this._h = z;
p.style.height = String(z) + "px";
var E = v;
}
this._w !== y && (this._w = y, E = v);
E && E.redraw();
}
p = this.length;
y = 1;
z = this.nav;
for (D = 2 === this.dir ? "height" : "width"; 0 !== p--; ) v = this.cells[p], z ? E = 1 : (v.fixed && (v.pos = v.fixed / A(m)[D]()), 
E = y - v.pos, y = v.pos), v.el.style[D] = String(100 * E) + "%", v.redraw(e);
return this;
};
u.contents = function(e, m) {
const p = this.el;
let v = this.body;
if (null == e) return v.innerHTML;
this.length ? this.clear() : v && (p.removeChild(v), v = null);
v || (this.body = v = p.appendChild(q.el("", m || "wg-content")), this._h = null, 
(m = this.lang) && this._locale(m, this.rtl, !0));
"string" === typeof e ? A(v)._html(e) : e && this.append(e);
this.redraw();
return this;
};
u.textarea = function(e, m) {
let p = this.field;
if (p) {
var v = p.editable();
p.reload(e, m);
v !== m && this.restyle();
} else this.length && this.clear(), v = q.el("textarea"), v.setAttribute("wrap", "virtual"), 
v.value = e, this.contents(v), p = B.require("$49", "field.js")._new(v)[m ? "enable" : "disable"](), 
l(this, v), this.field = p, this.restyle();
this.lang || this.locale("en");
return p;
};
u.locale = function(e) {
e = B.require("$43", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
u._locale = function(e, m, p) {
const v = this.body;
if (p || e !== this.lang) this.lang = e, v && v.setAttribute("lang", e);
if (p || m !== this.rtl) this.rtl = m, v && v.setAttribute("dir", m ? "RTL" : "LTR");
return this;
};
u.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
let m = this.cells, p = m.length, v = this.navigated();
if (null != v) return m[v].editable();
for (;++v < p; ) if (e = m[v].editable()) return e;
};
u.eachTextarea = function(e) {
const m = this.field;
m ? e(m) : this.each(function(p) {
p.eachTextarea(e);
});
return this;
};
u.append = function(e) {
e && (e.nodeType ? k.init(this.body.appendChild(e)) : k.init(A(e).appendTo(this.body)));
return this;
};
u.prepend = function(e) {
const m = this.body;
if (e.nodeType) {
const p = m.firstChild;
k.init(p ? m.insertBefore(e, p) : m.appendChild(e));
} else k.init(A(e).prependTo(m));
return this;
};
u.before = function(e) {
const m = this.body;
e.nodeType ? k.init(this.el.insertBefore(e, m)) : k.init(A(e).insertBefore(m));
return this;
};
u.header = function(e, m) {
if (null == e && null == m) return this.el.getElementsByTagName("header")[0];
this.t = q.txt(e || "");
this.el.insertBefore(q.el("header", m), this.body).appendChild(this.t);
this.redraw();
return this;
};
u.toolbar = function() {
const e = this.header(), m = e.getElementsByTagName("nav");
return 0 === m.length ? e.appendChild(q.el("nav")) : m[0];
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
return n(this.body, this.el);
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
let p = this.body;
var v = p.scrollTop;
let y = n(e, p);
if (v > y) v = y; else {
const z = p.clientHeight;
e = y + A(e).outerHeight();
if (z + v < e) v = e - z; else return;
}
m ? p.scrollTop = v : A(p).stop(!0).animate({
scrollTop: v
}, 250);
};
u.navigize = function(e, m) {
function p(G) {
const H = z[G], N = y[G], O = A(H.el).show();
N.addClass("active");
E = G;
F.data("idx", G);
H.fire("wgTabSelect", [ G ]);
return O;
}
const v = this, y = [], z = v.cells;
let D = v.nav, E;
D && v.el.removeChild(D);
D = v.nav = v.el.insertBefore(q.el("nav", "wg-tabs"), v.body);
const F = A(D).on("click", function(G) {
const H = A(G.target).data("idx");
if (null == H) return !0;
if (null != E) {
{
const N = y[E];
A(z[E].el).hide();
N.removeClass("active");
}
}
p(H);
v.redraw();
return d(G);
});
null == m && (m = F.data("idx") || 0);
v.each(function(G, H) {
y[H] = A('<a href="#' + G.id + '"></a>').data("idx", H).text(e[H]).appendTo(F);
G.pos = 0;
A(G.el).hide();
});
p(z[m] ? m : 0);
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
function x(c) {
const f = [];
c && (c.saved() || f.push("po-unsaved"), c.fuzzy() ? f.push("po-fuzzy") : c.flagged() && f.push("po-flagged"), 
c.valid() || f.push("po-error"), c.translation() || f.push("po-empty"), c.comment() && f.push("po-comment"));
return f.join(" ");
}
function r(c, f, b) {
f = A(c.title(f).parentNode);
let h = f.find("span.lang");
b ? (b = B.require("$43", "locale.js").cast(b), h.length || (h = A("<span></span>").prependTo(f)), 
h.attr("lang", b.lang).attr("class", b.getIcon() || "lang region region-" + (b.region || "zz").toLowerCase())) : (h.remove(), 
b = "en");
c.locale(b);
return f;
}
function t(c, f, b) {
f.on("click", function(h) {
const e = c.fire(b, [ h.target ]);
e || h.preventDefault();
return e;
});
}
function d() {
this.dirty = 0;
}
B.require("$3", "number.js");
const a = B.require("$42", "string.js").html, l = B.require("$6", "string.js").sprintf;
let g, k;
w.extend = function(c) {
return c.prototype = new d();
};
w.localise = function(c) {
k = c;
return w;
};
const q = function() {
const c = C.createElement("p"), f = /(src|href|on[a-z]+)\s*=/gi;
return function(b) {
c.innerHTML = b.replace(f, "data-x-loco-$1=");
const h = c.textContent.trim();
return h ? h.replace("data-x-loco-", "") : b.trim();
};
}();
let n = d.prototype = B.require("$44", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
n.init = function() {
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
n.t = function() {
return this.$t || k || B.require("$1", "t.js").init();
};
n.localise = function(c) {
c || (c = this.t());
const f = [];
f[0] = c._x("Source text", "Editor") + ":";
f[3] = c._x("%s translation", "Editor") + ":";
f[4] = c._x("Context", "Editor") + ":";
f[5] = c._x("Comments", "Editor") + ":";
f[1] = c._x("Single", "Editor") + ":";
f[2] = c._x("Plural", "Editor") + ":";
f[6] = c._x("Untranslated", "Editor");
f[7] = c._x("Translated", "Editor");
f[8] = c._x("Toggle Fuzzy", "Editor");
f[9] = c._x("Suggest translation", "Editor");
this.labels = f;
this.$t = c;
return this;
};
n.setRootCell = function(c) {
function f(h) {
b.redraw(!0, h);
return !0;
}
const b = B.require("$45", "wingrid.js").init(c);
A(u).on("resize", f);
this.redraw = f;
A(c).on("wgFocus wgBlur", function(h, e) {
h.stopPropagation();
g = e;
});
this.destroy = function() {
b.destroy();
A(u).off("resize", f);
};
this.rootDiv = c;
return b;
};
n.$ = function() {
return A(this.rootDiv);
};
n.setListCell = function(c) {
const f = this;
f.listCell = c;
c.on("wgRowSelect", function(b, h) {
f.loadMessage(f.po.row(h));
return !0;
}).on("wgRowDeselect", function(b, h, e) {
e || f.loadNothing();
return !0;
});
};
n.setSourceCell = function(c) {
this.sourceCell = c;
};
n.setTargetCell = function(c) {
this.targetCell = c;
};
n.next = function(c, f, b) {
const h = this.listTable, e = this.po;
let m = h.selected(), p = m, v;
for (;null != (m = h.next(c, b, m)); ) {
if (p === m) {
m = null;
break;
}
if (f && (v = e.row(m), v.translated(0))) continue;
break;
}
null != m && h.select(m, !0);
return m;
};
n.select = function(c) {
this.listTable.select(c);
this.focus();
};
n.current = function(c) {
const f = this.active;
if (null == c) return f;
c ? c.is(f) ? (this.reloadMessage(c), this.focus()) : (this.loadMessage(c), c = this.po.indexOf(c), 
-1 !== c && this.select(c)) : this.unloadActive();
return this;
};
n.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
n.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
n.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
n.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
n.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
n.searchable = function(c) {
c && (this.dict = c, this.po && this.rebuildSearch());
return this.dict && !0;
};
n.rebuildSearch = function() {
const c = this.po.rows, f = c.length, b = this.dict;
b.clear();
let h = -1;
for (;++h < f; ) b.add(h, c[h].toText());
};
n.filtered = function() {
return this.lastSearch || "";
};
n.filter = function(c, f) {
const b = this.listTable, h = this.lastFound, e = this.lastSearch || "";
let m, p;
c ? (p = this.dict.find(c), m = p.length, m === h && 0 === c.indexOf(e) ? f = !0 : b.filter(p)) : (m = this.po.length, 
b.unfilter());
this.lastFound = m;
this.lastSearch = c;
f || this.fire("poFilter", [ c, m ]);
return m;
};
n.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
n.unsave = function(c, f) {
let b = !1;
if (c) {
if (b = c.saved(f)) this.dirty++, c.unsave(f), this.fire("poUnsaved", [ c, f ]);
this.reCssRow(c);
}
return b;
};
n.reCssRow = function(c) {
var f = this.po.indexOf(c);
if ((f = this.listTable.tr(f)) && f.length) {
var b = x(c);
c = f[0].className;
b = c.replace(/(?:^| +)po-[a-z]+/g, "") + " " + b;
b !== c && A(f).attr("class", b);
}
};
n.save = function(c) {
const f = this.po;
if (this.dirty || c) {
const b = [], h = [], e = this.listTable;
f.each(function(m, p, v) {
p.err && b.push(p);
p.saved() || (p.save(), m = e.row(v).page, h[m.i] = m.live);
});
h.length && A(h).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = b.length ? b : null;
this.fire("poSave", []);
}
return f;
};
n.fire = function(c, f) {
const b = this.handle;
if (b && b[c] && !1 === b[c].apply(this, f || [])) return !1;
c = A.Event(c);
this.$().trigger(c, f);
return !c.isDefaultPrevented();
};
n.on = function(c, f) {
this.$().on(c, f);
return this;
};
n.getSorter = function() {
return null;
};
n.reload = function() {
const c = this;
var f = c.listCell;
const b = c.po;
var h = b && b.locale();
const e = h && h.isRTL(), m = b && b.length || 0;
if (!b || !b.row) return f && f.clear().header("Error").contents("Invalid messages list"), 
!1;
c.targetLocale = h;
c.lastSearch && (c.lastSearch = "", c.lastFound = m, c.fire("poFilter", [ "", m ]));
let p = (h = c.listTable) && h.thead().distribution(), v = [];
c.listTable = h = f.tabulate({
eachCol: function(y) {
const z = c.getListColumns(), D = c.getListHeadings();
for (const E in z) {
const F = z[E];
y(F, E, D[F]);
}
},
eachRow: function(y) {
b.each(function(z, D) {
c.validate(D) && v.push(D);
y(D.idx, c.getListEntry(D), x(D));
});
},
sort: c.getSorter()
});
f = c.getListColumns();
for (const y in f) h.sortable(f[y]);
p && h.thead().distribute(p);
h.tbody().$(e ? "addClass" : "removeClass", [ "is-rtl" ]);
c.invalid = v.length ? v : null;
return !!m;
};
n.load = function(c, f) {
this.po = c;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== f ? this.listTable.selectRow(f || 0) : this.active && this.unloadActive());
};
n.pasteMessage = function(c) {
this.validate(c);
if (this.active === c) {
let f = this.sourceCell, b = 0;
f && f.eachTextarea(function(h) {
h.val(c.source(null, b++));
});
(f = this.contextCell) && f.eachTextarea(function(h) {
h.val(c.context());
});
if (f = this.targetCell) b = 0, f.eachTextarea(function(h) {
h.val(c.translation(b++));
});
}
this.updateListCell(c, "source");
this.updateListCell(c, "target");
return this;
};
n.reloadMessage = function(c) {
const f = this.sourceCell, b = this.targetCell;
this.pasteMessage(c);
f && this.setSrcMeta(c, f) && f.redraw();
if (b) {
var h = b.navigated() || 0;
h = this.setTrgMeta(c, h, b);
!f && this.setSrcMeta(c, b) && (h = !0);
h && (b.redraw(), this.reCssRow(c));
}
return this;
};
n.setStatus = function() {
return null;
};
n.setSrcMeta = function(c, f) {
const b = [];
var h = this.labels;
let e = !1, m = this.$smeta;
var p = c.context();
let v = [], y = c.tags(), z = y && y.length;
p && (v.push("<span>" + a(h[4]) + "</span>"), v.push('<mark class="ctxt">' + a(p) + "</mark>"));
if (z && this.getTag) for (v.push("<span>Tagged:</span>"), h = -1; ++h < z; ) (p = this.getTag(y[h])) && v.push("<mark>" + a(p.mod_name) + "</mark>");
v.length && b.push('<p class="tags">' + v.join(" ") + "</p>");
if (this.getMono() && (p = c.refs()) && (y = p.split(/\s/), z = y.length)) {
for (v = []; 0 <= --z; ) p = y[z], v.push("<code>" + a(p) + "</code>");
b.push('<p class="has-icon icon-file">' + v.join(" ") + "</p>");
}
(p = c.notes()) && b.push('<p class="has-icon icon-info">' + a(p, !0) + "</p>");
b.length ? (m || (m = f.find("div.meta"), m.length || (m = A('<div class="meta"></div>').insertAfter(f.header())), 
t(this, m, "poMeta"), this.$smeta = m), m.html(b.join("\n")).show(), e = !0) : m && m.text() && (m.text("").hide(), 
e = !0);
return e;
};
n.setTrgMeta = function(c, f, b) {
const h = [];
f = (c = c.errors(f)) && c.length;
var e = !1;
let m = this.$tmeta;
if (f) {
for (e = 0; e < f; e++) h.push('<p class="has-icon icon-warn">' + a(c[e], !0) + ".</p>");
m || (m = b.find("div.meta"), m.length || (m = A('<div class="meta"></div>').insertAfter(b.header())), 
this.$tmeta = m);
m.html(h.join("\n")).show();
e = !0;
} else m && m.text() && (m.text("").hide(), e = !0);
return e;
};
n.loadMessage = function(c) {
function f(M) {
if ("=" === M.charAt(0)) {
const K = M.split(" ");
M = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(M)] || M;
M = K.join(" ");
}
return M;
}
function b(M, K) {
const T = Q;
var P = ba[0];
M.off();
M.titled() !== P && r(M, P, K || "en");
P = !1;
y.setSrcMeta(c, M) && (P = !0);
if (c.plural()) {
P = -1;
let S = [], W = [];
const X = M.id + "-";
K = c.sourceForms() || K && K.plurals || [ "One", "Other" ];
const ca = K.length;
if (2 !== ca || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < ca; ) S[P] = X + String(P), 
W[P] = f(K[P].split(" ", 1)[0]) + ":"; else S = [ X + "-0", X + "-1" ], W = [ ba[1], ba[2] ];
M.splity.apply(M, S);
M.each(function(da, V) {
da.header(W[V]).textarea(c.source(null, V), T).setStrf(F).setMode(Z).setInvs(D);
});
M.lock();
T && M.each(function(da, V) {
h(da, V);
});
} else P && M.redraw(), M.textarea(c.source(), T).setStrf(F).setMode(Z).setInvs(D), 
T && h(M, 0);
}
function h(M, K) {
M.on("changing", function(T, P) {
c.source(P, K);
0 === K && y.updateListCell(c, "source");
y.unsave(c, K);
}).on("changed", function() {
0 === K && y.po.reIndex(c);
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ c ]);
});
}
function e(M, K, T, P) {
I && K.eachTextarea(function(W) {
W.ping();
});
K.off();
var S = T.isKnown() && T.label || "Target";
S = l(ba[3], S);
K.titled() !== S && r(K, S, T);
S = !1;
!M && y.setSrcMeta(c, K) && (S = !0);
y.setTrgMeta(c, P, K) && (S = !0);
y.setStatus(c, P);
if (1 !== T.nplurals && c.pluralized()) {
M = function(V) {
X.push(f(da[V] || "Form " + V));
W.push(ca + String(V));
};
let W = [], X = [];
const ca = K.id + "-", da = c.targetForms() || T.plurals || [ "One", "Other" ];
S = da.length;
for (c.eachMsg(M); (T = W.length) < S; ) M(T);
K.splitx.apply(K, W);
K.each(function(V, aa) {
const la = I && !c.disabled(aa);
V.textarea(c.translation(aa), la).setStrf(F).setMode(Z).setInvs(D);
I && m(V, aa);
});
K.navigize(X, P || null).on("wgTabSelect", function(V, aa) {
(V = I && V.cell.editable()) && V.focus();
y.setTrgMeta(c, aa, K);
y.setStatus(c, aa);
y.fire("poTab", [ aa ]);
});
} else S && K.redraw(), K.textarea(c.translation(), I && !c.disabled(0)).setStrf(F).setMode(Z).setInvs(D), 
I && m(K, 0);
}
function m(M, K) {
function T() {
P = null;
y.validate(c);
const W = c.errors(K).join(" ");
S !== W && (S = W, y.setTrgMeta(c, K, M) && M.redraw(), y.reCssRow(c));
}
let P, S = c.errors(K).join(" ");
M.on("changing", function(W, X, ca) {
P && (clearTimeout(P), P = null);
c.translate(X, K);
0 === K && y.updateListCell(c, "target");
c.fuzzy(K) && c.saved(K) ? y.fuzzy(!1, c, K) : y.unsave(c, K);
"" === X ? (y.fire("poEmpty", [ !0, c, K ]), y.setStatus(c, K)) : "" === ca && (y.fire("poEmpty", [ !1, c, K ]), 
y.setStatus(c, K));
P = setTimeout(T, S ? 300 : 1e3);
}).on("changed", function() {
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ c ]);
});
}
function p(M) {
M.off();
const K = ba[4];
M.titled() !== K && (r(M, K), y.setStatus(null));
M.textarea(c.context(), !0).setMode(Z).setInvs(D);
Y && M.on("changing", function(T, P) {
c.context(P);
y.updateListCell(c, "source");
y.unsave(c, ea);
}).on("changed", function() {
y.po.reIndex(c);
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ c ]);
});
}
function v(M) {
const K = ba[5];
M.titled() !== K && r(M, K);
M.off().on("changing", function(T, P) {
c.comment(P);
y.fire("poComment", [ c, P ]);
y.unsave(c, ea);
}).textarea(c.comment(), !0);
}
const y = this;
var z = c.isHTML();
const D = y.inv || !1, E = this.fmt || null, F = c.format() || null, G = c.is(y.active), H = y.sourceCell, N = y.targetCell, O = y.contextCell, R = y.commentCell, I = y.editable.target, Q = y.editable.source, Y = y.editable.context, ha = y.sourceLocale, ja = y.targetLocale, ba = y.labels;
let ea = 0, Z = y.mode, fa = g;
y.html !== z && (y.html = z, "code" !== y.mode && (Z = z ? "html" : "", y.setMode(Z)));
y.active = c;
H && b(H, ha);
O && p(O);
N && ja && (ea = N.navigated() || 0, e(H, N, ja, ea));
R && v(R);
fa && (fa.exists() || (fa = fa.parent()), (z = fa.editable()) && z.focus());
E !== F && (this.fmt = F);
G || y.fire("poSelected", [ c, ea ]);
};
n.unloadActive = function() {
function c(b) {
b && b.text("").hide();
}
function f(b) {
b && b.off().clear();
}
c(this.$smeta);
c(this.$tmeta);
f(this.sourceCell);
f(this.contextCell);
f(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
n.loadNothing = function() {
const c = this.t(), f = this.mode || "", b = this.inv || !1, h = this.fmt;
this.unloadActive();
this.setStatus(null);
let e = this.commentCell;
e && e.textarea("", !1);
if (e = this.sourceCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(b), e.title(c._x("Source text not loaded", "Editor") + ":");
if (e = this.contextCell) e.textarea("", !1).setMode(f).setInvs(b), e.title(c._x("Context not loaded", "Editor") + ":");
if (e = this.targetCell) e.textarea("", !1).setStrf(h).setMode(f).setInvs(b), e.title(c._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
n.updateListCell = function(c, f) {
f = this.getListColumns()[f];
c = this.po.indexOf(c);
(c = this.listTable.row(c)) && c.rendered && c.update(f);
};
n.cellText = function(c) {
return (c = -1 !== c.indexOf("<") || -1 !== c.indexOf("&") ? q(c) : c.trim()) || " ";
};
n.fuzzy = function(c, f, b) {
f = f || this.active;
const h = f.fuzzy(b);
!0 !== c || h ? !1 === c && h && this.flag(0, f, b) && this.fire("poFuzzy", [ f, !1, b ]) : this.flag(4, f, b) && this.fire("poFuzzy", [ f, !0, b ]);
return h;
};
n.flag = function(c, f, b) {
if (!f) {
f = this.active;
b = this.getTargetOffset();
if (null == b) return null;
b && f.targetForms() && (b = 0);
}
const h = f.flagged(b);
if (null == c) return h;
if (h === c || c && !f.translated(b) || !this.fire("poFlag", [ c, h, f, b ])) return !1;
f.flag(c, b);
this.fire("poUpdate", [ f ]) && this.unsave(f, b);
this.setStatus(f, b);
return !0;
};
n.add = function(c, f) {
let b, h = this.po.get(c, f);
h ? b = this.po.indexOf(h) : (b = this.po.length, h = this.po.add(c, f), this.load(this.po, -1), 
this.fire("poAdd", [ h ]), this.fire("poUpdate", [ h ]));
this.lastSearch && this.filter("");
this.listTable.select(b);
return h;
};
n.del = function(c) {
if (c = c || this.active) {
var f = this.lastSearch, b = this.po.del(c);
null != b && (this.unsave(c), this.fire("poDel", [ c ]), this.fire("poUpdate", [ c ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(c) && this.unloadActive(), 
this.po.length && (f && this.filter(f), this.active || (b = Math.min(b, this.po.length - 1), 
this.listTable.select(b))));
}
};
n.setMono = function(c) {
return this.setMode(c ? "code" : this.html ? "html" : "");
};
n.setMode = function(c) {
if (this.mode !== c) {
this.mode = c;
this.callTextareas(function(h) {
h.setMode(c);
});
const f = this.active, b = this.sourceCell;
f && f.refs() && b && this.setSrcMeta(f, b) && b.redraw();
}
return this;
};
n.getMono = function() {
return "code" === this.mode;
};
n.setInvs = function(c) {
(this.inv || !1) !== c && (this.inv = c, this.callTextareas(function(f) {
f.setInvs(c);
}), this.fire("poInvs", [ c ]));
return this;
};
n.getInvs = function() {
return this.inv || !1;
};
n.callTextareas = function(c) {
var f = this.targetCell;
f && f.eachTextarea(c);
(f = this.contextCell) && f.eachTextarea(c);
(f = this.sourceCell) && f.eachTextarea(c);
return this;
};
n.focus = function() {
const c = this.getTargetEditable();
c && c.focus();
return this;
};
n.validate = function(c) {
return 0;
};
n = null;
return w;
}({}, J, L));
B.register("$31", function(w, u, C) {
w.init = function() {
const x = /%([1-9]\d*\$)?[s%]/, r = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(t, d) {
const a = d && d.count || 0;
d = d && d.types || {};
let l = !0, g = 0, k = 0;
for (var q; null != (q = r.exec(t)); ) {
const n = q[2];
if ("%" !== n || "%%" !== q[0]) {
if ("" === n || -1 === "suxXbcdeEfFgGo".indexOf(n)) {
l = !1;
break;
}
null == q[1] ? q = ++k : (q = parseInt(q[1]), g = Math.max(g, q));
null == d[q] && (d[q] = {});
d[q][n] = !0;
}
}
if (l) return {
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
g = A('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
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
var q = g.splity("po-list", "po-edit");
let n = q[0], c = q[1];
q = c.splitx("po-trans", "po-comment");
var f = q[0];
let b = q[1].header("Loading..");
q = f.splity("po-source", "po-target");
f = q[0].header("Loading..");
q = q[1].header("Loading..");
g.distribute([ .34 ]);
c.distribute([ .8 ]);
k.setListCell(n);
k.setSourceCell(f);
k.setTargetCell(q);
k.commentCell = b;
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
const k = this.cellText, q = [ function() {
let n, c = k(g.source() || ""), f = g.context();
return f ? (n = C.createElement("p"), n.appendChild(C.createElement("mark")).innerText = f, 
n.appendChild(C.createTextNode(" " + c)), n) : c;
} ];
this.targetLocale && (q[1] = function() {
return k(g.translation() || "");
});
return q;
};
u.stats = function() {
let g = this.po, k = g.length, q = 0, n = 0, c = 0;
g.each(function(f, b) {
b.fuzzy() ? c++ : b.translated() ? q++ : n++;
});
return {
t: k,
p: q.percent(k) + "%",
f: c,
u: n
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
k || (this.$tnav = k = A("<nav></nav>").append(t(this)).append(d(this)).appendTo(this.targetCell.header()));
var q = [];
g.translated() ? g.fuzzy() && q.push("po-fuzzy") : q.push("po-empty");
k.attr("class", q.join(" "));
}
};
u.getSorter = function() {
function g(n, c) {
const f = n.weight(), b = c.weight();
return f === b ? k(n, c) : f > b ? -1 : 1;
}
function k(n, c) {
return n.hash().localeCompare(c.hash());
}
const q = this;
return function(n) {
const c = q.po, f = q.locked() ? g : k;
n.sort(function(b, h) {
return f(c.row(b), c.row(h));
});
};
};
u.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const k = [];
let q = this.validateMessagePrintf(g, k);
q && (g.err = k);
return q;
};
u.validateMessagePrintf = function(g, k) {
const q = g.format();
if ("no-" === q.substring(0, 3)) return 0;
const n = g.msgid(), c = g.msgidPlural();
null == l && (l = B.require("$31", "printf.js").init());
var f = l;
if (!("" !== q || f.sniff(n) || "" !== c && f.sniff(c))) return 0;
let b = 0, h = f.parse(n);
c && h.valid && (h = f.parse(c, h));
if (!h.valid) return 0;
let e = h.count;
if (0 !== e || "" !== q) {
var m = this;
g.eachMsg(function(p, v) {
k[p] = [];
if ("" !== v) {
v = f.parse(v);
var y = v.count;
p = k[p];
if (v.valid) if (y > e) p.push(a(m.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ e ])), 
b++; else if (y < e && "" === c) p.push(a(m.t()._("Missing placeholders; source text formatting suggests at least %s"), [ e ])), 
b++; else {
y = h.types;
for (const z in v.types) for (const D in v.types[z]) if (null == y[z] || null == y[z][D]) {
p.push(m.t()._("Mismatching placeholder type; check against source text formatting"));
b++;
return;
}
} else p.push(m.t()._("Possible syntax error in string formatting")), b++;
}
});
return b;
}
};
u.handle = {};
let l;
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
function l(k) {
if (k.isDefaultPrevented() || !k.metaKey && !k.ctrlKey) return !0;
const q = k.which;
if (!g[q]) return !0;
const n = t[q];
if (!n) throw console.log(g, t), Error("command undefined #" + q);
if (k.altKey || k.shiftKey && !r[q] || !1 === n(k, d)) return !0;
k.stopPropagation();
k.preventDefault();
return !1;
}
const g = {};
A(a || u).on("keydown", l);
return {
add: function(k, q) {
t[x[k]] = q;
return this;
},
enable: function() {
for (const k in arguments) g[x[arguments[k]]] = !0;
return this;
},
disable: function() {
A(a || u).off("keydown", l);
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
const t = this.length, d = this.keys, a = this.ords, l = [];
let g = -1;
for (;++g < t; ) l[g] = [ this[g], d[g] ];
l.sort(function(q, n) {
return r(q[0], n[0]);
});
for (g = 0; g < t; g++) {
var k = l[g];
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
return function(l, g) {
for (var k = l.length, q; k > r; ) {
q = d.exec(l) || a.exec(l);
if (null == q) break;
q = q[0];
g.push(q);
q = q.length;
k -= q;
l = l.substring(q);
}
0 !== k && g.push(l);
return g;
};
}
w.create = function(r) {
function t(n) {
return g[n] || "\\" + n;
}
var d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, l = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == r || isNaN(r = Number(r))) r = 79;
if (0 < r) {
var k = x(r - 3, " ");
var q = x(r - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(n, c) {
if (!c) return n + ' ""';
c = c.replace(l, t);
var f = 0;
c = c.replace(d, function() {
f++;
return "\\n\n";
});
if (!(f || r && r < c.length + n.length + 3)) return n + ' "' + c + '"';
n = [ n + ' "' ];
c = c.split("\n");
if (q) for (var b = -1, h = c.length; ++b < h; ) q(c[b], n); else n = n.concat(c);
return n.join('"\n"') + '"';
},
prefix: function(n, c) {
n = n.split(d);
return c + n.join("\n" + c);
},
refs: function(n) {
n = n.replace(a, " ", n);
k && (n = k(n, []).join("\n#: "));
return "#: " + n;
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
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(d, a, l) {
a.idx = l;
}), r;
}
};
u.reIndex = function(r, t) {
const d = r.hash(), a = this.indexOf(r), l = this.rows.indexOf(d);
return l === a ? a : -1 !== l ? (t = (t || 0) + 1, r.source("Error, duplicate " + String(t) + ": " + r.source()), 
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
function x(d, a, l) {
if (null == l) return d[a] || "";
d[a] = l || "";
return d;
}
function r() {
this._id = this.id = "";
}
function t(d, a) {
const l = d.length;
let g = -1;
for (;++g < l; ) a(g, d[g]);
}
w.extend = function(d) {
return d.prototype = new r();
};
u = r.prototype;
u.flag = function(d, a) {
const l = this.flg || (this.flg = []);
if (null != a) l[a] = d; else for (a = Math.max(l.length, this.src.length, this.msg.length); 0 !== a--; ) l[a] = d;
return this;
};
u.flagged = function(d) {
const a = this.flg || [];
if (null != d) return a[d] || 0;
for (d = a.length; 0 !== d--; ) if (a[d]) return !0;
return !1;
};
u.flags = function() {
const d = {}, a = [], l = this.flg || [];
let g = l.length;
for (;0 !== g--; ) {
const k = l[g];
d[k] || (d[k] = !0, a.push(k));
}
return a;
};
u.flaggedAs = function(d, a) {
const l = this.flg || [];
if (null != a) return d === l[a] || 0;
for (a = l.length; 0 !== a--; ) if (l[a] === d) return !0;
return !1;
};
u.fuzzy = function(d, a) {
const l = this.flaggedAs(4, d);
null != a && this.flag(a ? 4 : 0, d);
return l;
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
const a = this.src, l = this.msg, g = Math.max(a.length, l.length);
let k = -1;
for (;++k < g; ) d(k, a[k], l[k]);
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
const a = this.msg, l = a.length;
for (d = 0; d < l; d++) a[d] = "";
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
const a = this.msg, l = a.length;
for (d = 0; d < l; d++) if (!a[d]) return !1;
return !0;
};
u.untranslated = function(d) {
if (null != d) return !this.msg[d];
const a = this.msg, l = a.length;
for (d = 0; d < l; d++) if (a[d]) return !1;
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
function l(g, k) {
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
function g(b, h) {
for (b = String(b); b.length < h; ) b = "0" + b;
return b;
}
var k = new Date();
const q = k.getUTCFullYear(), n = k.getUTCMonth() + 1, c = k.getUTCDate(), f = k.getUTCHours();
k = k.getUTCMinutes();
return g(q, 4) + "-" + g(n, 2) + "-" + g(c, 2) + " " + g(f, 2) + ":" + g(k, 2) + "+0000";
};
C.header = function(g, k) {
const q = this.head || (this.head = {});
if (null == k) return this.headers()[g] || "";
q[g] = k || "";
return this;
};
C.headers = function(g) {
const k = this.now(), q = this.head || (this.head = x(k));
if (null != g) {
for (c in g) q[c] = g[c];
return this;
}
const n = this.locale();
g = {};
for (c in q) g[c] = String(q[c]);
if (n) {
g.Language = String(n) || "zxx";
g["Language-Team"] = n.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (n.nplurals || "2") + "; plural=" + (n.pluraleq || "n!=1") + ";";
var c = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", c = "POT-Creation-Date";
g[c] || (g[c] = k);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
C.get = function(g, k) {
g = r(g, k);
return this.rows.get(g);
};
C.add = function(g, k) {
g instanceof l || (g = new l(g));
k && g.context(k);
k = g.hash();
this.rows.get(k) ? t("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(k, g), 
this.length = this.rows.length);
return g;
};
C.load = function(g) {
let k = -1, q, n;
var c;
let f, b, h, e = (c = this.locale()) && c.nplurals || 2, m = [];
for (;++k < g.length; ) q = g[k], null == q.parent ? (n = q.source || q.id, c = q.target || "", 
f = q.context, n || f ? (b = new l(n, c), b._id = q._id, f && b.context(f), q.flag && b.flag(q.flag, 0), 
q.comment && b.comment(q.comment), q.notes && b.notes(q.notes), q.refs && b.refs(q.refs), 
b.format(q.format), q.message = b, this.add(b), q.prev && q.prev[0] && (b.prev(q.prev[0].source, q.prev[0].context), 
q.prev[1] && b._src.push(q.prev[1].source || ""))) : 0 === k && "object" === typeof c && (this.head = c, 
this.headcmt = q.comment)) : m.push(q);
for (k = -1; ++k < m.length; ) try {
q = m[k];
n = q.source || q.id;
b = g[q.parent] && g[q.parent].message;
if (!b) throw Error("parent missing for plural " + n);
h = q.plural;
1 === h && b.plural(n);
h >= e || (q.flag && b.flag(q.flag, h), b.translate(q.target || "", h), q.format && !b.format() && b.format(q.format));
} catch (p) {
t(p);
}
return this;
};
C.wrap = function(g) {
this.fmtr = d(g);
return this;
};
C.toString = function() {
var g, k = this.locale(), q = [], n = [], c = this.headers(), f = !k, b = k && k.nplurals || 2, h = this.fmtr || d();
c[k ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in c) n.push(g + ": " + c[g]);
n = new l("", n.join("\n"));
n.comment(this.headcmt || "");
f && n.fuzzy(0, !0);
q.push(n.toString());
q.push("");
this.rows.each(function(e, m) {
e && (q.push(m.cat(h, f, b)), q.push(""));
});
return q.join("\n");
};
C = B.require("$35", "message.js").extend(l);
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
C.cat = function(g, k, q) {
var n = [], c;
(c = this.cmt) && n.push(g.prefix(c, "# "));
(c = this.xcmt) && n.push(g.prefix(c, "#. "));
var f = this.rf;
if (c = this._id) f += (f ? " " : "") + "loco:" + c;
f && /\S/.test(f) && n.push(g.refs(f));
!k && this.fuzzy() && n.push("#, fuzzy");
(c = this.fmt) && n.push("#, " + c + "-format");
(c = this._ctx) && n.push(g.prefix(g.pair("msgctxt", c), "#| "));
if (c = this._src) c[0] && n.push(g.prefix(g.pair("msgid", c[0]), "#| ")), c[1] && n.push(g.prefix(g.pair("msgid_plural", c[1]), "#| "));
(c = this.ctx) && n.push(g.pair("msgctxt", c));
n.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) n.push(g.pair("msgstr", k ? "" : this.msg[0])); else for (f = -1, 
n.push(g.pair("msgid_plural", this.src[1])), c = this.msg || [ "", "" ], q = q || c.length; ++f < q; ) n.push(g.pair("msgstr[" + f + "]", k ? "" : c[f] || ""));
return n.join("\n");
};
C.compare = function(g, k) {
let q = this.weight(), n = g.weight();
if (q > n) return 1;
if (q < n) return -1;
if (k) {
q = this.hash().toLowerCase();
n = g.hash().toLowerCase();
if (q < n) return 1;
if (q > n) return -1;
}
return 0;
};
C.copy = function() {
let g = new l(), k, q;
for (k in this) this.hasOwnProperty(k) && ((q = this[k]) && q.concat && (q = q.concat()), 
g[k] = q);
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
function d(k, q, n) {
k = A("<p></p>").text(n);
t().dialog("close").html("").dialog("option", "title", "Error").append(k).dialog("open");
}
function a(k) {
const q = k && k.code;
if (q) {
for (var n = q.length, c = A("<ol></ol>").attr("class", k.type), f = -1; ++f < n; ) A("<li></li>").html(q[f]).appendTo(c);
c.find("li").eq(k.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", k.path + ":" + k.line).append(c).dialog("open");
}
}
function l(k) {
k = k.target;
const q = A(k).find("li.highlighted")[0];
k.scrollTop = Math.max(0, (q && q.offsetTop || 0) - Math.floor(k.clientHeight / 2));
}
let g;
return {
load: function(k) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", l);
k = A.extend({
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
const a = C.createElement("p"), l = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let k, q;
return {
sniff: function(n) {
if (n === k) return q;
k = n;
if (l.test(n) || g.test(n)) if (a.innerHTML = n, a.textContent !== n) return q = !0;
return q = !1;
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
t.xhrError = function(a, l, g) {
try {
const k = a.responseText, q = k && u.JSON.parse(k);
g = q && this.parseError(q) || g;
} catch (k) {}
return g || this.httpError(a);
};
t.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
t.parseError = function(a) {
return a && a.error || "";
};
t.mapLang = function(a, l) {
const g = String(a).replace("_", "-").toLowerCase();
var k = a.lang;
l = l[g] || l[k] || [];
a = l.length;
if (0 === a) return k;
if (1 < a) for (k = -1; ++k < a; ) {
const q = l[k];
if (q === g) return q;
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
t.translate = function(a, l, g) {
return this.batch([ a ], l, this.isHtml(a), g);
};
t.verify = function(a) {
return this.translate("OK", {
lang: "fr",
toString: function() {
return "fr";
}
}, function(l, g) {
a(g && "OK" === l);
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
a.error = function(g, k, q) {
l.stderr(l.xhrError(g, k, q));
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
function d(m) {
let p = {
length: 0,
html: m.html,
sources: []
};
k.push(p);
return q[m.html ? 1 : 0] = p;
}
function a(m, p) {
let v = m.source(null, p);
if (v && (m.untranslated(p) || t)) if (p = g[v]) p.push(m); else {
p = v.length;
var y = l.isHtml(v);
y = q[y ? 1 : 0];
var z = y.sources;
if (h && p > h) f++; else {
if (y.length + p > b || 50 === z.length) y = d(y), z = y.sources;
z.push(v);
g[v] = [ m ];
y.length += p;
n += p;
c += 1;
}
}
}
const l = this.api, g = {}, k = [];
let q = [], n = 0, c = 0, f = 0, b = 1e4, h = l.maxChr();
h && (b = Math.min(b, h));
d({
html: !1
});
d({
html: !0
});
const e = r.locale();
r.each(1 < e.nplurals ? function(m, p) {
a(p, 0);
a(p, 1);
} : function(m, p) {
a(p, 0);
});
q = [];
this.map = g;
this.chars = n;
this.length = c;
this.batches = k;
this.locale = e;
f && l.stderr("Strings over " + b + " characters long will be skipped");
};
u.abort = function() {
this.state = "abort";
return this;
};
u.dispatch = function() {
function r(z, D) {
function E(R, I, Q) {
D !== Q && (z === I || 1 < R && F.source(null, 1) === z) && (F.translate(D, R), 
O++, m++);
}
if (!t()) return !1;
if (!D) return !0;
let F, G = c[z] || [], H = G.length, N = -1, O;
for (h++; ++N < H; ) if (F = G[N]) O = 0, F.each(E), O && k("each", [ F ]);
return !0;
}
function t() {
return "abort" === q.state ? (n && (n.abort(), g()), !1) : !0;
}
function d() {
let z = f.shift(), D;
z ? (D = z.sources) && D.length ? n.batch(D, b, z.html, r).fail(a).always(l) : l() : g();
}
function a() {
q.abort();
g();
}
function l() {
e++;
k("prog", [ e, v ]);
t() && d();
}
function g() {
n = f = null;
k("done");
}
function k(z, D) {
z = y[z] || [];
let E = z.length;
for (;0 <= --E; ) z[E].apply(null, D);
}
let q = this, n = q.api, c = q.map, f = q.batches || [], b = q.locale, h = 0, e = 0, m = 0, p = q.length, v = f.length, y = {
done: [],
each: [],
prog: []
};
q.state = "";
d();
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
return Math.max(p - h, 0);
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
(x.prototype = new r()).batch = function(t, d, a, l) {
function g(n) {
const c = t.length;
let f = -1;
for (;++f < c && !1 !== l(t[f], n[f], d); );
}
const k = u.loco;
a = {
hook: this.getId(),
type: a ? "html" : "text",
locale: String(d),
source: this.getSrc(),
sources: t
};
const q = A.Deferred();
this.abortable(k.ajax.post("apis", a, function(n) {
g(n && n.targets || []);
q.resolve();
}, function() {
g([]);
q.reject();
}));
return q.promise();
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
}).done(function(l) {
const g = l && l.character_limit;
l = l && l.character_count;
t(!0, g && g <= l ? "OK, but quota exceeded" : "");
}).fail(function() {
t(!1);
});
};
r.batch = function(t, d, a, l) {
function g(h) {
const e = t.length;
let m = -1;
for (;++m < e && !1 !== l(t[m], (h[m] || {}).text || "", d); );
}
const k = this;
a = k.key();
const q = k.base(a), n = k.getSrc().substring(0, 2), c = k.mapLang(d, k.getLangMap());
let f = d.tone, b = "default";
"formal" === f ? b = "more" : "informal" === f && (b = "less");
return k._call({
url: q + "/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: n.toUpperCase(),
target_lang: c.toUpperCase(),
formality: b,
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
const d = [], a = t.error.errors || [], l = a.length;
let g = -1;
for (;++g < l; ) d.push(a[g].message || "");
return "Error " + t.error.code + ": " + d.join(";");
}
return "";
};
r.getLangMap = function() {
return B.require("$38", "google.json");
};
r.batch = function(t, d, a, l) {
function g(c) {
const f = t.length;
let b = -1;
for (;++b < f && !1 !== l(t[b], (c[b] || {}).translatedText || "", d); );
}
const k = this, q = k.getSrc();
a = a ? "html" : "text";
const n = k.mapLang(d, k.getLangMap());
return k._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + q + "&target=" + n + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: k.key(),
q: t
}
}).done(function(c, f, b) {
c.data ? g(c.data.translations || []) : (k.stderr(k.parseError(c) || k.httpError(b)), 
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
return a ? (d && d !== a && (a += "; " + d), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(l) {
l += -1 === l.indexOf("?") ? "?" : "&";
return l + "ref=loco";
}), "Error " + (t.status || "0") + ": " + a) : "";
};
r.maxChr = function() {
return 1e3;
};
r.getLangMap = function() {
return B.require("$39", "lecto.json");
};
r.batch = function(t, d, a, l) {
function g(c) {
const f = t.length;
let b = -1, h = (c[0] || {
translated: []
}).translated || [];
for (;++b < f && (c = h[b] || "", !1 !== l(t[b], c, d)); );
}
const k = this;
a = this.getSrc();
const q = k.param("api") || "https://api.lecto.ai", n = k.mapLang(d, k.getLangMap());
return k._call({
url: k.fixURL(q + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ n ],
from: a,
texts: t
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": k.key(),
Accept: "application/json"
}
}).done(function(c, f, b) {
c ? g(c.translations || []) : (k.stderr(k.parseError(c) || k.httpError(b)), g([]));
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
r.batch = function(t, d, a, l) {
function g(h) {
let e = -1;
for (var m; ++e < c && (m = h[e] || {}, m = m.translations || [], m = m[0] || {}, 
!1 !== l(t[e], m.text || "", d)); );
}
let k = this, q = [], n = k.getSrc(), c = t.length, f = -1;
a = a ? "html" : "plain";
let b = k.mapLang(d, k.getLangMap());
for (;++f < c; ) q.push({
Text: t[f]
});
return k._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + n + "&to=" + b + "&textType=" + a,
method: "POST",
data: JSON.stringify(q),
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
O || (E.on("click", q), O = A('<div id="loco-fs-creds"></div>').dialog({
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
G && (d(A(h)), G = !1);
if (p && N) {
var I = N, Q = A(F);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (d(A(F)), H = !1);
}
function d(I) {
I.slideUp(250).fadeOut(250, function() {
A(this).addClass("jshide");
});
}
function a() {
if (p) return O && O.dialog("close"), t(), A(x).find('button[type="submit"]').attr("disabled", !1), 
A(u).triggerHandler("resize"), b && b(!0), !0;
y && O ? (G || (A(h).removeClass("jshide").hide().fadeIn(500), G = !0), H && (d(A(F)), 
H = !1)) : t();
A(x).find('input[type="submit"]').attr("disabled", !0);
b && b(!1);
return !1;
}
function l(I) {
var Q, Y = R || {};
for (Q in Y) if (Y.hasOwnProperty(Q)) {
var ha = Y[Q];
I[Q] ? I[Q].value = ha : A('<input type="hidden" />').attr("name", Q).appendTo(I).val(ha);
}
}
function g(I) {
I.preventDefault();
I = A(I.target).serializeArray();
f(I);
m = !0;
return !1;
}
function k(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function q(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function n(I) {
p = I.authed;
e = I.method;
A(h).find("span.loco-msg").text(I.message || "Something went wrong.");
N = I.warning || "";
I.notice && v.notices.info(I.notice);
if (p) "direct" !== e && (R = I.creds, l(x), m && I.success && v.notices.success(I.success)), 
a(); else if (I.reason) v.notices.info(I.reason); else if (I = I.prompt) {
var Q = r();
Q.html(I).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", k);
Q.find('input[type="submit"]').addClass("button-primary");
a();
A(u).triggerHandler("resize");
} else v.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function c() {
a();
}
function f(I) {
m = !1;
v.ajax.setNonce("fsConnect", D).post("fsConnect", I, n, c);
return I;
}
var b, h = x, e = null, m = !1, p = !1, v = u.loco, y = x.path.value, z = x.auth.value, D = x["loco-nonce"].value, E = A(h).find("button.button-primary"), F = C.getElementById(h.id + "-warn"), G = !1, H = !1, N = "", O;
v.notices.convert(F).stick();
if (x.connection_type) {
var R = {};
R.connection_type = x.connection_type.value;
p = !0;
} else y && z && f({
path: y,
auth: z
});
a();
return {
applyCreds: function(I) {
if (I.nodeType) l(I); else {
var Q, Y = R || {};
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
b = I;
p && I(!0);
return this;
},
authed: function() {
return p;
}
};
};
return w;
}({}, J, L));
B.register("$41", function(w, u, C) {
function x(a, l) {
return function(g) {
a.apply(g, l);
return g;
};
}
function r(a) {
return function(l, g) {
l = l && l[a] || 0;
g = g && g[a] || 0;
return l === g ? 0 : l > g ? 1 : -1;
};
}
function t(a) {
return function(l, g) {
return (l && l[a] || "").localeCompare(g && g[a] || "");
};
}
function d(a) {
return function(l, g) {
return -1 * a(l, g);
};
}
w.sort = function(a, l, g, k) {
l = "n" === g ? r(l) : t(l);
k && (l = d(l));
return x([].sort, [ l ])(a);
};
return w;
}({}, J, L));
B.register("$26", function(w, u, C) {
w.init = function(x) {
function r(h) {
var e = -1, m = h.length;
for (A("tr", n).remove(); ++e < m; ) n.appendChild(h[e].$);
}
function t(h) {
g = h ? f.find(h, d) : d.slice(0);
q && (h = a[q], g = b(g, q, h.type, h.desc));
r(g);
}
var d = [], a = [], l = 0, g, k, q, n = x.getElementsByTagName("tbody")[0], c = x.getElementsByTagName("thead")[0], f = B.require("$10", "fulltext.js").init(), b = B.require("$41", "sort.js").sort;
c && n && (A("th", c).each(function(h, e) {
var m = e.getAttribute("data-sort-type");
m && (h = l, A(e).addClass("loco-sort").on("click", function(p) {
p.preventDefault();
p = h;
var v = a[p], y = v.type, z = !(v.desc = !v.desc);
g = b(g || d.slice(0), p, y, z);
r(g);
k && k.removeClass("loco-desc loco-asc");
k = A(v.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
q = p;
return !1;
}), a[l] = {
$: e,
type: m
});
e.hasAttribute("colspan") ? l += Number(e.getAttribute("colspan")) : l++;
}), A("tr", n).each(function(h, e) {
var m, p, v = [], y = {
_: h,
$: e
}, z = e.getElementsByTagName("td");
for (m in a) {
e = z[m];
(p = e.textContent.replace(/(^\s+|\s+$)/g, "")) && v.push(p);
e.hasAttribute("data-sort-value") && (p = e.getAttribute("data-sort-value"));
switch (a[m].type) {
case "n":
p = Number(p);
}
y[m] = p;
}
d[h] = y;
f.index(h, v);
}), x = A('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
c = A(x.form), 1 < d.length ? B.require("$11", "LocoTextListener.js").listen(x, t) : c.hide(), 
c.on("submit", function(h) {
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
if ("2.6.7" === (w && w[0])) return !0;
U.notices.warn("admin.js is the wrong version (2.6.7). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
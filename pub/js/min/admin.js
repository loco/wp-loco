"use strict";

(function(L, M, B, la) {
const D = function() {
const w = {};
return {
register: function(r, F) {
w[r] = F;
},
require: function(r) {
var F;
if (!(F = w[r])) throw Error("Bad module [" + r + "]");
return F;
},
include: function(r) {
return w[r];
},
noop: function() {}
};
}();
D.register("1", function(w, r, F) {
function y(q) {
const t = typeof q;
if ("string" === t) if (/[^ <>!=()%^&|?:n0-9]/.test(q)) console.error("Invalid plural: " + q); else return new Function("n", "return " + q);
"function" !== t && (q = function(e) {
return 1 != e;
});
return q;
}
w.init = function(q) {
function t(k, m, n) {
return (k = g[k]) && k[n] ? k[n] : m || "";
}
function e(k) {
return t(k, k, 0);
}
function b(k, m) {
return t(m + "" + k, k, 0);
}
function h(k, m, n) {
n = Number(q(n));
isNaN(n) && (n = 0);
return t(k, n ? m : k, n);
}
q = y(q);
let g = {};
return {
__: e,
_x: b,
_n: h,
_: e,
x: b,
n: h,
load: function(k) {
g = k || {};
return this;
},
pluraleq: function(k) {
q = y(k);
return this;
}
};
};
return w;
}({}, L, M));
D.register("2", function(w, r, F) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, L, M));
D.register("3", function(w, r, F) {
Number.prototype.format = function(y, q, t) {
var e = Math.pow(10, y || 0);
y = [];
e = String(Math.round(e * this) / e);
var b = e.split(".");
e = b[0];
b = b[1];
let h = e.length;
do {
y.unshift(e.substring(h - 3, h));
} while (0 < (h -= 3));
e = y.join(t || ",");
if (b) {
{
t = b;
y = t.length;
let g;
for (;"0" === t.charAt(--y); ) g = y;
g && (t = t.substring(0, g));
b = t;
}
b && (e += (q || ".") + b);
}
return e;
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
D.register("4", function(w, r, F) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(y) {
if (null == this) throw new TypeError();
var q = Object(this), t = q.length >>> 0;
if (0 === t) return -1;
var e = 0;
1 < arguments.length && (e = Number(arguments[1]), e != e ? e = 0 : 0 != e && Infinity != e && -Infinity != e && (e = (0 < e || -1) * Math.floor(Math.abs(e))));
if (e >= t) return -1;
for (e = 0 <= e ? e : Math.max(t - Math.abs(e), 0); e < t; e++) if (e in q && q[e] === y) return e;
return -1;
});
return w;
}({}, L, M));
D.register("5", function(w, r, F) {
F = r.JSON;
F || (F = {
parse: B.parseJSON,
stringify: null
}, r.JSON = F);
w.parse = F.parse;
w.stringify = F.stringify;
return w;
}({}, L, M));
D.register("6", function(w, r, F) {
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
return y.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(e, b, h) {
if ("%" === h) return "%";
e = b ? q[Number(b) - 1] : q[t++];
return null != e ? String(e) : "s" === h ? "" : "0";
});
};
w.html = function() {
function y(m) {
return "&" + (g[m] || "#" + m.charCodeAt(0)) + ";";
}
function q(m, n) {
return '<a href="' + m + '" target="' + (n.indexOf(h) ? "_blank" : "_top") + '">' + n + "</a>";
}
let t, e, b, h, g, k = function() {
t = /[<>&"']/g;
g = {
"<": "lt",
">": "gt",
"&": "amp",
'"': "quot",
"'": "apos"
};
e = /(\r\n|\n|\r)/g;
b = /(?:https?):\/\/(\S+)/gi;
h = location.hostname;
k = null;
};
return function(m, n) {
k && k();
m = m.replace(t, y);
n && (m = m.replace(b, q).replace(e, "<br />"));
return m;
};
}();
return w;
}({}, L, M));
D.register("1a", function(w, r, F) {
function y(q) {
return function(t, e) {
let b = t[q] || 0;
for (;(t = t.offsetParent) && t !== (e || F.body); ) b += t[q] || 0;
return b;
};
}
w.top = y("offsetTop");
w.left = y("offsetLeft");
w.el = function(q, t) {
q = F.createElement(q || "div");
t && (q.className = t);
return q;
};
w.txt = function(q) {
return F.createTextNode(q || "");
};
w.rect = function(q) {
return q.getBoundingClientRect();
};
return w;
}({}, L, M));
D.register("7", function(w, r, F) {
function y(c, d, l) {
function p() {
u();
C = setTimeout(d, l);
}
function u() {
C && clearTimeout(C);
C = 0;
}
let C = 0;
p();
B(c).on("mouseenter", u).on("mouseleave", p);
return {
die: function() {
u();
B(c).off("mouseenter mouseleave");
}
};
}
function q(c, d) {
c.fadeTo(d, 0, function() {
c.slideUp(d, function() {
c.remove();
B(r).triggerHandler("resize");
});
});
return c;
}
function t(c, d) {
function l(G) {
n[z] = null;
q(B(c), 250);
C && C.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function p(G) {
C && C.die();
return C = y(c, l, G);
}
const u = B(c);
let C, z, A, E = u.find("button");
0 === E.length && (u.addClass("is-dismissible"), E = B('<button type="button" class="notice-dismiss"> </a>').appendTo(u));
E.off("click").on("click", l);
B(r).triggerHandler("resize");
m();
z = n.length;
n.push(l);
d && (C = p(d));
return {
link: function(G, H) {
var J = H || G;
H = B(c).find("nav");
G = B("<nav></nav>").append(B("<a></a>").attr("href", G).text(J));
A ? (A.push(G.html()), H.html(A.join("<span> | </span>"))) : (A = [ G.html() ], 
B(c).addClass("has-nav").append(G));
return this;
},
stick: function() {
C && C.die();
C = null;
n[z] = null;
return this;
},
slow: function(G) {
p(G || 1e4);
return this;
}
};
}
function e(c, d, l) {
const p = D.require("1a").el;
c = B('<div class="notice notice-' + c + ' loco-notice inline"></div>').prependTo(B("#loco-notices"));
const u = B(p("p"));
l = B(p("span")).text(l);
d = B(p("strong", "has-icon")).text(d + ": ");
u.append(d).append(l).appendTo(c);
return c;
}
function b(c, d, l, p) {
c = e(l, d, c).css("opacity", "0").fadeTo(500, 1);
B(r).triggerHandler("resize");
return t(c, p);
}
function h(c) {
return b(c, v, "warning");
}
function g() {
B("#loco-notices").find("div.notice").each(function(c, d) {
-1 === d.className.indexOf("jshide") && (c = -1 === d.className.indexOf("notice-success") ? null : 5e3, 
t(d, c));
});
}
const k = r.console || {
log: function() {}
}, m = Date.now || function() {
return new Date().getTime();
};
let n = [], x, v, f, a;
w.error = function(c) {
return b(c, x, "error");
};
w.warn = h;
w.info = function(c) {
return b(c, f, "info");
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
const d = n, l = d.length;
for (;++c < l; ) {
const p = d[c];
p && p.call && p();
}
n = [];
return w;
};
w.create = e;
w.raise = function(c) {
(w[c.type] || w.error).call(w, c.message);
};
w.convert = t;
w.init = function(c) {
x = c._("Error");
v = c._("Warning");
f = c._("Notice");
a = c._("OK");
setTimeout(g, 1e3);
return w;
};
return w;
}({}, L, M));
D.register("8", function(w, r, F) {
function y(f) {
let a = B("<pre>" + f + "</pre>").text();
a && (a = a.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
a || (a = f) || (a = "Blank response from server");
return a;
}
function q(f) {
return (f = f.split(/[\r\n]/)[0]) ? (f = f.replace(/ +in +\S+ on line \d+/, ""), 
f = f.replace(/^[()! ]+Fatal error:\s*/, "")) : x._("Server returned invalid data");
}
function t(f) {
r.console && console.error && console.error('No nonce for "' + f + '"');
return "";
}
function e(f, a, c) {
f[a] = c;
}
function b(f, a, c) {
f.push({
name: a,
value: c
});
}
function h(f, a, c) {
f.append(a, c);
}
function g(f, a, c, d) {
function l(u, C, z) {
if ("abort" !== C) {
var A = x || {
_: function(R) {
return R;
}
}, E = u.status || 0, G = u.responseText || "", H = y(G), J = u.getResponseHeader("Content-Type") || "Unknown type", O = u.getResponseHeader("Content-Length") || G.length;
"success" === C && z ? p.error(z) : (p.error(q(H) + ".\n" + A._("Check console output for debugging information")), 
p.log("Ajax failure for " + f, {
status: E,
error: C,
message: z,
output: G
}), "parsererror" === C && (z = "Response not JSON"), p.log([ A._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (z || A._("Unknown error")) + '" (' + J + " " + O + " bytes)", H, "====" ].join("\n")));
c && c.call && c(u, C, z);
v = u;
}
}
d.url = m;
d.dataType = "json";
const p = D.require("7").clear();
v = null;
return B.ajax(d).fail(l).done(function(u, C, z) {
const A = u && u.data, E = u && u.notices, G = E && E.length;
!A || u.error ? l(z, C, u && u.error && u.error.message) : a && a(A, C, z);
for (u = -1; ++u < G; ) p.raise(E[u]);
});
}
function k(f) {
B(f).on("heartbeat-send", function(a, c) {
c["loco-translate"] = {
nonces: n
};
}).on("heartbeat-tick", function(a, c) {
n = c["loco-translate"] && c["loco-translate"].nonces || {};
});
}
const m = r.ajaxurl || "/wp-admin/admin-ajax.php";
let n = {}, x, v;
w.init = function(f) {
n = f.nonces || n;
k(F);
return w;
};
w.localise = function(f) {
x = f;
return w;
};
w.xhr = function() {
return v;
};
w.strip = y;
w.parse = q;
w.submit = function(f, a, c) {
function d(z, A) {
A.disabled ? A.setAttribute("data-was-disabled", "true") : A.disabled = !0;
}
function l(z, A) {
A.getAttribute("data-was-disabled") || (A.disabled = !1);
}
function p(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(l);
z.find("input").each(l);
z.find("select").each(l);
z.find("textarea").each(l);
z.removeClass("disabled loading");
}
const u = B(f), C = u.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(d);
z.find("input").each(d);
z.find("select").each(d);
z.find("textarea").each(d);
z.addClass("disabled loading");
})(u);
return g(f.route.value, function(z, A, E) {
p(u);
a && a(z, A, E);
}, function(z, A, E) {
p(u);
c && c(z, A, E);
}, {
type: f.method,
data: C
});
};
w.post = function(f, a, c, d) {
let l = !0, p = a || {}, u = n[f] || t(f);
r.FormData && p instanceof FormData ? (l = !1, a = h) : a = Array.isArray(p) ? b : e;
a(p, "action", "loco_json");
a(p, "route", f);
a(p, "loco-nonce", u);
return g(f, c, d, {
type: "post",
data: p,
processData: l,
contentType: l ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, a, c, d) {
a = a || {};
const l = n[f] || t(f);
a.action = "loco_json";
a.route = f;
a["loco-nonce"] = l;
return g(f, c, d, {
type: "get",
data: a
});
};
w.setNonce = function(f, a) {
n[f] = a;
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
D.register("9", function(w, r, F) {
function y() {}
const q = D.require("1b");
let t;
w.init = function() {
return new y();
};
w.cast = function(e) {
return e instanceof y ? e : "string" === typeof e ? w.parse(e) : w.clone(e);
};
w.clone = function(e) {
const b = new y();
for (const h in e) b[h] = e[h];
return b;
};
w.parse = function(e) {
e = (t || (t = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(e);
if (!e) return null;
const b = new y();
b.lang = e[1].toLowerCase();
b.region = (e[2] || "").toUpperCase();
b.variant = (e[3] || "").toLowerCase();
return b;
};
r = y.prototype;
r.isValid = function() {
return !!this.lang;
};
r.isKnown = function() {
const e = this.lang;
return e && "zxx" !== e;
};
r.toString = function(e) {
e = e || "_";
let b = this.lang || "zxx";
this.region && (b += e + this.region);
this.variant && (b += e + this.variant);
return b;
};
r.getIcon = function() {
let e = 3, b = [];
const h = [ "variant", "region", "lang" ];
for (;0 !== e--; ) {
const g = h[e], k = this[g];
k && (b.push(g), b.push(g + "-" + k.toLowerCase()));
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
D.register("a", function(w, r, F) {
w.init = function() {
function y(a) {
return n[a] || a;
}
function q(a, c, d) {
a = String(a || "").toLowerCase().replace(m, y).split(x);
const l = a.length;
let p = -1;
a: for (;++p < l; ) {
var u = a[p];
if (u && null == d[u]) {
const E = [];
var C = u.length;
let G = 0;
do {
var z = v.exec(u);
if (z) {
z = z[0];
var A = z.length;
if (G) for (let H = 0; H < G; H++) E[H] += z; else if (A === C) {
null == d[z] && (c.push(z), d[z] = !0);
continue a;
}
E.push(z);
G++;
u = u.substring(A);
if ("" === u) break;
}
if (z = f.exec(u)) {
z = z[0];
if (G) for (A = 0; A < G; A++) E[A] += z; else E.push(z), G++;
u = u.substring(z.length);
}
} while ("" !== u);
for (u = 0; u < E.length; u++) C = E[u], null == d[C] && (c.push(C), d[C] = !0);
}
}
return c;
}
function t(a) {
return q(a, [], {});
}
function e(a) {
let c = [], d = {}, l = a.length;
for (;0 !== l--; ) q(a[l], c, d);
return c;
}
function b() {
k = "";
g = [];
}
let h = [], g = [], k = "";
const m = /[^a-z0-9]/g, n = D.require("1c"), x = /\s+/, v = /^[\d\p{L}]+/u, f = /^[^\d\p{L}]+/u;
return {
split: t,
find: function(a, c) {
const d = [], l = [], p = String(a || "").toLowerCase().replace(m, y).split(" "), u = p.length, C = k && a.substring(0, k.length) === k ? g : h, z = C.length, A = !!c;
let E = -1, G = 0;
a: for (;++E < z; ) {
const H = C[E], J = H && H.length;
if (J) {
b: for (let O = 0; O < u; O++) {
const R = p[O];
for (let I = 0; I < J; I++) if (0 === H[I].indexOf(R)) continue b;
continue a;
}
l[E] = H;
d.push(A ? c[E] : E);
} else G++;
}
k = a;
g = l;
return d;
},
add: function(a, c) {
h[a] = t(c);
k && b();
},
push: function(a) {
h[h.length] = e(a);
k && b();
},
index: function(a, c) {
h[a] = e(c);
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
}({}, L, M));
D.register("b", function(w, r, F) {
w.listen = function(y, q) {
function t() {
v[g ? "show" : "hide"]();
}
function e(f) {
x && n.setAttribute("size", 2 + f.length);
g = f;
t();
return f;
}
function b() {
k = null;
q(g);
}
function h(f) {
let a = n.value;
a !== g ? (k && clearTimeout(k), e(a), f ? k = setTimeout(b, f) : b()) : k && null == f && (clearTimeout(k), 
b());
}
let g, k, m = 150;
const n = y instanceof jQuery ? y[0] : y, x = 1 === Number(n.size), v = B('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function(f) {
f.preventDefault();
n.value = "";
h();
B(n).triggerHandler("blur");
return !1;
});
e(n.value);
B(n).on("input", function() {
h(m);
return !0;
}).on("blur focus change", function() {
h(null);
return !0;
}).after(v);
t();
return {
delay: function(f) {
m = f;
return this;
},
ping: function(f) {
f ? (k && clearTimeout(k), e(n.value), b(), f = void 0) : f = h();
return f;
},
val: function(f) {
if (null == f) return g;
k && clearTimeout(k);
n.value = e(f);
t();
},
el: function() {
return n;
},
blur: function(f) {
return B(n).on("blur", f);
},
destroy: function() {
k && clearTimeout(k);
}
};
};
return w;
}({}, L, M));
D.register("c", function(w, r, F) {
function y(b, h) {
return "function" == typeof b ? b.call(h) : b;
}
function q(b, h) {
this.$element = B(b);
this.options = h;
this.enabled = !0;
this.fixTitle();
}
w.init = function(b, h) {
let g = {
fade: !0,
offset: 5,
delayIn: t,
delayOut: e,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
h && (g = B.extend({}, g, h));
b.tipsy(g);
};
w.delays = function(b, h) {
t = b || 150;
e = h || 100;
};
w.kill = function() {
B("div.tipsy").remove();
};
w.text = function(b, h) {
h.data("tipsy").setTitle(b);
};
let t, e;
w.delays();
B(F.body).on("overlayOpened overlayClosing", function() {
w.kill();
return !0;
});
q.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
const g = this.tip();
g.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
g[0].className = "tipsy";
g.remove().css({
top: 0,
left: 0
}).prependTo(F.body);
b = g[0].offsetWidth;
const k = g[0].offsetHeight, m = y(this.options.gravity, this.$element[0]);
var h = this.options.anchor;
h = h ? this.$element.find(h) : this.$element;
h = B.extend({}, h.offset(), {
width: h[0].offsetWidth,
height: h[0].offsetHeight
});
let n;
switch (m.charAt(0)) {
case "n":
n = {
top: h.top + h.height + this.options.offset,
left: h.left + h.width / 2 - b / 2
};
break;

case "s":
n = {
top: h.top - k - this.options.offset,
left: h.left + h.width / 2 - b / 2
};
break;

case "e":
n = {
top: h.top + h.height / 2 - k / 2,
left: h.left - b - this.options.offset
};
break;

case "w":
n = {
top: h.top + h.height / 2 - k / 2,
left: h.left + h.width + this.options.offset
};
}
2 === m.length && ("w" === m.charAt(1) ? n.left = h.left + h.width / 2 - 15 : n.left = h.left + h.width / 2 - b + 15);
g.css(n).addClass("tipsy-" + m);
g.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + m.charAt(0);
this.options.className && g.addClass(y(this.options.className, this.$element[0]));
g.addClass("in");
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
let b, h = this.$element, g = this.options;
this.fixTitle();
"string" == typeof g.title ? b = h.attr("title" == g.title ? "original-title" : g.title) : "function" == typeof g.title && (b = g.title.call(h[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || g.fallback;
},
setTitle: function(b) {
let h = this.$element;
h.attr("default-title") || h.attr("default-title", this.getTitle());
null == b && (b = h.attr("default-title") || this.getTitle());
h.attr("original-title", b);
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
function h(m) {
let n = B.data(m, "tipsy");
n || (n = new q(m, B.fn.tipsy.elementOptions(m, b)), B.data(m, "tipsy", n));
return n;
}
function g() {
let m = h(this), n = b.delayIn;
m.hoverState = "in";
0 == n ? m.show() : (m.fixTitle(), setTimeout(function() {
"in" == m.hoverState && m.show();
}, n));
}
function k() {
let m = h(this), n = b.delayOut;
m.hoverState = "out";
0 == n ? m.hide() : (m.tip().removeClass("in"), setTimeout(function() {
"out" == m.hoverState && m.hide();
}, n));
}
if (this.hasClass("disabled")) this.on("click", function(m) {
m.preventDefault();
return !1;
});
b = B.extend({}, B.fn.tipsy.defaults, b);
b.live || this.each(function() {
h(this);
});
if ("manual" != b.trigger) {
let m = b.live ? "live" : "bind", n = "hover" == b.trigger ? "mouseleave" : "blur";
this[m]("hover" == b.trigger ? "mouseenter" : "focus", g)[m](n, k);
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
B.fn.tipsy.elementOptions = function(b, h) {
return B.metadata ? B.extend({}, h, B(b).metadata()) : h;
};
B.fn.tipsy.autoNS = function() {
return B(this).offset().top > B(F).scrollTop() + B(r).height() / 2 ? "s" : "n";
};
B.fn.tipsy.autoWE = function() {
return B(this).offset().left > B(F).scrollLeft() + B(r).width() / 2 ? "e" : "w";
};
B.fn.tipsy.autoBounds = function(b, h) {
return function() {
var g = h[0], k = 1 < h.length ? h[1] : !1;
let m = B(F).scrollTop() + b, n = B(F).scrollLeft() + b, x = B(this);
x.offset().top < m && (g = "n");
x.offset().left < n && (k = "w");
B(r).width() + B(F).scrollLeft() - x.offset().left < b && (k = "e");
B(r).height() + B(F).scrollTop() - x.offset().top < b && (g = "s");
return g + (k ? k : "");
};
};
return w;
}({}, L, M));
D.register("28", function(w, r, F) {
function y() {}
let q, t;
const e = D.require("1b");
w.init = function() {
return new y();
};
w.cast = function(b) {
return b instanceof y ? b : "string" === typeof b ? w.parse(b) : w.clone(b);
};
w.clone = function(b) {
const h = new y();
for (const g in b) h[g] = b[g];
return h;
};
w.parse = function(b) {
q || (t = /[-_+]/, q = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
b = String(b).split(t).join("-");
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
let h, g = this.lang || "zxx";
if (h = this.script) g += b + h;
if (h = this.region) g += b + h;
if (h = this.variant) g += b + h;
if (h = this.extension) g += b + h;
return g;
};
r.getIcon = function() {
let b = 4, h = [];
const g = [ "variant", "region", "script", "lang" ];
for (;0 !== b--; ) {
const k = g[b];
let m = this[k];
m && (m.join && (m = m.join("-")), 1 === b && 3 === m.length ? h.push("region-m49") : h = h.concat([ k, k + "-" + m.toLowerCase() ]));
}
return h.join(" ");
};
r.isRTL = function() {
return !!e[String(this.script || this.lang).toLowerCase()];
};
r = null;
return w;
}({}, L, M));
D.register("29", function(w, r, F) {
function y(b) {
r.console && console.error && console.error(b);
}
function q() {
y("Method not implemented");
}
function t() {}
function e(b) {}
t.prototype.toString = function() {
return "[Undefined]";
};
e.prototype._validate = function(b) {
let h, g, k = !0;
for (h in this) g = this[h], g === q ? (y(b + "." + h + "() must be implemented"), 
k = !1) : g instanceof t && (y(b + "." + h + " must be defined"), k = !1);
return k;
};
w.init = function(b, h) {
const g = new e();
if (b) {
let k = b.length;
for (;0 !== k--; ) g[b[k]] = q;
}
if (h) for (b = h.length; 0 !== b--; ) g[h[b]] = new t();
return g;
};
w.validate = function(b) {
const h = /function (\w+)\(/.exec(b.toString());
b.prototype._validate(h && h[1] || "Object");
};
return w;
}({}, L, M));
D.register("30", function(w, r, F) {
let y = 0, q = r.requestAnimationFrame, t = r.cancelAnimationFrame;
if (!q || !t) for (const b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (q = r[b + "RequestAnimationFrame"]) if (t = r[b + "CancelAnimationFrame"] || r[b + "CancelRequestAnimationFrame"]) break;
q && t || (q = function(b) {
var h = e();
const g = Math.max(0, 16 - (h - y)), k = h + g;
h = r.setTimeout(function() {
b(k);
}, g);
y = k;
return h;
}, t = function(b) {
clearTimeout(b);
});
const e = Date.now || function() {
return new Date().getTime();
};
w.loop = function(b, h) {
function g() {
m = q(g, h);
b(k++);
}
let k = 0, m;
g();
return {
stop: function() {
m && t(m);
m = null;
}
};
};
return w;
}({}, L, M));
D.register("2d", function(w, r, F) {
function y(n, x, v, f) {
if (e) {
const a = v;
v = function(c) {
if ((c.MSPOINTER_TYPE_TOUCH || "touch") === c.pointerType) return a(c);
};
}
n.addEventListener(x, v, f);
return {
unbind: function() {
n.removeEventListener(x, v, f);
}
};
}
function q(n) {
n.preventDefault();
n.stopPropagation();
return !1;
}
let t;
const e = !!r.navigator.msPointerEnabled, b = e ? "MSPointerDown" : "touchstart", h = e ? "MSPointerMove" : "touchmove", g = e ? "MSPointerUp" : "touchend";
w.ok = function(n) {
null == t && (t = "function" === typeof F.body.addEventListener);
t && n && n(w);
return t;
};
w.ms = function() {
return e;
};
w.dragger = function(n, x) {
function v(d) {
n.addEventListener(d, a[d], !1);
}
function f(d) {
n.removeEventListener(d, a[d], !1);
}
const a = {};
a[b] = function(d) {
k(d, function(l, p) {
p.type = b;
x(d, p, c);
});
v(h);
v(g);
return !0;
};
a[g] = function(d) {
f(h);
f(g);
k(d, function(l, p) {
p.type = g;
x(d, p, c);
});
return !0;
};
a[h] = function(d) {
k(d, function(l, p) {
p.type = h;
x(d, p, c);
});
return q(d);
};
v(b);
let c = {
kill: function() {
f(b);
f(h);
f(g);
n = c = x = null;
}
};
return c;
};
w.swiper = function(n, x, v) {
function f(E) {
n.addEventListener(E, u[E], !1);
}
function a(E) {
n.removeEventListener(E, u[E], !1);
}
function c() {
d && d.stop();
d = null;
}
let d, l, p, u = {}, C = [], z = [], A = [];
u[b] = function(E) {
l = !1;
c();
const G = m();
k(E, function(H, J) {
C[H] = G;
z[H] = J.clientX;
A[H] = J.clientY;
});
p = n.scrollLeft;
return !0;
};
u[g] = function(E) {
k(E, function(G, H) {
const J = m() - C[G];
G = z[G] - H.clientX;
x(Math.abs(G) / J, G ? 0 > G ? -1 : 1 : 0);
});
p = null;
return !0;
};
u[h] = function(E) {
let G, H;
null == p || k(E, function(J, O) {
G = z[J] - O.clientX;
H = A[J] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return l = !0;
G && (l = !0, n.scrollLeft = Math.max(0, p + G));
return q(E);
};
if (!e || v) f(b), f(h), f(g), e && (n.className += " mstouch");
return {
kill: function() {
a(b);
a(h);
a(g);
c();
},
swiped: function() {
return l;
},
ms: function() {
return e;
},
snap: function(E) {
e && !v && (n.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + E + "px)", 
n.style["-ms-scroll-snap-type"] = "mandatory", n.style["-ms-scroll-chaining"] = "none");
},
scroll: function(E, G, H) {
c();
let J = n.scrollLeft;
const O = E > J ? 1 : -1, R = Math[1 === O ? "min" : "max"], I = Math.round(16 * G * O);
return d = D.require("30").loop(function(Q) {
Q && (J = Math.max(0, R(E, J + I)), n.scrollLeft = J, E === J && (c(), H && H(J)));
}, n);
}
};
};
w.start = function(n, x) {
return y(n, b, x, !1);
};
w.move = function(n, x) {
return y(n, h, x, !1);
};
w.end = function(n, x) {
return y(n, g, x, !1);
};
const k = w.each = function(n, x) {
if (e) (n.MSPOINTER_TYPE_TOUCH || "touch") === n.pointerType && x(0, n); else {
n = (n.originalEvent || n).changedTouches || [];
for (var v = -1; ++v < n.length; ) x(v, n[v]);
}
}, m = Date.now || function() {
return new Date().getTime();
};
return w;
}({}, L, M));
D.register("31", function(w, r, F) {
w.init = function(y) {
function q() {
h.style.top = String(-y.scrollTop) + "px";
return !0;
}
function t() {
const k = h;
k.textContent = y.value;
const m = k.innerHTML;
"" !== m && (k.innerHTML = m.replace(/[ \t]/g, e).split(/\n|\r\n?/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>');
return !0;
}
function e(k) {
return '<span class="x' + k.charCodeAt(0).toString(16) + '">' + k + "</span>";
}
const b = y.parentNode;
let h = b.insertBefore(F.createElement("div"), y);
B(y).on("input", t).on("scroll", q);
B(b).addClass("has-mirror");
h.className = "ta-mirror";
const g = y.offsetWidth - y.clientWidth;
2 < g && (h.style.marginRight = String(g - 2) + "px");
t();
q();
return {
kill: function() {
B(y).off("input", t).off("scroll", q);
b.removeChild(h);
h = null;
B(b).removeClass("has-mirror");
}
};
};
return w;
}({}, L, M));
D.register("23", function(w, r, F) {
function y(e, b) {
e = q[e] || [];
b = b && r[b];
const h = e.length;
let g = -1, k = 0;
for (;++g < h; ) {
const m = e[g];
"function" === typeof m && (m(b), k++);
}
return k;
}
const q = {};
let t = "";
w.load = function(e, b, h) {
function g() {
n && (clearTimeout(n), n = null);
x && (x.onreadystatechange = null, x = x = x.onload = null);
e && (delete q[e], e = null);
}
function k(v, f) {
v = x && x.readyState;
if (f || !v || "loaded" === v || "complete" === v) f || y(e, h), g();
}
function m() {
if (0 === y(e)) throw Error('Failed to load "' + (h || e) + '"');
g();
}
if (h && r[h]) "function" === typeof b && b(r[h]); else if (null != q[e]) q[e].push(b); else {
q[e] = [ b ];
var n = setTimeout(m, 4e3), x = F.createElement("script");
x.setAttribute("src", e);
x.setAttribute("async", "true");
x.onreadystatechange = k;
x.onload = k;
x.onerror = m;
x.onabort = g;
F.getElementsByTagName("head")[0].appendChild(x);
}
};
w.stat = function(e) {
var b;
if (!(b = t)) {
{
b = F.getElementsByTagName("script");
const h = b.length;
let g = -1, k = "";
for (;++g < h; ) {
const m = b[g].getAttribute("src");
if (m) {
const n = m.indexOf("/lib/vendor");
if (-1 !== n) {
k = m.substring(0, n);
break;
}
}
}
b = k || "/static";
}
b = t = b;
}
return b + e;
};
w.css = function(e, b) {
F.getElementById(b) || B("<link />").attr("rel", "stylesheet").attr("href", e).attr("id", b).appendTo(F.head);
};
return w;
}({}, L, M));
D.register("10", function(w, r, F) {
function y(m, n) {
m.setReadOnly(!1);
m.on("change", function(x, v) {
return n.val(v.getValue());
});
m.on("focus", function() {
return n.focus();
});
m.on("blur", function() {
return n.blur();
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
function e(m, n) {
function x() {
this.HighlightRules = f;
}
m = m.require;
const v = m("ace/lib/oop"), f = b(n);
v.inherits(f, m("ace/mode/text_highlight_rules").TextHighlightRules);
v.inherits(x, m("ace/mode/text").Mode);
return new x();
}
function b(m) {
return function() {
let n = {
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
}, x = h(m);
"icu" === m ? n = {
start: n.start.concat([ {
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
} : "mf2" === m ? n = {
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
} : x && n.start.push({
token: "printf",
regex: x
});
this.$rules = n;
};
}
function h(m) {
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

case k:
return g || /%%/;
}
}
let g, k = "auto";
w.init = function(m, n, x) {
let v, f = !1, a = x || k, c = m.parentNode, d = c.appendChild(F.createElement("div"));
B(c).addClass("has-proxy has-ace");
var l = r.loco;
x = D.require("23");
l = l && l.aceUrl || x.stat("/lib/ace.min.js");
x.load(l, function(p) {
if (d) {
if (!p) throw Error("Failed to load code editor");
v = p.edit(d);
var u = v.session, C = v.renderer;
v.$blockScrolling = Infinity;
v.setShowInvisibles(f);
v.setWrapBehavioursEnabled(!1);
v.setBehavioursEnabled(!1);
v.setHighlightActiveLine(!1);
u.setUseSoftTabs(!1);
C.setShowGutter(!0);
C.setPadding(10);
C.setScrollMargin(8);
u.setMode(e(p, a));
v.setValue(m.value, -1);
u.setUseWrapMode(!0);
n ? y(v, n) : t(v);
}
}, "ace");
return {
kill: function() {
v && (q(v), v.destroy(), v = null);
d && (c.removeChild(d), B(c).removeClass("has-proxy has-ace"), d = null);
return this;
},
disable: function() {
v && t(v);
n = null;
return this;
},
enable: function(p) {
n = p;
v && y(v, p);
return this;
},
resize: function() {
v && v.resize();
return this;
},
val: function(p) {
v && p !== v.getValue() && v.setValue(p, -1);
return this;
},
invs: function(p) {
p = p || !1;
f !== p && (f = p, v && v.setShowInvisibles(p));
return this;
},
strf: function(p) {
p = p || k;
p !== a && (a = p, v && v.session.setMode(e(r.ace, p)));
return this;
},
focus: function() {
v && v.focus();
return this;
}
};
};
w.strf = function(m, n) {
k = m;
g = n;
return w;
};
return w;
}({}, L, M));
D.register("32", function(w, r, F) {
function y(b, h) {
function g() {
return h.val(b.getContent());
}
b.on("input", g);
b.on("change", g);
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
function t(b) {
q(b);
b.setMode("readonly");
}
let e = 0;
w.load = function(b) {
const h = D.require("23");
h.css(h.stat("/css/lib/tinymce.css"), "tinymce-css");
h.load(h.stat("/lib/tinymce.min.js"), b, "tinymce");
return w;
};
w.init = function(b, h) {
function g(z) {
x = z;
v = "<p>" === z.substring(0, 3) && "</p>" === z.substring(z.length - 4);
return z.replace(u, "$1x-$2");
}
function k(z) {
m = z;
z._getContent = z.getContent;
z.getContent = function(A) {
A = this._getContent(A);
A = A.replace(C, "$1$2");
if (!v && "<p>" === A.substring(0, 3) && "</p>" === A.substring(A.length - 4)) {
const E = A.substring(3, A.length - 4);
if (E === x || -1 === E.indexOf("</p>")) A = E;
}
return A;
};
z._setContent = z.setContent;
z.setContent = function(A, E) {
return this._setContent(g(A), E);
};
z.setContent(b.value);
h ? (y(z, h), h.reset()) : t(z);
B(c).removeClass("loading");
}
let m, n = !1, x = "", v = !1, f = b.parentNode, a = f.parentNode, c = f.appendChild(F.createElement("div")), d = a.insertBefore(F.createElement("nav"), f);
const l = [ "script", "style", "form", "iframe", "object" ], p = [ "embed", "applet", "meta", "base", "link" ], u = new RegExp("(</?)((?:" + l.join("|") + ")[^>]*>)", "ig"), C = new RegExp("(</?)x-((?:" + l.join("|") + ")[^>]*>)", "ig");
d.id = "_tb" + String(++e);
B(f).addClass("has-proxy has-mce");
B(c).addClass("mce-content-body loading").text("Initializing...");
w.load(function(z) {
if (!z) throw Error("Failed to load HTML editor");
c && z.init({
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
entities: "38,amp,60,lt,62,gt,160,nbsp",
entity_encoding: "named",
keep_styles: !1,
extended_valid_elements: "span,b,i,u,x-" + l.join("[*],x-") + "[*]",
protect: [ new RegExp("<(?:" + p.join("|") + ")[^>]*>", "gi") ],
invalid_elements: l.join(",") + "," + p.join(","),
init_instance_callback: k
});
});
return {
val: function(z) {
z = g(z);
null == m ? (b.value = z, console.log(".EARLY => .val( " + z), B(c).html(z)) : m.getContent() !== z && m.setContent(z);
h && h.val(z);
return this;
},
kill: function() {
m && (h && h.val(m.getContent()), q(m), m.destroy(), m = null);
c && (f.removeChild(c), B(f).removeClass("has-proxy has-mce"), c = null);
d && (a.removeChild(d), d = null);
return this;
},
enable: function(z) {
h = z;
m && y(m, z);
return this;
},
disable: function() {
m && t(m);
h = null;
return this;
},
focus: function() {
m && h && m.focus();
return this;
},
invs: function(z) {
z = z || !1;
n !== z && (n = z, B(f)[z ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return w;
}({}, L, M));
D.register("33", function(w, r, F) {
w.init = function(y, q) {
function t(a) {
x !== a && (f.textContent = a.format(0), x = a, a = 0 === a ? "empty" : 0 === q || a < q ? "lt" : q === a ? "eq" : "gt", 
a !== n && (n = a, v.className = "wg-count is-" + a));
}
function e(a) {
m && (v.removeChild(m), m = null);
0 < a && (m = v.appendChild(g.el("span").appendChild(g.txt(" / " + a.format(0)))));
q = a;
}
function b(a, c) {
t(c.length);
}
function h() {
n = "";
x = -1;
t(y.val().length);
}
const g = D.require("1a"), k = B(y.parent()).on("changing", b);
let m, n, x, v = g.el("div"), f = v.appendChild(g.el("span"));
k.append(v);
e(q);
h();
return {
ping: function(a) {
null != a && a !== q && (q = a, e(a));
h();
},
kill: function() {
const a = k && k[0];
a && v && v.parentNode === a && (k.off("changing", b), a.removeChild(v));
}
};
};
return w;
}({}, L, M));
D.register("2e", function(w, r, F) {
function y(e) {
function b() {
f && (n.off("input", h), f = !1);
}
function h() {
const c = e.value;
c !== a && (n.trigger("changing", [ c, a ]), a = c);
}
function g() {
h();
f && v !== a && n.trigger("changed", [ a ]);
}
function k() {
t = e;
v = a;
f || (n.on("input", h), f = !0);
n.trigger("editFocus");
x.addClass("has-focus");
return !0;
}
function m() {
t === e && (t = null);
n.trigger("editBlur");
x.removeClass("has-focus");
f && (g(), b());
return !0;
}
const n = B(e), x = B(e.parentNode);
let v, f = !1, a = e.value;
n.on("blur", m).on("focus", k);
return {
val: function(c) {
a !== c && (e.value = c, n.triggerHandler("input"), a = c);
return !0;
},
kill: function() {
b();
n.off("blur", m).off("focus", k);
},
fire: function() {
a = null;
h();
},
ping: g,
blur: m,
focus: k,
reset: function() {
v = a = e.value;
}
};
}
function q(e) {
this.e = e;
}
let t;
w._new = function(e) {
return new q(e);
};
w.init = function(e) {
const b = new q(e);
e.disabled ? (e.removeAttribute("disabled"), b.disable()) : e.readOnly ? b.disable() : b.enable();
return b;
};
r = q.prototype;
r.destroy = function() {
this.unlisten();
const e = this.p;
e && (e.kill(), this.p = null);
this.nocount();
this.e = null;
};
r.reload = function(e, b) {
let h = this.l;
this.nocount();
h && !b && (this.disable(), h = null);
this.val(e || "");
b && !h && this.enable();
return this;
};
r.val = function(e) {
const b = this.e;
if (null == e) return b.value;
const h = this.l, g = this.p;
g && g.val(e);
h && h.val(e);
h || b.value === e || (b.value = e, B(b).triggerHandler("input"));
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
const e = this.p;
e ? e.focus() : B(this.e).focus();
};
r.focused = function() {
return t && t === this.el;
};
r.parent = function() {
return this.e.parentNode;
};
r.attr = function(e, b) {
const h = this.e;
if (1 === arguments.length) return h.getAttribute(e);
null == b ? h.removeAttribute(e) : h.setAttribute(e, b);
return this;
};
r.editable = function() {
return !!this.l;
};
r.enable = function() {
const e = this.p;
this.e.removeAttribute("readonly");
this.listen();
e && e.enable && e.enable(this.l);
return this;
};
r.disable = function() {
const e = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
e && e.disable && e.disable();
return this;
};
r.listen = function() {
const e = this.l;
e && e.kill();
this.l = y(this.e);
return this;
};
r.unlisten = function() {
const e = this.l;
e && (e.kill(), this.l = null);
return this;
};
r.setInvs = function(e, b) {
const h = this.i || !1;
if (b || h !== e) this._i && (this._i.kill(), delete this._i), (b = this.p) && b.invs ? b.invs(e) : e && (this._i = D.require("31").init(this.e)), 
this.i = e;
return this;
};
r.getInvs = function() {
return this.i || !1;
};
r.setMode = function(e) {
let b = this.p, h = this.i || !1;
e !== (this.m || "") && (this.m = e, b && b.kill(), this.p = b = "code" === e ? D.require("10").init(this.e, this.l, this["%"]) : "html" === e ? D.require("32").init(this.e, this.l) : null, 
this.setInvs(h, !0), t && this.focus());
return this;
};
r.setStrf = function(e) {
this["%"] = e;
"code" === this.m && this.p.strf(e);
return this;
};
r.name = function(e) {
this.e.setAttribute("name", e);
return this;
};
r.placeholder = function(e) {
this.e.setAttribute("placeholder", e);
return this;
};
r.redraw = function() {
const e = this.p;
e && e.resize && e.resize();
};
r.counter = function(e) {
let b = this.c;
b ? b.ping(e) : this.c = D.require("33").init(this, e);
e = String(e || "0");
"0" === e ? this.e.removeAttribute("maxlength") : e !== this.e.getAttribute("maxlength") && this.e.setAttribute("maxlength", e);
return this;
};
r.nocount = function() {
const e = this.c;
e && (e.kill(), this.c = null, this.e.removeAttribute("maxlength"));
};
return w;
}({}, L, M));
D.register("2f", function(w, r, F) {
function y(f) {
const a = r.console;
a && a.error && a.error(f);
}
function q(f) {
const a = F.createElement("div");
f && a.setAttribute("class", f);
return a;
}
function t(f) {
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
function h(f) {
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
function d(l) {
y("row[" + l + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(l) {
const p = a || 0, u = c ? -1 : 1, C = f.rows || [];
l.sort(function(z, A) {
return u * (C[z] || d(z)).cellVal(p).localeCompare((C[A] || d(A)).cellVal(p));
});
};
}
function k(f) {
this.w = f;
}
function m(f) {
this.t = f;
this.length = 0;
}
function n(f, a, c) {
let d = F.createElement("div");
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
return new k(f);
};
var v = k.prototype;
v.init = function(f) {
let a = this.w, c = a.id;
var d = a.splity(c + "-thead", c + "-tbody"), l = d[0];
d = d[1];
let p = [], u = [], C = [], z = [];
if (f) this.ds = f, this.idxs = u, this._idxs = null; else if (!(f = this.ds)) throw Error("No datasource");
l.css.push("wg-thead");
d.css.push("wg-tbody");
f.eachCol(function(O, R, I) {
C[O] = c + "-col-" + R;
z[O] = I || R;
});
var A = q();
let E = -1, G = C.length, H = q("wg-cols"), J = l.splitx.apply(l, C);
for (;++E < G; ) J[E].header(z[E]), H.appendChild(A.cloneNode(!1)).setAttribute("for", C[E]);
f.eachRow(function(O, R, I) {
p[O] = new n(O, R, I);
u[O] = O;
});
this.rows = p;
this.cols = H;
this.ww = null;
this.root = A = d.body;
this.head = l;
l.redraw = t(this);
a.css.push("is-table");
a.restyle();
l = d.fixed = J[0].bodyY() || 25;
a.lock().resize(l, d);
this.sc ? this._re_sort(G) : f.sort && f.sort(u);
this.redrawDirty();
this.render();
B(A).attr("tabindex", "-1").on("keydown", h(this)).on("mousedown", e(this)).on("scroll", b(this));
return this;
};
v.clear = function() {
const f = this.pages || [];
let a = f.length;
for (;0 !== a--; ) f[a].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
v.render = function() {
let f, a = [], c = this.rows || [], d = -1, l, p = this.idxs, u = p.length, C = this.idxr = {}, z = this.r, A = this._r, E = this.root, G = this.cols;
for (;++d < u; ) {
if (0 === d % 100) {
var H = G.cloneNode(!0);
f = new x(H);
f.i = a.length;
f.h = 2200;
f.insert(E);
a.push(f);
}
l = p[d];
C[l] = d;
H = c[l];
if (null == H) throw Error("Render error, no data at [" + l + "]");
H.page = f;
f.rows.push(H);
}
f && 100 !== f.size() && f.sleepH(22);
this.pages = a;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == z ? null != A && (H = c[A]) && H.page && (delete this._r, this.select(A, !0)) : (H = c[z]) && H.page ? this.select(z, !0) : (this.deselect(!1), 
this._r = z);
return this;
};
v.resize = function() {
let f = -1, a = this.ww || (this.ww = []);
var c = this.w;
let d = c.cells[0], l = d.body.childNodes, p = l.length, u = this.pages || [], C = u.length;
for (c.redraw.call(d); ++f < p; ) a[f] = l[f].style.width;
if (C) {
c = this.mx;
for (f = this.mn; f <= c; f++) u[f].widths(a);
this.redrawDirty() && this.redraw();
}
};
v.redrawDirty = function() {
let f = !1;
var a = this.root;
const c = a.scrollTop;
a = a.clientHeight;
this.sy !== c && (f = !0, this.sy = c);
this.vh !== a && (f = !0, this.vh = a);
return f;
};
v.redraw = function() {
let f = 0, a = -1, c = null, d = null, l = this.ww;
var p = this.sy;
let u = this.mn, C = this.mx, z = Math.max(0, p - 100);
p = this.vh + p + 100;
let A, E = this.pages || [], G = E.length;
for (;++a < G && !(f > p); ) A = E[a], f += A.height(), f < z || (null === c && (c = a), 
d = a, A.rendered || A.render(l));
if (u !== c) {
if (null !== u && c > u) for (a = u; a < c; a++) {
A = E[a];
if (!A) throw Error("Shit!");
A.rendered && A.sleep();
}
this.mn = c;
}
if (C !== d) {
if (null !== C && d < C) for (a = C; a > d; a--) A = E[a], A.rendered && A.sleep();
this.mx = d;
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
v.tr = function(f) {
return (f = this.row(f)) ? f.cells() : [];
};
v.row = function(f) {
return this.rows[f];
};
v.td = function(f, a) {
return this.tr(f)[a];
};
v.next = function(f, a, c) {
null == c && (c = this.r || 0);
const d = this.idxs, l = d.length;
let p = c = (this.idxr || {})[c];
for (;c !== (p += f) && !(0 <= p && l > p); ) if (a && l) p = 1 === f ? -1 : l, 
a = !1; else return null;
c = d[p];
return null == c || null == this.rows[c] ? (y("Bad next: [" + p + "] does not map to data row"), 
null) : c;
};
v.selectNext = function(f, a, c) {
f = this.next(f, a, null);
null != f && this.r !== f && this.select(f, c);
return this;
};
v.deselect = function(f) {
const a = this.r;
null != a && (this.r = null, B(this.tr(a)).removeClass("selected"), this.w.fire("wgRowDeselect", [ a, f ]));
return this;
};
v.selectRow = function(f, a) {
return this.select(this.idxs[f], a);
};
v.select = function(f, a) {
const c = this.rows[f];
var d = c && c.page;
if (!d) return this.deselect(!1), y("Row is filtered out"), this;
this.deselect(!0);
let l, p = this.w.cells[1];
d.rendered || (l = d.top(), p.scrollY(l), this.redrawDirty() && this.redraw());
if (!c.rendered) return d.rendered || y("Failed to render page"), y("Row [" + c.i + "] not rendered"), 
this;
d = c.cells();
B(d).addClass("selected");
this.r = f;
a || (l = p.scrollY(), B(this.root).focus(), l !== p.scrollY() && p.scrollY(l));
p.scrollTo(d[0], !0);
this.w.fire("wgRowSelect", [ f, c.data() ]);
return this;
};
v.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
v.filter = function(f) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(f);
return this.clear().render();
};
v.each = function(f) {
let a, c = -1;
const d = this.rows || [], l = this.idxs || [], p = l.length;
for (;++c < p; ) a = l[c], f(d[a], c, a);
return this;
};
v.sortable = function(f) {
const a = this.sc || (this.sc = new m(this));
a.has(f) || a.add(f);
return this;
};
v._re_sort = function(f) {
let a = -1, c = this.sc, d = c.active;
for (this.sc = c = new m(this); ++a < f; ) c.add(a);
d && (a = this.head.indexOf(d.id), -1 === a && (a = Math.min(d.idx, f - 1)), this.sort(a, d.desc));
return this;
};
v._sort = function(f, a) {
a ? (this.s = a, a(f)) : (a = this.s) && a(f);
return f;
};
v.sort = function(f, a) {
this._sort(this.idxs, g(this, f, a));
this.sc.activate(f, a);
return this;
};
v = null;
v = m.prototype;
v.has = function(f) {
return null != this[f];
};
v.add = function(f) {
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
v.toggle = function(f) {
this.t.sort(f, !this[f].desc).clear().render();
return this;
};
v.activate = function(f, a) {
let c, d = this.active, l = this[f], p = this.t.head.cells;
d && (c = p[d.idx]) && (c.removeClass(d.css), d !== l && c.restyle());
(c = p[f]) ? (l.desc = a, this.active = l, f = "wg-" + (a ? "desc" : "asc"), c.addClass(f).restyle(), 
l.css = f) : this.active = null;
return this;
};
v = null;
v = n.prototype;
v.render = function(f) {
let a, c = [], d = this._, l = this.length;
if (d) {
for (this.c = c; 0 !== l--; ) a = d.cloneNode(!1), c[l] = this.update(l, a), a.$index = this.i, 
f[l].appendChild(a);
this._ = null;
} else for (c = this.c; 0 !== l--; ) f[l].appendChild(c[l]);
this.rendered = !0;
return this;
};
v.update = function(f, a) {
a = a || this.c[f] || {};
f = (this.d[f] || function() {})() || " ";
null == f.innerHTML ? a.textContent = f : a.innerHTML = f.innerHTML;
return a;
};
v.cells = function() {
return this.c || [ this._ ];
};
v.data = function() {
const f = [], a = this.length;
let c = -1;
for (;++c < a; ) f[c] = this.cellVal(c);
return f;
};
v.destroy = function() {
this.page = null;
this.rendered = !1;
};
v.cellVal = function(f) {
f = this.d[f]() || "";
return String(f.textContent || f);
};
v = null;
v = x.prototype;
v.size = function() {
return this.rows.length;
};
v.insert = function(f) {
const a = this.h, c = q("wg-dead");
c.style.height = String(a) + "px";
f.appendChild(c);
return this.dead = c;
};
v.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
v.height = function() {
let f = this.h;
null == f && (this.h = f = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHeight);
f || y("row has zero height");
return f;
};
v.render = function(f) {
let a, c = -1, d = this.rows, l = d.length;
const p = this.dead, u = this.live, C = u.childNodes;
for (;++c < l; ) a = d[c], a.rendered || a.render(C);
l = f.length;
for (c = 0; c < l; c++) C[c].style.width = f[c];
p.parentNode.replaceChild(u, p);
this.rendered = !0;
this.h = null;
return this;
};
v.sleep = function() {
const f = this.height(), a = this.live, c = this.dead;
c.style.height = String(f) + "px";
a.parentNode.replaceChild(c, a);
this.rendered = !1;
this.h = f;
return this;
};
v.sleepH = function(f) {
f *= this.rows.length;
const a = this.dead;
a && (a.style.height = String(f) + "px");
this.rendered || (this.h = f);
return this;
};
v.widths = function(f) {
const a = this.live.childNodes;
let c = f.length;
for (;0 !== c--; ) a[c].style.width = f[c];
return this;
};
v.destroy = function() {
var f = this.rendered ? this.live : this.dead;
const a = this.rows;
f.parentNode.removeChild(f);
for (f = a.length; 0 !== f--; ) a[f].destroy();
};
return w;
}({}, L, M));
D.register("2a", function(w, r, F) {
function y(d, l) {
var p = d.id;
let u = p && v[p], C = u && u.parent();
if (!u || !C) return null;
var z = 1 === C.dir;
p = z ? "X" : "Y";
let A = "page" + p;
z = z ? x : n;
let E = z(C.el);
p = l["offset" + p];
let G = C.el, H = G.className;
null == p && (p = l[A] - z(d));
p && (E += p);
G.className = H + " is-resizing";
return {
done: function() {
G.className = H;
},
move: function(J) {
C.resize(J[A] - E, u);
return !0;
}
};
}
function q(d) {
function l() {
B(F).off("mousemove", p);
c && (c.done(), c = null);
return !0;
}
function p(u) {
c ? c.move(u) : l();
return !0;
}
if (c) return !0;
c = y(d.target, d);
if (!c) return !0;
B(F).one("mouseup", l).on("mousemove", p);
return e(d);
}
function t(d, l) {
const p = l.type;
"touchmove" === p ? c && c.move(l) : "touchstart" === p ? c = y(d.target, l) : "touchend" === p && c && (c.done(), 
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
function h(d, l) {
const p = B(l);
p.on("editFocus", function(u) {
u.stopPropagation();
p.trigger("wgFocus", [ b(d) ]);
}).on("editBlur", function(u) {
u.stopPropagation();
p.trigger("wgBlur", [ b(null) ]);
});
}
function g(d) {
const l = d.id, p = d.className, u = p ? [ p ] : [];
this.id = l;
this.el = d;
this.pos = this.index = 0;
this._cn = p;
this.css = u.concat("wg-cell");
v[l] = this;
this.clear();
}
const k = D.include("2c") || D.require("2"), m = D.require("1a"), n = m.top, x = m.left, v = {};
let f, a = 0, c = !1;
w.init = function(d) {
const l = new g(d);
l.redraw();
D.require("2d").ok(function(p) {
p.dragger(d, t);
});
B(d).on("mousedown", q);
return l;
};
r = g.prototype;
r.fire = function(d, l) {
d = B.Event(d);
d.cell = this;
B(this.el).trigger(d, l);
return this;
};
r.each = function(d) {
let l = -1;
const p = this.cells, u = p.length;
for (;++l < u; ) d(p[l], l);
return this;
};
r.indexOf = function(d) {
return (d = v[d.id || String(d)]) && d.pid === this.id ? d.index : -1;
};
r.on = function() {
return this.$("on", arguments);
};
r.off = function() {
return this.$("off", arguments);
};
r.find = function(d) {
return B(this.el).find(d);
};
r.$ = function(d, l) {
B.fn[d].apply(B(this.el), l);
return this;
};
r.addClass = function(d) {
this.css.push(d);
return this;
};
r.removeClass = function(d) {
d = this.css.indexOf(d);
-1 !== d && this.css.splice(d, 1);
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
r._split = function(d, l) {
(this.length || this.field) && this.clear();
let p = -1;
let u = l.length, C = 1 / u, z = 0;
for (;++p < u; ) {
var A = m.el();
this.body.appendChild(A);
var E = A;
{
var G = l[p];
let H = 1, J = G;
for (;v[G]; ) G = J + "-" + ++H;
}
E.id = G;
A = new g(A);
A.index = p;
A.pid = this.id;
A._locale(this.lang, this.rtl);
A.pos = z;
z += C;
this.cells.push(A);
this.length++;
}
this.dir = d;
this.redraw();
return this.cells;
};
r.count = function() {
return this.cells && this.cells.length || 0;
};
r.destroy = function() {
this.clear();
delete v[this.id];
const d = this.el;
d.innerHTML = "";
this.body = null;
d.className = this._cn || "";
B(d).off();
return this;
};
r.exists = function() {
return this === v[this.id];
};
r.clear = function() {
const d = this.el, l = this.cells, p = this.field, u = this.body, C = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete v[l[z].destroy().id];
this.cells = [];
this.length = 0;
C && (d.removeChild(C), this.nav = null);
u && (p && (p.destroy(), this.counter = this.field = null), this.table && (this.table = null), 
d === u.parentNode && d.removeChild(u));
this.body = d.appendChild(m.el("", "wg-body"));
this._h = null;
return this;
};
r.resize = function(d, l) {
if (!l && (l = this.cells[1], !l)) return;
var p = l.index;
let u = this.cells, C = B(this.el)[1 === this.dir ? "width" : "height"](), z = u[p + 1];
p = u[p - 1];
l.pos = Math.min((z ? z.pos * C : C) - ((l.body || l.el.firstChild).offsetTop || 0), Math.max(p ? p.pos * C : 0, d)) / C;
this.redraw();
this.fire("wgResize");
return this;
};
r.distribute = function(d) {
let l = -1, p = 0, u;
const C = this.cells, z = d.length;
for (;++l < z && (u = C[++p]); ) u.pos = Math.max(0, Math.min(1, d[l]));
this.redraw();
return this;
};
r.distribution = function() {
let d = [], l = 0;
const p = this.cells, u = p.length - 1;
for (;l < u; ) d[l] = p[++l].pos;
return d;
};
r.restyle = function() {
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
r.redraw = function(d) {
this.restyle();
const l = this.el;
var p = this.body, u = this.field;
if (p) {
var C = l.clientWidth || 0, z = l.clientHeight || 0, A = p.offsetTop || 0;
z = A > z ? 0 : z - A;
if (this._h !== z) {
this._h = z;
p.style.height = String(z) + "px";
var E = u;
}
this._w !== C && (this._w = C, E = u);
E && E.redraw();
}
p = this.length;
C = 1;
z = this.nav;
for (A = 2 === this.dir ? "height" : "width"; 0 !== p--; ) u = this.cells[p], z ? E = 1 : (u.fixed && (u.pos = u.fixed / B(l)[A]()), 
E = C - u.pos, C = u.pos), u.el.style[A] = String(100 * E) + "%", u.redraw(d);
return this;
};
r.contents = function(d, l) {
const p = this.el;
let u = this.body;
if (null == d) return u.innerHTML;
this.length ? this.clear() : u && (p.removeChild(u), u = null);
u || (this.body = u = p.appendChild(m.el("", l || "wg-content")), this._h = null, 
(l = this.lang) && this._locale(l, this.rtl, !0));
"string" === typeof d ? B(u)._html(d) : d && this.append(d);
this.redraw();
return this;
};
r.textarea = function(d, l) {
let p = this.field;
if (p) {
var u = p.editable();
p.reload(d, l);
u !== l && this.restyle();
} else this.length && this.clear(), u = m.el("textarea"), u.setAttribute("wrap", "virtual"), 
u.setAttribute("autocomplete", "off"), u.setAttribute("id", "wg" + String(++a)), 
u.value = d, this.contents(u), p = D.require("2e")._new(u)[l ? "enable" : "disable"](), 
h(this, u), this.field = p, this.restyle();
this.lang || this.locale("en");
return p;
};
r.locale = function(d) {
d = D.require("28").cast(d);
return this._locale(String(d), d.isRTL());
};
r._locale = function(d, l, p) {
const u = this.body;
if (p || d !== this.lang) this.lang = d, u && u.setAttribute("lang", d);
if (p || l !== this.rtl) this.rtl = l, u && u.setAttribute("dir", l ? "RTL" : "LTR");
return this;
};
r.editable = function() {
let d = this.field;
if (d) return d.editable() ? d : null;
const l = this.cells;
let p = this.navigated();
if (null != p) return l[p].editable();
p = -1;
const u = l.length;
for (;++p < u && (d = l[p].editable(), null == d); );
return d;
};
r.eachTextarea = function(d) {
const l = this.field;
l ? d(l) : this.each(function(p) {
p.eachTextarea(d);
});
return this;
};
r.append = function(d) {
d && (d.nodeType ? k.init(this.body.appendChild(d)) : k.init(B(d).appendTo(this.body)));
return this;
};
r.prepend = function(d) {
const l = this.body;
if (d.nodeType) {
const p = l.firstChild;
k.init(p ? l.insertBefore(d, p) : l.appendChild(d));
} else k.init(B(d).prependTo(l));
return this;
};
r.before = function(d) {
const l = this.body;
d.nodeType ? k.init(this.el.insertBefore(d, l)) : k.init(B(d).insertBefore(l));
return this;
};
r.header = function(d, l) {
if (null == d && null == l) return this.el.getElementsByTagName("header")[0];
this.t = m.txt(d || "");
this.el.insertBefore(m.el("header", l), this.body).appendChild(this.t);
this.redraw();
return this;
};
r.toolbar = function() {
const d = this.header(), l = d.getElementsByTagName("nav");
return 0 === l.length ? d.appendChild(m.el("nav")) : l[0];
};
r.title = function(d) {
const l = this.t;
if (l) return l.nodeValue = d || "", l;
this.header(d);
return this.t;
};
r.titled = function() {
return this.t && this.t.nodeValue;
};
r.bodyY = function() {
return n(this.body, this.el);
};
r.scrollY = function(d) {
if (la === d) return this.body.scrollTop;
this.body.scrollTop = d;
};
r.tabulate = function(d) {
let l = this.table;
l ? l.clear() : l = D.require("2f").create(this);
l.init(d);
return this.table = l;
};
r.lock = function() {
this.body.className += " locked";
return this;
};
r.scrollTo = function(d, l) {
let p = this.body;
var u = p.scrollTop;
let C = n(d, p);
if (u > C) u = C; else {
const z = p.clientHeight;
d = C + B(d).outerHeight();
if (z + u < d) u = d - z; else return;
}
l ? p.scrollTop = u : B(p).stop(!0).animate({
scrollTop: u
}, 250);
};
r.navigize = function(d, l) {
function p(H) {
const J = z[H], O = C[H], R = B(J.el).show();
O.addClass("active");
E = H;
G.data("idx", H);
J.fire("wgTabSelect", [ H ]);
return R;
}
const u = this, C = [], z = u.cells;
let A = u.nav, E;
A && u.el.removeChild(A);
A = u.nav = u.el.insertBefore(m.el("nav", "wg-tabs"), u.body);
const G = B(A).on("click", function(H) {
const J = B(H.target).data("idx");
if (null == J) return !0;
if (null != E) {
{
const O = C[E];
B(z[E].el).hide();
O.removeClass("active");
}
}
p(J);
u.redraw();
return e(H);
});
null == l && (l = G.data("idx") || 0);
u.each(function(H, J) {
C[J] = B('<a href="#' + H.id + '"></a>').data("idx", J).text(d[J]).appendTo(G);
H.pos = 0;
B(H.el).hide();
});
p(z[l] ? l : 0);
u.lock();
u.redraw();
return u;
};
r.navigated = function() {
const d = this.nav;
if (d) return B(d).data("idx");
};
r = null;
return w;
}({}, L, M));
D.register("1d", function(w, r, F) {
function y(a, c) {
a.stopPropagation();
n = c;
return !0;
}
function q(a) {
const c = "Zero One Two Few Many Other".split(" ");
return [ null, [ c[5] ], [ c[1], c[5] ], [ c[1], c[3], c[5] ], [ c[1], c[3], c[4], c[5] ], [ c[1], c[2], c[3], c[4], c[5] ] ][a] || c;
}
function t(a) {
const c = [];
a && (a.saved() || c.push("po-unsaved"), a.fuzzy() ? c.push("po-fuzzy") : a.hasFlag() && c.push("po-flagged"), 
a.valid() || c.push("po-error"), a.translation() || c.push("po-empty"), a.comment() && c.push("po-comment"));
return c.join(" ");
}
function e(a, c, d) {
c = B(a.title(c).parentNode);
let l = c.find("span.lang");
d ? (d = D.require("28").cast(d), l.length || (l = B("<span></span>").prependTo(c)), 
l.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (l.remove(), 
d = "en");
a.locale(d);
return c;
}
function b(a, c, d) {
c.on("click", function(l) {
const p = a.fire(d, [ l.target ]);
p || l.preventDefault();
return p;
});
}
function h(a, c, d, l) {
let p = a[c];
return d.length ? (p || (p = l.find("div.meta"), p.length || (p = B('<div class="meta"></div>').insertAfter(l.header())), 
b(a, p, "poMeta"), a[c] = p), p.html(d.join("\n")).show(), !0) : p && p.text() ? (p.text("").hide(), 
!0) : !1;
}
function g() {
this.dirty = 0;
}
D.require("3");
const k = D.require("6").html, m = D.require("6").sprintf;
let n, x;
w.extend = function(a) {
return a.prototype = new g();
};
w.localise = function(a) {
x = a;
return w;
};
const v = function() {
const a = F.createElement("p"), c = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
a.innerHTML = d.replace(c, "data-x-loco-$1=");
const l = a.textContent.trim();
return l ? l.replace("data-x-loco-", "") : d.trim();
};
}(), f = g.prototype = D.require("29").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
function c(l) {
d.redraw(!0, l);
return !0;
}
const d = D.require("2a").init(a);
B(r).on("resize", c);
this.redraw = c;
B(a).on("wgFocus wgBlur", y);
this.destroy = function() {
d.destroy();
B(r).off("resize", c);
};
this.rootDiv = a;
return d;
};
f.$ = function() {
return B(this.rootDiv);
};
f.setListCell = function(a) {
const c = this;
c.listCell = a;
a.on("wgRowSelect", function(d, l) {
(d = c.po.row(l)) && d !== c.active && c.loadMessage(d);
}).on("wgRowDeselect", function(d, l, p) {
p || c.loadNothing();
});
};
f.setSourceCell = function(a) {
this.sourceCell = a;
};
f.setTargetCell = function(a) {
this.targetCell = a;
};
f.next = function(a, c, d) {
const l = this.listTable, p = this.po;
let u = l.selected(), C = u, z;
for (;null != (u = l.next(a, d, u)); ) {
if (C === u) {
u = null;
break;
}
if (c && (z = p.row(u), z.translated(0))) continue;
break;
}
null != u && l.select(u, !0);
return u;
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
let l = -1;
for (;++l < c; ) d.add(l, a[l].toText());
};
f.filtered = function() {
return this.lastSearch || "";
};
f.filter = function(a, c) {
const d = this.listTable, l = this.lastFound, p = this.lastSearch || "";
let u, C;
a ? (C = this.dict.find(a), u = C.length, u === l && 0 === a.indexOf(p) ? c = !0 : d.filter(C)) : (u = this.po.length, 
d.unfilter());
this.lastFound = u;
this.lastSearch = a;
c || this.fire("poFilter", [ a, u ]);
return u;
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
var d = t(a);
a = c[0].className;
d = a.replace(/(?:^| +)po-[a-z]+/g, "") + " " + d;
d !== a && B(c).attr("class", d);
}
};
f.save = function(a) {
const c = this.po;
if (this.dirty || a) {
const d = [], l = [], p = this.listTable;
c.each(function(u, C, z) {
C.err && d.push(C);
C.saved() || (C.save(), (C = (u = p.row(z)) && u.page) && C.live ? l[C.i] = C.live : u && B(u.cells()).removeClass("po-unsaved"));
});
l.length && B(l).find("div.po-unsaved").removeClass("po-unsaved");
this.dirty = 0;
this.invalid = d.length ? d : null;
this.fire("poSave", []);
}
return c;
};
f.fire = function(a, c) {
const d = this.handle;
if (d && d[a] && !1 === d[a].apply(this, c || [])) return !1;
a = B.Event(a);
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
var l = d && d.locale() || a.targetLocale, p = d && d.source() || a.sourceLocale;
const u = l && l.isRTL(), C = d && d.length || 0;
if (!d || !d.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.setLocales(p, l);
a.lastSearch && (a.lastSearch = "", a.lastFound = C, a.fire("poFilter", [ "", C ]));
p = (l = a.listTable) && l.thead().distribution();
let z = [];
a.listTable = l = c.tabulate({
eachCol: function(A) {
const E = a.getListColumns(), G = a.getListHeadings();
for (const H in E) {
const J = E[H];
A(J, H, G[J]);
}
},
eachRow: function(A) {
d.each(function(E, G) {
a.validate(G) && z.push(G);
A(G.idx, a.getListEntry(G), t(G));
});
},
sort: a.getSorter()
});
c = a.getListColumns();
for (const A in c) l.sortable(c[A]);
p && l.thead().distribute(p);
l.tbody().$(u ? "addClass" : "removeClass", [ "is-rtl" ]);
a.invalid = z.length ? z : null;
return !!C;
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
c && c.eachTextarea(function(l) {
l.val(a.source(null, d++));
});
(c = this.contextCell) && c.eachTextarea(function(l) {
l.val(a.context());
});
if (c = this.targetCell) d = 0, c.eachTextarea(function(l) {
l.val(a.translation(d++));
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
var l = d.navigated() || 0;
l = this.setTrgMeta(a, l, d);
!c && this.setSrcMeta(a, d) && (l = !0);
l && (d.redraw(), this.reCssRow(a));
}
return this;
};
f.setStatus = function() {
return null;
};
f.allowRichMeta = function() {
return !1;
};
f.setSrcMeta = function(a, c) {
const d = [];
var l = this.labels, p = a.context();
let u = [], C = a.tags(), z = C && C.length;
p && (u.push("<span>" + k(l[4]) + "</span>"), u.push('<mark class="ctxt">' + k(p) + "</mark>"));
if (z && this.getTag) for (u.push("<span>Tagged:</span>"), l = -1; ++l < z; ) (p = this.getTag(C[l])) && u.push("<mark>" + k(p.mod_name) + "</mark>");
u.length && d.push('<p class="tags">' + u.join(" ") + "</p>");
if (this.getMono() && (p = a.refs()) && (C = p.split(/\s/), z = C.length)) {
for (u = []; 0 <= --z; ) p = C[z], u.push("<code>" + k(p) + "</code>");
d.push('<p class="has-icon icon-file">' + u.join(" ") + "</p>");
}
(p = a.format()) && "no-" !== p.substring(0, 3) && d.push('<p class="has-icon icon-help">This string is formatted. <a href="#format">See full details</a>.</p>');
(p = a.notes()) && d.push('<p class="has-icon icon-info">' + k(p, this.allowRichMeta()) + "</p>");
return h(this, "$smeta", d, c);
};
f.setTrgMeta = function(a, c, d) {
const l = [], p = (c = a.errors(c)) && c.length, u = this.allowRichMeta();
if (p) for (let C = 0; C < p; C++) l.push('<p class="has-icon icon-warn">' + k(c[C], u) + ".</p>");
a.tcmt && l.push('<p class="has-icon icon-info">' + k(a.tcmt, u) + "</p>");
return h(this, "$tmeta", l, d);
};
f.loadMessage = function(a) {
function c(N) {
if ("=" === N.charAt(0)) {
const K = N.split(" ");
N = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = K.join(" ");
}
return N;
}
function d(N, K) {
const S = ma;
var P = da[0];
N.off();
N.titled() !== P && e(N, P, K || "en");
P = !1;
A.setSrcMeta(a, N) && (P = !0);
if (a.plural()) {
P = -1;
let U = [], V = [];
const Y = N.id + "-";
K = a.sourceForms() || K && K.plurals || q(2);
const ea = K.length;
if (2 !== ea || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++P < ea; ) U[P] = Y + String(P), 
V[P] = c(K[P].split(" ", 1)[0]) + ":"; else U = [ Y + "-0", Y + "-1" ], V = [ da[1], da[2] ];
N.splity.apply(N, U);
N.each(function(fa, aa) {
fa.header(V[aa]).textarea(a.source(null, aa), S).setStrf(J).setMode(ba).setInvs(G);
});
N.lock();
S && N.each(function(fa, aa) {
l(fa, aa);
});
} else P && N.redraw(), N.textarea(a.source(), S).setStrf(J).setMode(ba).setInvs(G), 
S && l(N, 0);
}
function l(N, K) {
N.on("changing", function(S, P) {
a.source(P, K);
0 === K && A.updateListCell(a, "source");
A.unsave(a, K);
}).on("changed", function() {
0 === K && A.po.reIndex(a);
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function p(N, K, S, P) {
Z && K.eachTextarea(function(V) {
V.ping();
});
K.off("changing").off("changed");
var U = m(da[3], S.label || "Target");
K.titled() !== U && e(K, U, S);
U = !1;
!N && A.setSrcMeta(a, K) && (U = !0);
A.setTrgMeta(a, P, K) && (U = !0);
A.setStatus(a, P);
if (1 !== S.nplurals && a.pluralized()) {
N = function(W) {
W < aa && (Y.push(c(fa[W])), V.push(ea + String(W)));
};
let V = [], Y = [];
const ea = K.id + "-", fa = a.targetForms() || S.plurals || q(S.nplurals), aa = fa.length;
for (a.eachMsg(N); (S = V.length) < aa; ) N(S);
K.splitx.apply(K, V);
K.each(function(W, ca) {
const na = Z && !a.disabled(ca);
W.textarea(a.translation(ca), na).setStrf(J).setMode(ba).setInvs(G);
Z && u(W, ca);
});
K.navigize(Y, P || null).on("wgTabSelect", function(W, ca) {
(W = Z && W.cell.editable()) && W.focus();
A.setTrgMeta(a, ca, K);
A.setStatus(a, ca);
A.fire("poTab", [ ca ]);
});
} else U && K.redraw(), K.textarea(a.translation(), Z && !a.disabled(0)).setStrf(J).setMode(ba).setInvs(G), 
Z && u(K, 0);
}
function u(N, K) {
function S() {
P = null;
A.validate(a);
const V = a.errors(K).join(" ");
U !== V && (U = V, A.setTrgMeta(a, K, N) && N.redraw(), A.reCssRow(a));
}
let P, U = a.errors(K).join(" ");
N.on("changing", function(V, Y, ea) {
P && (clearTimeout(P), P = null);
a.translate(Y, K);
0 === K && A.updateListCell(a, "target");
a.fuzzy(K) && a.saved(K) ? A.fuzzy(!1, a, K) : A.unsave(a, K);
"" === Y ? (A.fire("poEmpty", [ !0, a, K ]), A.setStatus(a, K)) : "" === ea && (A.fire("poEmpty", [ !1, a, K ]), 
A.setStatus(a, K));
P = setTimeout(S, U ? 300 : 1e3);
}).on("changed", function() {
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function C(N) {
N.off();
const K = da[4];
N.titled() !== K && (e(N, K), A.setStatus(null));
N.textarea(a.context(), !0).setMode(ba).setInvs(G);
oa && N.on("changing", function(S, P) {
a.context(P);
A.updateListCell(a, "source");
A.unsave(a, ha);
}).on("changed", function() {
A.po.reIndex(a);
A.dict && A.rebuildSearch();
A.fire("poUpdate", [ a ]);
});
}
function z(N) {
const K = da[5];
N.titled() !== K && e(N, K);
N.off().on("changing", function(S, P) {
a.comment(P);
A.fire("poComment", [ a, P ]);
A.unsave(a, ha);
}).textarea(a.comment(), !0);
}
const A = this;
var E = a.isHTML();
const G = A.inv || !1, H = this.fmt || null, J = a.format() || null, O = a.is(A.active), R = A.sourceCell, I = A.targetCell, Q = A.contextCell, X = A.commentCell, Z = A.editable.target, ma = A.editable.source, oa = A.editable.context, pa = A.sourceLocale, ka = A.targetLocale, da = A.labels;
let ha = 0, ba = A.mode, ia = n;
A.html !== E && (A.html = E, "code" !== A.mode && (ba = E ? "html" : "", A.setMode(ba)));
A.active = a;
R && d(R, pa);
Q && C(Q);
I && ka && (ha = I.navigated() || 0, p(R, I, ka, ha));
X && z(X);
ia && (ia.exists() || (ia = ia.parent()), (E = ia.editable()) && E.focus());
H !== J && (this.fmt = J);
O || A.fire("poSelected", [ a, ha ]);
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
const a = this.t(), c = this.mode || "", d = this.inv || !1, l = this.fmt;
this.unloadActive();
this.setStatus(null);
let p = this.commentCell;
p && p.textarea("", !1);
if (p = this.sourceCell) p.textarea("", !1).setStrf(l).setMode(c).setInvs(d), p.title(a._x("Source text not loaded", "Editor") + ":");
if (p = this.contextCell) p.textarea("", !1).setMode(c).setInvs(d), p.title(a._x("Context not loaded", "Editor") + ":");
if (p = this.targetCell) p.textarea("", !1).setStrf(l).setMode(c).setInvs(d), p.title(a._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
f.updateListCell = function(a, c) {
c = this.getListColumns()[c];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(c);
};
f.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? v(a) : a.trim()) || " ";
};
f.fuzzy = function(a, c, d) {
c = c || this.active;
const l = c.fuzzy(d);
!0 !== a || l ? !1 === a && l && this.flag(0, c, d) && this.fire("poFuzzy", [ c, !1, d ]) : this.flag(4, c, d) && this.fire("poFuzzy", [ c, !0, d ]);
return l;
};
f.flag = function(a, c, d) {
if (!c) {
c = this.active;
d = this.getTargetOffset();
if (null == d) return null;
d && c.targetForms() && (d = 0);
}
const l = c.flagged(d);
if (null == a) return l;
if (l === a || a && !c.translated(d) || !this.fire("poFlag", [ a, l, c, d ])) return !1;
c.flag(a, d);
this.fire("poUpdate", [ c ]) && this.unsave(c, d);
this.setStatus(c, d);
return !0;
};
f.add = function(a, c) {
let d, l = this.po.get(a, c);
l ? d = this.po.indexOf(l) : (d = this.po.length, l = this.po.add(a, c), this.load(this.po, -1), 
this.fire("poAdd", [ l ]), this.fire("poUpdate", [ l ]));
this.lastSearch && this.filter("");
this.listTable.select(d);
return l;
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
this.callTextareas(function(l) {
l.setMode(a);
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
}({}, L, M));
D.register("1e", function(w, r, F) {
w.init = function() {
const y = /%([1-9]\d*\$)?[s%]/, q = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return {
parse: function(t, e) {
const b = e && e.count || 0;
e = e && e.types || {};
let h = !0, g = 0, k = 0;
for (var m; null != (m = q.exec(t)); ) {
const n = m[2];
if ("%" !== n || "%%" !== m[0]) {
if ("" === n || -1 === "suxXbcdeEfFgGo".indexOf(n)) {
h = !1;
break;
}
null == m[1] ? m = ++k : (m = parseInt(m[1]), g = Math.max(g, m));
null == e[m] && (e[m] = {});
e[m][n] = !0;
}
}
if (h) return {
valid: !0,
count: Math.max(g, k, b),
types: e
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
D.register("d", function(w, r, F) {
function y() {
this.init();
}
function q(g) {
g = B('<button type="button" class="button button-small icon icon-' + g + ' hastip"></button>');
D.require("c").init(g);
return g;
}
function t(g) {
return q("cloud").attr("title", g.labels[8] + " (Ctrl-U)").on("click", function(k) {
k.preventDefault();
g.focus().fuzzy(!g.fuzzy());
});
}
function e(g) {
return q("robot").attr("title", g.labels[9] + " (Ctrl-J)").on("click", function(k) {
k.preventDefault();
g.fire("poHint");
});
}
function b(g, k) {
return D.require("6").vsprintf(g, k);
}
w.init = function(g) {
const k = new y();
g = k.setRootCell(g);
var m = g.splity("po-list", "po-edit");
let n = m[0], x = m[1];
m = x.splitx("po-trans", "po-comment");
var v = m[0];
let f = m[1].header("Loading..");
m = v.splity("po-source", "po-target");
v = m[0].header("Loading..");
m = m[1].header("Loading..");
g.distribute([ .34 ]);
x.distribute([ .8 ]);
k.setListCell(n);
k.setSourceCell(v);
k.setTargetCell(m);
k.commentCell = f;
k.editable.source = !1;
return k;
};
r = y.prototype = D.require("1d").extend(y);
r.getListHeadings = function() {
const g = this.t(), k = [ g._x("Source text", "Editor") ];
this.targetLocale && (k[1] = g._x("Translation", "Editor"));
return k;
};
r.getListColumns = function() {
const g = {
source: 0
};
this.targetLocale && (g.target = 1);
return g;
};
r.getListEntry = function(g) {
const k = this.cellText, m = [ function() {
let n, x = k(g.source() || ""), v = g.context();
return v ? (n = F.createElement("p"), n.appendChild(F.createElement("mark")).innerText = v, 
n.appendChild(F.createTextNode(" " + x)), n) : x;
} ];
this.targetLocale && (m[1] = function() {
return k(g.translation() || "");
});
return m;
};
r.stats = function() {
let g = this.po, k = g.length, m = 0, n = 0, x = 0;
g.each(function(v, f) {
f.fuzzy() ? x++ : f.translated() ? m++ : n++;
});
return {
t: k,
p: m.percent(k) + "%",
f: x,
u: n
};
};
r.unlock = function() {
const g = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
g && (this._unlocked = g, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
r.lock = function() {
const g = this._unlocked;
g && (this.targetLocale = g, delete this._unlocked, this.po && this.po.lock(g), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, g ]), 
this.active && this.loadMessage(this.active));
};
r.locked = function() {
return !this._unlocked;
};
r.setStatus = function(g) {
let k = this.$tnav;
if (null == g) k && (k.remove(), this.$tnav = null); else {
k || (this.$tnav = k = B("<nav></nav>").append(t(this)).append(e(this)).appendTo(this.targetCell.header()));
var m = [];
g.translated() ? g.fuzzy() && m.push("po-fuzzy") : m.push("po-empty");
k.attr("class", m.join(" "));
}
};
r.getSorter = function() {
function g(n, x) {
const v = n.weight(), f = x.weight();
return v === f ? k(n, x) : v > f ? -1 : 1;
}
function k(n, x) {
return n.hash().localeCompare(x.hash());
}
const m = this;
return function(n) {
const x = m.po, v = m.locked() ? g : k;
n.sort(function(f, a) {
return v(x.row(f), x.row(a));
});
};
};
r.validate = function(g) {
g.err = null;
if (g.untranslated(0)) return 0;
const k = [];
let m = this.validateMessagePrintf(g, k);
m && (g.err = k);
return m;
};
r.validateMessagePrintf = function(g, k) {
const m = g.format();
if ("no-" === m.substring(0, 3)) return 0;
const n = g.msgid(), x = g.msgidPlural();
null == h && (h = D.require("1e").init());
var v = h;
if (!("" !== m || v.sniff(n) || "" !== x && v.sniff(x))) return 0;
let f = 0, a = v.parse(n);
x && a.valid && (a = v.parse(x, a));
if (!a.valid) return 0;
let c = a.count;
if (0 !== c || "" !== m) {
var d = this;
g.eachMsg(function(l, p) {
k[l] = [];
if ("" !== p) {
p = v.parse(p);
var u = p.count;
l = k[l];
if (p.valid) if (u > c) l.push(b(d.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ c ])), 
f++; else if (u < c && "" === x) l.push(b(d.t()._("Missing placeholders; source text formatting suggests at least %s"), [ c ])), 
f++; else {
u = a.types;
for (const C in p.types) for (const z in p.types[C]) if (null == u[C] || null == u[C][z]) {
l.push(d.t()._("Mismatching placeholder type; check against source text formatting"));
f++;
return;
}
} else l.push(d.t()._("Possible syntax error in string formatting")), f++;
}
});
return f;
}
};
r.handle = {};
let h;
return w;
}({}, L, M));
D.register("e", function(w, r, F) {
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
function h(k) {
if (k.isDefaultPrevented() || !k.metaKey && !k.ctrlKey) return !0;
const m = k.which;
if (!g[m]) return !0;
const n = t[m];
if (!n || k.altKey || k.shiftKey && !q[m] || !1 === n(k, e)) return !0;
k.stopPropagation();
k.preventDefault();
return !1;
}
const g = {};
B(b || r).on("keydown", h);
return {
add: function(k, m) {
t[y[k]] = m;
return this;
},
enable: function() {
for (const k in arguments) g[y[arguments[k]]] = !0;
return this;
},
disable: function() {
B(b || r).off("keydown", h);
e = b = null;
for (const k in t) g[k] = !1;
}
};
};
return w;
}({}, L, M));
D.register("1f", function(w, r, F) {
function y() {
this.reIndex([]);
}
w.init = function() {
return new y();
};
r = y.prototype;
r.reIndex = function(q) {
const t = {}, e = q.length;
let b = -1;
for (;++b < e; ) t[q[b]] = b;
this.keys = q;
this.length = b;
this.ords = t;
};
r.key = function(q, t) {
if (null == t) return this.keys[q];
const e = this.keys[q], b = this.ords[t];
if (t !== e) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[q] = t;
delete this.ords[e];
this.ords[t] = q;
}
return q;
};
r.indexOf = function(q) {
q = this.ords[q];
return null == q ? -1 : q;
};
r.add = function(q, t) {
let e = this.ords[q];
null == e && (this.keys[this.length] = q, e = this.ords[q] = this.length++);
this[e] = t;
return e;
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
const e = [].splice.call(this, q, t);
this.keys.splice(q, t);
this.reIndex(this.keys);
return e;
};
r.each = function(q) {
const t = this.keys, e = this.length;
let b = -1;
for (;++b < e; ) q(t[b], this[b], b);
return this;
};
r.sort = function(q) {
const t = this.length, e = this.keys, b = this.ords, h = [];
let g = -1;
for (;++g < t; ) h[g] = [ this[g], e[g] ];
h.sort(function(m, n) {
return q(m[0], n[0]);
});
for (g = 0; g < t; g++) {
var k = h[g];
this[g] = k[0];
k = k[1];
e[g] = k;
b[k] = g;
}
return this;
};
r.join = function(q) {
return [].join.call(this, q);
};
return w;
}({}, L, M));
D.register("20", function(w, r, F) {
function y(q, t) {
var e = new RegExp("^.{0," + (q - 1) + "}[" + t + "]"), b = new RegExp("^[^" + t + "]+");
return function(h, g) {
for (var k = h.length, m; k > q; ) {
m = e.exec(h) || b.exec(h);
if (null == m) break;
m = m[0];
g.push(m);
m = m.length;
k -= m;
h = h.substring(m);
}
0 !== k && g.push(h);
return g;
};
}
w.create = function(q) {
function t(n) {
return g[n] || "\\" + n;
}
var e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, b = /[ \r\n]+/g, h = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == q || isNaN(q = Number(q))) q = 79;
if (0 < q) {
var k = y(q - 3, " ");
var m = y(q - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(n, x) {
if (!x) return n + ' ""';
x = x.replace(h, t);
var v = 0;
x = x.replace(e, function() {
v++;
return "\\n\n";
});
if (!(v || q && q < x.length + n.length + 3)) return n + ' "' + x + '"';
n = [ n + ' "' ];
x = x.split("\n");
if (m) for (var f = -1, a = x.length; ++f < a; ) m(x[f], n); else n = n.concat(x);
return n.join('"\n"') + '"';
},
prefix: function(n, x) {
n = n.split(e);
return x + n.join("\n" + x);
},
refs: function(n) {
n = n.replace(b, " ", n);
k && (n = k(n, []).join("\n#: "));
return "#: " + n;
}
};
};
return w;
}({}, L, M));
D.register("2b", function(w, r, F) {
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
for (var t = -1, e = this.length; ++t < e; ) q(t, this[t]);
return this;
};
return w;
}({}, L, M));
D.register("21", function(w, r, F) {
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
if (t && t.length) return this.length = this.rows.length, this.rows.each(function(e, b, h) {
b.idx = h;
}), q;
}
};
r.reIndex = function(q, t) {
const e = q.hash(), b = this.indexOf(q), h = this.rows.indexOf(e);
return h === b ? b : -1 !== h ? (t = (t || 0) + 1, q.source("Error, duplicate " + String(t) + ": " + q.source()), 
this.reIndex(q, t)) : this.rows.key(b, e);
};
r.sort = function(q) {
this.rows.sort(q);
return this;
};
r.export = function() {
const q = this.rows, t = q.length, e = D.require("2b").init();
let b = -1;
for (;++b < t; ) e.push(q[b]);
return e;
};
return w;
}({}, L, M));
D.register("22", function(w, r, F) {
function y(e, b, h) {
if (null == h) return e[b] || "";
e[b] = h || "";
return e;
}
function q() {
this._id = this.id = "";
}
function t(e, b) {
const h = e.length;
let g = -1;
for (;++g < h; ) b(g, e[g]);
}
w.extend = function(e) {
return e.prototype = new q();
};
r = q.prototype;
r.flag = function(e, b) {
const h = this.flg || (this.flg = []);
if (null != b) h[b] = e; else for (b = Math.max(h.length, this.src.length, this.msg.length); 0 !== b--; ) h[b] = e;
return this;
};
r.flagged = function(e) {
return (this.flg || [])[e || 0] || 0;
};
r.hasFlag = function() {
const e = this.flg || [];
let b = e.length;
for (;0 !== b--; ) if (this.isFlag(e[b])) return !0;
return !1;
};
r.isFlag = function(e) {
return 0 < e;
};
r.flags = function() {
const e = {}, b = [], h = this.flg || [];
let g = h.length;
for (;0 !== g--; ) {
const k = h[g];
e[k] || (e[k] = !0, b.push(k));
}
return b;
};
r.flaggedAs = function(e, b) {
const h = this.flg || [];
if (null != b) return e === h[b] || 0;
for (b = h.length; 0 !== b--; ) if (h[b] === e) return !0;
return !1;
};
r.fuzzy = function(e, b) {
const h = this.flaggedAs(4, e);
null != b && this.flag(b ? 4 : 0, e);
return h;
};
r.source = function(e, b) {
if (null == e) return this.src[b || 0] || "";
this.src[b || 0] = e;
return this;
};
r.plural = function(e, b) {
if (null == e) return this.src[b || 1] || "";
this.src[b || 1] = e || "";
return this;
};
r.sourceForms = function() {
return this.srcF;
};
r.targetForms = function() {
return this.msgF;
};
r.each = function(e) {
const b = this.src, h = this.msg, g = Math.max(b.length, h.length);
let k = -1;
for (;++k < g; ) e(k, b[k], h[k]);
return this;
};
r.eachSrc = function(e) {
t(this.src, e);
return this;
};
r.eachMsg = function(e) {
t(this.msg, e);
return this;
};
r.count = function() {
return Math.max(this.src.length, this.msg.length);
};
r.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
r.translate = function(e, b) {
this.msg[b || 0] = e || "";
return this;
};
r.untranslate = function(e) {
if (null != e) this.msg[e] = ""; else {
const b = this.msg, h = b.length;
for (e = 0; e < h; e++) b[e] = "";
}
return this;
};
r.translation = function(e) {
return this.msg[e || 0] || "";
};
r.errors = function(e) {
return this.err && this.err[e || 0] || [];
};
r.valid = function() {
return null == this.err;
};
r.translated = function(e) {
if (null != e) return !!this.msg[e];
const b = this.msg, h = b.length;
for (e = 0; e < h; e++) if (!b[e]) return !1;
return !0;
};
r.untranslated = function(e) {
if (null != e) return !this.msg[e];
const b = this.msg, h = b.length;
for (e = 0; e < h; e++) if (b[e]) return !1;
return !0;
};
r.comment = function(e) {
return y(this, "cmt", e);
};
r.notes = function(e) {
return y(this, "xcmt", e);
};
r.refs = function(e) {
return y(this, "rf", e);
};
r.format = function(e) {
return y(this, "fmt", e);
};
r.context = function(e) {
return y(this, "ctx", e);
};
r.tags = function() {
return this.tg;
};
r.getMax = function(e) {
return (this.mx || [ 0 ])[e] || 0;
};
r.toString = r.toText = function() {
return this.src.concat(this.msg, [ this.id, this.ctx ]).join(" ");
};
r.weight = function() {
let e = 0;
this.translation() || (e += 2);
this.fuzzy() && (e += 1);
return e;
};
r.equals = function(e) {
return this === e || this.hash() === e.hash();
};
r.hash = function() {
return this.id;
};
r.normalize = function() {
let e = -1, b = this.msg.length;
for (;++e < b; ) this.msg[e] = this.src[Math.min(e, 1)] || "";
};
r.disabled = function(e) {
return !!(this.lck || [])[e || 0];
};
r.disable = function(e) {
(this.lck || (this.lck = []))[e || 0] = !0;
return this;
};
r.saved = function(e) {
const b = this.drt;
if (null == b) return !0;
if (null != e) return !b[e];
for (e = b.length; 0 !== e--; ) if (b[e]) return !1;
return !0;
};
r.unsave = function(e) {
(this.drt || (this.drt = []))[e || 0] = !0;
return this;
};
r.save = function(e) {
null == e ? this.drt = null : (this.drt || (this.drt = []))[e] = !1;
return this;
};
r.is = function(e) {
return e && (e === this || e.idx === this.idx);
};
r.isHTML = function(e) {
if (null == e) return this.htm || !1;
this.htm = e;
};
r = null;
return w;
}({}, L, M));
D.register("f", function(w, r, F) {
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
function q(g, k) {
g = g || "";
k && (g += "\0" + k);
return g;
}
function t(g) {
const k = r.console;
k && k.error && k.error(g.message || String(g));
}
function e(g) {
return D.require("20").create(g);
}
function b(g) {
this.locale(g);
this.clear();
this.head = y(this.now());
}
function h(g, k) {
this.src = [ g || "" ];
this.msg = [ k || "" ];
}
w.create = function(g) {
return new b(g);
};
F = D.require("21").extend(b);
F.clear = function() {
this.rows = D.require("1f").init();
this.length = 0;
return this;
};
F.now = function() {
function g(f, a) {
for (f = String(f); f.length < a; ) f = "0" + f;
return f;
}
var k = new Date();
const m = k.getUTCFullYear(), n = k.getUTCMonth() + 1, x = k.getUTCDate(), v = k.getUTCHours();
k = k.getUTCMinutes();
return g(m, 4) + "-" + g(n, 2) + "-" + g(x, 2) + " " + g(v, 2) + ":" + g(k, 2) + "+0000";
};
F.header = function(g, k) {
const m = this.head || (this.head = {});
if (null == k) return this.headers()[g] || "";
m[g] = k || "";
return this;
};
F.headers = function(g) {
const k = this.now(), m = this.head || (this.head = y(k));
if (null != g) {
for (x in g) m[x] = g[x];
return this;
}
const n = this.locale();
g = {};
for (x in m) g[x] = String(m[x]);
if (n) {
g.Language = String(n) || "zxx";
g["Language-Team"] = n.label || g.Language;
g["Plural-Forms"] = "nplurals=" + (n.nplurals || "2") + "; plural=" + (n.pluraleq || "n!=1") + ";";
var x = "PO-Revision-Date";
} else g.Language = "", g["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
g["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", x = "POT-Creation-Date";
g[x] || (g[x] = k);
g["X-Generator"] = "Loco https://localise.biz/";
return g;
};
F.get = function(g, k) {
g = q(g, k);
return this.rows.get(g);
};
F.add = function(g, k) {
g instanceof h || (g = new h(g));
k && g.context(k);
k = g.hash();
this.rows.get(k) ? t("Duplicate message at index " + this.indexOf(g)) : (g.idx = this.rows.add(k, g), 
this.length = this.rows.length);
return g;
};
F.load = function(g) {
let k = -1, m, n;
var x;
let v, f, a, c = (x = this.locale()) && x.nplurals || 2, d = [];
for (;++k < g.length; ) m = g[k], null == m.parent ? (n = m.source || m.id, x = m.target || "", 
v = m.context, n || v ? (f = new h(n, x), f._id = m._id, v && f.context(v), m.flag && f.flag(m.flag, 0), 
m.comment && f.comment(m.comment), m.notes && f.notes(m.notes), m.refs && f.refs(m.refs), 
f.format(m.format), m.message = f, this.add(f), m.prev && m.prev[0] && (f.prev(m.prev[0].source, m.prev[0].context), 
m.prev[1] && f._src.push(m.prev[1].source || ""))) : 0 === k && "object" === typeof x && (this.head = x, 
this.headcmt = m.comment)) : d.push(m);
for (k = -1; ++k < d.length; ) try {
m = d[k];
n = m.source || m.id;
f = g[m.parent] && g[m.parent].message;
if (!f) throw Error("parent missing for plural " + n);
a = m.plural;
1 === a && f.plural(n);
a >= c || (m.flag && f.flag(m.flag, a), f.translate(m.target || "", a), m.format && !f.format() && f.format(m.format));
} catch (l) {
t(l);
}
return this;
};
F.wrap = function(g) {
this.fmtr = e(g);
return this;
};
F.toString = function() {
var g, k = this.locale(), m = [], n = [], x = this.headers(), v = !k, f = k && k.nplurals || 2, a = this.fmtr || e();
x[k ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (g in x) n.push(g + ": " + x[g]);
n = new h("", n.join("\n"));
n.comment(this.headcmt || "");
v && n.fuzzy(0, !0);
m.push(n.toString());
m.push("");
this.rows.each(function(c, d) {
c && (m.push(d.cat(a, v, f)), m.push(""));
});
return m.join("\n");
};
F = D.require("22").extend(h);
F.msgid = function() {
return this.src[0];
};
F.msgidPlural = function() {
return this.src[1] || "";
};
F.prev = function(g, k) {
this._src = [ g || "" ];
this._ctx = k;
};
F.hash = function() {
return q(this.source(), this.context());
};
F.toString = function() {
return this.cat(e());
};
F.cat = function(g, k, m) {
var n = [], x;
(x = this.cmt) && n.push(g.prefix(x, "# "));
(x = this.xcmt) && n.push(g.prefix(x, "#. "));
var v = this.rf;
if (x = this._id) v += (v ? " " : "") + "loco:" + x;
v && /\S/.test(v) && n.push(g.refs(v));
!k && this.fuzzy() && n.push("#, fuzzy");
(x = this.fmt) && n.push("#, " + x + "-format");
(x = this._ctx) && n.push(g.prefix(g.pair("msgctxt", x), "#| "));
if (x = this._src) x[0] && n.push(g.prefix(g.pair("msgid", x[0]), "#| ")), x[1] && n.push(g.prefix(g.pair("msgid_plural", x[1]), "#| "));
(x = this.ctx) && n.push(g.pair("msgctxt", x));
n.push(g.pair("msgid", this.src[0]));
if (null == this.src[1]) n.push(g.pair("msgstr", k ? "" : this.msg[0])); else for (v = -1, 
n.push(g.pair("msgid_plural", this.src[1])), x = this.msg || [ "", "" ], m = m || x.length; ++v < m; ) n.push(g.pair("msgstr[" + v + "]", k ? "" : x[v] || ""));
return n.join("\n");
};
F.compare = function(g, k) {
let m = this.weight(), n = g.weight();
if (m > n) return 1;
if (m < n) return -1;
if (k) {
m = this.hash().toLowerCase();
n = g.hash().toLowerCase();
if (m < n) return 1;
if (m > n) return -1;
}
return 0;
};
F.copy = function() {
let g = new h(), k, m;
for (k in this) this.hasOwnProperty(k) && ((m = this[k]) && m.concat && (m = m.concat()), 
g[k] = m);
return g;
};
return w;
}({}, L, M));
D.register("11", function(w, r, F) {
w.init = function(y, q) {
function t() {
return g || (g = B('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function e(k, m, n) {
k = B("<p></p>").text(n);
t().dialog("close").html("").dialog("option", "title", "Error").append(k).dialog("open");
}
function b(k) {
const m = k && k.code;
if (m) {
for (var n = m.length, x = B("<ol></ol>").attr("class", k.type), v = -1; ++v < n; ) B("<li></li>").html(m[v]).appendTo(x);
0 !== k.line && x.find("li").eq(k.line - 1).attr("class", "highlighted");
t().dialog("close").html("").dialog("option", "title", k.path + ":" + k.line).append(x).dialog("open");
}
}
function h(k) {
k = k.target;
const m = B(k).find("li.highlighted")[0];
k.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(k.clientHeight / 2));
}
let g;
return {
load: function(k) {
t().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", h);
k = B.extend({
ref: k,
path: q.popath
}, q.project || {});
y.ajax.post("fsReference", k, b, e);
}
};
};
return w;
}({}, L, M));
D.register("12", function(w, r, F) {
function y() {
this.inf = {};
}
function q() {
const b = F.createElement("p"), h = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, g = /<[a-z]+\s/i;
let k, m;
return {
sniff: function(n) {
if (n === k) return m;
k = n;
if (h.test(n) || g.test(n)) if (b.innerHTML = n, b.textContent !== n) return m = !0;
return m = !1;
}
};
}
w.create = function(b, h) {
h && "function" === typeof h.create || console.error("module.create is not callable");
h = h.create(y);
h.init(b);
return h;
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
const h = (r.loco || {}).notices;
h && h.error && h.error(String(this) + ": " + String(b));
};
t.xhrError = function(b, h, g) {
try {
const k = b.responseText, m = k && r.JSON.parse(k);
g = m && this.parseError(m) || g;
} catch (k) {}
return g || this.httpError(b);
};
t.httpError = function(b) {
return (b = b && b.status) && 200 !== b ? "Responded status " + b : "Unknown error";
};
t.parseError = function(b) {
return b && b.error || "";
};
t.mapLang = function(b, h) {
const g = String(b).replace("_", "-").toLowerCase();
var k = b.lang;
h = h[g] || h[k] || [];
b = h.length;
if (0 === b) return k;
if (1 < b) for (k = -1; ++k < b; ) {
const m = h[k];
if (m === g) return m;
}
return h[0];
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
t.translate = function(b, h, g) {
return this.batch([ b ], h, this.isHtml(b.source), g);
};
t.unwind = function(b, h) {
const g = [], k = b.length;
for (let m = 0; m < k; m++) g.push(b[m][h]);
return g;
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
}, function(h, g) {
b(!!g);
});
};
t.hash = function() {
return this.key();
};
t._call = function(b) {
const h = this;
h.state = null;
b.cache = !0;
b.dataType = "json";
b.error = function(g, k, m) {
h.stderr(h.xhrError(g, k, m));
};
return h.abortable(B.ajax(b));
};
t.abortable = function(b) {
const h = this;
b.always(function() {
h.$r === b && (h.$r = null);
});
return h.$r = b;
};
t.abort = function() {
const b = this.$r;
b && b.abort();
};
t.isHtml = function(b) {
return (e || (e = q())).sniff(b);
};
let e;
return w;
}({}, L, M));
D.register("13", function(w, r, F) {
function y(q) {
this.api = q;
this.chars = 0;
}
w.create = function(q) {
return new y(q);
};
r = y.prototype;
r.init = function(q, t) {
function e(c) {
let d = {
id: h.length,
length: 0,
html: c.html,
items: []
};
h.push(d);
return k[c.html ? 1 : 0] = d;
}
function b(c, d, l) {
var p = c.source(null, l);
if (p && (c.untranslated(l) || t)) {
{
l = c.notes();
const C = c.context();
c = p.length;
var u = g.isHtml(p);
p = {
source: p,
context: C,
notes: l
};
l = k[u ? 1 : 0];
u = l.items;
if (f && c > f) x++, c = void 0; else {
if (l.length + c > v || 50 === u.length) l = e(l), u = l.items;
u.push(p);
l.length += c;
m += c;
n += 1;
c = p;
}
}
c && (c.id = d);
}
}
const h = [], g = this.api;
let k = [], m = 0, n = 0, x = 0, v = 1e4, f = g.maxChr();
f && (v = Math.min(v, f));
e({
html: !1
});
e({
html: !0
});
const a = q.locale();
q.each(1 < a.nplurals ? function(c, d, l) {
b(d, l, 0);
b(d, l, 1);
} : function(c, d, l) {
b(d, l, 0);
});
k = [];
this.chars = m;
this.length = n;
this.batches = h;
this.locale = a;
x && g.stderr("Strings over " + v + " characters long will be skipped");
};
r.abort = function() {
this.state = "abort";
return this;
};
r.dispatch = function(q) {
function t(z, A) {
if (!b()) return !1;
if (!A) return !0;
c++;
const E = q.row(z.id), G = z.source;
let H = 0;
E.each(function(J, O, R) {
A !== R && (G === O || 1 < J && E.source(null, 1) === G) && (E.translate(A, J), 
H++, l++);
});
H && n("each", [ E ]);
}
function e(z) {
return function(A, E) {
t(z[A], E);
return !0;
};
}
function b() {
return "abort" === x.state ? (v && (v.abort(), m()), !1) : !0;
}
function h() {
const z = f.shift();
if (z) {
const A = z.items;
A && A.length ? v.batch(A, a, z.html, e(A)).fail(g).always(k) : k();
} else m();
}
function g() {
x.abort();
m();
}
function k() {
d++;
n("prog", [ d, u ]);
b() && h();
}
function m() {
v = f = null;
n("done");
}
function n(z, A) {
z = C[z] || [];
let E = z.length;
for (;0 <= --E; ) z[E].apply(null, A);
}
let x = this, v = x.api, f = x.batches || [], a = x.locale, c = 0, d = 0, l = 0, p = x.length, u = f.length, C = {
done: [],
each: [],
prog: []
};
x.state = "";
h();
return {
done: function(z) {
C.done.push(z);
return this;
},
each: function(z) {
C.each.push(z);
return this;
},
prog: function(z) {
C.prog.push(z);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(p - c, 0);
},
did: function() {
return c;
}
};
}
};
};
return w;
}({}, L, M));
D.register("14", function(w, r, F) {
function y() {}
w.create = function(q) {
(y.prototype = new q()).batch = function(t, e, b, h) {
function g(x) {
let v = -1;
for (;++v < m && !1 !== h(v, x[v], e); );
}
const k = r.loco, m = t.length;
t = {
hook: this.getId(),
type: b ? "html" : "text",
locale: String(e),
source: this.getSrc(),
sources: t
};
const n = B.Deferred();
this.abortable(k.ajax.post("apis", t, function(x) {
g(x && x.targets || []);
n.resolve();
}, function() {
g([]);
n.reject();
}));
return n.promise();
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
D.register("15", function(w, r, F) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.toString = function() {
return "Google Translate";
};
q.parseError = function(t) {
if (t.error) {
const e = [], b = t.error.errors || [], h = b.length;
let g = -1;
for (;++g < h; ) e.push(b[g].message || "");
return "Error " + t.error.code + ": " + e.join(";");
}
return "";
};
q.getLangMap = function() {
return D.require("24");
};
q.batch = function(t, e, b, h) {
function g(v) {
const f = x.length;
let a = -1;
for (;++a < f && !1 !== h(a, (v[a] || {}).translatedText || "", e); );
}
const k = this, m = k.getSrc();
b = b ? "html" : "text";
const n = k.mapLang(e, k.getLangMap()), x = this.unwind(t, "source");
return k._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + n + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: k.key(),
q: x
}
}).done(function(v, f, a) {
v.data ? g(v.data.translations || []) : (k.stderr(k.parseError(v) || k.httpError(a)), 
g([]));
}).fail(function() {
g([]);
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
D.register("16", function(w, r, F) {
function y() {}
w.create = function(q) {
q = y.prototype = new q();
q.parseError = function(t) {
var e = t.details || {};
let b = e.message;
e = e.texts;
return b ? (e && e !== b && (b += "; " + e), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(h) {
h += -1 === h.indexOf("?") ? "?" : "&";
return h + "ref=loco";
}), "Error " + (t.status || "0") + ": " + b) : "";
};
q.maxChr = function() {
return 1e3;
};
q.getLangMap = function() {
return D.require("25");
};
q.batch = function(t, e, b, h) {
function g(v) {
const f = x.length;
let a = -1, c = (v[0] || {
translated: []
}).translated || [];
for (;++a < f && (v = c[a] || "", !1 !== h(a, v, e)); );
}
const k = this;
b = this.getSrc();
const m = k.param("api") || "https://api.lecto.ai", n = k.mapLang(e, k.getLangMap()), x = this.unwind(t, "source");
return k._call({
url: k.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ n ],
from: b,
texts: x
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": k.key(),
Accept: "application/json"
}
}).done(function(v, f, a) {
v ? g(v.translations || []) : (k.stderr(k.parseError(v) || k.httpError(a)), g([]));
}).fail(function() {
g([]);
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
D.register("17", function(w, r, F) {
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
q.batch = function(t, e, b, h) {
function g(a) {
let c = -1;
for (var d; ++c < x && (d = a[c] || {}, d = d.translations || [], d = d[0] || {}, 
!1 !== h(c, d.text || "", e)); );
}
let k = this, m = [], n = k.getSrc();
t = this.unwind(t, "source");
let x = t.length, v = -1;
b = b ? "html" : "plain";
let f = k.mapLang(e, k.getLangMap());
for (;++v < x; ) m.push({
Text: t[v]
});
return k._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + n + "&to=" + f + "&textType=" + b,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": k.region()
}
}).done(function(a, c, d) {
a && a.length ? g(a) : (k.stderr(k.parseError(a) || k.httpError(d)), g([]));
}).fail(function() {
g([]);
});
};
return new y();
};
return w;
}({}, L, M));
D.register("18", function(w, r, F) {
w.init = function(y) {
function q() {
O || (A.on("click", m), O = B('<div id="loco-fs-creds"></div>').dialog({
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
G && (e(B(a)), G = !1);
if (l && J) {
var I = J, Q = B(E);
Q.find("span.loco-msg").text(I);
H || (Q.removeClass("jshide").hide().fadeIn(500), H = !0);
} else H && (e(B(E)), H = !1);
}
function e(I) {
I.slideUp(250).fadeOut(250, function() {
B(this).addClass("jshide");
});
}
function b() {
if (l) return O && O.dialog("close"), t(), B(y).find('button[type="submit"]').attr("disabled", !1), 
B(r).triggerHandler("resize"), f && f(!0), !0;
u && O ? (G || (B(a).removeClass("jshide").hide().fadeIn(500), G = !0), H && (e(B(E)), 
H = !1)) : t();
B(y).find('input[type="submit"]').attr("disabled", !0);
f && f(!1);
return !1;
}
function h(I) {
var Q, X = R || {};
for (Q in X) if (X.hasOwnProperty(Q)) {
var Z = X[Q];
I[Q] ? I[Q].value = Z : B('<input type="hidden" />').attr("name", Q).appendTo(I).val(Z);
}
}
function g(I) {
I.preventDefault();
I = B(I.target).serializeArray();
v(I);
d = !0;
return !1;
}
function k(I) {
I.preventDefault();
O.dialog("close");
return !1;
}
function m(I) {
I.preventDefault();
O.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function n(I) {
l = I.authed;
c = I.method;
B(a).find("span.loco-msg").text(I.message || "Something went wrong.");
J = I.warning || "";
I.notice && p.notices.info(I.notice);
if (l) "direct" !== c && (R = I.creds, h(y), d && I.success && p.notices.success(I.success)), 
b(); else if (I.reason) p.notices.info(I.reason); else if (I = I.prompt) {
var Q = q();
Q.html(I).find("form").on("submit", g);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", k);
Q.find('input[type="submit"]').addClass("button-primary");
b();
B(r).triggerHandler("resize");
} else p.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function x() {
b();
}
function v(I) {
d = !1;
p.ajax.setNonce("fsConnect", z).post("fsConnect", I, n, x);
return I;
}
var f, a = y, c = null, d = !1, l = !1, p = r.loco, u = y.path.value, C = y.auth.value, z = y["loco-nonce"].value, A = B(a).find("button.button-primary"), E = F.getElementById(a.id + "-warn"), G = !1, H = !1, J = "", O;
p.notices.convert(E).stick();
if (y.connection_type) {
var R = {};
R.connection_type = y.connection_type.value;
l = !0;
} else u && C && v({
path: u,
auth: C
});
b();
return {
applyCreds: function(I) {
if (I.nodeType) h(I); else {
var Q, X = R || {};
for (Q in X) X.hasOwnProperty(Q) && (I[Q] = X[Q]);
}
return this;
},
setForm: function(I) {
y = I;
b();
h(I);
return this;
},
connect: function() {
u = y.path.value;
C = y.auth.value;
v(B(y).serializeArray());
return this;
},
listen: function(I) {
f = I;
l && I(!0);
return this;
},
authed: function() {
return l;
}
};
};
return w;
}({}, L, M));
D.register("27", function(w, r, F) {
function y(b, h) {
return function(g) {
b.apply(g, h);
return g;
};
}
function q(b) {
return function(h, g) {
h = h && h[b] || 0;
g = g && g[b] || 0;
return h === g ? 0 : h > g ? 1 : -1;
};
}
function t(b) {
return function(h, g) {
return (h && h[b] || "").localeCompare(g && g[b] || "");
};
}
function e(b) {
return function(h, g) {
return -1 * b(h, g);
};
}
w.sort = function(b, h, g, k) {
h = "n" === g ? q(h) : t(h);
k && (h = e(h));
return y([].sort, [ h ])(b);
};
return w;
}({}, L, M));
D.register("19", function(w, r, F) {
w.init = function(y) {
function q(a) {
let c = -1;
const d = a.length;
for (B("tr", n).remove(); ++c < d; ) n.appendChild(a[c].$);
}
function t(a) {
b = a ? v.find(a, k) : k.slice(0);
g && (a = m[g], b = f(b, g, a.type, a.desc));
q(b);
}
let e = 0, b, h, g;
const k = [], m = [], n = y.getElementsByTagName("tbody")[0];
var x = y.getElementsByTagName("thead")[0];
const v = D.require("a").init(), f = D.require("27").sort;
y = B('form.loco-filter input[type="text"]', y.parentNode);
x && B("th", x).each(function(a, c) {
const d = c.getAttribute("data-sort-type");
d && (a = e, B(c).addClass("loco-sort").on("click", function(l) {
l.preventDefault();
{
l = a;
let p = m[l], u = p.type, C = !(p.desc = !p.desc);
b = f(b || k.slice(0), l, u, C);
q(b);
h && h.removeClass("loco-desc loco-asc");
h = B(p.$).addClass(C ? "loco-desc" : "loco-asc").removeClass(C ? "loco-asc" : "loco-desc");
g = l;
}
return !1;
}), m[e] = {
$: c,
type: d
});
c.hasAttribute("colspan") ? e += Number(c.getAttribute("colspan")) : e++;
});
n && B("tr", n).each(function(a, c) {
let d, l = [], p = {
_: a,
$: c
}, u = c.getElementsByTagName("td");
for (d in m) {
const C = u[d];
(c = C.textContent.replace(/(^\s+|\s+$)/g, "")) && l.push(c);
C.hasAttribute("data-sort-value") && (c = C.getAttribute("data-sort-value"));
switch (m[d].type) {
case "n":
c = Number(c);
}
p[d] = c;
}
k[a] = p;
v.index(a, l);
});
y.length && (x = y[0], y = B(x.form), 1 < k.length ? D.require("b").listen(x, t) : y.hide(), 
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
if ("2.8.9" === w) return !0;
T.notices.warn("admin.js is the wrong version (" + w + "). Please empty all relevant caches and reload this page.");
return !1;
};
})(window, document, window.jQuery);
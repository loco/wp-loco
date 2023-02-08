"use strict";

(function(K, L, A, ka) {
var B = function() {
function w(C) {
throw Error("Failed to require " + C);
}
var t = {};
return {
register: function(C, x) {
t[C] = x;
},
require: function(C, x) {
return t[C] || w(x);
},
include: function(C, x, r) {
return t[C] || (r ? w(x) : null);
}
};
}();
B.register("$1", function(w, t, C) {
function x(r) {
var v = typeof r;
if ("string" === v) if (/[^ <>!=()%^&|?:n0-9]/.test(r)) console.error("Invalid plural: " + r); else return new Function("n", "return " + r);
"function" !== v && (r = function(e) {
return 1 != e;
});
return r;
}
w.init = function(r) {
function v(p, m, h) {
return (p = n[p]) && p[h] ? p[h] : m || "";
}
function e(p) {
return v(p, p, 0);
}
function a(p, m) {
return v(m + "" + p, p, 0);
}
function k(p, m, h) {
h = Number(r(h));
isNaN(h) && (h = 0);
return v(p, h ? m : p, h);
}
r = x(r);
var n = {};
return {
__: e,
_x: a,
_n: k,
_: e,
x: a,
n: k,
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
}({}, K, L));
B.register("$2", function(w, t, C) {
w.ie = function() {
return !1;
};
w.init = function() {
return w;
};
return w;
}({}, K, L));
B.register("$3", function(w, t, C) {
Number.prototype.format = function(x, r, v) {
var e = Math.pow(10, x || 0);
x = [];
e = String(Math.round(e * this) / e);
var a = e.split(".");
e = a[0];
a = a[1];
let k = e.length;
do {
x.unshift(e.substring(k - 3, k));
} while (0 < (k -= 3));
e = x.join(v || ",");
if (a) {
{
v = a;
x = v.length;
let n;
for (;"0" === v.charAt(--x); ) n = x;
n && (v = v.substring(0, n));
a = v;
}
a && (e += (r || ".") + a);
}
return e;
};
Number.prototype.percent = function(x) {
let r = 0, v = this && x ? this / x * 100 : 0;
if (0 === v) return "0";
if (100 === v) return "100";
if (99 < v) v = Math.min(v, 99.9), x = v.format(++r); else if (.5 > v) {
v = Math.max(v, 1e-4);
do {
x = v.format(++r);
} while ("0" === x && 4 > r);
x = x.substring(1);
} else x = v.format(0);
return x;
};
return w;
}({}, K, L));
B.register("$4", function(w, t, C) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(x) {
if (null == this) throw new TypeError();
var r = Object(this), v = r.length >>> 0;
if (0 === v) return -1;
var e = 0;
1 < arguments.length && (e = Number(arguments[1]), e != e ? e = 0 : 0 != e && Infinity != e && -Infinity != e && (e = (0 < e || -1) * Math.floor(Math.abs(e))));
if (e >= v) return -1;
for (e = 0 <= e ? e : Math.max(v - Math.abs(e), 0); e < v; e++) if (e in r && r[e] === x) return e;
return -1;
});
return w;
}({}, K, L));
B.register("$5", function(w, t, C) {
C = t.JSON;
C || (C = {
parse: A.parseJSON,
stringify: null
}, t.JSON = C);
w.parse = C.parse;
w.stringify = C.stringify;
return w;
}({}, K, L));
B.register("$6", function(w, t, C) {
w.trim = function(x, r) {
for (r || (r = " \n"); x && -1 !== r.indexOf(x.charAt(0)); ) x = x.substring(1);
for (;x && -1 !== r.indexOf(x.slice(-1)); ) x = x.substring(0, x.length - 1);
return x;
};
w.sprintf = function(x) {
return w.vsprintf(x, [].slice.call(arguments, 1));
};
w.vsprintf = function(x, r) {
var v = 0;
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(e, a, k) {
return "%" === k ? "%" : (a ? r[Number(a) - 1] : r[v++]) || "";
});
};
return w;
}({}, K, L));
B.register("$21", function(w, t, C) {
function x(r) {
return function(v, e) {
let a = v[r] || 0;
for (;(v = v.offsetParent) && v !== (e || C.body); ) a += v[r] || 0;
return a;
};
}
w.top = x("offsetTop");
w.left = x("offsetLeft");
w.el = function(r, v) {
r = C.createElement(r || "div");
v && (r.className = v);
return r;
};
w.txt = function(r) {
return C.createTextNode(r || "");
};
return w;
}({}, K, L));
B.register("$7", function(w, t, C) {
function x(c, l, q) {
function u() {
y();
z = setTimeout(l, q);
}
function y() {
z && clearTimeout(z);
z = null;
}
var z;
u();
A(c).on("mouseenter", y).on("mouseleave", u);
return {
die: function() {
y();
A(c).off("mouseenter mouseleave");
}
};
}
function r(c, l) {
c.fadeTo(l, 0, function() {
c.slideUp(l, function() {
c.remove();
A(t).triggerHandler("resize");
});
});
return c;
}
function v(c, l) {
function q(G) {
p[E] = null;
r(A(c), 250);
y && y.die();
var H;
if (H = G) G.stopPropagation(), G.preventDefault(), H = !1;
return H;
}
function u(G) {
y && y.die();
return y = x(c, q, G);
}
var y, z, D = A(c), F = D.find("button");
0 === F.length && (D.addClass("is-dismissible"), F = A('<button type="button" class="notice-dismiss"> </a>').appendTo(D));
F.off("click").on("click", q);
A(t).triggerHandler("resize");
h();
var E = p.length;
p.push(q);
l && (y = u(l));
return {
link: function(G, H) {
var N = H || G;
H = A(c).find("nav");
G = A("<nav></nav>").append(A("<a></a>").attr("href", G).text(N));
z ? (z.push(G.html()), H.html(z.join("<span> | </span>"))) : (z = [ G.html() ], 
A(c).addClass("has-nav").append(G));
return this;
},
stick: function() {
y && y.die();
y = null;
p[E] = null;
return this;
},
slow: function(G) {
u(G || 1e4);
return this;
}
};
}
function e(c, l, q) {
var u = B.require("$21", "dom.js").el;
c = A('<div class="notice notice-' + c + ' loco-notice inline"></div>').prependTo(A("#loco-notices"));
var y = A(u("p"));
q = A(u("span")).text(q);
l = A(u("strong", "has-icon")).text(l + ": ");
y.append(l).append(q).appendTo(c);
return c;
}
function a(c, l, q, u) {
c = e(q, l, c).css("opacity", "0").fadeTo(500, 1);
A(t).triggerHandler("resize");
return v(c, u);
}
function k(c) {
return a(c, f, "warning");
}
function n() {
A("#loco-notices").find("div.notice").each(function(c, l) {
-1 === l.className.indexOf("jshide") && (c = -1 === l.className.indexOf("notice-success") ? null : 5e3, 
v(l, c));
});
}
var p = [], m = t.console || {
log: function() {}
}, h = Date.now || function() {
return new Date().getTime();
}, b, f, d, g;
w.error = function(c) {
return a(c, b, "error");
};
w.warn = k;
w.info = function(c) {
return a(c, d, "info");
};
w.success = function(c) {
return a(c, g, "success", 5e3);
};
w.warning = k;
w.log = function() {
m.log.apply(m, arguments);
};
w.debug = function() {
(m.debug || m.log).apply(m, arguments);
};
w.clear = function() {
for (var c = -1, l, q = p, u = q.length; ++c < u; ) (l = q[c]) && l.call && l();
p = [];
return w;
};
w.create = e;
w.raise = function(c) {
(w[c.type] || w.error).call(w, c.message);
};
w.convert = v;
w.init = function(c) {
b = c._("Error");
f = c._("Warning");
d = c._("Notice");
g = c._("OK");
setTimeout(n, 1e3);
return w;
};
return w;
}({}, K, L));
B.register("$8", function(w, t, C) {
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
function v(f) {
t.console && console.error && console.error('No nonce for "' + f + '"');
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
function k(f, d, g) {
f.append(d, g);
}
function n(f, d, g, c) {
function l(u, y, z) {
if ("abort" !== y) {
var D = h || {
_: function(O) {
return O;
}
}, F = u.status || 0, E = u.responseText || "", G = x(E), H = u.getResponseHeader("Content-Type") || "Unknown type", N = u.getResponseHeader("Content-Length") || E.length;
"success" === y && z ? q.error(z) : (q.error(r(G) + ".\n" + D._("Check console output for debugging information")), 
q.log("Ajax failure for " + f, {
status: F,
error: y,
message: z,
output: E
}), "parsererror" === y && (z = "Response not JSON"), q.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + F + ' "' + (z || D._("Unknown error")) + '" (' + H + " " + N + " bytes)", G, "====" ].join("\n")));
g && g.call && g(u, y, z);
b = u;
}
}
c.url = p;
c.dataType = "json";
const q = B.require("$7", "notices.js").clear();
b = null;
return A.ajax(c).fail(l).done(function(u, y, z) {
const D = u && u.data, F = u && u.notices, E = F && F.length;
!D || u.error ? l(z, y, u && u.error && u.error.message) : d && d(D, y, z);
for (u = -1; ++u < E; ) q.raise(F[u]);
});
}
const p = t.ajaxurl || "/wp-admin/admin-ajax.php";
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
function l(z, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function q(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(l);
z.find("input").each(l);
z.find("select").each(l);
z.find("textarea").each(l);
z.removeClass("disabled loading");
}
const u = A(f), y = u.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(c);
z.find("input").each(c);
z.find("select").each(c);
z.find("textarea").each(c);
z.addClass("disabled loading");
})(u);
return n(f.route.value, function(z, D, F) {
q(u);
d && d(z, D, F);
}, function(z, D, F) {
q(u);
g && g(z, D, F);
}, {
type: f.method,
data: y
});
};
w.post = function(f, d, g, c) {
let l = !0, q = d || {}, u = m[f] || v(f);
t.FormData && q instanceof FormData ? (l = !1, d = k) : d = Array.isArray(q) ? a : e;
d(q, "action", "loco_json");
d(q, "route", f);
d(q, "loco-nonce", u);
return n(f, g, c, {
type: "post",
data: q,
processData: l,
contentType: l ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
w.get = function(f, d, g, c) {
d = d || {};
const l = m[f] || v(f);
d.action = "loco_json";
d.route = f;
d["loco-nonce"] = l;
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
}({}, K, L));
B.register("$22", {
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
ar: 1,
ary: 1,
ckb: 1,
dv: 1,
fa: 1,
he: 1,
nqo: 1,
ps: 1,
ur: 1,
yi: 1
});
B.register("$9", function(w, t, C) {
function x() {}
var r, v = B.require("$22", "rtl.json");
w.init = function() {
return new x();
};
w.cast = function(e) {
return e instanceof x ? e : "string" === typeof e ? w.parse(e) : w.clone(e);
};
w.clone = function(e) {
var a, k = new x();
for (a in e) k[a] = e[a];
return k;
};
w.parse = function(e) {
if (!(r || (r = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(e)) return null;
var a = new x();
a.lang = RegExp.$1.toLowerCase();
if (e = RegExp.$2) a.region = e.toUpperCase();
if (e = RegExp.$3) a.variant = e.toLowerCase();
return a;
};
t = x.prototype;
t.isValid = function() {
return !!this.lang;
};
t.isKnown = function() {
var e = this.lang;
return !(!e || "zxx" === e);
};
t.toString = function(e) {
e = e || "_";
var a, k = this.lang || "zxx";
if (a = this.region) k += e + a;
if (a = this.variant) k += e + a;
return k;
};
t.getIcon = function() {
for (var e = 3, a, k, n = [ "variant", "region", "lang" ], p = []; 0 !== e--; ) if (a = n[e], 
k = this[a]) p.push(a), p.push(a + "-" + k.toLowerCase());
return p.join(" ");
};
t.isRTL = function() {
return !!v[String(this.lang).toLowerCase()];
};
t = null;
return w;
}({}, K, L));
B.register("$23", {
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
B.register("$10", function(w, t, C) {
w.init = function() {
function x(h) {
return n[h] || h;
}
function r(h, b, f) {
let d, g, c = String(h || "").toLowerCase().replace(k, x).split(p), l = c.length;
for (;0 !== l--; ) if ((h = c[l]) && null == f[h]) for (b.push(h), f[h] = !0, d = h.split(m), 
g = d.length; 0 !== g--; ) (h = d[g]) && null == f[h] && (b.push(h), f[h] = !0);
return b;
}
function v(h) {
return r(h, [], {});
}
function e(h) {
let b = [], f = {}, d = h.length;
for (;0 !== d--; ) r(h[d], b, f);
return b;
}
let a = [];
const k = /[^a-z0-9]/g, n = B.require("$23", "flatten.json"), p = /\s+/, m = /[^\d\p{L}]+/u;
return {
split: v,
find: function(h, b) {
{
let f = [], d = -1, g = a, c = g.length, l, q, u, y, z, D = String(h || "").toLowerCase().replace(k, x).split(" "), F = D.length, E = !!b;
a: for (;++d < c; ) if (q = g[d], null != q && (u = q.length)) {
y = 0;
b: for (;y < F; y++) {
z = D[y];
for (h = 0; h < u; h++) if (l = q[h], 0 === l.indexOf(z)) continue b;
continue a;
}
f.push(E ? b[d] : d);
}
b = f;
}
return b;
},
add: function(h, b) {
a[h] = v(b);
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
}({}, K, L));
B.register("$11", function(w, t, C) {
w.listen = function(x, r) {
function v() {
d[n ? "show" : "hide"]();
}
function e(g) {
f && h.setAttribute("size", 2 + g.length);
n = g;
v();
return g;
}
function a() {
p = null;
r(n);
}
function k(g) {
var c = h.value;
b && c === b && (c = "");
c !== n ? (p && clearTimeout(p), e(c), g ? p = setTimeout(a, g) : a()) : p && null == g && (clearTimeout(p), 
a());
}
var n, p, m = 150, h = x instanceof jQuery ? x[0] : x, b = t.attachEvent && h.getAttribute("placeholder"), f = 1 === Number(h.size), d = A('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
h.value = "";
k();
return !1;
});
e(h.value);
A(h).on("input", function() {
k(m);
return !0;
}).on("blur focus change", function() {
k(null);
return !0;
}).after(d);
v();
return {
delay: function(g) {
m = g;
return this;
},
ping: function(g) {
g ? (p && clearTimeout(p), g = h.value, b && g === b && (g = ""), e(g), a(), g = void 0) : g = k();
return g;
},
val: function(g) {
if (null == g) return n;
p && clearTimeout(p);
h.value = e(g);
v();
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
}({}, K, L));
B.register("$12", function(w, t, C) {
function x(a, k) {
return "function" == typeof a ? a.call(k) : a;
}
function r(a, k) {
this.$element = A(a);
this.options = k;
this.enabled = !0;
this.fixTitle();
}
w.init = function(a, k) {
var n = {
fade: !0,
offset: 5,
delayIn: v,
delayOut: e,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
k && (n = A.extend({}, n, k));
a.tipsy(n);
};
w.delays = function(a, k) {
v = a || 150;
e = k || 100;
};
w.kill = function() {
A("div.tipsy").remove();
};
w.text = function(a, k) {
k.data("tipsy").setTitle(a);
};
var v, e;
w.delays();
A(C.body).on("overlayOpened overlayClosing", function(a) {
w.kill();
return !0;
});
r.prototype = {
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
var n = k[0].offsetWidth, p = k[0].offsetHeight, m = x(this.options.gravity, this.$element[0]);
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
k.css(h).addClass("tipsy-" + m);
k.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + m.charAt(0);
this.options.className && k.addClass(x(this.options.className, this.$element[0]));
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
var a, k = this.$element, n = this.options;
this.fixTitle();
"string" == typeof n.title ? a = k.attr("title" == n.title ? "original-title" : n.title) : "function" == typeof n.title && (a = n.title.call(k[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || n.fallback;
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
function k(b) {
var f = A.data(b, "tipsy");
f || (f = new r(b, A.fn.tipsy.elementOptions(b, a)), A.data(b, "tipsy", f));
return f;
}
function n() {
var b = k(this), f = a.delayIn;
b.hoverState = "in";
0 == f ? b.show() : (b.fixTitle(), setTimeout(function() {
"in" == b.hoverState && b.show();
}, f));
}
function p() {
var b = k(this), f = a.delayOut;
b.hoverState = "out";
0 == f ? b.hide() : (b.tip().removeClass("in"), setTimeout(function() {
"out" == b.hoverState && b.hide();
}, f));
}
a = A.extend({}, A.fn.tipsy.defaults, a);
a.live || this.each(function() {
k(this);
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
A.fn.tipsy.elementOptions = function(a, k) {
return A.metadata ? A.extend({}, k, A(a).metadata()) : k;
};
A.fn.tipsy.autoNS = function() {
return A(this).offset().top > A(C).scrollTop() + A(t).height() / 2 ? "s" : "n";
};
A.fn.tipsy.autoWE = function() {
return A(this).offset().left > A(C).scrollLeft() + A(t).width() / 2 ? "e" : "w";
};
A.fn.tipsy.autoBounds = function(a, k) {
return function() {
var n = k[0], p = 1 < k.length ? k[1] : !1, m = A(C).scrollTop() + a, h = A(C).scrollLeft() + a, b = A(this);
b.offset().top < m && (n = "n");
b.offset().left < h && (p = "w");
A(t).width() + A(C).scrollLeft() - b.offset().left < a && (p = "e");
A(t).height() + A(C).scrollTop() - b.offset().top < a && (n = "s");
return n + (p ? p : "");
};
};
return w;
}({}, K, L));
B.register("$36", function(w, t, C) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return B.require("$6", "string.js").trim(this, " \n\r\t");
});
w.html = function() {
function x(p) {
return "&#" + p.charCodeAt(0) + ";";
}
function r(p, m) {
return '<a href="' + p + '" target="' + (m.indexOf(k) ? "_blank" : "_top") + '">' + m + "</a>";
}
let v, e, a, k, n = function() {
v = /[<>&]/g;
e = /(\r\n|\n|\r)/g;
a = /(?:https?):\/\/(\S+)/gi;
k = location.hostname;
n = null;
};
return function(p, m) {
n && n();
p = p.replace(v, x);
m && (p = p.replace(a, r).replace(e, "<br />"));
return p;
};
}();
return w;
}({}, K, L));
B.register("$37", function(w, t, C) {
function x() {}
var r, v, e = B.require("$22", "rtl.json");
w.init = function() {
return new x();
};
w.cast = function(a) {
return a instanceof x ? a : "string" === typeof a ? w.parse(a) : w.clone(a);
};
w.clone = function(a) {
var k, n = new x();
for (k in a) n[k] = a[k];
return n;
};
w.parse = function(a) {
r || (v = /[-_+]/, r = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(v).join("-");
if (!r.exec(a)) return null;
var k = new x();
k.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) k.script = a.charAt(0).toUpperCase() + a.substring(1).toLowerCase();
if (a = RegExp.$3) k.region = a.toUpperCase();
if (a = RegExp.$4) k.variant = a.toLowerCase();
if (a = RegExp.$5) k.extension = a;
return k;
};
t = x.prototype;
t.isValid = function() {
return !!this.lang;
};
t.isKnown = function() {
var a = this.lang;
return !(!a || "zxx" === a);
};
t.toString = function(a) {
a = a || "-";
var k, n = this.lang || "zxx";
if (k = this.script) n += a + k;
if (k = this.region) n += a + k;
if (k = this.variant) n += a + k;
if (k = this.extension) n += a + k;
return n;
};
t.getIcon = function() {
for (var a = 4, k, n, p = [ "variant", "region", "script", "lang" ], m = []; 0 !== a--; ) if (k = p[a], 
n = this[k]) n.join && (n = n.join("-")), 1 === a && 3 === n.length ? m.push("region-m49") : m = m.concat([ k, k + "-" + n.toLowerCase() ]);
return m.join(" ");
};
t.isRTL = function() {
return !!e[String(this.script || this.lang).toLowerCase()];
};
t = null;
return w;
}({}, K, L));
B.register("$38", function(w, t, C) {
function x(a) {
t.console && console.error && console.error(a);
}
function r() {
x("Method not implemented");
}
function v() {}
function e(a) {}
v.prototype.toString = function() {
return "[Undefined]";
};
e.prototype._validate = function(a) {
let k, n, p = !0;
for (k in this) n = this[k], n === r ? (x(a + "." + k + "() must be implemented"), 
p = !1) : n instanceof v && (x(a + "." + k + " must be defined"), p = !1);
return p;
};
w.init = function(a, k) {
const n = new e();
if (a) {
let p = a.length;
for (;0 !== p--; ) n[a[p]] = r;
}
if (k) for (a = k.length; 0 !== a--; ) n[k[a]] = new v();
return n;
};
w.validate = function(a) {
const k = /function (\w+)\(/.exec(a.toString());
a.prototype._validate(k && k[1] || "Object");
};
return w;
}({}, K, L));
B.register("$49", function(w, t, C) {
let x = 0, r = t.requestAnimationFrame, v = t.cancelAnimationFrame;
if (!r || !v) for (const a in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (r = t[a + "RequestAnimationFrame"]) if (v = t[a + "CancelAnimationFrame"] || t[a + "CancelRequestAnimationFrame"]) break;
r && v || (r = function(a) {
var k = e();
const n = Math.max(0, 16 - (k - x)), p = k + n;
k = t.setTimeout(function() {
a(p);
}, n);
x = p;
return k;
}, v = function(a) {
clearTimeout(a);
});
const e = Date.now || function() {
return new Date().getTime();
};
w.loop = function(a, k) {
function n() {
m = r(n, k);
a(p++);
}
let p = 0, m;
n();
return {
stop: function() {
m && v(m);
m = null;
}
};
};
return w;
}({}, K, L));
B.register("$46", function(w, t, C) {
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
let v;
const e = !!t.navigator.msPointerEnabled, a = e ? "MSPointerDown" : "touchstart", k = e ? "MSPointerMove" : "touchmove", n = e ? "MSPointerUp" : "touchend";
w.ok = function(h) {
null == v && (v = "function" === typeof C.body.addEventListener);
v && h && h(w);
return v;
};
w.ms = function() {
return e;
};
w.dragger = function(h, b) {
function f(l) {
h.addEventListener(l, g[l], !1);
}
function d(l) {
h.removeEventListener(l, g[l], !1);
}
const g = {};
g[a] = function(l) {
p(l, function(q, u) {
u.type = a;
b(l, u, c);
});
f(k);
f(n);
return !0;
};
g[n] = function(l) {
d(k);
d(n);
p(l, function(q, u) {
u.type = n;
b(l, u, c);
});
return !0;
};
g[k] = function(l) {
p(l, function(q, u) {
u.type = k;
b(l, u, c);
});
return r(l);
};
f(a);
let c = {
kill: function() {
d(a);
d(k);
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
l && l.stop();
l = null;
}
let l, q, u, y = {}, z = [], D = [], F = [];
y[a] = function(E) {
q = !1;
c();
const G = m();
p(E, function(H, N) {
z[H] = G;
D[H] = N.clientX;
F[H] = N.clientY;
});
u = h.scrollLeft;
return !0;
};
y[n] = function(E) {
p(E, function(G, H) {
const N = m() - z[G];
G = D[G] - H.clientX;
b(Math.abs(G) / N, G ? 0 > G ? -1 : 1 : 0);
});
u = null;
return !0;
};
y[k] = function(E) {
let G, H;
null == u || p(E, function(N, O) {
G = D[N] - O.clientX;
H = F[N] - O.clientY;
});
if (H && Math.abs(H) > Math.abs(G)) return q = !0;
G && (q = !0, h.scrollLeft = Math.max(0, u + G));
return r(E);
};
if (!e || f) d(a), d(k), d(n), e && (h.className += " mstouch");
return {
kill: function() {
g(a);
g(k);
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
return l = B.require("$49", "fps.js").loop(function(Q) {
Q && (N = Math.max(0, S(E, N + I)), h.scrollLeft = N, E === N && (c(), H && H(N)));
}, h);
}
};
};
w.start = function(h, b) {
return x(h, a, b, !1);
};
w.move = function(h, b) {
return x(h, k, b, !1);
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
}({}, K, L));
B.register("$50", function(w, t, C) {
w.init = function(x) {
function r() {
k.style.top = String(-x.scrollTop) + "px";
return !0;
}
function v() {
var p = k;
p.textContent = x.value;
p.innerHTML = p.innerHTML.replace(/[ \t]/g, e).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function e(p) {
return '<span class="x' + p.charCodeAt(0).toString(16) + '">' + p + "</span>";
}
var a = x.parentNode, k = a.insertBefore(C.createElement("div"), x);
A(x).on("input", v).on("scroll", r);
A(a).addClass("has-mirror");
k.className = "ta-mirror";
var n = x.offsetWidth - x.clientWidth;
2 < n && (k.style.marginRight = String(n - 2) + "px");
v();
r();
return {
kill: function() {
A(x).off("input", v).off("scroll", r);
a.removeChild(k);
k = null;
A(a).removeClass("has-mirror");
}
};
};
return w;
}({}, K, L));
B.register("$29", function(w, t, C) {
function x(e, a) {
e = r[e] || [];
a = a && t[a];
const k = e.length;
let n = -1, p = 0;
for (;++n < k; ) {
const m = e[n];
"function" === typeof m && (m(a), p++);
}
return p;
}
const r = {};
let v = "";
w.load = function(e, a, k) {
function n() {
h && (clearTimeout(h), h = null);
b && (b.onreadystatechange = null, b = b = b.onload = null);
e && (delete r[e], e = null);
}
function p(f, d) {
f = b && b.readyState;
if (d || !f || "loaded" === f || "complete" === f) d || x(e, k), n();
}
function m() {
if (0 === x(e)) throw Error('Failed to load "' + (k || e) + '"');
n();
}
if (k && t[k]) "function" === typeof a && a(t[k]); else if (null != r[e]) r[e].push(a); else {
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
if (!(a = v)) {
{
a = C.getElementsByTagName("script");
const k = a.length;
let n = -1, p = "";
for (;++n < k; ) {
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
a = v = a;
}
return a + e;
};
return w;
}({}, K, L));
B.register("$16", function(w, t, C) {
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
function v(m) {
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
}, b = k(m);
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
function k(m) {
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
var f, d = !1, g = b || p, c = m.parentNode, l = c.appendChild(C.createElement("div"));
A(c).addClass("has-proxy has-ace");
B.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(q) {
if (l) {
if (!q) throw Error("Failed to load code editor");
f = q.edit(l);
var u = f.session, y = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(d);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
u.setUseSoftTabs(!1);
y.setShowGutter(!0);
y.setPadding(10);
y.setScrollMargin(8);
u.setMode(e(q, g));
f.setValue(m.value, -1);
u.setUseWrapMode(!0);
h ? x(f, h) : v(f);
}
}, "ace");
return {
kill: function() {
f && (r(f), f.destroy(), f = null);
l && (c.removeChild(l), A(c).removeClass("has-proxy has-ace"), l = null);
return this;
},
disable: function() {
f && v(f);
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
q !== g && (g = q, f && f.session.setMode(e(t.ace, q)));
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
}({}, K, L));
B.register("$51", function(w, t, C) {
function x(a, k) {
function n() {
return k.val(a.getContent());
}
a.on("input", n);
a.on("change", n);
a.on("focus", function() {
return k.focus();
});
a.on("blur", function() {
return k.blur();
});
a.setMode("design");
}
function r(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function v(a) {
r(a);
a.setMode("readonly");
}
var e = 0;
w.load = function(a) {
var k = B.require("$29", "remote.js");
k.load(k.stat("/lib/tinymce.min.js"), a, "tinymce");
return w;
};
w.init = function(a, k) {
function n(q) {
b = q;
f = "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4);
return q.replace(/(<\/?)script/gi, "$1loco:script");
}
function p(q) {
m = q;
q._getContent = q.getContent;
q.getContent = function(u) {
u = this._getContent(u);
u = u.replace(/(<\/?)loco:script/gi, "$1script");
if (!f && "<p>" === u.substring(0, 3) && "</p>" === u.substring(u.length - 4)) {
var y = u.substring(3, u.length - 4);
if (y === b || -1 === y.indexOf("</p>")) u = y;
}
return u;
};
q._setContent = q.setContent;
q.setContent = function(u, y) {
return this._setContent(n(u), y);
};
k ? (x(q, k), k.reset()) : v(q);
A(c).removeClass("loading");
}
var m, h = !1, b = "", f = !1, d = a.parentNode, g = d.parentNode, c = d.appendChild(C.createElement("div")), l = g.insertBefore(C.createElement("nav"), d);
l.id = "_tb" + String(++e);
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
fixed_toolbar_container: "#" + l.id,
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
k && k.val(q);
return this;
},
kill: function() {
m && (k && k.val(m.getContent()), r(m), m.destroy(), m = null);
c && (d.removeChild(c), A(d).removeClass("has-proxy has-mce"), c = null);
l && (g.removeChild(l), l = null);
return this;
},
enable: function(q) {
k = q;
m && x(m, q);
return this;
},
disable: function() {
m && v(m);
k = null;
return this;
},
focus: function() {
m && k && m.focus();
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
}({}, K, L));
B.register("$47", function(w, t, C) {
function x(e) {
function a() {
h && (b.off("input", k), h = !1);
}
function k() {
var c = e.value;
c !== d && (b.trigger("changing", [ c, d ]), d = c);
}
function n() {
k();
h && g !== d && b.trigger("changed", [ d ]);
}
function p() {
v = e;
g = d;
h || (b.on("input", k), h = !0);
b.trigger("editFocus");
f.addClass("has-focus");
return !0;
}
function m() {
v === e && (v = null);
b.trigger("editBlur");
f.removeClass("has-focus");
h && (n(), a());
return !0;
}
var h = !1, b = A(e), f = A(e.parentNode), d = e.value, g;
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
k();
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
var v;
w._new = function(e) {
return new r(e);
};
w.init = function(e) {
var a = new r(e);
e.disabled ? (e.removeAttribute("disabled"), a.disable()) : e.readOnly ? a.disable() : a.enable();
return a;
};
t = r.prototype;
t.destroy = function() {
this.unlisten();
var e = this.p;
e && (e.kill(), this.p = null);
this.e = null;
};
t.reload = function(e, a) {
var k = this.l;
k && !a && (this.disable(), k = null);
this.val(e || "");
a && !k && this.enable();
return this;
};
t.val = function(e) {
var a = this.e;
if (null == e) return a.value;
var k = this.l, n = this.p;
n && n.val(e);
k && k.val(e);
k || a.value === e || (a.value = e, A(a).triggerHandler("input"));
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
var e = this.p;
e ? e.focus() : A(this.e).focus();
};
t.focused = function() {
return v && v === this.el;
};
t.parent = function() {
return this.e.parentNode;
};
t.attr = function(e, a) {
var k = this.e;
if (1 === arguments.length) return k.getAttribute(e);
null == a ? k.removeAttribute(e) : k.setAttribute(e, a);
return this;
};
t.editable = function() {
return !!this.l;
};
t.enable = function() {
var e = this.p;
this.e.removeAttribute("readonly");
this.listen();
e && e.enable && e.enable(this.l);
return this;
};
t.disable = function() {
var e = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
e && e.disable && e.disable();
return this;
};
t.listen = function() {
var e = this.l;
e && e.kill();
this.l = x(this.e);
return this;
};
t.unlisten = function() {
var e = this.l;
e && (e.kill(), this.l = null);
return this;
};
t.setInvs = function(e, a) {
var k = this.i || !1;
if (a || k !== e) this._i && (this._i.kill(), delete this._i), (a = this.p) ? a.invs && a.invs(e) : e && (this._i = B.require("$50", "mirror.js").init(this.e)), 
this.i = e;
return this;
};
t.getInvs = function() {
return this.i || !1;
};
t.setMode = function(e) {
var a = this.p, k = this.i || !1;
e !== (this.m || "") && (this.m = e, a && a.kill(), this.p = a = "code" === e ? B.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === e ? B.require("$51", "mce.js").init(this.e, this.l) : null, 
this.setInvs(k, !0), v && this.focus());
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
var e = this.p;
e && e.resize && e.resize();
};
t = null;
return w;
}({}, K, L));
B.register("$48", function(w, t, C) {
function x(d) {
const g = t.console;
g && g.error && g.error(d);
}
function r(d) {
const g = C.createElement("div");
d && g.setAttribute("class", d);
return g;
}
function v(d) {
return function() {
d.resize();
return this;
};
}
function e(d) {
return function(g) {
let c = g.target, l = c.$index;
for (;null == l && "DIV" !== c.nodeName && (c = c.parentElement); ) l = c.$index;
null != l && (g.stopImmediatePropagation(), d.select(l));
return !0;
};
}
function a(d) {
return function() {
d.redrawDirty() && d.redraw();
return !0;
};
}
function k(d) {
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
function l(q) {
x("row[" + q + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(q) {
const u = g || 0, y = c ? -1 : 1, z = d.rows || [];
q.sort(function(D, F) {
return y * (z[D] || l(D)).cellVal(u).localeCompare((z[F] || l(F)).cellVal(u));
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
let l = C.createElement("div");
l.className = c || "";
this._ = l;
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
var l = g.splity(c + "-thead", c + "-tbody"), q = l[0];
l = l[1];
let u = [], y = [], z = [], D = [];
if (d) this.ds = d, this.idxs = y, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
q.css.push("wg-thead");
l.css.push("wg-tbody");
d.eachCol(function(O, S, I) {
z[O] = c + "-col-" + S;
D[O] = I || S;
});
var F = r();
let E = -1, G = z.length, H = r("wg-cols"), N = q.splitx.apply(q, z);
for (;++E < G; ) N[E].header(D[E]), H.appendChild(F.cloneNode(!1)).setAttribute("for", z[E]);
d.eachRow(function(O, S, I) {
u[O] = new h(O, S, I);
y[O] = O;
});
this.rows = u;
this.cols = H;
this.ww = null;
this.root = F = l.body;
this.head = q;
q.redraw = v(this);
q = l.fixed = N[0].bodyY() || 20;
g.lock().resize(q, l);
g.css.push("is-table");
g.restyle();
this.sc ? this._re_sort(G) : d.sort && d.sort(y);
this.redrawDirty();
this.render();
A(F).attr("tabindex", "-1").on("keydown", k(this)).on("mousedown", e(this)).on("scroll", a(this));
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
let d, g = [], c = this.rows || [], l = -1, q, u = this.idxs, y = u.length, z = this.idxr = {}, D = this.r, F = this._r, E = this.root, G = this.cols;
for (;++l < y; ) {
if (0 === l % 100) {
var H = G.cloneNode(!0);
d = new b(H);
d.h = 2200;
d.insert(E);
g.push(d);
}
q = u[l];
z[q] = l;
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
let l = c.cells[0], q = l.body.childNodes, u = q.length, y = this.pages || [], z = y.length;
for (c.redraw.call(l); ++d < u; ) g[d] = q[d].style.width;
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
let d = 0, g = -1, c = null, l = null, q = this.ww;
var u = this.sy;
let y = this.mn, z = this.mx, D = Math.max(0, u - 100);
u = this.vh + u + 100;
let F, E = this.pages || [], G = E.length;
for (;++g < G && !(d > u); ) F = E[g], d += F.height(), d < D || (null === c && (c = g), 
l = g, F.rendered || F.render(q));
if (y !== c) {
if (null !== y && c > y) for (g = y; g < c; g++) {
F = E[g];
if (!F) throw Error("Shit!");
F.rendered && F.sleep();
}
this.mn = c;
}
if (z !== l) {
if (null !== z && l < z) for (g = z; g > l; g--) F = E[g], F.rendered && F.sleep();
this.mx = l;
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
const l = this.idxs, q = l.length;
let u = c = (this.idxr || {})[c];
for (;c !== (u += d) && !(0 <= u && q > u); ) if (g && q) u = 1 === d ? -1 : q, 
g = !1; else return null;
c = l[u];
return null == c || null == this.rows[c] ? (x("Bad next: [" + u + "] does not map to data row"), 
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
var l = c && c.page;
if (!l) return this.deselect(!1), x("Row is filtered out"), this;
this.deselect(!0);
let q, u = this.w.cells[1];
l.rendered || (q = l.top(), u.scrollY(q), this.redrawDirty() && this.redraw());
if (!c.rendered) return l.rendered || x("Failed to render page"), x("Row [" + c.i + "] not rendered"), 
this;
l = c.cells();
A(l).addClass("selected");
this.r = d;
g || (q = u.scrollY(), A(this.root).focus(), q !== u.scrollY() && u.scrollY(q));
u.scrollTo(l[0], !0);
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
const l = this.rows || [], q = this.idxs || [], u = q.length;
for (;++c < u; ) g = q[c], d(l[g], c, g);
return this;
};
f.sortable = function(d) {
const g = this.sc || (this.sc = new m(this));
g.has(d) || g.add(d);
return this;
};
f._re_sort = function(d) {
let g = -1, c = this.sc, l = c.active;
for (this.sc = c = new m(this); ++g < d; ) c.add(g);
l && (g = this.head.indexOf(l.id), -1 === g && (g = Math.min(l.idx, d - 1)), this.sort(g, l.desc));
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
c.addClass("wg-sortable").on("click", function(l) {
if ("header" === l.target.nodeName.toLowerCase()) return l.stopImmediatePropagation(), 
g.toggle(d), !1;
});
return g;
};
f.toggle = function(d) {
this.t.sort(d, !this[d].desc).clear().render();
return this;
};
f.activate = function(d, g) {
let c, l = this.active, q = this[d], u = this.t.head.cells;
l && (c = u[l.idx]) && (c.removeClass(l.css), l !== q && c.restyle());
(c = u[d]) ? (q.desc = g, this.active = q, d = "wg-" + (g ? "desc" : "asc"), c.addClass(d).restyle(), 
q.css = d) : this.active = null;
return this;
};
f = null;
f = h.prototype;
f.render = function(d) {
let g, c = [], l = this._, q = this.length;
if (l) {
for (this.c = c; 0 !== q--; ) g = l.cloneNode(!1), c[q] = this.update(q, g), g.$index = this.i, 
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
let g, c = -1, l = this.rows, q = l.length;
const u = this.dead, y = this.live, z = y.childNodes;
for (;++c < q; ) g = l[c], g.rendered || g.render(z);
q = d.length;
for (c = 0; c < q; c++) z[c].style.width = d[c];
u.parentNode.replaceChild(y, u);
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
}({}, K, L));
B.register("$39", function(w, t, C) {
function x(c, l) {
var q = c.id;
let u = q && f[q], y = u && u.parent();
if (!u || !y) return null;
var z = 1 === y.dir;
q = z ? "X" : "Y";
let D = "page" + q;
z = z ? b : h;
let F = z(y.el);
q = l["offset" + q];
let E = y.el, G = E.className;
null == q && (q = l[D] - z(c));
q && (F += q);
E.className = G + " is-resizing";
return {
done: function() {
E.className = G;
},
move: function(H) {
y.resize(H[D] - F, u);
return !0;
}
};
}
function r(c) {
function l() {
A(C).off("mousemove", q);
g && (g.done(), g = null);
return !0;
}
function q(u) {
g ? g.move(u) : l();
return !0;
}
if (g) return !0;
g = x(c.target, c);
if (!g) return !0;
A(C).one("mouseup", l).on("mousemove", q);
return e(c);
}
function v(c, l) {
const q = l.type;
"touchmove" === q ? g && g.move(l) : "touchstart" === q ? g = x(c.target, l) : "touchend" === q && g && (g.done(), 
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
function k(c, l) {
const q = A(l);
q.on("editFocus", function() {
q.trigger("wgFocus", [ a(c) ]);
}).on("editBlur", function() {
q.trigger("wgBlur", [ a(null) ]);
});
}
function n(c) {
const l = c.id, q = c.className;
this.id = l;
this.el = c;
this.pos = this.index = 0;
this.css = [ q || "wg-root", "wg-cell" ];
this._cn = q;
f[l] = this;
this.clear();
}
const p = B.include("$45", "html.js") || B.include("$2", "html.js", !0), m = B.require("$21", "dom.js"), h = m.top, b = m.left, f = {};
let d, g = !1;
w.init = function(c) {
const l = new n(c);
l.redraw();
B.require("$46", "touch.js").ok(function(q) {
q.dragger(c, v);
});
A(c).on("mousedown", r);
return l;
};
t = n.prototype;
t.fire = function(c, l) {
c = A.Event(c);
c.cell = this;
A(this.el).trigger(c, l);
return this;
};
t.each = function(c) {
let l = -1;
const q = this.cells, u = q.length;
for (;++l < u; ) c(q[l], l);
return this;
};
t.indexOf = function(c) {
return (c = f[c.id || String(c)]) && c.pid === this.id ? c.index : -1;
};
t.on = function() {
return this.$("on", arguments);
};
t.off = function() {
return this.$("off", arguments);
};
t.find = function(c) {
return A(this.el).find(c);
};
t.$ = function(c, l) {
A.fn[c].apply(A(this.el), l);
return this;
};
t.addClass = function(c) {
this.css.push(c);
return this;
};
t.removeClass = function(c) {
c = this.css.indexOf(c);
-1 !== c && this.css.splice(c, 1);
return this;
};
t.parent = function() {
return this.pid && f[this.pid];
};
t.splitx = function() {
return this._split(1, arguments);
};
t.splity = function() {
return this._split(2, arguments);
};
t._split = function(c, l) {
(this.length || this.field) && this.clear();
let q = -1;
let u = l.length, y = 1 / u, z = 0;
for (;++q < u; ) {
var D = m.el();
this.body.appendChild(D);
var F = D;
{
var E = l[q];
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
t.destroy = function() {
this.clear();
delete f[this.id];
const c = this.el;
c.innerHTML = "";
this.body = null;
c.className = this._cn || "";
A(c).off();
return this;
};
t.exists = function() {
return this === f[this.id];
};
t.clear = function() {
const c = this.el, l = this.cells, q = this.field, u = this.body, y = this.nav;
let z = this.length || 0;
for (;0 !== z--; ) delete f[l[z].destroy().id];
this.cells = [];
this.length = 0;
y && (c.removeChild(y), this.nav = null);
u && (q && (q.destroy(), this.field = null), this.table && (this.table = null), 
c === u.parentNode && c.removeChild(u));
this.body = c.appendChild(m.el("", "wg-body"));
this._h = null;
return this;
};
t.resize = function(c, l) {
if (!l && (l = this.cells[1], !l)) return;
var q = l.index;
let u = this.cells, y = A(this.el)[1 === this.dir ? "width" : "height"](), z = u[q + 1];
q = u[q - 1];
l.pos = Math.min((z ? z.pos * y : y) - ((l.body || l.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * y : 0, c)) / y;
this.redraw();
return this;
};
t.distribute = function(c) {
let l = -1, q = 0, u;
const y = this.cells, z = c.length;
for (;++l < z && (u = y[++q]); ) u.pos = Math.max(0, Math.min(1, c[l]));
this.redraw();
return this;
};
t.distribution = function() {
let c = [], l = 0;
const q = this.cells, u = q.length - 1;
for (;l < u; ) c[l] = q[++l].pos;
return c;
};
t.restyle = function() {
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
t.redraw = function(c) {
this.restyle();
const l = this.el;
var q = this.body, u = this.field;
if (q) {
var y = l.clientWidth || 0, z = l.clientHeight || 0, D = q.offsetTop || 0;
z = D > z ? 0 : z - D;
if (this._h !== z) {
this._h = z;
q.style.height = String(z) + "px";
var F = u;
}
this._w !== y && (this._w = y, F = u);
F && F.redraw();
}
q = this.length;
y = 1;
z = this.nav;
for (D = 2 === this.dir ? "height" : "width"; 0 !== q--; ) u = this.cells[q], z ? F = 1 : (u.fixed && (u.pos = u.fixed / A(l)[D]()), 
F = y - u.pos, y = u.pos), u.el.style[D] = String(100 * F) + "%", u.redraw(c);
return this;
};
t.contents = function(c, l) {
const q = this.el;
let u = this.body;
if (null == c) return u.innerHTML;
this.length ? this.clear() : u && (q.removeChild(u), u = null);
u || (this.body = u = q.appendChild(m.el("", l || "wg-content")), this._h = null, 
(l = this.lang) && this._locale(l, this.rtl, !0));
"string" === typeof c ? A(u)._html(c) : c && this.append(c);
this.redraw();
return this;
};
t.textarea = function(c, l) {
let q = this.field;
if (q) {
var u = q.editable();
q.reload(c, l);
u !== l && this.restyle();
} else this.length && this.clear(), u = m.el("textarea"), u.setAttribute("wrap", "virtual"), 
u.value = c, this.contents(u), q = B.require("$47", "field.js")._new(u)[l ? "enable" : "disable"](), 
k(this, u), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
t.locale = function(c) {
c = B.require("$37", "locale.js").cast(c);
return this._locale(String(c), c.isRTL());
};
t._locale = function(c, l, q) {
const u = this.body;
if (q || c !== this.lang) this.lang = c, u && u.setAttribute("lang", c);
if (q || l !== this.rtl) this.rtl = l, u && u.setAttribute("dir", l ? "RTL" : "LTR");
return this;
};
t.editable = function() {
let c = this.field;
if (c) return c.editable() ? c : null;
let l = this.cells, q = l.length, u = this.navigated();
if (null != u) return l[u].editable();
for (;++u < q; ) if (c = l[u].editable()) return c;
};
t.eachTextarea = function(c) {
const l = this.field;
l ? c(l) : this.each(function(q) {
q.eachTextarea(c);
});
return this;
};
t.append = function(c) {
c && (c.nodeType ? p.init(this.body.appendChild(c)) : p.init(A(c).appendTo(this.body)));
return this;
};
t.prepend = function(c) {
const l = this.body;
if (c.nodeType) {
const q = l.firstChild;
p.init(q ? l.insertBefore(c, q) : l.appendChild(c));
} else p.init(A(c).prependTo(l));
return this;
};
t.before = function(c) {
const l = this.body;
c.nodeType ? p.init(this.el.insertBefore(c, l)) : p.init(A(c).insertBefore(l));
return this;
};
t.header = function(c, l) {
if (null == c && null == l) return this.el.getElementsByTagName("header")[0];
this.t = m.txt(c || "");
this.el.insertBefore(m.el("header", l), this.body).appendChild(this.t);
this.redraw();
return this;
};
t.title = function(c) {
const l = this.t;
if (l) return l.nodeValue = c || "", l;
this.header(c);
return this.t;
};
t.titled = function() {
return this.t && this.t.nodeValue;
};
t.bodyY = function() {
return h(this.body, this.el);
};
t.scrollY = function(c) {
if (ka === c) return this.body.scrollTop;
this.body.scrollTop = c;
};
t.tabulate = function(c) {
let l = this.table;
l ? l.clear() : l = B.require("$48", "wgtable.js").create(this);
l.init(c);
return this.table = l;
};
t.lock = function() {
this.body.className += " locked";
return this;
};
t.scrollTo = function(c, l) {
let q = this.body;
var u = q.scrollTop;
let y = h(c, q);
if (u > y) u = y; else {
const z = q.clientHeight;
c = y + A(c).outerHeight();
if (z + u < c) u = c - z; else return;
}
l ? q.scrollTop = u : A(q).stop(!0).animate({
scrollTop: u
}, 250);
};
t.navigize = function(c, l) {
function q(G) {
const H = z[G], N = y[G], O = A(H.el).show();
N.addClass("active");
F = G;
E.data("idx", G);
H.fire("wgTabSelect", [ G ]);
return O;
}
const u = this, y = [], z = u.cells;
let D = u.nav, F;
D && u.el.removeChild(D);
D = u.nav = u.el.insertBefore(m.el("nav", "wg-tabs"), u.body);
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
u.redraw();
return e(G);
});
null == l && (l = E.data("idx") || 0);
u.each(function(G, H) {
y[H] = A('<a href="#' + G.id + '"></a>').data("idx", H).text(c[H]).appendTo(E);
G.pos = 0;
A(G.el).hide();
});
q(z[l] ? l : 0);
u.lock();
u.redraw();
return u;
};
t.navigated = function() {
const c = this.nav;
if (c) return A(c).data("idx");
};
t = null;
return w;
}({}, K, L));
B.register("$24", function(w, t, C) {
function x(b) {
const f = [];
b && (b.saved() || f.push("po-unsaved"), b.fuzzy() ? f.push("po-fuzzy") : b.flagged() && f.push("po-flagged"), 
b.valid() || f.push("po-error"), b.translation() || f.push("po-empty"), b.comment() && f.push("po-comment"));
return f.join(" ");
}
function r(b, f, d) {
f = A(b.title(f).parentNode);
let g = f.find("span.lang");
d ? (d = B.require("$37", "locale.js").cast(d), g.length || (g = A("<span></span>").prependTo(f)), 
g.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (g.remove(), 
d = "en");
b.locale(d);
return f;
}
function v(b, f, d) {
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
const a = B.require("$36", "string.js").html, k = B.require("$6", "string.js").sprintf;
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
let h = e.prototype = B.require("$38", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
const d = B.require("$39", "wingrid.js").init(b);
A(t).on("resize", f);
this.redraw = f;
A(b).on("wgFocus wgBlur", function(g, c) {
g.stopPropagation();
n = c;
});
this.destroy = function() {
d.destroy();
A(t).off("resize", f);
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
let l = g.selected(), q = l, u;
for (;null != (l = g.next(b, d, l)); ) {
if (q === l) {
l = null;
break;
}
if (f && (u = c.row(l), u.translated(0))) continue;
break;
}
null != l && g.select(l, !0);
return l;
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
let g, c = this.lastFound, l = this.lastSearch;
if (b) {
if (l === b) return c || 0;
if (l && !c && 0 === b.indexOf(l)) return 0;
g = this.dict.find(b);
}
this.lastSearch = l = b;
this.lastFound = c = g ? g.length : this.po.length;
g ? d.filter(g) : d.unfilter();
f || this.fire("poFilter", [ l, c ]);
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
const c = g && g.isRTL(), l = d && d.length || 0;
if (!d || !d.row) return f && f.clear().header("Error").contents("Invalid messages list"), 
!1;
b.targetLocale = g;
b.lastSearch && (b.lastSearch = "", b.lastFound = l, b.fire("poFilter", [ "", l ]));
let q;
(g = b.listTable) && (q = g.thead().distribution());
b.listTable = g = f.tabulate({
eachCol: function(u) {
const y = b.getListColumns(), z = b.getListHeadings();
for (const D in y) {
const F = y[D];
u(F, D, z[F]);
}
},
eachRow: function(u) {
d.each(function(y, z) {
b.validate(z);
u(z.idx, b.getListEntry(z), x(z));
});
},
sort: b.getSorter()
});
f = b.getListColumns();
for (const u in f) g.sortable(f[u]);
q && g.thead().distribute(q);
g.tbody().$(c ? "addClass" : "removeClass", [ "is-rtl" ]);
b.fire("poLoad", []);
return !!l;
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
let c = !1, l = this.$smeta, q = b.context(), u = [], y = b.tags(), z = y && y.length;
q && (u.push("<span>" + a(g[4]) + "</span>"), u.push("<mark>" + a(q) + "</mark>"));
if (z && this.getTag) for (u.push("<span>Tagged:</span>"); 0 <= --z; ) (g = this.getTag(y[z])) && u.push('<mark class="tag">' + a(g.mod_name) + "</mark>");
u.length && d.push(u.join(" "));
if (this.getMono() && (q = b.refs()) && (y = q.split(/\s/), z = y.length)) {
for (u = []; 0 <= --z; ) q = y[z], u.push("<code>" + a(q) + "</code>");
d.push('<p class="has-icon icon-file">' + u.join(" ") + "</p>");
}
(q = b.notes()) && d.push('<p class="has-icon icon-info">' + a(q, !0) + "</p>");
d.length ? (l || (l = f.find("div.meta"), l.length || (l = A('<div class="meta"></div>').insertAfter(f.header())), 
v(this, l, "poMeta"), this.$smeta = l), l.html(d.join("\n")).show(), c = !0) : l && l.text() && (l.text("").hide(), 
c = !0);
return c;
};
h.setTrgMeta = function(b, f, d) {
const g = [];
f = (b = b.errors(f)) && b.length;
var c = !1;
let l = this.$tmeta;
if (f) {
for (c = 0; c < f; c++) g.push('<p class="has-icon icon-warn">' + a(b[c], !0) + ".</p>");
l || (l = d.find("div.meta"), l.length || (l = A('<div class="meta"></div>').insertAfter(d.header())), 
this.$tmeta = l);
l.html(g.join("\n")).show();
c = !0;
} else l && l.text() && (l.text("").hide(), c = !0);
return c;
};
h.loadMessage = function(b) {
function f(M) {
if ("=" === M.charAt(0)) {
const J = M.split(" ");
M = J[0].substring(1);
J[0] = [ "Zero", "One", "Two" ][Number(M)] || M;
M = J.join(" ");
}
return M;
}
function d(M, J) {
const T = Q;
var P = ba[0];
M.off();
M.titled() !== P && r(M, P, J || "en");
P = !1;
y.setSrcMeta(b, M) && (P = !0);
if (b.plural()) {
P = -1;
let R = [], W = [];
const X = M.id + "-";
J = b.sourceForms() || J && J.plurals || [ "One", "Other" ];
const ca = J.length;
if (2 !== ca || "=" === J[0].charAt(0) && "=1" !== J[0]) for (;++P < ca; ) R[P] = X + String(P), 
W[P] = f(J[P].split(" ", 1)[0]) + ":"; else R = [ X + "-0", X + "-1" ], W = [ ba[1], ba[2] ];
M.splity.apply(M, R);
M.each(function(da, U) {
da.header(W[U]).textarea(b.source(null, U), T).setStrf(E).setMode(Z).setInvs(D);
});
M.lock();
T && M.each(function(da, U) {
g(da, U);
});
} else P && M.redraw(), M.textarea(b.source(), T).setStrf(E).setMode(Z).setInvs(D), 
T && g(M, 0);
}
function g(M, J) {
M.on("changing", function(T, P) {
b.source(P, J);
0 === J && y.updateListCell(b, "source");
y.unsave(b, J);
}).on("changed", function() {
0 === J && y.po.reIndex(b);
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ b ]);
});
}
function c(M, J, T, P) {
I && J.eachTextarea(function(W) {
W.ping();
});
J.off();
var R = T.isKnown() && T.label || "Target";
R = k(ba[3], R);
J.titled() !== R && r(J, R, T);
R = !1;
!M && y.setSrcMeta(b, J) && (R = !0);
y.setTrgMeta(b, P, J) && (R = !0);
y.setStatus(b, P);
if (1 !== T.nplurals && b.pluralized()) {
M = function(U) {
X.push(f(da[U] || "Form " + U));
W.push(ca + String(U));
};
let W = [], X = [];
const ca = J.id + "-", da = b.targetForms() || T.plurals || [ "One", "Other" ];
R = da.length;
for (b.eachMsg(M); (T = W.length) < R; ) M(T);
J.splitx.apply(J, W);
J.each(function(U, aa) {
const la = I && !b.disabled(aa);
U.textarea(b.translation(aa), la).setStrf(E).setMode(Z).setInvs(D);
I && l(U, aa);
});
J.navigize(X, P || null).on("wgTabSelect", function(U, aa) {
(U = I && U.cell.editable()) && U.focus();
y.setTrgMeta(b, aa, J);
y.setStatus(b, aa);
y.fire("poTab", [ aa ]);
});
} else R && J.redraw(), J.textarea(b.translation(), I && !b.disabled(0)).setStrf(E).setMode(Z).setInvs(D), 
I && l(J, 0);
}
function l(M, J) {
function T() {
P = null;
y.validate(b);
const W = b.errors(J).join(" ");
R !== W && (R = W, y.setTrgMeta(b, J, M) && M.redraw(), y.markUnsaved(b));
}
let P, R = b.errors(J).join(" ");
M.on("changing", function(W, X, ca) {
P && (clearTimeout(P), P = null);
b.translate(X, J);
0 === J && y.updateListCell(b, "target");
b.fuzzy(J) ? y.fuzzy(!1, b, J) : y.unsave(b, J);
"" === X ? (y.fire("poEmpty", [ !0, b, J ]), y.setStatus(b, J)) : "" === ca && (y.fire("poEmpty", [ !1, b, J ]), 
y.setStatus(b, J));
P = setTimeout(T, R ? 300 : 1e3);
}).on("changed", function() {
y.dict && y.rebuildSearch();
y.fire("poUpdate", [ b ]);
});
}
function q(M) {
M.off();
const J = ba[4];
M.titled() !== J && (r(M, J), y.setStatus(null));
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
function u(M) {
const J = ba[5];
M.titled() !== J && r(M, J);
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
S && u(S);
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
}({}, K, L));
B.register("$13", function(w, t, C) {
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
function v(m) {
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
let c, l = 0;
for (;null != (g = m.exec(h)); ) c = g[2], "%" !== c && ("" === c || -1 === "suxXbcdeEfFgGo".indexOf(c) ? l++ : (null == g[1] ? g = ++d : (g = parseInt(g[1]), 
f = Math.max(f, g)), null == b[g] && (b[g] = {}), b[g][c] = !0));
return {
count: Math.max(f, d),
valid: 0 === l,
types: b
};
};
}
function k(m) {
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
t = x.prototype = B.require("$24", "base.js").extend(x);
t.getListHeadings = function() {
const m = this.t(), h = [ m._x("Source text", "Editor") ];
this.targetLocale && (h[1] = m._x("Translation", "Editor"));
return h;
};
t.getListColumns = function() {
const m = {
source: 0
};
this.targetLocale && (m.target = 1);
return m;
};
t.getListEntry = function(m) {
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
t.stats = function() {
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
t.unlock = function() {
const m = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
m && (this._unlocked = m, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
t.lock = function() {
const m = this._unlocked;
m && (this.targetLocale = m, delete this._unlocked, this.po && this.po.lock(m), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, m ]), 
this.active && this.loadMessage(this.active));
};
t.locked = function() {
return !this._unlocked;
};
t.setStatus = function(m) {
let h = this.$tnav;
if (null == m) h && (h.remove(), this.$tnav = null); else {
h || (this.$tnav = h = A("<nav></nav>").append(v(this)).append(e(this)).appendTo(this.targetCell.header()));
var b = [];
m.translated() ? m.fuzzy() && b.push("po-fuzzy") : b.push("po-empty");
h.attr("class", b.join(" "));
}
};
t.getSorter = function() {
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
f.sort(function(c, l) {
return g(d.row(c), d.row(l));
});
};
};
t.validate = function(m) {
const h = this, b = [], f = [], d = this.fmt || "";
let g = 0, c = 0, l = 0;
"" !== d && "no-" === d.substring(0, 3) || m.eachSrc(function(q, u) {
u = k(u);
const y = u.count;
u.valid && (f[q] = u, l = Math.max(l, y), c = c ? Math.min(c, y) : y);
});
m.eachMsg(function(q, u) {
b[q] = [];
if ("" !== u && (l || d)) {
u = k(u);
var y = u.count;
if (y > l) b[q].push(n(h.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ l ])), 
g++; else if (y < c && 1 === m.count()) b[q].push(n(h.t()._("Missing placeholders; source text formatting suggests at least %s"), [ c ])), 
g++; else if (!u.valid) b[q].push(h.t()._("Possible syntax error in string formatting")), 
g++; else if (f[q]) {
y = f[q].types;
let z, D;
for (z in u.types) for (D in u.types[z]) if (null == y[z] || null == y[z][D]) {
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
t.handle = {};
let p;
return w;
}({}, K, L));
B.register("$14", function(w, t, C) {
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
}, v = {
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
function k(p) {
if (p.isDefaultPrevented() || !p.metaKey && !p.ctrlKey) return !0;
const m = p.which;
if (!n[m]) return !0;
const h = v[m];
if (!h) throw Error("command undefined #" + m);
if (p.altKey || p.shiftKey && !r[m] || !1 === h(p, e)) return !0;
p.stopPropagation();
p.preventDefault();
return !1;
}
const n = {};
A(a || t).on("keydown", k);
return {
add: function(p, m) {
v[x[p]] = m;
return this;
},
enable: function() {
for (const p in arguments) n[x[arguments[p]]] = !0;
return this;
},
disable: function() {
A(a || t).off("keydown", k);
e = a = null;
for (const p in v) delete v[p];
}
};
};
return w;
}({}, K, L));
B.register("$25", function(w, t, C) {
function x() {
this.reIndex([]);
}
w.init = function() {
return new x();
};
t = x.prototype;
t.reIndex = function(r) {
for (var v = {}, e = -1, a = r.length; ++e < a; ) v[r[e]] = e;
this.keys = r;
this.length = e;
this.ords = v;
};
t.key = function(r, v) {
if (null == v) return this.keys[r];
var e = this.keys[r], a = this.ords[v];
if (v !== e) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[r] = v;
delete this.ords[e];
this.ords[v] = r;
}
return r;
};
t.indexOf = function(r) {
r = this.ords[r];
return null == r ? -1 : r;
};
t.add = function(r, v) {
var e = this.ords[r];
null == e && (this.keys[this.length] = r, e = this.ords[r] = this.length++);
this[e] = v;
return e;
};
t.get = function(r) {
return this[this.ords[r]];
};
t.has = function(r) {
return null != this.ords[r];
};
t.del = function(r) {
this.cut(this.ords[r], 1);
};
t.cut = function(r, v) {
v = v || 1;
var e = [].splice.call(this, r, v);
this.keys.splice(r, v);
this.reIndex(this.keys);
return e;
};
t.each = function(r) {
for (var v = -1, e = this.keys, a = this.length; ++v < a; ) r(e[v], this[v], v);
return this;
};
t.sort = function(r) {
for (var v = -1, e = this.length, a, k = this.keys, n = this.ords, p = []; ++v < e; ) p[v] = [ this[v], k[v] ];
p.sort(function(m, h) {
return r(m[0], h[0]);
});
for (v = 0; v < e; v++) a = p[v], this[v] = a[0], a = a[1], k[v] = a, n[a] = v;
return this;
};
t.join = function(r) {
return [].join.call(this, r);
};
t = null;
return w;
}({}, K, L));
B.register("$26", function(w, t, C) {
function x(r, v) {
var e = new RegExp("^.{0," + (r - 1) + "}[" + v + "]"), a = new RegExp("^[^" + v + "]+");
return function(k, n) {
for (var p = k.length, m; p > r; ) {
m = e.exec(k) || a.exec(k);
if (null == m) break;
m = m[0];
n.push(m);
m = m.length;
p -= m;
k = k.substring(m);
}
0 !== p && n.push(k);
return n;
};
}
w.create = function(r) {
function v(h) {
return n[h] || "\\" + h;
}
var e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, a = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\"]/g, n = {
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
b = b.replace(k, v);
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
}({}, K, L));
B.register("$40", function(w, t, C) {
function x() {
this.length = 0;
}
w.init = function() {
return new x();
};
t = x.prototype;
t.push = function(r) {
this[this.length++] = r;
return this;
};
t.sort = function(r) {
[].sort.call(this, r);
return this;
};
t.each = function(r) {
for (var v = -1, e = this.length; ++v < e; ) r(v, this[v]);
return this;
};
return w;
}({}, K, L));
B.register("$27", function(w, t, C) {
function x() {}
w.extend = function(r) {
return r.prototype = new x();
};
t = x.prototype = B.require("$38", "abstract.js").init([ "add", "load" ]);
t.row = function(r) {
return this.rows[r];
};
t.lock = function(r) {
return this.locale(r || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
t.unlock = function() {
var r = this.loc;
this.loc = null;
return r;
};
t.locale = function(r) {
null == r ? r = this.loc : this.loc = r = B.require("$37", "locale.js").cast(r);
return r;
};
t.each = function(r) {
this.rows.each(r);
return this;
};
t.indexOf = function(r) {
"object" !== typeof r && (r = this.get(r));
if (!r) return -1;
null == r.idx && (r.idx = this.rows.indexOf(r.hash()));
return r.idx;
};
t.get = function(r) {
return this.rows && this.rows.get(r);
};
t.has = function(r) {
return this.rows && this.rows.has(r);
};
t.del = function(r) {
r = this.indexOf(r);
if (-1 !== r) {
var v = this.rows.cut(r, 1);
if (v && v.length) return this.length = this.rows.length, this.rows.each(function(e, a, k) {
a.idx = k;
}), r;
}
};
t.reIndex = function(r, v) {
var e = this.indexOf(r), a = r.hash(), k = this.rows.indexOf(a);
return k === e ? e : -1 !== k ? (v = (v || 0) + 1, r.source("Error, duplicate " + String(v) + ": " + r.source()), 
this.reIndex(r, v)) : this.rows.key(e, a);
};
t.sort = function(r) {
this.rows.sort(r);
return this;
};
t.export = function() {
for (var r = -1, v = this.rows, e = v.length, a = B.require("$40", "list.js").init(); ++r < e; ) a.push(v[r]);
return a;
};
t = null;
return w;
}({}, K, L));
B.register("$28", function(w, t, C) {
function x(e, a, k) {
if (null == k) return e[a] || "";
e[a] = k || "";
return e;
}
function r() {
this._id = this.id = "";
}
function v(e, a) {
const k = e.length;
let n = -1;
for (;++n < k; ) a(n, e[n]);
}
w.extend = function(e) {
return e.prototype = new r();
};
t = r.prototype;
t.flag = function(e, a) {
const k = this.flg || (this.flg = []);
if (null != a) k[a] = e; else for (a = Math.max(k.length, this.src.length, this.msg.length); 0 !== a--; ) k[a] = e;
return this;
};
t.flagged = function(e) {
const a = this.flg || [];
if (null != e) return a[e] || 0;
for (e = a.length; 0 !== e--; ) if (a[e]) return !0;
return !1;
};
t.flags = function() {
const e = {}, a = [], k = this.flg || [];
let n = k.length;
for (;0 !== n--; ) {
const p = k[n];
e[p] || (e[p] = !0, a.push(p));
}
return a;
};
t.flaggedAs = function(e, a) {
const k = this.flg || [];
if (null != a) return e === k[a] || 0;
for (a = k.length; 0 !== a--; ) if (k[a] === e) return !0;
return !1;
};
t.fuzzy = function(e, a) {
const k = this.flaggedAs(4, e);
null != a && this.flag(a ? 4 : 0, e);
return k;
};
t.source = function(e, a) {
if (null == e) return this.src[a || 0] || "";
this.src[a || 0] = e;
return this;
};
t.plural = function(e, a) {
if (null == e) return this.src[a || 1] || "";
this.src[a || 1] = e || "";
return this;
};
t.sourceForms = function() {
return this.srcF;
};
t.targetForms = function() {
return this.msgF;
};
t.each = function(e) {
const a = this.src, k = this.msg, n = Math.max(a.length, k.length);
let p = -1;
for (;++p < n; ) e(p, a[p], k[p]);
return this;
};
t.eachSrc = function(e) {
v(this.src, e);
return this;
};
t.eachMsg = function(e) {
v(this.msg, e);
return this;
};
t.count = function() {
return Math.max(this.src.length, this.msg.length);
};
t.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
t.translate = function(e, a) {
this.msg[a || 0] = e || "";
return this;
};
t.untranslate = function(e) {
if (null != e) this.msg[e] = ""; else {
const a = this.msg, k = a.length;
for (e = 0; e < k; e++) a[e] = "";
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
const a = this.msg, k = a.length;
for (e = 0; e < k; e++) if (!a[e]) return !1;
return !0;
};
t.untranslated = function(e) {
if (null != e) return !this.msg[e];
const a = this.msg, k = a.length;
for (e = 0; e < k; e++) if (a[e]) return !1;
return !0;
};
t.comment = function(e) {
return x(this, "cmt", e);
};
t.notes = function(e) {
return x(this, "xcmt", e);
};
t.refs = function(e) {
return x(this, "rf", e);
};
t.format = function(e) {
return x(this, "fmt", e);
};
t.context = function(e) {
return x(this, "ctx", e);
};
t.tags = function() {
return this.tg;
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
let e = this.msg.length;
for (;0 !== e--; ) this.msg[e] = this.src[e] || "";
};
t.disabled = function(e) {
return !!(this.lck || [])[e || 0];
};
t.disable = function(e) {
(this.lck || (this.lck = []))[e || 0] = !0;
return this;
};
t.saved = function(e) {
const a = this.drt;
if (null == a) return !0;
if (null != e) return !a[e];
for (e = a.length; 0 !== e--; ) if (a[e]) return !1;
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
}({}, K, L));
B.register("$15", function(w, t, C) {
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
function v(n) {
var p = t.console;
p && p.error && p.error(n.message || String(n));
}
function e(n) {
return B.require("$26", "format.js").create(n);
}
function a(n) {
this.locale(n);
this.clear();
this.head = x(this.now());
}
function k(n, p) {
this.src = [ n || "" ];
this.msg = [ p || "" ];
}
w.create = function(n) {
return new a(n);
};
C = B.require("$27", "messages.js").extend(a);
C.clear = function() {
this.rows = B.require("$25", "collection.js").init();
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
n instanceof k || (n = new k(n));
p && n.context(p);
p = n.hash();
this.rows.get(p) ? v("Duplicate message at index " + this.indexOf(n)) : (n.idx = this.rows.add(p, n), 
this.length = this.rows.length);
return n;
};
C.load = function(n) {
for (var p = -1, m, h, b, f, d, g, c = (b = this.locale()) && b.nplurals || 2, l = []; ++p < n.length; ) m = n[p], 
null == m.parent ? (h = m.source || m.id, b = m.target || "", f = m.context, h || f ? (d = new k(h, b), 
d._id = m._id, f && d.context(f), m.flag && d.flag(m.flag, 0), m.comment && d.comment(m.comment), 
m.notes && d.notes(m.notes), m.refs && d.refs(m.refs), d.format(m.format), m.message = d, 
this.add(d), m.prev && m.prev[0] && (d.prev(m.prev[0].source, m.prev[0].context), 
m.prev[1] && d._src.push(m.prev[1].source || ""))) : 0 === p && "object" === typeof b && (this.head = b, 
this.headcmt = m.comment)) : l.push(m);
for (p = -1; ++p < l.length; ) try {
m = l[p];
h = m.source || m.id;
d = n[m.parent] && n[m.parent].message;
if (!d) throw Error("parent missing for plural " + h);
g = m.plural;
1 === g && d.plural(h);
g >= c || (m.flag && d.flag(m.flag, g), d.translate(m.target || "", g), m.format && !d.format() && d.format(m.format));
} catch (q) {
v(q);
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
h = new k("", h.join("\n"));
h.comment(this.headcmt || "");
f && h.fuzzy(0, !0);
m.push(h.toString());
m.push("");
this.rows.each(function(c, l) {
c && (m.push(l.cat(g, f, d)), m.push(""));
});
return m.join("\n");
};
C = B.require("$28", "message.js").extend(k);
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
var n = new k(), p, m;
for (p in this) this.hasOwnProperty(p) && ((m = this[p]) && m.concat && (m = m.concat()), 
n[p] = m);
return n;
};
C = C = null;
return w;
}({}, K, L));
B.register("$17", function(w, t, C) {
w.init = function(x, r) {
function v() {
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
v().dialog("close").html("").dialog("option", "title", "Error").append(p).dialog("open");
}
function a(p) {
var m = p && p.code;
if (m) {
for (var h = -1, b = m.length, f = A("<ol></ol>").attr("class", p.type); ++h < b; ) A("<li></li>").html(m[h]).appendTo(f);
f.find("li").eq(p.line - 1).attr("class", "highlighted");
v().dialog("close").html("").dialog("option", "title", p.path + ":" + p.line).append(f).dialog("open");
}
}
function k(p) {
p = p.target;
var m = A(p).find("li.highlighted")[0];
p.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(p.clientHeight / 2));
}
var n;
return {
load: function(p) {
v().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", k);
p = A.extend({
ref: p,
path: r.popath
}, r.project || {});
x.ajax.post("fsReference", p, a, e);
}
};
};
return w;
}({}, K, L));
B.register("$30", function(w, t, C) {
function x(r) {
this.api = r;
this.chars = 0;
}
w.create = function(r) {
return new x(r);
};
t = x.prototype;
t.init = function(r, v) {
function e(c) {
let l = {
length: 0,
html: c.html,
sources: []
};
d.push(l);
return g[c.html ? 1 : 0] = l;
}
function a(c, l) {
let q = c.source(null, l);
if (q && (c.untranslated(l) || v)) if (l = f[q]) l.push(c); else {
l = q.length;
var u = k.isHtml(q);
u = g[u ? 1 : 0];
var y = u.sources;
if (b && l > b) m++; else {
if (u.length + l > h || 50 === y.length) u = e(u), y = u.sources;
y.push(q);
f[q] = [ c ];
u.length += l;
n += l;
p += 1;
}
}
}
let k = this.api, n = 0, p = 0, m = 0, h = 1e4, b = k.maxChr(), f = {}, d = [], g = [];
b && (h = Math.min(h, b));
e({
html: !1
});
e({
html: !0
});
r.each(function(c, l) {
a(l, 0);
a(l, 1);
});
g = [];
this.map = f;
this.chars = n;
this.length = p;
this.batches = d;
this.locale = r.locale();
m && k.stderr("Strings over " + h + " characters long will be skipped");
};
t.abort = function() {
this.state = "abort";
return this;
};
t.dispatch = function() {
function r(z, D) {
function F(S, I, Q) {
D !== Q && (z === I || 1 < S && E.source(null, 1) === z) && (E.translate(D, S), 
O++, l++);
return O;
}
if (!v()) return !1;
if (!D) return !0;
let E, G = b[z] || [], H = G.length, N = -1, O;
for (g++; ++N < H; ) if (E = G[N]) O = 0, E.each(F), O && p("each", [ E ]);
return !0;
}
function v() {
return "abort" === m.state ? (h && (h.abort(), n()), !1) : !0;
}
function e() {
let z = f.shift(), D;
z ? (D = z.sources) && D.length ? h.batch(D, d, z.html, r).fail(a).always(k) : k() : n();
}
function a() {
m.abort();
n();
}
function k() {
c++;
p("prog", [ c, u ]);
v() && e();
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
let m = this, h = m.api, b = m.map, f = m.batches || [], d = m.locale, g = 0, c = 0, l = 0, q = m.length, u = f.length, y = {
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
}({}, K, L));
B.register("$41", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
B.register("$31", function(w, t, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "Google Translate";
};
r.getId = function() {
return "google";
};
r.getUrl = function() {
return "https://translate.google.com/";
};
r.parseError = function(v) {
if (v.error) {
for (var e = [], a = v.error.errors || [], k = a.length, n = -1; ++n < k; ) e.push(a[n].message || "");
return "Error " + v.error.code + ": " + e.join(";");
}
return "";
};
r.batch = function(v, e, a, k) {
function n(b) {
for (var f = v.length, d = -1, g; ++d < f && (g = b[d] || {}, !1 !== k(v[d], g.translatedText || "", e)); );
}
var p = this, m = this.getSrc();
a = a ? "html" : "text";
var h = p.mapLang(e, B.require("$41", "google.json"));
return p._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + h + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: p.key(),
q: v
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
}({}, K, L));
B.register("$42", {
nn: [ "no" ],
pt: [ "pt", "pt-pt" ],
sr: [ "sr-Cyrl", "sr-Latn" ],
sr_RS: [ "sr-Cyrl" ],
tlh: [ "tlh-Latn", "tlh-Piqd" ],
zh: [ "zh-Hans", "zh-Hant" ],
zh_CN: [ "zh-Hans" ],
zh_HK: [ "zh-Hans" ],
zh_SG: [ "zh-Hans" ],
zh_TW: [ "zh-Hant" ]
});
B.register("$32", function(w, t, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "Microsoft Translator text API";
};
r.getId = function() {
return "microsoft";
};
r.getUrl = function() {
return "https://aka.ms/MicrosoftTranslatorAttribution";
};
r.parseError = function(v) {
return v && v.error ? v.error.message : "";
};
r.maxChr = function() {
return 1e4;
};
r.batch = function(v, e, a, k) {
function n(g) {
for (var c = -1, l; ++c < b && (l = g[c] || {}, l = l.translations || [], l = l[0] || {}, 
!1 !== k(v[c], l.text || "", e)); );
}
var p = this, m = [], h = p.getSrc(), b = v.length, f = -1;
a = a ? "html" : "plain";
for (var d = p.mapLang(e, B.require("$42", "ms.json")); ++f < b; ) m.push({
text: v[f]
});
return p._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + h + "&to=" + d + "&textType=" + a,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": p.param("region") || "global"
}
}).done(function(g, c, l) {
g && g.length ? n(g) : (p.stderr(p.parseError(g) || p.httpError(l)), n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, K, L));
B.register("$43", {
pt: [ "pt-PT", "pt-BR" ]
});
B.register("$33", function(w, t, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.toString = function() {
return "DeepL Translator";
};
r.getId = function() {
return "deepl";
};
r.getUrl = function() {
return "https://www.deepl.com/translator";
};
r.parseError = function(v) {
return v.message;
};
r.batch = function(v, e, a, k) {
function n(d) {
for (var g = v.length, c = -1, l; ++c < g && (l = d[c] || {}, !1 !== k(v[c], l.text || "", e)); );
}
var p = this;
a = this.getSrc();
var m = p.param("url") || "https://api.deepl.com", h = p.mapLang(e, B.require("$43", "deepl.json")), b = e.tone, f = "default";
null == b && (b = String(e.variant || "").toLowerCase());
"formal" === b ? f = "more" : "informal" === b && (f = "less");
return p._call({
url: p.fixURL(m + "/v2/translate"),
method: "POST",
traditional: !0,
data: {
source_lang: a.toUpperCase(),
target_lang: h.toUpperCase(),
formality: f,
preserve_formatting: "1",
auth_key: p.key(),
text: v
}
}).done(function(d, g, c) {
d.translations ? n(d.translations) : (p.stderr(p.parseError(d) || p.httpError(c)), 
n([]));
}).fail(function() {
n([]);
});
};
return new x();
};
return w;
}({}, K, L));
B.register("$44", {
zh: [ "zh", "zh-CN", "zh-TW" ],
pt: [ "pt", "pt-PT", "pt-BR" ]
});
B.register("$34", function(w, t, C) {
function x() {}
w.create = function(r) {
r = x.prototype = new r();
r.getUrl = function() {
return "https://lecto.ai/?ref=loco";
};
r.parseError = function(v) {
var e = v.details || {}, a = e.message;
e = e.texts;
return a ? (e && e !== a && (a += "; " + e), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(k) {
k += -1 === k.indexOf("?") ? "?" : "&";
return k + "ref=loco";
}), "Error " + (v.status || "0") + ": " + a) : "";
};
r.maxChr = function() {
return 1e3;
};
r.batch = function(v, e, a, k) {
function n(b) {
for (var f = v.length, d = -1, g = (b[0] || {
translated: []
}).translated || []; ++d < f && (b = g[d] || "", !1 !== k(v[d], b, e)); );
}
var p = this;
a = this.getSrc();
var m = p.param("url") || "https://api.lecto.ai", h = p.mapLang(e, B.require("$44", "lecto.json"));
return p._call({
url: p.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ h ],
from: a,
texts: v
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
}({}, K, L));
B.register("$18", function(w, t, C) {
function x() {
this.inf = {};
}
function r() {
var a = C.createElement("p"), k = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, n = /<[a-z]+\s/i, p, m;
return {
sniff: function(h) {
if (h === p) return m;
p = h;
if (k.test(h) || n.test(h)) if (a.innerHTML = h, a.textContent !== h) return m = !0;
return m = !1;
}
};
}
var v = x.prototype;
v.init = function(a) {
this.inf = a || {};
};
v.param = function(a) {
return this.inf[a] || "";
};
v.key = function() {
return this.param("key");
};
v.getId = function() {
return this.param("id") || "none";
};
v.getUrl = function() {
return this.param("url") || "#";
};
v.toString = function() {
return this.param("name") || this.getId();
};
v.getSrc = function() {
return this.param("src") || "en";
};
v.stderr = function(a) {
var k = (t.loco || {}).notices || t.console;
k && k.error && k.error(String(this) + ": " + String(a));
};
v.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
v.parseError = function() {
return "";
};
v.mapLang = function(a, k) {
var n = String(a).replace("-", "_"), p = a.lang;
k = k[n] || k[p] || [];
a = k.length;
if (0 === a) return p;
if (1 < a) {
n = n.toLowerCase();
p = -1;
for (var m; ++p < a; ) if (m = k[p], m.toLowerCase().replace("-", "_") === n) return m;
}
return k[0];
};
v.toLang = function(a) {
return String(a);
};
v.maxChr = function() {
return 0;
};
v.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
};
v.translate = function(a, k, n) {
return this.batch([ a ], k, this.isHtml(a), n);
};
v._call = function(a) {
var k = this;
k.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(n, p, m) {
try {
var h = n.responseText, b = h && B.require("$5", "json.js").parse(h);
m = b && k.parseError(b) || m;
} catch (f) {}
k.stderr(m || k.httpError(n));
};
return k.abortable(A.ajax(a));
};
v.abortable = function(a) {
var k = this;
a.always(function() {
k.$r === a && (k.$r = null);
});
return k.$r = a;
};
v.abort = function() {
var a = this.$r;
a && a.abort();
};
v.isHtml = function(a) {
return (e || (e = r())).sniff(a);
};
v.createJob = function() {
return B.require("$30", "job.js").create(this);
};
v.batch = function(a, k, n, p) {
function m(f) {
for (var d = a.length, g = -1; ++g < d && !1 !== p(a[g], f[g], k); );
}
var h = t.loco.ajax;
n = {
hook: this.getId(),
type: n ? "html" : "text",
locale: this.toLang(k),
source: this.getSrc(),
sources: a
};
var b = A.Deferred();
this.abortable(h.post("apis", n, function(f) {
m(f && f.targets || []);
b.resolve();
}, function() {
m([]);
b.reject();
}));
return b.promise();
};
w.create = function(a) {
var k = a.id;
k = "google" === k ? B.require("$31", "google.js").create(x) : "microsoft" === k ? B.require("$32", "ms.js").create(x) : "deepl" === k ? B.require("$33", "deepl.js").create(x) : "lecto" === k ? B.require("$34", "lecto.js").create(x) : new x();
k.init(a);
return k;
};
w.suggest = function(a, k, n, p) {
var m, h = a.length;
for (m = 0; m < h; m++) {
var b = a[m];
b.translate(k, n, p);
}
};
var e;
return w;
}({}, K, L));
B.register("$19", function(w, t, C) {
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
function v() {
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
if (q) return O && O.dialog("close"), v(), A(x).find('button[type="submit"]').attr("disabled", !1), 
A(t).triggerHandler("resize"), d && d(!0), !0;
y && O ? (G || (A(g).removeClass("jshide").hide().fadeIn(500), G = !0), H && (e(A(E)), 
H = !1)) : v();
A(x).find('input[type="submit"]').attr("disabled", !0);
d && d(!1);
return !1;
}
function k(I) {
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
l = !0;
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
I.notice && u.notices.info(I.notice);
if (q) "direct" !== c && (S = I.creds, k(x), l && I.success && u.notices.success(I.success)), 
a(); else if (I.reason) u.notices.info(I.reason); else if (I = I.prompt) {
var Q = r();
Q.html(I).find("form").on("submit", n);
Q.dialog("option", "title", Q.find("h2").remove().text());
Q.find("button.cancel-button").show().on("click", p);
Q.find('input[type="submit"]').addClass("button-primary");
a();
A(t).triggerHandler("resize");
} else u.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function b() {
a();
}
function f(I) {
l = !1;
u.ajax.setNonce("fsConnect", D).post("fsConnect", I, h, b);
return I;
}
var d, g = x, c = null, l = !1, q = !1, u = t.loco, y = x.path.value, z = x.auth.value, D = x["loco-nonce"].value, F = A(g).find("button.button-primary"), E = C.getElementById(g.id + "-warn"), G = !1, H = !1, N = "", O;
u.notices.convert(E).stick();
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
if (I.nodeType) k(I); else {
var Q, Y = S || {};
for (Q in Y) Y.hasOwnProperty(Q) && (I[Q] = Y[Q]);
}
return this;
},
setForm: function(I) {
x = I;
a();
k(I);
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
}({}, K, L));
B.register("$35", function(w, t, C) {
function x(a, k) {
return function(n) {
a.apply(n, k);
return n;
};
}
function r(a) {
return function(k, n) {
k = k && k[a] || 0;
n = n && n[a] || 0;
return k === n ? 0 : k > n ? 1 : -1;
};
}
function v(a) {
return function(k, n) {
return (k && k[a] || "").localeCompare(n && n[a] || "");
};
}
function e(a) {
return function(k, n) {
return -1 * a(k, n);
};
}
w.sort = function(a, k, n, p) {
k = "n" === n ? r(k) : v(k);
p && (k = e(k));
return x([].sort, [ k ])(a);
};
return w;
}({}, K, L));
B.register("$20", function(w, t, C) {
w.init = function(x) {
function r(g) {
var c = -1, l = g.length;
for (A("tr", h).remove(); ++c < l; ) h.appendChild(g[c].$);
}
function v(g) {
n = g ? f.find(g, e) : e.slice(0);
m && (g = a[m], n = d(n, m, g.type, g.desc));
r(n);
}
var e = [], a = [], k = 0, n, p, m, h = x.getElementsByTagName("tbody")[0], b = x.getElementsByTagName("thead")[0], f = B.require("$10", "fulltext.js").init(), d = B.require("$35", "sort.js").sort;
b && h && (A("th", b).each(function(g, c) {
var l = c.getAttribute("data-sort-type");
l && (g = k, A(c).addClass("loco-sort").on("click", function(q) {
q.preventDefault();
q = g;
var u = a[q], y = u.type, z = !(u.desc = !u.desc);
n = d(n || e.slice(0), q, y, z);
r(n);
p && p.removeClass("loco-desc loco-asc");
p = A(u.$).addClass(z ? "loco-desc" : "loco-asc").removeClass(z ? "loco-asc" : "loco-desc");
m = q;
return !1;
}), a[k] = {
$: c,
type: l
});
c.hasAttribute("colspan") ? k += Number(c.getAttribute("colspan")) : k++;
}), A("tr", h).each(function(g, c) {
var l, q, u = [], y = {
_: g,
$: c
}, z = c.getElementsByTagName("td");
for (l in a) {
c = z[l];
(q = c.textContent.replace(/(^\s+|\s+$)/g, "")) && u.push(q);
c.hasAttribute("data-sort-value") && (q = c.getAttribute("data-sort-value"));
switch (a[l].type) {
case "n":
q = Number(q);
}
y[l] = q;
}
e[g] = y;
f.index(g, u);
}), x = A('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
b = A(x.form), 1 < e.length ? B.require("$11", "LocoTextListener.js").listen(x, v) : b.hide(), 
b.on("submit", function(g) {
g.preventDefault();
return !1;
})));
};
return w;
}({}, K, L));
var V = K.loco || {}, ia = V.conf || {
$v: [ 0, 0 ]
};
K = B.require("$1", "t.js").init();
L = ia.wplang;
V.version = function(w) {
return ia.$v[w || 0];
};
B.require("$2", "html.js");
B.require("$3", "number.js");
B.require("$4", "array.js");
B.require("$5", "json.js");
V.l10n = K;
K.load(ia.wpl10n);
L && K.pluraleq(L.pluraleq);
V.string = B.require("$6", "string.js");
V.notices = B.require("$7", "notices.js").init(K);
V.ajax = B.require("$8", "ajax.js").init(ia).localise(K);
V.locale = B.require("$9", "wplocale.js");
V.fulltext = B.require("$10", "fulltext.js");
V.watchtext = B.require("$11", "LocoTextListener.js").listen;
V.tooltip = B.require("$12", "tooltip.js");
V.po = {
ed: B.require("$13", "poedit.js"),
kbd: B.require("$14", "hotkeys.js"),
init: B.require("$15", "po.js").create,
ace: B.require("$16", "ace.js").strf("php"),
ref: B.require("$17", "refs.js")
};
V.apis = B.require("$18", "apis.js");
V.fs = B.require("$19", "fsconn.js");
A("#loco-admin.wrap table.wp-list-table").each(function(w, t) {
B.require("$20", "tables.js").init(t);
});
V.validate = function(w) {
return "2.6.4" !== (/^\d+\.\d+\.\d+/.exec(w && w[0] || "") && RegExp.lastMatch) ? (V.notices.warn("admin.js is the wrong version (2.6.4). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
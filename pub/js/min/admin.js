"use strict";

(function(L, M, B, ja) {
var C = function() {
function A(y) {
throw Error("Failed to require " + y);
}
var x = {};
return {
register: function(y, u) {
x[y] = u;
},
require: function(y, u) {
return x[y] || A(u);
},
include: function(y, u, r) {
return x[y] || (r ? A(u) : null);
}
};
}();
C.register("$1", function(A) {
function x(y) {
var u = typeof y;
if ("string" === u) if (/[^ <>!=()%^&|?:n0-9]/.test(y)) console.error("Invalid plural: " + y); else return new Function("n", "return " + y);
"function" !== u && (y = function(r) {
return 1 != r;
});
return y;
}
A.init = function(y) {
function u(l, m, v) {
return (l = g[l]) && l[v] ? l[v] : m || "";
}
function r(l) {
return u(l, l, 0);
}
function c(l, m) {
return u(m + "" + l, l, 0);
}
function h(l, m, v) {
v = Number(y(v));
isNaN(v) && (v = 0);
return u(l, v ? m : l, v);
}
y = x(y);
var g = {};
return {
__: r,
_x: c,
_n: h,
_: r,
x: c,
n: h,
load: function(l) {
g = l || {};
return this;
},
pluraleq: function(l) {
y = x(l);
return this;
}
};
};
return A;
}({}, L, M));
C.register("$2", function(A) {
A.ie = function() {
return !1;
};
A.init = function() {
return A;
};
return A;
}({}, L, M));
C.register("$3", function(A) {
Number.prototype.format = function(x, y, u) {
var r = Math.pow(10, x || 0);
x = [];
r = String(Math.round(r * this) / r);
var c = r.split(".");
r = c[0];
c = c[1];
var h = r.length;
do {
x.unshift(r.substring(h - 3, h));
} while (0 < (h -= 3));
r = x.join(u || ",");
if (c) {
u = c;
for (x = u.length; "0" === u.charAt(--x); ) var g = x;
g && (u = u.substring(0, g));
(c = u) && (r += (y || ".") + c);
}
return r;
};
Number.prototype.percent = function(x) {
var y = 0, u = this && x ? this / x * 100 : 0;
if (0 === u) return "0";
if (100 === u) return "100";
if (99 < u) u = Math.min(u, 99.9), x = u.format(++y); else if (.5 > u) {
u = Math.max(u, 1e-4);
do {
x = u.format(++y);
} while ("0" === x && 4 > y);
x = x.substring(1);
} else x = u.format(0);
return x;
};
return A;
}({}, L, M));
C.register("$4", function(A) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(x) {
if (null == this) throw new TypeError();
var y = Object(this), u = y.length >>> 0;
if (0 === u) return -1;
var r = 0;
1 < arguments.length && (r = Number(arguments[1]), r != r ? r = 0 : 0 != r && Infinity != r && -Infinity != r && (r = (0 < r || -1) * Math.floor(Math.abs(r))));
if (r >= u) return -1;
for (r = 0 <= r ? r : Math.max(u - Math.abs(r), 0); r < u; r++) if (r in y && y[r] === x) return r;
return -1;
});
return A;
}({}, L, M));
C.register("$5", function(A, x) {
x.JSON || (x.JSON = {
parse: B.parseJSON,
stringify: null
});
return A = x.JSON;
}({}, L, M));
C.register("$6", function(A) {
A.trim = function(x, y) {
for (y || (y = " \n"); x && -1 !== y.indexOf(x.charAt(0)); ) x = x.substring(1);
for (;x && -1 !== y.indexOf(x.slice(-1)); ) x = x.substring(0, x.length - 1);
return x;
};
A.sprintf = function(x) {
return A.vsprintf(x, [].slice.call(arguments, 1));
};
A.vsprintf = function(x, y) {
var u = 0;
return x.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(r, c, h) {
return "%" === h ? "%" : (c ? y[Number(c) - 1] : y[u++]) || "";
});
};
return A;
}({}, L, M));
C.register("$21", function(A, x, y) {
function u(r) {
return function(c, h) {
for (var g = c[r] || 0; (c = c.offsetParent) && c !== (h || y.body); ) g += c[r] || 0;
return g;
};
}
A.top = u("offsetTop");
A.left = u("offsetLeft");
A.el = function(r, c) {
r = y.createElement(r || "div");
c && (r.className = c);
return r;
};
A.txt = function(r) {
return y.createTextNode(r || "");
};
return A;
}({}, L, M));
C.register("$7", function(A, x) {
function y(f, e, n) {
function q() {
w();
z = setTimeout(e, n);
}
function w() {
z && clearTimeout(z);
z = null;
}
var z;
q();
B(f).on("mouseenter", w).on("mouseleave", q);
return {
die: function() {
w();
B(f).off("mouseenter mouseleave");
}
};
}
function u(f, e) {
f.fadeTo(e, 0, function() {
f.slideUp(e, function() {
f.remove();
B(x).triggerHandler("resize");
});
});
return f;
}
function r(f, e) {
function n(F) {
m[G] = null;
u(B(f), 250);
w && w.die();
var H;
if (H = F) F.stopPropagation(), F.preventDefault(), H = !1;
return H;
}
function q(F) {
w && w.die();
return w = y(f, n, F);
}
var w, z, D = B(f), E = D.find("button");
0 === E.length && (D.addClass("is-dismissible"), E = B('<button type="button" class="notice-dismiss"> </a>').appendTo(D));
E.off("click").on("click", n);
B(x).triggerHandler("resize");
k();
var G = m.length;
m.push(n);
e && (w = q(e));
return {
link: function(F, H) {
var I = H || F;
H = B(f).find("nav");
F = B("<nav></nav>").append(B("<a></a>").attr("href", F).text(I));
z ? (z.push(F.html()), H.html(z.join("<span> | </span>"))) : (z = [ F.html() ], 
B(f).addClass("has-nav").append(F));
return this;
},
stick: function() {
w && w.die();
w = null;
m[G] = null;
return this;
},
slow: function(F) {
q(F || 1e4);
return this;
}
};
}
function c(f, e, n) {
var q = C.require("$21", "dom.js").el;
f = B('<div class="notice notice-' + f + ' loco-notice inline"></div>').prependTo(B("#loco-notices"));
var w = B(q("p"));
n = B(q("span")).text(n);
e = B(q("strong", "has-icon")).text(e + ": ");
w.append(e).append(n).appendTo(f);
return f;
}
function h(f, e, n, q) {
f = c(n, e, f).css("opacity", "0").fadeTo(500, 1);
B(x).triggerHandler("resize");
return r(f, q);
}
function g(f) {
return h(f, a, "warning");
}
function l() {
B("#loco-notices").find("div.notice").each(function(f, e) {
-1 === e.className.indexOf("jshide") && (f = -1 === e.className.indexOf("notice-success") ? null : 5e3, 
r(e, f));
});
}
var m = [], v = x.console || {
log: function() {}
}, k = Date.now || function() {
return new Date().getTime();
}, p, a, d, b;
A.error = function(f) {
return h(f, p, "error");
};
A.warn = g;
A.info = function(f) {
return h(f, d, "info");
};
A.success = function(f) {
return h(f, b, "success", 5e3);
};
A.warning = g;
A.log = function() {
v.log.apply(v, arguments);
};
A.debug = function() {
(v.debug || v.log).apply(v, arguments);
};
A.clear = function() {
for (var f = -1, e, n = m, q = n.length; ++f < q; ) (e = n[f]) && e.call && e();
m = [];
return A;
};
A.create = c;
A.raise = function(f) {
(A[f.type] || A.error).call(A, f.message);
};
A.convert = r;
A.init = function(f) {
p = f._("Error");
a = f._("Warning");
d = f._("Notice");
b = f._("OK");
setTimeout(l, 1e3);
return A;
};
return A;
}({}, L, M));
C.register("$8", function(A, x) {
function y(a) {
var d = B("<pre>" + a + "</pre>").text();
d && (d = d.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
d || (d = a) || (d = "Blank response from server");
return d;
}
function u(a) {
return (a = a.split(/[\r\n]/)[0]) ? (a = a.replace(/ +in +\S+ on line \d+/, ""), 
a = a.replace(/^[()! ]+Fatal error:\s*/, "")) : t._("Server returned invalid data");
}
function r(a) {
x.console && console.error && console.error('No nonce for "' + a + '"');
return "";
}
function c(a, d, b) {
a[d] = b;
}
function h(a, d, b) {
a.push({
name: d,
value: b
});
}
function g(a, d, b) {
a.append(d, b);
}
function l(a, d, b, f) {
function e(q, w, z) {
if ("abort" !== w) {
var D = v || {
_: function(O) {
return O;
}
}, E = q.status || 0, G = q.responseText || "", F = y(G), H = q.getResponseHeader("Content-Type") || "Unknown type", I = q.getResponseHeader("Content-Length") || G.length;
"success" === w && z ? n.error(z) : (n.error(u(F) + ".\n" + D._("Check console output for debugging information")), 
n.log("Ajax failure for " + a, {
status: E,
error: w,
message: z,
output: G
}), "parsererror" === w && (z = "Response not JSON"), n.log([ D._("Provide the following text when reporting a problem") + ":", "----", "Status " + E + ' "' + (z || D._("Unknown error")) + '" (' + H + " " + I + " bytes)", F, "====" ].join("\n")));
b && b.call && b(q, w, z);
k = q;
}
}
f.url = p;
f.dataType = "json";
var n = C.require("$7", "notices.js").clear();
k = null;
return B.ajax(f).fail(e).done(function(q, w, z) {
var D = q && q.data, E = q && q.notices, G = E && E.length, F = -1;
for (!D || q.error ? e(z, w, q && q.error && q.error.message) : d && d(D, w, z); ++F < G; ) n.raise(E[F]);
});
}
var m = {}, v, k, p = x.ajaxurl || "/wp-admin/admin-ajax.php";
A.init = function(a) {
m = a.nonces || m;
return A;
};
A.localise = function(a) {
v = a;
return A;
};
A.xhr = function() {
return k;
};
A.strip = y;
A.parse = u;
A.submit = function(a, d, b) {
function f(z, D) {
D.disabled ? D.setAttribute("data-was-disabled", "true") : D.disabled = !0;
}
function e(z, D) {
D.getAttribute("data-was-disabled") || (D.disabled = !1);
}
function n(z) {
z.find(".button-primary").removeClass("loading");
z.find("button").each(e);
z.find("input").each(e);
z.find("select").each(e);
z.find("textarea").each(e);
z.removeClass("disabled loading");
}
var q = B(a), w = q.serialize();
(function(z) {
z.find(".button-primary").addClass("loading");
z.find("button").each(f);
z.find("input").each(f);
z.find("select").each(f);
z.find("textarea").each(f);
z.addClass("disabled loading");
})(q);
return l(a.route.value, function(z, D, E) {
n(q);
d && d(z, D, E);
}, function(z, D, E) {
n(q);
b && b(z, D, E);
}, {
type: a.method,
data: w
});
};
A.post = function(a, d, b, f) {
var e = !0, n = d || {}, q = m[a] || r(a);
x.FormData && n instanceof FormData ? (e = !1, d = g) : d = Array.isArray(n) ? h : c;
d(n, "action", "loco_json");
d(n, "route", a);
d(n, "loco-nonce", q);
return l(a, b, f, {
type: "post",
data: n,
processData: e,
contentType: e ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
A.get = function(a, d, b, f) {
d = d || {};
var e = m[a] || r(a);
d.action = "loco_json";
d.route = a;
d["loco-nonce"] = e;
return l(a, b, f, {
type: "get",
data: d
});
};
A.setNonce = function(a, d) {
m[a] = d;
return A;
};
return A;
}({}, L, M));
C.register("$22", {
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
C.register("$9", function(A) {
function x() {}
var y, u = C.require("$22", "rtl.json");
A.init = function() {
return new x();
};
A.cast = function(c) {
return c instanceof x ? c : "string" === typeof c ? A.parse(c) : A.clone(c);
};
A.clone = function(c) {
var h, g = new x();
for (h in c) g[h] = c[h];
return g;
};
A.parse = function(c) {
if (!(y || (y = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(c)) return null;
var h = new x();
h.lang = RegExp.$1.toLowerCase();
if (c = RegExp.$2) h.region = c.toUpperCase();
if (c = RegExp.$3) h.variant = c.toLowerCase();
return h;
};
var r = x.prototype;
r.isValid = function() {
return !!this.lang;
};
r.isKnown = function() {
var c = this.lang;
return !(!c || "zxx" === c);
};
r.toString = function(c) {
c = c || "_";
var h, g = this.lang || "zxx";
if (h = this.region) g += c + h;
if (h = this.variant) g += c + h;
return g;
};
r.getIcon = function() {
for (var c = 3, h, g, l = [ "variant", "region", "lang" ], m = []; 0 !== c--; ) if (h = l[c], 
g = this[h]) m.push(h), m.push(h + "-" + g.toLowerCase());
return m.join(" ");
};
r.isRTL = function() {
return !!u[String(this.lang).toLowerCase()];
};
r = null;
return A;
}({}, L, M));
C.register("$23", {
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
C.register("$10", function(A) {
A.init = function() {
function x(v) {
return g[v] || v;
}
function y(v, k, p) {
let a, d, b = String(v || "").toLowerCase().replace(h, x).split(l), f = b.length;
for (;0 !== f--; ) if ((v = b[f]) && null == p[v]) for (k.push(v), p[v] = !0, a = v.split(m), 
d = a.length; 0 !== d--; ) (v = a[d]) && null == p[v] && (k.push(v), p[v] = !0);
return k;
}
function u(v) {
return y(v, [], {});
}
function r(v) {
let k = [], p = {}, a = v.length;
for (;0 !== a--; ) y(v[a], k, p);
return k;
}
let c = [];
const h = /[^a-z0-9]/g, g = C.require("$23", "flatten.json"), l = /\s+/, m = /[^\d\p{L}]+/u;
return {
split: u,
find: function(v, k) {
{
let p = [], a = -1, d = c, b = d.length, f, e, n, q, w, z = String(v || "").toLowerCase().replace(h, x).split(" "), D = z.length, E = !!k;
a: for (;++a < b; ) if (e = d[a], null != e && (n = e.length)) {
q = 0;
b: for (;q < D; q++) {
w = z[q];
for (v = 0; v < n; v++) if (f = e[v], 0 === f.indexOf(w)) continue b;
continue a;
}
p.push(E ? k[a] : a);
}
k = p;
}
return k;
},
add: function(v, k) {
c[v] = u(k);
},
push: function(v) {
c[c.length] = r(v);
},
index: function(v, k) {
c[v] = r(k);
},
size: function() {
return c.length;
},
clear: function() {
c = [];
},
remove: function(v) {
c[v] = null;
}
};
};
return A;
}({}, L, M));
C.register("$11", function(A, x) {
A.listen = function(y, u) {
function r() {
d[l ? "show" : "hide"]();
}
function c(b) {
a && k.setAttribute("size", 2 + b.length);
l = b;
r();
return b;
}
function h() {
m = null;
u(l);
}
function g(b) {
var f = k.value;
p && f === p && (f = "");
f !== l ? (m && clearTimeout(m), c(f), b ? m = setTimeout(h, b) : h()) : m && null == b && (clearTimeout(m), 
h());
}
var l, m, v = 150, k = y instanceof jQuery ? y[0] : y, p = x.attachEvent && k.getAttribute("placeholder"), a = 1 === Number(k.size), d = B('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
k.value = "";
g();
return !1;
});
c(k.value);
B(k).on("input", function() {
g(v);
return !0;
}).on("blur focus change", function() {
g(null);
return !0;
}).after(d);
r();
return {
delay: function(b) {
v = b;
return this;
},
ping: function(b) {
b ? (m && clearTimeout(m), b = k.value, p && b === p && (b = ""), c(b), h(), b = void 0) : b = g();
return b;
},
val: function(b) {
if (null == b) return l;
m && clearTimeout(m);
k.value = c(b);
r();
},
el: function() {
return k;
},
blur: function(b) {
return B(k).on("blur", b);
},
destroy: function() {
m && clearTimeout(m);
}
};
};
return A;
}({}, L, M));
C.register("$12", function(A, x, y) {
function u(g, l) {
return "function" == typeof g ? g.call(l) : g;
}
function r(g, l) {
this.$element = B(g);
this.options = l;
this.enabled = !0;
this.fixTitle();
}
A.init = function(g, l) {
var m = {
fade: !0,
offset: 5,
delayIn: c,
delayOut: h,
anchor: g.attr("data-anchor"),
gravity: g.attr("data-gravity") || "s"
};
l && (m = B.extend({}, m, l));
g.tipsy(m);
};
A.delays = function(g, l) {
c = g || 150;
h = l || 100;
};
A.kill = function() {
B("div.tipsy").remove();
};
A.text = function(g, l) {
l.data("tipsy").setTitle(g);
};
var c, h;
A.delays();
B(y.body).on("overlayOpened overlayClosing", function() {
A.kill();
return !0;
});
r.prototype = {
show: function() {
var g = this.getTitle();
if (g && this.enabled) {
var l = this.tip();
l.find(".tipsy-inner")[this.options.html ? "html" : "text"](g);
l[0].className = "tipsy";
l.remove().css({
top: 0,
left: 0
}).prependTo(y.body);
g = (g = this.options.anchor) ? this.$element.find(g) : this.$element;
g = B.extend({}, g.offset(), {
width: g[0].offsetWidth,
height: g[0].offsetHeight
});
var m = l[0].offsetWidth, v = l[0].offsetHeight, k = u(this.options.gravity, this.$element[0]);
switch (k.charAt(0)) {
case "n":
var p = {
top: g.top + g.height + this.options.offset,
left: g.left + g.width / 2 - m / 2
};
break;

case "s":
p = {
top: g.top - v - this.options.offset,
left: g.left + g.width / 2 - m / 2
};
break;

case "e":
p = {
top: g.top + g.height / 2 - v / 2,
left: g.left - m - this.options.offset
};
break;

case "w":
p = {
top: g.top + g.height / 2 - v / 2,
left: g.left + g.width + this.options.offset
};
}
2 == k.length && ("w" == k.charAt(1) ? p.left = g.left + g.width / 2 - 15 : p.left = g.left + g.width / 2 - m + 15);
l.css(p).addClass("tipsy-" + k);
l.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + k.charAt(0);
this.options.className && l.addClass(u(this.options.className, this.$element[0]));
l.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var g = this.$element, l = g.attr("title") || "";
(l || "string" !== typeof g.attr("original-title")) && g.attr("original-title", l).removeAttr("title");
},
getTitle: function() {
var g, l = this.$element, m = this.options;
this.fixTitle();
"string" == typeof m.title ? g = l.attr("title" == m.title ? "original-title" : m.title) : "function" == typeof m.title && (g = m.title.call(l[0]));
return (g = ("" + g).replace(/(^\s*|\s*$)/, "")) || m.fallback;
},
setTitle: function(g) {
var l = this.$element;
l.attr("default-title") || l.attr("default-title", this.getTitle());
null == g && (g = l.attr("default-title") || this.getTitle());
l.attr("original-title", g);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](g);
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
B.fn.tipsy = function(g) {
function l(a) {
var d = B.data(a, "tipsy");
d || (d = new r(a, B.fn.tipsy.elementOptions(a, g)), B.data(a, "tipsy", d));
return d;
}
function m() {
var a = l(this), d = g.delayIn;
a.hoverState = "in";
0 == d ? a.show() : (a.fixTitle(), setTimeout(function() {
"in" == a.hoverState && a.show();
}, d));
}
function v() {
var a = l(this), d = g.delayOut;
a.hoverState = "out";
0 == d ? a.hide() : (a.tip().removeClass("in"), setTimeout(function() {
"out" == a.hoverState && a.hide();
}, d));
}
g = B.extend({}, B.fn.tipsy.defaults, g);
g.live || this.each(function() {
l(this);
});
if ("manual" != g.trigger) {
var k = g.live ? "live" : "bind", p = "hover" == g.trigger ? "mouseleave" : "blur";
this[k]("hover" == g.trigger ? "mouseenter" : "focus", m)[k](p, v);
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
B.fn.tipsy.elementOptions = function(g, l) {
return B.metadata ? B.extend({}, l, B(g).metadata()) : l;
};
B.fn.tipsy.autoNS = function() {
return B(this).offset().top > B(y).scrollTop() + B(x).height() / 2 ? "s" : "n";
};
B.fn.tipsy.autoWE = function() {
return B(this).offset().left > B(y).scrollLeft() + B(x).width() / 2 ? "e" : "w";
};
B.fn.tipsy.autoBounds = function(g, l) {
return function() {
var m = l[0], v = 1 < l.length ? l[1] : !1, k = B(y).scrollTop() + g, p = B(y).scrollLeft() + g, a = B(this);
a.offset().top < k && (m = "n");
a.offset().left < p && (v = "w");
B(x).width() + B(y).scrollLeft() - a.offset().left < g && (v = "e");
B(x).height() + B(y).scrollTop() - a.offset().top < g && (m = "s");
return m + (v ? v : "");
};
};
return A;
}({}, L, M));
C.register("$36", function(A) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return C.require("$6", "string.js").trim(this, " \n\r\t");
});
A.html = function() {
function x() {
r = /[<>&]/g;
c = /(\r\n|\n|\r)/g;
h = /(?:https?):\/\/(\S+)/gi;
g = location.hostname;
x = null;
}
function y(l) {
return "&#" + l.charCodeAt(0) + ";";
}
function u(l, m) {
return '<a href="' + l + '" target="' + (m.indexOf(g) ? "_blank" : "_top") + '">' + m + "</a>";
}
var r, c, h, g;
return function(l, m) {
x && x();
l = l.replace(r, y);
m && (l = l.replace(h, u).replace(c, "<br />"));
return l;
};
}();
return A;
}({}, L, M));
C.register("$37", function(A) {
function x() {}
var y, u, r = C.require("$22", "rtl.json");
A.init = function() {
return new x();
};
A.cast = function(h) {
return h instanceof x ? h : "string" === typeof h ? A.parse(h) : A.clone(h);
};
A.clone = function(h) {
var g, l = new x();
for (g in h) l[g] = h[g];
return l;
};
A.parse = function(h) {
y || (u = /[-_+]/, y = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
h = String(h).split(u).join("-");
if (!y.exec(h)) return null;
var g = new x();
g.lang = RegExp.$1.toLowerCase();
if (h = RegExp.$2) g.script = h.charAt(0).toUpperCase() + h.substring(1).toLowerCase();
if (h = RegExp.$3) g.region = h.toUpperCase();
if (h = RegExp.$4) g.variant = h.toLowerCase();
if (h = RegExp.$5) g.extension = h;
return g;
};
var c = x.prototype;
c.isValid = function() {
return !!this.lang;
};
c.isKnown = function() {
var h = this.lang;
return !(!h || "zxx" === h);
};
c.toString = function(h) {
h = h || "-";
var g, l = this.lang || "zxx";
if (g = this.script) l += h + g;
if (g = this.region) l += h + g;
if (g = this.variant) l += h + g;
if (g = this.extension) l += h + g;
return l;
};
c.getIcon = function() {
for (var h = 4, g, l, m = [ "variant", "region", "script", "lang" ], v = []; 0 !== h--; ) if (g = m[h], 
l = this[g]) l.join && (l = l.join("-")), 1 === h && 3 === l.length ? v.push("region-m49") : v = v.concat([ g, g + "-" + l.toLowerCase() ]);
return v.join(" ");
};
c.isRTL = function() {
return !!r[String(this.script || this.lang).toLowerCase()];
};
c = null;
return A;
}({}, L, M));
C.register("$38", function(A, x) {
function y(h) {
x.console && console.error && console.error(h);
}
function u() {
y("Method not implemented");
}
function r() {}
function c() {}
r.prototype.toString = function() {
return "[Undefined]";
};
c.prototype._validate = function(h) {
var g, l = !0;
for (g in this) {
var m = this[g];
m === u ? (y(h + "." + g + "() must be implemented"), l = !1) : m instanceof r && (y(h + "." + g + " must be defined"), 
l = !1);
}
return l;
};
A.init = function(h, g) {
var l, m = new c();
if (h) for (l = h.length; 0 !== l--; ) m[h[l]] = u;
if (g) for (l = g.length; 0 !== l--; ) m[g[l]] = new r();
return m;
};
A.validate = function(h) {
var g = /function (\w+)\(/.exec(h.toString()) ? RegExp.$1 : "";
h.prototype._validate(g || "Object");
};
return A;
}({}, L, M));
C.register("$49", function(A, x) {
var y = x.requestAnimationFrame, u = x.cancelAnimationFrame, r = 0;
if (!y || !u) for (var c in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (y = x[c + "RequestAnimationFrame"]) if (u = x[c + "CancelAnimationFrame"] || x[c + "CancelRequestAnimationFrame"]) break;
y && u || (y = function(g) {
var l = h();
timeToCall = Math.max(0, 16 - (l - r));
nextTime = l + timeToCall;
timerId = x.setTimeout(function() {
g(nextTime);
}, timeToCall);
r = nextTime;
return timerId;
}, u = function(g) {
clearTimeout(g);
});
var h = Date.now || function() {
return new Date().getTime();
};
A.loop = function(g, l) {
function m() {
k = y(m, l);
g(v++);
}
var v = 0, k;
m();
return {
stop: function() {
k && u(k);
k = null;
}
};
};
return A;
}({}, L, M));
C.register("$46", function(A, x, y) {
function u(p, a, d, b) {
if (h) {
var f = d;
d = function(e) {
if ((e.MSPOINTER_TYPE_TOUCH || "touch") === e.pointerType) return f(e);
};
}
p.addEventListener(a, d, b);
return {
unbind: function() {
p.removeEventListener(a, d, b);
}
};
}
function r(p) {
p.preventDefault();
p.stopPropagation();
return !1;
}
var c, h = !!x.navigator.msPointerEnabled, g = h ? "MSPointerDown" : "touchstart", l = h ? "MSPointerMove" : "touchmove", m = h ? "MSPointerUp" : "touchend";
A.ok = function(p) {
null == c && (c = "function" === typeof y.body.addEventListener);
c && p && p(A);
return c;
};
A.ms = function() {
return h;
};
A.dragger = function(p, a) {
function d(n) {
p.addEventListener(n, f[n], !1);
}
function b(n) {
p.removeEventListener(n, f[n], !1);
}
var f = {};
f[g] = function(n) {
v(n, function(q, w) {
w.type = g;
a(n, w, e);
});
d(l);
d(m);
return !0;
};
f[m] = function(n) {
b(l);
b(m);
v(n, function(q, w) {
w.type = m;
a(n, w, e);
});
return !0;
};
f[l] = function(n) {
v(n, function(q, w) {
w.type = l;
a(n, w, e);
});
return r(n);
};
d(g);
var e = {
kill: function() {
b(g);
b(l);
b(m);
p = e = a = null;
}
};
return e;
};
A.swiper = function(p, a, d) {
function b(F) {
p.addEventListener(F, z[F], !1);
}
function f(F) {
p.removeEventListener(F, z[F], !1);
}
function e() {
n && n.stop();
n = null;
}
var n, q, w, z = {}, D = [], E = [], G = [];
z[g] = function(F) {
q = !1;
e();
var H = k();
v(F, function(I, O) {
D[I] = H;
E[I] = O.clientX;
G[I] = O.clientY;
});
w = p.scrollLeft;
return !0;
};
z[m] = function(F) {
v(F, function(H, I) {
var O = k() - D[H];
H = E[H] - I.clientX;
a(Math.abs(H) / O, H ? 0 > H ? -1 : 1 : 0);
});
w = null;
return !0;
};
z[l] = function(F) {
var H, I;
null == w || v(F, function(O, P) {
H = E[O] - P.clientX;
I = G[O] - P.clientY;
});
if (I && Math.abs(I) > Math.abs(H)) return q = !0;
H && (q = !0, p.scrollLeft = Math.max(0, w + H));
return r(F);
};
if (!h || d) b(g), b(l), b(m), h && (p.className += " mstouch");
return {
kill: function() {
f(g);
f(l);
f(m);
e();
},
swiped: function() {
return q;
},
ms: function() {
return h;
},
snap: function(F) {
h && !d && (p.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + F + "px)", 
p.style["-ms-scroll-snap-type"] = "mandatory", p.style["-ms-scroll-chaining"] = "none");
},
scroll: function(F, H, I) {
e();
var O = p.scrollLeft, P = F > O ? 1 : -1, T = Math[1 === P ? "min" : "max"], J = Math.round(16 * H * P);
return n = C.require("$49", "fps.js").loop(function(R) {
R && (O = Math.max(0, T(F, O + J)), p.scrollLeft = O, F === O && (e(), I && I(O)));
}, p);
}
};
};
A.start = function(p, a) {
return u(p, g, a, !1);
};
A.move = function(p, a) {
return u(p, l, a, !1);
};
A.end = function(p, a) {
return u(p, m, a, !1);
};
var v = A.each = function(p, a) {
if (h) (p.MSPOINTER_TYPE_TOUCH || "touch") === p.pointerType && a(0, p); else {
var d = -1;
for (p = (p.originalEvent || p).changedTouches || []; ++d < p.length; ) a(d, p[d]);
}
}, k = Date.now || function() {
return new Date().getTime();
};
return A;
}({}, L, M));
C.register("$50", function(A, x, y) {
A.init = function(u) {
function r() {
l.style.top = String(-u.scrollTop) + "px";
return !0;
}
function c() {
var v = l;
v.textContent = u.value;
v.innerHTML = v.innerHTML.replace(/[ \t]/g, h).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function h(v) {
return '<span class="x' + v.charCodeAt(0).toString(16) + '">' + v + "</span>";
}
var g = u.parentNode, l = g.insertBefore(y.createElement("div"), u);
B(u).on("input", c).on("scroll", r);
B(g).addClass("has-mirror");
l.className = "ta-mirror";
var m = u.offsetWidth - u.clientWidth;
2 < m && (l.style.marginRight = String(m - 2) + "px");
c();
r();
return {
kill: function() {
B(u).off("input", c).off("scroll", r);
g.removeChild(l);
l = null;
B(g).removeClass("has-mirror");
}
};
};
return A;
}({}, L, M));
C.register("$29", function(A, x, y) {
function u(h, g) {
var l = 0, m = -1;
g = g && x[g];
for (var v = r[h] || [], k = v.length; ++m < k; ) h = v[m], "function" === typeof h && (h(g), 
l++);
return l;
}
var r = {}, c;
A.load = function(h, g, l) {
function m() {
p && (clearTimeout(p), p = null);
a && (a.onreadystatechange = null, a = a = a.onload = null);
h && (delete r[h], h = null);
}
function v(d, b) {
d = a && a.readyState;
if (b || !d || "loaded" === d || "complete" === d) b || u(h, l), m();
}
function k() {
if (0 === u(h)) throw Error('Failed to load "' + (l || h) + '"');
m();
}
if (l && x[l]) "function" === typeof g && g(x[l]); else if (null != r[h]) r[h].push(g); else {
r[h] = [ g ];
var p = setTimeout(k, 4e3), a = y.createElement("script");
a.setAttribute("src", h);
a.setAttribute("async", "true");
a.onreadystatechange = v;
a.onload = v;
a.onerror = k;
a.onabort = m;
y.getElementsByTagName("head")[0].appendChild(a);
}
};
A.stat = function(h) {
var g;
if (!(g = c)) {
for (var l, m, v = y.getElementsByTagName("script"), k = -1, p = v.length; ++k < p; ) if (g = v[k].getAttribute("src")) if (l = g.indexOf("/lib/vendor"), 
-1 !== l) {
m = g.substring(0, l);
break;
}
g = c = m || "/static";
}
return g + h;
};
return A;
}({}, L, M));
C.register("$16", function(A, x, y) {
function u(k, p) {
k.setReadOnly(!1);
k.on("change", function(a, d) {
return p.val(d.getValue());
});
k.on("focus", function() {
return p.focus();
});
k.on("blur", function() {
return p.blur();
});
}
function r(k) {
k.off("change");
k.off("focus");
k.off("blur");
}
function c(k) {
r(k);
k.setReadOnly(!0);
k.setHighlightGutterLine(!1);
k.setHighlightActiveLine(!1);
}
function h(k, p) {
function a() {
this.HighlightRules = d;
}
var d = g(p);
k = k.require;
p = k("ace/lib/oop");
p.inherits(d, k("ace/mode/text_highlight_rules").TextHighlightRules);
p.inherits(a, k("ace/mode/text").Mode);
return new a();
}
function g(k) {
return function() {
var p = {
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
}, a = l(k);
"icu" === k ? p = {
start: p.start.concat([ {
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
} : a && p.start.push({
token: "printf",
regex: a
});
this.$rules = p;
};
}
function l(k) {
switch (k) {
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

case v:
return m || "%%";
}
}
var m, v = "auto";
A.init = function(k, p, a) {
var d, b = !1, f = a || v, e = k.parentNode, n = e.appendChild(y.createElement("div"));
B(e).addClass("has-proxy has-ace");
C.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(q) {
if (n) {
if (!q) throw Error("Failed to load code editor");
d = q.edit(n);
var w = d.session, z = d.renderer;
d.$blockScrolling = Infinity;
d.setShowInvisibles(b);
d.setWrapBehavioursEnabled(!1);
d.setBehavioursEnabled(!1);
d.setHighlightActiveLine(!1);
w.setUseSoftTabs(!1);
z.setShowGutter(!0);
z.setPadding(10);
z.setScrollMargin(8);
w.setMode(h(q, f));
d.setValue(k.value, -1);
w.setUseWrapMode(!0);
p ? u(d, p) : c(d);
}
}, "ace");
return {
kill: function() {
d && (r(d), d.destroy(), d = null);
n && (e.removeChild(n), B(e).removeClass("has-proxy has-ace"), n = null);
return this;
},
disable: function() {
d && c(d);
p = null;
return this;
},
enable: function(q) {
p = q;
d && u(d, q);
return this;
},
resize: function() {
d && d.resize();
return this;
},
val: function(q) {
d && q !== d.getValue() && d.setValue(q, -1);
return this;
},
invs: function(q) {
q = q || !1;
b !== q && (b = q, d && d.setShowInvisibles(q));
return this;
},
strf: function(q) {
q = q || v;
q !== f && (f = q, d && d.session.setMode(h(x.ace, q)));
return this;
},
focus: function() {
return this;
}
};
};
A.strf = function(k, p) {
v = k;
m = p;
return A;
};
return A;
}({}, L, M));
C.register("$51", function(A, x, y) {
function u(g, l) {
function m() {
return l.val(g.getContent());
}
g.on("input", m);
g.on("change", m);
g.on("focus", function() {
return l.focus();
});
g.on("blur", function() {
return l.blur();
});
g.setMode("design");
}
function r(g) {
g.off("input");
g.off("change");
g.off("focus");
g.off("blur");
}
function c(g) {
r(g);
g.setMode("readonly");
}
var h = 0;
A.load = function(g) {
var l = C.require("$29", "remote.js");
l.load(l.stat("/lib/tinymce.min.js"), g, "tinymce");
return A;
};
A.init = function(g, l) {
function m(q) {
a = q;
d = "<p>" === q.substring(0, 3) && "</p>" === q.substring(q.length - 4);
return q.replace(/(<\/?)script/gi, "$1loco:script");
}
function v(q) {
k = q;
q._getContent = q.getContent;
q.getContent = function(w) {
w = this._getContent(w);
w = w.replace(/(<\/?)loco:script/gi, "$1script");
if (!d && "<p>" === w.substring(0, 3) && "</p>" === w.substring(w.length - 4)) {
var z = w.substring(3, w.length - 4);
if (z === a || -1 === z.indexOf("</p>")) w = z;
}
return w;
};
q._setContent = q.setContent;
q.setContent = function(w, z) {
return this._setContent(m(w), z);
};
l ? (u(q, l), l.reset()) : c(q);
B(e).removeClass("loading");
}
var k, p = !1, a = "", d = !1, b = g.parentNode, f = b.parentNode, e = b.appendChild(y.createElement("div")), n = f.insertBefore(y.createElement("nav"), b);
n.id = "_tb" + String(++h);
B(b).addClass("has-proxy has-mce");
B(e).addClass("mce-content-body loading").html(m(g.value));
A.load(function(q) {
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
init_instance_callback: v
});
});
return {
val: function(q) {
q = m(q);
null == k ? (g.value = q, B(e).html(q)) : k.getContent() !== q && k.setContent(q);
l && l.val(q);
return this;
},
kill: function() {
k && (l && l.val(k.getContent()), r(k), k.destroy(), k = null);
e && (b.removeChild(e), B(b).removeClass("has-proxy has-mce"), e = null);
n && (f.removeChild(n), n = null);
return this;
},
enable: function(q) {
l = q;
k && u(k, q);
return this;
},
disable: function() {
k && c(k);
l = null;
return this;
},
focus: function() {
k && l && k.focus();
return this;
},
invs: function(q) {
q = q || !1;
p !== q && (p = q, B(b)[q ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return A;
}({}, L, M));
C.register("$47", function(A) {
function x(c) {
function h() {
k && (p.off("input", g), k = !1);
}
function g() {
var f = c.value;
f !== d && (p.trigger("changing", [ f, d ]), d = f);
}
function l() {
g();
k && b !== d && p.trigger("changed", [ d ]);
}
function m() {
u = c;
b = d;
k || (p.on("input", g), k = !0);
p.trigger("editFocus");
a.addClass("has-focus");
return !0;
}
function v() {
u === c && (u = null);
p.trigger("editBlur");
a.removeClass("has-focus");
k && (l(), h());
return !0;
}
var k = !1, p = B(c), a = B(c.parentNode), d = c.value, b;
p.on("blur", v).on("focus", m);
return {
val: function(f) {
d !== f && (c.value = f, p.triggerHandler("input"), d = f);
return !0;
},
kill: function() {
h();
p.off("blur", v).off("focus", m);
},
fire: function() {
d = null;
g();
},
ping: l,
blur: v,
focus: m,
reset: function() {
b = d = c.value;
}
};
}
function y(c) {
this.e = c;
}
var u;
A._new = function(c) {
return new y(c);
};
A.init = function(c) {
var h = new y(c);
c.disabled ? (c.removeAttribute("disabled"), h.disable()) : c.readOnly ? h.disable() : h.enable();
return h;
};
var r = y.prototype;
r.destroy = function() {
this.unlisten();
var c = this.p;
c && (c.kill(), this.p = null);
this.e = null;
};
r.reload = function(c, h) {
var g = this.l;
g && !h && (this.disable(), g = null);
this.val(c || "");
h && !g && this.enable();
return this;
};
r.val = function(c) {
var h = this.e;
if (null == c) return h.value;
var g = this.l, l = this.p;
l && l.val(c);
g && g.val(c);
g || h.value === c || (h.value = c, B(h).triggerHandler("input"));
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
var c = this.p;
c ? c.focus() : B(this.e).focus();
};
r.focused = function() {
return u && u === this.el;
};
r.parent = function() {
return this.e.parentNode;
};
r.attr = function(c, h) {
var g = this.e;
if (1 === arguments.length) return g.getAttribute(c);
null == h ? g.removeAttribute(c) : g.setAttribute(c, h);
return this;
};
r.editable = function() {
return !!this.l;
};
r.enable = function() {
var c = this.p;
this.e.removeAttribute("readonly");
this.listen();
c && c.enable && c.enable(this.l);
return this;
};
r.disable = function() {
var c = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
c && c.disable && c.disable();
return this;
};
r.listen = function() {
var c = this.l;
c && c.kill();
this.l = x(this.e);
return this;
};
r.unlisten = function() {
var c = this.l;
c && (c.kill(), this.l = null);
return this;
};
r.setInvs = function(c, h) {
var g = this.i || !1;
if (h || g !== c) this._i && (this._i.kill(), delete this._i), (h = this.p) ? h.invs && h.invs(c) : c && (this._i = C.require("$50", "mirror.js").init(this.e)), 
this.i = c;
return this;
};
r.getInvs = function() {
return this.i || !1;
};
r.setMode = function(c) {
var h = this.p, g = this.i || !1;
c !== (this.m || "") && (this.m = c, h && h.kill(), this.p = h = "code" === c ? C.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === c ? C.require("$51", "mce.js").init(this.e, this.l) : null, 
this.setInvs(g, !0), u && this.focus());
return this;
};
r.setStrf = function(c) {
this["%"] = c;
"code" === this.m && this.p.strf(c);
return this;
};
r.name = function(c) {
this.e.setAttribute("name", c);
return this;
};
r.placeholder = function(c) {
this.e.setAttribute("placeholder", c);
return this;
};
r.redraw = function() {
var c = this.p;
c && c.resize && c.resize();
};
r = null;
return A;
}({}, L, M));
C.register("$48", function(A, x, y) {
function u(b) {
const f = x.console;
f && f.error && f.error(b);
}
function r(b) {
const f = y.createElement("div");
b && f.setAttribute("class", b);
return f;
}
function c(b) {
return function() {
b.resize();
return this;
};
}
function h(b) {
return function(f) {
let e = f.target, n = e.$index;
for (;null == n && "DIV" !== e.nodeName && (e = e.parentElement); ) n = e.$index;
null != n && (f.stopImmediatePropagation(), b.select(n));
return !0;
};
}
function g(b) {
return function() {
b.redrawDirty() && b.redraw();
return !0;
};
}
function l(b) {
return function(f) {
var e = f.keyCode;
if (40 === e) e = 1; else if (38 === e) e = -1; else return !0;
if (f.shiftKey || f.ctrlKey || f.metaKey || f.altKey) return !0;
b.selectNext(e);
f.stopPropagation();
f.preventDefault();
return !1;
};
}
function m(b, f, e) {
function n(q) {
u("row[" + q + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(q) {
const w = f || 0, z = e ? -1 : 1, D = b.rows || [];
q.sort(function(E, G) {
return z * (D[E] || n(E)).cellVal(w).localeCompare((D[G] || n(G)).cellVal(w));
});
};
}
function v(b) {
this.w = b;
}
function k(b) {
this.t = b;
this.length = 0;
}
function p(b, f, e) {
let n = y.createElement("div");
n.className = e || "";
this._ = n;
this.d = f || [];
this.i = b || 0;
this.length = f.length;
}
function a(b) {
this.live = b;
this.rows = [];
}
A.create = function(b) {
return new v(b);
};
var d = v.prototype;
d.init = function(b) {
let f = this.w, e = f.id;
var n = f.splity(e + "-thead", e + "-tbody"), q = n[0];
n = n[1];
let w = [], z = [], D = [], E = [];
if (b) this.ds = b, this.idxs = z, this._idxs = null; else if (!(b = this.ds)) throw Error("No datasource");
q.css.push("wg-thead");
n.css.push("wg-tbody");
b.eachCol(function(P, T, J) {
D[P] = e + "-col-" + T;
E[P] = J || T;
});
var G = r();
let F = -1, H = D.length, I = r("wg-cols"), O = q.splitx.apply(q, D);
for (;++F < H; ) O[F].header(E[F]), I.appendChild(G.cloneNode(!1)).setAttribute("for", D[F]);
b.eachRow(function(P, T, J) {
w[P] = new p(P, T, J);
z[P] = P;
});
this.rows = w;
this.cols = I;
this.ww = null;
this.root = G = n.body;
this.head = q;
q.redraw = c(this);
q = n.fixed = O[0].bodyY() || 20;
f.lock().resize(q, n);
f.css.push("is-table");
f.restyle();
this.sc ? this._re_sort(H) : b.sort && b.sort(z);
this.redrawDirty();
this.render();
B(G).attr("tabindex", "-1").on("keydown", l(this)).on("mousedown", h(this)).on("scroll", g(this));
return this;
};
d.clear = function() {
const b = this.pages || [];
let f = b.length;
for (;0 !== f--; ) b[f].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
d.render = function() {
let b, f = [], e = this.rows || [], n = -1, q, w = this.idxs, z = w.length, D = this.idxr = {}, E = this.r, G = this._r, F = this.root, H = this.cols;
for (;++n < z; ) {
if (0 === n % 100) {
var I = H.cloneNode(!0);
b = new a(I);
b.h = 2200;
b.insert(F);
f.push(b);
}
q = w[n];
D[q] = n;
I = e[q];
if (null == I) throw Error("Render error, no data at [" + q + "]");
I.page = b;
b.rows.push(I);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = f;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == E ? null != G && (I = e[G]) && I.page && (delete this._r, this.select(G, !0)) : (I = e[E]) && I.page ? this.select(E, !0) : (this.deselect(), 
this._r = E);
return this;
};
d.resize = function() {
let b = -1, f = this.ww || (this.ww = []);
var e = this.w;
let n = e.cells[0], q = n.body.childNodes, w = q.length, z = this.pages || [], D = z.length;
for (e.redraw.call(n); ++b < w; ) f[b] = q[b].style.width;
if (D) {
e = this.mx;
for (b = this.mn; b <= e; b++) z[b].widths(f);
this.redrawDirty() && this.redraw();
}
};
d.redrawDirty = function() {
let b = !1;
var f = this.root;
const e = f.scrollTop;
f = f.clientHeight;
this.sy !== e && (b = !0, this.sy = e);
this.vh !== f && (b = !0, this.vh = f);
return b;
};
d.redraw = function() {
let b = 0, f = -1, e = null, n = null, q = this.ww;
var w = this.sy;
let z = this.mn, D = this.mx, E = Math.max(0, w - 100);
w = this.vh + w + 100;
let G, F = this.pages || [], H = F.length;
for (;++f < H && !(b > w); ) G = F[f], b += G.height(), b < E || (null === e && (e = f), 
n = f, G.rendered || G.render(q));
if (z !== e) {
if (null !== z && e > z) for (f = z; f < e; f++) {
G = F[f];
if (!G) throw Error("Shit!");
G.rendered && G.sleep();
}
this.mn = e;
}
if (D !== n) {
if (null !== D && n < D) for (f = D; f > n; f--) G = F[f], G.rendered && G.sleep();
this.mx = n;
}
};
d.selected = function() {
return this.r;
};
d.thead = function() {
return this.w.cells[0];
};
d.tbody = function() {
return this.w.cells[1];
};
d.tr = function(b) {
return (b = this.row(b)) ? b.cells() : [];
};
d.row = function(b) {
return this.rows[b];
};
d.td = function(b, f) {
return this.tr(b)[f];
};
d.next = function(b, f, e) {
null == e && (e = this.r || 0);
const n = this.idxs, q = n.length;
let w = e = (this.idxr || {})[e];
for (;e !== (w += b) && !(0 <= w && q > w); ) if (f && q) w = 1 === b ? -1 : q, 
f = !1; else return null;
e = n[w];
return null == e || null == this.rows[e] ? (u("Bad next: [" + w + "] does not map to data row"), 
null) : e;
};
d.selectNext = function(b, f, e) {
b = this.next(b, f);
null != b && this.r !== b && this.select(b, e);
return this;
};
d.deselect = function(b) {
const f = this.r;
null != f && (this.r = null, B(this.tr(f)).removeClass("selected"), this.w.fire("wgRowDeselect", [ f, b ]));
return this;
};
d.selectRow = function(b, f) {
return this.select(this.idxs[b], f);
};
d.select = function(b, f) {
const e = this.rows[b];
var n = e && e.page;
if (!n) return this.deselect(!1), u("Row is filtered out"), this;
this.deselect(!0);
let q, w = this.w.cells[1];
n.rendered || (q = n.top(), w.scrollY(q), this.redrawDirty() && this.redraw());
if (!e.rendered) return n.rendered || u("Failed to render page"), u("Row [" + e.i + "] not rendered"), 
this;
n = e.cells();
B(n).addClass("selected");
this.r = b;
f || (q = w.scrollY(), B(this.root).focus(), q !== w.scrollY() && w.scrollY(q));
w.scrollTo(n[0], !0);
this.w.fire("wgRowSelect", [ b, e.data() ]);
return this;
};
d.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
d.filter = function(b) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(b);
return this.clear().render();
};
d.each = function(b) {
let f, e = -1;
const n = this.rows || [], q = this.idxs || [], w = q.length;
for (;++e < w; ) f = q[e], b(n[f], e, f);
return this;
};
d.sortable = function(b) {
const f = this.sc || (this.sc = new k(this));
f.has(b) || f.add(b);
return this;
};
d._re_sort = function(b) {
let f = -1, e = this.sc, n = e.active;
for (this.sc = e = new k(this); ++f < b; ) e.add(f);
n && (f = this.head.indexOf(n.id), -1 === f && (f = Math.min(n.idx, b - 1)), this.sort(f, n.desc));
return this;
};
d._sort = function(b, f) {
f ? (this.s = f, f(b)) : (f = this.s) && f(b);
return b;
};
d.sort = function(b, f) {
this._sort(this.idxs, m(this, b, f));
this.sc.activate(b, f);
return this;
};
d = null;
d = k.prototype;
d.has = function(b) {
return null != this[b];
};
d.add = function(b) {
const f = this, e = f.t.head.cells[b];
f[b] = {
desc: null,
idx: b,
id: e.id
};
f.length++;
e.addClass("wg-sortable").on("click", function(n) {
if ("header" === n.target.nodeName.toLowerCase()) return n.stopImmediatePropagation(), 
f.toggle(b), !1;
});
return f;
};
d.toggle = function(b) {
this.t.sort(b, !this[b].desc).clear().render();
return this;
};
d.activate = function(b, f) {
let e, n = this.active, q = this[b], w = this.t.head.cells;
n && (e = w[n.idx]) && (e.removeClass(n.css), n !== q && e.restyle());
(e = w[b]) ? (q.desc = f, this.active = q, b = "wg-" + (f ? "desc" : "asc"), e.addClass(b).restyle(), 
q.css = b) : this.active = null;
return this;
};
d = null;
d = p.prototype;
d.render = function(b) {
let f, e = [], n = this._, q = this.length;
if (n) {
for (this.c = e; 0 !== q--; ) f = n.cloneNode(!1), e[q] = this.update(q, f), f.$index = this.i, 
b[q].appendChild(f);
this._ = null;
} else for (e = this.c; 0 !== q--; ) b[q].appendChild(e[q]);
this.rendered = !0;
return this;
};
d.update = function(b, f) {
f = f || this.c[b] || {};
b = (this.d[b] || function() {})() || " ";
null == b.innerHTML ? f.textContent = b : f.innerHTML = b.innerHTML;
return f;
};
d.cells = function() {
return this.c || [ this._ ];
};
d.data = function() {
let b = -1;
const f = [], e = this.length;
for (;++b < e; ) f[b] = this.cellVal(b);
return f;
};
d.destroy = function() {
this.page = null;
this.rendered = !1;
};
d.cellVal = function(b) {
b = this.d[b]() || "";
return String(b.textContent || b);
};
d = null;
d = a.prototype;
d.size = function() {
return this.rows.length;
};
d.insert = function(b) {
const f = this.h, e = r("wg-dead");
e.style.height = String(f) + "px";
b.appendChild(e);
return this.dead = e;
};
d.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
d.height = function() {
let b = this.h;
null == b && (this.h = b = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
b || u("row has zero height");
return b;
};
d.render = function(b) {
let f, e = -1, n = this.rows, q = n.length;
const w = this.dead, z = this.live, D = z.childNodes;
for (;++e < q; ) f = n[e], f.rendered || f.render(D);
q = b.length;
for (e = 0; e < q; e++) D[e].style.width = b[e];
w.parentNode.replaceChild(z, w);
this.rendered = !0;
this.h = null;
return this;
};
d.sleep = function() {
const b = this.height(), f = this.live, e = this.dead;
e.style.height = String(b) + "px";
f.parentNode.replaceChild(e, f);
this.rendered = !1;
this.h = b;
return this;
};
d.sleepH = function(b) {
b *= this.rows.length;
const f = this.dead;
f && (f.style.height = String(b) + "px");
this.rendered || (this.h = b);
return this;
};
d.widths = function(b) {
const f = this.live.childNodes;
let e = b.length;
for (;0 !== e--; ) f[e].style.width = b[e];
return this;
};
d.destroy = function() {
var b = this.rendered ? this.live : this.dead;
const f = this.rows;
b.parentNode.removeChild(b);
for (b = f.length; 0 !== b--; ) f[b].destroy();
};
d = null;
return A;
}({}, L, M));
C.register("$39", function(A, x, y) {
function u(e, n) {
var q = e.id;
let w = q && d[q], z = w && w.parent();
if (!w || !z) return null;
var D = 1 === z.dir;
q = D ? "X" : "Y";
let E = "page" + q;
D = D ? a : p;
let G = D(z.el);
q = n["offset" + q];
let F = z.el, H = F.className;
null == q && (q = n[E] - D(e));
q && (G += q);
F.className = H + " is-resizing";
return {
done: function() {
F.className = H;
},
move: function(I) {
z.resize(I[E] - G, w);
return !0;
}
};
}
function r(e) {
function n() {
B(y).off("mousemove", q);
f && (f.done(), f = null);
return !0;
}
function q(w) {
f ? f.move(w) : n();
return !0;
}
if (f) return !0;
f = u(e.target, e);
if (!f) return !0;
B(y).one("mouseup", n).on("mousemove", q);
return h(e);
}
function c(e, n) {
const q = n.type;
"touchmove" === q ? f && f.move(n) : "touchstart" === q ? f = u(e.target, n) : "touchend" === q && f && (f.done(), 
f = null);
}
function h(e) {
e.stopPropagation();
e.preventDefault();
return !1;
}
function g(e) {
b && b.redraw();
e && e.redraw();
return b = e;
}
function l(e, n) {
const q = B(n);
q.on("editFocus", function() {
q.trigger("wgFocus", [ g(e) ]);
}).on("editBlur", function() {
q.trigger("wgBlur", [ g(null) ]);
});
}
function m(e) {
const n = e.id, q = e.className;
this.id = n;
this.el = e;
this.pos = this.index = 0;
this.css = [ q || "wg-root", "wg-cell" ];
this._cn = q;
d[n] = this;
this.clear();
}
const v = C.include("$45", "html.js") || C.include("$2", "html.js", !0), k = C.require("$21", "dom.js"), p = k.top, a = k.left, d = {};
let b, f = !1;
A.init = function(e) {
const n = new m(e);
n.redraw();
C.require("$46", "touch.js").ok(function(q) {
q.dragger(e, c);
});
B(e).on("mousedown", r);
return n;
};
x = m.prototype;
x.fire = function(e, n) {
e = B.Event(e);
e.cell = this;
B(this.el).trigger(e, n);
return this;
};
x.each = function(e) {
let n = -1;
const q = this.cells, w = q.length;
for (;++n < w; ) e(q[n], n);
return this;
};
x.indexOf = function(e) {
return (e = d[e.id || String(e)]) && e.pid === this.id ? e.index : -1;
};
x.on = function() {
return this.$("on", arguments);
};
x.off = function() {
return this.$("off", arguments);
};
x.find = function(e) {
return B(this.el).find(e);
};
x.$ = function(e, n) {
B.fn[e].apply(B(this.el), n);
return this;
};
x.addClass = function(e) {
this.css.push(e);
return this;
};
x.removeClass = function(e) {
e = this.css.indexOf(e);
-1 !== e && this.css.splice(e, 1);
return this;
};
x.parent = function() {
return this.pid && d[this.pid];
};
x.splitx = function() {
return this._split(1, arguments);
};
x.splity = function() {
return this._split(2, arguments);
};
x._split = function(e, n) {
(this.length || this.field) && this.clear();
let q = -1;
let w = n.length, z = 1 / w, D = 0;
for (;++q < w; ) {
var E = k.el();
this.body.appendChild(E);
var G = E;
{
var F = n[q];
let H = 1, I = F;
for (;d[F]; ) F = I + "-" + ++H;
}
G.id = F;
E = new m(E);
E.index = q;
E.pid = this.id;
E._locale(this.lang, this.rtl);
E.pos = D;
D += z;
this.cells.push(E);
this.length++;
}
this.dir = e;
this.redraw();
return this.cells;
};
x.destroy = function() {
this.clear();
delete d[this.id];
const e = this.el;
e.innerHTML = "";
this.body = null;
e.className = this._cn || "";
B(e).off();
return this;
};
x.exists = function() {
return this === d[this.id];
};
x.clear = function() {
const e = this.el, n = this.cells, q = this.field, w = this.body, z = this.nav;
let D = this.length || 0;
for (;0 !== D--; ) delete d[n[D].destroy().id];
this.cells = [];
this.length = 0;
z && (e.removeChild(z), this.nav = null);
w && (q && (q.destroy(), this.field = null), this.table && (this.table = null), 
e === w.parentNode && e.removeChild(w));
this.body = e.appendChild(k.el("", "wg-body"));
this._h = null;
return this;
};
x.resize = function(e, n) {
if (!n && (n = this.cells[1], !n)) return;
var q = n.index;
let w = this.cells, z = B(this.el)[1 === this.dir ? "width" : "height"](), D = w[q + 1];
q = w[q - 1];
n.pos = Math.min((D ? D.pos * z : z) - ((n.body || n.el.firstChild).offsetTop || 0), Math.max(q ? q.pos * z : 0, e)) / z;
this.redraw();
return this;
};
x.distribute = function(e) {
let n = -1, q = 0, w;
const z = this.cells, D = e.length;
for (;++n < D && (w = z[++q]); ) w.pos = Math.max(0, Math.min(1, e[n]));
this.redraw();
return this;
};
x.distribution = function() {
let e = [], n = 0;
const q = this.cells, w = q.length - 1;
for (;n < w; ) e[n] = q[++n].pos;
return e;
};
x.restyle = function() {
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
x.redraw = function(e) {
this.restyle();
const n = this.el;
var q = this.body, w = this.field;
if (q) {
var z = n.clientWidth || 0, D = n.clientHeight || 0, E = q.offsetTop || 0;
D = E > D ? 0 : D - E;
if (this._h !== D) {
this._h = D;
q.style.height = String(D) + "px";
var G = w;
}
this._w !== z && (this._w = z, G = w);
G && G.redraw();
}
q = this.length;
z = 1;
D = this.nav;
for (E = 2 === this.dir ? "height" : "width"; 0 !== q--; ) w = this.cells[q], D ? G = 1 : (w.fixed && (w.pos = w.fixed / B(n)[E]()), 
G = z - w.pos, z = w.pos), w.el.style[E] = String(100 * G) + "%", w.redraw(e);
return this;
};
x.contents = function(e, n) {
const q = this.el;
let w = this.body;
if (null == e) return w.innerHTML;
this.length ? this.clear() : w && (q.removeChild(w), w = null);
w || (this.body = w = q.appendChild(k.el("", n || "wg-content")), this._h = null, 
(n = this.lang) && this._locale(n, this.rtl, !0));
"string" === typeof e ? B(w)._html(e) : e && this.append(e);
this.redraw();
return this;
};
x.textarea = function(e, n) {
let q = this.field;
if (q) {
var w = q.editable();
q.reload(e, n);
w !== n && this.restyle();
} else this.length && this.clear(), w = k.el("textarea"), w.setAttribute("wrap", "virtual"), 
w.value = e, this.contents(w), q = C.require("$47", "field.js")._new(w)[n ? "enable" : "disable"](), 
l(this, w), this.field = q, this.restyle();
this.lang || this.locale("en");
return q;
};
x.locale = function(e) {
e = C.require("$37", "locale.js").cast(e);
return this._locale(String(e), e.isRTL());
};
x._locale = function(e, n, q) {
const w = this.body;
if (q || e !== this.lang) this.lang = e, w && w.setAttribute("lang", e);
if (q || n !== this.rtl) this.rtl = n, w && w.setAttribute("dir", n ? "RTL" : "LTR");
return this;
};
x.editable = function() {
let e = this.field;
if (e) return e.editable() ? e : null;
let n = this.cells, q = n.length, w = this.navigated();
if (null != w) return n[w].editable();
for (;++w < q; ) if (e = n[w].editable()) return e;
};
x.eachTextarea = function(e) {
const n = this.field;
n ? e(n) : this.each(function(q) {
q.eachTextarea(e);
});
return this;
};
x.append = function(e) {
e && (e.nodeType ? v.init(this.body.appendChild(e)) : v.init(B(e).appendTo(this.body)));
return this;
};
x.prepend = function(e) {
const n = this.body;
if (e.nodeType) {
const q = n.firstChild;
v.init(q ? n.insertBefore(e, q) : n.appendChild(e));
} else v.init(B(e).prependTo(n));
return this;
};
x.before = function(e) {
const n = this.body;
e.nodeType ? v.init(this.el.insertBefore(e, n)) : v.init(B(e).insertBefore(n));
return this;
};
x.header = function(e, n) {
if (null == e && null == n) return this.el.getElementsByTagName("header")[0];
this.t = k.txt(e || "");
this.el.insertBefore(k.el("header", n), this.body).appendChild(this.t);
this.redraw();
return this;
};
x.title = function(e) {
const n = this.t;
if (n) return n.nodeValue = e || "", n;
this.header(e);
return this.t;
};
x.titled = function() {
return this.t && this.t.nodeValue;
};
x.bodyY = function() {
return p(this.body, this.el);
};
x.scrollY = function(e) {
if (ja === e) return this.body.scrollTop;
this.body.scrollTop = e;
};
x.tabulate = function(e) {
let n = this.table;
n ? n.clear() : n = C.require("$48", "wgtable.js").create(this);
n.init(e);
return this.table = n;
};
x.lock = function() {
this.body.className += " locked";
return this;
};
x.scrollTo = function(e, n) {
let q = this.body;
var w = q.scrollTop;
let z = p(e, q);
if (w > z) w = z; else {
const D = q.clientHeight;
e = z + B(e).outerHeight();
if (D + w < e) w = e - D; else return;
}
n ? q.scrollTop = w : B(q).stop(!0).animate({
scrollTop: w
}, 250);
};
x.navigize = function(e, n) {
function q(H) {
const I = D[H], O = z[H], P = B(I.el).show();
O.addClass("active");
G = H;
F.data("idx", H);
I.fire("wgTabSelect", [ H ]);
return P;
}
const w = this, z = [], D = w.cells;
let E = w.nav, G;
E && w.el.removeChild(E);
E = w.nav = w.el.insertBefore(k.el("nav", "wg-tabs"), w.body);
const F = B(E).on("click", function(H) {
const I = B(H.target).data("idx");
if (null == I) return !0;
if (null != G) {
{
const O = z[G];
B(D[G].el).hide();
O.removeClass("active");
}
}
q(I);
w.redraw();
return h(H);
});
null == n && (n = F.data("idx") || 0);
w.each(function(H, I) {
z[I] = B('<a href="#' + H.id + '"></a>').data("idx", I).text(e[I]).appendTo(F);
H.pos = 0;
B(H.el).hide();
});
q(D[n] ? n : 0);
w.lock();
w.redraw();
return w;
};
x.navigated = function() {
const e = this.nav;
if (e) return B(e).data("idx");
};
x = null;
return A;
}({}, L, M));
C.register("$24", function(A, x, y) {
function u(a) {
var d = [];
a && (a.saved() || d.push("po-unsaved"), a.fuzzy() ? d.push("po-fuzzy") : a.flagged() && d.push("po-flagged"), 
a.valid() || d.push("po-error"), a.translation() || d.push("po-empty"), a.comment() && d.push("po-comment"));
return d.join(" ");
}
function r(a, d, b) {
d = B(a.title(d).parentNode);
var f = d.find("span.lang");
b ? (b = C.require("$37", "locale.js").cast(b), f.length || (f = B("<span></span>").prependTo(d)), 
f.attr("lang", b.lang).attr("class", b.getIcon() || "lang region region-" + (b.region || "zz").toLowerCase())) : (f.remove(), 
b = "en");
a.locale(b);
return d;
}
function c(a, d, b) {
d.on("click", function(f) {
var e = a.fire(b, [ f.target ]);
e || f.preventDefault();
return e;
});
}
function h() {
this.dirty = 0;
}
C.require("$3", "number.js");
var g, l, m = C.require("$36", "string.js").html, v = C.require("$6", "string.js").sprintf;
A.extend = function(a) {
return a.prototype = new h();
};
A.localise = function(a) {
l = a;
return A;
};
var k = function() {
var a = y.createElement("p"), d = /(src|href|on[a-z]+)\s*=/gi;
return function(b) {
a.innerHTML = b.replace(d, "data-x-loco-$1=");
var f = a.textContent.trim();
return f ? f.replace("data-x-loco-", "") : b.trim();
};
}(), p = h.prototype = C.require("$38", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
p.init = function() {
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
p.t = function() {
return this.$t || l || C.require("$1", "t.js").init();
};
p.localise = function(a) {
a || (a = this.t());
var d = [];
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
p.setRootCell = function(a) {
function d(f) {
b.redraw(!0, f);
return !0;
}
var b = C.require("$39", "wingrid.js").init(a);
B(x).on("resize", d);
this.redraw = d;
B(a).on("wgFocus wgBlur", function(f, e) {
f.stopPropagation();
g = e;
});
this.destroy = function() {
b.destroy();
B(x).off("resize", d);
};
this.rootDiv = a;
return b;
};
p.$ = function() {
return B(this.rootDiv);
};
p.setListCell = function(a) {
var d = this;
d.listCell = a;
a.on("wgRowSelect", function(b, f) {
d.loadMessage(d.po.row(f));
return !0;
}).on("wgRowDeselect", function(b, f, e) {
e || d.loadNothing();
return !0;
});
};
p.setSourceCell = function(a) {
this.sourceCell = a;
};
p.setTargetCell = function(a) {
this.targetCell = a;
};
p.next = function(a, d, b) {
for (var f = this.listTable, e = f.selected(), n = e, q, w = this.po; null != (e = f.next(a, b, e)); ) {
if (n === e) {
e = null;
break;
}
if (d && (q = w.row(e), q.translated(0))) continue;
break;
}
null != e && f.select(e, !0);
return e;
};
p.current = function(a) {
var d = this.active;
if (null == a) return d;
a ? a.is(d) ? this.reloadMessage(a) : this.loadMessage(a) : this.unloadActive();
return this;
};
p.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
p.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
p.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
p.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
p.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
p.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
p.rebuildSearch = function() {
var a = -1, d = this.po.rows, b = d.length, f = this.dict;
for (f.clear(); ++a < b; ) f.add(a, d[a].toText());
};
p.filtered = function() {
return this.lastSearch || "";
};
p.filter = function(a, d) {
var b = this.listTable, f = this.lastFound, e = this.lastSearch;
if (a) {
if (e === a) return f || 0;
if (e && !f && 0 === a.indexOf(e)) return 0;
var n = this.dict.find(a);
}
this.lastSearch = e = a;
this.lastFound = f = n ? n.length : this.po.length;
n ? b.filter(n) : b.unfilter();
d || this.fire("poFilter", [ e, f ]);
return f;
};
p.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
p.unsave = function(a, d) {
var b = !1;
if (a) {
if (b = a.saved(d)) this.dirty++, a.unsave(d), this.fire("poUnsaved", [ a, d ]);
this.markUnsaved(a);
}
return b;
};
p.markUnsaved = function(a) {
var d = this.po.indexOf(a);
if ((d = this.listTable.tr(d)) && d.length) {
var b = d[0].className;
a = b.replace(/(?:^| +)po-[a-z]+/g, "") + " " + u(a);
a !== b && B(d).attr("class", a);
}
};
p.save = function(a) {
var d = this.po;
if (this.dirty || a) d.each(function(b, f) {
f.save();
}), this.listCell.find("div.po-unsaved").removeClass("po-unsaved"), this.dirty = 0, 
this.fire("poSave", []);
return d;
};
p.fire = function(a, d) {
var b = this.handle;
if (b && b[a] && !1 === b[a].apply(this, d || [])) return !1;
a = B.Event(a);
this.$().trigger(a, d);
return !a.isDefaultPrevented();
};
p.on = function(a, d) {
this.$().on(a, d);
return this;
};
p.getSorter = function() {
return null;
};
p.reload = function() {
var a = this, d, b = a.listCell, f = a.listTable, e = a.po, n = e && e.locale(), q = n && n.isRTL(), w = e && e.length || 0;
if (!e || !e.row) return b && b.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = n;
a.lastSearch && (a.lastSearch = "", a.lastFound = w, a.fire("poFilter", [ "", w ]));
f && (d = f.thead().distribution());
a.listTable = f = b.tabulate({
eachCol: function(D) {
var E, G = a.getListColumns(), F = a.getListHeadings();
for (E in G) {
var H = G[E];
D(H, E, F[H]);
}
},
eachRow: function(D) {
e.each(function(E, G) {
a.validate(G);
D(G.idx, a.getListEntry(G), u(G));
});
},
sort: a.getSorter()
});
var z;
b = a.getListColumns();
for (z in b) f.sortable(b[z]);
d && f.thead().distribute(d);
f.tbody().$(q ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad", []);
return !!w;
};
p.load = function(a, d) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== d ? this.listTable.selectRow(d || 0) : this.active && this.unloadActive());
};
p.pasteMessage = function(a) {
var d, b = 0;
this.validate(a);
this.active === a && ((d = this.sourceCell) && d.eachTextarea(function(f) {
f.val(a.source(null, b++));
}), (d = this.contextCell) && d.eachTextarea(function(f) {
f.val(a.context());
}), d = this.targetCell) && (b = 0, d.eachTextarea(function(f) {
f.val(a.translation(b++));
}));
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
p.reloadMessage = function(a) {
var d = this.sourceCell, b = this.targetCell;
this.pasteMessage(a);
d && this.setSrcMeta(a, d) && d.redraw();
if (b) {
var f = b.navigated() || 0;
f = this.setTrgMeta(a, f, b);
!d && this.setSrcMeta(a, b) && (f = !0);
f && (b.redraw(), this.markUnsaved(a));
}
return this;
};
p.setStatus = function() {
return null;
};
p.setSrcMeta = function(a, d) {
var b = [], f, e = !1, n = this.$smeta, q = this.labels, w = [], z = a.tags(), D = z && z.length;
if (f = a.context()) w.push("<span>" + m(q[4]) + "</span>"), w.push("<mark>" + m(f) + "</mark>");
if (D && this.getTag) for (w.push("<span>Tagged:</span>"); 0 <= --D; ) (f = this.getTag(z[D])) && w.push('<mark class="tag">' + m(f.mod_name) + "</mark>");
w.length && b.push(w.join(" "));
if (this.getMono() && (f = a.refs()) && (z = f.split(/\s/), D = z.length)) {
for (w = []; 0 <= --D; ) f = z[D], w.push("<code>" + m(f) + "</code>");
b.push('<p class="has-icon icon-file">' + w.join(" ") + "</p>");
}
(f = a.notes()) && b.push('<p class="has-icon icon-info">' + m(f, !0) + "</p>");
b.length ? (n || (n = d.find("div.meta"), n.length || (n = B('<div class="meta"></div>').insertAfter(d.header())), 
c(this, n, "poMeta"), this.$smeta = n), n.html(b.join("\n")).show(), e = !0) : n && n.text() && (n.text("").hide(), 
e = !0);
return e;
};
p.setTrgMeta = function(a, d, b) {
var f = [];
var e = !1;
var n = this.$tmeta;
if (d = (a = a.errors(d)) && a.length) {
for (e = 0; e < d; e++) f.push('<p class="has-icon icon-warn">' + m(a[e], !0) + ".</p>");
n || (n = b.find("div.meta"), n.length || (n = B('<div class="meta"></div>').insertAfter(b.header())), 
this.$tmeta = n);
n.html(f.join("\n")).show();
e = !0;
} else n && n.text() && (n.text("").hide(), e = !0);
return e;
};
p.loadMessage = function(a) {
function d(N) {
if ("=" === N.charAt(0)) {
var K = N.split(" ");
N = K[0].substring(1);
K[0] = [ "Zero", "One", "Two" ][Number(N)] || N;
N = K.join(" ");
}
return N;
}
function b(N, K) {
var U = fa, Q = ba[0];
N.off();
N.titled() !== Q && r(N, Q, K || "en");
Q = !1;
z.setSrcMeta(a, N) && (Q = !0);
if (a.plural()) {
Q = -1;
var S = [], Y = [], Z = N.id + "-";
K = a.sourceForms() || K && K.plurals || [ "One", "Other" ];
var ca = K.length;
if (2 !== ca || "=" === K[0].charAt(0) && "=1" !== K[0]) for (;++Q < ca; ) S[Q] = Z + String(Q), 
Y[Q] = d(K[Q].split(" ", 1)[0]) + ":"; else S = [ Z + "-0", Z + "-1" ], Y = [ ba[1], ba[2] ];
N.splity.apply(N, S);
N.each(function(da, V) {
da.header(Y[V]).textarea(a.source(null, V), U).setStrf(H).setMode(D).setInvs(G);
});
N.lock();
U && N.each(function(da, V) {
f(da, V);
});
} else Q && N.redraw(), N.textarea(a.source(), U).setStrf(H).setMode(D).setInvs(G), 
U && f(N, 0);
}
function f(N, K) {
N.on("changing", function(U, Q) {
a.source(Q, K);
0 === K && z.updateListCell(a, "source");
z.unsave(a, K);
}).on("changed", function() {
0 === K && z.po.reIndex(a);
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function e(N, K, U, Q) {
X && K.eachTextarea(function(V) {
V.ping();
});
K.off();
var S = U.isKnown() && U.label || "Target";
S = v(ba[3], S);
K.titled() !== S && r(K, S, U);
S = !1;
!N && z.setSrcMeta(a, K) && (S = !0);
z.setTrgMeta(a, Q, K) && (S = !0);
z.setStatus(a, Q);
if (1 !== U.nplurals && a.pluralized()) {
N = function(V) {
Z.push(d(da[V] || "Form " + V));
Y.push(ca + String(V));
};
var Y = [], Z = [], ca = K.id + "-", da = a.targetForms() || U.plurals || [ "One", "Other" ];
S = da.length;
for (a.eachMsg(N); (U = Y.length) < S; ) N(U);
K.splitx.apply(K, Y);
K.each(function(V, aa) {
var ka = X && !a.disabled(aa);
V.textarea(a.translation(aa), ka).setStrf(H).setMode(D).setInvs(G);
X && n(V, aa);
});
K.navigize(Z, Q || null).on("wgTabSelect", function(V, aa) {
(V = X && V.cell.editable()) && V.focus();
z.setTrgMeta(a, aa, K);
z.setStatus(a, aa);
z.fire("poTab", [ aa ]);
});
} else S && K.redraw(), K.textarea(a.translation(), X && !a.disabled(0)).setStrf(H).setMode(D).setInvs(G), 
X && n(K, 0);
}
function n(N, K) {
function U() {
Q = null;
z.validate(a);
var Y = a.errors(K).join(" ");
S !== Y && (S = Y, z.setTrgMeta(a, K, N) && N.redraw());
}
var Q, S = a.errors(K).join(" ");
N.on("changing", function(Y, Z, ca) {
Q && (clearTimeout(Q), Q = null);
a.translate(Z, K);
0 === K && z.updateListCell(a, "target");
a.fuzzy(K) ? z.fuzzy(!1, a, K) : z.unsave(a, K);
"" === Z ? (z.fire("poEmpty", [ !0, a, K ]), z.setStatus(a, K)) : "" === ca && (z.fire("poEmpty", [ !1, a, K ]), 
z.setStatus(a, K));
Q = setTimeout(U, S ? 300 : 1e3);
}).on("changed", function() {
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function q(N) {
N.off();
var K = ba[4];
N.titled() !== K && (r(N, K), z.setStatus(null));
N.textarea(a.context(), !0).setMode(D).setInvs(G);
la && N.on("changing", function(U, Q) {
a.context(Q);
z.updateListCell(a, "source");
z.unsave(a, O);
}).on("changed", function() {
z.po.reIndex(a);
z.dict && z.rebuildSearch();
z.fire("poUpdate", [ a ]);
});
}
function w(N) {
var K = ba[5];
N.titled() !== K && r(N, K);
N.off().on("changing", function(U, Q) {
a.comment(Q);
z.fire("poComment", [ a, Q ]);
z.unsave(a, O);
}).textarea(a.comment(), !0);
}
var z = this, D = z.mode, E = a.isHTML(), G = z.inv || !1, F = this.fmt || null, H = a.format() || null, I = a.is(z.active), O = 0, P = z.sourceCell, T = z.targetCell, J = z.contextCell, R = z.commentCell, X = z.editable.target, fa = z.editable.source, la = z.editable.context, ea = g, ma = z.sourceLocale, ia = z.targetLocale, ba = z.labels;
z.html !== E && (z.html = E, "code" !== z.mode && (D = E ? "html" : "", z.setMode(D)));
z.active = a;
P && b(P, ma);
J && q(J);
T && ia && (O = T.navigated() || 0, e(P, T, ia, O));
R && w(R);
ea && (ea.exists() || (ea = ea.parent()), (E = ea.editable()) && E.focus());
F !== H && (this.fmt = H);
I || z.fire("poSelected", [ a, O ]);
};
p.unloadActive = function() {
function a(b) {
b && b.text("").hide();
}
function d(b) {
b && b.off().clear();
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
p.loadNothing = function() {
var a, d = this.t(), b = this.mode || "", f = this.inv || !1, e = this.fmt;
this.unloadActive();
this.setStatus(null);
(a = this.commentCell) && a.textarea("", !1);
if (a = this.sourceCell) a.textarea("", !1).setStrf(e).setMode(b).setInvs(f), a.title(d._x("Source text not loaded", "Editor") + ":");
if (a = this.contextCell) a.textarea("", !1).setMode(b).setInvs(f), a.title(d._x("Context not loaded", "Editor") + ":");
if (a = this.targetCell) a.textarea("", !1).setStrf(e).setMode(b).setInvs(f), a.title(d._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
p.updateListCell = function(a, d) {
d = this.getListColumns()[d];
a = this.po.indexOf(a);
(a = this.listTable.row(a)) && a.rendered && a.update(d);
};
p.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? k(a) : a.trim()) || " ";
};
p.fuzzy = function(a, d, b) {
d = d || this.active;
var f = d.fuzzy(b);
!0 !== a || f ? !1 === a && f && this.flag(0, d, b) && this.fire("poFuzzy", [ d, !1, b ]) : this.flag(4, d, b) && this.fire("poFuzzy", [ d, !0, b ]);
return f;
};
p.flag = function(a, d, b) {
if (!d) {
d = this.active;
b = this.getTargetOffset();
if (null == b) return null;
b && d.targetForms() && (b = 0);
}
var f = d.flagged(b);
if (null == a) return f;
if (f === a || a && !d.translated(b) || !this.fire("poFlag", [ a, f, d, b ])) return !1;
d.flag(a, b);
this.fire("poUpdate", [ d ]) && this.unsave(d, b);
this.setStatus(d, b);
return !0;
};
p.add = function(a, d) {
var b = this.po.get(a, d);
if (b) var f = this.po.indexOf(b); else f = this.po.length, b = this.po.add(a, d), 
this.load(this.po, -1), this.fire("poAdd", [ b ]), this.fire("poUpdate", [ b ]);
this.lastSearch && this.filter("");
this.listTable.select(f);
return b;
};
p.del = function(a) {
if (a = a || this.active) {
var d = this.lastSearch, b = this.po.del(a);
null != b && (this.unsave(a), this.fire("poDel", [ a ]), this.fire("poUpdate", [ a ]), 
this.reload(), this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (d && this.filter(d), this.active || (b = Math.min(b, this.po.length - 1), 
this.listTable.select(b))));
}
};
p.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
p.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(f) {
f.setMode(a);
});
var d = this.active, b = this.sourceCell;
d && d.refs() && b && this.setSrcMeta(d, b) && b.redraw();
}
return this;
};
p.getMono = function() {
return "code" === this.mode;
};
p.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(d) {
d.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
p.getInvs = function() {
return this.inv || !1;
};
p.callTextareas = function(a) {
var d = this.targetCell;
d && d.eachTextarea(a);
(d = this.contextCell) && d.eachTextarea(a);
(d = this.sourceCell) && d.eachTextarea(a);
return this;
};
p.focus = function() {
var a = this.getTargetEditable();
a && a.focus();
return this;
};
p.validate = function() {
return 0;
};
p = null;
return A;
}({}, L, M));
C.register("$13", function(A, x, y) {
function u() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function r(k) {
k = B('<button type="button" class="button button-small icon icon-' + k + ' hastip"></button>');
C.require("$12", "tooltip.js").init(k);
return k;
}
function c(k) {
return r("cloud").attr("title", k.labels[8] + " (Ctrl-U)").on("click", function(p) {
p.preventDefault();
k.focus().fuzzy(!k.fuzzy());
});
}
function h(k) {
return r("robot").attr("title", k.labels[9] + " (Ctrl-J)").on("click", function(p) {
p.preventDefault();
k.fire("poHint");
});
}
function g() {
var k = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return function(p) {
for (var a = 0, d = 0, b, f, e = {}, n = 0; null != (b = k.exec(p)); ) f = b[2], 
"%" !== f && ("" === f || -1 === "suxXbcdeEfFgGo".indexOf(f) ? n++ : (null == b[1] ? b = ++d : (b = parseInt(b[1]), 
a = Math.max(a, b)), null == e[b] && (e[b] = {}), e[b][f] = !0));
return {
count: Math.max(a, d),
valid: 0 === n,
types: e
};
};
}
function l(k) {
null == v && (v = g());
return v(k);
}
function m(k, p) {
return C.require("$6", "string.js").vsprintf(k, p);
}
x = C.require("$24", "base.js");
A.init = function(k) {
var p = new u();
k = p.setRootCell(k);
var a = k.splity("po-list", "po-edit"), d = a[0], b = a[1];
a = b.splitx("po-trans", "po-comment");
var f = a[0], e = a[1].header("Loading..");
a = f.splity("po-source", "po-target");
f = a[0].header("Loading..");
a = a[1].header("Loading..");
k.distribute([ .34 ]);
b.distribute([ .8 ]);
p.setListCell(d);
p.setSourceCell(f);
p.setTargetCell(a);
p.commentCell = e;
p.editable.source = !1;
return p;
};
x = u.prototype = x.extend(u);
x.getListHeadings = function() {
var k = this.t(), p = [ k._x("Source text", "Editor") ];
this.targetLocale && (p[1] = k._x("Translation", "Editor"));
return p;
};
x.getListColumns = function() {
var k = {
source: 0
};
this.targetLocale && (k.target = 1);
return k;
};
x.getListEntry = function(k) {
var p = this.cellText, a = [ function() {
var d = p(k.source() || ""), b = k.context();
if (b) {
var f = y.createElement("p");
f.appendChild(y.createElement("mark")).innerText = b;
f.appendChild(y.createTextNode(" " + d));
return f;
}
return d;
} ];
this.targetLocale && (a[1] = function() {
return p(k.translation() || "");
});
return a;
};
x.stats = function() {
var k = this.po, p = k.length, a = 0, d = 0, b = 0;
k.each(function(f, e) {
e.fuzzy() ? b++ : e.translated() ? a++ : d++;
});
return {
t: p,
p: a.percent(p) + "%",
f: b,
u: d
};
};
x.unlock = function() {
var k = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
k && (this._unlocked = k, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
x.lock = function() {
var k = this._unlocked;
k && (this.targetLocale = k, delete this._unlocked, this.po && this.po.lock(k), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, k ]), 
this.active && this.loadMessage(this.active));
};
x.locked = function() {
return !this._unlocked;
};
x.setStatus = function(k) {
var p = this.$tnav;
if (null == k) p && (p.remove(), this.$tnav = null); else {
p || (this.$tnav = p = B("<nav></nav>").append(c(this)).append(h(this)).appendTo(this.targetCell.header()));
var a = [];
k.translated() ? k.fuzzy() && a.push("po-fuzzy") : a.push("po-empty");
p.attr("class", a.join(" "));
}
};
x.getSorter = function() {
function k(d, b) {
var f = d.weight(), e = b.weight();
return f === e ? p(d, b) : f > e ? -1 : 1;
}
function p(d, b) {
return d.hash().localeCompare(b.hash());
}
var a = this;
return function(d) {
var b = a.po, f = a.locked() ? k : p;
d.sort(function(e, n) {
return f(b.row(e), b.row(n));
});
};
};
x.validate = function(k) {
var p = this, a = [], d = 0, b = 0, f = 0, e = [], n = this.fmt || "";
"" !== n && "no-" === n.substring(0, 3) || k.eachSrc(function(q, w) {
w = l(w);
var z = w.count;
w.valid && (e[q] = w, f = Math.max(f, z), b = b ? Math.min(b, z) : z);
});
k.eachMsg(function(q, w) {
a[q] = [];
if ("" !== w && (f || n)) {
w = l(w);
var z = w.count;
if (z > f) a[q].push(m(p.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ f ])), 
d++; else if (z < b && 1 === k.count()) a[q].push(m(p.t()._("Missing placeholders; source text formatting suggests at least %s"), [ b ])), 
d++; else if (!w.valid) a[q].push(p.t()._("Possible syntax error in string formatting")), 
d++; else if (e[q]) {
var D;
z = e[q].types;
var E;
for (D in w.types) for (E in w.types[D]) if (null == z[D] || null == z[D][E]) {
a[q].push(p.t()._("Mismatching placeholder type; check against source text formatting"));
d++;
return;
}
}
}
});
k.err = d ? a : null;
return d;
};
x.handle = {};
var v;
return A;
}({}, L, M));
C.register("$14", function(A, x) {
var y = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, u = {
38: !0,
40: !0,
73: !0
}, r = {
66: function(c, h) {
if (c = h.current()) c.normalize(), h.focus().pasteMessage(c);
},
75: function(c, h) {
if (c = h.current()) c.untranslate(), h.focus().pasteMessage(c);
},
85: function(c, h) {
h.focus().fuzzy(!h.fuzzy());
},
13: function(c, h) {
h.getFirstEditable() && h.next(1, !0, !0);
},
40: function(c, h) {
c = c.shiftKey;
h.next(1, c, c);
},
38: function(c, h) {
c = c.shiftKey;
h.next(-1, c, c);
},
73: function(c, h) {
if (!c.shiftKey) return !1;
h.setInvs(!h.getInvs());
}
};
A.init = function(c, h) {
function g(m) {
if (m.isDefaultPrevented() || !m.metaKey && !m.ctrlKey) return !0;
var v = m.which;
if (!l[v]) return !0;
var k = r[v];
if (!k) throw Error("command undefined #" + v);
if (m.altKey || m.shiftKey && !u[v] || !1 === k(m, c)) return !0;
m.stopPropagation();
m.preventDefault();
return !1;
}
var l = {};
B(h || x).on("keydown", g);
return {
add: function(m, v) {
r[y[m]] = v;
return this;
},
enable: function() {
var m;
for (m in arguments) {
var v = y[arguments[m]];
l[v] = !0;
}
return this;
},
disable: function() {
B(h || x).off("keydown", g);
c = h = l = null;
}
};
};
return A;
}({}, L, M));
C.register("$25", function(A) {
function x() {
this.reIndex([]);
}
A.init = function() {
return new x();
};
var y = x.prototype;
y.reIndex = function(u) {
for (var r = {}, c = -1, h = u.length; ++c < h; ) r[u[c]] = c;
this.keys = u;
this.length = c;
this.ords = r;
};
y.key = function(u, r) {
if (null == r) return this.keys[u];
var c = this.keys[u], h = this.ords[r];
if (r !== c) {
if (null != h) throw Error("Clash with item at [" + h + "]");
this.keys[u] = r;
delete this.ords[c];
this.ords[r] = u;
}
return u;
};
y.indexOf = function(u) {
u = this.ords[u];
return null == u ? -1 : u;
};
y.add = function(u, r) {
var c = this.ords[u];
null == c && (this.keys[this.length] = u, c = this.ords[u] = this.length++);
this[c] = r;
return c;
};
y.get = function(u) {
return this[this.ords[u]];
};
y.has = function(u) {
return null != this.ords[u];
};
y.del = function(u) {
this.cut(this.ords[u], 1);
};
y.cut = function(u, r) {
r = r || 1;
var c = [].splice.call(this, u, r);
this.keys.splice(u, r);
this.reIndex(this.keys);
return c;
};
y.each = function(u) {
for (var r = -1, c = this.keys, h = this.length; ++r < h; ) u(c[r], this[r], r);
return this;
};
y.sort = function(u) {
for (var r = -1, c = this.length, h, g = this.keys, l = this.ords, m = []; ++r < c; ) m[r] = [ this[r], g[r] ];
m.sort(function(v, k) {
return u(v[0], k[0]);
});
for (r = 0; r < c; r++) h = m[r], this[r] = h[0], h = h[1], g[r] = h, l[h] = r;
return this;
};
y.join = function(u) {
return [].join.call(this, u);
};
y = null;
return A;
}({}, L, M));
C.register("$26", function(A) {
function x(y, u) {
var r = new RegExp("^.{0," + (y - 1) + "}[" + u + "]"), c = new RegExp("^[^" + u + "]+");
return function(h, g) {
for (var l = h.length, m; l > y; ) {
m = r.exec(h) || c.exec(h);
if (null == m) break;
m = m[0];
g.push(m);
m = m.length;
l -= m;
h = h.substring(m);
}
0 !== l && g.push(h);
return g;
};
}
A.create = function(y) {
function u(v) {
return g[v] || "\\" + v;
}
var r = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, c = /[ \r\n]+/g, h = /[\t\v\f\x07\x08\\"]/g, g = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == y || isNaN(y = Number(y))) y = 79;
if (0 < y) {
var l = x(y - 3, " ");
var m = x(y - 2, "-– \\.,:;\\?!\\)\\]\\}\\>");
}
return {
pair: function(v, k) {
if (!k) return v + ' ""';
k = k.replace(h, u);
var p = 0;
k = k.replace(r, function() {
p++;
return "\\n\n";
});
if (!(p || y && y < k.length + v.length + 3)) return v + ' "' + k + '"';
v = [ v + ' "' ];
k = k.split("\n");
if (m) for (var a = -1, d = k.length; ++a < d; ) m(k[a], v); else v = v.concat(k);
return v.join('"\n"') + '"';
},
prefix: function(v, k) {
v = v.split(r);
return k + v.join("\n" + k);
},
refs: function(v) {
v = v.replace(c, " ", v);
l && (v = l(v, []).join("\n#: "));
return "#: " + v;
}
};
};
return A;
}({}, L, M));
C.register("$40", function(A) {
function x() {
this.length = 0;
}
A.init = function() {
return new x();
};
var y = x.prototype;
y.push = function(u) {
this[this.length++] = u;
return this;
};
y.sort = function(u) {
[].sort.call(this, u);
return this;
};
y.each = function(u) {
for (var r = -1, c = this.length; ++r < c; ) u(r, this[r]);
return this;
};
return A;
}({}, L, M));
C.register("$27", function(A) {
function x() {}
A.extend = function(u) {
return u.prototype = new x();
};
var y = x.prototype = C.require("$38", "abstract.js").init([ "add", "load" ]);
y.row = function(u) {
return this.rows[u];
};
y.lock = function(u) {
return this.locale(u || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
y.unlock = function() {
var u = this.loc;
this.loc = null;
return u;
};
y.locale = function(u) {
null == u ? u = this.loc : this.loc = u = C.require("$37", "locale.js").cast(u);
return u;
};
y.each = function(u) {
this.rows.each(u);
return this;
};
y.indexOf = function(u) {
"object" !== typeof u && (u = this.get(u));
if (!u) return -1;
null == u.idx && (u.idx = this.rows.indexOf(u.hash()));
return u.idx;
};
y.get = function(u) {
return this.rows && this.rows.get(u);
};
y.has = function(u) {
return this.rows && this.rows.has(u);
};
y.del = function(u) {
u = this.indexOf(u);
if (-1 !== u) {
var r = this.rows.cut(u, 1);
if (r && r.length) return this.length = this.rows.length, this.rows.each(function(c, h, g) {
h.idx = g;
}), u;
}
};
y.reIndex = function(u, r) {
var c = this.indexOf(u), h = u.hash(), g = this.rows.indexOf(h);
return g === c ? c : -1 !== g ? (r = (r || 0) + 1, u.source("Error, duplicate " + String(r) + ": " + u.source()), 
this.reIndex(u, r)) : this.rows.key(c, h);
};
y.sort = function(u) {
this.rows.sort(u);
return this;
};
y.export = function() {
for (var u = -1, r = this.rows, c = r.length, h = C.require("$40", "list.js").init(); ++u < c; ) h.push(r[u]);
return h;
};
y = null;
return A;
}({}, L, M));
C.register("$28", function(A) {
function x(c, h, g) {
if (null == g) return c[h] || "";
c[h] = g || "";
return c;
}
function y() {
this._id = this.id = "";
}
function u(c, h) {
for (var g = -1, l = c.length; ++g < l; ) h(g, c[g]);
}
A.extend = function(c) {
return c.prototype = new y();
};
var r = y.prototype;
r.flag = function(c, h) {
var g = this.flg || (this.flg = []);
if (null != h) g[h] = c; else for (h = Math.max(g.length, this.src.length, this.msg.length); 0 !== h--; ) g[h] = c;
return this;
};
r.flagged = function(c) {
var h = this.flg || [];
if (null != c) return h[c] || 0;
for (c = h.length; 0 !== c--; ) if (h[c]) return !0;
return !1;
};
r.flags = function() {
for (var c, h = {}, g = [], l = this.flg || [], m = l.length; 0 !== m--; ) c = l[m], 
h[c] || (h[c] = !0, g.push(c));
return g;
};
r.flaggedAs = function(c, h) {
var g = this.flg || [];
if (null != h) return c === g[h] || 0;
for (h = g.length; 0 !== h--; ) if (g[h] === c) return !0;
return !1;
};
r.fuzzy = function(c, h) {
var g = this.flaggedAs(4, c);
null != h && this.flag(h ? 4 : 0, c);
return g;
};
r.source = function(c, h) {
if (null == c) return this.src[h || 0] || "";
this.src[h || 0] = c;
return this;
};
r.plural = function(c, h) {
if (null == c) return this.src[h || 1] || "";
this.src[h || 1] = c || "";
return this;
};
r.sourceForms = function() {
return this.srcF;
};
r.targetForms = function() {
return this.msgF;
};
r.each = function(c) {
for (var h = -1, g = this.src, l = this.msg, m = Math.max(g.length, l.length); ++h < m; ) c(h, g[h], l[h]);
return this;
};
r.eachSrc = function(c) {
u(this.src, c);
return this;
};
r.eachMsg = function(c) {
u(this.msg, c);
return this;
};
r.count = function() {
return Math.max(this.src.length, this.msg.length);
};
r.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
r.translate = function(c, h) {
this.msg[h || 0] = c || "";
return this;
};
r.untranslate = function(c) {
if (null != c) this.msg[c] = ""; else {
var h = this.msg, g = h.length;
for (c = 0; c < g; c++) h[c] = "";
}
return this;
};
r.translation = function(c) {
return this.msg[c || 0] || "";
};
r.errors = function(c) {
return this.err && this.err[c || 0] || [];
};
r.valid = function() {
return null == this.err;
};
r.translated = function(c) {
if (null != c) return !!this.msg[c];
var h = this.msg, g = h.length;
for (c = 0; c < g; c++) if (!h[c]) return !1;
return !0;
};
r.untranslated = function(c) {
if (null != c) return !this.msg[c];
var h = this.msg, g = h.length;
for (c = 0; c < g; c++) if (h[c]) return !1;
return !0;
};
r.comment = function(c) {
return x(this, "cmt", c);
};
r.notes = function(c) {
return x(this, "xcmt", c);
};
r.refs = function(c) {
return x(this, "rf", c);
};
r.format = function(c) {
return x(this, "fmt", c);
};
r.context = function(c) {
return x(this, "ctx", c);
};
r.tags = function() {
return this.tg;
};
r.toString = r.toText = function() {
return this.src.concat(this.msg, this.id, this.ctx).join(" ");
};
r.weight = function() {
var c = 0;
this.translation() || (c += 2);
this.fuzzy() && (c += 1);
return c;
};
r.equals = function(c) {
return this === c || this.hash() === c.hash();
};
r.hash = function() {
return this.id;
};
r.normalize = function() {
for (var c = this.msg.length; 0 !== c--; ) this.msg[c] = this.src[c] || "";
};
r.disabled = function(c) {
return !!(this.lck || [])[c || 0];
};
r.disable = function(c) {
(this.lck || (this.lck = []))[c || 0] = !0;
return this;
};
r.saved = function(c) {
var h = this.drt;
if (null == h) return !0;
if (null != c) return !h[c];
for (c = h.length; 0 !== c--; ) if (h[c]) return !1;
return !0;
};
r.unsave = function(c) {
(this.drt || (this.drt = []))[c || 0] = !0;
return this;
};
r.save = function(c) {
null == c ? this.drt = null : (this.drt || (this.drt = []))[c] = !1;
return this;
};
r.is = function(c) {
return c && (c === this || c.idx === this.idx);
};
r.isHTML = function(c) {
if (null == c) return this.htm || !1;
this.htm = c;
};
r = null;
return A;
}({}, L, M));
C.register("$15", function(A, x) {
function y(m) {
return {
"Project-Id-Version": "PACKAGE VERSION",
"Report-Msgid-Bugs-To": "",
"POT-Creation-Date": m || "",
"PO-Revision-Date": m || "",
"Last-Translator": "",
"Language-Team": "",
Language: "",
"Plural-Forms": "",
"MIME-Version": "1.0",
"Content-Type": "text/plain; charset=UTF-8",
"Content-Transfer-Encoding": "8bit"
};
}
function u(m, v) {
m = m || "";
v && (m += "\0" + v);
return m;
}
function r(m) {
var v = x.console;
v && v.error && v.error(m.message || String(m));
}
function c(m) {
return C.require("$26", "format.js").create(m);
}
function h(m) {
this.locale(m);
this.clear();
this.head = y(this.now());
}
function g(m, v) {
this.src = [ m || "" ];
this.msg = [ v || "" ];
}
A.create = function(m) {
return new h(m);
};
var l = C.require("$27", "messages.js").extend(h);
l.clear = function() {
this.rows = C.require("$25", "collection.js").init();
this.length = 0;
return this;
};
l.now = function() {
function m(b, f) {
for (b = String(b); b.length < f; ) b = "0" + b;
return b;
}
var v = new Date(), k = v.getUTCFullYear(), p = v.getUTCMonth() + 1, a = v.getUTCDate(), d = v.getUTCHours();
v = v.getUTCMinutes();
return m(k, 4) + "-" + m(p, 2) + "-" + m(a, 2) + " " + m(d, 2) + ":" + m(v, 2) + "+0000";
};
l.header = function(m, v) {
var k = this.head || (this.head = {});
if (null == v) return this.headers()[m] || "";
k[m] = v || "";
return this;
};
l.headers = function(m) {
var v = this.now(), k = this.head || (this.head = y(v));
if (null != m) {
for (a in m) k[a] = m[a];
return this;
}
var p = this.locale();
m = {};
for (a in k) m[a] = String(k[a]);
if (p) {
m.Language = String(p) || "zxx";
m["Language-Team"] = p.label || m.Language;
m["Plural-Forms"] = "nplurals=" + (p.nplurals || "2") + "; plural=" + (p.pluraleq || "n!=1") + ";";
var a = "PO-Revision-Date";
} else m.Language = "", m["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
m["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", a = "POT-Creation-Date";
m[a] || (m[a] = v);
m["X-Generator"] = "Loco https://localise.biz/";
return m;
};
l.get = function(m, v) {
m = u(m, v);
return this.rows.get(m);
};
l.add = function(m, v) {
m instanceof g || (m = new g(m));
v && m.context(v);
v = m.hash();
this.rows.get(v) ? r("Duplicate message at index " + this.indexOf(m)) : (m.idx = this.rows.add(v, m), 
this.length = this.rows.length);
return m;
};
l.load = function(m) {
for (var v = -1, k, p, a, d, b, f, e = (a = this.locale()) && a.nplurals || 2, n = []; ++v < m.length; ) k = m[v], 
null == k.parent ? (p = k.source || k.id, a = k.target || "", d = k.context, p || d ? (b = new g(p, a), 
b._id = k._id, d && b.context(d), k.flag && b.flag(k.flag, 0), k.comment && b.comment(k.comment), 
k.notes && b.notes(k.notes), k.refs && b.refs(k.refs), b.format(k.format), k.message = b, 
this.add(b), k.prev && k.prev[0] && (b.prev(k.prev[0].source, k.prev[0].context), 
k.prev[1] && b._src.push(k.prev[1].source || ""))) : 0 === v && "object" === typeof a && (this.head = a, 
this.headcmt = k.comment)) : n.push(k);
for (v = -1; ++v < n.length; ) try {
k = n[v];
p = k.source || k.id;
b = m[k.parent] && m[k.parent].message;
if (!b) throw Error("parent missing for plural " + p);
f = k.plural;
1 === f && b.plural(p);
f >= e || (k.flag && b.flag(k.flag, f), b.translate(k.target || "", f), k.format && !b.format() && b.format(k.format));
} catch (q) {
r(q);
}
return this;
};
l.wrap = function(m) {
this.fmtr = c(m);
return this;
};
l.toString = function() {
var m, v = this.locale(), k = [], p = [], a = this.headers(), d = !v, b = v && v.nplurals || 2, f = this.fmtr || c();
a[v ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (m in a) p.push(m + ": " + a[m]);
p = new g("", p.join("\n"));
p.comment(this.headcmt || "");
d && p.fuzzy(0, !0);
k.push(p.toString());
k.push("");
this.rows.each(function(e, n) {
e && (k.push(n.cat(f, d, b)), k.push(""));
});
return k.join("\n");
};
l = C.require("$28", "message.js").extend(g);
l.prev = function(m, v) {
this._src = [ m || "" ];
this._ctx = v;
};
l.hash = function() {
return u(this.source(), this.context());
};
l.toString = function() {
return this.cat(c());
};
l.cat = function(m, v, k) {
var p = [], a;
(a = this.cmt) && p.push(m.prefix(a, "# "));
(a = this.xcmt) && p.push(m.prefix(a, "#. "));
var d = this.rf;
if (a = this._id) d += (d ? " " : "") + "loco:" + a;
d && /\S/.test(d) && p.push(m.refs(d));
!v && this.fuzzy() && p.push("#, fuzzy");
(a = this.fmt) && p.push("#, " + a + "-format");
(a = this._ctx) && p.push(m.prefix(m.pair("msgctxt", a), "#| "));
if (a = this._src) a[0] && p.push(m.prefix(m.pair("msgid", a[0]), "#| ")), a[1] && p.push(m.prefix(m.pair("msgid_plural", a[1]), "#| "));
(a = this.ctx) && p.push(m.pair("msgctxt", a));
p.push(m.pair("msgid", this.src[0]));
if (null == this.src[1]) p.push(m.pair("msgstr", v ? "" : this.msg[0])); else for (d = -1, 
p.push(m.pair("msgid_plural", this.src[1])), a = this.msg || [ "", "" ], k = k || a.length; ++d < k; ) p.push(m.pair("msgstr[" + d + "]", v ? "" : a[d] || ""));
return p.join("\n");
};
l.compare = function(m, v) {
var k = this.weight(), p = m.weight();
if (k > p) return 1;
if (k < p) return -1;
if (v) {
k = this.hash().toLowerCase();
p = m.hash().toLowerCase();
if (k < p) return 1;
if (k > p) return -1;
}
return 0;
};
l.copy = function() {
var m = new g(), v, k;
for (v in this) this.hasOwnProperty(v) && ((k = this[v]) && k.concat && (k = k.concat()), 
m[v] = k);
return m;
};
l = l = null;
return A;
}({}, L, M));
C.register("$17", function(A) {
A.init = function(x, y) {
function u() {
return g || (g = B('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function r(l, m, v) {
l = B("<p></p>").text(v);
u().dialog("close").html("").dialog("option", "title", "Error").append(l).dialog("open");
}
function c(l) {
var m = l && l.code;
if (m) {
for (var v = -1, k = m.length, p = B("<ol></ol>").attr("class", l.type); ++v < k; ) B("<li></li>").html(m[v]).appendTo(p);
p.find("li").eq(l.line - 1).attr("class", "highlighted");
u().dialog("close").html("").dialog("option", "title", l.path + ":" + l.line).append(p).dialog("open");
}
}
function h(l) {
l = l.target;
var m = B(l).find("li.highlighted")[0];
l.scrollTop = Math.max(0, (m && m.offsetTop || 0) - Math.floor(l.clientHeight / 2));
}
var g;
return {
load: function(l) {
u().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", h);
l = B.extend({
ref: l,
path: y.popath
}, y.project || {});
x.ajax.post("fsReference", l, c, r);
}
};
};
return A;
}({}, L, M));
C.register("$30", function(A) {
function x(u) {
this.api = u;
this.chars = 0;
}
A.create = function(u) {
return new x(u);
};
const y = x.prototype;
y.init = function(u, r) {
function c(f) {
let e = {
length: 0,
html: f.html,
sources: []
};
d.push(e);
return b[f.html ? 1 : 0] = e;
}
function h(f, e) {
let n = f.source(null, e);
if (n && (f.untranslated(e) || r)) if (e = a[n]) e.push(f); else {
e = n.length;
var q = g.isHtml(n);
q = b[q ? 1 : 0];
var w = q.sources;
if (p && e > p) v++; else {
if (q.length + e > k || 50 === w.length) q = c(q), w = q.sources;
w.push(n);
a[n] = [ f ];
q.length += e;
l += e;
m += 1;
}
}
}
let g = this.api, l = 0, m = 0, v = 0, k = 1e4, p = g.maxChr(), a = {}, d = [], b = [];
p && (k = Math.min(k, p));
c({
html: !1
});
c({
html: !0
});
u.each(function(f, e) {
h(e, 0);
h(e, 1);
});
b = [];
this.map = a;
this.chars = l;
this.length = m;
this.batches = d;
this.locale = u.locale();
v && g.stderr("Strings over " + k + " characters long will be skipped");
};
y.abort = function() {
this.state = "abort";
return this;
};
y.dispatch = function() {
function u(z, D) {
function E(P, T, J) {
D !== J && (z === T || 1 < P && G.source(null, 1) === z) && (G.translate(D, P), 
O++, e++);
return O;
}
if (!r()) return !1;
if (!D) return !0;
let G, F = p[z] || [], H = F.length, I = -1, O;
for (b++; ++I < H; ) if (G = F[I]) O = 0, G.each(E), O && m("each", [ G ]);
return !0;
}
function r() {
return "abort" === v.state ? (k && (k.abort(), l()), !1) : !0;
}
function c() {
let z = a.shift(), D;
z ? (D = z.sources) && D.length ? k.batch(D, d, z.html, u).fail(h).always(g) : g() : l();
}
function h() {
v.abort();
l();
}
function g() {
f++;
m("prog", [ f, q ]);
r() && c();
}
function l() {
k = a = null;
m("done");
}
function m(z, D) {
z = w[z] || [];
let E = z.length;
for (;0 <= --E; ) z[E].apply(null, D);
}
let v = this, k = v.api, p = v.map, a = v.batches || [], d = v.locale, b = 0, f = 0, e = 0, n = v.length, q = a.length, w = {
done: [],
each: [],
prog: []
};
v.state = "";
c();
return {
done: function(z) {
w.done.push(z);
return this;
},
each: function(z) {
w.each.push(z);
return this;
},
prog: function(z) {
w.prog.push(z);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(n - b, 0);
},
did: function() {
return b;
}
};
}
};
};
return A;
}({}, L, M));
C.register("$41", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
C.register("$31", function(A) {
function x() {}
A.create = function(y) {
y = x.prototype = new y();
y.toString = function() {
return "Google Translate";
};
y.getId = function() {
return "google";
};
y.getUrl = function() {
return "https://translate.google.com/";
};
y.parseError = function(u) {
if (u.error) {
for (var r = [], c = u.error.errors || [], h = c.length, g = -1; ++g < h; ) r.push(c[g].message || "");
return "Error " + u.error.code + ": " + r.join(";");
}
return "";
};
y.batch = function(u, r, c, h) {
function g(k) {
for (var p = u.length, a = -1, d; ++a < p && (d = k[a] || {}, !1 !== h(u[a], d.translatedText || "", r)); );
}
var l = this, m = this.getSrc();
c = c ? "html" : "text";
var v = l.mapLang(r, C.require("$41", "google.json"));
return l._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + m + "&target=" + v + "&format=" + c,
method: "POST",
traditional: !0,
data: {
key: l.key(),
q: u
}
}).done(function(k, p, a) {
k.data ? g(k.data.translations || []) : (l.stderr(l.parseError(k) || l.httpError(a)), 
g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return A;
}({}, L, M));
C.register("$42", {
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
C.register("$32", function(A) {
function x() {}
A.create = function(y) {
y = x.prototype = new y();
y.toString = function() {
return "Microsoft Translator text API";
};
y.getId = function() {
return "microsoft";
};
y.getUrl = function() {
return "https://aka.ms/MicrosoftTranslatorAttribution";
};
y.parseError = function(u) {
return u && u.error ? u.error.message : "";
};
y.maxChr = function() {
return 1e4;
};
y.batch = function(u, r, c, h) {
function g(d) {
for (var b = -1, f; ++b < k && (f = d[b] || {}, f = f.translations || [], f = f[0] || {}, 
!1 !== h(u[b], f.text || "", r)); );
}
var l = this, m = [], v = l.getSrc(), k = u.length, p = -1;
c = c ? "html" : "plain";
for (var a = l.mapLang(r, C.require("$42", "ms.json")); ++p < k; ) m.push({
text: u[p]
});
return l._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + v + "&to=" + a + "&textType=" + c,
method: "POST",
data: JSON.stringify(m),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": l.param("region") || "global"
}
}).done(function(d, b, f) {
d && d.length ? g(d) : (l.stderr(l.parseError(d) || l.httpError(f)), g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return A;
}({}, L, M));
C.register("$43", {
pt: [ "pt-PT", "pt-BR" ]
});
C.register("$33", function(A) {
function x() {}
A.create = function(y) {
y = x.prototype = new y();
y.toString = function() {
return "DeepL Translator";
};
y.getId = function() {
return "deepl";
};
y.getUrl = function() {
return "https://www.deepl.com/translator";
};
y.parseError = function(u) {
return u.message;
};
y.batch = function(u, r, c, h) {
function g(a) {
for (var d = u.length, b = -1, f; ++b < d && (f = a[b] || {}, !1 !== h(u[b], f.text || "", r)); );
}
var l = this;
c = this.getSrc();
var m = l.param("url") || "https://api.deepl.com", v = l.mapLang(r, C.require("$43", "deepl.json")), k = r.tone, p = "default";
null == k && (k = String(r.variant || "").toLowerCase());
"formal" === k ? p = "more" : "informal" === k && (p = "less");
return l._call({
url: l.fixURL(m + "/v2/translate"),
method: "POST",
traditional: !0,
data: {
source_lang: c.toUpperCase(),
target_lang: v.toUpperCase(),
formality: p,
preserve_formatting: "1",
auth_key: l.key(),
text: u
}
}).done(function(a, d, b) {
a.translations ? g(a.translations) : (l.stderr(l.parseError(a) || l.httpError(b)), 
g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return A;
}({}, L, M));
C.register("$44", {
zh: [ "zh", "zh-CN", "zh-TW" ],
pt: [ "pt", "pt-PT", "pt-BR" ]
});
C.register("$34", function(A) {
function x() {}
A.create = function(y) {
y = x.prototype = new y();
y.getUrl = function() {
return "https://lecto.ai/?ref=loco";
};
y.parseError = function(u) {
var r = u.details || {}, c = r.message;
r = r.texts;
return c ? (r && r !== c && (c += "; " + r), c = c.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(h) {
h += -1 === h.indexOf("?") ? "?" : "&";
return h + "ref=loco";
}), "Error " + (u.status || "0") + ": " + c) : "";
};
y.maxChr = function() {
return 1e3;
};
y.batch = function(u, r, c, h) {
function g(k) {
for (var p = u.length, a = -1, d = (k[0] || {
translated: []
}).translated || []; ++a < p && (k = d[a] || "", !1 !== h(u[a], k, r)); );
}
var l = this;
c = this.getSrc();
var m = l.param("url") || "https://api.lecto.ai", v = l.mapLang(r, C.require("$44", "lecto.json"));
return l._call({
url: l.fixURL(m + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ v ],
from: c,
texts: u
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": l.key(),
Accept: "application/json"
}
}).done(function(k, p, a) {
k ? g(k.translations || []) : (l.stderr(l.parseError(k) || l.httpError(a)), g([]));
}).fail(function() {
g([]);
});
};
return new x();
};
return A;
}({}, L, M));
C.register("$18", function(A, x, y) {
function u() {
this.inf = {};
}
function r() {
var g = y.createElement("p"), l = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, m = /<[a-z]+\s/i, v, k;
return {
sniff: function(p) {
if (p === v) return k;
v = p;
if (l.test(p) || m.test(p)) if (g.innerHTML = p, g.textContent !== p) return k = !0;
return k = !1;
}
};
}
var c = u.prototype;
c.init = function(g) {
this.inf = g || {};
};
c.param = function(g) {
return this.inf[g] || "";
};
c.key = function() {
return this.param("key");
};
c.getId = function() {
return this.param("id") || "none";
};
c.getUrl = function() {
return this.param("url") || "#";
};
c.toString = function() {
return this.param("name") || this.getId();
};
c.getSrc = function() {
return this.param("src") || "en";
};
c.stderr = function(g) {
var l = (x.loco || {}).notices || x.console;
l && l.error && l.error(String(this) + ": " + String(g));
};
c.httpError = function(g) {
return (g = g && g.status) && 200 !== g ? "Responded status " + g : "Unknown error";
};
c.parseError = function() {
return "";
};
c.mapLang = function(g, l) {
var m = String(g).replace("-", "_"), v = g.lang;
l = l[m] || l[v] || [];
g = l.length;
if (0 === g) return v;
if (1 < g) {
m = m.toLowerCase();
v = -1;
for (var k; ++v < g; ) if (k = l[v], k.toLowerCase().replace("-", "_") === m) return k;
}
return l[0];
};
c.toLang = function(g) {
return String(g);
};
c.maxChr = function() {
return 0;
};
c.fixURL = function(g) {
g = g.split("://", 2);
1 === g.length && g.unshift("https");
return g[0] + "://" + g[1].replace(/\/{2,}/g, "/");
};
c.translate = function(g, l, m) {
return this.batch([ g ], l, this.isHtml(g), m);
};
c._call = function(g) {
var l = this;
l.state = null;
g.cache = !0;
g.dataType = "json";
g.error = function(m, v, k) {
try {
var p = m.responseText, a = p && C.require("$5", "json.js").parse(p);
k = a && l.parseError(a) || k;
} catch (d) {}
l.stderr(k || l.httpError(m));
};
return l.abortable(B.ajax(g));
};
c.abortable = function(g) {
var l = this;
g.always(function() {
l.$r === g && (l.$r = null);
});
return l.$r = g;
};
c.abort = function() {
var g = this.$r;
g && g.abort();
};
c.isHtml = function(g) {
return (h || (h = r())).sniff(g);
};
c.createJob = function() {
return C.require("$30", "job.js").create(this);
};
c.batch = function(g, l, m, v) {
function k(d) {
for (var b = g.length, f = -1; ++f < b && !1 !== v(g[f], d[f], l); );
}
var p = x.loco.ajax;
m = {
hook: this.getId(),
type: m ? "html" : "text",
locale: this.toLang(l),
source: this.getSrc(),
sources: g
};
var a = B.Deferred();
this.abortable(p.post("apis", m, function(d) {
k(d && d.targets || []);
a.resolve();
}, function() {
k([]);
a.reject();
}));
return a.promise();
};
A.create = function(g) {
var l = g.id;
l = "google" === l ? C.require("$31", "google.js").create(u) : "microsoft" === l ? C.require("$32", "ms.js").create(u) : "deepl" === l ? C.require("$33", "deepl.js").create(u) : "lecto" === l ? C.require("$34", "lecto.js").create(u) : new u();
l.init(g);
return l;
};
A.suggest = function(g, l, m, v) {
var k, p = g.length;
for (k = 0; k < p; k++) {
var a = g[k];
a.translate(l, m, v);
}
};
var h;
return A;
}({}, L, M));
C.register("$19", function(A, x, y) {
A.init = function(u) {
function r() {
P || (G.on("click", k), P = B('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && B("#ssh-keys").toggleClass("hidden", "ssh" !== B(this).val());
}));
return P;
}
function c() {
H && (h(B(f)), H = !1);
if (q && O) {
var J = O, R = B(F);
R.find("span.loco-msg").text(J);
I || (R.removeClass("jshide").hide().fadeIn(500), I = !0);
} else I && (h(B(F)), I = !1);
}
function h(J) {
J.slideUp(250).fadeOut(250, function() {
B(this).addClass("jshide");
});
}
function g() {
if (q) return P && P.dialog("close"), c(), B(u).find('button[type="submit"]').attr("disabled", !1), 
B(x).triggerHandler("resize"), b && b(!0), !0;
z && P ? (H || (B(f).removeClass("jshide").hide().fadeIn(500), H = !0), I && (h(B(F)), 
I = !1)) : c();
B(u).find('input[type="submit"]').attr("disabled", !0);
b && b(!1);
return !1;
}
function l(J) {
var R, X = T || {};
for (R in X) if (X.hasOwnProperty(R)) {
var fa = X[R];
J[R] ? J[R].value = fa : B('<input type="hidden" />').attr("name", R).appendTo(J).val(fa);
}
}
function m(J) {
J.preventDefault();
J = B(J.target).serializeArray();
d(J);
n = !0;
return !1;
}
function v(J) {
J.preventDefault();
P.dialog("close");
return !1;
}
function k(J) {
J.preventDefault();
P.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function p(J) {
q = J.authed;
e = J.method;
B(f).find("span.loco-msg").text(J.message || "Something went wrong.");
O = J.warning || "";
J.notice && w.notices.info(J.notice);
if (q) "direct" !== e && (T = J.creds, l(u), n && J.success && w.notices.success(J.success)), 
g(); else if (J.reason) w.notices.info(J.reason); else if (J = J.prompt) {
var R = r();
R.html(J).find("form").on("submit", m);
R.dialog("option", "title", R.find("h2").remove().text());
R.find("button.cancel-button").show().on("click", v);
R.find('input[type="submit"]').addClass("button-primary");
g();
B(x).triggerHandler("resize");
} else w.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function a() {
g();
}
function d(J) {
n = !1;
w.ajax.setNonce("fsConnect", E).post("fsConnect", J, p, a);
return J;
}
var b, f = u, e = null, n = !1, q = !1, w = x.loco, z = u.path.value, D = u.auth.value, E = u["loco-nonce"].value, G = B(f).find("button.button-primary"), F = y.getElementById(f.id + "-warn"), H = !1, I = !1, O = "", P;
w.notices.convert(F).stick();
if (u.connection_type) {
var T = {};
T.connection_type = u.connection_type.value;
q = !0;
} else z && D && d({
path: z,
auth: D
});
g();
return {
applyCreds: function(J) {
if (J.nodeType) l(J); else {
var R, X = T || {};
for (R in X) X.hasOwnProperty(R) && (J[R] = X[R]);
}
return this;
},
setForm: function(J) {
u = J;
g();
l(J);
return this;
},
connect: function() {
z = u.path.value;
D = u.auth.value;
d(B(u).serializeArray());
return this;
},
listen: function(J) {
b = J;
q && J(!0);
return this;
},
authed: function() {
return q;
}
};
};
return A;
}({}, L, M));
C.register("$35", function(A) {
function x(c, h) {
return function(g) {
c.apply(g, h);
return g;
};
}
function y(c) {
return function(h, g) {
h = h && h[c] || 0;
g = g && g[c] || 0;
return h === g ? 0 : h > g ? 1 : -1;
};
}
function u(c) {
return function(h, g) {
return (h && h[c] || "").localeCompare(g && g[c] || "");
};
}
function r(c) {
return function(h, g) {
return -1 * c(h, g);
};
}
A.sort = function(c, h, g, l) {
h = "n" === g ? y(h) : u(h);
l && (h = r(h));
return x([].sort, [ h ])(c);
};
return A;
}({}, L, M));
C.register("$20", function(A) {
A.init = function(x) {
function y(d) {
var b = -1, f = d.length;
for (B("tr", v).remove(); ++b < f; ) v.appendChild(d[b].$);
}
function u(d) {
g = d ? p.find(d, r) : r.slice(0);
m && (d = c[m], g = a(g, m, d.type, d.desc));
y(g);
}
var r = [], c = [], h = 0, g, l, m, v = x.getElementsByTagName("tbody")[0], k = x.getElementsByTagName("thead")[0], p = C.require("$10", "fulltext.js").init(), a = C.require("$35", "sort.js").sort;
k && v && (B("th", k).each(function(d, b) {
var f = b.getAttribute("data-sort-type");
f && (d = h, B(b).addClass("loco-sort").on("click", function(e) {
e.preventDefault();
e = d;
var n = c[e], q = n.type, w = !(n.desc = !n.desc);
g = a(g || r.slice(0), e, q, w);
y(g);
l && l.removeClass("loco-desc loco-asc");
l = B(n.$).addClass(w ? "loco-desc" : "loco-asc").removeClass(w ? "loco-asc" : "loco-desc");
m = e;
return !1;
}), c[h] = {
$: b,
type: f
});
b.hasAttribute("colspan") ? h += Number(b.getAttribute("colspan")) : h++;
}), B("tr", v).each(function(d, b) {
var f, e, n = [], q = {
_: d,
$: b
}, w = b.getElementsByTagName("td");
for (f in c) {
b = w[f];
(e = b.textContent.replace(/(^\s+|\s+$)/g, "")) && n.push(e);
b.hasAttribute("data-sort-value") && (e = b.getAttribute("data-sort-value"));
switch (c[f].type) {
case "n":
e = Number(e);
}
q[f] = e;
}
r[d] = q;
p.index(d, n);
}), x = B('form.loco-filter input[type="text"]', x.parentNode), x.length && (x = x[0], 
k = B(x.form), 1 < r.length ? C.require("$11", "LocoTextListener.js").listen(x, u) : k.hide(), 
k.on("submit", function(d) {
d.preventDefault();
return !1;
})));
};
return A;
}({}, L, M));
var W = L.loco || {}, ha = W.conf || {
$v: [ 0, 0 ]
};
L = C.require("$1", "t.js").init();
M = ha.wplang;
W.version = function(A) {
return ha.$v[A || 0];
};
C.require("$2", "html.js");
C.require("$3", "number.js");
C.require("$4", "array.js");
C.require("$5", "json.js");
W.l10n = L;
L.load(ha.wpl10n);
M && L.pluraleq(M.pluraleq);
W.string = C.require("$6", "string.js");
W.notices = C.require("$7", "notices.js").init(L);
W.ajax = C.require("$8", "ajax.js").init(ha).localise(L);
W.locale = C.require("$9", "wplocale.js");
W.fulltext = C.require("$10", "fulltext.js");
W.watchtext = C.require("$11", "LocoTextListener.js").listen;
W.tooltip = C.require("$12", "tooltip.js");
W.po = {
ed: C.require("$13", "poedit.js"),
kbd: C.require("$14", "hotkeys.js"),
init: C.require("$15", "po.js").create,
ace: C.require("$16", "ace.js").strf("php"),
ref: C.require("$17", "refs.js")
};
W.apis = C.require("$18", "apis.js");
W.fs = C.require("$19", "fsconn.js");
B("#loco-admin.wrap table.wp-list-table").each(function(A, x) {
C.require("$20", "tables.js").init(x);
});
W.validate = function(A) {
return "2.6.4" !== (/^\d+\.\d+\.\d+/.exec(A && A[0] || "") && RegExp.lastMatch) ? (W.notices.warn("admin.js is the wrong version (2.6.4). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
(function(v, w, h, J) {
var m = function() {
function f(d) {
throw Error("Failed to require " + d);
}
var d = {};
return {
register: function(f, l) {
d[f] = l;
},
require: function(h, l) {
return d[h] || f(l);
},
include: function(h, l, g) {
return d[h] || (g ? f(l) : null);
}
};
}();
m.register("$1", function(f, d, h) {
function l(g) {
var c = typeof g;
if ("string" === c) if (/[^ <>!=()%^&|?:n0-9]/.test(g)) console.error("Invalid plural: " + g); else return new Function("n", "return " + g);
"function" !== c && (g = function(b) {
return 1 != b;
});
return g;
}
f.init = function(g) {
function c(a, b, e) {
return (a = p[a]) && a[e] ? a[e] : b || "";
}
function b(a) {
return c(a, a, 0);
}
function a(a, b) {
return c(b + "" + a, a, 0);
}
function e(a, b, e) {
e = Number(g(e));
isNaN(e) && (e = 0);
return c(a, e ? b : a, e);
}
g = l(g);
var p = {};
return {
__: b,
_x: a,
_n: e,
_: b,
x: a,
n: e,
load: function(a) {
p = a || {};
return this;
},
pluraleq: function(a) {
g = l(a);
return this;
}
};
};
return f;
}({}, v, w));
m.register("$2", function(f, d, h) {
f.ie = function() {
var l = !1, g = 0;
d.attachEvent && d.navigator && /MSIE (\d+)\./.exec(String(navigator.appVersion)) && (g = Number(RegExp.$1), 
l = 11 > g);
return function() {
return l;
};
}();
f.init = function() {
return f;
};
return f;
}({}, v, w));
m.register("$3", function(f, d, h) {
Number.prototype.format = function(d) {
d = Math.pow(10, d || 0);
var g = Math.round(d * this) / d;
d = [];
var g = String(g), c = g.split("."), g = c[0], c = c[1], b = g.length;
do {
d.unshift(g.substring(b - 3, b));
} while (0 < (b -= 3));
g = d.join(",");
if (d = c) {
d = c;
for (var a, c = d.length; "0" === d.charAt(--c); ) a = c;
a && (d = d.substring(0, a));
d = c = d;
}
d && (g += "." + c);
return g;
};
Number.prototype.percent = function(d) {
var g = 0, c = this && d ? 100 * (this / d) : 0;
if (0 === c) return "0";
if (100 === c) return "100";
if (99 < c) c = Math.min(c, 99.9), d = c.format(++g); else if (.5 > c) {
c = Math.max(c, 1e-4);
do {
d = c.format(++g);
} while ("0" === d && 4 > g);
d = d.substr(1);
} else d = c.format(0);
return d;
};
return f;
}({}, v, w));
m.register("$4", function(f, d, h) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(d) {
if (null == this) throw new TypeError();
var g, c = Object(this), b = c.length >>> 0;
if (0 === b) return -1;
g = 0;
1 < arguments.length && (g = Number(arguments[1]), g != g ? g = 0 : 0 != g && Infinity != g && -Infinity != g && (g = (0 < g || -1) * Math.floor(Math.abs(g))));
if (g >= b) return -1;
for (g = 0 <= g ? g : Math.max(b - Math.abs(g), 0); g < b; g++) if (g in c && c[g] === d) return g;
return -1;
});
return f;
}({}, v, w));
m.register("$5", function(f, d, m) {
d.JSON || (d.JSON = {
parse: h.parseJSON,
stringify: null
});
return f = d.JSON;
}({}, v, w));
m.register("$6", function(f, d, h) {
f.trim = function(d, g) {
for (g || (g = " \n"); d && -1 !== g.indexOf(d.substr(0, 1)); ) d = d.substr(1);
for (;d && -1 !== g.indexOf(d.substr(-1)); ) d = d.substr(0, d.length - 1);
return d;
};
f.sprintf = function(d) {
var g = 0, c = [].slice.call(arguments, 1);
return d.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(b, a, e) {
return "%" === e ? "%" : (a ? c[Number(a) - 1] : c[g++]) || "";
});
};
return f;
}({}, v, w));
m.register("$21", function(f, d, h) {
function l(g) {
return function(c, b) {
for (var a = c[g] || 0; (c = c.offsetParent) && c !== (b || h.body); ) a += c[g] || 0;
return a;
};
}
f.top = l("offsetTop");
f.left = l("offsetLeft");
f.el = function(g, c) {
var b = h.createElement(g || "div");
c && (b.className = c);
return b;
};
f.txt = function(g) {
return h.createTextNode(g || "");
};
return f;
}({}, v, w));
m.register("$7", function(f, d, E) {
function l(a, b, e) {
function r() {
c();
x = setTimeout(b, e);
}
function c() {
x && clearTimeout(x);
x = null;
}
var x;
r();
h(a).on("mouseenter", c).on("mouseleave", r);
return {
die: function() {
c();
h(a).off("mouseenter mouseleave");
}
};
}
function g(a, b) {
a.fadeTo(b, 0, function() {
a.slideUp(b, function() {
a.remove();
h(d).triggerHandler("resize");
});
});
return a;
}
function c(a, b) {
function e(b) {
n[x] = null;
g(h(a), 250);
c && c.die();
var r;
if (r = b) b.stopPropagation(), b.preventDefault(), r = !1;
return r;
}
function r(b) {
c && c.die();
return c = l(a, e, b);
}
var c, x, p, k = h(a), q = k.find("button");
0 === q.length && (k.addClass("is-dismissible"), q = h('<button type="button" class="notice-dismiss"> </a>').appendTo(k));
q.off("click").on("click", e);
h(d).triggerHandler("resize");
y();
x = n.length;
n.push(e);
b && (c = r(b));
return {
link: function(b, x) {
var e = x || b, r = h(a).find("nav"), e = h("<nav></nav>").append(h("<a></a>").attr("href", b).text(e));
p ? (p.push(e.html()), r.html(p.join("<span> | </span>"))) : (p = [ e.html() ], 
h(a).addClass("has-nav").append(e));
return this;
},
stick: function() {
c && c.die();
c = null;
n[x] = null;
return this;
},
slow: function(a) {
r(a || 1e4);
return this;
}
};
}
function b(a, b, e) {
var r = m.require("$21", "dom.js").el;
a = h('<div class="notice notice-' + a + ' loco-notice inline"></div>').prependTo(h("#loco-notices"));
var c = h(r("p"));
e = h(r("span")).text(e);
b = h(r("strong", "has-icon")).text(b + ": ");
c.append(b).append(e).appendTo(a);
return a;
}
function a(a, e, r, p) {
a = b(r, e, a).css("opacity", "0").fadeTo(500, 1);
h(d).triggerHandler("resize");
return c(a, p);
}
function e(b) {
return a(b, q, "warning");
}
function p() {
h("#loco-notices").find("div.notice").each(function(a, b) {
if (-1 === b.className.indexOf("jshide")) {
var e = -1 === b.className.indexOf("notice-success") ? null : 5e3;
c(b, e);
}
});
}
var n = [], k = d.console || {
log: function() {}
}, y = Date.now || function() {
return new Date().getTime();
}, z, q, r, D;
f.error = function(b) {
return a(b, z, "error");
};
f.warn = e;
f.info = function(b) {
return a(b, r, "info");
};
f.success = function(b) {
return a(b, D, "success", 5e3);
};
f.warning = e;
f.log = function() {
k.log.apply(k, arguments);
};
f.debug = function() {
(k.debug || k.log).apply(k, arguments);
};
f.clear = function() {
for (var a = -1, b, e = n, r = e.length; ++a < r; ) (b = e[a]) && b.call && b();
n = [];
return f;
};
f.create = b;
f.raise = function(a) {
(f[a.type] || f.error).call(f, a.message);
};
f.convert = c;
f.init = function(a) {
z = a._("Error");
q = a._("Warning");
r = a._("Notice");
D = a._("OK");
setTimeout(p, 1e3);
return f;
};
return f;
}({}, v, w));
m.register("$8", function(f, d, E) {
function l(a) {
var b = h("<pre>" + a + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = a) || (b = "Blank response from server");
return b;
}
function g(a) {
return (a = a.split(/[\r\n]/)[0]) ? (a = a.replace(/ +in +\S+ on line \d+/, ""), 
a = a.replace(/^[()! ]+Fatal error:\s*/, "")) : t._("Server returned invalid data");
}
function c(a) {
d.console && console.error && console.error('No nonce for "' + a + '"');
return "";
}
function b(a, b, e) {
a[b] = e;
}
function a(a, b, e) {
a.push({
name: b,
value: e
});
}
function e(a, b, e) {
a.append(b, e);
}
function p(a, b, e, c) {
function p(b, c, x) {
if ("abort" !== c) {
var r = k || {
_: function(a) {
return a;
}
}, A = b.status || 0, d = b.responseText, s = l(d), f = b.getResponseHeader("Content-Type") || "Unknown type", z = b.getResponseHeader("Content-Length") || d.length;
"success" === c && x ? n.error(x) : (n.error(g(s) + ".\n" + r._("Check console output for debugging information")), 
n.log("Ajax failure for " + a, {
status: A,
error: c,
message: x,
output: d
}), "parsererror" === c && (x = "Response not JSON"), n.log([ r._("Provide the following text when reporting a problem") + ":", "----", "Status " + A + ' "' + (x || r._("Unknown error")) + '" (' + f + " " + z + " bytes)", s, "====" ].join("\n")));
e && e.call && e(b, c, x);
y = b;
}
}
c.url = z;
c.dataType = "json";
var n = m.require("$7", "notices.js").clear();
y = null;
return h.ajax(c).fail(p).done(function(a, e, x) {
var c = a && a.data, k = a && a.notices, y = k && k.length, g = -1;
for (!c || a.error ? p(x, e, a && a.error && a.error.message) : b && b(c, e, x); ++g < y; ) n.raise(k[g]);
});
}
var n = {}, k, y, z = d.ajaxurl || "/wp-admin/admin-ajax.php";
f.init = function(a) {
n = a.nonces || n;
return f;
};
f.localise = function(a) {
k = a;
return f;
};
f.xhr = function() {
return y;
};
f.strip = l;
f.parse = g;
f.submit = function(a, b, e) {
function c(a, b) {
b.disabled ? b.setAttribute("data-was-disabled", "true") : b.disabled = !0;
}
function k(a, b) {
b.getAttribute("data-was-disabled") || (b.disabled = !1);
}
function n(a) {
a.find(".button-primary").removeClass("loading");
a.find("button").each(k);
a.find("input").each(k);
a.find("select").each(k);
a.find("textarea").each(k);
a.removeClass("disabled loading");
}
var y = h(a), g = y.serialize();
(function(a) {
a.find(".button-primary").addClass("loading");
a.find("button").each(c);
a.find("input").each(c);
a.find("select").each(c);
a.find("textarea").each(c);
a.addClass("disabled loading");
})(y);
return p(a.route.value, function(a, e, c) {
n(y);
b && b(a, e, c);
}, function(a, b, c) {
n(y);
e && e(a, b, c);
}, {
type: a.method,
data: g
});
};
f.post = function(k, r, y, g) {
var A = !0, G = r || {}, B = n[k] || c(k);
d.FormData && G instanceof FormData ? (A = !1, r = e) : r = Array.isArray(G) ? a : b;
r(G, "action", "loco_json");
r(G, "route", k);
r(G, "loco-nonce", B);
return p(k, y, g, {
type: "post",
data: G,
processData: A,
contentType: A ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
f.get = function(a, b, e, k) {
b = b || {};
var y = n[a] || c(a);
b.action = "loco_json";
b.route = a;
b["loco-nonce"] = y;
return p(a, e, k, {
type: "get",
data: b
});
};
f.setNonce = function(a, b) {
n[a] = b;
return f;
};
return f;
}({}, v, w));
m.register("$22", {
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
m.register("$9", function(f, d, h) {
function l() {}
var g, c = m.require("$22", "rtl.json");
f.init = function() {
return new l();
};
f.cast = function(b) {
return b instanceof l ? b : "string" === typeof b ? f.parse(b) : f.clone(b);
};
f.clone = function(b) {
var a, e = new l();
for (a in b) e[a] = b[a];
return e;
};
f.parse = function(b) {
if (!(g || (g = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(b)) return null;
var a = new l();
a.lang = RegExp.$1.toLowerCase();
if (b = RegExp.$2) a.region = b.toUpperCase();
if (b = RegExp.$3) a.variant = b.toLowerCase();
return a;
};
d = l.prototype;
d.isValid = function() {
return !!this.lang;
};
d.isKnown = function() {
var b = this.lang;
return !(!b || "zxx" === b);
};
d.toString = function(b) {
b = b || "_";
var a, e = this.lang || "zxx";
if (a = this.region) e += b + a;
if (a = this.variant) e += b + a;
return e;
};
d.getIcon = function() {
for (var b = 3, a, e, c = [ "variant", "region", "lang" ], n = []; 0 !== b--; ) if (a = c[b], 
e = this[a]) n.push(a), n.push(a + "-" + e.toLowerCase());
return n.join(" ");
};
d.isRTL = function() {
return !!c[String(this.lang).toLowerCase()];
};
d = null;
return f;
}({}, v, w));
m.register("$23", {
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
m.register("$10", function(f, d, h) {
f.init = function() {
function d(a) {
return k[a] || a;
}
function g(a, b, e, c) {
b = a.split(b);
for (var p = b.length; 0 !== p--; ) (a = b[p]) && null == c[a] && (e.push(a), c[a] = !0);
return e;
}
function c(a) {
return g(String(a || "").toLowerCase().replace(p, d), n, [], {});
}
function b(a, b) {
for (var c = [], r = {}, k, s = b.length, A = n; 0 !== s--; ) (k = b[s]) && g(String(k || "").toLowerCase().replace(p, d), A, c, r);
e[a] = c;
}
function a(a, b) {
var c = [], r = -1, p = e, k = p.length, n, g, d, u, x, F, f = a.length, l = b ? !0 : !1;
a: for (;++r < k; ) if (d = p[r], null != d && (u = d.length)) {
x = 0;
b: for (;x < f; x++) {
F = a[x];
for (n = 0; n < u; n++) if (g = d[n], 0 === g.indexOf(F)) continue b;
continue a;
}
c.push(l ? b[r] : r);
}
return c;
}
var e = [], p = /[^a-z0-9]/g, n = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/, k = m.require("$23", "flatten.json");
return {
split: c,
pull: function(b, e) {
return a(b, e);
},
find: function(b, e) {
return a(c(b), e);
},
add: function(a, b) {
e[a] = c(b);
},
push: function(a) {
b(e.length, a);
},
index: function(a, e) {
b(a, e);
},
size: function() {
return e.length;
},
clear: function() {
e = [];
},
remove: function(a) {
e[a] = null;
}
};
};
return f;
}({}, v, w));
m.register("$11", function(f, d, m) {
f.listen = function(f, g) {
function c() {
q[p ? "show" : "hide"]();
}
function b(a) {
z && f.setAttribute("size", 2 + a.length);
p = a;
c();
return a;
}
function a() {
n = null;
g(p);
}
function e() {
var e = f.value;
y && e === y && (e = "");
e !== p && (n && clearTimeout(n), b(e), k ? n = setTimeout(a, k) : a());
}
f instanceof jQuery && (f = f[0]);
var p, n, k = 150, y = d.attachEvent && f.getAttribute("placeholder"), z = 1 === Number(f.size), q = h('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
f.value = "";
e();
return !1;
});
b(f.value);
h(f).on("input blur focus", function() {
e();
return !0;
}).after(q);
c();
return {
delay: function(a) {
k = a;
},
ping: function(c) {
c ? (n && clearTimeout(n), c = f.value, y && c === y && (c = ""), b(c), a(), c = void 0) : c = e();
return c;
},
val: function(a) {
if (null == a) return p;
n && clearTimeout(n);
f.value = b(a);
c();
},
el: function() {
return f;
},
blur: function(a) {
return h(f).on("blur", a);
},
destroy: function() {
n && clearTimeout(n);
}
};
};
return f;
}({}, v, w));
m.register("$12", function(f, d, m) {
function l(b, a) {
this.$element = h(b);
this.options = a;
this.enabled = !0;
this.fixTitle();
}
f.init = function(b, a) {
var e = {
fade: !0,
offset: 5,
delayIn: g,
delayOut: c,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
a && (e = h.extend({}, e, a));
b.tipsy(e);
};
f.delays = function(b, a) {
g = b || 150;
c = a || 100;
};
f.kill = function() {
h("div.tipsy").remove();
};
f.text = function(b, a) {
a.data("tipsy").setTitle(b);
};
var g, c;
f.delays();
h(m.body).on("overlayOpened overlayClosing", function(b) {
f.kill();
return !0;
});
l.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
var a = this.tip();
a.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
a[0].className = "tipsy";
a.remove().css({
top: 0,
left: 0
}).prependTo(m.body);
var b = (b = this.options.anchor) ? this.$element.find(b) : this.$element, b = h.extend({}, b.offset(), {
width: b[0].offsetWidth,
height: b[0].offsetHeight
}), e = a[0].offsetWidth, c = a[0].offsetHeight, n = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, k;
switch (n.charAt(0)) {
case "n":
k = {
top: b.top + b.height + this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "s":
k = {
top: b.top - c - this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "e":
k = {
top: b.top + b.height / 2 - c / 2,
left: b.left - e - this.options.offset
};
break;

case "w":
k = {
top: b.top + b.height / 2 - c / 2,
left: b.left + b.width + this.options.offset
};
}
2 == n.length && ("w" == n.charAt(1) ? k.left = b.left + b.width / 2 - 15 : k.left = b.left + b.width / 2 - e + 15);
a.css(k).addClass("tipsy-" + n);
a.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + n.charAt(0);
this.options.className && a.addClass("function" == typeof this.options.className ? this.options.className.call(this.$element[0]) : this.options.className);
a.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var b = this.$element, a = b.attr("title") || "";
(a || "string" !== typeof b.attr("original-title")) && b.attr("original-title", a).removeAttr("title");
},
getTitle: function() {
var b, a = this.$element, e = this.options;
this.fixTitle();
"string" == typeof e.title ? b = a.attr("title" == e.title ? "original-title" : e.title) : "function" == typeof e.title && (b = e.title.call(a[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || e.fallback;
},
setTitle: function(b) {
var a = this.$element;
a.attr("default-title") || a.attr("default-title", this.getTitle());
null == b && (b = a.attr("default-title") || this.getTitle());
a.attr("original-title", b);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
},
tip: function() {
this.$tip || (this.$tip = h('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
h.fn.tipsy = function(b) {
function a(a) {
var e = h.data(a, "tipsy");
e || (e = new l(a, h.fn.tipsy.elementOptions(a, b)), h.data(a, "tipsy", e));
return e;
}
function e() {
var e = a(this), c = b.delayIn;
e.hoverState = "in";
0 == c ? e.show() : (e.fixTitle(), setTimeout(function() {
"in" == e.hoverState && e.show();
}, c));
}
function c() {
var e = a(this), p = b.delayOut;
e.hoverState = "out";
0 == p ? e.hide() : (e.tip().removeClass("in"), setTimeout(function() {
"out" == e.hoverState && e.hide();
}, p));
}
b = h.extend({}, h.fn.tipsy.defaults, b);
b.live || this.each(function() {
a(this);
});
if ("manual" != b.trigger) {
var n = b.live ? "live" : "bind", k = "hover" == b.trigger ? "mouseleave" : "blur";
this[n]("hover" == b.trigger ? "mouseenter" : "focus", e)[n](k, c);
}
return this;
};
h.fn.tipsy.defaults = {
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
h.fn.tipsy.elementOptions = function(b, a) {
return h.metadata ? h.extend({}, a, h(b).metadata()) : a;
};
h.fn.tipsy.autoNS = function() {
return h(this).offset().top > h(m).scrollTop() + h(d).height() / 2 ? "s" : "n";
};
h.fn.tipsy.autoWE = function() {
return h(this).offset().left > h(m).scrollLeft() + h(d).width() / 2 ? "e" : "w";
};
h.fn.tipsy.autoBounds = function(b, a) {
return function() {
var e = a[0], c = 1 < a.length ? a[1] : !1, n = h(m).scrollTop() + b, k = h(m).scrollLeft() + b, g = h(this);
g.offset().top < n && (e = "n");
g.offset().left < k && (c = "w");
h(d).width() + h(m).scrollLeft() - g.offset().left < b && (c = "e");
h(d).height() + h(m).scrollTop() - g.offset().top < b && (e = "s");
return e + (c ? c : "");
};
};
return f;
}({}, v, w));
m.register("$35", function(f, d, h) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return m.require("$6", "string.js").trim(this, " \n\r\t");
});
f.html = function() {
function d() {
b = /[<>&]/g;
a = /(\r\n|\n|\r)/g;
e = /(?:https?):\/\/(\S+)/gi;
p = location.hostname;
d = null;
}
function g(a) {
return "&#" + a.charCodeAt(0) + ";";
}
function c(a, b) {
return '<a href="' + a + '" target="' + (b.indexOf(p) ? "_blank" : "_top") + '">' + b + "</a>";
}
var b, a, e, p;
return function(p, k) {
d && d();
var y = p.replace(b, g);
k && (y = y.replace(e, c).replace(a, "<br />"));
return y;
};
}();
return f;
}({}, v, w));
m.register("$36", function(f, d, h) {
function l() {}
var g, c, b = m.require("$22", "rtl.json");
f.init = function() {
return new l();
};
f.cast = function(a) {
return a instanceof l ? a : "string" === typeof a ? f.parse(a) : f.clone(a);
};
f.clone = function(a) {
var b, c = new l();
for (b in a) c[b] = a[b];
return c;
};
f.parse = function(a) {
g || (c = /[-_+]/, g = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(c).join("-");
if (!g.exec(a)) return null;
var b = new l();
b.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) b.script = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
if (a = RegExp.$3) b.region = a.toUpperCase();
if (a = RegExp.$4) b.variant = a.toLowerCase();
if (a = RegExp.$5) b.extension = a;
return b;
};
d = l.prototype;
d.isValid = function() {
return !!this.lang;
};
d.isKnown = function() {
var a = this.lang;
return !(!a || "zxx" === a);
};
d.toString = function(a) {
a = a || "-";
var b, c = this.lang || "zxx";
if (b = this.script) c += a + b;
if (b = this.region) c += a + b;
if (b = this.variant) c += a + b;
if (b = this.extension) c += a + b;
return c;
};
d.getIcon = function() {
for (var a = 4, b, c, n = [ "variant", "region", "script", "lang" ], k = []; 0 !== a--; ) if (b = n[a], 
c = this[b]) c.join && (c = c.join("-")), 1 === a && 3 === c.length ? k.push("region-m49") : k = k.concat([ b, b + "-" + c.toLowerCase() ]);
return k.join(" ");
};
d.isRTL = function() {
return !!b[String(this.script || this.lang).toLowerCase()];
};
d = null;
return f;
}({}, v, w));
m.register("$37", function(f, d, h) {
function l(a) {
d.console && console.error && console.error(a);
}
function g() {
l("Method not implemented");
}
function c() {}
function b(a) {}
c.prototype.toString = function() {
return "[Undefined]";
};
b.prototype._validate = function(a) {
var b, p, n = !0;
for (b in this) p = this[b], p === g ? (l(a + "." + b + "() must be implemented"), 
n = !1) : p instanceof c && (l(a + "." + b + " must be defined"), n = !1);
return n;
};
f.init = function(a, e) {
var p, n = new b();
if (a) for (p = a.length; 0 !== p--; ) n[a[p]] = g;
if (e) for (p = e.length; 0 !== p--; ) n[e[p]] = new c();
return n;
};
f.validate = function(a) {
var b = /function (\w+)\(/.exec(a.toString()) ? RegExp.$1 : "";
a.prototype._validate(b || "Object");
};
return f;
}({}, v, w));
m.register("$48", function(f, d, h) {
var l = d.requestAnimationFrame, g = d.cancelAnimationFrame, c = 0;
if (!l || !g) for (var b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (l = d[b + "RequestAnimationFrame"]) if (g = d[b + "CancelAnimationFrame"] || d[b + "CancelRequestAnimationFrame"]) break;
l && g || (l = function(b) {
var p = a();
timeToCall = Math.max(0, 16 - (p - c));
nextTime = p + timeToCall;
timerId = d.setTimeout(function() {
b(nextTime);
}, timeToCall);
c = nextTime;
return timerId;
}, g = function(a) {
clearTimeout(a);
});
var a = Date.now || function() {
return new Date().getTime();
};
f.loop = function(a, b) {
function c() {
d = l(c, b);
a(k++);
}
var k = 0, d;
c();
return {
stop: function() {
d && g(d);
d = null;
}
};
};
return f;
}({}, v, w));
m.register("$45", function(f, d, h) {
function l(a, c, e, r) {
if (b) {
var k = e;
e = function(a) {
if ((a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType) return k(a);
};
}
a.addEventListener(c, e, r);
return {
unbind: function() {
a.removeEventListener(c, e, r);
}
};
}
function g(a) {
a.preventDefault();
a.stopPropagation();
return !1;
}
var c, b = !!d.navigator.msPointerEnabled, a = b ? "MSPointerDown" : "touchstart", e = b ? "MSPointerMove" : "touchmove", p = b ? "MSPointerUp" : "touchend";
f.ok = function(a) {
null == c && (c = "function" === typeof h.body.addEventListener);
c && a && a(f);
return c;
};
f.ms = function() {
return b;
};
f.dragger = function(b, c) {
function k(a) {
b.addEventListener(a, d[a], !1);
}
function r(a) {
b.removeEventListener(a, d[a], !1);
}
var d = {};
d[a] = function(b) {
n(b, function(e, k) {
k.type = a;
c(b, k, f);
});
k(e);
k(p);
return !0;
};
d[p] = function(a) {
r(e);
r(p);
n(a, function(b, e) {
e.type = p;
c(a, e, f);
});
return !0;
};
d[e] = function(a) {
n(a, function(b, k) {
k.type = e;
c(a, k, f);
});
return g(a);
};
k(a);
var f = {
kill: function() {
r(a);
r(e);
r(p);
b = f = c = null;
}
};
return f;
};
f.swiper = function(c, d, f) {
function r(a) {
c.addEventListener(a, u[a], !1);
}
function D(a) {
c.removeEventListener(a, u[a], !1);
}
function s() {
A && A.stop();
A = null;
}
var A, G, B, u = {}, x = [], F = [], h = [];
u[a] = function(a) {
G = !1;
s();
var b = k();
n(a, function(a, c) {
x[a] = b;
F[a] = c.clientX;
h[a] = c.clientY;
});
B = c.scrollLeft;
return !0;
};
u[p] = function(a) {
n(a, function(a, b) {
var c = k() - x[a], e = F[a] - b.clientX, c = Math.abs(e) / c;
d(c, e ? 0 > e ? -1 : 1 : 0);
});
B = null;
return !0;
};
u[e] = function(a) {
var b, e;
null == B || n(a, function(a, c) {
b = F[a] - c.clientX;
e = h[a] - c.clientY;
});
if (e && Math.abs(e) > Math.abs(b)) return G = !0;
b && (G = !0, c.scrollLeft = Math.max(0, B + b));
return g(a);
};
if (!b || f) r(a), r(e), r(p), b && (c.className += " mstouch");
return {
kill: function() {
D(a);
D(e);
D(p);
s();
},
swiped: function() {
return G;
},
ms: function() {
return b;
},
snap: function(a) {
b && !f && (c.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + a + "px)", 
c.style["-ms-scroll-snap-type"] = "mandatory", c.style["-ms-scroll-chaining"] = "none");
},
scroll: function(a, b, e) {
s();
var x = c.scrollLeft, k = a > x ? 1 : -1, r = Math[1 === k ? "min" : "max"], d = Math.round(16 * b * k);
return A = m.require("$48", "fps.js").loop(function(b) {
b && (x = Math.max(0, r(a, x + d)), c.scrollLeft = x, a === x && (s(), e && e(x)));
}, c);
}
};
};
f.start = function(b, c) {
return l(b, a, c, !1);
};
f.move = function(a, b) {
return l(a, e, b, !1);
};
f.end = function(a, b) {
return l(a, p, b, !1);
};
var n = f.each = function(a, c) {
if (b) (a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType && c(0, a); else for (var e = -1, k = (a.originalEvent || a).changedTouches || []; ++e < k.length; ) c(e, k[e]);
}, k = Date.now || function() {
return new Date().getTime();
};
return f;
}({}, v, w));
m.register("$49", function(f, d, m) {
f.init = function(d) {
function g() {
e.style.top = String(-d.scrollTop) + "px";
return !0;
}
function c() {
var a = e;
a.textContent = d.value;
a.innerHTML = a.innerHTML.replace(/[ \t]/g, b).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function b(a) {
return '<span class="x' + a.charCodeAt(0).toString(16) + '">' + a + "</span>";
}
var a = d.parentNode, e = a.insertBefore(m.createElement("div"), d);
h(d).on("input", c).on("scroll", g);
h(a).addClass("has-mirror");
e.className = "ta-mirror";
var p = d.offsetWidth - d.clientWidth;
2 < p && (e.style.marginRight = String(p - 2) + "px");
c();
g();
return {
kill: function() {
h(d).off("input", c).off("scroll", g);
a.removeChild(e);
e = null;
h(a).removeClass("has-mirror");
}
};
};
return f;
}({}, v, w));
m.register("$29", function(f, d, h) {
function l(b, a) {
for (var c = 0, p = -1, n = a && d[a], k = g[b] || [], f = k.length; ++p < f; ) callback = k[p], 
"function" === typeof callback && (callback(n), c++);
return c;
}
var g = {}, c;
f.load = function(b, a, c) {
function p() {
f && (clearTimeout(f), f = null);
z && (z.onreadystatechange = null, z = z = z.onload = null);
b && (delete g[b], b = null);
}
function n(a, k) {
var d = z && z.readyState;
if (k || !d || "loaded" === d || "complete" === d) k || l(b, c), p();
}
function k() {
if (0 === l(b)) throw Error('Failed to load "' + (c || b) + '"');
p();
}
if (c && d[c]) "function" === typeof a && a(d[c]); else if (null != g[b]) g[b].push(a); else {
g[b] = [ a ];
var f = setTimeout(k, 4e3), z = h.createElement("script");
z.setAttribute("src", b);
z.setAttribute("async", "true");
z.onreadystatechange = n;
z.onload = n;
z.onerror = k;
z.onabort = p;
h.getElementsByTagName("head")[0].appendChild(z);
}
};
f.stat = function(b) {
var a;
if (!(a = c)) {
for (var e, d, g = h.getElementsByTagName("script"), k = -1, f = g.length; ++k < f; ) if (a = g[k].getAttribute("src")) if (e = a.indexOf("/lib/vendor"), 
-1 !== e) {
d = a.substr(0, e);
break;
}
a = c = d || "/static";
}
return a + b;
};
return f;
}({}, v, w));
m.register("$16", function(f, d, E) {
function l(a, b) {
a.setReadOnly(!1);
a.on("change", function(a, c) {
return b.val(c.getValue());
});
a.on("focus", function() {
return b.focus();
});
a.on("blur", function() {
return b.blur();
});
}
function g(a) {
a.off("change");
a.off("focus");
a.off("blur");
}
function c(a) {
g(a);
a.setReadOnly(!0);
a.setHighlightGutterLine(!1);
a.setHighlightActiveLine(!1);
}
function b(b, c) {
function e() {
this.HighlightRules = d;
}
var d = a(c), r = b.require, g = r("ace/lib/oop");
g.inherits(d, r("ace/mode/text_highlight_rules").TextHighlightRules);
g.inherits(e, r("ace/mode/text").Mode);
return new e();
}
function a(a) {
return function() {
var b = {
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
}, c = e(a);
"icu" === a ? b = {
start: b.start.concat([ {
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
} : c && b.start.push({
token: "printf",
regex: c
});
this.$rules = b;
};
}
function e(a) {
switch (a) {
case "objc":
return /%(?:\d+\$)?[-+'0# ]*\d*(?:\.\d+|\.\*(?:\d+\$)?)?(?:hh?|ll?|[qjzTL])?[sScCdDioOuUxXfFeEgGaAp%@]/;

case "java":
return /%(?:\d+\$)?[-+,(0# ]*\d*(?:\.\d+)?(?:[bBhHsScCdoxXeEfgGaA%n]|[tT][HIklMSLNpzZsQBbhAaCYyjmdeRTrDFc])/;

case "php":
return /%(?:\d+\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?[suxXbcdeEfFgGo%]/;

case "python":
return /%(?:\([a-z]+\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;

case "javascript":
return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;

case "auto":
return /%(?:\d+\$|\([a-z]+\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;

case n:
return p || "%%";
}
}
var p, n = "auto";
f.init = function(a, e, p) {
var f, r = !1, D = p || n, s = a.parentNode, A = s.appendChild(E.createElement("div"));
h(s).addClass("has-proxy has-ace");
m.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(d) {
if (A) {
if (!d) throw Error("Failed to load code editor");
f = d.edit(A);
var g = f.session, p = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(r);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
g.setUseSoftTabs(!1);
p.setShowGutter(!0);
p.setPadding(10);
p.setScrollMargin(8);
g.setMode(b(d, D));
f.setValue(a.value, -1);
g.setUseWrapMode(!0);
e ? l(f, e) : c(f);
}
}, "ace");
return {
kill: function() {
f && (g(f), f.destroy(), f = null);
A && (s.removeChild(A), h(s).removeClass("has-proxy has-ace"), A = null);
return this;
},
disable: function() {
f && c(f);
e = null;
return this;
},
enable: function(a) {
e = a;
f && l(f, a);
return this;
},
resize: function() {
f && f.resize();
return this;
},
val: function(a) {
f && a !== f.getValue() && f.setValue(a, -1);
return this;
},
invs: function(a) {
a = a || !1;
r !== a && (r = a, f && f.setShowInvisibles(a));
return this;
},
strf: function(a) {
a = a || n;
a !== D && (D = a, f && f.session.setMode(b(d.ace, a)));
return this;
},
focus: function() {
return this;
}
};
};
f.strf = function(a, b) {
n = a;
p = b;
return f;
};
return f;
}({}, v, w));
m.register("$50", function(f, d, E) {
function l(a, b) {
function c() {
return b.val(a.getContent());
}
a.on("input", c);
a.on("change", c);
a.on("focus", function() {
return b.focus();
});
a.on("blur", function() {
return b.blur();
});
a.setMode("design");
}
function g(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function c(a) {
g(a);
a.setMode("readonly");
}
var b = 0;
f.load = function(a) {
var b = m.require("$29", "remote.js");
b.load(b.stat("/lib/tinymce.min.js"), a, "tinymce");
return f;
};
f.init = function(a, e) {
function d(a) {
z = a;
q = "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4);
return a.replace(/(<\/?)script/gi, "$1loco:script");
}
function n(a) {
k = a;
a._getContent = a.getContent;
a.getContent = function(a) {
a = this._getContent(a);
a = a.replace(/(<\/?)loco:script/gi, "$1script");
if (!q && "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4)) {
var b = a.substr(3, a.length - 7);
if (b === z || -1 === b.indexOf("</p>")) a = b;
}
return a;
};
a._setContent = a.setContent;
a.setContent = function(a, b) {
return this._setContent(d(a), b);
};
e ? (l(a, e), e.reset()) : c(a);
h(s).removeClass("loading");
}
var k, y = !1, z = "", q = !1, r = a.parentNode, D = r.parentNode, s = r.appendChild(E.createElement("div")), A = D.insertBefore(E.createElement("nav"), r);
A.id = "_tb" + String(++b);
h(r).addClass("has-proxy has-mce");
h(s).addClass("mce-content-body loading").html(d(a.value));
f.load(function(a) {
if (!a) throw Error("Failed to load HTML editor");
s && a.init({
inline: !0,
target: s,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + A.id,
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
init_instance_callback: n
});
});
return {
val: function(b) {
b = d(b);
null == k ? (a.value = b, h(s).html(b)) : k.getContent() !== b && k.setContent(b);
e && e.val(b);
return this;
},
kill: function() {
k && (e && e.val(k.getContent()), g(k), k.destroy(), k = null);
s && (r.removeChild(s), h(r).removeClass("has-proxy has-mce"), s = null);
A && (D.removeChild(A), A = null);
return this;
},
enable: function(a) {
e = a;
k && l(k, a);
return this;
},
disable: function() {
k && c(k);
e = null;
return this;
},
focus: function() {
k && e && k.focus();
return this;
},
invs: function(a) {
a = a || !1;
y !== a && (y = a, h(r)[a ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return f;
}({}, v, w));
m.register("$46", function(f, d, E) {
function l(b) {
function a() {
f && (z.off("input", e), f = !1);
}
function e() {
var a = b.value;
a !== r && (z.trigger("changing", [ a, r ]), r = a);
}
function d() {
e();
f && D !== r && z.trigger("changed", [ r ]);
}
function g() {
c = b;
D = r;
f || (z.on("input", e), f = !0);
z.trigger("editFocus");
q.addClass("has-focus");
return !0;
}
function k() {
c === b && (c = null);
z.trigger("editBlur");
q.removeClass("has-focus");
f && (d(), a());
return !0;
}
var f = !1, z = h(b), q = h(b.parentNode), r = b.value, D;
z.on("blur", k).on("focus", g);
return {
val: function(a) {
r !== a && (b.value = a, z.triggerHandler("input"), r = a);
return !0;
},
kill: function() {
a();
z.off("blur", k).off("focus", g);
},
fire: function() {
r = null;
e();
},
ping: d,
blur: k,
focus: g,
reset: function() {
D = r = b.value;
}
};
}
function g(b) {
this.e = b;
}
var c;
f._new = function(b) {
return new g(b);
};
f.init = function(b) {
var a = new g(b);
b.disabled ? (b.removeAttribute("disabled"), a.disable()) : b.readOnly ? a.disable() : a.enable();
return a;
};
TextAreaPrototype = g.prototype;
TextAreaPrototype.destroy = function() {
this.unlisten();
var b = this.p;
b && (b.kill(), this.p = null);
this.e = null;
};
TextAreaPrototype.reload = function(b, a) {
var c = this.l;
c && !a && (this.disable(), c = null);
this.val(b || "");
a && !c && this.enable();
return this;
};
TextAreaPrototype.val = function(b) {
var a = this.e;
if (null == b) return a.value;
var c = this.l, d = this.p;
d && d.val(b);
c && c.val(b);
c || a.value === b || (a.value = b, h(a).triggerHandler("input"));
return this;
};
TextAreaPrototype.fire = function() {
this.l && this.l.fire();
return this;
};
TextAreaPrototype.ping = function() {
this.l && this.l.ping();
return this;
};
TextAreaPrototype.focus = function() {
var b = this.p;
b ? b.focus() : h(this.e).focus();
};
TextAreaPrototype.focused = function() {
return c && c === this.el;
};
TextAreaPrototype.parent = function() {
return this.e.parentNode;
};
TextAreaPrototype.attr = function(b, a) {
var c = this.e;
if (1 === arguments.length) return c.getAttribute(b);
null == a ? c.removeAttribute(b) : c.setAttribute(b, a);
return this;
};
TextAreaPrototype.editable = function() {
return !!this.l;
};
TextAreaPrototype.enable = function() {
var b = this.p;
this.e.removeAttribute("readonly");
this.listen();
b && b.enable && b.enable(this.l);
return this;
};
TextAreaPrototype.disable = function() {
var b = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
b && b.disable && b.disable();
return this;
};
TextAreaPrototype.listen = function() {
var b = this.l;
b && b.kill();
this.l = l(this.e);
return this;
};
TextAreaPrototype.unlisten = function() {
var b = this.l;
b && (b.kill(), this.l = null);
return this;
};
TextAreaPrototype.setInvs = function(b, a) {
var c = this.i || !1;
if (a || c !== b) this._i && (this._i.kill(), delete this._i), (c = this.p) ? c.invs && c.invs(b) : b && (this._i = m.require("$49", "mirror.js").init(this.e)), 
this.i = b;
return this;
};
TextAreaPrototype.getInvs = function() {
return this.i || !1;
};
TextAreaPrototype.setMode = function(b) {
var a = this.p, e = this.i || !1;
b !== (this.m || "") && (this.m = b, a && a.kill(), this.p = a = "code" === b ? m.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === b ? m.require("$50", "mce.js").init(this.e, this.l) : null, 
this.setInvs(e, !0), c && this.focus());
return this;
};
TextAreaPrototype.setStrf = function(b) {
this["%"] = b;
"code" === this.m && this.p.strf(b);
return this;
};
TextAreaPrototype.name = function(b) {
this.e.setAttribute("name", b);
return this;
};
TextAreaPrototype.placeholder = function(b) {
this.e.setAttribute("placeholder", b);
return this;
};
TextAreaPrototype.redraw = function() {
var b = this.p;
b && b.resize && b.resize();
};
TextAreaPrototype = null;
return f;
}({}, v, w));
m.register("$47", function(f, d, m) {
function l(a) {
var b = d.console;
b && b.error && b.error(a);
}
function g(a) {
var b = m.createElement("div");
a && b.setAttribute("class", a);
return b;
}
function c(a) {
return function() {
a.resize();
return this;
};
}
function b(a) {
return function(b) {
for (var c = b.target, e = c.$index; null == e && "DIV" !== c.nodeName && (c = c.parentElement); ) e = c.$index;
null != e && (b.stopImmediatePropagation(), a.select(e));
return !0;
};
}
function a(a) {
return function() {
a.redrawDirty() && a.redraw();
return !0;
};
}
function e(a) {
return function(b) {
var c;
c = b.keyCode;
if (40 === c) c = 1; else if (38 === c) c = -1; else return !0;
if (b.shiftKey || b.ctrlKey || b.metaKey || b.altKey) return !0;
a.selectNext(c);
b.stopPropagation();
b.preventDefault();
return !1;
};
}
function p(a, b, c) {
function e(a) {
l("row[" + a + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(d) {
var g = b || 0, k = c ? -1 : 1, x = a.rows || [];
d.sort(function(a, b) {
return k * (x[a] || e(a)).cellVal(g).localeCompare((x[b] || e(b)).cellVal(g));
});
};
}
function n(a) {
this.w = a;
}
function k(a) {
this.t = a;
this.length = 0;
}
function y(a, b, c) {
var e = m.createElement("div");
e.className = c || "";
this._ = e;
this.d = b || [];
this.i = a || 0;
this.length = b.length;
}
function z(a) {
this.live = a;
this.rows = [];
}
f.create = function(a) {
return new n(a);
};
var q = n.prototype;
q.init = function(d) {
var k = this.w, p = k.id, n = k.splity(p + "-thead", p + "-tbody"), f = n[0], n = n[1], B = [], u = [], x = [], F = [];
if (d) this.ds = d, this.idxs = u, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
f.css.push("wg-thead");
n.css.push("wg-tbody");
d.eachCol(function(a, b, c) {
x[a] = p + "-col-" + b;
F[a] = c || b;
});
for (var N = g(), q = -1, z = x.length, l = g("wg-cols"), m = f.splitx.apply(f, x); ++q < z; ) m[q].header(F[q]), 
l.appendChild(N.cloneNode(!1)).setAttribute("for", x[q]);
d.eachRow(function(a, b, c) {
B[a] = new y(a, b, c);
u[a] = a;
});
this.rows = B;
this.cols = l;
this.ww = null;
this.root = N = n.body;
this.head = f;
f.redraw = c(this);
f = n.fixed = m[0].bodyY() || 20;
k.lock().resize(f, n);
k.css.push("is-table");
k.restyle();
this.sc ? this._re_sort(z) : d.sort && d.sort(u);
this.redrawDirty();
this.render();
h(N).attr("tabindex", "-1").on("keydown", e(this)).on("mousedown", b(this)).on("scroll", a(this));
return this;
};
q.clear = function() {
for (var a = this.pages || [], b = a.length; 0 !== b--; ) a[b].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
q.render = function() {
for (var a, b, c = [], e = this.rows || [], d = -1, k, g = this.idxs, x = g.length, p = this.idxr = {}, n = this.r, f = this._r, h = this.root, y = this.cols; ++d < x; ) {
0 === d % 100 && (a = y.cloneNode(!0), b = new z(a), b.h = 2200, b.insert(h), c.push(b));
k = g[d];
p[k] = d;
a = e[k];
if (null == a) throw Error("Render error, no data at [" + k + "]");
a.page = b;
b.rows.push(a);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = c;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == n ? null != f && (a = e[f]) && a.page && (delete this._r, this.select(f, !0)) : (a = e[n]) && a.page ? this.select(n, !0) : (this.deselect(), 
this._r = n);
return this;
};
q.resize = function() {
var a = -1, b = this.ww || (this.ww = []), c = this.w, e = c.cells[0], d = e.body.childNodes, k = d.length, g = this.pages || [], x = g.length;
for (c.redraw.call(e); ++a < k; ) b[a] = d[a].style.width;
if (x) {
c = this.mx;
for (a = this.mn; a <= c; a++) g[a].widths(b);
this.redrawDirty() && this.redraw();
}
};
q.redrawDirty = function() {
var a = !1, b = this.root, c = b.scrollTop, b = b.clientHeight;
this.sy !== c && (a = !0, this.sy = c);
this.vh !== b && (a = !0, this.vh = b);
return a;
};
q.redraw = function() {
for (var a = 0, b = -1, c = null, e = null, d = this.ww, k = this.sy, g = this.vh, x = this.mn, n = this.mx, p = Math.max(0, k - 100), k = g + k + 100, f = this.pages || [], h = f.length; ++b < h && !(a > k); ) g = f[b], 
a += g.height(), a < p || (null === c && (c = b), e = b, g.rendered || g.render(d));
if (x !== c) {
if (null !== x && c > x) for (b = x; b < c; b++) {
g = f[b];
if (!g) throw Error("Shit!");
g.rendered && g.sleep();
}
this.mn = c;
}
if (n !== e) {
if (null !== n && e < n) for (b = n; b > e; b--) g = f[b], g.rendered && g.sleep();
this.mx = e;
}
};
q.selected = function() {
return this.r;
};
q.thead = function() {
return this.w.cells[0];
};
q.tbody = function() {
return this.w.cells[1];
};
q.tr = function(a) {
return (a = this.row(a)) ? a.cells() : [];
};
q.row = function(a) {
return this.rows[a];
};
q.td = function(a, b) {
return this.tr(a)[b];
};
q.next = function(a, b, c) {
null == c && (c = this.r || 0);
var e = this.idxs, d = e.length, g = (this.idxr || {})[c];
for (c = g; c !== (g += a) && !(0 <= g && d > g); ) if (b && d) g = 1 === a ? -1 : d, 
b = !1; else return null;
c = e[g];
return null == c || null == this.rows[c] ? (l("Bad next: [" + g + "] does not map to data row"), 
null) : c;
};
q.selectNext = function(a, b, c) {
a = this.next(a, b);
null != a && this.r !== a && this.select(a, c);
return this;
};
q.deselect = function(a) {
var b = this.r;
null != b && (this.r = null, h(this.tr(b)).removeClass("selected"), this.w.fire("wgRowDeselect", [ b, a ]));
return this;
};
q.selectRow = function(a, b) {
return this.select(this.idxs[a]);
};
q.select = function(a, b) {
var c = this.rows[a], e = c && c.page;
if (!e) return this.deselect(!1), l("Row is filtered out"), this;
this.deselect(!0);
var d, g = this.w.cells[1];
e.rendered || (d = e.top(), g.scrollY(d), this.redrawDirty() && this.redraw());
if (!c.rendered) return e.rendered || l("Failed to render page"), l("Row [" + c.i + "] not rendered"), 
this;
e = c.cells();
h(e).addClass("selected");
this.r = a;
b || (d = g.scrollY(), h(this.root).focus(), d !== g.scrollY() && g.scrollY(d));
g.scrollTo(e[0], !0);
this.w.fire("wgRowSelect", [ a, c.data() ]);
return this;
};
q.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
q.filter = function(a) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(a);
return this.clear().render();
};
q.each = function(a) {
for (var b, c = -1, e = this.rows || [], d = this.idxs || [], g = d.length; ++c < g; ) b = d[c], 
a(e[b], c, b);
return this;
};
q.sortable = function(a) {
var b = this.sc || (this.sc = new k(this));
b.has(a) || b.add(a);
return this;
};
q._re_sort = function(a) {
var b = -1, c = this.sc, e = c.active;
for (this.sc = c = new k(this); ++b < a; ) c.add(b);
e && (b = this.head.indexOf(e.id), -1 === b && (b = Math.min(e.idx, a - 1)), this.sort(b, e.desc));
return this;
};
q._sort = function(a, b) {
b ? (this.s = b, b(a)) : (b = this.s) && b(a);
return a;
};
q.sort = function(a, b) {
this._sort(this.idxs, p(this, a, b));
this.sc.activate(a, b);
return this;
};
q = null;
q = k.prototype;
q.has = function(a) {
return null != this[a];
};
q.add = function(a) {
var b = this, c = b.t.head.cells[a];
b[a] = {
desc: null,
idx: a,
id: c.id
};
b.length++;
c.addClass("wg-sortable").on("click", function(c) {
if ("header" === c.target.nodeName.toLowerCase()) return c.stopImmediatePropagation(), 
b.toggle(a), !1;
});
return b;
};
q.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
q.activate = function(a, b) {
var c, e;
c = this.active;
var d = this[a], g = this.t.head.cells;
c && (e = g[c.idx]) && (e.removeClass(c.css), c !== d && e.restyle());
(e = g[a]) ? (d.desc = b, this.active = d, c = "wg-" + (b ? "desc" : "asc"), e.addClass(c).restyle(), 
d.css = c) : this.active = null;
return this;
};
q = null;
q = y.prototype;
q.render = function(a) {
var b, c = [], e = this._, d = this.length;
if (e) {
for (this.c = c; 0 !== d--; ) b = e.cloneNode(!1), c[d] = this.update(d, b), b.$index = this.i, 
a[d].appendChild(b);
this._ = null;
} else for (c = this.c; 0 !== d--; ) a[d].appendChild(c[d]);
this.rendered = !0;
return this;
};
q.update = function(a, b) {
var c = b || this.c[a] || {}, e = (this.d[a] || function() {})() || " ";
null == e.innerHTML ? c.textContent = e : c.innerHTML = e.innerHTML;
return c;
};
q.cells = function() {
return this.c || [ this._ ];
};
q.data = function() {
for (var a = -1, b = [], c = this.length; ++a < c; ) b[a] = this.cellVal(a);
return b;
};
q.destroy = function() {
this.page = null;
this.rendered = !1;
};
q.cellVal = function(a) {
a = this.d[a]() || "";
return String(a.textContent || a);
};
q = null;
q = z.prototype;
q.size = function() {
return this.rows.length;
};
q.insert = function(a) {
var b = this.h, c = g("wg-dead");
c.style.height = String(b) + "px";
a.appendChild(c);
return this.dead = c;
};
q.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
q.height = function() {
var a = this.h;
null == a && (this.h = a = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
a || l("row has zero height");
return a;
};
q.render = function(a) {
for (var b, c = -1, e = this.rows, d = e.length, g = this.dead, k = this.live, x = k.childNodes; ++c < d; ) b = e[c], 
b.rendered || b.render(x);
d = a.length;
for (c = 0; c < d; c++) x[c].style.width = a[c];
g.parentNode.replaceChild(k, g);
this.rendered = !0;
this.h = null;
return this;
};
q.sleep = function() {
var a = this.height(), b = this.live, c = this.dead;
c.style.height = String(a) + "px";
b.parentNode.replaceChild(c, b);
this.rendered = !1;
this.h = a;
return this;
};
q.sleepH = function(a) {
a *= this.rows.length;
var b = this.dead;
b && (b.style.height = String(a) + "px");
this.rendered || (this.h = a);
return this;
};
q.widths = function(a) {
for (var b = this.live.childNodes, c = a.length; 0 !== c--; ) b[c].style.width = a[c];
return this;
};
q.destroy = function() {
var a = this.rendered ? this.live : this.dead, b = this.rows, c = b.length;
for (a.parentNode.removeChild(a); 0 !== c--; ) b[c].destroy();
};
q = null;
return f;
}({}, v, w));
m.register("$38", function(f, d, E) {
function l(a, b) {
var c = a.id, e = c && r[c], d = e && e.parent();
if (!e || !d) return null;
var g = d.dir === q, c = g ? "X" : "Y", k = "page" + c, g = g ? z : y, n = g(d.el), c = b["offset" + c], p = d.el, f = p.className;
null == c && (c = b[k] - g(a));
c && (n += c);
p.className = f + " is-resizing";
return {
done: function() {
p.className = f;
},
move: function(a) {
d.resize(a[k] - n, e);
return !0;
}
};
}
function g(a, c) {
function e() {
h(E).off("mousemove", d);
s && (s.done(), s = null);
return !0;
}
function d(a) {
s ? s.move(a) : e();
return !0;
}
if (s) return !0;
s = l(a.target, a);
if (!s) return !0;
h(E).one("mouseup", e).on("mousemove", d);
return b(a);
}
function c(a, b) {
var c = b.type;
"touchmove" === c ? s && s.move(b) : "touchstart" === c ? s = l(a.target, b) : "touchend" === c && s && (s.done(), 
s = null);
}
function b(a) {
a.stopPropagation();
a.preventDefault();
return !1;
}
function a(a) {
var b = D;
b && b.redraw();
a && a.redraw();
return D = a;
}
function e(b, c) {
var e = h(c).on("editFocus", function() {
e.trigger("wgFocus", [ a(b) ]);
}).on("editBlur", function() {
e.trigger("wgBlur", [ a(null) ]);
});
}
function p(a) {
var b = a.id, c = a.className;
this.id = b;
this.el = a;
this.pos = this.index = 0;
this.css = [ c || "wg-root", "wg-cell" ];
this._cn = c;
r[b] = this;
this.clear();
}
var n = m.include("$44", "html.js") || m.include("$2", "html.js", !0), k = m.require("$21", "dom.js"), y = k.top, z = k.left, q = 1, r = {}, D, s = !1;
f.init = function(a) {
var b = new p(a);
b.redraw();
m.require("$45", "touch.js").ok(function(b) {
b.dragger(a, c);
});
h(a).on("mousedown", g);
return b;
};
d = p.prototype;
d.fire = function(a, b) {
var c = h.Event(a);
c.cell = this;
h(this.el).trigger(c, b);
return this;
};
d.each = function(a) {
for (var b = -1, c = this.cells, e = c.length; ++b < e; ) a(c[b], b);
return this;
};
d.indexOf = function(a) {
return (a = r[a.id || String(a)]) && a.pid === this.id ? a.index : -1;
};
d.on = function() {
return this.$("on", arguments);
};
d.off = function() {
return this.$("off", arguments);
};
d.find = function(a) {
return h(this.el).find(a);
};
d.$ = function(a, b) {
h.fn[a].apply(h(this.el), b);
return this;
};
d.addClass = function(a) {
this.css.push(a);
return this;
};
d.removeClass = function(a) {
a = this.css.indexOf(a);
-1 !== a && this.css.splice(a, 1);
return this;
};
d.parent = function() {
return this.pid && r[this.pid];
};
d.splitx = function() {
return this._split(q, arguments);
};
d.splity = function() {
return this._split(2, arguments);
};
d._split = function(a, b) {
(this.length || this.field) && this.clear();
for (var c = -1, e, d = b.length, g = 1 / d, n = 0; ++c < d; ) {
e = k.el();
this.body.appendChild(e);
for (var f = e, h = b[c], y = h, q = 1; r[h]; ) h = y + "-" + ++q;
f.id = h;
e = new p(e);
e.index = c;
e.pid = this.id;
e._locale(this.lang, this.rtl);
e.pos = n;
n += g;
this.cells.push(e);
this.length++;
}
this.dir = a;
this.redraw();
return this.cells;
};
d.destroy = function() {
this.clear();
delete r[this.id];
var a = this.el;
a.innerHTML = "";
this.body = null;
a.className = this._cn || "";
h(a).off();
return this;
};
d.exists = function() {
return this === r[this.id];
};
d.clear = function() {
for (var a = this.el, b = this.cells, c = this.field, e = this.body, d = this.nav, g = this.length || 0; 0 !== g--; ) delete r[b[g].destroy().id];
this.cells = [];
this.length = 0;
d && (a.removeChild(d), this.nav = null);
e && (c && (n.ie() && h(e).triggerHandler("blur"), c.destroy(), this.field = null), 
this.table && (this.table = null), a === e.parentNode && a.removeChild(e));
this.body = a.appendChild(k.el("", "wg-body"));
this._h = null;
return this;
};
d.resize = function(a, b) {
if (!b && (b = this.cells[1], !b)) return;
var c = b.index, e = this.cells, d = h(this.el)[this.dir === q ? "width" : "height"](), g = e[c + 1], c = e[c - 1];
pad = (b.body || b.el.firstChild).offsetTop || 0;
max = (g ? g.pos * d : d) - pad;
min = c ? c.pos * d : 0;
b.pos = Math.min(max, Math.max(min, a)) / d;
this.redraw();
return this;
};
d.distribute = function(a) {
for (var b = -1, c = 0, e, d = this.cells, g = a.length; ++b < g && (e = d[++c]); ) e.pos = Math.max(0, Math.min(1, a[b]));
this.redraw();
return this;
};
d.distribution = function() {
for (var a = [], b = 0, c = this.cells, e = c.length - 1; b < e; ) a[b] = c[++b].pos;
return a;
};
d.restyle = function() {
var a = this.css.concat();
0 === this.index ? a.push("first") : a.push("not-first");
this.dir && (a.push("wg-split"), 2 === this.dir ? a.push("wg-split-y") : a.push("wg-split-x"));
this.t && a.push("has-title");
this.nav && a.push("has-nav");
this.field && (a.push("is-field"), this.field.editable() ? a.push("is-editable") : a.push("is-readonly"));
a = a.join(" ");
a !== this._css && (this._css = a, this.el.className = a);
return this;
};
d.redraw = function(a) {
this.restyle();
var b = this.el, c = this.body, e = this.field;
if (c) {
var d, g = b.clientWidth || 0, k = b.clientHeight || 0, n = c.offsetTop || 0, k = n > k ? 0 : k - n;
this._h !== k && (this._h = k, c.style.height = String(k) + "px", d = e);
this._w !== g && (this._w = g, d = e);
d && d.redraw();
}
c = this.length;
g = 1;
k = this.nav;
for (n = 2 === this.dir ? "height" : "width"; 0 !== c--; ) e = this.cells[c], k ? d = 1 : (e.fixed && (e.pos = e.fixed / h(b)[n]()), 
d = g - e.pos, g = e.pos), e.el.style[n] = String(100 * d) + "%", e.redraw(a);
return this;
};
d.contents = function(a, b) {
var c = this.el, e = this.body;
if (null == a) return e.innerHTML;
this.length ? this.clear() : e && (c.removeChild(e), e = null);
e || (this.body = e = c.appendChild(k.el("", b || "wg-content")), this._h = null, 
(c = this.lang) && this._locale(c, this.rtl, !0));
"string" === typeof a ? h(e)._html(a) : a && this.append(a);
this.redraw();
return this;
};
d.textarea = function(a, b) {
var c = this.field;
if (c) {
var d = c.editable();
c.reload(a, b);
d !== b && this.restyle();
} else this.length && this.clear(), d = k.el("textarea"), d.setAttribute("wrap", "virtual"), 
d.value = a, this.contents(d), c = m.require("$46", "field.js")._new(d)[b ? "enable" : "disable"](), 
e(this, d), this.field = c, this.restyle();
this.lang || this.locale("en");
return c;
};
d.locale = function(a) {
a = m.require("$36", "locale.js").cast(a);
return this._locale(String(a), a.isRTL());
};
d._locale = function(a, b, c) {
var e = this.body;
if (c || a !== this.lang) this.lang = a, e && e.setAttribute("lang", a);
if (c || b !== this.rtl) this.rtl = b, e && e.setAttribute("dir", b ? "RTL" : "LTR");
return this;
};
d.editable = function() {
var a = this.field;
if (a) return a.editable() ? a : null;
var b = this.cells, c = b.length, e = this.navigated();
if (null != e) return b[e].editable();
for (;++e < c; ) {
for (e = 0; e < c; c++) ;
if (a = b[e].editable()) return a;
}
};
d.eachTextarea = function(a) {
var b = this.field;
b ? a(b) : this.each(function(b) {
b.eachTextarea(a);
});
return this;
};
d.append = function(a) {
a && (a.nodeType ? n.init(this.body.appendChild(a)) : n.init(h(a).appendTo(this.body)));
return this;
};
d.prepend = function(a) {
var b = this.body;
if (a.nodeType) {
var c = b.firstChild;
n.init(c ? b.insertBefore(a, c) : b.appendChild(a));
} else n.init(h(a).prependTo(b));
return this;
};
d.before = function(a) {
var b = this.body;
a.nodeType ? n.init(this.el.insertBefore(a, b)) : n.init(h(a).insertBefore(b));
return this;
};
d.header = function(a, b) {
if (null == a && null == b) return this.el.getElementsByTagName("header")[0];
this.t = k.txt(a || "");
this.el.insertBefore(k.el("header", b), this.body).appendChild(this.t);
this.redraw();
return this;
};
d.title = function(a) {
var b = this.t;
if (b) return b.nodeValue = a || "", b;
this.header(a);
return this.t;
};
d.titled = function() {
var a = this.t;
return a && a.nodeValue;
};
d.bodyY = function() {
return y(this.body, this.el);
};
d.scrollY = function(a) {
if (J === a) return this.body.scrollTop;
this.body.scrollTop = a;
};
d.tabulate = function(a) {
var b = this.table;
b ? b.clear() : b = m.require("$47", "wgtable.js").create(this);
b.init(a);
return this.table = b;
};
d.lock = function() {
this.body.className += " locked";
return this;
};
d.scrollTo = function(a, b) {
var c, e = this.body;
c = e.scrollTop;
var d = y(a, e);
if (c > d) c = d; else {
var g = e.clientHeight, d = d + h(a).outerHeight();
if (g + c < d) c = d - g; else return;
}
b ? e.scrollTop = c : h(e).stop(!0).animate({
scrollTop: c
}, 250);
};
d.navigize = function(a, c) {
function e(a) {
var b = g[a], c = f[a], d = h(b.el).show();
c.addClass("active");
p = a;
y.data("idx", a);
b.fire("wgTabSelect", [ a ]);
return d;
}
var d = this, g = d.cells, n = d.nav, p, f = [];
n && d.el.removeChild(n);
var n = d.nav = d.el.insertBefore(k.el("nav", "wg-tabs"), d.body), y = h(n).on("click", function(a) {
var c = h(a.target).data("idx");
if (null == c) return !0;
if (null != p) {
var k = f[p];
h(g[p].el).hide();
k.removeClass("active");
}
e(c);
d.redraw();
return b(a);
});
null == c && (c = y.data("idx") || 0);
d.each(function(b, c) {
f[c] = h('<a href="#' + b.id + '"></a>').data("idx", c).text(a[c]).appendTo(y);
b.pos = 0;
h(b.el).hide();
});
e(g[c] ? c : 0);
d.lock();
d.redraw();
return d;
};
d.navigated = function() {
var a = this.nav;
if (a) return h(a).data("idx");
};
d = null;
return f;
}({}, v, w));
m.register("$24", function(f, d, E) {
function l(a) {
var b = [];
a && (a.saved() || b.push("po-unsaved"), a.fuzzy() ? b.push("po-fuzzy") : a.flagged() && b.push("po-flagged"), 
a.translation() || b.push("po-empty"), a.comment() && b.push("po-comment"));
return b.join(" ");
}
function g(a, b, c) {
b = h(a.title(b).parentNode);
var e = b.find("span.lang");
c ? (c = m.require("$36", "locale.js").cast(c), e.length || (e = h("<span></span>").prependTo(b)), 
e.attr("lang", c.lang).attr("class", c.getIcon() || "lang region region-" + (c.region || "zz").toLowerCase())) : (e.remove(), 
c = "en");
a.locale(c);
return b;
}
function c(a, b, c) {
b.on("click", function(b) {
var e = a.fire(c, [ b.target ]);
e || b.preventDefault();
return e;
});
}
function b() {
this.dirty = 0;
}
m.require("$3", "number.js");
var a = "poUpdate", e = "changing", p = "changed", n = 0, k = 1, y = 2, z = 3, q = 4, r = 5, D, s, A = m.require("$35", "string.js").html, v = m.require("$6", "string.js").sprintf;
f.extend = function(a) {
return a.prototype = new b();
};
f.localise = function(a) {
s = a;
return f;
};
var B = function() {
var a = E.createElement("p");
return function(b) {
a.innerHTML = b.replace("src=", "x=");
return a.textContent.trim() || b.trim();
};
}(), u = b.prototype = m.require("$37", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
u.init = function() {
this.localise();
this.editable = {
source: !0,
target: !0
};
this.mode = "";
this.html = !1;
return this;
};
u.localise = function(a) {
a || (a = s || m.require("$1", "t.js").init());
var b = [];
b[n] = a._x("Source text", "Editor") + ":";
b[z] = a._x("%s translation", "Editor") + ":";
b[q] = a._x("Context", "Editor") + ":";
b[r] = a._x("Comments", "Editor") + ":";
b[k] = a._x("Single", "Editor") + ":";
b[y] = a._x("Plural", "Editor") + ":";
b[6] = a._x("Untranslated", "Editor");
b[7] = a._x("Translated", "Editor");
b[8] = a._x("Toggle Fuzzy", "Editor");
b[9] = a._x("Suggest translation", "Editor");
this.labels = b;
this.t = a;
return this;
};
u.setRootCell = function(a) {
function b(a) {
c.redraw(!0, a);
return !0;
}
var c = m.require("$38", "wingrid.js").init(a);
h(d).on("resize", b);
this.redraw = b;
h(a).on("wgFocus wgBlur", function(a, b) {
a.stopPropagation();
D = b;
});
this.destroy = function() {
c.destroy();
h(d).off("resize", b);
};
this.rootDiv = a;
return c;
};
u.$ = function() {
return h(this.rootDiv);
};
u.setListCell = function(a) {
var b = this;
b.listCell = a;
a.on("wgRowSelect", function(a, c) {
b.loadMessage(b.po.row(c));
return !0;
}).on("wgRowDeselect", function(a, c, e) {
e || b.loadNothing();
return !0;
});
};
u.setSourceCell = function(a) {
this.sourceCell = a;
};
u.setTargetCell = function(a) {
this.targetCell = a;
};
u.next = function(a, b, c) {
for (var e = this.listTable, d = e.selected(), g = d, k, n = this.po; null != (d = e.next(a, c, d)); ) {
if (g === d) {
d = null;
break;
}
if (b && (k = n.row(d), k.translated(0))) continue;
break;
}
null != d && e.select(d, !0);
return d;
};
u.current = function(a) {
var b = this.active;
if (null == a) return b;
a ? a.is(b) ? this.reloadMessage(a) : this.loadMessage(a) : this.unloadActive();
return this;
};
u.getTargetOffset = function() {
if (this.active) return this.targetCell && this.targetCell.navigated() || 0;
};
u.getTargetEditable = function() {
return this.editable.target && this.targetCell && this.targetCell.editable();
};
u.getSourceEditable = function() {
return this.editable.source && this.sourceCell && this.sourceCell.editable();
};
u.getContextEditable = function() {
return this.editable.context && this.contextCell && this.contextCell.editable();
};
u.getFirstEditable = function() {
return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};
u.searchable = function(a) {
a && (this.dict = a, this.po && this.rebuildSearch());
return this.dict && !0;
};
u.rebuildSearch = function() {
var a = -1, b = this.po.rows, c = b.length, e = this.dict;
for (e.clear(); ++a < c; ) e.add(a, b[a].toText());
};
u.filtered = function() {
return this.lastSearch || "";
};
u.filter = function(a, b) {
var c, e = this.listTable, d = this.lastFound, g = this.lastSearch;
if (a) {
if (g === a) return d || 0;
if (g && !d && 0 === a.indexOf(g)) return 0;
c = this.dict.find(a);
}
this.lastSearch = g = a;
this.lastFound = d = c ? c.length : this.po.length;
c ? e.filter(c) : e.unfilter();
b || this.fire("poFilter", [ g, d ]);
return d;
};
u.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
u.unsave = function(a, b) {
var c = !1;
if (a) {
if (c = a.saved(b)) this.dirty++, a.unsave(b), this.fire("poUnsaved", [ a, b ]);
this.markUnsaved(a);
}
return c;
};
u.markUnsaved = function(a) {
var b = this.po.indexOf(a);
if ((b = this.listTable.tr(b)) && b.length) {
var c = b[0].className;
a = c.replace(/(?:^| +)po-[a-z]+/g, "") + " " + l(a);
a !== c && h(b).attr("class", a);
}
};
u.save = function(a) {
var b = this.po;
if (this.dirty || a) b.each(function(a, b) {
b.save();
}), this.listCell.find("div.po-unsaved").removeClass("po-unsaved"), this.dirty = 0, 
this.fire("poSave");
return b;
};
u.fire = function(a, b) {
var c = this.handle;
if (c && c[a] && (c = c[a].apply(this, b || []), !1 === c)) return !1;
c = h.Event(a);
this.$().trigger(c, b);
return !c.isDefaultPrevented();
};
u.on = function(a, b) {
this.$().on(a, b);
return this;
};
u.getSorter = function() {
return null;
};
u.reload = function() {
var a = this, b, c = a.listCell, e = a.listTable, d = a.po, g = d && d.locale(), k = g && g.isRTL(), n = d && d.length || 0;
if (!d || !d.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = g;
a.lastSearch && (a.lastSearch = "", a.lastFound = n, a.fire("poFilter", [ "", n ]));
e && (b = e.thead().distribution());
a.listTable = e = c.tabulate({
eachCol: function(b) {
var c, e, d = a.getListColumns(), g = a.getListHeadings();
for (e in d) c = d[e], b(c, e, g[c]);
},
eachRow: function(b) {
d.each(function(c, e) {
b(e.idx, a.getListEntry(e), l(e));
});
},
sort: a.getSorter()
});
var p, c = a.getListColumns();
for (p in c) e.sortable(c[p]);
b && e.thead().distribute(b);
e.tbody().$(k ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad");
return !!n;
};
u.load = function(a, b) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== b ? this.listTable.selectRow(b || 0) : this.active && this.unloadActive());
};
u.pasteMessage = function(a) {
var b, c = 0;
this.active === a && ((b = this.sourceCell) && b.eachTextarea(function(b) {
b.val(a.source(null, c++));
}), (b = this.contextCell) && b.eachTextarea(function(b) {
b.val(a.context());
}), b = this.targetCell) && (c = 0, b.eachTextarea(function(b) {
b.val(a.translation(c++));
}));
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
u.reloadMessage = function(a) {
var b = this.sourceCell, c = this.targetCell, e;
this.pasteMessage(a);
b && this.setSrcMeta(a, b) && b.redraw();
c && (e = c.navigated() || 0, e = this.setTrgMeta(a, e, c), !b && this.setSrcMeta(a, c) && (e = !0), 
e && c.redraw());
return this;
};
u.setStatus = function() {
return null;
};
u.setSrcMeta = function(a, b) {
var e = [], d, g = !1, k = this.$smeta, n = this.labels, p = [], f = a.tags(), y = f && f.length;
if (d = a.context()) p.push("<span>" + A(n[q]) + "</span>"), p.push("<mark>" + A(d) + "</mark>");
if (y && this.getTag) for (p.push("<span>Tagged:</span>"); 0 <= --y; ) (d = this.getTag(f[y])) && p.push('<mark class="tag">' + A(d.mod_name) + "</mark>");
p.length && e.push(p.join(" "));
if (this.getMono() && (d = a.refs()) && (f = d.split(/\s/), y = f.length)) {
for (p = []; 0 <= --y; ) d = f[y], p.push("<code>" + A(d) + "</code>");
e.push('<p class="has-icon icon-file">' + p.join(" ") + "</p>");
}
(d = a.notes()) && e.push('<p class="has-icon icon-info">' + A(d, !0) + "</p>");
e.length ? (k || (k = b.find("div.meta"), k.length || (k = h('<div class="meta"></div>').insertAfter(b.header())), 
c(this, k, "poMeta"), this.$smeta = k), k.html(e.join("\n")).show(), g = !0) : k && k.text() && (k.text("").hide(), 
g = !0);
return g;
};
u.setTrgMeta = function(a, b, c) {
var e = [], d = !1, g = this.$tmeta;
b = (a = a.errors(b)) && a.length;
var k;
if (b) for (k = 0; k < b; k++) e.push('<p class="has-icon icon-warn">' + A(a[k], !0) + ".</p>");
e.length ? (g || (g = c.find("div.meta"), g.length || (g = h('<div class="meta"></div>').insertAfter(c.header())), 
this.$tmeta = g), g.html(e.join("\n")).show(), d = !0) : g && g.text() && (g.text("").hide(), 
d = !0);
return d;
};
u.loadMessage = function(b) {
function c(a, b) {
var e = b ? a.split(" ") : a.split(" ", 1);
a = e[0];
"=" === a.charAt(0) && (a = a.substr(1), a = [ "zero", "one", "two" ][Number(a)] || a);
e[0] = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
return e.join(" ");
}
function d(a, e) {
var p = J, h = L[n];
a.off();
a.titled() !== h && g(a, h, e || "en");
h = !1;
s.setSrcMeta(b, a) && (h = !0);
if (b.plural()) {
var h = -1, q = [], r = [], l = a.id + "-", z = b.sourceForms() || e && e.plurals || [ "One", "Other" ], m = z.length;
if (2 !== m || "=" === z[0].charAt(0) && "=1" !== z[0]) for (;++h < m; ) q[h] = l + String(h), 
r[h] = c(z[h]) + ":"; else q = [ l + "-0", l + "-1" ], r = [ L[k], L[y] ];
a.splity.apply(a, q);
a.each(function(a, c) {
a.header(r[c]).textarea(b.source(null, c), p).setStrf(C).setMode(A).setInvs(B);
});
a.lock();
p && a.each(function(a, b) {
f(a, b);
});
} else h && a.redraw(), a.textarea(b.source(), p).setStrf(C).setMode(A).setInvs(B), 
p && f(a, 0);
}
function f(c, d) {
c.on(e, function(a, c) {
b.source(c, d);
0 === d && s.updateListCell(b, "source");
s.unsave(b, d);
}).on(p, function() {
0 === d && s.po.reIndex(b);
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function h(a, e, d) {
M && a.eachTextarea(function(a) {
a.ping();
});
a.off();
var k = e.isKnown() && e.label || "Target", k = v(L[z], k);
a.titled() !== k && g(a, k, e);
k = !1;
!this.sourceCell && s.setSrcMeta(b, a) && (k = !0);
s.setTrgMeta(b, d, a) && (k = !0);
s.setStatus(b, d);
if (b.pluralized()) {
var n = [], p = [], f = a.id + "-", y = b.targetForms() || e.plurals || [ "One", "Other" ], k = y.length, q = function(a) {
var b = y[a];
p.push(b ? c(b, !0) : "Form " + a);
n.push(f + String(a));
};
for (b.each(q); (e = n.length) < k; ) q(e);
a.splitx.apply(a, n);
a.each(function(a, c) {
var e = M && !b.disabled(c);
a.textarea(b.translation(c), e).setStrf(C).setMode(A).setInvs(B);
M && l(a, c);
});
a.navigize(p, d || null).on("wgTabSelect", function(c, e) {
var d = M && c.cell.editable();
d && d.focus();
s.setTrgMeta(b, e, a);
s.setStatus(b, e);
s.fire("poTab", [ e ]);
});
} else k && a.redraw(), a.textarea(b.translation(), M && !b.disabled(0)).setStrf(C).setMode(A).setInvs(B), 
M && l(a, 0);
}
function l(c, d) {
c.on(e, function(a, c, e) {
b.translate(c, d);
0 === d && s.updateListCell(b, "target");
b.fuzzy(d) ? s.fuzzy(!1, b, d) : s.unsave(b, d);
"" === c ? (s.fire("poEmpty", [ !0, b, d ]), s.setStatus(b, d)) : "" === e && (s.fire("poEmpty", [ !1, b, d ]), 
s.setStatus(b, d));
}).on(p, function() {
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function m(c) {
c.off();
var d = L[q];
c.titled() !== d && (g(c, d), s.setStatus(null));
c.textarea(b.context(), !0).setMode(A).setInvs(B);
X && c.on(e, function(a, c) {
b.context(c);
s.updateListCell(b, "source");
s.unsave(b, O);
}).on(p, function() {
s.po.reIndex(b);
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function u(a) {
var c = L[r];
a.titled() !== c && g(a, c);
a.off().on(e, function(a, c) {
b.comment(c);
s.fire("poComment", [ b, c ]);
s.unsave(b, O);
}).textarea(b.comment(), !0);
}
var s = this, A = s.mode, E = b.isHTML(), B = s.inv || !1, w = this.fmt || null, C = b.format() || null, I = b.is(s.active), O = 0, T = s.sourceCell, S = s.targetCell, U = s.contextCell, V = s.commentCell, M = s.editable.target, J = s.editable.source, X = s.editable.context, P = D, Y = s.sourceLocale, W = s.targetLocale, L = s.labels;
s.html !== E && (s.html = E, "code" !== s.mode && (A = E ? "html" : "", s.setMode(A)));
s.active = b;
T && d(T, Y);
U && m(U);
S && W && (O = S.navigated() || 0, h(S, W, O));
V && u(V);
P && (P.exists() || (P = P.parent()), (E = P.editable()) && E.focus());
w !== C && (this.fmt = C);
I || s.fire("poSelected", [ b, O ]);
};
u.unloadActive = function() {
function a(b) {
b && b.text("").hide();
}
function b(a) {
a && a.off().clear();
}
a(this.$smeta);
a(this.$tmeta);
b(this.sourceCell);
b(this.contextCell);
b(this.targetCell);
this.commentCell && this.commentCell.off();
this.active && (this.fire("poDeselected", [ this.active ]), this.active = null);
return this;
};
u.loadNothing = function() {
var a, b = this.t, c = this.mode || "", e = this.inv || !1, d = this.fmt;
this.unloadActive();
this.setStatus(null);
(a = this.commentCell) && a.textarea("", !1);
if (a = this.sourceCell) a.textarea("", !1).setStrf(d).setMode(c).setInvs(e), a.title(b._x("Source text not loaded", "Editor") + ":");
if (a = this.contextCell) a.textarea("", !1).setMode(c).setInvs(e), a.title(b._x("Context not loaded", "Editor") + ":");
if (a = this.targetCell) a.textarea("", !1).setStrf(d).setMode(c).setInvs(e), a.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
u.updateListCell = function(a, b) {
var c = this.getListColumns()[b], e = this.po.indexOf(a);
(e = this.listTable.row(e)) && e.rendered && e.update(c);
};
u.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? B(a) : a.trim()) || " ";
};
u.fuzzy = function(a, b, c) {
b = b || this.active;
var e = b.fuzzy(c);
!0 !== a || e ? !1 === a && e && this.flag(0, b, c) && this.fire("poFuzzy", [ b, !1, c ]) : this.flag(4, b, c) && this.fire("poFuzzy", [ b, !0, c ]);
return e;
};
u.flag = function(b, c, e) {
if (!c) {
c = this.active;
e = this.getTargetOffset();
if (null == e) return null;
e && c.targetForms() && (e = 0);
}
var d = c.flagged(e);
if (null == b) return d;
if (d === b || b && !c.translated(e) || !this.fire("poFlag", [ b, d, c, e ])) return !1;
c.flag(b, e);
this.fire(a, [ c ]) && this.unsave(c, e);
this.setStatus(c, e);
return !0;
};
u.add = function(b, c) {
var e, d = this.po.get(b, c);
d ? e = this.po.indexOf(d) : (e = this.po.length, d = this.po.add(b, c), this.load(this.po, -1), 
this.fire("poAdd", [ d ]), this.fire(a, [ d ]));
this.lastSearch && this.filter("");
this.listTable.select(e);
return d;
};
u.del = function(b) {
if (b = b || this.active) {
var c = this.lastSearch, e = this.po.del(b);
null != e && (this.unsave(b), this.fire("poDel", [ b ]), this.fire(a, [ b ]), this.reload(), 
this.dict && this.rebuildSearch(), this.active && this.active.equals(b) && this.unloadActive(), 
this.po.length && (c && this.filter(c), this.active || (e = Math.min(e, this.po.length - 1), 
this.listTable.select(e))));
}
};
u.setMono = function(a) {
return this.setMode(a ? "code" : this.html ? "html" : "");
};
u.setMode = function(a) {
if (this.mode !== a) {
this.mode = a;
this.callTextareas(function(b) {
b.setMode(a);
});
var b = this.active, c = this.sourceCell;
b && b.refs() && c && this.setSrcMeta(b, c) && c.redraw();
}
return this;
};
u.getMono = function() {
return "code" === this.mode;
};
u.setInvs = function(a) {
(this.inv || !1) !== a && (this.inv = a, this.callTextareas(function(b) {
b.setInvs(a);
}), this.fire("poInvs", [ a ]));
return this;
};
u.getInvs = function() {
return this.inv || !1;
};
u.callTextareas = function(a) {
var b = this.targetCell;
b && b.eachTextarea(a);
(b = this.contextCell) && b.eachTextarea(a);
(b = this.sourceCell) && b.eachTextarea(a);
return this;
};
u.focus = function() {
var a = this.getTargetEditable();
a && a.focus();
return this;
};
u = null;
return f;
}({}, v, w));
m.register("$13", function(f, d, E) {
function l() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function g(a) {
a = h('<button type="button" class="button button-small icon icon-' + a + ' hastip"></button>');
m.require("$12", "tooltip.js").init(a);
return a;
}
function c(a) {
return g("cloud").attr("title", a.labels[8] + " (Ctrl-U)").on("click", function(b) {
b.preventDefault();
a.focus().fuzzy(!a.fuzzy());
});
}
function b(a) {
return g("robot").attr("title", a.labels[9] + " (Ctrl-J)").on("click", function(b) {
b.preventDefault();
a.fire("poHint");
});
}
d = m.require("$24", "base.js");
f.init = function(a) {
var b = new l();
a = b.setRootCell(a);
var c = a.splity("po-list", "po-edit"), d = c[0], g = c[1], c = g.splitx("po-trans", "po-comment"), f = c[0], h = c[1].header("Loading.."), c = f.splity("po-source", "po-target"), f = c[0].header("Loading.."), c = c[1].header("Loading..");
a.distribute([ .34 ]);
g.distribute([ .8 ]);
b.setListCell(d);
b.setSourceCell(f);
b.setTargetCell(c);
b.commentCell = h;
b.editable.source = !1;
return b;
};
d = l.prototype = d.extend(l);
d.getListHeadings = function() {
var a = this.t || {
_x: function(a) {
return a;
}
}, b = [ a._x("Source text", "Editor") ];
this.targetLocale && (b[1] = a._x("Translation", "Editor"));
return b;
};
d.getListColumns = function() {
var a = {
source: 0
};
this.targetLocale && (a.target = 1);
return a;
};
d.getListEntry = function(a) {
var b = this.cellText, c = [ function() {
var c, d = b(a.source() || ""), g = a.context();
return g ? (c = E.createElement("p"), c.appendChild(E.createElement("mark")).innerText = g, 
c.appendChild(E.createTextNode(" " + d)), c) : d;
} ];
this.targetLocale && (c[1] = function() {
return b(a.translation() || "");
});
return c;
};
d.stats = function() {
var a = this.po, b = a.length, c = 0, d = 0, g = 0;
a.each(function(a, b) {
b.fuzzy() ? g++ : b.translated() ? c++ : d++;
});
return {
t: b,
p: c.percent(b) + "%",
f: g,
u: d
};
};
d.unlock = function() {
var a = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
a && (this._unlocked = a, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
d.lock = function() {
var a = this._unlocked;
a && (this.targetLocale = a, delete this._unlocked, this.po && this.po.lock(a), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, a ]), 
this.active && this.loadMessage(this.active));
};
d.locked = function() {
return !this._unlocked;
};
d.setStatus = function(a) {
var e = this.$tnav;
if (null == a) e && (e.remove(), this.$tnav = null); else {
e || (this.$tnav = e = h("<nav></nav>").append(c(this)).append(b(this)).appendTo(this.targetCell.header()));
var d = [];
a.translated() ? a.fuzzy() && d.push("po-fuzzy") : d.push("po-empty");
e.attr("class", d.join(" "));
}
};
d.getSorter = function() {
function a(a, c) {
var d = a.weight(), g = c.weight();
return d === g ? b(a, c) : d > g ? -1 : 1;
}
function b(a, c) {
return a.hash().localeCompare(c.hash());
}
var c = this;
return function(d) {
var g = c.po, f = c.locked() ? a : b;
d.sort(function(a, b) {
return f(g.row(a), g.row(b));
});
};
};
return f;
}({}, v, w));
m.register("$14", function(f, d, m) {
var l = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, g = {
38: !0,
40: !0,
73: !0
}, c = {
66: function(b, a) {
var c = a.current();
c && (c.normalize(), a.focus().pasteMessage(c));
},
75: function(b, a) {
var c = a.current();
c && (c.untranslate(), a.focus().pasteMessage(c));
},
85: function(b, a) {
a.focus().fuzzy(!a.fuzzy());
},
13: function(b, a) {
a.getFirstEditable() && a.next(1, !0, !0);
},
40: function(b, a) {
var c = b.shiftKey;
a.next(1, c, c);
},
38: function(b, a) {
var c = b.shiftKey;
a.next(-1, c, c);
},
73: function(b, a) {
if (!b.shiftKey) return !1;
a.setInvs(!a.getInvs());
}
};
f.init = function(b, a) {
function e(a) {
if (a.isDefaultPrevented() || !a.metaKey && !a.ctrlKey) return !0;
var e = a.which;
if (!f[e]) return !0;
var d = c[e];
if (!d) throw Error("command undefined #" + e);
if (a.altKey || a.shiftKey && !g[e] || !1 === d(a, b)) return !0;
a.stopPropagation();
a.preventDefault();
return !1;
}
var f = {};
h(a || d).on("keydown", e);
return {
add: function(a, b) {
c[l[a]] = b;
return this;
},
enable: function() {
var a, b;
for (b in arguments) a = l[arguments[b]], f[a] = !0;
return this;
},
disable: function() {
h(a || d).off("keydown", e);
b = a = f = null;
}
};
};
return f;
}({}, v, w));
m.register("$25", function(f, d, h) {
function l() {
this.reIndex([]);
}
f.init = function() {
return new l();
};
d = l.prototype;
d.reIndex = function(d) {
for (var c = {}, b = -1, a = d.length; ++b < a; ) c[d[b]] = b;
this.keys = d;
this.length = b;
this.ords = c;
};
d.key = function(d, c) {
if (null == c) return this.keys[d];
var b = this.keys[d], a = this.ords[c];
if (c !== b) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[d] = c;
delete this.ords[b];
this.ords[c] = d;
}
return d;
};
d.indexOf = function(d) {
d = this.ords[d];
return null == d ? -1 : d;
};
d.add = function(d, c) {
var b = this.ords[d];
null == b && (this.keys[this.length] = d, b = this.ords[d] = this.length++);
this[b] = c;
return b;
};
d.get = function(d) {
return this[this.ords[d]];
};
d.has = function(d) {
return null != this.ords[d];
};
d.del = function(d) {
this.cut(this.ords[d], 1);
};
d.cut = function(d, c) {
c = c || 1;
var b = [].splice.call(this, d, c);
this.keys.splice(d, c);
this.reIndex(this.keys);
return b;
};
d.each = function(d) {
for (var c = -1, b = this.keys, a = this.length; ++c < a; ) d(b[c], this[c], c);
return this;
};
d.sort = function(d) {
for (var c = -1, b = this.length, a, e = this.keys, f = this.ords, n = []; ++c < b; ) n[c] = [ this[c], e[c] ];
n.sort(function(a, b) {
return d(a[0], b[0]);
});
for (c = 0; c < b; c++) a = n[c], this[c] = a[0], a = a[1], e[c] = a, f[a] = c;
return this;
};
d.join = function(d) {
return [].join.call(this, d);
};
d = null;
return f;
}({}, v, w));
m.register("$26", function(f, d, h) {
function l(d, c) {
var b = RegExp("^.{0," + (d - 1) + "}[" + c + "]"), a = RegExp("^[^" + c + "]+");
return function(c, f) {
for (var n = c.length, k; n > d; ) {
k = b.exec(c) || a.exec(c);
if (null == k) break;
k = k[0];
f.push(k);
k = k.length;
n -= k;
c = c.substr(k);
}
0 !== n && f.push(c);
return f;
};
}
f.create = function(d) {
function c(a) {
return k[a] || "\\" + a;
}
var b, a, e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, f = /[ \r\n]+/g, n = /[\t\v\f\x07\x08\\\"]/g, k = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == d || isNaN(d = Number(d))) d = 79;
0 < d && (b = l(d - 3, " "), a = l(d - 2, "-– \\.,:;\\?!\\)\\]\\}\\>"));
return {
pair: function(b, k) {
if (!k) return b + ' ""';
k = k.replace(n, c);
var f = 0;
k = k.replace(e, function() {
f++;
return "\\n\n";
});
if (!(f || d && d < k.length + b.length + 3)) return b + ' "' + k + '"';
var p = [ b + ' "' ], h = k.split("\n");
if (a) for (var l = -1, m = h.length; ++l < m; ) a(h[l], p); else p = p.concat(h);
return p.join('"\n"') + '"';
},
prefix: function(a, b) {
var c = a.split(e);
return b + c.join("\n" + b);
},
refs: function(a) {
a = a.replace(f, " ", a);
b && (a = b(a, []).join("\n#: "));
return "#: " + a;
}
};
};
return f;
}({}, v, w));
m.register("$39", function(f, d, h) {
function l() {
this.length = 0;
}
f.init = function() {
return new l();
};
d = l.prototype;
d.push = function(d) {
this[this.length++] = d;
return this;
};
d.sort = function(d) {
[].sort.call(this, d);
return this;
};
d.each = function(d) {
for (var c = -1, b = this.length; ++c < b; ) d(c, this[c]);
return this;
};
return f;
}({}, v, w));
m.register("$27", function(f, d, h) {
function l() {}
f.extend = function(d) {
return d.prototype = new l();
};
d = l.prototype = m.require("$37", "abstract.js").init([ "add", "load" ]);
d.row = function(d) {
return this.rows[d];
};
d.lock = function(d) {
return this.locale(d || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
d.unlock = function() {
var d = this.loc;
this.loc = null;
return d;
};
d.locale = function(d) {
null == d ? d = this.loc : this.loc = d = m.require("$36", "locale.js").cast(d);
return d;
};
d.each = function(d) {
this.rows.each(d);
return this;
};
d.indexOf = function(d) {
"object" !== typeof d && (d = this.get(d));
if (!d) return -1;
null == d.idx && (d.idx = this.rows.indexOf(d.hash()));
return d.idx;
};
d.get = function(d) {
return this.rows && this.rows.get(d);
};
d.has = function(d) {
return this.rows && this.rows.has(d);
};
d.del = function(d) {
d = this.indexOf(d);
if (-1 !== d) {
var c = this.rows.cut(d, 1);
if (c && c.length) return this.length = this.rows.length, this.rows.each(function(b, a, c) {
a.idx = c;
}), d;
}
};
d.reIndex = function(d, c) {
var b = this.indexOf(d), a = d.hash(), e = this.rows.indexOf(a);
return e === b ? b : -1 !== e ? (c = (c || 0) + 1, d.source("Error, duplicate " + String(c) + ": " + d.source()), 
this.reIndex(d, c)) : this.rows.key(b, a);
};
d.sort = function(d) {
this.rows.sort(d);
return this;
};
d["export"] = function() {
for (var d = -1, c = this.rows, b = c.length, a = m.require("$39", "list.js").init(); ++d < b; ) a.push(c[d]);
return a;
};
d = null;
return f;
}({}, v, w));
m.register("$28", function(f, d, h) {
function l(c, b, a) {
if (null == a) return c[b] || "";
c[b] = a || "";
return c;
}
function g() {
this._id = this.id = "";
}
f.extend = function(c) {
return c.prototype = new g();
};
d = g.prototype;
d.flag = function(c, b) {
var a = this.flg || (this.flg = []);
if (null != b) a[b] = c; else for (var d = Math.max(a.length, this.src.length, this.msg.length); 0 !== d--; ) a[d] = c;
return this;
};
d.flagged = function(c) {
var b = this.flg || [];
if (null != c) return b[c] || 0;
for (c = b.length; 0 !== c--; ) if (b[c]) return !0;
return !1;
};
d.flags = function() {
for (var c, b = {}, a = [], d = this.flg || [], f = d.length; 0 !== f--; ) c = d[f], 
b[c] || (b[c] = !0, a.push(c));
return a;
};
d.flaggedAs = function(c, b) {
var a = this.flg || [];
if (null != b) return c === a[b] || 0;
for (var d = a.length; 0 !== d--; ) if (a[d] === c) return !0;
return !1;
};
d.fuzzy = function(c, b) {
var a = this.flaggedAs(4, c);
null != b && this.flag(b ? 4 : 0, c);
return a;
};
d.source = function(c, b) {
if (null == c) return this.src[b || 0] || "";
this.src[b || 0] = c;
return this;
};
d.plural = function(c, b) {
if (null == c) return this.src[b || 1] || "";
this.src[b || 1] = c || "";
return this;
};
d.sourceForms = function() {
return this.srcF;
};
d.targetForms = function() {
return this.msgF;
};
d.each = function(c) {
for (var b = -1, a = this.src, d = this.msg, f = Math.max(a.length, d.length); ++b < f; ) c(b, a[b], d[b]);
return this;
};
d.count = function() {
return Math.max(this.src.length, this.msg.length);
};
d.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
d.translate = function(c, b) {
this.msg[b || 0] = c || "";
return this;
};
d.untranslate = function(c) {
if (null != c) this.msg[c] = ""; else {
var b = this.msg, a = b.length;
for (c = 0; c < a; c++) b[c] = "";
}
return this;
};
d.translation = function(c) {
return this.msg[c || 0] || "";
};
d.errors = function(c) {
return this.err && this.err[c || 0] || [];
};
d.translated = function(c) {
if (null != c) return !!this.msg[c];
var b = this.msg, a = b.length;
for (c = 0; c < a; c++) if (!b[c]) return !1;
return !0;
};
d.untranslated = function(c) {
if (null != c) return !this.msg[c];
var b = this.msg, a = b.length;
for (c = 0; c < a; c++) if (b[c]) return !1;
return !0;
};
d.comment = function(c) {
return l(this, "cmt", c);
};
d.notes = function(c) {
return l(this, "xcmt", c);
};
d.refs = function(c) {
return l(this, "rf", c);
};
d.format = function(c) {
return l(this, "fmt", c);
};
d.context = function(c) {
return l(this, "ctx", c);
};
d.tags = function() {
return this.tg;
};
d.toString = d.toText = function() {
return this.src.concat(this.msg, this.id, this.ctx).join(" ");
};
d.weight = function() {
var c = 0;
this.translation() || (c += 2);
this.fuzzy() && (c += 1);
return c;
};
d.equals = function(c) {
return this === c || this.hash() === c.hash();
};
d.hash = function() {
return this.id;
};
d.normalize = function() {
for (var c = this.msg.length; 0 !== c--; ) this.msg[c] = this.src[c] || "";
};
d.disabled = function(c) {
return !!(this.lck || [])[c || 0];
};
d.disable = function(c) {
(this.lck || (this.lck = []))[c || 0] = !0;
return this;
};
d.saved = function(c) {
var b = this.drt;
if (null == b) return !0;
if (null != c) return !b[c];
for (c = b.length; 0 !== c--; ) if (b[c]) return !1;
return !0;
};
d.unsave = function(c) {
(this.drt || (this.drt = []))[c || 0] = !0;
return this;
};
d.save = function(c) {
null == c ? this.drt = null : (this.drt || (this.drt = []))[c] = !1;
return this;
};
d.is = function(c) {
return c && (c === this || c.idx === this.idx);
};
d.isHTML = function(c) {
if (null == c) return this.htm || !1;
this.htm = c;
};
d = null;
return f;
}({}, v, w));
m.register("$15", function(f, d, h) {
function l(a) {
return {
"Project-Id-Version": "PACKAGE VERSION",
"Report-Msgid-Bugs-To": "",
"POT-Creation-Date": a || "",
"PO-Revision-Date": a || "",
"Last-Translator": "",
"Language-Team": "",
Language: "",
"Plural-Forms": "",
"MIME-Version": "1.0",
"Content-Type": "text/plain; charset=UTF-8",
"Content-Transfer-Encoding": "8bit"
};
}
function g(a, b) {
var c = a || "";
b && (c += "\0" + b);
return c;
}
function c(a) {
var b = d.console;
b && b.error && b.error(a.message || String(a));
}
function b(a) {
return m.require("$26", "format.js").create(a);
}
function a(a) {
this.locale(a);
this.clear();
this.head = l(this.now());
}
function e(a, b) {
this.src = [ a || "" ];
this.msg = [ b || "" ];
}
f.create = function(b) {
return new a(b);
};
h = m.require("$27", "messages.js").extend(a);
h.clear = function() {
this.rows = m.require("$25", "collection.js").init();
this.length = 0;
return this;
};
h.now = function() {
function a(b, c) {
for (var d = String(b); d.length < c; ) d = "0" + d;
return d;
}
var b = new Date(), c = b.getUTCFullYear(), d = b.getUTCMonth() + 1, e = b.getUTCDate(), f = b.getUTCHours(), b = b.getUTCMinutes();
return a(c, 4) + "-" + a(d, 2) + "-" + a(e, 2) + " " + a(f, 2) + ":" + a(b, 2) + "+0000";
};
h.header = function(a, b) {
var c = this.head || (this.head = {});
if (null == b) return this.headers()[a] || "";
c[a] = b || "";
return this;
};
h.headers = function(a) {
var b, c = this.now(), d = this.head || (this.head = l(c));
if (null != a) {
for (b in a) d[b] = a[b];
return this;
}
var e = this.locale();
a = {};
for (b in d) a[b] = String(d[b]);
e ? (a.Language = String(e) || "zxx", a["Language-Team"] = e.label || a.Language, 
a["Plural-Forms"] = "nplurals=" + (e.nplurals || "2") + "; plural=" + (e.pluraleq || "n!=1") + ";", 
b = "PO-Revision-Date") : (a.Language = "", a["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
a["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date");
a[b] || (a[b] = c);
a["X-Generator"] = "Loco https://localise.biz/";
return a;
};
h.get = function(a, b) {
var c = g(a, b);
return this.rows.get(c);
};
h.add = function(a, b) {
a instanceof e || (a = new e(a));
b && a.context(b);
var d = a.hash();
this.rows.get(d) ? c("Duplicate message at index " + this.indexOf(a)) : (a.idx = this.rows.add(d, a), 
this.length = this.rows.length);
return a;
};
h.load = function(a) {
for (var b = -1, d, f, g, h, l, m, s = (g = this.locale()) && g.nplurals || 2, A = []; ++b < a.length; ) d = a[b], 
null == d.parent ? (f = d.source || d.id, g = d.target || "", h = d.context, f || h ? (l = new e(f, g), 
l._id = d._id, h && l.context(h), d.flag && l.flag(d.flag, 0), d.comment && l.comment(d.comment), 
d.notes && l.notes(d.notes), d.refs && l.refs(d.refs), l.format(d.format), d.message = l, 
this.add(l), d.prev && d.prev[0] && (l.prev(d.prev[0].source, d.prev[0].context), 
d.prev[1] && l._src.push(d.prev[1].source || ""))) : 0 === b && "object" === typeof g && (this.head = g, 
this.headcmt = d.comment)) : A.push(d);
for (b = -1; ++b < A.length; ) try {
d = A[b];
f = d.source || d.id;
l = a[d.parent] && a[d.parent].message;
if (!l) throw Error("parent missing for plural " + f);
m = d.plural;
1 === m && l.plural(f);
m >= s || (d.flag && l.flag(d.flag, m), l.translate(d.target || "", m), d.format && !l.format() && l.format(d.format));
} catch (v) {
c(v);
}
return this;
};
h.wrap = function(a) {
this.fmtr = b(a);
return this;
};
h.toString = function() {
var a, c = this.locale(), d = [], f = [], g = this.headers(), h = !c, l = c && c.nplurals || 2, m = this.fmtr || b();
g[c ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (a in g) f.push(a + ": " + g[a]);
f = new e("", f.join("\n"));
f.comment(this.headcmt || "");
h && f.fuzzy(0, !0);
d.push(f.toString());
d.push("");
this.rows.each(function(a, b) {
a && (d.push(b.cat(m, h, l)), d.push(""));
});
return d.join("\n");
};
h = m.require("$28", "message.js").extend(e);
h.prev = function(a, b) {
this._src = [ a || "" ];
this._ctx = b;
};
h.hash = function() {
return g(this.source(), this.context());
};
h.toString = function() {
return this.cat(b());
};
h.cat = function(a, b, c) {
var d, e = [], f;
(f = this.cmt) && e.push(a.prefix(f, "# "));
(f = this.xcmt) && e.push(a.prefix(f, "#. "));
d = this.rf;
if (f = this._id) d += (d ? " " : "") + "loco:" + f;
d && /\S/.test(d) && e.push(a.refs(d));
!b && this.fuzzy() && e.push("#, fuzzy");
(f = this.fmt) && e.push("#, " + f + "-format");
(f = this._ctx) && e.push(a.prefix(a.pair("msgctxt", f), "#| "));
if (f = this._src) f[0] && e.push(a.prefix(a.pair("msgid", f[0]), "#| ")), f[1] && e.push(a.prefix(a.pair("msgid_plural", f[1]), "#| "));
(f = this.ctx) && e.push(a.pair("msgctxt", f));
e.push(a.pair("msgid", this.src[0]));
if (null == this.src[1]) e.push(a.pair("msgstr", b ? "" : this.msg[0])); else for (d = -1, 
e.push(a.pair("msgid_plural", this.src[1])), f = this.msg || [ "", "" ], c = c || f.length; ++d < c; ) e.push(a.pair("msgstr[" + d + "]", b ? "" : f[d] || ""));
return e.join("\n");
};
h.compare = function(a, b) {
var c = this.weight(), d = a.weight();
if (c > d) return 1;
if (c < d) return -1;
if (b) {
c = this.hash().toLowerCase();
d = a.hash().toLowerCase();
if (c < d) return 1;
if (c > d) return -1;
}
return 0;
};
h.copy = function() {
var a = new e(), b, c;
for (b in this) this.hasOwnProperty(b) && ((c = this[b]) && c.concat && (c = c.concat()), 
a[b] = c);
return a;
};
h = h = null;
return f;
}({}, v, w));
m.register("$17", function(f, d, m) {
f.init = function(d, f) {
function c() {
return p || (p = h('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function b(a, b, d) {
a = h("<p></p>").text(d);
c().dialog("close").html("").dialog("option", "title", "Error").append(a).dialog("open");
}
function a(a) {
var b = a && a.code;
if (b) {
for (var d = -1, e = b.length, f = h("<ol></ol>").attr("class", a.type); ++d < e; ) h("<li></li>").html(b[d]).appendTo(f);
f.find("li").eq(a.line - 1).attr("class", "highlighted");
c().dialog("close").html("").dialog("option", "title", a.path + ":" + a.line).append(f).dialog("open");
}
}
function e(a) {
a = a.target;
var b = h(a).find("li.highlighted")[0], b = Math.max(0, (b && b.offsetTop || 0) - Math.floor(a.clientHeight / 2));
a.scrollTop = b;
}
var p;
return {
load: function(n) {
c().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", e);
n = h.extend({
ref: n,
path: f.popath
}, f.project || {});
d.ajax.post("fsReference", n, a, b);
}
};
};
return f;
}({}, v, w));
m.register("$30", function(f, d, h) {
function l(d) {
this.api = d;
this.chars = 0;
}
f.create = function(d) {
return new l(d);
};
d = l.prototype;
d.init = function(d, c) {
function b(a) {
var b = {
length: 0,
html: a.html,
sources: []
};
q.push(b);
return r[a.html ? 1 : 0] = b;
}
function a(a, d) {
var g = a.source(null, d);
if (g && (a.untranslated(d) || c)) {
var q = m[g];
if (q) q.push(a); else {
var q = g.length, B = e.isHtml(g), B = r[B ? 1 : 0], u = B.sources;
if (B.length + q > l || u.length === k) B = b(B), u = B.sources;
u.push(g);
m[g] = [ a ];
B.length += q;
f += q;
h += 1;
}
}
}
var e = this.api, f = 0, h = 0, k = 50, l = 5e3, m = {}, q = [], r = [];
b({
html: !1
});
b({
html: !0
});
d.each(function(b, c) {
a(c, 0);
a(c, 1);
});
r = null;
this.map = m;
this.chars = f;
this.length = h;
this.batches = q;
this.locale = d.locale();
};
d.abort = function() {
this.state = "abort";
return this;
};
d.dispatch = function() {
function d(a, b) {
function e(c, d, g) {
b !== g && (a === d || 1 < c && f.source(null, 1) === a) && (f.translate(b, c), 
l++, A++);
return l;
}
if (!c()) return !1;
if (!b) return !0;
var f, g = m[a] || [], k = g.length, p = -1, l;
for (v++; ++p < k; ) if (f = g[p]) l = 0, f.each(e), l && h("each", [ f ]);
return !0;
}
function c() {
return "abort" === k.state ? (l && (l.abort(), f()), !1) : !0;
}
function b() {
var b = q.shift(), c;
b ? (c = b.sources) && c.length ? l.batch(c, r, b.html, d).fail(a).always(e) : e() : f();
}
function a() {
k.abort();
f();
}
function e() {
s++;
h("prog", [ s, B ]);
c() && b();
}
function f() {
l = q = null;
h("done");
}
function h(a, b) {
for (var c = u[a] || [], d = c.length; 0 <= --d; ) c[d].apply(null, b);
}
var k = this, l = k.api, m = k.map, q = k.batches || [], r = k.locale, v = 0, s = 0, A = 0, w = k.length, B = q.length, u = {
done: [],
each: [],
prog: []
};
k.state = "";
b();
return {
done: function(a) {
u.done.push(a);
return this;
},
each: function(a) {
u.each.push(a);
return this;
},
prog: function(a) {
u.prog.push(a);
return this;
},
stat: function() {
return {
todo: function() {
return Math.max(w - v, 0);
},
did: function() {
return v;
}
};
}
};
};
return f;
}({}, v, w));
m.register("$40", {
nn: [ "no" ]
});
m.register("$31", function(f, d, h) {
function l() {}
function g(c) {
c.parseError = function(b) {
return b && b.code && 200 !== b.code && b.message ? "Error " + b.code + ": " + b.message : "";
};
c.batch = function(b, a, d, f) {
function g(c) {
for (var d = b.length, e = -1; ++e < d && !1 !== f(b[e], c[e] || "", a); ) ;
}
d = d ? "html" : "plain";
var k = this.toLang(a);
return c._call({
url: "https://translate.yandex.net/api/v1.5/tr.json/translate?format=" + d + "&lang=en-" + k,
method: "POST",
traditional: !0,
data: {
key: c.key(),
text: b
}
}).done(function(a, b, d) {
a && 200 === a.code ? g(a.text || []) : (c.stderr(c.parseError(a) || c.httpError(d)), 
g([]));
}).fail(function() {
g([]);
});
};
}
f.create = function(c) {
var b = l.prototype = new c();
b.toString = function() {
return "Yandex.Translate";
};
b.getId = function() {
return "yandex";
};
b.getUrl = function() {
return "https://translate.yandex.com/";
};
b.init = function(a) {
c.prototype.init.call(this, a);
/^trnsl\./.test(this.key()) && g(this);
};
b.toLang = function(a) {
return this.mapLang(a, m.require("$40", "yandex.json"));
};
return new l();
};
return f;
}({}, v, w));
m.register("$41", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
m.register("$32", function(f, d, h) {
function l() {}
f.create = function(d) {
d = l.prototype = new d();
d.toString = function() {
return "Google Translate";
};
d.getId = function() {
return "google";
};
d.getUrl = function() {
return "https://translate.google.com/";
};
d.parseError = function(c) {
if (c.error) {
for (var b = [], a = c.error.errors || [], d = a.length, f = -1; ++f < d; ) b.push(a[f].message || "");
return "Error " + c.error.code + ": " + b.join(";");
}
return "";
};
d.batch = function(c, b, a, d) {
function f(a) {
for (var g = c.length, k = -1, h; ++k < g && (h = a[k] || {}, !1 !== d(c[k], h.translatedText || "", b)); ) ;
}
var g = this;
a = a ? "html" : "text";
var k = g.mapLang(b, m.require("$41", "google.json"));
return g._call({
url: "https://translation.googleapis.com/language/translate/v2?source=en&target=" + k + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: g.key(),
q: c
}
}).done(function(a, b, c) {
a.data ? f(a.data.translations || []) : (g.stderr(g.parseError(a) || g.httpError(c)), 
f([]));
}).fail(function() {
f([]);
});
};
return new l();
};
return f;
}({}, v, w));
m.register("$42", {
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
m.register("$33", function(f, d, h) {
function l() {}
f.create = function(d) {
d = l.prototype = new d();
d.toString = function() {
return "Microsoft Translator text API";
};
d.getId = function() {
return "microsoft";
};
d.getUrl = function() {
return "https://aka.ms/MicrosoftTranslatorAttribution";
};
d.parseError = function(c) {
return c && c.error ? c.error.message : "";
};
d.batch = function(c, b, a, d) {
function f(a) {
for (var g = -1, k; ++g < h && (k = a[g] || {}, k = k.translations || [], k = k[0] || {}, 
!1 !== d(c[g], k.text || "", b)); ) ;
}
var g = this, k = [], h = c.length, l = -1;
a = a ? "html" : "plain";
for (var q = g.mapLang(b, m.require("$42", "ms.json")); ++l < h; ) k.push({
text: c[l]
});
return g._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=" + q + "&textType=" + a,
method: "POST",
data: JSON.stringify(k),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": g.param("region") || "global"
}
}).done(function(a, b, c) {
a && a.length ? f(a) : (g.stderr(g.parseError(a) || g.httpError(c)), f([]));
}).fail(function() {
f([]);
});
};
return new l();
};
return f;
}({}, v, w));
m.register("$43", {
pt: [ "pt-PT", "pt-BR" ]
});
m.register("$34", function(f, d, h) {
function l() {}
f.create = function(d) {
d = l.prototype = new d();
d.toString = function() {
return "DeepL Translator";
};
d.getId = function() {
return "deepl";
};
d.getUrl = function() {
return "https://www.deepl.com/translator";
};
d.parseError = function(c) {
return c.message;
};
d.batch = function(c, b, a, d) {
function f(a) {
for (var g = c.length, k = -1, h; ++k < g && (h = a[k] || {}, !1 !== d(c[k], h.text || "", b)); ) ;
}
var g = this;
a = g.mapLang(b, m.require("$43", "deepl.json"));
var k = b.tone, h = "default";
null == k && (k = String(b.variant || "").toLowerCase());
"formal" === k ? h = "more" : "informal" === k && (h = "less");
return g._call({
url: "https://api.deepl.com/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: "EN",
target_lang: a.toUpperCase(),
formality: h,
preserve_formatting: "1",
auth_key: g.key(),
text: c
}
}).done(function(a, b, c) {
a.translations ? f(a.translations) : (g.stderr(g.parseError(a) || g.httpError(c)), 
f([]));
}).fail(function() {
f([]);
});
};
return new l();
};
return f;
}({}, v, w));
m.register("$18", function(f, d, v) {
function l() {
this.inf = {};
}
function g() {
var a = v.createElement("p"), b = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, c = /<[a-z]+\s/i, d, f;
return {
sniff: function(g) {
if (g === d) return f;
d = g;
if (b.test(g) || c.test(g)) if (a.innerHTML = g, a.textContent !== g) return f = !0;
return f = !1;
}
};
}
var c = l.prototype;
c.init = function(a) {
this.inf = a || {};
};
c.param = function(a) {
return this.inf[a] || "";
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
c.stderr = function(a) {
var b = (d.loco || {}).notices || d.console;
b && b.error && b.error(String(this) + ": " + String(a));
};
c.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
c.parseError = function() {
return "";
};
c.mapLang = function(a, b) {
var c = String(a).replace("-", "_"), d = a.lang, f = b[c] || b[d] || [], g = f.length;
if (0 === g) return d;
if (1 < g) for (var c = c.toLowerCase(), d = -1, h; ++d < g; ) if (h = f[d], h.toLowerCase().replace("-", "_") === c) return h;
return f[0];
};
c.toLang = function(a) {
return String(a);
};
c.translate = function(a, b, c) {
return this.batch([ a ], b, this.isHtml(a), c);
};
c._call = function(a) {
var b = this;
b.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(a, c, d) {
try {
var f = a.responseText, g = f && m.require("$5", "json.js").parse(f);
d = g && b.parseError(g) || d;
} catch (h) {}
b.stderr(d || b.httpError(a));
};
return b.abortable(h.ajax(a));
};
c.abortable = function(a) {
var b = this;
a.always(function() {
b.$r === a && (b.$r = null);
});
return b.$r = a;
};
c.abort = function() {
var a = this.$r;
a && a.abort();
};
c.isHtml = function(a) {
return (b || (b = g())).sniff(a);
};
c.createJob = function() {
return m.require("$30", "job.js").create(this);
};
c.batch = function(a, b, c, f) {
function g(c) {
for (var d = a.length, k = -1; ++k < d && !1 !== f(a[k], c[k], b); ) ;
}
var l = d.loco.ajax;
c = {
hook: this.getId(),
type: c ? "html" : "text",
locale: this.toLang(b),
sources: a
};
var m = h.Deferred();
this.abortable(l.post("apis", c, function(a) {
g(a && a.targets || []);
m.resolve();
}, function() {
g([]);
m.reject();
}));
return m.promise();
};
f.create = function(a) {
var b;
b = a.id;
b = "yandex" === b ? m.require("$31", "yandex.js").create(l) : "google" === b ? m.require("$32", "google.js").create(l) : "microsoft" === b ? m.require("$33", "ms.js").create(l) : "deepl" === b ? m.require("$34", "deepl.js").create(l) : new l();
b.init(a);
return b;
};
f.suggest = function(a, b, c, d) {
var f, g, h = a.length;
for (f = 0; f < h; f++) g = a[f], g.translate(b, c, d);
};
var b;
return f;
}({}, v, w));
m.register("$19", function(f, d, m) {
f.init = function(f) {
function g() {
H || (I.on("click", k), H = h('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && h("#ssh-keys").toggleClass("hidden", "ssh" !== h(this).val());
}));
return H;
}
function c() {
R && (b(h(s)), R = !1);
if (B && J) {
var a = J, c = h(Q);
c.find("span.loco-msg").text(a);
K || (c.removeClass("jshide").hide().fadeIn(500), K = !0);
} else K && (b(h(Q)), K = !1);
}
function b(a) {
a.slideUp(250).fadeOut(250, function() {
h(this).addClass("jshide");
});
}
function a() {
if (B) return H && H.dialog("close"), c(), h(f).find('button[type="submit"]').attr("disabled", !1), 
h(d).triggerHandler("resize"), w && w(!0), !0;
x && H ? (R || (h(s).removeClass("jshide").hide().fadeIn(500), R = !0), K && (b(h(Q)), 
K = !1)) : c();
h(f).find('input[type="submit"]').attr("disabled", !0);
w && w(!1);
return !1;
}
function e(a) {
var b, c, d = r || {};
for (b in d) d.hasOwnProperty(b) && (c = d[b], a[b] ? a[b].value = c : h('<input type="hidden" />').attr("name", b).appendTo(a).val(c));
}
function p(a) {
a.preventDefault();
a = h(a.target).serializeArray();
q(a);
C = !0;
return !1;
}
function n(a) {
a.preventDefault();
H.dialog("close");
return !1;
}
function k(a) {
a.preventDefault();
H.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function y(b) {
B = b.authed;
A = b.method;
h(s).find("span.loco-msg").text(b.message || "Something went wrong.");
J = b.warning || "";
b.notice && u.notices.info(b.notice);
if (B) "direct" !== A && (r = b.creds, e(f), C && b.success && u.notices.success(b.success)), 
a(); else if (b.reason) u.notices.info(b.reason); else if (b = b.prompt) {
var c = g();
c.html(b).find("form").on("submit", p);
c.dialog("option", "title", c.find("h2").remove().text());
c.find("button.cancel-button").show().on("click", n);
c.find('input[type="submit"]').addClass("button-primary");
a();
h(d).triggerHandler("resize");
} else u.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function v() {
a();
}
function q(a) {
C = !1;
u.ajax.setNonce("fsConnect", N).post("fsConnect", a, y, v);
return a;
}
var r, w, s = f, A = null, C = !1, B = !1, u = d.loco, x = f.path.value, F = f.auth.value, N = f["loco-nonce"].value, I = h(s).find("button.button-primary"), Q = m.getElementById(s.id + "-warn"), R = !1, K = !1, J = "", H;
u.notices.convert(Q).stick();
f.connection_type ? (r = {}, r.connection_type = f.connection_type.value, B = !0) : x && F && q({
path: x,
auth: F
});
a();
return {
applyCreds: function(a) {
if (a.nodeType) e(a); else {
var b, c = r || {};
for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
}
return this;
},
setForm: function(b) {
f = b;
a();
e(b);
return this;
},
connect: function() {
x = f.path.value;
F = f.auth.value;
q(h(f).serializeArray());
return this;
},
listen: function(a) {
w = a;
B && a(!0);
return this;
},
authed: function() {
return B;
}
};
};
return f;
}({}, v, w));
m.register("$20", function(f, d, v) {
function l(d, f, h, k) {
f = "n" === h ? c(f) : b(f);
k && (f = a(f));
return g([].sort, [ f ])(d);
}
function g(a, b) {
return function(c) {
a.apply(c, b);
return c;
};
}
function c(a) {
return function(b, c) {
var d = b && b[a] || 0, f = c && c[a] || 0;
return d === f ? 0 : d > f ? 1 : -1;
};
}
function b(a) {
return function(b, c) {
return (b && b[a] || "").localeCompare(c && c[a] || "");
};
}
function a(a) {
return function(b, c) {
return -1 * a(b, c);
};
}
f.init = function(a) {
function b(a) {
var c = -1, d = a.length;
for (h("tr", s).remove(); ++c < d; ) s.appendChild(a[c].$);
}
function c(a) {
q = a ? C.find(a, d) : d.slice(0);
v && (a = f[v], q = l(q, v, a.type, a.desc));
b(q);
}
var d = [], f = [], g = 0, q, r, v, s = a.getElementsByTagName("tbody")[0], w = a.getElementsByTagName("thead")[0], C = m.require("$10", "fulltext.js").init();
w && s && (h("th", w).each(function(a, c) {
var e = c.getAttribute("data-sort-type");
e && (a = g, h(c).addClass("loco-sort").on("click", function(c) {
c.preventDefault();
c = a;
var e = f[c], g = e.type, m = !(e.desc = !e.desc);
q = l(q || d.slice(0), c, g, m);
b(q);
r && r.removeClass("loco-desc loco-asc");
r = h(e.$).addClass(m ? "loco-desc" : "loco-asc").removeClass(m ? "loco-asc" : "loco-desc");
v = c;
return !1;
}), f[g] = {
$: c,
type: e
});
c.hasAttribute("colspan") ? g += Number(c.getAttribute("colspan")) : g++;
}), h("tr", s).each(function(a, b) {
var c, e, g, h = [], l = {
_: a,
$: b
}, m = b.getElementsByTagName("td");
for (e in f) {
c = m[e];
(g = c.textContent.replace(/(^\s+|\s+$)/g, "")) && h.push(g);
c.hasAttribute("data-sort-value") && (g = c.getAttribute("data-sort-value"));
switch (f[e].type) {
case "n":
g = Number(g);
}
l[e] = g;
}
d[a] = l;
C.index(a, h);
}), a = h('form.loco-filter input[type="text"]', a.parentNode), a.length && (a = a[0], 
w = h(a.form), 1 < d.length ? m.require("$11", "LocoTextListener.js").listen(a, c) : w.hide(), 
w.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return f;
}({}, v, w));
var C = v.loco || {}, I = C.conf || {
$v: [ 0, 0 ]
};
v = m.require("$1", "t.js").init();
w = I.wplang;
C.version = function(f) {
return I.$v[f || 0];
};
m.require("$2", "html.js");
m.require("$3", "number.js");
m.require("$4", "array.js");
m.require("$5", "json.js");
C.l10n = v;
v.load(I.wpl10n);
w && v.pluraleq(w.pluraleq);
C.string = m.require("$6", "string.js");
C.notices = m.require("$7", "notices.js").init(v);
C.ajax = m.require("$8", "ajax.js").init(I).localise(v);
C.locale = m.require("$9", "wplocale.js");
C.fulltext = m.require("$10", "fulltext.js");
C.watchtext = m.require("$11", "LocoTextListener.js").listen;
C.tooltip = m.require("$12", "tooltip.js");
C.po = {
ed: m.require("$13", "poedit.js"),
kbd: m.require("$14", "hotkeys.js"),
init: m.require("$15", "po.js").create,
ace: m.require("$16", "ace.js").strf("php"),
ref: m.require("$17", "refs.js")
};
C.apis = m.require("$18", "apis.js");
C.fs = m.require("$19", "fsconn.js");
h("#loco-admin.wrap table.wp-list-table").each(function(f, d) {
m.require("$20", "tables.js").init(d);
});
C.validate = function(f) {
return "2.5.3" !== (/^\d+\.\d+\.\d+/.exec(f && f[0] || "") && RegExp.lastMatch) ? (C.notices.warn("admin.js is the wrong version (2.5.3). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
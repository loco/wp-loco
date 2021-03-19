(function(v, x, g, J) {
var n = function() {
function f(d) {
throw Error("Failed to require " + d);
}
var d = {};
return {
register: function(f, m) {
d[f] = m;
},
require: function(g, m) {
return d[g] || f(m);
},
include: function(g, m, k) {
return d[g] || (k ? f(m) : null);
}
};
}();
n.register("$1", function(f, d, g) {
function m(k) {
var c = typeof k;
if ("string" === c) if (/[^ <>!=()%^&|?:n0-9]/.test(k)) console.error("Invalid plural: " + k); else return new Function("n", "return " + k);
"function" !== c && (k = function(b) {
return 1 != b;
});
return k;
}
f.init = function(k) {
function c(a, b, e) {
return (a = l[a]) && a[e] ? a[e] : b || "";
}
function b(a) {
return c(a, a, 0);
}
function a(a, b) {
return c(b + "" + a, a, 0);
}
function e(a, b, e) {
e = Number(k(e));
isNaN(e) && (e = 0);
return c(a, e ? b : a, e);
}
k = m(k);
var l = {};
return {
__: b,
_x: a,
_n: e,
_: b,
x: a,
n: e,
load: function(a) {
l = a || {};
return this;
},
pluraleq: function(a) {
k = m(a);
return this;
}
};
};
return f;
}({}, v, x));
n.register("$2", function(f, d, g) {
f.ie = function() {
var m = !1, k = 0;
d.attachEvent && d.navigator && /MSIE (\d+)\./.exec(String(navigator.appVersion)) && (k = Number(RegExp.$1), 
m = 11 > k);
return function() {
return m;
};
}();
f.init = function() {
return f;
};
return f;
}({}, v, x));
n.register("$3", function(f, d, g) {
Number.prototype.format = function(d, k, c) {
d = Math.pow(10, d || 0);
var b = Math.round(d * this) / d;
d = [];
var b = String(b), a = b.split("."), b = a[0], a = a[1], e = b.length;
do {
d.unshift(b.substring(e - 3, e));
} while (0 < (e -= 3));
b = d.join(c || ",");
if (a) {
c = a;
var l;
for (d = c.length; "0" === c.charAt(--d); ) l = d;
l && (c = c.substring(0, l));
(a = c) && (b += (k || ".") + a);
}
return b;
};
Number.prototype.percent = function(d) {
var k = 0, c = this && d ? 100 * (this / d) : 0;
if (0 === c) return "0";
if (100 === c) return "100";
if (99 < c) c = Math.min(c, 99.9), d = c.format(++k); else if (.5 > c) {
c = Math.max(c, 1e-4);
do {
d = c.format(++k);
} while ("0" === d && 4 > k);
d = d.substr(1);
} else d = c.format(0);
return d;
};
return f;
}({}, v, x));
n.register("$4", function(f, d, g) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(d) {
if (null == this) throw new TypeError();
var k, c = Object(this), b = c.length >>> 0;
if (0 === b) return -1;
k = 0;
1 < arguments.length && (k = Number(arguments[1]), k != k ? k = 0 : 0 != k && Infinity != k && -Infinity != k && (k = (0 < k || -1) * Math.floor(Math.abs(k))));
if (k >= b) return -1;
for (k = 0 <= k ? k : Math.max(b - Math.abs(k), 0); k < b; k++) if (k in c && c[k] === d) return k;
return -1;
});
return f;
}({}, v, x));
n.register("$5", function(f, d, n) {
d.JSON || (d.JSON = {
parse: g.parseJSON,
stringify: null
});
return f = d.JSON;
}({}, v, x));
n.register("$6", function(f, d, g) {
f.trim = function(d, k) {
for (k || (k = " \n"); d && -1 !== k.indexOf(d.substr(0, 1)); ) d = d.substr(1);
for (;d && -1 !== k.indexOf(d.substr(-1)); ) d = d.substr(0, d.length - 1);
return d;
};
f.sprintf = function(d) {
var k = 0, c = [].slice.call(arguments, 1);
return d.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(b, a, e) {
return "%" === e ? "%" : (a ? c[Number(a) - 1] : c[k++]) || "";
});
};
return f;
}({}, v, x));
n.register("$21", function(f, d, g) {
function m(k) {
return function(c, b) {
for (var a = c[k] || 0; (c = c.offsetParent) && c !== (b || g.body); ) a += c[k] || 0;
return a;
};
}
f.top = m("offsetTop");
f.left = m("offsetLeft");
f.el = function(k, c) {
var b = g.createElement(k || "div");
c && (b.className = c);
return b;
};
f.txt = function(k) {
return g.createTextNode(k || "");
};
return f;
}({}, v, x));
n.register("$7", function(f, d, E) {
function m(a, b, e) {
function r() {
c();
w = setTimeout(b, e);
}
function c() {
w && clearTimeout(w);
w = null;
}
var w;
r();
g(a).on("mouseenter", c).on("mouseleave", r);
return {
die: function() {
c();
g(a).off("mouseenter mouseleave");
}
};
}
function k(a, b) {
a.fadeTo(b, 0, function() {
a.slideUp(b, function() {
a.remove();
g(d).triggerHandler("resize");
});
});
return a;
}
function c(a, b) {
function e(b) {
p[w] = null;
k(g(a), 250);
c && c.die();
var r;
if (r = b) b.stopPropagation(), b.preventDefault(), r = !1;
return r;
}
function r(b) {
c && c.die();
return c = m(a, e, b);
}
var c, w, l, h = g(a), q = h.find("button");
0 === q.length && (h.addClass("is-dismissible"), q = g('<button type="button" class="notice-dismiss"> </a>').appendTo(h));
q.off("click").on("click", e);
g(d).triggerHandler("resize");
y();
w = p.length;
p.push(e);
b && (c = r(b));
return {
link: function(b, w) {
var e = w || b, r = g(a).find("nav"), e = g("<nav></nav>").append(g("<a></a>").attr("href", b).text(e));
l ? (l.push(e.html()), r.html(l.join("<span> | </span>"))) : (l = [ e.html() ], 
g(a).addClass("has-nav").append(e));
return this;
},
stick: function() {
c && c.die();
c = null;
p[w] = null;
return this;
},
slow: function(a) {
r(a || 1e4);
return this;
}
};
}
function b(a, b, e) {
var r = n.require("$21", "dom.js").el;
a = g('<div class="notice notice-' + a + ' loco-notice inline"></div>').prependTo(g("#loco-notices"));
var c = g(r("p"));
e = g(r("span")).text(e);
b = g(r("strong", "has-icon")).text(b + ": ");
c.append(b).append(e).appendTo(a);
return a;
}
function a(a, e, r, l) {
a = b(r, e, a).css("opacity", "0").fadeTo(500, 1);
g(d).triggerHandler("resize");
return c(a, l);
}
function e(b) {
return a(b, q, "warning");
}
function l() {
g("#loco-notices").find("div.notice").each(function(a, b) {
if (-1 === b.className.indexOf("jshide")) {
var e = -1 === b.className.indexOf("notice-success") ? null : 5e3;
c(b, e);
}
});
}
var p = [], h = d.console || {
log: function() {}
}, y = Date.now || function() {
return new Date().getTime();
}, A, q, r, D;
f.error = function(b) {
return a(b, A, "error");
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
h.log.apply(h, arguments);
};
f.debug = function() {
(h.debug || h.log).apply(h, arguments);
};
f.clear = function() {
for (var a = -1, b, e = p, r = e.length; ++a < r; ) (b = e[a]) && b.call && b();
p = [];
return f;
};
f.create = b;
f.raise = function(a) {
(f[a.type] || f.error).call(f, a.message);
};
f.convert = c;
f.init = function(a) {
A = a._("Error");
q = a._("Warning");
r = a._("Notice");
D = a._("OK");
setTimeout(l, 1e3);
return f;
};
return f;
}({}, v, x));
n.register("$8", function(f, d, E) {
function m(a) {
var b = g("<pre>" + a + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = a) || (b = "Blank response from server");
return b;
}
function k(a) {
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
function l(a, b, e, c) {
function l(b, c, w) {
if ("abort" !== c) {
var r = h || {
_: function(a) {
return a;
}
}, z = b.status || 0, d = b.responseText || "", s = m(d), f = b.getResponseHeader("Content-Type") || "Unknown type", A = b.getResponseHeader("Content-Length") || d.length;
"success" === c && w ? p.error(w) : (p.error(k(s) + ".\n" + r._("Check console output for debugging information")), 
p.log("Ajax failure for " + a, {
status: z,
error: c,
message: w,
output: d
}), "parsererror" === c && (w = "Response not JSON"), p.log([ r._("Provide the following text when reporting a problem") + ":", "----", "Status " + z + ' "' + (w || r._("Unknown error")) + '" (' + f + " " + A + " bytes)", s, "====" ].join("\n")));
e && e.call && e(b, c, w);
y = b;
}
}
c.url = A;
c.dataType = "json";
var p = n.require("$7", "notices.js").clear();
y = null;
return g.ajax(c).fail(l).done(function(a, e, w) {
var c = a && a.data, h = a && a.notices, y = h && h.length, k = -1;
for (!c || a.error ? l(w, e, a && a.error && a.error.message) : b && b(c, e, w); ++k < y; ) p.raise(h[k]);
});
}
var p = {}, h, y, A = d.ajaxurl || "/wp-admin/admin-ajax.php";
f.init = function(a) {
p = a.nonces || p;
return f;
};
f.localise = function(a) {
h = a;
return f;
};
f.xhr = function() {
return y;
};
f.strip = m;
f.parse = k;
f.submit = function(a, b, e) {
function c(a, b) {
b.disabled ? b.setAttribute("data-was-disabled", "true") : b.disabled = !0;
}
function h(a, b) {
b.getAttribute("data-was-disabled") || (b.disabled = !1);
}
function p(a) {
a.find(".button-primary").removeClass("loading");
a.find("button").each(h);
a.find("input").each(h);
a.find("select").each(h);
a.find("textarea").each(h);
a.removeClass("disabled loading");
}
var y = g(a), k = y.serialize();
(function(a) {
a.find(".button-primary").addClass("loading");
a.find("button").each(c);
a.find("input").each(c);
a.find("select").each(c);
a.find("textarea").each(c);
a.addClass("disabled loading");
})(y);
return l(a.route.value, function(a, e, c) {
p(y);
b && b(a, e, c);
}, function(a, b, c) {
p(y);
e && e(a, b, c);
}, {
type: a.method,
data: k
});
};
f.post = function(h, r, y, k) {
var z = !0, G = r || {}, B = p[h] || c(h);
d.FormData && G instanceof FormData ? (z = !1, r = e) : r = Array.isArray(G) ? a : b;
r(G, "action", "loco_json");
r(G, "route", h);
r(G, "loco-nonce", B);
return l(h, y, k, {
type: "post",
data: G,
processData: z,
contentType: z ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
f.get = function(a, b, e, h) {
b = b || {};
var y = p[a] || c(a);
b.action = "loco_json";
b.route = a;
b["loco-nonce"] = y;
return l(a, e, h, {
type: "get",
data: b
});
};
f.setNonce = function(a, b) {
p[a] = b;
return f;
};
return f;
}({}, v, x));
n.register("$22", {
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
n.register("$9", function(f, d, g) {
function m() {}
var k, c = n.require("$22", "rtl.json");
f.init = function() {
return new m();
};
f.cast = function(b) {
return b instanceof m ? b : "string" === typeof b ? f.parse(b) : f.clone(b);
};
f.clone = function(b) {
var a, e = new m();
for (a in b) e[a] = b[a];
return e;
};
f.parse = function(b) {
if (!(k || (k = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(b)) return null;
var a = new m();
a.lang = RegExp.$1.toLowerCase();
if (b = RegExp.$2) a.region = b.toUpperCase();
if (b = RegExp.$3) a.variant = b.toLowerCase();
return a;
};
d = m.prototype;
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
for (var b = 3, a, e, c = [ "variant", "region", "lang" ], p = []; 0 !== b--; ) if (a = c[b], 
e = this[a]) p.push(a), p.push(a + "-" + e.toLowerCase());
return p.join(" ");
};
d.isRTL = function() {
return !!c[String(this.lang).toLowerCase()];
};
d = null;
return f;
}({}, v, x));
n.register("$23", {
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
n.register("$10", function(f, d, g) {
f.init = function() {
function d(a) {
return h[a] || a;
}
function k(a, b, e, c) {
b = a.split(b);
for (var l = b.length; 0 !== l--; ) (a = b[l]) && null == c[a] && (e.push(a), c[a] = !0);
return e;
}
function c(a) {
return k(String(a || "").toLowerCase().replace(l, d), p, [], {});
}
function b(a, b) {
for (var c = [], r = {}, h, s = b.length, z = p; 0 !== s--; ) (h = b[s]) && k(String(h || "").toLowerCase().replace(l, d), z, c, r);
e[a] = c;
}
function a(a, b) {
var c = [], r = -1, l = e, h = l.length, p, k, d, u, w, F, f = a.length, m = b ? !0 : !1;
a: for (;++r < h; ) if (d = l[r], null != d && (u = d.length)) {
w = 0;
b: for (;w < f; w++) {
F = a[w];
for (p = 0; p < u; p++) if (k = d[p], 0 === k.indexOf(F)) continue b;
continue a;
}
c.push(m ? b[r] : r);
}
return c;
}
var e = [], l = /[^a-z0-9]/g, p = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/, h = n.require("$23", "flatten.json");
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
}({}, v, x));
n.register("$11", function(f, d, n) {
f.listen = function(f, k) {
function c() {
q[l ? "show" : "hide"]();
}
function b(a) {
A && f.setAttribute("size", 2 + a.length);
l = a;
c();
return a;
}
function a() {
p = null;
k(l);
}
function e() {
var e = f.value;
y && e === y && (e = "");
e !== l && (p && clearTimeout(p), b(e), h ? p = setTimeout(a, h) : a());
}
f instanceof jQuery && (f = f[0]);
var l, p, h = 150, y = d.attachEvent && f.getAttribute("placeholder"), A = 1 === Number(f.size), q = g('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
f.value = "";
e();
return !1;
});
b(f.value);
g(f).on("input blur focus", function() {
e();
return !0;
}).after(q);
c();
return {
delay: function(a) {
h = a;
},
ping: function(c) {
c ? (p && clearTimeout(p), c = f.value, y && c === y && (c = ""), b(c), a(), c = void 0) : c = e();
return c;
},
val: function(a) {
if (null == a) return l;
p && clearTimeout(p);
f.value = b(a);
c();
},
el: function() {
return f;
},
blur: function(a) {
return g(f).on("blur", a);
},
destroy: function() {
p && clearTimeout(p);
}
};
};
return f;
}({}, v, x));
n.register("$12", function(f, d, n) {
function m(b, a) {
this.$element = g(b);
this.options = a;
this.enabled = !0;
this.fixTitle();
}
f.init = function(b, a) {
var e = {
fade: !0,
offset: 5,
delayIn: k,
delayOut: c,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
a && (e = g.extend({}, e, a));
b.tipsy(e);
};
f.delays = function(b, a) {
k = b || 150;
c = a || 100;
};
f.kill = function() {
g("div.tipsy").remove();
};
f.text = function(b, a) {
a.data("tipsy").setTitle(b);
};
var k, c;
f.delays();
g(n.body).on("overlayOpened overlayClosing", function(b) {
f.kill();
return !0;
});
m.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
var a = this.tip();
a.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
a[0].className = "tipsy";
a.remove().css({
top: 0,
left: 0
}).prependTo(n.body);
var b = (b = this.options.anchor) ? this.$element.find(b) : this.$element, b = g.extend({}, b.offset(), {
width: b[0].offsetWidth,
height: b[0].offsetHeight
}), e = a[0].offsetWidth, c = a[0].offsetHeight, p = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, h;
switch (p.charAt(0)) {
case "n":
h = {
top: b.top + b.height + this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "s":
h = {
top: b.top - c - this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "e":
h = {
top: b.top + b.height / 2 - c / 2,
left: b.left - e - this.options.offset
};
break;

case "w":
h = {
top: b.top + b.height / 2 - c / 2,
left: b.left + b.width + this.options.offset
};
}
2 == p.length && ("w" == p.charAt(1) ? h.left = b.left + b.width / 2 - 15 : h.left = b.left + b.width / 2 - e + 15);
a.css(h).addClass("tipsy-" + p);
a.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + p.charAt(0);
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
this.$tip || (this.$tip = g('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
g.fn.tipsy = function(b) {
function a(a) {
var e = g.data(a, "tipsy");
e || (e = new m(a, g.fn.tipsy.elementOptions(a, b)), g.data(a, "tipsy", e));
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
var e = a(this), l = b.delayOut;
e.hoverState = "out";
0 == l ? e.hide() : (e.tip().removeClass("in"), setTimeout(function() {
"out" == e.hoverState && e.hide();
}, l));
}
b = g.extend({}, g.fn.tipsy.defaults, b);
b.live || this.each(function() {
a(this);
});
if ("manual" != b.trigger) {
var p = b.live ? "live" : "bind", h = "hover" == b.trigger ? "mouseleave" : "blur";
this[p]("hover" == b.trigger ? "mouseenter" : "focus", e)[p](h, c);
}
return this;
};
g.fn.tipsy.defaults = {
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
g.fn.tipsy.elementOptions = function(b, a) {
return g.metadata ? g.extend({}, a, g(b).metadata()) : a;
};
g.fn.tipsy.autoNS = function() {
return g(this).offset().top > g(n).scrollTop() + g(d).height() / 2 ? "s" : "n";
};
g.fn.tipsy.autoWE = function() {
return g(this).offset().left > g(n).scrollLeft() + g(d).width() / 2 ? "e" : "w";
};
g.fn.tipsy.autoBounds = function(b, a) {
return function() {
var e = a[0], c = 1 < a.length ? a[1] : !1, p = g(n).scrollTop() + b, h = g(n).scrollLeft() + b, k = g(this);
k.offset().top < p && (e = "n");
k.offset().left < h && (c = "w");
g(d).width() + g(n).scrollLeft() - k.offset().left < b && (c = "e");
g(d).height() + g(n).scrollTop() - k.offset().top < b && (e = "s");
return e + (c ? c : "");
};
};
return f;
}({}, v, x));
n.register("$35", function(f, d, g) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return n.require("$6", "string.js").trim(this, " \n\r\t");
});
f.html = function() {
function d() {
b = /[<>&]/g;
a = /(\r\n|\n|\r)/g;
e = /(?:https?):\/\/(\S+)/gi;
l = location.hostname;
d = null;
}
function k(a) {
return "&#" + a.charCodeAt(0) + ";";
}
function c(a, b) {
return '<a href="' + a + '" target="' + (b.indexOf(l) ? "_blank" : "_top") + '">' + b + "</a>";
}
var b, a, e, l;
return function(l, h) {
d && d();
var y = l.replace(b, k);
h && (y = y.replace(e, c).replace(a, "<br />"));
return y;
};
}();
return f;
}({}, v, x));
n.register("$36", function(f, d, g) {
function m() {}
var k, c, b = n.require("$22", "rtl.json");
f.init = function() {
return new m();
};
f.cast = function(a) {
return a instanceof m ? a : "string" === typeof a ? f.parse(a) : f.clone(a);
};
f.clone = function(a) {
var b, c = new m();
for (b in a) c[b] = a[b];
return c;
};
f.parse = function(a) {
k || (c = /[-_+]/, k = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(c).join("-");
if (!k.exec(a)) return null;
var b = new m();
b.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) b.script = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
if (a = RegExp.$3) b.region = a.toUpperCase();
if (a = RegExp.$4) b.variant = a.toLowerCase();
if (a = RegExp.$5) b.extension = a;
return b;
};
d = m.prototype;
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
for (var a = 4, b, c, p = [ "variant", "region", "script", "lang" ], h = []; 0 !== a--; ) if (b = p[a], 
c = this[b]) c.join && (c = c.join("-")), 1 === a && 3 === c.length ? h.push("region-m49") : h = h.concat([ b, b + "-" + c.toLowerCase() ]);
return h.join(" ");
};
d.isRTL = function() {
return !!b[String(this.script || this.lang).toLowerCase()];
};
d = null;
return f;
}({}, v, x));
n.register("$37", function(f, d, g) {
function m(a) {
d.console && console.error && console.error(a);
}
function k() {
m("Method not implemented");
}
function c() {}
function b(a) {}
c.prototype.toString = function() {
return "[Undefined]";
};
b.prototype._validate = function(a) {
var b, l, p = !0;
for (b in this) l = this[b], l === k ? (m(a + "." + b + "() must be implemented"), 
p = !1) : l instanceof c && (m(a + "." + b + " must be defined"), p = !1);
return p;
};
f.init = function(a, e) {
var l, p = new b();
if (a) for (l = a.length; 0 !== l--; ) p[a[l]] = k;
if (e) for (l = e.length; 0 !== l--; ) p[e[l]] = new c();
return p;
};
f.validate = function(a) {
var b = /function (\w+)\(/.exec(a.toString()) ? RegExp.$1 : "";
a.prototype._validate(b || "Object");
};
return f;
}({}, v, x));
n.register("$48", function(f, d, g) {
var m = d.requestAnimationFrame, k = d.cancelAnimationFrame, c = 0;
if (!m || !k) for (var b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (m = d[b + "RequestAnimationFrame"]) if (k = d[b + "CancelAnimationFrame"] || d[b + "CancelRequestAnimationFrame"]) break;
m && k || (m = function(b) {
var l = a();
timeToCall = Math.max(0, 16 - (l - c));
nextTime = l + timeToCall;
timerId = d.setTimeout(function() {
b(nextTime);
}, timeToCall);
c = nextTime;
return timerId;
}, k = function(a) {
clearTimeout(a);
});
var a = Date.now || function() {
return new Date().getTime();
};
f.loop = function(a, b) {
function c() {
d = m(c, b);
a(h++);
}
var h = 0, d;
c();
return {
stop: function() {
d && k(d);
d = null;
}
};
};
return f;
}({}, v, x));
n.register("$45", function(f, d, g) {
function m(a, c, e, r) {
if (b) {
var h = e;
e = function(a) {
if ((a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType) return h(a);
};
}
a.addEventListener(c, e, r);
return {
unbind: function() {
a.removeEventListener(c, e, r);
}
};
}
function k(a) {
a.preventDefault();
a.stopPropagation();
return !1;
}
var c, b = !!d.navigator.msPointerEnabled, a = b ? "MSPointerDown" : "touchstart", e = b ? "MSPointerMove" : "touchmove", l = b ? "MSPointerUp" : "touchend";
f.ok = function(a) {
null == c && (c = "function" === typeof g.body.addEventListener);
c && a && a(f);
return c;
};
f.ms = function() {
return b;
};
f.dragger = function(b, c) {
function h(a) {
b.addEventListener(a, d[a], !1);
}
function r(a) {
b.removeEventListener(a, d[a], !1);
}
var d = {};
d[a] = function(b) {
p(b, function(e, h) {
h.type = a;
c(b, h, f);
});
h(e);
h(l);
return !0;
};
d[l] = function(a) {
r(e);
r(l);
p(a, function(b, e) {
e.type = l;
c(a, e, f);
});
return !0;
};
d[e] = function(a) {
p(a, function(b, h) {
h.type = e;
c(a, h, f);
});
return k(a);
};
h(a);
var f = {
kill: function() {
r(a);
r(e);
r(l);
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
z && z.stop();
z = null;
}
var z, G, B, u = {}, w = [], F = [], g = [];
u[a] = function(a) {
G = !1;
s();
var b = h();
p(a, function(a, c) {
w[a] = b;
F[a] = c.clientX;
g[a] = c.clientY;
});
B = c.scrollLeft;
return !0;
};
u[l] = function(a) {
p(a, function(a, b) {
var c = h() - w[a], e = F[a] - b.clientX, c = Math.abs(e) / c;
d(c, e ? 0 > e ? -1 : 1 : 0);
});
B = null;
return !0;
};
u[e] = function(a) {
var b, e;
null == B || p(a, function(a, c) {
b = F[a] - c.clientX;
e = g[a] - c.clientY;
});
if (e && Math.abs(e) > Math.abs(b)) return G = !0;
b && (G = !0, c.scrollLeft = Math.max(0, B + b));
return k(a);
};
if (!b || f) r(a), r(e), r(l), b && (c.className += " mstouch");
return {
kill: function() {
D(a);
D(e);
D(l);
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
var w = c.scrollLeft, h = a > w ? 1 : -1, r = Math[1 === h ? "min" : "max"], l = Math.round(16 * b * h);
return z = n.require("$48", "fps.js").loop(function(b) {
b && (w = Math.max(0, r(a, w + l)), c.scrollLeft = w, a === w && (s(), e && e(w)));
}, c);
}
};
};
f.start = function(b, c) {
return m(b, a, c, !1);
};
f.move = function(a, b) {
return m(a, e, b, !1);
};
f.end = function(a, b) {
return m(a, l, b, !1);
};
var p = f.each = function(a, c) {
if (b) (a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType && c(0, a); else for (var e = -1, h = (a.originalEvent || a).changedTouches || []; ++e < h.length; ) c(e, h[e]);
}, h = Date.now || function() {
return new Date().getTime();
};
return f;
}({}, v, x));
n.register("$49", function(f, d, n) {
f.init = function(d) {
function k() {
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
var a = d.parentNode, e = a.insertBefore(n.createElement("div"), d);
g(d).on("input", c).on("scroll", k);
g(a).addClass("has-mirror");
e.className = "ta-mirror";
var l = d.offsetWidth - d.clientWidth;
2 < l && (e.style.marginRight = String(l - 2) + "px");
c();
k();
return {
kill: function() {
g(d).off("input", c).off("scroll", k);
a.removeChild(e);
e = null;
g(a).removeClass("has-mirror");
}
};
};
return f;
}({}, v, x));
n.register("$29", function(f, d, g) {
function m(b, a) {
for (var c = 0, l = -1, p = a && d[a], h = k[b] || [], f = h.length; ++l < f; ) callback = h[l], 
"function" === typeof callback && (callback(p), c++);
return c;
}
var k = {}, c;
f.load = function(b, a, c) {
function l() {
f && (clearTimeout(f), f = null);
A && (A.onreadystatechange = null, A = A = A.onload = null);
b && (delete k[b], b = null);
}
function p(a, h) {
var d = A && A.readyState;
if (h || !d || "loaded" === d || "complete" === d) h || m(b, c), l();
}
function h() {
if (0 === m(b)) throw Error('Failed to load "' + (c || b) + '"');
l();
}
if (c && d[c]) "function" === typeof a && a(d[c]); else if (null != k[b]) k[b].push(a); else {
k[b] = [ a ];
var f = setTimeout(h, 4e3), A = g.createElement("script");
A.setAttribute("src", b);
A.setAttribute("async", "true");
A.onreadystatechange = p;
A.onload = p;
A.onerror = h;
A.onabort = l;
g.getElementsByTagName("head")[0].appendChild(A);
}
};
f.stat = function(b) {
var a;
if (!(a = c)) {
for (var e, d, p = g.getElementsByTagName("script"), h = -1, k = p.length; ++h < k; ) if (a = p[h].getAttribute("src")) if (e = a.indexOf("/lib/vendor"), 
-1 !== e) {
d = a.substr(0, e);
break;
}
a = c = d || "/static";
}
return a + b;
};
return f;
}({}, v, x));
n.register("$16", function(f, d, E) {
function m(a, b) {
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
function k(a) {
a.off("change");
a.off("focus");
a.off("blur");
}
function c(a) {
k(a);
a.setReadOnly(!0);
a.setHighlightGutterLine(!1);
a.setHighlightActiveLine(!1);
}
function b(b, c) {
function e() {
this.HighlightRules = d;
}
var d = a(c), r = b.require, l = r("ace/lib/oop");
l.inherits(d, r("ace/mode/text_highlight_rules").TextHighlightRules);
l.inherits(e, r("ace/mode/text").Mode);
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

case p:
return l || "%%";
}
}
var l, p = "auto";
f.init = function(a, e, l) {
var f, r = !1, D = l || p, s = a.parentNode, z = s.appendChild(E.createElement("div"));
g(s).addClass("has-proxy has-ace");
n.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(d) {
if (z) {
if (!d) throw Error("Failed to load code editor");
f = d.edit(z);
var l = f.session, k = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(r);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
l.setUseSoftTabs(!1);
k.setShowGutter(!0);
k.setPadding(10);
k.setScrollMargin(8);
l.setMode(b(d, D));
f.setValue(a.value, -1);
l.setUseWrapMode(!0);
e ? m(f, e) : c(f);
}
}, "ace");
return {
kill: function() {
f && (k(f), f.destroy(), f = null);
z && (s.removeChild(z), g(s).removeClass("has-proxy has-ace"), z = null);
return this;
},
disable: function() {
f && c(f);
e = null;
return this;
},
enable: function(a) {
e = a;
f && m(f, a);
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
a = a || p;
a !== D && (D = a, f && f.session.setMode(b(d.ace, a)));
return this;
},
focus: function() {
return this;
}
};
};
f.strf = function(a, b) {
p = a;
l = b;
return f;
};
return f;
}({}, v, x));
n.register("$50", function(f, d, E) {
function m(a, b) {
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
function k(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function c(a) {
k(a);
a.setMode("readonly");
}
var b = 0;
f.load = function(a) {
var b = n.require("$29", "remote.js");
b.load(b.stat("/lib/tinymce.min.js"), a, "tinymce");
return f;
};
f.init = function(a, e) {
function d(a) {
A = a;
q = "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4);
return a.replace(/(<\/?)script/gi, "$1loco:script");
}
function p(a) {
h = a;
a._getContent = a.getContent;
a.getContent = function(a) {
a = this._getContent(a);
a = a.replace(/(<\/?)loco:script/gi, "$1script");
if (!q && "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4)) {
var b = a.substr(3, a.length - 7);
if (b === A || -1 === b.indexOf("</p>")) a = b;
}
return a;
};
a._setContent = a.setContent;
a.setContent = function(a, b) {
return this._setContent(d(a), b);
};
e ? (m(a, e), e.reset()) : c(a);
g(s).removeClass("loading");
}
var h, y = !1, A = "", q = !1, r = a.parentNode, D = r.parentNode, s = r.appendChild(E.createElement("div")), z = D.insertBefore(E.createElement("nav"), r);
z.id = "_tb" + String(++b);
g(r).addClass("has-proxy has-mce");
g(s).addClass("mce-content-body loading").html(d(a.value));
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
fixed_toolbar_container: "#" + z.id,
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
val: function(b) {
b = d(b);
null == h ? (a.value = b, g(s).html(b)) : h.getContent() !== b && h.setContent(b);
e && e.val(b);
return this;
},
kill: function() {
h && (e && e.val(h.getContent()), k(h), h.destroy(), h = null);
s && (r.removeChild(s), g(r).removeClass("has-proxy has-mce"), s = null);
z && (D.removeChild(z), z = null);
return this;
},
enable: function(a) {
e = a;
h && m(h, a);
return this;
},
disable: function() {
h && c(h);
e = null;
return this;
},
focus: function() {
h && e && h.focus();
return this;
},
invs: function(a) {
a = a || !1;
y !== a && (y = a, g(r)[a ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return f;
}({}, v, x));
n.register("$46", function(f, d, E) {
function m(b) {
function a() {
f && (A.off("input", e), f = !1);
}
function e() {
var a = b.value;
a !== r && (A.trigger("changing", [ a, r ]), r = a);
}
function d() {
e();
f && D !== r && A.trigger("changed", [ r ]);
}
function k() {
c = b;
D = r;
f || (A.on("input", e), f = !0);
A.trigger("editFocus");
q.addClass("has-focus");
return !0;
}
function h() {
c === b && (c = null);
A.trigger("editBlur");
q.removeClass("has-focus");
f && (d(), a());
return !0;
}
var f = !1, A = g(b), q = g(b.parentNode), r = b.value, D;
A.on("blur", h).on("focus", k);
return {
val: function(a) {
r !== a && (b.value = a, A.triggerHandler("input"), r = a);
return !0;
},
kill: function() {
a();
A.off("blur", h).off("focus", k);
},
fire: function() {
r = null;
e();
},
ping: d,
blur: h,
focus: k,
reset: function() {
D = r = b.value;
}
};
}
function k(b) {
this.e = b;
}
var c;
f._new = function(b) {
return new k(b);
};
f.init = function(b) {
var a = new k(b);
b.disabled ? (b.removeAttribute("disabled"), a.disable()) : b.readOnly ? a.disable() : a.enable();
return a;
};
TextAreaPrototype = k.prototype;
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
c || a.value === b || (a.value = b, g(a).triggerHandler("input"));
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
b ? b.focus() : g(this.e).focus();
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
this.l = m(this.e);
return this;
};
TextAreaPrototype.unlisten = function() {
var b = this.l;
b && (b.kill(), this.l = null);
return this;
};
TextAreaPrototype.setInvs = function(b, a) {
var c = this.i || !1;
if (a || c !== b) this._i && (this._i.kill(), delete this._i), (c = this.p) ? c.invs && c.invs(b) : b && (this._i = n.require("$49", "mirror.js").init(this.e)), 
this.i = b;
return this;
};
TextAreaPrototype.getInvs = function() {
return this.i || !1;
};
TextAreaPrototype.setMode = function(b) {
var a = this.p, e = this.i || !1;
b !== (this.m || "") && (this.m = b, a && a.kill(), this.p = a = "code" === b ? n.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === b ? n.require("$50", "mce.js").init(this.e, this.l) : null, 
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
}({}, v, x));
n.register("$47", function(f, d, n) {
function m(a) {
var b = d.console;
b && b.error && b.error(a);
}
function k(a) {
var b = n.createElement("div");
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
function l(a, b, c) {
function e(a) {
m("row[" + a + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(d) {
var h = b || 0, k = c ? -1 : 1, w = a.rows || [];
d.sort(function(a, b) {
return k * (w[a] || e(a)).cellVal(h).localeCompare((w[b] || e(b)).cellVal(h));
});
};
}
function p(a) {
this.w = a;
}
function h(a) {
this.t = a;
this.length = 0;
}
function y(a, b, c) {
var e = n.createElement("div");
e.className = c || "";
this._ = e;
this.d = b || [];
this.i = a || 0;
this.length = b.length;
}
function A(a) {
this.live = a;
this.rows = [];
}
f.create = function(a) {
return new p(a);
};
var q = p.prototype;
q.init = function(d) {
var h = this.w, l = h.id, p = h.splity(l + "-thead", l + "-tbody"), f = p[0], p = p[1], B = [], u = [], w = [], F = [];
if (d) this.ds = d, this.idxs = u, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
f.css.push("wg-thead");
p.css.push("wg-tbody");
d.eachCol(function(a, b, c) {
w[a] = l + "-col-" + b;
F[a] = c || b;
});
for (var N = k(), q = -1, A = w.length, m = k("wg-cols"), n = f.splitx.apply(f, w); ++q < A; ) n[q].header(F[q]), 
m.appendChild(N.cloneNode(!1)).setAttribute("for", w[q]);
d.eachRow(function(a, b, c) {
B[a] = new y(a, b, c);
u[a] = a;
});
this.rows = B;
this.cols = m;
this.ww = null;
this.root = N = p.body;
this.head = f;
f.redraw = c(this);
f = p.fixed = n[0].bodyY() || 20;
h.lock().resize(f, p);
h.css.push("is-table");
h.restyle();
this.sc ? this._re_sort(A) : d.sort && d.sort(u);
this.redrawDirty();
this.render();
g(N).attr("tabindex", "-1").on("keydown", e(this)).on("mousedown", b(this)).on("scroll", a(this));
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
for (var a, b, c = [], e = this.rows || [], d = -1, h, l = this.idxs, w = l.length, k = this.idxr = {}, p = this.r, f = this._r, g = this.root, y = this.cols; ++d < w; ) {
0 === d % 100 && (a = y.cloneNode(!0), b = new A(a), b.h = 2200, b.insert(g), c.push(b));
h = l[d];
k[h] = d;
a = e[h];
if (null == a) throw Error("Render error, no data at [" + h + "]");
a.page = b;
b.rows.push(a);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = c;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == p ? null != f && (a = e[f]) && a.page && (delete this._r, this.select(f, !0)) : (a = e[p]) && a.page ? this.select(p, !0) : (this.deselect(), 
this._r = p);
return this;
};
q.resize = function() {
var a = -1, b = this.ww || (this.ww = []), c = this.w, e = c.cells[0], d = e.body.childNodes, h = d.length, l = this.pages || [], w = l.length;
for (c.redraw.call(e); ++a < h; ) b[a] = d[a].style.width;
if (w) {
c = this.mx;
for (a = this.mn; a <= c; a++) l[a].widths(b);
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
for (var a = 0, b = -1, c = null, e = null, d = this.ww, h = this.sy, l = this.vh, w = this.mn, k = this.mx, p = Math.max(0, h - 100), h = l + h + 100, f = this.pages || [], g = f.length; ++b < g && !(a > h); ) l = f[b], 
a += l.height(), a < p || (null === c && (c = b), e = b, l.rendered || l.render(d));
if (w !== c) {
if (null !== w && c > w) for (b = w; b < c; b++) {
l = f[b];
if (!l) throw Error("Shit!");
l.rendered && l.sleep();
}
this.mn = c;
}
if (k !== e) {
if (null !== k && e < k) for (b = k; b > e; b--) l = f[b], l.rendered && l.sleep();
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
var e = this.idxs, d = e.length, h = (this.idxr || {})[c];
for (c = h; c !== (h += a) && !(0 <= h && d > h); ) if (b && d) h = 1 === a ? -1 : d, 
b = !1; else return null;
c = e[h];
return null == c || null == this.rows[c] ? (m("Bad next: [" + h + "] does not map to data row"), 
null) : c;
};
q.selectNext = function(a, b, c) {
a = this.next(a, b);
null != a && this.r !== a && this.select(a, c);
return this;
};
q.deselect = function(a) {
var b = this.r;
null != b && (this.r = null, g(this.tr(b)).removeClass("selected"), this.w.fire("wgRowDeselect", [ b, a ]));
return this;
};
q.selectRow = function(a, b) {
return this.select(this.idxs[a]);
};
q.select = function(a, b) {
var c = this.rows[a], e = c && c.page;
if (!e) return this.deselect(!1), m("Row is filtered out"), this;
this.deselect(!0);
var d, h = this.w.cells[1];
e.rendered || (d = e.top(), h.scrollY(d), this.redrawDirty() && this.redraw());
if (!c.rendered) return e.rendered || m("Failed to render page"), m("Row [" + c.i + "] not rendered"), 
this;
e = c.cells();
g(e).addClass("selected");
this.r = a;
b || (d = h.scrollY(), g(this.root).focus(), d !== h.scrollY() && h.scrollY(d));
h.scrollTo(e[0], !0);
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
for (var b, c = -1, e = this.rows || [], d = this.idxs || [], h = d.length; ++c < h; ) b = d[c], 
a(e[b], c, b);
return this;
};
q.sortable = function(a) {
var b = this.sc || (this.sc = new h(this));
b.has(a) || b.add(a);
return this;
};
q._re_sort = function(a) {
var b = -1, c = this.sc, e = c.active;
for (this.sc = c = new h(this); ++b < a; ) c.add(b);
e && (b = this.head.indexOf(e.id), -1 === b && (b = Math.min(e.idx, a - 1)), this.sort(b, e.desc));
return this;
};
q._sort = function(a, b) {
b ? (this.s = b, b(a)) : (b = this.s) && b(a);
return a;
};
q.sort = function(a, b) {
this._sort(this.idxs, l(this, a, b));
this.sc.activate(a, b);
return this;
};
q = null;
q = h.prototype;
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
var d = this[a], h = this.t.head.cells;
c && (e = h[c.idx]) && (e.removeClass(c.css), c !== d && e.restyle());
(e = h[a]) ? (d.desc = b, this.active = d, c = "wg-" + (b ? "desc" : "asc"), e.addClass(c).restyle(), 
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
q = A.prototype;
q.size = function() {
return this.rows.length;
};
q.insert = function(a) {
var b = this.h, c = k("wg-dead");
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
a || m("row has zero height");
return a;
};
q.render = function(a) {
for (var b, c = -1, e = this.rows, d = e.length, h = this.dead, l = this.live, w = l.childNodes; ++c < d; ) b = e[c], 
b.rendered || b.render(w);
d = a.length;
for (c = 0; c < d; c++) w[c].style.width = a[c];
h.parentNode.replaceChild(l, h);
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
}({}, v, x));
n.register("$38", function(f, d, E) {
function m(a, b) {
var c = a.id, e = c && r[c], d = e && e.parent();
if (!e || !d) return null;
var h = d.dir === q, c = h ? "X" : "Y", l = "page" + c, h = h ? A : y, k = h(d.el), c = b["offset" + c], p = d.el, f = p.className;
null == c && (c = b[l] - h(a));
c && (k += c);
p.className = f + " is-resizing";
return {
done: function() {
p.className = f;
},
move: function(a) {
d.resize(a[l] - k, e);
return !0;
}
};
}
function k(a, c) {
function e() {
g(E).off("mousemove", d);
s && (s.done(), s = null);
return !0;
}
function d(a) {
s ? s.move(a) : e();
return !0;
}
if (s) return !0;
s = m(a.target, a);
if (!s) return !0;
g(E).one("mouseup", e).on("mousemove", d);
return b(a);
}
function c(a, b) {
var c = b.type;
"touchmove" === c ? s && s.move(b) : "touchstart" === c ? s = m(a.target, b) : "touchend" === c && s && (s.done(), 
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
var e = g(c).on("editFocus", function() {
e.trigger("wgFocus", [ a(b) ]);
}).on("editBlur", function() {
e.trigger("wgBlur", [ a(null) ]);
});
}
function l(a) {
var b = a.id, c = a.className;
this.id = b;
this.el = a;
this.pos = this.index = 0;
this.css = [ c || "wg-root", "wg-cell" ];
this._cn = c;
r[b] = this;
this.clear();
}
var p = n.include("$44", "html.js") || n.include("$2", "html.js", !0), h = n.require("$21", "dom.js"), y = h.top, A = h.left, q = 1, r = {}, D, s = !1;
f.init = function(a) {
var b = new l(a);
b.redraw();
n.require("$45", "touch.js").ok(function(b) {
b.dragger(a, c);
});
g(a).on("mousedown", k);
return b;
};
d = l.prototype;
d.fire = function(a, b) {
var c = g.Event(a);
c.cell = this;
g(this.el).trigger(c, b);
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
return g(this.el).find(a);
};
d.$ = function(a, b) {
g.fn[a].apply(g(this.el), b);
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
for (var c = -1, e, d = b.length, k = 1 / d, p = 0; ++c < d; ) {
e = h.el();
this.body.appendChild(e);
for (var f = e, g = b[c], y = g, q = 1; r[g]; ) g = y + "-" + ++q;
f.id = g;
e = new l(e);
e.index = c;
e.pid = this.id;
e._locale(this.lang, this.rtl);
e.pos = p;
p += k;
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
g(a).off();
return this;
};
d.exists = function() {
return this === r[this.id];
};
d.clear = function() {
for (var a = this.el, b = this.cells, c = this.field, e = this.body, d = this.nav, l = this.length || 0; 0 !== l--; ) delete r[b[l].destroy().id];
this.cells = [];
this.length = 0;
d && (a.removeChild(d), this.nav = null);
e && (c && (p.ie() && g(e).triggerHandler("blur"), c.destroy(), this.field = null), 
this.table && (this.table = null), a === e.parentNode && a.removeChild(e));
this.body = a.appendChild(h.el("", "wg-body"));
this._h = null;
return this;
};
d.resize = function(a, b) {
if (!b && (b = this.cells[1], !b)) return;
var c = b.index, e = this.cells, d = g(this.el)[this.dir === q ? "width" : "height"](), h = e[c + 1], c = e[c - 1];
pad = (b.body || b.el.firstChild).offsetTop || 0;
max = (h ? h.pos * d : d) - pad;
min = c ? c.pos * d : 0;
b.pos = Math.min(max, Math.max(min, a)) / d;
this.redraw();
return this;
};
d.distribute = function(a) {
for (var b = -1, c = 0, e, d = this.cells, h = a.length; ++b < h && (e = d[++c]); ) e.pos = Math.max(0, Math.min(1, a[b]));
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
var d, h = b.clientWidth || 0, l = b.clientHeight || 0, k = c.offsetTop || 0, l = k > l ? 0 : l - k;
this._h !== l && (this._h = l, c.style.height = String(l) + "px", d = e);
this._w !== h && (this._w = h, d = e);
d && d.redraw();
}
c = this.length;
h = 1;
l = this.nav;
for (k = 2 === this.dir ? "height" : "width"; 0 !== c--; ) e = this.cells[c], l ? d = 1 : (e.fixed && (e.pos = e.fixed / g(b)[k]()), 
d = h - e.pos, h = e.pos), e.el.style[k] = String(100 * d) + "%", e.redraw(a);
return this;
};
d.contents = function(a, b) {
var c = this.el, e = this.body;
if (null == a) return e.innerHTML;
this.length ? this.clear() : e && (c.removeChild(e), e = null);
e || (this.body = e = c.appendChild(h.el("", b || "wg-content")), this._h = null, 
(c = this.lang) && this._locale(c, this.rtl, !0));
"string" === typeof a ? g(e)._html(a) : a && this.append(a);
this.redraw();
return this;
};
d.textarea = function(a, b) {
var c = this.field;
if (c) {
var d = c.editable();
c.reload(a, b);
d !== b && this.restyle();
} else this.length && this.clear(), d = h.el("textarea"), d.setAttribute("wrap", "virtual"), 
d.value = a, this.contents(d), c = n.require("$46", "field.js")._new(d)[b ? "enable" : "disable"](), 
e(this, d), this.field = c, this.restyle();
this.lang || this.locale("en");
return c;
};
d.locale = function(a) {
a = n.require("$36", "locale.js").cast(a);
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
a && (a.nodeType ? p.init(this.body.appendChild(a)) : p.init(g(a).appendTo(this.body)));
return this;
};
d.prepend = function(a) {
var b = this.body;
if (a.nodeType) {
var c = b.firstChild;
p.init(c ? b.insertBefore(a, c) : b.appendChild(a));
} else p.init(g(a).prependTo(b));
return this;
};
d.before = function(a) {
var b = this.body;
a.nodeType ? p.init(this.el.insertBefore(a, b)) : p.init(g(a).insertBefore(b));
return this;
};
d.header = function(a, b) {
if (null == a && null == b) return this.el.getElementsByTagName("header")[0];
this.t = h.txt(a || "");
this.el.insertBefore(h.el("header", b), this.body).appendChild(this.t);
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
b ? b.clear() : b = n.require("$47", "wgtable.js").create(this);
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
var h = e.clientHeight, d = d + g(a).outerHeight();
if (h + c < d) c = d - h; else return;
}
b ? e.scrollTop = c : g(e).stop(!0).animate({
scrollTop: c
}, 250);
};
d.navigize = function(a, c) {
function e(a) {
var b = l[a], c = f[a], d = g(b.el).show();
c.addClass("active");
p = a;
y.data("idx", a);
b.fire("wgTabSelect", [ a ]);
return d;
}
var d = this, l = d.cells, k = d.nav, p, f = [];
k && d.el.removeChild(k);
var k = d.nav = d.el.insertBefore(h.el("nav", "wg-tabs"), d.body), y = g(k).on("click", function(a) {
var c = g(a.target).data("idx");
if (null == c) return !0;
if (null != p) {
var h = f[p];
g(l[p].el).hide();
h.removeClass("active");
}
e(c);
d.redraw();
return b(a);
});
null == c && (c = y.data("idx") || 0);
d.each(function(b, c) {
f[c] = g('<a href="#' + b.id + '"></a>').data("idx", c).text(a[c]).appendTo(y);
b.pos = 0;
g(b.el).hide();
});
e(l[c] ? c : 0);
d.lock();
d.redraw();
return d;
};
d.navigated = function() {
var a = this.nav;
if (a) return g(a).data("idx");
};
d = null;
return f;
}({}, v, x));
n.register("$24", function(f, d, E) {
function m(a) {
var b = [];
a && (a.saved() || b.push("po-unsaved"), a.fuzzy() ? b.push("po-fuzzy") : a.flagged() && b.push("po-flagged"), 
a.translation() || b.push("po-empty"), a.comment() && b.push("po-comment"));
return b.join(" ");
}
function k(a, b, c) {
b = g(a.title(b).parentNode);
var e = b.find("span.lang");
c ? (c = n.require("$36", "locale.js").cast(c), e.length || (e = g("<span></span>").prependTo(b)), 
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
n.require("$3", "number.js");
var a = "poUpdate", e = "changing", l = "changed", p = 0, h = 1, y = 2, A = 3, q = 4, r = 5, D, s, z = n.require("$35", "string.js").html, v = n.require("$6", "string.js").sprintf;
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
}(), u = b.prototype = n.require("$37", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
a || (a = s || n.require("$1", "t.js").init());
var b = [];
b[p] = a._x("Source text", "Editor") + ":";
b[A] = a._x("%s translation", "Editor") + ":";
b[q] = a._x("Context", "Editor") + ":";
b[r] = a._x("Comments", "Editor") + ":";
b[h] = a._x("Single", "Editor") + ":";
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
var c = n.require("$38", "wingrid.js").init(a);
g(d).on("resize", b);
this.redraw = b;
g(a).on("wgFocus wgBlur", function(a, b) {
a.stopPropagation();
D = b;
});
this.destroy = function() {
c.destroy();
g(d).off("resize", b);
};
this.rootDiv = a;
return c;
};
u.$ = function() {
return g(this.rootDiv);
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
for (var e = this.listTable, d = e.selected(), h = d, l, k = this.po; null != (d = e.next(a, c, d)); ) {
if (h === d) {
d = null;
break;
}
if (b && (l = k.row(d), l.translated(0))) continue;
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
var c, e = this.listTable, d = this.lastFound, h = this.lastSearch;
if (a) {
if (h === a) return d || 0;
if (h && !d && 0 === a.indexOf(h)) return 0;
c = this.dict.find(a);
}
this.lastSearch = h = a;
this.lastFound = d = c ? c.length : this.po.length;
c ? e.filter(c) : e.unfilter();
b || this.fire("poFilter", [ h, d ]);
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
a = c.replace(/(?:^| +)po-[a-z]+/g, "") + " " + m(a);
a !== c && g(b).attr("class", a);
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
c = g.Event(a);
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
var a = this, b, c = a.listCell, e = a.listTable, d = a.po, h = d && d.locale(), l = h && h.isRTL(), k = d && d.length || 0;
if (!d || !d.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = h;
a.lastSearch && (a.lastSearch = "", a.lastFound = k, a.fire("poFilter", [ "", k ]));
e && (b = e.thead().distribution());
a.listTable = e = c.tabulate({
eachCol: function(b) {
var c, e, d = a.getListColumns(), h = a.getListHeadings();
for (e in d) c = d[e], b(c, e, h[c]);
},
eachRow: function(b) {
d.each(function(c, e) {
b(e.idx, a.getListEntry(e), m(e));
});
},
sort: a.getSorter()
});
var p, c = a.getListColumns();
for (p in c) e.sortable(c[p]);
b && e.thead().distribute(b);
e.tbody().$(l ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad");
return !!k;
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
var e = [], d, h = !1, l = this.$smeta, k = this.labels, p = [], f = a.tags(), y = f && f.length;
if (d = a.context()) p.push("<span>" + z(k[q]) + "</span>"), p.push("<mark>" + z(d) + "</mark>");
if (y && this.getTag) for (p.push("<span>Tagged:</span>"); 0 <= --y; ) (d = this.getTag(f[y])) && p.push('<mark class="tag">' + z(d.mod_name) + "</mark>");
p.length && e.push(p.join(" "));
if (this.getMono() && (d = a.refs()) && (f = d.split(/\s/), y = f.length)) {
for (p = []; 0 <= --y; ) d = f[y], p.push("<code>" + z(d) + "</code>");
e.push('<p class="has-icon icon-file">' + p.join(" ") + "</p>");
}
(d = a.notes()) && e.push('<p class="has-icon icon-info">' + z(d, !0) + "</p>");
e.length ? (l || (l = b.find("div.meta"), l.length || (l = g('<div class="meta"></div>').insertAfter(b.header())), 
c(this, l, "poMeta"), this.$smeta = l), l.html(e.join("\n")).show(), h = !0) : l && l.text() && (l.text("").hide(), 
h = !0);
return h;
};
u.setTrgMeta = function(a, b, c) {
var e = [], d = !1, h = this.$tmeta;
b = (a = a.errors(b)) && a.length;
var l;
if (b) for (l = 0; l < b; l++) e.push('<p class="has-icon icon-warn">' + z(a[l], !0) + ".</p>");
e.length ? (h || (h = c.find("div.meta"), h.length || (h = g('<div class="meta"></div>').insertAfter(c.header())), 
this.$tmeta = h), h.html(e.join("\n")).show(), d = !0) : h && h.text() && (h.text("").hide(), 
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
var l = J, g = L[p];
a.off();
a.titled() !== g && k(a, g, e || "en");
g = !1;
s.setSrcMeta(b, a) && (g = !0);
if (b.plural()) {
var g = -1, q = [], r = [], m = a.id + "-", A = b.sourceForms() || e && e.plurals || [ "One", "Other" ], n = A.length;
if (2 !== n || "=" === A[0].charAt(0) && "=1" !== A[0]) for (;++g < n; ) q[g] = m + String(g), 
r[g] = c(A[g]) + ":"; else q = [ m + "-0", m + "-1" ], r = [ L[h], L[y] ];
a.splity.apply(a, q);
a.each(function(a, c) {
a.header(r[c]).textarea(b.source(null, c), l).setStrf(C).setMode(z).setInvs(B);
});
a.lock();
l && a.each(function(a, b) {
f(a, b);
});
} else g && a.redraw(), a.textarea(b.source(), l).setStrf(C).setMode(z).setInvs(B), 
l && f(a, 0);
}
function f(c, d) {
c.on(e, function(a, c) {
b.source(c, d);
0 === d && s.updateListCell(b, "source");
s.unsave(b, d);
}).on(l, function() {
0 === d && s.po.reIndex(b);
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function g(a, e, d) {
M && a.eachTextarea(function(a) {
a.ping();
});
a.off();
var h = e.isKnown() && e.label || "Target", h = v(L[A], h);
a.titled() !== h && k(a, h, e);
h = !1;
!this.sourceCell && s.setSrcMeta(b, a) && (h = !0);
s.setTrgMeta(b, d, a) && (h = !0);
s.setStatus(b, d);
if (b.pluralized()) {
var l = [], p = [], f = a.id + "-", y = b.targetForms() || e.plurals || [ "One", "Other" ], h = y.length, q = function(a) {
var b = y[a];
p.push(b ? c(b, !0) : "Form " + a);
l.push(f + String(a));
};
for (b.each(q); (e = l.length) < h; ) q(e);
a.splitx.apply(a, l);
a.each(function(a, c) {
var e = M && !b.disabled(c);
a.textarea(b.translation(c), e).setStrf(C).setMode(z).setInvs(B);
M && m(a, c);
});
a.navigize(p, d || null).on("wgTabSelect", function(c, e) {
var d = M && c.cell.editable();
d && d.focus();
s.setTrgMeta(b, e, a);
s.setStatus(b, e);
s.fire("poTab", [ e ]);
});
} else h && a.redraw(), a.textarea(b.translation(), M && !b.disabled(0)).setStrf(C).setMode(z).setInvs(B), 
M && m(a, 0);
}
function m(c, d) {
c.on(e, function(a, c, e) {
b.translate(c, d);
0 === d && s.updateListCell(b, "target");
b.fuzzy(d) ? s.fuzzy(!1, b, d) : s.unsave(b, d);
"" === c ? (s.fire("poEmpty", [ !0, b, d ]), s.setStatus(b, d)) : "" === e && (s.fire("poEmpty", [ !1, b, d ]), 
s.setStatus(b, d));
}).on(l, function() {
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function n(c) {
c.off();
var d = L[q];
c.titled() !== d && (k(c, d), s.setStatus(null));
c.textarea(b.context(), !0).setMode(z).setInvs(B);
X && c.on(e, function(a, c) {
b.context(c);
s.updateListCell(b, "source");
s.unsave(b, O);
}).on(l, function() {
s.po.reIndex(b);
s.dict && s.rebuildSearch();
s.fire(a, [ b ]);
});
}
function u(a) {
var c = L[r];
a.titled() !== c && k(a, c);
a.off().on(e, function(a, c) {
b.comment(c);
s.fire("poComment", [ b, c ]);
s.unsave(b, O);
}).textarea(b.comment(), !0);
}
var s = this, z = s.mode, E = b.isHTML(), B = s.inv || !1, x = this.fmt || null, C = b.format() || null, I = b.is(s.active), O = 0, T = s.sourceCell, S = s.targetCell, U = s.contextCell, V = s.commentCell, M = s.editable.target, J = s.editable.source, X = s.editable.context, P = D, Y = s.sourceLocale, W = s.targetLocale, L = s.labels;
s.html !== E && (s.html = E, "code" !== s.mode && (z = E ? "html" : "", s.setMode(z)));
s.active = b;
T && d(T, Y);
U && n(U);
S && W && (O = S.navigated() || 0, g(S, W, O));
V && u(V);
P && (P.exists() || (P = P.parent()), (E = P.editable()) && E.focus());
x !== C && (this.fmt = C);
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
}({}, v, x));
n.register("$13", function(f, d, E) {
function m() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function k(a) {
a = g('<button type="button" class="button button-small icon icon-' + a + ' hastip"></button>');
n.require("$12", "tooltip.js").init(a);
return a;
}
function c(a) {
return k("cloud").attr("title", a.labels[8] + " (Ctrl-U)").on("click", function(b) {
b.preventDefault();
a.focus().fuzzy(!a.fuzzy());
});
}
function b(a) {
return k("robot").attr("title", a.labels[9] + " (Ctrl-J)").on("click", function(b) {
b.preventDefault();
a.fire("poHint");
});
}
d = n.require("$24", "base.js");
f.init = function(a) {
var b = new m();
a = b.setRootCell(a);
var c = a.splity("po-list", "po-edit"), d = c[0], h = c[1], c = h.splitx("po-trans", "po-comment"), k = c[0], f = c[1].header("Loading.."), c = k.splity("po-source", "po-target"), k = c[0].header("Loading.."), c = c[1].header("Loading..");
a.distribute([ .34 ]);
h.distribute([ .8 ]);
b.setListCell(d);
b.setSourceCell(k);
b.setTargetCell(c);
b.commentCell = f;
b.editable.source = !1;
return b;
};
d = m.prototype = d.extend(m);
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
var c, d = b(a.source() || ""), l = a.context();
return l ? (c = E.createElement("p"), c.appendChild(E.createElement("mark")).innerText = l, 
c.appendChild(E.createTextNode(" " + d)), c) : d;
} ];
this.targetLocale && (c[1] = function() {
return b(a.translation() || "");
});
return c;
};
d.stats = function() {
var a = this.po, b = a.length, c = 0, d = 0, h = 0;
a.each(function(a, b) {
b.fuzzy() ? h++ : b.translated() ? c++ : d++;
});
return {
t: b,
p: c.percent(b) + "%",
f: h,
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
e || (this.$tnav = e = g("<nav></nav>").append(c(this)).append(b(this)).appendTo(this.targetCell.header()));
var d = [];
a.translated() ? a.fuzzy() && d.push("po-fuzzy") : d.push("po-empty");
e.attr("class", d.join(" "));
}
};
d.getSorter = function() {
function a(a, c) {
var d = a.weight(), l = c.weight();
return d === l ? b(a, c) : d > l ? -1 : 1;
}
function b(a, c) {
return a.hash().localeCompare(c.hash());
}
var c = this;
return function(d) {
var h = c.po, k = c.locked() ? a : b;
d.sort(function(a, b) {
return k(h.row(a), h.row(b));
});
};
};
return f;
}({}, v, x));
n.register("$14", function(f, d, n) {
var m = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, k = {
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
if (!l[e]) return !0;
var d = c[e];
if (!d) throw Error("command undefined #" + e);
if (a.altKey || a.shiftKey && !k[e] || !1 === d(a, b)) return !0;
a.stopPropagation();
a.preventDefault();
return !1;
}
var l = {};
g(a || d).on("keydown", e);
return {
add: function(a, b) {
c[m[a]] = b;
return this;
},
enable: function() {
var a, b;
for (b in arguments) a = m[arguments[b]], l[a] = !0;
return this;
},
disable: function() {
g(a || d).off("keydown", e);
b = a = l = null;
}
};
};
return f;
}({}, v, x));
n.register("$25", function(f, d, g) {
function m() {
this.reIndex([]);
}
f.init = function() {
return new m();
};
d = m.prototype;
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
for (var c = -1, b = this.length, a, e = this.keys, l = this.ords, f = []; ++c < b; ) f[c] = [ this[c], e[c] ];
f.sort(function(a, b) {
return d(a[0], b[0]);
});
for (c = 0; c < b; c++) a = f[c], this[c] = a[0], a = a[1], e[c] = a, l[a] = c;
return this;
};
d.join = function(d) {
return [].join.call(this, d);
};
d = null;
return f;
}({}, v, x));
n.register("$26", function(f, d, g) {
function m(d, c) {
var b = RegExp("^.{0," + (d - 1) + "}[" + c + "]"), a = RegExp("^[^" + c + "]+");
return function(c, l) {
for (var f = c.length, h; f > d; ) {
h = b.exec(c) || a.exec(c);
if (null == h) break;
h = h[0];
l.push(h);
h = h.length;
f -= h;
c = c.substr(h);
}
0 !== f && l.push(c);
return l;
};
}
f.create = function(d) {
function c(a) {
return h[a] || "\\" + a;
}
var b, a, e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, l = /[ \r\n]+/g, f = /[\t\v\f\x07\x08\\\"]/g, h = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == d || isNaN(d = Number(d))) d = 79;
0 < d && (b = m(d - 3, " "), a = m(d - 2, "-– \\.,:;\\?!\\)\\]\\}\\>"));
return {
pair: function(b, h) {
if (!h) return b + ' ""';
h = h.replace(f, c);
var l = 0;
h = h.replace(e, function() {
l++;
return "\\n\n";
});
if (!(l || d && d < h.length + b.length + 3)) return b + ' "' + h + '"';
var g = [ b + ' "' ], m = h.split("\n");
if (a) for (var n = -1, z = m.length; ++n < z; ) a(m[n], g); else g = g.concat(m);
return g.join('"\n"') + '"';
},
prefix: function(a, b) {
var c = a.split(e);
return b + c.join("\n" + b);
},
refs: function(a) {
a = a.replace(l, " ", a);
b && (a = b(a, []).join("\n#: "));
return "#: " + a;
}
};
};
return f;
}({}, v, x));
n.register("$39", function(f, d, g) {
function m() {
this.length = 0;
}
f.init = function() {
return new m();
};
d = m.prototype;
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
}({}, v, x));
n.register("$27", function(f, d, g) {
function m() {}
f.extend = function(d) {
return d.prototype = new m();
};
d = m.prototype = n.require("$37", "abstract.js").init([ "add", "load" ]);
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
null == d ? d = this.loc : this.loc = d = n.require("$36", "locale.js").cast(d);
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
for (var d = -1, c = this.rows, b = c.length, a = n.require("$39", "list.js").init(); ++d < b; ) a.push(c[d]);
return a;
};
d = null;
return f;
}({}, v, x));
n.register("$28", function(f, d, g) {
function m(c, b, a) {
if (null == a) return c[b] || "";
c[b] = a || "";
return c;
}
function k() {
this._id = this.id = "";
}
f.extend = function(c) {
return c.prototype = new k();
};
d = k.prototype;
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
for (var c, b = {}, a = [], d = this.flg || [], l = d.length; 0 !== l--; ) c = d[l], 
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
for (var b = -1, a = this.src, d = this.msg, l = Math.max(a.length, d.length); ++b < l; ) c(b, a[b], d[b]);
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
return m(this, "cmt", c);
};
d.notes = function(c) {
return m(this, "xcmt", c);
};
d.refs = function(c) {
return m(this, "rf", c);
};
d.format = function(c) {
return m(this, "fmt", c);
};
d.context = function(c) {
return m(this, "ctx", c);
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
}({}, v, x));
n.register("$15", function(f, d, g) {
function m(a) {
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
function k(a, b) {
var c = a || "";
b && (c += "\0" + b);
return c;
}
function c(a) {
var b = d.console;
b && b.error && b.error(a.message || String(a));
}
function b(a) {
return n.require("$26", "format.js").create(a);
}
function a(a) {
this.locale(a);
this.clear();
this.head = m(this.now());
}
function e(a, b) {
this.src = [ a || "" ];
this.msg = [ b || "" ];
}
f.create = function(b) {
return new a(b);
};
g = n.require("$27", "messages.js").extend(a);
g.clear = function() {
this.rows = n.require("$25", "collection.js").init();
this.length = 0;
return this;
};
g.now = function() {
function a(b, c) {
for (var d = String(b); d.length < c; ) d = "0" + d;
return d;
}
var b = new Date(), c = b.getUTCFullYear(), d = b.getUTCMonth() + 1, e = b.getUTCDate(), f = b.getUTCHours(), b = b.getUTCMinutes();
return a(c, 4) + "-" + a(d, 2) + "-" + a(e, 2) + " " + a(f, 2) + ":" + a(b, 2) + "+0000";
};
g.header = function(a, b) {
var c = this.head || (this.head = {});
if (null == b) return this.headers()[a] || "";
c[a] = b || "";
return this;
};
g.headers = function(a) {
var b, c = this.now(), d = this.head || (this.head = m(c));
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
g.get = function(a, b) {
var c = k(a, b);
return this.rows.get(c);
};
g.add = function(a, b) {
a instanceof e || (a = new e(a));
b && a.context(b);
var d = a.hash();
this.rows.get(d) ? c("Duplicate message at index " + this.indexOf(a)) : (a.idx = this.rows.add(d, a), 
this.length = this.rows.length);
return a;
};
g.load = function(a) {
for (var b = -1, d, f, k, g, m, n, s = (k = this.locale()) && k.nplurals || 2, z = []; ++b < a.length; ) d = a[b], 
null == d.parent ? (f = d.source || d.id, k = d.target || "", g = d.context, f || g ? (m = new e(f, k), 
m._id = d._id, g && m.context(g), d.flag && m.flag(d.flag, 0), d.comment && m.comment(d.comment), 
d.notes && m.notes(d.notes), d.refs && m.refs(d.refs), m.format(d.format), d.message = m, 
this.add(m), d.prev && d.prev[0] && (m.prev(d.prev[0].source, d.prev[0].context), 
d.prev[1] && m._src.push(d.prev[1].source || ""))) : 0 === b && "object" === typeof k && (this.head = k, 
this.headcmt = d.comment)) : z.push(d);
for (b = -1; ++b < z.length; ) try {
d = z[b];
f = d.source || d.id;
m = a[d.parent] && a[d.parent].message;
if (!m) throw Error("parent missing for plural " + f);
n = d.plural;
1 === n && m.plural(f);
n >= s || (d.flag && m.flag(d.flag, n), m.translate(d.target || "", n), d.format && !m.format() && m.format(d.format));
} catch (v) {
c(v);
}
return this;
};
g.wrap = function(a) {
this.fmtr = b(a);
return this;
};
g.toString = function() {
var a, c = this.locale(), d = [], f = [], k = this.headers(), g = !c, m = c && c.nplurals || 2, n = this.fmtr || b();
k[c ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (a in k) f.push(a + ": " + k[a]);
f = new e("", f.join("\n"));
f.comment(this.headcmt || "");
g && f.fuzzy(0, !0);
d.push(f.toString());
d.push("");
this.rows.each(function(a, b) {
a && (d.push(b.cat(n, g, m)), d.push(""));
});
return d.join("\n");
};
g = n.require("$28", "message.js").extend(e);
g.prev = function(a, b) {
this._src = [ a || "" ];
this._ctx = b;
};
g.hash = function() {
return k(this.source(), this.context());
};
g.toString = function() {
return this.cat(b());
};
g.cat = function(a, b, c) {
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
g.compare = function(a, b) {
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
g.copy = function() {
var a = new e(), b, c;
for (b in this) this.hasOwnProperty(b) && ((c = this[b]) && c.concat && (c = c.concat()), 
a[b] = c);
return a;
};
g = g = null;
return f;
}({}, v, x));
n.register("$17", function(f, d, n) {
f.init = function(d, f) {
function c() {
return l || (l = g('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function b(a, b, d) {
a = g("<p></p>").text(d);
c().dialog("close").html("").dialog("option", "title", "Error").append(a).dialog("open");
}
function a(a) {
var b = a && a.code;
if (b) {
for (var d = -1, e = b.length, f = g("<ol></ol>").attr("class", a.type); ++d < e; ) g("<li></li>").html(b[d]).appendTo(f);
f.find("li").eq(a.line - 1).attr("class", "highlighted");
c().dialog("close").html("").dialog("option", "title", a.path + ":" + a.line).append(f).dialog("open");
}
}
function e(a) {
a = a.target;
var b = g(a).find("li.highlighted")[0], b = Math.max(0, (b && b.offsetTop || 0) - Math.floor(a.clientHeight / 2));
a.scrollTop = b;
}
var l;
return {
load: function(l) {
c().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", e);
l = g.extend({
ref: l,
path: f.popath
}, f.project || {});
d.ajax.post("fsReference", l, a, b);
}
};
};
return f;
}({}, v, x));
n.register("$30", function(f, d, g) {
function m(d) {
this.api = d;
this.chars = 0;
}
f.create = function(d) {
return new m(d);
};
d = m.prototype;
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
var k = a.source(null, d);
if (k && (a.untranslated(d) || c)) {
var q = n[k];
if (q) q.push(a); else {
var q = k.length, B = e.isHtml(k), B = r[B ? 1 : 0], u = B.sources;
if (B.length + q > m || u.length === h) B = b(B), u = B.sources;
u.push(k);
n[k] = [ a ];
B.length += q;
f += q;
g += 1;
}
}
}
var e = this.api, f = 0, g = 0, h = 50, m = 5e3, n = {}, q = [], r = [];
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
this.map = n;
this.chars = f;
this.length = g;
this.batches = q;
this.locale = d.locale();
};
d.abort = function() {
this.state = "abort";
return this;
};
d.dispatch = function() {
function d(a, b) {
function e(c, d, h) {
b !== h && (a === d || 1 < c && f.source(null, 1) === a) && (f.translate(b, c), 
m++, z++);
return m;
}
if (!c()) return !1;
if (!b) return !0;
var f, h = n[a] || [], l = h.length, k = -1, m;
for (v++; ++k < l; ) if (f = h[k]) m = 0, f.each(e), m && g("each", [ f ]);
return !0;
}
function c() {
return "abort" === h.state ? (m && (m.abort(), f()), !1) : !0;
}
function b() {
var b = q.shift(), c;
b ? (c = b.sources) && c.length ? m.batch(c, r, b.html, d).fail(a).always(e) : e() : f();
}
function a() {
h.abort();
f();
}
function e() {
s++;
g("prog", [ s, B ]);
c() && b();
}
function f() {
m = q = null;
g("done");
}
function g(a, b) {
for (var c = u[a] || [], d = c.length; 0 <= --d; ) c[d].apply(null, b);
}
var h = this, m = h.api, n = h.map, q = h.batches || [], r = h.locale, v = 0, s = 0, z = 0, x = h.length, B = q.length, u = {
done: [],
each: [],
prog: []
};
h.state = "";
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
return Math.max(x - v, 0);
},
did: function() {
return v;
}
};
}
};
};
return f;
}({}, v, x));
n.register("$40", {
nn: [ "no" ]
});
n.register("$31", function(f, d, g) {
function m() {}
function k(c) {
c.parseError = function(b) {
return b && b.code && 200 !== b.code && b.message ? "Error " + b.code + ": " + b.message : "";
};
c.batch = function(b, a, d, f) {
function k(c) {
for (var d = b.length, e = -1; ++e < d && !1 !== f(b[e], c[e] || "", a); ) ;
}
d = d ? "html" : "plain";
var h = this.toLang(a);
return c._call({
url: "https://translate.yandex.net/api/v1.5/tr.json/translate?format=" + d + "&lang=en-" + h,
method: "POST",
traditional: !0,
data: {
key: c.key(),
text: b
}
}).done(function(a, b, d) {
a && 200 === a.code ? k(a.text || []) : (c.stderr(c.parseError(a) || c.httpError(d)), 
k([]));
}).fail(function() {
k([]);
});
};
}
f.create = function(c) {
var b = m.prototype = new c();
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
/^trnsl\./.test(this.key()) && k(this);
};
b.toLang = function(a) {
return this.mapLang(a, n.require("$40", "yandex.json"));
};
return new m();
};
return f;
}({}, v, x));
n.register("$41", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
n.register("$32", function(f, d, g) {
function m() {}
f.create = function(d) {
d = m.prototype = new d();
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
for (var h = c.length, l = -1, g; ++l < h && (g = a[l] || {}, !1 !== d(c[l], g.translatedText || "", b)); ) ;
}
var g = this;
a = a ? "html" : "text";
var h = g.mapLang(b, n.require("$41", "google.json"));
return g._call({
url: "https://translation.googleapis.com/language/translate/v2?source=en&target=" + h + "&format=" + a,
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
return new m();
};
return f;
}({}, v, x));
n.register("$42", {
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
n.register("$33", function(f, d, g) {
function m() {}
f.create = function(d) {
d = m.prototype = new d();
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
for (var h = -1, g; ++h < k && (g = a[h] || {}, g = g.translations || [], g = g[0] || {}, 
!1 !== d(c[h], g.text || "", b)); ) ;
}
var g = this, h = [], k = c.length, m = -1;
a = a ? "html" : "plain";
for (var q = g.mapLang(b, n.require("$42", "ms.json")); ++m < k; ) h.push({
text: c[m]
});
return g._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=" + q + "&textType=" + a,
method: "POST",
data: JSON.stringify(h),
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
return new m();
};
return f;
}({}, v, x));
n.register("$43", {
pt: [ "pt-PT", "pt-BR" ]
});
n.register("$34", function(f, d, g) {
function m() {}
f.create = function(d) {
d = m.prototype = new d();
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
for (var h = c.length, g = -1, l; ++g < h && (l = a[g] || {}, !1 !== d(c[g], l.text || "", b)); ) ;
}
var g = this;
a = g.mapLang(b, n.require("$43", "deepl.json"));
var h = b.tone, k = "default";
null == h && (h = String(b.variant || "").toLowerCase());
"formal" === h ? k = "more" : "informal" === h && (k = "less");
return g._call({
url: "https://api.deepl.com/v2/translate",
method: "POST",
traditional: !0,
data: {
source_lang: "EN",
target_lang: a.toUpperCase(),
formality: k,
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
return new m();
};
return f;
}({}, v, x));
n.register("$18", function(f, d, v) {
function m() {
this.inf = {};
}
function k() {
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
var c = m.prototype;
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
if (1 < g) for (var c = c.toLowerCase(), d = -1, k; ++d < g; ) if (k = f[d], k.toLowerCase().replace("-", "_") === c) return k;
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
var f = a.responseText, g = f && n.require("$5", "json.js").parse(f);
d = g && b.parseError(g) || d;
} catch (k) {}
b.stderr(d || b.httpError(a));
};
return b.abortable(g.ajax(a));
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
return (b || (b = k())).sniff(a);
};
c.createJob = function() {
return n.require("$30", "job.js").create(this);
};
c.batch = function(a, b, c, f) {
function h(c) {
for (var d = a.length, h = -1; ++h < d && !1 !== f(a[h], c[h], b); ) ;
}
var k = d.loco.ajax;
c = {
hook: this.getId(),
type: c ? "html" : "text",
locale: this.toLang(b),
sources: a
};
var m = g.Deferred();
this.abortable(k.post("apis", c, function(a) {
h(a && a.targets || []);
m.resolve();
}, function() {
h([]);
m.reject();
}));
return m.promise();
};
f.create = function(a) {
var b;
b = a.id;
b = "yandex" === b ? n.require("$31", "yandex.js").create(m) : "google" === b ? n.require("$32", "google.js").create(m) : "microsoft" === b ? n.require("$33", "ms.js").create(m) : "deepl" === b ? n.require("$34", "deepl.js").create(m) : new m();
b.init(a);
return b;
};
f.suggest = function(a, b, c, d) {
var f, g, k = a.length;
for (f = 0; f < k; f++) g = a[f], g.translate(b, c, d);
};
var b;
return f;
}({}, v, x));
n.register("$19", function(f, d, n) {
f.init = function(f) {
function k() {
H || (I.on("click", h), H = g('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && g("#ssh-keys").toggleClass("hidden", "ssh" !== g(this).val());
}));
return H;
}
function c() {
R && (b(g(s)), R = !1);
if (B && J) {
var a = J, c = g(Q);
c.find("span.loco-msg").text(a);
K || (c.removeClass("jshide").hide().fadeIn(500), K = !0);
} else K && (b(g(Q)), K = !1);
}
function b(a) {
a.slideUp(250).fadeOut(250, function() {
g(this).addClass("jshide");
});
}
function a() {
if (B) return H && H.dialog("close"), c(), g(f).find('button[type="submit"]').attr("disabled", !1), 
g(d).triggerHandler("resize"), x && x(!0), !0;
w && H ? (R || (g(s).removeClass("jshide").hide().fadeIn(500), R = !0), K && (b(g(Q)), 
K = !1)) : c();
g(f).find('input[type="submit"]').attr("disabled", !0);
x && x(!1);
return !1;
}
function e(a) {
var b, c, d = r || {};
for (b in d) d.hasOwnProperty(b) && (c = d[b], a[b] ? a[b].value = c : g('<input type="hidden" />').attr("name", b).appendTo(a).val(c));
}
function l(a) {
a.preventDefault();
a = g(a.target).serializeArray();
q(a);
C = !0;
return !1;
}
function p(a) {
a.preventDefault();
H.dialog("close");
return !1;
}
function h(a) {
a.preventDefault();
H.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function y(b) {
B = b.authed;
z = b.method;
g(s).find("span.loco-msg").text(b.message || "Something went wrong.");
J = b.warning || "";
b.notice && u.notices.info(b.notice);
if (B) "direct" !== z && (r = b.creds, e(f), C && b.success && u.notices.success(b.success)), 
a(); else if (b.reason) u.notices.info(b.reason); else if (b = b.prompt) {
var c = k();
c.html(b).find("form").on("submit", l);
c.dialog("option", "title", c.find("h2").remove().text());
c.find("button.cancel-button").show().on("click", p);
c.find('input[type="submit"]').addClass("button-primary");
a();
g(d).triggerHandler("resize");
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
var r, x, s = f, z = null, C = !1, B = !1, u = d.loco, w = f.path.value, F = f.auth.value, N = f["loco-nonce"].value, I = g(s).find("button.button-primary"), Q = n.getElementById(s.id + "-warn"), R = !1, K = !1, J = "", H;
u.notices.convert(Q).stick();
f.connection_type ? (r = {}, r.connection_type = f.connection_type.value, B = !0) : w && F && q({
path: w,
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
w = f.path.value;
F = f.auth.value;
q(g(f).serializeArray());
return this;
},
listen: function(a) {
x = a;
B && a(!0);
return this;
},
authed: function() {
return B;
}
};
};
return f;
}({}, v, x));
n.register("$20", function(f, d, v) {
function m(d, f, g, h) {
f = "n" === g ? c(f) : b(f);
h && (f = a(f));
return k([].sort, [ f ])(d);
}
function k(a, b) {
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
for (g("tr", s).remove(); ++c < d; ) s.appendChild(a[c].$);
}
function c(a) {
q = a ? x.find(a, d) : d.slice(0);
v && (a = f[v], q = m(q, v, a.type, a.desc));
b(q);
}
var d = [], f = [], k = 0, q, r, v, s = a.getElementsByTagName("tbody")[0], z = a.getElementsByTagName("thead")[0], x = n.require("$10", "fulltext.js").init();
z && s && (g("th", z).each(function(a, c) {
var e = c.getAttribute("data-sort-type");
e && (a = k, g(c).addClass("loco-sort").on("click", function(c) {
c.preventDefault();
c = a;
var e = f[c], k = e.type, n = !(e.desc = !e.desc);
q = m(q || d.slice(0), c, k, n);
b(q);
r && r.removeClass("loco-desc loco-asc");
r = g(e.$).addClass(n ? "loco-desc" : "loco-asc").removeClass(n ? "loco-asc" : "loco-desc");
v = c;
return !1;
}), f[k] = {
$: c,
type: e
});
c.hasAttribute("colspan") ? k += Number(c.getAttribute("colspan")) : k++;
}), g("tr", s).each(function(a, b) {
var c, e, g, k = [], l = {
_: a,
$: b
}, m = b.getElementsByTagName("td");
for (e in f) {
c = m[e];
(g = c.textContent.replace(/(^\s+|\s+$)/g, "")) && k.push(g);
c.hasAttribute("data-sort-value") && (g = c.getAttribute("data-sort-value"));
switch (f[e].type) {
case "n":
g = Number(g);
}
l[e] = g;
}
d[a] = l;
x.index(a, k);
}), a = g('form.loco-filter input[type="text"]', a.parentNode), a.length && (a = a[0], 
z = g(a.form), 1 < d.length ? n.require("$11", "LocoTextListener.js").listen(a, c) : z.hide(), 
z.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return f;
}({}, v, x));
var C = v.loco || {}, I = C.conf || {
$v: [ 0, 0 ]
};
v = n.require("$1", "t.js").init();
x = I.wplang;
C.version = function(f) {
return I.$v[f || 0];
};
n.require("$2", "html.js");
n.require("$3", "number.js");
n.require("$4", "array.js");
n.require("$5", "json.js");
C.l10n = v;
v.load(I.wpl10n);
x && v.pluraleq(x.pluraleq);
C.string = n.require("$6", "string.js");
C.notices = n.require("$7", "notices.js").init(v);
C.ajax = n.require("$8", "ajax.js").init(I).localise(v);
C.locale = n.require("$9", "wplocale.js");
C.fulltext = n.require("$10", "fulltext.js");
C.watchtext = n.require("$11", "LocoTextListener.js").listen;
C.tooltip = n.require("$12", "tooltip.js");
C.po = {
ed: n.require("$13", "poedit.js"),
kbd: n.require("$14", "hotkeys.js"),
init: n.require("$15", "po.js").create,
ace: n.require("$16", "ace.js").strf("php"),
ref: n.require("$17", "refs.js")
};
C.apis = n.require("$18", "apis.js");
C.fs = n.require("$19", "fsconn.js");
g("#loco-admin.wrap table.wp-list-table").each(function(f, d) {
n.require("$20", "tables.js").init(d);
});
C.validate = function(f) {
return "2.5.3" !== (/^\d+\.\d+\.\d+/.exec(f && f[0] || "") && RegExp.lastMatch) ? (C.notices.warn("admin.js is the wrong version (2.5.3). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
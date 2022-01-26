(function(y, w, k, J) {
var n = function() {
function f(d) {
throw Error("Failed to require " + d);
}
var d = {};
return {
register: function(f, m) {
d[f] = m;
},
require: function(k, m) {
return d[k] || f(m);
},
include: function(k, m, g) {
return d[k] || (g ? f(m) : null);
}
};
}();
n.register("$1", function(f, d, k) {
function m(g) {
var c = typeof g;
if ("string" === c) if (/[^ <>!=()%^&|?:n0-9]/.test(g)) console.error("Invalid plural: " + g); else return new Function("n", "return " + g);
"function" !== c && (g = function(b) {
return 1 != b;
});
return g;
}
f.init = function(g) {
function c(a, b, e) {
return (a = h[a]) && a[e] ? a[e] : b || "";
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
g = m(g);
var h = {};
return {
__: b,
_x: a,
_n: e,
_: b,
x: a,
n: e,
load: function(a) {
h = a || {};
return this;
},
pluraleq: function(a) {
g = m(a);
return this;
}
};
};
return f;
}({}, y, w));
n.register("$2", function(f, d, k) {
f.ie = function() {
var f = !1, g = 0;
d.attachEvent && d.navigator && /MSIE (\d+)\./.exec(String(navigator.appVersion)) && (g = Number(RegExp.$1), 
f = 11 > g);
return function() {
return f;
};
}();
f.init = function() {
return f;
};
return f;
}({}, y, w));
n.register("$3", function(f, d, k) {
Number.prototype.format = function(d, g, c) {
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
var h;
for (d = c.length; "0" === c.charAt(--d); ) h = d;
h && (c = c.substring(0, h));
(a = c) && (b += (g || ".") + a);
}
return b;
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
}({}, y, w));
n.register("$4", function(f, d, k) {
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
}({}, y, w));
n.register("$5", function(f, d, n) {
d.JSON || (d.JSON = {
parse: k.parseJSON,
stringify: null
});
return f = d.JSON;
}({}, y, w));
n.register("$6", function(f, d, k) {
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
}({}, y, w));
n.register("$21", function(f, d, k) {
function m(g) {
return function(c, b) {
for (var a = c[g] || 0; (c = c.offsetParent) && c !== (b || k.body); ) a += c[g] || 0;
return a;
};
}
f.top = m("offsetTop");
f.left = m("offsetLeft");
f.el = function(g, c) {
var b = k.createElement(g || "div");
c && (b.className = c);
return b;
};
f.txt = function(g) {
return k.createTextNode(g || "");
};
return f;
}({}, y, w));
n.register("$7", function(f, d, D) {
function m(a, b, e) {
function c() {
p();
v = setTimeout(b, e);
}
function p() {
v && clearTimeout(v);
v = null;
}
var v;
c();
k(a).on("mouseenter", p).on("mouseleave", c);
return {
die: function() {
p();
k(a).off("mouseenter mouseleave");
}
};
}
function g(a, b) {
a.fadeTo(b, 0, function() {
a.slideUp(b, function() {
a.remove();
k(d).triggerHandler("resize");
});
});
return a;
}
function c(a, b) {
function e(b) {
q[v] = null;
g(k(a), 250);
p && p.die();
var c;
if (c = b) b.stopPropagation(), b.preventDefault(), c = !1;
return c;
}
function c(b) {
p && p.die();
return p = m(a, e, b);
}
var p, v, h, l = k(a), B = l.find("button");
0 === B.length && (l.addClass("is-dismissible"), B = k('<button type="button" class="notice-dismiss"> </a>').appendTo(l));
B.off("click").on("click", e);
k(d).triggerHandler("resize");
A();
v = q.length;
q.push(e);
b && (p = c(b));
return {
link: function(b, v) {
var e = v || b, c = k(a).find("nav"), e = k("<nav></nav>").append(k("<a></a>").attr("href", b).text(e));
h ? (h.push(e.html()), c.html(h.join("<span> | </span>"))) : (h = [ e.html() ], 
k(a).addClass("has-nav").append(e));
return this;
},
stick: function() {
p && p.die();
p = null;
q[v] = null;
return this;
},
slow: function(a) {
c(a || 1e4);
return this;
}
};
}
function b(a, b, e) {
var c = n.require("$21", "dom.js").el;
a = k('<div class="notice notice-' + a + ' loco-notice inline"></div>').prependTo(k("#loco-notices"));
var p = k(c("p"));
e = k(c("span")).text(e);
b = k(c("strong", "has-icon")).text(b + ": ");
p.append(b).append(e).appendTo(a);
return a;
}
function a(a, e, p, h) {
a = b(p, e, a).css("opacity", "0").fadeTo(500, 1);
k(d).triggerHandler("resize");
return c(a, h);
}
function e(b) {
return a(b, s, "warning");
}
function h() {
k("#loco-notices").find("div.notice").each(function(a, b) {
if (-1 === b.className.indexOf("jshide")) {
var e = -1 === b.className.indexOf("notice-success") ? null : 5e3;
c(b, e);
}
});
}
var q = [], l = d.console || {
log: function() {}
}, A = Date.now || function() {
return new Date().getTime();
}, z, s, p, B;
f.error = function(b) {
return a(b, z, "error");
};
f.warn = e;
f.info = function(b) {
return a(b, p, "info");
};
f.success = function(b) {
return a(b, B, "success", 5e3);
};
f.warning = e;
f.log = function() {
l.log.apply(l, arguments);
};
f.debug = function() {
(l.debug || l.log).apply(l, arguments);
};
f.clear = function() {
for (var a = -1, b, e = q, c = e.length; ++a < c; ) (b = e[a]) && b.call && b();
q = [];
return f;
};
f.create = b;
f.raise = function(a) {
(f[a.type] || f.error).call(f, a.message);
};
f.convert = c;
f.init = function(a) {
z = a._("Error");
s = a._("Warning");
p = a._("Notice");
B = a._("OK");
setTimeout(h, 1e3);
return f;
};
return f;
}({}, y, w));
n.register("$8", function(f, d, D) {
function m(a) {
var b = k("<pre>" + a + "</pre>").text();
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
function h(a, b, e, c) {
function h(b, c, v) {
if ("abort" !== c) {
var p = l || {
_: function(a) {
return a;
}
}, r = b.status || 0, d = b.responseText || "", x = m(d), z = b.getResponseHeader("Content-Type") || "Unknown type", f = b.getResponseHeader("Content-Length") || d.length;
"success" === c && v ? q.error(v) : (q.error(g(x) + ".\n" + p._("Check console output for debugging information")), 
q.log("Ajax failure for " + a, {
status: r,
error: c,
message: v,
output: d
}), "parsererror" === c && (v = "Response not JSON"), q.log([ p._("Provide the following text when reporting a problem") + ":", "----", "Status " + r + ' "' + (v || p._("Unknown error")) + '" (' + z + " " + f + " bytes)", x, "====" ].join("\n")));
e && e.call && e(b, c, v);
A = b;
}
}
c.url = z;
c.dataType = "json";
var q = n.require("$7", "notices.js").clear();
A = null;
return k.ajax(c).fail(h).done(function(a, e, v) {
var c = a && a.data, l = a && a.notices, g = l && l.length, A = -1;
for (!c || a.error ? h(v, e, a && a.error && a.error.message) : b && b(c, e, v); ++A < g; ) q.raise(l[A]);
});
}
var q = {}, l, A, z = d.ajaxurl || "/wp-admin/admin-ajax.php";
f.init = function(a) {
q = a.nonces || q;
return f;
};
f.localise = function(a) {
l = a;
return f;
};
f.xhr = function() {
return A;
};
f.strip = m;
f.parse = g;
f.submit = function(a, b, e) {
function c(a, b) {
b.disabled ? b.setAttribute("data-was-disabled", "true") : b.disabled = !0;
}
function r(a, b) {
b.getAttribute("data-was-disabled") || (b.disabled = !1);
}
function q(a) {
a.find(".button-primary").removeClass("loading");
a.find("button").each(r);
a.find("input").each(r);
a.find("select").each(r);
a.find("textarea").each(r);
a.removeClass("disabled loading");
}
var l = k(a), A = l.serialize();
(function(a) {
a.find(".button-primary").addClass("loading");
a.find("button").each(c);
a.find("input").each(c);
a.find("select").each(c);
a.find("textarea").each(c);
a.addClass("disabled loading");
})(l);
return h(a.route.value, function(a, e, c) {
q(l);
b && b(a, e, c);
}, function(a, b, c) {
q(l);
e && e(a, b, c);
}, {
type: a.method,
data: A
});
};
f.post = function(l, p, A, g) {
var r = !0, G = p || {}, z = q[l] || c(l);
d.FormData && G instanceof FormData ? (r = !1, p = e) : p = Array.isArray(G) ? a : b;
p(G, "action", "loco_json");
p(G, "route", l);
p(G, "loco-nonce", z);
return h(l, A, g, {
type: "post",
data: G,
processData: r,
contentType: r ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
f.get = function(a, b, e, l) {
b = b || {};
var r = q[a] || c(a);
b.action = "loco_json";
b.route = a;
b["loco-nonce"] = r;
return h(a, e, l, {
type: "get",
data: b
});
};
f.setNonce = function(a, b) {
q[a] = b;
return f;
};
return f;
}({}, y, w));
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
n.register("$9", function(f, d, k) {
function m() {}
var g, c = n.require("$22", "rtl.json");
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
if (!(g || (g = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(b)) return null;
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
for (var b = 3, a, e, c = [ "variant", "region", "lang" ], q = []; 0 !== b--; ) if (a = c[b], 
e = this[a]) q.push(a), q.push(a + "-" + e.toLowerCase());
return q.join(" ");
};
d.isRTL = function() {
return !!c[String(this.lang).toLowerCase()];
};
d = null;
return f;
}({}, y, w));
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
n.register("$10", function(f, d, k) {
f.init = function() {
function d(a) {
return l[a] || a;
}
function g(a, b, e, c) {
b = a.split(b);
for (var h = b.length; 0 !== h--; ) (a = b[h]) && null == c[a] && (e.push(a), c[a] = !0);
return e;
}
function c(a) {
return g(String(a || "").toLowerCase().replace(h, d), q, [], {});
}
function b(a, b) {
for (var c = [], p = {}, l, x = b.length, r = q; 0 !== x--; ) (l = b[x]) && g(String(l || "").toLowerCase().replace(h, d), r, c, p);
e[a] = c;
}
function a(a, b) {
var c = [], h = -1, q = e, l = q.length, r, g, d, u, v, F, f = a.length, k = b ? !0 : !1;
a: for (;++h < l; ) if (d = q[h], null != d && (u = d.length)) {
v = 0;
b: for (;v < f; v++) {
F = a[v];
for (r = 0; r < u; r++) if (g = d[r], 0 === g.indexOf(F)) continue b;
continue a;
}
c.push(k ? b[h] : h);
}
return c;
}
var e = [], h = /[^a-z0-9]/g, q = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/, l = n.require("$23", "flatten.json");
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
}({}, y, w));
n.register("$11", function(f, d, n) {
f.listen = function(f, g) {
function c() {
p[h ? "show" : "hide"]();
}
function b(a) {
s && A.setAttribute("size", 2 + a.length);
h = a;
c();
return a;
}
function a() {
q = null;
g(h);
}
function e(e) {
var c = A.value;
z && c === z && (c = "");
c !== h ? (q && clearTimeout(q), b(c), e ? q = setTimeout(a, e) : a()) : q && null == e && (clearTimeout(q), 
a());
}
var h, q, l = 150, A = f instanceof jQuery ? f[0] : f, z = d.attachEvent && A.getAttribute("placeholder"), s = 1 === Number(A.size), p = k('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
A.value = "";
e();
return !1;
});
b(A.value);
k(A).on("input", function() {
e(l);
return !0;
}).on("blur focus change", function() {
e(null);
return !0;
}).after(p);
c();
return {
delay: function(a) {
l = a;
return this;
},
ping: function(c) {
c ? (q && clearTimeout(q), c = A.value, z && c === z && (c = ""), b(c), a(), c = void 0) : c = e();
return c;
},
val: function(a) {
if (null == a) return h;
q && clearTimeout(q);
A.value = b(a);
c();
},
el: function() {
return A;
},
blur: function(a) {
return k(A).on("blur", a);
},
destroy: function() {
q && clearTimeout(q);
}
};
};
return f;
}({}, y, w));
n.register("$12", function(f, d, n) {
function m(b, a) {
this.$element = k(b);
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
a && (e = k.extend({}, e, a));
b.tipsy(e);
};
f.delays = function(b, a) {
g = b || 150;
c = a || 100;
};
f.kill = function() {
k("div.tipsy").remove();
};
f.text = function(b, a) {
a.data("tipsy").setTitle(b);
};
var g, c;
f.delays();
k(n.body).on("overlayOpened overlayClosing", function(b) {
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
var b = (b = this.options.anchor) ? this.$element.find(b) : this.$element, b = k.extend({}, b.offset(), {
width: b[0].offsetWidth,
height: b[0].offsetHeight
}), e = a[0].offsetWidth, c = a[0].offsetHeight, q = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, l;
switch (q.charAt(0)) {
case "n":
l = {
top: b.top + b.height + this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "s":
l = {
top: b.top - c - this.options.offset,
left: b.left + b.width / 2 - e / 2
};
break;

case "e":
l = {
top: b.top + b.height / 2 - c / 2,
left: b.left - e - this.options.offset
};
break;

case "w":
l = {
top: b.top + b.height / 2 - c / 2,
left: b.left + b.width + this.options.offset
};
}
2 == q.length && ("w" == q.charAt(1) ? l.left = b.left + b.width / 2 - 15 : l.left = b.left + b.width / 2 - e + 15);
a.css(l).addClass("tipsy-" + q);
a.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + q.charAt(0);
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
this.$tip || (this.$tip = k('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), 
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
k.fn.tipsy = function(b) {
function a(a) {
var e = k.data(a, "tipsy");
e || (e = new m(a, k.fn.tipsy.elementOptions(a, b)), k.data(a, "tipsy", e));
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
var e = a(this), h = b.delayOut;
e.hoverState = "out";
0 == h ? e.hide() : (e.tip().removeClass("in"), setTimeout(function() {
"out" == e.hoverState && e.hide();
}, h));
}
b = k.extend({}, k.fn.tipsy.defaults, b);
b.live || this.each(function() {
a(this);
});
if ("manual" != b.trigger) {
var q = b.live ? "live" : "bind", l = "hover" == b.trigger ? "mouseleave" : "blur";
this[q]("hover" == b.trigger ? "mouseenter" : "focus", e)[q](l, c);
}
return this;
};
k.fn.tipsy.defaults = {
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
k.fn.tipsy.elementOptions = function(b, a) {
return k.metadata ? k.extend({}, a, k(b).metadata()) : a;
};
k.fn.tipsy.autoNS = function() {
return k(this).offset().top > k(n).scrollTop() + k(d).height() / 2 ? "s" : "n";
};
k.fn.tipsy.autoWE = function() {
return k(this).offset().left > k(n).scrollLeft() + k(d).width() / 2 ? "e" : "w";
};
k.fn.tipsy.autoBounds = function(b, a) {
return function() {
var e = a[0], c = 1 < a.length ? a[1] : !1, q = k(n).scrollTop() + b, l = k(n).scrollLeft() + b, g = k(this);
g.offset().top < q && (e = "n");
g.offset().left < l && (c = "w");
k(d).width() + k(n).scrollLeft() - g.offset().left < b && (c = "e");
k(d).height() + k(n).scrollTop() - g.offset().top < b && (e = "s");
return e + (c ? c : "");
};
};
return f;
}({}, y, w));
n.register("$36", function(f, d, k) {
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
h = location.hostname;
d = null;
}
function g(a) {
return "&#" + a.charCodeAt(0) + ";";
}
function c(a, b) {
return '<a href="' + a + '" target="' + (b.indexOf(h) ? "_blank" : "_top") + '">' + b + "</a>";
}
var b, a, e, h;
return function(h, l) {
d && d();
var A = h.replace(b, g);
l && (A = A.replace(e, c).replace(a, "<br />"));
return A;
};
}();
return f;
}({}, y, w));
n.register("$37", function(f, d, k) {
function m() {}
var g, c, b = n.require("$22", "rtl.json");
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
g || (c = /[-_+]/, g = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(c).join("-");
if (!g.exec(a)) return null;
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
for (var a = 4, b, c, q = [ "variant", "region", "script", "lang" ], l = []; 0 !== a--; ) if (b = q[a], 
c = this[b]) c.join && (c = c.join("-")), 1 === a && 3 === c.length ? l.push("region-m49") : l = l.concat([ b, b + "-" + c.toLowerCase() ]);
return l.join(" ");
};
d.isRTL = function() {
return !!b[String(this.script || this.lang).toLowerCase()];
};
d = null;
return f;
}({}, y, w));
n.register("$38", function(f, d, k) {
function m(a) {
d.console && console.error && console.error(a);
}
function g() {
m("Method not implemented");
}
function c() {}
function b(a) {}
c.prototype.toString = function() {
return "[Undefined]";
};
b.prototype._validate = function(a) {
var b, h, q = !0;
for (b in this) h = this[b], h === g ? (m(a + "." + b + "() must be implemented"), 
q = !1) : h instanceof c && (m(a + "." + b + " must be defined"), q = !1);
return q;
};
f.init = function(a, e) {
var h, q = new b();
if (a) for (h = a.length; 0 !== h--; ) q[a[h]] = g;
if (e) for (h = e.length; 0 !== h--; ) q[e[h]] = new c();
return q;
};
f.validate = function(a) {
var b = /function (\w+)\(/.exec(a.toString()) ? RegExp.$1 : "";
a.prototype._validate(b || "Object");
};
return f;
}({}, y, w));
n.register("$50", function(f, d, k) {
var m = d.requestAnimationFrame, g = d.cancelAnimationFrame, c = 0;
if (!m || !g) for (var b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (m = d[b + "RequestAnimationFrame"]) if (g = d[b + "CancelAnimationFrame"] || d[b + "CancelRequestAnimationFrame"]) break;
m && g || (m = function(b) {
var h = a();
timeToCall = Math.max(0, 16 - (h - c));
nextTime = h + timeToCall;
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
d = m(c, b);
a(l++);
}
var l = 0, d;
c();
return {
stop: function() {
d && g(d);
d = null;
}
};
};
return f;
}({}, y, w));
n.register("$47", function(f, d, k) {
function m(a, c, e, p) {
if (b) {
var l = e;
e = function(a) {
if ((a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType) return l(a);
};
}
a.addEventListener(c, e, p);
return {
unbind: function() {
a.removeEventListener(c, e, p);
}
};
}
function g(a) {
a.preventDefault();
a.stopPropagation();
return !1;
}
var c, b = !!d.navigator.msPointerEnabled, a = b ? "MSPointerDown" : "touchstart", e = b ? "MSPointerMove" : "touchmove", h = b ? "MSPointerUp" : "touchend";
f.ok = function(a) {
null == c && (c = "function" === typeof k.body.addEventListener);
c && a && a(f);
return c;
};
f.ms = function() {
return b;
};
f.dragger = function(b, c) {
function l(a) {
b.addEventListener(a, d[a], !1);
}
function p(a) {
b.removeEventListener(a, d[a], !1);
}
var d = {};
d[a] = function(b) {
q(b, function(e, p) {
p.type = a;
c(b, p, f);
});
l(e);
l(h);
return !0;
};
d[h] = function(a) {
p(e);
p(h);
q(a, function(b, e) {
e.type = h;
c(a, e, f);
});
return !0;
};
d[e] = function(a) {
q(a, function(b, p) {
p.type = e;
c(a, p, f);
});
return g(a);
};
l(a);
var f = {
kill: function() {
p(a);
p(e);
p(h);
b = f = c = null;
}
};
return f;
};
f.swiper = function(c, d, f) {
function p(a) {
c.addEventListener(a, u[a], !1);
}
function B(a) {
c.removeEventListener(a, u[a], !1);
}
function x() {
r && r.stop();
r = null;
}
var r, G, E, u = {}, v = [], F = [], k = [];
u[a] = function(a) {
G = !1;
x();
var b = l();
q(a, function(a, c) {
v[a] = b;
F[a] = c.clientX;
k[a] = c.clientY;
});
E = c.scrollLeft;
return !0;
};
u[h] = function(a) {
q(a, function(a, b) {
var c = l() - v[a], e = F[a] - b.clientX, c = Math.abs(e) / c;
d(c, e ? 0 > e ? -1 : 1 : 0);
});
E = null;
return !0;
};
u[e] = function(a) {
var b, e;
null == E || q(a, function(a, c) {
b = F[a] - c.clientX;
e = k[a] - c.clientY;
});
if (e && Math.abs(e) > Math.abs(b)) return G = !0;
b && (G = !0, c.scrollLeft = Math.max(0, E + b));
return g(a);
};
if (!b || f) p(a), p(e), p(h), b && (c.className += " mstouch");
return {
kill: function() {
B(a);
B(e);
B(h);
x();
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
x();
var v = c.scrollLeft, p = a > v ? 1 : -1, l = Math[1 === p ? "min" : "max"], h = Math.round(16 * b * p);
return r = n.require("$50", "fps.js").loop(function(b) {
b && (v = Math.max(0, l(a, v + h)), c.scrollLeft = v, a === v && (x(), e && e(v)));
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
return m(a, h, b, !1);
};
var q = f.each = function(a, c) {
if (b) (a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType && c(0, a); else for (var e = -1, p = (a.originalEvent || a).changedTouches || []; ++e < p.length; ) c(e, p[e]);
}, l = Date.now || function() {
return new Date().getTime();
};
return f;
}({}, y, w));
n.register("$51", function(f, d, n) {
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
var a = d.parentNode, e = a.insertBefore(n.createElement("div"), d);
k(d).on("input", c).on("scroll", g);
k(a).addClass("has-mirror");
e.className = "ta-mirror";
var h = d.offsetWidth - d.clientWidth;
2 < h && (e.style.marginRight = String(h - 2) + "px");
c();
g();
return {
kill: function() {
k(d).off("input", c).off("scroll", g);
a.removeChild(e);
e = null;
k(a).removeClass("has-mirror");
}
};
};
return f;
}({}, y, w));
n.register("$29", function(f, d, k) {
function m(b, a) {
for (var c = 0, h = -1, q = a && d[a], l = g[b] || [], f = l.length; ++h < f; ) callback = l[h], 
"function" === typeof callback && (callback(q), c++);
return c;
}
var g = {}, c;
f.load = function(b, a, c) {
function h() {
f && (clearTimeout(f), f = null);
z && (z.onreadystatechange = null, z = z = z.onload = null);
b && (delete g[b], b = null);
}
function q(a, p) {
var l = z && z.readyState;
if (p || !l || "loaded" === l || "complete" === l) p || m(b, c), h();
}
function l() {
if (0 === m(b)) throw Error('Failed to load "' + (c || b) + '"');
h();
}
if (c && d[c]) "function" === typeof a && a(d[c]); else if (null != g[b]) g[b].push(a); else {
g[b] = [ a ];
var f = setTimeout(l, 4e3), z = k.createElement("script");
z.setAttribute("src", b);
z.setAttribute("async", "true");
z.onreadystatechange = q;
z.onload = q;
z.onerror = l;
z.onabort = h;
k.getElementsByTagName("head")[0].appendChild(z);
}
};
f.stat = function(b) {
var a;
if (!(a = c)) {
for (var e, h, d = k.getElementsByTagName("script"), l = -1, g = d.length; ++l < g; ) if (a = d[l].getAttribute("src")) if (e = a.indexOf("/lib/vendor"), 
-1 !== e) {
h = a.substr(0, e);
break;
}
a = c = h || "/static";
}
return a + b;
};
return f;
}({}, y, w));
n.register("$16", function(f, d, D) {
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
this.HighlightRules = h;
}
var h = a(c), p = b.require, d = p("ace/lib/oop");
d.inherits(h, p("ace/mode/text_highlight_rules").TextHighlightRules);
d.inherits(e, p("ace/mode/text").Mode);
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
return /%(?:\([_A-Za-z][_A-Za-z0-9]*\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;

case "javascript":
return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;

case "auto":
return /%(?:\d+\$|\([_A-Za-z][_A-Za-z0-9]*\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;

case q:
return h || "%%";
}
}
var h, q = "auto";
f.init = function(a, e, h) {
var f, p = !1, B = h || q, x = a.parentNode, r = x.appendChild(D.createElement("div"));
k(x).addClass("has-proxy has-ace");
n.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(h) {
if (r) {
if (!h) throw Error("Failed to load code editor");
f = h.edit(r);
var d = f.session, q = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(p);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
d.setUseSoftTabs(!1);
q.setShowGutter(!0);
q.setPadding(10);
q.setScrollMargin(8);
d.setMode(b(h, B));
f.setValue(a.value, -1);
d.setUseWrapMode(!0);
e ? m(f, e) : c(f);
}
}, "ace");
return {
kill: function() {
f && (g(f), f.destroy(), f = null);
r && (x.removeChild(r), k(x).removeClass("has-proxy has-ace"), r = null);
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
p !== a && (p = a, f && f.setShowInvisibles(a));
return this;
},
strf: function(a) {
a = a || q;
a !== B && (B = a, f && f.session.setMode(b(d.ace, a)));
return this;
},
focus: function() {
return this;
}
};
};
f.strf = function(a, b) {
q = a;
h = b;
return f;
};
return f;
}({}, y, w));
n.register("$52", function(f, d, D) {
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
var b = n.require("$29", "remote.js");
b.load(b.stat("/lib/tinymce.min.js"), a, "tinymce");
return f;
};
f.init = function(a, e) {
function h(a) {
z = a;
s = "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4);
return a.replace(/(<\/?)script/gi, "$1loco:script");
}
function d(a) {
l = a;
a._getContent = a.getContent;
a.getContent = function(a) {
a = this._getContent(a);
a = a.replace(/(<\/?)loco:script/gi, "$1script");
if (!s && "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4)) {
var b = a.substr(3, a.length - 7);
if (b === z || -1 === b.indexOf("</p>")) a = b;
}
return a;
};
a._setContent = a.setContent;
a.setContent = function(a, b) {
return this._setContent(h(a), b);
};
e ? (m(a, e), e.reset()) : c(a);
k(x).removeClass("loading");
}
var l, A = !1, z = "", s = !1, p = a.parentNode, B = p.parentNode, x = p.appendChild(D.createElement("div")), r = B.insertBefore(D.createElement("nav"), p);
r.id = "_tb" + String(++b);
k(p).addClass("has-proxy has-mce");
k(x).addClass("mce-content-body loading").html(h(a.value));
f.load(function(a) {
if (!a) throw Error("Failed to load HTML editor");
x && a.init({
inline: !0,
target: x,
hidden_input: !1,
theme: "modern",
skin: !1,
plugins: "link lists",
browser_spellcheck: !0,
menubar: !1,
fixed_toolbar_container: "#" + r.id,
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
init_instance_callback: d
});
});
return {
val: function(b) {
b = h(b);
null == l ? (a.value = b, k(x).html(b)) : l.getContent() !== b && l.setContent(b);
e && e.val(b);
return this;
},
kill: function() {
l && (e && e.val(l.getContent()), g(l), l.destroy(), l = null);
x && (p.removeChild(x), k(p).removeClass("has-proxy has-mce"), x = null);
r && (B.removeChild(r), r = null);
return this;
},
enable: function(a) {
e = a;
l && m(l, a);
return this;
},
disable: function() {
l && c(l);
e = null;
return this;
},
focus: function() {
l && e && l.focus();
return this;
},
invs: function(a) {
a = a || !1;
A !== a && (A = a, k(p)[a ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return f;
}({}, y, w));
n.register("$48", function(f, d, D) {
function m(b) {
function a() {
g && (f.off("input", e), g = !1);
}
function e() {
var a = b.value;
a !== p && (f.trigger("changing", [ a, p ]), p = a);
}
function h() {
e();
g && B !== p && f.trigger("changed", [ p ]);
}
function d() {
c = b;
B = p;
g || (f.on("input", e), g = !0);
f.trigger("editFocus");
s.addClass("has-focus");
return !0;
}
function l() {
c === b && (c = null);
f.trigger("editBlur");
s.removeClass("has-focus");
g && (h(), a());
return !0;
}
var g = !1, f = k(b), s = k(b.parentNode), p = b.value, B;
f.on("blur", l).on("focus", d);
return {
val: function(a) {
p !== a && (b.value = a, f.triggerHandler("input"), p = a);
return !0;
},
kill: function() {
a();
f.off("blur", l).off("focus", d);
},
fire: function() {
p = null;
e();
},
ping: h,
blur: l,
focus: d,
reset: function() {
B = p = b.value;
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
c || a.value === b || (a.value = b, k(a).triggerHandler("input"));
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
b ? b.focus() : k(this.e).focus();
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
if (a || c !== b) this._i && (this._i.kill(), delete this._i), (c = this.p) ? c.invs && c.invs(b) : b && (this._i = n.require("$51", "mirror.js").init(this.e)), 
this.i = b;
return this;
};
TextAreaPrototype.getInvs = function() {
return this.i || !1;
};
TextAreaPrototype.setMode = function(b) {
var a = this.p, e = this.i || !1;
b !== (this.m || "") && (this.m = b, a && a.kill(), this.p = a = "code" === b ? n.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === b ? n.require("$52", "mce.js").init(this.e, this.l) : null, 
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
}({}, y, w));
n.register("$49", function(f, d, n) {
function m(a) {
var b = d.console;
b && b.error && b.error(a);
}
function g(a) {
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
function h(a, b, c) {
function e(a) {
m("row[" + a + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(d) {
var h = b || 0, g = c ? -1 : 1, v = a.rows || [];
d.sort(function(a, b) {
return g * (v[a] || e(a)).cellVal(h).localeCompare((v[b] || e(b)).cellVal(h));
});
};
}
function q(a) {
this.w = a;
}
function l(a) {
this.t = a;
this.length = 0;
}
function A(a, b, c) {
var e = n.createElement("div");
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
return new q(a);
};
var s = q.prototype;
s.init = function(d) {
var h = this.w, l = h.id, q = h.splity(l + "-thead", l + "-tbody"), f = q[0], q = q[1], E = [], u = [], v = [], F = [];
if (d) this.ds = d, this.idxs = u, this._idxs = null; else if (!(d = this.ds)) throw Error("No datasource");
f.css.push("wg-thead");
q.css.push("wg-tbody");
d.eachCol(function(a, b, c) {
v[a] = l + "-col-" + b;
F[a] = c || b;
});
for (var N = g(), s = -1, z = v.length, m = g("wg-cols"), n = f.splitx.apply(f, v); ++s < z; ) n[s].header(F[s]), 
m.appendChild(N.cloneNode(!1)).setAttribute("for", v[s]);
d.eachRow(function(a, b, c) {
E[a] = new A(a, b, c);
u[a] = a;
});
this.rows = E;
this.cols = m;
this.ww = null;
this.root = N = q.body;
this.head = f;
f.redraw = c(this);
f = q.fixed = n[0].bodyY() || 20;
h.lock().resize(f, q);
h.css.push("is-table");
h.restyle();
this.sc ? this._re_sort(z) : d.sort && d.sort(u);
this.redrawDirty();
this.render();
k(N).attr("tabindex", "-1").on("keydown", e(this)).on("mousedown", b(this)).on("scroll", a(this));
return this;
};
s.clear = function() {
for (var a = this.pages || [], b = a.length; 0 !== b--; ) a[b].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
s.render = function() {
for (var a, b, c = [], e = this.rows || [], d = -1, h, g = this.idxs, v = g.length, q = this.idxr = {}, l = this.r, f = this._r, k = this.root, A = this.cols; ++d < v; ) {
0 === d % 100 && (a = A.cloneNode(!0), b = new z(a), b.h = 2200, b.insert(k), c.push(b));
h = g[d];
q[h] = d;
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
null == l ? null != f && (a = e[f]) && a.page && (delete this._r, this.select(f, !0)) : (a = e[l]) && a.page ? this.select(l, !0) : (this.deselect(), 
this._r = l);
return this;
};
s.resize = function() {
var a = -1, b = this.ww || (this.ww = []), c = this.w, e = c.cells[0], d = e.body.childNodes, h = d.length, g = this.pages || [], v = g.length;
for (c.redraw.call(e); ++a < h; ) b[a] = d[a].style.width;
if (v) {
c = this.mx;
for (a = this.mn; a <= c; a++) g[a].widths(b);
this.redrawDirty() && this.redraw();
}
};
s.redrawDirty = function() {
var a = !1, b = this.root, c = b.scrollTop, b = b.clientHeight;
this.sy !== c && (a = !0, this.sy = c);
this.vh !== b && (a = !0, this.vh = b);
return a;
};
s.redraw = function() {
for (var a = 0, b = -1, c = null, e = null, d = this.ww, h = this.sy, g = this.vh, v = this.mn, l = this.mx, q = Math.max(0, h - 100), h = g + h + 100, f = this.pages || [], k = f.length; ++b < k && !(a > h); ) g = f[b], 
a += g.height(), a < q || (null === c && (c = b), e = b, g.rendered || g.render(d));
if (v !== c) {
if (null !== v && c > v) for (b = v; b < c; b++) {
g = f[b];
if (!g) throw Error("Shit!");
g.rendered && g.sleep();
}
this.mn = c;
}
if (l !== e) {
if (null !== l && e < l) for (b = l; b > e; b--) g = f[b], g.rendered && g.sleep();
this.mx = e;
}
};
s.selected = function() {
return this.r;
};
s.thead = function() {
return this.w.cells[0];
};
s.tbody = function() {
return this.w.cells[1];
};
s.tr = function(a) {
return (a = this.row(a)) ? a.cells() : [];
};
s.row = function(a) {
return this.rows[a];
};
s.td = function(a, b) {
return this.tr(a)[b];
};
s.next = function(a, b, c) {
null == c && (c = this.r || 0);
var e = this.idxs, d = e.length, h = (this.idxr || {})[c];
for (c = h; c !== (h += a) && !(0 <= h && d > h); ) if (b && d) h = 1 === a ? -1 : d, 
b = !1; else return null;
c = e[h];
return null == c || null == this.rows[c] ? (m("Bad next: [" + h + "] does not map to data row"), 
null) : c;
};
s.selectNext = function(a, b, c) {
a = this.next(a, b);
null != a && this.r !== a && this.select(a, c);
return this;
};
s.deselect = function(a) {
var b = this.r;
null != b && (this.r = null, k(this.tr(b)).removeClass("selected"), this.w.fire("wgRowDeselect", [ b, a ]));
return this;
};
s.selectRow = function(a, b) {
return this.select(this.idxs[a]);
};
s.select = function(a, b) {
var c = this.rows[a], e = c && c.page;
if (!e) return this.deselect(!1), m("Row is filtered out"), this;
this.deselect(!0);
var d, h = this.w.cells[1];
e.rendered || (d = e.top(), h.scrollY(d), this.redrawDirty() && this.redraw());
if (!c.rendered) return e.rendered || m("Failed to render page"), m("Row [" + c.i + "] not rendered"), 
this;
e = c.cells();
k(e).addClass("selected");
this.r = a;
b || (d = h.scrollY(), k(this.root).focus(), d !== h.scrollY() && h.scrollY(d));
h.scrollTo(e[0], !0);
this.w.fire("wgRowSelect", [ a, c.data() ]);
return this;
};
s.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
s.filter = function(a) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(a);
return this.clear().render();
};
s.each = function(a) {
for (var b, c = -1, e = this.rows || [], d = this.idxs || [], h = d.length; ++c < h; ) b = d[c], 
a(e[b], c, b);
return this;
};
s.sortable = function(a) {
var b = this.sc || (this.sc = new l(this));
b.has(a) || b.add(a);
return this;
};
s._re_sort = function(a) {
var b = -1, c = this.sc, e = c.active;
for (this.sc = c = new l(this); ++b < a; ) c.add(b);
e && (b = this.head.indexOf(e.id), -1 === b && (b = Math.min(e.idx, a - 1)), this.sort(b, e.desc));
return this;
};
s._sort = function(a, b) {
b ? (this.s = b, b(a)) : (b = this.s) && b(a);
return a;
};
s.sort = function(a, b) {
this._sort(this.idxs, h(this, a, b));
this.sc.activate(a, b);
return this;
};
s = null;
s = l.prototype;
s.has = function(a) {
return null != this[a];
};
s.add = function(a) {
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
s.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
s.activate = function(a, b) {
var c, e;
c = this.active;
var d = this[a], h = this.t.head.cells;
c && (e = h[c.idx]) && (e.removeClass(c.css), c !== d && e.restyle());
(e = h[a]) ? (d.desc = b, this.active = d, c = "wg-" + (b ? "desc" : "asc"), e.addClass(c).restyle(), 
d.css = c) : this.active = null;
return this;
};
s = null;
s = A.prototype;
s.render = function(a) {
var b, c = [], e = this._, d = this.length;
if (e) {
for (this.c = c; 0 !== d--; ) b = e.cloneNode(!1), c[d] = this.update(d, b), b.$index = this.i, 
a[d].appendChild(b);
this._ = null;
} else for (c = this.c; 0 !== d--; ) a[d].appendChild(c[d]);
this.rendered = !0;
return this;
};
s.update = function(a, b) {
var c = b || this.c[a] || {}, e = (this.d[a] || function() {})() || " ";
null == e.innerHTML ? c.textContent = e : c.innerHTML = e.innerHTML;
return c;
};
s.cells = function() {
return this.c || [ this._ ];
};
s.data = function() {
for (var a = -1, b = [], c = this.length; ++a < c; ) b[a] = this.cellVal(a);
return b;
};
s.destroy = function() {
this.page = null;
this.rendered = !1;
};
s.cellVal = function(a) {
a = this.d[a]() || "";
return String(a.textContent || a);
};
s = null;
s = z.prototype;
s.size = function() {
return this.rows.length;
};
s.insert = function(a) {
var b = this.h, c = g("wg-dead");
c.style.height = String(b) + "px";
a.appendChild(c);
return this.dead = c;
};
s.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
s.height = function() {
var a = this.h;
null == a && (this.h = a = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
a || m("row has zero height");
return a;
};
s.render = function(a) {
for (var b, c = -1, e = this.rows, d = e.length, h = this.dead, g = this.live, v = g.childNodes; ++c < d; ) b = e[c], 
b.rendered || b.render(v);
d = a.length;
for (c = 0; c < d; c++) v[c].style.width = a[c];
h.parentNode.replaceChild(g, h);
this.rendered = !0;
this.h = null;
return this;
};
s.sleep = function() {
var a = this.height(), b = this.live, c = this.dead;
c.style.height = String(a) + "px";
b.parentNode.replaceChild(c, b);
this.rendered = !1;
this.h = a;
return this;
};
s.sleepH = function(a) {
a *= this.rows.length;
var b = this.dead;
b && (b.style.height = String(a) + "px");
this.rendered || (this.h = a);
return this;
};
s.widths = function(a) {
for (var b = this.live.childNodes, c = a.length; 0 !== c--; ) b[c].style.width = a[c];
return this;
};
s.destroy = function() {
var a = this.rendered ? this.live : this.dead, b = this.rows, c = b.length;
for (a.parentNode.removeChild(a); 0 !== c--; ) b[c].destroy();
};
s = null;
return f;
}({}, y, w));
n.register("$39", function(f, d, D) {
function m(a, b) {
var c = a.id, e = c && p[c], d = e && e.parent();
if (!e || !d) return null;
var h = d.dir === s, c = h ? "X" : "Y", g = "page" + c, h = h ? z : A, l = h(d.el), c = b["offset" + c], q = d.el, f = q.className;
null == c && (c = b[g] - h(a));
c && (l += c);
q.className = f + " is-resizing";
return {
done: function() {
q.className = f;
},
move: function(a) {
d.resize(a[g] - l, e);
return !0;
}
};
}
function g(a, c) {
function e() {
k(D).off("mousemove", d);
x && (x.done(), x = null);
return !0;
}
function d(a) {
x ? x.move(a) : e();
return !0;
}
if (x) return !0;
x = m(a.target, a);
if (!x) return !0;
k(D).one("mouseup", e).on("mousemove", d);
return b(a);
}
function c(a, b) {
var c = b.type;
"touchmove" === c ? x && x.move(b) : "touchstart" === c ? x = m(a.target, b) : "touchend" === c && x && (x.done(), 
x = null);
}
function b(a) {
a.stopPropagation();
a.preventDefault();
return !1;
}
function a(a) {
var b = B;
b && b.redraw();
a && a.redraw();
return B = a;
}
function e(b, c) {
var e = k(c).on("editFocus", function() {
e.trigger("wgFocus", [ a(b) ]);
}).on("editBlur", function() {
e.trigger("wgBlur", [ a(null) ]);
});
}
function h(a) {
var b = a.id, c = a.className;
this.id = b;
this.el = a;
this.pos = this.index = 0;
this.css = [ c || "wg-root", "wg-cell" ];
this._cn = c;
p[b] = this;
this.clear();
}
var q = n.include("$46", "html.js") || n.include("$2", "html.js", !0), l = n.require("$21", "dom.js"), A = l.top, z = l.left, s = 1, p = {}, B, x = !1;
f.init = function(a) {
var b = new h(a);
b.redraw();
n.require("$47", "touch.js").ok(function(b) {
b.dragger(a, c);
});
k(a).on("mousedown", g);
return b;
};
d = h.prototype;
d.fire = function(a, b) {
var c = k.Event(a);
c.cell = this;
k(this.el).trigger(c, b);
return this;
};
d.each = function(a) {
for (var b = -1, c = this.cells, e = c.length; ++b < e; ) a(c[b], b);
return this;
};
d.indexOf = function(a) {
return (a = p[a.id || String(a)]) && a.pid === this.id ? a.index : -1;
};
d.on = function() {
return this.$("on", arguments);
};
d.off = function() {
return this.$("off", arguments);
};
d.find = function(a) {
return k(this.el).find(a);
};
d.$ = function(a, b) {
k.fn[a].apply(k(this.el), b);
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
return this.pid && p[this.pid];
};
d.splitx = function() {
return this._split(s, arguments);
};
d.splity = function() {
return this._split(2, arguments);
};
d._split = function(a, b) {
(this.length || this.field) && this.clear();
for (var c = -1, e, d = b.length, g = 1 / d, q = 0; ++c < d; ) {
e = l.el();
this.body.appendChild(e);
for (var f = e, k = b[c], A = k, s = 1; p[k]; ) k = A + "-" + ++s;
f.id = k;
e = new h(e);
e.index = c;
e.pid = this.id;
e._locale(this.lang, this.rtl);
e.pos = q;
q += g;
this.cells.push(e);
this.length++;
}
this.dir = a;
this.redraw();
return this.cells;
};
d.destroy = function() {
this.clear();
delete p[this.id];
var a = this.el;
a.innerHTML = "";
this.body = null;
a.className = this._cn || "";
k(a).off();
return this;
};
d.exists = function() {
return this === p[this.id];
};
d.clear = function() {
for (var a = this.el, b = this.cells, c = this.field, e = this.body, d = this.nav, h = this.length || 0; 0 !== h--; ) delete p[b[h].destroy().id];
this.cells = [];
this.length = 0;
d && (a.removeChild(d), this.nav = null);
e && (c && (q.ie() && k(e).triggerHandler("blur"), c.destroy(), this.field = null), 
this.table && (this.table = null), a === e.parentNode && a.removeChild(e));
this.body = a.appendChild(l.el("", "wg-body"));
this._h = null;
return this;
};
d.resize = function(a, b) {
if (!b && (b = this.cells[1], !b)) return;
var c = b.index, e = this.cells, d = k(this.el)[this.dir === s ? "width" : "height"](), h = e[c + 1], c = e[c - 1];
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
var d, h = b.clientWidth || 0, g = b.clientHeight || 0, q = c.offsetTop || 0, g = q > g ? 0 : g - q;
this._h !== g && (this._h = g, c.style.height = String(g) + "px", d = e);
this._w !== h && (this._w = h, d = e);
d && d.redraw();
}
c = this.length;
h = 1;
g = this.nav;
for (q = 2 === this.dir ? "height" : "width"; 0 !== c--; ) e = this.cells[c], g ? d = 1 : (e.fixed && (e.pos = e.fixed / k(b)[q]()), 
d = h - e.pos, h = e.pos), e.el.style[q] = String(100 * d) + "%", e.redraw(a);
return this;
};
d.contents = function(a, b) {
var c = this.el, e = this.body;
if (null == a) return e.innerHTML;
this.length ? this.clear() : e && (c.removeChild(e), e = null);
e || (this.body = e = c.appendChild(l.el("", b || "wg-content")), this._h = null, 
(c = this.lang) && this._locale(c, this.rtl, !0));
"string" === typeof a ? k(e)._html(a) : a && this.append(a);
this.redraw();
return this;
};
d.textarea = function(a, b) {
var c = this.field;
if (c) {
var d = c.editable();
c.reload(a, b);
d !== b && this.restyle();
} else this.length && this.clear(), d = l.el("textarea"), d.setAttribute("wrap", "virtual"), 
d.value = a, this.contents(d), c = n.require("$48", "field.js")._new(d)[b ? "enable" : "disable"](), 
e(this, d), this.field = c, this.restyle();
this.lang || this.locale("en");
return c;
};
d.locale = function(a) {
a = n.require("$37", "locale.js").cast(a);
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
a && (a.nodeType ? q.init(this.body.appendChild(a)) : q.init(k(a).appendTo(this.body)));
return this;
};
d.prepend = function(a) {
var b = this.body;
if (a.nodeType) {
var c = b.firstChild;
q.init(c ? b.insertBefore(a, c) : b.appendChild(a));
} else q.init(k(a).prependTo(b));
return this;
};
d.before = function(a) {
var b = this.body;
a.nodeType ? q.init(this.el.insertBefore(a, b)) : q.init(k(a).insertBefore(b));
return this;
};
d.header = function(a, b) {
if (null == a && null == b) return this.el.getElementsByTagName("header")[0];
this.t = l.txt(a || "");
this.el.insertBefore(l.el("header", b), this.body).appendChild(this.t);
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
return A(this.body, this.el);
};
d.scrollY = function(a) {
if (J === a) return this.body.scrollTop;
this.body.scrollTop = a;
};
d.tabulate = function(a) {
var b = this.table;
b ? b.clear() : b = n.require("$49", "wgtable.js").create(this);
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
var d = A(a, e);
if (c > d) c = d; else {
var h = e.clientHeight, d = d + k(a).outerHeight();
if (h + c < d) c = d - h; else return;
}
b ? e.scrollTop = c : k(e).stop(!0).animate({
scrollTop: c
}, 250);
};
d.navigize = function(a, c) {
function e(a) {
var b = h[a], c = f[a], d = k(b.el).show();
c.addClass("active");
q = a;
p.data("idx", a);
b.fire("wgTabSelect", [ a ]);
return d;
}
var d = this, h = d.cells, g = d.nav, q, f = [];
g && d.el.removeChild(g);
var g = d.nav = d.el.insertBefore(l.el("nav", "wg-tabs"), d.body), p = k(g).on("click", function(a) {
var c = k(a.target).data("idx");
if (null == c) return !0;
if (null != q) {
var g = f[q];
k(h[q].el).hide();
g.removeClass("active");
}
e(c);
d.redraw();
return b(a);
});
null == c && (c = p.data("idx") || 0);
d.each(function(b, c) {
f[c] = k('<a href="#' + b.id + '"></a>').data("idx", c).text(a[c]).appendTo(p);
b.pos = 0;
k(b.el).hide();
});
e(h[c] ? c : 0);
d.lock();
d.redraw();
return d;
};
d.navigated = function() {
var a = this.nav;
if (a) return k(a).data("idx");
};
d = null;
return f;
}({}, y, w));
n.register("$24", function(f, d, D) {
function m(a) {
var b = [];
a && (a.saved() || b.push("po-unsaved"), a.fuzzy() ? b.push("po-fuzzy") : a.flagged() && b.push("po-flagged"), 
a.translation() || b.push("po-empty"), a.comment() && b.push("po-comment"));
return b.join(" ");
}
function g(a, b, c) {
b = k(a.title(b).parentNode);
var e = b.find("span.lang");
c ? (c = n.require("$37", "locale.js").cast(c), e.length || (e = k("<span></span>").prependTo(b)), 
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
var a = "poUpdate", e = "changing", h = "changed", q = 0, l = 1, A = 2, z = 3, s = 4, p = 5, B, x, r = n.require("$36", "string.js").html, y = n.require("$6", "string.js").sprintf;
f.extend = function(a) {
return a.prototype = new b();
};
f.localise = function(a) {
x = a;
return f;
};
var w = function() {
var a = D.createElement("p");
return function(b) {
a.innerHTML = b.replace("src=", "x=");
return a.textContent.trim() || b.trim();
};
}(), u = b.prototype = n.require("$38", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
a || (a = x || n.require("$1", "t.js").init());
var b = [];
b[q] = a._x("Source text", "Editor") + ":";
b[z] = a._x("%s translation", "Editor") + ":";
b[s] = a._x("Context", "Editor") + ":";
b[p] = a._x("Comments", "Editor") + ":";
b[l] = a._x("Single", "Editor") + ":";
b[A] = a._x("Plural", "Editor") + ":";
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
var c = n.require("$39", "wingrid.js").init(a);
k(d).on("resize", b);
this.redraw = b;
k(a).on("wgFocus wgBlur", function(a, b) {
a.stopPropagation();
B = b;
});
this.destroy = function() {
c.destroy();
k(d).off("resize", b);
};
this.rootDiv = a;
return c;
};
u.$ = function() {
return k(this.rootDiv);
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
for (var e = this.listTable, d = e.selected(), h = d, g, q = this.po; null != (d = e.next(a, c, d)); ) {
if (h === d) {
d = null;
break;
}
if (b && (g = q.row(d), g.translated(0))) continue;
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
a !== c && k(b).attr("class", a);
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
c = k.Event(a);
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
var a = this, b, c = a.listCell, e = a.listTable, d = a.po, h = d && d.locale(), g = h && h.isRTL(), q = d && d.length || 0;
if (!d || !d.row) return c && c.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = h;
a.lastSearch && (a.lastSearch = "", a.lastFound = q, a.fire("poFilter", [ "", q ]));
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
var l, c = a.getListColumns();
for (l in c) e.sortable(c[l]);
b && e.thead().distribute(b);
e.tbody().$(g ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad");
return !!q;
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
var e = [], d, h = !1, g = this.$smeta, q = this.labels, l = [], f = a.tags(), p = f && f.length;
if (d = a.context()) l.push("<span>" + r(q[s]) + "</span>"), l.push("<mark>" + r(d) + "</mark>");
if (p && this.getTag) for (l.push("<span>Tagged:</span>"); 0 <= --p; ) (d = this.getTag(f[p])) && l.push('<mark class="tag">' + r(d.mod_name) + "</mark>");
l.length && e.push(l.join(" "));
if (this.getMono() && (d = a.refs()) && (f = d.split(/\s/), p = f.length)) {
for (l = []; 0 <= --p; ) d = f[p], l.push("<code>" + r(d) + "</code>");
e.push('<p class="has-icon icon-file">' + l.join(" ") + "</p>");
}
(d = a.notes()) && e.push('<p class="has-icon icon-info">' + r(d, !0) + "</p>");
e.length ? (g || (g = b.find("div.meta"), g.length || (g = k('<div class="meta"></div>').insertAfter(b.header())), 
c(this, g, "poMeta"), this.$smeta = g), g.html(e.join("\n")).show(), h = !0) : g && g.text() && (g.text("").hide(), 
h = !0);
return h;
};
u.setTrgMeta = function(a, b, c) {
var e = [], d = !1, h = this.$tmeta;
b = (a = a.errors(b)) && a.length;
var g;
if (b) for (g = 0; g < b; g++) e.push('<p class="has-icon icon-warn">' + r(a[g], !0) + ".</p>");
e.length ? (h || (h = c.find("div.meta"), h.length || (h = k('<div class="meta"></div>').insertAfter(c.header())), 
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
var h = J, k = L[q];
a.off();
a.titled() !== k && g(a, k, e || "en");
k = !1;
r.setSrcMeta(b, a) && (k = !0);
if (b.plural()) {
var k = -1, p = [], s = [], z = a.id + "-", m = b.sourceForms() || e && e.plurals || [ "One", "Other" ], n = m.length;
if (2 !== n || "=" === m[0].charAt(0) && "=1" !== m[0]) for (;++k < n; ) p[k] = z + String(k), 
s[k] = c(m[k]) + ":"; else p = [ z + "-0", z + "-1" ], s = [ L[l], L[A] ];
a.splity.apply(a, p);
a.each(function(a, c) {
a.header(s[c]).textarea(b.source(null, c), h).setStrf(C).setMode(x).setInvs(w);
});
a.lock();
h && a.each(function(a, b) {
f(a, b);
});
} else k && a.redraw(), a.textarea(b.source(), h).setStrf(C).setMode(x).setInvs(w), 
h && f(a, 0);
}
function f(c, d) {
c.on(e, function(a, c) {
b.source(c, d);
0 === d && r.updateListCell(b, "source");
r.unsave(b, d);
}).on(h, function() {
0 === d && r.po.reIndex(b);
r.dict && r.rebuildSearch();
r.fire(a, [ b ]);
});
}
function k(a, e, d) {
M && a.eachTextarea(function(a) {
a.ping();
});
a.off();
var h = e.isKnown() && e.label || "Target", h = y(L[z], h);
a.titled() !== h && g(a, h, e);
h = !1;
!this.sourceCell && r.setSrcMeta(b, a) && (h = !0);
r.setTrgMeta(b, d, a) && (h = !0);
r.setStatus(b, d);
if (1 !== e.nplurals && b.pluralized()) {
var q = [], l = [], f = a.id + "-", p = b.targetForms() || e.plurals || [ "One", "Other" ], h = p.length, A = function(a) {
var b = p[a];
l.push(b ? c(b, !0) : "Form " + a);
q.push(f + String(a));
};
for (b.each(A); (e = q.length) < h; ) A(e);
a.splitx.apply(a, q);
a.each(function(a, c) {
var e = M && !b.disabled(c);
a.textarea(b.translation(c), e).setStrf(C).setMode(x).setInvs(w);
M && m(a, c);
});
a.navigize(l, d || null).on("wgTabSelect", function(c, e) {
var d = M && c.cell.editable();
d && d.focus();
r.setTrgMeta(b, e, a);
r.setStatus(b, e);
r.fire("poTab", [ e ]);
});
} else h && a.redraw(), a.textarea(b.translation(), M && !b.disabled(0)).setStrf(C).setMode(x).setInvs(w), 
M && m(a, 0);
}
function m(c, d) {
c.on(e, function(a, c, e) {
b.translate(c, d);
0 === d && r.updateListCell(b, "target");
b.fuzzy(d) ? r.fuzzy(!1, b, d) : r.unsave(b, d);
"" === c ? (r.fire("poEmpty", [ !0, b, d ]), r.setStatus(b, d)) : "" === e && (r.fire("poEmpty", [ !1, b, d ]), 
r.setStatus(b, d));
}).on(h, function() {
r.dict && r.rebuildSearch();
r.fire(a, [ b ]);
});
}
function n(c) {
c.off();
var d = L[s];
c.titled() !== d && (g(c, d), r.setStatus(null));
c.textarea(b.context(), !0).setMode(x).setInvs(w);
X && c.on(e, function(a, c) {
b.context(c);
r.updateListCell(b, "source");
r.unsave(b, O);
}).on(h, function() {
r.po.reIndex(b);
r.dict && r.rebuildSearch();
r.fire(a, [ b ]);
});
}
function u(a) {
var c = L[p];
a.titled() !== c && g(a, c);
a.off().on(e, function(a, c) {
b.comment(c);
r.fire("poComment", [ b, c ]);
r.unsave(b, O);
}).textarea(b.comment(), !0);
}
var r = this, x = r.mode, D = b.isHTML(), w = r.inv || !1, E = this.fmt || null, C = b.format() || null, I = b.is(r.active), O = 0, T = r.sourceCell, S = r.targetCell, U = r.contextCell, V = r.commentCell, M = r.editable.target, J = r.editable.source, X = r.editable.context, P = B, Y = r.sourceLocale, W = r.targetLocale, L = r.labels;
r.html !== D && (r.html = D, "code" !== r.mode && (x = D ? "html" : "", r.setMode(x)));
r.active = b;
T && d(T, Y);
U && n(U);
S && W && (O = S.navigated() || 0, k(S, W, O));
V && u(V);
P && (P.exists() || (P = P.parent()), (D = P.editable()) && D.focus());
E !== C && (this.fmt = C);
I || r.fire("poSelected", [ b, O ]);
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
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? w(a) : a.trim()) || " ";
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
}({}, y, w));
n.register("$13", function(f, d, D) {
function m() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function g(a) {
a = k('<button type="button" class="button button-small icon icon-' + a + ' hastip"></button>');
n.require("$12", "tooltip.js").init(a);
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
d = n.require("$24", "base.js");
f.init = function(a) {
var b = new m();
a = b.setRootCell(a);
var c = a.splity("po-list", "po-edit"), d = c[0], g = c[1], c = g.splitx("po-trans", "po-comment"), f = c[0], k = c[1].header("Loading.."), c = f.splity("po-source", "po-target"), f = c[0].header("Loading.."), c = c[1].header("Loading..");
a.distribute([ .34 ]);
g.distribute([ .8 ]);
b.setListCell(d);
b.setSourceCell(f);
b.setTargetCell(c);
b.commentCell = k;
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
var c, d = b(a.source() || ""), h = a.context();
return h ? (c = D.createElement("p"), c.appendChild(D.createElement("mark")).innerText = h, 
c.appendChild(D.createTextNode(" " + d)), c) : d;
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
e || (this.$tnav = e = k("<nav></nav>").append(c(this)).append(b(this)).appendTo(this.targetCell.header()));
var d = [];
a.translated() ? a.fuzzy() && d.push("po-fuzzy") : d.push("po-empty");
e.attr("class", d.join(" "));
}
};
d.getSorter = function() {
function a(a, c) {
var d = a.weight(), h = c.weight();
return d === h ? b(a, c) : d > h ? -1 : 1;
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
}({}, y, w));
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
if (!h[e]) return !0;
var d = c[e];
if (!d) throw Error("command undefined #" + e);
if (a.altKey || a.shiftKey && !g[e] || !1 === d(a, b)) return !0;
a.stopPropagation();
a.preventDefault();
return !1;
}
var h = {};
k(a || d).on("keydown", e);
return {
add: function(a, b) {
c[m[a]] = b;
return this;
},
enable: function() {
var a, b;
for (b in arguments) a = m[arguments[b]], h[a] = !0;
return this;
},
disable: function() {
k(a || d).off("keydown", e);
b = a = h = null;
}
};
};
return f;
}({}, y, w));
n.register("$25", function(f, d, k) {
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
for (var c = -1, b = this.length, a, e = this.keys, h = this.ords, f = []; ++c < b; ) f[c] = [ this[c], e[c] ];
f.sort(function(a, b) {
return d(a[0], b[0]);
});
for (c = 0; c < b; c++) a = f[c], this[c] = a[0], a = a[1], e[c] = a, h[a] = c;
return this;
};
d.join = function(d) {
return [].join.call(this, d);
};
d = null;
return f;
}({}, y, w));
n.register("$26", function(f, d, k) {
function m(d, c) {
var b = RegExp("^.{0," + (d - 1) + "}[" + c + "]"), a = RegExp("^[^" + c + "]+");
return function(c, h) {
for (var f = c.length, l; f > d; ) {
l = b.exec(c) || a.exec(c);
if (null == l) break;
l = l[0];
h.push(l);
l = l.length;
f -= l;
c = c.substr(l);
}
0 !== f && h.push(c);
return h;
};
}
f.create = function(d) {
function c(a) {
return l[a] || "\\" + a;
}
var b, a, e = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, h = /[ \r\n]+/g, f = /[\t\v\f\x07\x08\\\"]/g, l = {
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
var k = [ b + ' "' ], m = h.split("\n");
if (a) for (var n = -1, r = m.length; ++n < r; ) a(m[n], k); else k = k.concat(m);
return k.join('"\n"') + '"';
},
prefix: function(a, b) {
var c = a.split(e);
return b + c.join("\n" + b);
},
refs: function(a) {
a = a.replace(h, " ", a);
b && (a = b(a, []).join("\n#: "));
return "#: " + a;
}
};
};
return f;
}({}, y, w));
n.register("$40", function(f, d, k) {
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
}({}, y, w));
n.register("$27", function(f, d, k) {
function m() {}
f.extend = function(d) {
return d.prototype = new m();
};
d = m.prototype = n.require("$38", "abstract.js").init([ "add", "load" ]);
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
null == d ? d = this.loc : this.loc = d = n.require("$37", "locale.js").cast(d);
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
for (var d = -1, c = this.rows, b = c.length, a = n.require("$40", "list.js").init(); ++d < b; ) a.push(c[d]);
return a;
};
d = null;
return f;
}({}, y, w));
n.register("$28", function(f, d, k) {
function m(c, b, a) {
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
for (var c, b = {}, a = [], d = this.flg || [], h = d.length; 0 !== h--; ) c = d[h], 
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
for (var b = -1, a = this.src, d = this.msg, h = Math.max(a.length, d.length); ++b < h; ) c(b, a[b], d[b]);
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
}({}, y, w));
n.register("$15", function(f, d, k) {
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
k = n.require("$27", "messages.js").extend(a);
k.clear = function() {
this.rows = n.require("$25", "collection.js").init();
this.length = 0;
return this;
};
k.now = function() {
function a(b, c) {
for (var d = String(b); d.length < c; ) d = "0" + d;
return d;
}
var b = new Date(), c = b.getUTCFullYear(), d = b.getUTCMonth() + 1, e = b.getUTCDate(), f = b.getUTCHours(), b = b.getUTCMinutes();
return a(c, 4) + "-" + a(d, 2) + "-" + a(e, 2) + " " + a(f, 2) + ":" + a(b, 2) + "+0000";
};
k.header = function(a, b) {
var c = this.head || (this.head = {});
if (null == b) return this.headers()[a] || "";
c[a] = b || "";
return this;
};
k.headers = function(a) {
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
k.get = function(a, b) {
var c = g(a, b);
return this.rows.get(c);
};
k.add = function(a, b) {
a instanceof e || (a = new e(a));
b && a.context(b);
var d = a.hash();
this.rows.get(d) ? c("Duplicate message at index " + this.indexOf(a)) : (a.idx = this.rows.add(d, a), 
this.length = this.rows.length);
return a;
};
k.load = function(a) {
for (var b = -1, d, f, g, k, p, m, n = (g = this.locale()) && g.nplurals || 2, r = []; ++b < a.length; ) d = a[b], 
null == d.parent ? (f = d.source || d.id, g = d.target || "", k = d.context, f || k ? (p = new e(f, g), 
p._id = d._id, k && p.context(k), d.flag && p.flag(d.flag, 0), d.comment && p.comment(d.comment), 
d.notes && p.notes(d.notes), d.refs && p.refs(d.refs), p.format(d.format), d.message = p, 
this.add(p), d.prev && d.prev[0] && (p.prev(d.prev[0].source, d.prev[0].context), 
d.prev[1] && p._src.push(d.prev[1].source || ""))) : 0 === b && "object" === typeof g && (this.head = g, 
this.headcmt = d.comment)) : r.push(d);
for (b = -1; ++b < r.length; ) try {
d = r[b];
f = d.source || d.id;
p = a[d.parent] && a[d.parent].message;
if (!p) throw Error("parent missing for plural " + f);
m = d.plural;
1 === m && p.plural(f);
m >= n || (d.flag && p.flag(d.flag, m), p.translate(d.target || "", m), d.format && !p.format() && p.format(d.format));
} catch (w) {
c(w);
}
return this;
};
k.wrap = function(a) {
this.fmtr = b(a);
return this;
};
k.toString = function() {
var a, c = this.locale(), d = [], f = [], g = this.headers(), k = !c, p = c && c.nplurals || 2, m = this.fmtr || b();
g[c ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (a in g) f.push(a + ": " + g[a]);
f = new e("", f.join("\n"));
f.comment(this.headcmt || "");
k && f.fuzzy(0, !0);
d.push(f.toString());
d.push("");
this.rows.each(function(a, b) {
a && (d.push(b.cat(m, k, p)), d.push(""));
});
return d.join("\n");
};
k = n.require("$28", "message.js").extend(e);
k.prev = function(a, b) {
this._src = [ a || "" ];
this._ctx = b;
};
k.hash = function() {
return g(this.source(), this.context());
};
k.toString = function() {
return this.cat(b());
};
k.cat = function(a, b, c) {
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
k.compare = function(a, b) {
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
k.copy = function() {
var a = new e(), b, c;
for (b in this) this.hasOwnProperty(b) && ((c = this[b]) && c.concat && (c = c.concat()), 
a[b] = c);
return a;
};
k = k = null;
return f;
}({}, y, w));
n.register("$17", function(f, d, n) {
f.init = function(d, f) {
function c() {
return h || (h = k('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function b(a, b, d) {
a = k("<p></p>").text(d);
c().dialog("close").html("").dialog("option", "title", "Error").append(a).dialog("open");
}
function a(a) {
var b = a && a.code;
if (b) {
for (var d = -1, e = b.length, f = k("<ol></ol>").attr("class", a.type); ++d < e; ) k("<li></li>").html(b[d]).appendTo(f);
f.find("li").eq(a.line - 1).attr("class", "highlighted");
c().dialog("close").html("").dialog("option", "title", a.path + ":" + a.line).append(f).dialog("open");
}
}
function e(a) {
a = a.target;
var b = k(a).find("li.highlighted")[0], b = Math.max(0, (b && b.offsetTop || 0) - Math.floor(a.clientHeight / 2));
a.scrollTop = b;
}
var h;
return {
load: function(h) {
c().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", e);
h = k.extend({
ref: h,
path: f.popath
}, f.project || {});
d.ajax.post("fsReference", h, a, b);
}
};
};
return f;
}({}, y, w));
n.register("$30", function(f, d, k) {
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
B.push(b);
return x[a.html ? 1 : 0] = b;
}
function a(a, d) {
var g = a.source(null, d);
if (g && (a.untranslated(d) || c)) {
var u = p[g];
if (u) u.push(a); else {
var u = g.length, v = e.isHtml(g), v = x[v ? 1 : 0], B = v.sources;
if (s && u > s) l++; else {
if (v.length + u > n || B.length === m) v = b(v), B = v.sources;
B.push(g);
p[g] = [ a ];
v.length += u;
f += u;
k += 1;
}
}
}
}
var e = this.api, f = 0, k = 0, l = 0, m = 50, n = 1e4, s = e.maxChr(), p = {}, B = [], x = [];
s && (n = Math.min(n, s));
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
delete x;
this.map = p;
this.chars = f;
this.length = k;
this.batches = B;
this.locale = d.locale();
l && e.stderr("Strings over " + n + " characters long will be skipped");
};
d.abort = function() {
this.state = "abort";
return this;
};
d.dispatch = function() {
function d(a, b) {
function e(c, d, h) {
b !== h && (a === d || 1 < c && f.source(null, 1) === a) && (f.translate(b, c), 
p++, r++);
return p;
}
if (!c()) return !1;
if (!b) return !0;
var f, h = n[a] || [], g = h.length, l = -1, p;
for (B++; ++l < g; ) if (f = h[l]) p = 0, f.each(e), p && k("each", [ f ]);
return !0;
}
function c() {
return "abort" === l.state ? (m && (m.abort(), f()), !1) : !0;
}
function b() {
var b = s.shift(), c;
b ? (c = b.sources) && c.length ? m.batch(c, p, b.html, d).fail(a).always(e) : e() : f();
}
function a() {
l.abort();
f();
}
function e() {
x++;
k("prog", [ x, y ]);
c() && b();
}
function f() {
m = s = null;
k("done");
}
function k(a, b) {
for (var c = u[a] || [], d = c.length; 0 <= --d; ) c[d].apply(null, b);
}
var l = this, m = l.api, n = l.map, s = l.batches || [], p = l.locale, B = 0, x = 0, r = 0, w = l.length, y = s.length, u = {
done: [],
each: [],
prog: []
};
l.state = "";
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
return Math.max(w - B, 0);
},
did: function() {
return B;
}
};
}
};
};
return f;
}({}, y, w));
n.register("$41", {
nn: [ "no" ]
});
n.register("$31", function(f, d, k) {
function m() {}
function g(c) {
c.parseError = function(b) {
return b && b.code && 200 !== b.code && b.message ? "Error " + b.code + ": " + b.message : "";
};
c.batch = function(b, a, d, f) {
function g(c) {
for (var d = b.length, e = -1; ++e < d && !1 !== f(b[e], c[e] || "", a); ) ;
}
d = d ? "html" : "plain";
var k = this.getSrc(), m = this.toLang(a);
return c._call({
url: "https://translate.yandex.net/api/v1.5/tr.json/translate?format=" + d + "&lang=" + k + "-" + m,
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
/^trnsl\./.test(this.key()) && g(this);
};
b.toLang = function(a) {
return this.mapLang(a, n.require("$41", "yandex.json"));
};
b.maxChr = function() {
return 1e4;
};
return new m();
};
return f;
}({}, y, w));
n.register("$42", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
n.register("$32", function(f, d, k) {
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
for (var h = c.length, g = -1, k; ++g < h && (k = a[g] || {}, !1 !== d(c[g], k.translatedText || "", b)); ) ;
}
var g = this, k = this.getSrc();
a = a ? "html" : "text";
var m = g.mapLang(b, n.require("$42", "google.json"));
return g._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + k + "&target=" + m + "&format=" + a,
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
}({}, y, w));
n.register("$43", {
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
n.register("$33", function(f, d, k) {
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
d.maxChr = function() {
return 1e4;
};
d.batch = function(c, b, a, d) {
function f(a) {
for (var h = -1, g; ++h < z && (g = a[h] || {}, g = g.translations || [], g = g[0] || {}, 
!1 !== d(c[h], g.text || "", b)); ) ;
}
var g = this, k = [], m = g.getSrc(), z = c.length, s = -1;
a = a ? "html" : "plain";
for (var p = g.mapLang(b, n.require("$43", "ms.json")); ++s < z; ) k.push({
text: c[s]
});
return g._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + m + "&to=" + p + "&textType=" + a,
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
return new m();
};
return f;
}({}, y, w));
n.register("$44", {
pt: [ "pt-PT", "pt-BR" ]
});
n.register("$34", function(f, d, k) {
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
for (var h = c.length, g = -1, k; ++g < h && (k = a[g] || {}, !1 !== d(c[g], k.text || "", b)); ) ;
}
var g = this;
a = this.getSrc();
var k = g.param("url") || "https://api.deepl.com", m = g.mapLang(b, n.require("$44", "deepl.json")), z = b.tone, s = "default";
null == z && (z = String(b.variant || "").toLowerCase());
"formal" === z ? s = "more" : "informal" === z && (s = "less");
return g._call({
url: g.fixURL(k + "/v2/translate"),
method: "POST",
traditional: !0,
data: {
source_lang: a.toUpperCase(),
target_lang: m.toUpperCase(),
formality: s,
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
}({}, y, w));
n.register("$45", {
zh: [ "zh", "zh-CN", "zh-TW" ],
pt: [ "pt", "pt-PT", "pt-BR" ]
});
n.register("$35", function(f, d, k) {
function m() {}
f.create = function(d) {
d = m.prototype = new d();
d.getUrl = function() {
return "https://lecto.ai/?ref=loco";
};
d.parseError = function(c) {
var b = c.details || {}, a = b.message, b = b.texts;
return a ? (b && b !== a && (a += "; " + b), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(a) {
a += -1 === a.indexOf("?") ? "?" : "&";
return a + "ref=loco";
}), "Error " + (c.status || "0") + ": " + a) : "";
};
d.maxChr = function() {
return 1e3;
};
d.batch = function(c, b, a, d) {
function f(a) {
for (var h = c.length, g = -1, k = (a[0] || {
translated: []
}).translated || []; ++g < h && (a = k[g] || "", !1 !== d(c[g], a, b)); ) ;
}
var g = this;
a = this.getSrc();
var k = g.param("url") || "https://api.lecto.ai", m = g.mapLang(b, n.require("$45", "lecto.json"));
return g._call({
url: g.fixURL(k + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ m ],
from: a,
texts: c
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": g.key(),
Accept: "application/json"
}
}).done(function(a, b, c) {
a ? f(a.translations || []) : (g.stderr(g.parseError(a) || g.httpError(c)), f([]));
}).fail(function() {
f([]);
});
};
return new m();
};
return f;
}({}, y, w));
n.register("$18", function(f, d, w) {
function m() {
this.inf = {};
}
function g() {
var a = w.createElement("p"), b = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, c = /<[a-z]+\s/i, d, f;
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
c.getSrc = function() {
return this.param("src") || "en";
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
c.maxChr = function() {
return 0;
};
c.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
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
return b.abortable(k.ajax(a));
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
return n.require("$30", "job.js").create(this);
};
c.batch = function(a, b, c, f) {
function g(c) {
for (var d = a.length, h = -1; ++h < d && !1 !== f(a[h], c[h], b); ) ;
}
var m = d.loco.ajax;
c = {
hook: this.getId(),
type: c ? "html" : "text",
locale: this.toLang(b),
source: this.getSrc(),
sources: a
};
var n = k.Deferred();
this.abortable(m.post("apis", c, function(a) {
g(a && a.targets || []);
n.resolve();
}, function() {
g([]);
n.reject();
}));
return n.promise();
};
f.create = function(a) {
var b;
b = a.id;
b = "yandex" === b ? n.require("$31", "yandex.js").create(m) : "google" === b ? n.require("$32", "google.js").create(m) : "microsoft" === b ? n.require("$33", "ms.js").create(m) : "deepl" === b ? n.require("$34", "deepl.js").create(m) : "lecto" === b ? n.require("$35", "lecto.js").create(m) : new m();
b.init(a);
return b;
};
f.suggest = function(a, b, c, d) {
var f, g, k = a.length;
for (f = 0; f < k; f++) g = a[f], g.translate(b, c, d);
};
var b;
return f;
}({}, y, w));
n.register("$19", function(f, d, n) {
f.init = function(f) {
function g() {
H || (I.on("click", l), H = k('<div id="loco-fs-creds"></div>').dialog({
dialogClass: "request-filesystem-credentials-dialog loco-modal",
minWidth: 580,
modal: !0,
autoOpen: !1,
closeOnEscape: !0
}).on("change", 'input[name="connection_type"]', function() {
this.checked && k("#ssh-keys").toggleClass("hidden", "ssh" !== k(this).val());
}));
return H;
}
function c() {
R && (b(k(x)), R = !1);
if (E && J) {
var a = J, c = k(Q);
c.find("span.loco-msg").text(a);
K || (c.removeClass("jshide").hide().fadeIn(500), K = !0);
} else K && (b(k(Q)), K = !1);
}
function b(a) {
a.slideUp(250).fadeOut(250, function() {
k(this).addClass("jshide");
});
}
function a() {
if (E) return H && H.dialog("close"), c(), k(f).find('button[type="submit"]').attr("disabled", !1), 
k(d).triggerHandler("resize"), y && y(!0), !0;
v && H ? (R || (k(x).removeClass("jshide").hide().fadeIn(500), R = !0), K && (b(k(Q)), 
K = !1)) : c();
k(f).find('input[type="submit"]').attr("disabled", !0);
y && y(!1);
return !1;
}
function e(a) {
var b, c, d = p || {};
for (b in d) d.hasOwnProperty(b) && (c = d[b], a[b] ? a[b].value = c : k('<input type="hidden" />').attr("name", b).appendTo(a).val(c));
}
function h(a) {
a.preventDefault();
a = k(a.target).serializeArray();
s(a);
C = !0;
return !1;
}
function q(a) {
a.preventDefault();
H.dialog("close");
return !1;
}
function l(a) {
a.preventDefault();
H.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function w(b) {
E = b.authed;
r = b.method;
k(x).find("span.loco-msg").text(b.message || "Something went wrong.");
J = b.warning || "";
b.notice && u.notices.info(b.notice);
if (E) "direct" !== r && (p = b.creds, e(f), C && b.success && u.notices.success(b.success)), 
a(); else if (b.reason) u.notices.info(b.reason); else if (b = b.prompt) {
var c = g();
c.html(b).find("form").on("submit", h);
c.dialog("option", "title", c.find("h2").remove().text());
c.find("button.cancel-button").show().on("click", q);
c.find('input[type="submit"]').addClass("button-primary");
a();
k(d).triggerHandler("resize");
} else u.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function z() {
a();
}
function s(a) {
C = !1;
u.ajax.setNonce("fsConnect", N).post("fsConnect", a, w, z);
return a;
}
var p, y, x = f, r = null, C = !1, E = !1, u = d.loco, v = f.path.value, F = f.auth.value, N = f["loco-nonce"].value, I = k(x).find("button.button-primary"), Q = n.getElementById(x.id + "-warn"), R = !1, K = !1, J = "", H;
u.notices.convert(Q).stick();
f.connection_type ? (p = {}, p.connection_type = f.connection_type.value, E = !0) : v && F && s({
path: v,
auth: F
});
a();
return {
applyCreds: function(a) {
if (a.nodeType) e(a); else {
var b, c = p || {};
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
v = f.path.value;
F = f.auth.value;
s(k(f).serializeArray());
return this;
},
listen: function(a) {
y = a;
E && a(!0);
return this;
},
authed: function() {
return E;
}
};
};
return f;
}({}, y, w));
n.register("$20", function(f, d, w) {
function m(d, f, k, l) {
f = "n" === k ? c(f) : b(f);
l && (f = a(f));
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
for (k("tr", x).remove(); ++c < d; ) x.appendChild(a[c].$);
}
function c(a) {
s = a ? y.find(a, d) : d.slice(0);
w && (a = f[w], s = m(s, w, a.type, a.desc));
b(s);
}
var d = [], f = [], g = 0, s, p, w, x = a.getElementsByTagName("tbody")[0], r = a.getElementsByTagName("thead")[0], y = n.require("$10", "fulltext.js").init();
r && x && (k("th", r).each(function(a, c) {
var e = c.getAttribute("data-sort-type");
e && (a = g, k(c).addClass("loco-sort").on("click", function(c) {
c.preventDefault();
c = a;
var e = f[c], g = e.type, n = !(e.desc = !e.desc);
s = m(s || d.slice(0), c, g, n);
b(s);
p && p.removeClass("loco-desc loco-asc");
p = k(e.$).addClass(n ? "loco-desc" : "loco-asc").removeClass(n ? "loco-asc" : "loco-desc");
w = c;
return !1;
}), f[g] = {
$: c,
type: e
});
c.hasAttribute("colspan") ? g += Number(c.getAttribute("colspan")) : g++;
}), k("tr", x).each(function(a, b) {
var c, e, g, h = [], k = {
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
k[e] = g;
}
d[a] = k;
y.index(a, h);
}), a = k('form.loco-filter input[type="text"]', a.parentNode), a.length && (a = a[0], 
r = k(a.form), 1 < d.length ? n.require("$11", "LocoTextListener.js").listen(a, c) : r.hide(), 
r.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return f;
}({}, y, w));
var C = y.loco || {}, I = C.conf || {
$v: [ 0, 0 ]
};
y = n.require("$1", "t.js").init();
w = I.wplang;
C.version = function(f) {
return I.$v[f || 0];
};
n.require("$2", "html.js");
n.require("$3", "number.js");
n.require("$4", "array.js");
n.require("$5", "json.js");
C.l10n = y;
y.load(I.wpl10n);
w && y.pluraleq(w.pluraleq);
C.string = n.require("$6", "string.js");
C.notices = n.require("$7", "notices.js").init(y);
C.ajax = n.require("$8", "ajax.js").init(I).localise(y);
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
k("#loco-admin.wrap table.wp-list-table").each(function(f, d) {
n.require("$20", "tables.js").init(d);
});
C.validate = function(f) {
return "2.5.8" !== (/^\d+\.\d+\.\d+/.exec(f && f[0] || "") && RegExp.lastMatch) ? (C.notices.warn("admin.js is the wrong version (2.5.8). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
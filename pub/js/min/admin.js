(function(z, w, k, J) {
var q = function() {
function e(c) {
throw Error("Failed to require " + c);
}
var c = {};
return {
register: function(e, p) {
c[e] = p;
},
require: function(k, p) {
return c[k] || e(p);
},
include: function(k, p, h) {
return c[k] || (h ? e(p) : null);
}
};
}();
q.register("$1", function(e, c, k) {
function p(h) {
var c = typeof h;
if ("string" === c) if (/[^ <>!=()%^&|?:n0-9]/.test(h)) console.error("Invalid plural: " + h); else return new Function("n", "return " + h);
"function" !== c && (h = function(a) {
return 1 != a;
});
return h;
}
e.init = function(h) {
function c(a, b, d) {
return (a = g[a]) && a[d] ? a[d] : b || "";
}
function a(a) {
return c(a, a, 0);
}
function b(a, b) {
return c(b + "" + a, a, 0);
}
function d(a, b, d) {
d = Number(h(d));
isNaN(d) && (d = 0);
return c(a, d ? b : a, d);
}
h = p(h);
var g = {};
return {
__: a,
_x: b,
_n: d,
_: a,
x: b,
n: d,
load: function(a) {
g = a || {};
return this;
},
pluraleq: function(a) {
h = p(a);
return this;
}
};
};
return e;
}({}, z, w));
q.register("$2", function(e, c, k) {
e.ie = function() {
var e = !1, h = 0;
c.attachEvent && c.navigator && /MSIE (\d+)\./.exec(String(navigator.appVersion)) && (h = Number(RegExp.$1), 
e = 11 > h);
return function() {
return e;
};
}();
e.init = function() {
return e;
};
return e;
}({}, z, w));
q.register("$3", function(e, c, k) {
Number.prototype.format = function(c, h, l) {
c = Math.pow(10, c || 0);
var a = Math.round(c * this) / c;
c = [];
var a = String(a), b = a.split("."), a = b[0], b = b[1], d = a.length;
do {
c.unshift(a.substring(d - 3, d));
} while (0 < (d -= 3));
a = c.join(l || ",");
if (b) {
l = b;
var g;
for (c = l.length; "0" === l.charAt(--c); ) g = c;
g && (l = l.substring(0, g));
(b = l) && (a += (h || ".") + b);
}
return a;
};
Number.prototype.percent = function(c) {
var h = 0, l = this && c ? 100 * (this / c) : 0;
if (0 === l) return "0";
if (100 === l) return "100";
if (99 < l) l = Math.min(l, 99.9), c = l.format(++h); else if (.5 > l) {
l = Math.max(l, 1e-4);
do {
c = l.format(++h);
} while ("0" === c && 4 > h);
c = c.substr(1);
} else c = l.format(0);
return c;
};
return e;
}({}, z, w));
q.register("$4", function(e, c, k) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(c) {
if (null == this) throw new TypeError();
var h, l = Object(this), a = l.length >>> 0;
if (0 === a) return -1;
h = 0;
1 < arguments.length && (h = Number(arguments[1]), h != h ? h = 0 : 0 != h && Infinity != h && -Infinity != h && (h = (0 < h || -1) * Math.floor(Math.abs(h))));
if (h >= a) return -1;
for (h = 0 <= h ? h : Math.max(a - Math.abs(h), 0); h < a; h++) if (h in l && l[h] === c) return h;
return -1;
});
return e;
}({}, z, w));
q.register("$5", function(e, c, q) {
c.JSON || (c.JSON = {
parse: k.parseJSON,
stringify: null
});
return e = c.JSON;
}({}, z, w));
q.register("$6", function(e, c, k) {
e.trim = function(c, h) {
for (h || (h = " \n"); c && -1 !== h.indexOf(c.charAt(0)); ) c = c.substring(1);
for (;c && -1 !== h.indexOf(c.slice(-1)); ) c = c.substring(0, c.length - 1);
return c;
};
e.sprintf = function(c) {
return e.vsprintf(c, [].slice.call(arguments, 1));
};
e.vsprintf = function(c, h) {
var l = 0;
return c.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(a, b, d) {
return "%" === d ? "%" : (b ? h[Number(b) - 1] : h[l++]) || "";
});
};
return e;
}({}, z, w));
q.register("$21", function(e, c, k) {
function p(h) {
return function(c, a) {
for (var b = c[h] || 0; (c = c.offsetParent) && c !== (a || k.body); ) b += c[h] || 0;
return b;
};
}
e.top = p("offsetTop");
e.left = p("offsetLeft");
e.el = function(c, l) {
var a = k.createElement(c || "div");
l && (a.className = l);
return a;
};
e.txt = function(c) {
return k.createTextNode(c || "");
};
return e;
}({}, z, w));
q.register("$7", function(e, c, C) {
function p(a, b, m) {
function d() {
f();
v = setTimeout(b, m);
}
function f() {
v && clearTimeout(v);
v = null;
}
var v;
d();
k(a).on("mouseenter", f).on("mouseleave", d);
return {
die: function() {
f();
k(a).off("mouseenter mouseleave");
}
};
}
function h(a, b) {
a.fadeTo(b, 0, function() {
a.slideUp(b, function() {
a.remove();
k(c).triggerHandler("resize");
});
});
return a;
}
function l(a, b) {
function m(b) {
n[v] = null;
h(k(a), 250);
f && f.die();
var d;
if (d = b) b.stopPropagation(), b.preventDefault(), d = !1;
return d;
}
function d(b) {
f && f.die();
return f = p(a, m, b);
}
var f, v, g, A = k(a), s = A.find("button");
0 === s.length && (A.addClass("is-dismissible"), s = k('<button type="button" class="notice-dismiss"> </a>').appendTo(A));
s.off("click").on("click", m);
k(c).triggerHandler("resize");
y();
v = n.length;
n.push(m);
b && (f = d(b));
return {
link: function(b, v) {
var m = v || b, d = k(a).find("nav"), m = k("<nav></nav>").append(k("<a></a>").attr("href", b).text(m));
g ? (g.push(m.html()), d.html(g.join("<span> | </span>"))) : (g = [ m.html() ], 
k(a).addClass("has-nav").append(m));
return this;
},
stick: function() {
f && f.die();
f = null;
n[v] = null;
return this;
},
slow: function(a) {
d(a || 1e4);
return this;
}
};
}
function a(a, b, m) {
var d = q.require("$21", "dom.js").el;
a = k('<div class="notice notice-' + a + ' loco-notice inline"></div>').prependTo(k("#loco-notices"));
var f = k(d("p"));
m = k(d("span")).text(m);
b = k(d("strong", "has-icon")).text(b + ": ");
f.append(b).append(m).appendTo(a);
return a;
}
function b(b, m, d, f) {
b = a(d, m, b).css("opacity", "0").fadeTo(500, 1);
k(c).triggerHandler("resize");
return l(b, f);
}
function d(a) {
return b(a, s, "warning");
}
function g() {
k("#loco-notices").find("div.notice").each(function(a, b) {
if (-1 === b.className.indexOf("jshide")) {
var m = -1 === b.className.indexOf("notice-success") ? null : 5e3;
l(b, m);
}
});
}
var n = [], f = c.console || {
log: function() {}
}, y = Date.now || function() {
return new Date().getTime();
}, B, s, m, A;
e.error = function(a) {
return b(a, B, "error");
};
e.warn = d;
e.info = function(a) {
return b(a, m, "info");
};
e.success = function(a) {
return b(a, A, "success", 5e3);
};
e.warning = d;
e.log = function() {
f.log.apply(f, arguments);
};
e.debug = function() {
(f.debug || f.log).apply(f, arguments);
};
e.clear = function() {
for (var a = -1, b, m = n, d = m.length; ++a < d; ) (b = m[a]) && b.call && b();
n = [];
return e;
};
e.create = a;
e.raise = function(a) {
(e[a.type] || e.error).call(e, a.message);
};
e.convert = l;
e.init = function(a) {
B = a._("Error");
s = a._("Warning");
m = a._("Notice");
A = a._("OK");
setTimeout(g, 1e3);
return e;
};
return e;
}({}, z, w));
q.register("$8", function(e, c, C) {
function p(a) {
var b = k("<pre>" + a + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = a) || (b = "Blank response from server");
return b;
}
function h(a) {
return (a = a.split(/[\r\n]/)[0]) ? (a = a.replace(/ +in +\S+ on line \d+/, ""), 
a = a.replace(/^[()! ]+Fatal error:\s*/, "")) : t._("Server returned invalid data");
}
function l(a) {
c.console && console.error && console.error('No nonce for "' + a + '"');
return "";
}
function a(a, b, d) {
a[b] = d;
}
function b(a, b, d) {
a.push({
name: b,
value: d
});
}
function d(a, b, d) {
a.append(b, d);
}
function g(a, b, d, g) {
function r(b, m, v) {
if ("abort" !== m) {
var r = f || {
_: function(a) {
return a;
}
}, g = b.status || 0, c = b.responseText || "", x = p(c), B = b.getResponseHeader("Content-Type") || "Unknown type", l = b.getResponseHeader("Content-Length") || c.length;
"success" === m && v ? n.error(v) : (n.error(h(x) + ".\n" + r._("Check console output for debugging information")), 
n.log("Ajax failure for " + a, {
status: g,
error: m,
message: v,
output: c
}), "parsererror" === m && (v = "Response not JSON"), n.log([ r._("Provide the following text when reporting a problem") + ":", "----", "Status " + g + ' "' + (v || r._("Unknown error")) + '" (' + B + " " + l + " bytes)", x, "====" ].join("\n")));
d && d.call && d(b, m, v);
y = b;
}
}
g.url = B;
g.dataType = "json";
var n = q.require("$7", "notices.js").clear();
y = null;
return k.ajax(g).fail(r).done(function(a, d, v) {
var f = a && a.data, g = a && a.notices, y = g && g.length, c = -1;
for (!f || a.error ? r(v, d, a && a.error && a.error.message) : b && b(f, d, v); ++c < y; ) n.raise(g[c]);
});
}
var n = {}, f, y, B = c.ajaxurl || "/wp-admin/admin-ajax.php";
e.init = function(a) {
n = a.nonces || n;
return e;
};
e.localise = function(a) {
f = a;
return e;
};
e.xhr = function() {
return y;
};
e.strip = p;
e.parse = h;
e.submit = function(a, b, d) {
function f(a, b) {
b.disabled ? b.setAttribute("data-was-disabled", "true") : b.disabled = !0;
}
function r(a, b) {
b.getAttribute("data-was-disabled") || (b.disabled = !1);
}
function y(a) {
a.find(".button-primary").removeClass("loading");
a.find("button").each(r);
a.find("input").each(r);
a.find("select").each(r);
a.find("textarea").each(r);
a.removeClass("disabled loading");
}
var n = k(a), c = n.serialize();
(function(a) {
a.find(".button-primary").addClass("loading");
a.find("button").each(f);
a.find("input").each(f);
a.find("select").each(f);
a.find("textarea").each(f);
a.addClass("disabled loading");
})(n);
return g(a.route.value, function(a, d, f) {
y(n);
b && b(a, d, f);
}, function(a, b, m) {
y(n);
d && d(a, b, m);
}, {
type: a.method,
data: c
});
};
e.post = function(f, m, y, h) {
var r = !0, F = m || {}, B = n[f] || l(f);
c.FormData && F instanceof FormData ? (r = !1, m = d) : m = Array.isArray(F) ? b : a;
m(F, "action", "loco_json");
m(F, "route", f);
m(F, "loco-nonce", B);
return g(f, y, h, {
type: "post",
data: F,
processData: r,
contentType: r ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
e.get = function(a, b, d, f) {
b = b || {};
var r = n[a] || l(a);
b.action = "loco_json";
b.route = a;
b["loco-nonce"] = r;
return g(a, d, f, {
type: "get",
data: b
});
};
e.setNonce = function(a, b) {
n[a] = b;
return e;
};
return e;
}({}, z, w));
q.register("$22", {
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
q.register("$9", function(e, c, k) {
function p() {}
var h, l = q.require("$22", "rtl.json");
e.init = function() {
return new p();
};
e.cast = function(a) {
return a instanceof p ? a : "string" === typeof a ? e.parse(a) : e.clone(a);
};
e.clone = function(a) {
var b, d = new p();
for (b in a) d[b] = a[b];
return d;
};
e.parse = function(a) {
if (!(h || (h = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(a)) return null;
var b = new p();
b.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) b.region = a.toUpperCase();
if (a = RegExp.$3) b.variant = a.toLowerCase();
return b;
};
c = p.prototype;
c.isValid = function() {
return !!this.lang;
};
c.isKnown = function() {
var a = this.lang;
return !(!a || "zxx" === a);
};
c.toString = function(a) {
a = a || "_";
var b, d = this.lang || "zxx";
if (b = this.region) d += a + b;
if (b = this.variant) d += a + b;
return d;
};
c.getIcon = function() {
for (var a = 3, b, d, g = [ "variant", "region", "lang" ], n = []; 0 !== a--; ) if (b = g[a], 
d = this[b]) n.push(b), n.push(b + "-" + d.toLowerCase());
return n.join(" ");
};
c.isRTL = function() {
return !!l[String(this.lang).toLowerCase()];
};
c = null;
return e;
}({}, z, w));
q.register("$23", {
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
q.register("$10", function(e, c, k) {
e.init = function() {
function c(a) {
return f[a] || a;
}
function h(a, b, d, m) {
b = a.split(b);
for (var f = b.length; 0 !== f--; ) (a = b[f]) && null == m[a] && (d.push(a), m[a] = !0);
return d;
}
function l(a) {
return h(String(a || "").toLowerCase().replace(g, c), n, [], {});
}
function a(a, b) {
for (var f = [], m = {}, A, x = b.length, r = n; 0 !== x--; ) (A = b[x]) && h(String(A || "").toLowerCase().replace(g, c), r, f, m);
d[a] = f;
}
function b(a, b) {
var f = [], m = -1, g = d, n = g.length, r, c, h, u, v, E, l = a.length, e = b ? !0 : !1;
a: for (;++m < n; ) if (h = g[m], null != h && (u = h.length)) {
v = 0;
b: for (;v < l; v++) {
E = a[v];
for (r = 0; r < u; r++) if (c = h[r], 0 === c.indexOf(E)) continue b;
continue a;
}
f.push(e ? b[m] : m);
}
return f;
}
var d = [], g = /[^a-z0-9]/g, n = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/, f = q.require("$23", "flatten.json");
return {
split: l,
pull: function(a, d) {
return b(a, d);
},
find: function(a, d) {
return b(l(a), d);
},
add: function(a, b) {
d[a] = l(b);
},
push: function(b) {
a(d.length, b);
},
index: function(b, d) {
a(b, d);
},
size: function() {
return d.length;
},
clear: function() {
d = [];
},
remove: function(a) {
d[a] = null;
}
};
};
return e;
}({}, z, w));
q.register("$11", function(e, c, q) {
e.listen = function(e, h) {
function l() {
m[g ? "show" : "hide"]();
}
function a(a) {
s && y.setAttribute("size", 2 + a.length);
g = a;
l();
return a;
}
function b() {
n = null;
h(g);
}
function d(d) {
var f = y.value;
B && f === B && (f = "");
f !== g ? (n && clearTimeout(n), a(f), d ? n = setTimeout(b, d) : b()) : n && null == d && (clearTimeout(n), 
b());
}
var g, n, f = 150, y = e instanceof jQuery ? e[0] : e, B = c.attachEvent && y.getAttribute("placeholder"), s = 1 === Number(y.size), m = k('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
y.value = "";
d();
return !1;
});
a(y.value);
k(y).on("input", function() {
d(f);
return !0;
}).on("blur focus change", function() {
d(null);
return !0;
}).after(m);
l();
return {
delay: function(a) {
f = a;
return this;
},
ping: function(f) {
f ? (n && clearTimeout(n), f = y.value, B && f === B && (f = ""), a(f), b(), f = void 0) : f = d();
return f;
},
val: function(b) {
if (null == b) return g;
n && clearTimeout(n);
y.value = a(b);
l();
},
el: function() {
return y;
},
blur: function(a) {
return k(y).on("blur", a);
},
destroy: function() {
n && clearTimeout(n);
}
};
};
return e;
}({}, z, w));
q.register("$12", function(e, c, q) {
function p(a, b) {
this.$element = k(a);
this.options = b;
this.enabled = !0;
this.fixTitle();
}
e.init = function(a, b) {
var d = {
fade: !0,
offset: 5,
delayIn: h,
delayOut: l,
anchor: a.attr("data-anchor"),
gravity: a.attr("data-gravity") || "s"
};
b && (d = k.extend({}, d, b));
a.tipsy(d);
};
e.delays = function(a, b) {
h = a || 150;
l = b || 100;
};
e.kill = function() {
k("div.tipsy").remove();
};
e.text = function(a, b) {
b.data("tipsy").setTitle(a);
};
var h, l;
e.delays();
k(q.body).on("overlayOpened overlayClosing", function(a) {
e.kill();
return !0;
});
p.prototype = {
show: function() {
var a = this.getTitle();
if (a && this.enabled) {
var b = this.tip();
b.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
b[0].className = "tipsy";
b.remove().css({
top: 0,
left: 0
}).prependTo(q.body);
var a = (a = this.options.anchor) ? this.$element.find(a) : this.$element, a = k.extend({}, a.offset(), {
width: a[0].offsetWidth,
height: a[0].offsetHeight
}), d = b[0].offsetWidth, g = b[0].offsetHeight, n = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, f;
switch (n.charAt(0)) {
case "n":
f = {
top: a.top + a.height + this.options.offset,
left: a.left + a.width / 2 - d / 2
};
break;

case "s":
f = {
top: a.top - g - this.options.offset,
left: a.left + a.width / 2 - d / 2
};
break;

case "e":
f = {
top: a.top + a.height / 2 - g / 2,
left: a.left - d - this.options.offset
};
break;

case "w":
f = {
top: a.top + a.height / 2 - g / 2,
left: a.left + a.width + this.options.offset
};
}
2 == n.length && ("w" == n.charAt(1) ? f.left = a.left + a.width / 2 - 15 : f.left = a.left + a.width / 2 - d + 15);
b.css(f).addClass("tipsy-" + n);
b.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + n.charAt(0);
this.options.className && b.addClass("function" == typeof this.options.className ? this.options.className.call(this.$element[0]) : this.options.className);
b.addClass("in");
}
},
hide: function() {
this.tip().remove();
},
fixTitle: function() {
var a = this.$element, b = a.attr("title") || "";
(b || "string" !== typeof a.attr("original-title")) && a.attr("original-title", b).removeAttr("title");
},
getTitle: function() {
var a, b = this.$element, d = this.options;
this.fixTitle();
"string" == typeof d.title ? a = b.attr("title" == d.title ? "original-title" : d.title) : "function" == typeof d.title && (a = d.title.call(b[0]));
return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || d.fallback;
},
setTitle: function(a) {
var b = this.$element;
b.attr("default-title") || b.attr("default-title", this.getTitle());
null == a && (a = b.attr("default-title") || this.getTitle());
b.attr("original-title", a);
if (this.$tip) this.$tip.find(".tipsy-inner")[this.options.html ? "html" : "text"](a);
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
k.fn.tipsy = function(a) {
function b(b) {
var d = k.data(b, "tipsy");
d || (d = new p(b, k.fn.tipsy.elementOptions(b, a)), k.data(b, "tipsy", d));
return d;
}
function d() {
var d = b(this), f = a.delayIn;
d.hoverState = "in";
0 == f ? d.show() : (d.fixTitle(), setTimeout(function() {
"in" == d.hoverState && d.show();
}, f));
}
function g() {
var d = b(this), f = a.delayOut;
d.hoverState = "out";
0 == f ? d.hide() : (d.tip().removeClass("in"), setTimeout(function() {
"out" == d.hoverState && d.hide();
}, f));
}
a = k.extend({}, k.fn.tipsy.defaults, a);
a.live || this.each(function() {
b(this);
});
if ("manual" != a.trigger) {
var n = a.live ? "live" : "bind", f = "hover" == a.trigger ? "mouseleave" : "blur";
this[n]("hover" == a.trigger ? "mouseenter" : "focus", d)[n](f, g);
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
k.fn.tipsy.elementOptions = function(a, b) {
return k.metadata ? k.extend({}, b, k(a).metadata()) : b;
};
k.fn.tipsy.autoNS = function() {
return k(this).offset().top > k(q).scrollTop() + k(c).height() / 2 ? "s" : "n";
};
k.fn.tipsy.autoWE = function() {
return k(this).offset().left > k(q).scrollLeft() + k(c).width() / 2 ? "e" : "w";
};
k.fn.tipsy.autoBounds = function(a, b) {
return function() {
var d = b[0], g = 1 < b.length ? b[1] : !1, n = k(q).scrollTop() + a, f = k(q).scrollLeft() + a, h = k(this);
h.offset().top < n && (d = "n");
h.offset().left < f && (g = "w");
k(c).width() + k(q).scrollLeft() - h.offset().left < a && (g = "e");
k(c).height() + k(q).scrollTop() - h.offset().top < a && (d = "s");
return d + (g ? g : "");
};
};
return e;
}({}, z, w));
q.register("$35", function(e, c, k) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return q.require("$6", "string.js").trim(this, " \n\r\t");
});
e.html = function() {
function c() {
a = /[<>&]/g;
b = /(\r\n|\n|\r)/g;
d = /(?:https?):\/\/(\S+)/gi;
g = location.hostname;
c = null;
}
function h(a) {
return "&#" + a.charCodeAt(0) + ";";
}
function l(a, b) {
return '<a href="' + a + '" target="' + (b.indexOf(g) ? "_blank" : "_top") + '">' + b + "</a>";
}
var a, b, d, g;
return function(g, f) {
c && c();
var y = g.replace(a, h);
f && (y = y.replace(d, l).replace(b, "<br />"));
return y;
};
}();
return e;
}({}, z, w));
q.register("$36", function(e, c, k) {
function p() {}
var h, l, a = q.require("$22", "rtl.json");
e.init = function() {
return new p();
};
e.cast = function(a) {
return a instanceof p ? a : "string" === typeof a ? e.parse(a) : e.clone(a);
};
e.clone = function(a) {
var d, g = new p();
for (d in a) g[d] = a[d];
return g;
};
e.parse = function(a) {
h || (l = /[-_+]/, h = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(l).join("-");
if (!h.exec(a)) return null;
var d = new p();
d.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) d.script = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
if (a = RegExp.$3) d.region = a.toUpperCase();
if (a = RegExp.$4) d.variant = a.toLowerCase();
if (a = RegExp.$5) d.extension = a;
return d;
};
c = p.prototype;
c.isValid = function() {
return !!this.lang;
};
c.isKnown = function() {
var a = this.lang;
return !(!a || "zxx" === a);
};
c.toString = function(a) {
a = a || "-";
var d, g = this.lang || "zxx";
if (d = this.script) g += a + d;
if (d = this.region) g += a + d;
if (d = this.variant) g += a + d;
if (d = this.extension) g += a + d;
return g;
};
c.getIcon = function() {
for (var a = 4, d, g, c = [ "variant", "region", "script", "lang" ], f = []; 0 !== a--; ) if (d = c[a], 
g = this[d]) g.join && (g = g.join("-")), 1 === a && 3 === g.length ? f.push("region-m49") : f = f.concat([ d, d + "-" + g.toLowerCase() ]);
return f.join(" ");
};
c.isRTL = function() {
return !!a[String(this.script || this.lang).toLowerCase()];
};
c = null;
return e;
}({}, z, w));
q.register("$37", function(e, c, k) {
function p(a) {
c.console && console.error && console.error(a);
}
function h() {
p("Method not implemented");
}
function l() {}
function a(a) {}
l.prototype.toString = function() {
return "[Undefined]";
};
a.prototype._validate = function(a) {
var d, g, c = !0;
for (d in this) g = this[d], g === h ? (p(a + "." + d + "() must be implemented"), 
c = !1) : g instanceof l && (p(a + "." + d + " must be defined"), c = !1);
return c;
};
e.init = function(b, d) {
var g, c = new a();
if (b) for (g = b.length; 0 !== g--; ) c[b[g]] = h;
if (d) for (g = d.length; 0 !== g--; ) c[d[g]] = new l();
return c;
};
e.validate = function(a) {
var d = /function (\w+)\(/.exec(a.toString()) ? RegExp.$1 : "";
a.prototype._validate(d || "Object");
};
return e;
}({}, z, w));
q.register("$48", function(e, c, k) {
var p = c.requestAnimationFrame, h = c.cancelAnimationFrame, l = 0;
if (!p || !h) for (var a in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (p = c[a + "RequestAnimationFrame"]) if (h = c[a + "CancelAnimationFrame"] || c[a + "CancelRequestAnimationFrame"]) break;
p && h || (p = function(a) {
var g = b();
timeToCall = Math.max(0, 16 - (g - l));
nextTime = g + timeToCall;
timerId = c.setTimeout(function() {
a(nextTime);
}, timeToCall);
l = nextTime;
return timerId;
}, h = function(a) {
clearTimeout(a);
});
var b = Date.now || function() {
return new Date().getTime();
};
e.loop = function(a, b) {
function c() {
y = p(c, b);
a(f++);
}
var f = 0, y;
c();
return {
stop: function() {
y && h(y);
y = null;
}
};
};
return e;
}({}, z, w));
q.register("$45", function(e, c, k) {
function p(b, d, f, m) {
if (a) {
var g = f;
f = function(a) {
if ((a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType) return g(a);
};
}
b.addEventListener(d, f, m);
return {
unbind: function() {
b.removeEventListener(d, f, m);
}
};
}
function h(a) {
a.preventDefault();
a.stopPropagation();
return !1;
}
var l, a = !!c.navigator.msPointerEnabled, b = a ? "MSPointerDown" : "touchstart", d = a ? "MSPointerMove" : "touchmove", g = a ? "MSPointerUp" : "touchend";
e.ok = function(a) {
null == l && (l = "function" === typeof k.body.addEventListener);
l && a && a(e);
return l;
};
e.ms = function() {
return a;
};
e.dragger = function(a, f) {
function c(b) {
a.addEventListener(b, A[b], !1);
}
function m(b) {
a.removeEventListener(b, A[b], !1);
}
var A = {};
A[b] = function(a) {
n(a, function(d, m) {
m.type = b;
f(a, m, x);
});
c(d);
c(g);
return !0;
};
A[g] = function(a) {
m(d);
m(g);
n(a, function(b, d) {
d.type = g;
f(a, d, x);
});
return !0;
};
A[d] = function(a) {
n(a, function(b, m) {
m.type = d;
f(a, m, x);
});
return h(a);
};
c(b);
var x = {
kill: function() {
m(b);
m(d);
m(g);
a = x = f = null;
}
};
return x;
};
e.swiper = function(c, l, s) {
function m(a) {
c.addEventListener(a, u[a], !1);
}
function A(a) {
c.removeEventListener(a, u[a], !1);
}
function x() {
r && r.stop();
r = null;
}
var r, F, e, u = {}, v = [], E = [], k = [];
u[b] = function(a) {
F = !1;
x();
var b = f();
n(a, function(a, d) {
v[a] = b;
E[a] = d.clientX;
k[a] = d.clientY;
});
e = c.scrollLeft;
return !0;
};
u[g] = function(a) {
n(a, function(a, b) {
var d = f() - v[a], m = E[a] - b.clientX, d = Math.abs(m) / d;
l(d, m ? 0 > m ? -1 : 1 : 0);
});
e = null;
return !0;
};
u[d] = function(a) {
var b, d;
null == e || n(a, function(a, f) {
b = E[a] - f.clientX;
d = k[a] - f.clientY;
});
if (d && Math.abs(d) > Math.abs(b)) return F = !0;
b && (F = !0, c.scrollLeft = Math.max(0, e + b));
return h(a);
};
if (!a || s) m(b), m(d), m(g), a && (c.className += " mstouch");
return {
kill: function() {
A(b);
A(d);
A(g);
x();
},
swiped: function() {
return F;
},
ms: function() {
return a;
},
snap: function(b) {
a && !s && (c.style["-ms-scroll-snap-points-x"] = "snapInterval(0px," + b + "px)", 
c.style["-ms-scroll-snap-type"] = "mandatory", c.style["-ms-scroll-chaining"] = "none");
},
scroll: function(a, b, d) {
x();
var f = c.scrollLeft, v = a > f ? 1 : -1, m = Math[1 === v ? "min" : "max"], g = Math.round(16 * b * v);
return r = q.require("$48", "fps.js").loop(function(b) {
b && (f = Math.max(0, m(a, f + g)), c.scrollLeft = f, a === f && (x(), d && d(f)));
}, c);
}
};
};
e.start = function(a, d) {
return p(a, b, d, !1);
};
e.move = function(a, b) {
return p(a, d, b, !1);
};
e.end = function(a, b) {
return p(a, g, b, !1);
};
var n = e.each = function(b, d) {
if (a) (b.MSPOINTER_TYPE_TOUCH || "touch") === b.pointerType && d(0, b); else for (var f = -1, m = (b.originalEvent || b).changedTouches || []; ++f < m.length; ) d(f, m[f]);
}, f = Date.now || function() {
return new Date().getTime();
};
return e;
}({}, z, w));
q.register("$49", function(e, c, q) {
e.init = function(c) {
function h() {
d.style.top = String(-c.scrollTop) + "px";
return !0;
}
function l() {
var b = d;
b.textContent = c.value;
b.innerHTML = b.innerHTML.replace(/[ \t]/g, a).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function a(a) {
return '<span class="x' + a.charCodeAt(0).toString(16) + '">' + a + "</span>";
}
var b = c.parentNode, d = b.insertBefore(q.createElement("div"), c);
k(c).on("input", l).on("scroll", h);
k(b).addClass("has-mirror");
d.className = "ta-mirror";
var g = c.offsetWidth - c.clientWidth;
2 < g && (d.style.marginRight = String(g - 2) + "px");
l();
h();
return {
kill: function() {
k(c).off("input", l).off("scroll", h);
b.removeChild(d);
d = null;
k(b).removeClass("has-mirror");
}
};
};
return e;
}({}, z, w));
q.register("$29", function(e, c, k) {
function p(a, b) {
for (var d = 0, g = -1, n = b && c[b], f = h[a] || [], y = f.length; ++g < y; ) callback = f[g], 
"function" === typeof callback && (callback(n), d++);
return d;
}
var h = {}, l;
e.load = function(a, b, d) {
function g() {
y && (clearTimeout(y), y = null);
l && (l.onreadystatechange = null, l = l = l.onload = null);
a && (delete h[a], a = null);
}
function n(b, f) {
var c = l && l.readyState;
if (f || !c || "loaded" === c || "complete" === c) f || p(a, d), g();
}
function f() {
if (0 === p(a)) throw Error('Failed to load "' + (d || a) + '"');
g();
}
if (d && c[d]) "function" === typeof b && b(c[d]); else if (null != h[a]) h[a].push(b); else {
h[a] = [ b ];
var y = setTimeout(f, 4e3), l = k.createElement("script");
l.setAttribute("src", a);
l.setAttribute("async", "true");
l.onreadystatechange = n;
l.onload = n;
l.onerror = f;
l.onabort = g;
k.getElementsByTagName("head")[0].appendChild(l);
}
};
e.stat = function(a) {
var b;
if (!(b = l)) {
for (var d, c, h = k.getElementsByTagName("script"), f = -1, y = h.length; ++f < y; ) if (b = h[f].getAttribute("src")) if (d = b.indexOf("/lib/vendor"), 
-1 !== d) {
c = b.substr(0, d);
break;
}
b = l = c || "/static";
}
return b + a;
};
return e;
}({}, z, w));
q.register("$16", function(e, c, C) {
function p(a, b) {
a.setReadOnly(!1);
a.on("change", function(a, d) {
return b.val(d.getValue());
});
a.on("focus", function() {
return b.focus();
});
a.on("blur", function() {
return b.blur();
});
}
function h(a) {
a.off("change");
a.off("focus");
a.off("blur");
}
function l(a) {
h(a);
a.setReadOnly(!0);
a.setHighlightGutterLine(!1);
a.setHighlightActiveLine(!1);
}
function a(a, d) {
function c() {
this.HighlightRules = g;
}
var g = b(d), m = a.require, h = m("ace/lib/oop");
h.inherits(g, m("ace/mode/text_highlight_rules").TextHighlightRules);
h.inherits(c, m("ace/mode/text").Mode);
return new c();
}
function b(a) {
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
}, c = d(a);
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
function d(a) {
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

case n:
return g || "%%";
}
}
var g, n = "auto";
e.init = function(b, d, g) {
var e, m = !1, A = g || n, x = b.parentNode, r = x.appendChild(C.createElement("div"));
k(x).addClass("has-proxy has-ace");
q.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(c) {
if (r) {
if (!c) throw Error("Failed to load code editor");
e = c.edit(r);
var g = e.session, h = e.renderer;
e.$blockScrolling = Infinity;
e.setShowInvisibles(m);
e.setWrapBehavioursEnabled(!1);
e.setBehavioursEnabled(!1);
e.setHighlightActiveLine(!1);
g.setUseSoftTabs(!1);
h.setShowGutter(!0);
h.setPadding(10);
h.setScrollMargin(8);
g.setMode(a(c, A));
e.setValue(b.value, -1);
g.setUseWrapMode(!0);
d ? p(e, d) : l(e);
}
}, "ace");
return {
kill: function() {
e && (h(e), e.destroy(), e = null);
r && (x.removeChild(r), k(x).removeClass("has-proxy has-ace"), r = null);
return this;
},
disable: function() {
e && l(e);
d = null;
return this;
},
enable: function(a) {
d = a;
e && p(e, a);
return this;
},
resize: function() {
e && e.resize();
return this;
},
val: function(a) {
e && a !== e.getValue() && e.setValue(a, -1);
return this;
},
invs: function(a) {
a = a || !1;
m !== a && (m = a, e && e.setShowInvisibles(a));
return this;
},
strf: function(b) {
b = b || n;
b !== A && (A = b, e && e.session.setMode(a(c.ace, b)));
return this;
},
focus: function() {
return this;
}
};
};
e.strf = function(a, b) {
n = a;
g = b;
return e;
};
return e;
}({}, z, w));
q.register("$50", function(e, c, C) {
function p(a, d) {
function c() {
return d.val(a.getContent());
}
a.on("input", c);
a.on("change", c);
a.on("focus", function() {
return d.focus();
});
a.on("blur", function() {
return d.blur();
});
a.setMode("design");
}
function h(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function l(a) {
h(a);
a.setMode("readonly");
}
var a = 0;
e.load = function(a) {
var d = q.require("$29", "remote.js");
d.load(d.stat("/lib/tinymce.min.js"), a, "tinymce");
return e;
};
e.init = function(b, d) {
function c(a) {
B = a;
s = "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4);
return a.replace(/(<\/?)script/gi, "$1loco:script");
}
function n(a) {
f = a;
a._getContent = a.getContent;
a.getContent = function(a) {
a = this._getContent(a);
a = a.replace(/(<\/?)loco:script/gi, "$1script");
if (!s && "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4)) {
var b = a.substr(3, a.length - 7);
if (b === B || -1 === b.indexOf("</p>")) a = b;
}
return a;
};
a._setContent = a.setContent;
a.setContent = function(a, b) {
return this._setContent(c(a), b);
};
d ? (p(a, d), d.reset()) : l(a);
k(x).removeClass("loading");
}
var f, y = !1, B = "", s = !1, m = b.parentNode, A = m.parentNode, x = m.appendChild(C.createElement("div")), r = A.insertBefore(C.createElement("nav"), m);
r.id = "_tb" + String(++a);
k(m).addClass("has-proxy has-mce");
k(x).addClass("mce-content-body loading").html(c(b.value));
e.load(function(a) {
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
init_instance_callback: n
});
});
return {
val: function(a) {
a = c(a);
null == f ? (b.value = a, k(x).html(a)) : f.getContent() !== a && f.setContent(a);
d && d.val(a);
return this;
},
kill: function() {
f && (d && d.val(f.getContent()), h(f), f.destroy(), f = null);
x && (m.removeChild(x), k(m).removeClass("has-proxy has-mce"), x = null);
r && (A.removeChild(r), r = null);
return this;
},
enable: function(a) {
d = a;
f && p(f, a);
return this;
},
disable: function() {
f && l(f);
d = null;
return this;
},
focus: function() {
f && d && f.focus();
return this;
},
invs: function(a) {
a = a || !1;
y !== a && (y = a, k(m)[a ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return e;
}({}, z, w));
q.register("$46", function(e, c, C) {
function p(a) {
function b() {
e && (B.off("input", d), e = !1);
}
function d() {
var b = a.value;
b !== m && (B.trigger("changing", [ b, m ]), m = b);
}
function c() {
d();
e && A !== m && B.trigger("changed", [ m ]);
}
function h() {
l = a;
A = m;
e || (B.on("input", d), e = !0);
B.trigger("editFocus");
s.addClass("has-focus");
return !0;
}
function f() {
l === a && (l = null);
B.trigger("editBlur");
s.removeClass("has-focus");
e && (c(), b());
return !0;
}
var e = !1, B = k(a), s = k(a.parentNode), m = a.value, A;
B.on("blur", f).on("focus", h);
return {
val: function(b) {
m !== b && (a.value = b, B.triggerHandler("input"), m = b);
return !0;
},
kill: function() {
b();
B.off("blur", f).off("focus", h);
},
fire: function() {
m = null;
d();
},
ping: c,
blur: f,
focus: h,
reset: function() {
A = m = a.value;
}
};
}
function h(a) {
this.e = a;
}
var l;
e._new = function(a) {
return new h(a);
};
e.init = function(a) {
var b = new h(a);
a.disabled ? (a.removeAttribute("disabled"), b.disable()) : a.readOnly ? b.disable() : b.enable();
return b;
};
TextAreaPrototype = h.prototype;
TextAreaPrototype.destroy = function() {
this.unlisten();
var a = this.p;
a && (a.kill(), this.p = null);
this.e = null;
};
TextAreaPrototype.reload = function(a, b) {
var d = this.l;
d && !b && (this.disable(), d = null);
this.val(a || "");
b && !d && this.enable();
return this;
};
TextAreaPrototype.val = function(a) {
var b = this.e;
if (null == a) return b.value;
var d = this.l, c = this.p;
c && c.val(a);
d && d.val(a);
d || b.value === a || (b.value = a, k(b).triggerHandler("input"));
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
var a = this.p;
a ? a.focus() : k(this.e).focus();
};
TextAreaPrototype.focused = function() {
return l && l === this.el;
};
TextAreaPrototype.parent = function() {
return this.e.parentNode;
};
TextAreaPrototype.attr = function(a, b) {
var d = this.e;
if (1 === arguments.length) return d.getAttribute(a);
null == b ? d.removeAttribute(a) : d.setAttribute(a, b);
return this;
};
TextAreaPrototype.editable = function() {
return !!this.l;
};
TextAreaPrototype.enable = function() {
var a = this.p;
this.e.removeAttribute("readonly");
this.listen();
a && a.enable && a.enable(this.l);
return this;
};
TextAreaPrototype.disable = function() {
var a = this.p;
this.e.setAttribute("readonly", !0);
this.unlisten();
a && a.disable && a.disable();
return this;
};
TextAreaPrototype.listen = function() {
var a = this.l;
a && a.kill();
this.l = p(this.e);
return this;
};
TextAreaPrototype.unlisten = function() {
var a = this.l;
a && (a.kill(), this.l = null);
return this;
};
TextAreaPrototype.setInvs = function(a, b) {
var d = this.i || !1;
if (b || d !== a) this._i && (this._i.kill(), delete this._i), (d = this.p) ? d.invs && d.invs(a) : a && (this._i = q.require("$49", "mirror.js").init(this.e)), 
this.i = a;
return this;
};
TextAreaPrototype.getInvs = function() {
return this.i || !1;
};
TextAreaPrototype.setMode = function(a) {
var b = this.p, d = this.i || !1;
a !== (this.m || "") && (this.m = a, b && b.kill(), this.p = b = "code" === a ? q.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === a ? q.require("$50", "mce.js").init(this.e, this.l) : null, 
this.setInvs(d, !0), l && this.focus());
return this;
};
TextAreaPrototype.setStrf = function(a) {
this["%"] = a;
"code" === this.m && this.p.strf(a);
return this;
};
TextAreaPrototype.name = function(a) {
this.e.setAttribute("name", a);
return this;
};
TextAreaPrototype.placeholder = function(a) {
this.e.setAttribute("placeholder", a);
return this;
};
TextAreaPrototype.redraw = function() {
var a = this.p;
a && a.resize && a.resize();
};
TextAreaPrototype = null;
return e;
}({}, z, w));
q.register("$47", function(e, c, q) {
function p(a) {
var b = c.console;
b && b.error && b.error(a);
}
function h(a) {
var b = q.createElement("div");
a && b.setAttribute("class", a);
return b;
}
function l(a) {
return function() {
a.resize();
return this;
};
}
function a(a) {
return function(b) {
for (var d = b.target, f = d.$index; null == f && "DIV" !== d.nodeName && (d = d.parentElement); ) f = d.$index;
null != f && (b.stopImmediatePropagation(), a.select(f));
return !0;
};
}
function b(a) {
return function() {
a.redrawDirty() && a.redraw();
return !0;
};
}
function d(a) {
return function(b) {
var d;
d = b.keyCode;
if (40 === d) d = 1; else if (38 === d) d = -1; else return !0;
if (b.shiftKey || b.ctrlKey || b.metaKey || b.altKey) return !0;
a.selectNext(d);
b.stopPropagation();
b.preventDefault();
return !1;
};
}
function g(a, b, d) {
function f(a) {
p("row[" + a + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(c) {
var g = b || 0, h = d ? -1 : 1, v = a.rows || [];
c.sort(function(a, b) {
return h * (v[a] || f(a)).cellVal(g).localeCompare((v[b] || f(b)).cellVal(g));
});
};
}
function n(a) {
this.w = a;
}
function f(a) {
this.t = a;
this.length = 0;
}
function y(a, b, d) {
var f = q.createElement("div");
f.className = d || "";
this._ = f;
this.d = b || [];
this.i = a || 0;
this.length = b.length;
}
function B(a) {
this.live = a;
this.rows = [];
}
e.create = function(a) {
return new n(a);
};
var s = n.prototype;
s.init = function(f) {
var c = this.w, g = c.id, r = c.splity(g + "-thead", g + "-tbody"), n = r[0], r = r[1], e = [], u = [], v = [], E = [];
if (f) this.ds = f, this.idxs = u, this._idxs = null; else if (!(f = this.ds)) throw Error("No datasource");
n.css.push("wg-thead");
r.css.push("wg-tbody");
f.eachCol(function(a, b, d) {
v[a] = g + "-col-" + b;
E[a] = d || b;
});
for (var s = h(), B = -1, p = v.length, q = h("wg-cols"), C = n.splitx.apply(n, v); ++B < p; ) C[B].header(E[B]), 
q.appendChild(s.cloneNode(!1)).setAttribute("for", v[B]);
f.eachRow(function(a, b, d) {
e[a] = new y(a, b, d);
u[a] = a;
});
this.rows = e;
this.cols = q;
this.ww = null;
this.root = s = r.body;
this.head = n;
n.redraw = l(this);
n = r.fixed = C[0].bodyY() || 20;
c.lock().resize(n, r);
c.css.push("is-table");
c.restyle();
this.sc ? this._re_sort(p) : f.sort && f.sort(u);
this.redrawDirty();
this.render();
k(s).attr("tabindex", "-1").on("keydown", d(this)).on("mousedown", a(this)).on("scroll", b(this));
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
for (var a, b, d = [], f = this.rows || [], c = -1, g, h = this.idxs, v = h.length, n = this.idxr = {}, e = this.r, l = this._r, y = this.root, s = this.cols; ++c < v; ) {
0 === c % 100 && (a = s.cloneNode(!0), b = new B(a), b.h = 2200, b.insert(y), d.push(b));
g = h[c];
n[g] = c;
a = f[g];
if (null == a) throw Error("Render error, no data at [" + g + "]");
a.page = b;
b.rows.push(a);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = d;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == e ? null != l && (a = f[l]) && a.page && (delete this._r, this.select(l, !0)) : (a = f[e]) && a.page ? this.select(e, !0) : (this.deselect(), 
this._r = e);
return this;
};
s.resize = function() {
var a = -1, b = this.ww || (this.ww = []), d = this.w, f = d.cells[0], c = f.body.childNodes, g = c.length, h = this.pages || [], v = h.length;
for (d.redraw.call(f); ++a < g; ) b[a] = c[a].style.width;
if (v) {
d = this.mx;
for (a = this.mn; a <= d; a++) h[a].widths(b);
this.redrawDirty() && this.redraw();
}
};
s.redrawDirty = function() {
var a = !1, b = this.root, d = b.scrollTop, b = b.clientHeight;
this.sy !== d && (a = !0, this.sy = d);
this.vh !== b && (a = !0, this.vh = b);
return a;
};
s.redraw = function() {
for (var a = 0, b = -1, d = null, f = null, c = this.ww, g = this.sy, h = this.vh, v = this.mn, n = this.mx, e = Math.max(0, g - 100), g = h + g + 100, l = this.pages || [], y = l.length; ++b < y && !(a > g); ) h = l[b], 
a += h.height(), a < e || (null === d && (d = b), f = b, h.rendered || h.render(c));
if (v !== d) {
if (null !== v && d > v) for (b = v; b < d; b++) {
h = l[b];
if (!h) throw Error("Shit!");
h.rendered && h.sleep();
}
this.mn = d;
}
if (n !== f) {
if (null !== n && f < n) for (b = n; b > f; b--) h = l[b], h.rendered && h.sleep();
this.mx = f;
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
s.next = function(a, b, d) {
null == d && (d = this.r || 0);
var f = this.idxs, c = f.length, g = (this.idxr || {})[d];
for (d = g; d !== (g += a) && !(0 <= g && c > g); ) if (b && c) g = 1 === a ? -1 : c, 
b = !1; else return null;
d = f[g];
return null == d || null == this.rows[d] ? (p("Bad next: [" + g + "] does not map to data row"), 
null) : d;
};
s.selectNext = function(a, b, d) {
a = this.next(a, b);
null != a && this.r !== a && this.select(a, d);
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
var d = this.rows[a], f = d && d.page;
if (!f) return this.deselect(!1), p("Row is filtered out"), this;
this.deselect(!0);
var c, g = this.w.cells[1];
f.rendered || (c = f.top(), g.scrollY(c), this.redrawDirty() && this.redraw());
if (!d.rendered) return f.rendered || p("Failed to render page"), p("Row [" + d.i + "] not rendered"), 
this;
f = d.cells();
k(f).addClass("selected");
this.r = a;
b || (c = g.scrollY(), k(this.root).focus(), c !== g.scrollY() && g.scrollY(c));
g.scrollTo(f[0], !0);
this.w.fire("wgRowSelect", [ a, d.data() ]);
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
for (var b, d = -1, f = this.rows || [], c = this.idxs || [], g = c.length; ++d < g; ) b = c[d], 
a(f[b], d, b);
return this;
};
s.sortable = function(a) {
var b = this.sc || (this.sc = new f(this));
b.has(a) || b.add(a);
return this;
};
s._re_sort = function(a) {
var b = -1, d = this.sc, c = d.active;
for (this.sc = d = new f(this); ++b < a; ) d.add(b);
c && (b = this.head.indexOf(c.id), -1 === b && (b = Math.min(c.idx, a - 1)), this.sort(b, c.desc));
return this;
};
s._sort = function(a, b) {
b ? (this.s = b, b(a)) : (b = this.s) && b(a);
return a;
};
s.sort = function(a, b) {
this._sort(this.idxs, g(this, a, b));
this.sc.activate(a, b);
return this;
};
s = null;
s = f.prototype;
s.has = function(a) {
return null != this[a];
};
s.add = function(a) {
var b = this, d = b.t.head.cells[a];
b[a] = {
desc: null,
idx: a,
id: d.id
};
b.length++;
d.addClass("wg-sortable").on("click", function(d) {
if ("header" === d.target.nodeName.toLowerCase()) return d.stopImmediatePropagation(), 
b.toggle(a), !1;
});
return b;
};
s.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
s.activate = function(a, b) {
var d, f;
d = this.active;
var c = this[a], g = this.t.head.cells;
d && (f = g[d.idx]) && (f.removeClass(d.css), d !== c && f.restyle());
(f = g[a]) ? (c.desc = b, this.active = c, d = "wg-" + (b ? "desc" : "asc"), f.addClass(d).restyle(), 
c.css = d) : this.active = null;
return this;
};
s = null;
s = y.prototype;
s.render = function(a) {
var b, d = [], f = this._, c = this.length;
if (f) {
for (this.c = d; 0 !== c--; ) b = f.cloneNode(!1), d[c] = this.update(c, b), b.$index = this.i, 
a[c].appendChild(b);
this._ = null;
} else for (d = this.c; 0 !== c--; ) a[c].appendChild(d[c]);
this.rendered = !0;
return this;
};
s.update = function(a, b) {
var d = b || this.c[a] || {}, f = (this.d[a] || function() {})() || " ";
null == f.innerHTML ? d.textContent = f : d.innerHTML = f.innerHTML;
return d;
};
s.cells = function() {
return this.c || [ this._ ];
};
s.data = function() {
for (var a = -1, b = [], d = this.length; ++a < d; ) b[a] = this.cellVal(a);
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
s = B.prototype;
s.size = function() {
return this.rows.length;
};
s.insert = function(a) {
var b = this.h, d = h("wg-dead");
d.style.height = String(b) + "px";
a.appendChild(d);
return this.dead = d;
};
s.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
s.height = function() {
var a = this.h;
null == a && (this.h = a = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
a || p("row has zero height");
return a;
};
s.render = function(a) {
for (var b, d = -1, f = this.rows, c = f.length, g = this.dead, h = this.live, v = h.childNodes; ++d < c; ) b = f[d], 
b.rendered || b.render(v);
c = a.length;
for (d = 0; d < c; d++) v[d].style.width = a[d];
g.parentNode.replaceChild(h, g);
this.rendered = !0;
this.h = null;
return this;
};
s.sleep = function() {
var a = this.height(), b = this.live, d = this.dead;
d.style.height = String(a) + "px";
b.parentNode.replaceChild(d, b);
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
for (var b = this.live.childNodes, d = a.length; 0 !== d--; ) b[d].style.width = a[d];
return this;
};
s.destroy = function() {
var a = this.rendered ? this.live : this.dead, b = this.rows, d = b.length;
for (a.parentNode.removeChild(a); 0 !== d--; ) b[d].destroy();
};
s = null;
return e;
}({}, z, w));
q.register("$38", function(e, c, C) {
function p(a, b) {
var d = a.id, f = d && m[d], c = f && f.parent();
if (!f || !c) return null;
var g = c.dir === s, d = g ? "X" : "Y", h = "page" + d, g = g ? B : y, n = g(c.el), d = b["offset" + d], e = c.el, l = e.className;
null == d && (d = b[h] - g(a));
d && (n += d);
e.className = l + " is-resizing";
return {
done: function() {
e.className = l;
},
move: function(a) {
c.resize(a[h] - n, f);
return !0;
}
};
}
function h(b, d) {
function f() {
k(C).off("mousemove", c);
x && (x.done(), x = null);
return !0;
}
function c(a) {
x ? x.move(a) : f();
return !0;
}
if (x) return !0;
x = p(b.target, b);
if (!x) return !0;
k(C).one("mouseup", f).on("mousemove", c);
return a(b);
}
function l(a, b) {
var d = b.type;
"touchmove" === d ? x && x.move(b) : "touchstart" === d ? x = p(a.target, b) : "touchend" === d && x && (x.done(), 
x = null);
}
function a(a) {
a.stopPropagation();
a.preventDefault();
return !1;
}
function b(a) {
var b = A;
b && b.redraw();
a && a.redraw();
return A = a;
}
function d(a, d) {
var f = k(d).on("editFocus", function() {
f.trigger("wgFocus", [ b(a) ]);
}).on("editBlur", function() {
f.trigger("wgBlur", [ b(null) ]);
});
}
function g(a) {
var b = a.id, d = a.className;
this.id = b;
this.el = a;
this.pos = this.index = 0;
this.css = [ d || "wg-root", "wg-cell" ];
this._cn = d;
m[b] = this;
this.clear();
}
var n = q.include("$44", "html.js") || q.include("$2", "html.js", !0), f = q.require("$21", "dom.js"), y = f.top, B = f.left, s = 1, m = {}, A, x = !1;
e.init = function(a) {
var b = new g(a);
b.redraw();
q.require("$45", "touch.js").ok(function(b) {
b.dragger(a, l);
});
k(a).on("mousedown", h);
return b;
};
c = g.prototype;
c.fire = function(a, b) {
var d = k.Event(a);
d.cell = this;
k(this.el).trigger(d, b);
return this;
};
c.each = function(a) {
for (var b = -1, d = this.cells, f = d.length; ++b < f; ) a(d[b], b);
return this;
};
c.indexOf = function(a) {
return (a = m[a.id || String(a)]) && a.pid === this.id ? a.index : -1;
};
c.on = function() {
return this.$("on", arguments);
};
c.off = function() {
return this.$("off", arguments);
};
c.find = function(a) {
return k(this.el).find(a);
};
c.$ = function(a, b) {
k.fn[a].apply(k(this.el), b);
return this;
};
c.addClass = function(a) {
this.css.push(a);
return this;
};
c.removeClass = function(a) {
a = this.css.indexOf(a);
-1 !== a && this.css.splice(a, 1);
return this;
};
c.parent = function() {
return this.pid && m[this.pid];
};
c.splitx = function() {
return this._split(s, arguments);
};
c.splity = function() {
return this._split(2, arguments);
};
c._split = function(a, b) {
(this.length || this.field) && this.clear();
for (var d = -1, c, v = b.length, h = 1 / v, n = 0; ++d < v; ) {
c = f.el();
this.body.appendChild(c);
for (var e = c, l = b[d], y = l, s = 1; m[l]; ) l = y + "-" + ++s;
e.id = l;
c = new g(c);
c.index = d;
c.pid = this.id;
c._locale(this.lang, this.rtl);
c.pos = n;
n += h;
this.cells.push(c);
this.length++;
}
this.dir = a;
this.redraw();
return this.cells;
};
c.destroy = function() {
this.clear();
delete m[this.id];
var a = this.el;
a.innerHTML = "";
this.body = null;
a.className = this._cn || "";
k(a).off();
return this;
};
c.exists = function() {
return this === m[this.id];
};
c.clear = function() {
for (var a = this.el, b = this.cells, d = this.field, c = this.body, v = this.nav, g = this.length || 0; 0 !== g--; ) delete m[b[g].destroy().id];
this.cells = [];
this.length = 0;
v && (a.removeChild(v), this.nav = null);
c && (d && (n.ie() && k(c).triggerHandler("blur"), d.destroy(), this.field = null), 
this.table && (this.table = null), a === c.parentNode && a.removeChild(c));
this.body = a.appendChild(f.el("", "wg-body"));
this._h = null;
return this;
};
c.resize = function(a, b) {
if (!b && (b = this.cells[1], !b)) return;
var d = b.index, f = this.cells, c = k(this.el)[this.dir === s ? "width" : "height"](), g = f[d + 1], d = f[d - 1];
pad = (b.body || b.el.firstChild).offsetTop || 0;
max = (g ? g.pos * c : c) - pad;
min = d ? d.pos * c : 0;
b.pos = Math.min(max, Math.max(min, a)) / c;
this.redraw();
return this;
};
c.distribute = function(a) {
for (var b = -1, d = 0, f, c = this.cells, g = a.length; ++b < g && (f = c[++d]); ) f.pos = Math.max(0, Math.min(1, a[b]));
this.redraw();
return this;
};
c.distribution = function() {
for (var a = [], b = 0, d = this.cells, f = d.length - 1; b < f; ) a[b] = d[++b].pos;
return a;
};
c.restyle = function() {
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
c.redraw = function(a) {
this.restyle();
var b = this.el, d = this.body, f = this.field;
if (d) {
var c, g = b.clientWidth || 0, h = b.clientHeight || 0, n = d.offsetTop || 0, h = n > h ? 0 : h - n;
this._h !== h && (this._h = h, d.style.height = String(h) + "px", c = f);
this._w !== g && (this._w = g, c = f);
c && c.redraw();
}
d = this.length;
g = 1;
h = this.nav;
for (n = 2 === this.dir ? "height" : "width"; 0 !== d--; ) f = this.cells[d], h ? c = 1 : (f.fixed && (f.pos = f.fixed / k(b)[n]()), 
c = g - f.pos, g = f.pos), f.el.style[n] = String(100 * c) + "%", f.redraw(a);
return this;
};
c.contents = function(a, b) {
var d = this.el, c = this.body;
if (null == a) return c.innerHTML;
this.length ? this.clear() : c && (d.removeChild(c), c = null);
c || (this.body = c = d.appendChild(f.el("", b || "wg-content")), this._h = null, 
(d = this.lang) && this._locale(d, this.rtl, !0));
"string" === typeof a ? k(c)._html(a) : a && this.append(a);
this.redraw();
return this;
};
c.textarea = function(a, b) {
var c = this.field;
if (c) {
var g = c.editable();
c.reload(a, b);
g !== b && this.restyle();
} else this.length && this.clear(), g = f.el("textarea"), g.setAttribute("wrap", "virtual"), 
g.value = a, this.contents(g), c = q.require("$46", "field.js")._new(g)[b ? "enable" : "disable"](), 
d(this, g), this.field = c, this.restyle();
this.lang || this.locale("en");
return c;
};
c.locale = function(a) {
a = q.require("$36", "locale.js").cast(a);
return this._locale(String(a), a.isRTL());
};
c._locale = function(a, b, d) {
var c = this.body;
if (d || a !== this.lang) this.lang = a, c && c.setAttribute("lang", a);
if (d || b !== this.rtl) this.rtl = b, c && c.setAttribute("dir", b ? "RTL" : "LTR");
return this;
};
c.editable = function() {
var a = this.field;
if (a) return a.editable() ? a : null;
var b = this.cells, d = b.length, c = this.navigated();
if (null != c) return b[c].editable();
for (;++c < d; ) {
for (c = 0; c < d; d++) ;
if (a = b[c].editable()) return a;
}
};
c.eachTextarea = function(a) {
var b = this.field;
b ? a(b) : this.each(function(b) {
b.eachTextarea(a);
});
return this;
};
c.append = function(a) {
a && (a.nodeType ? n.init(this.body.appendChild(a)) : n.init(k(a).appendTo(this.body)));
return this;
};
c.prepend = function(a) {
var b = this.body;
if (a.nodeType) {
var d = b.firstChild;
n.init(d ? b.insertBefore(a, d) : b.appendChild(a));
} else n.init(k(a).prependTo(b));
return this;
};
c.before = function(a) {
var b = this.body;
a.nodeType ? n.init(this.el.insertBefore(a, b)) : n.init(k(a).insertBefore(b));
return this;
};
c.header = function(a, b) {
if (null == a && null == b) return this.el.getElementsByTagName("header")[0];
this.t = f.txt(a || "");
this.el.insertBefore(f.el("header", b), this.body).appendChild(this.t);
this.redraw();
return this;
};
c.title = function(a) {
var b = this.t;
if (b) return b.nodeValue = a || "", b;
this.header(a);
return this.t;
};
c.titled = function() {
var a = this.t;
return a && a.nodeValue;
};
c.bodyY = function() {
return y(this.body, this.el);
};
c.scrollY = function(a) {
if (J === a) return this.body.scrollTop;
this.body.scrollTop = a;
};
c.tabulate = function(a) {
var b = this.table;
b ? b.clear() : b = q.require("$47", "wgtable.js").create(this);
b.init(a);
return this.table = b;
};
c.lock = function() {
this.body.className += " locked";
return this;
};
c.scrollTo = function(a, b) {
var d, c = this.body;
d = c.scrollTop;
var f = y(a, c);
if (d > f) d = f; else {
var g = c.clientHeight, f = f + k(a).outerHeight();
if (g + d < f) d = f - g; else return;
}
b ? c.scrollTop = d : k(c).stop(!0).animate({
scrollTop: d
}, 250);
};
c.navigize = function(b, d) {
function c(a) {
var b = v[a], d = e[a], f = k(b.el).show();
d.addClass("active");
n = a;
l.data("idx", a);
b.fire("wgTabSelect", [ a ]);
return f;
}
var g = this, v = g.cells, h = g.nav, n, e = [];
h && g.el.removeChild(h);
var h = g.nav = g.el.insertBefore(f.el("nav", "wg-tabs"), g.body), l = k(h).on("click", function(b) {
var d = k(b.target).data("idx");
if (null == d) return !0;
if (null != n) {
var f = e[n];
k(v[n].el).hide();
f.removeClass("active");
}
c(d);
g.redraw();
return a(b);
});
null == d && (d = l.data("idx") || 0);
g.each(function(a, d) {
e[d] = k('<a href="#' + a.id + '"></a>').data("idx", d).text(b[d]).appendTo(l);
a.pos = 0;
k(a.el).hide();
});
c(v[d] ? d : 0);
g.lock();
g.redraw();
return g;
};
c.navigated = function() {
var a = this.nav;
if (a) return k(a).data("idx");
};
c = null;
return e;
}({}, z, w));
q.register("$24", function(e, c, C) {
function p(a) {
var b = [];
a && (a.saved() || b.push("po-unsaved"), a.fuzzy() ? b.push("po-fuzzy") : a.flagged() && b.push("po-flagged"), 
a.valid() || b.push("po-error"), a.translation() || b.push("po-empty"), a.comment() && b.push("po-comment"));
return b.join(" ");
}
function h(a, b, d) {
b = k(a.title(b).parentNode);
var c = b.find("span.lang");
d ? (d = q.require("$36", "locale.js").cast(d), c.length || (c = k("<span></span>").prependTo(b)), 
c.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (c.remove(), 
d = "en");
a.locale(d);
return b;
}
function l(a, b, d) {
b.on("click", function(b) {
var c = a.fire(d, [ b.target ]);
c || b.preventDefault();
return c;
});
}
function a() {
this.dirty = 0;
}
q.require("$3", "number.js");
var b = "poUpdate", d = "changing", g = "changed", n = 0, f = 1, y = 2, B = 3, s = 4, m = 5, A, x, r = q.require("$35", "string.js").html, z = q.require("$6", "string.js").sprintf;
e.extend = function(b) {
return b.prototype = new a();
};
e.localise = function(a) {
x = a;
return e;
};
var w = function() {
var a = C.createElement("p"), b = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
a.innerHTML = d.replace(b, "data-x-loco-$1=");
var c = a.textContent.trim();
return c ? c.replace("data-x-loco-", "") : d.trim();
};
}(), u = a.prototype = q.require("$37", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
u.init = function() {
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
u.t = function() {
return this.$t || x || q.require("$1", "t.js").init();
};
u.localise = function(a) {
a || (a = this.t());
var b = [];
b[n] = a._x("Source text", "Editor") + ":";
b[B] = a._x("%s translation", "Editor") + ":";
b[s] = a._x("Context", "Editor") + ":";
b[m] = a._x("Comments", "Editor") + ":";
b[f] = a._x("Single", "Editor") + ":";
b[y] = a._x("Plural", "Editor") + ":";
b[6] = a._x("Untranslated", "Editor");
b[7] = a._x("Translated", "Editor");
b[8] = a._x("Toggle Fuzzy", "Editor");
b[9] = a._x("Suggest translation", "Editor");
this.labels = b;
this.$t = a;
return this;
};
u.setRootCell = function(a) {
function b(a) {
d.redraw(!0, a);
return !0;
}
var d = q.require("$38", "wingrid.js").init(a);
k(c).on("resize", b);
this.redraw = b;
k(a).on("wgFocus wgBlur", function(a, b) {
a.stopPropagation();
A = b;
});
this.destroy = function() {
d.destroy();
k(c).off("resize", b);
};
this.rootDiv = a;
return d;
};
u.$ = function() {
return k(this.rootDiv);
};
u.setListCell = function(a) {
var b = this;
b.listCell = a;
a.on("wgRowSelect", function(a, d) {
b.loadMessage(b.po.row(d));
return !0;
}).on("wgRowDeselect", function(a, d, c) {
c || b.loadNothing();
return !0;
});
};
u.setSourceCell = function(a) {
this.sourceCell = a;
};
u.setTargetCell = function(a) {
this.targetCell = a;
};
u.next = function(a, b, d) {
for (var c = this.listTable, f = c.selected(), g = f, h, n = this.po; null != (f = c.next(a, d, f)); ) {
if (g === f) {
f = null;
break;
}
if (b && (h = n.row(f), h.translated(0))) continue;
break;
}
null != f && c.select(f, !0);
return f;
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
var a = -1, b = this.po.rows, d = b.length, c = this.dict;
for (c.clear(); ++a < d; ) c.add(a, b[a].toText());
};
u.filtered = function() {
return this.lastSearch || "";
};
u.filter = function(a, b) {
var d, c = this.listTable, f = this.lastFound, g = this.lastSearch;
if (a) {
if (g === a) return f || 0;
if (g && !f && 0 === a.indexOf(g)) return 0;
d = this.dict.find(a);
}
this.lastSearch = g = a;
this.lastFound = f = d ? d.length : this.po.length;
d ? c.filter(d) : c.unfilter();
b || this.fire("poFilter", [ g, f ]);
return f;
};
u.countFiltered = function() {
return this.lastSearch ? this.lastFound : this.po.length;
};
u.unsave = function(a, b) {
var d = !1;
if (a) {
if (d = a.saved(b)) this.dirty++, a.unsave(b), this.fire("poUnsaved", [ a, b ]);
this.markUnsaved(a);
}
return d;
};
u.markUnsaved = function(a) {
var b = this.po.indexOf(a);
if ((b = this.listTable.tr(b)) && b.length) {
var d = b[0].className;
a = d.replace(/(?:^| +)po-[a-z]+/g, "") + " " + p(a);
a !== d && k(b).attr("class", a);
}
};
u.save = function(a) {
var b = this.po;
if (this.dirty || a) b.each(function(a, b) {
b.save();
}), this.listCell.find("div.po-unsaved").removeClass("po-unsaved"), this.dirty = 0, 
this.fire("poSave", []);
return b;
};
u.fire = function(a, b) {
var d = this.handle;
if (d && d[a] && !1 === d[a].apply(this, b || [])) return !1;
d = k.Event(a);
this.$().trigger(d, b);
return !d.isDefaultPrevented();
};
u.on = function(a, b) {
this.$().on(a, b);
return this;
};
u.getSorter = function() {
return null;
};
u.reload = function() {
var a = this, b, d = a.listCell, c = a.listTable, f = a.po, g = f && f.locale(), h = g && g.isRTL(), n = f && f.length || 0;
if (!f || !f.row) return d && d.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = g;
a.lastSearch && (a.lastSearch = "", a.lastFound = n, a.fire("poFilter", [ "", n ]));
c && (b = c.thead().distribution());
a.listTable = c = d.tabulate({
eachCol: function(b) {
var d, c, f = a.getListColumns(), g = a.getListHeadings();
for (c in f) d = f[c], b(d, c, g[d]);
},
eachRow: function(b) {
f.each(function(d, c) {
a.validate(c);
b(c.idx, a.getListEntry(c), p(c));
});
},
sort: a.getSorter()
});
var e, d = a.getListColumns();
for (e in d) c.sortable(d[e]);
b && c.thead().distribute(b);
c.tbody().$(h ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad", []);
return !!n;
};
u.load = function(a, b) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== b ? this.listTable.selectRow(b || 0) : this.active && this.unloadActive());
};
u.pasteMessage = function(a) {
var b, d = 0;
this.validate(a);
this.active === a && ((b = this.sourceCell) && b.eachTextarea(function(b) {
b.val(a.source(null, d++));
}), (b = this.contextCell) && b.eachTextarea(function(b) {
b.val(a.context());
}), b = this.targetCell) && (d = 0, b.eachTextarea(function(b) {
b.val(a.translation(d++));
}));
this.updateListCell(a, "source");
this.updateListCell(a, "target");
return this;
};
u.reloadMessage = function(a) {
var b = this.sourceCell, d = this.targetCell, c;
this.pasteMessage(a);
b && this.setSrcMeta(a, b) && b.redraw();
d && (c = d.navigated() || 0, c = this.setTrgMeta(a, c, d), !b && this.setSrcMeta(a, d) && (c = !0), 
c && (d.redraw(), this.markUnsaved(a)));
return this;
};
u.setStatus = function() {
return null;
};
u.setSrcMeta = function(a, b) {
var d = [], c, f = !1, g = this.$smeta, h = this.labels, n = [], e = a.tags(), m = e && e.length;
if (c = a.context()) n.push("<span>" + r(h[s]) + "</span>"), n.push("<mark>" + r(c) + "</mark>");
if (m && this.getTag) for (n.push("<span>Tagged:</span>"); 0 <= --m; ) (c = this.getTag(e[m])) && n.push('<mark class="tag">' + r(c.mod_name) + "</mark>");
n.length && d.push(n.join(" "));
if (this.getMono() && (c = a.refs()) && (e = c.split(/\s/), m = e.length)) {
for (n = []; 0 <= --m; ) c = e[m], n.push("<code>" + r(c) + "</code>");
d.push('<p class="has-icon icon-file">' + n.join(" ") + "</p>");
}
(c = a.notes()) && d.push('<p class="has-icon icon-info">' + r(c, !0) + "</p>");
d.length ? (g || (g = b.find("div.meta"), g.length || (g = k('<div class="meta"></div>').insertAfter(b.header())), 
l(this, g, "poMeta"), this.$smeta = g), g.html(d.join("\n")).show(), f = !0) : g && g.text() && (g.text("").hide(), 
f = !0);
return f;
};
u.setTrgMeta = function(a, b, d) {
var c, f = [];
c = !1;
var g = this.$tmeta;
if (b = (a = a.errors(b)) && a.length) {
for (c = 0; c < b; c++) f.push('<p class="has-icon icon-warn">' + r(a[c], !0) + ".</p>");
g || (g = d.find("div.meta"), g.length || (g = k('<div class="meta"></div>').insertAfter(d.header())), 
this.$tmeta = g);
g.html(f.join("\n")).show();
c = !0;
} else g && g.text() && (g.text("").hide(), c = !0);
return c;
};
u.loadMessage = function(a) {
function c(a) {
if ("=" === a.charAt(0)) {
var b = a.split(" ");
a = b[0].substring(1);
b[0] = [ "Zero", "One", "Two" ][Number(a)] || a;
a = b.join(" ");
}
return a;
}
function e(b, d) {
var g = J, m = L[n];
b.off();
b.titled() !== m && h(b, m, d || "en");
m = !1;
r.setSrcMeta(a, b) && (m = !0);
if (a.plural()) {
var m = -1, s = [], k = [], B = b.id + "-", p = a.sourceForms() || d && d.plurals || [ "One", "Other" ], q = p.length;
if (2 !== q || "=" === p[0].charAt(0) && "=1" !== p[0]) for (;++m < q; ) s[m] = B + String(m), 
k[m] = c(p[m].split(" ", 1)[0]) + ":"; else s = [ B + "-0", B + "-1" ], k = [ L[f], L[y] ];
b.splity.apply(b, s);
b.each(function(b, d) {
b.header(k[d]).textarea(a.source(null, d), g).setStrf(D).setMode(u).setInvs(w);
});
b.lock();
g && b.each(function(a, b) {
l(a, b);
});
} else m && b.redraw(), b.textarea(a.source(), g).setStrf(D).setMode(u).setInvs(w), 
g && l(b, 0);
}
function l(c, f) {
c.on(d, function(b, d) {
a.source(d, f);
0 === f && r.updateListCell(a, "source");
r.unsave(a, f);
}).on(g, function() {
0 === f && r.po.reIndex(a);
r.dict && r.rebuildSearch();
r.fire(b, [ a ]);
});
}
function k(b, d, f) {
M && b.eachTextarea(function(a) {
a.ping();
});
b.off();
var g = d.isKnown() && d.label || "Target", g = z(L[B], g);
b.titled() !== g && h(b, g, d);
g = !1;
!this.sourceCell && r.setSrcMeta(a, b) && (g = !0);
r.setTrgMeta(a, f, b) && (g = !0);
r.setStatus(a, f);
if (1 !== d.nplurals && a.pluralized()) {
var n = [], e = [], l = b.id + "-", m = a.targetForms() || d.plurals || [ "One", "Other" ], g = m.length, y = function(a) {
e.push(c(m[a] || "Form " + a));
n.push(l + String(a));
};
for (a.eachMsg(y); (d = n.length) < g; ) y(d);
b.splitx.apply(b, n);
b.each(function(b, d) {
var c = M && !a.disabled(d);
b.textarea(a.translation(d), c).setStrf(D).setMode(u).setInvs(w);
M && p(b, d);
});
b.navigize(e, f || null).on("wgTabSelect", function(d, c) {
var f = M && d.cell.editable();
f && f.focus();
r.setTrgMeta(a, c, b);
r.setStatus(a, c);
r.fire("poTab", [ c ]);
});
} else g && b.redraw(), b.textarea(a.translation(), M && !a.disabled(0)).setStrf(D).setMode(u).setInvs(w), 
M && p(b, 0);
}
function p(c, f) {
function h() {
n = null;
r.validate(a);
var b = a.errors(f).join(" ");
e !== b && (e = b, r.setTrgMeta(a, f, c) && c.redraw());
}
var n, e = a.errors(f).join(" ");
c.on(d, function(b, d, c) {
n && (clearTimeout(n), n = null);
a.translate(d, f);
0 === f && r.updateListCell(a, "target");
a.fuzzy(f) ? r.fuzzy(!1, a, f) : r.unsave(a, f);
"" === d ? (r.fire("poEmpty", [ !0, a, f ]), r.setStatus(a, f)) : "" === c && (r.fire("poEmpty", [ !1, a, f ]), 
r.setStatus(a, f));
n = setTimeout(h, e ? 300 : 1e3);
}).on(g, function() {
r.dict && r.rebuildSearch();
r.fire(b, [ a ]);
});
}
function q(c) {
c.off();
var f = L[s];
c.titled() !== f && (h(c, f), r.setStatus(null));
c.textarea(a.context(), !0).setMode(u).setInvs(w);
W && c.on(d, function(b, d) {
a.context(d);
r.updateListCell(a, "source");
r.unsave(a, N);
}).on(g, function() {
r.po.reIndex(a);
r.dict && r.rebuildSearch();
r.fire(b, [ a ]);
});
}
function x(b) {
var c = L[m];
b.titled() !== c && h(b, c);
b.off().on(d, function(b, d) {
a.comment(d);
r.fire("poComment", [ a, d ]);
r.unsave(a, N);
}).textarea(a.comment(), !0);
}
var r = this, u = r.mode, C = a.isHTML(), w = r.inv || !1, G = this.fmt || null, D = a.format() || null, I = a.is(r.active), N = 0, S = r.sourceCell, R = r.targetCell, T = r.contextCell, U = r.commentCell, M = r.editable.target, J = r.editable.source, W = r.editable.context, O = A, X = r.sourceLocale, V = r.targetLocale, L = r.labels;
r.html !== C && (r.html = C, "code" !== r.mode && (u = C ? "html" : "", r.setMode(u)));
r.active = a;
S && e(S, X);
T && q(T);
R && V && (N = R.navigated() || 0, k(R, V, N));
U && x(U);
O && (O.exists() || (O = O.parent()), (C = O.editable()) && C.focus());
G !== D && (this.fmt = D);
I || r.fire("poSelected", [ a, N ]);
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
var a, b = this.t(), d = this.mode || "", c = this.inv || !1, f = this.fmt;
this.unloadActive();
this.setStatus(null);
(a = this.commentCell) && a.textarea("", !1);
if (a = this.sourceCell) a.textarea("", !1).setStrf(f).setMode(d).setInvs(c), a.title(b._x("Source text not loaded", "Editor") + ":");
if (a = this.contextCell) a.textarea("", !1).setMode(d).setInvs(c), a.title(b._x("Context not loaded", "Editor") + ":");
if (a = this.targetCell) a.textarea("", !1).setStrf(f).setMode(d).setInvs(c), a.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
u.updateListCell = function(a, b) {
var d = this.getListColumns()[b], c = this.po.indexOf(a);
(c = this.listTable.row(c)) && c.rendered && c.update(d);
};
u.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? w(a) : a.trim()) || " ";
};
u.fuzzy = function(a, b, d) {
b = b || this.active;
var c = b.fuzzy(d);
!0 !== a || c ? !1 === a && c && this.flag(0, b, d) && this.fire("poFuzzy", [ b, !1, d ]) : this.flag(4, b, d) && this.fire("poFuzzy", [ b, !0, d ]);
return c;
};
u.flag = function(a, d, c) {
if (!d) {
d = this.active;
c = this.getTargetOffset();
if (null == c) return null;
c && d.targetForms() && (c = 0);
}
var f = d.flagged(c);
if (null == a) return f;
if (f === a || a && !d.translated(c) || !this.fire("poFlag", [ a, f, d, c ])) return !1;
d.flag(a, c);
this.fire(b, [ d ]) && this.unsave(d, c);
this.setStatus(d, c);
return !0;
};
u.add = function(a, d) {
var c, f = this.po.get(a, d);
f ? c = this.po.indexOf(f) : (c = this.po.length, f = this.po.add(a, d), this.load(this.po, -1), 
this.fire("poAdd", [ f ]), this.fire(b, [ f ]));
this.lastSearch && this.filter("");
this.listTable.select(c);
return f;
};
u.del = function(a) {
if (a = a || this.active) {
var d = this.lastSearch, c = this.po.del(a);
null != c && (this.unsave(a), this.fire("poDel", [ a ]), this.fire(b, [ a ]), this.reload(), 
this.dict && this.rebuildSearch(), this.active && this.active.equals(a) && this.unloadActive(), 
this.po.length && (d && this.filter(d), this.active || (c = Math.min(c, this.po.length - 1), 
this.listTable.select(c))));
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
var b = this.active, d = this.sourceCell;
b && b.refs() && d && this.setSrcMeta(b, d) && d.redraw();
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
u.validate = function() {
return 0;
};
u = null;
return e;
}({}, z, w));
q.register("$13", function(e, c, C) {
function p() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function h(a) {
a = k('<button type="button" class="button button-small icon icon-' + a + ' hastip"></button>');
q.require("$12", "tooltip.js").init(a);
return a;
}
function l(a) {
return h("cloud").attr("title", a.labels[8] + " (Ctrl-U)").on("click", function(b) {
b.preventDefault();
a.focus().fuzzy(!a.fuzzy());
});
}
function a(a) {
return h("robot").attr("title", a.labels[9] + " (Ctrl-J)").on("click", function(b) {
b.preventDefault();
a.fire("poHint");
});
}
function b() {
var a = /%([1-9]\d*\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?(.|$)/g;
return function(b) {
for (var d = 0, c = 0, g, h, n = {}, e = 0; null != (g = a.exec(b)); ) h = g[2], 
"%" !== h && ("" === h || -1 === "suxXbcdeEfFgGo".indexOf(h) ? e++ : (null == g[1] ? g = ++c : (g = parseInt(g[1]), 
d = Math.max(d, g)), null == n[g] && (n[g] = {}), n[g][h] = !0));
return {
count: Math.max(d, c),
valid: 0 === e,
types: n
};
};
}
function d(a) {
null == n && (n = b());
return n(a);
}
function g(a, b) {
return q.require("$6", "string.js").vsprintf(a, b);
}
c = q.require("$24", "base.js");
e.init = function(a) {
var b = new p();
a = b.setRootCell(a);
var d = a.splity("po-list", "po-edit"), c = d[0], g = d[1], d = g.splitx("po-trans", "po-comment"), h = d[0], n = d[1].header("Loading.."), d = h.splity("po-source", "po-target"), h = d[0].header("Loading.."), d = d[1].header("Loading..");
a.distribute([ .34 ]);
g.distribute([ .8 ]);
b.setListCell(c);
b.setSourceCell(h);
b.setTargetCell(d);
b.commentCell = n;
b.editable.source = !1;
return b;
};
c = p.prototype = c.extend(p);
c.getListHeadings = function() {
var a = this.t(), b = [ a._x("Source text", "Editor") ];
this.targetLocale && (b[1] = a._x("Translation", "Editor"));
return b;
};
c.getListColumns = function() {
var a = {
source: 0
};
this.targetLocale && (a.target = 1);
return a;
};
c.getListEntry = function(a) {
var b = this.cellText, d = [ function() {
var d, c = b(a.source() || ""), g = a.context();
return g ? (d = C.createElement("p"), d.appendChild(C.createElement("mark")).innerText = g, 
d.appendChild(C.createTextNode(" " + c)), d) : c;
} ];
this.targetLocale && (d[1] = function() {
return b(a.translation() || "");
});
return d;
};
c.stats = function() {
var a = this.po, b = a.length, d = 0, c = 0, g = 0;
a.each(function(a, b) {
b.fuzzy() ? g++ : b.translated() ? d++ : c++;
});
return {
t: b,
p: d.percent(b) + "%",
f: g,
u: c
};
};
c.unlock = function() {
var a = this.targetLocale;
this._unlocked || (this.editable = {
source: !0,
context: !0,
target: !1
}, this.po && this.po.unlock(), this.contextCell = this.targetCell, delete this.targetCell, 
a && (this._unlocked = a, delete this.targetLocale, this.reload(), this.fire("poLock", [ !1 ])), 
this.active && this.loadMessage(this.active));
};
c.lock = function() {
var a = this._unlocked;
a && (this.targetLocale = a, delete this._unlocked, this.po && this.po.lock(a), 
this.editable = {
source: !1,
context: !1,
target: !0
}, this.targetCell = this.contextCell, delete this.contextCell, this.reload(), this.fire("poLock", [ !0, a ]), 
this.active && this.loadMessage(this.active));
};
c.locked = function() {
return !this._unlocked;
};
c.setStatus = function(b) {
var d = this.$tnav;
if (null == b) d && (d.remove(), this.$tnav = null); else {
d || (this.$tnav = d = k("<nav></nav>").append(l(this)).append(a(this)).appendTo(this.targetCell.header()));
var c = [];
b.translated() ? b.fuzzy() && c.push("po-fuzzy") : c.push("po-empty");
d.attr("class", c.join(" "));
}
};
c.getSorter = function() {
function a(d, c) {
var f = d.weight(), g = c.weight();
return f === g ? b(d, c) : f > g ? -1 : 1;
}
function b(a, d) {
return a.hash().localeCompare(d.hash());
}
var d = this;
return function(c) {
var g = d.po, h = d.locked() ? a : b;
c.sort(function(a, b) {
return h(g.row(a), g.row(b));
});
};
};
c.validate = function(a) {
var b = this, c = [], h = 0, n = 0, e = 0, l = [], k = this.fmt || "";
"" !== k && "no-" === k.substring(0, 3) || a.eachSrc(function(a, b) {
var c = d(b), f = c.count;
c.valid && (l[a] = c, e = Math.max(e, f), n = n ? Math.min(n, f) : f);
});
a.eachMsg(function(p, q) {
c[p] = [];
if ("" !== q && (e || k)) {
var u = d(q), v = u.count;
if (v > e) c[p].push(g(b.t()._("Too many placeholders; source text formatting suggests a maximum of %s"), [ e ])), 
h++; else if (v < n && 1 === a.count()) c[p].push(g(b.t()._("Missing placeholders; source text formatting suggests at least %s"), [ n ])), 
h++; else if (!u.valid) c[p].push(b.t()._("Possible syntax error in string formatting")), 
h++; else if (l[p]) {
var C, v = l[p].types, w;
for (C in u.types) for (w in u.types[C]) if (null == v[C] || null == v[C][w]) {
c[p].push(b.t()._("Mismatching placeholder type; check against source text formatting"));
h++;
return;
}
}
}
});
a.err = h ? c : null;
return h;
};
c.handle = {};
var n;
return e;
}({}, z, w));
q.register("$14", function(e, c, q) {
var p = {
copy: 66,
clear: 75,
save: 83,
fuzzy: 85,
next: 40,
prev: 38,
enter: 13,
invis: 73,
hint: 74
}, h = {
38: !0,
40: !0,
73: !0
}, l = {
66: function(a, b) {
var d = b.current();
d && (d.normalize(), b.focus().pasteMessage(d));
},
75: function(a, b) {
var d = b.current();
d && (d.untranslate(), b.focus().pasteMessage(d));
},
85: function(a, b) {
b.focus().fuzzy(!b.fuzzy());
},
13: function(a, b) {
b.getFirstEditable() && b.next(1, !0, !0);
},
40: function(a, b) {
var d = a.shiftKey;
b.next(1, d, d);
},
38: function(a, b) {
var d = a.shiftKey;
b.next(-1, d, d);
},
73: function(a, b) {
if (!a.shiftKey) return !1;
b.setInvs(!b.getInvs());
}
};
e.init = function(a, b) {
function d(b) {
if (b.isDefaultPrevented() || !b.metaKey && !b.ctrlKey) return !0;
var d = b.which;
if (!g[d]) return !0;
var c = l[d];
if (!c) throw Error("command undefined #" + d);
if (b.altKey || b.shiftKey && !h[d] || !1 === c(b, a)) return !0;
b.stopPropagation();
b.preventDefault();
return !1;
}
var g = {};
k(b || c).on("keydown", d);
return {
add: function(a, b) {
l[p[a]] = b;
return this;
},
enable: function() {
var a, b;
for (b in arguments) a = p[arguments[b]], g[a] = !0;
return this;
},
disable: function() {
k(b || c).off("keydown", d);
a = b = g = null;
}
};
};
return e;
}({}, z, w));
q.register("$25", function(e, c, k) {
function p() {
this.reIndex([]);
}
e.init = function() {
return new p();
};
c = p.prototype;
c.reIndex = function(c) {
for (var e = {}, a = -1, b = c.length; ++a < b; ) e[c[a]] = a;
this.keys = c;
this.length = a;
this.ords = e;
};
c.key = function(c, e) {
if (null == e) return this.keys[c];
var a = this.keys[c], b = this.ords[e];
if (e !== a) {
if (null != b) throw Error("Clash with item at [" + b + "]");
this.keys[c] = e;
delete this.ords[a];
this.ords[e] = c;
}
return c;
};
c.indexOf = function(c) {
c = this.ords[c];
return null == c ? -1 : c;
};
c.add = function(c, e) {
var a = this.ords[c];
null == a && (this.keys[this.length] = c, a = this.ords[c] = this.length++);
this[a] = e;
return a;
};
c.get = function(c) {
return this[this.ords[c]];
};
c.has = function(c) {
return null != this.ords[c];
};
c.del = function(c) {
this.cut(this.ords[c], 1);
};
c.cut = function(c, e) {
e = e || 1;
var a = [].splice.call(this, c, e);
this.keys.splice(c, e);
this.reIndex(this.keys);
return a;
};
c.each = function(c) {
for (var e = -1, a = this.keys, b = this.length; ++e < b; ) c(a[e], this[e], e);
return this;
};
c.sort = function(c) {
for (var e = -1, a = this.length, b, d = this.keys, g = this.ords, n = []; ++e < a; ) n[e] = [ this[e], d[e] ];
n.sort(function(a, b) {
return c(a[0], b[0]);
});
for (e = 0; e < a; e++) b = n[e], this[e] = b[0], b = b[1], d[e] = b, g[b] = e;
return this;
};
c.join = function(c) {
return [].join.call(this, c);
};
c = null;
return e;
}({}, z, w));
q.register("$26", function(e, c, k) {
function p(c, e) {
var a = RegExp("^.{0," + (c - 1) + "}[" + e + "]"), b = RegExp("^[^" + e + "]+");
return function(d, g) {
for (var e = d.length, f; e > c; ) {
f = a.exec(d) || b.exec(d);
if (null == f) break;
f = f[0];
g.push(f);
f = f.length;
e -= f;
d = d.substr(f);
}
0 !== e && g.push(d);
return g;
};
}
e.create = function(c) {
function e(a) {
return f[a] || "\\" + a;
}
var a, b, d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, g = /[ \r\n]+/g, n = /[\t\v\f\x07\x08\\\"]/g, f = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == c || isNaN(c = Number(c))) c = 79;
0 < c && (a = p(c - 3, " "), b = p(c - 2, "-– \\.,:;\\?!\\)\\]\\}\\>"));
return {
pair: function(a, f) {
if (!f) return a + ' ""';
f = f.replace(n, e);
var g = 0;
f = f.replace(d, function() {
g++;
return "\\n\n";
});
if (!(g || c && c < f.length + a.length + 3)) return a + ' "' + f + '"';
var m = [ a + ' "' ], k = f.split("\n");
if (b) for (var p = -1, r = k.length; ++p < r; ) b(k[p], m); else m = m.concat(k);
return m.join('"\n"') + '"';
},
prefix: function(a, b) {
var c = a.split(d);
return b + c.join("\n" + b);
},
refs: function(b) {
b = b.replace(g, " ", b);
a && (b = a(b, []).join("\n#: "));
return "#: " + b;
}
};
};
return e;
}({}, z, w));
q.register("$39", function(e, c, k) {
function p() {
this.length = 0;
}
e.init = function() {
return new p();
};
c = p.prototype;
c.push = function(c) {
this[this.length++] = c;
return this;
};
c.sort = function(c) {
[].sort.call(this, c);
return this;
};
c.each = function(c) {
for (var e = -1, a = this.length; ++e < a; ) c(e, this[e]);
return this;
};
return e;
}({}, z, w));
q.register("$27", function(e, c, k) {
function p() {}
e.extend = function(c) {
return c.prototype = new p();
};
c = p.prototype = q.require("$37", "abstract.js").init([ "add", "load" ]);
c.row = function(c) {
return this.rows[c];
};
c.lock = function(c) {
return this.locale(c || {
lang: "zxx",
label: "Unknown",
nplurals: 1,
pluraleq: "n!=1"
});
};
c.unlock = function() {
var c = this.loc;
this.loc = null;
return c;
};
c.locale = function(c) {
null == c ? c = this.loc : this.loc = c = q.require("$36", "locale.js").cast(c);
return c;
};
c.each = function(c) {
this.rows.each(c);
return this;
};
c.indexOf = function(c) {
"object" !== typeof c && (c = this.get(c));
if (!c) return -1;
null == c.idx && (c.idx = this.rows.indexOf(c.hash()));
return c.idx;
};
c.get = function(c) {
return this.rows && this.rows.get(c);
};
c.has = function(c) {
return this.rows && this.rows.has(c);
};
c.del = function(c) {
c = this.indexOf(c);
if (-1 !== c) {
var e = this.rows.cut(c, 1);
if (e && e.length) return this.length = this.rows.length, this.rows.each(function(a, b, d) {
b.idx = d;
}), c;
}
};
c.reIndex = function(c, e) {
var a = this.indexOf(c), b = c.hash(), d = this.rows.indexOf(b);
return d === a ? a : -1 !== d ? (e = (e || 0) + 1, c.source("Error, duplicate " + String(e) + ": " + c.source()), 
this.reIndex(c, e)) : this.rows.key(a, b);
};
c.sort = function(c) {
this.rows.sort(c);
return this;
};
c["export"] = function() {
for (var c = -1, e = this.rows, a = e.length, b = q.require("$39", "list.js").init(); ++c < a; ) b.push(e[c]);
return b;
};
c = null;
return e;
}({}, z, w));
q.register("$28", function(e, c, k) {
function p(a, b, d) {
if (null == d) return a[b] || "";
a[b] = d || "";
return a;
}
function h() {
this._id = this.id = "";
}
function l(a, b) {
for (var d = -1, c = a.length; ++d < c; ) b(d, a[d]);
}
e.extend = function(a) {
return a.prototype = new h();
};
c = h.prototype;
c.flag = function(a, b) {
var d = this.flg || (this.flg = []);
if (null != b) d[b] = a; else for (var c = Math.max(d.length, this.src.length, this.msg.length); 0 !== c--; ) d[c] = a;
return this;
};
c.flagged = function(a) {
var b = this.flg || [];
if (null != a) return b[a] || 0;
for (a = b.length; 0 !== a--; ) if (b[a]) return !0;
return !1;
};
c.flags = function() {
for (var a, b = {}, d = [], c = this.flg || [], e = c.length; 0 !== e--; ) a = c[e], 
b[a] || (b[a] = !0, d.push(a));
return d;
};
c.flaggedAs = function(a, b) {
var d = this.flg || [];
if (null != b) return a === d[b] || 0;
for (var c = d.length; 0 !== c--; ) if (d[c] === a) return !0;
return !1;
};
c.fuzzy = function(a, b) {
var d = this.flaggedAs(4, a);
null != b && this.flag(b ? 4 : 0, a);
return d;
};
c.source = function(a, b) {
if (null == a) return this.src[b || 0] || "";
this.src[b || 0] = a;
return this;
};
c.plural = function(a, b) {
if (null == a) return this.src[b || 1] || "";
this.src[b || 1] = a || "";
return this;
};
c.sourceForms = function() {
return this.srcF;
};
c.targetForms = function() {
return this.msgF;
};
c.each = function(a) {
for (var b = -1, d = this.src, c = this.msg, e = Math.max(d.length, c.length); ++b < e; ) a(b, d[b], c[b]);
return this;
};
c.eachSrc = function(a) {
l(this.src, a);
return this;
};
c.eachMsg = function(a) {
l(this.msg, a);
return this;
};
c.count = function() {
return Math.max(this.src.length, this.msg.length);
};
c.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
c.translate = function(a, b) {
this.msg[b || 0] = a || "";
return this;
};
c.untranslate = function(a) {
if (null != a) this.msg[a] = ""; else {
var b = this.msg, d = b.length;
for (a = 0; a < d; a++) b[a] = "";
}
return this;
};
c.translation = function(a) {
return this.msg[a || 0] || "";
};
c.errors = function(a) {
return this.err && this.err[a || 0] || [];
};
c.valid = function() {
return null == this.err;
};
c.translated = function(a) {
if (null != a) return !!this.msg[a];
var b = this.msg, d = b.length;
for (a = 0; a < d; a++) if (!b[a]) return !1;
return !0;
};
c.untranslated = function(a) {
if (null != a) return !this.msg[a];
var b = this.msg, d = b.length;
for (a = 0; a < d; a++) if (b[a]) return !1;
return !0;
};
c.comment = function(a) {
return p(this, "cmt", a);
};
c.notes = function(a) {
return p(this, "xcmt", a);
};
c.refs = function(a) {
return p(this, "rf", a);
};
c.format = function(a) {
return p(this, "fmt", a);
};
c.context = function(a) {
return p(this, "ctx", a);
};
c.tags = function() {
return this.tg;
};
c.toString = c.toText = function() {
return this.src.concat(this.msg, this.id, this.ctx).join(" ");
};
c.weight = function() {
var a = 0;
this.translation() || (a += 2);
this.fuzzy() && (a += 1);
return a;
};
c.equals = function(a) {
return this === a || this.hash() === a.hash();
};
c.hash = function() {
return this.id;
};
c.normalize = function() {
for (var a = this.msg.length; 0 !== a--; ) this.msg[a] = this.src[a] || "";
};
c.disabled = function(a) {
return !!(this.lck || [])[a || 0];
};
c.disable = function(a) {
(this.lck || (this.lck = []))[a || 0] = !0;
return this;
};
c.saved = function(a) {
var b = this.drt;
if (null == b) return !0;
if (null != a) return !b[a];
for (a = b.length; 0 !== a--; ) if (b[a]) return !1;
return !0;
};
c.unsave = function(a) {
(this.drt || (this.drt = []))[a || 0] = !0;
return this;
};
c.save = function(a) {
null == a ? this.drt = null : (this.drt || (this.drt = []))[a] = !1;
return this;
};
c.is = function(a) {
return a && (a === this || a.idx === this.idx);
};
c.isHTML = function(a) {
if (null == a) return this.htm || !1;
this.htm = a;
};
c = null;
return e;
}({}, z, w));
q.register("$15", function(e, c, k) {
function p(a) {
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
function h(a, b) {
var d = a || "";
b && (d += "\0" + b);
return d;
}
function l(a) {
var b = c.console;
b && b.error && b.error(a.message || String(a));
}
function a(a) {
return q.require("$26", "format.js").create(a);
}
function b(a) {
this.locale(a);
this.clear();
this.head = p(this.now());
}
function d(a, b) {
this.src = [ a || "" ];
this.msg = [ b || "" ];
}
e.create = function(a) {
return new b(a);
};
k = q.require("$27", "messages.js").extend(b);
k.clear = function() {
this.rows = q.require("$25", "collection.js").init();
this.length = 0;
return this;
};
k.now = function() {
function a(b, d) {
for (var c = String(b); c.length < d; ) c = "0" + c;
return c;
}
var b = new Date(), d = b.getUTCFullYear(), c = b.getUTCMonth() + 1, e = b.getUTCDate(), h = b.getUTCHours(), b = b.getUTCMinutes();
return a(d, 4) + "-" + a(c, 2) + "-" + a(e, 2) + " " + a(h, 2) + ":" + a(b, 2) + "+0000";
};
k.header = function(a, b) {
var d = this.head || (this.head = {});
if (null == b) return this.headers()[a] || "";
d[a] = b || "";
return this;
};
k.headers = function(a) {
var b, d = this.now(), c = this.head || (this.head = p(d));
if (null != a) {
for (b in a) c[b] = a[b];
return this;
}
var e = this.locale();
a = {};
for (b in c) a[b] = String(c[b]);
e ? (a.Language = String(e) || "zxx", a["Language-Team"] = e.label || a.Language, 
a["Plural-Forms"] = "nplurals=" + (e.nplurals || "2") + "; plural=" + (e.pluraleq || "n!=1") + ";", 
b = "PO-Revision-Date") : (a.Language = "", a["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
a["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date");
a[b] || (a[b] = d);
a["X-Generator"] = "Loco https://localise.biz/";
return a;
};
k.get = function(a, b) {
var d = h(a, b);
return this.rows.get(d);
};
k.add = function(a, b) {
a instanceof d || (a = new d(a));
b && a.context(b);
var c = a.hash();
this.rows.get(c) ? l("Duplicate message at index " + this.indexOf(a)) : (a.idx = this.rows.add(c, a), 
this.length = this.rows.length);
return a;
};
k.load = function(a) {
for (var b = -1, c, e, h, k, m, p, q = (h = this.locale()) && h.nplurals || 2, r = []; ++b < a.length; ) c = a[b], 
null == c.parent ? (e = c.source || c.id, h = c.target || "", k = c.context, e || k ? (m = new d(e, h), 
m._id = c._id, k && m.context(k), c.flag && m.flag(c.flag, 0), c.comment && m.comment(c.comment), 
c.notes && m.notes(c.notes), c.refs && m.refs(c.refs), m.format(c.format), c.message = m, 
this.add(m), c.prev && c.prev[0] && (m.prev(c.prev[0].source, c.prev[0].context), 
c.prev[1] && m._src.push(c.prev[1].source || ""))) : 0 === b && "object" === typeof h && (this.head = h, 
this.headcmt = c.comment)) : r.push(c);
for (b = -1; ++b < r.length; ) try {
c = r[b];
e = c.source || c.id;
m = a[c.parent] && a[c.parent].message;
if (!m) throw Error("parent missing for plural " + e);
p = c.plural;
1 === p && m.plural(e);
p >= q || (c.flag && m.flag(c.flag, p), m.translate(c.target || "", p), c.format && !m.format() && m.format(c.format));
} catch (w) {
l(w);
}
return this;
};
k.wrap = function(b) {
this.fmtr = a(b);
return this;
};
k.toString = function() {
var b, c = this.locale(), f = [], e = [], h = this.headers(), k = !c, l = c && c.nplurals || 2, p = this.fmtr || a();
h[c ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (b in h) e.push(b + ": " + h[b]);
e = new d("", e.join("\n"));
e.comment(this.headcmt || "");
k && e.fuzzy(0, !0);
f.push(e.toString());
f.push("");
this.rows.each(function(a, b) {
a && (f.push(b.cat(p, k, l)), f.push(""));
});
return f.join("\n");
};
k = q.require("$28", "message.js").extend(d);
k.prev = function(a, b) {
this._src = [ a || "" ];
this._ctx = b;
};
k.hash = function() {
return h(this.source(), this.context());
};
k.toString = function() {
return this.cat(a());
};
k.cat = function(a, b, d) {
var c, e = [], h;
(h = this.cmt) && e.push(a.prefix(h, "# "));
(h = this.xcmt) && e.push(a.prefix(h, "#. "));
c = this.rf;
if (h = this._id) c += (c ? " " : "") + "loco:" + h;
c && /\S/.test(c) && e.push(a.refs(c));
!b && this.fuzzy() && e.push("#, fuzzy");
(h = this.fmt) && e.push("#, " + h + "-format");
(h = this._ctx) && e.push(a.prefix(a.pair("msgctxt", h), "#| "));
if (h = this._src) h[0] && e.push(a.prefix(a.pair("msgid", h[0]), "#| ")), h[1] && e.push(a.prefix(a.pair("msgid_plural", h[1]), "#| "));
(h = this.ctx) && e.push(a.pair("msgctxt", h));
e.push(a.pair("msgid", this.src[0]));
if (null == this.src[1]) e.push(a.pair("msgstr", b ? "" : this.msg[0])); else for (c = -1, 
e.push(a.pair("msgid_plural", this.src[1])), h = this.msg || [ "", "" ], d = d || h.length; ++c < d; ) e.push(a.pair("msgstr[" + c + "]", b ? "" : h[c] || ""));
return e.join("\n");
};
k.compare = function(a, b) {
var d = this.weight(), c = a.weight();
if (d > c) return 1;
if (d < c) return -1;
if (b) {
d = this.hash().toLowerCase();
c = a.hash().toLowerCase();
if (d < c) return 1;
if (d > c) return -1;
}
return 0;
};
k.copy = function() {
var a = new d(), b, c;
for (b in this) this.hasOwnProperty(b) && ((c = this[b]) && c.concat && (c = c.concat()), 
a[b] = c);
return a;
};
k = k = null;
return e;
}({}, z, w));
q.register("$17", function(e, c, q) {
e.init = function(c, e) {
function l() {
return g || (g = k('<div id="loco-po-ref"></div>').dialog({
dialogClass: "loco-modal loco-modal-wide",
modal: !0,
autoOpen: !1,
closeOnEscape: !0,
resizable: !1,
height: 500
}));
}
function a(a, b, d) {
a = k("<p></p>").text(d);
l().dialog("close").html("").dialog("option", "title", "Error").append(a).dialog("open");
}
function b(a) {
var b = a && a.code;
if (b) {
for (var d = -1, c = b.length, e = k("<ol></ol>").attr("class", a.type); ++d < c; ) k("<li></li>").html(b[d]).appendTo(e);
e.find("li").eq(a.line - 1).attr("class", "highlighted");
l().dialog("close").html("").dialog("option", "title", a.path + ":" + a.line).append(e).dialog("open");
}
}
function d(a) {
a = a.target;
var b = k(a).find("li.highlighted")[0], b = Math.max(0, (b && b.offsetTop || 0) - Math.floor(a.clientHeight / 2));
a.scrollTop = b;
}
var g;
return {
load: function(g) {
l().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", d);
g = k.extend({
ref: g,
path: e.popath
}, e.project || {});
c.ajax.post("fsReference", g, b, a);
}
};
};
return e;
}({}, z, w));
q.register("$30", function(e, c, k) {
function p(c) {
this.api = c;
this.chars = 0;
}
e.create = function(c) {
return new p(c);
};
c = p.prototype;
c.init = function(c, e) {
function a(a) {
var b = {
length: 0,
html: a.html,
sources: []
};
A.push(b);
return x[a.html ? 1 : 0] = b;
}
function b(b, c) {
var h = b.source(null, c);
if (h && (b.untranslated(c) || e)) {
var u = m[h];
if (u) u.push(b); else {
var u = h.length, v = d.isHtml(h), v = x[v ? 1 : 0], A = v.sources;
if (q && u > q) f++; else {
if (v.length + u > p || A.length === k) v = a(v), A = v.sources;
A.push(h);
m[h] = [ b ];
v.length += u;
g += u;
n += 1;
}
}
}
}
var d = this.api, g = 0, n = 0, f = 0, k = 50, p = 1e4, q = d.maxChr(), m = {}, A = [], x = [];
q && (p = Math.min(p, q));
a({
html: !1
});
a({
html: !0
});
c.each(function(a, c) {
b(c, 0);
b(c, 1);
});
delete x;
this.map = m;
this.chars = g;
this.length = n;
this.batches = A;
this.locale = c.locale();
f && d.stderr("Strings over " + p + " characters long will be skipped");
};
c.abort = function() {
this.state = "abort";
return this;
};
c.dispatch = function() {
function c(a, b) {
function d(c, e, g) {
b !== g && (a === e || 1 < c && f.source(null, 1) === a) && (f.translate(b, c), 
m++, r++);
return m;
}
if (!e()) return !1;
if (!b) return !0;
var f, g = p[a] || [], h = g.length, k = -1, m;
for (A++; ++k < h; ) if (f = g[k]) m = 0, f.each(d), m && n("each", [ f ]);
return !0;
}
function e() {
return "abort" === f.state ? (k && (k.abort(), g()), !1) : !0;
}
function a() {
var a = q.shift(), f;
a ? (f = a.sources) && f.length ? k.batch(f, m, a.html, c).fail(b).always(d) : d() : g();
}
function b() {
f.abort();
g();
}
function d() {
x++;
n("prog", [ x, z ]);
e() && a();
}
function g() {
k = q = null;
n("done");
}
function n(a, b) {
for (var c = u[a] || [], d = c.length; 0 <= --d; ) c[d].apply(null, b);
}
var f = this, k = f.api, p = f.map, q = f.batches || [], m = f.locale, A = 0, x = 0, r = 0, w = f.length, z = q.length, u = {
done: [],
each: [],
prog: []
};
f.state = "";
a();
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
return Math.max(w - A, 0);
},
did: function() {
return A;
}
};
}
};
};
return e;
}({}, z, w));
q.register("$40", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
q.register("$31", function(e, c, k) {
function p() {}
e.create = function(c) {
c = p.prototype = new c();
c.toString = function() {
return "Google Translate";
};
c.getId = function() {
return "google";
};
c.getUrl = function() {
return "https://translate.google.com/";
};
c.parseError = function(c) {
if (c.error) {
for (var a = [], b = c.error.errors || [], d = b.length, e = -1; ++e < d; ) a.push(b[e].message || "");
return "Error " + c.error.code + ": " + a.join(";");
}
return "";
};
c.batch = function(c, a, b, d) {
function e(b) {
for (var f = c.length, g = -1, h; ++g < f && (h = b[g] || {}, !1 !== d(c[g], h.translatedText || "", a)); ) ;
}
var h = this, f = this.getSrc();
b = b ? "html" : "text";
var k = h.mapLang(a, q.require("$40", "google.json"));
return h._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + f + "&target=" + k + "&format=" + b,
method: "POST",
traditional: !0,
data: {
key: h.key(),
q: c
}
}).done(function(a, b, c) {
a.data ? e(a.data.translations || []) : (h.stderr(h.parseError(a) || h.httpError(c)), 
e([]));
}).fail(function() {
e([]);
});
};
return new p();
};
return e;
}({}, z, w));
q.register("$41", {
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
q.register("$32", function(e, c, k) {
function p() {}
e.create = function(c) {
c = p.prototype = new c();
c.toString = function() {
return "Microsoft Translator text API";
};
c.getId = function() {
return "microsoft";
};
c.getUrl = function() {
return "https://aka.ms/MicrosoftTranslatorAttribution";
};
c.parseError = function(c) {
return c && c.error ? c.error.message : "";
};
c.maxChr = function() {
return 1e4;
};
c.batch = function(c, a, b, d) {
function e(b) {
for (var f = -1, g; ++f < p && (g = b[f] || {}, g = g.translations || [], g = g[0] || {}, 
!1 !== d(c[f], g.text || "", a)); ) ;
}
var h = this, f = [], k = h.getSrc(), p = c.length, s = -1;
b = b ? "html" : "plain";
for (var m = h.mapLang(a, q.require("$41", "ms.json")); ++s < p; ) f.push({
text: c[s]
});
return h._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + k + "&to=" + m + "&textType=" + b,
method: "POST",
data: JSON.stringify(f),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": h.param("region") || "global"
}
}).done(function(a, b, c) {
a && a.length ? e(a) : (h.stderr(h.parseError(a) || h.httpError(c)), e([]));
}).fail(function() {
e([]);
});
};
return new p();
};
return e;
}({}, z, w));
q.register("$42", {
pt: [ "pt-PT", "pt-BR" ]
});
q.register("$33", function(e, c, k) {
function p() {}
e.create = function(c) {
c = p.prototype = new c();
c.toString = function() {
return "DeepL Translator";
};
c.getId = function() {
return "deepl";
};
c.getUrl = function() {
return "https://www.deepl.com/translator";
};
c.parseError = function(c) {
return c.message;
};
c.batch = function(c, a, b, d) {
function e(b) {
for (var f = c.length, g = -1, h; ++g < f && (h = b[g] || {}, !1 !== d(c[g], h.text || "", a)); ) ;
}
var h = this;
b = this.getSrc();
var f = h.param("url") || "https://api.deepl.com", k = h.mapLang(a, q.require("$42", "deepl.json")), p = a.tone, s = "default";
null == p && (p = String(a.variant || "").toLowerCase());
"formal" === p ? s = "more" : "informal" === p && (s = "less");
return h._call({
url: h.fixURL(f + "/v2/translate"),
method: "POST",
traditional: !0,
data: {
source_lang: b.toUpperCase(),
target_lang: k.toUpperCase(),
formality: s,
preserve_formatting: "1",
auth_key: h.key(),
text: c
}
}).done(function(a, b, c) {
a.translations ? e(a.translations) : (h.stderr(h.parseError(a) || h.httpError(c)), 
e([]));
}).fail(function() {
e([]);
});
};
return new p();
};
return e;
}({}, z, w));
q.register("$43", {
zh: [ "zh", "zh-CN", "zh-TW" ],
pt: [ "pt", "pt-PT", "pt-BR" ]
});
q.register("$34", function(e, c, k) {
function p() {}
e.create = function(c) {
c = p.prototype = new c();
c.getUrl = function() {
return "https://lecto.ai/?ref=loco";
};
c.parseError = function(c) {
var a = c.details || {}, b = a.message, a = a.texts;
return b ? (a && a !== b && (b += "; " + a), b = b.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(a) {
a += -1 === a.indexOf("?") ? "?" : "&";
return a + "ref=loco";
}), "Error " + (c.status || "0") + ": " + b) : "";
};
c.maxChr = function() {
return 1e3;
};
c.batch = function(c, a, b, d) {
function e(b) {
for (var f = c.length, g = -1, h = (b[0] || {
translated: []
}).translated || []; ++g < f && (b = h[g] || "", !1 !== d(c[g], b, a)); ) ;
}
var h = this;
b = this.getSrc();
var f = h.param("url") || "https://api.lecto.ai", k = h.mapLang(a, q.require("$43", "lecto.json"));
return h._call({
url: h.fixURL(f + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ k ],
from: b,
texts: c
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": h.key(),
Accept: "application/json"
}
}).done(function(a, b, c) {
a ? e(a.translations || []) : (h.stderr(h.parseError(a) || h.httpError(c)), e([]));
}).fail(function() {
e([]);
});
};
return new p();
};
return e;
}({}, z, w));
q.register("$18", function(e, c, w) {
function p() {
this.inf = {};
}
function h() {
var a = w.createElement("p"), c = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, e = /<[a-z]+\s/i, h, f;
return {
sniff: function(k) {
if (k === h) return f;
h = k;
if (c.test(k) || e.test(k)) if (a.innerHTML = k, a.textContent !== k) return f = !0;
return f = !1;
}
};
}
var l = p.prototype;
l.init = function(a) {
this.inf = a || {};
};
l.param = function(a) {
return this.inf[a] || "";
};
l.key = function() {
return this.param("key");
};
l.getId = function() {
return this.param("id") || "none";
};
l.getUrl = function() {
return this.param("url") || "#";
};
l.toString = function() {
return this.param("name") || this.getId();
};
l.getSrc = function() {
return this.param("src") || "en";
};
l.stderr = function(a) {
var d = (c.loco || {}).notices || c.console;
d && d.error && d.error(String(this) + ": " + String(a));
};
l.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
l.parseError = function() {
return "";
};
l.mapLang = function(a, c) {
var e = String(a).replace("-", "_"), h = a.lang, f = c[e] || c[h] || [], k = f.length;
if (0 === k) return h;
if (1 < k) for (var e = e.toLowerCase(), h = -1, l; ++h < k; ) if (l = f[h], l.toLowerCase().replace("-", "_") === e) return l;
return f[0];
};
l.toLang = function(a) {
return String(a);
};
l.maxChr = function() {
return 0;
};
l.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
};
l.translate = function(a, c, e) {
return this.batch([ a ], c, this.isHtml(a), e);
};
l._call = function(a) {
var c = this;
c.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(a, b, f) {
try {
var e = a.responseText, h = e && q.require("$5", "json.js").parse(e);
f = h && c.parseError(h) || f;
} catch (k) {}
c.stderr(f || c.httpError(a));
};
return c.abortable(k.ajax(a));
};
l.abortable = function(a) {
var c = this;
a.always(function() {
c.$r === a && (c.$r = null);
});
return c.$r = a;
};
l.abort = function() {
var a = this.$r;
a && a.abort();
};
l.isHtml = function(b) {
return (a || (a = h())).sniff(b);
};
l.createJob = function() {
return q.require("$30", "job.js").create(this);
};
l.batch = function(a, d, e, h) {
function f(c) {
for (var f = a.length, e = -1; ++e < f && !1 !== h(a[e], c[e], d); ) ;
}
var l = c.loco.ajax;
e = {
hook: this.getId(),
type: e ? "html" : "text",
locale: this.toLang(d),
source: this.getSrc(),
sources: a
};
var p = k.Deferred();
this.abortable(l.post("apis", e, function(a) {
f(a && a.targets || []);
p.resolve();
}, function() {
f([]);
p.reject();
}));
return p.promise();
};
e.create = function(a) {
var c;
c = a.id;
c = "google" === c ? q.require("$31", "google.js").create(p) : "microsoft" === c ? q.require("$32", "ms.js").create(p) : "deepl" === c ? q.require("$33", "deepl.js").create(p) : "lecto" === c ? q.require("$34", "lecto.js").create(p) : new p();
c.init(a);
return c;
};
e.suggest = function(a, c, e, h) {
var f, k, l = a.length;
for (f = 0; f < l; f++) k = a[f], k.translate(c, e, h);
};
var a;
return e;
}({}, z, w));
q.register("$19", function(e, c, q) {
e.init = function(e) {
function h() {
H || (I.on("click", f), H = k('<div id="loco-fs-creds"></div>').dialog({
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
function l() {
Q && (a(k(x)), Q = !1);
if (G && J) {
var b = J, c = k(P);
c.find("span.loco-msg").text(b);
K || (c.removeClass("jshide").hide().fadeIn(500), K = !0);
} else K && (a(k(P)), K = !1);
}
function a(a) {
a.slideUp(250).fadeOut(250, function() {
k(this).addClass("jshide");
});
}
function b() {
if (G) return H && H.dialog("close"), l(), k(e).find('button[type="submit"]').attr("disabled", !1), 
k(c).triggerHandler("resize"), A && A(!0), !0;
v && H ? (Q || (k(x).removeClass("jshide").hide().fadeIn(500), Q = !0), K && (a(k(P)), 
K = !1)) : l();
k(e).find('input[type="submit"]').attr("disabled", !0);
A && A(!1);
return !1;
}
function d(a) {
var b, c, d = m || {};
for (b in d) d.hasOwnProperty(b) && (c = d[b], a[b] ? a[b].value = c : k('<input type="hidden" />').attr("name", b).appendTo(a).val(c));
}
function g(a) {
a.preventDefault();
a = k(a.target).serializeArray();
s(a);
z = !0;
return !1;
}
function n(a) {
a.preventDefault();
H.dialog("close");
return !1;
}
function f(a) {
a.preventDefault();
H.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function y(a) {
G = a.authed;
r = a.method;
k(x).find("span.loco-msg").text(a.message || "Something went wrong.");
J = a.warning || "";
a.notice && u.notices.info(a.notice);
if (G) "direct" !== r && (m = a.creds, d(e), z && a.success && u.notices.success(a.success)), 
b(); else if (a.reason) u.notices.info(a.reason); else if (a = a.prompt) {
var f = h();
f.html(a).find("form").on("submit", g);
f.dialog("option", "title", f.find("h2").remove().text());
f.find("button.cancel-button").show().on("click", n);
f.find('input[type="submit"]').addClass("button-primary");
b();
k(c).triggerHandler("resize");
} else u.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function w() {
b();
}
function s(a) {
z = !1;
u.ajax.setNonce("fsConnect", D).post("fsConnect", a, y, w);
return a;
}
var m, A, x = e, r = null, z = !1, G = !1, u = c.loco, v = e.path.value, E = e.auth.value, D = e["loco-nonce"].value, I = k(x).find("button.button-primary"), P = q.getElementById(x.id + "-warn"), Q = !1, K = !1, J = "", H;
u.notices.convert(P).stick();
e.connection_type ? (m = {}, m.connection_type = e.connection_type.value, G = !0) : v && E && s({
path: v,
auth: E
});
b();
return {
applyCreds: function(a) {
if (a.nodeType) d(a); else {
var b, c = m || {};
for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
}
return this;
},
setForm: function(a) {
e = a;
b();
d(a);
return this;
},
connect: function() {
v = e.path.value;
E = e.auth.value;
s(k(e).serializeArray());
return this;
},
listen: function(a) {
A = a;
G && a(!0);
return this;
},
authed: function() {
return G;
}
};
};
return e;
}({}, z, w));
q.register("$20", function(e, c, w) {
function p(c, e, k, f) {
e = "n" === k ? l(e) : a(e);
f && (e = b(e));
return h([].sort, [ e ])(c);
}
function h(a, b) {
return function(c) {
a.apply(c, b);
return c;
};
}
function l(a) {
return function(b, c) {
var e = b && b[a] || 0, h = c && c[a] || 0;
return e === h ? 0 : e > h ? 1 : -1;
};
}
function a(a) {
return function(b, c) {
return (b && b[a] || "").localeCompare(c && c[a] || "");
};
}
function b(a) {
return function(b, c) {
return -1 * a(b, c);
};
}
e.init = function(a) {
function b(a) {
var c = -1, d = a.length;
for (k("tr", x).remove(); ++c < d; ) x.appendChild(a[c].$);
}
function c(a) {
s = a ? z.find(a, e) : e.slice(0);
w && (a = h[w], s = p(s, w, a.type, a.desc));
b(s);
}
var e = [], h = [], l = 0, s, m, w, x = a.getElementsByTagName("tbody")[0], r = a.getElementsByTagName("thead")[0], z = q.require("$10", "fulltext.js").init();
r && x && (k("th", r).each(function(a, c) {
var d = c.getAttribute("data-sort-type");
d && (a = l, k(c).addClass("loco-sort").on("click", function(c) {
c.preventDefault();
c = a;
var d = h[c], l = d.type, n = !(d.desc = !d.desc);
s = p(s || e.slice(0), c, l, n);
b(s);
m && m.removeClass("loco-desc loco-asc");
m = k(d.$).addClass(n ? "loco-desc" : "loco-asc").removeClass(n ? "loco-asc" : "loco-desc");
w = c;
return !1;
}), h[l] = {
$: c,
type: d
});
c.hasAttribute("colspan") ? l += Number(c.getAttribute("colspan")) : l++;
}), k("tr", x).each(function(a, b) {
var c, d, g, k = [], l = {
_: a,
$: b
}, m = b.getElementsByTagName("td");
for (d in h) {
c = m[d];
(g = c.textContent.replace(/(^\s+|\s+$)/g, "")) && k.push(g);
c.hasAttribute("data-sort-value") && (g = c.getAttribute("data-sort-value"));
switch (h[d].type) {
case "n":
g = Number(g);
}
l[d] = g;
}
e[a] = l;
z.index(a, k);
}), a = k('form.loco-filter input[type="text"]', a.parentNode), a.length && (a = a[0], 
r = k(a.form), 1 < e.length ? q.require("$11", "LocoTextListener.js").listen(a, c) : r.hide(), 
r.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return e;
}({}, z, w));
var D = z.loco || {}, I = D.conf || {
$v: [ 0, 0 ]
};
z = q.require("$1", "t.js").init();
w = I.wplang;
D.version = function(e) {
return I.$v[e || 0];
};
q.require("$2", "html.js");
q.require("$3", "number.js");
q.require("$4", "array.js");
q.require("$5", "json.js");
D.l10n = z;
z.load(I.wpl10n);
w && z.pluraleq(w.pluraleq);
D.string = q.require("$6", "string.js");
D.notices = q.require("$7", "notices.js").init(z);
D.ajax = q.require("$8", "ajax.js").init(I).localise(z);
D.locale = q.require("$9", "wplocale.js");
D.fulltext = q.require("$10", "fulltext.js");
D.watchtext = q.require("$11", "LocoTextListener.js").listen;
D.tooltip = q.require("$12", "tooltip.js");
D.po = {
ed: q.require("$13", "poedit.js"),
kbd: q.require("$14", "hotkeys.js"),
init: q.require("$15", "po.js").create,
ace: q.require("$16", "ace.js").strf("php"),
ref: q.require("$17", "refs.js")
};
D.apis = q.require("$18", "apis.js");
D.fs = q.require("$19", "fsconn.js");
k("#loco-admin.wrap table.wp-list-table").each(function(e, c) {
q.require("$20", "tables.js").init(c);
});
D.validate = function(e) {
return "2.6.3" !== (/^\d+\.\d+\.\d+/.exec(e && e[0] || "") && RegExp.lastMatch) ? (D.notices.warn("admin.js is the wrong version (2.6.3). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
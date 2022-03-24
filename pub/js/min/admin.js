(function(y, w, g, J) {
var p = function() {
function f(c) {
throw Error("Failed to require " + c);
}
var c = {};
return {
register: function(f, n) {
c[f] = n;
},
require: function(g, n) {
return c[g] || f(n);
},
include: function(g, n, h) {
return c[g] || (h ? f(n) : null);
}
};
}();
p.register("$1", function(f, c, g) {
function n(h) {
var c = typeof h;
if ("string" === c) if (/[^ <>!=()%^&|?:n0-9]/.test(h)) console.error("Invalid plural: " + h); else return new Function("n", "return " + h);
"function" !== c && (h = function(b) {
return 1 != b;
});
return h;
}
f.init = function(h) {
function c(a, b, d) {
return (a = e[a]) && a[d] ? a[d] : b || "";
}
function b(a) {
return c(a, a, 0);
}
function a(a, b) {
return c(b + "" + a, a, 0);
}
function d(a, b, d) {
d = Number(h(d));
isNaN(d) && (d = 0);
return c(a, d ? b : a, d);
}
h = n(h);
var e = {};
return {
__: b,
_x: a,
_n: d,
_: b,
x: a,
n: d,
load: function(a) {
e = a || {};
return this;
},
pluraleq: function(a) {
h = n(a);
return this;
}
};
};
return f;
}({}, y, w));
p.register("$2", function(f, c, g) {
f.ie = function() {
var f = !1, h = 0;
c.attachEvent && c.navigator && /MSIE (\d+)\./.exec(String(navigator.appVersion)) && (h = Number(RegExp.$1), 
f = 11 > h);
return function() {
return f;
};
}();
f.init = function() {
return f;
};
return f;
}({}, y, w));
p.register("$3", function(f, c, g) {
Number.prototype.format = function(c, h, m) {
c = Math.pow(10, c || 0);
var b = Math.round(c * this) / c;
c = [];
var b = String(b), a = b.split("."), b = a[0], a = a[1], d = b.length;
do {
c.unshift(b.substring(d - 3, d));
} while (0 < (d -= 3));
b = c.join(m || ",");
if (a) {
m = a;
var e;
for (c = m.length; "0" === m.charAt(--c); ) e = c;
e && (m = m.substring(0, e));
(a = m) && (b += (h || ".") + a);
}
return b;
};
Number.prototype.percent = function(c) {
var h = 0, m = this && c ? 100 * (this / c) : 0;
if (0 === m) return "0";
if (100 === m) return "100";
if (99 < m) m = Math.min(m, 99.9), c = m.format(++h); else if (.5 > m) {
m = Math.max(m, 1e-4);
do {
c = m.format(++h);
} while ("0" === c && 4 > h);
c = c.substr(1);
} else c = m.format(0);
return c;
};
return f;
}({}, y, w));
p.register("$4", function(f, c, g) {
Array.prototype.indexOf || (Array.prototype.indexOf = function(c) {
if (null == this) throw new TypeError();
var h, m = Object(this), b = m.length >>> 0;
if (0 === b) return -1;
h = 0;
1 < arguments.length && (h = Number(arguments[1]), h != h ? h = 0 : 0 != h && Infinity != h && -Infinity != h && (h = (0 < h || -1) * Math.floor(Math.abs(h))));
if (h >= b) return -1;
for (h = 0 <= h ? h : Math.max(b - Math.abs(h), 0); h < b; h++) if (h in m && m[h] === c) return h;
return -1;
});
return f;
}({}, y, w));
p.register("$5", function(f, c, p) {
c.JSON || (c.JSON = {
parse: g.parseJSON,
stringify: null
});
return f = c.JSON;
}({}, y, w));
p.register("$6", function(f, c, g) {
f.trim = function(c, h) {
for (h || (h = " \n"); c && -1 !== h.indexOf(c.charAt(0)); ) c = c.substring(1);
for (;c && -1 !== h.indexOf(c.slice(-1)); ) c = c.substring(0, c.length - 1);
return c;
};
f.sprintf = function(c) {
var h = 0, m = [].slice.call(arguments, 1);
return c.replace(/%(?:([1-9][0-9]*)\$)?([sud%])/g, function(b, a, d) {
return "%" === d ? "%" : (a ? m[Number(a) - 1] : m[h++]) || "";
});
};
return f;
}({}, y, w));
p.register("$21", function(f, c, g) {
function n(h) {
return function(c, b) {
for (var a = c[h] || 0; (c = c.offsetParent) && c !== (b || g.body); ) a += c[h] || 0;
return a;
};
}
f.top = n("offsetTop");
f.left = n("offsetLeft");
f.el = function(c, m) {
var b = g.createElement(c || "div");
m && (b.className = m);
return b;
};
f.txt = function(c) {
return g.createTextNode(c || "");
};
return f;
}({}, y, w));
p.register("$7", function(f, c, D) {
function n(a, b, d) {
function s() {
e();
v = setTimeout(b, d);
}
function e() {
v && clearTimeout(v);
v = null;
}
var v;
s();
g(a).on("mouseenter", e).on("mouseleave", s);
return {
die: function() {
e();
g(a).off("mouseenter mouseleave");
}
};
}
function h(a, b) {
a.fadeTo(b, 0, function() {
a.slideUp(b, function() {
a.remove();
g(c).triggerHandler("resize");
});
});
return a;
}
function m(a, b) {
function d(b) {
k[v] = null;
h(g(a), 250);
e && e.die();
var s;
if (s = b) b.stopPropagation(), b.preventDefault(), s = !1;
return s;
}
function s(b) {
e && e.die();
return e = n(a, d, b);
}
var e, v, l, A = g(a), r = A.find("button");
0 === r.length && (A.addClass("is-dismissible"), r = g('<button type="button" class="notice-dismiss"> </a>').appendTo(A));
r.off("click").on("click", d);
g(c).triggerHandler("resize");
z();
v = k.length;
k.push(d);
b && (e = s(b));
return {
link: function(b, d) {
var v = d || b, e = g(a).find("nav"), v = g("<nav></nav>").append(g("<a></a>").attr("href", b).text(v));
l ? (l.push(v.html()), e.html(l.join("<span> | </span>"))) : (l = [ v.html() ], 
g(a).addClass("has-nav").append(v));
return this;
},
stick: function() {
e && e.die();
e = null;
k[v] = null;
return this;
},
slow: function(a) {
s(a || 1e4);
return this;
}
};
}
function b(a, b, d) {
var e = p.require("$21", "dom.js").el;
a = g('<div class="notice notice-' + a + ' loco-notice inline"></div>').prependTo(g("#loco-notices"));
var s = g(e("p"));
d = g(e("span")).text(d);
b = g(e("strong", "has-icon")).text(b + ": ");
s.append(b).append(d).appendTo(a);
return a;
}
function a(a, d, e, s) {
a = b(e, d, a).css("opacity", "0").fadeTo(500, 1);
g(c).triggerHandler("resize");
return m(a, s);
}
function d(b) {
return a(b, r, "warning");
}
function e() {
g("#loco-notices").find("div.notice").each(function(a, b) {
if (-1 === b.className.indexOf("jshide")) {
var d = -1 === b.className.indexOf("notice-success") ? null : 5e3;
m(b, d);
}
});
}
var k = [], l = c.console || {
log: function() {}
}, z = Date.now || function() {
return new Date().getTime();
}, B, r, s, A;
f.error = function(b) {
return a(b, B, "error");
};
f.warn = d;
f.info = function(b) {
return a(b, s, "info");
};
f.success = function(b) {
return a(b, A, "success", 5e3);
};
f.warning = d;
f.log = function() {
l.log.apply(l, arguments);
};
f.debug = function() {
(l.debug || l.log).apply(l, arguments);
};
f.clear = function() {
for (var a = -1, b, d = k, e = d.length; ++a < e; ) (b = d[a]) && b.call && b();
k = [];
return f;
};
f.create = b;
f.raise = function(a) {
(f[a.type] || f.error).call(f, a.message);
};
f.convert = m;
f.init = function(a) {
B = a._("Error");
r = a._("Warning");
s = a._("Notice");
A = a._("OK");
setTimeout(e, 1e3);
return f;
};
return f;
}({}, y, w));
p.register("$8", function(f, c, D) {
function n(a) {
var b = g("<pre>" + a + "</pre>").text();
b && (b = b.replace(/[\r\n]+/g, "\n").replace(/(^|\n)\s+/g, "$1").replace(/\s+$/, ""));
b || (b = a) || (b = "Blank response from server");
return b;
}
function h(a) {
return (a = a.split(/[\r\n]/)[0]) ? (a = a.replace(/ +in +\S+ on line \d+/, ""), 
a = a.replace(/^[()! ]+Fatal error:\s*/, "")) : t._("Server returned invalid data");
}
function m(a) {
c.console && console.error && console.error('No nonce for "' + a + '"');
return "";
}
function b(a, b, d) {
a[b] = d;
}
function a(a, b, d) {
a.push({
name: b,
value: d
});
}
function d(a, b, d) {
a.append(b, d);
}
function e(a, b, d, e) {
function q(b, e, v) {
if ("abort" !== e) {
var s = l || {
_: function(a) {
return a;
}
}, q = b.status || 0, c = b.responseText || "", x = n(c), m = b.getResponseHeader("Content-Type") || "Unknown type", B = b.getResponseHeader("Content-Length") || c.length;
"success" === e && v ? k.error(v) : (k.error(h(x) + ".\n" + s._("Check console output for debugging information")), 
k.log("Ajax failure for " + a, {
status: q,
error: e,
message: v,
output: c
}), "parsererror" === e && (v = "Response not JSON"), k.log([ s._("Provide the following text when reporting a problem") + ":", "----", "Status " + q + ' "' + (v || s._("Unknown error")) + '" (' + m + " " + B + " bytes)", x, "====" ].join("\n")));
d && d.call && d(b, e, v);
z = b;
}
}
e.url = B;
e.dataType = "json";
var k = p.require("$7", "notices.js").clear();
z = null;
return g.ajax(e).fail(q).done(function(a, d, v) {
var e = a && a.data, l = a && a.notices, c = l && l.length, z = -1;
for (!e || a.error ? q(v, d, a && a.error && a.error.message) : b && b(e, d, v); ++z < c; ) k.raise(l[z]);
});
}
var k = {}, l, z, B = c.ajaxurl || "/wp-admin/admin-ajax.php";
f.init = function(a) {
k = a.nonces || k;
return f;
};
f.localise = function(a) {
l = a;
return f;
};
f.xhr = function() {
return z;
};
f.strip = n;
f.parse = h;
f.submit = function(a, b, d) {
function k(a, b) {
b.disabled ? b.setAttribute("data-was-disabled", "true") : b.disabled = !0;
}
function q(a, b) {
b.getAttribute("data-was-disabled") || (b.disabled = !1);
}
function l(a) {
a.find(".button-primary").removeClass("loading");
a.find("button").each(q);
a.find("input").each(q);
a.find("select").each(q);
a.find("textarea").each(q);
a.removeClass("disabled loading");
}
var c = g(a), z = c.serialize();
(function(a) {
a.find(".button-primary").addClass("loading");
a.find("button").each(k);
a.find("input").each(k);
a.find("select").each(k);
a.find("textarea").each(k);
a.addClass("disabled loading");
})(c);
return e(a.route.value, function(a, d, e) {
l(c);
b && b(a, d, e);
}, function(a, b, e) {
l(c);
d && d(a, b, e);
}, {
type: a.method,
data: z
});
};
f.post = function(l, s, z, h) {
var q = !0, G = s || {}, B = k[l] || m(l);
c.FormData && G instanceof FormData ? (q = !1, s = d) : s = Array.isArray(G) ? a : b;
s(G, "action", "loco_json");
s(G, "route", l);
s(G, "loco-nonce", B);
return e(l, z, h, {
type: "post",
data: G,
processData: q,
contentType: q ? "application/x-www-form-urlencoded; charset=UTF-8" : !1
});
};
f.get = function(a, b, d, l) {
b = b || {};
var q = k[a] || m(a);
b.action = "loco_json";
b.route = a;
b["loco-nonce"] = q;
return e(a, d, l, {
type: "get",
data: b
});
};
f.setNonce = function(a, b) {
k[a] = b;
return f;
};
return f;
}({}, y, w));
p.register("$22", {
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
p.register("$9", function(f, c, g) {
function n() {}
var h, m = p.require("$22", "rtl.json");
f.init = function() {
return new n();
};
f.cast = function(b) {
return b instanceof n ? b : "string" === typeof b ? f.parse(b) : f.clone(b);
};
f.clone = function(b) {
var a, d = new n();
for (a in b) d[a] = b[a];
return d;
};
f.parse = function(b) {
if (!(h || (h = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i)).exec(b)) return null;
var a = new n();
a.lang = RegExp.$1.toLowerCase();
if (b = RegExp.$2) a.region = b.toUpperCase();
if (b = RegExp.$3) a.variant = b.toLowerCase();
return a;
};
c = n.prototype;
c.isValid = function() {
return !!this.lang;
};
c.isKnown = function() {
var b = this.lang;
return !(!b || "zxx" === b);
};
c.toString = function(b) {
b = b || "_";
var a, d = this.lang || "zxx";
if (a = this.region) d += b + a;
if (a = this.variant) d += b + a;
return d;
};
c.getIcon = function() {
for (var b = 3, a, d, e = [ "variant", "region", "lang" ], k = []; 0 !== b--; ) if (a = e[b], 
d = this[a]) k.push(a), k.push(a + "-" + d.toLowerCase());
return k.join(" ");
};
c.isRTL = function() {
return !!m[String(this.lang).toLowerCase()];
};
c = null;
return f;
}({}, y, w));
p.register("$23", {
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
p.register("$10", function(f, c, g) {
f.init = function() {
function c(a) {
return l[a] || a;
}
function h(a, b, d, e) {
b = a.split(b);
for (var k = b.length; 0 !== k--; ) (a = b[k]) && null == e[a] && (d.push(a), e[a] = !0);
return d;
}
function m(a) {
return h(String(a || "").toLowerCase().replace(e, c), k, [], {});
}
function b(a, b) {
for (var l = [], s = {}, A, m = b.length, q = k; 0 !== m--; ) (A = b[m]) && h(String(A || "").toLowerCase().replace(e, c), q, l, s);
d[a] = l;
}
function a(a, b) {
var e = [], k = -1, l = d, c = l.length, q, h, m, u, v, F, f = a.length, g = b ? !0 : !1;
a: for (;++k < c; ) if (m = l[k], null != m && (u = m.length)) {
v = 0;
b: for (;v < f; v++) {
F = a[v];
for (q = 0; q < u; q++) if (h = m[q], 0 === h.indexOf(F)) continue b;
continue a;
}
e.push(g ? b[k] : k);
}
return e;
}
var d = [], e = /[^a-z0-9]/g, k = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/, l = p.require("$23", "flatten.json");
return {
split: m,
pull: function(b, d) {
return a(b, d);
},
find: function(b, d) {
return a(m(b), d);
},
add: function(a, b) {
d[a] = m(b);
},
push: function(a) {
b(d.length, a);
},
index: function(a, d) {
b(a, d);
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
return f;
}({}, y, w));
p.register("$11", function(f, c, p) {
f.listen = function(f, h) {
function m() {
s[e ? "show" : "hide"]();
}
function b(a) {
r && z.setAttribute("size", 2 + a.length);
e = a;
m();
return a;
}
function a() {
k = null;
h(e);
}
function d(d) {
var l = z.value;
B && l === B && (l = "");
l !== e ? (k && clearTimeout(k), b(l), d ? k = setTimeout(a, d) : a()) : k && null == d && (clearTimeout(k), 
a());
}
var e, k, l = 150, z = f instanceof jQuery ? f[0] : f, B = c.attachEvent && z.getAttribute("placeholder"), r = 1 === Number(z.size), s = g('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').on("click", function() {
z.value = "";
d();
return !1;
});
b(z.value);
g(z).on("input", function() {
d(l);
return !0;
}).on("blur focus change", function() {
d(null);
return !0;
}).after(s);
m();
return {
delay: function(a) {
l = a;
return this;
},
ping: function(e) {
e ? (k && clearTimeout(k), e = z.value, B && e === B && (e = ""), b(e), a(), e = void 0) : e = d();
return e;
},
val: function(a) {
if (null == a) return e;
k && clearTimeout(k);
z.value = b(a);
m();
},
el: function() {
return z;
},
blur: function(a) {
return g(z).on("blur", a);
},
destroy: function() {
k && clearTimeout(k);
}
};
};
return f;
}({}, y, w));
p.register("$12", function(f, c, p) {
function n(b, a) {
this.$element = g(b);
this.options = a;
this.enabled = !0;
this.fixTitle();
}
f.init = function(b, a) {
var d = {
fade: !0,
offset: 5,
delayIn: h,
delayOut: m,
anchor: b.attr("data-anchor"),
gravity: b.attr("data-gravity") || "s"
};
a && (d = g.extend({}, d, a));
b.tipsy(d);
};
f.delays = function(b, a) {
h = b || 150;
m = a || 100;
};
f.kill = function() {
g("div.tipsy").remove();
};
f.text = function(b, a) {
a.data("tipsy").setTitle(b);
};
var h, m;
f.delays();
g(p.body).on("overlayOpened overlayClosing", function(b) {
f.kill();
return !0;
});
n.prototype = {
show: function() {
var b = this.getTitle();
if (b && this.enabled) {
var a = this.tip();
a.find(".tipsy-inner")[this.options.html ? "html" : "text"](b);
a[0].className = "tipsy";
a.remove().css({
top: 0,
left: 0
}).prependTo(p.body);
var b = (b = this.options.anchor) ? this.$element.find(b) : this.$element, b = g.extend({}, b.offset(), {
width: b[0].offsetWidth,
height: b[0].offsetHeight
}), d = a[0].offsetWidth, e = a[0].offsetHeight, k = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, l;
switch (k.charAt(0)) {
case "n":
l = {
top: b.top + b.height + this.options.offset,
left: b.left + b.width / 2 - d / 2
};
break;

case "s":
l = {
top: b.top - e - this.options.offset,
left: b.left + b.width / 2 - d / 2
};
break;

case "e":
l = {
top: b.top + b.height / 2 - e / 2,
left: b.left - d - this.options.offset
};
break;

case "w":
l = {
top: b.top + b.height / 2 - e / 2,
left: b.left + b.width + this.options.offset
};
}
2 == k.length && ("w" == k.charAt(1) ? l.left = b.left + b.width / 2 - 15 : l.left = b.left + b.width / 2 - d + 15);
a.css(l).addClass("tipsy-" + k);
a.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + k.charAt(0);
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
var b, a = this.$element, d = this.options;
this.fixTitle();
"string" == typeof d.title ? b = a.attr("title" == d.title ? "original-title" : d.title) : "function" == typeof d.title && (b = d.title.call(a[0]));
return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || d.fallback;
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
var d = g.data(a, "tipsy");
d || (d = new n(a, g.fn.tipsy.elementOptions(a, b)), g.data(a, "tipsy", d));
return d;
}
function d() {
var d = a(this), e = b.delayIn;
d.hoverState = "in";
0 == e ? d.show() : (d.fixTitle(), setTimeout(function() {
"in" == d.hoverState && d.show();
}, e));
}
function e() {
var d = a(this), e = b.delayOut;
d.hoverState = "out";
0 == e ? d.hide() : (d.tip().removeClass("in"), setTimeout(function() {
"out" == d.hoverState && d.hide();
}, e));
}
b = g.extend({}, g.fn.tipsy.defaults, b);
b.live || this.each(function() {
a(this);
});
if ("manual" != b.trigger) {
var k = b.live ? "live" : "bind", l = "hover" == b.trigger ? "mouseleave" : "blur";
this[k]("hover" == b.trigger ? "mouseenter" : "focus", d)[k](l, e);
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
return g(this).offset().top > g(p).scrollTop() + g(c).height() / 2 ? "s" : "n";
};
g.fn.tipsy.autoWE = function() {
return g(this).offset().left > g(p).scrollLeft() + g(c).width() / 2 ? "e" : "w";
};
g.fn.tipsy.autoBounds = function(b, a) {
return function() {
var d = a[0], e = 1 < a.length ? a[1] : !1, k = g(p).scrollTop() + b, l = g(p).scrollLeft() + b, h = g(this);
h.offset().top < k && (d = "n");
h.offset().left < l && (e = "w");
g(c).width() + g(p).scrollLeft() - h.offset().left < b && (e = "e");
g(c).height() + g(p).scrollTop() - h.offset().top < b && (d = "s");
return d + (e ? e : "");
};
};
return f;
}({}, y, w));
p.register("$35", function(f, c, g) {
"".localeCompare || (String.prototype.localeCompare = function() {
return 0;
});
"".trim || (String.prototype.trim = function() {
return p.require("$6", "string.js").trim(this, " \n\r\t");
});
f.html = function() {
function c() {
b = /[<>&]/g;
a = /(\r\n|\n|\r)/g;
d = /(?:https?):\/\/(\S+)/gi;
e = location.hostname;
c = null;
}
function h(a) {
return "&#" + a.charCodeAt(0) + ";";
}
function m(a, b) {
return '<a href="' + a + '" target="' + (b.indexOf(e) ? "_blank" : "_top") + '">' + b + "</a>";
}
var b, a, d, e;
return function(e, l) {
c && c();
var z = e.replace(b, h);
l && (z = z.replace(d, m).replace(a, "<br />"));
return z;
};
}();
return f;
}({}, y, w));
p.register("$36", function(f, c, g) {
function n() {}
var h, m, b = p.require("$22", "rtl.json");
f.init = function() {
return new n();
};
f.cast = function(a) {
return a instanceof n ? a : "string" === typeof a ? f.parse(a) : f.clone(a);
};
f.clone = function(a) {
var b, e = new n();
for (b in a) e[b] = a[b];
return e;
};
f.parse = function(a) {
h || (m = /[-_+]/, h = /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i);
a = String(a).split(m).join("-");
if (!h.exec(a)) return null;
var b = new n();
b.lang = RegExp.$1.toLowerCase();
if (a = RegExp.$2) b.script = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
if (a = RegExp.$3) b.region = a.toUpperCase();
if (a = RegExp.$4) b.variant = a.toLowerCase();
if (a = RegExp.$5) b.extension = a;
return b;
};
c = n.prototype;
c.isValid = function() {
return !!this.lang;
};
c.isKnown = function() {
var a = this.lang;
return !(!a || "zxx" === a);
};
c.toString = function(a) {
a = a || "-";
var b, e = this.lang || "zxx";
if (b = this.script) e += a + b;
if (b = this.region) e += a + b;
if (b = this.variant) e += a + b;
if (b = this.extension) e += a + b;
return e;
};
c.getIcon = function() {
for (var a = 4, b, e, k = [ "variant", "region", "script", "lang" ], l = []; 0 !== a--; ) if (b = k[a], 
e = this[b]) e.join && (e = e.join("-")), 1 === a && 3 === e.length ? l.push("region-m49") : l = l.concat([ b, b + "-" + e.toLowerCase() ]);
return l.join(" ");
};
c.isRTL = function() {
return !!b[String(this.script || this.lang).toLowerCase()];
};
c = null;
return f;
}({}, y, w));
p.register("$37", function(f, c, g) {
function n(a) {
c.console && console.error && console.error(a);
}
function h() {
n("Method not implemented");
}
function m() {}
function b(a) {}
m.prototype.toString = function() {
return "[Undefined]";
};
b.prototype._validate = function(a) {
var b, e, k = !0;
for (b in this) e = this[b], e === h ? (n(a + "." + b + "() must be implemented"), 
k = !1) : e instanceof m && (n(a + "." + b + " must be defined"), k = !1);
return k;
};
f.init = function(a, d) {
var e, k = new b();
if (a) for (e = a.length; 0 !== e--; ) k[a[e]] = h;
if (d) for (e = d.length; 0 !== e--; ) k[d[e]] = new m();
return k;
};
f.validate = function(a) {
var b = /function (\w+)\(/.exec(a.toString()) ? RegExp.$1 : "";
a.prototype._validate(b || "Object");
};
return f;
}({}, y, w));
p.register("$48", function(f, c, g) {
var n = c.requestAnimationFrame, h = c.cancelAnimationFrame, m = 0;
if (!n || !h) for (var b in {
ms: 1,
moz: 1,
webkit: 1,
o: 1
}) if (n = c[b + "RequestAnimationFrame"]) if (h = c[b + "CancelAnimationFrame"] || c[b + "CancelRequestAnimationFrame"]) break;
n && h || (n = function(b) {
var e = a();
timeToCall = Math.max(0, 16 - (e - m));
nextTime = e + timeToCall;
timerId = c.setTimeout(function() {
b(nextTime);
}, timeToCall);
m = nextTime;
return timerId;
}, h = function(a) {
clearTimeout(a);
});
var a = Date.now || function() {
return new Date().getTime();
};
f.loop = function(a, b) {
function k() {
c = n(k, b);
a(l++);
}
var l = 0, c;
k();
return {
stop: function() {
c && h(c);
c = null;
}
};
};
return f;
}({}, y, w));
p.register("$45", function(f, c, g) {
function n(a, d, e, k) {
if (b) {
var l = e;
e = function(a) {
if ((a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType) return l(a);
};
}
a.addEventListener(d, e, k);
return {
unbind: function() {
a.removeEventListener(d, e, k);
}
};
}
function h(a) {
a.preventDefault();
a.stopPropagation();
return !1;
}
var m, b = !!c.navigator.msPointerEnabled, a = b ? "MSPointerDown" : "touchstart", d = b ? "MSPointerMove" : "touchmove", e = b ? "MSPointerUp" : "touchend";
f.ok = function(a) {
null == m && (m = "function" === typeof g.body.addEventListener);
m && a && a(f);
return m;
};
f.ms = function() {
return b;
};
f.dragger = function(b, l) {
function c(a) {
b.addEventListener(a, m[a], !1);
}
function s(a) {
b.removeEventListener(a, m[a], !1);
}
var m = {};
m[a] = function(b) {
k(b, function(d, e) {
e.type = a;
l(b, e, f);
});
c(d);
c(e);
return !0;
};
m[e] = function(a) {
s(d);
s(e);
k(a, function(b, d) {
d.type = e;
l(a, d, f);
});
return !0;
};
m[d] = function(a) {
k(a, function(b, e) {
e.type = d;
l(a, e, f);
});
return h(a);
};
c(a);
var f = {
kill: function() {
s(a);
s(d);
s(e);
b = f = l = null;
}
};
return f;
};
f.swiper = function(c, m, f) {
function s(a) {
c.addEventListener(a, u[a], !1);
}
function A(a) {
c.removeEventListener(a, u[a], !1);
}
function x() {
q && q.stop();
q = null;
}
var q, G, E, u = {}, v = [], F = [], g = [];
u[a] = function(a) {
G = !1;
x();
var b = l();
k(a, function(a, d) {
v[a] = b;
F[a] = d.clientX;
g[a] = d.clientY;
});
E = c.scrollLeft;
return !0;
};
u[e] = function(a) {
k(a, function(a, b) {
var d = l() - v[a], e = F[a] - b.clientX, d = Math.abs(e) / d;
m(d, e ? 0 > e ? -1 : 1 : 0);
});
E = null;
return !0;
};
u[d] = function(a) {
var b, d;
null == E || k(a, function(a, e) {
b = F[a] - e.clientX;
d = g[a] - e.clientY;
});
if (d && Math.abs(d) > Math.abs(b)) return G = !0;
b && (G = !0, c.scrollLeft = Math.max(0, E + b));
return h(a);
};
if (!b || f) s(a), s(d), s(e), b && (c.className += " mstouch");
return {
kill: function() {
A(a);
A(d);
A(e);
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
scroll: function(a, b, d) {
x();
var e = c.scrollLeft, v = a > e ? 1 : -1, k = Math[1 === v ? "min" : "max"], l = Math.round(16 * b * v);
return q = p.require("$48", "fps.js").loop(function(b) {
b && (e = Math.max(0, k(a, e + l)), c.scrollLeft = e, a === e && (x(), d && d(e)));
}, c);
}
};
};
f.start = function(b, d) {
return n(b, a, d, !1);
};
f.move = function(a, b) {
return n(a, d, b, !1);
};
f.end = function(a, b) {
return n(a, e, b, !1);
};
var k = f.each = function(a, d) {
if (b) (a.MSPOINTER_TYPE_TOUCH || "touch") === a.pointerType && d(0, a); else for (var e = -1, c = (a.originalEvent || a).changedTouches || []; ++e < c.length; ) d(e, c[e]);
}, l = Date.now || function() {
return new Date().getTime();
};
return f;
}({}, y, w));
p.register("$49", function(f, c, p) {
f.init = function(c) {
function h() {
d.style.top = String(-c.scrollTop) + "px";
return !0;
}
function m() {
var a = d;
a.textContent = c.value;
a.innerHTML = a.innerHTML.replace(/[ \t]/g, b).split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n') + '<span class="eol eof"></span>';
return !0;
}
function b(a) {
return '<span class="x' + a.charCodeAt(0).toString(16) + '">' + a + "</span>";
}
var a = c.parentNode, d = a.insertBefore(p.createElement("div"), c);
g(c).on("input", m).on("scroll", h);
g(a).addClass("has-mirror");
d.className = "ta-mirror";
var e = c.offsetWidth - c.clientWidth;
2 < e && (d.style.marginRight = String(e - 2) + "px");
m();
h();
return {
kill: function() {
g(c).off("input", m).off("scroll", h);
a.removeChild(d);
d = null;
g(a).removeClass("has-mirror");
}
};
};
return f;
}({}, y, w));
p.register("$29", function(f, c, g) {
function n(b, a) {
for (var d = 0, e = -1, k = a && c[a], l = h[b] || [], m = l.length; ++e < m; ) callback = l[e], 
"function" === typeof callback && (callback(k), d++);
return d;
}
var h = {}, m;
f.load = function(b, a, d) {
function e() {
m && (clearTimeout(m), m = null);
f && (f.onreadystatechange = null, f = f = f.onload = null);
b && (delete h[b], b = null);
}
function k(a, c) {
var l = f && f.readyState;
if (c || !l || "loaded" === l || "complete" === l) c || n(b, d), e();
}
function l() {
if (0 === n(b)) throw Error('Failed to load "' + (d || b) + '"');
e();
}
if (d && c[d]) "function" === typeof a && a(c[d]); else if (null != h[b]) h[b].push(a); else {
h[b] = [ a ];
var m = setTimeout(l, 4e3), f = g.createElement("script");
f.setAttribute("src", b);
f.setAttribute("async", "true");
f.onreadystatechange = k;
f.onload = k;
f.onerror = l;
f.onabort = e;
g.getElementsByTagName("head")[0].appendChild(f);
}
};
f.stat = function(b) {
var a;
if (!(a = m)) {
for (var d, e, c = g.getElementsByTagName("script"), l = -1, h = c.length; ++l < h; ) if (a = c[l].getAttribute("src")) if (d = a.indexOf("/lib/vendor"), 
-1 !== d) {
e = a.substr(0, d);
break;
}
a = m = e || "/static";
}
return a + b;
};
return f;
}({}, y, w));
p.register("$16", function(f, c, D) {
function n(a, b) {
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
function m(a) {
h(a);
a.setReadOnly(!0);
a.setHighlightGutterLine(!1);
a.setHighlightActiveLine(!1);
}
function b(b, d) {
function e() {
this.HighlightRules = c;
}
var c = a(d), k = b.require, h = k("ace/lib/oop");
h.inherits(c, k("ace/mode/text_highlight_rules").TextHighlightRules);
h.inherits(e, k("ace/mode/text").Mode);
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
}, e = d(a);
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
} : e && b.start.push({
token: "printf",
regex: e
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

case k:
return e || "%%";
}
}
var e, k = "auto";
f.init = function(a, d, e) {
var f, s = !1, A = e || k, x = a.parentNode, q = x.appendChild(D.createElement("div"));
g(x).addClass("has-proxy has-ace");
p.require("$29", "remote.js").load("https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js", function(e) {
if (q) {
if (!e) throw Error("Failed to load code editor");
f = e.edit(q);
var c = f.session, k = f.renderer;
f.$blockScrolling = Infinity;
f.setShowInvisibles(s);
f.setWrapBehavioursEnabled(!1);
f.setBehavioursEnabled(!1);
f.setHighlightActiveLine(!1);
c.setUseSoftTabs(!1);
k.setShowGutter(!0);
k.setPadding(10);
k.setScrollMargin(8);
c.setMode(b(e, A));
f.setValue(a.value, -1);
c.setUseWrapMode(!0);
d ? n(f, d) : m(f);
}
}, "ace");
return {
kill: function() {
f && (h(f), f.destroy(), f = null);
q && (x.removeChild(q), g(x).removeClass("has-proxy has-ace"), q = null);
return this;
},
disable: function() {
f && m(f);
d = null;
return this;
},
enable: function(a) {
d = a;
f && n(f, a);
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
s !== a && (s = a, f && f.setShowInvisibles(a));
return this;
},
strf: function(a) {
a = a || k;
a !== A && (A = a, f && f.session.setMode(b(c.ace, a)));
return this;
},
focus: function() {
return this;
}
};
};
f.strf = function(a, b) {
k = a;
e = b;
return f;
};
return f;
}({}, y, w));
p.register("$50", function(f, c, D) {
function n(a, b) {
function e() {
return b.val(a.getContent());
}
a.on("input", e);
a.on("change", e);
a.on("focus", function() {
return b.focus();
});
a.on("blur", function() {
return b.blur();
});
a.setMode("design");
}
function h(a) {
a.off("input");
a.off("change");
a.off("focus");
a.off("blur");
}
function m(a) {
h(a);
a.setMode("readonly");
}
var b = 0;
f.load = function(a) {
var b = p.require("$29", "remote.js");
b.load(b.stat("/lib/tinymce.min.js"), a, "tinymce");
return f;
};
f.init = function(a, d) {
function e(a) {
B = a;
r = "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4);
return a.replace(/(<\/?)script/gi, "$1loco:script");
}
function c(a) {
l = a;
a._getContent = a.getContent;
a.getContent = function(a) {
a = this._getContent(a);
a = a.replace(/(<\/?)loco:script/gi, "$1script");
if (!r && "<p>" === a.substr(0, 3) && "</p>" === a.substr(-4)) {
var b = a.substr(3, a.length - 7);
if (b === B || -1 === b.indexOf("</p>")) a = b;
}
return a;
};
a._setContent = a.setContent;
a.setContent = function(a, b) {
return this._setContent(e(a), b);
};
d ? (n(a, d), d.reset()) : m(a);
g(x).removeClass("loading");
}
var l, z = !1, B = "", r = !1, s = a.parentNode, A = s.parentNode, x = s.appendChild(D.createElement("div")), q = A.insertBefore(D.createElement("nav"), s);
q.id = "_tb" + String(++b);
g(s).addClass("has-proxy has-mce");
g(x).addClass("mce-content-body loading").html(e(a.value));
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
fixed_toolbar_container: "#" + q.id,
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
init_instance_callback: c
});
});
return {
val: function(b) {
b = e(b);
null == l ? (a.value = b, g(x).html(b)) : l.getContent() !== b && l.setContent(b);
d && d.val(b);
return this;
},
kill: function() {
l && (d && d.val(l.getContent()), h(l), l.destroy(), l = null);
x && (s.removeChild(x), g(s).removeClass("has-proxy has-mce"), x = null);
q && (A.removeChild(q), q = null);
return this;
},
enable: function(a) {
d = a;
l && n(l, a);
return this;
},
disable: function() {
l && m(l);
d = null;
return this;
},
focus: function() {
l && d && l.focus();
return this;
},
invs: function(a) {
a = a || !1;
z !== a && (z = a, g(s)[a ? "addClass" : "removeClass"]("show-invs"));
return this;
}
};
};
return f;
}({}, y, w));
p.register("$46", function(f, c, D) {
function n(b) {
function a() {
h && (f.off("input", d), h = !1);
}
function d() {
var a = b.value;
a !== s && (f.trigger("changing", [ a, s ]), s = a);
}
function e() {
d();
h && A !== s && f.trigger("changed", [ s ]);
}
function c() {
m = b;
A = s;
h || (f.on("input", d), h = !0);
f.trigger("editFocus");
r.addClass("has-focus");
return !0;
}
function l() {
m === b && (m = null);
f.trigger("editBlur");
r.removeClass("has-focus");
h && (e(), a());
return !0;
}
var h = !1, f = g(b), r = g(b.parentNode), s = b.value, A;
f.on("blur", l).on("focus", c);
return {
val: function(a) {
s !== a && (b.value = a, f.triggerHandler("input"), s = a);
return !0;
},
kill: function() {
a();
f.off("blur", l).off("focus", c);
},
fire: function() {
s = null;
d();
},
ping: e,
blur: l,
focus: c,
reset: function() {
A = s = b.value;
}
};
}
function h(b) {
this.e = b;
}
var m;
f._new = function(b) {
return new h(b);
};
f.init = function(b) {
var a = new h(b);
b.disabled ? (b.removeAttribute("disabled"), a.disable()) : b.readOnly ? a.disable() : a.enable();
return a;
};
TextAreaPrototype = h.prototype;
TextAreaPrototype.destroy = function() {
this.unlisten();
var b = this.p;
b && (b.kill(), this.p = null);
this.e = null;
};
TextAreaPrototype.reload = function(b, a) {
var d = this.l;
d && !a && (this.disable(), d = null);
this.val(b || "");
a && !d && this.enable();
return this;
};
TextAreaPrototype.val = function(b) {
var a = this.e;
if (null == b) return a.value;
var d = this.l, e = this.p;
e && e.val(b);
d && d.val(b);
d || a.value === b || (a.value = b, g(a).triggerHandler("input"));
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
return m && m === this.el;
};
TextAreaPrototype.parent = function() {
return this.e.parentNode;
};
TextAreaPrototype.attr = function(b, a) {
var d = this.e;
if (1 === arguments.length) return d.getAttribute(b);
null == a ? d.removeAttribute(b) : d.setAttribute(b, a);
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
this.l = n(this.e);
return this;
};
TextAreaPrototype.unlisten = function() {
var b = this.l;
b && (b.kill(), this.l = null);
return this;
};
TextAreaPrototype.setInvs = function(b, a) {
var d = this.i || !1;
if (a || d !== b) this._i && (this._i.kill(), delete this._i), (d = this.p) ? d.invs && d.invs(b) : b && (this._i = p.require("$49", "mirror.js").init(this.e)), 
this.i = b;
return this;
};
TextAreaPrototype.getInvs = function() {
return this.i || !1;
};
TextAreaPrototype.setMode = function(b) {
var a = this.p, d = this.i || !1;
b !== (this.m || "") && (this.m = b, a && a.kill(), this.p = a = "code" === b ? p.require("$16", "ace.js").init(this.e, this.l, this["%"]) : "html" === b ? p.require("$50", "mce.js").init(this.e, this.l) : null, 
this.setInvs(d, !0), m && this.focus());
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
p.register("$47", function(f, c, p) {
function n(a) {
var b = c.console;
b && b.error && b.error(a);
}
function h(a) {
var b = p.createElement("div");
a && b.setAttribute("class", a);
return b;
}
function m(a) {
return function() {
a.resize();
return this;
};
}
function b(a) {
return function(b) {
for (var d = b.target, e = d.$index; null == e && "DIV" !== d.nodeName && (d = d.parentElement); ) e = d.$index;
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
function e(a, b, d) {
function e(a) {
n("row[" + a + "] disappeared");
return {
cellVal: function() {
return "";
}
};
}
return function(c) {
var k = b || 0, l = d ? -1 : 1, v = a.rows || [];
c.sort(function(a, b) {
return l * (v[a] || e(a)).cellVal(k).localeCompare((v[b] || e(b)).cellVal(k));
});
};
}
function k(a) {
this.w = a;
}
function l(a) {
this.t = a;
this.length = 0;
}
function z(a, b, d) {
var e = p.createElement("div");
e.className = d || "";
this._ = e;
this.d = b || [];
this.i = a || 0;
this.length = b.length;
}
function B(a) {
this.live = a;
this.rows = [];
}
f.create = function(a) {
return new k(a);
};
var r = k.prototype;
r.init = function(e) {
var c = this.w, k = c.id, l = c.splity(k + "-thead", k + "-tbody"), f = l[0], l = l[1], E = [], u = [], v = [], F = [];
if (e) this.ds = e, this.idxs = u, this._idxs = null; else if (!(e = this.ds)) throw Error("No datasource");
f.css.push("wg-thead");
l.css.push("wg-tbody");
e.eachCol(function(a, b, d) {
v[a] = k + "-col-" + b;
F[a] = d || b;
});
for (var N = h(), r = -1, n = v.length, p = h("wg-cols"), B = f.splitx.apply(f, v); ++r < n; ) B[r].header(F[r]), 
p.appendChild(N.cloneNode(!1)).setAttribute("for", v[r]);
e.eachRow(function(a, b, d) {
E[a] = new z(a, b, d);
u[a] = a;
});
this.rows = E;
this.cols = p;
this.ww = null;
this.root = N = l.body;
this.head = f;
f.redraw = m(this);
f = l.fixed = B[0].bodyY() || 20;
c.lock().resize(f, l);
c.css.push("is-table");
c.restyle();
this.sc ? this._re_sort(n) : e.sort && e.sort(u);
this.redrawDirty();
this.render();
g(N).attr("tabindex", "-1").on("keydown", d(this)).on("mousedown", b(this)).on("scroll", a(this));
return this;
};
r.clear = function() {
for (var a = this.pages || [], b = a.length; 0 !== b--; ) a[b].destroy();
this.pages = [];
this.sy = this.mx = this.mn = this.vh = null;
void 0;
return this;
};
r.render = function() {
for (var a, b, d = [], e = this.rows || [], c = -1, k, l = this.idxs, v = l.length, h = this.idxr = {}, f = this.r, m = this._r, g = this.root, z = this.cols; ++c < v; ) {
0 === c % 100 && (a = z.cloneNode(!0), b = new B(a), b.h = 2200, b.insert(g), d.push(b));
k = l[c];
h[k] = c;
a = e[k];
if (null == a) throw Error("Render error, no data at [" + k + "]");
a.page = b;
b.rows.push(a);
}
b && 100 !== b.size() && b.sleepH(22);
this.pages = d;
this.mx = this.mn = null;
this.redrawDirty();
this.redraw();
null == f ? null != m && (a = e[m]) && a.page && (delete this._r, this.select(m, !0)) : (a = e[f]) && a.page ? this.select(f, !0) : (this.deselect(), 
this._r = f);
return this;
};
r.resize = function() {
var a = -1, b = this.ww || (this.ww = []), d = this.w, e = d.cells[0], c = e.body.childNodes, k = c.length, l = this.pages || [], v = l.length;
for (d.redraw.call(e); ++a < k; ) b[a] = c[a].style.width;
if (v) {
d = this.mx;
for (a = this.mn; a <= d; a++) l[a].widths(b);
this.redrawDirty() && this.redraw();
}
};
r.redrawDirty = function() {
var a = !1, b = this.root, d = b.scrollTop, b = b.clientHeight;
this.sy !== d && (a = !0, this.sy = d);
this.vh !== b && (a = !0, this.vh = b);
return a;
};
r.redraw = function() {
for (var a = 0, b = -1, d = null, e = null, c = this.ww, k = this.sy, l = this.vh, v = this.mn, h = this.mx, f = Math.max(0, k - 100), k = l + k + 100, m = this.pages || [], g = m.length; ++b < g && !(a > k); ) l = m[b], 
a += l.height(), a < f || (null === d && (d = b), e = b, l.rendered || l.render(c));
if (v !== d) {
if (null !== v && d > v) for (b = v; b < d; b++) {
l = m[b];
if (!l) throw Error("Shit!");
l.rendered && l.sleep();
}
this.mn = d;
}
if (h !== e) {
if (null !== h && e < h) for (b = h; b > e; b--) l = m[b], l.rendered && l.sleep();
this.mx = e;
}
};
r.selected = function() {
return this.r;
};
r.thead = function() {
return this.w.cells[0];
};
r.tbody = function() {
return this.w.cells[1];
};
r.tr = function(a) {
return (a = this.row(a)) ? a.cells() : [];
};
r.row = function(a) {
return this.rows[a];
};
r.td = function(a, b) {
return this.tr(a)[b];
};
r.next = function(a, b, d) {
null == d && (d = this.r || 0);
var e = this.idxs, c = e.length, k = (this.idxr || {})[d];
for (d = k; d !== (k += a) && !(0 <= k && c > k); ) if (b && c) k = 1 === a ? -1 : c, 
b = !1; else return null;
d = e[k];
return null == d || null == this.rows[d] ? (n("Bad next: [" + k + "] does not map to data row"), 
null) : d;
};
r.selectNext = function(a, b, d) {
a = this.next(a, b);
null != a && this.r !== a && this.select(a, d);
return this;
};
r.deselect = function(a) {
var b = this.r;
null != b && (this.r = null, g(this.tr(b)).removeClass("selected"), this.w.fire("wgRowDeselect", [ b, a ]));
return this;
};
r.selectRow = function(a, b) {
return this.select(this.idxs[a]);
};
r.select = function(a, b) {
var d = this.rows[a], e = d && d.page;
if (!e) return this.deselect(!1), n("Row is filtered out"), this;
this.deselect(!0);
var c, k = this.w.cells[1];
e.rendered || (c = e.top(), k.scrollY(c), this.redrawDirty() && this.redraw());
if (!d.rendered) return e.rendered || n("Failed to render page"), n("Row [" + d.i + "] not rendered"), 
this;
e = d.cells();
g(e).addClass("selected");
this.r = a;
b || (c = k.scrollY(), g(this.root).focus(), c !== k.scrollY() && k.scrollY(c));
k.scrollTo(e[0], !0);
this.w.fire("wgRowSelect", [ a, d.data() ]);
return this;
};
r.unfilter = function() {
this._idxs && (this.idxs = this._sort(this._idxs), this._idxs = null, this.clear().render());
return this;
};
r.filter = function(a) {
this._idxs || (this._idxs = this.idxs);
this.idxs = this._sort(a);
return this.clear().render();
};
r.each = function(a) {
for (var b, d = -1, e = this.rows || [], c = this.idxs || [], k = c.length; ++d < k; ) b = c[d], 
a(e[b], d, b);
return this;
};
r.sortable = function(a) {
var b = this.sc || (this.sc = new l(this));
b.has(a) || b.add(a);
return this;
};
r._re_sort = function(a) {
var b = -1, d = this.sc, e = d.active;
for (this.sc = d = new l(this); ++b < a; ) d.add(b);
e && (b = this.head.indexOf(e.id), -1 === b && (b = Math.min(e.idx, a - 1)), this.sort(b, e.desc));
return this;
};
r._sort = function(a, b) {
b ? (this.s = b, b(a)) : (b = this.s) && b(a);
return a;
};
r.sort = function(a, b) {
this._sort(this.idxs, e(this, a, b));
this.sc.activate(a, b);
return this;
};
r = null;
r = l.prototype;
r.has = function(a) {
return null != this[a];
};
r.add = function(a) {
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
r.toggle = function(a) {
this.t.sort(a, !this[a].desc).clear().render();
return this;
};
r.activate = function(a, b) {
var d, e;
d = this.active;
var c = this[a], k = this.t.head.cells;
d && (e = k[d.idx]) && (e.removeClass(d.css), d !== c && e.restyle());
(e = k[a]) ? (c.desc = b, this.active = c, d = "wg-" + (b ? "desc" : "asc"), e.addClass(d).restyle(), 
c.css = d) : this.active = null;
return this;
};
r = null;
r = z.prototype;
r.render = function(a) {
var b, d = [], e = this._, c = this.length;
if (e) {
for (this.c = d; 0 !== c--; ) b = e.cloneNode(!1), d[c] = this.update(c, b), b.$index = this.i, 
a[c].appendChild(b);
this._ = null;
} else for (d = this.c; 0 !== c--; ) a[c].appendChild(d[c]);
this.rendered = !0;
return this;
};
r.update = function(a, b) {
var d = b || this.c[a] || {}, e = (this.d[a] || function() {})() || " ";
null == e.innerHTML ? d.textContent = e : d.innerHTML = e.innerHTML;
return d;
};
r.cells = function() {
return this.c || [ this._ ];
};
r.data = function() {
for (var a = -1, b = [], d = this.length; ++a < d; ) b[a] = this.cellVal(a);
return b;
};
r.destroy = function() {
this.page = null;
this.rendered = !1;
};
r.cellVal = function(a) {
a = this.d[a]() || "";
return String(a.textContent || a);
};
r = null;
r = B.prototype;
r.size = function() {
return this.rows.length;
};
r.insert = function(a) {
var b = this.h, d = h("wg-dead");
d.style.height = String(b) + "px";
a.appendChild(d);
return this.dead = d;
};
r.top = function() {
return (this.rendered ? this.live : this.dead).offsetTop;
};
r.height = function() {
var a = this.h;
null == a && (this.h = a = this.rendered ? this.live.firstChild.offsetHeight : this.dead.offsetHight);
a || n("row has zero height");
return a;
};
r.render = function(a) {
for (var b, d = -1, e = this.rows, c = e.length, k = this.dead, l = this.live, v = l.childNodes; ++d < c; ) b = e[d], 
b.rendered || b.render(v);
c = a.length;
for (d = 0; d < c; d++) v[d].style.width = a[d];
k.parentNode.replaceChild(l, k);
this.rendered = !0;
this.h = null;
return this;
};
r.sleep = function() {
var a = this.height(), b = this.live, d = this.dead;
d.style.height = String(a) + "px";
b.parentNode.replaceChild(d, b);
this.rendered = !1;
this.h = a;
return this;
};
r.sleepH = function(a) {
a *= this.rows.length;
var b = this.dead;
b && (b.style.height = String(a) + "px");
this.rendered || (this.h = a);
return this;
};
r.widths = function(a) {
for (var b = this.live.childNodes, d = a.length; 0 !== d--; ) b[d].style.width = a[d];
return this;
};
r.destroy = function() {
var a = this.rendered ? this.live : this.dead, b = this.rows, d = b.length;
for (a.parentNode.removeChild(a); 0 !== d--; ) b[d].destroy();
};
r = null;
return f;
}({}, y, w));
p.register("$38", function(f, c, D) {
function n(a, b) {
var d = a.id, e = d && s[d], c = e && e.parent();
if (!e || !c) return null;
var k = c.dir === r, d = k ? "X" : "Y", l = "page" + d, k = k ? B : z, h = k(c.el), d = b["offset" + d], f = c.el, m = f.className;
null == d && (d = b[l] - k(a));
d && (h += d);
f.className = m + " is-resizing";
return {
done: function() {
f.className = m;
},
move: function(a) {
c.resize(a[l] - h, e);
return !0;
}
};
}
function h(a, d) {
function e() {
g(D).off("mousemove", c);
x && (x.done(), x = null);
return !0;
}
function c(a) {
x ? x.move(a) : e();
return !0;
}
if (x) return !0;
x = n(a.target, a);
if (!x) return !0;
g(D).one("mouseup", e).on("mousemove", c);
return b(a);
}
function m(a, b) {
var d = b.type;
"touchmove" === d ? x && x.move(b) : "touchstart" === d ? x = n(a.target, b) : "touchend" === d && x && (x.done(), 
x = null);
}
function b(a) {
a.stopPropagation();
a.preventDefault();
return !1;
}
function a(a) {
var b = A;
b && b.redraw();
a && a.redraw();
return A = a;
}
function d(b, d) {
var e = g(d).on("editFocus", function() {
e.trigger("wgFocus", [ a(b) ]);
}).on("editBlur", function() {
e.trigger("wgBlur", [ a(null) ]);
});
}
function e(a) {
var b = a.id, d = a.className;
this.id = b;
this.el = a;
this.pos = this.index = 0;
this.css = [ d || "wg-root", "wg-cell" ];
this._cn = d;
s[b] = this;
this.clear();
}
var k = p.include("$44", "html.js") || p.include("$2", "html.js", !0), l = p.require("$21", "dom.js"), z = l.top, B = l.left, r = 1, s = {}, A, x = !1;
f.init = function(a) {
var b = new e(a);
b.redraw();
p.require("$45", "touch.js").ok(function(b) {
b.dragger(a, m);
});
g(a).on("mousedown", h);
return b;
};
c = e.prototype;
c.fire = function(a, b) {
var d = g.Event(a);
d.cell = this;
g(this.el).trigger(d, b);
return this;
};
c.each = function(a) {
for (var b = -1, d = this.cells, e = d.length; ++b < e; ) a(d[b], b);
return this;
};
c.indexOf = function(a) {
return (a = s[a.id || String(a)]) && a.pid === this.id ? a.index : -1;
};
c.on = function() {
return this.$("on", arguments);
};
c.off = function() {
return this.$("off", arguments);
};
c.find = function(a) {
return g(this.el).find(a);
};
c.$ = function(a, b) {
g.fn[a].apply(g(this.el), b);
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
return this.pid && s[this.pid];
};
c.splitx = function() {
return this._split(r, arguments);
};
c.splity = function() {
return this._split(2, arguments);
};
c._split = function(a, b) {
(this.length || this.field) && this.clear();
for (var d = -1, c, k = b.length, h = 1 / k, f = 0; ++d < k; ) {
c = l.el();
this.body.appendChild(c);
for (var m = c, g = b[d], z = g, r = 1; s[g]; ) g = z + "-" + ++r;
m.id = g;
c = new e(c);
c.index = d;
c.pid = this.id;
c._locale(this.lang, this.rtl);
c.pos = f;
f += h;
this.cells.push(c);
this.length++;
}
this.dir = a;
this.redraw();
return this.cells;
};
c.destroy = function() {
this.clear();
delete s[this.id];
var a = this.el;
a.innerHTML = "";
this.body = null;
a.className = this._cn || "";
g(a).off();
return this;
};
c.exists = function() {
return this === s[this.id];
};
c.clear = function() {
for (var a = this.el, b = this.cells, d = this.field, e = this.body, c = this.nav, h = this.length || 0; 0 !== h--; ) delete s[b[h].destroy().id];
this.cells = [];
this.length = 0;
c && (a.removeChild(c), this.nav = null);
e && (d && (k.ie() && g(e).triggerHandler("blur"), d.destroy(), this.field = null), 
this.table && (this.table = null), a === e.parentNode && a.removeChild(e));
this.body = a.appendChild(l.el("", "wg-body"));
this._h = null;
return this;
};
c.resize = function(a, b) {
if (!b && (b = this.cells[1], !b)) return;
var d = b.index, e = this.cells, c = g(this.el)[this.dir === r ? "width" : "height"](), k = e[d + 1], d = e[d - 1];
pad = (b.body || b.el.firstChild).offsetTop || 0;
max = (k ? k.pos * c : c) - pad;
min = d ? d.pos * c : 0;
b.pos = Math.min(max, Math.max(min, a)) / c;
this.redraw();
return this;
};
c.distribute = function(a) {
for (var b = -1, d = 0, e, c = this.cells, k = a.length; ++b < k && (e = c[++d]); ) e.pos = Math.max(0, Math.min(1, a[b]));
this.redraw();
return this;
};
c.distribution = function() {
for (var a = [], b = 0, d = this.cells, e = d.length - 1; b < e; ) a[b] = d[++b].pos;
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
var b = this.el, d = this.body, e = this.field;
if (d) {
var c, k = b.clientWidth || 0, l = b.clientHeight || 0, h = d.offsetTop || 0, l = h > l ? 0 : l - h;
this._h !== l && (this._h = l, d.style.height = String(l) + "px", c = e);
this._w !== k && (this._w = k, c = e);
c && c.redraw();
}
d = this.length;
k = 1;
l = this.nav;
for (h = 2 === this.dir ? "height" : "width"; 0 !== d--; ) e = this.cells[d], l ? c = 1 : (e.fixed && (e.pos = e.fixed / g(b)[h]()), 
c = k - e.pos, k = e.pos), e.el.style[h] = String(100 * c) + "%", e.redraw(a);
return this;
};
c.contents = function(a, b) {
var d = this.el, e = this.body;
if (null == a) return e.innerHTML;
this.length ? this.clear() : e && (d.removeChild(e), e = null);
e || (this.body = e = d.appendChild(l.el("", b || "wg-content")), this._h = null, 
(d = this.lang) && this._locale(d, this.rtl, !0));
"string" === typeof a ? g(e)._html(a) : a && this.append(a);
this.redraw();
return this;
};
c.textarea = function(a, b) {
var e = this.field;
if (e) {
var c = e.editable();
e.reload(a, b);
c !== b && this.restyle();
} else this.length && this.clear(), c = l.el("textarea"), c.setAttribute("wrap", "virtual"), 
c.value = a, this.contents(c), e = p.require("$46", "field.js")._new(c)[b ? "enable" : "disable"](), 
d(this, c), this.field = e, this.restyle();
this.lang || this.locale("en");
return e;
};
c.locale = function(a) {
a = p.require("$36", "locale.js").cast(a);
return this._locale(String(a), a.isRTL());
};
c._locale = function(a, b, d) {
var e = this.body;
if (d || a !== this.lang) this.lang = a, e && e.setAttribute("lang", a);
if (d || b !== this.rtl) this.rtl = b, e && e.setAttribute("dir", b ? "RTL" : "LTR");
return this;
};
c.editable = function() {
var a = this.field;
if (a) return a.editable() ? a : null;
var b = this.cells, d = b.length, e = this.navigated();
if (null != e) return b[e].editable();
for (;++e < d; ) {
for (e = 0; e < d; d++) ;
if (a = b[e].editable()) return a;
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
a && (a.nodeType ? k.init(this.body.appendChild(a)) : k.init(g(a).appendTo(this.body)));
return this;
};
c.prepend = function(a) {
var b = this.body;
if (a.nodeType) {
var d = b.firstChild;
k.init(d ? b.insertBefore(a, d) : b.appendChild(a));
} else k.init(g(a).prependTo(b));
return this;
};
c.before = function(a) {
var b = this.body;
a.nodeType ? k.init(this.el.insertBefore(a, b)) : k.init(g(a).insertBefore(b));
return this;
};
c.header = function(a, b) {
if (null == a && null == b) return this.el.getElementsByTagName("header")[0];
this.t = l.txt(a || "");
this.el.insertBefore(l.el("header", b), this.body).appendChild(this.t);
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
return z(this.body, this.el);
};
c.scrollY = function(a) {
if (J === a) return this.body.scrollTop;
this.body.scrollTop = a;
};
c.tabulate = function(a) {
var b = this.table;
b ? b.clear() : b = p.require("$47", "wgtable.js").create(this);
b.init(a);
return this.table = b;
};
c.lock = function() {
this.body.className += " locked";
return this;
};
c.scrollTo = function(a, b) {
var d, e = this.body;
d = e.scrollTop;
var c = z(a, e);
if (d > c) d = c; else {
var k = e.clientHeight, c = c + g(a).outerHeight();
if (k + d < c) d = c - k; else return;
}
b ? e.scrollTop = d : g(e).stop(!0).animate({
scrollTop: d
}, 250);
};
c.navigize = function(a, d) {
function e(a) {
var b = k[a], d = m[a], c = g(b.el).show();
d.addClass("active");
f = a;
z.data("idx", a);
b.fire("wgTabSelect", [ a ]);
return c;
}
var c = this, k = c.cells, h = c.nav, f, m = [];
h && c.el.removeChild(h);
var h = c.nav = c.el.insertBefore(l.el("nav", "wg-tabs"), c.body), z = g(h).on("click", function(a) {
var d = g(a.target).data("idx");
if (null == d) return !0;
if (null != f) {
var l = m[f];
g(k[f].el).hide();
l.removeClass("active");
}
e(d);
c.redraw();
return b(a);
});
null == d && (d = z.data("idx") || 0);
c.each(function(b, d) {
m[d] = g('<a href="#' + b.id + '"></a>').data("idx", d).text(a[d]).appendTo(z);
b.pos = 0;
g(b.el).hide();
});
e(k[d] ? d : 0);
c.lock();
c.redraw();
return c;
};
c.navigated = function() {
var a = this.nav;
if (a) return g(a).data("idx");
};
c = null;
return f;
}({}, y, w));
p.register("$24", function(f, c, D) {
function n(a) {
var b = [];
a && (a.saved() || b.push("po-unsaved"), a.fuzzy() ? b.push("po-fuzzy") : a.flagged() && b.push("po-flagged"), 
a.translation() || b.push("po-empty"), a.comment() && b.push("po-comment"));
return b.join(" ");
}
function h(a, b, d) {
b = g(a.title(b).parentNode);
var e = b.find("span.lang");
d ? (d = p.require("$36", "locale.js").cast(d), e.length || (e = g("<span></span>").prependTo(b)), 
e.attr("lang", d.lang).attr("class", d.getIcon() || "lang region region-" + (d.region || "zz").toLowerCase())) : (e.remove(), 
d = "en");
a.locale(d);
return b;
}
function m(a, b, d) {
b.on("click", function(b) {
var e = a.fire(d, [ b.target ]);
e || b.preventDefault();
return e;
});
}
function b() {
this.dirty = 0;
}
p.require("$3", "number.js");
var a = "poUpdate", d = "changing", e = "changed", k = 0, l = 1, z = 2, B = 3, r = 4, s = 5, A, x, q = p.require("$35", "string.js").html, y = p.require("$6", "string.js").sprintf;
f.extend = function(a) {
return a.prototype = new b();
};
f.localise = function(a) {
x = a;
return f;
};
var w = function() {
var a = D.createElement("p"), b = /(src|href|on[a-z]+)\s*=/gi;
return function(d) {
a.innerHTML = d.replace(b, "data-x-loco-$1=");
var e = a.textContent.trim();
return e ? e.replace("data-x-loco-", "") : d.trim();
};
}(), u = b.prototype = p.require("$37", "abstract.js").init([ "getListColumns", "getListHeadings", "getListEntry" ], [ "editable", "t" ]);
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
a || (a = x || p.require("$1", "t.js").init());
var b = [];
b[k] = a._x("Source text", "Editor") + ":";
b[B] = a._x("%s translation", "Editor") + ":";
b[r] = a._x("Context", "Editor") + ":";
b[s] = a._x("Comments", "Editor") + ":";
b[l] = a._x("Single", "Editor") + ":";
b[z] = a._x("Plural", "Editor") + ":";
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
d.redraw(!0, a);
return !0;
}
var d = p.require("$38", "wingrid.js").init(a);
g(c).on("resize", b);
this.redraw = b;
g(a).on("wgFocus wgBlur", function(a, b) {
a.stopPropagation();
A = b;
});
this.destroy = function() {
d.destroy();
g(c).off("resize", b);
};
this.rootDiv = a;
return d;
};
u.$ = function() {
return g(this.rootDiv);
};
u.setListCell = function(a) {
var b = this;
b.listCell = a;
a.on("wgRowSelect", function(a, d) {
b.loadMessage(b.po.row(d));
return !0;
}).on("wgRowDeselect", function(a, d, e) {
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
u.next = function(a, b, d) {
for (var e = this.listTable, c = e.selected(), k = c, l, h = this.po; null != (c = e.next(a, d, c)); ) {
if (k === c) {
c = null;
break;
}
if (b && (l = h.row(c), l.translated(0))) continue;
break;
}
null != c && e.select(c, !0);
return c;
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
var a = -1, b = this.po.rows, d = b.length, e = this.dict;
for (e.clear(); ++a < d; ) e.add(a, b[a].toText());
};
u.filtered = function() {
return this.lastSearch || "";
};
u.filter = function(a, b) {
var d, e = this.listTable, c = this.lastFound, k = this.lastSearch;
if (a) {
if (k === a) return c || 0;
if (k && !c && 0 === a.indexOf(k)) return 0;
d = this.dict.find(a);
}
this.lastSearch = k = a;
this.lastFound = c = d ? d.length : this.po.length;
d ? e.filter(d) : e.unfilter();
b || this.fire("poFilter", [ k, c ]);
return c;
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
a = d.replace(/(?:^| +)po-[a-z]+/g, "") + " " + n(a);
a !== d && g(b).attr("class", a);
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
var d = this.handle;
if (d && d[a] && (d = d[a].apply(this, b || []), !1 === d)) return !1;
d = g.Event(a);
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
var a = this, b, d = a.listCell, e = a.listTable, c = a.po, k = c && c.locale(), l = k && k.isRTL(), h = c && c.length || 0;
if (!c || !c.row) return d && d.clear().header("Error").contents("Invalid messages list"), 
!1;
a.targetLocale = k;
a.lastSearch && (a.lastSearch = "", a.lastFound = h, a.fire("poFilter", [ "", h ]));
e && (b = e.thead().distribution());
a.listTable = e = d.tabulate({
eachCol: function(b) {
var d, e, c = a.getListColumns(), k = a.getListHeadings();
for (e in c) d = c[e], b(d, e, k[d]);
},
eachRow: function(b) {
c.each(function(d, e) {
b(e.idx, a.getListEntry(e), n(e));
});
},
sort: a.getSorter()
});
var f, d = a.getListColumns();
for (f in d) e.sortable(d[f]);
b && e.thead().distribute(b);
e.tbody().$(l ? "addClass" : "removeClass", [ "is-rtl" ]);
a.fire("poLoad");
return !!h;
};
u.load = function(a, b) {
this.po = a;
this.dict && this.rebuildSearch();
this.reload() && (-1 !== b ? this.listTable.selectRow(b || 0) : this.active && this.unloadActive());
};
u.pasteMessage = function(a) {
var b, d = 0;
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
var b = this.sourceCell, d = this.targetCell, e;
this.pasteMessage(a);
b && this.setSrcMeta(a, b) && b.redraw();
d && (e = d.navigated() || 0, e = this.setTrgMeta(a, e, d), !b && this.setSrcMeta(a, d) && (e = !0), 
e && d.redraw());
return this;
};
u.setStatus = function() {
return null;
};
u.setSrcMeta = function(a, b) {
var d = [], e, c = !1, k = this.$smeta, l = this.labels, h = [], f = a.tags(), z = f && f.length;
if (e = a.context()) h.push("<span>" + q(l[r]) + "</span>"), h.push("<mark>" + q(e) + "</mark>");
if (z && this.getTag) for (h.push("<span>Tagged:</span>"); 0 <= --z; ) (e = this.getTag(f[z])) && h.push('<mark class="tag">' + q(e.mod_name) + "</mark>");
h.length && d.push(h.join(" "));
if (this.getMono() && (e = a.refs()) && (f = e.split(/\s/), z = f.length)) {
for (h = []; 0 <= --z; ) e = f[z], h.push("<code>" + q(e) + "</code>");
d.push('<p class="has-icon icon-file">' + h.join(" ") + "</p>");
}
(e = a.notes()) && d.push('<p class="has-icon icon-info">' + q(e, !0) + "</p>");
d.length ? (k || (k = b.find("div.meta"), k.length || (k = g('<div class="meta"></div>').insertAfter(b.header())), 
m(this, k, "poMeta"), this.$smeta = k), k.html(d.join("\n")).show(), c = !0) : k && k.text() && (k.text("").hide(), 
c = !0);
return c;
};
u.setTrgMeta = function(a, b, d) {
var e = [], c = !1, k = this.$tmeta;
b = (a = a.errors(b)) && a.length;
var l;
if (b) for (l = 0; l < b; l++) e.push('<p class="has-icon icon-warn">' + q(a[l], !0) + ".</p>");
e.length ? (k || (k = d.find("div.meta"), k.length || (k = g('<div class="meta"></div>').insertAfter(d.header())), 
this.$tmeta = k), k.html(e.join("\n")).show(), c = !0) : k && k.text() && (k.text("").hide(), 
c = !0);
return c;
};
u.loadMessage = function(b) {
function c(a) {
if ("=" === a.charAt(0)) {
var b = a.split(" ");
a = b[0].substring(1);
b[0] = [ "Zero", "One", "Two" ][Number(a)] || a;
a = b.join(" ");
}
return a;
}
function f(a, d) {
var e = J, g = L[k];
a.off();
a.titled() !== g && h(a, g, d || "en");
g = !1;
q.setSrcMeta(b, a) && (g = !0);
if (b.plural()) {
var g = -1, r = [], n = [], s = a.id + "-", p = b.sourceForms() || d && d.plurals || [ "One", "Other" ], B = p.length;
if (2 !== B || "=" === p[0].charAt(0) && "=1" !== p[0]) for (;++g < B; ) r[g] = s + String(g), 
n[g] = c(p[g].split(" ", 1)[0]) + ":"; else r = [ s + "-0", s + "-1" ], n = [ L[l], L[z] ];
a.splity.apply(a, r);
a.each(function(a, d) {
a.header(n[d]).textarea(b.source(null, d), e).setStrf(C).setMode(x).setInvs(w);
});
a.lock();
e && a.each(function(a, b) {
m(a, b);
});
} else g && a.redraw(), a.textarea(b.source(), e).setStrf(C).setMode(x).setInvs(w), 
e && m(a, 0);
}
function m(c, k) {
c.on(d, function(a, d) {
b.source(d, k);
0 === k && q.updateListCell(b, "source");
q.unsave(b, k);
}).on(e, function() {
0 === k && q.po.reIndex(b);
q.dict && q.rebuildSearch();
q.fire(a, [ b ]);
});
}
function g(a, d, e) {
M && a.eachTextarea(function(a) {
a.ping();
});
a.off();
var k = d.isKnown() && d.label || "Target", k = y(L[B], k);
a.titled() !== k && h(a, k, d);
k = !1;
!this.sourceCell && q.setSrcMeta(b, a) && (k = !0);
q.setTrgMeta(b, e, a) && (k = !0);
q.setStatus(b, e);
if (1 !== d.nplurals && b.pluralized()) {
var l = [], f = [], m = a.id + "-", z = b.targetForms() || d.plurals || [ "One", "Other" ], k = z.length, r = function(a) {
f.push(c(z[a] || "Form " + a));
l.push(m + String(a));
};
for (b.eachMsg(r); (d = l.length) < k; ) r(d);
a.splitx.apply(a, l);
a.each(function(a, d) {
var e = M && !b.disabled(d);
a.textarea(b.translation(d), e).setStrf(C).setMode(x).setInvs(w);
M && n(a, d);
});
a.navigize(f, e || null).on("wgTabSelect", function(d, e) {
var c = M && d.cell.editable();
c && c.focus();
q.setTrgMeta(b, e, a);
q.setStatus(b, e);
q.fire("poTab", [ e ]);
});
} else k && a.redraw(), a.textarea(b.translation(), M && !b.disabled(0)).setStrf(C).setMode(x).setInvs(w), 
M && n(a, 0);
}
function n(c, k) {
c.on(d, function(a, d, e) {
b.translate(d, k);
0 === k && q.updateListCell(b, "target");
b.fuzzy(k) ? q.fuzzy(!1, b, k) : q.unsave(b, k);
"" === d ? (q.fire("poEmpty", [ !0, b, k ]), q.setStatus(b, k)) : "" === e && (q.fire("poEmpty", [ !1, b, k ]), 
q.setStatus(b, k));
}).on(e, function() {
q.dict && q.rebuildSearch();
q.fire(a, [ b ]);
});
}
function p(c) {
c.off();
var k = L[r];
c.titled() !== k && (h(c, k), q.setStatus(null));
c.textarea(b.context(), !0).setMode(x).setInvs(w);
X && c.on(d, function(a, d) {
b.context(d);
q.updateListCell(b, "source");
q.unsave(b, O);
}).on(e, function() {
q.po.reIndex(b);
q.dict && q.rebuildSearch();
q.fire(a, [ b ]);
});
}
function u(a) {
var e = L[s];
a.titled() !== e && h(a, e);
a.off().on(d, function(a, d) {
b.comment(d);
q.fire("poComment", [ b, d ]);
q.unsave(b, O);
}).textarea(b.comment(), !0);
}
var q = this, x = q.mode, D = b.isHTML(), w = q.inv || !1, E = this.fmt || null, C = b.format() || null, I = b.is(q.active), O = 0, T = q.sourceCell, S = q.targetCell, U = q.contextCell, V = q.commentCell, M = q.editable.target, J = q.editable.source, X = q.editable.context, P = A, Y = q.sourceLocale, W = q.targetLocale, L = q.labels;
q.html !== D && (q.html = D, "code" !== q.mode && (x = D ? "html" : "", q.setMode(x)));
q.active = b;
T && f(T, Y);
U && p(U);
S && W && (O = S.navigated() || 0, g(S, W, O));
V && u(V);
P && (P.exists() || (P = P.parent()), (D = P.editable()) && D.focus());
E !== C && (this.fmt = C);
I || q.fire("poSelected", [ b, O ]);
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
var a, b = this.t, d = this.mode || "", e = this.inv || !1, c = this.fmt;
this.unloadActive();
this.setStatus(null);
(a = this.commentCell) && a.textarea("", !1);
if (a = this.sourceCell) a.textarea("", !1).setStrf(c).setMode(d).setInvs(e), a.title(b._x("Source text not loaded", "Editor") + ":");
if (a = this.contextCell) a.textarea("", !1).setMode(d).setInvs(e), a.title(b._x("Context not loaded", "Editor") + ":");
if (a = this.targetCell) a.textarea("", !1).setStrf(c).setMode(d).setInvs(e), a.title(b._x("Translation not loaded", "Editor") + ":");
this.fire("poSelected", [ null ]);
};
u.updateListCell = function(a, b) {
var d = this.getListColumns()[b], e = this.po.indexOf(a);
(e = this.listTable.row(e)) && e.rendered && e.update(d);
};
u.cellText = function(a) {
return (a = -1 !== a.indexOf("<") || -1 !== a.indexOf("&") ? w(a) : a.trim()) || " ";
};
u.fuzzy = function(a, b, d) {
b = b || this.active;
var e = b.fuzzy(d);
!0 !== a || e ? !1 === a && e && this.flag(0, b, d) && this.fire("poFuzzy", [ b, !1, d ]) : this.flag(4, b, d) && this.fire("poFuzzy", [ b, !0, d ]);
return e;
};
u.flag = function(b, d, e) {
if (!d) {
d = this.active;
e = this.getTargetOffset();
if (null == e) return null;
e && d.targetForms() && (e = 0);
}
var c = d.flagged(e);
if (null == b) return c;
if (c === b || b && !d.translated(e) || !this.fire("poFlag", [ b, c, d, e ])) return !1;
d.flag(b, e);
this.fire(a, [ d ]) && this.unsave(d, e);
this.setStatus(d, e);
return !0;
};
u.add = function(b, d) {
var e, c = this.po.get(b, d);
c ? e = this.po.indexOf(c) : (e = this.po.length, c = this.po.add(b, d), this.load(this.po, -1), 
this.fire("poAdd", [ c ]), this.fire(a, [ c ]));
this.lastSearch && this.filter("");
this.listTable.select(e);
return c;
};
u.del = function(b) {
if (b = b || this.active) {
var d = this.lastSearch, e = this.po.del(b);
null != e && (this.unsave(b), this.fire("poDel", [ b ]), this.fire(a, [ b ]), this.reload(), 
this.dict && this.rebuildSearch(), this.active && this.active.equals(b) && this.unloadActive(), 
this.po.length && (d && this.filter(d), this.active || (e = Math.min(e, this.po.length - 1), 
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
u = null;
return f;
}({}, y, w));
p.register("$13", function(f, c, D) {
function n() {
this.init()._validate();
this.sourceLocale = {
lang: "en",
label: "English",
plurals: [ "One", "Other" ]
};
}
function h(a) {
a = g('<button type="button" class="button button-small icon icon-' + a + ' hastip"></button>');
p.require("$12", "tooltip.js").init(a);
return a;
}
function m(a) {
return h("cloud").attr("title", a.labels[8] + " (Ctrl-U)").on("click", function(b) {
b.preventDefault();
a.focus().fuzzy(!a.fuzzy());
});
}
function b(a) {
return h("robot").attr("title", a.labels[9] + " (Ctrl-J)").on("click", function(b) {
b.preventDefault();
a.fire("poHint");
});
}
c = p.require("$24", "base.js");
f.init = function(a) {
var b = new n();
a = b.setRootCell(a);
var e = a.splity("po-list", "po-edit"), c = e[0], l = e[1], e = l.splitx("po-trans", "po-comment"), h = e[0], f = e[1].header("Loading.."), e = h.splity("po-source", "po-target"), h = e[0].header("Loading.."), e = e[1].header("Loading..");
a.distribute([ .34 ]);
l.distribute([ .8 ]);
b.setListCell(c);
b.setSourceCell(h);
b.setTargetCell(e);
b.commentCell = f;
b.editable.source = !1;
return b;
};
c = n.prototype = c.extend(n);
c.getListHeadings = function() {
var a = this.t || {
_x: function(a) {
return a;
}
}, b = [ a._x("Source text", "Editor") ];
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
var b = this.cellText, e = [ function() {
var e, c = b(a.source() || ""), h = a.context();
return h ? (e = D.createElement("p"), e.appendChild(D.createElement("mark")).innerText = h, 
e.appendChild(D.createTextNode(" " + c)), e) : c;
} ];
this.targetLocale && (e[1] = function() {
return b(a.translation() || "");
});
return e;
};
c.stats = function() {
var a = this.po, b = a.length, e = 0, c = 0, l = 0;
a.each(function(a, b) {
b.fuzzy() ? l++ : b.translated() ? e++ : c++;
});
return {
t: b,
p: e.percent(b) + "%",
f: l,
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
c.setStatus = function(a) {
var d = this.$tnav;
if (null == a) d && (d.remove(), this.$tnav = null); else {
d || (this.$tnav = d = g("<nav></nav>").append(m(this)).append(b(this)).appendTo(this.targetCell.header()));
var e = [];
a.translated() ? a.fuzzy() && e.push("po-fuzzy") : e.push("po-empty");
d.attr("class", e.join(" "));
}
};
c.getSorter = function() {
function a(a, e) {
var c = a.weight(), h = e.weight();
return c === h ? b(a, e) : c > h ? -1 : 1;
}
function b(a, d) {
return a.hash().localeCompare(d.hash());
}
var e = this;
return function(c) {
var l = e.po, h = e.locked() ? a : b;
c.sort(function(a, b) {
return h(l.row(a), l.row(b));
});
};
};
return f;
}({}, y, w));
p.register("$14", function(f, c, p) {
var n = {
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
}, m = {
66: function(b, a) {
var d = a.current();
d && (d.normalize(), a.focus().pasteMessage(d));
},
75: function(b, a) {
var d = a.current();
d && (d.untranslate(), a.focus().pasteMessage(d));
},
85: function(b, a) {
a.focus().fuzzy(!a.fuzzy());
},
13: function(b, a) {
a.getFirstEditable() && a.next(1, !0, !0);
},
40: function(b, a) {
var d = b.shiftKey;
a.next(1, d, d);
},
38: function(b, a) {
var d = b.shiftKey;
a.next(-1, d, d);
},
73: function(b, a) {
if (!b.shiftKey) return !1;
a.setInvs(!a.getInvs());
}
};
f.init = function(b, a) {
function d(a) {
if (a.isDefaultPrevented() || !a.metaKey && !a.ctrlKey) return !0;
var d = a.which;
if (!e[d]) return !0;
var c = m[d];
if (!c) throw Error("command undefined #" + d);
if (a.altKey || a.shiftKey && !h[d] || !1 === c(a, b)) return !0;
a.stopPropagation();
a.preventDefault();
return !1;
}
var e = {};
g(a || c).on("keydown", d);
return {
add: function(a, b) {
m[n[a]] = b;
return this;
},
enable: function() {
var a, b;
for (b in arguments) a = n[arguments[b]], e[a] = !0;
return this;
},
disable: function() {
g(a || c).off("keydown", d);
b = a = e = null;
}
};
};
return f;
}({}, y, w));
p.register("$25", function(f, c, g) {
function n() {
this.reIndex([]);
}
f.init = function() {
return new n();
};
c = n.prototype;
c.reIndex = function(c) {
for (var f = {}, b = -1, a = c.length; ++b < a; ) f[c[b]] = b;
this.keys = c;
this.length = b;
this.ords = f;
};
c.key = function(c, f) {
if (null == f) return this.keys[c];
var b = this.keys[c], a = this.ords[f];
if (f !== b) {
if (null != a) throw Error("Clash with item at [" + a + "]");
this.keys[c] = f;
delete this.ords[b];
this.ords[f] = c;
}
return c;
};
c.indexOf = function(c) {
c = this.ords[c];
return null == c ? -1 : c;
};
c.add = function(c, f) {
var b = this.ords[c];
null == b && (this.keys[this.length] = c, b = this.ords[c] = this.length++);
this[b] = f;
return b;
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
c.cut = function(c, f) {
f = f || 1;
var b = [].splice.call(this, c, f);
this.keys.splice(c, f);
this.reIndex(this.keys);
return b;
};
c.each = function(c) {
for (var f = -1, b = this.keys, a = this.length; ++f < a; ) c(b[f], this[f], f);
return this;
};
c.sort = function(c) {
for (var f = -1, b = this.length, a, d = this.keys, e = this.ords, k = []; ++f < b; ) k[f] = [ this[f], d[f] ];
k.sort(function(a, b) {
return c(a[0], b[0]);
});
for (f = 0; f < b; f++) a = k[f], this[f] = a[0], a = a[1], d[f] = a, e[a] = f;
return this;
};
c.join = function(c) {
return [].join.call(this, c);
};
c = null;
return f;
}({}, y, w));
p.register("$26", function(f, c, g) {
function n(c, f) {
var b = RegExp("^.{0," + (c - 1) + "}[" + f + "]"), a = RegExp("^[^" + f + "]+");
return function(d, e) {
for (var k = d.length, f; k > c; ) {
f = b.exec(d) || a.exec(d);
if (null == f) break;
f = f[0];
e.push(f);
f = f.length;
k -= f;
d = d.substr(f);
}
0 !== k && e.push(d);
return e;
};
}
f.create = function(c) {
function f(a) {
return l[a] || "\\" + a;
}
var b, a, d = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g, e = /[ \r\n]+/g, k = /[\t\v\f\x07\x08\\\"]/g, l = {
"\t": "\\t",
"\v": "\\v",
"\f": "\\f",
"": "\\a",
"\b": "\\b"
};
if (null == c || isNaN(c = Number(c))) c = 79;
0 < c && (b = n(c - 3, " "), a = n(c - 2, "-– \\.,:;\\?!\\)\\]\\}\\>"));
return {
pair: function(b, e) {
if (!e) return b + ' ""';
e = e.replace(k, f);
var l = 0;
e = e.replace(d, function() {
l++;
return "\\n\n";
});
if (!(l || c && c < e.length + b.length + 3)) return b + ' "' + e + '"';
var g = [ b + ' "' ], n = e.split("\n");
if (a) for (var p = -1, q = n.length; ++p < q; ) a(n[p], g); else g = g.concat(n);
return g.join('"\n"') + '"';
},
prefix: function(a, b) {
var e = a.split(d);
return b + e.join("\n" + b);
},
refs: function(a) {
a = a.replace(e, " ", a);
b && (a = b(a, []).join("\n#: "));
return "#: " + a;
}
};
};
return f;
}({}, y, w));
p.register("$39", function(f, c, g) {
function n() {
this.length = 0;
}
f.init = function() {
return new n();
};
c = n.prototype;
c.push = function(c) {
this[this.length++] = c;
return this;
};
c.sort = function(c) {
[].sort.call(this, c);
return this;
};
c.each = function(c) {
for (var f = -1, b = this.length; ++f < b; ) c(f, this[f]);
return this;
};
return f;
}({}, y, w));
p.register("$27", function(f, c, g) {
function n() {}
f.extend = function(c) {
return c.prototype = new n();
};
c = n.prototype = p.require("$37", "abstract.js").init([ "add", "load" ]);
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
null == c ? c = this.loc : this.loc = c = p.require("$36", "locale.js").cast(c);
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
var f = this.rows.cut(c, 1);
if (f && f.length) return this.length = this.rows.length, this.rows.each(function(b, a, d) {
a.idx = d;
}), c;
}
};
c.reIndex = function(c, f) {
var b = this.indexOf(c), a = c.hash(), d = this.rows.indexOf(a);
return d === b ? b : -1 !== d ? (f = (f || 0) + 1, c.source("Error, duplicate " + String(f) + ": " + c.source()), 
this.reIndex(c, f)) : this.rows.key(b, a);
};
c.sort = function(c) {
this.rows.sort(c);
return this;
};
c["export"] = function() {
for (var c = -1, f = this.rows, b = f.length, a = p.require("$39", "list.js").init(); ++c < b; ) a.push(f[c]);
return a;
};
c = null;
return f;
}({}, y, w));
p.register("$28", function(f, c, g) {
function n(b, a, d) {
if (null == d) return b[a] || "";
b[a] = d || "";
return b;
}
function h() {
this._id = this.id = "";
}
function m(b, a) {
for (var d = -1, e = b.length; ++d < e; ) a(d, b[d]);
}
f.extend = function(b) {
return b.prototype = new h();
};
c = h.prototype;
c.flag = function(b, a) {
var d = this.flg || (this.flg = []);
if (null != a) d[a] = b; else for (var e = Math.max(d.length, this.src.length, this.msg.length); 0 !== e--; ) d[e] = b;
return this;
};
c.flagged = function(b) {
var a = this.flg || [];
if (null != b) return a[b] || 0;
for (b = a.length; 0 !== b--; ) if (a[b]) return !0;
return !1;
};
c.flags = function() {
for (var b, a = {}, d = [], e = this.flg || [], c = e.length; 0 !== c--; ) b = e[c], 
a[b] || (a[b] = !0, d.push(b));
return d;
};
c.flaggedAs = function(b, a) {
var d = this.flg || [];
if (null != a) return b === d[a] || 0;
for (var e = d.length; 0 !== e--; ) if (d[e] === b) return !0;
return !1;
};
c.fuzzy = function(b, a) {
var d = this.flaggedAs(4, b);
null != a && this.flag(a ? 4 : 0, b);
return d;
};
c.source = function(b, a) {
if (null == b) return this.src[a || 0] || "";
this.src[a || 0] = b;
return this;
};
c.plural = function(b, a) {
if (null == b) return this.src[a || 1] || "";
this.src[a || 1] = b || "";
return this;
};
c.sourceForms = function() {
return this.srcF;
};
c.targetForms = function() {
return this.msgF;
};
c.each = function(b) {
for (var a = -1, d = this.src, e = this.msg, c = Math.max(d.length, e.length); ++a < c; ) b(a, d[a], e[a]);
return this;
};
c.eachSrc = function(b) {
m(this.src, b);
return this;
};
c.eachMsg = function(b) {
m(this.msg, b);
return this;
};
c.count = function() {
return Math.max(this.src.length, this.msg.length);
};
c.pluralized = function() {
return 1 < this.src.length || 1 < this.msg.length;
};
c.translate = function(b, a) {
this.msg[a || 0] = b || "";
return this;
};
c.untranslate = function(b) {
if (null != b) this.msg[b] = ""; else {
var a = this.msg, d = a.length;
for (b = 0; b < d; b++) a[b] = "";
}
return this;
};
c.translation = function(b) {
return this.msg[b || 0] || "";
};
c.errors = function(b) {
return this.err && this.err[b || 0] || [];
};
c.translated = function(b) {
if (null != b) return !!this.msg[b];
var a = this.msg, d = a.length;
for (b = 0; b < d; b++) if (!a[b]) return !1;
return !0;
};
c.untranslated = function(b) {
if (null != b) return !this.msg[b];
var a = this.msg, d = a.length;
for (b = 0; b < d; b++) if (a[b]) return !1;
return !0;
};
c.comment = function(b) {
return n(this, "cmt", b);
};
c.notes = function(b) {
return n(this, "xcmt", b);
};
c.refs = function(b) {
return n(this, "rf", b);
};
c.format = function(b) {
return n(this, "fmt", b);
};
c.context = function(b) {
return n(this, "ctx", b);
};
c.tags = function() {
return this.tg;
};
c.toString = c.toText = function() {
return this.src.concat(this.msg, this.id, this.ctx).join(" ");
};
c.weight = function() {
var b = 0;
this.translation() || (b += 2);
this.fuzzy() && (b += 1);
return b;
};
c.equals = function(b) {
return this === b || this.hash() === b.hash();
};
c.hash = function() {
return this.id;
};
c.normalize = function() {
for (var b = this.msg.length; 0 !== b--; ) this.msg[b] = this.src[b] || "";
};
c.disabled = function(b) {
return !!(this.lck || [])[b || 0];
};
c.disable = function(b) {
(this.lck || (this.lck = []))[b || 0] = !0;
return this;
};
c.saved = function(b) {
var a = this.drt;
if (null == a) return !0;
if (null != b) return !a[b];
for (b = a.length; 0 !== b--; ) if (a[b]) return !1;
return !0;
};
c.unsave = function(b) {
(this.drt || (this.drt = []))[b || 0] = !0;
return this;
};
c.save = function(b) {
null == b ? this.drt = null : (this.drt || (this.drt = []))[b] = !1;
return this;
};
c.is = function(b) {
return b && (b === this || b.idx === this.idx);
};
c.isHTML = function(b) {
if (null == b) return this.htm || !1;
this.htm = b;
};
c = null;
return f;
}({}, y, w));
p.register("$15", function(f, c, g) {
function n(a) {
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
function m(a) {
var b = c.console;
b && b.error && b.error(a.message || String(a));
}
function b(a) {
return p.require("$26", "format.js").create(a);
}
function a(a) {
this.locale(a);
this.clear();
this.head = n(this.now());
}
function d(a, b) {
this.src = [ a || "" ];
this.msg = [ b || "" ];
}
f.create = function(b) {
return new a(b);
};
g = p.require("$27", "messages.js").extend(a);
g.clear = function() {
this.rows = p.require("$25", "collection.js").init();
this.length = 0;
return this;
};
g.now = function() {
function a(b, d) {
for (var e = String(b); e.length < d; ) e = "0" + e;
return e;
}
var b = new Date(), d = b.getUTCFullYear(), c = b.getUTCMonth() + 1, f = b.getUTCDate(), h = b.getUTCHours(), b = b.getUTCMinutes();
return a(d, 4) + "-" + a(c, 2) + "-" + a(f, 2) + " " + a(h, 2) + ":" + a(b, 2) + "+0000";
};
g.header = function(a, b) {
var d = this.head || (this.head = {});
if (null == b) return this.headers()[a] || "";
d[a] = b || "";
return this;
};
g.headers = function(a) {
var b, d = this.now(), c = this.head || (this.head = n(d));
if (null != a) {
for (b in a) c[b] = a[b];
return this;
}
var f = this.locale();
a = {};
for (b in c) a[b] = String(c[b]);
f ? (a.Language = String(f) || "zxx", a["Language-Team"] = f.label || a.Language, 
a["Plural-Forms"] = "nplurals=" + (f.nplurals || "2") + "; plural=" + (f.pluraleq || "n!=1") + ";", 
b = "PO-Revision-Date") : (a.Language = "", a["Plural-Forms"] = "nplurals=INTEGER; plural=EXPRESSION;", 
a["PO-Revision-Date"] = "YEAR-MO-DA HO:MI+ZONE", b = "POT-Creation-Date");
a[b] || (a[b] = d);
a["X-Generator"] = "Loco https://localise.biz/";
return a;
};
g.get = function(a, b) {
var d = h(a, b);
return this.rows.get(d);
};
g.add = function(a, b) {
a instanceof d || (a = new d(a));
b && a.context(b);
var c = a.hash();
this.rows.get(c) ? m("Duplicate message at index " + this.indexOf(a)) : (a.idx = this.rows.add(c, a), 
this.length = this.rows.length);
return a;
};
g.load = function(a) {
for (var b = -1, c, f, h, g, n, p, x = (h = this.locale()) && h.nplurals || 2, q = []; ++b < a.length; ) c = a[b], 
null == c.parent ? (f = c.source || c.id, h = c.target || "", g = c.context, f || g ? (n = new d(f, h), 
n._id = c._id, g && n.context(g), c.flag && n.flag(c.flag, 0), c.comment && n.comment(c.comment), 
c.notes && n.notes(c.notes), c.refs && n.refs(c.refs), n.format(c.format), c.message = n, 
this.add(n), c.prev && c.prev[0] && (n.prev(c.prev[0].source, c.prev[0].context), 
c.prev[1] && n._src.push(c.prev[1].source || ""))) : 0 === b && "object" === typeof h && (this.head = h, 
this.headcmt = c.comment)) : q.push(c);
for (b = -1; ++b < q.length; ) try {
c = q[b];
f = c.source || c.id;
n = a[c.parent] && a[c.parent].message;
if (!n) throw Error("parent missing for plural " + f);
p = c.plural;
1 === p && n.plural(f);
p >= x || (c.flag && n.flag(c.flag, p), n.translate(c.target || "", p), c.format && !n.format() && n.format(c.format));
} catch (w) {
m(w);
}
return this;
};
g.wrap = function(a) {
this.fmtr = b(a);
return this;
};
g.toString = function() {
var a, c = this.locale(), f = [], h = [], g = this.headers(), m = !c, n = c && c.nplurals || 2, p = this.fmtr || b();
g[c ? "PO-Revision-Date" : "POT-Creation-Date"] = this.now();
for (a in g) h.push(a + ": " + g[a]);
h = new d("", h.join("\n"));
h.comment(this.headcmt || "");
m && h.fuzzy(0, !0);
f.push(h.toString());
f.push("");
this.rows.each(function(a, b) {
a && (f.push(b.cat(p, m, n)), f.push(""));
});
return f.join("\n");
};
g = p.require("$28", "message.js").extend(d);
g.prev = function(a, b) {
this._src = [ a || "" ];
this._ctx = b;
};
g.hash = function() {
return h(this.source(), this.context());
};
g.toString = function() {
return this.cat(b());
};
g.cat = function(a, b, d) {
var c, f = [], h;
(h = this.cmt) && f.push(a.prefix(h, "# "));
(h = this.xcmt) && f.push(a.prefix(h, "#. "));
c = this.rf;
if (h = this._id) c += (c ? " " : "") + "loco:" + h;
c && /\S/.test(c) && f.push(a.refs(c));
!b && this.fuzzy() && f.push("#, fuzzy");
(h = this.fmt) && f.push("#, " + h + "-format");
(h = this._ctx) && f.push(a.prefix(a.pair("msgctxt", h), "#| "));
if (h = this._src) h[0] && f.push(a.prefix(a.pair("msgid", h[0]), "#| ")), h[1] && f.push(a.prefix(a.pair("msgid_plural", h[1]), "#| "));
(h = this.ctx) && f.push(a.pair("msgctxt", h));
f.push(a.pair("msgid", this.src[0]));
if (null == this.src[1]) f.push(a.pair("msgstr", b ? "" : this.msg[0])); else for (c = -1, 
f.push(a.pair("msgid_plural", this.src[1])), h = this.msg || [ "", "" ], d = d || h.length; ++c < d; ) f.push(a.pair("msgstr[" + c + "]", b ? "" : h[c] || ""));
return f.join("\n");
};
g.compare = function(a, b) {
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
g.copy = function() {
var a = new d(), b, c;
for (b in this) this.hasOwnProperty(b) && ((c = this[b]) && c.concat && (c = c.concat()), 
a[b] = c);
return a;
};
g = g = null;
return f;
}({}, y, w));
p.register("$17", function(f, c, p) {
f.init = function(c, f) {
function m() {
return e || (e = g('<div id="loco-po-ref"></div>').dialog({
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
m().dialog("close").html("").dialog("option", "title", "Error").append(a).dialog("open");
}
function a(a) {
var b = a && a.code;
if (b) {
for (var d = -1, c = b.length, e = g("<ol></ol>").attr("class", a.type); ++d < c; ) g("<li></li>").html(b[d]).appendTo(e);
e.find("li").eq(a.line - 1).attr("class", "highlighted");
m().dialog("close").html("").dialog("option", "title", a.path + ":" + a.line).append(e).dialog("open");
}
}
function d(a) {
a = a.target;
var b = g(a).find("li.highlighted")[0], b = Math.max(0, (b && b.offsetTop || 0) - Math.floor(a.clientHeight / 2));
a.scrollTop = b;
}
var e;
return {
load: function(e) {
m().html('<div class="loco-loading"></div>').dialog("option", "title", "Loading..").off("dialogopen").dialog("open").on("dialogopen", d);
e = g.extend({
ref: e,
path: f.popath
}, f.project || {});
c.ajax.post("fsReference", e, a, b);
}
};
};
return f;
}({}, y, w));
p.register("$30", function(f, c, g) {
function n(c) {
this.api = c;
this.chars = 0;
}
f.create = function(c) {
return new n(c);
};
c = n.prototype;
c.init = function(c, f) {
function b(a) {
var b = {
length: 0,
html: a.html,
sources: []
};
A.push(b);
return x[a.html ? 1 : 0] = b;
}
function a(a, c) {
var h = a.source(null, c);
if (h && (a.untranslated(c) || f)) {
var u = s[h];
if (u) u.push(a); else {
var u = h.length, v = d.isHtml(h), v = x[v ? 1 : 0], A = v.sources;
if (p && u > p) l++; else {
if (v.length + u > n || A.length === g) v = b(v), A = v.sources;
A.push(h);
s[h] = [ a ];
v.length += u;
e += u;
k += 1;
}
}
}
}
var d = this.api, e = 0, k = 0, l = 0, g = 50, n = 1e4, p = d.maxChr(), s = {}, A = [], x = [];
p && (n = Math.min(n, p));
b({
html: !1
});
b({
html: !0
});
c.each(function(b, d) {
a(d, 0);
a(d, 1);
});
delete x;
this.map = s;
this.chars = e;
this.length = k;
this.batches = A;
this.locale = c.locale();
l && d.stderr("Strings over " + n + " characters long will be skipped");
};
c.abort = function() {
this.state = "abort";
return this;
};
c.dispatch = function() {
function c(a, b) {
function d(c, f, k) {
b !== k && (a === f || 1 < c && e.source(null, 1) === a) && (e.translate(b, c), 
p++, q++);
return p;
}
if (!f()) return !1;
if (!b) return !0;
var e, h = n[a] || [], l = h.length, g = -1, p;
for (A++; ++g < l; ) if (e = h[g]) p = 0, e.each(d), p && k("each", [ e ]);
return !0;
}
function f() {
return "abort" === l.state ? (g && (g.abort(), e()), !1) : !0;
}
function b() {
var b = p.shift(), f;
b ? (f = b.sources) && f.length ? g.batch(f, s, b.html, c).fail(a).always(d) : d() : e();
}
function a() {
l.abort();
e();
}
function d() {
x++;
k("prog", [ x, y ]);
f() && b();
}
function e() {
g = p = null;
k("done");
}
function k(a, b) {
for (var d = u[a] || [], c = d.length; 0 <= --c; ) d[c].apply(null, b);
}
var l = this, g = l.api, n = l.map, p = l.batches || [], s = l.locale, A = 0, x = 0, q = 0, w = l.length, y = p.length, u = {
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
return Math.max(w - A, 0);
},
did: function() {
return A;
}
};
}
};
};
return f;
}({}, y, w));
p.register("$40", {
zh: [ "zh", "zh-CN", "zh-TW" ],
he: [ "iw" ],
jv: [ "jw" ]
});
p.register("$31", function(f, c, g) {
function n() {}
f.create = function(c) {
c = n.prototype = new c();
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
for (var b = [], a = c.error.errors || [], d = a.length, e = -1; ++e < d; ) b.push(a[e].message || "");
return "Error " + c.error.code + ": " + b.join(";");
}
return "";
};
c.batch = function(c, b, a, d) {
function e(a) {
for (var e = c.length, f = -1, k; ++f < e && (k = a[f] || {}, !1 !== d(c[f], k.translatedText || "", b)); ) ;
}
var f = this, h = this.getSrc();
a = a ? "html" : "text";
var g = f.mapLang(b, p.require("$40", "google.json"));
return f._call({
url: "https://translation.googleapis.com/language/translate/v2?source=" + h + "&target=" + g + "&format=" + a,
method: "POST",
traditional: !0,
data: {
key: f.key(),
q: c
}
}).done(function(a, b, d) {
a.data ? e(a.data.translations || []) : (f.stderr(f.parseError(a) || f.httpError(d)), 
e([]));
}).fail(function() {
e([]);
});
};
return new n();
};
return f;
}({}, y, w));
p.register("$41", {
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
p.register("$32", function(f, c, g) {
function n() {}
f.create = function(c) {
c = n.prototype = new c();
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
c.batch = function(c, b, a, d) {
function e(a) {
for (var e = -1, f; ++e < n && (f = a[e] || {}, f = f.translations || [], f = f[0] || {}, 
!1 !== d(c[e], f.text || "", b)); ) ;
}
var f = this, h = [], g = f.getSrc(), n = c.length, r = -1;
a = a ? "html" : "plain";
for (var s = f.mapLang(b, p.require("$41", "ms.json")); ++r < n; ) h.push({
text: c[r]
});
return f._call({
url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=" + g + "&to=" + s + "&textType=" + a,
method: "POST",
data: JSON.stringify(h),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"Ocp-Apim-Subscription-Key": this.key(),
"Ocp-Apim-Subscription-Region": f.param("region") || "global"
}
}).done(function(a, b, d) {
a && a.length ? e(a) : (f.stderr(f.parseError(a) || f.httpError(d)), e([]));
}).fail(function() {
e([]);
});
};
return new n();
};
return f;
}({}, y, w));
p.register("$42", {
pt: [ "pt-PT", "pt-BR" ]
});
p.register("$33", function(f, c, g) {
function n() {}
f.create = function(c) {
c = n.prototype = new c();
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
c.batch = function(c, b, a, d) {
function e(a) {
for (var e = c.length, f = -1, k; ++f < e && (k = a[f] || {}, !1 !== d(c[f], k.text || "", b)); ) ;
}
var f = this;
a = this.getSrc();
var h = f.param("url") || "https://api.deepl.com", g = f.mapLang(b, p.require("$42", "deepl.json")), n = b.tone, r = "default";
null == n && (n = String(b.variant || "").toLowerCase());
"formal" === n ? r = "more" : "informal" === n && (r = "less");
return f._call({
url: f.fixURL(h + "/v2/translate"),
method: "POST",
traditional: !0,
data: {
source_lang: a.toUpperCase(),
target_lang: g.toUpperCase(),
formality: r,
preserve_formatting: "1",
auth_key: f.key(),
text: c
}
}).done(function(a, b, d) {
a.translations ? e(a.translations) : (f.stderr(f.parseError(a) || f.httpError(d)), 
e([]));
}).fail(function() {
e([]);
});
};
return new n();
};
return f;
}({}, y, w));
p.register("$43", {
zh: [ "zh", "zh-CN", "zh-TW" ],
pt: [ "pt", "pt-PT", "pt-BR" ]
});
p.register("$34", function(f, c, g) {
function n() {}
f.create = function(c) {
c = n.prototype = new c();
c.getUrl = function() {
return "https://lecto.ai/?ref=loco";
};
c.parseError = function(c) {
var b = c.details || {}, a = b.message, b = b.texts;
return a ? (b && b !== a && (a += "; " + b), a = a.replace(/https?:\/\/(?:[a-z]+\.)?lecto.ai[-\w\/?&=%.+~]*/, function(a) {
a += -1 === a.indexOf("?") ? "?" : "&";
return a + "ref=loco";
}), "Error " + (c.status || "0") + ": " + a) : "";
};
c.maxChr = function() {
return 1e3;
};
c.batch = function(c, b, a, d) {
function e(a) {
for (var e = c.length, f = -1, k = (a[0] || {
translated: []
}).translated || []; ++f < e && (a = k[f] || "", !1 !== d(c[f], a, b)); ) ;
}
var f = this;
a = this.getSrc();
var h = f.param("url") || "https://api.lecto.ai", g = f.mapLang(b, p.require("$43", "lecto.json"));
return f._call({
url: f.fixURL(h + "/v1/translate/text"),
method: "POST",
data: JSON.stringify({
to: [ g ],
from: a,
texts: c
}),
headers: {
"Content-Type": "application/json; charset=UTF-8",
"X-API-Key": f.key(),
Accept: "application/json"
}
}).done(function(a, b, c) {
a ? e(a.translations || []) : (f.stderr(f.parseError(a) || f.httpError(c)), e([]));
}).fail(function() {
e([]);
});
};
return new n();
};
return f;
}({}, y, w));
p.register("$18", function(f, c, w) {
function n() {
this.inf = {};
}
function h() {
var a = w.createElement("p"), b = /&(#\d+|#x[0-9a-f]|[a-z]+);/i, c = /<[a-z]+\s/i, f, h;
return {
sniff: function(g) {
if (g === f) return h;
f = g;
if (b.test(g) || c.test(g)) if (a.innerHTML = g, a.textContent !== g) return h = !0;
return h = !1;
}
};
}
var m = n.prototype;
m.init = function(a) {
this.inf = a || {};
};
m.param = function(a) {
return this.inf[a] || "";
};
m.key = function() {
return this.param("key");
};
m.getId = function() {
return this.param("id") || "none";
};
m.getUrl = function() {
return this.param("url") || "#";
};
m.toString = function() {
return this.param("name") || this.getId();
};
m.getSrc = function() {
return this.param("src") || "en";
};
m.stderr = function(a) {
var b = (c.loco || {}).notices || c.console;
b && b.error && b.error(String(this) + ": " + String(a));
};
m.httpError = function(a) {
return (a = a && a.status) && 200 !== a ? "Responded status " + a : "Unknown error";
};
m.parseError = function() {
return "";
};
m.mapLang = function(a, b) {
var c = String(a).replace("-", "_"), f = a.lang, g = b[c] || b[f] || [], h = g.length;
if (0 === h) return f;
if (1 < h) for (var c = c.toLowerCase(), f = -1, n; ++f < h; ) if (n = g[f], n.toLowerCase().replace("-", "_") === c) return n;
return g[0];
};
m.toLang = function(a) {
return String(a);
};
m.maxChr = function() {
return 0;
};
m.fixURL = function(a) {
a = a.split("://", 2);
1 === a.length && a.unshift("https");
return a[0] + "://" + a[1].replace(/\/{2,}/g, "/");
};
m.translate = function(a, b, c) {
return this.batch([ a ], b, this.isHtml(a), c);
};
m._call = function(a) {
var b = this;
b.state = null;
a.cache = !0;
a.dataType = "json";
a.error = function(a, c, f) {
try {
var g = a.responseText, h = g && p.require("$5", "json.js").parse(g);
f = h && b.parseError(h) || f;
} catch (n) {}
b.stderr(f || b.httpError(a));
};
return b.abortable(g.ajax(a));
};
m.abortable = function(a) {
var b = this;
a.always(function() {
b.$r === a && (b.$r = null);
});
return b.$r = a;
};
m.abort = function() {
var a = this.$r;
a && a.abort();
};
m.isHtml = function(a) {
return (b || (b = h())).sniff(a);
};
m.createJob = function() {
return p.require("$30", "job.js").create(this);
};
m.batch = function(a, b, e, f) {
function h(c) {
for (var e = a.length, g = -1; ++g < e && !1 !== f(a[g], c[g], b); ) ;
}
var n = c.loco.ajax;
e = {
hook: this.getId(),
type: e ? "html" : "text",
locale: this.toLang(b),
source: this.getSrc(),
sources: a
};
var m = g.Deferred();
this.abortable(n.post("apis", e, function(a) {
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
b = "google" === b ? p.require("$31", "google.js").create(n) : "microsoft" === b ? p.require("$32", "ms.js").create(n) : "deepl" === b ? p.require("$33", "deepl.js").create(n) : "lecto" === b ? p.require("$34", "lecto.js").create(n) : new n();
b.init(a);
return b;
};
f.suggest = function(a, b, c, f) {
var g, h, n = a.length;
for (g = 0; g < n; g++) h = a[g], h.translate(b, c, f);
};
var b;
return f;
}({}, y, w));
p.register("$19", function(f, c, p) {
f.init = function(f) {
function h() {
H || (I.on("click", l), H = g('<div id="loco-fs-creds"></div>').dialog({
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
function m() {
R && (b(g(x)), R = !1);
if (E && J) {
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
if (E) return H && H.dialog("close"), m(), g(f).find('button[type="submit"]').attr("disabled", !1), 
g(c).triggerHandler("resize"), y && y(!0), !0;
v && H ? (R || (g(x).removeClass("jshide").hide().fadeIn(500), R = !0), K && (b(g(Q)), 
K = !1)) : m();
g(f).find('input[type="submit"]').attr("disabled", !0);
y && y(!1);
return !1;
}
function d(a) {
var b, c, d = s || {};
for (b in d) d.hasOwnProperty(b) && (c = d[b], a[b] ? a[b].value = c : g('<input type="hidden" />').attr("name", b).appendTo(a).val(c));
}
function e(a) {
a.preventDefault();
a = g(a.target).serializeArray();
r(a);
C = !0;
return !1;
}
function k(a) {
a.preventDefault();
H.dialog("close");
return !1;
}
function l(a) {
a.preventDefault();
H.dialog("open").find('input[name="connection_type"]').change();
return !1;
}
function z(b) {
E = b.authed;
q = b.method;
g(x).find("span.loco-msg").text(b.message || "Something went wrong.");
J = b.warning || "";
b.notice && u.notices.info(b.notice);
if (E) "direct" !== q && (s = b.creds, d(f), C && b.success && u.notices.success(b.success)), 
a(); else if (b.reason) u.notices.info(b.reason); else if (b = b.prompt) {
var l = h();
l.html(b).find("form").on("submit", e);
l.dialog("option", "title", l.find("h2").remove().text());
l.find("button.cancel-button").show().on("click", k);
l.find('input[type="submit"]').addClass("button-primary");
a();
g(c).triggerHandler("resize");
} else u.notices.error("Server didn't return credentials, nor a prompt for credentials");
}
function w() {
a();
}
function r(a) {
C = !1;
u.ajax.setNonce("fsConnect", N).post("fsConnect", a, z, w);
return a;
}
var s, y, x = f, q = null, C = !1, E = !1, u = c.loco, v = f.path.value, F = f.auth.value, N = f["loco-nonce"].value, I = g(x).find("button.button-primary"), Q = p.getElementById(x.id + "-warn"), R = !1, K = !1, J = "", H;
u.notices.convert(Q).stick();
f.connection_type ? (s = {}, s.connection_type = f.connection_type.value, E = !0) : v && F && r({
path: v,
auth: F
});
a();
return {
applyCreds: function(a) {
if (a.nodeType) d(a); else {
var b, c = s || {};
for (b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
}
return this;
},
setForm: function(b) {
f = b;
a();
d(b);
return this;
},
connect: function() {
v = f.path.value;
F = f.auth.value;
r(g(f).serializeArray());
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
p.register("$20", function(f, c, w) {
function n(c, e, f, g) {
e = "n" === f ? m(e) : b(e);
g && (e = a(e));
return h([].sort, [ e ])(c);
}
function h(a, b) {
return function(c) {
a.apply(c, b);
return c;
};
}
function m(a) {
return function(b, c) {
var f = b && b[a] || 0, g = c && c[a] || 0;
return f === g ? 0 : f > g ? 1 : -1;
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
for (g("tr", x).remove(); ++c < d; ) x.appendChild(a[c].$);
}
function c(a) {
r = a ? y.find(a, f) : f.slice(0);
w && (a = h[w], r = n(r, w, a.type, a.desc));
b(r);
}
var f = [], h = [], m = 0, r, s, w, x = a.getElementsByTagName("tbody")[0], q = a.getElementsByTagName("thead")[0], y = p.require("$10", "fulltext.js").init();
q && x && (g("th", q).each(function(a, c) {
var d = c.getAttribute("data-sort-type");
d && (a = m, g(c).addClass("loco-sort").on("click", function(c) {
c.preventDefault();
c = a;
var d = h[c], k = d.type, m = !(d.desc = !d.desc);
r = n(r || f.slice(0), c, k, m);
b(r);
s && s.removeClass("loco-desc loco-asc");
s = g(d.$).addClass(m ? "loco-desc" : "loco-asc").removeClass(m ? "loco-asc" : "loco-desc");
w = c;
return !1;
}), h[m] = {
$: c,
type: d
});
c.hasAttribute("colspan") ? m += Number(c.getAttribute("colspan")) : m++;
}), g("tr", x).each(function(a, b) {
var c, d, e, g = [], k = {
_: a,
$: b
}, m = b.getElementsByTagName("td");
for (d in h) {
c = m[d];
(e = c.textContent.replace(/(^\s+|\s+$)/g, "")) && g.push(e);
c.hasAttribute("data-sort-value") && (e = c.getAttribute("data-sort-value"));
switch (h[d].type) {
case "n":
e = Number(e);
}
k[d] = e;
}
f[a] = k;
y.index(a, g);
}), a = g('form.loco-filter input[type="text"]', a.parentNode), a.length && (a = a[0], 
q = g(a.form), 1 < f.length ? p.require("$11", "LocoTextListener.js").listen(a, c) : q.hide(), 
q.on("submit", function(a) {
a.preventDefault();
return !1;
})));
};
return f;
}({}, y, w));
var C = y.loco || {}, I = C.conf || {
$v: [ 0, 0 ]
};
y = p.require("$1", "t.js").init();
w = I.wplang;
C.version = function(f) {
return I.$v[f || 0];
};
p.require("$2", "html.js");
p.require("$3", "number.js");
p.require("$4", "array.js");
p.require("$5", "json.js");
C.l10n = y;
y.load(I.wpl10n);
w && y.pluraleq(w.pluraleq);
C.string = p.require("$6", "string.js");
C.notices = p.require("$7", "notices.js").init(y);
C.ajax = p.require("$8", "ajax.js").init(I).localise(y);
C.locale = p.require("$9", "wplocale.js");
C.fulltext = p.require("$10", "fulltext.js");
C.watchtext = p.require("$11", "LocoTextListener.js").listen;
C.tooltip = p.require("$12", "tooltip.js");
C.po = {
ed: p.require("$13", "poedit.js"),
kbd: p.require("$14", "hotkeys.js"),
init: p.require("$15", "po.js").create,
ace: p.require("$16", "ace.js").strf("php"),
ref: p.require("$17", "refs.js")
};
C.apis = p.require("$18", "apis.js");
C.fs = p.require("$19", "fsconn.js");
g("#loco-admin.wrap table.wp-list-table").each(function(f, c) {
p.require("$20", "tables.js").init(c);
});
C.validate = function(f) {
return "2.6.2" !== (/^\d+\.\d+\.\d+/.exec(f && f[0] || "") && RegExp.lastMatch) ? (C.notices.warn("admin.js is the wrong version (2.6.2). Please empty all relevant caches and reload this page."), 
!1) : !0;
};
})(window, document, window.jQuery);
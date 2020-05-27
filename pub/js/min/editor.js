!function(k,S){var C,t,_,n,D=k.locoScope,i=k.locoConf,p=!!i.WP_DEBUG,r=D.po.ref&&D.po.ref.init(D,i),l=null,a=null,o=i.multipart,z=D.l10n,b=D.string.sprintf,T=i.locale,m=D.po.init(T).wrap(i.powrap),s=!T,e=document.getElementById("loco-actions"),c=i.popath,u=i.potpath,d=document.getElementById("loco-fs"),f=d&&D.fs.init(d),g=!i.readonly,v=document.getElementById("loco-editor-inner"),h=i.apis||[],I={};function y(d){D.ajax.post("sync",l,function(t){var n=[],o=m,e=t.po,a=t.pot,i=D.po.init().load(e),r=o.merge(i),l=r.add.length,s=r.del.length,c=r.fuz.length,u=z;C.load(o),l||s||c?(a?n.push(b(u._("Merged from %s"),a)):n.push(u._("Merged from source code")),l&&n.push(b(u._n("1 new string added","%s new strings added",l),l)),s&&n.push(b(u._n("1 obsolete string removed","%s obsolete strings removed",s),s)),c&&n.push(b(u._n("1 string marked Fuzzy","%s strings marked Fuzzy",c),c)),S(v).trigger("poUnsaved",[]),F(),p&&k.console&&function(t,n){function o(t){var n=t.source(),o=t.context();return o?"["+o+"] "+n:n}var e=-1,a=n.add.length;for(;++e<a;)t.log(" + "+o(n.add[e]));for(a=n.del.length,e=0;e<a;e++)t.log(" - "+o(n.del[e]));for(a=n.fuz.length,e=0;e<a;e++)t.log(" ~ "+o(n.fuz[e]))}(console,r)):a?n.push(b(u._("Strings up to date with %s"),a)):n.push(u._("Strings up to date with source code")),D.notices.success(n.join(". ")),S(v).trigger("poMerge",[t]),d&&d()},d)}function j(){return t=t||function(){for(var t,n=-1,o=[],e=h,a=e.length;++n<a;)try{t=e[n],o.push(D.apis.create(t))}catch(t){D.notices.error(String(t))}return o}()}function x(){h.length?function(){var c=z,t=C.current(),n=C.getTargetOffset(),o=t&&t.source(null,n),u='lang="'+String(T)+'" dir="'+(T.isRTL()?"RTL":"LTR")+'"',d=99;if(!o)return;function e(t){return!t.isDefaultPrevented()&&(0<=(n=t.which-49)&&n<10&&(o=f&&f.find("button.button-primary").eq(n))&&1===o.length&&(t.stopPropagation(),o.click()),!0);var n,o}function a(t,n,o,e){var a=e.getId(),i=e.getUrl(),r=String(e),l=m&&m[a],s=S('<button class="button button-primary"></button>').attr("tabindex",String(++d)).text(c._("Use this translation")).on("click",function(e,a){return function(t){t.preventDefault(),t.stopPropagation(),p();var n=C.current(),o=C.getTargetOffset();n&&n.source(null,o)===e?(n.translate(a,o),C.focus().reloadMessage(n)):D.notices.warn("Source changed since suggestion")}}(t,n));l&&l.replaceWith(S('<div class="loco-api loco-api-'+a+'"></div>').append(S('<a class="loco-api-credit" target="_blank" tabindex="-1"></a>').attr("href",i).text(r)).append(S("<blockquote "+u+"></blockquote>").text(n||"FAILED")).append(s)),f.dialog("option","position",{my:"center",at:"center",of:k}),++y===v&&f&&f.dialog("option","title",c._("Suggested translations")+" — "+o.label),1===y&&s.focus(),s.attr("accesskey",String(y))}function p(t){f&&null==t&&f.dialog("close"),m=f=null,S(k).off("keydown",e)}function i(e){return function(t,n,o){a(t,b[e.getId()]=n,o,e)}}var f=(_=_||S('<div id="loco-hint"></div>').dialog({dialogClass:"loco-modal",modal:!0,autoOpen:!1,closeOnEscape:!0,resizable:!1,minHeight:400})).html("").append(S('<div class="loco-api"><p>Source text:</p></div>').append(S('<blockquote lang="en"></blockquote>').text(o))).dialog("option","title",c._("Loading suggestions")+"...").off("dialogclose").on("dialogclose",p).dialog("open"),r=t.translation(n);r&&S('<div class="loco-api"><p>Current translation:</p></div>').append(S("<blockquote "+u+"></blockquote>").text(r)).append(S('<button class="button"></button>').attr("tabindex",String(++d)).text(c._("Keep this translation")).on("click",function(t){t.preventDefault(),p()})).appendTo(f);var l,s,g=j(),v=g.length,h=-1,b=I[o]||(I[o]={}),m={},y=0;for(;++h<v;)l=g[h],f.append((x=l,void 0,w=S('<div class="loco-api loco-api-loading"></div>').text("Calling "+x+" ..."),m[x.getId()]=w)),s=l.getId(),b[s]?a(o,b[s],T,l):l.translate(o,T,i(l));var x,w;S(k).on("keydown",e)}():E()}function w(t){return t.preventDefault(),h.length?function(){var e,a,i,r=0,l=z,n=!1,s=M().dialog("open"),t=s.find("form"),c=t.find("button.button-primary"),o=S("#loco-job-progress");function u(){c[0].disabled=!0}function d(){c.removeClass("loco-loading")}function p(t){o.text(t)}function f(t){var n=function(t){for(var n,o=j(),e=o.length,a=-1;++a<e;)if((n=o[a]).getId()===t)return n;D.notices.error("No "+t+" client")}(S(t.api).val()),o=t.existing.checked;p("Calculating...."),(e=n.createJob()).init(m,o),a=n.toString(),p(b(l._("%s unique source strings."),e.length.format(0))+" "+b(l._("%s characters will be sent for translation."),e.chars.format(0))),e.length?c[0].disabled=!1:u(),i=null}function g(t){e&&(n&&t.fuzzy(0,!0),C.pasteMessage(t),t===C.active&&C.setStatus(t),C.unsave(t,0),r++)}function v(t,n){var o=n?100*t/n:0;p(b(l._("Translation progress %s%%"),o.format(0)))}function h(){if(d(),e&&i){var t=i.todo();t&&D.notices.warn(b(l._n("Translation job aborted with one string remaining","Translation job aborted with %s strings remaining",t),t.format(0))).slow();var n=[],o=i.did();o&&n.push(b(l._n("%s string translated via %s","%s strings translated via %s",o),o.format(0),a)),r?n.push(b(l._n("%s string updated","%s strings updated",r),r.format(0))):n.push(l._("Nothing needed updating")),D.notices.success(n.join(". ")).slow(),i=e=null}r&&(F(),C.rebuildSearch()),s&&(s.off("dialogclose").dialog("close"),s=null),C.fire("poAuto")}d(),u(),D.notices.clear(),t.off("submit change"),f(t[0]),t.on("change",function(t){var n=t.target,o=n.name;return"api"!==o&&"existing"!==o||f(n.form),!0}).on("submit",function(t){t.preventDefault(),c.addClass("loco-loading"),u(),v(r=0),n=t.target.fuzzy.checked,i=e.dispatch().done(h).each(g).prog(v).stat()}),s.off("dialogclose").on("dialogclose",function(){e.abort(),s=null,h()})}():E(),!1}function M(){return n||(n=S("#loco-auto")).dialog({dialogClass:"loco-modal",appendTo:"#loco.wrap",title:n.attr("title"),modal:!0,closeOnEscape:!0,resizable:!1,position:{my:"top",at:"top",of:"#loco-content"}}),n}function E(){M().dialog("open")}function U(n){var t=S.extend({locale:String(m.locale()||"")},a||{});f&&f.applyCreds(t),o?(t=function(t){var n,o=new FormData;for(n in t)t.hasOwnProperty(n)&&o.append(n,t[n]);return o}(t)).append("po",new Blob([String(m)],{type:"application/x-gettext"}),String(t.path).split("/").pop()||"untitled.po"):t.data=String(m),D.ajax.post("save",t,function(t){n&&n(),C.save(!0),S("#loco-po-modified").text(t.datetime||"[datetime error]")},n)}function q(){return z._("Your changes will be lost if you continue without saving")}function B(e,a){return e.disabled=!1,S(e).click(function(t){var n=e.form,o=c;return"binary"===a&&(o=o.replace(/\.po$/,".mo")),n.path.value=o,n.source.value=m.toString(),!0}),!0}function L(t){return t.preventDefault(),!1}function F(){var t=z,n=C.stats(),o=n.t,e=n.f,a=n.u,i=b(t._n("1 string","%s strings",o),o.format(0)),r=[];T&&(i=b(t._("%s%% translated"),n.p.replace("%",""))+", "+i,e&&r.push(b(t._("%s fuzzy"),e.format(0))),a&&r.push(b(t._("%s untranslated"),a.format(0))),r.length&&(i+=" ("+r.join(", ")+")")),S("#loco-po-status").text(i)}!o||k.FormData&&k.Blob||(o=!1,D.notices.warn("Your browser doesn't support Ajax file uploads. Falling back to standard postdata")),r||D.notices.warn("admin.js is out of date. Please empty your browser cache and reload the page.");var N,O,P=(O=parseInt(S(v).css("min-height")||0),function(){var t=function(t,n){for(var o=t.offsetTop||0;(t=t.offsetParent)&&t!==n;)o+=t.offsetTop||0;return o}(v,document.body),n=k.innerHeight,o=Math.max(O,n-t-20);N!==o&&(v.style.height=String(o)+"px",N=o)});P(),S(k).resize(P),v.innerHTML="",C=D.po.ed.init(v).localise(z),D.po.kbd.init(C).add("save",g?function(){C.dirty&&U()}:L).add("hint",T&&g&&x||L).enable("copy","clear","enter","next","prev","fuzzy","save","invis","hint");var A={save:g&&function(n){function o(){n.disabled=!0}function t(){n.disabled=!1}function e(){t(),S(n).removeClass("loco-loading")}return n,C.on("poUnsaved",function(){t(),S(n).addClass("button-primary loco-flagged")}).on("poSave",function(){o(),S(n).removeClass("button-primary loco-flagged")}),a=S.extend({path:c},i.project||{}),S(n).click(function(t){return t.preventDefault(),o(),S(n).addClass("loco-loading"),U(e),!1}),!0},sync:g&&function(n){var t=i.project;if(t){function o(){n.disabled=!0}function e(){n.disabled=!1}function a(){e(),S(n).removeClass("loco-loading")}C.on("poUnsaved",function(){o()}).on("poSave",function(){e()}),l={bundle:t.bundle,domain:t.domain,type:s?"pot":"po",sync:u||""},S(n).click(function(t){return t.preventDefault(),o(),S(n).addClass("loco-loading"),y(a),!1}),e()}return!0},revert:function(t){return C.on("poUnsaved",function(){t.disabled=!1}).on("poSave",function(){t.disabled=!0}),S(t).click(function(t){return t.preventDefault(),location.reload(),!1}),!0},invs:function(t){var o=S(t);return t.disabled=!1,C.on("poInvs",function(t,n){o[n?"addClass":"removeClass"]("inverted")}),o.click(function(t){return t.preventDefault(),C.setInvs(!C.getInvs()),!1}),locoScope.tooltip.init(o),!0},code:function(t){var o=S(t);return t.disabled=!1,o.click(function(t){t.preventDefault();var n=!C.getMono();return o[n?"addClass":"removeClass"]("inverted"),C.setMono(n),!1}),locoScope.tooltip.init(o),!0},source:B,binary:s?null:B};s?(A.add=g&&function(t){return t.disabled=!1,S(t).click(function(t){t.preventDefault();var n,o=1,e=/(\d+)$/;for(n="New message";m.get(n);)o=e.exec(n)?Math.max(o,RegExp.$1):o,n="New message "+ ++o;return C.add(n),!1}),!0},A.del=g&&function(t){return t.disabled=!1,S(t).click(function(t){return t.preventDefault(),C.del(),!1}),!0}):A.auto=function(t){function n(){t.disabled=!1}return C.on("poUnsaved",function(){t.disabled=!0}).on("poSave poAuto",function(){n()}),S(t).click(w),n(),!0},S("#loco-toolbar").find("button").each(function(t,n){var o=n.getAttribute("data-loco"),e=A[o];e&&e(n,o)||S(n).addClass("loco-noop")}),S(e).submit(L),function(n){function e(t){S(n.parentNode)[t||null==t?"removeClass":"addClass"]("invalid")}C.searchable(D.fulltext.init()),n.disabled=!1,n.value="";var a=D.watchtext(n,function(t){e(C.filter(t,!0))});C.on("poFilter",function(t,n,o){a.val(n||""),e(o)}).on("poMerge",function(t,n){var o=a.val();o&&C.filter(o)})}(document.getElementById("loco-search")),C.on("poUnsaved",function(){k.onbeforeunload=q}).on("poSave",function(){F(),k.onbeforeunload=null}).on("poHint",x).on("poUpdate",F).on("poMeta",function(t,n){var o,e,a=(e="CODE",(o=n).tagName===e?o:o.getElementsByTagName(e)[0]);return!a||!r||(r.load(a.textContent),t.preventDefault(),!1)}),m.load(i.podata),C.load(m),(T=C.targetLocale)?T.isRTL()&&S(v).addClass("trg-rtl"):C.unlock(),F(),delete k.locoConf,i=A=null}(window,jQuery);
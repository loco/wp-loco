( function( window, document, $, undefined ){
/**
 * CommonJS runtime helper.
 */ 
var CommonJS = function(){
    // internal registry of modules indexed by unique internal ID */
    var modules = {};
    // chuck error when module not included
    function notFound( filename ){
        throw new Error('Failed to require '+filename);
    }
    // expose public CommonJS object into scope
    return {
        // called by self-registering module
        register: function ( hash, mod ){
            modules[hash] = mod;
        },
        // called to access module's export object.
        // used to force compilation of a module, e.g. require('utils/html');
        require: function ( hash, filename ){
            return modules[hash] || notFound(filename);
        },
        // as above, but only strict when forced.
        // used when using first available like, e.g. include('foo') || include('bar',true)
        include: function( hash, filename, strict ){
            return modules[hash] || ( strict ? notFound(filename) : null );
        }
    };
}();
CommonJS.register("$1", function(exports,window,document){ /* module: js/utils/t.js */
/**
 * Create translator scope
 * @return Object with methods ._, ._n, ._x, .load
 */
exports.init = function( pluralFunction ){

    pluralFunction = checkPluralFunction( pluralFunction );
    
    /**
     * raw data looks like:
     * {
     *    msgid: [ msgstr ],
     *    msgctxt\x04msgid: [ msgstr ],
     *    msgid: [ msgstr[0], msgstr[1] ]
     * }
     */    
    var data = {};


    /**
     * Convert a number (n) to plural offset
     */
    function getPluralOffset( quantity ){
        var offset = Number( pluralFunction(quantity) );
        if( isNaN(offset) ){
            //console.error('Plural function did not return a number for n='+quantity);
            offset = 0;
        }
        return offset;
    }


    /**
     * Get translation by key and offset, or return what was offered
     */
    function getFinalTranslation( key, fallback, offset ){
        var translations = data[key];
        if( translations && translations[offset] ){
            return translations[offset];
        }
        return fallback||'';
    }


    /**
     * Get a scalar translation from plain text key - always at offset [0]
     */
    function getText( msgid ){
        return getFinalTranslation( msgid, msgid, 0 );
    }


    /**
     * Get a scalar translation from key with context - always at offset [0]
     */
    function getTextWithContext( msgid, msgctxt ){
        return getFinalTranslation( msgctxt+'\x04'+msgid, msgid, 0 );
    }


    /**
     * Get a pluralized translation according to n
     */
    function getTextPluralForm( msgid, msgid_plural, n ){
        var offset = getPluralOffset( n );
        return getFinalTranslation( msgid, offset ? msgid_plural : msgid, offset );
    }
    
    
    return {
        // expose semantic functions that can be extracted from JS as members
        // this will work even when obfuscated, except that comments may be lost!
        _:  getText,
        _x: getTextWithContext,
        _n: getTextPluralForm,
        // expose methods to alter current localisations
        load: function( newData ){
            data = newData || {};
            return this;
        },
        pluraleq: function( newFunc ){
            pluralFunction = checkPluralFunction(newFunc);
            return this;
        }
    };
};




/**
 * Use germanic plural identity by default
 * It may return Boolean or Number only
 */
function checkPluralFunction( newFunc ){
    var type = typeof newFunc;

    // allow string equation, but sanitize it
    // this would allow someone to execute a function like "n()" but not much harm in that
    if( 'string' === type ){
        if( /[^ <>!=()%^&|?:n0-9]/.test(newFunc) ){
            console.error('Invalid plural: '+newFunc);
        }
        else {
            return new Function( 'n', 'return '+newFunc );
        }
    }

    // else must be a function
    if( 'function' !== type ){
        newFunc = function( n ){
            return n != 1;
        };
    }

    return newFunc;
}

return exports;
}({},window,document) );

CommonJS.register("$2", function(exports,window,document){ /* module: js/wp/html.js */
/**
 * Replacement for utils/html when running in WordPress.
 */


// WordPress should provide jQuery migrate that reinstates $.browser
exports.ie = function() {
    var browser = $ && $.browser || {},
        isMSIE = browser.msie && Number(browser.version) < 11
    ;
    browser = null;
    // expose access to exports.ie() without version number
    return function() {
        return isMSIE;
    };
}();


// Dummy. WP env doesn't need to do anything
exports.init = function(){
    return exports;
}

return exports;
}({},window,document) );

CommonJS.register("$3", function(exports,window,document){ /* module: js/shim/number.js */
/**
 * Simple number utilities
 */


function trimZeros( s ){
    var snip,
        index = s.length
    ;
    while( '0' === s.charAt(--index) ){
        snip = index;
    }
    if( snip ){
        s = s.substring(0,snip);
    }
    return s;
}



/**
 * @return String
 */
Number.prototype.format = function( dp ){
    var p = Math.pow(10,dp||0),
        n = Math.round( p * this ) / p,
        thousands = [],
        strnumber = String(n),
        parts = strnumber.split('.'),
        strint = parts[0],
        fraction = parts[1],
        index = strint.length
    ;

    do {
        thousands.unshift( strint.substring( index-3, index ) );
    }
    while (
        ( index -= 3 ) > 0
    );
    strnumber = thousands.join(',');
    
    if( fraction && ( fraction = trimZeros(fraction) ) ){
        strnumber += '.'+fraction;
    }
    
    return strnumber;
};





/**
 * Emulates loco_string_percent PHP function
 * @return String
 */
Number.prototype.percent = function( total ){
    var s,
        dp = 0,
        n = this,
        p = n && total ? n / total * 100 : 0
    ;
    if( 0 === p ){
        return '0';
    }
    if( 100 === p ){
        return '100';
    }
    // fix 100% approximations, up to ceiling of 99.99%
    if( p > 99 ){
        /*p = Math.min( p, 99.99 );
        do { s = p.format(++dp); }
        while( '100' === s.substr(0,3) && dp < 2 );*/
        // now capping at 99.9
        p = Math.min( p, 99.9 );
        s = p.format(++dp);
    }
    // fix 0% approximations, down to sane limit of 0.0001%
    else if( p < 0.5 ){
        p = Math.max( p, 0.0001 );
        do { s = p.format(++dp); }
        while( '0' === s && dp < 4 );
        s = s.substr(1);
    }
    // else allow approximation
    else {
        s = p.format(0);
    }
    
    return s;
};

return exports;
}({},window,document) );

CommonJS.register("$4", function(exports,window,document){ /* module: js/shim/array.js */
/**
 * Shim Array prototype for IE<9
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */


    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        'use strict';
        if (this == null) {
          throw new TypeError();
        }
        var n, k, t = Object(this),
            len = t.length >>> 0;
    
        if (len === 0) {
          return -1;
        }
        n = 0;
        if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) { // shortcut for verifying if it's NaN
            n = 0;
          } else if (n != 0 && n != Infinity && n != -Infinity) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
        }
        if (n >= len) {
          return -1;
        }
        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
          if (k in t && t[k] === searchElement) {
            return k;
          }
        }
        return -1;
      };
    }
return exports;
}({},window,document) );

CommonJS.register("$5", function(exports,window,document){ /* module: js/utils/string.js */
/**
 * Common string utilities
 */


/**
 * Trim a string on both sides.
 * Note that native String.prototype.trim doesn't accept characters argument.
 */
exports.trim = function( s, chars ){
    chars || ( chars = " \n" );
    while( s && chars.indexOf( s.substr(0,1) ) !== -1 ){
        s = s.substr(1);
    }
    while( s && chars.indexOf( s.substr(-1) ) !== -1 ){
        s = s.substr(0, s.length-1 );
    }
    return s;
};


// crappy string formatter
// TODO allow ordinal arguments
// TODO actually cast data types
// TODO padding
exports.sprintf = function( str ){
    var i = 0, param, params = [].slice.call( arguments, 1 );
    return str.replace( /%([sud%])/g, function( match, token ){
        if( '%' === token ){
            return '%';
        }
        param = params[i++];
        return String(param)||'';
    } );
};


return exports;
}({},window,document) );

CommonJS.register("$20", function(exports,window,document){ /* module: js/shim/dom.js */
/**
 * DOM utilities
 */



function createOffsetCalculator( property ){
    return function ( el, ancestor ) {
        var value = el[property]||0;
        while( ( el = el.offsetParent ) && el !== (ancestor||document.body) ){
            value += el[property]||0;
        }
        return value;
    }
}


/**
 * Get absolute top position relative to a root element
 */
exports.top = createOffsetCalculator('offsetTop');


/**
 * Get absolute left position relative to a root element
 */
exports.left = createOffsetCalculator('offsetLeft');


/**
 * Short cut to create simple element
 * @usage require('shim/dom').el('span')
 * @return {HTMLElement}
 */
exports.el = function( nodeName, className ){
    var el = document.createElement( nodeName||'div' );
    className && ( el.className = className );
    return el;
};

/**
 * Short cut to create text node
 * @usage html.txt('whatever');
 * @return TextNode
 */
exports.txt = function( value ){
    return document.createTextNode(value||'');
};

return exports;
}({},window,document) );

CommonJS.register("$6", function(exports,window,document){ /* module: js/wp/notices.js */
/**
 * Module for handling WordPress Admin notices
 */


var batch = [],
    timestamp,
    now = Date.now || function(){ return new Date().getTime(); },
    // translation placeholders
    T_ERROR, T_WARNING, T_NOTICE, T_SUCCESS
;


function killEvent( event ){
    event.stopPropagation();
    event.preventDefault();
    return false;
}
  

// console error debug logging
function debugError( message, debugdata ){
    if( window.console && console.error ){
        console.error( 'Loco Error: '+message );
        if( debugdata && console.debug ){
            console.debug( debugdata );
        }
    }
}


function debugLog(){
    if( window.console && console.log ){
        console.log.apply( console, arguments ); 
    }
}


// add fade out and mouse stopper to dismissable error
function initMessageTimer( el, closer, delay ){
    var t;
    function startTimer(){
        stopTimer();
        t = setTimeout( closer, delay );
    }
    function stopTimer(){
        t && clearTimeout(t);
        t = null;
    }
    function destroy(){
        stopTimer();
        $(el).off('mouseenter mouseleave');
    }
    startTimer();
    $(el).mouseenter(stopTimer).mouseleave(startTimer);
    return {
        die: destroy
    };
}


// close animation taken from wp-admin/js/common.js
function closeMessage( $el, speed ){
    $el.fadeTo( speed, 0, function() {
        $el.slideUp( speed, function() {
            $el.remove();
            // this bit's mine. editor needs this.
            $(window).triggerHandler('resize');
        });
    } );
    return $el;
}


// make error dismissable
function initMessage( el, flash ){
    var auto, index, links, $el = $(el), $close = $el.find('button');
    function closer( event ){
        batch[index] = null;
        closeMessage( $(el), 250 );
        auto && auto.die();
        return event && killEvent(event);
    }
    function makeSticky(){
        auto && auto.die();
        auto = null;
        batch[index] = null;
    }
    function makeFlash(delay){
        auto && auto.die();
        auto = initMessageTimer(el,closer,delay);
        return auto;
    }
    function addLink( href, text ){
        var $nav = $(el).find('nav'),
            $tmp = $('<nav></nav>').append( $('<a></a>').attr('href',href).text(text) )
        ;
        if( links ){
            links.push( $tmp.html() );
            $nav.html( links.join('<span> | </span>') );
        }
        else {
            links = [ $tmp.html() ];
            $(el).addClass('has-nav').append($tmp);
        }
    }
    // adding dismiss button. Note that WordPress adds it too, unless we add this after page load.
    if( 0 === $close.length ) {
        $el.addClass('is-dismissible');
        $close = $('<button type="button" class="notice-dismiss"> </a>').appendTo($el);
    }
    $close.off('click').click(closer);
    $(window).triggerHandler('resize');
    // mark time of last message initialized
    timestamp = now();
    index = batch.length;
    batch.push( closer );
    // auto-close after delay for flash messages
    if( flash ){
        auto = makeFlash(flash);
    }
    // return closure for keeping sticky if desired 
    return {
        link: function( href, text ){
            addLink( href, text||href );
            return this;
        },
        stick: function(){
            makeSticky();
            return this;
        },
        slow: function(delay){
            makeFlash(delay||10000);
            return this;
        }
    };
}        


function clearMessages(){
    var i = -1, close, closers = batch, length = closers.length;
    while( ++i < length ){
        close = closers[i];
        if( close && close.call ){
            close();
        }
    }
    batch = []; 
    timestamp = null;
    return exports;
}


function createMessage( type, label, message ){
    var createElement = CommonJS.require("$20","dom.js").el,
        el = $('<div class="notice notice-'+type+' loco-notice inline"></div>').prependTo( $('#loco-notices') ),
        p  = $( createElement('p') ),
        m  = $( createElement('span') ).text( message ),
        s  = $( createElement('strong','has-icon') ).text( label+': ' )
    ;
    p.append(s).append(m).appendTo(el);
    return el;
}


// pretty-ish display of messages in admin page
function showMessage( message, label, type, flash ){
    // note that fadeIn will would display:block when we may want display:flex, so setting opacity directly
    var el = createMessage( type, label, message ).css('opacity','0').fadeTo(500,1);
    $(window).triggerHandler('resize');
    return initMessage( el, flash );
}

function showError( message ){
    return showMessage( message, T_ERROR, 'error' );
}

function showWarning( message ){
    return showMessage( message, T_WARNING, 'warning' );
}

function showNotice( message ){
    return showMessage( message, T_NOTICE, 'info' );
}

function showSuccess( message ){
    return showMessage( message, T_SUCCESS, 'success', 5000 );
}

// delayed
function convertExisting(){
    // deliberately only converting divs. other elements like forms must stay
    // this also skips any hidden items as it's assumed they are script-controlled
    $('#loco-notices').find('div.notice').each( function(i,el){
        if( -1 === el.className.indexOf('jshide') ){
            var flash = -1 === el.className.indexOf('notice-success') ? null : 5000;
            initMessage( el, flash );
        }
    } );
}


// expose visual notices - names must match Loco_error_Exception types
exports.error = showError;
exports.warn = showWarning;
exports.info = showNotice;
exports.success = showSuccess;
exports.warning = showWarning; // <- alias used from PHP generated divs

// expose console notices
exports.log = debugLog;
exports.debug = debugError;

// enable clearing of messages before showing more
exports.clear = clearMessages;

// expose generic HTML rendering
exports.create = createMessage;

// show backend notice which could be of various types
exports.raise = function( err ){
    var self = exports,
        func = self[ err.type ] || self.error
    ;
    func.call( self, err.message );  
};

// make any element dismissible
exports.convert = initMessage;

// enable any static messages on page load
exports.init = function( translator ){

    // create all translations now
    // TODO ensure these match the PHP strings (context??)
    T_ERROR = translator._('Error');
    T_WARNING = translator._('Warning');
    T_NOTICE = translator._('Notice');
    T_SUCCESS = translator._('OK');

    // initial conversion is delayed to avoid page load scripts removing
    setTimeout( convertExisting, 1000 );
    
    // TODO also listen for click.wp-dismiss-notice for when wp-admin/js/common.js closes so we can ping resize

    return exports;
};

return exports;
}({},window,document) );

CommonJS.register("$7", function(exports,window,document){ /* module: js/wp/ajax.js */
/**
 * Ajax via WordPress
 */

var nonces = {}, 
    translator,
    lastError,
    ajaxurl = window.ajaxurl || '/wp-admin/admin-ajax.php'
    //urlencode = window.encodeURIComponent
;


exports.init = function( conf ){
    nonces = conf.nonces || nonces;
    return exports;
};

exports.localise = function( t ){
    translator = t;
    return exports;
};

/**
 * Get last failed XHR response
 */
exports.xhr = function(){
    return lastError;
};


/**
 * Shared utility for stripping server response HTML into neater text
 */
function stripHtmlResponse( htmlOutput ){
    var textOutput = $('<pre>'+htmlOutput+'</pre>').text();
    // trim text output, because it came from html
    if( textOutput ){
        textOutput = textOutput
            .replace(/[\r\n]+/g, '\n' )  // <- redundant space
            .replace(/(^|\n)\s+/g,'$1')  // <- leading spaces
            .replace(/\s+$/,'')          // <- final trailing space
        ;
    }
    // htmlOutput may not have produced anything worth looking at 
    if( ! textOutput ){
        textOutput = htmlOutput;
        // urgh.. blank page errors....
        if( ! textOutput ){
            textOutput = 'Blank response from server';
        }
    }
    return textOutput;
};


/**
 * Shared utility for getting first meaningful line of stripped text
 * e.g. <h2>Fatal error.... 
 */
function parseErrorResponse( textOutput ){
    if( textOutput = textOutput.split(/[\r\n]/)[0] ){
        // clean up sensitive/ugly file information
        textOutput = textOutput.replace(/ +in +\S+ on line \d+/,'');
        // clean up fatal error preamble
        textOutput = textOutput.replace(/^[()! ]+Fatal error:\s*/,'');
        // TODO parse out (and translate) common errors, e.g.  Allowed memory size of ....
        return textOutput;
    }
    // Translators: Generic error when external process broke an Ajax request
    return t._('Server returned invalid data');
}

exports.strip = stripHtmlResponse;
exports.parse = parseErrorResponse;

/** 
 * Utility executes WP ajax hook via actual form
 */
function submitAjaxForm( form, onSuccess, onError ){
    var $form = $(form),
        postdata = $form.serialize()
    ;
    function disableField( i, f ){
        if( f.disabled ){
            // ensures fields we want disabled aren't re-enabled later
            // this assumes we run disable before enable - likely!
            f.setAttribute('data-was-disabled','true');
        }
        else {
            f.disabled = true;
        }
    }
    function enableField( i, f ){
        // only enable field that wasn't previously disabled
        if( ! f.getAttribute('data-was-disabled') ){
            f.disabled = false;
        }
    }
    function disableForm(j){
        j.find('.button-primary').addClass('loading');
        j.find('button').each( disableField );
        j.find('input').each( disableField );
        j.find('select').each( disableField );
        j.find('textarea').each( disableField );
        j.addClass('disabled loading');
    }
    function enableForm(j){
        j.find('.button-primary').removeClass('loading');
        j.find('button').each( enableField );
        j.find('input').each( enableField );
        j.find('select').each( enableField );
        j.find('textarea').each( enableField );
        j.removeClass('disabled loading');
    }
    function _onSuccess( data, status, xhr ){
        enableForm($form);
        onSuccess && onSuccess( data, status, xhr );
    }
    function _onError( xhr, error, message ){
        enableForm($form);
        onError && onError( xhr, error, message );
    }
    // disable form and show "loading" after serialize, but before submit
    disableForm($form);
    // form must contain "route" and "action" fields
    // action field must always be "loco_json" for json response
    return doGenericAjax( form.route.value, _onSuccess, _onError, {
        type: form.method,
        data: postdata
    } );
}


function whoopsEmptyNonce(route){
    if( window.console && console.error ){
        console.error('No nonce for "'+route+'"');
    }
    return '';
}


/**
 * @internal
 */
function objectAppend( obj, key, value ){
    obj[key] = value;
}


/**
 * @internal
 */
function arrayAppend( arr, key, value ){
    arr.push( { name:key, value:value } );
}


/**
 * @internal
 */
function formDataAppend( form, key, value ){
    form.append(key,value);
}


/**
 * Execute WP Ajax hook via POST with serializable field data
 * @param {String} route
 * @param {Object} postdata
 * @param {Function} onSuccess
 * @param {Function} onError
 * @return {jqXHR} request object
 */
function postAjaxData( route, postdata, onSuccess, onError ){
    var append,
        urlEncoded = true,
        data = postdata || {},
        nonce = nonces[route] || whoopsEmptyNonce(route)
    ;
    // abstract FormData interface
    if( window.FormData && ( data instanceof FormData ) ){
        urlEncoded = false;
        append = formDataAppend;
    }
    // format used by jQuery.serializeArray
    else if( Array.isArray(data) ){
        append = arrayAppend;
    }
    // else generic property setter
    else {
        append = objectAppend;
    }
    // add mandatory routing data
    append(data,'action','loco_json');
    append(data,'route',route);
    append(data,'loco-nonce',nonce);
    //
    return doGenericAjax( route, onSuccess, onError, {
        type: 'post',
        data: data,
        // prevent jQuery from stringifying FormData, but ensure normal object data is cast
        processData: urlEncoded,
        // to send 'multipart/form-data' we set false so jQuery adds the boundary for us!
        contentType: urlEncoded ? 'application/x-www-form-urlencoded; charset=UTF-8' : false
    } );
}


/**
 * Generic Ajax entry point with error handling
 * @param {String} debugString
 * @param {Function} onSuccess
 * @param {Function} onError
 * @param {Object} options
 * @return {jqXHR} request object https://api.jquery.com/jQuery.ajax/#jqXHR
 */
function doGenericAjax( debugString, onSuccess, onError, options ){

    // onError wrapper.
    function doFail( xhr, error, message ){
        if( 'abort' === error ){
            return;
        }
        var t = translator || { _: function(s){ return s; } },
            status = xhr.status,
            htmlOutput = xhr.responseText,
            textOutput = stripHtmlResponse( htmlOutput ),
            typeResond = xhr.getResponseHeader('Content-Type') || 'text/html',
            byteLength = xhr.getResponseHeader('Content-Length') || htmlOutput.length
        ;
        // Ideally our back end handled the error and returned JSON. This we can display neatly on screen
        if( 'success' === error && message ){
            noticeApi.error( message );
        }
        // else either a non-JSON 200 server response. attempt to display useful first line
        else {
            noticeApi.error( parseErrorResponse(textOutput)+'.\n'+t._('Check console output for debugging information') ) ;
            // generic display of proper failure
            noticeApi.debug('Ajax failure for '+debugString, { status:status, error:error, message:message, output: htmlOutput } );
            //not much point showing JSON parse errors when the response is almost certainly not JSON
            if( 'parsererror' === error ){
                message = 'Response not JSON';
            } 
            // user friendly console output, required for support requests
            noticeApi.log( [
                t._('Provide the following text when reporting a problem')+':',
                '----',
                'Status '+status+' "'+( message||t._('Unknown error') )+'" ('+typeResond+' '+byteLength+' bytes)',
                textOutput,
                '===='
            ].join('\n') );
        }
        // call back if handler defined and callable
        if( onError && onError.call ){
            onError( xhr, error, message );
        }
        // call locoScope.xhr() to examine response
        lastError = xhr;
    }

    // onSuccess wrapper handles good response which is actually bad.
    function doSuccess( result, status, xhr ){
        var data = result && result.data,
            notices = result && result.notices,
            notelen = notices && notices.length
        ;
        if( ! data || result.error ){
            doFail( xhr, status, result && result.error && result.error.message );
            // be warned that client code listening on "fail" handler will not know about this!
            // https://stackoverflow.com/questions/61821026/how-to-trigger-fail-handlers-on-an-ajax-promise
        }
        else {
            onSuccess && onSuccess( data, status, xhr );
        }
        // showing notices last so warnings appear before successes (prepending)
        while( notelen-- ){
            noticeApi.raise( notices[notelen] );
        }
    }
    
    // common options for all requests
    options.url = ajaxurl;
    options.dataType = 'json';
    
    // always clearing notices before a new ajax request (as a page reload would!)
    var noticeApi = CommonJS.require("$6","notices.js").clear();
    lastError = null;
    return $.ajax(options).fail(doFail).done(doSuccess);
} 







exports.submit = submitAjaxForm;

exports.post = postAjaxData;


exports.setNonce = function( name, value ){
    nonces[name] = value;
    return exports;
};


/*exports.hasNonce = function( name ){
    return !!nonces[name];
};*/

return exports;
}({},window,document) );

CommonJS.register("$21", {
    "arab": 1,
    "aran": 1,
    "hebr": 1,
    "nkoo": 1,
    "syrc": 1,
    "syrn": 1,
    "syrj": 1,
    "syre": 1,
    "samr": 1,
    "mand": 1,
    "mend": 1,
    "thaa": 1,
    "adlm": 1,
    "cprt": 1,
    "phnx": 1,
    "armi": 1,
    "prti": 1,
    "phli": 1,
    "phlp": 1,
    "phlv": 1,
    "avst": 1,
    "mani": 1,
    "khar": 1,
    "orkh": 1,
    "ital": 1,
    "lydi": 1,
    "ar": 1,
    "ary": 1,
    "ckb": 1,
    "dv": 1,
    "fa": 1,
    "he": 1,
    "nqo": 1,
    "ps": 1,
    "ur": 1,
    "yi": 1
} ); // data: js/data/rtl.json

CommonJS.register("$8", function(exports,window,document){ /* module: js/objects/wplocale.js */
/**
 * Simpler locale object for crappy non-standard WordPress locales
 */

var ParseRegEx, SplitRegEx, RTLData = CommonJS.require("$21","rtl.json");


exports.init = function(){
    return new Locale;
};


exports.cast = function( vanilla ){
    if( vanilla instanceof Locale ){
        return vanilla;
    }
    if( 'string' === typeof vanilla ){
        return exports.parse(vanilla);
    }
    return exports.clone( vanilla );
};
    
    
exports.clone = function( source ){
    var s, target = new Locale;
    for( s in source ){
        target[s] = source[s];
    }
    return target;
};

// Basic tag parser. 
// Like loco_parse_wp_locale
exports.parse = function( code ){
    var grep = ParseRegEx || ( ParseRegEx = /^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z0-9]{3,8}))?$/i );
    // return null if format doesn't match
    if( ! grep.exec(code) ){
        return null;
    }
    // primary language is mandatory
    var loc = new Locale;
    loc.lang = RegExp.$1.toLowerCase();
    // everything else is optional
    if( code = RegExp.$2 ){
        loc.region = code.toUpperCase();
    }
    if( code = RegExp.$3 ){
        loc.variant = code.toLowerCase();
    }
    return loc;
};


function Locale(){
    
}

var LocalePrototype = Locale.prototype;


LocalePrototype.isValid = function(){
    return !! this.lang;
};

LocalePrototype.isKnown = function(){
    var tag = this.lang;
    return  !( ! tag || 'zxx' === tag );
};


LocalePrototype.toString = function( sep ){
    sep = sep||'-';
    var value,
        self = this,
        code = self.lang||'zxx'
    ;
    if( value = self.region ){
        code += sep+value;
    }
    if( value = self.variant ){
        code += sep+value;
    }
    return code;
};


LocalePrototype.getIcon = function(){
    var i = 3,
        prop, value,
        tags = ['variant','region','lang'],
        classes = []
    ;
    while( 0 !== i-- ){
        prop = tags[i];
        if( value = this[prop] ){
            //classes = classes.concat( [ prop, prop+'-'+value.toLowerCase() ] );
            classes.push( prop );
            classes.push( prop+'-'+value.toLowerCase() );
        }
    }
    return classes.join(' ');
};



LocalePrototype.isRTL = function(){
    return !!RTLData[ String(this.lang).toLowerCase() ];
};



LocalePrototype = null;

return exports;
}({},window,document) );

CommonJS.register("$22", {
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
} ); // data: js/data/flatten.json

CommonJS.register("$9", function(exports,window,document){ /* module: js/utils/fulltext.js */
/**
 * New version of dict that should be faster and less generic.
 * 
 * TODO could escape differently according to field (e.g. slug vs name)
 */
exports.init = function(){
    
    var index = [],
        anychar = /[^a-z0-9]/g,
        //regxesc = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        boundary = /[\-_\s.?!;:,*^+=~`"(){}<>\[\]\/\\\u00a0\u1680\u180e\u2000-\u206f\u2e00-\u2e7f\u3000-\u303f]+/,
        translit = CommonJS.require("$22","flatten.json")
    ;


    /**
     * Normalize single character.
     * Seems to make little difference whether lower-casing is done on whole string first
     * TODO any native way to do this instead of custom lookup table? perhaps include lower-casing in table?
     */
    function normalizeChar( chr ){
        //chr = chr.toLowerCase();
        return translit[chr] || chr;
    }


    /**
     * Normalize string in two steps
     *  É -> é
     *  é -> e
     */
    function normalizeText( text ){
        return String(text||'').toLowerCase().replace( anychar, normalizeChar );
    }
    

    function pushUnique( normalized, splitex, unique, words ){
        var word,
            split = normalized.split( splitex ),
            length = split.length;
        while( 0 !== length-- ){
            word = split[length];
            if( word && null == words[word] ){
                unique.push( word );
                words[word] = true;
            }
        }
        return unique;
   }
   
   
   function split( text ){
       return pushUnique( normalizeText(text), boundary, [], {} );
   }

   
   function setIndex( idx, texts ){
       var unique = [], words = {}, text, t = texts.length, splitex = boundary;
       while( 0 !== t-- ){
           if( text = texts[t] ){
               pushUnique( normalizeText(text), splitex, unique, words );
           }
       }
       index[idx] = unique;
   }
    

    function find( stems, indexed ){
        var result = [],
            idx = -1,
            _index = index,
            length = _index.length,
            //
            w,
            word,
            words,
            nwords,
            //
            s,
            stem,
            nstems = stems.length,
            //stemLength,
            // if no data to pull indexes from, we'll only return indexes
            haveData = indexed ? true : false
        ;
        /*/ ? convert stems to regexp ?
        for( s = 0; s < nstems; s++ ){
            stems[s] = new RegExp( '^' + stems[s].replace( regxesc, '\\$&' ) );
        }*/
        nextIndex:
        while( ++idx < length ){
            words = _index[idx];
            // each entry has multiple strings to match (unless empty slot)
            if( null != words && ( nwords = words.length ) ){
                // every stem must begin at last one word in item's index
                nextStem:
                for( s = 0; s < nstems; s++ ){
                    stem = stems[s];
                    // stemLength = stem.length;
                    // only one word needs matching to match current stem
                    for( w = 0; w < nwords; w++ ){
                        word = words[w];
                        // using fastest begining of string match
                        //if( word.substr(0,stemLength) === stem ){
                        // if( -1 !== word.indexOf(stem) ){
                        if( 0 === word.indexOf(stem) ){
                        //if( stem.test(word) ){
                            //console.log('MATCH: '+stem+'% begins '+word+' in ['+idx+']');
                            continue nextStem;
                        }
                    }
                    // stem didn't match anything. item skipped.
                    // console.log('NO MATCH for ['+idx+']');
                    continue nextIndex;
                }
                // match if we got here
                // console.log('FULL MATCH for ['+idx+']');
                result.push( haveData ? indexed[idx] : idx );
            }
        }
        return result;
    }
    
    

    return {
        split: split,
        // norm: normalizeText,
        // find with pre-split query
        pull: function( stems, indexed ){
            return find( stems, indexed );
        },
        // find from full text query
        find: function( query, indexed ){
            return find( split(query), indexed );
        },
        // legacy support for single text argument
        add: function( idx, text ){
            index[idx] = split(text);
        },
        // add next item from split texts
        push: function( texts ){
            setIndex( index.length, texts );
        },
        // force given index from split texts
        index: function( idx, texts ){
            setIndex( idx, texts );
        },
        // get number of items indexed
        size: function(){
            return index.length;
        },
        // trash index
        clear: function(){
            index = [];
        },
        // remove single item from index
        remove: function( idx ){
            index[idx] = null;
        }
    };    
    
    
    
    
};
return exports;
}({},window,document) );

CommonJS.register("$10", function(exports,window,document){ /* module: js/ui/textfield/LocoTextListener.js */
/**
 * Text field change listener
 */
exports.listen = function( elText, callback ){
    if( elText instanceof jQuery ){
        elText = elText[0];
    }
    var value,
        timer,
        inputEvents = 'input blur focus', // removed paste as it fires input anyway
        delay = 150, 
        IE_placeholder = window.attachEvent && elText.getAttribute('placeholder'),
        // if text field size is set to 1, we will dynamically change size to reflect length of value (as per facebook typeahead)
        autosize = ( 1 === Number( elText.size ) ),
        // clear button and redraw function
        clearbutt = $('<a href="#clear" tabindex="-1" class="icon clear"><span>clear</span></a>').click( function(){
            elText.value = '';
            refresh();
            return false;
        } )
    ;

    function drawbutt(){
        clearbutt[ value ? 'show' : 'hide' ]();
    }

    function setValue( newValue ){
        if( autosize ){
            // wide letters look bad unless size is larger than needed
            elText.setAttribute('size', 2+newValue.length );
        }
        value = newValue;
        drawbutt();
        return newValue;
    }

    function onDelayedCallbackTimeout(){
        timer = null;
        callback( value );
    }

    // function which decides whether text has changed and fires after delay
    function refresh(){
        var newValue = elText.value;
        if( IE_placeholder && newValue === IE_placeholder ){
            newValue = '';
        }
        if( newValue !== value ){
            timer && clearTimeout(timer);
            setValue( newValue );
            if( delay ){
                timer = setTimeout( onDelayedCallbackTimeout, delay );
            }
            else {
                onDelayedCallbackTimeout();
            }
        }
    }
    // as above but without delay or checking value
    function forceRefresh(){
        timer && clearTimeout(timer);
        var newValue = elText.value;
        if( IE_placeholder && newValue === IE_placeholder ){
            newValue = '';
        }
        setValue( newValue );
        onDelayedCallbackTimeout();
    }
    // activate text checking
    function onTextInput(){
        refresh();
        return true;
    }
    
    // initial value
    setValue( elText.value );

    $(elText)
        .on( inputEvents, onTextInput )
        .after( clearbutt );

    drawbutt();
    
    // expose public methods
    return {
      // change delay
      delay: function( d ) {
          delay = d;
      },
      // cause listener to look at text without key interaction
      ping: function( force ){
          return force ? forceRefresh() : refresh();
      },
      // set new value externally without firing an event - or get value
      val: function( newval ){
          if( newval == null ){
              return value;
          }
          timer && clearTimeout(timer);
          elText.value = setValue(newval);
          drawbutt();
      },
      // access to element
      el: function(){
          return elText;
      },
      // bind a blur handler because change event may not be fired and we may want to validate
      blur: function( callback ){
          return $(elText).on( 'blur', callback );
      }
    };
};


return exports;
}({},window,document) );

CommonJS.register("$11", function(exports,window,document){ /* module: js/ui/tooltip.js */
/**
 * CommonJS Wrapper for Tipsy jquery plugin
 */



/** 
 * Init wrapper: Make a link tooltip enabled  
 */
exports.init = function( link, override ){

    var options = {
        fade: true, 
        offset: 5,
        delayIn: defaultOnDelay,
        delayOut: defaultOffDelay,
        anchor: link.attr('data-anchor'),
        gravity: link.attr('data-gravity')||'s'
    };
    
    if( override ){
        options = $.extend({}, options, override );
    }

    link.tipsy( options );
};



// Everything else supports legacy functions



/**
 * allow configuration of default delays 
 */
exports.delays = function( onDelay, offDelay ){
    defaultOnDelay = onDelay||150;   // 0.15s
    defaultOffDelay = offDelay||100; // 0.10s
};



/** 
 * Stops any tooltip[s] currently active 
 */
exports.kill = function(){
    // nasty but works and seems not to break future rollovers
    $('div.tipsy').remove();
};



/**
 * Force new text in to tooltip - useful for after perform a contextual change while open
 */
exports.text = function( text, sourceElement ){
    // assuming source element is jQuery instance of pointee
    // TODO support global text change of current tip when sourceElement is empty
    var tipsy = sourceElement.data('tipsy');
    tipsy.setTitle( text );
};


// start with default delays
var defaultOnDelay, defaultOffDelay;
exports.delays();



/**
 * Stop tooltips when modal windows open and close // mouseout/leave in tipsy doesn't seem to be enough
 */
$(document.body).on('overlayOpened overlayClosing', function(event){
    exports.kill();
    return true;
} );




/**
 * Modified Tipsy plugin
 * https://github.com/jaz303/tipsy
 * http://onehackoranother.com/projects/jquery/tipsy/
 */
function maybeCall(thing, ctx) {
    return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
};

/*function isElementInDOM(ele) {
  while (ele = ele.parentNode) {
    if (ele == document) return true;
  }
  return false;
};*/

function Tipsy(element, options) {
    this.$element = $(element);
    this.options = options;
    this.enabled = true;
    this.fixTitle();
};

Tipsy.prototype = {
    show: function() {
        var title = this.getTitle();
        if (title && this.enabled) {
            var $tip = this.tip();
            
            $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
            $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
            $tip.remove().css({top: 0, left: 0 /*, visibility: 'hidden', display: 'block'*/ }).prependTo(document.body);
            
            // TW: calculate position based on alternative target e.g. icon inside link
            var selector = this.options.anchor,
                $anchor  = selector ? this.$element.find(selector) : this.$element;
            
            var pos = $.extend({}, $anchor.offset(), {
                width: $anchor[0].offsetWidth,
                height: $anchor[0].offsetHeight
            });
            
            var actualWidth = $tip[0].offsetWidth,
                actualHeight = $tip[0].offsetHeight,
                gravity = maybeCall(this.options.gravity, this.$element[0]);
            
            var tp;
            switch (gravity.charAt(0)) {
                case 'n':
                    tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 's':
                    tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                    break;
                case 'e':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                    break;
                case 'w':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                    break;
            }
            
            if (gravity.length == 2) {
                if (gravity.charAt(1) == 'w') {
                    tp.left = pos.left + pos.width / 2 - 15;
                } else {
                    tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                }
            }
            
            $tip.css(tp).addClass('tipsy-' + gravity);
            $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
            if (this.options.className) {
                $tip.addClass(maybeCall(this.options.className, this.$element[0]));
            }
            
            /*if (this.options.fade) {
                $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
            } else {
                $tip.css({visibility: 'visible', opacity: this.options.opacity});
            }*/
            // Using CSS transitions
            $tip.addClass('in');
        }
    },
    
    hide: function() {
        /*if (this.options.fade) {
            this.tip().stop().fadeOut(function() { $(this).remove(); });
        } else {
            this.tip().remove();
        }*/
       // sudden stop
       this.tip().remove();
    },
    
    fixTitle: function() {
        var $e = this.$element, 
            title = $e.attr('title')||'';
        if( title || 'string' !== typeof $e.attr('original-title') ) {
            $e.attr('original-title', title).removeAttr('title');
        }
    },
    
    getTitle: function() {
        var title, $e = this.$element, o = this.options;
        this.fixTitle();
        if (typeof o.title == 'string') {
            title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
        } else if (typeof o.title == 'function') {
            title = o.title.call($e[0]);
        }
        title = ('' + title).replace(/(^\s*|\s*$)/, "");
        return title || o.fallback;
    },
    
    // TW added for immediate update of title text and saving of original
    // confusingly original-title doesn't actually keep the original title.
    setTitle: function( title ){
        var $e = this.$element;
        if( ! $e.attr('default-title') ){
            $e.attr('default-title', this.getTitle() );
        }
        if( null == title ){
            title = $e.attr('default-title')||this.getTitle();
        }
        $e.attr('original-title', title );
        if( this.$tip ){
            this.$tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
        }
    },
    
    tip: function() {
        if (!this.$tip) {
            this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            this.$tip.data('tipsy-pointee', this.$element[0]);
        }
        return this.$tip;
    },
    
    validate: function() {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    },
    
    enable: function() { 
        this.enabled = true;
    },

    disable: function() {
        this.hide();
        this.enabled = false; 
    },

    toggleEnabled: function() { this.enabled = !this.enabled; }
};

$.fn.tipsy = function(options) {
    
    /*if (options === true) {
        return this.data('tipsy');
    }
    else if( 'string' === typeof options ) {
        var tipsy = this.data('tipsy');
        tipsy && tipsy[options]();
        return this;
    }*/
    
    options = $.extend({}, $.fn.tipsy.defaults, options);
    
    function get(ele) {
        var tipsy = $.data(ele, 'tipsy');
        if (!tipsy) {
            tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
            $.data(ele, 'tipsy', tipsy);
        }
        return tipsy;
    }
    
    function enter() {
        var tipsy = get(this), delay = options.delayIn;
        tipsy.hoverState = 'in';
        if ( 0 == delay ) {
            tipsy.show();
        }
        else {
            tipsy.fixTitle();
            setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, delay );
        }
    };
    
    function leave() {
        var tipsy = get(this), delay = options.delayOut;
        tipsy.hoverState = 'out';
        if ( 0 == delay ) {
            tipsy.hide();
        } 
        else {
            tipsy.tip().removeClass('in'); // <- TW: starting CSS fadeout. ensure transition matches delayOut
            setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, delay);
        }
    };
    
    if (!options.live) this.each(function() { get(this); });
    
    if (options.trigger != 'manual') {
        var binder   = options.live ? 'live' : 'bind',
            eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
            eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
        this[binder](eventIn, enter)[binder](eventOut, leave);
    }
    
    return this;
    
};

$.fn.tipsy.defaults = {
    className: null,
    delayIn: 0,
    delayOut: 0,
    fade: false,
    fallback: '',
    gravity: 'n',
    html: false,
    live: false,
    offset: 0,
    opacity: 0.8,
    title: 'title',
    trigger: 'hover',
    // TW:
    anchor: null
};

/*$.fn.tipsy.revalidate = function() {
  $('.tipsy').each(function() {
    var pointee = $.data(this, 'tipsy-pointee');
    if (!pointee || !isElementInDOM(pointee)) {
      $(this).remove();
    }
  });
};*/

// Overwrite this method to provide options on a per-element basis.
// For example, you could store the gravity in a 'tipsy-gravity' attribute:
// return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
// (remember - do not modify 'options' in place!)
$.fn.tipsy.elementOptions = function(ele, options) {
    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
};

$.fn.tipsy.autoNS = function() {
    return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
};

$.fn.tipsy.autoWE = function() {
    return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
};

/**
 * yields a closure of the supplied parameters, producing a function that takes
 * no arguments and is suitable for use as an autogravity function like so:
 *
 * @param margin (int) - distance from the viewable region edge that an
 *        element should be before setting its tooltip's gravity to be away
 *        from that edge.
 * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
 *        if there are no viewable region edges effecting the tooltip's
 *        gravity. It will try to vary from this minimally, for example,
 *        if 'sw' is preferred and an element is near the right viewable 
 *        region edge, but not the top edge, it will set the gravity for
 *        that element's tooltip to be 'se', preserving the southern
 *        component.
 */
 $.fn.tipsy.autoBounds = function(margin, prefer) {
    return function() {
        var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
            boundTop = $(document).scrollTop() + margin,
            boundLeft = $(document).scrollLeft() + margin,
            $this = $(this);

        if ($this.offset().top < boundTop) dir.ns = 'n';
        if ($this.offset().left < boundLeft) dir.ew = 'w';
        if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
        if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

        return dir.ns + (dir.ew ? dir.ew : '');
    };
};

return exports;
}({},window,document) );

CommonJS.register("$34", function(exports,window,document){ /* module: js/shim/string.js */


// any modern browser should have localeCompare, but just in case
if( ! ''.localeCompare ){
    String.prototype.localeCompare = function(){
        return 0;
    };
}


// native trim only trims whitespace
if( ! ''.trim ){
	String.prototype.trim = function(){
		return CommonJS.require("$5","string.js").trim(this,' \n\r\t');
	};
}




// Escape text to HTML, and optionally linkify as per MVCView::h
// Not really a shim, but very common and we always want it available
exports.html = function(){
    var rexChars,
        rexBreak,
        rexLinks,
        hostName
    ;
    function init(){
        rexChars = /[<>&]/g;
        rexBreak = /(\r\n|\n|\r)/g;
        rexLinks = /(?:https?):\/\/(\S+)/ig;
        hostName = location.hostname;
        init = null;
    }
    function replaceEnt( chr ){
        return '&#'+chr.charCodeAt(0)+';';
    }
    function escapeText( text ){
        return text.replace( rexChars, replaceEnt );
    }
    function linkReplace( href, label ){
        return '<a href="'+href+'" target="'+(label.indexOf(hostName)?'_blank':'_top')+'">'+label+'</a>';
    }
    // this function is assigned to shim/string/html
    return function( text, rich ){
        init && init();
        var html = escapeText(text);
        if( rich ){
            html = html.replace(rexLinks,linkReplace).replace(rexBreak,'<br />');
        }
        return html;
    };
}();
return exports;
}({},window,document) );

CommonJS.register("$35", function(exports,window,document){ /* module: js/objects/locale.js */
/**
 * Emulate back end locale object functionality in JS
 */

var ParseRegEx, SplitRegEx, RTLData = CommonJS.require("$21","rtl.json");


exports.init = function(){
    return new Locale;
};


exports.cast = function( vanilla ){
    if( vanilla instanceof Locale ){
        return vanilla;
    }
    if( 'string' === typeof vanilla ){
        return exports.parse(vanilla);
    }
    return exports.clone( vanilla );
};
    
    
exports.clone = function( source ){
    var s, target = new Locale;
    for( s in source ){
        target[s] = source[s];
    }
    return target;
};

// Basic tag parser. 
// Partially copied from PHP loco_parse_locale except only supports what Loco project locales support.
// This parser is not as strict as the PHP parser because it's not used for inputing locales - only really for splitting up those already valid.
exports.parse = function( code ){
    if( ! ParseRegEx ){
        SplitRegEx = /[-_+]/;
        ParseRegEx =  /^([a-z]{2,3})(?:-([a-z]{4}))?(?:-([a-z]{2}|[0-9]{3}))?(?:-([0-9][a-z0-9]{3,8}|[a-z0-9]{5,8}))?(?:-([a-z]-[-a-z]+))?$/i;
        //              (1.lang         (2.script       (3.region                (4.variant                              (5.extension ----
    }
    // normalize code before parsing
    code = String(code).split(SplitRegEx).join('-');
    // return null if format doesn't match
    if( ! ParseRegEx.exec(code) ){
        return null;
    }
    // primary language is mandatory
    var loc = new Locale;
    loc.lang = RegExp.$1.toLowerCase();
    // everything else is optional
    if( code = RegExp.$2 ){
        loc.script = code.charAt(0).toUpperCase()+code.substr(1).toLowerCase();
    }
    if( code = RegExp.$3 ){
        loc.region = code.toUpperCase();
    }
    if( code = RegExp.$4 ){
        loc.variant = code.toLowerCase();
    }
    if( code = RegExp.$5 ){
        loc.extension = code;
    }
    return loc;
};


function Locale(){
    
}

var LocalePrototype = Locale.prototype;


LocalePrototype.isValid = function(){
    return !! this.lang;
};

LocalePrototype.isKnown = function(){
    var tag = this.lang;
    return  !( ! tag || 'zxx' === tag );
};


LocalePrototype.toString = function( sep ){
    sep = sep||'-';
    var value,
        self = this,
        code = self.lang||'zxx'
    ;
    if( value = self.script ){
        code += sep+value;
    }
    if( value = self.region ){
        code += sep+value;
    }
    if( value = self.variant ){
        code += sep+value;
    }
    if( value = self.extension ){
        code += sep+value;
    }
    return code;
};


LocalePrototype.getIcon = function(){
    var i = 4,
        prop, value,
        tags = ['variant','region','script','lang'],
        classes = []
    ;
    while( 0 !== i-- ){
        prop = tags[i];
        if( value = this[prop] ){
        	// variant/extension could be array
        	if( value.join ){
        		value = value.join('-');
        	}
            // special cases
            if( 1 === i && 3 === value.length ){
                classes.push('region-m49');
            }
            // else default
            else {
                classes = classes.concat( [ prop, prop+'-'+value.toLowerCase() ] );
            }
        }
    }
    return classes.join(' ');
};



LocalePrototype.isRTL = function(){
    return !!RTLData[ String( this.script || this.lang ).toLowerCase() ];
};



LocalePrototype = null;
return exports;
}({},window,document) );

CommonJS.register("$36", function(exports,window,document){ /* module: js/utils/abstract.js */
/**
 * Pseudo-abstract class functionality
 */



function stderr( message ){
    window.console && console.error && console.error( message );
}


function AbstractFunction(){
    stderr('Method not implemented');
}

function AbstractProperty(){
    // does nothing
}
AbstractProperty.prototype.toString = function(){
    return '[Undefined]';
};


function AbstractBase( name ){
    // does nothing
}

AbstractBase.prototype._validate = function( className ){
    var name, member, result = true;
    for( name in this ){
        member = this[name];
        if( member === AbstractFunction ){
            stderr( className+'.'+name+'() must be implemented');
            result = false;
        }
        else if( member instanceof AbstractProperty ){
            stderr( className+'.'+name+' must be defined');
            result = false;
        }
    }
    return result;
};



/**
 * Create a prototype for extending classes with mandatory methods
 * @usage MyFunc.prototype = require('utils/abstract').init( ['importantMethod',..], ['importantProperty',..] );
 * @param Array list of abstract method names
 * @param Array list of property names which must be defined, usually objects
 * @return Object
 */
exports.init = function( methodNames, propertyNames ){
    var i, proto = new AbstractBase;
    if( methodNames ){
        i = methodNames.length;
        while( 0 !== i-- ){
            proto[ methodNames[i] ] = AbstractFunction;
        }
    }
    if( propertyNames ){
        i = propertyNames.length;
        while( 0 !== i-- ){
            proto[ propertyNames[i] ] = new AbstractProperty;
        }
    }
    return proto;
};



/**
 * Validate a subclass, via its prototype on _validate member
 */
exports.validate = function( subClass ){
    var className = /function (\w+)\(/.exec( subClass.toString() ) ? RegExp.$1 : '';
    subClass.prototype._validate( className||'Object' );
};



return exports;
}({},window,document) );

CommonJS.register("$45", function(exports,window,document){ /* module: js/utils/fps.js */
/**
 * Abstraction of window.requestAnimationFrame
 * See https://gist.github.com/1579671 for Polyfill
 */


// debug
// var console = require('utils/console').init();

var requestFrame = window.requestAnimationFrame, 
    cancelFrame = window.cancelAnimationFrame,
    lastTime = 0;



// get vendor specific implementations of requestAnimationFrame
// comment out to fall back to setInterval
if( ! requestFrame || ! cancelFrame ){
    var prefix;
    for( prefix in { ms:1, moz:1, webkit:1, o:1 } ){
        requestFrame = window[ prefix+'RequestAnimationFrame' ];
        if( requestFrame ){
            // have requestAnimationFrame, check for cancel which can have different names
            cancelFrame = window[prefix+'CancelAnimationFrame'] || window[prefix+'CancelRequestAnimationFrame'];
            if( cancelFrame ){
                break;
            }
        }
    }
}
//*/



// Fall back to setInterval method - 16ms aims for 60fps (actually 62.5)
//
if( ! requestFrame || ! cancelFrame ){
    // requestAnimationFrame polyfill
    requestFrame = function( callback ){
        var currTime   = now();
            timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) ),
            nextTime   = currTime + timeToCall,
            timerId    = window.setTimeout( function() { callback( nextTime ); }, timeToCall );
        lastTime = nextTime;
        return timerId;
    };
    // cancelAnimationFrame polyfill
    cancelFrame = function(timerId) {
        clearTimeout( timerId ); 
    };
}



// Use Date.now if it's available
//
var now = Date.now || function(){
    return new Date().getTime();
};





/**
 * Do a setInterval style thing using requestAnimationFrame polyfill
 * This method returns a frame number, rather than a timestamp.
 */
exports.loop = function( callback, element ){
    var frame = 0,
        requestId;

    function loop(){
        requestId = requestFrame( loop, element );
        callback( frame++ );
    }
    loop();

    return {
        stop: function(){
            requestId && cancelFrame(requestId);
            requestId = null;
        }
    };
};




/**
 * similar to above, except passes elapsed time instead of number of frames
 * This will sync better to browser's actual ability to keep up 
 *
exports.interval = function( callback, element ){
    var startTime = now(),
        prevTime  = startTime,
        requestId;

    function loop( thisTime ){
        requestId = requestFrame( loop, element );
        callback( thisTime - prevTime, thisTime );
        prevTime = thisTime;
    }
    loop( startTime );

    return {
        stop: function(){
            requestId && cancelFrame(requestId);
            requestId = null;
        }
    }
}
*/



return exports;
}({},window,document) );

CommonJS.register("$42", function(exports,window,document){ /* module: js/utils/touch.js */
/**
 * Touch utilities
 * Windows 8 will use MSPointerDown and MSPointerUp instead of touch events
 * http://blogs.msdn.com/b/ie/archive/2011/09/20/touch-input-for-ie10-and-metro-style-apps.aspx
 * http://msdn.microsoft.com/en-US/library/ie/hh673557.aspx
 * http://jessefreeman.com/articles/from-webkit-to-windows-8-touch-events/
 * 
 * @todo IE11
 * http://msdn.microsoft.com/en-gb/library/ie/dn304886(v=vs.85).aspx
 */



var supported,
    msPointerEnabled  = !!window.navigator.msPointerEnabled,
    EVENT_TOUCH_START = msPointerEnabled ? 'MSPointerDown' : 'touchstart', 
    EVENT_TOUCH_MOVE  = msPointerEnabled ? 'MSPointerMove' : 'touchmove', 
    EVENT_TOUCH_END   = msPointerEnabled ? 'MSPointerUp'   : 'touchend';
    

/**
 * Test whether touch is supported
 */
exports.ok = function( callback ){
    if( supported == null ){
        // not actually true, but shouldn't raise errors on desktop
        supported = 'function' === typeof document.body.addEventListener;
    }
    supported && callback && callback( exports );
    return supported;
};




/**
 * Test whether IE pointer events are in effect
 */
exports.ms = function(){
    return msPointerEnabled;
};


/**
 * Test if a pointer event is actually a touch event
 */
function msPointerEventIsTouch( event ){
    return (event.MSPOINTER_TYPE_TOUCH||'touch') === event.pointerType;
}

//exports.mstouch = function( event ){
//    return msPointerEnabled && msPointerEventIsTouch(event);
//};



/**
 * Drag/move control
 * @todo check IE10 event properties and abstract if necessary
 */
exports.dragger = function( el, callback ){
    var listeners = {};

    // touch start begins dragging action
    listeners[ EVENT_TOUCH_START ] = function( event ){
        eachTouchEvent( event, function( i, touch ){
            touch.type = EVENT_TOUCH_START;
            callback( event, touch, self );
        } );
        bind( EVENT_TOUCH_MOVE );
        bind( EVENT_TOUCH_END );
        return true;
    };
    
    // end of touch, releases drag
    listeners[ EVENT_TOUCH_END ] = function( event ){
        unbind( EVENT_TOUCH_MOVE );
        unbind( EVENT_TOUCH_END );
        eachTouchEvent( event, function( i, touch ){
            touch.type = EVENT_TOUCH_END;
            callback( event, touch, self );
        } );
        return true;
    };
    
    // move event only required for situation where touch doesn't automatically move scroll
    listeners[ EVENT_TOUCH_MOVE ] = function( event ){
        eachTouchEvent( event, function( i, touch ){
            touch.type = EVENT_TOUCH_MOVE;
            callback( event, touch, self );
        } );
        return killEvent(event); // <- critical
    };
    
    /*/ debug -  I think these are Mozilla only
    listeners['touchleave'] = listeners['touchcancel'] = function( event ){
        console.log( event.type);
        return true;
    }
    //*/
    
    
   function bind( type ){
        // TODO passive events, see supportsPassiveEvents below: 
        el.addEventListener( type, listeners[type], false );
    }
    
    function unbind( type ){
        el.removeEventListener( type, listeners[type], false );
    }
    
    // bind start event to original element
    bind( EVENT_TOUCH_START );
    
    // expose public dragger functions
    var self = {
        kill: function(){
            unbind( EVENT_TOUCH_START );
            unbind( EVENT_TOUCH_MOVE );
            unbind( EVENT_TOUCH_END );
            el = self = callback = null;
        }
    };
    return self;
};



   


/**
 * Swipe/scroll mechanism with speed measure and scroll animation built in
 */
exports.swiper = function( el, callback, msJS ){
    
    var loop,
        swiped,
        xscroll,
        listeners = {},
        tstarts = [],
        xoffset = [],
        yoffset = [];
        
        
    // start of touch register initial touch point and time
    listeners[ EVENT_TOUCH_START ] = function( event ){
        swiped = false;
        stopAnimation();
        var t = now();
        eachTouchEvent( event, function( i, e ){
            tstarts[i] = t;
            xoffset[i] = e.clientX;
            yoffset[i] = e.clientY;
        } );
        xscroll = el.scrollLeft;
        return true;
    };
    

    // end of touch, calculate speed and call back
    listeners[ EVENT_TOUCH_END ] = function( event ){
        eachTouchEvent( event, function( i, e ){
            var touchtime  = now() - tstarts[i],
                touchmoved = xoffset[i] - e.clientX,
                speed = Math.abs( touchmoved ) / touchtime, // <- pixels per millisecond
                pxdir = touchmoved ? ( touchmoved < 0 ? -1 : 1 ) : 0; // direction
            callback( speed, pxdir );
        } );
        xscroll = null;
        return true;
    };
    
    
    // move event only required for situation where touch doesn't automatically move scroll
    listeners[ EVENT_TOUCH_MOVE ] = function( event ){
        var xmove, ymove;
        ( xscroll == null ) || eachTouchEvent( event, function( i, e ){
            xmove = xoffset[i] - e.clientX;
            ymove = yoffset[i] - e.clientY;
        } );
        // check whether vertical move was greater than horizontal move
        if( ymove && Math.abs(ymove) > Math.abs(xmove) ){
            swiped = true;
            return true;
        }
        // else move, if moved. (Surface will fire 0px move - issue #70 fix)
        if( xmove ){
            swiped = true;
            el.scrollLeft = Math.max( 0, xscroll + xmove );
        }
        return killEvent(event);
    };
    
    

    function bind( type ){
        el.addEventListener( type, listeners[type], false );
    }
    
    function unbind( type ){
        el.removeEventListener( type, listeners[type], false );
    }
    
    function stopAnimation(){
        loop && loop.stop();
        loop = null;
    }

    // allow pure CSS solution
    if( msPointerEnabled && ! msJS ){
        // we'll set externally via 'snap' function
    }
    // else bind HTML5 touch events for js
    else {
        bind( EVENT_TOUCH_START );
        bind( EVENT_TOUCH_MOVE );
        bind( EVENT_TOUCH_END );
        // ms requires overflow hidden - @todo how to detect touch before a touch??
        if( msPointerEnabled ){
            el.className += ' mstouch';
        }
    }
    

    // expose function to kill us off
    return {
        kill: function(){
            unbind( EVENT_TOUCH_START );
            unbind( EVENT_TOUCH_MOVE );
            unbind( EVENT_TOUCH_END );
            stopAnimation();
        },
        // check if swiper has swiped since last touch
        swiped: function(){
            return swiped;
        },
        //  check if IE10 touch-enabled
        ms: function(){
            return msPointerEnabled;
        },
        // set MS snap size
        snap: function( size ){
            if( msPointerEnabled && ! msJS ){
                el.style['-ms-scroll-snap-points-x'] = 'snapInterval(0px,'+size+'px)';
                el.style['-ms-scroll-snap-type'] = 'mandatory';
                el.style['-ms-scroll-chaining'] = 'none';
            }
        },
        // animate scrollLeft using animation module utils/fps
        scroll: function( scrollTarget, speed, callback ){
            stopAnimation();
            var scrollNow = el.scrollLeft,
                direction = scrollTarget > scrollNow ? 1 : -1,
                maxfunc = Math[ direction === 1 ? 'min' : 'max' ],
                ppf = Math.round( speed * 16 * direction ); // <- pixels per frame based on *expected* interval achieved at 60fps
            // start interval loop    
            loop = CommonJS.require("$45","fps.js").loop( function( frame ){
                if( ! frame ){
                    // first callback will always be 0
                    return;
                }
                // ppf = Math.round( speed * interval );
                scrollNow = Math.max( 0, maxfunc( scrollTarget, scrollNow + ppf ) );
                el.scrollLeft = scrollNow;
                if( scrollTarget === scrollNow ){ //|| scrollNow !== el.scrollLeft ){
                    stopAnimation();
                    callback && callback( scrollNow );
                }
            }, el );
            return loop;
        }        
    };
};




// bind touchstart
exports.start = function( el, callback ){
    return makeBinding( el, EVENT_TOUCH_START, callback, false );
};


// bind touchmove
exports.move = function( el, callback ){
    return makeBinding( el, EVENT_TOUCH_MOVE, callback, false );
};
    

// bind touchend
exports.end = function( el, callback ){
    return makeBinding( el, EVENT_TOUCH_END, callback, false );
};
    



// generic bind with unbind accessor
function makeBinding( el, type, callback, capture ){
    if( msPointerEnabled ){
        // only fire MS pointer events that are touch
        var handler = callback;
        callback = function(event){
            if( msPointerEventIsTouch(event) ){
                return handler(event);
            }  
        };
    }
    el.addEventListener( type, callback, capture );
    return {
        unbind: function(){
            el.removeEventListener( type, callback, capture );
        }
    };
}



var eachTouchEvent = exports.each = function ( event, callback ){
    // abstract microsoft's pointer events
    if( msPointerEnabled ){
        if( msPointerEventIsTouch(event) ){
            callback( 0, event );
        }
        // else not a touch interaction
        return;
    }
    // regular multi-touch support
    var i = -1, 
        touched = event.originalEvent || event,
        changed = touched.changedTouches||[];
    while( ++i < changed.length ){
        callback( i, changed[i] );
    }    
};
    
    




function killEvent( event ){
    event.preventDefault();
    event.stopPropagation();
    return false;
}


var now = Date.now || function(){
    return new Date().getTime();
};


// Passive events detection: https://www.chromestatus.com/feature/5745543795965952
var supportsPassive;
function supportsPassiveEvents(){
	if( null == supportsPassive ){
		// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
		// Test via a getter in the options object to see if the passive property is accessed
		supportsPassive = false;
		try {
		  var opts = Object.defineProperty({}, 'passive', {
		    get: function() {
		      supportsPassive = true;
		    }
		  });
		  window.addEventListener("testPassive", null, opts);
		  window.removeEventListener("testPassive", null, opts);
		} catch (e) {}
	}
	return supportsPassive;
}

return exports;
}({},window,document) );

CommonJS.register("$46", function(exports,window,document){ /* module: js/ui/textarea/mirror.js */
/**
 * Textarea mirror:
 * - Creates a floating DIV *in front* of textarea for overlaying 
 * - currently only for showing invisibles, but multiple/optional processing could be added
 */
exports.init = function( elField ){
    
    /**
     * Keep div vertically in line with textarea
     * TODO Lags on slow browser - could hide while scrolling and render after timeout.
     */
    function mirrorScroll(){
        elMirror.style.top = String( - elField.scrollTop )+'px';
        return true;
    }


    /**
     * Set mirror to contents of textarea
     */
    function mirrorText(){
        var div = elMirror;
        div.textContent = elField.value;
        // show invisible characters:
        div.innerHTML = div.innerHTML
            .replace( /[ \t]/g, replacePrintableSpaces )                       // <- printable whitespace
//          .replace( /[\v\f]/g, replaceUnprintableChardata )                  // <- unprintable chardata
            .split(/(?:\n|\r\n?)/).join('<span class="eol crlf"></span>\r\n')  // <- end of line
            +'<span class="eol eof"></span>'                                   // <- end of line and end of input
        ;
        return true;
    }

    
    /**
     * RegExp callback wraps legal whitespace in span elements
     * CSS rules for .x{hex} classes will insert placeholder symbols at span:before
     */
    function replacePrintableSpaces( s ){
        return '<span class="x'+s.charCodeAt(0).toString(16)+'">'+s+'</span>';
    }

    /**
     * 
     *
    function replaceUnprintableChardata( s ){
        return '<span class="ctrl x'+s.charCodeAt(0).toString(16)+'"></span>';
    }*/


    /**
     * Discard current mirroring
     */
    function destroy(){
        $(elField)
            .off( 'input', mirrorText )
            .off( 'scroll', mirrorScroll );
        elParent.removeChild( elMirror );
        elMirror = null;
        $(elParent).removeClass('has-mirror');
    }

    
    // Enable immediately

    var elParent = elField.parentNode,
        elMirror = elParent.insertBefore( document.createElement('div'), elField )
    ;
    
    $(elField)
        .on('input', mirrorText )
        .on('scroll', mirrorScroll )
    ;

    $(elParent).addClass('has-mirror');
    elMirror.className = 'ta-mirror';
    
    
    // account for horizontal scrollbar on some platforms
    var diff = elField.offsetWidth - elField.clientWidth;
    if( diff > 2 ){
        // hard coding 1px border as it's standard across Loco
        //$(elMirror).css('margin-right', String(diff-2)+'px' );
        elMirror.style.marginRight = String(diff-2)+'px';
    }
    
        
    
    mirrorText();
    mirrorScroll();


    /**
     * Expose common interface for all textarea plugins
     */
    return {
        kill: destroy
    };
    
    
};
return exports;
}({},window,document) );

CommonJS.register("$28", function(exports,window,document){ /* module: js/utils/remote.js */
/**
 * utils/remote
 */

var queue = {}, 
    STATIC_BASE;


/**
 * Get Loco's own static base.
 * All loco pages should include vendor library before any other scripts of its own
 * TODO would be preferable to somehow known current script as this will not work in WordPress plugin (for example)
 */
function getStaticBase(){
    var href, snip, base,
        scripts = document.getElementsByTagName('script'), i = -1, t = scripts.length
    ;
    while( ++i < t ){
        if( href = scripts[i].getAttribute('src') ){
            snip = href.indexOf('/lib/vendor');
            if( -1 !== snip ){
                base = href.substr( 0, snip );
                break;
            }
        }
    }
    return base || '/static';
}



/**
 * Dispatch argument to url listeners 
 * @return Number count of listeners called back to
 */
function dispatch( url, glob ){
    var n = 0,
        i = -1,
        instance = glob && window[glob], 
        callbacks = queue[url]||[], 
        queuelength = callbacks.length
    ;
    while( ++i < queuelength ){
        callback = callbacks[i];
        if( 'function' === typeof callback ){
            callback( instance );
            n++;
        }
    }
    return n;
}


/**
 * @param {String} url of script to load
 * @param {Function} callback function
 * @param {String} glob Global variable name that indicates script already loaded
 */
exports.load = function( url, callback, glob ){

    // if object sniffable, call back immediately
	if( glob && window[glob] ){
		if( 'function' === typeof callback ){
			callback( window[glob] );
		}
		return;
	}

	// if object already requested, add to callback queue
	if( null != queue[url] ){
	    queue[url].push( callback );
	    return;
	}
	
	// start queue with current requester
	queue[url] = [ callback ];
	
	// tidy up scope
	function cleanup(){
	    if( timeout ){
            clearTimeout( timeout );
            timeout = null;
        }
        if( s ){
            s.onreadystatechange = null;
            s = s.onload = null;
            s = null;
        }
        if( url ){
            delete queue[url];
            url = null;
        }
	}

    // script load callback function 
    function onScript( _, isAbort ) {
        var state = s && s.readyState;
        if ( isAbort || ! state || 'loaded' === state || 'complete' === state ){
            isAbort || dispatch( url, glob );
            cleanup();
        }
    };
    
    function onError(){
        if( 0 === dispatch( url ) ){
            throw new Error('Failed to load "'+(glob||url)+'"');
        }
        cleanup();
    }
    	
    // Set timeout for browsers that don't observe onerror
    var timeout = setTimeout( onError, 4000 );

	// request script with onload callback
	var s = document.createElement('script');
	s.setAttribute( 'src', url );
	s.setAttribute('async', 'true');
	s.onreadystatechange = onScript;
    s.onload = onScript;
    s.onerror = onError;
    s.onabort = cleanup;
    document.getElementsByTagName('head')[0].appendChild(s);
    
    /*return {
        cancel: function(){
            // meh.
        }
    };*/
    
};





/**
 * Prefix a path with Loco's static base
 */
exports.stat = function( path ){
    var base = STATIC_BASE || ( STATIC_BASE = getStaticBase() );
    return base + path;
};






return exports;
}({},window,document) );

CommonJS.register("$15", function(exports,window,document){ /* module: js/ui/textarea/ace.js */
/**
 * Code editor textarea plugin using Ace.
 * https://ace.c9.io/
 */

var customPrintfRegEx,
    defaultPrintfMode = 'auto';


/**
 * Activate a textarea.
 * 
 * @param textarea element
 * @param object textarea listener if enabled
 * @return object closure
 */
exports.init = function( ta, listener, syntax ){

    // create a container div to hold the Ace DOM
    // append element as a sibling to the real text field, and hide real text field
    var editor,
        invis = false,
        printf = syntax || defaultPrintfMode,
        wrapper = ta.parentNode,
        container = wrapper.appendChild( document.createElement('div') )
    ;

    // Enforcing styles now avoids line-height jump when Ace editor is initialized
    $(wrapper).addClass('has-proxy has-ace');


    /**
     * Discard this editor ensuring scope is garbage collected
     */
    function destroyProxy(){
        if( editor ){
            unbindProxy( editor );
            editor.destroy();
            editor = null;
        }
        if( container ){
            wrapper.removeChild( container );
            $(wrapper).removeClass('has-proxy has-ace');
            container = null;
        }
    }
    
    
    /**
     * Change invisibles state
     */
    function setShowInvisibles( bool ){
        if( invis !== bool ){
            invis = bool;
            editor && editor.setShowInvisibles( bool );
        }
    }

    
    /**
     * Change print syntax mode
     */
    function setPrintfMode( mode ){    
        if( mode !== printf ){
            printf = mode;
            // TODO would prefer to get "window.ace" from editor instance
            editor && editor.session.setMode( createAceMode(window.ace,mode) );
        }    
    }

    
    
    // load and initialize Ace editor into a new element
    CommonJS.require("$28","remote.js").load( 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', function( ace ){
        if( ! container ){
            return;
        }
        if( ! ace ){
            throw new Error('Failed to load code editor');
        }
        // create a container div to hold the Ace DOM
        // append element as a sibling to the real text field, and hide real text field
        editor = ace.edit( container );
        var session = editor.session,
            renderer = editor.renderer
        ;
        // disable annoying warning
        editor.$blockScrolling = Infinity;
        
        // set currently configured code editor options
        editor.setShowInvisibles( invis );
        editor.setWrapBehavioursEnabled(false); // <- tag auto-close
        editor.setBehavioursEnabled(false);     // <- bracket balancing
        editor.setHighlightActiveLine(false);
        // editor.setKeyboardHandler(null); // <- doesn't work.

        session.setUseSoftTabs(false);   // <- uses real tab characters rather than spaces :-o
        // session.setUseWrapMode(true); // <- nicer than horizontal scroll, but has rendering issues

        renderer.setShowGutter(true);   // <- line numbers
        renderer.setPadding( 10 );      // <- can't do in CSS/ has to be accounted for in calculations
        renderer.setScrollMargin( 8 );  // supposedly (top, bottom, left, right) but only top seems to do anything
 
        // Set HTML mode, without full document linting
        // https://groups.google.com/forum/#!msg/ace-discuss/_ugvULc9DX4/b7xi_u3_CQAJ
        // session.setMode("ace/mode/html");
        // session.setOption("useWorker", false);
        
        // set custom mode as new object 
        session.setMode( createAceMode(ace,printf) );
 
        // Ready to render current content (-1:start, 1:end)
        editor.setValue( ta.value, -1 );
        
        // Rendering glitch avoided by setting this after content is set.
        session.setUseWrapMode(true);

        // if listener is active then field is editable
        if( listener ){
            bindProxy( editor, listener );
        }
        // else editor is disabled (syntax highlighting only)
        // some disablement is handled in CSS, some bits require some code. 
        else {
            disableProxy( editor );
        }
        // ok, Ace enabled
    }, 'ace' );


    /**
     * Expose common interface for all textarea plugins
     */
    return {
        kill: function(){
            destroyProxy();
            return this;
        },
        disable: function(){
            editor && disableProxy(editor);
            listener = null;
            return this;
        },
        enable: function( newListener ){
            listener = newListener;
            editor && bindProxy( editor, newListener );
            return this;
        },
        resize: function(){
            editor && editor.resize();
            return this;
        },
        val: function( value ){
            if( editor && value !== editor.getValue() ){
                editor.setValue( value, -1 );
            }
            return this;
        },
        invs: function( bool ){
            setShowInvisibles( bool||false );
            return this;
        },
        strf: function( mode ){
            setPrintfMode( mode||defaultPrintfMode );
            return this;
        },
        focus: function(){
            // TODO this? editor && editor.focus(); // not current required because arrow keys don't work in Ace :-/
            return this;
        }
    };
};



/**
 * __Globally__ set a default printf mode.
 * Call before creating any editors.
 */
exports.strf = function( printfMode, customRegEx  ){
    defaultPrintfMode = printfMode;
    customPrintfRegEx = customRegEx;
    return exports;
};




/**
 * Listen to code editor changes so we can pass them to the real textarea
 * focus/blur changes need to be proxied also
 */ 
function bindProxy( editor, listener ){
    editor.setReadOnly( false );
    editor.on( 'change', function( event, editor ){
        return listener.val( editor.getValue() );
    } );
    editor.on( 'focus', function(/* event, editor */){
        return listener.focus();
    } );
    editor.on( 'blur', function(/* event, editor */){
        return listener.blur();
    } );
}



/**
 * Stop Ace passing events back to our listener
 */
function unbindProxy( editor ){
    editor.off('change');
    editor.off('focus');
    editor.off('blur');
}

    
    
/**
 * Make Ace editor readonly
 */ 
function disableProxy( editor ){
    unbindProxy( editor );
    editor.setReadOnly(true);
    editor.setHighlightGutterLine( false );
    editor.setHighlightActiveLine( false );
};





/**
 * Get instance of custom Ace editor mode for Loco strings.
 * It's a basic formatter with support for HTML entities and sprintf formatting strings.
 * 
 * @return CustomMode
 */
function createAceMode( ace, printfMode ){
    
    var CustomHighlightRules = createCustomHighlightRules( printfMode ),
        req = ace['require'],
        oop = req('ace/lib/oop')
    ;
    
    function CustomMode(){
        this.HighlightRules = CustomHighlightRules;
    }

    // CustomHighlightRules extends TextHighlightRules
    oop.inherits ( 
        CustomHighlightRules, 
        req("ace/mode/text_highlight_rules").TextHighlightRules
    );
    
    // CustomMode extends TextMode
    oop.inherits (
        CustomMode,
        req("ace/mode/text").Mode
    );
    
    return new CustomMode;
}


/**
 * Closure for applying highlighting rules
 */
function createCustomHighlightRules( printfMode ) {
    return function(){
        var rules = createDefaultRules(),
            printfRegEx = createPrintfRegExp(printfMode);

        // ICU requires its own rule set
        if( 'icu' === printfMode ){
            rules = createIcuRules( rules.start );
        }
        // else add printf syntax, unless disabled.
        else if( printfRegEx ){
            rules.start.push( {
                token: 'printf',
                regex : printfRegEx
            } );
        }
        // always default to plain text. (I think this is implied)
        // rules.start.push( { defaultToken : "text" } );
        
        // apply rules
        this.$rules = rules;
    };
}


/**
 * @param {string} format either a mode like "php" or a disabled mode like "no-php"
 * @return {RegExp|null} pattern for "printf" token of given format
 */
function createPrintfRegExp( format ){
    switch( format ){

    case 'objc':
        return /%(?:\d+\$)?[-+'0# ]*\d*(?:\.\d+|\.\*(?:\d+\$)?)?(?:hh?|ll?|[qjzTL])?[sScCdDioOuUxXfFeEgGaAp%@]/;

    case 'java':
        return /%(?:\d+\$)?[-+,(0# ]*\d*(?:\.\d+)?(?:[bBhHsScCdoxXeEfgGaA%n]|[tT][HIklMSLNpzZsQBbhAaCYyjmdeRTrDFc])/;

    case 'php':
        return /%(?:\d+\$)?(?:'.|[-+0 ])*\d*(?:\.\d+)?[suxXbcdeEfFgGo%]/;

    case 'python':
        return /%(?:\([a-z]+\))?[-+0# ]*(?:\d+|\*)?(?:\.\d+|\.\*)?(?:[hlL])?[sdiouxXeEfFgGcra%]/;
        
    case 'javascript':
        return /%(?:[1-9]\d*\$)?\+?(?:0|'[^$])?-?\d*(?:\.\d+)?[b-gijostTuvxX%]/;
        
    // auto-syntax, use simple-ish rule with common/compatible tokens used across formats
    // this allows common numeric types preceded by padding and precision, or simple string types.
    case 'auto':
        return /%(?:\d+\$|\([a-z]+\))?(?:[-+0]?\d*(\.\d+)?[duxoefgaDUXOEFGA]|[@scSC%])/;
    
    // or explicitly set custom mode
    case defaultPrintfMode:
        return customPrintfRegEx || '%%';
    }
}


/**
 * ICU is much more complex and recursive, so we can't use the same method as printf tokens.
 * @param {object} start Default rules "start" state
 * @return {object} Complete rule set for highlighter
 */
function createIcuRules( start ){

    var // :Pattern_White_Space:
        ws = '\\s\\u0085\\u200E\\u200F\\u2028\\u2029',
        // :Pattern_Syntax:
        sx = '!-/:-@\\[-^{-~¡¢£¤¥¦§©«¬®°±¶»¿×÷\\u2010-\\u2027\\u2030-\\u203E\\u2041-\\u2053\\u2055-\\u205E\\u2190-\\u245F\\u2500-\\u2775\\u2794-\\u2BFF\\u2E00-\\u2E7F\\u3001-\\u3003\\u3008-\\u3020\\u3030\\uFD3E\\uFD3F\\uFE45\\uFE46';

    return {
        start: start.concat( [
            /*/ literal text is either quoted-quotable or unquoted-unquotable :)
            { token: 'text',
                regex: "[^'{}]+" // <- if we have this then we can't use default rules with HTML syntax etc..
            },*/
            { token: 'icu-quoted',
              regex: /'([{}][^']*)?'/
            },
            // color code simple "leaf" rules like printf: {0} {foo} {n,number} {d,date,long}
            // this should be most common embedded syntax with strict argType, but very permissive argStyle
            { token: 'printf',
              regex: '{[^'+sx+']+(,['+ws+']*(?:number|date|time|spellout|ordinal|duration)['+ws+']*(,['+ws+']*[^{}]+)?)?}'
            },
            // opening brace should begin a new complex argument.
            { token: 'icu',
              regex: /{/,
              next: 'icuName'
            },
            // closing brace should mean going /back/into ICU rule (like plural or select)
            { token: 'icu',
              regex: /}/,
              next: 'icuType'
            }
        ] ),
        // state immediately after opening brace - sniffs nameOrNumber for highlighting
        icuName: [
            { token: 'icu',
              regex: '['+ws+']+'
            },
            { token: 'icu.name',
              regex: '[^'+ws+sx+']+',
              next: 'icuType'
            },
            { defaultToken: 'icu',
              next: 'icuType'
            }
        ],
        // state at any other point within argType or argStyle syntax
        // very simple. Just toggle escape when brace encountered, else color as syntax
        // this allows recursive patterns like plural and select to break in and out of escape mode.
        icuType : [
            { token: 'icu',
              regex: /[{}]/,
              next: 'start'
            },
            { defaultToken: 'icu' }
        ]
        
    };

}


function createDefaultRules(){
    // Standard rules include HTML entities and common XML tags
    // these should not interfere with any formatting rules
    return { start: [
        { token : "empty_line",
          regex : /^$/
        },
        // &entities;
        { token : "constant.language", // <- Textmate theme makes blue
          regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        },
        // CDATA open
        { token: "constant.language",
          regex: /<!\[CDATA\[/
        },
        // CDATA close
        { token: "constant.language",
          regex: /\]\]>/
        },
        /*/ whole CDATA block (doesn't work over line-breaks
        { token: "cdata",
          regex: "<!\\[CDATA\\[.*]]>"
        },*/
        // XLIFF-style placeholders containing inner content <g>{stuff}</g>
        { token: "locked",
          regex: /<(?:xliff:)?(?:g|ph)[^>]*>[^<]*<\/(?:xliff:)?(?:g|ph)>/
        },
        // XLIFF-style placeholders without children <x id="foo" />
        { token: "locked",
          regex: /<(?:xliff:)?(bx|ex|x)[^\/>]*\/>/
        },
        // all other XML tags (allow edit)
        { token: "constant.language",
          regex: /<\/?[:a-z]+[^>]*>/
        }
    ] };
}


return exports;
}({},window,document) );

CommonJS.register("$47", function(exports,window,document){ /* module: js/ui/textarea/mce.js */
/**
 * TinyMCE proxy for textarea 
 */

var incrementor = 0;


/**
 * Bit of a lag when loading, so may want to call this to preload on some screens
 * Latest version is 4.7.4 - Cloudflare does not include the inlite theme
 * https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js
 */
exports.load = function( callback ){
    var remoteLib = CommonJS.require("$28","remote.js");
    remoteLib.load( remoteLib.stat('/lib/tinymce.min.js'), callback, 'tinymce' );
    //remoteLib.load( remoteLib.stat('/lib/debug/tinymce/tinymce.js'), callback, 'tinymce' );
    return exports;
};



/**
 * @param {HTMLElement} ta Textarea element
 * @param {object} listener Textarea listener if enabled
 */
exports.init = function( ta, listener ){
    
    var editor,
        invis = false,
        initialHtml = '',
        initialPara = false,
        wrapper = ta.parentNode,
        wrapperWrapper = wrapper.parentNode,
        container = wrapper.appendChild( document.createElement('div') ),
        toolbar = wrapperWrapper.insertBefore( document.createElement('nav'), wrapper )
    ;

    function beforeSetContent( value ){
        initialHtml = value;
        initialPara = '<p>' === value.substr(0,3) && '</p>' === value.substr(-4);
        return value.replace(/(<\/?)script/ig, '$1loco:script' );
    }
    
    function afterGetContent( value ){
        value = value.replace(/(<\/?)loco:script/ig, '$1script' );
        // has original text been wrapped in redundant root block?
        if( ! initialPara && '<p>' === value.substr(0,3) && '</p>' === value.substr(-4) ){
            // if text has changed, we'll only keep root block if no other breaks present (single line)
            var innerHtml = value.substr(3,value.length-7);
            if( innerHtml === initialHtml || -1 === innerHtml.indexOf('</p>') ){
                value = innerHtml;
            }
        }
        return value;
    }

    
    // initial render while editor initializes
    toolbar.id = '_tb'+String(++incrementor);
    $(wrapper)
        .addClass('has-proxy has-mce');
    $(container)
        .addClass('mce-content-body loading')
        .html( beforeSetContent(ta.value) )
    ;
    
    
    /**
     * Discard this editor ensuring scope is garbage collected
     */
    function destroyProxy(){
        if( editor ){
            listener && listener.val( editor.getContent() );
            unbindProxy( editor );
            editor.destroy();
            editor = null;
        }
        if( container ){
            wrapper.removeChild( container );
            $(wrapper).removeClass('has-proxy has-mce');
            container = null;
        }
        if( toolbar ){
            wrapperWrapper.removeChild( toolbar );
            toolbar = null;
        }
    }


    /**
     * Change invisibles state
     */
    function setShowInvisibles( bool ){
        if( invis !== bool ){
            invis = bool;
            $(wrapper)[ bool ?'addClass':'removeClass' ]('show-invs');
        }
    }


    /**
     * "init_instance_callback" handler
     */
    function onEditorInit( ed ){
        editor = ed;
        // override getContent
        ed._getContent = ed.getContent;
        ed.getContent = function(arg){
            return afterGetContent( this._getContent(arg) );
        };
        // override setContent
        ed._setContent = ed.setContent;
        ed.setContent = function(value, arg ){
            //arg = arg || {};
            //arg.format = 'html';
            return this._setContent( beforeSetContent(value), arg );
        };
        // bind whether writable or not
        if( listener ){
            bindProxy( ed, listener );
            listener.reset(); // <- late binding
        }
        else {
            disableProxy( ed );
        }
        $(container).removeClass('loading');
        /*/ debug
        editor.on('keydown', function( event ){
            return true;
        } );*/
    }    


    // Load TinyMCE editor into container div (inline mode - no iframe) 
    exports.load( function( tinymce ) {
        if( ! tinymce ){
            throw new Error('Failed to load HTML editor');
        }
        if( ! container ){
            return;
        }
        // initialize editor instance
        // https://www.tinymce.com/docs/configure/integration-and-setup/
        tinymce.init( {
            inline: true,
            target: container,
            hidden_input: false,
            theme: 'modern', 
            skin: false,
            plugins: 'link lists',
            browser_spellcheck: true,
            menubar: false,
            /* these things have no effect when inline
            resize: true,            
            statusbar: true,
            height: ta.clientHeight || 100,
            min_height: 100,*/
            fixed_toolbar_container: '#'+toolbar.id,
            toolbar: 'formatselect | bold italic link unlink | bullist numlist outdent indent',
            block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h4;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
            forced_root_block: 'p', // <- bah
            relative_urls : false,
            convert_urls  : false,
            remove_script_host : false,
            document_base_url : '',
            allow_script_urls: false,
            // override annoying inline styles
            formats : {
                alignleft   : { classes : 'alignleft' },
                alignright  : { selector: 'p,h1,h2,h3,h4,span,strong,em,a', classes : 'alignright' },
                aligncenter : { selector: 'p,h1,h2,h3,h4,span,strong,em,a', classes : 'aligncenter' },
                strikethrough : { inline: 'del' }
            },
            fix_list_elements: true,
            //verify_html: false,
            //valid_elements: '*[*]',
            //invalid_elements: 'script',
            extended_valid_elements: 'span,b,i,u,loco:script',
            entities: '38,amp,60,lt,62,gt,160,nbsp',
            entity_encoding: 'named',
            keep_styles: false,
            // initialize when ready
            init_instance_callback: onEditorInit
        } );
        
    } );
    
    
    /**
     * Expose common interface for all textarea plugins
     */
    return {
        val: function( value ){
            value = beforeSetContent(value);
            // it's possible that editor hasn't initialized
            if( null == editor ){
                ta.value = value;
                $(container).html(value);
            }
            // if editor is loaded we can call setContent immediately
            else if( editor.getContent() !== value ){
                editor.setContent(value);
            }
            // setContent doesn't seem to fire change events. do we want it to?
            listener && listener.val(value);
            return this;
        },
        kill: function(){
            destroyProxy();
            return this;
        },
        enable: function( newListener ){
            listener = newListener;
            editor && bindProxy( editor, newListener );
            return this;
        },
        disable: function(){
            editor && disableProxy( editor );
            listener = null;
            return this;
        },
        focus: function(){
            if( editor && listener ){
                editor.focus();
            }
            return this;
        },
        invs: function( bool ){
            //editor && editor.execCommand('mceVisualChars', false, bool ); // <- worthless
            setShowInvisibles( bool||false );
            return this;
        }
    };
};



/**
 * Listen to editor changes so we can pass them to the real textarea
 * focus/blur changes need to be proxied also
 */ 
function bindProxy( editor, listener ){
    function onChange(){
        return listener.val( editor.getContent() );
    }
    editor.on( 'input', onChange );
    editor.on( 'change', onChange );
    //
    editor.on( 'focus', function(){
        return listener.focus();
    } );
    editor.on( 'blur', function(){
        return listener.blur();
    } );
    editor.setMode('design');
}



/**
 * Stop passing events back to our listener
 */
function unbindProxy( editor ){
    editor.off('input');
    editor.off('change');
    editor.off('focus');
    editor.off('blur');
}


/**
 * Make editor readonly
 */
function disableProxy( editor ){
    unbindProxy( editor );
    editor.setMode('readonly');
}
return exports;
}({},window,document) );

CommonJS.register("$43", function(exports,window,document){ /* module: js/ui/textarea/field.js */
/**
 * Abstracted textarea form field.
 * - Wraps native textarea for basic editing and provides custom modes for "code" and "html"
 * - Assists regular textareas with additional functions such as showing invisibles
 */

// only one form control can actually have focus at once
var currentFocus;

/**
 * Quick create, without enable/disable business
 */
exports._new = function( elText ){
    return new TextArea( elText );
};


/**
 * Initialize from an existing textarea element
 * @return TextArea
 */
exports.init = function( elText ){
    var instance = new TextArea( elText );

    // enable to start, base on disabled attribute
    if( elText.disabled ){
        elText.removeAttribute('disabled');
        instance.disable();
    }
    else if( elText.readOnly ){
        instance.disable();
    }
    else {
        instance.enable();
    }
    
    // set current language if lang attribute is set - NOT looking for closest ancestor
    // This is now being handled on parent container instead, as it's easier for css hooks when textarea has siblings
    // var attribute = instance.attr('lang');
    // attribute && instance.locale(attribute);
    
    // observe maxlength attribute via counter utility
    // works, but not currently enabled
    // var attribute = instance.attr('maxlength');
    // attribute && instance.max( Number(attribute) );

    return instance;
};


/**
 * Create a listening closure scope for text field content changes
 */
function createListener( target ){
    var tracking = false,
        $target = $(target),
        $parent = $(target.parentNode),
        currentValue = target.value,
        initialValue
    ;
    function destroyListener(){
        stopTracking();
        $target.off('blur',onBlur).off('focus',onFocus);
    }
    function startTracking(){
        initialValue = currentValue;
        if( ! tracking ){
            $target.on('input', checkValueChange );
            tracking = true;
        }
    }
    function restartTracking(){
        currentValue = target.value;
        initialValue = currentValue;
    }
    function stopTracking(){
        if( tracking ){
            $target.off('input', checkValueChange );
            tracking = false;
        }
    }
    function checkValueChange(){
        var changedValue = target.value;
        if( changedValue !== currentValue ){
            $target.trigger( 'changing', [ changedValue, currentValue ] );
            currentValue = changedValue;
        }
    }
    function forceValueChangeEvent(){
        currentValue = null; 
        checkValueChange();
    }
    function checkFinalValue(){
        if( tracking && initialValue !== currentValue ){
            $target.trigger( 'changed', [ currentValue ] );
        }
        return true;
    }
    function changeValue( changedValue ){
        if( currentValue !== changedValue ){
            target.value = changedValue;
            $target.triggerHandler('input');
            currentValue = changedValue; // <- in case of event failure
        }
        return true;
    }
    function pingValueChange(){
        checkValueChange();
        checkFinalValue();
    }
    function onFocus(){
        currentFocus = target;
        startTracking();
        // regular focus events don't bubble
        $target.trigger('editFocus');
        $parent.addClass('has-focus');
        return true;
    }
    function onBlur(){
        if( currentFocus === target ){
            currentFocus = null;
        }
        // regular blur events don't bubble
        $target.trigger('editBlur');
        $parent.removeClass('has-focus');
        if( tracking ){
            pingValueChange();
            stopTracking();
        }
        return true;
    }
    $target
        // deactivate and track completion when editor exited
        .blur( onBlur )
        // activate when editable element entered
        .focus( onFocus )
    ;
    // return a handle of some use
    return {
        val:  changeValue,
        kill: destroyListener,
        fire: forceValueChangeEvent,
        ping: pingValueChange,
        blur: onBlur,
        focus: onFocus,
        reset: restartTracking
    };
}



/**
 * Basic TextArea instance based on actual textarea element.
 * 
 * @property HTMLElement "e" (element)
 * @property Object      "l" (listener)
 * @property Number      "n" (max count)
 * @property Boolean     "i" (invisibles)
 * @property String      "m" (render mode)
 * @property Object      "p" (plugin/proxy)
 */
function TextArea( elText ){
    this.e = elText;
}


TextAreaPrototype = TextArea.prototype;


/**
 * Discard object
 */
TextAreaPrototype.destroy = function(){
    this.unlisten();
    var proxy = this.p;
    if( proxy ) {
        proxy.kill();
        this.p = null;
    }
    this.e = null;
};


/**
 * Set new text and editable state
 */
TextAreaPrototype.reload = function( value, editable ){
    var listener = this.l;
    // destroy listener if no longer editable
    if( listener && ! editable ) {
        this.disable();
        listener = null;
    }
    // set new value without firing any change events
    this.val( value || '' );
    // start listening if required
    if( editable && ! listener ){
        this.enable();
    }
    return this;
};


/**
 * Get/set current field value externally
 * @return string|TextArea
 */
TextAreaPrototype.val = function( value ){
    var elText = this.e;
    if( null == value ){
        return elText.value;
    }
    // must pass any external input via proxy/plugin if we're using one
    // this avoids cyclic events as changes pass back to our listener.
    var listener = this.l, proxy = this.p;
    if( proxy ){
        proxy.val( value );
    }
    // proxy should have set value on our listener, but we must make sure (setter is idempotent)
    if( listener ){
        listener.val( value );
    }
    // without a listener textarea is disabled, so set value quietly
    // this may be true when we have a proxy, but must update text field.
    if( ! listener && elText.value !== value ){
        elText.value = value;
        $(elText).triggerHandler('input');
    }

    return this; 
};


/**
 * Force the textarea to trigger update handlers for its current value
 * @return TextArea
 */
TextAreaPrototype.fire = function(){
    this.l && this.l.fire();
    return this;
};


/**
 * Ping current value as if finished with it. 
 * Call before unloading if no other event (like blur) would invoke change events 
 * @return TextArea
 */
TextAreaPrototype.ping = function(){
    this.l && this.l.ping();
    return this;
};


/**
 * Give our form-control element focus
 * @return TextArea
 */
TextAreaPrototype.focus = function(){
    var proxy = this.p;
    if( proxy ){
        proxy.focus();
    }
    else {
        $(this.e).focus();
    }
};


/**
 * Check if our form-control element has focus 
 */
TextAreaPrototype.focused = function(){
    return currentFocus && currentFocus === this.el;
};


/**
 * Get handle on textarea's parent element
 * @return HTMLElement
 */
TextAreaPrototype.parent = function(){
    return this.e.parentNode;
};


/**
 * Short cut to get/set textarea element property
 * @return string|TextArea
 */
TextAreaPrototype.attr = function( prop, value ){
    var elText = this.e;
    if( 1 === arguments.length ){
        return elText.getAttribute(prop);
    }
    if( null == value ){
        elText.removeAttribute(prop);
    }
    else {
        elText.setAttribute( prop, value );
    }
    return this;
};


/**
 * Check if this field is enabled for editing
 */
TextAreaPrototype.editable = function(){
    return !! this.l;
};



/**
 * Enable for editing
 * @return TextArea
 */
TextAreaPrototype.enable = function(){
    var proxy = this.p, elText = this.e;
    elText.removeAttribute('readonly');
    this.listen();
    // bind any current proxy editors
    if( proxy && proxy.enable ){
        proxy.enable( this.l );
    }
    return this;
};



/**
 * Disable for non-editable field behaviour
 * @return TextArea
 */
TextAreaPrototype.disable = function(){
    var proxy = this.p, elText = this.e;
    // stop textarea changes and events
    elText.setAttribute('readonly',true);
    this.unlisten();
    // proxy editors must be disabled or at least stop sending events to our listener
    if( proxy && proxy.disable ){
        proxy.disable();
    }
    return this;
};



/**
 * Start listening for changes
 * @return TextArea
 */
TextAreaPrototype.listen = function(){
    var listener = this.l;
    listener && listener.kill();
    this.l = createListener( this.e );
    return this;
};



/**
 * Stop listening for changes
 * @return TextArea
 */
TextAreaPrototype.unlisten = function(){
    var listener = this.l;
    if( listener ) {
        listener.kill();
        this.l = null;
    }
    return this;
};



/**
 * Enable/disable "Show invisibles"
 * @return TextArea
 */
TextAreaPrototype.setInvs = function( newBool, force ){
    var oldBool = this.i || false;
    if( force || oldBool !== newBool ){
        // Always destroy any existing mirroring
        if( this._i ){
            this._i.kill();
            delete this._i;
        }
        // If proxy/plugin enabled, it may have its own invisibles switch
        var proxy = this.p;
        if( proxy ){
            proxy.invs && proxy.invs( newBool );
        }
        // else enable custom mirroring to show invisibles without code view
        else if( newBool ){
            this._i = CommonJS.require("$46","mirror.js").init( this.e );
        }
        // new invisibles option set
        this.i = newBool;
    }
    return this;
};



/**
 * Get current "Show invisibles" setting
 */
TextAreaPrototype.getInvs = function(){
    return this.i || false;
};



/**
 * Switch rendering mode
 * @param String ( "" | "code" | "html" )
 * @return TextArea
 */
TextAreaPrototype.setMode = function( newMode ){
    var proxy = this.p,
        oldMode = this.m || '',
        invMode = this.i || false
    ;
    if( newMode !== oldMode ){
        // set new mode immediately to avoid async race conditions
        this.m = newMode;
        // destroy current mode if one is set
        if( proxy ){
            proxy.kill();
        }
        // enable new mode if applicable
        if( 'code' === newMode ){
            proxy = CommonJS.require("$15","ace.js").init( this.e, this.l, this['%'] );
        }
        else if( 'html' === newMode ){
            proxy = CommonJS.require("$47","mce.js").init( this.e, this.l );
        }
        else {
            proxy = null;
        }
        this.p = proxy;
        this.setInvs( invMode, true );
        // retain focus between editor modes
        if( currentFocus ){
            this.focus();
        }
        // mode switched ok (no current need for an event
        // $(this.e).trigger('editMode',[newMode,oldMode]);
    }
    return this;
};



/**
 * Switch "printf" syntax
 * @param string (php|java|objc|auto)
 */
TextAreaPrototype.setStrf = function( newMode ){
    this['%'] = newMode;
    if( 'code' === this.m ){
        this.p.strf( newMode );
    }
    return this;
};



/**
 * Give the textarea element a field name
 * @return TextArea
 */
TextAreaPrototype.name = function( name ){
    this.e.setAttribute( 'name', name );
    return this;
};


/**
 * @return TextArea
 */
TextAreaPrototype.placeholder = function( text ){
    this.e.setAttribute( 'placeholder', text );
    return this;
};


/**
 * Ping redraw, like if parent element has changed size
 */
TextAreaPrototype.redraw = function( /*event*/ ){
    var proxy = this.p;
    if( proxy && proxy.resize /*&& ! event*/ ){
        proxy.resize();
    }
};



TextAreaPrototype = null;





return exports;
}({},window,document) );

CommonJS.register("$44", function(exports,window,document){ /* module: js/ui/wgtable.js */
/**
 * Table for use inside wingrid cell.
 */

exports.create = function( wingrid ){
    return new WingridTable( wingrid );
};


/**
 * Error reporting
 */
function stderr( message ){
    var console = window.console;
    console && console.error && console.error( message );
};


function createDiv( className ){
    var el = document.createElement('div');
    className && el.setAttribute('class',className);
    return el;
}



/**
 * Create a redraw proxy closure
 */
function proxyRedraw( table ){
    // function returned will execute in the scope of the callee
    return function(){
        table.resize();
        return this;
    };
}




/**
 * Create mousedown closure for selecting table row
 */
function createMouseDownSelector( table ){
    return function( event ){
        // Click is hopefully from somewhere inside a cell that knows its row index.
        var target = event.target,
            index = target.$index
        ;
        // it's possible for row div to have sub-elements (note that document is a node, but not an element)
        // Warning: avoid using div elements, or drilling up will not work!
        while( null == index && 'DIV' !== target.nodeName && ( target = target.parentElement ) ){
            index = target.$index;
        }
        if( null != index ){
            // must prevent cell resizing while allowing text selection
            // event.preventDefault();
            event.stopImmediatePropagation();
            table.select(index);
        }
        return true;
    };
}

/*
function createPromotionHandler( table ){
    var style = table.root.style;
    table = null;
    return function(){
        style.backfaceVisibility = 'hidden';
        //style.willChange = 'transform';
        return true;
    };
};*/

/*
function createDemotionHandler( table ){
    var style = table.root.style;
    table = null;
    return function(){
        style.backfaceVisibility = '';
        //style.willChange = '';
        return true;
    };
};*/


function createScrollHandler( table ){
    return function(){
        if( table.redrawDirty() ){
            //console.debug('redraw dirty after scroll');
            table.redraw();
        }
        return true;
    };
}



/**
 * Create keydown closure for navigating through table rows
 */
function createKeyDownSelector( table ){
    return function( event ){
        var dir, key = event.keyCode;
        if( 40 === key ){
            dir = 1; // down
        }
        else if( 38 === key ){
            dir = -1; // up
        }
        else {
            return true;
        }
        // arrow pressed, but ignore if modifier key down (other commands might be in control)
        if( event.shiftKey || event.ctrlKey || event.metaKey || event.altKey ){
            return true;
        }
        // ok to try move to next row
        table.selectNext(dir);
        // cancel key press
        event.stopPropagation();
        event.preventDefault();
        return false;
    };
};



/**
 * Create sorting closure for table
 * @return Function
 */
function createTableSorter( table, columnIdx, descending ){
    // dummy getter should not be required, but safer to keep and debug as needed
    function missingCell(i){
        stderr('row['+i+'] disappeared');
        return {
            cellVal: function(){
                return '';
            }
        };
    }
    // return actual sorting callback
    return function( tosort ){
        var c = columnIdx || 0,
            d = descending ? -1 : 1,
            rows = table.rows||[],
            // Comparison closure holds original data and compares indexes
            // Use for sorting a list of offsets, like a pre-filter
            comp = function( i, j ){
                return d * ( rows[i]||missingCell(i) ).cellVal(c).localeCompare( ( rows[j]||missingCell(j) ).cellVal(c) );
            }
        ;
        tosort.sort( comp );
    };
}



/**
 * Object reference to table returned from wingrid.tabulate function
 */
function WingridTable( wingrid ){
    this.w = wingrid;
}


var WingridTablePrototype = WingridTable.prototype;


WingridTablePrototype.init = function( dataSource ){
    var wingrid = this.w,
        id = wingrid.id,
        children = wingrid.splity( id+'-thead', id+'-tbody' ),
        thead = children[0],
        tbody = children[1],
        rows = [],
        order = [],
        columnIds = [],
        columnNames = []
    ;
    
    // may be initializing a new data source
    if( dataSource ){
        this.ds = dataSource;
        // set original order of rows for sorting.
        this.idxs = order;
        // new data means filter may no longer be valid
        this._idxs = null;
    }
    // else if re-using data source we can keep filter and preserve current order
    else if( dataSource = this.ds ){
        // if currently sorted, we may lose the ability to sort on the same column later.
        // so if we hold any stashed data, we must sort it against original data so it's order is frozen if restored.
        // this._sort( this._idxs||[] );
    }
    // else client code screw up
    else {
        throw new Error('No datasource');
    }
   
    // mark type of cells as such
    thead.css.push('wg-thead');
    tbody.css.push('wg-tbody');
    
    // pull data column names from header iterator
    dataSource.eachCol( function( i, slug, heading ){
        columnIds[i] = id+'-col-'+slug;
        columnNames[i] = heading || slug;
    } );

    // split header window into faux <th> cells
    var tplDiv = createDiv(),
        colIndex = -1,
        numCols = columnIds.length,
        wgColsDiv = createDiv('wg-cols'),
        theadCells = thead.splitx.apply( thead, columnIds );

    // create body columns while setting column headers
    while( ++colIndex < numCols ){
        theadCells[colIndex].header( columnNames[colIndex] );
        wgColsDiv.appendChild( tplDiv.cloneNode(false) ).setAttribute('for', columnIds[colIndex] );
    }

    // Create all available rows from full data source
    dataSource.eachRow( function( index, colGetters, cssClass ){
        rows[index] = new WingridRow( index, colGetters, cssClass );
        order[index] = index; // <- start with identity mapping (no sort/no filter)
    } );
    
    // Remember some stuff
    this.rows = rows;
    this.cols = wgColsDiv;
    
    // Invalidate some lazy properties
    this.ww = null;

    // a root element is required for receiving events and focus 
    // TODO can we use the cell body or do we have to create a wrapper to avoid it getting killed?
    var eventRoot = tbody.body;
    this.root = eventRoot;
    this.head = thead;

    // Let header redraw sync body columns
    thead.redraw = proxyRedraw( this );

    // Collapse header 'row' and prevent resizing of head/body boundary
    var headerHeight = tbody.fixed = theadCells[0].bodyY() ||  20;
    wingrid.lock().resize( headerHeight, tbody );
    
    wingrid.css.push('is-table');
    wingrid.restyle();

    // if table has sorting context, it must be rebuilt as view will be sorted but look like it
    if( this.sc ){
        this._re_sort( numCols );
    }
    // else sort initial order if applicable
    else if( dataSource.sort ){
        dataSource.sort( order );
    }
    
    // table still has no cells rendered, let's go:
    this.redrawDirty();
    this.render();

    // enable interaction points on the focusable/scrollable wg-cols element
    $(eventRoot)
        .attr('tabindex','-1') // <- essential for focus to work so keys fire
        .on('keydown', createKeyDownSelector(this) )
        .on('mousedown', createMouseDownSelector(this) )
        //.on('mouseenter', createPromotionHandler(this) ) 
        //.on('mouseleave', createDemotionHandler(this) ) 
        .on('scroll', createScrollHandler(this) )
    ;

    return this;    
};



/**
 * Empty and detach all columns from DOM for rebuild.
 * Note that this destroys DOM for redraw, but does not affect data 
 * @return WingridTable 
 */
WingridTablePrototype.clear = function(){
    // iteration is required to remove visible page reference in all rows
    var pages = this.pages || [],
        p = pages.length
    ;
    while( 0 !== p-- ){
        pages[p].destroy();
    }
    this.pages = [];
    this.vh = null;
    this.mn = null;
    this.mx = null;
    this.sy = null;
    // forcing a repaint now (by reading property) ensures new list starts at top. (wondering if this is desired)
    void this.root.scrollTop;
    return this;
};



/**
 * Render table according to current filter
 * Be sure to call this.clear() before calling this
 * @return WingridTable 
 */
WingridTablePrototype.render = function(){
    var row,
        page,
        pages = [],
        rowsPerPage = 100,
        pageHeight = rowsPerPage * 22,
        rows = this.rows || [],
        //
        offset = -1, // <- visual order
        index,       // <- original data index
        //
        order = this.idxs,
        length = order.length,
        reverseMap = ( this.idxr = {} ),
        //
        currentIndex = this.r,
        stashedIndex = this._r,
        // elements
        pageDiv,
        rootDiv = this.root,
        pageDivTemplate = this.cols
    ;
    
    while( ++offset < length ){
        // create new page if needed
        if( 0 === offset % rowsPerPage ){
            pageDiv = pageDivTemplate.cloneNode(true);
            page = new WingridRowsPage( pageDiv );
            page.h = pageHeight;
            page.insert( rootDiv );
            pages.push( page );
        }
        // get original index of and set reverse lookup so we can get position from original data
        index = order[ offset ];
        reverseMap[ index ] = offset;
        // push unrendered row into page
        row = rows[ index ];
        if( null == row ){
            throw new Error('Render error, no data at ['+index+']');
        }
        row.page = page;
        page.rows.push( row );
    }
    
    // shorten last page if it's not full
    if( page && page.size() !== rowsPerPage ){
        page.sleepH( 22 );
    }
    
    // Do initial paint
    this.pages = pages;
    this.mn = null;
    this.mx = null;
    this.redrawDirty();
    this.redraw();
    
    
    // re-instate stashed index if it has become available and (no other selection is active)
    // note that current and stashed indexes refer to original data index, as without a physical row they can have no visual row index
    if( null == currentIndex ){
        if( null != stashedIndex ){
            row = rows[ stashedIndex ];
            if( row && row.page ){
                delete this._r; // <- unstash
                this.select( stashedIndex, true );
            }
        }
    }
    else {
        row = rows[ currentIndex ];
        // keep selected row in view after render
        if( row && row.page ) {
            this.select( currentIndex, true );
        }
        // deselect current row if it got filtered out
        else {
            this.deselect();
            this._r = currentIndex; // <- stash
        }
    }
    return this;
};



/**
 * Redraw on size change (invoked from our wingrid cell change)
 * also does row redraw in case size change caused visibilty change
 */
WingridTablePrototype.resize = function(){
    var i = -1,
        widths = this.ww || ( this.ww = [] ),
        wingrid = this.w,
        thead = wingrid.cells[0],
        headerDivs = thead.body.childNodes,
        numCols = headerDivs.length,
        pages = this.pages || [],
        npages = pages.length
    ;
    // original redraw function can be accessed via main window prototype
    wingrid.redraw.call( thead );
    // get required column widths from header cell
    while( ++i < numCols ){
        widths[i] = headerDivs[i].style.width;
    }
    // no point doing anything else if we have no pages.
    if( ! npages ){
        return;
    }
    // always set new widths on all visible rows
    var first = this.mn, last = this.mx;
    //console.log('applying widths for ('+first+'..'+last+') -> ['+widths.join(',')+']');
    for( i = first; i <= last; i++ ){
        pages[i].widths( widths );
    }
    if( this.redrawDirty() ){
        //console.debug('redraw dirty after resize');
        this.redraw();
    }
};



/**
 * Establish whether dimensions have changed that would require redraw
 */
WingridTablePrototype.redrawDirty = function(){
    var changed = false,
        eventRoot = this.root,
        scrollY = eventRoot.scrollTop,
        viewHeight = eventRoot.clientHeight
    ;
    if( this.sy !== scrollY ){
        changed = true;
        this.sy = scrollY;
    }
    if( this.vh !== viewHeight ){
        changed = true;
        this.vh = viewHeight;
    }
    /*if( ! this.ww ){
        throw new Error('No widths set :(');    
    }*/
    return changed;
};



/**
 * Paint visible rows according to current viewport
 */
WingridTablePrototype.redraw = function(){
    var y = 0,
        i = -1,
        first = null,
        last = null,
        widths = this.ww,
        scrollY = this.sy,
        viewHeight = this.vh,
        minVisible = this.mn,
        maxVisible = this.mx,
        minY = Math.max( 0, scrollY - 100 ),
        maxY = viewHeight + scrollY + 100,
        page,
        pages = this.pages || [],
        npages = pages.length
    ;
    // render all rows in current range and establish new end points for sleeping
    while( ++i < npages ){
        if( y > maxY ){
            //console.log(' ['+i+'] is below range. '+y+' > '+maxY);
            break;
        }
        page = pages[i];
        y += page.height();
        if( y < minY ){
            //console.log(' ['+i+'] is above range, '+y+' < '+minY );
            continue;
        }
        if( null === first ){
            //console.log(' ['+i+'] is FIRST in range');
            first = i;
        }
        last = i;
        page.rendered || page.render(widths);
    }
    // unrender anything above, when scrolling down
    if( minVisible !== first ){
        if( null === minVisible ){
            //
        }
        else if( first > minVisible ){
            for( i = minVisible; i < first; i++ ){
                page = pages[i];
                if( ! page ){
                    throw new Error('Shit!');
                }
                page.rendered && page.sleep();
            }
        }
        this.mn = first;
    }
    // unrender anything below when scrolling up
    if( maxVisible !== last ){
        if( null === maxVisible ){
            //
        }
        else if( last < maxVisible ){
            for( i = maxVisible; i > last; i-- ){
                page = pages[i];
                page.rendered && page.sleep();
            }
        }
        this.mx = last;
    }
};


/**
 * Current selected row index
 * @return number
 */
WingridTablePrototype.selected = function(){
    return this.r;
};





/**
 * Get reference to table header WinGrid cell
 * @return WinGrid
 */
WingridTablePrototype.thead = function(){
    return this.w.cells[0];
};



/**
 * Get reference to table body WinGrid cell
 * @return WinGrid
 */
WingridTablePrototype.tbody = function(){
    return this.w.cells[1];
};


/**
 * Get array of cell div nodes
 * @return HTMLElement[]
 */
WingridTablePrototype.tr = function( index ){
    var row = this.row(index);
    if( row ){
        return row.cells();
    }
    return [];
};


/**
 * Get single WingridRow objects
 * @return WingridRow
 */
WingridTablePrototype.row = function( index ){
    return this.rows[ index ];
};


/**
 * Get single wg-td div
 * @return HTMLDivElement
 */
WingridTablePrototype.td = function( index, colIndex ){
    return this.tr(index)[ colIndex ];
};



/**
 * Establish next selectable row from current.
 * @param int 1 or -1
 * @param bool whether to wrap iteration at either end
 * @param int optional data index to start at, defaults to current, or [0] if there is no current
 * @return int data index to be selected
 */
WingridTablePrototype.next = function( direction, wrap, index ){
    if( null == index ){
        index = this.r || 0;
    }
    var order = this.idxs,
        numRows = order.length,
        // iteration must be done on visual row offsets meaning table must be rendered
        reverseMap = this.idxr || {},
        offset = reverseMap[ index ],
        ostart = offset
    ;
    
    // outer loop increments offset until matched, broken or wrapped to start
    while( ostart !== ( offset += direction ) ){
        if( offset >= 0 && numRows > offset ){
            // row should exist when in range as order should only contain rendered rows
            break;
        }
        // row out of range, attempt one wrap only
        if( wrap && numRows ){
            offset = ( 1 === direction ? -1 : numRows );
            wrap = false;
            continue;
        }
        // nope, I give up
        return null;
    }

    index = order[ offset ];
    // sanity check when debugging:
    if( null == index || null == this.rows[index] ){
        stderr('Bad next: ['+offset+'] does not map to data row');
        return null;
    }

    return index;
};



/**
 * Actually select next selectable row
 */
WingridTablePrototype.selectNext = function( direction, wrap, noFocus ){
    var index = this.next( direction, wrap );
    if( null == index ){
        // must be some kind of error
    }
    else if( this.r === index ){
        // somehow the same as current row selection
    }
    else {
        this.select( index, noFocus );
    }
    return this;
};



/**
 * Deselect currently selected row
 * @param bool whether ui is deselecting before selecting another
 */
WingridTablePrototype.deselect = function( willSelect ){
    var index = this.r;
    if( null != index ){
        this.r = null;
        $( this.tr(index) ).removeClass('selected');
        this.w.fire( 'wgRowDeselect', [ index, willSelect ] );
    }
    return this;
};


/**
 * Select by phsically rendered row offset.
 * Most common use would be just selecting first in the list. Most internal functions use data index
 */
WingridTablePrototype.selectRow = function( rowOffset, noFocus ){
    return this.select( this.idxs[rowOffset] );
};


/**
 * Select by data row (not physically displayed row index)
 * @param int original data index pointing to row data
 * @param bool whether to avoid re-focusing after selection 
 * @return WingridTable
 */
WingridTablePrototype.select = function( index, noFocus ){
    var row = this.rows[ index ],
        page = row && row.page
    ;
    // can't select filtered-out row, can we?
    if( ! page ){
        this.deselect( false );
        stderr('Row is filtered out');
        return this;
    }
    // deselect current row if one is selected
    this.deselect( true );
    // ok to select row
    var y,
        rowCells,
        wingrid = this.w,
        tbodyWin = wingrid.cells[1];

    // if whole block is sleeping, jump roughly to position    
    if( ! page.rendered ){
        y = page.top();
        tbodyWin.scrollY( y );
        if( this.redrawDirty() ){
            this.redraw();
        }
    }
    // errors!
    if( ! row.rendered ){
        page.rendered || stderr('Failed to render page');
        stderr('Row ['+row.i+'] not rendered');
        return this;
    }

    // visually mark as selected and set current index
    rowCells = row.cells();
    $(rowCells).addClass('selected');
    this.r = index;

    // keep focus (for keyboard events)
    if( ! noFocus ){
        y = tbodyWin.scrollY();
        $(this.root).focus();
        // fix weird IE bug where focus on outer element loses scroll on inner element 
        if( y !== tbodyWin.scrollY() ){
            tbodyWin.scrollY( y );
        }
    }
    
    // move window scroll without animation so row is in view.
    tbodyWin.scrollTo( rowCells[0], true );
    
    this.w.fire( 'wgRowSelect', [ index, row.data() ] );
    return this;
};


/*
 * Promote scrollable layer for performance. Note this makes removal from DOM more expensive!
 *
WingridTablePrototype.promote = function(){
    this.p.style.backfaceVisibility = 'hidden';
    return this;
};*/



/*
 * Unpromote scrollable layer to avoid overhead associated with removal
 *
WingridTablePrototype.demote = function(){
    this.p.style.backfaceVisibility = '';
    return this;
};*/



/**
 * Show all rows and unset filtered state
 */
WingridTablePrototype.unfilter = function(){
    // restore stashed original list
    if( this._idxs ){
        // must resort list as sorting may have changed since stashed
        this.idxs = this._sort( this._idxs );
        this._idxs = null;
        this.clear().render();
    }
    return this;
};



/**
 * Apply a new set of filtered in row indexes
 */
WingridTablePrototype.filter = function( rowOffsets ){
    // stash unfiltered list if not exists
    if( ! this._idxs ){
        this._idxs = this.idxs;
    }
    // set new sorted list of original data offsets
    this.idxs = this._sort(rowOffsets);
    return this.clear().render();
};


/**
 * Apply a function to every renderable row, in order
 * @return WingridTable
 */
WingridTablePrototype.each = function( callback ){
    var index,
        offset = -1,
        rows = this.rows || [],
        order = this.idxs || [],
        length = order.length
    ;
    while( ++offset < length ){
        index = order[ offset ];
        // apply function with row and indexes
        callback( rows[index], offset, index );
    }
    return this;
};



/**
 * Make a given column sortable.
 * Currently only sortable by simple text comparison
 * @return WingridTable
 */
WingridTablePrototype.sortable = function( columnIdx ){
    var context = this.sc || ( this.sc = new WingridTableSortingContext(this) );
    context.has(columnIdx) || context.add(columnIdx);
    return this;
};



/**
 * @internal
 * Rebuilds sortable state between header cell destructions
 * Note that columns may have changed since last render, so we pass length
 * @return WingridTable
 */
WingridTablePrototype._re_sort = function( length ){
    var columnIdx = -1,
        context = this.sc,
        active = context.active;
    // existing context must be destroyed to re-bind header cells
    context = new WingridTableSortingContext(this);
    this.sc = context;
    // re-bind all sortable columns
    while( ++columnIdx < length ){
        context.add( columnIdx );
    }
    // render active state if there is one and can be mapped to current columns
    if( active ){
        columnIdx = this.head.indexOf(active.id);
        // sorter no longer valid if column missing.
        // sorting on closest column will cause sorting jump, but preferable to being unable to persist sorting in a column that doesn't exist
        if( -1 === columnIdx ){
            columnIdx = Math.min( active.idx, length-1 );
        }
        this.sort( columnIdx, active.desc );
    }
    return this;
};



/**
 * @internal
 * Pre-sort current indexes if a sort function exists.
 * Sort function is kept in memory for when filtered lists are swapped out. 
 * @return Array the object passed
 */
WingridTablePrototype._sort = function( order, doSort ){
    // set new sorter if passed
    if( doSort ){
        this.s = doSort;
        doSort( order );
    }
    // else use current of there is one
    else if( doSort = this.s ){
        doSort( order );
    }
    return order;
};


/**
 * Create sorter, sort current indexes
 * Remember to call clear().render() afterwards
 * @return WingridTable
 */
WingridTablePrototype.sort = function( columnIdx, descending ){
    // pass a new sorter to the pre-sort function
    this._sort( this.idxs, createTableSorter( this, columnIdx, descending ) );
    // set visual state of header cells via context
    this.sc.activate( columnIdx, descending );
    return this;
};




WingridTablePrototype = null;




/**
 * For maintaining table-wide sorting state
 * Note that currently sorting is not compound, only one column is sorted at a time
 */
function WingridTableSortingContext( table ){
    this.t = table;
    this.length = 0;
}

var WingridTableSortingContextPrototype = WingridTableSortingContext.prototype;

/**
 * Check if column made sortable yet
 * @return bool
 */
WingridTableSortingContextPrototype.has = function( columnIdx ){
    return null != this[ columnIdx ];
};

/**
 * Add given column to list of sortables and enable clickableness
 * @return WingridTableSortingContext
 */
WingridTableSortingContextPrototype.add = function( columnIdx ){
    var self = this, 
        cell = self.t.head.cells[columnIdx]
    ;
    self[ columnIdx ] = { desc: null, idx: columnIdx, id: cell.id };
    self.length ++;
    cell
        .addClass('wg-sortable')
        // apply click action only on <header> element
        .on('click', function(event){
            if( 'header' === event.target.nodeName.toLowerCase() ){
                event.stopImmediatePropagation();
                self.toggle( columnIdx );
                return false;
            }
        } )
    ;
    return self;
};


/**
 * Activate sorting on a given column, reversing its direction at the same time
 * @return WingridTableSortingContext
 */
WingridTableSortingContextPrototype.toggle = function( columnIdx ){
    var state = this[columnIdx],
        descending = ! state.desc;
    // execute sort and re-render on table
    this.t.sort( columnIdx, descending ).clear().render();
    return this;
};


/**
 * Set visual state of a given column
 * @return WingridTableSortingContext
 */
WingridTableSortingContextPrototype.activate = function( columnIdx, descending ){
    var css,
        cell,
        active = this.active,
        state = this[columnIdx],
        cells = this.t.head.cells
    ;
    // toggle off previously active sorting column
    if( active && ( cell = cells[active.idx] ) ){
        cell.removeClass( active.css );
        if( active !== state ){
            cell.restyle();
        }
    }
    // set as current sorting column
    if( cell = cells[columnIdx] ){
        state.desc = descending;
        this.active = state;
        // enable CSS on current item
        css = 'wg-'+( descending ? 'desc' : 'asc' );
        cell.addClass( css ).restyle();
        // remember css for disablement later
        state.css = css;
        // fire sorting event so editors can remember setting between views
        // cell.fire('wgSorted', [ columnIdx, descending ] );
    }
    // else some error like switching between tables of different widths
    else {
        this.active = null;
    }
    return this;
};


WingridTableSortingContextPrototype = null;




/**
 * Object representing a single row of cells.
 * Each cell is a separate div inside a pseudo "column" div
 */
function WingridRow( index, colGetters, cssClass ){
    var template = document.createElement('div');
    template.className = cssClass || '';
    //
    this._ = template;
    this.d = colGetters || [];
    this.i = index || 0; // <- original data index for row object
    this.length = colGetters.length;
}

var WingridRowPrototype = WingridRow.prototype;


/**
 * Render cells visibly with actual data
 */
WingridRowPrototype.render = function( columns ){
    var div,
        divs = [],
        template = this._,
        colIndex = this.length
    ;
    // if we have a template, this is our first time
    if( template ){
        this.c = divs;
        while( 0 !== colIndex-- ){
            div = template.cloneNode(false);
            divs[colIndex] = this.update( colIndex, div );
            // make data index available to html element so event closures can operate without this object
            div.$index = this.i;
            columns[colIndex].appendChild(div);
        }
        this._ = null;
    }
    // else we can re-insert our saved elements. this is essential for not destroying visual changes during edits
    else {
        divs = this.c;
        while( 0 !== colIndex-- ){
            columns[colIndex].appendChild( divs[colIndex] );
        }
    }
    this.rendered = true;
    return this;
};


/**
 * Update contents of given column from its value getter
 */
WingridRowPrototype.update = function( colIndex, cleanDiv ){
    var div = cleanDiv || this.c[colIndex] || {},
        getter = this.d[colIndex] || function(){},
        nodeOrValue = getter() || '\xA0'
    ;
    // set literal text when string
    if( null == nodeOrValue.innerHTML ) {
        div.textContent = nodeOrValue;
    }
    // else set as rendered HTML. (note that outer element will be discarded)
    else {
        div.innerHTML = nodeOrValue.innerHTML;
    }
    return div;
};


/**
 * Get array of cell divs.
 * (if row is not rendered this will return the template div only)
 * @return HTMLElement
 */
WingridRowPrototype.cells = function(){
    return this.c || [ this._ ];
};

/**
 * Get our row data as array of strings
 * @return array
 */
WingridRowPrototype.data = function(){
    var c = -1,
        vals = [],
        numcols = this.length
    ;
    while( ++c < numcols ){
        vals[c] = this.cellVal(c);
    }
    return vals;
};


WingridRowPrototype.destroy = function(){
    this.page = null;
    this.rendered = false;
};

/**
 * Get data value of a given cell
 */
WingridRowPrototype.cellVal = function( columnIdx ){
    var value = this.d[ columnIdx ]() || '';
    return String( value.textContent || value );
};

WingridRowPrototype = null;







/**
 * Object representing a "page" of rows
 * @param HTMLDivElement wg-cols wrapping div holding multiple pseudo columns
 */
function WingridRowsPage( wgColsDiv ){
    this.live = wgColsDiv;
    this.rows = [];
}


var WingridRowsPagePrototype = WingridRowsPage.prototype;


/**
 * Get number of rows in page
 */
WingridRowsPagePrototype.size = function(){
    return this.rows.length;
};


/**
 * insert placeholder into DOM
 * @return HTMLDivElement placeholder div
 */
WingridRowsPagePrototype.insert = function( parent ){
    var h = this.h, // <- should have been set when constructed
        div = createDiv('wg-dead')
    ;
    div.style.height = String(h)+'px';
    // div.setAttribute('data-debug','unseen');
    parent.appendChild( div );
    this.dead = div;
    return div;
};


/**
 * Get top position of page inside scrolling area
 * @return Number
 */
WingridRowsPagePrototype.top = function(){
    var el = this.rendered ? this.live : this.dead;
    return el.offsetTop;
};


/**
 * Get/set physical height of page, assuming in DOM
 */
WingridRowsPagePrototype.height = function(){
    var h = this.h;
    if( null == h ){
        // taking height from first column due to floating elements giving wrapper no physical height
        if( this.rendered ){
            h = this.live.firstChild.offsetHeight;
        }
        // else sleeping page should have fixed height
        else {
            h = this.dead.offsetHight;
        }
        // bad CSS may prevent container having a height
        /*/ if scrolling is weird or pages aren't rendered, check this:
        if( 0 === h ){
            console.error('offsetHight is zero, check CSS');
        }*/
        this.h = h;
    }
    h || stderr('row has zero height');
    return h;
};


/**
 * Wake page up so it can be visible in viewport
 */
WingridRowsPagePrototype.render = function( widths ){
    var row,
        i = -1,
        rows = this.rows,
        length = rows.length,
        deadDiv = this.dead,
        liveDiv = this.live,
        columns = liveDiv.childNodes
    ;
    // Rows may require lazy rendering of their inner contents
    // they may also have been detached from DOM when page was cleared previously
    while( ++i < length ){
        row = rows[i];
        row.rendered || row.render( columns );
    }
    // set widths too
    length = widths.length;
    for( i = 0; i < length; i++ ){
        columns[i].style.width = widths[i];
    }
    // swap placeholder with populated rows
    deadDiv.parentNode.replaceChild( liveDiv, deadDiv );
    this.rendered = true;
    this.h = null;
    return this;
};


/**
 * 
 */
WingridRowsPagePrototype.sleep = function(){
    var h = this.height(),
        liveDiv = this.live,
        deadDiv = this.dead
    ;
    deadDiv.style.height = String(h)+'px';
    // deadDiv.setAttribute('data-debug','sleeping');
    //
    liveDiv.parentNode.replaceChild( deadDiv, liveDiv );
    this.rendered = false;
    this.h = h;
    return this;
};


/**
 * Set a new sleeping height 
 */
WingridRowsPagePrototype.sleepH = function( itemHeight ){
    var h = this.rows.length * itemHeight,
        div = this.dead
    ;
    if( div ){
        div.style.height = String(h)+'px';
    }
    if( ! this.rendered ){
        this.h = h;
    }
    return this;
};


/**
 * Apply columns widths (already obtained as string px)
 */
WingridRowsPagePrototype.widths = function( widths ){
    var columns = this.live.childNodes, i = widths.length;
    while( 0 !== i-- ){
        columns[i].style.width = widths[i];
    }
    return this;
};


/**
 * Page destructor.
 */
WingridRowsPagePrototype.destroy = function(){
    var div = this.rendered ? this.live : this.dead,
        rows = this.rows, 
        i = rows.length
    ;
    // if we don't remove gracefully from the dom, IE won't be able to re-used our nodes
    div.parentNode.removeChild( div );
    // rows also need telling they're not rendered anymore
    while( 0 !== i-- ){
        rows[i].destroy();
    }
    
};



WingridRowsPagePrototype = null;


return exports;
}({},window,document) );

CommonJS.register("$37", function(exports,window,document){ /* module: js/ui/wingrid.js */
/**
 * WinGrid - a grid of windows
 */


// libs
var html = CommonJS.include("$41","html.js") || CommonJS.include("$2","html.js",true),
    dom = CommonJS.require("$20","dom.js"),
    elementTop = dom.top,
    elementLeft = dom.left,

    // Pseudo constants
    SPLIT_X = 1,
    SPLIT_Y = 2,

    // global registry of windows
    windows = {},
    
    // singleton of the editable item currently focused - there can be only one!
    currentEditable,
    
    // global dragging state
    dragger = false;



/**
 * Create a new top-level window from a root HTML Element
 * @return Win
 */
exports.init = function( el ){
    var window = new Win( el );
    window.redraw();
    // intercept events for dragging borders
    CommonJS.require("$42","touch.js").ok( function( touch ){
        touch.dragger( el, onTouchEvent );
    } );
    // always add mousedown, we'll just ignore if touched
    $(el).mousedown( onMouseDown );
    return window;
};



/**
 * utility ensures identifiers are globally unique
 */
function uniqueId( id ){
    var baseId = id,
        i = 1;
    while( windows[id] ){
        id = baseId+'-'+(++i);
    }
    return id;
}



/**
 * Utility creates a closure for scoped event callbacks
 *
function eventClosure( callback, scope ){
    var args = [].slice.call( arguments, 2 );
    return function( event ){
        return callback.apply( scope, [event].concat(args) );
    };
}*/



/**
 * Dragging closure for resizing cells
 * @param {HTMLElement} el Target element
 * @return {Object} props Assigned to dragger variable
 */
function initDragger( el, props ){
    var id = el.id,
        child = id && windows[ id ],
        parent = child && child.parent();
    if( ! child || ! parent ){
        // console.error( id+' has no parent cell, pid='+this.pid); // <- ensure root div has an ID!
        return null;
    }
    // child pressed, control dragging and move via parent
    var horizontal   = parent.dir === SPLIT_X,
        XY           = horizontal ? 'X' : 'Y',
        pagePosProp  = 'page'+XY,
        offsetFunc   = horizontal ? elementLeft : elementTop,
        // calculate relative position inside parent cell for child resize
        globalOffset = offsetFunc( parent.el ),
        // account for position within the child where interaction started
        localOffset  = props[ 'offset'+XY],
        // remember original CSS class of active element
        movingElement = parent.el,
        originalCSS = movingElement.className;
    if( null == localOffset ){
        localOffset = props[pagePosProp] - offsetFunc( el );
    }
    if( localOffset ){
        globalOffset += localOffset;
    }
    // add a css hook for performance tweaks during drag
    movingElement.className = originalCSS + ' is-resizing';
    // expose dragging closure to client code
    return {
        done: function() {
            // fire resize event so client code can save window distributions
            // parent.fire( 'wgResized', [ parent.id, parent.distribution() ] );
            // remove state class when finished
            movingElement.className = originalCSS;
        },
        // move handler: calculate position relative to parent cell to control proportions
        move: function( props ){
            parent.resize( props[pagePosProp] - globalOffset, child );
            return true;
        }
    };
}





/**
 * Callback when mouse pressed inside grid
 */
function onMouseDown( event, touch ){
    if( dragger ){
        // probably using touch
        return true;
    }
    dragger = initDragger( event.target, event );
    if( ! dragger ){
        // probably an internal click action
        return true;
    }
    // stop dragging on mouse up
    function onMouseUp(){
        $(document).off( 'mousemove', onMouseMove );
        if( dragger ){
            dragger.done();
            dragger = null;
        }
        return true;
    }
    // drag while mouse is pressed
    function onMouseMove( event ){
        dragger ? dragger.move(event) : onMouseUp();
        return true;
    }
    $(document).one('mouseup', onMouseUp ).on( 'mousemove', onMouseMove );
    return killEvent(event);
}





/**
 * Callback on any touch event
 */
function onTouchEvent( event, touch ){
    var type = touch.type;
    // query our own abstracted touch.type property
    if( 'touchmove' === type ){
        dragger && dragger.move( touch );
        return;
    }
    if( 'touchstart' === type ){
        dragger = initDragger( event.target, touch );
        return;
    }
    if( 'touchend' === type ){
        if( dragger ){
            dragger.done();
            dragger = null;
        }
    }
}



function killEvent( event ){
    event.stopPropagation();
    event.preventDefault();
    return false;
}



/**
 * Utility abstracts %age attribute assignment
 */
function setDimensionAttribute( el, dimension, ratio, total ){
    if( total ){
        el.style[dimension] = String( Math.round( ratio * total ) )+'px';
    }
    else {
        // @todo should we be rounding %ages too?
        el.style[dimension] = String( 100 * ratio )+'%';
    }
}


/**
 * Handler for focus changing between cells
 * Generally (when triggered by blur/focus events) will be from a cell to nothing, then nothing to a cell. 
 */
function changeEditableFocus( nowFocused ){
    var wasFocused = currentEditable;
    wasFocused && wasFocused.redraw();
    nowFocused && nowFocused.redraw();
    currentEditable = nowFocused;
    return nowFocused;
}


/**
 * Closure for tracking the one editable form control with focus
 */
function trackTextareaFocus( editingCell, elText ){
    var $target = $(elText)
        .on('editFocus', function(){
            $target.trigger('wgFocus', [ changeEditableFocus(editingCell) ] );
        } )
        .on('editBlur', function(){
            $target.trigger('wgBlur', [ changeEditableFocus(null) ] );
        })
    ;
}


/**
 * Object representing a splittable window, which may or may not have child windows (cells)
 */
function Win( el ){
    var id = el.id,
        cn = el.className
    ;
    this.id = id;
    this.el = el;
    this.index = 0;
    this.pos = 0;
    this.css = [ cn||'wg-root', 'wg-cell' ];
    this._cn = cn;
    windows[id] = this;
    this.clear();
}


var WinPrototype = Win.prototype;




/**
 * Fire an event from this window.
 * TODO could also call directly on an array of attached listeners - reduce overhead of jQuery event handler!
 */
WinPrototype.fire = function( type, args ){
    /*function trigger( target, type, args  ){
        $(target).trigger( type, args );
    }
    setTimeout( trigger, 50, this.el, type, args );*/
    var event = $.Event( type );
    event.cell = this;
    $(this.el).trigger( event, args );
    return this;
};



/**
 * iterate over split cells
 */
WinPrototype.each = function( callback ){
    var i = -1, cells = this.cells, numCells = cells.length;
    while( ++i < numCells ){
        callback( cells[i], i );
    }
    return this;
};


/**
 * Get offset of given cell
 * TODO could simply maintain an index of this and save some code
 */
WinPrototype.indexOf = function( cell_or_id ){
    var cellId = cell_or_id.id || String(cell_or_id),
        child = windows[cellId]
    ;
    if( child && child.pid === this.id ){
        return child.index;
    }
    return -1;
};


/**
 * Bind to individual event in this cell
 */
WinPrototype.on = function(){
    return this.$('on', arguments);
};

/**
 * Unbind all events, or an individual event from this cell
 */
WinPrototype.off = function(){
    return this.$('off', arguments);
};

/**
 * Find any element under this cell
 */
WinPrototype.find = function( selector ){
    return $(this.el).find( selector );
};


/**
 * call any jquery function on this window's element
 */
WinPrototype.$ = function( func, args ){
    $.fn[func].apply( $(this.el), args );
    return this;
};


/**
 * Push a class name onto this cell's CSS.
 * @return Win
 */
WinPrototype.addClass = function( cssClass ){
    // TODO handle uniqeuness of added classes
    this.css.push( cssClass );
    // remember to call restyle afterwards
    return this;
};


/**
 * Splice a class name from this cell's CSS
 * @return Win
 */
WinPrototype.removeClass = function( cssClass ){
    var i = this.css.indexOf(cssClass);
    if( -1 !== i ){
        this.css.splice( i, 1 );
    }
    // remember to call restyle afterwards
    return this;
};


/**
 * 
 */
WinPrototype.parent = function(){
    return this.pid && windows[ this.pid ];
};


/**
 * Split along X axis, meaning a left/right "vertical" split. 
 */
WinPrototype.splitx = function(){
    return this._split( SPLIT_X, arguments );
};


/**
 * Split along Y axis, meaning a top/bottom "horizontal" split. 
 */
WinPrototype.splity = function(){
    return this._split( SPLIT_Y, arguments );
};


/**
 * Split in either direction after first setting direction
 * @return Array child cells created
 */
WinPrototype._split = function( dir, ids ){
    // cannot split until empty
    if( this.length || this.field ){
        this.clear();
    }
    var i = -1, id, div, child,
        num = ids.length,
        inc = 1 /  num,
        pos = 0;
    // append child cells        
    while( ++i < num ){
        div = dom.el();
        this.body.appendChild( div );
        id = div.id = uniqueId( ids[i] );
        child = new Win( div );
        child.index = i;
        child.pid = this.id;
        child._locale( this.lang, this.rtl );
        // set default position along axis for new child
        child.pos = pos;
        pos += inc;
        this.cells.push( child );
        this.length++;
    }
    this.dir = dir;
    this.redraw();
    return this.cells;
};


/**
 * Completely destroy current cell
 */
WinPrototype.destroy = function(){
    this.clear();
    delete windows[this.id];
    var rootDiv = this.el;
    rootDiv.innerHTML = '';
    this.body = null; // <- because clear created a new one and we just killed it.
    rootDiv.className = this._cn||'';
    $(rootDiv).off();
    return this;
};


/**
 * Test if window instance actually exists in grid
 */
WinPrototype.exists = function(){
    // TODO is this enough - is it possible to check real DOM existance?
    return this === windows[this.id];
};


/**
 * Empty out cell body, but not header.
 * This will also completely destroy (not just clear) child cells as they cannot exist without a parent.
 */
WinPrototype.clear = function(){
    var elem = this.el,
        cells = this.cells,
        field = this.field,
        body = this.body,
        nav = this.nav,
        i = this.length||0
    ;
    // clear children first
    while( 0 !== i-- ){
        delete windows[ cells[i].destroy().id ];
    }
    // empty vars
    this.cells = [];
    this.length = 0;
    // destroy navigation of subtabs
    if( nav ){
        elem.removeChild(nav);
        this.nav = null;
    }
    if( body ){
        // IE bug: blur event won't fire when removed. 
        // TODO, mutation events attached in textarea classes instead??
        // TODO check this bug with new textarea abstraction
        if( field ){
            html.ie() && $(body).triggerHandler('blur');
            field.destroy();
            this.field = null;
        }
        if( this.table ){
            // TODO unload table? 
            this.table = null;
        }
        // IE11 throws a NotFoundError if body is nno longer in DOM
        if( elem === body.parentNode ){
            elem.removeChild(body);
        }
    }
    this.body = elem.appendChild( dom.el('','wg-body') );
    this._h = null; // <- invalidates cached height to ensure redraw
    return this;
};


/**
 * Resize child columns from a given point
 */
WinPrototype.resize = function( px, child ){
    // child is the cell for whose left or top border the position represents
    // by default it will be the second cell. the first cell is not resizable
    if( ! child ){
        child = this.cells[1];
        if( ! child ){
            return;
        }
    }
    var idx  = child.index,
        cells = this.cells,
        size = $(this.el)[ this.dir === SPLIT_X ? 'width' : 'height' ](),
        nextChild = cells[ idx+1 ],
        prevChild = cells[ idx-1 ];
        // don't collapse completely, or we'll lose the grabbers and title
        pad = ( child.body || child.el.firstChild ).offsetTop || 0;
        // maximum value for the offset is the available space, or the space before the next child
        max = ( nextChild ? nextChild.pos * size : size ) - pad,
        // minimum value is either zero, or the available space before the previous child
        min = prevChild ? prevChild.pos * size : 0,
    // calculate position 0 - 1 of child reference
    child.pos = Math.min( max, Math.max( min, px ) ) / size;
    // redraw parent if this cell is a table header needing to sync its widths to the rest of the table
    // TODO would save bigger redraw if table window handled mirroring rather than drilling up to what is probably the root cell.
    /*if( parent && parent.table ){
        parent.redraw();
    }
    // else just redraw self
    else {
        this.redraw();
    }*/
    this.redraw();
    return this;
};


/**
 * Position child columns to pre-calculated relative positions (starting at second child)
 * Number of arguments should be number of boundaries (i.e. one less than number of cells)
 * e.g. to split in two [0.5] to split in three [0.33,0.67]
 */
WinPrototype.distribute = function( ratios ){
    var b = -1, c = 0, cell, cells = this.cells, numBoundaries = ratios.length;
    while( ++b < numBoundaries && ( cell = cells[++c] ) ){
        cell.pos = Math.max( 0, Math.min( 1, ratios[b] ) );
    }
    this.redraw();
    return this;
};



/**
 * Get cell distribution for use with distribute
 * @return Array for use with this.distribute.(ratios)
 */
WinPrototype.distribution = function(){
    var ratios = [], i = 0, cells = this.cells, numBoundaries = cells.length - 1;
    while( i < numBoundaries ){
        ratios[i] = cells[++i].pos;
    }
    return ratios;
};



/**
 * Recalculate full CSS classes of this cell only.
 * TODO is array join faster than string concat, or not?
 */
WinPrototype.restyle = function(){
    var css = this.css.concat();
    if( this.index === 0 ){
        css.push('first');
    }
    else {
        css.push('not-first');
    }
    if( this.dir ){
        css.push('wg-split');
        if( SPLIT_Y === this.dir ){
            css.push('wg-split-y');
        }
        else {
            css.push('wg-split-x');            
        }
    }
    if( this.t ){
        css.push('has-title');
    }
    if( this.nav ){
        css.push('has-nav');
    }
    // single function cell types
    if( this.field ){
        css.push('is-field');
        if( this.field.editable() ){
            css.push('is-editable');
        }
        else {
            css.push('is-readonly');
        }
    }
    css = css.join(' ');
    if( css !== this._css ){
        this._css = css;
        this.el.className = css;
        // TODO better to maintain dirty state of properties that affect CSS
    }
    return this;
};



/**
 * TODO maintain dirty flags for CSS and size etc..
 */
WinPrototype.redraw = function( event ){
    // always restyle when redrawing
    this.restyle();

    var elem = this.el,
        body = this.body,
        field = this.field;
    // the height of our body element must be fixed, but it may be padded and/or margined
    // width not required as they're block elements
    if( body ){
        var redrawField,
            width = elem.clientWidth||0,
            height = elem.clientHeight||0,
            offset = body.offsetTop||0;
        // console.log( this.id +' = '+height+'px - '+offset+'px = '+(height-offset)+'px' );
        // offset can be greater tyan available height when collapsed right down to smaller than header.
        if( offset > height ){            
            height = 0;
        }
        else {
            height -= offset;
        }
        // redraw required
        if( this._h !== height ){
            this._h = height;
            // using box-sizing: border-box in CSS to save subtracting padding here
            //console.log( [ $(body).height(), $(body).innerHeight() ] );
            body.style.height = String(height)+'px';
            // editor may require resize also
            redrawField = field;
        }
        // only some elements require width-based redraw
        if( this._w !== width ){
            this._w = width;
            redrawField = field;
        }
        if( redrawField ){
            redrawField.redraw();
        }
    }
        
    // recurse in reverse
    var i = this.length, 
        child,
        ratio,
        lastPos = 1, 
        navigable = this.nav,
        dimension = this.dir === SPLIT_Y ? 'height' : 'width';
    while( 0 !== i-- ){
        child = this.cells[i];
        if( navigable ){
            // always 100% floating for navigable cells
            ratio = 1;
        }
        else {
            if( child.fixed ){
                // cell has a pixed position in pixels from its anchor point
                // new position must be calculated according to available space
                // note that we're fixing from start of window, not previous sibling.
                child.pos = child.fixed / $(elem)[ dimension ]();
            }
            ratio = lastPos - child.pos;
            lastPos = child.pos;
        }
        setDimensionAttribute( child.el, dimension, ratio );
        // I don't know why this was previously restyling child on redraw. Seems unecessary. surely if restyle had to be recursive, recursion could be in the restyle method instead.
        child.redraw( event );
    }

    // this cell may require pseudo table adjusting to header cells    
    // this.table && this.redrawTable();
    
    return this;
};



/**
 * Set fake table columns according to resized header cells
 *
WinPrototype.redrawTable = function(){
    var r,
        i = -1,
        thead = this.cells[0],
        tbody = this.cells[1],
        width = $(tbody.body).width(),
        table = tbody.body.firstChild,
        cols  = table.childNodes;
    table.style.width = width+'px';
    // recurse in reverse
    var i = thead.length, 
        child,
        childPos,
        lastPos = 1;
    while( 0 !== i-- ){
        child = thead.cells[i];
        childPos = child.pos;
        setDimensionAttribute( cols[i], 'width', lastPos - childPos );
        lastPos = childPos;
    }
    return this;
};*/



/**
 * Set content in a cell
 */
WinPrototype.contents = function( stuff, cssClass ){
    var elem = this.el,
        body = this.body
    ;
    if( null == stuff ){
        return body.innerHTML;
    }
    if( this.length ){
        this.clear();
    }
    else if( body ){
        elem.removeChild( body );
        body = null;
    }
    if( ! body ){
        this.body = body = elem.appendChild( dom.el('', cssClass||'wg-content' ) );
        this._h = null;
        // reinstate previous locale if previously cleared  
        var lang = this.lang;
        if( lang ){
            this._locale( lang, this.rtl, true );
        }
    }
    if( 'string' === typeof stuff ){
        $(body)._html( stuff );
    }
    else if( stuff ){
        this.append( stuff );
    }
    //else {
        //console.log( stuff );
        //throw new Error('Bad stuff');
    //}
    this.redraw();
    return this;
};



/**
 * Set contents of a cell as an editable, or non-editable textarea
 * @param {string} text initial text contents
 * @param {boolean} editable whether text is editable
 * @return TextArea current field used for editing
 */
WinPrototype.textarea = function( text, editable ){
    var currentField = this.field;
    if( currentField ){
        var wasEditable = currentField.editable();
        currentField.reload( text, editable );
        if( wasEditable !== editable ){
            this.restyle();
        }
    }
    else {
        if( this.length ){
            this.clear();
        }
        var elText = dom.el('textarea');
        elText.setAttribute('wrap','virtual');
        elText.value = text;
        this.contents( elText );
        currentField = CommonJS.require("$43","field.js")._new(elText)[ editable ? 'enable' : 'disable' ]();
        // maintain knowledge of the one editable area with focus
        trackTextareaFocus( this, elText );
        this.field = currentField;
        this.restyle();
    }
    // textarea requires containing element always has a locale
    if( ! this.lang ){
        this.locale('en');
    }

    return currentField;
};



/**
 * Set the locale of this window's inner content
 * @return Win
 */
WinPrototype.locale = function( locale ){
    locale = CommonJS.require("$35","locale.js").cast( locale );
    return this._locale( String(locale), locale.isRTL() );
};



/**
 * @internal
 */
WinPrototype._locale = function( lang, rtl, force ){
    var body = this.body;
    // set HTML lang attribute if changed, or if painting forced
    if( force || lang !== this.lang ){
        this.lang = lang;
        body && body.setAttribute( 'lang', lang );
    }
    // set text direction attribute if changed
    if( force || rtl !== this.rtl ){
        this.rtl = rtl;
        body && body.setAttribute( 'dir', rtl ? 'RTL' : 'LTR' );
    }
    return this;
};




/**
 * Get this cell's editable field, or the first child cell that has one
 * @return TextArea abstracted object
 */
WinPrototype.editable = function(){
    // if cell is a field, return if editable
    var textArea = this.field;
    if( textArea ){
        return textArea.editable() ? textArea : null;
    }
    // else descend into any child cells
    var cells = this.cells, n = cells.length, i = this.navigated();
    // if cell is tabbed, descend only into visible. 
    if( null != i ){
        return cells[i].editable();
    }
    // else return first editable across child cells
    while( ++i < n ){
    for( i = 0; i < n; n++ );
        if( textArea = cells[i].editable() ){
            return textArea;
        }
    }
    // else no editable fields
};


/**
 * Pass all textarea instances under this cell to a function
 * Note that this iterator doesn't pass an index to the callback, because it doesn't maintain a counter through recursion
 * @return Win
 */
WinPrototype.eachTextarea = function( callback ){
    var self = this,
        textArea = self.field
    ;
    if( textArea ){
        callback( textArea );
    }
    else {
        self.each( function( cell ){
            cell.eachTextarea( callback );
        } );
    }
    return this;
};


/**
 * Append content to cell body
 */
WinPrototype.append = function( stuff ){
    if( ! stuff ){
        //throw new Error('Bad argument passed to .append');
    }
    else if( stuff.nodeType ){
        html.init( this.body.appendChild(stuff) );
    }
    else {
        html.init( $(stuff).appendTo(this.body) );
    }
    return this;
};



/**
 * Prepend content to cell body
 */
WinPrototype.prepend = function( stuff ){
    var body = this.body;
    if( stuff.nodeType ){
        var sibling = body.firstChild;
        html.init( sibling ? body.insertBefore( stuff, sibling ) : body.appendChild(stuff) );
    }
    else {
        html.init( $(stuff).prependTo(body) );
    }
    return this;
};


/**
 * Add content immediately before the body (like a header)
 */
WinPrototype.before = function( stuff ){
    var body = this.body;
    if( stuff.nodeType ){
        html.init( this.el.insertBefore( stuff, body ) );
    }
    else {
        html.init( $(stuff).insertBefore(body) );
    }
    return this;
};


/**
 * Give cell with content a title
 */
WinPrototype.header = function( title, cssClass ){
    if( null == title && null == cssClass ){
        return this.el.getElementsByTagName('header')[0];
    }
    this.t = dom.txt( title||'' );
    this.el.insertBefore( dom.el('header', cssClass ), this.body ).appendChild( this.t );
    this.redraw();
    return this;
};


/**
 * Alter cell title
 */
WinPrototype.title = function( title ){
    var textNode = this.t;
    if( textNode ){
        textNode.nodeValue = title||'';
        return textNode;
    }
    // else header not created yet
    this.header( title );
    return this.t;
};


/**
 * Get the current title text
 */
WinPrototype.titled = function(){
    var textNode = this.t;
    return textNode && textNode.nodeValue;
};




/**
 * Get positional offset of body in relation to root element. Generally this will give the height of the header
 * @return int
 */
WinPrototype.bodyY = function(){
    return elementTop( this.body, this.el );
};


/**
 * Get vertical scroll of this cell, assuming it's scrollable
 */
WinPrototype.scrollY = function( y ){
    if( undefined === y ){
        return this.body.scrollTop;
    }
    this.body.scrollTop = y;
};


/**
 * Split cell recursively into columns and then rows, using a utils/table instance
 * @return WingridTable handle on table object
 */
WinPrototype.tabulate = function( dataSource ){
    var table = this.table;
    if( table ){
        table.clear();
    }
    else {
        table = CommonJS.require("$44","wgtable.js").create(this);
    }
    table.init( dataSource );
    // setting after init because it will be inset during cell split
    this.table = table;
    return table;
};


WinPrototype.lock = function(){
    this.body.className += ' locked';
    return this;
};



/**
 * Scroll body vertically to any element inside it.
 */
WinPrototype.scrollTo = function( target, noAnimate ){
    /*/ debug
    if( ! target || ! target.parentNode ){
        console.log( target );
        throw new Error('Cannot scrollTo this');
    }*/
    // ensure selected row is within scrolled viewport
    var scroll,
        body = this.body,
        minY = body.scrollTop,
        rowT = elementTop( target, body )
    ;
    // if top of row is above top of viewport we need to scroll up
    if( minY > rowT ){
        scroll = rowT;
    }
    // if bottom of row is below bottom of viewport we need to scroll down
    else {
        var bodH = body.clientHeight,
            rowB = rowT + $(target).outerHeight();
        if( ( bodH + minY ) < rowB ){
            scroll = rowB - bodH;
        }
        else {
            return;
        }
    }
    if( noAnimate ){
        body.scrollTop = scroll;
    }
    else {
        $(body).stop(true).animate( { scrollTop: scroll }, 250 );
    }
};



/**
 * Convert child cells into navigable tabs
 */
WinPrototype.navigize = function( labels, defaultIndex ){
    var self = this,
        children = self.cells,
        elem = self.nav,
        activeIndex,
        links = []
    ;
    function onClick( event ){
        var link = $(event.target), 
            index = link.data('idx');
        if( null == index ){
            return true; // somehow managed a click outside a button
        }    
        if( null != activeIndex ){
            hide(activeIndex);
        }
        show(index);//.focus();
        self.redraw();
        return killEvent(event);
    }
    function show( index ){
        var child = children[index],
            $link = links[index],
            $content = $(child.el).show();
        $link.addClass('active');
        // set new active index
        activeIndex = index;
        $nav.data('idx',index);
        child.fire( 'wgTabSelect', [ index ] );
        return $content;
    }
    function hide( index ){
        var child = children[index],
            $link = links[index],
            $content = $(child.el).hide();
        $link.removeClass('active');
        return $content;
    }

    // cell may already be navigized // TODO should we keep same cell selection??   
    if( elem ){
        self.el.removeChild(elem);
    }
    // create new wg-tabs navigation element before content div
    elem = self.nav = self.el.insertBefore( dom.el('nav','wg-tabs'), self.body );        
    // enable navigation click action    
    var $nav = $(elem).on('click',onClick);
    // recall previous index and keep if possible
    if( null == defaultIndex ){
        defaultIndex = $nav.data('idx') || 0;
    }
    // add navigation items and prep hidden cells
    self.each( function( child, index ){
        links[index] = $('<a href="#'+child.id+'"></a>')
            .data( 'idx', index )
            .text( labels[index] )
            .appendTo($nav)
        ;
        child.pos = 0;
        $(child.el).hide();
    } );
    // ready to make visible
    show( children[defaultIndex] ? defaultIndex : 0 );
    self.lock();
    self.redraw();
    return self;
};



/**
 * Get the child cell current cell is navigated to if navigized
 */
WinPrototype.navigated = function(){
    var elem = this.nav;
    if( elem ){
        return $(elem).data('idx');
    }
};



// clean up
WinPrototype = null;



return exports;
}({},window,document) );

CommonJS.register("$23", function(exports,window,document){ /* module: js/editor/base.js */
/**
 * Base class for all poedit-like editors
 */

CommonJS.require("$3","number.js");


// pseudo-constants
var EVENT_UPDATE = 'poUpdate',
    EVENT_FILTER = 'poFilter',
    EVENT_CHANGE = 'changing',
    EVENT_CHANGED = 'changed',
    
    // Common translated labels stored in instances
    LABEL_SOURCE_TEXT    = 0,
    LABEL_SOURCE_SINGLE  = 1,
    LABEL_SOURCE_PLURAL  = 2,
    LABEL_TRANSLATION    = 3,
    LABEL_CONTEXT        = 4,
    LABEL_COMMENTS       = 5,
    LABEL_UNTRANSLATED   = 6,
    LABEL_TRANSLATED     = 7,
    LABEL_FUZZY          = 8,
    LABEL_HINT           = 9,

    // pre-compiled RegExp
    REGEX_LEADING_SPACE = /^\s+/,
    
    // The last grid cell to be focused for some kind of interaction (editing probably)
    currentlyFocusedCell,

    // default translator set before editor is constructed
    defaultTranslator,
    
    // formatting libs
    escHtml = CommonJS.require("$34","string.js").html,
    sprintf = CommonJS.require("$5","string.js").sprintf
;


// inherit Editor base class by a specific editor
exports.extend = function( subClass ){
    return subClass.prototype = new Editor;
};


// set default translator before it's required in construction
exports.localise = function( translator ){
    defaultTranslator = translator;
    return exports;
};


/**
 * Simple HTML to Text stripper. Doesn't attempt to handle whitespace
 */
var stripHtml = function(){
   var elem = document.createElement('p');
   return function( htmlContent ){
       // setting inner HTML without image src (display:none doesn't work)
       elem.innerHTML = htmlContent.replace('src=','x=');
       return elem.textContent;
   };
}();



/**
 * Compile className for row in message listing to indicate asset status
 * This only deals with po- class names. anything else must be protected
 */
function messageRowCss( message ){
    var css = [];
    if( message ){
        // add dirty state from any plural form
        if( ! message.saved() ){
            css.push('po-unsaved');
        }
        // specific fuzzy flag common to all editors
        if( message.fuzzy() ){
            css.push('po-fuzzy');
        }
        // else allow generic flag icon
        else if( message.flagged() ){
            css.push('po-flagged');
            // css.push( 'po-flag-'+message.flags().join(' po-flag-') );
        }
        // TODO add custom flag getter for editors that support all Loco flags
        message.translation() || css.push('po-empty');
        message.comment() && css.push('po-comment');
    }
    return css.join(' ');
}



/**
 * add locale information to message title next node
 * @return HtmlElement H2 header that spans the cell
 */
function renderCellTitle( cell, text, locale ){
    var head = $( cell.title(text).parentNode ),
        icon = head.find('span.lang')
    ;
    // set language icon only if a locale is passed
    if( locale ){
        // set locale (note locale must be object with toString method)
        locale = CommonJS.require("$35","locale.js").cast( locale );
        icon.length || ( icon = $('<span></span>').prependTo(head) );
        icon.attr('lang', locale.lang )
            .attr('class', locale.getIcon() || 'lang region region-'+(locale.region||'zz').toLowerCase() );
    }
    else {
        icon.remove();
        locale = 'en';
    }
    // setting cell locale ensures text direction attribute exists
    cell.locale( locale );
    return head;
}


/**
 * Create a generic event dispatcher based on a click of a jQuery element, passing original click target as arguments
 * @return void
 */
function createGenericClickEvent( editor, $el, type ){
    $el.click( function(event){
        var allowClick = editor.fire( type, [event.target] );
        allowClick || event.preventDefault();
        return allowClick;
    } );
}



/**
 * @property {Boolean} $dirty whether editor has unsaved changes
 * @property {String} $mode
 * @property {Boolean} $html 
 * @property {HTMLElement} $smeta Div for source text metadata
 * @property {HTMLElement} $tmeta Div for target translation metadata
 */
function Editor(){
    this.dirty = 0;
}


var EditorPrototype = Editor.prototype = CommonJS.require("$36","abstract.js").init( ['getListColumns','getListHeadings','getListEntry'], ['editable','t'] );


/**
 * Post construct initializer for real instances
 */
EditorPrototype.init = function(){
    this.localise();
    this.editable = {
        source: true,
        target: true
    };
    // default IDE mode is regular plain text
    this.mode = '';
    this.html = false;
    // default "format" mode is auto (undefined)
    // this.fmt = undefined;

    return this;
};


/**
 * Localize this editor instance either a pre-built translator object or default to identity function
 * @return Editor self for chaining
 */
EditorPrototype.localise = function( translator ){
    if( ! translator ){
        translator = defaultTranslator || CommonJS.require("$1","t.js").init();
    }
    // set common labels re-used by base editor
    var labels = [];
    // Translators: Label for the window pane holding the original English text
    labels[ LABEL_SOURCE_TEXT   ] = translator._x('Source text','Editor')+':';
    // Translators: Where %s is the name of the language, e.g. "French translation"
    labels[ LABEL_TRANSLATION   ] = translator._x('%s translation','Editor')+':';
    // Translators: Label for the window pane holding message context
    labels[ LABEL_CONTEXT       ] = translator._x('Context','Editor')+':';
    // Translators: Label for the window pane for entering translator comments
    labels[ LABEL_COMMENTS      ] = translator._x('Comments','Editor')+':';
    // Translators: Label for the singular form of the original English text
    labels[ LABEL_SOURCE_SINGLE ] = translator._x('Single','Editor')+':';
    // Translators: Label for the plural form of the original English text
    labels[ LABEL_SOURCE_PLURAL ] = translator._x('Plural','Editor')+':';
    //
    labels[ LABEL_UNTRANSLATED ] = translator._x('Untranslated','Editor');
    labels[ LABEL_TRANSLATED ] = translator._x('Translated','Editor');
    labels[ LABEL_FUZZY ] = translator._x('Toggle Fuzzy','Editor');
    labels[ LABEL_HINT ] = translator._x('Suggest translation','Editor');
    //
    this.labels = labels;
    this.t = translator;
    return this; 
};


/**
 * Set root WinGrid element
 */
EditorPrototype.setRootCell = function( rootDiv ){
    var rootCell = CommonJS.require("$37","wingrid.js").init( rootDiv );
    // redraw grid when browser window resizes
    function onWindowResize( event ){
        rootCell.redraw( true, event );
        return true;
    }
    $(window).on( 'resize', onWindowResize );
    this.redraw = onWindowResize;
    // capture various wingrid events
    $(rootDiv)
        // track currently focused grid cell
        .on('wgFocus wgBlur', function( event, cellOrNotCell ){
            event.stopPropagation();
            currentlyFocusedCell = cellOrNotCell; // <- blur sends no cell argument
        } )
    ;
    // add destructor here, due to scope access
    // this is the function that will get re-invoked, so we don't want multiple handlers
    // other handlers, such as re-fitting the outer frame should look after themselves.
    this.destroy = function(){
        rootCell.destroy();
        $(window).off('resize',onWindowResize);
    };
    this.rootDiv = rootDiv;
    return rootCell;
};


/**
 * Get handle on wingrid root div
 * @return jQuery
 */
EditorPrototype.$ = function(){
    return $(this.rootDiv);
};


/**
 * Set list cell
 */
EditorPrototype.setListCell = function( listCell ){
    var self = this;
    self.listCell = listCell;
    // listen for table row selection changes, but prevent two events when a selection causes a deselection
    listCell
        .on( 'wgRowSelect', function( event, selectedIndex ){
            // TODO prevent redundant load of current item?
            self.loadMessage( self.po.row(selectedIndex) );
            return true;
        } )
        .on ( 'wgRowDeselect', function( event, deslectedIndex, willSelect ){
            willSelect || self.loadNothing();
            return true;
        } )
    ;
};



/**
 * Set source cell
 */
EditorPrototype.setSourceCell = function( sourceCell ){
    this.sourceCell = sourceCell;
};


/**
 * Set target cell
 */
EditorPrototype.setTargetCell = function( targetCell ){
    this.targetCell = targetCell;
};


/**
 * Move list cell to the next item
 */
EditorPrototype.next = function( direction, skipTranslated, wrap ){
   var table  = this.listTable,
       rowIdx = table.selected(),
       looped = rowIdx,
       message, messages = this.po
   ;
   // standard move to next selectable row, passing current known row as starting point
   while( null != ( rowIdx = table.next( direction, wrap, rowIdx ) ) ){
       // loop protection
       if( looped === rowIdx ){
           rowIdx = null;
           break;
       }
       // continue if message translated and we're skipping them
       if( skipTranslated ){
           message = messages.row(rowIdx);
           if( message.translated(0) ){
               continue;
           }
       }
       // using this row index, assuming it's not null
       break;
   }
   if( null != rowIdx ){
       table.select( rowIdx, true ); // <- noFocus so cursor doesn't focus the table when we're editing.
   }
   return rowIdx;
};



/**
 * Get/Set currently active message
 */
EditorPrototype.current = function( message ){
    var active = this.active;
    if( null == message ){
        return active;
    }
    if( message ){
        if( message.is(active) ){
            this.reloadMessage(message); // <- forces update of current message
        }
        else {
            this.loadMessage(message); // <- destroys and re-renders current message
        }
    }
    else {
        this.unloadActive(); // <- empties out all current fields
    }
    return this;
};


/**
 * Get current plural index
 * @return int || null
 */
EditorPrototype.getTargetOffset = function(){
    if( this.active ) {
        return this.targetCell && this.targetCell.navigated() || 0;
    }
};


/**
 * Get editable translation text field if translation is editable
 */
EditorPrototype.getTargetEditable = function(){
    return this.editable.target && this.targetCell && this.targetCell.editable();
};


/**
 * Get editable source text field if source is editable
 */
EditorPrototype.getSourceEditable = function(){
    return this.editable.source && this.sourceCell && this.sourceCell.editable();
};


/**
 * Get editable context text field if editable
 */
EditorPrototype.getContextEditable = function(){
    return this.editable.context && this.contextCell && this.contextCell.editable();
};


/**
 * Get any editable field in order target, source, context
 */
EditorPrototype.getFirstEditable = function(){
    return this.getTargetEditable() || this.getSourceEditable() || this.getContextEditable();
};



/**
 * Get/Set whether editor is searchable via dict instance
 */
EditorPrototype.searchable = function( newDict ){
    if( newDict ){
        this.dict = newDict;
        this.po && this.rebuildSearch();
    }
    return this.dict && true;
};



/**
 * Rebuild dictionary against current PO file
 */    
EditorPrototype.rebuildSearch = function(){
    var self = this,
        idx = -1,
        messages = self.po.rows,
        nmessages = messages.length,
        dict = self.dict
    ;
    dict.clear();
    // store message offsets against full text key
    while( ++idx < nmessages ){
        // this may search on text not visible in table:
        dict.add( idx, messages[idx].toText() );
        // this will search only that visible:
        // dict.push( this.getListEntry(messages[idx]) );
    }
    // Why the hell was I resetting the filter here??
    //self.lastSearch = '';
    //self.lastFound = nmessages;
    //this.dict.dump();
};



/**
 * Test current text filter state
 */
EditorPrototype.filtered = function(){
    return this.lastSearch||'';
};


/**
 * Filter editor on search terms
 */    
EditorPrototype.filter = function( text, noEvent ){
    var self = this, 
        indexes, 
        //meta = {}, 
        //listCell = self.listCell,
        listTable = self.listTable,
        lastFound = self.lastFound,
        lastSearch = self.lastSearch
    ;
    //var timer = require('utils/debug').timer('Finding "'+text+'"');
    if( text ){
        // avoid repeated lookup of current filter
        if( lastSearch === text ){
            return lastFound||0;
        }
        // avoid redundant lookup when dead end is made a more specific dead end
        if( lastSearch && ! lastFound && 0 === text.indexOf(lastSearch) ){
            return 0;
        }
        // do lookup return filtered in row offsets
        // note that if table is ordered row offsets won't align with PO entries
        indexes = self.dict.find( text );
        //timer.lap(' > Found '+indexes.length+' in ');
    }
    self.lastSearch = lastSearch = text;
    self.lastFound  = lastFound = indexes ? indexes.length : self.po.length;

    // filter according to indexes matched - null means all:
    indexes ? listTable.filter(indexes) : listTable.unfilter();
    //timer.lap(' > Filtered in ').stop('Did all in ');

    noEvent || self.fire( EVENT_FILTER, [ lastSearch, lastFound ] );
    return lastFound;
};


/**
 * Count rows not currently filtered out
 * @return int
 */
EditorPrototype.countFiltered = function(){
    return this.lastSearch ? this.lastFound : this.po.length;
};


/**
 * Mark a message as unsaved and fire "dirty" event
 * @return Boolean whether message was saved before this was called (indicating whether the state has changed)
 */
EditorPrototype.unsave = function( message, pluralIndex ){
    var wasSaved = false;
    if( message ){
        // make dirty only if not already dirty
        wasSaved = message.saved(pluralIndex);
        if( wasSaved ){
            this.dirty++;
            message.unsave(pluralIndex);
            this.fire('poUnsaved', [ message, pluralIndex ] );
        }
        // always run visual marker, as there's no way to know if specific flags changed since last edit
        this.markUnsaved( message );
    }
    return wasSaved;
};


/**
 * Abstract visual marking of unsaved message from unsave event above
 * (Note that actually this marks any change in saved state, not just unsaved)
 */
EditorPrototype.markUnsaved = function( message ){
    var self = this,
        rowId = self.po.indexOf( message ),
        table = self.listTable,
        cells = table.tr(rowId)
    ;
    if( cells && cells.length ){
        var currentStyle = cells[0].className,
            initialStyle = currentStyle.replace(/(?:^| +)po-[a-z]+/g,''), // <- stripped of po-* styles
            changedStyle = initialStyle+' '+messageRowCss( message )
        ;
        if( changedStyle !== currentStyle ){
            $(cells).attr( 'class', changedStyle );
        }
    }
    /*else {
        console.error('Row ['+rowId+'] disappeared');
    }*/
};
    
    
/**
 * Reset all unsaved messages and fire poSave event if something was saved
 */        
EditorPrototype.save = function( force ){
    var messages = this.po;
    if( this.dirty || force ){
        // clear all dirty flags in messages
        messages.each( function( i, message ){
            message.save(); // <- removes dirty state
        } );
        // this method of removing unsaved css should be fastest as long as browser has getElementsByClassName
        this.listCell.find('div.po-unsaved').removeClass('po-unsaved');
        this.dirty = 0;
        this.fire('poSave');
    }
    return messages;
};


/**
 * fire editor event
 * @return {Boolean} whether default action may continue
 */
EditorPrototype.fire = function( type, args ){
    var handlers = this.handle, returnValue;
    // attempt to call internal handler if it exists
    if( handlers && handlers[type] ){
        returnValue = handlers[type].apply( this, args||[] );
        if( false === returnValue ){
            return false;
        }
    }
    // fire DOM event
    var event = $.Event( type );
    this.$().trigger( event, args );
    return ! event.isDefaultPrevented();
};


/**
 * bind a dom event handler to the root node of the editor
 */
EditorPrototype.on = function( type, callback ){
    this.$().on( type, callback );
    return this;
}


/**
 * By default no initial sorting will be done on document order (until columns selected).
 * Child classes may override
 * @return Function
 */
EditorPrototype.getSorter = function(){
    return null;
};

  


/**
 * Clear UI and load the po object into list area
 * @return Boolean whether assets exist
 */
EditorPrototype.reload = function(){
    var self = this,
        colWidths,
        listCell = self.listCell,
        listTable = self.listTable,
        messages = self.po,
        targetLocale = messages && messages.locale(),
        targetReverse = targetLocale && targetLocale.isRTL(),
        messagesLength = messages && messages.length || 0
    ;
    if( ! messages || ! messages.row ){
        listCell && listCell.clear().header('Error').contents('Invalid messages list');
        return false;
    }

    // set initial locale (absent when editing a template)
    self.targetLocale = targetLocale;

    // dummy filter reset, because table will be destroyed
    if( self.lastSearch ){
        self.lastSearch = '';
        self.lastFound = messagesLength;
        self.fire( EVENT_FILTER, [ '', messagesLength ] );
    }

    // remember scroll position during a reload of existing table
    // var previousScroll = listTable && listTable.scroll();

    // remember previous column widths for applying to new list
    if( listTable ){
        colWidths = listTable.thead().distribution();
    }

    // tabulate list cell with a table-like interface for populating cells
    self.listTable = listTable = listCell.tabulate( {
        eachCol: function( callback ){
            var i, key, columns = self.getListColumns(), headings = self.getListHeadings();
            // loop order may be reversed, but wgtable is handling that
            for( key in columns ){
                i = columns[key];
                callback( i, key, headings[i] );
            }
        },
        eachRow: function( callback ){
            messages.each( function( msgid, message ){
                callback( message.idx, self.getListEntry(message), messageRowCss(message) );
            } );
        },
        sort: self.getSorter()
    } );

    // make all columns sortable, but don't change order until actioned by user
    var colId, colOffsets = self.getListColumns();
    for( colId in colOffsets ){
        listTable.sortable( colOffsets[colId] );
    }
    
    
    // restore widths:
    // TODO this looks odd when columns have been added, so only keep distribution if same or fewer columns
    if( colWidths ){
        listTable.thead().distribute( colWidths );
    }

    // set text direction for preview column as higher level CSS hook
    // WARNING: this will be destroyed if table is redrawn. subclasses dealing with that for now.
    listTable.tbody().$( targetReverse?'addClass':'removeClass', ['is-rtl'] );

    self.fire('poLoad');
    return !!messagesLength;
};    




/**
 * Load all messages from document and select initial row
 */
EditorPrototype.load = function( newPO, selectIdx ){
    //newPO._validate();
    this.po = newPO;
    this.dict && this.rebuildSearch();
    if( this.reload() ){
        if( -1 !== selectIdx ){
            this.listTable.selectRow( selectIdx||0 ); 
            //this.listTable.select( selectIdx||0 );
        }
        else if( this.active ){
            this.unloadActive();
        }
    }
};
    


/**
 * Update current message by "pasting" contents of passed message into the editor
 * @return Editor
 */
EditorPrototype.pasteMessage = function( message ){
    var cell, index = 0;
    // only paste into text fields if active
    if( this.active === message ){
        // start with 0-2 source cells
        cell = this.sourceCell;
        cell && cell.eachTextarea( function( field ){
            field.val( message.source( null, index++ ) );
        } );
        // context cell, of which there can be only one!
        cell = this.contextCell;
        cell && cell.eachTextarea( function( field ){
            field.val( message.context() );
        } );
        // target cell may be split into any number of plurals
        cell = this.targetCell;
        if( cell ){
            index = 0;
            cell.eachTextarea( function( field ){
                field.val( message.translation(index++) );
            } );
        }
    }
    // we must update list in case fields didn't exist or not editable or not focused, and so resulted in no events
    this.updateListCell( message, 'source' );
    this.updateListCell( message, 'target' );
    return this;
};



/**
 * Redraw currently active message without destroying first
 * Used to discreetly update properties during active editing
 * @return Editor
 */
EditorPrototype.reloadMessage = function( message ){
    var sourceCell = this.sourceCell, targetCell = this.targetCell, index, redraw;
    this.pasteMessage( message );
    // update other source properties
    if( sourceCell ){
        if( this.setSrcMeta(message,sourceCell) ){
            sourceCell.redraw();
        }
    }
    // update other target properties
    if( targetCell ){
        index = targetCell.navigated() || 0;
        redraw = this.setTrgMeta( message, index, targetCell );
        // without source cell we'll load notes into target 
        if( ! sourceCell && this.setSrcMeta(message,targetCell) ){
            redraw = true;
        }
        redraw && targetCell.redraw();
    }
    return this;
};


/**
 * Set translation status/flag in target pane.
 * This is default method does nothing. Override it for specific editors.
 */
EditorPrototype.setStatus = function(){
    return null;
};


/**
 * Set/clear notes and other meta info against source text
 * @param {Message} message
 * @param {Win} relatedCell
 * @return boolean whether cell redraw may be required
 */
EditorPrototype.setSrcMeta = function( message, relatedCell ){
    var h = escHtml,
        lines = [],
        value,
        redraw = false,
        $div = this.$smeta,
        labels = this.labels,
        // tags only in Loco project context
        tag,
        badges = [],
        tagRefs = message.tags(),
        numTags = tagRefs && tagRefs.length
    ;
    // compile context and tags as "badges"
    value = message.context();
    if( value ){
        badges.push('<span>'+h(labels[LABEL_CONTEXT])+'</span>');
        badges.push('<mark>'+h(value)+'</mark>');
    }
    // Tags are only supported in Loco projects, so getter method getTag will only be available in project editor
    if( numTags && this.getTag ){
        badges.push('<span>Tagged:</span>');
        while( 0 <= --numTags ){
            tag = this.getTag(tagRefs[numTags]);
            tag && badges.push('<mark class="tag">'+h(tag.mod_name)+'</mark>');
        }
    }
    if( badges.length ){
        lines.push( badges.join(' ') );
    }
    // source code references - linkable only when source files are actually available (wp)
    // only rendering when editor is on "code" mode. Requires redraw on toggle. better than hiding with css.
    if( this.getMono() ){
        value = message.refs();
        if( value ){
            tagRefs = value.split(/\s/);
            numTags = tagRefs.length;
            if( numTags ){
                badges = [];
                while( 0 <= --numTags ){
                    value = tagRefs[numTags];
                    badges.push('<code>'+h(value)+'</code>');
                }
                lines.push('<p class="has-icon icon-file">'+badges.join(' ')+'</p>');
                // capture clicks on file reference <code> blocks via poRef event 
            }
        }
    }
    // Wordy notes field last (extracted comments)
    value = message.notes();
    if( value ) {
        lines.push( '<p class="has-icon icon-info">'+h(value,true)+'</p>' );
    }
    if( lines.length ){
        // lazy create meta div if needed in source cell if exists, else in target (single mode)
        if( ! $div ){
            $div = relatedCell.find('div.meta');
            if( ! $div.length ){
                $div = $('<div class="meta"></div>').insertAfter( relatedCell.header() );
            }
            createGenericClickEvent(this,$div,'poMeta');
            this.$smeta = $div;
        }
        // set non-empty lines of HTML
        $div.html( lines.join('\n') ).show();
        redraw = true;
    }
    // else clear notes if element exists already
    else if( $div && $div.text() ){
        $div.text('').hide();
        redraw = true;
    }
    // else no notes and notes not in dom, no redraw required
    return redraw;
};



/**
 * Set/clear errors against target text
 * @param {Message} message
 * @param {Number} pluralIndex plural index for target
 * @param {Win} relatedCell
 * @return bool whether cell redraw may be required
 */
EditorPrototype.setTrgMeta = function( message, pluralIndex, relatedCell ){
    var h = escHtml,
        lines = [],
        redraw = false,
        $div = this.$tmeta,
        batches = message.errors(pluralIndex), 
        numBatches = batches && batches.length, i
    ;
    // Show errors first as suggestions coming after may fix it
    if( numBatches ){
        for( i = 0; i < numBatches; i++ ) {
            lines.push('<p class="has-icon icon-warn">' + h(batches[i],true) + '.</p>');
        }
    }
    /*/ TODO suggestions and hints (possibly related to validation errors
    batches = message.hints(pluralIndex);
    numBatches = batches && batches.length;
    if( numBatches ){
        for( i = 0; i < numBatches; i++ ) {
            lines.push('<p class="has-icon icon-robot">' + escHtml(batches[i],true) + '.</p>');
        }
    }*/
    if( lines.length ) {
        // lazy create meta div if needed in target cell if exists
        if( ! $div ){
            $div = relatedCell.find('div.meta');
            if( ! $div.length ){
                $div = $('<div class="meta"></div>').insertAfter( relatedCell.header() );
            }
            this.$tmeta = $div;
        }
        // set non-empty lines of HTML
        $div.html( lines.join('\n') ).show();
        redraw = true;
    }
    // else clear errors if element exists already
    else if( $div && $div.text() ){
        $div.text('').hide();
        redraw = true;
    }
    return redraw;
};



/**
 * Load a message into the edit area below list
 */   
EditorPrototype.loadMessage = function( message ){
    var self = this,
        edMode = self.mode,
        escHTML = message.isHTML(),
        invMode = self.inv || false,
        oldFormat = this.fmt || null,
        newFormat = message.format() || null,
        reloading = message.is( self.active ),
        // get data about source and target
        pluralIndex  = 0,
        sourceCell   = self.sourceCell,
        targetCell   = self.targetCell, 
        contextCell  = self.contextCell,
        commentCell  = self.commentCell,
        editTarget   = self.editable.target,
        editSource   = self.editable.source,
        editContext  = self.editable.context,
        editingCell  = currentlyFocusedCell,
        //preserveCell = reloading && editingCell,
        sourceLocale = self.sourceLocale,
        targetLocale = self.targetLocale,
        labels       = self.labels
    ;
    // Text/HTML switch before cell value change
    if( self.html !== escHTML ){
        self.html = escHTML;
        if( 'code' !== self.mode ){
            edMode = escHTML ? 'html' : '';
            self.setMode( edMode );
        }
    }
    function toTitleCase( s ){
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    }
    // normalize plural form label, stripping example number as required
    function createPluralLabel( name, keepSuffix ){
        var parts = keepSuffix ? name.split(' ') : name.split(' ',1);
        name = parts[0];
        // replace numeric quantity like "=1" with canonical tags
        if( '=' === name.charAt(0) ){
            name = name.substr(1);
            name = ['zero','one','two'][ Number(name) ] || name;
        }
        parts[0] = toTitleCase(name);
        return parts.join(' ');
    }
    // inner function renders source text window when ready
    function setSourceWindow( sourceCell, sourceLocale ){
        var editable = editSource,
            cellTitle = labels[LABEL_SOURCE_TEXT]
        ;
        // always remove listeners because new event will operate on a new message
        sourceCell.off();
        // render Source text: title with flag from source locale if available
        if( sourceCell.titled() !== cellTitle ){
            renderCellTitle( sourceCell, cellTitle, sourceLocale||'en' );
        }
        // add notes now before cell height is recalculated
        var redraw = false;
        if( self.setSrcMeta(message,sourceCell) ){
            redraw = true;
        }
        // Split source into plural forms if applicable
        if( message.plural() ){
            var i = -1,
                pluralCellIds = [],
                pluralCellTitles = [],
                idPrefix = sourceCell.id+'-',
                pluralForms = ( message.sourceForms() ||  ( sourceLocale && sourceLocale.plurals ) || ['One','Other'] ),
                numPlurals = pluralForms.length
            ;
            // Use "Single:" "Plural:" labels for Germanic source. Legacy compatibility and most common / simplest case.
            // note that plural may already be translated (WordPress) so we can't check for "one","other" :(
            // however, we can check if exact quantity is used and know if it's not meant to be singular
            if( 2 === numPlurals && ( '=' !== pluralForms[0].charAt(0) || '=1' === pluralForms[0] ) ){
                pluralCellIds = [ idPrefix+'-0', idPrefix+'-1' ];
                pluralCellTitles = [ labels[LABEL_SOURCE_SINGLE], labels[LABEL_SOURCE_PLURAL] ];
            }
            // else use whatever plural forms configured (but trimming the example quantity)
            else {
                while( ++i < numPlurals ){
                    pluralCellIds[i] = idPrefix+String(i);
                    pluralCellTitles[i] = createPluralLabel(pluralForms[i])+':';
                }
            }
            // initialize pluralized source cells
            sourceCell.splity.apply( sourceCell, pluralCellIds );
            sourceCell.each( function(child,i){
                child.header( pluralCellTitles[i] ).textarea( message.source(null,i), editable ).setStrf(newFormat).setMode(edMode).setInvs(invMode);
            } );
            // no resizing of plural panes:
            sourceCell.lock();
            // listen for plural source changes if editable
            editable && sourceCell.each( function( child, i ){
                bindSourceCell( child, i );
            } );
        }
        // else singular item in source pane. most common.
        else {
            redraw && sourceCell.redraw();
            sourceCell.textarea( message.source(), editable ).setStrf(newFormat).setMode(edMode).setInvs(invMode);
            editable && bindSourceCell( sourceCell, 0 );
        }
    }

    // creates listening closure with plural index    
    // note that currently only 0 or 1 plural forms supported on source.
    function bindSourceCell( cell, pluralIndex ){
        cell
        // visually update during source editing: 
        .on( EVENT_CHANGE, function( event, newSource ){
            message.source( newSource, pluralIndex );
            if( 0 === pluralIndex ){    
                self.updateListCell( message, 'source' );
            }
            self.unsave( message, pluralIndex );
        } )
        // re-index if source text changed after edit: 
        .on( EVENT_CHANGED, function(){
            if( 0 === pluralIndex ){
                self.po.reIndex( message ); // <- TODO only required if message type indexes by text
            }
            self.dict && self.rebuildSearch();
            self.fire( EVENT_UPDATE, [ message ] );
        } );
    }     

    // inner function renders translation window when ready
    function setTranslateWindow( targetCell, locale, pluralIndex ){
        // force previous text area to commit last value before killing its handlers
        // required for cases where no blur event occurred when switching between fields
        editTarget && targetCell.eachTextarea( function(field){
            field.ping();
        } );
        targetCell.off();
        // render Translation: title with flag from locale object
        var label = locale.isKnown() && locale.label || 'Target',
            title = sprintf( labels[LABEL_TRANSLATION], label )
        ;
        // save redraw of header if title unchanged
        if( targetCell.titled() !== title ){
            renderCellTitle( targetCell, title, locale );
        }
        // add notes now before cell height is recalculated (only when no source cell: single mode)
        var redraw = false;
        if( ! this.sourceCell && self.setSrcMeta(message,targetCell) ){
            redraw = true;
        }
        // set errors before rendering cell (cos resize)
        if( self.setTrgMeta( message, pluralIndex, targetCell ) ){
            redraw = true;
        }
        // enable flagging of current translation
        self.setStatus( message, pluralIndex );
        // add a tab for each plural form if asset pluralized
        if( message.pluralized() ){
            var i,
                pluralCellIds = [],
                pluralCellTitles = [],
                idPrefix = targetCell.id+'-',
                pluralForms = message.targetForms() || locale.plurals || [ 'One', 'Other' ],
                numPlurals = pluralForms.length
            ;
            function pushForm( i ){
                var name = pluralForms[i];
                pluralCellTitles.push( name ? createPluralLabel(name,true) : 'Form '+i );
                pluralCellIds.push( idPrefix+String(i) );
            }
            // add plural translations that are actually present in message. 
            message.each( pushForm );
            // pad plural targets with empty translations that should exist for locale
            while( ( i = pluralCellIds.length ) < numPlurals ){
                pushForm(i);
            }
            targetCell.splitx.apply( targetCell, pluralCellIds );
            targetCell.each( function( child, i ){
                var editable = editTarget && ! message.disabled(i);
                child.textarea( message.translation(i), editable ).setStrf(newFormat).setMode(edMode).setInvs(invMode);
                // listen for pluralized translation changes if target editable
                editTarget && bindTargetCell( child, i );
            } );
            targetCell.navigize( pluralCellTitles, pluralIndex||null ).on('wgTabSelect', function( event, tabIndex ){
                var textfield = editTarget && event.cell.editable();
                textfield && textfield.focus();
                self.setTrgMeta( message, tabIndex, targetCell );
                self.setStatus( message, tabIndex );
                self.fire('poTab', [ tabIndex ] );
            } );
        }
        // else initialize singular asset, listen for changes when target editable
        else {
            redraw && targetCell.redraw();
            targetCell.textarea( message.translation(), editTarget && ! message.disabled(0) ).setStrf(newFormat).setMode(edMode).setInvs(invMode);
            editTarget && bindTargetCell( targetCell, 0 );
        }
    }
    
    // creates listening closure with plural index    
    function bindTargetCell( cell, pluralIndex ){
        cell
        .on( EVENT_CHANGE, function( event, newTranslation, oldTranslation ){
            message.translate( newTranslation, pluralIndex );
            // update text in translation cell
            if( 0 === pluralIndex ){
                self.updateListCell( message, 'target' );
            }
            // clear fuzzy flag when translating
            if( message.fuzzy(pluralIndex) ){
                self.fuzzy( false, message, pluralIndex );
            }
            else {
                self.unsave( message, pluralIndex );
            }
            // fire event indicating when translation toggles between translated and untranslated
            // we need to also call setStatus, but note that this could fire twice (e.g. if invoked by fuzzy already)
            if( '' === newTranslation ){
                self.fire('poEmpty', [ true, message, pluralIndex ] );
                self.setStatus( message, pluralIndex );
            }
            else if( '' === oldTranslation ){
                self.fire('poEmpty', [ false, message, pluralIndex ] );
                self.setStatus( message, pluralIndex );
            }
        } )
        // re-index if translation text changed after edit:
        .on( EVENT_CHANGED, function(){
            self.dict && self.rebuildSearch();
            self.fire( EVENT_UPDATE, [ message ] );
        } );
    }
    
    
    // inner function renders asset context window when ready
    function setContextWindow( contextCell ){
        contextCell.off();
        var cellTitle = labels[LABEL_CONTEXT];
        if( contextCell.titled() !== cellTitle ){
            renderCellTitle( contextCell, cellTitle );
            // ensure translation status not displayed in context title
            self.setStatus( null );
        }
        contextCell.textarea( message.context(), true ).setMode(edMode).setInvs(invMode);
        // listen for context changes
        editContext && contextCell
            // visually update during context editing:
            .on( EVENT_CHANGE, function( event, newContext ){
                message.context( newContext );
                // update text in source cell
                self.updateListCell( message, 'source' );
                self.unsave( message, pluralIndex );
            } )
            // re-index in document if context changed after edit:
            .on( EVENT_CHANGED, function(){
                self.po.reIndex( message );
                self.dict && self.rebuildSearch();
                self.fire( EVENT_UPDATE, [ message ] );
            } )
        ;
    }
    
    function setCommentWindow( commentCell ){
        var cellTitle = labels[LABEL_COMMENTS];
        if( commentCell.titled() !== cellTitle ){
            renderCellTitle( commentCell, cellTitle );
        }
        commentCell.off()
            .on( EVENT_CHANGE, function( event, newComment ){
                message.comment( newComment );
                self.fire('poComment', [ message, newComment ] );
                self.unsave( message, pluralIndex );
            } )
            .textarea( message.comment(), true )
        ;
    }
    
    
    self.active = message;
    
    if( sourceCell ){
        setSourceWindow( sourceCell, sourceLocale );
    }
    
    if( contextCell ){
        setContextWindow( contextCell );
    } 

    if( targetCell && targetLocale ){
        // keeping navigated plural tab, but must be grabbed before cleared
        pluralIndex = targetCell.navigated() || 0;
        setTranslateWindow( targetCell, targetLocale, pluralIndex );
    }

    // allow direct comment editing if cell exists
    // this is only single-block plain text commenting for simple editors.
    if( commentCell /*&& commentCell !== preserveCell*/ ){
        setCommentWindow( commentCell );
    }
    
    // keep editing focus if possible (note: only establishes cell, specific plural fields will be forgotten)
    if( editingCell ){
        // handle plural to non-plural jumping
        // could keep drilling up, but should be impossible for more than one nested depth.
        if( ! editingCell.exists() ){
            editingCell = editingCell.parent();
        }
        // focus in on any new field in the place of the previous
        var editableText = editingCell.editable();
        if( editableText ){
            editableText.focus();
        }
    }

    // may be switching "format" mode, dictated by source text properties
    if( oldFormat !== newFormat ){
        /*var $root = $(self.rootDiv);
        if( newFormat ){
            $root.addClass( newFormat+'-format');
        }
        if( oldFormat ){
            $root.removeClass( oldFormat+'-format');
        }*/
        this.fmt = newFormat;
    }
    
    // only fire select event if newly loaded
    // possibly the wrong place for firing this, but lots of legacy to check before moving.
    reloading || self.fire('poSelected', [ message, pluralIndex ] );
};



/**
 * Unload previous translation, but keep current resize points - that means unbinding events too
 */
EditorPrototype.unloadActive = function(){
    var self = this;
    function emptyAndHide(cell){
        cell && cell.text('').hide();
    }
    function offAndClear(cell){
        cell && cell.off().clear();
    }
    emptyAndHide(self.$smeta);
    emptyAndHide(self.$tmeta);
    offAndClear(self.sourceCell);
    offAndClear(self.contextCell);
    offAndClear(self.targetCell);
    // why was comment cell not clearing?
    if( self.commentCell ) {
        self.commentCell.off();
    }
    if( self.active ){
        self.fire('poDeselected', [ self.active ] );
        self.active = null;
    }
    return this;
};
    


/**
 * Load nothing into editing area
 */
EditorPrototype.loadNothing = function(){
    var cell,
        self = this,
        translator = self.t, 
        edMode = self.mode||'',
        invMode = self.inv||false,
        fmtMode = self.fmt
    ;
    self.unloadActive();
    self.setStatus(null);
    if( cell = self.commentCell ){
        cell.textarea( '', false );
    }
    if( cell = self.sourceCell ){
        cell.textarea( '', false ).setStrf(fmtMode).setMode(edMode).setInvs(invMode);
        // Translators: Label for the source text window when no translation selected
        cell.title( translator._x('Source text not loaded','Editor')+':' );
    }
    if( cell = self.contextCell ){
        cell.textarea( '', false ).setMode(edMode).setInvs(invMode);
        // Translators: Label for the context window when no translation selected
        cell.title( translator._x('Context not loaded','Editor')+':' );
    }
    if( cell = self.targetCell ){
        cell.textarea('', false ).setStrf(fmtMode).setMode(edMode).setInvs(invMode);
        // Translators: Label for the translation editing window when no translation selected
        cell.title( translator._x('Translation not loaded','Editor')+':' );
    }
    this.fire('poSelected', [ null ] );
};



/**
 * Update table cell with new content as it is edited.
 */
EditorPrototype.updateListCell = function( message, colName ){
    var colIdx = this.getListColumns()[ colName ],
        rowIdx = this.po.indexOf( message ),
        row = this.listTable.row(rowIdx)
    ;
    // note that not all rows will be rendered due to off-screen buffering!
    if( row && row.rendered ){
        row.update( colIdx );
    }
};



/**
 * Create text suitable for rendering in a list cell.
 * Call this from getListEntry function for any fields that will also pass though updateListCell
 */
EditorPrototype.cellText = function( textContent ){
    // strip and decode HTML if it looks like any tags or encoding are present.
    // TODO make this optional, or use formatting instead of stripping...
    if( -1 !== textContent.indexOf('<') || -1 !== textContent.indexOf('&') ){
        textContent = stripHtml( textContent );
    }
    // Remove leading space, because indents look stupid in list rows
    // Except if whole thing is a space use NBSP to stop cell collapsing
    return textContent.replace(REGEX_LEADING_SPACE,'')||'\xA0';
};


/**
 * Specific Fuzzy support.
 * @return Boolean whether message was fuzzy before this was called
 */
EditorPrototype.fuzzy = function( setFuzzy, message, pluralIndex ){
    message = message || this.active;
    var wasFuzzy = message.fuzzy(pluralIndex);
    if( true === setFuzzy && ! wasFuzzy ){
        this.flag( 4, message, pluralIndex ) && this.fire('poFuzzy', [ message, true, pluralIndex ] );
    }
    else if( false === setFuzzy && wasFuzzy ){
        this.flag( 0, message, pluralIndex ) && this.fire('poFuzzy', [ message, false, pluralIndex ] );
    }
    return wasFuzzy;
};


/**
 * Generic flag/unflag support.
 * @param {number} newFlag
 * @param {Message} message
 * @param {number} pluralIndex
 * @return int|Boolean current flag, or whether new flag is set
 */
EditorPrototype.flag = function( newFlag, message, pluralIndex ){
    if( ! message ){
        message = this.active;
        pluralIndex = this.getTargetOffset();
        if( null == pluralIndex ) {
            return null;
        }
        // flag as one if asset has embedded plurals
        if( pluralIndex && message.targetForms() ){
            pluralIndex = 0;
        }
    }
    // query current flag if null passed
    var oldFlag = message.flagged( pluralIndex );
    if( null == newFlag ){
        return oldFlag;
    }
    // return false if flag won't be changed
    if( oldFlag === newFlag ) {
        return false;
    }
    // ok to set new flag, unless untranslated
    if ( newFlag && !message.translated(pluralIndex) ) {
        // console.error('Refusing to flag empty string');
        return false;
    }
    // poFlag event allows cancellation
    if (!this.fire('poFlag', [newFlag, oldFlag, message, pluralIndex])) {
        return false;
    }
    // setting new flag invokes update event and marks dirty
    message.flag(newFlag, pluralIndex);
    if (this.fire(EVENT_UPDATE, [message])) {
        this.unsave(message, pluralIndex);
    }
    this.setStatus(message, pluralIndex);
    return true;
};


/**
 * Add new message, or select it if it exists
 * @param {string} msgid
 * @param {string} msgctxt
 * @return Message
 */
EditorPrototype.add = function( msgid, msgctxt ){
    var i, message = this.po.get( msgid, msgctxt );
    if( message ){
        i = this.po.indexOf( message );
    }                
    else {
        i = this.po.length;
        message = this.po.add( msgid, msgctxt );
        // TODO sort, or at least prepend PO instead of appending
        // TODO add row to table rather than rebuilding?
        this.load( this.po, -1 );
        this.fire('poAdd', [ message ] );
        this.fire( EVENT_UPDATE, [ message ] );
    }
    if( this.lastSearch ){
        this.filter('');
    }
    this.listTable.select(i);
    return message;
};



/**
 * Delete message from document and redraw table.
 * could manipulate table inside wingrid, but seems messy
 * @param {Message} message
 */
EditorPrototype.del = function( message ){
    message = message || this.active;
    if( ! message ){
        return; // nothing to delete
    }
    var keepSearch = this.lastSearch,
        i = this.po.del( message )
    ;
    if( null != i ){
        this.unsave( message );
        this.fire('poDel', [ message ] );
        this.fire( EVENT_UPDATE, [ message ] );
        // rebuild table view
        this.reload();
        // complete rebuild of dict // @todo better if I could just remove
        this.dict && this.rebuildSearch();
        // most likely deleted current message
        this.active && this.active.equals(message) && this.unloadActive();
        // select previous, or most sensible alternative
        if( this.po.length ){
            if( keepSearch ){
                this.filter( keepSearch );
            }
            if( ! this.active ){
                i = Math.min( i, this.po.length-1 );
                this.listTable.select( i );
            }
        }
    }    
};



/**
 * Change editor monospace/coding mode state
 * @param {Boolean} mono whether switching to appropriate IDE (true) or defaulting to regular view (false)
 */
EditorPrototype.setMono = function( mono ){
    return this.setMode( mono ? 'code' : this.html ? 'html' : '' );
};



/**
 * Set escape/render mode
 * @param {string} newMode "code", "html" or ""
 * @return Editor
 */
EditorPrototype.setMode = function( newMode ){
    if( this.mode !== newMode ){
        this.mode = newMode;
        this.callTextareas( function(textarea){
            textarea.setMode( newMode );
        } );
        // toggling view mode may display different metadata, which in turn will require a cell redraw
        var message = this.active, relateCell = this.sourceCell;
        message && message.refs() && relateCell && this.setSrcMeta(message,relateCell) && relateCell.redraw();
    }
    return this;
};

/**
 * @return Boolean whether in monospace/code view
 */
EditorPrototype.getMono = function(){
    return 'code' === this.mode;
};


/**
 * Change editor "show invisibles" setting
 * @param {Boolean} showInvisibles
 * @return Editor
 */
EditorPrototype.setInvs = function( showInvisibles ){
    var oldMode = this.inv||false;
    if( oldMode !== showInvisibles ){
        this.inv = showInvisibles;
        this.callTextareas( function(textarea){
            textarea.setInvs( showInvisibles );
        } );
        this.fire( 'poInvs', [ showInvisibles ] );
    }
    return this;
};

EditorPrototype.getInvs = function(){
    return this.inv||false;
};


/**
 * Call a function on all current source, context and target textarea instances
 */
EditorPrototype.callTextareas = function( applyFunction ){
    function doApply( cell ){
        cell && cell.eachTextarea( applyFunction );
    }
    doApply(this.targetCell);
    doApply(this.contextCell);
    doApply(this.sourceCell);
    return this;
};


/**
 * Focus the most obvious translation textarea
 * @return Editor
 */
EditorPrototype.focus = function(){
    var field = this.getTargetEditable();
    if( field ){
        field.focus();
    }
    return this;
};




EditorPrototype = null;

return exports;
}({},window,document) );

CommonJS.register("$12", function(exports,window,document){ /* module: js/editor/poedit.js */
/**
 * POEdit style translation editor
 */

var parent = CommonJS.require("$23","base.js");


/**
 * Create a new editor in top level HTML element
 */
exports.init = function( rootDiv ){
    var editor = new POEditor,
        loadingLabel = 'Loading..';
    
    // Build and bind initial UI elements:
    // split root window horizontally, assets at top, changing area at bottom
    var rootCell = editor.setRootCell( rootDiv ),
        children = rootCell.splity( 'po-list', 'po-edit'),
        listCell = children[0],
        editCell = children[1];
    
    // split edit cell into translating area and comment box
    children = editCell.splitx( 'po-trans', 'po-comment' );
    var localesCell = children[0],
        commentCell = children[1].header(loadingLabel);

    // split locales into source and target
    children = localesCell.splity('po-source','po-target');
    var sourceCell = children[0].header(loadingLabel),
        targetCell = children[1].header(loadingLabel);
    
    // default proportions at startup
    rootCell.distribute( [ 0.34 ] );
    editCell.distribute( [ 0.8 ] );
    
    // bind source and target to list columns
    editor.setListCell( listCell );
    editor.setSourceCell( sourceCell );
    editor.setTargetCell( targetCell );

    // set other significant cells as object properties
    editor.commentCell = commentCell;    
    
    // lock po editor by default
    editor.editable.source = false;
    return editor;
};



/**
 * Editor subclass for "poedit"
 */
function POEditor(){
    this.init()._validate(/*'POEditor'*/);
    // Set default source locale
    this.sourceLocale = { lang:'en', label:'English', plurals:[ 'One','Other' ] };
}

var POEditorPrototype = POEditor.prototype = parent.extend( POEditor );



/**
 * Implement getListHeadings to populate list cell header
 */
POEditorPrototype.getListHeadings = function(){
    var t = this.t || { _x:function(s){return s;} },
        // Translators: List heading showing preview of English text for each item
        h = [ t._x('Source text','Editor') ]
    ;
    if( this.targetLocale ){
        // Translators: List heading showing preview of translated text for each item
        h[1] = t._x('Translation','Editor')
    }
    return h;
};


/**
 * Implement getListColumns to know which column displays which field
 */
POEditorPrototype.getListColumns = function(){
    var c = { source: 0 };
    if( this.targetLocale ){
        c.target = 1;
    }
    return c;
};


/**
 * Implement getListEntry to create closure of column getters for a message
 */
POEditorPrototype.getListEntry = function( message ){
    var flatten = this.cellText,
        getters = [
            // 0 (source)
            function(){
                var node,
                    msgid = flatten( message.source()||'' ),
                    msgctxt = message.context()
                ;
                if( msgctxt ){
                    node = document.createElement('p');
                    node.appendChild( document.createElement('mark') ).innerText = msgctxt;
                    node.appendChild( document.createTextNode('\xA0'+msgid) );
                    return node;
                }
                return msgid;
            }
        ]
    ;
    // 1 (target)
    if( this.targetLocale ) {
        getters[1] = function(){
            return flatten(message.translation()||'');
        };
    }
    return getters;
};



/**
 * POEdit-specific stats.
 * Note that plural offsets do not count in stats. translated means ALL forms translated. same for flags
 */
POEditorPrototype.stats = function(){      
    var messages = this.po,
        numStrings = messages.length,
        numTrans = 0,
        numEmpty = 0,
        numFuzzy = 0
    ;
    messages.each( function( key, message ){
        if( message.fuzzy() ){
            numFuzzy++;
        }
        else if( message.translated() ){
            numTrans++;
        }
        else {
            numEmpty++;
        }
    } );            
    return {
        t: numStrings,
        p: numTrans.percent(numStrings)+'%',
        f: numFuzzy,
        u: numEmpty
   };
};

/**
 * Allow editing of source strings (POT mode)
 */
POEditorPrototype.unlock = function(){
    var self = this, locale = self.targetLocale;
    if( ! self._unlocked ){
        // define that source and context are editable in POT file
        self.editable = {
            source: true,
            context: true,
            target: false
        };
        if( self.po ){
            self.po.unlock();
        }
        // swap translation cell to use for context
        self.contextCell = self.targetCell;
        delete self.targetCell;
        // place target locale into temporary _unlocked property indicating unlocked (POT) mode
        // there was never a locale to begin with, it won't be possible to lock again. which is fine
        if( locale ){
            self._unlocked = locale;
            delete self.targetLocale;
            this.reload();
            self.fire( 'poLock', [ false ] );
        }
        // unlock done - in POT mode
        self.active && self.loadMessage( self.active );
    }
};

/**
 * Prevent editing of source strings (standard PO mode)
 */
POEditorPrototype.lock = function(){
    var self = this, locale = this._unlocked;
    if( locale ){
        // reinstate target locale from _unlocked property indicating locked (PO) mode
        self.targetLocale = locale;
        delete self._unlocked;
        if( self.po ){
            self.po.lock(locale);
        }
        // define that source is not editable, context is not shown and target is editable again
        self.editable = {
            source: false,
            context: false,
            target: true
        };
        // swap context function back to target translations
        self.targetCell = self.contextCell;
        delete self.contextCell; 
        this.reload();
        // lock done - back in PO mode
        self.fire( 'poLock', [ true, locale ] );
        self.active && self.loadMessage( self.active );
    }
};


/**
 * Whether in PO mode (not editing sources)
 * @return {boolean}
 */
POEditorPrototype.locked = function(){
    return !this._unlocked;
};


/**
 * Render contextual UI for current translation.
 * Namely Fuzzy toggle (Ctrl-U) and Suggest function (Ctrl-J)
 */
POEditorPrototype.setStatus = function( message /*, pluralIndex*/ ){
    var $el = this.$tnav, labels = this.labels;
    // remove navigation if no message passed (unload)
    if( null == message ){
        if( $el ){
            $el.remove();
            this.$tnav = null;
        }
        return;
    }
    // lazy create navigation container displaying status
    if( ! $el ){
        $el = $('<nav></nav>')
            .append( createFuzzyButton(this) )
            .append( createSuggestButton(this) )
            .appendTo( this.targetCell.header() )
        ;
        this.$tnav = $el;
    }
    // flag top-level element to affect button styles
    var classes = [];
    if( message.translated() ){
        if( message.fuzzy() ){
            classes.push('po-fuzzy');
        }
    }
    else {
        classes.push('po-empty');
    }
    $el.attr('class',classes.join(' '));
};






/**
 * Default sorter such that untranslated items appear first, then fuzzy. equal items being compared as string
 * TODO would actually prefer to have columns for document order and status.
 * @return Function
 */
POEditorPrototype.getSorter = function(){
    function defaultWeightComparison( a, b ){
        var x = a.weight(),
            y = b.weight();
        if( x === y ){
            return defaultStringComparison( a, b );
        }
        if( x > y ){
            return -1;
        }
        return 1;
    }
    function defaultStringComparison( a, b ){
        return a.hash().localeCompare( b.hash() );
    }
    var self = this;
    /* @return int -1 if a should be first, 1 if b, or zero if equal, which they should never be */
    return function( order ){
        var messages = self.po, 
            compare = self.locked() ? defaultWeightComparison : defaultStringComparison
        ;
        order.sort( function( i, j ){
            return compare( messages.row(i), messages.row(j) );
        } );
    };
};


/*
POEditorPrototype.handle = {
    poEmpty: function( isEmpty, message, pluralIndex ){
        //this.setStatus( message, pluralIndex );
        //console.log( 'poEmpty', isEmpty )
    },
    poFuzzy: function( message, state, pluralIndex ){
        //console.log('poFuzzy', state );
    },
    poSelected: function( message, pluralIndex ) {
        //console.log('poSelected', message.translation(pluralIndex) );
    },
    poTab: function( pluralIndex ) {
        //console.log('poTab', pluralIndex );
    }
};
*/



// Note that these styles are compatible with WordPress for the plugin
function createIconButton(icon){
    var $button = $('<button type="button" class="button button-small icon icon-'+icon+' hastip"></button>');
    CommonJS.require("$11","tooltip.js").init($button);
    return $button; 
}


function createFuzzyButton( editor ){
    return createIconButton('cloud')
        .attr('title', editor.labels[8]+' (Ctrl-U)')
        .click(function(event){
            event.preventDefault();
            editor.focus().fuzzy( ! editor.fuzzy() );
        })
    ;
}


function createSuggestButton( editor ){
    return createIconButton('robot')
        .attr('title', editor.labels[9]+' (Ctrl-J)')
        .click(function(event){
            event.preventDefault();
            // Because suggestion method is not built into abstract editor, we can only fire an event on base.js
            editor.fire('poHint');
        })
    ;
}

return exports;
}({},window,document) );

CommonJS.register("$13", function(exports,window,document){ /* module: js/editor/hotkeys.js */
/**
 * Common hotkey bindings for translation editors.
 */

var KEY_COPY  = 66, // "b"
    KEY_CLEAR = 75, // "k"
    KEY_SAVE  = 83, // "s"
    KEY_FUZZY = 85, // "u"
    KEY_PREV  = 38, // up arrow 
    KEY_NEXT  = 40, // down arrow
    KEY_ENTER = 13, // return
    KEY_INVIS = 73, // "i"
    KEY_HINT = 74,  // "j" <- suggest

    keys = {
        copy:  KEY_COPY,
        clear: KEY_CLEAR,
        save:  KEY_SAVE,
        fuzzy: KEY_FUZZY,
        next:  KEY_NEXT,
        prev:  KEY_PREV,
        enter: KEY_ENTER,   
        invis: KEY_INVIS,
        hint: KEY_HINT
    },
    
    shiftable = {
        38: true,
        40: true,
        73: true
    },
    
    commands = {};



/**
 * Copy source text to target text
 */
commands[ KEY_COPY ] = function( event, editor ){
    var asset = editor.current();
    if( asset ){
        asset.normalize();
        // This works, but will copy all plurals, when we want only active.
        editor.focus().pasteMessage(asset);
    }
};


/**
 * Clear target cell contents
 */
commands[ KEY_CLEAR ] = function( event, editor ){
    var asset = editor.current();
    if( asset ){
        asset.untranslate();
        // as with copy, this will blank out all plurals which may not be what we want.
        editor.focus().pasteMessage(asset);
    }
};


/**
 * Mark current message as Fuzzy
 */
commands[ KEY_FUZZY ] = function( event, editor ){
    editor.focus().fuzzy( ! editor.fuzzy() );
};


/**
 * Commit current translation
 */
commands[ KEY_ENTER ] = function( event, editor ){
    var field = editor.getFirstEditable();
    // IE<=10 fails to find editable field when in split plural pane.
    if( field ){
        // field.blur();
        // forceEditableUpdate( field, 'ping' );
        nextTarget( editor, 1, true );
    }
};


/**
 * Move to next asset (optionally checking translated state)
 */
commands[ KEY_NEXT ] = function( event, editor ){
   nextTarget( editor, 1, event.shiftKey );
};


/**
 * Move to previous asset (optionally checking translated state)
 */
commands[ KEY_PREV ] = function( event, editor ){
   nextTarget( editor, -1, event.shiftKey );
};


/**
 * Toggle invisibles
 */
commands[ KEY_INVIS ] = function( event, editor ){
    if( ! event.shiftKey ){
        return false;
    }
    editor.setInvs( ! editor.getInvs() );
};



/**
 * Force modified message to reload
 *
function forceEditableUpdate( field ){
    if( field || ( field = editor.getFirstEditable() ) ){
        field.fire();
    }
    return field;
}*/



/**
 * Move editor to next asset in it list, optionally skipping already-translated assets
 */
function nextTarget( editor, direction, skipTranslated ){
    editor.next( direction, skipTranslated, skipTranslated );
}




/**
 * Command bindings
 * @return {Object}
 */
exports.init = function( editor, listener ){
    
    // commands active in scope
    var enabled = {};
    
    function onKeyDown(event){
        if( event.isDefaultPrevented() ){
            //console.error('stopped');
            return true;
        }
        if( ! event.metaKey && ! event.ctrlKey ){
            //console.error('no meta');
            return true;
        }
        // Actual command initiated
        var whichKey = event.which;
        if( ! enabled[whichKey] ){
            // console.error('not enabled', whichKey );
            return true;
        }
        // Command or Ctrl is down during press
        var command = commands[ whichKey ];
        if( ! command ){
            throw new Error('command undefined #'+whichKey );
        }
        
        // Ignore if modifier key down (except that supported)
        if( event.altKey ){
            return true;
        }
        if( event.shiftKey && ! shiftable[whichKey] ){
            return true;
        }
            
        // execute command with editor interface provided
        if( false === command( event, editor ) ){
            return true;
        }
        
        // command did not cancel, so we're owning this.
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    
    // listen for hot keys (Ctrl/Cmd)
    $( listener||window ).on( 'keydown', onKeyDown );
    
    
    // return binding method for enabling commands
    return {
        // add/overwrite a new command
        add: function( key, callback ){
            var code = keys[key];
            commands[code] = callback;
            return this;
        },
        // enable existing commands
        enable: function(){
            var code, i;
            for( i in arguments ){
                code = keys[ arguments[i] ];
                enabled[code] = true;
            }
            return this;
        },
        // destroy bindings and scope
        disable: function(){
            $( listener||window ).off( 'keydown', onKeyDown );
            editor = listener = enabled = null;
        }
    };
};







return exports;
}({},window,document) );

CommonJS.register("$24", function(exports,window,document){ /* module: js/utils/collection.js */
/**
 * Abstraction of simple array collection
 */

exports.init = function( /*obj*/ ){
    return new Collection/*( obj )*/;
};

function Collection( /*obj*/ ){
    this.reIndex( [] );
    /*/ add initial data (not used)
    if( obj ){
        var key;
        for( key in obj ){
            this.add( key, obj[key] );
        }
    }*/
}

var CollectionPrototype = Collection.prototype;


/* re-index ordinates from keys - does not affect any data values */
CollectionPrototype.reIndex = function( keys ){
    var a = {},
        i = -1, 
        t = keys.length
    ;
    while( ++i < t ){
        a[ keys[i] ] = i;
    }
    this.keys = keys;
    this.length = i;
    this.ords = a;
};


CollectionPrototype.key = function( ord, newKey ){
    if( null == newKey ){
        return this.keys[ ord ];
    }
    // change key of item at ord */
    var oldKey = this.keys[ord],
        oldOrd = this.ords[newKey];
    if( newKey !== oldKey ){
        if( null != oldOrd ){
            throw new Error('Clash with item at ['+oldOrd+']');
        }
        this.keys[ ord ] = newKey;
        delete this.ords[ oldKey ];
        this.ords[ newKey ] = ord;
    }
    return ord;
};


CollectionPrototype.indexOf = function( key ){
    var ord = this.ords[ key ];
    return null == ord ? -1 : ord;
};


CollectionPrototype.add = function( key, value ){
    var ord = this.ords[key];
    if( null == ord ){
        this.keys[ this.length ] = key;
        ord = this.ords[key] = this.length++;
    }
    this[ord] = value;
    return ord;
};


CollectionPrototype.get = function( key ){
    return this[ this.ords[key] ];
};


CollectionPrototype.has = function( key ){
    return null != this.ords[key];
};



CollectionPrototype.del = function( key ){
    var index = this.ords[key];
    this.cut( index, 1 ); 
};



CollectionPrototype.cut = function( start, length ){
    length = length || 1;
    // splicing self should affect internal indexes
    var items = [].splice.call( this, start, length );
    // do same to internal key index
    this.keys.splice( start, length );
    // no need to re-index ordinates
    this.reIndex( this.keys );
    return items;
};


/**
 * @param Function ( key, value, offset )
 */
CollectionPrototype.each = function( callback ){
    var i = -1,
        a = this,
        k = a.keys,
        t = a.length
    ;
    while( ++i < t ){
        callback( k[i], a[i], i );
    }
    return this;
};



/**
 * TODO would like to use [].sort.call( this, callback ), but no way to keep key association??
 * this method means double iteration in addition to sorting call. Dislike.
 */
CollectionPrototype.sort = function( callback ){
    var i = -1,
        t = this.length,
        key, keys = this.keys,
        ords = this.ords,
        pair, pairs = []
    ;
    // keep keys and values in temporary binding
    while( ++i < t ){
        pairs[i] = [ this[i], keys[i] ];
    }
    // do actual sorting from passed function
    pairs.sort( function( a, b ){
        return callback( a[0], b[0] );
    } );
    // rebuild collection in new order
    for( i = 0; i < t; i++ ){
        // swap out value
        pair = pairs[i];
        this[i] = pair[0];
        // index
        key = pair[1];
        keys[i] = key;
        ords[key] = i;
    }

    return this;
};


CollectionPrototype.join = function( glue ){
    return [].join.call( this, glue );
};


CollectionPrototype = null;

return exports;
}({},window,document) );

CommonJS.register("$25", function(exports,window,document){ /* module: js/file/gettext/format.js */
/**
 * Gettext PO file formatter 
 *
 * Creates a closure containing the desired wrapping width.
 * Primarily constructed this way to save overhead of compiling RegExp.
 * 
 * @return Object providing the same interface as LocoPo static PHP class.
 */
exports.create = function( width ){
    
    var refswrap,
        wordwrap,
        REGEX_BREAK = /(?:\r\n|[\r\n\v\f\u2028\u2029])/g,     // <- matches single break like \R
        //REGEX_BREAK_MULTI = /[\r\n\v\f\u2028\u2029]+/g,       // <- matches any and all series of breaks as one stream
        REGEX_REFS_SPACES = /[ \r\n]+/g,                      // <- whitespace observed in file references
        REGEX_ESCAPABLE = /[\t\v\f\x07\x08\\\"]/g,            // <- characters that must be slashed, excluding line breaks
        ESCAPE_LITERALS = {
            '\t': '\\t',
            '\v': '\\v',
            '\f': '\\f',
            '\x07': '\\a',
            '\x08': '\\b'/*,
            '\n': '\\n',
            '\r': '\\r',*/
        };

    function addSlashesReplace(chr){
        return ESCAPE_LITERALS[chr] || '\\'+chr;
    }


    // default width if invalid value
    if( null == width || isNaN( width = Number(width) ) ){
        width = 79;
    }

    // treat negative values as if 0 was specified
    if( width > 0 ){
        refswrap = createWrapper( width-3, ' ' );
        wordwrap = createWrapper( width-2, '-– \\.,:;\\?!\\)\\]\\}\\>');
    }
    /*/ msgcat still wraps references with --no-wrap,  but not with --wrap=0
    else {
        refswrap = createWrapper( 76, ' ' );
    }*/
    
    return {

        /**
         * JavaScript port of LocoPo::pair
         */
        pair: function( key, text ){
            // quick exit for empty text
            if( ! text ){
                return key+' ""';
            }
            // escape entire string, excluding breaks
            text = text.replace( REGEX_ESCAPABLE, addSlashesReplace );
            // do special line break replacement
            var nbr = 0;
            text = text.replace( REGEX_BREAK, function(){
                nbr++;
                return '\\n\n';
            } );
            // If text has actual breaks, it will wrap even if we've not set a wrap
            if( nbr ){
                // yep
            }
            // if unwrapped line (including keyword, space and quotes) exceeds width, we must wrap
            else if( width && width < ( text.length + key.length + 3 ) ){
                // yep
            }
            // else no wrapping required, return unwrapped single line
            else {
                return key+' "'+text+'"';
            }
        
            // The remaining text will be wrapped        
            var lines = [ key+' "' ], 
                split = text.split('\n');
            // soft wrap each hard-broken line  
            if( wordwrap ){
                var i = -1,
                    t = split.length;
                while( ++i < t ){
                    wordwrap( split[i], lines );
                }
            }
            // else we have breaks, but no soft wrapping
            else {
                lines = lines.concat( split );
            }
            
            return lines.join("\"\n\"")+'"';
        },
        
        
        
        /**
         * JavaScript port of LocoPo::prefix
         */   
        prefix: function( text, prefix ){
            var lines = text.split( REGEX_BREAK );
            return prefix+lines.join('\n'+prefix);
        },

        
        /**
         * JavaScript port of LocoPo::refs
         */
        refs: function( text ){
            var prefix = '#: ';
            text = text.replace( REGEX_REFS_SPACES, ' ', text );
            if( refswrap ){
                text = refswrap( text, [] ).join('\n'+prefix);
            }
            return prefix+text;
        }
    };
};




    
    
function createWrapper( width, chars ){
    var REGEX_SOFT = new RegExp('^.{0,'+(width-1)+'}['+chars+']' ),
        REGEX_LONG = new RegExp('^[^'+chars+']+');
    // wrap a single line of text onto one or more lines
    return function( text, lines ){
        var length = text.length, matched, line, trunc;
        while( length > width ){
            matched = REGEX_SOFT.exec(text) || REGEX_LONG.exec(text);
            if( null == matched ){
                //throw new Error('Wrapping error neither '+REGEX_SOFT+' nor '+REGEX_LONG+' matches '+text );
                break;
            }
            line = matched[0];
            lines.push( line );
            // truncate and next..
            trunc = line.length;
            length -= trunc;
            text = text.substr( trunc );
            /*if( ( '' === text && 0 !== length ) || ( 0 === length && '' !== text ) ){
                throw new Error('Truncation error '+text);
            }*/
        }        
        if( 0 !== length ){
            lines.push( text );
        }
        return lines;
    };
}
return exports;
}({},window,document) );

CommonJS.register("$38", function(exports,window,document){ /* module: js/utils/list.js */
/**
 * Like Collection, but no hashmap. more like basic array with simple utils
 * 
 */

exports.init = function(){
    return new List();
};

function List(){
    this.length = 0;
}

var ListPrototype = List.prototype;


ListPrototype.push = function( value ){
    this[ this.length++ ] = value;
    return this;
};

ListPrototype.sort = function( callback ){
    [].sort.call( this, callback );
    return this;
};

ListPrototype.each = function( callback ){
    var  i = -1, length = this.length;
    while( ++i < length ){
        callback( i, this[i] );
    }
    return this;
};

return exports;
}({},window,document) );

CommonJS.register("$26", function(exports,window,document){ /* module: js/file/messages.js */
/**
 * Generic messages document containing message instances
 */


exports.extend = function( subClass ){
    return subClass.prototype = new Messages;
};



function Messages(){
    
}

var MessagesPrototype = Messages.prototype = CommonJS.require("$36","abstract.js").init(['add','load']);


/**
 * Row getter
 */
MessagesPrototype.row = function( i ){
    return this.rows[i];
};


/** 
 * Place in editable-translation mode by setting new locale
 * This comes from original POEdit concept where source strings are not editable during translation of targets
 */
MessagesPrototype.lock = function( locale ){
    return this.locale( locale || { lang:'zxx', label:'Unknown', nplurals: 1, pluraleq: 'n!=1' } );
};


/**
 * Place in "template" mode, returning previously locked locale
 * See this.lock
 */
MessagesPrototype.unlock = function(){
    var loc = this.loc;
    this.loc = null;
    return loc;
};



/**
 * Default target locale setter
 */
MessagesPrototype.locale = function( locale ){
    if( null == locale ){
        locale = this.loc;
    }
    else {
        locale = CommonJS.require("$35","locale.js").cast(locale);
        this.loc = locale;
    }
    return locale;
};


/**
 * Iterator
 * @param {Function} callback Accepting ( key, message, offset )
 */
MessagesPrototype.each = function( callback ){
    this.rows.each( callback );
    return this;
};


/**
 * Get the numeric index of a message in document
 * Requires message to implement the hash method if idx property not set to start with
 */
MessagesPrototype.indexOf = function( message ){
    if( 'object' !== typeof message ){
        message = this.get( message );  // <- allow passing of id
    }
    if( ! message ){
        return -1;
    }
    if( null == message.idx ){
        message.idx = this.rows.indexOf( message.hash() );
        // TODO could this return -1 ?
    }
    return message.idx;
};


/**
 * Default message getter fetches by ID
 * @return Message or null of not found
 */
MessagesPrototype.get = function( key ){
    return this.rows && this.rows.get( key );
};


/**
 * Remove a message from the document.
 * @return int index if item removed
 */
MessagesPrototype.del = function( message ){
    var ord = this.indexOf( message );
    if( -1 !== ord ){
        var removed = this.rows.cut( ord, 1 );
        if( removed && removed.length ){
            this.length = this.rows.length;
            // cached messages indexes are now wrong:
            this.rows.each( function( msgid, message, index ){
                message.idx = index;
            } );
            return ord;
        }
    }
};


/**
 * Re-index a message within this document.
 */
MessagesPrototype.reIndex = function( message, inc ){
    var ord = this.indexOf(message),
        key = message.hash(),
        clash = this.rows.indexOf(key);
    if( clash === ord ){
        return ord;
    }
    if( -1 !== clash ){
        inc = (inc||0)+1;
        // @todo need a better way to handle this, perhaps fire an poError event
        message.source( 'Error, duplicate '+String(inc)+': '+message.source() );
        return this.reIndex( message, inc );
    }
    // safe to re-index this message in the document
    return this.rows.key( ord, key );
};


/**
 * Sort directly on collection, modifying document order
 * @return Messages
 */
MessagesPrototype.sort = function( callback ){
    this.rows.sort( callback );
    return this;
};


/**
 * Export rows as simple list detached from rows property which maintains document order
 * @return List
 */
MessagesPrototype.export = function(){
    var r = -1,
        original = this.rows, 
        length = original.length,
        exported = CommonJS.require("$38","list.js").init()
    ;
    while( ++r < length ){
        exported.push( original[r] );
    }
    return exported;
};




// clean up

MessagesPrototype = null;
return exports;
}({},window,document) );

CommonJS.register("$27", function(exports,window,document){ /* module: js/file/message.js */
/**
 * Generic message unit object for holding single source/target translation
 * - Primarily designed for PO, but extendable for any format
 * - Message can contain multiple strings for the purpose of plurals
 */


exports.extend = function( subClass ){
    return subClass.prototype = new Message;
};


/**
 * Simple overloaded string property getter/setter
 * @access private
 * @return {Message|String}
 */
function getSetString( message, prop, value ){
    if( null == value ){
        return message[prop]||'';
    }
    message[prop] = value||'';
    return message;
}


/**
 * Don't set object references via prototype - Set them in child constructor only
 * @property {Array} drt Dirty state
 * 
 * @property {array} src Source texts
 * @property {array} msg Translation texts
 * @property {array} lck Lock state for each form 
 * @property {array} err Errors for each form after validation
 * @property {array} srcF source plural rules (when embedded)
 * @property {array} msgF target plural rules (when embedded)
 * @property {string} ctx Message context
 * @property {string} rf File references
 * @property {array} tg Tag references (projects only)
 */
function Message(){
    this.id = '';
    this._id = '';
}


var MessagePrototype = Message.prototype;

/* set single flag for plural offset, or all offsets */
MessagePrototype.flag = function( flag, offset ){
    var flags = this.flg || ( this.flg = [] );
    // ok to set flag on specific offset
    if( null != offset ){
        flags[ offset ] = flag;
    }
    else {
        // Flag all forms in message
        var i = Math.max( flags.length, this.src.length, this.msg.length );
        while( 0 !== i-- ){
            flags[i] = flag;
        }
    }
    return this;
};

/* test whether flagged at plural index, or at all */
MessagePrototype.flagged = function( offset ){
    var flags = this.flg || [];
    // with offset passed, return specific flag integer
    if( null != offset ){
        return flags[offset]||0;
    }
    // with no offset return boolean whether any non-zero flags set
    var i = flags.length;
    while( 0 !== i-- ){
        if( flags[i] ){
            return true;
        }
    }
    return false;
};


/* get all unique flags across all offsets */
MessagePrototype.flags = function(){
    var f,
        done = {},
        unique = [],
        flags = this.flg || [],
        i = flags.length
    ;
    while( 0 !== i-- ){
        f = flags[i];
        if( ! done[f] ){
            done[f] = true;
            unique.push(f);
        }
    }
    return unique;
};


/* test whether given flag is set on plural index or any index */
MessagePrototype.flaggedAs = function( flag, offset ){
    var flags = this.flg || [];
    // with offset passed, return specific match
    if( null != offset ){
        return flag === flags[offset]||0;
    }
    // with no offset return boolean whether any flags match
    var i = flags.length;
    while( 0 !== i-- ){
        if( flags[i] === flag ){
            return true;
        }
    }
    return false;
};


/* test whether flagged with fuzzy */
MessagePrototype.fuzzy = function( offset, markFuzzy ){
    var LOCO_FLAG_FUZZY = 4, 
        wasFuzzy = this.flaggedAs( LOCO_FLAG_FUZZY, offset )
    ;
    if( null != markFuzzy ){
        this.flag( markFuzzy ? LOCO_FLAG_FUZZY : 0, offset );
    }
    return wasFuzzy;
};


/* allow multiple source plurals by default */
MessagePrototype.source = function( sourceText, offset ){
    if( null == sourceText ){
        return this.src[ offset||0 ] || '';
    }
    this.src[ offset||0 ] = sourceText;
    return this;
};


MessagePrototype.plural = function( sourceText, offset ){
    if( null == sourceText ){
        return this.src[ offset||1 ] || '';
    }
    // else set plural source
    this.src[ offset||1 ] = sourceText||'';
    return this;
};

/**
 * Get message-embedded plural rules for source locale, e.g. ["One","Other"]
 * @return Array | null
 */
MessagePrototype.sourceForms = function(){
    return this.srcF;
};

/**
 * Get message-embedded plural rules for target locale, e.g. ["Zero","=1","Other"]
 * @return Array | null
 */
MessagePrototype.targetForms = function(){
    return this.msgF;
};


MessagePrototype.each = function( callback ){
    var i = -1,
        sources = this.src,
        targets = this.msg,
        longest = Math.max( sources.length, targets.length );
    while( ++i < longest ){
        callback( i, sources[i], targets[i] );
    }
    return this;
};


MessagePrototype.count = function(){
    return Math.max( this.src.length, this.msg.length );
};


MessagePrototype.pluralized = function(){
    return this.src.length > 1 || this.msg.length > 1;
};


MessagePrototype.translate = function( msgstr, i ){
    this.msg[ i||0 ] = msgstr||'';
    return this;
};

MessagePrototype.untranslate = function( i ){
    if( null != i ){
        this.msg[i] = '';
    }
    else {
        var m = this.msg,
            t = m.length;
        for( i = 0; i < t; i++ ){
            m[i] = '';
        }
    }
    return this;
};

MessagePrototype.translation = function( i ){
    return this.msg[ i||0 ]||'';
};

MessagePrototype.errors = function( i ){
    //return ['Test error 1 ['+i+']', 'Test error 2 ['+i+']'];
    return this.err && this.err[ i||0 ] || [];
};

/* TODO hints and suggestions?
MessagePrototype.hints = function( i ){
    return this.hnt && this.hnt[ i||0 ] || [];
};
MessagePrototype.hint = function( i, message ){

};*/

MessagePrototype.translated = function( i ){
    // test if given form is translated
    if( null != i ){
        return !!this.msg[i];
    }
    // else return whether ALL forms translated
    // watch out for empty redundant forms
    var m = this.msg, t = m.length;
    for( i = 0; i < t; i++ ){
        if( ! m[i] ){
            return false;
        }
    }
    return true;
};

MessagePrototype.untranslated = function( i ){
    // test if given form is empty
    if( null != i ){
        return !this.msg[i];
    }
    // else return whether ALL forms are empty
    var m = this.msg, t = m.length;
    for( i = 0; i < t; i++ ){
        if( m[i] ){
            return false;
        }
    }
    return true;
};


MessagePrototype.comment = function( text ){
    return getSetString(this,'cmt',text);
};

MessagePrototype.notes = function( text ){
    return getSetString(this,'xcmt',text);
};

MessagePrototype.refs = function( text ){
    return getSetString(this,'rf',text);
};

MessagePrototype.format = function( text ){
    return getSetString(this,'fmt',text);
};

MessagePrototype.context = function( text ){
    return getSetString(this,'ctx',text);
};



/**
 * Tags are not supported by default (Loco projects only
 * @return {Array|null}
 */
MessagePrototype.tags = function(){
    return this.tg;
};


/**
 * Convert message block to simple string
 * Mainly used for search indexing
 */
MessagePrototype.toString = MessagePrototype.toText = function(){
    return this.src.concat( this.msg, this.id, this.ctx ).join(' ');
};


/**
 * Get a weight for sorting algorithm
 */
MessagePrototype.weight = function(){
    var weight = 0;
    if( ! this.translation() ){
        weight += 2;
    }
    if( this.fuzzy() ){
        weight += 1;
    }
    return weight;
};


/**
 * Test if another message is identical to self
 */
MessagePrototype.equals = function( message2 ){
    return this === message2 || this.hash() === message2.hash();
    // return this === message2 || ( this.source() === message2.source() && this.context() === message2.context() ); // <- PO legacy
};



/**
 * @abstract
 */
MessagePrototype.hash = function(){
   return this.id; 
};


/**
 * copy source texts to targets where they exist
 */
MessagePrototype.normalize = function(){
    var i = this.msg.length;
    while( 0 !== i-- ){
        this.msg[i] = this.src[i]||'';
    }
};


/**
 * Test if message at offset is protected from editing 
 * (default is no, unless explicitly locked)
 */
MessagePrototype.disabled = function( i ){
    var locks = this.lck || [];
    return !! locks[i||0];
};


/**
 * Protect message from being edited - cases .disable to return true
 */
MessagePrototype.disable = function( i ){
    var locks = this.lck || ( this.lck = [] );
    locks[i||0] = true;
    return this;
};



/**
 * Test whether message is dirty (unsaved)
 */
MessagePrototype.saved = function( pluralIndex ){
    var dirtyState = this.drt;
    if( null == dirtyState ){
        return true;
    } 
    // with plural index, test specific form
    if( null != pluralIndex ){
        return !dirtyState[pluralIndex];
    }
    // else at least something might be dirty 
    var index = dirtyState.length;
    while( 0 !== index-- ){
        if( dirtyState[index] ){
            return false;
        }
    }
    return true;
};


/**
 * Set dirty state for a specific plural index default to singular form
 */
MessagePrototype.unsave = function( pluralIndex ){
    var dirtyState = this.drt || ( this.drt = [] ) ;
    dirtyState[ pluralIndex||0 ] = true;
    return this;
};


/**
 * Clear dirty state for a specific plural index
 */
MessagePrototype.save = function( pluralIndex ){
    // without plural index, clear dirty flag for all forms
    if( null == pluralIndex ){
        this.drt = null;
    }
    // with plural index, clear flag for specific form
    else {
        var dirtyState = this.drt || ( this.drt = [] ) ;
        dirtyState[pluralIndex] = false;
    }
    return this;
};


/**
 * Check if message is the same one as passed
 */
MessagePrototype.is = function( other ){
    return other && ( other === this || other.idx === this.idx );
};


/**
 * Check if message is escaped for HTML
 */
MessagePrototype.isHTML = function( bool ){
    if( null == bool ){
        return this.htm||false;
    }
    this.htm = bool;
};


/**
 * Check for common translation errors.
 * Works, but is this the best place for this when it can't be shared with other editors, such as the management view?
 * @return Array list of problems found in plain english
 *
MessagePrototype.errors = function( pluralIndex ){
    var errors = [],
        source = this.src[pluralIndex||0]||'',
        target = this.msg[pluralIndex||0]||'',
        targetLength = target.length
    ;
    if( targetLength ){
        var whitespace = String('\r\n\t '),
            lastIndex = targetLength - 1,
            lastChar = target.charAt(lastIndex)
        ;
        // check if target ends in whitespace that doesn't match the source text
        if( -1 !== whitespace.indexOf(lastChar) && lastChar !== source.charAt(lastIndex) ){
            errors.push("Translation has trailing space, but the source text doesn't match");
        }
    }
    return errors;
};*/


// clean up 
MessagePrototype = null;

return exports;
}({},window,document) );

CommonJS.register("$14", function(exports,window,document){ /* module: js/file/gettext/po.js */
/**
 * Object for holding an internal representation of a PO file.
 */


// hard-coded PO file headers in correct order
function commonHeaders ( datenow ){
    return {
        'Project-Id-Version': 'PACKAGE VERSION',
        'Report-Msgid-Bugs-To': '',
        'POT-Creation-Date': datenow||'',
        'PO-Revision-Date': datenow||'',
        'Last-Translator': '',
        'Language-Team': '',
        'Language': '',
        'Plural-Forms': '',
        'MIME-Version': '1.0',
        'Content-Type': 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding': '8bit'
    };
}



/** create a hopefully unique string to index a message by source text (msgid) and context (msgctxt)  */
function createMessageHash( msgid, msgctxt ){
    var id = msgid||'';
    // separate context with unprintable character guaranteed to never be used, a null byte
    if( msgctxt ){
        id += '\u0000'+msgctxt;
    }    
    return id;            
}


/* create a new collection to hold rows */
function createMessageCollection(){
    return CommonJS.require("$24","collection.js").init();
}


/* debuggers */
function stderr( e ){
    var console = window.console;
    console && console.error && console.error( e.message||String(e) );
}


exports.create = function( locale ){
    //return ( new GettextDocument(locale) )._validate('GettextDocument');
    return new GettextDocument(locale);
};



function createFormatter( width ){
    return CommonJS.require("$25","format.js").create( width );
};



/**
 * PO document object.
 */
function GettextDocument( locale ){
    this.locale( locale );
    this.length = 0;
    this.rows = createMessageCollection();
    this.head = commonHeaders( this.now() );
}

var GettextDocumentPrototype = CommonJS.require("$26","messages.js").extend( GettextDocument );


/**
 * Gettext dates look like: "YEAR-MO-DA HO:MI+ZONE"
 * Returning in universal time to save doing getTimezoneOffset calculation, e.g. -60 = +0100
 */
GettextDocumentPrototype.now = function(){
    function pad( n, i ){
        var s = String(n);
        while( s.length < i ){
            s = '0'+s;
        }
        return s;
    }
    var t = new Date,
        y = t.getUTCFullYear(),
        m = t.getUTCMonth() + 1,
        d = t.getUTCDate(),
        h = t.getUTCHours(),
        i = t.getUTCMinutes()
    ;
    return pad(y,4)+'-'+pad(m,2)+'-'+pad(d,2)+' '+pad(h,2)+':'+pad(i,2)+'+0000';
};


/**
 * Get/set a single header value, e.g. Project-Id-Version
 */
GettextDocumentPrototype.header = function( key, val ){
    var head = this.head || ( this.head = {} ); 
    if( null == val ){
        return this.headers()[key]||'';
    }
    head[key] = val||'';
    return this;
};


/**
 * Get set all headers
 */
GettextDocumentPrototype.headers = function( headers ){
    var key,
        datefield,
        date = this.now(),
        head = this.head || ( this.head = commonHeaders(date) ); 
    // set all passed headers if passed
    if( null != headers ){
        for( key in headers ){
            head[key] = headers[key];
        }
        return this;
    }
    // else dereference headers and merge 
    var locale = this.locale();
    // keep all existing headers to start, only updating changed or forced values
    headers = {};
    for( key in head ){
        headers[key] = String( head[key] );
    }
    // force PO and locale to override
    if( locale ){
        headers.Language = String(locale) || 'zxx';
        headers['Language-Team'] = locale.label || headers.Language;
        headers['Plural-Forms'] = 'nplurals='+( locale.nplurals||'2' )+'; plural='+( locale.pluraleq||'n!=1' )+';';
        datefield = 'PO-Revision-Date';
    }
    // else editing a POT
    else {
        headers.Language = '';
        headers['Plural-Forms'] = 'nplurals=INTEGER; plural=EXPRESSION;';
        headers['PO-Revision-Date'] = 'YEAR-MO-DA HO:MI+ZONE';
        datefield = 'POT-Creation-Date';
    }
    // only update date headers if not already set
    if( ! headers[datefield] ){
        headers[datefield] = date;
    }
    // force Loco headers to always override
    headers['X-Generator'] = 'Loco https://localise.biz/';
    return headers;
};


/* Get plural form strings
GettextDocumentPrototype.plurals = function(){
    if( this.loc ){
        var nforms = this.loc.nplurals,
            forms = this.loc.plurals;
        // ensure other is added to forms
        while( forms.length < nforms ){
            forms.push('other');
        }
        return forms;
    }
};/*



/**
 * Get a message object by msgid
 * @return GettextMessage or null of not found
 */
GettextDocumentPrototype.get = function( msgid, msgctxt ){
    var key = createMessageHash( msgid, msgctxt );
    return this.rows.get( key );
};



/**
 * Adds a message and indexes.
 * throws error if message already exists
 * @param GettextMessage || string
 * @param string optional context when passing msgid string
 * @return GettextMessage
 */
GettextDocumentPrototype.add = function( message, context ){
    if( ! ( message instanceof GettextMessage ) ){
        message = new GettextMessage( message );
    }
    if( context ){
        message.context( context );
    }
    var key = message.hash();
    if( this.rows.get(key) ){
        console.log( key );
        stderr('Duplicate message at index '+this.indexOf(message) );
    }
    else {
        message.idx = this.rows.add( key, message );
        this.length = this.rows.length;
    }
    return message;
};



/**
 * Import assets from the format used in Loco to extract messages from any file format
 * @return GettextDocument
 */
GettextDocumentPrototype.load = function( assets ){
    var i = -1, id, item, msgid, msgstr, msgctxt, message, pindex,
        locale = this.locale(),
        nplurals = locale && locale.nplurals || 2,
        plurals = [];/* 
        normals = [],
        fuzzies = [],
        untrans = [];*/
    while( ++i < assets.length ){
        item = assets[i];
        // create message, unless depends on a parent
        if( null == item.parent ){
            msgid = item.source||item.id;
            msgstr = item.target||'',
            msgctxt = item.context;
            if( msgid || msgctxt ){
                message = new GettextMessage( msgid, msgstr );
                // optional properties and metadata
                message._id = item._id;
                msgctxt && message.context( msgctxt );
                item.flag && message.flag( item.flag, 0 );
                item.comment && message.comment( item.comment );
                item.notes && message.notes( item.notes );
                item.refs && message.refs( item.refs );
                message.format( item.format );
                item.message = message;
                /*/ add according to POEdit style priority list
                if( ! message.translation() ){
                    untrans.push( message );
                }
                else if( message.fuzzy() ){
                    fuzzies.push( message );
                }
                else{
                    normals.push( message );
                }*/
               this.add( message );
            }
            // else first message may contain headers we can set absolutely
            else if( 0 === i && 'object' === typeof msgstr ){
                this.head = msgstr;
                this.headcmt = item.comment;
            }
        }
        // else remember parent until all parents are added.
        else {
            plurals.push( item );
        }
    }
    // add plurals collected to their parent messages
    i = -1;
    while( ++i < plurals.length ){
        try {
            item = plurals[i];
            msgid = item.source || item.id;
            message = assets[item.parent] && assets[item.parent].message;
            if( ! message ){
                throw new Error('parent missing for plural '+msgid );
            }
            pindex = item.plural;
            if( 1 === pindex ){
                message.plural( msgid );
            }
            // ignore plurals out of locale range
            if( pindex >= nplurals ){
                continue;
            }
            item.flag && message.flag( item.flag, pindex );
            message.translate( item.target||'', pindex );
            // let format be inherited from plural up to singular
            if( item.format && ! message.format() ){
                message.format( item.format );
            }
        }
        catch( e ){
            stderr( e );
        }
    }
    // sort PO before finally indexing
    //parents.sort( function ( messageA, messageB ){
    //    return messageB.compare( messageA );
    //} );
    //return this._add( untrans, fuzzies, normals );
    return this;
};


/**
 * Add grouped messages to appear as sorted
 * @return GettextDocument
 *
GettextDocumentPrototype._add = function( untrans, fuzzies, normals ){
    var j, set, all = [ untrans, fuzzies, normals ];
    for( i = 0; i < 3; i++ ){
        set = all[i];
        j = -1;
        while( ++j < set.length ){
            try {
                this.add( set[j] );
            }
            catch( e ){
                // probably duplicate, could index as a unique error
                stderr( e );
            }
        }
    }
    return this;
};*/



/* 
 * Perform a msgmerge operation.
 * @param GettextDocument POT or PO reference
 * @return Object stats in form { added: [], deleted: [] } 
 */
GettextDocumentPrototype.merge = function( ref ){
    var self = this,
        message,
        newdate = ref.header('POT-Creation-Date'),
        before  = self.rows,
        //untrans = [],
        //fuzzies = [],
        //normals = [],
        added   = [],
        deleted = []
    ;
    ref = ref.rows;
    // count all messages that will be lost        
    self.rows.each( function( key, message ){
        if( null == ref.get(key) ){
            deleted.push( message );
            //console.error(' - '+key );
            //console.log( message );
        }
    } );
    // set new def as self and return stats
    self.rows = createMessageCollection();
    // copy all references to new definitions, keeping existing ones
    ref.each( function( key, template ){
        try {
            message = before.get(key);
            // exists, merge metadata? Just merging file references as POT is authority on source
            if( message ){
                message.merge(template);
            }
            else {
                message = template; // <- warning, this will result in same object reference
                added.push( message );
                //console.info(' + '+key );
                //console.log( message );
            }
            /*/ pseudo-sorting, as per this.load
            if( ! message.translation() ){
                untrans.push( message );
            }
            else if( message.fuzzy() ){
                fuzzies.push( message );
            }
            else{
                normals.push( message );
            }*/
           self.add( message );
        }
        catch( e ){
            stderr( e );
        }
    } );
    
    // don't change document order!!!!
    // self._add( untrans, fuzzies, normals );
    
    // TODO fuzzy match added/deleted items?
    
    // inherit new POT-Creation-Date after update
    if( newdate ){
        self.header('POT-Creation-Date', newdate );
    }
    
    return {
        add: added,
        del: deleted
    };
};


/**
 * Configure PO formatter with width
 * @return GettextDocument
 */
GettextDocumentPrototype.wrap = function( width ){
    this.fmtr = createFormatter( width );
    return this;
};



/**
 * Convert entire document to string
 */
GettextDocumentPrototype.toString = function(){
    var key, 
        loc = this.locale(),
        lines = [], 
        head = [], 
        headers = this.headers(),
        template = ! loc,
        nplurals = loc && loc.nplurals || 2,
        formatter = this.fmtr || createFormatter()
    ;
    // override date header as export is effectively a save point
    headers[ loc ? 'PO-Revision-Date' : 'POT-Creation-Date' ] = this.now();
    // add header as first message with empty msgid
    for( key in headers ){
        head.push( key + ': ' + headers[key] );
    }
    head = new GettextMessage( '', head.join('\n') );
    head.comment( this.headcmt || '' );
    // add prepend header if POT
    if( template ){
        // head.comment('Loco Gettext template');
        head.fuzzy( 0, true );
    }
    lines.push( head.toString() );
    lines.push('');
    // add remaining messages
    this.rows.each( function( key, message ){
        if( key ){
            lines.push( message.cat( formatter, template, nplurals ) );
            lines.push('');
        }
    } );
    return lines.join("\n");
};




/**
 * Single message entity
 */
function GettextMessage( msgid, msgstr ){
    this.src = [ msgid||'' ];
    this.msg = [ msgstr||'' ];
}


var GettextMessagePrototype = CommonJS.require("$27","message.js").extend( GettextMessage );


GettextMessagePrototype.hash = function(){
    return createMessageHash( this.source(), this.context() );
};


/**
 * Set source for PO style germanic source plurals only
 *
GettextMessagePrototype.setSource = function( msgid, msgid_plural ){
    this.src[0] = msgid;
    if( null != msgid_plural ){
        this.src[1] = msgid_plural;
    }
    return this;
};*/


/**
 * Default message to string conversion
 */
GettextMessagePrototype.toString = function(){
    return this.cat( createFormatter() );
};


/**
 * Convert message block to string.
 * Called from PO document with pre-constructed formatting object
 */
GettextMessagePrototype.cat = function( formatter, template, nplurals ){
    var i, line, lines = [], comments = [], value;
    // # translator comments (editable by translator)
    if( value = this.cmt ){
        lines.push( formatter.prefix( value, '# ' ) );
    }
    // #. extracted comments (protected)
    if( value = this.xcmt ){
        lines.push( formatter.prefix( value, '#. ' ) );
    }
    // #: references plus special loco:_id reference
    line = this.rf;
    if( value = this._id ){
        line += ( line ? ' ' : '' ) + 'loco:'+value;
    }
    if( line && /\S/.test(line) ){
        lines.push( formatter.refs(line) );
    }
    // #, flags
    if( ! template && this.fuzzy() ){
        lines.push('#, fuzzy');
    }
    // c-format / php-format etc..
    if( value = this.fmt ){
        lines.push('#, '+value+'-format');
    }
    /*else if( null != value ){
        lines.push('#, no-c-format');
    }*/
    // context:
    if( value = this.ctx ){
        lines.push( formatter.pair('msgctxt',value) );
    }
    // msgid:
    lines.push( formatter.pair( 'msgid', this.src[0] ) );
    // singular:
    if( null == this.src[1] ){
        lines.push( formatter.pair( 'msgstr', template ? '' : this.msg[0] ) );
    }
    // plural:
    else {
        i = -1;
        lines.push( formatter.pair( 'msgid_plural', this.src[1] ) );
        // msgstr[0->i]
        value = this.msg || ['',''];
        nplurals = nplurals || value.length;
        while( ++i < nplurals ){
            lines.push( formatter.pair( 'msgstr['+i+']', template ? '' : value[i]||'' ) );
        }
    }
    return lines.join("\n");
};



/**
 * compare ordering priority with another message
 * @return int -1 if lower priority, 0 of equal, 1 if greater priority
 */
GettextMessagePrototype.compare = function( message, doAlpha ){
    var a = this.weight(), 
        b = message.weight();
    if( a > b ){
        // self has larger weighting - higher priority, 
        return 1;
    }
    if( a < b ){
        // other has larger weighting - higher priority
        return -1;
    }
    // weightings the same - do alpha comparision if asked
    if( doAlpha ){
        a = this.hash().toLowerCase();
        b = message.hash().toLowerCase();
        if( a < b ){
            // self is lower alphabetically - higher priority
            return 1;
        }
        if( a > b ){
            // other lower alphabetically - higher priority
            return -1;
        }
    }
    // else perfectly equal
    return 0;
};


/**
 * Copy metadata from POT to PO
 */
GettextMessagePrototype.merge = function( template ){
    var message = this;
    message.rf = template.rf;
    message.fmt = template.fmt;
    message.cmt = template.cmt;
    message.xcmt = template.xcmt;
}





// clean up.
GettextDocumentPrototype = GettextMessagePrototype = null;





return exports;
}({},window,document) );

CommonJS.register("$16", function(exports,window,document){ /* module: js/wp/refs.js */
/**
 * Handle display of file references in PO files and linked source code / highlighting in modal window.
 */

exports.init = function ( loco, conf ) {

    var $modal;
    
    // http://api.jqueryui.com/dialog/
    function getModal(){
        return $modal || ( $modal = $('<div id="loco-po-ref"></div>').dialog( {
            dialogClass   : 'loco-modal loco-modal-wide',
            modal         : true,
            autoOpen      : false,
            closeOnEscape : true,
            resizable     : false,
            height        : 500
        } ) );
    }
    

    // load file reference modal from any element containing reference text
    function loadRef( text ){
        getModal().html('<div class="loco-loading"></div>').dialog('option','title','Loading..').off('dialogopen').dialog('open').on('dialogopen',onModalOpen);
        var postdata = $.extend( { ref:text, path:conf.popath }, conf.project||{} );
        loco.ajax.post( 'fsReference', postdata, onRefSource, onRefError );
    }
    
    
    // when reference pulling fails (e.g. file not found, or line nonexistent)
    function onRefError( xhr, error, message ){
        var $error = $('<p></p>').text( message );
        getModal().dialog('close').html('').dialog('option','title','Error').append($error).dialog('open');
    }
    
    
    // display reference source when received via ajax response
    function onRefSource( result ){
        var code = result && result.code;
        if( ! code ){
            return;
        }
        var i = -1,
            length = code.length,
            $ol = $('<ol></ol>').attr('class',result.type);
        while( ++i < length ){
            $('<li></li>').html( code[i] ).appendTo($ol);
        }
        // Highlight referenced line
        $ol.find('li').eq( result.line - 1 ).attr('class','highlighted');
        // TODO enable highlight toggling of other lines via click/drag etc..
        getModal().dialog('close').html('').dialog('option','title', result.path+':'+result.line).append($ol).dialog('open');
    }
    
    
    // scroll to first highlighted line of code once modal open
    function onModalOpen( event /*, ui*/ ){
        var div = event.target,
            line = $(div).find('li.highlighted')[0],
            yAbs = line && line.offsetTop || 0,         // <- position of line relative to container
            yVis = Math.floor( div.clientHeight / 2 ),  // <- target position of line relative to view port
            yAdj = Math.max( 0, yAbs - yVis )           // scroll required to move line to visual position
        ;
        div.scrollTop = yAdj;
    }
    
    // expose public functions for this PO file    
    return {
        load: loadRef
    }
    
}
return exports;
}({},window,document) );

CommonJS.register("$29", function(exports,window,document){ /* module: js/wp/job.js */
/**
 * For batching translatable text
 */

exports.create = function( apiClient ){
    return new Job(apiClient);
};


function Job( apiClient ){
    this.api = apiClient;
    this.chars = 0;
}


var JobPrototype = Job.prototype;


/**
 * Collect a PO file into one or more batches for sending to api.
 * @param {Messages} messages PO collection
 * @param {Boolean} includeTranslated Whether to force collection of existing translations
 */
JobPrototype.init = function( messages, includeTranslated ){
    var client = this.api,
        totalChars = 0,
        totalItems = 0,
        maxItemsPerBatch = 50,
        maxCharsPerBatch = 5000,
        indexed = {},
        batches = [],
        buffers = []
    ;
    function flushBuffer( buffer ){
        var newBuffer = { length:0, html:buffer.html, sources:[] };
        batches.push( newBuffer );
        buffers[ buffer.html ? 1 : 0 ] = newBuffer;
        return newBuffer;
    }
    // translatable texts will be mapped into the document by source only. No context can be sent to API
    function registerSource( source, message ){
        // sources with multiple contexts will all be translated once and loaded back into multiple messages. 
        var mapped = indexed[source];
        if( mapped ){
            mapped.push(message);
            return;
        }
        // else a new source. If we could send context this would be redundant. But we can't.
        var length = source.length,
            isHtml = client.isHtml(source),
            buffer = buffers[ isHtml ? 1 : 0 ],
            sources = buffer.sources
        ;
        // preempt character and item overflow
        if( (buffer.length+length) > maxCharsPerBatch || sources.length === maxItemsPerBatch ){
            buffer = flushBuffer(buffer);
            sources = buffer.sources;
        }
        // add source to current batch and add char length
        sources.push(source);
        indexed[source] = [message];
        // increment totals
        buffer.length += length;
        totalChars += length;
        totalItems += 1;
    }
    function registerMessage( message, pluralIndex ){
        var source = message.source(null,pluralIndex);
        if( source && ( message.untranslated(pluralIndex) || includeTranslated ) ){
            registerSource( source, message );
        }
    }
    // start with two buffers for html, and plain text
    flushBuffer( {html:false} );
    flushBuffer( {html:true} );
    messages.each( function( hash, message ) {
        registerMessage(message,0);
        registerMessage(message,1);
    } );
    buffers = null;
    // Done
    this.map = indexed;
    this.chars = totalChars;
    this.length = totalItems;
    this.batches = batches;
    this.locale = messages.locale();
}


/**
 * Allow external code stop active job
 */
JobPrototype.abort = function(){
    this.state = 'abort';
    return this;
};



/**
 * Dispatch current batches to API
 * This is async, so must be interruptable. We'll do that via progress object
 * @return {Object}
 */
JobPrototype.dispatch = function(){
    // call back for each individual translated source string
    function onEachDone( source, target ){
        // client must check return values between each callback if we are to be able to abort mid-iteration
        if( ! checkState() ){
            return false;
        }
        // empty target indicates failure, but doesn't mean all will fail
        if( ! target ){
            client.stderr('Empty translation returned for: '+source );
            return true;
        }
        var message, messages = indexed[source] || [], num = messages.length, i = -1, updated;
        // source done. increment and callback for each message that uses this source
        didSources++;
        // we'll set translation on all plural forms where source matches.
        function eachForm(pluralIndex,currentSource,currentTarget){
            if( target !== currentTarget && ( source === currentSource || ( pluralIndex>1 && message.source(null,1) === source ) ) ){
                message.translate(target,pluralIndex);
                updated++;
                didUpdates++;
            }
            return updated;
        }
        while( ++i < num ) {
            message = messages[i];
            if( message ){
                updated = 0;
                message.each(eachForm);
                updated && fire('each',[message]);
            }
        }
        return true;
    }
    // allow external code to stop us dead. e.g. pressing cancel or closing window.
    function checkState(){
        if( 'abort' === self.state ){
            if( client ){
                client.abort();
                onComplete();
            }
            return false;
        }
        return true;
    }
    function dispatchNext(){
        var batch = batches.shift(), sources;
        if( batch ){
            sources = batch.sources;
            if( sources && sources.length ){
                client.batch( sources, locale, batch.html, onEachDone ).fail(onBatchFail).always(onBatchDone);
            }
            else {
                onBatchDone(); // <- empty batch for some reason
            }
        }
        else {
            onComplete();
        }
    }
    // if one batch fails, all batches fail
    function onBatchFail(){
        self.abort();
        onComplete();
    }
    function onBatchDone( /*result,status,xhr*/ ){
        didBatches++;
        // TODO should we add a delay between batches?
        fire('prog',[didBatches,numBatches]);
        checkState() && dispatchNext();
    }
    function onComplete(){
        batches = null;
        client = null;
        fire('done');
    }
    function fire( type, args ){
        var callbacks = listeners[type] || [], i = callbacks.length;
        while( --i >= 0 ){
            callbacks[i].apply(null,args);
        }
    }
    var self = this,
        client = self.api,
        indexed = self.map,
        batches = self.batches || [],
        locale = self.locale,
        didSources = 0,
        didBatches = 0,
        didUpdates = 0,
        numSources = self.length,
        numBatches = batches.length,
        listeners = {done:[],each:[],prog:[]}
    ;
    // start with not-aborted state
    self.state = '';
    dispatchNext();
    //
    return {
        // register done handler for end of job
        done: function(callback){
            listeners.done.push(callback);
            return this;
        },
        // register each handler for calling back each translation
        each: function (callback) {
            listeners.each.push(callback);
            return this;
        },
        prog: function (callback) {
            listeners.prog.push(callback);
            return this;
        },
        // get stats about what has been processes, what was actually updated and how many are left
        stat: function () {
            return {
                todo: function () {
                    return Math.max( numSources-didSources, 0 );
                },
                did: function () {
                    return didSources;
                }
            }
        }
    };
};

return exports;
}({},window,document) );

CommonJS.register("$30", function(exports,window,document){ /* module: js/wp/apis/yandex.js */
function YandexClient(){}

/**
 * Yandex translation API client: https://tech.yandex.com/translate/
 * @return {YandexClient} Yandex API client instance
 */
exports.create = function( JsonClient ){

    var YandexApiPrototype = YandexClient.prototype = new JsonClient;

    /**
     * https://tech.yandex.com/translate/doc/dg/concepts/design-requirements-docpage/
     * "Powered by Yandex.Translate" must appear above or below the translation result.
     * @return {string}
     */
    YandexApiPrototype.toString = function(){
        return 'Yandex.Translate';
    };

    YandexApiPrototype.getId = function(){
        return 'yandex';
    };

    YandexApiPrototype.getUrl = function(){
        return 'https://translate.yandex.com/';
    };

    YandexApiPrototype.parseError = function( obj ){
        if( obj && obj.code && 200 !== obj.code && obj.message ){
            return String(this)+' error '+obj.code+': '+obj.message;
        }
        return '';
    };

    YandexApiPrototype.batch = function( sources, locale, html, callback ){
        var self = this, 
            format = html?'html':'plain';
        // not bothering to consult list of supported languages. They are all lang tag only and api reports wrongly anyway
        // var tag = this.mapLang( locale, require('wp/apis/data/yandex.json') );
        function callbackEach( targets ){
            var num = sources.length, i = -1;
            while( ++i < num ){
                if( false === callback( sources[i], targets[i]||'', locale ) ){
                    break;
                }
            }
        }
        return self._call( {
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?format='+format+'&lang='+locale.lang,
            method: 'POST',
            traditional: true,
            data: {
                key: self.key(),
                text: sources
            }
        } )
        // response is array corresponding to text array sent. here is just one at a time.
        .done( function(obj,status,xhr) {
            if( obj && 200 === obj.code ){
                callbackEach( obj.text||[] );
            }
            else {
                self.stderr( self.parseError(obj)||self.odderr(xhr) );
                callbackEach([]);
            }
        })
        // failure will have already raised error in parent call
        .fail( function(){
            callbackEach([]);
        });
    };



    return new YandexClient;
};
return exports;
}({},window,document) );

CommonJS.register("$39", {
    "zh": [
        "zh",
        "zh-TW"
    ],
    "he": [
        "iw"
    ],
    "jv": [
        "jw"
    ]
} ); // data: js/wp/apis/data/google.json

CommonJS.register("$31", function(exports,window,document){ /* module: js/wp/apis/google.js */
function GoogleClient(){}

/**
 * Google translate API client: https://cloud.google.com/translate/docs/
 * @return {GoogleClient} Google API client instance
 */
exports.create = function( JsonClient ){


    var GoogleClientPrototype = GoogleClient.prototype = new JsonClient;

    /**
     * https://cloud.google.com/translate/attribution#attribution_and_logos
     * Powered by Google Translate (should actually be an image!)
     * @return {string}
     */
    GoogleClientPrototype.toString = function(){
        return 'Google Translate';
    };

    GoogleClientPrototype.getId = function(){
        return 'google';
    };
    
    GoogleClientPrototype.getUrl = function(){
       return 'https://translate.google.com/'; 
    };


    GoogleClientPrototype.parseError = function( obj ){
        if( obj.error ){
            var messages = [], errors = obj.error.errors || [], numErrors = errors.length, i = -1;
            while( ++i < numErrors ){
                messages.push( errors[i].message || '' );
            }
            return String(this)+' error '+obj.error.code+': '+messages.join(';');
        }
        return '';
    };


    /**
     * https://cloud.google.com/translate/docs/reference/rest/v2/translate
     * @param {Array} sources
     * @param {Locale} locale
     * @param {Boolean} html Whether to declare type is HTML
     * @param {Function} callback
     */
    GoogleClientPrototype.batch = function( sources, locale, html, callback ){
        // https://cloud.google.com/translate/docs/basic/setup-basic
        var self = this,
            format = html ? 'html' : 'text',
            tag = self.mapLang( locale, CommonJS.require("$39","google.json") )
        ;
        // response looks like {data:{translations:[{translatedText}]}}
        function callbackEach( translations ){
            var num = sources.length, i = -1, translation;
            while( ++i < num ){
                translation = translations[i]||{};
                if( false === callback( sources[i], translation.translatedText||'', locale ) ){
                    break;
                }
            }
        }
        return self._call( {
            url:'https://translation.googleapis.com/language/translate/v2?source=en&target='+tag+'&format='+format,
            method: 'POST',
            traditional: true,
            data: {
                key: self.key(),
                q: sources
            }
        } )
        .done( function(obj) {
            if( obj.data ){
                callbackEach( obj.data.translations||[] );
            }
            else {
                self.stderr( self.parseError(obj)||self.odderr(xhr) );
                callbackEach([]);
            }
        })
        // failure will have already raised error in parent call
        .fail( function(){
            callbackEach([]);
        });
    };

    
    
    return new GoogleClient;
};
return exports;
}({},window,document) );

CommonJS.register("$40", {
    "pt": [
        "pt",
        "pt-pt"
    ],
    "sr": [
        "sr-Cyrl",
        "sr-Latn"
    ],
    "sr_RS": [
        "sr-Cyrl"
    ],
    "tlh": [
        "tlh-Latn",
        "tlh-Piqd"
    ],
    "zh": [
        "zh-Hans",
        "zh-Hant"
    ],
    "zh_CN": [
        "zh-Hans"
    ],
    "zh_HK": [
        "zh-Hans"
    ],
    "zh_SG": [
        "zh-Hans"
    ],
    "zh_TW": [
        "zh-Hant"
    ]
} ); // data: js/wp/apis/data/ms.json

CommonJS.register("$32", function(exports,window,document){ /* module: js/wp/apis/ms.js */
function MicrosoftClient(){}

/**
 * Microsoft Translator Text API
 * https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/
 * 
 * API key nightmare:
 * https://docs.microsoft.com/en-gb/azure/cognitive-services/translator/reference/v3-0-reference#authentication
 * https://docs.microsoft.com/en-gb/azure/cognitive-services/cognitive-services-apis-create-account
 * 
 * TODO list of languages; API key not required:
 * https://api.cognitive.microsofttranslator.com/languages?api-version=3%2E0

 * @return {MicrosoftClient} Google API client instance
 */
exports.create = function( JsonClient ){

    var MicrosoftClientPrototype = MicrosoftClient.prototype = new JsonClient;

    /**
     * https://www.microsoft.com/en-us/translator/business/attribution/
     * Attribution not required apparently, but must adhere to guidelines when present and use logo
     * @return {string}
     */
    MicrosoftClientPrototype.toString = function(){
        return 'Microsoft Translator text API';
    };

    MicrosoftClientPrototype.getId = function(){
        return 'microsoft';
    };
    
    MicrosoftClientPrototype.getUrl = function(){
        return 'https://aka.ms/MicrosoftTranslatorAttribution';
    };

    MicrosoftClientPrototype.parseError = function( obj ){
        return obj && obj.error ? obj.error.message : '';
    };


    /**
     * @param {Array} sources
     * @param {Locale} locale
     * @param {Boolean} html Whether to declare type is HTML
     * @param {Function} callback
     */
    MicrosoftClientPrototype.batch = function( sources, locale, html, callback ){
        var self = this,
            json = [],
            num = sources.length, i = -1,
            format = html ? 'html' : 'plain',
            tag = self.mapLang( locale, CommonJS.require("$40","ms.json") )
        ;
        // input text looks like '[{"text":"Hello"},{"text":"Goodbye"}]',
        while( ++i < num ){
            json.push( {text:sources[i]} );
        }
        function callbackEach( results ){
            var i = -1, result, translations, translation;
            while( ++i < num ){
                result = results[i]||{};
                translations = result.translations || [];
                translation = translations[0]||{};
                if( false === callback( sources[i], translation.text||'', locale ) ){
                    break;
                }
            }
        }
        // https://docs.microsoft.com/en-gb/azure/cognitive-services/translator/reference/v3-0-translate
        return self._call({
            url:'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to='+tag+'&textType='+format,
            method: 'POST',
            data: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Ocp-Apim-Subscription-Key': this.key(),
                'Ocp-Apim-Subscription-Region': self.param('region') || 'global'
            }
        })
        // Response looks like [{"translations":[{"text":"...","to":"..."}]}]
        // where top-level array refers to input array.. no idea why there are potentially multiple results, but we will use first
       .done( function(obj) {
           if( obj && obj.length ){
               callbackEach(obj);
           }
           else {
               self.stderr( self.parseError(obj)||self.odderr(xhr) );
               callbackEach([]);
           }
        })
        // failure will have already raised error in parent call
        .fail( function(){
            callbackEach([]);
        });
    };
    
    

    return new MicrosoftClient;
};
return exports;
}({},window,document) );

CommonJS.register("$33", function(exports,window,document){ /* module: js/wp/apis/custom.js */
function CustomClient(){}

/**
 * Custom translation API calls WordPress Ajax service with Loco hooks
 * @return {CustomClient} CustomClient API client instance
 */

exports.create = function(JsonClient){

    var CustomClientPrototype = CustomClient.prototype = new JsonClient;

    CustomClientPrototype.batch = function( sources, locale, html, callback ){
        var locoAjax = window.locoScope.ajax,
            postData = {
                hook: this.getId(),
                type: html?'html':'text',
                locale:String(locale),
                sources:sources
            },
            deferred = $.Deferred()
        ;
        // response is a simple array in root of data object passed from ajax lib
        function callbackEach( translations ){
            var num = sources.length, i = -1;
            while( ++i < num ){
                if( false === callback( sources[i], translations[i], locale ) ){
                    break;
                }
            }
        }
        function onSuccess(obj){
            callbackEach( obj && obj.targets || [] );
            deferred.resolve();
        }
        function onFailure(){
            callbackEach([]);
            deferred.reject();  
        }
        // call our internal api hook on the back end
        this.abortable( locoAjax.post('apis',postData,onSuccess,onFailure) );
        // not returning jqXHR because successful responses may need to fail.
        // https://stackoverflow.com/questions/61821026/how-to-trigger-fail-handlers-on-an-ajax-promise
        return deferred.promise();
    };

    return new CustomClient;
};

return exports;
}({},window,document) );

CommonJS.register("$17", function(exports,window,document){ /* module: js/wp/apis.js */
/**
 * Base class for calling external APIs
 * 
 * @method {String} translate
 * @property {String} k API key for authenticated requests
 */
function JsonClient(){
    this.inf = {};
}

var JsonClientPrototype = JsonClient.prototype;

/**
 * Most sane APIs will have just a simple API key
 * @param {Object} info api credentials
 */
JsonClientPrototype.init = function( info ){
    this.inf = info || {};
};

JsonClientPrototype.param = function(k){
    return this.inf[k] || '';
};

JsonClientPrototype.key = function(){
    return this.param('key');
};

JsonClientPrototype.getId = function(){
    return this.param('id') || 'none';
};

JsonClientPrototype.getUrl = function(){
    return this.param('url')||'#';
};

JsonClientPrototype.toString = function(){
    return this.param('name') || this.getId();
}

JsonClientPrototype.stderr = function( message ){
    var loco = window.locoScope || {},
        errs = loco.notices || window.console
    ;
    errs && errs.error && errs.error( String(message) );
};

JsonClientPrototype.odderr = function( /*xhr.status*/ ){
    return String(this)+': Unknown failure';
};

JsonClientPrototype.parseError = function( obj ){
    return '';
};

JsonClientPrototype.mapLang = function( locale, tree ){
    var wpTag = String(locale),
        lang = locale.lang,
        list = tree[wpTag] || tree[lang] || [],
        length = list.length
    ;
    // if api doesn't support this language, it will probably fail in its own way, so just return language
    // actually turns out that languages work even when the API's say they're not supported. e.g. Yandex supports hebrew but doesn't say so.
    if( 0 === length ){
        return lang;
    }
    // Find best match. Actually looking for exact match
    if( 1 < length ){
        wpTag = wpTag.toLowerCase();
        var i = -1, apiTag;
        while( ++i < length ){
            apiTag = list[i];
            if( apiTag.toLowerCase().replace('-','_') === wpTag ){
                return apiTag;
            }
        }
    }
    // if no exact match in list, use first which should be less specific. i.e. pt-BR should use pt not pt-PT
    return list[0];
};


/**
 * Translate single source, with auto-detected type
 * @param {String} source text
 * @param {Locale} locale
 * @param {Function} callback
 * @return {Object} promise
 */
JsonClientPrototype.translate = function( source, locale, callback ){
    return this.batch( [source], locale, this.isHtml(source), callback );
};


/**
 * @abstract
 * @return {Object}
 */
JsonClientPrototype.batch = function(){
    // API child classes must implement batch()
    return {always:function(x){x()}};
};



/**
 * Virtually no point abstracting calls as apis differ too widely.
 * Also no need to use Jsonp as all active APIs support CORS
 * @param {Object} options
 * @return {Object} jqXHR
 */
JsonClientPrototype._call = function(options) {
    var self = this;
    options.cache = true;
    options.dataType = 'json';
    options.error = function (xhr, error, message) {
        // may be possible to parse error response as json
        try {
            var json = xhr.responseText,
                blob = json && $.parseJSON(json)
            ;
            message = blob && self.parseError(blob) || message;
        }
        catch( e ){}
        self.stderr( String(self)+': ' + message );
    };
    return self.abortable( $.ajax(options) );
};


/**
 * This is split out so client can use the abort logic without going via this._call 
 */
JsonClientPrototype.abortable = function( jqXHR ){
    var self = this;
    // always unset current thread when done
    jqXHR.always( function(){
        if( self.$r === jqXHR ){
            self.$r = null;
        }
    } );
    self.$r = jqXHR;
    return jqXHR;
}



/**
 * Abort current transaction if possible
 */
JsonClientPrototype.abort = function(){
    var xhr = this.$r;
    if( xhr ){
        xhr.abort();
    }
}



/**
 * Detect HTML data type
 * @param {String} source
 * @return {Boolean} true if HTML detected
 */
JsonClientPrototype.isHtml = function( source ){
    return getHtmlSniffer().sniff(source);
};


/**
 * Create a new batching job from this client.
 * @return {Job}
 */
JsonClientPrototype.createJob = function(){
    return CommonJS.require("$29","job.js").create(this);
};


/*
 * @param {Object} info API credentials
 * @return {JsonClient}
 */
exports.create = function( info ){
    var client, id = info.id;
    // yandex is easy to identify with /^trnsl\.1\.1/
    if( 'yandex' === id ){
        client = CommonJS.require("$30","yandex.js").create(JsonClient);
    }
    // not sure exactly how long a google api key is. Mine is /^[_0-9a-zA-Z]{39}/
    else if( 'google' === id ){
        client = CommonJS.require("$31","google.js").create(JsonClient);
    }
    else if( 'microsoft' === id ){
        client = CommonJS.require("$32","ms.js").create(JsonClient);
    }
    /*else if( 'debug' === id ){
        client = require('wp/apis/debug').create(JsonClient);
    }*/
    else {
        client = CommonJS.require("$33","custom.js").create(JsonClient);
    }
    client.init(info);
    return client;
};


/**
 * Pull suggestions from multiple APIs and call back as each one is done
 */
exports.suggest = function( apis, source, locale, callback ){
    var i, api, numApis = apis.length;
    /* @var {JsonClient} api */
    for( i = 0; i < numApis; i++ ){
        api = apis[i];
        api.translate( source, locale, callback );
    }
};



var htmlSniffer;
function getHtmlSniffer(){
    return htmlSniffer || ( htmlSniffer = createHtmlSniffer() );
}
function createHtmlSniffer(){
    var el = document.createElement('p'),
        ENT_REGEX = /&(#\d+|#x[0-9a-f]|[a-z]+);/i,
        TAG_REGEX = /<[a-z]+\s/i,
        lastSource,
        lastResult
    ;
    return { sniff: function( source ) {
        if( source === lastSource ){
            return lastResult;
        }
        lastSource = source;
        // Sniffing HTML via regex, but only returning true if setting innerHTML produces innerText differing from source
        if( ENT_REGEX.test(source) || TAG_REGEX.test(source) ){
            el.innerHTML = source;
            if( el.textContent !== source ){
                // console.log('Detected as HTML: '+source);
                lastResult = true;
                return true;
            }
        }
        lastResult = false;
        return false;
    } }
}

return exports;
}({},window,document) );

CommonJS.register("$18", function(exports,window,document){ /* module: js/wp/fsconn.js */
/**
 * WordPress file system connection
 * - Takes a form with a file path field
 * - Gets and displays UI from server
 * - Posts authorization
 * - populates and unlocks form.
 */


/**
 * @param HTMLFormElement the original form containing "path" and "auth" fields. (use setForm after to receive creds into a different form)
 */
exports.init = function( elForm ){


    var creds,
        callback,
        elHook = elForm,
        method = null,
        manual = false,
        connected = false,
        loco = window.locoScope,
        path = elForm.path.value,
        auth = elForm.auth.value,
        nonce = elForm['loco-nonce'].value,
        FIELD_CONNECTED = 'connection_type',
        $button = $(elHook).find('button.button-primary'),
        elWarning = document.getElementById( elHook.id+'-warn' ),
        connectorVisible = false,
        fsWarningVisible = false,
        fsWarning = '',
        $prompt;
   
   
    /**
     * http://api.jqueryui.com/dialog/
     */
    function getModal(){
        if( ! $prompt ){
            $button.click( clickOpenPrompt );
            // we want top: 15% and max-height: 85% but no way to set it via jquery ui
            $prompt = $('<div id="loco-fs-creds"></div>').dialog( {
                'dialogClass'   : 'request-filesystem-credentials-dialog loco-modal',
                'minWidth'      : 580,
                'modal'         : true,
                'autoOpen'      : false,
                'closeOnEscape' : true
            } )
            // enable ssh-keys show/hide, as per WordPress updates.js
            .on( 'change', 'input[name="connection_type"]', function(){
                if( this.checked ){
                    $('#ssh-keys').toggleClass( 'hidden', 'ssh' !== $(this).val() );
                }
            } );
        }
        return $prompt;
    }
    
    
    function showConnector(){
        if( ! connectorVisible ){
            showElement( $(elHook) );
            connectorVisible = true;
        }
        // don't show warning at the same time as connect dialogue
        hideWarning();
    }
    
    function hideConnector(){
        if( connectorVisible ){
            hideElement( $(elHook) );
            connectorVisible = false;
        }
        // show warning once initialized
        if( connected && fsWarning ){
            showWarning(fsWarning);
        }
        else {
            hideWarning();
        }
    }


    function showWarning( message ){
        var $el = $(elWarning);
        $el.find('span.loco-msg').text(message);
        if( ! fsWarningVisible ){
            showElement($el);
            fsWarningVisible = true;
        }
    }

    function hideWarning(){
        if( fsWarningVisible ){
            hideElement( $(elWarning) );
            fsWarningVisible = false;
        }
    }


    function hideElement($el){
        $el.slideUp(250).fadeOut(250, function(){ $(this).addClass('jshide') } );
    }

    function showElement($el){
        $el.removeClass('jshide').hide().fadeIn(500);
    }


    
    
    function redraw(){  
        // enable primary form when connected
        if( connected ){
            if( $prompt ){
                $prompt.dialog('close');
            }
            hideConnector();
            $(elForm).find('button[type="submit"]').attr('disabled',false);
            $(window).triggerHandler('resize');
            callback && callback(true);
            return true;
        }
        // else ensure connect dialogue is visible when there is a path
        if( path && $prompt ){
            showConnector();
        }
        // else we've not got a path to query yet or back end has not provided dialogue
        else {
            hideConnector();
        }
        disable();
        return false;
    }
   


    /**
     * Lock parent form (file system requires auth)
     */
    function disable(){
        $(elForm).find('input[type="submit"]').attr('disabled',true);
        callback && callback( false );
    }



    function populateForm( form ){
        var name, value, source = creds||{};
        for( name in source ){
        	if( source.hasOwnProperty(name) ){
	            value = source[name];
	            if( form[name] ){
	                form[name].value = value;
	            }
	            else {
	                $('<input type="hidden" />').attr('name',name).appendTo(form).val(value);
	            }
	        }
        }
    }
    
    function populateObject( obj ){
        var name, source = creds||{};
        for( name in source ){
            if( source.hasOwnProperty(name) ){
                obj[name] = source[name];
            }
        }
        return obj;
    }

    
    function onCredentialsSubmit( event ){
        event.preventDefault();
        var form = event.target,
            data = $(form).serializeArray()
        ;
        connect( data );
        manual = true;
        return false;
    }


    function clickCancelPrompt( event ){
        event.preventDefault();
        $prompt.dialog('close');
        return false;
    }


    function clickOpenPrompt( event ){
        event.preventDefault();
        $prompt.dialog('open').find('input[name="connection_type"]').change();
        return false;
    }


    function onSuccess( r ){
        connected = r.authed;
        method = r.method;
        // supporting texts whether successfull or not
        $(elHook).find('span.loco-msg').text( r.message||'Something went wrong.' );
        fsWarning = r.warning||'';
        // regardless of connection status, we may have to show a warning notice
        if( r.notice ){
            loco.notices.info( r.notice );
        }
        // populate form with credentials once known to work
        if( connected ){
            if( 'direct' !== method ){
                creds = r.creds;
                populateForm( elForm );
                // show success message, but only if auth was done via form submit
                if( manual && r.success ){
                    loco.notices.success( r.success );
                }
            }
            redraw();
            return;
        }
        // else failure
        // may be a permanent failure if reason given
        if( r.reason ){
            loco.notices.info( r.reason );
            return;
        }
        // back end should always provide a prompt when no auth and no error
        var html = r.prompt;
        if( ! html ) {
            loco.notices.error("Server didn't return credentials, nor a prompt for credentials");
            return;
        }
        // rebuild prompt modal and make some style tweaks
        var modal = getModal();
        modal.html(html).find('form').submit( onCredentialsSubmit );
        modal.dialog('option','title', modal.find('h2').remove().text() );
        modal.find('button.cancel-button').show().click( clickCancelPrompt );//.before('<a>Help?</a>');
        modal.find('input[type="submit"]').addClass('button-primary');
        redraw();
        $(window).triggerHandler('resize');
    }


    function onError(){
        redraw();
    }

    function connect( post ){
        manual = false;
        loco.ajax
            .setNonce('fsConnect',nonce)
            .post( 'fsConnect', post, onSuccess, onError );
        return post;
    }


   // ensure warning isn't cleared when connection success appears.
   loco.notices.convert(elWarning).stick();   
   

    // if credentials are automatic (saved in session etc..) we will have connection_type field
    if( elForm[FIELD_CONNECTED] ){
        creds = {};
        creds[FIELD_CONNECTED] = elForm[FIELD_CONNECTED].value;
        connected = true;
    }
    // else do initial connect request
    else if( path && auth ){
        connect( {path:path,auth:auth} );
    }

    redraw();


    return {
        // add credentials to a given object or form
        applyCreds: function ( obj ){
            if( obj.nodeType ){
                populateForm( obj );
            }
            else {
                populateObject( obj );
            }
            return this;
        },
        // set form to receive credential population on response
        // ideally before response comes back, but applies anyway
        setForm: function ( form ){
            elForm = form;
            redraw();
            populateForm(form);
            return this;
        },
        // force auth again from current form
        // ensures current credentials posted, but with fresh path to authenticate
        connect: function(){
        	path = elForm.path.value;
        	auth = elForm.auth.value;
            connect( $(elForm).serializeArray() );
            return this;
        },
        // listen for authentication results
        // currently only supports one listener
        listen: function( listener ){
            callback = listener;
            connected && listener(true);
            return this;
        }
    };
    
};

return exports;
}({},window,document) );

CommonJS.register("$19", function(exports,window,document){ /* module: js/wp/tables.js */
/**
 * Table sorting and filtering
 */

function sortItems( items, key, type, desc ){
    var comparitor;
    if( 'n' === type ){
        comparitor = createNumericSortComparison(key);
    }
    else {
        comparitor = createStringSortComparison(key);
    }
    if( desc ){
        comparitor = reverseSortComparison(comparitor);
    }
    return createSortFunction( [].sort, [comparitor] )( items );
}


function createSortFunction( func, args ){
    return function( list ){
        func.apply( list, args );
        return list;
    };
}


function createNumericSortComparison( key ){
    return function( a, b ){
        var x = a && a[key]||0, 
            y = b && b[key]||0;
        if( x === y ){
            return 0;
        }
        return x > y  ? 1 : -1;
    };
}


function createStringSortComparison( key ){
    return function( a, b ){
        return ( a && a[key] || '' ).localeCompare( b && b[key] || '' );
    };
}


function reverseSortComparison( sort ){
    return function( a, b ){
        return -1 * sort(a,b);
    };
}




function createSortableTable( table ){    
    // index table data so rows can be ordered and replaced
    // TODO ideally need to be able to re-index table if cell data changes (not currently required)
    // TODO also need to be careful if any HTML has events attached - can jQuery maintain them between DOM removal
    // TODO saving order in local storage against table id attribute
    var rows = [],
        cols = [],
        colId = 0,
        visible, // <- currently renderable set of rows
        sorted,  // <- currently sorted column
        sortId,  // <- currently sorting on column index
        body = table.getElementsByTagName('tbody')[0],
        head = table.getElementsByTagName('thead')[0],
        index = CommonJS.require("$9","fulltext.js").init()
    ;
    // quit if table has no head or body
    if( ! head || ! body ){
        return;
    }
    // redraw all table rows from passed set of rows
    function redrawRows( rows ){
        var i = -1, t = rows.length;
        // graceful redraw removes rows (cos IE) and re-appends each row in order
        $('tr',body).remove();
        while( ++i < t ){
            body.appendChild( rows[i].$ );
        }
    }
    // sort table on a given column and re-insert rows
    function sortByColumn( colId ){
        var col = cols[colId],
            type = col.type,
            desc = ! ( col.desc = ! col.desc );
        // console.debug('Sorting on ['+colId+'] '+(desc?'desc':'asc')+', type is '+type );
        visible = sortItems( visible||rows.slice(0), colId, type, desc );
        redrawRows( visible );
        // set class to show currently sorted column and its direction
        sorted && sorted.removeClass('loco-desc loco-asc');
        sorted = $(col.$).addClass(desc?'loco-desc':'loco-asc').removeClass(desc?'loco-asc':'loco-desc');
        sortId = colId;
    }
    // filter table on all columns given a search string
    function filterRows( value ){
        if( value ){
            visible = index.find( value, rows );
        }
        else {
            visible = rows.slice(0);
        }
        if( sortId ){
            var col = cols[sortId];
            visible = sortItems( visible, sortId, col.type, col.desc );
        }
        redrawRows( visible );        
    }
    // establish keys and their datatype
    $('th',head).each( function( realId, th ){
        var type = th.getAttribute('data-sort-type');
        if( type ){
            // dereference offset and fix for colspans
            realId = colId;
            // linkify header for sorting click
            $(th).addClass('loco-sort').click( function(event){
                event.preventDefault();
                sortByColumn( realId );
                return false;
            } );
            // register key (offset) and data type (sort method)
            cols[colId] = { $:th, type:type };
        }
        // irritatingly colspan will throw off our indexes
        // ok as long as we can match to data cells
        if( th.hasAttribute('colspan') ){
            colId += Number( th.getAttribute('colspan') );
        }
        else {
            colId ++;
        }
    } );
    // index all rows such that every item contains key, type and value
    $('tr',body).each( function( rowId, tr ){
        var td, colId,
            value,
            texts = [],
            fields = { _: rowId, $: tr },
            cells = tr.getElementsByTagName('td');
        // add each column offset value as a comparable field
        for( colId in cols ){
            td = cells[colId];
            // index raw cell value
            value = td.textContent.replace(/(^\s+|\s+$)/g,'');
            value && texts.push( value );
            // sort on special value if defined
            if( td.hasAttribute('data-sort-value') ){
                value = td.getAttribute('data-sort-value');
            }
            // cast value if needed
            switch( cols[colId].type ){
                case 'n':
                value = Number(value);
                break;
            }
            fields[colId] = value;
        }
        rows[rowId] = fields;
        index.index( rowId, texts );
        // data cells had better not have colspans :-/
        // if( td.hasAttribute('colspan') ){ .........
    } );
    // enable filter form if it exists in parent element 
    var $input = $('form.loco-filter input[type="text"]', table.parentNode );
    if( $input.length ){
        var elText = $input[0],
            $form  = $(elText.form)
        ;
        if( rows.length > 1 ){
            CommonJS.require("$10","LocoTextListener.js").listen( elText, filterRows );
        }
        else {
           $form.hide();
        }
        $form.on( 'submit', function( event ){
            event.preventDefault();
            return false;
        } );
    }
}




// expose utilities

exports.init = createSortableTable;

return exports;
}({},window,document) );

/**
 * Expose most common JS modules to a global "locoScope" object
 * Not using "loco" because it conflicts with element id.
 * 
 * This must load before page-specific script, but after translations.
 */

var loco = window.locoScope || ( window.locoScope = {} ),   
    conf = window.locoConf  || ( window.locoConf = {} ),
    l10n = CommonJS.require("$1","t.js").init(),
    lang = conf.wplang
;

// polyfills and wp aliases
CommonJS.require("$2","html.js");
CommonJS.require("$3","number.js");
CommonJS.require("$4","array.js");


// expose translation access
loco.l10n = l10n;
l10n.load( conf.wpl10n );
lang && l10n.pluraleq( lang.pluraleq );

// formatting utilities
loco.string = CommonJS.require("$5","string.js");

// admin notices
loco.notices = CommonJS.require("$6","notices.js").init( l10n );

// ajax functions
loco.ajax = CommonJS.require("$7","ajax.js").init( conf ).localise( l10n );

// locale object casting
loco.locale = CommonJS.require("$8","wplocale.js");

// full text indexer
loco.fulltext = CommonJS.require("$9","fulltext.js");

// text field listener
loco.watchtext = CommonJS.require("$10","LocoTextListener.js").listen;

// tipsy tooltip
loco.tooltip = CommonJS.require("$11","tooltip.js");

// gettext utils
loco.po = {
    ed: CommonJS.require("$12","poedit.js"),
    kbd: CommonJS.require("$13","hotkeys.js"),
    init: CommonJS.require("$14","po.js").create,
    ace: CommonJS.require("$15","ace.js").strf('php'),
    ref: CommonJS.require("$16","refs.js")
};

// external apis (incl. machine translation providers)
loco.apis = CommonJS.require("$17","apis.js");

// file system connection
loco.fs = CommonJS.require("$18","fsconn.js");

// make all list tables sortable
$('#loco.wrap table.wp-list-table').each( function( i, table ){
    CommonJS.require("$19","tables.js").init( table );
} );


/*/ set page title if configured?
if( conf.title ){
    // format of actual title would be "%1$s &lsaquo; %2$s &#8212; WordPress" except it could be translated!
    document.title = conf.title+' ‹ '+document.title;
}*/

} )( window, document, window.jQuery );

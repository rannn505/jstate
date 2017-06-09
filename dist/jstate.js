/*********************************************************
 * jstate - JS state done easy
 * @version v1.0.0
 * @link https://github.com/rannn505/jstate#readme
 * @copyright Copyright (c) 2017 Ran Cohen <rannn505@outlook.com>
 * @license MIT (http://www.opensource.org/licenses/mit-license.php)
 * @Compiled At: 2017-06-09
  *********************************************************/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jstate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDevTools = showDevTools;

var _store = require('./store');

var _devToolsTemplate = require('./devToolsTemplate.html');

var _devToolsTemplate2 = _interopRequireDefault(_devToolsTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showDevTools() {
  var popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  var queue = [],
      isReady = false;
  var __FLUSH__ = function __FLUSH__() {
    if (queue.length === 0) return;
    popup.postMessage(queue.shift(), '*');
    return __FLUSH__();
  };
  setTimeout(function () {
    popup.opener = {
      notifyReady: function notifyReady() {
        isReady = true;__FLUSH__();
      },
      setState: _store.setState,
      overwriteState: _store.overwriteState,
      register: _store.register
    };
    popup.document.write(_devToolsTemplate2.default);
  }, 0);
  var __DEVTOOLS__ = function __DEVTOOLS__(next) {
    return function (action) {
      var oldState = _store.state;
      next(action);
      queue.push({
        action: action,
        state: _store.state,
        oldState: oldState
      });
      isReady && __FLUSH__();
    };
  };
  (0, _store.register)(__DEVTOOLS__);
}

},{"./devToolsTemplate.html":2,"./store":4}],2:[function(require,module,exports){
module.exports = "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\">\r\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n  <title> jState DevTools </title>\r\n  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Inconsolata\" media=\"screen\">\r\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css\" media=\"screen\">\r\n  <!-- <link rel=\"stylesheet\" href=\"./jsonviewer/jsonviewer.min.css\" media=\"screen\"> -->\r\n  <link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/rannn505/jstate/master/src/jsonviewer/jsonviewer.min.css\" media=\"screen\">\r\n  <link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/benjamine/jsondiffpatch/master/public/formatters-styles/html.css\" media=\"screen\">\r\n  <link rel=\"stylesheet\" href=\"https://cdn.rawgit.com/benjamine/jsondiffpatch/master/public/formatters-styles/annotated.css\" media=\"screen\">\r\n  <style>body{position:fixed;top:0;bottom:0;left:0;right:0;padding:0;margin:0;color:#6e6e6e;list-style:none;background-color:#fff;font-family:Inconsolata,monospace;min-height:325px;min-width:325px}.container{width:100%;height:100%;overflow:hidden;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-flow:column;flex-flow:column}.title{font-size:14px;text-align:center}.btns{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-flow:row wrap;flex-flow:row wrap}.actions{flex:10 2;overflow-y:auto;overflow-x:hidden}.btn{background-color:#fff;border:1px solid #ccc;color:#555;font-family:monospace;border-radius:1px;padding:5px 10px;text-align:center;text-decoration:none;display:inline-block;font-size:14px}.btn:hover{background-color:#ccc}.btn:active{background-color:#c1c1c1}.input{padding:6px 12px;font-size:14px;font-family:Inconsolata,monospace;line-height:1.42857143;color:#555;background-color:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.hr{width:100%}@keyframes example{from{opacity:1}to{opacity:0}}.circle:before{position:absolute;top:10px;right:15px;color:#90ee90;content:'\\25CF';font-size:30px}::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3);-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3)}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(60,63,65,.8);box-shadow:inset 0 0 6px rgba(0,0,0,.5);-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.5)}</style></head><body>\r\n  <div class=\"container\">\r\n    <div class=\"actions\" id=\"actions\">\r\n    </div>\r\n    <div class=\"btns\">\r\n      <input class=\"input\" placeholder=\"setState() &#x21B4\" style=\"flex:10 2\" type=\"text\" id=\"setState\">\r\n      <button class=\"btn\" id=\"reset\">Reset &#x21BA</button>\r\n      <button class=\"btn\" id=\"rollback\">Rollback &#x21B6</button>\r\n    </div>\r\n    <div class=\"title\">\r\n      jState DevTools\r\n    </div>\r\n  </div>\r\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://cdn.rawgit.com/rannn505/jstate/master/src/jsonviewer/jsonviewer.min.js\"></script><script src=\"https://cdn.rawgit.com/benjamine/jsondiffpatch/master/public/build/jsondiffpatch.min.js\"></script><script src=\"https://cdn.rawgit.com/benjamine/jsondiffpatch/master/public/build/jsondiffpatch-formatters.min.js\"></script><script>!function(){function renderNodes(){$(\"#actions\").empty(),$.each(nodes,function(e,t){$(\"#actions\").prepend('<div id=\"'+t.id+'\"></div>');var n=$(\"#\"+t.id);e===nodes.length-1&&n.addClass(\"animated slideInDown\"),n.append('<div id=\"'+t.id+'T\"></div>'),$(\"#\"+t.id+\"T\").jsonviewer(t,e===nodes.length-1),n.append('<button class=\"btn\" style=\"width: 100%;\"> Toggle diff &#x2195 </button>'),n.append('<div id=\"'+t.id+'B\" style=\"margin-top: 5px;\"></div>');var d=$(\"#\"+t.id+\"B\");$(\"#\"+t.id+\" .btn\").click(function(){d.toggle()}),d.hide();var o=diffpatcher.diff(t.oldState,t.state);\"undefined\"==typeof o?d.html(\"no diff\"):d.html(jsondiffpatch.formatters.html.format(o,t.oldState)),d.append('<hr class=\"hr\"/>')})}if(!window.jQuery)throw new Error(\"jQuery is not loaded. please check your network connectivity\");var nodes=[],id=0,diffpatcher=jsondiffpatch.create({objectHash:function(e,t){return\"undefined\"!=typeof e._id?e._id:\"undefined\"!=typeof e.id?e.id:\"undefined\"!=typeof e.name?e.name:\"$$index:\"+t}});jsondiffpatch.formatters.html.hideUnchanged(),$(window).on(\"message\",function(e){nodes.push({id:++id,action:e.originalEvent.data.action,state:e.originalEvent.data.state,oldState:e.originalEvent.data.oldState}),renderNodes()}),$(\"#setState\").on(\"keypress\",function(e){var code=e.keyCode?e.keyCode:e.which;if(13===code){e.preventDefault();var input=$(\"#setState\");try{opener.setState(eval(\"(\"+input.val()+\")\")),input.val(\"\")}catch(e){throw new Error(\"Invalid JSON\")}}}),$(\"#reset\").on(\"click\",function(){nodes=[],id=0,opener.overwriteState({}),renderNodes()}),$(\"#rollback\").on(\"click\",function(){nodes.pop()&&nodes.length>0?opener.overwriteState(nodes[nodes.length-1].state):opener.overwriteState({}),renderNodes()}),opener.notifyReady()}();</script></body></html>";

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

Object.defineProperty(exports, 'state', {
  enumerable: true,
  get: function get() {
    return _store.state;
  }
});
Object.defineProperty(exports, 'setState', {
  enumerable: true,
  get: function get() {
    return _store.setState;
  }
});
Object.defineProperty(exports, 'register', {
  enumerable: true,
  get: function get() {
    return _store.register;
  }
});

var _devTools = require('./devTools');

Object.defineProperty(exports, 'showDevTools', {
  enumerable: true,
  get: function get() {
    return _devTools.showDevTools;
  }
});


if (!global.jQuery) {
  global['$'] = {};
}
var STORE = require('./store');
Object.keys(STORE).forEach(function (key) {
  return key !== 'overwriteState' && Object.defineProperty(global.$, key, Object.getOwnPropertyDescriptor(STORE, key));
});
Object.defineProperty(global.$, 'showDevTools', Object.getOwnPropertyDescriptor(require('./devTools'), 'showDevTools'));
Object.defineProperty(global.$, '_', Object.getOwnPropertyDescriptor(STORE, 'state'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./devTools":1,"./store":4}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _state = {};
var _middlewares = [];

exports.default = {
  get state() {
    return _extends({}, _state);
  },
  setState: function setState(partialState) {
    if ((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) !== 'object') {
      throw new TypeError('setState() takes an object of state variables to update');
    }
    _state = _extends({}, _state, partialState);
  },
  overwriteState: function overwriteState(newState) {
    _state = _extends({}, newState);
  },
  register: function register() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }

    _middlewares = _middlewares.concat(middlewares);
    var chain = _middlewares.reduceRight(function (f, g) {
      return function (next) {
        return f(g(next));
      };
    })(function (partialState) {
      return _state = _extends({}, _state, partialState);
    });
    module.exports.setState = chain;
    global['$'].setState = chain;
    module.exports.overwriteState = _middlewares.reduceRight(function (f, g) {
      if (g.name === '__DEVTOOLS__') {
        return f;
      }
      return function (next) {
        return f(g(next));
      };
    })(function (newState) {
      return _state = _extends({}, newState);
    });
  }
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3])(3)
});
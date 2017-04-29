/*********************************************************
 * jstate - JS state done easy
 * @version v1.0.0
 * @link https://github.com/rannn505/jstate#readme
 * @copyright Copyright (c) 2017 Ran Cohen <rannn505@outlook.com>
 * @license MIT (http://www.opensource.org/licenses/mit-license.php)
 * @Compiled At: 2017-04-29
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

var popup = void 0,
    queue = [];

var devTools = function devTools(next) {
  return function (args) {
    var oldState = (0, _store.getState)();
    var result = next(args);
    queue.push({
      id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
      action: args,
      state: (0, _store.getState)(),
      oldState: oldState
    });
    popup.postMessage('FLUSH', '*');
    return result;
  };
};
function showDevTools() {
  popup = window.open(null, 'jstate-dev-tools', 'width=400,height=600,menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  popup.location.reload();
  (0, _store.register)(devTools);
  setTimeout(function () {
    popup.opener = {
      getState: _store.getState,
      setState: _store.setState,
      overwriteState: _store.overwriteState,
      register: _store.register,
      queue: queue
    };
    popup.document.write(_devToolsTemplate2.default);
  }, 10);
}

},{"./devToolsTemplate.html":2,"./store":4}],2:[function(require,module,exports){
module.exports = "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\">\r\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\r\n  <title> JState DevTools </title>\r\n  <link href=\"https://fonts.googleapis.com/css?family=Inconsolata\" rel=\"stylesheet\">\r\n  <link href=\"https://cdn.rawgit.com/todylu/monaco.ttf/master/monaco.ttf\" rel=\"stylesheet\">\r\n  <link href=\"https://cdn.rawgit.com/rannn505/jstate/master/src/jsonviewer/jsonviewer.min.css\" rel=\"stylesheet\">\r\n  <style>body{position:fixed;top:0;bottom:0;left:0;right:0;padding:0;margin:0;color:#6e6e6e;list-style:none;background-color:#fff;font-family:monaco,Inconsolata,monospace;min-height:325px;min-width:325px}.container{width:100%;height:100%;overflow:hidden;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-flow:column;flex-flow:column}.title{font-size:14px;text-align:center}.btns{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-flex-flow:row wrap;flex-flow:row wrap}.actions{flex:10 2;overflow-y:auto;overflow-x:hidden}.btn{background-color:#fff;border:1px solid #ccc;color:#555;font-family:monospace;border-radius:1px;padding:5px 10px;text-align:center;text-decoration:none;display:inline-block;font-size:14px}.btn:hover{background-color:#ccc}.btn:active{background-color:#c1c1c1}.input{padding:6px 12px;font-size:14px;font-family:Inconsolata,monospace;line-height:1.42857143;color:#555;background-color:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.hr{width:100%}::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3);-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3)}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(60,63,65,.8);box-shadow:inset 0 0 6px rgba(0,0,0,.5);-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.5)}</style></head><body>\r\n  <div class=\"container\">\r\n    <div class=\"actions\" id=\"actions\">\r\n    </div>\r\n    <div class=\"btns\">\r\n      <input class=\"input\" placeholder=\"setState()\" style=\"flex:10 2\" type=\"text\" id=\"setState\">\r\n      <button class=\"btn\" id=\"reset\">Reset</button>\r\n      <button class=\"btn\" id=\"rollback\">Rollback</button>\r\n    </div>\r\n    <div class=\"title\">\r\n      JState DevTools\r\n    </div>\r\n  </div>\r\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script><script src=\"https://cdn.rawgit.com/rannn505/jstate/master/src/jsonviewer/jsonviewer.min.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/jsondiffpatch/0.2.4/jsondiffpatch.min.js\"></script><script>!function(){function renderNodes(){$(\"#actions\").empty(),$.each(nodes,function(e,n){$(\"#actions\").prepend('<div id=\"'+n.id+'\"></div>');var o=$(\"#\"+n.id);o.jsonviewer(n,e===nodes.length-1),o.append('<hr class=\"hr\"/>')})}function addNode(e){e.diff=jsondiffpatch.diff(e.oldState,e.state),delete e.oldState,nodes.push(e),renderNodes()}function flush(e){if(0!==e.length)return addNode(e.shift()),flush(e)}if(!window.jQuery)throw new Error(\"jQuery is not loaded. please check your network connectivity\");var nodes=[];$(window).on(\"message\",function(){flush(opener.queue)}),$(\"#setState\").on(\"keypress\",function(e){var code=e.keyCode?e.keyCode:e.which;if(13===code){e.preventDefault();var input=$(\"#setState\");try{opener.setState(eval(\"(\"+input.val()+\")\")),input.val(\"\")}catch(e){throw new Error(\"Invalid JSON\")}}}),$(\"#reset\").on(\"click\",function(){nodes=[],opener.overwriteState({}),renderNodes()}),$(\"#rollback\").on(\"click\",function(){nodes.pop()&&nodes.length>0?opener.overwriteState(nodes[nodes.length-1].state):opener.overwriteState({}),renderNodes()}),flush(opener.queue)}();</script></body></html>";

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

Object.defineProperty(exports, 'getState', {
  enumerable: true,
  get: function get() {
    return _store.getState;
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

},{"./devTools":1,"./store":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.state = {};
    this.middlewares = [];
  }

  _createClass(Store, [{
    key: 'getState',
    value: function getState() {
      return _extends({}, this.state);
    }
  }, {
    key: 'setState',
    value: function setState(partialState) {
      if ((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) !== 'object') {
        throw new TypeError('setState() takes an object of state variables to update');
      }
      this.state = _extends({}, this.state, partialState);
    }
  }]);

  return Store;
}();

var context = new Store();
var getState = exports.getState = function getState() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Store.prototype.getState.apply(context, args);
};
var setState = exports.setState = function setState() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Store.prototype.setState.apply(context, args);
};
var overwriteState = exports.overwriteState = function overwriteState(newState) {
  return context.state = _extends({}, newState);
};
var register = exports.register = function register() {
  for (var _len3 = arguments.length, middlewares = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    middlewares[_key3] = arguments[_key3];
  }

  context.middlewares = context.middlewares.concat(middlewares);
  exports.setState = setState = context.middlewares.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  })(function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return Store.prototype.setState.apply(context, args);
  });
};

},{}]},{},[3])(3)
});
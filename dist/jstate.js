/*********************************************************
 * jstate - Really friendly Flux implementation
 * @version v1.0.0
 * @link https://github.com/rannn505/jstate#readme
 * @copyright Copyright (c) 2017 Ran Cohen <rannn505@outlook.com>
 * @license MIT (http://www.opensource.org/licenses/mit-license.php)
 * @Compiled At: 2017-10-11
  *********************************************************/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jstate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


if (!global.jQuery) {
  global['$'] = {};
}
var STORE = require('./store');
Object.keys(STORE).forEach(function (key) {
  return key !== 'overwriteState' && Object.defineProperty(global.$, key, Object.getOwnPropertyDescriptor(STORE, key));
});
Object.defineProperty(global.$, '_', Object.getOwnPropertyDescriptor(STORE, 'state'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./store":2}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _state = {};
var _middlewares = [];

exports.default = {
  get state() {
    // return Object.assign({}, _state);
    return JSON.parse(JSON.stringify(_state));
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
    var chain = _middlewares.reduceRight(function (prev, cur) {
      return function (next) {
        return prev(cur(next));
      };
    })(function (partialState) {
      return _state = _extends({}, _state, partialState);
    });
    module.exports.setState = chain;
    global['$'].setState = chain;
    module.exports.overwriteState = _middlewares.reduceRight(function (prev, cur) {
      if (cur.name === '__DEVTOOLS__') {
        return prev;
      }
      return function (next) {
        return prev(cur(next));
      };
    })(function (newState) {
      return _state = _extends({}, newState);
    });
  }
};
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
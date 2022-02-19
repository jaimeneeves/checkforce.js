/*!
 * checkforce.js - 3.0.0 (c) 2022, Jaime Neves |
 *   MIT | https://github.com/dejaneves/checkforce.js#readme
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Popper"), require("zxcvbn"));
	else if(typeof define === 'function' && define.amd)
		define(["Popper", "zxcvbn"], factory);
	else if(typeof exports === 'object')
		exports["CheckForce"] = factory(require("Popper"), require("zxcvbn"));
	else
		root["CheckForce"] = factory(root["Popper"], root["zxcvbn"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__popperjs_core__, __WEBPACK_EXTERNAL_MODULE_zxcvbn__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "$on": () => (/* binding */ $on)
/* harmony export */ });
/**
 * querySelector wrapper
 *
 * @param {String} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
var qs = function qs(selector, scope) {
  return (scope || document).querySelector(selector);
};
/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */

function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

/***/ }),

/***/ "./src/wrapper.js":
/*!************************!*\
  !*** ./src/wrapper.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PwdStrengthWrapper": () => (/* binding */ PwdStrengthWrapper)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function PwdStrengthWrapper(options) {
  var defaults = {
    res: {},
    container: '',
    progressStatus: ['success', 'warning', 'danger']
  };

  if (_typeof(options) === 'object') {
    options = Object.assign({}, defaults, options);
  } else {
    options = defaults;
  }

  var setData = function setData(container, res) {
    options.container = container;
    options.res = res;
  };
  /**
   * @param {HTMLElement} box 
   */


  var progress = function progress(box) {
    if (!box) throw 'No HTML container';

    if (options.res.pwd.score === 0 || options.res.pwd.score == 1 || options.res.pwd.score === 2 && !options.res.pwd.highLevelSecurity) {
      progressClasses('danger', box);
    }

    if (options.res.pwd.score === 2 && options.res.pwd.highLevelSecurity || options.res.pwd.score === 3) {
      progressClasses('warning', box);
    }

    if (options.res.pwd.score === 4) {
      progressClasses('success', box);
    }

    if (options.res.pwd.score === -1) {
      progressClasses(null, box);
    }
  };

  var progressClasses = function progressClasses(classType, box) {
    var _box$classList;

    var classes = options.progressStatus;

    (_box$classList = box.classList).remove.apply(_box$classList, _toConsumableArray(classes));

    if (classType) {
      box.classList.add("".concat(classType));
    }
  };

  return {
    progress: progress,
    setData: setData
  };
}

/***/ }),

/***/ "@popperjs/core":
/*!*************************!*\
  !*** external "Popper" ***!
  \*************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__popperjs_core__;

/***/ }),

/***/ "zxcvbn":
/*!*************************!*\
  !*** external "zxcvbn" ***!
  \*************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_zxcvbn__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForce)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "@popperjs/core");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_popperjs_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zxcvbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zxcvbn */ "zxcvbn");
/* harmony import */ var zxcvbn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zxcvbn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wrapper */ "./src/wrapper.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * checkforce.js
 *
 * @author Jaime Neves <https://github.com/dejaneves>
 * @license MIT
 */





var isRTL = function isRTL() {
  return document.documentElement.dir === 'rtl';
};

var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
var Default = {
  containerId: 'checkforce-tooltip',
  elementProgress: 'checkforce-progress',
  elementProgressText: 'checkforce-progress-title',
  minPasswordLength: 8,
  placement: 'top',
  template: "\n  <div id=\"arrow\" data-popper-arrow></div>\n  <div class=\"checkforce-popover\">\n    <div class=\"checkforce-popover-body\">\n      <div class=\"checkforce-popover-title\">N\xEDvel de seguran\xE7a</div>\n      <div class=\"checkforce-progress\">\n        <div class=\"checkforce-progress-title\">Nenhum</div>\n        <div class=\"checkforce-progress-level\">\n          <div class=\"checkforce-progress-bar progress-bar--danger\" style=\"width: 29%\"></div>\n          <div class=\"checkforce-progress-bar progress-bar--warning\" style=\"width: 29%\"></div>\n          <div class=\"checkforce-progress-bar progress-bar--success\" style=\"width: 29%\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
  trigger: {
    selector: '',
    eventListener: ['keyup']
  }
};

var CheckForce = /*#__PURE__*/function () {
  function CheckForce(element, config) {
    _classCallCheck(this, CheckForce);

    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('CheckForce require Popper (https://popper.js.org)');
    }

    if (typeof (zxcvbn__WEBPACK_IMPORTED_MODULE_1___default()) === 'undefined') {
      throw new TypeError('CheckForce require zxcvbn (https://github.com/dropbox/zxcvbn)');
    }

    if (!element) {
      throw new Error('Missing input argument');
    }

    this.eventList = [];
    this._element = this._getElement(element);
    this._popper = null;
    this._wrapper = null;
    this._config = this._getConfig(config);
    this.resolveOptions();
  }

  _createClass(CheckForce, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      if (!this._element || !this._element.nodeType) {
        throw new Error('Trigger must be a HTML element');
      }

      this._wrapper = (0,_wrapper__WEBPACK_IMPORTED_MODULE_2__.PwdStrengthWrapper)(this.constructor.Default);
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      var hideEvents = ['blur'];
      (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.$on)(this._element, 'focus', function (_ref) {
        var currentTarget = _ref.currentTarget;

        _this.show(currentTarget);
      });
      hideEvents.forEach(function (eventType) {
        _this._element.addEventListener(eventType, function (event) {
          _this.hide();
        }, false);
      });

      this._element.addEventListener('keyup', function (event) {
        _this.checkPassword(event);
      }, false);
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(event) {
      if (event.keyCode === 32 || event.which === 32) {
        event.preventDefault();
        return;
      }

      var target = event.currentTarget;
      var value = target.value;
      var container = target.parentNode.querySelector("#".concat(this._getContainerId()));
      var text = container.querySelector(".".concat(this._config.elementProgressText));
      var result = {
        str: {},
        pwd: {}
      };

      if (value) {
        result.str = this._checkString(value);
        result.pwd = zxcvbn__WEBPACK_IMPORTED_MODULE_1___default()(value);
        result.pwd.highLevelSecurity = true; // weak password

        if (result.pwd.score === 0 || result.pwd.score === 1 || result.pwd.score === 2 && parseInt(result.pwd.guesses_log10) < 8) {
          text.innerHTML = "Fraca";
          result.pwd.highLevelSecurity = false;
        } // medium password


        if (result.pwd.score === 2 && parseInt(result.pwd.guesses_log10) >= 8 || result.pwd.score === 3) {
          text.innerHTML = "Médio";
        } // strong password


        if (result.pwd.score === 4) {
          text.innerHTML = "Forte";
        }

        this._runWrapper(container, result);
      } else {
        text.innerHTML = "Nenhum";
        result.pwd.score = -1;

        this._runWrapper(container, result);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.qs)("#".concat(this._getContainerId())).removeAttribute('data-show');
    }
  }, {
    key: "show",
    value: function show(target) {
      var parentNode = target.parentNode;
      var placement = typeof this._config.placement === 'string' ? this._config.placement : this.constructor.Default['placement'];

      var attachment = this._getAttachment(placement);

      var container = parentNode.querySelector("#".concat(this._getContainerId()));

      if (!container) {
        container = document.createElement('div');
        container.innerHTML = this._config.template;
        container.setAttribute('id', this._getContainerId());
        container.setAttribute('role', 'tooltip');
        container.setAttribute('data-show', '');
        parentNode.insertBefore(container, target.nextSibling);
      } else {
        container.setAttribute('data-show', '');
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper(this._element, container, this._getPopperConfig(attachment));
      }
    }
  }, {
    key: "_getContainerId",
    value: function _getContainerId() {
      return this.constructor.Default['containerId'];
    }
  }, {
    key: "_getElement",
    value: function _getElement(element) {
      return typeof element === 'string' ? (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.qs)(element) : element;
    }
  }, {
    key: "_getAttachment",
    value: function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig(attachment) {
      var defaultPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }]
      };
      return defaultPopperConfig;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread(_objectSpread({}, this.constructor.Default), _typeof(config) === 'object' && config ? config : {});
      return config;
    }
    /**
     * @param {HTMLElement} container
     * @param {Object} result
     */

  }, {
    key: "_runWrapper",
    value: function _runWrapper(container, result) {
      var progressBox = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.qs)(".".concat(this.constructor.Default['elementProgress']), container);

      this._wrapper.setData(container, result);

      this._wrapper.progress(progressBox);
    }
    /**
     * @param {String} str
     */

  }, {
    key: "_checkString",
    value: function _checkString(str) {
      var lowerCaseRegex = RegExp('(?=.*[a-z])');
      var upperCaseRegex = RegExp('(?=.*[A-Z])');
      var digitRegex = RegExp('(?=.*\\d)');
      var lowerCaseFlag = lowerCaseRegex.test(str);
      var upperCaseFlag = upperCaseRegex.test(str);
      var digitFlag = digitRegex.test(str);
      var lengthFlag = str.length >= this.constructor.Default['minPasswordLength'];
      return {
        lowerCaseFlag: lowerCaseFlag,
        upperCaseFlag: upperCaseFlag,
        digitFlag: digitFlag,
        lengthFlag: lengthFlag
      };
    }
  }], [{
    key: "Default",
    get: function get() {
      return Default;
    }
  }]);

  return CheckForce;
}();


})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=checkforce.js.map
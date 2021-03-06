// { "framework": "Vue" }

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["npm/weex-flymeui/index"] = factory();
	else
		root["npm/weex-flymeui/index"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 275);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(6)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(7);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(28);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(12);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(8)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(11),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-68596e9c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68596e9c", Component.options)
  } else {
    hotAPI.reload("data-v-68596e9c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b4010522", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68596e9c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68596e9c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.text[data-v-68596e9c] {\n\tfont-size: 0.38889rem;\n\tline-height: 0.58333rem;\n\tcolor: #999999;\n\tfont-family: \"Source Han Sans CN\", Roboto, sans-serif;\n}\n.medium[data-v-68596e9c] {\n\tfont-family: sans-serif-medium;\n\tfont-weight: 500;\n}\n.bold[data-v-68596e9c] {\n\tfont-weight: 700;\n}\n.light[data-v-68596e9c] {\n\tfont-weight: 400;\n}\n.small[data-v-68596e9c] {\n\tfont-size: 0.33333rem;\n}\n.large[data-v-68596e9c] {\n\tfont-size: 0.44444rem;\n\tfont-weight: 500;\n\tline-height: 0.66667rem;\n\tcolor: #000000;\n}\n.huge[data-v-68596e9c] {\n\tfont-size: 0.5rem;\n\tline-height: 0.75rem;\n\tcolor: #000000;\n}\n.margin-text[data-v-68596e9c] {\n\tmargin-right: 0.08333rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-text/index.vue?79ad515b"],"names":[],"mappings":";AAOA;CACA,sBAAA;CACA,wBAAA;CACA,eAAA;CACA,sDAAA;CACA;AACA;CACA,+BAAA;CACA,iBAAA;CACA;AACA;CACA,iBAAA;CACA;AACA;CACA,iBAAA;CACA;AACA;CACA,sBAAA;CACA;AACA;CACA,sBAAA;CACA,iBAAA;CACA,wBAAA;CACA,eAAA;CACA;AACA;CACA,kBAAA;CACA,qBAAA;CACA,eAAA;CACA;AACA;CACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <text :class=\"textClz\" :style=\"textStyle\"><slot></slot><template v-if=\"!$slots.default\">{{ inValue }}</template></text>\n</template>\n\n<style scoped>\n\t.text {\n\t\tfont-size: 42px;\n\t\tline-height: 63px;\n\t\tcolor: #999999;\n\t\tfont-family: \"Source Han Sans CN\", Roboto, sans-serif;\n\t}\n\t.medium {\n\t\tfont-family: sans-serif-medium;\n\t\tfont-weight: 500;\n\t}\n\t.bold {\n\t\tfont-weight: 700;\n\t}\n\t.light {\n\t\tfont-weight: 400;\n\t}\n\t.small {\n\t\tfont-size: 36px;\n\t}\n\t.large {\n\t\tfont-size: 48px;\n\t\tfont-weight: 500;\n\t\tline-height: 72px;\n\t\tcolor: #000000;\n\t}\n\t.huge {\n\t\tfont-size: 54px;\n\t\tline-height: 81px;\n\t\tcolor: #000000;\n\t}\n\t.margin-text {\n\t\tmargin-right: 9px;\n\t}\n</style>\n\n<script>\nexport default {\n  name: 'FmText',\n  props: {\n    value: String,\n    fontWeight: {\n      type: String,\n      default: 'normal'\n    },\n    size: {\n      type: String,\n      default: 'normal'\n    },\n    textStyle: {\n      type: Object,\n      default: () => ({})\n    },\n    hasTextMargin: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    inValue: ''\n  }),\n  watch: {\n    value (val) {\n      this.inValue = val;\n    }\n  },\n  computed: {\n    textClz () {\n      const clz = ['text'];\n      if (this.hasTextMargin) {\n        clz.push('margin-text');\n      }\n      if (this.size !== 'normal') {\n        clz.push(`${this.size}`);\n      }\n      if (this.fontWeight !== 'normal') {\n        clz.push(`${this.fontWeight}`);\n      }\n      return clz;\n    }\n  },\n  created () {\n    this.value && (this.inValue = this.value);\n    this.$slots.default && (this.inValue = this.$slots.default[0].text);\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmText',
  props: {
    value: String,
    fontWeight: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    },
    textStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      inValue: ''
    };
  },
  watch: {
    value: function value(val) {
      this.inValue = val;
    }
  },
  computed: {
    textClz: function textClz() {
      var clz = ['text'];
      if (this.hasTextMargin) {
        clz.push('margin-text');
      }
      if (this.size !== 'normal') {
        clz.push('' + this.size);
      }
      if (this.fontWeight !== 'normal') {
        clz.push('' + this.fontWeight);
      }
      return clz;
    }
  },
  created: function created() {
    this.value && (this.inValue = this.value);
    this.$slots.default && (this.inValue = this.$slots.default[0].text);
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    class: _vm.textClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.textStyle))
  }, [_vm._t("default"), (!_vm.$slots.default) ? [_vm._v(_vm._s(_vm.inValue))] : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68596e9c", module.exports)
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(14),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-image/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-120a0168", Component.options)
  } else {
    hotAPI.reload("data-v-120a0168", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//

exports.default = {
  name: 'FmImage',
  data: function data() {
    return {
      loaded: false
    };
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    scale: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    occupyingColor: {
      type: String,
      default: 'transparent'
    },
    imgStyle: {
      type: Object
    }
  },
  computed: {
    getStyle: function getStyle() {
      return _extends({
        width: this.width + 'px',
        height: this.height + 'px',
        backgroundColor: this.loaded ? 'transparent' : this.occupyingColor
      }, this.imgStyle);
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      this.$emit('fmImageLoaded', e);
      e.success && (this.loaded = true);
      if (e.success && e.size && e.size.naturalWidth > 0 && this.scale) {
        this.width = e.size.naturalWidth * this.scale;
        this.height = e.size.naturalHeight * this.scale;
      }
    }
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image', {
    ref: "img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.getStyle)),
    attrs: {
      "src": _vm.src
    },
    on: {
      "load": _vm.onLoad
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-120a0168", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = exports.t = undefined;

var _zhCN = __webpack_require__(40);

var _zhCN2 = _interopRequireDefault(_zhCN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lang = _zhCN2.default;

var t = exports.t = function t(path, options) {
  var value = void 0;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return value;
    if (!value) return '';
    current = value;
  }
  return '';
};

var use = exports.use = function use(l) {
  lang = l || lang;
};

exports.default = { t: t, use: use };

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  biaoqing: '&#xe6a3;',
  bofang: '&#xe6a4;',
  bianji: '&#xe6a5;',
  bofang2: '&#xe6a7;',
  cebianlan: '&#xe6a7;',
  caijian: '&#xe6a8;',
  chakan: '&#xe6a9;',
  chexiao: '&#xe6aa;',
  chuangkouhua: '&#xe6ab;',
  daojishi: '&#xe6ac;',
  dianzan: '&#xe6ad;',
  chuangkouhua2: '&#xe6ae;',
  dianhua: '&#xe6af;',
  diannao: '&#xe6b0;',
  dingwei2: '&#xe6b1;',
  dingwei: '&#xe6b2;',
  dingyue: '&#xe6b3;',
  erweima: '&#xe6b4;',
  fanhui: '&#xe6b5;',
  fasong: '&#xe6b6;',
  fujian: '&#xe6b7;',
  fenlei: '&#xe6b8;',
  fanhui2: '&#xeb9;',
  fenxiang: '&#xe6ba;',
  fuzhi: '&#xe6bb;',
  gengduo: '&#xe6bc;',
  gouwuche: '&#xe6bd;',
  gongjuxiang: '&#xe6be;',
  gengduo2: '&#xe6bf;',
  guanbi: '&#xe6c0;',
  jishi: '&#xe6c1;',
  hongxin: '&#xe6c2;',
  jingyin: '&#xe6c3;',
  jianpan: '&#xe6c3;',
  jiesuo: '&#xe6c5;',
  jisuanqi: '&#xe6c36;',
  liangdu: '&#xe6c7;',
  lvjing: '&#xe6c8;',
  paixu: '&#xe6c9;',
  paihang: '&#xe6ca;',
  paizhao: '&#xe6cb;',
  pingmutoushe: '&#xe6cc;',
  riqi: '&#xe6cd;',
  shanchu: '&#xe6ce;',
  shangchaun: '&#xe6cf;',
  shangyishou: '&#xe6d0;',
  shezhi: '&#xe6d1;',
  shizhong: '&#xe6d2;',
  shezhi1: '&#xe6d3;',
  sousuo: '&#xe6d4;',
  shuqian: '&#xe6d5;',
  shuoming: '&#xe6d6;',
  shuaxin: '&#xe6d7;',
  suoding: '&#xe6d8;',
  shipin: '&#xe6d9;',
  tuichu: '&#xe6da;',
  tupian: '&#xe6db;',
  tianjia: '&#xe6dc;',
  tixing: '&#xe6dd;',
  wancheng: '&#xe6de;',
  wengao: '&#xe6df;',
  xiayishou: '&#xe6e0;',
  xinxi: '&#xe6e1;',
  xiazai: '&#xe6e2;',
  xingxing: '&#xe6e3;',
  xinxi1: '&#xe6e4;',
  xuanxiangliebiao: '&#xe6e5;',
  yidu: '&#xe6e6;',
  yinliang: '&#xe6e7;',
  yinbi: '&#xe6e8;',
  yuyin: '&#xe6e9;',
  zanting: '&#xe6ea;',
  yonghu: '&#xe6eb;',
  youjian: '&#xe6ec;',
  zhiding: '&#xe6ed;',
  chongzuo: '&#xe6ee;',
  zhuye: '&#xe6ef;',
  ziti: '&#xe6f0;',
  VPN: '&#xe6f1;',
  'Wi-Fi': '&#xe6f2;',
  zhuti: '&#xe6f3;',
  lanya: '&#xe6f4;',
  quanping: '&#xe6f5;',
  pingmufanzhuan: '&#xe6f6;',
  gouwu: '&#xe6f7;',
  saomiao: '&#xe6f8;'
};

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Yanjiie on 18/04/01
 */
exports.default = {
  primaryColor: '#198DED',
  disabledColor: '#BDE2FB',
  highlightColor: '#156DC9',
  lightColor: '#42A2F1',
  weakColor: '#E6F8FF',
  grayColor: '#F2F3F4',
  fontColorLight: '#FFFFFF',
  fontColorDark: '#3D3D3D',
  fontColorGray: '#F2F3F4'
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(32),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-77aa90fe",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-icon/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-77aa90fe", Component.options)
  } else {
    hotAPI.reload("data-v-77aa90fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("95f1bc1c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77aa90fe\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-77aa90fe\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//

var _map = __webpack_require__(21);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = weex.requireModule('dom');

exports.default = {
  name: 'FmIcon',
  props: {
    name: {
      default: 'wancheng',
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: [Number, Object, String],
      default: 42
    },
    color: {
      type: String,
      default: '#666666'
    }
  },
  data: function data() {
    return {
      Icon: _map2.default
    };
  },
  computed: {
    getIcon: function getIcon() {
      var Icon = this.Icon,
          name = this.name,
          value = this.value;

      return decode(value === '' ? Icon[name] || 'wancheng' : value);
    },
    mergeStyle: function mergeStyle() {
      var iconStyle = this.iconStyle;

      var style = { fontFamily: 'flymeicon', color: this.color };
      if (Object.prototype.toString.call(this.iconStyle).slice(8, -1).toLowerCase() !== 'object') {
        style.fontSize = iconStyle + 'px';
        style.height = iconStyle + 'px';
      } else {
        style = Object.assign({}, style, _extends({}, iconStyle));
      }
      return style;
    }
  },
  beforeCreate: function beforeCreate() {
    if (!this.isCreator) {
      dom.addRule('fontFace', {
        'fontFamily': 'flymeicon',
        'src': "url('http://weixin-res.flyme.cn/resources/weex-flymeui/assets/iconfont.ttf')"
      });
    }
  },

  methods: {
    itemClicked: function itemClicked(name) {
      this.$emit('fmIconClicked', {
        name: name
      });
    }
  }
};


var reg = /&([^;]{2,});?/g;
var decode = function decode(html) {
  html = html.replace(reg, function (match, entity) {
    if (entity.charAt(0) === '#') {
      var num = 0;
      if (entity.charAt(1).toLowerCase() === 'x') {
        num = parseInt(entity.slice(2), 16);
      } else {
        num = parseInt(entity.slice(1), 10);
      }
      if (!isNaN(num) && num >= -32768 && num <= 65535) {
        return String.fromCharCode(num);
      }
    }
    return match;
  });
  return html;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.mergeStyle)),
    on: {
      "click": function($event) {
        _vm.itemClicked(_vm.name)
      }
    }
  }, [_vm._v(_vm._s(_vm.getIcon))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-77aa90fe", module.exports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(15);

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(35);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-45eab412",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-button/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-45eab412", Component.options)
  } else {
    hotAPI.reload("data-v-45eab412", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7062c965", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-45eab412\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-45eab412\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-button[data-v-45eab412] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  overflow: hidden;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  -webkit-transition-property: backgroundColor,-webkit-transform;\n  transition-property: backgroundColor,-webkit-transform;\n  transition-property: transform,backgroundColor;\n  transition-property: transform,backgroundColor,-webkit-transform;\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n}\n.fm-button-hollow[data-v-45eab412] {\n  border-width: 0.03704rem;\n}\n.button-text[data-v-45eab412] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-align: center;\n  color: #FFFFFF;\n  font-weight: 500;\n  font-family: sans-serif-medium;\n}\n.fm-button-small[data-v-45eab412] {\n  height: 0.66667rem;\n  border-radius: 0.33333rem;\n}\n.fm-button-middle[data-v-45eab412] {\n  width: 2.88889rem;\n  height: 1.05556rem;\n  border-radius: 0.52778rem;\n}\n.fm-button-large[data-v-45eab412] {\n  width: 3.66667rem;\n  height: 1.05556rem;\n  border-radius: 0.52778rem;\n}\n.fm-button-circle[data-v-45eab412] {\n  width: 1.55556rem;\n  height: 1.55556rem;\n  border-radius: 0.77778rem;\n}\n.fm-button-huge[data-v-45eab412] {\n  width: 6.66667rem;\n  height: 1.05556rem;\n  border-radius: 0.52778rem;\n}\n.button-text-small[data-v-45eab412] {\n  font-size: 0.33333rem;\n}\n.button-text-middle[data-v-45eab412],\n.button-text-large[data-v-45eab412],\n.button-text-huge[data-v-45eab412] {\n  font-size: 0.44444rem;\n}\n.overlay[data-v-45eab412] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 30;\n  border-radius: 1.85185rem;\n}\n.overlay[data-v-45eab412]:active {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-button/index.vue?71b38c2e"],"names":[],"mappings":";AAwBA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,iBAAA;EACA,4BAAA;UAAA,oBAAA;EACA,+DAAA;EAAA,uDAAA;EAAA,+CAAA;EAAA,iEAAA;EACA,kCAAA;UAAA,0BAAA;EACA,wEAAA;UAAA,gEAAA;CACA;AAEA;EACA,yBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,eAAA;EACA,iBAAA;EACA,+BAAA;CACA;AAEA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;;;EAGA,sBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,0BAAA;CACA;AAEA;EACA,qCAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div ref=\"fm-button\"\n       class=\"fm-button\"\n       :class=\"buttonClass\"\n       @click=\"btnClick\"\n       @touchstart=\"_startHandle\"\n       @touchend=\"_endHandle\"\n       :style=\"computedStyle\">\n    <div v-if=\"!disabled\" class=\"overlay\" @click=\"btnClick\"></div>\n    <fm-icon v-if=\"type === 'circle'\"\n             :color=\"(type !== 'hollow') ? titleColor : color\"\n             :name=\"icon\"\n             icon-style=\"72\"></fm-icon>\n    <slot v-else name=\"title\">\n      <text :class=\"['button-text-' + size]\"\n            :style=\"Object.assign({}, { color: (type !== 'hollow') ? titleColor : computedColor }, (titleSize ? { fontSize: titleSize } : {}))\"\n            class=\"button-text\" ><slot></slot><template v-if=\"!$slots.default\">{{ title }}</template></text>\n    </slot>\n  </div>\n</template>\n\n<style scoped>\n  .fm-button {\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    transform: scale(1);\n    transition-property: transform,backgroundColor;\n    transition-duration: 0.2s;\n    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  .fm-button-hollow {\n    border-width: 4px;\n  }\n\n  .button-text {\n    flex: 1;\n    text-align: center;\n    color: #FFFFFF;\n    font-weight: 500;\n    font-family: sans-serif-medium;\n  }\n\n  .fm-button-small {\n    height: 72px;\n    border-radius: 36px;\n  }\n\n  .fm-button-middle {\n    width: 312px;\n    height: 114px;\n    border-radius: 57px;\n  }\n\n  .fm-button-large {\n    width: 396px;\n    height: 114px;\n    border-radius: 57px;\n  }\n\n  .fm-button-circle {\n    width: 168px;\n    height: 168px;\n    border-radius: 84px;\n  }\n\n  .fm-button-huge {\n    width: 720px;\n    height: 114px;\n    border-radius: 57px;\n  }\n\n  .button-text-small {\n    font-size: 36px;\n  }\n\n  .button-text-middle,\n  .button-text-large,\n  .button-text-huge {\n    font-size: 48px;\n  }\n\n  .overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 30;\n    border-radius: 200px;\n  }\n\n  .overlay:active {\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nimport STYLE from 'weex-flymeui/lib/theme/default/index.js';\nconst dom = weex.requireModule('dom');\n\nexport default {\n  name: 'FmButton',\n  components: { FmIcon },\n  props: {\n    size: {\n      type: String,\n      default: 'small'\n    },\n    type: String,\n    color: {\n      type: String,\n      default: STYLE.primaryColor\n    },\n    titleColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    titleSize: {\n      type: Number,\n      default: 0\n    },\n    icon: {\n      type: String,\n      default: 'wancheng'\n    },\n    width: Number,\n    height: Number,\n    animated: Boolean,\n    disabled: Boolean,\n    title: String\n  },\n  data: () => ({\n    active: false,\n    padding: 36\n  }),\n  computed: {\n    buttonClass () {\n      const clz = [];\n      this.size && clz.push(`fm-button-${this.size}`);\n      this.type && clz.push(`fm-button-${this.type}`);\n      return clz;\n    },\n    computedColor () {\n      return this.color || STYLE.primaryColor;\n    },\n    computedStyle () {\n      const { color, active, disabled, padding, animated, type, width, height } = this;\n      const transform = !animated || disabled ? 'scale(1)' : `scale(${active ? 0.95 : 1})`;\n      const style = {\n        borderColor: (type === 'hollow') ? color : '',\n        backgroundColor: (type !== 'hollow') ? color : '',\n        opacity: disabled ? 0.2 : 1,\n        transform,\n        paddingLeft: padding + 'px',\n        paddingRight: padding + 'px'\n      };\n      if (type !== 'circle') {\n        width && (style.width = `${width}px`);\n        height && (style.height = `${height}px`) && (style.borderRadius = `${Math.ceil(height * 1000 / 2000)}px`);\n      }\n      return style;\n    }\n  },\n  methods: {\n    btnClick (e) {\n      !this.disabled && this.$emit('buttonClicked', e);\n    },\n    _startHandle (e) {\n      this.active = true;\n    },\n    _endHandle (e) {\n      this.active = false;\n    }\n  },\n  mounted () {\n    this.$nextTick(() => {\n      dom.getComponentRect(this.$refs['fm-button'], option => {\n        if (option.size.width >= 240) {\n          this.padding = 24;\n        }\n      });\n    });\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');

exports.default = {
  name: 'FmButton',
  components: { FmIcon: _fmIcon2.default },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    type: String,
    color: {
      type: String,
      default: _index2.default.primaryColor
    },
    titleColor: {
      type: String,
      default: '#FFFFFF'
    },
    titleSize: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'wancheng'
    },
    width: Number,
    height: Number,
    animated: Boolean,
    disabled: Boolean,
    title: String
  },
  data: function data() {
    return {
      active: false,
      padding: 36
    };
  },
  computed: {
    buttonClass: function buttonClass() {
      var clz = [];
      this.size && clz.push('fm-button-' + this.size);
      this.type && clz.push('fm-button-' + this.type);
      return clz;
    },
    computedColor: function computedColor() {
      return this.color || _index2.default.primaryColor;
    },
    computedStyle: function computedStyle() {
      var color = this.color,
          active = this.active,
          disabled = this.disabled,
          padding = this.padding,
          animated = this.animated,
          type = this.type,
          width = this.width,
          height = this.height;

      var transform = !animated || disabled ? 'scale(1)' : 'scale(' + (active ? 0.95 : 1) + ')';
      var style = {
        borderColor: type === 'hollow' ? color : '',
        backgroundColor: type !== 'hollow' ? color : '',
        opacity: disabled ? 0.2 : 1,
        transform: transform,
        paddingLeft: padding + 'px',
        paddingRight: padding + 'px'
      };
      if (type !== 'circle') {
        width && (style.width = width + 'px');
        height && (style.height = height + 'px') && (style.borderRadius = Math.ceil(height * 1000 / 2000) + 'px');
      }
      return style;
    }
  },
  methods: {
    btnClick: function btnClick(e) {
      !this.disabled && this.$emit('buttonClicked', e);
    },
    _startHandle: function _startHandle(e) {
      this.active = true;
    },
    _endHandle: function _endHandle(e) {
      this.active = false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      dom.getComponentRect(_this.$refs['fm-button'], function (option) {
        if (option.size.width >= 240) {
          _this.padding = 24;
        }
      });
    });
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "fm-button",
    staticClass: "fm-button",
    class: _vm.buttonClass,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.computedStyle)),
    on: {
      "click": _vm.btnClick,
      "touchstart": _vm._startHandle,
      "touchend": _vm._endHandle
    }
  }, [(!_vm.disabled) ? _c('div', {
    staticClass: "overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.btnClick
    }
  }) : _vm._e(), _vm._v(" "), (_vm.type === 'circle') ? _c('fm-icon', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "color": (_vm.type !== 'hollow') ? _vm.titleColor : _vm.color,
      "name": _vm.icon,
      "icon-style": "72"
    }
  }) : _vm._t("title", [_c('text', {
    staticClass: "button-text",
    class: ['button-text-' + _vm.size],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(Object.assign({}, {
      color: (_vm.type !== 'hollow') ? _vm.titleColor : _vm.computedColor
    }, (_vm.titleSize ? {
      fontSize: _vm.titleSize
    } : {}))))
  }, [_vm._t("default"), (!_vm.$slots.default) ? [_vm._v(_vm._s(_vm.title))] : _vm._e()], 2)])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-45eab412", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  el: {
    common: {
      delete: '删除',
      cancel: '取消',
      confirm: '确认',
      close: '关闭',
      title: '标题',
      more: '更多'
    },
    titlebar: {
      title: '标题'
    },
    searchbar: {
      search: '搜索'
    },
    foldabletext: {
      more: '更多'
    },
    input: {
      placeholder: '请输入',
      inputError: '输入有误'
    },
    tag: {
      tagName: '标签'
    }
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(46);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Yanjiie on 18/03/08. Fork from https://github.com/alibaba/weex-ui
 */

var Utils = {
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString: function isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject: function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof2(item)) === 'object' && !Array.isArray(item);
  },
  isEmptyObject: function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont: function decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    var regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        var replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (var key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return Utils.mergeDeep.apply(Utils, [target].concat(sources));
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated.toString()
    }, callback);
  },

  env: {
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否为 iPhone X
     * @returns {boolean}
     */
    isIPhoneX: function isIPhoneX() {
      var deviceHeight = weex.config.env.deviceHeight;

      if (Utils.env.isWeb()) {
        return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) !== undefined && window.screen && window.screen.width && window.screen.height && parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812;
      }
      return Utils.env.isIOS() && deviceHeight === 2436;
    },
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },

    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },

    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight: function getScreenHeight() {
      var env = weex.config.env;

      return env.deviceHeight / env.deviceWidth * 750;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split('.');
    var promoteVerArr = promoteVer.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk: function arrayChunk() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map(function (e, i) {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(function (e) {
        return e;
      });
    }
    return groups;
  },
  truncateString: function truncateString(str, len) {
    var hasDot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newLength = 0;
    var newStr = '';
    var singleChar = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },

  animation: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param ref
     * @param transform 运动类型
     * @param status
     * @param callback 回调函数
     */
    pageTransitionAnimation: function pageTransitionAnimation(ref, transform, status, callback) {
      var animation = weex.requireModule('animation');
      animation.transition(ref, {
        styles: {
          transform: transform
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0 // ms
      }, function () {
        callback && callback();
      });
    }
  },
  uiStyle: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param animationType 页面转场动画的类型 push，model
     * @param size 分割数组的长度
     * @returns {}
     */
    pageTransitionAnimationStyle: function pageTransitionAnimationStyle(animationType) {
      if (animationType === 'push') {
        return {
          left: '750px',
          top: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      } else if (animationType === 'model') {
        return {
          top: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px',
          left: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      }
      return {};
    }
  }
};

exports.default = Utils;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(52);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


  ;(function(fn) {
    if (true) {
      module.exports = fn();
    } else if (typeof define === "function") {
      define("index.weex", function(require, exports, module){
        module.exports = fn();
      });
    } else {
      var root;
      if (typeof window !== "undefined") {
        root = window;
      } else if (typeof self !== "undefined") {
        root = self;
      } else if (typeof global !== "undefined") {
        root = global;
      } else {
        // NOTICE: In JavaScript strict mode, this is null
        root = this;
      }
      root["index.weex"] = fn();
    }
  })(function(){
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 Copyright 2018 Alibaba Group

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bindingxParser = __webpack_require__(1);

var isWeb = false;
var isWeex = true;

function requireModule(moduleName) {
  try {
    if ((typeof weex === 'undefined' ? 'undefined' : _typeof(weex)) !== undefined && weex.requireModule) {
      // eslint-disable-line
      return weex.requireModule(moduleName); // eslint-disable-line
    }
  } catch (err) {}
  return window.require('@weex-module/' + moduleName);
}

var isSupportNewBinding = true;
var isSupportBinding = true;
var WeexBinding = void 0;
var WebBinding = {};

try {
  WeexBinding = requireModule('bindingx');
  isSupportNewBinding = true;
} catch (e) {
  isSupportNewBinding = false;
}
if (!WeexBinding || !WeexBinding.bind) {
  try {
    WeexBinding = requireModule('binding');
    isSupportNewBinding = true;
  } catch (e) {
    isSupportNewBinding = false;
  }
}
isSupportNewBinding = !!(WeexBinding && WeexBinding.bind && WeexBinding.unbind);
if (!isSupportNewBinding) {
  try {
    WeexBinding = requireModule('expressionBinding');
    isSupportBinding = true;
  } catch (err) {
    isSupportBinding = false;
  }
}
isSupportBinding = !!(WeexBinding && (WeexBinding.bind || WeexBinding.createBinding));


function formatExpression(expression) {
  if (expression === undefined) return;
  try {
    expression = JSON.parse(expression);
  } catch (err) {}
  var resultExpression = {};
  if (typeof expression === 'string') {
    resultExpression.origin = expression;
  } else if (expression) {
    resultExpression.origin = expression.origin;
    resultExpression.transformed = expression.transformed;
  }
  if (!resultExpression.transformed && !resultExpression.origin) return;
  resultExpression.transformed = resultExpression.transformed || (0, _bindingxParser.parse)(resultExpression.origin);
  return resultExpression;
}

// 统一回调参数
function fixCallback(callback) {
  return function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof callback === 'function') {
      return callback({
        state: params.state === 'end' ? 'exit' : params.state,
        t: params.t !== undefined ? params.t : params.deltaT
      });
    }
  };
}

exports.default = {
  // 是否支持新版本的binding
  isSupportNewBinding: isSupportNewBinding,
  // 是否支持binding
  isSupportBinding: isSupportBinding,
  _bindingInstances: [],
  /**
   * 绑定
   * @param options 参数
   * @example
   {
     anchor:blockRef,
     eventType:'pan',
     props: [
     {
       element:blockRef,
       property:'transform.translateX',
       expression:{
         origin:"x+1",
         transformed:"{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":1}]}"
       }
     }
    ]
   }
   */
  bind: function bind(options) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (!options) {
      throw new Error('should pass options for binding');
    }

    options.exitExpression = formatExpression(options.exitExpression);

    if (options.props) {
      options.props.forEach(function (prop) {
        prop.expression = formatExpression(prop.expression);
      });
    }

    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.bind(options, options && options.eventType === 'timing' ? fixCallback(callback) : callback);
      } else {
        WeexBinding.enableBinding(options.anchor, options.eventType);
        // 处理expression的参数格式
        var expressionArgs = options.props.map(function (prop) {
          return {
            element: prop.element,
            property: prop.property,
            expression: prop.expression.transformed
          };
        });
        WeexBinding.createBinding(options.anchor, options.eventType, '', expressionArgs, callback);
      }
    }
  },

  /**
   *  @param {object} options
   *  @example
   *  {eventType:'pan',
   *   token:self.gesToken}
   */
  unbind: function unbind(options) {
    if (!options) {
      throw new Error('should pass options for binding');
    }

    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.unbind(options);
      } else {
        return WeexBinding.disableBinding(options.anchor, options.eventType);
      }
    }
  },
  unbindAll: function unbindAll() {
    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.unbindAll();
      } else {
        return WeexBinding.disableAll();
      }
    }
  },
  prepare: function prepare(options) {
    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.prepare(options);
      } else {
        return WeexBinding.enableBinding(options.anchor, options.eventType);
      }
    }
  },
  getComputedStyle: function getComputedStyle(el) {
    if (isSupportNewBinding) {
      return WeexBinding.getComputedStyle(el);
    } else {
      return {};
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lex = {
  InputElementDiv: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  InputElementRegExp: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  ReservedWord: '<Keyword>|<NullLiteral>|<BooleanLiteral>',
  WhiteSpace: /[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/,
  LineTerminator: /[\n\r\u2028\u2029]/,
  Keyword: /new(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
  NullLiteral: /null(?![_$a-zA-Z0-9])/,
  BooleanLiteral: /(?:true|false)(?![_$a-zA-Z0-9])/,
  Identifier: /[_$a-zA-Z][_$a-zA-Z0-9]*/,
  Punctuator: /\/|=>|\*\*|>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
  DivPunctuator: /\/=|\//,
  NumericLiteral: /(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/,
  StringLiteral: /"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
  RegularExpressionLiteral: /\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
};

function XRegExp(xregexps, rootname, flag) {
  var expnames = [rootname];

  function buildRegExp(source) {
    var regexp = new RegExp;
    regexp.compile(source.replace(/<([^>]+)>/g,
      function (all, expname) {
        if (!xregexps[expname])
          return '';
        expnames.push(expname);
        if (xregexps[expname] instanceof RegExp)
          return '(' + xregexps[expname].source + ')';
        return '(' + buildRegExp(xregexps[expname]).source + ')';
      }), flag);
    return regexp;
  }

  var regexp = buildRegExp(xregexps[rootname]);
  this.exec = function (string) {
    var matches = regexp.exec(string);
    if (matches == null)
      return null;
    var result = new String(matches[0]);
    for (var i = 0; i < expnames.length; i++)
      if (matches[i])
        result[expnames[i]] = matches[i];
    return result;
  };
  Object.defineProperty(this, 'lastIndex',
    {
      'get': function () {
        return regexp.lastIndex;
      },
      'set': function (v) {
        regexp.lastIndex = v;
      }
    });
}

function LexicalParser() {
  var inputElementDiv = new XRegExp(lex, 'InputElementDiv', 'g');
  var inputElementRegExp = new XRegExp(lex, 'InputElementRegExp', 'g');
  var source;
  Object.defineProperty(this, 'source', {
    'get': function () {
      return source;
    },
    'set': function (v) {
      source = v;
      inputElementDiv.lastIndex = 0;
      inputElementRegExp.lastIndex = 0;
    }
  });
  this.reset = function () {
    inputElementDiv.lastIndex = 0;
    inputElementRegExp.lastIndex = 0;
  };
  this.getNextToken = function (useDiv) {
    var lastIndex = inputElementDiv.lastIndex;
    var inputElement;
    if (useDiv)
      inputElement = inputElementDiv;
    else
      inputElement = inputElementRegExp;
    var token = inputElement.exec(source);
    if (token && inputElement.lastIndex - lastIndex > token.length) {
      throw new SyntaxError('Unexpected token ILLEGAL');
    }
    inputElementDiv.lastIndex = inputElement.lastIndex;
    inputElementRegExp.lastIndex = inputElement.lastIndex;
    return token;
  };
}

var rules = {
  'IdentifierName': [['Identifier']],
  'Literal': [['NullLiteral'], ['BooleanLiteral'], ['NumericLiteral'], ['StringLiteral'], ['RegularExpressionLiteral']],
  'PrimaryExpression': [['Identifier'], ['Literal'], ['(', 'Expression', ')']],
  'CallExpression': [['PrimaryExpression', 'Arguments'], ['CallExpression', 'Arguments']],
  'Arguments': [['(', ')'], ['(', 'ArgumentList', ')']],
  'ArgumentList': [['ConditionalExpression'], ['ArgumentList', ',', 'ConditionalExpression']],
  'LeftHandSideExpression': [['PrimaryExpression'], ['CallExpression']],
  'UnaryExpression': [['LeftHandSideExpression'], ['void', 'UnaryExpression'], ['+', 'UnaryExpression'], ['-', 'UnaryExpression'], ['~', 'UnaryExpression'], ['!', 'UnaryExpression']],
  'ExponentiationExpression': [['UnaryExpression'], ['ExponentiationExpression', '**', 'UnaryExpression']],
  'MultiplicativeExpression': [['MultiplicativeExpression', '/', 'ExponentiationExpression'], ['ExponentiationExpression'], ['MultiplicativeExpression', '*', 'ExponentiationExpression'], ['MultiplicativeExpression', '%', 'ExponentiationExpression']],
  'AdditiveExpression': [['MultiplicativeExpression'], ['AdditiveExpression', '+', 'MultiplicativeExpression'], ['AdditiveExpression', '-', 'MultiplicativeExpression']],
  'ShiftExpression': [['AdditiveExpression'], ['ShiftExpression', '<<', 'AdditiveExpression'], ['ShiftExpression', '>>', 'AdditiveExpression'], ['ShiftExpression', '>>>', 'AdditiveExpression']],
  'RelationalExpression': [['ShiftExpression'], ['RelationalExpression', '<', 'ShiftExpression'], ['RelationalExpression', '>', 'ShiftExpression'], ['RelationalExpression', '<=', 'ShiftExpression'], ['RelationalExpression', '>=', 'ShiftExpression'], ['RelationalExpression', 'instanceof', 'ShiftExpression'], ['RelationalExpression', 'in', 'ShiftExpression']],
  'EqualityExpression': [['RelationalExpression'], ['EqualityExpression', '==', 'RelationalExpression'], ['EqualityExpression', '!=', 'RelationalExpression'], ['EqualityExpression', '===', 'RelationalExpression'], ['EqualityExpression', '!==', 'RelationalExpression']],
  'BitwiseANDExpression': [['EqualityExpression'], ['BitwiseANDExpression', '&', 'EqualityExpression']],
  'BitwiseXORExpression': [['BitwiseANDExpression'], ['BitwiseXORExpression', '^', 'BitwiseANDExpression']],
  'BitwiseORExpression': [['BitwiseXORExpression'], ['BitwiseORExpression', '|', 'BitwiseXORExpression']],
  'LogicalANDExpression': [['BitwiseORExpression'], ['LogicalANDExpression', '&&', 'BitwiseORExpression']],
  'LogicalORExpression': [['LogicalANDExpression'], ['LogicalORExpression', '||', 'LogicalANDExpression']],
  'ConditionalExpression': [['LogicalORExpression'], ['LogicalORExpression', '?', 'LogicalORExpression', ':', 'LogicalORExpression']],
  'Expression': [['ConditionalExpression'], ['Expression', ',', 'ConditionalExpression']],
  'Program': [['Expression']]

};

function Symbol(symbolName, token) {
  this.name = symbolName;
  this.token = token;
  this.childNodes = [];
  this.toString = function (indent) {
    if (!indent)
      indent = '';
    if (this.childNodes.length == 1)
      return this.childNodes[0].toString(indent);
    var str = indent + this.name + (this.token != undefined && this.name != this.token ? ':' + this.token : '') + '\n';
    for (var i = 0; i < this.childNodes.length; i++)
      str += this.childNodes[i].toString(indent + '    ');
    return str;
  };
}

function SyntacticalParser() {
  var currentRule;
  var root = {
    Program: '$'
  };
  var hash = {};

  function closureNode(node) {

    hash[JSON.stringify(node)] = node;

    var queue = Object.getOwnPropertyNames(node);
    while (queue.length) {
      var symbolName = queue.shift();
      if (!rules[symbolName])
        continue;
      rules[symbolName].forEach(function (rule) {
        if (!node[rule[0]])
          queue.push(rule[0]);
        var rulenode = node;
        var lastnode = null;
        rule.forEach(function (symbol) {
          if (!rulenode[symbol])
            rulenode[symbol] = {};
          lastnode = rulenode;
          rulenode = rulenode[symbol];
        });
        if (node[symbolName].$div)
          rulenode.$div = true;
        rulenode.$reduce = symbolName;
        rulenode.$count = rule.length;
      });
    }

    for (var p in node) {
      if (typeof node[p] != 'object' || p.charAt(0) == '$' || node[p].$closure)
        continue;
      if (hash[JSON.stringify(node[p])])
        node[p] = hash[JSON.stringify(node[p])];
      else {
        closureNode(node[p]);
      }
    }
    node.$closure = true;
  }

  closureNode(root);
  var symbolStack = [];
  var statusStack = [root];
  var current = root;
  this.insertSymbol = function insertSymbol(symbol, haveLineTerminator) {
    while (!current[symbol.name] && current.$reduce) {
      var count = current.$count;
      var newsymbol = new Symbol(current.$reduce);
      while (count--)
        newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
      current = statusStack[statusStack.length - 1];
      this.insertSymbol(newsymbol);
    }
    current = current[symbol.name];
    symbolStack.push(symbol), statusStack.push(current);
    if (!current)
      throw new Error();
    return current.$div;
  };
  this.reset = function () {
    current = root;
    symbolStack = [];
    statusStack = [root];
  };
  Object.defineProperty(this, 'grammarTree', {
    'get': function () {
      try {
        while (current.$reduce) {
          var count = current.$count;
          var newsymbol = new Symbol(current.$reduce);
          while (count--)
            newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
          current = statusStack[statusStack.length - 1];
          this.insertSymbol(newsymbol);
        }
        if (symbolStack.length > 0 && current[';']) {
          this.insertSymbol(new Symbol(';', ';'));
          return this.grammarTree;
        }
        if (symbolStack.length != 1 || symbolStack[0].name != 'Program')
          throw new Error();
      } catch (e) {
        throw new SyntaxError('Unexpected end of input');
      }
      return symbolStack[0];
    }
  });
}

function Parser() {
  this.lexicalParser = new LexicalParser();
  this.syntacticalParser = new SyntacticalParser();
  var terminalSymbols = ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'Identifier', '**', '=>', '{', '}', '(', ')', '[', ']', '.', ';', ',', '<', '>', '<=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=', '*=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '/', '/=', 'instanceof', 'typeof', 'new', 'void', 'debugger', 'this', 'delete', 'in'];
  var terminalSymbolIndex = {};
  terminalSymbols.forEach(function (e) {
    Object.defineProperty(terminalSymbolIndex, e, {});
  });
  this.reset = function () {
    this.lexicalParser.reset();
    this.syntacticalParser.reset();
  };
  this.parse = function (source, onInputElement) {
    var token;
    var haveLineTerminator = false;
    this.lexicalParser.source = source;
    var useDiv = false;
    while (token = this.lexicalParser.getNextToken(useDiv)) {
      if (onInputElement)
        onInputElement(token);
      try {
        if (Object.getOwnPropertyNames(token).some(
            (e) => {
              if (terminalSymbolIndex.hasOwnProperty(e)) {
                useDiv = this.syntacticalParser.insertSymbol(new Symbol(e, token), haveLineTerminator);
                haveLineTerminator = false;
                return true;
              } else
                return false;
            }))
          continue;
        if ((token.Keyword || token.Punctuator || token.DivPunctuator) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
          useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(), token), haveLineTerminator);
        }
      } catch (e) {
        throw new SyntaxError('Unexpected token ' + token);
      }
    }
    return this.syntacticalParser.grammarTree;
  };
}

var parser = new Parser();

function JavaScriptExpression(text) {
  parser.reset();
  this.tree = (parser.parse(text));
  this.paths = [];
  var context = Object.create(null);
  var me = this;
  var pathIndex = Object.create(null);
  this.isSimple;
  this.isConst;
  walk(this.tree);
  checkSimple(this.tree);
  if (this.paths.length === 0) {
    this.isConst = true;
  }
  this.setter = function (path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    return {
      isCompleted: function () {
        for (var p in pathIndex)
          if (!pathIndex[p])
            return false;
        return true;
      },
      set: function (value) {
        if (!pathIndex[path.join('.')]) {
          pathIndex[path.join('.')] = true;
        }
        curr[path[i]] = (value);
        if (this.isCompleted()) {
          return me.exec();
        } else {
          return undefined;
        }
      }
    };
  };

  this.valueOf = this.exec = function () {
    try {
      return function () {
        return eval(text);
      }.call(context);
    } catch (e) {
    }
  };

  function checkSimple(symbol) {

    var curr = symbol;
    while (curr.childNodes.length <= 1 && curr.name !== 'MemberExpression') {
      curr = curr.childNodes[0];
    }
    // TODO: need to point out "[……]"
    if (curr.name === 'MemberExpression') {
      me.isSimple = true;
    } else {
      me.isSimple = false;
    }
  }

  function walk(symbol) {
    if (symbol.name === 'CallExpression' && symbol.childNodes[symbol.childNodes.length - 1].name !== 'CallExpression') {
      var path = getPath(symbol.childNodes[1]);
      walk(symbol.childNodes[0]);
    } else if (symbol.name === 'NewExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol.childNodes[0]);
    } else if (symbol.name === 'MemberExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol);
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }

  }


  function getPath(symbol) {
    // [["PrimaryExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]],

    if (symbol.childNodes[0].name === 'IdentifierName') { // MemberExpression : MemberExpression "." IdentifierName
      var path = getPath(symbol.childNodes[2]);
      if (path)
        path = path.concat(symbol.childNodes[0].childNodes[0].token.toString());
      createPath(path);
      return path;

    } else if (symbol.childNodes[0].name === 'PrimaryExpression') { // MemberExpression : PrimaryExpression
      if (symbol.childNodes[0].childNodes[0].name === 'Identifier') {
        var path = [symbol.childNodes[0].childNodes[0].token.toString()];
        createPath(path);
        return path;
      } else {
        return null;
      }
    } else if (symbol.childNodes[0].name === ']') { // MemberExpression : MemberExpression "[" Expression "]"
      getPath(symbol.childNodes[3]);
      walk(symbol.childNodes[1]);
      return null;

    } else if (symbol.childNodes[0].name === 'Arguments') { // MemberExpression : "new" MemberExpression Arguments
      walk(symbol.childNodes[0]);
      walk(symbol.childNodes[1]);
      return null;
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }
  }


  function createPath(path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    me.paths.push(path);
    pathIndex[path.join('.')] = false;
  }
}

function visit(tree) {
  var childNodes = tree.childNodes.slice().reverse();
  var children = childNodes.filter(e =>
    !e.token || !e.token.Punctuator);
  if (tree.name === 'UnaryExpression') {
    // negative number support
    if (childNodes.length === 2 && childNodes[0].name === '-' && children.length === 1) {
      var res = visit(children[0]);
      res.value = -res.value;
      return res;
    }
  }

  if (tree.name === 'Arguments') {
    var argumentList = [];
    var listNode = children[0];
    while (listNode) {
      if (listNode.childNodes.length === 3) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = listNode.childNodes[2];
      }
      if (listNode.childNodes.length === 1) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = null;
      }
    }
    return {
      type: 'Arguments',
      children: argumentList.map(e => visit(e))
    };
  }


  if (children && children.length === 1) {
    var res = visit(children[0]);
    return res;
  }

  if (tree.token && ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'Identifier'].some(e => tree.token[e])) {
    var type = Object.keys(tree.token).filter(e => e.match(/Literal/) || e.match(/Identifier/))[0];
    var value = {
      'NullLiteral': null,
      'BooleanLiteral': Boolean(tree.token),
      'NumericLiteral': Number(tree.token),
      'StringLiteral': tree.token,
      'Identifier': tree.token,
    }[type];

    return {
      type: type,
      value: value
    };
  }

  if (tree.name === 'CallExpression')
    return {
      type: 'CallExpression',
      children: [visit(childNodes[0]), visit(childNodes[1])]
    };

  return {
    type: childNodes.filter(e => e.token && e.token.Punctuator)[0].name,
    children: childNodes.filter(e => !e.token || !e.token.Punctuator).map(e => visit(e))
  };
}

function parse(originExp) {
  let exp = new JavaScriptExpression(originExp);
  return JSON.stringify(visit(exp.tree), null);
}

module.exports = {
  parse: parse
};

/***/ })
/******/ ])});;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(58);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(47)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(50),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3509f5c0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-footer/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3509f5c0", Component.options)
  } else {
    hotAPI.reload("data-v-3509f5c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e352fa5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3509f5c0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3509f5c0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-footer--wrap[data-v-3509f5c0] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 1.33333rem;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-top-width: 0.01852rem;\n  border-top-color: rgba(0, 0, 0, 0.1);\n}\n.fm-footer[data-v-3509f5c0] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-footer/index.vue?5dd7c218"],"names":[],"mappings":";AAWA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;EACA,mBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,6BAAA;EACA,qCAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/03/13. -->\n<template>\n  <div class=\"fm-footer--wrap\">\n    <div class=\"fm-footer\" :style=\"footerStyle\">\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-footer--wrap {\n    flex-direction: row;\n    position: fixed;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    height: 144px;\n    justify-content: space-between;\n    align-items: center;\n    border-top-width: 2px;\n    border-top-color: rgba(0, 0, 0, 0.1);\n  }\n\n  .fm-footer {\n    flex-direction: row;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    justify-content: space-between;\n    align-items: center;\n  }\n</style>\n\n<script>\nexport default {\n  name: 'FmFooter',\n  props: {\n    paddingSize: {\n      type: String,\n      default: ''\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    }\n  },\n  computed: {\n    footerStyle() {\n      let style = { backgroundColor: this.backgroundColor };\n      let typeStyle;\n      switch (this.paddingSize) {\n        case 'small':\n          typeStyle = {\n            'padding': '0 48px',\n            'justify-content': 'space-between'\n          }\n          break;\n        case 'middle':\n          typeStyle = {\n            'padding': '0 90px',\n            'justify-content': 'space-between'\n          }\n          break;\n        case 'large':\n          typeStyle = {\n            'padding': '0 111px',\n            'justify-content': 'space-between'\n          }\n          break;\n        default:\n          typeStyle = {\n            'justify-content': 'center'\n          }\n      }\n      return Object.assign({}, style, typeStyle);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmFooter',
  props: {
    paddingSize: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    footerStyle: function footerStyle() {
      var style = { backgroundColor: this.backgroundColor };
      var typeStyle = void 0;
      switch (this.paddingSize) {
        case 'small':
          typeStyle = {
            'padding': '0 48px',
            'justify-content': 'space-between'
          };
          break;
        case 'middle':
          typeStyle = {
            'padding': '0 90px',
            'justify-content': 'space-between'
          };
          break;
        case 'large':
          typeStyle = {
            'padding': '0 111px',
            'justify-content': 'space-between'
          };
          break;
        default:
          typeStyle = {
            'justify-content': 'center'
          };
      }
      return Object.assign({}, style, typeStyle);
    }
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-footer--wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "fm-footer",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.footerStyle))
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3509f5c0", module.exports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(44);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _index = __webpack_require__(42);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CopyRight (C) 2018-2022 FlymeApps Team Holding Limited.
 * Created by Yanjiie on 2018/03/18. Fork from alibaba/weex-ui.
 */
var BindEnv = {
  supportsEB: function supportsEB() {
    return _indexWeex2.default.isSupportBinding && !_index2.default.env.isWeb();
  },


  /**
   * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
   * @returns {boolean}
   */
  supportsEBForAndroid: function supportsEBForAndroid() {
    return _index2.default.env.isAndroid() && BindEnv.supportsEB();
  },


  /**
   * 判断IOS容器是否支持是否支持expressionBinding
   * @returns {boolean}
   */
  supportsEBForIos: function supportsEBForIos() {
    return _index2.default.env.isIOS() && BindEnv.supportsEB();
  }
};

exports.default = BindEnv;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(56),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-10e45e81",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-overlay/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10e45e81", Component.options)
  } else {
    hotAPI.reload("data-v-10e45e81", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("03f1f46c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e45e81\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10e45e81\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-overlay[data-v-10e45e81] {\n  width: 10rem;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-overlay/index.vue?4f08bcf6"],"names":[],"mappings":";AAsBA;EACA,aAAA;EACA,gBAAA;EACA,QAAA;EACA,OAAA;EACA,UAAA;EACA,SAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Updated by Yanjiie on 2018/04/12. Fork from weex-ui. -->\n<template>\n  <component :is=\"isCreator ? 'FmOverlayNative' : 'div'\"\n             :visible=\"show\"\n             @onDismiss=\"overlayClicked\"\n             :touchable='canAutoClose'>\n    <div class=\"fm-overlay\"\n         ref=\"fm-overlay\"\n         v-if=\"show && !isCreator\"\n         :watch=\"shouldShow\"\n         @click=\"overlayClicked\"\n         :style=\"overlayStyle\">\n      <slot></slot>\n    </div>\n    <div v-if=\"isCreator\">\n      <slot></slot>\n    </div>\n  </component>\n</template>\n\n<style scoped>\n  .fm-overlay {\n    width: 1080px;\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    align-items: center;\n    justify-content: center;\n  }\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nexport default {\n  name: 'FmOverlay',\n  props: {\n    show: {\n      type: Boolean,\n      default: true\n    },\n    hasAnimation: {\n      type: Boolean,\n      default: true\n    },\n    duration: {\n      type: [Number, String],\n      default: 300\n    },\n    timingFunction: {\n      type: Array,\n      default: () => (['ease-in', 'ease-out'])\n    },\n    opacity: {\n      type: [Number, String],\n      default: 0.5\n    },\n    canAutoClose: {\n      type: Boolean,\n      default: true\n    },\n    useNative: {\n      type: Boolean,\n      default: true\n    }\n  },\n  computed: {\n    overlayStyle () {\n      return {\n        opacity: this.hasAnimation ? 0 : 1,\n        backgroundColor: `rgba(0, 0, 0,${this.opacity})`\n      };\n    },\n    shouldShow () {\n      if (this.isCreator) { return; }\n      const { show, hasAnimation } = this;\n      hasAnimation && setTimeout(() => {\n        this.appearOverlay(show);\n      }, 50);\n      return show;\n    },\n    isCreator () {\n      return this.useNative && weex.supports && weex.supports('@component/FmOverlayNative');\n    }\n  },\n  methods: {\n    overlayClicked (e) {\n      this.canAutoClose ? this.appearOverlay(false) : this.$emit('fmOverlayBodyClicked', {});\n    },\n    appearOverlay (bool, duration = this.duration) {\n      const { hasAnimation, timingFunction, canAutoClose } = this;\n      const needEmit = !bool && canAutoClose;\n      needEmit && (this.$emit('fmOverlayBodyClicking', {}));\n      const overlayEl = this.$refs['fm-overlay'];\n      if (hasAnimation && overlayEl) {\n        animation.transition(overlayEl, {\n          styles: {\n            opacity: bool ? 1 : 0\n          },\n          duration,\n          timingFunction: timingFunction[bool ? 0 : 1],\n          delay: 0\n        }, () => {\n          needEmit && (this.$emit('fmOverlayBodyClicked', {}));\n        });\n      } else {\n        needEmit && (this.$emit('fmOverlayBodyClicked', {}));\n      }\n    },\n    hide () {\n      this.appearOverlay(false);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  name: 'FmOverlay',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.5
    },
    canAutoClose: {
      type: Boolean,
      default: true
    },
    useNative: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      if (this.isCreator) {
        return;
      }
      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    },
    isCreator: function isCreator() {
      return this.useNative && weex.supports && weex.supports('@component/FmOverlayNative');
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('fmOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('fmOverlayBodyClicking', {});
      var overlayEl = this.$refs['fm-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('fmOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('fmOverlayBodyClicked', {});
      }
    },
    hide: function hide() {
      this.appearOverlay(false);
    }
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.isCreator ? 'FmOverlayNative' : 'div', {
    tag: "component",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "visible": _vm.show,
      "touchable": _vm.canAutoClose
    },
    on: {
      "onDismiss": _vm.overlayClicked
    }
  }, [(_vm.show && !_vm.isCreator) ? _c('div', {
    ref: "fm-overlay",
    staticClass: "fm-overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.overlayStyle)),
    attrs: {
      "watch": _vm.shouldShow
    },
    on: {
      "click": _vm.overlayClicked
    }
  }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), (_vm.isCreator) ? _c('div', [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-10e45e81", module.exports)
  }
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(65);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(59)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(61),
  /* template */
  __webpack_require__(62),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2072c04b",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tag/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2072c04b", Component.options)
  } else {
    hotAPI.reload("data-v-2072c04b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c45ad30e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2072c04b\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2072c04b\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-tag[data-v-2072c04b] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n\t  -webkit-box-orient: horizontal;\n\t  -webkit-box-direction: normal;\n\t  -webkit-flex-direction: row;\n\t          flex-direction: row;\n}\n.tag-item[data-v-2072c04b] {\n    padding: 0.08333rem;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n            justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n    overflow: hidden;\n}\n.tag-border[data-v-2072c04b] {\n    border-radius: 0.04167rem;\n}\n.tag-huge[data-v-2072c04b] {\n    border-radius: 0.92593rem;\n    height: 0.66667rem;\n    padding: 0.11111rem 0.38889rem;\n}\n.tag-hollow[data-v-2072c04b] {\n    border-width: 0.02778rem;\n}\n.tag-text[data-v-2072c04b] {\n    font-family: \"Source Han Sans CN\", Roboto, sans-serif;\n    font-weight: bold;\n}\n.tag-font-small[data-v-2072c04b] {\n    font-size: 0.22222rem;\n}\n.tag-font-big[data-v-2072c04b] {\n    font-size: 0.27778rem;\n}\n.tag-font-huge[data-v-2072c04b] {\n    font-size: 0.38889rem;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n}\n.tag-margin-small[data-v-2072c04b] {\n    margin-right: 0.05556rem;\n    margin-bottom: 0.05556rem;\n}\n.tag-margin-big[data-v-2072c04b] {\n    margin-right: 0.11111rem;\n    margin-bottom: 0.11111rem;\n}\n.tag-margin-huge[data-v-2072c04b] {\n    margin-right: 0.33333rem;\n    margin-bottom: 0.33333rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tag/index.vue?5c1952e0"],"names":[],"mappings":";AAaA;IACA,0BAAA;IAAA,4BAAA;YAAA,oBAAA;GACA,+BAAA;GAAA,8BAAA;GAAA,4BAAA;WAAA,oBAAA;CACA;AAEA;IACA,oBAAA;IACA,yBAAA;IAAA,gCAAA;YAAA,wBAAA;IACA,0BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,iBAAA;CACA;AAEA;IACA,0BAAA;CACA;AAEA;IACA,0BAAA;IACA,mBAAA;IACA,+BAAA;CACA;AAEA;IACA,yBAAA;CACA;AAEA;IACA,sDAAA;IACA,kBAAA;CACA;AAEA;IACA,sBAAA;CACA;AAEA;IACA,sBAAA;CACA;AAEA;IACA,sBAAA;IACA,+BAAA;IACA,iBAAA;CACA;AAEA;IACA,yBAAA;IACA,0BAAA;CACA;AAEA;IACA,yBAAA;IACA,0BAAA;CACA;AAEA;IACA,yBAAA;IACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div :class=\"tagClass\">\n    <div v-if=\"showSolid || showHollow\"\n        :class=\"['tag-item', 'tag-border', size === 'huge' && 'tag-huge', showHollow && 'tag-hollow']\"\n        :style=\"tagTextStyle\">\n      <text :class=\"textClass\" ref='content' :style=\"textStyle\"><slot></slot><template v-if=\"!$slots.default\">{{ value }}</template></text>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-tag {\n    align-items: center;\n\t  flex-direction: row;\n  }\n\n  .tag-item {\n    padding: 9px;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n  }\n\n  .tag-border {\n    border-radius: 4.5px;\n  }\n\n  .tag-huge {\n    border-radius: 100px;\n    height: 72px;\n    padding: 12px 42px;\n  }\n\n  .tag-hollow {\n    border-width: 3px;\n  }\n\n  .tag-text {\n    font-family: \"Source Han Sans CN\", Roboto, sans-serif;\n    font-weight: bold;\n  }\n\n  .tag-font-small {\n    font-size: 24px;\n  }\n\n  .tag-font-big {\n    font-size: 30px;\n  }\n\n  .tag-font-huge {\n    font-size: 42px;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n  }\n\n  .tag-margin-small {\n    margin-right: 6px;\n    margin-bottom: 6px;\n  }\n\n  .tag-margin-big {\n    margin-right: 12px;\n    margin-bottom: 12px;\n  }\n\n  .tag-margin-huge {\n    margin-right: 36px;\n    margin-bottom: 36px;\n  }\n</style>\n\n<script>\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\n\nexport default {\n  name: 'FmTag',\n  mixins: [Locale],\n  props: {\n    type: {\n      type: String,\n      default: 'solid'\n    },\n    size: {\n      type: String,\n      default: 'small'\n    },\n    value: {\n      type: [String, Number],\n      default () {\n        return t('el.tag.tagName');\n      }\n    },\n    color: {\n      type: String,\n      default: '#198DED'\n    },\n    fontColor: {\n      type: String,\n      default: '#FFFFFF'\n    }\n  },\n  computed: {\n    showSolid () {\n      const { type, value } = this;\n      return type === 'solid' && value !== '';\n    },\n    showHollow () {\n      const { type, value } = this;\n      return type === 'hollow' && value !== '';\n    },\n    tagTextStyle () {\n      const { color, showSolid } = this;\n      return showSolid ? { backgroundColor: color } : { borderColor: color };\n    },\n    textStyle () {\n      const { fontColor } = this;\n      return { color: fontColor };\n    },\n    textClass () {\n      const clz = ['tag-text'];\n      const { size } = this;\n      clz.push(`tag-font-${size}`);\n      return clz;\n    },\n    tagClass () {\n      const clz = ['fm-tag'];\n      const { size } = this;\n      clz.push(`tag-margin-${size}`);\n      return clz;\n    }\n  },\n  created () {\n    this.$slots.default && (this.value = this.$slots.default[0].text);\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmTag',
  mixins: [_locale2.default],
  props: {
    type: {
      type: String,
      default: 'solid'
    },
    size: {
      type: String,
      default: 'small'
    },
    value: {
      type: [String, Number],
      default: function _default() {
        return (0, _locale3.t)('el.tag.tagName');
      }
    },
    color: {
      type: String,
      default: '#198DED'
    },
    fontColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    showSolid: function showSolid() {
      var type = this.type,
          value = this.value;

      return type === 'solid' && value !== '';
    },
    showHollow: function showHollow() {
      var type = this.type,
          value = this.value;

      return type === 'hollow' && value !== '';
    },
    tagTextStyle: function tagTextStyle() {
      var color = this.color,
          showSolid = this.showSolid;

      return showSolid ? { backgroundColor: color } : { borderColor: color };
    },
    textStyle: function textStyle() {
      var fontColor = this.fontColor;

      return { color: fontColor };
    },
    textClass: function textClass() {
      var clz = ['tag-text'];
      var size = this.size;

      clz.push('tag-font-' + size);
      return clz;
    },
    tagClass: function tagClass() {
      var clz = ['fm-tag'];
      var size = this.size;

      clz.push('tag-margin-' + size);
      return clz;
    }
  },
  created: function created() {
    this.$slots.default && (this.value = this.$slots.default[0].text);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.tagClass,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.showSolid || _vm.showHollow) ? _c('div', {
    class: ['tag-item', 'tag-border', _vm.size === 'huge' && 'tag-huge', _vm.showHollow && 'tag-hollow'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.tagTextStyle))
  }, [_c('text', {
    ref: "content",
    class: _vm.textClass,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.textStyle))
  }, [_vm._t("default"), (!_vm.$slots.default) ? [_vm._v(_vm._s(_vm.value))] : _vm._e()], 2)]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2072c04b", module.exports)
  }
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(82);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(89)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(93),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-47ee1270",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-checkbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47ee1270", Component.options)
  } else {
    hotAPI.reload("data-v-47ee1270", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(66)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(70),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6c88d718",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-item/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c88d718", Component.options)
  } else {
    hotAPI.reload("data-v-6c88d718", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("57cb115d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c88d718\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c88d718\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-item[data-v-6c88d718] {\n  padding: 0 0.44444rem;\n}\n.fm-item[data-v-6c88d718]:active {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.item-wrapper[data-v-6c88d718] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.item-border[data-v-6c88d718] {\n  background-color: rgba(0, 0, 0, 0.1);\n  height: 0.01852rem;\n}\n.content[data-v-6c88d718] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.content-text[data-v-6c88d718] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.text-title[data-v-6c88d718] {\n  font-size: 0.44444rem;\n  color: #000000;\n  line-height: 0.52778rem;\n  text-overflow: ellipsis;\n  lines: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.text-summary[data-v-6c88d718] {\n  margin-top: 0.08333rem;\n  font-size: 0.33333rem;\n  color: rgba(0, 0, 0, 0.4);\n  line-height: 0.38889rem;\n  text-overflow: ellipsis;\n  lines: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.text-description[data-v-6c88d718] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  margin-top: 0.08333rem;\n  font-size: 0.33333rem;\n  color: rgba(0, 0, 0, 0.4);\n  line-height: 0.38889rem;\n}\n.image[data-v-6c88d718] {\n  margin-right: 0.44444rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-item/index.vue?24e71554","/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-item/<no source>"],"names":[],"mappings":";AA+BA;EACA,sBAAA;CACA;AAEA;EACA,sCAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,qCAAA;EACA,mBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;EACA,wBAAA;EACA,wBAAA;EACA,SAAA;ECjEA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDkEA;AAEA;EACA,uBAAA;EACA,sBAAA;EACA,0BAAA;EACA,wBAAA;EACA,wBAAA;EACA,SAAA;EC1EA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD2EA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,uBAAA;EACA,sBAAA;EACA,0BAAA;EACA,wBAAA;CACA;AAEA;EACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/3/9. -->\n<template>\n  <div class=\"fm-item\" @click=\"itemClicked\" @longpress=\"itemLongpress\">\n    <div class=\"item-wrapper\" :style=\"wrapStyle\">\n      <div v-if=\"imgSrc\" class=\"image\">\n        <fm-image :src=\"imgSrc\"\n                  :width=\"scene.imgWidth || imgWidth\"\n                  :height=\"scene.imgHeight || imgHeight\"\n                  :style=\"{ borderRadius: scene.imgRadius || imgRadius }\"\n                  :occupyingColor=\"occupyingColor\"></fm-image>\n      </div>\n      <div class=\"content\">\n        <slot name=\"left\">\n        </slot>\n        <div class=\"content-text\">\n          <slot name=\"title\">\n            <text v-if=\"title\" class=\"text-title\" :style=\"{ color: titleColor }\">{{ title }}</text>\n          </slot>\n          <text v-if=\"summary\" class=\"text-summary\" :style=\"{ color: summaryColor }\">{{ summary }}</text>\n          <text v-if=\"description\" class=\"text-description\" :style=\"{ color: descColor }\">{{ description }}</text>\n        </div>\n        <slot name=\"right\">\n        </slot>\n      </div>\n    </div>\n    <div v-if=\"border\" class=\"item-border\" :style=\"{ marginLeft: imgSrc ? (scene.imgWidth || imgWidth) + 48 : 0 }\"></div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-item {\n    padding: 0 48px;\n  }\n\n  .fm-item:active {\n    background-color: rgba(0, 0, 0, 0.04);\n  }\n\n  .item-wrapper {\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .item-border {\n    background-color: rgba(0, 0, 0, 0.1);\n    height: 2px;\n  }\n\n  .content {\n    flex: 1;\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .content-text {\n    flex: 1;\n    justify-content: center;\n  }\n\n  .text-title {\n    font-size: 48px;\n    color: #000000;\n    line-height: 57px;\n    text-overflow: ellipsis;\n    lines: 1;\n  }\n\n  .text-summary {\n    margin-top: 9px;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.4);\n    line-height: 42px;\n    text-overflow: ellipsis;\n    lines: 1;\n  }\n\n  .text-description {\n    flex: 1;\n    margin-top: 9px;\n    font-size: 36px;\n    color: rgba(0, 0, 0, 0.4);\n    line-height: 42px;\n  }\n\n  .image {\n    margin-right: 48px;\n  }\n</style>\n\n<script>\nimport FmImage from '../fm-image';\nimport Scene from './scene';\n\nexport default {\n  name: 'FmItem',\n  components: { FmImage },\n  props: {\n    type: {\n      type: String,\n      default: 'normal'\n    },\n    title: String,\n    summary: String,\n    description: String,\n    imgSrc: String,\n    titleColor: {\n      type: String,\n      default: '#000000'\n    },\n    summaryColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    descColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    imgWidth: {\n      type: Number,\n      default: 96\n    },\n    imgHeight: {\n      type: Number,\n      default: 96\n    },\n    imgRadius: {\n      type: Number,\n      default: 0\n    },\n    imgPosition: {\n      type: String,\n      default: 'center'\n    },\n    paddingTop: {\n      type: Number,\n      default: 54\n    },\n    paddingBottom: {\n      type: Number,\n      default: 54\n    },\n    occupyingColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.1)'\n    },\n    border: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    scene: {}\n  }),\n  computed: {\n    wrapStyle () {\n      const { paddingTop, paddingBottom, imgPosition, scene } = this;\n      return {\n        paddingTop: `${scene.paddingTop || paddingTop}px`,\n        paddingBottom: `${scene.paddingBottom || paddingBottom}px`,\n        alignItems: (scene.imgPosition || imgPosition) === 'top' ? 'flex-start' : (scene.imgPosition || imgPosition) === 'bottom' ? 'flex-end' : 'center'\n      };\n    }\n  },\n  watch: {\n    type (val) {\n      this.scene = Scene[val];\n    }\n  },\n  created () {\n    this.scene = Scene[this.type];\n  },\n  methods: {\n    itemClicked (e) {\n      this.$emit('fmItemClicked', e);\n    },\n    itemLongpress (e) {\n      this.$emit('fmItemLongpress', e);\n    }\n  }\n};\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmImage = __webpack_require__(5);

var _fmImage2 = _interopRequireDefault(_fmImage);

var _scene = __webpack_require__(69);

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmItem',
  components: { FmImage: _fmImage2.default },
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    title: String,
    summary: String,
    description: String,
    imgSrc: String,
    titleColor: {
      type: String,
      default: '#000000'
    },
    summaryColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    descColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    imgWidth: {
      type: Number,
      default: 96
    },
    imgHeight: {
      type: Number,
      default: 96
    },
    imgRadius: {
      type: Number,
      default: 0
    },
    imgPosition: {
      type: String,
      default: 'center'
    },
    paddingTop: {
      type: Number,
      default: 54
    },
    paddingBottom: {
      type: Number,
      default: 54
    },
    occupyingColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      scene: {}
    };
  },
  computed: {
    wrapStyle: function wrapStyle() {
      var paddingTop = this.paddingTop,
          paddingBottom = this.paddingBottom,
          imgPosition = this.imgPosition,
          scene = this.scene;

      return {
        paddingTop: (scene.paddingTop || paddingTop) + 'px',
        paddingBottom: (scene.paddingBottom || paddingBottom) + 'px',
        alignItems: (scene.imgPosition || imgPosition) === 'top' ? 'flex-start' : (scene.imgPosition || imgPosition) === 'bottom' ? 'flex-end' : 'center'
      };
    }
  },
  watch: {
    type: function type(val) {
      this.scene = _scene2.default[val];
    }
  },
  created: function created() {
    this.scene = _scene2.default[this.type];
  },

  methods: {
    itemClicked: function itemClicked(e) {
      this.$emit('fmItemClicked', e);
    },
    itemLongpress: function itemLongpress(e) {
      this.$emit('fmItemLongpress', e);
    }
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'single': {
    paddingTop: 48,
    paddingBottom: 48
  },
  'normal': {},
  'avatar-single': {
    imgWidth: 120,
    imgHeight: 120,
    imgRadius: 60,
    paddingTop: 48,
    paddingBottom: 48
  },
  'avatar-normal': {
    imgWidth: 120,
    imgHeight: 120,
    imgRadius: 60,
    paddingTop: 48,
    paddingBottom: 48,
    imgPosition: 'top'
  },
  'icon-small': {
    imgWidth: 96,
    imgHeight: 96,
    paddingTop: 36,
    paddingBottom: 36
  },
  'icon-middle': {
    imgWidth: 138,
    imgHeight: 138,
    imgRadius: 4,
    paddingTop: 24,
    paddingBottom: 24
  },
  'icon-large': {
    imgWidth: 192,
    imgHeight: 192,
    paddingTop: 36,
    paddingBottom: 36
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.itemClicked,
      "longpress": _vm.itemLongpress
    }
  }, [_c('div', {
    staticClass: "item-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, [(_vm.imgSrc) ? _c('div', {
    staticClass: "image",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('fm-image', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      borderRadius: _vm.scene.imgRadius || _vm.imgRadius
    })),
    attrs: {
      "src": _vm.imgSrc,
      "width": _vm.scene.imgWidth || _vm.imgWidth,
      "height": _vm.scene.imgHeight || _vm.imgHeight,
      "occupyingColor": _vm.occupyingColor
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("left"), _vm._v(" "), _c('div', {
    staticClass: "content-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("title", [(_vm.title) ? _c('text', {
    staticClass: "text-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e()]), _vm._v(" "), (_vm.summary) ? _c('text', {
    staticClass: "text-summary",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.summaryColor
    }))
  }, [_vm._v(_vm._s(_vm.summary))]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('text', {
    staticClass: "text-description",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.descColor
    }))
  }, [_vm._v(_vm._s(_vm.description))]) : _vm._e()], 2), _vm._v(" "), _vm._t("right")], 2)]), _vm._v(" "), (_vm.border) ? _c('div', {
    staticClass: "item-border",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      marginLeft: _vm.imgSrc ? (_vm.scene.imgWidth || _vm.imgWidth) + 48 : 0
    }))
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c88d718", module.exports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(112);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(77);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(87);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(95);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Tw93 on 2017/6/26.
 */
var Utils = {
  /**
   * 对象类型
   * @memberOf Utils
   * @param obj
   * @returns {string}
   * @private
   */
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },

  /**
   * 判断 obj 是否为 `object`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isPlainObject } = Utils;
   * console.log(isPlainObject({})); // true
   * console.log(isPlainObject('')); // false
   */
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },

  /**
   * 判断 obj 是否为 `string`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isString } = Utils;
   * console.log(isString({})); // false
   * console.log(isString('')); // true
   */
  isString: function isString(obj) {
    return typeof obj === 'string';
  },

  /**
   * 判断 obj 是否为 `非空数组`
   * @memberOf Utils
   * @param obj
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wxv-bridge');
   * const { isNonEmptyArray } = Utils;
   * console.log(isNonEmptyArray([])); // false
   * console.log(isNonEmptyArray([1,1,1,1])); // true
   */
  isNonEmptyArray: function isNonEmptyArray(obj) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  }
};
exports.default = Utils;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(206);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(78)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(80),
  /* template */
  __webpack_require__(81),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-10b8a20a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-input/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10b8a20a", Component.options)
  } else {
    hotAPI.reload("data-v-10b8a20a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ac23d134", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10b8a20a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-10b8a20a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-wrapper[data-v-10b8a20a] {\n  padding-top: 0.66667rem;\n  padding-right: 0.44444rem;\n  padding-left: 0.44444rem;\n}\n.fm-input[data-v-10b8a20a] {\n  padding-bottom: 0.15741rem;\n  border-bottom-style: solid;\n  border-bottom-width: 0.02778rem;\n  border-bottom-color: #e6e6e6;\n  font-size: 0.44444rem;\n  height: 0.78704rem;\n  color: #000000;\n  placeholder-color: #dddddd;\n}\n.fm-input[data-v-10b8a20a]::-webkit-input-placeholder {\n  color: #dddddd;\n}\n.fm-input[data-v-10b8a20a]:-moz-placeholder {\n  color: #dddddd;\n}\n.fm-input[data-v-10b8a20a]::-moz-placeholder {\n  color: #dddddd;\n}\n.fm-input[data-v-10b8a20a]:-ms-input-placeholder {\n  color: #dddddd;\n}\n.fm-input[data-v-10b8a20a]:placeholder-shown {\n  color: #dddddd;\n}\n.fm-input-wrap[data-v-10b8a20a] {\n  position: relative;\n}\n.delete[data-v-10b8a20a] {\n  position: absolute;\n  bottom: 0.27778rem;\n  right: 0.66667rem;\n  width: 0.46296rem;\n  height: 0.46296rem;\n  padding-top: 0.06481rem;\n  padding-left: 0.05556rem;\n  background-color:  rgba(77, 77, 77, 0.50);\n  border-radius: 0.27778rem;\n  font-weight: 700;\n}\n.visible[data-v-10b8a20a] {\n  position: absolute;\n  top: 0.58333rem;\n  right: 0.66667rem;\n  width: 0.66667rem;\n  height: 0.66667rem;\n}\n.error-msg[data-v-10b8a20a] {\n  font-size: 0.33333rem;\n  color: #df2b18;\n  margin-left: 0.22222rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-input/index.vue?95244990","/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-input/<no source>"],"names":[],"mappings":";AA2BA;EACA,wBAAA;EACA,0BAAA;EACA,yBAAA;CACA;AAEA;EACA,2BAAA;EACA,2BAAA;EACA,gCAAA;EACA,6BAAA;EACA,sBAAA;EACA,mBAAA;EACA,eAAA;EACA,2BAAA;CACA;AC1CA;EAAA,eAAA;CAAA;AAAA;EAAA,eAAA;CAAA;AAAA;EAAA,eAAA;CAAA;AAAA;EAAA,eAAA;CAAA;AAAA;EAAA,eAAA;CAAA;AD4CA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,wBAAA;EACA,yBAAA;EACA,0CAAA;EACA,0BAAA;EACA,iBAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div class=\"fm-wrapper\">\n    <input\n      :type=\"type\"\n      class=\"fm-input\"\n      :style=\"inputStyle\"\n      :value=\"value\"\n      :maxlength=\"maxlength\"\n      :placeholder=\"placeholder\"\n      :autofocus=\"autofocus\"\n      :disabled=\"disabled\"\n      :return-key-type=\"returnKeyType\"\n      :nightMode=\"nightMode\"\n      @input=\"input\"\n      @change=\"change\"\n      @focus=\"beFocus\"\n      @blur=\"beBlur\"\n      ref=\"input\" />\n    <fm-icon v-if=\"delShow\" class=\"delete\" name=\"guanbi\" :icon-style=\"38\" color=\"#fff\" @fmIconClicked=\"delClick\" />\n    <fm-icon v-if=\"visibleShow\" class=\"visible\" :name=\"visibleValue\" :icon-style=\"72\" color=\"#666\" @fmIconClicked=\"toggleVisible\" />\n    <text v-if=\"hasError && autoError\" class=\"error-msg\">{{inputErrorMessage}}</text>\n  </div>\n</template>\n\n<style scoped>\n  .fm-wrapper {\n    padding-top: 72px;\n    padding-right: 48px;\n    padding-left: 48px;\n  }\n\n  .fm-input {\n    padding-bottom: 17px;\n    border-bottom-style: solid;\n    border-bottom-width: 3px;\n    border-bottom-color: #e6e6e6;\n    font-size: 48px;\n    height: 85px;\n    color: #000000;\n    placeholder-color: #dddddd;\n  }\n\n  .fm-input-wrap {\n    position: relative;\n  }\n\n  .delete {\n    position: absolute;\n    bottom: 30px;\n    right: 72px;\n    width: 50px;\n    height: 50px;\n    padding-top: 7px;\n    padding-left: 6px;\n    background-color:  rgba(77, 77, 77, 0.50);\n    border-radius: 30px;\n    font-weight: 700;\n  }\n\n  .visible {\n    position: absolute;\n    top: 63px;\n    right: 72px;\n    width: 72px;\n    height: 72px;\n  }\n\n  .error-msg {\n    font-size: 36px;\n    color: #df2b18;\n    margin-left: 24px;\n  }\n</style>\n\n<script>\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\nimport STYLE from 'weex-flymeui/lib/theme/default/index.js';\nimport FmIcon from '../fm-icon';\n\nexport default {\n  name: 'FmInput',\n  mixins: [Locale],\n  components: { FmIcon },\n  mounted () {\n    if (this.type === 'password') {\n      this.pwdModel = true;\n    }\n    this.value = this.defaultValue || '';\n  },\n  data () {\n    return {\n      value: '',\n      rows: 1,\n      isFocus: false,\n      pwdModel: false,\n      pwdVisible: false\n    };\n  },\n  watch: {\n    defaultValue (val) {\n      this.value = val;\n    }\n  },\n  props: {\n    defaultValue: {\n      type: [String, Number],\n      default: ''\n    },\n    placeholder: {\n      type: String,\n      default () {\n        return t('el.input.placeholder');\n      }\n    },\n    autoError: {\n      type: Boolean,\n      default: true\n    },\n    maxlength: [String, Number],\n    inputPattern: RegExp,\n    inputErrorMessage: {\n      type: String,\n      default: '输入有误'\n    },\n    type: String,\n    autofocus: {\n      type: Boolean,\n      default: false\n    },\n    disabled: Boolean,\n    returnKeyType: {\n      type: String,\n      default: 'default'\n    },\n    nightMode: {\n      type: Boolean,\n      default: false\n    }\n  },\n  computed: {\n    visibleValue () {\n      return this.type === 'password' ? 'chakan' : 'yinbi';\n    },\n    inputStyle () {\n      const style = { paddingRight: 0 };\n      style.borderBottomColor = (!this.hasError || !this.autoError) ? this.isFocus ? STYLE.primaryColor : '#e6e6e6' : '#df2b18';\n      style.caretColor = STYLE.primaryColor;\n      if (this.delShow || this.visibleShow) {\n        style.paddingRight = 108 + 'px';\n      }\n      return style;\n    },\n    delShow () {\n      return !this.pwdModel && this.isFocus && this.value;\n    },\n    visibleShow () {\n      return this.isFocus && this.pwdModel;\n    },\n    hasError () {\n      const { inputPattern, value } = this;\n      if (inputPattern) {\n        if (!value.match(inputPattern)) {\n          return true;\n        }\n        return false;\n      }\n      return false;\n    }\n  },\n  methods: {\n    delClick (e) {\n      this.value = '';\n    },\n    toggleVisible (e) {\n      if (this.$refs.input.setType) {\n        this.pwdVisible\n          ? this.$refs.input.setType('password')\n          : this.$refs.input.setType('visible');\n        this.pwdVisible = !this.pwdVisible;\n      } else {\n        if (this.type === 'password') {\n          this.type = 'text';\n        } else {\n          this.type = 'password';\n        }\n      }\n    },\n    input (evt) {\n      this.value = evt.value;\n      this.$emit('input', evt);\n    },\n    change (evt) {\n      this.$emit('change', evt);\n    },\n    beFocus (evt) {\n      this.isFocus = true;\n      this.$emit('focus', evt);\n    },\n    beBlur (evt) {\n      this.isFocus = false;\n      this.$emit('blur', evt);\n    },\n    focus () {\n      this.$refs.input.focus();\n    },\n    blur () {\n      this.$refs.input.blur();\n    },\n    setSelectionRange (start, end) {\n      this.$refs.input.setSelectionRange(start, end);\n    },\n    getEditSelectionRange (callback) {\n      this.$refs.input.getEditSelectionRange(callback);\n    },\n    setValue (value) {\n      this.value = value;\n    }\n  }\n};\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmInput',
  mixins: [_locale2.default],
  components: { FmIcon: _fmIcon2.default },
  mounted: function mounted() {
    if (this.type === 'password') {
      this.pwdModel = true;
    }
    this.value = this.defaultValue || '';
  },
  data: function data() {
    return {
      value: '',
      rows: 1,
      isFocus: false,
      pwdModel: false,
      pwdVisible: false
    };
  },

  watch: {
    defaultValue: function defaultValue(val) {
      this.value = val;
    }
  },
  props: {
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.input.placeholder');
      }
    },
    autoError: {
      type: Boolean,
      default: true
    },
    maxlength: [String, Number],
    inputPattern: RegExp,
    inputErrorMessage: {
      type: String,
      default: '输入有误'
    },
    type: String,
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    returnKeyType: {
      type: String,
      default: 'default'
    },
    nightMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleValue: function visibleValue() {
      return this.type === 'password' ? 'chakan' : 'yinbi';
    },
    inputStyle: function inputStyle() {
      var style = { paddingRight: 0 };
      style.borderBottomColor = !this.hasError || !this.autoError ? this.isFocus ? _index2.default.primaryColor : '#e6e6e6' : '#df2b18';
      style.caretColor = _index2.default.primaryColor;
      if (this.delShow || this.visibleShow) {
        style.paddingRight = 108 + 'px';
      }
      return style;
    },
    delShow: function delShow() {
      return !this.pwdModel && this.isFocus && this.value;
    },
    visibleShow: function visibleShow() {
      return this.isFocus && this.pwdModel;
    },
    hasError: function hasError() {
      var inputPattern = this.inputPattern,
          value = this.value;

      if (inputPattern) {
        if (!value.match(inputPattern)) {
          return true;
        }
        return false;
      }
      return false;
    }
  },
  methods: {
    delClick: function delClick(e) {
      this.value = '';
    },
    toggleVisible: function toggleVisible(e) {
      if (this.$refs.input.setType) {
        this.pwdVisible ? this.$refs.input.setType('password') : this.$refs.input.setType('visible');
        this.pwdVisible = !this.pwdVisible;
      } else {
        if (this.type === 'password') {
          this.type = 'text';
        } else {
          this.type = 'password';
        }
      }
    },
    input: function input(evt) {
      this.value = evt.value;
      this.$emit('input', evt);
    },
    change: function change(evt) {
      this.$emit('change', evt);
    },
    beFocus: function beFocus(evt) {
      this.isFocus = true;
      this.$emit('focus', evt);
    },
    beBlur: function beBlur(evt) {
      this.isFocus = false;
      this.$emit('blur', evt);
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    setSelectionRange: function setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end);
    },
    getEditSelectionRange: function getEditSelectionRange(callback) {
      this.$refs.input.getEditSelectionRange(callback);
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('input', {
    ref: "input",
    staticClass: "fm-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.inputStyle)),
    attrs: {
      "type": _vm.type,
      "maxlength": _vm.maxlength,
      "placeholder": _vm.placeholder,
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "return-key-type": _vm.returnKeyType,
      "nightMode": _vm.nightMode
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.input,
      "change": _vm.change,
      "focus": _vm.beFocus,
      "blur": _vm.beBlur
    }
  }), _vm._v(" "), (_vm.delShow) ? _c('fm-icon', {
    staticClass: "delete",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": "guanbi",
      "icon-style": 38,
      "color": "#fff"
    },
    on: {
      "fmIconClicked": _vm.delClick
    }
  }) : _vm._e(), _vm._v(" "), (_vm.visibleShow) ? _c('fm-icon', {
    staticClass: "visible",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": _vm.visibleValue,
      "icon-style": 72,
      "color": "#666"
    },
    on: {
      "fmIconClicked": _vm.toggleVisible
    }
  }) : _vm._e(), _vm._v(" "), (_vm.hasError && _vm.autoError) ? _c('text', {
    staticClass: "error-msg",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.inputErrorMessage))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-10b8a20a", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(83)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(85),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5cb22ec6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-btn/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5cb22ec6", Component.options)
  } else {
    hotAPI.reload("data-v-5cb22ec6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("18ab8268", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5cb22ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5cb22ec6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.dialog-btn[data-v-5cb22ec6] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n.btnText[data-v-5cb22ec6] {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 0.44444rem;\n    color: #198ded;\n    text-align: center;\n}\n.dialog-btnText[data-v-5cb22ec6] {\n    padding: 0.33333rem;\n}\n.actionSheet-btnText[data-v-5cb22ec6] {\n\t\tline-height: 1.77778rem;\n\t\tborder-bottom-style: solid;\n\t\tborder-bottom-width: 1px;\n\t\tborder-bottom-color: #E6E6E6;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-btn/index.vue?a42902d0"],"names":[],"mappings":";AASA;IACA,oBAAA;IAAA,gBAAA;YAAA,QAAA;CACA;AAEA;IACA,+BAAA;IACA,iBAAA;IACA,sBAAA;IACA,eAAA;IACA,mBAAA;CACA;AAEA;IACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,2BAAA;EACA,yBAAA;EACA,6BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div class=\"dialog-btn\">\n    <text :class=\"btnClz\" :style=\"btnStyle\" @click=\"click()\">{{ text }}</text>\n\t</div>\n</template>\n\n<style scoped>\n  .dialog-btn {\n    flex: 1;\n  }\n\n\t.btnText {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 48px;\n    color: #198ded;\n    text-align: center;\n\t}\n\n  .dialog-btnText {\n    padding: 36px;\n  }\n\n\t.actionSheet-btnText {\n\t\tline-height: 192px;\n\t\tborder-bottom-style: solid;\n\t\tborder-bottom-width: 1px;\n\t\tborder-bottom-color: #E6E6E6;\n\t}\n</style>\n\n<script>\nexport default {\n  name: 'FmSimpleBtn',\n  props: {\n    text: String,\n    type: String,\n    color: String,\n    msg: [String, Number, Array, Object],\n    scene: {\n      type: String,\n      defalut: 'dialog'\n    }\n  },\n  computed: {\n    btnClz () {\n      const clz = ['btnText'];\n      if (this.scene === 'dialog') {\n        clz.push('dialog-btnText');\n      } else if (this.scene === 'actionSheet') {\n        clz.push('actionSheet-btnText');\n      }\n      return clz;\n    },\n    btnStyle () {\n      const { color } = this;\n      if (color) {\n        return {\n          color: color\n        };\n      }\n    }\n  },\n  methods: {\n    click () {\n      const { text, msg, type } = this;\n      this.$emit('click', { text: text, type: type, msg: msg });\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmSimpleBtn',
  props: {
    text: String,
    type: String,
    color: String,
    msg: [String, Number, Array, Object],
    scene: {
      type: String,
      defalut: 'dialog'
    }
  },
  computed: {
    btnClz: function btnClz() {
      var clz = ['btnText'];
      if (this.scene === 'dialog') {
        clz.push('dialog-btnText');
      } else if (this.scene === 'actionSheet') {
        clz.push('actionSheet-btnText');
      }
      return clz;
    },
    btnStyle: function btnStyle() {
      var color = this.color;

      if (color) {
        return {
          color: color
        };
      }
    }
  },
  methods: {
    click: function click() {
      var text = this.text,
          msg = this.msg,
          type = this.type;

      this.$emit('click', { text: text, type: type, msg: msg });
    }
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dialog-btn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    class: _vm.btnClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.btnStyle)),
    on: {
      "click": function($event) {
        _vm.click()
      }
    }
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5cb22ec6", module.exports)
  }
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(88),
  /* template */
  __webpack_require__(94),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-checkbox-list/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-788167ce", Component.options)
  } else {
    hotAPI.reload("data-v-788167ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//

var _index = __webpack_require__(64);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmCheckboxList',
  components: { FmCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否单选
    single: {
      type: Boolean,
      default: false
    },
    lastBorderHidden: {
      type: Boolean,
      default: false
    },
    // 选择个数限制
    limit: {
      type: Number
    }
  },
  data: function data() {
    return {
      checkedList: [],
      inList: this.initList()
    };
  },

  watch: {
    list: function list() {
      this.inList = this.initList();
    }
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },

  methods: {
    onSelect: function onSelect(index) {
      var checked = this.inList[index].checked;
      if (this.limit > 0 && this.limit <= this.checkedCount && !checked) {
        this.$emit('overLimit', this.limit);
      } else {
        this.updateList(index);
        this.$emit('fmCheckBoxListChecked', {
          selectIndex: index,
          checked: !checked,
          checkedList: this.inList.filter(function (item) {
            return item.checked;
          })
        });
      }
    },
    initList: function initList() {
      var single = this.single;
      var checkedCount = 0;

      var newList = this.list.map(function (item, i) {
        var checked = item.checked,
            disabled = item.disabled;

        disabled = !!disabled;
        // disabled 为 true 时认为 checked 无效，同时单选模式下只认为第一个 checked 为 true 的为有效值
        checked = !disabled && !!checked && (!single || checkedCount === 0);
        if (item.checked) checkedCount += 1;
        return _extends({}, item, {
          checked: checked,
          disabled: disabled
        });
      });

      this.checkedCount = checkedCount;
      return newList;
    },
    updateList: function updateList(index) {
      var single = this.single;
      var checkedCount = 0;
      this.inList = this.inList.map(function (item, i) {
        if (single) {
          item.checked = index === i && !item.checked;
        } else {
          if (i === index) item.checked = !item.checked;
        }
        if (item.checked) checkedCount += 1;
        return item;
      });
      this.checkedCount = checkedCount;
    },
    reset: function reset() {
      this.inList = this.list.map(function (item, i) {
        var checked = item.checked,
            disabled = item.disabled;

        disabled = !!disabled;
        checked = false;
        return _extends({}, item, {
          checked: checked,
          disabled: disabled
        });
      });
    }
  }
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e8758b7a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47ee1270\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47ee1270\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.icon-wrap[data-v-47ee1270] {\n  opacity: 1;\n  overflow: hidden;\n  height: 0.66667rem;\n  width: 0.66667rem;\n}\n.icon-outer[data-v-47ee1270] {\n  width: 0.66667rem;\n  height: 0.66667rem;\n  overflow: hidden;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-checkbox/index.vue?9b305e7c"],"names":[],"mappings":";AA+GA;EACA,WAAA;EACA,iBAAA;EACA,mBAAA;EACA,kBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Updated by Yanjiie on 2018/04/12. -->\n<template>\n  <fm-item\n    v-bind=\"Object.assign({}, model)\"\n    @fmItemClicked=\"itemClicked\"\n    :border=\"border\"\n    :titleColor=\"innerChecked ? !disabled ? STYLE.primaryColor : STYLE.lightColor : '#000000'\">\n    <div class=\"icon-wrap\" slot=\"right\">\n      <div\n        class=\"icon-outer\"\n        ref=\"icon\"\n        :style=\"{ width: (isChecked ? 72 : 1) + 'px' }\">\n        <image class=\"icon\"\n               :style=\"{ width: '72px', height: '72px' }\"\n               resize=\"cover\"\n               :src=\"!disabled ? checkedIcon : disabledIcon\" />\n      </div>\n    </div>\n  </fm-item>\n</template>\n\n<script>\nimport STYLE from 'weex-flymeui/lib/theme/default/fm-checkbox.js';\nimport FmItem from '../fm-item';\n\nconst animation = weex.requireModule('animation');\nexport default {\n  name: 'FmCheckbox',\n  components: { FmItem },\n  props: {\n    value: {\n      type: [String, Number, Object, Boolean],\n      default: ''\n    },\n    checked: Boolean,\n    disabled: Boolean,\n    checkedIcon: {\n      type: String,\n      default: STYLE.CHECKED\n    },\n    disabledIcon: {\n      type: String,\n      default: STYLE.CHECKED_DISABLED\n    },\n    listModel: Boolean,\n    border: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    model: {},\n    isChecked: false,\n    innerChecked: false\n  }),\n  watch: {\n    checked (val) {\n      this.innerChecked = val;\n      this.appearIcon(this.innerChecked);\n    }\n  },\n  methods: {\n    itemClicked () {\n      if (this.listModel) {\n        this.$emit('fmCheckBoxItemChecked', { value, checked: this.innerChecked });\n        return;\n      }\n      const { disabled, innerChecked, value } = this;\n      if (!disabled) {\n        this.innerChecked = !innerChecked;\n        this.appearIcon(this.innerChecked);\n        this.$emit('fmCheckBoxItemChecked', { value, checked: this.innerChecked });\n      }\n    },\n    appearIcon (bool, duration = 150) {\n      const iconEl = this.$refs['icon'];\n      if (!iconEl) {\n        return;\n      }\n      const style = bool\n        ? {\n          opacity: 1,\n          width: 72\n        }\n        : {\n          opacity: 0\n        };\n      animation.transition(\n        iconEl,\n        {\n          styles: style,\n          duration,\n          delay: 0,\n          timingFunction: 'ease-out'\n        },\n        () => {\n          this.isChecked = bool;\n        }\n      );\n    }\n  },\n  created () {\n    this.checked && (this.innerChecked = true) && (this.isChecked = true);\n    this.STYLE = STYLE;\n    this.model = this.$attrs;\n  }\n};\n</script>\n\n<style scoped>\n  .icon-wrap {\n    opacity: 1;\n    overflow: hidden;\n    height: 72px;\n    width: 72px;\n  }\n\n  .icon-outer {\n    width: 72px;\n    height: 72px;\n    overflow: hidden;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmCheckbox = __webpack_require__(92);

var _fmCheckbox2 = _interopRequireDefault(_fmCheckbox);

var _fmItem = __webpack_require__(57);

var _fmItem2 = _interopRequireDefault(_fmItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  name: 'FmCheckbox',
  components: { FmItem: _fmItem2.default },
  props: {
    value: {
      type: [String, Number, Object, Boolean],
      default: ''
    },
    checked: Boolean,
    disabled: Boolean,
    checkedIcon: {
      type: String,
      default: _fmCheckbox2.default.CHECKED
    },
    disabledIcon: {
      type: String,
      default: _fmCheckbox2.default.CHECKED_DISABLED
    },
    listModel: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      model: {},
      isChecked: false,
      innerChecked: false
    };
  },
  watch: {
    checked: function checked(val) {
      this.innerChecked = val;
      this.appearIcon(this.innerChecked);
    }
  },
  methods: {
    itemClicked: function itemClicked() {
      if (this.listModel) {
        this.$emit('fmCheckBoxItemChecked', { value: value, checked: this.innerChecked });
        return;
      }
      var disabled = this.disabled,
          innerChecked = this.innerChecked,
          value = this.value;

      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.appearIcon(this.innerChecked);
        this.$emit('fmCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    },
    appearIcon: function appearIcon(bool) {
      var _this = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;

      var iconEl = this.$refs['icon'];
      if (!iconEl) {
        return;
      }
      var style = bool ? {
        opacity: 1,
        width: 72
      } : {
        opacity: 0
      };
      animation.transition(iconEl, {
        styles: style,
        duration: duration,
        delay: 0,
        timingFunction: 'ease-out'
      }, function () {
        _this.isChecked = bool;
      });
    }
  },
  created: function created() {
    this.checked && (this.innerChecked = true) && (this.isChecked = true);
    this.STYLE = _fmCheckbox2.default;
    this.model = this.$attrs;
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign({}, _index2.default, {
  CHECKED: 'http://p1nq9peby.bkt.clouddn.com/weex-flymeui/check_blue.png',
  CHECKED_DISABLED: 'http://p1nq9peby.bkt.clouddn.com/weex-flymeui/check_disabled_blue.png'
}); /**
     * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
     * Created by Yanjiie on 18/04/20
     */

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fm-item', _vm._b({
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "border": _vm.border,
      "titleColor": _vm.innerChecked ? !_vm.disabled ? _vm.STYLE.primaryColor : _vm.STYLE.lightColor : '#000000'
    },
    on: {
      "fmItemClicked": _vm.itemClicked
    }
  }, 'fm-item', Object.assign({}, _vm.model), false), [_c('div', {
    staticClass: "icon-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "slot": "right"
    },
    slot: "right"
  }, [_c('div', {
    ref: "icon",
    staticClass: "icon-outer",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: (_vm.isChecked ? 72 : 1) + 'px'
    }))
  }, [_c('image', {
    staticClass: "icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: '72px',
      height: '72px'
    })),
    attrs: {
      "resize": "cover",
      "src": !_vm.disabled ? _vm.checkedIcon : _vm.disabledIcon
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-47ee1270", module.exports)
  }
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.inList), function(item, idx) {
    return _c('fm-checkbox', _vm._b({
      key: idx,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "border": !_vm.lastBorderHidden || idx !== _vm.inList.length - 1,
        "list-model": true
      },
      on: {
        "fmCheckBoxItemChecked": function($event) {
          _vm.onSelect(idx)
        }
      }
    }, 'fm-checkbox', item, false))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-788167ce", module.exports)
  }
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(96)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(99),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0a22d546",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-popup/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a22d546", Component.options)
  } else {
    hotAPI.reload("data-v-0a22d546", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("36370f0a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0a22d546\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0a22d546\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-popup[data-v-0a22d546] {\n\t\tposition: fixed;\n\t\twidth: 10rem;\n}\n.top[data-v-0a22d546] {\n    left: 0;\n    right: 0;\n}\n.bottom[data-v-0a22d546] {\n    left: 0;\n    right: 0;\n}\n.left[data-v-0a22d546] {\n    bottom: 0;\n    top: 0;\n}\n.right[data-v-0a22d546] {\n    bottom: 0;\n    top: 0;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-popup/index.vue?40939200"],"names":[],"mappings":";AAyBA;EACA,gBAAA;EACA,aAAA;CACA;AAEA;IACA,QAAA;IACA,SAAA;CACA;AAEA;IACA,QAAA;IACA,SAAA;CACA;AAEA;IACA,UAAA;IACA,OAAA;CACA;AAEA;IACA,UAAA;IACA,OAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Updated by Yanjiie on 2018/04/12. Fork from weex-ui. -->\n<template>\n  <div>\n    <div @touchend=\"handleTouchEnd\">\n      <fm-overlay :show=\"haveOverlay && isOverShow\"\n                   v-if=\"show\"\n                   ref=\"overlay\"\n                   v-bind=\"overlayCfg\"\n                   :use-native=\"false\"\n                   @fmOverlayBodyClicking=\"fmOverlayBodyClicking\"></fm-overlay>\n    </div>\n    <div ref=\"fm-popup\"\n         v-if=\"show\"\n         :height=\"_height\"\n         :hack=\"isNeedShow\"\n         @click=\"()=>{}\"\n         :class=\"['fm-popup', pos]\"\n         :style=\"padStyle\">\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n\t.fm-popup {\n\t\tposition: fixed;\n\t\twidth: 1080px;\n\t}\n\n  .top {\n    left: 0;\n    right: 0;\n  }\n\n  .bottom {\n    left: 0;\n    right: 0;\n  }\n\n  .left {\n    bottom: 0;\n    top: 0;\n  }\n\n  .right {\n    bottom: 0;\n    top: 0;\n  }\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nconst { platform } = weex.config.env;\nconst isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';\nimport FmOverlay from '../fm-overlay';\n\nexport default {\n  name: 'FmPopup',\n  components: { FmOverlay },\n  props: {\n    show: {\n      type: Boolean,\n      default: false\n    },\n    pos: {\n      type: String,\n      default: 'bottom'\n    },\n    popupColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    overlayCfg: {\n      type: Object,\n      default: () => ({\n        hasAnimation: true,\n        timingFunction: ['ease-in', 'ease-out'],\n        duration: 300,\n        opacity: 0.5\n      })\n    },\n    height: {\n      type: [Number, String],\n      default: 840\n    },\n    standOut: {\n      type: [Number, String],\n      default: 0\n    },\n    width: {\n      type: [Number, String],\n      default: 1080\n    },\n    animation: {\n      type: Object,\n      default: () => ({\n        timingFunction: 'ease-out'\n      })\n    }\n  },\n  data: () => ({\n    haveOverlay: true,\n    isOverShow: true\n  }),\n  computed: {\n    isNeedShow () {\n      setTimeout(() => {\n        this.appearPopup(this.show);\n      }, 50);\n      return this.show;\n    },\n    _height () {\n      this.appearPopup(this.show, 150);\n      return this.height;\n    },\n    transformValue () {\n      return this.getTransform(this.pos, this.width, this.height, true);\n    },\n    padStyle () {\n      const { pos, width, height, popupColor } = this;\n      let style = {\n        width: `${width}px`,\n        backgroundColor: popupColor\n      };\n      pos === 'top' && (style = {\n        ...style,\n        top: `${-height}px`,\n        height: `${height}px`\n      });\n      pos === 'bottom' && (style = {\n        ...style,\n        bottom: `${-height}px`,\n        height: `${height}px`\n      });\n      pos === 'left' && (style = {\n        ...style,\n        left: `${-width}px`\n      });\n      pos === 'right' && (style = {\n        ...style,\n        right: `${-width}px`\n      });\n      return style;\n    }\n  },\n  methods: {\n    handleTouchEnd (e) {\n      const { platform } = weex.config.env;\n      platform === 'Web' && e.preventDefault && e.preventDefault();\n    },\n    hide () {\n      this.appearPopup(false);\n      this.$refs.overlay.appearOverlay(false);\n    },\n    fmOverlayBodyClicking () {\n      this.isShow && this.appearPopup(false);\n    },\n    appearPopup (bool, duration = 300) {\n      this.isShow = bool;\n      const popupEl = this.$refs['fm-popup'];\n      if (!popupEl) {\n        return;\n      }\n      animation.transition(popupEl, {\n        styles: {\n          transform: this.getTransform(this.pos, this.width, this.height, !bool)\n        },\n        duration,\n        delay: 0,\n        ...this.animation\n      }, () => {\n        if (!bool) {\n          this.$emit('fmPopupOverlayClicked', { pos: this.pos });\n        }\n      });\n    },\n    getTransform (pos, width, height, bool) {\n      let _size = pos === 'top' || pos === 'bottom' ? height : width;\n      let _transform;\n      if (isWeb) {\n        _size -= this.standOut;\n      }\n      bool && (_size = 0);\n      switch (pos) {\n        case 'top':\n          _transform = `translateY(${_size}px)`;\n          break;\n        case 'bottom':\n          _transform = `translateY(-${_size}px)`;\n          break;\n        case 'left':\n          _transform = `translateX(${_size}px)`;\n          break;\n        case 'right':\n          _transform = `translateX(-${_size}px)`;\n          break;\n      }\n      return _transform;\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fmOverlay = __webpack_require__(43);

var _fmOverlay2 = _interopRequireDefault(_fmOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var platform = weex.config.env.platform;

var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
exports.default = {
  name: 'FmPopup',
  components: { FmOverlay: _fmOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.5
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 1080
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-out'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    transformValue: function transformValue() {
      return this.getTransform(this.pos, this.width, this.height, true);
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor;

      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    fmOverlayBodyClicking: function fmOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['fm-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('fmPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      var _transform = void 0;
      if (isWeb) {
        _size -= this.standOut;
      }
      bool && (_size = 0);
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show) ? _c('fm-overlay', _vm._b({
    ref: "overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow,
      "use-native": false
    },
    on: {
      "fmOverlayBodyClicking": _vm.fmOverlayBodyClicking
    }
  }, 'fm-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), _vm._v(" "), (_vm.show) ? _c('div', {
    ref: "fm-popup",
    class: ['fm-popup', _vm.pos],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.padStyle)),
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow
    },
    on: {
      "click": function () {}
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a22d546", module.exports)
  }
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(64);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(102);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(103)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(105),
  /* template */
  __webpack_require__(106),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-665f9fc0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-titlebar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-665f9fc0", Component.options)
  } else {
    hotAPI.reload("data-v-665f9fc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5b0ecee9", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-665f9fc0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-665f9fc0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-status-bar[data-v-665f9fc0] {\n  height: 0.61111rem;\n  width: 10rem;\n}\n.fm-title-bar[data-v-665f9fc0] {\n  padding-left: 0.44444rem;\n  width: 10rem;\n  height: 1.33333rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.title-bar-back[data-v-665f9fc0] {\n  margin-left: -0.16667rem;\n  margin-right: 0.41667rem;\n  line-height: 0.66667rem;\n  height: 0.66667rem;\n  font-weight: 700;\n}\n.title-wrap[data-v-665f9fc0] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.title-text[data-v-665f9fc0] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-overflow: ellipsis;\n  lines: 1;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.44444rem;\n  line-height: 0.52778rem;\n  color: rgba(0, 0, 0, 0.6);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.btn-icon[data-v-665f9fc0] {\n  margin-right: 0.44444rem;\n  color: #198DED;\n  line-height: 0.66667rem;\n  height: 0.66667rem;\n}\n.btn-text[data-v-665f9fc0] {\n  margin-right: 0.44444rem;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.44444rem;\n  line-height: 0.52778rem;\n  color: #198DED;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-titlebar/index.vue?8cb8a1c4","/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-titlebar/<no source>"],"names":[],"mappings":";AAyBA;EACA,mBAAA;EACA,aAAA;CACA;AAEA;EACA,yBAAA;EACA,aAAA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;CACA;AAEA;EACA,yBAAA;EACA,yBAAA;EACA,wBAAA;EACA,mBAAA;EACA,iBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,wBAAA;EACA,SAAA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,wBAAA;EACA,0BAAA;EC3DA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD4DA;AAEA;EACA,yBAAA;EACA,eAAA;EACA,wBAAA;EACA,mBAAA;CACA;AAEA;EACA,yBAAA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,wBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div v-if=\"show\">\n    <div class=\"fm-status-bar\" v-if=\"statusbar\" :style=\"{ backgroundColor: backgroundColor, height: `${height - 144}px` }\"></div>\n    <div class=\"fm-title-bar\" :style=\"barStyle\">\n      <slot name=\"left\" v-if=\"hasPrev\">\n        <fm-icon @fmIconClicked=\"onBack\" class=\"title-bar-back\" name=\"fanhui\" :icon-style=\"72\" :color=\"leftColor\" />\n      </slot>\n      <div class=\"title-wrap\">\n        <slot name=\"middle\">\n          <text class=\"title-text\" :style=\"{ color: titleColor }\">{{ title }}</text>\n        </slot>\n      </div>\n      <slot name=\"right\">\n        <div v-for=\"(item, idx) in btns\" :key=\"idx\">\n          <fm-icon class=\"btn-icon\" v-if=\"item.type === 'icon'\" :name=\"item.value\" :style=\"item.color ? { color:item.color } : {}\" :icon-style=\"72\" @fmIconClicked=\"rightBtnClick(idx, item)\"/>\n          <text class=\"btn-text\" v-else :style=\"item.color ? { color:item.color } : {}\" @click=\"rightBtnClick(idx, item)\">{{ item.value }}</text>\n        </div>\n      </slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-status-bar {\n    height: 66px;\n    width: 1080px;\n  }\n\n  .fm-title-bar {\n    padding-left: 48px;\n    width: 1080px;\n    height: 144px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .title-bar-back {\n    margin-left: -18px;\n    margin-right: 45px;\n    line-height: 72px;\n    height: 72px;\n    font-weight: 700;\n  }\n\n  .title-wrap {\n    flex: 1;\n  }\n\n  .title-text {\n    flex: 1;\n    text-overflow: ellipsis;\n    lines: 1;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 48px;\n    line-height: 57px;\n    color: rgba(0, 0, 0, 0.6);\n  }\n\n  .btn-icon {\n    margin-right: 48px;\n    color: #198DED;\n    line-height: 72px;\n    height: 72px;\n  }\n\n  .btn-text {\n    margin-right: 48px;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 48px;\n    line-height: 57px;\n    color: #198DED;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\nconst Navigator = weex.requireModule('navigator');\n\nexport default {\n  name: 'FmTitlebar',\n  mixins: [Locale],\n  components: { FmIcon },\n  props: {\n    title: {\n      type: String,\n      default () {\n        return t('el.titlebar.title');\n      }\n    },\n    titleColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.6)'\n    },\n    statusbar: {\n      type: Boolean,\n      default: false\n    },\n    useDefaultReturn: {\n      type: Boolean,\n      default: true\n    },\n    hasPrev: {\n      type: Boolean,\n      default: true\n    },\n    borderStyle: {\n      type: Object,\n      default: () => ({})\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    leftColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.6)'\n    },\n    rightBtns: [Object, Array],\n    rightText: String,\n    show: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    height: 210,\n    statusHeight: 66\n  }),\n  computed: {\n    btns () {\n      const { rightBtns, rightText } = this;\n      let btns = [];\n      if (Array.isArray(rightBtns)) {\n        btns = btns.concat(rightBtns.slice(0, 3));\n      } else if (Object.prototype.toString.call(rightBtns).slice(8, -1).toLowerCase() === 'object') {\n        btns.push(rightBtns);\n      } else if (rightText) {\n        btns.push({ type: 'text', value: rightText });\n      }\n      return btns;\n    },\n    barStyle () {\n      const style = {\n        borderBottomStyle: 'solid',\n        borderBottomWidth: `${2}px`,\n        borderBottomColor: 'rgba(0, 0, 0, 0.1)',\n        paddingRight: `${this.rightBtns || this.rightText ? 0 : 48}px`\n      };\n      Object.assign(style, this.borderStyle);\n      style.backgroundColor = this.backgroundColor;\n      return style;\n    }\n  },\n  methods: {\n    onBack (e) {\n      const self = this;\n      if (self.useDefaultReturn) {\n        Navigator.pop({}, e => {\n        });\n      }\n      self.$emit('fmTitlebarLeftBtnClicked', {});\n    },\n    rightBtnClick (idx, item) {\n      this.$emit('fmTitlebarRightBtnClicked', { idx: idx, value: item });\n    }\n  },\n  created () {\n    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {\n      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;\n      this.height = this.statusHeight + 144;\n    }\n  }\n};\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigator = weex.requireModule('navigator'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmTitlebar',
  mixins: [_locale2.default],
  components: { FmIcon: _fmIcon2.default },
  props: {
    title: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.titlebar.title');
      }
    },
    titleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    statusbar: {
      type: Boolean,
      default: false
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    hasPrev: {
      type: Boolean,
      default: true
    },
    borderStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    leftColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    rightBtns: [Object, Array],
    rightText: String,
    show: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      height: 210,
      statusHeight: 66
    };
  },
  computed: {
    btns: function btns() {
      var rightBtns = this.rightBtns,
          rightText = this.rightText;

      var btns = [];
      if (Array.isArray(rightBtns)) {
        btns = btns.concat(rightBtns.slice(0, 3));
      } else if (Object.prototype.toString.call(rightBtns).slice(8, -1).toLowerCase() === 'object') {
        btns.push(rightBtns);
      } else if (rightText) {
        btns.push({ type: 'text', value: rightText });
      }
      return btns;
    },
    barStyle: function barStyle() {
      var style = {
        borderBottomStyle: 'solid',
        borderBottomWidth: 2 + 'px',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        paddingRight: (this.rightBtns || this.rightText ? 0 : 48) + 'px'
      };
      Object.assign(style, this.borderStyle);
      style.backgroundColor = this.backgroundColor;
      return style;
    }
  },
  methods: {
    onBack: function onBack(e) {
      var self = this;
      if (self.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      self.$emit('fmTitlebarLeftBtnClicked', {});
    },
    rightBtnClick: function rightBtnClick(idx, item) {
      this.$emit('fmTitlebarRightBtnClicked', { idx: idx, value: item });
    }
  },
  created: function created() {
    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {
      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;
      this.height = this.statusHeight + 144;
    }
  }
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', [(_vm.statusbar) ? _c('div', {
    staticClass: "fm-status-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.backgroundColor,
      height: ((_vm.height - 144) + "px")
    }))
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "fm-title-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.barStyle))
  }, [(_vm.hasPrev) ? _vm._t("left", [_c('fm-icon', {
    staticClass: "title-bar-back",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": "fanhui",
      "icon-style": 72,
      "color": _vm.leftColor
    },
    on: {
      "fmIconClicked": _vm.onBack
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "title-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("middle", [_c('text', {
    staticClass: "title-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))])])], 2), _vm._v(" "), _vm._t("right", _vm._l((_vm.btns), function(item, idx) {
    return _c('div', {
      key: idx,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [(item.type === 'icon') ? _c('fm-icon', {
      staticClass: "btn-icon",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.color ? {
        color: item.color
      } : {})),
      attrs: {
        "name": item.value,
        "icon-style": 72
      },
      on: {
        "fmIconClicked": function($event) {
          _vm.rightBtnClick(idx, item)
        }
      }
    }) : _c('text', {
      staticClass: "btn-text",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.color ? {
        color: item.color
      } : {})),
      on: {
        "click": function($event) {
          _vm.rightBtnClick(idx, item)
        }
      }
    }, [_vm._v(_vm._s(item.value))])], 1)
  }))], 2)]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-665f9fc0", module.exports)
  }
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(108);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(109)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(119),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1595dfba",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tabbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1595dfba", Component.options)
  } else {
    hotAPI.reload("data-v-1595dfba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c894337c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1595dfba\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1595dfba\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.tabbar-item[data-v-1595dfba] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tabbar/index.vue?2cac6c6a"],"names":[],"mappings":";AAcA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/03/12. -->\n<template>\n  <fm-footer class=\"fm-tabbar\" :background-color=\"backgroundColor\" padding-size=\"middle\">\n    <fm-tabbar-item class=\"tabbar-item\"\n                    v-if=\"!$slots.default\"\n                    v-for=\"(item, index) in items\"\n                    :key=\"index\"\n                    v-bind=\"Object.assign({}, customStyles, item)\"></fm-tabbar-item>\n    <slot />\n  </fm-footer>\n</template>\n\n<style scoped>\n  .tabbar-item {\n    flex: 1;\n  }\n</style>\n\n<script>\nimport FmFooter from '../fm-footer';\nimport FmTabbarItem from '../fm-tabbar-item';\nexport default {\n  name: 'FmTabbar',\n  components: { FmFooter, FmTabbarItem },\n  props: {\n    activeIndex: {\n      type: Number,\n      default: -1\n    },\n    autoActive: {\n      type: Boolean,\n      default: true\n    },\n    items: {\n      type: Array,\n      default: () => ([])\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    customStyles: {\n      type: Object,\n      default: () => ({})\n    }\n  },\n  data: () => ({\n    renderItems: []\n  }),\n  watch: {\n    renderItems () {\n      this.setActiveItem();\n    },\n    activeIndex (newVal, oldVal) {\n      if (newVal === oldVal) { return; }\n      this.setActiveItem(newVal);\n    }\n  },\n  methods: {\n    setActiveItem (idx = this.activeIndex) {\n      this.renderItems.forEach((item, index) => {\n        item.active = index === idx;\n      });\n    },\n    onChange (index) {\n      this.autoActive && this.setActiveItem(index);\n      this.$emit('fmTabbarSelected', { index });\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmFooter = __webpack_require__(41);

var _fmFooter2 = _interopRequireDefault(_fmFooter);

var _fmTabbarItem = __webpack_require__(71);

var _fmTabbarItem2 = _interopRequireDefault(_fmTabbarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmTabbar',
  components: { FmFooter: _fmFooter2.default, FmTabbarItem: _fmTabbarItem2.default },
  props: {
    activeIndex: {
      type: Number,
      default: -1
    },
    autoActive: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      renderItems: []
    };
  },
  watch: {
    renderItems: function renderItems() {
      this.setActiveItem();
    },
    activeIndex: function activeIndex(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this.setActiveItem(newVal);
    }
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.activeIndex;

      this.renderItems.forEach(function (item, index) {
        item.active = index === idx;
      });
    },
    onChange: function onChange(index) {
      this.autoActive && this.setActiveItem(index);
      this.$emit('fmTabbarSelected', { index: index });
    }
  }
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(118),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-32d8605a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tabbar-item/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32d8605a", Component.options)
  } else {
    hotAPI.reload("data-v-32d8605a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(114);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7f311a1c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32d8605a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-32d8605a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-tabbar-item[data-v-32d8605a] {\n  height: 1.33333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.fm-tabbar-item[data-v-32d8605a]:active {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.icon-wrap[data-v-32d8605a] {\n  padding-top: 0.07407rem;\n  padding-left: 0.27778rem;\n  padding-right: 0.27778rem;\n  margin-top: -0.07407rem;\n}\n.item-icon[data-v-32d8605a] {\n  margin-bottom: 0.05556rem;\n  font-size: 0.66667rem;\n  height: 0.66667rem;\n  font-family: flymeicon;\n}\n.item-icon--img[data-v-32d8605a] {\n  margin-bottom: 0.05556rem;\n  height: 0.66667rem;\n  width: 0.66667rem;\n}\n.item-title[data-v-32d8605a] {\n  font-size: 0.27778rem;\n  line-height: 0.33333rem;\n}\n.dot[data-v-32d8605a] {\n  position: absolute;\n  top: 0.07407rem;\n  right: 0.27778rem;\n  width: 0.16667rem;\n  height: 0.16667rem;\n  border-radius: 0.08333rem;\n  background-color: #EF2828;\n  box-shadow: 0 0 0 0.02778rem #FFFFFF;\n}\n.badge[data-v-32d8605a] {\n  position: absolute;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  top: 0;\n  left: 0.63889rem;\n  border-width: 0.02778rem;\n  border-color: #FFFFFF;\n  border-radius: 0.22222rem;\n}\n.badge-msg[data-v-32d8605a] {\n  line-height: 0.33333rem;\n  padding: 0 0.05556rem;\n  font-size: 0.22222rem;\n  color: #FFFFFF;\n  background-color: #EF2828;\n  border-radius: 0.22222rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tabbar-item/index.vue?4aff2ea5"],"names":[],"mappings":";AA2BA;EACA,mBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,sCAAA;CACA;AAEA;EACA,wBAAA;EACA,yBAAA;EACA,0BAAA;EACA,wBAAA;CACA;AAEA;EACA,0BAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;CACA;AAEA;EACA,0BAAA;EACA,mBAAA;EACA,kBAAA;CACA;AAEA;EACA,sBAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,0BAAA;EACA,qCAAA;CACA;AAEA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,OAAA;EACA,iBAAA;EACA,yBAAA;EACA,sBAAA;EACA,0BAAA;CACA;AAEA;EACA,wBAAA;EACA,sBAAA;EACA,sBAAA;EACA,eAAA;EACA,0BAAA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/03/12. -->\n<template>\n  <div class=\"fm-tabbar-item\" @click=\"onClick\">\n    <div class=\"icon-wrap\">\n      <slot name=\"icon\" :active=\"active\">\n        <text\n          class=\"item-icon\"\n          v-if=\"!normalIcon || !activeIcon\"\n          :style=\"{ color: !active ? iconColor : (activeIconColor || activeColor)}\">{{ getIcon }}</text>\n        <image\n          v-else\n          class=\"item-icon--img\"\n          :src=\"active ? normalIcon : activeIcon\" />\n      </slot>\n      <div class=\"dot\" v-if=\"dot\"></div>\n      <div class=\"badge\" v-if=\"!dot && badge\">\n        <text class=\"badge-msg\">{{ badge }}</text>\n      </div>\n    </div>\n    <slot name=\"title\" :active=\"active\">\n      <text class=\"item-title\" :style=\"{ color: !active ? titleColor : activeColor }\"><slot></slot><template v-if=\"!$slots.default\">{{ title }}</template></text>\n    </slot>\n  </div>\n</template>\n\n<style scoped>\n  .fm-tabbar-item {\n    height: 144px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .fm-tabbar-item:active {\n    background-color: rgba(0, 0, 0, 0.04);\n  }\n\n  .icon-wrap {\n    padding-top: 8px;\n    padding-left: 30px;\n    padding-right: 30px;\n    margin-top: -8px;\n  }\n\n  .item-icon {\n    margin-bottom: 6px;\n    font-size: 72px;\n    height: 72px;\n    font-family: flymeicon;\n  }\n\n  .item-icon--img {\n    margin-bottom: 6px;\n    height: 72px;\n    width: 72px;\n  }\n\n  .item-title {\n    font-size: 30px;\n    line-height: 36px;\n  }\n\n  .dot {\n    position: absolute;\n    top: 8px;\n    right: 30px;\n    width: 18px;\n    height: 18px;\n    border-radius: 9px;\n    background-color: #EF2828;\n    box-shadow: 0 0 0 3px #FFFFFF;\n  }\n\n  .badge {\n    position: absolute;\n    justify-content: center;\n    top: 0;\n    left: 69px;\n    border-width: 3px;\n    border-color: #FFFFFF;\n    border-radius: 24px;\n  }\n\n  .badge-msg {\n    line-height: 36px;\n    padding: 0 6px;\n    font-size: 24px;\n    color: #FFFFFF;\n    background-color: #EF2828;\n    border-radius: 24px;\n  }\n</style>\n\n<script>\nconst he = require('he');\nconst dom = weex.requireModule('dom');\nimport Icon from '../fm-icon/map';\nimport FmIcon from '../fm-icon';\nexport default {\n  name: 'FmTabbarItem',\n  components: { FmIcon },\n  props: {\n    title: {\n      type: String,\n      default: ''\n    },\n    titleColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.75)'\n    },\n    activeColor: {\n      type: String,\n      default: '#198DED'\n    },\n    icon: {\n      type: String,\n      default: ''\n    },\n    iconColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.6)'\n    },\n    activeIconColor: {\n      type: String,\n      default: ''\n    },\n    normalIcon: {\n      type: String,\n      default: ''\n    },\n    activeIcon: {\n      type: String,\n      default: ''\n    },\n    badge: {\n      type: [Number, String],\n      default: ''\n    },\n    dot: Boolean\n  },\n  computed: {\n    getIcon () {\n      const { Icon, icon } = this;\n      return he.decode(Icon[icon] || Icon['wancheng']);\n    }\n  },\n  data: () => ({\n    active: false,\n    Icon\n  }),\n  beforeCreate () {\n    dom.addRule('fontFace', {\n      'fontFamily': 'flymeicon',\n      'src': \"url('http://design.flyme.cn/weexui/assets/iconfont.ttf')\"\n    });\n\n    let parent = this.$parent;\n    while (parent) {\n      if (parent.$options.name !== 'FmTabbar') {\n        parent = parent.$parent;\n      } else {\n        this._parent = parent;\n        break;\n      }\n    }\n    this._parent.renderItems.push(this);\n  },\n  created () {\n    this.$slots.default && (this.title = this.$slots.default[0].text);\n  },\n  destroyed () {\n    this._parent.renderItems.splice(this._parent.items.indexOf(this), 1);\n  },\n  methods: {\n    onClick (e) {\n      this._parent.onChange(this._parent.renderItems.indexOf(this));\n      this.$emit('select', this.index);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(21);

var _map2 = _interopRequireDefault(_map);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var he = __webpack_require__(116);
var dom = weex.requireModule('dom');
exports.default = {
  name: 'FmTabbarItem',
  components: { FmIcon: _fmIcon2.default },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.75)'
    },
    activeColor: {
      type: String,
      default: '#198DED'
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    activeIconColor: {
      type: String,
      default: ''
    },
    normalIcon: {
      type: String,
      default: ''
    },
    activeIcon: {
      type: String,
      default: ''
    },
    badge: {
      type: [Number, String],
      default: ''
    },
    dot: Boolean
  },
  computed: {
    getIcon: function getIcon() {
      var Icon = this.Icon,
          icon = this.icon;

      return he.decode(Icon[icon] || Icon['wancheng']);
    }
  },
  data: function data() {
    return {
      active: false,
      Icon: _map2.default
    };
  },
  beforeCreate: function beforeCreate() {
    dom.addRule('fontFace', {
      'fontFamily': 'flymeicon',
      'src': "url('http://design.flyme.cn/weexui/assets/iconfont.ttf')"
    });

    var parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== 'FmTabbar') {
        parent = parent.$parent;
      } else {
        this._parent = parent;
        break;
      }
    }
    this._parent.renderItems.push(this);
  },
  created: function created() {
    this.$slots.default && (this.title = this.$slots.default[0].text);
  },
  destroyed: function destroyed() {
    this._parent.renderItems.splice(this._parent.items.indexOf(this), 1);
  },

  methods: {
    onClick: function onClick(e) {
      this._parent.onChange(this._parent.renderItems.indexOf(this));
      this.$emit('select', this.index);
    }
  }
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.1.1 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof {} == 'object' && {};
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`.
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			// If we’re still here, it’s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				// Note: there is no need to check `has(decodeMapLegacy, reference)`.
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.1.1',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117)(module)))

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-tabbar-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.onClick
    }
  }, [_c('div', {
    staticClass: "icon-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("icon", [(!_vm.normalIcon || !_vm.activeIcon) ? _c('text', {
    staticClass: "item-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: !_vm.active ? _vm.iconColor : (_vm.activeIconColor || _vm.activeColor)
    }))
  }, [_vm._v(_vm._s(_vm.getIcon))]) : _c('image', {
    staticClass: "item-icon--img",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.active ? _vm.normalIcon : _vm.activeIcon
    }
  })], {
    active: _vm.active
  }), _vm._v(" "), (_vm.dot) ? _c('div', {
    staticClass: "dot",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }) : _vm._e(), _vm._v(" "), (!_vm.dot && _vm.badge) ? _c('div', {
    staticClass: "badge",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', {
    staticClass: "badge-msg",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.badge))])]) : _vm._e()], 2), _vm._v(" "), _vm._t("title", [_c('text', {
    staticClass: "item-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: !_vm.active ? _vm.titleColor : _vm.activeColor
    }))
  }, [_vm._t("default"), (!_vm.$slots.default) ? [_vm._v(_vm._s(_vm.title))] : _vm._e()], 2)], {
    active: _vm.active
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-32d8605a", module.exports)
  }
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fm-footer', {
    staticClass: "fm-tabbar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "background-color": _vm.backgroundColor,
      "padding-size": "middle"
    }
  }, [_vm._l((_vm.items), function(item, index) {
    return (!_vm.$slots.default) ? _c('fm-tabbar-item', _vm._b({
      key: index,
      staticClass: "tabbar-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, 'fm-tabbar-item', Object.assign({}, _vm.customStyles, item), false)) : _vm._e()
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1595dfba", module.exports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(170);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(188);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(123);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(124)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(127),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-058cc90e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-switch/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-058cc90e", Component.options)
  } else {
    hotAPI.reload("data-v-058cc90e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(125);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2b036f1c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-058cc90e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-058cc90e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-switch[data-v-058cc90e] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  width: 1.33333rem;\n  height: 0.66667rem;\n  border-radius: 0.66667rem;\n  border-width: 0.0463rem;\n}\n.ctr-ball[data-v-058cc90e] {\n  width: 0.38889rem;\n  height: 0.38889rem;\n  border-radius: 0.19444rem;\n  margin-left: 0.09259rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-switch/index.vue?15c42035"],"names":[],"mappings":";AAWA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,wBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and updated by Yanjiie on 2018/4/12. -->\n<template>\n  <div class=\"fm-switch\" @click=\"changeState\" :style=\"getBgStyle\">\n    <div class=\"ctr-ball\"\n         :style=\"ballStyle\"\n         ref=\"ctrBall\"></div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-switch {\n    flex-direction: row;\n    align-items: center;\n    width: 144px;\n    height: 72px;\n    border-radius: 72px;\n    border-width: 5px;\n  }\n\n  .ctr-ball {\n    width: 42px;\n    height: 42px;\n    border-radius: 21px;\n    margin-left: 10px;\n  }\n</style>\n\n<script>\nimport STYLE from 'weex-flymeui/lib/theme/default/index.js';\nconst animation = weex.requireModule('animation');\n\nexport default {\n  name: 'FmSwitch',\n  props: {\n    checked: {\n      type: Boolean,\n      default: false\n    },\n    solid: Boolean,\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n    blurColor: String,\n    focusColor: String,\n    borderColor: {\n      type: String,\n      default: '#D9D9D9'\n    },\n    backgroundColor: {\n      type: String,\n      default: STYLE.primaryColor\n    }\n  },\n  data () {\n    return {\n      isAnimate: false,\n      _checked: false,\n      ballStyle: {}\n    };\n  },\n  computed: {\n    getBgStyle () {\n      const { solid, borderColor, backgroundColor, disabled } = this;\n      const style =\n          !solid\n            ? {\n              borderWidth: '5px',\n              borderColor: borderColor,\n              backgroundColor: 'transparent'\n            }\n            : {\n              borderWidth: '5px',\n              borderColor: backgroundColor,\n              backgroundColor: backgroundColor\n            };\n      if (disabled) {\n        style.opacity = 0.3;\n      } else {\n        style.opacity = 1;\n      }\n      return style;\n    }\n  },\n  watch: {\n    checked (bool) {\n      this._checked = bool;\n      this.toggleState(bool);\n    }\n  },\n  methods: {\n    changeState (e) {\n      if (this.disabled) return;\n      this._checked = !this._checked;\n      this.toggleState(this._checked);\n      this.$emit('fmSwitchStateChange', this._checked);\n    },\n    toggleState (bool, animated = true) {\n      const style = bool\n        ? {\n          backgroundColor: this.focusColor || (this.solid ? '#FFFFFF' : this.backgroundColor),\n          transform: 'scale(1) translate(72px, 0)',\n          transformOrigin: 'center center'\n        }\n        : {\n          backgroundColor: this.blurColor || (this.solid ? '#FFFFFF' : this.borderColor),\n          transform: 'scale(0.429)',\n          transformOrigin: 'center center'\n        };\n      const ctrBall = this.$refs.ctrBall;\n      if (!ctrBall) {\n        return;\n      }\n      animation.transition(\n        ctrBall,\n        {\n          styles: style,\n          timingFunction: 'ease',\n          duration: animated ? 260 : 0.00001\n        }\n      );\n    }\n  },\n  created () {\n    this.checked\n      ? (this.ballStyle = {\n        backgroundColor: this.focusColor || (this.solid ? '#FFFFFF' : this.backgroundColor),\n        transform: 'scale(1.0) translate(72px, 0)'\n      })\n      : (this.ballStyle = {\n        backgroundColor: this.blurColor || (this.solid ? '#FFFFFF' : this.borderColor),\n        transform: 'scale(0.429)'\n      });\n\n    this._checked = this.checked;\n    this.toggleState(this._checked, false);\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmSwitch',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    solid: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    blurColor: String,
    focusColor: String,
    borderColor: {
      type: String,
      default: '#D9D9D9'
    },
    backgroundColor: {
      type: String,
      default: _index2.default.primaryColor
    }
  },
  data: function data() {
    return {
      isAnimate: false,
      _checked: false,
      ballStyle: {}
    };
  },

  computed: {
    getBgStyle: function getBgStyle() {
      var solid = this.solid,
          borderColor = this.borderColor,
          backgroundColor = this.backgroundColor,
          disabled = this.disabled;

      var style = !solid ? {
        borderWidth: '5px',
        borderColor: borderColor,
        backgroundColor: 'transparent'
      } : {
        borderWidth: '5px',
        borderColor: backgroundColor,
        backgroundColor: backgroundColor
      };
      if (disabled) {
        style.opacity = 0.3;
      } else {
        style.opacity = 1;
      }
      return style;
    }
  },
  watch: {
    checked: function checked(bool) {
      this._checked = bool;
      this.toggleState(bool);
    }
  },
  methods: {
    changeState: function changeState(e) {
      if (this.disabled) return;
      this._checked = !this._checked;
      this.toggleState(this._checked);
      this.$emit('fmSwitchStateChange', this._checked);
    },
    toggleState: function toggleState(bool) {
      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var style = bool ? {
        backgroundColor: this.focusColor || (this.solid ? '#FFFFFF' : this.backgroundColor),
        transform: 'scale(1) translate(72px, 0)',
        transformOrigin: 'center center'
      } : {
        backgroundColor: this.blurColor || (this.solid ? '#FFFFFF' : this.borderColor),
        transform: 'scale(0.429)',
        transformOrigin: 'center center'
      };
      var ctrBall = this.$refs.ctrBall;
      if (!ctrBall) {
        return;
      }
      animation.transition(ctrBall, {
        styles: style,
        timingFunction: 'ease',
        duration: animated ? 260 : 0.00001
      });
    }
  },
  created: function created() {
    this.checked ? this.ballStyle = {
      backgroundColor: this.focusColor || (this.solid ? '#FFFFFF' : this.backgroundColor),
      transform: 'scale(1.0) translate(72px, 0)'
    } : this.ballStyle = {
      backgroundColor: this.blurColor || (this.solid ? '#FFFFFF' : this.borderColor),
      transform: 'scale(0.429)'
    };

    this._checked = this.checked;
    this.toggleState(this._checked, false);
  }
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-switch",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.getBgStyle)),
    on: {
      "click": _vm.changeState
    }
  }, [_c('div', {
    ref: "ctrBall",
    staticClass: "ctr-ball",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.ballStyle))
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-058cc90e", module.exports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(129);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(130)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(132),
  /* template */
  __webpack_require__(136),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1a0456a2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tag-wall/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a0456a2", Component.options)
  } else {
    hotAPI.reload("data-v-1a0456a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f4bd35b4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a0456a2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a0456a2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wall-wrap[data-v-1a0456a2] {\n  width: 10rem;\n}\n.title-wrap[data-v-1a0456a2] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  padding: 0.25rem 0.4537rem;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.title-text[data-v-1a0456a2] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.33333rem;\n  line-height: 0.5rem;\n}\n.title-rightBtn[data-v-1a0456a2] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.33333rem;\n  line-height: 0.5rem;\n}\n.tags-wrap[data-v-1a0456a2] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  padding: 0 0.22222rem 0 0.44444rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tag-wall/index.vue?a5cbf1d0"],"names":[],"mappings":";AAuBA;EACA,aAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,2BAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,oBAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,oBAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,wBAAA;UAAA,gBAAA;EACA,mCAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/3/2. -->\n<template>\n  <div class=\"wall-wrap\">\n    <div class=\"title-wrap\">\n      <slot name=\"left\">\n        <text class=\"title-text\" :style=\"{ color: titleColor }\">{{ title }}</text>\n      </slot>\n      <slot name=\"right\">\n        <text class=\"title-rightBtn\" :style=\"{ color: rightColor }\" @click=\"btnClicked\">{{ rightText }}</text>\n      </slot>\n    </div>\n    <div class=\"tags-wrap\">\n      <item v-for=\"(item, index) in list\"\n            v-bind=\"Object.assign({}, customStyles, item)\"\n            :key=\"index\"\n            :index=\"index\"\n            @select=\"onSelect(index)\" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wall-wrap {\n    width: 1080px;\n  }\n\n  .title-wrap {\n    flex-direction: row;\n    padding: 27px 49px;\n    justify-content: space-between;\n  }\n\n  .title-text {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 36px;\n    line-height: 54px;\n  }\n\n  .title-rightBtn {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 36px;\n    line-height: 54px;\n  }\n\n  .tags-wrap {\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 0 24px 0 48px;\n  }\n</style>\n\n<script>\nimport Item from './item.vue';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\n\nexport default {\n  name: 'FmTagWall',\n  mixins: [Locale],\n  components: { Item },\n  props: {\n    list: {\n      type: Array,\n      default: () => ([])\n    },\n    title: {\n      type: String,\n      default () {\n        return t('el.common.title');\n      }\n    },\n    titleColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    rightText: {\n      type: String,\n      default: ''\n    },\n    rightColor: {\n      type: String,\n      default: '#198DED'\n    },\n    customStyles: {\n      type: Object,\n      default: () => ({})\n    }\n  },\n  methods: {\n    onSelect (index) {\n      this.$emit('fmTagWallSelected', { title: this.list[index].title, index });\n    },\n    btnClicked () {\n      this.$emit('fmTagWallRightBtnClicked');\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(133);

var _item2 = _interopRequireDefault(_item);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmTagWall',
  mixins: [_locale2.default],
  components: { Item: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    title: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.title');
      }
    },
    titleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    rightText: {
      type: String,
      default: ''
    },
    rightColor: {
      type: String,
      default: '#198DED'
    },
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    onSelect: function onSelect(index) {
      this.$emit('fmTagWallSelected', { title: this.list[index].title, index: index });
    },
    btnClicked: function btnClicked() {
      this.$emit('fmTagWallRightBtnClicked');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(135),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tag-wall/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ead85e1a", Component.options)
  } else {
    hotAPI.reload("data-v-ead85e1a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    index: {
      type: Number,
      default: -1
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 72
    },
    padding: {
      type: Number,
      default: 30
    },
    borderRadius: {
      type: Number,
      default: 6
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 42
    },
    originBorderColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.08)'
    },
    originTitleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    originBackgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    color: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    lineSpacing: {
      type: Number,
      default: 24
    },
    itemSpacing: {
      type: Number,
      default: 24
    }
  },
  computed: {
    wrapStyle: function wrapStyle() {
      var borderRadius = this.borderRadius,
          height = this.height,
          padding = this.padding,
          borderWidth = this.borderWidth,
          originBorderColor = this.originBorderColor,
          originBackgroundColor = this.originBackgroundColor,
          backgroundColor = this.backgroundColor,
          borderColor = this.borderColor,
          color = this.color,
          itemSpacing = this.itemSpacing,
          lineSpacing = this.lineSpacing;

      return {
        justifyContent: 'center',
        borderRadius: borderRadius + 'px',
        height: height + 'px',
        paddingLeft: padding + 'px',
        paddingRight: padding + 'px',
        borderWidth: borderWidth + 'px',
        backgroundColor: backgroundColor || originBackgroundColor,
        borderColor: borderColor || color || originBorderColor,
        marginRight: itemSpacing + 'px',
        marginBottom: lineSpacing + 'px'
      };
    },
    titleStyle: function titleStyle() {
      var fontSize = this.fontSize,
          color = this.color,
          originTitleColor = this.originTitleColor;

      return {
        fontSize: fontSize + 'px',
        color: color || originTitleColor
      };
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('select', this.index);
    }
  }
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wall-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle)),
    on: {
      "click": _vm.onClick
    }
  }, [_c('text', {
    staticClass: "text-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.titleStyle))
  }, [_vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ead85e1a", module.exports)
  }
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wall-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "title-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("left", [_c('text', {
    staticClass: "title-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm._t("right", [_c('text', {
    staticClass: "title-rightBtn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.rightColor
    })),
    on: {
      "click": _vm.btnClicked
    }
  }, [_vm._v(_vm._s(_vm.rightText))])])], 2), _vm._v(" "), _c('div', {
    staticClass: "tags-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.list), function(item, index) {
    return _c('item', _vm._b({
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "index": index
      },
      on: {
        "select": function($event) {
          _vm.onSelect(index)
        }
      }
    }, 'item', Object.assign({}, _vm.customStyles, item), false))
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1a0456a2", module.exports)
  }
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(138);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(139)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(141),
  /* template */
  __webpack_require__(142),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-11fe3cac",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-slider-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11fe3cac", Component.options)
  } else {
    hotAPI.reload("data-v-11fe3cac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5b68764a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11fe3cac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11fe3cac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-11fe3cac] {\n  height: 0.42593rem;\n}\n.container-indicator[data-v-11fe3cac] {\n  height: 1.33333rem;\n  padding: 0 0.14815rem;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n          justify-content: flex-end;\n}\n.container-haslevels[data-v-11fe3cac] {\n  height: 1.33333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n          justify-content: flex-end;\n}\n.slider-bar[data-v-11fe3cac] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.slider-bar-wrap[data-v-11fe3cac] {\n  height: 0.42593rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  overflow: hidden;\n}\n.range-bar[data-v-11fe3cac] {\n  background-color: rgba(0, 0, 0, 0.1);\n  height: 0.05556rem;\n  overflow: hidden;\n}\n.value-bar[data-v-11fe3cac] {\n  height: 0.05556rem;\n  position: absolute;\n  left: 0;\n  top: 0;\n  /* overflow: hidden; */\n}\n.slide-circle[data-v-11fe3cac] {\n  width: 0.42593rem;\n  height: 0.42593rem;\n  border-radius: 0.21296rem;\n  position: absolute;\n  left: 0px;\n  bottom: 0;\n}\n.indicator[data-v-11fe3cac] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  width: 0.72222rem;\n  height: 0.72222rem;\n  position: absolute;\n  border-radius: 0.36111rem;\n  left: 0px;\n  top: 0.92593rem;\n  opacity: 0;\n  -webkit-transition-property: top, opacity;\n  transition-property: top, opacity;\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: ease-out;\n          transition-timing-function: ease-out;\n}\n.indicator-text[data-v-11fe3cac] {\n  font-weight: 700;\n  font-size: 0.38889rem;\n  color: #FFFFFF;\n}\n.levels-wrap[data-v-11fe3cac] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  margin-bottom: 0.13889rem;\n}\n.level-item[data-v-11fe3cac] {\n  width: 0.66667rem;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 0.33333rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-slider-bar/index.vue?0e017c06"],"names":[],"mappings":";AA2XA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,sBAAA;EACA,sBAAA;EAAA,kCAAA;UAAA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sBAAA;EAAA,kCAAA;UAAA,0BAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,iBAAA;CACA;AAEA;EACA,qCAAA;EACA,mBAAA;EACA,iBAAA;CACA;AAEA;EACA,mBAAA;EACA,mBAAA;EACA,QAAA;EACA,OAAA;EACA,uBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,mBAAA;EACA,UAAA;EACA,UAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,0BAAA;EACA,UAAA;EACA,gBAAA;EACA,WAAA;EACA,0CAAA;EAAA,kCAAA;EACA,kCAAA;UAAA,0BAAA;EACA,6CAAA;UAAA,qCAAA;CACA;AAEA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,sBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. Just a beta version! -->\n<template>\n  <div\n    class=\"container\"\n    :class=\"[`container-${(indicator && 'indicator') || (levels.length > 0 && 'haslevels')}`]\"\n    :style=\"containerStyle\">\n    <div\n      v-if=\"indicator\"\n      class=\"indicator\"\n      ref=\"indicator\"\n      :style=\"indicatorStyle\">\n      <text class=\"indicator-text\">{{ inValue }}</text>\n    </div>\n    <div\n      v-else-if=\"levels.length > 0\"\n      class=\"levels-wrap\"\n      :style=\"{ width: length + 64 }\">\n      <text\n        class=\"level-item\"\n        v-for=\"(item, idx) in levels\"\n        :style=\"{ color: inLevel === idx ? '#000000' : 'rgba(0, 0, 0, 0.4)' }\"\n        :key=\"idx\">{{ item.text }}</text>\n    </div>\n    <div\n      ref=\"bar-wrap\"\n      class=\"slider-bar-wrap\"\n      :style=\"barWrapStyle\">\n      <div\n        class=\"range-bar\"\n        :style=\"rangeBarStyle\">\n        <div\n          ref=\"value-bar\"\n          class=\"value-bar\"\n          :style=\"valueBarStyle\">\n          <div></div>\n        </div>\n      </div>\n      <div\n        ref=\"slide-circle\"\n        class=\"slide-circle\"\n        :style=\"circleStyle\"\n        @touchstart=\"onPanstart\"\n        @touchmove=\"onPanmove\"\n        @touchend=\"onPanEnd\"\n        @horizontalpan=\"startHandle\"\n        :prevent-move-event=\"true\">\n        <div></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport Binding from 'weex-bindingx/lib/index.weex.js';\nimport STYLE from 'weex-flymeui/lib/theme/default/index.js';\nimport Utils from '../utils';\nimport BindEnv from '../utils/bind-env';\n\nconst animation = weex.requireModule('animation');\nconst dom = weex.requireModule('dom');\n\nexport default {\n  name: 'FmSliderBar',\n  props: {\n    length: {\n      type: Number,\n      default: 800\n    },\n    height: {\n      type: Number,\n      default: 6\n    },\n    // 最小值\n    min: {\n      type: Number,\n      default: 0\n    },\n    // 最大值\n    max: {\n      type: Number,\n      default: 100\n    },\n    indicator: {\n      type: Boolean,\n      default: false\n    },\n    levels: {\n      type: Array,\n      default: () => ([])\n    },\n    defaultValue: {\n      type: Number,\n      default: 0\n    },\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n    invalidColor: {\n      type: String,\n      default: '#E0E0E0'\n    },\n    validColor: {\n      type: String,\n      default: STYLE.primaryColor\n    },\n    disabledColor: {\n      type: String,\n      default: STYLE.disabledColor\n    }\n  },\n  data: () => ({\n    env: 'weex',\n    gesToken: 0,\n    scaleValue: 0,\n    circleLeft: 0,\n    indicatorShow: false,\n    inValue: 0,\n    isAndroid: Utils.env.isAndroid(),\n    timeout: 100,\n    inLevel: 0,\n    lock: false,\n    loaded: false\n  }),\n  computed: {\n    barWrapStyle () {\n      return {\n        width: `${this.length + 46}px`,\n        height: '46px'\n      };\n    },\n    rangeBarStyle () {\n      return {\n        width: `${this.length}px`,\n        height: `${this.height}px`,\n        flexDirection: 'row'\n      };\n    },\n    valueBarStyle () {\n      return {\n        width: this.length + 'px',\n        height: this.height + 'px',\n        transform: `translateX(${this.circleLeft - this.length}px)`,\n        backgroundColor: this.disabled ? this.disabledColor : this.validColor\n      };\n    },\n    containerStyle () {\n      const { indicator, levels, length, loaded } = this;\n      const baseWidth = length + 46;\n      const styles = {\n        width: (indicator && baseWidth + 32) || (levels.length > 0 && baseWidth + 32) || baseWidth,\n        justifyContent: (indicator || levels.length > 0) ? 'flex-end' : 'center',\n        opacity: loaded ? 1 : 0\n      };\n      return styles;\n    },\n    circleStyle () {\n      return {\n        backgroundColor: this.disabled ? this.disabledColor : this.validColor,\n        transform: `translateX(${this.circleLeft}px)`\n      };\n    },\n    indicatorStyle () {\n      const defaultStyle = {\n        backgroundColor: this.validColor,\n        transform: `translateX(${this.circleLeft}px)`\n      };\n      return this.indicatorShow ? {\n        opacity: 1,\n        top: 0,\n        ...defaultStyle\n      } : {\n        opacity: 0,\n        top: '100px',\n        ...defaultStyle\n      };\n    }\n  },\n  methods: {\n    onWrapPanstart (e) {\n      if (this.lock || this.env === 'web') { return; }\n      this.circleLeft = this._restrictValue(e.changedTouches[0].pageX);\n      animation.transition(this.circleEl, {\n        styles: {\n          transform: `translateX(${this.circleLeft}px)`\n        },\n        duration: 0.0001\n      });\n      this.indicatorEl && animation.transition(this.indicatorEl, {\n        styles: {\n          transform: `translateX(${this.circleLeft}px)`\n        },\n        duration: 0.0001\n      });\n    },\n    onPanstart (e) {\n      if (this.lock || this.disabled) { return; }\n      this.lock = true;\n\n      if (this.env === 'web') {\n        this.indicatorShow = true;\n        this.startX = e.changedTouches[0].pageX;\n        this.startLeft = this.circleLeft;\n        return;\n      } else if (!this.isAndroid) {\n        return;\n      }\n\n      // 由于 android 端不支持 horizontalpan 的move事件，使用setInterval hack方案\n      this.interval = setInterval(() => {\n        this.indicatorShow = true;\n        dom.getComponentRect(this.circleEl, option => {\n          const { left } = option.size;\n          this.inValue = this._getValue(left - this.leftDiffX);\n          this.$emit('updateValue', this.inValue);\n        });\n      }, this.timeout);\n    },\n    onPanmove (e) {\n      if (this.env === 'weex' || this.disabled) {\n        return;\n      }\n\n      const deltaX = (e.changedTouches[0].pageX - this.startX) * this.DPR;\n      const diffX = Math.min(this.length, Math.max(this.startLeft + deltaX, 0));\n      const diff = Math.floor(diffX / this.scaleValue) * this.scaleValue;\n      const max = this.length;\n\n      if (diff >= 0 && diff <= max) {\n        this.circleLeft = diff;\n        animation.transition(this.circleEl, {\n          styles: {\n            transform: `translateX(${this.circleLeft}px)`\n          }\n        }, () => {});\n        this.indicatorEl && animation.transition(this.indicatorEl, {\n          styles: {\n            transform: `translateX(${this.circleLeft}px)`\n          }\n        }, () => {});\n        this.inValue = this._getValue(this.circleLeft);\n        this.$emit('updateValue', this.inValue);\n      }\n    },\n    onPanEnd (e) {\n      setTimeout(() => { this.indicatorShow = false; }, 40);\n      this.lock = false;\n      if (!this.isAndroid) {\n        return;\n      }\n      this.interval && clearInterval(this.interval);\n    },\n    startHandle (e) {\n      this.bindExp();\n    },\n    bindExp () {\n      if (this.gesToken || this.disabled) {\n        Binding.unbind({\n          eventType: 'pan',\n          token: this.gesToken\n        });\n        this.gesToken = 0;\n        return;\n      }\n\n      const { circleEl, indicatorEl, valueBarEl, circleLeft, length, scaleValue } = this;\n\n      const props = [{\n        element: circleEl.ref,\n        property: 'transform.translateX',\n        expression: `min(${this.length}, floor(max(x + ${this.circleLeft}, 0) / ${scaleValue}) * ${scaleValue})`\n      }, {\n        element: valueBarEl.ref,\n        property: 'transform.translateX',\n        expression: `min(0, x + floor(${circleLeft - length} / ${scaleValue}) * ${scaleValue})`\n      }];\n\n      if (indicatorEl) {\n        props.push({\n          element: indicatorEl.ref,\n          property: 'transform.translateX',\n          expression: `min(${this.length}, floor(max(x + ${this.circleLeft}, 0) / ${scaleValue}) * ${scaleValue})`\n        });\n      }\n\n      const gesTokenObj = Binding.bind({\n        anchor: circleEl.ref,\n        eventType: 'pan',\n        props\n      }, (e) => {\n        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {\n          this.lock = false;\n          // 限制 circleLeft 范围\n          this.circleLeft = this._restrictValue(Math.max(0, Math.floor((this.circleLeft + e.deltaX) / this.scaleValue) * this.scaleValue));\n          setTimeout(() => { this.indicatorShow = false; }, 40);\n        }\n      });\n\n      this.gesToken = gesTokenObj.token;\n    },\n    _restrictValue (value) {\n      const range = this.length;\n      if (value >= range) {\n        return range;\n      } else {\n        return value;\n      }\n    },\n    // 根据x方向偏移量计算value\n    _getValue (diffX) {\n      return Math.round((diffX / this.length) * (this.max - this.min) + this.min);\n    },\n    // 根据 value 和 length 计算 x 方向偏移值\n    _getLeftDiff (value) {\n      return ((value - this.min) / (this.max - this.min)) * this.length;\n    }\n  },\n  created () {\n    if (Utils.env.isWeb()) {\n      this.env = 'web';\n      this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;\n    } else {\n      this.DPR = weex.config.env.scale;\n    }\n  },\n  mounted () {\n    this.wrapEl = this.$refs['bar-wrap'];\n    this.circleEl = this.$refs['slide-circle'];\n    this.valueBarEl = this.$refs['value-bar'];\n    this.indicatorEl = this.$refs['indicator'];\n\n    this.circleLeft = this._getLeftDiff(this.inValue || this.defaultValue);\n    this.indicatorEl && animation.transition(this.indicatorEl, {\n      styles: {\n        transform: `translateX(${this.circleLeft}px)`\n      },\n      duration: 0.0001\n    });\n\n    // 是否支持expresstionBinding\n    if (BindEnv.supportsEB() && Binding.prepare) {\n      this.wrapEl && Binding.prepare({\n        anchor: this.wrapEl.ref,\n        eventType: 'pan'\n      });\n      this.circleEl && Binding.prepare({\n        anchor: this.circleEl.ref,\n        eventType: 'pan'\n      });\n      this.valueBarEl && Binding.prepare({\n        anchor: this.valueBarEl.ref,\n        eventType: 'pan'\n      });\n      this.indicatorEl && Binding.prepare({\n        anchor: this.indicatorEl.ref,\n        eventType: 'pan'\n      });\n    }\n\n    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行\n    setTimeout(() => {\n      dom.getComponentRect(this.wrapEl, option => {\n        const { left } = option.size;\n        this.leftDiffX = left;\n      });\n    }, 100);\n\n    // 算出刻度值，手指移动时会以刻度值整数移动\n    this.scaleValue = this.length / (this.max - this.min);\n\n    this.$nextTick(() => {\n      this.loaded = true;\n    });\n  }\n};\n</script>\n\n<style scoped>\n  .container {\n    height: 46px;\n  }\n\n  .container-indicator {\n    height: 144px;\n    padding: 0 16px;\n    justify-content: flex-end;\n  }\n\n  .container-haslevels {\n    height: 144px;\n    align-items: center;\n    justify-content: flex-end;\n  }\n\n  .slider-bar {\n    justify-content: center;\n    align-items: center;\n  }\n\n  .slider-bar-wrap {\n    height: 46px;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n  }\n\n  .range-bar {\n    background-color: rgba(0, 0, 0, 0.1);\n    height: 6px;\n    overflow: hidden;\n  }\n\n  .value-bar {\n    height: 6px;\n    position: absolute;\n    left: 0;\n    top: 0;\n    /* overflow: hidden; */\n  }\n\n  .slide-circle {\n    width: 46px;\n    height: 46px;\n    border-radius: 23px;\n    position: absolute;\n    left: 0px;\n    bottom: 0;\n  }\n\n  .indicator {\n    justify-content: center;\n    align-items: center;\n    width: 78px;\n    height: 78px;\n    position: absolute;\n    border-radius: 39px;\n    left: 0px;\n    top: 100px;\n    opacity: 0;\n    transition-property: top, opacity;\n    transition-duration: 0.2s;\n    transition-timing-function: ease-out;\n  }\n\n  .indicator-text {\n    font-weight: 700;\n    font-size: 42px;\n    color: #FFFFFF;\n  }\n\n  .levels-wrap {\n    flex-direction: row;\n    justify-content: space-between;\n    margin-bottom: 15px;\n  }\n\n  .level-item {\n    width: 72px;\n    text-align: center;\n    color: rgba(0, 0, 0, 0.4);\n    font-size: 36px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var _index2 = _interopRequireDefault(_index);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _indexWeex = __webpack_require__(44);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _utils = __webpack_require__(42);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(51);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation');
var dom = weex.requireModule('dom');

exports.default = {
  name: 'FmSliderBar',
  props: {
    length: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 6
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    indicator: {
      type: Boolean,
      default: false
    },
    levels: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalidColor: {
      type: String,
      default: '#E0E0E0'
    },
    validColor: {
      type: String,
      default: _index2.default.primaryColor
    },
    disabledColor: {
      type: String,
      default: _index2.default.disabledColor
    }
  },
  data: function data() {
    return {
      env: 'weex',
      gesToken: 0,
      scaleValue: 0,
      circleLeft: 0,
      indicatorShow: false,
      inValue: 0,
      isAndroid: _utils2.default.env.isAndroid(),
      timeout: 100,
      inLevel: 0,
      lock: false,
      loaded: false
    };
  },
  computed: {
    barWrapStyle: function barWrapStyle() {
      return {
        width: this.length + 46 + 'px',
        height: '46px'
      };
    },
    rangeBarStyle: function rangeBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        flexDirection: 'row'
      };
    },
    valueBarStyle: function valueBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        transform: 'translateX(' + (this.circleLeft - this.length) + 'px)',
        backgroundColor: this.disabled ? this.disabledColor : this.validColor
      };
    },
    containerStyle: function containerStyle() {
      var indicator = this.indicator,
          levels = this.levels,
          length = this.length,
          loaded = this.loaded;

      var baseWidth = length + 46;
      var styles = {
        width: indicator && baseWidth + 32 || levels.length > 0 && baseWidth + 32 || baseWidth,
        justifyContent: indicator || levels.length > 0 ? 'flex-end' : 'center',
        opacity: loaded ? 1 : 0
      };
      return styles;
    },
    circleStyle: function circleStyle() {
      return {
        backgroundColor: this.disabled ? this.disabledColor : this.validColor,
        transform: 'translateX(' + this.circleLeft + 'px)'
      };
    },
    indicatorStyle: function indicatorStyle() {
      var defaultStyle = {
        backgroundColor: this.validColor,
        transform: 'translateX(' + this.circleLeft + 'px)'
      };
      return this.indicatorShow ? _extends({
        opacity: 1,
        top: 0
      }, defaultStyle) : _extends({
        opacity: 0,
        top: '100px'
      }, defaultStyle);
    }
  },
  methods: {
    onWrapPanstart: function onWrapPanstart(e) {
      if (this.lock || this.env === 'web') {
        return;
      }
      this.circleLeft = this._restrictValue(e.changedTouches[0].pageX);
      animation.transition(this.circleEl, {
        styles: {
          transform: 'translateX(' + this.circleLeft + 'px)'
        },
        duration: 0.0001
      });
      this.indicatorEl && animation.transition(this.indicatorEl, {
        styles: {
          transform: 'translateX(' + this.circleLeft + 'px)'
        },
        duration: 0.0001
      });
    },
    onPanstart: function onPanstart(e) {
      var _this = this;

      if (this.lock || this.disabled) {
        return;
      }
      this.lock = true;

      if (this.env === 'web') {
        this.indicatorShow = true;
        this.startX = e.changedTouches[0].pageX;
        this.startLeft = this.circleLeft;
        return;
      } else if (!this.isAndroid) {
        return;
      }

      // 由于 android 端不支持 horizontalpan 的move事件，使用setInterval hack方案
      this.interval = setInterval(function () {
        _this.indicatorShow = true;
        dom.getComponentRect(_this.circleEl, function (option) {
          var left = option.size.left;

          _this.inValue = _this._getValue(left - _this.leftDiffX);
          _this.$emit('updateValue', _this.inValue);
        });
      }, this.timeout);
    },
    onPanmove: function onPanmove(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.changedTouches[0].pageX - this.startX) * this.DPR;
      var diffX = Math.min(this.length, Math.max(this.startLeft + deltaX, 0));
      var diff = Math.floor(diffX / this.scaleValue) * this.scaleValue;
      var max = this.length;

      if (diff >= 0 && diff <= max) {
        this.circleLeft = diff;
        animation.transition(this.circleEl, {
          styles: {
            transform: 'translateX(' + this.circleLeft + 'px)'
          }
        }, function () {});
        this.indicatorEl && animation.transition(this.indicatorEl, {
          styles: {
            transform: 'translateX(' + this.circleLeft + 'px)'
          }
        }, function () {});
        this.inValue = this._getValue(this.circleLeft);
        this.$emit('updateValue', this.inValue);
      }
    },
    onPanEnd: function onPanEnd(e) {
      var _this2 = this;

      setTimeout(function () {
        _this2.indicatorShow = false;
      }, 40);
      this.lock = false;
      if (!this.isAndroid) {
        return;
      }
      this.interval && clearInterval(this.interval);
    },
    startHandle: function startHandle(e) {
      this.bindExp();
    },
    bindExp: function bindExp() {
      var _this3 = this;

      if (this.gesToken || this.disabled) {
        _indexWeex2.default.unbind({
          eventType: 'pan',
          token: this.gesToken
        });
        this.gesToken = 0;
        return;
      }

      var circleEl = this.circleEl,
          indicatorEl = this.indicatorEl,
          valueBarEl = this.valueBarEl,
          circleLeft = this.circleLeft,
          length = this.length,
          scaleValue = this.scaleValue;


      var props = [{
        element: circleEl.ref,
        property: 'transform.translateX',
        expression: 'min(' + this.length + ', floor(max(x + ' + this.circleLeft + ', 0) / ' + scaleValue + ') * ' + scaleValue + ')'
      }, {
        element: valueBarEl.ref,
        property: 'transform.translateX',
        expression: 'min(0, x + floor(' + (circleLeft - length) + ' / ' + scaleValue + ') * ' + scaleValue + ')'
      }];

      if (indicatorEl) {
        props.push({
          element: indicatorEl.ref,
          property: 'transform.translateX',
          expression: 'min(' + this.length + ', floor(max(x + ' + this.circleLeft + ', 0) / ' + scaleValue + ') * ' + scaleValue + ')'
        });
      }

      var gesTokenObj = _indexWeex2.default.bind({
        anchor: circleEl.ref,
        eventType: 'pan',
        props: props
      }, function (e) {
        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
          _this3.lock = false;
          // 限制 circleLeft 范围
          _this3.circleLeft = _this3._restrictValue(Math.max(0, Math.floor((_this3.circleLeft + e.deltaX) / _this3.scaleValue) * _this3.scaleValue));
          setTimeout(function () {
            _this3.indicatorShow = false;
          }, 40);
        }
      });

      this.gesToken = gesTokenObj.token;
    },
    _restrictValue: function _restrictValue(value) {
      var range = this.length;
      if (value >= range) {
        return range;
      } else {
        return value;
      }
    },

    // 根据x方向偏移量计算value
    _getValue: function _getValue(diffX) {
      return Math.round(diffX / this.length * (this.max - this.min) + this.min);
    },

    // 根据 value 和 length 计算 x 方向偏移值
    _getLeftDiff: function _getLeftDiff(value) {
      return (value - this.min) / (this.max - this.min) * this.length;
    }
  },
  created: function created() {
    if (_utils2.default.env.isWeb()) {
      this.env = 'web';
      this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    } else {
      this.DPR = weex.config.env.scale;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.wrapEl = this.$refs['bar-wrap'];
    this.circleEl = this.$refs['slide-circle'];
    this.valueBarEl = this.$refs['value-bar'];
    this.indicatorEl = this.$refs['indicator'];

    this.circleLeft = this._getLeftDiff(this.inValue || this.defaultValue);
    this.indicatorEl && animation.transition(this.indicatorEl, {
      styles: {
        transform: 'translateX(' + this.circleLeft + 'px)'
      },
      duration: 0.0001
    });

    // 是否支持expresstionBinding
    if (_bindEnv2.default.supportsEB() && _indexWeex2.default.prepare) {
      this.wrapEl && _indexWeex2.default.prepare({
        anchor: this.wrapEl.ref,
        eventType: 'pan'
      });
      this.circleEl && _indexWeex2.default.prepare({
        anchor: this.circleEl.ref,
        eventType: 'pan'
      });
      this.valueBarEl && _indexWeex2.default.prepare({
        anchor: this.valueBarEl.ref,
        eventType: 'pan'
      });
      this.indicatorEl && _indexWeex2.default.prepare({
        anchor: this.indicatorEl.ref,
        eventType: 'pan'
      });
    }

    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
    setTimeout(function () {
      dom.getComponentRect(_this4.wrapEl, function (option) {
        var left = option.size.left;

        _this4.leftDiffX = left;
      });
    }, 100);

    // 算出刻度值，手指移动时会以刻度值整数移动
    this.scaleValue = this.length / (this.max - this.min);

    this.$nextTick(function () {
      _this4.loaded = true;
    });
  }
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    class: [("container-" + ((_vm.indicator && 'indicator') || (_vm.levels.length > 0 && 'haslevels')))],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.containerStyle))
  }, [(_vm.indicator) ? _c('div', {
    ref: "indicator",
    staticClass: "indicator",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.indicatorStyle))
  }, [_c('text', {
    staticClass: "indicator-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.inValue))])]) : (_vm.levels.length > 0) ? _c('div', {
    staticClass: "levels-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.length + 64
    }))
  }, _vm._l((_vm.levels), function(item, idx) {
    return _c('text', {
      key: idx,
      staticClass: "level-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        color: _vm.inLevel === idx ? '#000000' : 'rgba(0, 0, 0, 0.4)'
      }))
    }, [_vm._v(_vm._s(item.text))])
  })) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "bar-wrap",
    staticClass: "slider-bar-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.barWrapStyle))
  }, [_c('div', {
    staticClass: "range-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.rangeBarStyle))
  }, [_c('div', {
    ref: "value-bar",
    staticClass: "value-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.valueBarStyle))
  }, [_c('div')])]), _vm._v(" "), _c('div', {
    ref: "slide-circle",
    staticClass: "slide-circle",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.circleStyle)),
    attrs: {
      "prevent-move-event": true
    },
    on: {
      "touchstart": _vm.onPanstart,
      "touchmove": _vm.onPanmove,
      "touchend": _vm.onPanEnd,
      "horizontalpan": _vm.startHandle
    }
  }, [_c('div')])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-11fe3cac", module.exports)
  }
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(144);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(147),
  /* template */
  __webpack_require__(148),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9924f606",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tips/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9924f606", Component.options)
  } else {
    hotAPI.reload("data-v-9924f606", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(146);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("71419cd3", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9924f606\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9924f606\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.tip-wrap[data-v-9924f606] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  height: 1.11111rem;\n  padding-top: 0.2rem;\n}\n.arrow[data-v-9924f606] {\n  position: absolute;\n  top: 0.1rem;\n  width: 0.2rem;\n  height: 0.2rem;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.content-wrap[data-v-9924f606] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.27778rem;\n  border-radius: 0.05556rem;\n}\n.content[data-v-9924f606] {\n  height: 0.47222rem;\n  max-width: 6.27778rem;\n  font-size: 0.38889rem;\n  color: #ffffff;\n}\n.split[data-v-9924f606] {\n  width: 0.02778rem;\n  height: 0.38889rem;\n  margin-left: 0.25rem;\n  background-color: #ffffff;\n  opacity: 0.4;\n}\n.close[data-v-9924f606] {\n  color: #ffffff;\n  margin-left: 0.27778rem;\n  margin-right: 0.27778rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tips/index.vue?767a9bc3"],"names":[],"mappings":";AAeA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,oBAAA;CACA;AACA;EACA,mBAAA;EACA,YAAA;EACA,cAAA;EACA,eAAA;EACA,iCAAA;UAAA,yBAAA;CACA;AACA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,qBAAA;EACA,wBAAA;EACA,yBAAA;EACA,0BAAA;CACA;AACA;EACA,mBAAA;EACA,sBAAA;EACA,sBAAA;EACA,eAAA;CACA;AACA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;EACA,0BAAA;EACA,aAAA;CACA;AACA;EACA,eAAA;EACA,wBAAA;EACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div v-if=\"show\" class=\"tip-wrap\" :style=\"wrapStyle\">\n    <div class=\"content-wrap\" :style=\"background\">\n      <slot></slot>\n      <text class=\"content\">{{message}}</text>\n      <text class=\"split\"></text>\n      <fm-icon class=\"close\" @fmIconClicked=\"close\" name=\"guanbi\" :icon-style=\"54\" />\n    </div>\n    <text class=\"arrow\" :style=\"arrowStyle\"></text>\n  </div>\n</template>\n\n<style scoped>\n  .tip-wrap {\n    flex-direction: row;\n    height: 120px;\n    padding-top: 21.6px;\n  }\n  .arrow {\n    position: absolute;\n    top: 10.8px;\n    width: 21.6px;\n    height: 21.6px;\n    transform: rotate(45deg);\n  }\n  .content-wrap {\n    flex-direction: row;\n    align-items: center;\n    padding-top: 27px;\n    padding-bottom: 27px;\n    padding-left: 30px;\n    border-radius: 6px;\n  }\n  .content {\n    height: 51px;\n    max-width: 678px;\n    font-size: 42px;\n    color: #ffffff;\n  }\n  .split {\n    width: 3px;\n    height: 42px;\n    margin-left: 27px;\n    background-color: #ffffff;\n    opacity: 0.4;\n  }\n  .close {\n    color: #ffffff;\n    margin-left: 30px;\n    margin-right: 30px;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nexport default {\n  name: 'FmTips',\n  data () {\n    return {\n      show: true\n    };\n  },\n  components: { FmIcon },\n  computed: {\n    background () {\n      return {\n        backgroundColor: this.bgColor\n      };\n    },\n    wrapStyle () {\n      return {\n        'justify-content': this.position === 'right' ? 'flex-end' : 'flex-start'\n      };\n    },\n    arrowStyle () {\n      const sty = {\n        backgroundColor: this.bgColor\n      };\n      if (this.right) {\n        sty.right = '18px';\n      } else {\n        sty.left = '18px';\n      }\n\n      return sty;\n    }\n  },\n\n  props: {\n    message: String,\n    bgColor: {\n      type: String,\n      default: '#198ded'\n    },\n    position: {\n      type: String,\n      default: 'left'\n    }\n  },\n\n  methods: {\n    close () {\n      this.show = false;\n      this.$emit('close');\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmTips',
  data: function data() {
    return {
      show: true
    };
  },

  components: { FmIcon: _fmIcon2.default },
  computed: {
    background: function background() {
      return {
        backgroundColor: this.bgColor
      };
    },
    wrapStyle: function wrapStyle() {
      return {
        'justify-content': this.position === 'right' ? 'flex-end' : 'flex-start'
      };
    },
    arrowStyle: function arrowStyle() {
      var sty = {
        backgroundColor: this.bgColor
      };
      if (this.right) {
        sty.right = '18px';
      } else {
        sty.left = '18px';
      }

      return sty;
    }
  },

  props: {
    message: String,
    bgColor: {
      type: String,
      default: '#198ded'
    },
    position: {
      type: String,
      default: 'left'
    }
  },

  methods: {
    close: function close() {
      this.show = false;
      this.$emit('close');
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "tip-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, [_c('div', {
    staticClass: "content-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.background))
  }, [_vm._t("default"), _vm._v(" "), _c('text', {
    staticClass: "content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), _c('text', {
    staticClass: "split",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('fm-icon', {
    staticClass: "close",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": "guanbi",
      "icon-style": 54
    },
    on: {
      "fmIconClicked": _vm.close
    }
  })], 2), _vm._v(" "), _c('text', {
    staticClass: "arrow",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.arrowStyle))
  })]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9924f606", module.exports)
  }
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(150);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(153),
  /* template */
  __webpack_require__(157),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a8d59aa2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8d59aa2", Component.options)
  } else {
    hotAPI.reload("data-v-a8d59aa2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(152);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("fce08620", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a8d59aa2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a8d59aa2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-rich-text[data-v-a8d59aa2] {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-flex-shrink: 1;\n          flex-shrink: 1;\n}\n.default-text[data-v-a8d59aa2] {\n  color: #A5A5A5;\n  font-size: 0.33333rem;\n  line-height: 0.44444rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rich-text/index.vue?a61590c4"],"names":[],"mappings":";AAmCA;EACA,wBAAA;EAAA,oCAAA;UAAA,4BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,wBAAA;UAAA,gBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,uBAAA;UAAA,eAAA;CACA;AAEA;EACA,eAAA;EACA,sBAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div>\n    <div class=\"fm-rich-text\" v-if=\"isNotEmptyArray\">\n      <div v-for=\"(v, idx) in configList\" :key=\"idx\">\n        <fm-text v-if=\"v.type=='text' && v.text\"\n                            :value=\"v.text\"\n                            :has-text-margin=\"hasTextMargin\"></fm-text>\n\n        <fm-rich-text-link v-if=\"v.type=='link' && v.href && v.text\"\n                            :link-value=\"v.text\"\n                            :link-style=\"v.style\"\n                            :link-href=\"v.href\"\n                            :has-text-margin=\"hasTextMargin\"\n                            @fmRichTextLinkClick=\"linkBeClick\"></fm-rich-text-link>\n\n        <fm-icon v-if=\"v.type=='icon'\"\n                            :color=\"v.color\"\n                            :name=\"v.value\"\n                            :iconStyle=\"v.style\"></fm-icon>\n\n        <fm-tag v-if=\"v.type=='tag'\"\n                           :type=\"v.tagType\"\n                           :size=\"v.size\"\n                           :value=\"v.value\"\n                           :color=\"v.color\"\n                           :fontColor=\"v.fontColor\"></fm-tag>\n      </div>\n    </div>\n    <fm-text :value=\"configList\" v-if=\"isString\"></fm-text>\n  </div>\n</template>\n\n<style scoped>\n  .fm-rich-text {\n    justify-content: flex-start;\n    align-items: center;\n    flex-wrap: wrap;\n    flex-direction: row;\n    flex-shrink: 1;\n  }\n\n  .default-text {\n    color: #A5A5A5;\n    font-size: 36px;\n    line-height: 48px;\n  }\n</style>\n\n<script>\nimport Utils from './utils';\nimport FmText from '../fm-text';\nimport FmIcon from '../fm-icon';\nimport FmTag from '../fm-tag';\nimport FmRichTextLink from './fm-rich-text-link.vue';\nexport default {\n  name: 'FmRichText',\n  components: {\n    FmText, FmIcon, FmTag, FmRichTextLink\n  },\n  props: {\n    configList: {\n      type: [Array, String],\n      default: function () {\n        return [];\n      }\n    },\n    hasTextMargin: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({}),\n  computed: {\n    isNotEmptyArray () {\n      return Utils.isNonEmptyArray(this.configList);\n    },\n    isString () {\n      return Utils.isString(this.configList);\n    }\n  },\n  methods: {\n    linkBeClick (obj) {\n      this.$emit('linkBeClick', obj);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(75);

var _utils2 = _interopRequireDefault(_utils);

var _fmText = __webpack_require__(3);

var _fmText2 = _interopRequireDefault(_fmText);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _fmTag = __webpack_require__(45);

var _fmTag2 = _interopRequireDefault(_fmTag);

var _fmRichTextLink = __webpack_require__(154);

var _fmRichTextLink2 = _interopRequireDefault(_fmRichTextLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmRichText',
  components: {
    FmText: _fmText2.default, FmIcon: _fmIcon2.default, FmTag: _fmTag2.default, FmRichTextLink: _fmRichTextLink2.default
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    isNotEmptyArray: function isNotEmptyArray() {
      return _utils2.default.isNonEmptyArray(this.configList);
    },
    isString: function isString() {
      return _utils2.default.isString(this.configList);
    }
  },
  methods: {
    linkBeClick: function linkBeClick(obj) {
      this.$emit('linkBeClick', obj);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(155),
  /* template */
  __webpack_require__(156),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rich-text/fm-rich-text-link.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] fm-rich-text-link.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-96e452e8", Component.options)
  } else {
    hotAPI.reload("data-v-96e452e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmText = __webpack_require__(3);

var _fmText2 = _interopRequireDefault(_fmText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { FmText: _fmText2.default },
  props: {
    linkValue: {
      type: [String, Number],
      default: ''
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    },
    linkHref: {
      type: String,
      default: ''
    },
    linkStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    onLinkClick: function onLinkClick(e) {
      var self = this;
      // Utils.goToH5Page(self.linkHref);
      self.$emit('fmRichTextLinkClick', { event: e, href: self.linkHref });
    }
  }
}; //
//
//
//
//
//
//
//
//
//

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.onLinkClick
    }
  }, [_c('fm-text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "value": _vm.linkValue,
      "has-text-margin": _vm.hasTextMargin
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-96e452e8", module.exports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isNotEmptyArray) ? _c('div', {
    staticClass: "fm-rich-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.configList), function(v, idx) {
    return _c('div', {
      key: idx,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [(v.type == 'text' && v.text) ? _c('fm-text', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "value": v.text,
        "has-text-margin": _vm.hasTextMargin
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'link' && v.href && v.text) ? _c('fm-rich-text-link', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "link-value": v.text,
        "link-style": v.style,
        "link-href": v.href,
        "has-text-margin": _vm.hasTextMargin
      },
      on: {
        "fmRichTextLinkClick": _vm.linkBeClick
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'icon') ? _c('fm-icon', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "color": v.color,
        "name": v.value,
        "iconStyle": v.style
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'tag') ? _c('fm-tag', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "type": v.tagType,
        "size": v.size,
        "value": v.value,
        "color": v.color,
        "fontColor": v.fontColor
      }
    }) : _vm._e()], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.isString) ? _c('fm-text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "value": _vm.configList
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a8d59aa2", module.exports)
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(159);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(163),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-584ad4ca",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-special-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-584ad4ca", Component.options)
  } else {
    hotAPI.reload("data-v-584ad4ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(161);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7182d402", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-584ad4ca\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-584ad4ca\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-special-rich-text[data-v-584ad4ca] {\n  position: relative;\n}\n.tag-div[data-v-584ad4ca] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: #A5A5A5;\n  font-size: 0.33333rem;\n  line-height: 0.44444rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-special-rich-text/index.vue?6b7f0c06"],"names":[],"mappings":";AAqBA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,eAAA;EACA,sBAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div class=\"fm-special-rich-text\">\n    <div class=\"tag-div\"\n         :style=\"{top:top+'px'}\">\n      <fm-icon v-if=\"newList[0].type == 'icon' && newList[0].value\"\n                          :name=\"newList[0].value\"\n                          :iconStyle=\"newList[0].style\"></fm-icon>\n      <fm-tag v-if=\"newList[0].type=='tag'\"\n                          :type=\"newList[0].tagType\"\n                          :size=\"newList[0].size\"\n                          :value=\"newList[0].value\"\n                          :color=\"newList[0].color\"\n                          :fontColor=\"newList[0].fontColor\"></fm-tag>\n    </div>\n    <fm-text :value=\"newList[1].value\" v-if=\"newList[1].value\"></fm-text>\n  </div>\n</template>\n\n<style scoped>\n  .fm-special-rich-text {\n    position: relative;\n  }\n\n  .tag-div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    color: #A5A5A5;\n    font-size: 36px;\n    line-height: 48px;\n  }\n</style>\n\n<script>\nimport Utils from '../fm-rich-text/utils';\nimport FmText from '../fm-text';\nimport FmIcon from '../fm-icon';\nimport FmTag from '../fm-tag';\nexport default {\n  name: 'FmSpecialRichText',\n  components: {\n    FmText, FmIcon, FmTag\n  },\n  props: {\n    configList: {\n      type: [Array, String],\n      default: () => ({})\n    }\n  },\n  computed: {\n    newList () {\n      const { configList } = this;\n      if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n        let r1 = configList[0];\n        let r2 = configList[1];\n        const iconStyle = r1.style;\n        const textStyle = r2.style;\n        let style = {};\n        let fontSize = 36;\n        const tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 36;\n\n        if (textStyle && textStyle.fontSize) {\n          fontSize = textStyle.fontSize;\n          style = {\n            fontSize: textStyle.fontSize,\n            lineHeight: textStyle.fontSize * 1.4\n          };\n        }\n\n        if (textStyle && textStyle.color) {\n          style = {\n            ...style,\n            color: textStyle.color\n          };\n        }\n\n        if (r1.type === 'tag' && iconStyle && iconStyle.width) {\n          r1 = {\n            ...r1,\n            style: { ...iconStyle, width: null }\n          };\n        }\n        const newValue = r2.value ? new Array(Math.ceil(tagWidth / fontSize) + 1).join('   ') + `  ${r2.value}` : '';\n        r2 = {\n          ...r2,\n          style,\n          value: newValue\n        };\n        return [r1, r2];\n      } else {\n        return [];\n      }\n    },\n    top () {\n      const { configList } = this;\n      if (configList[0].type === 'tag') return 0;\n      if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n        const iconStyle = configList[0].style;\n        const textStyle = configList[1].style;\n        let fontSize = 36;\n        const tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 39;\n        if (textStyle && textStyle.fontSize) {\n          fontSize = textStyle.fontSize;\n        }\n        return Math.ceil((fontSize * 1.3 - tagHeight) / 2);\n      } else {\n        return 0;\n      }\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(75);

var _utils2 = _interopRequireDefault(_utils);

var _fmText = __webpack_require__(3);

var _fmText2 = _interopRequireDefault(_fmText);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _fmTag = __webpack_require__(45);

var _fmTag2 = _interopRequireDefault(_fmTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmSpecialRichText',
  components: {
    FmText: _fmText2.default, FmIcon: _fmIcon2.default, FmTag: _fmTag2.default
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    newList: function newList() {
      var configList = this.configList;

      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var r1 = configList[0];
        var r2 = configList[1];
        var iconStyle = r1.style;
        var textStyle = r2.style;
        var style = {};
        var fontSize = 36;
        var tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 36;

        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
          style = {
            fontSize: textStyle.fontSize,
            lineHeight: textStyle.fontSize * 1.4
          };
        }

        if (textStyle && textStyle.color) {
          style = _extends({}, style, {
            color: textStyle.color
          });
        }

        if (r1.type === 'tag' && iconStyle && iconStyle.width) {
          r1 = _extends({}, r1, {
            style: _extends({}, iconStyle, { width: null })
          });
        }
        var newValue = r2.value ? new Array(Math.ceil(tagWidth / fontSize) + 1).join('   ') + ('  ' + r2.value) : '';
        r2 = _extends({}, r2, {
          style: style,
          value: newValue
        });
        return [r1, r2];
      } else {
        return [];
      }
    },
    top: function top() {
      var configList = this.configList;

      if (configList[0].type === 'tag') return 0;
      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var iconStyle = configList[0].style;
        var textStyle = configList[1].style;
        var fontSize = 36;
        var tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 39;
        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
        }
        return Math.ceil((fontSize * 1.3 - tagHeight) / 2);
      } else {
        return 0;
      }
    }
  }
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-special-rich-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "tag-div",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      top: _vm.top + 'px'
    }))
  }, [(_vm.newList[0].type == 'icon' && _vm.newList[0].value) ? _c('fm-icon', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": _vm.newList[0].value,
      "iconStyle": _vm.newList[0].style
    }
  }) : _vm._e(), _vm._v(" "), (_vm.newList[0].type == 'tag') ? _c('fm-tag', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "type": _vm.newList[0].tagType,
      "size": _vm.newList[0].size,
      "value": _vm.newList[0].value,
      "color": _vm.newList[0].color,
      "fontColor": _vm.newList[0].fontColor
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.newList[1].value) ? _c('fm-text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "value": _vm.newList[1].value
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-584ad4ca", module.exports)
  }
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(165);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(168),
  /* template */
  __webpack_require__(169),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-52ae49d0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-foldable-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52ae49d0", Component.options)
  } else {
    hotAPI.reload("data-v-52ae49d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(167);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6594d160", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52ae49d0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52ae49d0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-52ae49d0] {\n  position: relative;\n}\n.text[data-v-52ae49d0] {\n  font-family: \"Source Han Sans CN\", Roboto, sans-serif;\n  color: #999999;\n}\n.text_small[data-v-52ae49d0] {\n  font-size: 0.33333rem;\n  line-height: 0.38889rem;\n}\n.text_large[data-v-52ae49d0] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.44444rem;\n  font-weight: 500;\n  line-height: 0.66667rem;\n}\n.text_huge[data-v-52ae49d0] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.5rem;\n  line-height: 0.72222rem;\n}\n.more[data-v-52ae49d0] {\n  position: absolute;\n  right: 0.16667rem;\n  bottom: 0;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n}\n.test[data-v-52ae49d0] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-foldable-text/index.vue?0bd27cdb"],"names":[],"mappings":";AAYA;EACA,mBAAA;CACA;AACA;EACA,sDAAA;EACA,eAAA;CACA;AACA;EACA,sBAAA;EACA,wBAAA;CACA;AACA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,iBAAA;EACA,wBAAA;CACA;AACA;EACA,+BAAA;EACA,iBAAA;EACA,kBAAA;EACA,wBAAA;CACA;AACA;EACA,mBAAA;EACA,kBAAA;EACA,UAAA;EACA,+BAAA;EACA,iBAAA;CACA;AACA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. [!] Just a beta version! -->\n<template>\n  <div class=\"wrapper\" @click=\"fold\">\n    <div class=\"container\" ref=\"plane\" :style=\"planeStyle\">\n      <text :class=\"textClz\" ref=\"text\" :style=\"textStyle\">{{ getText }}</text>\n      <text class=\"more\" v-if=\"foldable && folded\" ref=\"more\" :style=\"moreStyle\">{{ tipValue }}</text>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .container {\n    position: relative;\n  }\n  .text {\n    font-family: \"Source Han Sans CN\", Roboto, sans-serif;\n    color: #999999;\n  }\n  .text_small {\n    font-size: 36px;\n    line-height: 42px;\n  }\n  .text_large {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 48px;\n    font-weight: 500;\n    line-height: 72px;\n  }\n  .text_huge {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 54px;\n    line-height: 78px;\n  }\n  .more {\n    position: absolute;\n    right: 18px;\n    bottom: 0;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n  }\n  .test {\n    flex-direction: row;\n  }\n</style>\n\n<script>\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\n\nexport default {\n  name: 'FmFoldableText',\n  mixins: [Locale],\n  data () {\n    return {\n      expandHeight: '',\n      unexpandHeight: '',\n      animationHeight: '',\n      foldText: '',\n      foldable: true\n    };\n  },\n  props: {\n    width: {\n      type: Number,\n      default: 1020\n    },\n    text: {\n      type: String,\n      default: ''\n    },\n    lines: {\n      type: Number,\n      default: 2\n    },\n    folded: {\n      type: Boolean,\n      default: true\n    },\n    size: {\n      type: String,\n      default: 'small'\n    },\n    textStyle: Object,\n    tipStyle: Object,\n    tipValue: {\n      type: String,\n      default () {\n        return t('el.foldabletext.more');\n      }\n    }\n  },\n  mounted () {\n    if (this.foldText === '') {\n      const { textStyle } = this;\n      const fontSize = (textStyle && textStyle.fontSize) ? textStyle.fontSize : this.large ? 48 : this.huge ? 54 : 36;\n      // 计算折叠后的文本\n      const size1 = fontSize + 36 * 0.04; // 汉字\n      const size2 = fontSize * 0.56; // 英文\n      const size3 = fontSize * 0.556; // 数字\n      const size4 = fontSize * 0.80; // 全角\n      const size5 = fontSize * 0.2; // 半角\n      let tSize = 0;\n      let tmpStr = '';\n      const hideWidth = this.width * this.lines + fontSize; // 不显示“更多”情况下所能容纳最大的字体宽度\n      const maxWith = this.width * this.lines - size1 * this.tipValue.length; // 显示“更多”情况下所能容纳最大的字体宽度\n      for (const c of this.text) {\n        if (/^[\\u4e00-\\u9fa5]/.test(c)) {\n          // 汉字\n          tSize += size1;\n        } else if (/^[a-zA-Z]/.test(c)) {\n          // 英文\n          tSize += size2;\n        } else if (/^[0-9]/.test(c)) {\n          // 数字\n          tSize += size3;\n        } else if (/^[·《》，。？、：；“”‘’——【】]/.test(c)) {\n          // 全角\n          tSize += size4;\n        } else if (/^[`~!@#\\$%\\^&\\*\\(\\)_\\-\\+=\\{\\}\\[\\]|\\\\:;\"'<>,.\\?\\/\\s]/.test(c)) {\n          // 半角\n          tSize += size5;\n        } else {\n          // 其他\n          tSize += size1;\n        }\n        if (tSize >= maxWith) {\n          if (tSize >= hideWidth) {\n            tmpStr += '..';\n            break;\n          }\n        } else {\n          tmpStr += c;\n        }\n      }\n      // 文字不超过范围 不折叠\n      (tSize < hideWidth) && (this.foldable = false) && (this.folded = false);\n      this.foldText = tmpStr;\n    }\n  },\n  computed: {\n    getText () {\n      return this.folded && this.foldable ? this.foldText : this.text;\n    },\n    planeStyle () {\n      return {\n        width: this.width + 'px'\n      };\n    },\n    moreStyle () {\n      return {\n        fontSize: `${this.size === 'large' ? 48 : this.size === 'huge' ? 54 : 36}px`,\n        lineHeight: `${this.size === 'large' ? 72 : this.size === 'huge' ? 78 : 42}px`,\n        color: '#198ded',\n        fontWeight: '600',\n        ...this.tipStyle\n      };\n    },\n    textClz () {\n      const clz = ['text', 'text_small'];\n      if (this.size === 'large') {\n        clz.push('text_large');\n      } else if (this.size === 'huge') {\n        clz.push('text_huge');\n      }\n      return clz;\n    }\n  },\n  methods: {\n    fold () {\n      this.foldable && (this.folded = !this.folded);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmFoldableText',
  mixins: [_locale2.default],
  data: function data() {
    return {
      expandHeight: '',
      unexpandHeight: '',
      animationHeight: '',
      foldText: '',
      foldable: true
    };
  },

  props: {
    width: {
      type: Number,
      default: 1020
    },
    text: {
      type: String,
      default: ''
    },
    lines: {
      type: Number,
      default: 2
    },
    folded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'small'
    },
    textStyle: Object,
    tipStyle: Object,
    tipValue: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.foldabletext.more');
      }
    }
  },
  mounted: function mounted() {
    if (this.foldText === '') {
      var textStyle = this.textStyle;

      var fontSize = textStyle && textStyle.fontSize ? textStyle.fontSize : this.large ? 48 : this.huge ? 54 : 36;
      // 计算折叠后的文本
      var size1 = fontSize + 36 * 0.04; // 汉字
      var size2 = fontSize * 0.56; // 英文
      var size3 = fontSize * 0.556; // 数字
      var size4 = fontSize * 0.80; // 全角
      var size5 = fontSize * 0.2; // 半角
      var tSize = 0;
      var tmpStr = '';
      var hideWidth = this.width * this.lines + fontSize; // 不显示“更多”情况下所能容纳最大的字体宽度
      var maxWith = this.width * this.lines - size1 * this.tipValue.length; // 显示“更多”情况下所能容纳最大的字体宽度
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;

          if (/^[\u4e00-\u9fa5]/.test(c)) {
            // 汉字
            tSize += size1;
          } else if (/^[a-zA-Z]/.test(c)) {
            // 英文
            tSize += size2;
          } else if (/^[0-9]/.test(c)) {
            // 数字
            tSize += size3;
          } else if (/^[·《》，。？、：；“”‘’——【】]/.test(c)) {
            // 全角
            tSize += size4;
          } else if (/^[`~!@#\$%\^&\*\(\)_\-\+=\{\}\[\]|\\:;"'<>,.\?\/\s]/.test(c)) {
            // 半角
            tSize += size5;
          } else {
            // 其他
            tSize += size1;
          }
          if (tSize >= maxWith) {
            if (tSize >= hideWidth) {
              tmpStr += '..';
              break;
            }
          } else {
            tmpStr += c;
          }
        }
        // 文字不超过范围 不折叠
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      tSize < hideWidth && (this.foldable = false) && (this.folded = false);
      this.foldText = tmpStr;
    }
  },

  computed: {
    getText: function getText() {
      return this.folded && this.foldable ? this.foldText : this.text;
    },
    planeStyle: function planeStyle() {
      return {
        width: this.width + 'px'
      };
    },
    moreStyle: function moreStyle() {
      return _extends({
        fontSize: (this.size === 'large' ? 48 : this.size === 'huge' ? 54 : 36) + 'px',
        lineHeight: (this.size === 'large' ? 72 : this.size === 'huge' ? 78 : 42) + 'px',
        color: '#198ded',
        fontWeight: '600'
      }, this.tipStyle);
    },
    textClz: function textClz() {
      var clz = ['text', 'text_small'];
      if (this.size === 'large') {
        clz.push('text_large');
      } else if (this.size === 'huge') {
        clz.push('text_huge');
      }
      return clz;
    }
  },
  methods: {
    fold: function fold() {
      this.foldable && (this.folded = !this.folded);
    }
  }
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.fold
    }
  }, [_c('div', {
    ref: "plane",
    staticClass: "container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.planeStyle))
  }, [_c('text', {
    ref: "text",
    class: _vm.textClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.textStyle))
  }, [_vm._v(_vm._s(_vm.getText))]), _vm._v(" "), (_vm.foldable && _vm.folded) ? _c('text', {
    ref: "more",
    staticClass: "more",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.moreStyle))
  }, [_vm._v(_vm._s(_vm.tipValue))]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-52ae49d0", module.exports)
  }
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(171)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(174),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2016588d",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-dialog/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2016588d", Component.options)
  } else {
    hotAPI.reload("data-v-2016588d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(172);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e2f6aa46", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2016588d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2016588d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-2016588d] {\n  position: fixed;\n  width: 10rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  /*兼容H5异常*/\n  z-index: 99999;\n}\n.dialog-container[data-v-2016588d] {\n  width: 10rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.dialog-container-H5[data-v-2016588d] {\n  position: fixed;\n  width: 10rem;\n  top: 0px;\n  bottom: 0px;\n}\n.dialog-box[data-v-2016588d] {\n  width: 8.66667rem;\n  background-color: #FFFFFF;\n  border-radius: 0.09259rem;\n  box-shadow: 0 0 0.27778rem 0 rgba(0, 0, 0, 0.3);\n}\n.dialog-box-H5[data-v-2016588d] {\n  /* position: fixed;\n  left: 72px; */\n}\n.content-title[data-v-2016588d] {\n  padding-left: 0.66667rem;\n  padding-right: 0.66667rem;\n  margin-bottom: 0.01389rem;\n}\n.content-title--input[data-v-2016588d] {\n  margin-top: 0.44444rem;\n  padding-left: 0.44444rem;\n  padding-right: 0.44444rem;\n  margin-bottom: 0.01389rem;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n}\n.content-subtext[data-v-2016588d] {\n  padding-left: 0.66667rem;\n  padding-right: 0.66667rem;\n}\n.dialog-footer[data-v-2016588d] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n  padding: 0.33333rem 0.66667rem;\n}\n.input[data-v-2016588d] {\n  margin-top: -0.13889rem;\n  margin-bottom: 0.22222rem;\n  margin-left: 0.22222rem;\n  margin-left: 24px;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-dialog/index.vue?bda4a986"],"names":[],"mappings":";AAiEA;EACA,gBAAA;EACA,aAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,UAAA;EACA,eAAA;CACA;AAEA;EACA,aAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,gBAAA;EACA,aAAA;EACA,SAAA;EACA,YAAA;CACA;AAEA;EACA,kBAAA;EACA,0BAAA;EACA,0BAAA;EACA,gDAAA;CACA;AAEA;EACA;gBACA;CACA;AAEA;EACA,yBAAA;EACA,0BAAA;EACA,0BAAA;CACA;AAEA;EACA,uBAAA;EACA,yBAAA;EACA,0BAAA;EACA,0BAAA;EACA,+BAAA;EACA,iBAAA;CACA;AAEA;EACA,yBAAA;EACA,0BAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,wBAAA;UAAA,gBAAA;EACA,+BAAA;CACA;AAEA;EACA,wBAAA;EACA,0BAAA;EACA,wBAAA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Group Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/03/14. [!] Just a beta version! -->\n<template>\n  <component class=\"container\"\n             :is=\"isCreator ? 'FmOverlayNative' : 'div'\"\n             :visible=\"self_show\"\n             @onDismiss=\"overlayClicked\"\n             :touchable='canAutoClose'>\n      <fm-overlay v-if=\"self_show && !isCreator\"\n                  :hasAnimation=\"true\"\n                  :canAutoClose=\"false\"\n                  :opacity=\"overlayOpacity\"\n                  @fmOverlayBodyClicked=\"overlayClicked\"\n                  ref=\"fm-overlay\"></fm-overlay>\n      <div class=\"dialog-container\"\n           :class=\"!isCreator && ['dialog-container-H5']\"\n           v-if=\"self_show || isCreator\"\n           :style=\"{ top: `${statusHeight}px` }\">\n        <div class=\"dialog-box\"\n            :class=\"!isCreator && ['dialog-box-H5']\"\n            ref=\"dialog-box\"\n            v-if=\"self_show || isCreator\"\n            :style=\"dialogStyle\"\n            @touchend=\"handleTouchEnd\">\n          <div class=\"dialog-content\" :style=\"(title || content) && !contentHidden && contentType !== 'select' ? { paddingTop: '63px' } : {}\">\n            <slot name=\"title\">\n              <template v-if=\"contentType === 'select'\">\n                <fm-text class=\"content-title--input\" :style=\"titleStyles\" :value=\"title\"></fm-text>\n              </template>\n              <template v-else>\n                <fm-text v-if=\"title && !contentHidden\" class=\"content-title\" font-weight=\"medium\" size=\"large\" :style=\"titleStyles\" :value=\"title\"></fm-text>\n              </template>\n            </slot>\n            <slot name=\"content\">\n              <!-- Normal Dialog -->\n              <template v-if=\"contentType === 'default'\">\n                <fm-text v-if=\"content && !contentHidden\" class=\"content-subtext\" :style=\"contentStyles\" :value=\"content\"></fm-text>\n              </template>\n              <!-- Input Dialog -->\n              <template v-if=\"contentType === 'input'\">\n                <fm-input class=\"input\" ref=\"inputEl\" :default-value=\"inputText\" type=\"text\" :placeholder=\"placeholder\" :autofocus=\"true\" @input=\"inputing\" />\n              </template>\n              <!-- Select Dialog -->\n              <template v-if=\"contentType === 'select'\">\n                <fm-checkbox-list\n                  ref=\"selectEl\"\n                  :list=\"selectDataIn\"\n                  :single=\"selectModel === 'single'\"\n                  :limit=\"selectLimit\"\n                  :last-border-hidden=\"selectModel === 'single'\"\n                  @fmCheckBoxListChecked=\"onSelect\" />\n              </template>\n            </slot>\n          </div>\n          <slot name=\"btn-group\">\n            <div class=\"dialog-footer\" :style=\"btnStyle\" v-if=\"(contentType !== 'select' || selectModel !== 'single') && !contentHidden\">\n                <fm-simple-btn v-for=\"(btn, index) in dialogBtns\" scene=\"dialog\" v-bind=\"btn\" @click=\"btnClick\" :key=\"index\"></fm-simple-btn>\n            </div>\n          </slot>\n        </div>\n      </div>\n  </component>\n</template>\n\n<style scoped>\n  .container {\n    position: fixed;\n    width: 1080px;\n    align-items: center;\n    justify-content: center;\n    /*兼容H5异常*/\n    z-index: 99999;\n  }\n\n  .dialog-container {\n    width: 1080px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .dialog-container-H5 {\n    position: fixed;\n    width: 1080px;\n    top: 0px;\n    bottom: 0px;\n  }\n\n  .dialog-box {\n    width: 936px;\n    background-color: #FFFFFF;\n    border-radius: 10px;\n    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);\n  }\n\n  .dialog-box-H5 {\n    /* position: fixed;\n    left: 72px; */\n  }\n\n  .content-title {\n    padding-left: 72px;\n    padding-right: 72px;\n    margin-bottom: 1.5px;\n  }\n\n  .content-title--input {\n    margin-top: 48px;\n    padding-left: 48px;\n    padding-right: 48px;\n    margin-bottom: 1.5px;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n  }\n\n  .content-subtext {\n    padding-left: 72px;\n    padding-right: 72px;\n  }\n\n  .dialog-footer {\n    justify-content: center;\n    align-items: center;\n    flex-wrap: wrap;\n    padding: 36px 72px;\n  }\n\n  .input {\n    margin-top: -15px;\n    margin-bottom: 24px;\n    margin-left: 24px;\n    margin-left: 24px;\n  }\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nconst type_alert = 'alert';\nconst type_confirm = 'confirm';\nimport FmOverlay from '../fm-overlay';\nimport FmText from '../fm-text';\nimport FmSimpleBtn from '../fm-simple-btn';\nimport FmInput from '../fm-input';\nimport FmCheckboxList from '../fm-checkbox-list';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\n\nexport default {\n  name: 'FmDialog',\n  mixins: [Locale],\n  components: {\n    FmOverlay,\n    FmText,\n    FmSimpleBtn,\n    FmInput,\n    FmCheckboxList\n  },\n  props: {\n    show: {\n      type: Boolean,\n      default: false\n    },\n    title: {\n      type: String,\n      default: ''\n    },\n    content: {\n      type: String,\n      default: ''\n    },\n    top: {\n      type: Number,\n      default: 400\n    },\n    bodyBackground: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    bodyStyles: {\n      type: Object,\n      default: () => ({})\n    },\n    titleStyles: {\n      type: Object,\n      default: () => ({})\n    },\n    contentStyles: {\n      type: Object,\n      default: () => ({})\n    },\n    cancelText: {\n      type: String,\n      default () {\n        return t('el.common.cancel');\n      }\n    },\n    confirmText: {\n      type: String,\n      default () {\n        return t('el.common.confirm');\n      }\n    },\n    confirmColor: {\n      type: String,\n      default: '#198DED'\n    },\n    cancelColor: {\n      type: String,\n      default: '#198DED'\n    },\n    hasAnimation: {\n      type: Boolean,\n      default: true\n    },\n    duration: {\n      type: Number,\n      default: 300\n    },\n    timingFunction: {\n      type: Array,\n      default: () => (['ease-out', 'ease-out'])\n    },\n    canAutoClose: {\n      type: Boolean,\n      default: true\n    },\n    btns: {\n      type: Array,\n      default: () => ([])\n    },\n    placeholder: {\n      type: String,\n      default: ''\n    },\n    inputDefaultText: {\n      type: [String, Array],\n      default: ''\n    },\n    selectData: {\n      type: Array,\n      default: () => ([])\n    },\n    selectModel: {\n      type: String,\n      default: 'single'\n    },\n    selectLimit: {\n      type: Number,\n      default: 0\n    },\n    btnDirection: {\n      type: String,\n      default: 'row'\n    },\n    cancelCb: Function,\n    confirmCb: Function,\n    type: {\n      type: String,\n      default: type_confirm\n    },\n    contentType: {\n      type: String,\n      default: 'default'\n    },\n    overlayOpacity: {\n      type: Number,\n      default: 0.5\n    },\n    contentHidden: Boolean\n  },\n  data: () => ({\n    pageHeight: 1334,\n    self_show: false,\n    dialogOpacity: 0,\n    inputText: '',\n    selectList: [],\n    selectDataIn: [],\n    statusHeight: 66\n  }),\n  created () {\n    const { env: { deviceHeight, deviceWidth }} = weex.config;\n    this.pageHeight = deviceHeight / deviceWidth * 1080;\n    this.self_show = this.show;\n    this.show && (this.dialogOpacity = 1);\n    this.inputText = this.inputDefaultText;\n    this.selectDataIn = this.selectData;\n    if (this.show) {\n      this.appearDialog(true);\n    }\n    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {\n      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;\n    }\n  },\n  watch: {\n    show (val, oldVal) {\n      if (val) {\n        this.self_show = true;\n        this.$nextTick(() => {\n          this.$refs.inputEl && this.$refs.inputEl.focus();\n          this.appearDialog(true);\n        });\n      } else {\n        !this.isCreator && this.$refs['fm-overlay'].hide();\n        this.$refs.selectEl && this.$refs.selectEl.reset(); // 重置选择\n        this.selectList = [];\n        this.appearDialog(false);\n      }\n    },\n    inputDefaultText (val) {\n      this.inputText = val;\n    },\n    selectData (val) {\n      this.selectDataIn = val;\n    }\n  },\n  computed: {\n    isCreator () {\n      return weex.supports && weex.supports('@component/FmOverlayNative');\n    },\n    dialogBtns () {\n      let btns = [];\n      if (!this.btns || !this.btns.length) {\n        if (this.type === type_alert) {\n          btns = [{\n            text: this.confirmText,\n            color: this.confirmColor,\n            type: 'confirm'\n          }];\n        } else if (this.type === type_confirm) {\n          btns = [{\n            text: this.cancelText,\n            color: this.cancelColor,\n            type: 'cancel'\n          }, {\n            text: this.confirmText,\n            color: this.confirmColor,\n            type: 'confirm'\n          }];\n        }\n      } else {\n        btns = btns.concat(this.btns);\n      }\n      return btns;\n    },\n    dialogStyle () {\n      let extraStyle = {};\n      if (this.contentHidden) {\n        extraStyle = {\n          backgroundColor: 'transparent',\n          alignItems: 'center',\n          boxShadow: 'none'\n        }\n      }\n      return Object.assign({\n        opacity: this.dialogOpacity,\n        backgroundColor: this.bodyBackground\n      }, extraStyle, this.bodyStyles);\n    },\n    btnStyle () {\n      const { btnDirection, btns } = this;\n      return {\n        flexDirection: btns.length > 2 ? 'column' : btnDirection\n      };\n    },\n    eventMsg () {\n      const { contentType } = this;\n      const msg = {};\n      if (contentType === 'input') {\n        msg.inputValue = this.inputText;\n      }\n      if (contentType === 'select') {\n        msg.selectList = this.selectList;\n      }\n      return msg;\n    }\n  },\n  methods: {\n    handleTouchEnd (e) {\n      // 原生上有点击穿透问题\n      e.preventDefault && e.preventDefault();\n    },\n    overlayClicked () {\n      if (this.canAutoClose) {\n        this.$emit('update:show', false);\n        this.appearDialog(false);\n      }\n      this.cancelCb && this.cancelCb();\n    },\n    btnClick (btn) {\n      const { eventMsg } = this;\n      this.$emit('update:show', false);\n      if (btn.type && btn.type === 'cancel') {\n        this.$emit('fmDialogBtnClicked', { type: 'cancel' });\n        this.cancelCb && this.cancelCb();\n      } else if (btn.type && btn.type === 'confirm') {\n        this.$emit('fmDialogBtnClicked', Object.assign({ type: 'confirm' }, eventMsg));\n        this.confirmCb && this.confirmCb();\n      } else {\n        this.$emit('fmDialogBtnClicked', Object.assign(eventMsg, btn));\n      }\n    },\n    appearDialog (bool, duration = this.duration) {\n      if (!bool) {\n        this.$emit('fmDialogDisappeared', {});\n      }\n      const { hasAnimation, timingFunction, isCreator } = this;\n      if (isCreator) {\n        this.self_show = bool;\n        this.dialogOpacity = bool ? 1 : 0;\n        return;\n      }\n      const dialogEl = this.$refs['dialog-box'];\n      this.dialogOpacity = bool ? 0 : 1;\n      if (hasAnimation && dialogEl) {\n        animation.transition(dialogEl, {\n          styles: {\n            opacity: bool ? 1 : 0\n          },\n          duration,\n          timingFunction: timingFunction[bool ? 0 : 1],\n          delay: 0\n        }, () => {\n          this.self_show = bool;\n          this.dialogOpacity = bool ? 1 : 0;\n        });\n      } else {\n        this.self_show = bool;\n        this.dialogOpacity = bool ? 1 : 0;\n      }\n    },\n    inputing (e) {\n      this.inputText = e.value;\n    },\n    onSelect (e) {\n      this.selectList = e.checkedList;\n      if (this.selectModel === 'single') {\n        this.$emit('update:show', false);\n        this.$emit('fmDialogSingleSelected', { selectList: this.selectList });\n      }\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmOverlay = __webpack_require__(43);

var _fmOverlay2 = _interopRequireDefault(_fmOverlay);

var _fmText = __webpack_require__(3);

var _fmText2 = _interopRequireDefault(_fmText);

var _fmSimpleBtn = __webpack_require__(63);

var _fmSimpleBtn2 = _interopRequireDefault(_fmSimpleBtn);

var _fmInput = __webpack_require__(72);

var _fmInput2 = _interopRequireDefault(_fmInput);

var _fmCheckboxList = __webpack_require__(73);

var _fmCheckboxList2 = _interopRequireDefault(_fmCheckboxList);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var type_alert = 'alert';
var type_confirm = 'confirm';
exports.default = {
  name: 'FmDialog',
  mixins: [_locale2.default],
  components: {
    FmOverlay: _fmOverlay2.default,
    FmText: _fmText2.default,
    FmSimpleBtn: _fmSimpleBtn2.default,
    FmInput: _fmInput2.default,
    FmCheckboxList: _fmCheckboxList2.default
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 400
    },
    bodyBackground: {
      type: String,
      default: '#FFFFFF'
    },
    bodyStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    titleStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    contentStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    cancelText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.cancel');
      }
    },
    confirmText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.confirm');
      }
    },
    confirmColor: {
      type: String,
      default: '#198DED'
    },
    cancelColor: {
      type: String,
      default: '#198DED'
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-out', 'ease-out'];
      }
    },
    canAutoClose: {
      type: Boolean,
      default: true
    },
    btns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputDefaultText: {
      type: [String, Array],
      default: ''
    },
    selectData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    selectModel: {
      type: String,
      default: 'single'
    },
    selectLimit: {
      type: Number,
      default: 0
    },
    btnDirection: {
      type: String,
      default: 'row'
    },
    cancelCb: Function,
    confirmCb: Function,
    type: {
      type: String,
      default: type_confirm
    },
    contentType: {
      type: String,
      default: 'default'
    },
    overlayOpacity: {
      type: Number,
      default: 0.5
    },
    contentHidden: Boolean
  },
  data: function data() {
    return {
      pageHeight: 1334,
      self_show: false,
      dialogOpacity: 0,
      inputText: '',
      selectList: [],
      selectDataIn: [],
      statusHeight: 66
    };
  },
  created: function created() {
    var _weex$config$env = weex.config.env,
        deviceHeight = _weex$config$env.deviceHeight,
        deviceWidth = _weex$config$env.deviceWidth;

    this.pageHeight = deviceHeight / deviceWidth * 1080;
    this.self_show = this.show;
    this.show && (this.dialogOpacity = 1);
    this.inputText = this.inputDefaultText;
    this.selectDataIn = this.selectData;
    if (this.show) {
      this.appearDialog(true);
    }
    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {
      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;
    }
  },

  watch: {
    show: function show(val, oldVal) {
      var _this = this;

      if (val) {
        this.self_show = true;
        this.$nextTick(function () {
          _this.$refs.inputEl && _this.$refs.inputEl.focus();
          _this.appearDialog(true);
        });
      } else {
        !this.isCreator && this.$refs['fm-overlay'].hide();
        this.$refs.selectEl && this.$refs.selectEl.reset(); // 重置选择
        this.selectList = [];
        this.appearDialog(false);
      }
    },
    inputDefaultText: function inputDefaultText(val) {
      this.inputText = val;
    },
    selectData: function selectData(val) {
      this.selectDataIn = val;
    }
  },
  computed: {
    isCreator: function isCreator() {
      return weex.supports && weex.supports('@component/FmOverlayNative');
    },
    dialogBtns: function dialogBtns() {
      var btns = [];
      if (!this.btns || !this.btns.length) {
        if (this.type === type_alert) {
          btns = [{
            text: this.confirmText,
            color: this.confirmColor,
            type: 'confirm'
          }];
        } else if (this.type === type_confirm) {
          btns = [{
            text: this.cancelText,
            color: this.cancelColor,
            type: 'cancel'
          }, {
            text: this.confirmText,
            color: this.confirmColor,
            type: 'confirm'
          }];
        }
      } else {
        btns = btns.concat(this.btns);
      }
      return btns;
    },
    dialogStyle: function dialogStyle() {
      var extraStyle = {};
      if (this.contentHidden) {
        extraStyle = {
          backgroundColor: 'transparent',
          alignItems: 'center',
          boxShadow: 'none'
        };
      }
      return Object.assign({
        opacity: this.dialogOpacity,
        backgroundColor: this.bodyBackground
      }, extraStyle, this.bodyStyles);
    },
    btnStyle: function btnStyle() {
      var btnDirection = this.btnDirection,
          btns = this.btns;

      return {
        flexDirection: btns.length > 2 ? 'column' : btnDirection
      };
    },
    eventMsg: function eventMsg() {
      var contentType = this.contentType;

      var msg = {};
      if (contentType === 'input') {
        msg.inputValue = this.inputText;
      }
      if (contentType === 'select') {
        msg.selectList = this.selectList;
      }
      return msg;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 原生上有点击穿透问题
      e.preventDefault && e.preventDefault();
    },
    overlayClicked: function overlayClicked() {
      if (this.canAutoClose) {
        this.$emit('update:show', false);
        this.appearDialog(false);
      }
      this.cancelCb && this.cancelCb();
    },
    btnClick: function btnClick(btn) {
      var eventMsg = this.eventMsg;

      this.$emit('update:show', false);
      if (btn.type && btn.type === 'cancel') {
        this.$emit('fmDialogBtnClicked', { type: 'cancel' });
        this.cancelCb && this.cancelCb();
      } else if (btn.type && btn.type === 'confirm') {
        this.$emit('fmDialogBtnClicked', Object.assign({ type: 'confirm' }, eventMsg));
        this.confirmCb && this.confirmCb();
      } else {
        this.$emit('fmDialogBtnClicked', Object.assign(eventMsg, btn));
      }
    },
    appearDialog: function appearDialog(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;

      if (!bool) {
        this.$emit('fmDialogDisappeared', {});
      }
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          isCreator = this.isCreator;

      if (isCreator) {
        this.self_show = bool;
        this.dialogOpacity = bool ? 1 : 0;
        return;
      }
      var dialogEl = this.$refs['dialog-box'];
      this.dialogOpacity = bool ? 0 : 1;
      if (hasAnimation && dialogEl) {
        animation.transition(dialogEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          _this2.self_show = bool;
          _this2.dialogOpacity = bool ? 1 : 0;
        });
      } else {
        this.self_show = bool;
        this.dialogOpacity = bool ? 1 : 0;
      }
    },
    inputing: function inputing(e) {
      this.inputText = e.value;
    },
    onSelect: function onSelect(e) {
      this.selectList = e.checkedList;
      if (this.selectModel === 'single') {
        this.$emit('update:show', false);
        this.$emit('fmDialogSingleSelected', { selectList: this.selectList });
      }
    }
  }
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.isCreator ? 'FmOverlayNative' : 'div', {
    tag: "component",
    staticClass: "container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "visible": _vm.self_show,
      "touchable": _vm.canAutoClose
    },
    on: {
      "onDismiss": _vm.overlayClicked
    }
  }, [(_vm.self_show && !_vm.isCreator) ? _c('fm-overlay', {
    ref: "fm-overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "hasAnimation": true,
      "canAutoClose": false,
      "opacity": _vm.overlayOpacity
    },
    on: {
      "fmOverlayBodyClicked": _vm.overlayClicked
    }
  }) : _vm._e(), _vm._v(" "), (_vm.self_show || _vm.isCreator) ? _c('div', {
    staticClass: "dialog-container",
    class: !_vm.isCreator && ['dialog-container-H5'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      top: (_vm.statusHeight + "px")
    }))
  }, [(_vm.self_show || _vm.isCreator) ? _c('div', {
    ref: "dialog-box",
    staticClass: "dialog-box",
    class: !_vm.isCreator && ['dialog-box-H5'],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.dialogStyle)),
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [_c('div', {
    staticClass: "dialog-content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle((_vm.title || _vm.content) && !_vm.contentHidden && _vm.contentType !== 'select' ? {
      paddingTop: '63px'
    } : {}))
  }, [_vm._t("title", [(_vm.contentType === 'select') ? [_c('fm-text', {
    staticClass: "content-title--input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.titleStyles)),
    attrs: {
      "value": _vm.title
    }
  })] : [(_vm.title && !_vm.contentHidden) ? _c('fm-text', {
    staticClass: "content-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.titleStyles)),
    attrs: {
      "font-weight": "medium",
      "size": "large",
      "value": _vm.title
    }
  }) : _vm._e()]]), _vm._v(" "), _vm._t("content", [(_vm.contentType === 'default') ? [(_vm.content && !_vm.contentHidden) ? _c('fm-text', {
    staticClass: "content-subtext",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.contentStyles)),
    attrs: {
      "value": _vm.content
    }
  }) : _vm._e()] : _vm._e(), _vm._v(" "), (_vm.contentType === 'input') ? [_c('fm-input', {
    ref: "inputEl",
    staticClass: "input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "default-value": _vm.inputText,
      "type": "text",
      "placeholder": _vm.placeholder,
      "autofocus": true
    },
    on: {
      "input": _vm.inputing
    }
  })] : _vm._e(), _vm._v(" "), (_vm.contentType === 'select') ? [_c('fm-checkbox-list', {
    ref: "selectEl",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "list": _vm.selectDataIn,
      "single": _vm.selectModel === 'single',
      "limit": _vm.selectLimit,
      "last-border-hidden": _vm.selectModel === 'single'
    },
    on: {
      "fmCheckBoxListChecked": _vm.onSelect
    }
  })] : _vm._e()])], 2), _vm._v(" "), _vm._t("btn-group", [((_vm.contentType !== 'select' || _vm.selectModel !== 'single') && !_vm.contentHidden) ? _c('div', {
    staticClass: "dialog-footer",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.btnStyle))
  }, _vm._l((_vm.dialogBtns), function(btn, index) {
    return _c('fm-simple-btn', _vm._b({
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "scene": "dialog"
      },
      on: {
        "click": _vm.btnClick
      }
    }, 'fm-simple-btn', btn, false))
  })) : _vm._e()])], 2) : _vm._e()]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2016588d", module.exports)
  }
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(176);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-81855a66",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-action-sheet/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81855a66", Component.options)
  } else {
    hotAPI.reload("data-v-81855a66", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(178);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ab39026", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81855a66\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81855a66\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmPopup = __webpack_require__(74);

var _fmPopup2 = _interopRequireDefault(_fmPopup);

var _fmSimpleBtn = __webpack_require__(63);

var _fmSimpleBtn2 = _interopRequireDefault(_fmSimpleBtn);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmActionSheet',
  mixins: [_locale2.default],
  components: { FmPopup: _fmPopup2.default, FmSimpleBtn: _fmSimpleBtn2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    canAutoClose: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.confirm');
      }
    },
    confirmColor: {
      type: String,
      default: '#DE3938'
    },
    cancelText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.cancel');
      }
    },
    actionBtns: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    overlayCfg: function overlayCfg() {
      var canAutoClose = this.canAutoClose;

      return {
        hasAnimation: true,
        timingFunction: ['ease-in', 'ease-out'],
        duration: 300,
        opacity: 0.5,
        canAutoClose: canAutoClose
      };
    },
    _height: function _height() {
      return 192.0 * this.btns.length;
    },
    btns: function btns() {
      var btns = [];
      if (!this.actionBtns || !this.actionBtns.length) {
        btns = [{
          text: this.confirmText,
          color: this.confirmColor,
          type: 'confirm'
        }, {
          text: this.cancelText,
          type: 'cancel'
        }];
      } else {
        btns = this.actionBtns.concat([{
          text: this.cancelText,
          type: 'cancel'
        }]);
      }
      return btns;
    }
  },
  methods: {
    popupOverlayClick: function popupOverlayClick() {
      this.canAutoClose && this.$emit('fmActionSheetOverlayClick', {});
    },
    btnClick: function btnClick(btn) {
      this.$refs['fm-popup'].hide();
      this.$emit('fmActionSheetBtnClicked', btn);
    }
  }
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fm-popup', {
    ref: "fm-popup",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "have-overlay": true,
      "popup-color": "#FFFFFF",
      "show": _vm.show,
      "overlay-cfg": _vm.overlayCfg,
      "pos": "bottom",
      "height": _vm._height
    },
    on: {
      "fmPopupOverlayClicked": _vm.popupOverlayClick
    }
  }, _vm._l((_vm.btns), function(btn, index) {
    return _c('fm-simple-btn', {
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "scene": "actionSheet",
        "color": btn.color,
        "text": btn.text,
        "type": btn.type,
        "msg": btn.msg
      },
      on: {
        "click": _vm.btnClick
      }
    })
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-81855a66", module.exports)
  }
}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(182);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(183)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(187),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8580e67a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rater/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8580e67a", Component.options)
  } else {
    hotAPI.reload("data-v-8580e67a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3a353a35", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8580e67a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8580e67a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.rater-wrap[data-v-8580e67a] {\n  position: relative;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.rater-star[data-v-8580e67a] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 0;\n}\n.rater-star-bg[data-v-8580e67a] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.rater-star-cover[data-v-8580e67a] {\n  position: absolute;\n  overflow: hidden;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.star[data-v-8580e67a] {\n}\n.star_small[data-v-8580e67a] {\n  width: 0.27778rem;\n  height: 0.27778rem;\n  margin: 0 0.02778rem;\n}\n.star_big[data-v-8580e67a] {\n  width: 0.55556rem;\n  height: 0.55556rem;\n  margin: 0 0.12037rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rater/index.vue?6822c694"],"names":[],"mappings":";AAkBA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,iBAAA;EACA,QAAA;EACA,OAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,iBAAA;EACA,OAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;CACA;AAEA;CAEA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/25. -->\n<template>\n  <div class=\"rater-wrap\" ref=\"rater\" @touchstart=\"raterTouchStart\" @touchmove=\"raterTouchmove\" @touchend=\"raterTouchend\">\n    <div class=\"rater-star-bg\">\n      <image :class=\"starClz\" :src=\"getBgImgs\" />\n      <image :class=\"starClz\" :src=\"getBgImgs\" />\n      <image :class=\"starClz\" :src=\"getBgImgs\" />\n      <image :class=\"starClz\" :src=\"getBgImgs\" />\n      <image :class=\"starClz\" :src=\"getBgImgs\" />\n    </div>\n    <div class=\"rater-star\" :style=\"wraperWidth\">\n      <image :class=\"starClz\" v-for=\"(item, index) in getImgs\" :key=\"index\" :src=\"item\" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .rater-wrap {\n    position: relative;\n    flex-direction: row;\n  }\n\n  .rater-star {\n    flex-direction: row;\n    position: absolute;\n    overflow: hidden;\n    left: 0;\n    top: 0;\n  }\n\n  .rater-star-bg {\n    flex-direction: row;\n  }\n\n  .rater-star-cover {\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n  }\n\n  .star {\n\n  }\n\n  .star_small {\n    width: 30px;\n    height: 30px;\n    margin: 0 3px;\n  }\n\n  .star_big {\n    width: 60px;\n    height: 60px;\n    margin: 0 13px;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nimport FmImage from '../fm-image';\nimport STARS from './type';\n\nconst dom = weex.requireModule('dom');\n\nexport default {\n  name: 'FmRater',\n  components: { FmIcon, FmImage },\n  props: {\n    score: {\n      type: Number,\n      default: 5\n    },\n    fullScore: {\n      type: Number,\n      default: 10\n    },\n    size: {\n      type: String,\n      default: 'big'\n    },\n    theme: {\n      type: String,\n      default: 'normal'\n    },\n    canChange: {\n      type: Boolean,\n      default: true\n    },\n    canSlide: {\n      type: Boolean,\n      default: true\n    },\n    starImg: {\n      type: [Array, String],\n      default: ''\n    },\n    bgImg: {\n      type: String,\n      default: ''\n    }\n  },\n  data: () => ({\n    offset_left: 0,\n    starCount: 5\n  }),\n  computed: {\n    starClz () {\n      const clz = ['star'];\n      this.size === 'big' ? clz.push('star_big') : clz.push('star_small');\n      return clz;\n    },\n    wraperWidth () {\n      const { score, fullScore, size } = this;\n      const half_star_width = size === 'big' ? 43 : 18;\n      const percent = score / fullScore;\n      let length = score <= 0 ? 0 : percent >= 1 ? 10 : percent.toFixed(1) * 10;\n      length = isNaN(length) ? 0 : length;\n      return !length ? {\n        width: 1,\n        opacity: 0\n      } : {\n        width: length * half_star_width,\n        opacity: 1\n      };\n    },\n    getImgs () {\n      const { theme, starImg } = this;\n      let imgItem;\n      if (starImg) {\n        if (Array.isArray(starImg)) { return starImg; }\n        imgItem = starImg;\n      } else if (theme === 'normal') {\n        return STARS.NORMAL;\n      } else if (theme === 'special') {\n        imgItem = STARS.SPECIAL;\n      } else if (theme === 'dark') {\n        imgItem = STARS.DARK;\n      }\n      const arr = [];\n      for (let i = 0; i < 5; i++) {\n        arr.push(imgItem);\n      }\n      return arr;\n    },\n    getBgImgs () {\n      const { theme, bgImg } = this;\n      if (bgImg) { return bgImg; }\n      if (theme === 'normal' || theme === 'special') {\n        return STARS.BG_NORMAL;\n      } else if (theme === 'dark') {\n        return STARS.BG_DARK;\n      }\n    }\n  },\n  methods: {\n    raterTouchStart (e) {\n      const { canChange, canSlide } = this;\n      if (!canChange || !canSlide) return;\n      this.calculateScore(e.changedTouches[0].pageX, true);\n    },\n    raterTouchmove (e) {\n      const { canChange, canSlide } = this;\n      if (!canChange || !canSlide) return;\n      this.calculateScore(e.changedTouches[0].pageX, true);\n    },\n    raterTouchend (e) {\n      const { canChange } = this;\n      if (!canChange) return;\n      this.calculateScore(e.changedTouches[0].pageX, true);\n    },\n    calculateScore (pageX, needEmit) {\n      const { size, fullScore } = this;\n      if (weex.config.env.platform === 'Web') {\n        pageX = pageX * 2 / 750 * 1080 - this.offset_left;\n      } else if (weex.config.env.platform === 'iOS') {\n        pageX = pageX - this.offset_left;\n      }\n      const half_star_width = size === 'big' ? 43 : 18;\n      const half_star_score = fullScore / 10;\n      const star_num = (pageX / half_star_width).toFixed(0);\n      const score_percent = star_num <= 0 ? 0 : star_num >= 10 ? 10 : star_num;\n      this.score = score_percent * half_star_score;\n      needEmit && this.$emit('fmRaterScoreChanged', { score: this.score });\n    }\n  },\n  mounted () {\n    if (weex.config.env.platform !== 'Android') {\n      setTimeout(() => {\n        dom.getComponentRect(this.$refs.rater, option => {\n          this.offset_left = option.size.left;\n        });\n      }, 50);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _fmImage = __webpack_require__(5);

var _fmImage2 = _interopRequireDefault(_fmImage);

var _type = __webpack_require__(186);

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = weex.requireModule('dom'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmRater',
  components: { FmIcon: _fmIcon2.default, FmImage: _fmImage2.default },
  props: {
    score: {
      type: Number,
      default: 5
    },
    fullScore: {
      type: Number,
      default: 10
    },
    size: {
      type: String,
      default: 'big'
    },
    theme: {
      type: String,
      default: 'normal'
    },
    canChange: {
      type: Boolean,
      default: true
    },
    canSlide: {
      type: Boolean,
      default: true
    },
    starImg: {
      type: [Array, String],
      default: ''
    },
    bgImg: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      offset_left: 0,
      starCount: 5
    };
  },
  computed: {
    starClz: function starClz() {
      var clz = ['star'];
      this.size === 'big' ? clz.push('star_big') : clz.push('star_small');
      return clz;
    },
    wraperWidth: function wraperWidth() {
      var score = this.score,
          fullScore = this.fullScore,
          size = this.size;

      var half_star_width = size === 'big' ? 43 : 18;
      var percent = score / fullScore;
      var length = score <= 0 ? 0 : percent >= 1 ? 10 : percent.toFixed(1) * 10;
      length = isNaN(length) ? 0 : length;
      return !length ? {
        width: 1,
        opacity: 0
      } : {
        width: length * half_star_width,
        opacity: 1
      };
    },
    getImgs: function getImgs() {
      var theme = this.theme,
          starImg = this.starImg;

      var imgItem = void 0;
      if (starImg) {
        if (Array.isArray(starImg)) {
          return starImg;
        }
        imgItem = starImg;
      } else if (theme === 'normal') {
        return _type2.default.NORMAL;
      } else if (theme === 'special') {
        imgItem = _type2.default.SPECIAL;
      } else if (theme === 'dark') {
        imgItem = _type2.default.DARK;
      }
      var arr = [];
      for (var i = 0; i < 5; i++) {
        arr.push(imgItem);
      }
      return arr;
    },
    getBgImgs: function getBgImgs() {
      var theme = this.theme,
          bgImg = this.bgImg;

      if (bgImg) {
        return bgImg;
      }
      if (theme === 'normal' || theme === 'special') {
        return _type2.default.BG_NORMAL;
      } else if (theme === 'dark') {
        return _type2.default.BG_DARK;
      }
    }
  },
  methods: {
    raterTouchStart: function raterTouchStart(e) {
      var canChange = this.canChange,
          canSlide = this.canSlide;

      if (!canChange || !canSlide) return;
      this.calculateScore(e.changedTouches[0].pageX, true);
    },
    raterTouchmove: function raterTouchmove(e) {
      var canChange = this.canChange,
          canSlide = this.canSlide;

      if (!canChange || !canSlide) return;
      this.calculateScore(e.changedTouches[0].pageX, true);
    },
    raterTouchend: function raterTouchend(e) {
      var canChange = this.canChange;

      if (!canChange) return;
      this.calculateScore(e.changedTouches[0].pageX, true);
    },
    calculateScore: function calculateScore(pageX, needEmit) {
      var size = this.size,
          fullScore = this.fullScore;

      if (weex.config.env.platform === 'Web') {
        pageX = pageX * 2 / 750 * 1080 - this.offset_left;
      } else if (weex.config.env.platform === 'iOS') {
        pageX = pageX - this.offset_left;
      }
      var half_star_width = size === 'big' ? 43 : 18;
      var half_star_score = fullScore / 10;
      var star_num = (pageX / half_star_width).toFixed(0);
      var score_percent = star_num <= 0 ? 0 : star_num >= 10 ? 10 : star_num;
      this.score = score_percent * half_star_score;
      needEmit && this.$emit('fmRaterScoreChanged', { score: this.score });
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (weex.config.env.platform !== 'Android') {
      setTimeout(function () {
        dom.getComponentRect(_this.$refs.rater, function (option) {
          _this.offset_left = option.size.left;
        });
      }, 50);
    }
  }
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Yanjiie on 18/04/25
 */
exports.default = {
  NORMAL: ['https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star1.png', 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star2.png', 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star3.png', 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star4.png', 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star5.png'],
  SPECIAL: 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star_special.png',
  DARK: 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star_dark.png',
  BG_NORMAL: 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star_bg.png',
  BG_DARK: 'https://weixin-res.flyme.cn/resources/weex-flymeui/assets/star_dark_bg.png'
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "rater",
    staticClass: "rater-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "touchstart": _vm.raterTouchStart,
      "touchmove": _vm.raterTouchmove,
      "touchend": _vm.raterTouchend
    }
  }, [_c('div', {
    staticClass: "rater-star-bg",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    class: _vm.starClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getBgImgs
    }
  }), _vm._v(" "), _c('image', {
    class: _vm.starClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getBgImgs
    }
  }), _vm._v(" "), _c('image', {
    class: _vm.starClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getBgImgs
    }
  }), _vm._v(" "), _c('image', {
    class: _vm.starClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getBgImgs
    }
  }), _vm._v(" "), _c('image', {
    class: _vm.starClz,
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getBgImgs
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "rater-star",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wraperWidth))
  }, _vm._l((_vm.getImgs), function(item, index) {
    return _c('image', {
      key: index,
      class: _vm.starClz,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "src": item
      }
    })
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8580e67a", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(192),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-81772c76",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-snack-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81772c76", Component.options)
  } else {
    hotAPI.reload("data-v-81772c76", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9893fec4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81772c76\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-81772c76\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-snack-bar[data-v-81772c76] {\n\t\tposition: fixed;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbackground-color: #FFFFFF;\n\t\t-webkit-box-orient: horizontal;\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-flex-direction: row;\n\t\t        flex-direction: row;\n\t\tpadding: 0 0.66667rem;\n\t\t-webkit-box-pack: justify;\n\t\t-webkit-justify-content: space-between;\n\t\t        justify-content: space-between;\n\t\t-webkit-box-align: center;\n\t\t-webkit-align-items: center;\n\t\t        align-items: center;\n\t\tmin-height: 0;\n}\n.title[data-v-81772c76], .closeText[data-v-81772c76] {\n\t\tfont-size: 0.38889rem;\n\t\tfont-family: sans-serif-medium;\n\t\tfont-weight: 500;\n}\n.rotate[data-v-81772c76] {\n\t\tfont-size: 0.5rem;\n    height: 0.5rem;\n\t\tfont-weight: 700;\n\t\t-webkit-transform: rotate(180deg);\n\t\t        transform: rotate(180deg);\n}\n\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-snack-bar/index.vue?9d463c68"],"names":[],"mappings":";AAoBA;EACA,gBAAA;EACA,QAAA;EACA,SAAA;EACA,0BAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,cAAA;CACA;AAEA;EACA,sBAAA;EACA,+BAAA;EACA,iBAAA;CACA;AAEA;EACA,kBAAA;IACA,eAAA;EACA,iBAAA;EACA,kCAAA;UAAA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n\t<div ref=\"fm-snack-bar\"\n\t\tv-if=\"show\"\n\t\t:hack=\"isNeedShow\"\n\t\tclass=\"fm-snack-bar\"\n\t\t:style=\"barStyle\"\n\t\t@click=\"snackClick\">\n\t\t<slot name=\"title\">\n\t\t\t<text class=\"title\" :style=\"{ color: titleColor }\">{{ title }}</text>\n\t\t</slot>\n\t\t<slot name=\"right\">\n\t\t\t<fm-icon v-if=\"type === 'jump'\" name=\"fanhui\" class=\"rotate\" :style=\"{ color: titleColor }\" />\n\t\t\t<text v-else-if=\"type === 'normal'\" class=\"closeText\" :style=\"{ color: closeColor }\" @click=\"ctrClick\">{{ closeText }}</text>\n\t\t</slot>\n\t</div>\n</template>\n\n<style scoped>\n\t.fm-snack-bar {\n\t\tposition: fixed;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbackground-color: #FFFFFF;\n\t\tflex-direction: row;\n\t\tpadding: 0 72px;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tmin-height: 0;\n\t}\n\n\t.title, .closeText {\n\t\tfont-size: 42px;\n\t\tfont-family: sans-serif-medium;\n\t\tfont-weight: 500;\n\t}\n\n\t.rotate {\n\t\tfont-size: 54px;\n    height: 54px;\n\t\tfont-weight: 700;\n\t\ttransform: rotate(180deg);\n\t}\n\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nimport FmIcon from '../fm-icon';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\nexport default {\n  name: 'FmSnackBar',\n  mixins: [Locale],\n  components: { FmIcon },\n  props: {\n    show: {\n      type: Boolean,\n      default: false\n    },\n    backgroundColor: {\n      type: String,\n      default: '#323232'\n    },\n    title: String,\n    titleColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    closeText: {\n      type: String,\n      default () {\n        return t('el.common.close');\n      }\n    },\n    closeColor: {\n      type: String,\n      default: '#198DED'\n    },\n    height: {\n      type: Number,\n      default: 144\n    },\n    animation: {\n      type: Object,\n      default: () => ({\n        timingFunction: 'ease-out'\n      })\n    },\n    autoClose: {\n      type: Boolean,\n      default: true\n    },\n    stayTime: {\n      type: Number,\n      default: 3000\n    },\n    type: {\n      type: String,\n      default: 'normal'\n    },\n    clickCb: Function,\n    dismissCb: Function\n  },\n  computed: {\n    barStyle () {\n      const { height, backgroundColor } = this;\n      return {\n        backgroundColor: backgroundColor,\n        bottom: `${-height}px`,\n        height: `${height}px`\n      };\n    },\n    isNeedShow () {\n      setTimeout(() => {\n        this.appearBar(this.show);\n      }, 50);\n      return this.show;\n    }\n  },\n  data: () => ({\n    timer: null\n  }),\n  methods: {\n    appearBar (bool, duration = 150) {\n      this.isShow = bool;\n      const popupEl = this.$refs['fm-snack-bar'];\n      if (!popupEl) {\n        return;\n      }\n      animation.transition(popupEl, {\n        styles: {\n          transform: this.getTransform(this.height, bool)\n        },\n        duration,\n        delay: 0,\n        ...this.animation\n      }, () => {\n        const { autoClose, stayTime } = this;\n        if (bool && autoClose) {\n          this.timer = setTimeout(() => {\n            this.appearBar(false);\n          }, stayTime);\n        } else if (!bool) {\n          this.dismissCb && this.dismissCb();\n          this.$emit('fmSnackBarDismissed', { pos: this.pos });\n        }\n      });\n    },\n    getTransform (height, bool) {\n      bool || (height = 0);\n      return `translateY(-${height}px)`;\n    },\n    hide () {\n      if (this.timer) {\n        clearTimeout(this.timer);\n        this.timer = null;\n      }\n      this.appearBar(false);\n    },\n    ctrClick () {\n      this.clickCb && this.clickCb();\n      this.hide();\n    },\n    snackClick () {\n      const { type } = this;\n      if (type === 'jump') {\n        this.clickCb && this.clickCb();\n        this.hide();\n      }\n      this.$emit('fmSnackBarBeClicked', {});\n    }\n  }\n};\n</script>\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  name: 'FmSnackBar',
  mixins: [_locale2.default],
  components: { FmIcon: _fmIcon2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#323232'
    },
    title: String,
    titleColor: {
      type: String,
      default: '#FFFFFF'
    },
    closeText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.close');
      }
    },
    closeColor: {
      type: String,
      default: '#198DED'
    },
    height: {
      type: Number,
      default: 144
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-out'
        };
      }
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    stayTime: {
      type: Number,
      default: 3000
    },
    type: {
      type: String,
      default: 'normal'
    },
    clickCb: Function,
    dismissCb: Function
  },
  computed: {
    barStyle: function barStyle() {
      var height = this.height,
          backgroundColor = this.backgroundColor;

      return {
        backgroundColor: backgroundColor,
        bottom: -height + 'px',
        height: height + 'px'
      };
    },
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearBar(_this.show);
      }, 50);
      return this.show;
    }
  },
  data: function data() {
    return {
      timer: null
    };
  },
  methods: {
    appearBar: function appearBar(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;

      this.isShow = bool;
      var popupEl = this.$refs['fm-snack-bar'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.height, bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        var autoClose = _this2.autoClose,
            stayTime = _this2.stayTime;

        if (bool && autoClose) {
          _this2.timer = setTimeout(function () {
            _this2.appearBar(false);
          }, stayTime);
        } else if (!bool) {
          _this2.dismissCb && _this2.dismissCb();
          _this2.$emit('fmSnackBarDismissed', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(height, bool) {
      bool || (height = 0);
      return 'translateY(-' + height + 'px)';
    },
    hide: function hide() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.appearBar(false);
    },
    ctrClick: function ctrClick() {
      this.clickCb && this.clickCb();
      this.hide();
    },
    snackClick: function snackClick() {
      var type = this.type;

      if (type === 'jump') {
        this.clickCb && this.clickCb();
        this.hide();
      }
      this.$emit('fmSnackBarBeClicked', {});
    }
  }
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    ref: "fm-snack-bar",
    staticClass: "fm-snack-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.barStyle)),
    attrs: {
      "hack": _vm.isNeedShow
    },
    on: {
      "click": _vm.snackClick
    }
  }, [_vm._t("title", [_c('text', {
    staticClass: "title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm._t("right", [(_vm.type === 'jump') ? _c('fm-icon', {
    staticClass: "rotate",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    })),
    attrs: {
      "name": "fanhui"
    }
  }) : (_vm.type === 'normal') ? _c('text', {
    staticClass: "closeText",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.closeColor
    })),
    on: {
      "click": _vm.ctrClick
    }
  }, [_vm._v(_vm._s(_vm.closeText))]) : _vm._e()])], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-81772c76", module.exports)
  }
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(194);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(196),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-action-view/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-edee1fe6", Component.options)
  } else {
    hotAPI.reload("data-v-edee1fe6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//

exports.default = {
  name: 'FmActionView',
  props: {
    act: String
  }
};

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.isWeb) ? _c('Fmactiveview', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "act": _vm.act
    }
  }) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-edee1fe6", module.exports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(198);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(199)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(202),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4cf19c5c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-searchbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4cf19c5c", Component.options)
  } else {
    hotAPI.reload("data-v-4cf19c5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("71c99e6c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4cf19c5c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4cf19c5c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-status-bar[data-v-4cf19c5c] {\n    height: 0.61111rem;\n    width: 10rem;\n    background-color: #ffffff;\n}\n.fm-search-bar[data-v-4cf19c5c] {\n    padding: 0 0.44444rem;\n    background-color: #ffffff;\n    width: 10rem;\n    height: 1.33333rem;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n            justify-content: space-between;\n    border-bottom-style: solid;\n    border-bottom-width: 0.01852rem;\n    border-bottom-color: rgba(0, 0, 0, 0.1);\n}\n.search-input-wrap[data-v-4cf19c5c] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n            justify-content: center;\n    padding-left: 0.32407rem;\n    height: 0.83333rem;\n    background-color: rgba(0, 0, 0, 0.05);\n    outline: none;\n    border-radius: 0.41667rem;\n}\n.search-bar-input[data-v-4cf19c5c] {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    height: 0.83333rem;\n    margin-left: 0.22222rem;\n    margin-right: 0.08333rem;\n    line-height: 0.83333rem;\n    font-size: 0.38889rem;\n    background-color: transparent;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    color: #616161;\n}\n.search-bar-icon[data-v-4cf19c5c] {\n    line-height: 0.38889rem;\n    height: 0.38889rem;\n    font-weight: 700;\n}\n.search-bar-back[data-v-4cf19c5c] {\n\t\tmargin-left: -0.16667rem;\n\t\tmargin-right: 0.27778rem;\n    line-height: 0.66667rem;\n    height: 0.66667rem;\n    font-weight: 700;\n}\n.search-bar-delete[data-v-4cf19c5c] {\n    width: 0.55556rem;\n    height: 0.55556rem;\n    margin-right: 0.13889rem;\n    font-weight: 700;\n    padding: 0.03704rem 0 0 0.05556rem;\n    background-color: rgba(77, 77, 77, 0.5);\n    border-radius: 0.27778rem;\n}\n.search-enter[data-v-4cf19c5c] {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 0.44444rem;\n    line-height: 0.88889rem;\n    margin-left: 0.44444rem;\n    color: rgba(0, 0, 0, 0.4);\n    text-align: center;\n}\n.right-btn[data-v-4cf19c5c] {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0.22222rem;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n            justify-content: center;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-searchbar/index.vue?2e1ba57b"],"names":[],"mappings":";AAqCA;IACA,mBAAA;IACA,aAAA;IACA,0BAAA;CACA;AAEA;IACA,sBAAA;IACA,0BAAA;IACA,aAAA;IACA,mBAAA;IACA,+BAAA;IAAA,8BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,0BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,0BAAA;IAAA,uCAAA;YAAA,+BAAA;IACA,2BAAA;IACA,gCAAA;IACA,wCAAA;CACA;AAEA;IACA,oBAAA;IAAA,gBAAA;YAAA,QAAA;IACA,+BAAA;IAAA,8BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,0BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;YAAA,wBAAA;IACA,yBAAA;IACA,mBAAA;IACA,sCAAA;IACA,cAAA;IACA,0BAAA;CACA;AAEA;IACA,oBAAA;IAAA,gBAAA;YAAA,QAAA;IACA,mBAAA;IACA,wBAAA;IACA,yBAAA;IACA,wBAAA;IACA,sBAAA;IACA,8BAAA;IACA,+BAAA;IACA,iBAAA;IACA,eAAA;CACA;AAEA;IACA,wBAAA;IACA,mBAAA;IACA,iBAAA;CACA;AAEA;EACA,yBAAA;EACA,yBAAA;IACA,wBAAA;IACA,mBAAA;IACA,iBAAA;CACA;AAEA;IACA,kBAAA;IACA,mBAAA;IACA,yBAAA;IACA,iBAAA;IACA,mCAAA;IACA,wCAAA;IACA,0BAAA;CACA;AAEA;IACA,+BAAA;IACA,iBAAA;IACA,sBAAA;IACA,wBAAA;IACA,wBAAA;IACA,0BAAA;IACA,mBAAA;CACA;AAEA;IACA,mBAAA;IACA,OAAA;IACA,UAAA;IACA,kBAAA;IACA,yBAAA;IAAA,gCAAA;YAAA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 18/02/26-->\n<template>\n  <div v-if=\"show\">\n    <div class=\"fm-status-bar\" v-if=\"statusbar\" :style=\"{ backgroundColor: backgroundColor, height: `${height - 144}px` }\"></div>\n    <div class=\"fm-search-bar\" :style=\"barStyle\">\n      <slot name=\"left\" v-if=\"hasPrev\">\n        <fm-icon @fmIconClicked=\"onBack\" class=\"search-bar-back\" name=\"fanhui\" :icon-style=\"72\" :color=\"leftColor\"/>\n      </slot>\n        <div class=\"search-input-wrap\" :style=\"inputBackground ? { backgroundColor: inputBackground} : {}\">\n          <fm-icon class=\"search-bar-icon\" name=\"sousuo\" :icon-style=\"42\" :color=\"iconColor\" />\n          <input @blur=\"onBlur\"\n                @focus=\"onFocus\"\n                @input=\"onInput\"\n                @return=\"onSubmit\"\n                :autofocus=\"autofocus\"\n                :disabled=\"disabled\"\n                :value=\"value\"\n                ref=\"input\"\n                :type=\"inputType\"\n                :return-key-type=\"returnKeyType\"\n                :placeholder=\"placeholder\"\n                :style=\"{color: inputColor, 'placeholder-color': placeholderColor}\"\n                class=\"search-bar-input\"/>\n          <fm-icon :style=\"{ opacity: delShow ? 1 : 0 }\" class=\"search-bar-delete\" name=\"guanbi\" :icon-style=\"48\" color=\"#FFFFFF\" @fmIconClicked=\"delClick\" />\n          <div :style=\"{ opacity: !delShow ? 1 : 0 }\" class=\"right-btn\">\n            <slot name=\"input-right\"></slot>\n          </div>\n        </div>\n      <slot name=\"right\">\n        <text v-if=\"searchText\" class=\"search-enter\" @click=\"onSearch\" :style=\"searchTextStyle\">{{ searchText }}</text>\n      </slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-status-bar {\n    height: 66px;\n    width: 1080px;\n    background-color: #ffffff;\n  }\n\n  .fm-search-bar {\n    padding: 0 48px;\n    background-color: #ffffff;\n    width: 1080px;\n    height: 144px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom-style: solid;\n    border-bottom-width: 2px;\n    border-bottom-color: rgba(0, 0, 0, 0.1);\n  }\n\n  .search-input-wrap {\n    flex: 1;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    padding-left: 35px;\n    height: 90px;\n    background-color: rgba(0, 0, 0, 0.05);\n    outline: none;\n    border-radius: 45px;\n  }\n\n  .search-bar-input {\n    flex: 1;\n    height: 90px;\n    margin-left: 24px;\n    margin-right: 9px;\n    line-height: 90px;\n    font-size: 42px;\n    background-color: transparent;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    color: #616161;\n  }\n\n  .search-bar-icon {\n    line-height: 42px;\n    height: 42px;\n    font-weight: 700;\n  }\n\n  .search-bar-back {\n\t\tmargin-left: -18px;\n\t\tmargin-right: 30px;\n    line-height: 72px;\n    height: 72px;\n    font-weight: 700;\n  }\n\n  .search-bar-delete {\n    width: 60px;\n    height: 60px;\n    margin-right: 15px;\n    font-weight: 700;\n    padding: 4px 0 0 6px;\n    background-color: rgba(77, 77, 77, 0.5);\n    border-radius: 30px;\n  }\n\n  .search-enter {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 48px;\n    line-height: 96px;\n    margin-left: 48px;\n    color: rgba(0, 0, 0, 0.4);\n    text-align: center;\n  }\n\n  .right-btn {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 24px;\n    justify-content: center;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\nconst Navigator = weex.requireModule('navigator');\n\nexport default {\n  name: 'FmSearchbar',\n  mixins: [Locale],\n  components: { FmIcon },\n  props: {\n    statusbar: {\n      type: Boolean,\n      default: false\n    },\n    inputValue: {\n      type: [String, Number],\n      default: ''\n    },\n    useDefaultReturn: {\n      type: Boolean,\n      default: true\n    },\n    hasPrev: {\n      type: Boolean,\n      default: true\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    iconColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    leftColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.6)'\n    },\n    inputBackground: String,\n    borderStyle: {\n      type: Object,\n      default: () => ({})\n    },\n    placeholder: String,\n    autofocus: Boolean,\n    disabled: Boolean,\n    inputType: {\n      type: String,\n      default: 'text'\n    },\n    searchText: {\n      type: String,\n      default () {\n        return t('el.searchbar.search');\n      }\n    },\n    searchColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    searchHighlightColor: {\n      type: String,\n      default: '#198DED'\n    },\n    searchTextSize: {\n      type: Number,\n      default: 48\n    },\n    returnKeyType: {\n      type: String,\n      default: 'search'\n    },\n    placeholderColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    inputColor: {\n      type: String,\n      default: '#616161'\n    },\n    show: {\n      type: Boolean,\n      default: true\n    }\n  },\n  watch: {\n    inputValue (val) {\n      this.value = val;\n    }\n  },\n  data: () => ({\n    isFocus: false,\n    value: '',\n    height: 210,\n    statusHeight: 66\n  }),\n  computed: {\n    delShow () {\n      return this.isFocus && this.value;\n    },\n    barStyle () {\n      const style = {\n        borderBottomStyle: 'solid',\n        borderBottomWidth: 2 + 'px',\n        borderBottomColor: 'rgba(0, 0, 0, 0.1)'\n      };\n      Object.assign(style, this.borderStyle);\n      style.backgroundColor = this.backgroundColor;\n      return style;\n    },\n    searchTextStyle () {\n      const { value, searchColor, searchHighlightColor, searchTextSize } = this;\n      return {\n        color: value ? searchHighlightColor : searchColor,\n        fontSize: searchTextSize + 'px'\n      };\n    }\n  },\n  methods: {\n    onBack (e) {\n      const self = this;\n      if (self.useDefaultReturn) {\n        Navigator.pop({}, e => {\n        });\n      }\n      self.$emit('fmSearchbarleftBtnClicked', {});\n    },\n    delClick (e) {\n      this.value = '';\n    },\n    onInput (e) {\n      this.value = e.value;\n      this.$emit('input', e);\n    },\n    onFocus (e) {\n      this.isFocus = true;\n      this.$emit('focus', e);\n    },\n    onBlur (e) {\n      this.isFocus = false;\n      this.$emit('blur', e);\n    },\n    focus () {\n      this.$refs.input.focus();\n    },\n    blur () {\n      this.$refs.input.blur();\n    },\n    onSubmit (e) {\n      this.$emit('fmSearchbarSubmit', { value: this.value });\n    },\n    onSearch (e) {\n      this.$emit('fmSearchbarSubmit', { value: this.value });\n    },\n    setSelectionRange (start, end) {\n      this.$refs.input.setSelectionRange(start, end);\n    },\n    getEditSelectionRange (callback) {\n      this.$refs.input.getEditSelectionRange(callback);\n    },\n    setValue (value) {\n      this.value = value;\n    }\n  },\n  mounted () {\n    this.value = this.inputValue || '';\n  },\n  created () {\n    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {\n      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;\n      this.height = this.statusHeight + 144;\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigator = weex.requireModule('navigator'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmSearchbar',
  mixins: [_locale2.default],
  components: { FmIcon: _fmIcon2.default },
  props: {
    statusbar: {
      type: Boolean,
      default: false
    },
    inputValue: {
      type: [String, Number],
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    hasPrev: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    iconColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    leftColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    inputBackground: String,
    borderStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    placeholder: String,
    autofocus: Boolean,
    disabled: Boolean,
    inputType: {
      type: String,
      default: 'text'
    },
    searchText: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.searchbar.search');
      }
    },
    searchColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    searchHighlightColor: {
      type: String,
      default: '#198DED'
    },
    searchTextSize: {
      type: Number,
      default: 48
    },
    returnKeyType: {
      type: String,
      default: 'search'
    },
    placeholderColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    inputColor: {
      type: String,
      default: '#616161'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    inputValue: function inputValue(val) {
      this.value = val;
    }
  },
  data: function data() {
    return {
      isFocus: false,
      value: '',
      height: 210,
      statusHeight: 66
    };
  },
  computed: {
    delShow: function delShow() {
      return this.isFocus && this.value;
    },
    barStyle: function barStyle() {
      var style = {
        borderBottomStyle: 'solid',
        borderBottomWidth: 2 + 'px',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)'
      };
      Object.assign(style, this.borderStyle);
      style.backgroundColor = this.backgroundColor;
      return style;
    },
    searchTextStyle: function searchTextStyle() {
      var value = this.value,
          searchColor = this.searchColor,
          searchHighlightColor = this.searchHighlightColor,
          searchTextSize = this.searchTextSize;

      return {
        color: value ? searchHighlightColor : searchColor,
        fontSize: searchTextSize + 'px'
      };
    }
  },
  methods: {
    onBack: function onBack(e) {
      var self = this;
      if (self.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      self.$emit('fmSearchbarleftBtnClicked', {});
    },
    delClick: function delClick(e) {
      this.value = '';
    },
    onInput: function onInput(e) {
      this.value = e.value;
      this.$emit('input', e);
    },
    onFocus: function onFocus(e) {
      this.isFocus = true;
      this.$emit('focus', e);
    },
    onBlur: function onBlur(e) {
      this.isFocus = false;
      this.$emit('blur', e);
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    onSubmit: function onSubmit(e) {
      this.$emit('fmSearchbarSubmit', { value: this.value });
    },
    onSearch: function onSearch(e) {
      this.$emit('fmSearchbarSubmit', { value: this.value });
    },
    setSelectionRange: function setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end);
    },
    getEditSelectionRange: function getEditSelectionRange(callback) {
      this.$refs.input.getEditSelectionRange(callback);
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  },
  mounted: function mounted() {
    this.value = this.inputValue || '';
  },
  created: function created() {
    if (weex.supports && weex.supports('@module/view.getStatusBarHeight')) {
      this.statusHeight = weex.requireModule('view').getStatusBarHeight() * 3;
      this.height = this.statusHeight + 144;
    }
  }
};

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', [(_vm.statusbar) ? _c('div', {
    staticClass: "fm-status-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      backgroundColor: _vm.backgroundColor,
      height: ((_vm.height - 144) + "px")
    }))
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "fm-search-bar",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.barStyle))
  }, [(_vm.hasPrev) ? _vm._t("left", [_c('fm-icon', {
    staticClass: "search-bar-back",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": "fanhui",
      "icon-style": 72,
      "color": _vm.leftColor
    },
    on: {
      "fmIconClicked": _vm.onBack
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "search-input-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.inputBackground ? {
      backgroundColor: _vm.inputBackground
    } : {}))
  }, [_c('fm-icon', {
    staticClass: "search-bar-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": "sousuo",
      "icon-style": 42,
      "color": _vm.iconColor
    }
  }), _vm._v(" "), _c('input', {
    ref: "input",
    staticClass: "search-bar-input",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.inputColor,
      'placeholder-color': _vm.placeholderColor
    })),
    attrs: {
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "type": _vm.inputType,
      "return-key-type": _vm.returnKeyType,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "input": _vm.onInput,
      "return": _vm.onSubmit
    }
  }), _vm._v(" "), _c('fm-icon', {
    staticClass: "search-bar-delete",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      opacity: _vm.delShow ? 1 : 0
    })),
    attrs: {
      "name": "guanbi",
      "icon-style": 48,
      "color": "#FFFFFF"
    },
    on: {
      "fmIconClicked": _vm.delClick
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "right-btn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      opacity: !_vm.delShow ? 1 : 0
    }))
  }, [_vm._t("input-right")], 2)], 1), _vm._v(" "), _vm._t("right", [(_vm.searchText) ? _c('text', {
    staticClass: "search-enter",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.searchTextStyle)),
    on: {
      "click": _vm.onSearch
    }
  }, [_vm._v(_vm._s(_vm.searchText))]) : _vm._e()])], 2)]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4cf19c5c", module.exports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(204);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(216),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-multi-check-group/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7670d617", Component.options)
  } else {
    hotAPI.reload("data-v-7670d617", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmMultiCheckCell = __webpack_require__(76);

var _fmMultiCheckCell2 = _interopRequireDefault(_fmMultiCheckCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  componentName: 'FmMultiCheckGroup',
  components: { FmMultiCheckCell: _fmMultiCheckCell2.default },
  props: {
    checking: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: function _default() {
        return [];
      }
    }
  },
  methods: {
    finish: function finish() {
      this.checking = false;
    },
    active: function active() {
      this.checking = true;
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('fmMultiCheckGroupSelected', _value);
    },
    checking: function checking(value) {
      this.$emit('fmMultiCheckGroupStateChange', value);
    }
  }
}; //
//
//
//
//
//
//
//

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(207)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(209),
  /* template */
  __webpack_require__(215),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3e6c11c0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-multi-check-cell/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e6c11c0", Component.options)
  } else {
    hotAPI.reload("data-v-3e6c11c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(208);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("68ea0aca", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e6c11c0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e6c11c0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.check-cell-wrap[data-v-3e6c11c0] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0 0.18519rem;\n}\n.check-cell-wrap[data-v-3e6c11c0]:active {\n  background-color: #eeeeee;\n}\n.right[data-v-3e6c11c0] {\n  width: 0.22222rem;\n  height: 0.22222rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-multi-check-cell/index.vue?79dcfef1"],"names":[],"mappings":";AAcA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <cell class=\"check-cell-wrap\" @longpress=\"onLongpress\" @click=\"onClick\" ripple=\"normal\">\n    <div class=\"wrapper\" ref=\"wrapper\">\n      <slot></slot>\n    </div>\n    <div class=\"right\">\n      <check-icon :show=\"checking\" :checked=\"_selected\" :disabled=\"disabled\"></check-icon>\n    </div>\n  </cell>\n</template>\n\n<style scoped>\n  .check-cell-wrap {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0 20px;\n  }\n\n  .check-cell-wrap:active {\n    background-color: #eeeeee;\n  }\n\n  .right {\n    width: 24px;\n    height: 24px;\n  }\n</style>\n\n<script>\nconst dom = weex.requireModule('dom');\nimport CheckIcon from './check-icon.vue';\n\nexport default {\n  name: 'FmMultiCheckCell',\n  components: { CheckIcon },\n  props: {\n    identity: {\n      type: [String, Object, Number, Array],\n      required: true\n    },\n    disabled: {\n      type: Boolean,\n      default: false\n    }\n  },\n  computed: {\n    _selected: {\n      get () {\n        return this.store.indexOf(this.identity) !== -1;\n      },\n      set (val) {\n        if (val) {\n          this.addToStore();\n        } else {\n          this.deleteFromStore();\n        }\n      }\n    },\n    isGroup () {\n      let parent = this.$parent;\n      while (parent) {\n        if (parent.$options.componentName !== 'FmM\bultiCheckGroup') {\n          parent = parent.$parent;\n        } else {\n          this._group = parent;\n          return true;\n        }\n      }\n      return false;\n    },\n    checking () {\n      return this._group.checking;\n    },\n    store () {\n      return this._group.value;\n    }\n  },\n  methods: {\n    onClick (e) {\n      if (this._group.checking && !this.disabled) {\n        this.toggleSelected();\n      }\n    },\n    toggleSelected () {\n      !this.disabled && (this._selected = !this._selected);\n    },\n    onLongpress (e) {\n      !this._group.checking &&\n          (this._group.checking = true) &&\n          !this.disabled &&\n          (this._selected = true);\n    },\n    addToStore () {\n      const { identity } = this;\n      if (Array.isArray(this.store) && this.store.indexOf(identity) === -1) {\n        this.store.push(identity);\n      }\n    },\n    deleteFromStore () {\n      const { identity } = this;\n      if (Array.isArray(this.store) && this.store.indexOf(identity) !== -1) {\n        this.store.splice(this.store.indexOf(identity), 1);\n      }\n    }\n  },\n  created () {\n    if (!this.isGroup) {\n      throw Error('fm-multi-check-cell must be used in fm-multi-check-group !');\n    }\n  }\n};\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkIcon = __webpack_require__(210);

var _checkIcon2 = _interopRequireDefault(_checkIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
exports.default = {
  name: 'FmMultiCheckCell',
  components: { CheckIcon: _checkIcon2.default },
  props: {
    identity: {
      type: [String, Object, Number, Array],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _selected: {
      get: function get() {
        return this.store.indexOf(this.identity) !== -1;
      },
      set: function set(val) {
        if (val) {
          this.addToStore();
        } else {
          this.deleteFromStore();
        }
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'FmMultiCheckGroup') {
          parent = parent.$parent;
        } else {
          this._group = parent;
          return true;
        }
      }
      return false;
    },
    checking: function checking() {
      return this._group.checking;
    },
    store: function store() {
      return this._group.value;
    }
  },
  methods: {
    onClick: function onClick(e) {
      if (this._group.checking && !this.disabled) {
        this.toggleSelected();
      }
    },
    toggleSelected: function toggleSelected() {
      !this.disabled && (this._selected = !this._selected);
    },
    onLongpress: function onLongpress(e) {
      !this._group.checking && (this._group.checking = true) && !this.disabled && (this._selected = true);
    },
    addToStore: function addToStore() {
      var identity = this.identity;

      if (Array.isArray(this.store) && this.store.indexOf(identity) === -1) {
        this.store.push(identity);
      }
    },
    deleteFromStore: function deleteFromStore() {
      var identity = this.identity;

      if (Array.isArray(this.store) && this.store.indexOf(identity) !== -1) {
        this.store.splice(this.store.indexOf(identity), 1);
      }
    }
  },
  created: function created() {
    if (!this.isGroup) {
      throw Error('fm-multi-check-cell must be used in fm-multi-check-group !');
    }
  }
};

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(211)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(213),
  /* template */
  __webpack_require__(214),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-00ad7ec0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-multi-check-cell/check-icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] check-icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00ad7ec0", Component.options)
  } else {
    hotAPI.reload("data-v-00ad7ec0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(212);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8ede4838", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00ad7ec0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./check-icon.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00ad7ec0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./check-icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.animate-wrap[data-v-00ad7ec0] {\n  width: 0.22222rem;\n  height: 0.22222rem;\n}\n.unchecked[data-v-00ad7ec0] {\n  width: 0.22222rem;\n  height: 0.22222rem;\n}\n.checked[data-v-00ad7ec0] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 0.22222rem;\n  height: 0.22222rem;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  background-color: #ffffff;\n  border-radius: 0.11111rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-multi-check-cell/check-icon.vue?3744be2c"],"names":[],"mappings":";AAkBA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,QAAA;EACA,OAAA;EACA,kBAAA;EACA,mBAAA;EACA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EACA,0BAAA;CACA","file":"check-icon.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <div class=\"check-icon\">\n    <div class=\"animate-wrap\" :hack=\"isNeedShow\" ref=\"animate-wrap\" :style=\"wrapStyle\">\n      <image\n        class=\"unchecked\"\n        :src=\"bgImg\" />\n      <image\n        class=\"checked\"\n        :src=\"getCheckedImg\"\n        ref=\"check-icon\"\n        :watch=\"isNeedChecked\" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .animate-wrap {\n    width: 24px;\n    height: 24px;\n  }\n\n  .unchecked {\n    width: 24px;\n    height: 24px;\n  }\n\n  .checked {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 24px;\n    height: 24px;\n    transform: scale(0);\n    background-color: #ffffff;\n    border-radius: 12px;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nconst animation = weex.requireModule('animation');\nexport default {\n  components: { FmIcon },\n  props: {\n    show: {\n      type: Boolean,\n      default: false\n    },\n    checked: {\n      type: Boolean,\n      default: false\n    },\n    bgImg: {\n      type: String,\n      default:\n          'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_off.png'\n    },\n    checkedImg: {\n      type: String,\n      default:\n          'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on.png'\n    },\n    checkedDisableImg: {\n      type: String,\n      default:\n          'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on_disable.png'\n    },\n    disabled: {\n      type: Boolean,\n      default: false\n    }\n  },\n  watch: {\n    checked (bool) {\n      this.appearChecked(bool);\n    }\n  },\n  data: () => ({}),\n  computed: {\n    getCheckedImg () {\n      const { disabled, checkedImg, checkedDisableImg } = this;\n      return disabled ? checkedDisableImg : checkedImg;\n    },\n    wrapStyle () {\n      return this.show\n        ? {\n          opacity: 1\n        }\n        : {\n          opacity: 0,\n          transform: 'rotateX(90deg)'\n        };\n    },\n    checkedStyle () {\n      return this.checked\n        ? {\n          opacity: 1\n        }\n        : {\n          opacity: 0\n        };\n    },\n    isNeedShow () {\n      this.appear(this.show);\n    },\n    isNeedChecked () {\n      setTimeout(() => {\n        this.appearChecked(this.checked);\n      }, 50);\n    }\n  },\n  methods: {\n    appear (bool, duration = 200) {\n      const animateEl = this.$refs['animate-wrap'];\n      if (!animateEl || !bool) {\n        return;\n      }\n      const style = {\n        transform: 'rotateX(0deg)'\n      };\n      animation.transition(\n        animateEl,\n        {\n          styles: style,\n          duration,\n          delay: 0,\n          timingFunction: 'ease-out'\n        },\n        () => {}\n      );\n    },\n    appearChecked (bool, duration = 30) {\n      const animateEl = this.$refs['check-icon'];\n      if (!animateEl) {\n        return;\n      }\n      const style = bool\n        ? {\n          transform: 'scale(1)'\n        }\n        : {\n          transform: 'scale(0)'\n        };\n      animation.transition(\n        animateEl,\n        {\n          styles: style,\n          duration,\n          delay: 0,\n          timingFunction: 'ease-out'\n        },\n        () => {}\n      );\n    }\n  }\n};\n</script>\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { FmIcon: _fmIcon2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    bgImg: {
      type: String,
      default: 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_off.png'
    },
    checkedImg: {
      type: String,
      default: 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on.png'
    },
    checkedDisableImg: {
      type: String,
      default: 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on_disable.png'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    checked: function checked(bool) {
      this.appearChecked(bool);
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    getCheckedImg: function getCheckedImg() {
      var disabled = this.disabled,
          checkedImg = this.checkedImg,
          checkedDisableImg = this.checkedDisableImg;

      return disabled ? checkedDisableImg : checkedImg;
    },
    wrapStyle: function wrapStyle() {
      return this.show ? {
        opacity: 1
      } : {
        opacity: 0,
        transform: 'rotateX(90deg)'
      };
    },
    checkedStyle: function checkedStyle() {
      return this.checked ? {
        opacity: 1
      } : {
        opacity: 0
      };
    },
    isNeedShow: function isNeedShow() {
      this.appear(this.show);
    },
    isNeedChecked: function isNeedChecked() {
      var _this = this;

      setTimeout(function () {
        _this.appearChecked(_this.checked);
      }, 50);
    }
  },
  methods: {
    appear: function appear(bool) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      var animateEl = this.$refs['animate-wrap'];
      if (!animateEl || !bool) {
        return;
      }
      var style = {
        transform: 'rotateX(0deg)'
      };
      animation.transition(animateEl, {
        styles: style,
        duration: duration,
        delay: 0,
        timingFunction: 'ease-out'
      }, function () {});
    },
    appearChecked: function appearChecked(bool) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

      var animateEl = this.$refs['check-icon'];
      if (!animateEl) {
        return;
      }
      var style = bool ? {
        transform: 'scale(1)'
      } : {
        transform: 'scale(0)'
      };
      animation.transition(animateEl, {
        styles: style,
        duration: duration,
        delay: 0,
        timingFunction: 'ease-out'
      }, function () {});
    }
  }
};

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "check-icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    ref: "animate-wrap",
    staticClass: "animate-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle)),
    attrs: {
      "hack": _vm.isNeedShow
    }
  }, [_c('image', {
    staticClass: "unchecked",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.bgImg
    }
  }), _vm._v(" "), _c('image', {
    ref: "check-icon",
    staticClass: "checked",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.getCheckedImg,
      "watch": _vm.isNeedChecked
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-00ad7ec0", module.exports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('cell', {
    staticClass: "check-cell-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "ripple": "normal"
    },
    on: {
      "longpress": _vm.onLongpress,
      "click": _vm.onClick
    }
  }, [_c('div', {
    ref: "wrapper",
    staticClass: "wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "right",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('check-icon', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "show": _vm.checking,
      "checked": _vm._selected,
      "disabled": _vm.disabled
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e6c11c0", module.exports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', {
    ref: "group",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7670d617", module.exports)
  }
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(218);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(219)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(221),
  /* template */
  __webpack_require__(222),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-fb2a1758",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rcy-check/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb2a1758", Component.options)
  } else {
    hotAPI.reload("data-v-fb2a1758", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(220);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("64a272c2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fb2a1758\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fb2a1758\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.cell[data-v-fb2a1758] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0 0.18519rem;\n  width: 3.33333rem;\n  height: 0.85185rem;\n}\n.check-wrap[data-v-fb2a1758] {\n  width: 0.22222rem;\n  height: 0.22222rem;\n}\n.unchecked[data-v-fb2a1758] {\n  width: 0.22222rem;\n  height: 0.22222rem;\n}\n.checked[data-v-fb2a1758] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 0.22222rem;\n  height: 0.22222rem;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  border-radius: 0.11111rem;\n}\n.loading[data-v-fb2a1758] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-rcy-check/index.vue?a6a21390"],"names":[],"mappings":";AAgDA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sBAAA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,QAAA;EACA,OAAA;EACA,kBAAA;EACA,mBAAA;EACA,4BAAA;UAAA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created and Update by Yanjiie on 2018/04/12. -->\n<template>\n  <recycle-list\n    ref=\"rcy\"\n    template-key=\"type\"\n    alias=\"item\"\n    index=\"i\"\n    append='tree'\n    @loadmore=\"$onLoadMore()\"\n    showScrollbar=\"true\" style='width:360px'\n    @mlongclick=\"$onCellLongpress\"\n    for=\"(item, i) in dataSource\">\n\n    <cell-slot template-type=\"check-cell\" :itemId=\"item.itemId\" @click=\"$onCellCheck(item, i)\" ripple=\"normal\">\n      <div>\n        <div class=\"cell\">\n          <!-- Content start -->\n          <div class=\"content\">\n            <text>{{ item.itemId }}</text>\n            <text v-once :a=\"i\">{{ i }}</text>\n          </div>\n          <!-- Content end -->\n\n          <!-- Right circle start -->\n          <div class=\"check-wrap\" v-if=\"item.checking\">\n            <image\n              class=\"unchecked\"\n              src=\"http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_off.png\" />\n            <image\n              class=\"checked\"\n              v-if=\"item.checked\"\n              :src=\"item.disabled ? 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on_disable.png' : 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on.png'\"\n            />\n          </div>\n          <!-- Right circle end -->\n        </div>\n      </div>\n    </cell-slot>\n\n    <loading class=\"loading\" @loading=\"onloading\" display=\"hide\">\n      <text class=\"indicator\" ref=\"loadText\">正在加载中 ..</text>\n    </loading>\n\n  </recycle-list>\n</template>\n\n<style scoped>\n  .cell {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0 20px;\n    width: 360px;\n    height: 92px;\n  }\n\n  .check-wrap {\n    width: 24px;\n    height: 24px;\n  }\n\n  .unchecked {\n    width: 24px;\n    height: 24px;\n  }\n\n  .checked {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 24px;\n    height: 24px;\n    transform: scale(0);\n    border-radius: 12px;\n  }\n\n  .loading {\n    justify-content: center;\n  }\n</style>\n\n<script>\nexport default {\n  props: {\n    // List dataSource\n    dataSource: {\n      type: Array,\n      default: () => []\n    },\n    // Custom load data function\n    loadData: Function\n  },\n  data () {\n    return {\n      // Is checkind state\n      checking: false,\n      // Is load end\n      end: false\n    };\n  },\n  computed: {\n    recycleList () {\n      return this.$refs.rcy;\n    }\n  },\n  methods: {\n    /*\n       * InSide Function\n       */\n    // Handle cell be longpress\n    $onCellLongpress (e) {\n      if (!this.checking) {\n        const index = e.index;\n        const tmp = [];\n        this.recycleList.getListDataSize(res => {\n          this.checking = true;\n          this.recycleList.resetLoadmore();\n          this.recycleList.setPullLoadEnable(false);\n          for (let i = 0; i < res; i++) {\n            this.dataSource[i].checking = this.checking;\n            tmp.push(this.dataSource[i]);\n          }\n          tmp[index].checked = true;\n          this.dataSource = tmp;\n          this.recycleList.setListData(this.dataSource);\n          this.$emit('fmRcyCheckStateChange', true);\n        });\n      }\n    },\n    // Handle cell be click\n    $onCellCheck (item, i) {\n      if (item.checking) {\n        item.checked = !item.checked;\n        this.dataSource[i] = item;\n        this.recycleList.updateData(this.dataSource[i], i);\n        this.$emit('fmRcyCheckValueChange', this.dataSource);\n      } else {\n        this.$emit('fmRcyCheckCellBeClick', { value: item, index: i });\n      }\n    },\n    // Handle list loadmore, is a js hook\n    $onLoadMore () {\n      if (!this.checking && !this.end) {\n        if (this.loadData && typeof this.loadData === 'function') { this.loadData(); }\n      }\n      if (!this.checked) {\n        this.recycleList.setLoadingDisplay('hide');\n        this.recycleList.setPullLoadEnable(false);\n      } else if (!this.end) {\n        setTimeout(() => {\n          this.recycleList.setLoadingDisplay('hide');\n          this.recycleList.setPullLoadEnable(true);\n          this.recycleList.resetLoadmore();\n        }, 400);\n      }\n    },\n\n    /*\n       * OutSide Function\n       */\n    // Quit checking model if this.checking is true, will emit @fmRcyCheckFinish Event.\n    finish () {\n      if (this.checking) {\n        this.recycleList.getListDataSize(res => {\n          const tmp = [];\n          const checkList = [];\n          const checkIndex = [];\n          this.checking = false;\n          this.recycleList.setPullLoadEnable(true);\n          this.recycleList.resetLoadmore();\n          for (let i = 0; i < res; i++) {\n            this.dataSource[i].checking = this.checking;\n            this.dataSource[i].checked && (checkList.push(this.dataSource[i])) && (checkIndex.push(i));\n            tmp.push(this.dataSource[i]);\n          }\n          this.dataSource = tmp;\n          this.recycleList.setListData(this.dataSource);\n          this.$emit('fmRcyCheckFinish', { indexs: checkIndex, values: checkList });\n          this.$emit('fmRcyCheckStateChange', false);\n        });\n      }\n    },\n    // Toggle all item's checked state when in checking Model, will emit @fmRcyCheckValueChange Event.\n    toggleAll (bool) {\n      if (this.checking) {\n        const tmp = [];\n        this.recycleList.getListDataSize(res => {\n          for (let i = 0; i < res; i++) {\n            this.dataSource[i].checked = bool;\n            tmp.push(this.dataSource[i]);\n          }\n          this.dataSource = tmp;\n          this.recycleList.setListData(this.dataSource);\n          this.$emit('fmRcyCheckValueChange', this.dataSource);\n        });\n      }\n    },\n    // Append data at this.dataSource and append item at recycle-list.\n    appendData (data) {\n      this.dataSource = this.dataSource.concat(data);\n      this.recycleList.appendData(data);\n    },\n    // Remove data from this.dataSource and remove item from recycle-list.\n    removeData (array) {\n      this.dataSource = this.dataSource.filter((value, index) => {\n        return array.indexOf(index) < 0;\n      });\n      this.recycleList.removeData(array);\n      this.$emit('fmRcyCheckValueChange', this.dataSource);\n    },\n    // When this.loadData function complete, call this function to reset loading state.\n    resetLoading () {\n      this.recycleList.setLoadingDisplay('hide');\n    },\n    // Set loading no more data Tip and change loading state.\n    loadingEnd (tipStr) {\n      this.end = true;\n      this.$refs.loadText.setAttr('value', tipStr, false);\n      setTimeout(() => {\n        this.recycleList.setLoadingDisplay('hide');\n        this.recycleList.setPullLoadEnable(true);\n        this.recycleList.resetLoadmore();\n      }, 400);\n    },\n    // Reset loding, make it can load more again.\n    resetLoadMore () {\n      this.end = true;\n      this.recycleList.setPullLoadEnable(true);\n      this.recycleList.resetLoadmore();\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    // List dataSource
    dataSource: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // Custom load data function
    loadData: Function
  },
  data: function data() {
    return {
      // Is checkind state
      checking: false,
      // Is load end
      end: false
    };
  },

  computed: {
    recycleList: function recycleList() {
      return this.$refs.rcy;
    }
  },
  methods: {
    /*
       * InSide Function
       */
    // Handle cell be longpress
    $onCellLongpress: function $onCellLongpress(e) {
      var _this = this;

      if (!this.checking) {
        var index = e.index;
        var tmp = [];
        this.recycleList.getListDataSize(function (res) {
          _this.checking = true;
          _this.recycleList.resetLoadmore();
          _this.recycleList.setPullLoadEnable(false);
          for (var i = 0; i < res; i++) {
            _this.dataSource[i].checking = _this.checking;
            tmp.push(_this.dataSource[i]);
          }
          tmp[index].checked = true;
          _this.dataSource = tmp;
          _this.recycleList.setListData(_this.dataSource);
          _this.$emit('fmRcyCheckStateChange', true);
        });
      }
    },

    // Handle cell be click
    $onCellCheck: function $onCellCheck(item, i) {
      if (item.checking) {
        item.checked = !item.checked;
        this.dataSource[i] = item;
        this.recycleList.updateData(this.dataSource[i], i);
        this.$emit('fmRcyCheckValueChange', this.dataSource);
      } else {
        this.$emit('fmRcyCheckCellBeClick', { value: item, index: i });
      }
    },

    // Handle list loadmore, is a js hook
    $onLoadMore: function $onLoadMore() {
      var _this2 = this;

      if (!this.checking && !this.end) {
        if (this.loadData && typeof this.loadData === 'function') {
          this.loadData();
        }
      }
      if (!this.checked) {
        this.recycleList.setLoadingDisplay('hide');
        this.recycleList.setPullLoadEnable(false);
      } else if (!this.end) {
        setTimeout(function () {
          _this2.recycleList.setLoadingDisplay('hide');
          _this2.recycleList.setPullLoadEnable(true);
          _this2.recycleList.resetLoadmore();
        }, 400);
      }
    },


    /*
       * OutSide Function
       */
    // Quit checking model if this.checking is true, will emit @fmRcyCheckFinish Event.
    finish: function finish() {
      var _this3 = this;

      if (this.checking) {
        this.recycleList.getListDataSize(function (res) {
          var tmp = [];
          var checkList = [];
          var checkIndex = [];
          _this3.checking = false;
          _this3.recycleList.setPullLoadEnable(true);
          _this3.recycleList.resetLoadmore();
          for (var i = 0; i < res; i++) {
            _this3.dataSource[i].checking = _this3.checking;
            _this3.dataSource[i].checked && checkList.push(_this3.dataSource[i]) && checkIndex.push(i);
            tmp.push(_this3.dataSource[i]);
          }
          _this3.dataSource = tmp;
          _this3.recycleList.setListData(_this3.dataSource);
          _this3.$emit('fmRcyCheckFinish', { indexs: checkIndex, values: checkList });
          _this3.$emit('fmRcyCheckStateChange', false);
        });
      }
    },

    // Toggle all item's checked state when in checking Model, will emit @fmRcyCheckValueChange Event.
    toggleAll: function toggleAll(bool) {
      var _this4 = this;

      if (this.checking) {
        var tmp = [];
        this.recycleList.getListDataSize(function (res) {
          for (var i = 0; i < res; i++) {
            _this4.dataSource[i].checked = bool;
            tmp.push(_this4.dataSource[i]);
          }
          _this4.dataSource = tmp;
          _this4.recycleList.setListData(_this4.dataSource);
          _this4.$emit('fmRcyCheckValueChange', _this4.dataSource);
        });
      }
    },

    // Append data at this.dataSource and append item at recycle-list.
    appendData: function appendData(data) {
      this.dataSource = this.dataSource.concat(data);
      this.recycleList.appendData(data);
    },

    // Remove data from this.dataSource and remove item from recycle-list.
    removeData: function removeData(array) {
      this.dataSource = this.dataSource.filter(function (value, index) {
        return array.indexOf(index) < 0;
      });
      this.recycleList.removeData(array);
      this.$emit('fmRcyCheckValueChange', this.dataSource);
    },

    // When this.loadData function complete, call this function to reset loading state.
    resetLoading: function resetLoading() {
      this.recycleList.setLoadingDisplay('hide');
    },

    // Set loading no more data Tip and change loading state.
    loadingEnd: function loadingEnd(tipStr) {
      var _this5 = this;

      this.end = true;
      this.$refs.loadText.setAttr('value', tipStr, false);
      setTimeout(function () {
        _this5.recycleList.setLoadingDisplay('hide');
        _this5.recycleList.setPullLoadEnable(true);
        _this5.recycleList.resetLoadmore();
      }, 400);
    },

    // Reset loding, make it can load more again.
    resetLoadMore: function resetLoadMore() {
      this.end = true;
      this.recycleList.setPullLoadEnable(true);
      this.recycleList.resetLoadmore();
    }
  }
};

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('recycle-list', {
    ref: "rcy",
    staticStyle: _vm.$processStyle({
      "width": "360px"
    }),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "template-key": "type",
      "alias": "item",
      "index": "i",
      "append": "tree",
      "showScrollbar": "true",
      "for": "(item, i) in dataSource"
    },
    on: {
      "loadmore": function($event) {
        _vm.$onLoadMore()
      },
      "mlongclick": _vm.$onCellLongpress
    }
  }, [_c('cell-slot', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "template-type": "check-cell",
      "itemId": _vm.item.itemId,
      "ripple": "normal"
    },
    on: {
      "click": function($event) {
        _vm.$onCellCheck(_vm.item, _vm.i)
      }
    }
  }, [_c('div', [_c('div', {
    staticClass: "cell",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('text', [_vm._v(_vm._s(_vm.item.itemId))]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), (_vm.item.checking) ? _c('div', {
    staticClass: "check-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('image', {
    staticClass: "unchecked",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": "http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_off.png"
    }
  }), _vm._v(" "), (_vm.item.checked) ? _c('image', {
    staticClass: "checked",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "src": _vm.item.disabled ? 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on_disable.png' : 'http://design.flyme.cn/weexui/assets/mz_btn_check_button_square_on.png'
    }
  }) : _vm._e()]) : _vm._e()])])]), _vm._v(" "), _c('loading', {
    staticClass: "loading",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "display": "hide"
    },
    on: {
      "loading": _vm.onloading
    }
  }, [_c('text', {
    ref: "loadText",
    staticClass: "indicator",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v("正在加载中 ..")])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('text', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "a": _vm.i
    }
  }, [_vm._v(_vm._s(_vm.i))])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fb2a1758", module.exports)
  }
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(224);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(225)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(227),
  /* template */
  __webpack_require__(233),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d7ab306c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-list/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d7ab306c", Component.options)
  } else {
    hotAPI.reload("data-v-d7ab306c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(226);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("762fa0ae", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d7ab306c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d7ab306c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.list-wrap[data-v-d7ab306c] {\n  width: 10rem;\n}\n.title-wrap[data-v-d7ab306c] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  padding: 0.25rem 0.4537rem;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.title-text[data-v-d7ab306c] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.33333rem;\n  line-height: 0.5rem;\n}\n.title-rightBtn[data-v-d7ab306c] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.33333rem;\n  line-height: 0.5rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-list/index.vue?32fc87e9"],"names":[],"mappings":";AAyBA;EACA,aAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,2BAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,oBAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/3/5. -->\n<template>\n  <div class=\"list-wrap\">\n    <div class=\"title-wrap\">\n      <slot name=\"left\">\n        <text class=\"title-text\" :style=\"{ color: titleColor }\">{{ title }}</text>\n      </slot>\n      <slot name=\"right\">\n        <text class=\"title-rightBtn\" :style=\"{ color: rightColor }\" @click=\"btnClicked\">{{ rightText }}</text>\n      </slot>\n    </div>\n    <div class=\"item-wrap\">\n      <item v-for=\"(item, index) in list\"\n            v-bind=\"Object.assign({}, customStyles, item)\"\n            :key=\"index\"\n            :index=\"index\"\n            @select=\"onSelect(index)\"\n            @leftClicked=\"leftIconClicked(index)\"\n            @rightClicked=\"rightIconClicked(index)\" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .list-wrap {\n    width: 1080px;\n  }\n\n  .title-wrap {\n    flex-direction: row;\n    padding: 27px 49px;\n    justify-content: space-between;\n  }\n\n  .title-text {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 36px;\n    line-height: 54px;\n  }\n\n  .title-rightBtn {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 36px;\n    line-height: 54px;\n  }\n</style>\n\n<script>\nimport Item from './item.vue';\nimport Locale from 'weex-flymeui/lib/mixins/locale';\nimport { t } from 'weex-flymeui/lib/locale';\n\nexport default {\n  name: 'FmSimpleList',\n  mixins: [Locale],\n  components: { Item },\n  props: {\n    list: {\n      type: Array,\n      default: () => ([])\n    },\n    title: {\n      type: String,\n      default () {\n        return t('el.common.title');\n      }\n    },\n    titleColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    rightText: {\n      type: String,\n      default: ''\n    },\n    rightColor: {\n      type: String,\n      default: '#198DED'\n    },\n    customStyles: {\n      type: Object,\n      default: () => ({})\n    }\n  },\n  methods: {\n    onSelect (index) {\n      this.$emit('fmSimpleListSelected', { model: this.list[index], index });\n    },\n    btnClicked () {\n      this.$emit('fmSimpleListRightBtnClicked');\n    },\n    leftIconClicked (index) {\n      this.$emit('fmSimpleListLeftIconClicked', { model: this.list[index], index });\n    },\n    rightIconClicked (index) {\n      this.$emit('fmSimpleListRightIconClicked', { model: this.list[index], index });\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(228);

var _item2 = _interopRequireDefault(_item);

var _locale = __webpack_require__(33);

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmSimpleList',
  mixins: [_locale2.default],
  components: { Item: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    title: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.common.title');
      }
    },
    titleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    rightText: {
      type: String,
      default: ''
    },
    rightColor: {
      type: String,
      default: '#198DED'
    },
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    onSelect: function onSelect(index) {
      this.$emit('fmSimpleListSelected', { model: this.list[index], index: index });
    },
    btnClicked: function btnClicked() {
      this.$emit('fmSimpleListRightBtnClicked');
    },
    leftIconClicked: function leftIconClicked(index) {
      this.$emit('fmSimpleListLeftIconClicked', { model: this.list[index], index: index });
    },
    rightIconClicked: function rightIconClicked(index) {
      this.$emit('fmSimpleListRightIconClicked', { model: this.list[index], index: index });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(229)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(231),
  /* template */
  __webpack_require__(232),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6f5a0a6a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-list/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f5a0a6a", Component.options)
  } else {
    hotAPI.reload("data-v-6f5a0a6a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("53971798", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f5a0a6a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f5a0a6a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.list-item[data-v-6f5a0a6a] {\n  padding: 0 0.44444rem;\n}\n.list-item[data-v-6f5a0a6a]:active {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.item-wrap[data-v-6f5a0a6a] {\n  height: 1.33333rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.text-title[data-v-6f5a0a6a] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-overflow: ellipsis;\n  font-size: 0.38889rem;\n  margin-right: 0.24074rem;\n  lines: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.icon[data-v-6f5a0a6a] {\n  margin: 0.11111rem;\n  font-size: 0.44444rem;\n  height: 0.44444rem;\n  font-weight: 700;\n}\n.icon-left[data-v-6f5a0a6a] {\n  margin-right: 0.35185rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-list/item.vue?15b0616e","/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-simple-list/<no source>"],"names":[],"mappings":";AAiBA;EACA,sBAAA;CACA;AAEA;EACA,sCAAA;CACA;AAEA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,wBAAA;EACA,sBAAA;EACA,yBAAA;EACA,SAAA;ECrCA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDsCA;AAEA;EACA,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;CACA;AAEA;EACA,yBAAA;CACA","file":"item.vue","sourcesContent":["<!-- Created by Yanjiie on 2018/3/5. -->\n<template>\n  <div class=\"list-item\" @click=\"onClick\">\n    <div class=\"item-wrap\" :style=\"wrapStyle\">\n      <fm-icon class=\"icon icon-left\" v-if=\"leftIcon || originLeftIcon\"\n                                      :name=\"leftIcon || originLeftIcon\"\n                                      :color='leftColor || originIconColor'\n                                      @fmIconClicked=\"onLeftClick\" />\n      <text class=\"text-title\" :style=\"titleStyle\">{{ title }}</text>\n      <fm-icon class=\"icon\" :name=\"rightIcon || originRightIcon\"\n                            :color='rightColor || originIconColor'\n                            @fmIconClicked=\"onRightClick\" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .list-item {\n    padding: 0 48px;\n  }\n\n  .list-item:active {\n    background-color: rgba(0, 0, 0, 0.04);\n  }\n\n  .item-wrap {\n    height: 144px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .text-title {\n    flex: 1;\n    text-overflow: ellipsis;\n    font-size: 42px;\n    margin-right: 26px;\n    lines: 1;\n  }\n\n  .icon {\n    margin: 12px;\n    font-size: 48px;\n    height: 48px;\n    font-weight: 700;\n  }\n\n  .icon-left {\n    margin-right: 38px;\n  }\n</style>\n\n<script>\nimport FmIcon from '../fm-icon';\nexport default {\n  components: { FmIcon },\n  props: {\n    index: {\n      type: Number,\n      default: -1\n    },\n    title: {\n      type: String,\n      default: ''\n    },\n    color: {\n      type: String,\n      default: ''\n    },\n    fontSize: {\n      type: Number,\n      default: 42\n    },\n    borderWidth: {\n      type: Number,\n      default: 2\n    },\n    borderColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.1)'\n    },\n    leftIcon: {\n      type: String,\n      default: ''\n    },\n    leftColor: {\n      type: String,\n      default: ''\n    },\n    rightIcon: {\n      type: String,\n      default: ''\n    },\n    rightColor: {\n      type: String,\n      default: ''\n    },\n    originTitleColor: {\n      type: String,\n      default: '#000000'\n    },\n    originLeftIcon: {\n      type: String,\n      default: 'shizhong'\n    },\n    originRightIcon: {\n      type: String,\n      default: 'guanbi'\n    },\n    originIconColor: {\n      type: String,\n      default: '#999999'\n    }\n  },\n  computed: {\n    wrapStyle () {\n      const { borderWidth, borderColor } = this;\n      return {\n        borderBottomWidth: borderWidth + 'px',\n        borderColor,\n        height: '144px',\n        flexDirection: 'row',\n        alignItems: 'center',\n        justifyContent: 'space-between'\n      };\n    },\n    titleStyle () {\n      const { color, originTitleColor, fontSize } = this;\n      return {\n        fontSize: fontSize + 'px',\n        color: color || originTitleColor\n      };\n    }\n  },\n  methods: {\n    onClick () {\n      this.$emit('select', this.index);\n    },\n    onLeftClick () {\n      this.$emit('leftClicked', this.index);\n    },\n    onRightClick () {\n      this.$emit('rightClicked', this.index);\n    }\n  }\n};\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { FmIcon: _fmIcon2.default },
  props: {
    index: {
      type: Number,
      default: -1
    },
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 42
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    leftIcon: {
      type: String,
      default: ''
    },
    leftColor: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    },
    rightColor: {
      type: String,
      default: ''
    },
    originTitleColor: {
      type: String,
      default: '#000000'
    },
    originLeftIcon: {
      type: String,
      default: 'shizhong'
    },
    originRightIcon: {
      type: String,
      default: 'guanbi'
    },
    originIconColor: {
      type: String,
      default: '#999999'
    }
  },
  computed: {
    wrapStyle: function wrapStyle() {
      var borderWidth = this.borderWidth,
          borderColor = this.borderColor;

      return {
        borderBottomWidth: borderWidth + 'px',
        borderColor: borderColor,
        height: '144px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      };
    },
    titleStyle: function titleStyle() {
      var color = this.color,
          originTitleColor = this.originTitleColor,
          fontSize = this.fontSize;

      return {
        fontSize: fontSize + 'px',
        color: color || originTitleColor
      };
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('select', this.index);
    },
    onLeftClick: function onLeftClick() {
      this.$emit('leftClicked', this.index);
    },
    onRightClick: function onRightClick() {
      this.$emit('rightClicked', this.index);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.onClick
    }
  }, [_c('div', {
    staticClass: "item-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapStyle))
  }, [(_vm.leftIcon || _vm.originLeftIcon) ? _c('fm-icon', {
    staticClass: "icon icon-left",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": _vm.leftIcon || _vm.originLeftIcon,
      "color": _vm.leftColor || _vm.originIconColor
    },
    on: {
      "fmIconClicked": _vm.onLeftClick
    }
  }) : _vm._e(), _vm._v(" "), _c('text', {
    staticClass: "text-title",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.titleStyle))
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('fm-icon', {
    staticClass: "icon",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "name": _vm.rightIcon || _vm.originRightIcon,
      "color": _vm.rightColor || _vm.originIconColor
    },
    on: {
      "fmIconClicked": _vm.onRightClick
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f5a0a6a", module.exports)
  }
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    staticClass: "title-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._t("left", [_c('text', {
    staticClass: "title-text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.titleColor
    }))
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm._t("right", [_c('text', {
    staticClass: "title-rightBtn",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      color: _vm.rightColor
    })),
    on: {
      "click": _vm.btnClicked
    }
  }, [_vm._v(_vm._s(_vm.rightText))])])], 2), _vm._v(" "), _c('div', {
    staticClass: "item-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.list), function(item, index) {
    return _c('item', _vm._b({
      key: index,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "index": index
      },
      on: {
        "select": function($event) {
          _vm.onSelect(index)
        },
        "leftClicked": function($event) {
          _vm.leftIconClicked(index)
        },
        "rightClicked": function($event) {
          _vm.rightIconClicked(index)
        }
      }
    }, 'item', Object.assign({}, _vm.customStyles, item), false))
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d7ab306c", module.exports)
  }
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(235);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(236)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(238),
  /* template */
  __webpack_require__(239),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c6e0f338",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-native-tab/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c6e0f338", Component.options)
  } else {
    hotAPI.reload("data-v-c6e0f338", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(237);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("707f6952", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c6e0f338\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c6e0f338\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-tab-page[data-v-c6e0f338] {\n  width: 10rem;\n}\n.tab-title-list[data-v-c6e0f338] {\n  width: 10rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  border-bottom-width: 0.01852rem;\n  border-color: rgba(0,0,0,0.10);\n}\n.tab-title-wrap[data-v-c6e0f338] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  padding: 0 0.44444rem;\n}\n.title-item[data-v-c6e0f338] {\n  border-color: #198DED;\n  padding: 0.25rem 0.16667rem;\n  margin-right: 0.38889rem;\n}\n.item-title[data-v-c6e0f338] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.38889rem;\n  line-height: 0.52778rem;\n}\n.border-bottom[data-v-c6e0f338] {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 0.02778rem;\n  width: 1.22222rem;\n}\n.tab-page-wrap[data-v-c6e0f338] {\n  width: 10rem;\n  overflow: hidden;\n}\n.tab-container[data-v-c6e0f338] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n}\n.tab-item[data-v-c6e0f338] {\n  width: 10rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-native-tab/index.vue?d45ecf22"],"names":[],"mappings":";AAqEA;EACA,aAAA;CACA;AAEA;EACA,aAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,gCAAA;EACA,+BAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sCAAA;UAAA,8BAAA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;EACA,4BAAA;EACA,yBAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,QAAA;EACA,UAAA;EACA,mBAAA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 18/04/03. -->\n<template>\n  <div v-if=\"!isCreator\" class=\"fm-tab-page\"\n       :style=\"{ height: (tabPageHeight) + 'px', opacity: loaded ? 1 : 0}\">\n    <scroller class=\"tab-title-list\"\n              ref=\"tab-title-list\"\n              :show-scrollbar=\"false\"\n              scroll-direction=\"horizontal\"\n              :style=\"{ height: (cTabStyles.height) + 'px'}\">\n\n      <div class=\"tab-title-wrap\"\n           ref=\"tab-title-wrap\">\n        <div class=\"title-item\"\n             v-for=\"(v, idx) in tabTitles\"\n             :key=\"idx\"\n             @click=\"setPage(idx)\"\n             :ref=\"'fm-tab-title-'+idx\"\n             :style=\"{ borderBottomWidth: currentPage === idx ? '3px' : '0px' }\">\n          <text class=\"item-title\"\n                :style=\"{ fontSize: cTabStyles.fontSize + 'px',\n                          color: currentPage === idx ? cTabStyles.activeTitleColor : cTabStyles.titleColor,\n                          paddingLeft: cTabStyles.padding + 'px',\n                          paddingRight: cTabStyles.padding + 'px' }\">{{ v.text }}</text>\n        </div>\n      </div>\n    </scroller>\n    <div class=\"tab-page-wrap\"\n         ref=\"tab-page-wrap\"\n         @panstart=\"_onTouchStart\"\n         @panmove=\"_onTouchMove\"\n         @panend=\"_onTouchEnd\"\n         :style=\"{ height: (tabPageHeight-cTabStyles.height) + 'px' }\">\n      <div class=\"tab-container\"\n           ref=\"tab-container\">\n        <div class=\"tab-item\"\n             v-for=\"(v, idx) in tabTitles\"\n             :key=\"idx\"\n             :style=\"{ height: (tabPageHeight-cTabStyles.height) + 'px' }\">\n          <slot :name=\"`tab-item-${idx}`\"></slot>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <FmTab v-else\n         :style=\"{ height: (tabPageHeight) + 'px' }\"\n         :container=\"{\n            viewpagepaddingLeft: 0,\n            viewpagepaddingRight: 0,\n            viewpagepaddingTop: cTabStyles.height + 12,\n            viewpagepaddingBottom: 0,\n            tabpaddingLeft: 48,\n            tabpaddingRight: 48,\n            tabpaddingTop: 0,\n            tabpaddingBottom: 0\n         }\"\n         :tab=\"cTabTitles\"\n         @tabPosition=\"nativeTabSlided\">\n    <div class=\"tab-item\"\n         v-for=\"(v, idx) in tabTitles\"\n         :key=\"idx\"\n         :style=\"{ height: (tabPageHeight-cTabStyles.height-12) + 'px' }\">\n      <slot :name=\"`tab-item-${idx}`\"></slot>\n    </div>\n  </FmTab>\n</template>\n\n<style scoped>\n  .fm-tab-page {\n    width: 1080px;\n  }\n\n  .tab-title-list {\n    width: 1080px;\n    flex-direction: row;\n    border-bottom-width: 2px;\n    border-color: rgba(0,0,0,0.10);\n  }\n\n  .tab-title-wrap {\n    flex-direction: row;\n    justify-content: space-around;\n    padding: 0 48px;\n  }\n\n  .title-item {\n    border-color: #198DED;\n    padding: 27px 18px;\n    margin-right: 42px;\n  }\n\n  .item-title {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 42px;\n    line-height: 57px;\n  }\n\n  .border-bottom {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 3px;\n    width: 132px;\n  }\n\n  .tab-page-wrap {\n    width: 1080px;\n    overflow: hidden;\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-item {\n    width: 1080px;\n  }\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nconst dom = weex.requireModule('dom');\nconst isH5 = weex.config.env.platform === 'Web';\n\nexport default {\n  name: 'FmNativeTab',\n  props: {\n    tabTitles: {\n      type: Array,\n      default: () => ([])\n    },\n    panDist: {\n      type: Number,\n      default: 200\n    },\n    duration: {\n      type: [Number, String],\n      default: 300\n    },\n    tabPageHeight: {\n      type: [String, Number],\n      default: 1854\n    },\n    tabStyles: {\n      type: Object,\n      default: () => ({})\n    },\n    timingFunction: {\n      type: String,\n      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n    },\n    selectIndex: {\n      type: Number,\n      default: 0\n    }\n  },\n  watch: {\n    selectIndex (val) {\n      if (this.loaded) {\n        this.setPage(this.selectIndex, false);\n      }\n    }\n  },\n  computed: {\n    isCreator () {\n      return weex.supports && weex.supports('@component/FmTab');\n    },\n    maxPage () {\n      return this.tabTitles.length - 1;\n    },\n    cTabTitles () {\n      const { tabStyles } = this;\n      const def = {\n        paddingStart: 18,\n        paddingEnd: 18,\n        minWidth: 120,\n        textunSelectColor: tabStyles.activeTitleColor || '#99000000',\n        textSelectColor: tabStyles.titleColor || '#198DED'\n      };\n      return this.tabTitles.map(item => {\n        return Object.assign({}, def, item);\n      });\n    },\n    cTabStyles () {\n      const defaultStyle = {\n        titleColor: 'rgba(0, 0, 0, 0.6)',\n        activeTitleColor: '#198DED',\n        height: 102,\n        padding: 18,\n        fontSize: 42,\n        activeBottomColor: '#198DED'\n      };\n      return Object.assign({}, defaultStyle, this.tabStyles);\n    }\n  },\n  data: () => ({\n    loaded: false,\n    currentPage: 0,\n    gesToken: 0,\n    isMoving: false,\n    startTime: 0,\n    deltaX: 0,\n    translateX: 0,\n    startPosX: 0,\n    startPosY: 0,\n    judge: 'INITIAL'\n  }),\n  methods: {\n    next () {\n      let page = this.currentPage;\n      if (page < this.maxPage) {\n        page++;\n      }\n      this.setPage(page);\n    },\n    prev () {\n      let page = this.currentPage;\n      if (page > 0) {\n        page--;\n      }\n      this.setPage(page);\n    },\n    _onTouchStart (e) {\n      if (isH5) {\n        this.startPosX = this._getTouchXPos(e);\n        this.startPosY = this._getTouchYPos(e);\n        this.deltaX = 0;\n        this.startTime = new Date().getTime();\n      }\n    },\n    _onTouchMove (e) {\n      if (isH5) {\n        this.deltaX = this._getTouchXPos(e) - this.startPosX;\n        this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);\n        if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {\n          this.judge = 'SLIDE_ING';\n        }\n      }\n    },\n    _onTouchEnd (e) {\n      if (isH5) {\n        if (this.judge === 'SLIDE_ING') {\n          if (this.deltaX < -50) {\n            this.next();\n          } else if (this.deltaX > 50) {\n            this.prev();\n          }\n        }\n        this.judge = 'INITIAL';\n      }\n    },\n    setPage (page, animated = true) {\n      if (this.isMoving === true || this.tabTitles.length <= 0) {\n        return;\n      }\n      this.isMoving = true;\n      const currentTabEl = this.$refs[`fm-tab-title-${page}`][0];\n      const tabWidth = this.$refs[`fm-tab-title-${page}`][0].$el.clientWidth;\n      const tabOffset = this.$refs[`fm-tab-title-${page}`][0].$el.offsetLeft;\n\n      if (tabOffset >= 1080 / 2) {\n        dom.scrollToElement(currentTabEl, {\n          offset: -1080 / 2 + tabWidth / 2,\n          animated\n        });\n      } else {\n        dom.scrollToElement(currentTabEl, {\n          offset: -tabOffset,\n          animated\n        });\n      }\n\n      this.currentPage = page;\n      this._animateTransformX(page, animated);\n      this.$emit('fmTabPageTabSelected', { page });\n    },\n    nativeTabSlided (e) {\n      this.$emit('fmTabPageTabSelected', { page: e.position });\n    },\n    _animateTransformX (page, animated = true) {\n      const { duration, timingFunction } = this;\n      const containerEl = this.$refs[`tab-container`];\n      const dist = page * 1080;\n      animation.transition(containerEl, {\n        styles: {\n          transform: `translateX(${-dist}px)`\n        },\n        duration: animated ? duration : 0.00001,\n        timingFunction,\n        delay: 0\n      }, () => {\n        this.isMoving = false;\n      });\n    },\n    _getTouchXPos (e) {\n      return e.changedTouches[0]['pageX'];\n    },\n    _getTouchYPos (e) {\n      return e.changedTouches[0]['pageY'];\n    }\n  },\n  mounted () {\n    if (this.isCreator) { return; }\n    this.setPage(this.selectIndex, false);\n    setTimeout(() => {\n      this.loaded = true;\n    }, 50);\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
var dom = weex.requireModule('dom');
var isH5 = weex.config.env.platform === 'Web';

exports.default = {
  name: 'FmNativeTab',
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1854
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    selectIndex: function selectIndex(val) {
      if (this.loaded) {
        this.setPage(this.selectIndex, false);
      }
    }
  },
  computed: {
    isCreator: function isCreator() {
      return weex.supports && weex.supports('@component/FmTab');
    },
    maxPage: function maxPage() {
      return this.tabTitles.length - 1;
    },
    cTabTitles: function cTabTitles() {
      var tabStyles = this.tabStyles;

      var def = {
        paddingStart: 18,
        paddingEnd: 18,
        minWidth: 120,
        textunSelectColor: tabStyles.activeTitleColor || '#99000000',
        textSelectColor: tabStyles.titleColor || '#198DED'
      };
      return this.tabTitles.map(function (item) {
        return Object.assign({}, def, item);
      });
    },
    cTabStyles: function cTabStyles() {
      var defaultStyle = {
        titleColor: 'rgba(0, 0, 0, 0.6)',
        activeTitleColor: '#198DED',
        height: 102,
        padding: 18,
        fontSize: 42,
        activeBottomColor: '#198DED'
      };
      return Object.assign({}, defaultStyle, this.tabStyles);
    }
  },
  data: function data() {
    return {
      loaded: false,
      currentPage: 0,
      gesToken: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0,
      startPosX: 0,
      startPosY: 0,
      judge: 'INITIAL'
    };
  },
  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.maxPage) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    _onTouchStart: function _onTouchStart(e) {
      if (isH5) {
        this.startPosX = this._getTouchXPos(e);
        this.startPosY = this._getTouchYPos(e);
        this.deltaX = 0;
        this.startTime = new Date().getTime();
      }
    },
    _onTouchMove: function _onTouchMove(e) {
      if (isH5) {
        this.deltaX = this._getTouchXPos(e) - this.startPosX;
        this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);
        if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {
          this.judge = 'SLIDE_ING';
        }
      }
    },
    _onTouchEnd: function _onTouchEnd(e) {
      if (isH5) {
        if (this.judge === 'SLIDE_ING') {
          if (this.deltaX < -50) {
            this.next();
          } else if (this.deltaX > 50) {
            this.prev();
          }
        }
        this.judge = 'INITIAL';
      }
    },
    setPage: function setPage(page) {
      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.isMoving === true || this.tabTitles.length <= 0) {
        return;
      }
      this.isMoving = true;
      var currentTabEl = this.$refs['fm-tab-title-' + page][0];
      var tabWidth = this.$refs['fm-tab-title-' + page][0].$el.clientWidth;
      var tabOffset = this.$refs['fm-tab-title-' + page][0].$el.offsetLeft;

      if (tabOffset >= 1080 / 2) {
        dom.scrollToElement(currentTabEl, {
          offset: -1080 / 2 + tabWidth / 2,
          animated: animated
        });
      } else {
        dom.scrollToElement(currentTabEl, {
          offset: -tabOffset,
          animated: animated
        });
      }

      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('fmTabPageTabSelected', { page: page });
    },
    nativeTabSlided: function nativeTabSlided(e) {
      this.$emit('fmTabPageTabSelected', { page: e.position });
    },
    _animateTransformX: function _animateTransformX(page) {
      var _this = this;

      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var containerEl = this.$refs['tab-container'];
      var dist = page * 1080;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: animated ? duration : 0.00001,
        timingFunction: timingFunction,
        delay: 0
      }, function () {
        _this.isMoving = false;
      });
    },
    _getTouchXPos: function _getTouchXPos(e) {
      return e.changedTouches[0]['pageX'];
    },
    _getTouchYPos: function _getTouchYPos(e) {
      return e.changedTouches[0]['pageY'];
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.isCreator) {
      return;
    }
    this.setPage(this.selectIndex, false);
    setTimeout(function () {
      _this2.loaded = true;
    }, 50);
  }
};

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.isCreator) ? _c('div', {
    staticClass: "fm-tab-page",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight) + 'px',
      opacity: _vm.loaded ? 1 : 0
    }))
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: "tab-title-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.cTabStyles.height) + 'px'
    })),
    attrs: {
      "show-scrollbar": false,
      "scroll-direction": "horizontal"
    }
  }, [_c('div', {
    ref: "tab-title-wrap",
    staticClass: "tab-title-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.tabTitles), function(v, idx) {
    return _c('div', {
      key: idx,
      ref: 'fm-tab-title-' + idx,
      refInFor: true,
      staticClass: "title-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        borderBottomWidth: _vm.currentPage === idx ? '3px' : '0px'
      })),
      on: {
        "click": function($event) {
          _vm.setPage(idx)
        }
      }
    }, [_c('text', {
      staticClass: "item-title",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        fontSize: _vm.cTabStyles.fontSize + 'px',
        color: _vm.currentPage === idx ? _vm.cTabStyles.activeTitleColor : _vm.cTabStyles.titleColor,
        paddingLeft: _vm.cTabStyles.padding + 'px',
        paddingRight: _vm.cTabStyles.padding + 'px'
      }))
    }, [_vm._v(_vm._s(v.text))])])
  }))]), _vm._v(" "), _c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight - _vm.cTabStyles.height) + 'px'
    })),
    on: {
      "panstart": _vm._onTouchStart,
      "panmove": _vm._onTouchMove,
      "panend": _vm._onTouchEnd
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.tabTitles), function(v, idx) {
    return _c('div', {
      key: idx,
      staticClass: "tab-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        height: (_vm.tabPageHeight - _vm.cTabStyles.height) + 'px'
      }))
    }, [_vm._t(("tab-item-" + idx))], 2)
  }))])], 1) : _c('FmTab', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight) + 'px'
    })),
    attrs: {
      "container": {
        viewpagepaddingLeft: 0,
        viewpagepaddingRight: 0,
        viewpagepaddingTop: _vm.cTabStyles.height + 12,
        viewpagepaddingBottom: 0,
        tabpaddingLeft: 48,
        tabpaddingRight: 48,
        tabpaddingTop: 0,
        tabpaddingBottom: 0
      },
      "tab": _vm.cTabTitles
    },
    on: {
      "tabPosition": _vm.nativeTabSlided
    }
  }, _vm._l((_vm.tabTitles), function(v, idx) {
    return _c('div', {
      key: idx,
      staticClass: "tab-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        height: (_vm.tabPageHeight - _vm.cTabStyles.height - 12) + 'px'
      }))
    }, [_vm._t(("tab-item-" + idx))], 2)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c6e0f338", module.exports)
  }
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(241);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(242),
  /* template */
  __webpack_require__(243),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-btnbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5aa1ccbc", Component.options)
  } else {
    hotAPI.reload("data-v-5aa1ccbc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmFooter = __webpack_require__(41);

var _fmFooter2 = _interopRequireDefault(_fmFooter);

var _fmButton = __webpack_require__(34);

var _fmButton2 = _interopRequireDefault(_fmButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmBtnbar',
  components: { FmButton: _fmButton2.default, FmFooter: _fmFooter2.default },
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  data: function data() {
    return {
      paddingSize: '',
      buttonSize: ''
    };
  },
  watch: {
    items: function items() {
      this.checkPadding();
    }
  },
  created: function created() {
    this.checkPadding();
  },

  methods: {
    checkPadding: function checkPadding() {
      if (this.items.length >= 2 || this.$slots.default && this.$slots.default.length >= 2) {
        this.paddingSize = 'large';
        this.buttonSize = 'large';
      } else {
        this.paddingSize = '';
        this.buttonSize = 'huge';
      }
    },
    btnClicked: function btnClicked(index) {
      this.$emit('fmBtnbarBtnClicked', { index: index });
    }
  }
};

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fm-footer', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "padding-size": _vm.paddingSize,
      "backgroundColor": _vm.backgroundColor
    }
  }, [_vm._l((_vm.items), function(item, index) {
    return (!_vm.$slots.default) ? _c('fm-button', _vm._b({
      key: index,
      staticClass: "tabbar-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "animated": true,
        "size": _vm.buttonSize
      },
      on: {
        "buttonClicked": function($event) {
          _vm.btnClicked(index)
        }
      }
    }, 'fm-button', Object.assign({}, item), false), [_vm._v(_vm._s(item.title))]) : _vm._e()
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5aa1ccbc", module.exports)
  }
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(245);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(246)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(248),
  /* template */
  __webpack_require__(249),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-95a96b12",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-textbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95a96b12", Component.options)
  } else {
    hotAPI.reload("data-v-95a96b12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(247);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2844a498", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95a96b12\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95a96b12\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.button-wrap[data-v-95a96b12] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: 1.33333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.border[data-v-95a96b12] {\n  width: 0.01852rem;\n  height: 0.66667rem;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.button-wrap[data-v-95a96b12]:active {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.button-title[data-v-95a96b12] {\n  font-size: 0.44444rem;\n  color: #198DED;\n  font-weight: 500;\n  font-family: sans-serif-medium;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-textbar/index.vue?28ec26fb"],"names":[],"mappings":";AAkBA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,qCAAA;CACA;AAEA;EACA,sCAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;EACA,+BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/03/13. -->\n<template>\n  <fm-footer :backgroundColor=\"backgroundColor\">\n    <template v-for=\"(item, index) in items\">\n      <div class=\"button-wrap\"\n           :key=\"index\"\n           @click=\"onClick(index)\">\n        <text class=\"button-title\" :style=\"item.color && { color: item.color }\">{{ item.title }}</text>\n      </div>\n      <template v-if=\"items.length >= 2 && index != items.length - 1\">\n        <div class=\"border\" :key=\"index\"></div>\n      </template>\n    </template>\n  </fm-footer>\n</template>\n\n<style scoped>\n  .button-wrap {\n    flex: 1;\n    height: 144px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .border {\n    width: 2px;\n    height: 72px;\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n\n  .button-wrap:active {\n    background-color: rgba(0, 0, 0, 0.04);\n  }\n\n  .button-title {\n    font-size: 48px;\n    color: #198DED;\n    font-weight: 500;\n    font-family: sans-serif-medium;\n  }\n</style>\n\n<script>\nimport FmFooter from '../fm-footer';\nexport default {\n  name: 'FmTextbar',\n  components: { FmFooter },\n  props: {\n    items: {\n      type: Array,\n      default: () => ([])\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    }\n  },\n  methods: {\n    onClick (index) {\n      this.$emit('fmTextbarBtnClicked', { index });\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmFooter = __webpack_require__(41);

var _fmFooter2 = _interopRequireDefault(_fmFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FmTextbar',
  components: { FmFooter: _fmFooter2.default },
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  methods: {
    onClick: function onClick(index) {
      this.$emit('fmTextbarBtnClicked', { index: index });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fm-footer', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "backgroundColor": _vm.backgroundColor
    }
  }, [_vm._l((_vm.items), function(item, index) {
    return [_c('div', {
      key: index,
      staticClass: "button-wrap",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "click": function($event) {
          _vm.onClick(index)
        }
      }
    }, [_c('text', {
      staticClass: "button-title",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(item.color && {
        color: item.color
      }))
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), (_vm.items.length >= 2 && index != _vm.items.length - 1) ? [_c('div', {
      key: index,
      staticClass: "border",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    })] : _vm._e()]
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95a96b12", module.exports)
  }
}

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(251);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(254),
  /* template */
  __webpack_require__(255),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-18ede8e6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-slider/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18ede8e6", Component.options)
  } else {
    hotAPI.reload("data-v-18ede8e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(253);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("673aa6ee", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18ede8e6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18ede8e6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-banner-wrap[data-v-18ede8e6] {\n  width: 10rem;\n  padding: 0.22222rem 0 0.22222rem 0.22222rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  height: 3.57407rem;\n  overflow: hidden;\n}\n.banner-wrap--1[data-v-18ede8e6] {\n  width: 10rem;\n  height: 4.77778rem;\n  padding: 0.44444rem 0.44444rem;\n}\n.fm-nativeBanner-wrap[data-v-18ede8e6] {\n  width: 10rem;\n  height: 3.57407rem;\n  padding: 0.22222rem 0;\n}\n.nativeBanner-wrap--1[data-v-18ede8e6] {\n  width: 10rem;\n  height: 4.77778rem;\n  padding: 0.44444rem 0.22222rem;\n}\n.card-list[data-v-18ede8e6] {\n  position: absolute;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  height: 3.12963rem;\n}\n.card-item[data-v-18ede8e6] {\n  width: 7.33333rem;\n  height: 3.12963rem;\n  margin-right: 0.11111rem;\n  border-radius: 0.05556rem;\n  overflow: hidden;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-slider/index.vue?8167832a"],"names":[],"mappings":";AAkDA;EACA,aAAA;EACA,4CAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,iBAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,+BAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,sBAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,+BAAA;CACA;AAEA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,yBAAA;EACA,0BAAA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/03/18. [!] Just a beta version! -->\n<template>\n  <div v-if=\"!isCreator\"\n       class=\"fm-banner-wrap\"\n       :class=\"['banner-wrap--' + items.length]\"\n       ref=\"sliderCtn\"\n       @panstart=\"onPanStart\"\n       @panmove=\"onPanMove\"\n       @panend=\"onPanEnd\"\n       @horizontalpan=\"startHandle\">\n    <div class=\"card-list\"\n         v-if=\"items.length > 1\"\n         ref=\"card-list\"\n         :style=\"{ left: -(cardS.width * 2) + 'px' }\">\n      <div class=\"card-item\"\n           v-for=\"(item, index) in cItems\"\n           :key=\"index\"\n           :ref=\"`card${index-2}`\"\n           :style=\"(index-2) === -1 && { transform: `translateX(-12px)` }\">\n        <slot :name=\"`card${index-2}`\">\n          <image :style=\"{ width: `${cardS.width}px`, height: `${cardS.height}px` }\"\n                 :src=\"item.src\"\n                 @click=\"itemClicked(index-2 < 0 ? index-2+items.length : index-2 >= items.length ? index-2-items.length : index-2 )\" />\n        </slot>\n      </div>\n    </div>\n    <div class=\"card-list\"\n         v-else>\n      <div v-for=\"(item, index) in items\"\n           :key=\"index\"\n           :ref=\"`card${index}`\">\n        <slot :name=\"`card${index}`\">\n          <image :style=\"{ width: `${cardS.width*1.2425}px`, height: `${cardS.height*1.2425}px` }\"\n                 :src=\"item.src\"\n                 @click=\"itemClicked(index)\" />\n        </slot>\n      </div>\n    </div>\n  </div>\n  <FmSliderNative v-else\n                  class=\"fm-nativeBanner-wrap\"\n                  :class=\"['nativeBanner-wrap--' + items.length]\"\n                  :autoplay=\"autoPlay\"\n                  @itemclick=\"itemClicked\"\n                  :data=\"cNativeItems\">\n  </FmSliderNative>\n</template>\n\n<style scoped>\n  .fm-banner-wrap {\n    width: 1080px;\n    padding: 24px 0 24px 24px;\n    flex-direction: row;\n    height: 386px;\n    overflow: hidden;\n  }\n\n  .banner-wrap--1 {\n    width: 1080px;\n    height: 516px;\n    padding: 48px 48px;\n  }\n\n  .fm-nativeBanner-wrap {\n    width: 1080px;\n    height: 386px;\n    padding: 24px 0;\n  }\n\n  .nativeBanner-wrap--1 {\n    width: 1080px;\n    height: 516px;\n    padding: 48px 24px;\n  }\n\n  .card-list {\n    position: absolute;\n    flex-direction: row;\n    height: 338px;\n  }\n\n  .card-item {\n    width: 792px;\n    height: 338px;\n    margin-right: 12px;\n    border-radius: 6px;\n    overflow: hidden;\n  }\n</style>\n\n<script>\nconst animation = weex.requireModule('animation');\nimport Utils from '../utils';\nimport BindEnv from '../utils/bind-env';\nimport Binding from 'weex-bindingx/lib/index.weex.js';\n\nexport default {\n  name: 'FmSlider',\n  props: {\n    items: {\n      type: Array,\n      default: () => ([])\n    },\n    panOffset: {\n      type: Number,\n      default: 30\n    },\n    cardS: {\n      type: Object,\n      default: () => ({\n        width: 792,\n        height: 338\n      })\n    },\n    autoPlay: {\n      type: Boolean,\n      default: false\n    },\n    interval: {\n      type: [Number, String],\n      default: 4000\n    },\n    timingFunction: {\n      type: String,\n      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n    }\n  },\n  data: () => ({\n    selectIndex: 0,\n    gesToken: 0,\n    isMoving: false,\n    startX: 0,\n    startTime: 0,\n    currentIndex: 0,\n    autoPlayTimer: null\n  }),\n  computed: {\n    isCreator () {\n      return weex.supports && weex.supports('@component/FmSliderNative');\n    },\n    cItems () {\n      const { items } = this;\n      let cItems = [];\n      if (items.length >= 2) {\n        cItems = cItems.concat(items.slice(-2), items, items.slice(0, 2));\n      }\n      return cItems;\n    },\n    cNativeItems () {\n      const { items } = this;\n      return items.map((item) => {\n        return item.src;\n      });\n    },\n    cardLength () {\n      return this.items.length;\n    }\n  },\n  methods: {\n    startHandle (e) {\n      if (BindEnv.supportsEB() && e.state === 'start') {\n        this.clearAutoPlay();\n        setTimeout(() => {\n          const sliderCtn = this.$refs[`sliderCtn`];\n          this.bindExp(sliderCtn);\n        }, 0);\n      }\n    },\n    onPanStart (e) {\n      if (BindEnv.supportsEB()) {\n        return;\n      }\n      this.clearAutoPlay();\n      this.startX = e.changedTouches[0].clientX;\n      this.startTime = Date.now();\n    },\n    onPanMove (e) {\n      if (BindEnv.supportsEB() || this.isMoving) {\n        return;\n      }\n      const moveX = e.changedTouches[0].clientX - this.startX;\n      const currentCardLeft = this.currentIndex * (this.cardS.width + 12);\n\n      const listEl = this.$refs['card-list'];\n      if (!listEl) { return; }\n      listEl && animation.transition(listEl, {\n        styles: {\n          transform: `translateX(${moveX - currentCardLeft}px)`\n        },\n        timingFunction: 'ease',\n        delay: 0,\n        duration: 0\n      }, () => {\n      });\n    },\n    onPanEnd (e) {\n      if (BindEnv.supportsEB()) {\n        return;\n      }\n      this.panEnd(e);\n    },\n    panEnd (e) {\n      this.isMoving = true;\n      let moveX = e.deltaX;\n\n      if (Utils.env.isWeb()) {\n        moveX = e.changedTouches[0].clientX - this.startX;\n      }\n\n      const originIndex = this.currentIndex;\n      let selectIndex = originIndex;\n      const duration = Date.now() - this.startTime;\n      const panOffset = this.panOffset || (this.cardS.width / 2);\n\n      if (moveX < -panOffset || (moveX < -10 && duration < 200)) {\n        // 允许向右越界\n        if (selectIndex !== this.cardLength) {\n          selectIndex++;\n        }\n      } else if (moveX > panOffset || (moveX > 10 && duration < 500)) {\n        // 允许向左越界\n        if (selectIndex !== -2) {\n          selectIndex--;\n        }\n      }\n\n      this.slideTo(originIndex, selectIndex);\n      setTimeout(() => { this.checkNeedAutoPlay(); }, 4000);\n    },\n    bindExp (element) {\n      if (element && element.ref) {\n        if (this.isMoving) {\n          Binding.unbind({\n            eventType: 'pan',\n            token: this.gesToken\n          });\n          this.gesToken = 0;\n          return;\n        }\n\n        const { currentIndex, cardS } = this;\n        const dist = currentIndex * (cardS.width + 12);\n        const listEl = this.$refs['card-list'];\n\n        // 卡片容器\n        const props = [{\n          element: listEl.ref,\n          property: 'transform.translateX',\n          expression: `${-dist}+x`\n        }];\n\n        // 当前卡片\n        const currCardEl = this.$refs[`card${currentIndex}`][0];\n        props.push({\n          element: currCardEl.ref,\n          property: 'transform.translateX',\n          expression: `x <= 0 ? (x / 792 * 12) : 0`\n        });\n        // 上一张卡片\n        const lastCardEl = this.$refs[`card${currentIndex - 1}`][0];\n        props.push({\n          element: lastCardEl.ref,\n          property: 'transform.translateX',\n          expression: `x > 0 ? (1 - (x / 792)) * -12 : -12`\n        });\n\n        const gesTokenObj = Binding.bind({\n          eventType: 'pan',\n          anchor: element.ref,\n          props\n        }, (e) => {\n          if (!this.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {\n            this.panEnd(e);\n          }\n        });\n\n        this.gesToken = gesTokenObj.token;\n      }\n    },\n    slideTo (originIndex, selectIndex) {\n      const { cardS, timingFunction } = this;\n      const listEl = this.$refs['card-list'];\n      if (!listEl) { return; }\n      const dist = selectIndex * (cardS.width + 12);\n      // 卡片容器\n      listEl && animation.transition(listEl, {\n        styles: {\n          transform: `translateX(${-dist}px)`\n        },\n        duration: 500,\n        timingFunction\n      }, (e) => {\n        this.isMoving = false;\n        if (originIndex !== selectIndex) {\n          this.currentIndex = selectIndex;\n        }\n        this.checkNeedReset();\n      });\n\n      // 下一页\n      if (originIndex < selectIndex) {\n        // 当前卡片\n        const currCard = this.$refs[`card${this.currentIndex}`];\n        currCard && animation.transition(currCard[0], {\n          styles: {\n            transform: `translateX(-12px)`\n          },\n          duration: 500,\n          timingFunction\n        });\n        // 上一张卡片\n        const lastCard = this.$refs[`card${this.currentIndex - 1}`];\n        lastCard && animation.transition(lastCard[0], {\n          styles: {\n            transform: `translateX(0px)`\n          },\n          duration: 500,\n          timingFunction\n        });\n      // 上一页\n      } else if (originIndex > selectIndex) {\n        // 上一张卡片\n        const lastCard = this.$refs[`card${this.currentIndex - 1}`];\n        lastCard && animation.transition(lastCard[0], {\n          styles: {\n            transform: `translateX(0px)`\n          },\n          duration: 500,\n          timingFunction\n        });\n        // 上上张卡片\n        const llastCard = this.$refs[`card${this.currentIndex - 2}`];\n        llastCard && animation.transition(llastCard[0], {\n          styles: {\n            transform: `translateX(-12px)`\n          },\n          duration: 500,\n          timingFunction\n        });\n      }\n    },\n    // 检查页数是否达到临界条件进行重置处理，临界值 -2 ~ cardLength\n    checkNeedReset () {\n      const { cardS, timingFunction } = this;\n      const listEl = this.$refs['card-list'];\n      if (!listEl) { return; }\n      // 向右越界 重置为第一页\n      if (this.currentIndex >= this.cardLength) {\n        this.currentIndex = 0;\n        animation.transition(this.$refs[`card${this.cardLength - 1}`][0], {\n          styles: {\n            transform: `translateX(0px)`\n          },\n          duration: 0.00001,\n          timingFunction\n        });\n        animation.transition(this.$refs[`card-1`][0], {\n          styles: {\n            transform: `translateX(-12px)`\n          },\n          duration: 0.00001,\n          timingFunction\n        });\n      // 向左越界 重置为倒数第二页\n      } else if (this.currentIndex === -2) {\n        this.currentIndex = this.cardLength - 2;\n        animation.transition(this.$refs[`card${this.cardLength - 3}`][0], {\n          styles: {\n            transform: `translateX(-12px)`\n          },\n          duration: 0.00001,\n          timingFunction\n        });\n      } else {\n        return;\n      }\n      listEl && animation.transition(listEl, {\n        styles: {\n          transform: `translateX(${-this.currentIndex * (cardS.width + 12)}px)`\n        },\n        duration: 0.00001,\n        timingFunction\n      });\n    },\n    checkNeedAutoPlay () {\n      if (this.autoPlay && this.items.length >= 1) {\n        this.clearAutoPlay();\n        this.autoPlayTimer = setInterval(() => {\n          this.slideTo(this.currentIndex, this.currentIndex + 1);\n        }, parseInt(this.interval));\n      }\n    },\n    clearAutoPlay () {\n      this.autoPlayTimer && clearInterval(this.autoPlayTimer);\n    },\n    itemClicked (e) {\n      const idx = this.isCreator ? e.position : e;\n      this.$emit('fmSliderItemClicked', idx);\n    }\n  },\n  mounted () {\n    setTimeout(() => {\n      const sliderCtn = this.$refs[`sliderCtn`];\n      if (BindEnv.supportsEB() && sliderCtn && sliderCtn.ref) {\n        Binding.prepare && Binding.prepare({\n          anchor: sliderCtn.ref,\n          eventType: 'pan'\n        });\n      }\n    }, 20);\n    this.checkNeedAutoPlay();\n  },\n  beforeDestroy () {\n    this.clearAutoPlay();\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(42);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(51);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _indexWeex = __webpack_require__(44);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  name: 'FmSlider',
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panOffset: {
      type: Number,
      default: 30
    },
    cardS: {
      type: Object,
      default: function _default() {
        return {
          width: 792,
          height: 338
        };
      }
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: [Number, String],
      default: 4000
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  data: function data() {
    return {
      selectIndex: 0,
      gesToken: 0,
      isMoving: false,
      startX: 0,
      startTime: 0,
      currentIndex: 0,
      autoPlayTimer: null
    };
  },
  computed: {
    isCreator: function isCreator() {
      return weex.supports && weex.supports('@component/FmSliderNative');
    },
    cItems: function cItems() {
      var items = this.items;

      var cItems = [];
      if (items.length >= 2) {
        cItems = cItems.concat(items.slice(-2), items, items.slice(0, 2));
      }
      return cItems;
    },
    cNativeItems: function cNativeItems() {
      var items = this.items;

      return items.map(function (item) {
        return item.src;
      });
    },
    cardLength: function cardLength() {
      return this.items.length;
    }
  },
  methods: {
    startHandle: function startHandle(e) {
      var _this = this;

      if (_bindEnv2.default.supportsEB() && e.state === 'start') {
        this.clearAutoPlay();
        setTimeout(function () {
          var sliderCtn = _this.$refs['sliderCtn'];
          _this.bindExp(sliderCtn);
        }, 0);
      }
    },
    onPanStart: function onPanStart(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.clearAutoPlay();
      this.startX = e.changedTouches[0].clientX;
      this.startTime = Date.now();
    },
    onPanMove: function onPanMove(e) {
      if (_bindEnv2.default.supportsEB() || this.isMoving) {
        return;
      }
      var moveX = e.changedTouches[0].clientX - this.startX;
      var currentCardLeft = this.currentIndex * (this.cardS.width + 12);

      var listEl = this.$refs['card-list'];
      if (!listEl) {
        return;
      }
      listEl && animation.transition(listEl, {
        styles: {
          transform: 'translateX(' + (moveX - currentCardLeft) + 'px)'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 0
      }, function () {});
    },
    onPanEnd: function onPanEnd(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.panEnd(e);
    },
    panEnd: function panEnd(e) {
      var _this2 = this;

      this.isMoving = true;
      var moveX = e.deltaX;

      if (_utils2.default.env.isWeb()) {
        moveX = e.changedTouches[0].clientX - this.startX;
      }

      var originIndex = this.currentIndex;
      var selectIndex = originIndex;
      var duration = Date.now() - this.startTime;
      var panOffset = this.panOffset || this.cardS.width / 2;

      if (moveX < -panOffset || moveX < -10 && duration < 200) {
        // 允许向右越界
        if (selectIndex !== this.cardLength) {
          selectIndex++;
        }
      } else if (moveX > panOffset || moveX > 10 && duration < 500) {
        // 允许向左越界
        if (selectIndex !== -2) {
          selectIndex--;
        }
      }

      this.slideTo(originIndex, selectIndex);
      setTimeout(function () {
        _this2.checkNeedAutoPlay();
      }, 4000);
    },
    bindExp: function bindExp(element) {
      var _this3 = this;

      if (element && element.ref) {
        if (this.isMoving) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        var currentIndex = this.currentIndex,
            cardS = this.cardS;

        var dist = currentIndex * (cardS.width + 12);
        var listEl = this.$refs['card-list'];

        // 卡片容器
        var props = [{
          element: listEl.ref,
          property: 'transform.translateX',
          expression: -dist + '+x'
        }];

        // 当前卡片
        var currCardEl = this.$refs['card' + currentIndex][0];
        props.push({
          element: currCardEl.ref,
          property: 'transform.translateX',
          expression: 'x <= 0 ? (x / 792 * 12) : 0'
        });
        // 上一张卡片
        var lastCardEl = this.$refs['card' + (currentIndex - 1)][0];
        props.push({
          element: lastCardEl.ref,
          property: 'transform.translateX',
          expression: 'x > 0 ? (1 - (x / 792)) * -12 : -12'
        });

        var gesTokenObj = _indexWeex2.default.bind({
          eventType: 'pan',
          anchor: element.ref,
          props: props
        }, function (e) {
          if (!_this3.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {
            _this3.panEnd(e);
          }
        });

        this.gesToken = gesTokenObj.token;
      }
    },
    slideTo: function slideTo(originIndex, selectIndex) {
      var _this4 = this;

      var cardS = this.cardS,
          timingFunction = this.timingFunction;

      var listEl = this.$refs['card-list'];
      if (!listEl) {
        return;
      }
      var dist = selectIndex * (cardS.width + 12);
      // 卡片容器
      listEl && animation.transition(listEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: 500,
        timingFunction: timingFunction
      }, function (e) {
        _this4.isMoving = false;
        if (originIndex !== selectIndex) {
          _this4.currentIndex = selectIndex;
        }
        _this4.checkNeedReset();
      });

      // 下一页
      if (originIndex < selectIndex) {
        // 当前卡片
        var currCard = this.$refs['card' + this.currentIndex];
        currCard && animation.transition(currCard[0], {
          styles: {
            transform: 'translateX(-12px)'
          },
          duration: 500,
          timingFunction: timingFunction
        });
        // 上一张卡片
        var lastCard = this.$refs['card' + (this.currentIndex - 1)];
        lastCard && animation.transition(lastCard[0], {
          styles: {
            transform: 'translateX(0px)'
          },
          duration: 500,
          timingFunction: timingFunction
        });
        // 上一页
      } else if (originIndex > selectIndex) {
        // 上一张卡片
        var _lastCard = this.$refs['card' + (this.currentIndex - 1)];
        _lastCard && animation.transition(_lastCard[0], {
          styles: {
            transform: 'translateX(0px)'
          },
          duration: 500,
          timingFunction: timingFunction
        });
        // 上上张卡片
        var llastCard = this.$refs['card' + (this.currentIndex - 2)];
        llastCard && animation.transition(llastCard[0], {
          styles: {
            transform: 'translateX(-12px)'
          },
          duration: 500,
          timingFunction: timingFunction
        });
      }
    },

    // 检查页数是否达到临界条件进行重置处理，临界值 -2 ~ cardLength
    checkNeedReset: function checkNeedReset() {
      var cardS = this.cardS,
          timingFunction = this.timingFunction;

      var listEl = this.$refs['card-list'];
      if (!listEl) {
        return;
      }
      // 向右越界 重置为第一页
      if (this.currentIndex >= this.cardLength) {
        this.currentIndex = 0;
        animation.transition(this.$refs['card' + (this.cardLength - 1)][0], {
          styles: {
            transform: 'translateX(0px)'
          },
          duration: 0.00001,
          timingFunction: timingFunction
        });
        animation.transition(this.$refs['card-1'][0], {
          styles: {
            transform: 'translateX(-12px)'
          },
          duration: 0.00001,
          timingFunction: timingFunction
        });
        // 向左越界 重置为倒数第二页
      } else if (this.currentIndex === -2) {
        this.currentIndex = this.cardLength - 2;
        animation.transition(this.$refs['card' + (this.cardLength - 3)][0], {
          styles: {
            transform: 'translateX(-12px)'
          },
          duration: 0.00001,
          timingFunction: timingFunction
        });
      } else {
        return;
      }
      listEl && animation.transition(listEl, {
        styles: {
          transform: 'translateX(' + -this.currentIndex * (cardS.width + 12) + 'px)'
        },
        duration: 0.00001,
        timingFunction: timingFunction
      });
    },
    checkNeedAutoPlay: function checkNeedAutoPlay() {
      var _this5 = this;

      if (this.autoPlay && this.items.length >= 1) {
        this.clearAutoPlay();
        this.autoPlayTimer = setInterval(function () {
          _this5.slideTo(_this5.currentIndex, _this5.currentIndex + 1);
        }, parseInt(this.interval));
      }
    },
    clearAutoPlay: function clearAutoPlay() {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    },
    itemClicked: function itemClicked(e) {
      var idx = this.isCreator ? e.position : e;
      this.$emit('fmSliderItemClicked', idx);
    }
  },
  mounted: function mounted() {
    var _this6 = this;

    setTimeout(function () {
      var sliderCtn = _this6.$refs['sliderCtn'];
      if (_bindEnv2.default.supportsEB() && sliderCtn && sliderCtn.ref) {
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: sliderCtn.ref,
          eventType: 'pan'
        });
      }
    }, 20);
    this.checkNeedAutoPlay();
  },
  beforeDestroy: function beforeDestroy() {
    this.clearAutoPlay();
  }
};

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.isCreator) ? _c('div', {
    ref: "sliderCtn",
    staticClass: "fm-banner-wrap",
    class: ['banner-wrap--' + _vm.items.length],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "panstart": _vm.onPanStart,
      "panmove": _vm.onPanMove,
      "panend": _vm.onPanEnd,
      "horizontalpan": _vm.startHandle
    }
  }, [(_vm.items.length > 1) ? _c('div', {
    ref: "card-list",
    staticClass: "card-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      left: -(_vm.cardS.width * 2) + 'px'
    }))
  }, _vm._l((_vm.cItems), function(item, index) {
    return _c('div', {
      key: index,
      ref: ("card" + (index-2)),
      refInFor: true,
      staticClass: "card-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle((index - 2) === -1 && {
        transform: "translateX(-12px)"
      }))
    }, [_vm._t(("card" + (index-2)), [_c('image', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        width: ((_vm.cardS.width) + "px"),
        height: ((_vm.cardS.height) + "px")
      })),
      attrs: {
        "src": item.src
      },
      on: {
        "click": function($event) {
          _vm.itemClicked(index - 2 < 0 ? index - 2 + _vm.items.length : index - 2 >= _vm.items.length ? index - 2 - _vm.items.length : index - 2)
        }
      }
    })])], 2)
  })) : _c('div', {
    staticClass: "card-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.items), function(item, index) {
    return _c('div', {
      key: index,
      ref: ("card" + index),
      refInFor: true,
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._t(("card" + index), [_c('image', {
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        width: ((_vm.cardS.width*1.2425) + "px"),
        height: ((_vm.cardS.height*1.2425) + "px")
      })),
      attrs: {
        "src": item.src
      },
      on: {
        "click": function($event) {
          _vm.itemClicked(index)
        }
      }
    })])], 2)
  }))]) : _c('FmSliderNative', {
    staticClass: "fm-nativeBanner-wrap",
    class: ['nativeBanner-wrap--' + _vm.items.length],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "autoplay": _vm.autoPlay,
      "data": _vm.cNativeItems
    },
    on: {
      "itemclick": _vm.itemClicked
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-18ede8e6", module.exports)
  }
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(257);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(258)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(260),
  /* template */
  __webpack_require__(261),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-69ed5ad4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-popover/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69ed5ad4", Component.options)
  } else {
    hotAPI.reload("data-v-69ed5ad4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(259);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("785b3f7a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-69ed5ad4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-69ed5ad4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.popover-wrap[data-v-69ed5ad4]{\n  position: fixed;\n  width: 10rem;\n  /*兼容H5异常*/\n  z-index: 99999;\n}\n.popover[data-v-69ed5ad4] {\n  position: fixed;\n  z-index: 99;\n  width: 5.81481rem;\n  padding: 0.18519rem;\n  border-radius: 0.09259rem;\n}\n.content[data-v-69ed5ad4] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  box-shadow: 0 0 0.13889rem 0 rgba(0, 0, 0, 0.2);\n  background-color: #FFFFFF;\n  border-radius: 0.09259rem;\n  overflow: hidden;\n}\n.item[data-v-69ed5ad4] {\n  height: 1.55556rem;\n  padding: 0 0.44444rem;\n}\n.item-content[data-v-69ed5ad4] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  border-bottom-width: 0.01852rem;\n  border-color: rgba(0,0,0,0.10);\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.item-text[data-v-69ed5ad4] {\n  font-size: 0.44444rem;\n}\n.item-icon[data-v-69ed5ad4] {\n  margin-right: 0.13889rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-popover/index.vue?f8496810"],"names":[],"mappings":";AAiCA;EACA,gBAAA;EACA,aAAA;EACA,UAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,YAAA;EACA,kBAAA;EACA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,gDAAA;EACA,0BAAA;EACA,0BAAA;EACA,iBAAA;CACA;AAEA;EACA,mBAAA;EACA,sBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,gCAAA;EACA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/04/12. -->\n<template>\n  <div class=\"popover-wrap\">\n    <fm-overlay v-if=\"show || showIn\"\n                :hasAnimation=\"true\"\n                :canAutoClose=\"true\"\n                :use-native=\"false\"\n                :opacity=\"overlayOpacity\"\n                @fmOverlayBodyClicking=\"visible(false)\"\n                ref=\"fm-overlay\"></fm-overlay>\n    <div ref=\"fm-popover\"\n         class=\"popover\"\n         v-if=\"show || showIn\"\n         :style=\"popoverStyle\"\n         @touchend=\"handleTouchEnd\">\n      <div class=\"content\"\n           :style=\"{ height: buttons.length * 168 - 2 + 'px' }\">\n        <div v-for=\"(item, index) in buttons\"\n             :key=\"index\"\n             class=\"item\"\n             @click=\"onClicked(index)\">\n          <div class=\"item-content\">\n            <fm-icon class=\"item-icon\" v-if=\"item.icon\" :name=\"item.icon\" :icon-style=\"67\" />\n            <text class=\"item-text\">{{ item.text }}</text>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .popover-wrap{\n    position: fixed;\n    width: 1080px;\n    /*兼容H5异常*/\n    z-index: 99999;\n  }\n\n  .popover {\n    position: fixed;\n    z-index: 99;\n    width: 628px;\n    padding: 20px;\n    border-radius: 10px;\n  }\n\n  .content {\n    flex: 1;\n    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);\n    background-color: #FFFFFF;\n    border-radius: 10px;\n    overflow: hidden;\n  }\n\n  .item {\n    height: 168px;\n    padding: 0 48px;\n  }\n\n  .item-content {\n    flex: 1;\n    flex-direction: row;\n    border-bottom-width: 2px;\n    border-color: rgba(0,0,0,0.10);\n    align-items: center;\n  }\n\n  .item-text {\n    font-size: 48px;\n  }\n\n  .item-icon {\n    margin-right: 15px;\n  }\n</style>\n\n<script>\nimport FmOverlay from '../fm-overlay';\nimport FmIcon from '../fm-icon';\nconst animation = weex.requireModule('animation');\n\nexport default {\n  name: 'FmPopover',\n  components: { FmOverlay, FmIcon },\n  props: {\n    buttons: {\n      type: Array,\n      default: () => ([])\n    },\n    position: {\n      type: Object,\n      default: () => ({\n        pos: 'top',\n        x: 0,\n        y: 0\n      })\n    },\n    hasAnimation: {\n      type: Boolean,\n      default: true\n    },\n    overlayOpacity: {\n      type: Number,\n      default: 0.0\n    }\n  },\n  data: () => ({\n    show: false,\n    showIn: false\n  }),\n  computed: {\n    popoverStyle () {\n      const { x = 0, y = 0, pos = 'top' } = this.position;\n      const style = {};\n      x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);\n      y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);\n      switch (pos) {\n        case 'top':\n          style.transform = `translateY(${this.showIn ? 0 : -20}px)`;\n          break;\n        case 'bottom':\n          style.transform = `translateY(${this.showIn ? 0 : 20}px)`;\n          break;\n        case 'left':\n          style.transform = `translateX(${this.showIn ? 0 : -20}px)`;\n          break;\n        case 'right':\n          style.transform = `translateX(${this.showIn ? 0 : 20}px)`;\n          break;\n      }\n      style.opacity = !this.showIn ? 0 : 1;\n      return style;\n    }\n  },\n  methods: {\n    handleTouchEnd (e) {\n      // 原生上有点击穿透问题\n      e.preventDefault && e.preventDefault();\n    },\n    appearPopover (bool) {\n      const { hasAnimation } = this;\n      const { pos = 'top' } = this.position;\n      const popoverEl = this.$refs['fm-popover'];\n      if (!popoverEl) {\n        return;\n      }\n      let hideTransform;\n      switch (pos) {\n        case 'top':\n          hideTransform = 'translateY(-20px)';\n          break;\n        case 'bottom':\n          hideTransform = 'translateY(20px)';\n          break;\n        case 'left':\n          hideTransform = 'translateX(-20px)';\n          break;\n        case 'right':\n          hideTransform = 'translateX(20px)';\n          break;\n      }\n      const styles = bool ? {\n        transform: 'translateX(0px) translateY(0px)',\n        opacity: 1\n      } : {\n        transform: hideTransform,\n        opacity: 0\n      };\n      animation.transition(popoverEl, {\n        styles,\n        duration: hasAnimation ? 150 : 0.0001,\n        timingFunction: 'ease-out'\n      }, e => {\n        this.showIn = bool;\n      });\n    },\n    onClicked (index) {\n      this.visible(false);\n      this.$emit('fmPopoverBtnClicked', { index });\n    },\n    visible (bool) {\n      this.show = bool;\n      setTimeout(() => {\n        this.appearPopover(bool);\n      }, 40);\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fmOverlay = __webpack_require__(43);

var _fmOverlay2 = _interopRequireDefault(_fmOverlay);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');

exports.default = {
  name: 'FmPopover',
  components: { FmOverlay: _fmOverlay2.default, FmIcon: _fmIcon2.default },
  props: {
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    position: {
      type: Object,
      default: function _default() {
        return {
          pos: 'top',
          x: 0,
          y: 0
        };
      }
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: Number,
      default: 0.0
    }
  },
  data: function data() {
    return {
      show: false,
      showIn: false
    };
  },
  computed: {
    popoverStyle: function popoverStyle() {
      var _position = this.position,
          _position$x = _position.x,
          x = _position$x === undefined ? 0 : _position$x,
          _position$y = _position.y,
          y = _position$y === undefined ? 0 : _position$y,
          _position$pos = _position.pos,
          pos = _position$pos === undefined ? 'top' : _position$pos;

      var style = {};
      x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
      y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
      switch (pos) {
        case 'top':
          style.transform = 'translateY(' + (this.showIn ? 0 : -20) + 'px)';
          break;
        case 'bottom':
          style.transform = 'translateY(' + (this.showIn ? 0 : 20) + 'px)';
          break;
        case 'left':
          style.transform = 'translateX(' + (this.showIn ? 0 : -20) + 'px)';
          break;
        case 'right':
          style.transform = 'translateX(' + (this.showIn ? 0 : 20) + 'px)';
          break;
      }
      style.opacity = !this.showIn ? 0 : 1;
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 原生上有点击穿透问题
      e.preventDefault && e.preventDefault();
    },
    appearPopover: function appearPopover(bool) {
      var _this = this;

      var hasAnimation = this.hasAnimation;
      var _position$pos2 = this.position.pos,
          pos = _position$pos2 === undefined ? 'top' : _position$pos2;

      var popoverEl = this.$refs['fm-popover'];
      if (!popoverEl) {
        return;
      }
      var hideTransform = void 0;
      switch (pos) {
        case 'top':
          hideTransform = 'translateY(-20px)';
          break;
        case 'bottom':
          hideTransform = 'translateY(20px)';
          break;
        case 'left':
          hideTransform = 'translateX(-20px)';
          break;
        case 'right':
          hideTransform = 'translateX(20px)';
          break;
      }
      var styles = bool ? {
        transform: 'translateX(0px) translateY(0px)',
        opacity: 1
      } : {
        transform: hideTransform,
        opacity: 0
      };
      animation.transition(popoverEl, {
        styles: styles,
        duration: hasAnimation ? 150 : 0.0001,
        timingFunction: 'ease-out'
      }, function (e) {
        _this.showIn = bool;
      });
    },
    onClicked: function onClicked(index) {
      this.visible(false);
      this.$emit('fmPopoverBtnClicked', { index: index });
    },
    visible: function visible(bool) {
      var _this2 = this;

      this.show = bool;
      setTimeout(function () {
        _this2.appearPopover(bool);
      }, 40);
    }
  }
};

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "popover-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(_vm.show || _vm.showIn) ? _c('fm-overlay', {
    ref: "fm-overlay",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "hasAnimation": true,
      "canAutoClose": true,
      "use-native": false,
      "opacity": _vm.overlayOpacity
    },
    on: {
      "fmOverlayBodyClicking": function($event) {
        _vm.visible(false)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show || _vm.showIn) ? _c('div', {
    ref: "fm-popover",
    staticClass: "popover",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.popoverStyle)),
    on: {
      "touchend": _vm.handleTouchEnd
    }
  }, [_c('div', {
    staticClass: "content",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: _vm.buttons.length * 168 - 2 + 'px'
    }))
  }, _vm._l((_vm.buttons), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "click": function($event) {
          _vm.onClicked(index)
        }
      }
    }, [_c('div', {
      staticClass: "item-content",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [(item.icon) ? _c('fm-icon', {
      staticClass: "item-icon",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      attrs: {
        "name": item.icon,
        "icon-style": 67
      }
    }) : _vm._e(), _vm._v(" "), _c('text', {
      staticClass: "item-text",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined))
    }, [_vm._v(_vm._s(item.text))])], 1)])
  }))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-69ed5ad4", module.exports)
  }
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(263);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(268),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-60cd183e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-waiting/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60cd183e", Component.options)
  } else {
    hotAPI.reload("data-v-60cd183e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(265);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f3b1dbe8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60cd183e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60cd183e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-waiting[data-v-60cd183e] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  /*兼容H5异常*/\n  z-index: 999;\n}\n.waiting-wrapper[data-v-60cd183e] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 2.22222rem;\n  border-radius: 0.16667rem;\n  background-color: #FFFFFF;\n  padding: 0 0.33333rem;\n}\n.waiting-wrapper-H5[data-v-60cd183e] {\n  padding: 0 1rem;\n}\n.waiting--text[data-v-60cd183e] {\n  font-size: 0.38889rem;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  text-align: center;\n}\n.waiting-circle[data-v-60cd183e] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  margin: 0.55556rem 0;\n}\n.waiting--dot[data-v-60cd183e] {\n  z-index: 1;\n  width: 0.38889rem;\n  height: 0.38889rem;\n  margin: 0 0.02778rem;\n  border-radius: 0.19444rem;\n  opacity: 1;\n}\n.waiting--dot-1[data-v-60cd183e] {\n  background-color: #4da84f;\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n.waiting--dot-2[data-v-60cd183e] {\n  background-color: #4d79d3;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n}\n.waiting--dot-3[data-v-60cd183e] {\n  background-color: #de6a3c;\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-waiting/index.vue?7afe4ecc"],"names":[],"mappings":";AAkQA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,UAAA;EACA,aAAA;CACA;AAEA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,0BAAA;EACA,0BAAA;EACA,sBAAA;CACA;AAEA;EACA,gBAAA;CACA;AAEA;EACA,sBAAA;EACA,+BAAA;EACA,iBAAA;EACA,mBAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,qBAAA;CACA;AAEA;EACA,WAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;EACA,0BAAA;EACA,WAAA;CACA;AAEA;EACA,0BAAA;EACA,8BAAA;UAAA,sBAAA;CACA;AAEA;EACA,0BAAA;EACA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,0BAAA;EACA,8BAAA;UAAA,sBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/4/26. -->\n\n<template>\n  <div>\n    <div v-if=\"show || showIn\"\n         :style=\"wrapperStyle\"\n         ref=\"fm-waiting\"\n         class=\"fm-waiting\"\n         @click=\"warpperClicked\"\n         @touchend=\"handleTouchEnd\">\n      <div :class=\"['waiting-wrapper', !isCreator ? 'waiting-wrapper-H5' : '']\"\n           v-if=\"show || showIn\">\n          <template v-if=\"!isCreator\">\n            <div class=\"waiting-circle\">\n                <div class=\"waiting--dot waiting--dot-1\" ref=\"dot-1\"></div>\n                <div class=\"waiting--dot waiting--dot-2\" ref=\"dot-2\"></div>\n                <div class=\"waiting--dot waiting--dot-3\" ref=\"dot-3\"></div>\n            </div>\n            <text class=\"waiting--text\">{{ title }}</text>\n          </template>\n          <template v-else>\n            <FmNativeWaiting :text=\"title\"></FmNativeWaiting>\n          </template>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport Queue from './queue';\nconst animation = weex.requireModule('animation');\n\nexport default {\n  name: 'FmWaiting',\n  props: {\n    title: {\n      type: String,\n      default: ''\n    },\n    backgroundOpacity: {\n      type: Number,\n      default: 0.7\n    },\n    canAutoClose: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    show: false,\n    showIn: false,\n    loadingStart: 0,\n    animating: false\n  }),\n  computed: {\n    wrapperStyle () {\n      const { showIn, backgroundOpacity } = this;\n      return {\n        backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,\n        opacity: !showIn ? 0 : 1\n      };\n    },\n    isCreator () {\n      return weex.supports && weex.supports('@component/FmNativeWaiting');\n    }\n  },\n  methods: {\n    handleTouchEnd (e) {\n      // 原生上有点击穿透问题\n      e.preventDefault && e.preventDefault();\n    },\n    appear (bool) {\n      if (this.animating) { return; }\n      const elm = this.$refs['fm-waiting'];\n      if (!elm) {\n        this.showIn = bool;\n        return;\n      }\n      this.animating = true;\n      animation.transition(elm, {\n        styles: {\n          opacity: bool ? 1 : 0\n        },\n        duration: 320,\n        timingFunction: 'cubic-bezier(0.33, 0, 0.66, 1)'\n      }, () => {\n        this.showIn = bool;\n        if (bool) {\n          this.$emit('fmWaitingAppeared', false);\n        } else {\n          this.$emit('fmWaitingDisappeared', false);\n        }\n        this.animating = false;\n      });\n    },\n    start () {\n      this.prepare();\n      this.dot1Queue.loop();\n      this.dot2Queue.loop();\n      this.dot3Queue.loop();\n    },\n    stop () {\n      this.dot1Queue && this.dot1Queue.stop();\n      this.dot2Queue && this.dot2Queue.stop();\n      this.dot3Queue && this.dot3Queue.stop();\n    },\n    warpperClicked () {\n      if (this.animating) { return; }\n      if (this.canAutoClose) {\n        this.hide();\n      }\n    },\n    prepare () {\n      this.dot1 = this.$refs['dot-1'];\n      this.dot2 = this.$refs['dot-2'];\n      this.dot3 = this.$refs['dot-3'];\n\n      const steps1 = [{\n        styles: {\n          transform: 'translateX(48px) scale(1)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(96px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(90px) scale(0.3)',\n          opacity: 0,\n          perspective: 0\n        },\n        duration: 200, // ms\n        timingFunction: 'linear'\n      }, {\n        styles: {\n          transform: 'translateX(0px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 500, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }];\n      this.dot1Queue = Queue(this.dot1, steps1);\n\n      const steps2 = [{\n        styles: {\n          transform: 'translateX(48px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(40px) scale(0.3)',\n          opacity: 0,\n          perspective: 0\n        },\n        duration: 200, // ms\n        timingFunction: 'linear'\n      }, {\n        styles: {\n          transform: 'translateX(-48px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 500, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(0px) scale(1)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }];\n      this.dot2Queue = Queue(this.dot2, steps2);\n\n      const steps3 = [{\n        styles: {\n          transform: 'translateX(-6px) scale(0.3)',\n          opacity: 0,\n          perspective: 0\n        },\n        duration: 200, // ms\n        timingFunction: 'linear'\n      }, {\n        styles: {\n          transform: 'translateX(-96px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 500, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(-48px) scale(1)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }, {\n        styles: {\n          transform: 'translateX(0px) scale(0.5)',\n          opacity: 1,\n          perspective: 0\n        },\n        duration: 700, // ms\n        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'\n      }];\n      this.dot3Queue = Queue(this.dot3, steps3);\n    },\n    active () {\n      if (this.show) { return; }\n\n      this.show = true;\n      this.loadingStart = new Date().getTime();\n\n      if (this.isCreator) {\n        this.$nextTick(() => {\n          this.appear(true);\n        })\n      } else {\n        setTimeout(() => {\n          this.appear(true);\n          this.start();\n        }, 20);\n      }\n    },\n    hide () {\n      if (!this.show) { return; }\n\n      this.show = false;\n      let timeout = 0;\n      if (new Date().getTime() - this.loadingStart <= 500) {\n        timeout = 500;\n      }\n      setTimeout(() => {\n        this.appear(false);\n        !this.isCreator && this.stop();\n      }, timeout);\n    }\n  }\n};\n</script>\n\n<style scoped>\n  .fm-waiting {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    /*兼容H5异常*/\n    z-index: 999;\n  }\n\n  .waiting-wrapper {\n    align-items: center;\n    height: 240px;\n    border-radius: 18px;\n    background-color: #FFFFFF;\n    padding: 0 36px;\n  }\n\n  .waiting-wrapper-H5 {\n    padding: 0 108px;\n  }\n\n  .waiting--text {\n    font-size: 42px;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    text-align: center;\n  }\n\n  .waiting-circle {\n    flex-direction: row;\n    justify-content: center;\n    margin: 60px 0;\n  }\n\n  .waiting--dot {\n    z-index: 1;\n    width: 42px;\n    height: 42px;\n    margin: 0 3px;\n    border-radius: 21px;\n    opacity: 1;\n  }\n\n  .waiting--dot-1 {\n    background-color: #4da84f;\n    transform: scale(0.5);\n  }\n\n  .waiting--dot-2 {\n    background-color: #4d79d3;\n    transform: scale(1);\n  }\n\n  .waiting--dot-3 {\n    background-color: #de6a3c;\n    transform: scale(0.5);\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queue = __webpack_require__(267);

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'FmWaiting',
  props: {
    title: {
      type: String,
      default: ''
    },
    backgroundOpacity: {
      type: Number,
      default: 0.7
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      show: false,
      showIn: false,
      loadingStart: 0,
      animating: false
    };
  },
  computed: {
    wrapperStyle: function wrapperStyle() {
      var showIn = this.showIn,
          backgroundOpacity = this.backgroundOpacity;

      return {
        backgroundColor: 'rgba(0, 0, 0, ' + backgroundOpacity + ')',
        opacity: !showIn ? 0 : 1
      };
    },
    isCreator: function isCreator() {
      return weex.supports && weex.supports('@component/FmNativeWaiting');
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 原生上有点击穿透问题
      e.preventDefault && e.preventDefault();
    },
    appear: function appear(bool) {
      var _this = this;

      if (this.animating) {
        return;
      }
      var elm = this.$refs['fm-waiting'];
      if (!elm) {
        this.showIn = bool;
        return;
      }
      this.animating = true;
      animation.transition(elm, {
        styles: {
          opacity: bool ? 1 : 0
        },
        duration: 320,
        timingFunction: 'cubic-bezier(0.33, 0, 0.66, 1)'
      }, function () {
        _this.showIn = bool;
        if (bool) {
          _this.$emit('fmWaitingAppeared', false);
        } else {
          _this.$emit('fmWaitingDisappeared', false);
        }
        _this.animating = false;
      });
    },
    start: function start() {
      this.prepare();
      this.dot1Queue.loop();
      this.dot2Queue.loop();
      this.dot3Queue.loop();
    },
    stop: function stop() {
      this.dot1Queue && this.dot1Queue.stop();
      this.dot2Queue && this.dot2Queue.stop();
      this.dot3Queue && this.dot3Queue.stop();
    },
    warpperClicked: function warpperClicked() {
      if (this.animating) {
        return;
      }
      if (this.canAutoClose) {
        this.hide();
      }
    },
    prepare: function prepare() {
      this.dot1 = this.$refs['dot-1'];
      this.dot2 = this.$refs['dot-2'];
      this.dot3 = this.$refs['dot-3'];

      var steps1 = [{
        styles: {
          transform: 'translateX(48px) scale(1)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(96px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(90px) scale(0.3)',
          opacity: 0,
          perspective: 0
        },
        duration: 200, // ms
        timingFunction: 'linear'
      }, {
        styles: {
          transform: 'translateX(0px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 500, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }];
      this.dot1Queue = (0, _queue2.default)(this.dot1, steps1);

      var steps2 = [{
        styles: {
          transform: 'translateX(48px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(40px) scale(0.3)',
          opacity: 0,
          perspective: 0
        },
        duration: 200, // ms
        timingFunction: 'linear'
      }, {
        styles: {
          transform: 'translateX(-48px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 500, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(0px) scale(1)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }];
      this.dot2Queue = (0, _queue2.default)(this.dot2, steps2);

      var steps3 = [{
        styles: {
          transform: 'translateX(-6px) scale(0.3)',
          opacity: 0,
          perspective: 0
        },
        duration: 200, // ms
        timingFunction: 'linear'
      }, {
        styles: {
          transform: 'translateX(-96px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 500, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(-48px) scale(1)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }, {
        styles: {
          transform: 'translateX(0px) scale(0.5)',
          opacity: 1,
          perspective: 0
        },
        duration: 700, // ms
        timingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
      }];
      this.dot3Queue = (0, _queue2.default)(this.dot3, steps3);
    },
    active: function active() {
      var _this2 = this;

      if (this.show) {
        return;
      }

      this.show = true;
      this.loadingStart = new Date().getTime();

      if (this.isCreator) {
        this.$nextTick(function () {
          _this2.appear(true);
        });
      } else {
        setTimeout(function () {
          _this2.appear(true);
          _this2.start();
        }, 20);
      }
    },
    hide: function hide() {
      var _this3 = this;

      if (!this.show) {
        return;
      }

      this.show = false;
      var timeout = 0;
      if (new Date().getTime() - this.loadingStart <= 500) {
        timeout = 500;
      }
      setTimeout(function () {
        _this3.appear(false);
        !_this3.isCreator && _this3.stop();
      }, timeout);
    }
  }
};

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (element) {
  var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return new Queue(element, steps);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animation = weex.requireModule('animation');

;

var Queue = function () {
  function Queue(element) {
    var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Queue);

    this.element = element;
    this.steps = steps;
    this.currStep = -1;
    this.looping = false;
  }

  _createClass(Queue, [{
    key: 'start',
    value: function start() {
      this._excuteAll();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.currStep = -1;
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this = this;

      this.looping = true;
      var infinite = function infinite() {
        if (_this.looping) {
          _this._excuteAll(function () {
            _this.reset();
            infinite();
          });
        } else {
          return;
        }
      };
      infinite();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.looping = false;
    }
  }, {
    key: '_excuteAll',
    value: function _excuteAll(done) {
      var _this2 = this;

      var next = this._next();
      if (next) {
        this._animate(next, function () {
          setTimeout(function () {
            _this2._excuteAll(done);
          }, 1);
        });
      } else {
        typeof done === 'function' && done();
      }
    }
  }, {
    key: '_animate',
    value: function _animate(obj, done) {
      animation.transition(this.element, obj, function () {
        typeof done === 'function' && done();
      });
    }
  }, {
    key: '_next',
    value: function _next(done) {
      if (this.currStep < this.steps.length) {
        this.currStep++;
        return this.steps[this.currStep];
      } else {
        return false;
      }
    }
  }]);

  return Queue;
}();

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show || _vm.showIn) ? _c('div', {
    ref: "fm-waiting",
    staticClass: "fm-waiting",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapperStyle)),
    on: {
      "click": _vm.warpperClicked,
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show || _vm.showIn) ? _c('div', {
    class: ['waiting-wrapper', !_vm.isCreator ? 'waiting-wrapper-H5' : ''],
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [(!_vm.isCreator) ? [_c('div', {
    staticClass: "waiting-circle",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('div', {
    ref: "dot-1",
    staticClass: "waiting--dot waiting--dot-1",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    ref: "dot-2",
    staticClass: "waiting--dot waiting--dot-2",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }), _vm._v(" "), _c('div', {
    ref: "dot-3",
    staticClass: "waiting--dot waiting--dot-3",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  })]), _vm._v(" "), _c('text', {
    staticClass: "waiting--text",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._v(_vm._s(_vm.title))])] : [_c('FmNativeWaiting', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "text": _vm.title
    }
  })]], 2) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60cd183e", module.exports)
  }
}

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(270);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(271)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(273),
  /* template */
  __webpack_require__(274),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-52c2c46d",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-loading/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52c2c46d", Component.options)
  } else {
    hotAPI.reload("data-v-52c2c46d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(272);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("021fc504", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52c2c46d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-52c2c46d\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-loading[data-v-52c2c46d] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  /*兼容H5异常*/\n  z-index: 999;\n}\n.loading-wrapper[data-v-52c2c46d] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.loading--text[data-v-52c2c46d] {\n  font-size: 0.38889rem;\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  text-align: center;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-loading/index.vue?889957ca"],"names":[],"mappings":";AAmHA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,UAAA;EACA,aAAA;CACA;AAEA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,sBAAA;EACA,+BAAA;EACA,iBAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 2018/6/12. -->\n<template>\n  <div>\n    <div v-if=\"show || showIn\"\n         :style=\"wrapperStyle\"\n         ref=\"fm-loading\"\n         class=\"fm-loading\"\n         @click=\"warpperClicked\"\n         @touchend=\"handleTouchEnd\">\n      <div class=\"loading-wrapper\"\n          v-if=\"show || showIn\">\n          <FmLoading :text=\"title\"></FmLoading>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nconst animation = weex.requireModule('animation');\n\nexport default {\n  name: 'FmLoading',\n  props: {\n    title: {\n      type: String,\n      default: ''\n    },\n    backgroundColor: {\n      type: String,\n      default: '#FFFFFF'\n    },\n    canAutoClose: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data: () => ({\n    show: false,\n    showIn: false,\n    loadingStart: 0,\n    animating: false\n  }),\n  computed: {\n    wrapperStyle () {\n      const { showIn, backgroundColor } = this;\n      return {\n        backgroundColor,\n        opacity: !showIn ? 0 : 1\n      };\n    }\n  },\n  methods: {\n    handleTouchEnd (e) {\n      // 原生上有点击穿透问题\n      e.preventDefault && e.preventDefault();\n    },\n    appear (bool) {\n      if (this.animating) { return; }\n      const elm = this.$refs['fm-loading'];\n      if (!elm) {\n        this.showIn = bool;\n        return;\n      }\n      this.animating = true;\n      animation.transition(elm, {\n        styles: {\n          opacity: bool ? 1 : 0\n        },\n        duration: 320,\n        timingFunction: 'cubic-bezier(0.33, 0, 0.66, 1)'\n      }, () => {\n        this.showIn = bool;\n        if (bool) {\n          this.$emit('fmLoadingAppeared', false);\n        } else {\n          this.$emit('fmLoadingDisappeared', false);\n        }\n        this.animating = false;\n      });\n    },\n    warpperClicked () {\n      if (this.animating) { return; }\n      if (this.canAutoClose) {\n        this.hide();\n      }\n    },\n    active () {\n      if (this.show) {\n        return;\n      }\n      this.show = true;\n      this.loadingStart = new Date().getTime();\n      setTimeout(() => {\n        this.appear(true);\n      }, 20);\n    },\n    hide () {\n      if (!this.show) {\n        return;\n      }\n      this.show = false;\n      let timeout = 20;\n      if (new Date().getTime() - this.loadingStart <= 500) {\n        timeout = 500;\n      }\n      setTimeout(() => {\n        this.appear(false);\n      }, timeout);\n    }\n  }\n};\n</script>\n\n<style scoped>\n  .fm-loading {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    /*兼容H5异常*/\n    z-index: 999;\n  }\n\n  .loading-wrapper {\n    align-items: center;\n  }\n\n  .loading--text {\n    font-size: 42px;\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    text-align: center;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');

exports.default = {
  name: 'FmLoading',
  props: {
    title: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      show: false,
      showIn: false,
      loadingStart: 0,
      animating: false
    };
  },
  computed: {
    wrapperStyle: function wrapperStyle() {
      var showIn = this.showIn,
          backgroundColor = this.backgroundColor;

      return {
        backgroundColor: backgroundColor,
        opacity: !showIn ? 0 : 1
      };
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 原生上有点击穿透问题
      e.preventDefault && e.preventDefault();
    },
    appear: function appear(bool) {
      var _this = this;

      if (this.animating) {
        return;
      }
      var elm = this.$refs['fm-loading'];
      if (!elm) {
        this.showIn = bool;
        return;
      }
      this.animating = true;
      animation.transition(elm, {
        styles: {
          opacity: bool ? 1 : 0
        },
        duration: 320,
        timingFunction: 'cubic-bezier(0.33, 0, 0.66, 1)'
      }, function () {
        _this.showIn = bool;
        if (bool) {
          _this.$emit('fmLoadingAppeared', false);
        } else {
          _this.$emit('fmLoadingDisappeared', false);
        }
        _this.animating = false;
      });
    },
    warpperClicked: function warpperClicked() {
      if (this.animating) {
        return;
      }
      if (this.canAutoClose) {
        this.hide();
      }
    },
    active: function active() {
      var _this2 = this;

      if (this.show) {
        return;
      }
      this.show = true;
      this.loadingStart = new Date().getTime();
      setTimeout(function () {
        _this2.appear(true);
      }, 20);
    },
    hide: function hide() {
      var _this3 = this;

      if (!this.show) {
        return;
      }
      this.show = false;
      var timeout = 20;
      if (new Date().getTime() - this.loadingStart <= 500) {
        timeout = 500;
      }
      setTimeout(function () {
        _this3.appear(false);
      }, timeout);
    }
  }
};

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.show || _vm.showIn) ? _c('div', {
    ref: "fm-loading",
    staticClass: "fm-loading",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(_vm.wrapperStyle)),
    on: {
      "click": _vm.warpperClicked,
      "touchend": _vm.handleTouchEnd
    }
  }, [(_vm.show || _vm.showIn) ? _c('div', {
    staticClass: "loading-wrapper",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_c('FmLoading', {
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    attrs: {
      "text": _vm.title
    }
  })], 1) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-52c2c46d", module.exports)
  }
}

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FmLoading = exports.FmWaiting = exports.FmPopover = exports.FmSlider = exports.FmTextbar = exports.FmFooter = exports.FmBtnbar = exports.FmTabbarItem = exports.FmTabbar = exports.FmPanItem = exports.FmNativeTab = exports.FmTabPage = exports.FmSimpleList = exports.FmRcyCheck = exports.FmMultiCheckCell = exports.FmMultiCheckGroup = exports.FmTitlebar = exports.FmSearchbar = exports.FmActionView = exports.FmCheckboxList = exports.FmCheckbox = exports.FmSnackBar = exports.FmRater = exports.FmItem = exports.FmActionSheet = exports.FmPopup = exports.FmSimpleBtn = exports.FmDialog = exports.FmOverlay = exports.FmImage = exports.FmFoldableText = exports.FmSpecialRichText = exports.FmRichText = exports.FmTips = exports.FmInput = exports.FmButton = exports.FmSliderBar = exports.FmIcon = exports.FmText = exports.FmTagWall = exports.FmTag = exports.FmSwitch = exports.BindEnv = exports.Utils = undefined;

var _utils = __webpack_require__(42);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(51);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _fmSwitch = __webpack_require__(122);

var _fmSwitch2 = _interopRequireDefault(_fmSwitch);

var _fmTag = __webpack_require__(45);

var _fmTag2 = _interopRequireDefault(_fmTag);

var _fmTagWall = __webpack_require__(128);

var _fmTagWall2 = _interopRequireDefault(_fmTagWall);

var _fmText = __webpack_require__(3);

var _fmText2 = _interopRequireDefault(_fmText);

var _fmIcon = __webpack_require__(4);

var _fmIcon2 = _interopRequireDefault(_fmIcon);

var _fmSliderBar = __webpack_require__(137);

var _fmSliderBar2 = _interopRequireDefault(_fmSliderBar);

var _fmButton = __webpack_require__(34);

var _fmButton2 = _interopRequireDefault(_fmButton);

var _fmInput = __webpack_require__(72);

var _fmInput2 = _interopRequireDefault(_fmInput);

var _fmTips = __webpack_require__(143);

var _fmTips2 = _interopRequireDefault(_fmTips);

var _fmRichText = __webpack_require__(149);

var _fmRichText2 = _interopRequireDefault(_fmRichText);

var _fmSpecialRichText = __webpack_require__(158);

var _fmSpecialRichText2 = _interopRequireDefault(_fmSpecialRichText);

var _fmFoldableText = __webpack_require__(164);

var _fmFoldableText2 = _interopRequireDefault(_fmFoldableText);

var _fmImage = __webpack_require__(5);

var _fmImage2 = _interopRequireDefault(_fmImage);

var _fmOverlay = __webpack_require__(43);

var _fmOverlay2 = _interopRequireDefault(_fmOverlay);

var _fmDialog = __webpack_require__(120);

var _fmDialog2 = _interopRequireDefault(_fmDialog);

var _fmSimpleBtn = __webpack_require__(63);

var _fmSimpleBtn2 = _interopRequireDefault(_fmSimpleBtn);

var _fmPopup = __webpack_require__(74);

var _fmPopup2 = _interopRequireDefault(_fmPopup);

var _fmActionSheet = __webpack_require__(175);

var _fmActionSheet2 = _interopRequireDefault(_fmActionSheet);

var _fmItem = __webpack_require__(57);

var _fmItem2 = _interopRequireDefault(_fmItem);

var _fmRater = __webpack_require__(181);

var _fmRater2 = _interopRequireDefault(_fmRater);

var _fmSnackBar = __webpack_require__(121);

var _fmSnackBar2 = _interopRequireDefault(_fmSnackBar);

var _fmCheckbox = __webpack_require__(100);

var _fmCheckbox2 = _interopRequireDefault(_fmCheckbox);

var _fmCheckboxList = __webpack_require__(73);

var _fmCheckboxList2 = _interopRequireDefault(_fmCheckboxList);

var _fmActionView = __webpack_require__(193);

var _fmActionView2 = _interopRequireDefault(_fmActionView);

var _fmSearchbar = __webpack_require__(197);

var _fmSearchbar2 = _interopRequireDefault(_fmSearchbar);

var _fmTitlebar = __webpack_require__(101);

var _fmTitlebar2 = _interopRequireDefault(_fmTitlebar);

var _fmMultiCheckGroup = __webpack_require__(203);

var _fmMultiCheckGroup2 = _interopRequireDefault(_fmMultiCheckGroup);

var _fmMultiCheckCell = __webpack_require__(76);

var _fmMultiCheckCell2 = _interopRequireDefault(_fmMultiCheckCell);

var _fmRcyCheck = __webpack_require__(217);

var _fmRcyCheck2 = _interopRequireDefault(_fmRcyCheck);

var _fmSimpleList = __webpack_require__(223);

var _fmSimpleList2 = _interopRequireDefault(_fmSimpleList);

var _fmTabPage = __webpack_require__(276);

var _fmTabPage2 = _interopRequireDefault(_fmTabPage);

var _fmNativeTab = __webpack_require__(234);

var _fmNativeTab2 = _interopRequireDefault(_fmNativeTab);

var _fmPanItem = __webpack_require__(282);

var _fmPanItem2 = _interopRequireDefault(_fmPanItem);

var _fmTabbar = __webpack_require__(107);

var _fmTabbar2 = _interopRequireDefault(_fmTabbar);

var _fmTabbarItem = __webpack_require__(71);

var _fmTabbarItem2 = _interopRequireDefault(_fmTabbarItem);

var _fmBtnbar = __webpack_require__(240);

var _fmBtnbar2 = _interopRequireDefault(_fmBtnbar);

var _fmFooter = __webpack_require__(41);

var _fmFooter2 = _interopRequireDefault(_fmFooter);

var _fmTextbar = __webpack_require__(244);

var _fmTextbar2 = _interopRequireDefault(_fmTextbar);

var _fmSlider = __webpack_require__(250);

var _fmSlider2 = _interopRequireDefault(_fmSlider);

var _fmPopover = __webpack_require__(256);

var _fmPopover2 = _interopRequireDefault(_fmPopover);

var _fmWaiting = __webpack_require__(262);

var _fmWaiting2 = _interopRequireDefault(_fmWaiting);

var _fmLoading = __webpack_require__(269);

var _fmLoading2 = _interopRequireDefault(_fmLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Utils = _utils2.default;
exports.BindEnv = _bindEnv2.default;
exports.FmSwitch = _fmSwitch2.default;
exports.FmTag = _fmTag2.default;
exports.FmTagWall = _fmTagWall2.default;
exports.FmText = _fmText2.default;
exports.FmIcon = _fmIcon2.default;
exports.FmSliderBar = _fmSliderBar2.default;
exports.FmButton = _fmButton2.default;
exports.FmInput = _fmInput2.default;
exports.FmTips = _fmTips2.default;
exports.FmRichText = _fmRichText2.default;
exports.FmSpecialRichText = _fmSpecialRichText2.default;
exports.FmFoldableText = _fmFoldableText2.default;
exports.FmImage = _fmImage2.default;
exports.FmOverlay = _fmOverlay2.default;
exports.FmDialog = _fmDialog2.default;
exports.FmSimpleBtn = _fmSimpleBtn2.default;
exports.FmPopup = _fmPopup2.default;
exports.FmActionSheet = _fmActionSheet2.default;
exports.FmItem = _fmItem2.default;
exports.FmRater = _fmRater2.default;
exports.FmSnackBar = _fmSnackBar2.default;
exports.FmCheckbox = _fmCheckbox2.default;
exports.FmCheckboxList = _fmCheckboxList2.default;
exports.FmActionView = _fmActionView2.default;
exports.FmSearchbar = _fmSearchbar2.default;
exports.FmTitlebar = _fmTitlebar2.default;
exports.FmMultiCheckGroup = _fmMultiCheckGroup2.default;
exports.FmMultiCheckCell = _fmMultiCheckCell2.default;
exports.FmRcyCheck = _fmRcyCheck2.default;
exports.FmSimpleList = _fmSimpleList2.default;
exports.FmTabPage = _fmTabPage2.default;
exports.FmNativeTab = _fmNativeTab2.default;
exports.FmPanItem = _fmPanItem2.default;
exports.FmTabbar = _fmTabbar2.default;
exports.FmTabbarItem = _fmTabbarItem2.default;
exports.FmBtnbar = _fmBtnbar2.default;
exports.FmFooter = _fmFooter2.default;
exports.FmTextbar = _fmTextbar2.default;
exports.FmSlider = _fmSlider2.default;
exports.FmPopover = _fmPopover2.default;
exports.FmWaiting = _fmWaiting2.default;
exports.FmLoading = _fmLoading2.default;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(277);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(278)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(280),
  /* template */
  __webpack_require__(281),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4c615fcc",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tab-page/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c615fcc", Component.options)
  } else {
    hotAPI.reload("data-v-4c615fcc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(279);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1a9c8945", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c615fcc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c615fcc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.fm-tab-page[data-v-4c615fcc] {\n  width: 10rem;\n}\n.tab-title-list[data-v-4c615fcc] {\n  width: 10rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  border-bottom-width: 0.01852rem;\n  border-color: rgba(0,0,0,0.10);\n}\n.tab-title-wrap[data-v-4c615fcc] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  padding: 0 0.44444rem;\n}\n.title-item[data-v-4c615fcc] {\n  padding: 0.25rem 0.16667rem;\n  margin-right: 0.38889rem;\n}\n.item-title[data-v-4c615fcc] {\n  font-family: sans-serif-medium;\n  font-weight: 500;\n  font-size: 0.38889rem;\n  line-height: 0.52778rem;\n}\n.border-bottom[data-v-4c615fcc] {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 0.02778rem;\n  width: 1.22222rem;\n}\n.tab-page-wrap[data-v-4c615fcc] {\n  width: 10rem;\n  overflow: hidden;\n}\n.tab-container[data-v-4c615fcc] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n}\n.tab-item[data-v-4c615fcc] {\n  width: 10rem;\n}\n", "", {"version":3,"sources":["/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-tab-page/index.vue?04f9c838"],"names":[],"mappings":";AA+CA;EACA,aAAA;CACA;AAEA;EACA,aAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,gCAAA;EACA,+BAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sCAAA;UAAA,8BAAA;EACA,sBAAA;CACA;AAEA;EACA,4BAAA;EACA,yBAAA;CACA;AAEA;EACA,+BAAA;EACA,iBAAA;EACA,sBAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,QAAA;EACA,UAAA;EACA,mBAAA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,aAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2018-2022 FlymeApps Team Holding Limited. -->\n<!-- Created by Yanjiie on 18/03/06. -->\n<template>\n  <div class=\"fm-tab-page\"\n       :style=\"{ height: (tabPageHeight) + 'px', opacity: loaded ? 1 : 0}\">\n    <scroller class=\"tab-title-list\"\n              ref=\"tab-title-list\"\n              :show-scrollbar=\"false\"\n              scroll-direction=\"horizontal\"\n              :style=\"{ height: (cTabStyles.height) + 'px'}\">\n\n      <div class=\"tab-title-wrap\"\n           ref=\"tab-title-wrap\">\n        <div class=\"title-item\"\n             v-for=\"(v, idx) in tabTitles\"\n             :key=\"idx\"\n             @click=\"setPage(idx)\"\n             :ref=\"'fm-tab-title-'+idx\">\n          <text class=\"item-title\"\n                :style=\"{ fontSize: cTabStyles.fontSize + 'px', color: currentPage === idx ? cTabStyles.activeTitleColor : cTabStyles.titleColor, paddingLeft: cTabStyles.padding + 'px', paddingRight: cTabStyles.padding + 'px' }\">{{ v.title }}</text>\n        </div>\n        <div class=\"border-bottom\"\n             ref=\"tab-border\"\n             :style=\"{ width: bottomInitWidth + 'px', backgroundColor: cTabStyles.activeBottomColor }\"></div>\n      </div>\n    </scroller>\n    <div class=\"tab-page-wrap\"\n         ref=\"tab-page-wrap\"\n         @panstart=\"_onTouchStart\"\n         @panmove=\"_onTouchMove\"\n         @panend=\"_onTouchEnd\"\n         @horizontalpan=\"startHandler\"\n         :style=\"{ height: (tabPageHeight-cTabStyles.height) + 'px' }\">\n      <div class=\"tab-container\"\n           ref=\"tab-container\">\n        <div class=\"tab-item\"\n             v-for=\"(v, idx) in tabTitles\"\n             :key=\"idx\"\n             :style=\"{ height: (tabPageHeight-cTabStyles.height) + 'px' }\">\n          <slot :name=\"`tab-item-${idx}`\"></slot>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .fm-tab-page {\n    width: 1080px;\n  }\n\n  .tab-title-list {\n    width: 1080px;\n    flex-direction: row;\n    border-bottom-width: 2px;\n    border-color: rgba(0,0,0,0.10);\n  }\n\n  .tab-title-wrap {\n    flex-direction: row;\n    justify-content: space-around;\n    padding: 0 48px;\n  }\n\n  .title-item {\n    padding: 27px 18px;\n    margin-right: 42px;\n  }\n\n  .item-title {\n    font-family: sans-serif-medium;\n    font-weight: 500;\n    font-size: 42px;\n    line-height: 57px;\n  }\n\n  .border-bottom {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 3px;\n    width: 132px;\n  }\n\n  .tab-page-wrap {\n    width: 1080px;\n    overflow: hidden;\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-item {\n    width: 1080px;\n  }\n</style>\n\n<script>\nimport Binding from 'weex-bindingx/lib/index.weex.js';\nconst animation = weex.requireModule('animation');\nconst dom = weex.requireModule('dom');\nconst isH5 = weex.config.env.platform === 'Web';\n\nexport default {\n  name: 'FmTabPage',\n  props: {\n    tabTitles: {\n      type: Array,\n      default: () => ([])\n    },\n    panDist: {\n      type: Number,\n      default: 200\n    },\n    duration: {\n      type: [Number, String],\n      default: 300\n    },\n    tabPageHeight: {\n      type: [String, Number],\n      default: 1854\n    },\n    tabStyles: {\n      type: Object,\n      default: () => ({})\n    },\n    timingFunction: {\n      type: String,\n      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n    },\n    selectIndex: {\n      type: Number,\n      default: 0\n    }\n  },\n  watch: {\n    selectIndex (val) {\n      if (this.loaded) {\n        this.setPage(this.selectIndex, false);\n      }\n    }\n  },\n  computed: {\n    maxPage () {\n      return this.tabTitles.length - 1;\n    },\n    cTabStyles () {\n      const defaultStyle = {\n        titleColor: 'rgba(0, 0, 0, 0.6)',\n        activeTitleColor: '#198DED',\n        height: 102,\n        padding: 18,\n        fontSize: 42,\n        activeBottomColor: '#198DED'\n      };\n      return Object.assign({}, defaultStyle, this.tabStyles);\n    }\n  },\n  data: () => ({\n    loaded: false,\n    currentPage: 0,\n    gesToken: 0,\n    isMoving: false,\n    startTime: 0,\n    deltaX: 0,\n    translateX: 0,\n    startPosX: 0,\n    startPosY: 0,\n    judge: 'INITIAL',\n    bottomInitWidth: 0,\n    bottomInitOffset: 0,\n    tabPositions: []\n  }),\n  methods: {\n    next () {\n      let page = this.currentPage;\n      if (page < this.maxPage) {\n        page++;\n      }\n      this.setPage(page);\n    },\n    prev () {\n      let page = this.currentPage;\n      if (page > 0) {\n        page--;\n      }\n      this.setPage(page);\n    },\n    startHandler () {\n      this.bindExp(this.$refs['tab-page-wrap']);\n    },\n    _onTouchStart (e) {\n      if (isH5) {\n        this.startPosX = this._getTouchXPos(e);\n        this.startPosY = this._getTouchYPos(e);\n        this.deltaX = 0;\n        this.startTime = new Date().getTime();\n      }\n    },\n    _onTouchMove (e) {\n      if (isH5) {\n        this.deltaX = this._getTouchXPos(e) - this.startPosX;\n        this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);\n        if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {\n          this.judge = 'SLIDE_ING';\n        }\n      }\n    },\n    _onTouchEnd (e) {\n      if (isH5) {\n        if (this.judge === 'SLIDE_ING') {\n          if (this.deltaX < -50) {\n            this.next();\n          } else if (this.deltaX > 50) {\n            this.prev();\n          }\n        }\n        this.judge = 'INITIAL';\n      }\n    },\n    bindExp (element) {\n      if (element && element.ref) {\n        if (this.isMoving && this.gesToken !== 0) {\n          Binding.unbind({\n            eventType: 'pan',\n            token: this.gesToken\n          });\n          this.gesToken = 0;\n          return;\n        }\n\n        const tabPageEl = this.$refs['tab-container'];\n        const tabBorderEl = this.$refs['tab-border'];\n        const tabScrollEl = this.$refs['tab-title-list'];\n        const { currentPage, panDist, maxPage } = this;\n        const dist = currentPage * 1080; // tab 页偏移距离\n\n        const currOffset = this.tabPositions[currentPage].offset; // 当前 title 偏移量\n        const currWidth = this.tabPositions[currentPage].width; // 当前 title 宽度\n        const prevOffset = this.tabPositions[currentPage <= 0 ? 0 : currentPage - 1].offset; // 上一页 title 偏移量\n        const prevWidth = this.tabPositions[currentPage <= 0 ? 0 : currentPage - 1].width; // 上一页 title 宽度\n        const nextOffset = this.tabPositions[currentPage >= maxPage ? maxPage : currentPage + 1].offset; // 下一页 title 偏移量\n        const nextWidth = this.tabPositions[currentPage >= maxPage ? maxPage : currentPage + 1].width; // 上一页 title 宽度\n\n        // binding props\n        let tabExp = `x + ${-dist}`; // tab 页插值表达式\n\n        // bottom border 偏移动画插值表达式\n        const borderMoveExp = `x / 1080 * (x > 0 ? -${currOffset - prevOffset} : -${nextOffset - currOffset}) + ${currOffset}`;\n\n        /**\n         * bottom border 宽度动画变化规则描述\n         * @param currWidth 当前 tab 宽度(起始宽度)\n         * @param peakWidth 峰值宽度\n         * @param toWidth 最终宽度\n         * 变化描述：\n         *  当 currWidth === toWidth 时:\n         *    动画公式：currWidth -> toWidth (currWidth 递增至 toWidth)\n         *  当 currWidth !== toWidth 时:\n         *    动画公式：currWidth -> peakWidth -> toWidth (currWidth 先递增至 peakWidth 然后递减至 toWidth)\n         * peakWidth 峰值计算公式：peakWidth = currWidth / 2 + currWidth\n         */\n        // 滑向下一页的宽度变化动画插值表达式\n        const peakValue = currWidth / 2;\n        // 滑向下一页的宽度变化动画插值器\n        const nextInterpolator = nextWidth === currWidth ? `(abs(x) <= 540 ? (abs(x)/540 * ${peakValue}) : (2-abs(x)/540) * ${peakValue})` : `(abs(x)/1080 * ${nextWidth - currWidth})`;\n        // 滑向上一页的宽度变化动画插值器\n        const prevInterpolator = prevWidth === currWidth ? `(abs(x) <= 540 ? (abs(x)/540 * ${peakValue}) : (2-abs(x)/540) * ${peakValue})` : `(abs(x)/1080 * ${prevWidth - currWidth})`;\n        // bottom border 宽度变化动画插值器\n        let borderWidthExp = `${currWidth} + (x > 0 ? ${prevInterpolator} : ${nextInterpolator})`;\n\n        // tab scroller 滑动动画插值表达式\n        const tabScrollExp = `${(currOffset - 540 + currWidth / 2)} - x / 1080 * ${(nextOffset - 540 + nextWidth / 2) - (currOffset - 540 + currWidth / 2)} - ${(currOffset - 540) < 0 ? 48 : 0}`;\n\n        // 当页数为 0 或 max 时去除尽头动画\n        if (currentPage === 0) {\n          tabExp = `x >= 0 ? 0 : x`;\n          borderWidthExp = `x >= 0 ? ${currWidth} : ${borderWidthExp}`;\n        } else if (currentPage === maxPage) {\n          tabExp = `x <= 0 ? ${-maxPage * 1080} : x + ${-dist}`;\n          borderWidthExp = `x <= 0 ? ${currWidth} : ${borderWidthExp}`;\n        }\n\n        const props = [{\n          element: tabPageEl.ref,\n          property: 'transform.translateX',\n          expression: tabExp\n        }, {\n          element: tabBorderEl.ref,\n          property: 'transform.translateX',\n          expression: borderMoveExp\n        }, {\n          element: tabBorderEl.ref,\n          property: 'width',\n          expression: borderWidthExp\n        }, {\n          element: tabScrollEl.ref,\n          property: 'scroll.contentOffset',\n          expression: tabScrollExp\n        }];\n\n        const gesTokenObj = Binding.bind({\n          anchor: element.ref,\n          eventType: 'pan',\n          props\n        }, (e) => {\n          const { deltaX, state } = e;\n          if (state === 'end') {\n            if (deltaX < -panDist) {\n              this.next();\n            } else if (deltaX > panDist) {\n              this.prev();\n            } else {\n              this.setPage(currentPage);\n            }\n          }\n        });\n\n        this.gesToken = gesTokenObj.token;\n      }\n    },\n    setPage (page, animated = true) {\n      if (this.isMoving === true) {\n        return;\n      }\n      this.isMoving = true;\n      const currentTabEl = this.$refs[`fm-tab-title-${page}`][0];\n      const tabWidth = this.tabPositions[page].width;\n      const tabOffset = this.tabPositions[page].offset;\n\n      if (tabOffset >= 1080 / 2) {\n        dom.scrollToElement(currentTabEl, {\n          offset: -1080 / 2 + tabWidth / 2,\n          animated\n        });\n      } else {\n        dom.scrollToElement(currentTabEl, {\n          offset: -tabOffset,\n          animated\n        });\n      }\n\n      this.currentPage = page;\n      this._animateTransformX(page, animated);\n      this._animateBorder(page, animated);\n      this.$emit('fmTabPageTabSelected', { page });\n    },\n    _animateTransformX (page, animated = true) {\n      const { duration, timingFunction } = this;\n      const containerEl = this.$refs[`tab-container`];\n      const dist = page * 1080;\n      animation.transition(containerEl, {\n        styles: {\n          transform: `translateX(${-dist}px)`\n        },\n        duration: animated ? duration : 0.00001,\n        timingFunction,\n        delay: 0\n      }, () => {\n        this.isMoving = false;\n      });\n    },\n    _animateBorder (page, animated = true) {\n      const { duration, timingFunction, tabPositions } = this;\n      const borderEl = this.$refs[`tab-border`];\n      const dist = tabPositions[page].offset;\n      animation.transition(borderEl, {\n        styles: {\n          transform: `translateX(${dist}px)`,\n          width: tabPositions[page].width\n        },\n        duration: animated ? duration : 0.00001,\n        timingFunction,\n        needLayout: false\n      }, () => {\n        this.isMoving = false;\n      });\n    },\n    _getTouchXPos (e) {\n      return e.changedTouches[0]['pageX'];\n    },\n    _getTouchYPos (e) {\n      return e.changedTouches[0]['pageY'];\n    },\n    _calculatePositions () {\n      const { tabTitles } = this;\n      tabTitles.map((item, i) => {\n        dom.getComponentRect(this.$refs['fm-tab-title-' + i][0], rect => {\n          this.tabPositions[i] = {\n            width: rect.size.width,\n            offset: rect.size.left\n          };\n          if (i === this.selectIndex) {\n            this.bottomInitWidth = rect.size.width;\n            this.bottomInitOffset = rect.size.left;\n            this.setPage(this.selectIndex, false);\n            setTimeout(() => {\n              this.loaded = true;\n            }, 50);\n          }\n        });\n      });\n    }\n  },\n  mounted () {\n    const tabPageEl = this.$refs['tab-page-wrap'];\n    Binding.prepare && Binding.prepare({\n      anchor: tabPageEl.ref,\n      eventType: 'pan'\n    });\n    setTimeout(() => {\n      this._calculatePositions();\n    }, 50);\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(44);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var isH5 = weex.config.env.platform === 'Web';

exports.default = {
  name: 'FmTabPage',
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1854
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    selectIndex: function selectIndex(val) {
      if (this.loaded) {
        this.setPage(this.selectIndex, false);
      }
    }
  },
  computed: {
    maxPage: function maxPage() {
      return this.tabTitles.length - 1;
    },
    cTabStyles: function cTabStyles() {
      var defaultStyle = {
        titleColor: 'rgba(0, 0, 0, 0.6)',
        activeTitleColor: '#198DED',
        height: 102,
        padding: 18,
        fontSize: 42,
        activeBottomColor: '#198DED'
      };
      return Object.assign({}, defaultStyle, this.tabStyles);
    }
  },
  data: function data() {
    return {
      loaded: false,
      currentPage: 0,
      gesToken: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0,
      startPosX: 0,
      startPosY: 0,
      judge: 'INITIAL',
      bottomInitWidth: 0,
      bottomInitOffset: 0,
      tabPositions: []
    };
  },
  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.maxPage) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler() {
      this.bindExp(this.$refs['tab-page-wrap']);
    },
    _onTouchStart: function _onTouchStart(e) {
      if (isH5) {
        this.startPosX = this._getTouchXPos(e);
        this.startPosY = this._getTouchYPos(e);
        this.deltaX = 0;
        this.startTime = new Date().getTime();
      }
    },
    _onTouchMove: function _onTouchMove(e) {
      if (isH5) {
        this.deltaX = this._getTouchXPos(e) - this.startPosX;
        this.deltaY = Math.abs(this._getTouchYPos(e) - this.startPosY + 1);
        if (this.judge === 'INITIAL' && Math.abs(this.deltaX) / this.deltaY > 1.73) {
          this.judge = 'SLIDE_ING';
        }
      }
    },
    _onTouchEnd: function _onTouchEnd(e) {
      if (isH5) {
        if (this.judge === 'SLIDE_ING') {
          if (this.deltaX < -50) {
            this.next();
          } else if (this.deltaX > 50) {
            this.prev();
          }
        }
        this.judge = 'INITIAL';
      }
    },
    bindExp: function bindExp(element) {
      var _this = this;

      if (element && element.ref) {
        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        var tabPageEl = this.$refs['tab-container'];
        var tabBorderEl = this.$refs['tab-border'];
        var tabScrollEl = this.$refs['tab-title-list'];
        var currentPage = this.currentPage,
            panDist = this.panDist,
            maxPage = this.maxPage;

        var dist = currentPage * 1080; // tab 页偏移距离

        var currOffset = this.tabPositions[currentPage].offset; // 当前 title 偏移量
        var currWidth = this.tabPositions[currentPage].width; // 当前 title 宽度
        var prevOffset = this.tabPositions[currentPage <= 0 ? 0 : currentPage - 1].offset; // 上一页 title 偏移量
        var prevWidth = this.tabPositions[currentPage <= 0 ? 0 : currentPage - 1].width; // 上一页 title 宽度
        var nextOffset = this.tabPositions[currentPage >= maxPage ? maxPage : currentPage + 1].offset; // 下一页 title 偏移量
        var nextWidth = this.tabPositions[currentPage >= maxPage ? maxPage : currentPage + 1].width; // 上一页 title 宽度

        // binding props
        var tabExp = 'x + ' + -dist; // tab 页插值表达式

        // bottom border 偏移动画插值表达式
        var borderMoveExp = 'x / 1080 * (x > 0 ? -' + (currOffset - prevOffset) + ' : -' + (nextOffset - currOffset) + ') + ' + currOffset;

        /**
         * bottom border 宽度动画变化规则描述
         * @param currWidth 当前 tab 宽度(起始宽度)
         * @param peakWidth 峰值宽度
         * @param toWidth 最终宽度
         * 变化描述：
         *  当 currWidth === toWidth 时:
         *    动画公式：currWidth -> toWidth (currWidth 递增至 toWidth)
         *  当 currWidth !== toWidth 时:
         *    动画公式：currWidth -> peakWidth -> toWidth (currWidth 先递增至 peakWidth 然后递减至 toWidth)
         * peakWidth 峰值计算公式：peakWidth = currWidth / 2 + currWidth
         */
        // 滑向下一页的宽度变化动画插值表达式
        var peakValue = currWidth / 2;
        // 滑向下一页的宽度变化动画插值器
        var nextInterpolator = nextWidth === currWidth ? '(abs(x) <= 540 ? (abs(x)/540 * ' + peakValue + ') : (2-abs(x)/540) * ' + peakValue + ')' : '(abs(x)/1080 * ' + (nextWidth - currWidth) + ')';
        // 滑向上一页的宽度变化动画插值器
        var prevInterpolator = prevWidth === currWidth ? '(abs(x) <= 540 ? (abs(x)/540 * ' + peakValue + ') : (2-abs(x)/540) * ' + peakValue + ')' : '(abs(x)/1080 * ' + (prevWidth - currWidth) + ')';
        // bottom border 宽度变化动画插值器
        var borderWidthExp = currWidth + ' + (x > 0 ? ' + prevInterpolator + ' : ' + nextInterpolator + ')';

        // tab scroller 滑动动画插值表达式
        var tabScrollExp = currOffset - 540 + currWidth / 2 + ' - x / 1080 * ' + (nextOffset - 540 + nextWidth / 2 - (currOffset - 540 + currWidth / 2)) + ' - ' + (currOffset - 540 < 0 ? 48 : 0);

        // 当页数为 0 或 max 时去除尽头动画
        if (currentPage === 0) {
          tabExp = 'x >= 0 ? 0 : x';
          borderWidthExp = 'x >= 0 ? ' + currWidth + ' : ' + borderWidthExp;
        } else if (currentPage === maxPage) {
          tabExp = 'x <= 0 ? ' + -maxPage * 1080 + ' : x + ' + -dist;
          borderWidthExp = 'x <= 0 ? ' + currWidth + ' : ' + borderWidthExp;
        }

        var props = [{
          element: tabPageEl.ref,
          property: 'transform.translateX',
          expression: tabExp
        }, {
          element: tabBorderEl.ref,
          property: 'transform.translateX',
          expression: borderMoveExp
        }, {
          element: tabBorderEl.ref,
          property: 'width',
          expression: borderWidthExp
        }, {
          element: tabScrollEl.ref,
          property: 'scroll.contentOffset',
          expression: tabScrollExp
        }];

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          var deltaX = e.deltaX,
              state = e.state;

          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });

        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {
      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var currentTabEl = this.$refs['fm-tab-title-' + page][0];
      var tabWidth = this.tabPositions[page].width;
      var tabOffset = this.tabPositions[page].offset;

      if (tabOffset >= 1080 / 2) {
        dom.scrollToElement(currentTabEl, {
          offset: -1080 / 2 + tabWidth / 2,
          animated: animated
        });
      } else {
        dom.scrollToElement(currentTabEl, {
          offset: -tabOffset,
          animated: animated
        });
      }

      this.currentPage = page;
      this._animateTransformX(page, animated);
      this._animateBorder(page, animated);
      this.$emit('fmTabPageTabSelected', { page: page });
    },
    _animateTransformX: function _animateTransformX(page) {
      var _this2 = this;

      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var containerEl = this.$refs['tab-container'];
      var dist = page * 1080;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: animated ? duration : 0.00001,
        timingFunction: timingFunction,
        delay: 0
      }, function () {
        _this2.isMoving = false;
      });
    },
    _animateBorder: function _animateBorder(page) {
      var _this3 = this;

      var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var duration = this.duration,
          timingFunction = this.timingFunction,
          tabPositions = this.tabPositions;

      var borderEl = this.$refs['tab-border'];
      var dist = tabPositions[page].offset;
      animation.transition(borderEl, {
        styles: {
          transform: 'translateX(' + dist + 'px)',
          width: tabPositions[page].width
        },
        duration: animated ? duration : 0.00001,
        timingFunction: timingFunction,
        needLayout: false
      }, function () {
        _this3.isMoving = false;
      });
    },
    _getTouchXPos: function _getTouchXPos(e) {
      return e.changedTouches[0]['pageX'];
    },
    _getTouchYPos: function _getTouchYPos(e) {
      return e.changedTouches[0]['pageY'];
    },
    _calculatePositions: function _calculatePositions() {
      var _this4 = this;

      var tabTitles = this.tabTitles;

      tabTitles.map(function (item, i) {
        dom.getComponentRect(_this4.$refs['fm-tab-title-' + i][0], function (rect) {
          _this4.tabPositions[i] = {
            width: rect.size.width,
            offset: rect.size.left
          };
          if (i === _this4.selectIndex) {
            _this4.bottomInitWidth = rect.size.width;
            _this4.bottomInitOffset = rect.size.left;
            _this4.setPage(_this4.selectIndex, false);
            setTimeout(function () {
              _this4.loaded = true;
            }, 50);
          }
        });
      });
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    var tabPageEl = this.$refs['tab-page-wrap'];
    _indexWeex2.default.prepare && _indexWeex2.default.prepare({
      anchor: tabPageEl.ref,
      eventType: 'pan'
    });
    setTimeout(function () {
      _this5._calculatePositions();
    }, 50);
  }
};

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fm-tab-page",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight) + 'px',
      opacity: _vm.loaded ? 1 : 0
    }))
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: "tab-title-list",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.cTabStyles.height) + 'px'
    })),
    attrs: {
      "show-scrollbar": false,
      "scroll-direction": "horizontal"
    }
  }, [_c('div', {
    ref: "tab-title-wrap",
    staticClass: "tab-title-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, [_vm._l((_vm.tabTitles), function(v, idx) {
    return _c('div', {
      key: idx,
      ref: 'fm-tab-title-' + idx,
      refInFor: true,
      staticClass: "title-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle(undefined)),
      on: {
        "click": function($event) {
          _vm.setPage(idx)
        }
      }
    }, [_c('text', {
      staticClass: "item-title",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        fontSize: _vm.cTabStyles.fontSize + 'px',
        color: _vm.currentPage === idx ? _vm.cTabStyles.activeTitleColor : _vm.cTabStyles.titleColor,
        paddingLeft: _vm.cTabStyles.padding + 'px',
        paddingRight: _vm.cTabStyles.padding + 'px'
      }))
    }, [_vm._v(_vm._s(v.title))])])
  }), _vm._v(" "), _c('div', {
    ref: "tab-border",
    staticClass: "border-bottom",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      width: _vm.bottomInitWidth + 'px',
      backgroundColor: _vm.cTabStyles.activeBottomColor
    }))
  })], 2)]), _vm._v(" "), _c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle({
      height: (_vm.tabPageHeight - _vm.cTabStyles.height) + 'px'
    })),
    on: {
      "panstart": _vm._onTouchStart,
      "panmove": _vm._onTouchMove,
      "panend": _vm._onTouchEnd,
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined))
  }, _vm._l((_vm.tabTitles), function(v, idx) {
    return _c('div', {
      key: idx,
      staticClass: "tab-item",
      staticStyle: _vm.$processStyle(undefined),
      style: (_vm.$processStyle({
        height: (_vm.tabPageHeight - _vm.cTabStyles.height) + 'px'
      }))
    }, [_vm._t(("tab-item-" + idx))], 2)
  }))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c615fcc", module.exports)
  }
}

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(283);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(284),
  /* template */
  __webpack_require__(285),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-pan-item/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2948fd70", Component.options)
  } else {
    hotAPI.reload("data-v-2948fd70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(44);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _utils = __webpack_require__(42);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(51);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      isPanning: false,
      appearMap: [],
      supportAndroid: _bindEnv2.default.supportsEBForAndroid()
    };
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      if (_this.supportAndroid) {
        var element = _this.$refs['fm-pan-item'];
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: element.ref,
          eventType: 'pan'
        });
      }
    }, 300);
  },

  methods: {
    itemClicked: function itemClicked() {
      if (this.isPanning) {
        return;
      }
      this.url && _utils2.default.goToH5Page(this.url, true);
      this.$emit('fmPanItemClicked', { extId: this.extId });
    },
    dispatchPan: function dispatchPan(e) {
      var _this2 = this;

      if (this.supportAndroid) {
        if (e.state === 'start') {
          this.isPanning = true;
          var element = this.$refs['fm-pan-item'];
          element && this.$emit('fmPanItemPan', { element: element });
        } else if (e.state === 'end') {
          setTimeout(function () {
            _this2.isPanning = false;
          }, 50);
        }
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.supportAndroid) ? _c('div', {
    ref: "fm-pan-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "horizontalpan": _vm.dispatchPan,
      "appear": _vm.onItemAppear,
      "disappear": _vm.onItemDisAppear,
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2) : _c('div', {
    ref: "fm-pan-item",
    staticStyle: _vm.$processStyle(undefined),
    style: (_vm.$processStyle(undefined)),
    on: {
      "click": _vm.itemClicked
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2948fd70", module.exports)
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.web.js.map
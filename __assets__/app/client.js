
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// node_modules/lodash/lodash.js
var require_lodash = __commonJS((exports, module) => {
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  (function() {
    var undefined2;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      \u00C0: "A",
      \u00C1: "A",
      \u00C2: "A",
      \u00C3: "A",
      \u00C4: "A",
      \u00C5: "A",
      \u00E0: "a",
      \u00E1: "a",
      \u00E2: "a",
      \u00E3: "a",
      \u00E4: "a",
      \u00E5: "a",
      \u00C7: "C",
      \u00E7: "c",
      \u00D0: "D",
      \u00F0: "d",
      \u00C8: "E",
      \u00C9: "E",
      \u00CA: "E",
      \u00CB: "E",
      \u00E8: "e",
      \u00E9: "e",
      \u00EA: "e",
      \u00EB: "e",
      \u00CC: "I",
      \u00CD: "I",
      \u00CE: "I",
      \u00CF: "I",
      \u00EC: "i",
      \u00ED: "i",
      \u00EE: "i",
      \u00EF: "i",
      \u00D1: "N",
      \u00F1: "n",
      \u00D2: "O",
      \u00D3: "O",
      \u00D4: "O",
      \u00D5: "O",
      \u00D6: "O",
      \u00D8: "O",
      \u00F2: "o",
      \u00F3: "o",
      \u00F4: "o",
      \u00F5: "o",
      \u00F6: "o",
      \u00F8: "o",
      \u00D9: "U",
      \u00DA: "U",
      \u00DB: "U",
      \u00DC: "U",
      \u00F9: "u",
      \u00FA: "u",
      \u00FB: "u",
      \u00FC: "u",
      \u00DD: "Y",
      \u00FD: "y",
      \u00FF: "y",
      \u00C6: "Ae",
      \u00E6: "ae",
      \u00DE: "Th",
      \u00FE: "th",
      \u00DF: "ss",
      \u0100: "A",
      \u0102: "A",
      \u0104: "A",
      \u0101: "a",
      \u0103: "a",
      \u0105: "a",
      \u0106: "C",
      \u0108: "C",
      \u010A: "C",
      \u010C: "C",
      \u0107: "c",
      \u0109: "c",
      \u010B: "c",
      \u010D: "c",
      \u010E: "D",
      \u0110: "D",
      \u010F: "d",
      \u0111: "d",
      \u0112: "E",
      \u0114: "E",
      \u0116: "E",
      \u0118: "E",
      \u011A: "E",
      \u0113: "e",
      \u0115: "e",
      \u0117: "e",
      \u0119: "e",
      \u011B: "e",
      \u011C: "G",
      \u011E: "G",
      \u0120: "G",
      \u0122: "G",
      \u011D: "g",
      \u011F: "g",
      \u0121: "g",
      \u0123: "g",
      \u0124: "H",
      \u0126: "H",
      \u0125: "h",
      \u0127: "h",
      \u0128: "I",
      \u012A: "I",
      \u012C: "I",
      \u012E: "I",
      \u0130: "I",
      \u0129: "i",
      \u012B: "i",
      \u012D: "i",
      \u012F: "i",
      \u0131: "i",
      \u0134: "J",
      \u0135: "j",
      \u0136: "K",
      \u0137: "k",
      \u0138: "k",
      \u0139: "L",
      \u013B: "L",
      \u013D: "L",
      \u013F: "L",
      \u0141: "L",
      \u013A: "l",
      \u013C: "l",
      \u013E: "l",
      \u0140: "l",
      \u0142: "l",
      \u0143: "N",
      \u0145: "N",
      \u0147: "N",
      \u014A: "N",
      \u0144: "n",
      \u0146: "n",
      \u0148: "n",
      \u014B: "n",
      \u014C: "O",
      \u014E: "O",
      \u0150: "O",
      \u014D: "o",
      \u014F: "o",
      \u0151: "o",
      \u0154: "R",
      \u0156: "R",
      \u0158: "R",
      \u0155: "r",
      \u0157: "r",
      \u0159: "r",
      \u015A: "S",
      \u015C: "S",
      \u015E: "S",
      \u0160: "S",
      \u015B: "s",
      \u015D: "s",
      \u015F: "s",
      \u0161: "s",
      \u0162: "T",
      \u0164: "T",
      \u0166: "T",
      \u0163: "t",
      \u0165: "t",
      \u0167: "t",
      \u0168: "U",
      \u016A: "U",
      \u016C: "U",
      \u016E: "U",
      \u0170: "U",
      \u0172: "U",
      \u0169: "u",
      \u016B: "u",
      \u016D: "u",
      \u016F: "u",
      \u0171: "u",
      \u0173: "u",
      \u0174: "W",
      \u0175: "w",
      \u0176: "Y",
      \u0177: "y",
      \u0178: "Y",
      \u0179: "Z",
      \u017B: "Z",
      \u017D: "Z",
      \u017A: "z",
      \u017C: "z",
      \u017E: "z",
      \u0132: "IJ",
      \u0133: "ij",
      \u0152: "Oe",
      \u0153: "oe",
      \u0149: "'n",
      \u017F: "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined2 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined2 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined2) {
          result = result === undefined2 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache2, key) {
      return cache2.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined2 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var Buffer3 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer3 ? Buffer3.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap && new WeakMap();
      var realNames = {};
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {
        }
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object();
          object.prototype = undefined2;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined2;
      }
      lodash.templateSettings = {
        escape: reEscape,
        evaluate: reEvaluate,
        interpolate: reInterpolate,
        variable: "",
        imports: {
          _: lodash
        }
      };
      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED ? undefined2 : result2;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined2;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined2 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          hash: new Hash(),
          map: new (Map2 || ListCache)(),
          string: new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined2;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined2 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined2) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined2) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined2) {
          return result2;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer2(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined2 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined2 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout3(function() {
          func.apply(undefined2, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined2 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined2;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined2 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined2 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer2(object)) {
          if (!isBuffer2(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined2 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
            if (newValue === undefined2) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
        var isCommon = newValue === undefined2;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined2;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return {criteria, index: ++index, value};
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n) {
        var result2 = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n % 2) {
            result2 += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined2;
            if (newValue === undefined2) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee2 ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
        }
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined2;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined2 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout3 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
          if (newValue === undefined2) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined2 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined2 && other === undefined2) {
            return defaultValue;
          }
          if (value !== undefined2) {
            result2 = value;
          }
          if (other !== undefined2) {
            if (result2 === undefined2) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined2 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined2;
          }
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined2, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined2;
        }
        ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined2 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined2;
        }
        var data = isBindKey ? undefined2 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined2, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined2 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined2) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined2, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined2;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined2;
          var unmasked = true;
        } catch (e) {
        }
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return {start, end};
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout3 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined2, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined2 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined2;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined2;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined2;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined2;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined2) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined2 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined2 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return array && array.length ? baseUniq(array, undefined2, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined2, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined2;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined2;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          func: thru,
          args: [interceptor],
          thisArg: undefined2
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined2);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined2) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
        return {done, value};
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined2;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            func: thru,
            args: [reverse],
            thisArg: undefined2
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined2 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined2 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined2;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy2 = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined2 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
      }
      function before(n, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined2;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined2 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined2;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout3(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout3(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined2;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined2;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined2) {
            clearTimeout3(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined2;
        }
        function flush() {
          return timerId === undefined2 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined2) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout3(timerId);
              timerId = setTimeout3(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined2) {
            timerId = setTimeout3(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache2.set(key, result2) || cache2;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once2(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined2 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          leading,
          maxWait: wait,
          trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer2 = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        var result2 = customizer ? customizer(value, other) : undefined2;
        return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined2;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined2;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined2, customDefaultsMerge);
        return apply(mergeWith, undefined2, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined2 : baseGet(object, path);
        return result2 === undefined2 ? defaultValue : result2;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined2;
        }
        while (++index < length) {
          var value = object == null ? undefined2 : object[toKey(path[index])];
          if (value === undefined2) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer2(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined2;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined2) {
          upper = lower;
          lower = undefined2;
        }
        if (upper !== undefined2) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined2) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined2) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined2;
        }
        if (floating === undefined2) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined2;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined2;
          }
        }
        if (lower === undefined2 && upper === undefined2) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined2) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }
      function replace() {
        var args = arguments, string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined2;
        }
        limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined2;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined2)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined2) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined2 : pattern;
        if (pattern === undefined2) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined2, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({func, args: arguments, thisArg: object});
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {
      }
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined2 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once2;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy2;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith;
      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith;
      mixin(lodash, lodash);
      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer2;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt2;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext2;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;
      mixin(lodash, function() {
        var source = {};
        baseForOwn(lodash, function(func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), {chain: false});
      lodash.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash[methodName].placeholder = lodash;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
          } else {
            result2.__views__.push({
              size: nativeMin(n, MAX_ARRAY_LENGTH),
              type: methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            iteratee: getIteratee(iteratee2, 3),
            type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined2) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({func: thru, args: [interceptor], thisArg: undefined2});
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({name: methodName, func: lodashFunc});
        }
      });
      realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
        name: "wrapper",
        func: undefined2
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
      lodash.prototype.first = lodash.prototype.head;
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    };
    var _ = runInContext();
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
      root._ = _;
      define(function() {
        return _;
      });
    } else if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(exports);
});

// node_modules/imba/src/imba/utils.imba
var $23 = Symbol.for("#__initor__");
var $24 = Symbol.for("#__inited__");
var $1 = Symbol.for("#__hooks__");
var $2 = Symbol.for("#type");
var $21 = Symbol.for("#__listeners__");
function parseTime(value) {
  let typ = typeof value;
  if (typ == "number") {
    return value;
  }
  ;
  if (typ == "string") {
    if (/^\d+fps$/.test(value)) {
      return 1e3 / parseFloat(value);
    } else if (/^([-+]?[\d\.]+)s$/.test(value)) {
      return parseFloat(value) * 1e3;
    } else if (/^([-+]?[\d\.]+)ms$/.test(value)) {
      return parseFloat(value);
    }
    ;
  }
  ;
  return null;
}
function getDeepPropertyDescriptor(item, key, stop) {
  if (!item) {
    return void 0;
  }
  ;
  let desc = Object.getOwnPropertyDescriptor(item, key);
  if (desc || item == stop) {
    return desc || void 0;
  }
  ;
  return getDeepPropertyDescriptor(Reflect.getPrototypeOf(item), key, stop);
}
var emit__ = function(event, args, node) {
  let prev;
  let cb;
  let ret;
  while ((prev = node) && (node = node.next)) {
    if (cb = node.listener) {
      if (node.path && cb[node.path]) {
        ret = args ? cb[node.path].apply(cb, args) : cb[node.path]();
      } else {
        ret = args ? cb.apply(node, args) : cb.call(node);
      }
      ;
    }
    ;
    if (node.times && --node.times <= 0) {
      prev.next = node.next;
      node.listener = null;
    }
    ;
  }
  ;
  return;
};
function listen(obj, event, listener, path) {
  var $225;
  let cbs;
  let list;
  let tail;
  cbs = obj[$21] || (obj[$21] = {});
  list = cbs[event] || (cbs[event] = {});
  tail = list.tail || (list.tail = list.next = {});
  tail.listener = listener;
  tail.path = path;
  list.tail = tail.next = {};
  return tail;
}
function once(obj, event, listener) {
  let tail = listen(obj, event, listener);
  tail.times = 1;
  return tail;
}
function unlisten(obj, event, cb, meth) {
  let node;
  let prev;
  let meta = obj[$21];
  if (!meta) {
    return;
  }
  ;
  if (node = meta[event]) {
    while ((prev = node) && (node = node.next)) {
      if (node == cb || node.listener == cb) {
        prev.next = node.next;
        node.listener = null;
        break;
      }
      ;
    }
    ;
  }
  ;
  return;
}
function emit(obj, event, params) {
  let cb;
  if (cb = obj[$21]) {
    if (cb[event]) {
      emit__(event, params, cb[event]);
    }
    ;
    if (cb.all) {
      emit__(event, [event, params], cb.all);
    }
    ;
  }
  ;
  return;
}

// node_modules/imba/src/imba/scheduler.imba
function iter$__(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $12 = Symbol.for("#__init__");
var $22 = Symbol.for("#__patch__");
var $19 = Symbol.for("#__initor__");
var $20 = Symbol.for("#__inited__");
var $3 = Symbol.for("#__hooks__");
var $4 = Symbol.for("#schedule");
var $7 = Symbol.for("#frames");
var $8 = Symbol.for("#interval");
var $9 = Symbol.for("#stage");
var $10 = Symbol.for("#scheduled");
var $11 = Symbol.for("#version");
var $122 = Symbol.for("#fps");
var $13 = Symbol.for("#ticker");
var rAF = globalThis.requestAnimationFrame || function(blk) {
  return globalThis.setTimeout(blk, 1e3 / 60);
};
var SPF = 1 / 60;
var Scheduled = class {
  [$22]($$ = {}) {
    var $510;
    ($510 = $$.owner) !== void 0 && (this.owner = $510);
    ($510 = $$.target) !== void 0 && (this.target = $510);
    ($510 = $$.active) !== void 0 && (this.active = $510);
    ($510 = $$.value) !== void 0 && (this.value = $510);
    ($510 = $$.skip) !== void 0 && (this.skip = $510);
    ($510 = $$.last) !== void 0 && (this.last = $510);
  }
  constructor($$ = null) {
    this[$12]($$);
  }
  [$12]($$ = null) {
    var $610;
    this.owner = $$ && ($610 = $$.owner) !== void 0 ? $610 : null;
    this.target = $$ && ($610 = $$.target) !== void 0 ? $610 : null;
    this.active = $$ && ($610 = $$.active) !== void 0 ? $610 : false;
    this.value = $$ && ($610 = $$.value) !== void 0 ? $610 : void 0;
    this.skip = $$ && ($610 = $$.skip) !== void 0 ? $610 : 0;
    this.last = $$ && ($610 = $$.last) !== void 0 ? $610 : 0;
  }
  tick(scheduler2, source) {
    this.last = this.owner[$7];
    this.target.tick(this, source);
    return 1;
  }
  update(o, activate\u03A6) {
    let on = this.active;
    let val = o.value;
    let changed = this.value != val;
    if (changed) {
      this.deactivate();
      this.value = val;
    }
    ;
    if (this.value || on || activate\u03A6) {
      this.activate();
    }
    ;
    return this;
  }
  queue() {
    this.owner.add(this);
    return;
  }
  activate() {
    if (this.value === true) {
      this.owner.on("commit", this);
    } else if (this.value === false) {
      true;
    } else if (typeof this.value == "number") {
      let tock = this.value / (1e3 / 60);
      if (tock <= 2) {
        this.owner.on("raf", this);
      } else {
        this[$8] = globalThis.setInterval(this.queue.bind(this), this.value);
      }
      ;
    }
    ;
    this.active = true;
    return this;
  }
  deactivate() {
    if (this.value === true) {
      this.owner.un("commit", this);
    }
    ;
    this.owner.un("raf", this);
    if (this[$8]) {
      globalThis.clearInterval(this[$8]);
      this[$8] = null;
    }
    ;
    this.active = false;
    return this;
  }
};
var Scheduler = class {
  constructor() {
    var self2 = this;
    this.id = Symbol();
    this.queue = [];
    this.stage = -1;
    this[$9] = -1;
    this[$7] = 0;
    this[$10] = false;
    this[$11] = 0;
    this.listeners = {};
    this.intervals = {};
    self2.commit = function() {
      self2.add("commit");
      return self2;
    };
    this[$122] = 0;
    self2.$promise = null;
    self2.$resolve = null;
    this[$13] = function(e) {
      self2[$10] = false;
      return self2.tick(e);
    };
    self2;
  }
  touch() {
    return this[$11]++;
  }
  get version() {
    return this[$11];
  }
  add(item, force) {
    if (force || this.queue.indexOf(item) == -1) {
      this.queue.push(item);
    }
    ;
    if (!this[$10]) {
      this[$4]();
    }
    ;
    return this;
  }
  get committing\u03A6() {
    return this.queue.indexOf("commit") >= 0;
  }
  get syncing\u03A6() {
    return this[$9] == 1;
  }
  listen(ns, item) {
    let set = this.listeners[ns];
    let first = !set;
    set || (set = this.listeners[ns] = new Set());
    set.add(item);
    if (ns == "raf" && first) {
      this.add("raf");
    }
    ;
    return this;
  }
  unlisten(ns, item) {
    var $147;
    let set = this.listeners[ns];
    set && set.delete(item);
    if (ns == "raf" && set && set.size == 0) {
      $147 = this.listeners.raf, delete this.listeners.raf, $147;
    }
    ;
    return this;
  }
  on(ns, item) {
    return this.listen(ns, item);
  }
  un(ns, item) {
    return this.unlisten(ns, item);
  }
  get promise() {
    var self2 = this;
    return self2.$promise || (self2.$promise = new Promise(function(resolve) {
      return self2.$resolve = resolve;
    }));
  }
  tick(timestamp) {
    var self2 = this;
    let items = this.queue;
    let frame = this[$7]++;
    if (!this.ts) {
      this.ts = timestamp;
    }
    ;
    this.dt = timestamp - this.ts;
    this.ts = timestamp;
    this.queue = [];
    this[$9] = 1;
    this[$11]++;
    if (items.length) {
      for (let i = 0, $1510 = iter$__(items), $166 = $1510.length; i < $166; i++) {
        let item = $1510[i];
        if (typeof item === "string" && this.listeners[item]) {
          self2.listeners[item].forEach(function(listener) {
            if (listener.tick instanceof Function) {
              return listener.tick(self2, item);
            } else if (listener instanceof Function) {
              return listener(self2, item);
            }
            ;
          });
        } else if (item instanceof Function) {
          item(self2.dt, self2);
        } else if (item.tick) {
          item.tick(self2.dt, self2);
        }
        ;
      }
      ;
    }
    ;
    this[$9] = this[$10] ? 0 : -1;
    if (self2.$promise) {
      self2.$resolve(self2);
      self2.$promise = self2.$resolve = null;
    }
    ;
    if (self2.listeners.raf && true) {
      self2.add("raf");
    }
    ;
    return self2;
  }
  [$4]() {
    if (!this[$10]) {
      this[$10] = true;
      if (this[$9] == -1) {
        this[$9] = 0;
      }
      ;
      rAF(this[$13]);
    }
    ;
    return this;
  }
  schedule(item, o) {
    var $173, $183;
    o || (o = item[$173 = this.id] || (item[$173] = {value: true}));
    let state2 = o[$183 = this.id] || (o[$183] = new Scheduled({owner: this, target: item}));
    return state2.update(o, true);
  }
  unschedule(item, o = {}) {
    o || (o = item[this.id]);
    let state2 = o && o[this.id];
    if (state2 && state2.active) {
      state2.deactivate();
    }
    ;
    return this;
  }
};
var scheduler = new Scheduler();
function commit() {
  return scheduler.add("commit").promise;
}
function setTimeout2(fn, ms) {
  return globalThis.setTimeout(function() {
    fn();
    commit();
    return;
  }, ms);
}
function setInterval2(fn, ms) {
  return globalThis.setInterval(function() {
    fn();
    commit();
    return;
  }, ms);
}
var clearInterval2 = globalThis.clearInterval;
var clearTimeout2 = globalThis.clearTimeout;
var instance = globalThis.imba || (globalThis.imba = {});
instance.commit = commit;
instance.setTimeout = setTimeout2;
instance.setInterval = setInterval2;
instance.clearInterval = clearInterval2;
instance.clearTimeout = clearTimeout2;

// node_modules/imba/src/imba/dom/flags.imba
var $14 = Symbol.for("#toStringDeopt");
var $72 = Symbol.for("#__initor__");
var $82 = Symbol.for("#__inited__");
var $25 = Symbol.for("#__hooks__");
var $32 = Symbol.for("#symbols");
var $42 = Symbol.for("#batches");
var $5 = Symbol.for("#extras");
var $6 = Symbol.for("#stacks");
var Flags = class {
  constructor(dom) {
    this.dom = dom;
    this.string = "";
  }
  contains(ref) {
    return this.dom.classList.contains(ref);
  }
  add(ref) {
    if (this.contains(ref)) {
      return this;
    }
    ;
    this.string += (this.string ? " " : "") + ref;
    this.dom.classList.add(ref);
    return this;
  }
  remove(ref) {
    if (!this.contains(ref)) {
      return this;
    }
    ;
    let regex = new RegExp("(^|\\s)" + ref + "(?=\\s|$)", "g");
    this.string = this.string.replace(regex, "");
    this.dom.classList.remove(ref);
    return this;
  }
  toggle(ref, bool) {
    if (bool === void 0) {
      bool = !this.contains(ref);
    }
    ;
    return bool ? this.add(ref) : this.remove(ref);
  }
  incr(ref, duration = 0) {
    var self2 = this;
    let m = this.stacks;
    let c = m[ref] || 0;
    if (c < 1) {
      this.add(ref);
    }
    ;
    if (duration > 0) {
      setTimeout(function() {
        return self2.decr(ref);
      }, duration);
    }
    ;
    return m[ref] = Math.max(c, 0) + 1;
  }
  decr(ref) {
    let m = this.stacks;
    let c = m[ref] || 0;
    if (c == 1) {
      this.remove(ref);
    }
    ;
    return m[ref] = Math.max(c, 1) - 1;
  }
  reconcile(sym, str) {
    let syms = this[$32];
    let vals = this[$42];
    let dirty = true;
    if (!syms) {
      syms = this[$32] = [sym];
      vals = this[$42] = [str || ""];
      this.toString = this.valueOf = this[$14];
    } else {
      let idx = syms.indexOf(sym);
      let val = str || "";
      if (idx == -1) {
        syms.push(sym);
        vals.push(val);
      } else if (vals[idx] != val) {
        vals[idx] = val;
      } else {
        dirty = false;
      }
      ;
    }
    ;
    if (dirty) {
      this[$5] = " " + vals.join(" ");
      this.sync();
    }
    ;
    return;
  }
  valueOf() {
    return this.string;
  }
  toString() {
    return this.string;
  }
  [$14]() {
    return this.string + (this[$5] || "");
  }
  sync() {
    return this.dom.flagSync$();
  }
  get stacks() {
    return this[$6] || (this[$6] = {});
  }
};

// node_modules/imba/src/imba/dom/context.imba
var $15 = Symbol.for("#__init__");
var $26 = Symbol.for("#__patch__");
var $73 = Symbol.for("#__initor__");
var $83 = Symbol.for("#__inited__");
var $33 = Symbol.for("#__hooks__");
var $43 = Symbol.for("#getRenderContext");
var $52 = Symbol.for("#getDynamicContext");
var $62 = Symbol();
var renderContext = {
  context: null
};
var Renderer = class {
  [$26]($$ = {}) {
    var $96;
    ($96 = $$.stack) !== void 0 && (this.stack = $96);
  }
  constructor($$ = null) {
    this[$15]($$);
  }
  [$15]($$ = null) {
    var $106;
    this.stack = $$ && ($106 = $$.stack) !== void 0 ? $106 : [];
  }
  push(el) {
    return this.stack.push(el);
  }
  pop(el) {
    return this.stack.pop();
  }
};
var renderer = new Renderer();
var RenderContext = class extends Map {
  static [$15]() {
    this.prototype[$73] = $62;
    return this;
  }
  constructor(parent, sym = null) {
    super();
    this._ = parent;
    this.sym = sym;
    this[$73] === $62 && (this[$33] && this[$33].inited(this), this[$83] && this[$83]());
  }
  pop() {
    return renderContext.context = null;
  }
  [$43](sym) {
    let out = this.get(sym);
    out || this.set(sym, out = new RenderContext(this._, sym));
    return renderContext.context = out;
  }
  [$52](sym, key) {
    return this[$43](sym)[$43](key);
  }
  run(value) {
    this.value = value;
    if (renderContext.context == this) {
      renderContext.context = null;
    }
    ;
    return this.get(value);
  }
  cache(val) {
    this.set(this.value, val);
    return val;
  }
};
RenderContext[$15]();
function createRenderContext(cache2, key = Symbol(), up = cache2) {
  return renderContext.context = cache2[key] || (cache2[key] = new RenderContext(up, key));
}
function getRenderContext() {
  let ctx = renderContext.context;
  let res = ctx || new RenderContext(null);
  if (true) {
    if (!ctx && renderer.stack.length > 0) {
      console.warn("detected unmemoized nodes in", renderer.stack, "see https://imba.io", res);
    }
    ;
  }
  ;
  if (ctx) {
    renderContext.context = null;
  }
  ;
  return res;
}

// node_modules/imba/src/imba/dom/core.web.imba
function extend$__(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
function iter$__2(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $16 = Symbol.for("#parent");
var $27 = Symbol.for("#closestNode");
var $34 = Symbol.for("#parentNode");
var $44 = Symbol.for("#context");
var $53 = Symbol.for("#__init__");
var $63 = Symbol.for("##inited");
var $74 = Symbol.for("#getRenderContext");
var $84 = Symbol.for("#getDynamicContext");
var $92 = Symbol.for("#insertChild");
var $102 = Symbol.for("#appendChild");
var $112 = Symbol.for("#replaceChild");
var $123 = Symbol.for("#removeChild");
var $132 = Symbol.for("#insertInto");
var $142 = Symbol.for("#insertIntoDeopt");
var $152 = Symbol.for("#removeFrom");
var $162 = Symbol.for("#removeFromDeopt");
var $17 = Symbol.for("#replaceWith");
var $18 = Symbol.for("#replaceWithDeopt");
var $192 = Symbol.for("#placeholderNode");
var $202 = Symbol.for("#attachToParent");
var $212 = Symbol.for("#detachFromParent");
var $222 = Symbol.for("#placeChild");
var $232 = Symbol.for("#beforeReconcile");
var $242 = Symbol.for("#afterReconcile");
var $252 = Symbol.for("#afterVisit");
var $262 = Symbol.for("##parent");
var $272 = Symbol.for("##up");
var $28 = Symbol.for("##context");
var $29 = Symbol.for("#domNode");
var $30 = Symbol.for("##placeholderNode");
var $31 = Symbol.for("#domDeopt");
var $322 = Symbol.for("#isRichElement");
var $342 = Symbol.for("#src");
var $422 = Symbol.for("#htmlNodeName");
var $432 = Symbol.for("#getSlot");
var $442 = Symbol.for("#ImbaElement");
var $45 = Symbol.for("#cssns");
var $46 = Symbol.for("#cssid");
var {
  Event,
  UIEvent,
  MouseEvent,
  PointerEvent,
  KeyboardEvent,
  CustomEvent,
  Node,
  Comment,
  Text,
  Element,
  HTMLElement,
  HTMLHtmlElement,
  HTMLSelectElement,
  HTMLInputElement,
  HTMLTextAreaElement,
  HTMLButtonElement,
  HTMLOptionElement,
  HTMLScriptElement,
  SVGElement,
  DocumentFragment,
  ShadowRoot,
  Document,
  Window,
  customElements
} = globalThis.window;
var descriptorCache = {};
function getDescriptor(item, key, cache2) {
  if (!item) {
    return cache2[key] = null;
  }
  ;
  if (cache2[key] !== void 0) {
    return cache2[key];
  }
  ;
  let desc = Object.getOwnPropertyDescriptor(item, key);
  if (desc !== void 0 || item == SVGElement) {
    return cache2[key] = desc || null;
  }
  ;
  return getDescriptor(Reflect.getPrototypeOf(item), key, cache2);
}
var CustomTagConstructors = {};
var CustomTagToElementNames = {};
var TYPES = {};
var CUSTOM_TYPES = {};
var contextHandler = {
  get(target, name) {
    let ctx = target;
    let val = void 0;
    while (ctx && val == void 0) {
      if (ctx = ctx[$16]) {
        val = ctx[name];
      }
      ;
    }
    ;
    return val;
  },
  set(target, name, value) {
    let ctx = target;
    let val = void 0;
    while (ctx && val == void 0) {
      let desc = getDeepPropertyDescriptor(ctx, name, Element);
      if (desc) {
        ctx[name] = value;
        return true;
      } else {
        ctx = ctx[$16];
      }
      ;
    }
    ;
    return true;
  }
};
var Extend$Document$af = class {
  get flags() {
    return this.documentElement.flags;
  }
};
extend$__(Document.prototype, Extend$Document$af.prototype);
var Extend$Node$ag = class {
  get [$16]() {
    return this[$262] || this.parentNode || this[$272];
  }
  get [$27]() {
    return this;
  }
  get [$34]() {
    return this[$16][$27];
  }
  get [$44]() {
    return this[$28] || (this[$28] = new Proxy(this, contextHandler));
  }
  [$53]() {
    return this;
  }
  [$63]() {
    return this;
  }
  [$74](sym) {
    return createRenderContext(this, sym);
  }
  [$84](sym, key) {
    return this[$74](sym)[$74](key);
  }
  [$92](newnode, refnode) {
    return newnode[$132](this, refnode);
  }
  [$102](newnode) {
    return newnode[$132](this, null);
  }
  [$112](newnode, oldnode) {
    let res = this[$92](newnode, oldnode);
    this[$123](oldnode);
    return res;
  }
  [$123](node) {
    return node[$152](this);
  }
  [$132](parent, before = null) {
    if (before) {
      parent.insertBefore(this, before);
    } else {
      parent.appendChild(this);
    }
    ;
    return this;
  }
  [$142](parent, before) {
    if (before) {
      parent.insertBefore(this[$29] || this, before);
    } else {
      parent.appendChild(this[$29] || this);
    }
    ;
    return this;
  }
  [$152](parent) {
    return parent.removeChild(this);
  }
  [$162](parent) {
    return parent.removeChild(this[$29] || this);
  }
  [$17](other, parent) {
    return parent[$112](other, this);
  }
  [$18](other, parent) {
    return parent[$112](other, this[$29] || this);
  }
  get [$192]() {
    return this[$30] || (this[$30] = globalThis.document.createComment("placeholder"));
  }
  set [$192](value) {
    let prev = this[$30];
    this[$30] = value;
    if (prev && prev != value && prev.parentNode) {
      prev[$17](value);
    }
    ;
  }
  [$202]() {
    let ph = this[$29];
    let par = ph && ph.parentNode;
    if (ph && par && ph != this) {
      this[$29] = null;
      this[$132](par, ph);
      ph[$152](par);
    }
    ;
    return this;
  }
  [$212]() {
    if (this[$31] != true ? (this[$31] = true, true) : false) {
      this[$17] = this[$18];
      this[$152] = this[$162];
      this[$132] = this[$142];
    }
    ;
    let ph = this[$192];
    if (this.parentNode && ph != this) {
      ph[$132](this.parentNode, this);
      this[$152](this.parentNode);
    }
    ;
    this[$29] = ph;
    return this;
  }
  [$222](item, f, prev) {
    let type = typeof item;
    if (type === "undefined" || item === null) {
      if (prev && prev instanceof Comment) {
        return prev;
      }
      ;
      let el = globalThis.document.createComment("");
      return prev ? prev[$17](el, this) : el[$132](this, null);
    }
    ;
    if (item === prev) {
      return item;
    } else if (type !== "object") {
      let res;
      let txt = item;
      if (f & 128 && f & 256 && false) {
        this.textContent = txt;
        return;
      }
      ;
      if (prev) {
        if (prev instanceof Text) {
          prev.textContent = txt;
          return prev;
        } else {
          res = globalThis.document.createTextNode(txt);
          prev[$17](res, this);
          return res;
        }
        ;
      } else {
        this.appendChild(res = globalThis.document.createTextNode(txt));
        return res;
      }
      ;
    } else {
      if (true) {
        if (!item[$132]) {
          console.warn("Tried to insert", item, "into", this);
          throw new TypeError("Only DOM Nodes can be inserted into DOM");
        }
        ;
      }
      ;
      return prev ? prev[$17](item, this) : item[$132](this, null);
    }
    ;
    return;
  }
};
extend$__(Node.prototype, Extend$Node$ag.prototype);
var Extend$Element$ah = class {
  log(...params) {
    console.log(...params);
    return this;
  }
  emit(name, detail, o = {bubbles: true, cancelable: true}) {
    if (detail != void 0) {
      o.detail = detail;
    }
    ;
    let event = new CustomEvent(name, o);
    let res = this.dispatchEvent(event);
    return event;
  }
  text$(item) {
    this.textContent = item;
    return this;
  }
  [$232]() {
    return this;
  }
  [$242]() {
    return this;
  }
  [$252]() {
    if (this.render) {
      this.render();
    }
    ;
    return;
  }
  get flags() {
    if (!this.$flags) {
      this.$flags = new Flags(this);
      if (this.flag$ == Element.prototype.flag$) {
        this.flags$ext = this.className;
      }
      ;
      this.flagDeopt$();
    }
    ;
    return this.$flags;
  }
  flag$(str) {
    let ns = this.flags$ns;
    this.className = ns ? ns + (this.flags$ext = str) : this.flags$ext = str;
    return;
  }
  flagDeopt$() {
    var self2 = this;
    this.flag$ = this.flagExt$;
    self2.flagSelf$ = function(str) {
      return self2.flagSync$(self2.flags$own = str);
    };
    return;
  }
  flagExt$(str) {
    return this.flagSync$(this.flags$ext = str);
  }
  flagSelf$(str) {
    this.flagDeopt$();
    return this.flagSelf$(str);
  }
  flagSync$() {
    return this.className = (this.flags$ns || "") + (this.flags$ext || "") + " " + (this.flags$own || "") + " " + (this.$flags || "");
  }
  set$(key, value) {
    let desc = getDeepPropertyDescriptor(this, key, Element);
    if (!desc || !desc.set) {
      this.setAttribute(key, value);
    } else {
      this[key] = value;
    }
    ;
    return;
  }
  get richValue() {
    return this.value;
  }
  set richValue(value) {
    this.value = value;
  }
};
extend$__(Element.prototype, Extend$Element$ah.prototype);
Element.prototype.setns$ = Element.prototype.setAttributeNS;
Element.prototype[$322] = true;
function createElement(name, parent, flags, text) {
  let el = globalThis.document.createElement(name);
  if (flags) {
    el.className = flags;
  }
  ;
  if (text !== null) {
    el.text$(text);
  }
  ;
  if (parent && parent[$102]) {
    parent[$102](el);
  }
  ;
  return el;
}
var Extend$SVGElement$ai = class {
  set$(key, value) {
    var $332;
    let cache2 = descriptorCache[$332 = this.nodeName] || (descriptorCache[$332] = {});
    let desc = getDescriptor(this, key, cache2);
    if (!desc || !desc.set) {
      this.setAttribute(key, value);
    } else {
      this[key] = value;
    }
    ;
    return;
  }
  flag$(str) {
    let ns = this.flags$ns;
    this.setAttribute("class", ns ? ns + (this.flags$ext = str) : this.flags$ext = str);
    return;
  }
  flagSelf$(str) {
    var self2 = this;
    self2.flag$ = function(str2) {
      return self2.flagSync$(self2.flags$ext = str2);
    };
    self2.flagSelf$ = function(str2) {
      return self2.flagSync$(self2.flags$own = str2);
    };
    return self2.flagSelf$(str);
  }
  flagSync$() {
    return this.setAttribute("class", (this.flags$ns || "") + (this.flags$ext || "") + " " + (this.flags$own || "") + " " + (this.$flags || ""));
  }
};
extend$__(SVGElement.prototype, Extend$SVGElement$ai.prototype);
var Extend$SVGSVGElement$aj = class {
  set src(value) {
    if (this[$342] != value ? (this[$342] = value, true) : false) {
      if (value) {
        if (value.adoptNode) {
          value.adoptNode(this);
        } else if (value.content) {
          for (let $372 = value.attributes, $352 = 0, $363 = Object.keys($372), $382 = $363.length, k, v; $352 < $382; $352++) {
            k = $363[$352];
            v = $372[k];
            this.setAttribute(k, v);
          }
          ;
          this.innerHTML = value.content;
        }
        ;
      }
      ;
    }
    ;
    return;
  }
};
extend$__(SVGSVGElement.prototype, Extend$SVGSVGElement$aj.prototype);
function createComment(text) {
  return globalThis.document.createComment(text);
}
function createTextNode(text) {
  return globalThis.document.createTextNode(text);
}
var navigator2 = globalThis.navigator;
var vendor = navigator2 && navigator2.vendor || "";
var ua = navigator2 && navigator2.userAgent || "";
var isSafari = vendor.indexOf("Apple") > -1 || ua.indexOf("CriOS") >= 0 || ua.indexOf("FxiOS") >= 0;
var supportsCustomizedBuiltInElements = !isSafari;
var CustomDescriptorCache = new Map();
var CustomHook = class extends HTMLElement {
  connectedCallback() {
    if (supportsCustomizedBuiltInElements) {
      return this.parentNode.removeChild(this);
    } else {
      return this.parentNode.connectedCallback();
    }
    ;
  }
  disconnectedCallback() {
    if (!supportsCustomizedBuiltInElements) {
      return this.parentNode.disconnectedCallback();
    }
    ;
  }
};
window.customElements.define("i-hook", CustomHook);
function getCustomDescriptors(el, klass) {
  let props = CustomDescriptorCache.get(klass);
  if (!props) {
    props = {};
    let proto = klass.prototype;
    let protos = [proto];
    while (proto = proto && Object.getPrototypeOf(proto)) {
      if (proto.constructor == el.constructor) {
        break;
      }
      ;
      protos.unshift(proto);
    }
    ;
    for (let $393 = 0, $40 = iter$__2(protos), $41 = $40.length; $393 < $41; $393++) {
      let item = $40[$393];
      let desc = Object.getOwnPropertyDescriptors(item);
      Object.assign(props, desc);
    }
    ;
    CustomDescriptorCache.set(klass, props);
  }
  ;
  return props;
}
function createComponent(name, parent, flags, text, ctx) {
  let el;
  if (typeof name != "string") {
    if (name && name.nodeName) {
      name = name.nodeName;
    }
    ;
  }
  ;
  let cmpname = CustomTagToElementNames[name] || name;
  if (CustomTagConstructors[name]) {
    let cls = CustomTagConstructors[name];
    let typ = cls.prototype[$422];
    if (typ && supportsCustomizedBuiltInElements) {
      el = globalThis.document.createElement(typ, {is: name});
    } else if (cls.create$ && typ) {
      el = globalThis.document.createElement(typ);
      el.setAttribute("is", cmpname);
      let props = getCustomDescriptors(el, cls);
      Object.defineProperties(el, props);
      el.__slots = {};
      el.appendChild(globalThis.document.createElement("i-hook"));
    } else if (cls.create$) {
      el = cls.create$(el);
      el.__slots = {};
    } else {
      console.warn("could not create tag " + name);
    }
    ;
  } else {
    el = globalThis.document.createElement(CustomTagToElementNames[name] || name);
  }
  ;
  el[$262] = parent;
  el[$53]();
  el[$63]();
  if (text !== null) {
    el[$432]("__").text$(text);
  }
  ;
  if (flags || el.flags$ns) {
    el.flag$(flags || "");
  }
  ;
  return el;
}
function defineTag(name, klass, options = {}) {
  TYPES[name] = CUSTOM_TYPES[name] = klass;
  klass.nodeName = name;
  let componentName = name;
  let proto = klass.prototype;
  if (name.indexOf("-") == -1) {
    componentName = "" + name + "-tag";
    CustomTagToElementNames[name] = componentName;
  }
  ;
  if (options.cssns) {
    let ns = (proto._ns_ || proto[$45] || "") + " " + (options.cssns || "");
    proto._ns_ = ns.trim() + " ";
    proto[$45] = options.cssns;
  }
  ;
  if (options.cssid) {
    let ids = (proto.flags$ns || "") + " " + options.cssid;
    proto[$46] = options.cssid;
    proto.flags$ns = ids.trim() + " ";
  }
  ;
  if (proto[$422] && !options.extends) {
    options.extends = proto[$422];
  }
  ;
  if (options.extends) {
    proto[$422] = options.extends;
    CustomTagConstructors[name] = klass;
    if (supportsCustomizedBuiltInElements) {
      window.customElements.define(componentName, klass, {extends: options.extends});
    }
    ;
  } else {
    window.customElements.define(componentName, klass);
  }
  ;
  return klass;
}
var instance2 = globalThis.imba || (globalThis.imba = {});
instance2.document = globalThis.document;

// node_modules/imba/src/imba/dom/fragment.imba
function iter$__3(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
function extend$__2(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
var $110 = Symbol.for("#parent");
var $210 = Symbol.for("#closestNode");
var $35 = Symbol.for("#isRichElement");
var $47 = Symbol.for("#afterVisit");
var $153 = Symbol.for("#__initor__");
var $163 = Symbol.for("#__inited__");
var $54 = Symbol.for("#__hooks__");
var $64 = Symbol.for("#appendChild");
var $75 = Symbol.for("#removeChild");
var $85 = Symbol.for("#insertInto");
var $93 = Symbol.for("#replaceWith");
var $103 = Symbol.for("#insertChild");
var $113 = Symbol.for("#removeFrom");
var $124 = Symbol.for("#placeChild");
var $143 = Symbol.for("#__init__");
var $172 = Symbol.for("#registerFunctionalSlot");
var $182 = Symbol.for("#getFunctionalSlot");
var $193 = Symbol.for("#getSlot");
var $203 = Symbol.for("##parent");
var $213 = Symbol.for("##up");
var $223 = Symbol.for("##flags");
var $233 = Symbol.for("#domFlags");
var $243 = Symbol.for("#end");
var $253 = Symbol.for("#textContent");
var $292 = Symbol.for("#textNode");
var $36 = Symbol.for("#functionalSlots");
var $133 = Symbol();
var Fragment = class {
  constructor() {
    this.childNodes = [];
  }
  log(...params) {
    return;
  }
  hasChildNodes() {
    return false;
  }
  set [$110](value) {
    this[$203] = value;
  }
  get [$110]() {
    return this[$203] || this[$213];
  }
  get [$210]() {
    return this[$110][$210];
  }
  get [$35]() {
    return true;
  }
  get flags() {
    return this[$223] || (this[$223] = new Flags(this));
  }
  flagSync$() {
    return this;
  }
  [$47]() {
    return this;
  }
};
var counter = 0;
var VirtualFragment = class extends Fragment {
  static [$143]() {
    this.prototype[$153] = $133;
    return this;
  }
  constructor(flags, parent) {
    super(...arguments);
    this[$213] = parent;
    this.parentNode = null;
    this[$233] = flags;
    this.childNodes = [];
    this[$243] = createComment("slot" + counter++);
    if (parent) {
      parent[$64](this);
    }
    ;
    this[$153] === $133 && (this[$54] && this[$54].inited(this), this[$163] && this[$163]());
  }
  get [$110]() {
    return this[$203] || this.parentNode || this[$213];
  }
  set textContent(text) {
    this[$253] = text;
  }
  get textContent() {
    return this[$253];
  }
  hasChildNodes() {
    for (let $265 = 0, $273 = iter$__3(this.childNodes), $282 = $273.length; $265 < $282; $265++) {
      let item = $273[$265];
      if (item instanceof Fragment) {
        if (item.hasChildNodes()) {
          return true;
        }
        ;
      }
      ;
      if (item instanceof Comment) {
        true;
      } else if (item instanceof Node) {
        return true;
      }
      ;
    }
    ;
    return false;
  }
  text$(item) {
    if (!this[$292]) {
      this[$292] = this[$124](item);
    } else {
      this[$292].textContent = item;
    }
    ;
    return this[$292];
  }
  appendChild(child) {
    if (this.parentNode) {
      child[$85](this.parentNode, this[$243]);
    }
    ;
    return this.childNodes.push(child);
  }
  [$64](child) {
    if (this.parentNode) {
      child[$85](this.parentNode, this[$243]);
    }
    ;
    return this.childNodes.push(child);
  }
  insertBefore(node, refnode) {
    if (this.parentNode) {
      this.parentNode[$103](node, refnode);
    }
    ;
    let idx = this.childNodes.indexOf(refnode);
    if (idx >= 0) {
      this.childNodes.splice(idx, 0, node);
    }
    ;
    return node;
  }
  [$75](node) {
    if (this.parentNode) {
      this.parentNode[$75](node);
    }
    ;
    let idx = this.childNodes.indexOf(node);
    if (idx >= 0) {
      this.childNodes.splice(idx, 1);
    }
    ;
    return;
  }
  [$85](parent, before) {
    let prev = this.parentNode;
    if (this.parentNode != parent ? (this.parentNode = parent, true) : false) {
      if (this[$243]) {
        before = this[$243][$85](parent, before);
      }
      ;
      for (let $303 = 0, $313 = iter$__3(this.childNodes), $324 = $313.length; $303 < $324; $303++) {
        let item = $313[$303];
        item[$85](parent, before);
      }
      ;
    }
    ;
    return this;
  }
  [$93](node, parent) {
    let res = node[$85](parent, this[$243]);
    this[$113](parent);
    return res;
  }
  [$103](node, refnode) {
    if (this.parentNode) {
      this.insertBefore(node, refnode || this[$243]);
    }
    ;
    if (refnode) {
      let idx = this.childNodes.indexOf(refnode);
      if (idx >= 0) {
        this.childNodes.splice(idx, 0, node);
      }
      ;
    } else {
      this.childNodes.push(node);
    }
    ;
    return node;
  }
  [$113](parent) {
    for (let $332 = 0, $344 = iter$__3(this.childNodes), $352 = $344.length; $332 < $352; $332++) {
      let item = $344[$332];
      item[$113](parent);
    }
    ;
    if (this[$243]) {
      this[$243][$113](parent);
    }
    ;
    this.parentNode = null;
    return this;
  }
  [$124](item, f, prev) {
    let par = this.parentNode;
    let type = typeof item;
    if (type === "undefined" || item === null) {
      if (prev && prev instanceof Comment) {
        return prev;
      }
      ;
      let el = createComment("");
      if (prev) {
        let idx = this.childNodes.indexOf(prev);
        this.childNodes.splice(idx, 1, el);
        if (par) {
          prev[$93](el, par);
        }
        ;
        return el;
      }
      ;
      this.childNodes.push(el);
      if (par) {
        el[$85](par, this[$243]);
      }
      ;
      return el;
    }
    ;
    if (item === prev) {
      return item;
    }
    ;
    if (type !== "object") {
      let res;
      let txt = item;
      if (prev) {
        if (prev instanceof Text) {
          prev.textContent = txt;
          return prev;
        } else {
          res = createTextNode(txt);
          let idx = this.childNodes.indexOf(prev);
          this.childNodes.splice(idx, 1, res);
          if (par) {
            prev[$93](res, par);
          }
          ;
          return res;
        }
        ;
      } else {
        this.childNodes.push(res = createTextNode(txt));
        if (par) {
          res[$85](par, this[$243]);
        }
        ;
        return res;
      }
      ;
    } else if (prev) {
      let idx = this.childNodes.indexOf(prev);
      this.childNodes.splice(idx, 1, item);
      if (par) {
        prev[$93](item, par);
      }
      ;
      return item;
    } else {
      this.childNodes.push(item);
      if (par) {
        item[$85](par, this[$243]);
      }
      ;
      return item;
    }
    ;
  }
};
VirtualFragment[$143]();
function createSlot(bitflags, par) {
  const el = new VirtualFragment(bitflags, null);
  el[$213] = par;
  return el;
}
var Extend$Node$af = class {
  [$172](name) {
    let map = this[$36] || (this[$36] = {});
    return map[name] || (map[name] = createSlot(0, this));
  }
  [$182](name, context) {
    let map = this[$36];
    return map && map[name] || this[$193](name, context);
  }
  [$193](name, context) {
    var $372;
    if (name == "__" && !this.render) {
      return this;
    }
    ;
    return ($372 = this.__slots)[name] || ($372[name] = createSlot(0, this));
  }
};
extend$__2(Node.prototype, Extend$Node$af.prototype);

// node_modules/imba/src/imba/dom/indexed-list.imba
function iter$__4(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $111 = Symbol.for("#afterVisit");
var $211 = Symbol.for("#insertInto");
var $37 = Symbol.for("#appendChild");
var $48 = Symbol.for("#replaceWith");
var $55 = Symbol.for("#removeFrom");
var $94 = Symbol.for("#__initor__");
var $104 = Symbol.for("#__inited__");
var $65 = Symbol.for("#__hooks__");
var $86 = Symbol.for("#__init__");
var $114 = Symbol.for("#domFlags");
var $125 = Symbol.for("##parent");
var $134 = Symbol.for("#end");
var $144 = Symbol.for("#removeChild");
var $154 = Symbol.for("#insertChild");
var $76 = Symbol();
var IndexedTagFragment = class extends Fragment {
  static [$86]() {
    this.prototype[$94] = $76;
    return this;
  }
  constructor(f, parent) {
    super(...arguments);
    this[$114] = f;
    this[$125] = parent;
    if (!(f & 256)) {
      this[$134] = createComment("list");
    }
    ;
    this.$ = this.childNodes;
    this.length = 0;
    if (parent) {
      parent[$37](this);
    }
    ;
    this[$94] === $76 && (this[$65] && this[$65].inited(this), this[$104] && this[$104]());
  }
  hasChildNodes() {
    if (this.length == 0) {
      return false;
    }
    ;
    return true;
  }
  [$111](len) {
    let from = this.length;
    this.length = len;
    if (from == len) {
      return;
    }
    ;
    let par = this.parentNode;
    if (!par) {
      return;
    }
    ;
    let array = this.childNodes;
    let end = this[$134];
    if (from > len) {
      while (from > len) {
        par[$144](array[--from]);
      }
      ;
    } else if (len > from) {
      while (len > from) {
        par[$154](array[from++], end);
      }
      ;
    }
    ;
    this.length = len;
    return;
  }
  [$211](parent, before) {
    this.parentNode = parent;
    if (this[$134]) {
      this[$134][$211](parent, before);
    }
    ;
    before = this[$134];
    for (let i = 0, $166 = iter$__4(this.childNodes), $173 = $166.length; i < $173; i++) {
      let item = $166[i];
      if (i == this.length) {
        break;
      }
      ;
      item[$211](parent, before);
    }
    ;
    return this;
  }
  [$37](item) {
    return;
  }
  [$48](rel, parent) {
    let res = rel[$211](parent, this[$134]);
    this[$55](parent);
    return res;
  }
  [$55](parent) {
    let i = this.length;
    while (i > 0) {
      let el = this.childNodes[--i];
      el[$55](parent);
    }
    ;
    if (this[$134]) {
      parent.removeChild(this[$134]);
    }
    ;
    this.parentNode = null;
    return;
  }
};
IndexedTagFragment[$86]();
function createIndexedList(bitflags, parent) {
  return new IndexedTagFragment(bitflags, parent);
}

// node_modules/imba/src/imba/dom/component.imba
function iter$__5(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $115 = Symbol.for("#__init__");
var $214 = Symbol.for("#__patch__");
var $38 = Symbol.for("##inited");
var $49 = Symbol.for("#afterVisit");
var $56 = Symbol.for("#beforeReconcile");
var $66 = Symbol.for("#afterReconcile");
var $116 = Symbol.for("#count");
var $155 = Symbol.for("#__hooks__");
var $164 = Symbol.for("#autorender");
var hydrator = new class {
  [$214]($$ = {}) {
    var $78;
    ($78 = $$.items) !== void 0 && (this.items = $78);
    ($78 = $$.current) !== void 0 && (this.current = $78);
    ($78 = $$.lastQueued) !== void 0 && (this.lastQueued = $78);
    ($78 = $$.tests) !== void 0 && (this.tests = $78);
  }
  constructor($$ = null) {
    this[$115]($$);
  }
  [$115]($$ = null) {
    var $89;
    this.items = $$ && ($89 = $$.items) !== void 0 ? $89 : [];
    this.current = $$ && ($89 = $$.current) !== void 0 ? $89 : null;
    this.lastQueued = $$ && ($89 = $$.lastQueued) !== void 0 ? $89 : null;
    this.tests = $$ && ($89 = $$.tests) !== void 0 ? $89 : 0;
  }
  flush() {
    let item = null;
    if (false) {
    }
    ;
    while (item = this.items.shift()) {
      if (!item.parentNode || item.hydrated\u03A6) {
        continue;
      }
      ;
      let prev = this.current;
      this.current = item;
      item.__F |= 1024;
      item.connectedCallback();
      this.current = prev;
    }
    ;
    return;
  }
  queue(item) {
    var self2 = this;
    let len = this.items.length;
    let idx = 0;
    let prev = this.lastQueued;
    this.lastQueued = item;
    let BEFORE = Node.DOCUMENT_POSITION_PRECEDING;
    let AFTER = Node.DOCUMENT_POSITION_FOLLOWING;
    if (len) {
      let prevIndex = this.items.indexOf(prev);
      let index = prevIndex;
      let compare = function(a, b) {
        self2.tests++;
        return a.compareDocumentPosition(b);
      };
      if (prevIndex == -1 || prev.nodeName != item.nodeName) {
        index = prevIndex = 0;
      }
      ;
      let curr = self2.items[index];
      while (curr && compare(curr, item) & AFTER) {
        curr = self2.items[++index];
      }
      ;
      if (index != prevIndex) {
        curr ? self2.items.splice(index, 0, item) : self2.items.push(item);
      } else {
        while (curr && compare(curr, item) & BEFORE) {
          curr = self2.items[--index];
        }
        ;
        if (index != prevIndex) {
          curr ? self2.items.splice(index + 1, 0, item) : self2.items.unshift(item);
        }
        ;
      }
      ;
    } else {
      self2.items.push(item);
      if (!self2.current) {
        globalThis.queueMicrotask(self2.flush.bind(self2));
      }
      ;
    }
    ;
    return;
  }
  run(item) {
    var $147, $1210;
    if (this.active) {
      return;
    }
    ;
    this.active = true;
    let all = globalThis.document.querySelectorAll(".__ssr");
    console.log("running hydrator", item, all.length, Array.from(all));
    for (let $96 = 0, $106 = iter$__5(all), $138 = $106.length; $96 < $138; $96++) {
      let item2 = $106[$96];
      item2[$116] || (item2[$116] = 1);
      item2[$116]++;
      let name = item2.nodeName;
      let typ = ($1210 = this.map)[name] || ($1210[name] = globalThis.window.customElements.get(name.toLowerCase()) || HTMLElement);
      console.log("item type", name, typ, !!CUSTOM_TYPES[name.toLowerCase()]);
      if (!item2.connectedCallback || !item2.parentNode || item2.hydrated\u03A6) {
        continue;
      }
      ;
      console.log("hydrate", item2);
    }
    ;
    return this.active = false;
  }
}();
var Component = class extends HTMLElement {
  constructor() {
    super();
    if (this.flags$ns) {
      this.flag$ = this.flagExt$;
    }
    ;
    this.setup$();
    this.build();
  }
  setup$() {
    this.__slots = {};
    return this.__F = 0;
  }
  [$115]() {
    this.__F |= 1 | 2;
    return this;
  }
  [$38]() {
    if (this[$155]) {
      return this[$155].inited(this);
    }
    ;
  }
  flag$(str) {
    this.className = this.flags$ext = str;
    return;
  }
  build() {
    return this;
  }
  awaken() {
    return this;
  }
  mount() {
    return this;
  }
  unmount() {
    return this;
  }
  rendered() {
    return this;
  }
  dehydrate() {
    return this;
  }
  hydrate() {
    this.autoschedule = true;
    return this;
  }
  tick() {
    return this.commit();
  }
  visit() {
    return this.commit();
  }
  commit() {
    if (!this.render\u03A6) {
      this.__F |= 8192;
      return this;
    }
    ;
    this.__F |= 256;
    this.render && this.render();
    this.rendered();
    return this.__F = (this.__F | 512) & ~256 & ~8192;
  }
  get autoschedule() {
    return (this.__F & 64) != 0;
  }
  set autoschedule(value) {
    value ? this.__F |= 64 : this.__F &= ~64;
  }
  set autorender(value) {
    let o = this[$164] || (this[$164] = {});
    o.value = value;
    if (this.mounted\u03A6) {
      scheduler.schedule(this, o);
    }
    ;
    return;
  }
  get render\u03A6() {
    return !this.suspended\u03A6;
  }
  get mounting\u03A6() {
    return (this.__F & 16) != 0;
  }
  get mounted\u03A6() {
    return (this.__F & 32) != 0;
  }
  get awakened\u03A6() {
    return (this.__F & 8) != 0;
  }
  get rendered\u03A6() {
    return (this.__F & 512) != 0;
  }
  get suspended\u03A6() {
    return (this.__F & 4096) != 0;
  }
  get rendering\u03A6() {
    return (this.__F & 256) != 0;
  }
  get scheduled\u03A6() {
    return (this.__F & 128) != 0;
  }
  get hydrated\u03A6() {
    return (this.__F & 2) != 0;
  }
  get ssr\u03A6() {
    return (this.__F & 1024) != 0;
  }
  schedule() {
    scheduler.on("commit", this);
    this.__F |= 128;
    return this;
  }
  unschedule() {
    scheduler.un("commit", this);
    this.__F &= ~128;
    return this;
  }
  async suspend(cb = null) {
    let val = this.flags.incr("_suspended_");
    this.__F |= 4096;
    if (cb instanceof Function) {
      await cb();
      this.unsuspend();
    }
    ;
    return this;
  }
  unsuspend() {
    let val = this.flags.decr("_suspended_");
    if (val == 0) {
      this.__F &= ~4096;
      this.commit();
      ;
    }
    ;
    return this;
  }
  [$49]() {
    return this.visit();
  }
  [$56]() {
    if (this.__F & 1024) {
      this.__F = this.__F & ~1024;
      this.classList.remove("_ssr_");
      if (this.flags$ext && this.flags$ext.indexOf("_ssr_") == 0) {
        this.flags$ext = this.flags$ext.slice(5);
      }
      ;
      if (!(this.__F & 512)) {
        this.innerHTML = "";
      }
      ;
    }
    ;
    if (true) {
      renderer.push(this);
    }
    ;
    return this;
  }
  [$66]() {
    if (true) {
      renderer.pop(this);
    }
    ;
    return this;
  }
  connectedCallback() {
    let flags = this.__F;
    let inited = flags & 1;
    let awakened = flags & 8;
    if (!inited && !(flags & 1024)) {
      hydrator.queue(this);
      return;
    }
    ;
    if (flags & (16 | 32)) {
      return;
    }
    ;
    this.__F |= 16;
    if (!inited) {
      this[$115]();
    }
    ;
    if (!(flags & 2)) {
      this.flags$ext = this.className;
      this.__F |= 2;
      this.hydrate();
      this.commit();
    }
    ;
    if (!awakened) {
      this.awaken();
      this.__F |= 8;
    }
    ;
    emit(this, "mount");
    let res = this.mount();
    if (res && res.then instanceof Function) {
      res.then(scheduler.commit);
    }
    ;
    flags = this.__F = (this.__F | 32) & ~16;
    if (flags & 64) {
      this.schedule();
    }
    ;
    if (this[$164]) {
      scheduler.schedule(this, this[$164]);
    }
    ;
    return this;
  }
  disconnectedCallback() {
    this.__F = this.__F & (~32 & ~16);
    if (this.__F & 128) {
      this.unschedule();
    }
    ;
    emit(this, "unmount");
    this.unmount();
    if (this[$164]) {
      return scheduler.unschedule(this, this[$164]);
    }
    ;
  }
};

// node_modules/imba/src/imba/dom/mount.imba
var $117 = Symbol.for("#insertInto");
var $215 = Symbol.for("#removeFrom");
function mount(mountable, into) {
  if (false) {
  }
  ;
  let parent = into || globalThis.document.body;
  let element = mountable;
  if (mountable instanceof Function) {
    let ctx = new RenderContext(parent, null);
    let tick = function() {
      let prev = renderContext.context;
      renderContext.context = ctx;
      let res = mountable(ctx);
      if (renderContext.context == ctx) {
        renderContext.context = prev;
      }
      ;
      return res;
    };
    element = tick();
    scheduler.listen("commit", tick);
  } else {
    element.__F |= 64;
  }
  ;
  element[$117](parent);
  return element;
}
function unmount(el) {
  if (el && el[$215]) {
    el[$215](el.parentNode);
  }
  ;
  return el;
}
var instance3 = globalThis.imba || (globalThis.imba = {});
instance3.mount = mount;
instance3.unmount = unmount;

// node_modules/imba/src/imba/dom/bind.imba
function extend$__3(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
function iter$__6(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $118 = Symbol.for("#afterVisit");
function use_dom_bind() {
  return true;
}
var toBind = {
  INPUT: true,
  SELECT: true,
  TEXTAREA: true,
  BUTTON: true
};
var isGroup = function(obj) {
  return obj instanceof Array || obj && obj.has instanceof Function;
};
var bindHas = function(object, value) {
  if (object == value) {
    return true;
  } else if (object instanceof Array) {
    return object.indexOf(value) >= 0;
  } else if (object && object.has instanceof Function) {
    return object.has(value);
  } else if (object && object.contains instanceof Function) {
    return object.contains(value);
  } else {
    return false;
  }
  ;
};
var bindAdd = function(object, value) {
  if (object instanceof Array) {
    return object.push(value);
  } else if (object && object.add instanceof Function) {
    return object.add(value);
  }
  ;
};
var bindRemove = function(object, value) {
  if (object instanceof Array) {
    let idx = object.indexOf(value);
    if (idx >= 0) {
      return object.splice(idx, 1);
    }
    ;
  } else if (object && object.delete instanceof Function) {
    return object.delete(value);
  }
  ;
};
function createProxyProperty(target) {
  function getter() {
    return target[0] ? target[0][target[1]] : void 0;
  }
  ;
  function setter(v) {
    return target[0] ? target[0][target[1]] = v : null;
  }
  ;
  return {
    get: getter,
    set: setter
  };
}
var Extend$Element$af = class {
  getRichValue() {
    return this.value;
  }
  setRichValue(value) {
    return this.value = value;
  }
  bind$(key, value) {
    let o = value || [];
    if (key == "data" && !this.$$bound && toBind[this.nodeName]) {
      this.$$bound = true;
      if (this.change$) {
        this.addEventListener("change", this.change$ = this.change$.bind(this));
      }
      ;
      if (this.input$) {
        this.addEventListener("input", this.input$ = this.input$.bind(this), {capture: true});
      }
      ;
      if (this.click$) {
        this.addEventListener("click", this.click$ = this.click$.bind(this), {capture: true});
      }
      ;
    }
    ;
    Object.defineProperty(this, key, o instanceof Array ? createProxyProperty(o) : o);
    return o;
  }
};
extend$__3(Element.prototype, Extend$Element$af.prototype);
Object.defineProperty(Element.prototype, "richValue", {
  get: function() {
    return this.getRichValue();
  },
  set: function(v) {
    return this.setRichValue(v);
  }
});
var Extend$HTMLSelectElement$ag = class {
  change$(e) {
    let model = this.data;
    let prev = this.$$value;
    this.$$value = void 0;
    let values = this.getRichValue();
    if (this.multiple) {
      if (prev) {
        for (let $221 = 0, $313 = iter$__6(prev), $412 = $313.length; $221 < $412; $221++) {
          let value = $313[$221];
          if (values.indexOf(value) != -1) {
            continue;
          }
          ;
          bindRemove(model, value);
        }
        ;
      }
      ;
      for (let $510 = 0, $610 = iter$__6(values), $78 = $610.length; $510 < $78; $510++) {
        let value = $610[$510];
        if (!prev || prev.indexOf(value) == -1) {
          bindAdd(model, value);
        }
        ;
      }
      ;
    } else {
      this.data = values[0];
    }
    ;
    commit();
    return this;
  }
  getRichValue() {
    var $89;
    if (this.$$value) {
      return this.$$value;
    }
    ;
    $89 = [];
    for (let $96 = 0, $106 = iter$__6(this.selectedOptions), $1110 = $106.length; $96 < $1110; $96++) {
      let o = $106[$96];
      $89.push(o.richValue);
    }
    ;
    return this.$$value = $89;
  }
  syncValue() {
    let model = this.data;
    if (this.multiple) {
      let vals = [];
      for (let i = 0, $1210 = iter$__6(this.options), $138 = $1210.length; i < $138; i++) {
        let option = $1210[i];
        let val = option.richValue;
        let sel = bindHas(model, val);
        option.selected = sel;
        if (sel) {
          vals.push(val);
        }
        ;
      }
      ;
      this.$$value = vals;
    } else {
      for (let i = 0, $147 = iter$__6(this.options), $1510 = $147.length; i < $1510; i++) {
        let option = $147[i];
        let val = option.richValue;
        if (val == model) {
          this.$$value = [val];
          this.selectedIndex = i;
          break;
        }
        ;
      }
      ;
    }
    ;
    return;
  }
  [$118]() {
    return this.syncValue();
  }
};
extend$__3(HTMLSelectElement.prototype, Extend$HTMLSelectElement$ag.prototype);
var Extend$HTMLOptionElement$ah = class {
  setRichValue(value) {
    this.$$value = value;
    return this.value = value;
  }
  getRichValue() {
    if (this.$$value !== void 0) {
      return this.$$value;
    }
    ;
    return this.value;
  }
};
extend$__3(HTMLOptionElement.prototype, Extend$HTMLOptionElement$ah.prototype);
var Extend$HTMLTextAreaElement$ai = class {
  setRichValue(value) {
    this.$$value = value;
    return this.value = value;
  }
  getRichValue() {
    if (this.$$value !== void 0) {
      return this.$$value;
    }
    ;
    return this.value;
  }
  input$(e) {
    this.data = this.value;
    return commit();
  }
  [$118]() {
    let val = this.data;
    if (val === null || val === void 0) {
      val = "";
    }
    ;
    if (this.$$bound && this.value != val) {
      return this.value = val;
    }
    ;
  }
};
extend$__3(HTMLTextAreaElement.prototype, Extend$HTMLTextAreaElement$ai.prototype);
var Extend$HTMLInputElement$aj = class {
  input$(e) {
    let typ = this.type;
    if (typ == "checkbox" || typ == "radio") {
      return;
    }
    ;
    this.$$value = void 0;
    this.data = this.richValue;
    return commit();
  }
  change$(e) {
    let model = this.data;
    let val = this.richValue;
    if (this.type == "checkbox" || this.type == "radio") {
      let checked = this.checked;
      if (isGroup(model)) {
        checked ? bindAdd(model, val) : bindRemove(model, val);
      } else {
        this.data = checked ? val : false;
      }
      ;
    }
    ;
    return commit();
  }
  setRichValue(value) {
    if (this.$$value !== value) {
      this.$$value = value;
      if (this.value !== value) {
        this.value = value;
      }
      ;
    }
    ;
    return;
  }
  getRichValue() {
    if (this.$$value !== void 0) {
      return this.$$value;
    }
    ;
    let value = this.value;
    let typ = this.type;
    if (typ == "range" || typ == "number") {
      value = this.valueAsNumber;
      if (Number.isNaN(value)) {
        value = null;
      }
      ;
    } else if (typ == "checkbox") {
      if (value == void 0 || value === "on") {
        value = true;
      }
      ;
    }
    ;
    return value;
  }
  [$118]() {
    if (this.$$bound) {
      let typ = this.type;
      if (typ == "checkbox" || typ == "radio") {
        let val = this.data;
        if (val === true || val === false || val == null) {
          this.checked = !!val;
        } else {
          this.checked = bindHas(val, this.richValue);
        }
        ;
      } else {
        this.richValue = this.data;
      }
      ;
    }
    ;
    return;
  }
};
extend$__3(HTMLInputElement.prototype, Extend$HTMLInputElement$aj.prototype);
var Extend$HTMLButtonElement$ak = class {
  get checked() {
    return this.$checked;
  }
  set checked(val) {
    if (val != this.$checked) {
      this.$checked = val;
      this.flags.toggle("checked", !!val);
    }
    ;
  }
  setRichValue(value) {
    this.$$value = value;
    return this.value = value;
  }
  getRichValue() {
    if (this.$$value !== void 0) {
      return this.$$value;
    }
    ;
    return this.value;
  }
  click$(e) {
    let data = this.data;
    let toggled = this.checked;
    let val = this.richValue;
    if (isGroup(data)) {
      toggled ? bindRemove(data, val) : bindAdd(data, val);
    } else if (this.$$value == void 0) {
      this.data = toggled ? false : true;
    } else {
      this.data = toggled ? null : val;
    }
    ;
    this[$118]();
    return commit();
  }
  [$118]() {
    if (this.$$bound) {
      let data = this.data;
      let val = this.$$value == void 0 ? true : this.$$value;
      if (isGroup(data)) {
        this.checked = bindHas(data, val);
      } else {
        this.checked = data == val;
      }
      ;
    }
    ;
    return;
  }
};
extend$__3(HTMLButtonElement.prototype, Extend$HTMLButtonElement$ak.prototype);

// node_modules/imba/src/imba/events/keyboard.imba
function extend$__4(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
function use_events_keyboard() {
  return true;
}
var Extend$KeyboardEvent$af = class {
  \u03B1esc() {
    return this.keyCode == 27;
  }
  \u03B1tab() {
    return this.keyCode == 9;
  }
  \u03B1enter() {
    return this.keyCode == 13;
  }
  \u03B1space() {
    return this.keyCode == 32;
  }
  \u03B1up() {
    return this.keyCode == 38;
  }
  \u03B1down() {
    return this.keyCode == 40;
  }
  \u03B1left() {
    return this.keyCode == 37;
  }
  \u03B1right() {
    return this.keyCode == 39;
  }
  \u03B1del() {
    return this.keyCode == 8 || this.keyCode == 46;
  }
  \u03B1key(code) {
    if (typeof code == "string") {
      return this.key == code;
    } else if (typeof code == "number") {
      return this.keyCode == code;
    }
    ;
  }
};
extend$__4(KeyboardEvent.prototype, Extend$KeyboardEvent$af.prototype);

// node_modules/imba/src/imba/events/mouse.imba
function extend$__5(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
function use_events_mouse() {
  return true;
}
var Extend$MouseEvent$af = class {
  \u03B1left() {
    return this.button == 0;
  }
  \u03B1middle() {
    return this.button == 1;
  }
  \u03B1right() {
    return this.button == 2;
  }
  \u03B1shift() {
    return !!this.shiftKey;
  }
  \u03B1alt() {
    return !!this.altKey;
  }
  \u03B1ctrl() {
    return !!this.ctrlKey;
  }
  \u03B1meta() {
    return !!this.metaKey;
  }
  \u03B1mod() {
    let nav = globalThis.navigator.platform;
    return /^(Mac|iPhone|iPad|iPod)/.test(nav || "") ? !!this.metaKey : !!this.ctrlKey;
  }
};
extend$__5(MouseEvent.prototype, Extend$MouseEvent$af.prototype);

// node_modules/imba/src/imba/events/core.imba
function extend$__6(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
function iter$__7(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $119 = Symbol.for("#extendType");
var $216 = Symbol.for("#modifierState");
var $39 = Symbol.for("#sharedModifierState");
var $410 = Symbol.for("#onceHandlerEnd");
var $254 = Symbol.for("#__initor__");
var $263 = Symbol.for("#__inited__");
var $57 = Symbol.for("#__hooks__");
var $67 = Symbol.for("#extendDescriptors");
var $95 = Symbol.for("#context");
var $145 = Symbol.for("#self");
var $156 = Symbol.for("#target");
var $224 = Symbol.for("#stopPropagation");
var $234 = Symbol.for("#defaultPrevented");
use_events_keyboard();
use_events_mouse();
var Extend$CustomEvent$af = class {
  [$119](kls) {
    var $89, desc, $78;
    let ext = kls[$67] || (kls[$67] = (desc = Object.getOwnPropertyDescriptors(kls.prototype), $78 = desc.constructor, delete desc.constructor, $78, desc));
    return Object.defineProperties(this, ext);
  }
};
extend$__6(CustomEvent.prototype, Extend$CustomEvent$af.prototype);
var Extend$Event$ag = class {
  get [$216]() {
    var $1110, $106;
    return ($1110 = this[$95])[$106 = this[$95].step] || ($1110[$106] = {});
  }
  get [$39]() {
    var $138, $1210;
    return ($138 = this[$95].handler)[$1210 = this[$95].step] || ($138[$1210] = {});
  }
  [$410](cb) {
    return once(this[$95], "end", cb);
  }
  \u03B1sel(selector) {
    return !!this.target.matches(String(selector));
  }
  \u03B1closest(selector) {
    return !!this.target.closest(String(selector));
  }
  \u03B1log(...params) {
    console.info(...params);
    return true;
  }
  \u03B1trusted() {
    return !!this.isTrusted;
  }
  \u03B1if(expr) {
    return !!expr;
  }
  \u03B1wait(time = 250) {
    return new Promise(function(_0) {
      return setTimeout(_0, parseTime(time));
    });
  }
  \u03B1self() {
    return this.target == this[$95].element;
  }
  \u03B1cooldown(time = 250) {
    let o = this[$39];
    if (o.active) {
      return false;
    }
    ;
    o.active = true;
    o.target = this[$95].element;
    o.target.flags.incr("cooldown");
    this[$410](function() {
      return setTimeout(function() {
        o.target.flags.decr("cooldown");
        return o.active = false;
      }, parseTime(time));
    });
    return true;
  }
  \u03B1throttle(time = 250) {
    let o = this[$39];
    if (o.active) {
      if (o.next) {
        o.next(false);
      }
      ;
      return new Promise(function(r) {
        return o.next = function(val) {
          o.next = null;
          return r(val);
        };
      });
    }
    ;
    o.active = true;
    o.el || (o.el = this[$95].element);
    o.el.flags.incr("throttled");
    once(this[$95], "end", function() {
      let delay = parseTime(time);
      return o.interval = setInterval(function() {
        if (o.next) {
          o.next(true);
        } else {
          clearInterval(o.interval);
          o.el.flags.decr("throttled");
          o.active = false;
        }
        ;
        return;
      }, delay);
    });
    return true;
  }
  \u03B1debounce(time = 250) {
    let o = this[$39];
    let e = this;
    o.queue || (o.queue = []);
    o.queue.push(o.last = e);
    return new Promise(function(resolve) {
      return setTimeout(function() {
        if (o.last == e) {
          e.debounced = o.queue;
          o.last = null;
          o.queue = [];
          return resolve(true);
        } else {
          return resolve(false);
        }
        ;
      }, parseTime(time));
    });
  }
  \u03B1flag(name, sel) {
    const {element, step, state: state2, id, current} = this[$95];
    let el = sel instanceof Element ? sel : sel ? element.closest(sel) : element;
    if (!el) {
      return true;
    }
    ;
    this[$95].commit = true;
    state2[step] = id;
    el.flags.incr(name);
    let ts = Date.now();
    once(current, "end", function() {
      let elapsed = Date.now() - ts;
      let delay = Math.max(250 - elapsed, 0);
      return setTimeout(function() {
        return el.flags.decr(name);
      }, delay);
    });
    return true;
  }
  \u03B1busy(sel) {
    return this["\u03B1flag"]("busy", sel);
  }
  \u03B1mod(name) {
    return this["\u03B1flag"]("mod-" + name, globalThis.document.documentElement);
  }
  \u03B1outside() {
    const {handler} = this[$95];
    if (handler && handler[$145]) {
      return !handler[$145].parentNode.contains(this.target);
    }
    ;
  }
};
extend$__6(Event.prototype, Extend$Event$ag.prototype);
function use_events() {
  return true;
}
var EventHandler = class {
  constructor(params, closure) {
    this.params = params;
    this.closure = closure;
  }
  getHandlerForMethod(el, name) {
    if (!el) {
      return null;
    }
    ;
    return el[name] ? el : this.getHandlerForMethod(el.parentNode, name);
  }
  emit(name, ...params) {
    return emit(this, name, params);
  }
  on(name, ...params) {
    return listen(this, name, ...params);
  }
  once(name, ...params) {
    return once(this, name, ...params);
  }
  un(name, ...params) {
    return unlisten(this, name, ...params);
  }
  get passive\u03A6() {
    return this.params.passive;
  }
  get capture\u03A6() {
    return this.params.capture;
  }
  get silent\u03A6() {
    return this.params.silent;
  }
  get global\u03A6() {
    return this.params.global;
  }
  async handleEvent(event) {
    let element = this[$156] || event.currentTarget;
    let mods = this.params;
    let error = null;
    let silence = mods.silence || mods.silent;
    this.count || (this.count = 0);
    this.state || (this.state = {});
    let state2 = {
      element,
      event,
      modifiers: mods,
      handler: this,
      id: ++this.count,
      step: -1,
      state: this.state,
      commit: null,
      current: null
    };
    state2.current = state2;
    if (event.handle$mod) {
      if (event.handle$mod.apply(state2, mods.options || []) == false) {
        return;
      }
      ;
    }
    ;
    let guard = Event[this.type + "$handle"] || Event[event.type + "$handle"] || event.handle$mod;
    if (guard && guard.apply(state2, mods.options || []) == false) {
      return;
    }
    ;
    this.currentEvents || (this.currentEvents = new Set());
    this.currentEvents.add(event);
    for (let $166 = 0, $173 = Object.keys(mods), $246 = $173.length, handler, val; $166 < $246; $166++) {
      handler = $173[$166];
      val = mods[handler];
      state2.step++;
      if (handler[0] == "_") {
        continue;
      }
      ;
      if (handler.indexOf("~") > 0) {
        handler = handler.split("~")[0];
      }
      ;
      let modargs = null;
      let args = [event, state2];
      let res = void 0;
      let context = null;
      let m;
      let negated = false;
      let isstring = typeof handler == "string";
      if (handler[0] == "$" && handler[1] == "_" && val[0] instanceof Function) {
        handler = val[0];
        if (!handler.passive) {
          state2.commit = true;
        }
        ;
        args = [event, state2].concat(val.slice(1));
        context = element;
      } else if (val instanceof Array) {
        args = val.slice();
        modargs = args;
        for (let i = 0, $183 = iter$__7(args), $2111 = $183.length; i < $2111; i++) {
          let par = $183[i];
          if (typeof par == "string" && par[0] == "~" && par[1] == "$") {
            let name = par.slice(2);
            let chain = name.split(".");
            let value = state2[chain.shift()] || event;
            for (let i2 = 0, $196 = iter$__7(chain), $204 = $196.length; i2 < $204; i2++) {
              let part = $196[i2];
              value = value ? value[part] : void 0;
            }
            ;
            args[i] = value;
          }
          ;
        }
        ;
      }
      ;
      if (typeof handler == "string" && (m = handler.match(/^(emit|flag|mod|moved|pin|fit|refit|map|remap|css)-(.+)$/))) {
        if (!modargs) {
          modargs = args = [];
        }
        ;
        args.unshift(m[2]);
        handler = m[1];
      }
      ;
      if (handler == "trap") {
        event[$224] = true;
        event.stopImmediatePropagation();
        event[$234] = true;
        event.preventDefault();
      } else if (handler == "stop") {
        event[$224] = true;
        event.stopImmediatePropagation();
      } else if (handler == "prevent") {
        event[$234] = true;
        event.preventDefault();
      } else if (handler == "commit") {
        state2.commit = true;
      } else if (handler == "once") {
        element.removeEventListener(event.type, this);
      } else if (handler == "options" || handler == "silence" || handler == "silent") {
        continue;
      } else if (handler == "emit") {
        let name = args[0];
        let detail = args[1];
        let e = new CustomEvent(name, {bubbles: true, detail});
        e.originalEvent = event;
        let customRes = element.dispatchEvent(e);
      } else if (typeof handler == "string") {
        if (handler[0] == "!") {
          negated = true;
          handler = handler.slice(1);
        }
        ;
        let path = "\u03B1" + handler;
        let fn = event[path];
        fn || (fn = this.type && Event[this.type + "$" + handler + "$mod"]);
        fn || (fn = event[handler + "$mod"] || Event[event.type + "$" + handler] || Event[handler + "$mod"]);
        if (fn instanceof Function) {
          handler = fn;
          context = state2;
          args = modargs || [];
          if (event[path]) {
            context = event;
            event[$95] = state2;
          }
          ;
        } else if (handler[0] == "_") {
          handler = handler.slice(1);
          context = this.closure;
        } else {
          context = this.getHandlerForMethod(element, handler);
        }
        ;
      }
      ;
      try {
        if (handler instanceof Function) {
          res = handler.apply(context || element, args);
        } else if (context) {
          res = context[handler].apply(context, args);
        }
        ;
        if (res && res.then instanceof Function && res != scheduler.$promise) {
          if (state2.commit && !silence) {
            scheduler.commit();
          }
          ;
          res = await res;
        }
        ;
      } catch (e) {
        error = e;
        break;
      }
      ;
      if (negated && res === true) {
        break;
      }
      ;
      if (!negated && res === false) {
        break;
      }
      ;
      state2.value = res;
    }
    ;
    emit(state2, "end", state2);
    if (state2.commit && !silence) {
      scheduler.commit();
    }
    ;
    this.currentEvents.delete(event);
    if (this.currentEvents.size == 0) {
      this.emit("idle");
    }
    ;
    if (error) {
      throw error;
    }
    ;
    return;
  }
};
var Extend$Element$ah2 = class {
  on$(type, mods, scope) {
    let check = "on$" + type;
    let handler;
    handler = new EventHandler(mods, scope);
    let capture = mods.capture || false;
    let passive = mods.passive;
    let o = capture;
    if (passive) {
      o = {passive, capture};
    }
    ;
    if (this[check] instanceof Function) {
      handler = this[check](mods, scope, handler, o);
    } else {
      this.addEventListener(type, handler, o);
    }
    ;
    return handler;
  }
};
extend$__6(Element.prototype, Extend$Element$ah2.prototype);

// node_modules/imba/src/imba/events/pointer.imba
function extend$__7(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
use_events_mouse();
function use_events_pointer() {
  return true;
}
var Extend$PointerEvent$af = class {
  \u03B1primary() {
    return !!this.isPrimary;
  }
  \u03B1mouse() {
    return this.pointerType == "mouse";
  }
  \u03B1pen() {
    return this.pointerType == "pen";
  }
  \u03B1touch() {
    return this.pointerType == "touch";
  }
  \u03B1pressure(threshold = 0.5) {
    return this.pressure >= threshold;
  }
  \u03B1lock() {
    return true;
  }
};
extend$__7(PointerEvent.prototype, Extend$PointerEvent$af.prototype);

// node_modules/imba/src/imba/events/hotkey.shared.imba
var $120 = Symbol.for("#string");
var $310 = Symbol.for("#html");
var cfg = {
  win: {
    sep: "+",
    name: "win",
    order: ["meta", "ctrl", "mod", "alt", "option", "shift"].reverse(),
    labels: {
      option: "alt",
      mod: "ctrl",
      meta: "win"
    }
  },
  mac: {
    sep: "",
    name: "mac",
    order: ["ctrl", "alt", "option", "shift", "mod", "command"].reverse(),
    labels: {
      left: "\u2192",
      up: "\u2191",
      down: "\u2193",
      right: "\u2190",
      plus: "+",
      tab: "\u21E5",
      meta: "\u2318",
      mod: "\u2318",
      ctrl: "\u2303",
      option: "\u2325",
      alt: "\u2325",
      del: "\u2326",
      shift: "\u21E7",
      enter: "\u21A9",
      esc: "\u238B",
      backspace: "\u232B"
    }
  }
};
cfg.auto = cfg.win;
if ((globalThis.navigator.platform || "").match(/iPhone|iPod|iPad|Mac/)) {
  cfg.auto = cfg.mac;
}
var cache = {};
function format(combo, platform = "auto") {
  let key = "" + combo + ":" + platform;
  if (cache[key]) {
    return cache[key];
  }
  ;
  let o = cfg[platform] || cfg.win;
  let combos = combo.split(" ").map(function(_0) {
    let keys = _0.split("+");
    let items = keys.sort(function(_02, _1) {
      return o.order.indexOf(_1) - o.order.indexOf(_02);
    });
    let strings = items.map(function(_02) {
      let lbl = o.labels[_02] || _02;
      return lbl = lbl[0].toUpperCase() + (lbl.slice(1) || "");
    });
    return strings;
  });
  return cache[key] = combos;
}
function humanize(combo, platform) {
  var $221;
  let arr = format(combo, platform);
  let o = cfg[platform] || cfg.win;
  return arr[$120] || (arr[$120] = arr.map(function(_0) {
    return _0.join(o.sep);
  }).join(" "));
}
function htmlify(combo, platform) {
  var $412;
  let arr = format(combo, platform);
  let o = cfg[platform] || cfg.win;
  return arr[$310] || (arr[$310] = arr.map(function(_0) {
    return "<kbd>" + _0.map(function(_02) {
      return "<kbd>" + _02 + "</kbd>";
    }).join("") + "</kbd>";
  }).join(" "));
}

// node_modules/imba/src/imba/events/mousetrap.mjs
var _MAP = {
  8: "backspace",
  9: "tab",
  13: "enter",
  16: "shift",
  17: "ctrl",
  18: "alt",
  20: "capslock",
  27: "esc",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "ins",
  46: "del",
  91: "meta",
  93: "meta",
  224: "meta"
};
var _KEYCODE_MAP = {
  106: "*",
  107: "+",
  109: "-",
  110: ".",
  111: "/",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
};
var _SHIFT_MAP = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
  "|": "\\"
};
var _SPECIAL_ALIASES = {
  option: "alt",
  command: "meta",
  return: "enter",
  escape: "esc",
  plus: "+",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
};
var _REVERSE_MAP;
for (var i = 1; i < 20; ++i) {
  _MAP[111 + i] = "f" + i;
}
for (i = 0; i <= 9; ++i) {
  _MAP[i + 96] = i.toString();
}
function _addEvent(object, type, callback) {
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
    return;
  }
  object.attachEvent("on" + type, callback);
}
function _removeEvent(object, type, callback) {
  if (object.removeEventListener) {
    object.removeEventListener(type, callback, false);
    return;
  }
  object.detachEvent("on" + type, callback);
}
function _characterFromEvent(e) {
  if (e.type == "keypress") {
    var character = String.fromCharCode(e.which);
    if (!e.shiftKey) {
      character = character.toLowerCase();
    }
    return character;
  }
  if (_MAP[e.which]) {
    return _MAP[e.which];
  }
  if (_KEYCODE_MAP[e.which]) {
    return _KEYCODE_MAP[e.which];
  }
  return String.fromCharCode(e.which).toLowerCase();
}
function _modifiersMatch(modifiers1, modifiers2) {
  return modifiers1.sort().join(",") === modifiers2.sort().join(",");
}
function _eventModifiers(e) {
  var modifiers = [];
  if (e.shiftKey) {
    modifiers.push("shift");
  }
  if (e.altKey) {
    modifiers.push("alt");
  }
  if (e.ctrlKey) {
    modifiers.push("ctrl");
  }
  if (e.metaKey) {
    modifiers.push("meta");
  }
  return modifiers;
}
function _preventDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
    return;
  }
  e.returnValue = false;
}
function _stopPropagation(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
    return;
  }
  e.cancelBubble = true;
}
function _isModifier(key) {
  return key == "shift" || key == "ctrl" || key == "alt" || key == "meta";
}
function _getReverseMap() {
  if (!_REVERSE_MAP) {
    _REVERSE_MAP = {};
    for (var key in _MAP) {
      if (key > 95 && key < 112) {
        continue;
      }
      if (_MAP.hasOwnProperty(key)) {
        _REVERSE_MAP[_MAP[key]] = key;
      }
    }
  }
  return _REVERSE_MAP;
}
function _pickBestAction(key, modifiers, action) {
  if (!action) {
    action = _getReverseMap()[key] ? "keydown" : "keypress";
  }
  if (action == "keypress" && modifiers.length) {
    action = "keydown";
  }
  return action;
}
function _keysFromString(combination) {
  if (combination === "+") {
    return ["+"];
  }
  combination = combination.replace(/\+{2}/g, "+plus");
  return combination.split("+");
}
function _getKeyInfo(combination, action) {
  var keys;
  var key;
  var i;
  var modifiers = [];
  keys = _keysFromString(combination);
  for (i = 0; i < keys.length; ++i) {
    key = keys[i];
    if (_SPECIAL_ALIASES[key]) {
      key = _SPECIAL_ALIASES[key];
    }
    if (action && action != "keypress" && _SHIFT_MAP[key]) {
      key = _SHIFT_MAP[key];
      modifiers.push("shift");
    }
    if (_isModifier(key)) {
      modifiers.push(key);
    }
  }
  action = _pickBestAction(key, modifiers, action);
  return {
    key,
    modifiers,
    action
  };
}
function _belongsTo(element, ancestor) {
  if (element === null || element === document) {
    return false;
  }
  if (element === ancestor) {
    return true;
  }
  return _belongsTo(element.parentNode, ancestor);
}
function Mousetrap(targetElement) {
  var self2 = this;
  targetElement = targetElement || document;
  if (!(self2 instanceof Mousetrap)) {
    return new Mousetrap(targetElement);
  }
  self2.target = targetElement;
  self2._callbacks = {};
  self2._directMap = {};
  var _sequenceLevels = {};
  var _resetTimer;
  var _ignoreNextKeyup = false;
  var _ignoreNextKeypress = false;
  var _nextExpectedAction = false;
  function _resetSequences(doNotReset) {
    doNotReset = doNotReset || {};
    var activeSequences = false, key;
    for (key in _sequenceLevels) {
      if (doNotReset[key]) {
        activeSequences = true;
        continue;
      }
      _sequenceLevels[key] = 0;
    }
    if (!activeSequences) {
      _nextExpectedAction = false;
    }
  }
  function _getMatches(character, modifiers, e, sequenceName, combination, level) {
    var i;
    var callback;
    var matches = [];
    var action = e.type;
    if (!self2._callbacks[character]) {
      return [];
    }
    if (action == "keyup" && _isModifier(character)) {
      modifiers = [character];
    }
    for (i = 0; i < self2._callbacks[character].length; ++i) {
      callback = self2._callbacks[character][i];
      if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
        continue;
      }
      if (action != callback.action) {
        continue;
      }
      if (action == "keypress" && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {
        var deleteCombo = !sequenceName && callback.combo == combination;
        var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
        if (deleteCombo || deleteSequence) {
          self2._callbacks[character].splice(i, 1);
        }
        matches.push(callback);
      }
    }
    return matches;
  }
  function _fireCallback(callback, e, combo, sequence) {
    if (self2.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
      return;
    }
    if (callback(e, combo) === false) {
      _preventDefault(e);
      _stopPropagation(e);
    }
  }
  self2._handleKey = function(character, modifiers, e) {
    var callbacks = _getMatches(character, modifiers, e);
    var i;
    var doNotReset = {};
    var maxLevel = 0;
    var processedSequenceCallback = false;
    for (i = 0; i < callbacks.length; ++i) {
      if (callbacks[i].seq) {
        maxLevel = Math.max(maxLevel, callbacks[i].level);
      }
    }
    for (i = 0; i < callbacks.length; ++i) {
      if (callbacks[i].seq) {
        if (callbacks[i].level != maxLevel) {
          continue;
        }
        processedSequenceCallback = true;
        doNotReset[callbacks[i].seq] = 1;
        _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
        continue;
      }
      if (!processedSequenceCallback) {
        _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
      }
    }
    var ignoreThisKeypress = e.type == "keypress" && _ignoreNextKeypress;
    if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
      _resetSequences(doNotReset);
    }
    _ignoreNextKeypress = processedSequenceCallback && e.type == "keydown";
  };
  function _handleKeyEvent(e) {
    if (typeof e.which !== "number") {
      e.which = e.keyCode;
    }
    var character = _characterFromEvent(e);
    if (!character) {
      return;
    }
    if (e.type == "keyup" && _ignoreNextKeyup === character) {
      _ignoreNextKeyup = false;
      return;
    }
    self2.handleKey(character, _eventModifiers(e), e);
  }
  function _resetSequenceTimer() {
    clearTimeout(_resetTimer);
    _resetTimer = setTimeout(_resetSequences, 1e3);
  }
  function _bindSequence(combo, keys, callback, action) {
    _sequenceLevels[combo] = 0;
    function _increaseSequence(nextAction) {
      return function() {
        _nextExpectedAction = nextAction;
        ++_sequenceLevels[combo];
        _resetSequenceTimer();
      };
    }
    function _callbackAndReset(e) {
      _fireCallback(callback, e, combo);
      if (action !== "keyup") {
        _ignoreNextKeyup = _characterFromEvent(e);
      }
      setTimeout(_resetSequences, 10);
    }
    for (var i = 0; i < keys.length; ++i) {
      var isFinal = i + 1 === keys.length;
      var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
      _bindSingle(keys[i], wrappedCallback, action, combo, i);
    }
  }
  function _bindSingle(combination, callback, action, sequenceName, level) {
    self2._directMap[combination + ":" + action] = callback;
    combination = combination.replace(/\s+/g, " ");
    var sequence = combination.split(" ");
    var info;
    if (sequence.length > 1) {
      _bindSequence(combination, sequence, callback, action);
      return;
    }
    info = _getKeyInfo(combination, action);
    self2._callbacks[info.key] = self2._callbacks[info.key] || [];
    _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);
    self2._callbacks[info.key][sequenceName ? "unshift" : "push"]({
      callback,
      modifiers: info.modifiers,
      action: info.action,
      seq: sequenceName,
      level,
      combo: combination
    });
  }
  self2._bindMultiple = function(combinations, callback, action) {
    for (var i = 0; i < combinations.length; ++i) {
      _bindSingle(combinations[i], callback, action);
    }
  };
  self2.enable = function() {
    _addEvent(targetElement, "keypress", _handleKeyEvent);
    _addEvent(targetElement, "keydown", _handleKeyEvent);
    _addEvent(targetElement, "keyup", _handleKeyEvent);
  };
  self2.disable = function() {
    _removeEvent(targetElement, "keypress", _handleKeyEvent);
    _removeEvent(targetElement, "keydown", _handleKeyEvent);
    _removeEvent(targetElement, "keyup", _handleKeyEvent);
  };
  self2.enable();
}
Mousetrap.prototype.bind = function(keys, callback, action) {
  var self2 = this;
  keys = keys instanceof Array ? keys : [keys];
  self2._bindMultiple.call(self2, keys, callback, action);
  return self2;
};
Mousetrap.prototype.unbind = function(keys, action) {
  var self2 = this;
  return self2.bind.call(self2, keys, function() {
  }, action);
};
Mousetrap.prototype.trigger = function(keys, action) {
  var self2 = this;
  if (self2._directMap[keys + ":" + action]) {
    self2._directMap[keys + ":" + action]({}, keys);
  }
  return self2;
};
Mousetrap.prototype.reset = function() {
  var self2 = this;
  self2._callbacks = {};
  self2._directMap = {};
  return self2;
};
Mousetrap.prototype.stopCallback = function(e, element) {
  var self2 = this;
  if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
    return false;
  }
  if (_belongsTo(element, self2.target)) {
    return false;
  }
  return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA" || element.isContentEditable;
};
Mousetrap.prototype.handleKey = function() {
  var self2 = this;
  return self2._handleKey.apply(self2, arguments);
};
Mousetrap.addKeycodes = function(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      _MAP[key] = object[key];
    }
  }
  _REVERSE_MAP = null;
};
Mousetrap.init = function() {
  var documentMousetrap = Mousetrap(document);
  for (var method in documentMousetrap) {
    if (method.charAt(0) !== "_") {
      Mousetrap[method] = function(method2) {
        return function() {
          return documentMousetrap[method2].apply(documentMousetrap, arguments);
        };
      }(method);
    }
  }
};

// node_modules/imba/src/imba/events/hotkey.imba
function iter$__8(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
function extend$__8(target, ext) {
  const descriptors = Object.getOwnPropertyDescriptors(ext);
  delete descriptors.constructor;
  Object.defineProperties(target, descriptors);
  return target;
}
var $293 = Symbol.for("#__initor__");
var $302 = Symbol.for("#__inited__");
var $121 = Symbol.for("#__hooks__");
var $217 = Symbol.for("#updateHotKeys");
var $311 = Symbol.for("#inInput");
var $411 = Symbol.for("#inEditable");
var $68 = Symbol.for("#hotkeyTarget");
var $77 = Symbol.for("#hotkeyCombos");
var $87 = Symbol.for("#extendType");
var $135 = Symbol.for("#combos");
var $146 = Symbol.for("#target");
var $157 = Symbol.for("#hotkeyHandlers");
var $194 = Symbol.for("#defaultPrevented");
var $218 = Symbol.for("#visit");
var $244 = Symbol.for("#key");
var isApple;
try {
  isApple = (globalThis.navigator.platform || "").match(/iPhone|iPod|iPad|Mac/);
} catch (e) {
}
function use_events_hotkey() {
  return true;
}
var Globals = {esc: true};
var HotkeyEvent = class extends CustomEvent {
  \u03B1focus(expr) {
    let el = this.target;
    let doc = el.ownerDocument;
    if (expr) {
      el = el.querySelector(expr) || el.closest(expr) || doc.querySelector(expr);
    }
    ;
    if (el == doc.body) {
      if (doc.activeElement != doc.body) {
        doc.activeElement.blur();
      }
      ;
    } else {
      el.focus();
    }
    ;
    return true;
  }
  \u03B1repeat() {
    return true;
  }
};
var stopCallback = function(e, el, combo) {
  if (el.tagName == "INPUT" && (combo == "down" || combo == "up")) {
    return false;
  }
  ;
  if (el.tagName == "INPUT" || el.tagName == "SELECT" || el.tagName == "TEXTAREA") {
    if (Globals[combo]) {
      e[$311] = true;
      e[$411] = true;
      return false;
    }
    ;
    return true;
  }
  ;
  if (el.contentEditable && (el.contentEditable == "true" || el.contentEditable == "plaintext-only")) {
    if (Globals[combo]) {
      e[$411] = true;
      return false;
    }
    ;
    return true;
  }
  ;
  return false;
};
var hotkeys = new class HotKeyManager {
  constructor() {
    this.combos = {"*": {}};
    this.identifiers = {};
    this.labels = {};
    this.handler = this.handle.bind(this);
    this.mousetrap = null;
    this.hothandler = this.handle.bind(this);
  }
  trigger(combo) {
    var _a, _b;
    return (_b = (_a = this.mousetrap) == null ? void 0 : _a.trigger) == null ? void 0 : _b.call(_a, combo);
  }
  register(key, mods = {}) {
    if (!this.mousetrap) {
      this.mousetrap = Mousetrap(globalThis.document);
      this.mousetrap.stopCallback = stopCallback;
    }
    ;
    if (!this.combos[key]) {
      this.combos[key] = true;
      this.mousetrap.bind(key, this.handler);
    }
    ;
    if (mods.capture || mods.force) {
      Globals[key] = true;
    }
    ;
    return this;
  }
  comboIdentifier(combo) {
    var $510;
    return ($510 = this.identifiers)[combo] || ($510[combo] = combo.replace(/\+/g, "_").replace(/\ /g, "-").replace(/\*/g, "all").replace(/\|/g, " "));
  }
  humanize(combo, platform = "auto") {
    return humanize(combo, platform);
  }
  htmlify(combo, platform = "auto") {
    return htmlify(combo, platform);
  }
  matchCombo(str) {
    return true;
  }
  handle(e, combo) {
    var _a;
    let source = e.target && e.target[$68] || e.target || globalThis.document.body;
    let targets = Array.from(globalThis.document.querySelectorAll("[data-hotkey]"));
    let root = source.ownerDocument;
    let group = source;
    while (group && group != root) {
      if (group.hotkeys === true) {
        break;
      }
      ;
      group = group.parentNode;
    }
    ;
    targets = targets.reverse().filter(function(el) {
      let combos = el[$77];
      if (!(combos && (combos[combo] || combos["*"]))) {
        return false;
      }
      ;
      let par = el;
      while (par && par != root) {
        if (par.hotkeys === false) {
          return false;
        }
        ;
        par = par.parentNode;
      }
      ;
      return true;
    });
    if (!targets.length) {
      return;
    }
    ;
    let detail = {combo, originalEvent: e, targets};
    let event = new CustomEvent("hotkey", {bubbles: true, detail});
    event[$87](HotkeyEvent);
    event.originalEvent = e;
    event.hotkey = combo;
    source.dispatchEvent(event);
    let handlers = [];
    for (let $96 = 0, $106 = iter$__8(targets), $173 = $106.length; $96 < $173; $96++) {
      let receiver = $106[$96];
      for (let $1110 = 0, $1210 = iter$__8(receiver[$157]), $166 = $1210.length; $1110 < $166; $1110++) {
        let handler = $1210[$1110];
        if (handler[$135][combo] || handler[$135]["*"]) {
          if (!e[$411] || (handler.capture\u03A6 || handler.params.force)) {
            let el = handler[$146];
            if (group.contains(el) || el.contains(group) || handler.global\u03A6) {
              handlers.push(handler);
            }
            ;
          }
          ;
        }
        ;
      }
      ;
    }
    ;
    for (let i = 0, $183 = iter$__8(handlers), $204 = $183.length; i < $204; i++) {
      let handler = $183[i];
      if (!e.repeat || handler.params.repeat) {
        handler.handleEvent(event);
      }
      ;
      if (!handler.passive\u03A6 || event[$194]) {
        (_a = e == null ? void 0 : e.preventDefault) == null ? void 0 : _a.call(e);
      }
      ;
      if (!handler.passive\u03A6) {
        break;
      }
      ;
    }
    ;
    return this;
  }
}();
var DefaultHandler = function(e, state2) {
  let el = state2.element;
  if (el instanceof Element) {
    if (el.matches("input,textarea,select,option")) {
      el.focus();
    } else {
      el.click();
    }
    ;
  }
  ;
  return;
};
DefaultHandler.passive = true;
var Extend$Element$af2 = class {
  on$hotkey(mods, scope, handler, o) {
    var self2 = this;
    this[$157] || (this[$157] = []);
    this[$157].push(handler);
    handler[$146] = this;
    mods.$_ || (mods.$_ = [DefaultHandler]);
    mods[$218] = function() {
      return self2[$217]();
    };
    this[$217]();
    return handler;
  }
  [$217]() {
    let all = {};
    for (let $225 = 0, $235 = iter$__8(this[$157]), $282 = $235.length; $225 < $282; $225++) {
      let handler = $235[$225];
      let mods = handler.params;
      let key = mods.options[0];
      if (handler[$244] != key ? (handler[$244] = key, true) : false) {
        handler[$135] = {};
        for (let $255 = 0, $265 = iter$__8(key.split("|")), $273 = $265.length; $255 < $273; $255++) {
          let combo = $265[$255];
          hotkeys.register(combo, mods);
          handler[$135][combo] = true;
        }
        ;
      }
      ;
      Object.assign(all, handler[$135]);
    }
    ;
    this[$77] = all;
    this.dataset.hotkey = Object.keys(all).join(" ");
    return this;
  }
};
extend$__8(Element.prototype, Extend$Element$af2.prototype);

// app/client.imba
var import_lodash = __toModule(require_lodash());

// package.json
var version = "0.0.32";

// app/utils/fzy.imba
function iter$__9(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var SCORE_MIN = -Infinity;
var SCORE_MAX = Infinity;
var SCORE_GAP_LEADING = -5e-3;
var SCORE_GAP_TRAILING = -5e-3;
var SCORE_GAP_INNER = -0.01;
var SCORE_MATCH_CONSECUTIVE = 1;
var SCORE_MATCH_SLASH = 0.9;
var SCORE_MATCH_WORD = 0.8;
var SCORE_MATCH_DOT = 0.6;
function fzy(arr, query, keyname = "name") {
  let needle = query.trim().toLowerCase();
  if (arr.length <= 0) {
    return [];
  }
  ;
  let scored = [];
  let M = new Array(1e5);
  let D = new Array(1e5);
  let B = new Array(1e5);
  for (let $130 = 0, $221 = iter$__9(arr), $313 = $221.length; $130 < $313; $130++) {
    let obj = $221[$130];
    if (!obj.hasOwnProperty(keyname)) {
      continue;
    }
    ;
    let haystack = obj[keyname].trim().toLowerCase();
    if (!has_match(needle, haystack)) {
      continue;
    }
    ;
    obj.fzy_score = score(needle, haystack, M, D, B);
    sorted_insert(obj, scored);
  }
  ;
  return scored;
}
function score(needle, haystack, M, D, match_bonus) {
  let n = needle.length;
  let m = haystack.length;
  if (n < 1 || m < 1) {
    return SCORE_MIN;
  }
  ;
  if (n === m) {
    return SCORE_MAX;
  }
  ;
  if (m > 1024) {
    return SCORE_MIN;
  }
  ;
  compute(needle, haystack, M, D, match_bonus);
  return M[(n - 1) * m + (m - 1)];
}
function compute(needle, haystack, M, D, match_bonus) {
  var $510, $412;
  let n = needle.length;
  let m = haystack.length;
  precompute_bonus(haystack, match_bonus);
  $412 = [];
  for (let len = n - 1, i = 0, rd = len - i; rd > 0 ? i <= len : i >= len; rd > 0 ? i++ : i--) {
    let prev_score = SCORE_MIN;
    let gap_score = i === n - 1 ? SCORE_GAP_TRAILING : SCORE_GAP_INNER;
    $510 = [];
    for (let len2 = m - 1, j = 0, rd2 = len2 - j, score1; rd2 > 0 ? j <= len2 : j >= len2; rd2 > 0 ? j++ : j--) {
      let ij = i * m + j;
      let pij = (i - 1) * m + (j - 1);
      $510.push(needle[i] === haystack[j] ? (score1 = SCORE_MIN, i === 0 ? score1 = j * SCORE_GAP_LEADING + match_bonus[j] : j > 0 && (score1 = Math.max(M[pij] + match_bonus[j], D[pij] + SCORE_MATCH_CONSECUTIVE)), D[ij] = score1, M[ij] = prev_score = Math.max(score1, prev_score + gap_score)) : (D[ij] = SCORE_MIN, M[ij] = prev_score = prev_score + gap_score));
    }
    ;
    $412.push($510);
  }
  ;
  return $412;
}
function precompute_bonus(haystack, match_bonus) {
  var $610;
  let m = haystack.length;
  let last_ch = "/";
  $610 = [];
  for (let len = m - 1, i = 0, rd = len - i; rd > 0 ? i <= len : i >= len; rd > 0 ? i++ : i--) {
    let ch = haystack[i];
    if (last_ch === "/") {
      match_bonus[i] = SCORE_MATCH_SLASH;
    } else if (last_ch === "-" || last_ch === "_" || last_ch === " ") {
      match_bonus[i] = SCORE_MATCH_WORD;
    } else if (last_ch === ".") {
      match_bonus[i] = SCORE_MATCH_DOT;
    } else {
      match_bonus[i] = 0;
    }
    ;
    $610.push(last_ch = ch);
  }
  ;
  return $610;
}
function has_match(needle, haystack) {
  let i = 0;
  let n = -1;
  let letter;
  while (letter = needle[i++]) {
    if ((n = haystack.indexOf(letter, n + 1)) === -1) {
      return false;
    }
    ;
  }
  ;
  return true;
}
function sorted_insert(elem, arr) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    let mid = low + high >>> 1;
    if (elem.fzy_score > arr[mid].fzy_score) {
      high = mid;
    } else {
      low = mid + 1;
    }
    ;
  }
  ;
  return arr.splice(low, 0, elem);
}
var fzy_default = fzy;

// app/utils/download.imba
function get_datetime_string() {
  let obj = new Date().toString().split(" ");
  let date = obj.slice(1, 4).join("-").toLowerCase();
  let time = obj[4].split(":").join("-");
  return "" + date + "_" + time;
}
function download_json_file(data, prefix = "") {
  let element = globalThis.document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + window.encodeURIComponent(data));
  element.setAttribute("download", "" + prefix + get_datetime_string() + ".json");
  element.style.display = "none";
  globalThis.document.body.appendChild(element);
  element.click();
  return globalThis.document.body.removeChild(element);
}

// app/utils/upload.imba
function upload_json_file(e) {
  return new Promise(function(resolve) {
    let files = e.target.files;
    if (files.length < 1) {
      resolve(false);
    }
    ;
    let file = files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      try {
        return resolve(JSON.parse(reader.result));
      } catch ($130) {
        return resolve(false);
      }
      ;
    };
    reader.onerror = function() {
      return resolve(false);
    };
    return reader.readAsText(file);
  });
}

// app/utils/idb_wrapper.imba
var $126 = Symbol.for("#get_store");
var $219 = Symbol.for("#sleep");
var $58 = Symbol.for("#__initor__");
var $69 = Symbol.for("#__inited__");
var $312 = Symbol.for("#__hooks__");
var p = console.log;
var idb_wrapper = class {
  constructor(db_name, table_name, version2) {
    this.db_name = db_name;
    this.table_name = table_name;
    this.version = version2;
    this.openRequest = null;
  }
  open() {
    var self2 = this;
    this.openRequest = globalThis.indexedDB.open(this.db_name, this.version);
    self2.openRequest.onupgradeneeded = function(event) {
      p("Upgrading from DB version " + event.oldVersion + " to " + event.newVersion + ".");
      let db2 = self2.openRequest.result;
      switch (event.oldVersion) {
        case 0: {
          return db2.createObjectStore(self2.table_name, {keyPath: "id", autoIncrement: true});
          break;
        }
      }
      ;
    };
    self2.openRequest.onerror = function() {
      return p("Open db error.");
    };
    return self2.openRequest.onsuccess = function() {
      p("Open db success.");
      if (globalThis.navigator.storage && globalThis.navigator.storage.persist) {
        return globalThis.navigator.storage.persist().then(function(persistent) {
          return p("db is persistent: " + persistent);
        });
      }
      ;
    };
  }
  async reload() {
    let store;
    while (true) {
      try {
        store = this[$126]("readonly");
        p("Get store success.");
        break;
      } catch ($412) {
        p("Failed to get store, retrying.");
        await this[$219](10);
      }
      ;
    }
    ;
    let request = store.getAll();
    return new Promise(function(resolve) {
      request.onsuccess = function() {
        p("Load db success.");
        resolve(request.result);
        return commit();
      };
      return request.onerror = function() {
        p("Load db error.");
        return resolve(false);
      };
    });
  }
  delete(obj) {
    let store = this[$126]();
    let request = store.delete(obj.id);
    return new Promise(function(resolve) {
      request.onsuccess = function() {
        p("deleted link: " + obj);
        return resolve(false);
      };
      return request.onerror = function() {
        p("Failed to delete link: " + obj);
        return resolve(true);
      };
    });
  }
  put(obj) {
    let store = this[$126]();
    let request = store.put(obj);
    return new Promise(function(resolve) {
      request.onsuccess = function() {
        p("Successfully put link: " + obj);
        return resolve(request.result);
      };
      return request.onerror = function() {
        p("Failed to put link: " + obj);
        return resolve(false);
      };
    });
  }
  [$126](permission = "readwrite") {
    let db2 = this.openRequest.result;
    let transaction = db2.transaction(this.table_name, permission);
    return transaction.objectStore(this.table_name);
  }
  [$219](ms) {
    return new Promise(function(resolve) {
      return setTimeout(resolve, ms);
    });
  }
};
var idb_wrapper_default = idb_wrapper;

// app/state.imba
var state = {};
state.query = "";
state.links = [];
state.scored_links = [];
var state_default = state;

// app/client.imba
function iter$__10(a) {
  let v;
  return a ? (v = a.toIterable) ? v.call(a) : a : a;
}
var $127 = Symbol.for("#__init__");
var $220 = Symbol.for("#__patch__");
var $136 = Symbol.for("#beforeReconcile");
var $245 = Symbol.for("##up");
var $323 = Symbol.for("#placeChild");
var $672 = Symbol.for("#afterVisit");
var $682 = Symbol.for("#appendChild");
var $1542 = Symbol.for("#afterReconcile");
var $165 = Symbol();
var $195 = Symbol();
var $2110 = Symbol();
var $264 = Symbol();
var $294 = Symbol();
var $343 = Symbol();
var $362 = Symbol();
var $392 = Symbol();
var $423 = Symbol();
var $452 = Symbol();
var $482 = Symbol();
var $522 = Symbol();
var $552 = Symbol();
var $572 = Symbol();
var $59 = Symbol();
var $60 = Symbol();
var $61 = Symbol();
var $622 = Symbol();
var $632 = Symbol();
var $642 = Symbol();
var $652 = Symbol();
var $662 = Symbol();
var $692 = Symbol();
var $71 = Symbol();
var $732 = Symbol();
var $762 = Symbol();
var $79 = Symbol();
var $81 = Symbol();
var $842 = Symbol();
var $862 = Symbol();
var $88 = Symbol();
var $91 = Symbol();
var $99 = Symbol();
var $101 = Symbol();
var $1032 = Symbol();
var $1042 = Symbol();
var $105 = Symbol();
var $108 = Symbol();
var $1112 = Symbol();
var $1142 = Symbol();
var $1162 = Symbol();
var $1172 = Symbol();
var $1202 = Symbol();
var $1232 = Symbol();
var $1262 = Symbol();
var $128 = Symbol();
var $129 = Symbol();
var $131 = Symbol();
var $137 = Symbol();
var $140 = Symbol();
var $1432 = Symbol();
var $1452 = Symbol();
var $1462 = Symbol();
var $149 = Symbol();
var $151 = Symbol();
var $1522 = Symbol();
var $1532 = Symbol();
var $1552;
var $1562 = getRenderContext();
var $1572 = Symbol();
var $158;
var $159;
use_events(), use_events_mouse(), use_events_hotkey(), use_dom_bind(), use_events_pointer();
var p2 = console.log;
var db = new idb_wrapper_default("fuzzyhome", "links", 1);
db.open();
var AppComponent = class extends Component {
  get $input() {
    let el = createElement("input", null, `eq_af ${this._ns_ || ""} ref--input`, null);
    return Object.defineProperty(this, "$input", {value: el}), el;
  }
  [$220]($$ = {}) {
    var $313;
    ($313 = $$.selection_index) !== void 0 && (this.selection_index = $313);
    ($313 = $$.settings_active) !== void 0 && (this.settings_active = $313);
  }
  [$127]($$ = null) {
    var $412;
    super[$127](...arguments);
    this.selection_index = $$ && ($412 = $$.selection_index) !== void 0 ? $412 : 0;
    this.settings_active = $$ && ($412 = $$.settings_active) !== void 0 ? $412 : false;
  }
  get render\u03A6() {
    return this.mounted\u03A6;
  }
  async mount() {
    if (!globalThis.localStorage.fuzzyhome_visited) {
      await this.put_link({name: "fuzzy home help", link: "github.com/familyfriendlymikey/fuzzyhome"});
      await this.put_link({name: "google", link: "google.com"});
      await this.put_link({name: "youtube", link: "youtube.com"});
      globalThis.localStorage.fuzzyhome_visited = true;
    }
    ;
    if (!globalThis.localStorage.fuzzyhome_config) {
      let search_engine_url = "www.google.com/search?q=";
      let search_engine_hostname = "www.google.com";
      let search_engine_frequency = 0;
      let search_engine_icon = await this.fetch_image_as_base_64("google.com");
      state_default.config = {
        search_engine_url,
        search_engine_hostname,
        search_engine_icon,
        search_engine_frequency
      };
      this.save_config();
    } else {
      this.load_config();
    }
    ;
    state_default.links = await db.reload();
    return this.sort_links();
  }
  async reload_db() {
    state_default.links = await db.reload();
    return this.sort_links();
  }
  sort_links() {
    if (state_default.query.trim().length > 0) {
      return state_default.scored_links = fzy_default(state_default.links, state_default.query);
    } else {
      return state_default.scored_links = (0, import_lodash.sortBy)(state_default.links, function(link) {
        return -link.frequency;
      });
    }
    ;
  }
  navigate(link) {
    return window.location.href = "//" + link.link;
  }
  async update_link(link) {
    link.last_opened = Date.now();
    link.frequency = link.frequency + 1;
    return await db.put(link);
  }
  handle_click_link(link) {
    return this.update_link(link);
  }
  use_search_engine() {
    state_default.config.search_engine_frequency += 1;
    this.save_config();
    let encoded_query = window.encodeURIComponent(state_default.query);
    return window.location.href = "//" + state_default.config.search_engine_url + encoded_query;
  }
  handle_return() {
    if (state_default.scored_links.length < 1) {
      return this.use_search_engine();
    } else {
      let link = state_default.scored_links[this.selection_index];
      this.update_link(link);
      return this.navigate(link);
    }
    ;
  }
  handle_shift_return() {
    return this.use_search_engine();
  }
  name_exists(query) {
    for (let $510 = 0, $610 = iter$__10(state_default.links), $78 = $610.length; $510 < $78; $510++) {
      let {name} = $610[$510];
      if (query.trim().toLowerCase() === name.trim().toLowerCase()) {
        return true;
      }
      ;
    }
    ;
    return false;
  }
  fetch_image_as_base_64(url) {
    let fallback = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mO8seXffwYqAsZRA0cNHDVw1MBRA0eqgQCDRkbJSQHxEQAAAABJRU5ErkJggg==";
    return new Promise(async function(resolve) {
      let res;
      try {
        res = await globalThis.fetch("https://icon.horse/icon/" + url);
      } catch ($89) {
        p2("Failed to get icon from icon horse.");
        resolve(fallback);
        return;
      }
      ;
      let blob = await res.blob();
      let reader = new FileReader();
      reader.onload = function() {
        return resolve(this.result);
      };
      reader.onerror = function() {
        p2("Failed to get data from reader.");
        resolve(fallback);
        return;
      };
      return reader.readAsDataURL(blob);
    });
  }
  async handle_click_create() {
    this.loading_create = true;
    let query = state_default.query.trim();
    if (query === "") {
      this.loading_create = false;
      return;
    }
    ;
    this.split_query = query.split(/\s+/);
    if (this.split_query.length < 2) {
      this.loading_create = false;
      return;
    }
    ;
    let link = this.split_query.pop();
    let name = this.split_query.join(" ");
    await this.put_link({link, name});
    state_default.query = "";
    this.reload_db();
    return this.loading_create = false;
  }
  can_put_link(text) {
    let split_text = text.trim().split(/\s+/);
    if (split_text.length < 2) {
      return false;
    }
    ;
    split_text.pop();
    let name = split_text.join(" ");
    if (this.name_exists(name)) {
      return false;
    }
    ;
    if (name.toLowerCase() === "search") {
      return false;
    }
    ;
    return true;
  }
  async put_link({link, name, frequency = 1, last_opened = Date.now()}) {
    name = name.trim();
    if (this.name_exists(name)) {
      return;
    }
    ;
    if (name.toLowerCase() === "search") {
      return;
    }
    ;
    link = link.trim().replace(/(^\w+:|^)\/\//, "");
    let url = new URL("https://" + link);
    let img = await this.fetch_image_as_base_64(url.hostname);
    return await db.put({name, link, frequency, last_opened, img});
  }
  handle_input() {
    this.selection_index = 0;
    return this.sort_links();
  }
  async handle_click_delete(link) {
    if (!link) {
      return;
    }
    ;
    if (!window.confirm("Do you really want to delete " + (link == null ? void 0 : link.name) + "?")) {
      return;
    }
    ;
    await db.delete(link);
    state_default.query = "";
    return this.reload_db();
  }
  async handle_click_import(e) {
    this.loading_import = true;
    let data = await upload_json_file(e);
    if (!Array.isArray(data)) {
      this.loading_import = false;
      return;
    }
    ;
    for (let $96 = 0, $106 = iter$__10(data), $1110 = $106.length; $96 < $1110; $96++) {
      let link = $106[$96];
      await this.put_link(link);
    }
    ;
    this.reload_db();
    this.loading_import = false;
    return this.settings_active = false;
  }
  handle_click_export() {
    download_json_file(JSON.stringify(state_default.links), "fuzzyhome_");
    return this.settings_active = false;
  }
  save_config() {
    return globalThis.localStorage.fuzzyhome_config = JSON.stringify(state_default.config);
  }
  load_config() {
    return state_default.config = JSON.parse(globalThis.localStorage.fuzzyhome_config);
  }
  async handle_click_config() {
    let link = window.prompt("Please enter the URL of your search engine.");
    if (!link) {
      return;
    }
    ;
    link = link.trim().replace(/(^\w+:|^)\/\//, "");
    let url = new URL("https://" + link);
    state_default.config.search_engine_icon = await this.fetch_image_as_base_64(url.hostname);
    state_default.config.search_engine_url = link;
    state_default.config.search_engine_hostname = url.hostname;
    this.save_config();
    return this.settings_active = false;
  }
  handle_paste(e) {
    if (state_default.query.length > 0) {
      return;
    }
    ;
    return globalThis.setTimeout(function() {
      return window.location.href = "//" + state_default.config.search_engine_url + state_default.query.trim();
    }, 0);
  }
  toggle_settings() {
    if (this.settings_active) {
      return this.settings_active = false;
    } else {
      return this.settings_active = true;
    }
    ;
  }
  increment_selection_index() {
    return this.selection_index = Math.min(state_default.links.length - 1, this.selection_index + 1);
  }
  decrement_selection_index() {
    return this.selection_index = Math.max(0, this.selection_index - 1);
  }
  render() {
    var self2 = this, $255, $204, $722, $872, $1210, $147, $1510, $173 = this._ns_ || "", $183, $225, $235, $273, $282, $303, $313, $332, $352, $372, $382, $40, $41, $433, $443, $462, $472, $492, $50, $51, $532, $542, $562, $582, $70, $742, $752, $772, $78, $80, $822, $832, $852, $89, $90, $922, $932, $942, $96, $97, $98, $100, $1022, $106, $107, $109, $1102, $1122, $1132, $1152, $1182, $1192, $1212, $1222, $1242, $1252, $1272, $1322, $1332, $1342, $1352, $1362, $138, $139, $141, $1422, $1442, $1472, $148, $150;
    $1210 = this;
    $1210[$136]();
    ($147 = $1510 = 1, $1210[$165] === 1) || ($147 = $1510 = 0, $1210[$165] = 1);
    (!$147 || $1510 & 2) && $1210.flagSelf$("eq-af");
    ($183 = $1210[$195]) || ($1210[$195] = $183 = createElement("div", $1210, `eq-ag eq_af ${$173}`, null));
    $204 = null;
    if (this.settings_active) {
      ($225 = $235 = 1, $204 = $1210[$2110]) || ($225 = $235 = 0, $1210[$2110] = $204 = createElement("div", null, `buttons eq_af ${$173}`, null));
      $225 || ($204[$245] = $183);
      $255 = null;
      if (this.loading_import) {
        ($273 = $282 = 1, $255 = $204[$264]) || ($273 = $282 = 0, $204[$264] = $255 = createElement("div", null, `button disabled eq_af ${$173}`, "IMPORT"));
        $273 || ($255[$245] = $204);
      } else {
        ($303 = $313 = 1, $255 = $204[$294]) || ($303 = $313 = 0, $204[$294] = $255 = createElement("label", null, `button eq_af ${$173}`, null));
        $303 || ($255[$245] = $204);
        $303 || $255[$323]("IMPORT");
        $303 || ($332 = createElement("input", $255, `eq-ak eq_af ${$173}`, null));
        $303 || $332.on$(`change`, {$_: [function(e, $$) {
          return self2.handle_click_import(e);
        }]}, this);
        $303 || $332.on$(`click`, {$_: [function(e, $$) {
          return this.value = "";
        }]}, this);
        $303 || ($332.type = "file");
        ;
      }
      ;
      $204[$343] = $204[$323]($255, 0, $204[$343]);
      ($372 = $382 = 1, $352 = $204[$362]) || ($372 = $382 = 0, $204[$362] = $352 = createElement("div", $204, `button eq_af ${$173}`, "EXPORT"));
      $40 = $204[$392] || ($204[$392] = {$_: [function(e, $$, _2) {
        return _2.handle_click_export(e);
      }, null]});
      $40.$_[1] = self2;
      $372 || $352.on$(`click`, $40, this);
      ;
      ($433 = $443 = 1, $41 = $204[$423]) || ($433 = $443 = 0, $204[$423] = $41 = createElement("div", $204, `button eq_af ${$173}`, "CONFIG"));
      $462 = $204[$452] || ($204[$452] = {$_: [function(e, $$, _2) {
        return _2.handle_click_config(e);
      }, null]});
      $462.$_[1] = self2;
      $433 || $41.on$(`click`, $462, this);
      ;
      $225 || ($472 = createElement("div", $204, `button eq_af ${$173}`, "HELP"));
      $225 || $472.on$(`click`, {$_: [function(e, $$) {
        return globalThis.location.href = "https://github.com/familyfriendlymikey/fuzzyhome";
      }]}, this);
      ;
    } else {
      ($492 = $50 = 1, $204 = $1210[$482]) || ($492 = $50 = 0, $1210[$482] = $204 = createElement("div", null, `eq-ao eq_af ${$173}`, null));
      $492 || ($204[$245] = $183);
      ($532 = $542 = 1, $51 = $204[$522]) || ($532 = $542 = 0, $204[$522] = ($51 = this.$input, $51[$245] = $204, $51));
      $562 = $204[$552] || ($204[$552] = {options: ["mod+k"], capture: true, $_: [function(e, $$, _2) {
        var _a, _b;
        return (_b = (_a = _2.$input) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a, e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $582 = $204[$572] || ($204[$572] = $51.bind$("data", [null, "query"]));
      $582[0] = state_default;
      $582 = "v" + version, $582 === $204[$59] || ($51.placeholder = $204[$59] = $582);
      $562 = $204[$60] || ($204[$60] = {options: ["return"], capture: true, $_: [function(e, $$, _2) {
        return _2.handle_return(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $562 = $204[$61] || ($204[$61] = {options: ["shift+return"], capture: true, $_: [function(e, $$, _2) {
        return _2.handle_shift_return(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $562 = $204[$622] || ($204[$622] = {options: ["esc"], capture: true, $_: [function(e, $$, _2) {
        var _a, _b;
        return (_b = (_a = _2.$input) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a, e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $562 = $204[$632] || ($204[$632] = {options: ["down"], capture: true, $_: [function(e, $$, _2) {
        return _2.increment_selection_index(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $562 = $204[$642] || ($204[$642] = {options: ["up"], capture: true, $_: [function(e, $$, _2) {
        return _2.decrement_selection_index(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`hotkey`, $562, this);
      $562 = $204[$652] || ($204[$652] = {$_: [function(e, $$, _2) {
        return _2.handle_input(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`input`, $562, this);
      $562 = $204[$662] || ($204[$662] = {$_: [function(e, $$, _2) {
        return _2.handle_paste(e);
      }, null]});
      $562.$_[1] = self2;
      $532 || $51.on$(`paste`, $562, this);
      $532 || !$51.setup || $51.setup($542);
      $51[$672]($542);
      $532 || $204[$682]($51);
      ;
    }
    ;
    $1210[$692] = $183[$323]($204, 0, $1210[$692]);
    ($70 = $1210[$71]) || ($1210[$71] = $70 = createElement("div", $183, `settings-or-create eq_af ${$173}`, null));
    $722 = null;
    if (self2.can_put_link(state_default.query) && !self2.settings_active) {
      if (self2.loading_create) {
        ($742 = $752 = 1, $722 = $1210[$732]) || ($742 = $752 = 0, $1210[$732] = $722 = createElement("div", null, `create disabled eq_af ${$173}`, "   +"));
        $742 || ($722[$245] = $70);
      } else {
        ($772 = $78 = 1, $722 = $1210[$762]) || ($772 = $78 = 0, $1210[$762] = $722 = createElement("div", null, `create eq_af ${$173}`, "   +"));
        $772 || ($722[$245] = $70);
        $80 = $722[$79] || ($722[$79] = {$_: [function(e, $$, _2) {
          return _2.handle_click_create(e);
        }, null]});
        $80.$_[1] = self2;
        $772 || $722.on$(`click`, $80, this);
      }
      ;
    } else {
      ($822 = $832 = 1, $722 = $1210[$81]) || ($822 = $832 = 0, $1210[$81] = $722 = createElement("div", null, `toggle-settings eq_af ${$173}`, "..."));
      $822 || ($722[$245] = $70);
      $852 = $722[$842] || ($722[$842] = {$_: [function(e, $$, _2) {
        return _2.toggle_settings(e);
      }, null]});
      $852.$_[1] = self2;
      $822 || $722.on$(`click`, $852, this);
    }
    ;
    $1210[$862] = $70[$323]($722, 0, $1210[$862]);
    ;
    ;
    $872 = null;
    if (state_default.scored_links.length > 0) {
      ($89 = $90 = 1, $872 = $1210[$88]) || ($89 = $90 = 0, $1210[$88] = $872 = createElement("div", null, `links eq_af ${$173}`, null));
      $89 || ($872[$245] = $1210);
      ($922 = $872[$91]) || ($872[$91] = $922 = createIndexedList(384, $872));
      $932 = 0;
      $942 = $922.$;
      for (let index = 0, $952 = iter$__10(state_default.scored_links), $130 = $952.length; index < $130; index++) {
        let obj = $952[index];
        ($97 = $98 = 1, $96 = $942[$932]) || ($97 = $98 = 0, $942[$932] = $96 = createElement("a", $922, `link eq_af ${$173}`, null));
        $97 || ($96[$245] = $922);
        $100 = "//" + obj.link, $100 === $96[$99] || ($96.href = $96[$99] = $100);
        $1022 = $96[$101] || ($96[$101] = {$_: [function(e, $$, _2, _3) {
          return _3.selection_index = _2;
        }, null, null]});
        $1022.$_[1] = index;
        $1022.$_[2] = self2;
        $97 || $96.on$(`pointerover`, $1022, this);
        $1022 = $96[$1032] || ($96[$1032] = {$_: [function(e, $$, _2, _3) {
          return _3.handle_click_link(_2);
        }, null, null]});
        $1022.$_[1] = obj;
        $1022.$_[2] = self2;
        $97 || $96.on$(`click`, $1022, this);
        $100 = index == self2.selection_index || void 0, $100 === $96[$105] || ($98 |= 2, $96[$105] = $100);
        $98 & 2 && $96.flag$(`link eq_af ${$173} ` + ($96[$105] ? `selected` : ""));
        $97 || ($106 = createElement("div", $96, `link-left eq_af ${$173}`, null));
        ($109 = $1102 = 1, $107 = $96[$108]) || ($109 = $1102 = 0, $96[$108] = $107 = createElement("img", $106, `link-icon eq_af ${$173}`, null));
        $109 || ($107.height = 20);
        $109 || ($107.width = 20);
        $1122 = obj.img, $1122 === $96[$1112] || ($107.src = $96[$1112] = $1122);
        ;
        ($1132 = $96[$1142]) || ($96[$1142] = $1132 = createElement("div", $106, `name eq_af ${$173}`, null));
        $1152 = obj.name, $1152 === $96[$1172] && $97 || ($96[$1162] = $1132[$323]($96[$1172] = $1152, 384, $96[$1162]));
        ;
        ;
        $97 || ($1182 = createElement("div", $96, `link-right eq_af ${$173}`, null));
        ($1212 = $1222 = 1, $1192 = $96[$1202]) || ($1212 = $1222 = 0, $96[$1202] = $1192 = createElement("div", $1182, `delete eq_af ${$173}`, "x"));
        $1242 = $96[$1232] || ($96[$1232] = {prevent: true, stop: true, $_: [function(e, $$, _2, _3) {
          return _3.handle_click_delete(_2);
        }, null, null]});
        $1242.$_[1] = obj;
        $1242.$_[2] = self2;
        $1212 || $1192.on$(`click`, $1242, this);
        ;
        ($1252 = $96[$1262]) || ($96[$1262] = $1252 = createElement("div", $1182, `frequency eq_af ${$173}`, null));
        $1272 = obj.frequency, $1272 === $96[$129] && $97 || ($96[$128] = $1252[$323]($96[$129] = $1272, 384, $96[$128]));
        ;
        ;
        $932++;
      }
      ;
      $922[$672]($932);
      ;
    } else {
      ($1322 = $1332 = 1, $872 = $1210[$131]) || ($1322 = $1332 = 0, $1210[$131] = $872 = createElement("div", null, `links eq_af ${$173}`, null));
      $1322 || ($872[$245] = $1210);
      $1322 || ($1342 = createElement("div", $872, `link eq_af ${$173}`, null));
      $1322 || ($1352 = createElement("div", $1342, `link-left eq_af ${$173}`, null));
      ($138 = $139 = 1, $1362 = $872[$137]) || ($138 = $139 = 0, $872[$137] = $1362 = createElement("img", $1352, `link-icon eq_af ${$173}`, null));
      $141 = state_default.config.search_engine_icon, $141 === $872[$140] || ($1362.src = $872[$140] = $141);
      ;
      ($1422 = $872[$1432]) || ($872[$1432] = $1422 = createElement("div", $1352, `eq-bg name eq_af ${$173}`, null));
      $1322 || $1422[$323]("Search ");
      $1442 = state_default.config.search_engine_hostname, $1442 === $872[$1462] && $1322 || ($872[$1452] = $1422[$323]($872[$1462] = $1442, 256, $872[$1452]));
      ;
      ;
      $1322 || ($1472 = createElement("div", $1342, `eq-bh link-right eq_af ${$173}`, null));
      ($148 = $872[$149]) || ($872[$149] = $148 = createElement("div", $1472, `frequency eq_af ${$173}`, null));
      $150 = state_default.config.search_engine_frequency, $150 === $872[$1522] && $1322 || ($872[$151] = $148[$323]($872[$1522] = $150, 384, $872[$151]));
      ;
      ;
      ;
    }
    ;
    $1210[$1532] = $1210[$323]($872, 0, $1210[$1532]);
    $1210[$1542]($1510);
    return self2.$input.focus();
  }
};
defineTag("app", AppComponent, {});
mount((($158 = $159 = 1, $1552 = $1562[$1572]) || ($158 = $159 = 0, $1552 = $1562[$1572] = $1552 = createComponent("app", null, null, null)), $158 || ($1552[$245] = $1562._), $158 || $1562.sym || !$1552.setup || $1552.setup($159), $1562.sym || $1552[$672]($159), $1552));
//__FOOT__

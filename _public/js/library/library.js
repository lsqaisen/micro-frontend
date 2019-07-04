(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('antd/es/page-header/style'), require('antd/es/page-header'), require('react'), require('antd/es/menu/style'), require('antd/es/menu'), require('react-dom'), require('antd/es/descriptions/style'), require('antd/es/descriptions'), require('antd/es/dropdown/style'), require('antd/es/dropdown'), require('antd/es/icon/style'), require('antd/es/icon'), require('antd/es/typography/style'), require('antd/es/typography'), require('antd/es/tag/style'), require('antd/es/tag'), require('antd/es/avatar/style'), require('antd/es/avatar'), require('antd/es/empty/style'), require('antd/es/empty'), require('antd/es/layout/style'), require('antd/es/layout'), require('antd/es/drawer/style'), require('antd/es/drawer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'antd/es/page-header/style', 'antd/es/page-header', 'react', 'antd/es/menu/style', 'antd/es/menu', 'react-dom', 'antd/es/descriptions/style', 'antd/es/descriptions', 'antd/es/dropdown/style', 'antd/es/dropdown', 'antd/es/icon/style', 'antd/es/icon', 'antd/es/typography/style', 'antd/es/typography', 'antd/es/tag/style', 'antd/es/tag', 'antd/es/avatar/style', 'antd/es/avatar', 'antd/es/empty/style', 'antd/es/empty', 'antd/es/layout/style', 'antd/es/layout', 'antd/es/drawer/style', 'antd/es/drawer'], factory) :
  (global = global || self, factory(global.library = {}, null, global.window.antd.PageHeader, global.window.React, null, global.window.antd.Menu, global.window.ReactDOM, null, global.window.antd.Descriptions, null, global.window.antd.Dropdown, null, global.window.antd.Icon, null, global.window.antd.Typography, null, global.window.antd.Tag, null, global.window.antd.Avatar, null, global.window.antd.Empty, null, global.window.antd.Layout, null, global.window.antd.Drawer));
}(this, function (exports, style, _PageHeader, React, style$1, _Menu, ReactDom, style$2, _Descriptions, style$3, _Dropdown, style$4, _Icon, style$5, _Typography, style$6, _Tag, style$7, _Avatar, style$8, _Empty, style$9, _Layout, style$a, _Drawer) { 'use strict';

  _PageHeader = _PageHeader && _PageHeader.hasOwnProperty('default') ? _PageHeader['default'] : _PageHeader;
  var React__default = 'default' in React ? React['default'] : React;
  _Menu = _Menu && _Menu.hasOwnProperty('default') ? _Menu['default'] : _Menu;
  var ReactDom__default = 'default' in ReactDom ? ReactDom['default'] : ReactDom;
  _Descriptions = _Descriptions && _Descriptions.hasOwnProperty('default') ? _Descriptions['default'] : _Descriptions;
  _Dropdown = _Dropdown && _Dropdown.hasOwnProperty('default') ? _Dropdown['default'] : _Dropdown;
  _Icon = _Icon && _Icon.hasOwnProperty('default') ? _Icon['default'] : _Icon;
  _Typography = _Typography && _Typography.hasOwnProperty('default') ? _Typography['default'] : _Typography;
  _Tag = _Tag && _Tag.hasOwnProperty('default') ? _Tag['default'] : _Tag;
  _Avatar = _Avatar && _Avatar.hasOwnProperty('default') ? _Avatar['default'] : _Avatar;
  _Empty = _Empty && _Empty.hasOwnProperty('default') ? _Empty['default'] : _Empty;
  _Layout = _Layout && _Layout.hasOwnProperty('default') ? _Layout['default'] : _Layout;
  _Drawer = _Drawer && _Drawer.hasOwnProperty('default') ? _Drawer['default'] : _Drawer;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".index_page__2hYZC {\n  color: #000;\n}\n";
  var styles = {"page":"index_page__2hYZC"};
  styleInject(css);

  var Page =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Page, _React$PureComponent);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            link = _this$props.link,
            className = _this$props.className,
            routes = _this$props.routes,
            children = _this$props.children,
            props = _objectWithoutProperties(_this$props, ["link", "className", "routes", "children"]);

        var Link = function Link(_ref) {
          var route = _ref.route;
          return link ? React.cloneElement(link, {
            href: route.path,
            to: route.path,
            children: route.breadcrumbName
          }) : React.createElement("span", null, route.breadcrumbName);
        };

        return React.createElement(_PageHeader, _extends({}, props, {
          className: "".concat(className || '', " ").concat(styles.page),
          breadcrumb: {
            routes: routes,
            itemRender: function itemRender(route, _, routes) {
              var last = routes.indexOf(route) === routes.length - 1;
              return last ? React.createElement("span", null, route.breadcrumbName) : React.createElement(Link, {
                route: route
              });
            }
          }
        }), children);
      }
    }]);

    return Page;
  }(React.PureComponent);

  Page.defaultProps = {
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览'
    }]
  };

  var css$1 = ".index_loader__2x5CX {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  z-index: 999999;\n}\n.index_box__3dZDE {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  background: #286cff;\n  -webkit-animation: index_animate__2PctY 0.5s linear infinite;\n          animation: index_animate__2PctY 0.5s linear infinite;\n  top: calc(50% - 25px);\n  left: calc(50% - 25px);\n  border-radius: 3px;\n}\n@-webkit-keyframes index_animate__2PctY {\n  17% {\n    border-bottom-right-radius: 3px;\n  }\n  25% {\n    -webkit-transform: translateY(9px) rotate(22.5deg);\n            transform: translateY(9px) rotate(22.5deg);\n  }\n  50% {\n    -webkit-transform: translateY(18px) scale(1, 0.9) rotate(45deg);\n            transform: translateY(18px) scale(1, 0.9) rotate(45deg);\n    border-bottom-right-radius: 40px;\n  }\n  75% {\n    -webkit-transform: translateY(9px) rotate(67.5deg);\n            transform: translateY(9px) rotate(67.5deg);\n  }\n  100% {\n    -webkit-transform: translateY(0) rotate(90deg);\n            transform: translateY(0) rotate(90deg);\n  }\n}\n@keyframes index_animate__2PctY {\n  17% {\n    border-bottom-right-radius: 3px;\n  }\n  25% {\n    -webkit-transform: translateY(9px) rotate(22.5deg);\n            transform: translateY(9px) rotate(22.5deg);\n  }\n  50% {\n    -webkit-transform: translateY(18px) scale(1, 0.9) rotate(45deg);\n            transform: translateY(18px) scale(1, 0.9) rotate(45deg);\n    border-bottom-right-radius: 40px;\n  }\n  75% {\n    -webkit-transform: translateY(9px) rotate(67.5deg);\n            transform: translateY(9px) rotate(67.5deg);\n  }\n  100% {\n    -webkit-transform: translateY(0) rotate(90deg);\n            transform: translateY(0) rotate(90deg);\n  }\n}\n.index_shadow__3ClVX {\n  width: 50px;\n  height: 5px;\n  background: #000;\n  opacity: 0.1;\n  position: absolute;\n  top: calc(50% + 33px);\n  left: calc(50% - 25px);\n  border-radius: 50%;\n  -webkit-animation: index_shadow__3ClVX 0.5s linear infinite;\n          animation: index_shadow__3ClVX 0.5s linear infinite;\n}\n@-webkit-keyframes index_shadow__3ClVX {\n  50% {\n    -webkit-transform: scale(1.2, 1);\n            transform: scale(1.2, 1);\n  }\n}\n@keyframes index_shadow__3ClVX {\n  50% {\n    -webkit-transform: scale(1.2, 1);\n            transform: scale(1.2, 1);\n  }\n}\n";
  var styles$1 = {"loader":"index_loader__2x5CX","box":"index_box__3dZDE","animate":"index_animate__2PctY","shadow":"index_shadow__3ClVX"};
  styleInject(css$1);

  var Loading = (function () {
    return React__default.createElement("div", {
      className: styles$1.loader
    }, React__default.createElement("div", {
      className: styles$1.shadow
    }), React__default.createElement("div", {
      className: styles$1.box
    }));
  });

  var css$2 = ".index_logoBox__1H0Hm {\n  max-width: 100%;\n  max-height: 48px;\n  text-align: center;\n}\n.index_logoBox__1H0Hm .index_logo__1YxaF {\n  overflow: hidden;\n  float: left;\n  line-height: 48px;\n  text-decoration: none;\n  height: 48px;\n  width: 100%;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.index_logoBox__1H0Hm .index_logo__1YxaF img {\n  vertical-align: middle;\n  margin-right: 16px;\n  width: 44px;\n}\n.index_logoBox__1H0Hm .index_logo__1YxaF img + img {\n  height: 22px;\n  margin-right: 0;\n  width: auto;\n  position: relative;\n  top: 1px;\n}\n";
  var styles$2 = {"logoBox":"index_logoBox__1H0Hm","logo":"index_logo__1YxaF"};
  styleInject(css$2);

  var Logo = function Logo(_ref) {
    var iconSrc = _ref.iconSrc,
        logoSrc = _ref.logoSrc;
    return React__default.createElement("div", {
      className: styles$2.logoBox
    }, React__default.createElement("a", {
      className: styles$2.logo,
      href: "#",
      onClick: function onClick(e) {
        return e.preventDefault();
      }
    }, React__default.createElement("img", {
      src: iconSrc,
      alt: "Icon"
    }), React__default.createElement("img", {
      src: logoSrc,
      alt: "Logo"
    })));
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.9' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var _library = true;

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var f$1 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$1
  };

  var f$2 = {}.propertyIsEnumerable;

  var _objectPie = {
  	f: f$2
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  // 19.1.2.1 Object.assign(target, source, ...)






  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  var assign = _core.Object.assign;

  var assign$1 = createCommonjsModule(function (module) {
  module.exports = { "default": assign, __esModule: true };
  });

  unwrapExports(assign$1);

  var _extends$1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _assign2 = _interopRequireDefault(assign$1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _assign2.default || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  });

  var _extends$2 = unwrapExports(_extends$1);

  var objectWithoutProperties = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports.default = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };
  });

  var _objectWithoutProperties$1 = unwrapExports(objectWithoutProperties);

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _redefine = _hide;

  var _iterators = {};

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$1 = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  // call something on iterator step with safe closing on error

  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$1 = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var _createProperty = function (object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
      // builtinTag case
      : ARG ? _cof(O)
      // ES3 arguments fallback
      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2]
      || it['@@iterator']
      || _iterators[_classof(it)];
  };

  var ITERATOR$3 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();
    riter['return'] = function () { SAFE_CLOSING = true; };
    // eslint-disable-next-line no-throw-literal
    Array.from(riter, function () { throw 2; });
  } catch (e) { /* empty */ }

  var _iterDetect = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR$3] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = _toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  });

  var from_1 = _core.Array.from;

  var from_1$1 = createCommonjsModule(function (module) {
  module.exports = { "default": from_1, __esModule: true };
  });

  unwrapExports(from_1$1);

  var toConsumableArray = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _from2 = _interopRequireDefault(from_1$1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return (0, _from2.default)(arr);
    }
  };
  });

  var _toConsumableArray = unwrapExports(toConsumableArray);

  var classCallCheck = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  });

  var _classCallCheck$1 = unwrapExports(classCallCheck);

  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

  var $Object = _core.Object;
  var defineProperty = function defineProperty(it, key, desc) {
    return $Object.defineProperty(it, key, desc);
  };

  var defineProperty$1 = createCommonjsModule(function (module) {
  module.exports = { "default": defineProperty, __esModule: true };
  });

  unwrapExports(defineProperty$1);

  var createClass = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _defineProperty2 = _interopRequireDefault(defineProperty$1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  });

  var _createClass$1 = unwrapExports(createClass);

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks('toStringTag');

  var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = _iterators.Array;
  }

  var f$3 = _wks;

  var _wksExt = {
  	f: f$3
  };

  var iterator = _wksExt.f('iterator');

  var iterator$1 = createCommonjsModule(function (module) {
  module.exports = { "default": iterator, __esModule: true };
  });

  unwrapExports(iterator$1);

  var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');


  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function (it) {
    setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {}          // weak collections IDs
    } });
  };
  var fastKey = function (it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
    // return object ID
    } return it[META].i;
  };
  var getWeak = function (it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
    // return hash weak collections IDs
    } return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
  });
  var _meta_1 = _meta.KEY;
  var _meta_2 = _meta.NEED;
  var _meta_3 = _meta.fastKey;
  var _meta_4 = _meta.getWeak;
  var _meta_5 = _meta.onFreeze;

  var defineProperty$2 = _objectDp.f;
  var _wksDefine = function (name) {
    var $Symbol = _core.Symbol || (_core.Symbol = {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
  };

  // all enumerable object keys, includes symbols



  var _enumKeys = function (it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
  	f: f$4
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN = _objectGopn.f;
  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
  	f: f$5
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  var _objectGopd = {
  	f: f$6
  };

  // ECMAScript 6 symbols shim





  var META = _meta.KEY;





















  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE$2 = 'prototype';
  var HIDDEN = _wks('_hidden');
  var TO_PRIMITIVE = _wks('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = _shared('symbol-registry');
  var AllSymbols = _shared('symbols');
  var OPSymbols = _shared('op-symbols');
  var ObjectProto$1 = Object[PROTOTYPE$2];
  var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
  var QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
      get: function () { return dP$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto$1, key);
    if (protoDesc) delete ObjectProto$1[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
  } : dP$1;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP$1(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto$1;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto$1) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

  _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return _has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () { setter = true; },
    useSimple: function () { setter = false; }
  });

  _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

  _export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return _objectGops.f(_toObject(it));
    }
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      $replacer = replacer = args[1];
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!_isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  _wksDefine('asyncIterator');

  _wksDefine('observable');

  var symbol = _core.Symbol;

  var symbol$1 = createCommonjsModule(function (module) {
  module.exports = { "default": symbol, __esModule: true };
  });

  unwrapExports(symbol$1);

  var _typeof_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _iterator2 = _interopRequireDefault(iterator$1);



  var _symbol2 = _interopRequireDefault(symbol$1);

  var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof(obj);
  } : function (obj) {
    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
  };
  });

  unwrapExports(_typeof_1);

  var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _typeof3 = _interopRequireDefault(_typeof_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
  };
  });

  var _possibleConstructorReturn$1 = unwrapExports(possibleConstructorReturn);

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function (O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) { buggy = true; }
        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
    check: check
  };

  // 19.1.3.19 Object.setPrototypeOf(O, proto)

  _export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

  var setPrototypeOf = _core.Object.setPrototypeOf;

  var setPrototypeOf$1 = createCommonjsModule(function (module) {
  module.exports = { "default": setPrototypeOf, __esModule: true };
  });

  unwrapExports(setPrototypeOf$1);

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  _export(_export.S, 'Object', { create: _objectCreate });

  var $Object$1 = _core.Object;
  var create = function create(P, D) {
    return $Object$1.create(P, D);
  };

  var create$1 = createCommonjsModule(function (module) {
  module.exports = { "default": create, __esModule: true };
  });

  unwrapExports(create$1);

  var inherits = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



  var _create2 = _interopRequireDefault(create$1);



  var _typeof3 = _interopRequireDefault(_typeof_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
    }

    subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
  };
  });

  var _inherits$1 = unwrapExports(inherits);

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
  60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
  exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
  exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
  exports.isSuspense=function(a){return t(a)===p};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
  var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_6 = reactIs_production_min.Element;
  var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_8 = reactIs_production_min.Fragment;
  var reactIs_production_min_9 = reactIs_production_min.Lazy;
  var reactIs_production_min_10 = reactIs_production_min.Memo;
  var reactIs_production_min_11 = reactIs_production_min.Portal;
  var reactIs_production_min_12 = reactIs_production_min.Profiler;
  var reactIs_production_min_13 = reactIs_production_min.StrictMode;
  var reactIs_production_min_14 = reactIs_production_min.Suspense;
  var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
  var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_20 = reactIs_production_min.isElement;
  var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_22 = reactIs_production_min.isFragment;
  var reactIs_production_min_23 = reactIs_production_min.isLazy;
  var reactIs_production_min_24 = reactIs_production_min.isMemo;
  var reactIs_production_min_25 = reactIs_production_min.isPortal;
  var reactIs_production_min_26 = reactIs_production_min.isProfiler;
  var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
  var reactIs_production_min_28 = reactIs_production_min.isSuspense;

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  /**
   * Forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   *
   * Only change is we use console.warn instead of console.error,
   * and do nothing when 'console' is not supported.
   * This really simplifies the code.
   * ---
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var lowPriorityWarning = function () {};

  {
    var printWarning = function (format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.warn(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    lowPriorityWarning = function (condition, format) {
      if (format === undefined) {
        throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
      }
      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  var lowPriorityWarning$1 = lowPriorityWarning;

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_LAZY_TYPE:
        case REACT_MEMO_TYPE:
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  // AsyncMode is deprecated along with isAsyncMode
  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;

  var hasWarnedAboutDeprecatedIsAsyncMode = false;

  // AsyncMode should be deprecated
  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true;
        lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }
    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ConcurrentMode;
  var reactIs_development_4 = reactIs_development.ContextConsumer;
  var reactIs_development_5 = reactIs_development.ContextProvider;
  var reactIs_development_6 = reactIs_development.Element;
  var reactIs_development_7 = reactIs_development.ForwardRef;
  var reactIs_development_8 = reactIs_development.Fragment;
  var reactIs_development_9 = reactIs_development.Lazy;
  var reactIs_development_10 = reactIs_development.Memo;
  var reactIs_development_11 = reactIs_development.Portal;
  var reactIs_development_12 = reactIs_development.Profiler;
  var reactIs_development_13 = reactIs_development.StrictMode;
  var reactIs_development_14 = reactIs_development.Suspense;
  var reactIs_development_15 = reactIs_development.isValidElementType;
  var reactIs_development_16 = reactIs_development.isAsyncMode;
  var reactIs_development_17 = reactIs_development.isConcurrentMode;
  var reactIs_development_18 = reactIs_development.isContextConsumer;
  var reactIs_development_19 = reactIs_development.isContextProvider;
  var reactIs_development_20 = reactIs_development.isElement;
  var reactIs_development_21 = reactIs_development.isForwardRef;
  var reactIs_development_22 = reactIs_development.isFragment;
  var reactIs_development_23 = reactIs_development.isLazy;
  var reactIs_development_24 = reactIs_development.isMemo;
  var reactIs_development_25 = reactIs_development.isPortal;
  var reactIs_development_26 = reactIs_development.isProfiler;
  var reactIs_development_27 = reactIs_development.isStrictMode;
  var reactIs_development_28 = reactIs_development.isSuspense;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty$1.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;

  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!reactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning$1(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning$1('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has$1(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
  });

  var windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement);

  var transformOrFilter = {
    transform: 1,
    '-ms-transform': 1,
    '-moz-transform': 1,
    '-webkit-transform': 1,
    '-o-transform': 1,
    filter: 1,
    '-webkit-filter': 1
  };

  var styleValueToArray = {
    margin: 1,
    padding: 1,
    borderWidth: 1,
    borderRadius: 1
  };

  function toArrayChildren(children) {
    var ret = [];
    React__default.Children.forEach(children, function (c) {
      ret.push(c);
    });
    return ret;
  }

  function dataToArray(vars) {
    if (!vars && vars !== 0) {
      return [];
    }
    if (Array.isArray(vars)) {
      return vars;
    }
    return [vars];
  }

  function deepEql(a, b) {
    if (!a || !b) {
      return false;
    }
    var $a = Object.keys(a);
    var $b = Object.keys(b);
    if ($a.length && $b.length && $a.length === $b.length) {
      return !$a.some(function (key) {
        var aa = a[key];
        var bb = b[key];
        if (Array.isArray(aa) && Array.isArray(bb)) {
          aa = aa.join();
          bb = bb.join();
        }
        return aa !== bb;
      });
    }
    return false;
  }

  function objectEqual(obj1, obj2) {
    if (obj1 === obj2 || deepEql(obj1, obj2)) {
      return true;
    }
    if (!obj1 || !obj2) {
      return false;
    }
    // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
    var equalBool = true;
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (var i = 0; i < obj1.length; i++) {
        var currentObj = obj1[i];
        var nextObj = obj2[i];
        for (var p in currentObj) {
          // eslint-disable-line no-restricted-syntax
          if (currentObj[p] !== nextObj[p]) {
            if (typeof currentObj[p] === 'object' && typeof nextObj[p] === 'object') {
              equalBool = objectEqual(currentObj[p], nextObj[p]);
            } else if (typeof currentObj[p] === 'function' && typeof nextObj[p] === 'function') {
              if (currentObj[p].name !== nextObj[p].name) {
                equalBool = false;
              }
            } else {
              equalBool = false;
            }
            if (!equalBool) {
              return false;
            }
          }
        }
      }
    }

    var setEqualBool = function setEqualBool(objA, objB) {
      Object.keys(objA).forEach(function (key) {
        // 如果前面有参数匹配不相同则直接返回；
        if (!equalBool) {
          return;
        }
        if (!(key in objB)) {
          equalBool = false;
        }

        if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
          equalBool = objectEqual(objA[key], objB[key]);
        } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
          if (objA[key].name !== objB[key].name) {
            equalBool = false;
          }
        } else if (objA[key] !== objB[key]) {
          equalBool = false;
        }
      });
    };

    setEqualBool(obj1, obj2);
    setEqualBool(obj2, obj1);
    return equalBool;
  }

  function findChildInChildrenByKey(children, key) {
    var ret = null;
    if (children) {
      children.forEach(function (c) {
        if (ret || !c) {
          return;
        }
        if (c.key === key) {
          ret = c;
        }
      });
    }
    return ret;
  }

  function mergeChildren(prev, next) {
    var ret = [];
    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    var nextChildrenPending = {};
    var pendingChildren = [];
    var followChildrenKey = void 0;
    prev.forEach(function (c) {
      if (!c) {
        return;
      }
      if (findChildInChildrenByKey(next, c.key)) {
        if (pendingChildren.length) {
          nextChildrenPending[c.key] = pendingChildren;
          pendingChildren = [];
        }
        followChildrenKey = c.key;
      } else if (c.key) {
        pendingChildren.push(c);
      }
    });
    if (!followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }

    next.forEach(function (c) {
      if (!c) {
        return;
      }
      if (nextChildrenPending.hasOwnProperty(c.key)) {
        // eslint-disable-line no-prototype-builtins
        ret = ret.concat(nextChildrenPending[c.key]);
      }
      ret.push(c);
      if (c.key === followChildrenKey) {
        ret = ret.concat(pendingChildren);
      }
    });

    return ret;
  }

  function transformArguments(arg, key, i) {
    var result = void 0;
    if (typeof arg === 'function') {
      result = arg({
        key: key,
        index: i
      });
    } else {
      result = arg;
    }
    return result;
  }

  function getChildrenFromProps(props) {
    return props && props.children;
  }

  function startConvertToEndUnit(target, computedStyle, style, num, unit, dataUnit, fixed, isOriginWidth) {
    if (windowIsUndefined) {
      return num;
    }
    var horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
    horiz = style === 'padding' || style === 'marign' ? true : horiz;
    var t = style.indexOf('border') !== -1 || style.indexOf('translate') !== -1 || style === 'transformOrigin' ? target : target.parentNode || document.body;
    t = fixed ? document.body : t;
    var pix = void 0;
    var htmlComputedStyle = void 0;
    // transform 在 safari 下会留着单位，chrome 下会全部转换成 px;
    switch (unit) {
      case '%':
        pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
        break;
      case 'vw':
        pix = parseFloat(num) * document.body.clientWidth / 100;
        break;
      case 'vh':
        pix = parseFloat(num) * document.body.clientHeight / 100;
        break;
      case 'em':
        pix = parseFloat(num) * parseFloat(computedStyle.fontSize);
        break;
      case 'rem':
        {
          htmlComputedStyle = window.getComputedStyle(document.getElementsByTagName('html')[0]);
          pix = parseFloat(num) * parseFloat(htmlComputedStyle.fontSize);
          break;
        }
      default:
        pix = parseFloat(num);
        break;
    }
    switch (dataUnit) {
      case '%':
        pix = pix ? pix * 100 / (horiz ? t.clientWidth : t.clientHeight) : 0;
        break;
      case 'vw':
        pix = parseFloat(num) / document.body.clientWidth * 100;
        break;
      case 'vh':
        pix = parseFloat(num) / document.body.clientHeight * 100;
        break;
      case 'em':
        pix = parseFloat(num) / parseFloat(computedStyle.fontSize);
        break;
      case 'rem':
        {
          htmlComputedStyle = htmlComputedStyle || window.getComputedStyle(document.getElementsByTagName('html')[0]);
          pix = parseFloat(num) / parseFloat(htmlComputedStyle.fontSize);
          break;
        }
      default:
        break;
    }
    return pix;
  }

  function parsePath(path) {
    if (typeof path === 'string') {
      if (path.charAt(0).match(/m/i)) {
        var domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        domPath.setAttributeNS(null, 'd', path);
        return domPath;
      }
      return document.querySelector(path);
    } else if (path.style) {
      return path;
    }
    throw new Error('Error while parsing the path');
  }

  function getTransformValue(t) {
    if (typeof t === 'string') {
      return t;
    }
    var perspective = t.perspective;
    var angle = t.rotate;
    var rotateX = t.rotateX;
    var rotateY = t.rotateY;
    var sx = t.scaleX;
    var sy = t.scaleY;
    var sz = t.scaleZ;
    var skx = t.skewX;
    var sky = t.skewY;
    var translateX = typeof t.translateX === 'string' ? t.translateX : t.translateX + 'px';
    var translateY = typeof t.translateY === 'string' ? t.translateY : t.translateY + 'px';
    var translateZ = typeof t.translateZ === 'string' ? t.translateZ : t.translateZ + 'px';
    var sk = skx || sky ? 'skew(' + skx + 'deg,' + sky + 'deg)' : '';
    var an = angle ? 'rotate(' + angle + 'deg)' : '';
    var ss = sx !== 1 || sy !== 1 || sz !== 1 ? 'scale3d(' + sx + ',' + sy + ',' + sz + ')' : '';
    var rX = rotateX ? 'rotateX(' + rotateX + 'deg)' : '';
    var rY = rotateY ? 'rotateY(' + rotateY + 'deg)' : '';
    var per = perspective ? 'perspective(' + perspective + 'px)' : '';
    var defautlTranslate = ss || an || rX || rY || sk ? '' : 'translate(0px, 0px)';
    var translate = t.translateZ ? 'translate3d(' + translateX + ',' + translateY + ',' + translateZ + ')' : (t.translateX || t.translateY) && 'translate(' + translateX + ',' + translateY + ')' || defautlTranslate;
    return (per + ' ' + translate + ' ' + ss + ' ' + an + ' ' + rX + ' ' + rY + ' ' + sk).trim();
  }

  var main = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toCssLowerCase = toCssLowerCase;
  exports.toStyleUpperCase = toStyleUpperCase;
  exports.toFixed = toFixed;
  exports.createMatrix = createMatrix;
  exports.checkStyleName = checkStyleName;
  exports.getGsapType = getGsapType;
  exports.parseColor = parseColor;
  exports.parseShadow = parseShadow;
  exports.getColor = getColor;
  exports.isTransform = isTransform;
  exports.isConvert = isConvert;
  exports.splitFilterToObject = splitFilterToObject;
  exports.getMatrix = getMatrix;
  exports.getTransform = getTransform;
  exports.stylesToCss = stylesToCss;
  exports.getUnit = getUnit;
  exports.getValues = getValues;
  exports.findStyleByName = findStyleByName;
  exports.mergeStyle = mergeStyle;
  var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }

  Object.keys(isUnitlessNumber).forEach(function (prop) {
    prefixes.forEach(function (prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });

  var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

  var IE = function () {
    if (typeof document === 'undefined') {
      return false;
    }
    if (navigator && (navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 9.0") > 0)) {
      return true;
    }
    return false;
  }();

  var rnd = 100000;

  var colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  };
  var _hue = function _hue(hh, m1, m2) {
    var h = hh > 1 ? hh - 1 : hh;
    h = hh < 0 ? hh + 1 : h;
    var a = h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1;
    var b = h < 0.5 ? m2 : a;
    var c = h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : b;
    return c * 255 + 0.5 | 0;
  };
  var DEG2RAD = Math.PI / 180;
  var RAD2DEG = 180 / Math.PI;

  var $cssList = {
    _lists: {
      transformsBase: ['translate', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ', 'rotate'],
      transforms3D: ['translate3d', 'translateZ', 'scaleZ', 'rotateX', 'rotateY', 'perspective']
    },
    transformGroup: { translate: 1, translate3d: 1, scale: 1, scale3d: 1, rotate: 1, rotate3d: 1, skew: 1 },
    filter: ['grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur'],
    filterConvert: { grayScale: 'grayscale', hueRotate: 'hue-rotate' }
  };
  $cssList._lists.transformsBase = !IE ? $cssList._lists.transformsBase.concat($cssList._lists.transforms3D) : $cssList._lists.transformsBase;

  var cssList = exports.cssList = $cssList;

  function toCssLowerCase(d) {
    return d.replace(/[A-Z]/, function ($1) {
      return '-' + $1.toLocaleLowerCase();
    });
  }

  function toStyleUpperCase(d) {
    return d.replace(/-(.?)/g, function ($1) {
      return $1.replace('-', '').toLocaleUpperCase();
    });
  }

  function toFixed(num, length) {
    var _rnd = length ? Math.pow(10, length) : rnd;
    var n = num | 0;
    var dec = num - n;
    var fixed = num;
    if (dec) {
      var r = (dec * _rnd + (num < 0 ? -0.5 : 0.5) | 0) / _rnd;
      var t = r | 0;
      var str = r.toString();
      var decStr = str.split('.')[1] || '';
      fixed = '' + (num < 0 && !(n + t) ? '-' : '') + (n + t) + '.' + decStr;
    }
    return parseFloat(fixed);
  }

  function createMatrix(style) {
    if (typeof document === 'undefined') {
      return null;
    }
    var matrixs = ['WebKitCSS', 'MozCSS', 'DOM', 'MsCSS', 'MSCSS', 'OCSS', 'CSS'].filter(function (key) {
      return key + 'Matrix' in window;
    });
    if (matrixs.length) {
      return new window[matrixs[0] + 'Matrix'](style);
    }
    console.warn('Browsers do not support matrix.');
    return '';
  }

  function checkStyleName(p) {
    if (typeof document === 'undefined') {
      return null;
    }
    var a = ['O', 'Moz', 'ms', 'Ms', 'Webkit'];
    if (p !== 'filter' && p in document.body.style) {
      return p;
    }
    var _p = p.charAt(0).toUpperCase() + p.substr(1);
    var prefixCss = a.filter(function (key) {
      return '' + key + _p in document.body.style;
    });
    return prefixCss[0] ? '' + prefixCss[0] + _p : null;
  }

  function getGsapType(_p) {
    var p = _p;
    p = p === 'x' ? 'translateX' : p;
    p = p === 'y' ? 'translateY' : p;
    p = p === 'z' ? 'translateZ' : p;
    // p = p === 'r' ? 'rotate' : p;
    return p;
  }

  function parseColor(_v) {
    var a = void 0;
    var r = void 0;
    var g = void 0;
    var b = void 0;
    var h = void 0;
    var s = void 0;
    var l = void 0;
    var v = _v;
    var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g;
    if (!v) {
      a = colorLookup.black;
    } else if (typeof v === 'number') {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ',') {
        v = v.substr(0, v.length - 1);
      }
      if (colorLookup[v]) {
        a = colorLookup[v];
      } else if (v.charAt(0) === '#') {
        // is #FFF
        if (v.length === 4) {
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = '#' + r + r + g + g + b + b;
        }
        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === 'hsl') {
        a = v.match(_numExp);
        h = Number(a[0]) % 360 / 360;
        s = Number(a[1]) / 100;
        l = Number(a[2]) / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        if (a.length > 3) {
          a[3] = Number(a[3]);
        }
        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else {
        a = v.match(_numExp) || colorLookup.transparent;
      }
      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);

      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }
    return a;
  }

  function parseShadow(v) {
    if (!v) {
      return [0, 0, 0, 0, 0, 0, 0];
    }
    var inset = void 0;
    if (v.indexOf('rgb') >= 0) {
      var t = v.match(/rgb+(?:a)?\((.*)\)/);
      var s = v.replace(t[0], '').trim().split(/\s+/);
      inset = s.indexOf('inset');
      if (inset >= 0) {
        s.splice(inset, 1);
      }
      var c = t[1].replace(/\s+/g, '').split(',');
      if (c.length === 3) {
        c.push(1);
      }
      return s.concat(c, inset >= 0 ? ['inset'] : []);
    }
    var vArr = v.split(/\s+/);
    inset = vArr.indexOf('inset');
    if (inset >= 0) {
      vArr.splice(inset, 1);
    }
    var color = parseColor(vArr[vArr.length - 1]);
    color[3] = typeof color[3] === 'number' ? color[3] : 1;
    vArr = vArr.splice(0, vArr.length - 1);
    return vArr.concat(color, inset >= 0 ? ['inset'] : []);
  }

  function getColor(v) {
    var rgba = v.length === 4 ? 'rgba' : 'rgb';
    var _vars = v.map(function (d, i) {
      return i < 3 ? Math.round(d) : d;
    });
    return rgba + '(' + _vars.join(',') + ')';
  }

  function isTransform(p) {
    return cssList._lists.transformsBase.indexOf(p) >= 0 ? 'transform' : p;
  }

  function isConvert(p) {
    var cssName = isTransform(p);
    return cssList.filter.indexOf(cssName) >= 0 ? 'filter' : cssName;
  }

  function splitFilterToObject(data) {
    if (data === 'none' || !data || data === '') {
      return null;
    }
    var filter = data.replace(' ', '').split(')').filter(function (item) {
      return item;
    });
    var startData = {};
    filter.forEach(function (item) {
      var dataArr = item.split('(');
      startData[dataArr[0]] = dataArr[1];
    });
    return startData;
  }

  function getMatrix(t) {
    var arr = t.match(/(?:\-|\b)[\d\-\.e]+\b/gi);
    var m = {};
    if (arr.length === 6) {
      m.m11 = parseFloat(arr[0]);
      m.m12 = parseFloat(arr[1]);
      m.m13 = 0;
      m.m14 = 0;
      m.m21 = parseFloat(arr[2]);
      m.m22 = parseFloat(arr[3]);
      m.m23 = 0;
      m.m24 = 0;
      m.m31 = 0;
      m.m32 = 0;
      m.m33 = 1;
      m.m34 = 0;
      m.m41 = parseFloat(arr[4]);
      m.m42 = parseFloat(arr[5]);
      m.m43 = 0;
      m.m44 = 0;
    } else {
      arr.forEach(function (item, i) {
        var ii = i % 4 + 1;
        var j = Math.floor(i / 4) + 1;
        m['m' + j + ii] = parseFloat(item);
      });
    }
    return m;
  }

  function transformNoMatrix(transform) {
    var tm = {};
    tm.translateX = 0;
    tm.translateY = 0;
    tm.translateZ = 0;
    tm.rotate = 0;
    tm.rotateX = 0;
    tm.rotateY = 0;
    tm.scaleX = 1;
    tm.scaleY = 1;
    tm.scaleZ = 1;
    tm.skewX = 0;
    tm.skewY = 0;
    tm.perspective = 0;
    (transform.trim().match(/(\w+)\([^\)]+\)/ig) || []).forEach(function (str) {
      var strArray = str.split('(');
      var key = strArray[0].trim();
      var value = strArray[1].replace(')', '').trim();
      if (value.match(/%|em|rem/ig)) {
        console.warn('value(' + value + ') must be absolute, not relative, has been converted to absolute.');
      }
      value = value.replace(/px|deg|\)/ig, '');
      if (cssList.transformGroup[key] && key !== 'rotate') {
        value = value.split(',').map(function (num) {
          return parseFloat(num);
        });
        if (key === 'scale3d' || key === 'translate3d') {
          ['X', 'Y', 'Z'].forEach(function (s, i) {
            var $key = key.substring(0, key.length - 2);
            tm['' + $key + s] = value[i] || tm['' + $key + s];
          });
        } else if (key === 'rotate3d') {
          tm.rotateX = value[0] && value[3] || tm.rotateX;
          tm.rotateY = value[1] && value[3] || tm.rotateY;
          tm.rotate = value[2] && value[3] || tm.rotate;
        } else {
          ['X', 'Y'].forEach(function (s, i) {
            tm['' + key + s] = value[i] || tm['' + key + s];
          });
        }
      } else {
        if (key === 'rotateZ') {
          tm.rotate = parseFloat(value) || tm.rotate;
        } else {
          tm[key] = parseFloat(value) || tm[key];
        }
      }
    });
    return tm;
  }

  function getTransform(transform) {
    var _transform = !transform || transform === 'none' || transform === '' ? 'matrix(1, 0, 0, 1, 0, 0)' : transform;
    if (!_transform.match('matrix')) {
      return transformNoMatrix(transform);
    }
    var m = getMatrix(_transform);
    var m11 = m.m11;
    var m12 = m.m12;
    var m13 = m.m13;
    var m14 = m.m14;
    var m21 = m.m21;
    var m22 = m.m22;
    var m23 = m.m23;
    var m24 = m.m24;
    var m31 = m.m31;
    var m32 = m.m32;
    var m33 = m.m33;
    var m34 = m.m34;
    var m43 = m.m43;
    var t1 = void 0;
    var t2 = void 0;
    var t3 = void 0;
    var tm = {};
    var angle = Math.atan2(m23, m33);
    var skewX = Math.tan(m21);
    var skewY = Math.tan(m12);
    var cos = void 0;
    var sin = void 0;
    // rotateX
    tm.rotateX = toFixed(angle * RAD2DEG) || 0;
    if (angle) {
      cos = Math.cos(-angle);
      sin = Math.sin(-angle);
      t1 = m21 * cos + m31 * sin;
      t2 = m22 * cos + m32 * sin;
      t3 = m23 * cos + m33 * sin;
      m31 = m21 * -sin + m31 * cos;
      m32 = m22 * -sin + m32 * cos;
      m33 = m23 * -sin + m33 * cos;
      m34 = m24 * -sin + m34 * cos;
      m21 = t1;
      m22 = t2;
      m23 = t3;
    }
    // rotateY
    angle = Math.atan2(-m13, m33);
    tm.rotateY = toFixed(angle * RAD2DEG) || 0;
    if (angle) {
      cos = Math.cos(-angle);
      sin = Math.sin(-angle);
      t1 = m11 * cos - m31 * sin;
      t2 = m12 * cos - m32 * sin;
      t3 = m13 * cos - m33 * sin;
      m32 = m12 * sin + m32 * cos;
      m33 = m13 * sin + m33 * cos;
      m34 = m14 * sin + m34 * cos;
      m11 = t1;
      m12 = t2;
      m13 = t3;
    }
    // rotateZ
    angle = Math.atan2(m12, m11);
    tm.rotate = toFixed(angle * RAD2DEG) || 0;
    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      t1 = m11 * cos + m12 * sin;
      t2 = m21 * cos + m22 * sin;
      t3 = m31 * cos + m32 * sin;
      m12 = m12 * cos - m11 * sin;
      m22 = m22 * cos - m21 * sin;
      m32 = m32 * cos - m31 * sin;
      m11 = t1;
      m21 = t2;
      m31 = t3;
    }

    if (tm.rotateX && Math.abs(tm.rotateX) + Math.abs(tm.rotate) > 359.9) {
      tm.rotateX = tm.rotate = 0;
      tm.rotateY = 180 - tm.rotateY || 0;
    }

    tm.scaleX = toFixed(Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13));
    tm.scaleY = toFixed(Math.sqrt(m22 * m22 + m23 * m23));
    tm.scaleZ = toFixed(Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33));
    // 不管 skewX skewY了；
    tm.skewX = skewX === -skewY ? 0 : skewX;
    tm.skewY = skewY === -skewX ? 0 : skewY;
    tm.perspective = m34 ? 1 / (m34 < 0 ? -m34 : m34) : 0;
    tm.translateX = m.m41;
    tm.translateY = m.m42;
    tm.translateZ = m43;
    return tm;
  }

  function stylesToCss(key, value) {
    var _value = void 0;
    if (!isUnitlessNumber[key] && typeof value === 'number') {
      _value = ' ' + value + 'px';
    } else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
      _value = '\'' + value.replace(/'/g, "\\'") + '\'';
    }
    return _value || value;
  }

  function getUnit(p, v) {
    var currentUnit = v && v.toString().replace(/[^a-z|%]/ig, '');
    var unit = '';
    if (p.indexOf('translate') >= 0 || p.indexOf('perspective') >= 0 || p.indexOf('blur') >= 0) {
      unit = 'px';
    } else if (p.indexOf('skew') >= 0 || p.indexOf('rotate') >= 0) {
      unit = 'deg';
    }
    return currentUnit || unit;
  }

  function getValues(p, d, u) {
    return p + '(' + d + (u || '') + ')';
  }

  function findStyleByName(cssArray, name) {
    var ret = null;
    if (cssArray) {
      cssArray.forEach(function (_cname) {
        if (ret) {
          return;
        }
        var cName = _cname.split('(')[0];
        var a = cName in cssList.transformGroup && name.substring(0, name.length - 1).indexOf(cName) >= 0;
        var b = name in cssList.transformGroup && cName.substring(0, cName.length - 1).indexOf(name) >= 0;
        var c = cName in cssList.transformGroup && name in cssList.transformGroup && (cName.substring(0, cName.length - 2) === name || name.substring(0, name.length - 2) === cName);
        if (cName === name || a || b || c) {
          ret = _cname;
        }
      });
    }
    return ret;
  }

  function mergeStyle(current, change) {
    if (!current || current === '') {
      return change;
    }
    if (!change || change === '') {
      return current;
    }
    var _current = current.replace(/\s/g, '').split(')').filter(function (item) {
      return item !== '' && item;
    }).map(function (item) {
      return item + ')';
    });
    var _change = change.replace(/\s/g, '').split(')').filter(function (item) {
      return item !== '' && item;
    });
    _change.forEach(function (changeOnly) {
      var changeArr = changeOnly.split('(');
      var changeName = changeArr[0];
      var currentSame = findStyleByName(_current, changeName);
      if (!currentSame) {
        _current.push(changeOnly + ')');
      } else {
        var index = _current.indexOf(currentSame);
        _current[index] = changeOnly + ')';
      }
    });
    _current.forEach(function (item, i) {
      if (item.indexOf('perspective') >= 0 && i) {
        _current.splice(i, 1);
        _current.unshift(item);
      }
    });
    return _current.join(' ').trim();
  }
  });

  unwrapExports(main);
  var main_1 = main.toCssLowerCase;
  var main_2 = main.toStyleUpperCase;
  var main_3 = main.toFixed;
  var main_4 = main.createMatrix;
  var main_5 = main.checkStyleName;
  var main_6 = main.getGsapType;
  var main_7 = main.parseColor;
  var main_8 = main.parseShadow;
  var main_9 = main.getColor;
  var main_10 = main.isTransform;
  var main_11 = main.isConvert;
  var main_12 = main.splitFilterToObject;
  var main_13 = main.getMatrix;
  var main_14 = main.getTransform;
  var main_15 = main.stylesToCss;
  var main_16 = main.getUnit;
  var main_17 = main.getValues;
  var main_18 = main.findStyleByName;
  var main_19 = main.mergeStyle;
  var main_20 = main.cssList;

  // t: current time, b: beginning value, _c: final value, d: total duration
  var tweenFunctions = {
    linear: function(t, b, _c, d) {
      var c = _c - b;
      return c * t / d + b;
    },
    easeInQuad: function(t, b, _c, d) {
      var c = _c - b;
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function(t, b, _c, d) {
      var c = _c - b;
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    },
    easeInCubic: function(t, b, _c, d) {
      var c = _c - b;
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(t, b, _c, d) {
      var c = _c - b;
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    easeInQuart: function(t, b, _c, d) {
      var c = _c - b;
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(t, b, _c, d) {
      var c = _c - b;
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      } else {
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    easeInQuint: function(t, b, _c, d) {
      var c = _c - b;
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(t, b, _c, d) {
      var c = _c - b;
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    easeInSine: function(t, b, _c, d) {
      var c = _c - b;
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(t, b, _c, d) {
      var c = _c - b;
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(t, b, _c, d) {
      var c = _c - b;
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(t, b, _c, d) {
      var c = _c - b;
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function(t, b, _c, d) {
      var c = _c - b;
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function(t, b, _c, d) {
      var c = _c - b;
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      } else {
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    easeInCirc: function(t, b, _c, d) {
      var c = _c - b;
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(t, b, _c, d) {
      var c = _c - b;
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      } else {
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    easeInElastic: function(t, b, _c, d) {
      var c = _c - b;
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) {
        return b;
      } else if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(t, b, _c, d) {
      var c = _c - b;
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) {
        return b;
      } else if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(t, b, _c, d) {
      var c = _c - b;
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) {
        return b;
      } else if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      } else {
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
      }
    },
    easeInBack: function(t, b, _c, d, s) {
      var c = _c - b;
      if (s === void 0) {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(t, b, _c, d, s) {
      var c = _c - b;
      if (s === void 0) {
        s = 1.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(t, b, _c, d, s) {
      var c = _c - b;
      if (s === void 0) {
        s = 1.70158;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      } else {
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      }
    },
    easeInBounce: function(t, b, _c, d) {
      var c = _c - b;
      var v;
      v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
      return c - v + b;
    },
    easeOutBounce: function(t, b, _c, d) {
      var c = _c - b;
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    easeInOutBounce: function(t, b, _c, d) {
      var c = _c - b;
      var v;
      if (t < d / 2) {
        v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
        return v * 0.5 + b;
      } else {
        v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
        return v * 0.5 + c * 0.5 + b;
      }
    }
  };

  var tweenFunctions_1 = tweenFunctions;

  tweenFunctions_1.path = function (_path, _param) {
    var param = _param || {};
    if (windowIsUndefined) {
      return 'linear';
    }
    var pathNode = parsePath(_path);
    var pathLength = pathNode.getTotalLength();
    var rect = param.rect || 100; // path 的大小，100 * 100，
    var lengthPixel = param.lengthPixel || 200; // 线上取点像素，默认分为 200 段。。
    var points = [];
    for (var i = 0; i < lengthPixel - 1; i++) {
      points.push(pathNode.getPointAtLength(pathLength / (lengthPixel - 1) * i));
    }
    points.push(pathNode.getPointAtLength(lengthPixel));
    return function path(t, b, _c, d) {
      var p = tweenFunctions_1.linear(t, b, _c, d);
      var timePointX = rect * p; // X 轴的百分比;
      // 取出 x 轴百分比上的点;
      var point = points.filter(function (item) {
        return item.x >= timePointX;
      })[0] || pathNode.getPointAtLength(p * pathLength);
      return 1 - point.y / rect;
    };
  };

  /* eslint-disable func-names */
  var Plugins = function Plugins() {};
  var p = Plugins.prototype;
  p.push = function (plugin) {
    this[plugin.prototype.name] = plugin;
  };
  var _plugins = new Plugins();

  var StylePlugin = function StylePlugin(target, vars, type) {
    this.target = target;
    this.vars = vars;
    this.type = type;
    this.propsData = {};
    this.setDefaultData();
  };
  StylePlugin.prototype = {
    name: 'style'
  };
  var p$1 = StylePlugin.prototype;
  p$1.getTweenData = function (key, $vars) {
    var data = {
      data: {},
      dataType: {},
      dataUnit: {},
      dataCount: {},
      dataSplitStr: {}
    };
    var vars = $vars;
    if (styleValueToArray[key]) {
      vars = vars.toString().split(' ');
      vars = vars.map(function (c) {
        return typeof $vars === 'number' ? c + 'px' : c;
      });
      vars[1] = vars[1] || vars[0];
      vars[2] = vars[2] || vars[0];
      vars[3] = vars[3] || vars[1] || vars[0];
      vars = vars.join(' ');
    }
    if (key.match(/colo|fill|storker/i)) {
      data.data[key] = main_7(vars);
      data.dataType[key] = 'color';
    } else if (key === 'strokeDasharray') {
      data.data[key] = vars.split(',');
      data.dataType[key] = 'strokeDasharray';
    } else if (key.match(/shadow/i)) {
      data.data[key] = main_8(vars);
      data.dataType[key] = 'shadow';
    } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
      data.data[key] = vars.split(/[\s|,]/);
      data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '').replace(/\s+/g, ' ');
      data.dataType[key] = 'string';
    } else {
      data.data[key] = vars;
      data.dataType[key] = 'other';
    }
    if (Array.isArray(data.data[key])) {
      data.dataUnit[key] = data.data[key].map(function (_item) {
        return _item.toString().replace(/[^a-z|%]/g, '');
      });
      data.dataCount[key] = data.data[key].map(function (_item) {
        return _item.toString().replace(/[^+|=|-]/g, '');
      });

      data.data[key] = data.data[key].map(function (_item) {
        return !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item);
      });
    } else {
      data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
      data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
      var d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
      data.data[key] = !d && d !== 0 ? data.data[key] : d;
    }
    return data;
  };
  p$1.setDefaultData = function () {
    var _this = this;

    this.propsData.data = {};
    this.propsData.dataType = {};
    this.propsData.dataUnit = {};
    this.propsData.dataCount = {};
    this.propsData.dataSplitStr = {};
    Object.keys(this.vars).forEach(function (_key) {
      if (_key in _plugins) {
        _this.propsData.data[_key] = new _plugins[_key](_this.target, _this.vars[_key]);
        return;
      }
      var key = main_6(_key);
      var _data = _this.getTweenData(key, _this.vars[_key]);
      _this.propsData.data[key] = _data.data[key];
      _this.propsData.dataType[key] = _data.dataType[key];
      _this.propsData.dataUnit[key] = _data.dataUnit[key];
      _this.propsData.dataCount[key] = _data.dataCount[key];
      if (_data.dataSplitStr[key]) {
        _this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
      }
    });
  };
  p$1.convertToMarksArray = function (computedStyle, unit, key, data, i) {
    var startUnit = data.toString().replace(/[^a-z|%]/g, '');
    var endUnit = unit[i];
    if (startUnit === endUnit) {
      return parseFloat(data);
    } else if (!parseFloat(data) && parseFloat(data) !== 0) {
      return data;
    }
    return startConvertToEndUnit(this.target, computedStyle, key, data, startUnit, endUnit, null, key === 'transformOrigin' && !i);
  };
  p$1.getAnimStart = function (computedStyle, tween, isSvg) {
    var _this2 = this;

    var style = {};
    var tweenStyle = tween.style || {};
    var transform = void 0;
    Object.keys(this.propsData.data).forEach(function (key) {
      var cssName = main_11(key);
      var startData = tweenStyle[cssName] || computedStyle[cssName];
      var fixed = computedStyle.position === 'fixed';
      if (!startData || startData === 'none' || startData === 'auto') {
        startData = '';
      }
      var endUnit = void 0;
      var startUnit = void 0;
      if (key in _plugins) {
        if (key === 'bezier') {
          _this2.transform = main_5('transform');
          startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
          transform = transform || (tweenStyle.transform ? _extends$2({}, tweenStyle.transform) : style.transform || main_14(startData));
          style.transform = transform;
        }
        _this2.propsData.data[key].getAnimStart(computedStyle, isSvg);
      } else if (cssName === 'transform') {
        _this2.transform = main_5('transform');
        startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
        endUnit = _this2.propsData.dataUnit[key];
        transform = transform || (tweenStyle.transform ? _extends$2({}, tweenStyle.transform) : style.transform || main_14(startData));
        var unitReg = /%|vw|vh|em|rem/i;
        if (endUnit && endUnit.match(unitReg)) {
          transform[key] = transform[key] && transform[key].toString().match(unitReg) ? parseFloat(transform[key]) : startConvertToEndUnit(_this2.target, computedStyle, key, transform[key], null, endUnit);
        }
        style.transform = transform;
      } else if (cssName === 'filter') {
        if (tweenStyle[cssName]) {
          startData = tweenStyle[cssName];
        } else {
          _this2.filterName = main_5('filter') || 'filter';
          startData = computedStyle[_this2.filterName];
          _this2.filterObject = _extends$2({}, _this2.filterObject, main_12(startData));
          startData = _this2.filterObject[key] || 0;
        }
        startUnit = startData.toString().replace(/[^a-z|%]/g, '');
        endUnit = _this2.propsData.dataUnit[key];
        if (endUnit !== startUnit) {
          startData = startConvertToEndUnit(_this2.target, computedStyle, cssName, parseFloat(startData), startUnit, endUnit, fixed);
        }
        style[key] = parseFloat(startData);
      } else if (key.match(/color|fill/i) || key === 'stroke') {
        startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
        style[cssName] = main_7(startData);
      } else if (key.match(/shadow/i)) {
        startData = main_8(startData);
        endUnit = _this2.propsData.dataUnit[key];
        startData = startData.map(_this2.convertToMarksArray.bind(_this2, computedStyle, endUnit, key));
        style[cssName] = startData;
      } else if (Array.isArray(_this2.propsData.data[key])) {
        startData = startData.split(/[\s|,]/).filter(function (c) {
          return c || c === 0;
        });
        endUnit = _this2.propsData.dataUnit[key];
        startData = startData.map(_this2.convertToMarksArray.bind(_this2, computedStyle, endUnit, key));
        style[cssName] = startData;
      } else {
        // 计算单位
        endUnit = _this2.propsData.dataUnit[cssName];
        startUnit = startData.toString().replace(/[^a-z|%]/g, '');
        if (endUnit !== startUnit) {
          startData = startConvertToEndUnit(_this2.target, computedStyle, cssName, parseFloat(startData), startUnit, endUnit, fixed);
        }
        style[cssName] = parseFloat(startData || 0);
      }
    });
    this.start = style;
    return style;
  };
  p$1.setArrayRatio = function (ratio, start, vars, unit, type) {
    if (type === 'color' && start.length === 4 && vars.length === 3) {
      vars[3] = 1;
    }
    var startInset = start.indexOf('inset') >= 0;
    var endInset = vars.indexOf('inset') >= 0;
    if (startInset && !endInset || endInset && !startInset) {
      throw console.error('Error: "box-shadow" inset have to exist');
    }
    var length = endInset ? 9 : 8;
    if (start.length === length && vars.length === length - 1) {
      vars.splice(3, 0, 0);
      unit.splice(3, 0, '');
    } else if (vars.length === length && start.length === length - 1) {
      start.splice(3, 0, 0);
    }
    var _vars = vars.map(function (endData, i) {
      var startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
      var startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
      if (typeof endData === 'string') {
        return endData;
      }
      return (endData - startData) * ratio + startData + (unit[i] || 0);
    });
    if (type === 'color') {
      return main_9(_vars);
    } else if (type === 'shadow') {
      var l = _vars.length === length ? 4 : 3;
      var s = _vars.slice(0, l).map(function (item) {
        if (typeof item === 'number') {
          return item + 'px';
        }
        return item;
      });
      var c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
      var color = main_9(c);
      return (s.join(' ') + ' ' + color + ' ' + (endInset ? 'inset' : '')).trim();
    }
    return _vars;
  };

  p$1.setRatio = function (ratio, tween, computedStyle) {
    var _this3 = this;

    tween.style = tween.style || {};
    if (this.start.transform) {
      tween.style.transform = tween.style.transform || _extends$2({}, this.start.transform);
    }
    var style = this.target.style;
    Object.keys(this.propsData.data).forEach(function (key) {
      var _isTransform = main_10(key) === 'transform';
      var startVars = _isTransform ? _this3.start.transform[key] : _this3.start[key];
      var endVars = _this3.propsData.data[key];
      var unit = _this3.propsData.dataUnit[key];
      var count = _this3.propsData.dataCount[key];
      if (key in _plugins) {
        _this3.propsData.data[key].setRatio(ratio, tween, computedStyle);
        if (key === 'bezier') {
          style[_this3.transform] = getTransformValue(tween.style.transform);
        } else {
          Object.keys(tween.style).forEach(function (css) {
            style[css] = tween.style[css];
          });
        }
        return;
      } else if (_isTransform) {
        if (unit && unit.match(/%|vw|vh|em|rem/i)) {
          startVars = parseFloat(_this3.start.transform[key]);
          if (count.charAt(1) === '=') {
            tween.style.transform[key] = startVars + endVars * ratio + unit;
          } else {
            tween.style.transform[key] = (endVars - startVars) * ratio + startVars + unit;
          }
        } else if (key === 'scale') {
          var xStart = _this3.start.transform.scaleX;
          var yStart = _this3.start.transform.scaleY;
          if (count.charAt(1) === '=') {
            tween.style.transform.scaleX = xStart + endVars * ratio;
            tween.style.transform.scaleY = yStart + endVars * ratio;
          } else {
            tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
            tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
          }
        } else if (count.charAt(1) === '=') {
          tween.style.transform[key] = startVars + endVars * ratio;
        } else {
          tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
        }
        style[_this3.transform] = getTransformValue(tween.style.transform);
        if (computedStyle) {
          computedStyle.transformSVG = main_4(style[_this3.transform]).toString();
        }
        return;
      } else if (Array.isArray(endVars)) {
        var _type = _this3.propsData.dataType[key];
        tween.style[key] = _this3.setArrayRatio(ratio, startVars, endVars, unit, _type);
        if (_type === 'string') {
          tween.style[key] = tween.style[key].join(_this3.propsData.dataSplitStr[key]);
        }
      } else {
        var styleUnit = main_15(key, 0);
        styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
        unit = unit || (main_20.filter.indexOf(key) >= 0 ? '' : styleUnit);
        if (typeof endVars === 'string') {
          tween.style[key] = endVars;
        } else if (count.charAt(1) === '=') {
          tween.style[key] = startVars + endVars * ratio + unit;
        } else {
          var value = (endVars - startVars) * ratio + startVars;
          tween.style[key] = unit ? '' + value + unit : value;
        }
      }
      if (main_20.filter.indexOf(key) >= 0) {
        if (!_this3.filterObject) {
          return;
        }
        _this3.filterObject[key] = tween.style[key];
        var filterStyle = '';
        Object.keys(_this3.filterObject).forEach(function (filterKey) {
          filterStyle += ' ' + filterKey + '(' + _this3.filterObject[filterKey] + ')';
        });
        style[_this3.filterName] = filterStyle.trim();
        return;
      }
      style[key] = tween.style[key];
    });
  };

  var DEFAULT_EASING = 'easeInOutQuad';
  var DEFAULT_DURATION = 450;
  var DEFAULT_DELAY = 0;
  function noop() {}
  _plugins.push(StylePlugin);
  // 设置默认数据
  function defaultData(vars, now) {
    var duration = vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION;
    return {
      duration: vars.type === 'set' ? 0 : duration,
      delay: vars.delay || DEFAULT_DELAY,
      ease: typeof vars.ease === 'function' ? vars.ease : tweenFunctions_1[vars.ease || DEFAULT_EASING],
      onUpdate: vars.onUpdate || noop,
      onComplete: vars.onComplete || noop,
      onStart: vars.onStart || noop,
      onRepeat: vars.onRepeat || noop,
      repeat: vars.repeat || 0,
      repeatDelay: vars.repeatDelay || 0,
      yoyo: vars.yoyo || false,
      type: vars.type === 'from' ? 'from' : 'to',
      initTime: now,
      appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null,
      perTime: 0,
      currentRepeat: 0
    };
  }

  var Tween = function Tween(target, to, attr) {
    var toData = dataToArray(to);
    this.target = target;
    this.attr = attr || 'style';
    // 时间精度补齐；
    this.accuracy = 0.00001;
    // 记录总时间;
    this.totalTime = 0;
    // 记录当前时间;
    this.progressTime = 0;
    // 记录时间轴数据;
    this.defaultData = [];
    // 每个的开始数据；
    this.start = {};
    // 开始默认的数据；
    this.startDefaultData = {};
    // 动画过程
    this.tween = {};
    // toData;
    this.data = toData;
    // 每帧的时间;
    this.perFrame = Math.round(1000 / 60);
    // 注册，第一次进入执行注册
    this.register = false;
    // svg元素
    this.isSvg = this.target.ownerSVGElement;
    // 设置 style
    var data = this.setAttrIsStyle();
    // 设置默认动画数据;
    this.setDefaultData(data);
  };
  var p$2 = Tween.prototype;
  p$2.setAttrIsStyle = function () {
    var _this = this;

    var data = [];
    var defaultParam = defaultData({}, 0);
    this.data.forEach(function (d, i) {
      var _d = _extends$2({}, d);
      if (_this.attr === 'style') {
        data[i] = {};
        Object.keys(_d).forEach(function (key) {
          if (key in defaultParam) {
            data[i][key] = _d[key];
            delete _d[key];
          }
        });
        data[i].style = _d;
        _this.startDefaultData.style = _this.target.getAttribute('style') || '';
      } else if (_this.attr === 'attr') {
        Object.keys(_d).forEach(function (key) {
          if (key === 'style' && Array.isArray(d[key])) {
            throw new Error('Style should be the object.');
          }
          if (key === 'bezier') {
            _d.style = _extends$2({}, _d.style, { bezier: _d[key] });
            delete _d[key];
            _this.startDefaultData.style = _this.target.getAttribute('style') || '';
          } else {
            if (key in defaultParam) {
              return;
            }
            _this.startDefaultData[key] = _this.getValue(key);
          }
        });
        data[i] = _d;
      }
    });
    return data;
  };
  p$2.setDefaultData = function (_vars) {
    var _this2 = this;

    var now = 0;
    var repeatMax = false;
    var data = _vars.map(function (item) {
      var appearToBool = typeof item.appearTo === 'number';
      // 加上延时，在没有播放过时；
      if (!appearToBool) {
        now += item.delay || 0;
      }
      var appearToTime = (item.appearTo || 0) + (item.delay || 0);
      // 获取默认数据
      var tweenData = defaultData(item, appearToBool ? appearToTime : now);
      tweenData.vars = {};
      Object.keys(item).forEach(function (_key) {
        if (!(_key in tweenData)) {
          var _data = item[_key];
          if (_key in _plugins) {
            tweenData.vars[_key] = new _plugins[_key](_this2.target, _data, tweenData.type);
          } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in _plugins) {
            tweenData.vars[_key] = new _plugins.SVGMorph(_this2.target, _data, _key);
          } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
            tweenData.vars[_key] = { type: 'color', vars: main_7(_data) };
          } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
            var vars = parseFloat(_data);
            var unit = _data.toString().replace(/[^a-z|%]/g, '');
            var count = _data.toString().replace(/[^+|=|-]/g, '');
            tweenData.vars[_key] = { unit: unit, vars: vars, count: count };
          }
        }
      });
      if (tweenData.yoyo && !tweenData.repeat) {
        console.warn('Warning: yoyo must be used together with repeat;'); // eslint-disable-line
      }
      if (tweenData.repeat === -1) {
        repeatMax = true;
      }
      var repeat = tweenData.repeat === -1 ? 0 : tweenData.repeat;
      if (appearToBool) {
        // 如果有 appearTo 且这条时间比 now 大时，，总时间用这条；
        var appearNow = item.appearTo + (item.delay || 0) + tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
        now = appearNow >= now ? appearNow : now;
      } else if (tweenData.delay < -tweenData.duration) {
        // 如果延时小于 负时间时,,不加,再减回延时;
        now -= tweenData.delay;
      } else {
        // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
        now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      }
      tweenData.mode = '';
      return tweenData;
    });
    this.totalTime = repeatMax ? Number.MAX_VALUE : now;
    this.defaultData = data;
  };
  p$2.getComputedStyle = function () {
    var style = typeof window !== 'undefined' && document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
    // 如果是 SVG, 样式全部提出为 transformSVG, 兼容 safari 不能获取 transform;
    if (this.isSvg) {
      var transform = style[main_5('transform')] || 'none';
      if (transform === 'none') {
        var attrStyle = this.target.getAttribute('style');
        if (attrStyle && attrStyle.indexOf('transform:') >= 0) {
          transform = attrStyle.split(';').filter(function (k) {
            return k.indexOf('transform:') >= 0;
          }).map(function (item) {
            return main_4(item.split(':')[1].trim()).toString();
          })[0];
        } else if (this.target.getAttribute('transform')) {
          // 暂时不支持标签上的 transform，后期增加;
          console.warn('Do not add transform on the label, otherwise it will be invalid.'); // eslint-disable-line no-console
        }
      }
      style.transformSVG = transform;
    }
    return style;
  };
  p$2.getAnimStartData = function (item) {
    var _this3 = this;

    var start = {};
    Object.keys(item).forEach(function (_key) {
      if (_key in _plugins || _this3.attr === 'attr' && (_key === 'd' || _key === 'points')) {
        _this3.computedStyle = _this3.computedStyle || (!_this3.target.getAttribute ? _extends$2({}, _this3.target) : _this3.getComputedStyle());
        start[_key] = item[_key].getAnimStart(_this3.computedStyle, _this3.tween, _this3.isSvg);
        return;
      }
      if (_this3.attr === 'attr') {
        // 除了d和这points外的标签动画；
        var attribute = _this3.getValue(_key);
        var data = attribute === 'null' || !attribute ? 0 : attribute;
        if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
          data = !data && _key === 'stroke' ? 'rgba(255, 255, 255, 0)' : data;
          data = main_7(data);
          start[_key] = data;
        } else if (parseFloat(data) || parseFloat(data) === 0 || data === 0) {
          var unit = data.toString().replace(/[^a-z|%]/g, '');
          start[_key] = unit !== item[_key].unit ? startConvertToEndUnit(_this3.target, _key, parseFloat(data), unit, item[_key].unit) : parseFloat(data);
        }
        return;
      }
      start[_key] = _this3.target[_key] || 0;
    });
    return start;
  };
  p$2.setAnimData = function (data) {
    var _this4 = this;

    Object.keys(data).forEach(function (key) {
      if (key in _plugins || _this4.attr === 'attr' && (key === 'd' || key === 'points')) {
        return;
      }
      _this4.target[key] = data[key];
    });
  };
  p$2.setRatio = function (ratio, endData, i) {
    var _this5 = this;

    Object.keys(endData.vars).forEach(function (_key) {
      if (_key in _plugins || _this5.attr === 'attr' && (_key === 'd' || _key === 'points')) {
        endData.vars[_key].setRatio(ratio, _this5.tween, _this5.isSvg && _this5.computedStyle);
        return;
      }
      var endVars = endData.vars[_key];
      var startVars = _this5.start[i][_key];
      var data = void 0;
      if (_this5.attr === 'attr') {
        // 除了d和这points外的标签动画；
        if (!endVars.type) {
          data = endVars.unit.charAt(1) === '=' ? startVars + endVars.vars * ratio + endVars.unit : (endVars.vars - startVars) * ratio + startVars + endVars.unit;
          _this5.setValue(_key, endVars.unit ? data : parseFloat(data));
        } else if (endVars.type === 'color') {
          if (endVars.vars.length === 3 && startVars.length === 4) {
            endVars.vars[3] = 1;
          }
          data = endVars.vars.map(function (_endData, _i) {
            var startData = startVars[_i] || 0;
            return (_endData - startData) * ratio + startData;
          });
          _this5.setValue(_key, main_9(data));
        }
      }
    });
    this.setAnimData(this.tween);
  };
  p$2.getValue = function (key) {
    return this.target.getAttribute ? this.target.getAttribute(key) : this.target[key];
  };
  p$2.setValue = function (key, value) {
    if (this.target.setAttribute) {
      this.target.setAttribute(key, value);
    } else {
      this.target[key] = value;
    }
  };
  p$2.render = function () {
    var _this6 = this;

    var reverse = this.reverse;
    this.defaultData.forEach(function (item, i) {
      var initTime = item.initTime;
      var duration = main_3(item.duration);
      // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
      var repeatNum = Math.ceil((_this6.progressTime - initTime) / (duration + item.repeatDelay)) - 1 || 0;
      repeatNum = repeatNum < 0 ? 0 : repeatNum;
      if (item.repeat) {
        if (item.repeat < repeatNum && item.repeat !== -1) {
          return;
        }
        if (item.repeat || item.repeat <= repeatNum) {
          initTime += repeatNum * (duration + item.repeatDelay);
        }
      }
      var startData = item.yoyo && repeatNum % 2 ? 1 : 0;
      var endData = item.yoyo && repeatNum % 2 ? 0 : 1;
      startData = item.type === 'from' ? 1 - startData : startData;
      endData = item.type === 'from' ? 1 - endData : endData;
      //  精度损失，只取小数点后10位。
      var progressTime = main_3(_this6.progressTime - initTime);

      var ratio = void 0;

      // 开始注册;
      // from 时需先执行参数位置;
      var fromDelay = item.type === 'from' ? item.delay : 0;
      if (progressTime + fromDelay >= 0) {
        if (!_this6.start[i]) {
          // 设置 start
          _this6.start[i] = _this6.getAnimStartData(item.vars);
          if (progressTime < _this6.perFrame) {
            ratio = !item.duration && !item.delay ? item.ease(1, startData, endData, 1) : item.ease(0, startData, endData, 1);
            _this6.setRatio(ratio, item, i);
          } else if (progressTime > duration) {
            ratio = item.ease(1, startData, endData, 1);
            _this6.setRatio(ratio, item, i);
          }
          if (!_this6.register || i && !initTime) {
            _this6.register = true;
            if (progressTime === 0 && item.duration && item.delay) {
              return;
            }
          }
        }
      }

      var e = {
        index: i,
        target: _this6.target
      };
      var cb = _extends$2({
        moment: _this6.progressTime
      }, e);
      var maxPer = _this6.perFrame - _this6.accuracy;
      var startTime = item.delay && reverse ? -maxPer : 0;
      if ((progressTime >= startTime && !(progressTime > duration && item.mode === 'onComplete') || progressTime < startTime && item.mode && item.mode !== 'onStart') && _this6.start[i]) {
        var updateAnim = _this6.updateAnim === 'update';
        progressTime = progressTime < maxPer && !reverse && item.duration >= _this6.perFrame ? 0 : progressTime;
        if ((progressTime >= duration - _this6.accuracy && !reverse || reverse && progressTime <= 0) && repeatNum >= item.repeat) {
          if (item.mode === 'onComplete') {
            return;
          }
          // onReveresComplete 和 onComplete 统一用 onComplete;
          ratio = item.ease(reverse ? 0 : 1, startData, endData, 1);
          _this6.setRatio(ratio, item, i, item.currentRepeat !== repeatNum);
          if ((!item.reset || item.reset && progressTime >= duration) && !updateAnim) {
            // duration 为 0 时的一个回调；
            if (duration < maxPer) {
              if (!duration) {
                item.onStart(e);
                cb.mode = 'onStart';
                _this6.onChange(cb);
              }
              item.onUpdate(_extends$2({ ratio: ratio }, e));
              cb.mode = 'onUpdate';
              _this6.onChange(cb);
            }
            item.onComplete(e);
          } else if (progressTime >= duration + maxPer) {
            return;
          }
          item.mode = 'onComplete';
        } else if (duration > maxPer) {
          var currentProgress = progressTime < 0 ? 0 : progressTime;
          currentProgress = currentProgress > duration ? duration : currentProgress;
          ratio = item.ease(currentProgress, startData, endData, duration);
          _this6.setRatio(ratio, item, i);
          if (!updateAnim) {
            if (item.repeat && repeatNum > 0 && item.currentRepeat !== repeatNum) {
              item.mode = 'onRepeat';
              item.currentRepeat = repeatNum;
              item.onRepeat(_extends$2({}, e, { repeatNum: repeatNum }));
            } else if ((item.perTime <= 0 || reverse && item.perTime >= _this6.reverseStartTime - initTime) && item.mode !== 'onStart') {
              // onReveresStart 和 onStart 统一用 onStart;
              item.mode = 'onStart';
              item.onStart(e);
            } else {
              item.mode = 'onUpdate';
              item.onUpdate(_extends$2({ ratio: ratio }, e));
            }
          }
        }

        if (!updateAnim) {
          cb.mode = item.mode;
          _this6.onChange(cb);
        }
        item.perTime = progressTime;
        if (item.reset) {
          delete item.reset;
        }
      }
    });
  };
  // 播放帧
  p$2.frame = function (moment) {
    var _this7 = this;

    this.progressTime = moment;
    this.defaultData.forEach(function (item) {
      var t = _this7.progressTime - item.duration - item.initTime;
      if (t < _this7.perFrame && t > 0) {
        _this7.progressTime = item.duration + item.initTime;
      }
    });
    this.render();
  };

  p$2.init = p$2.frame;

  p$2.resetAnimData = function () {
    this.tween = {};
    this.start = {};
  };

  var getDefaultStyle = function getDefaultStyle(domStyle, defaultStyle, tweenData) {
    var $data = defaultData({}, 0);
    var getStyleToArray = function getStyleToArray(styleString) {
      return styleString.split(';').filter(function (c) {
        return c;
      }).map(function (str) {
        return str.split(':').map(function (s) {
          return s.trim();
        });
      });
    };
    var styleToArray = getStyleToArray(defaultStyle);
    var domStyleToArray = getStyleToArray(domStyle);
    tweenData.forEach(function (value) {
      Object.keys(value).forEach(function (name) {
        if (!(name in $data)) {
          var styleName = main_1(main_10(main_6(name)));
          domStyleToArray = domStyleToArray.filter(function (item) {
            if (transformOrFilter[item[0]] && transformOrFilter[styleName]) {
              return false;
            }
            return item[0] !== styleName;
          });
        }
      });
    });
    styleToArray.forEach(function (item) {
      domStyleToArray = domStyleToArray.filter(function ($item) {
        if ($item[0] === item[0]) {
          return false;
        }
        return true;
      });
    });
    return styleToArray.concat(domStyleToArray).map(function (item) {
      return item.join(':');
    }).join(';');
  };

  p$2.resetDefaultStyle = function () {
    var _this8 = this;

    this.tween = {};
    this.defaultData = this.defaultData.map(function (item) {
      item.reset = true;
      delete item.mode;
      return item;
    });
    var data = defaultData({}, 0);
    Object.keys(this.startDefaultData).forEach(function (key) {
      if (!(key in data)) {
        if (key === 'style') {
          var value = getDefaultStyle(_this8.target.style.cssText, _this8.startDefaultData.style, _this8.data);
          _this8.setValue(key, value);
        } else {
          _this8.setValue(key, _this8.startDefaultData[key]);
        }
        _this8.computedStyle = null;
      }
    });
  };

  p$2.reStart = function (style, preStyle, isTween) {
    var _this9 = this;

    this.start = {};
    this.tween = {};
    Object.keys(style || {}).forEach(function (key) {
      if (isTween || !preStyle || style[key] !== preStyle[key]) {
        _this9.target.style[key] = main_15(key, style[key]);
      }
    });
    this.setAttrIsStyle();
    this.computedStyle = null;
  };

  p$2.onChange = noop;

  var performanceNow = createCommonjsModule(function (module) {
  // Generated by CoffeeScript 1.12.2
  (function() {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
      module.exports = function() {
        return performance.now();
      };
    } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
      module.exports = function() {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };
      hrtime = process.hrtime;
      getNanoSeconds = function() {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      module.exports = function() {
        return Date.now() - loadTime;
      };
      loadTime = Date.now();
    } else {
      module.exports = function() {
        return new Date().getTime() - loadTime;
      };
      loadTime = new Date().getTime();
    }

  }).call(commonjsGlobal);


  });

  var root = typeof window === 'undefined' ? commonjsGlobal : window
    , vendors = ['moz', 'webkit']
    , suffix = 'AnimationFrame'
    , raf = root['request' + suffix]
    , caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

  for(var i$1 = 0; !raf && i$1 < vendors.length; i$1++) {
    raf = root[vendors[i$1] + 'Request' + suffix];
    caf = root[vendors[i$1] + 'Cancel' + suffix]
        || root[vendors[i$1] + 'CancelRequest' + suffix];
  }

  // Some versions of FF have rAF but not cAF
  if(!raf || !caf) {
    var last = 0
      , id$1 = 0
      , queue = []
      , frameDuration = 1000 / 60;

    raf = function(callback) {
      if(queue.length === 0) {
        var _now = performanceNow()
          , next = Math.max(0, frameDuration - (_now - last));
        last = next + _now;
        setTimeout(function() {
          var cp = queue.slice(0);
          // Clear queue here to prevent
          // callbacks from appending listeners
          // to the current frame's queue
          queue.length = 0;
          for(var i = 0; i < cp.length; i++) {
            if(!cp[i].cancelled) {
              try{
                cp[i].callback(last);
              } catch(e) {
                setTimeout(function() { throw e }, 0);
              }
            }
          }
        }, Math.round(next));
      }
      queue.push({
        handle: ++id$1,
        callback: callback,
        cancelled: false
      });
      return id$1
    };

    caf = function(handle) {
      for(var i = 0; i < queue.length; i++) {
        if(queue[i].handle === handle) {
          queue[i].cancelled = true;
        }
      }
    };
  }

  var raf_1 = function(fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf.call(root, fn)
  };
  var cancel = function() {
    caf.apply(root, arguments);
  };
  var polyfill = function(object) {
    if (!object) {
      object = root;
    }
    object.requestAnimationFrame = raf;
    object.cancelAnimationFrame = caf;
  };
  raf_1.cancel = cancel;
  raf_1.polyfill = polyfill;

  /* eslint-disable func-names */

  var getTime = Date.now || function () {
    return new Date().getTime();
  };
  var sortObj = {
    interval: 1,
    timeout: 1,
    TweenOneTicker: 2
  };
  var tickObjToArray = function tickObjToArray(obj) {
    return Object.keys(obj).map(function (k) {
      return {
        key: k,
        func: obj[k]
      };
    }).sort(function (a, b) {
      var aa = a.key.split('_')[0];
      var bb = b.key.split('_')[0];
      return sortObj[bb] - sortObj[aa];
    });
  };
  var Ticker = function Ticker() {};
  Ticker.prototype = {
    tickFnArray: [],
    tickKeyObject: {},
    id: -1,
    tweenId: 0,
    frame: 0,
    perFrame: Math.round(1000 / 60),
    elapsed: 0,
    lastUpdate: getTime(),
    startTime: getTime(), // 开始时间，不计算 react 渲染时间；
    nextTime: 0,
    time: 0
  };
  var p$3 = Ticker.prototype;
  p$3.add = function (fn) {
    var key = 'TweenOneTicker_' + this.tweenId;
    this.tweenId++;
    this.wake(key, fn);
    return key;
  };
  p$3.wake = function (key, fn) {
    this.tickKeyObject[key] = fn;
    this.tickFnArray = tickObjToArray(this.tickKeyObject);
    if (this.id === -1) {
      this.id = raf_1(this.tick);
    }
  };
  p$3.clear = function (key) {
    delete this.tickKeyObject[key];
    this.tickFnArray = tickObjToArray(this.tickKeyObject);
  };
  p$3.sleep = function () {
    raf_1.cancel(this.id);
    this.id = -1;
    this.frame = 0;
  };
  var ticker = new Ticker();
  p$3.tick = function (a) {
    ticker.elapsed = getTime() - ticker.lastUpdate;
    // 离开当前时设值 300；大于 300 则为离开。
    if (ticker.elapsed > 300) {
      ticker.startTime += ticker.elapsed - ticker.perFrame;
    }
    ticker.lastUpdate += ticker.elapsed;
    ticker.time = ticker.lastUpdate - ticker.startTime;
    var overlap = ticker.time - ticker.nextTime;
    if (overlap > 0 || !ticker.frame) {
      ticker.frame++;
      ticker.nextTime += overlap;
    }
    // console.log(ticker.frame, ticker.nextTime, ticker.time)
    ticker.tickFnArray.forEach(function (item) {
      return item.func(a);
    });
    // 如果 object 里没对象了，自动杀掉；
    if (!ticker.tickFnArray.length) {
      ticker.sleep();
      return;
    }
    ticker.id = raf_1(ticker.tick);
  };
  var timeoutIdNumber = 0;
  p$3.timeout = function (fn, time) {
    var _this = this;

    if (!(typeof fn === 'function')) {
      return console.warn('not function'); // eslint-disable-line
    }
    var timeoutID = 'timeout_' + Date.now() + '-' + timeoutIdNumber;
    var startTime = this.time;
    this.wake(timeoutID, function () {
      var moment = _this.time - startTime;
      if (moment >= (time || 0)) {
        _this.clear(timeoutID);
        fn();
      }
    });
    timeoutIdNumber++;
    return timeoutID;
  };
  var intervalIdNumber = 0;
  p$3.interval = function (fn, time) {
    var _this2 = this;

    if (!(typeof fn === 'function')) {
      console.warn('not function'); // eslint-disable-line
      return null;
    }
    var intervalID = 'interval_' + Date.now() + '-' + intervalIdNumber;
    var starTime = this.time;
    this.wake(intervalID, function () {
      var moment = _this2.time - starTime;
      if (moment >= (time || 0)) {
        starTime = _this2.time;
        fn();
      }
    });
    intervalIdNumber++;
    return intervalID;
  };

  function noop$1() {}

  var perFrame = Math.round(1000 / 60);
  var objectOrArray = propTypes.oneOfType([propTypes.object, propTypes.array]);

  var TweenOne = function (_Component) {
    _inherits$1(TweenOne, _Component);

    function TweenOne(props) {
      _classCallCheck$1(this, TweenOne);

      var _this = _possibleConstructorReturn$1(this, (TweenOne.__proto__ || Object.getPrototypeOf(TweenOne)).call(this, props));

      _initialiseProps.call(_this);

      _this.rafID = -1;
      _this.paused = props.paused;
      _this.reverse = props.reverse;
      _this.updateAnim = false;
      _this.repeatNum = 0;
      _this.forced = {};
      _this.setForcedJudg(props);
      return _this;
    }

    _createClass$1(TweenOne, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.dom = ReactDom__default.findDOMNode(this);
        if (this.dom && this.dom.nodeName !== '#text') {
          this.start();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.tween && !this.dom) {
          this.updateAnim = true;
          return;
        }

        // 动画处理
        var newAnimation = nextProps.animation;
        var currentAnimation = this.props.animation;
        var equal = objectEqual(currentAnimation, newAnimation);
        if (!equal) {
          if (nextProps.resetStyle && this.tween) {
            this.tween.resetDefaultStyle();
          }
          this.updateAnim = true;
        }

        // 跳帧事件 moment;
        var nextMoment = nextProps.moment;
        if (typeof nextMoment === 'number' && nextMoment !== this.props.moment) {
          if (this.tween && !this.updateAnim) {
            this.startMoment = nextMoment;
            this.startTime = ticker.time;
            if (nextProps.paused) {
              this.raf();
            }
            if (this.tween.progressTime >= this.tween.totalTime) {
              this.play();
            }
          } else {

            this.updateAnim = true;
          }
        }

        // 暂停倒放
        if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
          this.paused = nextProps.paused;
          this.reverse = nextProps.reverse;
          if (this.paused) {
            this.cancelRequestAnimationFrame();
          } else if (this.reverse && nextProps.reverseDelay) {
            this.cancelRequestAnimationFrame();
            ticker.timeout(this.restart, nextProps.reverseDelay);
          } else {
            // 在 form 状态下，暂停时拉 moment 时，start 有值恢复播放，在 delay 的时间没有处理。。
            if (this.tween) {
              this.tween.resetAnimData();
              this.tween.resetDefaultStyle();
            }
            if (!this.updateAnim) {
              this.restart();
            }
          }
        }

        var styleEqual = objectEqual(this.props.style, nextProps.style);
        if (!styleEqual) {
          // 在动画时更改了 style, 作为更改开始数值。
          if (this.tween) {
            this.tween.reStart(nextProps.style, this.props.style, this.tween.progressTime < this.tween.totalTime);
            if (this.paused) {
              this.raf();
            }
          }
        }
        this.setForcedJudg(nextProps);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (!this.dom) {
          this.dom = ReactDom__default.findDOMNode(this);
        }
        // 样式更新了后再执行动画；
        if (this.updateAnim && this.dom && this.dom.nodeName !== '#text') {
          if (this.tween) {
            this.cancelRequestAnimationFrame();
          }
          this.start();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cancelRequestAnimationFrame();
      }

      /**
       * @method setForcedJudg
       * @param props
       * QueueAnim 套在组件下面后导至子级变化。
       * <QueueAnim component={Menu} >
       *   <SubMenu key="a" title="导航">
       *     <Item />
       *   </SubMenu>
       * </QueueAnim>
       * rc-Menu 里是以 isXXX 来判断是 rc-Menu 的子级;
       * 如: 用 isSubMenu 来处理 hover 事件
       * 地址: https://github.com/react-component/menu/blob/master/src/MenuMixin.js#L172
       * 暂时方案: 在组件里添加判断用的值。
       */

    }, {
      key: 'render',
      value: function render() {
        var props = _extends$2({}, this.props);
        ['animation', 'component', 'componentProps', 'reverseDelay', 'attr', 'paused', 'reverse', 'repeat', 'yoyo', 'moment', 'resetStyle', 'forcedJudg'].forEach(function (key) {
          return delete props[key];
        });
        props.style = _extends$2({}, this.props.style);
        Object.keys(props.style).forEach(function (p) {
          if (p.match(/filter/i)) {
            ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
              props.style[prefix + 'Filter'] = props.style[p];
            });
          }
        });
        // component 为空时调用子级的。。
        if (!this.props.component) {
          if (!this.props.children) {
            return this.props.children;
          }
          var childrenProps = this.props.children.props;
          var style = childrenProps.style,
              className = childrenProps.className;
          // 合并 style 与 className。

          var newStyle = _extends$2({}, style, props.style);
          var newClassName = props.className ? props.className + ' ' + className : className;
          return React__default.cloneElement(this.props.children, { style: newStyle, className: newClassName });
        }
        return React__default.createElement(this.props.component, _extends$2({}, props, this.props.componentProps));
      }
    }]);

    return TweenOne;
  }(React.Component);

  TweenOne.propTypes = {
    component: propTypes.any,
    componentProps: propTypes.any,
    animation: objectOrArray,
    children: propTypes.any,
    style: propTypes.object,
    paused: propTypes.bool,
    reverse: propTypes.bool,
    reverseDelay: propTypes.number,
    yoyo: propTypes.bool,
    repeat: propTypes.number,
    moment: propTypes.number,
    attr: propTypes.string,
    onChange: propTypes.func,
    resetStyle: propTypes.bool,
    forcedJudg: propTypes.object
  };
  TweenOne.defaultProps = {
    component: 'div',
    componentProps: {},
    reverseDelay: 0,
    repeat: 0,
    attr: 'style',
    onChange: noop$1
  };

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.setForcedJudg = function (props) {
      Object.keys(_this2.forced).forEach(function (key) {
        delete _this2[key];
        delete _this2.forced[key];
      });
      if (props.forcedJudg) {
        Object.keys(props.forcedJudg).forEach(function (key) {
          if (!_this2[key]) {
            _this2[key] = props.forcedJudg[key];
            _this2.forced[key] = 1;
          }
        });
      }
    };

    this.setDefault = function (props) {
      _this2.moment = props.moment || 0;
      _this2.startMoment = props.moment || 0;
      _this2.startTime = ticker.time;
    };

    this.restart = function () {
      if (!_this2.tween) {
        return;
      }
      _this2.startMoment = _this2.moment;
      _this2.startTime = ticker.time;
      _this2.tween.reverse = _this2.reverse;
      _this2.tween.reverseStartTime = _this2.startMoment;
      _this2.raf();
      _this2.play();
    };

    this.start = function () {
      _this2.updateAnim = false;
      var props = _this2.props;
      if (props.animation && Object.keys(props.animation).length) {
        _this2.setDefault(props);
        _this2.tween = new Tween(_this2.dom, props.animation, props.attr);
        _this2.tween.reverse = _this2.reverse;
        // 预先注册 raf, 初始动画数值。
        _this2.raf();
        // 开始动画
        _this2.play();
      } else {
        _this2.tween = null;
      }
    };

    this.play = function () {
      _this2.cancelRequestAnimationFrame();
      if (_this2.paused) {
        return;
      }
      _this2.rafID = ticker.add(_this2.raf);
    };

    this.frame = function () {
      var yoyo = _this2.props.yoyo;
      var repeat = _this2.props.repeat;

      var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
      repeat = repeat >= 0 ? repeat : Number.MAX_VALUE;
      var moment = ticker.time - _this2.startTime + _this2.startMoment;
      if (_this2.reverse) {
        moment = (_this2.startMoment || 0) - (ticker.time - _this2.startTime);
      }
      moment = moment > totalTime ? totalTime : moment;
      moment = moment <= 0 ? 0 : moment;
      var repeatNum = Math.floor(moment / _this2.tween.totalTime) || 0;
      repeatNum = repeatNum > repeat ? repeat : repeatNum;
      var tweenMoment = moment - _this2.tween.totalTime * repeatNum;
      tweenMoment = tweenMoment < perFrame && !_this2.reverse && totalTime >= perFrame ? 0 : tweenMoment;
      if (repeat && moment && moment - _this2.tween.totalTime * repeatNum < perFrame) {
        // 在重置样式之前补 complete；
        _this2.tween.frame(_this2.tween.totalTime * repeatNum);
      }
      if (moment < _this2.moment && !_this2.reverse || repeat !== 0 && repeatNum && repeatNum !== _this2.repeatNum) {
        // 在 form 状态下，暂停时拉 moment 时，start 有值，，往返方向播放时，在 delay 的时间没有处理。。
        // 与上面的处理一样，删除 start ，重新走一遍 start。。
        _this2.tween.resetAnimData();
        _this2.tween.resetDefaultStyle();
      }
      var yoyoReverse = yoyo && repeatNum % 2;
      if (yoyoReverse) {
        tweenMoment = _this2.tween.totalTime - tweenMoment;
      }
      _this2.tween.onChange = function (e) {
        var cb = _extends$2({}, e, {
          timelineMode: ''
        });

        if (_this2.moment === _this2.startMoment && !_this2.reverse && !e.index && e.mode === 'onStart' || _this2.reverse) {
          cb.timelineMode = 'onTimelineStart';
        } else if (moment >= totalTime && !_this2.reverse || !moment && _this2.reverse) {
          cb.timelineMode = 'onTimelineComplete';
        } else if (repeatNum !== _this2.timelineRepeatNum) {
          cb.timelineMode = 'onTimelineRepeat';
        } else {
          cb.timelineMode = 'onTimelineUpdate';
        }
        _this2.timelineRepeatNum = repeatNum;
        _this2.props.onChange(cb);
      };
      _this2.moment = moment;
      _this2.repeatNum = repeatNum;
      _this2.tween.frame(tweenMoment);
    };

    this.raf = function () {
      var tween = _this2.tween;
      _this2.frame();
      if (tween !== _this2.tween) {
        // 在 onComplete 时更换动画时，raf 没结束，所以需要强制退出，避逸两个时间的冲突。
        return null;
      }
      var repeat = _this2.props.repeat;

      var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
      if (_this2.moment >= totalTime && !_this2.reverse || _this2.paused || _this2.reverse && _this2.moment === 0) {
        return _this2.cancelRequestAnimationFrame();
      }
      return null;
    };

    this.cancelRequestAnimationFrame = function () {
      ticker.clear(_this2.rafID);
      _this2.rafID = -1;
    };
  };

  TweenOne.isTweenOne = true;

  function noop$2() {}

  var TweenOneGroup = function (_Component) {
    _inherits$1(TweenOneGroup, _Component);

    function TweenOneGroup(props) {
      _classCallCheck$1(this, TweenOneGroup);

      var _this = _possibleConstructorReturn$1(this, (TweenOneGroup.__proto__ || Object.getPrototypeOf(TweenOneGroup)).call(this, props));

      _initialiseProps$1.call(_this);

      _this.keysToEnter = [];
      _this.keysToLeave = [];
      _this.saveTweenTag = {};
      _this.onEnterBool = false;
      _this.animQueue = [];
      _this.isTween = {};
      // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
      var children = toArrayChildren(getChildrenFromProps(_this.props));
      _this.currentChildren = toArrayChildren(getChildrenFromProps(_this.props));
      _this.state = {
        children: children
      };
      return _this;
    }

    _createClass$1(TweenOneGroup, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.onEnterBool = true;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var nextChildren = toArrayChildren(nextProps.children);
        if (Object.keys(this.isTween).length && !nextProps.exclusive) {
          this.animQueue.push(nextChildren);
          return;
        }
        var currentChildren = toArrayChildren(this.currentChildren);
        this.changeChildren(nextChildren, currentChildren);
      }
    }, {
      key: 'changeChildren',
      value: function changeChildren(nextChildren, currentChildren) {
        var _this2 = this;

        var newChildren = mergeChildren(currentChildren, nextChildren);
        this.keysToEnter = [];
        this.keysToLeave = [];
        nextChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasPrev = findChildInChildrenByKey(currentChildren, key);
          // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
          if (_this2.saveTweenTag[key]) {
            _this2.saveTweenTag[key] = React__default.cloneElement(_this2.saveTweenTag[key], {}, c);
          }
          if (!hasPrev && key) {
            _this2.keysToEnter.push(key);
          }
        });

        currentChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasNext = findChildInChildrenByKey(nextChildren, key);
          if (!hasNext && key) {
            _this2.keysToLeave.push(key);
            delete _this2.saveTweenTag[key];
          }
        });
        this.currentChildren = newChildren;
        this.setState({
          children: newChildren
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var childrenToRender = this.getChildrenToRender(this.state.children);
        if (!this.props.component) {
          return childrenToRender[0] || null;
        }
        var componentProps = _extends$2({}, this.props);
        ['component', 'componentProps', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'exclusive', 'resetStyle'].forEach(function (key) {
          return delete componentProps[key];
        });
        return React.createElement(this.props.component, _extends$2({}, componentProps, this.props.componentProps), childrenToRender);
      }
    }]);

    return TweenOneGroup;
  }(React.Component);

  var _initialiseProps$1 = function _initialiseProps() {
    var _this3 = this;

    this.onChange = function (animation, key, type, obj) {
      var length = dataToArray(animation).length;
      var tag = obj.target;
      var classIsSvg = typeof tag.className === 'object' && 'baseVal' in tag.className;
      var isEnter = type === 'enter' || type === 'appear';
      if (obj.mode === 'onStart') {
        if (classIsSvg) {
          tag.className.baseVal = _this3.setClassName(tag.className.baseVal, isEnter);
        } else {
          tag.className = _this3.setClassName(tag.className, isEnter);
        }
      } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
        delete _this3.isTween[key];
        if (classIsSvg) {
          tag.className.baseVal = tag.className.baseVal.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
        } else {
          tag.className = tag.className.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
        }
        if (type === 'enter') {
          _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
          if (!_this3.keysToEnter.length) {
            _this3.reAnimQueue();
          }
        } else if (type === 'leave') {
          _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
          _this3.currentChildren = _this3.currentChildren.filter(function (child) {
            return key !== child.key;
          });
          if (!_this3.keysToLeave.length) {
            var currentChildrenKeys = _this3.currentChildren.map(function (item) {
              return item.key;
            });
            Object.keys(_this3.saveTweenTag).forEach(function ($key) {
              if (currentChildrenKeys.indexOf($key) === -1) {
                delete _this3.saveTweenTag[$key];
              }
            });
            _this3.setState({
              children: _this3.currentChildren
            }, _this3.reAnimQueue);
          }
        }
        var _obj = { key: key, type: type };
        _this3.props.onEnd(_obj);
      }
    };

    this.setClassName = function (name, isEnter) {
      var className = name.replace(_this3.props.animatingClassName[isEnter ? 1 : 0], '').trim();
      if (className.indexOf(_this3.props.animatingClassName[isEnter ? 0 : 1]) === -1) {
        className = (className + ' ' + _this3.props.animatingClassName[isEnter ? 0 : 1]).trim();
      }
      return className;
    };

    this.getTweenChild = function (child) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key = child.key;
      _this3.saveTweenTag[key] = React__default.createElement(TweenOne, _extends$2({}, props, {
        key: key,
        component: null
      }), child);
      return _this3.saveTweenTag[key];
    };

    this.getCoverAnimation = function (child, i, type) {
      var animation = void 0;
      animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
      if (type === 'appear') {
        var appear = transformArguments(_this3.props.appear, child.key, i);
        animation = appear && _this3.props.enter || null;
      }
      var animate = transformArguments(animation, child.key, i);
      var onChange = _this3.onChange.bind(_this3, animate, child.key, type);
      var props = {
        key: child.key,
        animation: animate,
        onChange: onChange,
        resetStyle: _this3.props.resetStyle
      };
      if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
        if (!_this3.saveTweenTag[child.key]) {
          _this3.isTween[child.key] = type;
        }
      }
      var children = _this3.getTweenChild(child, props);
      return children;
    };

    this.getChildrenToRender = function (children) {
      return children.map(function (child, i) {
        if (!child || !child.key) {
          return child;
        }
        var key = child.key;

        if (_this3.keysToLeave.indexOf(key) >= 0) {
          return _this3.getCoverAnimation(child, i, 'leave');
        } else if ((_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[key] && _this3.keysToLeave.indexOf(key) === -1) && !(_this3.isTween[key] === 'enter' && _this3.saveTweenTag[key])) {
          /**
          * 1. 在 key 在 enter 里。
          * 2. 出场未结束，触发进场, this.isTween[key] 为 leave, key 在 enter 里。
          * 3. 状态为 enter 且 tweenTag 里有值时，不执行重载动画属性，直接调用 tweenTag 里的。
          */
          return _this3.getCoverAnimation(child, i, 'enter');
        } else if (!_this3.onEnterBool) {
          return _this3.getCoverAnimation(child, i, 'appear');
        }
        return _this3.saveTweenTag[key];
      });
    };

    this.reAnimQueue = function () {
      if (!Object.keys(_this3.isTween).length && _this3.animQueue.length) {
        _this3.changeChildren(_this3.animQueue[_this3.animQueue.length - 1], _this3.state.children);
        _this3.animQueue = [];
      }
    };
  };

  TweenOneGroup.propTypes = {
    component: propTypes.any,
    componentProps: propTypes.object,
    children: propTypes.any,
    style: propTypes.object,
    appear: propTypes.bool,
    enter: propTypes.any,
    leave: propTypes.any,
    animatingClassName: propTypes.array,
    onEnd: propTypes.func,
    resetStyle: propTypes.bool,
    exclusive: propTypes.bool
  };

  TweenOneGroup.defaultProps = {
    component: 'div',
    componentProps: {},
    appear: true,
    animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
    enter: { x: 50, opacity: 0, type: 'from' },
    leave: { x: -50, opacity: 0 },
    onEnd: noop$2,
    resetStyle: true,
    exclusive: false
  };
  TweenOneGroup.isTweenOneGroup = true;

  // export this package's api

  TweenOne.TweenOneGroup = TweenOneGroup;
  TweenOne.easing = tweenFunctions_1;
  TweenOne.plugins = _plugins;
  TweenOne.ticker = ticker;
  TweenOne.Tween = Tween;

  var ticker$1 = ticker;

  /* eslint no-prototype-builtins: 0 */

  function toArrayChildren$1(children) {
    var ret = [];
    React__default.Children.forEach(children, function (c) {
      ret.push(c);
    });
    return ret;
  }

  function findChildInChildrenByKey$1(children, key) {
    var ret = null;
    if (children) {
      children.forEach(function (c) {
        if (ret || !c) {
          return;
        }
        if (c.key === key) {
          ret = c;
        }
      });
    }
    return ret;
  }

  function mergeChildren$1(prev, next) {
    var ret = [];
    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    var nextChildrenPending = {};
    var pendingChildren = [];
    var followChildrenKey = void 0;
    prev.forEach(function (c) {
      if (!c) {
        return;
      }
      if (findChildInChildrenByKey$1(next, c.key)) {
        if (pendingChildren.length) {
          nextChildrenPending[c.key] = pendingChildren;
          pendingChildren = [];
        }
        followChildrenKey = c.key;
      } else if (c.key) {
        pendingChildren.push(c);
      }
    });
    if (!followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
    next.forEach(function (c) {
      if (!c) {
        return;
      }
      if (nextChildrenPending.hasOwnProperty(c.key)) {
        ret = ret.concat(nextChildrenPending[c.key]);
      }
      ret.push(c);
      if (c.key === followChildrenKey) {
        ret = ret.concat(pendingChildren);
      }
    });

    return ret;
  }

  function transformArguments$1(arg, key, i) {
    var result = void 0;
    if (typeof arg === 'function') {
      result = arg({
        key: key,
        index: i
      });
    } else {
      result = arg;
    }
    if (Array.isArray(result)) {
      if (result.length === 2) {
        return result;
      }
      return [result[0], result[0]];
    }
    return [result, result];
  }

  function getChildrenFromProps$1(props) {
    return props && props.children;
  }

  var AnimTypes = {
    left: {
      opacity: [1, 0],
      translateX: [0, -30]
    },
    top: {
      opacity: [1, 0],
      translateY: [0, -30]
    },
    right: {
      opacity: [1, 0],
      translateX: [0, 30]
    },
    bottom: {
      opacity: [1, 0],
      translateY: [0, 30]
    },
    alpha: {
      opacity: [1, 0]
    },
    scale: {
      opacity: [1, 0],
      scale: [1, 0]
    },
    scaleBig: {
      opacity: [1, 0],
      scale: [1, 2]
    },
    scaleX: {
      opacity: [1, 0],
      scaleX: [1, 0]
    },
    scaleY: {
      opacity: [1, 0],
      scaleY: [1, 0]
    }
  };

  var noop$3 = function noop() {};

  var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps', 'childContextTypes', 'contextTypes'];

  var QueueAnim = function (_React$Component) {
    _inherits$1(QueueAnim, _React$Component);

    function QueueAnim(props) {
      _classCallCheck$1(this, QueueAnim);

      /**
       * @param tweenToEnter;
       * 记录强制切换时是否需要添加 animation;
       * 如 enter 后, leave -> enter，样式是没有发生变化，就不需要添加 animation 属性。
       */
      var _this = _possibleConstructorReturn$1(this, (QueueAnim.__proto__ || Object.getPrototypeOf(QueueAnim)).call(this, props));

      _initialiseProps$2.call(_this);

      _this.tweenToEnter = {};
      /**
       * @param leaveUnfinishedChild;
       * 记录多次切换，出场没完成动画的 key。
       */
      _this.leaveUnfinishedChild = [];
      /**
       * @param saveTweenOneTag;
       * 记录 TweenOne 标签，在 leaveUnfinishedChild 里使用，残留的元素不需要考虑 props 的变更。
       */
      _this.saveTweenOneTag = {};
      /**
       * @param enterAnimation;
       * 记录进场的动画, 在没进场完成, 将进场的动画保存，免得重新生成。
       */
      _this.enterAnimation = {};
      /**
       * @param childrenShow;
       * 记录 animation 里是否需要 startAnim;
       * 当前元素是否处在显示状态
       * enterBegin 到 leaveComplete 之前都处于显示状态
       */
      _this.childrenShow = {};
      /**
       * @param keysToEnter;
       * 记录进场的 key;
       */
      _this.keysToEnter = [];
      /**
       * @param keysToLeave;
       * 记录出场的 key;
       */
      _this.keysToLeave = [];
      /**
       * @param keysToEnterPaused;
       * 记录在进入时是否处理暂停状态
       */
      _this.keysToEnterPaused = {};
      /**
       * @param placeholderTimeoutIds;
       * 进场时 deley 的 timeout 记录;
       */
      _this.placeholderTimeoutIds = {};
      // 第一次进入，默认进场
      var children = toArrayChildren$1(getChildrenFromProps$1(props));
      var childrenShow = {};
      children.forEach(function (child) {
        if (!child || !child.key) {
          return;
        }
        if (_this.props.appear) {
          _this.keysToEnter.push(child.key);
        } else {
          childrenShow[child.key] = true;
          _this.tweenToEnter[child.key] = true;
        }
      });
      _this.keysToEnterToCallback = [].concat(_toConsumableArray(_this.keysToEnter));
      _this.originalChildren = toArrayChildren$1(getChildrenFromProps$1(props));
      _this.state = {
        children: children,
        childrenShow: childrenShow
      };
      return _this;
    }

    _createClass$1(QueueAnim, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.appear) {
          this.componentDidUpdate();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var nextChildren = toArrayChildren$1(nextProps.children).filter(function (item) {
          return item;
        });
        var currentChildren = this.originalChildren.filter(function (item) {
          return item;
        });
        if (this.state.children.length) {
          /**
           * 多次刷新处理
           * 如果 state.children 里还有元素，元素还在动画，当前子级加回在出场的子级;
           */
          var leaveChild = this.state.children.filter(function (item) {
            return item && _this2.keysToLeave.indexOf(item.key) >= 0;
          });
          this.leaveUnfinishedChild = leaveChild.map(function (item) {
            return item.key;
          });
          /**
           * 获取 leaveChild 在 state.children 里的序列，再将 leaveChild 和 currentChildren 的重新排序。
           * 避逸 state.children 在 leaveComplete 里没全部完成不触发，
           * leaveComplete 里如果动画完成了是会删除 keyToLeave，但 state.children 是在全部出场后才触发清除，
           * 所以这里需要处理出场完成的元素做清除。
           */
          var stateChildrens = mergeChildren$1(currentChildren, this.state.children);
          var currentChild = [];
          var childReOrder = function childReOrder(child) {
            child.forEach(function (item) {
              var order = stateChildrens.indexOf(item);
              // -1 不应该出现的情况，直接插入数组后面.
              if (order === -1) {
                currentChild.push(item);
              } else {
                currentChild.splice(order, 0, item);
              }
            });
          };
          childReOrder(leaveChild);
          childReOrder(currentChildren);
          currentChildren = currentChild.filter(function (c) {
            return c;
          });
        }
        var newChildren = mergeChildren$1(currentChildren, nextChildren);

        var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
        this.keysToEnterPaused = {};
        var emptyBool = !nextChildren.length && !currentChildren.length && this.state.children.length;
        /**
         * 在出场没结束时，childrenShow 里的值将不会清除。
         * 再触发进场时， childrenShow 里的值是保留着的, 设置了 forcedReplay 将重新播放进场。
         */
        if (!emptyBool) {
          // 空子级状态下刷新不做处理
          var nextKeys = nextChildren.map(function (c) {
            return c.key;
          });
          this.keysToLeave.forEach(function (key) {
            // 将所有在出场里的停止掉。避免间隔性出现
            if (nextKeys.indexOf(key) >= 0) {
              _this2.keysToEnterPaused[key] = true;
              currentChildren = currentChildren.filter(function (item) {
                return item.key !== key;
              });
              if (nextProps.forcedReplay) {
                // 清掉所有出场的。
                delete childrenShow[key];
              }
            }
          });
        }

        this.keysToEnter = [];
        this.keysToLeave = [];

        // need render to avoid update
        this.setState({
          childrenShow: childrenShow,
          children: newChildren
        });

        nextChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasPrev = findChildInChildrenByKey$1(currentChildren, key);
          if (!hasPrev && key) {
            _this2.keysToEnter.push(key);
          }
        });

        currentChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasNext = findChildInChildrenByKey$1(nextChildren, key);
          if (!hasNext && key) {
            _this2.keysToLeave.push(key);
            ticker$1.clear(_this2.placeholderTimeoutIds[key]);
            delete _this2.placeholderTimeoutIds[key];
          }
        });
        this.keysToEnterToCallback = [].concat(_toConsumableArray(this.keysToEnter));
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.originalChildren = toArrayChildren$1(getChildrenFromProps$1(this.props));
        var keysToEnter = [].concat(_toConsumableArray(this.keysToEnter));
        var keysToLeave = [].concat(_toConsumableArray(this.keysToLeave));
        keysToEnter.forEach(this.performEnter);
        keysToLeave.forEach(this.performLeave);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this3 = this;

        Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
          ticker$1.clear(_this3.placeholderTimeoutIds[key]);
        });
        this.keysToEnter = [];
        this.keysToLeave = [];
        this.childrenShow = {};
      }
    }, {
      key: 'getTweenType',
      value: function getTweenType(type, num) {
        var data = AnimTypes[type];
        return this.getTweenAnimConfig(data, num);
      }
    }, {
      key: 'getTweenAnimConfig',
      value: function getTweenAnimConfig(data, num, enterOrLeave) {
        var _this4 = this;

        if (Array.isArray(data)) {
          return data.map(function (item) {
            return _this4.getTweenSingleConfig(item, num, enterOrLeave);
          });
        }
        return this.getTweenSingleConfig(data, num, enterOrLeave);
      }
    }, {
      key: 'render',
      value: function render() {
        var tagProps = _objectWithoutProperties$1(this.props, []);

        ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'forcedReplay', 'onEnd', 'appear'].forEach(function (key) {
          return delete tagProps[key];
        });
        var childrenToRender = toArrayChildren$1(this.state.children).map(this.getChildrenToRender);
        var props = _extends$2({}, tagProps, this.props.componentProps);
        return React.createElement(this.props.component, props, childrenToRender);
      }
    }]);

    return QueueAnim;
  }(React__default.Component);

  QueueAnim.propTypes = {
    children: propTypes.any,
    component: propTypes.any,
    componentProps: propTypes.object,
    interval: propTypes.any,
    duration: propTypes.any,
    delay: propTypes.any,
    type: propTypes.any,
    animConfig: propTypes.any,
    ease: propTypes.any,
    leaveReverse: propTypes.bool,
    forcedReplay: propTypes.bool,
    animatingClassName: propTypes.array,
    onEnd: propTypes.func,
    appear: propTypes.bool
  };
  QueueAnim.defaultProps = {
    component: 'div',
    componentProps: {},
    interval: 100,
    duration: 450,
    delay: 0,
    type: 'right',
    animConfig: null,
    ease: 'easeOutQuart',
    leaveReverse: false,
    forcedReplay: false,
    animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
    onEnd: noop$3,
    appear: true
  };

  var _initialiseProps$2 = function _initialiseProps() {
    var _this5 = this;

    this.getTweenSingleConfig = function (data, num, enterOrLeave) {
      var obj = {};
      Object.keys(data).forEach(function (key) {
        if (Array.isArray(data[key])) {
          obj[key] = data[key][num];
        } else if (!enterOrLeave && !num || enterOrLeave && num) {
          obj[key] = data[key];
        }
      });
      return obj;
    };

    this.getTweenData = function (key, i, type) {
      var props = _this5.props;
      var enterOrLeave = type === 'enter' ? 0 : 1;
      var start = type === 'enter' ? 1 : 0;
      var end = type === 'enter' ? 0 : 1;
      var animate = _this5.getAnimData(props, key, i, enterOrLeave, end);
      var startAnim = type === 'enter' && (props.forcedReplay || !_this5.childrenShow[key]) ? _this5.getAnimData(props, key, i, enterOrLeave, start) : null;
      var ease = transformArguments$1(props.ease, key, i)[enterOrLeave];
      var duration = transformArguments$1(props.duration, key, i)[enterOrLeave];
      if (Array.isArray(ease)) {
        ease = ease.map(function (num) {
          return num * 100;
        });
        ease = TweenOne.easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
      }
      return { startAnim: startAnim, animate: animate, ease: ease, duration: duration, isArray: Array.isArray(animate) };
    };

    this.getTweenSingleData = function (startAnim, animate, ease, duration, delay, onStart, onComplete) {
      var startLength = Object.keys(startAnim || {}).length;
      var animation = _extends$2({
        onStart: onStart,
        onComplete: onComplete,
        duration: duration,
        delay: delay,
        ease: ease
      }, animate);
      var startAnimate = startLength ? _extends$2({ duration: 0 }, startAnim) : null;
      return { animation: animation, startAnimate: startAnimate };
    };

    this.getTweenEnterOrLeaveData = function (key, i, delay, type) {
      var animateData = _this5.getTweenData(key, i, type);
      var startAnim = animateData.startAnim;
      var animate = animateData.animate;
      var onStart = (type === 'enter' ? _this5.enterBegin : _this5.leaveBegin).bind(_this5, key);
      var onComplete = (type === 'enter' ? _this5.enterComplete : _this5.leaveComplete).bind(_this5, key);
      if (animateData.isArray) {
        var length = animate.length - 1;
        var animation = [];
        var startArray = [];
        animate.forEach(function (leave, ii) {
          var start = startAnim && startAnim[ii];
          var animObj = _this5.getTweenSingleData(start, leave, animateData.ease, animateData.duration / length, !ii ? delay : 0, !ii ? onStart : null, ii === length ? onComplete : null);
          animation.push(animObj.animation);
          if (animObj.startAnimate) {
            startArray.push(animObj.startAnimate);
          }
        });
        return startArray.concat(animation);
      }
      animateData = _this5.getTweenSingleData(startAnim, animate, animateData.ease, animateData.duration, delay, onStart, onComplete);
      return [animateData.startAnimate, animateData.animation].filter(function (item) {
        return item;
      });
    };

    this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
      /**
       * transformArguments 第一个为 enter, 第二个为 leave；
       * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
       * 用 tween-one 的数组来实现老的动画逻辑。。。
       */
      return props.animConfig ? _this5.getTweenAnimConfig(transformArguments$1(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType(transformArguments$1(props.type, key, i)[enterOrLeave], startOrEnd);
    };

    this.getChildrenToRender = function (child) {
      var _props = _this5.props,
          forcedReplay = _props.forcedReplay,
          leaveReverse = _props.leaveReverse,
          delay = _props.delay,
          interval = _props.interval;

      if (!child || !child.key) {
        return child;
      }
      var key = child.key;
      if (!_this5.state.childrenShow[key]) {
        return null;
      }
      var i = _this5.keysToLeave.indexOf(key);
      var animation = void 0;
      var isFunc = typeof child.type === 'function';
      var forcedJudg = isFunc ? {} : null;
      if (isFunc) {
        Object.keys(child.type).forEach(function (name) {
          if (typeDefault.indexOf(name) === -1) {
            forcedJudg[name] = child.type[name];
          }
        });
      }
      // 处理出场
      if (i >= 0) {
        if (_this5.leaveUnfinishedChild.indexOf(key) >= 0) {
          return _this5.saveTweenOneTag[key];
        }
        var $interval = transformArguments$1(interval, key, i)[1];
        var $delay = transformArguments$1(delay, key, i)[1];
        // 减掉 leaveUnfinishedChild 里的个数，因为 leaveUnfinishedChild 是旧的出场，不应该计录在队列里。
        var order = (leaveReverse ? _this5.keysToLeave.length - i - 1 : i) - _this5.leaveUnfinishedChild.length;
        $delay = $interval * order + $delay;
        animation = _this5.getTweenEnterOrLeaveData(key, i, $delay, 'leave');
      } else {
        // 处理进场;
        i = _this5.keysToEnterToCallback.indexOf(key);
        // appear=false 时，设定 childrenShow 和 tweenToEnter 都为 true, 这里不渲染 animation;
        if (_this5.tweenToEnter[key] && !forcedReplay) {
          // 如果是已进入的，将直接返回标签。。
          return React.createElement(TweenOne, {
            key: key,
            component: child.type,
            forcedJudg: forcedJudg,
            componentProps: child.props
          });
        } else if (!_this5.tweenToEnter[key]) {
          animation = _this5.enterAnimation[key] || _this5.getTweenEnterOrLeaveData(key, i, 0, 'enter');
          _this5.enterAnimation[key] = animation;
        }
      }
      var paused = _this5.keysToEnterPaused[key] && _this5.keysToLeave.indexOf(key) === -1;
      animation = paused ? null : animation;
      var tag = React.createElement(TweenOne, {
        key: key,
        component: child.type,
        forcedJudg: forcedJudg,
        componentProps: child.props,
        animation: animation
      });
      _this5.saveTweenOneTag[key] = tag;
      return tag;
    };

    this.performEnter = function (key, i) {
      var interval = transformArguments$1(_this5.props.interval, key, i)[0];
      var delay = transformArguments$1(_this5.props.delay, key, i)[0];
      _this5.placeholderTimeoutIds[key] = ticker$1.timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
      if (_this5.keysToEnter.indexOf(key) >= 0) {
        _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
      }
    };

    this.performEnterBegin = function (key) {
      var childrenShow = _this5.state.childrenShow;
      childrenShow[key] = true;
      delete _this5.keysToEnterPaused[key];
      ticker$1.clear(_this5.placeholderTimeoutIds[key]);
      delete _this5.placeholderTimeoutIds[key];
      _this5.setState({ childrenShow: childrenShow });
    };

    this.performLeave = function (key) {
      ticker$1.clear(_this5.placeholderTimeoutIds[key]);
      delete _this5.placeholderTimeoutIds[key];
    };

    this.enterBegin = function (key, e) {
      var elem = e.target;
      var animatingClassName = _this5.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[1], '');
      if (elem.className.indexOf(animatingClassName[0]) === -1) {
        elem.className = (elem.className + ' ' + animatingClassName[0]).trim();
      }
      _this5.childrenShow[key] = true;
    };

    this.enterComplete = function (key, e) {
      if (_this5.keysToEnterPaused[key] || _this5.keysToLeave.indexOf(key) >= 0) {
        return;
      }
      var elem = e.target;
      elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
      _this5.tweenToEnter[key] = true;
      delete _this5.enterAnimation[key];
      _this5.props.onEnd({ key: key, type: 'enter', target: elem });
    };

    this.leaveBegin = function (key, e) {
      var elem = e.target;
      var animatingClassName = _this5.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[0], '');
      if (elem.className.indexOf(animatingClassName[1]) === -1) {
        elem.className = (elem.className + ' ' + animatingClassName[1]).trim();
      }
      delete _this5.tweenToEnter[key];
    };

    this.leaveComplete = function (key, e) {
      // 切换时同时触发 onComplete。 手动跳出。。。
      if (_this5.keysToEnterToCallback.indexOf(key) >= 0) {
        return;
      }
      var childrenShow = _this5.state.childrenShow;
      delete childrenShow[key];
      delete _this5.saveTweenOneTag[key];
      delete _this5.childrenShow[key];
      if (_this5.keysToLeave.indexOf(key) >= 0) {
        _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
      }
      var needLeave = _this5.keysToLeave.some(function (c) {
        return childrenShow[c];
      });
      if (!needLeave) {
        var currentChildren = toArrayChildren$1(getChildrenFromProps$1(_this5.props));
        _this5.setState({
          children: currentChildren,
          childrenShow: childrenShow
        });
      }
      var elem = e.target;
      elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
      _this5.props.onEnd({ key: key, type: 'leave', target: elem });
    };
  };

  QueueAnim.isQueueAnim = true;

  // export this package's api

  /*!
   * perfect-scrollbar v1.4.0
   * (c) 2018 Hyunje Jun
   * @license MIT
   */
  function get(element) {
    return getComputedStyle(element);
  }

  function set(element, obj) {
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'number') {
        val = val + "px";
      }
      element.style[key] = val;
    }
    return element;
  }

  function div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  }

  var elMatches =
    typeof Element !== 'undefined' &&
    (Element.prototype.matches ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector);

  function matches(element, query) {
    if (!elMatches) {
      throw new Error('No element matching method supported');
    }

    return elMatches.call(element, query);
  }

  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
    );
  }

  var cls = {
    main: 'ps',
    element: {
      thumb: function (x) { return ("ps__thumb-" + x); },
      rail: function (x) { return ("ps__rail-" + x); },
      consuming: 'ps__child--consume',
    },
    state: {
      focus: 'ps--focus',
      clicking: 'ps--clicking',
      active: function (x) { return ("ps--active-" + x); },
      scrolling: function (x) { return ("ps--scrolling-" + x); },
    },
  };

  /*
   * Helper methods
   */
  var scrollingClassTimeout = { x: null, y: null };

  function addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = cls.state.scrolling(x);

    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x]);
    } else {
      classList.add(className);
    }
  }

  function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(
      function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
      i.settings.scrollingThreshold
    );
  }

  function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
  }

  var EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
  };

  var prototypeAccessors = { isEmpty: { configurable: true } };

  EventElement.prototype.bind = function bind (eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  };

  EventElement.prototype.unbind = function unbind (eventName, target) {
      var this$1 = this;

    this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };

  EventElement.prototype.unbindAll = function unbindAll () {
      var this$1 = this;

    for (var name in this$1.handlers) {
      this$1.unbind(name);
    }
  };

  prototypeAccessors.isEmpty.get = function () {
      var this$1 = this;

    return Object.keys(this.handlers).every(
      function (key) { return this$1.handlers[key].length === 0; }
    );
  };

  Object.defineProperties( EventElement.prototype, prototypeAccessors );

  var EventManager = function EventManager() {
    this.eventElements = [];
  };

  EventManager.prototype.eventElement = function eventElement (element) {
    var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };

  EventManager.prototype.bind = function bind (element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };

  EventManager.prototype.unbind = function unbind (element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };

  EventManager.prototype.unbindAll = function unbindAll () {
    this.eventElements.forEach(function (e) { return e.unbindAll(); });
    this.eventElements = [];
  };

  EventManager.prototype.once = function once (element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function (evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };

  function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name);
    } else {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
      return evt;
    }
  }

  var processScrollDiff = function(
    i,
    axis,
    diff,
    useScrollingClass,
    forceFireReachEvent
  ) {
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var fields;
    if (axis === 'top') {
      fields = [
        'contentHeight',
        'containerHeight',
        'scrollTop',
        'y',
        'up',
        'down' ];
    } else if (axis === 'left') {
      fields = [
        'contentWidth',
        'containerWidth',
        'scrollLeft',
        'x',
        'left',
        'right' ];
    } else {
      throw new Error('A proper axis should be provided');
    }

    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
  };

  function processScrollDiff$1(
    i,
    diff,
    ref,
    useScrollingClass,
    forceFireReachEvent
  ) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var element = i.element;

    // reset reach
    i.reach[y] = null;

    // 1 for subpixel rounding
    if (element[scrollTop] < 1) {
      i.reach[y] = 'start';
    }

    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
      i.reach[y] = 'end';
    }

    if (diff) {
      element.dispatchEvent(createEvent(("ps-scroll-" + y)));

      if (diff < 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + up)));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + down)));
      }

      if (useScrollingClass) {
        setScrollingClassInstantly(i, y);
      }
    }

    if (i.reach[y] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
    }
  }

  function toInt(x) {
    return parseInt(x, 10) || 0;
  }

  function isEditable(el) {
    return (
      matches(el, 'input,[contenteditable]') ||
      matches(el, 'select,[contenteditable]') ||
      matches(el, 'textarea,[contenteditable]') ||
      matches(el, 'button,[contenteditable]')
    );
  }

  function outerWidth(element) {
    var styles = get(element);
    return (
      toInt(styles.width) +
      toInt(styles.paddingLeft) +
      toInt(styles.paddingRight) +
      toInt(styles.borderLeftWidth) +
      toInt(styles.borderRightWidth)
    );
  }

  var env = {
    isWebKit:
      typeof document !== 'undefined' &&
      'WebkitAppearance' in document.documentElement.style,
    supportsTouch:
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
    supportsIePointer:
      typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome:
      typeof navigator !== 'undefined' &&
      /Chrome/i.test(navigator && navigator.userAgent),
  };

  var updateGeometry = function(i) {
    var element = i.element;
    var roundedScrollTop = Math.floor(element.scrollTop);

    i.containerWidth = element.clientWidth;
    i.containerHeight = element.clientHeight;
    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;

    if (!element.contains(i.scrollbarXRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarYRail);
    }

    if (
      !i.settings.suppressScrollX &&
      i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
    ) {
      i.scrollbarXActive = true;
      i.railXWidth = i.containerWidth - i.railXMarginWidth;
      i.railXRatio = i.containerWidth / i.railXWidth;
      i.scrollbarXWidth = getThumbSize(
        i,
        toInt(i.railXWidth * i.containerWidth / i.contentWidth)
      );
      i.scrollbarXLeft = toInt(
        (i.negativeScrollAdjustment + element.scrollLeft) *
          (i.railXWidth - i.scrollbarXWidth) /
          (i.contentWidth - i.containerWidth)
      );
    } else {
      i.scrollbarXActive = false;
    }

    if (
      !i.settings.suppressScrollY &&
      i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
    ) {
      i.scrollbarYActive = true;
      i.railYHeight = i.containerHeight - i.railYMarginHeight;
      i.railYRatio = i.containerHeight / i.railYHeight;
      i.scrollbarYHeight = getThumbSize(
        i,
        toInt(i.railYHeight * i.containerHeight / i.contentHeight)
      );
      i.scrollbarYTop = toInt(
        roundedScrollTop *
          (i.railYHeight - i.scrollbarYHeight) /
          (i.contentHeight - i.containerHeight)
      );
    } else {
      i.scrollbarYActive = false;
    }

    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
      i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
      i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }

    updateCss(element, i);

    if (i.scrollbarXActive) {
      element.classList.add(cls.state.active('x'));
    } else {
      element.classList.remove(cls.state.active('x'));
      i.scrollbarXWidth = 0;
      i.scrollbarXLeft = 0;
      element.scrollLeft = 0;
    }
    if (i.scrollbarYActive) {
      element.classList.add(cls.state.active('y'));
    } else {
      element.classList.remove(cls.state.active('y'));
      i.scrollbarYHeight = 0;
      i.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  };

  function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
  }

  function updateCss(element, i) {
    var xRailOffset = { width: i.railXWidth };
    var roundedScrollTop = Math.floor(element.scrollTop);

    if (i.isRtl) {
      xRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth -
        i.contentWidth;
    } else {
      xRailOffset.left = element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
      xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    } else {
      xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    }
    set(i.scrollbarXRail, xRailOffset);

    var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
    if (i.isScrollbarYUsingRight) {
      if (i.isRtl) {
        yRailOffset.right =
          i.contentWidth -
          (i.negativeScrollAdjustment + element.scrollLeft) -
          i.scrollbarYRight -
          i.scrollbarYOuterWidth;
      } else {
        yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i.isRtl) {
        yRailOffset.left =
          i.negativeScrollAdjustment +
          element.scrollLeft +
          i.containerWidth * 2 -
          i.contentWidth -
          i.scrollbarYLeft -
          i.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
      }
    }
    set(i.scrollbarYRail, yRailOffset);

    set(i.scrollbarX, {
      left: i.scrollbarXLeft,
      width: i.scrollbarXWidth - i.railBorderXWidth,
    });
    set(i.scrollbarY, {
      top: i.scrollbarYTop,
      height: i.scrollbarYHeight - i.railBorderYWidth,
    });
  }

  var clickRail = function(i) {
    i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
      var positionTop =
        e.pageY -
        window.pageYOffset -
        i.scrollbarYRail.getBoundingClientRect().top;
      var direction = positionTop > i.scrollbarYTop ? 1 : -1;

      i.element.scrollTop += direction * i.containerHeight;
      updateGeometry(i);

      e.stopPropagation();
    });

    i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
      var positionLeft =
        e.pageX -
        window.pageXOffset -
        i.scrollbarXRail.getBoundingClientRect().left;
      var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

      i.element.scrollLeft += direction * i.containerWidth;
      updateGeometry(i);

      e.stopPropagation();
    });
  };

  var dragThumb = function(i) {
    bindMouseScrollHandler(i, [
      'containerWidth',
      'contentWidth',
      'pageX',
      'railXWidth',
      'scrollbarX',
      'scrollbarXWidth',
      'scrollLeft',
      'x',
      'scrollbarXRail' ]);
    bindMouseScrollHandler(i, [
      'containerHeight',
      'contentHeight',
      'pageY',
      'railYHeight',
      'scrollbarY',
      'scrollbarYHeight',
      'scrollTop',
      'y',
      'scrollbarYRail' ]);
  };

  function bindMouseScrollHandler(
    i,
    ref
  ) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];

    var element = i.element;

    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;

    function mouseMoveHandler(e) {
      element[scrollTop] =
        startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
      addScrollingClass(i, y);
      updateGeometry(i);

      e.stopPropagation();
      e.preventDefault();
    }

    function mouseUpHandler() {
      removeScrollingClass(i, y);
      i[scrollbarYRail].classList.remove(cls.state.clicking);
      i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }

    i.event.bind(i[scrollbarY], 'mousedown', function (e) {
      startingScrollTop = element[scrollTop];
      startingMousePageY = e[pageY];
      scrollBy =
        (i[contentHeight] - i[containerHeight]) /
        (i[railYHeight] - i[scrollbarYHeight]);

      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

      i[scrollbarYRail].classList.add(cls.state.clicking);

      e.stopPropagation();
      e.preventDefault();
    });
  }

  var keyboard = function(i) {
    var element = i.element;

    var elementHovered = function () { return matches(element, ':hover'); };
    var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

    function shouldPreventDefault(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      if (deltaX === 0) {
        if (!i.scrollbarYActive) {
          return false;
        }
        if (
          (scrollTop === 0 && deltaY > 0) ||
          (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }

      var scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i.scrollbarXActive) {
          return false;
        }
        if (
          (scrollLeft === 0 && deltaX < 0) ||
          (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }
      return true;
    }

    i.event.bind(i.ownerDocument, 'keydown', function (e) {
      if (
        (e.isDefaultPrevented && e.isDefaultPrevented()) ||
        e.defaultPrevented
      ) {
        return;
      }

      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }

      var activeElement = document.activeElement
        ? document.activeElement
        : i.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === 'IFRAME') {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          // go deeper if element is a webcomponent
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }

      var deltaX = 0;
      var deltaY = 0;

      switch (e.which) {
        case 37: // left
          if (e.metaKey) {
            deltaX = -i.contentWidth;
          } else if (e.altKey) {
            deltaX = -i.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38: // up
          if (e.metaKey) {
            deltaY = i.contentHeight;
          } else if (e.altKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39: // right
          if (e.metaKey) {
            deltaX = i.contentWidth;
          } else if (e.altKey) {
            deltaX = i.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40: // down
          if (e.metaKey) {
            deltaY = -i.contentHeight;
          } else if (e.altKey) {
            deltaY = -i.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32: // space bar
          if (e.shiftKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = -i.containerHeight;
          }
          break;
        case 33: // page up
          deltaY = i.containerHeight;
          break;
        case 34: // page down
          deltaY = -i.containerHeight;
          break;
        case 36: // home
          deltaY = i.contentHeight;
          break;
        case 35: // end
          deltaY = -i.contentHeight;
          break;
        default:
          return;
      }

      if (i.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i.settings.suppressScrollY && deltaY !== 0) {
        return;
      }

      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i);

      if (shouldPreventDefault(deltaX, deltaY)) {
        e.preventDefault();
      }
    });
  };

  var wheel = function(i) {
    var element = i.element;

    function shouldPreventDefault(deltaX, deltaY) {
      var roundedScrollTop = Math.floor(element.scrollTop);
      var isTop = element.scrollTop === 0;
      var isBottom =
        roundedScrollTop + element.offsetHeight === element.scrollHeight;
      var isLeft = element.scrollLeft === 0;
      var isRight =
        element.scrollLeft + element.offsetWidth === element.scrollWidth;

      var hitsBound;

      // pick axis with primary direction
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }

      return hitsBound ? !i.settings.wheelPropagation : true;
    }

    function getDeltaFromEvent(e) {
      var deltaX = e.deltaX;
      var deltaY = -1 * e.deltaY;

      if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
        // OS X Safari
        deltaX = -1 * e.wheelDeltaX / 6;
        deltaY = e.wheelDeltaY / 6;
      }

      if (e.deltaMode && e.deltaMode === 1) {
        // Firefox in deltaMode 1: Line scrolling
        deltaX *= 10;
        deltaY *= 10;
      }

      if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
        // IE in some mouse drivers
        deltaX = 0;
        deltaY = e.wheelDelta;
      }

      if (e.shiftKey) {
        // reverse axis with shift key
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      // FIXME: this is a workaround for <select> issue in FF and IE #571
      if (!env.isWebKit && element.querySelector('select:focus')) {
        return true;
      }

      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);
        var overflow = [style.overflow, style.overflowX, style.overflowY].join(
          ''
        );

        // if scrollable
        if (overflow.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              !(cursor.scrollTop === 0 && deltaY > 0) &&
              !(cursor.scrollTop === maxScrollTop && deltaY < 0)
            ) {
              return true;
            }
          }
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              !(cursor.scrollLeft === 0 && deltaX < 0) &&
              !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function mousewheelHandler(e) {
      var ref = getDeltaFromEvent(e);
      var deltaX = ref[0];
      var deltaY = ref[1];

      if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
        return;
      }

      var shouldPrevent = false;
      if (!i.settings.useBothWheelAxes) {
        // deltaX will only be used for horizontal scrolling and deltaY will
        // only be used for vertical scrolling - this is the default
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else if (i.scrollbarYActive && !i.scrollbarXActive) {
        // only vertical scrollbar is active and useBothWheelAxes option is
        // active, so let's scroll vertical bar using both mouse wheel axes
        if (deltaY) {
          element.scrollTop -= deltaY * i.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i.scrollbarXActive && !i.scrollbarYActive) {
        // useBothWheelAxes and only horizontal bar is active, so use both
        // wheel axes for horizontal bar
        if (deltaX) {
          element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }

      updateGeometry(i);

      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e.ctrlKey) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    if (typeof window.onwheel !== 'undefined') {
      i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
      i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
  };

  var touch = function(i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }

    var element = i.element;

    function shouldPrevent(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      var scrollLeft = element.scrollLeft;
      var magnitudeX = Math.abs(deltaX);
      var magnitudeY = Math.abs(deltaY);

      if (magnitudeY > magnitudeX) {
        // user is perhaps trying to swipe up/down the page

        if (
          (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
          (deltaY > 0 && scrollTop === 0)
        ) {
          // set prevent for mobile Chrome refresh
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {
        // user is perhaps trying to swipe left/right across the page

        if (
          (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
          (deltaX > 0 && scrollLeft === 0)
        ) {
          return true;
        }
      }

      return true;
    }

    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;

      updateGeometry(i);
    }

    var startOffset = {};
    var startTime = 0;
    var speed = {};
    var easingLoop = null;

    function getTouch(e) {
      if (e.targetTouches) {
        return e.targetTouches[0];
      } else {
        // Maybe IE pointer
        return e;
      }
    }

    function shouldHandle(e) {
      if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
        return false;
      }
      if (e.targetTouches && e.targetTouches.length === 1) {
        return true;
      }
      if (
        e.pointerType &&
        e.pointerType !== 'mouse' &&
        e.pointerType !== e.MSPOINTER_TYPE_MOUSE
      ) {
        return true;
      }
      return false;
    }

    function touchStart(e) {
      if (!shouldHandle(e)) {
        return;
      }

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);
        var overflow = [style.overflow, style.overflowX, style.overflowY].join(
          ''
        );

        // if scrollable
        if (overflow.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              !(cursor.scrollTop === 0 && deltaY > 0) &&
              !(cursor.scrollTop === maxScrollTop && deltaY < 0)
            ) {
              return true;
            }
          }
          var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              !(cursor.scrollLeft === 0 && deltaX < 0) &&
              !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function touchMove(e) {
      if (shouldHandle(e)) {
        var touch = getTouch(e);

        var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

        var differenceX = currentOffset.pageX - startOffset.pageX;
        var differenceY = currentOffset.pageY - startOffset.pageY;

        if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
          return;
        }

        applyTouchMove(differenceX, differenceY);
        startOffset = currentOffset;

        var currentTime = new Date().getTime();

        var timeGap = currentTime - startTime;
        if (timeGap > 0) {
          speed.x = differenceX / timeGap;
          speed.y = differenceY / timeGap;
          startTime = currentTime;
        }

        if (shouldPrevent(differenceX, differenceY)) {
          e.preventDefault();
        }
      }
    }
    function touchEnd() {
      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function() {
          if (i.isInitialized) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }

    if (env.supportsTouch) {
      i.event.bind(element, 'touchstart', touchStart);
      i.event.bind(element, 'touchmove', touchMove);
      i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i.event.bind(element, 'pointerdown', touchStart);
        i.event.bind(element, 'pointermove', touchMove);
        i.event.bind(element, 'pointerup', touchEnd);
      } else if (window.MSPointerEvent) {
        i.event.bind(element, 'MSPointerDown', touchStart);
        i.event.bind(element, 'MSPointerMove', touchMove);
        i.event.bind(element, 'MSPointerUp', touchEnd);
      }
    }
  };

  var defaultSettings = function () { return ({
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: true,
    wheelSpeed: 1,
  }); };

  var handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch,
  };

  var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if ( userSettings === void 0 ) userSettings = {};

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize PerfectScrollbar');
    }

    this.element = element;

    element.classList.add(cls.main);

    this.settings = defaultSettings();
    for (var key in userSettings) {
      this$1.settings[key] = userSettings[key];
    }

    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;

    var focus = function () { return element.classList.add(cls.state.focus); };
    var blur = function () { return element.classList.remove(cls.state.focus); };

    this.isRtl = get(element).direction === 'rtl';
    this.isNegativeScroll = (function () {
      var originalScrollLeft = element.scrollLeft;
      var result = null;
      element.scrollLeft = -1;
      result = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result;
    })();
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? element.scrollWidth - element.clientWidth
      : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;

    this.scrollbarXRail = div(cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth =
      toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    set(this.scrollbarXRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, { display: '' });
    this.railXWidth = null;
    this.railXRatio = null;

    this.scrollbarYRail = div(cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth =
      toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, { display: 'block' });
    this.railYMarginHeight =
      toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, { display: '' });
    this.railYHeight = null;
    this.railYRatio = null;

    this.reach = {
      x:
        element.scrollLeft <= 0
          ? 'start'
          : element.scrollLeft >= this.contentWidth - this.containerWidth
            ? 'end'
            : null,
      y:
        element.scrollTop <= 0
          ? 'start'
          : element.scrollTop >= this.contentHeight - this.containerHeight
            ? 'end'
            : null,
    };

    this.isAlive = true;

    this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
    updateGeometry(this);
  };

  PerfectScrollbar.prototype.update = function update () {
    if (!this.isAlive) {
      return;
    }

    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? this.element.scrollWidth - this.element.clientWidth
      : 0;

    // Recalculate rail margins
    set(this.scrollbarXRail, { display: 'block' });
    set(this.scrollbarYRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(get(this.scrollbarXRail).marginLeft) +
      toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight =
      toInt(get(this.scrollbarYRail).marginTop) +
      toInt(get(this.scrollbarYRail).marginBottom);

    // Hide scrollbars not to affect scrollWidth and scrollHeight
    set(this.scrollbarXRail, { display: 'none' });
    set(this.scrollbarYRail, { display: 'none' });

    updateGeometry(this);

    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);

    set(this.scrollbarXRail, { display: '' });
    set(this.scrollbarYRail, { display: '' });
  };

  PerfectScrollbar.prototype.onScroll = function onScroll (e) {
    if (!this.isAlive) {
      return;
    }

    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(
      this,
      'left',
      this.element.scrollLeft - this.lastScrollLeft
    );

    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
  };

  PerfectScrollbar.prototype.destroy = function destroy () {
    if (!this.isAlive) {
      return;
    }

    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();

    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;

    this.isAlive = false;
  };

  PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
    this.element.className = this.element.className
      .split(' ')
      .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
      .join(' ');
  };

  var scrollbar = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



  var _react2 = _interopRequireDefault(React__default);





  var _perfectScrollbar2 = _interopRequireDefault(PerfectScrollbar);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var handlerNameByEvent = {
    'ps-scroll-y': 'onScrollY',
    'ps-scroll-x': 'onScrollX',
    'ps-scroll-up': 'onScrollUp',
    'ps-scroll-down': 'onScrollDown',
    'ps-scroll-left': 'onScrollLeft',
    'ps-scroll-right': 'onScrollRight',
    'ps-y-reach-start': 'onYReachStart',
    'ps-y-reach-end': 'onYReachEnd',
    'ps-x-reach-start': 'onXReachStart',
    'ps-x-reach-end': 'onXReachEnd'
  };
  Object.freeze(handlerNameByEvent);

  var ScrollBar = function (_Component) {
    _inherits(ScrollBar, _Component);

    function ScrollBar(props) {
      _classCallCheck(this, ScrollBar);

      var _this = _possibleConstructorReturn(this, (ScrollBar.__proto__ || Object.getPrototypeOf(ScrollBar)).call(this, props));

      _this.handleRef = _this.handleRef.bind(_this);
      _this._handlerByEvent = {};
      return _this;
    }

    _createClass(ScrollBar, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.option) {
          console.warn('react-perfect-scrollbar: the "option" prop has been deprecated in favor of "options"');
        }

        this._ps = new _perfectScrollbar2.default(this._container, this.props.options || this.props.option);
        // hook up events
        this._updateEventHook();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        this._updateEventHook(prevProps);
        this._ps.update();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this2 = this;

        // unhook up evens
        Object.keys(this._handlerByEvent).forEach(function (key) {
          var value = _this2._handlerByEvent[key];

          if (value) {
            _this2._container.removeEventListener(key, value, false);
          }
        });
        this._handlerByEvent = {};
        this._ps.destroy();
        this._ps = null;
      }
    }, {
      key: '_updateEventHook',
      value: function _updateEventHook() {
        var _this3 = this;

        var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // hook up events
        Object.keys(handlerNameByEvent).forEach(function (key) {
          var callback = _this3.props[handlerNameByEvent[key]];
          var prevCallback = prevProps[handlerNameByEvent[key]];
          if (callback !== prevCallback) {
            if (prevCallback) {
              var prevHandler = _this3._handlerByEvent[key];
              _this3._container.removeEventListener(key, prevHandler, false);
              _this3._handlerByEvent[key] = null;
            }
            if (callback) {
              var handler = function handler() {
                return callback(_this3._container);
              };
              _this3._container.addEventListener(key, handler, false);
              _this3._handlerByEvent[key] = handler;
            }
          }
        });
      }
    }, {
      key: 'updateScroll',
      value: function updateScroll() {
        this._ps.update();
      }
    }, {
      key: 'handleRef',
      value: function handleRef(ref) {
        this._container = ref;
        this.props.containerRef(ref);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            component = _props.component,
            className = _props.className,
            style = _props.style;

        var Comp = component;

        return _react2.default.createElement(
          Comp,
          { style: style, className: 'scrollbar-container ' + className, ref: this.handleRef },
          children
        );
      }
    }]);

    return ScrollBar;
  }(React__default.Component);

  exports.default = ScrollBar;


  ScrollBar.defaultProps = {
    className: '',
    style: undefined,
    option: undefined,
    options: undefined,
    containerRef: function containerRef() {},
    onScrollY: undefined,
    onScrollX: undefined,
    onScrollUp: undefined,
    onScrollDown: undefined,
    onScrollLeft: undefined,
    onScrollRight: undefined,
    onYReachStart: undefined,
    onYReachEnd: undefined,
    onXReachStart: undefined,
    onXReachEnd: undefined,
    component: 'div'
  };

  ScrollBar.propTypes = {
    children: propTypes.PropTypes.node.isRequired,
    className: propTypes.PropTypes.string,
    style: propTypes.PropTypes.object,
    option: propTypes.PropTypes.object,
    options: propTypes.PropTypes.object,
    containerRef: propTypes.PropTypes.func,
    onScrollY: propTypes.PropTypes.func,
    onScrollX: propTypes.PropTypes.func,
    onScrollUp: propTypes.PropTypes.func,
    onScrollDown: propTypes.PropTypes.func,
    onScrollLeft: propTypes.PropTypes.func,
    onScrollRight: propTypes.PropTypes.func,
    onYReachStart: propTypes.PropTypes.func,
    onYReachEnd: propTypes.PropTypes.func,
    onXReachStart: propTypes.PropTypes.func,
    onXReachEnd: propTypes.PropTypes.func,
    component: propTypes.PropTypes.string
  };
  module.exports = exports['default'];
  });

  unwrapExports(scrollbar);

  var lib = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });



  var _scrollbar2 = _interopRequireDefault(scrollbar);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _scrollbar2.default;
  module.exports = exports['default'];
  });

  var ScrollBar = unwrapExports(lib);

  var css$3 = ".index_menu_box__3YEiA {\n  padding-right: 16px;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  -webkit-box-flex: 1;\n          flex: 1;\n  padding-bottom: 6px;\n  border-top: 1px solid #e6eaf1;\n}\n.index_menu_box__3YEiA::-webkit-scrollbar-thumb {\n  background-color: transparent;\n}\n.index_menu_box__3YEiA:hover::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.index_menu_box__3YEiA .ant-menu-inline {\n  border-right: none;\n}\n.index_menu_box__3YEiA .ant-menu {\n  background-color: transparent;\n}\n.index_menu_box__3YEiA .ant-menu .icon {\n  font-size: 16px !important;\n  display: inline-block;\n  font-style: normal;\n  vertical-align: baseline;\n  text-align: center;\n  text-transform: none;\n  line-height: 1;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  min-width: 16px;\n  margin-right: 8px;\n  -webkit-transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.index_menu_box__3YEiA .ant-menu .name {\n  -webkit-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  opacity: 1;\n}\n.index_menu_box__3YEiA .ant-menu .ant-menu-item {\n  padding-left: 28px !important;\n  border-top-right-radius: 40px;\n  border-bottom-right-radius: 40px;\n}\n.index_menu_box__3YEiA .ant-menu .ant-menu-sub .ant-menu-item {\n  padding-left: 76px !important;\n}\n.index_menu_box__3YEiA .ant-menu .ant-menu-submenu-title {\n  padding-left: 32px !important;\n}\n.index_menu_box__3YEiA .ant-menu .ant-menu-item .anticon,\n.index_menu_box__3YEiA .ant-menu .ant-menu-submenu-title .anticon,\n.index_menu_box__3YEiA .ant-menu .iconfont {\n  margin-right: 8px;\n  width: 14px;\n}\n.index_menu_box__3YEiA .ant-menu-submenu > .ant-menu {\n  background-color: transparent;\n}\n.index_menu_box__3YEiA .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {\n  background-color: #fff;\n}\n.index_menu_box__3YEiA .ant-menu-inline .ant-menu-item:after,\n.index_menu_box__3YEiA .ant-menu-vertical .ant-menu-item:after {\n  display: block;\n  width: 0;\n  height: 100%;\n  border-width: 2px;\n  border-style: solid;\n  border-color: #286cff;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.index_menu_box__3YEiA .ant-menu-item-group-title {\n  padding-left: 28px !important;\n  color: #888888;\n}\n.index_menu_box__3YEiA .ant-menu-item-group:last-child {\n  border-bottom: 0;\n}\n";
  var styles$3 = {"menu_box":"index_menu_box__3YEiA"};
  styleInject(css$3);

  var Item = _Menu.Item,
      SubMenu = _Menu.SubMenu,
      ItemGroup = _Menu.ItemGroup;

  var GMenu =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(GMenu, _PureComponent);

    function GMenu() {
      var _this;

      _classCallCheck(this, GMenu);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GMenu).apply(this, arguments));

      _this.getComponent = function (data) {
        return data.map(function (v) {
          switch (v.type) {
            case 'subitem':
              return React__default.createElement(SubMenu, {
                key: v.key,
                title: v.component
              }, _this.getComponent(v.childs));

            case 'group':
              return React__default.createElement(ItemGroup, {
                key: v.key,
                title: v.component
              }, _this.getComponent(v.childs));

            case 'item':
              return React__default.createElement(Item, {
                key: v.key
              }, v.component);

            default:
              return null;
          }
        });
      };

      return _this;
    }

    _createClass(GMenu, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            width = _this$props.width,
            data = _this$props.data,
            props = _objectWithoutProperties(_this$props, ["width", "data"]);

        return React__default.createElement("div", {
          className: styles$3.menu_box,
          style: {
            width: width
          }
        }, React__default.createElement(ScrollBar, {
          options: {
            suppressScrollX: true
          }
        }, React__default.createElement(QueueAnim, {
          component: _Menu,
          componentProps: _objectSpread({}, props, {
            mode: "inline",
            style: {
              height: '100%'
            }
          }),
          animConfig: [{
            opacity: [1, 0],
            translateX: [0, -250]
          }, {
            opacity: [1, 0],
            translateX: [0, 250]
          }]
        }, this.getComponent(data))));
      }
    }]);

    return GMenu;
  }(React.PureComponent);

  GMenu.defaultProps = {
    width: '100%',
    data: []
  };

  var css$4 = ".index_box__1sBna {\n  background: #fff;\n  margin: 8px;\n  border-radius: 8px;\n}\n.index_box__1sBna .index_avatar__1CyHm .anticon {\n  min-width: auto;\n  margin: 0;\n  font-size: inherit;\n}\n.index_box__1sBna .ant-menu {\n  padding: 0;\n  border-radius: 8px;\n}\n.index_box__1sBna .index_namespace__JhzLx {\n  width: 100%;\n  padding-left: 4px;\n}\n.index_box__1sBna .index_namespace__JhzLx .ant-descriptions-item {\n  padding: 0;\n  line-height: 40px;\n  height: 40px;\n}\n.index_box__1sBna .index_namespace__JhzLx .ant-descriptions-item .ant-descriptions-item-content {\n  width: calc(100% - 72px);\n}\n";
  var styles$4 = {"box":"index_box__1sBna","avatar":"index_avatar__1CyHm","namespace":"index_namespace__JhzLx"};
  styleInject(css$4);

  var colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  var default_1 =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(default_1, _PureComponent);

    function default_1() {
      var _this;

      _classCallCheck(this, default_1);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(default_1).apply(this, arguments));
      _this.state = {
        color: colorList[parseInt("".concat(Math.random() * 10)) % 4]
      };
      return _this;
    }

    _createClass(default_1, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
          this.setState({
            color: colorList[parseInt("".concat(Math.random() * 10)) % 4]
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            name = _this$props.name,
            trial = _this$props.trial,
            admin = _this$props.admin,
            guestName = _this$props.guestName,
            children = _this$props.children;
        var color = this.state.color;
        return React__default.createElement("div", {
          className: "".concat(styles$4.box)
        }, React__default.createElement(_Menu, {
          selectedKeys: []
        }, React__default.createElement(_Menu.SubMenu, {
          title: React__default.createElement(React.Fragment, null, React__default.createElement(_Avatar, {
            className: styles$4.avatar,
            style: {
              backgroundColor: color
            },
            icon: "user"
          }), React__default.createElement(_Typography.Text, {
            style: {
              marginLeft: 8,
              verticalAlign: 'middle'
            },
            strong: true
          }, React__default.createElement(_Tag, {
            style: {
              padding: '0 5px'
            },
            color: admin ? "red" : "#286cff"
          }, admin ? '管理员' : '平台用户'), React__default.createElement(_Typography.Text, null, name)))
        }, React__default.createElement(_Menu.Item, null, "xsdfasdfasdfasdfasdfasdfasfdasdf")), React__default.createElement(_Menu.Divider, null), React__default.createElement(_Menu.Item, null, React__default.createElement(_Descriptions, {
          className: styles$4.namespace
        }, React__default.createElement(_Descriptions.Item, {
          label: "\u5DE5\u4F5C\u7A7A\u95F4"
        }, React__default.createElement(_Dropdown, {
          placement: "bottomRight",
          overlay: React__default.createElement(_Menu, null, React__default.createElement(_Menu.Item, null, React__default.createElement("a", {
            target: "_blank",
            rel: "noopener noreferrer",
            href: "http://www.alipay.com/"
          }, "1st menu item")))
        }, React__default.createElement("a", {
          className: "ant-dropdown-link",
          href: "#"
        }, React__default.createElement(_Typography.Text, {
          style: {
            float: "left",
            color: 'inherit',
            width: 'calc(100% - 14px)'
          },
          ellipsis: true
        }, "xxxxxxxxxxxxxxxxx"), React__default.createElement(_Icon, {
          style: {
            display: "inline-block"
          },
          type: "down"
        }))))))), children);
      }
    }]);

    return default_1;
  }(React.PureComponent);
  default_1.defaultProps = {
    trial: true
  };

  var css$5 = ".index_layout__1SSEr {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #fff;\n}\n.index_header__16wnI {\n  position: absolute;\n  right: 0;\n  z-index: 2;\n  height: auto;\n  width: auto;\n  background-color: transparent;\n  padding: 8px 16px;\n  line-height: 24px;\n}\n.index_sider__3imGm {\n  background-color: #f2f7fb;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);\n  -webkit-transition: all 0.4s ease-out;\n  transition: all 0.4s ease-out;\n  width: 100%;\n  height: 100%;\n  -webkit-box-flex: 0;\n          flex: 0 0 100%;\n  max-width: 100%;\n}\n.index_drawer_sider__2Qh_t .ant-drawer-content-wrapper {\n  background-color: #f2f7fb;\n}\n.index_drawer_sider__2Qh_t .ant-drawer-content-wrapper .ant-drawer-wrapper-body {\n  background-color: #f2f7fb;\n}\n.index_open__1RGl8.index_btn__1xu5T {\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);\n}\n.index_open__1RGl8.index_btn__1xu5T .index_icon__3dp2p {\n  background: transparent;\n}\n.index_open__1RGl8.index_btn__1xu5T .index_icon__3dp2p:after {\n  -webkit-transform: translateY(5px) rotate(45deg);\n          transform: translateY(5px) rotate(45deg);\n}\n.index_open__1RGl8.index_btn__1xu5T .index_icon__3dp2p:before {\n  -webkit-transform: translateY(-5px) rotate(-45deg);\n          transform: translateY(-5px) rotate(-45deg);\n}\n.index_drawer__16Rkt .ant-drawer-content-wrapper {\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\n.index_drawer__16Rkt.index_open__1RGl8 .index_ant-drawer-content-wrapper__3l8T6 {\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n}\n.index_btn__1xu5T {\n  position: absolute;\n  right: -40px;\n  top: 72px;\n  width: 40px;\n  height: 40px;\n  cursor: pointer;\n  pointer-events: auto;\n  text-align: center;\n  line-height: 40px;\n  font-size: 16px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  background: #fff;\n  border-radius: 0 4px 4px 0;\n  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);\n  z-index: 100000;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);\n  transition: -webkit-transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);\n  transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);\n  transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7), -webkit-transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);\n}\n.index_btn__1xu5T .index_icon__3dp2p {\n  width: 14px;\n  height: 2px;\n  background: #333;\n  position: relative;\n  -webkit-transition: background 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  transition: background 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n}\n.index_btn__1xu5T .index_icon__3dp2p:after,\n.index_btn__1xu5T .index_icon__3dp2p:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  background: #333;\n  width: 100%;\n  height: 2px;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86), -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n}\n.index_btn__1xu5T .index_icon__3dp2p:after {\n  top: -5px;\n}\n.index_btn__1xu5T .index_icon__3dp2p:before {\n  top: 5px;\n}\n";
  var styles$5 = {"layout":"index_layout__1SSEr","header":"index_header__16wnI","sider":"index_sider__3imGm","drawer_sider":"index_drawer_sider__2Qh_t","open":"index_open__1RGl8","btn":"index_btn__1xu5T","icon":"index_icon__3dp2p","drawer":"index_drawer__16Rkt","ant-drawer-content-wrapper":"index_ant-drawer-content-wrapper__3l8T6"};
  styleInject(css$5);

  var Btn = function Btn(_ref) {
    var open = _ref.open,
        onClick = _ref.onClick;
    return React.createElement("div", {
      className: "".concat(styles$5.btn, " ").concat(open && styles$5.open),
      onClick: onClick
    }, React.createElement("i", {
      className: styles$5.icon
    }));
  };

  var SiderDrawerItem =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(SiderDrawerItem, _React$PureComponent);

    function SiderDrawerItem() {
      var _this;

      _classCallCheck(this, SiderDrawerItem);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SiderDrawerItem).apply(this, arguments));
      _this.state = {
        init: false,
        visible: false
      };

      _this.changeVisible = function () {
        _this.setState({
          visible: !_this.state.visible
        }, function () {
          _this.props.onChange(_this.state.visible);
        });
      };

      return _this;
    }

    _createClass(SiderDrawerItem, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setState({
          init: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            show = _this$props.show,
            realWidth = _this$props.realWidth,
            sider = _this$props.sider,
            children = _this$props.children,
            onChange = _this$props.onChange,
            props = _objectWithoutProperties(_this$props, ["show", "realWidth", "sider", "children", "onChange"]);

        var _this$state = this.state,
            init = _this$state.init,
            visible = _this$state.visible;
        return React.createElement(React.Fragment, null, React.createElement(_Drawer, _extends({}, props, {
          className: "media-sider-drawer ".concat(styles$5.drawer_sider, " ").concat(init ? '' : styles$5.drawer),
          bodyStyle: {
            padding: 0
          },
          visible: !init ? true : visible,
          closable: false,
          placement: "left",
          width: realWidth,
          onClose: this.changeVisible
        }), show && React.createElement(Btn, {
          open: visible,
          onClick: this.changeVisible
        }), children, React.cloneElement(sider, {
          changeVisible: this.changeVisible
        })));
      }
    }]);

    return SiderDrawerItem;
  }(React.PureComponent);

  SiderDrawerItem.defaultProps = {
    show: true,
    sider: undefined,
    realWidth: 210,
    onChange: function onChange() {
      return null;
    }
  };

  window.sider_drawers = window.sider_drawers || [];
  var state, setState, matches$1, setMatches;

  function getDrawersElement(_ref, show) {
    var _ref2 = _slicedToArray(_ref, 2),
        data = _ref2[0],
        children = _ref2[1];

    if (!data) return null;

    var _useState = React.useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        s = _useState2[0],
        set = _useState2[1];

    if (!!children) {
      return React.createElement(SiderDrawerItem, _extends({
        show: show[0],
        onChange: set
      }, data), getDrawersElement(children, [s, set]));
    }

    return React.createElement(SiderDrawerItem, _extends({
      show: show[0]
    }, data));
  }

  var SiderDrawer = function SiderDrawer() {
    var _useState3 = React.useState(window.sider_drawers);

    var _useState4 = _slicedToArray(_useState3, 2);

    var _useState4$ = _useState4[0];
    state = _useState4$ === void 0 ? [] : _useState4$;
    setState = _useState4[1];
    var data = [state[0], undefined];

    for (var i = 1; i <= state.length - 1; i++) {
      data = [state[i], data];
    }

    var _useState5 = React.useState(true);

    var _useState6 = _slicedToArray(_useState5, 2);

    matches$1 = _useState6[0];
    setMatches = _useState6[1];
    return getDrawersElement(data, [matches$1, setMatches]);
  };

  var create$2 = function create(data, level) {
    window.sider_drawers[level] = data;
    if (setState) setState(window.sider_drawers.filter(function (v) {
      return !!v;
    }));
  };
  var SiderDrawer$1 = (function () {
    var ms = document.getElementById("media-siders");

    if (!ms) {
      ms = document.createElement('div');
      ms.id = "media-siders";
      document.body.appendChild(ms);
    }

    return ReactDom.createPortal(React.createElement(SiderDrawer, {
      key: "media-siders"
    }), ms);
  });

  var Sider =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Sider, _React$PureComponent);

    function Sider() {
      var _this;

      _classCallCheck(this, Sider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Sider).apply(this, arguments));

      _this.updateSiderDrawer = function (props) {
        var matches = props.matches,
            level = props.level,
            realWidth = props.realWidth,
            children = props.children;
        if (!children) return;

        if (!matches) {
          var ms = document.getElementById("media-siders");
          if (ms) ReactDom.unmountComponentAtNode(ms);
        } else {
          create$2(Object.assign({}, {
            sider: children,
            realWidth: realWidth
          }), level);
        }
      };

      return _this;
    }

    _createClass(Sider, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(_ref) {
        var children = _ref.children,
            props = _objectWithoutProperties(_ref, ["children"]);

        var _this$props = this.props,
            _children = _this$props.children,
            _props = _objectWithoutProperties(_this$props, ["children"]);

        if (JSON.stringify(_props) !== JSON.stringify(props)) {
          this.updateSiderDrawer(_objectSpread({
            children: children
          }, props));
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateSiderDrawer(this.props);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            level = _this$props2.level,
            loading = _this$props2.loading,
            matches = _this$props2.matches,
            width = _this$props2.width,
            children = _this$props2.children;
        if (!children) return null;

        if (matches) {
          return React.createElement(SiderDrawer$1, null);
        } else {
          return React.createElement(_Layout.Sider, {
            className: styles$5.sider,
            style: {
              backgroundColor: Sider.backgroundColors[level]
            },
            width: width,
            collapsedWidth: 0
          }, React.createElement(QueueAnim, {
            style: {
              height: '100%'
            },
            type: "alpha",
            duration: 600
          }, loading ? React.createElement(Loading, {
            key: "loading"
          }) : React.cloneElement(children, {
            key: 'children'
          })));
        }
      }
    }]);

    return Sider;
  }(React.PureComponent);

  Sider.backgroundColors = ["#ecf0f6", "#f2f7fb"];
  Sider.defaultProps = {
    level: 0,
    loading: false,
    matches: false
  };

  var default_1$1 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(default_1, _React$PureComponent);

    function default_1() {
      var _this;

      _classCallCheck(this, default_1);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(default_1).apply(this, arguments));
      _this.state = {
        init: false,
        open: false
      };

      _this.changeOpen = function () {
        _this.setState({
          open: !_this.state.open
        });
      };

      _this.getCentent = function () {
        var _this$props = _this.props,
            level = _this$props.level,
            state = _this$props.state,
            matches = _this$props.matches,
            width = _this$props.width,
            empty = _this$props.empty,
            sider = _this$props.sider,
            header = _this$props.header,
            className = _this$props.className,
            children = _this$props.children;

        switch (state) {
          case 'initially':
          case 'centent':
            return React.createElement(React.Fragment, null, state === "initially" && React.createElement(Loading, {
              key: "loading"
            }), React.createElement(_Layout, {
              className: styles$5.layout,
              style: {
                display: state === "centent" ? "flex" : "none'"
              }
            }, React.createElement(Sider, {
              level: level,
              matches: matches,
              loading: state === "initially" || !_this.state.init,
              width: state === "centent" && _this.state.init ? matches ? 0 : width : '100%',
              realWidth: width
            }, sider), React.createElement(_Layout.Content, {
              className: className,
              style: {
                position: 'relative',
                minHeight: "100%"
              }
            }, children)));

          case 'empty':
            return empty || React.createElement(_Empty, {
              key: "empty"
            });

          default:
            return React.createElement(Loading, {
              key: "loading"
            });
        }
      };

      return _this;
    }

    _createClass(default_1, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(_ref) {
        var _this2 = this;

        var state = _ref.state;

        if (state === "centent") {
          setTimeout(function () {
            _this2.setState({
              init: true
            });
          }, 450);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        if (this.props.state === "centent") {
          setTimeout(function () {
            _this3.setState({
              init: true
            });
          }, 450);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(QueueAnim, {
          type: "alpha",
          className: styles$5.layout
        }, this.getCentent());
      }
    }]);

    return default_1;
  }(React.PureComponent);
  default_1$1.defaultProps = {
    state: 'initially',
    matches: false,
    width: 210
  };

  exports.Layout = default_1$1;
  exports.Loading = Loading;
  exports.Logo = Logo;
  exports.Menu = GMenu;
  exports.Page = Page;
  exports.User = default_1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

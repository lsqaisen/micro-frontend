(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('antd/es/page-header/style'), require('antd/es/page-header'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'antd/es/page-header/style', 'antd/es/page-header', 'react'], factory) :
  (global = global || self, factory(global.library = {}, null, global.window.antd.PageHeader, global.window.React));
}(this, function (exports, style, _PageHeader, React) { 'use strict';

  _PageHeader = _PageHeader && _PageHeader.hasOwnProperty('default') ? _PageHeader['default'] : _PageHeader;

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

  exports.Page = Page;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

(function(e){function t(t){for(var n,r,a=t[0],i=t[1],u=0,c=[];u<a.length;u++)r=a[u],o[r]&&c.push(o[r][0]),o[r]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);s&&s(t);while(c.length)c.shift()()}var n={},r={stack_stack:0},o={stack_stack:0};function a(e){return i.p+""+({stack_ex:"ex",stack_pages:"pages",stack_vendors:"vendors",stack_list:"list"}[e]||e)+".0a748928.async.js"}function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(e){var t=[],n={stack_ex:1,stack_pages:1,stack_list:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var o=({stack_ex:"ex",stack_pages:"pages",stack_vendors:"vendors",stack_list:"list"}[e]||e)+"."+{stack_ex:"427ee895",stack_pages:"3492ad63",stack_vendors:"31d6cfe0",stack_list:"deab1e17"}[e]+".chunk.css",a=i.p+o,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var l=u[c],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===o||s===a))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],s=l.getAttribute("data-href");if(s===o||s===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.request=o,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){r[e]=0}));var u=o[e];if(0!==u)if(u)t.push(u[2]);else{var c=new Promise(function(t,n){u=o[e]=[t,n]});t.push(u[2]=c);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=a(e),l=function(t){s.onerror=s.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[e]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:s})},12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/lib/stack/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=c;i(i.s=0)})({0:function(e,t,n){e.exports=n("2wcK")},"16Al":function(e,t,n){"use strict";var r=n("WbBG");function o(){}e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},"17x9":function(e,t,n){e.exports=n("16Al")()},"2wcK":function(e,t,n){"use strict";var r=n("TqRt"),o=r(n("xKz9"));window.g_umi=window.g_umi||{},window.g_umi.monorepo=window.g_umi.monorepo||[],window.g_umi.monorepo.push({routes:[{path:"/stack/ex",exact:!0,component:(0,o.default)({loader:()=>n.e("stack_ex").then(n.t.bind(null,"y3E4",7))})},{path:"/stack/",exact:!0,component:(0,o.default)({loader:()=>n.e("stack_pages").then(n.t.bind(null,"RXBc",7))})},{path:"/stack/list",exact:!0,component:(0,o.default)({loader:()=>Promise.all([n.e("stack_vendors"),n.e("stack_list")]).then(n.t.bind(null,"p4Pg",7))})}],models:[n("J6RZ").default,n("3CgE").default],menus:{name:"stack",data:n("CYzG").default}})},"3CgE":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={namespace:"stackex",state:{data:["chencheng","pigcan"],list:[1,2,3,4]}};t.default=r},CYzG:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={key:"stack",name:"\u5e94\u7528",children:[{key:"ex",name:"\u989d\u5916\u7528\u4f8b",children:null},{key:"list",name:"\u5217\u8868",children:[{key:"detail",name:"\u8be6\u60c5"}]}]};t.default=r},CnBM:function(e,t,n){"use strict";var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n("cDcd"),c=n("17x9"),l=[],s=[];function d(e){return"object"===r(n.m)&&e().every(function(e){return"undefined"!==typeof e&&"undefined"!==typeof n.m[e]})}function f(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(function(e){return n.loading=!1,n.loaded=e,e}).catch(function(e){throw n.loading=!1,n.error=e,e}),n}function p(e){var t={loading:!1,loaded:{},error:null},n=[];try{Object.keys(e).forEach(function(r){var o=f(e[r]);o.loading?t.loading=!0:(t.loaded[r]=o.loaded,t.error=o.error),n.push(o.promise),o.promise.then(function(e){t.loaded[r]=e}).catch(function(e){t.error=e})})}catch(e){t.error=e}return t.promise=Promise.all(n).then(function(e){return t.loading=!1,e}).catch(function(e){throw t.loading=!1,e}),t}function y(e){return e&&e.__esModule?e.default:e}function h(e,t){return u.createElement(y(e),t)}function m(e,t){var n,r;if(!t.loading)throw new Error("react-loadable requires a `loading` component");var f=Object.assign({loader:null,loading:null,delay:200,timeout:null,render:h,webpack:null,modules:null},t),p=null;function y(){return p||(p=e(f.loader)),p.promise}return l.push(y),"function"===typeof f.webpack&&s.push(function(){if(d(f.webpack))return y()}),r=n=function(t){function n(r){o(this,n);var i=a(this,t.call(this,r));return i.retry=function(){i.setState({error:null,loading:!0,timedOut:!1}),p=e(f.loader),i._loadModule()},y(),i.state={error:p.error,pastDelay:!1,timedOut:!1,loading:p.loading,loaded:p.loaded},i}return i(n,t),n.preload=function(){return y()},n.prototype.componentWillMount=function(){this._mounted=!0,this._loadModule()},n.prototype._loadModule=function(){var e=this;if(this.context.loadable&&Array.isArray(f.modules)&&f.modules.forEach(function(t){e.context.loadable.report(t)}),p.loading){"number"===typeof f.delay&&(0===f.delay?this.setState({pastDelay:!0}):this._delay=setTimeout(function(){e.setState({pastDelay:!0})},f.delay)),"number"===typeof f.timeout&&(this._timeout=setTimeout(function(){e.setState({timedOut:!0})},f.timeout));var t=function(){e._mounted&&(e.setState({error:p.error,loaded:p.loaded,loading:p.loading}),e._clearTimeouts())};p.promise.then(function(){t()}).catch(function(e){t()})}},n.prototype.componentWillUnmount=function(){this._mounted=!1,this._clearTimeouts()},n.prototype._clearTimeouts=function(){clearTimeout(this._delay),clearTimeout(this._timeout)},n.prototype.render=function(){return this.state.loading||this.state.error?u.createElement(f.loading,{isLoading:this.state.loading,pastDelay:this.state.pastDelay,timedOut:this.state.timedOut,error:this.state.error,retry:this.retry}):this.state.loaded?f.render(this.state.loaded,this.props):null},n}(u.Component),n.contextTypes={loadable:c.shape({report:c.func.isRequired})},r}function b(e){return m(f,e)}function g(e){if("function"!==typeof e.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return m(p,e)}b.Map=g;var v=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return i(t,e),t.prototype.getChildContext=function(){return{loadable:{report:this.props.report}}},t.prototype.render=function(){return u.Children.only(this.props.children)},t}(u.Component);function _(e){var t=[];while(e.length){var n=e.pop();t.push(n())}return Promise.all(t).then(function(){if(e.length)return _(e)})}v.propTypes={report:c.func.isRequired},v.childContextTypes={loadable:c.shape({report:c.func.isRequired}).isRequired},b.Capture=v,b.preloadAll=function(){return new Promise(function(e,t){_(l).then(e,t)})},b.preloadReady=function(){return new Promise(function(e,t){_(s).then(e,e)})},e.exports=b},J6RZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={namespace:"stack",state:{data:["chencheng","pigcan"],list:[1,2,3,4]}};t.default=r},TqRt:function(e,t){function n(e){return e&&e.__esModule?e:{default:e}}e.exports=n},WbBG:function(e,t,n){"use strict";var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=r},cDcd:function(e,t){e.exports=window.React},kJSe:function(e,t){e.exports=window.dva},xKz9:function(e,t,n){"use strict";n.r(t);var r=n("cDcd"),o=n.n(r),a=n("CnBM"),i=n.n(a);function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}t["default"]=function(e,t){var n=i.a,r={loading:function(e){e.error,e.isLoading;return o.a.createElement("p",null,"loading...")}};if("function"===typeof e.then?r.loader=function(){return e}:"object"===l(e)&&(r=u({},r,e)),r=u({},r,t),e.render&&(r.render=function(t,n){return e.render(n,t)}),e.modules){n=i.a.Map;var a={},c=e.modules();Object.keys(c).forEach(function(e){var t=c[e];"function"!==typeof t.then?a[e]=t:a[e]=function(){return t.then(function(e){return e.default||e})}}),r.loader=a}return n(r)}}});
declare module '*.less';
declare module 'react-dom';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';
declare module 'rc-animate';
declare module 'lodash.debounce';


interface Window {
  mife_menus?: object;
  Number: any;
}

declare var window: Window;
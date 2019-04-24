declare module '*.less';
declare module 'react-dom';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';
declare module 'lodash';
declare module 'rc-animate';


interface Window {
  mife_menus?: object;
  Number: any;
}

declare var window: Window;
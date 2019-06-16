declare module '*.less';
declare module 'react-dom';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';
declare module 'rc-animate';
declare module 'inputmask';
declare module 'lodash.debounce';
declare module 'react-time-format';
declare function MODEL(namspace: string): string;

interface Window {
  mife_menus?: object;
  Number: any;
  sider_drawers: {
    [key: string]: any;
  };
}
declare var window: Window;
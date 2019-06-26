declare module '*.less';
declare module 'react-dom';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';
declare module 'rc-animate';
declare module 'inputmask';
declare module 'lodash.debounce';


interface Window {
  mife_menus?: {
    [key: string]: any;
  };
  web_type: string;
  Number: any;
  sider_drawers: {
    [key: string]: any;
  };
}

declare var window: Window;
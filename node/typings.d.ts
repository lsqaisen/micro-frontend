declare module '*.less';
declare module 'react-dom';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';

interface Window {
  mife_menus?: object;
}

declare var window: Window;
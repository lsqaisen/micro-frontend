declare module '*.less';
declare module 'react-lifecycles-compat';
declare module 'mife/bin/api';
declare module 'lodash.debounce';
declare module 'roadhog-api-doc';

interface Window {
  mife_menus?: object;
  Number: any;
  historyListen: boolean;
}

declare var window: Window;
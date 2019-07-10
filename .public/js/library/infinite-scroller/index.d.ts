import * as React from 'react';
declare type Options = {
    useCapture: boolean;
    passive: boolean;
} | boolean;
export interface InfiniteScrollProps {
    children: React.ReactNode;
    element?: React.ReactNode;
    hasMore?: boolean;
    initialLoad?: boolean;
    isReverse?: boolean;
    loader?: React.ReactNode;
    loadMore: (page: number) => any;
    pageStart?: number;
    ref?: (ref: any) => any;
    getScrollParent?: () => any;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
}
export default class extends React.PureComponent<InfiniteScrollProps, any> {
    static readonly defaultProps: {
        element: string;
        hasMore: boolean;
        initialLoad: boolean;
        pageStart: number;
        ref: null;
        threshold: number;
        useWindow: boolean;
        isReverse: boolean;
        useCapture: boolean;
        loader: null;
        getScrollParent: null;
    };
    pageLoaded: number | undefined;
    options: Options | undefined;
    loadMore: boolean | undefined;
    scrollComponent: any;
    beforeScrollHeight: any;
    beforeScrollTop: any;
    defaultLoader: any;
    constructor(props: InfiniteScrollProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    isPassiveSupported: () => boolean;
    eventListenerOptions: () => any;
    setDefaultLoader: (loader: any) => void;
    detachMousewheelListener: () => void;
    detachScrollListener: () => void;
    getParentElement: (el: any) => any;
    filterProps: (props: any) => any;
    attachScrollListener: () => void;
    mousewheelListener: (e: any) => void;
    scrollListener: () => void;
    calculateOffset: (el: any, scrollTop: any) => any;
    calculateTopPosition: (el: any) => any;
    render(): React.ComponentElement<any, React.Component<any, any, any>>;
}
export {};

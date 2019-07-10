import * as React from 'react';
import { SiderProps } from './sider';
export interface LayoutProps extends SiderProps {
    empty?: any;
    state: 'initially' | 'centent' | 'empty';
    className?: string;
    sider: string | React.ReactNode;
    header?: string | React.ReactNode;
}
export default class extends React.PureComponent<LayoutProps, any> {
    static readonly defaultProps: {
        state: string;
        matches: boolean;
        width: number;
    };
    state: {
        init: boolean;
        open: boolean;
    };
    changeOpen: () => void;
    getCentent: () => any;
    UNSAFE_componentWillReceiveProps({ state }: LayoutProps): void;
    componentDidMount(): void;
    render(): JSX.Element;
}

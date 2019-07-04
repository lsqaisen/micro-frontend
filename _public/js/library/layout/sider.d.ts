import * as React from 'react';
export interface SiderProps {
    children?: any;
    level: number;
    loading?: boolean;
    matches: boolean;
    realWidth?: number | string;
    width?: number | string;
}
declare class Sider extends React.PureComponent<SiderProps, any> {
    static backgroundColors: string[];
    static readonly defaultProps: SiderProps;
    updateSiderDrawer: (props: SiderProps) => void;
    UNSAFE_componentWillReceiveProps({ children, ...props }: SiderProps): void;
    componentDidMount(): void;
    render(): JSX.Element | null;
}
export default Sider;

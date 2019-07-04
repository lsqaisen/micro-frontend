import * as React from 'react';
import { DrawerProps } from 'antd/lib/drawer';
export interface SiderDrawerItemProps extends DrawerProps {
    show: boolean;
    sider: undefined | string | React.ReactElement;
    realWidth?: string | number;
    onChange?: (value: boolean) => void;
}
declare class SiderDrawerItem extends React.PureComponent<SiderDrawerItemProps, any> {
    static readonly defaultProps: SiderDrawerItemProps;
    state: {
        init: boolean;
        visible: boolean;
    };
    changeVisible: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default SiderDrawerItem;

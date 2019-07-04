import { PureComponent } from 'react';
import { MenuProps } from 'antd/lib/menu';
export interface ItemData {
    type: 'group' | 'item' | 'subitem';
    key: string;
    component: React.ReactNode | (() => React.ReactNode) | string;
    childs?: ItemData[];
}
export interface GMenuProps extends MenuProps {
    width: number | string;
    data: ItemData[];
}
declare class GMenu extends PureComponent<GMenuProps, any> {
    static readonly defaultProps: GMenuProps;
    getComponent: (data: ItemData[]) => (JSX.Element | null)[];
    render(): JSX.Element;
}
export default GMenu;

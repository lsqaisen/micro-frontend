import * as React from 'react';
import { PureComponent } from 'react';
import { TableProps } from 'antd/lib/table';
export interface ActionTableProps<T> extends TableProps<T> {
    loading?: boolean;
    actionType?: 'button' | 'dropdown';
    actionText?: string;
    actions?: React.ReactNode | (() => React.ReactNode);
}
declare class ActionTable<T = any> extends PureComponent<ActionTableProps<T>, any> {
    static Actions: any;
    static readonly defaultProps: ActionTableProps<any>;
    state: {
        selectIndex: number;
        visibles: {
            [key: string]: boolean;
        };
    };
    render(): JSX.Element;
}
export default ActionTable;

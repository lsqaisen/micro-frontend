import { PureComponent } from 'react';
import { TableProps } from 'antd/lib/table';
import 'rc-table/assets/animation.css';
import './style/index.less';
declare class ATable<T> extends PureComponent<TableProps<T>, any> {
    static Actions: undefined;
    render(): JSX.Element;
}
export default ATable;

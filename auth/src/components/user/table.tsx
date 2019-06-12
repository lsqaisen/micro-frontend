import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Divider, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Link from 'umi/link';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';


interface IUser {
  key: number;
  name: string;
}

interface UserTableData {
  total: number;
  data?: IUser[];
}

export type UserProps = {
  type?: number,
  list: UserTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class User extends PureComponent<UserProps, any> {
  state = {
    selectUserIndex: 0,
    visible: false,
  }
  columns: ColumnProps<IUser>[] = [
  ];
  render() {
    const { loading, list, actions, children, ...props } = this.props;
    const { total = 0, data = [] } = list;
    const { selectUserIndex, visible } = this.state;
    return (
      <Fragment>
        <Table<IUser>
          {...props}
          pagination={{ total }}
          loading={loading}
          columns={this.columns}
          dataSource={data.map((v: IUser) => ({ key: v.name, ...v }))}
        />
        {children && React.cloneElement(children as any, {
          visible,
          node: data[selectUserIndex] || {},
          onClose: () => { this.setState({ selectUserIndex: 0, visible: false }) },
        })}
      </Fragment>
    )
  }
}

export default User;


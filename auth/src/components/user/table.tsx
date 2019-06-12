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
  list?: IUser[];
}

export type UserProps = {
  type?: number,
  data: UserTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class User extends PureComponent<UserProps, any> {
  state = {
    selectUserIndex: 0,
    visible: false,
  }
  columns: ColumnProps<IUser>[] = [
    {
      title: '帐号',
      dataIndex: 'username',
      key: 'username',
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: t => {
        switch (t) {
          case 0:
            return '空间用户';
          case 1:
            return '系统用户';
          case 2:
            return '空间用户';
          case 3:
            return '外部用户';
        }
      },
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      key: 'realname',
      width: '10%',
    },
    {
      title: '备注',
      dataIndex: 'comment',
      key: 'comment',
      width: '15%',
      render: t => {
        return t == '' ? '--' : t;
      },
    },
  ];
  render() {
    const { loading, data, actions, children, ...props } = this.props;
    const { selectUserIndex, visible } = this.state;
    const { list, total } = data;
    return (
      <Fragment>
        <Table<IUser>
          {...props}
          pagination={{ total }}
          loading={loading}
          columns={this.columns}
          dataSource={list!.map((v: IUser) => ({ key: v.name, ...v }))}
        />
        {children && React.cloneElement(children as any, {
          visible,
          node: list![selectUserIndex] || {},
          onClose: () => { this.setState({ selectUserIndex: 0, visible: false }) },
        })}
      </Fragment>
    )
  }
}

export default User;


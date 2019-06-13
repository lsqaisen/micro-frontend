import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';

enum UserType { "空间用户" = 1, "系统用户", "外部用户" }

interface IUser {
  key: number;
  comment: ""
  creation_time: string;
  deleted: number;
  domain: string;
  email: string;
  is_builtin: boolean;
  is_first: number;
  password: string;
  realname: string;
  reset_uuid: string;
  type: number;
  update_time: string;
  user_id: number;
  username: string;
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
    selectIndex: 0,
    visible: false,
  }
  columns: ColumnProps<IUser>[] = [
    {
      title: '帐号',
      dataIndex: 'username',
      width: 126,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 96,
        }
      }),
      render: (t, r, i) => {
        return (
          <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
        )
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 136,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 136,
        }
      }),
      render: (t, r, i) => {
        return (
          <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
        )
      },
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      width: 86,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 86,
        }
      }),
      render: (t, r, i) => (UserType[t]),
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      width: 136,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 136,
        }
      }),
      render: (t, r, i) => {
        return (
          <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'comment',
      width: 126,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 136,
        }
      }),
      render: (t, r, i) => <EllipsisTooltip title={t || '--'}>{t || '--'}</EllipsisTooltip>,
    }, {
      title: '操作',
      dataIndex: '',
      fixed: 'right',
      width: 72,
      className: "tc",
      onCell: () => {
        return {
          style: {
            minWidth: 72,
          }
        }
      },
      render: (_, r, i) => React.cloneElement(this.props.actions as any, {
        user: r,
        onSelect: () => { this.setState({ visible: true, selectIndex: i }) },
        children: (
          <a className="ant-dropdown-link" href="#" onClick={(e) => e.preventDefault()}>
            操作 <Icon type="down" />
          </a>
        )
      }),
    }
  ];
  render() {
    const { loading, data, actions, children, ...props } = this.props;
    const { selectIndex, visible } = this.state;
    const { list, total } = data;
    return (
      <Fragment>
        <Table<IUser>
          {...props}
          pagination={{ total: Number(total) }}
          loading={loading}
          columns={this.columns}
          dataSource={list!.map((v: IUser) => ({ key: v.user_id, ...v }))}
        />
        {children && React.cloneElement(children as any, {
          visible,
          user: list![selectIndex] || {},
          onClose: () => { this.setState({ selectIndex: 0, visible: false }) },
        })}
      </Fragment>
    )
  }
}

export default User;


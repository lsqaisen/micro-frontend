import * as React from 'react';
import { PureComponent } from 'react';
import { ColumnProps } from 'antd/lib/table';
import Time from 'react-time-format';
import {Table, EllipsisTooltip } from 'library';

interface ITenant {
  key: number;
  OldOwnerID: number;
  administrator: boolean;
  creation_time: string;
  deleted: number;
  description: string;
  name: string;
  owner_id: number;
  owner_name: string;
  project_id: number;
  public: number;
  repo_count: number;
  type: number;
  update_time: string;
}

interface TenantTableData {
  total: number;
  list?: ITenant[];
}

export type TenantProps = {
  type?: number,
  data: TenantTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class Tenant extends PureComponent<TenantProps, any> {
  columns: ColumnProps<ITenant>[] = [{
    title: '工作空间',
    dataIndex: 'name',
    width: 186,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 156,
        minWidth: 82,
      }
    }),
    render: (t, r, i) => {
      return (
        <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
      )
    },
  }, {
    title: '工作空间备注',
    dataIndex: 'description',
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 186,
        minWidth: 116,
      }
    }),
    render: (t, r, i) => {
      return (
        <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
      )
    },
  }, {
    title: '管理员',
    dataIndex: 'owner_name',
    width: 116,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 116,
        minWidth: 64,
      }
    }),
    render: (t, r, i) => {
      return (
        <EllipsisTooltip title={t}>{t}</EllipsisTooltip>
      )
    },
  }, {
    title: '创建时间',
    dataIndex: 'creation_time',
    width: 136,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        minWidth: 78,
        maxWidth: 136,
      }
    }),
    render: (t, r, i) => <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" />,
  }, {
    title: '更新时间',
    dataIndex: 'update_time',
    width: 136,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        minWidth: 78,
        maxWidth: 136,
      }
    }),
    render: (t, r, i) => <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" />,
  }];
  render() {
    const { loading, data, actions, children, ...props } = this.props;
    const { list, total } = data;
    return (
      <Table<ITenant>
        {...props}
        actions={actions}
        pagination={{ total: Number(total) }}
        loading={loading}
        columns={this.columns}
        dataSource={list!.map((v: ITenant) => ({ key: v.project_id, ...v }))}
      >
        {children}
      </Table>
    )
  }
}

export default Tenant;


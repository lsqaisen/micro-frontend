import * as React from 'react';
import { PureComponent } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Table, EllipsisTooltip } from 'library';

interface IList {
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

interface ListTableData {
  total: number;
  list?: IList[];
}

export type ListProps = {
  type?: number,
  data: ListTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class List extends PureComponent<ListProps, any> {
  columns: ColumnProps<IList>[] = [{
    title: '交易号',
    dataIndex: 'business_number',
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
    title: '银行卡号',
    dataIndex: 'card_number',
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
    title: '充值费用',
    dataIndex: 'quantity',
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
    title: '工作空间',
    dataIndex: 'workspace',
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
    title: '转账流水号',
    dataIndex: 'serial_number',
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
    title: '客户备注',
    dataIndex: 'remark',
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
    title: '时间',
    dataIndex: 'time',
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
    title: '状态',
    dataIndex: 'state',
    width: 100,
    onCell: () => ({
      style: {
        whiteSpace: 'nowrap',
        maxWidth: 100,
        minWidth: 100,
      }
    }),
    render: (state) => {
      switch (state) {
        case 0:
          return <span style={{ color: '#2B73F8' }}>审核中...</span>;
        case 1:
          return <span style={{ color: '#00a854' }}>充值成功</span>;
        default:
          return <span style={{ color: '#f04134' }}>充值失败</span>;
      }
    }
  }];
  render() {
    const { loading, data, actions, children, ...props } = this.props;
    const { list, total } = data;
    return (
      <Table<IList>
        {...props}
        actions={actions}
        pagination={{ total: Number(total) }}
        loading={loading}
        columns={this.columns}
        dataSource={list!.map((v: IList) => ({ key: v.project_id, ...v }))}
      >
        {children}
      </Table>
    )
  }
}

export default List;


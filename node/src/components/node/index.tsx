import { PureComponent, Component } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'dva/router';
import Table from '@/components/table';

interface hostIPS {
  address?: string;
}

interface INode {
  key: number;
  name: string;
  resources?: string[];
  tenantResources?: string[];
  hostIPS: hostIPS[];
  tenant: string;
  PodsCount: number;
}

interface NodeTableData {
  total: number;
  data?: INode[];
}

export type NodeProps = {
  type?: number,
  node: NodeTableData;
  loading: boolean;
}

class Node extends (PureComponent || Component)<NodeProps, any> {
  columns: ColumnProps<INode>[] = [
    {
      title: '节点名称',
      dataIndex: 'name',
      render: (t, r, i) => {
        return <Link to={location.hash.replace(/^#.*(\?.*)$/, `/node/${t}$1`)}>{`${t}<${(r.hostIPS[0] || { address: '--' }).address}>`}</Link>
      },
    }, {
      title: '资源池',
      dataIndex: this.props.type === 1 ? 'resources' : 'tenantResources',
      render: (t, r) => (t || []).length <= 0 ? '暂未分配' : t.join(','),
    }, {
      title: '副本数',
      dataIndex: 'PodsCount',
      width: 92,
    }, {
      title: '主机类型',
      dataIndex: 'tenant',
      width: '10%',
      render: (t) => t === '' ? '公共主机' : `私有主机，工作空间${t}`,
    },
  ];
  render() {
    const { loading, node, children, ...props } = this.props;
    const { total = 0, data = [] } = node;
    const _props = children ? {
      ...props,
      footer: () => children
    } : props;
    return (
      <Table<INode>
        {..._props}
        pagination={{ total }}
        loading={loading}
        columns={this.columns}
        dataSource={data.map((v: INode) => ({ key: v.name, ...v }))}
      />
    )
  }
}

export default Node;


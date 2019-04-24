import { PureComponent, Component, Fragment } from 'react';
import { Divider, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'dva/router';
import Table from '@/components/table';
import Chart from './chart';
import EllipsisTooltip from '@/components/ellipsis-tooltip';

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
  cpuLimits: number;
  cpuLimitsPercent: number;
  cpuPercent: number;
  cpuRequests: number;
  cpuRequestsPercent: number;
  cpuTotal: number;
  memLimits: number;
  memLimitsPercent: number;
  memPercent: number;
  memRequests: number;
  memRequestsPercent: number;
  memTotal: number;
  netPercent: number;
  status: string;
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
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          minWidth: 96,
        }
      }),
      render: (t, r, i) => {
        let text = `${t}<${(r.hostIPS[0] || { address: '--' }).address}>`;
        return (
          <EllipsisTooltip title={text}>
            <Link to={location.hash.replace(/^#.*(\?.*)$/, `/node/${t}$1`)}>{text}</Link>
          </EllipsisTooltip>
        )
      },
    }, {
      title: '资源池',
      dataIndex: this.props.type === 1 ? 'resources' : 'tenantResources',
      width: "25%",
      onCell: () => {
        return {
          style: {
            minWidth: 96
          }
        }
      },
      render: (t, r) => (t || []).length <= 0 ? '暂未分配' : t.join(','),
    }, {
      title: '副本数',
      dataIndex: 'PodsCount',
      className: 'tc',
      width: 64,
      onCell: () => {
        return {
          style: {
            minWidth: 64,
          }
        }
      },
    }, {
      title: '主机类型',
      dataIndex: 'tenant',
      width: 72,
      onCell: () => {
        return {
          style: {
            minWidth: 72,
          }
        }
      },
      render: (t) => {
        let text = t === '' ? '公共主机' : `私有主机，工作空间${t}`;
        return text;
      },
    }, {
      title: <Fragment>CPU<Divider type="vertical" />总共/申请</Fragment>,
      dataIndex: 'cpuPercent',
      width: 225,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            minWidth: 130,
          }
        }
      },
      render: (t, r) => (
        <Chart
          color="#5380ea"
          extra={`${r.cpuTotal ? `${r.cpuTotal}核` : '--'}/${r.cpuRequests}M`}
          data={[{
            title: 'cpu',
            "actual": Number(t!),
            "request": Number(r.cpuRequestsPercent!),
          }]}
        />
      )
    }, {
      title: <Fragment>内存<Divider type="vertical" />总共/申请</Fragment>,
      dataIndex: 'memPercent',
      width: 285,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            minWidth: 125,
          }
        }
      },
      render: (t, r) => (
        <Chart
          color="#3fc3cf"
          extra={`${r.memTotal ? `${r.memTotal.toFixed(2)}Gi` : '--'}/${window.Number(r.memRequests).flowCeil(2)}`}
          data={[{
            title: 'mem',
            "actual": Number(t!),
            "request": Number(r.memRequestsPercent!),
          }]}
        />
      )
    }, {
      title: '操作',
      dataIndex: '',
      fixed: 'right',
      width: 72,
      className: 'tc',
      onCell: () => {
        return {
          style: {
            minWidth: 72,
          }
        }
      },
      render: () => (
        <a href="javascript:;" className="ant-dropdown-link">
          操作 <Icon type="down" />
        </a>
      )
    }
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


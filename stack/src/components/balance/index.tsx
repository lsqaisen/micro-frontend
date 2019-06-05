import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'dva/router';
import Time from 'react-time-format';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';
import Status from '@/components/global/status';
import { createAppRequest } from '@/services/app';

interface hostIPS {
  address?: string;
}

interface Service extends createAppRequest {
  key: number;
  type: string;
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

interface ListTableData {
  total: number;
  data?: Service[];
}

export type ListProps = {
  type?: number,
  list: ListTableData;
  loading: boolean;
  actions: React.ReactNode | (() => React.ReactNode);
}

class List extends PureComponent<ListProps, any> {
  state = {
    selectListIndex: 0,
    visible: false,
  }
  columns: ColumnProps<Service>[] = [
    {
      title: '服务名称',
      dataIndex: 'name',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 126,
        }
      }),
      render: (t, r, i) => {
        return (
          <EllipsisTooltip title={t}>
            <Link to={location.hash.replace(/^#.*(\?.*)$/, `/list/${t}$1`)}>{t}</Link>
          </EllipsisTooltip>
        )
      },
    },
    {
      title: '使用镜像',
      dataIndex: 'images',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 158,
        }
      }),
      render: (t, r, i) => {
        let text = r.type !== 'service' ? '--' : r && r.containers ? r.containers.map(cntr => cntr.image).join('\n') : '未知';
        return (
          <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
        )
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      width: 128,
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 136,
        }
      }),
      render: (t, r) => <Status status={t} text={t} info={{ error: [], info: [], warning: [], success: ['abnormal'] }} />,
    },
    {
      title: '创建时间',
      dataIndex: 'creationTimestamp',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 136,
        }
      }),
      render: (t, r, i) => <Time format="YYYY-MM-DD  HH:mm" value={new Date(t)} />,
    },
    {
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
        app: r,
        onSelect: () => { this.setState({ visible: true, selectListIndex: i }) },
        children: (
          <a className="ant-dropdown-link" href="#" onClick={(e) => e.preventDefault()}>
            操作 <Icon type="down" />
          </a>
        )
      }),
    }
  ];
  render() {
    const { loading, list, actions, children, ...props } = this.props;
    const { total = 0, data = [] } = list;
    const { selectListIndex, visible } = this.state;
    return (
      <Fragment>
        <Table<Service>
          {...props}
          pagination={{ total }}
          loading={loading}
          columns={this.columns}
          dataSource={data.map((v: Service) => ({ key: v.name, ...v }))}
        />
        {children && React.cloneElement(children as any, {
          visible,
          list: data[selectListIndex] || {},
          onClose: () => { this.setState({ selectListIndex: 0, visible: false }) },
        })}
      </Fragment>
    )
  }
}

export default List;


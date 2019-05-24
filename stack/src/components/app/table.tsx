import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Divider, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'dva/router';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';

interface hostIPS {
  address?: string;
}

interface IList {
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

interface ListTableData {
  total: number;
  data?: IList[];
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
  columns: ColumnProps<IList>[] = [
    {
      title: '节点名称',
      dataIndex: 'name',
      width: '20%',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 126,
        }
      }),
      render: (t, r, i) => {
        let text = `${t}<${(r.hostIPS[0] || { address: '--' }).address}>`;
        return (
          <EllipsisTooltip title={text}>
            <Link to={location.hash.replace(/^#.*(\?.*)$/, `/list/${t}$1`)}>{text}</Link>
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
      title: '类型',
      dataIndex: 'tenant',
      width: 72,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 136,
          }
        }
      },
      render: (t) => {
        let text = t === '' ? '公共' : `${t}私有`;
        return (<EllipsisTooltip title={text}>{text}</EllipsisTooltip>)
      },
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
      render: (_, r, i) => React.cloneElement(this.props.actions as any, {
        list: r,
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
        <Table<IList>
          {...props}
          pagination={{ total }}
          loading={loading}
          columns={this.columns}
          dataSource={data.map((v: IList) => ({ key: v.name, ...v }))}
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


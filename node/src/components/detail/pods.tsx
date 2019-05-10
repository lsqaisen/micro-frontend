import { PureComponent, Fragment } from 'react';
import { Icon, Drawer } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';
import Status from '@/components/global/status';
import Containers from './containers';

interface IPod {
  key: number;
  name: string;
  podip?: string;
  podIP?: string;
  hostip?: string;
  hostIP?: string;
  restartCount: number;
  containerCount: number;
  creationTime: string;
  nameSpace: string;
  status?: string;
  phase?: string;
  startTime: string;
  containers: any[];
}

export type PodsProps = {
  pods: IPod[];
}

class Pods extends PureComponent<PodsProps, any> {
  columns: ColumnProps<IPod>[] = [
    {
      title: '副本名称',
      dataIndex: 'name',
      onCell: (r) => {
        return ({
          onClick: () => this.showContainers(r.containers!),
          style: {
            cursor: "pointer",
            whiteSpace: 'nowrap',
            maxWidth: 400,
            color: '#286cff',
          }
        })
      },
      render: (t, r) => (<EllipsisTooltip title={t}>{t}</EllipsisTooltip>)
    }, {
      title: '副本IP',
      dataIndex: 'podip',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 180,
        }
      }),
      render: (t, r) => {
        let text = !!r.podip ? r.podip : !!r.podIP ? r.podIP : '--';
        return (<EllipsisTooltip title={text}>{text}</EllipsisTooltip>)
      },
    }, {
      title: '节点IP',
      dataIndex: 'hostip',
      onCell: () => ({
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 180,
        }
      }),
      render: (t, r) => {
        let text = !!t ? t : !!r.hostIP ? r.hostIP : '--';
        return (<EllipsisTooltip title={text}>{text} </EllipsisTooltip>)
      },
    }, {
      title: '重启数',
      dataIndex: 'restartCount',
      className: "tc",
      width: 70,
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (t, r) => t ? <Status status={t} text={t} /> : <Status status={r.phase!} text={r.phase!} />,
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
  state = {
    visible: false,
    containers: [],
  }
  showContainers = (containers: any[]) => {
    console.log(containers)
    this.setState({
      visible: true,
      containers,
    })
  }
  render() {
    const { pods, ...props } = this.props;
    const { visible, containers } = this.state;
    return (
      <Fragment>
        <Table<IPod>
          {...props}
          columns={this.columns}
          dataSource={pods!.map((v: IPod) => ({ key: v.name, ...v }))}
        />
        <Drawer
          style={{ maxWidth: "calc(100% - 64px)" }}
          title="容器详情"
          width={520}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <Containers data={containers} />
        </Drawer>
      </Fragment>
    )
  }
}

export default Pods;


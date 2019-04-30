import { PureComponent, Component, Fragment } from 'react';
import { Drawer } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Table from '@/components/table';

interface InstallLog {
  key: number;
  ip: string;
  type: string;
  nodename: string;
  status: string;
}


class Install extends (PureComponent || Component)<any, any> {
  columns: ColumnProps<InstallLog>[] = [{
    title: '安装节点IP',
    dataIndex: 'ip',
    key: 'ip',
    render: (t, r) => `${t}<${r.nodename || '--'}>`,
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (t, r) => (
      ''
    ),
  }, {
    title: '操作',
    width: 64,
  }]
  state = {
    visible: false
  }
  show = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ visible: true })
  }
  close = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ visible: false })
  }
  render() {
    const { cluster, currentResource, resource = [], children } = this.props;
    const { visible } = this.state;
    return (
      <Fragment>
        <a href="" onClick={this.show}>安装详情</a>
        <Drawer
          title="安装详情"
          placement="bottom"
          height={'auto'}
          getContainer={document.getElementsByClassName('node-body')[0] as HTMLElement}
          style={{ width: 'calc(100% - 482px)' }}
          bodyStyle={{ width: 'calc(100% - 482px)' }}
          onClose={this.close}
          visible={visible}
        >
          <Table columns={this.columns} dataSource={[]} />
        </Drawer>
      </Fragment>
    )
  }
}

export default Install;
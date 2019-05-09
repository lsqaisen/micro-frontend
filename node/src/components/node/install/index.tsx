import { PureComponent, Fragment } from 'react';
import { Drawer, Badge, Modal, Divider, Icon, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Table from '@/components/table';
import Logs from './logs';
import styles from './style/index.less';

interface InstallLog {
  key: number;
  ip: string;
  type: string;
  opt: string;
  nodename: string;
  status: string;
}

interface InstallState {
  loglist: InstallLog[];
  visible: boolean;
}

export interface InstallProps {
  data: any[];
  onCancelPengding: (id: string) => any;
  onCancelInstalling: () => any;
  onDeleteRecord: (id: string) => any;
}

class Install extends PureComponent<InstallProps, InstallState> {
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
    render: (t, r) => this.getState(r.opt, t),
  }, {
    title: '操作',
    width: 84,
    render: (_, r) => {
      let o: any = '--';
      if (r.opt === "install") {
        if (r.status === "pending") o = (
          <Tooltip key="4" title="取消等待安装">
            <section>
              <Icon
                className={styles.icon}
                type="rollback"
                onClick={() => {
                  Modal.confirm({
                    title: `是否取消等待安装?`,
                    onOk: () => {
                      return new Promise(async (resolve) => {
                        await this.props.onCancelPengding(r.ip);
                        resolve();
                      })
                    },
                  })
                }} />
            </section>
          </Tooltip>
        );
        else if (r.status === "running") o = (
          <Tooltip key="3" title="取消安装">
            <Icon
              className={styles.icon}
              type="rollback"
              onClick={() => {
                Modal.confirm({
                  title: `是否取消安装?`,
                  onOk: () => {
                    return new Promise(async (resolve) => {
                      await this.props.onCancelInstalling();
                      resolve();
                    })
                  },
                })
              }} />
          </Tooltip>
        );
        else o = (
          <Tooltip key="2" title="删除安装记录">
            <Icon
              className={styles.icon}
              type="delete"
              onClick={() => {
                Modal.confirm({
                  title: `是否删除安装记录?`,
                  okType: 'danger',
                  onOk: () => {
                    return new Promise(async (resolve) => {
                      await this.props.onDeleteRecord(r.ip);
                      resolve();
                    })
                  },
                })
              }} />
          </Tooltip>
        );
      }
      o = [
        <Fragment key="1">
          <Tooltip title="日志">
            <Icon
              className={styles.icon}
              type="exception"
              onClick={() => {
                const { loglist } = this.state;
                if (loglist.every((v: any) => v.ip !== r.ip)) {
                  this.setState({ loglist: ([] as any).concat(loglist).concat([r]) })
                }
              }} />
          </Tooltip>
          <Divider type="vertical" />
        </Fragment>
      ].concat(o);
      return o;
    }
  }]
  state: InstallState = {
    visible: false,
    loglist: [],
  }

  nodeBodyElement: HTMLElement = (document.getElementsByClassName('node-body')[0] as HTMLElement);

  getState = (opt: string, status: string) => {
    opt = opt === 'install' ? '安装' : '删除';
    switch (status) {
      case 'error':
        return <Badge status="error" text={`${opt}失败`} />;
      case 'running':
        return <Badge status="processing" text={`正在${opt}`} />;
      case 'pending':
        return <Badge status="processing" text={`等待${opt}`} />;
      case 'abort':
        return <Badge status="warning" text={`${opt}取消`} />;
      case 'done':
        return <Badge status="success" text={`${opt}成功`} />;
    }
  }
  show = (e: React.MouseEvent) => {
    e.preventDefault();
    this.nodeBodyElement.style.transform = "scale(1)";
    this.setState({ visible: true })
  }
  close = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.nodeBodyElement.style.transform = "none";
    this.setState({ visible: false })
  }
  render() {
    const { data } = this.props;
    const { visible, loglist } = this.state;
    return (
      <Fragment>
        <a href="" onClick={this.show}>安装详情</a>
        <Drawer
          title="安装详情"
          placement="bottom"
          height={'auto'}
          getContainer={this.nodeBodyElement}
          onClose={this.close}
          visible={visible}
        >
          {loglist.length > 0 && <Logs
            data={loglist}
            onRemove={(key: string) => {
              let index = loglist.findIndex(v => v.ip === key);
              if (index !== -1) {
                let _loglist = ([] as any).concat(loglist);
                _loglist.splice(index, 1);
                this.setState({ loglist: _loglist })
              }
            }}
            onFullScreen={(fullScreen: boolean) => {
              fullScreen ? this.nodeBodyElement.style.transform = "none" : this.nodeBodyElement.style.transform = "scale(1)";
            }}
          />}
          <Table
            pagination={{ pageSize: 5 }}
            columns={this.columns}
            dataSource={data.map(v => ({ key: v.ip, ...v }))}
          />
        </Drawer>
      </Fragment>
    )
  }
}

export default Install;
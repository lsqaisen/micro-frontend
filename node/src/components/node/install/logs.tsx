import { PureComponent } from 'react';
import { Tabs, Tooltip, Icon } from 'antd';
import Terminal from '@/components/global/terminal';
import styles from './style/logs.less';

const TabPane = Tabs.TabPane;

export interface LogsProps {
  data: any[];
  onRemove?: (key: string) => void;
  onFullScreen?: (fullscreen: boolean) => void;
}

class Logs extends PureComponent<LogsProps, any> {
  static readonly defaultProps: LogsProps = {
    data: [],
    onRemove: () => null,
    onFullScreen: () => null,
  }
  state = {
    fullscreen: false,
  }
  render() {
    const { data, onRemove, onFullScreen } = this.props;
    const { fullscreen } = this.state;
    return (
      <Tabs
        className={`${styles.logs} ${fullscreen && styles.fullscreen}`}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            onRemove!(targetKey as string);
          }
        }}
        tabBarExtraContent={(
          <Tooltip title="全屏">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onFullScreen!(!fullscreen)
                this.setState({ fullscreen: !fullscreen }, () => {
                  Object.keys(this.refs).forEach(key => {
                    (this.refs[key] as Terminal).resize();
                  })
                })
              }}>
              <Icon type="fullscreen" />
            </a>
          </Tooltip>
        )}
      >
        {data.map(v => (
          <TabPane tab={v.ip} key={v.ip} closable style={{ height: '240px', transform: "scale(1)" }}>
            <Terminal
              ref={v.ip}
              splitWrite={true}
              bidirectional={false}
              buffered={true}
              beforeSendData={[JSON.stringify({ ip: v.ip, type: v.type, })]}
              url={`ws://${window.location.host != 'localhost:8000' && window.location.host != '127.0.0.1:8000' ? window.location.host : '192.168.1.103:30000'}/service/installnode/api/logs/ws`}
            />
          </TabPane>
        ))
        }
      </Tabs>
    )
  }
}

export default Logs;
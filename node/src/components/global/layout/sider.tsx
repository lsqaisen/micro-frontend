import * as React from 'react';
import { Layout } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Loading from '@/components/global/loading';
import sidersApi from './sider-drawer';
import { generateUUID } from '@/utils';
import styles from './style/index.less';

export interface SiderProps {
  children?: any;
  level: number;
  state: 'initially' | 'centent' | 'empty';
  matches: boolean;
  realWidth?: number | string;
  width?: number | string;
}

class Sider extends React.PureComponent<SiderProps, any> {
  static readonly defaultProps: SiderProps = {
    level: 0,
    state: 'initially',
    matches: false,
  }

  id: string | undefined = generateUUID();

  componentDidMount() {
    const { matches, level, realWidth, children } = this.props;
    sidersApi.create({
      sider: children,
      realWidth,
    }, level, matches);
  }
  UNSAFE_componentWillReceiveProps({ matches, level, realWidth, children }: SiderProps) {
    sidersApi.create({ realWidth, sider: children }, level, matches)
  }
  render() {
    const { state, matches, width, children } = this.props;
    return (
      <React.Fragment>
        {!matches && <Layout.Sider
          className={styles.sider}
          width={width}
          collapsedWidth={0}
        >
          <QueueAnim
            type="alpha"
            duration={600}
          >
            {state === "initially" ? <Loading key="loading" /> : React.cloneElement(children as any, { key: 'children' })}
          </QueueAnim>
        </Layout.Sider>}
      </React.Fragment>
    )
  }
}

export default Sider;
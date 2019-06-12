import * as React from 'react';
import { Layout, Empty } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Loading from '@/components/global/loading';
import Sider, { SiderProps } from './sider';
import styles from './style/index.less';

export interface LayoutProps extends SiderProps {
  empty?: any;
  className?: string;
  sider: string | React.ReactNode;
  header?: string | React.ReactNode;
}

export default class extends React.PureComponent<LayoutProps, any> {
  static readonly defaultProps = {
    state: 'initially',
    matches: false,
    width: 210,
  }
  state = {
    open: false,
  }
  changeOpen = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  getCentent = () => {
    const { level, state, matches, width, empty, sider, header, className, children, } = this.props;
    switch (state) {
      case 'initially':
      case 'centent':
        return (
          <React.Fragment>
            {state === "initially" && <Loading key="loading" />}
            <Layout className={styles.layout} style={{ display: state === "centent" ? "flex" : "none'" }}>
              <Sider
                level={level}
                matches={matches}
                state={state}
                width={state === "centent" ? matches ? 0 : width : '100%'}
                realWidth={width}
              >
                {sider}
              </Sider>
              <Layout.Content className={className} style={{ position: 'relative', minHeight: "100vh" }}>
                <Layout.Header className={styles.header}>
                  {header}
                </Layout.Header>
                {children}
              </Layout.Content>
            </Layout>
          </React.Fragment >
        );
      case 'empty':
        return empty || <Empty key="empty" />;
      default:
        return <Loading key="loading" />;
    }
  }
  render() {
    return (
      <QueueAnim
        type="alpha"
        className={styles.layout}
      >
        {this.getCentent()}
      </QueueAnim>
    )
  }
}
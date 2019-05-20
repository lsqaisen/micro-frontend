import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { LocaleProvider } from 'antd';
import Media from 'react-media';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import Layout from '@/components/global/layout';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
  ],
  (profile, init) => ({ profile, init })
))
export default class extends PureComponent<any, any> {
  state = {
    init: false,
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    sub(`/lib/login/login.js?${process.env.VERSION}`, 'login', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { profile, init, children } = this.props;
    if (!init) return null;
    else if (!profile) {
      return children
    } else {
      return (
        <Media query="(min-width: 599px)">
          {(matches) => (
            <LocaleProvider locale={zhCN}>
              <Layout
                level={0}
                state='centent'
                matches={!matches}
                width={0}
                sider={null}>
                {children}
              </Layout>
            </LocaleProvider>
          )}
        </Media>
      )
    }
  }
}
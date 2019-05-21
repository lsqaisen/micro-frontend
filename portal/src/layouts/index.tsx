import * as React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { createSelector } from 'reselect';
import { LocaleProvider } from 'antd';
import Media from 'react-media';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import Layout from '@/components/global/layout';
import Logo from '@/components/layouts/logo';
import Menu from '@/components/layouts/sider/menu';
import User from '@/components/layouts/sider/user';
import Namespace from '@/components/layouts/sider/namespace';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
  ],
  (profile, init) => ({ profile, init })
))
export default class extends React.PureComponent<any, any> {
  state = {
    init: false
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    sub(`/lib/login/login.js?${process.env.VERSION}`, 'login', (success: boolean) => {
      if (!success) {
        router.push('/local-login')
      }
      this.setState({ init: true })
    });
    sub(`/lib/node/node.js?${process.env.VERSION}`, 'node', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { profile, init, children } = this.props;
    console.log(profile, (window.g_umi||{}).mife)
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
                width={256}
                sider={(
                  <div>
                    <Logo />
                    <User name="admin" />
                    <Namespace />
                    <Menu />
                  </div>
                )}>
                {children}
              </Layout>
            </LocaleProvider>
          )}
        </Media>
      )
    }
  }
}
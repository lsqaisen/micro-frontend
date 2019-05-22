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
import Sider from './sider';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
  ],
  (profile, init) => ({ profile, init })
))
export default class extends React.PureComponent<any, any> {
  state: {
    plugins: string[]
  } = {
      plugins: [],
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
      this.setState({ plugins: this.state.plugins.concat(['login']) })
    });
    sub(`/lib/node/node.js?${process.env.VERSION}`, 'node', (success: boolean) => {
      this.setState({ plugins: this.state.plugins.concat(['login']) })
    });
  }
  render() {
    const { profile, init, children } = this.props;
    const { plugins } = this.state;
    if (plugins.indexOf('login') !== -1 && init && !profile) {
      return children;
    }
    return (
      <Media query="(min-width: 599px)">
        {(matches) => (
          <LocaleProvider locale={zhCN}>
            <Layout
              level={0}
              state={!init ? 'initially' : 'centent'}
              matches={!matches}
              width={profile ? 256 : 0}
              sider={profile ? <Sider /> : <div />}>
              {plugins.length < 2 ? null : children}
            </Layout>
          </LocaleProvider>
        )}
      </Media>
    )
  }
}


import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';

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
    init: false
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    sub(`/service/login/lib/login/login.js?${process.env.VERSION}`, 'login', () => {
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
        <LocaleProvider locale={zhCN}>
          <div style={{ position: 'relative', height: '100%' }}>
            {children}
          </div>
        </LocaleProvider>
      )
    }
  }
}
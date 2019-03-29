import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import Layout from './layout';
import "antd/lib/style/index.less"

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => props.user,
    (props: any) => props.mife_menus,
  ],
  (user, menus) => ({ user, menus })
))
export default class extends (PureComponent || Component)<any, any> {
  state = {
    init: false
  }
  componentDidMount() {
    sub(`/lib/login/login.js?${new Date()}`, 'login', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { user, children } = this.props;
    const { init } = this.state;
    return <Layout />
    if (!init || !user || (!user.profile.data && !user.profile.err)) return null;
    else if (!!user) {
      if (!!user.profile.err) {
        return children
      } else if (!!user.profile.data) {
        return <Layout />
      }
    }
  }
}
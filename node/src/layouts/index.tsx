import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';

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
    if (!init || !user || (!user.profile.data && !user.profile.err)) return null;
    else if (!!user) {
      return children
    }
  }
}
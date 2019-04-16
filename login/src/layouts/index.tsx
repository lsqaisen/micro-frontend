import { Component, PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => props.user.profile,
    (props: any) => props.user.init,
  ],
  (profile, init) => ({ profile, init })
))
class Layout extends (Component || PureComponent)<any, any>  {
  render() {
    const { profile, init } = this.props;
    if (!init) return null;
    return this.props.children;
  }
}

export default Layout;
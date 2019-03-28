import { Component, PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => props.user.profile,
  ],
  (profile) => ({ profile })
))
class Layout extends (Component || PureComponent)<any, any>  {
  render() {
    const { profile, location } = this.props;
    if ((!profile.data && !profile.err) ||
      (!profile.data && !!profile.err && location.pathname !== '/login')) {
      return null
    }
    return this.props.children;
  }
}

export default Layout;
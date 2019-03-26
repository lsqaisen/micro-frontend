import { Component, PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

@withRouter
@connect(createSelector(
  [
    (props: any) => props.user.profile,
  ],
  (profile) => ({ profile })
))
class Layout extends (Component || PureComponent)<any, any> {
  render() {
    // return null
    // return <Login />
    const { profile, location } = this.props;
    if ((!profile.data && !profile.err) ||
      (!profile.data && !!profile.err && location.pathname !== '/login')) {
      return null
    }
    return this.props.children;
  }
}

export default Layout;
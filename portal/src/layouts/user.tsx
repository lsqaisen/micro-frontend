import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import User from '@/components/layouts/sider/user';
import { createSelector } from 'reselect';

@connect(createSelector(
  [
    (props: any) => props.user,
  ],
  (user) => ({ user })
))
export default class extends PureComponent<any, any> {
  render() {
    return (
      <User name="admin" />
    )
  }
}



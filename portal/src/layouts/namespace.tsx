import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Namespace from '@/components/layouts/sider/namespace';

@connect(createSelector(
  [
    (props: any) => props.user,
  ],
  (user) => ({ user })
))
export default class extends (PureComponent || Component)<any, any> {
  render() {
    return (
      <Namespace />
    )
  }
}


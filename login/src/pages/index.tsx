import { PureComponent, Component } from 'react';
import { connect } from 'dva'
import Login from '@/components/login';

@connect()
export default class extends (PureComponent || Component) {
  render() {
    return (
      <Login />
    )
  }
}

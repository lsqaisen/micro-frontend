import React, { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { User } from 'plugin-global'

export default connect((state: any) => ({
  menus: Object.values(state.mife_menus || {}),
}))(class extends (PureComponent || Component)<any, any> {

  render() {
    return (
      <User.Login />
    )
  }
})

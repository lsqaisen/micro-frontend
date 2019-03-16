import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Layout } from 'antd';
// import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import User from './login'
import Sider from './sider'

export default withRouter(connect((state: any) => ({
  menus: Object.values(state.mife_menus || {}),
}))(class extends (PureComponent || Component) {
  componentDidMount() {
    // setTimeout(() => {
    //   sub(`/lib/node/node.js?${new Date()}`, 'node');
    // }, 3000)
    // setTimeout(() => {
    //   sub(`/lib/stack/stack.js?${new Date()}`, 'stack');
    // }, 5000)
    // setTimeout(() => {
    //   unsub('node', () => {
    //     if (/^\/node/.test(this.props.location.pathname)) {
    //       router.push('/')
    //     }
    //   });
    // }, 6000)
    // setTimeout(() => {
    //   sub(`/lib/node/node.js?${new Date()}`, 'node');
    // }, 10000)
  }
  render() {
    const { props } = this;
    const menus = Object.values(window.mife_menus || {});
    return <User />
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider />
        <Layout.Content >
          {props.children}
        </Layout.Content>
        {/* <h1>layouts</h1>
        <ul>
          <li><Link to="/">go to /</Link></li>
          <li><Link to="/test">go to test</Link></li>
          {menus.map(menu => {
            if (!!menu.children) {
              return (
                <div key={menu.key} style={{ paddingLeft: 24 }}>
                  <h3><Link to={`/${menu.key}`}>{menu.name}</Link></h3>
                  <ul>
                    {menu.children.map(v => (<li key={v.key}><Link to={`/${menu.key}/${v.key}`}>go to {v.name}</Link></li>))}
                  </ul>
                </div>
              )
            } else {
              return (
                <li key={menu.key}><Link to={`/${menu.key}`}>go to {menu.name}</Link></li>
              )
            }
          })}
        </ul>
        {
          props.children
        } */}
      </Layout>
    )
  }
}))

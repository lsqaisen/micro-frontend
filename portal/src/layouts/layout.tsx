import { Component, PureComponent } from 'react'
import { Layout, Icon } from 'antd';
import Logo from '@/components/layouts/logo';
import Menu from './menu';
import User from './user';
import Namespace from './namespace';
const { Content, Sider } = Layout;

export default class extends PureComponent {
  componentDidMount() {
    const box = document.getElementById('box'),
      shadow = document.getElementById('shadow'),
      loader = document.getElementById('loader');
    if (box) box.style.animation = "stop 0.8s linear";
    if (shadow) shadow.style.animation = "shadowstop 0.8s linear"
    setTimeout(() => {
      if (loader) loader.remove()
    }, 700)
  }
  render() {
    const { children } = this.props;
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={228} style={{ background: '#ecf0f6' }}>
          <Logo />
          <User />
          <Namespace />
          <Menu />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    )
  }
}
import { Component, PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class extends (PureComponent || Component) {
  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    )
  }
}
import React, { Component, PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd';
import styles from './sider.less';

const { SubMenu, ItemGroup } = Menu;
const { Sider } = Layout;

export default class extends (PureComponent || Component) {
  render() {
    return (
      <Sider width={256} className={styles.sider}>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
        >
          <ItemGroup key="g1" title={<Menu.Item><Icon type="user" />subnav 1</Menu.Item>}>
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
          </ItemGroup>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
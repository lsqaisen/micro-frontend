import { Component, PureComponent, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import ScrollBar from 'react-perfect-scrollbar';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'dva/router';
import { TweenOneGroup } from 'rc-tween-one';
import styles from './style/menu.less';

const { SubMenu, ItemGroup } = Menu;

export default class extends PureComponent<any, any> {
  render() {
    return (
      <div className={styles.menu_box}>
        <ScrollBar
          option={{
            suppressScrollX: true,
          }}
        >
          <Menu
            mode="inline"
            style={{ height: '100%' }}
          >
            <QueueAnim
              component={ItemGroup}
              componentProps={{
                key: "ddd",
                title: 'dsfsdf'
              }}
              animConfig={[
                { opacity: [1, 0], translateX: [0, -250] },
                { opacity: [1, 0], translateX: [0, 250] },
              ]}
            >
              <SubMenu key="sub1" title={(
                <Fragment>
                  <i className={`${styles[`icon`]} iconfont icon-stack`} />
                  <span className={styles[`name`]}>stack</span>
                </Fragment>
              )}>
                <Menu.Item key="1">
                  <Link to="/">
                    <i className={`${styles[`icon`]} iconfont icon-stack`} />
                    <span className={styles[`name`]}>option1</span>
                  </Link>
                </Menu.Item>
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

              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </QueueAnim>
          </Menu>
        </ScrollBar>
      </div>
    )
  }
}
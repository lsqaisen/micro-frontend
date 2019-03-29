
import { Component, PureComponent, Fragment } from 'react';
import { Dropdown, Menu, Icon, Button } from 'antd';
import styles from './style/namespace.less';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
type colorType = (typeof colorList)[number]

type UserProps = {
  name: string;
}

type UserState = {
  color?: colorType;
}

export default class extends (PureComponent || Component)<any, UserState> {
  state = {
    color: colorList[parseInt(`${Math.random() * 10}`) % 4]
  }
  UNSAFE_componentWillReceiveProps(nextProps: UserProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        color: colorList[parseInt(`${Math.random() * 10}`) % 4],
      });
    }
  }
  render() {
    const { name } = this.props;
    const { color } = this.state;
    return (
      <div className={styles.namespace}>
        <span className="ant-menu-item-group-title" title="空间" style={{
          paddingTop: "0",
          paddingLeft: "0",
          color: "#8C92A2",
        }}>空间:</span>
        <Dropdown overlay={(
          <Menu>
            {([1, 2, 3]).map(project => <Menu.Item key={project} className={'ant-menu-item-selected'}>
              <span onClick={() => { }}>project{project}</span>
            </Menu.Item>)}
          </Menu>
        )}>
          {/* <a className="ant-dropdown-link" href="#">
            project <Icon type="down" />
          </a> */}
          <Button style={{  width: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>project</span> <Icon type="caret-down" style={{ fontSize: '12px' }} />
            </div>
          </Button>
        </Dropdown>
      </div>
    )
  }
}
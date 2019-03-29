import { Component, PureComponent } from 'react';
import { Avatar, Menu, Icon } from 'antd';
import styles from './style/user.less';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
type colorType = (typeof colorList)[number]

type UserProps = {
  name: string;
}

type UserState = {
  color?: colorType;
}

export default class extends (PureComponent || Component)<UserProps, UserState> {
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
    const { name, children } = this.props;
    const { color } = this.state;
    return (
      <div className={styles.user_box}>
        <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size={64}>
          {name}
        </Avatar>
      </div>
    )
  }
}
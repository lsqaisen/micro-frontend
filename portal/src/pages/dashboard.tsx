import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';

@connect()
class Dashboard extends (PureComponent || Component)<any, any> {
  logout = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'user/logout'
    })
  }
  render() {
    return (
      <div>
        <Button onClick={this.logout}>logout</Button>
        <Link to="/portal">go {`portal`}</Link>
      </div>
    )
  }
}

export default Dashboard;
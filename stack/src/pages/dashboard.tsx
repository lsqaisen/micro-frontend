import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

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
        <Link to="/stack">go {`stack`}</Link>
      </div>
    )
  }
}

export default Dashboard;
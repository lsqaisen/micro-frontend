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
    console.log(this.props)
    return (
      <div>
        <Button onClick={this.logout}>logout</Button>
        <Link to="/auth/user">go {`auth`}</Link>
      </div>
    )
  }
}

export default Dashboard;
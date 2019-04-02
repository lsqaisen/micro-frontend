import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect()
class Dashboard extends (PureComponent || Component) {
  render() {
    return (
      <div>
        <Button onClick={(e) => {
          e.preventDefault();
          console.log(this.props)
          this.props.dispatch({
            type: 'user/logout'
          })
        }}>logout</Button>
        <Link to="/node">go node</Link>
      </div>
    )
  }
}

export default Dashboard;
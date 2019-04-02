import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect()
class Node extends (PureComponent || Component) {
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
        <Link to="/dashboard">go dashboard</Link>
      </div>
    )
  }
}

export default Node;
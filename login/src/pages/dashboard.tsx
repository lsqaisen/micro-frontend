import { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import debounce from 'lodash.debounce';

@connect()
class Dashboard extends PureComponent<any, any> {
  logout = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'user/logout'
    })
  }
  render() {
    return (
      <div>
        <Button onClick={debounce(async () => { console.log(434) }, 400)}></Button>
        <Button onClick={this.logout}>logout</Button>
        <Link to="/login.">go {`login.`}</Link>
      </div>
    )
  }
}

export default Dashboard;
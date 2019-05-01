import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Table from '@/components/table';
import { ColumnProps } from 'antd/lib/table';


interface IUser {
  key: number,
  name: string,
  age: number,
  address: string,
}

const columns: ColumnProps<IUser>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name', width: 40 },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 40 },];

const data: IUser[] = [{
  key: 1,
  name: 'John Brown',
  age: 32,
  address: 'New York No.1 Lake Park',
},
{
  key: 2,
  name: 'Jim Green',
  age: 42,
  address: 'London No.1 Lake Park',
},
{
  key: 3,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No.1 Lake Park',
},
{
  key: 4,
  name: 'Jim Red',
  age: 18,
  address: 'London1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdfNo',
},];


class Dashboard extends PureComponent<any, any> {
  logout = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'user/logout'
    })
  }

  state = {
    data: [{
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No.1 Lake Park',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No.1 Lake Park',
    },
    {
      key: 3,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No.1 Lake Park',
    },
    {
      key: 4,
      name: 'Jim Red',
      age: 18,
      address: 'London1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdfNo',
    },]
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Button onClick={() => {
          this.setState({
            data: this.state.data.concat([{
              key: new Date().getTime(),
              name: 'Jim Red',
              age: 18,
              address: 'London1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdf1asdfasdfasdfasdfasdfasdfasdfasdfasdfNo',
            }])
          })
        }}></Button>
        <Table<IUser> columns={columns} dataSource={this.state.data} />
      </div>
    )
  }
}

export default Dashboard;
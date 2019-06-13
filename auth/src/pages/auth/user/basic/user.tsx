import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Menu, Icon, Dropdown, Button } from 'antd';
import Loading from '@/components/global/loading';
import Table from '@/components/user/table';
import AddUser from '@/components/user/add-user';
import EditUser from '@/components/user/edit-user';
import Actions from './actions';

@connect(createSelector(
  [
    (props: any) => props.authuser.init,
    (props: any) => props.authuser.data,
    (props: any) => props.loading.effects[`authuser/get`],
  ],
  (init, data, loading) => ({ init, data, loading })
))
export default class extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'authuser/get' });
  }
  create = () => {
    return this.props.dispatch({ type: 'authuser/create' });
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { init, data, group_id, className, loading } = this.props;
    if (!init) return <Loading />;
    return (
      <div className={className}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
          </div>
          <div className="fr">
            <AddUser onSubmit={this.create} />
          </div>
        </header>
        <Table
          loading={loading}
          data={data}
          actions={<Actions group_id={group_id} />}
        >
          <EditUser />
        </Table>
      </div>
    )
  }
}
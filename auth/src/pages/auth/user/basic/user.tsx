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
    (props: any) => props.user.profile.userType === 1,
    (props: any) => props.authuser.init,
    (props: any, { group_id }: any) => {
      if (group_id === "*") {
        return props.authuser.data[group_id] || { list: [], total: 0 };
      } else {
        const { group = {}, privileges = [], users = [] } = props.authuser.data[group_id] || {};
        return {
          group,
          privileges,
          total: users.length,
          list: users,
        };
      }
    },
    (props: any) => props.loading.effects[`authuser/get`],
  ],
  (admin, init, data, loading) => ({ admin, init, data, loading })
))
export default class extends PureComponent<any, any> {
  get = (group_id?: string) => {
    return this.props.dispatch({
      type: 'authuser/get',
      payload: { group_id: group_id || this.props.group_id }
    });
  }
  create = () => {
    return this.props.dispatch({ type: 'authuser/create' });
  }
  UNSAFE_componentWillReceiveProps({ group_id }: any) {
    if (this.props.group_id !== group_id) {
      this.get(group_id)
    }
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { admin, init, data, group_id, className, loading } = this.props;
    if (!init) return <Loading />;
    return (
      <div className={className}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={() => this.get()} >刷新</Button>
          </div>
          <div className="fr">
            <AddUser admin={admin} onSubmit={this.create} />
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
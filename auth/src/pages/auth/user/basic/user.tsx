import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Loading from '@/components/global/loading';
import Table from '@/components/user/table';
import AddUser from '@/components/user/add-user';
import EditUser from '@/components/user/edit-user';
import ManageGroup from '@/components/group/manage-group';
import Actions from './actions';

@connect(createSelector(
  [
    (props: any) => props.user.profile.userType === 1,
    ({ [`${MODEL}_user`]: user }: any) => user.init,
    ({ [`${MODEL}_user`]: user }: any, { group_id }: any) => {
      if (group_id === "*") {
        return user.data[group_id] || { list: [], total: 0 };
      } else {
        const { group = {}, privileges = [], users = [] } = user.data[group_id] || {};
        return {
          group,
          privileges,
          total: users.length,
          list: users,
        };
      }
    },
    ({ [`${MODEL}_user`]: user }: any) => ((user.data["*"] || {}).list || []).filter((user: any) => user.type === 1),
    (props: any) => props.loading.effects[`${MODEL}_user/get`],
  ],
  (admin, init, data, users, loading) => ({ admin, init, data, users, loading })
))
export default class extends PureComponent<any, any> {
  get = (group_id?: string) => {
    return this.props.dispatch({
      type: `${MODEL}_user/get`,
      payload: { group_id: group_id || this.props.group_id }
    });
  }
  create = (data: any) => {
    return this.props.dispatch({
      type: `${MODEL}_user/create`,
      payload: data,
    }).then((err: any) => {
      if (!err) this.get();
      return err;
    });
  }
  delete = (data: any) => {
    return this.props.dispatch({
      type: `${MODEL}_user/create`,
      payload: data,
    }).then((err: any) => {
      if (!err) this.get();
    });
  }
  edit = (data: any) => {
    return this.props.dispatch({
      type: `${MODEL}_user/edit`,
      payload: data,
    }).then((err: any) => {
      if (!err) this.get();
      return err;
    });
  }
  add = (user_id: number) => {
    return this.props.dispatch({
      type: `${MODEL}_group/adduser`,
      payload: { user_id, group_id: this.props.group_id },
    }).then((err: any) => {
      if (!err) this.get();
      return err;
    });
  }
  remove = (user_id: number) => {
    return this.props.dispatch({
      type: `${MODEL}_group/removeuser`,
      payload: { user_id, group_id: this.props.group_id },
    }).then((err: any) => {
      if (!err) this.get();
      return err;
    });
  }
  UNSAFE_componentWillReceiveProps(props: any) {
    Object.entries(props).map(([key, value]: any) => {
      // console.log(key, JSON.stringify(value) === JSON.stringify(this.props[key]))
    })
    // if (this.props.group_id !== group_id) {
    //   this.get(group_id)
    // }
  }
  componentDidMount() {
    this.get()
    this.get("*")
  }
  render() {
    const { admin, init, data, users, group_id, className, dispatch, loading } = this.props;
    if (!init) return <Loading />;
    return (
      <div className={className}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={() => this.get()} >刷新</Button>
          </div>
          <div className="fr">
            {group_id === "*" ?
              <AddUser admin={admin} onSubmit={this.create} /> :
              <ManageGroup
                loading={loading}
                data={users.map((user: any) => ({ ...user, has: data.list.some((v: any) => v.user_id === user.user_id) }))}
                onAdd={this.add}
                onRemove={this.remove}
              />}
          </div>
        </header>
        <Table
          loading={loading}
          data={data}
          actions={<Actions dispatch={dispatch} group_id={group_id} onUpdate={this.get} />}
        >
          <EditUser onSubmit={this.edit} />
        </Table>
      </div>
    )
  }
}
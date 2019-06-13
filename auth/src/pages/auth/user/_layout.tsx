import * as React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Media from 'react-media';
import Group from '@/components/group';
import Layout from '@/components/global/layout';


export default connect(createSelector(
  [
    (props: any) => props.user.namespace,
    (props: any) => props.user.profile.userType === 1,
    (props: any) => props.group.data,
    (props: any) => props.group.init,
    (props: any) => props.privilege.data,
    (props: any) => {
      console.log(1111, (props.authuser.data["*"] || {}).list || []);
      return (props.authuser.data["*"] || {}).list || []
    },
    (_: any, state: any) => {
      const { location: { query: { group } } } = state;
      return group;
    },
  ],
  (namespace, admin, data, init, privilege, users, group_id) => ({ namespace, admin, data, init, privilege, users, group_id })
))(class extends React.PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'group/get' });
  }
  getPrivilege = () => {
    return this.props.dispatch({ type: 'privilege/get' });
  }
  getUser = () => {
    return this.props.dispatch({
      type: 'authuser/get',
      payload: { group_id: '*' }
    });
  }
  create = (data: any) => {
    return this.props.dispatch({
      type: 'group/create',
      payload: data,
    })
  }
  delete = (group_id: any) => {
    return this.props.dispatch({
      type: 'group/delete',
      payload: group_id,
    })
  }
  componentDidMount() {
    this.getPrivilege();
    this.get();
  }
  render() {
    const { namespace, privilege, admin, data, group_id, init, children } = this.props;
    return (
      <Media query="(min-width: 599px)">
        {(matches) => (
          <Layout
            className="node-body"
            level={1}
            width={226}
            matches={!matches}
            state={!init ? 'initially' : 'centent'}
            sider={<Group
              privilege={privilege}
              namespace={namespace}
              admin={admin}
              group_id={group_id}
              data={data}
              onAdd={this.create}
              onDelete={this.delete}
              onUserSearch={() => {
                return new Promise(async (resolve) => {
                  this.getUser().then(() => {
                    const { users } = this.props;
                    console.log(users)
                    resolve(users);
                  });
                })
              }}
            />}
          >
            {init ? React.cloneElement(children as any, {
              group_id,
            }) : null}
          </Layout>
        )}
      </Media>
    )
  }
})
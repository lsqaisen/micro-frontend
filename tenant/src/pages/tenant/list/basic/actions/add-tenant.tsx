import { connect } from 'dva';
import { createSelector } from 'reselect';
import AddTenant from '@/components/tenant/add-tenant';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_tenant`]: tenant }: any) => (tenant.users || {}).list || [],
    ],
    (users) => ({ users })
  ), createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/create`, payload: data }),
      (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/getusers`, payload: { group_id: "*" } }),
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/createuser`, payload: data }),
    ],
    (createTenant, getUsers, createUser) => ({ createTenant, getUsers, createUser })
  )
)(({ users, update = () => null, createTenant, getUsers, createUser, ...props }: any) => (
  <AddTenant
    {...props}
    submit={(v) => createTenant(v).then((err: any) => !err && update())}
    userSearch={() => {
      return new Promise(async (resolve) => {
        getUsers().then(() => {
          resolve(users.filter((user: any) => user.type !== 1));
        });
      })
    }}
    createUser={createUser}
  />
))
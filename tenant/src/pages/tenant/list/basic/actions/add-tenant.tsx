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
    ],
    (createTenant, getUsers) => ({ createTenant, getUsers })
  )
)(({ users, update = () => null, createTenant, getUsers, ...props }: any) => (
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
  />
))
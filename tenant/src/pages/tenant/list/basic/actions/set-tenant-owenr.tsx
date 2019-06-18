import { connect } from 'dva';
import { createSelector } from 'reselect';
import SetTenantOwenr from '@/components/tenant/set-tenant-owner';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_tenant`]: tenant }: any) => (tenant.users || {}).list || [],
    ],
    (users) => ({ users })
  ), createSelector(
    [
      (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/getusers`, payload: { group_id: "*" } }),
    ],
    (getUsers) => ({ getUsers })
  )
)(({ users, getUsers, ...props }: any) => (
  <SetTenantOwenr
    {...props}
    userSearch={() => {
      return new Promise(async (resolve) => {
        getUsers().then(() => {
          resolve(users.filter((user: any) => user.type !== 1));
        });
      })
    }}
  />
))
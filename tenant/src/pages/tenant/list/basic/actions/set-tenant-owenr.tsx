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
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/setadmin`, payload: data }),
      (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/getusers`, payload: { group_id: "*" } }),
    ],
    (setAdmin, getUsers) => ({ setAdmin, getUsers })
  )
)(({ users, update = () => null, setAdmin, getUsers, ...props }: any) => (
  <SetTenantOwenr
    {...props}
    submit={(data) => setAdmin(data).then((error: any) => !error && update())}
    userSearch={() => {
      return new Promise(async (resolve) => {
        getUsers().then(() => {
          resolve(users.filter((user: any) => user.type !== 1));
        });
      })
    }}
  />
))
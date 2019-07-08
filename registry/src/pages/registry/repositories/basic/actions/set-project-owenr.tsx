import { connect } from 'dva';
import { createSelector } from 'reselect';
import SetProjectOwenr from '@/components/project/set-project-owner';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_project`]: project }: any) => (project.users || {}).list || [],
    ],
    (users) => ({ users })
  ), createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/setadmin`, payload: data }),
      (dispatch: any) => () => dispatch({ type: `${MODEL}_project/getusers`, payload: { group_id: "*" } }),
    ],
    (setAdmin, getUsers) => ({ setAdmin, getUsers })
  )
)(({ users, update = () => null, setAdmin, getUsers, ...props }: any) => (
  <SetProjectOwenr
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
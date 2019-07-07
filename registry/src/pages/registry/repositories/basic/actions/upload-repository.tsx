import { connect } from 'dva';
import { createSelector } from 'reselect';
import Upload from '@/components/repositories/upload';

export default connect(
  createSelector(
    [
      ({ user }: any) => user,
    ],
    (user) => ({ admin: user.admin, namespace: user.namespace })
  ), createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/create`, payload: data }),
      (dispatch: any) => () => dispatch({ type: `${MODEL}_project/getusers`, payload: { group_id: "*" } }),
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/createuser`, payload: data }),
    ],
    (createTenant, getUsers, createUser) => ({ createTenant, getUsers, createUser })
  )
)(({ admin, namespace, users, upload, update, getUsers }: any) => (
  <Upload
    {...{ admin, namespace, username: admin ? 'library' : namespace }}
    submit={(v) => upload(v).then((err: any) => !err && update())}
    searchProjects={() => {
      return new Promise(async (resolve) => {
        getUsers().then(() => {
          resolve(users.filter((user: any) => user.type === 1));
        });
      })
    }}
  />
))
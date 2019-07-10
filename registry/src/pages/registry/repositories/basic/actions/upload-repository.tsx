import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Upload from '@/components/repositories/upload';

export default connect(
  createSelector(
    [
      ({ user }: any) => user,
      ({ [`${MODEL}_project`]: project }: any) => project.data,
    ],
    (user, projects) => ({ admin: user.admin, namespace: user.namespace, projects })
  ), createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/create`, payload: data }),
      (dispatch: any) => (payload: any) => dispatch({ type: `${MODEL}_project/get`, payload }),
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_list/upload`, payload: data }),
    ],
    (createTenant, getProjects, upload) => ({ createTenant, getProjects, upload })
  )
)(class extends PureComponent<any, any>{
  render() {
    const { admin, namespace, upload, update, getProjects } = this.props;
    return (
      <Upload
        {...{ admin, namespace, username: admin ? 'library' : namespace }}
        submit={(v) => upload(v).then((err: any) => !err && update())}
        searchProjects={(payload) => {
          return new Promise(async (resolve) => {
            getProjects(payload).then(() => {
              resolve(this.props.projects);
            });
          })
        }}
      />
    )
  }
})
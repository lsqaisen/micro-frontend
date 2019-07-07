import { connect } from 'dva';
import { createSelector } from 'reselect';
import EditProject from '@/components/project/edit-project';

export default connect(
  undefined, createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/edit`, payload: data }),
    ],
    (edit) => ({ edit })
  )
)(({ update = () => null, edit, ...props }: any) => (
  <EditProject
    {...props}
    submit={(data) => edit(data).then((error: any) => {
      if (!error) update();
      return error;
    })}
  />
))
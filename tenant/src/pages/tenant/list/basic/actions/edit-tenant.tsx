import { connect } from 'dva';
import { createSelector } from 'reselect';
import EditTenant from '@/components/tenant/edit-tenant';

export default connect(
  undefined, createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/edit`, payload: data }),
    ],
    (editTenant) => ({ editTenant })
  )
)(({ update = () => null, editTenant, ...props }: any) => (
  <EditTenant
    {...props}
    submit={(data) => editTenant(data).then((error: any) => {
      if (!error) update();
      return error;
    })}
  />
))
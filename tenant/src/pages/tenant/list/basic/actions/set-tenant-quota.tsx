import { connect } from 'dva';
import { createSelector } from 'reselect';
import SetTenantQuota from '@/components/tenant/set-tenant-quota';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_quota`]: quota }: any) => quota.quotas,
    ],
    (quotas) => ({ quotas })
  ), createSelector(
    [
      (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_quota/setquota`, payload: data }),
      (dispatch: any) => (payload: string) => dispatch({ type: `${MODEL}_quota/getquota`, payload }),
    ],
    (setQuota, getQuota) => ({ setQuota, getQuota })
  )
)(({ quotas, update = () => null, setQuota, getQuota, ...props }: any) => (
  <SetTenantQuota
    {...props}
    quotas={quotas}
    submit={setQuota}
    getQuota={getQuota}
  />
))
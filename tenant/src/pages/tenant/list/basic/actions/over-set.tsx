import { connect } from 'dva';
import { createSelector } from 'reselect';
import Overset, { OverSetProps } from '@/components/tenant/overset-tenant';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_quota`]: quota }: any) => quota.oversold,
    ],
    (oversold) => ({ oversold })
  ), createSelector(
    [
      (dispatch: any) => (namespace?: string) => dispatch({ type: `${MODEL}_quota/getoverset`, payload: namespace }),
      (dispatch: any) => (over_set?: string) => dispatch({ type: `${MODEL}_quota/setoversold`, payload: over_set }),
    ],
    (getOverset, setOverset) => ({ getOverset, setOverset })
  )
)(({ oversold, getOverset, setOverset, ...props }: any) => (
  <Overset
    {...props}
    oversold={oversold}
    getOverset={getOverset}
    submit={setOverset}
  />
))
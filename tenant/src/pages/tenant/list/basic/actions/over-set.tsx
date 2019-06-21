import { connect } from 'dva';
import { createSelector } from 'reselect';
import Overset, { OverSetProps } from '@/components/tenant/overset-tenant';

export default connect(
  createSelector(
    [
      ({ [`${MODEL}_quota`]: quota }: any, { data }: any) => {
        if (!!data.name) {
          return Object.assign({}, quota.oversets[data.name] || {})
        } else {
          return undefined
        }
      },
    ],
    (overset) => ({ overset })
  ), createSelector(
    [
      (dispatch: any) => (namespace?: string) => dispatch({ type: `${MODEL}_quota/getoverset`, payload: namespace }),
      (dispatch: any) => (over_set?: string) => dispatch({ type: `${MODEL}_quota/setoverset`, payload: over_set }),
    ],
    (getOverset, setOverset) => ({ getOverset, setOverset })
  )
)(({ overset, getOverset, setOverset, ...props }: any) => (
  <Overset
    {...props}
    over_set={overset}
    getOverset={getOverset}
    submit={setOverset}
  />
))
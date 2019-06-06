import { connect } from 'dva';
import { createSelector } from 'reselect';

export default connect(createSelector(
  [
    (_: any, { match: { params: { name } } }: any) => name,
  ],
  (name) => ({ name })
))(({ name, desc }: any) => (
  <div>xxxx</div>
))
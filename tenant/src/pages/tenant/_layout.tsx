import * as React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Loading from '@/components/global/loading';

export default connect(createSelector(
  [
    ({ [`${MODEL}_tenant`]: tenant }: any) => tenant.active,
  ],
  (active) => ({ active })
), createSelector(
  [
    (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/active` }),
  ],
  (getActive) => ({ getActive })
))(class extends React.PureComponent<any, any> {
  componentDidMount() {
    const { active, getActive } = this.props;
    if (active === undefined) {
      getActive()
    }
  }
  render() {
    const { active, children } = this.props;
    if (active === undefined) {
      return <Loading />
    } else if (active === false) {
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Empty
            style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }}
            description="插件还未激活" >
            <Button type="primary">立即激活</Button>
          </Empty>
        </div>
      )
    }
    return children;
  }
})
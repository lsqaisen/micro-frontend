import { Layout, Empty, Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Loading from '@/components/loading';
import Cluster from './basic/cluster';

interface LayoutProps {
  active?: boolean;
  init?: boolean;
  dispatch: any;
  children?: React.ReactChildren;
}

export default connect(createSelector(
  [
    (props: any) => props.cluster.active,
    (props: any) => props.cluster.init,
  ],
  (active, init) => ({ active, init })
))(({ active, init, dispatch, children }: LayoutProps) => {
  if (active === undefined || !init) {
    if (!!active) dispatch({ type: 'cluster/get' });
    return <Loading />
  } else if (active === false) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Empty style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }} description="插件还未激活" >
          <Button type="primary">立即激活</Button>
        </Empty>
      </div>
    )
  }
  return (
    <Layout style={{ position: 'absolute', background: '#fff', width: '100%', height: '100%' }}>
      <Layout.Sider width="226" style={{ backgroundColor: '#f2f7fb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}>
        <Cluster />
      </Layout.Sider>
      <Layout.Content className="node-body" style={{ position: 'relative' }}>
        {init ? children : null}
      </Layout.Content>
    </Layout>
  )
})
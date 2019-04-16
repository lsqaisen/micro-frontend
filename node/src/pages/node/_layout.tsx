import { Layout } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Loading from '@/components/loading';
import Cluster from './basic/cluster';

interface LayoutProps {
  init?: boolean;
  dispatch: any;
  children?: React.ReactChildren;
}

export default connect(createSelector(
  [
    (props: any) => props.cluster.init,
  ],
  (init) => ({ init })
))(({ init, dispatch, children }: LayoutProps) => {
  if (!init) {
    dispatch({ type: 'cluster/get' });
    return <Loading />
  }
  return (
    <Layout style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Layout.Sider width="226" style={{ backgroundColor: '#f2f7fb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}>
        <Cluster />
      </Layout.Sider>
      <Layout.Content className="node-body" style={{ position: 'relative' }}>
        {init ? children : null}
      </Layout.Content>
    </Layout>
  )
})
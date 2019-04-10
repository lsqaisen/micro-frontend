import { Layout } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Cluster from './cluster';
import { CluseterProps } from './cluster';

export default ({ cluster, currentCluster, children, }: CluseterProps & any) => {
  return (
    <Layout style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Layout.Sider width="226" style={{ backgroundColor: '#f2f7fb', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)' }}>
        <Cluster
          cluster={[...cluster, { name: 'dsef' }]}
          currentCluster={currentCluster}
        />
      </Layout.Sider>
      <Layout.Content style={{ padding: '24px', position: 'relative' }}>
        {children}
      </Layout.Content>
    </Layout>
  )
};
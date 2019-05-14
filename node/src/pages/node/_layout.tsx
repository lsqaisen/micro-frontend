import * as React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Media from 'react-media';
import Cluster from '@/components/cluster';
import Layout from '@/components/global/layout';
import { addClusterRequest } from '@/services/cluster';


export default connect(createSelector(
  [
    (props: any) => props.cluster.data,
    (props: any) => props.cluster.active,
    (props: any) => props.cluster.init,
    (props: any) => {
      const { routing: { location: { query: { cluster } } } } = props;
      return cluster;
    },
  ],
  (data, active, init, clusterName) => ({ data, active, init, clusterName })
))(class extends React.PureComponent<any, any> {
  componentDidMount() {
    const { active, init, dispatch } = this.props;
    if (active === undefined || !init) {
      if (!!active) dispatch({ type: 'cluster/get' });
    }
  }
  render() {
    const { data, clusterName, active, init, location: { pathname }, dispatch, children } = this.props;
    return (
      <Media query="(min-width: 599px)">
        {(matches) => (
          <Layout
            level={1}
            width={226}
            matches={!matches}
            state={active === undefined || !init ? 'initially' : active === false ? 'empty' : 'centent'}
            sider={(pathname.split('\/').filter((v: any) => !!v).length < 2) && <Cluster
              data={data}
              clusterName={clusterName}
              onAdd={(data: addClusterRequest) => {
                return dispatch({
                  type: 'cluster/add',
                  payload: data
                })
              }}
              onDelete={(name: string) => {
                return dispatch({
                  type: 'cluster/delete',
                  payload: name
                })
              }}
            />}
            empty={(
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Empty
                  style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }}
                  description="插件还未激活" >
                  <Button type="primary">立即激活</Button>
                </Empty>
              </div>
            )}
          >
            {init ? children : null}
          </Layout>
        )}
      </Media>
    )
  }
})
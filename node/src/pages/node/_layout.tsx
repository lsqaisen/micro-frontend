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
    (_: any, state: any) => {
      const { location: { query: { cluster } } } = state;
      return cluster;
    },
    (_: any, state: any) => {
      const { location: { pathname } } = state;
      return pathname.split('\/').filter((v: any) => !!v).length < 2;
    },
  ],
  (data, active, init, clusterName, hasSider) => ({ data, active, init, clusterName, hasSider })
))(class extends React.PureComponent<any, any> {
  componentDidMount() {
    const { active, init, dispatch } = this.props;
    if (active === undefined || !init) {
      if (!!active) dispatch({ type: 'cluster/get' });
    }
  }
  render() {
    const { data, clusterName, active, init, hasSider, dispatch, children } = this.props;
    return (
      <Media query="(min-width: 599px)">
        {(matches) => (
          <Layout
            level={1}
            width={226}
            matches={!matches}
            state={active === undefined || !init ? 'initially' : active === false ? 'empty' : 'centent'}
            sider={hasSider && <Cluster
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
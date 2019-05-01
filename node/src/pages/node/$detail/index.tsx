import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import router from 'umi/router';
import { Empty, Button } from 'antd';
import Loading from '@/components/loading';
import DetailCmp from '@/components/detail';
import Charts from '../basic/charts';

@connect(createSelector([
  (props: any) => props.node.metricActive,
  (props: any) => {
    const { location: { pathname } } = props.routing;
    return props.node.details[pathname.split('\/').slice(-1)] || { init: false };
  },
  (props: any) => {
    const { routing: { location: { query: { cluster, resource } } } } = props;
    return { clusterName: cluster, resourceName: resource };
  },
],
  (metricActive, detail, { clusterName, resourceName }) => ({ metricActive, detail, clusterName, resourceName })
))
class Detail extends PureComponent<any, any> {
  detail = (name: string) => {
    return this.props.dispatch({
      type: 'node/detail',
      payload: name,
    })
  }
  getMetricActive = () => {
    return this.props.dispatch({ type: 'node/getMetricActive' })
  }
  componentDidMount() {
    const { match: { params: { detail } } } = this.props;
    this.getMetricActive();
    this.detail(detail)
  }
  render() {
    const {
      metricActive, clusterName, resourceName,
      detail: { init = false, node = {} }, match: { params: { detail } }
    } = this.props;
    if (!init) return <Loading />
    return (
      <div style={{ padding: 24 }}>
        <DetailCmp
          clusterName={clusterName}
          resourceName={resourceName}
          node={node}
          onLoad={() => this.detail(detail)}
        >
          {metricActive === undefined ? <div style={{ height: 240 }}>
            <Loading />
          </div> : (!!metricActive ? (
            <Charts name={node.nodeInfo.name} />
          ) : (
              <div style={{ width: '100%', height: 340, position: 'relative' }}>
                <Empty style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }} description="监控还未激活" >
                  <Button type="primary" onClick={() => router.push('/plugin')}>立即去激活</Button>
                </Empty>
              </div>
            ))}
        </DetailCmp>
      </div>
    )
  }
}

export default Detail;
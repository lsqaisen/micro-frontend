import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Install from '@/components/node/install';
import { getNodesRequest } from '@/services/node';

@connect(createSelector(
  [
    (props: any) => props.node.installs,
    (props: any) => {
      const { routing: { location: { query: { cluster, resource } } } } = props;
      return { clusterName: cluster, resourceName: resource };
    },
    (props: any) => !!props.loading.effects[`node/installs`],
  ],
  (data, { clusterName, resourceName }, loading) => ({ data, clusterName, resourceName, loading })
))
class NodeInstall extends PureComponent<any, any> {
  installs = async (data: getNodesRequest) => {
    await this.props.dispatch({
      type: 'node/installs',
      payload: data,
    })
  }
  componentDidMount() {
    const { clusterName, resourceName } = this.props;
    if (!!clusterName && (!resourceName || resourceName === 'all')) {
      let data: getNodesRequest = {
        cluster: clusterName,
        type: 'install'
      };
      this.installs(data);
    }
  }
  render() {
    const { data } = this.props;
    return (
      <Install data={data} />
    )
  }
}

export default NodeInstall;
import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Node from '@/components/node';
import Install from './install';
import { nodesData } from '@/services/node';

@connect(createSelector(
  [
    (props: any) => {
      const { routing: { location: { query: { resource } } } } = props;
      return props.node.nodes[`${!resource || resource === 'all' ? '$all' : resource}`];
    },
    (props: any) => !!props.loading.effects[`node/nodes`],
  ],
  (node, loading) => ({ node, loading })
))
class Table extends (PureComponent || Component)<any, any> {
  node = async (data: nodesData) => {
    await this.props.dispatch({
      type: 'node/nodes',
      payload: data,
    })
  }
  componentWillReceiveProps({ location: { query: { cluster, resource } } }: any) {
    if (this.props.location.query.resource !== resource && !!resource) {
      let data: nodesData = { cluster, resource };
      this.node(data);
    }
  }
  componentDidMount() {
    const { location } = this.props;
    if (!!location.query.cluster) {
      let data: nodesData = {
        cluster: location.query.cluster,
        resource: !location.query.resource || location.query.resource === 'all' ? '' : location.query.resource
      };
      this.node(data);
    }
  }
  render() {
    const { node = {}, loading, location } = this.props;
    return (
      <Node
        key={location.query.resource}
        loading={loading}
        node={node} >
        <Install />
      </Node>
    )
  }
}

export default Table;
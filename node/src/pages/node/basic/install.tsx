import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Install from '@/components/node/install';
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
class NodeInstall extends (PureComponent || Component)<any, any> {
  render() {
    return (
      <Install />
    )
  }
}

export default NodeInstall;
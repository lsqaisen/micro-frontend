import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Loading from '@/components/loading';
import Cluster from '@/components/cluster';
import { addRequest } from '@/services/cluster';

@connect(createSelector(
  [
    (props: any) => props.cluster.data,
    (props: any) => props.cluster.init,
    (props: any) => {
      const { routing: { location: { query: { cluster } } } } = props;
      return cluster;
    },
  ],
  (data, init, clusterName) => ({ data, init, clusterName })
))
class Node extends (PureComponent || Component)<any, any> {
  add = (data: addRequest) => {
    return this.props.dispatch({
      type: 'cluster/add',
      payload: data
    })
  }
  ['delete'] = (name: string) => {
    return this.props.dispatch({
      type: 'cluster/delete',
      payload: name
    })
  }
  render() {
    const { init, data, clusterName } = this.props;
    console.log(clusterName)
    if (!init) return <Loading />
    return (
      <Cluster
        data={data}
        clusterName={clusterName}
        onAdd={this.add}
        onDelete={this[`delete`]}
      />
    )
  }
}

export default Node;
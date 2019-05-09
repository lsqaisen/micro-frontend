import { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Node from '@/components/node';
import Install from '../install';
import JoinResource from '@/components/resource/join-resource';
import AddNode from '@/components/node/add-node';
import { getNodesRequest, installRequest } from '@/services/node';
import { joinResourceRequest } from '@/services/resource';

@connect(createSelector(
  [
    (props: any) => {
      const { routing: { location: { query: { resource } } } } = props;
      return props.node.nodes[`${!resource || resource === 'all' ? '$all' : resource}`];
    },
    (props: any) => props.node.nodes[`$all`],
    (props: any) => {
      const { routing: { location: { query: { cluster, resource } } } } = props;
      return { clusterName: cluster, resourceName: resource };
    },
    (props: any) => !!props.loading.effects[`node/nodes`],
  ],
  (node, allNode, { clusterName, resourceName }, loading) => ({ node, allNode, clusterName, resourceName, loading })
))
class Table extends PureComponent<any, any> {
  get = async (data: getNodesRequest) => {
    await this.props.dispatch({
      type: 'node/nodes',
      payload: data,
    })
  }
  install = (data: installRequest) => {
    return this.props.dispatch({
      type: 'node/install',
      payload: { ...data, clusterName: this.props.clusterName },
    })
  }
  join = (data: joinResourceRequest) => {
    return new Promise(async (resolve, reject) => {
      let error = this.props.dispatch({
        type: 'resource/join',
        payload: data,
      })
      if (!error) {
        const { clusterName, resourceName } = this.props;
        let data: getNodesRequest = {
          cluster: clusterName,
          resource: !resourceName || resourceName === 'all' ? '' : resourceName
        };
        this.get(data);
        resolve()
      } else {
        reject(error)
      }
    })
  }
  componentWillReceiveProps({ clusterName, resourceName }: any) {
    if (resourceName !== resourceName && !!resourceName) {
      let data: getNodesRequest = { cluster: clusterName, resource: resourceName };
      this.get(data);
    }
  }
  componentDidMount() {
    const { clusterName, resourceName } = this.props;
    if (!!clusterName) {
      let data: getNodesRequest = {
        cluster: clusterName,
        resource: !resourceName || resourceName === 'all' ? '' : resourceName
      };
      this.get(data);
    }
  }
  render() {
    const { node = {}, allNode, loading, resourceName } = this.props;
    return (
      <Fragment>
        <div style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fl" style={{ lineHeight: '40px' }} >
            {!resourceName || resourceName === 'all' ? <Install location={location} /> : undefined}
          </div>
          <div className="fr">
            {!resourceName || resourceName === 'all' ? (
              <AddNode onSubmit={this.install} />
            ) : (
                <JoinResource
                  resourceName={resourceName}
                  onSubmit={this.join}
                  searchNodes={(data: getNodesRequest) => {
                    return new Promise(async (resolve, reject) => {
                      console.log(data)
                      await this.get(data);
                      resolve(allNode.data);
                    })
                  }}
                />
              )}
            <Button style={{ marginLeft: 16 }} loading={loading} onClick={this.get}>刷新</Button>
          </div>
        </div>
        <Node
          key={resourceName}
          loading={loading}
          node={node} >
        </Node>
      </Fragment>
    )
  }
}

export default Table;
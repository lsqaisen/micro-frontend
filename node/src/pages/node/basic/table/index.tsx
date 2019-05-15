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
import Actions from './actions';

@connect(createSelector(
  [
    (props: any, { resourceName }: any) => props.node.nodes[`${!resourceName || resourceName === 'all' ? '$all' : resourceName}`],
    (props: any) => props.node.nodes[`$all`] || { data: [], total: 0 },
    (props: any) => !!props.loading.effects[`node/nodes`],
  ],
  (node, allNode, loading) => ({ node, allNode, loading })
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
      type: 'install/install',
      payload: { ...data, clusterName: this.props.clusterName },
    })
  }
  join = (data: joinResourceRequest) => {
    const { clusterName, resourceName } = this.props;
    return this.props.dispatch({
      type: 'resource/join',
      payload: { clusterName, resourceName, ...data },
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
    const { node = {}, loading, clusterName, resourceName } = this.props;
    return (
      <Fragment>
        <div style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fl" style={{ lineHeight: '40px' }} >
            {!resourceName || resourceName === 'all' ? <Install {...{ clusterName, resourceName }} /> : undefined}
          </div>
          <div className="fr">
            {!resourceName || resourceName === 'all' ? (
              <AddNode onSubmit={this.install} />
            ) : (
                <JoinResource
                  resourceName={resourceName}
                  onSubmit={this.join}
                  searchNodes={(data: getNodesRequest) => {
                    return new Promise(async (resolve) => {
                      await this.get(data).then(() => {
                        const { allNode, resourceName } = this.props;
                        resolve(allNode.data.filter((node: any) => (node.resources || []).indexOf(resourceName) === -1));
                      });
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
          node={node}
          actions={({ node }: any) => {
            const { clusterName, resourceName } = this.props;
            return (
              <Actions {...{
                clusterName, resourceName,
                name: node.name,
                allocatable: node.status.indexOf('SchedulingDisabled') !== -1 ? true : false,
              }} />
            )
          }}
        >
        </Node>
      </Fragment>
    )
  }
}

export default Table;
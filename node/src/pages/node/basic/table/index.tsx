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
import ManageResource from './actions/manage-resource';

@connect(createSelector(
  [
    (props: any, { resourceName }: any) => props.node.nodes[`${!resourceName || resourceName === 'all' ? '$all' : resourceName}`],
    (props: any) => props.node.nodes[`$all`] || { data: [], total: 0 },
    (props: any, { clusterName }: any) => props.resource[clusterName].data,
    (props: any) => !!props.loading.effects[`node/nodes`],
  ],
  (node, allNode, allResources, loading) => ({ node, allNode, allResources, loading })
))
class Table extends PureComponent<any, any> {
  get = async (data: getNodesRequest) => {
    return this.props.dispatch({
      type: 'node/nodes',
      payload: data,
    })
  }
  getCurrent = () => {
    const { clusterName, resourceName } = this.props;
    if (!!clusterName) {
      let data: getNodesRequest = {
        cluster: clusterName,
        resource: !resourceName || resourceName === 'all' ? '' : resourceName
      };
      return this.get(data);
    }
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
    }).then((error: any) => {
      if (!error) {
        this.getCurrent();
      }
    })
  }
  selectNode = (node: any, visible: boolean) => {
    this.setState({ manageResourceVisible: visible, currentNode: node })
  }
  UNSAFE_componentWillReceiveProps({ clusterName, resourceName }: any) {
    if (resourceName !== resourceName && !!resourceName) {
      let data: getNodesRequest = { cluster: clusterName, resource: resourceName };
      this.get(data);
    }
  }
  componentDidMount() {
    this.getCurrent();
  }
  render() {
    const { node = {}, allResources, loading, clusterName, resourceName } = this.props;
    return (
      <Fragment>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
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
        </header>
        <Node
          key={resourceName}
          loading={loading}
          node={node}
          actions={(
            <Actions
              {...{ clusterName, resourceName, selectNode: this.selectNode }}
              onUpdate={this.getCurrent}
            />
          )}
        >
          <ManageResource
            resourceName={resourceName}
            allResources={allResources}
            onUpdate={this.getCurrent}
          />
        </Node>
      </Fragment>
    )
  }
}

export default Table;
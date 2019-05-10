import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import ResourceBasic from '@/components/resource';
import Loading from '@/components/global/loading';
import Table from './basic/table';
import { getResourceRequest, createResourceRequest } from '@/services/resource';

@connect(createSelector(
  [
    (props: any) => props.resource,
    (props: any) => {
      const { routing: { location: { query: { cluster, resource } } } } = props;
      return { clusterName: cluster, resourceName: resource };
    }
  ],
  (resource, { clusterName, resourceName }) => ({ resource, clusterName, resourceName })
))
class Resource extends PureComponent<any, any> {
  get = async (data: getResourceRequest) => {
    await this.props.dispatch({
      type: 'resource/get',
      payload: data,
    })
  }
  add = (data: createResourceRequest) => {
    const { clusterName } = this.props;
    return this.props.dispatch({
      type: 'resource/add',
      payload: { cluster: clusterName, ...data },
    })
  }
  ['delete'] = (name: string) => {
    const { clusterName } = this.props;
    return this.props.dispatch({
      type: 'resource/delete',
      payload: { cluster: clusterName, name }
    })
  }
  componentWillReceiveProps({ clusterName }: any) {
    if (this.props.clusterName !== clusterName && !!clusterName) {
      let data: getResourceRequest = { cluster: clusterName };
      this.get(data);
    }
  }
  componentDidMount() {
    const { clusterName } = this.props;
    console.log(clusterName)
    if (!!clusterName) {
      let data: getResourceRequest = {
        cluster: clusterName
      };
      this.get(data);
    }
  }
  render() {
    const { resource, clusterName, resourceName } = this.props;
    console.log((resource[clusterName] || {}).init)
    if (!(resource[clusterName] || {}).init) return <Loading />
    return (
      <ResourceBasic
        clusterName={clusterName}
        resourceName={resourceName}
        data={[{
          name: 'all',
          tag: '所有节点',
          type: 'builtin',
        }].concat(resource[clusterName].data)}
        onAdd={this.add}
        onDelete={this['delete']}
      >
        <Table />
      </ResourceBasic>
    )
  }
}

export default Resource;
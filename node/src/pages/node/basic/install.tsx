import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Install from '@/components/node/install';
import { getNodesRequest } from '@/services/node';

@connect(createSelector(
  [
    (props: any) => props.install.installs,
    (props: any) => {
      const { routing: { location: { query: { cluster, resource } } } } = props;
      return { clusterName: cluster, resourceName: resource };
    },
    (props: any) => !!props.loading.effects[`install/installs`],
  ],
  (data, { clusterName, resourceName }, loading) => ({ data, clusterName, resourceName, loading })
))
class NodeInstall extends PureComponent<any, any> {
  installs = async (data: getNodesRequest) => {
    await this.props.dispatch({
      type: 'install/installs',
      payload: data,
    })
  }
  cancelInstalling = () => {
    return this.props.dispatch({
      type: 'install/cancelInstalling',
    }).then(this.getList)
  }
  cancelPengding = (ip: string) => {
    return this.props.dispatch({
      type: 'install/cancelPengding',
      payload: ip,
    }).then(this.getList)
  }
  deleteInstallRecord = (ip: string) => {
    return this.props.dispatch({
      type: 'install/deleteInstallRecord',
      payload: ip,
    }).then(this.getList)
  }
  deleteInstallAllRecord = () => {
    return this.props.dispatch({
      type: 'install/deleteInstallAllRecord',
    }).then(this.getList)
  }
  getList = () => {
    const { clusterName, resourceName } = this.props;
    if (!!clusterName && (!resourceName || resourceName === 'all')) {
      let data: getNodesRequest = {
        cluster: clusterName,
        type: 'install'
      };
      this.installs(data);
    }
  }
  componentDidMount() {
    this.getList();
  }
  render() {
    const { data } = this.props;
    return (
      <Install
        data={data}
        getList={this.getList}
        onCancelInstalling={this.cancelInstalling}
        onCancelPengding={this.cancelPengding}
        onDeleteRecord={this.deleteInstallRecord}
        onDeleteAllRecord={this.deleteInstallAllRecord}
      />
    )
  }
}

export default NodeInstall;
import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Resource from '@/components/resource';
import Loading from '@/components/loading';
import Table from './basic/table';
import { resourceData, nodesData } from '@/services/node';

@connect(createSelector(
  [
    (props: any) => props.node.resource[`${props.routing.location.query.cluster}`],
  ],
  (resource) => ({ resource })
))
class Node extends (PureComponent || Component)<any, any> {
  state = {
    init: false
  }
  resource = async (data: resourceData) => {
    await this.props.dispatch({
      type: 'node/resource',
      payload: data,
    })
    !this.state.init && this.setState({ init: true });
  }
  componentWillReceiveProps({ location: { query: { cluster, resource } } }: any) {
    if (this.props.location.query.cluster !== cluster && !!cluster) {
      let data: resourceData = { cluster };
      this.resource(data);
    }
  }
  componentDidMount() {
    const { location } = this.props;
    if (!!location.query.cluster) {
      let data: resourceData = {
        cluster: location.query.cluster
      };
      this.resource(data);
    }
  }
  render() {
    const { resource, location } = this.props;
    const { init } = this.state;
    if (!init) return <Loading />
    return (
      <Resource
        cluster={location.query.cluster}
        currentResource={location.query.resource}
        resource={[{
          name: 'all',
          tag: '所有'
        }].concat(resource)}
      >
        <Table location={location} />
      </Resource>
    )
  }
}

export default Node;
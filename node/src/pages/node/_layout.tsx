import { PureComponent, Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { createSelector } from 'reselect';
import Layout from '@/components';
import Loading from '@/components/loading';

@connect(createSelector(
  [
    (props: any) => props.node.cluster,
  ],
  (cluster) => ({ cluster })
))
class Node extends (PureComponent || Component)<any, any> {
  state = {
    init: false,
  }
  cluster = async () => {
    await this.props.dispatch({ type: 'node/cluster' });
    this.setState({ init: true });
  }
  componentDidMount() {
    this.cluster();
  }
  render() {
    const { cluster, children, location } = this.props;
    const { init } = this.state;
    if (!init) return <Loading />
    return (
      <Layout cluster={cluster} currentCluster={`${location.query.cluster || ''}`}>
        {children}
      </Layout>
    )
  }
}

export default Node;
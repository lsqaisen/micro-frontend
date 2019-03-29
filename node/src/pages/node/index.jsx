import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { Loading, Content } from '_global';
import CreateCluster from 'node/cluster/CreateCluster';
import Nodes from './_basic/nodes/';
import { add } from 'services/node';
const { AnimateLoadBox } = Loading;
const { Header } = Content;

export default connect(createSelector(
  [
    props => (props.user.profile.data || {}).userType,
    props => props.node.cluster,
    props => !!props.loading.effects[`plugin/query`] || !!props.loading.effects[`node/cluster`],
  ],
  (type, cluster, loading) => ({ type, cluster, loading }),
))(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      cluster: {},
    };
    ['cluster']
      .forEach(m => this[m] = this[m].bind(this));
  }
  cluster() {
    const { dispatch } = this.props;
    dispatch({ type: 'node/cluster' });
  }
  UNSAFE_componentWillReceiveProps({ cluster: { data: { clusters }, err } }) {
    const { init, cluster: { name } } = this.state;
    !init && this.setState({ init: true });
    if (clusters.length > 0 && clusters.every(v => v.name !== name)) {
      this.setState({
        cluster: clusters[0],
      })
    }
  }
  componentDidMount() {
    this.cluster();
  }
  render() {
    const { type, cluster: { data: { clusters }, err }, loading } = this.props;
    const { init, cluster: { name } } = this.state;
    return (
      <AnimateLoadBox loading={loading || !init}>
        <Content>
          {!!err || clusters.length <= 0 ? (
            <p>{err || '暂无集群'}</p>
          ) : ([
            <Header
              key="1"
              activeKey={name}
              data={clusters.map(v => ({
                key: v.name,
                name: v.name === 'default' ? '默认' : v.name
              }))}
              tabBarExtraContent={(
                <div>
                  {type === 1 ? <CreateCluster
                    onSubmit={(v) => {
                      return new Promise(async (resolve, reject) => {
                        const response = await add(v)
                        if (!!response.err) {
                          reject(response.err);
                        } else {
                          this.cluster();
                          resolve();
                        }
                      })
                    }} >
                    <Button size="small" type="primary" ghost style={{ marginRight: 16 }}>添加集群</Button>
                  </CreateCluster> : null}
                  {
                    name === 'default' ? null :
                      <Button size="small" type="danger" ghost style={{ marginRight: 16 }}>删除</Button>
                  }
                  <Button
                    size="small"
                    type="primary"
                    style={{ marginRight: 16 }}
                    onClick={(v) => { this.setState({ cluster: {} }); this.cluster() }}>刷新</Button>
                </div>
              )}
            />,
            <Nodes key="2" cluster={name} />
          ])}
        </Content>
      </AnimateLoadBox>
    )
  }
})
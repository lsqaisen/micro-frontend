import { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import QueueAnim from 'rc-queue-anim';
import Item from '@/components/item';
import Plugins from '@/components/plugins';
import { Loading, Page } from 'library';

@connect(createSelector(
  [
    (props: any) => props.plugin.data,
    (props: any) => !!props.loading.effects['plugin/plugins']
  ],
  (plugins, loading) => ({ plugins, loading })
))
class Plugin extends PureComponent<any, any> {
  state = {
    init: false,
  }
  plugins = async () => {
    await this.props.dispatch({
      type: 'plugin/plugins'
    })
    !this.state.init && this.setState({ init: true });
  }
  active = async (id: string) => {
    return this.props.dispatch({
      type: 'plugin/active',
      payload: { name: id }
    })
  }
  del = async (id: string) => {
    return this.props.dispatch({
      type: 'plugin/del',
      payload: { name: id }
    })
  }
  componentDidMount() {
    this.plugins();
  }
  render() {
    const { plugins } = this.props;
    const { init } = this.state;
    if (!init) return <Loading />
    return (
      <Page
        title=""
        routes={[{
          path: '/dashboard',
          breadcrumbName: '总览',
        }, {
          path: '/plugin',
          breadcrumbName: '插件列表',
        }]}>
        <QueueAnim type="alpha">
          <Plugins
            key="plugins"
            plugins={plugins}
            onActive={async (id: string) => await this.active(id)}
            onDel={async (id: string) => await this.del(id)}
          />
        </QueueAnim>
      </Page>
    )
  }
}

export default Plugin;


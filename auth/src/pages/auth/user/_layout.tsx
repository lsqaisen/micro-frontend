import * as React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Media from 'react-media';
import Group from '@/components/group';
import Layout from '@/components/global/layout';


export default connect(createSelector(
  [
    (props: any) => props.group.data,
    (props: any) => props.group.active,
    (props: any) => props.group.init,
    (_: any, state: any) => {
      console.log(state)
      const { location: { query: { group } } } = state;
      return group;
    },
  ],
  (data, active, init, group_id) => ({ data, active, init, group_id })
))(class extends React.PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'group/get' });
  }
  create = (data: any) => {
    return this.props.dispatch({
      type: 'group/create',
      payload: data,
    })
  }
  delete = (group_id: any) => {
    return this.props.dispatch({
      type: 'group/delete',
      payload: group_id,
    })
  }
  UNSAFE_componentWillReceiveProps({ active, init }: any) {
    if (active === undefined || !init) {
      if (!!active) this.get();
    }
  }
  componentDidMount() {
    const { active, init } = this.props;
    if (active === undefined || !init) {
      if (!!active) this.get();
    }
  }
  render() {
    const { data, group_id, active, init, children } = this.props;
    return (
      <Media query="(min-width: 599px)">
        {(matches) => (
          <Layout
            className="node-body"
            level={1}
            width={226}
            matches={!matches}
            state={active === undefined || !init ? 'initially' : active === false ? 'empty' : 'centent'}
            sider={<Group
              group_id={group_id}
              data={data}
              onAdd={this.create}
              onDelete={this.delete}
            />}
            empty={(
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Empty
                  style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }}
                  description="插件还未激活" >
                  <Button type="primary">立即激活</Button>
                </Empty>
              </div>
            )}
          >
            {init ? children : null}
          </Layout>
        )}
      </Media>
    )
  }
})
import { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { createSelector } from 'reselect';
import { Empty, Button } from 'antd';
import Loading from '@/components/global/loading';
import CreateStack from '@/components/stack/add-stack';

@connect(createSelector(
  [
    (props: any) => props.stack.data,
    (props: any) => props.stack.active,
    (props: any) => props.stack.init,
    (_: any, state: any) => {
      const { match: { params: { list } } } = state;
      return list;
    },
  ],
  (data, active, init, stackName) => ({ data, active, init, stackName })
))
class List extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'stack/get' });
  }
  create = (data: any) => {
    return this.props.dispatch({
      type: 'stack/create',
      payload: data,
    })
  }
  UNSAFE_componentWillReceiveProps({ active, init, data, stackName }: any) {
    if (active === undefined || !init) {
      if (!!active) this.get();
    }
    if (data.length > 0 && !stackName) {
      router.push(`/stack/${data[0].name}`)
    }
  }
  componentDidMount() {
    const { active, init, data, stackName } = this.props;
    if (active === undefined || !init) {
      if (!!active) this.get();
    }
    if (data.length > 0 && !stackName) {
      router.push(`/stack/${data[0].name}`)
    }
  }
  render() {
    const { active, init, data } = this.props;
    if (active && init && data.length <= 0) {
      return <div style={{ width: '100%', height: '100%' }}>
        <Empty
          style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }}
          description="未创建应用栈" >
          <div style={{ marginRight: 16 }}>
            <CreateStack
              btn={<Button type="primary">立即创建</Button>}
              onSubmit={this.create}
            />
          </div>
        </Empty>
      </div>
    }
    return (
      <Loading />
    )
  }
}

export default List;
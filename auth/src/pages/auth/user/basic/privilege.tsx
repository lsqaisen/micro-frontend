import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Typography, Button } from 'antd';
import Loading from '@/components/global/loading';
import Table from '@/components/privilege/table';
import Actions from './actions';

@connect(createSelector(
  [
    (props: any) => props.privilege.init,
    (props: any) => props.privilege.data,
    (props: any, { group_id }: any) => props.authuser.data[group_id] || {},
    (props: any) => props.loading.effects[`privilege/get`],
  ],
  (init, data, { group = {}, privileges = [] }, loading) => ({ init, data, group, privileges, loading })
))
export default class extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'privilege/get' });
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { init, data, group, privileges, className, loading } = this.props;
    console.log(group, privileges)
    if (!init) return <Loading />;
    return (
      <div className={className}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
          </div>
          <div className="fr">
            <Button.Group>
              <Button type="primary" loading={loading['auth/updateQx']}>更新</Button>
              <Button type="primary">重置</Button>
            </Button.Group>
          </div>
        </header>
        <section>
          <Typography.Paragraph>
            <Typography.Text>当前角色拥有{data.length}条权限，</Typography.Text>
            <Typography.Text>移除<Typography.Text type="danger">{data.length}</Typography.Text>条权限，</Typography.Text>
            <Typography.Text>新增<Typography.Text style={{ color: '#286cff' }}>{data.length}</Typography.Text>条权限</Typography.Text>
          </Typography.Paragraph>
        </section>
        <Table loading={loading} data={data} privileges={privileges} />
      </div >
    )
  }
}
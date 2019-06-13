import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Typography, Button } from 'antd';
import Loading from '@/components/global/loading';
import Table from '@/components/privilege/table';
import { updatePrivilegesRequest } from '@/services/privilege';

@connect(createSelector(
  [
    (props: any) => props.privilege.init,
    (props: any) => props.privilege.data,
    (props: any, { group_id }: any) => props.authuser.data[group_id] || {},
    (props: any) => props.loading.effects[`privilege/get`] ||  props.loading.effects[`authuser/get`],
    (props: any) => props.loading.effects[`privilege/update`],
  ],
  (init, data, { privileges = [] }, loading, updating) => ({ init, data, privileges, loading, updating })
))
export default class extends PureComponent<any, any> {
  state = {
    add: [],
    remove: [],
  }
  get = () => {
    return this.props.dispatch({ type: 'privilege/get' });
  }
  update = () => {
    const data: updatePrivilegesRequest = {
      group_id: this.props.group_id,
      privileges: (this.props.privileges || []).map((v: any) => v.joint_id).concat(this.state.add.map(v => Number(v))),
      remove_privileges: this.state.remove.map(v => Number(v))
    }
    return this.props.dispatch({
      type: 'privilege/update',
      payload: data
    });
  }

  render() {
    const { init, data, privileges, className, loading, updating } = this.props;
    const { add, remove } = this.state;
    if (!init) return <Loading />;
    return (
      <div className={className}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
          </div>
          <div className="fr">
            <Button.Group>
              <Button
                type="primary"
                loading={updating}
                disabled={!add.length && !remove.length}
                onClick={this.update}
              >更新</Button>
              <Button
                type="primary"
                disabled={!add.length && !remove.length}
                onClick={() => this.setState({ add: [], remove: [] })}
              >重置</Button>
            </Button.Group>
          </div>
        </header>
        <section>
          <Typography.Paragraph>
            <Typography.Text>当前角色拥有{(privileges || []).length}条权限，</Typography.Text>
            <Typography.Text>移除<Typography.Text type="danger">{remove.length}</Typography.Text>条权限，</Typography.Text>
            <Typography.Text>新增<Typography.Text style={{ color: '#286cff' }}>{add.length}</Typography.Text>条权限</Typography.Text>
          </Typography.Paragraph>
        </section>
        <Table
          loading={loading}
          data={data}
          privileges={privileges || []}
          add_privileges={add}
          remove_privileges={remove}
          onChange={(remove, add) => this.setState({ remove, add })}
        />
      </div >
    )
  }
}
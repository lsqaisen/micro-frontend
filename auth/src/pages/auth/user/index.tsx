import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Tabs } from 'antd';
import User from './basic/user';
import Privilege from './basic/privilege';
import UserBox from '@/components/user';

@connect(createSelector(
  [
    ({ [`${MODEL}_group`]: group }: any) => group.data,
    (_: any, { location: { query: { group } } }: any) => group,
  ],
  (data, group_id) => ({ data, group_id })
), createSelector(
  [
    (dispatch: any) => () => dispatch({ type: `${MODEL}_privilege/get` }),
  ],
  (getPrivileges) => ({ getPrivileges })
))
export default class extends PureComponent<any, any> {
  componentDidMount() {
    this.props.getPrivileges()
  }
  render() {
    const { data, group_id } = this.props;
    let group = data.find((v: any) => `${v.group_id}` === group_id) || {};
    const { desc, name } = group_id === "*" ? {
      name: "",
      desc: ""
    } : {
        name: group.name,
        desc: group.description,
      };
    return (
      <UserBox {...{ desc, name }} >
        {group_id === "*" ? (
          <User className="box" group_id={group_id} />
        ) : (
            <Tabs className="box" >
              <Tabs.TabPane tab="用户列表" key="1" forceRender>
                <User group_id={group_id} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="权限列表" key="2">
                <Privilege group_id={group_id} />
              </Tabs.TabPane>
            </Tabs>
          )}
      </UserBox>
    )
  }
}
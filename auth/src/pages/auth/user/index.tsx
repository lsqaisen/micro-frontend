import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Tabs } from 'antd';
import User from './basic/user';
import Privilege from './basic/privilege';
import UserBox from '@/components/user';

@connect(createSelector(
  [
    (props: any) => props.group.data,
    (_: any, state: any) => {
      const { location: { query: { group } } } = state;
      return group;
    },
  ],
  (data, group_id) => ({ data, group_id })
))
export default class extends PureComponent<any, any> {
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
            <Tabs className="box">
              <Tabs.TabPane tab="用户列表" key="1">
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
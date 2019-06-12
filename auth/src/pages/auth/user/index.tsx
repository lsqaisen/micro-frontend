import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Tabs } from 'antd';
import User from './basic/user';
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
        <User group_id={group_id} />
      </UserBox>
    )
  }
}
import { connect } from 'dva';
import { createSelector } from 'reselect';
import List from '@/components/app';
import Table from './basic/table';

export default connect(createSelector(
  [
    (props: any, state: any) => {
      const { match: { params: { list } } } = state;
      return props.stack.data.find((v: any) => v.name === list);
    },
  ],
  ({ name, desc }) => ({ name, desc })
))(({ name, desc }: any) => (
  <List name={name} desc={desc}>
    <Table stackName={name} />
  </List>
))
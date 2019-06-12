import { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Table from '@/components/user/table';

@connect()
export default class extends PureComponent<any, any> {
  render() {
    return (
      <div>
        <Table
          loading={false}
          list={{ total: 0, data: [] }}
          actions={() => <div />}
        />
      </div>
    )
  }
}
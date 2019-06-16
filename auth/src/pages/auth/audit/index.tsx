import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button, Select, Input, Row, Col } from 'antd';
import Audit from '@/components/audit';
import Table from '@/components/audit/table';
import Detail from '@/components/audit/detail';
import { getAuditsRequest } from '@/services/config';
import Actions from './basic/actions';

const InputGroup = Input.Group;
const SearchInput = Input.Search;
const Option = Select.Option;

@connect(createSelector(
  [
    ({ [`${MODEL}_audit`]: audit }: any) => audit.data,
    props => !!props.loading.effects[`${MODEL}_audit/get`],
  ],
  (audit, loading) => ({ audit, loading }),
), createSelector(
  [
    (dispatch: any) => (data: getAuditsRequest) => dispatch({
      type: `${MODEL}_audit/get`,
      payload: data
    }),
  ],
  (getAudits) => ({ getAudits })
))
export default class extends PureComponent<any, any> {
  state = {
    query: 'ftQuery=',
    page: 1,
    itemsPerPage: 10,
  };
  componentDidMount() {
    const { page, itemsPerPage, query } = this.state;
    this.props.getAudits({ page, itemsPerPage, query });
  }
  render() {
    const { audit, loading, getAudits } = this.props;
    const { page, itemsPerPage, query } = this.state;
    return (
      <Audit>
        <div className="box">
          <header style={{ overflow: 'hidden' }}>
            <Row>
              <Col xs={24} md={16} lg={16} style={{ overflow: 'auto', marginBottom: 12 }}>
                <InputGroup
                  style={{ float: 'left', width: 'auto' }}
                  compact
                >
                  <Select
                    style={{ width: 180, maxWidth: '35%' }}
                    placeholder={'查询类型'}
                    value={query.split("=").slice(0, 1)[0]}
                    onChange={(value: string) => this.setState({ query: `${value}=${query.split("=").slice(-1)}` })}
                  >
                    <Option value="ftQuery">全部</Option>
                    <Option value="module">操作模块</Option>
                    <Option value="object">操作对象</Option>
                    <Option value="userName">操作者</Option>
                  </Select>
                  <SearchInput
                    placeholder="关键字"
                    style={{ width: 240, maxWidth: '65%' }}
                    value={query.split("=").slice(-1)}
                    onChange={(e) => this.setState({ query: `${query.split("=").slice(0, 1)}=${e.target.value}` })}
                    onSearch={(value) => getAudits({ page, itemsPerPage, query: `${query.split("=").slice(0, 1)}=${value}` })}
                  />
                </InputGroup>
              </Col>
              <Col xs={24} md={8} lg={8} style={{ overflow: 'auto', marginBottom: 12 }}>
                <div className="fr">
                  <Button
                    ghost
                    type="primary"
                    style={{ marginTop: 1, float: 'left' }}
                    loading={loading}
                    onClick={() => getAudits({ page, itemsPerPage, query })}
                  >刷新</Button>
                </div>
              </Col>
            </Row>
          </header>

          <Table
            pagination={{
              total: Number(audit.total),
              current: page,
              pageSize: itemsPerPage,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: (page, itemsPerPage) => getAudits({ page, itemsPerPage, query }).then((err: any) => {
                !err && this.setState({ page, itemsPerPage })
              }),
              onShowSizeChange: (page, itemsPerPage) => getAudits({ page, itemsPerPage, query }).then((err: any) => {
                !err && this.setState({ page, itemsPerPage })
              }),
              showTotal: total => `共 ${total} 条`,
            }}
            loading={loading}
            data={audit.list}
            actions={<Actions />}
          >
            <Detail />
          </Table>
        </div>
      </Audit>
    )
  }
}
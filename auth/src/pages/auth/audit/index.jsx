// import { Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { Button, Select, Input } from 'antd';
// import { Content } from '_global';
// import Audit from 'auth/audit/';
// const InputGroup = Input.Group;
// const SearchInput = Input.Search;
// const Option = Select.Option;
// const { TableBox } = Content;

// export default connect(createSelector(
//     [
//         props => props.auth.audit,
//         props => !!props.loading.effects[`auth/audit`],
//     ],
//     (audit, loading) => ({ audit, loading }),
// ))(class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             query: 'ftQuery=',
//             page: 1,
//             itemsPerPage: 10,
//         };
//         [`audit`]
//             .forEach(m => this[m] = this[m].bind(this));
//     }
//     async audit(page, itemsPerPage, query) {
//         const { dispatch } = this.props;
//         this.setState({ page, itemsPerPage, query });
//         await dispatch({
//             type: 'auth/audit',
//             payload: { page, itemsPerPage, query }
//         });
//     }
//     componentDidMount() {
//         const { page, itemsPerPage, query } = this.state;
//         this.audit(page, itemsPerPage, query);
//     }
//     render() {
//         const { audit: { data: { logs = [], totalItems = 0 }, err = null }, loading } = this.props;
//         const { page, itemsPerPage, query } = this.state;
//         return (
//             <Content>
//                 <TableBox
//                     radio={[
//                         <InputGroup compact
//                             style={{ float: 'left', marginRight: 16, width: 'auto' }}>
//                             <Select
//                                 style={{ width: 100 }}
//                                 placeholder={'查询类型'}
//                                 value={query.split("=").slice(0, 1)}
//                                 onChange={(value) => this.setState({ query: `${value}=${query.split("=").slice(-1)}` })}
//                             >
//                                 <Option value="ftQuery">全部</Option>
//                                 <Option value="module">操作模块</Option>
//                                 <Option value="object">操作对象</Option>
//                                 <Option value="userName">操作者</Option>
//                             </Select>
//                             <SearchInput
//                                 placeholder="关键字"
//                                 style={{ width: 240 }}
//                                 value={query.split("=").slice(-1)}
//                                 onChange={(e) => this.setState({ query: `${query.split("=").slice(0, 1)}=${e.target.value}` })}
//                                 onSearch={(value) => this.audit(page, itemsPerPage, `${query.split("=").slice(0, 1)}=${value}`)}
//                             />
//                         </InputGroup>,
//                         <Button
//                             ghost
//                             type="primary"
//                             style={{ marginTop: 1, float: 'left' }}
//                             loading={loading}
//                             onClick={() => this.audit(page, itemsPerPage, query)}
//                         >刷新</Button>,
//                     ]}>
//                     <Audit
//                         locale={{
//                             emptyText: err || '暂无数据',
//                         }}
//                         loading={loading}
//                         data={logs.map(v => ({ ...v, key: v.id }))}
//                         pagination={{
//                             total: Number(totalItems || 0),
//                             current: page,
//                             pageSize: itemsPerPage,
//                             showSizeChanger: true,
//                             showQuickJumper: true,
//                             onChange: (page, itemsPerPage) => this.audit(page, itemsPerPage, query),
//                             onShowSizeChange: (page, itemsPerPage) => this.audit(page, itemsPerPage, query),
//                             showTotal: total => `共 ${total} 条`,
//                         }}
//                     />
//                 </TableBox>
//             </Content >
//         )
//     }
// })

export default () => 'sdfsdf'
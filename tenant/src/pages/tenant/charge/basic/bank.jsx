// import { Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { Button, Tooltip } from 'antd';
// import Bank from 'tenant/charge/Bank';
// import { AddBank, EditBank, DeleteBank } from './_actions/'

// export default connect(createSelector(
//     [
//         props => props.charge.rechargeconfig,
//         props => !!props.loading.effects[`charge/rechargeconfig`],
//     ],
//     (rechargeconfig, loading) => ({ rechargeconfig, loading }),
// ))(class extends Component {
//     constructor(props) {
//         super(props);
//         [`rechargeconfig`]
//             .forEach(m => this[m] = this[m].bind(this));
//     }
//     async rechargeconfig() {
//         const { dispatch } = this.props;
//         await dispatch({
//             type: 'charge/rechargeconfig',
//         });
//     }
//     componentDidMount() {
//         this.rechargeconfig();
//     }

//     render() {
//         const { rechargeconfig: { data, err }, loading } = this.props;
//         const callback = async () => await this.rechargeconfig();
//         return (
//             <div>
//                 <div style={{ marginBottom: 16, overflow: 'hidden' }}>
//                     <AddBank style={{ marginRight: 16 }} callback={callback} />
//                     <Button type="primary" ghost style={{ marginRight: 16 }} loading={loading} onClick={callback}>刷新</Button>
//                 </div>
//                 <Bank
//                     locale={{
//                         emptyText: err || '暂无数据',
//                     }}
//                     loading={loading}
//                     data={data.map(v => ({ ...v, key: v.id }))}
//                     pagination={{
//                         showSizeChanger: true,
//                         showQuickJumper: true,
//                         showTotal: total => `共 ${total} 条`,
//                     }}
//                     actions={[{
//                         title: '操作',
//                         width: 72,
//                         render: (t, r, i) => (
//                             <div>
//                                 <Tooltip title="编辑" >
//                                     <span>
//                                         <EditBank
//                                             style={{ marginRight: 8 }}
//                                             data={r.content}
//                                             callback={callback}
//                                         />
//                                     </span>
//                                 </Tooltip>
//                                 <Tooltip title="删除" >
//                                     <span>
//                                         <DeleteBank
//                                             style={{ marginRight: 8 }}
//                                             name={(r.content || {}).bank_branch}
//                                             bankid={r.id}
//                                             callback={callback}
//                                         />
//                                     </span>
//                                 </Tooltip>
//                             </div>
//                         )
//                     }]}
//                 />
//             </div>
//         )
//     }
// })
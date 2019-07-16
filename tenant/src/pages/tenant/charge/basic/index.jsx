// import { Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { Tabs } from 'antd';
// import { Loading, Error, Content } from '_global';
// import Order from './order';
// import Charge from './charge';
// import Bank from './bank';
// import { ModifyStatus } from './_actions/';

// const { AnimateLoadBox } = Loading;
// const { TableBox } = Content;
// const TabPane = Tabs.TabPane;

// export default connect(createSelector(
//     [
//         props => (props.user.profile.data || {}).userType === 1,
//         props => props.charge.status,
//     ],
//     (admin, status) => ({ admin, status })
// ))(class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             running: undefined,
//         }
//     }
//     status() {
//         const { dispatch } = this.props;
//         dispatch({
//             type: 'charge/status'
//         })
//     }
//     UNSAFE_componentWillReceiveProps({ status: { data = {} } }) {
//         const { status: { _data = {} } } = this.props;
//         if (data.running !== _data.running) {
//             this.setState({
//                 running: data.running,
//             })
//         }
//     }
//     componentDidMount() {
//         this.status();
//     }
//     render() {
//         const { admin } = this.props;
//         const { running } = this.state;
//         const callback = async () => await this.status();
//         return (
//             <AnimateLoadBox loading={running === undefined}>
//                 {running ? (
//                     <Content>
//                         <TableBox border={false}  >
//                             {running ? <div className="content-tabs">
//                                 <Tabs type="card" tabBarExtraContent={(
//                                     <ModifyStatus
//                                         style={{ zIndex: 999 }}
//                                         status={running}
//                                         callback={callback}
//                                     />
//                                 )}>
//                                     {admin ? [
//                                         <TabPane tab="充值记录" key="1">
//                                             <Charge />
//                                         </TabPane>,
//                                         <TabPane tab="消费账单" key="2">
//                                             <Order admin={admin} />
//                                         </TabPane>,
//                                         <TabPane tab="银行网点" key="3">
//                                             <Bank />
//                                         </TabPane>,
//                                         <TabPane tab="计费定价" key="4">
//                                         </TabPane>
//                                     ] : [
//                                             <TabPane tab="我的账单" key="1">
//                                                 <Order admin={admin} />
//                                             </TabPane>,
//                                             <TabPane tab="充值记录" key="2">
//                                                 <Charge />
//                                             </TabPane>,
//                                         ]}
//                                 </Tabs>
//                             </div> : null}
//                         </TableBox>
//                     </Content >
//                 ) : (
//                         <div className="center-box">
//                             <Error.Inactive>
//                                 <div style={{ textAlign: 'center', margin: '24px' }}>
//                                     <ModifyStatus status={running} callback={callback} />
//                                 </div>
//                             </Error.Inactive>
//                         </div>
//                     )}
//             </AnimateLoadBox>
//         )
//     }
// })

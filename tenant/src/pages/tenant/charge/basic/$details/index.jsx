// import { Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { Loading, Error } from '_global';

// const { AnimateLoadBox } = Loading;

// export default connect(createSelector(
//     [
//         props => props.charge.details,
//         props => !!props.loading.effects[`charge/details`],
//     ],
//     (admin, status) => ({ admin, status })
// ))(class extends Component {
//     constructor(props) {
//         super(props);
//         const type = props.match.params.details;
//         this.state = {
//             type: type !== 'consume' && type !== 'order' ? false : type,
//             id: props.location.query.id || false,
//         }
//     }
//     details(type, id) {
//         const { dispatch } = this.props;
//         dispatch({
//             type: 'charge/details',
//             payload: { type, id },
//         })
//     }
//     componentDidMount() {
//         const { type, id } = this.state;
//         this.details(type, id);
//     }
//     render() {
//         const { type, id } = this.state;
//         console.log(this.props, type, id)
//         if (!type) {
//             return (
//                 <div className="center-box">
//                     <Error.Page404 />
//                 </div>
//             )
//         } else if (!!type && !id) {
//             return (
//                 <div className="center-box">
//                     <Error.PageError>
//                         <p style={{ textAlign: 'center', fontSize: '18px', color: '#2B73F8' }}>{type === 'consume' ? '未知的消费记录' : '未知的订单记录'}</p>
//                     </Error.PageError>
//                 </div>
//             )
//         }
//         return (
//             <AnimateLoadBox loading={true}>
//             </AnimateLoadBox>
//         )
//     }
// })

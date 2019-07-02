// import { Component } from 'react';
// import { connect } from 'dva';
// import { createSelector } from 'reselect';
// import { DatePicker, Button } from 'antd';
// import Charge from 'tenant/charge/Charge';
// import { SearchSelect } from '_global';
// import { tenants } from 'services/tenant';
// const { RangePicker } = DatePicker;

// export default connect(createSelector(
//     [
//         props => (props.user.profile.data || {}).userType === 1,
//         props => props.charge.charge,
//         props => !!props.loading.effects[`charge/charge`],
//     ],
//     (admin, charge, loading) => ({ admin, charge, loading }),
// ))(class extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             time_from: "",
//             time_to: "",
//             tenant_name: "",
//             page: 1,
//             page_size: 10,
//         };
//         [`charge`]
//             .forEach(m => this[m] = this[m].bind(this));
//     }
//     async charge(time_from, time_to, tenant_name, page, page_size) {
//         const { dispatch } = this.props;
//         this.setState({ page, page_size });
//         await dispatch({
//             type: 'charge/charge',
//             payload: { time_from, time_to, tenant_name, page, page_size }
//         });
//     }
//     componentDidMount() {
//         const { time_from, time_to, tenant_name, page, page_size } = this.state;
//         this.charge(time_from, time_to, tenant_name, page, page_size);
//     }
//     render() {
//         const {
//             admin, loading,
//             charge: { data: { items = [], total = 0 }, err = null },
//         } = this.props;
//         const { time_from, time_to, tenant_name, page, page_size } = this.state;
//         return (
//             <div>
//                 <div style={{ marginBottom: 16, overflow: 'hidden' }}>
//                     <div style={{ float: 'left' }}>
//                         <Button type="primary" ghost style={{ marginRight: 16 }} loading={loading} onClick={() => this.charge(time_from, time_to, tenant_name, page, page_size)}>刷新</Button>
//                     </div>
//                     <div style={{ float: 'right' }}>
//                         {admin ? <SearchSelect
//                             allowClear
//                             style={{ width: '140px', marginRight: 16 }}
//                             placeholder='工作空间'
//                             onChange={(tenant_name) => this.setState({ tenant_name })}
//                             onSearch={(params) => {
//                                 const { page = 1, page_size = 10 } = params || {};
//                                 return new Promise(async (resolve, reject) => {
//                                     try {
//                                         let response = await tenants({ page, page_size });
//                                         if (response.err) {
//                                             reject(response.err)
//                                         } else {
//                                             resolve({
//                                                 data: ((response.data || {}).projectList || []).map(v => ({
//                                                     key: v.name,
//                                                     label: `${v.name}`
//                                                 })),
//                                                 params: (response.data || {}).total <= page_size * page ? null : {
//                                                     page: page + 1,
//                                                     page_size,
//                                                 }
//                                             })
//                                         }
//                                     } catch (error) {
//                                         reject(error)
//                                     }
//                                 })
//                             }}
//                         /> : null}
//                         <RangePicker
//                             style={{ marginRight: 16, width: '240px' }}
//                             onChange={(date, dateString) => {
//                                 this.setState({
//                                     time_from: dateString[0],
//                                     time_to: dateString[1]
//                                 })
//                             }}
//                         />
//                         <Button type="primary" ghost style={{ marginRight: 16 }} loading={loading} onClick={() => this.charge(time_from, time_to, tenant_name, page, page_size)}>搜索</Button>
//                     </div>
//                 </div>
//                 <Charge
//                     locale={{
//                         emptyText: err || '暂无数据',
//                     }}
//                     loading={loading}
//                     data={items.map(v => ({ ...v, key: v.business_number }))}
//                     pagination={{
//                         total: Number(total || 0),
//                         current: page,
//                         pageSize: page_size,
//                         showSizeChanger: true,
//                         showQuickJumper: true,
//                         onChange: (page, page_size) => this.charge(time_from, time_to, tenant_name, page, page_size),
//                         onShowSizeChange: (page, page_size) => this.charge(time_from, time_to, tenant_name, page, page_size),
//                         showTotal: total => `共 ${total} 条`,
//                     }}
//                     actions={admin ? [{
//                         title: '操作',
//                         width: 72,
//                         render: (t, r, i) => (
//                             null
//                         )
//                     }] : []}
//                 />
//             </div>
//         )
//     }
// })

import { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Table from '@/components/charge/list/table';

@connect(createSelector(
	[
		({ [`${MODEL}_tenant`]: tenant }: any) => tenant.data,
		({ [`${MODEL}_tenant`]: tenant }: any) => (tenant.users || {}).list || [],
		({ [`${MODEL}_quota`]: quota }: any) => quota.overset,
		props => !!props.loading.effects[`${MODEL}_tenant/get`],
	],
	(data, users, overset, loading) => ({ data, users, overset, loading })
), createSelector(
	[
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_charge/get`, payload: data }),
	],
	(getTenants) => ({ getTenants })
))
export default class extends PureComponent<any, any> {
	static readonly defaultProps = {
		routes: [{
			path: '/dashboard',
			breadcrumbName: '总览',
		}]
	};

	state = {
		page: 1,
		page_size: 10,
	};

	get = () => {
		const { page, page_size } = this.state;
		this.props.getTenants({ page, page_size })
	};

	componentDidMount() {
		this.get()
	}

	render() {
		const { data, routes, loading } = this.props;
		return (
			<Fragment>
				<header style={{ overflow: 'hidden' }}>
					<div className="fr">
						<Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
					</div>
					<div className="fr">
						{/* <AddTenant update={this.get} /> */}
					</div>
				</header>
				<Table
					loading={loading}
					data={data}
					actions={<div />}
				>
				</Table>
			</Fragment>
		)
	}
}
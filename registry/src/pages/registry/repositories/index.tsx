import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { Page } from 'library';
import Table from '@/components/repositories/table';
import UploadRepository from './basic/actions/upload-repository';

@connect(createSelector(
	[
		({ [`${MODEL}_list`]: list }: any) => list.data,
		props => !!props.loading.effects[`${MODEL}_list/get`],
	],
	(data, loading) => ({ data, loading })
), createSelector(
	[
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_list/get`, payload: data }),
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_list/create`, payload: data }),
	],
	(get, createTenant) => ({ get, createTenant })
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
		this.props.get({ page, page_size })
	};

	componentDidMount() {
		this.get();
	}

	render() {
		const { data, users, routes, loading } = this.props;
		return (
			<Page
				style={{ minHeight: '100%' }}
				title=""
				routes={routes.concat([{
					path: `/registry/repositories`,
					breadcrumbName: '镜像列表',
				}])}
			>
				<section className="box">
					<header style={{ overflow: 'hidden', marginBottom: 16 }}>
						<div className="fr">
							<Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
						</div>
						<div className="fr">
							<UploadRepository update={this.get} />
						</div>
					</header>
					<Table
						loading={loading}
						data={data}
						users={users}
						openTags={(repository) => {

						}}
					>
						{/* <EditProject key="edit" update={this.get} /> */}
					</Table>
				</section>
			</Page>
		)
	}
}
import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { Page } from 'library';
import Table from '@/components/project/table';
import Actions from './basic/actions';
import EditProject from './basic/actions/edit-project';
import SetProjectOwenr from './basic/actions/set-project-owenr';
import AddProject from './basic/actions/add-project';

@connect(createSelector(
	[
		({ [`${MODEL}_project`]: project }: any) => project.data,
		({ [`${MODEL}_project`]: project }: any) => (project.users || {}).list || [],
		props => !!props.loading.effects[`${MODEL}_project/get`],
	],
	(data, users, loading) => ({ data, users, loading })
), createSelector(
	[
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/get`, payload: data }),
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_project/create`, payload: data }),
		(dispatch: any) => () => dispatch({ type: `${MODEL}_project/getusers`, payload: { group_id: "*" } }),
	],
	(get, createTenant, getUsers) => ({ get, createTenant, getUsers })
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
		this.props.getUsers();
	}

	render() {
		const { data, users, routes, loading } = this.props;
		return (
			<Page
				style={{ minHeight: '100%' }}
				title=""
				routes={routes.concat([{
					path: `/registry/projects`,
					breadcrumbName: '镜像仓库',
				}])}
			>
				<section className="box">
					<header style={{ overflow: 'hidden', marginBottom: 16 }}>
						<div className="fr">
							<Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
						</div>
						<div className="fr">
							<AddProject update={this.get} />
						</div>
					</header>
					<Table
						loading={loading}
						data={data}
						users={users}
						actions={<Actions update={this.get} />}
					>
						<EditProject key="edit" update={this.get} />
						<SetProjectOwenr key="owenr" update={this.get} />
					</Table>
				</section>
			</Page>
		)
	}
}
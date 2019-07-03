import * as React from 'react';
import { PureComponent } from 'react';
import { PageHeader } from 'antd';
import Link from 'umi/link';

export type UserProps = {
	name?: string,
	desc?: string,
	routes?: any[];
}

class Config extends PureComponent<UserProps, any> {
	static readonly defaultProps = {
		routes: [{
			path: '/dashboard',
			breadcrumbName: '总览',
		}, {
			path: '/auth',
			breadcrumbName: '工作空间',
		}, {
			path: '/auth/charge',
			breadcrumbName: '计费管理',
		}],
	}

	render() {
		const { name, desc, routes, children } = this.props;
		return (
			<PageHeader
				style={{ minHeight: '100vh' }}
				title={name}
				subTitle={desc}
				breadcrumb={{
					routes,
					itemRender(route, _, routes) {
						const last = routes.indexOf(route) === routes.length - 1;
						return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
					}
				}}
			>
				{children}
			</PageHeader>
		)
	}
}

export default Config;
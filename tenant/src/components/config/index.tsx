import * as React from 'react';
import { PureComponent } from 'react';
import { Page } from 'library';
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
			path: '/auth/config',
			breadcrumbName: '系统设置',
		}],
	}

	render() {
		const { name, desc, routes, children } = this.props;
		return (
			<Page
				style={{ minHeight: '100vh' }}
				link={<Link to="" />}
				title={name}
				subTitle={desc}
				routes={routes}
			>
				{children}
			</Page>
		)
	}
}

export default Config;
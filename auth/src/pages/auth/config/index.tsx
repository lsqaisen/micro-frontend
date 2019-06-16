import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col, PageHeader } from 'antd';
import Loading from '@/components/global/loading';
import Config from '@/components/config';
import Smtp from './basic/smtp';
import Ldap from './basic/ldap';

@connect(undefined, createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_config/get` }),
	],
	(getConfig) => ({ getConfig })
))
export default class extends PureComponent<any, any> {
	componentDidMount() {
		this.props.getConfig();
	}
	render() {
		return (
			<Config>
				<Row className="box">
					<Col xl={12} md={24}>
						<Smtp />
					</Col>
					<Col xl={12} md={24}>
						<Ldap />
					</Col>
				</Row>
			</Config>
		)
	}
}
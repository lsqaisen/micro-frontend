import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
import Loading from '@/components/global/loading';
// import Smtp from './smtp';
// import Ldap from './ldap';

@connect(createSelector(
	[
		(props: any) => props.auth.config,
		(props: any) => !!props.loading.effects[`auth/config`],
	],
	(config, loading) => ({ config, loading }),
))
export default class extends PureComponent<any, any> {
	state = {
		init: false
	}
	config = async () => {
		const { dispatch } = this.props;
		return dispatch({ type: 'auth/config' })
			.then(() => this.setState({ init: true }));
	}
	componentDidMount() {
		this.config();
	}
	render() {
		const { config: { data: { email = {}, ldap = {} }, err = null } } = this.props;
		const { init } = this.state;
		return (
			<Row>
				<Col xxl={12} span={24}>
					{/* <Smtp data={email} update={this.config} /> */}
				</Col>
				<Col xxl={12} span={24}>
					{/* <Ldap data={ldap} update={this.config} /> */}
				</Col>
			</Row>
		)
	}
}
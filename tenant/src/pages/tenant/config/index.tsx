import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
import Config from '@/components/config';
import Quota from './basic/quota';
import Overset from './basic/overset';

@connect(undefined, createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/get` }),
		(dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/get` }),
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
						<Quota />
					</Col>
					<Col xl={12} md={24}>
						<Overset />
					</Col>
				</Row>
			</Config>
		)
	}
}
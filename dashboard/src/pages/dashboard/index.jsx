import styles from './index.less';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Link from 'umi/link';
import { Row, Col, Button } from 'antd';
import {
	Resource,
	Alarm,
	ClusterNode,
	Scheduling,
	Balance,
	Monitor,
	Log,
	Network,
	ResourceTop10,
	ServiceInstance,
	Registry,
	// Images
} from './basic/';

export default connect(createSelector(
	[
		props => (props.dashboard_user.profile.data || {}).userType,
		props => (props.dashboard_user.profile.data || {}).current,
	],
	(type, namespace) => {
		if (namespace === 'default') {
			return ({ type, namespace: '' })
		} else {
			return ({ type, namespace })
		}
	}
))(({ active, type, namespace, loading }) => {
	return <div className={styles[`metric`]} >
		<Row gutter={16}>
			<Col span={18} className={styles[`item`]} >
				<Resource {...{ type, namespace }} />
			</Col>
			<Col span={6} className={styles[`item`]} >
				<Alarm  {...{ type, namespace }} />
			</Col>
			<Col span={6} className={styles[`item`]} >
				<ClusterNode  {...{ type, namespace }} />
			</Col>
			<Col span={18} className={styles[`item`]} >
				<Network  {...{ type, namespace }} />
			</Col>
			<Col span={12} className={styles[`item`]} >
				<ResourceTop10 {...{ type, namespace }} />
			</Col>
			<Col span={12} className={styles[`item`]} >
				<ServiceInstance {...{ type, namespace }} />
			</Col>
			<Col span={6} className={styles[`item`]} >
				<Registry />
			</Col>
			<Col span={6} className={styles[`item`]} >
				{/* <Images /> */}
			</Col>
			{type === 1 ? [
				<Col key="scheduling" span={12} className={styles[`item`]} >
					<Scheduling  {...{ type, namespace }} />
				</Col>,
				<Col key="balance" span={12} className={styles[`item`]} >
					<Balance {...{ type, namespace }} />
				</Col>,
				<Col key="monitor" span={12} className={styles[`item`]} >
					<Monitor {...{ type, namespace }} />
				</Col>,
				<Col key="log" span={12} className={styles[`item`]} >
					<Log  {...{ type, namespace }} />
				</Col>
			] : null}
		</Row>
	</div>
});
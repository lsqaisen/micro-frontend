import { PureComponent } from 'react';
import { Modal, Switch } from 'antd';
import SetQuotaForm from '../tenant/form/set-tenant-quota-form';

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	quota: { [key: string]: any };
	test: () => any;
	submit: () => any;
	changeStatus: (enable: boolean) => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { quota, loading, test, submit, changeStatus } = this.props;
		const set = Object.keys(quota).every(key => !!quota[key]);
		return (
			<div>
				<h3 style={{
					paddingLeft: 8,
					padding: '4px 8px',
					marginBottom: 16,
					height: '30px',
					lineHeight: '22px',
					borderLeft: '3px solid #2B73F8'
				}}>
					<span style={{ float: 'left', marginRight: 16 }}>资源默认配额</span>
					{set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span>}
				</h3>
				<SetQuotaForm data={quota} ref="setquotaform" />
			</div>
		);
	}
}

export default Smtp;
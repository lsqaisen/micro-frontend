import { PureComponent } from 'react';
import SetQuotaForm from './form/set-quota-form';

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	quota: { [key: string]: any };
	reset: () => any;
	submit: () => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { quota, loading, reset, submit } = this.props;
		delete quota.disk;
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
				<SetQuotaForm
					loading={loading}
					set={set}
					data={quota}
					submit={submit}
					reset={reset}
				/>
			</div>
		);
	}
}

export default Smtp;
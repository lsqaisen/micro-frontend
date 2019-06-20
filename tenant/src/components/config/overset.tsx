import { PureComponent } from 'react';
import { Modal, Switch } from 'antd';
import OversetForm from '../tenant/form/overset-tenant-form';

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	over_set: string;
	submit: () => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { over_set, loading, submit } = this.props;
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
					<span style={{ float: 'left', marginRight: 16 }}>默认资源优先级</span>
					{!!over_set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span>}
				</h3>
				<OversetForm ref="overset" over_set={over_set} />
			</div>
		);
	}
}

export default Smtp;
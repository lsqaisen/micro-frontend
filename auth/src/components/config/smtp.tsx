import { PureComponent } from 'react';
import { Modal, Switch } from 'antd';
import SmtpForm from './form/smtp-form';

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	email: { [key: string]: any };
	test: () => any;
	submit: () => any;
	changeStatus: (enable: boolean) => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { email, loading, test, submit, changeStatus } = this.props;
		delete email.email_identity;
		const set = Object.keys(email).every(key => !!email[key]);
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
					<Switch
						loading={loading}
						style={{ float: 'left', marginRight: 16 }}
						checkedChildren="启用"
						unCheckedChildren="禁用"
						checked={email.email_enable}
						onChange={(v) => {
							Modal.confirm({
								title: `是否${v ? '开启' : '关闭'}SMTP？`,
								okText: '是',
								cancelText: '否',
								onOk: () => {
									return new Promise(async (resolve, reject) => {
										this.setState({ loading: true })
										const err = await changeStatus(v);
										if (!!err) {
											reject(err);
										} else {
											resolve();
										}
										this.setState({ loading: false })
									})
								}
							});
						}}
					/>
					<span style={{ float: 'left', marginRight: 16 }}>SMTP设置</span>
					{email.email_enable ? set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span> : null}
				</h3>
				<SmtpForm
					loading={loading}
					email={email}
					test={test}
					submit={submit}
				/>
			</div >
		);
	}
}

export default Smtp;
import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Switch, Modal, message } from 'antd';
// import Smtp from 'auth/config/smtp';
// import { testSmtp, setSmtp, setSmtpStatus } from 'services/auth';

@connect(createSelector(
	[
		({ [`${MODEL}_config`]: config }: any) => config.email,
		(props: any) => !!props.loading.effects[`${MODEL}_config/get`],
	],
	(email, loading) => ({ email, loading }),
), createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_config/get` }),
		(dispatch: any) => () => dispatch({ type: `${MODEL}_user/get`, payload: { group_id: "*" } }),
	],
	(getSmtp, getUsers) => ({ getSmtp, getUsers })
))
export default class extends PureComponent<any, any> {
	state = {
		loading: false,
	}
	componentDidMount() {
		this.props.getSmtp();
	}
	render() {
		const { email = {}, getSmtp } = this.props;
		const { loading } = this.state;
		delete email.email_identity;
		const set = Object.keys(email || {}).every(key => !!email[key]);
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
										// const response = await setSmtpStatus(v);
										// if (!!response.err) {
										// 	message.error(response.err);
										// 	reject(response.err);
										// } else {
										// 	await getSmtp();
										// 	resolve();
										// }
										this.setState({ loading: false })
									})
								}
							});
						}}
					/>
					<span style={{ float: 'left', marginRight: 16 }}>SMTP设置</span>
					{email.email_enable ? set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span> : null}
				</h3>
				{/* <Smtp
					email={email}
					onTest={(v) => {
						return new Promise(async (resolve, reject) => {
							const response = await testSmtp(v);
							if (!!response.err) {
								message.error(response.err);
								reject(response.err);
							} else {
								message.success('测试邮件已发送到指定邮箱，请注意查收！');
								resolve();
							}
						})
					}}
					onSubmit={(v) => {
						return new Promise(async (resolve, reject) => {
							const response = await setSmtp(v);
							if (!!response.err) {
								reject(response.err);
							} else {
								await update();
								resolve();
							}
						})
					}}
				/> */}
			</div>
		)
	}
}
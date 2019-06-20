import { PureComponent } from 'react';
import { Modal, Switch } from 'antd';
import LdapForm from './form/ldap-form'

export interface SmtpProps {
	loading: boolean;
	setting?: boolean;
	ldap: { [key: string]: any };
	submit: () => any;
	changeStatus: (enable: boolean) => any;
}

class Smtp extends PureComponent<SmtpProps, any> {
	render() {
		const { ldap, loading, changeStatus, submit } = this.props;
		const set = Object.keys(ldap).every(key => !!ldap[key]);
		console.log(ldap)
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
						checked={ldap.ldap_enable}
						onChange={(v) => {
							Modal.confirm({
								title: `是否${v ? '开启' : '关闭'}LDAP？`,
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
					<span style={{ float: 'left', marginRight: 16 }}>LDAP设置</span>
					{ldap.ldap_enable ? set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span> : null}
				</h3>
				<LdapForm ref="stmpform" ldap={ldap} />
			</div >
		);
	}
}

export default Smtp;
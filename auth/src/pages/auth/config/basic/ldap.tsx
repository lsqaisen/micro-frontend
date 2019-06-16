import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Switch, Modal, message } from 'antd';
import Ldap from '@/components/config/ldap';

@connect(createSelector(
	[
		({ [`${MODEL}_config`]: config }: any) => config.ldap,
		(props: any) => !!props.loading.effects[`${MODEL}_config/get`],
	],
	(ldap, loading) => ({ ldap, loading }),
), createSelector(
	[
		(dispatch: any) => (email_enable: boolean) => dispatch({ type: `${MODEL}_config/setLdapStatus`, payload: email_enable }),
	],
	(changeStatus) => ({ changeStatus })
))
export default class extends PureComponent<any, any> {
	render() {
		const { ldap = {}, loading, changeStatus } = this.props;
		delete ldap.email_identity;
		const set = Object.keys(ldap || {}).every(key => !!ldap[key]);
		return (
			<Ldap
				loading={loading}
				ldap={ldap}
				submit={() => { }}
				changeStatus={changeStatus}
			/>
		)
	}
}
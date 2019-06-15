import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Smtp from '@/components/config/smtp';

@connect(createSelector(
	[
		({ [`${MODEL}_config`]: config }: any) => config.email,
		(props: any) => !!props.loading.effects[`${MODEL}_config/get`],
	],
	(email, loading) => ({ email, loading }),
), createSelector(
	[
		(dispatch: any) => (email_enable: boolean) => dispatch({ type: `${MODEL}_config/setSmtpStatus`, payload: email_enable }),
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_config/testsmtp`, payload: data }),
		(dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_config/setsmtp`, payload: data }),
	],
	(changeStatus, test, set) => ({ changeStatus, test, set })
))
export default class extends PureComponent<any, any> {
	render() {
		const { email = {}, loading, set, test, changeStatus } = this.props;
		return (
			<Smtp
				loading={loading}
				email={email}
				submit={set}
				changeStatus={changeStatus}
				test={test}
			/>
		)
	}
}
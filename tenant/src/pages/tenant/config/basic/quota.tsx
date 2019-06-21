import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Quota from '@/components/config/quota';

@connect(createSelector(
	[
		({ [`${MODEL}_quota`]: quota }: any) => quota.config,
		(props: any) => !!props.loading.effects[`${MODEL}_quota/get`],
	],
	(quota, loading) => ({ quota, loading }),
), createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/get` }),
	],
	(getQuota) => ({ getQuota })
))
export default class extends PureComponent<any, any> {
	componentDidMount() {
		this.props.getQuota()
	}
	render() {
		const { quota, loading, set, test, changeStatus } = this.props;
		return (
			<Quota
				loading={loading}
				quota={quota}
				submit={set}
				changeStatus={changeStatus}
				test={test}
			/>
		)
	}
}
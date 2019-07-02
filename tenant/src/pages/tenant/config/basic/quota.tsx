import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Quota from '@/components/config/quota';

@connect(createSelector(
	[
		({ [`${MODEL}_quota`]: quota }: any) => quota.quotas.default || {},
		(props: any) => !!props.loading.effects[`${MODEL}_quota/getquota`],
		(props: any) => !!props.loading.effects[`${MODEL}_quota/setquota`],
	],
	(quota, loading, setting) => ({ quota, loading, setting }),
), createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/getquota` }),
		(dispatch: any) => (payload: any) => dispatch({ type: `${MODEL}_quota/setquota`, payload }),
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/resetquota` }),
	],
	(get, set, reset) => ({ get, set, reset })
))
export default class extends PureComponent<any, any> {
	componentDidMount() {
		this.props.get()
	}
	render() {
		const { quota, loading, setting, set, reset } = this.props;
		return (
			<Quota
				setting={setting}
				loading={loading}
				quota={quota}
				submit={set}
				reset={reset}
			/>
		)
	}
}
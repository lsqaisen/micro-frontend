import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Switch, Modal, message } from 'antd';
import Overset from '@/components/config/overset';

@connect(createSelector(
	[
		({ [`${MODEL}_quota`]: quota }: any) => quota.oversets.default,
		(props: any) => !!props.loading.effects[`${MODEL}_quota/getoverset`] || !!props.loading.effects[`${MODEL}_quota/setoverset`],
	],
	(over_set, loading) => ({ over_set, loading }),
), createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/getoverset` }),
		(dispatch: any) => (payload: any) => dispatch({ type: `${MODEL}_quota/setoverset`, payload }),
	],
	(get, set) => ({ get, set })
))
export default class extends PureComponent<any, any> {
	componentDidMount() {
		this.props.get()
	}
	render() {
		const { over_set, loading, set } = this.props;
		return (
			<Overset
				loading={loading}
				over_set={over_set}
				submit={set}
			/>
		)
	}
}
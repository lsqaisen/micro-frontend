import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Switch, Modal, message } from 'antd';
import Overset from '@/components/config/overset';

@connect(createSelector(
	[
		({ [`${MODEL}_quota`]: quota }: any) => quota.oversets.default,
		(props: any) => !!props.loading.effects[`${MODEL}_quota/getoverset`],
	],
	(over_set, loading) => ({ over_set, loading }),
), createSelector(
	[
		(dispatch: any) => () => dispatch({ type: `${MODEL}_quota/getoverset` }),
	],
	(getOverset) => ({ getOverset })
))
export default class extends PureComponent<any, any> {
	componentDidMount() {
		this.props.getOverset()
	}
	render() {
		const { over_set, loading, changeStatus } = this.props;
		return (
			<Overset
				loading={loading}
				over_set={over_set}
				submit={() => { }}
			/>
		)
	}
}
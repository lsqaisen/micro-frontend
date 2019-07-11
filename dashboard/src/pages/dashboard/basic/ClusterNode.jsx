import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { ClusterNode } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.dashboard.nodes.$all.data,
        props => !!props.loading.effects['dashboard/nodes'],
    ],
    (data, loading) => ({ data, loading })
))(class extends Component {
    query() {
        const { namespace, dispatch } = this.props;
        const itemsPerPage = 10;
        dispatch({
            type: 'dashboard/nodes',
            payload: { namespace, itemsPerPage }
        })
    }

    componentDidMount() {
        this.query();
    }

    render() {
        const { data, loading } = this.props;
        const nodes = ((data || {}).nodes || []);
        const value = nodes.filter(v => v.status !== 'Ready').length;
        return (
            <ClusterNode loading={loading} total={(data.listMeta || {}).totalItems || 0} value={value} nodes={nodes} />
        )
    }
})
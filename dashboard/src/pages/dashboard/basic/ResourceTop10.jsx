import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { ResourceTop10 } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.top10.data || [],
        props => !!props.loading.effects[`top10/query`],
    ],
    (top10, loading) => ({ top10, loading })
))(class extends Component {
    constructor(props) {
        super(props);
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    async query() {
        const { type, namespace, dispatch } = this.props;
        await dispatch({
            type: 'top10/query',
            payload: { type, namespace }
        })
    }

    refresh() {
        this.query();
    }

    componentDidMount() {
        this.query();
    }

    render() {
        const { loading, type, top10 } = this.props;
        return (
            <ResourceTop10 loading={loading} type={type} data={top10} onRefresh={this.refresh} />
        )
    }
})
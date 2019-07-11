import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Alarm } from '@/components/dashboard';

export default connect(createSelector(
    [
        props => props.alarm,
        props => !!props.loading.effects['alarm/query'],
    ],
    (alarm, loading) => ({
        alarm, loading
    })
))(class extends Component {
    constructor(props) {
        super(props);
        this.timeHandle = null;
    }

    query() {
        const { dispatch } = this.props;
        dispatch({ type: 'alarm/query' })
    }

    interval() {
        const { dispatch } = this.props;
        dispatch({ type: 'alarm/interval' })
    }

    componentDidMount() {
        this.query();
        this.timeHandle = setInterval(() => {
            this.interval();
        }, 30000)
    }

    UNSAFE_componentWillMount() {
        clearInterval(this.timeHandle);
    }

    render() {
        const { alarm: { data = {} }, loading, } = this.props;
        return (
            <Alarm
                loading={loading}
                total={(data || {}).total || 0}
                data={(data || {}).data || []}
            />
        )
    }
})
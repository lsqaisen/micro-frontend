import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Network } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.flow,
        props => !!props.loading.effects['flow/flow'] && !!props.loading.effects['flow/requests'],
    ],
    (flow, loading) => ({ flow, loading })
))(class extends Component {
    constructor(props) {
        super(props);
        const dur = 60 * 60 * 24 * 2,
            step = 60 * 5,
            end_at = new Date(new Date().toLocaleDateString()).getTime() / 1000 + 24 * 60 * 60;
        this.state = { end_at, dur, step, };
        this.timeHandle = null;
        this.array = Array.from(Array(dur / step / 2), (_, i) => ({
            name: new Date((end_at - (dur - i * step)) * 1000).getTime() / 1000,
            cv1: null,
            bv1: null,
            cv2: null,
            bv2: null,
        }));
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    query() {
        const { type, namespace, dispatch } = this.props;
        const { end_at, dur, step } = this.state;
        dispatch({
            type: 'flow/flow',
            payload: { type, namespace, end_at, dur, step }
        })
        dispatch({
            type: 'flow/requests',
            payload: { type, namespace, end_at, dur, step }
        })
    }

    refresh() {
        this.query();
    }

    componentDidMount() {
        this.query();
    }

    render() {
        const { flow: { flow = {}, requests = {} }, loading, } = this.props;
        const { dur } = this.state;
        const flowIn = (((flow.data || { in: [] }).in || [])[0] || { values: [] }).values || [],
            flowOut = (((flow.data || { out: [] }).out || [])[0] || { values: [] }).values || [];
        let flowData = this.array;
        if (flowIn.length > 0 || flowOut.length > 0) {
            flowData = this.array.map(v => {
                let cv1 = Number((flowIn.find(_v => _v[0] === v.name + dur / 2) || [])[1]),
                    bv1 = Number((flowIn.find(_v => _v[0] === v.name) || [])[1]),
                    cv2 = Number((flowOut.find(_v => _v[0] === v.name + dur / 2) || [])[1]),
                    bv2 = Number((flowOut.find(_v => _v[0] === v.name) || [])[1]);
                return ({
                    ...v,
                    cv1: !cv1 && cv1 !== 0 ? null : cv1,
                    bv1: !bv1 && bv1 !== 0 ? null : bv1,
                    cv2: !cv2 && cv2 !== 0 ? null : cv2,
                    bv2: !bv2 && bv2 !== 0 ? null : bv2,
                })
            })
        }
        const requestsSuccess = (((requests.data || { success: [] }).success || [])[0] || { values: [] }).values,
            requestsErr = (((requests.data || { err: [] }).err || [])[0] || { values: [] }).values;
        let requestsData = this.array;
        if (requestsSuccess.length > 0 || requestsErr.length > 0) {
            requestsData = this.array.map(v => {
                let cv1 = Math.round(Number((requestsSuccess.find(_v => _v[0] === v.name + dur / 2) || [])[1])),
                    bv1 = Math.round(Number((requestsSuccess.find(_v => _v[0] === v.name) || [])[1])),
                    cv2 = Math.round(Number((requestsErr.find(_v => _v[0] === v.name + dur / 2) || [])[1])),
                    bv2 = Math.round(Number((requestsErr.find(_v => _v[0] === v.name) || [])[1]));
                return ({
                    ...v,
                    cv1: !cv1 && cv1 !== 0 ? null : cv1,
                    bv1: !bv1 && bv1 !== 0 ? null : bv1,
                    cv2: !cv2 && cv2 !== 0 ? null : cv2,
                    bv2: !bv2 && bv2 !== 0 ? null : bv2,
                })
            })
        }
        return (
            <Network loading={loading} requests={requestsData} flow={flowData} onRefresh={this.refresh} />
        )
    }
})
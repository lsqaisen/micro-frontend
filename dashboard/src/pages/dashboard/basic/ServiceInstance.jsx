import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
import { Services } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.servicenumber.data || {},
        props => !!props.loading.effects['servicenumber/query'],
    ],
    (data, loading) => ({ data, loading })
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
            c: null,
            b: null,
        }));
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    query() {
        const { type, namespace, dispatch } = this.props;
        const { end_at, dur, step } = this.state;
        dispatch({
            type: 'servicenumber/query',
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
        const { loading, data } = this.props;
        const { dur, step } = this.state;
        const number = dur / step;
        const services = ((data.data || [])[0] || { values: [] }).values,
            instance = ((data.instance || [])[0] || { values: [] }).values;
        const [scnumber, sbnumber] = [
            (services.slice(-1)[0] || [])[1] || 0,
            (services.slice(0, number / 2).slice(-1)[0] || [])[1] || 0,
        ], [icnumber, ibnumber] = [
            (instance.slice(-1)[0] || [])[1] || 0,
            (instance.slice(0, number / 2).slice(-1)[0] || [])[1] || 0,
        ];
        const servicesData = {
            loading,
            title: "服务数",
            number: scnumber,
            ringthan: sbnumber === 0 ? scnumber : (scnumber - sbnumber) / sbnumber,
            color: '#2BADFF',
            data: this.array.map(v => {
                let c = Math.round(Number((services.find(_v => _v[0] === v.name + dur / 2) || [])[1])),
                    b = Math.round(Number((services.find(_v => _v[0] === v.name) || [])[1]));
                return ({
                    ...v,
                    c: !c && c !== 0 ? null : c,
                    b: !b && b !== 0 ? null : b,
                })
            }),
        }, instanceData = {
            loading,
            title: "实例数",
            number: icnumber,
            ringthan: ibnumber === 0 ? icnumber : (icnumber - ibnumber) / ibnumber,
            color: '#F71CEF',
            data: this.array.map(v => {
                let c = Math.round(Number((instance.find(_v => _v[0] === v.name + dur / 2) || [])[1])),
                    b = Math.round(Number((instance.find(_v => _v[0] === v.name) || [])[1]));
                return ({
                    ...v,
                    c: !c && c !== 0 ? null : c,
                    b: !b && b !== 0 ? null : b,
                })
            }),
        };
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Services
                        {...servicesData}
                        onRefresh={this.refresh}
                    />
                </Col>
                <Col span={12}>
                    <Services {...instanceData} onRefresh={this.refresh} />
                </Col>
            </Row>
        )
    }
})
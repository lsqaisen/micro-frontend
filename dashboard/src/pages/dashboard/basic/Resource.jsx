import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
import { ResourceUse } from '../../../components/dashboard/';

export default connect(createSelector(
    [
        props => props.metric_resource,
        props => !!props.loading.effects[`metric_resource/query`] || !!props.loading.effects[`metric_resource/total`],
        props => !!props.loading.effects[`metric_resource/interval`],
    ],
    (resource, loading, intervaling) => ({ resource, loading, intervaling })
))(class extends Component {
    constructor(props) {
        super(props);
        this.timeHandle = null;
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    async  total() {
        const { type, namespace, dispatch } = this.props;
        await dispatch({
            type: 'metric_resource/total',
            payload: { type, namespace }
        })
    }

    async  query() {
        const { type, namespace, dispatch } = this.props;
        await dispatch({
            type: 'metric_resource/query',
            payload: { type, namespace, dur: 60 * 60 * 24 * 7, step: 60 * 60, }
        })
    }

    interval() {
        const { type, namespace, dispatch } = this.props;
        dispatch({
            type: 'metric_resource/interval',
            payload: { type, namespace }
        })
    }

    refresh() {
        this.total();
        this.query();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { intervaling, resource } = nextProps;
        if (!intervaling && !resource.err) {
            clearTimeout(this.timeHandle)
            this.timeHandle = setTimeout(() => {
                this.interval();
            }, 10000)
        }
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        const { loading, resource } = this.props;
        const { cpu, disk, mem } = resource.data || {};
        const cpuTotal = Number((resource.total || { total_cpu: 0 }).total_cpu || 0).toFixed(2),
            diskTotal = Number(((resource.total || { total_filesystem: 0 }).total_filesystem || 0) / 1024 / 1024 / 1024).toFixed(2),
            memTotal = Number(((resource.total || { total_mem: 100 }).total_mem || 0) / 1024 / 1024 / 1024).toFixed(2);
        const cpuData = (cpu || [{ values: [[0, 0]] }])[0].values.map(v => ({
            name: v[0],
            value: Number(Number(v[1]).toFixed(2)),
        })), cpuUesd = Number((resource.total || { cpu: 0 }).cpu || 0).toFixed(2);
        const memData = (mem || [{ values: [[0, 0]] }])[0].values.map(v => ({
            name: v[0],
            value: Number(Number(v[1] / 1024 / 1024 / 1024).toFixed(2)),
        })), memUesd = Number(((resource.total || { mem: 0 }).mem || 0) / 1024 / 1024 / 1024).toFixed(2);
        const diskData = (disk || [{ values: [[0, 0]] }])[0].values.map(v => ({
            name: v[0],
            value: Number(Number(v[1] / 1024 / 1024 / 1024).toFixed(2)),
        })), diskUesd = Number(((resource.total || { filesystem: 0 }).filesystem || 0) / 1024 / 1024 / 1024).toFixed(2);
        return (
            <Row gutter={16}>
                <Col span={8}>
                    <ResourceUse
                        err={resource.err}
                        loading={loading}
                        unit="(核)"
                        title='集群CPU'
                        headerTitle='CPU使用量占比'
                        total={cpuTotal}
                        used={cpuUesd}
                        chartsTitle='CPU集群实时负载（7天)'
                        data={cpuData}
                        background='#f2c306'
                        fill='#ffe892'
                        onRefresh={this.refresh}
                    />
                </Col>
                <Col span={8}>
                    <ResourceUse
                        err={resource.err}
                        loading={loading}
                        unit="(G)"
                        title='集群内存'
                        headerTitle='内存使用量占比'
                        total={memTotal}
                        used={memUesd}
                        chartsTitle='内存集群实时负载（7天)'
                        data={memData}
                        background='#15c3c3'
                        fill='#3fe0df'
                        onRefresh={this.refresh}
                    />
                </Col>
                <Col span={8}>
                    <ResourceUse
                        err={resource.err}
                        loading={loading}
                        unit="(G)"
                        title='集群磁盘'
                        headerTitle='磁盘使用量占比'
                        total={diskTotal}
                        used={diskUesd}
                        chartsTitle='磁盘集群实时负载（7天)'
                        data={diskData}
                        background='#8644e0'
                        fill='#a066fd'
                        onRefresh={this.refresh}
                    />
                </Col>
            </Row>
        )
    }
});
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Row, Col } from 'antd';
import { ResourceUse } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.metrics.registry || {},
        props => !!props.loading.effects[`metrics/registry`],
    ],
    (registry, loading) => ({ registry, loading })
))(class extends Component {
    constructor(props) {
        super(props);
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    async query() {
        const { dispatch } = this.props;
        await dispatch({
            type: 'metrics/registry',
        })
    }

    refresh() {
        this.query();
    }

    componentDidMount() {
        this.query();
    }

    render() {
        const { loading, registry } = this.props;
        const { data, err } = registry;
        const chartsData = ((data.data || [])[0] || { values: [] }).values
            .map(v => ({
                name: v[0],
                value: Number(v[1] / 1024 / 1024 / 1024).toFixed(2)
            }));
        return (
            <ResourceUse
                err={err}
                loading={loading}
                unit="(GB)"
                title='镜像仓库信息'
                headerTitle='镜像仓库使用量占比'
                total={Number((data.total_bytes || 0) / 1024 / 1024 / 1024).toFixed(2)}
                used={(chartsData.slice(-1)[0] || {}).value || 0}
                chartsTitle={<div style={{ position: 'relative' }}>
                    <p>节点信息</p>
                    <div style={{ position: 'absolute', width: '100%', top: '24px' }}>
                        <Row>
                            <Col span={8}>OSD <span>{data.osd_ali || 0}/{data.osd_total || 0}</span></Col>
                            <Col span={8}>RGW <span>{data.rgw_ali || 0}/{data.rgw_total || 0}</span></Col>
                            <Col span={8}>MON <span>{data.mon_ali || 0}/{data.mon_total || 0}</span></Col>
                        </Row>
                    </div>
                </div>}
                data={chartsData}
                background='#2BADFF'
                fill='#75cbfe'
                onRefresh={this.refresh}
            />
        )
    }
})
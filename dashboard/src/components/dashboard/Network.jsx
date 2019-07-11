import PropTypes from 'prop-types';
import styles from './style/Network.less';
import { Spin, Icon, Row, Col } from 'antd';
import SimpleLineChart from './charts/SimpleLineChart';
import Box from './Box';

const LegendContent = ({ payload, title }) => {
    return (
        <div className={styles[`header`]}>
            <div className={styles[`title`]}>
                <h3>{title}</h3>
            </div>
            <ul className={styles[`legend`]}>
                {payload.map((v, i) => (
                    <li key={i} className={styles[`legend-item`]} >
                        <p><span className={styles[`dot`]} style={{ ...v }} /> {v.title} </p>
                        <p><span className={styles[`dot`]} style={{ ...v, opacity: '.4' }} /> {`同比昨天${v.title}`} </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Network = ({ loading, requests, flow, onRefresh }) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`network`]}
                title='流量统计'
                extra={<span className={styles[`reload`]} onClick={onRefresh}><Icon type="reload" /></span>}
                ratio={1 / 3}
                ratioWidth={32}
            >
                <Row className={styles[`content`]}>
                    <Col span={12} className={styles[`item`]}>
                        <LegendContent
                            title='请求数（次）'
                            payload={[{
                                title: '正确数',
                                backgroundColor: '#11C24B',
                            }, {
                                title: '错误数',
                                backgroundColor: '#F63232',
                            }]}
                        />
                        <div className={styles[`charts`]}>
                            <SimpleLineChart
                                data={requests}
                                lineOption={{
                                    cv1: { title: '正确数', stroke: '#11C24B', strokeWidth: 1.5, strokeOpacity: 1 },
                                    bv1: { title: '同比昨天正确数', stroke: '#11C24B', strokeOpacity: .4 },
                                    cv2: { title: '错误数', stroke: '#F63232', strokeWidth: 1.5, strokeOpacity: 1 },
                                    bv2: { title: '同比昨天错误数', stroke: '#F63232', strokeOpacity: .4 },
                                }}
                                tooltipContent={({ payload }) => {
                                    if (!payload || payload.length <= 0) return null;
                                    let time = new Date(payload[0].payload.name * 1000);
                                    return (
                                        <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc' }}>
                                            <h3>{`${(Array(2).join(0) + Number(time.getHours())).slice(-2)}:${(Array(2).join(0) + Number(time.getMinutes())).slice(-2)}`}</h3>
                                            {payload[0].payload.cv1 !== null ? <p style={{ color: '#11C24B' }}>
                                                正确数：{Math.round(Number(payload[0].payload.cv1))}
                                                {payload[0].payload.cv1 < payload[0].payload.bv1 ?
                                                    <Icon type="arrow-down" style={{ color: '#F51414' }} /> :
                                                    payload[0].payload.cv1 > payload[0].payload.bv1 ?
                                                        <Icon type="arrow-up" style={{ color: '#22C702' }} /> : null}
                                            </p> : null}
                                            <p style={{ color: '#11C24B', opacity: .4 }}>
                                                同比昨天正确数：{Math.round(Number(payload[0].payload.bv1))}
                                            </p>
                                            {payload[0].payload.cv2 !== null ? <p style={{ color: '#F63232' }}>
                                                错误数：{Math.round(Number(payload[0].payload.cv2))}
                                                {payload[0].payload.cv2 < payload[0].payload.bv2 ?
                                                    <Icon type="arrow-down" style={{ color: '#F51414' }} /> :
                                                    payload[0].payload.cv2 > payload[0].payload.bv2 ?
                                                        <Icon type="arrow-up" style={{ color: '#22C702' }} /> : null}
                                            </p> : null}
                                            <p style={{ color: '#F63232', opacity: .4 }}>
                                                同比昨天错误数：{Math.round(Number(payload[0].payload.bv2))}
                                            </p>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </Col>
                    <Col span={12} className={styles[`item`]}>
                        <LegendContent
                            title='日流量'
                            payload={[{
                                title: '入口',
                                backgroundColor: '#2BADFF',
                            }, {
                                title: '出口',
                                backgroundColor: '#F724F0',
                            }]}
                        />
                        <div className={styles[`charts`]}>
                            <SimpleLineChart
                                data={flow}
                                lineOption={{
                                    cv1: { title: '入口', stroke: '#2BADFF', strokeWidth: 1.5, strokeOpacity: 1 },
                                    bv1: { title: '同比昨天入口', stroke: '#2BADFF', strokeOpacity: .4 },
                                    cv2: { title: '出口', stroke: '#F724F0', strokeWidth: 1.5, strokeOpacity: 1 },
                                    bv2: { title: '同比昨天出口', stroke: '#F724F0', strokeOpacity: .4 },
                                }}
                                tickFormatter={(v) => Number(v).netCeil(0)}
                                tooltipContent={({ payload }) => {
                                    if (!payload || payload.length <= 0) return null;
                                    let time = new Date(payload[0].payload.name * 1000);
                                    return (
                                        <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc' }}>
                                            <h3>{`${(Array(2).join(0) + Number(time.getHours())).slice(-2)}:${(Array(2).join(0) + Number(time.getMinutes())).slice(-2)}`}</h3>
                                            {payload[0].payload.cv1 !== null ? <p style={{ color: '#2BADFF' }}>
                                                入口：{Number(payload[0].payload.cv1).netCeil(2)}
                                                {payload[0].payload.cv1 < payload[0].payload.bv1 ?
                                                    <Icon type="arrow-down" style={{ color: '#F51414' }} /> :
                                                    payload[0].payload.cv1 > payload[0].payload.bv1 ?
                                                        <Icon type="arrow-up" style={{ color: '#22C702' }} /> : null}
                                            </p> : null}
                                            <p style={{ color: '#2BADFF', opacity: .4 }}>
                                                同比昨天入口：{Number(payload[0].payload.bv1).netCeil(2)}
                                            </p>
                                            {payload[0].payload.cv2 !== null ? <p style={{ color: '#F724F0' }}>
                                                出口：{Number(payload[0].payload.cv2).netCeil(2)}
                                                {payload[0].payload.cv2 < payload[0].payload.bv2 ?
                                                    <Icon type="arrow-down" style={{ color: '#F51414' }} /> :
                                                    payload[0].payload.cv2 > payload[0].payload.bv2 ?
                                                        <Icon type="arrow-up" style={{ color: '#22C702' }} /> : null}
                                            </p> : null}
                                            <p style={{ color: '#F724F0', opacity: .4 }}>
                                                同比昨天出口：{Number(payload[0].payload.bv2).netCeil(2)}
                                            </p>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Box>
        </Spin >
    )
}

Network.defaultProps = {
    loading: false,
    requests: [],
    flow: [],
    onRefresh: () => { },
}

Network.propTypes = {
    loading: PropTypes.bool,
    requests: PropTypes.array,
    flow: PropTypes.array,
    onRefresh: PropTypes.func,
}

export default Network;
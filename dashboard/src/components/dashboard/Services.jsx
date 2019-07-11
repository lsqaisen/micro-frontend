import PropTypes from 'prop-types';
import styles from './style/Services.less';
import { Spin, Icon, Row, Col } from 'antd';
import SimpleLineChart from './charts/SimpleLineChart';
import Box from './Box';

const LegendContent = ({ payload, title, number, ringthan, color }) => {
    return (
        <Row className={styles[`header`]}>
            <Col span={8} className={styles[`title`]}>
                <h3>{title}</h3>
                <p style={{ color: '#656565', fontWeight: 'bold', fontSize: '20px', lineHeight: '22px', height: '22px' }}>{number}</p>
            </Col>
            <Col span={8} className={styles[`title`]}>
                <h3>环比昨天</h3>
                <p style={{ lineHeight: '22px', color: ringthan < 0 ? '#F51414' : ringthan > 0 ? '#22C702' : '#2B73F8' }}>
                    {(ringthan * 100).toFixed(1)}%
                    {ringthan < 0 ? <Icon type="arrow-down" /> : ringthan > 0 ? <Icon type="arrow-up" /> : null}
                </p>
            </Col>
            <Col span={8} className={styles[`legend`]}>
                <div className={styles[`legend-item`]}>
                    <span>今天</span>
                    <span className={styles[`dot`]} style={{ backgroundColor: color }} />
                </div>
                <div className={styles[`legend-item`]}>
                    <span>昨天</span>
                    <span className={styles[`dot`]} style={{ backgroundColor: color, opacity: '.4' }} />
                </div>
            </Col>
        </Row>
    )
}

const Services = ({ loading, title, number, ringthan, color, data, onRefresh, ...props }) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`network`]}
                title={title}
                extra={<span className={styles[`reload`]} onClick={onRefresh}><Icon type="reload" /></span>}
            >
                <LegendContent
                    title={title}
                    number={number}
                    ringthan={ringthan}
                    color={color}
                />
                <div className={styles[`charts`]}>
                    <SimpleLineChart
                        data={data}
                        dataMax={dataMax => Number(`1${Array(`${parseInt(dataMax, 10)}`.length + 1).join(0)}`)}
                        lineOption={{
                            c: { title: '今天', stroke: color, strokeWidth: 1.5, strokeOpacity: 1 },
                            b: { title: '昨天', stroke: color, strokeOpacity: .4 },
                        }}
                        tooltipContent={({ payload }) => {
                            if (!payload || payload.length <= 0) return null;
                            let time = new Date(payload[0].payload.name * 1000);
                            return (
                                <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc' }}>
                                    <h3>{`${(Array(2).join(0) + Number(time.getHours())).slice(-2)}:${(Array(2).join(0) + Number(time.getMinutes())).slice(-2)}`}</h3>
                                    {payload[0].payload.c !== null ? <p style={{ color }}>
                                        今天：{Math.round(Number(payload[0].payload.c))}
                                        {payload[0].payload.c < payload[0].payload.b ?
                                            <Icon type="arrow-down" style={{ color: '#F51414' }} /> :
                                            payload[0].payload.c > payload[0].payload.b ?
                                                <Icon type="arrow-up" style={{ color: '#22C702' }} /> : null}
                                    </p> : null}
                                    <p style={{ color, opacity: .4 }}>
                                        昨天：{Math.round(Number(payload[0].payload.b))}
                                    </p>
                                </div>
                            )
                        }}
                    />
                </div>
            </Box>
        </Spin >
    )
}

Services.defaultProps = {
    loading: false,
    requests: {},
    flow: {},
    onRefresh: () => { },
}

Services.propTypes = {
    loading: PropTypes.bool,
    requests: PropTypes.object,
    flow: PropTypes.object,
    onRefresh: PropTypes.func,
}

export default Services;
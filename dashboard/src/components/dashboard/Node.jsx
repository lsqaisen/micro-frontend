import PropTypes from 'prop-types';
import styles from './style/Node.less';
import { Link } from 'dva/router';
import { Icon, Row, Col, Tag } from 'antd';
import EqualRatioBox from '../EqualRatioBox';
import CircleProgress from './charts/CircleProgress';
import Box from './Box';

const Node = ({ title, data, nodes, vip, servicestatistics = [], onRefresh }) => {
    return (
        <Box
            className={styles[`resource-use-box`]}
            title={`${title} ${vip.vip ? `: vip<${vip.vip}>` : ''}`}
            extra={<span className={styles[`reload`]} onClick={onRefresh}><Icon type="reload" /></span>}
            ratio={.5}
            ratioWidth={16}
        >
            <Row style={{ height: '100%' }}>
                <Col span={12} style={{ height: '100%' }}>
                    {data.map((v, i) => (
                        <div key={i} className={styles[`header`]} style={{ background: v.background }}>
                            <div className={styles[`info`]}>
                                <h3>{v.title}</h3>
                                <p>
                                    <span className={styles[`data`]}>{`${v.used} / ${parseInt(v.total, 10) === 0 ? '--' : v.total}`} </span>
                                    <span className={styles[`unit`]}>{v.unit}</span>
                                </p>
                            </div>
                            <EqualRatioBox className={styles[`progress`]} type="height">
                                <CircleProgress value={parseInt(v.total, 10) === 0 ? -1 : Number(Number(v.ratio).toFixed(0))} background={v.fill} fill="#fff" />
                            </EqualRatioBox>
                        </div>
                    ))}
                </Col>
                <Col span={12} style={{ padding: '8px 0', height: '100%', borderTop: '1px solid #f4f4f4' }}>
                    <ul className={styles[`nodes`]}>
                        {nodes.map(v => (
                            <li key={v.name} className={styles[`item`]}>
                                <div className={styles[`name`]}>
                                    <Tag color={vip.node === v.name ? '#649AFF' : v.status !== 'Ready' ? '#f50' : '#87d068'}>{vip.node === v.name ? 'VIP' : v.status !== 'Ready' ? '异常' : '正常'}</Tag><Link to={`/node/${v.name}`}>{v.name}</Link>
                                </div>
                                <span className={styles[`ip`]}>{(v.hostIPS[0] || { address: '--' }).address}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles[`servicestatistics`]} style={{ height: `calc(100% - ${nodes.length * 32}px)` }}>
                        {(servicestatistics || []).map(v => (
                            <li key={v.name} className={styles[`item`]}>
                                <div className={styles[`name`]}>{v.name}</div>
                                <div className={styles[`status`]}>
                                    <span style={{ color: v.ali !== v.total ? '#F63232' : '#11C24B' }}>{v.ali}</span>/<span className={styles[`total`]}>{v.total}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Box>
    )
}

Node.defaultProps = {
    title: '',
    data: [],
    nodes: [],
    vip: {},
    servicestatistics: [],
    onRefresh: () => { },
}

Node.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    nodes: PropTypes.array,
    vip: PropTypes.object,
    servicestatistics: PropTypes.array,
    onRefresh: PropTypes.func,
}

export default Node; 
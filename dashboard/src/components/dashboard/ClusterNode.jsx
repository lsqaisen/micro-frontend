import PropTypes from 'prop-types';
import styles from './style/ClusterNode.less';
import { Link } from 'dva/router';
import { Spin, Tag, Button } from 'antd';
import CicrleProgressWithScale from './charts/CicrleProgressWithScale';
import Box from './Box';

const ClusterNode = ({ loading, nodes, total, value }) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`cluster-node`]}
                title='集群节点'
                extra={<span className={styles[`more`]}> <Link to="/node">查看全部</Link></span>}
            >
                <div className={styles[`propress`]}>
                    <CicrleProgressWithScale
                        total={total}
                        value={value}
                        background='#11C24B'
                        fill='#f51414'
                    />
                </div>
                <ul className={styles[`data`]}>
                    {total ?
                        nodes.map(v => (
                            <li key={v.name} className={styles[`item`]}>
                                <div className={styles[`name`]}>
                                    <Tag color={v.status !== 'Ready' ? '#f50' : '#87d068'}>{v.status !== 'Ready' ? '异常' : '正常'}</Tag><Link to={`/node/${v.name}`}>{v.name}</Link>
                                </div>
                                <span className={styles[`ip`]}>{(v.hostIPS[0] || { address: '--' }).address}</span>
                            </li>
                        )) :
                        <li className={styles[`nodata`]} >
                            <p>暂无数据</p>
                            <Link to="/node"><Button size="small" type="primary" ghost >立即申请</Button></Link>
                        </li>}
                </ul>
            </Box>
        </Spin >
    )
}

ClusterNode.defaultProps = {
    loading: false,
    nodes: [],
    total: 0,
    value: 0,
}

ClusterNode.propTypes = {
    loading: PropTypes.bool,
    nodes: PropTypes.array,
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default ClusterNode;
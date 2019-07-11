import PropTypes from 'prop-types';
import styles from './style/Alarm.less';
import { Spin } from 'antd';
import Box from './Box';
import QueueAnim from 'rc-queue-anim';

const Alarm = ({ loading, total, data }) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`alarm`]}
                title='监控告警'
                extra={<span className={styles[`more`]}>查看全部</span>}
            >
                <div className={styles[`total`]}>
                    <span className={styles[`info`]}>{total}</span>
                    <span className={styles[`text`]}> 严重警告</span>
                </div>
                <ul className={styles[`data`]}>
                    <QueueAnim animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }
                    ]}>
                        {data.map(v => <li key={`${v.uid}`}>
                            <span className={styles[`type`]}>{v.reason}</span> {v.content}
                        </li>)}
                    </QueueAnim>
                </ul>
            </Box>
        </Spin >
    )
}

Alarm.defaultProps = {
    loading: false,
    total: 0,
    data: [],
}

Alarm.propTypes = {
    loading: PropTypes.bool,
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.array,
}

export default Alarm;
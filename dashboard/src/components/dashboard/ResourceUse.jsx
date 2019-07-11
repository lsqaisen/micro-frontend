import PropTypes from 'prop-types';
import styles from './style/ResourceUse.less';
import { Spin, Icon } from 'antd';
import EqualRatioBox from '../EqualRatioBox';
import CircleProgress from './charts/CircleProgress';
import TinyAreaChart from './charts/TinyAreaChart';
import Box from './Box';

const ResourceUse = ({
    err,
    loading,
    unit,
    title,
    headerTitle,
    total,
    used,
    chartsTitle,
    data,
    fill,
    background,
    onRefresh
}) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`resource-use-box`]}
                loading={loading}
                title={title}
                extra={<span className={styles[`reload`]} onClick={onRefresh}><Icon type="reload" /></span>}
            >
                <div className={styles[`header`]} style={{ background }}>
                    <div className={styles[`info`]}>
                        <h3>{headerTitle}</h3>
                        <p>
                            <span className={styles[`data`]}>{`${used} / ${parseInt(total, 10) === 0 ? '--' : total}`} </span>
                            <span className={styles[`unit`]}>{unit}</span>
                        </p>
                    </div>
                    <EqualRatioBox className={styles[`progress`]} type="height">
                        <CircleProgress value={parseInt(total, 10) === 0 ? -1 : Number((used / total * 100).toFixed(0))} background={fill} fill="#fff" />
                    </EqualRatioBox>
                </div>
                <div className={styles[`real-time`]} >
                    <h3>{chartsTitle}</h3>
                    {!err ? <div className={styles[`real-time-charts`]}>
                        <TinyAreaChart
                            unit={unit}
                            data={data}
                            fill={fill}
                            stroke={background}
                            domain={[
                                0,
                                parseInt(total, 10) === 0 ?
                                    dataMax => Number(`1${Array(`${parseInt(dataMax, 10)}`.length + 1).join(0)}`) :
                                    Number(total)
                            ]}
                        />
                    </div> : <p style={{ padding: 16, color: 'red', textAlign: 'center' }}>{err}</p>}
                </div>
            </Box>
        </Spin>
    )
}

ResourceUse.defaultProps = {
    loading: false,
    unit: '',
    title: '',
    headerTitle: '',
    total: 0,
    used: 0,
    chartsTitle: '',
    data: [{ name: 0, value: 0 }, { name: 1, value: 0 }],
    fill: '#fcf2ce',
    background: '#15C3C3',
    onRefresh: () => { },
}

ResourceUse.propTypes = {
    loading: PropTypes.bool,
    unit: PropTypes.string,
    title: PropTypes.string,
    headerTitle: PropTypes.string,
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    used: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    chartsTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    data: PropTypes.array,
    fill: PropTypes.string,
    background: PropTypes.string,
    onRefresh: PropTypes.func,
}

export default ResourceUse; 
import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style/ResourceTop10.less';
import { Spin, Icon, Radio, Select } from 'antd';
import PositiveAndNegativeBarChart from './charts/PositiveAndNegativeBarChart';
import Box from './Box';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class ResourceTop10 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 'cpu',
            bottom: 'mem'
        }
    }

    render() {
        const { loading, type, data, onRefresh } = this.props;
        const { top, bottom } = this.state;
        return (
            <Spin spinning={loading}>
                <Box
                    className={styles[`resource-top10`]}
                    title={type === 1 ? '工作空间资源使用TOP10' : '服务资源使用TOP10'}
                    extra={<span className={styles[`reload`]} onClick={onRefresh}><Icon type="reload" /></span>}
                    ratio={0.5}
                    ratioWidth={16}
                >
                    <div className={styles[`operate`]}>
                        <RadioGroup
                            style={{ marginRight: 16 }}
                            defaultValue={top}
                            onChange={e => this.setState({ top: e.target.value })}>
                            <RadioButton value="cpu">CPU排行</RadioButton>
                            <RadioButton value="mem">内存排行</RadioButton>
                            <RadioButton value="disk">磁盘排行</RadioButton>
                        </RadioGroup>
                        <label>
                            对比：
                            <Select defaultValue={bottom} onChange={bottom => this.setState({ bottom })}>
                                <Option disabled={top === 'cpu'} key="cpu">CPU</Option>
                                <Option disabled={top === 'mem'} key="mem">内存</Option>
                                <Option disabled={top === 'disk'} key="disk">磁盘</Option>
                            </Select>
                        </label>
                    </div>
                    <div className={styles[`charts`]}>
                        <PositiveAndNegativeBarChart
                            top={top}
                            bottom={bottom}
                            data={
                                Object.assign(
                                    Array.from(Array(10), () => null),
                                    data.sort(((a, b) => b[top] - a[top])).slice(0, 10),
                                )
                            }
                        />
                    </div>
                </Box>
            </Spin >
        )
    }
}

ResourceTop10.defaultProps = {
    loading: false,
    type: 1,
    data: [],
    onRefresh: () => { },
}

ResourceTop10.propTypes = {
    loading: PropTypes.bool,
    type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.array,
    onRefresh: PropTypes.func,
}

export default ResourceTop10;
import styles from './style/index.less';
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import { Loading, Details, Status, } from '_global';
import Monitor from './_basic/Monitor';
import Pods from 'pages/stack/_basic/pods/';
const { AnimateLoadBox } = Loading;

export default connect(createSelector(
    [
        props => props.node.nodedetails,
        props => !!props.loading.effects[`node/nodedetail`],
    ],
    (nodedetails, loading) => ({ nodedetails, loading }),
))(class extends Component {
    constructor(props) {
        super(props);
        const { match } = props;
        this.state = {
            init: false,
            name: ((match || {}).params || {}).detail || '',
        };
        ['nodedetails']
            .forEach(m => this[m] = this[m].bind(this));
    }
    nodedetails(name) {
        const { dispatch } = this.props;
        dispatch({ type: 'node/nodedetail', payload: { name } });
    }
    UNSAFE_componentWillReceiveProps({ nodedetails }) {
        const { init, name } = this.state;
        if (!init && !!nodedetails[`${name}`]) {
            this.setState({ init: true });
        }
    }
    componentDidMount() {
        this.nodedetails(this.state.name)
    }
    render() {
        const { nodedetails, loading } = this.props;
        const { name, init } = this.state;
        const { data, err } = nodedetails[`${name}`] || { data: {}, err: null };
        return (
            <AnimateLoadBox loading={loading}>
                {!init || !!err || loading ?
                    <div className="center-box">{err}</div> :
                    <Details firstLoading={loading} >
                        <Details.Header
                            header
                            key="header"
                            icon={<i className={`iconfont icon-node`} />}
                            name={(
                                <span>
                                    <Status
                                        style={{ float: 'left', width: 'auto', minWidth: '16px' }}
                                        status={data.status}
                                        text={' '}
                                        info={{
                                            success: ['ready'],
                                            error: ['ready,schedulingdisabled', 'schedulingdisabled']
                                        }}
                                    />
                                    <span style={{ float: 'left' }}>{name}</span>
                                </span>
                            )}
                            tags={[
                                {
                                    color: data.nodeInfo.conditions.unschedulable || data.nodeInfo.conditions.ready !== 'True' ? 'red' : 'green',
                                    value: data.status.split(',').indexOf('Ready') !== -1 ?
                                        data.status.split(',').indexOf('SchedulingDisabled') !== -1 ?
                                            '维护中' : '正常' : '异常'
                                }, {
                                    color: 'blue',
                                    value: `endPoint：${data.nodeInfo.endPoint}`,
                                }, ...((data.nodeInfo.addresses || [])
                                    .filter(v => /(\d{1,3}\.){3}\d{1,3}/.test(v.address))
                                    .map(v => ({
                                        color: 'blue',
                                        value: v.address,
                                    })))
                            ]}
                            desc={<div>
                                <span className={styles[`item`]}>
                                    <span className={styles[`blue`]}>{data.pods.length}</span> 个POD
                                </span>
                                <span className={styles[`item`]}>
                                    <span className={styles[`blue`]}>{((parseInt(data.nodeInfo.allocatable.cpu, 10) || 0) / 1000.0).toFixed(1)}</span> GHz CPU
                                </span>
                                <span className={styles[`item`]}>
                                    <span className={styles[`blue`]}>{((parseInt(data.nodeInfo.allocatable.memory, 10) || 0) / (1024 * 1024)).toFixed(1)}</span> GB内存
                                </span>
                                <span className={styles[`item`]}>
                                    <span className={styles[`blue`]}>{data.nodeInfo.allocatable.pods || 0}</span> 个最大副本
                                </span>
                            </div>}
                            operateRender={() => (
                                <div>
                                    <Button
                                        style={{ marginLeft: '16px' }}
                                        type="ghost"
                                        onClick={this.nodedetails}>刷新</Button>
                                </div>
                            )} />
                        <Details.Pages key="pages" pages defaultActiveKey="monitor">
                            <Monitor tab="监控信息" key="monitor" node={name} forceRender={false} />
                            <Pods tab="副本信息" key="pods" pods={data.pods || []} memTotal={(parseInt(data.nodeInfo.allocatable.memory, 10) || 0) * 1024} />
                        </Details.Pages>
                    </Details>}
            </AnimateLoadBox>
        )
    }
})
import styles from './style/index.less';
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button, Badge, Tooltip, Icon, Modal } from 'antd';
import Install from 'node/nodes/Install';
import Logs from 'node/nodes/Logs';
import { install, cancelInstalling, cancelPengding, deleteInstall, deleteInstalls } from 'services/node';

export default connect(createSelector(
    [
        props => props.node.installs.info,
        props => !!props.loading.effects[`node/installs`]
    ],
    (installs, loading) => ({ installs, loading })
))(class extends Component {
    constructor(props) {
        super(props);
        [`installs`]
            .forEach(m => this[m] = this[m].bind(this, props.cluster));
        this.timeHandle = null;
    }
    installs(cluster) {
        const { dispatch } = this.props;
        dispatch({
            type: 'node/installs',
            payload: { cluster }
        });
    }
    UNSAFE_componentWillReceiveProps({ cluster, installs: { data = [] }, loading }) {
        let installing = data.some(v => v.status === 'running' || v.status === 'pending');
        if (!loading) {
            if (!!cluster && this.props.cluster !== cluster) {
                this.installs(cluster);
            } else if (installing && !this.timeHandle) {
                this.timeHandle = setInterval(() => {
                    this.installs(cluster);
                }, 10000)
            } else if (!installing && this.timeHandle) {
                clearInterval(this.timeHandle);
                this.timeHandle = null;
            }
        }
    }
    componentDidMount() {
        const { cluster } = this.props;
        if (!!cluster) {
            this.installs(cluster);
        }
    }
    componentWillUnmount() {
        !!this.timeHandle && clearInterval(this.timeHandle);
    }
    render() {
        const { cluster, installs: { data = [] }, loading } = this.props;
        const installing = data.some(v => v.status === 'running' || v.status === 'pending');
        return (
            <div style={{ float: 'left' }}>
                <label className={styles[`install`]}>
                    < Install onSubmit={(v) => {
                        return new Promise(async (resolve, reject) => {
                            const response = await install(v);
                            if (!!response.err) {
                                reject(response.err);
                            } else {
                                await this.installs(cluster);
                                resolve();
                            }
                        })
                    }}>
                        <Button type="primary" ghost style={{ marginRight: 16 }}>添加节点{installing ? `(${data.filter(v => v.status === 'running' || v.status === 'pending').length})` : ''}</Button>
                    </Install>
                </label>
                <div className={styles[`install`]}>
                    <label className={styles[`install-details`]}>
                        {installing ? (
                            <Badge dot>
                                <Logs
                                    data={data.map((v, i) => ({ ...v, key: i }))}
                                    onCancel={(ip) => {
                                        Modal.confirm({
                                            title: `是否取消节点<${ip}>安装？`,
                                            okText: '是',
                                            cancelText: '否',
                                            onOk: () => {
                                                return new Promise(async (resolve, reject) => {
                                                    const response = await cancelInstalling();
                                                    if (!!response.err) {
                                                        reject(response.err);
                                                    } else {
                                                        await this.installs(cluster);
                                                        resolve();
                                                    }
                                                })
                                            }
                                        });
                                    }}
                                    onPend={(ip) => {
                                        Modal.confirm({
                                            title: `是否取消节点<${ip}>等待安装？`,
                                            okText: '是',
                                            cancelText: '否',
                                            onOk: () => {
                                                return new Promise(async (resolve, reject) => {
                                                    const response = await cancelPengding(ip);
                                                    if (!!response.err) {
                                                        reject(response.err);
                                                    } else {
                                                        await this.installs(cluster);
                                                        resolve();
                                                    }
                                                })
                                            }
                                        });
                                    }}
                                >
                                    <a >安装节点日志</a>
                                </Logs>
                            </Badge>
                        ) : (
                                <Logs
                                    loading={loading}
                                    data={data.map((v, i) => ({ ...v, key: i }))}
                                    onDelete={(ip) => {
                                        Modal.confirm({
                                            title: `是否删除节点<${ip}>安装记录？`,
                                            okText: '是',
                                            cancelText: '否',
                                            onOk: () => {
                                                return new Promise(async (resolve, reject) => {
                                                    const response = await deleteInstall(ip);
                                                    if (!!response.err) {
                                                        reject(response.err);
                                                    } else {
                                                        await this.installs(cluster);
                                                        resolve();
                                                    }
                                                })
                                            }
                                        });
                                    }}
                                >
                                    <a >安装节点日志</a>
                                </Logs>
                            )}
                    </label>
                    {data.length <= 0 ? null : <label className={styles[`btn-del`]}>
                        <Tooltip title="清除安装日志">
                            <Icon type="delete" onClick={() => {
                                Modal.confirm({
                                    title: `是否清除所有节点安装记录？`,
                                    okText: '是',
                                    cancelText: '否',
                                    onOk: () => {
                                        return new Promise(async (resolve, reject) => {
                                            const response = await deleteInstalls();
                                            if (!!response.err) {
                                                reject(response.err);
                                            } else {
                                                await this.installs(cluster);
                                                resolve();
                                            }
                                        })
                                    }
                                });
                            }} />
                        </Tooltip>
                    </label>}
                </div>
            </div >
        )
    }
})


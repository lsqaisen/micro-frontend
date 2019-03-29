
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Tooltip, Icon, Modal, message } from 'antd';
import NodeResources from './NodeResources';
import { modifyStatus, deleteNode, deleteApply } from 'services/node';

const Btn = ({ style, type, children }) => {
    return (
        <div className="btn-box" style={{ float: 'left', ...style }}>
            <Icon type={type} />
        </div>
    )
}

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType,
    ],
    (type) => ({ type })
))(class extends Component {
    manage() {
        const { type, name, status, update } = this.props;
        if (type !== 1) return null;
        return status.indexOf('SchedulingDisabled') !== -1 ? (
            (
                <Tooltip title="开启调度">
                    <a onClick={() => {
                        Modal.confirm({
                            title: `是否使主机${name}可调度？`,
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await modifyStatus({ name, allocatable: true });
                                    if (!!response.err) {
                                        message.error(response.err);
                                        reject(response.err);
                                    } else {
                                        await update();
                                        resolve();
                                    }
                                })
                            }
                        });
                    }} >
                        <Btn type="link" />
                    </a>
                </Tooltip>
            )
        ) : (
                <Tooltip title="维护">
                    <a onClick={() => {
                        Modal.confirm({
                            title: `是否使主机${name}进入维护状态？`,
                            content: '使主机进入维护状态后，如过该主机已被使用，那么该主机上的所有服务将调度到其他主机上，在此过程中服务可能会不稳定!',
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await modifyStatus({ name, allocatable: false });
                                    if (!!response.err) {
                                        message.error(response.err);
                                        reject(response.err);
                                    } else {
                                        await update();
                                        resolve();
                                    }
                                })
                            }
                        });
                    }} >
                        <Btn type="disconnect" style={{ color: '#f04134' }} />
                    </a>
                </Tooltip>
            )
    }
    resource() {
        return (
            <NodeResources {...this.props} >
                <Tooltip title="资源池">
                    <a> <Btn type="database" /> </a>
                </Tooltip>
            </NodeResources>
        )
    }
    del() {
        const { type, name, update } = this.props;
        return (
            <Tooltip title={type === 1 ? "删除" : "移除"}>
                <a onClick={() => {
                    type === 1 ?
                        Modal.confirm({
                            title: `是否删除该主机？`,
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await deleteNode(name);
                                    if (!!response.err) {
                                        message.error(response.err);
                                        reject(response.err);
                                    } else {
                                        await update();
                                        resolve();
                                    }
                                })
                            }
                        }) :
                        Modal.confirm({
                            title: `是否移除该主机？`,
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await deleteApply(name);
                                    if (!!response.err) {
                                        message.error(response.err);
                                        reject(response.err);
                                    } else {
                                        await update();
                                        resolve();
                                    }
                                })
                            }
                        });
                }} >
                    <Btn type="delete" style={{ color: '#f04134' }} />
                </a>
            </Tooltip >
        )
    }
    render() {
        const { type } = this.props;
        return (
            <div style={{
                overflow: 'hidden', width: type !== 1 ? '64px' : '96px'
            }}>
                <div style={{ float: "left", marginRight: 8 }}>
                    {this.resource()}
                </div>
                <div style={{ float: "left", marginRight: 8 }}>
                    {this.manage()}
                </div>
                <div style={{ float: "left", marginRight: 8 }}>
                    {this.del()}
                </div>
            </div>
        )
    }
})
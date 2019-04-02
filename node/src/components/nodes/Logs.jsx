import { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip, Icon } from 'antd';
import { Modal } from '_global';
import { Status } from '_global';

const Btn = ({ style, type, children }) => {
    return (
        <div className="btn-box" style={{ float: 'left', ...style }}>
            <Icon type={type} />
        </div>
    )
}

class Logs extends Component {
    render() {
        const { data, onDelete, onPend, onCancel, children, ...props } = this.props;
        return (
            <Modal
                maskClosable={false}
                title="安装节点日志"
                btn={children}
                cancelText="返回"
                footer={null}>
                <Table
                    {...props}
                    columns={[
                        {
                            title: '安装节点IP',
                            dataIndex: 'ip',
                            key: 'ip',
                            render: (t, r) => `${t}<${r.nodename || '--'}>`,
                        }, {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            width: 120,
                            render: (t, r) => (
                                <Status
                                    status={t}
                                    text={t}
                                    info={{
                                        success: ['done'],
                                        error: ['error'],
                                        warning: ['abort'],
                                        info: ['running', 'pending'],
                                    }}
                                />
                            ),
                        }, {
                            title: '操作',
                            width: 64,
                            render: (t, r) => (
                                <div style={{ overflow: 'hidden', width: '64px' }}>
                                    <div style={{ float: "left", marginRight: 8 }}>
                                        <Tooltip title="日志">
                                            <a href={`/node/install/log?ip=${r.ip}&type=${r.type}`} target="_blank" rel="noopener noreferrer">
                                                <Btn type="file-text" />
                                            </a>
                                        </Tooltip>
                                    </div>
                                    {r.status === 'running' ? (
                                        <div style={{ float: "left", marginRight: 8 }}>
                                            <Tooltip title="取消安装">
                                                <a onClick={() => onCancel(r.ip)}>
                                                    <Btn type="disconnect" style={{ color: '#f04134' }} />
                                                </a>
                                            </Tooltip>
                                        </div>
                                    ) : r.status === 'pending' ? (
                                        <div style={{ float: "left", marginRight: 8 }}>
                                            <Tooltip title="取消等待">
                                                <a onClick={() => onPend(r.ip)}>
                                                    <Btn type="rollback" style={{ color: '#f04134' }} />
                                                </a>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                                <div style={{ float: "left", marginRight: 8 }}>
                                                    <Tooltip title="删除">
                                                        <a onClick={() => onDelete(r.ip)}>
                                                            <Btn type="delete" style={{ color: '#f04134' }} />
                                                        </a>
                                                    </Tooltip>
                                                </div>
                                            )}
                                </div>
                            ),
                        }
                    ]}
                    dataSource={data}
                />
            </Modal>
        )
    }
}

Logs.defaultProps = {
    data: [],
    onDelete: () => { },
    onPend: () => { },
    onCancel: () => { },
}

Logs.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func,
    onPend: PropTypes.func,
    onCancel: PropTypes.func,
}

export default Logs;
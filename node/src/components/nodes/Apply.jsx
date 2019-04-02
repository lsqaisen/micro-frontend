import { Component } from 'react';
import { Form, Input, Modal as AntdModal, message, Button, Badge, List, Tag, Icon } from 'antd';
import Time from 'react-time-format';
import { Modal, LeftModal, SearchSelect } from '_global';
const FormItem = Form.Item;

const Apply = Form.create()(class extends Component {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        };
        [`reset`, `submit`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    reset(params) {
        const { form: { resetFields } } = this.props;
        this.setState({
            disabled: false,
            ...params,
        }, resetFields);
    }

    submit() {
        const { onSubmit, form: { validateFields } } = this.props;
        return new Promise((resolve, reject) => {
            validateFields(async (error, value) => {
                if (!error) {
                    this.setState({ disabled: true });
                    try {
                        await onSubmit(value);
                        this.reset();
                        message.success('分配节点成功')
                        resolve();
                    } catch (error) {
                        message.error(`分配节点失败:${error}`)
                        this.setState({ disabled: false })
                        reject(error);
                    }
                } else {
                    message.error(`分配节点失败:${error}`)
                    reject(error);
                }
            })
        })
    }

    render() {
        const { resource, nodeSearch, form: { getFieldDecorator }, children } = this.props;
        return (
            <Modal
                maskClosable={false}
                title="添加集群"
                btn={children}
                cancelText="返回"
                onOk={this.submit}>
                <Form >
                    <FormItem
                        {...this.formItemLayout}
                        label="资源池"
                    >
                        {getFieldDecorator('resource', {
                            initialValue: resource,
                            rules: [{ required: true, message: '资源池名称不能为空!' }],
                        })(
                            <Input placeholder="资源池名称" disabled />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="节点">
                        {getFieldDecorator('allocNode', {
                            rules: [{ required: true, message: '请选择节点!' }],
                        })(
                            <SearchSelect
                                placeholder="请选择节点"
                                style={{ width: '100%' }}
                                onSearch={nodeSearch}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
})

function getStatus(status) {
    switch (status) {
        case 'wait':
            return <Tag color="#108ee9">待处理</Tag>;
        case 'reject':
            return <Tag color="#f50">被拒绝</Tag>;
        case 'done':
            return <Tag color="#87d068">完成</Tag>;
        case 'cancel':
            return <Tag color="red">被取消</Tag>;
        default:
            return;
    }
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

export default ({ admin, applys, nodeSearch, setApply, onApply }) => {
    const _nodeSearch = (params) => {
        const { allocNodes, resource, page = 1, itemsPerPage = 10 } = params || {};
        return new Promise(async (resolve, reject) => {
            try {
                let response = await nodeSearch({ resource, page, itemsPerPage });
                if (response.err) {
                    reject(response.err)
                } else {
                    resolve({
                        data: ((response.data || {}).nodes || []).map(v => ({
                            key: v.name,
                            label: `${v.name}${allocNodes.split(',').some(name => name === v.name) ? '(已分配)' : ''}`,
                            disabled: allocNodes.split(',').some(name => name === v.name),
                        })),
                        params: null,
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    const onDone = (params) => {
        AntdModal.confirm({
            title: `是否确认完成分配操作？`,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                return new Promise(async (resolve, reject) => {
                    const err = await setApply({ ...params, status: 'done' });
                    if (!!err) {
                        message.error(`操作失败`)
                        reject(err);
                    } else {
                        message.success('操作成功')
                        resolve()
                    }
                })
            }
        });
    }
    const onReject = (params) => {
        AntdModal.confirm({
            title: `是否解决该分配申请？`,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                return new Promise(async (resolve, reject) => {
                    const err = await setApply({ ...params, status: 'reject' });
                    if (!!err) {
                        message.error(`操作失败`)
                        reject(err);
                    } else {
                        message.success('已拒绝该申请')
                        resolve()
                    }
                })
            }
        });
    }
    const onCancel = (params) => {
        AntdModal.confirm({
            title: `是否取消该分配申请？`,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                return new Promise(async (resolve, reject) => {
                    const err = await setApply({ ...params, status: 'cancel' });
                    if (!!err) {
                        message.error(`操作失败`)
                        reject(err);
                    } else {
                        message.success('已取消该申请')
                        resolve()
                    }
                })
            }
        });
    }
    return (
        <LeftModal title={`节点申请管理`} btn={(
            <Badge count={(applys || []).filter(item => item.status === 'wait').length}>
                <Button type="primary" ghost>节点申请管理</Button>
            </Badge>
        )} >
            <div style={{ padding: '0 24px' }}>
                <List
                    itemLayout="vertical"
                    pagination={{
                        pageSize: document.body.clientHeight < 900 ? 3 : 4,
                    }}
                    dataSource={applys.sort(({ id: aid }, { id: bid }) => bid - aid)}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText
                                    type="clock-circle-o"
                                    text={<Time value={item.applyTime} format="YYYY-MM-DD  HH:mm" />}
                                />
                            ]}
                            extra={(() => {
                                if (admin && item.status === 'wait') {
                                    if (!item.allocNodes) {
                                        return (
                                            <div>
                                                <Apply
                                                    resource={item.reqResourcePool}
                                                    onSubmit={(v) => onApply({ id: item.id, ...v })}
                                                    nodeSearch={(params) => _nodeSearch({
                                                        ...params,
                                                        resource: item.reqResourcePool,
                                                        allocNodes: item.allocNodes
                                                    })}
                                                >
                                                    <Button size="small"
                                                        type='primary'
                                                        ghost
                                                        style={{ marginRight: 8 }}
                                                    >分配</Button>
                                                </Apply>
                                                <Button
                                                    size="small"
                                                    type="danger"
                                                    ghost
                                                    onClick={() => onReject({ id: item.id })}
                                                >拒绝</Button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div size="small">
                                                <Apply
                                                    resource={item.reqResourcePool}
                                                    onSubmit={(v) => onApply({ id: item.id, ...v })}
                                                    nodeSearch={(params) => _nodeSearch({
                                                        ...params,
                                                        resource: item.reqResourcePool,
                                                        allocNodes: item.allocNodes
                                                    })}
                                                >
                                                    <Button
                                                        size="small"
                                                        type='ghost'
                                                        style={{ marginRight: 8 }}
                                                    >分配</Button>
                                                </Apply>
                                                <Button
                                                    size="small"
                                                    type="primary"
                                                    ghost
                                                    onClick={() => onDone({ id: item.id })}
                                                >完成</Button>
                                            </div>
                                        )
                                    }
                                } else if (!admin && item.status === 'wait' && !item.allocNodes) {
                                    return (
                                        <Button
                                            size="small"
                                            type='danger'
                                            ghost
                                            onClick={() => onCancel({ id: item.id })}
                                        >取消</Button>
                                    )
                                }
                            })()}
                        >
                            <List.Item.Meta
                                title={(
                                    <div>
                                        <Badge dot={item.status === 'wait'}>{getStatus(item.status)} 工作空间{item.namespace}申请节点 </Badge>
                                    </div>
                                )}
                                description={`期望配置：资源池${item.reqResourcePool}->${item.desResourcePool}，${item.cpu}核、${item.mem}G、${item.nodeNum}个节点`}
                            />
                            {item.desc}
                            {item.allocNodes ? `已分配主机：${item.allocNodes}` : null}
                        </List.Item>
                    )}
                />
            </div>
        </LeftModal>
    )
}
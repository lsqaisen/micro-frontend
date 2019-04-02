import { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal as Msg, InputNumber } from 'antd';
import { Modal, SearchSelect } from '_global';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class ApplyNode extends Component {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 17 },
        },
    };
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
                        Msg.success({
                            title: '成功发送申请节点信息，请耐心等待审批结果。',
                            content: error,
                        })
                        resolve();
                    } catch (error) {
                        Msg.error({
                            title: '发送申请节点信息失败',
                            content: error,
                        })
                        this.setState({ disabled: false })
                        reject(error);
                    }
                } else {
                    Msg.error({
                        title: '发送申请节点信息失败',
                        content: error,
                    })
                    reject(error);
                }
            })
        })
    }

    render() {
        const { reqResourceSearch, desResourceSearch, form: { getFieldDecorator }, children } = this.props;
        return (
            <Modal
                maskClosable={false}
                title="申请节点"
                btn={children}
                cancelText="返回"
                onOk={this.submit}>
                <Form >
                    <FormItem
                        {...this.formItemLayout}
                        label="请求资源池">
                        {getFieldDecorator('reqResourcePool', {
                            rules: [
                                { required: true, message: '请求资源池必须选择!' },
                            ],
                        })(
                            <SearchSelect
                                placeholder="请求资源池"
                                style={{ width: '100%' }}
                                onSearch={reqResourceSearch}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="目标资源池">
                        {getFieldDecorator('desResourcePool', {
                            rules: [
                                { required: true, message: '目标资源池必须选择!' },
                            ],
                        })(
                            <SearchSelect
                                placeholder="目标资源池"
                                style={{ width: '100%' }}
                                onSearch={desResourceSearch}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="节点数"
                    >
                        {getFieldDecorator('nodenum', {
                            initialValue: 1,
                            rules: [
                                { required: true, message: '申请节点数不能为空!' },
                            ],
                        })(
                            <InputNumber
                                min={1}
                                max={100}
                                placeholder='申请节点数'
                                style={{ width: '60%' }}
                                parser={(v) => parseInt(`${v}`.split('').slice(0, 16).join(''), 10) || 1}
                            />
                        )} 个
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="节点资源CPU"
                    >
                        {getFieldDecorator('cpu', {
                            initialValue: 2,
                            rules: [{ required: true, message: '申请节点资源CPU不能为空!' }],
                        })(
                            <InputNumber
                                min={1}
                                max={64}
                                placeholder='节点资源CPU'
                                style={{ width: '60%' }}
                                parser={(v) => parseInt(`${v}`.split('').slice(0, 16).join(''), 10) || 1}
                            />
                        )} 核
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="节点资源内存"
                    >
                        {getFieldDecorator('mem', {
                            initialValue: 4,
                            rules: [{ required: true, message: '申请节点资源内存不能为空!' }],
                        })(
                            <InputNumber
                                min={1}
                                max={256}
                                placeholder='节点资源内存'
                                style={{ width: '60%' }}
                                parser={(v) => parseInt(`${v}`.split('').slice(0, 16).join(''), 10) || 1}
                            />
                        )} G
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('desc')(
                            <TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="请输入备注" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

ApplyNode.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}


export default Form.create()(ApplyNode);
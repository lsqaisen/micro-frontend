import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal as Msg } from 'antd';
import { Modal } from '_global';
const FormItem = Form.Item;
const { TextArea } = Input;

class CreateResource extends Component {
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
                        resolve();
                    } catch (error) {
                        Msg.error({
                            title: '添加资源池失败',
                            content: error,
                        })
                        this.setState({ disabled: false })
                        reject(error);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    render() {
        const { form: { getFieldDecorator }, children } = this.props;
        const { disabled } = this.state;
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
                        label="资源池名称"
                        required
                    >
                        {getFieldDecorator(`tag`, {
                            initialValue: "",
                            rules: [{ required: true, max: 64, message: '名称长度为1～64个字符' }],
                        })(<Input disabled={disabled} placeholder="资源池名称" />)}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="英文代号"
                        required
                    >
                        {getFieldDecorator(`name`, {
                            initialValue: "",
                            rules: [{
                                validator: (rule, value, callback) => {
                                    if (!value) callback('资源池代号不能为空！');
                                    else {
                                        if (value.length > 64) {
                                            callback('代号长度为1~64！');
                                        } else if (!/^[a-z0-9-]{1,}$/.test(value)) {
                                            callback(`代号由小写字母、数字和字符‘-’组成！`);
                                        } else if (/^\d/.test(value)) {
                                            callback(`开始字符不能是数字`);
                                        } else if (/^[-]/.test(value) || /[-]$/.test(value)) {
                                            callback('字符‘-’不能为开始和结束字符！');
                                        }
                                    }
                                    callback();
                                }
                            }],
                        })(<Input disabled={disabled} placeholder="资源池代号不能为空！" />)}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="资源池描述"
                    >
                        {getFieldDecorator(`desc`, {
                            initialValue: "",
                        })(<TextArea disabled={disabled} autosize={{ minRows: 4, maxRows: 4 }} />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

CreateResource.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form.create()(CreateResource);
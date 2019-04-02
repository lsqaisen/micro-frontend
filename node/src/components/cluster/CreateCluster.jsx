import { Component } from 'react';
import { Form, Input, Radio, Modal as Msg } from 'antd';
import { Modal } from '_global';
import VCenterInput from './inputs/VCenterInput';
import AliyunInput from './inputs/AliyunInput';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class CreateCluster extends Component {
    formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            type: 'vcenter',
            disabled: false,
        };
        [`reset`, `submit`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    reset(params) {
        const { form: { resetFields } } = this.props;
        this.setState({
            type: 'vcenter',
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
                            title: '添加集群失败',
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
        const { type, disabled } = this.state;
        return (
            <Modal
                maskClosable={false}
                title="添加集群"
                btn={children}
                cancelText="返回"
                onOk={this.submit}>
                <Form>
                    <FormItem
                        {...this.formItemLayout}
                        label="名称"
                        required
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '名称不能为空!' },
                                {
                                    validator: (rule, value, callback) => {
                                        if (!!value) {
                                            if (value.length > 63) {
                                                callback('名称长度为1~63！');
                                            } else if (!/^[a-z0-9-]{1,}$/.test(value)) {
                                                callback(`名称由小写字母、数字和字符‘-’组成！`);
                                            } else if (/^\d/.test(value)) {
                                                callback(`开始字符不能是数字`);
                                            } else if (/^[-]/.test(value) || /[-]$/.test(value)) {
                                                callback('字符‘-’不能为开始和结束字符！');
                                            }
                                        }
                                        callback();
                                    }
                                }
                            ]
                        })(
                            <Input disabled={disabled} placeholder="名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="备注"
                    >
                        {getFieldDecorator('desc')(
                            <TextArea disabled={disabled} autosize={{ minRows: 4, maxRows: 4 }} placeholder="请输入备注" />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="类型"
                        required
                    >
                        {getFieldDecorator('type', {
                            initialValue: type,
                            rules: [{ required: true, message: '必须选择集群类型!' }]
                        })(
                            <RadioGroup disabled={disabled}
                                onChange={(v) => { this.setState({ type: v.target.value }) }}>
                                <Radio value="vcenter">vcenter</Radio>
                                <Radio value="aliyun">aliyun</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {type === 'vcenter' ?
                        <FormItem
                            {...this.formItemLayout}
                            label="配置"
                            required>
                            {getFieldDecorator('vcenter', {
                                rules: [{
                                    validator: (rule, value, callback) => {
                                        if (!value) callback('数据有误')
                                        else {
                                            if (!value.name) {
                                                callback('用户名不能为空！');
                                            }
                                            if (!value.password) {
                                                callback('用户密码不能为空！');
                                            }
                                            if (!value.url) {
                                                callback('集群地址不能为空！');
                                            }
                                        }
                                        callback();
                                    }
                                }]
                            })(
                                <VCenterInput
                                    disabled={disabled}
                                    size="default"
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                />
                            )}
                        </FormItem> : <FormItem
                            {...this.formItemLayout}
                            label="配置"
                        >
                            {getFieldDecorator('aliyun', {
                                rules: [{
                                    validator: (rule, value, callback) => {
                                        if (!value) callback('数据有误')
                                        else {
                                            if (!value.key) {
                                                callback('key不能为空！');
                                            }
                                            if (!value.secret) {
                                                callback('secret不能为空！');
                                            }
                                        }
                                        callback();
                                    }
                                }],
                            })(
                                <AliyunInput
                                    disabled={disabled}
                                    size="default"
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                />
                            )}
                        </FormItem>}
                </Form>
            </Modal>
        )
    }
}

CreateCluster.propTypes = {
}

export default Form.create()(CreateCluster);
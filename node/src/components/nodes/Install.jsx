import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Select, InputNumber, Radio, Button, Modal as Msg } from 'antd';
import { Modal } from '_global';
import HostIpInput from './inputs/HostIpInput';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Install extends Component {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            type: 'username_password',
            iplist: [],
            select_iplist: [],
        };
        [`reset`, `submit`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    reset(params) {
        const { form: { resetFields } } = this.props;
        resetFields();
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
        const { form: { getFieldDecorator, validateFields }, children } = this.props;
        const { disabled, type, iplist, select_iplist } = this.state;
        return (
            <Modal
                maskClosable={false}
                title="添加节点"
                btn={children}
                cancelText="返回"
                onOk={this.submit}>
                <Form >
                    <FormItem
                        {...this.formItemLayout}
                        label="IP地址范围"
                    >
                        <div style={{ lineHeight: '24px', margin: '10px 0' }}>填写一个有效IP地址后，然后输入接入主机数量，以所填写的IP地址开始计算</div>
                        <Row gutter={8}>
                            <Col span={19}>
                                {getFieldDecorator('ipinfo', {
                                    initialValue: { ip: '', num: 1 },
                                    rules: [{ required: true, message: 'ip不能为空  !' }, {
                                        validator: (rule, data, callback) => {
                                            if (!!!data || !!!data.ip) {
                                                callback('IP不能为空！');
                                            } else if (!/^([1-9]\d{0,1}|1\d\d|2[0-4]\d|25[0-4])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.([1-9]\d{0,1}|1\d\d|2[0-4]\d|25[0-4])$/.test(data.ip)) {
                                                callback('IP地址不正确！');
                                            }
                                            //验证必须为正整数
                                            let pattern = /^([1-9][0-9]*)$/;
                                            if (!pattern.test(data.num)) {
                                                callback('必须输入正整数');
                                            }
                                            callback();
                                        }
                                    }],
                                })(
                                    <HostIpInput disabled={disabled} />
                                )}
                            </Col>
                            <Col span={5}>
                                <Button type="primary" size="large" onClick={() => {
                                    validateFields(['ipinfo'], (error, values) => {
                                        if (!error) {
                                            let iplist = [values.ipinfo.ip];
                                            let iplistAll = this.state.select_iplist;
                                            for (let i = 1; i < parseInt(values.ipinfo.num, 10); i++) {
                                                let ipitems = values.ipinfo.ip.split('.');
                                                ipitems = ipitems.map(item => parseInt(item, 10));
                                                ipitems[3] += i;
                                                if (ipitems[3] >= 255) {
                                                    ipitems[3] = ipitems[3] - 254;
                                                    ipitems[2] += 1;
                                                    if (ipitems[2] > 255) {
                                                        ipitems[2] = 0;
                                                        ipitems[1] += 1;
                                                        if (ipitems[1] > 255) {
                                                            ipitems[1] = 0;
                                                            ipitems[0] += 1;
                                                        }
                                                    }
                                                }
                                                iplist.push(ipitems.join('.'));
                                            }
                                            for (let i = 0; i < iplist.length; i++) {
                                                iplistAll.indexOf(iplist[i]) === -1 && iplistAll.push(iplist[i]);
                                            }
                                            this.setState({
                                                iplist: iplistAll,
                                                select_iplist: iplistAll,
                                            }, () => {
                                                this.props.form.resetFields(['node_ip']);
                                            });
                                        }
                                    })
                                }}>添加</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="IP地址">
                        {getFieldDecorator('node_ip', {
                            initialValue: select_iplist,
                            rules: [{ required: true, message: '至少选择一个主机IP!' }],
                        })(
                            <Select
                                placeholder="请先添加IP地址/范围"
                                mode="multiple"
                                style={{ width: '100%' }}
                                onChange={(v) => {
                                    this.setState({
                                        select_iplist: v,
                                    })
                                }}
                            >
                                {iplist.map(ip => {
                                    return <Option key={ip}>{ip}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="端口"
                    >
                        {getFieldDecorator('node_port', {
                            initialValue: 22,
                            rules: [{ required: true, message: '端口不能为空  !' }, {
                                validator: (rule, value, callback) => {
                                    //验证必须为正整数
                                    let pattern = /^([1-9][0-9]*)$/;
                                    if (!pattern.test(value)) {
                                        callback('端口必须是正整数');
                                    }
                                    if (value < 1 || value > 65535) {
                                        callback('端口必须在1到65535范围');
                                    }
                                    callback();
                                }
                            }],
                        })(
                            <InputNumber style={{ width: '40%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="认证方式"
                    >
                        {getFieldDecorator('auth_type', {
                            initialValue: type,
                        })(
                            <RadioGroup onChange={(v) => { this.setState({ type: v.target.value }) }}>
                                <Radio value="username_password">用户密码</Radio>
                                <Radio value="ssh_key">SSHKey</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {type === 'username_password' ? [
                        <FormItem
                            {...this.formItemLayout}
                            label="用户名"
                            key="1"
                        >
                            {getFieldDecorator('ssh_username', {
                                initialValue: 'root',
                                rules: [{ required: true, message: '用户名不能为空!' }, {
                                    validator: (rule, value, callback) => {
                                        if (!!value) {
                                            let pattern = /[\u4e00-\u9fa5]/;
                                            let n = 0;
                                            for (let i = 0; i < value.length; i++) {
                                                if (pattern.test(value[i])) {
                                                    n = n + 3;
                                                } else {
                                                    n = n + 1;
                                                }
                                            }
                                            if (n > 50) {
                                                callback('用户名长度超出限制');
                                            }
                                        }
                                        callback();
                                    }
                                }],
                            })(
                                <Input disabled placeholder="请输入用户名" />
                            )}
                        </FormItem>,
                        <FormItem
                            {...this.formItemLayout}
                            label="密码"
                            key="2"
                        >
                            {getFieldDecorator('ssh_password', {
                                rules: [{ required: true, message: '密码不能为空!' }, {
                                    validator: (rule, value, callback) => {
                                        if (!!value) {
                                            let pattern = /[\u4e00-\u9fa5]/;
                                            let n = 0;
                                            for (let i = 0; i < value.length; i++) {
                                                if (pattern.test(value[i])) {
                                                    n = n + 3;
                                                } else {
                                                    n = n + 1;
                                                }
                                            }
                                            if (n > 50) {
                                                callback('密码长度超出限制');
                                            }
                                        }
                                        callback();
                                    }
                                }],
                            })(
                                <Input type='password' autoComplete="new-password" placeholder="请输入密码" />
                            )}
                        </FormItem>,
                    ] : [<FormItem
                        {...this.formItemLayout}
                        label="SSHKey"
                        key="ssh_key"
                    >
                        {getFieldDecorator('ssh_key', {
                            rules: [{ required: true, message: 'SSHKey不能为空!' }],
                        })(
                            <Input type="textarea" size="large" autosize={{ minRows: 6, maxRows: 10 }} placeholder="请输入SSHKey" />
                        )}
                    </FormItem>]}
                </Form>
            </Modal>
        )
    }
}

Install.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form.create()(Install);
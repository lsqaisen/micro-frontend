import { PureComponent, Component } from 'react';
import { Form, Input, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import HostIPInput from './input/hostip-input';
import IPInput from '@/components/inputs/ip';

const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

@(Form.create() as any)
class AddNodeForm extends PureComponent<FormComponentProps & any, any> {
  static readonly defaultProps = {
    formItemLayout: {
      labelCol: { span: 5, },
      wrapperCol: { span: 19, },
    }
  };

  state = {
    type: 'vcenter'
  }

  checkName = (rule: any, value: any, callback: any) => {
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

  render() {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="IP地址范围"
        >
          <IPInput />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="IP地址范围"
        >
          <Input />
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="IP地址">
          {getFieldDecorator('node_ip', {
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
          {...formItemLayout}
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
          {...formItemLayout}
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
            {...formItemLayout}
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
            {...formItemLayout}
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
          {...formItemLayout}
          label="SSHKey"
          key="ssh_key"
        >
          {getFieldDecorator('ssh_key', {
            rules: [{ required: true, message: 'SSHKey不能为空!' }],
          })(
            <Input type="textarea" size="large" autosize={{ minRows: 6, maxRows: 10 }} placeholder="请输入SSHKey" />
          )}
        </FormItem>]} */}
      </Form>
    )
  }
}

export default AddNodeForm;
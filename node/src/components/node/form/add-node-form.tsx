import { PureComponent } from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import HostIPInput from './input/hostip-input';

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
    type: 'username_password'
  }

  render() {
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          style={{ marginBottom: 0 }}
          label="IP地址范围"
          validateStatus=""
          help=""
          required
        >
          {getFieldDecorator('node_ip', { rules: [] })(
            <HostIPInput />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="端口"
        >
          {getFieldDecorator('node_port', {
            initialValue: 22,
            rules: [{ required: true, message: '端口不能为空  !' }, {
              validator: (rule: any, value: any, callback: any) => {
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
                validator: (rule: any, value: any, callback: any) => {
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
              rules: [{ required: true, message: '密码不能为空!' }],
            })(
              <Input type='password' autoComplete="new-password" placeholder="请输入密码" />
            )}
          </FormItem>,
        ] : (
            <FormItem
              {...formItemLayout}
              label="SSHKey"
            >
              {getFieldDecorator('ssh_key', {
                rules: [{ required: true, message: 'SSHKey不能为空!' }],
              })(
                <TextArea autosize={{ minRows: 6, maxRows: 10 }} placeholder="请输入SSHKey" />
              )}
            </FormItem>
          )}
      </Form>
    )
  }
}

export default AddNodeForm;
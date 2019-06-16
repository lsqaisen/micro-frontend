import { PureComponent } from 'react';
import { Form, Input, InputNumber, Checkbox, Row, Col, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { setSmtpRequest } from '@/services/config';
import styles from './style/index.less';

const FormItem = Form.Item;

const TestSmtp = Form.create()(({ form: { getFieldDecorator } }: any) => {
  return (
    <Form>
      <FormItem
        {...{
          wrapperCol: { span: 24 },
        }}>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: '收件邮箱地址必须填写' },
            { max: 60, message: '最大长度不超过60' },
            { type: 'email', message: 'Email地址不正确' },
          ],
        })(
          <Input placeholder="请输入收件邮箱地址" />
        )}
      </FormItem>
    </Form>
  )
})

function testSmtp(data: any, onSend: (data: any) => any) {
  let testRef: any = undefined;
  Modal.confirm({
    title: '请输入收件邮箱地址',
    content: (
      <TestSmtp ref={(ref) => testRef = ref} />
    ),
    okText: '发送',
    onOk: () => {
      return new Promise((resolve, reject) => {
        testRef.validateFields(async (error: any, value: any) => {
          if (!error) {
            try {
              await onSend({ ...data, ...value });
              resolve();
            } catch (error) {
              reject(error);
            }
          } else {
            reject(error);
          }
        })
      })
    },
  });
}


export interface SmtpFromProps extends FormComponentProps {
  email: { [key: string]: any };
  formItemLayout?: any;
  test: () => any;
  submit: (email: setSmtpRequest) => any;
}

@(Form.create() as any)
class SmtpForm extends PureComponent<SmtpFromProps, any> {
  static readonly defaultProps: SmtpFromProps = {
    form: new Object(null) as WrappedFormUtils,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    email: new Object(null) as setSmtpRequest,
    test: () => null,
    submit: () => null,
  };

  state = {
    loading: false,
  }

  reset = () => {
    this.setState({ disabled: false, loading: false, })
    const { form: { resetFields } } = this.props;
    resetFields();
  }

  test = () => {
    const { test, form: { validateFields } } = this.props;
    validateFields((error, value) => {
      if (!error) {
        console.log(value, test)
        testSmtp(value, test);
      }
    })
  }

  submit = () => {
    const { submit, form: { validateFields } } = this.props;
    validateFields(async (error, values) => {
      if (!error) {
        this.setState({ loading: true })
        // if ((await submit!(values)) as any) {
        // } else {
        // }
        await submit!(values)
        this.setState({ loading: false })
      }
    })
  }

  UNSAFE_componentWillReceiveProps({ email }: SmtpFromProps) {
    if (Object.keys(email).some(key => this.props.email[key] !== email[key])) {
      this.props.form.resetFields();
    }
  }

  render() {
    const { email, formItemLayout, form } = this.props;
    const { loading } = this.state;
    const { email_enable, email_host, email_port, email_ssl, email_username, email_password, email_from } = email;
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = form;
    const _data = getFieldsValue() || {};
    const password = _data.email_password;
    delete _data.email_password;
    const disabled = Object.keys(_data).every(key => email[key] === _data[key]) && !password;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="服务器地址">
          {getFieldDecorator('email_host', {
            initialValue: email_host,
            rules: [
              { required: true, message: '服务器地址必须填写' },
              { max: 60, message: '最大长度不超过60' },
              { pattern: /^([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/, message: '邮箱服务地址格式错误' }
            ],
          })(
            <Input disabled={!email_enable} placeholder="发送邮件服务器" />
          )}
        </FormItem>
        <Row gutter={16}>
          <Col span={15}>
            <FormItem
              {...{
                labelCol: { xs: 24, md: 8 },
                wrapperCol: { xs: 23, md: 15 },
              }}
              label="端口">
              {getFieldDecorator('email_port', {
                initialValue: email_port,
                rules: [
                  { required: true, message: '端口必须填写' },
                ],
              })(
                <InputNumber disabled={!email_enable} placeholder="端口" min={1} max={65535} style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              className={styles.port}
              label="端口"
              {...{
                labelCol: { xs: 24, md: 0 },
                wrapperCol: { xs: 24, md: 24 },
              }}>
              {getFieldDecorator('email_ssl', {
                initialValue: email_ssl,
                valuePropName: 'checked',
              })(
                <Checkbox disabled={!email_enable} onChange={(v) => v.target.checked && setFieldsValue({ email_port: 465 })}>启用SSL</Checkbox>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="发件账号">
          {getFieldDecorator('email_username', {
            initialValue: email_username,
            rules: [
              { required: true, message: '发件账号必须填写' },
              { max: 60, message: '最大长度不超过60' },
              { type: 'email', message: 'Email地址不正确' },
            ],
          })(
            <Input
              disabled={!email_enable}
              placeholder="发件账号"
              onBlur={(v) => setFieldsValue({ email_from: v.target.value })}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('email_password', {
            initialValue: email_password,
            rules: [
              { required: true, message: "密码不能为空" },
              { max: 60, message: '最大长度不超过60' }
            ]
          })(
            <Input disabled={!email_enable} placeholder="请输入邮箱密码" type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="发件人"
          extra="通常情况下和发件账号相同">
          {getFieldDecorator('email_from', {
            initialValue: email_from,
            rules: [
              { required: true, message: '发件人必须填写' },
              { max: 60, message: '最大长度不超过60' },
              { type: 'email', message: 'Email地址不正确' },
            ],
          })(
            <Input disabled={!email_enable} placeholder="发件人" />
          )}
        </FormItem>
        <FormItem wrapperCol={{ xs: { span: 24, offset: 0 }, md: { span: 19, offset: 5 } }} >
          <Button loading={loading} disabled={disabled} type="primary" style={{ marginRight: 16 }} onClick={this.submit} >提交</Button>
          <Button disabled={disabled} style={{ marginRight: 16 }} onClick={this.reset} >重置</Button>
          <Button disabled={!email_enable} type="primary" ghost style={{ marginRight: 16 }} onClick={() => this.test()} >测试</Button>
        </FormItem>
      </Form>
    )
  }
}

export default SmtpForm;
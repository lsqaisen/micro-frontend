import { PureComponent, Component } from 'react';
import { Form, Modal, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form'
import { polyfill } from 'react-lifecycles-compat';
import QueueAnim from 'rc-queue-anim';
import Logo from '../logo';
import EmailInput from '../input/email-input';
import { EmailInputProps } from '../input/email-input';
import { checkPassword } from './checks';
import styles from './style/index.less';

const FormItem = Form.Item;

export type ResetPasswordProps = {
  loading?: boolean;
  changeLogin: () => void;
  onSubmit?: (values: object) => void;
  getCode?: (value: string | undefined) => void;
  onSuccess?: () => void;
}

class ResetPassword extends (PureComponent || Component)<ResetPasswordProps & EmailInputProps & FormComponentProps, any> {

  state = { error: '' };

  onSubmit: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    e.preventDefault();
    const { form: { validateFields }, onSubmit = () => { }, onSuccess = () => { } } = this.props;
    this.setState({ error: '' });
    validateFields(async (err, values) => {
      if (!err) {
        try {
          await onSubmit(values);
          Modal.success({
            title: '重置密码成功！',
            onOk: () => onSuccess(),
          });

        } catch (error) {
          console.error(error)
          this.setState({ error })
        }
      }
    })
  }

  //检查两次输入密码是否一致
  checkPass(rule: any, value: string | undefined | null, callback: Function) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { form, getCode, loading, changeLogin } = this.props;
    const { getFieldDecorator, getFieldError } = form;
    const { error } = this.state;
    return (
      <QueueAnim
        delay={600}
        duration={400}
        animConfig={[
          { opacity: [1, 0] },
          { opacity: [1, 0] }
        ]}
      >
        <Form key="reset" onSubmit={this.onSubmit}>
          <header className={styles.logo}>
            <Logo />
          </header>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: '请输入邮箱！',
              }, {
                type: 'email',
                message: '邮箱格式有误！',
              }],
            })(
              <EmailInput onCode={getCode} error={(getFieldError('username') || []).join(',') || ''} />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('uuid', {
              rules: [{
                required: true,
                message: '请输入验证码',
              }],
            })(
              <Input prefix={<Icon type="safety" />} placeholder="请输入验证码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码，至少8位，区分大小写',
              }, { validator: checkPassword }],
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码，至少8位，区分大小写" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('cfmpassword', {
              rules: [{
                required: true,
                message: '确认输入密码',
              }, { validator: this.checkPass.bind(this) }]
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="确认输入密码" />
            )}
          </FormItem>
          <p className={styles[`error`]}>{error}</p>
          <FormItem>
            <Button type="primary" loading={loading} htmlType="submit" style={{ width: '136px' }}>重置密码</Button>
            <footer style={{ lineHeight: '40px', float: 'right' }}>
              <a href="" onClick={(e) => {
                e.preventDefault();
                changeLogin();
              }} >已有账户登录</a>
            </footer>
          </FormItem>
        </Form>
      </QueueAnim>
    )
  }
}

polyfill(ResetPassword);

export default Form.create<ResetPasswordProps & EmailInputProps & FormComponentProps>()(ResetPassword);
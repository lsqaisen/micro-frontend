import { PureComponent, Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form'
import { polyfill } from 'react-lifecycles-compat';
import QueueAnim from 'rc-queue-anim';
import Logo from '../logo';
import NameInput from '../input/name-input';
import { NameInputProps } from '../input/name-input';
import { checkPassword } from './checks';
import styles from './style/index.less';

const FormItem = Form.Item;

export type LoginFormProps = {
  loading?: boolean;
  firstLogin?: boolean;
  formItemLayout?: object;
  changeResetPassword: () => void;
  onSubmit: (values: any) => any;
  goFirstLogin: (e: React.MouseEvent) => void;
};

class LoginForm extends (PureComponent || Component)<LoginFormProps & NameInputProps & FormComponentProps, any> {
  state = {
    error: "",
    loginType: 'local',
  }

  _onSubmit: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    e.preventDefault();
    const { form: { validateFields }, onSubmit, goFirstLogin } = this.props;
    this.setState({ error: '' })
    validateFields(async (err, values) => {
      if (!err) {
        try {
          let response = await onSubmit(values);
          if (response.code === 203) {
            goFirstLogin(values);
          }
        } catch (error) {
          this.setState({ error })
        }
      }
    })
  }

  //检查两次输入密码是否一致
  checkPass(rule: any, value: string | undefined | null, callback: Function) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { form, domains, loading, firstLogin, changeResetPassword, goFirstLogin } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { error, loginType } = this.state;
    return (
      <QueueAnim
        delay={600}
        duration={400}
        animConfig={[
          { opacity: [1, 0] },
          { opacity: [1, 0] }
        ]}
      >
        <Form key="login" onSubmit={this._onSubmit}>
          <header className={styles.logo}>
            <Logo />
          </header>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                whitespace: true,
              }, {
                required: true,
                message: '请输入用户名',
              }, {
                validator: (rule, value, callback) => {
                  if (value && loginType === 'relation') {
                    const [name = undefined, domain = undefined] = (value || '').split('@');
                    if (!name) callback('请输入账户名！');
                    else if (!domain) callback('请选择所属域！');
                  }
                  callback();
                }
              }],
            })(
              <NameInput disabled={firstLogin} domains={domains} />
            )}
          </FormItem>
          <QueueAnim
            appear={false}
            style={{ width: '100%', position: 'relative' }}
            duration={400}
            animConfig={[
              { marginTop: ['0', '164px'] },
              { opacity: [1, 0] }
            ]}
          >
            {!firstLogin ? (
              <div className={styles.item} key="password">
                <FormItem key="password">
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: '请输入密码',
                    }],
                  })(
                    <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem style={{ marginBottom: '16px' }}>
                  <Button className={styles[`btn`]} type="primary" loading={loading} onClick={goFirstLogin}>登录</Button>
                </FormItem>
                <footer style={{ lineHeight: '24px' }}>
                  <a href="" onClick={(e) => {
                    e.preventDefault();
                    changeResetPassword();
                  }} >忘记密码</a>
                </footer>
              </div>
            ) : ([
              <div className={styles.item} key="new_password">
                <FormItem>
                  {getFieldDecorator('new_password', {
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
                <FormItem style={{ marginBottom: '16px' }}>
                  <Button type="primary" loading={loading} onClick={goFirstLogin} style={{ width: '186px' }}>重置密码并登录</Button>
                  <footer style={{ float: "right", lineHeight: '40px' }}>
                    <a href="" onClick={(e) => {
                      e.preventDefault();
                      goFirstLogin(e);
                    }} >返回</a>
                  </footer>
                </FormItem>
              </div>
            ])}
          </QueueAnim>
        </Form>
      </QueueAnim>
    )
  }
}

polyfill(LoginForm);


export default Form.create<LoginFormProps & NameInputProps & FormComponentProps>()(LoginForm);
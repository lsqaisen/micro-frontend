import React, { PureComponent } from 'react';
import { Form, Tabs, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form'
import { polyfill } from 'react-lifecycles-compat';
import { NameInput } from '../input';
import { NameInputProps } from '../input/name-input';
import styles from './style/index.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export type LoginFormProps = {
  loading?: boolean;
  formItemLayout?: object;
  onSubmit: (values: any) => any;
  goFirstLogin: (values: any) => void;
} & NameInputProps & FormComponentProps;

@Form.create()
class LoginForm extends PureComponent<LoginFormProps, any> {
  state = {
    error: "",
    loginType: 'local',
  }

  onSubmit = (e) => {
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

  render() {
    const { form, domains, loading, formItemLayout } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { loginType, error } = this.state;
    return (
      <div>
        <div style={{ overflow: 'hidden' }}>
          <Tabs className={styles[`tabs`]} activeKey={loginType} onChange={(loginType) => this.setState({
            loginType
          }, () => {
            setFieldsValue({ username: '' })
          })}>
            <TabPane tab="本地用户登录" key="local"></TabPane>
            <TabPane disabled={!domains.length} tab="域账户登录" key="relation"></TabPane>
          </Tabs>
        </div>
        <Form onSubmit={this.onSubmit}>
          <FormItem  {...formItemLayout}>
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
              <NameInput domains={domains} type={loginType} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} >
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码',
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
            )}
          </FormItem>
          <p className={styles[`error`]}>{error}</p>
          <FormItem {...formItemLayout} >
            <Button className={styles[`btn`]} type="primary" loading={loading} htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

polyfill(LoginForm);

export default LoginForm;
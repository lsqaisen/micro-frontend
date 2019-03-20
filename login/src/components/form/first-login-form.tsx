import React, { PureComponent, Component } from 'react';
import { Form, Tabs, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { polyfill } from 'react-lifecycles-compat';
import NameInput from '../input/name-input';
import { NameInputProps } from '../input/name-input';
import styles from './style/index.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export type FirstLoginFormProps = {
  loading?: boolean;
  formItemLayout?: object;
  onSubmit: (values: any) => any;
  goFirstLogin: (values: any) => void;
} & NameInputProps & FormComponentProps;

class FirstLoginForm extends (PureComponent || Component)<FirstLoginFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit = (e: Event) => {
    e.preventDefault();
    const { form: { validateFields }, loginInfo, onSubmit, goFirstLogin } = this.props;
    this.setState({ error: '' })
    validateFields(async (err: any, values: any) => {
      if (!err) {
        try {
          const { username, password } = loginInfo;
          const { new_password } = values;
          let response = await onSubmit(
            { username, old_password: password, new_password },
            { username, password: new_password }
          );
        } catch (error) {
          this.setState({ error })
        }
      }
    })
  }

  //检查两次输入密码是否一致
  checkPass(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  render() {
    const { form, goLogin, loading } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { error } = this.state;
    return (
      <div>
        <div className={styles[`first-login`]}>
          <a href="javascript:void(0);" onClick={goLogin}>返回</a>
          <span>首次登录需重置密码</span>
        </div>
        <Form style={{ marginTop: '24px' }} onSubmit={this.onSubmit}>
          <FormItem {...formItemLayout} >
            {getFieldDecorator('new_password', {
              rules: [{
                required: true,
                message: '请输入密码，至少8位，区分大小写',
              }, { validator: checkPassword }],
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码，至少8位，区分大小写" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} >
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
          <FormItem {...formItemLayout} >
            <Button className={styles[`btn`]} type="primary" loading={loading} htmlType="submit">重置密码并登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

polyfill(FirstLoginForm);

export default FirstLoginForm;
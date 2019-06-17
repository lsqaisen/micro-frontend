import { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const Option = Select.Option;
const FormItem = Form.Item;

export interface UserFromProps extends FormComponentProps {
  admin?: boolean;
  edit?: boolean;
  user?: any;
  formItemLayout?: any;
}

@(Form.create() as any)
class UserForm extends PureComponent<UserFromProps, any> {
  static readonly defaultProps: UserFromProps = {
    form: new Object(null) as WrappedFormUtils,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    edit: false,
    user: new Object(null) as any,
  };

  checkPassRule(value: any, callback: any, name: any, t: any) {
    let form = this.props.form;
    let pattern1 = /[^\!\@\#\$\%\^\&\*\(\\\)\-\=\_\+\,\.\?\/\:\;\{\}\[\]\~\w]/g;
    let pattern2 = /[a-z]+/;
    let pattern3 = /[A-Z]+/;
    let pattern4 = /[0-9]+/;
    let pattern5 = /[\!\@\#\$\%\^\&\*\(\\\)\-\=\_\+\,\.\?\/\:\;\{\}\[\]\~]+/;
    let count = 0;
    if (pattern2.test(value)) {
      count++;
    }
    if (pattern3.test(value)) {
      count++;
    }
    if (pattern4.test(value)) {
      count++;
    }
    if (pattern5.test(value)) {
      count++;
    }
    if (value.length < 8) {
      callback('必须输入8个以上的字符');
    } else if (pattern1.test(value)) {
      callback('输入的字符不能为!@#$%^&*(\)-_=+,.?/:;{}[]~字母数字之外的');
    } else if (count < 2) {
      callback('输入包含大写，小写字母，数字，字符两种及以上');
    } else if (!!name && name != value) {
      callback('两次输入的密码不一致');
    } else {
      if (!!name) {
        if (t) {
          form.setFields({
            qr: {
              value,
              errors: '',
            },
          });
        } else {
          form.setFields({
            password: {
              value,
              errors: '',
            },
          });
        }

      }
      callback();
    }
  }

  checkPassword(rule: any, value: any, callback: any, form: any, name: any) {
    if (!!value) {
      this.checkPassRule(value, callback, name, true);
    }
    callback();
  }

  render() {
    const { admin, edit, user, formItemLayout, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Form>
        {edit && <FormItem
          style={{ display: 'none' }}
          {...formItemLayout}
          label="用户类型"
        >
          {getFieldDecorator('user_id', {
            initialValue: user!.user_id,
          })(
            <Input />
          )}
        </FormItem>}
        {!edit && admin && <FormItem
          {...formItemLayout}
          label="用户类型"
        >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: '必须选择用户类型' },
            ]
          })(
            <Select placeholder="请选择用户类型">
              <Option value="1">系统用户</Option>
              <Option value="2">空间用户</Option>
              <Option value="3">外部用户</Option>
            </Select>
          )}
        </FormItem>}
        <FormItem
          {...formItemLayout}
          label="Email"
          hasFeedback
        >
          {getFieldDecorator('email', {
            initialValue: user!.email,
            rules: [
              { required: true, message: 'Email必须填写' },
              { type: 'email', message: 'Email地址不正确' },
              { max: 100, message: '最多100个字符' },
            ],

          })(
            <Input placeholder='请输入Email' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('username', {
            initialValue: user!.username,
            rules: [{
              required: true, message: '用户名不能为空'
            }, {
              max: 20, message: '输入字符不能超过20个'
            }, {
              pattern: /[A-Za-z\d\_]/g, message: "由大小写字母数字和字符'_'组成"
            }],
          })(
            <Input placeholder='请输入用户名' disabled={edit} />
          )}
        </FormItem>
        {!edit && <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            initialValue: 'PASS1234',
            rules: [{
              required: true, message: '密码不能为空'
            }, {
              max: 20, message: '密码字符长度不能超过20'
            }, {
              validator: (r: any, v: any, c: any) => {
                const qr = getFieldValue('qr');
                this.checkPassword(r, v, c, form, qr);
              }
            }],
          })(
            <Input type="text" name="pass" placeholder='请输入密码' />
          )}
        </FormItem>}
        <FormItem
          {...formItemLayout}
          label="真实姓名"
          hasFeedback
        >
          {getFieldDecorator('realname', {
            initialValue: user!.realname,
            validateFirst: true,
            rules: [
              { max: 20, message: '最多20个字符' },
              { pattern: /^((?! ).)*$/g, message: '不能有空格' },
            ],
          })(
            <Input placeholder='请输入真实姓名' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注"
          hasFeedback
        >
          {getFieldDecorator('comment', {
            initialValue: user!.comment,
            rules: [{ max: 30, message: '最多30个字符' },]
          })(
            <Input type='textarea' placeholder='请填写备注' />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default UserForm;
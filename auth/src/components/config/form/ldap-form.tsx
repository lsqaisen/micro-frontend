import { PureComponent } from 'react';
import { Form, Input, InputNumber, Select, Radio, Col, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { setSmtpRequest } from '@/services/config';
import styles from './style/index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export interface SmtpFromProps extends FormComponentProps {
  loading?: boolean;
  ldap: { [key: string]: any };
  formItemLayout?: any;
  onTest: () => any;
  onSubmit: (ldap: setSmtpRequest) => any;
}

@(Form.create() as any)
class SmtpForm extends PureComponent<SmtpFromProps, any> {
  static readonly defaultProps: SmtpFromProps = {
    form: new Object(null) as WrappedFormUtils,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    ldap: new Object(null) as setSmtpRequest,
    onTest: () => null,
    onSubmit: () => null,
  };


  reset = () => {
    this.setState({ disabled: false, loading: false });
    const { form: { resetFields } } = this.props;
    resetFields();
  }

  submit = () => {
    const { onSubmit, form: { validateFields } } = this.props;
    validateFields(async (error, value) => {
      if (!error) {
        this.setState({ disabled: true, loading: true });
        try {
          await onSubmit({ ...value, ldap_enable: true });
          this.reset();
        } catch (error) {
          Modal.error({
            title: '设置LDAP失败',
            content: error,
          })
          this.setState({ disabled: false, loading: false })
        }
      }
    })
  }
  render() {
    const { ldap, formItemLayout, form } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue } = form;
    const { ldap_enable, ldap_url, ldap_search_dn, ldap_search_password, ldap_base_dn, ldap_type, ldap_scope, ldap_filter, ldap_uid, ldap_timeout } = ldap;
    const _data = getFieldsValue() || {};
    const password = _data.ldap_search_password;
    delete _data.ldap_type;
    delete _data.ldap_search_password;
    const disabled = Object.keys(_data).every(key => (ldap || {})[key] === _data[key]) && !password;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="服务器URL">
          {getFieldDecorator('ldap_url', {
            initialValue: ldap_url,
            rules: [
              { required: true, message: '服务器URL必须填写' },
              { max: 60, message: '最大长度不超过60' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="服务器URL" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="搜索账号DN">
          {getFieldDecorator('ldap_search_dn', {
            initialValue: ldap_search_dn,
            rules: [
              { required: true, message: '搜索账号必须填写' },
              { max: 60, message: '最大长度不超过60' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="搜索账号DN" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="搜索账号密码">
          {getFieldDecorator('ldap_search_password', {
            initialValue: ldap_search_password,
            rules: [
              { required: true, message: '账号密码必须填写' },
              { max: 60, message: '最大长度不超过60' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="搜索账号密码" type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="BaseDN">
          {getFieldDecorator('ldap_base_dn', {
            initialValue: ldap_base_dn,
            rules: [
              { required: true, message: 'BaseDN必须填写' },
              { max: 60, message: '最大长度不超过60' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="BaseDN" size={'large'} />
          )}
        </FormItem>
        {/* 新增*/}
        <FormItem
          {...formItemLayout}
          label="服务器类型">
          {getFieldDecorator('ldap_type', {
            initialValue: ldap_type || (ldap_scope === 3 ? 'OpenLDAP' : 'WindowsAD')
          })(
            <Select
              disabled={!ldap_enable}
              placeholder="选择服务器类型"
              style={{ width: '100%' }}
              onChange={(v) => {
                setFieldsValue({ ldap_scope: 1 })
              }}
            >
              <Option key='WindowsAD'>WindowsAD</Option>
              <Option key='OpenLDAP'>OpenLDAP</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="搜索范围">
          {getFieldDecorator('ldap_scope', {
            initialValue: ldap_scope
          })(
            <RadioGroup disabled={!ldap_enable} onChange={() => { }}>
              <Radio value={1}>搜索本级目录</Radio>
              <Radio value={2}>{getFieldValue('ldap_type') === "OpenLDAP" ? "搜索当前目录和下级目录" : "搜索整个目录树"}</Radio>
              {getFieldValue('ldap_type') === "OpenLDAP" ? <Radio value={3}>搜索整个目录树</Radio> : null}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="过滤器">
          {getFieldDecorator('ldap_filter', {
            initialValue: ldap_filter,
            rules: [
              { required: true, message: '过滤器必须填写' },
              { max: 90, message: '最大长度不超过90' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="过滤器" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="UID字段">
          {getFieldDecorator('ldap_uid', {
            initialValue: ldap_uid,
            rules: [
              { required: true, message: 'UID字段必须填写' },
              { max: 60, message: '最大长度不超过60' }
            ],
          })(
            <Input disabled={!ldap_enable} placeholder="UID字段" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="连接超时">
          {getFieldDecorator('ldap_timeout', {
            initialValue: ldap_timeout,
            rules: [{ required: true, message: '连接超时时间必须填写' }],
          })(
            <InputNumber
              disabled={!ldap_enable}
              placeholder="连接超时时间"
              min={1}
              max={120}
              style={{ width: '120px' }}
            />
          )}
        </FormItem>
        <FormItem wrapperCol={{ xs: { span: 24, offset: 0 }, md: { span: 19, offset: 5 } }} >
          <Button disabled={disabled} type="primary" style={{ marginRight: 16 }} onClick={this.submit}>提交</Button>
          <Button disabled={disabled} onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default SmtpForm;
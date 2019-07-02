import { PureComponent, Fragment } from 'react';
import { Form, Button, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SetQuota from '../../tenant/form/set-tenant-quota-form';
import ResetBtn from './reset-quota';

const FormItem = Form.Item;

export interface SetQuotaFormProps {
  setting?: boolean;
  loading?: boolean;
  set?: boolean;
  data?: any;
  formItemLayout?: any;
  reset: () => void;
  submit: (values: any) => void;
}

@(Form.create() as any)
class SetQuotaForm extends PureComponent<FormComponentProps & SetQuotaFormProps, any> {
  static readonly defaultProps = {
    data: {},
    form: {},
    formItemLayout: {
      labelCol: { xs: 24, md: 7 },
      wrapperCol: { xs: 24, md: 17 },
    },
  };

  setquota: any = undefined;

  reset = () => {
    const { form: { resetFields } } = this.props;
    resetFields();
    this.setquota.resetFields();
  }

  submit = () => {
    const { submit, form: { validateFields } } = this.props;
    validateFields(async (error, values) => {
      if (!error) {
        let r: any = {};
        Object.entries(values.quota).forEach(([key, value]) => r[key] = `${value}`)
        submit(r);
      }
    })
  }

  componentWillReceiveProps({ data }: SetQuotaFormProps) {
    if (JSON.stringify(this.props.data || {}) !== JSON.stringify(data)) {
      this.props.form.setFieldsValue({ quota: data });
      this.setquota.setFieldsValue(data);
    }
  }

  render() {
    const { loading, setting, set, data, reset, form: { getFieldsValue, getFieldDecorator } } = this.props;
    const _data = (getFieldsValue() || {}).quota || {};
    const disabled = Object.keys(_data).every(key => (data || {})[key] === _data[key]);
    return (
      <Fragment>
        <Spin spinning={loading}>
          <FormItem style={{ marginBottom: 0 }} help="" validateStatus="success">
            {getFieldDecorator('quota', {
              initialValue: data,
              valuePropName: 'data',
              rules: [],
            })(
              <SetQuota wrappedComponentRef={(ref: any) => ref && ref.props && (this.setquota = ref.props.form)} />
            )}
          </FormItem>
        </Spin>
        <FormItem wrapperCol={{ xs: { span: 24, offset: 0 }, md: { span: 17, offset: 7 } }}>
          <Button disabled={disabled} type="primary" style={{ marginRight: 16 }} onClick={this.submit} loading={setting}>提交</Button>
          <Button disabled={disabled} style={{ marginRight: 16 }} onClick={this.reset}>重置</Button>
          <ResetBtn
            btn={<Button type="danger" ghost disabled={!set} style={{ marginRight: 16 }} >取消资源限制</Button>}
            reset={reset}
            resetCallback={this.reset}
          />
        </FormItem>
      </Fragment>
    )
  }
}

export default SetQuotaForm;
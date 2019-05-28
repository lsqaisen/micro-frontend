import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import formInput, { FormInputItem } from '@/components/global/forminput'
import BasicForm from './add-basic';
// import PortsForm from './add-ports';
// import ContainersForm from './add-containers';
import { createAppRequest } from '@/services/app';


export interface AddAppFormProps extends FormComponentProps {
  data?: createAppRequest;
  type?: 'create' | 'update' | 'edit';
}

@(Form.create({ name: 'app' }) as any)
class AddAppForm extends PureComponent<AddAppFormProps, any> {
  static readonly defaultProps = {
    form: {},
    data: {} as createAppRequest,
    type: 'create',
  };

  render() {
    const { type, data, form } = this.props;
    const { getFieldError, getFieldDecorator } = form;
    return (
      <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
        <FormInputItem
          required
          validateStatus={getFieldError('basic') ? 'error' : 'success'}
          help={getFieldError('basic') ? '基础信息未填写完整' : ''}
        >
          <BasicForm
            getFieldDecoratorID="basic"
            getFieldDecoratorOptions={{
              initialValue: data,
            }}
            p_form={form}
            error={!!getFieldError('basic')}
            type={type}
            formItemLayout={{
              labelCol: { xs: 24, md: 5 },
              wrapperCol: { xs: 24, md: 19 },
            }}
          />
        </FormInputItem>
        {/* <FormInputItem>
          {getFieldDecorator('service', {
            initialValue: (data!.service || {}).ports || [],
            rules: [],
          })(
            <PortsForm type={type} />
          )}
        </FormInputItem> */}
        {/* <ContainersForm data={data} /> */}
      </Form>
    )
  }
}

export default AddAppForm;
import * as React from 'react';
import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormInputItem } from '@/components/global/forminput'
import BasicForm from './add-basic';
import PortsForm from './add-ports';
import ContainersForm from './add-containers';
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
    const { getFieldDecorator } = form;
    return (
      <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
        <FormInputItem required>
          {getFieldDecorator('basic', {
            initialValue: data,
            rules: [],
          })(
            <BasicForm type={type} />
          )}
        </FormInputItem>
        <FormInputItem>
          {getFieldDecorator('service', {
            initialValue: data!.service,
            rules: [],
          })(
            <PortsForm type={type} />
          )}
        </FormInputItem>
        <FormInputItem>
          {getFieldDecorator('containers', {
            initialValue: data!.containers,
            rules: [],
          })(
            <ContainersForm type={type} />
          )}
        </FormInputItem>
      </Form>
    )
  }
}

export default AddAppForm;
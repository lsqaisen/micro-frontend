import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormInputItem } from '@/components/global/forminput';
import { Port } from '@/services/app';
import { FormComponentProps } from 'antd/lib/form';
import ContainersInput from './input/containers-input';


export interface AddAppPortsFormProps extends FormComponentProps {
  formItemLayout?: any;
  data?: Port[];
}

@(Form.create() as any)
class AddAppPortsForm extends PureComponent<AddAppPortsFormProps, any> {
  static readonly defaultProps = {
    form: {},
    data: [],
  };
  render() {
    const { data, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormInputItem required>
          {getFieldDecorator('containers', {
            initialValue: data,
            rules: []
          })(
            <ContainersInput />
          )}
        </FormInputItem>
      </Form>
    )
  }
}

export default AddAppPortsForm;
import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import PortsInput, { PortsInputProps } from './input/ports-input';

const FormItem = Form.Item;

export interface AddAppPortsFormProps extends FormComponentProps, PortsInputProps {
  formItemLayout?: any;
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
        <FormItem
          required>
          {getFieldDecorator('ports', {
            initialValue: data,
            validateFirst: true,
            rules: []
          })(
            <PortsInput />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddAppPortsForm;
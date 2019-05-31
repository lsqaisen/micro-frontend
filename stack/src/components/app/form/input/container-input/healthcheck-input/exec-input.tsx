import { PureComponent } from 'react';
import { Form, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';

const FormItem = Form.Item;

export type ExecInputProps = FormInputProps<{ command: string }>

@(FormInput({ name: 'exec' }) as any)
class ExecInput extends PureComponent<ExecInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {},
    onChange: () => null,
  }

  render() {
    const { value, form } = this.props;
    const { command } = value!;
    const { getFieldDecorator } = form;
    return (
      <FormItem>
        {getFieldDecorator('command', {
          initialValue: command,
          rules: [{ required: true, message: '环境变量名必须填写' }],
        })(
          <Input placeholder="检测命令" />
        )}
      </FormItem>
    )
  }
}

export default ExecInput;
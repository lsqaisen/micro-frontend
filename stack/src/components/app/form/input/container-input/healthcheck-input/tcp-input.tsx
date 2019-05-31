import { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';

const FormItem = Form.Item;

export type TcpInputProps = FormInputProps<any>

@(FormInput({ name: 'tcp' }) as any)
class TcpInput extends PureComponent<TcpInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {},
    onChange: () => null,
  }

  render() {
    const { value, form } = this.props;
    console.log(value)
    const { port } = value!;
    const { getFieldDecorator } = form;
    return (
      <FormItem>
        {getFieldDecorator('port', {
          initialValue: port,
          rules: [{ required: true, message: '监听端口不能为空！' }],
        })(
          <InputNumber
            placeholder="监听端口"
            style={{ width: '180px' }}
            min={1}
            max={65535}
            step={1}
            // parser={value => {
            //   if (parseInt(value || '0', 10) > 65535) {
            //     return 65535;
            //   } else if (parseInt(value || '0', 10) < 1) {
            //     return 1;
            //   }
            //   return parseInt(value || "0", 10);
            // }}
          />
        )}
      </FormItem>
    )
  }
}

export default TcpInput;
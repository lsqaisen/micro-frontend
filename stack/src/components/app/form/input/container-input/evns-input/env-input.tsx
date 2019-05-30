import { PureComponent } from 'react';
import { Form, Row, Col, Select, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import { Env } from '@/services/app';

const Option = Select.Option;
const FormItem = Form.Item;

export type EnvInputProps = FormInputProps<Env>

@(FormInput({ name: 'evn' }) as any)
class EnvInput extends PureComponent<EnvInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
  }

  render() {
    const { value, form } = this.props;
    const { name, value: _value } = value!;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={10}>
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{ required: true, message: '环境变量名必须填写' }],
            })(
              <Input placeholder='请输入环境变量名' />
            )}
          </FormItem>
        </Col>
        <Col span={1}><p className="ant-form-split">:</p></Col>
        <Col span={13}>
          <FormItem>
            {getFieldDecorator('value', {
              initialValue: _value,
            })(
              <Input placeholder="请输入环境变量值" />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
}

export default EnvInput;
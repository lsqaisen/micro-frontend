import { PureComponent } from 'react';
import { Form, Row, Col, InputNumber } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import { Container } from '@/services/apps';

const FormItem = Form.Item;

export interface PercentInputProps extends FormInputProps<Container> {
  name?: string;
  others?: Container[];
}

@(FormInput({ name: 'p' }) as any)
class PercentInput extends PureComponent<PercentInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    others: [],
  }

  UNSAFE_componentWillReceiveProps({ value, others, form }: PercentInputProps) {
    if (!!value!.cpuPercent &&
      this.props.value!.cpuPercent === value!.cpuPercent &&
      form.getFieldError('cpuPercent') &&
      others!.every(v => v.cpuPercent !== value!.cpuPercent)) {
      form.setFields({ cpuPercent: { value: value!.cpuPercent, errors: undefined } })
    }
    if (!!value!.memPercent &&
      this.props.value!.memPercent === value!.memPercent &&
      form.getFieldError('memPercent') &&
      others!.every(v => v.memPercent !== value!.memPercent)) {
      form.setFields({ memPercent: { value: value!.memPercent, errors: undefined } })
    }
  }

  render() {
    const { name, value, others, form } = this.props;
    const { cpuPercent, memPercent } = value!;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={8}>
          {name ? <p>{name}</p> : <p style={{ color: "#f04134" }}>未设置</p>}
        </Col>
        <Col span={8}>
          <FormItem>
            {getFieldDecorator('cpuPercent', {
              initialValue: cpuPercent,
              validateFirst: true,
              rules: [{
                required: true, message: "必须设置"
              }, {
                validator: (rule, value, callback) => {
                  let total = value || 0;
                  others!.forEach(v => {
                    total += (v.cpuPercent || 0);
                  })
                  if (total > 100) {
                    callback('总配比超出100');
                  } else if (total < 100) {
                    callback('总配比小于100');
                  }
                  callback();
                }
              }],
            })(
              <InputNumber style={{ width: '100%' }} placeholder="CPU配比" min={1} max={100} />
            )}
          </FormItem>
        </Col>
        <Col span={8} >
          <FormItem>
            {getFieldDecorator('memPercent', {
              initialValue: memPercent,
              validateFirst: true,
              rules: [{
                required: true, message: "必须设置"
              }, {
                validator: (rule, value, callback) => {
                  let total = value || 0;
                  console.log(others)
                  others!.forEach(v => {
                    total += (v.memPercent || 0);
                  })
                  if (total > 100) {
                    callback('总配比超出100');
                  } else if (total < 100) {
                    callback('总配比小于100');
                  }
                  callback();
                }
              }],
            })(
              <InputNumber style={{ width: '100%' }} placeholder="内存配比" min={1} max={100} />
            )}
          </FormItem>
        </Col>
      </Row >
    )
  }
}

export default PercentInput;
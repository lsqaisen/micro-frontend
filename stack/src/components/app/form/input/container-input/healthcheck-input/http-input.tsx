import { PureComponent } from 'react';
import { Form, Row, Col, Input, InputNumber } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';

const FormItem = Form.Item;

export type HttpInputProps = FormInputProps<{ host: string, port: number, path: string }>

@(FormInput({ name: 'http' }) as any)
class HttpInput extends PureComponent<HttpInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {},
    onChange: () => null,
  }

  render() {
    const { value, form } = this.props;
    const { host, port, path } = value!;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={8}>
          <FormItem>
            {getFieldDecorator('host', {
              initialValue: host,
              rules: [{
                validator: (rule, value, callback) => {
                  if (!`${host}${port}${value}`) {
                    callback('域、端口、路径选一项')
                  }
                  callback()
                }
              }],
            })(
              <Input placeholder="访问域名" />
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem>
            {getFieldDecorator('port', {
              initialValue: port,
              rules: [{
                validator: (rule, value, callback) => {
                  if (!`${host}${port}${value}`) {
                    callback('域、端口、路径选一项')
                  }
                  callback()
                }
              }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="监听端口"
                min={1}
                max={65535}
                step={1}
                parser={value => {
                  if (parseInt(value || '0', 10) > 65535) {
                    return 65535;
                  } else if (parseInt(value || '0', 10) < 1) {
                    return 1;
                  }
                  return parseInt(value || "0", 10);
                }}
              />
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem>
            {getFieldDecorator('path', {
              initialValue: path,
              rules: [{
                validator: (rule, value, callback) => {
                  if (!`${host}${port}${value}`) {
                    callback('域、端口、路径选一项')
                  }
                  callback()
                }
              }],
            })(
              <Input placeholder="路径，必须以‘/’开头" />
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
}

export default HttpInput;
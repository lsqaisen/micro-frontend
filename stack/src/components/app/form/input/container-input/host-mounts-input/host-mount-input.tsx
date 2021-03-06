import { PureComponent } from 'react';
import { Form, Row, Col, Radio, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import { HostMount } from '@/services/apps';

const FormItem = Form.Item;

export interface HostMountInputProps extends FormInputProps<HostMount> {
  others: HostMount[];
}

class ReadOnlyRadio extends PureComponent<any, any> {
  render() {
    const { onChange, ...props } = this.props;
    return (
      <Radio {...props} onClick={() => onChange(!props.checked)}>只读</Radio>
    )
  }
}

@(FormInput({ name: 'port' }) as any)
class HostMountInput extends PureComponent<HostMountInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    list: [],
  }

  UNSAFE_componentWillReceiveProps({ value, others, form }: HostMountInputProps) {
    if (!!value!.mountPath &&
      this.props.value!.mountPath === value!.mountPath &&
      form.getFieldError('mountPath') &&
      others.every(mount => mount.mountPath !== value!.mountPath)) {
      form.setFields({ mountPath: { value: value!.mountPath, errors: undefined } })
    }
  }

  render() {
    const { others, value, form } = this.props;
    const { readOnly, mountPath } = value!;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={19}>
          <FormItem>
            {getFieldDecorator('mountPath', {
              initialValue: mountPath,
              rules: [{
                required: true, message: '挂载路径不能为空'
              }, {
                validator: (_, value, callback) => {
                  if (others.some(mount => !!value && mount.mountPath === value)) {
                    callback('存在相同的挂载路径')
                  }
                  callback()
                }
              }],
            })(
              <Input placeholder="挂载路径" />
            )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('readOnly', {
              initialValue: readOnly,
              valuePropName: 'checked',
            })(
              <ReadOnlyRadio>只读</ReadOnlyRadio>
            )}
          </FormItem>
        </Col>
      </Row>
    )
  }
}

export default HostMountInput;
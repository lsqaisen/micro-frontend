import { PureComponent } from 'react';
import { Form, Row, Col, Select, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import { Mount } from '@/services/app';

const Option = Select.Option;
const FormItem = Form.Item;

export type PortInputProps = FormInputProps<Mount>

@(FormInput({ name: 'port' }) as any)
class PortInput extends PureComponent<PortInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {
      protocol: 'TCP',
      servicePort: undefined,
      containerPort: undefined,
    } as any,
  }

  render() {
    const { value, form } = this.props;
    const { name, key, mountPath, path } = value!;
    const { getFieldDecorator } = form;
    return (

      <Row gutter={8}>
        <Col span="5">
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: name,
            })(
              <Input readOnly placeholder="配置名称" />
            )}
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem>
            {getFieldDecorator('key', {
              initialValue: key,
            })(
              <Input readOnly placeholder="配置选项" />
            )}
          </FormItem>
        </Col>
        <Col span="1"><p className="ant-form-split">{`>`}</p></Col>
        <Col span="7">
          <FormItem>
            {getFieldDecorator('mountPath', {
              initialValue: mountPath,
              rules: [{
                required: true, message: '不能为空'
              }, {
                pattern: /(\/([0-9a-zA-Z]+))+/, message: '挂载路径格式有误'
              }],
            })(
              <Input placeholder="挂载路径" />
            )}
          </FormItem>
        </Col>
        <Col span="1"><p className="ant-form-split">{`/`}</p></Col>
        <Col span="5">
          <FormItem>
            {getFieldDecorator('path', {
              initialValue: path,
            })(
              <Input placeholder="文件名称" />
            )}
          </FormItem>
        </Col>
      </Row >
    )
  }
}

export default PortInput;
import { PureComponent } from 'react';
import { Form, Row, Col, Select, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Mount } from '@/services/app';

const Option = Select.Option;
const FormItem = Form.Item;

export type SecretMountInputProps = FormInputProps<Mount>

@(FormInput({ name: 'port' }) as any)
class SecretMountInput extends PureComponent<SecretMountInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
  }

  render() {
    const { value, form } = this.props;
    const { name, key, mountPath, path } = value!;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{ required: true, message: "必须选择" }],
            })(
              <SearchSelect
                placeholder="证书名称"
                style={{ width: '100%' }}
                onSearch={() => {
                  return new Promise(async (resolve, reject) => {
                    resolve({
                      data: [{
                        key: '34345',
                        label: '345345345'
                      }],
                      params: undefined,
                    })
                  })
                }}
              />
            )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('key', {
              initialValue: key,
              rules: [{ required: true, message: "必须选择" }],
            })(
              <Select placeholder="证书选项">
                <Option key="test">test</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={1}><p className="ant-form-split">{`>`}</p></Col>
        <Col span={7}>
          <FormItem>
            {getFieldDecorator('mountPath', {
              initialValue: mountPath,
              rules: [{
                required: true, message: '不能为空'
              }, {
                pattern: /(\/([0-9a-zA-Z]+))+/, message: '路径格式有误'
              }],
            })(
              <Input placeholder="挂载路径" />
            )}
          </FormItem>
        </Col>
        <Col span={1}><p className="ant-form-split">{`/`}</p></Col>
        <Col span={5}>
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

export default SecretMountInput;
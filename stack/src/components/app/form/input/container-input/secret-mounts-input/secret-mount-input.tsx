import { PureComponent } from 'react';
import { Form, Row, Col, Select, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Mount } from '@/services/apps';
import { getSecretsRequest } from '@/services/secret';

const Option = Select.Option;
const FormItem = Form.Item;

export interface SecretSearchHandles {
  onSecretSearch: (search: getSecretsRequest) => any;
}

export interface SecretMountInputProps extends FormInputProps<Mount>, SecretSearchHandles { }

@(FormInput({ name: 'port' }) as any)
class SecretMountInput extends PureComponent<SecretMountInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
  }

  state = {
    keys: [],
  }

  render() {
    const { value, form, onSecretSearch } = this.props;
    const { name, key, mountPath, path } = value!;
    const { getFieldDecorator } = form;
    const { keys } = this.state;
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
                onChange={(value: any) => {
                  this.setState({ keys: Object.values(JSON.parse(value))[0] });
                  form.setFieldsValue({ name: Object.keys(JSON.parse(value))[0] });
                }}
                onSearch={(params: any = {}) => {
                  const { page = 1, itemsPerPage = 10 }: any = params;
                  let request: getSecretsRequest = { page, itemsPerPage };
                  return new Promise(async (resolve, reject) => {
                    let { data, total }: any = await onSecretSearch!(request);
                    resolve({
                      data: data.map((secret: any) => ({
                        key: JSON.stringify({ [`${secret.name}`]: secret.keys }),
                        label: `${secret.name}`
                      })),
                      params: total <= itemsPerPage * page ? null : {
                        page: page + 1,
                        itemsPerPage,
                      }
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
                {keys.map(v => (
                  <Option key={v}>{v}</Option>
                ))}
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
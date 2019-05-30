import { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';

const FormItem = Form.Item;

export type ImageInputProps = FormInputProps<string>

@(FormInput({
  name: 'image',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(`${allValues.image_name || ''}:${allValues.image_tag || ''}`)
  }
}) as any)
export default class extends PureComponent<any, any> {
  static readonly defaultProps = {
    form: {} as any,
  }

  render() {
    const { value, form } = this.props;
    const [image, tag] = (value || ':').split(':');
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={16}>
          <FormItem>
            {getFieldDecorator('image_name', {
              initialValue: image || undefined,
              rules: [{ required: true, message: '镜像名称必须选择' }],
            })(
              <SearchSelect
                placeholder="选择镜像名称"
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
        <Col span={8}>
          <FormItem>
            {getFieldDecorator('image_tag', {
              initialValue: tag || undefined,
              rules: [{ required: true, message: '镜像tag必须选择' }],
            })(
              <SearchSelect
                placeholder="请选择tag"
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
      </Row >
    )
  }
}
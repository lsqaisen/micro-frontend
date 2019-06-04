import { PureComponent } from 'react';
import { Form, Row, Col, Input, Button, Icon, Tooltip } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { getImagesRequest } from '@/services/registry';

const FormItem = Form.Item;

export interface ImageSearchHandles {
  onImageSearch: (search: getImagesRequest) => any;
  onImageTagSearch: (search: string) => any;
}

export interface ImageInputProps extends FormInputProps<string>, ImageSearchHandles { }

@(FormInput({
  name: 'image',
  onValuesChange: ({ onChange }, _, allValues) => {
    if (!!allValues.image) {
      onChange(allValues.image);
    } else {
      if (!allValues.image_name && !allValues.image_tag) return onChange();
      else onChange(`${allValues.image_name || ''}:${allValues.image_tag || ''}`);
    }
  }
}) as any)
export default class extends PureComponent<ImageInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    onChange: () => null,
    onImageSearch: () => null,
    onImageTagSearch: () => null,
  }

  state = {
    type: 'select',
  }

  render() {
    const { value, form, onImageSearch, onImageTagSearch } = this.props;
    const [image, tag] = (value || ':').split(':');
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <Row gutter={8}>
        <Col style={{ width: 'calc(100% - 42px)', float: "left" }}>
          {type === 'select' ? <Row gutter={8}>
            <Col span={16}>
              <FormItem>
                {getFieldDecorator('image_name', {
                  initialValue: image || undefined,
                  rules: [{ required: true, message: '镜像名称必须选择' }],
                })(
                  <SearchSelect
                    placeholder="选择镜像名称"
                    onChange={() => {
                      form.setFieldsValue({ image_tag: undefined })
                    }}
                    onSearch={(params: any = {}) => {
                      const { page = 1, pageSize = 10, ...p }: any = params;
                      let request: getImagesRequest = { page, pageSize, ...p };
                      return new Promise(async (resolve, reject) => {
                        let { data, total }: any = await onImageSearch!(request);
                        resolve({
                          data: data.map((image: any) => ({
                            key: `${image.domain}/${image.repository_name}`,
                            label: `${image.domain}/${image.repository_name}`
                          })),
                          params: total <= pageSize * page ? null : {
                            page: page + 1,
                            pageSize,
                          }
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
                    onSearch={(params: any = {}) => {
                      return new Promise(async (resolve, reject) => {
                        if (!image) reject();
                        let response: any[] = await onImageTagSearch!((image || '').split('\/').slice(1).join('/'));
                        resolve({
                          data: response.map((v: any) => ({
                            key: `${v.tag}`,
                            label: `${v.tag}`
                          })),
                          params: null
                        })
                      })
                    }}
                  />
                )}
              </FormItem>
            </Col>
          </Row> : <Row>
              <FormItem>
                {getFieldDecorator('image', {
                  initialValue: value || undefined,
                  rules: [{
                    required: true, message: '镜像不能为空！'
                  }],
                })(
                  <Input placeholder="请输入镜像" />
                )}
              </FormItem>
            </Row>}
        </Col>
        <Col style={{ width: 34, float: "left" }}>
          <Tooltip title="手动输入">
            <Button
              icon="edit"
              onClick={() => {
                form.setFieldsValue({ image: undefined, image_name: undefined, image_tag: undefined })
                this.setState({ type: type === 'select' ? 'edit' : 'select' })
              }}
            />
          </Tooltip>
        </Col>
      </Row >
    )
  }
}
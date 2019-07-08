import { PureComponent } from 'react';
import { Form, Alert, Col, Input, Button, Typography } from 'antd';
import { FormProps, WrappedFormUtils } from 'antd/lib/form/Form';
import { SearchSelect } from 'library';
import styles from '../style/index.less';

const FormItem = Form.Item;

export interface FileInputProps extends FormProps {
  admin: boolean;
  namespace: string;
  value?: any;
  formItemLayout?: any;
  searchProjects: (params: any) => any;
}

@(Form.create() as any)
export default class extends PureComponent<FileInputProps, any> {
  static readonly defaultProps = {
    form: {} as WrappedFormUtils,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    searchProjects: () => null,
  }

  state = {
    target: '',
    image: undefined,
  }

  render() {
    const { admin, namespace, form, formItemLayout, searchProjects } = this.props;
    const { getFieldDecorator } = form || {} as WrappedFormUtils;
    const { target, image } = this.state;
    return (
      <div>
        <FormItem style={{ marginBottom: 0 }}>
          <Alert style={{ fontSize: '14px' }} message="已打包好镜像文件可忽略以下打包压缩镜像步骤" type="info" showIcon />
        </FormItem>
        <FormItem style={{ marginBottom: 0 }}>
          <div className={styles.item_step}>
            <h3 className={styles.h3}>通过下面命令可以将镜像打包成tar格式的文件</h3>
            <div className={styles.ekos_code}>
              <pre>
                <Typography.Paragraph style={{ margin: 0 }} copyable>{`docker save <镜像名:tag> -o <镜像名>.tar`}</Typography.Paragraph>
              </pre>
            </div>
          </div>
        </FormItem>
        <div className={styles.item_step}>
          <Col>
            <h3 className={styles.h3}>填写镜像名称，选择镜像文件，点击提交按钮上传镜像文件</h3>
          </Col>
          <FormItem
            key="namespace"
            style={{ display: 'none' }}
            {...formItemLayout}
            label="镜像名称">
            {getFieldDecorator(`namespace`, {
              initialValue: admin ? target : namespace,
            })(
              <Input name="namespace" type="text" />
            )}
          </FormItem>
          {admin ? [
            <FormItem key="xxxx" {...formItemLayout} label="仓库名称">
              <SearchSelect
                placeholder="请选择仓库"
                asyncSearch={async (page, callback) => {
                  let { list, total }: any = await searchProjects!({ page: page + 1 });
                  const res = {
                    total,
                    results: list.map((v: any) => ({
                      key: v.name,
                      label: (
                        <Typography>
                          <Typography.Text>{`${v.name}${v.description ? `(${v.description})` : ''}`}</Typography.Text>
                        </Typography>
                      )
                    })),
                  }
                  console.log(res)
                  // callback({
                  //   total,
                  //   results: [],
                  // });
                }}
                onChange={(v) => {
                  this.setState({
                    target: v,
                  });
                }}
              />
            </FormItem>,
          ] : null}
          <FormItem key="target" {...formItemLayout} label="镜像名称">
            {getFieldDecorator(`target`, {
              initialValue: '',
              rules: [{
                required: true, message: '不能为空'
              }, {
                validator: (rule, value, callback) => {
                  let pattern = /^[0-9a-z]{1,}[0-9a-z:-]*$/;
                  if (!!value) {
                    if (!pattern.test(value)) {
                      callback('由小写字母、数字和字符‘:’,‘-’组成，并且不能以‘:’,‘-’开头和结尾');
                    } else if (value.length > 20) {
                      callback('不能超过20个字符');
                    }
                  }
                  callback();
                }
              }
              ]
            })(
              <Input
                name="target"
                placeholder="镜像名称，tag不填默认为latest"
                {...(admin ? target ? { addonBefore: `${target}/` } : {} : { addonBefore: `${namespace}/` })}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="镜像文件">
            {getFieldDecorator(`image`, {
              initialValue: '',
              rules: [{
                required: true, message: 'image文件不能为空！'
              }, {
                validator: (r, v, callback) => {
                  let par = /(tar|tgz)$/;
                  if (!!v) {
                    if (!par.test(v)) {
                      callback('文件格式需要为tar或tgz');
                    }
                  }
                  callback();
                }
              }]
            })(
              <Input type='file' style={{ display: 'none' }} id='image' name='image'
                placeholder="名称"
                onChange={(v) => {
                  this.setState({
                    image: ((document.getElementById('image') as any).value).split('\\').slice(-1)[0]
                  });
                }} />
            )}
            <Col span='17'>
              <Input placeholder="选择所要上传的tar或tgz文件" type='text' value={`${image || ''}`} />
            </Col>
            <Col span='6' offset='1'>
              <Button style={{ width: '100%' }} type="ghost" icon="upload" onClick={() => {
                (document.getElementById('image') as any).click();
              }}>选择</Button>
            </Col>
          </FormItem>
        </div>
      </div>
    )
  }
}
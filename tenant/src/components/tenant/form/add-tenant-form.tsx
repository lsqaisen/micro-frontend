import { PureComponent } from 'react';
import { Form, Row, Col, Input, TreeSelect, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/global/search-select';
import CreateUser from '../add-user';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export interface TenantFromProps {
  formItemLayout?: any;
  userSearch?: () => any;
}

@(Form.create() as any)
class AddTenantForm extends PureComponent<FormComponentProps & TenantFromProps, any> {
  static readonly defaultProps = {
    form: {},
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    admin: false,
    onUserSearch: () => null,
  };

  render() {
    const { formItemLayout, form, userSearch } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const owner_id = getFieldValue("owner_id");
    return (
      <Form>
        <FormItem
          key="project_name"
          {...formItemLayout}
          label="空间名">
          {getFieldDecorator('project_name', {
            rules: [
              { required: true, message: '空间名称不能为空!' },
            ],
          })(
            <Input placeholder='请输入工作空间名称' />
          )}
        </FormItem>
        <FormItem
          key="owner_id"
          {...formItemLayout}
          label="管理员">
          <Row gutter={8}>
            <Col span={15}>
              {getFieldDecorator('owner_id', {
                rules: [{ required: true, message: '必须给工作空间设置管理员!' }],
              })(
                <SearchSelect
                  dropdownMatchSelectWidth={false}
                  placeholder="选择管理员"
                  onSearch={(params: any = {}) => {
                    return new Promise(async (resolve) => {
                      let response: any[] = await userSearch!();
                      resolve({
                        data: response.map((v: any) => ({
                          key: `${v.user_id}`,
                          label: (
                            <Typography>
                              <Typography.Text>{v.username}</Typography.Text>
                              <Typography.Text type="secondary">{`<${v.email}>`}</Typography.Text>
                            </Typography>
                          )
                        })),
                        params: null
                      })
                    })
                  }}
                />
              )}
            </Col>
            <Col span={9}>
              <CreateUser
              // data={users}
              // emailIsExist={emailIsExist}
              // onSubmit={async (v) => {
              //   try {
              //     const user = await createUser(v);
              //     this.setState({
              //       users: [user]
              //     }, () => setFieldsValue({ owner_id: user.key }));
              //   } catch (err) {

              //   }
              // }}
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          key="user_ids"
          {...formItemLayout}
          label="成员">
          {getFieldDecorator('user_ids')(
            <SearchSelect
              mode="multiple"
              placeholder="选择成员"
              onSearch={(params: any = {}) => {
                return new Promise(async (resolve) => {
                  let response: any[] = await userSearch!();
                  resolve({
                    data: response.map((v: any) => ({
                      key: `${v.user_id}`,
                      label: (
                        <Typography>
                          <Typography.Text>{v.username}</Typography.Text>
                          <Typography.Text type="secondary">{`<${v.email}>`}</Typography.Text>
                        </Typography>
                      )
                    })).filter((v: any) => `${v.key}` !== `${owner_id}`),
                    params: null
                  })
                })
              }}
            />
          )}
        </FormItem>
        <FormItem
          key="description"
          {...formItemLayout}
          label="备注">
          {getFieldDecorator('description', {
            rules: [{ max: 40, message: '最多40个字符!' }],
          })(
            <TextArea placeholder='请输入备注' />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddTenantForm;
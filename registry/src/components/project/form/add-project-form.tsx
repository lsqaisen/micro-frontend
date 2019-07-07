import { PureComponent } from 'react';
import { Form, Input, Typography, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { SearchSelect } from 'library';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export interface ProjectFromProps {
  formItemLayout?: any;
  userSearch?: () => any;
}

@(Form.create() as any)
class AddProjectForm extends PureComponent<FormComponentProps & ProjectFromProps, any> {
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
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator('type', {
            initialValue: 8,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          key="project_name"
          {...formItemLayout}
          label="仓库名称">
          {getFieldDecorator('project_name', {
            rules: [
              { required: true, message: '仓库名称不能为空!' },
            ],
          })(
            <Input placeholder='请输入工作仓库名称' />
          )}
        </FormItem>
        <FormItem
          key="owner_id"
          {...formItemLayout}
          label="管理员">
          {getFieldDecorator('owner_id', {
            rules: [{ required: true, message: '必须给工作仓库设置管理员!' }],
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
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公共仓库"
        >
          {getFieldDecorator('public', {
            valuePropName: "checked"
          })(
            <Checkbox>是</Checkbox>
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

export default AddProjectForm;
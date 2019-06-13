import { PureComponent } from 'react';
import { Form, Input, TreeSelect, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/global/search-select';
import { transition } from '@/components/privilege/table';
import { getUsersRequest } from '@/services/user';

const FormItem = Form.Item;

export interface GroupFromProps {
  admin: boolean;
  namespace: string;
  privilege: any[];
  formItemLayout?: any;
  onUserSearch?: () => any;
}

@(Form.create() as any)
class AddGroupForm extends PureComponent<FormComponentProps & GroupFromProps, any> {
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
    const { admin, namespace, privilege, formItemLayout, form, onUserSearch } = this.props;
    const { getFieldDecorator } = form;
    const tProps = {
      treeData: transition(privilege) as any,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      searchPlaceholder: '请选择角色权限',
      style: {
        width: '100%',
      },
      multiple: true,
      className: "tree_select",
    }
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="名称"
          className="group-name"
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '必须输入名称' },
              { pattern: /^[A-Za-z\d\_\.]+$/, message: "由大小写字母和数字和字符'_ .'组成" },
              { max: 25, transform: (value) => `${admin ? 'ekos:system:' : `ekos:${namespace}:`}${value}`, message: '最多25个字符' },
            ],
          })(
            <Input addonBefore={admin ? 'ekos:system:' : `ekos:${namespace}:`} placeholder='请输入角色名称' />
          )}
        </FormItem>
        <FormItem
          width="100%"
          {...formItemLayout}
          label="权限">
          {getFieldDecorator('privileges', {
            initialValue: []
          })(
            <TreeSelect {...tProps} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="成员">
          {getFieldDecorator('users', {
            initialValue: []
          })(
            <SearchSelect
              mode="tags"
              placeholder="选择成员"
              onSearch={(params: any = {}) => {
                return new Promise(async (resolve, reject) => {
                  let response: any[] = await onUserSearch!();
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
          className='bz'
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('description', {
            rules: [{ max: 500, message: '最多500个字符!' }],
          })(
            <Input type="textarea" placeholder='请输入角色描述' />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddGroupForm;
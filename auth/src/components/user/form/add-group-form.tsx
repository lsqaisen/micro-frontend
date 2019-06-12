import { PureComponent } from 'react';
import { Form, Input, Select, TreeSelect } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/global/search-select';

const FormItem = Form.Item;

export interface GroupFromProps {
  admin: boolean;
  namespace: string;
  privilege: any[];
  formItemLayout?: any;
}

@(Form.create() as any)
class AddGroupForm extends PureComponent<FormComponentProps & GroupFromProps & any, any> {
  static readonly defaultProps = {
    from: {},
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    admin: false,
  };
  checkName = (rule: any, value: any, callback: any) => {
    if (!!value) {
      if (value.length > 63) {
        callback('应用名称长度为1~63！');
      } else if (!/^[a-z0-9-]{1,}$/.test(value)) {
        callback(`应用名称由小写字母、数字和字符‘-’组成！`);
      } else if (/^\d/.test(value)) {
        callback(`开始字符不能是数字`);
      } else if (/^[-]/.test(value) || /[-]$/.test(value)) {
        callback('字符‘-’不能为开始和结束字符！');
      }
    }
    callback();
  }

  render() {
    const { admin, namespace, privilege, formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const tProps = {
      treeData: privilege,
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
              { validator: this.checkName }
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
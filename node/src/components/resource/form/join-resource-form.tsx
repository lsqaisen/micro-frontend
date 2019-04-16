import { PureComponent, Component } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SearchSelect from '@/components/search-select';
import { nodesRequest } from '@/services/node';

const FormItem = Form.Item;

export interface JosinResourceFormProps {
  resourceName?: string;
  formItemLayout?: any;
  searchNodes?: (data: nodesRequest) => any[];
}

@(Form.create() as any)
class AddResourceForm extends (PureComponent || Component)<JosinResourceFormProps & FormComponentProps, any> {
  static readonly defaultProps = {
    form: {},
    formItemLayout: {
      labelCol: { span: 5, },
      wrapperCol: { span: 19, },
    }
  };

  state = {
    disabled: false
  }

  checkName = (rule: any, value: any, callback: any) => {
    if (!!value) {
      if (value.length > 64) {
        callback('代号长度为1~64！');
      } else if (!/^[a-z0-9-]{1,}$/.test(value)) {
        callback(`代号由小写字母、数字和字符‘-’组成！`);
      } else if (/^\d/.test(value)) {
        callback(`开始字符不能是数字`);
      } else if (/^[-]/.test(value) || /[-]$/.test(value)) {
        callback('字符‘-’不能为开始和结束字符！');
      }
    }
    callback();
  }

  render() {
    const { resourceName, formItemLayout, searchNodes, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="资源池"
        >
          {getFieldDecorator('resource', {
            initialValue: resourceName,
            rules: [{ required: true, message: '资源池名称不能为空!' }],
          })(
            <Input placeholder="资源池名称" disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="节点">
          {getFieldDecorator('allocNode', {
            rules: [{ required: true, message: '请选择节点!' }],
          })(
            <SearchSelect
              mode="multiple"
              placeholder="请选择节点"
              style={{ width: '100%' }}
              onSearch={(params: any = {}) => {
                const { page = 1, itemsPerPage = 10 }: any = params;
                let request: nodesRequest = { page, itemsPerPage };
                return new Promise(async (resolve, reject) => {
                  let response: any[] = await searchNodes!(request);
                  resolve({
                    data: response.map(v => ({
                      key: v.name,
                      label: `${v.name}<${v.hostIPS[0].address}>`,
                    })),
                    params: undefined,
                  })
                })
              }}
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddResourceForm;
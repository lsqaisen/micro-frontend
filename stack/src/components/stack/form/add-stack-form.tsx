import { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const Option = Select.Option;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

@(Form.create() as any)
class AddClusterForm extends PureComponent<FormComponentProps & any, any> {
  static readonly defaultProps = {
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
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
    const { ippools = [], formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem
          label="应用名称"
          required
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '应用名称不能为空!' },
              { validator: this.checkName }
            ]
          })(
            <Input placeholder="应用名称" />
          )}
        </FormItem>
        <FormItem
          label="子网"
          required
          {...formItemLayout}
        >
          {getFieldDecorator('ippool', {
            initialValue: "none",
            rules: [{ required: true, message: '子网必须选择!' }]
          })(
            <Select>
              <Option key="none">默认</Option>
              {ippools.map((v: any) => (
                <Option key={v.cidr}>{v.cidr}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem
          label="应用描述"
          {...formItemLayout}
        >
          {getFieldDecorator('desc')(
            <TextArea autosize={{ minRows: 4, maxRows: 4 }} placeholder="请输入应用描述" />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddClusterForm;
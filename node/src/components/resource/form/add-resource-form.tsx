import { PureComponent, Component } from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

@(Form.create() as any)
class AddResourceForm extends PureComponent<FormComponentProps & any, any> {
  static readonly defaultProps = {
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
    const { formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const { disabled } = this.state;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="资源池名称"
          required
        >
          {getFieldDecorator(`tag`, {
            rules: [{ required: true, max: 64, message: '名称长度为1～64个字符' }],
          })(
            <Input disabled={disabled} placeholder="资源池名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="唯一代号"
          required
        >
          {getFieldDecorator(`name`, {
            rules: [
              { required: true, message: '名称不能为空!' },
              { validator: this.checkName }
            ],
          })(
            <Input disabled={disabled} placeholder="资源池代号不能为空！" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="资源池描述"
        >
          {getFieldDecorator(`desc`, {
            rules: [{ max: 256, message: '资源池描述不能超过256个字符' }],
          })(
            <TextArea disabled={disabled} autosize={{ minRows: 4, maxRows: 4 }} />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddResourceForm;
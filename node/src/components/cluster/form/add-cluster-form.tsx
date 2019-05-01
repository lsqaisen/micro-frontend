import { PureComponent, Component } from 'react';
import { Form, Input, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import VCenterInput from './input/vcenter-input';
import AliyunInput from './input/aliyun-input';

const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

@(Form.create() as any)
class AddClusterForm extends PureComponent<FormComponentProps & any, any> {
  static readonly defaultProps = {
    formItemLayout: {
      labelCol: { span: 3, },
      wrapperCol: { span: 21, },
    }
  };

  state = {
    type: 'vcenter'
  }

  checkName = (rule: any, value: any, callback: any) => {
    if (!!value) {
      if (value.length > 63) {
        callback('名称长度为1~63！');
      } else if (!/^[a-z0-9-]{1,}$/.test(value)) {
        callback(`名称由小写字母、数字和字符‘-’组成！`);
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
    const { type } = this.state;
    return (
      <Form>
        <FormItem
          label="名称"
          required
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '名称不能为空!' },
              { validator: this.checkName }
            ]
          })(
            <Input placeholder="名称" />
          )}
        </FormItem>
        <FormItem
          label="备注"
          {...formItemLayout}
        >
          {getFieldDecorator('desc')(
            <TextArea autosize={{ minRows: 4, maxRows: 4 }} placeholder="请输入备注" />
          )}
        </FormItem>
        <FormItem
          label="类型"
          required
          {...formItemLayout}
        >
          {getFieldDecorator('type', {
            initialValue: type,
            rules: [{ required: true, message: '必须选择集群类型!' }]
          })(
            <RadioGroup onChange={(v) => { this.setState({ type: v.target.value }) }}>
              <Radio value="vcenter">vcenter</Radio>
              <Radio value="aliyun">aliyun</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {type === 'vcenter' ?
          <FormItem
            {...formItemLayout}
            label="配置"
            validateStatus=""
            help=""
            required>
            {getFieldDecorator('vcenter', {
              rules: []
            })(
              <VCenterInput />
            )}
          </FormItem> : <FormItem
            {...formItemLayout}
            label="配置"
            validateStatus=""
            help=""
          >
            {getFieldDecorator('aliyun', {
              rules: [],
            })(
              <AliyunInput />
            )}
          </FormItem>}
      </Form>
    )
  }
}

export default AddClusterForm;
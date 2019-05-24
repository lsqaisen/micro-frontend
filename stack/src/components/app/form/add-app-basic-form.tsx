import { PureComponent } from 'react';
import { Form, Input, Radio, InputNumber, Switch } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import SchedulerInput from './input/scheduler-input';
import CpuMemInput from './input/cpu-mem-input';
import { createAppRequest } from '@/services/app';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

export interface AddAppBasicFormProps extends FormComponentProps {
  data?: createAppRequest;
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(Form.create() as any)
class AddAppBasicForm extends PureComponent<AddAppBasicFormProps, any> {
  static readonly defaultProps = {
    form: {},
    data: {} as createAppRequest,
    type: 'create',
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
  };

  render() {
    const { type, data, formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const {
      name,
      desc,
      stateful = "none",
      replicas = 1,
      cpu = 500,
      memory = 128,
      collectLog = true,
      scheduler,
    }: createAppRequest = data!;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="服务名称"
          required>
          {getFieldDecorator('name', {
            initialValue: name,
            validateFirst: true,
            rules: [
              { required: true, message: '服务名称必须填写！' },
              { max: 64, message: '名称字符长度不能超过64' },
              { pattern: /^[a-z0-9-]+$/, message: '名称由小写字母、数字和字符‘-’组成！' },
              { pattern: /^[a-z]/, message: '开始字符不能是数字或‘-’！' },
              { pattern: /[a-z0-9]$/, message: '结束字符不能是‘-’！' },
            ]
          })(
            <Input disabled={type === "update"} placeholder="请输入服务名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务描述">
          {getFieldDecorator('desc', {
            initialValue: desc,
            validateFirst: true,
            rules: [{ max: 500, message: '最多500个字符!' }]
          })(
            <TextArea autosize={{ minRows: 3, maxRows: 3 }} placeholder="描述信息" />
          )}
        </FormItem>
        <FormItem
          style={{ marginBottom: 0 }}
          {...formItemLayout}
          label="资源调度"
          required>
          {getFieldDecorator('scheduler', {
            initialValue: scheduler,
            rules: []
          })(
            <SchedulerInput />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务状态"
          required>
          {getFieldDecorator('stateful', {
            initialValue: stateful,
          })(
            <RadioGroup disabled={type === "update"}>
              <Radio value="none">无状态</Radio>
              <Radio value="share">共享磁盘</Radio>
              <Radio value="exclusive">不共享磁盘</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="副本数量">
          {getFieldDecorator('replicas', {
            initialValue: replicas,
            rules: [{ required: true, message: '副本数量不能为空!' }]
          })(
            <InputNumber
              style={{ width: 120 }}
              min={1}
              max={500}
              formatter={value => !!value ? `${parseInt(`${value}`, 10)}` || '' : ''}
            />
          )}
        </FormItem>
        <CpuMemInput
          formItemLayout={formItemLayout}
          form={this.props.form}
          value={{ cpu, memory }}
        />
        <FormItem
          {...formItemLayout}
          label="收集日志">
          {getFieldDecorator('collectLog', {
            initialValue: collectLog,
            valuePropName: 'checked',
          })(
            <Switch checkedChildren="开" unCheckedChildren="关" ></Switch>
          )}
        </FormItem>
      </Form>
    )
  }
}

export default AddAppBasicForm;
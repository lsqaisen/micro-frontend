import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Radio, Input, InputNumber, Switch } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import SchedulerInput, { SchedulerSearchHandles } from '../input/scheduler-input';
import CpuMemInput from '../input/cpu-mem-input';
import Description from '../description';
import { Basic } from '@/services/apps';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

export interface AddBasicProps extends SchedulerSearchHandles {
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(FormInput() as any)
class AddBasic extends PureComponent<FormInputProps<Basic> & AddBasicProps, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
  };

  state = {
    visible: false,
  }

  _onClose = (e: any) => {
    if (!!e) e.preventDefault();
    (this.props.form as any).validateFields(async (error: any, values: any) => {
      if (!error) {
        this.setState({
          visible: false,
        })
      }
    })
  }

  render() {
    const { type, value, formItemLayout, form, onNodeSearch, onResourceSearch } = this.props;
    const { getFieldDecorator, getFieldsError } = form;
    const { visible } = this.state;
    const {
      name,
      desc,
      stateful = "none",
      replicas = 1,
      cpu = 500,
      memory = 128,
      collectLog = true,
      scheduler = { type: 'none' },
    }: Basic = value! || {};
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    return (
      <FormInputItem
        className="box"
        style={{ marginBottom: 16, padding: 16, paddingTop: 0, border: errors ? '1px solid #ff5242' : '1px solid transparent' }}
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors ? '服务基本信息未填写完整' : ''}
      >
        <PageHeader
          style={{ padding: '16px 0', marginBottom: 8 }}
          title={<span style={{ color: errors ? "#ff5242" : "" }}>基础配置</span>}
          subTitle={<span style={{ color: errors ? "#ff5242" : "" }}>服务的基本配置信息</span>}
          footer={<div style={{ padding: `0 8px` }}>
            <Button style={{ width: '100%' }} type="dashed" onClick={() => {
              this.setState({ visible: true });
            }}>编辑</Button>
          </div>}
        >
          <Drawer
            title="基础配置"
            bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
            width={582}
            placement="right"
            onClose={this._onClose}
            visible={visible}
          >
            <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
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
              <FormInputItem
                {...formItemLayout}
                label="资源调度"
                required>
                {getFieldDecorator('scheduler', {
                  initialValue: scheduler,
                  rules: [],
                })(
                  <SchedulerInput {...{ onNodeSearch, onResourceSearch }} />
                )}
              </FormInputItem>
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
            <div className={"drawer-bottom-actions"} >
              <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
              <Button onClick={this._onClose} type="primary"> 确认 </Button>
            </div>
          </ Drawer>
          {name ? (
            <Fragment>
              <Description term="服务名称">{name}</Description>
              <Description term="服务描述">{desc}</Description>
              <Description term="服务状态">{{ none: "无状态", share: "共享磁盘", exclusive: "不共享磁盘" }[stateful]}</Description>
              <Description term="副本数量">{replicas}个</Description>
              <Description term="CPU">{cpu}</Description>
              <Description term="内存">{memory}</Description>
              <Description term="收集日志">{collectLog ? "开启" : "关闭"}</Description>
              <Description term="资源调度">
                {{ none: "自动调度", resource: "指定资源池", node: "指定私有主机" }[scheduler.type || 'none']}
                {scheduler.type === 'resource' ? `(${scheduler.resource})` :
                  scheduler.type === 'node' ? `(${scheduler.hostname})` : ''}
              </Description>
            </Fragment>
          ) : (
              <Empty description="未编辑基本配置" />
            )}
        </PageHeader>
      </FormInputItem>
    )
  }
}

export default AddBasic;
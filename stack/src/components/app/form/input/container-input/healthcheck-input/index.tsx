import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, Switch, Empty, PageHeader, Typography, Divider } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { HealthCheck } from '@/services/apps';
import HealthcheckInput from './healthcheck-input';
import Description from '../../../description';
import styles from '../style/index.less';

export interface AddHealthCheckProps extends FormInputProps<HealthCheck> {
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(FormInput({
  name: 'healthCheck',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.healthCheck)
  }
}) as any)
class AddHealthCheck extends PureComponent<AddHealthCheckProps, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
    value: [],
    onChange: () => null,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
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

  changeHealthCheckStatus = (status: boolean) => {
    if (status) {
      this.props.onChange!({
        protocol: 'TCP',
        initialDelaySeconds: 5,
        timeoutSeconds: 6,
        periodSeconds: 6,
        successThreshold: 1,
        failureThreshold: 3,
      });
    } else {
      this.props.onChange!({
        protocol: 'NONE',
        initialDelaySeconds: 5,
        timeoutSeconds: 6,
        periodSeconds: 6,
        successThreshold: 1,
        failureThreshold: 3,
      });
    }
  }

  render() {
    const { formItemLayout, type, value, form } = this.props;
    const { getFieldsError, getFieldDecorator, resetFields } = form;
    const { visible } = this.state;
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    const status = !!value && !!value.protocol && value.protocol !== 'NONE';
    return (
      <FormInputItem
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors}
      >
        <FormInputItem
          {...formItemLayout}
          label="健康检查"
        >
          <a key="edit" onClick={(e) => {
            e.preventDefault();
            this.setState({ visible: true });
          }}>{status ? "编辑" : "开启健康检查"}</a>
        </FormInputItem>
        <Drawer
          destroyOnClose={true}
          title="端口映射"
          width={482}
          placement="right"
          onClose={this._onClose}
          visible={visible}
        >
          <Form>
            <Form.Item
              {...formItemLayout}
              label="健康检查"
            >
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                defaultChecked={status}
                onClick={this.changeHealthCheckStatus}
              />
            </Form.Item>
            {status && <FormInputItem>
              {getFieldDecorator('healthCheck', {
                initialValue: value! || {},
                rules: [],
              })(
                <HealthcheckInput formItemLayout={formItemLayout} />
              )}
            </FormInputItem>}
          </Form>
          <div className={"node-actions"} >
            <Button onClick={() => {
              this.setState({ visible: false }, resetFields);
            }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button onClick={this._onClose} type="primary"> 确认 </Button>
          </div>
        </Drawer>
        {status &&
          <FormInputItem
            wrapperCol={{ xs: 24, md: { span: 19, offset: 5 } }}
          >
            {Object.entries(value || {}).map(([key, value]) => {
              const dataBasic: any = {
                protocol: '检测协议',
                initialDelaySeconds: '初始化延时(秒)',
                timeoutSeconds: '检测间隔(秒)',
                periodSeconds: '响应时限(秒)',
                successThreshold: '健康阈值(次)',
                failureThreshold: '故障阈值(次)',
              }
              if (dataBasic[key]) {
                return (
                  <Description key={key} term={dataBasic[key]}>{value}</Description>
                )
              } else if (key === "tcpSocket") {
                return (
                  <Description key={key} term="监听端口">{(value || {}).port}</Description>
                )
              } else if (key === "httpGet") {
                return (
                  <Description key={key} term="HTTP协议">{`http://${(value || {}).host || ''}:${(value || {}).port || ''}/${(value || {}).path || ''}`}</Description>
                )
              } else if (key === "exec") {
                return (
                  <Description key={key} term="命令">{(value || {}).command}</Description>
                )
              }
            })}
          </FormInputItem>}
      </FormInputItem>
    )
  }
}

export default AddHealthCheck;
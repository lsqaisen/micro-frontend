import { PureComponent, Fragment } from 'react';
import { Form, Radio, InputNumber } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { HealthCheck } from '@/services/app';
import TcpInput from './tcp-input';
import HttpInput from './http-input';
import ExecInput from './exec-input';

const FormItem = Form.Item;

export interface HealthCheckInputProps extends FormInputProps<HealthCheck> {
  formItemLayout?: any;
}

@(FormInput({ name: 'healthCheck' }) as any)
class HealthCheckInput extends PureComponent<HealthCheckInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {},
    onChange: () => null,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
  }

  render() {
    const { formItemLayout, value, form } = this.props;
    console.log(value)
    const { protocol, tcpSocket, httpGet, exec, initialDelaySeconds, periodSeconds, timeoutSeconds, successThreshold, failureThreshold } = value!;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <FormItem
          {...formItemLayout}
          label="检测协议">
          {getFieldDecorator('protocol', {
            initialValue: protocol,
            rules: [
              { required: true, message: '检测协议必须选择！' },
            ]
          })(
            <Radio.Group>
              <Radio value="TCP">TCP</Radio>
              <Radio value="HTTP">HTTP</Radio>
              <Radio value="CMD">Command</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {(() => {
          switch (protocol) {
            case "TCP":
              return (
                <FormInputItem
                  {...formItemLayout}
                  label="监听端口">
                  {getFieldDecorator('tcpSocket', {
                    initialValue: tcpSocket,
                    rules: []
                  })(
                    <TcpInput />
                  )}
                </FormInputItem>
              );
            case "HTTP":
              return (
                <FormInputItem
                  {...formItemLayout}
                  label="HTTP协议">
                  {getFieldDecorator('httpGet', {
                    initialValue: httpGet,
                    rules: []
                  })(
                    <HttpInput />
                  )}
                </FormInputItem>
              );
            case "CMD":
              return (
                <FormInputItem
                  {...formItemLayout}
                  label="命令">
                  {getFieldDecorator('exec', {
                    initialValue: exec,
                    rules: []
                  })(
                    <ExecInput />
                  )}
                </FormInputItem>
              );
            default:
              return null;
          }
        })()}
        <FormItem
          {...formItemLayout}
          label="初始化延时">
          {getFieldDecorator('initialDelaySeconds', {
            initialValue: initialDelaySeconds,
            validateFirst: true,
            rules: [
              { required: true, message: '初始化延时不能为空！' },
            ]
          })(
            <InputNumber placeholder="请输入初始化延时时间" />
          )} 秒
          </FormItem>
        <FormItem
          {...formItemLayout}
          label="检测间隔">
          {getFieldDecorator('periodSeconds', {
            initialValue: periodSeconds,
            rules: [
              { required: true, message: '检测间隔不能为空！' },
            ]
          })(
            <InputNumber placeholder="请输入检测间隔" />
          )} 秒
          </FormItem>
        <FormItem
          {...formItemLayout}
          label="响应时限">
          {getFieldDecorator('timeoutSeconds', {
            initialValue: timeoutSeconds,
            rules: [
              { required: true, message: '响应时限不能为空！' },
            ]
          })(
            <InputNumber placeholder="请输入响应时限" />
          )} 秒
          </FormItem>
        <FormItem
          {...formItemLayout}
          label="健康阈值">
          {getFieldDecorator('successThreshold', {
            initialValue: successThreshold,
            rules: [
              { required: true, message: '健康阈值不能为空！' },
            ]
          })(
            <InputNumber placeholder="请输入健康阈值" />
          )} 次
          </FormItem>
        <FormItem
          {...formItemLayout}
          label="故障阈值">
          {getFieldDecorator('failureThreshold', {
            initialValue: failureThreshold,
            rules: [
              { required: true, message: '故障阈值不能为空！' },
            ]
          })(
            <InputNumber placeholder="请输入故障阈值" />
          )} 次
          </FormItem>
      </Fragment>
    )
  }
}

export default HealthCheckInput;
import { PureComponent, Fragment } from 'react';
import { Form, Switch, Input } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/app';
import ImageInput from './image-input';
import EvnsInput from './evns-input';
import ConfigMountsInput from './config-mounts-input';
import SecretMountsInput from './secret-mounts-input';
import HostMountsInput from './host-mounts-input';
import VolumesInput from './volumes-input';
import HealthCheckInput from './healthcheck-input';

const FormItem = Form.Item;

export interface ContainerInputProps extends FormInputProps<Container> {
  formItemLayout?: any;
}

@(FormInput({ name: 'container' }) as any)
class ContainerInput extends PureComponent<ContainerInputProps, any> {
  static readonly defaultProps: ContainerInputProps = {
    form: {} as any,
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    },
    value: {} as Container,
    onChange: () => null,
  }

  render() {
    const { value, form, formItemLayout } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <FormItem
          {...formItemLayout}
          label="容器名称"
          required>
          {getFieldDecorator('name', {
            initialValue: value!.name,
            validateFirst: true,
            rules: [
              { required: true, message: '容器名称必须填写' },
            ]
          })(
            <Input placeholder="请输入容器名称" />
          )}
        </FormItem>
        <FormInputItem
          {...formItemLayout}
          label="镜像">
          {getFieldDecorator('image', {
            initialValue: value!.image,
            rules: []
          })(
            <ImageInput />
          )}
        </FormInputItem>
        <FormItem
          {...formItemLayout}
          label="启动命令">
          {getFieldDecorator('command', {
            initialValue: value!.command,
          })(
            <Input placeholder="容器启动命令" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="-i(stdin)参数">
          {getFieldDecorator('stdin', {
            initialValue: value!.stdin,
          })(
            <Switch checkedChildren={'开'} unCheckedChildren={'关'} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="-tty参数">
          {getFieldDecorator('tty', {
            initialValue: value!.tty,
          })(
            <Switch checkedChildren={'开'} unCheckedChildren={'关'} />
          )}
        </FormItem>
        <FormInputItem
          {...formItemLayout}
          label="环境变量"
        >
          {getFieldDecorator('envs', {
            initialValue: value!.envs || [],
            rules: []
          })(
            <EvnsInput />
          )}
        </FormInputItem>
        {/* <FormInputItem
          {...formItemLayout}
          label="配置挂载"
        >
          {getFieldDecorator('cfgFileMounts', {
            initialValue: value!.cfgFileMounts || [],
            rules: []
          })(
            <ConfigMountsInput />
          )}
        </FormInputItem> */}
        {/* <FormInputItem
          {...formItemLayout}
          label="证书挂载"
        >
          {getFieldDecorator('secretMounts', {
            initialValue: value!.secretMounts || [],
            rules: []
          })(
            <SecretMountsInput />
          )}
        </FormInputItem> */}
        <FormInputItem
          {...formItemLayout}
          label="本地挂载卷"
        >
          {getFieldDecorator('hostMounts', {
            initialValue: value!.hostMounts || [],
            rules: []
          })(
            <HostMountsInput />
          )}
        </FormInputItem>
        {/* <FormInputItem
          {...formItemLayout}
          label="网络挂载卷"
        >
          {getFieldDecorator('volumes', {
            initialValue: value!.volumes || [],
            rules: []
          })(
            <VolumesInput />
          )}
        </FormInputItem> */}
        {/* <FormInputItem>
          {getFieldDecorator('healthCheck', {
            initialValue: value!.healthCheck || {},
            rules: []
          })(
            <HealthCheckInput />
          )}
        </FormInputItem> */}
      </Fragment>
    )
  }
}

export default ContainerInput;
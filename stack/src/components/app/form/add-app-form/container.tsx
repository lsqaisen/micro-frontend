import { PureComponent } from 'react';
import { Form, Drawer, Button, PageHeader, Collapse, Icon, Input, Switch, Row, Col } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/app';
import ImageInput, { ImageSearchHandles } from '../input/container-input/image-input';
import EvnsInput from '../input/container-input/evns-input';
import { ConfigSearchHandles } from '../input/container-input/select-configfile';
import ConfigMountsInput from '../input/container-input/config-mounts-input';
import { SecretSearchHandles } from '../input/container-input/secret-mounts-input/secret-mount-input';
import SecretMountsInput from '../input/container-input/secret-mounts-input';
import HostMountsInput from '../input/container-input/host-mounts-input';
import { VolumeSearchHandles } from '../input/container-input/volumes-input/volume-input';
import VolumesInput from '../input/container-input/volumes-input';
import HealthCheckInput from '../input/container-input/healthcheck-input';
import Description from '../description';
import styles from './style/index.less';

const FormItem = Form.Item;

export interface AddContainerProps extends ImageSearchHandles, SecretSearchHandles, ConfigSearchHandles, VolumeSearchHandles {
  stateful?: "none" | "share" | "exclusive";
  type?: 'create' | 'update' | 'edit';
  canDelete?: boolean;
  formItemLayout?: any;
  onDelete?: () => void;
}

@(FormInput({
  name: 'container',
}) as any)
class AddContainer extends PureComponent<FormInputProps<Container> & AddContainerProps, any> {
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
    (this.props.form as any).validateFieldsAndScroll(async (error: any, values: any) => {
      if (!error) {
        this.setState({
          visible: false,
        })
      }
    })
  }

  add = (e?: any) => {
    e && e.preventDefault();
    this.setState({ visible: true });
  }

  render() {
    const {
      type, stateful, canDelete, value, formItemLayout, form, onDelete,
      onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch
    } = this.props;
    const { getFieldsError, getFieldDecorator } = form;
    const { visible } = this.state;
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    return (
      <FormInputItem
        className={`box ${styles.container}`}
        style={{ padding: 16, paddingTop: 0, marginBottom: 16, border: errors ? '1px solid #ff5242' : '1px solid transparent' }}
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors ? '容器配置未填写完整' : ''}
      >
        <Drawer
          title="容器配置"
          bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
          width={482}
          placement="right"
          onClose={this._onClose}
          visible={visible}
        >
          <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
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
                <ImageInput  {...{ onImageSearch, onImageTagSearch }} />
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
                <EvnsInput {...{ onCfgfileSearch }} />
              )}
            </FormInputItem>
            <FormInputItem
              {...formItemLayout}
              label="配置挂载"
            >
              {getFieldDecorator('cfgFileMounts', {
                initialValue: value!.cfgFileMounts || [],
                rules: []
              })(
                <ConfigMountsInput {...{ onCfgfileSearch }} />
              )}
            </FormInputItem>
            <FormInputItem
              {...formItemLayout}
              label="证书挂载"
            >
              {getFieldDecorator('secretMounts', {
                initialValue: value!.secretMounts || [],
                rules: []
              })(
                <SecretMountsInput {...{ onSecretSearch }} />
              )}
            </FormInputItem>
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
            {stateful !== 'none' && <FormInputItem
              {...formItemLayout}
              label="网络挂载卷"
            >
              {getFieldDecorator('volumes', {
                initialValue: value!.volumes || [],
                rules: []
              })(
                <VolumesInput {...{ stateful, onPvcPoolSearch, onPvcSearch }} />
              )}
            </FormInputItem>}
            <FormInputItem>
              {getFieldDecorator('healthCheck', {
                initialValue: value!.healthCheck || {},
                rules: []
              })(
                <HealthCheckInput formItemLayout={formItemLayout} />
              )}
            </FormInputItem>
          </Form>
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button onClick={this._onClose} type="primary"> 确认 </Button>
          </div>
        </Drawer>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Collapse.Panel style={{ border: 0 }} header={(
            <PageHeader
              title={<span style={{ color: errors ? "#ff5242" : "" }}>容器配置</span>}
              subTitle={<span style={{ color: errors ? "#ff5242" : "" }}>容器配置信息</span>}
            />
          )} key="1">
            <Description term="容器名称">{value!.name}</Description>
            <Description style={{ paddingBottom: 16 }} term="服务描述">{value!.image}</Description>
          </Collapse.Panel>
        </Collapse>
        <div style={{ paddingBottom: 16 }}>
          <Row gutter={8}>
            <Col span={canDelete ? 16 : 24}>
              <Button style={{ width: '100%' }} type="dashed" onClick={() => {
                this.setState({ visible: true });
              }}>编辑</Button>
            </Col>
            {canDelete && <Col span={8}>
              <Button style={{ width: '100%' }} type="danger" ghost onClick={onDelete}>删除</Button>
            </Col>}
          </Row>
        </div>
      </FormInputItem>
    )
  }
}

export default AddContainer;
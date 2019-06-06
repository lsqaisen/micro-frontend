import { PureComponent } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Row, Col, List, Typography } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Port } from '@/services/apps';
import PortsInput from '../input/ports-input';

export interface AddPortsProps {
  type?: 'create' | 'update' | 'edit';
}

@(FormInput({ name: 'ports' }) as any)
class AddPorts extends PureComponent<FormInputProps<Port[]> & AddPortsProps, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
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
    const { type, value, form } = this.props;
    const { getFieldsError, getFieldDecorator } = form;
    const { visible } = this.state;
    const { ports = [] }: any = value! || {};
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    return (
      <FormInputItem
        className="box"
        style={{ marginBottom: 16, padding: 16, paddingTop: 0, border: errors ? '1px solid #ff5242' : '1px solid transparent' }}
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors ? '端口映射存在错误' : ''}
      >
        <PageHeader
          style={{ padding: '16px 0', marginBottom: 8 }}
          title={<span style={{ color: errors ? "#ff5242" : "" }}>端口映射</span>}
          subTitle={<span style={{ color: errors ? "#ff5242" : "" }}>服务的端口映射信息</span>}
          footer={<div style={{ padding: `0 8px` }}>
            <Button style={{ width: '100%' }} type="dashed" onClick={() => {
              this.setState({ visible: true });
            }}>编辑</Button>
          </div>}
        >
          <Drawer
            title="端口映射"
            width={482}
            placement="right"
            onClose={this._onClose}
            visible={visible}
          >
            <Form>
              <FormInputItem>
                {getFieldDecorator('ports', {
                  initialValue: ports,
                  rules: [],
                })(
                  <PortsInput />
                )}
              </FormInputItem>
            </Form>
            <div className={"node-actions"} >
              <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
              <Button onClick={this._onClose} type="primary"> 确认 </Button>
            </div>
          </Drawer>
          {ports.length > 0 ? (
            <List
              header={(
                <Row gutter={8}>
                  <Col span={8}><Typography.Text>协议</Typography.Text></Col>
                  <Col span={8}><Typography.Text>容器端口</Typography.Text></Col>
                  <Col span={8}><Typography.Text>服务端口</Typography.Text></Col>
                </Row>
              )}
              dataSource={ports}
              renderItem={(port: Port) => (
                <List.Item>
                  <Row gutter={8} style={{ width: `calc(100% + 8px)` }}>
                    <Col span={8}><Typography.Text >{port.protocol}</Typography.Text></Col>
                    <Col span={8}><Typography.Text>{port.containerPort}</Typography.Text></Col>
                    <Col span={8}><Typography.Text>{port.servicePort}</Typography.Text></Col>
                  </Row>
                </List.Item>
              )}
            />
          ) : (
              <Empty description="未配置端口映射" />
            )}
        </PageHeader>
      </FormInputItem >
    )
  }
}

export default AddPorts;
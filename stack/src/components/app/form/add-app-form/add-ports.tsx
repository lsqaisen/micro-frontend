import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Row, Col, Icon } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Port } from '@/services/app';
import PortsInput from '../input/ports-input';


export interface AddPortsProps extends FormInputProps<Port[]> {
  type?: 'create' | 'update' | 'edit';
}

@(FormInput() as any)
class AddPorts extends PureComponent<AddPortsProps, any> {
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
    const { getFieldDecorator } = form;
    const { visible } = this.state;
    const ports: Port[] = value!;
    return (
      <PageHeader
        className="box"
        style={{ padding: 16, marginTop: 24 }}
        title="端口映射"
        subTitle="服务的端口映射信息"
        extra={[
          <a key="edit" onClick={(e) => {
            e.preventDefault();
            this.setState({ visible: true });
          }}>编辑</a>
        ]}
        footer={(
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
                  initialValue: value,
                  rules: []
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
        )}
      >
        {ports.length > 0 ? (
          <Row>
            <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
              <Row gutter={8}>
                <Col span={5}><p style={{ lineHeight: '24px' }}>协议</p></Col>
                <Col span={9}><p style={{ lineHeight: '24px' }}>容器端口</p></Col>
                <Col span={9} offset={1}><p style={{ lineHeight: '24px' }}>服务端口</p></Col>
              </Row>
            </Col>
            {ports.map((port: Port) => (
              <Fragment key={JSON.stringify(port)}>
                <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
                  <Row gutter={8}>
                    <Col span={5}><p style={{ lineHeight: '24px' }}>{port.protocol}</p></Col>
                    <Col span={9}><p style={{ lineHeight: '24px' }}>{port.containerPort}</p></Col>
                    <Col span={9} offset={1}><p style={{ lineHeight: '24px' }}>{port.servicePort}</p></Col>
                  </Row>
                </Col>
                <Col style={{ width: '42px', float: 'left', textAlign: 'center' }}>
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => { }}
                  />
                </Col>
              </Fragment>
            ))}
          </Row>
        ) : (
            <Empty description="未配置端口映射" />
          )}
      </PageHeader>
    )
  }
}

export default AddPorts;
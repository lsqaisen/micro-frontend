import { PureComponent } from 'react';
import { Form, Input, Radio, Drawer, Button, PageHeader, Empty, Row, Col, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import BasicForm from './add-app-basic-form';
import PortsForm from './add-app-ports-form';
import Description from './description';
import { createAppRequest } from '@/services/app';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

export interface AddClusterFormProps extends FormComponentProps {
  data?: createAppRequest;
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(Form.create() as any)
class AddClusterForm extends PureComponent<AddClusterFormProps, any> {
  static readonly defaultProps = {
    form: {},
    data: {} as createAppRequest,
    type: 'create',
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
  };

  constructor(props: AddClusterFormProps) {
    super(props);
    this.state = {
      data: props.data || {},
      visibles: {
        basic: false,
      },
    }
  }

  render() {
    const { type, formItemLayout, form } = this.props;
    const { getFieldDecorator } = form;
    const { data, visibles } = this.state;
    const {
      name,
      desc,
      stateful = "none",
      replicas = 1,
      cpu = 500,
      memory = 128,
      collectLog = true,
      scheduler = { type: 'none' },
      service = {
        ports: [],
      }
    }: createAppRequest = data!;
    return (
      <Form>
        <PageHeader
          className="box"
          style={{ padding: 16 }}
          title="基础配置"
          subTitle="服务的基本配置信息"
          extra={[
            <a onClick={(e) => {
              e.preventDefault();
              this.setState({ visibles: { ...visibles, basic: true } });
            }}>编辑</a>
          ]}
          footer={(
            <Drawer
              title="基础配置"
              width={582}
              placement="right"
              onClose={() => { this.setState({ visibles: { ...visibles, basic: false } }) }}
              visible={visibles.basic}
            >
              <BasicForm ref="basic" data={data} />
              <div className={"node-actions"} >
                <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
                <Button onClick={() => {
                  (this.refs.basic as any).validateFields(async (error: any, values: any) => {
                    if (!error) {
                      this.setState({
                        data: { ...data, ...values },
                        visibles: { ...visibles, basic: false },
                      })
                    }
                  })
                }} type="primary"> 确认 </Button>
              </div>
            </Drawer>
          )}
        >
          {name ? (
            <>
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
                  scheduler.type === 'node' ? `($){scheduler.hostname})` : ''}
              </Description>
            </>
          ) : (
              <Empty description="未编辑基本配置" />
            )}
        </PageHeader>

        <PageHeader
          className="box"
          style={{ padding: 16, marginTop: 24 }}
          title="端口映射"
          subTitle="服务的端口映射信息"
          extra={[
            <a onClick={(e) => {
              e.preventDefault();
              this.setState({ visibles: { ...visibles, basic: true } });
            }}>编辑</a>
          ]}
          footer={(
            <Drawer
              title="端口映射"
              width={582}
              placement="right"
              onClose={() => { this.setState({ visibles: { ...visibles, basic: false } }) }}
              visible={visibles.basic}
            >
              <PortsForm ref="ports" data={service.ports} />
              <div className={"node-actions"} >
                <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
                <Button onClick={() => {
                  (this.refs.basic as any).validateFields(async (error: any, values: any) => {
                    if (!error) {
                      this.setState({
                        data: { ...data, ...values },
                        visibles: { ...visibles, basic: false },
                      })
                    }
                  })
                }} type="primary"> 确认 </Button>
              </div>
            </Drawer>
          )}
        >
          {service.ports.length > 0 ? (
            <Row>
              <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
                <Row gutter={8}>
                  <Col span={5}><p style={{ lineHeight: '24px' }}>协议</p></Col>
                  <Col span={9}><p style={{ lineHeight: '24px' }}>容器端口</p></Col>
                  <Col span={9} offset={1}><p style={{ lineHeight: '24px' }}>服务端口</p></Col>
                </Row>
              </Col>
              {ports.map(port => (
                <>
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
                </>
              ))}
            </Row>
          ) : (
              <Empty description="未配置端口映射" />
            )}
        </PageHeader>
      </Form>
    )
  }
}

export default AddClusterForm;
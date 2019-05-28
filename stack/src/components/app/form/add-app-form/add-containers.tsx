import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Row, Col, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ContainersForm from '../add-app-containers-form';
import { createAppRequest, Container } from '@/services/app';

export interface AddContainersProps extends FormComponentProps {
  data?: createAppRequest;
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(Form.create() as any)
class AddContainers extends PureComponent<AddContainersProps, any> {
  static readonly defaultProps = {
    form: {},
    data: {} as createAppRequest,
    type: 'create',
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
  };

  constructor(props: AddContainersProps) {
    super(props);
    this.state = {
      data: props.data || {},
      visible: false,
    }
  }

  render() {
    const { data, visible } = this.state;
    const {
      containers = [],
    }: createAppRequest = data!;
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
            onClose={() => { this.setState({ visible: false }) }}
            visible={visible}
          >
            <ContainersForm ref="ports" />
            <div className={"node-actions"} >
              <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
              <Button onClick={() => {
                console.log(this.refs.ports);
                (this.refs.ports as any).validateFields(async (error: any, values: any) => {
                  if (!error) {
                    this.setState({
                      data: { ...data, ...values },
                      visible: false,
                    })
                  }
                })
              }} type="primary"> 确认 </Button>
            </div>
          </Drawer>
        )}
      >
        {containers.length > 0 ? (
          <Row>
            <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
              <Row gutter={8}>
                <Col span={5}><p style={{ lineHeight: '24px' }}>协议</p></Col>
                <Col span={9}><p style={{ lineHeight: '24px' }}>容器端口</p></Col>
                <Col span={9} offset={1}><p style={{ lineHeight: '24px' }}>服务端口</p></Col>
              </Row>
            </Col>
            {containers.map((container: Container) => (
              <Fragment key={JSON.stringify(container)}>
                <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
                  <Row gutter={8}>
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

export default AddContainers;
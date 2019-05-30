import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Row, Col, List, Typography, Divider } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Port } from '@/services/app';
import PortsInput from './evns-input';
import styles from '../style/index.less';

export interface AddEvnsProps extends FormInputProps<Port[]> {
  type?: 'create' | 'update' | 'edit';
}

@(FormInput({ name: 'ports' }) as any)
class AddEvns extends PureComponent<AddEvnsProps, any> {
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
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors}
      >
        <List
          className={styles.box}
          locale={{
            emptyText: null
          }}
          header={(
            <Fragment>
              {ports.length <= 0 && <Fragment>
                <a key="load" onClick={(e) => {
                  e.preventDefault();
                  this.setState({ visible: true });
                }}>读取配置</a>
                <Divider type="vertical" />
              </Fragment>}
              <a key="add" onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true });
              }}>添加</a>
            </Fragment>
          )}
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
      </FormInputItem>
    )
  }
}

export default AddEvns;
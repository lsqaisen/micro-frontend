import { PureComponent, Fragment } from 'react';
import { Icon, Row, Col, Button } from 'antd';
import FormInput, { FormInputItem } from '@/components/global/forminput';
import { Port } from '@/services/app';
import PortInput from './evn-input';

let uuid = 0;

@(FormInput({
  name: 'port',
  onValuesChange: ({ value: ports, onChange }: any, changeValues: any) => {
    const { type, value }: any = changeValues.action || {};
    switch (type) {
      case 'add':
        onChange(ports.concat(value));
        break;
      case 'modify':
        onChange(value);
        break;
      case 'remove':
        let _value = [].concat(ports);
        _value.splice(value, 1);
        onChange(_value);
        break;
      default:
        break;
    }
  }
}) as any)
export default class extends PureComponent<any, any> {
  state = {
    keys: [],
  }

  remove = (k: any) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    if (keys.length === 0) {
      return;
    }
    setFieldsValue({
      keys: keys.filter((key: any) => key !== k),
      action: {
        type: 'remove',
        value: keys.findIndex((key: any) => key === k),
      }
    });
  }

  add = () => {
    uuid++;
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    setFieldsValue({
      keys: nextKeys,
      action: {
        type: 'add',
        value: [{
          protocol: 'TCP',
          containerPort: undefined,
          servicePort: undefined,
        }]
      }
    });
  }

  change = (index: any, v: Port) => {
    const { value: ports, form: { setFieldsValue } } = this.props;
    let value: Port[] = [].concat(ports);
    value[index] = v;
    setFieldsValue({
      action: {
        type: 'modify',
        value,
      },
    })
  }

  getValues = () => {
    const { form: { getFieldsValue } } = this.props;
    let ports = getFieldsValue() || {};
    delete ports.keys;
    delete ports.action;
    return ports;
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      keys: Object.keys(value).map(key => parseInt(key, 10)),
    });
  }

  render() {
    const { value, form: { getFieldDecorator, getFieldValue }, } = this.props;
    const { keys: initialValue } = this.state;
    getFieldDecorator('keys', { initialValue });
    getFieldDecorator('action', { initialValue: { type: '', value: null } });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k: any, index: number) => {
      return (
        <Row key={k}>
          <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
            <Row gutter={8}>
              <FormInputItem required>
                {getFieldDecorator(`port_${k}`, {
                  initialValue: value[index],
                  rules: [],
                })(
                  <PortInput onChange={(v) => this.change(index, v)} />
                )}
              </FormInputItem>
            </Row>
          </Col>
          <Col style={{ width: '42px', float: 'left', textAlign: 'center' }}>
            <Icon
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Col>
        </Row>
      );
    });
    return (
      <Fragment>
        {keys.length <= 0 ? null : (
          <Fragment>
            <Row style={{ padding: `8px`, backgroundColor: '#F7F7F7' }}>
              <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
                <Row gutter={8}>
                  <Col span={7}><p style={{ lineHeight: '24px', margin: 0 }}>协议</p></Col>
                  <Col span={8}><p style={{ lineHeight: '24px', margin: 0 }}>容器端口</p></Col>
                  <Col span={8} offset={1}><p style={{ lineHeight: '24px', margin: 0 }}>服务端口</p></Col>
                </Row>
              </Col>
            </Row>
            <div style={{ padding: `8px 4px` }}>
              {formItems}
            </div>
          </Fragment>
        )}
        <Button style={{ width: "100%" }} type="dashed" onClick={this.add}>添加端口映射</Button>
      </Fragment>
    );
  }
}
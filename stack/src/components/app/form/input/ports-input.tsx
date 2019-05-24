import { PureComponent } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import PortInput from './port-input';
import { Port } from '@/services/app';

export interface PortsInputProps {
  value?: Port[];
  [key: string]: any;
}

class PortsInput extends PureComponent<PortsInputProps, any> {
  static readonly defaultProps = {
    value: [],
  };

  delete = (key: number) => {

  }

  add = () => {

  }

  render() {
    const { value, onChange } = this.props;
    return (
      <Row>
        <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
          <Row gutter={8}>
            <Col span={5}><p style={{ lineHeight: '24px' }}>协议</p></Col>
            <Col span={9}><p style={{ lineHeight: '24px' }}>容器端口</p></Col>
            <Col span={9} offset={1}><p style={{ lineHeight: '24px' }}>服务端口</p></Col>
          </Row>
        </Col>
        {value!.map((port: Port, key) => (
          <>
            <Col style={{ width: 'calc(100% - 42px)', float: 'left' }}>
              <Row gutter={8}>
                <PortInput value={port} onChange={onChange} />
              </Row>
            </Col>
            <Col style={{ width: '42px', float: 'left', textAlign: 'center' }}>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.delete(key)}
              />
            </Col>
          </>
        ))}
        <Col span={24}>
          <Button style={{ width: '100%' }} type="dashed" onClick={this.add}>添加</Button>
        </Col>
      </Row>
    )
  }
}

export default PortsInput;
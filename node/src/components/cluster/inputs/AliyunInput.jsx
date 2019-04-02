import { Component } from 'react';
import { Row, Col, Input } from 'antd';

class AliyunInput extends Component {
    render() {
        const { wrapperCol, value = {}, onChange, disabled } = this.props;
        const { key = '', secret = '' } = value;
        return (
            <div>
                <Row style={{ marginBottom: 12 }}>
                    <Col {...wrapperCol}>
                        <Input
                            disabled={disabled}
                            placeholder="key"
                            type="text"
                            value={key}
                            onChange={(v) => { onChange(Object.assign({}, value, { name: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 12 }}>
                    <Col {...wrapperCol}>
                        <Input
                            disabled={disabled}
                            placeholder="secret"
                            type="text"
                            value={secret}
                            onChange={(v) => { onChange(Object.assign({}, value, { password: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AliyunInput;
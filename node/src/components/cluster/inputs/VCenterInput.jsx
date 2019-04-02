import { Component } from 'react';
import { Row, Col, Input } from 'antd';

class VCenterInput extends Component {
    render() {
        const { wrapperCol, value = {}, onChange, disabled } = this.props;
        const { name = '', password = '', url = '' } = value;
        return (
            <div>
                <Row style={{ marginBottom: 12 }}>
                    <Col {...wrapperCol}>
                        <Input
                            disabled={disabled}
                            placeholder="账户名"
                            type="text"
                            value={name}
                            onChange={(v) => { onChange(Object.assign({}, value, { name: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 12 }}>
                    <Col {...wrapperCol}>
                        <Input
                            disabled={disabled}
                            placeholder="密码"
                            type="password"
                            value={password}
                            onChange={(v) => { onChange(Object.assign({}, value, { password: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 12 }}>
                    <Col {...wrapperCol}>
                        <Input
                            disabled={disabled}
                            placeholder="URL"
                            type="text"
                            size="large"
                            value={url}
                            onChange={(v) => { onChange(Object.assign({}, value, { url: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default VCenterInput;
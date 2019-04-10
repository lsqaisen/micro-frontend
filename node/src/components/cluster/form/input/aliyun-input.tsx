import { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

class AliyunInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { labelCol, wrapperCol, value = {}, onChange, ...props } = this.props;
        const { key = '', secret = '' } = value;
        return (
            <div>
                <Row style={{ marginBottom: 12 }}>
                    {/* <Col {...labelCol }>
                        <label className="input-label">账户名</label>
                    </Col> */}
                    <Col {...wrapperCol}>
                        <Input
                            placeholder="key"
                            type="text"
                            size="large"
                            value={key}
                            onChange={(v) => { onChange(Object.assign({}, value, { name: v.target.value })) }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: 12 }}>
                    {/* <Col {...labelCol }>
                        <label className="input-label">密码</label>
                    </Col> */}
                    <Col {...wrapperCol}>
                        <Input
                            placeholder="secret"
                            type="text"
                            size="large"
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
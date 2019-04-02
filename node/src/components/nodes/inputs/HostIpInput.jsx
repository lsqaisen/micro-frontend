import { Component } from 'react';
import { Input, InputNumber, Row, Col } from 'antd';

class HostIpInput extends Component {
    constructor(props) {
        super(props);
        const data = this.props.value || { num: 1 };
        this.state = {
            ip: data.ip || '',
            num: data.num || '',
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const data = nextProps.value;
            this.setState(data);
        }
    }
    handleKeyChange(e) {
        const ip = e.target.value;
        if (!('value' in this.props)) {
            this.setState({ ip });
        }
        this.triggerChange({ ip });
    }
    handleValueChange(e) {
        const num = e;
        if (!('value' in this.props)) {
            this.setState({ num });
        }
        this.triggerChange({ num });
    }
    triggerChange(changedValue) {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        const { disabled } = this.props;
        const state = this.state;
        return (
            <Row style={{ ...this.props.style }}>
                <Col span="17">
                    <Input
                        disabled={disabled}
                        placeholder="IP地址，例：192.168.1.1"
                        type="text"
                        value={state.ip}
                        onChange={this.handleKeyChange.bind(this)}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span="1"><p className="ant-form-split">{this.props.symbol}</p></Col>
                <Col span="6">
                    <InputNumber
                        disabled={disabled}
                        min={1}
                        max={255}
                        defaultValue={1}
                        value={state.num}
                        onChange={this.handleValueChange.bind(this)}
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>
        );
    }
}

export default HostIpInput;
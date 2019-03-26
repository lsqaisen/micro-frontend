import { PureComponent, Component } from 'react';
import { Input, Icon, Row, Col, Modal, Button } from 'antd';
import { InputProps } from 'antd/lib/input';
import { polyfill } from 'react-lifecycles-compat';
import styles from './style/index.less';

export type EmailInputProps = {
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCode?: (value: string | undefined) => void;
} & InputProps

class EmailInput extends (PureComponent || Component)<EmailInputProps, any> {
  static defaultProps = {
    error: '',
    value: '',
    onChange: () => { },
    onCode: () => { },
  }
  state = {
    sending: false,
    time: 0,
  }
  waitCode = () => {
    setTimeout(() => {
      let { time } = this.state;
      time--;
      this.setState({ time });
      if (time > 0) this.waitCode();
    }, 1000)
  }

  code = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { value, onCode = () => { } } = this.props;
    this.setState({ sending: true })
    try {
      await onCode(value);
      this.setState({ time: 60, sending: false })
      this.waitCode();
    } catch (error) {
      this.setState({ sending: false })
      Modal.error({ title: '发送验证码失败！', content: `${error}` })
    }
  }

  render() {
    const { error, size, value, onChange = () => { }, ...props } = this.props;
    const { sending, time } = this.state;
    const disabled = !value || !(!time && !error);
    return (
      <Input
        {...props}
        className={styles.email_input}
        size={size}
        prefix={<Icon type="mail" />}
        placeholder="请输入邮箱"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        addonAfter={
          <Button
            style={{ width: '102px' }}
            ghost
            type="primary"
            loading={sending}
            disabled={disabled}
            onClick={this.code}
          >{sending ? '发送中' : !time ? `发送验证码` : `${time}秒`}</Button>
        }
      />
    )
    return (
      <Row>
        <Col style={{ width: 'calc(100% - 102px)', float: 'left' }}>
          <Input
            size={size}
            prefix={<Icon type="mail" />}
            placeholder="请输入邮箱"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            addonAfter={
              <Button
                style={{ width: '102px' }}
                ghost
                type="primary"
                loading={sending}
                disabled={disabled}
                onClick={this.code}
              >{sending ? '发送中' : !time ? `发送验证码` : `${time}秒`}</Button>

            }
          />
        </Col>
      </Row >
    )
  }
}

polyfill(EmailInput);

export default EmailInput;
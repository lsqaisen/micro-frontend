import PropTypes from 'prop-types';
import styles from './style/index.less';
import { Form, Tabs, Input, Select, Button, Icon } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export class NameInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { domains, type, value, onChange } = this.props;
    const [name = undefined, domain = undefined] = (value || '').split('@');
    return (
      <div>
        {type === 'local' ? <Input
          autoFocus
          size="large"
          prefix={<Icon type="user" />}
          placeholder="请输入用户名"
          value={value}
          onChange={(v) => onChange(v.target.value)}
        /> : <Row className={styles[`relation-name-input`]}>
            <Col span={14}>
              <Input
                size="large"
                prefix={<Icon type="user" />}
                placeholder="请输入用户名"
                value={name || undefined}
                onChange={(v) => onChange(`${v.target.value || ''}@${domain || ''}`)}
              />
            </Col>
            <Col className={styles[`symbol`]}>@</Col>
            <Col span={10}>
              <Select
                size="large"
                placeholder="所属域"
                dropdownMatchSelectWidth={false}
                value={domain || undefined}
                onChange={(v) => onChange(`${name || ''}@${v || ''}`)}
              >
                {domains.map(v => (
                  <Option key={v}>{v}</Option>
                ))}
              </Select>
            </Col>
          </Row >}
      </div>
    )
  }
}

export class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      time: 0,
    };
    ['waitCode', 'code']
      .forEach((method) => this[method] = this[method].bind(this));
  }

  waitCode() {
    setTimeout(() => {
      let { time } = this.state;
      time--;
      this.setState({ time });
      if (time > 0) this.waitCode();
    }, 1000)
  }

  async code(e) {
    e.preventDefault();
    const { value, onCode } = this.props;
    this.setState({ sending: true })
    try {
      await onCode(value);
      this.setState({ time: 60, sending: false })
      this.waitCode();
    } catch (error) {
      console.error(error)
      this.setState({ sending: false })
      Modal.error({ title: '发送验证码失败！', content: `${error}` })
    }
  }

  render() {
    const { value, onChange, onCode, error } = this.props;
    const { sending, time } = this.state;
    const disabled = !value || !(!time && !error);
    return (
      <Row>
        <Col style={{ width: 'calc(100% - 102px)', float: 'left' }}>
          <Input
            size="large"
            prefix={<Icon type="mail" />}
            placeholder="请输入邮箱"
            value={value}
            onChange={(v) => onChange(v.target.value)}
          />
        </Col>
        <Col style={{ width: '102px', float: 'left' }}>
          <Button
            style={{ width: '100%' }}
            ghost
            type="primary"
            loading={sending}
            disabled={disabled}
            onClick={this.code}
          >{sending ? '发送中' : !time ? `发送验证码` : `${time}秒`}</Button>
        </Col>
      </Row >
    )
  }
}


const LoginForm = Form.create()(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      loginType: 'local',
    };
    [
      'onSubmit'
    ].forEach((method) => this[method] = this[method].bind(this))
  }

  onSubmit(e) {
    e.preventDefault();
    const { form: { validateFields }, onSubmit, goFirstLogin } = this.props;
    this.setState({ error: '' })
    validateFields(async (err, values) => {
      if (!err) {
        try {
          let response = await onSubmit(values);
          if (response.code === 203) {
            goFirstLogin(values);
          }
        } catch (error) {
          this.setState({ error })
        }
      }
    })
  }

  render() {
    const { form, domains, loading } = this.props;
    const { getFieldDecorator, setFieldsValue } = form;
    const { loginType, error } = this.state;
    return (
      <div >
        <div style={{ overflow: 'hidden' }}>
          <Tabs className={styles[`tabs`]} activeKey={loginType} onChange={(loginType) => this.setState({
            loginType
          }, () => {
            setFieldsValue({ username: '' })
          })}>
            <TabPane tab="本地用户登录" key="local"></TabPane>
            <TabPane disabled={!domains.length} tab="域账户登录" key="relation"></TabPane>
          </Tabs>
        </div>
        <Form onSubmit={this.onSubmit}>
          <FormItem  {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [{
                whitespace: true,
              }, {
                required: true,
                message: '请输入用户名',
              }, {
                validator: (rule, value, callback) => {
                  if (value && loginType === 'relation') {
                    const [name = undefined, domain = undefined] = (value || '').split('@');
                    if (!name) callback('请输入账户名！');
                    else if (!domain) callback('请选择所属域！');
                  }
                  callback();
                }
              }],
            })(
              <NameInput domains={domains} type={loginType} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} >
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请输入密码',
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" />
            )}
          </FormItem>
          <p className={styles[`error`]}>{error}</p>
          <FormItem {...formItemLayout} >
            <Button className={styles[`btn`]} type="primary" loading={loading} htmlType="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
})

LoginForm.defaultProps = {
}

LoginForm.propTypes = {
  domains: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  goFirstLogin: PropTypes.func.isRequired,
}

export default LoginForm;
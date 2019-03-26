import { PureComponent, Component } from 'react';
import { Input, Icon, Row, Col, Select, Tooltip } from 'antd';
import { InputProps } from 'antd/lib/input';
import { polyfill } from 'react-lifecycles-compat';
import QueueAnim from 'rc-queue-anim';
import styles from './style/index.less'

const Option = Select.Option;

const NameInputTypes = ["local", "global"];
export type NameInputType = (typeof NameInputTypes)[number];

export type NameInputProps = {
  domains: any[];
  value?: string;
  onChange: (value: string) => void;
} & InputProps

class NameInput extends (PureComponent || Component)<NameInputProps, any> {
  static defaultProps: {
    onChange: (value: string) => void;
  }

  state = {
    type: 'local',
  }

  render() {
    const { id, domains, value, disabled, onChange, ...props } = this.props;
    const { type } = this.state;
    const [name = undefined, domain = undefined] = (value || '').split('@');
    console.log(props)
    return (
      <Input
        {...props}
        className={styles.name_input}
        disabled={disabled}
        prefix={<Icon type="user" />}
        addonAfter={(
          <QueueAnim
            duration={400}
            type="scale"
            ease="easeInOutQuart"
            animConfig={
              [
                { width: [120, 36] },
                { width: [120, 36] }
              ]
            }
          >
            {type === "local" ? (
              <Tooltip title="域用户登录">
                <Icon style={{ padding: '0 11px' }} type="setting" onClick={() => {
                  this.setState({ type: 'domain' })
                }} />
              </Tooltip>
            ) : (
                <Select
                  disabled={disabled}
                  style={{ padding: '0 11px', width: 120, overflow: 'hidden' }}
                  key="domains"
                  defaultValue=".com"
                  onChange={(v) => { if (v === "domain#local") this.setState({ type: 'local' }) }}
                >
                  <Option value="domain#local">{type === "local" ? "" : "本地用户"}</Option>
                  <Option value=".com">.com</Option>
                  <Option value=".jp">.jp</Option>
                  <Option value=".cn">.cn</Option>
                  <Option value=".org">.org</Option>
                </Select>)}
          </QueueAnim >
        )}
        defaultValue="mysite"
      />
    )
  }
}

polyfill(NameInput)

export default NameInput;
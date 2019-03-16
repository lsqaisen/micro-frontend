import React, { PureComponent, Component } from 'react';
import { Input, Icon, Row, Col, Select } from 'antd';
import { InputProps } from 'antd/lib/input';
import { polyfill } from 'react-lifecycles-compat'
// import styles from './style/index.less'

const Option = Select.Option;

const NameInputTypes = ["local", "global"];
export type NameInputType = (typeof NameInputTypes)[number];

export type NameInputProps = {
  type?: NameInputType;
  domains: any[];
  value?: string;
  onChange?: (value: string) => void;
} & InputProps

class NameInput extends (PureComponent || Component)<NameInputProps, any> {
  static defaultProps: {
    type: 'local'
  }

  render() {
    const { type, size, domains, value, onChange } = this.props;
    const [name = undefined, domain = undefined] = (value || '').split('@');
    if (type === 'local') {
      return (
        <Input
          autoFocus
          size={size}
          prefix={<Icon type="user" />}
          placeholder="请输入用户名"
          value={value || undefined}
          onChange={(evevt) => onChange(evevt.target.value)}
        />
      )
    } else {
      return (
        <Row className={styles[`relation-name-input`]}>
          <Col span={14}>
            <Input
              size={size}
              prefix={<Icon type="user" />}
              placeholder="请输入用户名"
              value={name || undefined}
              onChange={(evevt) => onChange(`${evevt.target.value || ''}@${domain || ''}`)}
            />
          </Col>
          <Col className={styles[`symbol`]}>@</Col>
          <Col span={10}>
            <Select
              size={size}
              placeholder="所属域"
              dropdownMatchSelectWidth={false}
              value={domain || undefined}
              onChange={(value) => onChange(`${name || ''}@${value || ''}`)}
            >
              {domains.map(v => (
                <Option key={v}>{v}</Option>
              ))}
            </Select>
          </Col>
        </Row >
      )
    }
  }
}

polyfill(NameInput)

export default NameInput;
import * as React from 'react';
import { PureComponent } from 'react';
import { Button, List } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from './';
import styles from './style/index.less';

export interface ArrayInputProps<T> extends FormInputProps<T> {
  allList?: T,
  input?: React.ComponentClass<any, any> | React.FunctionComponentElement<any> | (() => React.ReactElement);
  header?: React.ReactNode;
  btn?: any;
  btnText: string;
  inputProps?: { [key: string]: any };
}

let uuid = 0;

@(FormInput({
  onValuesChange: ({ value: __value, onChange }: any, changeValues: any) => {
    const { type, value }: any = changeValues.action || {};
    switch (type) {
      case 'add':
        onChange(__value.concat(value));
        break;
      case 'modify':
        onChange(value);
        break;
      case 'remove':
        let _value = [].concat(__value);
        _value.splice(value, 1);
        onChange(_value);
        break;
      default:
        break;
    }
  }
}) as any)
export default class <T> extends PureComponent<ArrayInputProps<T[]>, any> {
  static readonly defaultProps = {
    value: [],
    form: {},
    inputProps: {},
    onChange: () => null,
  }

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
        value: [new Object({} as T)]
      }
    });
  }

  change = (index: any, v: T) => {
    const { value: _value, form: { setFieldsValue } } = this.props;
    let value: T[] = [].concat(_value as any);
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
    let value = getFieldsValue() || {};
    delete value.keys;
    delete value.action;
    return value;
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      keys: Object.keys(value!).map(key => parseInt(key, 10)),
    });
  }

  render() {
    const { input, inputProps, btn, btnText, header, allList, value, form: { getFieldDecorator, getFieldValue }, } = this.props;
    const { keys: initialValue } = this.state;
    getFieldDecorator('keys', { initialValue });
    getFieldDecorator('action', { initialValue: { type: '', value: null } });
    const keys = getFieldValue('keys');
    return (
      <List
        bordered={false}
        className={styles[`array-input`]}
        header={header}
        footer={btn ? (
          React.cloneElement(btn as any, {
            onClick: this.add,
          })
        ) : (
            <Button style={{ width: "100%" }} type="dashed" onClick={this.add}>{btnText}</Button>
          )}
        dataSource={keys}
        renderItem={(key: any, index: number) => (
          <List.Item actions={[
            <Button size="small" onClick={() => this.remove(key)} style={{ marginBottom: 24 }} shape="circle" type="ghost" icon="minus" />
          ]}>
            <div style={{ width: 'calc(100% - 48px)' }}>
              <FormInputItem required>
                {getFieldDecorator(`env_${key}`, {
                  initialValue: value![index],
                  rules: [],
                })(
                  React.createElement(input as any, {
                    ...inputProps,
                    allList: allList!.filter((v, i) => i !== index),
                    onChange: (v: T) => this.change(index, v)
                  })
                )}
              </FormInputItem>
            </div>
          </List.Item>
        )}
      />
    );
  }
}
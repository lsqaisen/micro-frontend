import * as React from 'react';
import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormItemProps, FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { generateUUID } from '@/utils'

export interface FormInputItemProps extends FormItemProps {
  children: React.ReactNode,
}

export interface FormInputProps<T> extends FormComponentProps {
  value?: T;
  getFieldDecoratorID: string;
  p_form: WrappedFormUtils;
  getFieldDecoratorOptions: GetFieldDecoratorOptions;
  onChange?: (value: T) => void;
}

export const FormInputItem = (props: FormInputItemProps) => {
  return (
    <Form.Item
      style={{ marginBottom: 0 }}
      validateStatus=""
      help=""
      {...props}
    >{props.children}</Form.Item>
  )
}

export default (options?: FormCreateOption<any>) => <T extends any>(WrappedComponent: React.ComponentClass<any, any>) => {
  class FormInput extends PureComponent<FormInputProps<T>, any> {
    UNSAFE_componentWillReceiveProps() {

    }
    render() {
      const { getFieldDecoratorID, getFieldDecoratorOptions, p_form, form } = this.props;
      const { validateFields } = form;
      const { getFieldDecorator } = p_form;
      const { rules = [], ...props } = getFieldDecoratorOptions;
      return getFieldDecorator(getFieldDecoratorID, {
        ...props,
        rules: [...rules, {
          validator: (rule: any, value: any, callback: any) => {
            !!validateFields && validateFields((error: any, _: any) => {
              if (error) {
                callback(!!error)
              }
              callback()
            })
          }
        }]
      })(React.createElement(WrappedComponent, this.props));
    }
  }

  return Form.create<FormInputProps<T>>({
    name: `${generateUUID()}`,
    onValuesChange: ({ getFieldDecoratorID, p_form }, changedValues, allValues) => {
      // p_form.setFieldsValue({ [getFieldDecoratorID]: Object.assign({}, changedValues, allValues) });
    },
    ...(options || {}),
  })(FormInput);
};
import * as React from 'react';
import { FormItemProps, FormComponentProps, FormCreateOption } from 'antd/lib/form';
export interface FormInputItemProps extends FormItemProps {
    children: React.ReactNode;
}
export interface FormInputProps<T = any> extends FormComponentProps {
    value?: T;
    onChange?: (v: T) => void;
}
export default class FormInput extends React.PureComponent<FormInputItemProps, any> {
    static create: (options?: FormCreateOption<any>) => <T extends Object = {}>(WrappedComponent: React.ComponentClass<T, any>) => React.ReactNode;
    render(): JSX.Element;
}

import * as React from 'react';
import { FormItemProps, FormComponentProps, FormCreateOption } from 'antd/lib/form';
export interface FormInputItemProps extends FormItemProps {
    children: React.ReactNode;
}
export interface FormInputProps<T = any> extends FormComponentProps {
    value?: T;
    onChange?: (v: T) => void;
}
export declare const FormInputItem: (props: FormInputItemProps) => JSX.Element;
declare const _default: (options?: FormCreateOption<any> | undefined) => <T extends Object = {}>(WrappedComponent: React.ComponentClass<any, any>) => import("antd/lib/form/interface").ConnectedComponentClass<any, Pick<FormInputProps<T>, "onChange" | "value" | "wrappedComponentRef">>;
export default _default;

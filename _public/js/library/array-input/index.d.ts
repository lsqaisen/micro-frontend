import { PureComponent } from 'react';
import { FormInputProps } from '../forminput/';
export interface ArrayInputProps<T> extends FormInputProps<T> {
    others?: T;
    input?: React.ComponentClass<any, any> | React.FunctionComponentElement<any> | (() => React.ReactElement);
    load?: React.ComponentClass<any, any> | React.FunctionComponentElement<any> | (() => React.ReactElement);
    header?: React.ReactNode;
    btn?: any;
    btnText: string;
    inputProps?: {
        [key: string]: any;
    };
    loadProps?: {
        [key: string]: any;
    };
    actionTypes: ('load' | 'add')[];
}
export default class<T> extends PureComponent<ArrayInputProps<T[]>, any> {
    static readonly defaultProps: {
        value: never[];
        form: {};
        inputProps: {};
        loadProps: {};
        actionTypes: string[];
        onChange: () => null;
    };
    state: {
        keys: never[];
    };
    remove: (k: any) => void;
    add: () => void;
    change: (index: any, v: T) => void;
    load: (data: any[]) => void;
    getValues: () => {
        [field: string]: any;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}

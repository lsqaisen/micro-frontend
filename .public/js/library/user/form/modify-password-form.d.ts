import { PureComponent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
export interface ModifyPasswordFormProps {
    username: string;
    formItemLayout?: any;
}
declare class ModifyPasswordForm extends PureComponent<FormComponentProps & ModifyPasswordFormProps, any> {
    static readonly defaultProps: {
        form: {};
        data: {};
        formItemLayout: {
            labelCol: {
                xs: number;
                md: number;
            };
            wrapperCol: {
                xs: number;
                md: number;
            };
        };
    };
    checkPassword: (_: any, value: any, callback: any) => void;
    checkPass: (_: any, value: any, callback: any) => void;
    render(): JSX.Element;
}
export default ModifyPasswordForm;

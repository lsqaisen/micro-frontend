import { PureComponent } from 'react';
import { ModifyPasswordFormProps } from './form/modify-password-form';
export interface ModifyPasswordProps extends ModifyPasswordFormProps {
    btn?: React.ReactNode;
    submit?: (value: any) => void;
}
declare class ModifyPassword extends PureComponent<ModifyPasswordProps, any> {
    static readonly defaultProps: {
        submit: () => null;
    };
    state: {
        loading: boolean;
        visible: boolean;
    };
    render(): JSX.Element;
}
export default ModifyPassword;

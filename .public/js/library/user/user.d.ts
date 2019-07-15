import { PureComponent } from 'react';
import ModifyPassword from './modify-password';
declare const colorList: string[];
declare type colorType = (typeof colorList)[number];
declare type UserProps = {
    name: string;
    guestName: string;
    trial: boolean;
    admin: boolean;
    project: string;
    projects: any[];
    changeProject: (project: string) => void;
    logout: () => void;
    modifyPassword: (value: any) => void;
};
declare type UserState = {
    color?: colorType;
};
declare class User extends PureComponent<UserProps, UserState> {
    static ModifyPassword: typeof ModifyPassword;
    static readonly defaultProps: {
        trial: boolean;
        projects: never[];
        changeProject: () => null;
        logout: () => null;
    };
    state: {
        color: string;
    };
    UNSAFE_componentWillReceiveProps(nextProps: UserProps): void;
    render(): JSX.Element;
}
export default User;

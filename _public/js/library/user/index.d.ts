import { PureComponent } from 'react';
declare const colorList: string[];
declare type colorType = (typeof colorList)[number];
declare type UserProps = {
    name: string;
    guestName: string;
    trial: boolean;
    admin: boolean;
};
declare type UserState = {
    color?: colorType;
};
export default class extends PureComponent<UserProps, UserState> {
    static readonly defaultProps: {
        trial: boolean;
    };
    state: {
        color: string;
    };
    UNSAFE_componentWillReceiveProps(nextProps: UserProps): void;
    render(): JSX.Element;
}
export {};

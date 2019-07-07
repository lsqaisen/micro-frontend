import { PureComponent } from 'react';
import { SelectProps } from 'antd/lib/select';
interface optionType {
    key: string;
    value?: any;
    label: any;
    disabled?: boolean;
    children?: optionType[];
}
export interface SearchSelectProps extends SelectProps {
    initFirst?: boolean;
    data?: optionType[];
    onSearch?: (param: any) => any;
}
interface SearchSelectState {
    init?: boolean;
    error?: string;
    loading: boolean;
    end: boolean;
    data: optionType[];
    nextParams?: any;
}
declare class SearchSelect extends PureComponent<SearchSelectProps, SearchSelectState> {
    static readonly defaultProps: {
        initFirst: boolean;
        data: never[];
    };
    state: SearchSelectState;
    constructor(props: SearchSelectProps);
    getOptions: (options: optionType[]) => JSX.Element[] | null;
    load: (e?: any) => Promise<void>;
    UNSAFE_componentWillReceiveProps({ data }: SearchSelectProps): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default SearchSelect;

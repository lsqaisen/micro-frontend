import { PureComponent } from 'react';
import { SelectProps } from 'antd/lib/select';
export declare type OptionType = {
    key: string;
    value?: any;
    label: any;
    disabled?: boolean;
    children?: OptionType[];
};
export interface SearchSelectProps extends SelectProps {
    pageStart?: number;
    initialLoad?: boolean;
    threshold?: number;
    height?: number;
    asyncSearch: (page: number, callback: (res: {
        results: OptionType[];
        total: number;
    }) => void) => any;
}
declare class SearchSelect extends PureComponent<SearchSelectProps, any> {
    static readonly defaultProps: {
        pageStart: number;
        initialLoad: boolean;
        threshold: number;
        height: number;
    };
    state: {
        total: number;
        data: OptionType[];
        loading: boolean;
        hasMore: boolean;
    };
    getOptions: (options: OptionType[]) => JSX.Element[] | null;
    handleInfiniteOnLoad: (page: number) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default SearchSelect;

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
    pageStart?: number;
    initialLoad?: boolean;
    threshold?: number;
    asyncSearch: (page: number, callback: (res: {
        results: optionType[];
        total: number;
    }) => void) => any;
}
declare class SearchSelect extends PureComponent<SearchSelectProps, any> {
    static readonly defaultProps: {
        pageStart: number;
        initialLoad: boolean;
        threshold: number;
    };
    state: {
        total: number;
        data: optionType[];
        loading: boolean;
        hasMore: boolean;
    };
    getOptions: (options: optionType[]) => JSX.Element[] | null;
    handleInfiniteOnLoad: (page: number) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default SearchSelect;

import { PureComponent } from 'react';
import { SearchSelectProps } from './index';
declare class Test extends PureComponent<SearchSelectProps, any> {
    fetchData: (page: number, callback: any) => void;
    render(): JSX.Element;
}
export default Test;
